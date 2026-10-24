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
		"order_qty": qty, "selected_supplier": supplier, "supplier_name": (name or supplier or "None") + " Ltd", "selected_quotation": quotation,
		"net_rate": net_rate, "vat_percent": vat, "tax_amount": tax, "amount": net_rate * qty}


COMPARISON = {"name": "SB-CMP-26-0001", "company": "Sava", "project": "P1", "request_for_quotation": "SB-RFQ-26-0001"}
RFQ = {"project": "P-RFQ", "material_request": "SB-MRN-26-0001", "delivery_warehouse": "Site Store"}


class Checks(unittest.TestCase):
	def plan(self, status, rows, ordered=None, quantities=None):
		return lpo.plan_round(status, rows, ordered or {}, quantities)

	def test_approved_first_round_uses_order_qty(self):
		out = self.plan("Approved", [row("A", "S1")])
		self.assertEqual([r["order_qty"] for r in out], [10])

	def test_not_orderable_statuses_refused(self):
		for st in ("Draft", "Pending Approval", "Rejected", "Cancelled"):
			with self.assertRaises(ThrowError):
				self.plan(st, [row("A", "S1")])

	def test_fully_ordered_refused(self):
		for st in ("Partially Ordered", "LPOs Created"):
			with self.assertRaises(ThrowError) as c:
				self.plan(st, [row("A", "S1")], {"A": 10}, {"A": 1})
			self.assertIn("Nothing left", str(c.exception))

	def test_no_items_refused(self):
		with self.assertRaises(ThrowError):
			self.plan("Approved", [])

	def test_unawarded_item_refused(self):
		with self.assertRaises(ThrowError) as c:
			self.plan("Approved", [row("A", "S1"), row("B", None)])
		self.assertIn("B", str(c.exception))

	def test_unawarded_line_with_order_qty_zero_is_ignored(self):
		r = row("B", None)
		r["order_qty"] = 0
		self.assertEqual([x["item_code"] for x in self.plan("Approved", [row("A", "S1"), r])], ["A"])

	def test_all_zero_first_round_refused(self):
		r = row("A", "S1")
		r["order_qty"] = 0
		with self.assertRaises(ThrowError) as c:
			self.plan("Approved", [r])
		self.assertIn("nothing to order", str(c.exception))


