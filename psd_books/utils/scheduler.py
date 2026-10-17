import frappe
from frappe.utils import today, add_days, getdate, flt


def send_payment_reminders():
    """
    Per-company payment reminders.
    Iterates every active Books Company that has send_payment_reminders enabled
    and uses that company's own reminder_days_before / reminder_days_after values.
    """
    companies = frappe.get_all(
        "Books Company",
        filters={"is_active": 1, "send_payment_reminders": 1},
        fields=["name", "reminder_days_before", "reminder_days_after"],
    )
    for co in companies:
        try:
            _send_reminders_for_company(
                company=co["name"],
                days_before=int(co.get("reminder_days_before") or 3),
                days_after=int(co.get("reminder_days_after") or 7),
            )
        except Exception as e:
            frappe.log_error(str(e), f"Payment reminders failed for company: {co['name']}")


def _send_reminders_for_company(company: str, days_before: int, days_after: int):
    """Send upcoming and overdue reminders for a single company."""
    base_filters = {
        "docstatus": 1,
        "outstanding_amount": [">", 0],
        "company": company,
    }
    fields = ["name", "customer", "customer_name", "grand_total",
              "outstanding_amount", "due_date", "company"]

    sent = set()

    # 1. Upcoming — due in exactly N days
    if days_before > 0:
        remind_date = add_days(today(), days_before)
        upcoming = frappe.get_all(
            "Sales Invoice",
            filters={**base_filters, "due_date": remind_date},
            fields=fields,
        )
        for inv in upcoming:
            _send_reminder(inv, kind="upcoming", sent=sent)

    # 2. Overdue — due exactly N days ago
    if days_after > 0:
        overdue_date = add_days(today(), -days_after)
        overdue = frappe.get_all(
            "Sales Invoice",
            filters={**base_filters, "due_date": overdue_date},
            fields=fields,
        )
        for inv in overdue:
            _send_reminder(inv, kind="overdue", sent=sent)

    # 3. Belt-and-suspenders: anything past due with no reminder sent yet today
    very_overdue = frappe.get_all(
        "Sales Invoice",
        filters={**base_filters, "due_date": ["<", today()]},
        fields=fields,
    )
    for inv in very_overdue:
        _send_reminder(inv, kind="overdue", sent=sent)


def _send_reminder(inv, kind, sent):
    key = (inv["name"], kind)
    if key in sent:
        return
    sent.add(key)

    email = frappe.db.get_value("Customer", inv["customer"], "email_id") or ""
    if not email:
        return

    name    = inv["name"]
    cname   = inv["customer_name"] or inv["customer"]
    amount  = flt(inv["outstanding_amount"])
    due     = inv["due_date"]
    company = inv.get("company") or ""

    if kind == "upcoming":
        subject = f"Upcoming Payment Due \u2013 Invoice {name}"
        body = (
            f"Dear {cname},<br><br>"
            f"This is a friendly reminder that invoice <b>{name}</b> of <b>\u20b9{amount:,.2f}</b> "
            f"is due on <b>{due}</b>.<br>"
            "Please arrange payment before the due date to avoid any late fees.<br><br>"
            f"Regards,<br>{company}"
        )
    else:
        subject = f"Payment Overdue \u2013 Invoice {name}"
        body = (
            f"Dear {cname},<br><br>"
            f"Invoice <b>{name}</b> of <b>\u20b9{amount:,.2f}</b> was due on <b>{due}</b> "
            "and is now overdue.<br>"
            "Please arrange payment at your earliest convenience.<br><br>"
            f"Regards,<br>{company}"
        )

    try:
        from psd_books.utils.email_company import send_business_email
        # Company SMTP when configured, otherwise the platform (wecode) SMTP.
        send_business_email(to=email, subject=subject, html=body, company=company)
    except Exception as e:
        frappe.log_error(str(e), f"Payment reminder failed: {name}")


def generate_monthly_reports():
    """Placeholder: generate and email monthly P&L to admin."""
    pass


def send_reorder_alerts():
    """
    Daily digest: email all System Manager users a list of items that have
    fallen below their reorder level. Skips silently if nothing is below threshold.
    """
    try:
        from psd_books.inventory.utils import get_reorder_alerts
        alerts = get_reorder_alerts()
    except Exception as e:
        frappe.log_error(str(e), "Reorder alert digest failed")
        return

    if not alerts:
        return

    rows_html = ""
    for a in alerts:
        shortage = flt(a.get("shortage_qty", 0))
        rows_html += (
            f"<tr>"
            f"<td style='padding:8px 12px;border-bottom:1px solid #e5e7eb'>{a.get('item_name') or a.get('item_code')}</td>"
            f"<td style='padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280'>{a.get('warehouse','—')}</td>"
            f"<td style='padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;color:{'#dc2626' if flt(a.get('actual_qty',0))<=0 else '#ea580c'};font-weight:600'>{flt(a.get('actual_qty',0)):.2f}</td>"
            f"<td style='padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right'>{flt(a.get('reorder_level',0)):.2f}</td>"
            f"<td style='padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right'>{flt(a.get('reorder_qty',0)):.2f}</td>"
            f"</tr>"
        )

    html = f"""
<div style="font-family:sans-serif;max-width:680px;margin:0 auto">
  <div style="background:#2563eb;padding:20px 24px;border-radius:8px 8px 0 0">
    <h2 style="color:#fff;margin:0;font-size:16px">📦 Daily Reorder Alert — {len(alerts)} item(s) need restocking</h2>
  </div>
  <div style="background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:0">
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead>
        <tr style="background:#f9fafb">
          <th style="padding:10px 12px;text-align:left;color:#374151;font-size:11px;text-transform:uppercase">Item</th>
          <th style="padding:10px 12px;text-align:left;color:#374151;font-size:11px;text-transform:uppercase">Warehouse</th>
          <th style="padding:10px 12px;text-align:right;color:#374151;font-size:11px;text-transform:uppercase">Current Qty</th>
          <th style="padding:10px 12px;text-align:right;color:#374151;font-size:11px;text-transform:uppercase">Reorder Level</th>
          <th style="padding:10px 12px;text-align:right;color:#374151;font-size:11px;text-transform:uppercase">Reorder Qty</th>
        </tr>
      </thead>
      <tbody>{rows_html}</tbody>
    </table>
    <div style="padding:16px 24px;font-size:12px;color:#6b7280">
      Log in to Books to create purchase orders for these items.
    </div>
  </div>
</div>"""

    subject = f"[Books] Reorder Alert — {len(alerts)} item(s) below threshold"

    managers = frappe.get_all(
        "Has Role",
        filters={"role": "System Manager", "parenttype": "User"},
        fields=["parent"],
        distinct=True,
    )
    for m in managers:
        email = frappe.db.get_value("User", m.parent, "email") or ""
        if not email or email == "Administrator":
            continue
        try:
            frappe.sendmail(
                recipients=[email],
                subject=subject,
                message=html,
            )
        except Exception as e:
            frappe.log_error(str(e), f"Reorder digest email failed: {email}")