"""Logic tests for api.projects.delete_project (plain Python, frappe mocked).

Run in the bench: bench --site sava run-tests --app psd_books --module psd_books.api.test_delete_project
"""
import sys
import types
import unittest
from unittest import mock

try:
	import frappe  # noqa: F401
	REAL = True
except ImportError:
	REAL = False

if not REAL:
	fm = types.ModuleType("frappe")
	fm._ = lambda s: s
	fm.db = mock.MagicMock()
	fm.session = types.SimpleNamespace(user="a@x.com")
	fm.PermissionError = type("PermissionError", (Exception,), {})
	fm.DoesNotExistError = type("DoesNotExistError", (Exception,), {})

	def _throw(msg, exc=None, title=None):
		raise (exc or Exception)(msg)

	fm.throw = _throw
	fm.whitelist = lambda **k: (lambda f: f)
	fm.get_all = mock.MagicMock()
	fm.delete_doc = mock.MagicMock()
	futils = types.ModuleType("frappe.utils"); futils.now_datetime = lambda: None
	acc = types.ModuleType("psd_books.utils.access")
	acc._membership = lambda u: {"admin": True}; acc.assert_can = lambda *a, **k: None; acc.assert_company = lambda *a, **k: None
	pj = types.ModuleType("psd_books.inventory.doctype.project.project"); pj._edit_warehouse_projects = mock.MagicMock()
	for n, m in {"frappe": fm, "frappe.utils": futils, "psd_books.utils.access": acc,
				 "psd_books.inventory.doctype.project.project": pj}.items():
		sys.modules[n] = m

from psd_books.api import projects as api


def doc(status="Closed", warehouse=None):
	d = mock.MagicMock(); d.name = "SB-1"; d.status = status; d.company = "C"
	d.get = lambda k, default=None: warehouse if k == "warehouse" else default
	d.warehouse = warehouse
	return d


class TestDeleteProject(unittest.TestCase):
	def run_delete(self, d, admin=True, linked=(), stores=()):
		def get_all(doctype, **kw):
			if doctype == "Warehouse Project":
				return list(stores)
			return []
		with mock.patch.object(api, "_membership", return_value={"admin": admin}), \
				mock.patch.object(api, "_load_project", return_value=d), \
				mock.patch.object(api, "get_linked_documents", return_value=list(linked)), \
				mock.patch.object(api.frappe, "get_all", side_effect=get_all), \
				mock.patch.object(api.frappe.db, "exists", return_value=True), \
				mock.patch.object(api.frappe, "delete_doc") as dd:
			res = api.delete_project("SB-1")
		return res, dd

	def test_admin_deletes_closed_unused_project(self):
		res, dd = self.run_delete(doc())
		self.assertTrue(res["deleted"]); dd.assert_called_once()

	def test_non_admin_blocked(self):
		with self.assertRaises(Exception) as cm:
			self.run_delete(doc(), admin=False)
		self.assertIn("Books Admin or Director", str(cm.exception))

	def test_open_project_blocked(self):
		with self.assertRaises(Exception) as cm:
			self.run_delete(doc(status="Open"))
		self.assertIn("Only a Closed project", str(cm.exception))

	def test_project_with_documents_blocked_and_listed(self):
		with self.assertRaises(Exception) as cm:
			self.run_delete(doc(), linked=[{"doctype": "Material Request", "count": 2}])
		self.assertIn("2 Material Request", str(cm.exception))

	def test_warehouse_side_unlinked_before_delete(self):
		with mock.patch("psd_books.inventory.doctype.project.project._edit_warehouse_projects") as ep:
			res, dd = self.run_delete(doc(warehouse="Site A"), stores=["Site B"])
		self.assertEqual({c.args[0] for c in ep.call_args_list}, {"Site A", "Site B"})


if __name__ == "__main__":
	unittest.main()