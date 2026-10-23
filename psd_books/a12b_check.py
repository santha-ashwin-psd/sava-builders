"""A12 part 2 live check: receipt confirmation on a customer delivery and on an MRN issue.

Put this file in the app folder (next to a12_check.py), then from ~/sava-bench:

	bench --site sava backup
	bench --site sava execute psd_books.a12b_check.run

Reuses the a7 seed and the A12 source store from a12_check (run a12_check first, or this does the seed itself).
Everything runs as Administrator through the real controllers and api/stock_transfer.py. Each check prints OK or
FAILED with the reason. Lines that start with INFO are not pass/fail. Safe to run again (leaves TEST records).

Scenarios:
	F  a customer delivery is not a warehouse move: confirm_receipt is refused, nothing is saved
	G  an MRN issue (store issue) can be confirmed: status Received, MRN issued qty is unchanged by confirming
	H  cancelling a confirmed MRN issue is blocked until clear_receipt_confirmation; after that it cancels and
	   the MRN line's issued qty and the stock come back
"""
import frappe
from frappe.utils import flt, nowdate, nowtime

from psd_books import a7_seed_and_check as S
from psd_books import a9_check as A
from psd_books import a12_check as T

ok, fail, check = A.ok, A.fail, A.check
expect_block = A.expect_block

CUSTOMER = "TEST A12 Customer"


def info(msg):
	print("INFO    " + msg)


def api():
	from psd_books.api import stock_transfer
	return stock_transfer


def ensure_customer():
	if frappe.db.exists("Customer", CUSTOMER):
		return CUSTOMER
	# Customer Group and Territory are ERPNext doctypes; this site may not have them, so only use them if present.
	fields = {"doctype": "Customer", "customer_name": CUSTOMER}
	if frappe.db.exists("DocType", "Customer Group"):
		fields["customer_group"] = frappe.db.get_value("Customer Group", {"is_group": 0}, "name")
	if frappe.db.exists("DocType", "Territory"):
		fields["territory"] = frappe.db.get_value("Territory", {"is_group": 0}, "name")
	cust = frappe.get_doc(fields)
	cust.flags.ignore_permissions = True
	cust.insert()
	frappe.db.commit()
	return cust.name


def customer_delivery(qty=5):
	"""A plain sale delivery from the source store to a customer. Not a stock transfer, no MRN."""
	d = frappe.get_doc({
		"doctype": "Delivery Note", "company": S.CO, "posting_date": nowdate(), "posting_time": nowtime(),
		"customer": ensure_customer(), "project": S.PROJECT, "set_warehouse": T.CTX["src"],
		"items": [{"item_code": S.ITEM, "item_name": S.ITEM, "qty": qty, "uom": T.CTX["uom"],
			"stock_uom": T.CTX["uom"], "conversion_factor": 1, "warehouse": T.CTX["src"], "rate": 150}]})
	d.flags.ignore_permissions = True
	d.insert()
	d.submit()
	frappe.db.commit()
	return d.name


def mrn_issue(mrn_name, qty=10):
	"""A store issue against an approved MRN, from the source store to the site store."""
	mrn = frappe.get_doc("Material Request", mrn_name)
	line = mrn.items[0]
	d = frappe.get_doc({
		"doctype": "Delivery Note", "company": S.CO, "posting_date": nowdate(), "posting_time": nowtime(),
		"material_request": mrn_name, "project": S.PROJECT, "from_warehouse": T.CTX["src"],
		"to_warehouse": T.CTX["dst"], "driver_name": "Test Driver", "driver_id": "12345678",
		"truck_no": "KDA 123A",
		"items": [{"item_code": S.ITEM, "item_name": S.ITEM, "qty": qty, "uom": T.CTX["uom"],
			"stock_uom": T.CTX["uom"], "conversion_factor": 1, "warehouse": T.CTX["src"],
			"mrn_item": line.name}]})
	d.flags.ignore_permissions = True
	d.insert()
	d.submit()
	frappe.db.commit()
	return d.name


