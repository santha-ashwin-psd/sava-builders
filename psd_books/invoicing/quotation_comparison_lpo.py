"""Quotation Comparison -> Draft Purchase Orders (Sava A9.5).

- an Approved comparison creates LPOs in rounds (partial buying): round 1 orders each line's Order Qty
  (or the quantities passed in); later rounds order part or all of the balance (RFQ qty - qty already on
  live LPOs) at the approved rate, and the caller must say how much per line
- balance = line qty - qty on this comparison's Purchase Orders that are not cancelled; deleting or
  cancelling a PO gives its qty back
- status: Partially Ordered while any balance is left, LPOs Created when none is; if a PO is deleted or
  cancelled the status follows the real balance again (sync_status), back to Approved when nothing is ordered
- one Draft Purchase Order per selected supplier, with that supplier's awarded lines
- rates and VAT are the approved ones stored on the comparison, not today's quotations
- PO line rate = the quotation's net rate (after discount, before VAT); VAT goes to the PO tax lines,
  one line per VAT rate, with the amount taken from the comparison
- header fields come from the RFQ (project, material request, delivery warehouse); expected delivery
  is today + the quotation's delivery days
- comparison status changes with flags.qc_workflow
"""
import frappe
from frappe import _
from frappe.utils import add_days, nowdate

APPROVED = "Approved"
PARTIAL = "Partially Ordered"
LPOS_CREATED = "LPOs Created"
ORDERABLE = (APPROVED, PARTIAL, LPOS_CREATED)  # LPOs Created stays orderable if a PO was later deleted/cancelled
EPS = 1e-9


# --- pure logic (tested without a database) ---------------------------------
def ordered_rows(rows):
	"""Lines with an Order Qty above 0; a line set to 0 is left out of the first round."""
	return [r for r in rows if float(r.get("order_qty") or 0) > 0]


def check_can_create(status, rows, existing_pos=None):
	"""First-round checks only (nothing ordered yet). Rounds after the first go through plan_round."""
	plan_round(status, rows, {})


def ordered_by_line(rows, po_lines):
	"""{mrn_item: qty on live POs}. po_lines: dicts with qc_mrn_item, item_code, qty.
	A PO line made before partial buying has no qc_mrn_item; it is matched to the first row with its item_code."""
	keys = [r.get("mrn_item") for r in rows]
	by_item = {}
	for r in rows:
		by_item.setdefault(r.get("item_code"), r.get("mrn_item"))
	out = {k: 0.0 for k in keys}
	for p in po_lines or []:
		key = p.get("qc_mrn_item") if p.get("qc_mrn_item") in out else by_item.get(p.get("item_code"))
		if key in out:
			out[key] += float(p.get("qty") or 0)
	return out


def balance_of(row, ordered):
	return max(float(row.get("qty") or 0) - float(ordered or 0), 0.0)


def _number(value, label):
	if value is None or value == "":
		return 0.0
	try:
		q = float(value)
	except (TypeError, ValueError):
		frappe.throw(_("Quantity for item {0} must be a number.").format(label))
	if q < 0:
		frappe.throw(_("Quantity for item {0} can't be negative.").format(label))
	return q


