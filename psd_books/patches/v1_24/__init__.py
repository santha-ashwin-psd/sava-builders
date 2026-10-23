"""
Patch v1_24: a warehouse can serve several projects. Copies each warehouse's
old single `project` into the new `projects` child table. Non-destructive and
idempotent: a warehouse that already has a row for that project is skipped,
and the old project field is left as it was.
"""
import frappe


def execute():
    rows = frappe.get_all("Warehouse", filters={"project": ["is", "set"]}, fields=["name", "project"])
    for r in rows:
        exists = frappe.db.exists("Warehouse Project", {
            "parent": r.name, "parenttype": "Warehouse", "parentfield": "projects", "project": r.project})
        if exists:
            continue
        frappe.get_doc({
            "doctype": "Warehouse Project",
            "parent": r.name,
            "parenttype": "Warehouse",
            "parentfield": "projects",
            "idx": 1 + (frappe.db.count("Warehouse Project", {"parent": r.name, "parenttype": "Warehouse"})),
            "project": r.project,
        }).db_insert()
    frappe.db.commit()