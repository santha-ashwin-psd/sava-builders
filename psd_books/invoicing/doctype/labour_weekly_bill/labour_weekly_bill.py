"""Labour Weekly Bill (Sava Phase 2, Labour Contract > Weekly Bill). Prototype v11.

A bill is not tied to one project: it lists every Approved contract of the caller's company (contracts of a Closed project
are left out), whatever its project or dates, and a project can have any number of bills in the same week (Saturday to
Friday, like the weekly wages sheet; any date in the week can be given, it is moved to the Saturday). The user enters the amount to pay now on each. The lines are made by the system; the user only edits the amounts.
- Paid till now = amounts on other Paid bills; balance = contract value - paid - amounts on other bills
  still Pending approval or Approved (approved but not yet marked Paid). An amount can't be below zero or above the balance (checked on save, send and approve).
- Status: Draft -> Pending approval -> Approved -> Paid; a Director can send it back (Sent back, editable again).
  Only a Director approves and a Director, Purchase Manager or Admin marks an Approved bill Paid (the payment is recorded then, not on approval). Statuses are set only through the workflow (doc.flags.lwb_workflow).
- Pending approval, Approved, Paid and Cancelled bills are locked.
- Reversing (Director only): Edit reopens an Approved bill to Draft (approval cleared, send for approval again); Mark Unpaid
  moves a Paid bill back to Approved; Cancel (Approved only, reason required) sets Cancelled, which counts nowhere (not in paid, balance or
  the week); Amend makes a new Draft from a Cancelled bill (amended_from). Delete only a Draft never sent, or a Cancelled bill.
- Blocked on send and on approve: no amount above zero; a contractor paid on the bill has an expired tax
  certificate or is inactive.
- A contract can be paid once a week: an amount above zero on a contract is refused when another bill of the same week
  (Saturday to Friday) already holds an amount on it (checked on save, send and approve). Pending approval, Approved and Paid
  bills always count; a Draft counts only against bills created after it (the first Draft keeps the contract), so two
  drafts can't both claim it. A Sent back bill does not reserve the week.
- A new bill can be made for a past week, but only for contracts with nothing paid so far (paid till now 0); a contract that already has
  payments can't be paid on a new bill of a past week (checked when a new bill is saved).
- A contract of a Closed project is not listed, so it can't be paid. Delete only while never sent for approval.
"""
import datetime

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import flt, getdate, nowdate

DRAFT, PENDING, APPROVED, SENT_BACK, PAID, CANCELLED = "Draft", "Pending approval", "Approved", "Sent back", "Paid", "Cancelled"
SENDABLE = (DRAFT, SENT_BACK)
LOCKED = (PENDING, APPROVED, PAID, CANCELLED)
APPROVER_ROLE = "Director"
# Who may mark an Approved bill Paid (record the payment): a Director, a Purchase Manager or an Admin.
PAYER_ROLES = ("Director", "Purchase Manager", "Admin")


# ---- pure helpers (no database) ----
def monday_of(d):
	"""The first day of the week holding date d (date or YYYY-MM-DD string). Weeks run Saturday to Friday, so this is the Saturday.
	The name is kept from when weeks ran Monday to Sunday."""
	d = d if isinstance(d, datetime.date) else datetime.date.fromisoformat(str(d)[:10])
	return d - datetime.timedelta(days=(d.weekday() - 5) % 7)


def sunday_of(d):
	"""The last day of the week holding date d: the Friday (name kept from the Monday to Sunday weeks)."""
	return monday_of(d) + datetime.timedelta(days=6)


def is_past_week(d, today=None):
	"""True when the week holding date d ended before the current week (Saturday to Friday)."""
	return monday_of(d) < monday_of(today or nowdate())


def past_week_errors(lines, week_start, today=None):
	"""Messages for lines that pay a contract with payments already (paid_till_now above zero) on a bill of a past week."""
	if not is_past_week(week_start, today):
		return []
	return [_("Contract {0} already has payments, so it can't be paid on a bill of a past week.").format(ln.get("contract"))
		for ln in lines if flt(ln.get("amount_to_pay")) > 0 and flt(ln.get("paid_till_now")) > 0.005]


def balance_of(value, paid, pending):
	return flt(value) - flt(paid) - flt(pending)


def amount_errors(lines):
	"""Messages for lines whose amount is below zero or above the balance. lines: dicts with contract, amount_to_pay, balance."""
	out = []
	for ln in lines:
		amt = flt(ln.get("amount_to_pay"))
		if amt < 0:
			out.append(_("Amount for contract {0} can't be negative.").format(ln.get("contract")))
		elif amt > flt(ln.get("balance")) + 0.005:
			out.append(_("Amount for contract {0} is above its balance of {1}.").format(ln.get("contract"), flt(ln.get("balance"))))
	return out


