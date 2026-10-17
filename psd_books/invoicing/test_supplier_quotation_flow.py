"""Tests for the Supplier Quotation workflow (Sava A8.3). DB-free: the database is mocked.

Run with either:
    bench run-tests --app psd_books --module psd_books.invoicing.test_supplier_quotation_flow
    python3 test_supplier_quotation_flow.py   (a small frappe stand-in is used outside the bench)
"""
import importlib.util
import json
import os
import sys
import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

try:
	import frappe  # noqa: F401
	from psd_books.invoicing import supplier_quotation_flow as F
	from psd_books.invoicing import supplier_quotation_rules as R
except ImportError:  # plain python, outside the bench
	_here = os.path.dirname(os.path.abspath(__file__))
	sys.path.insert(0, _here)
	import test_supplier_quotation_rules as _t  # installs the frappe stand-in and loads the rules
	R = _t.R
	_s = importlib.util.spec_from_file_location(
		"psd_books.invoicing.supplier_quotation_flow", os.path.join(_here, "supplier_quotation_flow.py"))
	F = importlib.util.module_from_spec(_s)
	sys.modules["psd_books.invoicing.supplier_quotation_flow"] = F
	_s.loader.exec_module(F)


class _D(SimpleNamespace):
	def get(self, k, default=None):
		return getattr(self, k, default)


class FakeDoc(_D):
	def __init__(self, log=None, **kw):
		super().__init__(**kw)
		self.flags = _D()
		self.__dict__.setdefault("quotation_date", None)  # real documents always have the field
		self._log = log if log is not None else []

	def check_permission(self, ptype):
		self._log.append(("perm", self.name, ptype))

	def save(self):
		self._log.append(("save", self.name, self.status, bool(self.flags.get("sq_workflow"))))

	def insert(self):
		self.name = self.name or "SB-SQ-NEW"
		self._log.append(("insert", self.name, self.status))
		self.net_total = self.total_tax = self.grand_total = 0


def old_doc(log, **kw):
	d = dict(name="SB-SQ-26-0001", status="Active", revision_no=1, company="C1", request_for_quotation="RFQ1",
		supplier="S1", quotation_date="2026-10-16")
	d.update(kw)
	return FakeDoc(log, **d)


class _Base(unittest.TestCase):
	def setUp(self):
		self.log = []
		for n in ("_assert_can", "_assert_company"):
			p = patch.object(F, n)
			self.addCleanup(p.stop)
			setattr(self, n, p.start())

	def fake_get_doc(self, old=None):
		def _get(arg, *a, **k):
			if isinstance(arg, dict):
				return FakeDoc(self.log, name=None, status="Active", **{k: v for k, v in arg.items()})
			return old
		return _get


class TestCleanPayload(unittest.TestCase):
	def test_only_allowed_fields_kept(self):
		out = F.clean_payload({"status": "Cancelled", "company": "X", "supplier": "S9", "delivery_days": 5, "remarks": "ok",
			"items": [{"mrn_item": "L1", "rate": 10, "discount_percent": 5, "qty": 999, "item_code": "ZZ", "vat_percent": 0}]})
		self.assertEqual(out, {"delivery_days": 5, "remarks": "ok",
			"items": [{"mrn_item": "L1", "rate": 10, "discount_percent": 5}]})

	def test_blank_numbers_become_none(self):
		out = F.clean_payload({"items": [{"mrn_item": "L1", "rate": "", "discount_percent": ""}]})
		self.assertEqual(out["items"], [{"mrn_item": "L1", "rate": None, "discount_percent": None}])

	def test_json_string(self):
		out = F.clean_payload(json.dumps({"delivery_days": 3, "items": []}))
		self.assertEqual(out["delivery_days"], 3)

	def test_bad_data(self):
		with self.assertRaises(Exception):
			F.clean_payload("[1, 2]")


