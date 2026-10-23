"""A19: undo the old direct receipt on PO-2026-00050 so it can be received again through a Purchase Receipt (GRN + QC).

Dry run by default. Nothing changes until you run it with apply=1.

Dry run:
    bench --site sava execute psd_books.a19_fix_po50.run --kwargs "{'po': 'PO-2026-00050'}"
Apply (take a backup first):
    bench --site sava execute psd_books.a19_fix_po50.run --kwargs "{'po': 'PO-2026-00050', 'apply': 1}"

What it does:
  1. Finds the Stock Entry (Material Receipt) that the old receive created for the PO and cancels it.
  2. Puts each PO line's received_qty back to 0.
  3. Puts the PO back to Confirmed, and gives the ordered qty back to the bins.
It refuses to run if the PO has any submitted Purchase Receipt or any Purchase Invoice, because those need a manual check.
"""
import frappe
from frappe.utils import flt


def run(po="PO-2026-00050", apply=0):
    apply = int(apply or 0)
    po_doc = frappe.get_doc("Purchase Order", po)
    print(f"PO {po}: status={po_doc.status} docstatus={po_doc.docstatus}")

    receipts = frappe.get_all("Purchase Receipt", filters={"purchase_order": po, "docstatus": 1}, pluck="name")
    invoices = frappe.get_all("Purchase Invoice", filters={"docstatus": 1, "purchase_order": po}, pluck="name") \
        if frappe.db.has_column("Purchase Invoice", "purchase_order") else []
    if receipts or invoices:
        print(f"STOP: submitted receipts {receipts} / invoices {invoices}. Check these by hand.")
        return

    entries = frappe.get_all("Stock Entry",
        filters={"reference_doctype": "Purchase Order", "reference_name": po, "docstatus": 1},
        fields=["name", "posting_date"])
    print(f"Stock Entries to cancel: {[e.name for e in entries] or 'none'}")

    lines = [(r.name, r.item_code, flt(r.received_qty)) for r in po_doc.items if flt(r.received_qty) > 0]
    print("PO lines to reset (name, item, received_qty):", lines or "none")

    print(f"Status would change: {po_doc.status} -> Confirmed")

    if not apply:
        print("\nDRY RUN: nothing changed. Re-run with apply=1 after a backup.")
        return

    from psd_books.services.workflow_service import _update_bin_ordered_qty
    wh = po_doc.set_warehouse or ""

    for name in [e.name for e in entries]:
        se = frappe.get_doc("Stock Entry", name)
        se.flags.ignore_permissions = True
        se.cancel()
        print(f"Cancelled Stock Entry {name}")

    for line_name, item_code, qty in lines:
        frappe.db.set_value("Purchase Order Item", line_name, "received_qty", 0, update_modified=False)
        _update_bin_ordered_qty(item_code, wh, qty)
        print(f"Reset {item_code} received_qty to 0; ordered qty +{qty} on {wh}")

    frappe.db.set_value("Purchase Order", po, "status", "Confirmed", update_modified=True)
    frappe.db.commit()
    print("APPLIED. PO is Confirmed and can be received again through a Purchase Receipt.")