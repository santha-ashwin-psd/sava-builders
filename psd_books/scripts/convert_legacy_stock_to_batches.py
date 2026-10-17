"""
convert_legacy_stock_to_batches.py

Bulk-fixes items where stock was posted BEFORE "Has Batch No" was enabled on
the Item — i.e. there are Stock Ledger Entries with batch_no = NULL for an
item that is now flagged has_batch_no = 1. Converts that legacy qty into a
single new Batch per item+warehouse, preserving qty and stock value exactly.

Run from bench console on the target site:

    bench --site <sitename> console

    >>> import sys
    >>> sys.path.append("/home/frappe/frappe/apps/psd_books")  # if needed
    >>> from convert_legacy_stock_to_batches import run
    >>> run(dry_run=True)          # ALWAYS run this first and read the output
    >>> run(dry_run=False)         # then actually convert

Or drop this into psd_books/patches/one_off/ and run:

    bench --site <sitename> execute psd_books.patches.one_off.convert_legacy_stock_to_batches.execute

Safety model
------------
1. Finds every (item, warehouse) pair with a positive net qty sitting in
   Stock Ledger Entries that have batch_no IS NULL, on an item where
   Item.has_batch_no = 1 right now.
2. For each candidate, checks for OPEN references first:
     - Sales Order rows (submitted, not fully delivered/closed)
     - Purchase Order rows (submitted, not fully received/closed)
     - Work Order rows (submitted, not completed/stopped/closed) — checked
       both as the item being produced and as a raw material in the BOM/WO
       item table
   If any open reference exists, the item/warehouse is SKIPPED and logged —
   never converted automatically. Convert those manually after the open
   transaction clears (or closes), re-running this script afterwards.
3. For clean candidates, wraps the fix in a single try/finally so
   Item.has_batch_no is guaranteed to be restored to 1 even if the zero-out
   entry fails partway — the item is never left permanently un-batch-tracked.
4. Both postings (zero-out, then batched re-add) use the SAME valuation rate,
   so total stock value for the item/warehouse doesn't move — it's a wash in
   the GL (one Stock Adjustment credit, one debit, same amount).
5. Every action is logged to a list you can inspect/export afterwards; dry
   run mode does the read-only analysis and open-ref check WITHOUT writing
   anything, so you can review the exact list before touching real data.

Run this only when the app isn't being actively used (maintenance window) —
even with the open-transaction guard, another user editing one of these
items' stock in the same few seconds as this script runs is still a race.
"""

import frappe
from frappe.utils import flt, nowdate


def get_open_txn_refs(item_code):
    """Open Sales Order / Purchase Order / Work Order references for this item.
    Returns a list of human-readable strings; empty list == safe to convert."""
    refs = []

    so = frappe.db.sql("""
        SELECT DISTINCT so.name
        FROM `tabSales Order Item` soi
        JOIN `tabSales Order` so ON so.name = soi.parent
        WHERE soi.item_code = %s
          AND so.docstatus = 1
          AND so.status NOT IN ('Closed', 'Completed', 'Cancelled')
    """, item_code, as_dict=True)
    refs += [f"Sales Order {r.name}" for r in so]

    po = frappe.db.sql("""
        SELECT DISTINCT po.name
        FROM `tabPurchase Order Item` poi
        JOIN `tabPurchase Order` po ON po.name = poi.parent
        WHERE poi.item_code = %s
          AND po.docstatus = 1
          AND po.status NOT IN ('Closed', 'Completed', 'Cancelled')
    """, item_code, as_dict=True)
    refs += [f"Purchase Order {r.name}" for r in po]

    wo = frappe.db.sql("""
        SELECT DISTINCT wo.name
        FROM `tabWork Order` wo
        LEFT JOIN `tabWork Order Item` woi ON woi.parent = wo.name
        WHERE (wo.production_item = %s OR woi.item_code = %s)
          AND wo.docstatus = 1
          AND wo.status NOT IN ('Completed', 'Stopped', 'Closed', 'Cancelled')
    """, (item_code, item_code), as_dict=True)
    refs += [f"Work Order {r.name}" for r in wo]

    return refs


def find_candidates():
    """(item_code, warehouse, qty) for every batch-tracked item that still
    carries un-batched (legacy) stock in a given warehouse."""
    return frappe.db.sql("""
        SELECT sle.item_code, sle.warehouse, SUM(sle.actual_qty) AS qty
        FROM `tabStock Ledger Entry` sle
        JOIN `tabItem` it ON it.name = sle.item_code
        WHERE it.has_batch_no = 1
          AND sle.batch_no IS NULL
          AND sle.is_cancelled = 0
        GROUP BY sle.item_code, sle.warehouse
        HAVING qty > 0.0000001
    """, as_dict=True)


def _get_rate(item_code, warehouse):
    rate = flt(frappe.db.get_value(
        "Bin", {"item_code": item_code, "warehouse": warehouse}, "valuation_rate"
    ))
    if not rate:
        item_rates = frappe.db.get_value(
            "Item", item_code, ["standard_buying_rate", "standard_rate"], as_dict=True
        ) or {}
        rate = flt(item_rates.get("standard_buying_rate")) or flt(item_rates.get("standard_rate")) or 0
    return rate