def plan_round(status, rows, ordered, quantities=None):
	"""Which lines and quantities go on the LPOs of this round.
	rows: comparison lines; ordered: {mrn_item: qty already on live POs}; quantities: {mrn_item: qty} or None.
	Returns copies of the lines with order_qty = this round's qty (> 0) and tax_amount for that qty."""
	if status not in ORDERABLE:
		frappe.throw(_("Only an Approved comparison can create LPOs (this one is {0}).").format(status))
	if not rows:
		frappe.throw(_("This comparison has no items."))
	balances = {r.get("mrn_item"): balance_of(r, ordered.get(r.get("mrn_item"))) for r in rows}
	if not any(b > EPS for b in balances.values()):
		frappe.throw(_("Nothing left to order on this comparison."))
	first_round = status == APPROVED and not any(float(v or 0) > EPS for v in ordered.values())
	label = lambda r: r.get("item_code") or r.get("mrn_item")  # noqa: E731

	if not quantities:
		if not first_round:
			frappe.throw(_("Enter the quantity to order for each line (up to the balance still allowed)."))
		wanted = {r.get("mrn_item"): float(r.get("order_qty") or 0) for r in rows}
	else:
		unknown = [k for k in quantities if k not in balances]
		if unknown:
			frappe.throw(_("These lines are not on the comparison: {0}.").format(", ".join(map(str, unknown))))
		wanted = {r.get("mrn_item"): _number(quantities.get(r.get("mrn_item")), label(r)) for r in rows}

	for r in rows:
		q, bal = wanted[r.get("mrn_item")], balances[r.get("mrn_item")]
		if q > bal + EPS:
			frappe.throw(_("Item {0}: {1} is more than the {2} still allowed.").format(label(r), q, bal))
	picked = [(r, wanted[r.get("mrn_item")]) for r in rows if wanted[r.get("mrn_item")] > EPS]
	if not picked:
		frappe.throw(_("Every Order Qty on this comparison is 0, so there is nothing to order.") if first_round
			else _("Every quantity is 0, so there is nothing to order."))
	unawarded = [label(r) for r, q in picked if not r.get("selected_supplier")]
	if unawarded:
		frappe.throw(_("These items have no supplier, so no LPO can be made: {0}.").format(", ".join(unawarded)))
	return [round_row(r, q) for r, q in picked]


def round_row(row, qty):
	"""Copy of the line for this round: qty, amount and VAT at the approved rate."""
	out = dict(row)
	same = abs(qty - float(row.get("order_qty") or 0)) < EPS
	out["order_qty"] = qty
	if not same:
		out["amount"] = round(float(row.get("net_rate") or 0) * qty, 2)
		out["tax_amount"] = round(out["amount"] * float(row.get("vat_percent") or 0) / 100.0, 2)
	return out


def status_after(rows, ordered_now):
	"""Partially Ordered while any line still has a balance, else LPOs Created."""
	left = any(balance_of(r, ordered_now.get(r.get("mrn_item"))) > EPS for r in rows)
	return PARTIAL if left else LPOS_CREATED


def status_for(rows, ordered_now):
	"""Status that follows the real balance: nothing on any live LPO -> Approved (round 1 again),
	some balance left -> Partially Ordered, no balance -> LPOs Created."""
	if not any(float(v or 0) > EPS for v in ordered_now.values()):
		return APPROVED
	return status_after(rows, ordered_now)


def group_by_supplier(rows):
	"""{supplier: [rows]} in the order suppliers first appear."""
	groups = {}
	for r in rows:
		groups.setdefault(r.get("selected_supplier"), []).append(r)
	return groups


def tax_lines(rows, account_for):
	"""One VAT line per (rate, account). Rate 0 or no VAT amount adds nothing.
	account_for(item_code) -> account head or None."""
	lines, order = {}, []
	for r in rows:
		rate = float(r.get("vat_percent") or 0)
		amount = float(r.get("tax_amount") or 0)
		if rate <= 0 or amount <= 0:
			continue
		key = (rate, account_for(r.get("item_code")))
		if key not in lines:
			lines[key] = 0.0
			order.append(key)
		lines[key] += amount
	return [{"tax_type": "VAT", "description": "VAT %g%%" % rate, "rate": rate,
		"tax_amount": round(total, 2), "account_head": account}
		for (rate, account), total in ((k, lines[k]) for k in order)]


def build_po_values(comparison, rfq, supplier, rows, delivery_days, today, tax_code_for, account_for):
	items = []
	for r in rows:
		items.append({"item_code": r.get("item_code"), "item_name": r.get("item_name"),
			"description": r.get("item_name"), "qty": r.get("order_qty"), "uom": r.get("uom"),
			"rate": r.get("net_rate"), "tax_code": tax_code_for(r.get("item_code")),
			"qc_mrn_item": r.get("mrn_item")})
	values = {
		"doctype": "Purchase Order", "status": "Draft", "supplier": supplier,
		"supplier_name": rows[0].get("supplier_name"), "transaction_date": today,
		"purchase_type": "Goods", "company": comparison.get("company"),
		"project": comparison.get("project") or rfq.get("project") or None,
		"material_request": rfq.get("material_request") or None,
		"set_warehouse": rfq.get("delivery_warehouse") or None,
		"ref_rfq": comparison.get("request_for_quotation"),
		"quotation_comparison": comparison.get("name"),
		"items": items, "taxes": tax_lines(rows, account_for),
	}
	if delivery_days:
		values["expected_delivery_date"] = add_days(today, int(delivery_days))
	return values


