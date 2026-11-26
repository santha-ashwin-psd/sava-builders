"""Labour Worker master (Sava Phase 2, Labour Contract > Workers).

A person paid on the Weekly Wages sheet. Name, ID No. (optional, but unique when given), Skilled / Unskilled, Rate per Day
(KES, the screen asks for it; a new wages sheet starts each worker on this rate) and Status (Active / Inactive). Only Active workers are listed on a new Weekly Wages sheet. A worker already on a wages sheet can be
made Inactive but not deleted.
"""
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import flt

SKILLS = ("Skilled", "Unskilled")
STATUSES = ("Active", "Inactive")
# The wages sheet stores the grade as SK / C.
GRADE_OF_SKILL = {"Skilled": "SK", "Unskilled": "C"}


def clean_id(v):
	"""ID No. without surrounding or doubled spaces; None when blank."""
	return " ".join(str(v or "").split()) or None


def used_on_sheets(worker):
	"""Wages sheets (lines) that use this worker."""
	if not frappe.db.table_exists("Labour Attendance Line"):
		return []
	return frappe.db.sql_list("select distinct parent from `tabLabour Attendance Line` where employee = %s", worker)


class LabourWorker(Document):
	def before_validate(self):
		if not self.get("company"):
			from psd_books.utils.tenancy import _is_bypass, get_user_company
			if not _is_bypass(frappe.session.user):
				self.company = get_user_company(frappe.session.user) or ""

	def validate(self):
		self.worker_name = " ".join((self.worker_name or "").split())
		self.id_no = clean_id(self.id_no)
		if not self.worker_name:
			frappe.throw(_("Worker Name is required"))
		if self.skill not in SKILLS:
			frappe.throw(_("Skilled / Unskilled must be one of: {0}").format(", ".join(SKILLS)))
		if flt(getattr(self, "rate", 0)) < 0:
			frappe.throw(_("Rate per Day can't be negative"))
		if self.status not in STATUSES:
			frappe.throw(_("Status must be one of: {0}").format(", ".join(STATUSES)))
		if self.id_no:
			dup = frappe.db.sql(
				"select name, worker_name from `tabLabour Worker` where lower(id_no) = %s and name != %s limit 1",
				(self.id_no.lower(), self.name or ""))
			if dup:
				frappe.throw(_("ID No. {0} already belongs to {1} ({2})").format(self.id_no, dup[0][1], dup[0][0]))

	def on_trash(self):
		used = used_on_sheets(self.name)
		if used:
			frappe.throw(_("Delete is blocked: {0} is on wages sheet {1}. Make the worker Inactive instead.")
				.format(self.worker_name, ", ".join(used[:5])))