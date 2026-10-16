"""Supplier Quotation rules (Sava A8.2).

A purchase user types in what a supplier replied against a Sent RFQ.

- validate_active(doc): every check below, run on each save of an Active quotation
- keep_status_server_side(doc, before): status changes only through the A8.3 API (flags.sq_workflow)
- one Active quotation per RFQ and supplier; a revision supersedes the old one first (A8.3)
- VAT % comes from the item's purchase tax template, never from the client
"""
import frappe
from frappe import _
from frappe.utils import flt, getdate, nowdate

from zoho_books_clone.invoicing import supplier_quotation_calc as calc

RFQ_OPEN_STATUS = "Sent"


# --- loading ---------------------------------------------------------------
def load_rfq(name):
	rfq = frappe.db.get_value(
		"Request for Quotation", name,
		["name", "status", "company", "project", "posting_date"], as_dict=True)
	if not rfq:
		frappe.throw(_("Request for Quotation {0} not found").format(name))
	return rfq


def rfq_lines(rfq_name):
	return frappe.get_all(
		"Request for Quotation Item", filters={"parent": rfq_name, "parenttype": "Request for Quotation"},
		fields=["name", "mrn_item", "item_code", "item_name", "qty", "uom"], order_by="idx asc")


def rfq_suppliers(rfq_name):
	return {r.supplier: r.get("supplier_name") for r in frappe.get_all(
		"Request for Quotation Supplier", filters={"parent": rfq_name, "parenttype": "Request for Quotation"},
		fields=["supplier", "supplier_name"])}


def wanted_lines(rows):
	"""{mrn_item: {item_code, item_name, uom, qty}}. An MRN line split over two RFQ rows is added up."""
	out = {}
	for r in rows:
		key = r.get("mrn_item")
		if key in out:
			out[key]["qty"] += flt(r.get("qty"))
		else:
			out[key] = {"item_code": r.get("item_code"), "item_name": r.get("item_name"),
				"uom": r.get("uom"), "qty": flt(r.get("qty"))}
	return out


# --- checks ----------------------------------------------------------------
def check_rfq(rfq, doc_company=None):
	if rfq.get("status") != RFQ_OPEN_STATUS:
		frappe.throw(_("Request for Quotation {0} is {1}. Quotations can only be entered against a Sent request.")
			.format(rfq.get("name"), rfq.get("status")))
	if doc_company and rfq.get("company") and doc_company != rfq.get("company"):
		frappe.throw(_("Request for Quotation {0} belongs to another company.").format(rfq.get("name")))


def check_supplier(doc, suppliers):
	if not doc.get("supplier"):
		frappe.throw(_("Select the supplier this quotation is from."))
	if doc.supplier not in suppliers:
		frappe.throw(_("Supplier {0} is not on Request for Quotation {1}.").format(doc.supplier, doc.request_for_quotation))
	doc.supplier_name = suppliers.get(doc.supplier) or doc.supplier


def check_lines(doc, wanted):
	rows = doc.get("items") or []
	if not rows:
		frappe.throw(_("Add the quoted items."))
	seen = set()
	for row in rows:
		key = row.get("mrn_item")
		if not key:
			frappe.throw(_("Row {0}: the RFQ line is missing.").format(row.idx))
		line = wanted.get(key)
		if not line:
			frappe.throw(_("Row {0}: this item is not on Request for Quotation {1}.").format(row.idx, doc.request_for_quotation))
		if key in seen:
			frappe.throw(_("Row {0}: item {1} is listed more than once.").format(row.idx, line["item_code"]))
		seen.add(key)
		if row.get("item_code") and row.item_code != line["item_code"]:
			frappe.throw(_("Row {0}: item {1} does not match the RFQ line ({2}).").format(row.idx, row.item_code, line["item_code"]))
		row.item_code, row.item_name, row.uom, row.qty = line["item_code"], line["item_name"] or line["item_code"], line["uom"], line["qty"]
	missing = [wanted[k]["item_code"] for k in wanted if k not in seen]
	if missing:
		frappe.throw(_("Items missing from the quotation: {0}. Keep every RFQ line and leave the rate blank for items the supplier did not quote.")
			.format(", ".join(missing)))


def check_numbers(doc):
	if doc.get("delivery_days") not in (None, "") and flt(doc.delivery_days) < 0:
		frappe.throw(_("Delivery days can't be negative."))
	for row in doc.get("items") or []:
		if flt(row.get("rate")) < 0:
			frappe.throw(_("Row {0}: rate can't be negative.").format(row.idx))
		disc = flt(row.get("discount_percent"))
		if disc < 0 or disc > 100:
			frappe.throw(_("Row {0}: discount must be between 0 and 100%.").format(row.idx))
	if not any(calc.is_quoted(r.get("rate")) for r in doc.get("items") or []):
		frappe.throw(_("Enter a rate for at least one item."))


def check_dates(doc, rfq):
	if not doc.get("quotation_date"):
		doc.quotation_date = nowdate()
	if rfq.get("posting_date") and getdate(doc.quotation_date) < getdate(rfq.get("posting_date")):
		frappe.throw(_("Quotation date can't be earlier than the RFQ date."))


def item_vat_percent(item_code):
	template = frappe.db.get_value("Item", item_code, "default_purchase_tax_template")
	if not template:
		frappe.throw(_("Item {0} has no purchase tax template. Set one on the Item before entering a quotation.").format(item_code))
	rows = frappe.get_all("Tax Template Detail", filters={"parent": template, "parenttype": "Tax Template"}, fields=["rate"])
	return sum(flt(r.rate) for r in rows)


def apply_vat(doc, lookup=None):
	lookup = lookup or item_vat_percent
	cache = {}
	for row in doc.get("items") or []:
		if row.item_code not in cache:
			cache[row.item_code] = lookup(row.item_code)
		row.vat_percent = cache[row.item_code]


def check_single_active(doc):
	filters = {"request_for_quotation": doc.request_for_quotation, "supplier": doc.supplier, "status": "Active"}
	if not doc.is_new():
		filters["name"] = ["!=", doc.name]
	other = frappe.db.get_value("Supplier Quotation", filters, "name")
	if other:
		frappe.throw(_("{0} already has an Active quotation ({1}) for this request. Revise it instead of entering a new one.")
			.format(doc.supplier, other))


# --- status ----------------------------------------------------------------
def keep_status_server_side(doc, before):
	"""Status changes only through the A8.3 API (flags.sq_workflow)."""
	if doc.flags.get("sq_workflow"):
		return
	doc.status = "Active" if (doc.is_new() or before is None) else before.status


def validate_active(doc):
	if not doc.get("request_for_quotation"):
		frappe.throw(_("Select the Request for Quotation."))
	rfq = load_rfq(doc.request_for_quotation)
	check_rfq(rfq, doc.get("company"))
	doc.company = rfq.get("company")
	doc.project = rfq.get("project") or None
	check_supplier(doc, rfq_suppliers(rfq["name"]))
	check_lines(doc, wanted_lines(rfq_lines(rfq["name"])))
	check_numbers(doc)
	check_dates(doc, rfq)
	apply_vat(doc)
	check_single_active(doc)