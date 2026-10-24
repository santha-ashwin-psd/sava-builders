# Copyright (c) 2026, PS Digitise and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import getdate


def project_manager_problem(user, member):
	"""Why `user` can't be this project's Project Manager, or None if they can.

	`member` is their Books Company Member row (books_role, is_company_admin) for the
	project's company, or None when they have no membership there. A Books Viewer is
	read-only and can't approve MRNs, unless they are a company admin."""
	if not member:
		return _("{0} is not a member of this company.").format(user)
	is_admin = member.get("is_company_admin") or member.get("books_role") == "Books Admin"
	if member.get("books_role") == "Books Viewer" and not is_admin:
		return _("{0} is a Books Viewer and cannot approve material requests. Choose another Project Manager.").format(user)
	return None


PROJECT_STORE_ROLES = ("Project Main Store", "Site Store")


def _edit_warehouse_projects(warehouse, add=None, remove=None):
	"""Add / remove one project row on a warehouse's Projects table. The warehouse is saved
	with ignore_project_sync so it does not write back to the project."""
	wh = frappe.get_doc("Warehouse", warehouse)
	rows = [r.project for r in (wh.get("projects") or [])]
	if add and add not in rows:
		wh.append("projects", {"project": add})
	elif remove and remove in rows:
		wh.set("projects", [r for r in wh.get("projects") if r.project != remove])
	else:
		return
	wh.flags.ignore_project_sync = True
	wh.flags.ignore_permissions = True
	wh.save()


PM_ROLE = "Project Manager"


def manager_rule_problem(is_new, is_admin, is_pm, user, old_manager, new_manager):
	"""Who may set or change a project's manager. Returns (problem, manager_to_use).

	New project: a Project Manager who is not an admin always becomes its manager; a Books
	Admin or Director must pick one. Existing project: only a Books Admin or Director may
	change the manager. `problem` is None when the change is allowed."""
	if is_new:
		if is_admin:
			if not new_manager:
				return _("Select a Project Manager for this project."), new_manager
			return None, new_manager
		if is_pm:
			return None, user
		return _("Only a Project Manager, Books Admin or Director can create a project."), new_manager
	if (new_manager or None) != (old_manager or None) and not is_admin:
		return _("Only a Books Admin or Director can change the Project Manager."), new_manager
	return None, new_manager


def _caller_caps():
	"""(is_admin, is_project_manager) for the logged-in user."""
	from psd_books.utils.access import _membership
	user = frappe.session.user
	return bool(_membership(user)["admin"]), PM_ROLE in set(frappe.get_roles(user))


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

		self._validate_project_manager()
		self._validate_warehouse()

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

	def _validate_warehouse(self):
		"""Optional project warehouse, kept in step with the warehouse's own Projects table
		(see on_update). It must be a project store (Project Main Store / Site Store) of the
		same company. Only checked when new or changed, so existing projects stay editable."""
		warehouse = (self.warehouse or "").strip() or None
		self.warehouse = warehouse
		old = None if self.is_new() else (frappe.db.get_value("Project", self.name, "warehouse") or None)
		if warehouse == old:
			return
		if warehouse:
			wh = frappe.db.get_value("Warehouse", warehouse, ["company", "is_group", "disabled", "store_role"], as_dict=True)
			if not wh:
				frappe.throw(_("Warehouse {0} not found").format(warehouse))
			if wh.is_group:
				frappe.throw(_("{0} is a group warehouse. Choose a store, not a group.").format(warehouse))
			if wh.disabled:
				frappe.throw(_("Warehouse {0} is disabled.").format(warehouse))
			if self.company and wh.company and wh.company != self.company:
				frappe.throw(_("Warehouse {0} belongs to another company.").format(warehouse))
			if wh.store_role not in PROJECT_STORE_ROLES:
				frappe.throw(_("{0} is not a project store. Choose a Project Main Store or Site Store.").format(warehouse))

	def on_update(self):
		"""Keep the warehouse's Projects table in step with this project's warehouse."""
		if self.flags.get("ignore_warehouse_sync"):
			return
		before = self.get_doc_before_save()
		old = (before.get("warehouse") if before else None) or None
		new = (self.warehouse or None)
		if old == new:
			return
		if old:
			_edit_warehouse_projects(old, remove=self.name)
		if new:
			_edit_warehouse_projects(new, add=self.name)

	def _validate_project_manager(self):
		manager = (self.project_manager or "").strip() or None
		old = None if self.is_new() else (frappe.db.get_value("Project", self.name, "project_manager") or None)
		# Closing / reopening goes through api/projects.py, which has its own checks.
		if not self.flags.allow_status_change:
			is_admin, is_pm = _caller_caps()
			problem, manager = manager_rule_problem(
				self.is_new(), is_admin, is_pm, frappe.session.user, old, manager)
			if problem:
				frappe.throw(problem, frappe.PermissionError)
		self.project_manager = manager
		if not manager:
			return
		# Only checked when new or changed, so existing projects stay editable.
		if not self.is_new() and manager == old:
			return
		if PM_ROLE not in set(frappe.get_roles(manager)):
			frappe.throw(_("{0} does not have the Project Manager role.").format(manager))
		if not self.company:
			frappe.throw(_("Set the company before choosing a Project Manager"))
		member = frappe.db.get_value(
			"Books Company Member", {"user": manager, "company": self.company},
			["books_role", "is_company_admin"], as_dict=True)
		problem = project_manager_problem(manager, member)
		if problem:
			frappe.throw(problem)