"""Logic tests for the MRN issue prefill (Sava A6.2), no database needed.

Run in the bench:
	bench --site sava run-tests --module psd_books.api.test_mrn_issue_prefill
"""
import os
import sys
import types
import unittest

try:
	import frappe  # noqa: F401
	STUBBED = False
except ImportError:  # plain-python run outside a bench
	STUBBED = True
	fm = types.ModuleType("frappe")
	fm._ = lambda s: s

	class _Err(Exception):
		pass

	def _throw(msg, *a, **k):
		raise _Err(msg)

	fm.throw = _throw
	fm.whitelist = lambda *a, **k: (lambda f: f)
	fm.DoesNotExistError = _Err
	fm.PermissionError = _Err
	utils = types.ModuleType("frappe.utils")
	utils.flt = lambda v, p=None: float(v or 0)
	utils.now_datetime = lambda: "now"
	fm.utils = utils
	acc = types.ModuleType("psd_books.utils.access")
	acc._membership = lambda u: {}
	acc.assert_can = lambda *a, **k: None
	acc.assert_company = lambda *a, **k: None
	pkg = types.ModuleType("psd_books")
	pkg.__path__ = [os.path.dirname(os.path.dirname(os.path.abspath(__file__)))]
	upkg = types.ModuleType("psd_books.utils")
	upkg.__path__ = []
	sys.modules.update({
		"frappe": fm, "frappe.utils": utils, "psd_books": pkg,
		"psd_books.utils": upkg, "psd_books.utils.access": acc})

from psd_books.api.mrn import build_issue_prefill

MRN = {"name": "SB-MRN-26-0002", "docstatus": 1, "status": "Approved", "company": "sava-builders",
	"project": "aj001", "delivery_warehouse": "aj001 Main Store"}


def line(name, item, req, issued=0, use="Slab"):
	return {"name": name, "item_code": item, "item_name": item, "required_qty": req,
		"issued_qty": issued, "uom": "Nos", "intended_use": use}


class TestIssuePrefill(unittest.TestCase):
	def test_basic(self):
		out = build_issue_prefill(MRN, [line("r1", "CEM-50", 20)])
		self.assertEqual(out["project"], "aj001")
		self.assertEqual(out["to_warehouse"], "aj001 Main Store")
		self.assertEqual(out["items"][0]["mrn_item"], "r1")
		self.assertEqual(out["items"][0]["pending_qty"], 20.0)
		self.assertEqual(out["items"][0]["intended_use"], "Slab")

	def test_pending_is_required_minus_issued(self):
		out = build_issue_prefill(MRN, [line("r1", "CEM-50", 20, 5)])
		self.assertEqual(out["items"][0]["pending_qty"], 15.0)

	def test_fully_issued_line_is_left_out(self):
		out = build_issue_prefill(MRN, [line("r1", "CEM-50", 20, 20), line("r2", "SND", 10, 4)])
		self.assertEqual([i["mrn_item"] for i in out["items"]], ["r2"])

	def test_all_issued_throws(self):
		with self.assertRaises(Exception):
			build_issue_prefill(MRN, [line("r1", "CEM-50", 20, 20)])

	def test_not_approved_throws(self):
		for status, ds in (("Ordered", 1), ("Pending Approval", 0), ("Draft", 0), ("Approved", 2)):
			with self.assertRaises(Exception):
				build_issue_prefill(dict(MRN, status=status, docstatus=ds), [line("r1", "CEM-50", 20)])

	def test_missing_project_and_warehouse(self):
		out = build_issue_prefill(dict(MRN, project=None, delivery_warehouse=None), [line("r1", "CEM-50", 3)])
		self.assertEqual((out["project"], out["to_warehouse"]), ("", ""))

"""Logic tests for the MRN issue prefill (Sava A6.2), no database needed.

Run in the bench:
	bench --site sava run-tests --module psd_books.api.test_mrn_issue_prefill
"""
import os
import sys
import types
import unittest

