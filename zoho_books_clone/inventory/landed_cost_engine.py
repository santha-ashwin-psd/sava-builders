from __future__ import annotations
"""
Landed Cost Voucher — allocation engine.

get_source_items      -- pull item rows from the referenced Purchase Receipt /
                          Purchase Invoice (resolving warehouse the same way
                          stock_link._stock_rows does: row > doc.set_warehouse
                          > item default > company default) into the plain
                          dict shape a Landed Cost Voucher Item row expects.
allocate_charges       -- pure function: given item rows (purchase_amount,
                          received_qty) and charge rows (amount), proportionally
                          distribute the combined charge pool across items by
                          value or by qty, and derive each item's new
                          valuation rate. No DB access — safe to unit test in
                          isolation and to call from LandedCostVoucher.validate().
get_landed_cost_preview -- whitelisted endpoint combining the two above, for
                          the frontend to render a live preview before submit.

None of this writes to Bin or posts GL entries — that's Phase 3 (valuation)
and Phase 4 (GL reclassification).
"""

import json

import frappe
from frappe import _
from frappe.utils import flt

from zoho_books_clone.utils.access import assert_can
from zoho_books_clone.inventory.utils import get_valuation_rate

ROUND_PRECISION = 2


# ─── Pulling source rows ──────────────────────────────────────────────────────

def get_source_items(source_doctype: str, source_name: str) -> list[dict]:
    """Return one dict per stock item row on the referenced Purchase Receipt /
    Purchase Invoice, shaped for a Landed Cost Voucher Item row. Skips rows
    with no resolvable warehouse or a non-stock item, same as the auto stock
    entry builder in inventory/stock_link.py.
    """
    if source_doctype not in ("Purchase Receipt", "Purchase Invoice"):
        frappe.throw(_("Landed Cost Voucher source must be a Purchase Receipt or Purchase Invoice."))

    doc = frappe.get_doc(source_doctype, source_name)
    default_warehouse = _company_default_warehouse(doc.company)

    rows = []
    for row in (doc.items or []):
        item_code = getattr(row, "item_code", None)
        qty = flt(getattr(row, "qty", 0))
        if not item_code or qty <= 0:
            continue

        item_meta = frappe.db.get_value(
            "Item", item_code, ["is_stock_item", "default_warehouse", "is_fixed_asset"], as_dict=True
        ) or {}
        if not item_meta.get("is_stock_item"):
            continue
        # Fixed-asset items are excluded even when also flagged is_stock_item
        # (the two aren't mutually exclusive at the Item level -- see
        # Item.validate()). This module only ever touches stock valuation
        # (Bin/SLE) and the linked GL accounts -- it has no code path that
        # updates Asset.purchase_cost. If it allocated a charge onto a fixed-
        # asset item's stock valuation, that extra cost would silently never
        # reach the Asset record asset_link.py created from the same
        # Purchase Invoice/Receipt line, so the books and the Assets module
        # would drift apart exactly like the Debit Note gap flagged above.
        # If landed costs genuinely need to be capitalized onto a fixed
        # asset, that has to go through a manual Asset cost adjustment
        # instead, not this voucher.
        if item_meta.get("is_fixed_asset"):
            continue

        warehouse = (
            getattr(row, "warehouse", None)
            or getattr(doc, "set_warehouse", None)
            or item_meta.get("default_warehouse")
            or default_warehouse
        )
        if not warehouse:
            continue

        rows.append({
            "item_code": item_code,
            "item_name": getattr(row, "item_name", None) or item_code,
            "warehouse": warehouse,
            "batch_no": getattr(row, "batch_no", None) or None,
            "received_qty": qty,
            "purchase_amount": flt(getattr(row, "amount", 0)) or flt(getattr(row, "rate", 0)) * qty,
            "valuation_rate": get_valuation_rate(item_code, warehouse),
            "reference_item_row": row.name,
        })

    if not rows:
        frappe.throw(
            _("No stock item rows with a resolvable warehouse were found on {0} {1}.").format(
                source_doctype, source_name
            )
        )
    return rows


