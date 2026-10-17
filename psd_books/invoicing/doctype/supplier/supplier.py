import re
import frappe
from frappe import _
from frappe.model.document import Document

# Sava A4: KRA PIN = one letter (A company, P individual) + 9 digits + one letter,
# e.g. A123456789Z. Stored in the existing tax_id field.
_KRA_PIN_RE = re.compile(r'^[AP][0-9]{9}[A-Z]$')

class Supplier(Document):
    def validate(self):
        if not self.supplier_name:
            frappe.throw(_("Supplier Name is required"))
        if self.email_id and "@" not in self.email_id:
            frappe.throw(_("Please enter a valid email address"))
        self._validate_kra_pin()
        if not self.is_new() and self.has_value_changed("opening_balance"):
            from psd_books.accounts.opening_balance import guard_opening_balance_edit
            guard_opening_balance_edit("Supplier", self.name)

    def _validate_kra_pin(self):
        """Sava A4. KRA PIN is required on a NEW supplier (not for install, patches,
        migrate or tests); an existing supplier without one can still be edited,
        but a PIN that is set cannot be cleared. A PIN that is present must match
        the format and be unique within the Books Company."""
        pin = (self.tax_id or "").strip().upper()
        self.tax_id = pin

        if not pin:
            if self._kra_pin_required():
                frappe.throw(_("KRA PIN is required"))
            return

        if not _KRA_PIN_RE.match(pin):
            frappe.throw(_("Invalid KRA PIN: {0}. Expected format: A123456789Z").format(pin))

        dup = frappe.db.get_value(
            "Supplier",
            {
                "tax_id": pin,
                "books_company": self.get("books_company") or "",
                "name": ["!=", self.name or ""],
            },
            "name",
        )
        if dup:
            frappe.throw(_("KRA PIN {0} is already used by supplier {1}").format(pin, dup))

    def _kra_pin_required(self):
        f = frappe.flags
        if self.is_new():
            return not (self.flags.get("skip_kra_pin") or f.get("in_install") or f.get("in_patch")
                        or f.get("in_migrate") or f.get("in_test"))
        before = self.get_doc_before_save()
        return bool(before and (before.get("tax_id") or "").strip())

    def on_update(self):
        # Mirror of Customer.on_update — keep the opening balance posted as a
        # real Journal Entry against Accounts Payable. See
        # psd_books/accounts/opening_balance.py.
        if self.has_value_changed("opening_balance"):
            try:
                from psd_books.accounts.opening_balance import sync_party_opening_balance
                sync_party_opening_balance("Supplier", self.name, self.get("books_company"))
            except Exception as e:
                frappe.log_error(str(e), f"Opening balance sync failed for Supplier {self.name}")
                frappe.msgprint(
                    _("Supplier saved, but the opening balance could not be posted to the "
                      "ledger. Please check the Error Log and re-save once fixed."),
                    indicator="orange", alert=True,
                )

    def on_trash(self):
        from psd_books.accounts.opening_balance import guard_opening_balance_delete
        guard_opening_balance_delete("Supplier", self.name)

    @frappe.whitelist()
    def get_outstanding_bills(self):
        return frappe.get_all(
            "Purchase Invoice",
            filters={"supplier": self.name, "docstatus": 1, "outstanding_amount": [">", 0]},
            fields=["name", "posting_date", "due_date", "grand_total", "outstanding_amount"],
            order_by="due_date asc",
        )