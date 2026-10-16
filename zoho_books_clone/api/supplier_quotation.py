"""Supplier Quotation API (Sava A8.3). Logic lives in invoicing/supplier_quotation_flow.py.

Endpoints
- get_quotation_prefill(request_for_quotation, supplier): read-only, what the Enter/Revise screen starts with
- enter_quotation(data): data = {request_for_quotation, supplier, quotation_date, delivery_days,
  payment_terms, remarks, items: [{mrn_item, rate, discount_percent}]}
- revise_quotation(name, data): Active -> Superseded, new Active quotation
- cancel_quotation(name): Active -> Cancelled
"""
import frappe

from zoho_books_clone.invoicing import supplier_quotation_flow as flow


@frappe.whitelist(allow_guest=False, methods=["GET"])
def get_quotation_prefill(request_for_quotation, supplier):
	return flow.get_prefill(request_for_quotation, supplier)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def enter_quotation(data):
	return flow.enter_quotation(data)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def revise_quotation(name, data):
	return flow.revise_quotation(name, data)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def cancel_quotation(name):
	return flow.cancel_quotation(name)