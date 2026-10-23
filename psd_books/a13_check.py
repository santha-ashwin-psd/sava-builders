"""A13 live check: warehouse stock and value, by project, below-reorder flags.

Put this file in the app folder (next to a12b_check.py), then from ~/sava-bench:

	bench --site sava backup
	bench --site sava execute psd_books.a13_check.run

Needs the TEST records from a7 / a11 (TEST-002 and TEST Other Project Store with stock). Run a11_check first if
they are missing. Everything goes through api/inventory.py. Each check prints OK or FAILED with the reason.
INFO lines are not pass/fail. Reorder levels set by this check are put back to their original values at the end.

Scenarios:
	A  project filter: TEST-002 returns only its own warehouse; an unknown project returns nothing
	B  below-reorder flag: reorder level above stock flags the row; below stock does not
	C  all-warehouses view: the stock values add up to the valuation grand total
	D  valuation by project: only the project's warehouses appear
	E  opening stock match: known opening quantity and rate in a fresh warehouse show exactly in the report
"""
import frappe
from frappe.utils import flt, nowdate, nowtime

from psd_books import a7_seed_and_check as S
from psd_books import a9_check as A

ok, fail, check = A.ok, A.fail, A.check
PROJECT = "TEST-002"
OTHER_WH = "TEST Other Project Store"
ITEM = "TEST-CEMENT"


def api():
	from psd_books.api import inventory
	return inventory


def bin_name():
	return frappe.db.get_value("Bin", {"item_code": ITEM, "warehouse": OTHER_WH}, "name")


def summary(**kw):
	return api().get_stock_summary(**kw)



OPEN_WH = "TEST A13 Opening Store"
OPEN_QTY = 25
OPEN_RATE = 200


def scenario_e():
	print("\n--- E: opening stock matches what was loaded ---")
	S._get_or_create("Warehouse", OPEN_WH, warehouse_name=OPEN_WH, company=S.CO)
	wh = frappe.db.get_value("Warehouse", {"warehouse_name": OPEN_WH, "company": S.CO}, "name") or OPEN_WH
	# Opening stock as a Material Receipt at a known rate, the same way the migration loads it.
	se = frappe.get_doc({
		"doctype": "Stock Entry", "stock_entry_type": "Material Receipt", "posting_date": nowdate(),
		"posting_time": nowtime(), "set_posting_time": 1, "company": S.CO, "remarks": "A13 opening stock check",
		"items": [{"item_code": ITEM, "item_name": ITEM, "qty": OPEN_QTY, "basic_rate": OPEN_RATE,
			"t_warehouse": wh}]})
	se.flags.ignore_permissions = True
	se.insert()
	se.submit()
	frappe.db.commit()
	row = [r for r in summary(warehouse=wh) if r["item_code"] == ITEM]
	check("opening stock row exists", len(row) == 1, row)
	if row:
		r = row[0]
		check("opening qty matches", flt(r["actual_qty"]) == OPEN_QTY, r["actual_qty"])
		check("opening rate matches", abs(flt(r["valuation_rate"]) - OPEN_RATE) < 0.01, r["valuation_rate"])
		check("opening value matches", abs(flt(r["stock_value"]) - OPEN_QTY * OPEN_RATE) < 0.01, r["stock_value"])
	val = api().get_stock_valuation_report(warehouse=wh)
	check("valuation report shows the opening value",
		abs(flt(val["grand_total"]) - OPEN_QTY * OPEN_RATE) < 0.01, val["grand_total"])

def run():
	frappe.set_user("Administrator")
	print("\n--- A: project filter ---")
	rows = summary(project=PROJECT)
	whs = {r["warehouse"] for r in rows}
	check("TEST-002 shows its own warehouse", OTHER_WH in whs, whs)
	check("TEST-002 shows only warehouses of that project", whs <= set(
		frappe.get_all("Warehouse", filters={"project": PROJECT}, pluck="name")), whs)
	check("unknown project returns nothing", summary(project="NO-SUCH-PROJECT") == [], "not empty")

	print("\n--- B: below-reorder flag ---")
	name = bin_name()
	original = flt(frappe.db.get_value("Bin", name, "reorder_level"))
	try:
		frappe.db.set_value("Bin", name, "reorder_level", 50)
		frappe.db.commit()
		row = [r for r in summary(project=PROJECT) if r["warehouse"] == OTHER_WH][0]
		check("stock 30 under reorder 50 is flagged", row["below_reorder"] is True, row)
		frappe.db.set_value("Bin", name, "reorder_level", 10)
		frappe.db.commit()
		row = [r for r in summary(project=PROJECT) if r["warehouse"] == OTHER_WH][0]
		check("stock 30 above reorder 10 is not flagged", row["below_reorder"] is False, row)
	finally:
		frappe.db.set_value("Bin", name, "reorder_level", original)
		frappe.db.commit()
		info = frappe.db.get_value("Bin", name, "reorder_level")
		print("INFO    reorder level put back to %s" % info)

	print("\n--- C: all warehouses add up to the valuation total ---")
	all_rows = summary()
	total_summary = sum(flt(r["stock_value"]) for r in all_rows)
	val = api().get_stock_valuation_report()
	check("sum of stock values equals valuation grand total",
		abs(total_summary - flt(val["grand_total"])) < 0.01, (total_summary, val["grand_total"]))

	print("\n--- D: valuation by project ---")
	vp = api().get_stock_valuation_report(project=PROJECT)
	wh_list = [r["warehouse"] for r in vp["by_warehouse"]]
	check("valuation by project lists TEST-002 warehouses only",
		wh_list and set(wh_list) <= set(frappe.get_all("Warehouse", filters={"project": PROJECT}, pluck="name")),
		wh_list)
	check("valuation by project total matches its summary",
		abs(flt(vp["grand_total"]) - sum(flt(r["stock_value"]) for r in rows)) < 0.01,
		(vp["grand_total"], sum(flt(r["stock_value"]) for r in rows)))

	scenario_e()
	print("\nDONE    see OK/FAILED lines above")