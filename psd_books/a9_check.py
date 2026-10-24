"""A9.3-A9.4 live check: seeds TEST data on an empty site and walks the comparison flow.

Put this file in the app folder (next to a7_seed_and_check.py), then from ~/sava-bench:

    bench --site sava execute psd_books.a9_check.run

It reuses the A7 seed (TEST Company, TEST-001, TEST-CEMENT, 3 TEST suppliers), creates 4 TEST users
(raiser, Purchase Manager, Finance, Director), and for each scenario raises an MRN, sends an RFQ
(email mocked), enters 3 supplier quotations and runs the comparison through the real API functions
as the real users. Each check prints OK or FAILED with the reason. Safe to run again.

Scenarios (item: 100 bags, net total = 100 x L1 rate, plus VAT if the item carries it):
  A  about 580,000  -> 3 levels (Purchase Manager, Finance, Director), approve all three
  B  about 250,000  -> 2 levels (Purchase Manager, Finance), Draft cannot be approved, reject path
  C  about 100,000  -> 1 level (Purchase Manager only)
A and C also create the LPOs (A9.5). Not covered: an RFQ item nobody quoted, and LPOs split over\ntwo suppliers (both need a 2-item MRN).
"""
from unittest import mock

import frappe
from frappe.utils import nowdate

from psd_books import a7_seed_and_check as S

RAISER = "a9-raiser@example.invalid"
PM = "a9-purchase-manager@example.invalid"
FIN = "a9-finance@example.invalid"
DIR = "a9-director@example.invalid"
USERS = {RAISER: ["Books Manager"], PM: ["Purchase Manager"], FIN: ["Finance"], DIR: ["Director"]}

RESULT = {"ok": 0, "failed": 0}


def ok(msg):
    RESULT["ok"] += 1
    print("OK      " + msg)


def fail(msg):
    RESULT["failed"] += 1
    print("FAILED  " + msg)


def check(label, condition, detail=""):
    (ok if condition else fail)(label + ((" -> " + str(detail)) if detail and not condition else ""))


def expect_block(label, fn, *needles):
    try:
        fn()
    except Exception as e:  # noqa: BLE001
        msg = str(e)
        if needles and not any(n.lower() in msg.lower() for n in needles):
            fail("%s blocked, but with an unexpected message: %s" % (label, msg[:160]))
        else:
            ok("%s blocked: %s" % (label, msg[:90]))
        return
    fail("%s was allowed" % label)


def expect_ok(label, fn):
    try:
        res = fn()
    except Exception as e:  # noqa: BLE001
        fail("%s raised: %s" % (label, str(e)[:200]))
        return None
    ok(label)
    return res


# --- setup -----------------------------------------------------------------
def make_users():
    for email, roles in USERS.items():
        if not frappe.db.exists("User", email):
            frappe.get_doc({
                "doctype": "User", "email": email, "first_name": email.split("@")[0], "enabled": 1,
                "user_type": "System User", "send_welcome_email": 0,
            }).insert(ignore_permissions=True)
        member = frappe.db.get_value("Books Company Member", {"user": email}, ["name", "company"], as_dict=True)
        if member and member.company != S.CO:
            frappe.throw("%s already belongs to %s" % (email, member.company))
        if not member:
            frappe.get_doc({"doctype": "Books Company Member", "user": email, "company": S.CO,
				"books_role": "Books Manager"}).insert(ignore_permissions=True)
        user = frappe.get_doc("User", email)
        have = {r.role for r in user.roles}
        missing = [r for r in roles if r not in have]
        for r in missing:
            if not frappe.db.exists("Role", r):
                frappe.throw("Role %s does not exist" % r)
        if missing:
            user.add_roles(*missing)
        frappe.clear_cache(user=email)
    frappe.db.commit()
    ok("4 test users ready (raiser, Purchase Manager, Finance, Director)")


def as_user(user, fn):
    frappe.set_user(user)
    try:
        return fn()
    finally:
        frappe.set_user("Administrator")


