"""Plain-python tests for po_approval_rules (Sava A10.1). No bench, no database.

frappe is stubbed (see test_quotation_comparison_approval). The API endpoints, the doctype sync and the
real Purchase Order save/submit are NOT covered here; they need the live site (a10_check, A10.4).
"""
import importlib.util
import os
import sys
import types
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import test_quotation_comparison_approval as base  # installs the stubs and loads the comparison rules

cmp_rules = base.rules
PM, FIN, DIR = base.PM, base.FIN, base.DIR
ThrowError = base.ThrowError


def _load_rules():
	sys.modules["psd_books.invoicing.quotation_comparison_rules"] = cmp_rules
	sys.modules["psd_books.invoicing"].quotation_comparison_rules = cmp_rules
	frappe = sys.modules["frappe"]
	utils = sys.modules["frappe.utils"]
	if not hasattr(utils, "flt"):
		utils.flt = lambda v, p=None: float(v or 0)
	spec = importlib.util.spec_from_file_location(
		"psd_books.invoicing.po_approval_rules", os.path.join(HERE, "po_approval_rules.py"))
	mod = importlib.util.module_from_spec(spec)
	spec.loader.exec_module(mod)
	return mod


rules = _load_rules()
frappe = sys.modules["frappe"]


class Flags(dict):
	def __getattr__(self, k):
		return self.get(k)

	def __setattr__(self, k, v):
		self[k] = v


def row(**kw):
	return types.SimpleNamespace(**kw)


class PO:
	def __init__(self, total=150000, status="Draft", docstatus=0, new=False, items=None, supplier="S1"):
		self.name = "PO-1"
		self.status = status
		self.docstatus = docstatus
		self.supplier = supplier
		self.grand_total = total
		self.raised_by = None
		self.rejection_reason = None
		self.approval_steps = []
		self.items = items if items is not None else [row(qty=2, rate=10)]
		self.flags = Flags()
		self._new = new

	def get(self, key, default=None):
		return getattr(self, key, default)

	def set(self, key, rows):
		setattr(self, key, [row(**r) if isinstance(r, dict) else r for r in rows])

	def is_new(self):
		return self._new


def pending(total=600000, raised_by="raiser@x.com"):
	d = PO(total)
	rules.send_for_approval(d, raised_by)
	d.flags = Flags()
	return d


class FakeDb:
	def __init__(self, status):
		self.status = status

	def get_value(self, doctype, name, field):
		return self.status


class Sending(unittest.TestCase):
	def test_draft_goes_pending_with_levels_for_the_total(self):
		d = PO(250000)
		rules.send_for_approval(d, "raiser@x.com")
		self.assertEqual(d.status, "Pending Approval")
		self.assertEqual([(s.level, s.role, s.status) for s in d.approval_steps],
			[(1, PM, "Pending"), (2, FIN, "Pending")])
		self.assertEqual(d.raised_by, "raiser@x.com")
		self.assertTrue(d.flags.po_workflow)

	def test_levels_follow_the_value_rules(self):
		for total, roles in ((100000, [PM]), (200000, [PM]), (200000.01, [PM, FIN]),
				(500000, [PM, FIN]), (500000.01, [PM, FIN, DIR])):
			d = PO(total)
			rules.send_for_approval(d, "r@x.com")
			self.assertEqual([s.role for s in d.approval_steps], roles, total)

	def test_sent_back_can_be_sent_again_with_fresh_levels(self):
		d = PO(100000, status="Sent Back")
		d.rejection_reason = "rate too high"
		rules.send_for_approval(d, "r@x.com")
		self.assertEqual(d.status, "Pending Approval")
		self.assertIsNone(d.rejection_reason)
		self.assertEqual(len(d.approval_steps), 1)

	def test_cannot_send_unless_draft_or_sent_back(self):
		for st in ("Pending Approval", "To Receive", "Closed"):
			with self.assertRaises(ThrowError):
				rules.send_for_approval(PO(status=st), "r@x.com")

	def test_cannot_send_a_submitted_po(self):
		with self.assertRaises(ThrowError):
			rules.send_for_approval(PO(docstatus=1), "r@x.com")

	def test_needs_supplier_items_and_value(self):
		with self.assertRaises(ThrowError):
			rules.send_for_approval(PO(supplier=None), "r@x.com")
		with self.assertRaises(ThrowError):
			rules.send_for_approval(PO(items=[]), "r@x.com")
		with self.assertRaises(ThrowError):
			rules.send_for_approval(PO(items=[row(qty=0, rate=10)]), "r@x.com")
		with self.assertRaises(ThrowError):
			rules.send_for_approval(PO(total=0), "r@x.com")


