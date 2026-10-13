"""
Patch v1_17: Sava A2 -- Central Store / Rejected Store for existing companies.

Warehouse gained `store_role` and `project` in this release. For every
company that already has warehouses (plus the Books Settings default
company) this makes sure there is a top-level "All Warehouses" group, a
Central Store and a Rejected Store, and moves any existing leaf warehouse
that has no parent under that group so it appears on the Warehouses screen.

New column involved, so it must run after schema sync (post_model_sync).
Safe to re-run: stores are matched by company + store_role, and only
warehouses with no parent are ever moved.
"""
import frappe

from zoho_books_clone.books_setup.install import ensure_company_stores


def execute():
    companies = set()
    for (c,) in frappe.db.sql(
        "SELECT DISTINCT company FROM `tabWarehouse` WHERE company IS NOT NULL AND company != ''"
    ):
        if c:
            companies.add(c)
    try:
        default = frappe.db.get_single_value("Books Settings", "default_company")
        if default:
            companies.add(default)
    except Exception:
        pass

    for company in sorted(companies):
        result = ensure_company_stores(company, adopt_orphans=True)
        print(f"[v1_17] {company}: created={result['created']} adopted={result['adopted']}")