"""
Scoped correction-plan replay for the sesame-oil / coconut-oil UOM conversion bug.

v2 — extends v1 (RM-Oils-only replay) to close the gaps noted at the end of
the last session and chain all the way through to per-invoice COGS deltas:

  gap #1 (closed): Raw Material Store is now replayed too, and the
     SEC-2026-01615 transfer leg into RM-Oils is corrected to use Raw Material
     Store's OWN corrected running rate at the moment it posted, instead of
     being left untouched or flat-substituted.
  gap #2 (closed): WIP consumption -> Manufacture FG incoming_rate is now
     chained using the *actual* formula from work_order_engine.py::
     complete_work_order (fg_unit_rate = max(raw_pool,0)/qty_manufactured,
     raw_pool = total_consumed_cost - total_scrap_value + operating_cost
     - abnormal_loss_value), re-derived with corrected oil consumption cost
     substituted in, everything else on the Stock Entry left as-is. Same
     pattern reused for packing_engine.py's simpler fg_unit_rate formula.
  gap #3 (closed): Landed Cost Voucher value-only SLEs (delta_qty==0,
     stock_value_difference!=0) are replayed in-line in date order, EXCEPT the
     two orphan SLEs (SLE-2026-05191/05192) which are excluded by name --
     that's a separate, unrelated corruption (see ORPHAN_SLES_TO_EXCLUDE) and
     must not be "corrected" here, only removed by whoever owns that
     investigation.

NOT in scope here (unchanged from v1): the 3 never-reviewed HIGH-priority
audit rows (Silical Gel / Starch Maize / PVP K 30), the cash-reconciliation
drift, and actually writing any Journal Entry -- this script is still
read-only. It prints a report and a JE-sizing table; nothing is written to
the site.

Run in bench console:

    from build_uom_correction_plan import run
    run()

CAVEAT on Step 2's fg_unit_rate re-derivation: complete_work_order's
rm_unit_cost_this_run (used only to value ABNORMAL process loss) is itself
total_consumed_cost / total_consumed_qty_this_run -- a second-order
dependency on the corrected oil cost that this script does NOT re-derive,
because abnormal_loss_qty isn't stored on the submitted Stock Entry. Any
Manufacture entry where manufacturing_variance_loss != 0 is flagged inline
for manual review; everywhere else (variance == 0, the common case) the
re-derivation is exact.
"""
import frappe
from frappe.utils import flt

from zoho_books_clone.inventory.utils import compute_bin_valuation

# ---------------------------------------------------------------------------
# Verified correct rates (from the one clean receipt: SEC-2026-02175 / PINV-2026-00121)
CORRECT_RATE = {
    "sesame oil - Nallennai - 15 kg": 252.97625,
    "Coconut Oil Thengai ennai": 269.643125,
}

# Corrupted raw-material receipt/adjustment legs identified this session.
# (voucher, item) -- these SLE legs get their incoming_rate swapped for
# CORRECT_RATE[item] in the replay, wherever they actually posted.
CORRUPTED_RM_LEGS = {
    ("SEC-2026-00143", "sesame oil - Nallennai - 15 kg"),
    ("SEC-2026-00172", "sesame oil - Nallennai - 15 kg"),
    ("SEC-2026-00184", "sesame oil - Nallennai - 15 kg"),
    ("SEC-2026-01641", "sesame oil - Nallennai - 15 kg"),
    ("SEC-2026-02101", "sesame oil - Nallennai - 15 kg"),
    ("SEC-2026-00143", "Coconut Oil Thengai ennai"),
    ("SEC-2026-00172", "Coconut Oil Thengai ennai"),
    ("SEC-2026-00184", "Coconut Oil Thengai ennai"),
    ("SEC-2026-01628", "Coconut Oil Thengai ennai"),
    ("SEC-2026-01644", "Coconut Oil Thengai ennai"),
    ("SEC-2026-01638", "Coconut Oil Thengai ennai"),
}

