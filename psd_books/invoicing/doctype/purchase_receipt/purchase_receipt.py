# Copyright (c) 2026
import frappe
from frappe import _
from frappe.utils import flt
from frappe.model.document import Document
from psd_books.db.validators import validate_fiscal_year, set_posting_time


class PurchaseReceipt(Document):

    def validate(self):
        # Entry Date: the day the record was entered. Filled automatically when blank, so documents
        # created by other steps (GRN, stock entries, orders from a comparison) never fail on it.
        if self.is_new() and not self.get("entry_date"):
            self.entry_date = frappe.utils.nowdate()
        set_posting_time(self)
        # Purchase Receipt is not wired to central_validator, so fiscal year
        # validation must run here.  Block saves into closed or missing periods
        # before any inventory or fulfilment logic runs.
        if self.posting_date and self.company:
            validate_fiscal_year(self.posting_date, self.company)

        if not self.items:
            frappe.throw(_("Purchase Receipt must have at least one item row."))
        for row in self.items:
            if flt(row.qty) <= 0:
                frappe.throw(_("Row {0}: qty must be > 0").format(row.idx))
            # accepted_qty defaults to the full received qty (nothing rejected)
            # when not explicitly set — keeps older callers / API integrations
            # that never set accepted_qty behaving exactly as before this field
            # existed. rejected_qty is always derived, never trusted from the
            # client, so it can't drift out of sync with accepted_qty.
            if row.accepted_qty in (None, ""):
                row.accepted_qty = flt(row.qty)
            row.accepted_qty = flt(row.accepted_qty)
            if row.accepted_qty < 0 or row.accepted_qty > flt(row.qty):
                frappe.throw(
                    _("Row {0}: Accepted Qty ({1}) must be between 0 and the Received Qty ({2}).")
                    .format(row.idx, row.accepted_qty, row.qty)
                )
            row.rejected_qty = flt(row.qty) - row.accepted_qty
            # amount is derived, never left to the client: stock valuation divides amount by qty
            # (inventory/stock_link.py), so an empty amount would value the receipt at zero.
            row.amount = flt(row.qty) * flt(row.rate)
        self._lock_qc_inspected_rows()
        self.total_qty = sum(flt(r.qty) for r in self.items)
        self._block_over_receipt()
        self._warn_project_store()

    def _lock_qc_inspected_rows(self):
        """Once a QC Inspection for a line is submitted, its accepted/rejected
        split is final: the GRN may no longer change that line's Received or
        Accepted Qty. (The QC itself writes the split onto the row directly;
        to change it, cancel the QC Inspection first.)"""
        if self.is_new():
            return
        for qci in frappe.get_all(
            "QC Inspection",
            filters={"reference_type": "Purchase Receipt", "reference_name": self.name, "docstatus": 1},
            fields=["name", "item", "batch_no", "inspected_qty", "accepted_qty"],
        ):
            if not flt(qci.inspected_qty):
                continue
            row = next((r for r in self.items if r.get("quality_inspection") == qci.name), None) or next(
                (r for r in self.items if r.item_code == qci.item
                 and (not qci.batch_no or (r.get("batch_no") or "") == qci.batch_no)), None)
            if not row:
                continue
            stored_qty = frappe.db.get_value(
                "Purchase Receipt Item", {"parent": self.name, "item_code": qci.item}, "qty")
            if flt(row.accepted_qty) != flt(qci.accepted_qty) or (
                    stored_qty is not None and flt(row.qty) != flt(stored_qty)):
                frappe.throw(
                    _("Row {0}: {1} is already inspected in submitted QC Inspection {2} (Accepted {3}). "
                      "Qty and Accepted Qty can't be changed — cancel the QC Inspection first.")
                    .format(row.idx, row.item_code, qci.name, flt(qci.accepted_qty)))

    def _warn_project_store(self):
        """A11: a receipt should go to the store of the LPO's project. Warns only, never blocks.

        The project is the receipt's own, else the LPO's. Warehouses with no project (company stores, plain
        warehouses) never warn."""
        project = self.get("project")
        if not project and self.get("purchase_order"):
            project = frappe.db.get_value("Purchase Order", self.purchase_order, "project")
        if not project or not frappe.db.has_column("Warehouse", "project"):
            return
        codes = {r.get("warehouse") or self.get("set_warehouse") for r in self.items} - {None, ""}
        by_wh = {w: frappe.get_all("Warehouse Project",
                 filters={"parent": w, "parenttype": "Warehouse", "parentfield": "projects"},
                 pluck="project") for w in codes}
        for msg in project_store_warnings(project, by_wh):
            frappe.msgprint(msg, indicator="orange", title=_("Project store"))

    def _block_over_receipt(self):
        """A11: a receipt may not take in more than the LPO still has pending.

        Pending = PO line qty - received_qty (submitted receipts only, so a
        draft being edited never counts against itself). Rows that carry
        po_item are checked against that line; rows without it are pooled by
        item_code against the PO's remaining qty for that item.
        """
        if not self.purchase_order:
            return
        po_rows = frappe.db.sql("""
            SELECT name, item_code, item_name, qty, received_qty
            FROM `tabPurchase Order Item` WHERE parent=%s ORDER BY idx
        """, (self.purchase_order,), as_dict=True)
        errors = over_receipt_errors(po_rows, self.items)
        if errors:
            frappe.throw(
                _("Over-receipt blocked against {0}:").format(self.purchase_order)
                + "<br>" + "<br>".join(errors),
                title=_("Over-receipt"),
            )

    def on_submit(self):
        self._adjust_po_received(direction=+1)
        self._release_ordered_qty(direction=-1)    # goods arrived → release "on order"
        self.db_set("status", "Submitted", update_modified=False)

    def on_cancel(self):
        self._guard_not_billed()
        self._adjust_po_received(direction=-1)
        self._release_ordered_qty(direction=+1)    # receipt reversed → restore "on order"
        self.db_set("status", "Cancelled", update_modified=False)

    def _guard_not_billed(self):
        """
        Block cancelling once the linked Purchase Order has been billed.

        Cancelling this receipt reverses its Material Receipt Stock Entry —
        crediting Inventory and debiting GR/IR back. But if a Purchase
        Invoice already submitted against the same PO, it already cleared
        that GR/IR (DR GRIR / CR Accounts Payable). Reversing the receipt
        underneath an already-cleared GR/IR would leave GR/IR permanently
        unbalanced with no automatic way to fix it.

        This check is at the Purchase Order level (not per-item/per-qty —
        this app links PR/PI to a PO as a whole, not line-by-line), so it is
        intentionally conservative: it blocks cancelling ANY receipt on a PO
        that has ANY submitted invoice against it, even if that invoice
        billed different items than this specific receipt. Cancel/amend the
        Purchase Invoice(s) first, then this receipt.
        """
        if not self.purchase_order:
            return
        billed = frappe.get_all(
            "Purchase Invoice",
            filters={"purchase_order": self.purchase_order, "docstatus": 1},
            fields=["name"],
        )
        if billed:
            names = ", ".join(b.name for b in billed)
            frappe.throw(_(
                "Cannot cancel {0} — Purchase Order {1} already has a submitted "
                "Purchase Invoice ({2}) that cleared Stock Received But Not "
                "Billed (GR/IR) against it. Cancel/amend the Purchase Invoice "
                "first, then cancel this receipt."
            ).format(self.name, self.purchase_order, names))

    def _release_ordered_qty(self, direction: int):
        """
        Release (direction=-1) or restore (direction=+1) ordered_qty in Bin
        when goods are received via this Purchase Receipt.

        actual_qty is managed separately by stock_link.py → Stock Entry.
        This method only touches ordered_qty and recalculates projected_qty.
        """
        from psd_books.inventory.utils import update_bin
        warehouse = getattr(self, "set_warehouse", None) or ""

        for row in self.items:
            wh = getattr(row, "warehouse", None) or warehouse
            if not wh or not row.item_code:
                continue
            is_stock = frappe.db.get_value("Item", row.item_code, "is_stock_item")
            if not is_stock:
                continue
            # Bin.ordered_qty lives in stock UOM (see PurchaseOrder /
            # PurchaseInvoice) — release the stock-uom equivalent, not the
            # raw purchase-UOM qty, so a "10 Box" line (stock_uom Kg,
            # conversion_factor 10) releases 100, matching what the PO added.
            from psd_books.inventory.utils import get_conversion_factor
            factor = flt(get_conversion_factor(row.item_code, getattr(row, "uom", None)) or 1)
            row_qty = flt(row.qty) * factor
            update_bin(
                item_code=row.item_code,
                warehouse=wh,
                ordered_qty_delta=direction * row_qty,
                company=self.company or "",
            )

    def _adjust_po_received(self, direction: int):
        """Bump (direction=+1) or decrement (-1) received_qty on linked PO rows.

        Mirrors DeliveryNote._adjust_so_delivered: if a row carries an explicit
        po_item link, update that line directly; otherwise fall back to
        matching by item_code against the PO's remaining quantity so receipts
        still work even when the caller didn't set po_item.
        """
        if not self.purchase_order:
            return

        po_items = frappe.db.sql("""
            SELECT name, item_code, qty, received_qty
            FROM `tabPurchase Order Item` WHERE parent=%s ORDER BY idx
        """, (self.purchase_order,), as_dict=True)
        by_code = {}
        for r in po_items:
            by_code.setdefault(r.item_code, []).append(r)

        def _bump(po_item_id, qty):
            cur = flt(frappe.db.get_value("Purchase Order Item", po_item_id, "received_qty"))
            new_qty = max(0.0, cur + direction * flt(qty))
            frappe.db.set_value("Purchase Order Item", po_item_id, "received_qty",
                                new_qty, update_modified=False)

        for row in self.items:
            if row.po_item:
                _bump(row.po_item, row.qty)
                continue
            pool = by_code.get(row.item_code) or []
            remaining = flt(row.qty)
            for po_row in pool:
                if remaining <= 0:
                    break
                available = max(0.0, flt(po_row.qty) - flt(po_row.received_qty))
                if available <= 0 and direction > 0:
                    continue
                take = min(available, remaining) if direction > 0 else min(flt(po_row.received_qty), remaining)
                if take <= 0:
                    continue
                _bump(po_row.name, take)
                po_row.received_qty = flt(po_row.received_qty) + direction * take
                remaining -= take
        try:
            from psd_books.api.docs import _po_status_from_fulfillment
            new_status = _po_status_from_fulfillment(self.purchase_order)
            frappe.db.set_value("Purchase Order", self.purchase_order, "status",
                                new_status, update_modified=True)
        except Exception:
            pass
        try:
            from psd_books.invoicing.doctype.purchase_order.purchase_order import sync_material_request_status
            sync_material_request_status(frappe.db.get_value("Purchase Order", self.purchase_order, "material_request"))
        except Exception:
            frappe.log_error(frappe.get_traceback(), "MRN status sync failed after receipt")


