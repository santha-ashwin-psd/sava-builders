# Copyright (c) 2026, PS Digitise and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document


class Employee(Document):
	"""Sava A17.3b: a staff record (name, designation, department, project, login user).

	Doctype only for now. The 7 Sava roles live on the linked User, not here."""

	def validate(self):
		self.employee_name = (self.employee_name or "").strip()
		if not self.employee_name:
			frappe.throw(_("Employee Name is required"))
		self.designation = (self.designation or "").strip() or None
		self.department = (self.department or "").strip() or None
		self.id_no = (self.id_no or "").strip() or None
		self.project = (self.project or "").strip() or None
		self.user = (self.user or "").strip() or None
		self._validate_user()
		self._validate_project()
		self._validate_driver()

	def _validate_user(self):
		if not self.user:
			return
		if not frappe.db.exists("User", self.user):
			frappe.throw(_("User {0} does not exist").format(self.user))
		other = frappe.db.get_value(
			"Employee", {"user": self.user, "name": ["!=", self.name or ""]}, "name")
		if other:
			frappe.throw(_("User {0} is already linked to employee {1}").format(self.user, other))

	def _validate_project(self):
		if not self.project:
			return
		# Only checked when new or changed, so an employee on a closed project stays editable.
		if not self.is_new() and self.project == frappe.db.get_value("Employee", self.name, "project"):
			return
		proj = frappe.db.get_value("Project", self.project, ["status", "company"], as_dict=True)
		if not proj:
			frappe.throw(_("Project {0} does not exist").format(self.project))
		if proj.status == "Closed":
			frappe.throw(_("Project {0} is Closed. It can't be used on new documents.").format(self.project))
		if proj.company and self.company and proj.company != self.company:
			frappe.throw(_("Project {0} belongs to company {1}, not {2}").format(
				self.project, proj.company, self.company))

	def _validate_driver(self):
		self.truck_no = (self.truck_no or "").strip().upper() or None
		if not self.is_driver:
			self.truck_no = None
			return
		if not self.truck_no:
			frappe.throw(_("Truck No. is required for a driver"))
		other = frappe.db.get_value(
			"Employee", {"truck_no": self.truck_no, "name": ["!=", self.name or ""]}, "name")
		if other:
			frappe.throw(_("Truck No. {0} is already used by employee {1}").format(self.truck_no, other))