def week_errors(lines, paid_elsewhere):
	"""Messages for lines that pay a contract already held this week by another bill. paid_elsewhere: {contract: bill name}."""
	out = []
	for ln in lines:
		bill = paid_elsewhere.get(ln.get("contract"))
		if bill and flt(ln.get("amount_to_pay")) > 0:
			out.append(_("Contract {0} is already on bill {1} this week. A contract can be paid once a week.").format(ln.get("contract"), bill))
	return out


def blockers(lines, contractors, today=None):
	"""What stops this bill being sent or approved. contractors: {name: dict(disabled, tax_cert_expiry, contractor_name)}."""
	today = getdate(today or nowdate())
	out = []
	paid_lines = [ln for ln in lines if flt(ln.get("amount_to_pay")) > 0]
	if not paid_lines:
		out.append(_("Enter an amount to pay on at least one contract."))
	for ln in paid_lines:
		c = contractors.get(ln.get("contractor")) or {}
		label = c.get("contractor_name") or ln.get("contractor")
		if c.get("disabled"):
			out.append(_("Contractor {0} is inactive.").format(label))
		exp = c.get("tax_cert_expiry")
		if exp and getdate(exp) < today:
			out.append(_("Certificate of {0} expired on {1}. New contracts and bills are blocked for this contractor.").format(label, exp))
	return out + amount_errors(lines)


def check_edit(doc, before_status):
	if doc.flags.get("lwb_workflow"):
		return
	if doc.is_new():
		if doc.status not in (None, "", DRAFT):
			frappe.throw(_("A new bill starts as Draft"))
		doc.status = DRAFT
		return
	if before_status in LOCKED:
		frappe.throw(_("{0} is {1} and can't be edited. {2}").format(
			doc.name, before_status, _("A Director can send it back.") if before_status == PENDING else ""))
	if doc.status != before_status:
		frappe.throw(_("Status {0} is set by the approval flow, not by editing.").format(doc.status))


def send_for_approval(doc, problems, user):
	if doc.status not in SENDABLE:
		frappe.throw(_("{0} is {1}. Only a Draft or Sent back bill can be sent for approval.").format(doc.name, doc.status))
	if problems:
		frappe.throw("<br>".join(problems))
	doc.status = PENDING
	doc.raised_by = user
	doc.rejection_reason = None
	doc.flags.lwb_workflow = True


def approve(doc, problems, user, roles, now):
	if doc.status != PENDING:
		frappe.throw(_("{0} is {1}. Only a bill pending approval can be approved.").format(doc.name, doc.status))
	if APPROVER_ROLE not in roles:
		frappe.throw(_("Only a Director can approve a Labour Weekly Bill."))
	if problems:
		frappe.throw("<br>".join(problems))
	doc.status = APPROVED
	doc.approved_by = user
	doc.approved_on = now
	doc.flags.lwb_workflow = True


def mark_paid(doc, user, roles, now):
	"""Approved -> Paid: the payment is recorded. Director, Purchase Manager or Admin."""
	if doc.status != APPROVED:
		frappe.throw(_("{0} is {1}. Only an Approved bill can be marked Paid.").format(doc.name, doc.status))
	if not set(PAYER_ROLES) & set(roles):
		frappe.throw(_("Only a Director, Purchase Manager or Admin can mark a Labour Weekly Bill as Paid."))
	doc.status = PAID
	doc.paid_by = user
	doc.paid_on = now
	doc.flags.lwb_workflow = True


def _director(roles, what):
	if APPROVER_ROLE not in roles:
		frappe.throw(_("Only a Director can {0} a Labour Weekly Bill.").format(what))


def reopen(doc, user, roles):
	"""Approved -> Draft so the amounts can be edited; approval is cleared and the bill must be sent for approval again. Director only."""
	if doc.status != APPROVED:
		frappe.throw(_("{0} is {1}. Only an Approved bill can be reopened for editing.").format(doc.name, doc.status))
	_director(roles, "reopen")
	doc.status = DRAFT
	doc.approved_by = None
	doc.approved_on = None
	doc.rejection_reason = None
	doc.flags.lwb_workflow = True


def mark_unpaid(doc, user, roles):
	"""Paid -> Approved: the payment is reversed. Director only."""
	if doc.status != PAID:
		frappe.throw(_("{0} is {1}. Only a Paid bill can be marked unpaid.").format(doc.name, doc.status))
	_director(roles, "mark as unpaid")
	doc.status = APPROVED
	doc.paid_by = None
	doc.paid_on = None
	doc.flags.lwb_workflow = True


