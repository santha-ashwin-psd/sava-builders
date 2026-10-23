"""A11 live check: Goods Received Note (GRN) against an LPO, on an empty site.

Put this file in the app folder (next to a10_check.py), then from ~/sava-bench:

	bench --site sava backup
	bench --site sava execute psd_books.a11_check.run

It reuses the a7 seed (TEST Company, TEST-001, TEST Site Store, TEST-CEMENT), the a9 helpers and the 4 TEST users.
LPOs are approved through the real PO approval API (100,000 -> Purchase Manager only), then receipts are
raised and submitted as Administrator. Each check prints OK or FAILED with the reason. Lines that start with
INFO are not pass/fail: they report what the system does today where the plan is not enforced by code.
Safe to run again (it leaves its TEST records on the site, like a9_check and a10_check do).

Scenarios (all LPOs are 100 bags at 1,000):
	A  partial receipt 60, over-receipt blocked, remaining 40 received, LPO status
	B  100 received, 90 accepted -> 10 to the Rejected Store; accepted above received blocked; cancel reverses
	C  an item that is not on the LPO is blocked
	D  TEST-STEEL (inspection required): INFO on QC inspections created and where the stock lands
	E  GRN into a warehouse that belongs to another project: allowed, but a warning is shown
"""
import frappe
from frappe.utils import nowdate

from psd_books import a7_seed_and_check as S
from psd_books import a9_check as A

ok, fail, check = A.ok, A.fail, A.check
expect_block, expect_ok, as_user = A.expect_block, A.expect_ok, A.as_user
RAISER, PM = A.RAISER, A.PM

STEEL = "TEST-STEEL"
OTHER_PROJECT = "TEST-002"
OTHER_WH = "TEST Other Project Store"


def info(msg):
	print("INFO    " + msg)


def po_api():
	from psd_books.api import purchase_order_approval as api
	return api


def reload():
	frappe.db.commit()


# --- setup ------------------------------------------------------------------
def setup():
	suppliers = S.seed()
	S._get_or_create("Item", STEEL, item_code=STEEL, item_name="Test Steel", stock_uom="Bag",
		quality_inspection_required=1)
	if not frappe.db.get_value("Item", STEEL, "quality_inspection_required"):
		frappe.db.set_value("Item", STEEL, "quality_inspection_required", 1)
	# The QC engine gates Purchase Receipts on this other Item flag (custom field), not on the one above.
	if frappe.db.has_column("Item", "inspection_required_before_purchase"):
		frappe.db.set_value("Item", STEEL, "inspection_required_before_purchase", 1)
	else:
		info("Item has no inspection_required_before_purchase column: run bench migrate, then run this again")
	# Item.item_type defaults to Service, and a Service is saved with is_stock_item=0, so no stock would ever move.
	for code in (S.ITEM, STEEL):
		frappe.db.set_value("Item", code, {"item_type": "Raw Material", "is_stock_item": 1})
	# The TEST company is created after migrate, so give it its Central / Rejected Store the way migrate does.
	from psd_books.books_setup.install import ensure_company_stores
	ensure_company_stores(S.CO)
	S._get_or_create("Project", OTHER_PROJECT, project_code=OTHER_PROJECT, project_name="Test Project 2",
		start_date=nowdate(), project_manager=S.PROJECT_MANAGER, company=S.CO)
	wh = {"warehouse_name": OTHER_WH, "company": S.CO}
	if frappe.db.has_column("Warehouse", "project"):
		wh["project"] = OTHER_PROJECT
		wh["store_role"] = "Site Store"  # a project warehouse must have a role (Warehouse._validate_store_role)
	S._get_or_create("Warehouse", OTHER_WH, **wh)
	frappe.db.commit()
	ok("seed ready (TEST-CEMENT, TEST-STEEL with inspection required, projects TEST-001 / TEST-002)")
	return suppliers[0]


