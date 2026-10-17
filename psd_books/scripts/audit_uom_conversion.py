"""
Audit: find Purchase Invoice line items where the stock valuation was posted
WITHOUT a real Purchase-UOM -> stock_uom conversion being applied, even though
the item's UOM Conversion table now has (or should have) one configured.

This does NOT touch any data. It only reads and reports.

Run in bench console:

    bench --site <your-site> console

Then:

    from psd_books.scripts.audit_uom_conversion import audit_uom_conversion
    audit_uom_conversion()

Or restrict to specific items:

    audit_uom_conversion(item_codes=["sesame oil - Nallennai - 15 kg", "Coconut Oil Thengai ennai"])
"""
import frappe
from frappe.utils import flt


def audit_uom_conversion(item_codes=None):
    filters = {"update_stock": 1, "docstatus": 1}
    pinvs = frappe.get_all("Purchase Invoice", filters=filters, pluck="name")

    flagged = []
    checked_rows = 0

    for pinv_name in pinvs:
        pinv = frappe.get_doc("Purchase Invoice", pinv_name)
        for row in (pinv.items or []):
            item_code = row.item_code
            if item_codes and item_code not in item_codes:
                continue

            stock_uom = frappe.db.get_value("Item", item_code, "stock_uom")
            if not stock_uom:
                continue

            row_uom = row.uom or stock_uom
            checked_rows += 1

            # What conversion factor the item's master data says SHOULD apply
            # for this UOM today.
            configured_factor = None
            if row_uom != stock_uom:
                configured_factor = frappe.db.get_value(
                    "Item UOM Conversion Detail",
                    {"parent": item_code, "parenttype": "Item", "uom": row_uom},
                    "conversion_factor",
                )

            # Find the linked auto-created Stock Entry for this Purchase Invoice.
            se_names = frappe.get_all(
                "Stock Entry",
                filters={
                    "reference_doctype": "Purchase Invoice",
                    "reference_name": pinv_name,
                    "docstatus": 1,
                },
                pluck="name",
            )
            if not se_names:
                continue  # no stock entry created (not a stock item, or cancelled)

            se_item = None
            for se_name in se_names:
                se_item = frappe.db.get_value(
                    "Stock Entry Detail",
                    {"parent": se_name, "item_code": item_code},
                    ["qty", "basic_rate", "amount"],
                    as_dict=True,
                )
                if se_item:
                    break
            if not se_item:
                continue

            row_qty = flt(row.qty)
            row_amount = flt(row.amount) or (flt(row.rate) * row_qty)
            expected_rate_per_stock_uom = (
                round(row_amount / (row_qty * flt(configured_factor)), 4)
                if configured_factor and row_qty
                else None
            )
            actual_rate = flt(se_item.basic_rate)
            actual_qty = flt(se_item.qty)

            problem = None
            if row_uom != stock_uom and not configured_factor:
                # UOM differs from stock UOM but there's no conversion configured
                # at all right now -- if this posted with qty/rate treated 1:1,
                # it's dimensionally wrong.
                if abs(actual_qty - row_qty) < 0.001:
                    problem = (
                        f"No UOM Conversion configured for '{row_uom}' -> '{stock_uom}'. "
                        f"Posted as 1:1 (qty {row_qty} {row_uom} -> {actual_qty} {stock_uom})."
                    )
            elif configured_factor and configured_factor != 1:
                expected_qty = round(row_qty * flt(configured_factor), 4)
                if abs(actual_qty - row_qty) < 0.001 and abs(expected_qty - actual_qty) > 0.001:
                    # A conversion factor exists today, but the posted stock qty
                    # matches the RAW purchase qty (no conversion applied at
                    # posting time) instead of the converted qty.
                    problem = (
                        f"Conversion factor {configured_factor} exists for '{row_uom}' -> "
                        f"'{stock_uom}' today, but this entry posted qty={actual_qty} "
                        f"(raw, unconverted) instead of expected {expected_qty}."
                    )

            if problem:
                flagged.append({
                    "purchase_invoice": pinv_name,
                    "posting_date": str(pinv.posting_date),
                    "item_code": item_code,
                    "row_uom": row_uom,
                    "stock_uom": stock_uom,
                    "purchase_qty": row_qty,
                    "purchase_rate": flt(row.rate),
                    "configured_factor_today": configured_factor,
                    "stock_entry_qty": actual_qty,
                    "stock_entry_rate": actual_rate,
                    "issue": problem,
                })

    print(f"\nChecked {checked_rows} Purchase Invoice item rows across {len(pinvs)} stock-updating invoices.")
    print(f"Flagged {len(flagged)} row(s) with a UOM-conversion inconsistency:\n")
    for f in flagged:
        print(f"- {f['purchase_invoice']} ({f['posting_date']})  item={f['item_code']}")
        print(f"    purchase: {f['purchase_qty']} {f['row_uom']} @ Rs.{f['purchase_rate']}")
        print(f"    stock entry posted: qty={f['stock_entry_qty']}  rate=Rs.{f['stock_entry_rate']}")
        print(f"    configured factor today: {f['configured_factor_today']}")
        print(f"    issue: {f['issue']}\n")

    return flagged