def cancel(doc, user, roles, reason, now):
	"""Approved -> Cancelled (a Paid bill must be marked unpaid first). Reason required. Director only."""
	reason = (reason or "").strip()
	if doc.status == PAID:
		frappe.throw(_("{0} is Paid. Mark it unpaid before cancelling.").format(doc.name))
	if doc.status != APPROVED:
		frappe.throw(_("{0} is {1}. Only an Approved bill can be cancelled.").format(doc.name, doc.status))
	_director(roles, "cancel")
	if not reason:
		frappe.throw(_("Give a reason for cancelling the bill."))
	doc.status = CANCELLED
	doc.cancel_reason = reason
	doc.cancelled_by = user
	doc.cancelled_on = now
	doc.flags.lwb_workflow = True


def can_delete(status, raised_by):
	"""A Draft never sent for approval, a Sent back bill, or a Cancelled bill."""
	return status in (CANCELLED, SENT_BACK) or (status == DRAFT and not raised_by)


def send_back(doc, user, roles, reason):
	reason = (reason or "").strip()
	if doc.status != PENDING:
		frappe.throw(_("{0} is {1}. Only a bill pending approval can be sent back.").format(doc.name, doc.status))
	if APPROVER_ROLE not in roles:
		frappe.throw(_("Only a Director can send a Labour Weekly Bill back."))
	if not reason:
		frappe.throw(_("Give a reason for sending the bill back."))
	doc.status = SENT_BACK
	doc.rejection_reason = reason
	doc.flags.lwb_workflow = True


# ---- database helpers ----
def approved_contracts(project=None, company=None, week_end=None):
	"""Approved contracts, all projects unless project is given, limited to the company when given. Contracts of a Closed project are left out.
	When week_end (the Friday of the bill week) is given, a contract that starts after it is left out; the end date is not checked."""
	filters = {"status": "Approved"}
	if project:
		filters["project"] = project
	if company:
		filters["company"] = company
	rows = frappe.get_all("Labour Contract", filters=filters, fields=["name", "contractor", "contract_value", "project", "start_date"], order_by="name asc")
	if week_end:
		week_end = getdate(week_end)
		rows = [c for c in rows if not c.get("start_date") or getdate(c.start_date) <= week_end]
	closed = set(frappe.get_all("Project", filters={"status": "Closed"}, pluck="name")) if rows else set()
	return [c for c in rows if c.project not in closed]


def caller_company():
	"""The caller's company, or None for a bypass user (sees every company)."""
	from psd_books.utils.tenancy import get_user_company, _is_bypass
	return None if _is_bypass(frappe.session.user) else (get_user_company(frappe.session.user) or "")


def committed_totals(contracts, exclude_bill=None):
	"""{contract: {"paid": amount on other Paid bills, "pending": amount on other Pending approval or Approved (not yet Paid) bills}}."""
	out = {c: {"paid": 0.0, "pending": 0.0} for c in contracts}
	if not contracts:
		return out
	rows = frappe.db.sql(
		"""select l.contract, b.status, sum(l.amount_to_pay) from `tabLabour Weekly Bill Line` l
		join `tabLabour Weekly Bill` b on b.name = l.parent
		where l.contract in %(c)s and b.name != %(n)s and b.status in ('Paid', 'Approved', 'Pending approval')
		group by l.contract, b.status""", {"c": tuple(contracts), "n": exclude_bill or ""})
	for contract, status, amt in rows:
		out[contract]["paid" if status == PAID else "pending"] += flt(amt)
	return out


def paid_this_week(contracts, week_start, exclude_bill=None, creation=None):
	"""{contract: bill name} for contracts with an amount above zero on another bill of the week that holds it: any Pending
	approval, Approved or Paid bill, and any Draft created before this bill (creation; None for a new bill = every Draft)."""
	out = {}
	if not contracts:
		return out
	rows = frappe.db.sql(
		"""select l.contract, b.name from `tabLabour Weekly Bill Line` l
		join `tabLabour Weekly Bill` b on b.name = l.parent
		where l.contract in %(c)s and b.week_start = %(w)s and b.name != %(n)s and l.amount_to_pay > 0
		and (b.status in ('Paid', 'Approved', 'Pending approval') or (b.status = 'Draft' and (%(cr)s is null or b.creation < %(cr)s)))
		order by b.name""", {"c": tuple(contracts), "w": monday_of(week_start), "n": exclude_bill or "", "cr": creation})
	for contract, bill in rows:
		out.setdefault(contract, bill)
	return out


def week_problems(doc):
	lines = line_dicts(doc)
	return week_errors(lines, paid_this_week([ln["contract"] for ln in lines if flt(ln.get("amount_to_pay")) > 0], doc.week_start,
		None if doc.is_new() else doc.name, None if doc.is_new() else doc.get("creation")))


def contractor_infos(names):
	rows = frappe.get_all("Labour Contractor", filters={"name": ["in", list(names) or [""]]},
		fields=["name", "contractor_name", "disabled", "tax_cert_expiry"])
	return {r.name: r for r in rows}


