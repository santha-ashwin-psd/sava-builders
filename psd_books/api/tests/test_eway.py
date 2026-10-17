# Copyright (c) 2026, PS Digitise and Contributors
# See license.txt
"""
Tests for api/eway.py -- local-only E-Way Bill lifecycle endpoints. We never
contact NIC directly and never fabricate an EWB number: generate_eway_bill
validates the invoice and creates a "Ready for Upload" record with
ewb_no="", and import_eway_result() is the only place a real, government-
issued ewb_no ever gets set (after the client uploads the bulk JSON to the
portal and pastes the result back).

Covers: _validity_days (200km/day rule, including the round-up-to-next-day
boundary), _ui_status (Cancelled > Expired > Generated/Ready for Upload
precedence), the generate_eway_bill flow (docstatus guard, double-generation
block, ODC vs regular validity calc, Ready-for-Upload creation with a blank
ewb_no), import_eway_result (status guard, required-field checks, the
Ready for Upload -> Generated transition), cancel_eway_bill (idempotent on
already-cancelled), update_vehicle, extend_validity (single-extension rule,
past-date base clamp), and get_eway_json's NIC bulk payload shape (both the
Ready-for-Upload "no number yet" case and the post-import Generated case).

DB-free: frappe.db.* / frappe.get_doc are mocked; require_module is mocked
to isolate business logic from authorization (covered in
utils/tests/test_access.py).

IMPORTANT: frappe.get_doc is patched with a SCOPED side_effect everywhere
in this file, never a blanket return_value/side_effect list. Several of
these endpoints call today()/add_days(today(), ...) internally (e.g. for
valid_upto), and today() itself calls frappe.get_doc("System Settings")
on a cold cache. An unscoped patch intercepts that internal call too and
can get a test's fake object cached as "System Settings" -- in the worst
case a MagicMock-bearing object that Frappe then fails to pickle into
Redis, corrupting the shared cache for the rest of the process. See
psd_books.payments.doctype.payment_entry.test_payment_entry for the
same landmine hit previously.

Also: fake Sales-Invoice-shaped objects use SimpleNamespace, not
frappe._dict -- frappe._dict is a real dict subclass, so a stored "items"
field collides with the inherited dict.items() method and `.items`
resolves to that bound method instead of the field.

Run with:
    bench run-tests --app psd_books --module psd_books.api.tests.test_eway
"""
from __future__ import annotations

import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import frappe

from psd_books.api import eway

# Captured before any test patches frappe.get_doc, so side_effects below can
# fall through to the real implementation for calls that aren't the one
# under test.
_REAL_GET_DOC = frappe.get_doc


def _get_doc_side_effect(expected_doctype, expected_name, fake_obj):
    """Scoped replacement: only intercepts the exact (doctype, name) call
    under test; everything else (e.g. System Settings) goes to the real
    frappe.get_doc."""
    def _side_effect(doctype, name=None, *args, **kwargs):
        if doctype == expected_doctype and name == expected_name:
            return fake_obj
        return _REAL_GET_DOC(doctype, name, *args, **kwargs)
    return _side_effect


class TestValidityDays(unittest.TestCase):

    def test_zero_distance_defaults_to_one_day(self):
        self.assertEqual(eway._validity_days(0), 1)

    def test_exactly_200km_is_one_day(self):
        self.assertEqual(eway._validity_days(200), 1)

    def test_201km_rounds_up_to_two_days(self):
        self.assertEqual(eway._validity_days(201), 2)

    def test_400km_is_two_days(self):
        self.assertEqual(eway._validity_days(400), 2)

    def test_negative_distance_clamped_to_zero_gives_one_day(self):
        self.assertEqual(eway._validity_days(-50), 1)