def ensure_item_vat():
    """Quotations need a purchase tax template on the item. Use a VAT one (this company's first, else any)."""
    if frappe.db.get_value("Item", S.ITEM, "default_purchase_tax_template"):
        return
    base = {"tax_type": "VAT", "applies_to": ["in", ["Purchase", "Both"]], "disabled": 0}
    tpl = (frappe.db.get_value("Tax Template", {**base, "company": S.CO}, "name")
		or frappe.db.get_value("Tax Template", base, "name"))
    if not tpl:
        frappe.throw("No VAT purchase Tax Template found. Create one (Input VAT 16%) and run again.")
    frappe.db.set_value("Item", S.ITEM, "default_purchase_tax_template", tpl)
    frappe.db.commit()
    ok("TEST-CEMENT uses purchase tax template: " + tpl)


def make_rfq_with_quotes(rates):
    """New approved MRN -> RFQ to 3 suppliers (sent, email mocked) -> 3 Active quotations at `rates`."""
    from psd_books.api import rfq, supplier_quotation as sq

    suppliers = S.seed()
    ensure_item_vat()
    mrn_name = S.approved_mrn()
    pre = rfq.get_rfq_prefill(mrn_name)
    doc = frappe.get_doc({"doctype": "Request for Quotation", **pre,
		"suppliers": [{"supplier": s} for s in suppliers]})
    doc.insert(ignore_permissions=True)
    with mock.patch.object(rfq, "_sender", lambda to, subject, html, company: "mock"):
        res = rfq.send_rfq(doc.name)
    check("RFQ %s sent" % doc.name, res["status"] == "Sent" and not res["failed"], res)
    # Quotations take their company from the user, so enter them as the TEST Company raiser
    # (Administrator would be stamped with the default company, Sava Builders).
    for supplier, rate in zip(suppliers, rates):
        p = as_user(RAISER, lambda: sq.get_quotation_prefill(doc.name, supplier))
        payload = {
            "request_for_quotation": doc.name, "supplier": supplier, "quotation_date": nowdate(),
            "delivery_days": 7, "items": [{"mrn_item": i["mrn_item"], "rate": rate, "discount_percent": 0}
                for i in p["items"]]}
        as_user(RAISER, lambda: sq.enter_quotation(payload))
    frappe.db.commit()
    active = frappe.db.count("Supplier Quotation", {"request_for_quotation": doc.name, "status": "Active"})
    check("3 Active quotations on %s" % doc.name, active == 3, active)
    return doc.name, suppliers


def steps(name):
    d = frappe.get_doc("Quotation Comparison", name)
    return [(s.level, s.role, s.status, s.approver) for s in d.approval_steps]


def status(name):
    return frappe.db.get_value("Quotation Comparison", name, "status")


# --- scenarios -------------------------------------------------------------
def lpo_checks(name):
    """A9.5: LPOs from an Approved comparison."""
    from psd_books.api import quotation_comparison as qc

    cmp_total = float(frappe.db.get_value("Quotation Comparison", name, "grand_total") or 0)
    res = expect_ok("Purchase Manager creates the LPOs", lambda: as_user(PM, lambda: qc.create_lpos(name)))
    if not res:
        return
    check("status LPOs Created", status(name) == "LPOs Created", status(name))
    check("one LPO (one supplier awarded)", len(res["lpos"]) == 1, res["lpos"])
    for l in res["lpos"]:
        po = frappe.get_doc("Purchase Order", l["name"])
        check("%s is a Draft PO for the comparison" % po.name,
            po.docstatus == 0 and po.status == "Draft" and po.quotation_comparison == name,
            (po.docstatus, po.status, po.quotation_comparison))
        rfq_name = frappe.db.get_value("Quotation Comparison", name, "request_for_quotation")
        check("PO ref_rfq, company, project and material request carried",
            po.ref_rfq == rfq_name and po.company == S.CO and po.project == S.PROJECT and po.material_request,
            (po.ref_rfq, po.company, po.project, po.material_request))
        check("PO total matches the comparison total (within 0.05)", abs(float(po.grand_total) - cmp_total) <= 0.05,
            (po.grand_total, cmp_total))
        check("PO has a VAT line and an expected delivery date",
            len(po.taxes) >= 1 and bool(po.expected_delivery_date), (len(po.taxes), po.expected_delivery_date))
    expect_block("creating the LPOs twice", lambda: as_user(PM, lambda: qc.create_lpos(name)), "Nothing left", "Enter the quantity")


