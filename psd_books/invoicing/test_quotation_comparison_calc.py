"""Tests for quotation comparison ranking and totals (Sava A9.2). No database and no frappe.

Run with either:
    bench run-tests --app psd_books --module psd_books.invoicing.test_quotation_comparison_calc
    python3 test_quotation_comparison_calc.py
"""
import importlib.util
import os
import unittest

try:
	from psd_books.invoicing import quotation_comparison_calc as C
except ImportError:  # plain python, outside the bench
	_p = os.path.join(os.path.dirname(os.path.abspath(__file__)), "quotation_comparison_calc.py")
	_s = importlib.util.spec_from_file_location("quotation_comparison_calc", _p)
	C = importlib.util.module_from_spec(_s)
	_s.loader.exec_module(C)


def quote(name, supplier, rows, date="2026-10-16", days=None):
	"""rows: {mrn_item: (net_rate, amount, tax_amount)} - a None net_rate means not quoted."""
	items = []
	for k, (net, amount, tax) in rows.items():
		items.append({"mrn_item": k, "net_rate": net, "vat_percent": 16, "amount": amount, "tax_amount": tax})
	return {"name": name, "supplier": supplier, "supplier_name": supplier.title(), "quotation_date": date,
		"delivery_days": days, "items": items}


LINE_A = {"mrn_item": "A", "item_code": "CEMENT", "qty": 10}
LINE_B = {"mrn_item": "B", "item_code": "STEEL", "qty": 5}


class TestRanking(unittest.TestCase):
	def test_lowest_first(self):
		qs = [quote("Q1", "s1", {"A": (120, 1200, 192)}), quote("Q2", "s2", {"A": (100, 1000, 160)}), quote("Q3", "s3", {"A": (110, 1100, 176)})]
		offers = C.rank_item("A", qs)
		self.assertEqual([(o["quotation"], o["rank"], o["label"]) for o in offers], [("Q2", 1, "L1"), ("Q3", 2, "L2"), ("Q1", 3, "L3")])

	def test_not_quoted_is_not_ranked(self):
		qs = [quote("Q1", "s1", {"A": (None, 0, 0)}), quote("Q2", "s2", {"A": (0, 0, 0)}), quote("Q3", "s3", {"A": (90, 900, 144)})]
		self.assertEqual([o["quotation"] for o in C.rank_item("A", qs)], ["Q3"])

	def test_quotation_without_the_line_is_skipped(self):
		qs = [quote("Q1", "s1", {"B": (50, 250, 40)}), quote("Q2", "s2", {"A": (90, 900, 144)})]
		self.assertEqual([o["quotation"] for o in C.rank_item("A", qs)], ["Q2"])

	def test_tie_shorter_delivery_wins(self):
		qs = [quote("Q1", "s1", {"A": (100, 1000, 160)}, days=14), quote("Q2", "s2", {"A": (100, 1000, 160)}, days=7)]
		self.assertEqual([o["quotation"] for o in C.rank_item("A", qs)], ["Q2", "Q1"])

	def test_tie_no_delivery_days_ranks_last(self):
		qs = [quote("Q1", "s1", {"A": (100, 1000, 160)}, days=None), quote("Q2", "s2", {"A": (100, 1000, 160)}, days=30)]
		self.assertEqual([o["quotation"] for o in C.rank_item("A", qs)], ["Q2", "Q1"])

	def test_tie_zero_days_beats_none(self):
		qs = [quote("Q1", "s1", {"A": (100, 1000, 160)}, days=None), quote("Q2", "s2", {"A": (100, 1000, 160)}, days=0)]
		self.assertEqual(C.rank_item("A", qs)[0]["quotation"], "Q2")

	def test_tie_earlier_date_wins(self):
		qs = [quote("Q1", "s1", {"A": (100, 1000, 160)}, date="2026-10-18", days=7), quote("Q2", "s2", {"A": (100, 1000, 160)}, date="2026-10-16", days=7)]
		self.assertEqual([o["quotation"] for o in C.rank_item("A", qs)], ["Q2", "Q1"])

	def test_full_tie_is_stable_by_quotation_number(self):
		a = quote("SB-SQ-26-0002", "s2", {"A": (100, 1000, 160)}, days=7)
		b = quote("SB-SQ-26-0001", "s1", {"A": (100, 1000, 160)}, days=7)
		self.assertEqual([o["quotation"] for o in C.rank_item("A", [a, b])], ["SB-SQ-26-0001", "SB-SQ-26-0002"])
		self.assertEqual([o["quotation"] for o in C.rank_item("A", [b, a])], ["SB-SQ-26-0001", "SB-SQ-26-0002"])

	def test_ranks_on_net_rate_not_list_rate(self):
		# Q1 lists 100 but its discount gives a net rate of 90; Q2 lists 95 with no discount
		qs = [quote("Q1", "s1", {"A": (90, 900, 144)}), quote("Q2", "s2", {"A": (95, 950, 152)})]
		self.assertEqual(C.rank_item("A", qs)[0]["quotation"], "Q1")

	def test_numbers_as_strings_and_decimals(self):
		qs = [quote("Q1", "s1", {"A": ("100.50", 1005, 160.8)}), quote("Q2", "s2", {"A": ("100.05", 1000.5, 160.08)})]
		self.assertEqual(C.rank_item("A", qs)[0]["quotation"], "Q2")

	def test_offer_carries_the_figures(self):
		o = C.rank_item("A", [quote("Q1", "acme", {"A": (100, 1000, 160)}, days=5)])[0]
		self.assertEqual((o["supplier"], o["supplier_name"], o["net_rate"], o["vat_percent"], o["amount"], o["tax_amount"], o["delivery_days"]),
			("acme", "Acme", 100.0, 16.0, 1000.0, 160.0, 5))

	def test_no_quotations(self):
		self.assertEqual(C.rank_item("A", []), [])


