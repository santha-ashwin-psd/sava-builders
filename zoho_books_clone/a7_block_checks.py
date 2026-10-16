"""A7 RFQ: UAT Tests 3, 4 and 5 (blocking rules, partial failure and retry, cancel).

Put this file next to a7_seed_and_check.py in your app folder, then run from the
bench folder:

    bench --site sava execute zoho_books_clone.a7_block_checks.run

Nothing is really emailed: sending is replaced by a fake sender. It uses the same
TEST Company / TEST-001 data as a7_seed_and_check.py and adds a few TEST- records
(two extra suppliers, a second project TEST-002, a few MRNs). Each check prints
OK or FAILED with the reason. Safe to run again.

Not covered here (needs the screen or other users): Test 6 roles, the RFQ screen.
"""

import frappe
from frappe.utils import add_days, nowdate

from zoho_books_clone import a7_seed_and_check as S

PROJECT2 = "TEST-002"
NO_EMAIL_SUPPLIER = "TEST Supplier NoEmail"
DISABLED_SUPPLIER = "TEST Supplier Disabled"

PASSED = []
FAILED = []


def ok(msg):
    PASSED.append(msg)
    print("OK      " + msg)


def fail(msg):
    FAILED.append(msg)
    print("FAILED  " + msg)


def expect_block(label, fn, *needles):
    """fn must raise, and the message must contain one of the needles (any case)."""
    try:
        fn()
    except Exception as e:  # noqa: BLE001
        msg = str(e)
        if not needles or any(n.lower() in msg.lower() for n in needles):
            ok("%s -> blocked: %s" % (label, msg[:90]))
        else:
            fail("%s -> blocked, but for another reason: %s" % (label, msg[:160]))
        return
    fail("%s -> was ALLOWED" % label)


def expect_ok(label, fn):
    try:
        out = fn()
    except Exception as e:  # noqa: BLE001
        fail("%s -> should have worked: %s" % (label, str(e)[:160]))
        return None
    ok(label)
    return out


def check(label, condition, detail=""):
    if condition:
        ok(label)
    else:
        fail(label + (" -> " + detail if detail else ""))


# --- test data -------------------------------------------------------------
def extra_suppliers():
    """A supplier with no email and a disabled one."""
    out = {}
    for name, pin in ((NO_EMAIL_SUPPLIER, "A000000004D"), (DISABLED_SUPPLIER, "A000000005E")):
        existing = frappe.db.get_value("Supplier", {"supplier_name": name}, "name")
        if not existing:
            doc = frappe.get_doc({
                "doctype": "Supplier",
                "supplier_name": name,
                "tax_id": pin,
                "email_id": "disabled-test@example.com" if name == DISABLED_SUPPLIER else "",
            })
            doc.insert(ignore_permissions=True)
            existing = doc.name
        out[name] = existing
    frappe.db.set_value("Supplier", out[NO_EMAIL_SUPPLIER], "email_id", "")
    frappe.db.set_value("Supplier", out[NO_EMAIL_SUPPLIER], "disabled", 0)
    frappe.db.set_value("Supplier", out[DISABLED_SUPPLIER], "disabled", 1)
    frappe.db.commit()
    return out[NO_EMAIL_SUPPLIER], out[DISABLED_SUPPLIER]


def make_mrn(project=None, mrn_type="Purchase", approve=True, qty=100):
    from zoho_books_clone.api import mrn

    doc = frappe.get_doc({
        "doctype": "Material Request",
        "material_request_type": mrn_type,
        "posting_date": nowdate(),
        "company": S.CO,
        "project": project or S.PROJECT,
        "delivery_warehouse": S.WH,
        "items": [{
            "item_code": S.ITEM,
            "item_name": "Test Cement",
            "required_qty": qty,
            "uom": "Bag",
            "intended_use": "Slab casting",
        }],
    })
    doc.insert(ignore_permissions=True)
    if approve:
        mrn.send_for_approval(doc.name)
        mrn.approve_mrn(doc.name)
    frappe.db.commit()
    return doc.name


