# Copyright (c) 2026
import frappe
from frappe.utils import flt
from frappe.model.document import Document
from psd_books.db.validators import validate_fiscal_year


class Quotation(Document):

    def validate(self):
        self._check_fiscal_lock()
        self._calculate_totals()

    def _check_fiscal_lock(self):
        if self.transaction_date and self.company:
            try:
                self.fiscal_year = validate_fiscal_year(self.transaction_date, self.company)
            except Exception:
                raise

    def _calculate_totals(self):
        for item in (self.items or []):
            item.amount = round(flt(item.qty) * flt(item.rate), 2)
        net = sum(flt(i.amount) for i in (self.items or []))
        for tax in (self.taxes or []):
            if flt(tax.rate) and not flt(tax.tax_amount):
                tax.tax_amount = round(net * flt(tax.rate) / 100, 2)
        tax_total = sum(flt(t.tax_amount) for t in (self.taxes or []))
        self.net_total = round(net, 2)
        self.total_tax = round(tax_total, 2)
        self.grand_total = round(net + tax_total, 2)