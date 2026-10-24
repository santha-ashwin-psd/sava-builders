"""
Patch v1_27: Quotation Comparison Item has a new Order Qty field (quantity to order now).
Existing comparisons were made for the full RFQ qty, so their Order Qty is set to the line qty.
Only rows whose Order Qty is still empty/0 are touched. Safe to re-run.
"""
import frappe


def execute():
    if not frappe.db.has_column("Quotation Comparison Item", "order_qty"):
        return
    frappe.db.sql(
        """update `tabQuotation Comparison Item` set order_qty = qty
           where ifnull(order_qty, 0) = 0 and ifnull(qty, 0) > 0"""
    )
    frappe.db.commit()