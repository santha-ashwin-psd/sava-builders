"""Purchase Order (LPO) approval API (Sava A10.1). Rules live in invoicing/po_approval_rules.py.

Endpoints
- get_approval_state(name): read-only; status, approval levels, what the caller may do, and the levels a
  Draft would need at its current total
- send_for_approval(name): Draft / Sent Back -> Pending Approval (levels built from the total incl. VAT)
- approve_po(name, remarks=None): approves the pending level if the caller has its role (the sender may approve;
  a Books Admin may approve any level); the last level
  submits the PO (status To Receive)
- send_back_po(name, reason): pending level -> PO goes to Sent Back (reason required); editable again
- cancel_po(name, reason): PO pending approval -> Cancelled (reason required); the sender or an approver of
  the pending level; open levels become Cancelled

Approvers may not have doctype permissions, so the approval endpoints check the approval role and company
membership themselves and save with ignore_permissions.
"""
import frappe
from frappe import _
from frappe.utils import flt, now_datetime

from psd_books.invoicing import po_approval_rules as rules
from psd_books.invoicing.doctype.purchase_order.purchase_order import po_material_requests, sync_material_request_status

DOCTYPE = "Purchase Order"
STEP_FIELDS = ["level", "role", "status", "approver", "approved_on", "remarks"]


def _assert_company(company):
	from psd_books.utils.access import assert_company
	assert_company(company)


def _is_admin():
	"""Books Admin (company admin, or the Administrator user): may act on any approval level."""
	from psd_books.utils.access import _membership
	return bool(_membership(frappe.session.user).get("admin"))


def _load(name):
	if not name or not frappe.db.exists(DOCTYPE, name):
		frappe.throw(_("Purchase Order {0} not found").format(name), frappe.DoesNotExistError)
	doc = frappe.get_doc(DOCTYPE, name)
	_assert_company(doc.company)
	return doc


def _director_edit_block(doc, roles):
	"""None when the Director may edit this approved PO (nothing received, billed or on a GRN)."""
	received = sum(flt(i.received_qty) for i in (doc.get("items") or []))
	billed = sum(flt(i.billed_qty) for i in (doc.get("items") or []))
	grns = rules.grns_on_po(doc.name) if doc.docstatus == 1 else []
	return rules.director_edit_block(doc.status, doc.docstatus, roles, grns, received, billed)


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
	edit_block = _director_edit_block(doc, roles)
	return {
		"can_director_edit": edit_block is None, "director_edit_reason": edit_block,
		"name": doc.name, "status": doc.status, "docstatus": doc.docstatus, "grand_total": doc.grand_total,
		"raised_by": doc.get("raised_by"), "rejection_reason": doc.get("rejection_reason"),
		"approval_steps": steps,
		"can_send": doc.docstatus == 0 and doc.status in rules.SENDABLE,
		"preview_roles": rules.required_roles(doc.grand_total) if doc.docstatus == 0 and doc.status in rules.SENDABLE else [],
		"action": rules.action_state(doc.status, doc.get("raised_by"), steps, user, roles, _is_admin()),
		"can_cancel": rules.can_cancel_pending(doc.status, doc.get("raised_by"), steps, user, roles, _is_admin()),
	}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def send_for_approval(name):
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, "write")
	doc = _load(name)
	# Admins (Books Admin, Director) have full access; they hold no Frappe role permission on this doctype.
	if not _is_admin():
		doc.check_permission("write")
	doc._calculate_totals()
	rules.send_for_approval(doc, frappe.session.user)
	doc.save(ignore_permissions=True)
	return rules.summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def approve_po(name, remarks=None):
	doc = _load(name)
	last = rules.approve(doc, frappe.session.user, frappe.get_roles(), remarks, now_datetime(), _is_admin())
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
	rules.send_back(doc, frappe.session.user, frappe.get_roles(), reason, now_datetime(), _is_admin())
	doc.save(ignore_permissions=True)
	return rules.summary(doc)

@frappe.whitelist(allow_guest=False, methods=["POST"])
def cancel_po(name, reason):
	doc = _load(name)
	changed = rules.cancel_pending(doc, frappe.session.user, frappe.get_roles(), reason, now_datetime(), _is_admin())
	# Like cancel_purchase_order_safe: plain writes, so period locks don't stop cancelling an unissued PO.
	for s in changed:
		frappe.db.set_value("Purchase Order Approval", s.name, {
			"status": s.status, "approver": s.approver, "approved_on": s.approved_on, "remarks": s.remarks,
		}, update_modified=False)
	frappe.db.set_value(DOCTYPE, doc.name, "status", "Cancelled", update_modified=True)
	frappe.db.commit()
	return rules.summary(doc)


# Header fields a Director may change on an approved PO (status, approval levels, totals and links stay as they are).
EDITABLE_HEADER = [
	"supplier", "entry_date", "transaction_date", "expected_delivery_date", "purchase_type", "set_warehouse",
	"material_request", "project", "employee", "employee_name", "billing_address", "delivery_address",
	"billing_address_name", "delivery_address_name", "terms", "remarks",
]
EDITABLE_ITEM = ["item_code", "description", "qty", "uom", "rate", "tax_code", "material_request"]


@frappe.whitelist(allow_guest=False, methods=["POST"])
def edit_approved_po(name, doc):
	"""Director only: edit an approved (issued) Purchase Order while no GRN (Draft or Submitted) exists on it.

	Takes the same shape the PO form saves (header fields, items, taxes). The stock "on order" quantity is
	taken off for the old lines and added for the new ones, the MRN balance check runs again, the MRN statuses
	are re-synced, and a comment records who edited it. If the new total needs different approval levels than
	the PO was approved at, the edit is refused (cancel and amend instead)."""
	data = frappe.parse_json(doc) if isinstance(doc, str) else (doc or {})
	po = _load(name)
	block = _director_edit_block(po, frappe.get_roles())
	if block:
		frappe.throw(block, frappe.PermissionError)
	old_mrns = po_material_requests(po)
	po._update_ordered_qty(direction=-1)
	for f in EDITABLE_HEADER:
		if f in data:
			po.set(f, data.get(f))
	# supplier_name is fetched from the supplier, but Frappe does not re-fetch it on a submitted document,
	# so a vendor change would keep showing the old name. Set it from the Supplier record.
	if po.supplier:
		po.supplier_name = frappe.db.get_value("Supplier", po.supplier, "supplier_name") or po.supplier
	po.set("items", [])
	for row in (data.get("items") or []):
		if not row.get("item_code"):
			continue
		po.append("items", {f: row.get(f) for f in EDITABLE_ITEM if f in row})
	po.set("taxes", [])
	for t in (data.get("taxes") or []):
		po.append("taxes", {k: t.get(k) for k in ("account_head", "description", "rate", "tax_type") if k in t})
	if not any(flt(i.qty) > 0 for i in po.items):
		frappe.throw(_("{0} has no item with a quantity.").format(po.name))
	po._calculate_totals()
	if not rules.levels_match_total(po):
		frappe.throw(_("The new total of {0} needs different approval levels than it was approved at. "
			"Cancel it and amend it so it goes through approval again.").format(po.name))
	po.flags.ignore_permissions = True
	po.flags.ignore_validate_update_after_submit = True
	po.flags.force_mrn_check = True
	po.save()
	po._update_ordered_qty(direction=+1)
	for m in dict.fromkeys(old_mrns + po_material_requests(po)):
		sync_material_request_status(m)
	po.add_comment("Info", _("Edited by {0} (Director) after approval.").format(frappe.session.user))
	frappe.db.commit()
	po.reload()
	return rules.summary(po)