def figures(project=None, exclude_bill=None, company=None, week_end=None):
	"""One dict per Approved contract (of the project when given, else all) with project, value, paid, pending and balance."""
	cons = approved_contracts(project, company, week_end)
	tot = committed_totals([c.name for c in cons], exclude_bill)
	return [{"contract": c.name, "project": getattr(c, "project", None), "contractor": c.contractor, "contract_value": flt(c.contract_value),
		"paid_till_now": tot[c.name]["paid"], "pending_amount": tot[c.name]["pending"],
		"balance": balance_of(c.contract_value, tot[c.name]["paid"], tot[c.name]["pending"])} for c in cons]


def sync_lines(doc):
	"""Rebuild the lines from the Approved contracts of the company (all projects), keeping the amounts already entered.
	Returns the contracts that had an amount above zero but are no longer listed (not Approved, or project Closed); their lines are dropped."""
	keep = {ln.contract: flt(ln.amount_to_pay) for ln in doc.get("lines") or []}
	doc.set("lines", [])
	week_end = sunday_of(monday_of(doc.week_start)) if doc.get("week_start") else None
	for fg in figures(None, doc.name if not doc.is_new() else None, doc.get("company") or None, week_end):
		fg.pop("project", None)
		fg["amount_to_pay"] = keep.pop(fg["contract"], 0)
		doc.append("lines", fg)
	doc.total_amount = sum(flt(ln.amount_to_pay) for ln in doc.lines)
	return [c for c, amt in keep.items() if amt > 0]


def dropped_message(dropped):
	return _("Contract {0} is no longer Approved, its project is Closed, or it starts after this week, so it can't be paid on this bill.").format(", ".join(dropped))


def line_dicts(doc):
	return [{"contract": ln.contract, "contractor": ln.contractor, "amount_to_pay": ln.amount_to_pay, "balance": ln.balance,
		"paid_till_now": ln.get("paid_till_now")}
		for ln in doc.get("lines") or []]


def list_columns(lines, contract_projects=None):
	"""Weekly Bill list columns from stored line rows [{parent, contract, balance, amount_to_pay}] in line order.
	Only lines being paid on the bill (amount above zero) count. Per bill: the contracts paid, the projects of those
	contracts (contract_projects: {contract: project}), and the balance still to pay on them after this bill
	(line balance - amount to pay now). Bills with nothing paid are left out."""
	contract_projects = contract_projects or {}
	out = {}
	for ln in lines:
		if flt(ln.get("amount_to_pay")) <= 0:
			continue
		o = out.setdefault(ln.get("parent"), {"contracts": [], "projects": [], "balance_after": 0.0})
		o["contracts"].append(ln.get("contract"))
		p = contract_projects.get(ln.get("contract"))
		if p and p not in o["projects"]:
			o["projects"].append(p)
		o["balance_after"] += flt(ln.get("balance")) - flt(ln.get("amount_to_pay"))
	return out


def current_blockers(doc):
	"""Blockers from fresh figures (the lines are refreshed first; amounts are kept)."""
	dropped = sync_lines(doc)
	out = blockers(line_dicts(doc), contractor_infos({ln.contractor for ln in doc.lines})) + week_problems(doc)
	return ([dropped_message(dropped)] if dropped else []) + out


class LabourWeeklyBill(Document):
	def autoname(self):
		# Plain sequential number (01, 02, ...) with no prefix, counter kept per doctype, same as the Material Request number.
		from psd_books.utils.naming import next_plain_name
		self.name = next_plain_name(self.doctype, reuse_deleted=True)

	def before_validate(self):
		if not self.get("company"):
			from psd_books.utils.tenancy import get_user_company, _is_bypass
			if not _is_bypass(frappe.session.user):
				self.company = get_user_company(frappe.session.user) or ""

	def validate(self):
		before = None if self.is_new() else frappe.db.get_value("Labour Weekly Bill", self.name, "status")
		check_edit(self, before)
		if self.flags.get("lwb_workflow"):
			return
		if not self.week_start:
			frappe.throw(_("Pick a date in the week"))
		ws = monday_of(self.week_start)
		self.week_start, self.week_end = ws, sunday_of(ws)
		self.project = None  # a bill covers contracts of every project
		dropped = sync_lines(self)
		if dropped:
			frappe.throw(dropped_message(dropped))
		errs = amount_errors(line_dicts(self)) + week_problems(self)
		if self.is_new():
			errs += past_week_errors(line_dicts(self), ws)
		if errs:
			frappe.throw("<br>".join(errs))

	def on_trash(self):
		if not can_delete(self.status, self.raised_by):
			frappe.throw(_("Delete is blocked. Only a Draft never sent for approval, a Sent back bill, or a Cancelled bill, can be deleted."))