from frappe.model.document import Document

from psd_books.invoicing import quotation_comparison_rules as rules


class QuotationComparison(Document):
	def validate(self):
		rules.validate_comparison(self)