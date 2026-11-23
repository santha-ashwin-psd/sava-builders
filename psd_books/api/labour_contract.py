"""Labour Contract approval API (Sava Phase 2). Rules live in invoicing/doctype/labour_contract/labour_contract.py.

Endpoints (all POST)
- send_for_approval(name): Draft / Sent back -> Pending approval, after the blockers check
- approve_contract(name): Pending approval -> Approved; Director only (a Books Admin is not enough)
- send_back_contract(name, reason): Pending approval -> Sent back; Director only, reason required
- close_contract(name): Approved -> Closed; whoever may write Labour Contracts
- reopen_contract(name): Closed -> Approved; Director only, refused while the project is Closed
- blockers_for(name): read-only list of what would stop the contract being sent or approved
- my_permissions() (GET): {can_approve} for the screen; only a Director can approve or send back
A Director may hold no Frappe role permission on this doctype, so these check access themselves and save
with ignore_permissions.
"""
import frappe
from frappe import _
from frappe.utils import now_datetime

from psd_books.invoicing.doctype.labour_contract import labour_contract as rules

DOCTYPE = "Labour Contract"
FIELDS = ["name", "status", "project", "activity", "contractor", "start_date", "end_date", "contract_value",
	"narration", "raised_by", "approved_by", "approved_on", "rejection_reason", "closed_on"]


def _load(name):
	if not name or not frappe.db.exists(DOCTYPE, name):
		frappe.throw(_("Labour Contract {0} not found").format(name), frappe.DoesNotExistError)
	doc = frappe.get_doc(DOCTYPE, name)
	from psd_books.utils.access import assert_company
	assert_company(doc.get("company"))
	return doc


def _problems(doc):
	return rules.blockers(doc, rules.contractor_info(doc.contractor))


def _summary(doc):
	doc.reload()
	return {k: doc.get(k) for k in FIELDS}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def blockers_for(name):
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, "read")
	return _problems(_load(name))


@frappe.whitelist(allow_guest=False, methods=["POST"])
def send_for_approval(name):
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, "write")
	doc = _load(name)
	rules.send_for_approval(doc, _problems(doc), frappe.session.user)
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def approve_contract(name):
	doc = _load(name)
	rules.approve(doc, _problems(doc), frappe.session.user, frappe.get_roles(), now_datetime())
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def send_back_contract(name, reason=None):
	doc = _load(name)
	rules.send_back(doc, frappe.session.user, frappe.get_roles(), reason)
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def close_contract(name):
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, "write")
	doc = _load(name)
	rules.close(doc, now_datetime())
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def reopen_contract(name):
	doc = _load(name)
	project_closed = frappe.db.get_value("Project", doc.project, "status") == "Closed"
	rules.reopen(doc, frappe.session.user, frappe.get_roles(), project_closed)
	doc.save(ignore_permissions=True)
	doc.add_comment("Info", _("Reopened by {0}").format(frappe.session.user))
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["GET"])
def my_permissions():
	return {"can_approve": rules.APPROVER_ROLE in frappe.get_roles()}