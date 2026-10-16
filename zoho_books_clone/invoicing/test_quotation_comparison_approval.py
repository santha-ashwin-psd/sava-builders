"""Plain-python tests for the A9.4 approval rules. No bench, no database.

frappe is stubbed. submit_for_approval (which re-validates against the database) is NOT covered here.
"""
import importlib.util
import os
import sys
import types
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))


class ThrowError(Exception):
	pass


def _install_stubs():
	frappe = types.ModuleType("frappe")

	def throw(msg, exc=None):
		raise ThrowError(msg)

	frappe.throw = throw
	frappe._ = lambda s: s
	frappe.db = None
	frappe.get_all = None
	sys.modules["frappe"] = frappe
	utils = types.ModuleType("frappe.utils")
	utils.nowdate = lambda: "2026-10-16"
	sys.modules["frappe.utils"] = utils
	frappe.utils = utils

	for name in ("zoho_books_clone", "zoho_books_clone.invoicing"):
		sys.modules.setdefault(name, types.ModuleType(name))

	spec = importlib.util.spec_from_file_location(
		"zoho_books_clone.invoicing.quotation_comparison_calc", os.path.join(HERE, "quotation_comparison_calc.py"))
	calc = importlib.util.module_from_spec(spec)
	spec.loader.exec_module(calc)
	sys.modules["zoho_books_clone.invoicing.quotation_comparison_calc"] = calc
	sys.modules["zoho_books_clone.invoicing"].quotation_comparison_calc = calc

	spec = importlib.util.spec_from_file_location(
		"zoho_books_clone.invoicing.quotation_comparison_rules", os.path.join(HERE, "quotation_comparison_rules.py"))
	rules = importlib.util.module_from_spec(spec)
	spec.loader.exec_module(rules)
	return rules


rules = _install_stubs()
PM, FIN, DIR = "Purchase Manager", "Finance", "Director"


class Doc:
	def __init__(self, total, status="Pending Approval", raised_by="raiser@x.com", steps=None):
		self.name = "CMP-1"
		self.status = status
		self.raised_by = raised_by
		self.rejection_reason = None
		self.grand_total = total
		self.approval_steps = steps if steps is not None else rules.build_steps(total)
		self.flags = types.SimpleNamespace()

	def get(self, key, default=None):
		return getattr(self, key, default)


def step_row(d):
	return types.SimpleNamespace(**d)


def pending_doc(total):
	d = Doc(total)
	d.approval_steps = [step_row(s) for s in rules.build_steps(total)]
	return d


class Tiers(unittest.TestCase):
	def test_below_finance_threshold_is_purchase_manager_only(self):
		self.assertEqual(rules.required_roles(199999.99), [PM])

	def test_exactly_on_finance_threshold_adds_no_level(self):
		self.assertEqual(rules.required_roles(200000), [PM])

	def test_just_above_finance_threshold(self):
		self.assertEqual(rules.required_roles(200000.01), [PM, FIN])

	def test_exactly_on_director_threshold_adds_no_level(self):
		self.assertEqual(rules.required_roles(500000), [PM, FIN])

	def test_just_above_director_threshold(self):
		self.assertEqual(rules.required_roles(500000.01), [PM, FIN, DIR])

	def test_none_or_zero_total(self):
		self.assertEqual(rules.required_roles(None), [PM])
		self.assertEqual(rules.required_roles(0), [PM])

	def test_steps_are_numbered_and_pending(self):
		steps = rules.build_steps(600000)
		self.assertEqual([(s["level"], s["role"], s["status"]) for s in steps],
			[(1, PM, "Pending"), (2, FIN, "Pending"), (3, DIR, "Pending")])


class Sequence(unittest.TestCase):
	def test_three_levels_then_approved(self):
		d = pending_doc(600000)
		rules.approve(d, "pm@x.com", [PM], "ok", "t1")
		self.assertEqual(d.status, "Pending Approval")
		rules.approve(d, "fin@x.com", [FIN], "", "t2")
		self.assertEqual(d.status, "Pending Approval")
		rules.approve(d, "dir@x.com", [DIR], "  go ahead ", "t3")
		self.assertEqual(d.status, "Approved")
		self.assertEqual([s.approver for s in d.approval_steps], ["pm@x.com", "fin@x.com", "dir@x.com"])
		self.assertEqual(d.approval_steps[2].remarks, "go ahead")
		self.assertEqual(d.approval_steps[0].approved_on, "t1")
		self.assertTrue(d.flags.qc_workflow)

	def test_single_level_approves_in_one_step(self):
		d = pending_doc(150000)
		rules.approve(d, "pm@x.com", [PM], None, "t1")
		self.assertEqual(d.status, "Approved")

	def test_next_level_cannot_be_done_out_of_order(self):
		d = pending_doc(300000)
		with self.assertRaises(ThrowError):
			rules.approve(d, "fin@x.com", [FIN], None, "t1")  # level 1 is still pending

	def test_wrong_role_refused(self):
		d = pending_doc(300000)
		with self.assertRaises(ThrowError):
			rules.approve(d, "fin@x.com", [FIN], None, "t1")

	def test_user_with_several_roles_can_act_on_the_pending_level(self):
		d = pending_doc(300000)
		rules.approve(d, "boss@x.com", [PM, FIN], None, "t1")
		self.assertEqual(d.approval_steps[0].status, "Approved")

	def test_same_person_cannot_approve_two_levels(self):
		d = pending_doc(600000)
		rules.approve(d, "boss@x.com", [PM, FIN, DIR], None, "t1")
		with self.assertRaises(ThrowError):
			rules.approve(d, "boss@x.com", [PM, FIN, DIR], None, "t2")


class Raiser(unittest.TestCase):
	def test_raiser_cannot_approve(self):
		d = pending_doc(100000)
		with self.assertRaises(ThrowError):
			rules.approve(d, "raiser@x.com", [PM, FIN, DIR], None, "t1")

	def test_raiser_cannot_reject(self):
		d = pending_doc(100000)
		with self.assertRaises(ThrowError):
			rules.reject(d, "raiser@x.com", [PM], "no", "t1")


class Rejection(unittest.TestCase):
	def test_reject_needs_reason(self):
		d = pending_doc(100000)
		with self.assertRaises(ThrowError):
			rules.reject(d, "pm@x.com", [PM], "   ", "t1")
		self.assertEqual(d.status, "Pending Approval")

	def test_reject_sets_status_reason_and_step(self):
		d = pending_doc(300000)
		rules.reject(d, "pm@x.com", [PM], " price too high ", "t1")
		self.assertEqual(d.status, "Rejected")
		self.assertEqual(d.rejection_reason, "price too high")
		self.assertEqual(d.approval_steps[0].status, "Rejected")
		self.assertEqual(d.approval_steps[0].approver, "pm@x.com")

	def test_cannot_act_on_a_rejected_comparison(self):
		d = pending_doc(100000)
		rules.reject(d, "pm@x.com", [PM], "no", "t1")
		with self.assertRaises(ThrowError):
			rules.approve(d, "pm@x.com", [PM], None, "t2")

	def test_cannot_act_on_a_draft(self):
		d = pending_doc(100000)
		d.status = "Draft"
		with self.assertRaises(ThrowError):
			rules.approve(d, "pm@x.com", [PM], None, "t1")


if __name__ == "__main__":
	unittest.main(verbosity=2)