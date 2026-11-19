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
	"""Why `user` can't approve, or "" if they can. Only a Director approves an MRN: callers pass
	is_admin = (user holds the Director role). A Director may approve an MRN they raised themselves.
	`pm` and `owner` are no longer used."""
	if readonly:
		return _("Read-only users can't approve.")
	if not is_admin:
		return _("Only a Director can approve this MRN.")
	return ""


def _load(name):
	if not name or not frappe.db.exists("Material Request", name):
		frappe.throw(_("Material Request {0} not found").format(name), frappe.DoesNotExistError)
	doc = frappe.get_doc("Material Request", name)
	assert_company(doc.company)
	return doc


def _is_director(user):
	return "Director" in set(frappe.get_roles(user))


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
	reason = approval_block_reason(doc.owner, user, pm, _is_director(user), m["readonly"]) if waiting else ""
	return {
		"status": doc.status,
		"project_manager": pm or "",
		"can_approve": bool(waiting and not reason),
		"reason": reason,
		"can_short_close": bool(_is_director(user) and not m["readonly"]),
	}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def send_for_approval(name):
	assert_can("Material Request", "write")
	doc = _load(name)
	if doc.get("production_plan"):
		frappe.throw(_("Requests made from a Production Plan are submitted directly, not approved."))
	if doc.docstatus != 0 or doc.status not in SENDABLE:
		frappe.throw(_("Only a draft or sent-back MRN can be sent for approval."))
	# an Asset request may have no project; a Director approves every MRN
	if doc.material_request_type != "Asset":
		if not doc.get("project"):
			frappe.throw(_("Select a project and save the MRN before sending it for approval."))

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
	reason = approval_block_reason(doc.owner, user, _project_manager(doc), _is_director(user), m["readonly"])
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
	block = approval_block_reason(doc.owner, user, _project_manager(doc), _is_director(user), m["readonly"])
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


@frappe.whitelist(allow_guest=False, methods=["GET"])
def get_mrn_items(name, exclude_entry=None):
	"""Read-only: the lines of an MRN with what was already moved against it.

	transferred = submitted Stock Entries (Material Issue / Material Transfer) linked to this MRN
	+ what store-issue Delivery Notes recorded in issued_qty. Quantities already held by other DRAFT
	stock entries are reserved too. pending = required - transferred - in_draft.
	exclude_entry: the draft being edited (it does not reserve against itself).
	"""
	assert_can("Material Request", "read")
	doc = _load(name)
	if doc.docstatus != 1:
		frappe.throw(_("Material Request {0} is not submitted.").format(doc.name))
	lines = frappe.get_all(
		"Material Request Item", filters={"parent": doc.name, "parenttype": "Material Request"},
		fields=["item_code", "item_name", "required_qty", "short_closed_qty", "issued_qty", "uom"], order_by="idx asc")
	master_names = {r.name: r.item_name for r in frappe.get_all(
		"Item", filters={"name": ["in", [l.item_code for l in lines] or [""]]}, fields=["name", "item_name"])}
	moved = {r[0]: flt(r[1]) for r in frappe.db.sql(
		"""SELECT d.item_code, SUM(d.qty) FROM `tabStock Entry Detail` d
		JOIN `tabStock Entry` s ON s.name = d.parent
		WHERE s.docstatus = 1 AND IFNULL(NULLIF(d.material_request, ''), s.material_request) = %s
		AND s.stock_entry_type IN ('Material Issue', 'Material Transfer')
		GROUP BY d.item_code""", doc.name)}
	from psd_books.api.inventory import _mrn_draft_qty
	drafts = _mrn_draft_qty([doc.name], exclude_entry)
	items = []
	for l in lines:
		required = max(0.0, flt(l.required_qty) - flt(l.short_closed_qty))
		transferred = moved.get(l.item_code, 0) + flt(l.issued_qty)
		in_draft = drafts.get((doc.name, l.item_code), 0)
		pending = required - transferred - in_draft
		if pending > 0.0001:
			items.append({"item_code": l.item_code, "item_name": master_names.get(l.item_code) or l.item_name or l.item_code, "uom": l.uom or "",
				"required_qty": required, "transferred_qty": transferred, "draft_qty": in_draft, "pending_qty": pending, "qty": pending})
	if not items:
		frappe.throw(_("Material Request {0} is already fully transferred or already held in a draft Stock Entry.").format(doc.name))
	return {"material_request": doc.name, "items": items}


def _assert_short_close_allowed(doc):
	if not _is_director(frappe.session.user):
		frappe.throw(_("Only a Director can short-close or reopen Material Request quantities."), frappe.PermissionError)
	if doc.docstatus != 1 or doc.status in ("Cancelled", "Draft", "Pending Approval", "Sent Back"):
		frappe.throw(_("Material Request {0} must be approved to short-close it.").format(doc.name))


