"""Logic tests for the Project Manager rule on the Project doctype (Sava A5.2).

Run in the bench:
	bench --site sava run-tests --module psd_books.inventory.doctype.project.test_project_manager
Outside a bench the frappe pieces are stubbed, so only the logic is exercised.
"""
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
	fmodel = types.ModuleType("frappe.model")
	fdoc = types.ModuleType("frappe.model.document")
	fdoc.Document = type("Document", (), {})
	fu = types.ModuleType("frappe.utils")
	fu.getdate = lambda d: d
	fm.model = fmodel
	fm.utils = fu
	sys.modules.update({
		"frappe": fm, "frappe.model": fmodel, "frappe.model.document": fdoc, "frappe.utils": fu})

from psd_books.inventory.doctype.project import project as pj


def fake(manager, company="Sava Builders", name="SB-001", new=True):
	return types.SimpleNamespace(
		project_manager=manager, company=company, name=name, is_new=lambda: new)


def member_row(role="Books Manager", admin=0):
	return {"books_role": role, "is_company_admin": admin}


class TestProblem(unittest.TestCase):
	def test_not_a_member(self):
		self.assertIn("not a member", pj.project_manager_problem("a@x.com", None))

	def test_viewer_blocked(self):
		self.assertIn("Books Viewer", pj.project_manager_problem("a@x.com", member_row("Books Viewer")))

	def test_viewer_who_is_company_admin_allowed(self):
		self.assertIsNone(pj.project_manager_problem("a@x.com", member_row("Books Viewer", admin=1)))

	def test_manager_and_admin_roles_allowed(self):
		self.assertIsNone(pj.project_manager_problem("a@x.com", member_row("Books Manager")))
		self.assertIsNone(pj.project_manager_problem("a@x.com", member_row("Books Admin")))


class TestValidateManager(unittest.TestCase):
	def run_validate(self, doc, member=None, before=None):
		def get_value(doctype, filters, fieldname=None, as_dict=False):
			if doctype == "Books Company Member":
				return member
			return before

		with mock.patch.object(pj.frappe.db, "get_value", side_effect=get_value) as gv:
			pj.Project._validate_project_manager(doc)
		return gv

	def test_blank_manager_skips_lookup(self):
		doc = fake("   ")
		gv = self.run_validate(doc)
		self.assertIsNone(doc.project_manager)
		gv.assert_not_called()

	def test_new_project_with_valid_member_passes(self):
		doc = fake("pm@x.com")
		self.run_validate(doc, member=member_row())
		self.assertEqual(doc.project_manager, "pm@x.com")

	def test_new_project_with_viewer_blocked(self):
		with self.assertRaises(Exception) as cm:
			self.run_validate(fake("v@x.com"), member=member_row("Books Viewer"))
		self.assertIn("Books Viewer", str(cm.exception))

	def test_new_project_with_non_member_blocked(self):
		with self.assertRaises(Exception) as cm:
			self.run_validate(fake("who@x.com"), member=None)
		self.assertIn("not a member", str(cm.exception))

	def test_unchanged_manager_not_rechecked(self):
		# an old project keeps saving even if its manager is no longer valid
		doc = fake("old@x.com", new=False)
		gv = self.run_validate(doc, member=None, before="old@x.com")
		self.assertEqual(gv.call_count, 1)  # only the "before" lookup

	def test_changed_manager_checked(self):
		with self.assertRaises(Exception):
			self.run_validate(fake("new@x.com", new=False), member=member_row("Books Viewer"), before="old@x.com")

	def test_company_required(self):
		with self.assertRaises(Exception) as cm:
			self.run_validate(fake("pm@x.com", company=""), member=member_row())
		self.assertIn("company", str(cm.exception))


if __name__ == "__main__":
	unittest.main()