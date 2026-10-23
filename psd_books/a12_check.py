"""A12 live check: stock transfer and receipt confirmation, on an empty site.

Put this file in the app folder (next to a11_check.py), then from ~/sava-bench:

	bench --site sava backup
	bench --site sava execute psd_books.a12_check.run

It reuses the a7 seed (TEST Company, TEST-001, TEST Site Store, TEST-CEMENT) and creates one plain source
warehouse ("TEST A12 Source Store") that it tops up with a Material Receipt. Everything runs as Administrator
through the real controllers and the real api/stock_transfer.py functions. Each check prints OK or FAILED with
the reason. Lines that start with INFO are not pass/fail. Safe to run again (it leaves its TEST records on the
site, like a9_check, a10_check and a11_check do).

Scenarios:
	A  stock transfer rules: required fields, same warehouse, qty, MRN link, stock on hand, customer rule
	B  a valid transfer submits: Material Transfer Stock Entry, stock moves, rows forced to the source warehouse
	C  confirm_receipt: saved details, status, and every refusal (draft, twice, blank, future, before dispatch)
	D  cancel is blocked while confirmed; clear_receipt_confirmation; cancel then works and stock comes back
	E  the fields the Delivery Challans screen reads exist and hold the right values
Not covered here (needs a customer sale and an approved MRN, see test_stock_transfer.py for the rule itself):
a confirmation on a customer delivery, and on an MRN issue. Role limits belong to A17.
"""
import frappe
from frappe.utils import add_to_date, flt, now_datetime, nowdate, nowtime

from psd_books import a7_seed_and_check as S
from psd_books import a9_check as A

ok, fail, check = A.ok, A.fail, A.check
expect_block, expect_ok = A.expect_block, A.expect_ok

SRC_NAME = "TEST A12 Source Store"
CTX = {}


def info(msg):
	print("INFO    " + msg)


def stock(item, wh):
	return flt(frappe.db.get_value("Bin", {"item_code": item, "warehouse": wh}, "actual_qty"))


def api():
	from psd_books.api import stock_transfer
	return stock_transfer


# --- setup ------------------------------------------------------------------
def setup():
	S.seed()
	# Item.item_type defaults to Service, and a Service is saved with is_stock_item=0, so no stock would move.
	frappe.db.set_value("Item", S.ITEM, {"item_type": "Raw Material", "is_stock_item": 1})
	from psd_books.books_setup.install import ensure_company_stores
	ensure_company_stores(S.CO)
	S._get_or_create("Warehouse", SRC_NAME, warehouse_name=SRC_NAME, company=S.CO)  # plain: no role, no project
	src = SRC_NAME if frappe.db.exists("Warehouse", SRC_NAME) else frappe.db.get_value(
		"Warehouse", {"warehouse_name": SRC_NAME, "company": S.CO}, "name")
	CTX.update(src=src, dst=S.WH, uom=frappe.db.get_value("Item", S.ITEM, "stock_uom") or "Bag")
	frappe.db.commit()
	ok("seed ready (source %s, destination %s, item %s)" % (src, S.WH, S.ITEM))


def top_up(minimum=200):
	"""Material Receipt into the source store so every scenario starts with enough stock."""
	have = stock(S.ITEM, CTX["src"])
	if have >= minimum:
		return
	se = frappe.get_doc({
		"doctype": "Stock Entry", "stock_entry_type": "Material Receipt", "posting_date": nowdate(),
		"posting_time": nowtime(), "set_posting_time": 1, "company": S.CO, "remarks": "A12 check opening stock",
		"items": [{"item_code": S.ITEM, "item_name": S.ITEM, "qty": minimum - have, "basic_rate": 100,
			"t_warehouse": CTX["src"]}]})
	se.flags.ignore_permissions = True
	se.insert()
	se.submit()
	frappe.db.commit()


