"""Labour Attendance Sheet (Sava Phase 2, Labour Contract > Attendance). Follows the client's paper "Weekly Wages Payment Sheet".

One sheet per week for the whole company. The week runs Saturday to Friday (any date can be given; it is moved to the Saturday).
- Lines: every Active employee. A new employee added mid-week joins a Draft / Sent back sheet the next time it is opened or saved.
  A line starts with the values of the employee's line on the latest earlier sheet (grade, area of work, rate, OT hours, SHA);
  the user can edit them. Day ticks are never copied. With no earlier line: grade C, rate 0, OT 0, SHA 125.
- Per line: Days = ticks; OT amount = OT hours x rate / 8 (2 decimals); Total = days x rate + OT amount - SHA, rounded to the
  whole shilling (half up). An employee with no days and no OT gets Total 0 (no SHA is deducted).
- Status: Draft -> Pending approval -> Approved -> Submitted. A Director approves or sends it back (Sent back, editable again).
  Approved is locked; Submitted is final. Statuses are set only through the workflow (doc.flags.las_workflow).
- Blocked on send and approve: nobody has a day or OT; a paid employee has no rate; a total below zero.
- Delete only while the sheet was never sent for approval.
"""
import datetime
from decimal import ROUND_HALF_UP, Decimal

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import flt

DOCTYPE = "Labour Attendance Sheet"
DRAFT, PENDING, APPROVED, SUBMITTED, SENT_BACK = "Draft", "Pending approval", "Approved", "Submitted", "Sent back"
SENDABLE = (DRAFT, SENT_BACK)
LOCKED = (PENDING, APPROVED, SUBMITTED)
APPROVER_ROLE = "Director"
DAYS = ("d_sat", "d_sun", "d_mon", "d_tue", "d_wed", "d_thu", "d_fri")
INPUT_KEYS = ("grade", "area_of_work") + DAYS + ("rate", "ot_hours", "sha")
CARRY_KEYS = ("grade", "area_of_work", "rate", "ot_hours", "sha")
LINE_KEYS = ("employee", "employee_name", "id_no") + INPUT_KEYS
DEFAULT_GRADE, DEFAULT_SHA = "C", 125


# ---- pure helpers (no database) ----
def saturday_of(d):
	"""The Saturday of the Saturday-to-Friday week holding date d (date or YYYY-MM-DD string)."""
	d = d if isinstance(d, datetime.date) else datetime.date.fromisoformat(str(d)[:10])
	return d - datetime.timedelta(days=(d.weekday() - 5) % 7)


def friday_of(d):
	return saturday_of(d) + datetime.timedelta(days=6)


def _half_up(x, places=0):
	return Decimal(repr(float(x))).quantize(Decimal(1).scaleb(-places), rounding=ROUND_HALF_UP)


def days_of(line):
	return sum(1 for k in DAYS if flt(line.get(k)))


def figures(line):
	"""Days, OT amount and Total of one line (dict or row)."""
	days, rate, sha = days_of(line), flt(line.get("rate")), flt(line.get("sha"))
	ot_amount = float(_half_up(flt(line.get("ot_hours")) * rate / 8, 2))
	total = 0 if (days == 0 and ot_amount == 0) else int(_half_up(days * rate + ot_amount - sha))
	return {"days": days, "ot_amount": ot_amount, "total": total}


def _label(line):
	return line.get("employee_name") or line.get("employee")


def line_errors(lines):
	out = []
	for ln in lines:
		for key, name in (("rate", _("Rate per day")), ("ot_hours", _("OT hours")), ("sha", _("SHA"))):
			if flt(ln.get(key)) < 0:
				out.append(_("{0} can't be negative for {1}.").format(name, _label(ln)))
	return out


def blockers(lines):
	"""What stops this sheet being sent or approved. lines: dicts with the input keys and totals."""
	out = []
	paid = [ln for ln in lines if days_of(ln) > 0 or flt(ln.get("ot_hours")) > 0]
	if not paid:
		out.append(_("Tick attendance for at least one employee."))
	for ln in paid:
		if flt(ln.get("rate")) <= 0:
			out.append(_("Rate per day is missing for {0}.").format(_label(ln)))
		elif figures(ln)["total"] < 0:
			out.append(_("The total for {0} is below zero: SHA is more than the wage.").format(_label(ln)))
	return out + line_errors(lines)


def merge_lines(saved, baseline):
	"""Rows for the sheet: one per Active employee (baseline) carrying the saved values, plus a saved line of an employee
	who is no longer Active only if it has days ticked. Sorted by employee name."""
	saved_by = {s.get("employee"): s for s in saved}
	out = []
	for b in baseline:
		row = dict(b)
		s = saved_by.get(b["employee"])
		if s:
			for k in INPUT_KEYS:
				row[k] = s.get(k)
		out.append(row)
	active = {b["employee"] for b in baseline}
	out += [{k: s.get(k) for k in LINE_KEYS} for s in saved if s.get("employee") not in active and days_of(s) > 0]
	out.sort(key=lambda r: (r.get("employee_name") or "").lower())
	return out


def check_edit(doc, before_status):
	if doc.flags.get("las_workflow"):
		return
	if doc.is_new():
		if doc.status not in (None, "", DRAFT):
			frappe.throw(_("A new sheet starts as Draft"))
		doc.status = DRAFT
		return
	if before_status in LOCKED:
		hint = {PENDING: _("A Director can send it back."), SUBMITTED: _("A submitted sheet is final.")}.get(before_status, "")
		frappe.throw(_("{0} is {1} and can't be edited. {2}").format(doc.name, before_status, hint))
	if doc.status != before_status:
		frappe.throw(_("Status {0} is set by the approval flow, not by editing.").format(doc.status))


