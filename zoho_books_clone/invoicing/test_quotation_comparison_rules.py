"""Plain-python tests for quotation_comparison_rules (Sava A9.3). No bench, no database.

frappe is stubbed; the DB-backed functions (load_rfq, active_quotations, validate_comparison
on a live site) are NOT covered here.
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

	calc_path = os.path.join(HERE, "quotation_comparison_calc.py")
	spec = importlib.util.spec_from_file_location("zoho_books_clone.invoicing.quotation_comparison_calc", calc_path)
	calc = importlib.util.module_from_spec(spec)
	spec.loader.exec_module(calc)
	sys.modules["zoho_books_clone.invoicing.quotation_comparison_calc"] = calc
	sys.modules["zoho_books_clone.invoicing"].quotation_comparison_calc = calc

	rules_path = os.path.join(HERE, "quotation_comparison_rules.py")
	spec = importlib.util.spec_from_file_location("zoho_books_clone.invoicing.quotation_comparison_rules", rules_path)
	rules = importlib.util.module_from_spec(spec)
	spec.loader.exec_module(rules)
	return rules, calc


rules, calc = _install_stubs()


def q(name, supplier, rate, days=None, date="2026-10-10", mrn="MRN-1", amount=None):
	return {"name": name, "quotation": name, "supplier": supplier, "supplier_name": supplier,
		"quotation_date": date, "delivery_days": days,
		"items": [{"mrn_item": mrn, "net_rate": rate, "vat_percent": 16, "amount": amount if amount is not None else rate,
			"tax_amount": (amount if amount is not None else rate) * 0.16}]}


LINE = {"mrn_item": "MRN-1", "item_code": "CEM-50", "item_name": "Cement", "uom": "Bag", "qty": 10}
LINE2 = {"mrn_item": "MRN-2", "item_code": "SAND", "item_name": "Sand", "uom": "Tonne", "qty": 3}


def ranking_for(quotations, lines=(LINE,)):
	return calc.rank_comparison(list(lines), quotations)


class DefaultsAndChoices(unittest.TestCase):
	def test_default_is_l1_without_reason(self):
		r = ranking_for([q("SQ-1", "A", 100), q("SQ-2", "B", 90)])
		rows = rules.apply_selections(r, {}, default_missing=True)
		self.assertEqual(rows[0]["selected_quotation"], "SQ-2")
		self.assertEqual(rows[0]["selected_rank"], 1)
		self.assertEqual(rows[0]["lowest_rate"], 90)
		self.assertEqual(rows[0]["reason"], "")

	def test_server_fills_amounts_and_vat(self):
		r = ranking_for([q("SQ-1", "A", 100, amount=1000)])
		row = rules.apply_selections(r, {}, default_missing=True)[0]
		self.assertEqual(row["amount"], 1000)
		self.assertEqual(row["vat_percent"], 16)
		self.assertAlmostEqual(row["tax_amount"], 160)

	def test_choosing_same_rate_as_l1_needs_no_reason(self):
		r = ranking_for([q("SQ-1", "A", 90), q("SQ-2", "B", 90, days=5)])
		# SQ-1 wins on delivery days tie-break? SQ-1 has no days, so SQ-2 is L1.
		row = rules.apply_selections(r, {"MRN-1": {"selected_quotation": "SQ-1"}})[0]
		self.assertEqual(row["selected_quotation"], "SQ-1")
		self.assertEqual(row["selected_rank"], 2)
		self.assertEqual(row["reason"], "")

	def test_higher_rate_without_reason_is_refused(self):
		r = ranking_for([q("SQ-1", "A", 100), q("SQ-2", "B", 90)])
		with self.assertRaises(ThrowError):
			rules.apply_selections(r, {"MRN-1": {"selected_quotation": "SQ-1", "reason": "   "}})

	def test_higher_rate_with_reason_is_kept(self):
		r = ranking_for([q("SQ-1", "A", 100), q("SQ-2", "B", 90)])
		row = rules.apply_selections(r, {"MRN-1": {"selected_quotation": "SQ-1", "reason": " Stock on site "}})[0]
		self.assertEqual(row["selected_rank"], 2)
		self.assertEqual(row["reason"], "Stock on site")
		self.assertEqual(row["lowest_quotation"], "SQ-2")


class Refusals(unittest.TestCase):
	def test_blank_choice_on_quoted_line_is_refused(self):
		r = ranking_for([q("SQ-1", "A", 100)])
		with self.assertRaises(ThrowError):
			rules.apply_selections(r, {"MRN-1": {"selected_quotation": None}})

	def test_supplier_that_did_not_quote_is_refused(self):
		r = ranking_for([q("SQ-1", "A", 100), q("SQ-2", "B", 90, mrn="MRN-2")], lines=(LINE, LINE2))
		with self.assertRaises(ThrowError):
			rules.apply_selections(r, {"MRN-1": {"selected_quotation": "SQ-2"}, "MRN-2": {"selected_quotation": "SQ-2"}})

	def test_missing_line_is_refused_when_not_defaulting(self):
		r = ranking_for([q("SQ-1", "A", 100)], lines=(LINE, LINE2))
		with self.assertRaises(ThrowError):
			rules.apply_selections(r, {"MRN-1": {"selected_quotation": "SQ-1"}})

	def test_missing_line_takes_l1_when_defaulting(self):
		r = ranking_for([q("SQ-1", "A", 100)], lines=(LINE, LINE2))
		rows = rules.apply_selections(r, {"MRN-1": {"selected_quotation": "SQ-1"}}, default_missing=True)
		self.assertEqual([x["mrn_item"] for x in rows], ["MRN-1", "MRN-2"])


class Unquoted(unittest.TestCase):
	def test_unquoted_line_gets_blank_row_and_is_reported(self):
		r = ranking_for([q("SQ-1", "A", 100)], lines=(LINE, LINE2))
		rows = rules.apply_selections(r, {"MRN-1": {"selected_quotation": "SQ-1"}, "MRN-2": {}})
		blank = rows[1]
		self.assertIsNone(blank["selected_quotation"])
		self.assertEqual(blank["amount"], 0)
		self.assertEqual(calc.unquoted_items(r), ["SAND"])

	def test_check_all_awarded_blocks_unquoted(self):
		r = ranking_for([q("SQ-1", "A", 100)], lines=(LINE, LINE2))
		with self.assertRaises(ThrowError):
			rules.check_all_awarded(r)
		rules.check_all_awarded(ranking_for([q("SQ-1", "A", 100)]))  # fully quoted: no error


class Completeness(unittest.TestCase):
	def test_duplicate_row_refused(self):
		with self.assertRaises(ThrowError):
			rules.check_rows_complete([LINE], [{"mrn_item": "MRN-1"}, {"mrn_item": "MRN-1"}])

	def test_unknown_row_refused(self):
		with self.assertRaises(ThrowError):
			rules.check_rows_complete([LINE], [{"mrn_item": "MRN-1"}, {"mrn_item": "MRN-9"}])

	def test_complete_rows_pass(self):
		rules.check_rows_complete([LINE, LINE2], [{"mrn_item": "MRN-2"}, {"mrn_item": "MRN-1"}])


class Payloads(unittest.TestCase):
	def test_parse_selections_from_json_list(self):
		s = rules.parse_selections('[{"mrn_item": "MRN-1", "selected_quotation": "SQ-1", "reason": ""}]')
		self.assertEqual(s["MRN-1"]["selected_quotation"], "SQ-1")

	def test_parse_items_requires_list(self):
		with self.assertRaises(ThrowError):
			rules.parse_items({"items": "nope"})
		self.assertEqual(rules.parse_items('{"items": [{"mrn_item": "MRN-1"}]}'), [{"mrn_item": "MRN-1"}])

	def test_totals_match_rows(self):
		r = ranking_for([q("SQ-1", "A", 100, amount=1000)])
		rows = rules.apply_selections(r, {}, default_missing=True)
		class Doc(dict):
			def __getattr__(self, k): return self[k]
			def __setattr__(self, k, v): self[k] = v
		doc = Doc()
		rules.apply_totals(doc, rows)
		self.assertEqual(doc["net_total"], 1000)
		self.assertAlmostEqual(doc["total_tax"], 160)
		self.assertAlmostEqual(doc["grand_total"], 1160)


class Status(unittest.TestCase):
	class Doc:
		def __init__(self, status=None, new=False, flags=None):
			self.status = status
			self._new = new
			self.flags = flags or {}

		def is_new(self):
			return self._new

		def get(self, k, default=None):
			return getattr(self, k, default)

	def test_new_doc_starts_draft(self):
		d = self.Doc(status="Approved", new=True)
		rules.keep_status_server_side(d, None)
		self.assertEqual(d.status, "Draft")

	def test_client_cannot_change_status(self):
		before = types.SimpleNamespace(status="Draft")
		d = self.Doc(status="Approved")
		rules.keep_status_server_side(d, before)
		self.assertEqual(d.status, "Draft")

	def test_workflow_flag_may_change_status(self):
		before = types.SimpleNamespace(status="Draft")
		d = self.Doc(status="Pending Approval", flags={"qc_workflow": True})
		rules.keep_status_server_side(d, before)
		self.assertEqual(d.status, "Pending Approval")


if __name__ == "__main__":
	unittest.main(verbosity=2)