"""
Patch v1_23: create the Sava job Roles (Store Keeper, Site Engineer, Purchase
Officer, Accounts Officer) on existing sites (Sava A17.1).

These are plain Roles only. Doctype permissions for them come in A17.2.
Idempotent: creates only the Roles that are missing. Safe to re-run.
"""
import frappe

JOB_ROLES = ["Store Keeper", "Site Engineer", "Purchase Officer", "Accounts Officer"]


def execute():
	for role in JOB_ROLES:
		if not frappe.db.exists("Role", role):
			frappe.get_doc({"doctype": "Role", "role_name": role}).insert(ignore_permissions=True)