def _company_default_warehouse(company: str | None) -> str | None:
    if not company:
        return None
    return frappe.db.get_value("Warehouse", {"company": company, "is_group": 0}, "name")


# ─── Allocation ────────────────────────────────────────────────────────────────

def allocate_charges(
    items: list[dict],
    charges: list[dict],
    distribution_method: str = "By Value",
) -> list[dict]:
    """Pure function — no DB access.

    items:   list of dicts with at least item_code, received_qty, purchase_amount.
             Returned copies gain allocated_amount and new_valuation_rate.
    charges: list of dicts with at least amount. Only the sum matters here —
             which account each charge nets against is a Phase 4 (GL) concern.
    distribution_method: "By Value" (basis = purchase_amount) or
             "By Qty" (basis = received_qty).

    Rounding: each row's share is rounded to 2 decimals; the leftover paisa
    from that rounding is dumped onto the last row so the allocated amounts
    always sum exactly to the total charge.
    """
    if not items:
        return []

    total_charges = sum(flt(c.get("amount")) for c in charges)
    result = [dict(row) for row in items]

    if total_charges == 0:
        for row in result:
            row["allocated_amount"] = 0.0
            row["new_valuation_rate"] = _rate(row)
        return result

    basis_key = "received_qty" if distribution_method == "By Qty" else "purchase_amount"
    bases = [flt(row.get(basis_key)) for row in result]
    total_basis = sum(bases)

    if total_basis <= 0:
        # Nothing to weight by (e.g. every purchase_amount is 0 for free-sample
        # rows) — fall back to an equal split across rows.
        bases = [1.0] * len(result)
        total_basis = float(len(result))

    running_total = 0.0
    for i, row in enumerate(result):
        if i == len(result) - 1:
            # Last row absorbs the rounding remainder.
            share = round(total_charges - running_total, ROUND_PRECISION)
        else:
            share = round(total_charges * (bases[i] / total_basis), ROUND_PRECISION)
            running_total += share
        row["allocated_amount"] = share
        row["new_valuation_rate"] = _rate(row)

    return result


def _rate(row: dict) -> float:
    """New landed-cost-inclusive valuation rate for one item row.

    The base is the item's CURRENT stock valuation rate (row["valuation_rate"],
    populated from Bin.valuation_rate by get_source_items — already reflects
    this purchase blended with any existing stock at another rate). The
    allocated charge is layered on top of that, per unit. It must NOT be
    based on this row's own purchase_amount/qty: purchase_amount is just
    this one receipt/invoice line's amount, which routinely differs from the
    item's actual current valuation rate (e.g. existing stock at a different
    weighted-average rate) — using it as the base silently drops that
    existing valuation and can even make New Rate come out BELOW Old Rate,
    which should never happen since landed costs only ever add value.

    Falls back to purchase_amount/qty when no valuation_rate is supplied
    (e.g. these engine unit tests, which are pure and don't stub
    Bin.valuation_rate) so behavior without that field stays predictable.
    """
    qty = flt(row.get("received_qty"))
    if qty <= 0:
        return 0.0
    old_rate = row.get("valuation_rate")
    old_rate = flt(old_rate) if old_rate not in (None, "") else flt(row.get("purchase_amount")) / qty
    return round(old_rate + (flt(row.get("allocated_amount")) / qty), 4)


# ─── Partial-consumption capitalization (Phase 5) ──────────────────────────────

