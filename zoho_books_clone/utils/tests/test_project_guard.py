"""Logic tests for utils/project_guard.py (no database needed).

Run in the bench:  bench --site sava run-tests --module zoho_books_clone.utils.tests.test_project_guard
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
    sys.modules["frappe"] = fm

from zoho_books_clone.utils import project_guard as pg


class FakeDoc:
    def __init__(self, project="P1", docstatus=0, new=False, before_status=None, has_before=True):
        self.project = project
        self.docstatus = docstatus
        self._new = new
        self._before = types.SimpleNamespace(docstatus=before_status) if has_before else None

    def get(self, k):
        return getattr(self, k, None)

    def is_new(self):
        return self._new

    def get_doc_before_save(self):
        return self._before


def run(doc, status):
    with mock.patch.object(pg.frappe.db, "get_value", return_value=status):
        pg.validate_project_open(doc)


class TestProjectGuard(unittest.TestCase):
    def blocked(self, doc, status="Closed"):
        with self.assertRaises(Exception):
            run(doc, status)

    def allowed(self, doc, status="Closed"):
        run(doc, status)

    def test_no_project_is_fine(self):
        self.allowed(FakeDoc(project=None, docstatus=0))

    def test_open_project_is_fine(self):
        self.allowed(FakeDoc(docstatus=0), status="Open")
        self.allowed(FakeDoc(docstatus=1, before_status=0), status="Open")

    def test_new_draft_on_closed_blocked(self):
        self.blocked(FakeDoc(docstatus=0, new=True, has_before=False))

    def test_saving_existing_draft_on_closed_blocked(self):
        self.blocked(FakeDoc(docstatus=0, before_status=0))

    def test_submit_on_closed_blocked(self):
        self.blocked(FakeDoc(docstatus=1, before_status=0))

    def test_new_doc_inserted_submitted_blocked(self):
        self.blocked(FakeDoc(docstatus=1, new=True, has_before=False))

    def test_already_submitted_left_alone(self):
        self.allowed(FakeDoc(docstatus=1, before_status=1))

    def test_missing_project_row_is_left_to_link_validation(self):
        self.allowed(FakeDoc(docstatus=0), status=None)


if __name__ == "__main__":
    unittest.main()