# gap #1: the transfer that moves already-corrupted Raw Material Store stock
# into RM - Oils. Its incoming_rate must be replaced with Raw Material
# Store's own CORRECTED running rate at the moment it posted -- not a flat
# CORRECT_RATE substitution, since Raw Material Store's rate drifts over time
# as its own corrected receipts/issues are replayed.
CHAINED_TRANSFERS = {
    # (voucher_no, item_code): source_warehouse to pull the corrected rate from
    ("SEC-2026-01615", "sesame oil - Nallennai - 15 kg"): "Raw Material Store",
    ("SEC-2026-01615", "Coconut Oil Thengai ennai"): "Raw Material Store",
}

# gap #3: orphan SLEs referencing the already-cancelled LCV-2026-00022 --
# unrelated corruption, must be excluded from the replay entirely (not
# rate-corrected, not treated as legitimate) rather than "fixed" here.
ORPHAN_SLES_TO_EXCLUDE = {"SLE-2026-05191", "SLE-2026-05192"}

OIL_ITEMS = list(CORRECT_RATE.keys())
RM_WAREHOUSES = ["Raw Material Store", "RM - Oils"]

# Work Orders with confirmed downstream customer exposure (from the earlier
# audit). WO-178 (coconut oil, still In Process) and WO-190 (untouched FG)
# are correctable by re-averaging alone and don't feed any flagged invoice,
# so they're deliberately left out of the invoice-COGS chain below -- but
# included in a quick note at the end so nothing silently drops off the map.
EXPOSED_WORK_ORDERS = ["WO-2026-00034", "WO-2026-00145"]
UNEXPOSED_WORK_ORDERS_TO_NOTE = ["WO-2026-00178", "WO-2026-00190"]

# The Sales Invoices flagged as touching contaminated packed stock, and the
# packed items each one actually sold (used to find the right Material Issue
# leg on each Stock Entry -- a single SEC can carry unrelated line items, see
# SEC-2026-01748's ₹7,000 unrelated line noted last session).
FLAGGED_INVOICE_SECS = {
    "SEC-2026-01748": ["Dhanvantaram tailam 200ml"],
    "SEC-2026-01872": ["Dhanvantaram tailam 200ml"],
    "SEC-2026-02019": ["Dhanvantaram tailam 200ml"],
    "SEC-2026-02022": ["Dhanvantaram tailam 200ml"],
    "SEC-2026-02089": ["Dhanvantaram tailam 200ml"],
    "SEC-2026-02063": ["Dhanvantaram tailam 200ml"],
    "SEC-2026-02085": ["Dhanvantaram tailam 200ml"],
    "SEC-2026-02127": ["Dhanvantaram tailam 200ml"],
    "SEC-2026-02150": ["Dhanvantaram tailam 200ml"],
    "SEC-2026-02088": ["Dhanvantaram tailam 5Litre"],
}
BULK_ITEMS = {
    "Dhanvantaram tailam 200ml": "Dhanvantaram tailam bulk",
    "Dhanvantaram tailam 5Litre": "Dhanvantaram tailam bulk",
}


# ---------------------------------------------------------------------------
# Core replay engine
# ---------------------------------------------------------------------------

def _fetch_sles(item_code, warehouse):
    excl = list(ORPHAN_SLES_TO_EXCLUDE)
    placeholders = ",".join(["%s"] * len(excl)) if excl else "''"
    return frappe.db.sql("""
        SELECT name, voucher_no, voucher_type, posting_date, posting_time, creation,
               actual_qty, incoming_rate, valuation_rate, stock_value_difference
        FROM `tabStock Ledger Entry`
        WHERE item_code = %s AND warehouse = %s AND is_cancelled = 0
          AND name NOT IN ({placeholders})
        ORDER BY posting_date, posting_time, creation
    """.format(placeholders=placeholders), [item_code, warehouse, *excl], as_dict=True)


