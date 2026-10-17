"""A7 RFQ: seed test data and check the flow on an empty site.

Put this file in your app folder, then run from the bench folder:

    bench --site <yoursite> execute psd_books.a7_seed_and_check.run

Add  --kwargs "{'send_real_email': 1}"  to really send the 3 emails.
Without it, sending is mocked so nothing leaves your machine.

It runs as Administrator, creates a few TEST- records, raises and approves an MRN,
raises an RFQ and sends it. Every step prints OK or FAILED with the reason.
Safe to run again: it reuses what already exists.
"""

import frappe
from frappe.utils import add_days, nowdate

CO = "TEST Company"
PROJECT = "TEST-001"
WH = "TEST Site Store"
ITEM = "TEST-CEMENT"
PROJECT_MANAGER = "a7-project-manager@example.invalid"
EMAILS = [
    "supplier1@example.com",
    "supplier2@example.com",
    "supplier3@example.com",
]  # Change to inboxes you own

TEST_KRA_PINS = [
    "A000000001A",
    "A000000002B",
    "A000000003C",
]

def ok(msg):
    print("OK      " + msg)


def fail(msg):
    print("FAILED  " + msg)


def _get_or_create(doctype, name, **fields):
    if frappe.db.exists(doctype, name):
        return frappe.get_doc(doctype, name)

    doc = frappe.get_doc({"doctype": doctype, **fields})
    doc.insert(ignore_permissions=True)
    return doc


def seed():
    _get_or_create("Books Company", CO, company_name=CO)

    # Project validation requires its manager to be a member
    # of the same Books Company.
    # Use a dedicated test user rather than changing Administrator's membership.
    if not frappe.db.exists("User", PROJECT_MANAGER):
        frappe.get_doc({
            "doctype": "User",
            "email": PROJECT_MANAGER,
            "first_name": "A7 Test Project Manager",
            "enabled": 1,
            "user_type": "System User",
            "send_welcome_email": 0,
        }).insert(ignore_permissions=True)

    member_name = frappe.db.get_value(
        "Books Company Member",
        {"user": PROJECT_MANAGER},
        "name",
    )

    if member_name:
        member = frappe.get_doc(
            "Books Company Member",
            member_name,
        )

        if member.company != CO:
            frappe.throw(
                "A7 test user is already assigned to another "
                "Books Company: " + str(member.company)
            )

        if member.books_role != "Books Manager":
            member.books_role = "Books Manager"
            member.save(ignore_permissions=True)

    else:
        _get_or_create(
            "Books Company Member",
            PROJECT_MANAGER,
            user=PROJECT_MANAGER,
            company=CO,
            books_role="Books Manager",
        )

    if not frappe.db.exists("UOM", "Bag"):
        frappe.get_doc({
            "doctype": "UOM",
            "uom_name": "Bag",
        }).insert(ignore_permissions=True)

    _get_or_create(
        "Warehouse",
        WH,
        warehouse_name=WH,
        company=CO,
    )

    _get_or_create(
        "Project",
        PROJECT,
        project_code=PROJECT,
        project_name="Test Project",
        start_date=nowdate(),
        project_manager=PROJECT_MANAGER,
        company=CO,
    )

    _get_or_create(
        "Item",
        ITEM,
        item_code=ITEM,
        item_name="Test Cement",
        stock_uom="Bag",
    )

    names = []

    for i, mail in enumerate(EMAILS, 1):
        supplier_name = "TEST Supplier %d" % i
        test_pin = TEST_KRA_PINS[i - 1]

        existing = frappe.db.get_value(
            "Supplier",
            {"supplier_name": supplier_name},
            "name",
        )

        if existing:
            supplier = frappe.get_doc("Supplier", existing)

            # Fix test suppliers left without a KRA PIN
            # by an earlier failed seed run.
            if not (supplier.tax_id or "").strip():
                supplier.tax_id = test_pin
                supplier.save(ignore_permissions=True)

            names.append(existing)
            continue

        supplier = frappe.get_doc({
            "doctype": "Supplier",
            "supplier_name": supplier_name,
            "email_id": mail,
            "tax_id": test_pin,
        })

        supplier.insert(ignore_permissions=True)
        names.append(supplier.name)

    frappe.db.commit()

    ok("seeded company, project, warehouse, item and 3 suppliers")
    return names


def approved_mrn():
    from psd_books.api import mrn

    doc = frappe.get_doc({
        "doctype": "Material Request",
        "material_request_type": "Purchase",
        "posting_date": nowdate(),
        "company": CO,
        "project": PROJECT,
        "delivery_warehouse": WH,
        "items": [
            {
                "item_code": ITEM,
                "item_name": "Test Cement",
                "required_qty": 100,
                "uom": "Bag",
                "intended_use": "Slab casting",
            }
        ],
    })

    doc.insert(ignore_permissions=True)

    mrn.send_for_approval(doc.name)
    result = mrn.approve_mrn(doc.name)

    frappe.db.commit()

    ok("MRN %s status: %s" % (doc.name, result["status"]))

    return doc.name


def run(send_real_email=0):
    frappe.set_user("Administrator")

    from unittest import mock
    from psd_books.api import rfq

    suppliers = seed()
    mrn_name = approved_mrn()

    # 1. Prefill from the approved MRN.
    pre = rfq.get_rfq_prefill(mrn_name)

    ok(
        "prefill: %d line(s), project %s"
        % (len(pre["items"]), pre["project"])
    )

    # 2. Sending to only two suppliers must be blocked.
    doc = frappe.get_doc({
        "doctype": "Request for Quotation",
        **pre,
        "suppliers": [
            {"supplier": supplier}
            for supplier in suppliers[:2]
        ],
    })

    doc.insert(ignore_permissions=True)

    try:
        rfq.send_rfq(doc.name)
        fail("2 suppliers were allowed to send")

    except Exception as e:  # noqa: BLE001
        ok("2 suppliers blocked: " + str(e)[:80])

    # 3. Add the third supplier and send to all three.
    doc.reload()
    doc.append("suppliers", {"supplier": suppliers[2]})
    doc.save(ignore_permissions=True)

    sent_log = []

    def fake_sender(to, subject, html, company):
        sent_log.append(to)
        return "mock"

    ctx = (
        mock.patch.object(rfq, "_sender", fake_sender)
        if not send_real_email
        else mock.MagicMock()
    )

    with ctx:
        result = rfq.send_rfq(doc.name)

    ok(
        "send result: status=%s sent=%s failed=%s"
        % (
            result["status"],
            result["sent"],
            result["failed"],
        )
    )

    if not send_real_email:
        ok("mock emails to: %s" % sent_log)

    if result["status"] != "Sent" or result["failed"]:
        fail(
            "expected Sent with no failures. "
            "If real email: check SMTP, see Error Log"
        )

    # 4. A second send must be blocked, and items must be locked.
    try:
        rfq.send_rfq(doc.name)
        fail("second send was allowed")

    except Exception as e:  # noqa: BLE001
        ok("second send blocked: " + str(e)[:80])

    saved_doc = frappe.get_doc(
        "Request for Quotation",
        doc.name,
    )

    saved_doc.items[0].qty = 1

    try:
        saved_doc.save(ignore_permissions=True)
        fail("item change after send was allowed")

    except Exception as e:  # noqa: BLE001
        ok("item lock works: " + str(e)[:80])

    # 5. Cancel the test RFQ.
    print("cancel:", rfq.cancel_rfq(doc.name))

    frappe.db.commit()

    print(
        "\nDone. RFQ:",
        doc.name,
        "- open it in the app to look at the screen.",
    )