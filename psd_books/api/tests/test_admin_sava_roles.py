# Copyright (c) 2026, PS Digitise and Contributors
# See license.txt
"""
Tests for the Sava role helpers and endpoints in api/admin.py (A17.3a):
_clean_sava_roles, _apply_sava_roles, set_user_sava_roles, invite_user
(sava_roles), get_users_list (sava_roles).

DB-free: frappe is mocked.

Run with:
	bench run-tests --app psd_books --module psd_books.api.tests.test_admin_sava_roles
"""
from __future__ import annotations

import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import frappe

from psd_books.api import admin
from psd_books.api.admin import SAVA_ROLES, BOOKS_ROLES


class FakeUser:
	"""Minimal User doc: a roles list and an append() like Frappe's."""

	def __init__(self, roles=()):
		self.roles = [SimpleNamespace(role=r) for r in roles]
		self.saved = False
		self.inserted = False

	def append(self, field, row):
		assert field == "roles"
		self.roles.append(SimpleNamespace(role=row["role"]))

	def save(self, **kw):
		self.saved = True

	def insert(self, **kw):
		self.inserted = True

	def role_names(self):
		return [r.role for r in self.roles]


class TestCleanSavaRoles(unittest.TestCase):

	def test_constants(self):
		self.assertEqual(len(SAVA_ROLES), 7)
		self.assertFalse(set(SAVA_ROLES) & set(BOOKS_ROLES))

	def test_none_and_empty(self):
		self.assertEqual(admin._clean_sava_roles(None), [])
		self.assertEqual(admin._clean_sava_roles([]), [])
		self.assertEqual(admin._clean_sava_roles(""), [])
		self.assertEqual(admin._clean_sava_roles("[]"), [])

	def test_json_string_dedupe_and_order(self):
		out = admin._clean_sava_roles('["Director", "Store Keeper", "Director"]')
		self.assertEqual(out, ["Store Keeper", "Director"])

	def test_list_input(self):
		self.assertEqual(admin._clean_sava_roles(["Finance"]), ["Finance"])

	@patch.object(frappe, "throw", side_effect=Exception("thrown"))
	def test_unknown_role_throws(self, mock_throw):
		with self.assertRaises(Exception):
			admin._clean_sava_roles(["Store Keeper", "System Manager"])
		self.assertTrue(mock_throw.called)

	@patch.object(frappe, "throw", side_effect=Exception("thrown"))
	def test_books_role_not_accepted_as_sava_role(self, mock_throw):
		with self.assertRaises(Exception):
			admin._clean_sava_roles(["Books Admin"])

	@patch.object(frappe, "throw", side_effect=Exception("thrown"))
	def test_bad_json_throws(self, mock_throw):
		with self.assertRaises(Exception):
			admin._clean_sava_roles("{not json")


class TestApplySavaRoles(unittest.TestCase):

	def test_replaces_only_sava_roles(self):
		u = FakeUser(["Books Manager", "Store Keeper", "System Manager", "Director"])
		admin._apply_sava_roles(u, ["Finance"])
		self.assertEqual(sorted(u.role_names()), sorted(["Books Manager", "System Manager", "Finance"]))

	def test_empty_list_clears_sava_roles_only(self):
		u = FakeUser(["Accountant", "Purchase Officer"])
		admin._apply_sava_roles(u, [])
		self.assertEqual(u.role_names(), ["Accountant"])

	def test_keeps_books_role(self):
		u = FakeUser(["Books Viewer"])
		admin._apply_sava_roles(u, ["Director", "Finance"])
		self.assertIn("Books Viewer", u.role_names())
		self.assertEqual(len(u.role_names()), 3)


class TestSetUserSavaRoles(unittest.TestCase):

	@patch.object(frappe, "db", create=True)
	@patch.object(frappe, "get_doc")
	@patch("psd_books.api.admin._require_company_admin", return_value="co1")
	def test_sets_roles_and_commits(self, mock_req, mock_get_doc, mock_db):
		mock_db.exists.return_value = True
		u = FakeUser(["Books Manager", "Store Keeper"])
		mock_get_doc.return_value = u
		out = admin.set_user_sava_roles("a@x.test", '["Purchase Officer", "Store Keeper"]')
		self.assertEqual(out, {"success": True, "sava_roles": ["Store Keeper", "Purchase Officer"]})
		self.assertTrue(u.saved)
		self.assertEqual(sorted(u.role_names()), sorted(["Books Manager", "Store Keeper", "Purchase Officer"]))
		mock_db.exists.assert_called_with("Books Company Member", {"user": "a@x.test", "company": "co1"})
		mock_db.commit.assert_called_once()

	@patch.object(frappe, "throw", side_effect=Exception("not part"))
	@patch.object(frappe, "db", create=True)
	@patch.object(frappe, "get_doc")
	@patch("psd_books.api.admin._require_company_admin", return_value="co1")
	def test_user_outside_company_rejected_and_not_saved(self, mock_req, mock_get_doc, mock_db, mock_throw):
		mock_db.exists.return_value = False
		with self.assertRaises(Exception):
			admin.set_user_sava_roles("other@x.test", ["Finance"])
		mock_get_doc.assert_not_called()

	@patch.object(frappe, "throw", side_effect=Exception("invalid"))
	@patch.object(frappe, "get_doc")
	@patch("psd_books.api.admin._require_company_admin", return_value="co1")
	def test_invalid_role_rejected_before_any_write(self, mock_req, mock_get_doc, mock_throw):
		with self.assertRaises(Exception):
			admin.set_user_sava_roles("a@x.test", ["Books Admin"])
		mock_get_doc.assert_not_called()

	@patch.object(frappe, "get_doc")
	@patch("psd_books.api.admin._require_company_admin", side_effect=frappe.PermissionError("no"))
	def test_non_admin_blocked(self, mock_req, mock_get_doc):
		with self.assertRaises(frappe.PermissionError):
			admin.set_user_sava_roles("a@x.test", ["Finance"])
		mock_get_doc.assert_not_called()


