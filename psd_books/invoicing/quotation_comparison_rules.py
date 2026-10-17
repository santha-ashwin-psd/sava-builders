"""Quotation Comparison rules (Sava A9.3).

- a comparison is made against a Sent RFQ, in the RFQ's company
- one open comparison per RFQ (Draft, Pending Approval, Approved)
- the chosen supplier must have an Active quotation that quoted the line
- a reason is required only when the chosen net rate is above L1
- the server fills rank, lowest, rate, VAT, amounts and totals; the client sends only
  selected_quotation and reason per line
- status changes only with flags.qc_workflow (approval in A9.4, LPO creation in A9.5)
- approval by total incl. VAT: Purchase Manager always; Finance above KES 200,000;
  Director above KES 500,000 (strictly above). Levels run in order.
"""
import json
from decimal import Decimal

import frappe
from frappe import _
from frappe.utils import nowdate

from psd_books.invoicing import quotation_comparison_calc as calc

RFQ_OPEN_STATUS = "Sent"
OPEN_STATUSES = ("Draft", "Pending Approval", "Approved")
EDITABLE_STATUS = "Draft"
ITEM_FIELDS = ["mrn_item", "selected_quotation", "selected_supplier", "supplier_name", "selected_rank",
	"lowest_quotation", "lowest_rate", "net_rate", "vat_percent", "amount", "tax_amount", "reason"]


# --- loading ---------------------------------------------------------------
def load_rfq(name):
	rfq = frappe.db.get_value(
		"Request for Quotation", name,
		["name", "status", "company", "project", "posting_date"], as_dict=True)
	if not rfq:
		frappe.throw(_("Request for Quotation {0} not found").format(name))
	return rfq


def check_rfq(rfq, doc_company=None):
	if rfq.get("status") != RFQ_OPEN_STATUS:
		frappe.throw(_("Request for Quotation {0} is {1}. Comparisons can only be made against a Sent request.")
			.format(rfq.get("name"), rfq.get("status")))
	if doc_company and rfq.get("company") and doc_company != rfq.get("company"):
		frappe.throw(_("Request for Quotation {0} belongs to another company.").format(rfq.get("name")))


def rfq_lines(rfq_name):
	"""One line per RFQ item, in RFQ order. An MRN line split over two RFQ rows is added up."""
	rows = frappe.get_all(
		"Request for Quotation Item", filters={"parent": rfq_name, "parenttype": "Request for Quotation"},
		fields=["mrn_item", "item_code", "item_name", "qty", "uom"], order_by="idx asc")
	lines, order = {}, []
	for r in rows:
		key = r.get("mrn_item")
		if key in lines:
			lines[key]["qty"] = float(lines[key]["qty"] or 0) + float(r.get("qty") or 0)
		else:
			lines[key] = {"mrn_item": key, "item_code": r.get("item_code"), "item_name": r.get("item_name"),
				"uom": r.get("uom"), "qty": float(r.get("qty") or 0)}
			order.append(key)
	return [lines[k] for k in order]


def active_quotations(rfq_name):
	"""Active quotations on the RFQ, shaped the way calc.rank_item reads them."""
	heads = frappe.get_all(
		"Supplier Quotation", filters={"request_for_quotation": rfq_name, "status": "Active"},
		fields=["name", "supplier", "supplier_name", "quotation_date", "delivery_days"], order_by="name asc")
	if not heads:
		return []
	rows = frappe.get_all(
		"Supplier Quotation Item",
		filters={"parenttype": "Supplier Quotation", "parent": ["in", [h.name for h in heads]]},
		fields=["parent", "mrn_item", "rate", "net_rate", "vat_percent", "amount", "tax_amount"])
	by_parent = {}
	for r in rows:
		by_parent.setdefault(r.get("parent"), []).append(dict(r))
	out = []
	for h in heads:
		q = dict(h)
		q["quotation"] = h.name
		q["items"] = by_parent.get(h.name, [])
		out.append(q)
	return out


def build(rfq_name):
	lines = rfq_lines(rfq_name)
	ranking = calc.rank_comparison(lines, active_quotations(rfq_name))
	return {"lines": lines, "ranking": ranking}


def open_comparison(rfq_name, exclude=None):
	filters = {"request_for_quotation": rfq_name, "status": ["in", list(OPEN_STATUSES)]}
	if exclude:
		filters["name"] = ["!=", exclude]
	return frappe.db.get_value("Quotation Comparison", filters, "name")


def check_no_open(rfq_name, exclude=None):
	other = open_comparison(rfq_name, exclude)
	if other:
		frappe.throw(_("Request for Quotation {0} already has an open comparison ({1}). Open that one instead.")
			.format(rfq_name, other))


