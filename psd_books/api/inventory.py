"""
Inventory API — whitelisted endpoints called by the Books SPA.

All endpoints return plain dicts/lists that Vue can consume directly.
Heavy queries are delegated to inventory.utils or db.queries.
"""

import frappe
from frappe import _
from frappe.utils import cint, flt, today, getdate
from psd_books.api.session import _get_company

from psd_books.inventory.utils import (
    get_stock_balance,
    get_stock_ledger,
    get_reorder_alerts,
    get_item_price,
    recalculate_bin,
    recalculate_all_bins,
)


# ── Stock Summary ─────────────────────────────────────────────────────────────

def _get_child_warehouses(warehouse_name):
    """Recursively collect all leaf warehouse names under a group warehouse."""
    children = frappe.get_all("Warehouse", filters={"parent_warehouse": warehouse_name}, fields=["name", "is_group"])
    result = []
    for c in children:
        if c.is_group:
            result.extend(_get_child_warehouses(c.name))
        else:
            result.append(c.name)
    return result


@frappe.whitelist(allow_guest=False)
def get_item_by_barcode(barcode):
    """
    Resolve a scanned barcode to an Item. Matches the dedicated ``barcode``
    field first; falls back to ``item_code`` so QR/1D labels printed with the
    item code itself still resolve. Returns None if nothing matches so the
    caller can show a "not found" toast instead of erroring out.
    """
    barcode = (barcode or "").strip()
    if not barcode:
        return None
    fields = ["name", "item_name", "standard_rate", "mrp", "stock_uom",
              "description", "hsn_code", "income_account", "tax_code",
              "has_batch_no", "barcode"]
    item = frappe.get_all(
        "Item",
        filters={"barcode": barcode, "disabled": 0},
        fields=fields,
        limit=1,
    )
    if not item:
        item = frappe.get_all(
            "Item",
            filters={"item_code": barcode, "disabled": 0},
            fields=fields,
            limit=1,
        )
    return item[0] if item else None


@frappe.whitelist(allow_guest=False)
def get_batches_for_item(item_code, warehouse=None, search=None):
    """
    Return existing, non-disabled batches for a single item
    in the selected warehouse with LIVE available qty.

    Batch qty is calculated from Stock Ledger Entries so the
    picker always shows the actual remaining stock for the
    selected warehouse.
    """

    if not item_code:
        return []

    if not warehouse:
        return []

    rows = frappe.db.sql("""
        SELECT
            sle.batch_no,
            SUM(sle.actual_qty) AS qty
        FROM `tabStock Ledger Entry` sle
        WHERE sle.item_code = %(item_code)s
          AND sle.warehouse = %(warehouse)s
          AND sle.batch_no IS NOT NULL
          AND sle.batch_no != ''
          AND sle.is_cancelled = 0
        GROUP BY sle.batch_no
        HAVING qty > 0
        ORDER BY sle.batch_no
    """, {
        "item_code": item_code,
        "warehouse": warehouse
    }, as_dict=True)

    if not rows:
        return []

    batch_nos = [r.batch_no for r in rows]

    meta = {
        b.name: b
        for b in frappe.get_all(
            "Batch",
            filters={"name": ["in", batch_nos]},
            fields=[
                "name",
                "manufacturing_date",
                "expiry_date",
                "disabled"
            ],
        )
    }

    q = (search or "").lower().strip()

    out = []

    for r in rows:
        m = meta.get(r.batch_no) or {}

        if m.get("disabled"):
            continue

        if q and q not in r.batch_no.lower():
            continue

        out.append({
            "batch_no": r.batch_no,
            "qty": flt(r.qty),
            "manufacturing_date": m.get("manufacturing_date"),
            "expiry_date": m.get("expiry_date"),
        })

    return out


@frappe.whitelist(allow_guest=False)
def get_warehouse_batches(warehouse):
    """
    Return batch-wise stock breakdown for every batch-tracked item in a warehouse.
    Response: { item_code: [ {batch_no, qty, manufacturing_date, expiry_date,
                               is_expired, expires_soon}, ... ], ... }
    Aggregates Stock Ledger Entry.actual_qty by item_code + batch_no so it always
    reflects the live ledger (not just the most recent Batch master values).
    For group warehouses, all child warehouse leaves are included.
    """
    if not warehouse:
        return {}

    warehouses = [warehouse]
    wh_doc = frappe.db.get_value("Warehouse", warehouse, "is_group")
    if wh_doc:
        children = _get_child_warehouses(warehouse)
        if not children:
            return {}
        warehouses = children

    rows = frappe.db.sql("""
        SELECT sle.item_code, sle.batch_no, SUM(sle.actual_qty) AS qty
        FROM `tabStock Ledger Entry` sle
        WHERE sle.warehouse IN %(warehouses)s
          AND sle.batch_no IS NOT NULL AND sle.batch_no != ''
          AND sle.is_cancelled = 0
        GROUP BY sle.item_code, sle.batch_no
        HAVING qty != 0
        ORDER BY sle.item_code, sle.batch_no
    """, {"warehouses": warehouses}, as_dict=True)

    if not rows:
        return {}

    batch_nos = list({r.batch_no for r in rows})
    batch_meta = {
        b.name: b for b in frappe.get_all(
            "Batch", filters={"name": ["in", batch_nos]},
            fields=["name", "manufacturing_date", "expiry_date"],
        )
    }

    today_date = getdate(today())
    out = {}
    for r in rows:
        meta = batch_meta.get(r.batch_no) or {}
        expiry = meta.get("expiry_date")
        days_to_expiry = (getdate(expiry) - today_date).days if expiry else None
        out.setdefault(r.item_code, []).append({
            "batch_no":            r.batch_no,
            "qty":                 flt(r.qty),
            "manufacturing_date":  meta.get("manufacturing_date"),
            "expiry_date":         expiry,
            "is_expired":          bool(expiry and days_to_expiry < 0),
            "expires_soon":        bool(expiry and 0 <= days_to_expiry <= 30),
        })
    return out


def _restrict_to_project(filters, project):
	"""Sava A13: limit a Bin query to the warehouses that list this project (Warehouse Project rows).
	Returns False when the project has no warehouses or none of them match the existing warehouse filter."""
	if not project:
		return True
	pw = frappe.get_all("Warehouse Project",
		filters={"project": project, "parenttype": "Warehouse", "parentfield": "projects"}, pluck="parent")
	cur = filters.get("warehouse")
	if cur:
		allowed = set(cur[1]) if isinstance(cur, list) else {cur}
		pw = [w for w in pw if w in allowed]
	if not pw:
		return False
	filters["warehouse"] = ["in", pw]
	return True


