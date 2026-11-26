"""Labour Weekly Bill approval API (Sava Phase 2). Rules live in invoicing/doctype/labour_weekly_bill/labour_weekly_bill.py.

Endpoints
- preview(week_date, project=None, name=None) (GET): the week (Saturday to Friday) and one row per Approved contract of the caller's company (all projects; one project if given) with project, value, paid till now, balance,
  and paid_this_week (the bill of that week already holding it: Pending / Approved, or an earlier Draft; or "")
- list_columns(names) (GET): per bill in names, the contracts paid on it, their projects and the balance still to pay on them after the bill
  (only bills of the caller's company)
- balance_by_project() (GET): {project: value - paid till now} over the Approved contracts of the caller's company (contracts of a Closed
  project left out); the Balance To Pay card on the Weekly Bill screen
- send_for_approval(name) (POST): Draft / Sent back -> Pending approval, after a fresh check of the figures
- approve_bill(name) (POST): Pending approval -> Approved; Director only (a Books Admin is not enough)
- mark_paid(name) (POST): Approved -> Paid, the payment is recorded; Director only
- reopen_bill(name) (POST): Approved -> Draft for editing (approval cleared); Director only
- mark_unpaid(name) (POST): Paid -> Approved; Director only
- cancel_bill(name, reason) (POST): Approved -> Cancelled, reason required; Director only
- amend_bill(name) (POST): new Draft bill from a Cancelled one (same week and amounts), one amendment per cancelled bill
- send_back_bill(name, reason) (POST): Pending approval -> Sent back; Director only, reason required
A Director may hold no Frappe role permission on this doctype, so these check access themselves and save
with ignore_permissions.
"""
import frappe
from frappe import _
from frappe.utils import now_datetime

from psd_books.invoicing.doctype.labour_weekly_bill import labour_weekly_bill as rules

DOCTYPE = "Labour Weekly Bill"
FIELDS = ["name", "status", "project", "week_start", "week_end", "total_amount", "raised_by", "approved_by", "approved_on",
	"paid_by", "paid_on", "cancelled_by", "cancelled_on", "cancel_reason", "amended_from", "rejection_reason"]


def _load(name):
	if not name or not frappe.db.exists(DOCTYPE, name):
		frappe.throw(_("Labour Weekly Bill {0} not found").format(name), frappe.DoesNotExistError)
	doc = frappe.get_doc(DOCTYPE, name)
	from psd_books.utils.access import assert_company
	assert_company(doc.get("company"))
	return doc


def _summary(doc):
	doc.reload()
	out = {k: doc.get(k) for k in FIELDS}
	out["lines"] = [{k: ln.get(k) for k in ("contract", "contractor", "contract_value", "paid_till_now", "pending_amount", "balance", "amount_to_pay")}
		for ln in doc.get("lines") or []]
	return out


@frappe.whitelist(allow_guest=False, methods=["GET"])
def preview(week_date, project=None, name=None):
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, "read")
	ws = rules.monday_of(week_date)
	rows = rules.figures(project or None, name, rules.caller_company() or None, rules.sunday_of(ws))
	creation = frappe.db.get_value(DOCTYPE, name, "creation") if name else None
	taken = rules.paid_this_week([r["contract"] for r in rows], ws, name, creation)
	for r in rows:
		r["paid_this_week"] = taken.get(r["contract"]) or ""
	return {"week_start": ws, "week_end": rules.sunday_of(ws), "rows": rows}


@frappe.whitelist(allow_guest=False, methods=["GET"])
def list_columns(names):
	from psd_books.utils.access import assert_can, assert_company
	assert_can(DOCTYPE, "read")
	names = [n for n in (frappe.parse_json(names) or []) if isinstance(n, str)][:1000]
	if not names:
		return {}
	allowed = []
	for b in frappe.get_all(DOCTYPE, filters={"name": ["in", names]}, fields=["name", "company"]):
		try:
			assert_company(b.company)
			allowed.append(b.name)
		except frappe.PermissionError:
			pass
	if not allowed:
		return {}
	lines = frappe.get_all("Labour Weekly Bill Line", filters={"parenttype": DOCTYPE, "parent": ["in", allowed]},
		fields=["parent", "contract", "balance", "amount_to_pay"], order_by="parent asc, idx asc", limit_page_length=0)
	cons = list({ln.contract for ln in lines if ln.contract})
	projects = {c.name: c.project for c in frappe.get_all("Labour Contract", filters={"name": ["in", cons]}, fields=["name", "project"])} if cons else {}
	return rules.list_columns(lines, projects)


@frappe.whitelist(allow_guest=False, methods=["GET"])
def balance_by_project():
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, "read")
	out = {}
	for r in rules.figures(None, None, rules.caller_company() or None):
		k = r.get("project") or ""
		out[k] = out.get(k, 0.0) + max(0.0, (r["contract_value"] or 0) - (r["paid_till_now"] or 0))
	return out


@frappe.whitelist(allow_guest=False, methods=["POST"])
def send_for_approval(name):
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, "write")
	doc = _load(name)
	if doc.status in rules.SENDABLE:
		problems = rules.current_blockers(doc)
	else:
		problems = []
	rules.send_for_approval(doc, problems, frappe.session.user)
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def approve_bill(name):
	doc = _load(name)
	problems = rules.current_blockers(doc) if doc.status == rules.PENDING else []
	rules.approve(doc, problems, frappe.session.user, frappe.get_roles(), now_datetime())
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def mark_paid(name):
	doc = _load(name)
	rules.mark_paid(doc, frappe.session.user, frappe.get_roles(), now_datetime())
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def reopen_bill(name):
	doc = _load(name)
	rules.reopen(doc, frappe.session.user, frappe.get_roles())
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def mark_unpaid(name):
	doc = _load(name)
	rules.mark_unpaid(doc, frappe.session.user, frappe.get_roles())
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def cancel_bill(name, reason=None):
	doc = _load(name)
	rules.cancel(doc, frappe.session.user, frappe.get_roles(), reason, now_datetime())
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def amend_bill(name):
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, "write")
	if "Director" not in frappe.get_roles():
		frappe.throw(_("Only a Director can amend a weekly bill."), frappe.PermissionError)
	old = _load(name)
	if old.status != rules.CANCELLED:
		frappe.throw(_("{0} is {1}. Only a Cancelled bill can be amended.").format(old.name, old.status))
	again = frappe.db.get_value(DOCTYPE, {"amended_from": old.name}, "name")
	if again:
		frappe.throw(_("{0} was already amended as {1}.").format(old.name, again))
	new = frappe.get_doc({"doctype": DOCTYPE, "company": old.get("company"), "week_start": old.week_start, "amended_from": old.name,
		"lines": [{"contract": ln.contract, "amount_to_pay": ln.amount_to_pay} for ln in old.get("lines") or []]})
	new.insert(ignore_permissions=True)
	return _summary(new)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def send_back_bill(name, reason=None):
	doc = _load(name)
	rules.send_back(doc, frappe.session.user, frappe.get_roles(), reason)
	doc.save(ignore_permissions=True)
	return _summary(doc)