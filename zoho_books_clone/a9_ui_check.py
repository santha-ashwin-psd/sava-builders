"""A9.6 data check: what the comparison screen reads and does, run through the real API as real users.

Put this file in the app folder (next to a9_check.py), then from ~/sava-bench:

    bench --site sava execute zoho_books_clone.a9_ui_check.run

Reuses the a9_check seed and users. Adds one read-only approver (Finance role, Books Viewer membership) to
prove an approver without write access can read the comparison and approve. Creates TEST data only.
Scenario: about 250,000 -> two levels (Purchase Manager, Finance). Safe to run again.
Not covered: browser rendering, LPOs split over two suppliers, an RFQ item nobody quoted.
"""
import frappe

from zoho_books_clone import a7_seed_and_check as S
from zoho_books_clone import a9_check as T

VIEWER_FIN = "a9-viewer-finance@example.invalid"
ok, fail, check, expect_ok, expect_block, as_user = T.ok, T.fail, T.check, T.expect_ok, T.expect_block, T.as_user


def make_viewer_approver():
    if not frappe.db.exists("User", VIEWER_FIN):
        frappe.get_doc({"doctype": "User", "email": VIEWER_FIN, "first_name": "a9-viewer-finance", "enabled": 1,
            "user_type": "System User", "send_welcome_email": 0}).insert(ignore_permissions=True)
    if not frappe.db.exists("Books Company Member", {"user": VIEWER_FIN}):
        frappe.get_doc({"doctype": "Books Company Member", "user": VIEWER_FIN, "company": S.CO,
            "books_role": "Books Viewer"}).insert(ignore_permissions=True)
    user = frappe.get_doc("User", VIEWER_FIN)
    if "Finance" not in {r.role for r in user.roles}:
        user.add_roles("Finance")
    frappe.clear_cache(user=VIEWER_FIN)
    frappe.db.commit()
    ok("read-only approver ready (Finance role, Books Viewer membership)")


def view(rfq_name, user, name=None):
    from zoho_books_clone.api import quotation_comparison as qc
    return as_user(user, lambda: qc.get_comparison_data(rfq_name, name))