@frappe.whitelist(allow_guest=False)
def get_stock_summary(warehouse=None, item_group=None, show_zero_stock=0, project=None):
    """
    Return current stock levels (from Bin) with item details.
    If warehouse is a group (is_group=1), aggregates all children recursively.
    """
    filters = {}
    is_group_wh = False
    if warehouse:
        wh_doc = frappe.db.get_value("Warehouse", warehouse, ["is_group", "name"], as_dict=True)
        if wh_doc and wh_doc.is_group:
            is_group_wh = True
            child_whs = _get_child_warehouses(warehouse)
            if child_whs:
                filters["warehouse"] = ["in", child_whs]
            else:
                return []  # Group with no children yet
        else:
            filters["warehouse"] = warehouse
    if not _restrict_to_project(filters, project):
        return []
    if not int(show_zero_stock):
        filters["actual_qty"] = [">", 0]

    bins = frappe.get_all(
        "Bin",
        filters=filters,
        fields=["item_code", "warehouse", "actual_qty", "reserved_qty",
                "ordered_qty", "projected_qty", "valuation_rate", "stock_value",
                "reorder_level", "reorder_qty", "stock_uom", "rack_no"],
        order_by="item_code asc",
        limit=2000,
    )

    # Enrich with item details
    item_codes = list({b.item_code for b in bins})
    item_map = {}
    if item_codes:
        items = frappe.get_all(
            "Item",
            filters={"name": ["in", item_codes]},
            fields=["name", "item_name", "item_group", "item_type", "stock_uom", "disabled",
                    "has_batch_no", "purchase_uom"],
        )
        for it in items:
            item_map[it.name] = it

    # Phase 5 (readability, not correctness -- Bin.actual_qty above is
    # already the authoritative stock_uom balance): batch-fetch each item's
    # configured Purchase UOM conversion factor in one query, so the report
    # can additionally show "= 2 Packs" next to the Kg balance for operators
    # used to thinking in purchase units. Items with no Purchase UOM
    # configured (or no matching conversion row) simply don't get this
    # extra field -- the stock_uom qty/uom above is unaffected either way.
    purchase_conversion = {}
    purchase_item_codes = [
        code for code in item_codes
        if item_map.get(code) and item_map[code].get("purchase_uom")
        and item_map[code]["purchase_uom"] != item_map[code].get("stock_uom")
    ]
    if purchase_item_codes:
        conv_rows = frappe.get_all(
            "Item UOM Conversion Detail",
            filters={"parent": ["in", purchase_item_codes], "parenttype": "Item"},
            fields=["parent", "uom", "conversion_factor"],
        )
        for c in conv_rows:
            purchase_conversion[(c.parent, c.uom)] = flt(c.conversion_factor)

    def _purchase_display(item_code, stock_qty):
        """Return (purchase_uom, purchase_qty) for the readability columns,
        or (None, None) if this item has no usable Purchase UOM conversion."""
        item = item_map.get(item_code) or {}
        p_uom = item.get("purchase_uom")
        factor = purchase_conversion.get((item_code, p_uom)) if p_uom else None
        if not p_uom or not factor:
            return None, None
        return p_uom, round(flt(stock_qty) / factor, 2)

    # Group warehouses: fall through to the per-bin loop below (same as a
    # single warehouse) instead of aggregating by item_code. `filters["warehouse"]`
    # was already set to `["in", child_whs]` above, so each Bin here belongs to
    # one specific child warehouse. This means an item stocked in two child
    # warehouses shows as two rows -- one per (item_code, warehouse) -- each
    # carrying its own `warehouse` name, rather than being summed into a single
    # row that hides which warehouse(s) actually hold the stock.
    result = []
    seen_codes = set()

    for b in bins:
        item = item_map.get(b.item_code, {})
        if item_group and item.get("item_group") != item_group:
            continue
        seen_codes.add(b.item_code)
        purchase_uom, purchase_qty = _purchase_display(b.item_code, b.actual_qty)
        result.append({
            "item_code":       b.item_code,
            "item_name":       item.get("item_name") or b.item_code,
            "item_group":      item.get("item_group") or "",
            "item_type":       item.get("item_type") or "",
            "warehouse":       b.warehouse,
            "uom":             b.stock_uom or item.get("stock_uom") or "Nos",
            "actual_qty":      flt(b.actual_qty),
            "reserved_qty":    flt(b.reserved_qty),
            "ordered_qty":     flt(b.ordered_qty),
            "projected_qty":   flt(b.projected_qty),
            "valuation_rate":  flt(b.valuation_rate),
            "stock_value":     flt(b.stock_value),
            "reorder_level":   flt(b.reorder_level),
            "reorder_qty":     flt(b.reorder_qty),
            "below_reorder":   flt(b.actual_qty) < flt(b.reorder_level) if b.reorder_level else False,
            "has_batch_no":    1 if item.get("has_batch_no") else 0,
            "purchase_uom":    purchase_uom,
            "purchase_qty":    purchase_qty,
            "rack_no":         b.rack_no or "",
        })

    # Also show items that have this warehouse as default_warehouse but no Bin yet (0 stock)
    if warehouse:
        try:
            default_items = frappe.get_all(
                "Item",
                filters={"default_warehouse": warehouse, "is_stock_item": 1, "disabled": 0},
                fields=["name", "item_name", "item_group", "item_type", "stock_uom", "reorder_level", "reorder_qty"],
                limit=500,
            )
            for it in default_items:
                if it.name in seen_codes:
                    continue
                if item_group and it.get("item_group") != item_group:
                    continue
                result.append({
                    "item_code":      it.name,
                    "item_name":      it.item_name or it.name,
                    "item_group":     it.item_group or "",
                    "item_type":      it.item_type or "",
                    "warehouse":      warehouse,
                    "uom":            it.stock_uom or "Nos",
                    "actual_qty":     0.0,
                    "reserved_qty":   0.0,
                    "ordered_qty":    0.0,
                    "projected_qty":  0.0,
                    "valuation_rate": 0.0,
                    "stock_value":    0.0,
                    "reorder_level":  flt(it.reorder_level),
                    "reorder_qty":    flt(it.reorder_qty),
                    "below_reorder":  False,
                    "no_stock_entry": True,
                    "purchase_uom":   None,
                    "purchase_qty":   None,
                    "rack_no":        "",
                })
        except Exception:
            pass

    return result


@frappe.whitelist(allow_guest=False)
def get_item_racks(warehouse=None, item_codes=None):
    """
    Bulk-lookup Bin.rack_no for a set of items in one warehouse. Used by
    Work Order to snapshot a rack label onto each raw material row without
    firing one request per row.
    Returns {item_code: rack_no} -- items with no Bin or no rack set are
    simply absent from the result (caller treats missing as "").
    """
    if not warehouse:
        return {}
    codes = item_codes
    if isinstance(codes, str):
        try:
            codes = frappe.parse_json(codes)
        except Exception:
            codes = [codes]
    codes = [c for c in (codes or []) if c]
    if not codes:
        return {}

    rows = frappe.get_all(
        "Bin",
        filters={"warehouse": warehouse, "item_code": ["in", codes], "rack_no": ["not in", ["", None]]},
        fields=["item_code", "rack_no"],
    )
    return {r.item_code: r.rack_no for r in rows}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def set_bin_rack():
    """
    Assign (or clear) the label-only rack_no on a Bin.

    Rules enforced here (kept separate from Warehouse.validate() / the SLE
    auto-clear, which handle the other two invariants):
      - Only settable when the Bin currently has stock (actual_qty > 0).
      - The rack must exist in the target warehouse's rack list (Warehouse.racks),
        so this never gets out of sync with what Warehouse Rack management shows.
      - Clearing (empty string) is always allowed regardless of qty.
    """
    from psd_books.utils.access import assert_can
    assert_can("Warehouse", "write")

    fd = frappe.form_dict
    item_code = (fd.get("item_code") or "").strip()
    warehouse = (fd.get("warehouse") or "").strip()
    rack_no = (fd.get("rack_no") or "").strip()

    if not item_code:
        frappe.throw(_("Item is required"))
    if not warehouse:
        frappe.throw(_("Warehouse is required"))

    bin_row = frappe.db.get_value(
        "Bin", {"item_code": item_code, "warehouse": warehouse},
        ["name", "actual_qty"], as_dict=True,
    )
    if not bin_row:
        frappe.throw(_("No stock record found for {0} in {1}").format(item_code, warehouse))

    if rack_no:
        if flt(bin_row.actual_qty) <= 0:
            frappe.throw(_("Cannot assign a rack — this item has no stock in {0}").format(warehouse))
        valid_racks = frappe.get_all(
            "Warehouse Rack", filters={"parent": warehouse, "parenttype": "Warehouse"},
            pluck="rack_no",
        )
        if rack_no not in valid_racks:
            frappe.throw(_("'{0}' is not a rack defined on warehouse {1}").format(rack_no, warehouse))

    frappe.db.set_value("Bin", bin_row.name, "rack_no", rack_no)
    # Keep the auto-restore snapshot (see StockLedgerEntry._update_bin) in
    # sync with manual actions here too: a rack picked here becomes the one
    # silently reattached on the next restock after this item empties out.
    # An explicit clear (rack_no == "") is a deliberate user action to
    # detach the rack, so it should NOT be auto-restored later either.
    frappe.db.set_value("Bin", bin_row.name, "last_rack_no", rack_no)
    return {"item_code": item_code, "warehouse": warehouse, "rack_no": rack_no}


def _item_uom_conversions_payload(item_code):
    """Shared shape for get/set_item_uom_conversions.

    Item UOM Conversion Detail stores conversion_factor = stock-UOM units in 1
    of the row's UOM (stock Nos, row Kg, 1 Nos = 2 Kg  ->  factor 0.5).
    The UI works in the natural direction, so each row also carries
    per_stock = how many of the row's UOM make up 1 stock UOM (= 1 / factor).
    """
    item = frappe.db.get_value(
        "Item", item_code, ["name", "item_name", "stock_uom", "purchase_uom"], as_dict=True
    )
    if not item:
        frappe.throw(_("Item {0} not found").format(item_code))
    rows = frappe.get_all(
        "Item UOM Conversion Detail",
        filters={"parent": item_code, "parenttype": "Item"},
        fields=["uom", "conversion_factor"],
        order_by="idx asc",
    )
    stock_uom = item.stock_uom or "Nos"
    out = []
    for r in rows:
        f = flt(r.conversion_factor)
        if not r.uom or f <= 0:
            continue
        out.append({
            "uom": r.uom,
            "conversion_factor": f,
            "per_stock": round(1.0 / f, 6),
        })
    return {
        "item_code": item.name,
        "item_name": item.item_name or item.name,
        "stock_uom": stock_uom,
        "purchase_uom": item.purchase_uom or "",
        "has_transactions": frappe.db.count(
            "Stock Ledger Entry", {"item_code": item_code, "is_cancelled": 0}
        ),
        "rows": out,
    }


