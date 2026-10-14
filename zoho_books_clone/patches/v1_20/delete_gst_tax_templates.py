"""
Patch v1_20: Sava -- GST is not used in this project, so its tax templates go.

Deletes every Tax Template whose tax_type is "GST" (all companies). VAT and
other templates are not touched. Before deleting a template it clears the
links that would block or dangle:

  - Item.tax_code and Item.default_purchase_tax_template
  - Books Settings.default_tax_template

A GST template still used on a transaction line (Sales / Purchase Order,
Sales / Purchase Invoice, Quotation item rows) is NOT deleted -- history is
never rewritten -- and is printed so it can be dealt with by hand.

bootstrap._seed_tax_templates no longer seeds GST, so they are not recreated
on migrate. No new columns. Safe to re-run.
"""
import frappe

ROW_LINKS = (
    ("Sales Order Item", "tax_code"),
    ("Purchase Invoice Item", "tax_code"),
    ("Purchase Order Item", "tax_code"),
    ("Sales Invoice Item", "tax_code"),
    ("Quotation Item", "tax_code"),
)
ITEM_LINKS = (("Item", "tax_code"), ("Item", "default_purchase_tax_template"))


def _used_on_rows(name):
    n = 0
    for dt, field in ROW_LINKS:
        if frappe.db.table_exists(dt):
            n += frappe.db.count(dt, {field: name})
    return n


def _clear_master_links(name):
    for dt, field in ITEM_LINKS:
        if frappe.db.table_exists(dt):
            frappe.db.sql(f"UPDATE `tab{dt}` SET `{field}` = NULL WHERE `{field}` = %s", (name,))
    if frappe.db.exists("DocType", "Books Settings"):
        if frappe.db.get_single_value("Books Settings", "default_tax_template") == name:
            frappe.db.set_single_value("Books Settings", "default_tax_template", None)


def execute():
    if not frappe.db.exists("DocType", "Tax Template"):
        return
    deleted, kept = 0, []
    for name in frappe.get_all("Tax Template", filters={"tax_type": "GST"}, pluck="name"):
        used = _used_on_rows(name)
        if used:
            kept.append((name, used))
            continue
        _clear_master_links(name)
        frappe.delete_doc("Tax Template", name, force=1, ignore_permissions=True)
        deleted += 1
    frappe.db.commit()
    print(f"[v1_20] GST tax templates deleted: {deleted}")
    for name, used in kept:
        print(f"[v1_20] KEPT {name}: used on {used} transaction line(s)")