def compute_capitalizable_amount(
    allocated_amount: float, received_qty: float, current_qty: float
) -> float:
    """Pure function — no DB access.

    An item row's allocated_amount was computed assuming all of received_qty
    is still on hand. By the time the voucher is actually submitted, some of
    that qty may have already been issued/sold — retroactively editing the
    COGS already posted for that portion is out of scope, so only the
    still-on-hand fraction of the charge gets capitalized into Bin value.

      current_qty >= received_qty  -> capitalize the full allocated_amount
      0 < current_qty < received_qty -> capitalize allocated_amount *
                                         (current_qty / received_qty)
      current_qty <= 0             -> capitalize nothing

    current_qty is clamped to received_qty before the ratio is taken, so
    stock received later from an unrelated purchase never inflates how much
    of *this* charge gets capitalized.
    """
    allocated_amount = flt(allocated_amount)
    received_qty = flt(received_qty)
    current_qty = flt(current_qty)

    if not allocated_amount or received_qty <= 0:
        return 0.0

    capitalizable_qty = min(current_qty, received_qty)
    if capitalizable_qty <= 0:
        return 0.0
    if capitalizable_qty >= received_qty:
        return round(allocated_amount, ROUND_PRECISION)
    return round(allocated_amount * (capitalizable_qty / received_qty), ROUND_PRECISION)


def compute_gl_scale_ratio(total_capitalized: float, total_charges: float) -> float:
    """Pure function — no DB access. The fraction of total_charges that was
    actually capitalized, used to scale every charge row's GL credit so
    Dr Inventory (== total_capitalized) always equals the sum of the scaled
    credits by construction. Clamped to 1.0 as a defensive ceiling — rounding
    on individual rows should never let the sum exceed the total, but the
    clamp makes that a guarantee rather than an assumption.
    """
    total_charges = flt(total_charges)
    if total_charges <= 0:
        return 0.0
    return min(flt(total_capitalized) / total_charges, 1.0)


def scale_charges_for_capitalization(
    charges: list[dict], total_capitalized: float, total_charges: float
) -> list[dict]:
    """Pure function — no DB access. Scale each charge row's amount by
    (total_capitalized / total_charges) for GL posting.

    Rounding each row independently (round(amount * ratio, 2) per row) can
    let the rows' sum drift a paisa or two away from total_capitalized in
    partial-capitalization cases — Bin.stock_value (built from item rows
    that already use last-row-absorbs-the-remainder rounding) and the GL Dr
    Inventory line (built from these charge rows) would then disagree by
    that same paisa or two. This mirrors allocate_charges()'s rounding rule
    exactly: every row but the last is rounded normally, and the last
    nonzero row absorbs whatever remainder is needed so
    sum(row["amount"] for row in result) always equals
    round(total_capitalized, ROUND_PRECISION) exactly.

    Returns a list of {"account", "amount", "description"} dicts for rows
    whose scaled amount is nonzero, in original charge order.
    """
    total_charges = flt(total_charges)
    total_capitalized = flt(total_capitalized)
    if total_charges <= 0 or total_capitalized <= 0:
        return []

    ratio = min(total_capitalized / total_charges, 1.0)

    nonzero_rows = [row for row in charges if flt(row.get("amount"))]
    if not nonzero_rows:
        return []

    target_total = round(total_capitalized, ROUND_PRECISION)
    last_idx = len(nonzero_rows) - 1
    running_total = 0.0
    result = []

    for i, row in enumerate(nonzero_rows):
        if i == last_idx:
            # Last row absorbs the rounding remainder so the sum is exact.
            amount = round(target_total - running_total, ROUND_PRECISION)
        else:
            amount = round(flt(row.get("amount")) * ratio, ROUND_PRECISION)
            running_total += amount
        if not amount:
            continue
        result.append({
            "account": row.get("account"),
            "amount": amount,
            "description": row.get("description"),
        })

    return result


# ─── GL map builder (Phase 4) ──────────────────────────────────────────────────