class Rounds(unittest.TestCase):
	"""Partial buying: 100 requested, 40 approved to order, the balance bought in later rounds."""

	def rows(self):
		r = row("A", "S1", net_rate=100, qty=100, vat=16, tax=640)
		r["order_qty"] = 40
		r["amount"] = 4000
		return [r]

	def test_first_round_orders_the_order_qty(self):
		out = lpo.plan_round("Approved", self.rows(), {"A": 0.0})
		self.assertEqual((out[0]["order_qty"], out[0]["tax_amount"]), (40, 640))

	def test_balance_round_needs_quantities(self):
		with self.assertRaises(ThrowError) as c:
			lpo.plan_round("Partially Ordered", self.rows(), {"A": 40.0})
		self.assertIn("Enter the quantity", str(c.exception))

	def test_balance_round_scales_amount_and_vat_at_the_approved_rate(self):
		out = lpo.plan_round("Partially Ordered", self.rows(), {"A": 40.0}, {"A": 50})
		self.assertEqual((out[0]["order_qty"], out[0]["amount"], out[0]["tax_amount"]), (50, 5000.0, 800.0))

	def test_above_balance_refused(self):
		with self.assertRaises(ThrowError) as c:
			lpo.plan_round("Partially Ordered", self.rows(), {"A": 40.0}, {"A": 61})
		self.assertIn("still allowed", str(c.exception))

	def test_whole_balance_allowed(self):
		out = lpo.plan_round("Partially Ordered", self.rows(), {"A": 40.0}, {"A": 60})
		self.assertEqual(out[0]["order_qty"], 60)

	def test_all_zero_refused(self):
		with self.assertRaises(ThrowError) as c:
			lpo.plan_round("Partially Ordered", self.rows(), {"A": 40.0}, {"A": 0})
		self.assertIn("nothing to order", str(c.exception))

	def test_negative_unknown_and_text_refused(self):
		for q in ({"A": -1}, {"Z": 5}, {"A": "abc"}):
			with self.assertRaises(ThrowError):
				lpo.plan_round("Partially Ordered", self.rows(), {"A": 40.0}, q)

	def test_omitted_line_counts_as_zero(self):
		rows = self.rows() + [row("B", "S2", qty=10)]
		out = lpo.plan_round("Partially Ordered", rows, {"A": 40.0, "B": 0.0}, {"B": 10})
		self.assertEqual([r["item_code"] for r in out], ["B"])

	def test_line_ordered_at_zero_in_round_one_can_be_ordered_later(self):
		r = row("A", "S1", qty=10)
		r["order_qty"] = 0
		out = lpo.plan_round("Partially Ordered", [r, row("B", "S1")], {"A": 0.0, "B": 10.0}, {"A": 10})
		self.assertEqual((out[0]["item_code"], out[0]["order_qty"]), ("A", 10))

	def test_ordering_again_after_pos_deleted_is_a_balance_round(self):
		with self.assertRaises(ThrowError) as c:
			lpo.plan_round("LPOs Created", self.rows(), {"A": 0.0})
		self.assertIn("Enter the quantity", str(c.exception))
		out = lpo.plan_round("LPOs Created", self.rows(), {"A": 0.0}, {"A": 100})
		self.assertEqual(out[0]["order_qty"], 100)

	def test_status_after(self):
		rows = self.rows()
		self.assertEqual(lpo.status_after(rows, {"A": 40.0}), "Partially Ordered")
		self.assertEqual(lpo.status_after(rows, {"A": 100.0}), "LPOs Created")

	def test_ordered_by_line_counts_tagged_and_untagged_lines(self):
		rows = [row("A", "S1", qty=100), row("B", "S1", qty=10)]
		out = lpo.ordered_by_line(rows, [{"qc_mrn_item": "A", "item_code": "A", "qty": 40},
			{"qc_mrn_item": None, "item_code": "B", "qty": 10}, {"qc_mrn_item": "A", "item_code": "A", "qty": 10}])
		self.assertEqual(out, {"A": 50.0, "B": 10.0})

	def test_po_line_carries_the_comparison_line(self):
		v = lpo.build_po_values(COMPARISON, RFQ, "S1", [row("A", "S1")], 7, "2026-10-16", lambda i: None, lambda i: None)
		self.assertEqual(v["items"][0]["qc_mrn_item"], "A")


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


class StatusFollowsBalance(unittest.TestCase):
	def rows(self):
		return [row("A", "S1", qty=100), row("B", "S1", qty=10)]

	def test_status_for(self):
		rows = self.rows()
		self.assertEqual(lpo.status_for(rows, {"A": 0.0, "B": 0.0}), "Approved")
		self.assertEqual(lpo.status_for(rows, {}), "Approved")
		self.assertEqual(lpo.status_for(rows, {"A": 40.0, "B": 0.0}), "Partially Ordered")
		self.assertEqual(lpo.status_for(rows, {"A": 100.0, "B": 0.0}), "Partially Ordered")
		self.assertEqual(lpo.status_for(rows, {"A": 100.0, "B": 10.0}), "LPOs Created")

	def test_approved_again_is_a_first_round_that_uses_order_qty(self):
		out = lpo.plan_round("Approved", self.rows(), {"A": 0.0, "B": 0.0})
		self.assertEqual([r["order_qty"] for r in out], [100, 10])


class Flags(dict):
	"""Like frappe._dict: item and attribute access."""
	__getattr__ = dict.get

	def __setattr__(self, key, value):
		self[key] = value


class FakeDoc:
	def __init__(self, status, rows):
		self.status, self.flags, self.saved = status, Flags(), 0
		self._rows = [types.SimpleNamespace(as_dict=lambda r=r: dict(r)) for r in rows]

	def get(self, key):
		return self._rows if key == "items" else None

	def save(self, ignore_permissions=False):
		self.saved += 1


