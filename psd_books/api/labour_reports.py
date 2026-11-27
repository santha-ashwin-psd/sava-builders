"""Sava Phase 2: labour contract reports (Reports page, same screen as the procurement reports). Read-only.

- contract_status(project=None):      one row per contract: task, contractor, status, value, billed %, paid, balance
- employee_wages(from_date, to_date): one row per worker (Labour Worker) from Submitted wages sheets in the range; lines of
                                      people who are not Labour Workers (old sheets made before Workers existed) are left out
- weekly_payments(from_date, to_date): per week: paid to contractors, paid to workers (Labour Workers only, as in employee_wages), total

Rules shared with the screens:
- Paid on a contract = amounts on Paid weekly bills (same as "Paid till now" on the Weekly Bill screen).
- Wages count only Submitted attendance sheets; a sheet is placed in the range by its last day (week_end).
- A weekly bill and an attendance sheet both run Saturday to Friday, so a sheet is placed in the week of its Friday.
- A blank To date means no end date: everything from the From date onwards (a blank From means from the start).
- Every report is limited to the caller's company (a bypass user sees all) and needs read access on the labour doctypes.
- Each report ends with a Total row, like the Asset Register.
"""
import datetime

import frappe
from frappe import _
from frappe.utils import flt, getdate

WAGES_STATUSES = ("Submitted",)


# ---- pure logic (no database) ----
def monday_of(d):
	"""First day (Saturday) of the Saturday to Friday week holding d. Name kept from the Monday to Sunday weeks."""
	d = getdate(d)
	return d - datetime.timedelta(days=(d.weekday() - 5) % 7)


def week_label(week_start):
	m = getdate(week_start)
	s = m + datetime.timedelta(days=6)
	return "{} to {}".format(m.strftime("%d %b"), s.strftime("%d %b %Y"))


def build_contract_status(contracts, paid, project_names=None, activity_names=None, contractor_names=None):
	"""contracts: dicts with name, project, activity, contractor, status, contract_value.
	paid: {contract: amount on Paid bills}. Names maps fall back to the code."""
	project_names = project_names or {}
	activity_names = activity_names or {}
	contractor_names = contractor_names or {}
	rows = []
	for c in contracts:
		value, p = flt(c.get("contract_value")), flt(paid.get(c["name"]))
		rows.append({
			"contract": c["name"], "project": c.get("project") or "",
			"project_name": project_names.get(c.get("project")) or c.get("project") or "",
			"task": activity_names.get(c.get("activity")) or c.get("activity") or "",
			"contractor_name": contractor_names.get(c.get("contractor")) or c.get("contractor") or "",
			"status": c.get("status") or "",
			"contract_value": value, "billed_pct": round(p / value * 100, 1) if value > 0 else 0.0,
			"paid_value": p, "balance_value": value - p,
		})
	if rows:
		value, p = sum(r["contract_value"] for r in rows), sum(r["paid_value"] for r in rows)
		rows.append({"contract": "Total", "project": "", "project_name": "", "task": "", "contractor_name": "", "status": "",
			"contract_value": value, "billed_pct": round(p / value * 100, 1) if value > 0 else 0.0,
			"paid_value": p, "balance_value": value - p})
	return rows


def build_employee_wages(lines):
	"""lines: dicts with employee, employee_name, id_no, worker_id_no, week_end, days, rate, ot_amount, sha, total (one per sheet line).
	Days, OT, SHA and net wages are added up; the rate shown is the one on the latest week.
	ID No. shown = the worker's ID No. on the Workers screen (worker_id_no), else the ID No. on the latest sheet line that has one,
	else the employee code."""
	acc = {}
	for ln in lines:
		key = ln.get("employee") or ln.get("id_no") or ln.get("employee_name") or ""
		a = acc.setdefault(key, {"id_no": "", "employee": ln.get("employee_name") or ln.get("employee") or "", "days": 0,
			"rate": 0.0, "ot_amount": 0.0, "sha": 0.0, "net_wages": 0.0, "_last": None,
			"_code": ln.get("employee") or "", "_master_id": "", "_line_id": "", "_line_id_week": ""})
		a["days"] += int(flt(ln.get("days")))
		a["ot_amount"] += flt(ln.get("ot_amount"))
		a["sha"] += flt(ln.get("sha"))
		a["net_wages"] += flt(ln.get("total"))
		we = str(ln.get("week_end") or "")
		if a["_last"] is None or we >= a["_last"]:
			a["_last"], a["rate"] = we, flt(ln.get("rate"))
		a["_master_id"] = a["_master_id"] or (ln.get("worker_id_no") or "").strip()
		line_id = (ln.get("id_no") or "").strip()
		if line_id and we >= a["_line_id_week"]:
			a["_line_id"], a["_line_id_week"] = line_id, we
	rows = sorted(acc.values(), key=lambda r: (r["employee"] or "").lower())
	for r in rows:
		r["id_no"] = r["_master_id"] or r["_line_id"] or r["_code"]
		for k in ("_last", "_code", "_master_id", "_line_id", "_line_id_week"):
			r.pop(k)
	if rows:
		rows.append({"id_no": "", "employee": "Total", "days": sum(r["days"] for r in rows), "rate": None,
			"ot_amount": sum(r["ot_amount"] for r in rows), "sha": sum(r["sha"] for r in rows),
			"net_wages": sum(r["net_wages"] for r in rows)})
	return rows


