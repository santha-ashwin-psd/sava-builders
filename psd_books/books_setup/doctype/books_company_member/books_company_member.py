from __future__ import annotations
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import now_datetime


MODULE_FIELDS = (
    "mod_invoices", "mod_bills", "mod_payments", "mod_banking",
    "mod_inventory", "mod_accounts", "mod_reports", "mod_customers",
    "mod_taxes", "mod_admin",
)


class BooksCompanyMember(Document):
    def validate(self):
        if not self.joined_on:
            self.joined_on = now_datetime()

        if self.books_role == "Books Admin":
            self.is_company_admin = 1
            for f in MODULE_FIELDS:
                self.set(f, 1)

    def on_update(self):
        self._sync_user_role()

    def _sync_user_role(self):
        """Ensure the linked User has the matching Books role."""
        if not self.user or not frappe.db.exists("User", self.user):
            return
        try:
            user_doc = frappe.get_doc("User", self.user)
            allowed = {"Books Admin", "Books Manager", "Accountant", "Books Viewer"}
            user_doc.roles = [r for r in user_doc.roles if r.role not in allowed]
            user_doc.append("roles", {"role": self.books_role})
            user_doc.save(ignore_permissions=True)
        except Exception as exc:
            frappe.log_error(f"Books Company Member role sync failed: {exc}", "Books Tenancy")

    def has_module(self, module: str) -> bool:
        """Module names without the mod_ prefix (e.g. has_module('invoices'))."""
        if self.is_company_admin or self.books_role == "Books Admin":
            return True
        return bool(self.get(f"mod_{module}"))


def get_user_company(user: str | None = None) -> str | None:
    """Return the company name for the given user, or None if unmapped."""
    user = user or frappe.session.user
    if not user or user in ("Guest", "Administrator"):
        return None
    return frappe.db.get_value("Books Company Member", {"user": user}, "company")


def get_user_membership(user: str | None = None):
    """Return the Books Company Member doc for the user, or None."""
    user = user or frappe.session.user
    name = frappe.db.get_value("Books Company Member", {"user": user}, "name")
    if not name:
        return None
    return frappe.get_doc("Books Company Member", name)