class TestUiStatus(unittest.TestCase):

    def test_cancelled_takes_precedence_over_everything(self):
        doc = SimpleNamespace(status="Cancelled", valid_upto="2020-01-01")
        self.assertEqual(eway._ui_status(doc), "Cancelled")

    def test_past_valid_upto_is_expired_even_if_status_says_generated(self):
        doc = SimpleNamespace(status="Generated", valid_upto="2020-01-01")
        self.assertEqual(eway._ui_status(doc), "Expired")

    def test_future_valid_upto_generated_stays_generated(self):
        doc = SimpleNamespace(status="Generated", valid_upto="2099-01-01")
        self.assertEqual(eway._ui_status(doc), "Generated")

    def test_no_valid_upto_falls_back_to_raw_status(self):
        doc = SimpleNamespace(status="Draft", valid_upto=None)
        self.assertEqual(eway._ui_status(doc), "Draft")

    def test_blank_status_defaults_to_draft(self):
        doc = SimpleNamespace(status=None, valid_upto=None)
        self.assertEqual(eway._ui_status(doc), "Draft")

    def test_ready_for_upload_passes_through_unchanged(self):
        # No valid_upto expiry check applies -- there's no real EWB yet.
        doc = SimpleNamespace(status="Ready for Upload", valid_upto=None)
        self.assertEqual(eway._ui_status(doc), "Ready for Upload")


class TestGenerateEwayBill(unittest.TestCase):

    def _base_invoice(self, docstatus=1):
        return SimpleNamespace(
            name="SINV-0001", posting_date="2026-08-01", customer="CUST-1",
            customer_name="Acme Herbal Traders", grand_total=1180, company="VK Herbal",
            docstatus=docstatus,
        )

    @patch("psd_books.utils.access.require_module")
    def test_requires_invoice_transporter_and_vehicle(self, mock_req):
        with self.assertRaises(frappe.ValidationError):
            eway.generate_eway_bill(invoice_no="", transporter="", vehicle_no="")

    @patch.object(frappe.db, "exists", return_value=False)
    @patch("psd_books.utils.access.require_module")
    def test_throws_when_invoice_does_not_exist(self, mock_req, mock_exists):
        with self.assertRaises(frappe.ValidationError):
            eway.generate_eway_bill(invoice_no="SINV-GHOST", transporter="XYZ Logistics",
                                     vehicle_no="KA01AB1234")

    @patch.object(frappe.db, "get_value", return_value=0)  # draft invoice
    @patch.object(frappe.db, "exists", return_value=True)
    @patch("psd_books.utils.access.require_module")
    def test_throws_when_invoice_not_submitted(self, mock_req, mock_exists, mock_get_value):
        with self.assertRaises(frappe.ValidationError):
            eway.generate_eway_bill(invoice_no="SINV-DRAFT", transporter="XYZ Logistics",
                                     vehicle_no="KA01AB1234")

    def test_throws_when_active_ewb_already_exists(self):
        with patch("psd_books.utils.access.require_module"), \
             patch.object(frappe.db, "exists") as mock_exists, \
             patch.object(frappe.db, "get_value", return_value=1):
            # First exists() call = invoice exists; second = active EWB check
            mock_exists.side_effect = [True, "EWB-2026-00001"]
            with self.assertRaises(frappe.ValidationError):
                eway.generate_eway_bill(invoice_no="SINV-0001", transporter="XYZ Logistics",
                                         vehicle_no="KA01AB1234")

    @patch.object(frappe.db, "commit")
    @patch.object(frappe.db, "set_value")
    @patch.object(frappe.db, "get_value")
    @patch.object(frappe.db, "exists")
    @patch("psd_books.utils.access.require_module")
    def test_regular_cargo_uses_200km_rule(self, mock_req, mock_exists, mock_get_value,
                                            mock_set_value, mock_commit):
        mock_exists.side_effect = [True, None]  # invoice exists, no active EWB
        mock_get_value.return_value = 1  # docstatus submitted
        inv = self._base_invoice()
        ewb_doc = MagicMock()
        ewb_doc.name = "EWB-2026-00001"
        ewb_doc.ewb_no = ""
        ewb_doc.valid_upto = "2026-08-02"

        captured = {}
        def _side_effect(doctype, name=None, *args, **kwargs):
            if doctype == "Sales Invoice" and name == "SINV-0001":
                return inv
            if isinstance(doctype, dict):
                captured.update(doctype)
                return ewb_doc
            return _REAL_GET_DOC(doctype, name, *args, **kwargs)
        with patch.object(frappe, "get_doc", side_effect=_side_effect):
            result = eway.generate_eway_bill(
                invoice_no="SINV-0001", transporter="XYZ Logistics",
                vehicle_no="ka 01 ab 1234", distance_km=250, vehicle_type="Regular",
            )
        self.assertEqual(result["days"], 2)  # 250km -> ceil(250/200) = 2
        self.assertEqual(result["status"], "Ready for Upload")
        self.assertEqual(captured["status"], "Ready for Upload")
        self.assertEqual(captured["ewb_no"], "")  # never fabricated
        ewb_doc.insert.assert_called_once_with(ignore_permissions=False)

    @patch.object(frappe.db, "commit")
    @patch.object(frappe.db, "set_value")
    @patch.object(frappe.db, "get_value")
    @patch.object(frappe.db, "exists")
    @patch("psd_books.utils.access.require_module")
    def test_odc_uses_20km_rule_not_200km(self, mock_req, mock_exists, mock_get_value, mock_set_value, mock_commit):
        mock_exists.side_effect = [True, None]
        mock_get_value.return_value = 1
        inv = self._base_invoice()
        ewb_doc = MagicMock()
        ewb_doc.name = "EWB-2026-00002"
        ewb_doc.ewb_no = ""
        ewb_doc.valid_upto = "2026-08-04"

        def _side_effect(doctype, name=None, *args, **kwargs):
            if doctype == "Sales Invoice" and name == "SINV-0001":
                return inv
            if isinstance(doctype, dict):
                return ewb_doc
            return _REAL_GET_DOC(doctype, name, *args, **kwargs)
        with patch.object(frappe, "get_doc", side_effect=_side_effect):
            result = eway.generate_eway_bill(
                invoice_no="SINV-0001", transporter="XYZ Logistics",
                vehicle_no="KA01AB1234", distance_km=45, vehicle_type="Over Dimensional Cargo",
            )
        # 45km ODC: ceil(45/20) = 3 days, NOT ceil(45/200)=1
        self.assertEqual(result["days"], 3)
        self.assertEqual(result["status"], "Ready for Upload")

    @patch.object(frappe.db, "commit")
    @patch.object(frappe.db, "set_value")
    @patch.object(frappe.db, "get_value")
    @patch.object(frappe.db, "exists")
    @patch("psd_books.utils.access.require_module")
    def test_vehicle_number_is_normalized(self, mock_req, mock_exists, mock_get_value,
                                           mock_set_value, mock_commit):
        mock_exists.side_effect = [True, None]
        mock_get_value.return_value = 1
        inv = self._base_invoice()
        ewb_doc = MagicMock()
        ewb_doc.name = "EWB-2026-00004"
        ewb_doc.ewb_no = "260801000002"
        ewb_doc.valid_upto = "2026-08-02"

        captured = {}
        def _side_effect(doctype, name=None, *args, **kwargs):
            if doctype == "Sales Invoice" and name == "SINV-0001":
                return inv
            if isinstance(doctype, dict):
                captured.update(doctype)
                return ewb_doc
            return _REAL_GET_DOC(doctype, name, *args, **kwargs)
        with patch.object(frappe, "get_doc", side_effect=_side_effect):
            eway.generate_eway_bill(invoice_no="SINV-0001", transporter="XYZ Logistics",
                                     vehicle_no="ka 01 ab 1234")
        self.assertEqual(captured["vehicle_no"], "KA01AB1234")


