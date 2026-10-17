"""
Asset Units — live duplicate check for the per-unit "Unit / Serial No" rows
on an Asset (see assets/doctype/asset_unit and Asset.validate_units()).

Asset.validate_units() is the authoritative, enforced check — it runs on
every save/submit and blocks a duplicate no matter how it got there. This
module exists only so the frontend (AssetDetails.vue) can flag a clash
immediately as the person types, instead of only finding out after they
click Save.
"""

import frappe

from psd_books.utils.access import assert_can


@frappe.whitelist()
def check_unit_no(unit_no: str, asset: str | None = None):
    """Return the Asset name that already uses this Unit/Serial No, if any
    (excluding the asset currently being edited). Empty string if it's free."""
    assert_can("Asset", "read")

    unit_no = (unit_no or "").strip()
    if not unit_no:
        return {"exists": False, "asset": ""}

    row = frappe.db.sql(
        """
        SELECT parent FROM `tabAsset Unit`
        WHERE unit_no = %s AND parent != %s
        LIMIT 1
        """,
        (unit_no, asset or ""),
    )
    if not row:
        return {"exists": False, "asset": ""}
    return {"exists": True, "asset": row[0][0]}