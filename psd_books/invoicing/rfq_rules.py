"""Request for Quotation rules (Sava A7.1).

An RFQ is raised from an approved Purchase MRN and emailed to at least one
supplier, each in a separate email so no supplier sees the others.

- validate_draft(doc): MRN, item, supplier and date checks on every draft save
- build_rfq_prefill(mrn, lines): what a new RFQ starts with (no database)
- plan_send(status, rows): which suppliers get an email now, or why none can
- send_to_suppliers(doc, targets, sender, ...): one email per supplier, result kept per row
"""
from html import escape

import frappe
from frappe import _
from frappe.utils import add_days, flt, getdate, nowdate

MRN_STATUSES = ("Approved", "Partly Issued")
MIN_SUPPLIERS = 1
EPS = 0.0001
ERROR_LEN = 140


# --- MRN -------------------------------------------------------------------
def load_mrn(name):
	mrn = frappe.db.get_value(
		"Material Request", name,
		["name", "docstatus", "status", "material_request_type", "company", "project", "delivery_warehouse"],
		as_dict=True)
	if not mrn:
		frappe.throw(_("Material Request {0} not found").format(name))
	return mrn


def mrn_lines(mrn_name):
	"""{mrn_item name: line} for every line of the MRN, with issued_qty."""
	return {r.name: r for r in frappe.get_all(
		"Material Request Item", filters={"parent": mrn_name, "parenttype": "Material Request"},
		fields=["name", "item_code", "item_name", "required_qty", "issued_qty", "uom", "intended_use"],
		order_by="idx asc")}


def pending_qty(line):
	return flt(line.get("required_qty")) - flt(line.get("issued_qty"))


def check_mrn(mrn, company=None):
	if mrn.get("docstatus") != 1 or mrn.get("status") not in MRN_STATUSES:
		frappe.throw(_("Material Request {0} is not open for a quotation request (status: {1}). "
			"Only Approved or Partly Issued requests can have one.").format(mrn.get("name"), mrn.get("status")))
	if mrn.get("material_request_type") not in ("Purchase", "Asset"):
		frappe.throw(_("Material Request {0} is a {1} request. Only Purchase or Asset requests can have an RFQ.")
			.format(mrn.get("name"), mrn.get("material_request_type")))
	if company and mrn.get("company") and mrn.get("company") != company:
		frappe.throw(_("Material Request {0} belongs to another company.").format(mrn.get("name")))


def build_rfq_prefill(mrn, lines, respond_in_days=7):
	"""`mrn` is a dict and `lines` a list of dicts. Pending lines only."""
	check_mrn(mrn)
	items = []
	for line in lines:
		pending = pending_qty(line)
		if pending <= EPS:
			continue
		items.append({
			"mrn_item": line.get("name"),
			"item_code": line.get("item_code"),
			"item_name": line.get("item_name") or line.get("item_code"),
			"uom": line.get("uom") or "",
			"qty": pending,
			"intended_use": line.get("intended_use") or "",
		})
	if not items:
		frappe.throw(_("Material Request {0} has nothing pending to request quotations for.").format(mrn.get("name")))
	return {
		"material_request": mrn.get("name"),
		"company": mrn.get("company"),
		"project": mrn.get("project") or "",
		"delivery_warehouse": mrn.get("delivery_warehouse") or "",
		"posting_date": nowdate(),
		"respond_by": add_days(nowdate(), respond_in_days),
		"items": items,
	}


# --- draft checks ----------------------------------------------------------
def validate_draft(doc):
	if not doc.get("material_request"):
		frappe.throw(_("Select the Material Request this quotation request is raised from."))
	mrn = load_mrn(doc.material_request)
	check_mrn(mrn, doc.get("company"))
	doc.project = mrn.get("project") or None
	doc.delivery_warehouse = mrn.get("delivery_warehouse") or None
	check_items(doc, mrn_lines(mrn.name))
	check_suppliers(doc)
	check_dates(doc)