class TestImportEwayResult(unittest.TestCase):

    @patch.object(frappe.db, "commit")
    @patch.object(frappe.db, "exists", return_value=True)
    @patch("psd_books.utils.access.require_module")
    def test_imports_real_result_and_marks_generated(self, mock_req, mock_exists, mock_commit):
        doc = SimpleNamespace(name="EWB-0001", status="Ready for Upload", ewb_no="",
                               valid_upto=None, uploaded_on=None, nic_ack_no=None,
                               nic_ack_date=None)
        doc.save = MagicMock()
        with patch.object(frappe, "get_doc",
                          side_effect=_get_doc_side_effect("E Way Bill", "EWB-0001", doc)):
            result = eway.import_eway_result(
                "EWB-0001", ewb_no="260801123456", valid_upto="2026-08-02",
                ack_no="ACK123", ack_date="2026-08-01",
            )
        self.assertTrue(result["ok"])
        self.assertEqual(result["ewb_no"], "260801123456")
        self.assertEqual(doc.status, "Generated")
        self.assertEqual(doc.ewb_no, "260801123456")
        self.assertEqual(doc.nic_ack_no, "ACK123")
        doc.save.assert_called_once_with(ignore_permissions=False)

    @patch.object(frappe.db, "exists", return_value=True)
    @patch("psd_books.utils.access.require_module")
    def test_cannot_import_when_not_ready_for_upload(self, mock_req, mock_exists):
        doc = SimpleNamespace(name="EWB-0001", status="Generated", ewb_no="260801000000")
        with patch.object(frappe, "get_doc",
                          side_effect=_get_doc_side_effect("E Way Bill", "EWB-0001", doc)):
            with self.assertRaises(frappe.ValidationError):
                eway.import_eway_result("EWB-0001", ewb_no="260801999999", valid_upto="2026-08-02")

    @patch.object(frappe.db, "exists", return_value=True)
    @patch("psd_books.utils.access.require_module")
    def test_blank_ewb_no_is_rejected(self, mock_req, mock_exists):
        doc = SimpleNamespace(name="EWB-0001", status="Ready for Upload", ewb_no="")
        with patch.object(frappe, "get_doc",
                          side_effect=_get_doc_side_effect("E Way Bill", "EWB-0001", doc)):
            with self.assertRaises(frappe.ValidationError):
                eway.import_eway_result("EWB-0001", ewb_no="   ", valid_upto="2026-08-02")

    @patch.object(frappe.db, "exists", return_value=True)
    @patch("psd_books.utils.access.require_module")
    def test_missing_valid_upto_is_rejected(self, mock_req, mock_exists):
        doc = SimpleNamespace(name="EWB-0001", status="Ready for Upload", ewb_no="")
        with patch.object(frappe, "get_doc",
                          side_effect=_get_doc_side_effect("E Way Bill", "EWB-0001", doc)):
            with self.assertRaises(frappe.ValidationError):
                eway.import_eway_result("EWB-0001", ewb_no="260801123456", valid_upto=None)