def scenario():
    print("\n--- screen data: about 250,000 -> two levels ---")
    from zoho_books_clone.api import quotation_comparison as qc

    rfq_name, suppliers = T.make_rfq_with_quotes([2500, 2700, 2900])

    d = view(rfq_name, T.RAISER)
    check("before any comparison: no comparison block, can_create", d["comparison"] is None and d["can_create"] and not d["comparisons"], d)
    check("every offer carries rank, label, net_rate, amount, tax_amount",
        all({"rank", "label", "net_rate", "amount", "tax_amount", "quotation", "supplier_name"} <= set(o)
            for e in d["ranking"] for o in e["offers"]), d["ranking"])
    check("offers are ordered L1 first", [o["label"] for o in d["ranking"][0]["offers"]] == ["L1", "L2", "L3"],
        [o["label"] for o in d["ranking"][0]["offers"]])

    s = expect_ok("raiser creates the comparison", lambda: as_user(T.RAISER, lambda: qc.create_comparison(rfq_name)))
    if not s:
        return
    name = s["name"]

    d = view(rfq_name, T.RAISER)
    c = d["comparison"]
    check("Draft: editable, no steps, no LPOs", c and c["status"] == "Draft" and c["editable"] and not c["approval_steps"] and not c["lpos"], c)
    check("Draft: one supplier in the award totals, total matches header",
        len(c["supplier_totals"]) == 1 and abs(c["supplier_totals"][0]["grand_total"] - c["grand_total"]) < 0.05, c["supplier_totals"])
    check("Draft: nobody can act yet", not c["action"]["can_act"], c["action"])
    check("Draft: this RFQ is not offered a second comparison", d["open_comparison"] == name and not d["can_create"], d)
    check("history lists the comparison", [h["name"] for h in d["comparisons"]] == [name], d["comparisons"])
    check("saved line keeps the L1 quotation", d["items"][0]["selected_quotation"] == d["ranking"][0]["default_quotation"], d["items"])

    expect_block("send for approval by a user who cannot write (viewer)",
        lambda: as_user(VIEWER_FIN, lambda: qc.submit_for_approval(name)), "read-only")
    expect_ok("raiser sends for approval", lambda: as_user(T.RAISER, lambda: qc.submit_for_approval(name)))

    c = view(rfq_name, T.RAISER)["comparison"]
    check("Pending: two steps, not editable", len(c["approval_steps"]) == 2 and not c["editable"] and c["status"] == "Pending Approval", c)
    check("Pending: raiser sees level 1 and a reason, cannot act",
        c["action"]["level"] == 1 and c["action"]["role"] == "Purchase Manager" and not c["action"]["can_act"] and c["action"]["reason"], c["action"])
    a = view(rfq_name, T.PM)["comparison"]["action"]
    check("Pending: Purchase Manager can act on level 1", a["can_act"] and a["level"] == 1, a)
    a = view(rfq_name, T.FIN)["comparison"]["action"]
    check("Pending: Finance cannot act on level 1, reason names the role",
        not a["can_act"] and "Purchase Manager" in (a["reason"] or ""), a)
    v = expect_ok("read-only approver can read the comparison", lambda: view(rfq_name, VIEWER_FIN, name))
    check("read-only approver sees the steps", v and len(v["comparison"]["approval_steps"]) == 2, v)

    expect_ok("Purchase Manager approves level 1 with remarks",
        lambda: as_user(T.PM, lambda: qc.approve_comparison(name, "Rates checked")))
    c = view(rfq_name, T.PM)["comparison"]
    check("level 1 shows approver and remarks", c["approval_steps"][0]["approver"] == T.PM and c["approval_steps"][0]["remarks"] == "Rates checked", c["approval_steps"][0])
    check("Purchase Manager cannot act on level 2 (already approved, wrong role)", not c["action"]["can_act"] and c["action"]["reason"], c["action"])
    a = view(rfq_name, VIEWER_FIN)["comparison"]["action"]
    check("read-only Finance approver can act on level 2", a["can_act"] and a["level"] == 2, a)

    res = expect_ok("read-only Finance approver approves level 2",
        lambda: as_user(VIEWER_FIN, lambda: qc.approve_comparison(name)))
    check("status Approved", res and res["status"] == "Approved", res)
    c = view(rfq_name, T.PM)["comparison"]
    check("Approved: nobody can act, no LPOs yet", not c["action"]["can_act"] and not c["lpos"] and c["status"] == "Approved", c)

    expect_block("read-only Finance approver creating LPOs (no Purchase Manager role)",
        lambda: as_user(VIEWER_FIN, lambda: qc.create_lpos(name)), "read-only")
    made = expect_ok("Purchase Manager creates the LPOs", lambda: as_user(T.PM, lambda: qc.create_lpos(name)))
    check("create_lpos returns comparison, status and lpos", made and made["status"] == "LPOs Created" and len(made["lpos"]) == 1, made)

    d = view(rfq_name, T.PM, name)
    c = d["comparison"]
    check("LPOs Created: the PO is listed with supplier and total", len(c["lpos"]) == 1 and c["lpos"][0]["supplier_name"] and c["lpos"][0]["grand_total"] > 0, c["lpos"])
    check("LPOs Created: read-only, nobody can act", not c["editable"] and not c["action"]["can_act"], c)
    # Known gap, reported not asserted. Read the RFQ the way the drawer does on a fresh open (no name).
    fresh = view(rfq_name, T.PM)
    print("INFO    fresh open of the RFQ after LPOs Created: open_comparison=%s, can_create=%s (True = a second comparison is offered)"
        % (fresh["open_comparison"], fresh["can_create"]))

    rfq_status = frappe.db.get_value("Request for Quotation", rfq_name, "status")
    print("INFO    RFQ status after LPOs Created: %s" % rfq_status)


def run():
    frappe.set_user("Administrator")
    T.make_users()
    make_viewer_approver()
    try:
        scenario()
    except Exception:  # noqa: BLE001
        import traceback
        fail("scenario crashed:\n%s" % traceback.format_exc())
    finally:
        frappe.set_user("Administrator")
        frappe.db.commit()
    print("\nDone: %d OK, %d FAILED" % (T.RESULT["ok"], T.RESULT["failed"]))