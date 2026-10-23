"""Sava A15: procurement reports. Each one takes an optional project and returns plain rows.

- mrn_vs_lpo:       each MRN line against the LPO quantity ordered for it
- lpo_vs_grn:       each LPO line against what has been received on GRNs
- project_summary:  per project: MRNs, LPOs, LPO value, received and billed
- supplier_analysis: per supplier: LPOs, LPO value, received, billed
"""
import frappe
from frappe import _
from frappe.utils import flt


def _project_filter(filters, project, field="project"):
	if project:
		filters[field] = project
	return filters


@frappe.whitelist(allow_guest=False)
def mrn_vs_lpo(project=None):
	mrn_filters = _project_filter({"docstatus": 1}, project)
	mrns = frappe.get_all("Material Request", filters=mrn_filters, fields=["name", "project", "status"])
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
				"mrn": m.name, "project": m.project or "", "mrn_status": m.status,
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
	rows = []
	for p in pos:
		for it in frappe.get_all("Purchase Order Item", filters={"parent": p.name},
				fields=["item_code", "item_name", "qty", "received_qty", "billed_qty", "uom"]):
			rows.append({
				"lpo": p.name, "project": p.project or "", "supplier": p.supplier,
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
			"project": pr, "mrn_count": mrn_count, "lpo_count": len(po),
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