@frappe.whitelist(allow_guest=False)
def get_item_uom_conversions(item_code):
    """UOM conversions of an item, in the "1 <stock UOM> = N <other UOM>" form."""
    from psd_books.utils.access import assert_can
    assert_can("Item", "read")
    item_code = (item_code or "").strip()
    if not item_code:
        frappe.throw(_("Item is required"))
    return _item_uom_conversions_payload(item_code)


@frappe.whitelist(allow_guest=False, methods=["POST"])
def set_item_uom_conversions(item_code, rows=None):
    """Replace the item's UOM conversions.

    rows: [{"uom": "Kg", "per_stock": 2}, ...] meaning 1 <stock UOM> = 2 Kg.
    Stored as conversion_factor = 1 / per_stock (stock-UOM units in 1 Kg).
    Saved through the Item so its own validation (no duplicate UOM, none equal
    to the stock UOM, factor > 0) still runs.
    """
    import json
    from psd_books.utils.access import assert_can
    assert_can("Item", "write")

    item_code = (item_code or "").strip()
    if not item_code:
        frappe.throw(_("Item is required"))
    if isinstance(rows, str):
        rows = json.loads(rows or "[]")
    rows = rows or []

    item = frappe.get_doc("Item", item_code)
    stock_uom = item.stock_uom or "Nos"

    new_rows, seen = [], set()
    for i, r in enumerate(rows, start=1):
        uom = (r.get("uom") or "").strip()
        per_stock = flt(r.get("per_stock"))
        if not uom:
            frappe.throw(_("Row {0}: choose a UOM").format(i))
        if uom == stock_uom:
            frappe.throw(_("Row {0}: {1} is already this item's stock UOM").format(i, uom))
        if uom in seen:
            frappe.throw(_("Row {0}: {1} is listed more than once").format(i, uom))
        if per_stock <= 0:
            frappe.throw(_("Row {0}: enter how many {1} make 1 {2} (more than 0)").format(i, uom, stock_uom))
        seen.add(uom)
        new_rows.append({"uom": uom, "conversion_factor": 1.0 / per_stock})

    # Purchase flows read this same table; dropping the purchase UOM's row would
    # silently make Purchase Orders/Bills/Receipts treat it as 1:1 with stock.
    pu = item.purchase_uom
    if pu and pu != stock_uom and pu not in seen:
        frappe.throw(_(
            "{0} is this item's Purchase UOM and needs a conversion row. "
            "Keep it here, or clear the Purchase UOM on the item first."
        ).format(pu))

    item.set("uom_conversions", [])
    for r in new_rows:
        item.append("uom_conversions", r)
    item.flags.ignore_permissions = True   # access already enforced by assert_can above
    item.save()
    return _item_uom_conversions_payload(item_code)


@frappe.whitelist(allow_guest=False)
def create_opening_stock():
    """
    Create and submit an Opening Stock (or Material Receipt) entry for an item.
    replace_existing=1 → always creates a Material Receipt regardless of prior SLEs.
    Returns the Stock Entry name.
    """
    from psd_books.utils.access import assert_can
    assert_can("Stock Entry", "create")

    from frappe.utils import today as frappe_today
    # Read from form_dict directly to avoid Frappe's argument-filtering stripping params
    fd = frappe.form_dict
    item_code      = fd.get("item_code") or ""
    item_name      = fd.get("item_name") or item_code
    warehouse      = fd.get("warehouse") or ""
    qty            = flt(fd.get("qty", 0))
    rate           = flt(fd.get("rate", 0))
    replace_existing = int(fd.get("replace_existing", 0))
    if qty <= 0:
        frappe.throw(_("Opening Stock qty must be greater than 0"))
    if not warehouse:
        frappe.throw(_("Warehouse is required for Opening Stock"))

    company = _get_company(frappe.session.user)

    # Determine entry type: Opening Stock if no prior SLEs, else Material Receipt
    prior = frappe.db.sql(
        """SELECT name FROM `tabStock Ledger Entry`
           WHERE item_code=%s AND warehouse=%s AND is_cancelled=0 LIMIT 1""",
        (item_code, warehouse), as_dict=True
    )
    entry_type = "Material Receipt" if (prior or int(replace_existing)) else "Opening Stock"

    se = frappe.get_doc({
        "doctype":          "Stock Entry",
        "stock_entry_type": entry_type,
        "posting_date":     frappe_today(),
        "company":          company,
        "remarks":          f"Opening stock for {item_code}",
        "items": [{
            "item_code":  item_code,
            "item_name":  item_name or item_code,
            "qty":        qty,
            "basic_rate": rate,
            "t_warehouse": warehouse,
        }],
    })
    # Pre-set name to bypass naming_series autoname entirely
    se.name = "SEC-" + frappe.generate_hash(txt=f"{item_code}{frappe.utils.now()}", length=8).upper()
    se.flags.ignore_permissions = True
    se.flags.ignore_links = True
    se.flags.ignore_mandatory = True
    se.insert()
    se.submit()
    frappe.db.commit()
    return {"stock_entry": se.name, "entry_type": entry_type, "qty": qty}


@frappe.whitelist(allow_guest=False)
def get_item_stock_detail(item_code, warehouse=None):
    """
    Return stock position for a single item across all (or one) warehouse(s).
    """
    filters = {"item_code": item_code}
    if warehouse:
        filters["warehouse"] = warehouse

    bins = frappe.get_all(
        "Bin",
        filters=filters,
        fields=["warehouse", "actual_qty", "reserved_qty", "ordered_qty",
                "projected_qty", "valuation_rate", "stock_value"],
    )

    item = frappe.get_value(
        "Item", item_code,
        ["item_name", "stock_uom", "item_group", "standard_rate", "purchase_uom"],
        as_dict=True,
    ) or {}

    total_qty = sum(flt(b.actual_qty) for b in bins)

    # Phase 5 (readability, not correctness -- the qty/value figures above
    # already come straight off Bin, the authoritative stock_uom balance):
    # if this item has a configured Purchase UOM with a real conversion row,
    # surface the "as purchased" equivalent of the total too, e.g. "= 2 Packs"
    # alongside the Kg total, for operators used to thinking in purchase units.
    purchase_uom = purchase_qty = None
    if item.get("purchase_uom") and item["purchase_uom"] != item.get("stock_uom"):
        from psd_books.inventory.utils import get_conversion_factor
        factor = get_conversion_factor(item_code, item["purchase_uom"])
        if factor and factor != 1:
            purchase_uom = item["purchase_uom"]
            purchase_qty = round(total_qty / factor, 2)

    return {
        "item_code":    item_code,
        "item_name":    item.get("item_name") or item_code,
        "stock_uom":    item.get("stock_uom") or "Nos",
        "item_group":   item.get("item_group") or "",
        "selling_rate": flt(item.get("standard_rate")),
        "purchase_uom": purchase_uom,
        "purchase_qty": purchase_qty,
        "warehouses":   [
            {
                "warehouse":     b.warehouse,
                "actual_qty":    flt(b.actual_qty),
                "reserved_qty":  flt(b.reserved_qty),
                "ordered_qty":   flt(b.ordered_qty),
                "projected_qty": flt(b.projected_qty),
                "valuation_rate":flt(b.valuation_rate),
                "stock_value":   flt(b.stock_value),
            }
            for b in bins
        ],
        "total_qty":   total_qty,
        "total_value": sum(flt(b.stock_value) for b in bins),
    }


@frappe.whitelist(allow_guest=False)
def get_scrap_stock_for_item(item_code, company=None):
    """Scrap Reuse feature, Phase 2: how much of this item is actually
    sitting in stock right now, broken down per warehouse -- used to show
    live availability (e.g. "120 kg available in Herb Scrap Warehouse")
    before a Work Order raw material row is substituted with it.

    Not restricted to item_type == "Scrap Item" -- the caller (substitution
    options list) may want availability for a Fresh Stock alternative too,
    and the Alternative Item mapping is the thing that actually decides
    scrap-eligibility (see AlternativeItem.source_type), not this endpoint.
    """
    if frappe.session.user == "Guest":
        frappe.throw(_("Not permitted"), frappe.PermissionError)

    from psd_books.utils.access import assert_company
    from psd_books.inventory.utils import get_stock_by_warehouse

    if company:
        assert_company(company)
    else:
        company = _get_company(frappe.session.user)

    item = frappe.db.get_value("Item", item_code, ["item_name", "item_type", "stock_uom"], as_dict=True)
    if not item:
        frappe.throw(_("Item {0} does not exist.").format(item_code))

    warehouses = get_stock_by_warehouse(item_code, company)

    return {
        "item_code": item_code,
        "item_name": item.item_name,
        "item_type": item.item_type,
        "stock_uom": item.stock_uom,
        "total_qty": sum(w["qty"] for w in warehouses),
        "warehouses": warehouses,
    }