class Acting(unittest.TestCase):
	def test_three_levels_in_order_then_last_flag(self):
		d = pending(600000)
		self.assertFalse(rules.approve(d, "pm@x.com", [PM], "ok", "t1"))
		self.assertEqual(d.status, "Pending Approval")
		self.assertFalse(rules.approve(d, "fin@x.com", [FIN], "", "t2"))
		self.assertTrue(rules.approve(d, "dir@x.com", [DIR], "", "t3"))
		self.assertEqual([s.status for s in d.approval_steps], ["Approved"] * 3)
		self.assertEqual(d.approval_steps[0].remarks, "ok")
		self.assertEqual(d.approval_steps[2].approver, "dir@x.com")

	def test_single_level_is_last(self):
		d = pending(100000)
		self.assertTrue(rules.approve(d, "pm@x.com", [PM], None, "t1"))

	def test_sender_cannot_approve_or_send_back(self):
		d = pending(100000, raised_by="pm@x.com")
		with self.assertRaises(ThrowError):
			rules.approve(d, "pm@x.com", [PM], "", "t")
		with self.assertRaises(ThrowError):
			rules.send_back(d, "pm@x.com", [PM], "no", "t")

	def test_wrong_role_and_out_of_order_blocked(self):
		d = pending(600000)
		with self.assertRaises(ThrowError):
			rules.approve(d, "fin@x.com", [FIN], "", "t")
		with self.assertRaises(ThrowError):
			rules.approve(d, "dir@x.com", [DIR], "", "t")

	def test_same_person_cannot_approve_two_levels(self):
		d = pending(300000)
		rules.approve(d, "both@x.com", [PM, FIN], "", "t1")
		with self.assertRaises(ThrowError):
			rules.approve(d, "both@x.com", [PM, FIN], "", "t2")

	def test_cannot_act_when_not_pending(self):
		for st in ("Draft", "Sent Back", "To Receive"):
			d = pending(100000)
			d.status = st
			with self.assertRaises(ThrowError):
				rules.approve(d, "pm@x.com", [PM], "", "t")

	def test_send_back_needs_a_reason_and_records_it(self):
		d = pending(250000)
		with self.assertRaises(ThrowError):
			rules.send_back(d, "pm@x.com", [PM], "  ", "t")
		rules.send_back(d, "pm@x.com", [PM], "Rate too high", "t")
		self.assertEqual(d.status, "Sent Back")
		self.assertEqual(d.rejection_reason, "Rate too high")
		self.assertEqual(d.approval_steps[0].status, "Rejected")
		self.assertEqual(d.approval_steps[1].status, "Pending")

	def test_send_back_at_second_level_keeps_first_approval_as_history(self):
		d = pending(250000)
		rules.approve(d, "pm@x.com", [PM], "", "t1")
		rules.send_back(d, "fin@x.com", [FIN], "Budget", "t2")
		self.assertEqual([s.status for s in d.approval_steps], ["Approved", "Rejected"])
		self.assertEqual(d.status, "Sent Back")


