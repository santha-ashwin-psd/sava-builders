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


# ── Project-focused dashboard (Material Requests, Purchase Orders, GRN, QC, stock) ──

_MR_OPEN = ("Draft", "Pending Approval", "Sent Back", "Approved", "Partly Issued", "Submitted")
_PO_OPEN = ("To Receive", "Partially Received", "Confirmed", "Sent")
_PO_WAITING = ("To Receive", "Partially Received")


def _period_starts(d):
    """Start dates (ISO) of this month, this quarter and this week (Monday)."""
    import datetime as _dt
    d = _dt.date.fromisoformat(str(d))
    q_month = 3 * ((d.month - 1) // 3) + 1
    return {
        "month": d.replace(day=1).isoformat(),
        "quarter": d.replace(month=q_month, day=1).isoformat(),
        "week": (d - _dt.timedelta(days=d.weekday())).isoformat(),
    }


def _weekly_series(rows, key, end, weeks=8, value=None):
    """Bucket rows into `weeks` weekly totals ending with the week of `end` (oldest first).

    `key` is the date field; `value` is a numeric field to sum (default: count rows)."""
    import datetime as _dt
    end = _dt.date.fromisoformat(str(end))
    last_monday = end - _dt.timedelta(days=end.weekday())
    first_monday = last_monday - _dt.timedelta(weeks=weeks - 1)
    out = [0] * weeks
    for r in rows:
        v = r.get(key)
        if not v:
            continue
        day = v.date() if hasattr(v, "date") else _dt.date.fromisoformat(str(v)[:10])
        if day < first_monday or day > end:
            continue
        out[(day - first_monday).days // 7] += flt(r.get(value)) if value else 1
    return out


def _progress_pct(open_n, total_n):
    """Share of a project's MRs and POs (cancelled excluded) that are no longer open, 0-100."""
    total_n = int(total_n or 0)
    if not total_n:
        return 0
    return round((total_n - min(int(open_n or 0), total_n)) / total_n * 100)


def _pct_change(cur, prev):
    """Percent change vs the previous period; None when there is no previous value."""
    prev = flt(prev)
    if not prev:
        return None
    return round((flt(cur) - prev) / prev * 100)


@frappe.whitelist()
def get_projects_dashboard(company: str | None = None) -> dict:
    """Everything the project dashboard shows, in one call (counts and short lists only)."""
    from psd_books.utils.access import _membership

    if not company:
        company = _get_company(frappe.session.user)
    user = frappe.session.user
    is_admin = bool(_membership(user).get("admin"))
    p = {"company": company, "user": user}

    def one(sql, args=None):
        r = frappe.db.sql(sql, args or p, as_dict=True)
        return r[0] if r else {}

    proj = one("""SELECT SUM(status != 'Closed') AS active, SUM(status = 'Closed') AS closed
                  FROM `tabProject` WHERE company = %(company)s""")

    ps = _period_starts(today())
    mr_rows = frappe.db.sql("""
        SELECT status, COUNT(*) AS n,
               SUM(CASE WHEN creation >= %(month)s THEN 1 ELSE 0 END) AS n_month,
               SUM(CASE WHEN creation >= %(quarter)s THEN 1 ELSE 0 END) AS n_quarter
        FROM `tabMaterial Request`
        WHERE company = %(company)s AND docstatus != 2 GROUP BY status
    """, {**p, "month": ps["month"], "quarter": ps["quarter"]}, as_dict=True)
    mr_pipeline = {r["status"]: int(r["n"]) for r in mr_rows}
    mr_pipeline_periods = {
        "month":   {r["status"]: int(r["n_month"] or 0) for r in mr_rows},
        "quarter": {r["status"]: int(r["n_quarter"] or 0) for r in mr_rows},
        "all":     mr_pipeline,
    }

    po = one("""SELECT COUNT(*) AS n, COALESCE(SUM(grand_total), 0) AS total
                FROM `tabPurchase Order`
                WHERE company = %(company)s AND docstatus != 2 AND status IN %(st)s""",
             {**p, "st": _PO_OPEN})

    qc_rows = frappe.db.sql(
        "SELECT status, COUNT(*) AS n FROM `tabQC Inspection` WHERE docstatus != 2 GROUP BY status",
        as_dict=True)
    qc = {r["status"]: int(r["n"]) for r in qc_rows}

    # Pending approvals: a Project Manager (or Books Admin) approves MRs; POs are shown to everyone.
    mr_pending = frappe.db.sql("""
        SELECT 'Material Request' AS doctype, m.name, m.project, m.posting_date AS date,
               m.owner, pr.project_manager,
               NULL AS party, NULL AS amount
        FROM `tabMaterial Request` m
        LEFT JOIN `tabProject` pr ON pr.name = m.project
        WHERE m.company = %(company)s AND m.docstatus = 0 AND m.status = 'Pending Approval'
        ORDER BY m.modified DESC LIMIT 8
    """, p, as_dict=True)
    for r in mr_pending:
        r["for_me"] = bool(is_admin or (r.get("project_manager") == user and r.get("owner") != user))
    po_pending = frappe.db.sql("""
        SELECT 'Purchase Order' AS doctype, name, project, transaction_date AS date,
               supplier_name AS party, grand_total AS amount
        FROM `tabPurchase Order`
        WHERE company = %(company)s AND docstatus != 2 AND status = 'Pending Approval'
        ORDER BY modified DESC LIMIT 8
    """, p, as_dict=True)
    pending = sorted(mr_pending, key=lambda r: not r["for_me"]) + [dict(r, for_me=False) for r in po_pending]

    awaiting = frappe.db.sql("""
        SELECT name, supplier_name, project, transaction_date AS date, expected_delivery_date,
               status, grand_total
        FROM `tabPurchase Order`
        WHERE company = %(company)s AND docstatus != 2 AND status IN %(st)s
        ORDER BY COALESCE(expected_delivery_date, transaction_date) ASC LIMIT 6
    """, {**p, "st": _PO_WAITING}, as_dict=True)

    snapshot = frappe.db.sql("""
        SELECT pr.name, pr.project_code, pr.project_name, pr.status,
          (SELECT COUNT(*) FROM `tabMaterial Request` m
            WHERE m.project = pr.name AND m.docstatus != 2 AND m.status IN %(mr)s) AS open_mrs,
          (SELECT COUNT(*) FROM `tabMaterial Request` m
            WHERE m.project = pr.name AND m.docstatus != 2) AS total_mrs,
          (SELECT COUNT(*) FROM `tabPurchase Order` o
            WHERE o.project = pr.name AND o.docstatus != 2 AND o.status IN %(po)s) AS open_pos,
          (SELECT COUNT(*) FROM `tabPurchase Order` o
            WHERE o.project = pr.name AND o.docstatus != 2) AS total_pos,
          (SELECT COALESCE(SUM(o.grand_total), 0) FROM `tabPurchase Order` o
            WHERE o.project = pr.name AND o.docstatus != 2) AS total_value
        FROM `tabProject` pr
        WHERE pr.company = %(company)s AND pr.status != 'Closed'
        ORDER BY pr.modified DESC LIMIT 8
    """, {**p, "mr": _MR_OPEN, "po": _PO_OPEN}, as_dict=True)
    for r in snapshot:
        r["total_value"] = flt(r.get("total_value"))
        r["progress"] = _progress_pct(
            int(r.get("open_mrs") or 0) + int(r.get("open_pos") or 0),
            int(r.get("total_mrs") or 0) + int(r.get("total_pos") or 0))

    activity = frappe.db.sql("""
        SELECT * FROM (
          SELECT 'Material Request' AS doctype, name, project, posting_date AS date, status,
                 NULL AS party, modified, modified_by
          FROM `tabMaterial Request` WHERE company = %(company)s AND docstatus != 2
          UNION ALL
          SELECT 'Purchase Order', name, project, transaction_date, status, supplier_name, modified, modified_by
          FROM `tabPurchase Order` WHERE company = %(company)s AND docstatus != 2
          UNION ALL
          SELECT 'Purchase Receipt', name, project, posting_date, status, supplier_name, modified, modified_by
          FROM `tabPurchase Receipt` WHERE company = %(company)s AND docstatus != 2
        ) x ORDER BY modified DESC LIMIT 10
    """, p, as_dict=True)

    qc_recent = frappe.db.sql("""
        SELECT name, item, item_name, status, inspection_date
        FROM `tabQC Inspection` WHERE docstatus != 2
        ORDER BY modified DESC LIMIT 4
    """, as_dict=True)

    # Tile extras: "new this month/week", month-on-month material value, 8-week sparklines.
    spark_from = frappe.utils.add_days(today(), -7 * 8)
    new_projects = one("""SELECT COUNT(*) AS n FROM `tabProject`
                          WHERE company = %(company)s AND status != 'Closed' AND creation >= %(d)s""",
                       {**p, "d": ps["month"]})
    new_pos = one("""SELECT COUNT(*) AS n FROM `tabPurchase Order`
                     WHERE company = %(company)s AND docstatus != 2 AND status IN %(st)s
                       AND creation >= %(d)s""", {**p, "st": _PO_OPEN, "d": ps["week"]})
    prev_month_start = frappe.utils.add_months(ps["month"], -1)
    val = one("""SELECT
                   COALESCE(SUM(CASE WHEN transaction_date >= %(m)s THEN grand_total END), 0) AS this_m,
                   COALESCE(SUM(CASE WHEN transaction_date >= %(pm)s AND transaction_date < %(m)s
                                     THEN grand_total END), 0) AS prev_m
                 FROM `tabPurchase Order` WHERE company = %(company)s AND docstatus != 2""",
              {**p, "m": ps["month"], "pm": str(prev_month_start)})
    sp_proj = frappe.db.sql("""SELECT creation FROM `tabProject`
                               WHERE company = %(company)s AND creation >= %(d)s""",
                            {**p, "d": spark_from}, as_dict=True)
    sp_mr = frappe.db.sql("""SELECT creation FROM `tabMaterial Request`
                             WHERE company = %(company)s AND docstatus != 2 AND creation >= %(d)s""",
                          {**p, "d": spark_from}, as_dict=True)
    sp_po = frappe.db.sql("""SELECT creation, transaction_date, grand_total FROM `tabPurchase Order`
                             WHERE company = %(company)s AND docstatus != 2 AND creation >= %(d)s""",
                          {**p, "d": spark_from}, as_dict=True)
    spark = {
        "projects": _weekly_series(sp_proj, "creation", today()),
        "mr":       _weekly_series(sp_mr, "creation", today()),
        "po":       _weekly_series(sp_po, "creation", today()),
        "value":    _weekly_series(sp_po, "transaction_date", today(), value="grand_total"),
    }

    names = {r["name"]: f'{r.get("project_code") or r["name"]} — {r.get("project_name") or ""}'.strip()
             for r in frappe.get_all("Project", filters={"company": company},
                                     fields=["name", "project_code", "project_name"],
                                     ignore_permissions=True, limit=1000)}
    for rows in (pending, awaiting, activity):
        for r in rows:
            r["project_label"] = names.get(r.get("project")) or ""

    return {
        "company": company,
        "active_projects": int(proj.get("active") or 0),
        "closed_projects": int(proj.get("closed") or 0),
        "mr_pending_count": mr_pipeline.get("Pending Approval", 0),
        "mr_pipeline": mr_pipeline,
        "mr_pipeline_periods": mr_pipeline_periods,
        "new_projects_month": int(new_projects.get("n") or 0),
        "new_pos_week": int(new_pos.get("n") or 0),
        "material_value": flt(val.get("this_m")),
        "material_value_change_pct": _pct_change(val.get("this_m"), val.get("prev_m")),
        "spark": spark,
        "qc_recent": qc_recent,
        "open_po_count": int(po.get("n") or 0),
        "open_po_value": flt(po.get("total")),
        "qc": {"pending": qc.get("Pending", 0), "pass": qc.get("Pass", 0), "fail": qc.get("Fail", 0)},
        "pending_approvals": pending,
        "awaiting_delivery": awaiting,
        "project_snapshot": snapshot,
        "recent_activity": activity,
    }