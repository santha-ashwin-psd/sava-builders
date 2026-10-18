"""Receipt confirmation for stock transfers and store issues (Sava A12).

The receiving site confirms a submitted Delivery Note that moved stock between
warehouses (a stock transfer, or an MRN issue) with the receiver's name, I.D. and the
time. Stock already moved when the note was submitted; this records who received it.

Endpoints
- confirm_receipt(name, received_by_name, received_by_id, received_on=None)
- clear_receipt_confirmation(name): undo a confirmation (needed before cancelling the note)
"""
import frappe
from frappe import _
from frappe.utils import get_datetime, now_datetime, add_to_date

from psd_books.inventory.store_issue import is_warehouse_move
from psd_books.utils.access import require_module

FUTURE_SLACK_MINUTES = 5


def check_confirmation(doc, received_by_name, received_by_id, received_on, now):
    """Validate a confirmation and return (name, id, datetime). Raises with a clear message."""
    if doc.docstatus != 1:
        frappe.throw(_("Only a submitted Delivery Note can be confirmed as received."))
    if not is_warehouse_move(doc):
        frappe.throw(_("Receipt confirmation is only for stock transfers and store issues, not customer deliveries."))
    if doc.get("received_on"):
        frappe.throw(_("Receipt was already confirmed on {0}.").format(doc.received_on))
    name = (received_by_name or "").strip()
    rid = (received_by_id or "").strip()
    if not name or not rid:
        frappe.throw(_("The receiver's name and I.D. are both required."))
    when = get_datetime(received_on) if received_on else now
    if when > add_to_date(now, minutes=FUTURE_SLACK_MINUTES):
        frappe.throw(_("Received time cannot be in the future."))
    if doc.get("posting_date") and when.date() < get_datetime(doc.posting_date).date():
        frappe.throw(_("Received time cannot be before the dispatch date {0}.").format(doc.posting_date))
    return name, rid, when


@frappe.whitelist(allow_guest=False, methods=["POST"])
def confirm_receipt(name, received_by_name=None, received_by_id=None, received_on=None):
    require_module("invoices", write=True)
    doc = frappe.get_doc("Delivery Note", name)
    rname, rid, when = check_confirmation(doc, received_by_name, received_by_id, received_on, now_datetime())
    doc.db_set({
        "received_by_name": rname,
        "received_by_id": rid,
        "received_on": when,
        "status": "Received",
    }, update_modified=True)
    return {"name": doc.name, "status": "Received", "received_by_name": rname,
            "received_by_id": rid, "received_on": str(when)}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def clear_receipt_confirmation(name):
    require_module("invoices", write=True)
    doc = frappe.get_doc("Delivery Note", name)
    if doc.docstatus != 1 or not doc.get("received_on"):
        frappe.throw(_("This Delivery Note has no receipt confirmation to clear."))
    doc.db_set({"received_by_name": None, "received_by_id": None, "received_on": None,
                "status": "Submitted"}, update_modified=True)
    return {"name": doc.name, "status": "Submitted"}