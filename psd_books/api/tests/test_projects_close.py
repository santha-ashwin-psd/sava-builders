"""Logic tests for api/projects.py (close / reopen / open-document rules).

Run in the bench:  bench --site sava run-tests --module psd_books.api.tests.test_projects_close
Outside a bench the frappe pieces are stubbed, so only the logic is exercised.
"""
import sys
import types
import unittest
from unittest import mock

try:
    import frappe  # noqa: F401
    STUBBED = False
except ImportError:
    STUBBED = True
    fm = types.ModuleType("frappe")
    fm._ = lambda s: s
    fm.db = mock.MagicMock()
    fm.session = types.SimpleNamespace(user="u@x.com")
    fm.get_all = mock.MagicMock()
    fm.get_doc = mock.MagicMock()
    fm.whitelist = lambda **kw: (lambda f: f)
    fm.DoesNotExistError = type("DoesNotExistError", (Exception,), {})
    fm.PermissionError = type("PermissionError", (Exception,), {})

    def _throw(msg, exc=None, title=None):
        raise (exc or Exception)(msg)

    fm.throw = _throw
    fu = types.ModuleType("frappe.utils")
    fu.now_datetime = lambda: "2026-10-13 10:00:00"
    fm.utils = fu
    sys.modules["frappe"] = fm
    sys.modules["frappe.utils"] = fu
    acc = types.ModuleType("psd_books.utils.access")
    acc._membership = mock.MagicMock(return_value={"admin": False})
    acc.assert_can = mock.MagicMock()
    acc.assert_company = mock.MagicMock()
    sys.modules["psd_books.utils.access"] = acc

from psd_books.api import projects as pj


class FakeProject:
    def __init__(self, status="Open"):
        self.name = "SB-001"
        self.company = "Sava"
        self.status = status
        self.closed_by = None
        self.closed_on = None
        self.flags = types.SimpleNamespace()
        self.saved = False

    def save(self):
        self.saved = True


def counts(**by_doctype):
    return lambda dt, filters: by_doctype.get(dt, 0)


class TestOpenDocuments(unittest.TestCase):
    def test_nothing_open(self):
        with mock.patch.object(pj.frappe.db, "count", side_effect=counts()):
            self.assertEqual(pj.get_open_documents("SB-001"), [])

    def test_reports_each_open_kind_with_names(self):
        with mock.patch.object(pj.frappe.db, "count", side_effect=counts(**{"Material Request": 2, "Purchase Receipt": 1})), \
             mock.patch.object(pj.frappe, "get_all", return_value=["X-1", "X-2"]):
            out = pj.get_open_documents("SB-001")
        self.assertEqual([d["label"] for d in out], ["MRN", "GRN"])
        self.assertEqual(out[0]["count"], 2)

    def test_filters_use_the_project_and_open_states(self):
        seen = {}

        def fake_count(dt, filters):
            seen[dt] = filters
            return 0

        with mock.patch.object(pj.frappe.db, "count", side_effect=fake_count):
            pj.get_open_documents("SB-001")
        self.assertEqual(seen["Purchase Receipt"], {"project": "SB-001", "docstatus": 0})
        self.assertEqual(seen["Material Request"]["status"],
                         ["in", ["Draft", "Pending Approval", "Sent Back", "Approved", "Submitted"]])
        self.assertIn("Partially Received", seen["Purchase Order"]["status"][1])
        self.assertNotIn("Received", seen["Purchase Order"]["status"][1])
        self.assertEqual(seen["Material Request"]["docstatus"], ["<", 2])

    def test_message_mentions_overflow(self):
        msg = pj._blockers_message([{"label": "LPO", "count": 7, "names": ["A", "B"]}])
        self.assertIn("7 LPO (A, B and 5 more)", msg)


class TestCloseReopen(unittest.TestCase):
    def setUp(self):
        self.exists = mock.patch.object(pj.frappe.db, "exists", return_value=True)
        self.exists.start()
        self.addCleanup(self.exists.stop)

    def run_close(self, doc, open_docs):
        with mock.patch.object(pj.frappe, "get_doc", return_value=doc), \
             mock.patch.object(pj, "get_open_documents", return_value=open_docs), \
             mock.patch.object(pj, "now_datetime", return_value="2026-10-14 10:00:00"):
            return pj.close_project("SB-001")

    def test_close_blocked_when_open_documents(self):
        doc = FakeProject()
        with self.assertRaises(Exception):
            self.run_close(doc, [{"label": "MRN", "count": 1, "names": ["MR-1"], "doctype": "Material Request"}])
        self.assertFalse(doc.saved)
        self.assertEqual(doc.status, "Open")

    def test_close_records_who_and_when(self):
        doc = FakeProject()
        res = self.run_close(doc, [])
        self.assertEqual((doc.status, doc.closed_by), ("Closed", pj.frappe.session.user))
        self.assertTrue(doc.closed_on and doc.saved)
        self.assertTrue(doc.flags.allow_status_change)
        self.assertEqual(res["status"], "Closed")

    def test_close_already_closed_rejected(self):
        with self.assertRaises(Exception):
            self.run_close(FakeProject("Closed"), [])

    def test_reopen_needs_admin(self):
        with mock.patch.object(pj, "_membership", return_value={"admin": False}):
            with self.assertRaises(Exception):
                pj.reopen_project("SB-001")

    def test_reopen_clears_close_info(self):
        doc = FakeProject("Closed")
        doc.closed_by, doc.closed_on = "a@x.com", "2026-10-01"
        with mock.patch.object(pj, "_membership", return_value={"admin": True}), \
             mock.patch.object(pj.frappe, "get_doc", return_value=doc):
            pj.reopen_project("SB-001")
        self.assertEqual((doc.status, doc.closed_by, doc.closed_on), ("Open", None, None))
        self.assertTrue(doc.saved)

    def test_reopen_open_project_rejected(self):
        with mock.patch.object(pj, "_membership", return_value={"admin": True}), \
             mock.patch.object(pj.frappe, "get_doc", return_value=FakeProject("Open")):
            with self.assertRaises(Exception):
                pj.reopen_project("SB-001")


if __name__ == "__main__":
    unittest.main()