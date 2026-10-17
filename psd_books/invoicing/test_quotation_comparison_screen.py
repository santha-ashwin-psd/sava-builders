"""Plain-python tests for the A9.6 screen data (action_state, supplier_summary). No bench, no database.

frappe is stubbed. comparison_detail / comparison_data (database reads) are NOT covered here.
"""
import os
import sys
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import test_quotation_comparison_approval as base  # installs the stubs and loads the rules module

rules = base.rules
PM, FIN, DIR = base.PM, base.FIN, base.DIR


def steps(*rows):
	return [{"level": i, "role": r, "status": s, "approver": a} for i, (r, s, a) in enumerate(rows, 1)]


class ActionState(unittest.TestCase):
	def test_not_pending_has_no_action(self):
		for st in ("Draft", "Approved", "Rejected", "LPOs Created"):
			out = rules.action_state(st, "r@x.com", steps((PM, "Pending", None)), "pm@x.com", [PM])
			self.assertFalse(out["can_act"])
			self.assertIsNone(out["level"])

	def test_pending_level_user_with_role_can_act(self):
		out = rules.action_state("Pending Approval", "r@x.com", steps((PM, "Pending", None)), "pm@x.com", [PM])
		self.assertTrue(out["can_act"])
		self.assertEqual((out["level"], out["role"]), (1, PM))

	def test_raiser_cannot_act(self):
		out = rules.action_state("Pending Approval", "pm@x.com", steps((PM, "Pending", None)), "pm@x.com", [PM])
		self.assertFalse(out["can_act"])
		self.assertIn("raised", out["reason"])

	def test_wrong_role_names_the_needed_role(self):
		out = rules.action_state("Pending Approval", "r@x.com", steps((PM, "Pending", None)), "f@x.com", [FIN])
		self.assertFalse(out["can_act"])
		self.assertIn(PM, out["reason"])

	def test_second_level_needs_finance(self):
		st = steps((PM, "Approved", "pm@x.com"), (FIN, "Pending", None))
		self.assertTrue(rules.action_state("Pending Approval", "r@x.com", st, "f@x.com", [FIN])["can_act"])
		out = rules.action_state("Pending Approval", "r@x.com", st, "pm2@x.com", [PM])
		self.assertFalse(out["can_act"])
		self.assertEqual(out["level"], 2)

	def test_one_person_cannot_approve_two_levels(self):
		st = steps((PM, "Approved", "both@x.com"), (FIN, "Pending", None))
		out = rules.action_state("Pending Approval", "r@x.com", st, "both@x.com", [PM, FIN])
		self.assertFalse(out["can_act"])
		self.assertIn("already approved", out["reason"])

	def test_no_pending_step(self):
		out = rules.action_state("Pending Approval", "r@x.com", steps((PM, "Approved", "pm@x.com")), "x@x.com", [PM])
		self.assertFalse(out["can_act"])

	def test_agrees_with_check_can_act(self):
		cases = [("pm@x.com", [PM]), ("r@x.com", [PM]), ("f@x.com", [FIN]), ("pm2@x.com", [PM, FIN])]
		for total in (100000, 300000, 600000):
			for user, roles in cases:
				d = base.pending_doc(total)
				st = [{"level": s.level, "role": s.role, "status": s.status, "approver": getattr(s, "approver", None)}
					for s in d.approval_steps]
				try:
					rules.check_can_act(d, user, roles)
					allowed = True
				except base.ThrowError:
					allowed = False
				self.assertEqual(rules.action_state(d.status, d.raised_by, st, user, roles)["can_act"], allowed,
					(total, user, roles))


class SupplierSummary(unittest.TestCase):
	def test_groups_by_supplier_in_first_seen_order(self):
		items = [
			{"selected_supplier": "S2", "supplier_name": "Two", "amount": 100, "tax_amount": 16},
			{"selected_supplier": "S1", "supplier_name": "One", "amount": 50, "tax_amount": 8},
			{"selected_supplier": "S2", "supplier_name": "Two", "amount": 200, "tax_amount": 32},
		]
		out = rules.supplier_summary(items)
		self.assertEqual([o["supplier"] for o in out], ["S2", "S1"])
		self.assertEqual((out[0]["line_count"], out[0]["net_total"], out[0]["total_tax"], out[0]["grand_total"]),
			(2, 300.0, 48.0, 348.0))
		self.assertEqual(out[1]["grand_total"], 58.0)

	def test_unawarded_line_is_left_out(self):
		items = [{"selected_supplier": None, "amount": 0, "tax_amount": 0},
			{"selected_supplier": "S1", "supplier_name": "One", "amount": 10, "tax_amount": 0}]
		self.assertEqual(len(rules.supplier_summary(items)), 1)

	def test_empty(self):
		self.assertEqual(rules.supplier_summary([]), [])


if __name__ == "__main__":
	unittest.main(verbosity=2)