# --- helpers ----------------------------------------------------------------
def make_transfer(qty=40, **over):
	row = {"item_code": S.ITEM, "item_name": S.ITEM, "qty": qty, "uom": CTX["uom"], "stock_uom": CTX["uom"],
		"conversion_factor": 1, "warehouse": CTX["dst"]}   # wrong on purpose: the controller must force the source
	doc = {"doctype": "Delivery Note", "company": S.CO, "posting_date": nowdate(), "project": S.PROJECT,
		"is_stock_transfer": 1, "from_warehouse": CTX["src"], "to_warehouse": CTX["dst"],
		"driver_name": "Test Driver", "driver_id": "12345678", "truck_no": "KDA 123A", "items": [row]}
	doc.update(over)
	d = frappe.get_doc(doc)
	d.flags.ignore_permissions = True
	return d


def save_only(doc):
	doc.insert()
	frappe.db.commit()
	return doc.name


def save_and_submit(doc):
	doc.insert()
	doc.submit()
	frappe.db.commit()
	return doc.name


def row_of(dn):
	return frappe.db.get_value("Delivery Note", dn, ["docstatus", "status", "received_by_name", "received_by_id",
		"received_on", "is_stock_transfer"], as_dict=True)


def linked_entries(dn):
	out = []
	for se in frappe.get_all("Stock Entry", filters={"reference_doctype": "Delivery Note", "reference_name": dn},
			fields=["name", "stock_entry_type", "docstatus"]):
		rows = frappe.get_all("Stock Entry Detail", filters={"parent": se.name},
			fields=["item_code", "s_warehouse", "t_warehouse", "qty"])
		out.append((se.name, se.stock_entry_type, se.docstatus, [(r.item_code, r.s_warehouse, r.t_warehouse, r.qty) for r in rows]))
	return out


def blocked(label, fn, *needles):
	expect_block(label, fn, *needles)
	frappe.db.rollback()


def cancel(dn):
	d = frappe.get_doc("Delivery Note", dn)
	d.flags.ignore_permissions = True
	d.cancel()
	frappe.db.commit()


# --- scenarios --------------------------------------------------------------
def scenario_a():
	print("\n--- A: stock transfer rules ---")
	top_up()
	blocked("no driver name", lambda: save_only(make_transfer(driver_name="")), "Driver Name", "Please fill in")
	blocked("no truck number", lambda: save_only(make_transfer(truck_no="")), "Truck", "Please fill in")
	blocked("no destination warehouse", lambda: save_only(make_transfer(to_warehouse="")), "Destination", "Please fill in")
	blocked("same source and destination", lambda: save_only(make_transfer(to_warehouse=CTX["src"])), "different")
	blocked("quantity 0", lambda: save_only(make_transfer(qty=0)), "qty must be")
	blocked("linked to a Material Request", lambda: save_only(make_transfer(material_request="MRN-DOES-NOT-EXIST")),
		"cannot be linked", "Material Request")
	from psd_books.inventory.doctype.stock_entry.stock_entry import _allow_negative_stock
	if _allow_negative_stock():
		info("negative stock is allowed on this site, so the insufficient-stock check is skipped")
	else:
		have = stock(S.ITEM, CTX["src"])
		blocked("more than the stock on hand (%s)" % have, lambda: save_only(make_transfer(qty=have + 1)), "Insufficient stock")
	# A plain Delivery Note (not a transfer, no MRN) still needs a customer.
	blocked("ordinary challan without a customer", lambda: save_only(make_transfer(is_stock_transfer=0)), "Customer is required")
	d = make_transfer()
	d.customer = None
	expect_ok("a transfer needs no customer (saved as a draft)", lambda: save_only(d))


