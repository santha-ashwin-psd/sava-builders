"""
Patch v1_29: a Purchase Order can now cover several MRNs, so each Purchase Order Item has its own
`material_request`. Fills it from the Purchase Order's MRN for existing lines that have none.
Non-destructive and idempotent: lines that already have an MRN are skipped.
"""
import frappe


def execute():
    if not frappe.db.has_column("Purchase Order Item", "material_request"):
        return
    frappe.db.sql("""
        update `tabPurchase Order Item` poi
        join `tabPurchase Order` po on po.name = poi.parent
           set poi.material_request = po.material_request
         where ifnull(poi.material_request, '') = ''
           and ifnull(po.material_request, '') != ''
    """)