class TestPrefill(_Base):
	def run_prefill(self, active=None, prev=None, rfq_status="Sent", sup="S1"):
		rfq = {"name": "RFQ1", "status": rfq_status, "company": "C1", "project": "P1", "posting_date": "2026-10-15"}
		lines = [_D(mrn_item="L1", item_code="CEM", item_name="Cement", qty=10, uom="Bag"),
			_D(mrn_item="L2", item_code="STL", item_name="Steel", qty=5, uom="Kg")]
		with patch.object(R, "load_rfq", return_value=rfq), patch.object(R, "rfq_lines", return_value=lines), \
			patch.object(R, "rfq_suppliers", return_value={"S1": "Alpha"}), \
			patch.object(R, "item_vat_percent", return_value=16.0), \
			patch.object(F.frappe, "db") as db, patch.object(F.frappe, "get_all", create=True, return_value=prev or []):
			db.get_value.return_value = active
			return F.get_prefill("RFQ1", sup)

	def test_fresh_prefill(self):
		out = self.run_prefill()
		self.assertEqual([(i["mrn_item"], i["qty"], i["uom"], i["vat_percent"], i["rate"]) for i in out["items"]],
			[("L1", 10, "Bag", 16.0, None), ("L2", 5, "Kg", 16.0, None)])
		self.assertEqual((out["company"], out["project"], out["active_quotation"], out["revision_no"]), ("C1", "P1", None, 0))
		self.assertEqual(out["supplier_name"], "Alpha")

	def test_prefill_carries_active_values(self):
		active = _D(name="SB-SQ-26-0001", quotation_date="2026-10-16", delivery_days=7, payment_terms="Net 30",
			remarks="x", revision_no=2)
		prev = [_D(mrn_item="L1", rate=100, discount_percent=10)]
		out = self.run_prefill(active=active, prev=prev)
		self.assertEqual((out["active_quotation"], out["revision_no"], out["delivery_days"]), ("SB-SQ-26-0001", 2, 7))
		self.assertEqual((out["items"][0]["rate"], out["items"][0]["discount_percent"]), (100, 10))
		self.assertIsNone(out["items"][1]["rate"])

	def test_supplier_not_on_rfq(self):
		with self.assertRaises(Exception):
			self.run_prefill(sup="S9")

	def test_rfq_not_sent(self):
		with self.assertRaises(Exception):
			self.run_prefill(rfq_status="Draft")

	def test_permission_and_company_checked(self):
		self.run_prefill()
		self._assert_can.assert_called_with("Supplier Quotation", "read")
		self._assert_company.assert_called_with("C1")


class TestEnter(_Base):
	def enter(self, data):
		with patch.object(R, "load_rfq", return_value={"name": "RFQ1", "company": "C1"}), \
			patch.object(F.frappe, "get_doc", create=True, side_effect=self.fake_get_doc()), \
			patch.object(F.frappe, "db") as db:
			db.get_value.return_value = _D(name="ROW1", quotation=None)
			out = F.enter_quotation(data)
			return out, db

	def test_creates_and_links_row(self):
		out, db = self.enter({"request_for_quotation": "RFQ1", "supplier": "S1", "quotation_date": "2026-10-16",
			"items": [{"mrn_item": "L1", "rate": 100}]})
		self.assertEqual(out["name"], "SB-SQ-NEW")
		self.assertEqual(self.log[0][0], "insert")
		args = db.set_value.call_args
		self.assertEqual(args[0][:3], ("Request for Quotation Supplier", "ROW1", {"quotation": "SB-SQ-NEW", "quoted_on": "2026-10-16"}))
		self.assertEqual(args[1], {"update_modified": False})
		self._assert_can.assert_called_with("Supplier Quotation", "create")
		self._assert_company.assert_called_with("C1")

	def test_client_cannot_set_status_or_revision(self):
		seen = {}

		def _get(arg, *a, **k):
			seen.update(arg)
			return FakeDoc(self.log, name=None, status="Active", **arg)
		with patch.object(R, "load_rfq", return_value={"name": "RFQ1", "company": "C1"}), \
			patch.object(F.frappe, "get_doc", create=True, side_effect=_get), patch.object(F.frappe, "db") as db:
			db.get_value.return_value = None
			F.enter_quotation({"request_for_quotation": "RFQ1", "supplier": "S1", "status": "Superseded",
				"revision_no": 9, "supersedes": "X", "company": "C2", "items": []})
		self.assertEqual((seen["revision_no"], seen["request_for_quotation"], seen.get("status"), seen.get("company"),
			seen.get("supersedes")), (1, "RFQ1", None, "C1", None))  # company comes from the RFQ, never from the client (C2)

	def test_missing_rfq(self):
		with self.assertRaises(Exception):
			F.enter_quotation({"supplier": "S1"})

	def test_insert_failure_propagates_before_row_update(self):
		def _get(arg, *a, **k):
			d = FakeDoc(self.log, name=None, status="Active", **arg)
			d.insert = MagicMock(side_effect=Exception("rule failed"))
			return d
		with patch.object(R, "load_rfq", return_value={"name": "RFQ1", "company": "C1"}), \
			patch.object(F.frappe, "get_doc", create=True, side_effect=_get), patch.object(F.frappe, "db") as db:
			with self.assertRaises(Exception):
				F.enter_quotation({"request_for_quotation": "RFQ1", "supplier": "S1", "items": []})
			db.set_value.assert_not_called()


