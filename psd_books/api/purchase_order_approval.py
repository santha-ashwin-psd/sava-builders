"""Purchase Order (LPO) approval API (Sava A10.1). Rules live in invoicing/po_approval_rules.py.

Endpoints
- get_approval_state(name): read-only; status, approval levels, what the caller may do, and the levels a
  Draft would need at its current total
- send_for_approval(name): Draft / Sent Back -> Pending Approval (levels built from the total incl. VAT)
- approve_po(name, remarks=None): approves the pending level if the caller has its role; the last level
  submits the PO (status To Receive)
- send_back_po(name, reason): pending level -> PO goes to Sent Back (reason required); editable again
- cancel_po(name, reason): PO pending approval -> Cancelled (reason required); the sender or an approver of
  the pending level; open levels become Cancelled

Approvers may not have doctype permissions, so the approval endpoints check the approval role and company
membership themselves and save with ignore_permissions.
"""
import frappe
from frappe import _
from frappe.utils import now_datetime

from psd_books.invoicing import po_approval_rules as rules

DOCTYPE = "Purchase Order"
STEP_FIELDS = ["level", "role", "status", "approver", "approved_on", "remarks"]


def _assert_company(company):
	from psd_books.utils.access import assert_company
	assert_company(company)


def _load(name):
	if not name or not frappe.db.exists(DOCTYPE, name):
		frappe.throw(_("Purchase Order {0} not found").format(name), frappe.DoesNotExistError)
	doc = frappe.get_doc(DOCTYPE, name)
	_assert_company(doc.company)
	return doc


@frappe.whitelist(allow_guest=False, methods=["GET"])
def get_approval_state(name):
	roles = frappe.get_roles()
	if not set(rules.APPROVAL_ROLES) & set(roles):
		from psd_books.utils.access import assert_can
		assert_can(DOCTYPE, "read")
	doc = _load(name)
	steps = frappe.get_all(
		"Purchase Order Approval", filters={"parent": name, "parenttype": DOCTYPE},
		fields=STEP_FIELDS, order_by="idx asc")
	steps = [dict(s) for s in steps]
	user = frappe.session.user
	return {
		"name": doc.name, "status": doc.status, "docstatus": doc.docstatus, "grand_total": doc.grand_total,
		"raised_by": doc.get("raised_by"), "rejection_reason": doc.get("rejection_reason"),
		"approval_steps": steps,
		"can_send": doc.docstatus == 0 and doc.status in rules.SENDABLE,
		"preview_roles": rules.required_roles(doc.grand_total) if doc.docstatus == 0 and doc.status in rules.SENDABLE else [],
		"action": rules.action_state(doc.status, doc.get("raised_by"), steps, user, roles),
		"can_cancel": rules.can_cancel_pending(doc.status, doc.get("raised_by"), steps, user, roles),
	}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def send_for_approval(name):
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, "write")
	doc = _load(name)
	doc.check_permission("write")
	doc._calculate_totals()
	rules.send_for_approval(doc, frappe.session.user)
	doc.save(ignore_permissions=True)
	return rules.summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def approve_po(name, remarks=None):
	doc = _load(name)
	last = rules.approve(doc, frappe.session.user, frappe.get_roles(), remarks, now_datetime())
	if not last:
		doc.save(ignore_permissions=True)
		return rules.summary(doc)
	# last level: submit the PO, the same way submit_purchase_order does
	doc.flags.ignore_permissions = True
	doc.status = "To Receive"
	doc.submit()
	frappe.db.set_value(DOCTYPE, doc.name, "status", "To Receive", update_modified=False)
	frappe.db.commit()
	doc.reload()
	return rules.summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def send_back_po(name, reason):
	doc = _load(name)
	rules.send_back(doc, frappe.session.user, frappe.get_roles(), reason, now_datetime())
	doc.save(ignore_permissions=True)
	return rules.summary(doc)

@frappe.whitelist(allow_guest=False, methods=["POST"])
def cancel_po(name, reason):
	doc = _load(name)
	changed = rules.cancel_pending(doc, frappe.session.user, frappe.get_roles(), reason, now_datetime())
	# Like cancel_purchase_order_safe: plain writes, so period locks don't stop cancelling an unissued PO.
	for s in changed:
		frappe.db.set_value("Purchase Order Approval", s.name, {
			"status": s.status, "approver": s.approver, "approved_on": s.approved_on, "remarks": s.remarks,
		}, update_modified=False)
	frappe.db.set_value(DOCTYPE, doc.name, "status", "Cancelled", update_modified=True)
	frappe.db.commit()
	return rules.summary(doc)