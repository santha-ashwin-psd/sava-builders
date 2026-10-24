"""Request for Quotation API (Sava A7.1).

Endpoints
- get_rfq_prefill(mrn): read-only, what a new RFQ for this MRN starts with
- send_rfq(name): one separate email per supplier; a failure for one doesn't stop the rest.
  Calling it again sends only to suppliers still Pending or Failed.
- cancel_rfq(name): Draft or Sent -> Cancelled
- get_rfq_progress(): read-only, the step each visible RFQ has reached (for the Status column)
"""
import frappe
from frappe import _

from psd_books.invoicing import rfq_rules
from psd_books.utils.access import assert_can, assert_company


def _sender(to, subject, html, company):
	from psd_books.utils.email_company import send_business_email
	return send_business_email(to, subject, html, company)


@frappe.whitelist(allow_guest=False, methods=["GET"])
def get_rfq_prefill(mrn):
	assert_can("Request for Quotation", "read")
	assert_can("Material Request", "read")
	m = rfq_rules.load_mrn(mrn)
	assert_company(m.get("company"))
	return rfq_rules.build_rfq_prefill(m, list(rfq_rules.mrn_lines(mrn).values()))


@frappe.whitelist(allow_guest=False, methods=["POST"])
def send_rfq(name):
	assert_can("Request for Quotation", "write")
	doc = frappe.get_doc("Request for Quotation", name)
	assert_company(doc.company)
	doc.check_permission("write")
	rfq_rules.validate_draft(doc)  # same checks as a save: MRN still open, qty still within pending
	from psd_books.utils.project_guard import validate_project_open
	validate_project_open(doc)
	targets = rfq_rules.plan_send(doc.status, doc.suppliers)
	company_name = (frappe.db.get_value("Books Company", doc.company, "company_name") or doc.company or "")
	project_name = frappe.db.get_value("Project", doc.project, "project_name") if doc.project else None
	sent, failed = rfq_rules.send_to_suppliers(doc, targets, _sender, company_name, project_name)
	doc.flags.rfq_workflow = True
	doc.status = rfq_rules.status_after_send(doc.status, doc.suppliers)
	doc.save()
	return {"name": doc.name, "status": doc.status, "sent": sent,
		"failed": [{"supplier": s, "error": e} for s, e in failed]}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def cancel_rfq(name):
	assert_can("Request for Quotation", "write")
	doc = frappe.get_doc("Request for Quotation", name)
	assert_company(doc.company)
	doc.check_permission("write")
	if doc.status == "Cancelled":
		frappe.throw(_("This Request for Quotation is already cancelled."))
	doc.flags.rfq_workflow = True
	doc.status = "Cancelled"
	doc.save()
	return {"name": doc.name, "status": doc.status}


@frappe.whitelist(allow_guest=False, methods=["GET"])
def get_rfq_progress():
	"""Which step each RFQ the user can see has reached: quotations in, comparison, approval, LPOs.
	Read-only; the stored RFQ status is not changed."""
	assert_can("Request for Quotation", "read")
	from psd_books.api.docs import get_list  # same company filtering as the list screen
	rfqs = get_list("Request for Quotation", fields=["name", "status"], limit_page_length=100000)
	names = [r["name"] for r in rfqs]
	if not names:
		return {"progress": {}}
	rows = frappe.get_all("Request for Quotation Supplier",
		filters={"parent": ["in", names], "parenttype": "Request for Quotation"},
		fields=["parent", "quotation"], limit_page_length=0)
	from psd_books.invoicing.quotation_comparison_rules import LIVE_STATUSES
	comparisons = frappe.get_all("Quotation Comparison",
		filters={"request_for_quotation": ["in", names], "status": ["in", list(LIVE_STATUSES)]},
		fields=["request_for_quotation", "status"], limit_page_length=0)
	return {"progress": rfq_rules.progress_map(rfqs, rows, comparisons)}