def new_rfq(mrn_name, supplier_names, insert=True, **changes):
    from zoho_books_clone.api import rfq

    pre = rfq.get_rfq_prefill(mrn_name)
    pre.update(changes)
    doc = frappe.get_doc({
        "doctype": "Request for Quotation",
        **pre,
        "suppliers": [{"supplier": s} for s in supplier_names],
    })
    if insert:
        doc.insert(ignore_permissions=True)
    return doc


# --- the checks ------------------------------------------------------------
def run():
    frappe.set_user("Administrator")

    from unittest import mock
    from zoho_books_clone.api import rfq

    sup = S.seed()  # 3 normal suppliers
    s_noemail, s_disabled = extra_suppliers()

    S._get_or_create(
        "Project", PROJECT2,
        project_code=PROJECT2, project_name="Test Project 2", start_date=nowdate(),
        project_manager=S.PROJECT_MANAGER, company=S.CO,
    )
    frappe.db.set_value("Project", PROJECT2, "status", "Open")
    frappe.db.commit()

    sent_log = []

    def fake_sender(to, subject, html, company):
        sent_log.append(to)
        return "mock"

    good_mrn = make_mrn()
    print("\n-- Test 3: checks that must block --")

    with mock.patch.object(rfq, "_sender", fake_sender):
        # 3.1 only 2 suppliers
        d = new_rfq(good_mrn, sup[:2])
        sent_log.clear()
        expect_block("3.1 send with 2 suppliers", lambda: rfq.send_rfq(d.name), "at least 3")
        check("3.1 no email left the system", not sent_log, str(sent_log))

        # 3.2 a supplier with no email
        d = new_rfq(good_mrn, [sup[0], sup[1], s_noemail])
        sent_log.clear()
        expect_block("3.2 send with a supplier that has no email", lambda: rfq.send_rfq(d.name), "No email address")
        check("3.2 no email sent to anyone", not sent_log, str(sent_log))

    # 3.3 same supplier twice
    expect_block("3.3 same supplier twice",
                 lambda: new_rfq(good_mrn, [sup[0], sup[0], sup[1]]), "more than once")

    # 3.4 disabled supplier
    expect_block("3.4 disabled supplier",
                 lambda: new_rfq(good_mrn, [sup[0], sup[1], s_disabled]), "disabled")

    # 3.5 MRN still Draft
    draft_mrn = make_mrn(approve=False)
    expect_block("3.5 RFQ from a Draft MRN (prefill)", lambda: rfq.get_rfq_prefill(draft_mrn), "not open")
    expect_block("3.5 RFQ from a Draft MRN (save)", lambda: frappe.get_doc({
        "doctype": "Request for Quotation", "material_request": draft_mrn, "company": S.CO,
        "items": [{"mrn_item": "x", "item_code": S.ITEM, "qty": 1}],
        "suppliers": [{"supplier": s} for s in sup],
    }).insert(ignore_permissions=True), "not open")

    # 3.6 Transfer MRN
    try:
        transfer_mrn = make_mrn(mrn_type="Material Transfer")
    except Exception as e:  # noqa: BLE001
        transfer_mrn = None
        fail("3.6 setup: could not create an approved Transfer MRN: " + str(e)[:140])
    if transfer_mrn:
        expect_block("3.6 RFQ from a Transfer MRN", lambda: rfq.get_rfq_prefill(transfer_mrn),
                     "Only Purchase")

    # 3.7 fully issued MRN
    issued_mrn = make_mrn()
    frappe.db.sql(
        "update `tabMaterial Request Item` set issued_qty = required_qty where parent = %s", issued_mrn)
    frappe.db.set_value("Material Request", issued_mrn, "status", "Issued")
    frappe.db.commit()
    expect_block("3.7 RFQ from a fully issued MRN", lambda: rfq.get_rfq_prefill(issued_mrn),
                 "not open", "nothing pending")

    # 3.8 quantity above pending
    def too_many():
        d = new_rfq(good_mrn, sup, insert=False)
        d.items[0].qty = 101
        d.insert(ignore_permissions=True)
    expect_block("3.8 quantity above pending", too_many, "more than the pending")

    # 3.9 Respond By before the RFQ date
    expect_block("3.9 Respond By earlier than RFQ date",
                 lambda: new_rfq(good_mrn, sup, respond_by=add_days(nowdate(), -1)), "earlier")

    # 3.10 closed project
    p2_mrn = make_mrn(project=PROJECT2)
    frappe.db.set_value("Project", PROJECT2, "status", "Closed")
    frappe.db.commit()
    expect_block("3.10 RFQ on a closed project", lambda: new_rfq(p2_mrn, sup), "Closed")
    frappe.db.set_value("Project", PROJECT2, "status", "Open")
    frappe.db.commit()

    # --- Test 4: partial failure and retry ---------------------------------
    print("\n-- Test 4: partial failure and retry --")
    bad_email = frappe.db.get_value("Supplier", sup[1], "email_id")
    fixed_email = "fixed-supplier@example.com"
    log4 = []

    def flaky_sender(to, subject, html, company):
        if to == bad_email:
            raise Exception("550 mailbox unavailable (simulated)")
        log4.append(to)
        return "mock"

    d4 = new_rfq(good_mrn, sup)
    with mock.patch.object(rfq, "_sender", flaky_sender):
        res = rfq.send_rfq(d4.name)
    d4.reload()
    rows = {r.supplier: r for r in d4.suppliers}
    check("4.1 the other two suppliers still got their email", len(res["sent"]) == 2 and len(log4) == 2,
          "sent=%s log=%s" % (res["sent"], log4))
    check("4.1 failed row shows Failed with a reason",
          rows[sup[1]].send_status == "Failed" and bool(rows[sup[1]].send_error),
          "%s / %s" % (rows[sup[1]].send_status, rows[sup[1]].send_error))
    check("4.2 RFQ still Draft (fewer than 3 delivered)", d4.status == "Draft", d4.status)

    rows[sup[1]].email_id = fixed_email
    d4.save(ignore_permissions=True)
    log4.clear()
    with mock.patch.object(rfq, "_sender", flaky_sender):
        res = rfq.send_rfq(d4.name)
    check("4.3 retry emailed only the failed supplier", log4 == [fixed_email], str(log4))
    check("4.3 status becomes Sent", res["status"] == "Sent", res["status"])

    log4.clear()
    with mock.patch.object(rfq, "_sender", flaky_sender):
        expect_block("4.4 send again after all sent", lambda: rfq.send_rfq(d4.name), "already sent")
    check("4.4 nothing emailed", not log4, str(log4))

    # --- Test 5: cancel -----------------------------------------------------
    print("\n-- Test 5: cancel --")
    d5 = new_rfq(good_mrn, sup)
    r = rfq.cancel_rfq(d5.name)
    check("5.1 cancel a Draft RFQ", r["status"] == "Cancelled", str(r))

    r = rfq.cancel_rfq(d4.name)  # d4 is Sent
    check("5.2 cancel a Sent RFQ", r["status"] == "Cancelled", str(r))

    expect_block("5.3 send a cancelled RFQ", lambda: rfq.send_rfq(d4.name), "can't be sent")

    def edit_cancelled():
        d = frappe.get_doc("Request for Quotation", d4.name)
        d.message = "edited"
        d.save(ignore_permissions=True)
    expect_block("5.3 edit a cancelled RFQ", edit_cancelled, "can't be edited")

    new = expect_ok("5.4 raise a new RFQ for the same MRN", lambda: new_rfq(good_mrn, sup))
    if new:
        rfq.cancel_rfq(new.name)

    # leave nothing open behind
    for name in frappe.get_all(
            "Request for Quotation", filters={"company": S.CO, "status": ["!=", "Cancelled"]}, pluck="name"):
        rfq.cancel_rfq(name)
    frappe.db.commit()

    print("\n%d passed, %d failed." % (len(PASSED), len(FAILED)))
    if FAILED:
        print("Failed checks:")
        for f in FAILED:
            print("  - " + f)
    print("Not covered here: Test 6 (roles) and looking at the RFQ screen.")