def mrn_issued(mrn_name):
	return flt(frappe.db.get_value("Material Request Item", {"parent": mrn_name, "item_code": S.ITEM}, "issued_qty"))


# --- scenarios --------------------------------------------------------------
def scenario_f():
	print("\n--- F: customer delivery is not confirmable ---")
	dn = customer_delivery()
	ok("customer delivery %s submitted" % dn)
	expect_block("confirm a customer delivery blocked",
		lambda: api().confirm_receipt(dn, "John Kamau", "12345678"),
		"not customer deliveries")
	row = frappe.db.get_value("Delivery Note", dn, ["status", "received_on"], as_dict=True)
	check("customer delivery untouched by the refusal", row.status != "Received" and not row.received_on, row)


def scenario_g(mrn_name):
	print("\n--- G: confirm an MRN issue ---")
	before = T.stock(S.ITEM, T.CTX["src"])
	issued_before = mrn_issued(mrn_name)
	dn = mrn_issue(mrn_name)
	ok("MRN issue %s submitted against %s" % (dn, mrn_name))
	check("stock left the source store", T.stock(S.ITEM, T.CTX["src"]) < before, (before, T.stock(S.ITEM, T.CTX["src"])))
	issued_after_submit = mrn_issued(mrn_name)
	check("MRN issued qty went up on submit", issued_after_submit > issued_before, (issued_before, issued_after_submit))
	res = api().confirm_receipt(dn, "Peter Mwangi", "87654321")
	frappe.db.commit()  # keep the confirmation: a later refused cancel must not roll it back
	check("confirm MRN issue -> Received", res.get("status") == "Received", res)
	check("confirming did not change MRN issued qty", mrn_issued(mrn_name) == issued_after_submit,
		(issued_after_submit, mrn_issued(mrn_name)))
	expect_block("second confirm of MRN issue blocked", lambda: api().confirm_receipt(dn, "X", "1"),
		"already confirmed")
	return dn


def scenario_h(dn, mrn_name):
	print("\n--- H: clear, then cancel; refused cancel last ---")
	# Clear and cancel first. A refused cancel earlier in the same process left the confirmation unclearable,
	# so the refused-cancel check runs last, on its own confirmed note.
	api().clear_receipt_confirmation(dn)
	frappe.db.commit()
	check("cleared -> Submitted", frappe.db.get_value("Delivery Note", dn, "status") == "Submitted")
	issued_before = mrn_issued(mrn_name)
	stock_before = T.stock(S.ITEM, T.CTX["src"])
	d = frappe.get_doc("Delivery Note", dn)
	d.flags.ignore_permissions = True
	d.cancel()
	frappe.db.commit()
	check("MRN issue cancelled", frappe.db.get_value("Delivery Note", dn, "docstatus") == 2)
	check("MRN issued qty went back down", mrn_issued(mrn_name) < issued_before, (issued_before, mrn_issued(mrn_name)))
	check("stock came back to the source store", T.stock(S.ITEM, T.CTX["src"]) > stock_before,
		(stock_before, T.stock(S.ITEM, T.CTX["src"])))
	# Last step: a fresh confirmed MRN issue must refuse cancel. Nothing runs after this.
	dn2 = mrn_issue(mrn_name, qty=5)
	api().confirm_receipt(dn2, "Peter Mwangi", "87654321")
	frappe.db.commit()
	expect_block("cancel of a confirmed MRN issue blocked (final)",
		lambda: frappe.get_doc("Delivery Note", dn2).cancel(), "Clear the receipt confirmation")


def run():
	frappe.set_user("Administrator")
	T.setup()
	T.top_up(minimum=300)
	mrn_name = S.approved_mrn()
	scenario_f()
	dn = scenario_g(mrn_name)
	scenario_h(dn, mrn_name)
	frappe.db.commit()
	print("\nDONE    see OK/FAILED lines above")