# --- selections ------------------------------------------------------------
def parse_selections(selections):
	"""Accept None, a JSON string, a {mrn_item: {...}} dict, or a list of row dicts -> {mrn_item: {...}}."""
	if not selections:
		return {}
	if isinstance(selections, str):
		selections = json.loads(selections)
	if isinstance(selections, dict):
		return selections
	out = {}
	for r in selections:
		if r.get("mrn_item") in out:
			frappe.throw(_("Item {0} is listed more than once.").format(r.get("mrn_item")))
		out[r.get("mrn_item")] = r
	return out


def parse_items(data):
	"""Save payload: JSON string or dict with an items list -> list of row dicts."""
	if isinstance(data, str):
		data = json.loads(data or "{}")
	if not isinstance(data, dict):
		frappe.throw(_("Invalid comparison data."))
	items = data.get("items") or []
	if not isinstance(items, list):
		frappe.throw(_("Invalid comparison data."))
	return items


def selections_from_rows(rows):
	return parse_selections([{"mrn_item": r.get("mrn_item"), "selected_quotation": r.get("selected_quotation"),
		"reason": r.get("reason")} for r in rows])


def check_rows_complete(lines, rows):
	"""Every RFQ line must appear exactly once, and no other line may appear."""
	wanted = {l["mrn_item"]: l for l in lines}
	seen = set()
	for r in rows:
		key = r.get("mrn_item")
		if key in seen:
			frappe.throw(_("Item {0} is listed more than once.").format(key))
		if key not in wanted:
			frappe.throw(_("Item {0} is not on this Request for Quotation.").format(key))
		seen.add(key)
	missing = [wanted[k].get("item_code") or k for k in wanted if k not in seen]
	if missing:
		frappe.throw(_("Items missing from the comparison: {0}.").format(", ".join(missing)))


def apply_selections(ranking, selections=None, default_missing=False):
	"""Build the comparison item rows.

	selections: {mrn_item: {selected_quotation, reason}}. A line that is in selections is taken as sent
	(a blank choice on a quoted line is an error). A line missing from selections gets L1 when
	default_missing is True and is an error otherwise.
	An item nobody quoted gets a blank row; it is not awarded, which blocks approval (A9.4).
	"""
	selections = selections or {}
	rows = []
	for entry in ranking:
		line = entry["line"]
		key = line["mrn_item"]
		label = line.get("item_code") or key
		if key in selections:
			chosen = (selections[key] or {}).get("selected_quotation") or None
		elif default_missing:
			chosen = calc.default_choice(entry)
		else:
			frappe.throw(_("Row for item {0} is missing.").format(label))

		row = {"mrn_item": key, "item_code": line.get("item_code"), "item_name": line.get("item_name"),
			"uom": line.get("uom"), "qty": line.get("qty"), "selected_quotation": None, "selected_supplier": None,
			"supplier_name": None, "selected_rank": None, "lowest_quotation": None, "lowest_rate": None,
			"net_rate": None, "vat_percent": None, "amount": 0, "tax_amount": 0, "reason": ""}
		if not entry["offers"]:
			rows.append(row)
			continue
		if not chosen:
			frappe.throw(_("Choose a supplier for item {0}.").format(label))
		offer = calc.find_offer(entry, chosen)
		if offer is None:
			frappe.throw(_("{0} has no active quotation for item {1}. Pick a supplier that quoted it.")
				.format(chosen, label))
		reason = str((selections.get(key) or {}).get("reason") or "").strip()
		if calc.reason_required(entry, chosen) and not reason:
			frappe.throw(_("Give a reason for choosing {0} for item {1}: the rate is above the lowest (L1).")
				.format(offer["supplier_name"], label))
		lowest = entry["lowest"]
		row.update({
			"selected_quotation": offer["quotation"], "selected_supplier": offer["supplier"],
			"supplier_name": offer["supplier_name"], "selected_rank": offer["rank"],
			"lowest_quotation": lowest["quotation"], "lowest_rate": lowest["net_rate"],
			"net_rate": offer["net_rate"], "vat_percent": offer["vat_percent"],
			"amount": offer["amount"], "tax_amount": offer["tax_amount"], "reason": reason,
		})
		rows.append(row)
	return rows


def check_all_awarded(ranking):
	"""Used by the approval step (A9.4): every RFQ item needs a supplier."""
	unquoted = calc.unquoted_items(ranking)
	if unquoted:
		frappe.throw(_("No supplier quoted these items, so the comparison can't be approved: {0}.")
			.format(", ".join(unquoted)))


def apply_totals(doc, rows):
	t = calc.totals(rows)
	doc.net_total = t["net_total"]
	doc.total_tax = t["total_tax"]
	doc.grand_total = t["grand_total"]