def check_items(doc, lines):
	if not doc.get("items"):
		frappe.throw(_("Add at least one item."))
	totals = {}
	for row in doc.items:
		if not row.get("mrn_item"):
			frappe.throw(_("Row {0}: select the MRN line this item comes from.").format(row.idx))
		line = lines.get(row.mrn_item)
		if not line:
			frappe.throw(_("Row {0}: line {1} is not on Material Request {2}.")
				.format(row.idx, row.mrn_item, doc.material_request))
		if line.item_code != row.item_code:
			frappe.throw(_("Row {0}: item {1} does not match the MRN line ({2}).")
				.format(row.idx, row.item_code, line.item_code))
		if flt(row.qty) <= 0:
			frappe.throw(_("Row {0}: quantity must be greater than zero.").format(row.idx))
		if line.get("uom"):
			row.uom = line.uom
		if not (row.get("intended_use") or "").strip():
			row.intended_use = line.get("intended_use")
		row.item_name = row.get("item_name") or line.get("item_name") or row.item_code
		totals[row.mrn_item] = totals.get(row.mrn_item, 0.0) + flt(row.qty)
	for mrn_item, qty in totals.items():
		line = lines[mrn_item]
		pending = pending_qty(line)
		if qty > pending + EPS:
			frappe.throw(_("Item {0}: requesting {1} is more than the pending MRN quantity {2} "
				"(required {3}, already issued {4}).").format(
				line.item_code, qty, max(pending, 0), flt(line.required_qty), flt(line.issued_qty)))


def check_suppliers(doc):
	seen = set()
	for row in doc.get("suppliers") or []:
		if not row.get("supplier"):
			frappe.throw(_("Row {0}: select a supplier.").format(row.idx))
		if row.supplier in seen:
			frappe.throw(_("Supplier {0} is listed more than once.").format(row.supplier))
		seen.add(row.supplier)
		info = frappe.db.get_value("Supplier", row.supplier, ["supplier_name", "email_id", "disabled"], as_dict=True)
		if not info:
			frappe.throw(_("Row {0}: supplier {1} not found.").format(row.idx, row.supplier))
		if info.get("disabled"):
			frappe.throw(_("Row {0}: supplier {1} is disabled.").format(row.idx, row.supplier))
		row.supplier_name = info.get("supplier_name") or row.supplier
		if not (row.get("email_id") or "").strip():
			row.email_id = info.get("email_id")


def check_dates(doc):
	if not doc.get("posting_date"):
		doc.posting_date = nowdate()
	if doc.get("respond_by") and getdate(doc.respond_by) < getdate(doc.posting_date):
		frappe.throw(_("Respond By can't be earlier than the RFQ date."))


# --- sending ---------------------------------------------------------------
def plan_send(status, rows):
	"""Rows that get an email now. Throws when sending isn't possible."""
	if status not in ("Draft", "Sent"):
		frappe.throw(_("A {0} Request for Quotation can't be sent.").format(status))
	if len(rows) < MIN_SUPPLIERS:
		frappe.throw(_("Add at least {0} supplier(s) before sending (now {1}).").format(MIN_SUPPLIERS, len(rows)))
	targets = [r for r in rows if r.get("send_status") != "Sent"]
	if not targets:
		frappe.throw(_("This Request for Quotation was already sent to every supplier."))
	missing = [r.get("supplier_name") or r.get("supplier") for r in targets if not (r.get("email_id") or "").strip()]
	if missing:
		frappe.throw(_("No email address for: {0}. Add it on the supplier row first.").format(", ".join(missing)),
			title=_("Email missing"))
	return targets


