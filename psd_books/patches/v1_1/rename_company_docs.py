"""
Migrate Cost Center, Warehouse, and Bank Account names from the old format
(name only) to the new compound format (name-company), matching the updated
autoname rules.

Safe to run multiple times — skips records already in the new format.
"""
import frappe


def execute():
    # 1. Cost Center
    rename_docs("Cost Center", "cost_center_name")
    
    # 2. Warehouse
    rename_docs("Warehouse", "warehouse_name")
    
    # 3. Bank Account
    rename_docs("Bank Account", "account_name")

    # 4. Fiscal Year
    rename_docs("Fiscal Year", "year")

    # 5. Tax Template
    rename_docs("Tax Template", "template_name")


def rename_docs(doctype, name_field):
    docs = frappe.db.sql(
        f"SELECT name, {name_field} as label, company FROM `tab{doctype}`",
        as_dict=True,
    )

    for doc in docs:
        old_name = doc["name"]
        label = doc["label"]
        company = doc.get("company") or ""

        if not company:
            continue

        expected_name = f"{label}-{company}"
        if old_name == expected_name:
            continue  # already in new format

        if frappe.db.exists(doctype, expected_name):
            # New-format name already taken — skip to avoid collision
            frappe.log_error(
                f"Cannot rename '{old_name}' → '{expected_name}': target already exists.",
                f"rename_{doctype.lower().replace(' ', '_')}_per_company",
            )
            continue

        # For Tree doctypes (Cost Center, Warehouse), update parent references
        if doctype in ["Cost Center", "Warehouse"]:
            parent_field = "parent_cost_center" if doctype == "Cost Center" else "parent_warehouse"
            frappe.db.sql(
                f"UPDATE `tab{doctype}` SET {parent_field} = %s WHERE {parent_field} = %s",
                (expected_name, old_name),
            )

        # Rename the doc (updates the primary key and all linked fields via Frappe)
        try:
            frappe.rename_doc(doctype, old_name, expected_name, force=True)
        except Exception as e:
            frappe.log_error(
                f"Error renaming {doctype} '{old_name}' to '{expected_name}': {str(e)}",
                f"rename_{doctype.lower().replace(' ', '_')}_per_company",
            )

    frappe.db.commit()