def _close_balance_rows(doc, item_code, balance, reason):
	"""Add `balance` to short_closed_qty on the MRN rows of one item (shared by single and close-all)."""
	left = balance
	for r in doc.items:
		if r.item_code != item_code:
			continue
		room = flt(r.required_qty) - flt(r.short_closed_qty)
		take = min(room, left)
		if take <= 0:
			continue
		frappe.db.set_value("Material Request Item", r.name, {
			"short_closed_qty": flt(r.short_closed_qty) + take,
			"short_close_reason": reason,
			"short_closed_by": frappe.session.user,
		}, update_modified=False)
		left -= take


@frappe.whitelist(allow_guest=False, methods=["POST"])
def short_close_item(name, item_code, reason):
	"""Director only: close the unordered balance of one item on an approved MRN (the qty already
	ordered is enough, or nothing is needed any more). The item need not be ordered yet. The closed
	qty is taken off the MRN qty everywhere (PO screens, PO check, status, stock entries)."""
	from psd_books.invoicing.doctype.purchase_order.purchase_order import (
		mrn_ordered_qty, mrn_required_qty, sync_material_request_status)
	assert_can("Material Request", "read")
	doc = _load(name)
	_assert_short_close_allowed(doc)
	reason = (reason or "").strip()
	if not reason:
		frappe.throw(_("A reason is required to short-close."))
	ordered = flt(mrn_ordered_qty(doc.name).get(item_code, 0))
	balance = flt(mrn_required_qty(doc.name).get(item_code, 0)) - ordered
	if balance <= 0.0005:
		frappe.throw(_("There is no balance left to close for this item."))
	_close_balance_rows(doc, item_code, balance, reason)
	doc.add_comment("Info", _("Short-closed {0} of {1}: {2}").format(balance, item_code, reason))
	sync_material_request_status(doc.name)
	return {"material_request": doc.name, "item_code": item_code, "closed": balance}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def short_close_all(name, reason):
	"""Director only: close the unordered balance of every item on an approved MRN, whether or not it
	is ordered yet. Items with no balance left are skipped and reported."""
	from psd_books.invoicing.doctype.purchase_order.purchase_order import (
		mrn_ordered_qty, mrn_required_qty, sync_material_request_status)
	assert_can("Material Request", "read")
	doc = _load(name)
	_assert_short_close_allowed(doc)
	reason = (reason or "").strip()
	if not reason:
		frappe.throw(_("A reason is required to short-close."))
	ordered = mrn_ordered_qty(doc.name)
	required = mrn_required_qty(doc.name)
	closed, skipped = [], []
	for code in dict.fromkeys(r.item_code for r in doc.items):
		ord_q = flt(ordered.get(code, 0))
		balance = flt(required.get(code, 0)) - ord_q
		if balance <= 0.0005:
			skipped.append(code)
			continue
		_close_balance_rows(doc, code, balance, reason)
		closed.append({"item_code": code, "closed": balance})
	if not closed:
		frappe.throw(_("No item has a balance left to close."))
	doc.add_comment("Info", _("Short-closed all balances ({0}): {1}").format(
		", ".join("{0} {1}".format(c["item_code"], c["closed"]) for c in closed), reason))
	sync_material_request_status(doc.name)
	return {"material_request": doc.name, "closed": closed, "skipped": skipped}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def reopen_all(name):
	"""Director only: undo the short-close of every item on the MRN."""
	from psd_books.invoicing.doctype.purchase_order.purchase_order import sync_material_request_status
	assert_can("Material Request", "read")
	doc = _load(name)
	_assert_short_close_allowed(doc)
	back = {}
	for r in doc.items:
		if flt(r.short_closed_qty):
			back[r.item_code] = back.get(r.item_code, 0.0) + flt(r.short_closed_qty)
			frappe.db.set_value("Material Request Item", r.name, {
				"short_closed_qty": 0, "short_close_reason": "", "short_closed_by": ""}, update_modified=False)
	if not back:
		frappe.throw(_("Nothing is short-closed on this Material Request."))
	doc.add_comment("Info", _("Reopened all closed balances ({0})").format(
		", ".join("{0} {1}".format(k, v) for k, v in back.items())))
	sync_material_request_status(doc.name)
	return {"material_request": doc.name, "reopened": [{"item_code": k, "reopened": v} for k, v in back.items()]}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def reopen_item(name, item_code):
	"""Director only: undo the short-close of one item; its balance can be ordered and moved again."""
	from psd_books.invoicing.doctype.purchase_order.purchase_order import sync_material_request_status
	assert_can("Material Request", "read")
	doc = _load(name)
	_assert_short_close_allowed(doc)
	back = 0.0
	for r in doc.items:
		if r.item_code == item_code and flt(r.short_closed_qty):
			back += flt(r.short_closed_qty)
			frappe.db.set_value("Material Request Item", r.name, {
				"short_closed_qty": 0, "short_close_reason": "", "short_closed_by": ""}, update_modified=False)
	if not back:
		frappe.throw(_("Nothing is short-closed for this item."))
	doc.add_comment("Info", _("Reopened {0} of {1}").format(back, item_code))
	sync_material_request_status(doc.name)
	return {"material_request": doc.name, "item_code": item_code, "reopened": back}