# ── Inventory Adjustments ─────────────────────────────────────────────────────

@frappe.whitelist(allow_guest=False, methods=["POST"])
def create_inventory_adjustment():
    """
    Zoho-style quantity adjustment: enter the new counted on-hand qty for an
    item+warehouse; we post the +/- delta as a 'Stock Adjustment' Stock Entry at
    the current valuation rate. The Stock Entry controller handles the SLE/Bin
    update and the GL (DR Inventory / CR adjustment account).
    """
    from psd_books.utils.access import assert_can
    assert_can("Stock Entry", "create")

    from frappe.utils import today as frappe_today
    fd = frappe.form_dict
    item_code = (fd.get("item_code") or "").strip()
    warehouse = (fd.get("warehouse") or "").strip()
    reason    = (fd.get("reason") or "").strip()
    notes     = (fd.get("notes") or "").strip()
    adj_account = (fd.get("adjustment_account") or "").strip()
    posting_date = fd.get("posting_date") or frappe_today()

    if not item_code:
        frappe.throw(_("Item is required"))
    if not warehouse:
        frappe.throw(_("Warehouse is required"))
    if fd.get("new_qty") in (None, ""):
        frappe.throw(_("New quantity is required"))

    new_qty = flt(fd.get("new_qty"))
    if new_qty < 0:
        frappe.throw(_("New quantity cannot be negative"))

    company = _get_company(frappe.session.user)

    bin_row = frappe.db.get_value(
        "Bin", {"item_code": item_code, "warehouse": warehouse},
        ["actual_qty", "valuation_rate"], as_dict=True,
    ) or {}
    current_qty = flt(bin_row.get("actual_qty"))
    rate = flt(bin_row.get("valuation_rate"))
    if not rate:
        item_rates = frappe.db.get_value(
            "Item", item_code, ["standard_buying_rate", "standard_rate"], as_dict=True
        ) or {}
        rate = flt(item_rates.get("standard_buying_rate")) or flt(item_rates.get("standard_rate")) or 0

    delta = new_qty - current_qty
    if abs(delta) < 0.0000001:
        frappe.throw(_("New quantity equals current quantity — nothing to adjust."))

    item_name = frappe.db.get_value("Item", item_code, "item_name") or item_code
    remark = reason + ((" — " + notes) if notes else "") if reason else (notes or f"Stock adjustment for {item_code}")

    se = frappe.get_doc({
        "doctype":          "Stock Entry",
        "stock_entry_type": "Stock Adjustment",
        "posting_date":     posting_date,
        "company":          company,
        "remarks":          remark,
        "adjustment_reason": reason or None,
        "adjustment_account": adj_account or None,
        "items": [{
            "item_code":  item_code,
            "item_name":  item_name,
            "qty":        delta,
            "basic_rate": rate,
            "t_warehouse": warehouse,
        }],
    })
    se.name = "SEC-" + frappe.generate_hash(txt=f"{item_code}{frappe.utils.now()}", length=8).upper()
    se.flags.ignore_permissions = True
    se.flags.ignore_links = True
    se.flags.ignore_mandatory = True
    se.insert()
    se.submit()
    frappe.db.commit()
    return {
        "stock_entry": se.name,
        "delta": delta,
        "new_qty": new_qty,
        "current_qty": current_qty,
        "rate": rate,
    }


@frappe.whitelist(allow_guest=False, methods=["POST"])
def create_batch_adjustment():
    """
    Batch-level counterpart to create_inventory_adjustment: correct the qty of
    a single batch within a warehouse (e.g. after a physical count finds a
    specific batch's on-hand quantity differs from the ledger).

    Posts the +/- delta as a 'Stock Adjustment' Stock Entry carrying the
    batch_no, exactly like a normal batch-tracked movement. That means it goes
    through the same controller path as every other Stock Entry:
      - Stock Ledger Entry is created for item+warehouse+batch (_make_sle)
      - Batch.batch_qty is adjusted by the same delta (_adjust_batch_qty)
      - Bin.actual_qty for the item is adjusted by the same delta (_sync_bin)
      - GL entries are posted for the delta value (_post_gl_entries)
    Since the delta is applied identically to the batch and to the item's
    overall Bin qty, SUM(batch qty) for the item always stays equal to the
    item's total actual_qty — this adjustment can't drift the two apart, and
    it never touches accounting outside the normal Stock Entry GL posting.
    """
    from psd_books.utils.access import assert_can
    assert_can("Stock Entry", "create")

    from frappe.utils import today as frappe_today
    fd = frappe.form_dict
    item_code = (fd.get("item_code") or "").strip()
    warehouse = (fd.get("warehouse") or "").strip()
    batch_no  = (fd.get("batch_no") or "").strip()
    reason    = (fd.get("reason") or "").strip()
    notes     = (fd.get("notes") or "").strip()
    adj_account = (fd.get("adjustment_account") or "").strip()
    posting_date = fd.get("posting_date") or frappe_today()

    if not item_code:
        frappe.throw(_("Item is required"))
    if not warehouse:
        frappe.throw(_("Warehouse is required"))
    if not batch_no:
        frappe.throw(_("Batch is required"))
    if fd.get("new_qty") in (None, ""):
        frappe.throw(_("New quantity is required"))

    new_qty = flt(fd.get("new_qty"))
    if new_qty < 0:
        frappe.throw(_("New quantity cannot be negative"))

    if not frappe.db.exists("Batch", batch_no):
        frappe.throw(_("Batch {0} does not exist").format(batch_no))
    batch_item = frappe.db.get_value("Batch", batch_no, "item")
    if batch_item and batch_item != item_code:
        frappe.throw(_("Batch {0} belongs to item {1}, not {2}").format(batch_no, batch_item, item_code))
    if frappe.db.get_value("Batch", batch_no, "disabled"):
        frappe.throw(_("Batch {0} is disabled and cannot be adjusted").format(batch_no))

    company = _get_company(frappe.session.user)

    # Current qty for THIS batch in THIS warehouse — read live off the ledger
    # (same aggregation get_warehouse_batches uses) so the delta we post is
    # relative to what the person is actually looking at on screen, not a
    # possibly-stale Batch.batch_qty snapshot.
    current_qty = flt(frappe.db.sql("""
        SELECT SUM(actual_qty) FROM `tabStock Ledger Entry`
        WHERE item_code=%s AND warehouse=%s AND batch_no=%s AND is_cancelled=0
    """, (item_code, warehouse, batch_no))[0][0] or 0)

    delta = new_qty - current_qty
    if abs(delta) < 0.0000001:
        frappe.throw(_("New quantity equals current batch quantity — nothing to adjust."))

    bin_row = frappe.db.get_value(
        "Bin", {"item_code": item_code, "warehouse": warehouse}, "valuation_rate",
    )
    rate = flt(bin_row)
    if not rate:
        item_rates = frappe.db.get_value(
            "Item", item_code, ["standard_buying_rate", "standard_rate"], as_dict=True
        ) or {}
        rate = flt(item_rates.get("standard_buying_rate")) or flt(item_rates.get("standard_rate")) or 0

    item_name = frappe.db.get_value("Item", item_code, "item_name") or item_code
    remark = (reason + ((" — " + notes) if notes else "") if reason
              else (notes or f"Batch stock adjustment for {item_code} / {batch_no}"))

    se = frappe.get_doc({
        "doctype":          "Stock Entry",
        "stock_entry_type": "Stock Adjustment",
        "posting_date":     posting_date,
        "company":          company,
        "remarks":          remark,
        "adjustment_reason": reason or None,
        "adjustment_account": adj_account or None,
        "items": [{
            "item_code":  item_code,
            "item_name":  item_name,
            "qty":        delta,
            "basic_rate": rate,
            "t_warehouse": warehouse,
            "batch_no":   batch_no,
        }],
    })
    se.name = "SEC-" + frappe.generate_hash(txt=f"{item_code}{batch_no}{frappe.utils.now()}", length=8).upper()
    se.flags.ignore_permissions = True
    se.flags.ignore_links = True
    se.flags.ignore_mandatory = True
    se.insert()
    se.submit()
    frappe.db.commit()

    new_bin_qty = flt(frappe.db.get_value(
        "Bin", {"item_code": item_code, "warehouse": warehouse}, "actual_qty",
    ) or 0)

    return {
        "stock_entry": se.name,
        "delta": delta,
        "new_qty": new_qty,
        "current_qty": current_qty,
        "rate": rate,
        "item_actual_qty": new_bin_qty,
    }