def scenario_a():
    print("\n--- A: about 580,000 -> three levels ---")
    from psd_books.api import quotation_comparison as qc

    rfq_name, suppliers = make_rfq_with_quotes([5800, 6000, 6200])

    data = as_user(RAISER, lambda: qc.get_comparison_data(rfq_name))
    check("ranking has 1 line with 3 offers", len(data["ranking"]) == 1 and len(data["ranking"][0]["offers"]) == 3)
    check("nothing unquoted, can_create", not data["unquoted"] and data["can_create"], data)

    summ = expect_ok("raiser creates the comparison (L1 default)",
		lambda: as_user(RAISER, lambda: qc.create_comparison(rfq_name)))
    if not summ:
        return
    name = summ["name"]
    check("status Draft", summ["status"] == "Draft", summ)
    check("grand total above 500,000", float(summ["grand_total"]) > 500000, summ["grand_total"])
    expect_block("second open comparison on the same RFQ",
		lambda: as_user(RAISER, lambda: qc.create_comparison(rfq_name)), "already has an open comparison")

    row = frappe.get_doc("Quotation Comparison", name).items[0]
    other = frappe.db.get_value("Supplier Quotation", {"request_for_quotation": rfq_name, "supplier": suppliers[1],
		"status": "Active"}, "name")
    expect_block("choosing a dearer supplier without a reason", lambda: as_user(RAISER, lambda: qc.save_selection(
        name, {"items": [{"mrn_item": row.mrn_item, "selected_quotation": other, "reason": ""}]})), "reason")
    expect_ok("dearer supplier with a reason saves", lambda: as_user(RAISER, lambda: qc.save_selection(
        name, {"items": [{"mrn_item": row.mrn_item, "selected_quotation": other, "reason": "Faster delivery"}]})))
    l1 = frappe.db.get_value("Supplier Quotation", {"request_for_quotation": rfq_name, "supplier": suppliers[0],
		"status": "Active"}, "name")
    expect_ok("back to L1 saves", lambda: as_user(RAISER, lambda: qc.save_selection(
        name, {"items": [{"mrn_item": row.mrn_item, "selected_quotation": l1, "reason": ""}]})))

    expect_block("approve while Draft", lambda: as_user(PM, lambda: qc.approve_comparison(name)), "pending approval")
    sub = expect_ok("raiser submits for approval", lambda: as_user(RAISER, lambda: qc.submit_for_approval(name)))
    if not sub:
        return
    check("status Pending Approval", status(name) == "Pending Approval", status(name))
    check("3 levels: Purchase Manager, Finance, Director",
		[s[1] for s in steps(name)] == ["Purchase Manager", "Finance", "Director"], steps(name))
    expect_block("raiser approving", lambda: as_user(RAISER, lambda: qc.approve_comparison(name)), "raised")
    expect_block("raiser rejecting", lambda: as_user(RAISER, lambda: qc.reject_comparison(name, "no")), "raised")
    expect_block("Finance approving level 1 (out of order)",
		lambda: as_user(FIN, lambda: qc.approve_comparison(name)), "needs the")
    expect_block("edit while Pending Approval", lambda: as_user(RAISER, lambda: qc.save_selection(
        name, {"items": [{"mrn_item": row.mrn_item, "selected_quotation": l1, "reason": ""}]})), "can't be edited")

    expect_ok("Purchase Manager approves level 1", lambda: as_user(PM, lambda: qc.approve_comparison(name, "ok")))
    check("still Pending Approval after level 1", status(name) == "Pending Approval", status(name))

    # the same person holding two roles may not approve two levels
    pm_doc = frappe.get_doc("User", PM)
    pm_doc.add_roles("Finance")
    frappe.clear_cache(user=PM)
    expect_block("same person approving a second level",
		lambda: as_user(PM, lambda: qc.approve_comparison(name)), "already approved")
    pm_doc.remove_roles("Finance")
    frappe.clear_cache(user=PM)

    expect_ok("Finance approves level 2", lambda: as_user(FIN, lambda: qc.approve_comparison(name)))
    check("still Pending Approval after level 2", status(name) == "Pending Approval", status(name))
    expect_ok("Director approves level 3", lambda: as_user(DIR, lambda: qc.approve_comparison(name, "approved")))
    check("status Approved", status(name) == "Approved", status(name))
    check("all three steps Approved with an approver", all(s[2] == "Approved" and s[3] for s in steps(name)), steps(name))
    expect_block("approve again after Approved", lambda: as_user(DIR, lambda: qc.approve_comparison(name)), "approved")
    expect_block("submit again after Approved", lambda: as_user(RAISER, lambda: qc.submit_for_approval(name)), "Draft")
    lpo_checks(name)
    return name