def replay_warehouse(item_code, warehouse, rate_lookup=None):
    """
    Replay every real SLE for (item_code, warehouse) chronologically, applying:
      - a flat CORRECT_RATE substitution on CORRUPTED_RM_LEGS,
      - a chained rate (pulled from `rate_lookup`, a dict of
        {(item_code, source_warehouse): rate_as_of_fn}) on CHAINED_TRANSFERS,
      - the orphan-SLE exclusion (gap #3), already applied in _fetch_sles.
    Returns (rows, rate_as_of) where rate_as_of(posting_date, posting_time) is
    a closure for chaining into a downstream warehouse/item.
    """
    rate_lookup = rate_lookup or {}
    sles = _fetch_sles(item_code, warehouse)

    qty = value = 0.0
    rows = []
    for s in sles:
        incoming_rate = flt(s.incoming_rate)
        note = ""
        key = (s.voucher_no, item_code)
        if key in CORRUPTED_RM_LEGS:
            incoming_rate = CORRECT_RATE[item_code]
            note = "CORRECTED RECEIPT (flat rate)"
        elif key in CHAINED_TRANSFERS and warehouse != CHAINED_TRANSFERS[key]:
            # only the transfer's INCOMING leg (in the destination warehouse)
            # needs a chained incoming_rate. Its OUTGOING leg, replayed here
            # when `warehouse` IS the source warehouse itself, draws down at
            # the source bin's own existing rate and never touches
            # incoming_rate at all (see compute_bin_valuation), so it must
            # not trip the chain lookup.
            src_wh = CHAINED_TRANSFERS[key]
            src_rate_fn = rate_lookup.get((item_code, src_wh))
            if src_rate_fn is None:
                frappe.throw(
                    f"Chaining error: need corrected {item_code} rate in "
                    f"{src_wh} before replaying {warehouse} -- replay {src_wh} first."
                )
            incoming_rate = src_rate_fn(s.posting_date, s.posting_time, exclude_voucher_no=s.voucher_no)
            note = f"CHAINED from {src_wh}"

        qty, value, rate = compute_bin_valuation(
            old_qty=qty, old_value=value, delta_qty=flt(s.actual_qty),
            incoming_rate=incoming_rate, valuation_rate=flt(s.valuation_rate),
            stock_value_difference=flt(s.stock_value_difference),
        )
        rows.append({
            "sle": s.name, "voucher_no": s.voucher_no, "voucher_type": s.voucher_type,
            "posting_date": s.posting_date, "posting_time": s.posting_time,
            "actual_qty": flt(s.actual_qty),
            "actual_valuation_rate": flt(s.valuation_rate),
            "corrected_running_qty": qty,
            "corrected_running_value": value,
            "corrected_running_rate": rate,
            "note": note,
        })

    def rate_as_of(posting_date, posting_time, exclude_voucher_no=None):
        """Corrected running rate immediately after the last replayed SLE at
        or before (posting_date, posting_time). Used by downstream chaining.

        exclude_voucher_no: when chaining a transfer's own outgoing leg (same
        voucher, same warehouse, same timestamp as the leg we're chaining
        FROM), that leg's own post-effect rate must not be picked up here --
        it reflects the source bin's balance AFTER this transfer already
        drained it (0.0 in this dataset), not the rate the transferred stock
        actually carried. Excluding the voucher gets the rate as of just
        before this transfer's own effect instead."""
        applicable = [r for r in rows if (r["posting_date"], r["posting_time"])
                      <= (posting_date, posting_time)
                      and r["voucher_no"] != exclude_voucher_no]
        return applicable[-1]["corrected_running_rate"] if applicable else 0.0

    return rows, rate_as_of


