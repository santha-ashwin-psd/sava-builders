"""Logic tests for the MRN rules (Sava A5.1) and approval guards (A5.3), no database needed.

Run in the bench:
    bench --site sava run-tests --module zoho_books_clone.manufacturing.doctype.material_request.test_material_request_a5
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
	fm.flags = {}

	class _Err(Exception):
		pass

	def _throw(msg, title=None):
		raise _Err(msg)

	fm.throw = _throw
	fm.whitelist = lambda *a, **k: (lambda f: f)
	model = types.ModuleType("frappe.model")
	document = types.ModuleType("frappe.model.document")
	document.Document = object
	utils = types.ModuleType("frappe.utils")
	utils.nowdate = lambda: "2026-10-14"
	fm.model = model
	fm.utils = utils
	model.document = document
	sys.modules.update({"frappe": fm, "frappe.model": model,
						"frappe.model.document": document, "frappe.utils": utils})

from zoho_books_clone.manufacturing.doctype.material_request import material_request as mr

MR = mr.MaterialRequest


class Row:
	def __init__(self, intended_use="Slab pour", qty=5, warehouse="", item_code="CONS-001"):
		self.intended_use = intended_use
		self.required_qty = qty
		self.warehouse = warehouse
		self.item_code = item_code

	def get(self, k):
		return getattr(self, k, None)


class FakeMR:
	def __init__(self, rows=None, project="SB-001", delivery_warehouse="SB-001 Main Store",
				production_plan="", docstatus=0, new=True, before_docstatus=None,
				before_status="Draft", status="Draft"):
		self.items = [Row()] if rows is None else rows
		self.project = project
		self.delivery_warehouse = delivery_warehouse
		self.production_plan = production_plan
		self.docstatus = docstatus
		self.posting_date = "2026-10-14"
		self.flags = {}
		self._new = new
		self.status = status
		self.db_set_calls = []
		self._before = None if before_docstatus is None else types.SimpleNamespace(
			docstatus=before_docstatus, status=before_status)

	def get(self, k):
		return getattr(self, k, None)

	def is_new(self):
		return self._new

	def get_doc_before_save(self):
		return self._before

	def db_set(self, field, value):
		self.db_set_calls.append((field, value))

	_approval_required = MR._approval_required
	_lock_while_pending = MR._lock_while_pending
	_keep_status_server_side = MR._keep_status_server_side
	_default_row_warehouse = MR._default_row_warehouse
	_validate_mrn_fields = MR._validate_mrn_fields
	_mrn_rules_apply = MR._mrn_rules_apply


def check(doc):
	MR._validate_mrn_fields(doc)


class TestRequiredFields(unittest.TestCase):
	def setUp(self):
		mr.frappe.flags.clear()

	def test_complete_mrn_passes(self):
		check(FakeMR())

	def test_missing_project_blocked(self):
		with self.assertRaises(Exception) as cm:
			check(FakeMR(project=""))
		self.assertIn("Project", str(cm.exception))

	def test_missing_delivery_warehouse_blocked(self):
		with self.assertRaises(Exception) as cm:
			check(FakeMR(delivery_warehouse=""))
		self.assertIn("Delivery Warehouse", str(cm.exception))

	def test_blank_intended_use_names_the_row(self):
		doc = FakeMR(rows=[Row("Columns"), Row("   ")])
		with self.assertRaises(Exception) as cm:
			check(doc)
		self.assertIn("Row 2: Intended Use", str(cm.exception))
		self.assertNotIn("Row 1", str(cm.exception))

	def test_all_missing_listed_in_one_message(self):
		doc = FakeMR(rows=[Row("")], project="", delivery_warehouse="")
		with self.assertRaises(Exception) as cm:
			check(doc)
		msg = str(cm.exception)
		for part in ("Project", "Delivery Warehouse", "Row 1: Intended Use"):
			self.assertIn(part, msg)


class TestWhenRulesApply(unittest.TestCase):
	def setUp(self):
		mr.frappe.flags.clear()

	def bad(self, **kw):
		return FakeMR(project="", **kw)

	def test_production_plan_request_skipped(self):
		check(self.bad(production_plan="PP-2026-00001"))

	def test_skip_flags(self):
		for flag in ("in_install", "in_patch", "in_migrate", "in_test"):
			mr.frappe.flags.clear()
			mr.frappe.flags[flag] = True
			check(self.bad())
		mr.frappe.flags.clear()
		doc = self.bad()
		doc.flags["skip_mrn_rules"] = True
		check(doc)

	def test_draft_save_enforced(self):
		with self.assertRaises(Exception):
			check(self.bad(docstatus=0, new=False))

	def test_submit_step_enforced(self):
		with self.assertRaises(Exception):
			check(self.bad(docstatus=1, new=False, before_docstatus=0))

	def test_update_after_submit_left_alone(self):
		check(self.bad(docstatus=1, new=False, before_docstatus=1))

	def test_new_doc_created_submitted_enforced(self):
		with self.assertRaises(Exception):
			check(self.bad(docstatus=1, new=True))


class TestRowWarehouse(unittest.TestCase):
	def test_empty_row_gets_delivery_warehouse(self):
		doc = FakeMR(rows=[Row(warehouse=""), Row(warehouse="Other Store")])
		doc._default_row_warehouse()
		self.assertEqual([r.warehouse for r in doc.items], ["SB-001 Main Store", "Other Store"])

	def test_no_header_warehouse_leaves_rows_alone(self):
		doc = FakeMR(rows=[Row(warehouse="")], delivery_warehouse="")
		doc._default_row_warehouse()
		self.assertEqual(doc.items[0].warehouse, "")


class TestFullValidate(unittest.TestCase):
	def setUp(self):
		mr.frappe.flags.clear()

	def run_validate(self, doc):
		MR.validate(doc)

	def test_existing_rules_still_apply(self):
		with self.assertRaises(Exception):
			self.run_validate(FakeMR(rows=[]))
		with self.assertRaises(Exception):
			self.run_validate(FakeMR(rows=[Row(qty=0)]))

	def test_valid_mrn_passes_and_fills_row_warehouse(self):
		doc = FakeMR()
		self.run_validate(doc)
		self.assertEqual(doc.items[0].warehouse, "SB-001 Main Store")


class TestApprovalGuards(unittest.TestCase):
	"""Sava A5.3: status is server-controlled, pending MRNs are locked, no direct submit."""

	def setUp(self):
		mr.frappe.flags.clear()

	def test_new_doc_status_forced_to_draft(self):
		doc = FakeMR(status="Approved")
		MR._keep_status_server_side(doc)
		self.assertEqual(doc.status, "Draft")

	def test_plain_save_cannot_change_status(self):
		doc = FakeMR(new=False, before_docstatus=0, before_status="Draft", status="Approved")
		MR._keep_status_server_side(doc)
		self.assertEqual(doc.status, "Draft")

	def test_workflow_flag_lets_status_through(self):
		doc = FakeMR(new=False, before_docstatus=0, before_status="Draft", status="Pending Approval")
		doc.flags["mrn_workflow"] = True
		MR._keep_status_server_side(doc)
		self.assertEqual(doc.status, "Pending Approval")

	def test_legacy_submitted_status_kept(self):
		doc = FakeMR(new=False, docstatus=1, before_docstatus=1, before_status="Ordered", status="Submitted")
		MR._keep_status_server_side(doc)
		self.assertEqual(doc.status, "Ordered")

	def test_pending_request_locked(self):
		doc = FakeMR(new=False, before_docstatus=0, before_status="Pending Approval", status="Pending Approval")
		with self.assertRaises(Exception) as cm:
			MR._lock_while_pending(doc)
		self.assertIn("waiting for approval", str(cm.exception))

	def test_pending_request_editable_by_the_workflow(self):
		doc = FakeMR(new=False, before_docstatus=0, before_status="Pending Approval")
		doc.flags["mrn_workflow"] = True
		MR._lock_while_pending(doc)

	def test_draft_and_sent_back_not_locked(self):
		for st in ("Draft", "Sent Back"):
			MR._lock_while_pending(FakeMR(new=False, before_docstatus=0, before_status=st))

	def test_production_plan_request_never_locked(self):
		doc = FakeMR(production_plan="PP-1", new=False, before_docstatus=0, before_status="Pending Approval")
		MR._lock_while_pending(doc)

	def test_direct_submit_blocked(self):
		with self.assertRaises(Exception) as cm:
			MR.before_submit(FakeMR(docstatus=1))
		self.assertIn("Send for Approval", str(cm.exception))

	def test_submit_through_approval_allowed(self):
		doc = FakeMR(docstatus=1)
		doc.flags["mrn_workflow"] = True
		MR.before_submit(doc)

	def test_direct_submit_allowed_for_production_plan_and_skip_flags(self):
		MR.before_submit(FakeMR(production_plan="PP-1", docstatus=1))
		for flag in ("in_install", "in_patch", "in_migrate", "in_test"):
			mr.frappe.flags.clear()
			mr.frappe.flags[flag] = True
			MR.before_submit(FakeMR(docstatus=1))

	def test_on_submit_status(self):
		doc = FakeMR(docstatus=1)
		doc.flags["mrn_workflow"] = True
		MR.on_submit(doc)
		self.assertEqual(doc.db_set_calls, [("status", "Approved")])
		doc2 = FakeMR(production_plan="PP-1", docstatus=1)
		MR.on_submit(doc2)
		self.assertEqual(doc2.db_set_calls, [("status", "Submitted")])


if __name__ == "__main__":
	unittest.main()