def _get_company():
    return (
        frappe.db.get_single_value("Books Settings", "default_company")
        or frappe.db.get_default("company")
    )


def convert_one(item_code, warehouse, qty, dry_run=True, batch_prefix="BATCH"):
    refs = get_open_txn_refs(item_code)
    if refs:
        msg = f"SKIP  {item_code} @ {warehouse} (qty {qty}) — open refs: {', '.join(refs)}"
        print(msg)
        return {"item_code": item_code, "warehouse": warehouse, "qty": qty,
                "status": "skipped-open-refs", "refs": refs}

    rate = _get_rate(item_code, warehouse)
    company = _get_company()

    if dry_run:
        print(f"WOULD CONVERT  {item_code} @ {warehouse}  qty={qty}  rate={rate}")
        return {"item_code": item_code, "warehouse": warehouse, "qty": qty,
                "rate": rate, "status": "would-convert"}

    print(f"CONVERTING     {item_code} @ {warehouse}  qty={qty}  rate={rate}")

    # 1. Take Has Batch No off so the zero-out entry is accepted without a
    #    batch_no (direct db write — skips Item.validate(), which is fine
    #    here since we're not changing anything else about the item).
    frappe.db.set_value("Item", item_code, "has_batch_no", 0)
    try:
        se_out = frappe.get_doc({
            "doctype": "Stock Entry",
            "stock_entry_type": "Stock Adjustment",
            "posting_date": nowdate(),
            "company": company,
            "remarks": f"Batch conversion — zeroing pre-batch stock for {item_code}",
            "items": [{
                "item_code": item_code,
                "qty": -flt(qty),
                "basic_rate": rate,
                "t_warehouse": warehouse,
            }],
        })
        se_out.flags.ignore_permissions = True
        se_out.insert()
        se_out.submit()
    finally:
        # Always restore has_batch_no, even if the zero-out entry blew up,
        # so a failed run never leaves the item permanently un-batch-tracked.
        frappe.db.set_value("Item", item_code, "has_batch_no", 1)

    # 2. Create the batch and post the batched receipt.
    batch_no = f"{batch_prefix}-{item_code}-{frappe.generate_hash(length=5).upper()}"
    frappe.get_doc({
        "doctype": "Batch",
        "batch_no": batch_no,
        "item": item_code,
        "warehouse": warehouse,
        "manufacturing_date": nowdate(),
        "batch_qty": 0,   # Stock Entry submit is the authoritative writer, same
                          # reasoning as OpeningStockBatchEntry.vue — don't
                          # double-count by seeding this.
    }).insert(ignore_permissions=True)

    se_in = frappe.get_doc({
        "doctype": "Stock Entry",
        "stock_entry_type": "Opening Stock",
        "posting_date": nowdate(),
        "company": company,
        "remarks": f"Batch conversion — {item_code} into {batch_no}",
        "items": [{
            "item_code": item_code,
            "qty": flt(qty),
            "basic_rate": rate,
            "t_warehouse": warehouse,
            "batch_no": batch_no,
        }],
    })
    se_in.flags.ignore_permissions = True
    se_in.insert()
    se_in.submit()

    frappe.db.commit()

    final_bin_qty = flt(frappe.db.get_value(
        "Bin", {"item_code": item_code, "warehouse": warehouse}, "actual_qty"
    ) or 0)

    return {
        "item_code": item_code, "warehouse": warehouse, "qty": qty, "rate": rate,
        "status": "converted", "batch_no": batch_no,
        "zero_out_entry": se_out.name, "receipt_entry": se_in.name,
        "final_bin_qty": final_bin_qty,
    }


def run(dry_run=True, batch_prefix="BATCH"):
    candidates = find_candidates()
    print(f"Found {len(candidates)} item/warehouse combo(s) with legacy un-batched stock.\n")

    results = []
    for r in candidates:
        result = convert_one(r.item_code, r.warehouse, flt(r.qty),
                              dry_run=dry_run, batch_prefix=batch_prefix)
        results.append(result)

    converted = [r for r in results if r["status"] == "converted"]
    skipped = [r for r in results if r["status"] == "skipped-open-refs"]
    would = [r for r in results if r["status"] == "would-convert"]

    print("\n--- Summary ---")
    print(f"Converted: {len(converted)}")
    print(f"Skipped (open refs): {len(skipped)}")
    if not dry_run:
        for r in skipped:
            print(f"  - {r['item_code']} @ {r['warehouse']}: {', '.join(r['refs'])}")
    if dry_run:
        print(f"Would convert: {len(would)}")

    return results


def execute():
    """Entry point if this is dropped into patches/one_off/ and run via
    `bench execute`. Runs the real conversion (not dry run) — dry-run it
    manually via bench console first."""
    return run(dry_run=False)