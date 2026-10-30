import frappe
from frappe import _
from frappe.model.document import Document

from psd_books.invoicing import supplier_quotation_calc, supplier_quotation_rules


class SupplierQuotation(Document):
	def validate(self):
		# Entry Date: the day the record was entered. Filled automatically when blank, so documents
		# created by other steps (GRN, stock entries, orders from a comparison) never fail on it.
		if self.is_new() and not self.get("entry_date"):
			self.entry_date = frappe.utils.nowdate()
		before = self.get_doc_before_save()
		supplier_quotation_rules.keep_status_server_side(self, before)
		if before is not None and not self.flags.get("sq_workflow"):
			if before.status == "Active":
				frappe.throw(_("An Active quotation can't be edited. Revise it instead."))
			frappe.throw(_("A {0} quotation can't be edited.").format(before.status.lower()))
		if self.status != "Active":
			return  # superseding or cancelling must work even if the RFQ has moved on
		supplier_quotation_rules.validate_active(self)
		supplier_quotation_calc.apply_to_doc(self)