def scenario_b():
	print("\n--- B: a valid transfer ---")
	top_up()
	src0, dst0 = stock(S.ITEM, CTX["src"]), stock(S.ITEM, CTX["dst"])
	dn = expect_ok("create and submit a transfer of 40", lambda: save_and_submit(make_transfer(40)))
	if not dn:
		return
	CTX["t1"] = dn
	r = row_of(dn)
	check("submitted, flagged as a stock transfer, status Submitted",
		r.docstatus == 1 and r.is_stock_transfer == 1 and r.status == "Submitted", r)
	check("no receipt details yet", not r.received_on and not r.received_by_name, r)
	wh = frappe.db.get_value("Delivery Note Item", {"parent": dn}, "warehouse")
	check("item row warehouse was forced to the source store", wh == CTX["src"], wh)
	ent = linked_entries(dn)
	check("one submitted Material Transfer Stock Entry, source -> destination, qty 40",
		len(ent) == 1 and ent[0][1] == "Material Transfer" and ent[0][2] == 1
		and ent[0][3] == [(S.ITEM, CTX["src"], CTX["dst"], 40)], ent)
	check("source store went down by 40", stock(S.ITEM, CTX["src"]) - src0 == -40, stock(S.ITEM, CTX["src"]) - src0)
	check("destination store went up by 40", stock(S.ITEM, CTX["dst"]) - dst0 == 40, stock(S.ITEM, CTX["dst"]) - dst0)
	CTX["t2"] = expect_ok("second transfer of 10 (kept unconfirmed for the refusal checks)",
		lambda: save_and_submit(make_transfer(10)))
	CTX["draft"] = expect_ok("a draft transfer (kept unsubmitted)", lambda: save_only(make_transfer(5)))
	top_up()


def scenario_c():
	print("\n--- C: confirm_receipt ---")
	t1, t2, draft = CTX.get("t1"), CTX.get("t2"), CTX.get("draft")
	if not (t1 and t2 and draft):
		fail("scenario B did not leave the notes this scenario needs")
		return
	blocked("confirm a draft transfer", lambda: api().confirm_receipt(draft, "Jane Wanjiru", "12345678"), "submitted")
	blocked("confirm with a blank name", lambda: api().confirm_receipt(t2, "  ", "12345678"), "name and I.D.")
	blocked("confirm with a blank I.D.", lambda: api().confirm_receipt(t2, "Jane Wanjiru", None), "name and I.D.")
	blocked("confirm with a time in the future",
		lambda: api().confirm_receipt(t2, "Jane Wanjiru", "12345678", add_to_date(now_datetime(), days=1)), "future")
	blocked("confirm with a time before the dispatch date",
		lambda: api().confirm_receipt(t2, "Jane Wanjiru", "12345678", add_to_date(now_datetime(), days=-1)),
		"before the dispatch")
	check("the refusals changed nothing on the note", not row_of(t2).received_on and row_of(t2).status == "Submitted", row_of(t2))
	res = expect_ok("confirm T1 (name and I.D. with spaces, time left blank)",
		lambda: api().confirm_receipt(t1, "  Jane Wanjiru ", " 12345678  "))
	frappe.db.commit()
	r = row_of(t1)
	check("details saved trimmed", r.received_by_name == "Jane Wanjiru" and r.received_by_id == "12345678", r)
	check("status is Received", r.status == "Received" and (res or {}).get("status") == "Received", r.status)
	secs = abs((now_datetime() - frappe.utils.get_datetime(r.received_on)).total_seconds()) if r.received_on else 9e9
	check("received_on defaulted to about now", secs < 300, r.received_on)
	check("still a submitted note", r.docstatus == 1, r.docstatus)
	blocked("confirm T1 a second time", lambda: api().confirm_receipt(t1, "Someone Else", "999"), "already confirmed")
	r = row_of(t1)
	check("the first confirmation was not overwritten", r.received_by_name == "Jane Wanjiru", r.received_by_name)
	expect_ok("confirm T2 with an explicit time (now)",
		lambda: api().confirm_receipt(t2, "Peter Otieno", "87654321", now_datetime()))
	frappe.db.commit()
	check("T2 confirmed with its own details", row_of(t2).received_by_name == "Peter Otieno", row_of(t2))
	# put T2 back to unconfirmed so scenario D can use it as the "nothing to clear" case
	expect_ok("clear T2 again", lambda: api().clear_receipt_confirmation(t2))
	frappe.db.commit()