class SyncStatus(unittest.TestCase):
	"""sync_status / on_po_removed with a stubbed database. The real Frappe delete and cancel path is NOT covered."""

	def setUp(self):
		self.fr = lpo.frappe
		self.keep = {k: getattr(self.fr, k, None) for k in ("db", "get_doc", "log_error", "get_traceback")}
		self.sql_calls, self.logged = [], []
		self.fr.log_error = lambda **kw: self.logged.append(kw)
		self.fr.get_traceback = lambda: "tb"

	def tearDown(self):
		for k, v in self.keep.items():
			if v is None:
				if hasattr(self.fr, k):
					delattr(self.fr, k)
			else:
				setattr(self.fr, k, v)

	def setup_db(self, status, po_lines):
		doc = FakeDoc(status, [row("A", "S1", qty=100), row("B", "S1", qty=10)])

		def sql(query, args, as_dict=False):
			self.sql_calls.append((query, args))
			excluded = args[1] if len(args) > 1 else None
			return [p for p in po_lines if p["po"] != excluded]

		self.fr.db = types.SimpleNamespace(get_value=lambda *a, **k: status, sql=sql)
		self.fr.get_doc = lambda *a, **k: doc
		return doc

	def line(self, po, item, qty):
		return {"po": po, "qc_mrn_item": item, "item_code": item, "qty": qty}

	def test_deleting_the_only_po_goes_back_to_approved(self):
		doc = self.setup_db("Partially Ordered", [self.line("PO-1", "A", 40)])
		self.assertEqual(lpo.sync_status("CMP-1", exclude_po="PO-1"), "Approved")
		self.assertEqual((doc.status, doc.saved, doc.flags.get("qc_workflow")), ("Approved", 1, True))

	def test_lpos_created_with_a_po_removed_becomes_partially_ordered(self):
		lines = [self.line("PO-1", "A", 60), self.line("PO-2", "A", 40), self.line("PO-1", "B", 10)]
		doc = self.setup_db("LPOs Created", lines)
		self.assertEqual(lpo.sync_status("CMP-1", exclude_po="PO-2"), "Partially Ordered")
		self.assertEqual(doc.status, "Partially Ordered")

	def test_unchanged_status_is_not_saved(self):
		doc = self.setup_db("Partially Ordered", [self.line("PO-1", "A", 40), self.line("PO-2", "A", 10)])
		self.assertIsNone(lpo.sync_status("CMP-1", exclude_po="PO-2"))
		self.assertEqual(doc.saved, 0)

	def test_only_orderable_statuses_are_touched(self):
		for status in ("Draft", "Pending Approval", "Approved", "Rejected"):
			doc = self.setup_db(status, [])
			self.assertIsNone(lpo.sync_status("CMP-1", exclude_po="PO-1"))
			self.assertEqual(doc.saved, 0)

	def test_excluded_po_goes_into_the_query(self):
		self.setup_db("Partially Ordered", [self.line("PO-1", "A", 40)])
		lpo.sync_status("CMP-1", exclude_po="PO-1")
		self.assertIn("po.name != %s", self.sql_calls[0][0])
		self.assertEqual(self.sql_calls[0][1], ("CMP-1", "PO-1"))

	def test_hook_ignores_a_po_with_no_comparison(self):
		self.setup_db("Partially Ordered", [])
		lpo.on_po_removed(types.SimpleNamespace(get=lambda k: None, name="PO-9"))
		self.assertEqual(self.sql_calls, [])

	def test_hook_failure_is_logged_not_raised(self):
		doc = self.setup_db("Partially Ordered", [])
		doc.save = lambda **k: (_ for _ in ()).throw(RuntimeError("boom"))
		po = types.SimpleNamespace(get=lambda k: "CMP-1", name="PO-1")
		lpo.on_po_removed(po)
		self.assertEqual(len(self.logged), 1)


if __name__ == "__main__":
	unittest.main(verbosity=2)