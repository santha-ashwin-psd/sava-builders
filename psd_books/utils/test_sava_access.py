# Copyright (c) 2026, PS Digitise and Contributors
"""
Logic tests for the Sava role rule in utils/access.py (A17). DB-free: membership and roles are mocked.

Run with:
	bench --site sava run-tests --app psd_books --module psd_books.utils.test_sava_access
"""
import unittest
from unittest.mock import patch

from psd_books.utils import access

ROLES = ("Store Keeper", "Site Engineer", "Purchase Officer", "Accounts Officer",
	"Purchase Manager", "Finance", "Director", "Project Manager")


def member(readonly=False, admin=False, no_member=False, levels=None):
	return {"admin": admin, "readonly": readonly, "no_member": no_member, "role": "", "mods": {},
		"levels": levels or {m: "None" for m in access.MODULES}}


def can(role_set, doctype, action, **m):
	"""True when assert_can lets a user holding `role_set` do `action` on `doctype`."""
	with patch.object(access, "_membership", return_value=member(**m)), \
			patch("frappe.get_roles", return_value=list(role_set)):
		try:
			access.assert_can(doctype, action, user="u@example.com")
			return True
		except Exception:  # noqa: BLE001
			return False


class TestSavaAccess(unittest.TestCase):
	def test_store_keeper_raises_dn_and_grn_without_sales_or_bills(self):
		for dt in ("Delivery Note", "Purchase Receipt"):
			for action in ("create", "write", "submit", "cancel"):
				self.assertTrue(can({"Store Keeper"}, dt, action), (dt, action))

	def test_only_the_named_role_raises_each_document(self):
		writers = {"Material Request": {"Site Engineer"}, "Delivery Note": {"Store Keeper"},
			"Purchase Receipt": {"Store Keeper"}, "Purchase Order": {"Purchase Officer"},
			"Request for Quotation": {"Purchase Officer"}, "Supplier Quotation": {"Purchase Officer"},
			"Quotation Comparison": {"Purchase Officer"}, "Purchase Invoice": {"Accounts Officer"},
			"Payment Entry": {"Accounts Officer", "Finance"}}
		full = {m: "Delete" for m in access.MODULES}  # every module on: only the role rule may refuse
		for dt, allowed in writers.items():
			for role in ROLES:
				for action in ("create", "write", "submit"):
					self.assertEqual(can({role}, dt, action, levels=full), role in allowed, (role, dt, action))

	def test_every_sava_role_reads_project_warehouse_item_and_grn(self):
		for role in ROLES:
			for dt in ("Project", "Warehouse", "Item", "Purchase Receipt"):
				self.assertTrue(can({role}, dt, "read"), (role, dt))

	def test_read_matrix_for_purchase_documents(self):
		self.assertFalse(can({"Site Engineer"}, "Purchase Order", "read"))
		self.assertFalse(can({"Store Keeper"}, "Purchase Invoice", "read"))
		self.assertTrue(can({"Store Keeper"}, "Purchase Order", "read"))
		self.assertTrue(can({"Accounts Officer"}, "Purchase Invoice", "read"))
		self.assertFalse(can({"Accounts Officer"}, "Material Request", "read"))

	def test_read_only_user_holding_a_writer_role_still_cannot_write(self):
		self.assertFalse(can({"Store Keeper"}, "Delivery Note", "create", readonly=True))
		self.assertTrue(can({"Director"}, "Purchase Order", "read", readonly=True))

	def test_only_project_manager_or_admin_creates_or_edits_a_project(self):
		full = {m: "Delete" for m in access.MODULES}  # modules on: only the Project rule may refuse
		for role in ROLES:
			for action in ("create", "write"):
				self.assertEqual(can({role}, "Project", action, levels=full), role == "Project Manager", (role, action))
			self.assertTrue(can({role}, "Project", "read"), role)
		# no Sava role, even with every module: still cannot create a project
		self.assertFalse(can(set(), "Project", "create", levels=full))
		# a Books Admin / Director (admin) always can
		self.assertTrue(can({"Director"}, "Project", "create", admin=True))
		self.assertTrue(can(set(), "Project", "write", admin=True))
		# a read-only or non-member Project Manager cannot
		self.assertFalse(can({"Project Manager"}, "Project", "create", readonly=True))
		self.assertFalse(can({"Project Manager"}, "Project", "create", no_member=True))

	def test_project_manager_reads_mrn_not_purchase_orders(self):
		self.assertTrue(can({"Project Manager"}, "Material Request", "read"))
		self.assertFalse(can({"Project Manager"}, "Material Request", "create"))
		self.assertFalse(can({"Project Manager"}, "Purchase Order", "read"))

	def test_user_with_two_roles_gets_both(self):
		both = {"Store Keeper", "Site Engineer"}
		self.assertTrue(can(both, "Material Request", "create"))
		self.assertTrue(can(both, "Delivery Note", "create"))
		self.assertFalse(can(both, "Purchase Order", "create"))

	def test_admin_and_non_members_are_not_changed_by_the_rule(self):
		self.assertTrue(can({"Store Keeper"}, "Purchase Order", "create", admin=True))
		self.assertFalse(can({"Store Keeper"}, "Delivery Note", "create", no_member=True))

	def test_user_without_a_sava_role_keeps_the_module_rule(self):
		inv = {m: "None" for m in access.MODULES}
		self.assertFalse(can(set(), "Material Request", "create", levels=inv))
		inv["inventory"] = "Edit"
		self.assertTrue(can(set(), "Material Request", "create", levels=inv))
		self.assertTrue(can(set(), "Delivery Note", "create", levels=inv))  # now an Inventory document

	def test_unlisted_doctype_keeps_the_module_rule_for_sava_users(self):
		inv = {m: "None" for m in access.MODULES}
		self.assertFalse(can({"Store Keeper"}, "Stock Entry", "create", levels=inv))
		inv["inventory"] = "Edit"
		self.assertTrue(can({"Store Keeper"}, "Stock Entry", "create", levels=inv))


if __name__ == "__main__":
	unittest.main()