# ── Fix qty entered in the wrong UOM ──────────────────────────────────────────
#
# Typical slip: the item's stock UOM is Kg, the person types 100 meaning grams.
# "Fix qty" re-reads the wrongly entered qty in the UOM it was really in
# (100 Gram = 0.1 Kg) and posts the difference as a Stock Adjustment at the
# current valuation rate, so stock value becomes corrected_qty x rate
# (0.1 x rate), not 100 x rate. The rate itself is not changed.

def _wrong_uom_factor(item_code, stock_uom, actual_uom, per_stock=None):
    """Stock-UOM units in 1 `actual_uom`, for the Fix qty action.

    Uses the item's saved conversion row when there is one, otherwise the
    caller-supplied per_stock (1 stock UOM = per_stock actual_uom). Unlike
    inventory.utils.get_conversion_factor() it never falls back to 1.0: a
    missing factor here would turn the fix into a silent no-op.
    """
    if not actual_uom:
        frappe.throw(_("Choose the UOM the qty was really in"))
    if actual_uom == stock_uom:
        frappe.throw(_("{0} is already this item's stock UOM - nothing to convert").format(actual_uom))
    saved = flt(frappe.db.get_value(
        "Item UOM Conversion Detail",
        {"parent": item_code, "parenttype": "Item", "uom": actual_uom},
        "conversion_factor",
    ))
    if saved > 0:
        return saved
    if flt(per_stock) > 0:
        return 1.0 / flt(per_stock)
    frappe.throw(_("No conversion between {0} and {1}. Enter how many {1} make 1 {0}.").format(stock_uom, actual_uom))


WRONG_UOM_REASON = "Qty entered in wrong UOM"


def _wrong_uom_already_fixed(item_code, warehouse):
    """True if a submitted Fix qty adjustment already exists for this item in
    this warehouse. Fix qty is allowed only once; cancelling that Stock Entry
    frees it up again."""
    return bool(frappe.db.sql("""
        SELECT se.name FROM `tabStock Entry` se
        JOIN `tabStock Entry Detail` sed ON sed.parent = se.name
        WHERE se.stock_entry_type = 'Stock Adjustment'
          AND se.adjustment_reason = %s AND se.docstatus = 1
          AND sed.item_code = %s AND sed.t_warehouse = %s
        LIMIT 1
    """, (WRONG_UOM_REASON, item_code, warehouse)))


@frappe.whitelist(allow_guest=False)
def get_wrong_uom_fixed_items(warehouse=None):
    """[{item_code, warehouse}] already fixed once (hides the Fix qty button)."""
    from psd_books.utils.access import assert_can
    assert_can("Stock Entry", "read")
    cond, params = "", [WRONG_UOM_REASON]
    if warehouse:
        cond = " AND sed.t_warehouse = %s"
        params.append(warehouse)
    return frappe.db.sql(f"""
        SELECT DISTINCT sed.item_code, sed.t_warehouse AS warehouse
        FROM `tabStock Entry` se
        JOIN `tabStock Entry Detail` sed ON sed.parent = se.name
        WHERE se.stock_entry_type = 'Stock Adjustment'
          AND se.adjustment_reason = %s AND se.docstatus = 1{cond}
    """, params, as_dict=True)


@frappe.whitelist(allow_guest=False)
def get_wrong_uom_fix_info(item_code, warehouse):
    """Data for the Fix qty dialog: stock UOM, current qty/rate in the
    warehouse, saved conversions (as "1 <stock UOM> = N <uom>") and, for
    batch-tracked items, the batches in that warehouse."""
    from psd_books.utils.access import assert_can
    assert_can("Stock Entry", "read")
    item_code = (item_code or "").strip()
    warehouse = (warehouse or "").strip()
    if not item_code or not warehouse:
        frappe.throw(_("Item and warehouse are required"))
    item = frappe.db.get_value(
        "Item", item_code, ["name", "item_name", "stock_uom", "has_batch_no"], as_dict=True
    )
    if not item:
        frappe.throw(_("Item {0} not found").format(item_code))
    bin_row = frappe.db.get_value(
        "Bin", {"item_code": item_code, "warehouse": warehouse},
        ["actual_qty", "valuation_rate"], as_dict=True,
    ) or {}
    rows = []
    for r in frappe.get_all(
        "Item UOM Conversion Detail",
        filters={"parent": item_code, "parenttype": "Item"},
        fields=["uom", "conversion_factor"],
        order_by="idx asc",
    ):
        f = flt(r.conversion_factor)
        if r.uom and f > 0:
            rows.append({"uom": r.uom, "per_stock": round(1.0 / f, 6)})
    return {
        "item_code": item.name,
        "item_name": item.item_name or item.name,
        "stock_uom": item.stock_uom or "Nos",
        "has_batch_no": 1 if item.has_batch_no else 0,
        "bin_qty": flt(bin_row.get("actual_qty")),
        "valuation_rate": flt(bin_row.get("valuation_rate")),
        "rows": rows,
        "already_fixed": 1 if _wrong_uom_already_fixed(item_code, warehouse) else 0,
        "batches": get_batches_for_item(item_code, warehouse) if item.has_batch_no else [],
    }


@frappe.whitelist(allow_guest=False, methods=["POST"])
def convert_wrong_uom_qty(item_code, warehouse, wrong_qty, actual_uom,
                          per_stock=None, batch_no=None, notes=None):
    """Re-read `wrong_qty` (currently sitting in stock as stock-UOM units) as
    `actual_uom` and post the difference as a Stock Adjustment.

    Example: stock UOM Kg, 100 Kg on hand, wrong_qty=100, actual_uom=Gram
    (1 Kg = 1000 Gram) -> corrected qty 0.1 Kg, adjustment -99.9 Kg at the
    current valuation rate.

    per_stock is only used when the item has no saved conversion row for
    actual_uom (1 stock UOM = per_stock actual_uom); it is not saved.
    Batch-tracked items need batch_no; the adjustment carries that batch.
    """
    from psd_books.utils.access import assert_can
    from frappe.utils import today as frappe_today
    assert_can("Stock Entry", "create")

    item_code = (item_code or "").strip()
    warehouse = (warehouse or "").strip()
    actual_uom = (actual_uom or "").strip()
    batch_no = (batch_no or "").strip()
    notes = (notes or "").strip()
    wrong_qty = flt(wrong_qty)

    if not item_code:
        frappe.throw(_("Item is required"))
    if not warehouse:
        frappe.throw(_("Warehouse is required"))
    if wrong_qty <= 0:
        frappe.throw(_("Enter the wrongly entered qty (more than 0)"))
    if _wrong_uom_already_fixed(item_code, warehouse):
        frappe.throw(_("Qty for {0} in {1} has already been fixed once. Fix UOM can only be used one time.").format(
            item_code, warehouse))

    item = frappe.db.get_value(
        "Item", item_code, ["item_name", "stock_uom", "has_batch_no"], as_dict=True
    )
    if not item:
        frappe.throw(_("Item {0} not found").format(item_code))
    stock_uom = item.stock_uom or "Nos"

    if item.has_batch_no:
        if not batch_no:
            frappe.throw(_("{0} is batch-tracked - choose the batch to fix").format(item_code))
        if not frappe.db.exists("Batch", batch_no):
            frappe.throw(_("Batch {0} does not exist").format(batch_no))
        available = flt(frappe.db.sql("""
            SELECT SUM(actual_qty) FROM `tabStock Ledger Entry`
            WHERE item_code=%s AND warehouse=%s AND batch_no=%s AND is_cancelled=0
        """, (item_code, warehouse, batch_no))[0][0] or 0)
    else:
        batch_no = ""
        available = flt(frappe.db.get_value(
            "Bin", {"item_code": item_code, "warehouse": warehouse}, "actual_qty"
        ))
    if wrong_qty > available + 0.0000001:
        frappe.throw(_("Only {0} {1} is on hand here - the wrong qty cannot be more than that").format(
            available, stock_uom))

    factor = _wrong_uom_factor(item_code, stock_uom, actual_uom, per_stock)
    correct_qty = flt(wrong_qty * factor, 6)
    delta = flt(correct_qty - wrong_qty, 6)
    if delta == 0:
        frappe.throw(_("The converted qty equals the entered qty - nothing to adjust."))

    rate = flt(frappe.db.get_value(
        "Bin", {"item_code": item_code, "warehouse": warehouse}, "valuation_rate"
    ))
    if not rate:
        item_rates = frappe.db.get_value(
            "Item", item_code, ["standard_buying_rate", "standard_rate"], as_dict=True
        ) or {}
        rate = flt(item_rates.get("standard_buying_rate")) or flt(item_rates.get("standard_rate")) or 0

    remark = _("Qty entered in wrong UOM: {0} {1} re-read as {0} {2} = {3} {1}").format(
        wrong_qty, stock_uom, actual_uom, correct_qty)
    if notes:
        remark += " - " + notes

    row = {
        "item_code":   item_code,
        "item_name":   item.item_name or item_code,
        "qty":         delta,
        "basic_rate":  rate,
        "t_warehouse": warehouse,
    }
    if batch_no:
        row["batch_no"] = batch_no

    company = _get_company(frappe.session.user)
    se = frappe.get_doc({
        "doctype":           "Stock Entry",
        "stock_entry_type":  "Stock Adjustment",
        "posting_date":      frappe_today(),
        "company":           company,
        "remarks":           remark,
        "adjustment_reason": WRONG_UOM_REASON,
        "items":             [row],
    })
    se.name = "SEC-" + frappe.generate_hash(txt=f"{item_code}{warehouse}{frappe.utils.now()}", length=8).upper()
    se.flags.ignore_permissions = True
    se.flags.ignore_links = True
    se.flags.ignore_mandatory = True
    se.insert()
    se.submit()
    frappe.db.commit()
    return {
        "stock_entry":  se.name,
        "wrong_qty":    wrong_qty,
        "correct_qty":  correct_qty,
        "delta":        delta,
        "rate":         rate,
        "value_change": flt(delta * rate, 2),
        "stock_uom":    stock_uom,
    }