def scenario_b():
    print("\n--- B: about 250,000 -> two levels, reject ---")
    from psd_books.api import quotation_comparison as qc

    rfq_name, _ = make_rfq_with_quotes([2500, 2600, 2700])
    summ = expect_ok("raiser creates the comparison", lambda: as_user(RAISER, lambda: qc.create_comparison(rfq_name)))
    if not summ:
        return
    name = summ["name"]
    total = float(summ["grand_total"])
    check("grand total between 200,000 and 500,000", 200000 < total <= 500000, total)
    expect_ok("submit", lambda: as_user(RAISER, lambda: qc.submit_for_approval(name)))
    check("2 levels: Purchase Manager, Finance", [s[1] for s in steps(name)] == ["Purchase Manager", "Finance"], steps(name))
    expect_block("reject without a reason", lambda: as_user(PM, lambda: qc.reject_comparison(name, "  ")), "reason")
    expect_ok("Purchase Manager rejects with a reason",
		lambda: as_user(PM, lambda: qc.reject_comparison(name, "Rates not competitive")))
    d = frappe.get_doc("Quotation Comparison", name)
    check("status Rejected with the reason kept", d.status == "Rejected" and d.rejection_reason == "Rates not competitive",
		(d.status, d.rejection_reason))
    check("level 1 step Rejected", steps(name)[0][2] == "Rejected", steps(name))
    expect_block("approve after Rejected", lambda: as_user(FIN, lambda: qc.approve_comparison(name)), "rejected")
    expect_block("LPOs from a Rejected comparison", lambda: as_user(PM, lambda: qc.create_lpos(name)), "Approved comparison")
    # Rejected is not an open status, so the RFQ can be compared again
    expect_ok("new comparison after a Rejected one is allowed", lambda: as_user(RAISER, lambda: qc.create_comparison(rfq_name)))


def scenario_c():
    print("\n--- C: about 100,000 -> one level ---")
    from psd_books.api import quotation_comparison as qc

    rfq_name, _ = make_rfq_with_quotes([1000, 1100, 1200])
    summ = expect_ok("raiser creates the comparison", lambda: as_user(RAISER, lambda: qc.create_comparison(rfq_name)))
    if not summ:
        return
    name = summ["name"]
    check("grand total at or below 200,000", float(summ["grand_total"]) <= 200000, summ["grand_total"])
    expect_ok("submit", lambda: as_user(RAISER, lambda: qc.submit_for_approval(name)))
    check("1 level: Purchase Manager", [s[1] for s in steps(name)] == ["Purchase Manager"], steps(name))
    expect_block("Finance approving a Purchase Manager level",
		lambda: as_user(FIN, lambda: qc.approve_comparison(name)), "needs the")
    expect_ok("Purchase Manager approves", lambda: as_user(PM, lambda: qc.approve_comparison(name)))
    check("status Approved after one level", status(name) == "Approved", status(name))
    lpo_checks(name)


def run():
    frappe.set_user("Administrator")
    make_users()
    for fn in (scenario_a, scenario_b, scenario_c):
        try:
            fn()
        except Exception:  # noqa: BLE001
            import traceback
            fail("%s crashed:\n%s" % (fn.__name__, traceback.format_exc()))
        finally:
            frappe.set_user("Administrator")
            frappe.db.commit()
    print("\nDone: %d OK, %d FAILED" % (RESULT["ok"], RESULT["failed"]))