class StatusLock(unittest.TestCase):
	def setUp(self):
		self.old = frappe.db

	def tearDown(self):
		frappe.db = self.old

	def test_workflow_flag_bypasses_the_lock(self):
		frappe.db = FakeDb("Pending Approval")
		d = PO(status="To Receive")
		d.flags.po_workflow = True
		rules.validate_status(d)

	def test_pending_po_cannot_be_edited(self):
		frappe.db = FakeDb("Pending Approval")
		with self.assertRaises(ThrowError):
			rules.validate_status(PO(status="Pending Approval"))

	def test_pending_po_cannot_be_submitted_by_another_route(self):
		frappe.db = FakeDb("Pending Approval")
		with self.assertRaises(ThrowError):
			rules.validate_status(PO(status="To Receive", docstatus=1))

	def test_status_cannot_be_set_by_hand(self):
		frappe.db = FakeDb("Draft")
		for st in ("Pending Approval", "Sent Back"):
			with self.assertRaises(ThrowError):
				rules.validate_status(PO(status=st))

	def test_new_po_cannot_start_as_pending(self):
		frappe.db = FakeDb(None)
		with self.assertRaises(ThrowError):
			rules.validate_status(PO(status="Pending Approval", new=True))

	def test_sent_back_po_can_be_edited_and_kept_sent_back(self):
		frappe.db = FakeDb("Sent Back")
		rules.validate_status(PO(status="Sent Back"))
		rules.validate_status(PO(status="Draft"))

	def test_ordinary_flows_are_untouched(self):
		for before, now, ds in (("Draft", "Draft", 0), ("Draft", "To Receive", 1), ("To Receive", "Partially Received", 1),
				("To Receive", "Cancelled", 2)):
			frappe.db = FakeDb(before)
			rules.validate_status(PO(status=now, docstatus=ds))
		frappe.db = FakeDb(None)
		rules.validate_status(PO(status="Draft", new=True))


class ActionState(unittest.TestCase):
	def steps(self, *rows):
		return [{"level": i, "role": r, "status": s, "approver": a} for i, (r, s, a) in enumerate(rows, 1)]

	def test_not_pending_has_no_action(self):
		for st in ("Draft", "Sent Back", "To Receive"):
			out = rules.action_state(st, "r@x.com", self.steps((PM, "Pending", None)), "pm@x.com", [PM])
			self.assertFalse(out["can_act"])
			self.assertIsNone(out["level"])

	def test_role_holder_can_act(self):
		out = rules.action_state("Pending Approval", "r@x.com", self.steps((PM, "Pending", None)), "pm@x.com", [PM])
		self.assertTrue(out["can_act"])
		self.assertEqual((out["level"], out["role"]), (1, PM))

	def test_sender_wrong_role_and_repeat_approver_cannot(self):
		s = self.steps((PM, "Approved", "pm@x.com"), (FIN, "Pending", None))
		self.assertFalse(rules.action_state("Pending Approval", "pm@x.com", s, "pm@x.com", [PM, FIN])["can_act"])
		self.assertFalse(rules.action_state("Pending Approval", "r@x.com", s, "pm@x.com", [PM, FIN])["can_act"])
		self.assertFalse(rules.action_state("Pending Approval", "r@x.com", s, "dir@x.com", [DIR])["can_act"])
		self.assertTrue(rules.action_state("Pending Approval", "r@x.com", s, "fin@x.com", [FIN])["can_act"])


class SubmitGate(unittest.TestCase):
	def approved(self, total):
		d = pending(total)
		for st in d.approval_steps:
			st.status, st.approver = "Approved", "u-%s@x.com" % st.level
		return d

	def test_all_levels_approved_passes(self):
		for total in (100000, 250000, 600000):
			rules.check_ready_to_submit(self.approved(total))

	def test_draft_without_steps_blocked(self):
		with self.assertRaises(ThrowError):
			rules.check_ready_to_submit(PO(100000))

	def test_pending_level_blocked(self):
		d = self.approved(250000)
		d.approval_steps[1].status = "Pending"
		with self.assertRaises(ThrowError):
			rules.check_ready_to_submit(d)

	def test_rejected_level_blocked(self):
		d = self.approved(100000)
		d.approval_steps[0].status = "Rejected"
		with self.assertRaises(ThrowError):
			rules.check_ready_to_submit(d)

	def test_total_raised_after_approval_blocked(self):
		d = self.approved(150000)
		d.grand_total = 250000
		with self.assertRaises(ThrowError):
			rules.check_ready_to_submit(d)

	def test_total_lowered_after_approval_blocked(self):
		d = self.approved(250000)
		d.grand_total = 150000
		with self.assertRaises(ThrowError):
			rules.check_ready_to_submit(d)

	def test_full_flow_last_approval_then_gate_passes(self):
		d = pending(250000)
		self.assertFalse(rules.approve(d, "pm@x.com", [PM], None, "now"))
		with self.assertRaises(ThrowError):
			rules.check_ready_to_submit(d)
		self.assertTrue(rules.approve(d, "fin@x.com", [FIN], None, "now"))
		rules.check_ready_to_submit(d)


