"""Labour Weekly Bill approval API (Sava Phase 2). Rules live in invoicing/doctype/labour_weekly_bill/labour_weekly_bill.py.

Endpoints
- preview(week_date, project=None, name=None) (GET): the week (Monday to Sunday) and one row per Approved contract of the caller's company (all projects; one project if given) with project, value, paid till now, balance,
  and paid_this_week (the bill of that week already holding it: Pending / Approved, or an earlier Draft; or "")
- list_columns(names) (GET): per bill in names, the contracts paid on it, their projects and the balance still to pay on them after the bill
  (only bills of the caller's company)
- send_for_approval(name) (POST): Draft / Sent back -> Pending approval, after a fresh check of the figures
- approve_bill(name) (POST): Pending approval -> Approved; Director only (a Books Admin is not enough)
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
	"rejection_reason"]


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
def send_back_bill(name, reason=None):
	doc = _load(name)
	rules.send_back(doc, frappe.session.user, frappe.get_roles(), reason)
	doc.save(ignore_permissions=True)
	return _summary(doc)