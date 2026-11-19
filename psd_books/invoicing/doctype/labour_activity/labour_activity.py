"""Labour Activity master (Sava Phase 2, Labour Contract > Activities).

A kind of work that can be contracted out (Painting house, Blockwork, Plastering...). Only one
activity may exist per name (case-insensitive). The code (ACT-001...) is the record name and
can't be changed once saved. An activity used on a Labour Contract can be made inactive but not
deleted. The one-contract-per-activity-per-project rule belongs to the Contract step.
"""
import re

import frappe
from frappe import _
from frappe.model.document import Document

CATEGORIES = ("Finishing", "Structure", "Services", "Site works")
_CODE_RE = re.compile(r"^[A-Z0-9][A-Z0-9-]*$")


def next_activity_code():
	"""Next free ACT-### (highest existing number + 1)."""
	top = 0
	for n in frappe.db.sql_list("select name from `tabLabour Activity` where name like %s", "ACT-%"):
		m = re.match(r"^ACT-(\d+)$", n or "")
		if m:
			top = max(top, int(m.group(1)))
	return "ACT-%03d" % (top + 1)


def used_on(activity):
	"""Labour Contracts that use this activity (empty until the Labour Contract doctype exists).
	The Contract step must store the activity in a link field named `activity`."""
	if not frappe.db.table_exists("Labour Contract"):
		return []
	return frappe.get_all("Labour Contract", filters={"activity": activity}, pluck="name")


class LabourActivity(Document):
	def before_insert(self):
		self._normalise()
		if not self.activity_code:
			self.activity_code = next_activity_code()

	def before_validate(self):
		if not self.get("company"):
			from psd_books.utils.tenancy import get_user_company, _is_bypass
			if not _is_bypass(frappe.session.user):
				self.company = get_user_company(frappe.session.user) or ""

	def validate(self):
		self._normalise()
		if not self.activity_name:
			frappe.throw(_("Activity Name is required"))
		if not self.activity_code:
			frappe.throw(_("Code is required"))
		if not _CODE_RE.match(self.activity_code):
			frappe.throw(_("Invalid code: {0}. Use letters, digits and dashes, e.g. ACT-004").format(self.activity_code))
		if self.category not in CATEGORIES:
			frappe.throw(_("Category must be one of: {0}").format(", ".join(CATEGORIES)))
		dup = frappe.db.sql(
			"select name from `tabLabour Activity` where lower(activity_name) = %s and name != %s limit 1",
			(self.activity_name.lower(), self.name or ""),
		)
		if dup:
			frappe.throw(_("An activity named {0} already exists ({1})").format(self.activity_name, dup[0][0]))

	def on_trash(self):
		used = used_on(self.name)
		if used:
			frappe.throw(_("Delete is blocked: {0} is used on contract {1}. Deactivate it instead.")
				.format(self.activity_name, ", ".join(used)))

	def _normalise(self):
		self.activity_code = (self.activity_code or "").strip().upper()
		self.activity_name = " ".join((self.activity_name or "").split())