class TestCancelEwayBill(unittest.TestCase):

    @patch.object(frappe.db, "commit")
    @patch.object(frappe.db, "set_value")
    @patch.object(frappe.db, "exists", return_value=True)
    @patch("psd_books.utils.access.require_module")
    def test_cancels_generated_ewb(self, mock_req, mock_exists, mock_set_value, mock_commit):
        doc = SimpleNamespace(name="EWB-0001", status="Generated", invoice_no="SINV-0001")
        doc.save = MagicMock()
        with patch.object(frappe, "get_doc",
                          side_effect=_get_doc_side_effect("E Way Bill", "EWB-0001", doc)):
            result = eway.cancel_eway_bill("EWB-0001", reason="Order returned")
        self.assertTrue(result["ok"])
        self.assertEqual(doc.status, "Cancelled")
        self.assertEqual(doc.cancellation_reason, "Order returned")
        doc.save.assert_called_once_with(ignore_permissions=False)

    @patch.object(frappe.db, "exists", return_value=True)
    @patch("psd_books.utils.access.require_module")
    def test_already_cancelled_is_idempotent_noop(self, mock_req, mock_exists):
        doc = SimpleNamespace(name="EWB-0001", status="Cancelled")
        doc.save = MagicMock()  # must not be reached -- early return
        with patch.object(frappe, "get_doc",
                          side_effect=_get_doc_side_effect("E Way Bill", "EWB-0001", doc)):
            result = eway.cancel_eway_bill("EWB-0001")
        self.assertTrue(result["ok"])
        doc.save.assert_not_called()

    @patch("psd_books.utils.access.require_module")
    def test_throws_for_unknown_ewb(self, mock_req):
        with patch.object(frappe.db, "exists", return_value=False):
            with self.assertRaises(frappe.ValidationError):
                eway.cancel_eway_bill("EWB-GHOST")


class TestUpdateVehicle(unittest.TestCase):

    @patch.object(frappe.db, "commit")
    @patch.object(frappe.db, "exists", return_value=True)
    @patch("psd_books.utils.access.require_module")
    def test_updates_and_normalizes_vehicle_number(self, mock_req, mock_exists, mock_commit):
        doc = SimpleNamespace(name="EWB-0001", status="Generated", vehicle_no="OLD123",
                               transporter="Old Transporter")
        doc.save = MagicMock()
        with patch.object(frappe, "get_doc",
                          side_effect=_get_doc_side_effect("E Way Bill", "EWB-0001", doc)):
            result = eway.update_vehicle("EWB-0001", "ka 05 cd 9999", transporter="New Transporter")
        self.assertEqual(doc.vehicle_no, "KA05CD9999")
        self.assertEqual(doc.transporter, "New Transporter")
        self.assertEqual(result["vehicle_no"], "KA05CD9999")

    @patch.object(frappe.db, "exists", return_value=True)
    @patch("psd_books.utils.access.require_module")
    def test_cannot_update_non_generated_ewb(self, mock_req, mock_exists):
        doc = SimpleNamespace(name="EWB-0001", status="Cancelled", vehicle_no="OLD123")
        with patch.object(frappe, "get_doc",
                          side_effect=_get_doc_side_effect("E Way Bill", "EWB-0001", doc)):
            with self.assertRaises(frappe.ValidationError):
                eway.update_vehicle("EWB-0001", "KA05CD9999")