def build_email(doc, row, company_name, project_name=None):
	"""(subject, html) for one supplier. Only that supplier's name appears in it."""
	e = escape
	items = "".join(
		"<tr><td>{0}</td><td>{1}</td><td align=\"right\">{2}</td><td>{3}</td></tr>".format(
			i, e(str(r.get("item_name") or r.get("item_code") or "")), e(str(flt(r.get("qty")))),
			e(str(r.get("uom") or "")))
		for i, r in enumerate(doc.items, 1))
	where = " - {0}".format(e(str(project_name))) if project_name else ""
	lines = [
		"<p>Dear {0},</p>".format(e(str(row.get("supplier_name") or row.get("supplier")))),
		"<p>{0} invites you to quote for the items below ({1}{2}).</p>".format(e(company_name), e(doc.name), where),
		"<p>Please send your quotation by <b>{0}</b>.</p>".format(e(str(doc.get("respond_by") or "-"))),
	]
	if doc.get("delivery_warehouse"):
		lines.append("<p>Deliver to: {0}</p>".format(e(str(doc.delivery_warehouse))))
	lines.append(
		"<table border=\"1\" cellpadding=\"6\" cellspacing=\"0\" style=\"border-collapse:collapse\">"
		"<tr><th>#</th><th>Item</th><th>Qty</th><th>UOM</th></tr>{0}</table>".format(items))
	if (doc.get("message") or "").strip():
		lines.append("<p>{0}</p>".format(e(doc.message.strip()).replace("\n", "<br>")))
	lines.append("<p>Please give your rate, any discount, delivery days and payment terms for each item, "
		"quoting reference <b>{0}</b>.</p>".format(e(doc.name)))
	lines.append("<p>Regards,<br>{0}</p>".format(e(company_name)))
	return "Request for Quotation {0}{1}".format(doc.name, where), "".join(lines)


def send_to_suppliers(doc, targets, sender, company_name, project_name=None, now=None):
	"""Email each target on its own and keep the result on its row.

	`sender(to, subject, html, company)` does the sending. One supplier failing doesn't
	stop the others. Returns (sent, failed): supplier ids, and (supplier, error) pairs."""
	if now is None:
		from frappe.utils import now_datetime
		now = now_datetime()
	sent, failed = [], []
	for row in targets:
		subject, html = build_email(doc, row, company_name, project_name)
		try:
			sender(row.email_id.strip(), subject, html, doc.get("company"))
		except Exception as e:  # noqa: BLE001 - any send problem is recorded on the row
			row.send_status = "Failed"
			row.send_error = (str(e) or e.__class__.__name__)[:ERROR_LEN]
			failed.append((row.supplier, row.send_error))
			continue
		row.send_status = "Sent"
		row.sent_on = now
		row.send_error = ""
		sent.append(row.supplier)
	return sent, failed


def status_after_send(current, rows):
	"""Sent once at least MIN_SUPPLIERS suppliers really received it, else unchanged."""
	if current in ("Draft", "Sent") and sum(1 for r in rows if r.get("send_status") == "Sent") >= MIN_SUPPLIERS:
		return "Sent"
	return current


# --- progress shown in the RFQ list (which step the RFQ has reached) -------------
# The stored status stays Draft / Sent / Cancelled (it gates sending, quoting and comparing).
# This label is only for display.
COMPARISON_LABELS = {"LPOs Created": "LPOs Created", "Partially Ordered": "Partially Ordered",
	"Approved": "Approved", "Pending Approval": "Waiting for Approval", "Draft": "Compared"}


def progress_label(status, quoted, total, comparison_status=None):
	"""First match wins: Cancelled, Draft, the live comparison's step, 'x of y quoted', then the stored status."""
	if status in ("Cancelled", "Draft"):
		return status
	if comparison_status in COMPARISON_LABELS:
		return COMPARISON_LABELS[comparison_status]
	if quoted:
		return "%d of %d quoted" % (quoted, max(total, quoted))
	return status or ""


def progress_map(rfqs, supplier_rows, comparisons):
	"""{rfq name: {label, quoted, total, comparison}}.
	rfqs: dicts with name, status. supplier_rows: dicts with parent, quotation (one per supplier row).
	comparisons: live comparisons only (dicts with request_for_quotation, status)."""
	total, quoted = {}, {}
	for r in supplier_rows or []:
		p = r.get("parent")
		total[p] = total.get(p, 0) + 1
		if r.get("quotation"):
			quoted[p] = quoted.get(p, 0) + 1
	live = {c.get("request_for_quotation"): c.get("status") for c in comparisons or []}
	out = {}
	for r in rfqs or []:
		n = r.get("name")
		out[n] = {"label": progress_label(r.get("status"), quoted.get(n, 0), total.get(n, 0), live.get(n)),
			"quoted": quoted.get(n, 0), "total": total.get(n, 0), "comparison": live.get(n)}
	return out