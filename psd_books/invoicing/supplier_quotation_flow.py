"""Supplier Quotation workflow (Sava A8.3): prefill, enter, revise, cancel.

- get_prefill(rfq, supplier): every RFQ line with qty, UOM and VAT %, blank rates; carries the
  Active quotation's values when there is one so the screen can start a revision from them
- enter_quotation(data): creates the Active quotation and records it on the RFQ supplier row
- revise_quotation(name, data): old one -> Superseded, new one -> Active (revision_no + 1,
  supersedes = old), all in one request, so a failed new quotation leaves the old one Active
- cancel_quotation(name): Active -> Cancelled and clears the RFQ supplier row
Only the fields in FIELDS / ROW_FIELDS are taken from the client; the rules do the rest.
"""
import json

import frappe
from frappe import _
from frappe.utils import nowdate

from psd_books.invoicing import supplier_quotation_rules as rules

FIELDS = ("entry_date", "quotation_date", "delivery_days", "payment_terms", "remarks")
ROW_FIELDS = ("mrn_item", "rate", "discount_percent")
NUMERIC_ROW_FIELDS = ("rate", "discount_percent")


def _assert_can(doctype, action):
	from psd_books.utils.access import assert_can
	assert_can(doctype, action)


def _assert_company(company):
	from psd_books.utils.access import assert_company
	assert_company(company)


# --- input -----------------------------------------------------------------
def load_data(data):
	if isinstance(data, str):
		data = json.loads(data or "{}")
	if not isinstance(data, dict):
		frappe.throw(_("Invalid quotation data."))
	return data


def clean_payload(data):
	d = load_data(data)
	out = {k: d.get(k) for k in FIELDS if d.get(k) not in (None, "")}
	rows = []
	for r in d.get("items") or []:
		row = {k: r.get(k) for k in ROW_FIELDS if k in r}
		for k in NUMERIC_ROW_FIELDS:
			if row.get(k) == "":
				row[k] = None
		rows.append(row)
	out["items"] = rows
	return out


def _new_doc(data, **fixed):
	values = clean_payload(data)
	values.update(fixed)
	values["doctype"] = "Supplier Quotation"
	return frappe.get_doc(values)


# --- RFQ supplier row ------------------------------------------------------
def _rfq_row(doc):
	return frappe.db.get_value(
		"Request for Quotation Supplier",
		{"parent": doc.request_for_quotation, "parenttype": "Request for Quotation", "supplier": doc.supplier},
		["name", "quotation"], as_dict=True)


def _link_rfq_row(doc):
	row = _rfq_row(doc)
	if row:
		frappe.db.set_value("Request for Quotation Supplier", row.name,
			{"quotation": doc.name, "quoted_on": doc.quotation_date}, update_modified=False)


def _clear_rfq_row(doc):
	row = _rfq_row(doc)
	if row and row.get("quotation") == doc.name:
		frappe.db.set_value("Request for Quotation Supplier", row.name,
			{"quotation": None, "quoted_on": None}, update_modified=False)


def _summary(doc):
	return {"name": doc.name, "status": doc.status, "revision_no": doc.revision_no,
		"net_total": doc.net_total, "total_tax": doc.total_tax, "grand_total": doc.grand_total}


# --- prefill ---------------------------------------------------------------
def get_prefill(rfq_name, supplier):
	_assert_can("Supplier Quotation", "read")
	if not rfq_name:
		frappe.throw(_("Select the Request for Quotation."))
	rfq = rules.load_rfq(rfq_name)
	_assert_company(rfq.get("company"))
	rules.check_rfq(rfq)
	suppliers = rules.rfq_suppliers(rfq_name)
	if supplier not in suppliers:
		frappe.throw(_("Supplier {0} is not on Request for Quotation {1}.").format(supplier, rfq_name))
	wanted = rules.wanted_lines(rules.rfq_lines(rfq_name))
	active = frappe.db.get_value(
		"Supplier Quotation", {"request_for_quotation": rfq_name, "supplier": supplier, "status": "Active"},
		["name", "quotation_date", "delivery_days", "payment_terms", "remarks", "revision_no"], as_dict=True)
	prev = {}
	if active:
		prev = {r.mrn_item: r for r in frappe.get_all(
			"Supplier Quotation Item", filters={"parent": active.name, "parenttype": "Supplier Quotation"},
			fields=["mrn_item", "rate", "discount_percent"])}
	vat = {}
	items = []
	for mrn_item, line in wanted.items():
		if line["item_code"] not in vat:
			vat[line["item_code"]] = rules.item_vat_percent(line["item_code"])
		old = prev.get(mrn_item)
		items.append({"mrn_item": mrn_item, "item_code": line["item_code"], "item_name": line["item_name"],
			"uom": line["uom"], "qty": line["qty"], "vat_percent": vat[line["item_code"]],
			"rate": old.rate if old else None, "discount_percent": old.discount_percent if old else 0})
	return {
		"request_for_quotation": rfq_name, "supplier": supplier, "supplier_name": suppliers.get(supplier) or supplier,
		"company": rfq.get("company"), "project": rfq.get("project") or "",
		"quotation_date": (active.quotation_date if active else None) or nowdate(),
		"delivery_days": active.delivery_days if active else None,
		"payment_terms": active.payment_terms if active else None,
		"remarks": active.remarks if active else "",
		"active_quotation": active.name if active else None,
		"revision_no": active.revision_no if active else 0,
		"items": items,
	}


# --- enter / revise / cancel -----------------------------------------------
def enter_quotation(data):
	raw = load_data(data)
	_assert_can("Supplier Quotation", "create")
	if not raw.get("request_for_quotation"):
		frappe.throw(_("Select the Request for Quotation."))
	rfq = rules.load_rfq(raw["request_for_quotation"])
	_assert_company(rfq.get("company"))
	doc = _new_doc(raw, request_for_quotation=raw["request_for_quotation"], supplier=raw.get("supplier"), revision_no=1,
		company=rfq.get("company"))
	doc.insert()
	_link_rfq_row(doc)
	return _summary(doc)


def revise_quotation(name, data):
	_assert_can("Supplier Quotation", "create")
	old = frappe.get_doc("Supplier Quotation", name)
	_assert_company(old.company)
	old.check_permission("write")
	if old.status != "Active":
		frappe.throw(_("Only an Active quotation can be revised ({0} is {1}).").format(old.name, old.status))
	new = _new_doc(data, request_for_quotation=old.request_for_quotation, supplier=old.supplier,
		revision_no=int(old.revision_no or 1) + 1, supersedes=old.name, company=old.company)
	old.flags.sq_workflow = True
	old.status = "Superseded"
	old.save()
	new.insert()  # one Active per supplier: the old one is already Superseded in this transaction
	_link_rfq_row(new)
	return _summary(new)


def cancel_quotation(name):
	_assert_can("Supplier Quotation", "write")
	doc = frappe.get_doc("Supplier Quotation", name)
	_assert_company(doc.company)
	doc.check_permission("write")
	if doc.status != "Active":
		frappe.throw(_("Only an Active quotation can be cancelled ({0} is {1}).").format(doc.name, doc.status))
	doc.flags.sq_workflow = True
	doc.status = "Cancelled"
	doc.save()
	_clear_rfq_row(doc)
	return {"name": doc.name, "status": doc.status}