class TestExtendValidity(unittest.TestCase):

    @patch.object(frappe.db, "commit")
    @patch.object(frappe.db, "exists", return_value=True)
    @patch("psd_books.utils.access.require_module")
    def test_extends_from_future_valid_upto(self, mock_req, mock_exists, mock_commit):
        doc = SimpleNamespace(name="EWB-0001", status="Generated", valid_upto="2099-01-01", extended=0)
        doc.save = MagicMock()
        with patch.object(frappe, "get_doc",
                          side_effect=_get_doc_side_effect("E Way Bill", "EWB-0001", doc)):
            eway.extend_validity("EWB-0001", extra_days=3)
        self.assertEqual(str(doc.valid_upto), "2099-01-04")
        self.assertEqual(doc.extended, 1)

    @patch.object(frappe.db, "exists", return_value=True)
    @patch("psd_books.utils.access.require_module")
    def test_cannot_extend_twice(self, mock_req, mock_exists):
        doc = SimpleNamespace(name="EWB-0001", status="Generated", valid_upto="2099-01-01", extended=1)
        with patch.object(frappe, "get_doc",
                          side_effect=_get_doc_side_effect("E Way Bill", "EWB-0001", doc)):
            with self.assertRaises(frappe.ValidationError):
                eway.extend_validity("EWB-0001")

    @patch.object(frappe.db, "exists", return_value=True)
    @patch("psd_books.utils.access.require_module")
    def test_cannot_extend_non_generated_ewb(self, mock_req, mock_exists):
        doc = SimpleNamespace(name="EWB-0001", status="Expired", valid_upto="2020-01-01", extended=0)
        with patch.object(frappe, "get_doc",
                          side_effect=_get_doc_side_effect("E Way Bill", "EWB-0001", doc)):
            with self.assertRaises(frappe.ValidationError):
                eway.extend_validity("EWB-0001")


