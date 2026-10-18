"""Purchase Order (LPO) approval rules (Sava A10.1).

- a Draft or Sent Back PO is sent for approval: Pending Approval, with one level per role
  (same value rules as the quotation comparison: Purchase Manager always; Finance above KES 200,000;
  Director above KES 500,000, on the total incl. VAT; levels run in order)
- the person who sent it can't approve or send it back; one person can't approve two levels
- the last approval submits the PO (done by api/purchase_order_approval.py)
- sending back needs a reason; the PO goes to Sent Back, is editable again and can be sent again
- a PO pending approval can be cancelled (reason required) by the person who sent it or by an approver of
  the pending level; its open levels become Cancelled. A Pending Approval PO can't be deleted
- while Pending Approval the PO can't be edited or submitted by any other route
- Pending Approval and Sent Back can only be set through this flow (doc.flags.po_workflow)
"""
import frappe
from frappe import _
from frappe.utils import flt

from psd_books.invoicing import quotation_comparison_rules as cmp_rules

DRAFT = "Draft"
PENDING_APPROVAL = "Pending Approval"
SENT_BACK = "Sent Back"
SENDABLE = (DRAFT, SENT_BACK)
WORKFLOW_STATUSES = (PENDING_APPROVAL, SENT_BACK)
APPROVAL_ROLES = cmp_rules.APPROVAL_ROLES
STEP_PENDING = cmp_rules.STEP_PENDING
STEP_APPROVED = cmp_rules.STEP_APPROVED
STEP_REJECTED = cmp_rules.STEP_REJECTED
STEP_CANCELLED = "Cancelled"


def required_roles(total):
	return cmp_rules.required_roles(total)


def build_steps(total):
	return cmp_rules.build_steps(total)


def current_step(doc):
	return next((s for s in (doc.get("approval_steps") or []) if s.status == STEP_PENDING), None)


def check_can_send(doc):
	if doc.docstatus != 0:
		frappe.throw(_("{0} is already submitted or cancelled and can't be sent for approval.").format(doc.name))
	if doc.status not in SENDABLE:
		frappe.throw(_("Only a Draft or Sent Back Purchase Order can be sent for approval ({0} is {1}).")
			.format(doc.name, doc.status))
	if not doc.get("supplier"):
		frappe.throw(_("Select the supplier before sending {0} for approval.").format(doc.name))
	if not any(flt(i.qty) > 0 for i in (doc.get("items") or [])):
		frappe.throw(_("{0} has no item with a quantity. Add items before sending it for approval.").format(doc.name))
	if flt(doc.get("grand_total")) <= 0:
		frappe.throw(_("{0} has no value. Check the rates before sending it for approval.").format(doc.name))


def send_for_approval(doc, user):
	"""Draft / Sent Back -> Pending Approval, with fresh levels for the current total."""
	check_can_send(doc)
	doc.raised_by = user
	doc.rejection_reason = None
	doc.set("approval_steps", build_steps(doc.grand_total))
	doc.status = PENDING_APPROVAL
	doc.flags.po_workflow = True


def check_can_act(doc, user, roles):
	"""The step that user may act on now, or a refusal."""
	if doc.status != PENDING_APPROVAL:
		frappe.throw(_("{0} is {1}. Only a Purchase Order pending approval can be approved or sent back.")
			.format(doc.name, doc.status))
	if user == doc.raised_by:
		frappe.throw(_("The person who sent this Purchase Order for approval can't approve or send it back."))
	step = current_step(doc)
	if step is None:
		frappe.throw(_("No approval level is pending on {0}.").format(doc.name))
	if any(s.status == STEP_APPROVED and s.approver == user for s in doc.get("approval_steps") or []):
		frappe.throw(_("You already approved a level of this Purchase Order. Another person must approve the next level."))
	if step.role not in roles:
		frappe.throw(_("Level {0} needs the {1} role.").format(step.level, step.role))
	return step


def approve(doc, user, roles, remarks, now):
	"""Approve the pending level. Returns True when that was the last level (the caller submits the PO)."""
	step = check_can_act(doc, user, roles)
	step.status = STEP_APPROVED
	step.approver = user
	step.approved_on = now
	step.remarks = (remarks or "").strip()
	doc.flags.po_workflow = True
	return current_step(doc) is None


def send_back(doc, user, roles, reason, now):
	reason = (reason or "").strip()
	if not reason:
		frappe.throw(_("Give a reason for sending the Purchase Order back."))
	step = check_can_act(doc, user, roles)
	step.status = STEP_REJECTED
	step.approver = user
	step.approved_on = now
	step.remarks = reason
	doc.status = SENT_BACK
	doc.rejection_reason = reason
	doc.flags.po_workflow = True


