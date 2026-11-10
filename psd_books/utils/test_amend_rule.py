# Copyright (c) 2026, PS Digitise and Contributors
"""
Logic tests: only the Director (or a Books Admin) may amend MRN, PO, GRN and Delivery Notes. DB-free, mocked.

Run with:
	bench --site sava run-tests --app psd_books --module psd_books.utils.test_amend_rule
"""
import unittest
from unittest.mock import patch

from psd_books.utils import access


def allowed(roles, doctype, admin):
	m = {"admin": admin, "readonly": False, "no_member": False, "role": "", "mods": {}, "levels": {}}
	with patch.object(access, "_membership", return_value=m), patch("frappe.get_roles", return_value=list(roles)):
		try:
			access.assert_can_amend(doctype, user="u@example.com")
			return True
		except Exception:  # noqa: BLE001
			return False


class TestAmendRule(unittest.TestCase):
	DOCS = ("Material Request", "Purchase Order", "Purchase Receipt", "Stock Entry", "Delivery Note")

	def test_admin_member_can(self):  # a Director or Books Admin reaches _membership()["admin"]
		for dt in self.DOCS:
			self.assertTrue(allowed({"Director"}, dt, True), dt)

	def test_others_cannot(self):
		for role in ("Purchase Manager", "Admin", "Store Keeper", "Site Engineer", "Purchase Officer", "Finance"):
			for dt in self.DOCS:
				self.assertFalse(allowed({role}, dt, False), (role, dt))

	def test_other_doctypes_unaffected(self):
		self.assertTrue(allowed({"Purchase Manager"}, "BOM", False))


if __name__ == "__main__":
	unittest.main()