class Cancelling(unittest.TestCase):
	def test_sender_may_cancel(self):
		d = pending(250000)
		self.assertTrue(rules.can_cancel_pending(d.status, d.raised_by, d.approval_steps, "raiser@x.com", []))

	def test_approver_of_the_pending_level_may_cancel(self):
		d = pending(250000)
		self.assertTrue(rules.can_cancel_pending(d.status, d.raised_by, d.approval_steps, "pm@x.com", [PM]))
		self.assertFalse(rules.can_cancel_pending(d.status, d.raised_by, d.approval_steps, "fin@x.com", [FIN]))

	def test_the_pending_level_moves_on_after_an_approval(self):
		d = pending(250000)
		rules.approve(d, "pm@x.com", [PM], None, "now")
		self.assertFalse(rules.can_cancel_pending(d.status, d.raised_by, d.approval_steps, "pm@x.com", [PM]))
		self.assertTrue(rules.can_cancel_pending(d.status, d.raised_by, d.approval_steps, "fin@x.com", [FIN]))

	def test_only_a_pending_approval_po_can_be_cancelled_here(self):
		for status in ("Draft", "Sent Back", "Cancelled", "To Receive"):
			self.assertFalse(rules.can_cancel_pending(status, "raiser@x.com", [], "raiser@x.com", [PM]), status)
			d = PO(100000, status=status)
			d.raised_by = "raiser@x.com"
			with self.assertRaises(ThrowError):
				rules.cancel_pending(d, "raiser@x.com", [], "no longer needed", "now")

	def test_reason_required(self):
		for reason in (None, "", "   "):
			d = pending(250000)
			with self.assertRaises(ThrowError):
				rules.cancel_pending(d, "raiser@x.com", [], reason, "now")
			self.assertEqual(d.status, "Pending Approval")

	def test_someone_else_can_not_cancel(self):
		d = pending(250000)
		with self.assertRaises(ThrowError):
			rules.cancel_pending(d, "fin@x.com", [FIN], "no longer needed", "now")
		self.assertEqual(d.status, "Pending Approval")
		self.assertEqual([s.status for s in d.approval_steps], ["Pending", "Pending"])

	def test_cancel_closes_the_open_levels_and_records_who_and_why(self):
		d = pending(600000)
		rules.approve(d, "pm@x.com", [PM], "ok", "t1")
		changed = rules.cancel_pending(d, "raiser@x.com", [], " duplicate order ", "t2")
		self.assertEqual(d.status, "Cancelled")
		self.assertTrue(d.flags.po_workflow)
		self.assertEqual([s.status for s in d.approval_steps], ["Approved", "Cancelled", "Cancelled"])
		self.assertEqual([s.level for s in changed], [2, 3])
		self.assertEqual((d.approval_steps[1].approver, d.approval_steps[1].approved_on), ("raiser@x.com", "t2"))
		self.assertEqual(d.approval_steps[1].remarks, "Cancelled: duplicate order")
		self.assertIsNone(getattr(d.approval_steps[2], "approver", None))
		self.assertEqual(d.approval_steps[0].remarks, "ok")

	def test_cancelling_a_sent_back_po_closes_only_the_untouched_levels(self):
		d = pending(600000)
		rules.send_back(d, "pm@x.com", [PM], "rate too high", "now")
		self.assertEqual([s.status for s in d.approval_steps], ["Rejected", "Pending", "Pending"])
		changed = rules.cancel_open_steps(d)
		self.assertEqual([s.status for s in d.approval_steps], ["Rejected", "Cancelled", "Cancelled"])
		self.assertEqual(len(changed), 2)
		self.assertEqual(rules.cancel_open_steps(d), [])

	def test_pending_approval_po_can_not_be_deleted(self):
		with self.assertRaises(ThrowError):
			rules.assert_deletable("Pending Approval")
		for status in ("Draft", "Sent Back", "Cancelled", None):
			rules.assert_deletable(status)


if __name__ == "__main__":
	unittest.main(verbosity=2)