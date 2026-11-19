"""Logic tests for the Labour Activity rules (no database needed).

Run in the bench:
	bench --site sava run-tests --app psd_books --module psd_books.invoicing.doctype.labour_activity.test_labour_activity
Or with plain python3 from the folder above the app.
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
	fm.get_all = mock.MagicMock(return_value=[])
	fm.whitelist = lambda *a, **k: (lambda f: f)
	model = types.ModuleType("frappe.model")
	document = types.ModuleType("frappe.model.document")
	document.Document = object
	fm.model = model
	model.document = document
	sys.modules.update({"frappe": fm, "frappe.model": model, "frappe.model.document": document})

import frappe  # noqa: E402,F811
from psd_books.invoicing.doctype.labour_activity import labour_activity as la  # noqa: E402


class FakeActivity(la.LabourActivity):
	def __init__(self, name=None, **k):
		self.name = name
		self.company = "Sava"
		self.activity_code = k.get("activity_code", "ACT-004")
		self.activity_name = k.get("activity_name", "Tiling")
		self.category = k.get("category", "Finishing")

	def get(self, k, default=None):
		return getattr(self, k, default)


class TestLabourActivity(unittest.TestCase):
	def setUp(self):
		self._sql = mock.patch.object(frappe.db, "sql", return_value=[])
		self._sql_list = mock.patch.object(frappe.db, "sql_list", return_value=["ACT-001", "ACT-003", "junk"])
		self._tbl = mock.patch.object(frappe.db, "table_exists", return_value=False)
		self.sql, self.sql_list, self.tbl = self._sql.start(), self._sql_list.start(), self._tbl.start()

	def tearDown(self):
		mock.patch.stopall()

	def _fails(self, **k):
		with self.assertRaises(Exception) as cm:
			FakeActivity(**k).validate()
		return str(cm.exception)

	def test_valid_activity_passes(self):
		FakeActivity().validate()

	def test_name_and_code_required(self):
		self.assertIn("Activity Name", self._fails(activity_name="   "))
		self.assertIn("Code", self._fails(activity_code=""))

	def test_bad_category_and_code(self):
		self.assertIn("Category", self._fails(category="Plumbing"))
		self.assertIn("Invalid code", self._fails(activity_code="ACT 4"))

	def test_same_name_blocked_ignoring_case_and_spaces(self):
		self.sql.return_value = [("ACT-002",)]
		msg = self._fails(activity_name="  blockwork ")
		self.assertIn("already exists", msg)
		self.assertIn("ACT-002", msg)
		self.assertEqual(self.sql.call_args[0][1][0], "blockwork")

	def test_editing_itself_is_not_a_duplicate(self):
		FakeActivity(name="ACT-004").validate()
		self.assertEqual(self.sql.call_args[0][1][1], "ACT-004")

	def test_code_uppercased_and_name_spaces_collapsed(self):
		a = FakeActivity(activity_code=" act-009 ", activity_name="Wall   tiling")
		a.validate()
		self.assertEqual((a.activity_code, a.activity_name), ("ACT-009", "Wall tiling"))

	def test_next_code_uses_highest_number(self):
		self.assertEqual(la.next_activity_code(), "ACT-004")
		self.sql_list.return_value = []
		self.assertEqual(la.next_activity_code(), "ACT-001")

	def test_blank_code_filled_on_insert(self):
		a = FakeActivity(activity_code="")
		a.before_insert()
		self.assertEqual(a.activity_code, "ACT-004")

	def test_delete_allowed_when_no_contract_doctype_or_not_used(self):
		FakeActivity(name="ACT-001").on_trash()
		self.tbl.return_value = True
		frappe.get_all = mock.MagicMock(return_value=[])
		FakeActivity(name="ACT-001").on_trash()

	def test_delete_blocked_when_used_on_a_contract(self):
		self.tbl.return_value = True
		frappe.get_all = mock.MagicMock(return_value=["LC-0001"])
		with self.assertRaises(Exception) as cm:
			FakeActivity(name="ACT-001", activity_name="Painting house").on_trash()
		self.assertIn("LC-0001", str(cm.exception))
		self.assertIn("Deactivate", str(cm.exception))


if __name__ == "__main__":
	unittest.main()