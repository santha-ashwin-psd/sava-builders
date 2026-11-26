"""Logic tests for the Labour Worker rules (no database needed).

Run in the bench:
	bench --site sava run-tests --app psd_books --module psd_books.invoicing.doctype.labour_worker.test_labour_worker
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
	fm.session = types.SimpleNamespace(user="u")
	fm.get_all = mock.MagicMock(return_value=[])
	model = types.ModuleType("frappe.model")
	document = types.ModuleType("frappe.model.document")
	document.Document = object
	fm.model = model
	model.document = document
	utils = types.ModuleType("frappe.utils")
	utils.flt = lambda v, p=None: float(v or 0)
	fm.utils = utils
	sys.modules.update({"frappe": fm, "frappe.model": model, "frappe.model.document": document, "frappe.utils": utils})

import frappe  # noqa: E402,F811
from psd_books.invoicing.doctype.labour_worker import labour_worker as lw  # noqa: E402


class FakeWorker(lw.LabourWorker):
	def __init__(self, name=None, **k):
		self.name = name
		self.worker_name = k.get("worker_name", "Ann")
		self.id_no = k.get("id_no")
		self.skill = k.get("skill", "Unskilled")
		self.rate = k.get("rate", 0)
		self.status = k.get("status", "Active")


def check(w, dup_rows=(), sheets=()):
	"""Run validate (dup_rows = what the duplicate-ID query returns)."""
	with mock.patch.object(frappe.db, "sql", return_value=list(dup_rows)):
		w.validate()


class TestValidate(unittest.TestCase):
	def test_rate_can_not_be_negative(self):
		with self.assertRaises(Exception):
			check(FakeWorker(rate=-1))
		check(FakeWorker(rate=655))   # a normal rate passes


	def test_good_worker_passes_and_name_is_tidied(self):
		w = FakeWorker(worker_name="  Ann   Wanjiku ", id_no=" 4052  8637 ")
		check(w)
		self.assertEqual((w.worker_name, w.id_no), ("Ann Wanjiku", "4052 8637"))

	def test_id_no_is_optional(self):
		for blank in (None, "", "   "):
			w = FakeWorker(id_no=blank)
			check(w)   # no duplicate query result, no error
			self.assertIsNone(w.id_no)

	def test_blank_id_never_looked_up_for_duplicates(self):
		w = FakeWorker(id_no="")
		with mock.patch.object(frappe.db, "sql") as q:
			w.validate()
		q.assert_not_called()

	def test_duplicate_id_is_blocked_and_names_the_owner(self):
		with self.assertRaises(Exception) as cm:
			check(FakeWorker(id_no="40528637"), dup_rows=[("WRK-00001", "Bob")])
		self.assertIn("Bob", str(cm.exception))
		self.assertIn("WRK-00001", str(cm.exception))

	def test_duplicate_check_is_case_insensitive_and_skips_self(self):
		w = FakeWorker(name="WRK-00002", id_no="AbC123")
		with mock.patch.object(frappe.db, "sql", return_value=[]) as q:
			w.validate()
		args = q.call_args.args[1]
		self.assertEqual(args, ("abc123", "WRK-00002"))

	def test_name_required(self):
		with self.assertRaises(Exception):
			check(FakeWorker(worker_name="   "))

	def test_skill_and_status_values(self):
		for sk in ("Skilled", "Unskilled"):
			check(FakeWorker(skill=sk))
		for st in ("Active", "Inactive"):
			check(FakeWorker(status=st))
		with self.assertRaises(Exception):
			check(FakeWorker(skill="Semi"))
		with self.assertRaises(Exception):
			check(FakeWorker(status="Left"))

	def test_grade_mapping_matches_the_wages_sheet(self):
		from psd_books.invoicing.doctype.labour_attendance_sheet import labour_attendance_sheet as las
		self.assertEqual(lw.GRADE_OF_SKILL, las.GRADE_OF_SKILL)
		self.assertEqual(lw.GRADE_OF_SKILL, {"Skilled": "SK", "Unskilled": "C"})


class TestDelete(unittest.TestCase):
	def test_delete_blocked_when_on_a_wages_sheet(self):
		w = FakeWorker(name="WRK-00001")
		with mock.patch.object(lw, "used_on_sheets", return_value=["01"]):
			with self.assertRaises(Exception) as cm:
				w.on_trash()
		self.assertIn("Inactive", str(cm.exception))

	def test_delete_allowed_when_unused(self):
		w = FakeWorker(name="WRK-00001")
		with mock.patch.object(lw, "used_on_sheets", return_value=[]):
			w.on_trash()


if __name__ == "__main__":
	unittest.main()