# Copyright (c) 2026
import frappe
from frappe.utils import flt
from frappe.model.document import Document
from psd_books.db.validators import validate_fiscal_year


def sync_material_request_status(material_request):
    """Set a Material Request's status from its submitted Purchase Orders.

    - no submitted PO            -> "Submitted"
    - a submitted PO, goods still to come -> "Ordered"
    - every submitted PO fully received   -> "Received"
    Only touches an MRN that is itself submitted, and only these three statuses,
    so Cancelled / Issued / Approved (no PO yet) etc. are never overwritten here.
    """
    if not material_request:
        return
    mr = frappe.db.get_value("Material Request", material_request, ["docstatus", "status"], as_dict=True)
    if not mr or mr.docstatus != 1:
        return  # only touch status while the MR itself is a submitted doc
    pos = frappe.get_all("Purchase Order",
                         filters={"material_request": material_request, "docstatus": 1}, pluck="name")
    if not pos:
        new_status = "Submitted"
    else:
        new_status = "Received"
        for po in pos:
            rows = frappe.get_all("Purchase Order Item", filters={"parent": po},
                                  fields=["qty", "received_qty"])
            total = sum(flt(r.qty) for r in rows)
            received = sum(flt(r.received_qty) for r in rows)
            if total <= 0 or received < total - 0.001:
                new_status = "Ordered"
                break
    if mr.status != new_status:
        frappe.db.set_value("Material Request", material_request, "status", new_status)


def backfill_received_material_requests():
    """One-off: re-run the sync for every MRN that already has a PO (bench execute)."""
    names = frappe.get_all("Purchase Order", filters={"docstatus": 1, "material_request": ["!=", ""]},
                           pluck="material_request", distinct=True)
    for n in names:
        sync_material_request_status(n)
    frappe.db.commit()
    return len(names)


class PurchaseOrder(Document):

    def validate(self):
        # Entry Date: the day the record was entered. Filled automatically when blank, so documents
        # created by other steps (GRN, stock entries, orders from a comparison) never fail on it.
        if self.is_new() and not self.get("entry_date"):
            self.entry_date = frappe.utils.nowdate()
        # Mirror SalesOrder: stamp fiscal_year so downstream GL and reports
        # can group by year without an extra query.
        if self.transaction_date and self.company:
            try:
                self.fiscal_year = validate_fiscal_year(self.transaction_date, self.company)
            except frappe.ValidationError:
                raise   # period lock / no-open-FY — must not be swallowed
            except Exception:
                self.fiscal_year = ""   # only suppress unexpected errors (e.g. table missing on install)
        self._calculate_totals()
        # A10.1: Pending Approval / Sent Back belong to the approval flow; a PO pending approval is locked.
        from psd_books.invoicing.po_approval_rules import validate_status
        validate_status(self)

    def _calculate_totals(self):
        for item in (self.items or []):
            item.amount = round(flt(item.qty) * flt(item.rate), 2)
        net = sum(flt(i.amount) for i in (self.items or []))
        for tax in (self.taxes or []):
            if flt(tax.rate) and not flt(tax.tax_amount):
                tax.tax_amount = round(net * flt(tax.rate) / 100, 2)
        tax_total = sum(flt(t.tax_amount) for t in (self.taxes or []))
        self.net_total   = round(net, 2)
        self.total_tax   = round(tax_total, 2)
        self.grand_total = round(net + tax_total, 2)

    def before_submit(self):
        # A10.2: a PO is only submitted once every approval level has approved it (the last approval
        # submits it). Covers the Submit button, Issue PO, save_doc and the REST API; no admin bypass.
        from psd_books.invoicing.po_approval_rules import check_ready_to_submit
        check_ready_to_submit(self)

    def on_submit(self):
        self._update_ordered_qty(direction=+1)
        self._sync_material_request_status()

    def on_cancel(self):
        self._update_ordered_qty(direction=-1)
        self._sync_material_request_status()

    def _sync_material_request_status(self):
        """Keep the source Material Request's status in step with its submitted
        Purchase Orders (Submitted -> Ordered -> Received)."""
        sync_material_request_status(self.material_request)

    def _update_ordered_qty(self, direction: int):
        """Increase (submit) or decrease (cancel) ordered_qty in Bin for each PO line.

        On submit  → add the full line qty to ordered_qty.
        On cancel  → remove only what is still on-order, i.e. qty that has NOT yet
                     been billed.  Billed qty was already released by
                     PurchaseInvoice._release_ordered_qty when the PI was submitted,
                     so restoring the full row.qty would over-deflate ordered_qty.
        """
        from psd_books.inventory.utils import update_bin
        warehouse = getattr(self, "set_warehouse", None) or ""
        for row in (self.items or []):
            wh = getattr(row, "warehouse", None) or warehouse
            if not wh or not row.item_code:
                continue
            is_stock = frappe.db.get_value("Item", row.item_code, "is_stock_item")
            if not is_stock:
                continue
            # Bin.ordered_qty is tracked in stock UOM (same as actual_qty/
            # reserved_qty on the same Bin) — use qty_in_stock_uom, not the
            # raw purchase-UOM qty, or a "10 Box" line (stock_uom Kg,
            # conversion_factor 10) would only add 10 instead of 100 and
            # silently desync projected_qty from reality.
            from psd_books.inventory.utils import get_conversion_factor
            factor = flt(get_conversion_factor(row.item_code, getattr(row, "uom", None)) or 1)
            row_qty = flt(row.qty) * factor
            if direction == -1:
                # Cancel: only remove qty still on-order (not yet billed).
                billed = flt(getattr(row, "billed_qty", 0)) * factor
                still_ordered = max(0.0, row_qty - billed)
                if still_ordered <= 0:
                    continue
                delta = -still_ordered
            else:
                delta = row_qty
            update_bin(
                item_code=row.item_code,
                warehouse=wh,
                ordered_qty_delta=delta,
                company=self.company or "",
            )