"""MRN approval (Sava A5.3).

A new MRN is not submitted directly. The requester sends it for approval and the
project's Project Manager (or a Books Admin) approves it, which submits it, or
sends it back with a reason (A5.4). The requester corrects it and sends it again.

Endpoints
- get_approval_state(name): whether the caller can approve it, for the screen
- send_for_approval(name): Draft -> Pending Approval (runs every MRN check)
- approve_mrn(name): Pending Approval -> Approved (submits the MRN)
- send_back_mrn(name, reason): Pending Approval -> Sent Back (reason required)
- get_issue_prefill(name): read-only data the Delivery Challans screen uses to start
  an "Issue from Store" challan from an Approved MRN (Sava A6.2)
"""
import frappe
from frappe import _
from frappe.utils import flt, now_datetime

from psd_books.inventory.store_issue import ISSUABLE_STATUSES
from psd_books.utils.access import _membership, assert_can, assert_company

SENDABLE = ("Draft", "Sent Back")


def approval_block_reason(owner, user, pm, is_admin, readonly):
	"""Why `user` can't approve, or "" if they can. A Books Admin can approve any MRN."""
	if is_admin:
		return ""
	if readonly:
		return _("Read-only users can't approve.")
	if not pm:
		return _("This project has no Project Manager. Ask a Books Admin to approve it "
			"or to set a manager on the Projects screen.")
	if user != pm:
		return _("Only the Project Manager ({0}) or a Books Admin can approve this MRN.").format(pm)
	if user == owner:
		return _("You raised this MRN, so someone else must approve it.")
	return ""


def _load(name):
	if not name or not frappe.db.exists("Material Request", name):
		frappe.throw(_("Material Request {0} not found").format(name), frappe.DoesNotExistError)
	doc = frappe.get_doc("Material Request", name)
	assert_company(doc.company)
	return doc


def _project_manager(doc):
	if not doc.get("project"):
		return None
	return frappe.db.get_value("Project", doc.project, "project_manager") or None


@frappe.whitelist(allow_guest=False, methods=["GET"])
def get_approval_state(name):
	assert_can("Material Request", "read")
	doc = _load(name)
	user = frappe.session.user
	m = _membership(user)
	pm = _project_manager(doc)
	waiting = doc.docstatus == 0 and doc.status == "Pending Approval"
	reason = approval_block_reason(doc.owner, user, pm, m["admin"], m["readonly"]) if waiting else ""
	return {
		"status": doc.status,
		"project_manager": pm or "",
		"can_approve": bool(waiting and not reason),
		"reason": reason,
	}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def send_for_approval(name):
	assert_can("Material Request", "write")
	doc = _load(name)
	if doc.get("production_plan"):
		frappe.throw(_("Requests made from a Production Plan are submitted directly, not approved."))
	if doc.docstatus != 0 or doc.status not in SENDABLE:
		frappe.throw(_("Only a draft or sent-back MRN can be sent for approval."))
	if not doc.get("project"):
		frappe.throw(_("Select a project and save the MRN before sending it for approval."))
	if not _project_manager(doc):
		frappe.throw(_("Project {0} has no Project Manager. Set one on the Projects screen first.")
			.format(doc.project))

	doc.status = "Pending Approval"
	doc.flags.mrn_workflow = True
	doc.flags.ignore_permissions = True
	doc.save()  # runs every MRN check, so an incomplete MRN can't be sent
	return {"name": doc.name, "status": doc.status}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def approve_mrn(name):
	doc = _load(name)
	if doc.docstatus != 0 or doc.status != "Pending Approval":
		frappe.throw(_("This MRN is not waiting for approval."))
	user = frappe.session.user
	m = _membership(user)
	reason = approval_block_reason(doc.owner, user, _project_manager(doc), m["admin"], m["readonly"])
	if reason:
		frappe.throw(reason, frappe.PermissionError)

	doc.approved_by = user
	doc.approved_on = now_datetime()
	doc.flags.mrn_workflow = True
	doc.flags.ignore_permissions = True
	doc.submit()  # on_submit sets the status to Approved
	return {"name": doc.name, "status": doc.status, "approved_by": doc.approved_by}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def send_back_mrn(name, reason=None):
	doc = _load(name)
	if doc.docstatus != 0 or doc.status != "Pending Approval":
		frappe.throw(_("This MRN is not waiting for approval."))
	user = frappe.session.user
	m = _membership(user)
	block = approval_block_reason(doc.owner, user, _project_manager(doc), m["admin"], m["readonly"])
	if block:
		frappe.throw(block, frappe.PermissionError)
	reason = (reason or "").strip()
	if not reason:
		frappe.throw(_("Enter the reason for sending this MRN back."))

	doc.status = "Sent Back"
	doc.send_back_reason = reason
	doc.sent_back_by = user
	doc.sent_back_on = now_datetime()
	doc.flags.mrn_workflow = True
	doc.flags.ignore_permissions = True
	doc.save()  # status stays Sent Back; the requester can edit and send it again
	return {"name": doc.name, "status": doc.status, "send_back_reason": doc.send_back_reason}


def build_issue_prefill(mrn, lines):
	"""Pure part of get_issue_prefill: `mrn` and `lines` are plain dicts, no database."""
	if mrn.get("docstatus") != 1 or mrn.get("status") not in ISSUABLE_STATUSES:
		frappe.throw(_("Material Request {0} is not open for issue (status: {1}). Only Approved or Partly Issued "
			"requests can be issued against.").format(mrn.get("name"), mrn.get("status")))
	items = []
	for line in lines:
		pending = flt(line.get("required_qty")) - flt(line.get("issued_qty"))
		if pending <= 0.0001:
			continue
		items.append({
			"mrn_item": line.get("name"),
			"item_code": line.get("item_code"),
			"item_name": line.get("item_name") or line.get("item_code"),
			"uom": line.get("uom") or "",
			"required_qty": flt(line.get("required_qty")),
			"issued_qty": flt(line.get("issued_qty")),
			"pending_qty": pending,
			"intended_use": line.get("intended_use") or "",
		})
	if not items:
		frappe.throw(_("Material Request {0} is already fully issued.").format(mrn.get("name")))
	return {
		"material_request": mrn.get("name"),
		"company": mrn.get("company"),
		"project": mrn.get("project") or "",
		"to_warehouse": mrn.get("delivery_warehouse") or "",
		"items": items,
	}


@frappe.whitelist(allow_guest=False, methods=["GET"])
def get_issue_prefill(name):
	"""Read-only: what a store-issue Delivery Note for this MRN should start with."""
	assert_can("Material Request", "read")
	doc = _load(name)
	lines = frappe.get_all(
		"Material Request Item", filters={"parent": doc.name, "parenttype": "Material Request"},
		fields=["name", "item_code", "item_name", "required_qty", "issued_qty", "uom", "intended_use"],
		order_by="idx asc")
	return build_issue_prefill(
		{"name": doc.name, "docstatus": doc.docstatus, "status": doc.status, "company": doc.company,
			"project": doc.get("project"), "delivery_warehouse": doc.get("delivery_warehouse")},
		lines)