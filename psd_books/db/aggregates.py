from __future__ import annotations
"""
High-level aggregate helpers used by the dashboard and reports.
Wraps queries.py into structured summaries.
"""
import frappe
from frappe.utils import flt, add_months, get_first_day, get_last_day, getdate, today
from psd_books.db import queries
from psd_books.api.session import _get_company


@frappe.whitelist()
def get_dashboard_kpis(company: str | None = None) -> dict:
    """
    Return KPI dict for the Books dashboard.
    Called from the desk homepage widget.
    """
    if not company:
        company = _get_company(frappe.session.user)
    if not company:
        return {}

    t = today()
    som = str(get_first_day(t))   # start of month
    eom = str(get_last_day(t))    # end of month

    inv   = queries.get_invoice_summary(company, som, eom)
    pay   = queries.get_payment_summary(company, som, eom)
    pl    = queries.get_profit_and_loss(company, som, eom)
    bals  = queries.get_balance_sheet_totals(company, t)

    # Previous full month — used by the dashboard for "vs last month" deltas.
    pm     = add_months(t, -1)
    psom   = str(get_first_day(pm))
    peom   = str(get_last_day(pm))
    pinv   = queries.get_invoice_summary(company, psom, peom)
    ppay   = queries.get_payment_summary(company, psom, peom)
    ppl    = queries.get_profit_and_loss(company, psom, peom)
    pbals  = queries.get_balance_sheet_totals(company, peom)

    return {
        "month_revenue":      flt(inv.get("total_invoiced")),
        "month_collected":    flt(inv.get("total_collected")),
        "month_outstanding":  flt(inv.get("total_outstanding")),
        "month_payments_in":  flt(pay.get("total_received")),
        "month_payments_out": flt(pay.get("total_paid")),
        "net_profit_mtd":     flt(pl.get("net_profit")),
        "total_assets":       flt(bals.get("total_assets")),
        "total_liabilities":  flt(bals.get("total_liabilities")),
        "overdue_count":      len(queries.get_overdue_invoices(company)),
        # Previous-month comparatives (flow metrics + point-in-time balances).
        "prev_month_revenue":   flt(pinv.get("total_invoiced")),
        "prev_month_collected": flt(pinv.get("total_collected")),
        "prev_month_payments_in":  flt(ppay.get("total_received")),
        "prev_month_payments_out": flt(ppay.get("total_paid")),
        "prev_net_profit_mtd":  flt(ppl.get("net_profit")),
        "prev_total_assets":    flt(pbals.get("total_assets")),
    }


@frappe.whitelist()
def get_monthly_revenue_trend(company: str | None = None, months: int = 6) -> list[dict]:
    """
    Revenue and expense per month for the last N months.
    Returns list of {month, revenue, expense, net}.
    """
    if not company:
        company = _get_company(frappe.session.user)
    months = int(months or 6)

    # Earliest month in the window (first day) so we can 0-fill gaps below.
    t = getdate(today())
    start = get_first_day(add_months(t, -(months - 1)))

    rows = frappe.db.sql("""
        SELECT
            DATE_FORMAT(si.posting_date, '%%Y-%%m') AS month,
            COALESCE(SUM(si.grand_total), 0)         AS revenue
        FROM `tabSales Invoice` si
        WHERE si.company   = %(company)s
          AND si.docstatus  = 1
          AND si.posting_date >= %(start)s
        GROUP BY month
    """, {"company": company, "start": str(start)}, as_dict=True)
    by_month = {r["month"]: flt(r["revenue"]) for r in rows}

    # Return a continuous series for every month in the window (0 where no
    # invoices) so the dashboard trend line is unbroken instead of a lone dot.
    series = []
    for i in range(months - 1, -1, -1):
        key = get_first_day(add_months(t, -i)).strftime("%Y-%m")
        series.append({"month": key, "revenue": by_month.get(key, 0.0)})
    return series


@frappe.whitelist()
def get_aging_buckets(company: str | None = None) -> dict:
    """
    AR aging summary: {current, 1_30, 31_60, 61_90, over_90}
    """
    if not company:
        company = _get_company(frappe.session.user)
    t = today()
    rows = frappe.db.sql("""
        SELECT
            SUM(CASE WHEN DATEDIFF(%(today)s, due_date) <= 0  THEN outstanding_amount ELSE 0 END) AS current_amt,
            SUM(CASE WHEN DATEDIFF(%(today)s, due_date) BETWEEN  1 AND 30 THEN outstanding_amount ELSE 0 END) AS d1_30,
            SUM(CASE WHEN DATEDIFF(%(today)s, due_date) BETWEEN 31 AND 60 THEN outstanding_amount ELSE 0 END) AS d31_60,
            SUM(CASE WHEN DATEDIFF(%(today)s, due_date) BETWEEN 61 AND 90 THEN outstanding_amount ELSE 0 END) AS d61_90,
            SUM(CASE WHEN DATEDIFF(%(today)s, due_date) > 90 THEN outstanding_amount ELSE 0 END)              AS over_90
        FROM `tabSales Invoice`
        WHERE company = %(company)s AND docstatus = 1 AND outstanding_amount > 0
    """, {"company": company, "today": t}, as_dict=True)
    r = rows[0] if rows else {}
    return {
        "current":  flt(r.get("current_amt")),
        "1_30":     flt(r.get("d1_30")),
        "31_60":    flt(r.get("d31_60")),
        "61_90":    flt(r.get("d61_90")),
        "over_90":  flt(r.get("over_90")),
    }
