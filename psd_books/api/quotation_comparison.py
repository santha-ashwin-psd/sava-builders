"""Quotation Comparison API (Sava A9.3). Rules live in invoicing/quotation_comparison_rules.py.

Endpoints
- get_comparison_data(request_for_quotation, name=None): read-only; ranking per item, L1 defaults,
  the open comparison (header, lines, approval steps, supplier totals, LPOs, and what the caller may do)
- create_comparison(request_for_quotation, selections=None): Draft comparison; selections is
  {mrn_item: {selected_quotation, reason}} or a list of such rows; missing lines take L1
- save_selection(name, data): data = {items: [{mrn_item, selected_quotation, reason}, ...]}; Draft only
- submit_for_approval(name): Draft -> Pending Approval (A9.4)
- approve_comparison(name, remarks=None): approves the pending level if the user has its role (A9.4)
- reject_comparison(name, reason): rejects the pending level; a reason is required (A9.4)
- create_lpos(name): Approved comparison -> one Draft Purchase Order per selected supplier (A9.5)

Approvers may not have doctype permissions, so the approval endpoints check the approval role
and company membership themselves and save with ignore_permissions.
"""
import frappe
from frappe import _
from frappe.utils import nowdate, now_datetime

from psd_books.invoicing import quotation_comparison_lpo as lpo
from psd_books.invoicing import quotation_comparison_rules as rules

DOCTYPE = "Quotation Comparison"


def _assert_can(action):
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, action)


def _assert_company(company):
	from psd_books.utils.access import assert_company
	assert_company(company)


def _check_read(doc):
	if frappe.has_permission(DOCTYPE, "read", doc=doc):
		return
	if set(rules.APPROVAL_ROLES) & set(frappe.get_roles()):
		return
	frappe.throw(_("You are not permitted to view this comparison."), frappe.PermissionError)


@frappe.whitelist(allow_guest=False, methods=["GET"])
def get_comparison_data(request_for_quotation, name=None):
	# approvers may lack module access to the doctype, so approval roles skip the module check (company is still checked)
	if not set(rules.APPROVAL_ROLES) & set(frappe.get_roles()):
		_assert_can("read")
	rfq = rules.load_rfq(request_for_quotation)
	_assert_company(rfq.get("company"))
	if name:
		doc = frappe.get_doc(DOCTYPE, name)
		_assert_company(doc.company)
		_check_read(doc)
		if doc.request_for_quotation != rfq["name"]:
			frappe.throw(_("Comparison {0} belongs to another Request for Quotation.").format(name))
	return rules.comparison_data(rfq, name, frappe.session.user, frappe.get_roles())


@frappe.whitelist(allow_guest=False, methods=["POST"])
def create_comparison(request_for_quotation, selections=None):
	_assert_can("create")
	rfq = rules.load_rfq(request_for_quotation)
	_assert_company(rfq.get("company"))
	rules.check_rfq(rfq)
	rules.check_no_open(rfq["name"])
	ctx = rules.build(rfq["name"])
	rows = rules.apply_selections(ctx["ranking"], rules.parse_selections(selections), default_missing=True)
	doc = frappe.get_doc({
		"doctype": DOCTYPE,
		"request_for_quotation": rfq["name"],
		"company": rfq.get("company"),
		"comparison_date": nowdate(),
		"items": rows,
	})
	doc.insert()
	return rules.summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def save_selection(name, data):
	_assert_can("write")
	doc = frappe.get_doc(DOCTYPE, name)
	_assert_company(doc.company)
	doc.check_permission("write")
	if doc.status != rules.EDITABLE_STATUS:
		frappe.throw(frappe._("A {0} comparison can't be edited.").format(doc.status.lower()))
	rows = rules.parse_items(data)
	doc.set("items", [{"mrn_item": r.get("mrn_item"), "selected_quotation": r.get("selected_quotation") or None,
		"reason": r.get("reason") or ""} for r in rows])
	doc.save()
	return rules.summary(doc)


def _load_for_approval(name):
	doc = frappe.get_doc(DOCTYPE, name)
	_assert_company(doc.company)
	return doc


@frappe.whitelist(allow_guest=False, methods=["POST"])
def submit_for_approval(name):
	_assert_can("write")
	doc = _load_for_approval(name)
	doc.check_permission("write")
	rules.submit_for_approval(doc, frappe.session.user)
	doc.save(ignore_permissions=True)
	return rules.summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def approve_comparison(name, remarks=None):
	doc = _load_for_approval(name)
	rules.approve(doc, frappe.session.user, frappe.get_roles(), remarks, now_datetime())
	doc.save(ignore_permissions=True)
	return rules.summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def reject_comparison(name, reason):
	doc = _load_for_approval(name)
	rules.reject(doc, frappe.session.user, frappe.get_roles(), reason, now_datetime())
	doc.save(ignore_permissions=True)
	return rules.summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def create_lpos(name):
	doc = _load_for_approval(name)
	if "Purchase Manager" not in frappe.get_roles():
		_assert_can_po("create")
	made = lpo.create_lpos(doc)
	return {"comparison": doc.name, "status": doc.status, "lpos": made}


def _assert_can_po(action):
	from psd_books.utils.access import assert_can
	assert_can("Purchase Order", action)