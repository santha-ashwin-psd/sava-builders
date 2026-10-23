# Copyright (c) 2026, PS Digitise and Contributors
# See license.txt
"""
Logic tests for Employee.validate (Sava A17.3b). DB-free: frappe.db is mocked.

Run with:
	bench --site sava run-tests --app psd_books --module psd_books.inventory.doctype.employee.test_employee
"""
from __future__ import annotations

import unittest
from types import SimpleNamespace
from unittest.mock import patch

import frappe

from psd_books.inventory.doctype.employee import employee as emp_mod
from psd_books.inventory.doctype.employee.employee import Employee

MOD = "psd_books.inventory.doctype.employee.employee"


def make(new=True, **kw):
	doc = Employee.__new__(Employee)
	doc.__dict__.update(dict(
		name=None if new else "EMP-2026-00001", employee_name="Asha", designation=None,
		department=None, project=None, user=None, company="Sava Builders"))
	doc.__dict__.update(kw)
	doc.is_new = lambda: new
	return doc


class FakeDB:
	def __init__(self, users=(), linked=None, projects=None, own_project=None):
		self.users, self.linked = set(users), linked
		self.projects, self.own_project = projects or {}, own_project

	def exists(self, dt, name):
		return dt == "User" and name in self.users

	def get_value(self, dt, filt, field=None, as_dict=False):
		if dt == "Employee" and isinstance(filt, dict):
			return self.linked
		if dt == "Employee":
			return self.own_project
		if dt == "Project":
			p = self.projects.get(filt)
			return SimpleNamespace(**p) if p else None


def run(doc, db):
	with patch(f"{MOD}.frappe.db", db):
		doc.validate()


class TestEmployeeValidate(unittest.TestCase):

	def test_name_required_and_trimmed(self):
		with self.assertRaises(frappe.ValidationError):
			run(make(employee_name="   "), FakeDB())
		d = make(employee_name="  Asha  ", designation="  ", department=" Stores ")
		run(d, FakeDB())
		self.assertEqual((d.employee_name, d.designation, d.department), ("Asha", None, "Stores"))

	def test_user_must_exist(self):
		with self.assertRaises(frappe.ValidationError):
			run(make(user="x@y.com"), FakeDB())
		run(make(user="x@y.com"), FakeDB(users={"x@y.com"}))

	def test_user_unique(self):
		with self.assertRaises(frappe.ValidationError):
			run(make(user="x@y.com"), FakeDB(users={"x@y.com"}, linked="EMP-2026-00009"))

	def test_project_must_exist_open_same_company(self):
		with self.assertRaises(frappe.ValidationError):
			run(make(project="P1"), FakeDB())
		with self.assertRaises(frappe.ValidationError):
			run(make(project="P1"), FakeDB(projects={"P1": dict(status="Closed", company="Sava Builders")}))
		with self.assertRaises(frappe.ValidationError):
			run(make(project="P1"), FakeDB(projects={"P1": dict(status="Open", company="Other")}))
		run(make(project="P1"), FakeDB(projects={"P1": dict(status="Open", company="Sava Builders")}))

	def test_unchanged_project_skips_check_after_close(self):
		db = FakeDB(projects={"P1": dict(status="Closed", company="Sava Builders")}, own_project="P1")
		run(make(new=False, project="P1"), db)
		with self.assertRaises(frappe.ValidationError):
			run(make(new=False, project="P2"), FakeDB(
				projects={"P2": dict(status="Closed", company="Sava Builders")}, own_project="P1"))