# --- status ----------------------------------------------------------------
def keep_status_server_side(doc, before):
	"""Status changes only with flags.qc_workflow (A9.4 / A9.5)."""
	if doc.flags.get("qc_workflow"):
		return
	doc.status = EDITABLE_STATUS if (doc.is_new() or before is None) else before.status


# --- save hook -------------------------------------------------------------
def validate_comparison(doc):
	before = doc.get_doc_before_save()
	keep_status_server_side(doc, before)
	if before is not None and before.status != EDITABLE_STATUS and not doc.flags.get("qc_workflow"):
		frappe.throw(_("A {0} comparison can't be edited.").format(before.status.lower()))
	if doc.status != EDITABLE_STATUS:
		return  # approval and LPO steps run their own checks (A9.4 / A9.5)

	if not doc.get("request_for_quotation"):
		frappe.throw(_("Select the Request for Quotation."))
	rfq = load_rfq(doc.request_for_quotation)
	check_rfq(rfq, doc.get("company"))
	doc.company = rfq.get("company")
	doc.project = rfq.get("project") or None
	check_no_open(rfq["name"], exclude=None if doc.is_new() else doc.name)
	if not doc.get("comparison_date"):
		doc.comparison_date = nowdate()

	ctx = build(rfq["name"])
	rows = doc.get("items") or []
	if not rows:
		frappe.throw(_("Add the RFQ items to compare."))
	check_rows_complete(ctx["lines"], rows)
	chosen = apply_selections(ctx["ranking"], selections_from_rows(rows))
	doc.set("items", chosen)
	apply_totals(doc, chosen)


# --- read-only data for the screen ----------------------------------------
COMPARISON_FIELDS = ["name", "status", "comparison_date", "net_total", "total_tax", "grand_total",
	"raised_by", "rejection_reason", "remarks"]
STEP_FIELDS = ["level", "role", "status", "approver", "approved_on", "remarks"]


def action_state(status, raised_by, steps, user, roles):
	"""What user may do on the pending level, as data (no exception). Mirrors check_can_act (A9.4).
	steps: list of dicts with level, role, status, approver. -> {level, role, can_act, reason}"""
	out = {"level": None, "role": None, "can_act": False, "reason": None}
	if status != PENDING_APPROVAL:
		return out
	step = next((s for s in steps or [] if s.get("status") == STEP_PENDING), None)
	if step is None:
		out["reason"] = _("No approval level is pending.")
		return out
	out["level"], out["role"] = step.get("level"), step.get("role")
	if user == raised_by:
		out["reason"] = _("You raised this comparison, so another person must approve it.")
	elif any(s.get("status") == STEP_APPROVED and s.get("approver") == user for s in steps or []):
		out["reason"] = _("You already approved a level. Another person must approve the next level.")
	elif step.get("role") not in (roles or []):
		out["reason"] = _("Level {0} needs the {1} role.").format(step.get("level"), step.get("role"))
	else:
		out["can_act"] = True
	return out


def supplier_summary(items):
	"""Awarded lines grouped by supplier -> list of {supplier, supplier_name, line_count, net_total, total_tax,
	grand_total}. One LPO is made per entry (A9.5). Lines with no supplier are left out."""
	lines = [{"supplier": i.get("selected_supplier"), "supplier_name": i.get("supplier_name"),
		"amount": i.get("amount"), "tax_amount": i.get("tax_amount")} for i in items if i.get("selected_supplier")]
	out = []
	for key, g in calc.supplier_totals(lines).items():
		out.append({"supplier": key, "supplier_name": g["supplier_name"], "line_count": len(g["lines"]),
			"net_total": g["net_total"], "total_tax": g["total_tax"], "grand_total": g["grand_total"]})
	return out


def comparison_detail(name, user, roles):
	"""The comparison itself for the screen: header, approval steps, supplier totals, LPOs, and what user may do."""
	head = frappe.db.get_value("Quotation Comparison", name, COMPARISON_FIELDS, as_dict=True)
	if not head:
		frappe.throw(_("Quotation Comparison {0} not found").format(name))
	items = frappe.get_all(
		"Quotation Comparison Item", filters={"parent": name, "parenttype": "Quotation Comparison"},
		fields=ITEM_FIELDS, order_by="idx asc")
	steps = frappe.get_all(
		"Quotation Comparison Approval", filters={"parent": name, "parenttype": "Quotation Comparison"},
		fields=STEP_FIELDS, order_by="idx asc")
	lpos = frappe.get_all(
		"Purchase Order", filters={"quotation_comparison": name},
		fields=["name", "supplier", "supplier_name", "status", "grand_total"], order_by="name asc")
	detail = dict(head)
	detail.update({
		"editable": head.get("status") == EDITABLE_STATUS,
		"approval_steps": [dict(s) for s in steps], "supplier_totals": supplier_summary(items),
		"lpos": [dict(p) for p in lpos],
		"action": action_state(head.get("status"), head.get("raised_by"), steps, user, roles),
	})
	return detail, [dict(i) for i in items]


