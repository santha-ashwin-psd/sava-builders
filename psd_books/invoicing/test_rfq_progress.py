"""Plain-python tests for the RFQ list progress label (Status column). No bench, no database; frappe is stubbed.

Run: python3 -m unittest psd_books.invoicing.test_rfq_progress  (or from this folder: python3 -m unittest test_rfq_progress)
The endpoint get_rfq_progress itself (database reads, company filtering) is NOT covered here.
"""
import importlib.util
import os
import sys
import types
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))


def _load():
	frappe = types.ModuleType("frappe")
	frappe._ = lambda s: s
	frappe.throw = lambda *a, **k: None
	utils = types.ModuleType("frappe.utils")
	for n in ("add_days", "flt", "getdate", "nowdate"):
		setattr(utils, n, lambda *a, **k: None)
	sys.modules["frappe"], sys.modules["frappe.utils"] = frappe, utils
	frappe.utils = utils
	spec = importlib.util.spec_from_file_location("rfq_rules_progress", os.path.join(HERE, "rfq_rules.py"))
	mod = importlib.util.module_from_spec(spec)
	spec.loader.exec_module(mod)
	return mod


R = _load()


class Label(unittest.TestCase):
	def test_stored_status_only(self):
		self.assertEqual(R.progress_label("Draft", 0, 0), "Draft")
		self.assertEqual(R.progress_label("Sent", 0, 3), "Sent")
		self.assertEqual(R.progress_label("Cancelled", 2, 3, "Approved"), "Cancelled")

	def test_quoted_count(self):
		self.assertEqual(R.progress_label("Sent", 2, 3), "2 of 3 quoted")
		self.assertEqual(R.progress_label("Sent", 3, 3), "3 of 3 quoted")
		self.assertEqual(R.progress_label("Sent", 1, 0), "1 of 1 quoted")  # never more quoted than total

	def test_comparison_steps_win_over_quotes(self):
		for cmp_status, label in (("Draft", "Compared"), ("Pending Approval", "Waiting for Approval"),
				("Approved", "Approved"), ("Partially Ordered", "Partially Ordered"), ("LPOs Created", "LPOs Created")):
			self.assertEqual(R.progress_label("Sent", 3, 3, cmp_status), label)

	def test_rejected_or_missing_comparison_falls_back_to_quotes(self):
		self.assertEqual(R.progress_label("Sent", 2, 3, "Rejected"), "2 of 3 quoted")
		self.assertEqual(R.progress_label("Sent", 2, 3, None), "2 of 3 quoted")


class Map(unittest.TestCase):
	def test_map(self):
		rfqs = [{"name": "R1", "status": "Sent"}, {"name": "R2", "status": "Sent"}, {"name": "R3", "status": "Draft"},
			{"name": "R4", "status": "Sent"}]
		rows = [{"parent": "R1", "quotation": "SQ1"}, {"parent": "R1", "quotation": None}, {"parent": "R1", "quotation": ""},
			{"parent": "R2", "quotation": "SQ2"}, {"parent": "R2", "quotation": "SQ3"},
			{"parent": "R4", "quotation": None}, {"parent": "R4", "quotation": None}]
		out = R.progress_map(rfqs, rows, [{"request_for_quotation": "R2", "status": "Pending Approval"}])
		self.assertEqual(out["R1"]["label"], "1 of 3 quoted")
		self.assertEqual(out["R2"]["label"], "Waiting for Approval")
		self.assertEqual((out["R2"]["quoted"], out["R2"]["total"], out["R2"]["comparison"]), (2, 2, "Pending Approval"))
		self.assertEqual(out["R3"]["label"], "Draft")
		self.assertEqual(out["R4"]["label"], "Sent")

	def test_empty(self):
		self.assertEqual(R.progress_map([], [], []), {})


if __name__ == "__main__":
	unittest.main(verbosity=2)