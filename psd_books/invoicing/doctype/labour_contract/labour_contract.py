"""Labour Contract (Sava Phase 2, Labour Contract > Contract). Prototype v11.

One contract = one task/activity on one project, given to one contractor for one contract value.
- Status: Draft -> Pending approval -> Approved -> Closed; a Director can send it back (Sent back),
  after which it is editable and can be sent again. Only a Director approves.
- Delete: a Draft never sent for approval, or a Closed contract (Director only, and only if no weekly bill line uses it).
- Closed -> Approved: only a Director can reopen a Closed contract (not when its project is Closed).
- Statuses other than Draft are set only through the workflow (doc.flags.lc_workflow, api/labour_contract.py).
- Pending approval, Approved and Closed are locked: no edits (so the value cannot change once approved).
- Blocked on send and on approve: contractor's tax certificate expired or contractor inactive, contractor
  contract value not above zero. A contractor may hold any number of open contracts.
- An activity is used on one contract only, ever: another contract (any project, any status, Closed included) on the
  same activity is refused. Checked on new contracts and when the activity is changed. A deleted draft frees its activity.
- Delete only while the contract was never sent for approval; afterwards close it instead.
- Closed project: a contract can't be created or edited on it (approve, send back and close still work).
Paying beyond the contract value belongs to the Weekly Bill step.
"""
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import flt, getdate, nowdate

DRAFT, PENDING, APPROVED, SENT_BACK, CLOSED = "Draft", "Pending approval", "Approved", "Sent back", "Closed"
STATUSES = (DRAFT, PENDING, APPROVED, SENT_BACK, CLOSED)
SENDABLE = (DRAFT, SENT_BACK)
LOCKED = (PENDING, APPROVED, CLOSED)
APPROVER_ROLE = "Director"


def blockers(doc, contractor, today=None):
	"""Messages that stop this contract being sent or approved (empty list when fine).
	contractor: dict(name, disabled, tax_cert_expiry) or None."""
	today = getdate(today or nowdate())
	out = []
	if not contractor:
		out.append(_("Contractor {0} not found.").format(doc.contractor))
	else:
		if contractor.get("disabled"):
			out.append(_("Contractor {0} is inactive.").format(contractor.get("name")))
		exp = contractor.get("tax_cert_expiry")
		if exp and getdate(exp) < today:
			out.append(_("Certificate expired on {0}. New contracts and bills are blocked for this contractor.").format(exp))
	if not flt(doc.contract_value) > 0:
		out.append(_("Enter the contract value."))
	return out


def check_dates(doc):
	if not doc.start_date or not doc.end_date:
		frappe.throw(_("Start date and end date are required"))
	if getdate(doc.end_date) < getdate(doc.start_date):
		frappe.throw(_("End date can't be before the start date"))


def check_edit(doc, before_status):
	"""Status belongs to the workflow; Pending approval, Approved and Closed contracts are locked."""
	if doc.flags.get("lc_workflow"):
		return
	if doc.is_new():
		if doc.status not in (None, "", DRAFT):
			frappe.throw(_("A new contract starts as Draft"))
		doc.status = DRAFT
		return
	if before_status in LOCKED:
		frappe.throw(_("{0} is {1} and can't be edited. {2}").format(
			doc.name, before_status,
			_("A Director can send it back.") if before_status == PENDING else _("Close it and make a new contract if terms change.")))
	if doc.status != before_status:
		frappe.throw(_("Status {0} is set by the approval flow, not by editing.").format(doc.status))


def send_for_approval(doc, problems, user):
	if doc.status not in SENDABLE:
		frappe.throw(_("{0} is {1}. Only a Draft or Sent back contract can be sent for approval.").format(doc.name, doc.status))
	if problems:
		frappe.throw("<br>".join(problems))
	doc.status = PENDING
	doc.raised_by = user
	doc.rejection_reason = None
	doc.flags.lc_workflow = True