def step1_replay_rm_warehouses():
    """gap #1: replay Raw Material Store first (its corrected rate feeds the
    SEC-2026-01615 chained transfer), then RM - Oils."""
    print("=" * 100)
    print("STEP 1 -- Corrected RM Store + RM-Oils bin replay (chained)")
    print("=" * 100)

    rate_lookup = {}
    for warehouse in RM_WAREHOUSES:  # Raw Material Store, then RM - Oils, in order
        for item in OIL_ITEMS:
            print(f"\n--- {item} @ {warehouse} ---")
            rows, rate_as_of = replay_warehouse(item, warehouse, rate_lookup)
            rate_lookup[(item, warehouse)] = rate_as_of
            for r in rows:
                flag = f"  <-- {r['note']}" if r["note"] else ""
                print(f"  {r['posting_date']} {r['voucher_no']:<18} qty={r['actual_qty']:>9} "
                      f"actual_rate={r['actual_valuation_rate']:>10} "
                      f"corrected_running_rate={r['corrected_running_rate']:>10}{flag}")
            if rows:
                last = rows[-1]
                print(f"  => CORRECTED current rate: {last['corrected_running_rate']:.4f} "
                      f"(live Bin currently shows the actual/corrupted rate -- compare manually)")
    return rate_lookup


# ---------------------------------------------------------------------------
# Step 2: WIP consumption -> FG incoming_rate (Manufacture entries)
# ---------------------------------------------------------------------------

def _oil_consumption_delta(se, rmoils_rate_as_of):
    """For one Manufacture Stock Entry, sum (corrected - actual) cost across
    its oil-consumption rows only (s_warehouse rows whose item_code is an
    oil item). Every other row (other raw materials, the FG receipt row
    itself) is left untouched."""
    delta = 0.0
    detail = []
    for row in se.items:
        if row.s_warehouse and row.item_code in OIL_ITEMS:
            actual_amount = flt(row.amount)
            corrected_rate = rmoils_rate_as_of[row.item_code](se.posting_date, se.posting_time)
            corrected_amount = round(flt(row.qty_in_stock_uom or row.qty) * corrected_rate, 2)
            delta += corrected_amount - actual_amount
            detail.append((row.item_code, actual_amount, corrected_amount))
    return delta, detail


def _recompute_fg_unit_rate(se, delta_oil_cost):
    """Re-derive fg_unit_rate using the formula from work_order_engine.py::
    complete_work_order, substituting corrected total consumed cost and
    leaving scrap/operating-cost/abnormal-loss as recorded on the entry
    (see module docstring caveat on manufacturing_variance_loss != 0)."""
    fg_rows = [r for r in se.items if r.t_warehouse and not getattr(r, "is_scrap_item", 0)]
    scrap_rows = [r for r in se.items if r.t_warehouse and getattr(r, "is_scrap_item", 0)]
    if not fg_rows:
        return None

    actual_total_consumed_cost = sum(flt(r.amount) for r in se.items if r.s_warehouse)
    corrected_total_consumed_cost = actual_total_consumed_cost + delta_oil_cost

    total_scrap_value = sum(flt(r.amount) for r in scrap_rows)
    operating_cost_absorbed = flt(getattr(se, "operating_cost_absorbed", 0))
    variance = flt(getattr(se, "manufacturing_variance_loss", 0))

    fg_row = fg_rows[0]
    qty_manufactured = flt(fg_row.qty)
    actual_raw_pool = actual_total_consumed_cost - total_scrap_value + operating_cost_absorbed - variance
    corrected_raw_pool = corrected_total_consumed_cost - total_scrap_value + operating_cost_absorbed - variance

    actual_fg_unit_rate = max(actual_raw_pool, 0.0) / qty_manufactured if qty_manufactured else 0.0
    corrected_fg_unit_rate = max(corrected_raw_pool, 0.0) / qty_manufactured if qty_manufactured else 0.0

    return {
        "fg_item": fg_row.item_code, "fg_warehouse": fg_row.t_warehouse,
        "qty_manufactured": qty_manufactured,
        "actual_fg_unit_rate": round(actual_fg_unit_rate, 4),
        "corrected_fg_unit_rate": round(corrected_fg_unit_rate, 4),
        "variance_flag": variance != 0,
    }


