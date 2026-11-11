"""Sava A15: procurement reports. Each one takes an optional project and returns plain rows.

- mrn_vs_lpo:       each MRN line against the LPO quantity ordered for it
- lpo_vs_grn:       each LPO line against what has been received on GRNs
- project_summary:  per project: MRNs, LPOs, LPO value, received and billed
- supplier_analysis: per supplier: LPOs, LPO value, received, billed
- asset_register:   per asset item (Item.is_asset_item): opening, purchase (GRN), total, issued, adjustment, closing qty
"""
import frappe
from frappe import _
from frappe.utils import flt, getdate


def _project_names():
	return {p.name: p.project_name for p in frappe.get_all("Project", fields=["name", "project_name"], limit_page_length=0)}


def _project_filter(filters, project, field="project"):
	if project:
		filters[field] = project
	return filters


@frappe.whitelist(allow_guest=False)
def mrn_vs_lpo(project=None):
	mrn_filters = _project_filter({"docstatus": 1}, project)
	mrns = frappe.get_all("Material Request", filters=mrn_filters, fields=["name", "project", "status"])
	names = _project_names()
	rows = []
	for m in mrns:
		for it in frappe.get_all("Material Request Item", filters={"parent": m.name},
				fields=["name", "item_code", "item_name", "required_qty", "uom"]):
			ordered = frappe.db.sql("""
				SELECT COALESCE(SUM(poi.qty), 0) FROM `tabPurchase Order Item` poi
				JOIN `tabPurchase Order` po ON po.name = poi.parent
				WHERE po.material_request = %s AND po.docstatus = 1 AND poi.item_code = %s
			""", (m.name, it.item_code))[0][0]
			rows.append({
				"mrn": m.name, "project": m.project or "", "project_name": names.get(m.project) or m.project or "", "mrn_status": m.status,
				"item_code": it.item_code, "item_name": it.item_name or it.item_code, "uom": it.uom or "",
				"required_qty": flt(it.required_qty), "ordered_qty": flt(ordered),
				"not_yet_ordered": max(0.0, flt(it.required_qty) - flt(ordered)),
			})
	return rows


@frappe.whitelist(allow_guest=False)
def lpo_vs_grn(project=None):
	po_filters = _project_filter({"docstatus": 1}, project)
	pos = frappe.get_all("Purchase Order", filters=po_filters,
		fields=["name", "project", "supplier", "supplier_name", "status"])
	names = _project_names()
	rows = []
	for p in pos:
		for it in frappe.get_all("Purchase Order Item", filters={"parent": p.name},
				fields=["item_code", "item_name", "qty", "received_qty", "billed_qty", "uom"]):
			rows.append({
				"lpo": p.name, "project": p.project or "", "project_name": names.get(p.project) or p.project or "", "supplier": p.supplier,
				"supplier_name": p.supplier_name or p.supplier, "lpo_status": p.status,
				"item_code": it.item_code, "item_name": it.item_name or it.item_code, "uom": it.uom or "",
				"ordered_qty": flt(it.qty), "received_qty": flt(it.received_qty),
				"pending_qty": max(0.0, flt(it.qty) - flt(it.received_qty)),
				"billed_qty": flt(it.billed_qty),
			})
	return rows


@frappe.whitelist(allow_guest=False)
def project_summary(project=None):
	projects = frappe.get_all("Project", filters=_project_filter({}, project, field="name"), pluck="name")
	names = _project_names()
	out = []
	for pr in projects:
		mrn_count = frappe.db.count("Material Request", {"project": pr, "docstatus": 1})
		po = frappe.get_all("Purchase Order", filters={"project": pr, "docstatus": 1},
			fields=["name", "grand_total", "billed_amount"])
		po_names = [p.name for p in po]
		received = 0.0
		if po_names:
			received = flt(frappe.db.sql("""
				SELECT COALESCE(SUM(received_qty), 0) FROM `tabPurchase Order Item`
				WHERE parent IN %s""", (tuple(po_names),))[0][0])
		out.append({
			"project": pr, "project_name": names.get(pr) or pr, "mrn_count": mrn_count, "lpo_count": len(po),
			"lpo_value": sum(flt(p.grand_total) for p in po),
			"received_qty": received,
			"billed_value": sum(flt(p.billed_amount) for p in po),
		})
	return out


