"""
Patch v1_21: create the approval Roles (Purchase Manager, Finance, Director) on
existing sites, for Quotation Comparison approval (Sava A9.4).

Idempotent: creates only the Roles that are missing. Safe to re-run.
"""
import frappe

APPROVAL_ROLES = ["Purchase Manager", "Finance", "Director"]


def execute():
	for role in APPROVAL_ROLES:
		if not frappe.db.exists("Role", role):
			frappe.get_doc({"doctype": "Role", "role_name": role}).insert(ignore_permissions=True)