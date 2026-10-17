# Copyright (c) 2026
# E-Way Bill lifecycle endpoints.
#
# This is a local-only implementation: we don't talk to the NIC portal directly
# (the client's ~500 invoices/month don't meet direct-API eligibility). Instead:
#   1. We validate the invoice against government EWB rules.
#   2. We build the official NIC bulk-upload JSON.
#   3. The E Way Bill record sits as "Ready for Upload" with ewb_no = "" until
#      the client uploads the JSON to the portal and pastes the result back via
#      import_eway_result(), which is the only place ewb_no gets set.
# We never fabricate an EWB number.

import json
import re
import frappe
from frappe import _
from frappe.utils import getdate, today, add_days, flt, date_diff


# ----- helpers -----------------------------------------------------------

def _get_ewb(name: str):
    if not name:
        frappe.throw(_("E-Way Bill name is required"))
    if not frappe.db.exists("E Way Bill", name):
        frappe.throw(_("E-Way Bill {0} not found").format(name))
    return frappe.get_doc("E Way Bill", name)


def _validity_days(distance_km: float, odc: bool = False) -> int:
    """NIC rule: 1 day per 200 km for regular cargo, 1 day per 20 km for ODC."""
    d = max(0, float(distance_km or 0))
    if d <= 0:
        return 1
    step = 20 if odc else 200
    return max(1, int((d + (step - 1)) // step))


def _ui_status(doc) -> str:
    if doc.status == "Cancelled":
        return "Cancelled"
    if doc.status == "Generated" and doc.valid_upto and getdate(doc.valid_upto) < getdate(today()):
        return "Expired"
    if doc.status in ("Generated", "Ready for Upload"):
        return doc.status
    return doc.status or "Draft"


def _invoice_party_gstin(inv) -> tuple[str, str]:
    """Return (from_gstin, to_gstin) for a Sales Invoice."""
    company_gstin = ""
    try:
        company_gstin = frappe.db.get_value("Books Company", inv.company, "gstin") or ""
    except Exception:
        pass
    # Prefer the invoice's own customer_gstin (set at save time by
    # Sales Invoice._set_customer_gstin, already sourced from Customer.tax_id)
    # -- Customer has no "gstin" field, only "tax_id" ("GSTIN / Tax ID"), so
    # querying Customer.gstin directly always raised and was swallowed by a
    # bare except, silently leaving to_gstin blank on every EWB.
    customer_gstin = getattr(inv, "customer_gstin", "") or ""
    if not customer_gstin:
        try:
            customer_gstin = frappe.db.get_value("Customer", inv.customer, "tax_id") or ""
        except Exception:
            pass
    return company_gstin, customer_gstin


GSTIN_RE = re.compile(r"^\d{2}[A-Z]{5}\d{4}[A-Z]\d[Z][A-Z\d]$")


def _is_valid_gstin(gstin: str) -> bool:
    return bool(gstin) and bool(GSTIN_RE.match(gstin.strip().upper()))


def _resolve_item_tax(item_row):
    """Sum CGST/SGST/IGST/Cess amounts for one Sales Invoice Item line
    from its Tax Template, applied on the line's taxable amount."""
    out = {"cgst": 0.0, "sgst": 0.0, "igst": 0.0, "cess": 0.0}
    amount = flt(item_row.amount)
    tax_code = item_row.get("tax_code")
    if not tax_code or not amount:
        return out
    try:
        rows = frappe.get_all(
            "Tax Template Detail",
            filters={"parent": tax_code, "parenttype": "Tax Template"},
            fields=["tax_type", "rate"],
        )
    except Exception:
        return out
    for r in rows:
        rate = flt(r.rate)
        amt = amount * rate / 100.0
        key = (r.tax_type or "").strip().lower()
        if key in out:
            out[key] += amt
    return out


def validate_eway_eligibility(inv, threshold=50000, allow_voluntary=True):
    """Run government-rule checks against a submitted Sales Invoice.

    Returns a list of blocking error strings (empty list = eligible).
    Threshold and 180-day/future-date checks reflect current common EWB rules;
    site-specific state variations (e.g. intra-state threshold overrides) are
    not modeled here and should be reviewed against the latest CBIC/state
    notifications before go-live.
    """
    errors = []

    if not inv.posting_date:
        errors.append(_("Invoice has no document date"))
    else:
        doc_date = getdate(inv.posting_date)
        if doc_date > getdate(today()):
            errors.append(_("Invoice date is in the future — not accepted for E-Way Bill"))
        elif date_diff(today(), doc_date) > 180:
            errors.append(_("Invoice date is more than 180 days old — outside the permitted "
                             "document-date window for E-Way Bill generation"))

    from_g, to_g = _invoice_party_gstin(inv)
    if from_g and not _is_valid_gstin(from_g):
        errors.append(_("Supplier GSTIN {0} does not look like a valid 15-character GSTIN").format(from_g))
    if to_g and not _is_valid_gstin(to_g):
        # Unregistered customers are allowed (URP) — only flag if something was
        # entered but it's malformed, not if it's simply blank.
        errors.append(_("Customer GSTIN {0} does not look like a valid 15-character GSTIN").format(to_g))

    if not (inv.items or []):
        errors.append(_("Invoice has no line items"))
    else:
        missing_hsn = [r.item_code for r in inv.items if not r.get("hsn_code")]
        if missing_hsn:
            errors.append(_("Missing HSN code for item(s): {0}").format(", ".join(missing_hsn)))
        missing_uom = [r.item_code for r in inv.items if not r.get("uom")]
        if missing_uom:
            errors.append(_("Missing UOM for item(s): {0}").format(", ".join(missing_uom)))
        zero_qty = [r.item_code for r in inv.items if not flt(r.get("qty"))]
        if zero_qty:
            errors.append(_("Zero/blank quantity for item(s): {0}").format(", ".join(zero_qty)))

    grand_total = flt(inv.grand_total)
    if grand_total < threshold and not allow_voluntary:
        errors.append(_("Invoice value ₹{0} is below the ₹{1} E-Way Bill threshold")
                       .format(grand_total, threshold))

    return errors


# ----- list / stats ------------------------------------------------------

@frappe.whitelist(allow_guest=False, methods=["GET", "POST"])
def get_eway_bills(status=None, limit=500):
    """List E-Way Bills enriched with effective status (Expired vs Generated)."""
    rows = frappe.get_all(
        "E Way Bill",
        fields=[
            "name", "ewb_no", "invoice_no", "invoice_date", "customer", "customer_name",
            "transporter", "transporter_id", "vehicle_no", "vehicle_type", "supply_type",
            "sub_supply_type", "doc_type", "transaction_type", "transport_mode",
            "from_gstin", "to_gstin", "grand_total", "valid_upto", "status", "creation",
            "extended", "cancellation_reason", "distance_km", "uploaded_on",
        ],
        order_by="creation desc",
        limit_page_length=int(limit or 500),
    )
    out = []
    for r in rows:
        ui = _ui_status(frappe._dict(r))
        if status and status != "all" and status != ui:
            continue
        out.append({**r, "ui_status": ui})
    return out


@frappe.whitelist(allow_guest=False, methods=["GET", "POST"])
def get_eway_stats(company=None):
    """Counters for the page header summary strip."""
    co = company or frappe.db.get_default("company") or ""
    si_filters = {"docstatus": 1, "is_return": 0}
    if co:
        si_filters["company"] = co
    si_count = frappe.db.count("Sales Invoice", si_filters)
    si_total = frappe.db.sql(
        f"""SELECT IFNULL(SUM(grand_total),0) FROM `tabSales Invoice`
            WHERE docstatus=1 AND is_return=0 {('AND company=%s' if co else '')}""",
        (co,) if co else (),
    )[0][0]

    rows = frappe.get_all(
        "E Way Bill",
        fields=["name", "status", "valid_upto"],
        limit_page_length=5000,
    )
    today_d = getdate(today())
    gen = ready = expired = cancelled = expiring_soon = 0
    for r in rows:
        ui = _ui_status(frappe._dict(r))
        if ui == "Cancelled":
            cancelled += 1
        elif ui == "Expired":
            expired += 1
        elif ui == "Ready for Upload":
            ready += 1
        elif ui == "Generated":
            gen += 1
            if r.valid_upto and (getdate(r.valid_upto) - today_d).days <= 1:
                expiring_soon += 1

    pending = max(0, si_count - gen - ready - expired - cancelled)
    return {
        "total_invoices": si_count,
        "total_value": flt(si_total),
        "generated": gen,
        "ready_for_upload": ready,
        "pending": pending,
        "expired": expired,
        "cancelled": cancelled,
        "expiring_soon": expiring_soon,
    }


@frappe.whitelist(allow_guest=False, methods=["GET", "POST"])
def get_pending_invoices(company=None, limit=200):
    """Sales invoices that don't yet have an active/ready E-Way Bill."""
    co = company or frappe.db.get_default("company") or ""
    cond = "WHERE si.docstatus=1 AND si.is_return=0"
    params = []
    if co:
        cond += " AND si.company=%s"
        params.append(co)

    rows = frappe.db.sql(f"""
        SELECT si.name, si.posting_date, si.customer, si.customer_name,
               si.grand_total, si.company
        FROM `tabSales Invoice` si
        LEFT JOIN `tabE Way Bill` ewb
            ON ewb.invoice_no = si.name AND ewb.status IN ('Generated', 'Ready for Upload')
        {cond} AND ewb.name IS NULL
        ORDER BY si.posting_date DESC
        LIMIT {int(limit)}
    """, tuple(params), as_dict=True)
    return rows


# ----- detail ------------------------------------------------------------

@frappe.whitelist(allow_guest=False, methods=["GET", "POST"])
def get_eway_bill(name):
    doc = _get_ewb(name)
    today_d = getdate(today())
    days_left = None
    if doc.valid_upto and doc.status == "Generated":
        days_left = (getdate(doc.valid_upto) - today_d).days

    return {
        "name": doc.name,
        "ewb_no": doc.ewb_no,
        "invoice_no": doc.invoice_no,
        "invoice_date": str(doc.invoice_date) if doc.invoice_date else None,
        "customer": doc.customer,
        "customer_name": doc.customer_name,
        "grand_total": flt(doc.grand_total),
        "transporter": doc.transporter,
        "transporter_id": doc.transporter_id,
        "vehicle_no": doc.vehicle_no,
        "vehicle_type": doc.vehicle_type,
        "transport_mode": doc.transport_mode,
        "transport_doc_no": doc.transport_doc_no,
        "transport_doc_date": str(doc.transport_doc_date) if doc.transport_doc_date else None,
        "distance_km": flt(doc.distance_km),
        "supply_type": doc.supply_type,
        "sub_supply_type": doc.sub_supply_type,
        "doc_type": doc.doc_type,
        "transaction_type": doc.transaction_type,
        "from_gstin": doc.from_gstin,
        "to_gstin": doc.to_gstin,
        "from_pincode": doc.from_pincode,
        "to_pincode": doc.to_pincode,
        "status": doc.status,
        "ui_status": _ui_status(doc),
        "valid_upto": str(doc.valid_upto) if doc.valid_upto else None,
        "days_left": days_left,
        "company": doc.company,
        "creation": str(doc.creation),
        "owner": doc.owner,
        "modified": str(doc.modified),
        "modified_by": doc.modified_by,
        "extended": bool(doc.extended),
        "cancellation_reason": doc.cancellation_reason,
        "taxable_value": flt(doc.taxable_value),
        "cgst_amount": flt(doc.cgst_amount),
        "sgst_amount": flt(doc.sgst_amount),
        "igst_amount": flt(doc.igst_amount),
        "cess_amount": flt(doc.cess_amount),
        "uploaded_on": str(doc.uploaded_on) if doc.uploaded_on else None,
        "nic_ack_no": doc.nic_ack_no,
        "nic_ack_date": str(doc.nic_ack_date) if doc.nic_ack_date else None,
    }


# ----- lifecycle ---------------------------------------------------------

@frappe.whitelist(allow_guest=False, methods=["POST"])
def generate_eway_bill(invoice_no, transporter=None, transporter_id=None, vehicle_no=None,
                      distance_km=0, supply_type="Outward", sub_supply_type="Supply",
                      doc_type="INV", transaction_type="Regular", vehicle_type="Regular",
                      transport_mode="Road", transport_doc_no=None, transport_doc_date=None,
                      from_pincode=None, to_pincode=None, allow_voluntary=1):
    """Validate a Sales Invoice against government E-Way Bill rules and create
    an E Way Bill record in "Ready for Upload" status.

    This does NOT contact NIC and does NOT assign a real EWB number — the
    number only appears once import_eway_result() is called with the actual
    portal response after the client uploads the bulk JSON manually.
    """
    from psd_books.utils.access import require_module
    require_module("taxes", write=True)
    if not invoice_no:
        frappe.throw(_("Invoice is required"))
    if not frappe.db.exists("Sales Invoice", invoice_no):
        frappe.throw(_("Invoice {0} does not exist").format(invoice_no))

    inv_docstatus = frappe.db.get_value("Sales Invoice", invoice_no, "docstatus")
    if inv_docstatus != 1:
        frappe.throw(_("Cannot generate an E-Way Bill against an invoice that isn't submitted"))

    # Block duplicate active/pending EWB against the same invoice
    existing = frappe.db.exists("E Way Bill",
                                {"invoice_no": invoice_no, "status": ("in", ["Generated", "Ready for Upload"])})
    if existing:
        frappe.throw(_("An active or pending E-Way Bill already exists for {0}: {1}")
                     .format(invoice_no, existing))

    if transport_mode == "Road" and not vehicle_no:
        frappe.throw(_("Vehicle number is required for Road transport"))
    if transport_mode in ("Rail", "Air", "Ship") and not transport_doc_no:
        frappe.throw(_("Transport document number is required for {0} mode").format(transport_mode))

    inv = frappe.get_doc("Sales Invoice", invoice_no)

    errors = validate_eway_eligibility(inv, allow_voluntary=bool(int(allow_voluntary or 0)))
    if errors:
        frappe.throw(_("E-Way Bill validation failed:") + "<br>" + "<br>".join(errors))

    from_g, to_g = _invoice_party_gstin(inv)

    # Sum item-level tax breakup
    totals = {"cgst": 0.0, "sgst": 0.0, "igst": 0.0, "cess": 0.0}
    taxable_value = 0.0
    for r in (inv.items or []):
        taxable_value += flt(r.amount)
        line_tax = _resolve_item_tax(r)
        for k in totals:
            totals[k] += line_tax[k]

    # validity calc — ODC = 1 day / 20 km
    days = _validity_days(distance_km, odc=(vehicle_type == "Over Dimensional Cargo"))

    ewb = frappe.get_doc({
        "doctype": "E Way Bill",
        "naming_series": "EWB-.YYYY.-.#####",
        "invoice_no": invoice_no,
        "invoice_date": inv.posting_date,
        "customer": inv.customer,
        "customer_name": inv.customer_name,
        "grand_total": flt(inv.grand_total),
        "transporter": transporter,
        "transporter_id": transporter_id,
        "vehicle_no": (vehicle_no or "").upper().replace(" ", "") or None,
        "vehicle_type": vehicle_type,
        "transport_mode": transport_mode,
        "transport_doc_no": transport_doc_no,
        "transport_doc_date": transport_doc_date,
        "distance_km": flt(distance_km),
        "supply_type": supply_type,
        "sub_supply_type": sub_supply_type,
        "doc_type": doc_type,
        "transaction_type": transaction_type,
        "from_gstin": from_g,
        "to_gstin": to_g,
        "from_pincode": from_pincode,
        "to_pincode": to_pincode,
        "taxable_value": taxable_value,
        "cgst_amount": totals["cgst"],
        "sgst_amount": totals["sgst"],
        "igst_amount": totals["igst"],
        "cess_amount": totals["cess"],
        "ewb_no": "",
        "valid_upto": add_days(today(), days),  # provisional — recalculated on import from actual gen date
        "status": "Ready for Upload",
        "company": inv.company,
    })
    ewb.insert(ignore_permissions=False)
    frappe.db.commit()
    return {
        "ok": True,
        "name": ewb.name,
        "status": "Ready for Upload",
        "days": days,
    }


@frappe.whitelist(allow_guest=False, methods=["POST"])
def import_eway_result(name, ewb_no, valid_upto, ack_no=None, ack_date=None):
    """Import the REAL E-Way Bill number/validity returned by the government
    portal after the client uploads the bulk JSON. This is the only place
    ewb_no is ever set to a non-empty value."""
    from psd_books.utils.access import require_module
    require_module("taxes", write=True)
    doc = _get_ewb(name)
    if doc.status != "Ready for Upload":
        frappe.throw(_("Only an E-Way Bill in 'Ready for Upload' status can have a result imported "
                       "(current status: {0})").format(doc.status))
    if not ewb_no or not str(ewb_no).strip():
        frappe.throw(_("E-Way Bill number is required"))
    if not valid_upto:
        frappe.throw(_("Valid Upto date is required"))

    doc.ewb_no = str(ewb_no).strip()
    doc.valid_upto = getdate(valid_upto)
    doc.uploaded_on = today()
    if ack_no:
        doc.nic_ack_no = ack_no
    if ack_date:
        doc.nic_ack_date = getdate(ack_date)
    doc.status = "Generated"
    doc.save(ignore_permissions=False)
    frappe.db.commit()
    return {"ok": True, "ewb_no": doc.ewb_no, "valid_upto": str(doc.valid_upto)}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def cancel_eway_bill(name, reason=""):
    from psd_books.utils.access import require_module
    require_module("taxes", write=True)
    doc = _get_ewb(name)
    if doc.status == "Cancelled":
        return {"ok": True, "message": "Already cancelled"}
    doc.status = "Cancelled"
    if reason:
        doc.cancellation_reason = reason
    doc.save(ignore_permissions=False)
    frappe.db.commit()
    return {"ok": True, "message": f"{name} cancelled"}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def update_vehicle(name, vehicle_no, transporter=None, transporter_id=None):
    """Part-B style update: change vehicle/transporter on an already-generated
    (real, NIC-issued) E-Way Bill. Not applicable while still Ready for Upload
    — there's no real EWB to amend yet."""
    from psd_books.utils.access import require_module
    require_module("taxes", write=True)
    doc = _get_ewb(name)
    if doc.status != "Generated":
        frappe.throw(_("Cannot update — E-Way Bill is {0}").format(doc.status))
    doc.vehicle_no = (vehicle_no or "").upper().replace(" ", "")
    if transporter is not None:
        doc.transporter = transporter
    if transporter_id is not None:
        doc.transporter_id = transporter_id
    doc.save(ignore_permissions=False)
    frappe.db.commit()
    return {"ok": True, "vehicle_no": doc.vehicle_no, "transporter": doc.transporter}


@frappe.whitelist(allow_guest=False, methods=["POST"])
def extend_validity(name, extra_days=1):
    """Extend the EWB validity by N days (NIC permits one extension per EWB).
    Only meaningful for a real, Generated EWB."""
    from psd_books.utils.access import require_module
    require_module("taxes", write=True)
    doc = _get_ewb(name)
    if doc.status != "Generated":
        frappe.throw(_("Cannot extend — E-Way Bill is {0}").format(doc.status))
    if doc.extended:
        frappe.throw(_("E-Way Bill {0} has already been extended once — NIC rules "
                       "permit only a single extension per EWB").format(name))
    n = max(1, int(extra_days or 1))
    base = getdate(doc.valid_upto) if doc.valid_upto else getdate(today())
    if base < getdate(today()):
        base = getdate(today())
    doc.valid_upto = add_days(base, n)
    doc.extended = 1
    doc.save(ignore_permissions=False)
    frappe.db.commit()
    return {"ok": True, "valid_upto": str(doc.valid_upto)}


# ----- NIC bulk JSON export ------------------------------------------------

@frappe.whitelist(allow_guest=False, methods=["GET", "POST"])
def get_eway_json(name):
    """Return an official NIC bulk-EWB-upload JSON payload (array-of-items
    under a 'bulk_ewb' root) that can be uploaded to the portal as-is.

    Kept as a single-EWB export (one item in the array) for now, since the
    frontend downloads one EWB at a time; the schema itself is the real
    multi-record bulk format so the file the client uploads is a valid bulk
    JSON even with just one entry.
    """
    doc = _get_ewb(name)
    if doc.status == "Generated":
        frappe.msgprint(_("This E-Way Bill already has a real government-issued number — "
                          "re-downloading the JSON is for reference only, it will not "
                          "generate a new EWB."), indicator="blue", alert=True)

    try:
        inv = frappe.get_doc("Sales Invoice", doc.invoice_no) if doc.invoice_no else None
    except Exception:
        inv = None

    items = []
    if inv:
        for r in (inv.items or []):
            items.append({
                "productName": r.item_name or r.item_code,
                "productDesc": r.description or r.item_name or "",
                "hsnCode": r.get("hsn_code") or "",
                "quantity": flt(r.qty),
                "qtyUnit": r.uom or "NOS",
                "taxableAmount": flt(r.amount),
            })

    sub_supply_map = {
        "Supply": "1", "Import": "2", "Export": "3", "Job Work": "4",
        "For Own Use": "5", "Job work Returns": "6", "Sales Return": "7",
        "Others": "8", "SKD/CKD": "9", "Line Sales": "10",
        "Recipient Not Known": "11", "Exhibition or Fairs": "12",
    }
    transaction_type_map = {
        "Regular": 1, "Bill To Ship To": 2,
        "Bill From Dispatch From": 3, "Combination": 4,
    }
    transport_mode_map = {"Road": "1", "Rail": "2", "Air": "3", "Ship": "4"}

    entry = {
        "supplyType": "O" if (doc.supply_type or "Outward") == "Outward" else "I",
        "subSupplyType": sub_supply_map.get(doc.sub_supply_type or "Supply", "1"),
        "docType": doc.doc_type or "INV",
        "docNo": doc.invoice_no or "",
        "docDate": str(doc.invoice_date) if doc.invoice_date else "",
        "fromGstin": doc.from_gstin or "URP",
        "fromTrdName": frappe.db.get_value("Books Company", doc.company, "company_name") or doc.company or "",
        "fromPincode": doc.from_pincode or "",
        "fromStateCode": (doc.from_gstin or "")[:2] or "",
        "toGstin": doc.to_gstin or "URP",
        "toTrdName": doc.customer_name or doc.customer or "",
        "toPincode": doc.to_pincode or "",
        "toStateCode": (doc.to_gstin or "")[:2] or "",
        "transactionType": transaction_type_map.get(doc.transaction_type or "Regular", 1),
        "totalValue": flt(doc.taxable_value or doc.grand_total),
        "cgstValue": flt(doc.cgst_amount),
        "sgstValue": flt(doc.sgst_amount),
        "igstValue": flt(doc.igst_amount),
        "cessValue": flt(doc.cess_amount),
        "totInvValue": flt(doc.grand_total),
        "transDistance": str(int(flt(doc.distance_km))),
        "transMode": transport_mode_map.get(doc.transport_mode or "Road", "1"),
        "transporterId": doc.transporter_id or "",
        "transporterName": doc.transporter or "",
        "transDocNo": doc.transport_doc_no or "",
        "transDocDate": str(doc.transport_doc_date) if doc.transport_doc_date else "",
        "vehicleNo": doc.vehicle_no or "",
        "vehicleType": "O" if doc.vehicle_type == "Over Dimensional Cargo" else "R",
        # ewbNo / validUpto are only ever populated after a real government
        # import — before that they stay blank so this file is honestly
        # "ready to upload", not a fake pre-filled result.
        "ewbNo": doc.ewb_no or "",
        "ewbValidUpto": str(doc.valid_upto) if doc.status == "Generated" and doc.valid_upto else "",
        "itemList": items,
    }

    payload = {"bulk_ewb": [entry]}
    fname = f"EWB-{doc.ewb_no}" if doc.ewb_no else f"EWB-READY-{doc.name}"
    return {"filename": f"{fname}.json",
            "content": json.dumps(payload, indent=2)}