def step2_wip_to_fg(rate_lookup):
    print("\n" + "=" * 100)
    print("STEP 2 -- WIP oil consumption -> Manufacture FG incoming_rate (chained)")
    print("=" * 100)

    rmoils_rate_as_of = {item: rate_lookup[(item, "RM - Oils")] for item in OIL_ITEMS}
    fg_corrections = {}  # (fg_item, se_name) -> corrected rate info, for step 3 chaining

    for wo_name in EXPOSED_WORK_ORDERS + UNEXPOSED_WORK_ORDERS_TO_NOTE:
        ses = frappe.get_all(
            "Stock Entry",
            filters={"work_order": wo_name, "stock_entry_type": "Manufacture", "docstatus": 1},
            pluck="name",
        )
        if not ses:
            print(f"\n--- {wo_name}: no submitted Manufacture Stock Entry found "
                  f"(check the work_order fieldname if this is unexpected) ---")
            continue
        print(f"\n--- {wo_name} ---")
        for se_name in ses:
            se = frappe.get_doc("Stock Entry", se_name)
            delta_oil_cost, detail = _oil_consumption_delta(se, rmoils_rate_as_of)
            if not detail:
                continue  # this SE doesn't touch the oils at all
            for item_code, actual_amt, corrected_amt in detail:
                print(f"    {se_name} consumption row {item_code}: "
                      f"actual_amount={actual_amt:.2f} corrected_amount={corrected_amt:.2f}")
            result = _recompute_fg_unit_rate(se, delta_oil_cost)
            if not result:
                print(f"    {se_name}: no FG receipt row found -- skipping (transfer-only entry?)")
                continue
            flag = ("  <-- REVIEW: manufacturing_variance_loss != 0, second-order effect "
                     "not auto-corrected (see module docstring)") if result["variance_flag"] else ""
            print(f"    => {se_name} FG {result['fg_item']} qty={result['qty_manufactured']}: "
                  f"actual_rate={result['actual_fg_unit_rate']} "
                  f"corrected_rate={result['corrected_fg_unit_rate']}{flag}")
            fg_corrections[(result["fg_item"], se_name)] = result

    if UNEXPOSED_WORK_ORDERS_TO_NOTE:
        print(f"\n  (Note: {', '.join(UNEXPOSED_WORK_ORDERS_TO_NOTE)} are printed above for "
              f"completeness but feed no flagged invoice -- WO-178 is still In Process, "
              f"WO-190's FG is untouched. Their corrected rates just tell you what the live "
              f"Bin re-average should land on, same purpose as Step 1.)")
    return fg_corrections


# ---------------------------------------------------------------------------
# Step 3: Bulk FG -> packing -> packed-item incoming_rate
# ---------------------------------------------------------------------------

def _bulk_rate_as_of_factory(fg_corrections, bulk_item):
    """Build a rate_as_of(date, time) closure for a Bulk FG item by replaying
    every warehouse it has stock in chronologically, substituting the
    Step-2-corrected fg_unit_rate on the Manufacture receipt legs identified
    above and leaving every other SLE untouched."""
    overrides = {se_name: r["corrected_fg_unit_rate"]
                 for (fg_item, se_name), r in fg_corrections.items() if fg_item == bulk_item}

    warehouses = [w.warehouse for w in frappe.db.sql("""
        SELECT DISTINCT warehouse FROM `tabStock Ledger Entry`
        WHERE item_code = %s AND is_cancelled = 0
    """, (bulk_item,), as_dict=True)]

    combined_rows = []
    for wh in warehouses:
        qty = value = 0.0
        for s in _fetch_sles(bulk_item, wh):
            incoming_rate = overrides.get(s.voucher_no, flt(s.incoming_rate))
            qty, value, rate = compute_bin_valuation(
                old_qty=qty, old_value=value, delta_qty=flt(s.actual_qty),
                incoming_rate=incoming_rate, valuation_rate=flt(s.valuation_rate),
                stock_value_difference=flt(s.stock_value_difference),
            )
            combined_rows.append((s.posting_date, s.posting_time, rate))
    combined_rows.sort()

    def rate_as_of(posting_date, posting_time, _tl=combined_rows):
        applicable = [r for r in _tl if (r[0], r[1]) <= (posting_date, posting_time)]
        return applicable[-1][2] if applicable else 0.0

    return rate_as_of


