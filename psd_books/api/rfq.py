"""Request for Quotation API (Sava A7.1).

Endpoints
- get_rfq_prefill(mrn): read-only, what a new RFQ for this MRN starts with
- send_rfq(name): one separate email per supplier; a failure for one doesn't stop the rest.
  Calling it again sends only to suppliers still Pending or Failed.
- cancel_rfq(name): Draft or Sent -> Cancelled
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