def comparison_data(rfq, comparison_name=None, user=None, roles=None):
	user = user or frappe.session.user
	roles = roles if roles is not None else frappe.get_roles()
	ctx = build(rfq["name"])
	open_name = comparison_name or open_comparison(rfq["name"])
	detail, items = (None, [])
	if open_name:
		detail, items = comparison_detail(open_name, user, roles)
	history = frappe.get_all(
		"Quotation Comparison", filters={"request_for_quotation": rfq["name"]},
		fields=["name", "status", "comparison_date", "grand_total"], order_by="creation desc")
	ranking = [{"line": e["line"], "offers": e["offers"], "default_quotation": calc.default_choice(e)}
		for e in ctx["ranking"]]
	return {
		"request_for_quotation": rfq["name"], "rfq_status": rfq.get("status"), "company": rfq.get("company"),
		"project": rfq.get("project") or None,
		"ranking": ranking, "unquoted": calc.unquoted_items(ctx["ranking"]),
		"open_comparison": open_name, "comparison": detail, "items": items,
		"comparisons": [dict(h) for h in history],
		"can_create": rfq.get("status") == RFQ_OPEN_STATUS and not open_name,
	}


def summary(doc):
	return {"name": doc.name, "status": doc.status, "net_total": doc.net_total,
		"total_tax": doc.total_tax, "grand_total": doc.grand_total}


# --- approval (A9.4) -------------------------------------------------------
APPROVAL_ROLES = ("Purchase Manager", "Finance", "Director")
FINANCE_ABOVE = Decimal("200000")
DIRECTOR_ABOVE = Decimal("500000")
PENDING_APPROVAL = "Pending Approval"
APPROVED = "Approved"
REJECTED = "Rejected"
STEP_PENDING = "Pending"
STEP_APPROVED = "Approved"
STEP_REJECTED = "Rejected"


def required_roles(total):
	"""Approval levels for a total incl. VAT. A total exactly on a threshold does not add a level."""
	value = Decimal(str(total or 0))
	roles = ["Purchase Manager"]
	if value > FINANCE_ABOVE:
		roles.append("Finance")
	if value > DIRECTOR_ABOVE:
		roles.append("Director")
	return roles


def build_steps(total):
	return [{"level": i, "role": role, "status": STEP_PENDING} for i, role in enumerate(required_roles(total), 1)]


def current_step(doc):
	return next((s for s in (doc.get("approval_steps") or []) if s.status == STEP_PENDING), None)


def check_can_act(doc, user, roles):
	"""The step that user may act on now, or a refusal."""
	if doc.status != PENDING_APPROVAL:
		frappe.throw(_("{0} is {1}. Only a comparison pending approval can be approved or rejected.")
			.format(doc.name, doc.status))
	if user == doc.raised_by:
		frappe.throw(_("The person who raised the comparison can't approve or reject it."))
	step = current_step(doc)
	if step is None:
		frappe.throw(_("No approval level is pending on {0}.").format(doc.name))
	if any(s.status == STEP_APPROVED and s.approver == user for s in doc.get("approval_steps") or []):
		frappe.throw(_("You already approved a level of this comparison. Another person must approve the next level."))
	if step.role not in roles:
		frappe.throw(_("Level {0} needs the {1} role.").format(step.level, step.role))
	return step


def submit_for_approval(doc, user):
	"""Draft -> Pending Approval. Re-checks the comparison against today's Active quotations first."""
	if doc.status != EDITABLE_STATUS:
		frappe.throw(_("Only a Draft comparison can be sent for approval ({0} is {1}).").format(doc.name, doc.status))
	validate_comparison(doc)
	check_all_awarded(build(doc.request_for_quotation)["ranking"])
	doc.raised_by = user
	doc.rejection_reason = None
	doc.set("approval_steps", build_steps(doc.grand_total))
	doc.status = PENDING_APPROVAL
	doc.flags.qc_workflow = True


def approve(doc, user, roles, remarks, now):
	step = check_can_act(doc, user, roles)
	step.status = STEP_APPROVED
	step.approver = user
	step.approved_on = now
	step.remarks = (remarks or "").strip()
	if current_step(doc) is None:
		doc.status = APPROVED
	doc.flags.qc_workflow = True


def reject(doc, user, roles, reason, now):
	reason = (reason or "").strip()
	if not reason:
		frappe.throw(_("Give a reason for rejecting the comparison."))
	step = check_can_act(doc, user, roles)
	step.status = STEP_REJECTED
	step.approver = user
	step.approved_on = now
	step.remarks = reason
	doc.status = REJECTED
	doc.rejection_reason = reason
	doc.flags.qc_workflow = True