@frappe.whitelist(allow_guest=False)
def get_inventory_adjustments(company=None):
    """List Stock-Adjustment entries (one row per entry, first item line)."""
    if not company:
        company = _get_company(frappe.session.user)
    rows = frappe.db.sql("""
        SELECT se.name, se.posting_date, se.docstatus, se.value_difference,
               se.adjustment_reason, se.remarks,
               sed.item_code, sed.item_name, item.stock_uom,
               sed.t_warehouse AS warehouse,
               sed.batch_no, sed.qty, sed.basic_rate
        FROM `tabStock Entry` se
        LEFT JOIN `tabStock Entry Detail` sed ON sed.parent = se.name
        LEFT JOIN `tabItem` item ON item.name = sed.item_code
        WHERE se.stock_entry_type = 'Stock Adjustment' AND se.company = %s
        GROUP BY se.name
        ORDER BY se.posting_date DESC, se.creation DESC
        LIMIT 300
    """, (company,), as_dict=True)
    for r in rows:
        r["qty"] = flt(r.get("qty"))
        r["value"] = flt(r.get("qty")) * flt(r.get("basic_rate"))
    return rows


@frappe.whitelist(allow_guest=False)
def get_default_adjustment_account(company=None):
    """Return the company's Stock Adjustment leaf account (for prefilling the UI)."""
    if not company:
        company = _get_company(frappe.session.user)
    name = frappe.db.get_value(
        "Account",
        {"account_type": "Stock Adjustment", "company": company, "is_group": 0},
        "name",
    )
    return {"account": name or ""}


# ── Stock Ledger ──────────────────────────────────────────────────────────────

@frappe.whitelist(allow_guest=False)
def get_stock_ledger_entries(
    item_code=None,
    warehouse=None,
    from_date=None,
    to_date=None,
    limit=200,
    include_cancelled=0,
):
    """Return paginated stock movement history.

    include_cancelled=0:
        Return only active stock ledger entries.

    include_cancelled=1:
        Return both active and cancelled stock ledger entries.
    """

    return get_stock_ledger(
        item_code=item_code or None,
        warehouse=warehouse or None,
        from_date=from_date or None,
        to_date=to_date or None,
        limit=int(limit),
        include_cancelled=bool(int(include_cancelled)),
    )


@frappe.whitelist(allow_guest=False)
def delete_cancelled_stock_ledger_entry(name):
    """
    Hard-delete a single cancelled Stock Ledger Entry row.

    Cleanup-only: only rows already flagged is_cancelled=1 may be removed
    this way, so this can never touch a live/active balance — active
    entries must go through the normal cancel flow instead.
    """
    is_cancelled = frappe.db.get_value("Stock Ledger Entry", name, "is_cancelled")
    if is_cancelled is None:
        frappe.throw(_("Stock Ledger Entry not found"))
    if not is_cancelled:
        frappe.throw(_("Only cancelled entries can be deleted"))
    frappe.delete_doc("Stock Ledger Entry", name, ignore_permissions=True, force=True)
    return {"deleted": name}


@frappe.whitelist(allow_guest=False)
def get_item_party_transactions(item_code, limit=100):
    """
    Buy/sell trail for a single item: every submitted Purchase Invoice and
    Sales Invoice line that includes this item, with the vendor/customer
    name and qty, newest first. Used by the item detail page so staff can
    see "who did we buy/sell this to and how much".
    """
    limit = int(limit)

    purchases = frappe.db.sql("""
        SELECT
            pi.name            AS voucher_no,
            pi.posting_date    AS posting_date,
            pi.supplier        AS party,
            pi.supplier_name   AS party_name,
            pi.status          AS status,
            pii.qty            AS qty,
            pii.uom            AS uom,
            pii.rate           AS rate,
            pii.amount         AS amount
        FROM `tabPurchase Invoice Item` pii
        INNER JOIN `tabPurchase Invoice` pi ON pi.name = pii.parent
        WHERE pii.item_code = %(item_code)s
          AND pi.docstatus = 1
        ORDER BY pi.posting_date DESC, pi.creation DESC
        LIMIT %(limit)s
    """, {"item_code": item_code, "limit": limit}, as_dict=True)

    sales = frappe.db.sql("""
        SELECT
            si.name            AS voucher_no,
            si.posting_date    AS posting_date,
            si.customer        AS party,
            si.customer_name   AS party_name,
            si.status          AS status,
            sii.qty            AS qty,
            sii.uom            AS uom,
            sii.rate           AS rate,
            sii.amount         AS amount
        FROM `tabSales Invoice Item` sii
        INNER JOIN `tabSales Invoice` si ON si.name = sii.parent
        WHERE sii.item_code = %(item_code)s
          AND si.docstatus = 1
        ORDER BY si.posting_date DESC, si.creation DESC
        LIMIT %(limit)s
    """, {"item_code": item_code, "limit": limit}, as_dict=True)

    rows = []
    for r in purchases:
        rows.append({**r, "type": "Purchase", "party_type": "Supplier"})
    for r in sales:
        rows.append({**r, "type": "Sale", "party_type": "Customer"})

    rows.sort(key=lambda r: (r["posting_date"] or ""), reverse=True)

    total_purchased = sum(flt(r["qty"]) for r in purchases)
    total_sold      = sum(flt(r["qty"]) for r in sales)

    return {
        "rows": rows[:limit],
        "total_purchased_qty": total_purchased,
        "total_sold_qty": total_sold,
    }


# ── Reorder Alerts ────────────────────────────────────────────────────────────

@frappe.whitelist(allow_guest=False)
def get_reorder_items(company=None):
    """Return items that have fallen below their reorder level."""
    return get_reorder_alerts(company=company or None)


@frappe.whitelist(allow_guest=False)
def get_reorder_dashboard(company=None):
    """
    Return all stock items that have a reorder_level set, with their current
    stock and saved reorder config (supplier, auto_po_enabled, etc.).
    Used by the Reorder Management page.
    """
    items = frappe.get_all(
        "Item",
        filters={"reorder_level": [">", 0], "disabled": 0, "is_stock_item": 1},
        fields=[
            "name as item_code", "item_name", "stock_uom",
            "reorder_level", "reorder_qty",
            "default_warehouse",
            "reorder_supplier", "reorder_warehouse_override",
            "auto_po_enabled", "reorder_notes",
        ],
        order_by="item_name asc",
    )

    if not items:
        return []

    # Resolve actual_qty: sum across all warehouses (or scoped to company's warehouses)
    item_codes = [i["item_code"] for i in items]
    wh_filter  = {}
    if company:
        wh_filter["company"] = company

    bins = frappe.get_all(
        "Bin",
        filters={"item_code": ["in", item_codes], **wh_filter},
        fields=["item_code", "actual_qty"],
    )
    qty_map = {}
    for b in bins:
        qty_map[b.item_code] = qty_map.get(b.item_code, 0) + flt(b.actual_qty)

    for item in items:
        item["actual_qty"]     = flt(qty_map.get(item["item_code"], 0))
        item["below_reorder"]  = item["actual_qty"] < flt(item["reorder_level"])
        item["shortage_qty"]   = max(flt(item["reorder_level"]) - item["actual_qty"], 0)
        item["auto_po_enabled"] = int(item.get("auto_po_enabled") or 0)

    return items


