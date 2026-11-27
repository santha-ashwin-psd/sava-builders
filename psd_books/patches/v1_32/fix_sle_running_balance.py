"""
Patch v1_32: repair the stored running balance on Stock Ledger Entries.

qty_after_transaction (and stock_value) are snapshots taken when a row is
posted. Deleting a cancelled Stock Entry used to leave every later snapshot
including the deleted voucher, so the Stock Ledger showed wrong balances.

This recomputes both fields for every item+warehouse, in posting order.
It never changes actual_qty or any Bin. Bins that disagree with the ledger
total are only PRINTED (they need a physical count, not an automatic fix).
Idempotent. Safe to re-run.
"""
import frappe
from frappe.utils import flt

from psd_books.inventory.utils import repost_qty_after_transaction


def execute():
	pairs = frappe.db.sql(
		"SELECT DISTINCT item_code, warehouse FROM `tabStock Ledger Entry`"
	)
	fixed = 0
	for item_code, warehouse in pairs:
		fixed += repost_qty_after_transaction(item_code, warehouse)
	print(f"v1_32: corrected {fixed} Stock Ledger Entry rows across {len(pairs)} item/warehouse pairs")

	# Report only -- Bins are NOT modified here.
	ledger = {
		(r.item_code, r.warehouse): flt(r.q)
		for r in frappe.db.sql(
			"SELECT item_code, warehouse, SUM(actual_qty) AS q "
			"FROM `tabStock Ledger Entry` GROUP BY item_code, warehouse",
			as_dict=True,
		)
	}
	for b in frappe.db.sql("SELECT item_code, warehouse, actual_qty FROM `tabBin`", as_dict=True):
		q = ledger.get((b.item_code, b.warehouse), 0.0)
		if abs(flt(b.actual_qty) - q) > 0.0001:
			print(f"v1_32: Bin differs from ledger (needs physical count): {b.item_code} / {b.warehouse}: bin={flt(b.actual_qty)} ledger={q}")