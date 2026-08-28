from __future__ import annotations
"""
Asset Link — auto-create fixed assets from Purchase Invoices.

Wires Purchase Invoice on_submit / on_cancel (via hooks.py) so that any line
item flagged "Is Fixed Asset" on the Item master automatically produces a
Draft Asset in the Assets module, instead of the user re-typing the same
purchase details by hand on the Assets page.

  on_submit  → for each line where item.is_fixed_asset is set, create one
               Draft Asset (qty/rate/date/supplier copied from the line),
               linked back to the Purchase Invoice via asset.purchase_invoice.
  on_cancel  → any Draft asset that was auto-created from this invoice and
               is still Draft (i.e. not yet submitted/capitalized by the
               user) is deleted. Assets already submitted are left alone —
               cancelling the invoice must not silently destroy a
               capitalized asset; the user handles that via Asset Disposal.
  on_update_after_submit → when a submitted invoice is edited (price, qty,
               etc. — see Purchase Invoice.on_update_after_submit), any
               Draft asset still tied to it is dropped and recreated from
               the current line data, the same way stock_link rebuilds its
               Stock Entry. Assets already submitted/capitalized are left
               untouched, same rule as on_cancel.

Non-fixed-asset invoices, or items without is_fixed_asset checked, are
untouched — this hook is a no-op for ordinary purchases.
"""

import frappe
from frappe import _
from frappe.utils import flt, cint


def on_purchase_invoice_submit(doc, method=None):
    # Debit notes / returns (is_return=1) carry negative qty and represent
    # goods going back to the supplier, not a new purchase — creating an
    # asset here would produce a bogus record with negative qty/cost.
    if cint(getattr(doc, "is_return", 0)):
        return

    for item in (doc.items or []):
        item_doc = frappe.db.get_value(
            "Item", item.item_code, ["is_fixed_asset", "asset_category"], as_dict=True
        )
        if not item_doc or not cint(item_doc.is_fixed_asset):
            continue

        asset_category = _resolve_or_create_asset_category(item_doc.asset_category, doc.company)

        qty = flt(item.qty) or 1
        # item.amount is always (re)computed in PurchaseInvoice.validate() —
        # net of any line discount — before submit, so it's the authoritative
        # figure. Falling back to qty*rate would silently ignore a discount
        # on a fully-discounted / free asset line.
        purchase_cost = flt(item.amount)

        asset = frappe.get_doc({
            "doctype": "Asset",
            "asset_name": item.item_name or item.item_code,
            "asset_category": asset_category,
            "status": "Draft",
            "purchase_date": doc.posting_date,
            "qty": qty,
            "purchase_cost": purchase_cost,
            "taxable_value": purchase_cost,
            "supplier": doc.supplier,
            "company": doc.company,
            "purchase_invoice": doc.name,
            "description": item.description or "",
        })
        asset.insert(ignore_permissions=True)

    # No manual commit here — this hook runs as one step inside Purchase
    # Invoice's on_submit chain (see hooks.py), inside the same request
    # transaction as _CV/_QC/_SL. Committing early would lock in the new
    # Asset(s) even if a later step in that same submit fails, leaving
    # orphaned Drafts behind for an invoice that never finished submitting.
    # Frappe commits once at the end of the request, same as its sibling
    # hooks (stock_link.py, central_validator.py) already do.


def on_purchase_invoice_cancel(doc, method=None):
    draft_assets = frappe.get_all(
        "Asset",
        filters={"purchase_invoice": doc.name, "status": "Draft"},
        pluck="name",
    )
    for name in draft_assets:
        frappe.delete_doc("Asset", name, ignore_permissions=True, force=True)
    # See note in on_purchase_invoice_submit — no manual commit here either.


def on_purchase_invoice_update_after_submit(doc, method=None):
    # Assets already submitted/capitalized from an earlier version of this
    # bill keep their own (frozen) purchase_cost — an edit to the source
    # invoice must not silently rewrite a capitalized asset behind finance's
    # back. Only assets still in Draft are still "in sync" with the bill,
    # so only those are eligible to be rebuilt.
    draft_assets = frappe.get_all(
        "Asset",
        filters={"purchase_invoice": doc.name, "status": "Draft"},
        pluck="name",
    )
    for name in draft_assets:
        frappe.delete_doc("Asset", name, ignore_permissions=True, force=True)

    # Recreate from the CURRENT line data (updated price/qty/etc). Reuses
    # on_submit's own logic (is_return guard, discount-aware purchase_cost,
    # category resolution) instead of duplicating it here.
    on_purchase_invoice_submit(doc, method)

    if draft_assets:
        frappe.msgprint(
            _("Draft asset(s) updated from Purchase Invoice {0}.").format(
                frappe.bold(doc.name)
            ),
            indicator="green",
            alert=True,
        )


def _resolve_or_create_asset_category(name, company):
    """Item.asset_category is now a proper Link to Asset Category, so the
    value passed in is normally already a real docname — check that first.
    Still falls back to a category_name lookup / create-on-the-fly for
    older data or values that came in as free text (e.g. via CSV import),
    so a submitted Purchase Invoice never fails over a missing lookup."""
    name = (name or "").strip() or "General"

    if frappe.db.exists("Asset Category", name):
        return name

    existing = frappe.db.get_value(
        "Asset Category", {"category_name": name, "books_company": company}, "name"
    )
    if existing:
        return existing

    cat = frappe.get_doc({
        "doctype": "Asset Category",
        "category_name": name,
        "books_company": company,
        "is_active": 1,
    })
    cat.insert(ignore_permissions=True)
    return cat.name