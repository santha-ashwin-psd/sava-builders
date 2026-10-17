"""Logic tests for the Supplier import template and country default (Sava A4).

Run in the bench:  bench --site sava run-tests --module psd_books.api.tests.test_supplier_import_template
Outside a bench the frappe pieces are stubbed (run this file on its own), so only the logic is exercised.
"""
import csv
import io
import re
import sys
import types
import unittest
from unittest import mock

try:
    import frappe  # noqa: F401
except ImportError:
    fm = types.ModuleType("frappe")
    fm._ = lambda s: s
    fm.db = mock.MagicMock()

    def _throw(msg, exc=None, title=None):
        raise (exc or Exception)(msg)

    fm.throw = _throw
    fm.whitelist = lambda *a, **k: (lambda f: f)
    fu = types.ModuleType("frappe.utils")
    fu.flt = lambda v, *a: float(v or 0)
    fu.cint = lambda v, *a: int(float(v or 0))
    fu.nowdate = lambda: "2026-10-14"
    fm.utils = fu
    sys.modules["frappe"] = fm
    sys.modules["frappe.utils"] = fu

from psd_books.api import import_data as imp

KRA = re.compile(r"^[AP][0-9]{9}[A-Z]$")


class TestSupplierImportTemplate(unittest.TestCase):
    def _sample(self):
        rows = list(csv.DictReader(io.StringIO(imp.get_sample_csv("Supplier"))))
        self.assertEqual(len(rows), 1)
        return rows[0]

    def test_sample_row_is_kenyan_with_a_valid_kra_pin(self):
        r = self._sample()
        self.assertRegex(r["tax_id"], KRA)
        self.assertEqual(r["country"], "Kenya")
        self.assertEqual(r["payment_terms"], "Net 30")

    def test_sample_has_no_indian_example(self):
        text = imp.get_sample_csv("Supplier")
        for bad in ("India", "27AAACR5055K1Z5", "Delhi"):
            self.assertNotIn(bad, text)

    def test_headers_unchanged(self):
        header = next(csv.reader(io.StringIO(imp.get_sample_csv("Supplier"))))
        self.assertEqual(header, ["supplier_name", "supplier_type", "email_id", "mobile_no",
                                  "phone", "tax_id", "city", "state", "country", "payment_terms"])

    def test_build_doc_defaults_country_to_kenya(self):
        d = imp._build_doc("Supplier", {"supplier_name": "Sava Hardware", "tax_id": "A123456789Z"}, "Sava")
        self.assertEqual(d["country"], "Kenya")
        self.assertEqual(d["tax_id"], "A123456789Z")
        self.assertEqual(d["books_company"], "Sava")

    def test_build_doc_keeps_explicit_country(self):
        d = imp._build_doc("Supplier", {"supplier_name": "X", "country": "Uganda"}, "Sava")
        self.assertEqual(d["country"], "Uganda")

    def test_build_doc_skips_blank_name(self):
        self.assertIsNone(imp._build_doc("Supplier", {"supplier_name": "  "}, "Sava"))


if __name__ == "__main__":
    unittest.main()