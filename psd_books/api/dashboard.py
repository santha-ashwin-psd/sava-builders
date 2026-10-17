from __future__ import annotations
import frappe
from frappe.utils import flt, today, get_first_day, get_last_day
from psd_books.db import queries
from psd_books.api.session import _get_company


@frappe.whitelist()
def get_home_dashboard(company: str | None = None) -> dict:
    """All KPI data for the Books dashboard in one API call."""
    if not company:
        company = _get_company(frappe.session.user)

    t   = today()
    som = str(get_first_day(t))
    eom = str(get_last_day(t))

    inv  = queries.get_invoice_summary(company, som, eom)
    pay  = queries.get_payment_summary(company, som, eom)
    pl   = queries.get_profit_and_loss(company, som, eom)
    bals = queries.get_balance_sheet_totals(company, t)

    return {
        "company":            company,
        "period":             {"from": som, "to": eom},
        "month_revenue":      flt(inv.get("total_invoiced")),
        "month_collected":    flt(inv.get("total_collected")),
        "month_outstanding":  flt(inv.get("total_outstanding")),
        "month_payments_in":  flt(pay.get("total_received")),
        "month_payments_out": flt(pay.get("total_paid")),
        "net_profit_mtd":     flt(pl.get("net_profit")),
        "total_assets":       flt(bals.get("total_assets")),
        "total_liabilities":  flt(bals.get("total_liabilities")),
        "overdue_count":      len(queries.get_overdue_invoices(company)),
        "top_customers":      queries.get_top_customers(company, som, eom, limit=5),
        "overdue_invoices":   queries.get_overdue_invoices(company),
        "gst_summary":        queries.get_gst_summary(company, som, eom),
        "aging_buckets":      _get_aging_buckets(company, t),
    }


@frappe.whitelist()
def get_cash_position(company: str | None = None) -> dict:
    if not company:
        company = _get_company(frappe.session.user)
    bank_accounts = frappe.get_all(
        "Bank Account",
        filters={"company": company},
        fields=["name", "account_name", "bank_name", "current_balance", "currency"],
    )
    total = sum(flt(b.current_balance) for b in bank_accounts)
    return {"bank_accounts": bank_accounts, "total_cash": total}


@frappe.whitelist()
def search_transactions(query: str, company: str | None = None) -> list[dict]:
    if not company:
        company = _get_company(frappe.session.user)
    like = f"%{query}%"
    invoices = frappe.db.sql("""
        SELECT 'Sales Invoice' AS doctype, name, customer AS party,
               grand_total AS amount, posting_date AS date, status
        FROM `tabSales Invoice`
        WHERE company = %(company)s AND docstatus != 2
          AND (name LIKE %(q)s OR customer LIKE %(q)s OR customer_name LIKE %(q)s)
        LIMIT 10
    """, {"company": company, "q": like}, as_dict=True)

    payments = frappe.db.sql("""
        SELECT 'Payment Entry' AS doctype, name, party,
               paid_amount AS amount, payment_date AS date, payment_type AS status
        FROM `tabPayment Entry`
        WHERE company = %(company)s AND docstatus != 2
          AND (name LIKE %(q)s OR party LIKE %(q)s)
        LIMIT 10
    """, {"company": company, "q": like}, as_dict=True)

    return sorted(invoices + payments, key=lambda r: str(r.get("date") or ""), reverse=True)


@frappe.whitelist()
def get_recent_activity(company: str | None = None, limit: int = 10) -> list[dict]:
    """Return the N most recent transactions across invoices, bills, and payments."""
    if not company:
        company = _get_company(frappe.session.user)
    rows = frappe.db.sql("""
        SELECT 'Sales Invoice' AS doctype, name, customer_name AS party,
               grand_total AS amount, posting_date AS date,
               CASE WHEN docstatus=0 THEN 'Draft' WHEN outstanding_amount=0 THEN 'Paid'
                    WHEN outstanding_amount<grand_total THEN 'Partial' ELSE 'Unpaid' END AS status
        FROM `tabSales Invoice`
        WHERE company = %(company)s AND docstatus != 2
        UNION ALL
        SELECT 'Purchase Invoice' AS doctype, name, supplier_name AS party,
               grand_total AS amount, posting_date AS date,
               CASE WHEN docstatus=0 THEN 'Draft' WHEN outstanding_amount=0 THEN 'Paid'
                    WHEN outstanding_amount<grand_total THEN 'Partial' ELSE 'Unpaid' END AS status
        FROM `tabPurchase Invoice`
        WHERE company = %(company)s AND docstatus != 2
        UNION ALL
        SELECT 'Payment Entry' AS doctype, name, party,
               paid_amount AS amount, payment_date AS date, payment_type AS status
        FROM `tabPayment Entry`
        WHERE company = %(company)s AND docstatus != 2
        ORDER BY date DESC
        LIMIT %(limit)s
    """, {"company": company, "limit": int(limit)}, as_dict=True)
    return rows


@frappe.whitelist()
def get_ap_aging_buckets(company: str | None = None) -> dict:
    """AP aging summary — bucketed by days overdue."""
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
        FROM `tabPurchase Invoice`
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


def _get_aging_buckets(company: str, as_of: str) -> dict:
    """AR aging summary — bucketed by days overdue."""
    rows = frappe.db.sql("""
        SELECT
            SUM(CASE WHEN DATEDIFF(%(today)s, due_date) <= 0  THEN outstanding_amount ELSE 0 END) AS current_amt,
            SUM(CASE WHEN DATEDIFF(%(today)s, due_date) BETWEEN  1 AND 30 THEN outstanding_amount ELSE 0 END) AS d1_30,
            SUM(CASE WHEN DATEDIFF(%(today)s, due_date) BETWEEN 31 AND 60 THEN outstanding_amount ELSE 0 END) AS d31_60,
            SUM(CASE WHEN DATEDIFF(%(today)s, due_date) BETWEEN 61 AND 90 THEN outstanding_amount ELSE 0 END) AS d61_90,
            SUM(CASE WHEN DATEDIFF(%(today)s, due_date) > 90 THEN outstanding_amount ELSE 0 END)              AS over_90
        FROM `tabSales Invoice`
        WHERE company = %(company)s AND docstatus = 1 AND outstanding_amount > 0
    """, {"company": company, "today": as_of}, as_dict=True)
    r = rows[0] if rows else {}
    return {
        "current":  flt(r.get("current_amt")),
        "1_30":     flt(r.get("d1_30")),
        "31_60":    flt(r.get("d31_60")),
        "61_90":    flt(r.get("d61_90")),
        "over_90":  flt(r.get("over_90")),
    }