def scenario_d():
	print("\n--- D: cancel guard and clear_receipt_confirmation ---")
	t1, t2 = CTX.get("t1"), CTX.get("t2")
	if not (t1 and t2):
		fail("scenario B did not leave the notes this scenario needs")
		return
	check("T1 is confirmed going into this scenario", bool(row_of(t1).received_on), row_of(t1))
	src_x, dst_x = stock(S.ITEM, CTX["src"]), stock(S.ITEM, CTX["dst"])
	blocked("cancel T1 while its receipt is confirmed", lambda: cancel(t1), "Clear the receipt confirmation")
	check("T1 is still submitted and still Received", row_of(t1).docstatus == 1 and row_of(t1).status == "Received", row_of(t1))
	check("stock did not move on the refused cancel",
		stock(S.ITEM, CTX["src"]) == src_x and stock(S.ITEM, CTX["dst"]) == dst_x,
		(src_x, stock(S.ITEM, CTX["src"]), dst_x, stock(S.ITEM, CTX["dst"])))
	check("T1's Stock Entry is still submitted", [e[2] for e in linked_entries(t1)] == [1], linked_entries(t1))
	blocked("clear the confirmation of T2 which was never confirmed", lambda: api().clear_receipt_confirmation(t2),
		"no receipt confirmation")
	blocked("clear the confirmation of a draft", lambda: api().clear_receipt_confirmation(CTX["draft"]),
		"no receipt confirmation")
	expect_ok("clear the confirmation of T1", lambda: api().clear_receipt_confirmation(t1))
	frappe.db.commit()
	r = row_of(t1)
	check("details blanked and status back to Submitted",
		not r.received_on and not r.received_by_name and not r.received_by_id and r.status == "Submitted", r)
	src_b, dst_b = stock(S.ITEM, CTX["src"]), stock(S.ITEM, CTX["dst"])
	expect_ok("cancel T1 now that it is cleared", lambda: cancel(t1))
	r = row_of(t1)
	check("T1 is cancelled", r.docstatus == 2 and r.status == "Cancelled", r)
	ent = linked_entries(t1)
	check("its Stock Entry is cancelled too", len(ent) == 1 and ent[0][2] == 2, ent)
	check("source got the 40 back", stock(S.ITEM, CTX["src"]) - src_b == 40, stock(S.ITEM, CTX["src"]) - src_b)
	check("destination gave the 40 back", stock(S.ITEM, CTX["dst"]) - dst_b == -40, stock(S.ITEM, CTX["dst"]) - dst_b)
	blocked("confirm a cancelled note", lambda: api().confirm_receipt(t1, "Jane Wanjiru", "12345678"), "submitted")


def scenario_e():
	print("\n--- E: what the Delivery Challans screen reads ---")
	t2 = CTX.get("t2")
	if not t2:
		fail("scenario B did not leave the note this scenario needs")
		return
	res = expect_ok("list query with the A12 fields (received_on, material_request, is_stock_transfer)",
		lambda: frappe.get_all("Delivery Note", filters={"company": S.CO, "name": t2},
			fields=["name", "status", "docstatus", "received_on", "material_request", "is_stock_transfer"]))
	check("an unconfirmed submitted transfer reads as: no received_on, no MRN, is_stock_transfer 1",
		bool(res) and not res[0].received_on and not res[0].material_request and res[0].is_stock_transfer == 1, res)
	expect_ok("confirm T2, then read it the way openView does",
		lambda: api().confirm_receipt(t2, "Peter Otieno", "87654321"))
	frappe.db.commit()
	d = frappe.get_doc("Delivery Note", t2).as_dict()
	check("received_by_name, received_by_id and received_on come back on the document",
		d.get("received_by_name") == "Peter Otieno" and d.get("received_by_id") == "87654321" and bool(d.get("received_on")),
		{k: d.get(k) for k in ("received_by_name", "received_by_id", "received_on")})


def run():
	frappe.set_user("Administrator")
	try:
		setup()
	except Exception:  # noqa: BLE001
		import traceback
		fail("setup crashed:\n" + traceback.format_exc())
		return
	for fn in (scenario_a, scenario_b, scenario_c, scenario_d, scenario_e):
		try:
			fn()
		except Exception:  # noqa: BLE001
			import traceback
			fail("%s crashed:\n%s" % (fn.__name__, traceback.format_exc()))
		finally:
			frappe.set_user("Administrator")
			frappe.db.commit()
	print("\nDONE    %d OK, %d FAILED" % (A.RESULT["ok"], A.RESULT["failed"]))