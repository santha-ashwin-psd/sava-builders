"""Plain-python tests for partial buying, step 1: Order Qty per comparison line. No bench, no database.

frappe is stubbed. The save hook, the patch and create_lpos itself (database) are NOT covered here.
"""
import os
import sys
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import test_quotation_comparison_approval as base  # installs the stubs and loads the rules module

rules = base.rules
ThrowError = base.ThrowError


def offer(quotation, supplier, net_rate=100, vat=16, amount=3000, tax=480, rank=1):
	return {"quotation": quotation, "supplier": supplier, "supplier_name": supplier + " Ltd", "rank": rank,
		"label": "L%d" % rank, "net_rate": net_rate, "vat_percent": vat, "amount": amount, "tax_amount": tax}


def entry(mrn_item="L1", qty=30, offers=None):
	offers = offers if offers is not None else [offer("SQ-1", "S1")]
	return {"line": {"mrn_item": mrn_item, "item_code": "CEM", "item_name": "Cement", "uom": "Bag", "qty": qty},
		"offers": offers, "lowest": offers[0] if offers else None}


class ResolveOrderQty(unittest.TestCase):
	def test_blank_means_full_qty(self):
		self.assertEqual(rules.resolve_order_qty(None, 30), 30)
		self.assertEqual(rules.resolve_order_qty("", 30), 30)

	def test_partial_and_zero_and_full_allowed(self):
		self.assertEqual(rules.resolve_order_qty(20, 30), 20)
		self.assertEqual(rules.resolve_order_qty("12.5", 30), 12.5)
		self.assertEqual(rules.resolve_order_qty(0, 30), 0)
		self.assertEqual(rules.resolve_order_qty(30, 30), 30)

	def test_above_requested_negative_or_text_refused(self):
		for bad in (31, -1, "abc"):
			with self.assertRaises(ThrowError):
				rules.resolve_order_qty(bad, 30)


class ScaleOffer(unittest.TestCase):
	def test_proportional(self):
		self.assertEqual(rules.scale_offer(3000, 480, 20, 30), (2000.0, 320.0))

	def test_full_and_zero(self):
		self.assertEqual(rules.scale_offer(3000, 480, 30, 30), (3000.0, 480.0))
		self.assertEqual(rules.scale_offer(3000, 480, 0, 30), (0.0, 0.0))

	def test_zero_qty_line_is_safe(self):
		self.assertEqual(rules.scale_offer(0, 0, 0, 0), (0.0, 0.0))


class ApplySelections(unittest.TestCase):
	def test_default_is_full_qty_and_unchanged_amounts(self):
		rows = rules.apply_selections([entry()], {"L1": {"selected_quotation": "SQ-1"}})
		self.assertEqual((rows[0]["order_qty"], rows[0]["amount"], rows[0]["tax_amount"]), (30, 3000, 480))

	def test_partial_order_scales_amount_and_vat(self):
		rows = rules.apply_selections([entry()], {"L1": {"selected_quotation": "SQ-1", "order_qty": 20}})
		self.assertEqual((rows[0]["order_qty"], rows[0]["amount"], rows[0]["tax_amount"]), (20, 2000.0, 320.0))
		self.assertEqual(rows[0]["net_rate"], 100)  # rate is the approved one, not scaled

	def test_zero_line_keeps_supplier_but_no_value(self):
		rows = rules.apply_selections([entry()], {"L1": {"selected_quotation": "SQ-1", "order_qty": 0}})
		self.assertEqual((rows[0]["order_qty"], rows[0]["amount"], rows[0]["selected_supplier"]), (0, 0.0, "S1"))

	def test_over_qty_refused(self):
		with self.assertRaises(ThrowError):
			rules.apply_selections([entry()], {"L1": {"selected_quotation": "SQ-1", "order_qty": 31}})

	def test_unquoted_line_gets_full_qty_and_no_value(self):
		rows = rules.apply_selections([entry(offers=[])], {"L1": {"selected_quotation": None, "order_qty": 5}})
		self.assertEqual((rows[0]["order_qty"], rows[0]["amount"]), (30, 0))

	def test_totals_follow_order_qty_so_approval_level_follows_it(self):
		ranking = [entry("L1", 30, [offer("SQ-1", "S1", amount=600000, tax=96000)])]
		full = rules.apply_selections(ranking, {"L1": {"selected_quotation": "SQ-1"}})
		part = rules.apply_selections(ranking, {"L1": {"selected_quotation": "SQ-1", "order_qty": 15}})
		t_full, t_part = rules.calc.totals(full), rules.calc.totals(part)
		self.assertEqual(rules.required_roles(t_full["grand_total"]), ["Purchase Manager", "Finance", "Director"])
		self.assertEqual(t_part["grand_total"], 348000.0)
		self.assertEqual(rules.required_roles(t_part["grand_total"]), ["Purchase Manager", "Finance"])


