import frappe
from frappe import _
from frappe.model.document import Document


class FiscalYear(Document):
    def validate(self):
        if self.year_start_date >= self.year_end_date:
            frappe.throw(_("End Date must be after Start Date"))
        self.validate_overlap()

    def validate_overlap(self):
        company = self.company or ""
        if company:
            # Company-specific: only check against years with the same company.
            # Global/no-company legacy rows are excluded — they were created before
            # per-company fiscal years were introduced and should not block new ones.
            overlap = frappe.db.sql("""
                SELECT name FROM `tabFiscal Year`
                WHERE name != %s
                  AND LOWER(company) = LOWER(%s)
                  AND is_closed = 0
                  AND year_start_date <= %s
                  AND year_end_date >= %s
            """, (self.name or "", company, self.year_end_date, self.year_start_date))
        else:
            # No company: check against all years (global)
            overlap = frappe.db.sql("""
                SELECT name FROM `tabFiscal Year`
                WHERE name != %s
                  AND is_closed = 0
                  AND year_start_date <= %s
                  AND year_end_date >= %s
            """, (self.name or "", self.year_end_date, self.year_start_date))
        if overlap:
            frappe.throw(_("Fiscal Year overlaps with {0}").format(overlap[0][0]))