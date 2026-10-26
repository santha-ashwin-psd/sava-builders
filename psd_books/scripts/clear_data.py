"""
clear_data.py — Reset the books to a clean slate.

Run with:
  bench --site <site> execute psd_books.scripts.clear_data.execute

Deletes ALL transactional data (sales/purchase invoices, payments, orders,
quotations, journals, stock entries, GL & stock ledgers, e-way bills, etc.) and
resets the transaction naming counters to 0 so the next document starts at
`…-00001`.

KEEPS every master / setup record: customers, vendors, items, cost centers, the
chart of accounts, warehouses, tax templates, UOMs, currencies, price lists, etc.
Account balances and stock bins are zeroed (records kept, values reset).

A full database backup is taken AUTOMATICALLY before anything is deleted; restore
the most recent one with scripts/restore_latest.sh.
"""

import frappe

# ── Transaction parent doctypes — child tables are discovered automatically ──
TRANSACTION_DOCTYPES = [
    "Payment Entry", "E Way Bill", "TDS Entry",
    "Delivery Note", "Purchase Receipt",
    "Credit Note", "Debit Note", "Proforma Invoice",
    "Sales Invoice", "Purchase Invoice",
    "Sales Order", "Purchase Order", "Quotation",
    "Journal Entry", "Stock Entry", "Expense", "Expense Claim",
    "Bank Transaction",
    # Procurement / quality / store flow (added)
    "Material Request", "Request for Quotation", "Supplier Quotation",
    "Quotation Comparison", "Landed Cost Voucher", "QC Inspection",
    "QC Approval Request", "Packing Slip", "Work Order", "Job Card",
    "Production Plan", "Batch",
]

# Standalone ledgers (not child tables of the above)
LEDGER_DOCTYPES = ["General Ledger Entry", "Stock Ledger Entry"]

# Naming-series prefixes to reset (matched by startswith). Masters are excluded.
RESET_SERIES_PREFIXES = (
    "INV-", "SINV-", "PINV-", "PO-", "SO-", "QT-", "QTN-",
    "PAY-", "PE-", "SEC-", "STE-", "DN-", "GRN-", "PR-",
    "EXP-", "EWB-", "JE-", "JV-", "BTXN-", "SLE-", "TDS-",
    "PROF-", "CN-", "DBN-",
    "SB-MRN-", "SB-RFQ-", "SB-SQ-", "SB-CMP-", "LCV-", "QCI-", "QCAR-",
    "WO-", "PP-", "JC-", "PS-",
)
KEEP_SERIES_PREFIXES = ("CUST-", "SUPP-", "ITEM-", "MAT-")


def _take_backup():
    """Full DB backup before wiping. Aborts the clear if it fails."""
    from frappe.utils.backups import new_backup
    backup = new_backup(ignore_files=True, force=True)
    path = getattr(backup, "backup_path_db", None)
    if not path:
        frappe.throw("Backup failed — aborting clear to avoid data loss.")
    print(f"  💾  Backup taken → {path}")
    return path


def _child_tables(doctype):
    try:
        return [f.options for f in frappe.get_meta(doctype).get_table_fields() if f.options]
    except Exception:
        return []


def execute():
    """Entry point for `bench execute`."""
    print("\n── Reset books to a clean slate ────────────────────────────\n")

    # 1) Always back up first.
    _take_backup()

    frappe.flags.in_migrate = True  # suppress some doc hooks

    # 2) Ordered list of tables to clear: each doc's child tables, then the doc.
    seen, tables = set(), []
    for dt in LEDGER_DOCTYPES + TRANSACTION_DOCTYPES:
        if not frappe.db.exists("DocType", dt):
            continue
        for child in _child_tables(dt):
            if child not in seen:
                seen.add(child); tables.append(child)
        if dt not in seen:
            seen.add(dt); tables.append(dt)

    total = 0
    for dt in tables:
        table = f"`tab{dt}`"
        try:
            count = frappe.db.sql(f"SELECT COUNT(*) FROM {table}")[0][0]
            if count:
                frappe.db.sql(f"DELETE FROM {table}")
                total += count
                print(f"  ✅  {count:>6,} rows  →  {dt}")
        except Exception as err:
            if "doesn't exist" not in str(err).lower():
                print(f"  ⚠️   {dt}: {err}")

    # 2b) Frappe housekeeping rows that point at the deleted documents.
    ref = tuple(TRANSACTION_DOCTYPES + LEDGER_DOCTYPES)
    for q, args in (
        ("DELETE FROM `tabVersion` WHERE ref_doctype IN %s", (ref,)),
        ("DELETE FROM `tabComment` WHERE reference_doctype IN %s", (ref,)),
        ("DELETE FROM `tabToDo` WHERE reference_type IN %s", (ref,)),
        ("DELETE FROM `tabActivity Log` WHERE reference_doctype IN %s", (ref,)),
        ("DELETE FROM `tabDeleted Document`", ()),
        ("DELETE FROM `tabNotification Log`", ()),
    ):
        try:
            frappe.db.sql(q, args) if args else frappe.db.sql(q)
        except Exception as err:
            print(f"  ⚠️   {q.split('FROM')[1].split()[0]}: {err}")
    try:  # attachments: use delete_doc so the physical files go too
        for f in frappe.get_all("File", filters={"attached_to_doctype": ["in", list(ref)]}, pluck="name"):
            frappe.delete_doc("File", f, ignore_permissions=True, force=True)
    except Exception as err:
        print(f"  ⚠️   File cleanup: {err}")

    # 3) Zero stock bins (keep the item/warehouse rows).
    try:
        frappe.db.sql(
            "UPDATE `tabBin` SET actual_qty=0, reserved_qty=0, ordered_qty=0, "
            "projected_qty=0, stock_value=0, valuation_rate=0"
        )
        print("  ✅  Bin quantities zeroed")
    except Exception as err:
        print(f"  ⚠️   Bin reset: {err}")

    # 4) Zero cached account balances.
    try:
        frappe.db.sql("UPDATE `tabAccount` SET balance = 0")
        print("  ✅  Account balances zeroed")
    except Exception:
        pass

    # 5) Reset transaction naming counters → next document starts at 00001.
    reset_n = 0
    for (name,) in frappe.db.sql("SELECT name FROM `tabSeries`"):
        if any(name.startswith(p) for p in KEEP_SERIES_PREFIXES):
            continue
        if any(name.startswith(p) for p in RESET_SERIES_PREFIXES):
            frappe.db.sql("UPDATE `tabSeries` SET current = 0 WHERE name = %s", name)
            reset_n += 1
    print(f"  ✅  Reset {reset_n} transaction naming-series counters")

    frappe.db.commit()
    print(f"\n🎉  Done — {total:,} rows removed. Masters kept, numbering reset to 1.\n")