def send_for_approval(doc, problems, user):
	if doc.status not in SENDABLE:
		frappe.throw(_("{0} is {1}. Only a Draft or Sent back sheet can be sent for approval.").format(doc.name, doc.status))
	if problems:
		frappe.throw("<br>".join(problems))
	doc.status = PENDING
	doc.raised_by = user
	doc.rejection_reason = None
	doc.flags.las_workflow = True


def approve(doc, problems, user, roles, now):
	if doc.status != PENDING:
		frappe.throw(_("{0} is {1}. Only a sheet pending approval can be approved.").format(doc.name, doc.status))
	if APPROVER_ROLE not in roles:
		frappe.throw(_("Only a Director can approve a Labour Attendance Sheet."))
	if problems:
		frappe.throw("<br>".join(problems))
	doc.status = APPROVED
	doc.approved_by = user
	doc.approved_on = now
	doc.flags.las_workflow = True


def send_back(doc, user, roles, reason):
	reason = (reason or "").strip()
	if doc.status != PENDING:
		frappe.throw(_("{0} is {1}. Only a sheet pending approval can be sent back.").format(doc.name, doc.status))
	if APPROVER_ROLE not in roles:
		frappe.throw(_("Only a Director can send a Labour Attendance Sheet back."))
	if not reason:
		frappe.throw(_("Give a reason for sending the sheet back."))
	doc.status = SENT_BACK
	doc.rejection_reason = reason
	doc.flags.las_workflow = True


def submit(doc, user, now):
	if doc.status != APPROVED:
		frappe.throw(_("{0} is {1}. Only an approved sheet can be submitted.").format(doc.name, doc.status))
	doc.status = SUBMITTED
	doc.submitted_by = user
	doc.submitted_on = now
	doc.flags.las_workflow = True


# ---- database helpers ----
def active_employees(company):
	kw = {"filters": {"status": "Active"}, "fields": ["name", "employee_name", "id_no"], "order_by": "employee_name asc", "limit_page_length": 0}
	if company:
		kw["or_filters"] = [["company", "=", company], ["company", "is", "not set"]]
	return frappe.get_all("Employee", **kw)


def previous_values(week_start, company):
	"""{employee: carried values} from the latest sheet of an earlier week."""
	filters = {"week_start": ["<", week_start]}
	if company:
		filters["company"] = company
	prev = frappe.get_all(DOCTYPE, filters=filters, order_by="week_start desc", limit_page_length=1, pluck="name")
	if not prev:
		return {}
	rows = frappe.db.sql(
		"select employee, grade, area_of_work, rate, ot_hours, sha from `tabLabour Attendance Line` where parent = %s", prev[0], as_dict=True)
	return {r["employee"]: r for r in rows}


def baseline_rows(week_start, company):
	"""One row per Active employee with no days ticked and the values carried from the earlier sheet."""
	prev = previous_values(week_start, company)
	rows = []
	for e in active_employees(company):
		p = prev.get(e["name"])
		row = {"employee": e["name"], "employee_name": e.get("employee_name"), "id_no": e.get("id_no") or "",
			"grade": (p and p.get("grade")) or DEFAULT_GRADE, "area_of_work": (p and p.get("area_of_work")) or "",
			"rate": flt(p.get("rate")) if p else 0, "ot_hours": flt(p.get("ot_hours")) if p else 0,
			"sha": flt(p.get("sha")) if p else DEFAULT_SHA}
		row.update({k: 0 for k in DAYS})
		rows.append(row)
	return rows


def line_dicts(doc):
	return [{k: ln.get(k) for k in LINE_KEYS} for ln in doc.get("lines") or []]


def sync_lines(doc):
	"""Rebuild the lines from the Active employees, keeping what is already entered, and recompute every line."""
	merged = merge_lines(line_dicts(doc), baseline_rows(doc.week_start, doc.get("company")))
	doc.set("lines", [])
	total = 0
	for r in merged:
		r.update(figures(r))
		total += r["total"]
		doc.append("lines", r)
	doc.total_amount = total


def current_blockers(doc):
	"""Blockers from fresh lines (employees refreshed; entries kept)."""
	sync_lines(doc)
	return blockers(line_dicts(doc))


class LabourAttendanceSheet(Document):
	def autoname(self):
		# Plain sequential number (01, 02, ...) with no prefix, counter kept per doctype, same as the Material Request number.
		from psd_books.utils.naming import next_plain_name
		self.name = next_plain_name(self.doctype, reuse_deleted=True)

	def before_validate(self):
		if not self.get("company"):
			from psd_books.utils.tenancy import _is_bypass, get_user_company
			if not _is_bypass(frappe.session.user):
				self.company = get_user_company(frappe.session.user) or ""

	def validate(self):
		before = None if self.is_new() else frappe.db.get_value(DOCTYPE, self.name, "status")
		check_edit(self, before)
		if self.flags.get("las_workflow"):
			return
		if not self.week_start:
			frappe.throw(_("Pick a date in the week"))
		ws = saturday_of(self.week_start)
		self.week_start, self.week_end = ws, friday_of(ws)
		filters = {"week_start": ws, "name": ["!=", self.name or ""]}
		if self.get("company"):
			filters["company"] = self.company
		dup = frappe.get_all(DOCTYPE, filters=filters, pluck="name")
		if dup:
			frappe.throw(_("There is already a sheet {0} for the week starting {1}.").format(dup[0], ws))
		sync_lines(self)
		errs = line_errors(line_dicts(self))
		if errs:
			frappe.throw("<br>".join(errs))

	def on_trash(self):
		if self.status != DRAFT or self.raised_by:
			frappe.throw(_("Delete is blocked. A sheet that was sent for approval can't be deleted."))