@frappe.whitelist(allow_guest=False, methods=["POST"])
def save_item_reorder_config(item_code, supplier="", warehouse_override="",
                              reorder_qty=None, reorder_level=None,
                              auto_po_enabled=0, notes=""):
    """Save reorder config fields directly on the Item document."""
    from psd_books.utils.access import assert_can
    assert_can("Item", "write")

    if not frappe.db.exists("Item", item_code):
        frappe.throw(f"Item {item_code} not found")

    updates = {
        "reorder_supplier":           supplier or None,
        "reorder_warehouse_override": warehouse_override or None,
        "auto_po_enabled":            int(auto_po_enabled),
        "reorder_notes":              notes or "",
    }
    if reorder_qty is not None:
        updates["reorder_qty"] = flt(reorder_qty)
    if reorder_level is not None:
        updates["reorder_level"] = flt(reorder_level)

    frappe.db.set_value("Item", item_code, updates)
    frappe.db.commit()
    return {"success": True}


# ── Valuation Report ─────────────────────────────────────────────────────────

@frappe.whitelist(allow_guest=False)
def get_stock_valuation_report(warehouse=None, as_of_date=None, project=None):
    """
    Stock valuation summary — total value per warehouse, and grand total.
    project: limit to the warehouses assigned to that project (Sava A13).
    """
    filters = {"actual_qty": [">", 0]}
    if warehouse:
        filters["warehouse"] = warehouse
    if not _restrict_to_project(filters, project):
        return {"as_of_date": as_of_date or today(), "by_warehouse": [], "grand_total": 0.0}

    bins = frappe.get_all(
        "Bin",
        filters=filters,
        fields=["warehouse", "stock_value"],
    )

    by_warehouse: dict[str, float] = {}
    for b in bins:
        by_warehouse[b.warehouse] = by_warehouse.get(b.warehouse, 0) + flt(b.stock_value)

    grand_total = sum(by_warehouse.values())

    return {
        "as_of_date":   as_of_date or today(),
        "by_warehouse": [{"warehouse": k, "stock_value": v} for k, v in sorted(by_warehouse.items())],
        "grand_total":  grand_total,
    }


@frappe.whitelist(allow_guest=False)
def get_selling_mrp_report(warehouse=None, search=None, in_stock_only=0):
    """
    Item-wise Selling Price & MRP per warehouse.

    One row per (item, warehouse Bin). Items with no Bin yet get one row with
    an empty warehouse (hidden when a warehouse filter is applied).
    Selling price = Item.standard_rate. MRP = Item.mrp, falling back to the
    selling rate when MRP is not set (same rule invoices use).
    """
    in_stock_only = cint(in_stock_only)
    search = (search or "").strip()

    item_kwargs = {
        "filters": {"disabled": 0, "is_stock_item": 1},
        "fields": ["name", "item_name", "item_group", "stock_uom", "standard_rate", "mrp"],
        "order_by": "item_name asc",
        "limit_page_length": 0,
    }
    if search:
        like = "%" + search + "%"
        item_kwargs["or_filters"] = [["name", "like", like], ["item_name", "like", like]]
    items = frappe.get_all("Item", **item_kwargs)

    bin_filters = {}
    if warehouse:
        bin_filters["warehouse"] = warehouse
    if in_stock_only:
        bin_filters["actual_qty"] = [">", 0]
    bins_by_item = {}
    for b in frappe.get_all(
        "Bin",
        filters=bin_filters,
        fields=["item_code", "warehouse", "actual_qty"],
        order_by="warehouse asc",
        limit_page_length=0,
    ):
        bins_by_item.setdefault(b.item_code, []).append(b)

    rows = []
    for it in items:
        selling = flt(it.standard_rate)
        mrp = flt(it.mrp) or selling
        base = {
            "item_code": it.name,
            "item_name": it.item_name,
            "item_group": it.item_group,
            "uom": it.stock_uom,
            "selling_price": selling,
            "mrp": mrp,
            "mrp_is_set": 1 if flt(it.mrp) else 0,
        }
        bins = bins_by_item.get(it.name)
        if bins:
            for b in bins:
                rows.append({**base, "warehouse": b.warehouse, "qty": flt(b.actual_qty)})
        elif not warehouse and not in_stock_only:
            rows.append({**base, "warehouse": "", "qty": 0})

    return {
        "rows": rows,
        "warehouses": sorted({r["warehouse"] for r in rows if r["warehouse"]}),
    }


# ── Item Price ────────────────────────────────────────────────────────────────

@frappe.whitelist(allow_guest=False)
def get_item_price_list(item_code=None, price_list=None, as_of_date=None):
    """
    Return active Item Prices, optionally filtered by item or price list.
    """
    filters = {}
    if item_code:
        filters["item_code"] = item_code
    if price_list:
        filters["price_list"] = price_list

    prices = frappe.get_all(
        "Item Price",
        filters=filters,
        fields=["name", "item_code", "item_name", "price_list",
                "uom", "currency", "valid_from", "valid_upto", "price_list_rate"],
        order_by="item_code asc, valid_from desc",
        limit=1000,
    )

    date = as_of_date or today()
    result = []
    for p in prices:
        if p.valid_from and getdate(p.valid_from) > getdate(date):
            continue
        if p.valid_upto and getdate(p.valid_upto) < getdate(date):
            continue
        result.append(p)

    return result


@frappe.whitelist(allow_guest=False)
def get_price_for_item(item_code, price_list, uom=None, as_of_date=None):
    """Return a single effective rate for an item + price list (used by invoice line-fill)."""
    return {
        "item_code":       item_code,
        "price_list":      price_list,
        "price_list_rate": get_item_price(item_code, price_list, uom=uom, as_of_date=as_of_date),
    }


# ── Warehouse List ────────────────────────────────────────────────────────────

@frappe.whitelist(allow_guest=False)
def get_warehouses(disabled=0):
    """Return all active warehouses for dropdowns."""
    filters = {}
    if not int(disabled):
        filters["disabled"] = 0
    return frappe.get_all(
        "Warehouse",
        filters=filters,
        fields=["name", "warehouse_name", "warehouse_type", "parent_warehouse",
                "city", "is_group", "disabled"],
        order_by="warehouse_name asc",
    )


# ── Quick Stock Check ─────────────────────────────────────────────────────────

@frappe.whitelist(allow_guest=False)
def check_stock_availability(item_code, warehouse, required_qty):
    """
    Used by Sales Order / Invoice to verify stock before confirming.
    Returns {available, sufficient, shortage}.
    """
    available = get_stock_balance(item_code, warehouse)
    req = flt(required_qty)
    return {
        "item_code":    item_code,
        "warehouse":    warehouse,
        "available_qty":available,
        "required_qty": req,
        "sufficient":   available >= req,
        "shortage":     max(0, req - available),
    }


# ── Dashboard KPIs (for Inventory section) ───────────────────────────────────

@frappe.whitelist(allow_guest=False)
def get_inventory_kpis(company=None):
    """
    Return key inventory metrics for the dashboard:
    - Total stock value
    - Items below reorder level
    - Total items tracked
    - Warehouses with stock
    """
    filters = {"actual_qty": [">", 0]}
    if company:
        filters["company"] = company

    bins = frappe.get_all("Bin", filters=filters,
                          fields=["item_code", "warehouse", "stock_value"])

    unique_items = len({b.item_code for b in bins})
    unique_wh    = len({b.warehouse for b in bins})
    total_value  = sum(flt(b.stock_value) for b in bins)

    reorder = get_reorder_alerts(company=company or None)

    return {
        "total_stock_value":   total_value,
        "unique_items_in_stock": unique_items,
        "warehouses_with_stock": unique_wh,
        "reorder_alerts":      len(reorder),
        "reorder_items":       reorder[:10],   # top-10 most critical
    }


# ── Bin Recalculation (Audit-5) ───────────────────────────────────────────────

@frappe.whitelist(allow_guest=False)
def recalculate_bin_from_ledger(item_code, warehouse):
    """
    Audit-5: Recompute a single Bin balance from Stock Ledger Entries.
    Use when you suspect Bin drift after cancellations or direct DB edits.
    Returns a summary of the before/after values.
    """
    return recalculate_bin(item_code, warehouse)


@frappe.whitelist(allow_guest=False)
def recalculate_all_bins_from_ledger(warehouse=None):
    """
    Audit-5: Recompute all Bin balances from Stock Ledger Entries.
    Optionally scoped to a single warehouse.
    Returns a list of per-Bin result dicts with drift information.
    """
    return recalculate_all_bins(warehouse=warehouse or None)


