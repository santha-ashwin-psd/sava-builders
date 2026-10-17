"""Logic tests for the Supplier KRA PIN rules (Sava A4), no database needed.

Run in the bench:
    bench --site sava run-tests --module psd_books.invoicing.doctype.supplier.test_supplier_kra_pin
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
    sys.modules.update({"frappe": fm, "frappe.model": model,
                        "frappe.model.document": document})

from psd_books.invoicing.doctype.supplier import supplier as sup


class D(dict):
    """frappe._dict stand-in: .get() and attribute access."""
    def __getattr__(self, k):
        return self.get(k)


class FakeSupplier(sup.Supplier):
    def __init__(self, tax_id="", company="Sava", name="SUPP-2026-00002",
                 new=True, before_pin=None, **flags):
        self.supplier_name = "Test Supplier"
        self.email_id = ""
        self.tax_id = tax_id
        self.books_company = company
        self.name = name
        self.flags = D(flags)
        self._new = new
        self._before = D(tax_id=before_pin) if not new else None

    def get(self, k, default=None):
        return getattr(self, k, default)

    def is_new(self):
        return self._new

    def get_doc_before_save(self):
        return self._before

    def has_value_changed(self, f):
        return False


def run(doc, frappe_flags=None, dup=None):
    """Run validate() with frappe.flags and the duplicate lookup patched."""
    with mock.patch.object(sup.frappe, "flags", D(frappe_flags or {}), create=True), \
            mock.patch.object(sup.frappe, "db") as db:
        db.get_value.return_value = dup
        doc.validate()
        return db


class TestKraPin(unittest.TestCase):
    # ---- required on new -------------------------------------------------
    def test_new_without_pin_blocked(self):
        with self.assertRaisesRegex(Exception, "KRA PIN is required"):
            run(FakeSupplier(tax_id=""))

    def test_new_with_blank_spaces_blocked(self):
        with self.assertRaisesRegex(Exception, "KRA PIN is required"):
            run(FakeSupplier(tax_id="   "))

    def test_new_without_pin_allowed_for_install_patch_migrate(self):
        for flag in ("in_install", "in_patch", "in_migrate", "in_test"):
            run(FakeSupplier(tax_id=""), frappe_flags={flag: True})

    def test_new_without_pin_allowed_with_doc_flag(self):
        run(FakeSupplier(tax_id="", skip_kra_pin=True))

    # ---- existing records ------------------------------------------------
    def test_existing_without_pin_can_still_be_saved(self):
        run(FakeSupplier(tax_id="", new=False, before_pin=""))
        run(FakeSupplier(tax_id="", new=False, before_pin=None))

    def test_existing_pin_cannot_be_cleared(self):
        with self.assertRaisesRegex(Exception, "KRA PIN is required"):
            run(FakeSupplier(tax_id="", new=False, before_pin="A123456789Z"))

    def test_existing_without_pin_can_add_one(self):
        d = FakeSupplier(tax_id="a123456789z", new=False, before_pin="")
        run(d)
        self.assertEqual(d.tax_id, "A123456789Z")

    # ---- format ----------------------------------------------------------
    def test_valid_pins_accepted_and_normalised(self):
        for raw, want in (("A123456789Z", "A123456789Z"),
                          ("P051234567K", "P051234567K"),
                          ("  a123456789z ", "A123456789Z")):
            d = FakeSupplier(tax_id=raw)
            run(d)
            self.assertEqual(d.tax_id, want)

    def test_invalid_pins_rejected(self):
        bad = ["A12345678Z",        # 8 digits
               "A1234567890Z",      # 10 digits
               "A123456789",        # no closing letter
               "123456789Z",        # no leading letter
               "B123456789Z",       # leading letter not A/P
               "A123456789z1",      # trailing junk
               "A-123456789Z",
               "27AAACR5055K1Z5"]   # old Indian GSTIN
        for pin in bad:
            with self.assertRaisesRegex(Exception, "Invalid KRA PIN", msg=pin):
                run(FakeSupplier(tax_id=pin))

    def test_existing_record_with_bad_pin_is_rejected_on_save(self):
        with self.assertRaisesRegex(Exception, "Invalid KRA PIN"):
            run(FakeSupplier(tax_id="27AAACR5055K1Z5", new=False,
                             before_pin="27AAACR5055K1Z5"))

    # ---- uniqueness ------------------------------------------------------
    def test_duplicate_in_same_company_rejected(self):
        with self.assertRaisesRegex(Exception, "already used by supplier SUPP-2026-00001"):
            run(FakeSupplier(tax_id="A123456789Z"), dup="SUPP-2026-00001")

    def test_duplicate_lookup_is_scoped_to_company_and_excludes_self(self):
        db = run(FakeSupplier(tax_id="A123456789Z", company="Sava Builders",
                              name="SUPP-2026-00007"))
        args, _kw = db.get_value.call_args
        self.assertEqual(args[0], "Supplier")
        self.assertEqual(args[1], {"tax_id": "A123456789Z",
                                   "books_company": "Sava Builders",
                                   "name": ["!=", "SUPP-2026-00007"]})

    def test_no_duplicate_found_passes(self):
        run(FakeSupplier(tax_id="A123456789Z"), dup=None)

    def test_no_lookup_when_no_pin(self):
        db = run(FakeSupplier(tax_id="", new=False, before_pin=""))
        db.get_value.assert_not_called()


if __name__ == "__main__":
    unittest.main()