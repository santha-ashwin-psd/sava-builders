"""
Patch v1_30: one GRN can now receive against several Purchase Orders, so each Purchase Receipt Item
has its own `purchase_order`. Fills it from the GRN header for existing lines that have none.
Non-destructive and idempotent: lines that already have a PO are skipped.
"""
import frappe


def execute():
    if not frappe.db.has_column("Purchase Receipt Item", "purchase_order"):
        return
    frappe.db.sql("""
        update `tabPurchase Receipt Item` pri
        join `tabPurchase Receipt` pr on pr.name = pri.parent
           set pri.purchase_order = pr.purchase_order
         where ifnull(pri.purchase_order, '') = ''
           and ifnull(pr.purchase_order, '') != ''
    """)