try:
	import frappe  # noqa: F401
	STUBBED = False
except ImportError:  # plain-python run outside a bench
	STUBBED = True
	fm = types.ModuleType("frappe")
	fm._ = lambda s: s

	class _Err(Exception):
		pass

	def _throw(msg, *a, **k):
		raise _Err(msg)

	fm.throw = _throw
	fm.whitelist = lambda *a, **k: (lambda f: f)
	fm.DoesNotExistError = _Err
	fm.PermissionError = _Err
	utils = types.ModuleType("frappe.utils")
	utils.flt = lambda v, p=None: float(v or 0)
	utils.now_datetime = lambda: "now"
	fm.utils = utils
	acc = types.ModuleType("psd_books.utils.access")
	acc._membership = lambda u: {}
	acc.assert_can = lambda *a, **k: None
	acc.assert_company = lambda *a, **k: None
	pkg = types.ModuleType("psd_books")
	pkg.__path__ = [os.path.dirname(os.path.dirname(os.path.abspath(__file__)))]
	upkg = types.ModuleType("psd_books.utils")
	upkg.__path__ = []
	sys.modules.update({
		"frappe": fm, "frappe.utils": utils, "psd_books": pkg,
		"psd_books.utils": upkg, "psd_books.utils.access": acc})

from psd_books.api.mrn import build_issue_prefill

MRN = {"name": "SB-MRN-26-0002", "docstatus": 1, "status": "Approved", "company": "sava-builders",
	"project": "aj001", "delivery_warehouse": "aj001 Main Store"}


def line(name, item, req, issued=0, use="Slab"):
	return {"name": name, "item_code": item, "item_name": item, "required_qty": req,
		"issued_qty": issued, "uom": "Nos", "intended_use": use}


class TestIssuePrefill(unittest.TestCase):
	def test_basic(self):
		out = build_issue_prefill(MRN, [line("r1", "CEM-50", 20)])
		self.assertEqual(out["project"], "aj001")
		self.assertEqual(out["to_warehouse"], "aj001 Main Store")
		self.assertEqual(out["items"][0]["mrn_item"], "r1")
		self.assertEqual(out["items"][0]["pending_qty"], 20.0)
		self.assertEqual(out["items"][0]["intended_use"], "Slab")

	def test_pending_is_required_minus_issued(self):
		out = build_issue_prefill(MRN, [line("r1", "CEM-50", 20, 5)])
		self.assertEqual(out["items"][0]["pending_qty"], 15.0)

	def test_fully_issued_line_is_left_out(self):
		out = build_issue_prefill(MRN, [line("r1", "CEM-50", 20, 20), line("r2", "SND", 10, 4)])
		self.assertEqual([i["mrn_item"] for i in out["items"]], ["r2"])

	def test_all_issued_throws(self):
		with self.assertRaises(Exception):
			build_issue_prefill(MRN, [line("r1", "CEM-50", 20, 20)])

	def test_not_approved_throws(self):
		for status, ds in (("Ordered", 1), ("Pending Approval", 0), ("Draft", 0), ("Approved", 2), ("Issued", 1)):
			with self.assertRaises(Exception):
				build_issue_prefill(dict(MRN, status=status, docstatus=ds), [line("r1", "CEM-50", 20)])

	def test_partly_issued_is_allowed(self):
		out = build_issue_prefill(dict(MRN, status="Partly Issued"), [line("r1", "CEM-50", 20, 5)])
		self.assertEqual(out["items"][0]["pending_qty"], 15.0)

	def test_missing_project_and_warehouse(self):
		out = build_issue_prefill(dict(MRN, project=None, delivery_warehouse=None), [line("r1", "CEM-50", 3)])
		self.assertEqual((out["project"], out["to_warehouse"]), ("", ""))


if __name__ == "__main__":
	unittest.main()
if __name__ == "__main__":
	unittest.main()