"""
Patch v1_18: Sava A3 -- Kenya VAT 16% accounts and tax templates.

For every existing company this makes sure there is a "VAT Input" account
(under Input Tax Credits), a "VAT Payable" account (under Current Liabilities)
and the two default templates that post to them:

  - "VAT 16%"        (Sales)    -> VAT Payable
  - "Input VAT 16%"  (Purchase) -> VAT Input

New companies get the same data from bootstrap_company_data. Nothing is
renamed, changed or deleted: existing accounts and templates (GST ones
included) are left alone, and a company whose parent account group is missing
is skipped rather than guessed at.

No new columns are involved, so it runs with the other seed patches after
schema sync (post_model_sync). Safe to re-run.
"""
import frappe

from zoho_books_clone.books_setup.bootstrap import (
    COA,
    _acc_name,
    _seed_tax_templates,
)
from zoho_books_clone.books_setup.install import _all_company_names

VAT_ACCOUNT_NAMES = ("VAT Input", "VAT Payable")


def execute():
    for company in sorted(_all_company_names()):
        created = _seed_vat_accounts(company)
        if all(frappe.db.exists("Account", _acc_name(n, company)) for n in VAT_ACCOUNT_NAMES):
            _seed_tax_templates(company)
        else:
            print(f"[v1_18] {company}: VAT accounts missing, templates not seeded")
        print(f"[v1_18] {company}: accounts created={created}")
    frappe.db.commit()


def _seed_vat_accounts(company):
    created = []
    for name, atype, parent, is_group in COA:
        if name not in VAT_ACCOUNT_NAMES:
            continue
        full_name = _acc_name(name, company)
        if frappe.db.exists("Account", full_name):
            continue
        parent_full = _acc_name(parent, company)
        if not frappe.db.exists("Account", parent_full):
            continue
        try:
            frappe.get_doc({
                "doctype": "Account",
                "account_name": name,
                "account_type": atype,
                "parent_account": parent_full,
                "is_group": is_group,
                "company": company,
                "currency": "INR",
            }).insert(ignore_permissions=True)
            created.append(name)
        except Exception as exc:
            frappe.log_error(
                title="Patch v1_18",
                message=f"v1_18 VAT account — {company}/{name}: {exc}",
            )
    return created