def approved_po(supplier, item=S.ITEM, qty=100, rate=1000):
	"""A submitted, approved LPO: 100 x 1,000 = 100,000, so one level (Purchase Manager)."""
	po = frappe.get_doc({
		"doctype": "Purchase Order", "status": "Draft", "supplier": supplier, "company": S.CO,
		"transaction_date": nowdate(), "purchase_type": "Goods", "project": S.PROJECT,
		"items": [{"item_code": item, "qty": qty, "rate": rate, "uom": "Bag"}]})
	po.insert(ignore_permissions=True)
	frappe.db.commit()
	if not expect_ok("send %s for approval" % po.name, lambda: as_user(RAISER, lambda: po_api().send_for_approval(po.name))):
		return None
	reload()
	if not expect_ok("Purchase Manager approves %s" % po.name, lambda: as_user(PM, lambda: po_api().approve_po(po.name))):
		return None
	reload()
	return po.name


def po_state(po):
	rows = frappe.get_all("Purchase Order Item", filters={"parent": po}, fields=["name", "received_qty"], order_by="idx")
	return {"status": frappe.db.get_value("Purchase Order", po, "status"), "received": [r.received_qty for r in rows],
		"row": rows[0].name}


def stock(item, wh):
	return frappe.db.get_value("Bin", {"item_code": item, "warehouse": wh}, "actual_qty") or 0


def linked_entries(grn):
	"""Stock Entries the GRN created (stock_link): name, type, docstatus, rows (item, from, to, qty)."""
	out = []
	for se in frappe.get_all("Stock Entry", filters={"reference_doctype": "Purchase Receipt", "reference_name": grn},
			fields=["name", "stock_entry_type", "docstatus"]):
		rows = frappe.get_all("Stock Entry Detail", filters={"parent": se.name},
			fields=["item_code", "s_warehouse", "t_warehouse", "qty"])
		out.append((se.name, se.stock_entry_type, se.docstatus, [(r.item_code, r.s_warehouse, r.t_warehouse, r.qty) for r in rows]))
	return out


def rejected_store():
	return frappe.db.get_value("Warehouse", {"company": S.CO, "store_role": "Rejected Store", "disabled": 0}, "name")


def make_grn(po, supplier, qty, accepted=None, item=S.ITEM, wh=S.WH, po_item="auto", project=S.PROJECT):
	if po_item == "auto":
		po_item = po_state(po)["row"]
	row = {"item_code": item, "qty": qty, "rate": 1000, "uom": "Bag", "warehouse": wh}
	if po_item:
		row["po_item"] = po_item
	if accepted is not None:
		row["accepted_qty"] = accepted
	doc = frappe.get_doc({
		"doctype": "Purchase Receipt", "supplier": supplier, "company": S.CO, "posting_date": nowdate(),
		"purchase_order": po, "project": project, "set_warehouse": wh,
		"supplier_delivery_note": "SDN-TEST", "vehicle_no": "KDA 123A", "driver_name": "Test Driver",
		"driver_id_no": "12345678", "items": [row]})
	return doc


CEMENT_TEMPLATE = "TEST Cement QC"


def ensure_cement_template():
	"""A QC template for cement, so the receipt creates an inspection with a reading to fill in."""
	if frappe.db.exists("QC Inspection Template", CEMENT_TEMPLATE):
		return
	t = frappe.get_doc({"doctype": "QC Inspection Template", "template_name": CEMENT_TEMPLATE,
		"item": S.ITEM, "inspection_type": "Incoming",
		"parameters": [{"parameter": "Moisture", "parameter_type": "Numeric", "min_value": 0, "max_value": 10}]})
	t.flags.ignore_permissions = True
	t.insert()
	frappe.db.commit()


def pass_cement_qc(grn):
	"""Fill in and submit the Pending QC Inspection the receipt created, with an accepted reading."""
	qcs = frappe.get_all("QC Inspection", filters={"reference_type": "Purchase Receipt",
		"reference_name": grn, "docstatus": 0}, pluck="name")
	for name in qcs:
		q = frappe.get_doc("QC Inspection", name)
		q.flags.ignore_permissions = True
		for r in q.readings:
			r.reading_value = "5"          # inside the template's 0 to 10 range
		q.inspected_by = "Administrator"
		q.inspection_date = nowdate()
		q.save()
		q.submit()
	frappe.db.commit()
	return qcs


