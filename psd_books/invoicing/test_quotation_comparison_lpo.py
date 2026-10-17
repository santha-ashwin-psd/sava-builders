"""Plain-python tests for the A9.5 LPO logic. No bench, no database.

frappe is stubbed. create_lpos itself (database reads, PO insert, status change) is NOT covered here.
"""
import datetime
import importlib.util
import os
import sys
import types
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))


class ThrowError(Exception):
	pass


def _load():
	frappe = types.ModuleType("frappe")

	def throw(msg, exc=None):
		raise ThrowError(msg)

	frappe.throw = throw
	frappe._ = lambda s: s
	sys.modules["frappe"] = frappe
	utils = types.ModuleType("frappe.utils")
	utils.nowdate = lambda: "2026-10-16"
	utils.add_days = lambda d, n: (datetime.date.fromisoformat(d) + datetime.timedelta(days=n)).isoformat()
	sys.modules["frappe.utils"] = utils
	frappe.utils = utils
	spec = importlib.util.spec_from_file_location("quotation_comparison_lpo", os.path.join(HERE, "quotation_comparison_lpo.py"))
	mod = importlib.util.module_from_spec(spec)
	spec.loader.exec_module(mod)
	return mod


lpo = _load()


def row(item, supplier, net_rate=100, qty=10, vat=16, tax=160, name=None, quotation="SQ-1"):
	return {"mrn_item": item, "item_code": item, "item_name": item + " name", "uom": "Bag", "qty": qty,
		"selected_supplier": supplier, "supplier_name": (name or supplier or "None") + " Ltd", "selected_quotation": quotation,
		"net_rate": net_rate, "vat_percent": vat, "tax_amount": tax, "amount": net_rate * qty}


COMPARISON = {"name": "SB-CMP-26-0001", "company": "Sava", "project": "P1", "request_for_quotation": "SB-RFQ-26-0001"}
RFQ = {"project": "P-RFQ", "material_request": "SB-MRN-26-0001", "delivery_warehouse": "Site Store"}


class Checks(unittest.TestCase):
	def test_approved_passes(self):
		lpo.check_can_create("Approved", [row("A", "S1")], [])

	def test_not_approved_refused(self):
		for st in ("Draft", "Pending Approval", "Rejected", "LPOs Created", "Cancelled"):
			with self.assertRaises(ThrowError):
				lpo.check_can_create(st, [row("A", "S1")], [])

	def test_second_call_refused_when_pos_exist(self):
		with self.assertRaises(ThrowError) as c:
			lpo.check_can_create("Approved", [row("A", "S1")], ["PO-2026-00001"])
		self.assertIn("PO-2026-00001", str(c.exception))

	def test_no_items_refused(self):
		with self.assertRaises(ThrowError):
			lpo.check_can_create("Approved", [], [])

	def test_unawarded_item_refused(self):
		with self.assertRaises(ThrowError) as c:
			lpo.check_can_create("Approved", [row("A", "S1"), row("B", None)], [])
		self.assertIn("B", str(c.exception))


class Grouping(unittest.TestCase):
	def test_one_group_per_supplier_in_first_seen_order(self):
		g = lpo.group_by_supplier([row("A", "S2"), row("B", "S1"), row("C", "S2")])
		self.assertEqual(list(g), ["S2", "S1"])
		self.assertEqual([r["item_code"] for r in g["S2"]], ["A", "C"])

	def test_single_supplier_makes_one_group(self):
		self.assertEqual(len(lpo.group_by_supplier([row("A", "S1"), row("B", "S1")])), 1)


class Taxes(unittest.TestCase):
	def test_same_rate_lines_add_up(self):
		t = lpo.tax_lines([row("A", "S1", tax=160), row("B", "S1", tax=80.555)], lambda i: "VAT Input")
		self.assertEqual(len(t), 1)
		self.assertEqual((t[0]["tax_type"], t[0]["rate"], t[0]["tax_amount"], t[0]["account_head"]),
			("VAT", 16.0, 240.56, "VAT Input"))
		self.assertEqual(t[0]["description"], "VAT 16%")

	def test_different_rates_make_separate_lines(self):
		t = lpo.tax_lines([row("A", "S1", vat=16, tax=160), row("B", "S1", vat=8, tax=40)], lambda i: "VAT Input")
		self.assertEqual([(x["rate"], x["tax_amount"]) for x in t], [(16.0, 160.0), (8.0, 40.0)])

	def test_zero_rate_or_zero_tax_adds_nothing(self):
		t = lpo.tax_lines([row("A", "S1", vat=0, tax=0), row("B", "S1", vat=16, tax=0)], lambda i: None)
		self.assertEqual(t, [])

	def test_different_accounts_split_a_rate(self):
		acc = {"A": "VAT Input", "B": "Other VAT"}
		t = lpo.tax_lines([row("A", "S1"), row("B", "S1")], acc.get)
		self.assertEqual(len(t), 2)


class Values(unittest.TestCase):
	def build(self, rows=None, days=7, rfq=None, comparison=None):
		rows = rows or [row("A", "S1"), row("B", "S1", net_rate=50, qty=4, tax=32)]
		return lpo.build_po_values(comparison or COMPARISON, RFQ if rfq is None else rfq, "S1", rows, days,
			"2026-10-16", lambda i: "Input VAT 16% - Sava", lambda i: "VAT Input")

	def test_header(self):
		v = self.build()
		self.assertEqual((v["doctype"], v["status"], v["supplier"], v["supplier_name"], v["purchase_type"]),
			("Purchase Order", "Draft", "S1", "S1 Ltd", "Goods"))
		self.assertEqual((v["company"], v["project"], v["material_request"], v["set_warehouse"]),
			("Sava", "P1", "SB-MRN-26-0001", "Site Store"))
		self.assertEqual((v["ref_rfq"], v["quotation_comparison"], v["transaction_date"]),
			("SB-RFQ-26-0001", "SB-CMP-26-0001", "2026-10-16"))

	def test_project_falls_back_to_the_rfq(self):
		c = dict(COMPARISON, project=None)
		self.assertEqual(self.build(comparison=c)["project"], "P-RFQ")

	def test_blank_rfq_fields_become_none(self):
		v = self.build(rfq={})
		self.assertEqual((v["material_request"], v["set_warehouse"]), (None, None))

	def test_expected_delivery_is_today_plus_days(self):
		self.assertEqual(self.build(days=7)["expected_delivery_date"], "2026-10-23")
		self.assertNotIn("expected_delivery_date", self.build(days=None))

	def test_lines_use_net_rate_and_tax_template(self):
		v = self.build()
		self.assertEqual([(i["item_code"], i["qty"], i["uom"], i["rate"], i["tax_code"]) for i in v["items"]],
			[("A", 10, "Bag", 100, "Input VAT 16% - Sava"), ("B", 4, "Bag", 50, "Input VAT 16% - Sava")])

	def test_vat_line_comes_from_the_comparison_amounts(self):
		v = self.build()
		self.assertEqual([(t["rate"], t["tax_amount"], t["account_head"]) for t in v["taxes"]], [(16.0, 192.0, "VAT Input")])


if __name__ == "__main__":
	unittest.main(verbosity=2)