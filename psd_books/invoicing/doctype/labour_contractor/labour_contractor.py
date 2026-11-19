"""Labour Contractor master (Sava Phase 2, Labour Contract > Contractors).

A person or company that does sub-contracted labour work. KRA PIN, ID/registration no. and the
tax certificate expiry are required. A contractor with an expired certificate is only flagged
here; blocking new contracts and bills for them belongs to the Contract and Weekly Bill steps.
"""
import re

import frappe
from frappe import _
from frappe.model.document import Document

# KRA PIN = one letter (A company, P individual) + 9 digits + one letter, e.g. A123456789Z
# (same rule as Supplier).
_KRA_PIN_RE = re.compile(r"^[AP][0-9]{9}[A-Z]$")


class LabourContractor(Document):
    def before_validate(self):
        if not self.get("company"):
            from psd_books.utils.tenancy import get_user_company, _is_bypass
            if not _is_bypass(frappe.session.user):
                self.company = get_user_company(frappe.session.user) or ""

    def validate(self):
        self.contractor_name = (self.contractor_name or "").strip()
        self.id_no = (self.id_no or "").strip()
        self.phone = (self.phone or "").strip()
        self.bank_details = (self.bank_details or "").strip()
        self.nca_reg_no = (self.nca_reg_no or "").strip()
        if not self.contractor_name:
            frappe.throw(_("Contractor Name is required"))
        if not self.id_no:
            frappe.throw(_("ID or Registration No. is required"))
        if not self.tax_cert_expiry:
            frappe.throw(_("Tax Certificate Expiry is required"))
        self._validate_kra_pin()

    def _validate_kra_pin(self):
        pin = (self.kra_pin or "").strip().upper()
        self.kra_pin = pin
        if not pin:
            frappe.throw(_("KRA PIN is required"))
        if not _KRA_PIN_RE.match(pin):
            frappe.throw(_("Invalid KRA PIN: {0}. Expected format: A123456789Z").format(pin))
        dup = frappe.db.get_value(
            "Labour Contractor",
            {"kra_pin": pin, "company": self.get("company") or "", "name": ["!=", self.name or ""]},
            "name",
        )
        if dup:
            frappe.throw(_("KRA PIN {0} already belongs to contractor {1}").format(pin, dup))