def save_and_submit(doc):
	"""Save the receipt first (so its QC inspection is kept), then submit. For cement-only receipts, pass the
	inspection and submit again. Other receipts and other errors behave as before."""
	ensure_cement_template()
	doc.flags.ignore_permissions = True
	doc.insert()
	frappe.db.commit()
	cement_only = all(r.item_code == S.ITEM for r in doc.items)
	try:
		doc.submit()
	except Exception as e:  # noqa: BLE001
		if not (cement_only and "QC Inspection" in str(e)):
			raise
		frappe.db.rollback()
		info("QC pending for %s: passing its inspection and submitting again" % doc.name)
		pass_cement_qc(doc.name)
		d = frappe.get_doc("Purchase Receipt", doc.name)
		d.flags.ignore_permissions = True
		d.submit()
	frappe.db.commit()
	return doc.name


# --- scenarios --------------------------------------------------------------
def scenario_a(supplier):
	print("\n--- A: partial receipt, over-receipt blocked, remainder received ---")
	po = approved_po(supplier)
	if not po:
		return
	before = stock(S.ITEM, S.WH)
	g1 = expect_ok("GRN 1: receive 60 of 100", lambda: save_and_submit(make_grn(po, supplier, 60)))
	reload()
	if g1:
		info("GRN %s Stock Entries: %s" % (g1, linked_entries(g1) or "none"))
		info("item flags: is_stock_item=%s is_fixed_asset=%s warehouse(Bin qty)=%s" % (
			frappe.db.get_value("Item", S.ITEM, "is_stock_item"), frappe.db.get_value("Item", S.ITEM, "is_fixed_asset"),
			frappe.get_all("Bin", filters={"item_code": S.ITEM}, fields=["warehouse", "actual_qty"])))
	st = po_state(po)
	check("LPO received_qty is 60 and status Partially Received", st["received"] == [60] and st["status"] == "Partially Received", st)
	check("stock in the site store rose by 60", stock(S.ITEM, S.WH) - before == 60, stock(S.ITEM, S.WH) - before)
	expect_block("GRN 2: receive 50 when only 40 are pending", lambda: save_and_submit(make_grn(po, supplier, 50)), "over-receipt", "pending")
	frappe.db.rollback()
	expect_ok("GRN 3: receive the remaining 40", lambda: save_and_submit(make_grn(po, supplier, 40)))
	reload()
	st = po_state(po)
	check("LPO received_qty is 100 and status Received", st["received"] == [100] and st["status"] == "Received", st)
	expect_block("GRN 4: receive 1 more on a fully received LPO", lambda: save_and_submit(make_grn(po, supplier, 1)), "over-receipt", "pending")
	frappe.db.rollback()
	if g1:
		check("GRN 1 kept its vehicle / driver / supplier DN",
			frappe.db.get_value("Purchase Receipt", g1, ["vehicle_no", "driver_name", "supplier_delivery_note"]) == ("KDA 123A", "Test Driver", "SDN-TEST"))


def scenario_b(supplier):
	print("\n--- B: rejected quantity goes to the Rejected Store, cancel reverses ---")
	po = approved_po(supplier)
	if not po:
		return
	rej = rejected_store()
	check("a Rejected Store exists for the TEST company", bool(rej), rej)
	if not rej:
		return
	site0, rej0 = stock(S.ITEM, S.WH), stock(S.ITEM, rej)
	expect_block("accepted 120 when only 100 received", lambda: save_and_submit(make_grn(po, supplier, 100, accepted=120)), "accepted")
	frappe.db.rollback()
	grn = expect_ok("GRN: 100 received, 90 accepted", lambda: save_and_submit(make_grn(po, supplier, 100, accepted=90)))
	reload()
	if not grn:
		return
	check("rejected_qty derived as 10", frappe.db.get_value("Purchase Receipt Item", {"parent": grn}, "rejected_qty") == 10)
	check("site store rose by 90 (accepted only)", stock(S.ITEM, S.WH) - site0 == 90, stock(S.ITEM, S.WH) - site0)
	check("Rejected Store rose by 10", stock(S.ITEM, rej) - rej0 == 10, stock(S.ITEM, rej) - rej0)
	check("LPO counts the full 100 as received", po_state(po)["received"] == [100], po_state(po))

	def cancel():
		# The receipt is linked to its submitted QC Inspection: cancel the inspection first, then the receipt.
		for q in frappe.get_all("QC Inspection", filters={"reference_type": "Purchase Receipt",
				"reference_name": grn, "docstatus": 1}, pluck="name"):
			qd = frappe.get_doc("QC Inspection", q)
			qd.flags.ignore_permissions = True
			qd.cancel()
		d = frappe.get_doc("Purchase Receipt", grn)
		d.flags.ignore_permissions = True
		d.cancel()
		frappe.db.commit()
	expect_ok("cancel the GRN", cancel)
	check("site store back to start", stock(S.ITEM, S.WH) == site0, stock(S.ITEM, S.WH) - site0)
	check("Rejected Store back to start", stock(S.ITEM, rej) == rej0, stock(S.ITEM, rej) - rej0)
	check("LPO received_qty back to 0", po_state(po)["received"] == [0], po_state(po))


