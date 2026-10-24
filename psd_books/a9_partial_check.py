"""Partial buying live check (step 3a): Order Qty, balance and LPO rounds on site sava.

Put this file in ~/sava-bench/apps/psd_books/psd_books/ next to a9_check.py, then from ~/sava-bench:

    bench --site sava execute psd_books.a9_partial_check.run

Uses the a9_check helpers and TEST data (TEST Company, TEST project, TEST item, 3 TEST suppliers, 4 TEST users).
MRN is 100 bags; round 1 orders 40, then the balance of 60 is ordered in two more rounds.
Each check prints OK or FAILED. Safe to run again.
"""
import frappe

from psd_books import a9_check as A
from psd_books.a9_check import RAISER, PM, FIN, as_user, check, expect_block, expect_ok, status


def _item(qc, rfq_name, name):
	return as_user(RAISER, lambda: qc.get_comparison_data(rfq_name, name))


def run():
	from psd_books.api import quotation_comparison as qc

	A.make_users()
	print("\n--- Partial: order 40 of 100, then the balance ---")
	rfq_name, suppliers = A.make_rfq_with_quotes([5800, 6000, 6200])
	data = as_user(RAISER, lambda: qc.get_comparison_data(rfq_name))
	entry = data["ranking"][0]
	mrn_item, l1 = entry["line"]["mrn_item"], entry["default_quotation"]
	full = float(entry["line"]["qty"])
	check("RFQ line is 100 bags", full == 100, full)

	expect_block("order qty above the requested qty at create",
		lambda: as_user(RAISER, lambda: qc.create_comparison(
			rfq_name, {mrn_item: {"selected_quotation": l1, "order_qty": 101}})), "more than")
	expect_block("every order qty 0 at create",
		lambda: as_user(RAISER, lambda: qc.create_comparison(
			rfq_name, {mrn_item: {"selected_quotation": l1, "order_qty": 0}})), "Order at least one")

	summ = expect_ok("raiser creates the comparison with Order Qty 40",
		lambda: as_user(RAISER, lambda: qc.create_comparison(
			rfq_name, {mrn_item: {"selected_quotation": l1, "order_qty": 40}})))
	if not summ:
		return
	name = summ["name"]
	d = frappe.get_doc("Quotation Comparison", name)
	row = d.items[0]
	check("saved order_qty 40 and qty 100", (row.order_qty, row.qty) == (40, 100), (row.order_qty, row.qty))
	check("amount is 40 x net rate", abs(row.amount - 40 * row.net_rate) < 0.05, (row.amount, row.net_rate))
	check("total is on the order qty (between 200,000 and 500,000)", 200000 < d.grand_total <= 500000, d.grand_total)

	expect_ok("raiser submits", lambda: as_user(RAISER, lambda: qc.submit_for_approval(name)))
	check("2 levels: Purchase Manager, Finance", [s[1] for s in A.steps(name)] == ["Purchase Manager", "Finance"], A.steps(name))
	expect_ok("Purchase Manager approves", lambda: as_user(PM, lambda: qc.approve_comparison(name)))
	expect_ok("Finance approves", lambda: as_user(FIN, lambda: qc.approve_comparison(name)))
	check("status Approved", status(name) == "Approved", status(name))

	# round 1
	res = expect_ok("round 1: Purchase Manager creates the LPOs", lambda: as_user(PM, lambda: qc.create_lpos(name)))
	if not res:
		return
	check("status Partially Ordered", status(name) == "Partially Ordered", status(name))
	po1 = frappe.get_doc("Purchase Order", res["lpos"][0]["name"])
	check("PO 1 qty is 40", [i.qty for i in po1.items] == [40], [i.qty for i in po1.items])
	check("PO 1 line carries the comparison line", po1.items[0].qc_mrn_item == mrn_item, po1.items[0].qc_mrn_item)
	data = _item(qc, rfq_name, name)
	it = data["items"][0]
	check("screen data: ordered 40, balance 60", (it.get("ordered_qty"), it.get("balance_qty")) == (40, 60), it)
	check("screen data: balance_open", data["comparison"].get("balance_open") is True, data["comparison"].get("balance_open"))

	expect_block("round 2 without quantities", lambda: as_user(PM, lambda: qc.create_lpos(name)), "Enter the quantity")
	expect_block("round 2 above the balance (61)", lambda: as_user(PM, lambda: qc.create_lpos(name, {mrn_item: 61})), "still allowed")
	expect_block("round 2 all zero", lambda: as_user(PM, lambda: qc.create_lpos(name, {mrn_item: 0})), "nothing to order")

	# round 2: 50 of the 60
	res2 = expect_ok("round 2: LPO for 50 of the balance", lambda: as_user(PM, lambda: qc.create_lpos(name, {mrn_item: 50})))
	if not res2:
		return
	check("status still Partially Ordered", status(name) == "Partially Ordered", status(name))
	po2 = frappe.get_doc("Purchase Order", res2["lpos"][0]["name"])
	check("PO 2 is a Draft for qty 50 at the approved rate", po2.docstatus == 0 and [i.qty for i in po2.items] == [50]
		and abs(po2.items[0].rate - row.net_rate) < 0.01, ([i.qty for i in po2.items], po2.items[0].rate))
	check("PO 2 has VAT", len(po2.taxes) >= 1 and po2.taxes[0].tax_amount > 0, len(po2.taxes))
	it = _item(qc, rfq_name, name)["items"][0]
	check("balance is now 10", (it.get("ordered_qty"), it.get("balance_qty")) == (90, 10), it)

	# a deleted Draft PO gives its qty back
	frappe.delete_doc("Purchase Order", po2.name, force=1, ignore_permissions=True)
	frappe.db.commit()
	it = _item(qc, rfq_name, name)["items"][0]
	check("deleting PO 2 returns its qty: balance 60", (it.get("ordered_qty"), it.get("balance_qty")) == (40, 60), it)

	# round 3: the whole balance
	expect_ok("round 3: LPO for the whole balance of 60", lambda: as_user(PM, lambda: qc.create_lpos(name, {mrn_item: 60})))
	check("status LPOs Created", status(name) == "LPOs Created", status(name))
	expect_block("ordering again", lambda: as_user(PM, lambda: qc.create_lpos(name, {mrn_item: 1})), "Nothing left")
	ordered = frappe.db.sql("""select sum(poi.qty) from `tabPurchase Order Item` poi join `tabPurchase Order` po on po.name = poi.parent
		where po.quotation_comparison = %s and po.docstatus != 2""", (name,))[0][0]
	check("100 bags on live POs in total", float(ordered or 0) == 100, ordered)
	frappe.db.commit()
	print("\nDone: %d OK, %d FAILED" % (A.RESULT["ok"], A.RESULT["failed"]))