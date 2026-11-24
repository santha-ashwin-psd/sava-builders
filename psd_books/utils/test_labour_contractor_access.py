# Copyright (c) 2026, PS Digitise and Contributors
"""
Logic tests for who may use Labour Contractors (utils/access.py). DB-free: membership and roles are mocked.

Run with:
	bench --site sava run-tests --app psd_books --module psd_books.utils.test_labour_contractor_access
"""
import unittest
from unittest.mock import patch

from psd_books.utils import access

DT = "Labour Contractor"
# the other Sava job roles known to access.py (_ALL_SAVA = Site Engineer, Purchase Manager, Admin, Director)
OTHER_SAVA_ROLES = ("Site Engineer",)


def member(readonly=False, admin=False, no_member=False, levels=None):
	return {"admin": admin, "readonly": readonly, "no_member": no_member, "role": "", "mods": {},
		"levels": levels or {m: "None" for m in access.MODULES}}


def can(role_set, action, **m):
	with patch.object(access, "_membership", return_value=member(**m)), \
			patch("frappe.get_roles", return_value=list(role_set)):
		try:
			access.assert_can(DT, action, user="u@example.com")
			return True
		except Exception:  # noqa: BLE001
			return False


class TestLabourContractorAccess(unittest.TestCase):
	def test_books_admin_and_director_can_do_everything(self):
		# both resolve to admin=True in _membership (a Director counts as admin)
		for roles in (set(), {"Director"}):
			for action in ("read", "create", "write", "delete"):
				self.assertTrue(can(roles, action, admin=True), (roles, action))

	def test_admin_job_role_can_do_everything(self):
		for action in ("read", "create", "write", "delete"):
			self.assertTrue(can({"Admin"}, action), action)

	def test_purchase_manager_job_role_can_do_everything(self):
		for action in ("read", "create", "write", "delete"):
			self.assertTrue(can({"Purchase Manager"}, action), action)

	def test_other_sava_roles_cannot_even_with_every_module_on(self):
		full = {m: "Delete" for m in access.MODULES}  # only the role rule may refuse
		for role in OTHER_SAVA_ROLES:
			for action in ("read", "create", "write", "delete"):
				self.assertFalse(can({role}, action, levels=full), (role, action))

	def test_member_with_no_module_access_and_no_sava_role_is_refused(self):
		for action in ("read", "write", "delete"):
			self.assertFalse(can(set(), action), action)

	def test_non_member_is_refused(self):
		for action in ("read", "write", "delete"):
			self.assertFalse(can({"Admin"}, action, no_member=True), action)

	def test_read_only_admin_role_cannot_write_or_delete(self):
		self.assertTrue(can({"Admin"}, "read", readonly=True))
		self.assertFalse(can({"Admin"}, "write", readonly=True))
		self.assertFalse(can({"Admin"}, "delete", readonly=True))

	def test_doctype_is_mapped_to_the_admin_module(self):
		self.assertEqual(access.module_for(DT), "admin")