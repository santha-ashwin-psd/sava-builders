"""
Patch v1_28: GRN lines saved with no rate show 0.00. New GRNs now take the Purchase Order rate on save
(purchase_receipt.py _po_rate_for); this fills the same value into the GRN lines that already exist.

For every Purchase Receipt Item with rate 0 on a GRN that has a Purchase Order: rate = the rate of the PO line it
came from (po_item), else of the first PO line for the same item with a rate; amount = qty x rate.
Lines whose PO rate is also 0, GRNs with no PO, and lines that already have a rate are left alone.
Only the GRN's own rate and amount columns change (no modified-date change). Stock Ledger and GL entries already
posted for a submitted GRN are NOT touched. Safe to re-run.
"""
import frappe
from frappe.utils import flt


def execute():
    rows = frappe.db.sql(
        """select pri.name, pri.qty, pri.item_code, pri.po_item, pr.purchase_order
           from `tabPurchase Receipt Item` pri
           join `tabPurchase Receipt` pr on pr.name = pri.parent
           where ifnull(pri.rate, 0) = 0 and ifnull(pr.purchase_order, '') != ''""",
        as_dict=True)
    fixed = 0
    for r in rows:
        rate = None
        if r.po_item:
            rate = frappe.db.get_value("Purchase Order Item", r.po_item, "rate")
        if not flt(rate):
            got = frappe.db.sql(
                """select rate from `tabPurchase Order Item`
                   where parent = %s and item_code = %s and ifnull(rate, 0) > 0 order by idx limit 1""",
                (r.purchase_order, r.item_code))
            rate = got[0][0] if got else 0
        rate = flt(rate)
        if rate <= 0:
            continue
        frappe.db.set_value("Purchase Receipt Item", r.name,
                            {"rate": rate, "amount": flt(r.qty) * rate}, update_modified=False)
        fixed += 1
    frappe.db.commit()
    print(f"v1_28: filled the rate on {fixed} GRN line(s)")