# Copyright (c) 2026
"""Short close on the LPO (Purchase Order): a Director closes what the supplier will not deliver.

The closed qty is kept on Purchase Order Item.short_closed_qty. Open qty = qty - short_closed_qty,
so the receipt checks, the PO status and the MRN status all treat it as no longer expected.
The closed qty is also taken off "on order" in the Bin (put back on reopen).
"""
import frappe
from frappe import _
from frappe.utils import flt


def _is_director(user):
	return "Director" in set(frappe.get_roles(user))


def can_short_close(po_name):
	"""True when the current user may short-close this LPO (Director, issued, not cancelled)."""
	if not _is_director(frappe.session.user):
		return False
	docstatus, status = frappe.db.get_value("Purchase Order", po_name, ["docstatus", "status"]) or (0, "")
	return docstatus == 1 and (status or "") != "Cancelled"


def _load(name):
	if not _is_director(frappe.session.user):
		frappe.throw(_("Only a Director can short-close or reopen LPO quantities."), frappe.PermissionError)
	doc = frappe.get_doc("Purchase Order", name)
	if doc.docstatus != 1 or (doc.status or "") == "Cancelled":
		frappe.throw(_("Purchase Order {0} must be issued (and not cancelled) to short-close it.").format(doc.name))
	return doc


def _draft_qty(po_name):
	"""{po_item: qty} already sitting on Draft receipts (GRNs) of this LPO."""
	return {str(r.po_item): flt(r.qty) for r in frappe.db.sql(
		"""SELECT pri.po_item, SUM(pri.qty) AS qty
		   FROM `tabPurchase Receipt Item` pri
		   JOIN `tabPurchase Receipt` pr ON pr.name = pri.parent
		   WHERE COALESCE(NULLIF(pri.purchase_order, ''), pr.purchase_order) = %s AND pr.docstatus = 0
		   GROUP BY pri.po_item""", (po_name,), as_dict=True)}


def _closable(row, drafts):
	return max(0.0, flt(row.qty) - flt(row.received_qty) - flt(row.short_closed_qty) - drafts.get(str(row.name), 0.0))


def _move_on_order(doc, row, qty, direction):
	"""Take (direction=-1) or put back (+1) `qty` of the row on the Bin's on-order qty."""
	from psd_books.inventory.utils import update_bin, get_conversion_factor
	wh = getattr(row, "warehouse", None) or getattr(doc, "set_warehouse", None) or ""
	if not wh or not row.item_code or not frappe.db.get_value("Item", row.item_code, "is_stock_item"):
		return
	factor = flt(get_conversion_factor(row.item_code, getattr(row, "uom", None)) or 1)
	update_bin(item_code=row.item_code, warehouse=wh,
		ordered_qty_delta=direction * flt(qty) * factor, company=doc.company or "")


def _close_row(doc, row, qty, reason):
	frappe.db.set_value("Purchase Order Item", row.name, {
		"short_closed_qty": flt(row.short_closed_qty) + qty,
		"short_close_reason": reason,
		"short_closed_by": frappe.session.user,
	}, update_modified=False)
	_move_on_order(doc, row, qty, -1)


def _refresh(doc):
	"""Recompute the LPO status and the status of the MRNs it covers."""
	from psd_books.api.docs import _po_status_from_fulfillment
	from psd_books.invoicing.doctype.purchase_order.purchase_order import sync_po_material_requests
	status = _po_status_from_fulfillment(doc.name)
	frappe.db.set_value("Purchase Order", doc.name, "status", status, update_modified=True)
	sync_po_material_requests(doc.name)
	return status


def _reason(reason):
	reason = (reason or "").strip()
	if not reason:
		frappe.throw(_("A reason is required to short-close."))
	return reason


@frappe.whitelist(allow_guest=False, methods=["POST"])
def short_close_po_item(name, po_item, reason):
	"""Director only: close the not-yet-received balance of one LPO line."""
	doc = _load(name)
	reason = _reason(reason)
	row = next((r for r in doc.items if str(r.name) == str(po_item)), None)
	if not row:
		frappe.throw(_("Line {0} is not on Purchase Order {1}.").format(po_item, doc.name))
	qty = _closable(row, _draft_qty(doc.name))
	if qty <= 0.0005:
		frappe.throw(_("Nothing left to short-close on {0}: it is received, already closed or on a draft receipt.")
			.format(row.item_name or row.item_code))
	_close_row(doc, row, qty, reason)
	doc.add_comment("Info", _("Short-closed {0} of {1}: {2}").format(qty, row.item_code, reason))
	return {"purchase_order": doc.name, "closed": qty, "status": _refresh(doc)}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def short_close_po_all(name, reason):
	"""Director only: close the not-yet-received balance of every line of the LPO."""
	doc = _load(name)
	reason = _reason(reason)
	drafts = _draft_qty(doc.name)
	closed = []
	for row in doc.items:
		qty = _closable(row, drafts)
		if qty <= 0.0005:
			continue
		_close_row(doc, row, qty, reason)
		closed.append({"item_code": row.item_code, "closed": qty})
	if not closed:
		frappe.throw(_("No line has a balance left to short-close."))
	doc.add_comment("Info", _("Short-closed all balances ({0}): {1}").format(
		", ".join("{0} {1}".format(c["item_code"], c["closed"]) for c in closed), reason))
	return {"purchase_order": doc.name, "closed": closed, "status": _refresh(doc)}


def _reopen_row(doc, row):
	back = flt(row.short_closed_qty)
	frappe.db.set_value("Purchase Order Item", row.name, {
		"short_closed_qty": 0, "short_close_reason": "", "short_closed_by": ""}, update_modified=False)
	_move_on_order(doc, row, back, +1)
	return back


@frappe.whitelist(allow_guest=False, methods=["POST"])
def reopen_po_item(name, po_item):
	"""Director only: undo the short close of one LPO line."""
	doc = _load(name)
	row = next((r for r in doc.items if str(r.name) == str(po_item)), None)
	if not row or flt(row.short_closed_qty) <= 0:
		frappe.throw(_("Nothing is short-closed on this line."))
	back = _reopen_row(doc, row)
	doc.add_comment("Info", _("Reopened {0} of {1}").format(back, row.item_code))
	return {"purchase_order": doc.name, "reopened": back, "status": _refresh(doc)}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def reopen_po_all(name):
	"""Director only: undo every short close on the LPO."""
	doc = _load(name)
	back = [(r.item_code, _reopen_row(doc, r)) for r in doc.items if flt(r.short_closed_qty) > 0]
	if not back:
		frappe.throw(_("Nothing is short-closed on this Purchase Order."))
	doc.add_comment("Info", _("Reopened all closed balances ({0})").format(
		", ".join("{0} {1}".format(c, q) for c, q in back)))
	return {"purchase_order": doc.name, "reopened": [{"item_code": c, "reopened": q} for c, q in back],
		"status": _refresh(doc)}