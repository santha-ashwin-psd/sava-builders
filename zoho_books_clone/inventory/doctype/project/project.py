# Copyright (c) 2026, PS Digitise and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import getdate


class Project(Document):
	def validate(self):
		self.project_code = (self.project_code or "").strip()
		self.project_name = (self.project_name or "").strip()
		if not self.project_code:
			frappe.throw(_("Project Code is required"))
		if not self.project_name:
			frappe.throw(_("Project Name is required"))

		if self.start_date and self.expected_end_date:
			if getdate(self.expected_end_date) < getdate(self.start_date):
				frappe.throw(_("Expected End Date cannot be before Start Date"))

		# Status only changes through api/projects.py close_project / reopen_project,
		# which set flags.allow_status_change after their own checks. A plain save
		# can't change status, can't touch closed_by / closed_on, and can't edit a
		# Closed project (reopen it first).
		if self.is_new():
			self.status = "Open"
			self.closed_by = None
			self.closed_on = None
		elif not self.flags.allow_status_change:
			before = frappe.db.get_value(
				"Project", self.name, ["status", "closed_by", "closed_on"], as_dict=True)
			if before:
				if self.status != before.status:
					frappe.throw(_("Use Close or Reopen to change a project's status"))
				if before.status == "Closed":
					frappe.throw(_("Project {0} is Closed. Reopen it to make changes.").format(self.name))
				self.closed_by = before.closed_by
				self.closed_on = before.closed_on