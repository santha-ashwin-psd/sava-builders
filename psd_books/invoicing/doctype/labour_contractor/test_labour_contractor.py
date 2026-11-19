"""Logic tests for the Labour Contractor rules (no database needed).

Run in the bench:
    bench --site sava run-tests --app psd_books --module psd_books.invoicing.doctype.labour_contractor.test_labour_contractor
"""
import sys
import types
import unittest
from unittest import mock

try:
    import frappe  # noqa: F401
except ImportError:  # plain-python run outside a bench
    fm = types.ModuleType("frappe")
    fm._ = lambda s: s
    fm.db = mock.MagicMock()

    class _Err(Exception):
        pass

    def _throw(msg, title=None):
        raise _Err(msg)

    fm.throw = _throw
    fm.whitelist = lambda *a, **k: (lambda f: f)
    model = types.ModuleType("frappe.model")
    document = types.ModuleType("frappe.model.document")
    document.Document = object
    fm.model = model
    model.document = document
    sys.modules.update({"frappe": fm, "frappe.model": model, "frappe.model.document": document})

import frappe  # noqa: E402,F811
from psd_books.invoicing.doctype.labour_contractor import labour_contractor as lc  # noqa: E402


class FakeContractor(lc.LabourContractor):
    def __init__(self, name=None, company="Sava", **k):
        self.name = name
        self.company = company
        self.contractor_name = k.get("contractor_name", "Kamau Painters")
        self.id_no = k.get("id_no", "PVT-1")
        self.kra_pin = k.get("kra_pin", "A123456789Z")
        self.tax_cert_expiry = k.get("tax_cert_expiry", "2027-01-01")
        self.phone = self.bank_details = self.nca_reg_no = ""

    def get(self, k, default=None):
        return getattr(self, k, default)


class TestLabourContractor(unittest.TestCase):
    def setUp(self):
        self._p = mock.patch.object(frappe.db, "get_value", return_value=None)
        self.gv = self._p.start()

    def tearDown(self):
        self._p.stop()

    def _fails(self, **k):
        with self.assertRaises(Exception) as cm:
            FakeContractor(**k).validate()
        return str(cm.exception)

    def test_complete_record_passes_and_pin_is_upper_cased(self):
        c = FakeContractor(kra_pin="a123456789z")
        c.validate()
        self.assertEqual(c.kra_pin, "A123456789Z")

    def test_required_fields(self):
        for f in ("contractor_name", "id_no", "kra_pin", "tax_cert_expiry"):
            self._fails(**{f: ""})

    def test_pin_format(self):
        self.assertIn("Invalid KRA PIN", self._fails(kra_pin="123"))

    def test_duplicate_pin_blocked_within_the_company(self):
        self.gv.return_value = "LCON-00009"
        self.assertIn("LCON-00009", self._fails())
        flt = self.gv.call_args[0][1]
        self.assertEqual((flt["company"], flt["kra_pin"]), ("Sava", "A123456789Z"))

    def test_editing_excludes_itself(self):
        FakeContractor(name="LCON-00001").validate()
        self.assertEqual(self.gv.call_args[0][1]["name"], ["!=", "LCON-00001"])

    def test_expired_certificate_can_still_be_saved(self):
        FakeContractor(tax_cert_expiry="2020-01-01").validate()