class TestInviteUserSavaRoles(unittest.TestCase):

	def _run(self, existing=False, sava_roles=None, role="Books Manager"):
		new_user = FakeUser()
		old_user = FakeUser(["Books Viewer", "Director"])
		member = MagicMock()

		def new_doc(dt):
			return new_user if dt == "User" else member

		with patch("psd_books.api.admin._require_company_admin", return_value="co1"), \
			patch.object(frappe, "db", create=True) as db, \
			patch.object(frappe, "new_doc", side_effect=new_doc), \
			patch.object(frappe, "get_doc", return_value=old_user), \
			patch.object(frappe, "defaults", create=True), \
			patch("psd_books.api.admin._send_invite_email"):
			if existing:
				db.exists.return_value = True
				db.get_value.return_value = None  # no member row: reactivation
			else:
				db.exists.return_value = False
			out = admin.invite_user("New@X.test", "New", role=role, password="longpassword1",
				sava_roles=sava_roles)
		return out, (old_user if existing else new_user)

	def test_new_user_gets_books_role_plus_sava_roles(self):
		out, u = self._run(sava_roles=["Store Keeper", "Site Engineer"])
		self.assertTrue(u.inserted)
		self.assertEqual(u.role_names(), ["Books Manager", "Store Keeper", "Site Engineer"])
		self.assertEqual(out["sava_roles"], ["Store Keeper", "Site Engineer"])

	def test_no_sava_roles_is_unchanged_behaviour(self):
		out, u = self._run(sava_roles=None)
		self.assertEqual(u.role_names(), ["Books Manager"])
		self.assertEqual(out["sava_roles"], [])

	def test_reactivation_drops_old_roles_and_applies_new_sava_roles(self):
		out, u = self._run(existing=True, sava_roles=["Finance"])
		self.assertTrue(u.saved)
		self.assertEqual(u.role_names(), ["Books Manager", "Finance"])
		self.assertTrue(out["reactivated"])

	@patch.object(frappe, "throw", side_effect=Exception("invalid"))
	def test_invalid_sava_role_blocks_before_user_created(self, mock_throw):
		with patch("psd_books.api.admin._require_company_admin", return_value="co1"), \
			patch.object(frappe, "db", create=True) as db, \
			patch.object(frappe, "new_doc") as new_doc:
			db.exists.return_value = False
			with self.assertRaises(Exception):
				admin.invite_user("n@x.test", "N", role="Books Manager", password="longpassword1",
					sava_roles=["Not A Role"])
			new_doc.assert_not_called()


class TestGetUsersListSavaRoles(unittest.TestCase):

	def test_sava_roles_returned_per_user_in_fixed_order(self):
		from psd_books.utils.access import _LVL_FIELDS
		members = [
			{"user": "a@x.test", "books_role": "Books Manager", "is_company_admin": 0,
				"invited_by": "o@x.test", "joined_on": "2026-01-02",
				**{f: 0 for f in admin.MODULE_FIELDS}, **{f: "None" for f in _LVL_FIELDS}},
			{"user": "b@x.test", "books_role": "Books Viewer", "is_company_admin": 0,
				"invited_by": "o@x.test", "joined_on": "2026-01-03",
				**{f: 0 for f in admin.MODULE_FIELDS}, **{f: "None" for f in _LVL_FIELDS}},
		]
		users = [{"name": "a@x.test", "full_name": "A", "email": "a@x.test", "enabled": 1,
			"last_login": None, "creation": None, "user_image": None},
			{"name": "b@x.test", "full_name": "B", "email": "b@x.test", "enabled": 1,
			"last_login": None, "creation": None, "user_image": None}]
		has_role = [
			{"parent": "a@x.test", "role": "Director"},
			{"parent": "a@x.test", "role": "Store Keeper"},
		]

		def get_all(dt, **kw):
			return {"Books Company Member": members, "User": users, "Has Role": has_role}[dt]

		with patch("psd_books.api.admin._require_company_admin", return_value="co1"), \
			patch.object(frappe, "get_all", side_effect=get_all):
			out = {r["name"]: r for r in admin.get_users_list()}
		self.assertEqual(out["a@x.test"]["sava_roles"], ["Store Keeper", "Director"])
		self.assertEqual(out["b@x.test"]["sava_roles"], [])


if __name__ == "__main__":
	unittest.main()