def validate_status(doc):
	"""Called from PurchaseOrder.validate: the approval statuses belong to the flow, and a PO pending
	approval is locked (no edits, no submit by any other route)."""
	if doc.flags.get("po_workflow"):
		return
	# Frappe runs validate with docstatus already 1 on submit, so the lock below covers submit as well as edits.
	before = None if doc.is_new() else frappe.db.get_value("Purchase Order", doc.name, "status")
	if doc.docstatus == 0 and doc.status in WORKFLOW_STATUSES and doc.status != before:
		frappe.throw(_("Status {0} is set by sending the Purchase Order for approval, not by editing it.")
			.format(doc.status))
	if before == PENDING_APPROVAL:
		frappe.throw(_("{0} is pending approval and can't be edited or submitted. An approver can send it back.")
			.format(doc.name))


def check_ready_to_submit(doc):
	"""Gate for PurchaseOrder.before_submit: every level must be approved, at the levels the total needs."""
	steps = doc.get("approval_steps") or []
	if not steps or any(s.status != STEP_APPROVED for s in steps):
		frappe.throw(_("{0} can't be submitted until every approval level has approved it. Send it for approval first.")
			.format(doc.name))
	if [s.role for s in steps] != required_roles(doc.grand_total):
		frappe.throw(_("The total of {0} no longer matches the approval levels it was approved at. Send it back and send it for approval again.")
			.format(doc.name))


def _val(row, key):
	"""A step as a dict (get_all) or a child row (Document / plain object)."""
	return row.get(key) if isinstance(row, dict) else getattr(row, key, None)


def can_cancel_pending(status, raised_by, steps, user, roles):
	"""True when user may cancel a PO pending approval: the person who sent it, or an approver (role) of the pending level."""
	if status != PENDING_APPROVAL:
		return False
	if user and user == raised_by:
		return True
	step = next((s for s in steps or [] if _val(s, "status") == STEP_PENDING), None)
	return bool(step and _val(step, "role") in (roles or []))


def cancel_open_steps(doc):
	"""Mark every still-Pending level Cancelled. Returns the changed rows (the caller saves them)."""
	changed = []
	for s in doc.get("approval_steps") or []:
		if s.status == STEP_PENDING:
			s.status = STEP_CANCELLED
			changed.append(s)
	return changed


def cancel_pending(doc, user, roles, reason, now):
	"""Cancel a PO pending approval. Returns the changed step rows; the caller writes them and the status."""
	reason = (reason or "").strip()
	if doc.status != PENDING_APPROVAL:
		frappe.throw(_("{0} is {1}. Only a Purchase Order pending approval can be cancelled here.")
			.format(doc.name, doc.status))
	if not reason:
		frappe.throw(_("Give a reason for cancelling the Purchase Order."))
	if not can_cancel_pending(doc.status, doc.get("raised_by"), doc.get("approval_steps"), user, roles):
		frappe.throw(_("Only the person who sent {0} for approval, or an approver of the pending level, can cancel it.")
			.format(doc.name))
	first = current_step(doc)
	changed = cancel_open_steps(doc)
	if first is not None:
		first.approver = user
		first.approved_on = now
		first.remarks = _("Cancelled: {0}").format(reason)
	doc.status = "Cancelled"
	doc.flags.po_workflow = True
	return changed


def assert_deletable(status):
	"""A Purchase Order pending approval can't be deleted (cancel it, or an approver sends it back)."""
	if status == PENDING_APPROVAL:
		frappe.throw(_("A Purchase Order pending approval can't be deleted. Cancel it, or ask an approver to send it back."))


def action_state(status, raised_by, steps, user, roles):
	"""What user may do on the pending level, as data (no exception). Mirrors check_can_act.
	-> {level, role, can_act, reason}"""
	out = {"level": None, "role": None, "can_act": False, "reason": None}
	if status != PENDING_APPROVAL:
		return out
	step = next((s for s in steps or [] if s.get("status") == STEP_PENDING), None)
	if step is None:
		out["reason"] = _("No approval level is pending.")
		return out
	out["level"], out["role"] = step.get("level"), step.get("role")
	if user == raised_by:
		out["reason"] = _("You sent this Purchase Order for approval, so another person must approve it.")
	elif any(s.get("status") == STEP_APPROVED and s.get("approver") == user for s in steps or []):
		out["reason"] = _("You already approved a level. Another person must approve the next level.")
	elif step.get("role") not in (roles or []):
		out["reason"] = _("Level {0} needs the {1} role.").format(step.get("level"), step.get("role"))
	else:
		out["can_act"] = True
	return out


def summary(doc):
	return {"name": doc.name, "status": doc.status, "docstatus": doc.docstatus, "grand_total": doc.grand_total}