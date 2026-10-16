"""Quotation Comparison -> Draft Purchase Orders (Sava A9.5).

- only an Approved comparison can create LPOs, once (a second call is refused)
- one Draft Purchase Order per selected supplier, with that supplier's awarded lines
- rates and VAT are the approved ones stored on the comparison, not today's quotations
- PO line rate = the quotation's net rate (after discount, before VAT); VAT goes to the PO tax lines,
  one line per VAT rate, with the amount taken from the comparison
- header fields come from the RFQ (project, material request, delivery warehouse); expected delivery
  is today + the quotation's delivery days
- comparison status becomes LPOs Created (flags.qc_workflow)
"""
import frappe
from frappe import _
from frappe.utils import add_days, nowdate

APPROVED = "Approved"
LPOS_CREATED = "LPOs Created"


# --- pure logic (tested without a database) ---------------------------------
def check_can_create(status, rows, existing_pos):
	if status != APPROVED:
		frappe.throw(_("Only an Approved comparison can create LPOs (this one is {0}).").format(status))
	if existing_pos:
		frappe.throw(_("LPOs already exist for this comparison: {0}.").format(", ".join(existing_pos)))
	if not rows:
		frappe.throw(_("This comparison has no items."))
	unawarded = [r.get("item_code") or r.get("mrn_item") for r in rows if not r.get("selected_supplier")]
	if unawarded:
		frappe.throw(_("These items have no supplier, so no LPO can be made: {0}.").format(", ".join(unawarded)))


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
			"description": r.get("item_name"), "qty": r.get("qty"), "uom": r.get("uom"),
			"rate": r.get("net_rate"), "tax_code": tax_code_for(r.get("item_code"))})
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


def create_lpos(doc):
	"""doc: the Approved comparison. Returns [{name, supplier, grand_total}]. All or nothing in one request."""
	current = frappe.db.get_value("Quotation Comparison", doc.name, "status", for_update=True)
	existing = frappe.get_all("Purchase Order", filters={"quotation_comparison": doc.name, "docstatus": ["!=", 2]},
		pluck="name")
	rows = [r.as_dict() for r in doc.get("items") or []]
	check_can_create(current, rows, existing)

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
	for supplier, group in group_by_supplier(rows).items():
		quotation = group[0].get("selected_quotation")
		days = frappe.db.get_value("Supplier Quotation", quotation, "delivery_days") if quotation else None
		values = build_po_values(comparison, rfq, supplier, group, days, today, tax_code_for, account_for)
		po = frappe.get_doc(values)
		po.insert(ignore_permissions=True)
		made.append({"name": po.name, "supplier": supplier, "grand_total": po.grand_total})

	doc.status = LPOS_CREATED
	doc.flags.qc_workflow = True
	doc.save(ignore_permissions=True)
	return made