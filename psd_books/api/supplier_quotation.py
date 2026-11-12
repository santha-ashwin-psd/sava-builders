"""Supplier Quotation API (Sava A8.3). Rules live in invoicing/supplier_quotation_flow.py.

Endpoints
- get_quotation_prefill(request_for_quotation, supplier): every RFQ line with qty, UOM, VAT % and blank
  rates; carries the Active quotation's values when there is one, so the screen can start a revision
- enter_quotation(data): creates the Active quotation and records it on the RFQ supplier row
- revise_quotation(name, data): old -> Superseded, new -> Active (revision_no + 1)
- cancel_quotation(name): Active -> Cancelled and clears the RFQ supplier row
"""
import frappe

from psd_books.invoicing import supplier_quotation_flow as flow


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