"""Labour Contractor master (Sava Phase 2, Labour Contract > Contractors).

A person or company that does sub-contracted labour work. KRA PIN, ID/registration no. and the
tax certificate expiry are required. A contractor with an expired certificate is only flagged
here; blocking new contracts and bills for them belongs to the Contract and Weekly Bill steps.
A contractor can't be deleted while any of their contracts is not Closed, or a contract has not been paid in full
(deactivating stays allowed).
"""
import re

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import flt

# KRA PIN = one letter (A company, P individual) + 9 digits + one letter, e.g. A123456789Z
# (same rule as Supplier).
_KRA_PIN_RE = re.compile(r"^[AP][0-9]{9}[A-Z]$")


def delete_blockers(contracts, paid):
    """Messages that stop a contractor being deleted (empty list when fine).
    contracts: dicts with name, status, contract_value. paid: {contract: amount on Paid weekly bills}."""
    not_closed = [c["name"] for c in contracts if c.get("status") != "Closed"]
    unpaid = [
        "{0} ({1})".format(c["name"], round(flt(c.get("contract_value")) - flt(paid.get(c["name"])), 2))
        for c in contracts
        if flt(paid.get(c["name"])) < flt(c.get("contract_value")) - 0.005
    ]
    out = []
    if not_closed:
        out.append(_("Contract not closed: {0}. Close every contract of this contractor first.").format(", ".join(not_closed)))
    if unpaid:
        out.append(_("Payment not fully completed (balance in brackets): {0}.").format(", ".join(unpaid)))
    return out


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

    def on_trash(self):
        contracts = frappe.get_all(
            "Labour Contract", filters={"contractor": self.name}, fields=["name", "status", "contract_value"])
        paid = {}
        if contracts:
            rows = frappe.db.sql(
                """select l.contract, sum(l.amount_to_pay) from `tabLabour Weekly Bill Line` l
                join `tabLabour Weekly Bill` b on b.name = l.parent
                where l.contract in %(c)s and b.status = 'Paid' group by l.contract""",
                {"c": tuple(c["name"] for c in contracts)})
            paid = {r[0]: flt(r[1]) for r in rows}
        problems = delete_blockers(contracts, paid)
        if problems:
            frappe.throw("<br>".join([_("{0} can't be deleted.").format(self.name)] + problems))

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