class SelectionsFromRows(unittest.TestCase):
	def test_order_qty_travels_with_the_row(self):
		out = rules.selections_from_rows([{"mrn_item": "L1", "selected_quotation": "SQ-1", "reason": "", "order_qty": 7}])
		self.assertEqual(out["L1"]["order_qty"], 7)


class SomethingOrdered(unittest.TestCase):
	def test_all_zero_refused(self):
		with self.assertRaises(ThrowError):
			rules.check_something_ordered([{"order_qty": 0}, {"order_qty": 0}])

	def test_one_positive_passes(self):
		rules.check_something_ordered([{"order_qty": 0}, {"order_qty": 2}])


class LpoUsesOrderQty(unittest.TestCase):
	@classmethod
	def setUpClass(cls):
		import test_quotation_comparison_lpo as t
		cls.t = t
		cls.lpo = t.lpo

	def test_zero_lines_are_left_out_and_po_qty_is_order_qty(self):
		t, lpo = self.t, self.lpo
		a, b = t.row("A", "S1", qty=30), t.row("B", "S1", qty=10)
		a["order_qty"], b["order_qty"] = 20, 0
		self.assertEqual([r["item_code"] for r in lpo.ordered_rows([a, b])], ["A"])
		vals = lpo.build_po_values(t.COMPARISON, t.RFQ, "S1", lpo.ordered_rows([a, b]), None, "2026-10-24",
			lambda i: None, lambda i: None)
		self.assertEqual([(i["item_code"], i["qty"]) for i in vals["items"]], [("A", 20)])

	def test_nothing_to_order_refused(self):
		t, lpo = self.t, self.lpo
		a = t.row("A", "S1")
		a["order_qty"] = 0
		with self.assertRaises(t.ThrowError):
			lpo.check_can_create("Approved", [a], [])

	def test_unawarded_zero_line_does_not_block(self):
		t, lpo = self.t, self.lpo
		a, b = t.row("A", "S1"), t.row("B", None)
		b["order_qty"] = 0
		lpo.check_can_create("Approved", [a, b], [])


class SupplierSummary(unittest.TestCase):
	def test_zero_order_qty_line_not_counted(self):
		items = [{"selected_supplier": "S1", "supplier_name": "S1 Ltd", "amount": 2000, "tax_amount": 320, "order_qty": 20},
			{"selected_supplier": "S1", "supplier_name": "S1 Ltd", "amount": 0, "tax_amount": 0, "order_qty": 0}]
		out = rules.supplier_summary(items)
		self.assertEqual((len(out), out[0]["line_count"], out[0]["grand_total"]), (1, 1, 2320.0))

	def test_all_zero_gives_no_supplier_rows(self):
		self.assertEqual(rules.supplier_summary([{"selected_supplier": "S1", "amount": 0, "tax_amount": 0, "order_qty": 0}]), [])


if __name__ == "__main__":
	unittest.main(verbosity=1)