"""
Patch v1_27: create the Admin Role on existing sites.

Admin has the same access as Purchase Manager (everything except approvals).
Idempotent: creates the Role only when it is missing. Safe to re-run.
"""
import frappe


def execute():
	if not frappe.db.exists("Role", "Admin"):
		frappe.get_doc({"doctype": "Role", "role_name": "Admin"}).insert(ignore_permissions=True)