def over_receipt_errors(po_rows, receipt_rows):
    """Pure check (no DB): list of error strings, empty when the receipt fits.

    po_rows: dicts/objects with name, item_code, item_name, qty, received_qty.
    receipt_rows: objects with idx, item_code, qty, po_item.
    """
    eps = 0.0001
    g = lambda o, k: o.get(k) if isinstance(o, dict) else getattr(o, k, None)
    pending = {g(r, "name"): flt(g(r, "qty")) - flt(g(r, "received_qty")) for r in po_rows}
    by_code = {}
    for r in po_rows:
        by_code.setdefault(g(r, "item_code"), []).append(g(r, "name"))
    label = {g(r, "name"): (g(r, "item_name") or g(r, "item_code")) for r in po_rows}

    linked = {}      # po row -> qty on this receipt
    pooled = {}      # item_code -> qty on this receipt (rows with no po_item)
    for row in receipt_rows:
        po_item = g(row, "po_item")
        if po_item and po_item in pending:
            linked[po_item] = linked.get(po_item, 0.0) + flt(g(row, "qty"))
        else:
            code = g(row, "item_code")
            pooled[code] = pooled.get(code, 0.0) + flt(g(row, "qty"))

    errors = []
    for name, qty in linked.items():
        if qty > max(pending[name], 0.0) + eps:
            errors.append(_("{0}: receiving {1}, only {2} pending on the LPO.")
                          .format(label[name], flt(qty), max(flt(pending[name]), 0.0)))
    for code, qty in pooled.items():
        names = by_code.get(code)
        if not names:
            errors.append(_("{0}: not on this LPO.").format(code))
            continue
        # what is still free on the item's PO lines after the linked rows above
        free = sum(max(pending[n] - linked.get(n, 0.0), 0.0) for n in names)
        if qty > free + eps:
            errors.append(_("{0}: receiving {1}, only {2} pending on the LPO.")
                          .format(label[names[0]], flt(qty), flt(free)))
    return errors


def project_store_warnings(project, warehouse_projects):
    """Pure check (no DB): warning strings for warehouses that belong to a different project.

    warehouse_projects: {warehouse name: list of projects it serves (empty = none)}.
    """
    out = []
    for wh, wp in sorted(warehouse_projects.items()):
        wps = list(wp) if isinstance(wp, (list, tuple, set)) else ([wp] if wp else [])
        if project and wps and project not in wps:
            out.append(_("Warehouse {0} is not set up for project {1}. It is set up for: {2}.")
                       .format(wh, project, ", ".join(sorted(wps))))
    return out