def scenario_c(supplier):
	print("\n--- C: an item that is not on the LPO ---")
	po = approved_po(supplier)
	if not po:
		return
	expect_block("steel received against a cement LPO", lambda: save_and_submit(make_grn(po, supplier, 10, item=STEEL, po_item=None)), "not on this lpo")
	frappe.db.rollback()


def scenario_d(supplier):
	print("\n--- D: item flagged inspection required (cement / steel) ---")
	po = approved_po(supplier, item=STEEL)
	if not po:
		return
	before = stock(STEEL, S.WH)
	try:
		grn = save_and_submit(make_grn(po, supplier, 100, item=STEEL))
		info("GRN %s submitted without being stopped by inspection" % grn)
	except Exception as e:  # noqa: BLE001
		frappe.db.rollback()
		ok("GRN of an inspection-required item is blocked until QC is cleared: %s" % str(e)[:110])
		grn = None
	qcs = []
	if grn:
		info("GRN %s Stock Entries: %s" % (grn, linked_entries(grn) or "none"))
		qcs = frappe.get_all("QC Inspection", filters={"reference_type": "Purchase Receipt", "reference_name": grn},
			fields=["name", "status"])
	info("QC Inspections created for the GRN: %s" % (qcs or "none"))
	info("steel stock in the site store changed by %s (100 would mean it is available before inspection)"
		% (stock(STEEL, S.WH) - before))
	info("Plan says cement and steel go through inspection. If no inspection exists, or the stock is available "
		"at once, this needs a rule (decide: hold until inspection passes).")


def scenario_e(supplier):
	print("\n--- E: GRN into a warehouse that belongs to another project (warn only) ---")
	po = approved_po(supplier)
	if not po:
		return
	frappe.local.message_log = []
	grn = expect_ok("GRN into %s (project %s) is still allowed" % (OTHER_WH, OTHER_PROJECT),
		lambda: save_and_submit(make_grn(po, supplier, 10, wh=OTHER_WH)))
	shown = " ".join(str(m) for m in (getattr(frappe.local, "message_log", None) or []))
	check("a warning names the warehouse and both projects",
		OTHER_WH in shown and OTHER_PROJECT in shown and S.PROJECT in shown and "belongs to project" in shown, shown[:200])
	frappe.local.message_log = []
	good = expect_ok("GRN into the project's own warehouse", lambda: save_and_submit(make_grn(po, supplier, 5)))
	shown = " ".join(str(m) for m in (getattr(frappe.local, "message_log", None) or []))
	check("no project-store warning for the right warehouse", "belongs to project" not in shown, shown[:200])


def run():
	frappe.set_user("Administrator")
	try:
		supplier = setup()  # creates TEST Company first; the users below must join it
		A.make_users()
	except Exception:  # noqa: BLE001
		import traceback
		fail("setup crashed:\n" + traceback.format_exc())
		return
	for fn in (scenario_a, scenario_b, scenario_c, scenario_d, scenario_e):
		try:
			fn(supplier)
		except Exception:  # noqa: BLE001
			import traceback
			fail("%s crashed:\n%s" % (fn.__name__, traceback.format_exc()))
		finally:
			frappe.set_user("Administrator")
			frappe.db.commit()
	print("\nDONE    %d OK, %d FAILED" % (A.RESULT["ok"], A.RESULT["failed"]))