def approve(doc, problems, user, roles, now):
	if doc.status != PENDING:
		frappe.throw(_("{0} is {1}. Only a contract pending approval can be approved.").format(doc.name, doc.status))
	if APPROVER_ROLE not in roles:
		frappe.throw(_("Only a Director can approve a Labour Contract."))
	if problems:
		frappe.throw("<br>".join(problems))
	doc.status = APPROVED
	doc.approved_by = user
	doc.approved_on = now
	doc.flags.lc_workflow = True


def send_back(doc, user, roles, reason):
	reason = (reason or "").strip()
	if doc.status != PENDING:
		frappe.throw(_("{0} is {1}. Only a contract pending approval can be sent back.").format(doc.name, doc.status))
	if APPROVER_ROLE not in roles:
		frappe.throw(_("Only a Director can send a Labour Contract back."))
	if not reason:
		frappe.throw(_("Give a reason for sending the contract back."))
	doc.status = SENT_BACK
	doc.rejection_reason = reason
	doc.flags.lc_workflow = True


def close(doc, now):
	if doc.status != APPROVED:
		frappe.throw(_("{0} is {1}. Only an Approved contract can be closed.").format(doc.name, doc.status))
	doc.status = CLOSED
	doc.closed_on = now
	doc.flags.lc_workflow = True


def reopen(doc, user, roles, project_closed=False):
	"""Closed -> Approved again. Director only; refused while the contract's project is Closed."""
	if doc.status != CLOSED:
		frappe.throw(_("{0} is {1}. Only a Closed contract can be reopened.").format(doc.name, doc.status))
	if APPROVER_ROLE not in roles:
		frappe.throw(_("Only a Director can reopen a Labour Contract."))
	if project_closed:
		frappe.throw(_("Project {0} is Closed. Reopen the project first.").format(doc.get("project")))
	doc.status = APPROVED
	doc.closed_on = None
	doc.flags.lc_workflow = True


def contractor_info(name):
	return frappe.db.get_value("Labour Contractor", name, ["name", "disabled", "tax_cert_expiry"], as_dict=True)


def activity_contracts(activity, name):
	"""Other contracts that already use this activity (any project, any status, Closed included)."""
	return frappe.get_all("Labour Contract", filters={"activity": activity, "name": ["!=", name or ""]}, pluck="name")


def check_activity(doc):
	"""One contract per activity, ever; and the activity must be active. Only for a new contract or a changed activity."""
	if not (doc.is_new() or frappe.db.get_value("Labour Contract", doc.name, "activity") != doc.activity):
		return
	dup = activity_contracts(doc.activity, doc.name)
	if dup:
		frappe.throw(_("Activity {0} is already used on contract {1}. Create a new activity for each contract.")
			.format(doc.activity, ", ".join(dup)))
	if frappe.db.get_value("Labour Activity", doc.activity, "disabled"):
		frappe.throw(_("Activity {0} is inactive.").format(doc.activity))


def check_delete(doc, roles, bill_refs=None):
	"""Delete is allowed for a Draft never sent, or a Closed contract (Director only, no weekly bill line on it)."""
	if doc.status == DRAFT and not doc.raised_by:
		return
	if doc.status != CLOSED:
		frappe.throw(_("Delete is blocked. Only a Draft or a Closed contract can be deleted."))
	if APPROVER_ROLE not in roles:
		frappe.throw(_("Only a Director can delete a Closed contract."))
	if bill_refs:
		frappe.throw(_("Contract {0} is on weekly bill {1}. It can't be deleted.").format(doc.name, ", ".join(sorted(set(bill_refs)))))


class LabourContract(Document):
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
		before = None if self.is_new() else frappe.db.get_value("Labour Contract", self.name, "status")
		check_edit(self, before)
		if self.flags.get("lc_workflow"):
			return
		self.narration = (self.narration or "").strip()
		check_dates(self)
		if not flt(self.contract_value) >= 0:
			frappe.throw(_("Contract value can't be negative"))
		if frappe.db.get_value("Project", self.project, "status") == "Closed":
			frappe.throw(_("Project {0} is Closed. It can't be used on new documents.").format(self.project))
		check_activity(self)

	def on_trash(self):
		bills = frappe.get_all("Labour Weekly Bill Line", filters={"contract": self.name}, pluck="parent") if self.status == CLOSED else []
		check_delete(self, frappe.get_roles(), bills)