@frappe.whitelist(allow_guest=False)
def supplier_analysis(project=None):
	po = frappe.get_all("Purchase Order", filters=_project_filter({"docstatus": 1}, project),
		fields=["name", "supplier", "supplier_name", "grand_total", "billed_amount"])
	by_supplier = {}
	for p in po:
		s = by_supplier.setdefault(p.supplier, {"supplier": p.supplier, "supplier_name": p.supplier_name or p.supplier,
			"lpo_count": 0, "lpo_value": 0.0, "billed_value": 0.0, "received_qty": 0.0})
		s["lpo_count"] += 1
		s["lpo_value"] += flt(p.grand_total)
		s["billed_value"] += flt(p.billed_amount)
		s["received_qty"] += flt(frappe.db.sql("""
			SELECT COALESCE(SUM(received_qty), 0) FROM `tabPurchase Order Item` WHERE parent = %s""", (p.name,))[0][0])
	return sorted(by_supplier.values(), key=lambda r: -r["lpo_value"])


def build_asset_register(items, ledger, from_date=None):
	"""Pure logic (no DB) so it can be tested on its own.

	items:  dicts with item_code, item_name, stock_uom (Items flagged is_asset_item)
	ledger: grouped Stock Ledger rows: item_code, is_before (1 = posted before From date),
	        entry_type (Stock Entry type, or None for other vouchers), qty_in, qty_out

	Opening  = balance before From date + any "Opening Stock" entries in the period
	Purchase = Material Receipts (GRN) in the period
	Issued   = Material Issues in the period
	Adjust   = net of every other movement (adjustments, manufacture ...); transfers
	           between warehouses are ignored because they net to zero.
	"""
	acc = {}
	for it in items:
		acc[it["item_code"]] = {"item_code": it["item_code"], "item_name": it.get("item_name") or it["item_code"],
			"uom": it.get("stock_uom") or "", "opening_qty": 0.0, "purchase_qty": 0.0, "total_qty": 0.0,
			"issued_qty": 0.0, "adjustment_qty": 0.0, "closing_qty": 0.0}
	for r in ledger:
		a = acc.get(r["item_code"])
		if not a:
			continue
		net = flt(r["qty_in"]) - flt(r["qty_out"])
		t = r.get("entry_type")
		if r.get("is_before") or t == "Opening Stock":
			a["opening_qty"] += net
		elif t == "Material Receipt":
			a["purchase_qty"] += net
		elif t == "Material Issue":
			a["issued_qty"] -= net
		elif t == "Material Transfer":
			continue
		else:
			a["adjustment_qty"] += net
	rows = []
	for a in sorted(acc.values(), key=lambda x: (x["item_name"] or "").lower()):
		a["total_qty"] = a["opening_qty"] + a["purchase_qty"]
		a["closing_qty"] = a["total_qty"] - a["issued_qty"] + a["adjustment_qty"]
		if any(a[k] for k in ("opening_qty", "purchase_qty", "issued_qty", "adjustment_qty", "closing_qty")):
			rows.append(a)
	if rows:
		tot = {"item_code": "", "item_name": "Total", "uom": ""}
		for k in ("opening_qty", "purchase_qty", "total_qty", "issued_qty", "adjustment_qty", "closing_qty"):
			tot[k] = sum(r[k] for r in rows)
		rows.append(tot)
	return rows


@frappe.whitelist(allow_guest=False)
def asset_register(from_date=None, to_date=None, project=None):
	"""Asset items (Item.is_asset_item = 1) with their quantity movement from the stock ledger."""
	from_date = str(getdate(from_date)) if from_date else "1900-01-01"
	to_date = str(getdate(to_date)) if to_date else frappe.utils.nowdate()
	items = frappe.get_all("Item", filters={"is_asset_item": 1},
		fields=["item_code", "item_name", "stock_uom"], limit_page_length=0)
	if not items:
		return []
	ledger = frappe.db.sql("""
		SELECT sle.item_code,
			IF(sle.posting_date < %(f)s, 1, 0) AS is_before,
			se.stock_entry_type AS entry_type,
			SUM(IF(sle.actual_qty > 0, sle.actual_qty, 0)) AS qty_in,
			SUM(IF(sle.actual_qty < 0, -sle.actual_qty, 0)) AS qty_out
		FROM `tabStock Ledger Entry` sle
		LEFT JOIN `tabStock Entry` se ON sle.voucher_type = 'Stock Entry' AND se.name = sle.voucher_no
		WHERE sle.is_cancelled = 0 AND sle.posting_date <= %(t)s AND sle.item_code IN %(codes)s
		GROUP BY sle.item_code, IF(sle.posting_date < %(f)s, 1, 0), se.stock_entry_type
	""", {"f": from_date, "t": to_date, "codes": tuple(i["item_code"] for i in items)}, as_dict=True)
	return build_asset_register(items, ledger)