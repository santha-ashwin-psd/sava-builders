"""Labour Attendance Sheet API (Sava Phase 2). Rules live in invoicing/doctype/labour_attendance_sheet/labour_attendance_sheet.py.

Endpoints
- preview(week_date, name=None) (GET): the week (Saturday to Friday), any other sheet for that week, and one baseline row per
  Active employee (no days ticked; grade, area, rate, OT hours and SHA carried from the latest earlier sheet)
- send_for_approval(name) (POST): Draft / Sent back -> Pending approval, after a fresh check
- approve_sheet(name) (POST): Pending approval -> Approved; Director only (a Books Admin is not enough)
- send_back_sheet(name, reason) (POST): Pending approval -> Sent back; Director only, reason required
- submit_sheet(name) (POST): Approved -> Submitted (final); whoever may write Labour Attendance Sheets
- cancel_sheet(name, reason) (POST): Sent back / Approved / Submitted -> Cancelled; Director only, reason required
- amend_sheet(name) (POST): copies a Cancelled sheet into a new Draft for the same week (one amendment per cancelled sheet);
  whoever may write Labour Attendance Sheets. Returns the new sheet.
A Director may hold no Frappe role permission on this doctype, so these check access themselves and save
with ignore_permissions. The Director check for the screen is api.labour_contract.my_permissions.
"""
import frappe
from frappe import _
from frappe.utils import now_datetime

from psd_books.invoicing.doctype.labour_attendance_sheet import labour_attendance_sheet as rules

DOCTYPE = rules.DOCTYPE
FIELDS = ["name", "status", "week_start", "week_end", "total_amount", "raised_by", "approved_by", "approved_on",
	"submitted_by", "submitted_on", "rejection_reason", "cancelled_by", "cancelled_on", "cancel_reason", "amends_sheet"]
LINE_FIELDS = rules.LINE_KEYS + ("days", "ot_amount", "total")


def _load(name):
	if not name or not frappe.db.exists(DOCTYPE, name):
		frappe.throw(_("Labour Attendance Sheet {0} not found").format(name), frappe.DoesNotExistError)
	doc = frappe.get_doc(DOCTYPE, name)
	from psd_books.utils.access import assert_company
	assert_company(doc.get("company"))
	return doc


def _summary(doc):
	doc.reload()
	out = {k: doc.get(k) for k in FIELDS}
	out["lines"] = [{k: ln.get(k) for k in LINE_FIELDS} for ln in doc.get("lines") or []]
	return out


@frappe.whitelist(allow_guest=False, methods=["GET"])
def preview(week_date, name=None):
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, "read")
	ws = rules.saturday_of(week_date)
	company = frappe.db.get_value(DOCTYPE, name, "company") if name else None
	if not company:
		from psd_books.utils.tenancy import _is_bypass, get_user_company
		company = "" if _is_bypass(frappe.session.user) else (get_user_company(frappe.session.user) or "")
	filters = {"week_start": ws, "name": ["!=", name or ""], "status": ["!=", rules.CANCELLED]}
	if company:
		filters["company"] = company
	existing = frappe.get_all(DOCTYPE, filters=filters, pluck="name")
	rows = rules.baseline_rows(ws, company)
	for r in rows:
		r.update(rules.figures(r))
	return {"week_start": ws, "week_end": rules.friday_of(ws), "existing_sheet": existing[0] if existing else None, "rows": rows}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def send_for_approval(name):
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, "write")
	doc = _load(name)
	problems = rules.current_blockers(doc) if doc.status in rules.SENDABLE else []
	rules.send_for_approval(doc, problems, frappe.session.user)
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def approve_sheet(name):
	doc = _load(name)
	problems = rules.blockers(rules.line_dicts(doc)) if doc.status == rules.PENDING else []
	rules.approve(doc, problems, frappe.session.user, frappe.get_roles(), now_datetime())
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def send_back_sheet(name, reason=None):
	doc = _load(name)
	rules.send_back(doc, frappe.session.user, frappe.get_roles(), reason)
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def submit_sheet(name):
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, "write")
	doc = _load(name)
	rules.submit(doc, frappe.session.user, now_datetime())
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def cancel_sheet(name, reason=None):
	doc = _load(name)
	rules.cancel(doc, frappe.session.user, frappe.get_roles(), reason, now_datetime())
	doc.save(ignore_permissions=True)
	return _summary(doc)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def amend_sheet(name):
	from psd_books.utils.access import assert_can
	assert_can(DOCTYPE, "write")
	doc = _load(name)
	rules.check_amend(doc, rules.amendment_of(name))
	new = frappe.get_doc(rules.amended_values(doc))
	new.insert(ignore_permissions=True)
	return _summary(new)