"""READ-ONLY audit: find BOM rows whose rate was filled from the selling rate.

Run:
  bench --site development.localhost execute zoho_books_clone.utils.audit_bom_rates.run

Writes nothing. Flags a BOM Item row (items / packing_items) when:
  SELLING  rate == Item.standard_rate and rate != current valuation rate
           (almost certainly auto-filled from the selling rate)
  DIFFERS  rate != current valuation rate, but not the selling rate
           (hand-typed or older valuation; shown for information)
Rows already matching valuation are skipped. Bulk Item Rate (Packing BOMs)
is checked the same way.
"""
import frappe
from frappe.utils import flt


def classify(rate, standard_rate, valuation, tol=0.005):
    rate, standard_rate, valuation = flt(rate), flt(standard_rate), flt(valuation)
    if abs(rate - valuation) <= tol:
        return None
    if standard_rate and abs(rate - standard_rate) <= tol:
        return "SELLING"
    return "DIFFERS"


def run():
    from zoho_books_clone.inventory.landed_cost_engine import get_item_valuation_rates

    rows = frappe.db.sql(
        """SELECT bi.parent AS bom, p.docstatus, p.bom_type, bi.parentfield,
                  bi.item_code, bi.qty, bi.rate
           FROM `tabBOM Item` bi JOIN `tabBOM` p ON p.name = bi.parent
           WHERE bi.parenttype = 'BOM' AND p.docstatus < 2
             AND bi.parentfield IN ('items', 'packing_items')
             AND IFNULL(bi.item_code, '') != ''""",
        as_dict=True,
    )
    bulk = frappe.db.sql(
        """SELECT name AS bom, docstatus, bom_type, 'bulk_rate' AS parentfield,
                  bulk_item AS item_code, bulk_qty_per_unit AS qty, bulk_rate AS rate
           FROM `tabBOM` WHERE docstatus < 2 AND IFNULL(bulk_item, '') != ''""",
        as_dict=True,
    )
    rows += bulk

    codes = sorted({r.item_code for r in rows})
    val = get_item_valuation_rates(codes) if codes else {}
    std = {
        i.name: i.standard_rate
        for i in frappe.get_all("Item", filters={"name": ["in", codes]}, fields=["name", "standard_rate"])
    } if codes else {}
    wo = dict(frappe.db.sql(
        "SELECT bom, COUNT(*) FROM `tabWork Order` WHERE docstatus < 2 GROUP BY bom"
    ))

    out = []
    for r in rows:
        flag = classify(r.rate, std.get(r.item_code), val.get(r.item_code))
        if flag:
            out.append((flag, r))
    out.sort(key=lambda x: (x[0] != "SELLING", x[1].bom))

    status = {0: "Draft", 1: "Submitted"}
    print(f"{'FLAG':8} {'BOM':18} {'STATUS':10} {'FIELD':13} {'ITEM':14} {'RATE':>10} {'SELLING':>10} {'VALUATION':>10} {'WOs':>4}")
    for flag, r in out:
        print(f"{flag:8} {r.bom:18} {status[r.docstatus]:10} {r.parentfield:13} {r.item_code[:14]:14} "
              f"{flt(r.rate):>10.2f} {flt(std.get(r.item_code)):>10.2f} {flt(val.get(r.item_code)):>10.2f} {wo.get(r.bom, 0):>4}")
    n_sell = sum(1 for f, _ in out if f == "SELLING")
    print(f"\n{len(out)} rows differ from valuation ({n_sell} match the selling rate). Nothing was changed.")