import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import flt


class TDSEntry(Document):
    def before_insert(self):
        if not self.tds_total and self.amount and self.rate:
            self.tds_total = round(
                flt(self.amount) * (flt(self.rate) + flt(self.surcharge) + flt(self.cess)) / 100, 2
            )

    def after_insert(self):
        if self.expense_account and flt(self.amount) > 0 and flt(self.tds_total) > 0 and not self.voucher_no:
            # Validate fiscal year before attempting GL posting.
            # Errors here are re-raised so the caller knows the GL failed —
            # a silent except would leave the TDS Entry with no voucher_no and
            # no indication that the period is locked or missing.
            from psd_books.db.validators import validate_fiscal_year
            try:
                validate_fiscal_year(str(self.date), self.company)
            except frappe.ValidationError:
                # Re-raise with context so the user sees a meaningful message
                # rather than a generic insert failure.
                raise

            try:
                from psd_books.api.gst import create_tds_entry
                result = create_tds_entry(
                    company=self.company,
                    party=self.party or "",
                    expense_account=self.expense_account,
                    amount=str(flt(self.amount)),
                    tds_amount=str(flt(self.tds_total)),
                    tds_section=self.section or "",
                    date=str(self.date),
                    remarks=self.remarks or "",
                )
                frappe.db.set_value("TDS Entry", self.name, "voucher_no", result.get("voucher_no", ""))
                frappe.db.commit()
            except frappe.ValidationError:
                raise
            except Exception:
                # Non-fiscal errors (account missing, GL config) are logged but
                # do not abort the insert — the TDS record is preserved for
                # manual correction.
                frappe.log_error(
                    f"TDS Entry {self.name}: GL posting failed",
                    "TDS GL Error",
                )