def step3_bulk_to_packed(fg_corrections):
    print("\n" + "=" * 100)
    print("STEP 3 -- Bulk FG -> packing Manufacture entries -> packed-item incoming_rate")
    print("=" * 100)

    bulk_items_needed = set(BULK_ITEMS.values())
    bulk_rate_lookup = {b: _bulk_rate_as_of_factory(fg_corrections, b) for b in bulk_items_needed}

    packed_corrections = {}  # packed_item -> {se_name: {"actual_rate", "corrected_rate"}}
    for packed_item, bulk_item in BULK_ITEMS.items():
        print(f"\n--- {packed_item} (packed from {bulk_item}) ---")

        candidate_ses = frappe.get_all(
            "Stock Entry",
            filters={"stock_entry_type": "Manufacture", "docstatus": 1},
            pluck="name",
        )
        relevant = []
        for se_name in candidate_ses:
            se = frappe.get_doc("Stock Entry", se_name)
            has_out = any(r.t_warehouse and r.item_code == packed_item for r in se.items)
            has_in = any(r.s_warehouse and r.item_code == bulk_item for r in se.items)
            if has_out and has_in:
                relevant.append(se)

        for se in relevant:
            bulk_row = next(r for r in se.items if r.s_warehouse and r.item_code == bulk_item)
            actual_bulk_amount = flt(bulk_row.amount)
            corrected_bulk_rate = bulk_rate_lookup[bulk_item](se.posting_date, se.posting_time)
            corrected_bulk_amount = round(flt(bulk_row.qty_in_stock_uom or bulk_row.qty) * corrected_bulk_rate, 2)
            delta = corrected_bulk_amount - actual_bulk_amount

            packed_row = next(r for r in se.items if r.t_warehouse and r.item_code == packed_item)
            qty_packed = flt(packed_row.qty)
            operating_cost = flt(getattr(se, "operating_cost_absorbed", 0))
            actual_total = sum(flt(r.amount) for r in se.items if r.s_warehouse) + operating_cost
            corrected_total = actual_total + delta
            actual_rate = actual_total / qty_packed if qty_packed else 0.0
            corrected_rate = corrected_total / qty_packed if qty_packed else 0.0

            print(f"    {se.name}: bulk consumed actual_amount={actual_bulk_amount:.2f} "
                  f"corrected_amount={corrected_bulk_amount:.2f} (delta {delta:+.2f})")
            print(f"    => {se.name} packed {packed_item} qty={qty_packed}: "
                  f"actual_rate={actual_rate:.4f} corrected_rate={corrected_rate:.4f}")
            packed_corrections.setdefault(packed_item, {})[se.name] = {
                "actual_rate": round(actual_rate, 4), "corrected_rate": round(corrected_rate, 4),
            }

        if not relevant:
            print("    (no packing Manufacture entries found for this pair -- "
                  "check item/warehouse names if this item is expected to have some)")

    return packed_corrections


# ---------------------------------------------------------------------------
# Step 4: packed-item bin replay -> corrected COGS per flagged invoice
# ---------------------------------------------------------------------------