class TestRevise(_Base):
	def revise(self, old, data=None):
		with patch.object(F.frappe, "get_doc", create=True, side_effect=self.fake_get_doc(old)), \
			patch.object(F.frappe, "db") as db:
			db.get_value.return_value = _D(name="ROW1", quotation=old.name)
			out = F.revise_quotation(old.name, data or {"items": [{"mrn_item": "L1", "rate": 90}]})
			return out, db

	def test_old_superseded_before_new_inserted(self):
		old = old_doc(self.log)
		out, db = self.revise(old)
		kinds = [c[0] for c in self.log if c[0] in ("save", "insert")]
		self.assertEqual(kinds, ["save", "insert"])
		self.assertEqual(self.log[[c[0] for c in self.log].index("save")], ("save", "SB-SQ-26-0001", "Superseded", True))
		self.assertEqual(old.status, "Superseded")
		self.assertEqual(out["name"], "SB-SQ-NEW")
		self.assertEqual(db.set_value.call_args[0][2], {"quotation": "SB-SQ-NEW", "quoted_on": None})

	def test_new_carries_revision_and_supersedes(self):
		seen = {}

		def _get(arg, *a, **k):
			if isinstance(arg, dict):
				seen.update(arg)
				return FakeDoc(self.log, name=None, status="Active", **arg)
			return old_doc(self.log, revision_no=2)
		with patch.object(F.frappe, "get_doc", create=True, side_effect=_get), patch.object(F.frappe, "db") as db:
			db.get_value.return_value = None
			F.revise_quotation("SB-SQ-26-0001", {"items": []})
		self.assertEqual((seen["revision_no"], seen["supersedes"], seen["supplier"], seen["request_for_quotation"]),
			(3, "SB-SQ-26-0001", "S1", "RFQ1"))

	def test_only_active_can_be_revised(self):
		for st in ("Superseded", "Cancelled"):
			with self.assertRaises(Exception):
				self.revise(old_doc(self.log, status=st))
		self.assertEqual([c for c in self.log if c[0] in ("save", "insert")], [])

	def test_new_failure_propagates(self):
		old = old_doc(self.log)

		def _get(arg, *a, **k):
			if isinstance(arg, dict):
				d = FakeDoc(self.log, name=None, status="Active", **arg)
				d.insert = MagicMock(side_effect=Exception("rule failed"))
				return d
			return old
		with patch.object(F.frappe, "get_doc", create=True, side_effect=_get), patch.object(F.frappe, "db"):
			with self.assertRaises(Exception):
				F.revise_quotation(old.name, {"items": []})  # Frappe rolls the request back, old stays Active in the database

	def test_permissions_checked(self):
		old = old_doc(self.log)
		self.revise(old)
		self._assert_can.assert_called_with("Supplier Quotation", "create")
		self._assert_company.assert_called_with("C1")
		self.assertIn(("perm", old.name, "write"), self.log)


class TestCancel(_Base):
	def cancel(self, old, row_quotation):
		with patch.object(F.frappe, "get_doc", create=True, side_effect=self.fake_get_doc(old)), \
			patch.object(F.frappe, "db") as db:
			db.get_value.return_value = _D(name="ROW1", quotation=row_quotation)
			return F.cancel_quotation(old.name), db

	def test_cancels_and_clears_row(self):
		old = old_doc(self.log)
		out, db = self.cancel(old, old.name)
		self.assertEqual(out, {"name": old.name, "status": "Cancelled"})
		self.assertEqual(self.log[-1], ("save", old.name, "Cancelled", True))
		self.assertEqual(db.set_value.call_args[0][2], {"quotation": None, "quoted_on": None})

	def test_row_pointing_elsewhere_is_left_alone(self):
		old = old_doc(self.log)
		_, db = self.cancel(old, "SB-SQ-26-0099")
		db.set_value.assert_not_called()

	def test_only_active_can_be_cancelled(self):
		for st in ("Superseded", "Cancelled"):
			with self.assertRaises(Exception):
				self.cancel(old_doc(self.log, status=st), None)

	def test_permissions_checked(self):
		old = old_doc(self.log)
		self.cancel(old, old.name)
		self._assert_can.assert_called_with("Supplier Quotation", "write")
		self._assert_company.assert_called_with("C1")


if __name__ == "__main__":
	unittest.main()