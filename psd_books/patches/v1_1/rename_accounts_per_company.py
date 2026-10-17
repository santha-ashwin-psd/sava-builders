"""
Migrate Account names from the old format (account_name only) to the new
compound format (account_name-company), matching the updated autoname rule.

Safe to run multiple times — skips accounts already in the new format.
"""
import frappe


def execute():
    accounts = frappe.db.sql(
        "SELECT name, account_name, company FROM `tabAccount`",
        as_dict=True,
    )

    for acct in accounts:
        old_name = acct["name"]
        account_name = acct["account_name"]
        company = acct.get("company") or ""

        if not company:
            continue

        expected_name = f"{account_name}-{company}"
        if old_name == expected_name:
            continue  # already in new format

        if frappe.db.exists("Account", expected_name):
            # New-format name already taken — skip to avoid collision
            frappe.log_error(
                f"Cannot rename '{old_name}' → '{expected_name}': target already exists.",
                "rename_accounts_per_company",
            )
            continue

        # Update parent_account references that point to the old name
        frappe.db.sql(
            "UPDATE `tabAccount` SET parent_account = %s WHERE parent_account = %s",
            (expected_name, old_name),
        )

        # Rename the doc (updates the primary key and all linked fields via Frappe)
        frappe.rename_doc("Account", old_name, expected_name, force=True)

    frappe.db.commit()