def build_landed_cost_gl_map(
    inventory_account: str,
    charges: list[dict],
    voucher_no: str,
    posting_date,
    company: str,
    posting_time=None,
) -> list[dict]:
    """Pure function — no DB access. Builds the balanced gl_map for
    general_ledger_entry.make_gl_entries(): one Dr Inventory Asset line for
    the combined total, one Cr line per charge row for its own amount into
    its own account. Debit always equals credit by construction (both derive
    from the same charges list), so this can never fail
    _validate_gl_balance — verified in tests/test_landed_cost_gl.py.
    """
    total_charges = sum(flt(c.get("amount")) for c in charges)
    if total_charges <= 0:
        return []

    gl_map = [{
        "account": inventory_account,
        "debit": total_charges,
        "credit": 0,
        "voucher_type": "Landed Cost Voucher",
        "voucher_no": voucher_no,
        "posting_date": posting_date,
        "posting_time": posting_time,
        "company": company,
        "remarks": f"Landed cost capitalized — {voucher_no}",
    }]
    for c in charges:
        amount = flt(c.get("amount"))
        if not amount:
            continue
        gl_map.append({
            "account": c.get("account"),
            "debit": 0,
            "credit": amount,
            "voucher_type": "Landed Cost Voucher",
            "voucher_no": voucher_no,
            "posting_date": posting_date,
            "posting_time": posting_time,
            "company": company,
            "remarks": c.get("description") or f"Reclassified into inventory — {voucher_no}",
        })
    return gl_map


# ─── Frontend preview endpoint ─────────────────────────────────────────────────

@frappe.whitelist(allow_guest=False, methods=["POST"])
def get_landed_cost_preview(source_doctype, source_name, charges, distribution_method="By Value"):
    """Live preview for the LCV form: pull the source document's item rows and
    show what each item's allocated charge / new valuation rate would be for
    the charge rows the user has drafted so far — before anything is saved.

    charges: JSON-encoded list of {"amount": ...} dicts (account/description
    are irrelevant to the allocation math and ignored here).
    """
    if frappe.session.user == "Guest":
        frappe.throw(_("Not permitted"), frappe.PermissionError)
    assert_can("Landed Cost Voucher", "read")

    if isinstance(charges, str):
        charges = json.loads(charges or "[]")

    items = get_source_items(source_doctype, source_name)
    allocated_items = allocate_charges(items, charges, distribution_method)

    return {
        "items": allocated_items,
        "total_purchase_amount": sum(flt(r["purchase_amount"]) for r in allocated_items),
        "total_charges": sum(flt(c.get("amount")) for c in charges),
        "distribution_method": distribution_method,
    }


# ─── Reporting visibility (Phase 8) ─────────────────────────────────────────────