def step4_invoice_cogs_deltas(packed_corrections):
    print("\n" + "=" * 100)
    print("STEP 4 -- Corrected COGS per flagged Sales Invoice (JE sizing)")
    print("=" * 100)

    je_lines = []
    for packed_item, overrides_by_se in packed_corrections.items():
        overrides = {se: v["corrected_rate"] for se, v in overrides_by_se.items()}

        warehouses = [w.warehouse for w in frappe.db.sql("""
            SELECT DISTINCT warehouse FROM `tabStock Ledger Entry`
            WHERE item_code = %s AND is_cancelled = 0
        """, (packed_item,), as_dict=True)]

        rate_timeline = []
        for wh in warehouses:
            qty = value = 0.0
            for s in _fetch_sles(packed_item, wh):
                incoming_rate = overrides.get(s.voucher_no, flt(s.incoming_rate))
                qty, value, rate = compute_bin_valuation(
                    old_qty=qty, old_value=value, delta_qty=flt(s.actual_qty),
                    incoming_rate=incoming_rate, valuation_rate=flt(s.valuation_rate),
                    stock_value_difference=flt(s.stock_value_difference),
                )
                rate_timeline.append((s.posting_date, s.posting_time, rate))
        rate_timeline.sort()

        def corrected_rate_as_of(posting_date, posting_time, _tl=rate_timeline):
            applicable = [r for r in _tl if (r[0], r[1]) <= (posting_date, posting_time)]
            return applicable[-1][2] if applicable else 0.0

        for sec, items_wanted in FLAGGED_INVOICE_SECS.items():
            if packed_item not in items_wanted:
                continue
            se = frappe.get_doc("Stock Entry", sec)
            for row in se.items:
                if row.s_warehouse and row.item_code == packed_item:
                    actual_amount = flt(row.amount)
                    corrected_rate = corrected_rate_as_of(se.posting_date, se.posting_time)
                    corrected_amount = round(flt(row.qty_in_stock_uom or row.qty) * corrected_rate, 2)
                    delta = corrected_amount - actual_amount
                    print(f"  {sec} ({se.reference_name}) {packed_item} qty={row.qty}: "
                          f"actual_COGS={actual_amount:.2f} corrected_COGS={corrected_amount:.2f} "
                          f"delta={delta:+.2f}")
                    je_lines.append({
                        "sec": sec, "sales_invoice": se.reference_name, "item": packed_item,
                        "actual_cogs": actual_amount, "corrected_cogs": corrected_amount,
                        "delta": delta,
                    })

    total_delta = sum(r["delta"] for r in je_lines)
    print("\n  " + "-" * 96)
    print(f"  TOTAL COGS delta across {len(je_lines)} flagged invoice legs: {total_delta:+.2f}")
    if total_delta < 0:
        print(f"  => Actual COGS was OVERSTATED by {abs(total_delta):.2f} in total. "
              f"Offsetting JE per invoice: DR Stock In Hand / CR Cost of Goods Sold.")
    elif total_delta > 0:
        print(f"  => Actual COGS was UNDERSTATED by {total_delta:.2f} in total. "
              f"Offsetting JE per invoice: DR Cost of Goods Sold / CR Stock In Hand.")
    else:
        print("  => No net COGS delta across flagged invoices.")
    print("  (Size each invoice's own Journal Entry off its individual delta above, not the "
          "total -- and remember the SEC-2026-01748-style bundled-GL-row issue: this delta is "
          "already isolated to just the packed-item leg, not the whole SLE's GL debit.)")
    return je_lines


# ---------------------------------------------------------------------------
def run():
    rate_lookup = step1_replay_rm_warehouses()
    fg_corrections = step2_wip_to_fg(rate_lookup)
    packed_corrections = step3_bulk_to_packed(fg_corrections)
    je_lines = step4_invoice_cogs_deltas(packed_corrections)

    print("\n" + "=" * 100)
    print("REMAINING OUT-OF-SCOPE ITEMS (unchanged from last session, not touched here):")
    print("  - 3 never-reviewed HIGH audit rows: Silical Gel 1gm, Starch Maize, PVP K 30")
    print("  - Orphan SLEs SLE-2026-05191/05192 (excluded from this replay, but still LIVE on "
          "the site and inflating RM-Oils right now -- need separate removal, not a rate fix)")
    print("  - Cash reconciliation drift (-79,000.01 constant diff) -- unrelated finding")
    print("  - Prevention guard code (guard_uom_conversion / guard_valuation_deviation) -- "
          "still pending approval, not applied")
    return {"fg_corrections": fg_corrections, "packed_corrections": packed_corrections, "je_lines": je_lines}


if __name__ == "__main__":
    run()