class TestGetEwayJson(unittest.TestCase):

    @patch.object(frappe.db, "exists", return_value=True)
    @patch.object(frappe.db, "get_value", return_value="VK Herbal Formulations Pvt Ltd")
    def test_payload_shape_and_item_mapping(self, mock_get_value, mock_exists):
        # Post-import: a real EWB number/validity have been set by
        # import_eway_result(), so status is Generated.
        ewb = SimpleNamespace(
            name="EWB-0001", status="Generated", ewb_no="260801123456", invoice_no="SINV-0001",
            invoice_date="2026-08-01", from_gstin="27AAAAA0000A1Z1", to_gstin="29BBBBB0000B1Z2",
            supply_type="Outward", transaction_type="Regular", grand_total=1180,
            transporter="XYZ Logistics", vehicle_no="KA01AB1234", vehicle_type="Regular",
            valid_upto="2026-08-02", company="VK Herbal", customer_name="Acme Herbal Traders",
            customer="CUST-1", sub_supply_type="Supply", doc_type="INV", transport_mode="Road",
            transporter_id="", transport_doc_no=None, transport_doc_date=None,
            distance_km=0, from_pincode=None, to_pincode=None, taxable_value=None,
            cgst_amount=0, sgst_amount=0, igst_amount=0, cess_amount=0,
        )
        item_row = SimpleNamespace(item_name="Ashwagandha Tablets", item_code="ITEM-1",
                                    description="", qty=10, uom="Box", amount=5000)
        item_row.get = lambda k, default=None: getattr(item_row, k, default)
        inv = SimpleNamespace(items=[item_row])

        def _side_effect(doctype, name=None, *args, **kwargs):
            if doctype == "E Way Bill" and name == "EWB-0001":
                return ewb
            if doctype == "Sales Invoice" and name == "SINV-0001":
                return inv
            return _REAL_GET_DOC(doctype, name, *args, **kwargs)
        with patch.object(frappe, "get_doc", side_effect=_side_effect):
            result = eway.get_eway_json("EWB-0001")

        import json
        payload = json.loads(result["content"])
        self.assertEqual(payload["docNo"], "SINV-0001")
        self.assertEqual(payload["supplyType"], "O")
        self.assertEqual(payload["ewbNo"], "260801123456")
        self.assertEqual(len(payload["itemList"]), 1)
        self.assertEqual(payload["itemList"][0]["productName"], "Ashwagandha Tablets")
        self.assertEqual(payload["ewbValidUpto"], "2026-08-02")  # populated once Generated
        self.assertEqual(result["filename"], "EWB-260801123456.json")

    @patch.object(frappe.db, "exists", return_value=True)
    @patch.object(frappe.db, "get_value", return_value="")
    def test_missing_invoice_gives_empty_item_list_not_an_error(self, mock_get_value, mock_exists):
        ewb = SimpleNamespace(
            name="EWB-0002", status="Ready for Upload", ewb_no="260801000009",
            invoice_no="SINV-GONE", invoice_date=None, from_gstin=None, to_gstin=None,
            supply_type="Outward", transaction_type="Regular", grand_total=0, transporter="",
            vehicle_no="", vehicle_type="Regular", valid_upto=None, company="VK Herbal",
            customer_name="", customer="", sub_supply_type="Supply", doc_type="INV",
            transport_mode="Road", transporter_id="", transport_doc_no=None,
            transport_doc_date=None, distance_km=0, from_pincode=None, to_pincode=None,
            taxable_value=None, cgst_amount=0, sgst_amount=0, igst_amount=0, cess_amount=0,
        )
        def _side_effect(doctype, name=None, *args, **kwargs):
            if doctype == "E Way Bill" and name == "EWB-0002":
                return ewb
            if doctype == "Sales Invoice":
                raise frappe.DoesNotExistError
            return _REAL_GET_DOC(doctype, name, *args, **kwargs)
        with patch.object(frappe, "get_doc", side_effect=_side_effect):
            result = eway.get_eway_json("EWB-0002")

        import json
        payload = json.loads(result["content"])
        self.assertEqual(payload["itemList"], [])
        self.assertEqual(payload["fromGstin"], "URP")  # blank GSTIN falls back to "URP"

    @patch.object(frappe.db, "exists", return_value=True)
    @patch.object(frappe.db, "get_value", return_value="VK Herbal Formulations Pvt Ltd")
    def test_ready_for_upload_has_no_ewb_number_or_valid_upto(self, mock_get_value, mock_exists):
        # This is the "honest" pre-portal-upload state: the JSON is a valid
        # bulk-upload file, but it must never carry a fabricated EWB number
        # or validity date, since none has been issued by NIC yet.
        ewb = SimpleNamespace(
            name="EWB-0003", status="Ready for Upload", ewb_no="", invoice_no="SINV-0002",
            invoice_date="2026-08-01", from_gstin="27AAAAA0000A1Z1", to_gstin="29BBBBB0000B1Z2",
            supply_type="Outward", transaction_type="Regular", grand_total=5000,
            transporter="XYZ Logistics", vehicle_no="KA01AB1234", vehicle_type="Regular",
            valid_upto="2026-08-02",  # provisional estimate only, must not leak into ewbValidUpto
            company="VK Herbal", customer_name="Acme Herbal Traders", customer="CUST-1",
            sub_supply_type="Supply", doc_type="INV", transport_mode="Road", transporter_id="",
            transport_doc_no=None, transport_doc_date=None, distance_km=10, from_pincode=None,
            to_pincode=None, taxable_value=5000, cgst_amount=0, sgst_amount=0, igst_amount=0,
            cess_amount=0,
        )
        inv = SimpleNamespace(items=[])

        def _side_effect(doctype, name=None, *args, **kwargs):
            if doctype == "E Way Bill" and name == "EWB-0003":
                return ewb
            if doctype == "Sales Invoice" and name == "SINV-0002":
                return inv
            return _REAL_GET_DOC(doctype, name, *args, **kwargs)
        with patch.object(frappe, "get_doc", side_effect=_side_effect):
            result = eway.get_eway_json("EWB-0003")

        import json
        payload = json.loads(result["content"])
        self.assertEqual(payload["ewbNo"], "")
        self.assertEqual(payload["ewbValidUpto"], "")
        self.assertEqual(result["filename"], "EWB-READY-EWB-0003.json")


if __name__ == "__main__":
    unittest.main()