@frappe.whitelist(allow_guest=False)
def get_landed_cost_breakdown(pairs):
    """Read-only helper powering the landed-cost visibility in Stock Valuation
    and BOM raw-material rows: for each item_code+warehouse pair, split the
    current Bin.valuation_rate into a base (purchase) rate and a landed-cost
    rate, so the UI can show "₹10,000 base + ₹700 landed = ₹10,700" instead of
    just a single opaque number.

    The landed portion is derived from the same active Stock Ledger Entries
    Phase 3/5 write (voucher_type="Landed Cost Voucher", is_cancelled=0) —
    summing stock_value_difference per bin gives exactly how much of
    Bin.stock_value is currently landed-cost, divided by actual_qty for a
    per-unit rate. No new source of truth is introduced; this only reads and
    re-presents what _create_valuation_sles / _update_bin already wrote.

    pairs: JSON-encoded list of {"item_code": ..., "warehouse": ...}.
    Returns a dict keyed "item_code::warehouse" -> {valuation_rate, base_rate,
    landed_rate, has_landed_cost}.
    """
    if isinstance(pairs, str):
        pairs = json.loads(pairs or "[]")
    if not pairs:
        return {}

    item_codes = list({p.get("item_code") for p in pairs if p.get("item_code")})
    warehouses = list({p.get("warehouse") for p in pairs if p.get("warehouse")})
    if not item_codes or not warehouses:
        return {}

    bins = frappe.get_all(
        "Bin",
        filters={"item_code": ["in", item_codes], "warehouse": ["in", warehouses]},
        fields=["item_code", "warehouse", "valuation_rate", "actual_qty"],
    )
    bin_map = {f"{b.item_code}::{b.warehouse}": b for b in bins}

    sle_rows = frappe.get_all(
        "Stock Ledger Entry",
        filters={
            "voucher_type": "Landed Cost Voucher",
            "is_cancelled": 0,
            "item_code": ["in", item_codes],
            "warehouse": ["in", warehouses],
        },
        fields=["item_code", "warehouse", "sum(stock_value_difference) as landed_value"],
        group_by="item_code, warehouse",
    )
    landed_map = {f"{r.item_code}::{r.warehouse}": flt(r.landed_value) for r in sle_rows}

    result = {}
    for p in pairs:
        item_code, warehouse = p.get("item_code"), p.get("warehouse")
        if not item_code or not warehouse:
            continue
        key = f"{item_code}::{warehouse}"
        b = bin_map.get(key)
        rate = flt(b.valuation_rate) if b else 0.0
        qty = flt(b.actual_qty) if b else 0.0
        landed_value = landed_map.get(key, 0.0)
        # Rounded to 4 dp for the same reason as compute_bin_valuation()
        # (inventory/utils.py) -- landed_value/qty is a fresh division with
        # no rounding of its own, and base_rate inherits whatever noise
        # that leaves. valuation_rate itself is already clean coming off
        # Bin (rounded at the source now), but landed_rate/base_rate are
        # computed fresh right here and need the same treatment.
        landed_rate = flt((landed_value / qty) if qty else 0.0, 4)
        result[key] = {
            "valuation_rate": rate,
            "landed_rate": landed_rate,
            "base_rate": flt(rate - landed_rate, 4),
            "has_landed_cost": bool(landed_value),
        }
    return result


@frappe.whitelist(allow_guest=False)
def get_item_valuation_rates(item_codes):
    """Buy-side rate per item, for BOM raw-material / packing / bulk rows.

    Used when an item has no default warehouse (so get_landed_cost_breakdown
    has no item+warehouse pair to look up). Returns {item_code: rate} where
    rate is, in order:
      1. the qty-weighted average Bin.valuation_rate across warehouses that
         currently hold stock (actual_qty > 0);
      2. else the highest Bin.valuation_rate found (stock fully drained --
         Bin rate freezes rather than zeroing);
      3. else Item.standard_buying_rate;
      4. else 0.
    Never returns Item.standard_rate (that is the selling rate).

    item_codes: JSON-encoded list of item codes.
    """
    if isinstance(item_codes, str):
        item_codes = json.loads(item_codes or "[]")
    item_codes = [c for c in dict.fromkeys(item_codes or []) if c]
    if not item_codes:
        return {}

    bins = frappe.get_all(
        "Bin",
        filters={"item_code": ["in", item_codes]},
        fields=["item_code", "valuation_rate", "actual_qty"],
    )
    by_item = {}
    for b in bins:
        by_item.setdefault(b.item_code, []).append(b)

    buying = {
        r.name: flt(r.standard_buying_rate)
        for r in frappe.get_all(
            "Item",
            filters={"name": ["in", item_codes]},
            fields=["name", "standard_buying_rate"],
        )
    }

    result = {}
    for code in item_codes:
        rows = by_item.get(code, [])
        in_stock = [r for r in rows if flt(r.actual_qty) > 0 and flt(r.valuation_rate) > 0]
        if in_stock:
            total_qty = sum(flt(r.actual_qty) for r in in_stock)
            rate = sum(flt(r.actual_qty) * flt(r.valuation_rate) for r in in_stock) / total_qty
        else:
            rate = max([flt(r.valuation_rate) for r in rows] or [0.0])
        if not rate:
            rate = buying.get(code, 0.0)
        result[code] = flt(rate, 4)
    return result