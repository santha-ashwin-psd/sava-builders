"""Logic tests for the Warehouse store-role rules (Sava A2), no database needed.

Run in the bench:
    bench --site sava run-tests --module zoho_books_clone.inventory.tests.test_warehouse_store_roles
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

from zoho_books_clone.inventory.doctype.warehouse import warehouse as wh


class FakeWarehouse:
    def __init__(self, role="Central Store", project="", company="Sava",
                 name="Central Store", disabled=0, new=True):
        self.store_role = role
        self.project = project
        self.company = company
        self.name = name
        self.disabled = disabled
        self._new = new

    def get(self, k):
        return getattr(self, k, None)

    def is_new(self):
        return self._new

    # borrow the real helper so Warehouse._validate_store_role can call it on this fake
    _validate_single_company_store = wh.Warehouse._validate_single_company_store


def run(doc, existing=None):
    """existing = name of another active store with the same role/company, or None."""
    with mock.patch.object(wh.frappe.db, "get_value", return_value=existing) as gv:
        wh.Warehouse._validate_store_role(doc)
        return gv


class TestSingleCompanyStore(unittest.TestCase):
    def test_first_central_store_allowed(self):
        run(FakeWarehouse("Central Store"), existing=None)

    def test_second_central_store_blocked(self):
        with self.assertRaises(Exception) as cm:
            run(FakeWarehouse("Central Store", name="Central 2"), existing="Central Store")
        self.assertIn("already has a Central Store", str(cm.exception))

    def test_second_rejected_store_blocked(self):
        with self.assertRaises(Exception) as cm:
            run(FakeWarehouse("Rejected Store", name="Rejected 2"), existing="Rejected Store")
        self.assertIn("already has a Rejected Store", str(cm.exception))

    def test_disabled_store_is_not_checked(self):
        # saving a disabled duplicate is fine (this is how an old store is retired)
        run(FakeWarehouse("Central Store", disabled=1), existing="Central Store")

    def test_no_company_is_skipped(self):
        run(FakeWarehouse("Central Store", company=None), existing="Central Store")

    def test_lookup_excludes_itself_and_disabled_and_is_company_scoped(self):
        gv = run(FakeWarehouse("Rejected Store", name="Rejected Store", new=False))
        _, filters, field = gv.call_args[0]
        self.assertEqual(filters["company"], "Sava")
        self.assertEqual(filters["store_role"], "Rejected Store")
        self.assertEqual(filters["disabled"], 0)
        self.assertEqual(filters["name"], ["!=", "Rejected Store"])

    def test_central_store_with_project_still_rejected(self):
        with self.assertRaises(Exception) as cm:
            run(FakeWarehouse("Central Store", project="P1"))
        self.assertIn("cannot be linked to a project", str(cm.exception))

    def test_plain_warehouse_untouched(self):
        gv = run(FakeWarehouse(role="", project=""))
        gv.assert_not_called()


if __name__ == "__main__":
    unittest.main()