def build_weekly_payments(bills, sheets):
	"""bills: dicts with week_start (Saturday), amount (Paid bill total).
	sheets: dicts with week_end (Friday), amount (Submitted wages total)."""
	weeks = {}
	for b in bills:
		w = monday_of(b["week_start"])
		weeks.setdefault(w, [0.0, 0.0])[0] += flt(b.get("amount"))
	for s in sheets:
		w = monday_of(s["week_end"])
		weeks.setdefault(w, [0.0, 0.0])[1] += flt(s.get("amount"))
	rows = [{"week": week_label(w), "paid_to_contractors": v[0], "paid_to_employees": v[1], "total_for_week": v[0] + v[1]}
		for w, v in sorted(weeks.items())]
	if rows:
		c, e = sum(r["paid_to_contractors"] for r in rows), sum(r["paid_to_employees"] for r in rows)
		rows.append({"week": "Total", "paid_to_contractors": c, "paid_to_employees": e, "total_for_week": c + e})
	return rows


# ---- database ----
def _guard(*doctypes):
	from psd_books.utils.access import assert_can
	for dt in doctypes:
		assert_can(dt, "read")
	from psd_books.invoicing.doctype.labour_weekly_bill.labour_weekly_bill import caller_company
	return caller_company() or None


def _range(from_date, to_date):
	"""A blank From date means from the start, a blank To date means no end (all later weeks too)."""
	f = str(getdate(from_date)) if from_date else "1900-01-01"
	t = str(getdate(to_date)) if to_date else "9999-12-31"
	return f, t


def _company_sql(company, alias):
	return (" and {}.company = %(co)s".format(alias)) if company else ""


@frappe.whitelist(allow_guest=False)
def contract_status(project=None):
	company = _guard("Labour Contract", "Labour Weekly Bill")
	filters = {}
	if project:
		filters["project"] = project
	if company:
		filters["company"] = company
	contracts = frappe.get_all("Labour Contract", filters=filters, order_by="name asc", limit_page_length=0,
		fields=["name", "project", "activity", "contractor", "status", "contract_value"])
	if not contracts:
		return []
	names = [c.name for c in contracts]
	paid = {r[0]: flt(r[1]) for r in frappe.db.sql(
		"""select l.contract, sum(l.amount_to_pay) from `tabLabour Weekly Bill Line` l
		join `tabLabour Weekly Bill` b on b.name = l.parent
		where l.contract in %(c)s and b.status = 'Paid' group by l.contract""", {"c": tuple(names)})}
	pn = {p.name: p.project_name for p in frappe.get_all("Project", fields=["name", "project_name"], limit_page_length=0)}
	an = {a.name: a.activity_name for a in frappe.get_all("Labour Activity", fields=["name", "activity_name"], limit_page_length=0)}
	cn = {c.name: c.contractor_name for c in frappe.get_all("Labour Contractor", fields=["name", "contractor_name"], limit_page_length=0)}
	return build_contract_status(contracts, paid, pn, an, cn)


@frappe.whitelist(allow_guest=False)
def employee_wages(from_date=None, to_date=None):
	company = _guard("Labour Attendance Sheet")
	f, t = _range(from_date, to_date)
	lines = frappe.db.sql(
		"""select l.employee, l.employee_name, l.id_no, w.id_no as worker_id_no, s.week_end, l.days, l.rate, l.ot_amount, l.sha, l.total
		from `tabLabour Attendance Line` l join `tabLabour Attendance Sheet` s on s.name = l.parent
		join `tabLabour Worker` w on w.name = l.employee
		where s.status in %(st)s and s.week_end between %(f)s and %(t)s""" + _company_sql(company, "s"),
		{"st": WAGES_STATUSES, "f": f, "t": t, "co": company}, as_dict=True)
	return build_employee_wages(lines)


@frappe.whitelist(allow_guest=False)
def weekly_payments(from_date=None, to_date=None):
	company = _guard("Labour Weekly Bill", "Labour Attendance Sheet")
	f, t = _range(from_date, to_date)
	bills = frappe.db.sql(
		"""select b.week_start, sum(l.amount_to_pay) as amount
		from `tabLabour Weekly Bill Line` l join `tabLabour Weekly Bill` b on b.name = l.parent
		where b.status = 'Paid' and b.week_start between %(f)s and %(t)s""" + _company_sql(company, "b")
		+ " group by b.week_start", {"f": f, "t": t, "co": company}, as_dict=True)
	sheets = frappe.db.sql(
		"""select s.week_end, sum(l.total) as amount
		from `tabLabour Attendance Line` l join `tabLabour Attendance Sheet` s on s.name = l.parent
		join `tabLabour Worker` w on w.name = l.employee
		where s.status in %(st)s and s.week_end between %(f)s and %(t)s""" + _company_sql(company, "s")
		+ " group by s.week_end", {"st": WAGES_STATUSES, "f": f, "t": t, "co": company}, as_dict=True)
	return build_weekly_payments(bills, sheets)