class TestComparison(unittest.TestCase):
	def setUp(self):
		self.qs = [
			quote("Q1", "s1", {"A": (100, 1000, 160), "B": (50, 250, 40)}),
			quote("Q2", "s2", {"A": (90, 900, 144), "B": (None, 0, 0)}),
		]
		self.ranking = C.rank_comparison([LINE_A, LINE_B], self.qs)

	def test_one_entry_per_line_in_order(self):
		self.assertEqual([r["line"]["item_code"] for r in self.ranking], ["CEMENT", "STEEL"])

	def test_default_is_lowest(self):
		self.assertEqual([C.default_choice(r) for r in self.ranking], ["Q2", "Q1"])

	def test_lowest_per_item_can_differ(self):
		self.assertEqual(self.ranking[0]["lowest"]["supplier"], "s2")
		self.assertEqual(self.ranking[1]["lowest"]["supplier"], "s1")

	def test_unquoted_items(self):
		qs = [quote("Q1", "s1", {"A": (100, 1000, 160)})]
		r = C.rank_comparison([LINE_A, LINE_B], qs)
		self.assertEqual(C.unquoted_items(r), ["STEEL"])
		self.assertIsNone(C.default_choice(r[1]))
		self.assertEqual(C.unquoted_items(self.ranking), [])

	def test_unquoted_items_falls_back_to_mrn_item(self):
		r = C.rank_comparison([{"mrn_item": "Z9"}], [])
		self.assertEqual(C.unquoted_items(r), ["Z9"])


class TestReason(unittest.TestCase):
	def setUp(self):
		qs = [quote("Q1", "s1", {"A": (100, 1000, 160)}), quote("Q2", "s2", {"A": (90, 900, 144)}, days=7), quote("Q3", "s3", {"A": (90, 900, 144)}, days=30)]
		self.entry = C.rank_comparison([LINE_A], qs)[0]

	def test_lowest_needs_none(self):
		self.assertFalse(C.reason_required(self.entry, "Q2"))

	def test_dearer_needs_reason(self):
		self.assertTrue(C.reason_required(self.entry, "Q1"))

	def test_same_lowest_rate_needs_none(self):
		# Q3 is ranked L2 but costs the same as L1
		self.assertEqual(C.find_offer(self.entry, "Q3")["rank"], 2)
		self.assertFalse(C.reason_required(self.entry, "Q3"))

	def test_unknown_quotation_raises(self):
		with self.assertRaises(ValueError):
			C.reason_required(self.entry, "Q9")

	def test_find_offer(self):
		self.assertIsNone(C.find_offer(self.entry, "Q9"))
		self.assertEqual(C.find_offer(self.entry, "Q1")["supplier"], "s1")


class TestTotals(unittest.TestCase):
	def test_totals(self):
		t = C.totals([{"amount": 1000, "tax_amount": 160}, {"amount": 250.5, "tax_amount": 40.08}])
		self.assertEqual(t, {"net_total": 1250.5, "total_tax": 200.08, "grand_total": 1450.58})

	def test_totals_empty(self):
		self.assertEqual(C.totals([]), {"net_total": 0.0, "total_tax": 0.0, "grand_total": 0.0})

	def test_totals_no_float_drift(self):
		t = C.totals([{"amount": 0.1, "tax_amount": 0.01}] * 3)
		self.assertEqual(t, {"net_total": 0.3, "total_tax": 0.03, "grand_total": 0.33})

	def test_totals_half_up(self):
		t = C.totals([{"amount": "0.005", "tax_amount": 0}])
		self.assertEqual(t["net_total"], 0.01)

	def test_supplier_totals_one_group_per_supplier(self):
		lines = [
			{"supplier": "s1", "supplier_name": "One", "amount": 1000, "tax_amount": 160},
			{"supplier": "s2", "supplier_name": "Two", "amount": 900, "tax_amount": 144},
			{"supplier": "s1", "supplier_name": "One", "amount": 250, "tax_amount": 40},
		]
		g = C.supplier_totals(lines)
		self.assertEqual(list(g), ["s1", "s2"])
		self.assertEqual((g["s1"]["net_total"], g["s1"]["total_tax"], g["s1"]["grand_total"], len(g["s1"]["lines"])), (1250.0, 200.0, 1450.0, 2))
		self.assertEqual((g["s2"]["net_total"], g["s2"]["grand_total"], g["s2"]["supplier_name"]), (900.0, 1044.0, "Two"))

	def test_supplier_totals_add_up_to_the_whole(self):
		lines = [{"supplier": "s1", "amount": 333.33, "tax_amount": 53.33}, {"supplier": "s2", "amount": 666.67, "tax_amount": 106.67}]
		whole = C.totals(lines)["grand_total"]
		parts = sum(g["grand_total"] for g in C.supplier_totals(lines).values())
		self.assertEqual(round(parts, 2), whole)

	def test_supplier_name_falls_back_to_code(self):
		self.assertEqual(C.supplier_totals([{"supplier": "s1", "amount": 1, "tax_amount": 0}])["s1"]["supplier_name"], "s1")


if __name__ == "__main__":
	unittest.main()