# --- database side ---------------------------------------------------------
def _item_tax(item_code, cache):
	if item_code not in cache:
		tpl = frappe.db.get_value("Item", item_code, "default_purchase_tax_template")
		cache[item_code] = tpl
	return cache[item_code]


def live_po_lines(name, exclude_po=None):
	"""Item lines of this comparison's Purchase Orders that are not cancelled (exclude_po: one PO to leave out)."""
	sql = """select poi.qc_mrn_item, poi.item_code, poi.qty from `tabPurchase Order Item` poi
		join `tabPurchase Order` po on po.name = poi.parent
		where po.quotation_comparison = %s and po.docstatus != 2"""
	args = [name]
	if exclude_po:
		sql += " and po.name != %s"
		args.append(exclude_po)
	return frappe.db.sql(sql, tuple(args), as_dict=True)


def sync_status(name, exclude_po=None):
	"""Put the comparison's status back in line with what is really on live POs (after a PO is deleted or
	cancelled). Acts only on Partially Ordered / LPOs Created. Returns the new status, or None if unchanged."""
	current = frappe.db.get_value("Quotation Comparison", name, "status", for_update=True)
	if current not in (PARTIAL, LPOS_CREATED):
		return None
	doc = frappe.get_doc("Quotation Comparison", name)
	rows = [r.as_dict() for r in doc.get("items") or []]
	new = status_for(rows, ordered_by_line(rows, live_po_lines(name, exclude_po)))
	if new == current:
		return None
	doc.status = new
	doc.flags.qc_workflow = True
	doc.save(ignore_permissions=True)
	return new


def on_po_removed(doc, method=None):
	"""Hook for Purchase Order on_trash and on_cancel. A failure here must never block deleting or cancelling the PO."""
	name = doc.get("quotation_comparison")
	if not name:
		return
	try:
		sync_status(name, exclude_po=doc.name)
	except Exception:
		frappe.log_error(title="Quotation Comparison status sync failed", message=frappe.get_traceback())


def create_lpos(doc, quantities=None):
	"""doc: the comparison. quantities: {mrn_item: qty} (later rounds; optional in round 1).
	Returns [{name, supplier, grand_total}]. All or nothing in one request."""
	current = frappe.db.get_value("Quotation Comparison", doc.name, "status", for_update=True)
	rows = [r.as_dict() for r in doc.get("items") or []]
	ordered = ordered_by_line(rows, live_po_lines(doc.name))
	round_rows = plan_round(current, rows, ordered, quantities)

	rfq = frappe.db.get_value("Request for Quotation", doc.request_for_quotation,
		["name", "project", "material_request", "delivery_warehouse"], as_dict=True) or {}
	comparison = {"name": doc.name, "company": doc.company, "project": doc.project,
		"request_for_quotation": doc.request_for_quotation}
	templates = {}
	accounts = {}

	def tax_code_for(item_code):
		return _item_tax(item_code, templates)

	def account_for(item_code):
		tpl = tax_code_for(item_code)
		if not tpl:
			return None
		if tpl not in accounts:
			accounts[tpl] = frappe.db.get_value(
				"Tax Template Detail", {"parent": tpl, "parenttype": "Tax Template"}, "account_head")
		return accounts[tpl]

	today = nowdate()
	made = []
	for supplier, group in group_by_supplier(round_rows).items():
		quotation = group[0].get("selected_quotation")
		days = frappe.db.get_value("Supplier Quotation", quotation, "delivery_days") if quotation else None
		values = build_po_values(comparison, rfq, supplier, group, days, today, tax_code_for, account_for)
		po = frappe.get_doc(values)
		po.insert(ignore_permissions=True)
		made.append({"name": po.name, "supplier": supplier, "grand_total": po.grand_total})

	ordered_now = dict(ordered)
	for r in round_rows:
		ordered_now[r.get("mrn_item")] = ordered_now.get(r.get("mrn_item"), 0.0) + float(r.get("order_qty"))
	doc.status = status_after(rows, ordered_now)
	doc.flags.qc_workflow = True
	doc.save(ignore_permissions=True)
	return made