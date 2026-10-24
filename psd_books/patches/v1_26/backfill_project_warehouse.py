"""
Patch v1_26: Project now has its own `warehouse` field, kept in step with the warehouse's
Projects table. Fills it in for existing projects that don't have one yet: the project's
Project Main Store if it has one, else the first warehouse that lists it. Non-destructive and
idempotent: a project that already has a warehouse is skipped, nothing is removed.
"""
import frappe


def execute():
    if not frappe.db.has_column("Project", "warehouse"):
        return
    for proj in frappe.get_all("Project", filters={"warehouse": ["in", ["", None]]}, pluck="name"):
        rows = frappe.db.sql(
            """select w.name, w.store_role from `tabWarehouse Project` wp
               join `tabWarehouse` w on w.name = wp.parent
               where wp.project = %s and wp.parenttype = 'Warehouse' and ifnull(w.disabled, 0) = 0
               order by w.creation asc""", (proj,), as_dict=True)
        if not rows:
            continue
        main = [r for r in rows if r.store_role == "Project Main Store"]
        pick = (main or rows)[0].name
        frappe.db.set_value("Project", proj, "warehouse", pick, update_modified=False)
    frappe.db.commit()