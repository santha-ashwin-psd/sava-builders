"""
Patch v1_25: create the Project Manager Role on existing sites.

Only a Project Manager, a Books Admin or a Director can create a project, and
only a Books Admin or a Director can change a project's manager.
Idempotent: creates the Role only when it is missing. Safe to re-run.
"""
import frappe


def execute():
	if not frappe.db.exists("Role", "Project Manager"):
		frappe.get_doc({"doctype": "Role", "role_name": "Project Manager"}).insert(ignore_permissions=True)