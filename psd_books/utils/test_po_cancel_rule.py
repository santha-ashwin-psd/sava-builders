# Copyright (c) 2026, PS Digitise and Contributors
"""
Logic tests: who may cancel / delete a Purchase Order (SAVA_ACCESS "cancel_delete"). DB-free, mocked like test_sava_access.

Run with:
	bench --site sava run-tests --app psd_books --module psd_books.utils.test_po_cancel_rule
"""
import unittest
from unittest.mock import patch

from psd_books.utils import access


def member(admin=False, readonly=False, no_member=False):
	return {"admin": admin, "readonly": readonly, "no_member": no_member, "role": "", "mods": {},
		"levels": {m: "None" for m in access.MODULES}}


def can(roles, action, **m):
	with patch.object(access, "_membership", return_value=member(**m)), \
			patch("frappe.get_roles", return_value=list(roles)):
		try:
			access.assert_can("Purchase Order", action, user="u@example.com")
			return True
		except Exception:  # noqa: BLE001
			return False


def shown(roles, action, **m):
	with patch.object(access, "_membership", return_value=member(**m)), \
			patch("frappe.get_roles", return_value=list(roles)):
		return access.can_cancel_delete("Purchase Order", action, user="u@example.com")


class TestPoCancelRule(unittest.TestCase):
	def test_purchase_manager_admin_director_can_cancel_and_delete(self):
		for role in ("Purchase Manager", "Admin", "Director"):
			for action in ("cancel", "delete"):
				self.assertTrue(can({role}, action), (role, action))
				self.assertTrue(shown({role}, action), (role, action))

	def test_books_admin_always_can(self):
		self.assertTrue(can({"Store Keeper"}, "cancel", admin=True))

	def test_other_job_roles_cannot(self):
		for role in ("Store Keeper", "Site Engineer", "Purchase Officer", "Accounts Officer", "Project Manager", "Finance"):
			self.assertFalse(can({role}, "cancel"), role)
			self.assertFalse(shown({role}, "cancel"), role)

	def test_read_only_member_cannot(self):
		self.assertFalse(can({"Purchase Manager"}, "cancel", readonly=True))


if __name__ == "__main__":
	unittest.main()