# ── Manual Stock Entry ────────────────────────────────────────────────────────

@frappe.whitelist(allow_guest=False)
def create_stock_entry():
    """
    Create and submit a manual Stock Entry.
    Reads all parameters from frappe.form_dict.

    Required fields:
      entry_type  — "Material Receipt" | "Material Issue" | "Material Transfer"
                    | "Stock Adjustment" | "Opening Stock"
      items       — JSON list of {item_code, item_name, qty, basic_rate,
                                  t_warehouse?, s_warehouse?}

    Optional:
      posting_date, remarks, from_warehouse, to_warehouse
    """
    from psd_books.utils.access import assert_can
    assert_can("Stock Entry", "create")

    import json
    fd = frappe.form_dict

    entry_type   = fd.get("entry_type") or ""
    items_raw    = fd.get("items") or "[]"
    posting_date = fd.get("posting_date") or today()
    remarks      = fd.get("remarks") or ""
    from_wh      = fd.get("from_warehouse") or ""
    to_wh        = fd.get("to_warehouse") or ""

    VALID_TYPES = ("Material Receipt", "Material Issue", "Material Transfer",
                   "Stock Adjustment", "Opening Stock")
    if entry_type not in VALID_TYPES:
        frappe.throw(f"Invalid entry_type '{entry_type}'. Must be one of: {', '.join(VALID_TYPES)}")

    if isinstance(items_raw, str):
        items = json.loads(items_raw)
    else:
        items = list(items_raw)

    if not items:
        frappe.throw("At least one item is required.")

    # Apply header-level warehouses as defaults for each row
    for row in items:
        if from_wh and not row.get("s_warehouse"):
            row["s_warehouse"] = from_wh
        if to_wh and not row.get("t_warehouse"):
            row["t_warehouse"] = to_wh

    company = _get_company(frappe.session.user)

    se = frappe.get_doc({
        "doctype":           "Stock Entry",
        "stock_entry_type":  entry_type,
        "posting_date":      posting_date,
        "company":           company,
        "from_warehouse":    from_wh,
        "to_warehouse":      to_wh,
        "remarks":           remarks,
        "items":             items,
    })
    se.name = "SEC-" + frappe.generate_hash(
        txt=f"{entry_type}{frappe.utils.now()}", length=8
    ).upper()
    se.flags.ignore_permissions = True
    se.flags.ignore_links = True
    se.flags.ignore_mandatory = True
    se.insert()
    se.submit()
    frappe.db.commit()

    return {
        "stock_entry":  se.name,
        "entry_type":   entry_type,
        "items_count":  len(items),
        "posting_date": posting_date,
    }


@frappe.whitelist(allow_guest=False)
def get_stock_entries(entry_type=None, from_date=None, to_date=None, warehouse=None, limit=100):
    """Return submitted stock entries with optional filters."""
    filters = {"docstatus": 1}
    if entry_type:
        filters["stock_entry_type"] = entry_type
    if from_date:
        filters["posting_date"] = [">=", from_date]
    if to_date:
        if "posting_date" in filters:
            filters["posting_date"] = ["between", [from_date or "2000-01-01", to_date]]
        else:
            filters["posting_date"] = ["<=", to_date]
    if warehouse:
        filters["from_warehouse"] = warehouse

    entries = frappe.get_all(
        "Stock Entry",
        filters=filters,
        fields=["name", "stock_entry_type", "posting_date", "company",
                "from_warehouse", "to_warehouse", "remarks",
                "total_outgoing_value", "total_incoming_value"],
        order_by="posting_date desc, creation desc",
        limit=int(limit),
    )
    # Attach items to each entry
    for se in entries:
        se["items"] = frappe.get_all(
            "Stock Entry Detail",
            filters={"parent": se.name},
            fields=["item_code", "item_name", "qty", "basic_rate", "amount",
                    "s_warehouse", "t_warehouse"],
        )
    return entries


# ── Reorder → Purchase Order ──────────────────────────────────────────────────

@frappe.whitelist(allow_guest=False, methods=["POST"])
def create_po_from_reorder(items=None, supplier=None, company=None):
    """
    Create a draft Purchase Order from a list of reorder items.
    `items` is a JSON list of {item_code, qty, warehouse} dicts.
    Returns the new PO name.
    """
    import json
    from frappe.utils import flt, today

    from psd_books.utils.access import assert_can, assert_company
    # Purchase Order lives in the "bills" module (see DOCTYPE_MODULE) even
    # though this endpoint is reached from the Inventory reorder screen.
    assert_can("Purchase Order", "create")

    if isinstance(items, str):
        items = json.loads(items)
    if not items:
        frappe.throw("No items provided")

    if company:
        # `company` is caller-supplied here (unlike the other endpoints in
        # this file, which always derive it from _get_company) — reject an
        # attempt to create a PO for a company that isn't the caller's own.
        assert_company(company)
    else:
        company = (
            frappe.db.get_single_value("Books Settings", "default_company")
            or frappe.db.get_default("company")
            or ""
        )

    po_items = []
    for row in items:
        item_code = row.get("item_code")
        if not item_code:
            continue
        item_doc = frappe.get_cached_doc("Item", item_code)
        qty = flt(row.get("qty")) or flt(
            frappe.db.get_value("Bin",
                {"item_code": item_code, "warehouse": row.get("warehouse")},
                "reorder_qty") or 0
        )
        if qty <= 0:
            qty = 1
        rate = flt(item_doc.get("standard_buying_rate") or item_doc.get("standard_rate") or 0)
        po_items.append({
            "item_code":  item_code,
            "item_name":  item_doc.item_name,
            "description": item_doc.description or item_doc.item_name,
            "qty":        qty,
            "uom":        item_doc.stock_uom or "Nos",
            "rate":       rate,
            "amount":     qty * rate,
        })

    po = frappe.get_doc({
        "doctype":          "Purchase Order",
        "supplier":         supplier or "",
        "transaction_date": today(),
        "company":          company,
        "items":            po_items,
    })
    po.insert(ignore_permissions=True)
    frappe.db.commit()
    return {"name": po.name}
@frappe.whitelist()
def get_stock_for_items(warehouse, item_codes):
    import json
    if isinstance(item_codes, str):
        item_codes = json.loads(item_codes)
    if not item_codes:
        return {}
    
    bins = frappe.get_all("Bin", filters={"warehouse": warehouse, "item_code": ["in", item_codes]}, fields=["item_code", "actual_qty"])
    
    res = {}
    for b in bins:
        res[b.item_code] = b.actual_qty
    for i in item_codes:
        if i not in res:
            res[i] = 0.0
    return res

# ── Material Request → Purchase Order ─────────────────────────────────────────

@frappe.whitelist(allow_guest=False, methods=["POST"])
def create_po_from_mr(material_request):
    from frappe.utils import flt, today
    from psd_books.utils.access import assert_can

    assert_can("Purchase Order", "create")
    mr = frappe.get_doc("Material Request", material_request)
    
    if mr.docstatus != 1:
        frappe.throw("Material Request must be submitted")
    if mr.material_request_type not in ("Purchase", "Asset"):
        frappe.throw("Only Purchase or Asset Material Requests can be converted to Purchase Orders")

    po_items = []
    for row in mr.items:
        item_doc = frappe.get_cached_doc("Item", row.item_code)
        rate = flt(item_doc.get("standard_buying_rate") or item_doc.get("standard_rate") or 0)
        po_items.append({
            "item_code":   row.item_code,
            "item_name":   item_doc.item_name,
            "description": item_doc.description or item_doc.item_name,
            "qty":         row.required_qty,
            "uom":         row.uom or item_doc.stock_uom or "Nos",
            "rate":        rate,
            "amount":      row.required_qty * rate,
        })

    po = {
        "doctype":          "Purchase Order",
        "supplier":         "",
        "transaction_date": today(),
        "company":          mr.company,
        "material_request": mr.name,
        "project":          mr.get("project") or "",
        "set_warehouse":    mr.get("delivery_warehouse") or "",
        "material_request_type": mr.material_request_type,
        "items":            po_items,
    }
    return po


@frappe.whitelist(allow_guest=False)
def get_warehouse_projects():
    """Sava A13: {warehouse name: [project, ...]} from the Warehouse Project rows, in order."""
    rows = frappe.get_all("Warehouse Project",
        filters={"parenttype": "Warehouse", "parentfield": "projects"},
        fields=["parent", "project"], order_by="idx asc")
    out = {}
    for r in rows:
        out.setdefault(r.parent, []).append(r.project)
    return out