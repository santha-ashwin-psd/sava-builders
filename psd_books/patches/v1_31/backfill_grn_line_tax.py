"""
Patch v1_31: GRN lines now carry the Purchase Order line's `tax_code` (shown next to the rate).
Fills it for existing lines from their source PO line (po_item). Non-destructive and idempotent:
lines that already have a tax template are skipped.
"""
import frappe


def execute():
    if not frappe.db.has_column("Purchase Receipt Item", "tax_code"):
        return
    frappe.db.sql("""
        update `tabPurchase Receipt Item` pri
        join `tabPurchase Order Item` poi on poi.name = pri.po_item
           set pri.tax_code = poi.tax_code
         where ifnull(pri.tax_code, '') = ''
           and ifnull(poi.tax_code, '') != ''
    """)