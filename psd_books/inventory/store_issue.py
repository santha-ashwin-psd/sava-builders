"""Issue from store (Sava A6.1).

A Delivery Note linked to an approved MRN moves stock from a store to the site
warehouse (a Material Transfer, see stock_link.on_delivery_note_submit) instead of
sending it to a customer. This module holds the checks and the MRN bookkeeping.

- validate_store_issue(doc, lock=False): checks on every save (lock=True on submit)
- update_issued_qty(doc, direction): +1 on submit, -1 on cancel; then refreshes the
  MRN status (Approved -> Partly Issued -> Issued, reversed on cancel; A6.3)
- Delivery Notes without an MRN are not touched by anything here.
"""
import frappe
from frappe import _
from frappe.utils import flt

ISSUABLE_STATUSES = ("Approved", "Partly Issued")
PROGRESS_STATUSES = ("Approved", "Partly Issued", "Issued")  # the only statuses issuing may change
REQUIRED = (
	("from_warehouse", "Source Warehouse"),
	("to_warehouse", "Destination Warehouse"),
	("driver_name", "Driver Name"),
	("driver_id", "Driver I.D."),
	("truck_no", "Truck No."),
)
EPS = 0.0001


def is_store_issue(doc):
	return bool(doc.get("material_request"))


def validate_store_issue(doc, lock=False):
	if not is_store_issue(doc):
		return
	mrn = _load_mrn(doc)
	if mrn.get("project"):
		doc.project = mrn.project
	if not doc.get("to_warehouse") and mrn.get("delivery_warehouse"):
		doc.to_warehouse = mrn.delivery_warehouse
	_check_header(doc, mrn)
	needed = _check_rows(doc, mrn)
	_check_pending(needed, lock)
	_check_stock(doc)


def _load_mrn(doc):
	mrn = frappe.db.get_value(
		"Material Request", doc.material_request,
		["name", "docstatus", "status", "company", "project", "delivery_warehouse"], as_dict=True)
	if not mrn:
		frappe.throw(_("Material Request {0} not found").format(doc.material_request))
	if mrn.docstatus != 1 or mrn.status not in ISSUABLE_STATUSES:
		frappe.throw(_("Material Request {0} is not open for issue (status: {1}). Only Approved or Partly Issued "
			"requests can be issued against.").format(mrn.name, mrn.status))
	return mrn


def _check_header(doc, mrn):
	if mrn.get("company") and doc.get("company") and mrn.company != doc.company:
		frappe.throw(_("Material Request {0} belongs to another company.").format(mrn.name))
	missing = [label for field, label in REQUIRED if not doc.get(field)]
	if missing:
		frappe.throw(_("Please fill in: {0}").format(", ".join(missing)), title=_("Store issue incomplete"))
	if doc.from_warehouse == doc.to_warehouse:
		frappe.throw(_("Source and destination warehouse must be different."))


def _check_rows(doc, mrn):
	"""Match every row to an MRN line. Returns {mrn_item: [qty, item_code, required_qty]}."""
	lines = {r.name: r for r in frappe.get_all(
		"Material Request Item", filters={"parent": mrn.name, "parenttype": "Material Request"},
		fields=["name", "item_code", "required_qty", "uom", "intended_use"])}
	needed = {}
	for row in doc.items:
		line = lines.get(row.get("mrn_item"))
		if not row.get("mrn_item"):
			frappe.throw(_("Row {0}: select the MRN line this item is issued against.").format(row.idx))
		if not line:
			frappe.throw(_("Row {0}: line {1} is not on Material Request {2}.")
				.format(row.idx, row.mrn_item, mrn.name))
		if line.item_code != row.item_code:
			frappe.throw(_("Row {0}: item {1} does not match the MRN line ({2}).")
				.format(row.idx, row.item_code, line.item_code))
		row.warehouse = doc.from_warehouse
		if line.get("uom"):
			row.uom = line.uom
		if not (row.get("intended_use") or "").strip():
			row.intended_use = line.get("intended_use")
		entry = needed.setdefault(row.mrn_item, [0.0, row.item_code, flt(line.required_qty)])
		entry[0] += flt(row.qty)
	return needed


def _check_pending(needed, lock):
	for mrn_item, (qty, item_code, required) in needed.items():
		issued = flt(frappe.db.get_value("Material Request Item", mrn_item, "issued_qty", for_update=lock))
		pending = required - issued
		if qty > pending + EPS:
			frappe.throw(_("Item {0}: issuing {1} is more than the pending MRN quantity {2} "
				"(required {3}, already issued {4}).").format(item_code, qty, max(pending, 0), required, issued))


def _check_stock(doc):
	from psd_books.inventory.doctype.stock_entry.stock_entry import _allow_negative_stock
	from psd_books.inventory.utils import get_conversion_factor, get_stock_balance
	if _allow_negative_stock():
		return
	per_item = {}
	for row in doc.items:
		if not frappe.db.get_value("Item", row.item_code, "is_stock_item"):
			continue
		factor = flt(get_conversion_factor(row.item_code, row.get("uom")) or 1)
		per_item[row.item_code] = per_item.get(row.item_code, 0.0) + flt(row.qty) * factor
	for item_code, qty in per_item.items():
		available = flt(get_stock_balance(item_code, doc.from_warehouse))
		if qty > available + EPS:
			frappe.throw(_("Insufficient stock for item {0} in {1}. Available: {2}, needed: {3}.")
				.format(item_code, doc.from_warehouse, available, qty))


def update_issued_qty(doc, direction):
	"""Add (direction=+1, submit) or take back (-1, cancel) each row's qty on its MRN line."""
	if not is_store_issue(doc):
		return
	touched = False
	for row in doc.items:
		if not row.get("mrn_item"):
			continue
		cur = flt(frappe.db.get_value("Material Request Item", row.mrn_item, "issued_qty"))
		frappe.db.set_value("Material Request Item", row.mrn_item, "issued_qty",
			max(0.0, cur + direction * flt(row.qty)), update_modified=False)
		touched = True
	if touched:
		refresh_mrn_status(doc.material_request)


def status_from_lines(lines):
	"""Issue status for [{required_qty, issued_qty}] lines: Approved, Partly Issued or Issued."""
	if lines and all(flt(l.get("issued_qty")) + EPS >= flt(l.get("required_qty")) for l in lines):
		return "Issued"
	if any(flt(l.get("issued_qty")) > EPS for l in lines):
		return "Partly Issued"
	return "Approved"


def refresh_mrn_status(mrn_name):
	"""Set the MRN status from its issued quantities. Any status outside PROGRESS_STATUSES
	(Ordered, Cancelled, ...) is left exactly as it is."""
	row = frappe.db.get_value("Material Request", mrn_name, ["status"], as_dict=True)
	if not row or row.status not in PROGRESS_STATUSES:
		return
	lines = frappe.get_all(
		"Material Request Item", filters={"parent": mrn_name, "parenttype": "Material Request"},
		fields=["required_qty", "issued_qty"])
	new = status_from_lines(lines)
	if new != row.status:
		frappe.db.set_value("Material Request", mrn_name, "status", new, update_modified=False)