from __future__ import annotations
"""
Central query library for Zoho Books Clone.
All raw SQL lives here — controllers import from this module
instead of writing inline SQL.
"""
import frappe
from frappe.utils import flt, today, getdate, add_days, date_diff


# ── General Ledger ────────────────────────────────────────────────────────────
@frappe.whitelist(allow_guest=False, methods=["GET", "POST"])
def get_gl_entries(
    from_date: str,
    to_date: str,
    company: str,
    account: str | None = None,
    party_type: str | None = None,
    party: str | None = None,
    voucher_no: str | None = None,
) -> list[dict]:
    """Return GL entries for a date range with optional filters."""
    conditions = [
        "is_cancelled = 0",
        "posting_date BETWEEN %(from_date)s AND %(to_date)s",
        "company = %(company)s",
    ]
    params: dict = {"from_date": from_date, "to_date": to_date, "company": company}

    if account:
        conditions.append("account = %(account)s")
        params["account"] = account
    if party_type:
        conditions.append("party_type = %(party_type)s")
        params["party_type"] = party_type
    if party:
        conditions.append("party = %(party)s")
        params["party"] = party
    if voucher_no:
        conditions.append("voucher_no = %(voucher_no)s")
        params["voucher_no"] = voucher_no

    where = " AND ".join(conditions)
    # General Ledger Entry has no posting_time column here (see the
    # doctype's field list) -- ties on posting_date fall back to `creation`
    # (a standard Frappe meta column present on every doctype) to keep a
    # stable chronological order.
    return frappe.db.sql(f"""
        SELECT
            gl.posting_date, gl.account, gl.voucher_type, gl.voucher_no,
            gl.party_type, gl.party, gl.debit, gl.credit, gl.remarks,
            COALESCE(c.customer_name, s.supplier_name) AS party_name
        FROM `tabGeneral Ledger Entry` gl
        LEFT JOIN `tabCustomer` c ON gl.party_type = 'Customer' AND c.name = gl.party
        LEFT JOIN `tabSupplier` s ON gl.party_type = 'Supplier' AND s.name = gl.party
        WHERE {where}
        ORDER BY gl.posting_date, gl.creation
    """, params, as_dict=True)

@frappe.whitelist()
def get_account_balance(account: str, as_of_date: str | None = None) -> float:
    """Closing balance (opening_balance + debit - credit) for an account,
    optionally up to a date. Includes the Account's `opening_balance` field
    so this matches the closing balance shown by get_account_ledger() —
    GL entries alone don't carry the opening balance, it's a static field
    on the Account doc.

    Exception: a Bank Account's opening balance IS posted as a real GL
    Entry (voucher_type='Bank Account', see banking/doctype/bank_account/
    bank_account.py::_post_opening_gl). Adding the static field on top of
    that entry for the same account double-counts the opening balance, so
    skip the static field whenever such an entry already exists.
    """
    params: dict = {"account": account}
    date_cond = ""
    if as_of_date:
        date_cond = "AND posting_date <= %(as_of_date)s"
        params["as_of_date"] = as_of_date

    result = frappe.db.sql(f"""
        SELECT COALESCE(SUM(debit) - SUM(credit), 0) AS balance
        FROM `tabGeneral Ledger Entry`
        WHERE account = %(account)s AND is_cancelled = 0 {date_cond}
    """, params, as_dict=True)
    gl_balance = flt(result[0].balance) if result else 0.0

    has_bank_opening_entry = frappe.db.exists(
        "General Ledger Entry", {"account": account, "voucher_type": "Bank Account"}
    )
    opening = 0.0 if has_bank_opening_entry else flt(
        frappe.db.get_value("Account", account, "opening_balance") or 0
    )
    return opening + gl_balance

@frappe.whitelist()
def get_account_balances_bulk(
    accounts: list[str], as_of_date: str | None = None
) -> dict[str, float]:
    """Return {account_name: closing_balance} for a list of accounts (single
    query). Includes each Account's `opening_balance` field, same as
    get_account_balance(), so results are consistent with the ledger view —
    except accounts whose opening balance was already posted as a real GL
    Entry via a linked Bank Account (see get_account_balance for why).
    """
    # Called from the SPA via GET, where list args travel as a JSON-encoded
    # string (e.g. `?accounts=["A","B"]`) — Frappe doesn't auto-parse those
    # into a Python list, so without this the string's *characters* get
    # counted as the "accounts", producing a broken SQL placeholder count.
    if isinstance(accounts, str):
        accounts = frappe.parse_json(accounts)
    if not accounts:
        return {}
    placeholders = ", ".join(["%s"] * len(accounts))
    date_cond = f"AND posting_date <= '{as_of_date}'" if as_of_date else ""
    rows = frappe.db.sql(f"""
        SELECT account, COALESCE(SUM(debit) - SUM(credit), 0) AS balance
        FROM `tabGeneral Ledger Entry`
        WHERE account IN ({placeholders}) AND is_cancelled = 0 {date_cond}
        GROUP BY account
    """, accounts, as_dict=True)
    gl_balances = {r.account: flt(r.balance) for r in rows}

    bank_opening_accounts = {
        r.account for r in frappe.db.sql(
            f"""SELECT DISTINCT account FROM `tabGeneral Ledger Entry`
                WHERE account IN ({placeholders}) AND voucher_type = 'Bank Account'""",
            accounts, as_dict=True,
        )
    }

    openings = frappe.get_all(
        "Account", filters={"name": ["in", accounts]}, fields=["name", "opening_balance"]
    )
    opening_map = {
        o.name: 0.0 if o.name in bank_opening_accounts else flt(o.opening_balance)
        for o in openings
    }

    return {a: opening_map.get(a, 0.0) + gl_balances.get(a, 0.0) for a in accounts}


# ── Invoices ──────────────────────────────────────────────────────────────────

def get_outstanding_invoices(
    party_type: str,
    party: str,
    company: str | None = None,
) -> list[dict]:
    """Unpaid invoices for a customer or supplier."""
    dt = "Sales Invoice" if party_type == "Customer" else "Purchase Invoice"
    party_field = "customer" if dt == "Sales Invoice" else "supplier"
    filters: dict = {party_field: party, "docstatus": 1, "outstanding_amount": [">", 0]}
    if company:
        filters["company"] = company
    return frappe.get_all(
        dt,
        filters=filters,
        fields=["name", "posting_date", "due_date", "grand_total", "outstanding_amount", "currency"],
        order_by="due_date asc",
    )


def get_invoice_summary(company: str, from_date: str, to_date: str) -> dict:
    """Dashboard KPIs: total invoiced, total collected, outstanding."""
    row = frappe.db.sql("""
        SELECT
            COALESCE(SUM(grand_total),       0) AS total_invoiced,
            COALESCE(SUM(grand_total - outstanding_amount), 0) AS total_collected,
            COALESCE(SUM(outstanding_amount),0) AS total_outstanding
        FROM `tabSales Invoice`
        WHERE company = %(company)s
          AND docstatus = 1
          AND posting_date BETWEEN %(from_date)s AND %(to_date)s
    """, {"company": company, "from_date": from_date, "to_date": to_date}, as_dict=True)
    return row[0] if row else {}


def get_overdue_invoices(company: str) -> list[dict]:
    """All sales invoices past their due date with a balance."""
    return frappe.db.sql("""
        SELECT name, customer, customer_name, due_date,
               outstanding_amount, grand_total, currency
        FROM `tabSales Invoice`
        WHERE company = %(company)s
          AND docstatus = 1
          AND outstanding_amount > 0
          AND due_date < %(today)s
        ORDER BY due_date ASC
    """, {"company": company, "today": today()}, as_dict=True)


def get_top_customers(company: str, from_date: str, to_date: str, limit: int = 10) -> list[dict]:
    """Top customers by revenue in a period."""
    return frappe.db.sql("""
        SELECT customer, customer_name,
               COUNT(*) AS invoice_count,
               SUM(grand_total) AS total_revenue
        FROM `tabSales Invoice`
        WHERE company = %(company)s
          AND docstatus = 1
          AND posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY customer
        ORDER BY total_revenue DESC
        LIMIT %(limit)s
    """, {"company": company, "from_date": from_date, "to_date": to_date, "limit": limit}, as_dict=True)


# ── Payments ──────────────────────────────────────────────────────────────────

def get_payments_for_party(party_type: str, party: str, company: str) -> list[dict]:
    """All submitted payments for a party."""
    return frappe.get_all(
        "Payment Entry",
        filters={"party_type": party_type, "party": party, "company": company, "docstatus": 1},
        fields=["name", "payment_date", "payment_type", "paid_amount", "mode_of_payment"],
        order_by="payment_date desc",
    )


def get_payment_summary(company: str, from_date: str, to_date: str) -> dict:
    """Total received vs paid in a period."""
    row = frappe.db.sql("""
        SELECT
            COALESCE(SUM(CASE WHEN payment_type='Receive' THEN paid_amount ELSE 0 END),0) AS total_received,
            COALESCE(SUM(CASE WHEN payment_type='Pay'     THEN paid_amount ELSE 0 END),0) AS total_paid
        FROM `tabPayment Entry`
        WHERE company = %(company)s
          AND docstatus = 1
          AND payment_date BETWEEN %(from_date)s AND %(to_date)s
    """, {"company": company, "from_date": from_date, "to_date": to_date}, as_dict=True)
    return row[0] if row else {}


# ── Banking ───────────────────────────────────────────────────────────────────

def get_unreconciled_transactions(bank_account: str) -> list[dict]:
    """Bank transactions not yet matched to a payment entry."""
    return frappe.get_all(
        "Bank Transaction",
        filters={"bank_account": bank_account, "status": "Unreconciled", "docstatus": 1},
        fields=["name", "date", "description", "debit", "credit", "balance", "reference_number"],
        order_by="date asc",
    )


def get_bank_balance(bank_account: str) -> float:
    """Latest running balance from bank transactions."""
    result = frappe.db.sql("""
        SELECT balance FROM `tabBank Transaction`
        WHERE bank_account = %s AND docstatus = 1
        ORDER BY date DESC, creation DESC
        LIMIT 1
    """, bank_account, as_dict=True)
    return flt(result[0].balance) if result else 0.0


# ── Reports ───────────────────────────────────────────────────────────────────

@frappe.whitelist()
def get_profit_and_loss(company: str, from_date: str, to_date: str) -> dict:
    """
    Return income, expense (including COGS and stock adjustments), and net profit.

    Account types included:
      Income             → revenue
      Expense            → operating expenses
      Cost of Goods Sold → COGS posted by Stock Entry on Material Issue
      Stock Adjustment   → contra credited when stock is received; offsets the
                           purchase expense so cost hits the P&L once (as COGS)

    Net Profit = Income − (Expense + COGS + Stock Adjustment) — this matches the
    retained-earnings roll-up in get_balance_sheet_totals, so both reports agree.
    """
    rows = frappe.db.sql("""
        SELECT a.account_type,
               COALESCE(SUM(g.credit) - SUM(g.debit), 0) AS amount
        FROM `tabGeneral Ledger Entry` g
        JOIN `tabAccount` a ON a.name = g.account
        WHERE g.company      = %(company)s
          AND g.is_cancelled  = 0
          AND g.posting_date BETWEEN %(from_date)s AND %(to_date)s
          AND a.account_type IN (
                "Income",
                "Expense",
                "Cost of Goods Sold",   -- COGS from inventory GL posting
                "Stock Adjustment"      -- contra for stock receipts
              )
        GROUP BY a.account_type
    """, {"company": company, "from_date": from_date, "to_date": to_date}, as_dict=True)

    totals = {r.account_type: flt(r.amount) for r in rows}
    income  = totals.get("Income", 0.0)
    # Debit-normal accounts: credit-debit gives a negative number → negate it.
    cogs      = -totals.get("Cost of Goods Sold", 0.0)
    expense   = -totals.get("Expense", 0.0)
    # Stock Adjustment usually carries a credit balance (stock received), which
    # comes out negative here — i.e. it reduces total expense.
    stock_adj = -totals.get("Stock Adjustment", 0.0)

    gross_profit = income - cogs
    net_profit   = gross_profit - expense - stock_adj

    return {
        "total_income":     income,
        "cogs":             cogs,
        "gross_profit":     gross_profit,
        "total_expense":    expense,
        "stock_adjustment": stock_adj,
        "net_profit":       net_profit,
    }


@frappe.whitelist()
def get_balance_sheet_totals(company: str, as_of_date: str) -> dict:
    """
    Asset, liability, equity totals as of a date.

    All account types are fetched; classification:
      Debit-normal assets  → Asset, Cash, Bank, Receivable, Stock
      Credit-normal liab.  → Liability, Payable
      Tax                  → net positive = ITC asset; net negative = GST liability
      Equity               → Equity (credit-normal)
    """
    rows = frappe.db.sql("""
        SELECT a.account_type,
               COALESCE(SUM(g.debit) - SUM(g.credit), 0) AS balance
        FROM `tabGeneral Ledger Entry` g
        JOIN `tabAccount` a ON a.name = g.account
        WHERE g.company     = %(company)s
          AND g.is_cancelled = 0
          AND g.posting_date <= %(as_of_date)s
        GROUP BY a.account_type
    """, {"company": company, "as_of_date": as_of_date}, as_dict=True)

    t = {r.account_type: flt(r.balance) for r in rows}

    # Debit-normal: positive balance = asset
    ASSET_TYPES = ("Asset", "Cash", "Bank", "Receivable", "Stock")
    raw_assets = sum(t.get(tp, 0.0) for tp in ASSET_TYPES)

    # Tax accounts: ITC accounts carry debit balance (asset);
    # GST Payable accounts carry credit balance (liability).
    # The net (debit-credit) tells us which side dominates.
    tax_net = t.get("Tax", 0.0)
    itc_asset    = max(tax_net, 0.0)   # positive → ITC on asset side
    gst_liability = abs(min(tax_net, 0.0))  # negative → GST payable

    # Credit-normal: debit-credit is negative for balances owed → negate (not
    # abs) so a net-debit balance (e.g. a supplier advance) reduces liabilities
    # instead of inflating them, keeping Assets = Liabilities + Equity intact.
    # "Stock Received But Not Billed" (GR/IR clearing) is credit-normal too —
    # goods received but not yet billed sit here as a liability until the
    # Purchase Invoice clears it. Without this it would fall through the
    # BS_TYPES catch-all below and get misclassified as a P&L result folded
    # into retained earnings instead of staying a period-end liability.
    payables        = -t.get("Payable", 0.0)
    other_liab      = -t.get("Liability", 0.0)
    grir_liability  = -t.get("Stock Received But Not Billed", 0.0)
    raw_liabilities = payables + other_liab + grir_liability

    inventory_value = t.get("Stock", 0.0)
    cash_and_bank   = t.get("Cash", 0.0) + t.get("Bank", 0.0)
    receivables     = t.get("Receivable", 0.0)
    other_assets    = t.get("Asset", 0.0)

    # Equity = capital accounts + current-period retained earnings.
    # Everything that isn't a balance-sheet-permanent account type is an income
    # statement (P&L) account whose net result belongs in retained earnings.
    # Because the trial balance nets to zero, this makes
    #   total_assets == total_liabilities + total_equity.
    BS_TYPES = {"Asset", "Cash", "Bank", "Receivable", "Stock",
                "Liability", "Payable", "Tax", "Equity",
                "Stock Received But Not Billed"}
    equity_capital    = -flt(t.get("Equity", 0.0))                 # credit-normal → positive
    retained_earnings = -sum(flt(bal) for atype, bal in t.items() if atype not in BS_TYPES)
    total_equity      = equity_capital + retained_earnings

    return {
        "total_assets":      raw_assets + itc_asset,
        "cash_and_bank":     cash_and_bank,
        "receivables":       receivables,
        "inventory_value":   inventory_value,
        "itc_receivable":    itc_asset,
        "other_assets":      other_assets,
        "total_liabilities": raw_liabilities + gst_liability,
        "payables":          payables,
        "gst_liability":     gst_liability,
        "other_liabilities": other_liab,
        "stock_received_not_billed": grir_liability,
        "total_equity":      total_equity,
        "equity_capital":    equity_capital,
        "retained_earnings": retained_earnings,
    }


@frappe.whitelist()
def get_cash_flow(company: str, from_date: str, to_date: str) -> dict:
    """
    Indirect-method cash-flow statement that reconciles to the real movement in
    Cash & Bank: Operating + Investing + Financing = Net change in cash.

    Each activity line is the *negative* of the period movement (debit − credit)
    in its accounts — a rise in an asset uses cash, while profit or a rise in a
    liability/equity provides cash. Because a period's GL nets to zero, the three
    activities always sum to the actual change in cash.

      Operating  = P&L (Income, Expense, COGS, Stock Adjustment, Depreciation…)
                   + working capital (Receivable, Payable, Tax, Stock/Inventory)
      Investing  = fixed & other Asset accounts
      Financing  = Equity & Liability (capital / borrowings)
    """
    rows = frappe.db.sql("""
        SELECT a.account_type,
               COALESCE(SUM(g.debit) - SUM(g.credit), 0) AS net
        FROM `tabGeneral Ledger Entry` g
        JOIN `tabAccount` a ON a.name = g.account
        WHERE g.company      = %(company)s
          AND g.is_cancelled  = 0
          AND g.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY a.account_type
    """, {"company": company, "from_date": from_date, "to_date": to_date}, as_dict=True)

    by_type = {r.account_type: flt(r.net) for r in rows}

    CASH      = {"Cash", "Bank"}
    INVESTING = {"Asset"}
    FINANCING = {"Equity", "Liability"}

    # Source of cash = decrease in a non-cash account (debit−credit negative),
    # hence the leading minus. Everything not cash/investing/financing is
    # operating (P&L + working capital) so nothing is dropped and it reconciles.
    investing = -sum(v for k, v in by_type.items() if k in INVESTING)
    financing = -sum(v for k, v in by_type.items() if k in FINANCING)
    operating = -sum(v for k, v in by_type.items() if k not in (CASH | INVESTING | FINANCING))
    net_change = operating + investing + financing

    opening_cash = flt(frappe.db.sql("""
        SELECT COALESCE(SUM(g.debit) - SUM(g.credit), 0)
        FROM `tabGeneral Ledger Entry` g
        JOIN `tabAccount` a ON a.name = g.account
        WHERE g.company = %(company)s AND IFNULL(g.is_cancelled, 0) = 0
          AND a.account_type IN ('Cash', 'Bank')
          AND g.posting_date < %(from_date)s
    """, {"company": company, "from_date": from_date})[0][0])

    return {
        "operating":    operating,
        "investing":    investing,
        "financing":    financing,
        "net_change":   net_change,
        "opening_cash": opening_cash,
        "closing_cash": opening_cash + net_change,
    }


# ── Tax ───────────────────────────────────────────────────────────────────────

@frappe.whitelist()
def get_gst_summary(company: str, from_date: str, to_date: str) -> list[dict]:
    """GST collected by tax type (CGST, SGST, IGST) for a period."""
    return frappe.db.sql("""
        SELECT
            COALESCE(NULLIF(t.tax_type, ''), t.description) AS tax_type,
            COUNT(DISTINCT t.parent)                         AS invoice_count,
            SUM(t.tax_amount)                                AS total_tax
        FROM `tabTax Line` t
        JOIN `tabSales Invoice` si ON si.name = t.parent AND t.parenttype = 'Sales Invoice'
        WHERE si.company        = %(company)s
          AND si.docstatus      = 1
          AND si.posting_date   BETWEEN %(from_date)s AND %(to_date)s
          AND t.tax_amount      != 0
          AND t.tax_type        IN ('CGST', 'SGST', 'IGST', 'Cess')
        GROUP BY tax_type
        ORDER BY tax_type
    """, {"company": company, "from_date": from_date, "to_date": to_date}, as_dict=True)


@frappe.whitelist()
def get_item_wise_sales(company: str, from_date: str, to_date: str) -> list[dict]:
    """Item-wise sales summary: qty sold, revenue, and avg rate per item for a period."""
    return frappe.db.sql("""
        SELECT
            sii.item_code                    AS item_code,
            sii.item_name                    AS item_name,
            sii.uom                          AS uom,
            COUNT(DISTINCT sii.parent)       AS invoice_count,
            SUM(sii.qty)                     AS qty_sold,
            SUM(sii.amount)                  AS total_amount,
            SUM(sii.discount_amount)         AS total_discount,
            CASE WHEN SUM(sii.qty) != 0
                 THEN SUM(sii.amount) / SUM(sii.qty)
                 ELSE 0 END                  AS avg_rate
        FROM `tabSales Invoice Item` sii
        JOIN `tabSales Invoice` si ON si.name = sii.parent AND sii.parenttype = 'Sales Invoice'
        WHERE si.company      = %(company)s
          AND si.docstatus    = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY sii.item_code, sii.item_name, sii.uom
        ORDER BY total_amount DESC
    """, {"company": company, "from_date": from_date, "to_date": to_date}, as_dict=True)


@frappe.whitelist()
def get_customer_wise_sales(company: str, from_date: str, to_date: str) -> list[dict]:
    """Customer-wise sales summary: invoice count, revenue, discount and outstanding per customer for a period."""
    return frappe.db.sql("""
        SELECT
            si.customer                        AS customer,
            si.customer_name                   AS customer_name,
            COUNT(si.name)                     AS invoice_count,
            SUM(si.net_total)                  AS net_total,
            SUM(si.additional_discount_amount) AS total_discount,
            SUM(si.total_tax)                  AS total_tax,
            SUM(si.grand_total)                AS total_amount,
            SUM(si.outstanding_amount)         AS outstanding_amount,
            CASE WHEN COUNT(si.name) != 0
                 THEN SUM(si.grand_total) / COUNT(si.name)
                 ELSE 0 END                    AS avg_invoice_value
        FROM `tabSales Invoice` si
        WHERE si.company      = %(company)s
          AND si.docstatus    = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY si.customer, si.customer_name
        ORDER BY total_amount DESC
    """, {"company": company, "from_date": from_date, "to_date": to_date}, as_dict=True)


@frappe.whitelist()
def get_invoice_wise_profit(company: str, from_date: str, to_date: str) -> list[dict]:
    """
    Invoice-wise gross profit for a period: revenue vs. estimated cost and
    margin % per Sales Invoice, so profit can be reviewed for a single
    invoice or summed across any set of selected invoices on the client.

    Same cost basis as get_profit_wise_report(): current average valuation
    rate per item (Bin table, sellable warehouses only), falling back to
    the item's standard_buying_rate. Not a historical/FIFO cost at time of
    sale, since Sales Invoice Item does not itself store a cost field.
    """
    wip_warehouses = set(
        frappe.get_all(
            "Work Order",
            filters={"wip_warehouse": ["is", "set"]},
            pluck="wip_warehouse",
        )
    )
    default_wip = frappe.db.get_single_value("Manufacturing Settings", "default_wip_warehouse")
    if default_wip:
        wip_warehouses.add(default_wip)

    wip_cond = ""
    params = {"company": company, "from_date": from_date, "to_date": to_date}
    if wip_warehouses:
        wip_cond = "AND b.warehouse NOT IN %(wip_warehouses)s"
        params["wip_warehouses"] = tuple(wip_warehouses)

    return frappe.db.sql(f"""
        SELECT
            si.name                              AS invoice,
            si.posting_date                      AS posting_date,
            si.customer                          AS customer,
            si.customer_name                     AS customer_name,
            si.status                            AS status,
            si.grand_total                       AS grand_total,
            SUM(sii.amount)                      AS revenue,
            SUM(sii.qty * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0)) AS total_cost,
            SUM(sii.amount) - SUM(sii.qty * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0)) AS profit,
            CASE WHEN SUM(sii.amount) != 0
                 THEN (SUM(sii.amount) - SUM(sii.qty * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0)))
                      / SUM(sii.amount) * 100
                 ELSE 0 END                      AS margin_pct,
            SUM(CASE WHEN ic.avg_valuation_rate IS NULL AND i.standard_buying_rate = 0 THEN 1 ELSE 0 END) AS no_cost_lines
        FROM `tabSales Invoice Item` sii
        JOIN `tabSales Invoice` si ON si.name = sii.parent AND sii.parenttype = 'Sales Invoice'
        JOIN `tabItem` i ON i.name = sii.item_code
        LEFT JOIN (
            SELECT b.item_code,
                   CASE WHEN SUM(b.actual_qty) > 0
                        THEN SUM(b.stock_value) / SUM(b.actual_qty)
                        ELSE 0 END AS avg_valuation_rate
            FROM `tabBin` b
            WHERE 1 = 1 {wip_cond}
            GROUP BY b.item_code
        ) ic ON ic.item_code = sii.item_code
        WHERE si.company      = %(company)s
          AND si.docstatus    = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY si.name, si.posting_date, si.customer, si.customer_name, si.status, si.grand_total
        ORDER BY si.posting_date DESC, si.name DESC
    """, params, as_dict=True)


@frappe.whitelist()
def get_invoice_profit_detail(invoice: str) -> dict:
    """
    Item-level profit/loss breakdown for a single Sales Invoice: every line
    item with qty, rate, revenue, estimated cost and profit, plus an
    invoice-level total. Same cost basis (current avg valuation rate,
    WIP warehouses excluded, standard_buying_rate fallback) as
    get_invoice_wise_profit()/get_profit_wise_report(), so figures line up
    with the summary report.
    """
    si = frappe.db.get_value(
        "Sales Invoice", invoice,
        ["name", "posting_date", "customer", "customer_name", "status", "company", "grand_total"],
        as_dict=True,
    )
    if not si:
        frappe.throw(frappe._("Sales Invoice {0} not found").format(invoice))

    wip_warehouses = set(
        frappe.get_all(
            "Work Order",
            filters={"wip_warehouse": ["is", "set"]},
            pluck="wip_warehouse",
        )
    )
    default_wip = frappe.db.get_single_value("Manufacturing Settings", "default_wip_warehouse")
    if default_wip:
        wip_warehouses.add(default_wip)

    wip_cond = ""
    params = {"invoice": invoice}
    if wip_warehouses:
        wip_cond = "AND b.warehouse NOT IN %(wip_warehouses)s"
        params["wip_warehouses"] = tuple(wip_warehouses)

    items = frappe.db.sql(f"""
        SELECT
            sii.item_code                        AS item_code,
            sii.item_name                        AS item_name,
            sii.uom                              AS uom,
            sii.qty                              AS qty,
            sii.rate                              AS rate,
            sii.amount                           AS revenue,
            COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0) AS cost_rate,
            sii.qty * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0) AS total_cost,
            sii.amount - sii.qty * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0) AS profit,
            CASE WHEN sii.amount != 0
                 THEN (sii.amount - sii.qty * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0))
                      / sii.amount * 100
                 ELSE 0 END                      AS margin_pct
        FROM `tabSales Invoice Item` sii
        JOIN `tabItem` i ON i.name = sii.item_code
        LEFT JOIN (
            SELECT b.item_code,
                   CASE WHEN SUM(b.actual_qty) > 0
                        THEN SUM(b.stock_value) / SUM(b.actual_qty)
                        ELSE 0 END AS avg_valuation_rate
            FROM `tabBin` b
            WHERE 1 = 1 {wip_cond}
            GROUP BY b.item_code
        ) ic ON ic.item_code = sii.item_code
        WHERE sii.parent = %(invoice)s AND sii.parenttype = 'Sales Invoice'
        ORDER BY sii.idx
    """, params, as_dict=True)

    revenue    = sum(flt(r.revenue) for r in items)
    total_cost = sum(flt(r.total_cost) for r in items)
    profit     = revenue - total_cost

    return {
        "invoice": si,
        "items": items,
        "totals": {
            "revenue": revenue,
            "total_cost": total_cost,
            "profit": profit,
            "margin_pct": (profit / revenue * 100) if revenue else 0,
            "no_cost_lines": sum(1 for r in items if not r.cost_rate),
        },
    }


@frappe.whitelist()
def get_profit_wise_report(company: str, from_date: str, to_date: str) -> list[dict]:
    """
    Item-wise gross profit for a period: revenue vs. estimated cost and margin %.

    Cost basis: current average valuation rate per item, computed from the
    `Bin` table (SUM(stock_value) / SUM(actual_qty) across sellable
    warehouses), falling back to the item's `standard_buying_rate` when
    there's no stock/Bin data (e.g. service items or items with no remaining
    stock history). This is a current-cost estimate rather than a
    historical/FIFO cost at the time of each sale, since Sales Invoice Item
    does not itself store a cost field.

    WIP warehouses are deliberately excluded from the average: they hold
    in-process stock (raw materials staged for manufacture, partially
    finished goods) rather than sellable inventory, and blending their
    valuation in skews the cost of goods that were actually sold.
    """
    wip_warehouses = set(
        frappe.get_all(
            "Work Order",
            filters={"wip_warehouse": ["is", "set"]},
            pluck="wip_warehouse",
        )
    )
    default_wip = frappe.db.get_single_value("Manufacturing Settings", "default_wip_warehouse")
    if default_wip:
        wip_warehouses.add(default_wip)

    wip_cond = ""
    params = {"company": company, "from_date": from_date, "to_date": to_date}
    if wip_warehouses:
        wip_cond = "AND b.warehouse NOT IN %(wip_warehouses)s"
        params["wip_warehouses"] = tuple(wip_warehouses)

    return frappe.db.sql(f"""
        SELECT
            sii.item_code                        AS item_code,
            sii.item_name                        AS item_name,
            sii.uom                              AS uom,
            COUNT(DISTINCT sii.parent)           AS invoice_count,
            SUM(sii.qty)                         AS qty_sold,
            SUM(sii.amount)                      AS revenue,
            COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0) AS cost_rate,
            SUM(sii.qty) * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0) AS total_cost,
            SUM(sii.amount) - SUM(sii.qty) * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0) AS profit,
            CASE WHEN SUM(sii.amount) != 0
                 THEN (SUM(sii.amount) - SUM(sii.qty) * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0))
                      / SUM(sii.amount) * 100
                 ELSE 0 END                      AS margin_pct
        FROM `tabSales Invoice Item` sii
        JOIN `tabSales Invoice` si ON si.name = sii.parent AND sii.parenttype = 'Sales Invoice'
        JOIN `tabItem` i ON i.name = sii.item_code
        LEFT JOIN (
            SELECT b.item_code,
                   CASE WHEN SUM(b.actual_qty) > 0
                        THEN SUM(b.stock_value) / SUM(b.actual_qty)
                        ELSE 0 END AS avg_valuation_rate
            FROM `tabBin` b
            WHERE 1 = 1 {wip_cond}
            GROUP BY b.item_code
        ) ic ON ic.item_code = sii.item_code
        WHERE si.company      = %(company)s
          AND si.docstatus    = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY sii.item_code, sii.item_name, sii.uom, ic.avg_valuation_rate, i.standard_buying_rate
        ORDER BY profit DESC
    """, params, as_dict=True)


# ── Inventory ─────────────────────────────────────────────────────────────────
def get_stock_movement_summary(
    company: str,
    from_date: str,
    to_date: str,
    warehouse: str | None = None,
) -> list[dict]:
    """Total receipts and issues per item in a period."""
    wh_cond = "AND sle.warehouse = %(warehouse)s" if warehouse else ""
    params = {"company": company, "from_date": from_date, "to_date": to_date}
    if warehouse:
        params["warehouse"] = warehouse

    return frappe.db.sql(f"""
        SELECT
            sle.item_code,
            i.item_name,
            sle.warehouse,
            COALESCE(SUM(CASE WHEN sle.actual_qty > 0 THEN sle.actual_qty  ELSE 0 END), 0) AS total_in,
            COALESCE(SUM(CASE WHEN sle.actual_qty < 0 THEN -sle.actual_qty ELSE 0 END), 0) AS total_out,
            COALESCE(SUM(sle.actual_qty), 0) AS net_qty,
            COALESCE(SUM(sle.stock_value_difference), 0) AS net_value
        FROM `tabStock Ledger Entry` sle
        JOIN `tabItem` i ON i.name = sle.item_code
        WHERE sle.is_cancelled = 0
          AND sle.posting_date BETWEEN %(from_date)s AND %(to_date)s
          {wh_cond}
        GROUP BY sle.item_code, sle.warehouse
        ORDER BY ABS(SUM(sle.stock_value_difference)) DESC
    """, params, as_dict=True)


def get_slow_moving_items(
    company: str,
    days: int = 90,
    warehouse: str | None = None,
) -> list[dict]:
    """Items with no stock movement in the last N days that still have stock."""
    wh_cond      = "AND b.warehouse = %(warehouse)s" if warehouse else ""
    company_cond = "AND b.company   = %(company)s"   if company   else ""
    params: dict = {"days": days}
    if warehouse:
        params["warehouse"] = warehouse
    if company:
        params["company"] = company

    return frappe.db.sql(f"""
        SELECT
            b.item_code,
            i.item_name,
            b.warehouse,
            b.actual_qty,
            b.stock_value,
            b.valuation_rate,
            MAX(sle.posting_date) AS last_movement_date,
            DATEDIFF(CURDATE(), MAX(sle.posting_date)) AS days_since_movement
        FROM `tabBin` b
        JOIN `tabItem` i ON i.name = b.item_code
        LEFT JOIN `tabStock Ledger Entry` sle
            ON sle.item_code = b.item_code
            AND sle.warehouse = b.warehouse
            AND sle.is_cancelled = 0
        WHERE b.actual_qty > 0
          {wh_cond}
          {company_cond}
        GROUP BY b.item_code, b.warehouse
        HAVING last_movement_date IS NULL
            OR DATEDIFF(CURDATE(), last_movement_date) > %(days)s
        ORDER BY days_since_movement DESC
    """, params, as_dict=True)


def get_stock_ageing(
    warehouse: str | None = None,
    as_of_date: str | None = None,
) -> list[dict]:
    """FIFO-based stock ageing — how old is the stock on hand."""
    from frappe.utils import today as frappe_today
    date = as_of_date or frappe_today()
    wh_cond = "AND sle.warehouse = %(warehouse)s" if warehouse else ""
    params = {"date": date}
    if warehouse:
        params["warehouse"] = warehouse

    return frappe.db.sql(f"""
        SELECT
            sle.item_code,
            i.item_name,
            sle.warehouse,
            sle.posting_date AS receipt_date,
            sle.actual_qty   AS receipt_qty,
            sle.incoming_rate AS rate,
            DATEDIFF(%(date)s, sle.posting_date) AS age_days,
            sle.actual_qty * sle.incoming_rate    AS receipt_value
        FROM `tabStock Ledger Entry` sle
        JOIN `tabItem` i ON i.name = sle.item_code
        WHERE sle.actual_qty > 0
          AND sle.posting_date <= %(date)s
          AND sle.is_cancelled = 0
          {wh_cond}
        ORDER BY sle.item_code, sle.posting_date ASC
    """, params, as_dict=True)


def get_item_valuation_history(
    item_code: str,
    warehouse: str,
    from_date: str,
    to_date: str,
) -> list[dict]:
    """Valuation rate history for an item+warehouse over a period."""
    return frappe.db.sql("""
        SELECT
            posting_date,
            voucher_type,
            voucher_no,
            actual_qty,
            qty_after_transaction,
            valuation_rate,
            stock_value
        FROM `tabStock Ledger Entry`
        WHERE item_code  = %(item_code)s
          AND warehouse  = %(warehouse)s
          AND is_cancelled = 0
          AND posting_date BETWEEN %(from_date)s AND %(to_date)s
        ORDER BY posting_date, creation
    """, {"item_code": item_code, "warehouse": warehouse,
          "from_date": from_date, "to_date": to_date}, as_dict=True)


# ── Trial Balance ─────────────────────────────────────────────────────────────

@frappe.whitelist()
def get_trial_balance(company: str, from_date: str, to_date: str) -> list[dict]:
    """Account-level trial balance: opening + period debits/credits + closing."""
    rows = frappe.db.sql("""
        SELECT
            gle.account,
            a.account_type,
            SUM(CASE WHEN gle.posting_date < %(from_date)s THEN gle.debit - gle.credit ELSE 0 END) AS opening,
            SUM(CASE WHEN gle.posting_date BETWEEN %(from_date)s AND %(to_date)s THEN gle.debit ELSE 0 END) AS debit,
            SUM(CASE WHEN gle.posting_date BETWEEN %(from_date)s AND %(to_date)s THEN gle.credit ELSE 0 END) AS credit
        FROM `tabGeneral Ledger Entry` gle
        JOIN `tabAccount` a ON a.name = gle.account
        WHERE gle.company      = %(company)s
          AND gle.is_cancelled  = 0
          AND gle.posting_date <= %(to_date)s
        GROUP BY gle.account, a.account_type
        ORDER BY gle.account
    """, {"company": company, "from_date": from_date, "to_date": to_date}, as_dict=True)

    for r in rows:
        r["closing"] = flt(r.get("opening")) + flt(r.get("debit")) - flt(r.get("credit"))

    return rows


# ── Inventory ↔ GL Reconciliation ────────────────────────────────────────────

@frappe.whitelist()
def get_inventory_reconciliation(company: str) -> dict:
    """
    Perpetual inventory audit check: does the Stock Ledger's operational view
    of stock value (Bin.stock_value, moving-average) agree with the GL's
    financial view (Inventory Asset account balance)?

    These are two independently-maintained ledgers (Stock Ledger Entry / Bin
    vs General Ledger Entry) that only stay in sync because every Stock Entry
    posts both together. This report is the tripwire that catches drift —
    e.g. a manual Journal Entry into the Inventory account, a GL posting
    failure that Stock Entry logged and swallowed (see StockEntry._post_gl_entries
    error handling), or an account misconfiguration — immediately instead of
    at year-end audit.

    Grouped by resolved inventory account (Item override → Books Company
    default → CoA "Stock" type) since a company can have more than one
    Inventory Asset ledger. Also reports the Stock Received But Not Billed
    (GR/IR) balance for context — a nonzero GRIR is normal (goods received,
    bill not yet booked) and is NOT counted as drift.
    """
    from zoho_books_clone.accounts.inventory_gl import get_grir_account, get_inventory_account

    default_account = get_inventory_account(company)

    items = frappe.db.sql("""
        SELECT b.item_code, i.item_name, b.warehouse, b.actual_qty,
               b.valuation_rate, b.stock_value, i.inventory_account
        FROM `tabBin` b
        INNER JOIN `tabWarehouse` w ON w.name = b.warehouse
        INNER JOIN `tabItem` i ON i.name = b.item_code
        WHERE w.company = %(company)s
          AND i.is_stock_item = 1
          AND b.actual_qty != 0
        ORDER BY b.item_code, b.warehouse
    """, {"company": company}, as_dict=True)

    for row in items:
        row["resolved_account"] = row.inventory_account or default_account

    accounts = sorted({
        row["resolved_account"] for row in items if row["resolved_account"]
    } | ({default_account} if default_account else set()))

    account_summary = []
    total_bin_value = 0.0
    total_gl_balance = 0.0
    for account in accounts:
        bin_value = sum(flt(row.stock_value) for row in items if row["resolved_account"] == account)
        gl_balance = flt(frappe.db.sql("""
            SELECT COALESCE(SUM(debit) - SUM(credit), 0)
            FROM `tabGeneral Ledger Entry`
            WHERE account = %(account)s AND company = %(company)s
              AND IFNULL(is_cancelled, 0) = 0
        """, {"account": account, "company": company})[0][0])
        difference = round(bin_value - gl_balance, 2)
        account_summary.append({
            "account": account,
            "bin_stock_value": round(bin_value, 2),
            "gl_balance": round(gl_balance, 2),
            "difference": difference,
            "is_reconciled": abs(difference) < 0.01,
        })
        total_bin_value += bin_value
        total_gl_balance += gl_balance

    grir_account = get_grir_account(company)
    grir_balance = 0.0
    if grir_account:
        grir_balance = flt(frappe.db.sql("""
            SELECT COALESCE(SUM(credit) - SUM(debit), 0)
            FROM `tabGeneral Ledger Entry`
            WHERE account = %(account)s AND company = %(company)s
              AND IFNULL(is_cancelled, 0) = 0
        """, {"account": grir_account, "company": company})[0][0])

    return {
        "accounts": account_summary,
        "items": items,
        "total_bin_value": round(total_bin_value, 2),
        "total_gl_balance": round(total_gl_balance, 2),
        "total_difference": round(total_bin_value - total_gl_balance, 2),
        "is_reconciled": abs(total_bin_value - total_gl_balance) < 0.01,
        "grir_account": grir_account,
        "grir_balance": round(grir_balance, 2),
    }


# ── AR Aging ──────────────────────────────────────────────────────────────────

@frappe.whitelist()
def get_ar_aging(company: str, as_of_date: str) -> list[dict]:
    """Accounts Receivable aging by customer with standard buckets."""
    rows = frappe.db.sql("""
        SELECT
            si.customer,
            si.customer_name,
            si.name             AS invoice,
            si.posting_date,
            si.due_date,
            si.outstanding_amount,
            DATEDIFF(%(as_of_date)s, si.due_date) AS overdue_days
        FROM `tabSales Invoice` si
        WHERE si.company      = %(company)s
          AND si.docstatus    = 1
          AND si.outstanding_amount > 0
        ORDER BY si.customer, si.posting_date
    """, {"company": company, "as_of_date": as_of_date}, as_dict=True)

    # Bucket into aging groups per customer
    buckets = {}
    for r in rows:
        cust = r["customer"]
        if cust not in buckets:
            buckets[cust] = {"customer": cust, "customer_name": r.get("customer_name", cust),
                             "current": 0, "days_1_30": 0, "days_31_60": 0,
                             "days_61_90": 0, "days_90_plus": 0, "total": 0}
        b = buckets[cust]
        amt = flt(r["outstanding_amount"])
        days = r["overdue_days"] or 0
        if days <= 0:
            b["current"] += amt
        elif days <= 30:
            b["days_1_30"] += amt
        elif days <= 60:
            b["days_31_60"] += amt
        elif days <= 90:
            b["days_61_90"] += amt
        else:
            b["days_90_plus"] += amt
        b["total"] += amt

    return list(buckets.values())


# ── AP Aging ──────────────────────────────────────────────────────────────────

@frappe.whitelist()
def get_ap_aging(company: str, as_of_date: str) -> list[dict]:
    """Accounts Payable aging by supplier with standard buckets."""
    rows = frappe.db.sql("""
        SELECT
            pi.supplier,
            pi.supplier_name,
            pi.name             AS invoice,
            pi.posting_date,
            pi.due_date,
            pi.outstanding_amount,
            DATEDIFF(%(as_of_date)s, pi.due_date) AS overdue_days
        FROM `tabPurchase Invoice` pi
        WHERE pi.company      = %(company)s
          AND pi.docstatus    = 1
          AND pi.outstanding_amount > 0
        ORDER BY pi.supplier, pi.posting_date
    """, {"company": company, "as_of_date": as_of_date}, as_dict=True)

    buckets = {}
    for r in rows:
        sup = r["supplier"]
        if sup not in buckets:
            buckets[sup] = {"supplier": sup, "supplier_name": r.get("supplier_name", sup),
                            "current": 0, "days_1_30": 0, "days_31_60": 0,
                            "days_61_90": 0, "days_90_plus": 0, "total": 0}
        b = buckets[sup]
        amt = flt(r["outstanding_amount"])
        days = r["overdue_days"] or 0
        if days <= 0:
            b["current"] += amt
        elif days <= 30:
            b["days_1_30"] += amt
        elif days <= 60:
            b["days_31_60"] += amt
        elif days <= 90:
            b["days_61_90"] += amt
        else:
            b["days_90_plus"] += amt
        b["total"] += amt

    return list(buckets.values())


# ── Customer Statement ────────────────────────────────────────────────────────

@frappe.whitelist()
def get_customer_statement(customer: str, company: str = "") -> dict:
    """Outstanding invoices + payment history for a customer.

    Includes the customer's opening balance (if any) both as a synthetic
    row in `invoices` — so it's visible in the statement, same as a real
    invoice — and folded into `total_outstanding`. Previously this endpoint
    ignored opening_balance entirely, so a customer with only an opening
    balance and no invoices showed ₹0 outstanding here even though the
    Customers list page (a different endpoint) showed it correctly.

    Uses `get_opening_balance_outstanding` (net of any Payment Entry already
    allocated against the opening Journal Entry) rather than the raw
    `opening_balance` field — otherwise a customer who has since paid off
    their opening balance still had the full original amount added back
    into Total Outstanding here, double-counting money already collected
    and disagreeing with the Customers list page's figure for the same
    customer.
    """
    from zoho_books_clone.accounts.opening_balance import get_opening_balance_outstanding

    if not company:
        from zoho_books_clone.api.session import _get_company
        company = _get_company(frappe.session.user) or ""
    if not company:
        frappe.throw("No default company configured. Please set one in Books Settings.")
    invoices = frappe.db.sql("""
        SELECT name, posting_date, due_date, grand_total, outstanding_amount, currency,
               CASE WHEN due_date < CURDATE() AND outstanding_amount > 0 THEN 1 ELSE 0 END AS is_overdue
        FROM `tabSales Invoice`
        WHERE company = %(company)s AND customer = %(customer)s AND docstatus = 1
          AND outstanding_amount > 0
        ORDER BY due_date ASC
    """, {"company": company, "customer": customer}, as_dict=True)

    payments = frappe.db.sql("""
        SELECT name, payment_date, paid_amount, mode_of_payment
        FROM `tabPayment Entry`
        WHERE company = %(company)s AND party = %(customer)s AND party_type = 'Customer'
          AND docstatus = 1
        ORDER BY payment_date DESC
        LIMIT 20
    """, {"company": company, "customer": customer}, as_dict=True)

    opening_balance = get_opening_balance_outstanding("Customer", customer)
    if opening_balance:
        invoices.insert(0, {
            "name": "Opening Balance", "posting_date": None, "due_date": None,
            "grand_total": opening_balance, "outstanding_amount": opening_balance,
            "currency": None, "is_overdue": 0,
        })

    total_outstanding = sum(flt(i["outstanding_amount"]) for i in invoices)
    overdue_amount    = sum(flt(i["outstanding_amount"]) for i in invoices if i["is_overdue"])

    cust = frappe.db.get_value("Customer", customer,
                               ["customer_name", "email_id", "mobile_no"], as_dict=True) or {}

    return {
        "customer": customer,
        "customer_name": cust.get("customer_name", customer),
        "email": cust.get("email_id", ""),
        "mobile": cust.get("mobile_no", ""),
        "invoices": invoices,
        "payments": payments,
        "total_outstanding": total_outstanding,
        "overdue_amount": overdue_amount,
    }



@frappe.whitelist()
def send_customer_statement(customer: str, company: str) -> dict:
    """Email the account statement to the customer."""
    data = get_customer_statement(customer, company)
    email = data.get("email", "")
    if not email:
        frappe.throw("No email address on file for this customer.")

    cname = data["customer_name"]
    rows_html = "".join(
        f"<tr><td>{i['name']}</td><td>{i['posting_date']}</td><td>{i['due_date']}</td>"
        f"<td style='text-align:right'>₹{flt(i['outstanding_amount']):,.2f}</td>"
        f"<td style='color:{'#c92a2a' if i['is_overdue'] else '#2f9e44'}'>"
        f"{'Overdue' if i['is_overdue'] else 'Due'}</td></tr>"
        for i in data["invoices"]
    )

    body = f"""
<p>Dear {cname},</p>
<p>Please find your account statement from <b>{company}</b> as of today.</p>
<table border="1" cellpadding="6" cellspacing="0"
  style="border-collapse:collapse;font-size:13px;width:100%">
  <thead style="background:#f3f4f6">
    <tr><th>Invoice</th><th>Date</th><th>Due Date</th><th>Outstanding</th><th>Status</th></tr>
  </thead>
  <tbody>{rows_html}</tbody>
  <tfoot>
    <tr style="font-weight:700;background:#f3f4f6">
      <td colspan="3">Total Outstanding</td>
      <td style="text-align:right">₹{data['total_outstanding']:,.2f}</td><td></td>
    </tr>
  </tfoot>
</table>
<p>Please arrange payment at your earliest convenience. Thank you.</p>
<p>Regards,<br>{company}</p>
"""
    frappe.sendmail(
        recipients=[email],
        subject=f"Account Statement – {company}",
        message=body,
        reference_doctype="Customer",
        reference_name=customer,
    )
    return {"sent": True, "email": email}


# ── P&L Monthly Breakdown ────────────────────────────────────────────────────

@frappe.whitelist()
def get_pl_monthly_breakdown(company: str, from_date: str, to_date: str) -> list[dict]:
    """Monthly income vs expense for sparkline / bar charts."""
    rows = frappe.db.sql("""
        SELECT
            DATE_FORMAT(gle.posting_date, '%%Y-%%m') AS month,
            SUM(CASE WHEN a.account_type = 'Income'
                     THEN gle.credit - gle.debit ELSE 0 END) AS income,
            SUM(CASE WHEN a.account_type IN ('Expense', 'Cost of Goods Sold', 'Stock Adjustment')
                     THEN gle.debit - gle.credit ELSE 0 END) AS expense
        FROM `tabGeneral Ledger Entry` gle
        JOIN `tabAccount` a ON a.name = gle.account
        WHERE gle.company    = %(company)s
          AND gle.is_cancelled = 0
          AND gle.posting_date BETWEEN %(from_date)s AND %(to_date)s
          AND a.account_type IN ('Income', 'Expense', 'Cost of Goods Sold', 'Stock Adjustment')
        GROUP BY DATE_FORMAT(gle.posting_date, '%%Y-%%m')
        ORDER BY month
    """, {"company": company, "from_date": from_date, "to_date": to_date}, as_dict=True)

    for r in rows:
        r["profit"] = flt(r.get("income")) - flt(r.get("expense"))

    return rows


# ── GST / ITC Report (P3/Issue 9) ─────────────────────────────────────────────
@frappe.whitelist()
def get_gstr_summary(company: str, from_date: str, to_date: str) -> dict:
    """
    Build a GSTR-3B style summary:
      - Output tax  : taxes collected on submitted Sales Invoices
      - Input tax (ITC): taxes paid on submitted Purchase Invoices
      - Net liability : output - ITC
    Returns a dict with 'output', 'itc', and 'net' sections, each a list of
    {"tax_type": str, "amount": float} rows plus a totals dict.
    """
    # ── Output tax (from Sales Invoices) ──────────────────────────────────────
    # Tax Line.tax_type also carries non-GST rows (VAT/Other) -- notably TDS
    # deductions, which are stored as tax_type "Other" (see get_tds_transactions).
    # GSTR-3B must only ever total actual GST components.
    output_rows = frappe.db.sql("""
        SELECT
            COALESCE(NULLIF(tl.tax_type, ''), tl.description) AS tax_type,
            tl.description,
            SUM(tl.tax_amount)      AS amount,
            COUNT(DISTINCT si.name) AS invoice_count
        FROM `tabTax Line` tl
        JOIN `tabSales Invoice` si
          ON si.name = tl.parent AND tl.parenttype = 'Sales Invoice'
        WHERE si.company        = %(company)s
          AND si.docstatus      = 1
          AND si.posting_date   BETWEEN %(from_date)s AND %(to_date)s
          AND tl.tax_type       IN ('CGST', 'SGST', 'IGST', 'Cess')
        GROUP BY tax_type, tl.description
        ORDER BY tax_type
    """, {"company": company, "from_date": from_date, "to_date": to_date},
    as_dict=True)

    # ── Input Tax Credit (from Purchase Invoices + capitalized Assets) ────────
    # Phase 6: ITC-eligible tax lines on Asset (Asset Tax Detail, see
    # asset_gl.post_asset_capitalization) post to the same GST Input account
    # as Purchase Invoice ITC, but live in a different child doctype -- they
    # were invisible to GSTR-3B/2A reporting until this UNION ALL was added.
    # Non-eligible ("blocked credit") Asset tax rows are deliberately
    # excluded here (is_itc_eligible=1 filter): those get folded into the
    # asset's capitalized cost instead of claimed, so they were never GST
    # Input Account postings in the first place -- see Asset Tax Detail's
    # is_itc_eligible description and asset_gl.py's itc_by_account logic.
    # is_existing_asset assets are excluded too: post_asset_capitalization
    # skips their GL entirely (opening-balance assets, never capitalized
    # through this app), so there's no GST Input postings to reconcile.
    itc_rows = frappe.db.sql("""
        SELECT
            tax_type,
            description,
            SUM(tax_amount)         AS amount,
            COUNT(DISTINCT voucher_no) AS invoice_count
        FROM (
            SELECT
                COALESCE(NULLIF(tl.tax_type, ''), tl.description) AS tax_type,
                tl.description AS description,
                tl.tax_amount   AS tax_amount,
                pi.name         AS voucher_no
            FROM `tabTax Line` tl
            JOIN `tabPurchase Invoice` pi
              ON pi.name = tl.parent AND tl.parenttype = 'Purchase Invoice'
            WHERE pi.company        = %(company)s
              AND pi.docstatus      = 1
              AND pi.posting_date   BETWEEN %(from_date)s AND %(to_date)s
              AND tl.tax_type       IN ('CGST', 'SGST', 'IGST', 'Cess')

            UNION ALL

            SELECT
                COALESCE(NULLIF(atd.tax_type, ''), atd.description) AS tax_type,
                atd.description AS description,
                atd.amount       AS tax_amount,
                a.name           AS voucher_no
            FROM `tabAsset Tax Detail` atd
            JOIN `tabAsset` a
              ON a.name = atd.parent AND atd.parenttype = 'Asset'
            WHERE a.company          = %(company)s
              AND a.docstatus        = 1
              AND a.is_existing_asset = 0
              AND a.purchase_date    BETWEEN %(from_date)s AND %(to_date)s
              AND atd.is_itc_eligible = 1
              AND atd.tax_type        IN ('CGST', 'SGST', 'IGST', 'Cess')
        ) itc
        GROUP BY tax_type, description
        ORDER BY tax_type
    """, {"company": company, "from_date": from_date, "to_date": to_date},
    as_dict=True)

    total_output = sum(flt(r.amount) for r in output_rows)
    total_itc    = sum(flt(r.amount) for r in itc_rows)

    # Taxable value = net sum of net_total on outward SIs for the period.
    # Credit notes carry negative net_total/tax_amount by convention (see
    # sales_invoice.py), the same convention total_output relies on to net
    # correctly -- so this must NOT filter out is_return rows, or the implied
    # tax rate stops reconciling in any period containing credit notes.
    taxable_row = frappe.db.sql("""
        SELECT COALESCE(SUM(net_total), 0) AS taxable_value
        FROM `tabSales Invoice`
        WHERE company = %(company)s AND docstatus = 1
          AND posting_date BETWEEN %(from_date)s AND %(to_date)s
    """, {"company": company, "from_date": from_date, "to_date": to_date}, as_dict=True)
    taxable_value = flt(taxable_row[0].taxable_value) if taxable_row else 0.0

    # ── Net payable by tax type ────────────────────────────────────────────────
    output_by_type = {r.tax_type: flt(r.amount) for r in output_rows}
    itc_by_type    = {r.tax_type: flt(r.amount) for r in itc_rows}
    all_types      = sorted(set(list(output_by_type) + list(itc_by_type)))

    net_rows = [
        {
            "tax_type":  t,
            "output":    output_by_type.get(t, 0.0),
            "itc":       itc_by_type.get(t, 0.0),
            "net":       output_by_type.get(t, 0.0) - itc_by_type.get(t, 0.0),
        }
        for t in all_types
    ]

    return {
        "output":         [dict(r) for r in output_rows],
        "itc":            [dict(r) for r in itc_rows],
        "net_by_type":    net_rows,
        "taxable_value":  taxable_value,
        "totals": {
            "total_output":      total_output,
            "total_itc":         total_itc,
            "net_tax_liability": total_output - total_itc,
        },
    }


# ── Report Drill-Down (Audit Part 3 — Limited Report Drill-Down) ──────────────

@frappe.whitelist()
def get_account_ledger(
    account: str,
    company: str,
    from_date: str,
    to_date: str,
    party_type: str = None,
    party: str = None,
) -> dict:
    """
    Drill-down: full GL ledger for a single account in a date range.
    Returns opening balance, all period movements, closing balance.
    Used when the user clicks an account balance in P&L / Balance Sheet.
    """
    # Opening balance (all entries before from_date)
    opening_result = frappe.db.sql("""
        SELECT COALESCE(SUM(debit) - SUM(credit), 0) AS opening
        FROM `tabGeneral Ledger Entry`
        WHERE account     = %(account)s
          AND company     = %(company)s
          AND is_cancelled = 0
          AND posting_date < %(from_date)s
    """, {"account": account, "company": company, "from_date": from_date}, as_dict=True)
    opening = flt(opening_result[0].opening) if opening_result else 0.0

    # Period entries
    conds = [
        "account = %(account)s",
        "company = %(company)s",
        "is_cancelled = 0",
        "posting_date BETWEEN %(from_date)s AND %(to_date)s",
    ]
    params = {"account": account, "company": company,
              "from_date": from_date, "to_date": to_date}

    if party_type:
        conds.append("party_type = %(party_type)s")
        params["party_type"] = party_type
    if party:
        conds.append("party = %(party)s")
        params["party"] = party

    where = " AND ".join(conds)
    # General Ledger Entry has no posting_time column (see get_gl_entries
    # above) -- order by posting_date/creation only.
    entries = frappe.db.sql(f"""
        SELECT
            name, posting_date, voucher_type, voucher_no,
            party_type, party, debit, credit, remarks,
            (SUM(debit - credit) OVER (
                ORDER BY posting_date, creation
                ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            ) + %(opening)s) AS running_balance
        FROM `tabGeneral Ledger Entry`
        WHERE {where}
        ORDER BY posting_date, creation
    """, {**params, "opening": opening}, as_dict=True)

    total_debit  = sum(flt(e.debit)  for e in entries)
    total_credit = sum(flt(e.credit) for e in entries)
    closing      = opening + total_debit - total_credit

    return {
        "account":     account,
        "from_date":   from_date,
        "to_date":     to_date,
        "opening":     opening,
        "total_debit": total_debit,
        "total_credit":total_credit,
        "closing":     closing,
        "entries":     [dict(e) for e in entries],
    }


@frappe.whitelist()
def get_voucher_detail(voucher_type: str, voucher_no: str) -> dict:
    """
    Drill-down: all GL entries for a single voucher (invoice, payment, etc.).
    Also returns metadata about the source document.
    Used when clicking any voucher_no link in ledger or report views.
    """
    gl_entries = frappe.db.sql("""
        SELECT
            name, posting_date, account, party_type, party,
            debit, credit, remarks, voucher_type, voucher_no,
            is_cancelled, is_reversal
        FROM `tabGeneral Ledger Entry`
        WHERE voucher_type = %(vt)s AND voucher_no = %(vn)s
        ORDER BY posting_date, creation
    """, {"vt": voucher_type, "vn": voucher_no}, as_dict=True)

    total_debit  = sum(flt(e.debit)  for e in gl_entries if not e.is_cancelled)
    total_credit = sum(flt(e.credit) for e in gl_entries if not e.is_cancelled)

    # Fetch lightweight source doc fields for context
    extra = {}
    try:
        if voucher_type in ("Sales Invoice",):
            extra = frappe.get_value(voucher_type, voucher_no,
                ["customer", "customer_name", "grand_total", "outstanding_amount"],
                as_dict=True) or {}
        elif voucher_type in ("Purchase Invoice",):
            extra = frappe.get_value(voucher_type, voucher_no,
                ["supplier", "grand_total", "outstanding_amount"],
                as_dict=True) or {}
        elif voucher_type == "Payment Entry":
            extra = frappe.get_value(voucher_type, voucher_no,
                ["party_type", "party", "paid_amount", "payment_type"],
                as_dict=True) or {}
        elif voucher_type == "Stock Entry":
            extra = frappe.get_value(voucher_type, voucher_no,
                ["stock_entry_type", "total_outgoing_value", "total_incoming_value"],
                as_dict=True) or {}
    except Exception:
        pass

    return {
        "voucher_type":  voucher_type,
        "voucher_no":    voucher_no,
        "gl_entries":    [dict(e) for e in gl_entries],
        "total_debit":   total_debit,
        "total_credit":  total_credit,
        "is_balanced":   abs(total_debit - total_credit) < 0.01,
        "source_doc":    dict(extra) if extra else {},
    }


@frappe.whitelist()
def get_pl_account_breakdown(
    company: str, from_date: str, to_date: str, account_type: str = "Income"
) -> list[dict]:
    """
    Drill-down: P&L breakdown by individual account within a type (Income/Expense).
    Click Income total → see each income account with its amount.
    Click an account → get_account_ledger for full transactions.
    """
    return frappe.db.sql("""
        SELECT
            gle.account,
            a.account_type,
            COALESCE(SUM(gle.credit) - SUM(gle.debit), 0) AS amount,
            COUNT(DISTINCT gle.voucher_no) AS transaction_count
        FROM `tabGeneral Ledger Entry` gle
        JOIN `tabAccount` a ON a.name = gle.account
        WHERE gle.company      = %(company)s
          AND gle.is_cancelled  = 0
          AND gle.posting_date BETWEEN %(from_date)s AND %(to_date)s
          AND a.account_type   = %(account_type)s
        GROUP BY gle.account, a.account_type
        ORDER BY ABS(SUM(gle.credit) - SUM(gle.debit)) DESC
    """, {"company": company, "from_date": from_date,
          "to_date": to_date, "account_type": account_type}, as_dict=True)


@frappe.whitelist()
def get_party_ledger(
    party_type: str,
    party: str,
    company: str,
    from_date: str = None,
    to_date: str = None,
) -> dict:
    """
    Drill-down: complete ledger for a customer or supplier — all invoices,
    payments, and outstanding per document.  Used in customer/supplier cards.
    """
    inv_dt     = "Sales Invoice"    if party_type == "Customer" else "Purchase Invoice"
    party_fld  = "customer"         if party_type == "Customer" else "supplier"

    inv_filters = {party_fld: party, "company": company, "docstatus": 1}
    if from_date and to_date:
        inv_filters["posting_date"] = ["between", [from_date, to_date]]
    elif from_date:
        inv_filters["posting_date"] = [">=", from_date]
    elif to_date:
        inv_filters["posting_date"] = ["<=", to_date]

    invoices = frappe.get_all(
        inv_dt,
        filters=inv_filters,
        fields=["name", "posting_date", "due_date", "grand_total",
                "outstanding_amount", "status", "currency"],
        order_by="posting_date desc",
        limit=500,
    )

    pay_filters = {"party_type": party_type, "party": party,
                   "company": company, "docstatus": 1}
    payments = frappe.get_all(
        "Payment Entry",
        filters=pay_filters,
        fields=["name", "payment_date", "payment_type", "paid_amount", "mode_of_payment"],
        order_by="payment_date desc",
        limit=200,
    )

    total_invoiced    = sum(flt(i.grand_total)        for i in invoices)
    total_outstanding = sum(flt(i.outstanding_amount) for i in invoices)
    total_paid        = total_invoiced - total_outstanding

    return {
        "party_type":        party_type,
        "party":             party,
        "total_invoiced":    total_invoiced,
        "total_paid":        total_paid,
        "total_outstanding": total_outstanding,
        "invoices":          [dict(i) for i in invoices],
        "payments":          [dict(p) for p in payments],
    }


def get_itc_ledger(company: str, from_date: str, to_date: str) -> list[dict]:
    """
    Line-by-line ITC ledger — every ITC-eligible tax line on every submitted
    Purchase Invoice, PLUS every ITC-eligible tax line on every capitalized
    Asset (Phase 6 — see get_gstr_summary's UNION for why Asset ITC needed
    wiring in separately: it lives in Asset Tax Detail, not Tax Line, so it
    was invisible to this ledger before).

    Purchase Invoice rows keep bill_no/bill_date (vendor's own invoice
    reference); Asset rows have no equivalent field so those come back
    NULL. `source` distinguishes the two so a caller/UI can tell a
    capitalized-asset ITC line apart from a regular purchase ITC line
    without guessing from voucher_no's naming series.
    Useful for GSTR-2A reconciliation.
    """
    return frappe.db.sql("""
        SELECT
            pi.name            AS voucher_no,
            pi.posting_date,
            pi.supplier,
            pi.bill_no,
            pi.bill_date,
            COALESCE(NULLIF(tl.tax_type, ''), tl.description) AS tax_type,
            tl.description,
            tl.rate            AS tax_rate,
            tl.tax_amount,
            tl.account_head,
            'Purchase Invoice' AS source
        FROM `tabTax Line` tl
        JOIN `tabPurchase Invoice` pi
          ON pi.name = tl.parent AND tl.parenttype = 'Purchase Invoice'
        WHERE pi.company        = %(company)s
          AND pi.docstatus      = 1
          AND pi.posting_date   BETWEEN %(from_date)s AND %(to_date)s

        UNION ALL

        SELECT
            a.name                      AS voucher_no,
            a.purchase_date             AS posting_date,
            a.supplier,
            NULL                        AS bill_no,
            NULL                        AS bill_date,
            COALESCE(NULLIF(atd.tax_type, ''), atd.description) AS tax_type,
            atd.description,
            atd.rate                    AS tax_rate,
            atd.amount                  AS tax_amount,
            COALESCE(atd.account_head, '') AS account_head,
            'Asset'                     AS source
        FROM `tabAsset Tax Detail` atd
        JOIN `tabAsset` a
          ON a.name = atd.parent AND atd.parenttype = 'Asset'
        WHERE a.company          = %(company)s
          AND a.docstatus        = 1
          AND a.is_existing_asset = 0
          AND a.purchase_date    BETWEEN %(from_date)s AND %(to_date)s
          AND atd.is_itc_eligible = 1

        ORDER BY posting_date, voucher_no, tax_type
    """, {"company": company, "from_date": from_date, "to_date": to_date},
    as_dict=True)


@frappe.whitelist()
def get_gstr1_data(company: str, from_date: str, to_date: str) -> dict:
    """
    GSTR-1 structured data:
    - b2b: invoices with customer GSTIN (registered buyers)
    - b2c: invoices without GSTIN (unregistered / consumer)
    - cdnr: credit notes for B2B customers
    - cdnur: credit/debit notes for unregistered (B2C) customers
    - hsn_summary: HSN-wise taxable + tax amounts
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date}

    invoices = frappe.db.sql("""
        SELECT
            si.name, si.posting_date, si.customer, si.customer_name,
            COALESCE(NULLIF(si.customer_gstin,''), c.tax_id, '') AS customer_gstin,
            si.place_of_supply, si.net_total, si.total_tax, si.grand_total,
            si.is_return, si.return_against
        FROM `tabSales Invoice` si
        LEFT JOIN `tabCustomer` c ON c.name = si.customer
        WHERE si.company = %(company)s
          AND si.docstatus = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        ORDER BY si.posting_date, si.name
    """, params, as_dict=True)

    # Tax lines for each invoice. GST-only -- Tax Line rows also carry TDS
    # (tax_type "Other") and other non-GST deductions (see get_tds_transactions),
    # which must not leak into the GSTR-1 tax totals.
    tax_rows = frappe.db.sql("""
        SELECT tl.parent, tl.tax_type, tl.description, tl.rate, tl.tax_amount
        FROM `tabTax Line` tl
        JOIN `tabSales Invoice` si ON si.name = tl.parent AND tl.parenttype = 'Sales Invoice'
        WHERE si.company = %(company)s AND si.docstatus = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
          AND tl.tax_type IN ('CGST', 'SGST', 'IGST', 'Cess')
    """, params, as_dict=True)

    taxes_by_inv = {}
    for t in tax_rows:
        taxes_by_inv.setdefault(t.parent, []).append(t)

    # HSN summary from SI items
    hsn_rows = frappe.db.sql("""
        SELECT
            COALESCE(NULLIF(ii.hsn_code,''), 'Not Set') AS hsn_code,
            SUM(ii.amount) AS taxable_value,
            COUNT(DISTINCT si.name) AS invoice_count
        FROM `tabSales Invoice Item` ii
        JOIN `tabSales Invoice` si ON si.name = ii.parent
        WHERE si.company = %(company)s AND si.docstatus = 1
          AND si.is_return = 0
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY hsn_code
        ORDER BY taxable_value DESC
    """, params, as_dict=True)

    b2b, b2c, cdnr, cdnur = [], [], [], []
    for inv in invoices:
        inv["taxes"] = taxes_by_inv.get(inv.name, [])
        # si.total_tax is the stored field and sums ALL Tax Line rows on the
        # invoice, including non-GST ones (TDS, etc.) -- override it with the
        # GST-only figure derived from the filtered tax_rows query above so
        # nothing downstream (UI, totals) reads the contaminated value.
        inv["total_tax"] = sum(flt(t.tax_amount) for t in inv["taxes"])
        if inv.is_return:
            if inv.customer_gstin:
                cdnr.append(inv)
            else:
                # Credit/debit notes against unregistered (B2C) customers.
                # GSTR-1 has a dedicated CDNUR table for exactly this --
                # these used to be silently dropped, which understated the
                # period's total credit-note value with no trace of them
                # anywhere in the return.
                cdnur.append(inv)
        else:
            if inv.customer_gstin:
                b2b.append(inv)
            else:
                b2c.append(inv)

    total_taxable = sum(flt(i.net_total) for i in b2b + b2c)
    total_tax = sum(flt(i.total_tax) for i in b2b + b2c)

    return {
        "b2b": [dict(r) for r in b2b],
        "b2c": [dict(r) for r in b2c],
        "cdnr": [dict(r) for r in cdnr],
        "cdnur": [dict(r) for r in cdnur],
        "hsn_summary": [dict(r) for r in hsn_rows],
        "totals": {
            "b2b_count": len(b2b),
            "b2c_count": len(b2c),
            "cdnr_count": len(cdnr),
            "cdnur_count": len(cdnur),
            "total_taxable": total_taxable,
            "total_tax": total_tax,
        },
    }


@frappe.whitelist()
def get_tds_transactions(company: str, from_date: str = None, to_date: str = None) -> list:
    """
    TDS deductions: Purchase Invoice tax lines where the tax_type / description
    indicates a TDS section (194C, 194J, 194I, TDS, etc.).
    Falls back to ALL tax lines on PIs when no TDS-specific lines exist.
    """
    params = {"company": company}
    date_clause = ""
    if from_date and to_date:
        date_clause = "AND pi.posting_date BETWEEN %(from_date)s AND %(to_date)s"
        params["from_date"] = from_date
        params["to_date"] = to_date

    rows = frappe.db.sql(f"""
        SELECT
            pi.name, pi.posting_date,
            pi.supplier, pi.supplier_name,
            pi.grand_total AS gross_amount,
            pi.grand_total,
            tl.tax_type, tl.description AS tds_section,
            tl.rate, tl.tax_amount AS tds_amount,
            (pi.grand_total - tl.tax_amount) AS net_payment
        FROM `tabTax Line` tl
        JOIN `tabPurchase Invoice` pi ON pi.name = tl.parent AND tl.parenttype = 'Purchase Invoice'
        WHERE pi.company = %(company)s
          AND pi.docstatus = 1
          {date_clause}
          AND (
            UPPER(COALESCE(tl.tax_type,'')) LIKE '%%TDS%%'
            OR UPPER(COALESCE(tl.description,'')) LIKE '%%TDS%%'
            OR UPPER(COALESCE(tl.description,'')) REGEXP '194[A-Z]?'
            OR UPPER(COALESCE(tl.description,'')) REGEXP '195'
            OR UPPER(COALESCE(tl.description,'')) LIKE '%%WITHHOLD%%'
          )
        ORDER BY pi.posting_date DESC, pi.name
    """, params, as_dict=True)

    if not rows:
        # No TDS-specific lines — return empty (don't confuse GST tax lines with TDS)
        return []

    return [dict(r) for r in rows]


# ── Daily Business MIS ──────────────────────────────────────────────────────────

@frappe.whitelist()
def get_daily_business_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Daily Business MIS: one row per calendar day in the range with the core
    operational numbers — sales, collections, purchases, expenses, dispatch,
    production, stock inward/outward movement, and running AR outstanding —
    plus period totals for the summary cards.

    "Outstanding" is a running balance: it starts from the AR outstanding
    total as of the day before `from_date` (submitted invoices' grand_total
    less receive-type payments booked before the period), then adds each
    day's (sales − collections). It approximates the day-end receivable
    balance; it is not a historical ledger snapshot, since invoices only
    store their *current* outstanding_amount.
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date}

    sales = frappe.db.sql("""
        SELECT posting_date AS date, COUNT(name) AS count, SUM(grand_total) AS amount
        FROM `tabSales Invoice`
        WHERE company = %(company)s AND docstatus = 1
          AND posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY posting_date
    """, params, as_dict=True)

    collections = frappe.db.sql("""
        SELECT payment_date AS date, COUNT(name) AS count, SUM(paid_amount) AS amount
        FROM `tabPayment Entry`
        WHERE company = %(company)s AND docstatus = 1 AND payment_type = 'Receive'
          AND payment_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY payment_date
    """, params, as_dict=True)

    purchases = frappe.db.sql("""
        SELECT posting_date AS date, COUNT(name) AS count, SUM(grand_total) AS amount
        FROM `tabPurchase Invoice`
        WHERE company = %(company)s AND docstatus = 1
          AND posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY posting_date
    """, params, as_dict=True)

    expenses = frappe.db.sql("""
        SELECT posting_date AS date, COUNT(name) AS count, SUM(total_amount) AS amount
        FROM `tabExpense`
        WHERE company = %(company)s AND docstatus = 1
          AND posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY posting_date
    """, params, as_dict=True)

    dispatch = frappe.db.sql("""
        SELECT posting_date AS date, COUNT(name) AS count, SUM(total_qty) AS qty
        FROM `tabDelivery Note`
        WHERE company = %(company)s AND docstatus = 1
          AND posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY posting_date
    """, params, as_dict=True)

    production = frappe.db.sql("""
        SELECT se.posting_date AS date, SUM(sed.qty) AS qty
        FROM `tabStock Entry Detail` sed
        JOIN `tabStock Entry` se ON se.name = sed.parent AND sed.parenttype = 'Stock Entry'
        WHERE se.company = %(company)s AND se.docstatus = 1
          AND se.stock_entry_type = 'Manufacture'
          AND sed.t_warehouse IS NOT NULL AND sed.t_warehouse != ''
          AND se.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY se.posting_date
    """, params, as_dict=True)

    stock_move = frappe.db.sql("""
        SELECT posting_date AS date,
               SUM(CASE WHEN actual_qty > 0 THEN actual_qty ELSE 0 END)  AS inward_qty,
               SUM(CASE WHEN actual_qty < 0 THEN -actual_qty ELSE 0 END) AS outward_qty
        FROM `tabStock Ledger Entry`
        WHERE company = %(company)s AND IFNULL(is_cancelled, 0) = 0
          AND posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY posting_date
    """, params, as_dict=True)

    # Opening AR balance: everything before the period start.
    opening_sales = flt(frappe.db.sql("""
        SELECT SUM(grand_total) FROM `tabSales Invoice`
        WHERE company = %(company)s AND docstatus = 1 AND posting_date < %(from_date)s
    """, params)[0][0])
    opening_collections = flt(frappe.db.sql("""
        SELECT SUM(paid_amount) FROM `tabPayment Entry`
        WHERE company = %(company)s AND docstatus = 1 AND payment_type = 'Receive'
          AND payment_date < %(from_date)s
    """, params)[0][0])
    opening_outstanding = opening_sales - opening_collections

    def index_by_date(rows):
        return {str(r["date"]): r for r in rows if r.get("date")}

    sales_by_date       = index_by_date(sales)
    coll_by_date        = index_by_date(collections)
    purch_by_date       = index_by_date(purchases)
    exp_by_date         = index_by_date(expenses)
    dispatch_by_date    = index_by_date(dispatch)
    prod_by_date        = index_by_date(production)
    stock_by_date       = index_by_date(stock_move)

    days = []
    d = getdate(from_date)
    end = getdate(to_date)
    running_outstanding = opening_outstanding
    while d <= end:
        key = str(d)
        s  = sales_by_date.get(key, {})
        c  = coll_by_date.get(key, {})
        p  = purch_by_date.get(key, {})
        e  = exp_by_date.get(key, {})
        di = dispatch_by_date.get(key, {})
        pr = prod_by_date.get(key, {})
        st = stock_by_date.get(key, {})

        sales_amt = flt(s.get("amount"))
        coll_amt  = flt(c.get("amount"))
        running_outstanding += (sales_amt - coll_amt)

        days.append({
            "date": key,
            "sales_amount": sales_amt,
            "sales_count": s.get("count") or 0,
            "collection_amount": coll_amt,
            "collection_count": c.get("count") or 0,
            "purchase_amount": flt(p.get("amount")),
            "purchase_count": p.get("count") or 0,
            "expense_amount": flt(e.get("amount")),
            "expense_count": e.get("count") or 0,
            "dispatch_qty": flt(di.get("qty")),
            "dispatch_count": di.get("count") or 0,
            "production_qty": flt(pr.get("qty")),
            "stock_inward_qty": flt(st.get("inward_qty")),
            "stock_outward_qty": flt(st.get("outward_qty")),
            "outstanding": running_outstanding,
        })
        d = add_days(d, 1)

    totals = {
        "sales_amount": sum(r["sales_amount"] for r in days),
        "collection_amount": sum(r["collection_amount"] for r in days),
        "purchase_amount": sum(r["purchase_amount"] for r in days),
        "expense_amount": sum(r["expense_amount"] for r in days),
        "dispatch_qty": sum(r["dispatch_qty"] for r in days),
        "production_qty": sum(r["production_qty"] for r in days),
        "stock_inward_qty": sum(r["stock_inward_qty"] for r in days),
        "stock_outward_qty": sum(r["stock_outward_qty"] for r in days),
        "closing_outstanding": days[-1]["outstanding"] if days else opening_outstanding,
    }

    return {"days": days, "totals": totals, "opening_outstanding": opening_outstanding}


# ── Sales MIS ────────────────────────────────────────────────────────────────

@frappe.whitelist()
def get_sales_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Sales MIS bundle for the given period: summary KPIs, product-wise,
    customer-wise, salesperson-wise and branch(cost-center)-wise sales,
    sales returns (Credit Notes), discount analysis, pending Sales Orders,
    and Sales Order → Invoice conversion — all in one call so the Sales MIS
    tab can switch between sub-views without re-querying.

    "Branch / Location" is approximated using Sales Invoice's cost_center,
    since this app has no dedicated Branch/Location doctype.
    "Sales Target vs Achievement" has no stored target (no Target doctype),
    so only the achieved figure is returned here — the target itself is
    entered by the user in the UI and compared client-side.
    """
    # No date selected on either side means "show everything" rather than
    # silently matching zero rows in the BETWEEN clauses below.
    from_date = from_date or "1900-01-01"
    to_date = to_date or "2999-12-31"

    params = {"company": company, "from_date": from_date, "to_date": to_date}

    # ---- Summary -------------------------------------------------------------
    summary_row = frappe.db.sql("""
        SELECT
            COUNT(si.name)                       AS invoice_count,
            SUM(si.net_total)                    AS net_sales,
            SUM(si.total_tax)                    AS total_tax,
            SUM(si.additional_discount_amount)   AS header_discount,
            SUM(si.grand_total)                  AS grand_total,
            SUM(sii.qty)                         AS total_qty
        FROM `tabSales Invoice` si
        LEFT JOIN `tabSales Invoice Item` sii ON sii.parent = si.name AND sii.parenttype = 'Sales Invoice'
        WHERE si.company = %(company)s AND si.docstatus = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
    """, params, as_dict=True)
    s = summary_row[0] if summary_row else {}
    invoice_count = s.get("invoice_count") or 0
    grand_total   = flt(s.get("grand_total"))
    summary = {
        "invoice_count": invoice_count,
        "net_sales": flt(s.get("net_sales")),
        "total_tax": flt(s.get("total_tax")),
        "header_discount": flt(s.get("header_discount")),
        "grand_total": grand_total,
        "total_qty": flt(s.get("total_qty")),
        "avg_invoice_value": (grand_total / invoice_count) if invoice_count else 0,
    }

    # ---- Product-wise ----------------------------------------------------------
    product_wise = frappe.db.sql("""
        SELECT
            sii.item_code AS item_code, sii.item_name AS item_name, sii.uom AS uom,
            COUNT(DISTINCT sii.parent) AS invoice_count,
            SUM(sii.qty)               AS qty_sold,
            SUM(sii.discount_amount)   AS total_discount,
            SUM(sii.amount)            AS total_amount
        FROM `tabSales Invoice Item` sii
        JOIN `tabSales Invoice` si ON si.name = sii.parent AND sii.parenttype = 'Sales Invoice'
        WHERE si.company = %(company)s AND si.docstatus = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY sii.item_code, sii.item_name, sii.uom
        ORDER BY total_amount DESC
    """, params, as_dict=True)

    # ---- Customer-wise -----------------------------------------------------
    customer_wise = frappe.db.sql("""
        SELECT
            si.customer AS customer, si.customer_name AS customer_name,
            COUNT(si.name)              AS invoice_count,
            SUM(si.grand_total)         AS total_amount,
            SUM(si.outstanding_amount)  AS outstanding_amount
        FROM `tabSales Invoice` si
        WHERE si.company = %(company)s AND si.docstatus = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY si.customer, si.customer_name
        ORDER BY total_amount DESC
    """, params, as_dict=True)

    # ---- Salesperson-wise ----------------------------------------------------
    salesperson_wise = frappe.db.sql("""
        SELECT
            COALESCE(si.sales_person, 'Unassigned') AS sales_person,
            COUNT(si.name)       AS invoice_count,
            SUM(si.grand_total)  AS total_amount
        FROM `tabSales Invoice` si
        WHERE si.company = %(company)s AND si.docstatus = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY COALESCE(si.sales_person, 'Unassigned')
        ORDER BY total_amount DESC
    """, params, as_dict=True)

    # ---- Branch / Location-wise (cost_center proxy) -------------------------
    branch_wise = frappe.db.sql("""
        SELECT
            COALESCE(si.cost_center, 'Unassigned') AS branch,
            COUNT(si.name)       AS invoice_count,
            SUM(si.grand_total)  AS total_amount
        FROM `tabSales Invoice` si
        WHERE si.company = %(company)s AND si.docstatus = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY COALESCE(si.cost_center, 'Unassigned')
        ORDER BY total_amount DESC
    """, params, as_dict=True)

    # ---- Sales Return (Credit Notes) -----------------------------------------
    sales_return_rows = frappe.db.sql("""
        SELECT
            cn.name AS credit_note, cn.posting_date AS posting_date,
            cn.customer AS customer, cn.customer_name AS customer_name,
            cn.return_against AS return_against, cn.grand_total AS grand_total,
            cn.reason AS reason
        FROM `tabCredit Note` cn
        WHERE cn.company = %(company)s AND cn.docstatus = 1
          AND cn.posting_date BETWEEN %(from_date)s AND %(to_date)s
        ORDER BY cn.posting_date DESC
    """, params, as_dict=True)
    return_total = sum(flt(r["grand_total"]) for r in sales_return_rows)
    sales_return = {
        "rows": sales_return_rows,
        "return_count": len(sales_return_rows),
        "return_total": return_total,
        "return_pct_of_sales": (return_total / grand_total * 100) if grand_total else 0,
    }

    # ---- Discount Analysis ---------------------------------------------------
    discount_by_customer = frappe.db.sql("""
        SELECT
            si.customer AS customer, si.customer_name AS customer_name,
            SUM(sii.discount_amount)           AS line_discount,
            SUM(si.additional_discount_amount) AS header_discount,
            SUM(sii.amount)                    AS net_amount
        FROM `tabSales Invoice` si
        LEFT JOIN `tabSales Invoice Item` sii ON sii.parent = si.name AND sii.parenttype = 'Sales Invoice'
        WHERE si.company = %(company)s AND si.docstatus = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY si.customer, si.customer_name
        HAVING (line_discount > 0 OR header_discount > 0)
        ORDER BY (SUM(sii.discount_amount) + SUM(si.additional_discount_amount)) DESC
    """, params, as_dict=True)
    discount_by_item = frappe.db.sql("""
        SELECT
            sii.item_code AS item_code, sii.item_name AS item_name,
            SUM(sii.discount_amount) AS total_discount,
            SUM(sii.amount)          AS net_amount
        FROM `tabSales Invoice Item` sii
        JOIN `tabSales Invoice` si ON si.name = sii.parent AND sii.parenttype = 'Sales Invoice'
        WHERE si.company = %(company)s AND si.docstatus = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY sii.item_code, sii.item_name
        HAVING total_discount > 0
        ORDER BY total_discount DESC
    """, params, as_dict=True)
    total_line_discount = sum(flt(r["total_discount"]) for r in discount_by_item)
    total_header_discount = summary["header_discount"]
    gross_before_discount = summary["net_sales"] + total_line_discount + total_header_discount
    discount_analysis = {
        "by_customer": discount_by_customer,
        "by_item": discount_by_item,
        "total_line_discount": total_line_discount,
        "total_header_discount": total_header_discount,
        "total_discount": total_line_discount + total_header_discount,
        "avg_discount_pct": ((total_line_discount + total_header_discount) / gross_before_discount * 100)
                            if gross_before_discount else 0,
    }

    # ---- Sales Order Pending (open as of to_date) -----------------------------
    pending_orders = frappe.db.sql("""
        SELECT
            so.name AS sales_order, so.transaction_date AS transaction_date,
            so.customer AS customer, so.customer_name AS customer_name,
            so.status AS status, so.grand_total AS grand_total,
            so.billed_amount AS billed_amount,
            (so.grand_total - COALESCE(so.billed_amount, 0)) AS pending_amount
        FROM `tabSales Order` so
        WHERE so.company = %(company)s
          AND so.status NOT IN ('Invoiced', 'Closed', 'Cancelled', 'Draft')
          AND so.transaction_date <= %(to_date)s
        ORDER BY so.transaction_date ASC
    """, params, as_dict=True)
    pending_total = sum(flt(r["pending_amount"]) for r in pending_orders)
    sales_order_pending = {
        "rows": pending_orders,
        "order_count": len(pending_orders),
        "pending_total": pending_total,
    }

    # ---- Sales Conversion (SO -> Invoice, orders placed in the period) -------
    so_stats = frappe.db.sql("""
        SELECT
            COUNT(so.name) AS order_count,
            SUM(so.grand_total) AS order_value,
            SUM(COALESCE(so.billed_amount, 0)) AS billed_value,
            SUM(CASE WHEN so.status IN ('Invoiced') OR COALESCE(so.billed_amount,0) > 0 THEN 1 ELSE 0 END) AS converted_count
        FROM `tabSales Order` so
        WHERE so.company = %(company)s
          AND so.status != 'Cancelled'
          AND so.transaction_date BETWEEN %(from_date)s AND %(to_date)s
    """, params, as_dict=True)
    so = so_stats[0] if so_stats else {}
    order_count = so.get("order_count") or 0
    converted_count = so.get("converted_count") or 0
    sales_conversion = {
        "order_count": order_count,
        "order_value": flt(so.get("order_value")),
        "billed_value": flt(so.get("billed_value")),
        "converted_count": converted_count,
        "conversion_rate_pct": (converted_count / order_count * 100) if order_count else 0,
        "value_conversion_pct": (flt(so.get("billed_value")) / flt(so.get("order_value")) * 100)
                                 if flt(so.get("order_value")) else 0,
    }

    return {
        "summary": summary,
        "product_wise": product_wise,
        "customer_wise": customer_wise,
        "salesperson_wise": salesperson_wise,
        "branch_wise": branch_wise,
        "sales_return": sales_return,
        "discount_analysis": discount_analysis,
        "sales_order_pending": sales_order_pending,
        "sales_conversion": sales_conversion,
    }


# ── Collection & Receivables MIS ────────────────────────────────────────────────

@frappe.whitelist()
def get_receivables_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Collection & Receivables MIS bundle, evaluated as of `to_date` (unpaid
    Sales Invoices don't carry a historical balance, only a current
    outstanding_amount): total receivables, customer-wise outstanding, a
    4-bucket ageing (0-30 / 31-60 / 61-90 / 90+ overdue days), overdue
    invoices, credit limit utilisation per customer, daily collections for
    the selected range, and collection efficiency for the period.

    "Collection Target vs Achievement" has no stored target (no Target
    doctype) — only the achieved collection figure is returned; the
    target itself is entered by the user in the UI and compared
    client-side.
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date, "as_of_date": to_date}

    # ---- Outstanding invoices (basis for outstanding/ageing/overdue) --------
    open_invoices = frappe.db.sql("""
        SELECT
            si.customer AS customer, si.customer_name AS customer_name,
            si.name AS invoice, si.posting_date AS posting_date, si.due_date AS due_date,
            si.outstanding_amount AS outstanding_amount,
            DATEDIFF(%(as_of_date)s, si.due_date) AS overdue_days
        FROM `tabSales Invoice` si
        WHERE si.company = %(company)s AND si.docstatus = 1
          AND si.outstanding_amount > 0
        ORDER BY si.customer, si.posting_date
    """, params, as_dict=True)

    # ---- Customer Outstanding -------------------------------------------------
    cust_map = {}
    for r in open_invoices:
        c = r["customer"]
        if c not in cust_map:
            cust_map[c] = {"customer": c, "customer_name": r.get("customer_name", c),
                            "invoice_count": 0, "outstanding_amount": 0, "oldest_due_date": r["due_date"]}
        cm = cust_map[c]
        cm["invoice_count"] += 1
        cm["outstanding_amount"] += flt(r["outstanding_amount"])
        if r["due_date"] and (not cm["oldest_due_date"] or r["due_date"] < cm["oldest_due_date"]):
            cm["oldest_due_date"] = r["due_date"]
    customer_outstanding = sorted(cust_map.values(), key=lambda x: x["outstanding_amount"], reverse=True)
    total_outstanding = sum(c["outstanding_amount"] for c in customer_outstanding)

    # ---- Ageing: 0-30 / 31-60 / 61-90 / 90+ (by overdue days, <=30 incl. not-yet-due) ----
    ageing_map = {}
    for r in open_invoices:
        c = r["customer"]
        if c not in ageing_map:
            ageing_map[c] = {"customer": c, "customer_name": r.get("customer_name", c),
                              "days_0_30": 0, "days_31_60": 0, "days_61_90": 0, "days_90_plus": 0, "total": 0}
        b = ageing_map[c]
        amt = flt(r["outstanding_amount"])
        days = r["overdue_days"] or 0
        if days <= 30:
            b["days_0_30"] += amt
        elif days <= 60:
            b["days_31_60"] += amt
        elif days <= 90:
            b["days_61_90"] += amt
        else:
            b["days_90_plus"] += amt
        b["total"] += amt
    ageing = sorted(ageing_map.values(), key=lambda x: x["total"], reverse=True)
    ageing_totals = {
        "days_0_30": sum(b["days_0_30"] for b in ageing),
        "days_31_60": sum(b["days_31_60"] for b in ageing),
        "days_61_90": sum(b["days_61_90"] for b in ageing),
        "days_90_plus": sum(b["days_90_plus"] for b in ageing),
        "total": sum(b["total"] for b in ageing),
    }

    # ---- Overdue Collection (overdue_days > 0) --------------------------------
    overdue_rows = sorted(
        [r for r in open_invoices if (r["overdue_days"] or 0) > 0],
        key=lambda r: r["overdue_days"] or 0, reverse=True,
    )
    overdue_total = sum(flt(r["outstanding_amount"]) for r in overdue_rows)

    # ---- Customer Credit Limit & Utilisation ----------------------------------
    customers = frappe.get_all(
        "Customer", filters={"disabled": 0}, fields=["name", "customer_name", "credit_limit"]
    )
    credit_util = []
    for cu in customers:
        limit = flt(cu.get("credit_limit"))
        outstanding = flt(cust_map.get(cu["name"], {}).get("outstanding_amount", 0))
        if limit <= 0 and outstanding <= 0:
            continue
        credit_util.append({
            "customer": cu["name"],
            "customer_name": cu.get("customer_name") or cu["name"],
            "credit_limit": limit,
            "outstanding_amount": outstanding,
            "utilisation_pct": (outstanding / limit * 100) if limit else None,
            "over_limit": limit > 0 and outstanding > limit,
        })
    credit_util.sort(key=lambda x: (x["utilisation_pct"] is None, -(x["utilisation_pct"] or 0)))

    # ---- Daily Collection (period) --------------------------------------------
    daily_rows = frappe.db.sql("""
        SELECT payment_date AS date, COUNT(name) AS count, SUM(paid_amount) AS amount
        FROM `tabPayment Entry`
        WHERE company = %(company)s AND docstatus = 1 AND payment_type = 'Receive'
          AND payment_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY payment_date
        ORDER BY payment_date
    """, params, as_dict=True)
    daily_by_date = {str(r["date"]): r for r in daily_rows}
    daily_collection = []
    d = getdate(from_date)
    end = getdate(to_date)
    while d <= end:
        r = daily_by_date.get(str(d), {})
        daily_collection.append({"date": str(d), "count": r.get("count") or 0, "amount": flt(r.get("amount"))})
        d = add_days(d, 1)
    period_collection_total = sum(r["amount"] for r in daily_collection)

    # ---- Collection Efficiency --------------------------------------------------
    # Efficiency % = Collections in period / (Opening Receivables + Sales in period)
    opening_sales = flt(frappe.db.sql("""
        SELECT SUM(grand_total) FROM `tabSales Invoice`
        WHERE company = %(company)s AND docstatus = 1 AND posting_date < %(from_date)s
    """, params)[0][0])
    opening_collections = flt(frappe.db.sql("""
        SELECT SUM(paid_amount) FROM `tabPayment Entry`
        WHERE company = %(company)s AND docstatus = 1 AND payment_type = 'Receive'
          AND payment_date < %(from_date)s
    """, params)[0][0])
    opening_receivables = opening_sales - opening_collections
    period_sales = flt(frappe.db.sql("""
        SELECT SUM(grand_total) FROM `tabSales Invoice`
        WHERE company = %(company)s AND docstatus = 1
          AND posting_date BETWEEN %(from_date)s AND %(to_date)s
    """, params)[0][0])
    receivable_pool = opening_receivables + period_sales
    collection_efficiency = {
        "opening_receivables": opening_receivables,
        "period_sales": period_sales,
        "period_collection": period_collection_total,
        "receivable_pool": receivable_pool,
        "efficiency_pct": (period_collection_total / receivable_pool * 100) if receivable_pool else 0,
        "closing_receivables": receivable_pool - period_collection_total,
    }

    return {
        "as_of_date": to_date,
        "total_outstanding": total_outstanding,
        "customer_outstanding": customer_outstanding,
        "ageing": ageing,
        "ageing_totals": ageing_totals,
        "overdue": {"rows": overdue_rows, "count": len(overdue_rows), "total": overdue_total},
        "credit_utilisation": credit_util,
        "daily_collection": {"days": daily_collection, "total": period_collection_total},
        "collection_efficiency": collection_efficiency,
    }


# ── Purchase MIS ─────────────────────────────────────────────────────────────

@frappe.whitelist()
def get_purchase_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Purchase MIS bundle for the given period: summary KPIs, supplier-wise and
    product-wise purchases, purchase price variance, pending Purchase Orders
    (not yet billed), pending Material Receipts (ordered but not yet
    received), and Purchase Return — all in one call so the Purchase MIS tab
    can switch between sub-views without re-querying.

    Purchase Returns are Purchase Invoices with is_return=1 (there is no
    separate Debit Note doctype), so Summary/Supplier-wise/Product-wise/Price
    Variance all filter is_return=0 to stay a like-for-like gross-purchases
    view, with returns broken out separately below (return line items store
    qty/amount as negative, shown here as positive return values).

    "Purchase Target / Budget vs Achievement" has no stored target/budget
    (no Target doctype) — only the achieved figure (grand_total) is returned
    here; the target itself is entered by the user in the UI and compared
    client-side.

    "Purchase Price Variance" compares each item's actual weighted-average
    purchase rate in the period against the Item master's Standard Buying
    Rate (the closest thing this app has to a budgeted/expected purchase
    rate); items with no Standard Buying Rate set are flagged rather than
    skipped.
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date}

    # ---- Summary ---------------------------------------------------------------
    summary_row = frappe.db.sql("""
        SELECT
            COUNT(pi.name)                       AS invoice_count,
            SUM(pi.net_total)                    AS net_purchases,
            SUM(pi.total_tax)                    AS total_tax,
            SUM(pi.additional_discount_amount)   AS header_discount,
            SUM(pi.grand_total)                  AS grand_total,
            SUM(pii.qty)                         AS total_qty
        FROM `tabPurchase Invoice` pi
        LEFT JOIN `tabPurchase Invoice Item` pii ON pii.parent = pi.name AND pii.parenttype = 'Purchase Invoice'
        WHERE pi.company = %(company)s AND pi.docstatus = 1 AND pi.is_return = 0
          AND pi.posting_date BETWEEN %(from_date)s AND %(to_date)s
    """, params, as_dict=True)
    s = summary_row[0] if summary_row else {}
    invoice_count = s.get("invoice_count") or 0
    grand_total   = flt(s.get("grand_total"))
    summary = {
        "invoice_count": invoice_count,
        "net_purchases": flt(s.get("net_purchases")),
        "total_tax": flt(s.get("total_tax")),
        "header_discount": flt(s.get("header_discount")),
        "grand_total": grand_total,
        "total_qty": flt(s.get("total_qty")),
        "avg_invoice_value": (grand_total / invoice_count) if invoice_count else 0,
    }

    # ---- Supplier-wise -----------------------------------------------------
    supplier_wise = frappe.db.sql("""
        SELECT
            pi.supplier AS supplier, pi.supplier_name AS supplier_name,
            COUNT(pi.name)              AS invoice_count,
            SUM(pi.grand_total)         AS total_amount,
            SUM(pi.outstanding_amount)  AS outstanding_amount
        FROM `tabPurchase Invoice` pi
        WHERE pi.company = %(company)s AND pi.docstatus = 1 AND pi.is_return = 0
          AND pi.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY pi.supplier, pi.supplier_name
        ORDER BY total_amount DESC
    """, params, as_dict=True)

    # ---- Product-wise --------------------------------------------------------
    product_wise = frappe.db.sql("""
        SELECT
            pii.item_code AS item_code, pii.item_name AS item_name, pii.uom AS uom,
            COUNT(DISTINCT pii.parent) AS invoice_count,
            SUM(pii.qty)               AS qty_purchased,
            SUM(pii.discount_amount)   AS total_discount,
            SUM(pii.amount)            AS total_amount
        FROM `tabPurchase Invoice Item` pii
        JOIN `tabPurchase Invoice` pi ON pi.name = pii.parent AND pii.parenttype = 'Purchase Invoice'
        WHERE pi.company = %(company)s AND pi.docstatus = 1 AND pi.is_return = 0
          AND pi.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY pii.item_code, pii.item_name, pii.uom
        ORDER BY total_amount DESC
    """, params, as_dict=True)

    # ---- Purchase Price Variance (actual weighted-avg rate vs Standard Buying Rate) ----
    ppv_rows = frappe.db.sql("""
        SELECT
            pii.item_code AS item_code, pii.item_name AS item_name, pii.uom AS uom,
            SUM(pii.qty)    AS qty_purchased,
            SUM(pii.amount) AS total_amount,
            i.standard_buying_rate AS standard_rate
        FROM `tabPurchase Invoice Item` pii
        JOIN `tabPurchase Invoice` pi ON pi.name = pii.parent AND pii.parenttype = 'Purchase Invoice'
        LEFT JOIN `tabItem` i ON i.name = pii.item_code
        WHERE pi.company = %(company)s AND pi.docstatus = 1 AND pi.is_return = 0
          AND pi.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY pii.item_code, pii.item_name, pii.uom, i.standard_buying_rate
        HAVING qty_purchased != 0
        ORDER BY total_amount DESC
    """, params, as_dict=True)
    price_variance = []
    for r in ppv_rows:
        qty = flt(r["qty_purchased"])
        actual_rate = (flt(r["total_amount"]) / qty) if qty else 0
        std_rate = flt(r.get("standard_rate"))
        has_std = std_rate > 0
        variance = (actual_rate - std_rate) if has_std else 0
        price_variance.append({
            "item_code": r["item_code"],
            "item_name": r["item_name"],
            "uom": r.get("uom"),
            "qty_purchased": qty,
            "actual_rate": actual_rate,
            "standard_rate": std_rate,
            "has_standard_rate": has_std,
            "variance": variance,
            "variance_pct": (variance / std_rate * 100) if has_std else 0,
            "variance_value": variance * qty,
        })
    price_variance.sort(key=lambda x: abs(x["variance_value"]), reverse=True)
    no_standard_rate_count = sum(1 for r in price_variance if not r["has_standard_rate"])

    # ---- Pending Purchase Orders (not yet fully billed, as of to_date) -------
    pending_orders = frappe.db.sql("""
        SELECT
            po.name AS purchase_order, po.transaction_date AS transaction_date,
            po.supplier AS supplier, po.supplier_name AS supplier_name,
            po.status AS status, po.grand_total AS grand_total,
            po.billed_amount AS billed_amount,
            (po.grand_total - COALESCE(po.billed_amount, 0)) AS pending_amount
        FROM `tabPurchase Order` po
        WHERE po.company = %(company)s
          AND po.status NOT IN ('Billed', 'Closed', 'Cancelled', 'Draft')
          AND po.transaction_date <= %(to_date)s
        ORDER BY po.transaction_date ASC
    """, params, as_dict=True)
    pending_orders_total = sum(flt(r["pending_amount"]) for r in pending_orders)
    pending_purchase_orders = {
        "rows": pending_orders,
        "order_count": len(pending_orders),
        "pending_total": pending_orders_total,
    }

    # ---- Pending Material Receipts (ordered but not yet received, as of to_date) ----
    pending_receipt_rows = frappe.db.sql("""
        SELECT
            po.name AS purchase_order, po.transaction_date AS transaction_date,
            po.supplier AS supplier, po.supplier_name AS supplier_name,
            po.status AS status,
            SUM(poi.qty)          AS ordered_qty,
            SUM(poi.received_qty) AS received_qty,
            SUM(poi.qty - COALESCE(poi.received_qty, 0)) AS pending_qty,
            SUM((poi.qty - COALESCE(poi.received_qty, 0)) * poi.rate) AS pending_value
        FROM `tabPurchase Order` po
        JOIN `tabPurchase Order Item` poi ON poi.parent = po.name AND poi.parenttype = 'Purchase Order'
        WHERE po.company = %(company)s
          AND po.status NOT IN ('Received', 'Billed', 'Closed', 'Cancelled', 'Draft')
          AND po.transaction_date <= %(to_date)s
        GROUP BY po.name, po.transaction_date, po.supplier, po.supplier_name, po.status
        HAVING pending_qty > 0
        ORDER BY po.transaction_date ASC
    """, params, as_dict=True)
    pending_receipt_value = sum(flt(r["pending_value"]) for r in pending_receipt_rows)
    pending_material_receipts = {
        "rows": pending_receipt_rows,
        "order_count": len(pending_receipt_rows),
        "pending_value": pending_receipt_value,
    }

    # ---- Purchase Return (Purchase Invoices with is_return=1) -----------------
    purchase_return_rows = frappe.db.sql("""
        SELECT
            pi.name AS debit_note, pi.posting_date AS posting_date,
            pi.supplier AS supplier, pi.supplier_name AS supplier_name,
            pi.return_against AS return_against, ABS(pi.grand_total) AS grand_total
        FROM `tabPurchase Invoice` pi
        WHERE pi.company = %(company)s AND pi.docstatus = 1 AND pi.is_return = 1
          AND pi.posting_date BETWEEN %(from_date)s AND %(to_date)s
        ORDER BY pi.posting_date DESC
    """, params, as_dict=True)
    purchase_return_total = sum(flt(r["grand_total"]) for r in purchase_return_rows)
    purchase_return = {
        "rows": purchase_return_rows,
        "return_count": len(purchase_return_rows),
        "return_total": purchase_return_total,
        "return_pct_of_purchases": (purchase_return_total / grand_total * 100) if grand_total else 0,
    }

    return {
        "summary": summary,
        "supplier_wise": supplier_wise,
        "product_wise": product_wise,
        "price_variance": price_variance,
        "no_standard_rate_count": no_standard_rate_count,
        "pending_purchase_orders": pending_purchase_orders,
        "pending_material_receipts": pending_material_receipts,
        "purchase_return": purchase_return,
    }


# ── Inventory MIS ────────────────────────────────────────────────────────────

@frappe.whitelist()
def get_inventory_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Inventory MIS bundle: Current Stock, Stock Value, Fast Moving, Slow
    Moving, Non-moving/Dead Stock, Stock Ageing, Reorder/Low Stock, Excess
    Stock, Stock Adjustment, and Stock Loss/Shortage — all in one call so the
    Inventory MIS tab can switch between sub-views without re-querying.

    This app has no per-lot ageing tracking, no Max Stock Level field, and
    no dedicated loss/shrinkage doctype, so several sub-views are necessarily
    approximated (flagged in the UI too):
      - Current Stock / Stock Value read the LIVE Bin balance (moving-average
        valuation) — not a value reconstructed as of `to_date`.
      - Fast Moving ranks items by quantity consumed (stock-out Stock Ledger
        Entries) within the selected from_date/to_date period.
      - Slow Moving / Non-moving (Dead Stock) are evaluated as of `to_date`
        regardless of the selected period, since dormancy is a longer-run
        question than one report period: Slow = last stock-out 30-180 days
        before `to_date`, Dead = last stock-out >180 days before `to_date`
        or never — both require current stock on hand.
      - Stock Ageing has no per-lot FIFO remaining-qty tracking; each item+
        warehouse's stock is aged by days since its most recent stock-IN
        movement (as of `to_date`), bucketed 0-30/31-60/61-90/90+ by value,
        the same way AR/AP Ageing buckets outstanding invoices.
      - Excess Stock has no Max Stock Level field to compare against; it is
        approximated from days-of-cover — current qty ÷ trailing 90-day
        average daily consumption ending at `to_date` — flagged when cover
        exceeds 180 days. Items with no consumption in that window are
        excluded here since they're already covered under Dead Stock.
      - Reorder / Low Stock uses each Bin's own reorder_level/reorder_qty
        (per item+warehouse), matching the existing Stock Summary report.
      - Stock Adjustment / Stock Loss & Shortage read only 'Stock Adjustment'
        type Stock Entries (manual physical-count corrections): positive qty
        = excess found, negative qty = shortage/loss found. This does not
        include Manufacturing Variance Loss, which is tracked separately on
        Work Orders.
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date}
    to_date_d = getdate(to_date)

    # ---- Current Stock (live Bin snapshot) -------------------------------------
    current_stock = frappe.db.sql("""
        SELECT
            b.item_code AS item_code, i.item_name AS item_name, b.warehouse AS warehouse,
            b.stock_uom AS uom, b.actual_qty AS actual_qty,
            b.valuation_rate AS valuation_rate, b.stock_value AS stock_value
        FROM `tabBin` b
        INNER JOIN `tabWarehouse` w ON w.name = b.warehouse
        INNER JOIN `tabItem` i ON i.name = b.item_code
        WHERE w.company = %(company)s AND b.actual_qty != 0
        ORDER BY b.stock_value DESC
    """, params, as_dict=True)
    current_stock_qty   = sum(flt(r["actual_qty"]) for r in current_stock)
    current_stock_value = sum(flt(r["stock_value"]) for r in current_stock)

    # ---- Stock Value (grouped by warehouse) ------------------------------------
    stock_value_by_wh = frappe.db.sql("""
        SELECT b.warehouse AS warehouse, COUNT(DISTINCT b.item_code) AS item_count,
               SUM(b.actual_qty) AS total_qty, SUM(b.stock_value) AS stock_value
        FROM `tabBin` b
        INNER JOIN `tabWarehouse` w ON w.name = b.warehouse
        WHERE w.company = %(company)s AND b.actual_qty != 0
        GROUP BY b.warehouse
        ORDER BY stock_value DESC
    """, params, as_dict=True)
    stock_value = {
        "by_warehouse": stock_value_by_wh,
        "grand_total": sum(flt(r["stock_value"]) for r in stock_value_by_wh),
        "top_items": current_stock[:20],
    }

    # ---- Per-item stock aggregated across warehouses (basis for the movement tabs) ----
    stock_by_item = frappe.db.sql("""
        SELECT b.item_code AS item_code, i.item_name AS item_name,
               SUM(b.actual_qty) AS actual_qty, SUM(b.stock_value) AS stock_value
        FROM `tabBin` b
        INNER JOIN `tabWarehouse` w ON w.name = b.warehouse
        INNER JOIN `tabItem` i ON i.name = b.item_code
        WHERE w.company = %(company)s AND b.actual_qty > 0
        GROUP BY b.item_code, i.item_name
    """, params, as_dict=True)

    # ---- Consumption within the selected period (basis for Fast Moving) -------
    consumption_period = frappe.db.sql("""
        SELECT sle.item_code AS item_code,
               SUM(CASE WHEN sle.actual_qty < 0 THEN -sle.actual_qty ELSE 0 END) AS qty_out,
               COUNT(CASE WHEN sle.actual_qty < 0 THEN 1 END) AS out_txns
        FROM `tabStock Ledger Entry` sle
        WHERE sle.company = %(company)s AND IFNULL(sle.is_cancelled, 0) = 0
          AND sle.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY sle.item_code
    """, params, as_dict=True)
    item_name_map = {r["item_code"]: r["item_name"] for r in stock_by_item}

    fast_moving = []
    for c in consumption_period:
        qty_out = flt(c.get("qty_out"))
        if qty_out <= 0:
            continue
        code = c["item_code"]
        current_qty = next((flt(x["actual_qty"]) for x in stock_by_item if x["item_code"] == code), 0)
        fast_moving.append({
            "item_code": code,
            "item_name": item_name_map.get(code, code),
            "qty_consumed": qty_out,
            "transactions": c.get("out_txns") or 0,
            "current_qty": current_qty,
        })
    fast_moving.sort(key=lambda x: x["qty_consumed"], reverse=True)
    fast_moving = fast_moving[:50]

    # ---- Last stock-out date per item, as of to_date (basis for Slow/Dead) ----
    last_out_rows = frappe.db.sql("""
        SELECT sle.item_code AS item_code, MAX(sle.posting_date) AS last_out_date
        FROM `tabStock Ledger Entry` sle
        WHERE sle.company = %(company)s AND IFNULL(sle.is_cancelled, 0) = 0
          AND sle.actual_qty < 0 AND sle.posting_date <= %(to_date)s
        GROUP BY sle.item_code
    """, params, as_dict=True)
    last_out_map = {r["item_code"]: r["last_out_date"] for r in last_out_rows}

    # ---- Slow Moving / Non-moving (Dead Stock) ---------------------------------
    slow_moving = []
    dead_stock = []
    for st in stock_by_item:
        code = st["item_code"]
        last_date = last_out_map.get(code)
        days_since = (to_date_d - getdate(last_date)).days if last_date else None
        row = {
            "item_code": code,
            "item_name": st["item_name"],
            "actual_qty": flt(st["actual_qty"]),
            "stock_value": flt(st["stock_value"]),
            "last_movement_date": str(last_date) if last_date else None,
            "days_since_movement": days_since,
        }
        if days_since is None or days_since > 180:
            dead_stock.append(row)
        elif days_since > 30:
            slow_moving.append(row)
    slow_moving.sort(key=lambda x: x["days_since_movement"], reverse=True)
    dead_stock.sort(key=lambda x: x["stock_value"], reverse=True)
    dead_stock_total_value = sum(r["stock_value"] for r in dead_stock)

    # ---- Stock Ageing (proxy: days since most recent stock-IN, bucketed by value) ----
    last_in_rows = frappe.db.sql("""
        SELECT sle.item_code AS item_code, sle.warehouse AS warehouse,
               MAX(sle.posting_date) AS last_in_date
        FROM `tabStock Ledger Entry` sle
        WHERE sle.company = %(company)s AND IFNULL(sle.is_cancelled, 0) = 0
          AND sle.actual_qty > 0 AND sle.posting_date <= %(to_date)s
        GROUP BY sle.item_code, sle.warehouse
    """, params, as_dict=True)
    last_in_map = {(r["item_code"], r["warehouse"]): r["last_in_date"] for r in last_in_rows}

    ageing_rows = []
    for r in current_stock:
        last_in_date = last_in_map.get((r["item_code"], r["warehouse"]))
        age_days = (to_date_d - getdate(last_in_date)).days if last_in_date else None
        ageing_rows.append({
            "item_code": r["item_code"], "item_name": r["item_name"], "warehouse": r["warehouse"],
            "actual_qty": flt(r["actual_qty"]), "stock_value": flt(r["stock_value"]),
            "last_receipt_date": str(last_in_date) if last_in_date else None,
            "age_days": age_days,
        })
    ageing_totals = {"days_0_30": 0.0, "days_31_60": 0.0, "days_61_90": 0.0, "days_90_plus": 0.0}
    for r in ageing_rows:
        d, v = r["age_days"], r["stock_value"]
        if d is None or d > 90:
            ageing_totals["days_90_plus"] += v
        elif d > 60:
            ageing_totals["days_61_90"] += v
        elif d > 30:
            ageing_totals["days_31_60"] += v
        else:
            ageing_totals["days_0_30"] += v
    ageing_totals["total"] = sum(ageing_totals.values())
    ageing_rows.sort(key=lambda x: (x["age_days"] is None, -(x["age_days"] or 0)))

    # ---- Reorder / Low Stock (Bin-level, per item+warehouse) -------------------
    reorder_rows = frappe.db.sql("""
        SELECT b.item_code AS item_code, i.item_name AS item_name, b.warehouse AS warehouse,
               b.actual_qty AS actual_qty, b.reorder_level AS reorder_level, b.reorder_qty AS reorder_qty
        FROM `tabBin` b
        INNER JOIN `tabWarehouse` w ON w.name = b.warehouse
        INNER JOIN `tabItem` i ON i.name = b.item_code
        WHERE w.company = %(company)s AND b.reorder_level > 0 AND b.actual_qty <= b.reorder_level
        ORDER BY (b.reorder_level - b.actual_qty) DESC
    """, params, as_dict=True)
    for r in reorder_rows:
        r["shortage_qty"] = max(flt(r["reorder_level"]) - flt(r["actual_qty"]), 0)
    reorder_low_stock = {"rows": reorder_rows, "item_count": len(reorder_rows)}

    # ---- Excess Stock (days-of-cover from trailing 90-day consumption) --------
    trail_from = str(add_days(to_date_d, -90))
    trail_consumption = frappe.db.sql("""
        SELECT sle.item_code AS item_code,
               SUM(CASE WHEN sle.actual_qty < 0 THEN -sle.actual_qty ELSE 0 END) AS qty_out_90d
        FROM `tabStock Ledger Entry` sle
        WHERE sle.company = %(company)s AND IFNULL(sle.is_cancelled, 0) = 0
          AND sle.posting_date BETWEEN %(trail_from)s AND %(to_date)s
        GROUP BY sle.item_code
    """, {"company": company, "trail_from": trail_from, "to_date": to_date}, as_dict=True)
    trail_map = {r["item_code"]: flt(r["qty_out_90d"]) for r in trail_consumption}

    excess_stock = []
    for st in stock_by_item:
        code = st["item_code"]
        qty_out_90d = trail_map.get(code, 0)
        if qty_out_90d <= 0:
            continue  # no measurable consumption to size "excess" against — see Dead Stock instead
        avg_daily = qty_out_90d / 90.0
        actual_qty = flt(st["actual_qty"])
        days_of_cover = actual_qty / avg_daily if avg_daily else None
        if days_of_cover is None or days_of_cover <= 180:
            continue
        excess_qty = max(actual_qty - (avg_daily * 180), 0)
        rate = (flt(st["stock_value"]) / actual_qty) if actual_qty else 0
        excess_stock.append({
            "item_code": code, "item_name": st["item_name"],
            "actual_qty": actual_qty, "avg_daily_consumption": round(avg_daily, 3),
            "days_of_cover": round(days_of_cover, 1),
            "excess_qty": round(excess_qty, 2),
            "excess_value": round(excess_qty * rate, 2),
        })
    excess_stock.sort(key=lambda x: x["excess_value"], reverse=True)
    excess_stock_total_value = sum(r["excess_value"] for r in excess_stock)

    # ---- Stock Adjustment (all 'Stock Adjustment' Stock Entries in the period) --
    adjustment_rows = frappe.db.sql("""
        SELECT se.name AS stock_entry, se.posting_date AS posting_date,
               sed.item_code AS item_code, sed.item_name AS item_name, sed.t_warehouse AS warehouse,
               sed.qty AS qty, sed.basic_rate AS rate, sed.amount AS value,
               se.adjustment_reason AS reason, se.remarks AS remarks
        FROM `tabStock Entry Detail` sed
        JOIN `tabStock Entry` se ON se.name = sed.parent AND sed.parenttype = 'Stock Entry'
        WHERE se.company = %(company)s AND se.docstatus = 1
          AND se.stock_entry_type = 'Stock Adjustment'
          AND se.posting_date BETWEEN %(from_date)s AND %(to_date)s
        ORDER BY se.posting_date DESC
    """, params, as_dict=True)
    increase_rows = [r for r in adjustment_rows if flt(r["qty"]) > 0]
    decrease_rows = [r for r in adjustment_rows if flt(r["qty"]) < 0]
    stock_adjustment = {
        "rows": adjustment_rows,
        "entry_count": len(adjustment_rows),
        "increase_count": len(increase_rows),
        "increase_value": sum(flt(r["value"]) for r in increase_rows),
        "decrease_count": len(decrease_rows),
        "decrease_value": sum(abs(flt(r["value"])) for r in decrease_rows),
        "net_value": sum(flt(r["value"]) for r in adjustment_rows),
    }

    # ---- Stock Loss / Shortage (negative-qty Stock Adjustment entries) ---------
    loss_rows = [dict(r, qty=abs(flt(r["qty"])), value=abs(flt(r["value"]))) for r in decrease_rows]
    stock_loss = {
        "rows": loss_rows,
        "loss_count": len(loss_rows),
        "loss_qty": sum(r["qty"] for r in loss_rows),
        "loss_value": sum(r["value"] for r in loss_rows),
    }

    return {
        "current_stock": {"rows": current_stock, "total_qty": current_stock_qty, "total_value": current_stock_value},
        "stock_value": stock_value,
        "fast_moving": fast_moving,
        "slow_moving": slow_moving,
        "dead_stock": {"rows": dead_stock, "total_value": dead_stock_total_value},
        "stock_ageing": {"rows": ageing_rows, "totals": ageing_totals},
        "reorder_low_stock": reorder_low_stock,
        "excess_stock": {"rows": excess_stock, "total_value": excess_stock_total_value},
        "stock_adjustment": stock_adjustment,
        "stock_loss": stock_loss,
    }


# ── Production MIS ───────────────────────────────────────────────────────────

@frappe.whitelist()
def get_production_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Production MIS bundle: Production Plan vs Actual, Production Pending, WIP
    Status, Raw Material Availability, Material Consumption, Material
    Variance, Production Cost, Production Efficiency, Rejection/Rework, and
    Scrap/Wastage — all in one call so the Production MIS tab can switch
    between sub-views without re-querying.

    This app has no dedicated production-costing ledger and no per-lot
    rejection doctype, so several sub-views are necessarily approximated
    (flagged in the UI too):
      - Production Plan vs Actual matches each Production Plan posted in the
        period to the Work Orders it spawned (Work Order.production_plan)
        and sums their produced_qty against the plan's planned_qty.
      - Production Pending / WIP Status read the LIVE Work Order snapshot
        (qty vs produced_qty) as of now, not reconstructed as of `to_date`,
        since this app has no work-order-history table.
      - Raw Material Availability compares each open Work Order's
        still-to-issue qty (required_qty - transferred_qty) against the
        LIVE Bin balance at its source warehouse — a current shortage view,
        not scoped to the selected period.
      - Material Consumption / Production Cost / Material Variance /
        Rejection / Scrap read 'Manufacture' type Stock Entries posted
        within the selected from_date/to_date period (the only place
        actual material movement against a Work Order is recorded).
      - Production Efficiency compares planned vs actual operation time on
        Work Order Operations for Work Orders whose planned schedule
        overlaps the selected period (no per-period time log split exists).
      - Rejection / Rework uses Job Card Scrap Items not flagged as process
        loss (is_process_loss = 0) — pieces produced defective that may be
        reworked — for Job Cards completed within the period.
      - Scrap / Wastage uses Stock Entry Detail rows flagged is_scrap_item
        on 'Manufacture' entries in the period, plus each entry's
        process_loss_qty / manufacturing_variance_loss (yield loss), which
        is distinct from Rejection/Rework above.
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date}
    to_date_d = getdate(to_date)

    # ---- Production Plan vs Actual --------------------------------------------
    pp_items = frappe.db.sql("""
        SELECT pp.name AS production_plan, pp.posting_date AS posting_date,
               ppi.item_code AS item_code, ppi.item_name AS item_name,
               ppi.planned_qty AS planned_qty, ppi.stock_uom AS uom
        FROM `tabProduction Plan Item` ppi
        JOIN `tabProduction Plan` pp ON pp.name = ppi.parent AND ppi.parenttype = 'Production Plan'
        WHERE pp.company = %(company)s AND pp.docstatus = 1
          AND pp.posting_date BETWEEN %(from_date)s AND %(to_date)s
        ORDER BY pp.posting_date DESC
    """, params, as_dict=True)
    wo_by_plan = frappe.db.sql("""
        SELECT production_plan, production_item AS item_code,
               SUM(qty) AS planned_wo_qty, SUM(produced_qty) AS produced_qty
        FROM `tabWork Order`
        WHERE company = %(company)s AND docstatus = 1 AND IFNULL(production_plan, '') != ''
        GROUP BY production_plan, production_item
    """, {"company": company}, as_dict=True)
    wo_map = {(r["production_plan"], r["item_code"]): r for r in wo_by_plan}

    plan_vs_actual = []
    for r in pp_items:
        wo = wo_map.get((r["production_plan"], r["item_code"]), {})
        produced = flt(wo.get("produced_qty"))
        planned = flt(r["planned_qty"])
        variance_qty = produced - planned
        plan_vs_actual.append({
            "production_plan": r["production_plan"],
            "posting_date": str(r["posting_date"]),
            "item_code": r["item_code"],
            "item_name": r["item_name"],
            "uom": r["uom"],
            "planned_qty": planned,
            "produced_qty": produced,
            "variance_qty": round(variance_qty, 2),
            "variance_pct": round((variance_qty / planned * 100), 1) if planned else None,
        })
    plan_vs_actual_totals = {
        "planned_qty": sum(r["planned_qty"] for r in plan_vs_actual),
        "produced_qty": sum(r["produced_qty"] for r in plan_vs_actual),
    }

    # ---- Production Pending (live Work Order snapshot) -------------------------
    pending_rows = frappe.db.sql("""
        SELECT name AS work_order, production_item AS item_code, item_name AS item_name,
               status, qty AS qty, produced_qty AS produced_qty, stock_uom AS uom,
               planned_start_date AS planned_start_date, planned_end_date AS planned_end_date
        FROM `tabWork Order`
        WHERE company = %(company)s AND docstatus = 1
          AND status IN ('Submitted', 'In Process', 'Stopped')
          AND qty > produced_qty
        ORDER BY planned_end_date ASC
    """, {"company": company}, as_dict=True)
    for r in pending_rows:
        r["pending_qty"] = round(flt(r["qty"]) - flt(r["produced_qty"]), 2)
        r["overdue"] = bool(r["planned_end_date"] and getdate(r["planned_end_date"]) < to_date_d)
    production_pending = {
        "rows": pending_rows,
        "pending_qty_total": sum(r["pending_qty"] for r in pending_rows),
        "overdue_count": sum(1 for r in pending_rows if r["overdue"]),
    }

    # ---- WIP Status (live Work Order snapshot, status = In Process) -----------
    wip_rows = frappe.db.sql("""
        SELECT wo.name AS work_order, wo.production_item AS item_code, wo.item_name AS item_name,
               wo.qty AS qty, wo.produced_qty AS produced_qty, wo.stock_uom AS uom,
               wo.wip_warehouse AS wip_warehouse, wo.planned_start_date AS planned_start_date,
               wo.planned_end_date AS planned_end_date
        FROM `tabWork Order` wo
        WHERE wo.company = %(company)s AND wo.docstatus = 1 AND wo.status = 'In Process'
        ORDER BY wo.planned_end_date ASC
    """, {"company": company}, as_dict=True)
    wip_wh_value = frappe.db.sql("""
        SELECT b.warehouse AS warehouse, SUM(b.stock_value) AS stock_value
        FROM `tabBin` b
        INNER JOIN `tabWarehouse` w ON w.name = b.warehouse
        WHERE w.company = %(company)s
        GROUP BY b.warehouse
    """, {"company": company}, as_dict=True)
    wip_wh_value_map = {r["warehouse"]: flt(r["stock_value"]) for r in wip_wh_value}
    for r in wip_rows:
        r["pct_complete"] = round((flt(r["produced_qty"]) / flt(r["qty"]) * 100), 1) if flt(r["qty"]) else 0
        r["wip_stock_value"] = wip_wh_value_map.get(r["wip_warehouse"], 0)
    wip_status = {
        "rows": wip_rows,
        "wo_count": len(wip_rows),
        "wip_value_total": sum(r["wip_stock_value"] for r in wip_rows),
    }

    # ---- Raw Material Availability (live shortage against open Work Orders) ---
    open_wo_items = frappe.db.sql("""
        SELECT wo.name AS work_order, wo.production_item AS fg_item, wo.status AS status,
               woi.item_code AS item_code, woi.item_name AS item_name,
               woi.required_qty AS required_qty, woi.transferred_qty AS transferred_qty,
               woi.source_warehouse AS source_warehouse
        FROM `tabWork Order Item` woi
        JOIN `tabWork Order` wo ON wo.name = woi.parent AND woi.parenttype = 'Work Order'
        WHERE wo.company = %(company)s AND wo.docstatus = 1
          AND wo.status IN ('Submitted', 'In Process', 'Stopped')
          AND IFNULL(woi.is_scrap_row, 0) = 0
    """, {"company": company}, as_dict=True)
    bin_qty = frappe.db.sql("""
        SELECT b.item_code AS item_code, b.warehouse AS warehouse, b.actual_qty AS actual_qty
        FROM `tabBin` b
        INNER JOIN `tabWarehouse` w ON w.name = b.warehouse
        WHERE w.company = %(company)s
    """, {"company": company}, as_dict=True)
    bin_map = {(r["item_code"], r["warehouse"]): flt(r["actual_qty"]) for r in bin_qty}

    material_availability = []
    for r in open_wo_items:
        still_to_issue = max(flt(r["required_qty"]) - flt(r["transferred_qty"]), 0)
        if still_to_issue <= 0:
            continue
        available_qty = bin_map.get((r["item_code"], r["source_warehouse"]), 0)
        shortage_qty = max(still_to_issue - available_qty, 0)
        if shortage_qty <= 0:
            continue
        material_availability.append({
            "work_order": r["work_order"], "fg_item": r["fg_item"], "status": r["status"],
            "item_code": r["item_code"], "item_name": r["item_name"] or r["item_code"],
            "warehouse": r["source_warehouse"],
            "still_to_issue": round(still_to_issue, 2),
            "available_qty": round(available_qty, 2),
            "shortage_qty": round(shortage_qty, 2),
        })
    material_availability.sort(key=lambda x: x["shortage_qty"], reverse=True)
    raw_material_availability = {
        "rows": material_availability,
        "shortage_count": len(material_availability),
    }

    # ---- Manufacture-type Stock Entries in the period (basis for several tabs) --
    mfg_entries = frappe.db.sql("""
        SELECT se.name AS stock_entry, se.posting_date AS posting_date, se.work_order AS work_order,
               se.manufacturing_variance_loss AS manufacturing_variance_loss,
               se.process_loss_qty AS process_loss_qty, se.total_outgoing_value AS total_outgoing_value,
               se.total_incoming_value AS total_incoming_value
        FROM `tabStock Entry` se
        WHERE se.company = %(company)s AND se.docstatus = 1 AND se.stock_entry_type = 'Manufacture'
          AND se.posting_date BETWEEN %(from_date)s AND %(to_date)s
    """, params, as_dict=True)
    mfg_names = [r["stock_entry"] for r in mfg_entries]
    wo_of_entry = {r["stock_entry"]: r["work_order"] for r in mfg_entries}

    mfg_items = []
    if mfg_names:
        mfg_items = frappe.db.sql("""
            SELECT sed.parent AS stock_entry, sed.item_code AS item_code, sed.item_name AS item_name,
                   sed.qty AS qty, sed.basic_rate AS rate, sed.amount AS amount,
                   sed.s_warehouse AS s_warehouse, sed.t_warehouse AS t_warehouse,
                   IFNULL(sed.is_scrap_item, 0) AS is_scrap_item
            FROM `tabStock Entry Detail` sed
            WHERE sed.parent IN %(names)s AND sed.parenttype = 'Stock Entry'
        """, {"names": mfg_names}, as_dict=True)

    # ---- Material Consumption (raw materials issued out on Manufacture entries) --
    consumed_by_item: dict = {}
    for r in mfg_items:
        if not r["s_warehouse"] or r["is_scrap_item"]:
            continue
        key = (r["item_code"], r["item_name"])
        c = consumed_by_item.setdefault(key, {"qty": 0.0, "value": 0.0, "txns": 0})
        c["qty"] += flt(r["qty"])
        c["value"] += flt(r["amount"])
        c["txns"] += 1
    material_consumption = [
        {"item_code": k[0], "item_name": k[1] or k[0], "qty_consumed": round(v["qty"], 2),
         "value_consumed": round(v["value"], 2), "transactions": v["txns"]}
        for k, v in consumed_by_item.items()
    ]
    material_consumption.sort(key=lambda x: x["value_consumed"], reverse=True)
    material_consumption_total = sum(r["value_consumed"] for r in material_consumption)

    # ---- Material Variance (required vs consumed, for Work Orders touched this period) --
    wo_touched = sorted({wo for wo in wo_of_entry.values() if wo})
    variance_rows = []
    if wo_touched:
        woi_rows = frappe.db.sql("""
            SELECT woi.parent AS work_order, woi.item_code AS item_code, woi.item_name AS item_name,
                   woi.required_qty AS required_qty, woi.consumed_qty AS consumed_qty, woi.rate AS rate
            FROM `tabWork Order Item` woi
            WHERE woi.parent IN %(names)s AND woi.parenttype = 'Work Order'
              AND IFNULL(woi.is_scrap_row, 0) = 0
        """, {"names": wo_touched}, as_dict=True)
        for r in woi_rows:
            variance_qty = flt(r["consumed_qty"]) - flt(r["required_qty"])
            if variance_qty == 0:
                continue
            variance_rows.append({
                "work_order": r["work_order"], "item_code": r["item_code"],
                "item_name": r["item_name"] or r["item_code"],
                "required_qty": flt(r["required_qty"]), "consumed_qty": flt(r["consumed_qty"]),
                "variance_qty": round(variance_qty, 2),
                "variance_value": round(variance_qty * flt(r["rate"]), 2),
            })
    variance_rows.sort(key=lambda x: abs(x["variance_value"]), reverse=True)
    material_variance = {
        "rows": variance_rows,
        "net_variance_value": sum(r["variance_value"] for r in variance_rows),
    }

    # ---- Production Cost (material consumed + operating cost, per Work Order) --
    wo_cost_rows = []
    if wo_touched:
        wo_hdr = frappe.db.sql("""
            SELECT name AS work_order, production_item AS item_code, item_name AS item_name,
                   produced_qty AS produced_qty, actual_operating_cost AS actual_operating_cost,
                   bom AS bom
            FROM `tabWork Order`
            WHERE name IN %(names)s
        """, {"names": wo_touched}, as_dict=True)
        material_value_by_wo: dict = {}
        for r in mfg_items:
            if not r["s_warehouse"] or r["is_scrap_item"]:
                continue
            wo = wo_of_entry.get(r["stock_entry"])
            if not wo:
                continue
            material_value_by_wo[wo] = material_value_by_wo.get(wo, 0.0) + flt(r["amount"])
        bom_names = list({r["bom"] for r in wo_hdr if r["bom"]})
        bom_std = {}
        if bom_names:
            bom_rows = frappe.db.sql("""
                SELECT name AS bom, total_cost AS total_cost, quantity AS quantity
                FROM `tabBOM` WHERE name IN %(names)s
            """, {"names": bom_names}, as_dict=True)
            bom_std = {r["bom"]: (flt(r["total_cost"]) / flt(r["quantity"])) if flt(r["quantity"]) else 0 for r in bom_rows}
        for r in wo_hdr:
            produced = flt(r["produced_qty"])
            material_value = material_value_by_wo.get(r["work_order"], 0.0)
            op_cost = flt(r["actual_operating_cost"])
            actual_total = material_value + op_cost
            actual_per_unit = (actual_total / produced) if produced else None
            std_per_unit = bom_std.get(r["bom"])
            wo_cost_rows.append({
                "work_order": r["work_order"], "item_code": r["item_code"],
                "item_name": r["item_name"] or r["item_code"], "produced_qty": produced,
                "material_value": round(material_value, 2), "operating_cost": round(op_cost, 2),
                "actual_total_cost": round(actual_total, 2),
                "actual_cost_per_unit": round(actual_per_unit, 2) if actual_per_unit is not None else None,
                "standard_cost_per_unit": round(std_per_unit, 2) if std_per_unit else None,
                "cost_variance_per_unit": round(actual_per_unit - std_per_unit, 2)
                    if (actual_per_unit is not None and std_per_unit) else None,
            })
    wo_cost_rows.sort(key=lambda x: x["actual_total_cost"], reverse=True)
    production_cost = {
        "rows": wo_cost_rows,
        "total_material_value": sum(r["material_value"] for r in wo_cost_rows),
        "total_operating_cost": sum(r["operating_cost"] for r in wo_cost_rows),
        "total_cost": sum(r["actual_total_cost"] for r in wo_cost_rows),
    }

    # ---- Production Efficiency (planned vs actual operation time) -------------
    eff_wo = frappe.db.sql("""
        SELECT name AS work_order, production_item AS item_code, item_name AS item_name, status
        FROM `tabWork Order`
        WHERE company = %(company)s AND docstatus = 1
          AND IFNULL(planned_start_date, '1900-01-01') <= %(to_date)s
          AND IFNULL(planned_end_date, '2999-12-31') >= %(from_date)s
    """, params, as_dict=True)
    eff_wo_names = [r["work_order"] for r in eff_wo]
    efficiency_rows = []
    if eff_wo_names:
        op_rows = frappe.db.sql("""
            SELECT parent AS work_order,
                   SUM(planned_time_in_mins) AS planned_mins, SUM(actual_time_in_mins) AS actual_mins
            FROM `tabWork Order Operation`
            WHERE parent IN %(names)s AND parenttype = 'Work Order'
            GROUP BY parent
        """, {"names": eff_wo_names}, as_dict=True)
        op_map = {r["work_order"]: r for r in op_rows}
        wo_info = {r["work_order"]: r for r in eff_wo}
        for wo, op in op_map.items():
            planned_mins = flt(op["planned_mins"])
            actual_mins = flt(op["actual_mins"])
            if planned_mins <= 0 or actual_mins <= 0:
                continue
            info = wo_info.get(wo, {})
            efficiency_rows.append({
                "work_order": wo, "item_code": info.get("item_code"),
                "item_name": info.get("item_name") or info.get("item_code"),
                "status": info.get("status"),
                "planned_mins": round(planned_mins, 1), "actual_mins": round(actual_mins, 1),
                "efficiency_pct": round(planned_mins / actual_mins * 100, 1),
            })
    efficiency_rows.sort(key=lambda x: x["efficiency_pct"])
    production_efficiency = {
        "rows": efficiency_rows,
        "avg_efficiency_pct": round(
            sum(r["efficiency_pct"] for r in efficiency_rows) / len(efficiency_rows), 1
        ) if efficiency_rows else None,
    }

    # ---- Rejection / Rework (Job Card scrap items not flagged as process loss) --
    jc_rows = frappe.db.sql("""
        SELECT jc.name AS job_card, jc.work_order AS work_order, jc.operation AS operation,
               jci.item_code AS item_code, jci.item_name AS item_name,
               jci.qty AS qty, jci.rate AS rate, jci.amount AS amount
        FROM `tabJob Card Scrap Item` jci
        JOIN `tabJob Card` jc ON jc.name = jci.parent AND jci.parenttype = 'Job Card'
        WHERE jc.company = %(company)s AND IFNULL(jci.is_process_loss, 0) = 0
          AND jc.actual_end_time IS NOT NULL
          AND DATE(jc.actual_end_time) BETWEEN %(from_date)s AND %(to_date)s
    """, params, as_dict=True)
    rejection_rework = {
        "rows": jc_rows,
        "qty_total": sum(flt(r["qty"]) for r in jc_rows),
        "value_total": sum(flt(r["amount"]) for r in jc_rows),
    }

    # ---- Scrap / Wastage (scrap stock-entry rows + process/yield loss) --------
    scrap_rows = [r for r in mfg_items if r["is_scrap_item"]]
    for r in scrap_rows:
        r["work_order"] = wo_of_entry.get(r.get("stock_entry"))
    yield_loss_total = sum(flt(r["process_loss_qty"]) for r in mfg_entries)
    variance_loss_value = sum(flt(r["manufacturing_variance_loss"]) for r in mfg_entries)
    scrap_wastage = {
        "rows": scrap_rows,
        "scrap_qty_total": sum(flt(r["qty"]) for r in scrap_rows),
        "scrap_value_total": sum(flt(r["amount"]) for r in scrap_rows),
        "process_loss_qty_total": yield_loss_total,
        "manufacturing_variance_loss_value": variance_loss_value,
    }

    return {
        "plan_vs_actual": {"rows": plan_vs_actual, "totals": plan_vs_actual_totals},
        "production_pending": production_pending,
        "wip_status": wip_status,
        "raw_material_availability": raw_material_availability,
        "material_consumption": {"rows": material_consumption, "total_value": material_consumption_total},
        "material_variance": material_variance,
        "production_cost": production_cost,
        "production_efficiency": production_efficiency,
        "rejection_rework": rejection_rework,
        "scrap_wastage": scrap_wastage,
    }


# ── Product MIS ───────────────────────────────────────────────────────────────

@frappe.whitelist()
def get_product_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Product MIS bundle: Product-wise Sales, Profit, Cost, Margin %,
    Production, Stock, Wastage, Top Selling and Low Selling Products — all
    in one call so the Product MIS tab can switch between sub-views
    without re-querying.

    Cost basis (Sales, Profit, Cost, Margin) matches get_profit_wise_report():
    current average valuation rate per item from the Bin table (sellable
    warehouses only, WIP warehouses excluded), falling back to the item's
    standard_buying_rate. This is a current-cost estimate, not a
    historical/FIFO cost at the time of each sale, since Sales Invoice Item
    does not itself store a cost field.

    Production reads finished-goods receipts (t_warehouse set, not a scrap
    row) on 'Manufacture' type Stock Entries posted within the period.
    Wastage reads scrap-flagged rows (is_scrap_item = 1) on those same
    entries — this app has no separate rejection ledger, so scrap recorded
    at the stock-entry level is the only period-scoped wastage signal.
    Stock reads the LIVE Bin balance, not reconstructed as of `to_date`.
    Top/Low Selling rank only items that had at least one sale in the
    period; items never sold in the period don't appear in either list.
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date}

    wip_warehouses = set(
        frappe.get_all("Work Order", filters={"wip_warehouse": ["is", "set"]}, pluck="wip_warehouse")
    )
    default_wip = frappe.db.get_single_value("Manufacturing Settings", "default_wip_warehouse")
    if default_wip:
        wip_warehouses.add(default_wip)
    wip_cond = ""
    cost_params = dict(params)
    if wip_warehouses:
        wip_cond = "AND b.warehouse NOT IN %(wip_warehouses)s"
        cost_params["wip_warehouses"] = tuple(wip_warehouses)

    # ---- Base: per-item sales + cost + profit + margin for the period ---------
    sales_rows = frappe.db.sql(f"""
        SELECT
            sii.item_code                        AS item_code,
            sii.item_name                        AS item_name,
            sii.uom                              AS uom,
            COUNT(DISTINCT sii.parent)           AS invoice_count,
            SUM(sii.qty)                         AS qty_sold,
            SUM(sii.amount)                      AS revenue,
            COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0) AS cost_rate,
            SUM(sii.qty) * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0) AS total_cost,
            SUM(sii.amount) - SUM(sii.qty) * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0) AS profit,
            CASE WHEN SUM(sii.amount) != 0
                 THEN (SUM(sii.amount) - SUM(sii.qty) * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0))
                      / SUM(sii.amount) * 100
                 ELSE 0 END                      AS margin_pct
        FROM `tabSales Invoice Item` sii
        JOIN `tabSales Invoice` si ON si.name = sii.parent AND sii.parenttype = 'Sales Invoice'
        JOIN `tabItem` i ON i.name = sii.item_code
        LEFT JOIN (
            SELECT b.item_code,
                   CASE WHEN SUM(b.actual_qty) > 0
                        THEN SUM(b.stock_value) / SUM(b.actual_qty)
                        ELSE 0 END AS avg_valuation_rate
            FROM `tabBin` b
            WHERE 1 = 1 {wip_cond}
            GROUP BY b.item_code
        ) ic ON ic.item_code = sii.item_code
        WHERE si.company      = %(company)s
          AND si.docstatus    = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY sii.item_code, sii.item_name, sii.uom, i.standard_buying_rate, ic.avg_valuation_rate
        ORDER BY revenue DESC
    """, cost_params, as_dict=True)

    product_wise_sales = [
        {"item_code": r["item_code"], "item_name": r["item_name"], "uom": r["uom"],
         "invoice_count": r["invoice_count"], "qty_sold": flt(r["qty_sold"]),
         "total_amount": flt(r["revenue"]), "avg_rate": (flt(r["revenue"]) / flt(r["qty_sold"])) if flt(r["qty_sold"]) else 0}
        for r in sales_rows
    ]
    sales_totals = {
        "qty_sold": sum(r["qty_sold"] for r in product_wise_sales),
        "total_amount": sum(r["total_amount"] for r in product_wise_sales),
    }

    product_wise_profit = sorted([
        {"item_code": r["item_code"], "item_name": r["item_name"], "revenue": flt(r["revenue"]),
         "total_cost": flt(r["total_cost"]), "profit": flt(r["profit"]), "margin_pct": round(flt(r["margin_pct"]), 1)}
        for r in sales_rows
    ], key=lambda x: x["profit"], reverse=True)
    profit_totals = {
        "revenue": sum(r["revenue"] for r in product_wise_profit),
        "total_cost": sum(r["total_cost"] for r in product_wise_profit),
        "profit": sum(r["profit"] for r in product_wise_profit),
    }

    product_wise_cost = sorted([
        {"item_code": r["item_code"], "item_name": r["item_name"], "qty_sold": flt(r["qty_sold"]),
         "cost_rate": round(flt(r["cost_rate"]), 2), "total_cost": flt(r["total_cost"])}
        for r in sales_rows
    ], key=lambda x: x["total_cost"], reverse=True)

    product_wise_margin = sorted([
        {"item_code": r["item_code"], "item_name": r["item_name"], "revenue": flt(r["revenue"]),
         "total_cost": flt(r["total_cost"]), "margin_pct": round(flt(r["margin_pct"]), 1)}
        for r in sales_rows
    ], key=lambda x: x["margin_pct"], reverse=True)

    # ---- Top / Low Selling Products (by qty sold, items sold in the period) ---
    by_qty = sorted(product_wise_sales, key=lambda x: x["qty_sold"], reverse=True)
    top_selling = by_qty[:10]
    low_selling = list(reversed(by_qty[-10:])) if len(by_qty) > 10 else list(reversed(by_qty))

    # ---- Product-wise Production (FG receipts from Manufacture entries) -------
    production_rows = frappe.db.sql("""
        SELECT sed.item_code AS item_code, sed.item_name AS item_name,
               SUM(sed.qty) AS qty_produced, SUM(sed.amount) AS value_produced,
               COUNT(DISTINCT sed.parent) AS transactions
        FROM `tabStock Entry Detail` sed
        JOIN `tabStock Entry` se ON se.name = sed.parent AND sed.parenttype = 'Stock Entry'
        WHERE se.company = %(company)s AND se.docstatus = 1 AND se.stock_entry_type = 'Manufacture'
          AND se.posting_date BETWEEN %(from_date)s AND %(to_date)s
          AND IFNULL(sed.t_warehouse, '') != '' AND IFNULL(sed.is_scrap_item, 0) = 0
        GROUP BY sed.item_code, sed.item_name
        ORDER BY qty_produced DESC
    """, params, as_dict=True)
    product_wise_production = [
        {"item_code": r["item_code"], "item_name": r["item_name"] or r["item_code"],
         "qty_produced": flt(r["qty_produced"]), "value_produced": flt(r["value_produced"]),
         "transactions": r["transactions"]}
        for r in production_rows
    ]

    # ---- Product-wise Stock (live Bin snapshot, aggregated across warehouses) --
    stock_rows = frappe.db.sql("""
        SELECT b.item_code AS item_code, i.item_name AS item_name, b.stock_uom AS uom,
               SUM(b.actual_qty) AS total_qty, SUM(b.stock_value) AS total_value
        FROM `tabBin` b
        INNER JOIN `tabWarehouse` w ON w.name = b.warehouse
        INNER JOIN `tabItem` i ON i.name = b.item_code
        WHERE w.company = %(company)s AND b.actual_qty != 0
        GROUP BY b.item_code, i.item_name, b.stock_uom
        ORDER BY total_value DESC
    """, {"company": company}, as_dict=True)
    product_wise_stock = [
        {"item_code": r["item_code"], "item_name": r["item_name"] or r["item_code"], "uom": r["uom"],
         "total_qty": flt(r["total_qty"]), "total_value": flt(r["total_value"]),
         "valuation_rate": (flt(r["total_value"]) / flt(r["total_qty"])) if flt(r["total_qty"]) else 0}
        for r in stock_rows
    ]

    # ---- Product-wise Wastage (scrap rows on Manufacture entries in period) ---
    wastage_rows = frappe.db.sql("""
        SELECT sed.item_code AS item_code, sed.item_name AS item_name,
               SUM(sed.qty) AS qty_scrapped, SUM(sed.amount) AS value_scrapped,
               COUNT(DISTINCT sed.parent) AS transactions
        FROM `tabStock Entry Detail` sed
        JOIN `tabStock Entry` se ON se.name = sed.parent AND sed.parenttype = 'Stock Entry'
        WHERE se.company = %(company)s AND se.docstatus = 1 AND se.stock_entry_type = 'Manufacture'
          AND se.posting_date BETWEEN %(from_date)s AND %(to_date)s
          AND IFNULL(sed.is_scrap_item, 0) = 1
        GROUP BY sed.item_code, sed.item_name
        ORDER BY value_scrapped DESC
    """, params, as_dict=True)
    product_wise_wastage = [
        {"item_code": r["item_code"], "item_name": r["item_name"] or r["item_code"],
         "qty_scrapped": flt(r["qty_scrapped"]), "value_scrapped": flt(r["value_scrapped"]),
         "transactions": r["transactions"]}
        for r in wastage_rows
    ]
    wastage_totals = {
        "qty_scrapped": sum(r["qty_scrapped"] for r in product_wise_wastage),
        "value_scrapped": sum(r["value_scrapped"] for r in product_wise_wastage),
    }

    return {
        "product_wise_sales": {"rows": product_wise_sales, "totals": sales_totals},
        "product_wise_profit": {"rows": product_wise_profit, "totals": profit_totals},
        "product_wise_cost": {"rows": product_wise_cost},
        "product_wise_margin": {"rows": product_wise_margin},
        "product_wise_production": {"rows": product_wise_production},
        "product_wise_stock": {"rows": product_wise_stock},
        "product_wise_wastage": {"rows": product_wise_wastage, "totals": wastage_totals},
        "top_selling": {"rows": top_selling},
        "low_selling": {"rows": low_selling},
    }


# ── Dispatch & Delivery MIS ─────────────────────────────────────────────────────

@frappe.whitelist()
def get_dispatch_delivery_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Dispatch & Delivery MIS bundle: Dispatch Summary, Pending Dispatch,
    Delivery Pending, Delayed Delivery, Customer-wise Pending Delivery and
    Transport-wise Dispatch — all in one call so the Dispatch & Delivery MIS
    tab can switch between sub-views without re-querying.

    Dispatch (period-scoped) is read from submitted Delivery Note / Delivery
    Note Item rows posted within [from_date, to_date] — this is what actually
    left the warehouse in the period. Value is derived from Delivery Note
    Item.amount since Delivery Note itself has no grand_total field.

    Pending/overdue views are order-level, not period-scoped: they read
    Sales Order Item.qty vs delivered_qty (maintained by the app whenever a
    Delivery Note is created against a Sales Order) as of `to_date`, for
    Sales Orders not Closed/Cancelled. There is no separate "delivered by
    customer" confirmation in this app (Delivery Note only tracks
    Draft/Submitted/Cancelled), so "dispatched" (delivered_qty > 0) is used
    as the proxy for "delivered" throughout this report:
      - Pending Dispatch: order lines with delivered_qty = 0 — nothing has
        gone out yet.
      - Delivery Pending: all order lines with any pending qty, including
        partially dispatched ones — the broader undelivered universe.
      - Delayed Delivery: the Delivery Pending universe filtered to lines
        whose Delivery Date has already passed (as of today), with days
        overdue.
    Customer-wise Pending Delivery aggregates the Delivery Pending universe
    by customer. Transport-wise Dispatch aggregates period dispatches by
    Delivery Note Transporter (rows with no transporter recorded are
    grouped under "Not Specified").
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date}

    # ---- Dispatch Summary (period-scoped, from submitted Delivery Notes) ------
    dn_summary_row = frappe.db.sql("""
        SELECT
            COUNT(DISTINCT dn.name)         AS dispatch_count,
            COUNT(DISTINCT dn.customer)     AS customer_count,
            COUNT(DISTINCT NULLIF(dn.transporter_name, '')) AS transporter_count,
            SUM(dn.total_qty)               AS total_qty,
            SUM(dni.amount)                 AS total_value
        FROM `tabDelivery Note` dn
        LEFT JOIN `tabDelivery Note Item` dni ON dni.parent = dn.name AND dni.parenttype = 'Delivery Note'
        WHERE dn.company = %(company)s AND dn.docstatus = 1
          AND dn.posting_date BETWEEN %(from_date)s AND %(to_date)s
    """, params, as_dict=True)
    ds = dn_summary_row[0] if dn_summary_row else {}
    dispatch_count = ds.get("dispatch_count") or 0
    dispatch_summary = {
        "dispatch_count": dispatch_count,
        "customer_count": ds.get("customer_count") or 0,
        "transporter_count": ds.get("transporter_count") or 0,
        "total_qty": flt(ds.get("total_qty")),
        "total_value": flt(ds.get("total_value")),
        "avg_qty_per_dispatch": (flt(ds.get("total_qty")) / dispatch_count) if dispatch_count else 0,
    }

    # ---- Order-level pending base (Sales Order Item vs delivered_qty, as of to_date) ----
    pending_base_rows = frappe.db.sql("""
        SELECT
            so.name AS sales_order, so.transaction_date AS order_date,
            so.delivery_date AS delivery_date, so.customer AS customer,
            so.customer_name AS customer_name, so.status AS status,
            soi.item_code AS item_code, soi.item_name AS item_name, soi.uom AS uom,
            soi.qty AS ordered_qty, IFNULL(soi.delivered_qty, 0) AS delivered_qty,
            (soi.qty - IFNULL(soi.delivered_qty, 0)) AS pending_qty,
            (soi.qty - IFNULL(soi.delivered_qty, 0)) * soi.rate AS pending_value
        FROM `tabSales Order Item` soi
        JOIN `tabSales Order` so ON so.name = soi.parent AND soi.parenttype = 'Sales Order'
        WHERE so.company = %(company)s
          AND so.status NOT IN ('Closed', 'Cancelled')
          AND so.transaction_date <= %(to_date)s
        HAVING pending_qty > 0
        ORDER BY so.transaction_date ASC
    """, params, as_dict=True)

    # ---- Pending Dispatch (nothing dispatched yet against the line) -----------
    pending_dispatch_rows = [r for r in pending_base_rows if flt(r["delivered_qty"]) == 0]
    pending_dispatch = {
        "rows": pending_dispatch_rows,
        "order_count": len({r["sales_order"] for r in pending_dispatch_rows}),
        "pending_qty": sum(flt(r["pending_qty"]) for r in pending_dispatch_rows),
        "pending_value": sum(flt(r["pending_value"]) for r in pending_dispatch_rows),
    }

    # ---- Delivery Pending (any undelivered qty, including partial dispatch) ---
    delivery_pending = {
        "rows": pending_base_rows,
        "order_count": len({r["sales_order"] for r in pending_base_rows}),
        "pending_qty": sum(flt(r["pending_qty"]) for r in pending_base_rows),
        "pending_value": sum(flt(r["pending_value"]) for r in pending_base_rows),
    }

    # ---- Delayed Delivery (Delivery Pending lines whose due date has passed) --
    today_date = today()
    delayed_rows = []
    for r in pending_base_rows:
        if r.get("delivery_date") and str(r["delivery_date"]) < today_date:
            row = dict(r)
            row["days_overdue"] = date_diff(today_date, r["delivery_date"])
            delayed_rows.append(row)
    delayed_rows.sort(key=lambda x: x["days_overdue"], reverse=True)
    delayed_delivery = {
        "rows": delayed_rows,
        "order_count": len({r["sales_order"] for r in delayed_rows}),
        "pending_qty": sum(flt(r["pending_qty"]) for r in delayed_rows),
        "pending_value": sum(flt(r["pending_value"]) for r in delayed_rows),
    }

    # ---- Customer-wise Pending Delivery (Delivery Pending, grouped) -----------
    customer_map: dict[str, dict] = {}
    for r in pending_base_rows:
        key = r["customer"]
        c = customer_map.setdefault(key, {
            "customer": key, "customer_name": r["customer_name"],
            "order_numbers": set(), "pending_qty": 0.0, "pending_value": 0.0,
        })
        c["order_numbers"].add(r["sales_order"])
        c["pending_qty"] += flt(r["pending_qty"])
        c["pending_value"] += flt(r["pending_value"])
    customer_wise_pending_delivery = sorted([
        {"customer": c["customer"], "customer_name": c["customer_name"],
         "order_count": len(c["order_numbers"]), "pending_qty": c["pending_qty"],
         "pending_value": c["pending_value"]}
        for c in customer_map.values()
    ], key=lambda x: x["pending_value"], reverse=True)

    # ---- Transport-wise Dispatch (period dispatches, grouped by transporter) --
    transport_rows = frappe.db.sql("""
        SELECT
            CASE WHEN IFNULL(dn.transporter_name, '') = '' THEN 'Not Specified'
                 ELSE dn.transporter_name END AS transporter_name,
            COUNT(DISTINCT dn.name)     AS dispatch_count,
            COUNT(DISTINCT dn.customer) AS customer_count,
            SUM(dn.total_qty)           AS total_qty,
            SUM(dni.amount)             AS total_value
        FROM `tabDelivery Note` dn
        LEFT JOIN `tabDelivery Note Item` dni ON dni.parent = dn.name AND dni.parenttype = 'Delivery Note'
        WHERE dn.company = %(company)s AND dn.docstatus = 1
          AND dn.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY transporter_name
        ORDER BY total_value DESC
    """, params, as_dict=True)
    transport_wise_dispatch = [
        {"transporter_name": r["transporter_name"], "dispatch_count": r["dispatch_count"],
         "customer_count": r["customer_count"], "total_qty": flt(r["total_qty"]),
         "total_value": flt(r["total_value"])}
        for r in transport_rows
    ]

    return {
        "dispatch_summary": dispatch_summary,
        "pending_dispatch": pending_dispatch,
        "delivery_pending": delivery_pending,
        "delayed_delivery": delayed_delivery,
        "customer_wise_pending_delivery": {"rows": customer_wise_pending_delivery},
        "transport_wise_dispatch": {"rows": transport_wise_dispatch},
    }


# ── Order MIS ─────────────────────────────────────────────────────────────────

@frappe.whitelist()
def get_order_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Order MIS bundle: Total/New/Pending Orders, Orders Under Production,
    Orders Ready for Dispatch, Delayed Orders, Delivered Orders, Cancelled
    Orders, Order Value and Order-wise Profitability — all in one call so
    the Order MIS tab can switch between sub-views without re-querying.

    All buckets are scoped to Sales Orders placed within [from_date, to_date]
    (so.transaction_date), submitted (docstatus = 1).

    This app has no dedicated "production status" field on Sales Order — the
    status Select options include values (To Deliver / Processing / Ready)
    that the workflow layer never actually sets (see
    services/workflow_service.py: the real lifecycle it drives is
    Draft -> Confirmed -> Partly Delivered/Delivered -> Cancelled). So
    "Under Production" / "Ready for Dispatch" are derived instead from
    linked Work Order records (Work Order.sales_order):
      - Under Production: order still open, with at least one linked Work
        Order currently 'In Process'.
      - Ready for Dispatch: order still open, with at least one linked Work
        Order and every linked Work Order 'Completed' (none still in
        process) — production is done but the order hasn't progressed to
        a delivered/invoiced/closed state yet.
    "Open" means status not in {Delivered, Invoiced, Closed, Cancelled}.

    New Orders: status still 'Draft' (placed but not yet confirmed).
    Pending Orders: every open order — a broader bucket than New, also
    covering Confirmed / Partly Delivered / Under Production / Ready for
    Dispatch orders that haven't reached a terminal state.
    Delayed Orders: open orders whose Delivery Date has already passed
    (as of today), with days overdue.
    Delivered Orders: status Delivered/Invoiced/Closed.
    Cancelled Orders: status Cancelled.

    Order-wise Profitability uses the same cost basis as
    get_invoice_wise_profit(): current average valuation rate per item
    (Bin table, sellable warehouses only), falling back to the item's
    Standard Buying Rate — applied here to Sales Order Item instead of
    Sales Invoice Item, since an order may not be invoiced yet.
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date}
    TERMINAL_DONE = {"Delivered", "Invoiced", "Closed"}

    # ---- Base: Sales Orders placed in the period ---------------------------
    orders = frappe.db.sql("""
        SELECT so.name AS sales_order, so.transaction_date AS order_date,
               so.delivery_date AS delivery_date, so.customer AS customer,
               so.customer_name AS customer_name, so.status AS status,
               so.grand_total AS grand_total
        FROM `tabSales Order` so
        WHERE so.company = %(company)s
          AND so.transaction_date BETWEEN %(from_date)s AND %(to_date)s
        ORDER BY so.transaction_date ASC
    """, params, as_dict=True)

    # ---- Linked Work Orders (production status per Sales Order) -----------
    wo_rows = frappe.db.sql("""
        SELECT wo.sales_order AS sales_order, wo.status AS status
        FROM `tabWork Order` wo
        WHERE wo.docstatus != 2 AND IFNULL(wo.sales_order, '') != ''
    """, as_dict=True)
    wo_status_by_order: dict[str, set] = {}
    for r in wo_rows:
        wo_status_by_order.setdefault(r["sales_order"], set()).add(r["status"])

    today_date = today()
    new_orders, pending_orders = [], []
    under_production, ready_for_dispatch = [], []
    delayed_orders, delivered_orders, cancelled_orders = [], [], []

    for o in orders:
        status = o["status"]
        if status == "Cancelled":
            cancelled_orders.append(o)
            continue
        if status in TERMINAL_DONE:
            delivered_orders.append(o)
            continue

        # still open
        pending_orders.append(o)
        if status == "Draft":
            new_orders.append(o)

        wo_statuses = wo_status_by_order.get(o["sales_order"], set())
        if "In Process" in wo_statuses:
            row = dict(o); row["wo_statuses"] = sorted(wo_statuses)
            under_production.append(row)
        elif wo_statuses and wo_statuses == {"Completed"}:
            row = dict(o); row["wo_statuses"] = sorted(wo_statuses)
            ready_for_dispatch.append(row)

        if o.get("delivery_date") and str(o["delivery_date"]) < today_date:
            row = dict(o)
            row["days_overdue"] = date_diff(today_date, o["delivery_date"])
            delayed_orders.append(row)

    def bucket(rows):
        return {"rows": rows, "count": len(rows), "value": sum(flt(r["grand_total"]) for r in rows)}

    summary = {
        "total_orders": bucket(orders),
        "new_orders": bucket(new_orders),
        "pending_orders": bucket(pending_orders),
        "under_production": bucket(under_production),
        "ready_for_dispatch": bucket(ready_for_dispatch),
        "delayed_orders": bucket(delayed_orders),
        "delivered_orders": bucket(delivered_orders),
        "cancelled_orders": bucket(cancelled_orders),
    }

    # ---- Order Value: status-wise breakdown --------------------------------
    status_value_rows = frappe.db.sql("""
        SELECT so.status AS status, COUNT(*) AS order_count, SUM(so.grand_total) AS total_value
        FROM `tabSales Order` so
        WHERE so.company = %(company)s
          AND so.transaction_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY so.status
        ORDER BY total_value DESC
    """, params, as_dict=True)
    order_value = {
        "total_value": sum(flt(r["total_value"]) for r in status_value_rows),
        "by_status": [
            {"status": r["status"], "order_count": r["order_count"], "total_value": flt(r["total_value"])}
            for r in status_value_rows
        ],
    }

    # ---- Order-wise Profitability -------------------------------------------
    wip_warehouses = set(
        frappe.get_all("Work Order", filters={"wip_warehouse": ["is", "set"]}, pluck="wip_warehouse")
    )
    default_wip = frappe.db.get_single_value("Manufacturing Settings", "default_wip_warehouse")
    if default_wip:
        wip_warehouses.add(default_wip)
    wip_cond = ""
    profit_params = dict(params)
    if wip_warehouses:
        wip_cond = "AND b.warehouse NOT IN %(wip_warehouses)s"
        profit_params["wip_warehouses"] = tuple(wip_warehouses)

    profitability_rows = frappe.db.sql(f"""
        SELECT
            so.name AS sales_order, so.transaction_date AS order_date,
            so.customer AS customer, so.customer_name AS customer_name,
            so.status AS status, so.grand_total AS grand_total,
            SUM(soi.amount)                      AS revenue,
            SUM(soi.qty * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0)) AS total_cost,
            SUM(soi.amount) - SUM(soi.qty * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0)) AS profit,
            CASE WHEN SUM(soi.amount) != 0
                 THEN (SUM(soi.amount) - SUM(soi.qty * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0)))
                      / SUM(soi.amount) * 100
                 ELSE 0 END                      AS margin_pct
        FROM `tabSales Order Item` soi
        JOIN `tabSales Order` so ON so.name = soi.parent AND soi.parenttype = 'Sales Order'
        JOIN `tabItem` i ON i.name = soi.item_code
        LEFT JOIN (
            SELECT b.item_code,
                   CASE WHEN SUM(b.actual_qty) > 0
                        THEN SUM(b.stock_value) / SUM(b.actual_qty)
                        ELSE 0 END AS avg_valuation_rate
            FROM `tabBin` b
            WHERE 1 = 1 {wip_cond}
            GROUP BY b.item_code
        ) ic ON ic.item_code = soi.item_code
        WHERE so.company = %(company)s
          AND so.transaction_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY so.name, so.transaction_date, so.customer, so.customer_name, so.status, so.grand_total
        ORDER BY so.transaction_date DESC, so.name DESC
    """, profit_params, as_dict=True)
    order_profitability = [
        {"sales_order": r["sales_order"], "order_date": r["order_date"], "customer": r["customer"],
         "customer_name": r["customer_name"], "status": r["status"], "revenue": flt(r["revenue"]),
         "total_cost": flt(r["total_cost"]), "profit": flt(r["profit"]), "margin_pct": round(flt(r["margin_pct"]), 1)}
        for r in profitability_rows
    ]
    profitability_totals = {
        "revenue": sum(r["revenue"] for r in order_profitability),
        "total_cost": sum(r["total_cost"] for r in order_profitability),
        "profit": sum(r["profit"] for r in order_profitability),
    }

    return {
        "summary": summary,
        "order_value": order_value,
        "order_profitability": {"rows": order_profitability, "totals": profitability_totals},
    }


# ── Profitability MIS ────────────────────────────────────────────────────────

@frappe.whitelist()
def get_profitability_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Profitability MIS bundle: Gross Sales, Net Sales, Gross Profit, Gross
    Margin %, and profit broken down Product-wise / Customer-wise /
    Order-wise / Branch-wise / Salesperson-wise, plus a Monthly Profit
    Trend — all in one call so the Profitability MIS tab can switch
    between sub-views without re-querying.

    Same cost basis as get_profit_wise_report() / get_invoice_wise_profit():
    current average valuation rate per item (Bin table, sellable
    warehouses only), falling back to the item's Standard Buying Rate —
    a current-cost estimate, not a historical/FIFO cost at the time of
    sale, since Sales Invoice Item does not itself store a cost field.

    Sales Returns (Sales Invoice with is_return = 1) are excluded from
    every bucket here to keep this a gross-sales/gross-profit view; there
    is no separate Credit Note doctype in this app, so returns are not
    netted back in.

    Gross Sales = line qty x rate, before any discount.
    Net Sales   = Sales Invoice net_total (after discount, before tax) —
    the revenue base Gross Profit / Gross Margin % are measured against.

    "Branch-wise Profit": this app has no Branch doctype. Sales Invoice's
    Cost Center is the closest per-location dimension it stores, so Cost
    Center is used as the branch grouping here. Invoices with no Cost
    Center set are grouped under "Not Specified", same treatment as
    Salesperson-wise for invoices with no Sales Person set.

    Monthly Profit Trend buckets by posting month across the selected
    period (not calendar-year bound), so it works for any from/to range.
    """
    wip_warehouses = set(
        frappe.get_all("Work Order", filters={"wip_warehouse": ["is", "set"]}, pluck="wip_warehouse")
    )
    default_wip = frappe.db.get_single_value("Manufacturing Settings", "default_wip_warehouse")
    if default_wip:
        wip_warehouses.add(default_wip)
    wip_cond = ""
    params = {"company": company, "from_date": from_date, "to_date": to_date}
    if wip_warehouses:
        wip_cond = "AND b.warehouse NOT IN %(wip_warehouses)s"
        params["wip_warehouses"] = tuple(wip_warehouses)

    # ---- Base: per-line revenue + estimated cost for the period -------------
    lines = frappe.db.sql(f"""
        SELECT
            si.name AS invoice, si.posting_date AS posting_date,
            si.customer AS customer, si.customer_name AS customer_name,
            si.sales_order AS sales_order,
            si.sales_person AS sales_person,
            COALESCE(sp.sales_person_name, si.sales_person) AS sales_person_name,
            si.cost_center AS cost_center,
            COALESCE(cc.cost_center_name, si.cost_center) AS cost_center_name,
            sii.item_code AS item_code, sii.item_name AS item_name,
            sii.qty AS qty, sii.rate AS rate, sii.amount AS amount,
            IFNULL(sii.discount_amount, 0) AS discount_amount,
            COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0) AS cost_rate
        FROM `tabSales Invoice Item` sii
        JOIN `tabSales Invoice` si ON si.name = sii.parent AND sii.parenttype = 'Sales Invoice'
        JOIN `tabItem` i ON i.name = sii.item_code
        LEFT JOIN `tabSales Person` sp ON sp.name = si.sales_person
        LEFT JOIN `tabCost Center` cc ON cc.name = si.cost_center
        LEFT JOIN (
            SELECT b.item_code,
                   CASE WHEN SUM(b.actual_qty) > 0
                        THEN SUM(b.stock_value) / SUM(b.actual_qty)
                        ELSE 0 END AS avg_valuation_rate
            FROM `tabBin` b
            WHERE 1 = 1 {wip_cond}
            GROUP BY b.item_code
        ) ic ON ic.item_code = sii.item_code
        WHERE si.company      = %(company)s
          AND si.docstatus    = 1
          AND si.is_return    = 0
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
    """, params, as_dict=True)

    for r in lines:
        r["qty"] = flt(r["qty"])
        r["rate"] = flt(r["rate"])
        r["amount"] = flt(r["amount"])
        r["discount_amount"] = flt(r["discount_amount"])
        r["cost_rate"] = flt(r["cost_rate"])
        r["gross_amount"] = r["qty"] * r["rate"]
        r["cost"] = r["qty"] * r["cost_rate"]
        r["profit"] = r["amount"] - r["cost"]

    # ---- Header-level net sales / discount (for Gross Sales & Net Sales) ----
    header_rows = frappe.db.sql("""
        SELECT si.name AS invoice, si.net_total AS net_total,
               IFNULL(si.additional_discount_amount, 0) AS header_discount
        FROM `tabSales Invoice` si
        WHERE si.company = %(company)s AND si.docstatus = 1 AND si.is_return = 0
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
    """, params, as_dict=True)

    gross_sales   = sum(r["gross_amount"] for r in lines)
    line_discount = sum(r["discount_amount"] for r in lines)
    header_discount = sum(flt(r["header_discount"]) for r in header_rows)
    net_sales     = sum(flt(r["net_total"]) for r in header_rows)
    total_cost    = sum(r["cost"] for r in lines)
    gross_profit  = net_sales - total_cost
    gross_margin_pct = (gross_profit / net_sales * 100) if net_sales else 0

    summary = {
        "gross_sales": gross_sales,
        "line_discount": line_discount,
        "header_discount": header_discount,
        "net_sales": net_sales,
        "total_cost": total_cost,
        "gross_profit": gross_profit,
        "gross_margin_pct": gross_margin_pct,
        "invoice_count": len(header_rows),
    }

    # ---- Product-wise Profit --------------------------------------------------
    product_map: dict[str, dict] = {}
    for r in lines:
        p = product_map.setdefault(r["item_code"], {
            "item_code": r["item_code"], "item_name": r["item_name"],
            "revenue": 0.0, "cost": 0.0,
        })
        p["revenue"] += r["amount"]
        p["cost"] += r["cost"]
    product_wise_profit = sorted([
        {"item_code": p["item_code"], "item_name": p["item_name"], "revenue": p["revenue"],
         "cost": p["cost"], "profit": p["revenue"] - p["cost"],
         "margin_pct": ((p["revenue"] - p["cost"]) / p["revenue"] * 100) if p["revenue"] else 0}
        for p in product_map.values()
    ], key=lambda x: x["profit"], reverse=True)

    # ---- Customer-wise Profit --------------------------------------------------
    customer_map: dict[str, dict] = {}
    for r in lines:
        c = customer_map.setdefault(r["customer"], {
            "customer": r["customer"], "customer_name": r["customer_name"],
            "revenue": 0.0, "cost": 0.0, "invoices": set(),
        })
        c["revenue"] += r["amount"]
        c["cost"] += r["cost"]
        c["invoices"].add(r["invoice"])
    customer_wise_profit = sorted([
        {"customer": c["customer"], "customer_name": c["customer_name"],
         "invoice_count": len(c["invoices"]), "revenue": c["revenue"], "cost": c["cost"],
         "profit": c["revenue"] - c["cost"],
         "margin_pct": ((c["revenue"] - c["cost"]) / c["revenue"] * 100) if c["revenue"] else 0}
        for c in customer_map.values()
    ], key=lambda x: x["profit"], reverse=True)

    # ---- Order-wise Profit (invoices linked back to a Sales Order) ------------
    order_map: dict[str, dict] = {}
    no_order_totals = {"revenue": 0.0, "cost": 0.0}
    for r in lines:
        so = r.get("sales_order")
        if not so:
            no_order_totals["revenue"] += r["amount"]
            no_order_totals["cost"] += r["cost"]
            continue
        o = order_map.setdefault(so, {
            "sales_order": so, "customer_name": r["customer_name"],
            "revenue": 0.0, "cost": 0.0,
        })
        o["revenue"] += r["amount"]
        o["cost"] += r["cost"]
    order_wise_profit = sorted([
        {"sales_order": o["sales_order"], "customer_name": o["customer_name"],
         "revenue": o["revenue"], "cost": o["cost"], "profit": o["revenue"] - o["cost"],
         "margin_pct": ((o["revenue"] - o["cost"]) / o["revenue"] * 100) if o["revenue"] else 0}
        for o in order_map.values()
    ], key=lambda x: x["profit"], reverse=True)
    order_wise_no_order = {
        "revenue": no_order_totals["revenue"], "cost": no_order_totals["cost"],
        "profit": no_order_totals["revenue"] - no_order_totals["cost"],
    }

    # ---- Branch-wise Profit (Cost Center used as the branch proxy) ------------
    branch_map: dict[str, dict] = {}
    for r in lines:
        key = r.get("cost_center") or "Not Specified"
        name = r.get("cost_center_name") or "Not Specified"
        b = branch_map.setdefault(key, {"cost_center": key, "cost_center_name": name, "revenue": 0.0, "cost": 0.0})
        b["revenue"] += r["amount"]
        b["cost"] += r["cost"]
    branch_wise_profit = sorted([
        {"cost_center": b["cost_center"], "cost_center_name": b["cost_center_name"],
         "revenue": b["revenue"], "cost": b["cost"], "profit": b["revenue"] - b["cost"],
         "margin_pct": ((b["revenue"] - b["cost"]) / b["revenue"] * 100) if b["revenue"] else 0}
        for b in branch_map.values()
    ], key=lambda x: x["profit"], reverse=True)

    # ---- Salesperson-wise Profit -----------------------------------------------
    sp_map: dict[str, dict] = {}
    for r in lines:
        key = r.get("sales_person") or "Not Specified"
        name = r.get("sales_person_name") or "Not Specified"
        s = sp_map.setdefault(key, {"sales_person": key, "sales_person_name": name, "revenue": 0.0, "cost": 0.0})
        s["revenue"] += r["amount"]
        s["cost"] += r["cost"]
    salesperson_wise_profit = sorted([
        {"sales_person": s["sales_person"], "sales_person_name": s["sales_person_name"],
         "revenue": s["revenue"], "cost": s["cost"], "profit": s["revenue"] - s["cost"],
         "margin_pct": ((s["revenue"] - s["cost"]) / s["revenue"] * 100) if s["revenue"] else 0}
        for s in sp_map.values()
    ], key=lambda x: x["profit"], reverse=True)

    # ---- Monthly Profit Trend (by posting month across the selected range) ----
    month_map: dict[str, dict] = {}
    for r in lines:
        month_key = str(r["posting_date"])[:7]  # 'YYYY-MM'
        m = month_map.setdefault(month_key, {"month": month_key, "revenue": 0.0, "cost": 0.0})
        m["revenue"] += r["amount"]
        m["cost"] += r["cost"]
    monthly_profit_trend = sorted([
        {"month": m["month"], "revenue": m["revenue"], "cost": m["cost"],
         "profit": m["revenue"] - m["cost"],
         "margin_pct": ((m["revenue"] - m["cost"]) / m["revenue"] * 100) if m["revenue"] else 0}
        for m in month_map.values()
    ], key=lambda x: x["month"])

    return {
        "summary": summary,
        "product_wise_profit": {"rows": product_wise_profit},
        "customer_wise_profit": {"rows": customer_wise_profit},
        "order_wise_profit": {"rows": order_wise_profit, "no_order": order_wise_no_order},
        "branch_wise_profit": {"rows": branch_wise_profit},
        "salesperson_wise_profit": {"rows": salesperson_wise_profit},
        "monthly_profit_trend": {"rows": monthly_profit_trend},
    }


# ── Expense MIS ──────────────────────────────────────────────────────────────

# Keyword heuristic used to split expenses into Fixed / Variable (see
# get_expense_mis() docstring for why this is a heuristic rather than a
# stored field). Matched case-insensitively against the Expense Category
# name; anything that doesn't match is treated as Variable.
FIXED_EXPENSE_KEYWORDS = (
    "rent", "lease", "salary", "salaries", "wages", "payroll", "insurance",
    "subscription", "depreciation", "loan", "interest", "membership",
    "license", "licence", "amc", "maintenance contract", "emi",
)


@frappe.whitelist()
def get_expense_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Expense MIS bundle: Total Expenses, Department-wise, Expense
    Category-wise, Budget vs Actual, Fixed vs Variable, Expense Trend, and
    Unusual / Excess Expenses — all in one call so the Expense MIS tab can
    switch between sub-views without re-querying.

    Scope: submitted (docstatus = 1) `Expense` records only — this app's
    direct operating-expense doctype (see Expenses.vue). Purchase Invoices
    and GL journal entries booked straight to an expense account are not
    included, same as the existing Daily Business MIS expense figure.

    "Department-wise Expenses": this app has no Department doctype. Cost
    Center is the closest per-location/per-team dimension it stores (and
    Cost Center's own `cc_type` field includes a "Department" option), so
    Cost Center is used as the department grouping here, same treatment as
    Branch-wise Profit in the Profitability MIS. Expenses with no Cost
    Center set are grouped under "Not Specified".

    "Budget vs Actual Expense": Cost Center stores a single `budget` amount
    plus a `budget_period` (Annual / Quarterly / Monthly) — there is no
    date-ranged Budget doctype. To compare against the selected from/to
    range, the stored budget is prorated to a daily rate (Annual /365,
    Quarterly /91, Monthly /30) and multiplied by the number of days in the
    range. This is an approximation, not an accounting-period-aware
    calendar; it is flagged as `is_estimate: true` in the response so the UI
    can label it accordingly. Cost centers with no budget set are omitted
    from this bucket.

    "Fixed Expenses" / "Variable Expenses": the schema has no Fixed/Variable
    flag on Expense or Expense Category, so this classifies by a keyword
    match against the Expense Category name (rent, salary, insurance,
    depreciation, EMI, etc. → Fixed; everything else → Variable). This is a
    heuristic, not a stored classification — categories can be renamed to
    include one of the keywords to move them into Fixed.

    "Unusual / Excess Expenses": flags individual Expense records whose
    amount is a statistical outlier within its own Expense Category for the
    period — amount > category_mean + 2 x category_stddev when the category
    has 3+ records in the period, or amount > 2 x category_mean as a simpler
    fallback for thin categories (1-2 records). This surfaces one-off spikes,
    not a running average across all history.
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date}

    # ---- Base: every submitted expense line for the period --------------------
    rows = frappe.db.sql("""
        SELECT
            e.name AS expense, e.posting_date AS posting_date,
            e.expense_type AS expense_type,
            COALESCE(ec.category_name, e.expense_type) AS category_name,
            e.amount AS amount, IFNULL(e.tax_amount, 0) AS tax_amount,
            e.total_amount AS total_amount,
            e.cost_center AS cost_center,
            COALESCE(cc.cost_center_name, e.cost_center) AS cost_center_name,
            e.vendor AS vendor
        FROM `tabExpense` e
        LEFT JOIN `tabExpense Category` ec ON ec.name = e.expense_type
        LEFT JOIN `tabCost Center` cc ON cc.name = e.cost_center
        WHERE e.company = %(company)s AND e.docstatus = 1
          AND e.posting_date BETWEEN %(from_date)s AND %(to_date)s
    """, params, as_dict=True)

    for r in rows:
        r["amount"] = flt(r["amount"])
        r["tax_amount"] = flt(r["tax_amount"])
        r["total_amount"] = flt(r["total_amount"])

    # ---- Summary (Total Expenses) ----------------------------------------------
    expense_count = len(rows)
    total_amount_sum = sum(r["total_amount"] for r in rows)
    total_tax_sum    = sum(r["tax_amount"] for r in rows)
    summary = {
        "expense_count": expense_count,
        "total_amount": total_amount_sum,
        "total_tax": total_tax_sum,
        "net_amount": total_amount_sum - total_tax_sum,
        "avg_expense": (total_amount_sum / expense_count) if expense_count else 0,
    }

    # ---- Department-wise Expenses (Cost Center used as the department proxy) --
    dept_map: dict[str, dict] = {}
    for r in rows:
        key = r.get("cost_center") or "Not Specified"
        name = r.get("cost_center_name") or "Not Specified"
        d = dept_map.setdefault(key, {"cost_center": key, "cost_center_name": name, "amount": 0.0, "count": 0})
        d["amount"] += r["total_amount"]
        d["count"] += 1
    department_wise = sorted(
        dept_map.values(), key=lambda x: x["amount"], reverse=True
    )

    # ---- Expense Category-wise --------------------------------------------------
    cat_map: dict[str, dict] = {}
    for r in rows:
        key = r.get("expense_type") or "Not Specified"
        name = r.get("category_name") or "Not Specified"
        c = cat_map.setdefault(key, {"expense_type": key, "category_name": name, "amount": 0.0, "count": 0})
        c["amount"] += r["total_amount"]
        c["count"] += 1
    for c in cat_map.values():
        c["pct_of_total"] = (c["amount"] / total_amount_sum * 100) if total_amount_sum else 0
    category_wise = sorted(cat_map.values(), key=lambda x: x["amount"], reverse=True)

    # ---- Budget vs Actual Expense (Cost Center budget, prorated to the range) -
    period_days = max(date_diff(getdate(to_date), getdate(from_date)) + 1, 1)
    cc_budgets = frappe.db.sql("""
        SELECT name AS cost_center, cost_center_name, budget, budget_period, alert_pct
        FROM `tabCost Center`
        WHERE company = %(company)s AND IFNULL(budget, 0) > 0
    """, params, as_dict=True)
    period_divisor = {"Annual": 365, "Quarterly": 91, "Monthly": 30}
    budget_vs_actual = []
    for b in cc_budgets:
        budget = flt(b["budget"])
        daily_budget = budget / period_divisor.get(b.get("budget_period") or "Annual", 365)
        period_budget = daily_budget * period_days
        actual = dept_map.get(b["cost_center"], {}).get("amount", 0.0)
        variance = actual - period_budget
        budget_vs_actual.append({
            "cost_center": b["cost_center"], "cost_center_name": b["cost_center_name"],
            "budget_period": b.get("budget_period") or "Annual",
            "period_budget": period_budget, "actual": actual, "variance": variance,
            "variance_pct": (variance / period_budget * 100) if period_budget else 0,
            "alert_pct": flt(b.get("alert_pct")),
        })
    budget_vs_actual.sort(key=lambda x: x["variance"], reverse=True)

    # ---- Fixed vs Variable Expenses (keyword heuristic on category name) ------
    def is_fixed(category_name: str) -> bool:
        name = (category_name or "").lower()
        return any(kw in name for kw in FIXED_EXPENSE_KEYWORDS)

    fixed_rows    = [c for c in category_wise if is_fixed(c["category_name"])]
    variable_rows = [c for c in category_wise if not is_fixed(c["category_name"])]
    fixed_total    = sum(c["amount"] for c in fixed_rows)
    variable_total = sum(c["amount"] for c in variable_rows)

    # ---- Expense Trend (by posting month across the selected range) -----------
    month_map: dict[str, dict] = {}
    for r in rows:
        month_key = str(r["posting_date"])[:7]  # 'YYYY-MM'
        m = month_map.setdefault(month_key, {"month": month_key, "amount": 0.0, "count": 0})
        m["amount"] += r["total_amount"]
        m["count"] += 1
    expense_trend = sorted(month_map.values(), key=lambda x: x["month"])

    # ---- Unusual / Excess Expenses (per-category statistical outliers) --------
    import statistics
    cat_amounts: dict[str, list[float]] = {}
    for r in rows:
        cat_amounts.setdefault(r.get("expense_type") or "Not Specified", []).append(r["total_amount"])

    unusual = []
    for r in rows:
        key = r.get("expense_type") or "Not Specified"
        amounts = cat_amounts.get(key, [])
        mean = statistics.fmean(amounts) if amounts else 0
        if len(amounts) >= 3:
            stddev = statistics.pstdev(amounts)
            threshold = mean + (2 * stddev)
            basis = "mean + 2x std-dev"
        else:
            threshold = mean * 2
            basis = "2x category average (thin sample)"
        if threshold > 0 and r["total_amount"] > threshold:
            unusual.append({
                "expense": r["expense"], "posting_date": r["posting_date"],
                "category_name": r["category_name"], "cost_center_name": r.get("cost_center_name"),
                "vendor": r.get("vendor"), "amount": r["total_amount"],
                "category_avg": mean, "threshold": threshold, "basis": basis,
            })
    unusual.sort(key=lambda x: x["amount"], reverse=True)

    return {
        "summary": summary,
        "department_wise": {"rows": department_wise},
        "category_wise": {"rows": category_wise},
        "budget_vs_actual": {"rows": budget_vs_actual, "period_days": period_days, "is_estimate": True},
        "fixed_expenses": {"rows": fixed_rows, "total": fixed_total},
        "variable_expenses": {"rows": variable_rows, "total": variable_total},
        "expense_trend": {"rows": expense_trend},
        "unusual_expenses": {"rows": unusual},
    }


# ── Payables MIS ─────────────────────────────────────────────────────────────

@frappe.whitelist()
def get_payables_mis(company: str, as_of_date: str) -> dict:
    """
    Payables MIS bundle, as of a single date (same as-of-date model as AP
    Aging, not a from/to range): Supplier Outstanding, Payable Ageing,
    Overdue Payables, Due This Week, Due This Month, Supplier-wise
    Outstanding, and Payment Due Forecast — all in one call so the
    Payables MIS tab can switch between sub-views without re-querying.

    Scope: submitted (docstatus = 1) Purchase Invoices with a non-zero
    outstanding_amount as of `as_of_date`. Purchase Returns (is_return = 1)
    carry their own outstanding_amount in this app (a negative amount owed
    back to us) and are included as-is so a supplier's net payable position
    is accurate, rather than excluded as a separate "debit note" doctype.

    Every row also carries `days_until_due` (DATEDIFF(due_date, as_of_date):
    negative = already overdue, 0 = due today, positive = due in future) —
    the single figure every bucket below is derived from.

    "Payable Ageing" buckets backward by how overdue an invoice already is
    (Current / 1-30 / 31-60 / 61-90 / 90+ days overdue), per supplier — same
    buckets as the existing AP Aging report.

    "Due This Week" = due_date within the rolling 7 days from `as_of_date`
    (today through +6 days), not yet overdue. "Due This Month" = due_date
    anywhere within the calendar month containing `as_of_date` (1st to last
    day) — this can overlap with Overdue Payables for bills already past
    due earlier in the same month; both are kept since they answer
    different questions ("what's overdue right now" vs "what will this
    month cost in payables, cash-flow-planning-wise").

    "Payment Due Forecast" buckets every outstanding invoice forward by
    days_until_due into: Overdue, Due 0-7 days, Due 8-15 days, Due 16-30
    days, Due 31-60 days, Due 60+ days — a forward-looking cash-outflow
    view, separate from the backward-looking Payable Ageing buckets.
    """
    params = {"company": company, "as_of_date": as_of_date}
    rows = frappe.db.sql("""
        SELECT
            pi.name AS invoice, pi.supplier AS supplier, pi.supplier_name AS supplier_name,
            pi.posting_date AS posting_date, pi.due_date AS due_date,
            pi.grand_total AS grand_total, pi.outstanding_amount AS outstanding_amount,
            DATEDIFF(pi.due_date, %(as_of_date)s) AS days_until_due
        FROM `tabPurchase Invoice` pi
        WHERE pi.company = %(company)s AND pi.docstatus = 1
          AND pi.outstanding_amount != 0
        ORDER BY pi.due_date ASC
    """, params, as_dict=True)

    for r in rows:
        r["outstanding_amount"] = flt(r["outstanding_amount"])
        r["grand_total"] = flt(r["grand_total"])
        r["days_until_due"] = r["days_until_due"] if r["days_until_due"] is not None else 0
        r["overdue_days"] = max(0, -r["days_until_due"])

    # ---- Summary (Supplier Outstanding) ----------------------------------------
    total_outstanding = sum(r["outstanding_amount"] for r in rows)
    overdue_rows = [r for r in rows if r["days_until_due"] < 0 and r["outstanding_amount"] > 0]
    overdue_amount = sum(r["outstanding_amount"] for r in overdue_rows)
    supplier_count = len({r["supplier"] for r in rows})
    summary = {
        "total_outstanding": total_outstanding,
        "invoice_count": len(rows),
        "supplier_count": supplier_count,
        "overdue_amount": overdue_amount,
        "overdue_count": len(overdue_rows),
        "not_yet_due_amount": total_outstanding - overdue_amount,
    }

    # ---- Payable Ageing (bucketed, supplier-wise, backward-looking) -----------
    ageing_map: dict[str, dict] = {}
    for r in rows:
        sup = r["supplier"]
        b = ageing_map.setdefault(sup, {
            "supplier": sup, "supplier_name": r.get("supplier_name") or sup,
            "current": 0.0, "days_1_30": 0.0, "days_31_60": 0.0,
            "days_61_90": 0.0, "days_90_plus": 0.0, "total": 0.0,
        })
        amt = r["outstanding_amount"]
        days = r["overdue_days"]
        if days <= 0:
            b["current"] += amt
        elif days <= 30:
            b["days_1_30"] += amt
        elif days <= 60:
            b["days_31_60"] += amt
        elif days <= 90:
            b["days_61_90"] += amt
        else:
            b["days_90_plus"] += amt
        b["total"] += amt
    payable_ageing = sorted(ageing_map.values(), key=lambda x: x["total"], reverse=True)

    # ---- Overdue Payables ---------------------------------------------------------
    overdue_payables = sorted(overdue_rows, key=lambda x: x["overdue_days"], reverse=True)

    # ---- Due This Week (rolling 7 days from as_of_date, inclusive, not overdue) --
    due_this_week = sorted(
        [r for r in rows if 0 <= r["days_until_due"] <= 6 and r["outstanding_amount"] > 0],
        key=lambda x: x["due_date"]
    )

    # ---- Due This Month (calendar month containing as_of_date) -----------------
    as_of = getdate(as_of_date)
    due_this_month = sorted(
        [r for r in rows
         if getdate(r["due_date"]).year == as_of.year and getdate(r["due_date"]).month == as_of.month
         and r["outstanding_amount"] > 0],
        key=lambda x: x["due_date"]
    )

    # ---- Supplier-wise Outstanding ----------------------------------------------
    supplier_map: dict[str, dict] = {}
    for r in rows:
        s = supplier_map.setdefault(r["supplier"], {
            "supplier": r["supplier"], "supplier_name": r.get("supplier_name") or r["supplier"],
            "invoice_count": 0, "outstanding": 0.0, "overdue_amount": 0.0, "max_overdue_days": 0,
        })
        s["invoice_count"] += 1
        s["outstanding"] += r["outstanding_amount"]
        if r["days_until_due"] < 0 and r["outstanding_amount"] > 0:
            s["overdue_amount"] += r["outstanding_amount"]
            s["max_overdue_days"] = max(s["max_overdue_days"], r["overdue_days"])
    supplier_wise_outstanding = sorted(supplier_map.values(), key=lambda x: x["outstanding"], reverse=True)

    # ---- Payment Due Forecast (forward-looking cash-outflow buckets) ----------
    forecast_buckets = [
        {"key": "overdue",   "label": "Overdue",         "amount": 0.0, "count": 0},
        {"key": "d0_7",      "label": "Due 0-7 days",    "amount": 0.0, "count": 0},
        {"key": "d8_15",     "label": "Due 8-15 days",   "amount": 0.0, "count": 0},
        {"key": "d16_30",    "label": "Due 16-30 days",  "amount": 0.0, "count": 0},
        {"key": "d31_60",    "label": "Due 31-60 days",  "amount": 0.0, "count": 0},
        {"key": "d60_plus",  "label": "Due 60+ days",    "amount": 0.0, "count": 0},
    ]
    fb = {b["key"]: b for b in forecast_buckets}
    for r in rows:
        due_in = r["days_until_due"]
        amt = r["outstanding_amount"]
        if due_in < 0:
            bucket = fb["overdue"]
        elif due_in <= 7:
            bucket = fb["d0_7"]
        elif due_in <= 15:
            bucket = fb["d8_15"]
        elif due_in <= 30:
            bucket = fb["d16_30"]
        elif due_in <= 60:
            bucket = fb["d31_60"]
        else:
            bucket = fb["d60_plus"]
        bucket["amount"] += amt
        bucket["count"] += 1

    return {
        "summary": summary,
        "payable_ageing": {"rows": payable_ageing},
        "overdue_payables": {"rows": overdue_payables},
        "due_this_week": {"rows": due_this_week},
        "due_this_month": {"rows": due_this_month},
        "supplier_wise_outstanding": {"rows": supplier_wise_outstanding},
        "payment_due_forecast": {"rows": forecast_buckets},
    }


# ── Cash & Bank MIS ──────────────────────────────────────────────────────────

def _forecast_bucket_for(days_until: int) -> str:
    """Shared bucketing for Cash Forecast / Fund Requirement — same edges as
    Payables MIS's Payment Due Forecast, applied to both AR and AP here."""
    if days_until < 0:
        return "overdue"
    if days_until <= 7:
        return "d0_7"
    if days_until <= 15:
        return "d8_15"
    if days_until <= 30:
        return "d16_30"
    if days_until <= 60:
        return "d31_60"
    return "d60_plus"


@frappe.whitelist()
def get_cash_bank_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Cash & Bank MIS bundle: Cash Position, Bank Balance, Daily Cash Flow,
    Daily Bank Movement, Receipts, Payments, Cash Forecast, and Fund
    Requirement — all in one call so the Cash & Bank MIS tab can switch
    between sub-views without re-querying.

    Cash Position / Bank Balance are evaluated as of `to_date` (closing
    balance = Account.opening_balance + GL movement up to that date, via
    the existing get_account_balances_bulk() — same double-counting guard
    it already has for Bank Accounts whose opening balance was posted as a
    real GL Entry). Daily Cash Flow / Daily Bank Movement cover the
    from_date..to_date range, with a running balance seeded from the
    closing balance the day before `from_date`.

    "Receipts" = Payment Entries with payment_type = 'Receive' in the
    period (the only way money comes in, in this app — Sales Invoice has
    no direct paid_amount/POS path). "Payments" = Payment Entry
    payment_type = 'Pay' PLUS Expense records (Expense posts straight to
    its `paid_through` Cash/Bank account on submit, bypassing Payment
    Entry entirely) — both are real cash/bank outflows, so both are listed
    together here even though only Payment Entry rows would show up if you
    only looked at the Payments doctype. Payment Entry 'Internal Transfer'
    rows (Cash <-> Bank) are excluded from both lists since they are
    neither an external receipt nor payment — they still net into the
    per-account GL movement used everywhere else in this report.

    "Cash Forecast" projects the cash/bank position forward from `to_date`
    by bucketing every outstanding Sales Invoice (expected inflow) and
    Purchase Invoice (expected outflow) by days until due, using the same
    bucket edges as Payables MIS's Payment Due Forecast (Overdue / 0-7 /
    8-15 / 16-30 / 31-60 / 60+ days), then walking the buckets in order
    from the current Cash + Bank balance. This assumes every outstanding
    invoice is collected/paid exactly on its due date — a planning
    estimate, not a guarantee.

    "Fund Requirement" reads directly off that same projected trajectory:
    for any bucket where the running projected balance would go negative,
    the shortfall (the amount needed to keep it at zero) is reported, and
    `peak_requirement` is the single largest shortfall across all buckets —
    the minimum extra funds (cash injection / credit line) needed to cover
    the worst point in the forecast.
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date}

    accounts = frappe.get_all(
        "Account",
        filters={"company": company, "account_type": ["in", ["Cash", "Bank"]], "is_group": 0},
        fields=["name", "account_name", "account_type"],
    )
    account_names = [a["name"] for a in accounts]
    cash_accounts = [a["name"] for a in accounts if a["account_type"] == "Cash"]
    bank_accounts = [a["name"] for a in accounts if a["account_type"] == "Bank"]

    closing_balances = get_account_balances_bulk(account_names, to_date) if account_names else {}
    opening_of_period = get_account_balances_bulk(account_names, add_days(getdate(from_date), -1)) if account_names else {}

    # ---- Cash Position / Bank Balance (as of to_date) --------------------------
    def position_rows(names):
        rows = []
        for a in accounts:
            if a["name"] not in names:
                continue
            closing = flt(closing_balances.get(a["name"]))
            opening = flt(opening_of_period.get(a["name"]))
            rows.append({
                "account": a["name"], "account_name": a["account_name"],
                "opening_balance": opening, "closing_balance": closing,
                "net_movement": closing - opening,
            })
        return sorted(rows, key=lambda x: x["closing_balance"], reverse=True)

    cash_position_rows = position_rows(cash_accounts)
    bank_balance_rows  = position_rows(bank_accounts)
    total_cash = sum(r["closing_balance"] for r in cash_position_rows)
    total_bank = sum(r["closing_balance"] for r in bank_balance_rows)

    # ---- Daily Cash Flow / Daily Bank Movement ---------------------------------
    def daily_movement(names):
        if not names:
            return []
        placeholders = ", ".join(["%s"] * len(names))
        rows = frappe.db.sql(f"""
            SELECT posting_date AS date,
                   SUM(debit)  AS receipts,
                   SUM(credit) AS payments
            FROM `tabGeneral Ledger Entry`
            WHERE account IN ({placeholders}) AND is_cancelled = 0
              AND posting_date BETWEEN %s AND %s
            GROUP BY posting_date
        """, names + [from_date, to_date], as_dict=True)
        return {str(r["date"]): r for r in rows}

    def build_daily(names):
        by_date = daily_movement(names)
        opening = sum(flt(opening_of_period.get(n)) for n in names)
        days = []
        running = opening
        d = getdate(from_date)
        end = getdate(to_date)
        while d <= end:
            r = by_date.get(str(d), {})
            receipts = flt(r.get("receipts"))
            payments = flt(r.get("payments"))
            running += (receipts - payments)
            days.append({
                "date": str(d), "receipts": receipts, "payments": payments,
                "net": receipts - payments, "balance": running,
            })
            d = add_days(d, 1)
        return days, opening

    daily_cash_rows, cash_opening = build_daily(cash_accounts)
    daily_bank_rows, bank_opening = build_daily(bank_accounts)
    daily_cash_flow = {
        "days": daily_cash_rows, "opening_balance": cash_opening,
        "closing_balance": daily_cash_rows[-1]["balance"] if daily_cash_rows else cash_opening,
        "total_receipts": sum(r["receipts"] for r in daily_cash_rows),
        "total_payments": sum(r["payments"] for r in daily_cash_rows),
    }
    daily_bank_movement = {
        "days": daily_bank_rows, "opening_balance": bank_opening,
        "closing_balance": daily_bank_rows[-1]["balance"] if daily_bank_rows else bank_opening,
        "total_receipts": sum(r["receipts"] for r in daily_bank_rows),
        "total_payments": sum(r["payments"] for r in daily_bank_rows),
    }

    # ---- Receipts (Payment Entry, Receive) --------------------------------------
    receipts = frappe.db.sql("""
        SELECT name AS reference, payment_date AS date, party_type, party, party_name,
               paid_to AS account, mode_of_payment, reference_no, paid_amount AS amount
        FROM `tabPayment Entry`
        WHERE company = %(company)s AND docstatus = 1 AND payment_type = 'Receive'
          AND payment_date BETWEEN %(from_date)s AND %(to_date)s
        ORDER BY payment_date DESC
    """, params, as_dict=True)
    for r in receipts:
        r["amount"] = flt(r["amount"])
    receipts_total = sum(r["amount"] for r in receipts)

    # ---- Payments (Payment Entry, Pay + Expense paid directly) -----------------
    payment_entries = frappe.db.sql("""
        SELECT name AS reference, payment_date AS date, party_type, party, party_name,
               paid_from AS account, mode_of_payment, reference_no, paid_amount AS amount,
               'Payment Entry' AS source
        FROM `tabPayment Entry`
        WHERE company = %(company)s AND docstatus = 1 AND payment_type = 'Pay'
          AND payment_date BETWEEN %(from_date)s AND %(to_date)s
    """, params, as_dict=True)
    expense_payments = frappe.db.sql("""
        SELECT name AS reference, posting_date AS date, 'Supplier' AS party_type,
               vendor AS party, vendor AS party_name,
               paid_through AS account, NULL AS mode_of_payment, reference_no,
               total_amount AS amount, 'Expense' AS source
        FROM `tabExpense`
        WHERE company = %(company)s AND docstatus = 1
          AND posting_date BETWEEN %(from_date)s AND %(to_date)s
    """, params, as_dict=True)
    payments = payment_entries + expense_payments
    for r in payments:
        r["amount"] = flt(r["amount"])
    payments.sort(key=lambda x: x["date"], reverse=True)
    payments_total = sum(r["amount"] for r in payments)

    # ---- Cash Forecast + Fund Requirement ---------------------------------------
    ar_rows = frappe.db.sql("""
        SELECT outstanding_amount AS amount, DATEDIFF(due_date, %(to_date)s) AS days_until
        FROM `tabSales Invoice`
        WHERE company = %(company)s AND docstatus = 1 AND outstanding_amount != 0
    """, params, as_dict=True)
    ap_rows = frappe.db.sql("""
        SELECT outstanding_amount AS amount, DATEDIFF(due_date, %(to_date)s) AS days_until
        FROM `tabPurchase Invoice`
        WHERE company = %(company)s AND docstatus = 1 AND outstanding_amount != 0
    """, params, as_dict=True)

    bucket_defs = [
        ("overdue",  "Overdue"),
        ("d0_7",     "Due 0-7 days"),
        ("d8_15",    "Due 8-15 days"),
        ("d16_30",   "Due 16-30 days"),
        ("d31_60",   "Due 31-60 days"),
        ("d60_plus", "Due 60+ days"),
    ]
    fc = {k: {"key": k, "label": label, "inflow": 0.0, "outflow": 0.0} for k, label in bucket_defs}
    for r in ar_rows:
        fc[_forecast_bucket_for(r["days_until"] or 0)]["inflow"] += flt(r["amount"])
    for r in ap_rows:
        fc[_forecast_bucket_for(r["days_until"] or 0)]["outflow"] += flt(r["amount"])

    current_position = total_cash + total_bank
    running_balance = current_position
    forecast_rows = []
    fund_requirement_rows = []
    peak_requirement = 0.0
    for k, label in bucket_defs:
        b = fc[k]
        net = b["inflow"] - b["outflow"]
        running_balance += net
        shortfall = max(0.0, -running_balance)
        peak_requirement = max(peak_requirement, shortfall)
        forecast_rows.append({
            "key": k, "label": label, "inflow": b["inflow"], "outflow": b["outflow"],
            "net": net, "projected_balance": running_balance,
        })
        if shortfall > 0:
            fund_requirement_rows.append({"key": k, "label": label, "shortfall": shortfall})

    return {
        "as_of_date": to_date,
        "cash_position": {"rows": cash_position_rows, "total": total_cash},
        "bank_balance": {"rows": bank_balance_rows, "total": total_bank},
        "daily_cash_flow": daily_cash_flow,
        "daily_bank_movement": daily_bank_movement,
        "receipts": {"rows": receipts, "total": receipts_total},
        "payments": {"rows": payments, "total": payments_total},
        "cash_forecast": {"rows": forecast_rows, "current_position": current_position},
        "fund_requirement": {"rows": fund_requirement_rows, "peak_requirement": peak_requirement},
    }

# ── Customer MIS ─────────────────────────────────────────────────────────────

@frappe.whitelist()
def get_customer_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Customer MIS bundle for the given period: New Customers, Active
    Customers, Repeat Customers, Customer-wise Sales, Customer-wise
    Outstanding, Customer-wise Profit, Customer Retention, Top Customers,
    and Inactive Customers — all in one call so the Customer MIS tab can
    switch between sub-views without re-querying.

    "Active" = at least one submitted Sales Invoice posted within the
    period. "New" = the customer's all-time first submitted invoice falls
    within the period. "Repeat" = 2 or more submitted invoices within the
    period. "Customer-wise Outstanding" is evaluated as of `to_date`
    (unpaid invoices don't carry a historical balance, only a current
    outstanding_amount). "Customer-wise Profit" uses the same cost basis
    as get_invoice_wise_profit()/get_profit_wise_report(): current average
    valuation rate per item (Bin table, sellable warehouses only), falling
    back to the item's standard_buying_rate — a current-cost estimate, not
    a historical/FIFO cost at time of sale.

    "Customer Retention" compares the period to an immediately preceding
    period of equal length: retention % = customers active in both /
    customers active in the prior period. "Inactive Customers" are
    non-disabled customers with at least one historical invoice but none
    in the current period, sorted by most-recent last purchase first.
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date, "as_of_date": to_date}

    # ---- Active Customers (>=1 invoice in period) -------------------------------
    active_rows = frappe.db.sql("""
        SELECT
            si.customer AS customer, si.customer_name AS customer_name,
            COUNT(si.name) AS invoice_count,
            SUM(si.grand_total) AS total_amount,
            MIN(si.posting_date) AS first_invoice_in_period,
            MAX(si.posting_date) AS last_invoice_in_period
        FROM `tabSales Invoice` si
        WHERE si.company = %(company)s AND si.docstatus = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY si.customer, si.customer_name
        ORDER BY total_amount DESC
    """, params, as_dict=True)
    for r in active_rows:
        r["total_amount"] = flt(r["total_amount"])
    active_customer_names = {r["customer"] for r in active_rows}
    active_total_revenue = sum(r["total_amount"] for r in active_rows)

    # ---- New Customers (all-time first invoice falls within period) ------------
    new_rows = frappe.db.sql("""
        SELECT customer, customer_name, MIN(posting_date) AS first_invoice_date
        FROM `tabSales Invoice`
        WHERE company = %(company)s AND docstatus = 1
        GROUP BY customer, customer_name
        HAVING MIN(posting_date) BETWEEN %(from_date)s AND %(to_date)s
        ORDER BY first_invoice_date
    """, params, as_dict=True)
    active_by_name = {r["customer"]: r for r in active_rows}
    for r in new_rows:
        a = active_by_name.get(r["customer"], {})
        r["invoice_count"] = a.get("invoice_count", 0)
        r["total_amount"] = a.get("total_amount", 0)

    # ---- Repeat Customers (>=2 invoices in period) ------------------------------
    repeat_rows = [r for r in active_rows if r["invoice_count"] >= 2]
    repeat_total_revenue = sum(r["total_amount"] for r in repeat_rows)

    # ---- Customer-wise Sales -----------------------------------------------------
    customer_wise_sales = get_customer_wise_sales(company, from_date, to_date)

    # ---- Customer-wise Outstanding (as of to_date) -------------------------------
    outstanding_rows = frappe.db.sql("""
        SELECT
            si.customer AS customer, si.customer_name AS customer_name,
            COUNT(si.name) AS invoice_count,
            SUM(si.outstanding_amount) AS outstanding_amount,
            MIN(si.due_date) AS oldest_due_date,
            MAX(DATEDIFF(%(as_of_date)s, si.due_date)) AS max_overdue_days
        FROM `tabSales Invoice` si
        WHERE si.company = %(company)s AND si.docstatus = 1
          AND si.outstanding_amount > 0
        GROUP BY si.customer, si.customer_name
        ORDER BY outstanding_amount DESC
    """, params, as_dict=True)
    for r in outstanding_rows:
        r["outstanding_amount"] = flt(r["outstanding_amount"])
    total_outstanding = sum(r["outstanding_amount"] for r in outstanding_rows)

    # ---- Customer-wise Profit (period, same cost basis as invoice/item profit) --
    wip_warehouses = set(
        frappe.get_all("Work Order", filters={"wip_warehouse": ["is", "set"]}, pluck="wip_warehouse")
    )
    default_wip = frappe.db.get_single_value("Manufacturing Settings", "default_wip_warehouse")
    if default_wip:
        wip_warehouses.add(default_wip)
    wip_cond = ""
    profit_params = dict(params)
    if wip_warehouses:
        wip_cond = "AND b.warehouse NOT IN %(wip_warehouses)s"
        profit_params["wip_warehouses"] = tuple(wip_warehouses)

    profit_rows = frappe.db.sql(f"""
        SELECT
            si.customer                          AS customer,
            si.customer_name                     AS customer_name,
            COUNT(DISTINCT si.name)              AS invoice_count,
            SUM(sii.amount)                      AS revenue,
            SUM(sii.qty * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0)) AS total_cost,
            SUM(sii.amount) - SUM(sii.qty * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0)) AS profit,
            CASE WHEN SUM(sii.amount) != 0
                 THEN (SUM(sii.amount) - SUM(sii.qty * COALESCE(ic.avg_valuation_rate, i.standard_buying_rate, 0)))
                      / SUM(sii.amount) * 100
                 ELSE 0 END                      AS margin_pct
        FROM `tabSales Invoice Item` sii
        JOIN `tabSales Invoice` si ON si.name = sii.parent AND sii.parenttype = 'Sales Invoice'
        JOIN `tabItem` i ON i.name = sii.item_code
        LEFT JOIN (
            SELECT b.item_code,
                   CASE WHEN SUM(b.actual_qty) > 0
                        THEN SUM(b.stock_value) / SUM(b.actual_qty)
                        ELSE 0 END AS avg_valuation_rate
            FROM `tabBin` b
            WHERE 1 = 1 {wip_cond}
            GROUP BY b.item_code
        ) ic ON ic.item_code = sii.item_code
        WHERE si.company      = %(company)s
          AND si.docstatus    = 1
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY si.customer, si.customer_name
        ORDER BY profit DESC
    """, profit_params, as_dict=True)
    total_profit = sum(flt(r["profit"]) for r in profit_rows)

    # ---- Customer Retention (vs. equal-length prior period) ---------------------
    period_days = date_diff(to_date, from_date) + 1
    prev_to = add_days(getdate(from_date), -1)
    prev_from = add_days(prev_to, -(period_days - 1))
    prev_rows = frappe.db.sql("""
        SELECT DISTINCT si.customer AS customer, si.customer_name AS customer_name
        FROM `tabSales Invoice` si
        WHERE si.company = %(company)s AND si.docstatus = 1
          AND si.posting_date BETWEEN %(prev_from)s AND %(prev_to)s
    """, {"company": company, "prev_from": prev_from, "prev_to": prev_to}, as_dict=True)
    prev_names = {r["customer"]: r["customer_name"] for r in prev_rows}
    curr_names = {r["customer"]: r["customer_name"] for r in active_rows}
    retained = prev_names.keys() & curr_names.keys()
    churned = prev_names.keys() - curr_names.keys()
    newly_acquired = curr_names.keys() - prev_names.keys()
    retention_pct = (len(retained) / len(prev_names) * 100) if prev_names else 0
    retention_rows = (
        [{"customer": c, "customer_name": prev_names[c], "status": "Retained"} for c in retained]
        + [{"customer": c, "customer_name": prev_names[c], "status": "Churned"} for c in churned]
        + [{"customer": c, "customer_name": curr_names[c], "status": "New"} for c in newly_acquired]
    )
    retention_rows.sort(key=lambda x: (x["status"] != "Churned", x["customer_name"] or ""))
    customer_retention = {
        "prev_from": str(prev_from), "prev_to": str(prev_to),
        "prev_period_customers": len(prev_names), "current_period_customers": len(curr_names),
        "retained_count": len(retained), "churned_count": len(churned), "new_count": len(newly_acquired),
        "retention_pct": retention_pct, "rows": retention_rows,
    }

    # ---- Top Customers (top 10 by revenue in period) -----------------------------
    top_customers = active_rows[:10]

    # ---- Inactive Customers (historical customers with no invoice in period) ----
    lifetime_rows = frappe.db.sql("""
        SELECT si.customer AS customer, si.customer_name AS customer_name,
               MAX(si.posting_date) AS last_invoice_date,
               COUNT(si.name) AS invoice_count,
               SUM(si.grand_total) AS lifetime_revenue
        FROM `tabSales Invoice` si
        WHERE si.company = %(company)s AND si.docstatus = 1
        GROUP BY si.customer, si.customer_name
    """, params, as_dict=True)
    disabled_customers = set(frappe.get_all("Customer", filters={"disabled": 1}, pluck="name"))
    inactive_rows = [
        {
            "customer": r["customer"], "customer_name": r["customer_name"],
            "last_invoice_date": r["last_invoice_date"],
            "days_inactive": date_diff(to_date, r["last_invoice_date"]),
            "invoice_count": r["invoice_count"], "lifetime_revenue": flt(r["lifetime_revenue"]),
        }
        for r in lifetime_rows
        if r["customer"] not in active_customer_names and r["customer"] not in disabled_customers
    ]
    inactive_rows.sort(key=lambda x: x["last_invoice_date"], reverse=True)

    total_customers = frappe.db.count("Customer", filters={"disabled": 0})

    return {
        "from_date": from_date, "to_date": to_date,
        "summary": {
            "total_customers": total_customers,
            "active_count": len(active_rows), "active_revenue": active_total_revenue,
            "new_count": len(new_rows), "repeat_count": len(repeat_rows),
            "repeat_revenue": repeat_total_revenue,
            "inactive_count": len(inactive_rows),
            "retention_pct": retention_pct,
            "total_outstanding": total_outstanding, "total_profit": total_profit,
        },
        "new_customers": {"rows": new_rows, "count": len(new_rows)},
        "active_customers": {"rows": active_rows, "count": len(active_rows), "total": active_total_revenue},
        "repeat_customers": {"rows": repeat_rows, "count": len(repeat_rows), "total": repeat_total_revenue},
        "customer_wise_sales": {"rows": customer_wise_sales},
        "customer_wise_outstanding": {"rows": outstanding_rows, "total": total_outstanding},
        "customer_wise_profit": {"rows": profit_rows, "total": total_profit},
        "customer_retention": customer_retention,
        "top_customers": {"rows": top_customers},
        "inactive_customers": {"rows": inactive_rows, "count": len(inactive_rows)},
    }


# ── Supplier MIS ─────────────────────────────────────────────────────────────

@frappe.whitelist()
def get_supplier_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Supplier MIS bundle for the given period: Supplier-wise Purchase,
    Supplier Outstanding, Supplier Payment Ageing, Purchase Price
    Comparison, Supplier Performance, Delivery Performance, and Quality /
    Rejection — all in one call so the Supplier MIS tab can switch between
    sub-views without re-querying.

    Scope note: purchase figures (Supplier-wise Purchase, Purchase Price
    Comparison) use submitted, non-return Purchase Invoices within
    from_date..to_date. Supplier Outstanding / Payment Ageing are evaluated
    as of `to_date` (same as-of-date model as Payables MIS / AP Aging) over
    ALL submitted Purchase Invoices with a non-zero outstanding_amount, not
    just this period's — an invoice billed last quarter can still be
    outstanding today. Delivery Performance / Quality-Rejection are driven
    by submitted Purchase Receipts posted within the period.

    "Purchase Price Comparison" shows, per item purchased from more than
    one supplier in the period, the weighted-average rate paid to each
    supplier side by side, flagging the cheapest (`is_lowest`) — useful for
    spotting suppliers overcharging relative to a cheaper alternative
    already in use.

    "Delivery Performance" compares each Purchase Receipt's posting_date to
    its linked Purchase Order's expected_delivery_date (DATEDIFF: positive
    = late). Receipts with no linked Purchase Order (expected_delivery_date
    unknown) are listed but excluded from the on-time % calculation.

    "Quality / Rejection" sums accepted_qty vs rejected_qty from Purchase
    Receipt Item for receipts posted in the period, per supplier and per
    item.

    "Supplier Performance" is a per-supplier scorecard combining purchase
    volume, on-time delivery %, rejection %, and average purchase price
    variance vs the Item master's Standard Buying Rate (same variance basis
    as Purchase MIS), with a composite 0-100 score averaged across
    whichever of those three sub-metrics have data for that supplier (a
    supplier with no receipts in the period simply has no delivery/quality
    score component, rather than being penalised for it).
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date, "as_of_date": to_date}

    # ---- Supplier-wise Purchase --------------------------------------------------
    supplier_wise_purchase = frappe.db.sql("""
        SELECT
            pi.supplier AS supplier, pi.supplier_name AS supplier_name,
            COUNT(pi.name)                     AS invoice_count,
            SUM(pi.net_total)                  AS net_total,
            SUM(pi.additional_discount_amount) AS total_discount,
            SUM(pi.total_tax)                  AS total_tax,
            SUM(pi.grand_total)                AS total_amount,
            SUM(pi.outstanding_amount)         AS outstanding_amount,
            CASE WHEN COUNT(pi.name) != 0
                 THEN SUM(pi.grand_total) / COUNT(pi.name)
                 ELSE 0 END                    AS avg_invoice_value
        FROM `tabPurchase Invoice` pi
        WHERE pi.company = %(company)s AND pi.docstatus = 1 AND pi.is_return = 0
          AND pi.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY pi.supplier, pi.supplier_name
        ORDER BY total_amount DESC
    """, params, as_dict=True)
    for r in supplier_wise_purchase:
        for k in ("net_total", "total_discount", "total_tax", "total_amount", "outstanding_amount", "avg_invoice_value"):
            r[k] = flt(r[k])
    total_purchase_period = sum(r["total_amount"] for r in supplier_wise_purchase)

    # ---- Supplier Outstanding (as of to_date, all-time invoices) ----------------
    open_bills = frappe.db.sql("""
        SELECT
            pi.name AS invoice, pi.supplier AS supplier, pi.supplier_name AS supplier_name,
            pi.due_date AS due_date, pi.outstanding_amount AS outstanding_amount,
            DATEDIFF(%(as_of_date)s, pi.due_date) AS overdue_days
        FROM `tabPurchase Invoice` pi
        WHERE pi.company = %(company)s AND pi.docstatus = 1
          AND pi.outstanding_amount != 0
        ORDER BY pi.supplier, pi.due_date
    """, params, as_dict=True)
    for r in open_bills:
        r["outstanding_amount"] = flt(r["outstanding_amount"])
        r["overdue_days"] = r["overdue_days"] or 0

    outstanding_map: dict[str, dict] = {}
    for r in open_bills:
        s = outstanding_map.setdefault(r["supplier"], {
            "supplier": r["supplier"], "supplier_name": r.get("supplier_name") or r["supplier"],
            "invoice_count": 0, "outstanding_amount": 0.0, "overdue_amount": 0.0, "max_overdue_days": 0,
        })
        s["invoice_count"] += 1
        s["outstanding_amount"] += r["outstanding_amount"]
        if r["overdue_days"] > 0:
            s["overdue_amount"] += r["outstanding_amount"]
            s["max_overdue_days"] = max(s["max_overdue_days"], r["overdue_days"])
    supplier_outstanding = sorted(outstanding_map.values(), key=lambda x: x["outstanding_amount"], reverse=True)
    total_outstanding = sum(s["outstanding_amount"] for s in supplier_outstanding)

    # ---- Supplier Payment Ageing (backward-looking, bucketed by overdue days) ---
    ageing_map: dict[str, dict] = {}
    for r in open_bills:
        s = ageing_map.setdefault(r["supplier"], {
            "supplier": r["supplier"], "supplier_name": r.get("supplier_name") or r["supplier"],
            "current": 0.0, "days_1_30": 0.0, "days_31_60": 0.0, "days_61_90": 0.0, "days_90_plus": 0.0, "total": 0.0,
        })
        amt = r["outstanding_amount"]
        days = r["overdue_days"]
        if days <= 0:
            s["current"] += amt
        elif days <= 30:
            s["days_1_30"] += amt
        elif days <= 60:
            s["days_31_60"] += amt
        elif days <= 90:
            s["days_61_90"] += amt
        else:
            s["days_90_plus"] += amt
        s["total"] += amt
    supplier_payment_ageing = sorted(ageing_map.values(), key=lambda x: x["total"], reverse=True)

    # ---- Purchase Price Comparison (item x supplier, weighted-avg rate) ---------
    ppc_rows = frappe.db.sql("""
        SELECT
            pii.item_code AS item_code, pii.item_name AS item_name, pii.uom AS uom,
            pi.supplier AS supplier, pi.supplier_name AS supplier_name,
            SUM(pii.qty)    AS qty,
            SUM(pii.amount) AS amount,
            i.standard_buying_rate AS standard_rate
        FROM `tabPurchase Invoice Item` pii
        JOIN `tabPurchase Invoice` pi ON pi.name = pii.parent AND pii.parenttype = 'Purchase Invoice'
        LEFT JOIN `tabItem` i ON i.name = pii.item_code
        WHERE pi.company = %(company)s AND pi.docstatus = 1 AND pi.is_return = 0
          AND pi.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY pii.item_code, pii.item_name, pii.uom, pi.supplier, pi.supplier_name, i.standard_buying_rate
        HAVING qty != 0
    """, params, as_dict=True)
    by_item: dict[str, list] = {}
    for r in ppc_rows:
        qty = flt(r["qty"])
        r["qty"] = qty
        r["avg_rate"] = flt(r["amount"]) / qty if qty else 0
        r["standard_rate"] = flt(r.get("standard_rate"))
        by_item.setdefault(r["item_code"], []).append(r)
    price_comparison_rows = []
    for item_code, item_rows in by_item.items():
        min_rate = min(x["avg_rate"] for x in item_rows)
        supplier_count = len(item_rows)
        for x in sorted(item_rows, key=lambda x: x["avg_rate"]):
            price_comparison_rows.append({
                "item_code": item_code, "item_name": x["item_name"], "uom": x.get("uom"),
                "supplier": x["supplier"], "supplier_name": x["supplier_name"],
                "qty": x["qty"], "avg_rate": x["avg_rate"], "supplier_count": supplier_count,
                "is_lowest": x["avg_rate"] == min_rate,
                "variance_vs_lowest_pct": ((x["avg_rate"] - min_rate) / min_rate * 100) if min_rate else 0,
            })
    price_comparison_rows.sort(key=lambda x: (x["item_name"] or x["item_code"], x["avg_rate"]))
    multi_supplier_item_count = sum(1 for rows in by_item.values() if len(rows) > 1)

    # ---- Delivery Performance (Purchase Receipt vs PO expected_delivery_date) ---
    receipt_rows = frappe.db.sql("""
        SELECT
            pr.name AS receipt, pr.posting_date AS received_date,
            pr.supplier AS supplier, pr.supplier_name AS supplier_name,
            pr.purchase_order AS purchase_order, po.expected_delivery_date AS expected_date,
            CASE WHEN po.expected_delivery_date IS NOT NULL
                 THEN DATEDIFF(pr.posting_date, po.expected_delivery_date)
                 ELSE NULL END AS delay_days
        FROM `tabPurchase Receipt` pr
        LEFT JOIN `tabPurchase Order` po ON po.name = pr.purchase_order
        WHERE pr.company = %(company)s AND pr.docstatus = 1
          AND pr.posting_date BETWEEN %(from_date)s AND %(to_date)s
        ORDER BY pr.posting_date DESC
    """, params, as_dict=True)
    for r in receipt_rows:
        r["on_time"] = (r["delay_days"] is not None and r["delay_days"] <= 0)
        r["has_reference"] = r["delay_days"] is not None

    dated_receipts = [r for r in receipt_rows if r["has_reference"]]
    on_time_count = sum(1 for r in dated_receipts if r["on_time"])
    delivery_summary = {
        "total_receipts": len(receipt_rows),
        "dated_receipts": len(dated_receipts),
        "on_time_count": on_time_count,
        "late_count": len(dated_receipts) - on_time_count,
        "on_time_pct": (on_time_count / len(dated_receipts) * 100) if dated_receipts else 0,
        "undated_count": len(receipt_rows) - len(dated_receipts),
    }
    delivery_by_supplier_map: dict[str, dict] = {}
    for r in dated_receipts:
        s = delivery_by_supplier_map.setdefault(r["supplier"], {
            "supplier": r["supplier"], "supplier_name": r.get("supplier_name") or r["supplier"],
            "receipt_count": 0, "on_time_count": 0, "late_count": 0, "total_delay_days": 0,
        })
        s["receipt_count"] += 1
        if r["on_time"]:
            s["on_time_count"] += 1
        else:
            s["late_count"] += 1
        s["total_delay_days"] += max(0, r["delay_days"] or 0)
    delivery_by_supplier = []
    for s in delivery_by_supplier_map.values():
        s["on_time_pct"] = (s["on_time_count"] / s["receipt_count"] * 100) if s["receipt_count"] else 0
        s["avg_delay_days"] = (s["total_delay_days"] / s["late_count"]) if s["late_count"] else 0
        delivery_by_supplier.append(s)
    delivery_by_supplier.sort(key=lambda x: x["on_time_pct"])

    # ---- Quality / Rejection (Purchase Receipt Item, period) --------------------
    quality_rows = frappe.db.sql("""
        SELECT
            pr.supplier AS supplier, pr.supplier_name AS supplier_name,
            pri.item_code AS item_code, pri.item_name AS item_name,
            SUM(pri.qty)          AS received_qty,
            SUM(pri.accepted_qty) AS accepted_qty,
            SUM(pri.rejected_qty) AS rejected_qty
        FROM `tabPurchase Receipt Item` pri
        JOIN `tabPurchase Receipt` pr ON pr.name = pri.parent AND pri.parenttype = 'Purchase Receipt'
        WHERE pr.company = %(company)s AND pr.docstatus = 1
          AND pr.posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY pr.supplier, pr.supplier_name, pri.item_code, pri.item_name
        ORDER BY rejected_qty DESC
    """, params, as_dict=True)
    for r in quality_rows:
        r["received_qty"] = flt(r["received_qty"])
        r["accepted_qty"] = flt(r["accepted_qty"])
        r["rejected_qty"] = flt(r["rejected_qty"])
        r["rejection_pct"] = (r["rejected_qty"] / r["received_qty"] * 100) if r["received_qty"] else 0

    quality_by_supplier_map: dict[str, dict] = {}
    for r in quality_rows:
        s = quality_by_supplier_map.setdefault(r["supplier"], {
            "supplier": r["supplier"], "supplier_name": r.get("supplier_name") or r["supplier"],
            "received_qty": 0.0, "accepted_qty": 0.0, "rejected_qty": 0.0,
        })
        s["received_qty"] += r["received_qty"]
        s["accepted_qty"] += r["accepted_qty"]
        s["rejected_qty"] += r["rejected_qty"]
    quality_by_supplier = []
    for s in quality_by_supplier_map.values():
        s["rejection_pct"] = (s["rejected_qty"] / s["received_qty"] * 100) if s["received_qty"] else 0
        quality_by_supplier.append(s)
    quality_by_supplier.sort(key=lambda x: x["rejection_pct"], reverse=True)
    total_received_qty = sum(r["received_qty"] for r in quality_rows)
    total_rejected_qty = sum(r["rejected_qty"] for r in quality_rows)
    quality_summary = {
        "total_received_qty": total_received_qty,
        "total_rejected_qty": total_rejected_qty,
        "overall_rejection_pct": (total_rejected_qty / total_received_qty * 100) if total_received_qty else 0,
    }

    # ---- Supplier Performance (combined scorecard) -------------------------------
    price_variance_by_supplier: dict[str, dict] = {}
    for r in ppc_rows:
        std = flt(r.get("standard_rate"))
        if std <= 0:
            continue
        qty = flt(r["qty"])
        actual_rate = flt(r["amount"]) / qty if qty else 0
        variance_pct = (actual_rate - std) / std * 100
        s = price_variance_by_supplier.setdefault(r["supplier"], {"weighted_sum": 0.0, "weight": 0.0})
        s["weighted_sum"] += abs(variance_pct) * qty
        s["weight"] += qty
    avg_variance_pct_by_supplier = {
        sup: (v["weighted_sum"] / v["weight"]) for sup, v in price_variance_by_supplier.items() if v["weight"]
    }

    delivery_by_supplier_lookup = {s["supplier"]: s for s in delivery_by_supplier}
    quality_by_supplier_lookup = {s["supplier"]: s for s in quality_by_supplier}
    outstanding_by_supplier_lookup = {s["supplier"]: s for s in supplier_outstanding}

    supplier_performance = []
    for p in supplier_wise_purchase:
        sup = p["supplier"]
        dp = delivery_by_supplier_lookup.get(sup)
        qp = quality_by_supplier_lookup.get(sup)
        vp = avg_variance_pct_by_supplier.get(sup)
        on_time_pct = dp["on_time_pct"] if dp else None
        rejection_pct = qp["rejection_pct"] if qp else None
        score_components = []
        if on_time_pct is not None:
            score_components.append(on_time_pct)
        if rejection_pct is not None:
            score_components.append(max(0.0, 100 - rejection_pct))
        if vp is not None:
            score_components.append(max(0.0, 100 - min(vp, 100)))
        score = (sum(score_components) / len(score_components)) if score_components else None
        supplier_performance.append({
            "supplier": sup, "supplier_name": p.get("supplier_name") or sup,
            "invoice_count": p["invoice_count"], "total_purchase_amount": p["total_amount"],
            "outstanding_amount": outstanding_by_supplier_lookup.get(sup, {}).get("outstanding_amount", 0),
            "on_time_delivery_pct": on_time_pct, "rejection_pct": rejection_pct,
            "avg_price_variance_pct": vp, "performance_score": score,
        })
    supplier_performance.sort(key=lambda x: x["total_purchase_amount"], reverse=True)

    return {
        "from_date": from_date, "to_date": to_date,
        "supplier_wise_purchase": {"rows": supplier_wise_purchase, "total": total_purchase_period},
        "supplier_outstanding": {"rows": supplier_outstanding, "total": total_outstanding},
        "supplier_payment_ageing": {"rows": supplier_payment_ageing},
        "purchase_price_comparison": {"rows": price_comparison_rows, "multi_supplier_item_count": multi_supplier_item_count},
        "supplier_performance": {"rows": supplier_performance},
        "delivery_performance": {"rows": receipt_rows, "by_supplier": delivery_by_supplier, "summary": delivery_summary},
        "quality_rejection": {"rows": quality_rows, "by_supplier": quality_by_supplier, "summary": quality_summary},
    }


# ── Employee / Performance MIS ──────────────────────────────────────────────

OVERTIME_THRESHOLD_MINS = 480  # 8-hour standard shift, used only for the Overtime proxy below

@frappe.whitelist()
def get_employee_mis(company: str, from_date: str, to_date: str) -> dict:
    """
    Employee / Performance MIS bundle: Employee Attendance, Department-wise
    Manpower, Salesperson Target vs Achievement, Salesperson Collection,
    Production Employee Productivity, Overtime, Labour Cost, and Employee
    Performance — all in one call so the Employee / Performance MIS tab can
    switch between sub-views without re-querying.

    This app has no HR/Payroll module — no Employee master, no Attendance
    doctype, no shift or wage-rate records — so every sub-view here is a
    proxy built from whichever existing doctype happens to carry an
    employee-shaped field, and is flagged as such (in the UI too):
      - Employee Attendance / Overtime / Production Employee Productivity /
        Labour Cost all read Job Card Time Log rows (the only place a named
        individual + worked minutes is recorded). "employee" there is a
        free-text field typed on the Job Card/Time Log, not a linked
        master, so it only reflects shop-floor staff who had time logged
        against a Job Card in the period — nobody else appears.
      - Attendance is approximated as "had at least one time log that day";
        there's no clock-in/out or leave record, so a present day just
        means some Job Card time was logged that date. Overtime uses a
        hardcoded 8-hour/day threshold (OVERTIME_THRESHOLD_MINS) since
        there's no shift doctype to read an actual shift length from.
      - Labour Cost values time using each Job Card's Workstation.hour_rate
        (a machine/workstation billing rate) — there is no per-employee
        wage field anywhere in this app, so this is a cost-of-time proxy,
        not a real payroll cost.
      - Department-wise Manpower uses Sales Person (the only doctype in
        this app with a department field), so it only reflects headcount
        recorded there — it does not include shop-floor employees, who
        have no department field at all.
      - Salesperson Target vs Achievement / Salesperson Collection use the
        Sales Invoice.sales_person field (Sales Order carries no
        sales_person field). Like Sales MIS / Receivables MIS / Purchase
        MIS, there's no stored Target doctype, so only the achieved figure
        is returned here; any target is entered by the user and compared
        client-side.
      - Employee Performance is a composite score (attendance %, output
        rate vs the team average, and rejection %) over the same Job Card
        Time Log population as above — again shop-floor employees only.
    """
    params = {"company": company, "from_date": from_date, "to_date": to_date}
    period_days = date_diff(to_date, from_date) + 1
    if period_days <= 0:
        period_days = 1

    # ---- Raw Job Card Time Log rows for the period (base for 4 of the 8 views) ----
    tl_rows = frappe.db.sql("""
        SELECT tl.employee AS employee, tl.time_in_mins AS time_in_mins, tl.from_time AS from_time,
               jc.name AS job_card, jc.operation AS operation, jc.work_order AS work_order,
               jc.workstation AS workstation, jc.for_quantity AS for_quantity, jc.status AS status,
               jc.actual_end_time AS actual_end_time
        FROM `tabJob Card Time Log` tl
        JOIN `tabJob Card` jc ON jc.name = tl.parent AND tl.parenttype = 'Job Card'
        WHERE jc.company = %(company)s AND IFNULL(tl.employee, '') != ''
          AND tl.from_time IS NOT NULL
          AND DATE(tl.from_time) BETWEEN %(from_date)s AND %(to_date)s
    """, params, as_dict=True)

    # ---- Employee Attendance (proxy: days with >=1 time log) -------------------
    day_map = {}  # (employee, date) -> total mins that day
    for r in tl_rows:
        key = (r["employee"], str(getdate(r["from_time"])))
        day_map[key] = day_map.get(key, 0) + flt(r["time_in_mins"])

    attendance_by_emp = {}
    for (emp, day), mins in day_map.items():
        a = attendance_by_emp.setdefault(emp, {"employee": emp, "present_days": 0, "total_mins": 0})
        a["present_days"] += 1
        a["total_mins"] += mins
    attendance_rows = []
    for a in attendance_by_emp.values():
        total_hours = round(a["total_mins"] / 60, 2)
        attendance_rows.append({
            "employee": a["employee"],
            "present_days": a["present_days"],
            "period_days": period_days,
            "attendance_pct": round(min(a["present_days"] / period_days * 100, 100), 1),
            "total_hours": total_hours,
            "avg_hours_per_day": round(total_hours / a["present_days"], 2) if a["present_days"] else 0,
        })
    attendance_rows.sort(key=lambda x: x["attendance_pct"], reverse=True)
    attendance_pct_by_emp = {r["employee"]: r["attendance_pct"] for r in attendance_rows}

    # ---- Department-wise Manpower (Sales Person is the only doctype with department) ----
    sales_persons = frappe.get_all(
        "Sales Person", filters={"disabled": 0},
        fields=["name", "sales_person_name", "department", "designation"],
    )
    dept_map = {}
    for sp in sales_persons:
        dept = sp.get("department") or "Unassigned"
        d = dept_map.setdefault(dept, {"department": dept, "headcount": 0, "employees": []})
        d["headcount"] += 1
        d["employees"].append({
            "name": sp["name"],
            "sales_person_name": sp.get("sales_person_name") or sp["name"],
            "designation": sp.get("designation") or "",
        })
    department_manpower = sorted(dept_map.values(), key=lambda x: x["headcount"], reverse=True)
    department_manpower_total = sum(d["headcount"] for d in department_manpower)

    # ---- Salesperson Target vs Achievement (actual sales; no stored target) ----
    sp_sales_rows = frappe.db.sql("""
        SELECT si.sales_person AS sales_person, sp.sales_person_name AS sales_person_name,
               sp.department AS department,
               COUNT(si.name) AS invoice_count, SUM(si.grand_total) AS total_amount
        FROM `tabSales Invoice` si
        LEFT JOIN `tabSales Person` sp ON sp.name = si.sales_person
        WHERE si.company = %(company)s AND si.docstatus = 1 AND si.is_return = 0
          AND si.posting_date BETWEEN %(from_date)s AND %(to_date)s
          AND IFNULL(si.sales_person, '') != ''
        GROUP BY si.sales_person
        ORDER BY total_amount DESC
    """, params, as_dict=True)
    unassigned_sales = flt(frappe.db.sql("""
        SELECT SUM(grand_total) FROM `tabSales Invoice`
        WHERE company = %(company)s AND docstatus = 1 AND is_return = 0
          AND posting_date BETWEEN %(from_date)s AND %(to_date)s
          AND IFNULL(sales_person, '') = ''
    """, params)[0][0])
    salesperson_achievement = {
        "rows": sp_sales_rows,
        "total_achieved": sum(flt(r["total_amount"]) for r in sp_sales_rows),
        "unassigned_sales": unassigned_sales,
    }

    # ---- Salesperson Collection (Payment Entry receipts against Sales Invoices) ----
    sp_collection_rows = frappe.db.sql("""
        SELECT si.sales_person AS sales_person, sp.sales_person_name AS sales_person_name,
               COUNT(DISTINCT pe.name) AS payment_count, SUM(per.allocated_amount) AS collected_amount
        FROM `tabPayment Entry Reference` per
        JOIN `tabPayment Entry` pe ON pe.name = per.parent AND per.parenttype = 'Payment Entry'
        JOIN `tabSales Invoice` si ON si.name = per.reference_name AND per.reference_doctype = 'Sales Invoice'
        LEFT JOIN `tabSales Person` sp ON sp.name = si.sales_person
        WHERE pe.company = %(company)s AND pe.docstatus = 1 AND pe.payment_type = 'Receive'
          AND pe.payment_date BETWEEN %(from_date)s AND %(to_date)s
          AND IFNULL(si.sales_person, '') != ''
        GROUP BY si.sales_person
        ORDER BY collected_amount DESC
    """, params, as_dict=True)
    salesperson_collection = {
        "rows": sp_collection_rows,
        "total_collected": sum(flt(r["collected_amount"]) for r in sp_collection_rows),
    }

    # ---- Shared per-job-card apportionment (used by Productivity, Labour Cost, Performance) ----
    card_total_mins = {}
    for r in tl_rows:
        card_total_mins[r["job_card"]] = card_total_mins.get(r["job_card"], 0) + flt(r["time_in_mins"])

    scrap_rows = frappe.db.sql("""
        SELECT jc.name AS job_card, SUM(sci.qty) AS scrap_qty
        FROM `tabJob Card Scrap Item` sci
        JOIN `tabJob Card` jc ON jc.name = sci.parent AND sci.parenttype = 'Job Card'
        WHERE jc.company = %(company)s AND jc.status = 'Completed' AND sci.is_process_loss = 0
          AND jc.actual_end_time IS NOT NULL
          AND DATE(jc.actual_end_time) BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY jc.name
    """, params, as_dict=True)
    scrap_by_card = {r["job_card"]: flt(r["scrap_qty"]) for r in scrap_rows}

    workstation_rate = {w["name"]: flt(w["hour_rate"]) for w in frappe.get_all("Workstation", fields=["name", "hour_rate"])}

    prod = {}   # employee -> productivity accumulator
    labour = {} # employee -> labour cost accumulator
    op_labour = {}  # operation -> labour cost accumulator
    for r in tl_rows:
        emp = r["employee"]
        mins = flt(r["time_in_mins"])
        card = r["job_card"]
        card_total = card_total_mins.get(card, 0)
        time_share = (mins / card_total) if card_total else 0

        p = prod.setdefault(emp, {"employee": emp, "total_mins": 0, "job_cards": set(), "qty_produced": 0.0, "scrap_qty": 0.0})
        p["total_mins"] += mins
        p["job_cards"].add(card)
        if r["status"] == "Completed":
            p["qty_produced"] += flt(r["for_quantity"]) * time_share
            p["scrap_qty"] += scrap_by_card.get(card, 0) * time_share

        rate = workstation_rate.get(r["workstation"], 0)
        cost = (mins / 60) * rate
        l = labour.setdefault(emp, {"employee": emp, "total_hours": 0.0, "total_cost": 0.0})
        l["total_hours"] += mins / 60
        l["total_cost"] += cost

        op_name = r["operation"] or "Unspecified"
        ol = op_labour.setdefault(op_name, {"operation": op_name, "total_hours": 0.0, "total_cost": 0.0, "employees": set()})
        ol["total_hours"] += mins / 60
        ol["total_cost"] += cost
        ol["employees"].add(emp)

    # ---- Production Employee Productivity ---------------------------------------
    productivity_rows = []
    for p in prod.values():
        hours = round(p["total_mins"] / 60, 2)
        qty = round(p["qty_produced"], 2)
        productivity_rows.append({
            "employee": p["employee"],
            "total_hours": hours,
            "job_card_count": len(p["job_cards"]),
            "qty_produced": qty,
            "avg_time_per_unit_mins": round(p["total_mins"] / qty, 2) if qty else None,
            "qty_per_hour": round(qty / hours, 2) if hours else None,
        })
    productivity_rows.sort(key=lambda x: x["total_hours"], reverse=True)
    valid_rates = [r["qty_per_hour"] for r in productivity_rows if r["qty_per_hour"]]
    team_avg_qty_per_hour = (sum(valid_rates) / len(valid_rates)) if valid_rates else 0

    # ---- Overtime (per employee per day, 8-hour threshold) -----------------------
    overtime_day_rows = []
    for (emp, day), mins in day_map.items():
        ot = max(0, mins - OVERTIME_THRESHOLD_MINS)
        overtime_day_rows.append({
            "employee": emp, "work_date": day,
            "total_mins": round(mins, 1),
            "normal_mins": round(min(mins, OVERTIME_THRESHOLD_MINS), 1),
            "overtime_mins": round(ot, 1),
        })
    overtime_day_rows.sort(key=lambda x: (x["employee"], x["work_date"]))
    overtime_by_emp = {}
    for r in overtime_day_rows:
        if r["overtime_mins"] <= 0:
            continue
        o = overtime_by_emp.setdefault(r["employee"], {"employee": r["employee"], "overtime_days": 0, "overtime_mins": 0})
        o["overtime_days"] += 1
        o["overtime_mins"] += r["overtime_mins"]
    overtime_summary = []
    for o in overtime_by_emp.values():
        overtime_summary.append({
            "employee": o["employee"], "overtime_days": o["overtime_days"],
            "overtime_hours": round(o["overtime_mins"] / 60, 2),
        })
    overtime_summary.sort(key=lambda x: x["overtime_hours"], reverse=True)
    overtime_hours_by_emp = {r["employee"]: r["overtime_hours"] for r in overtime_summary}

    # ---- Labour Cost --------------------------------------------------------------
    labour_by_employee = sorted(
        [{"employee": l["employee"], "total_hours": round(l["total_hours"], 2), "total_cost": round(l["total_cost"], 2)}
         for l in labour.values()],
        key=lambda x: x["total_cost"], reverse=True,
    )
    labour_by_operation = sorted(
        [{"operation": ol["operation"], "total_hours": round(ol["total_hours"], 2),
          "total_cost": round(ol["total_cost"], 2), "employee_count": len(ol["employees"])}
         for ol in op_labour.values()],
        key=lambda x: x["total_cost"], reverse=True,
    )
    labour_cost_total = sum(l["total_cost"] for l in labour_by_employee)

    # ---- Employee Performance (composite: attendance %, output rate, rejection %) ----
    performance_rows = []
    for p in prod.values():
        emp = p["employee"]
        hours = p["total_mins"] / 60
        qty = p["qty_produced"]
        qty_per_hour = (qty / hours) if hours else None
        denom = qty + p["scrap_qty"]
        rejection_pct = (p["scrap_qty"] / denom * 100) if denom else None
        attendance_pct = attendance_pct_by_emp.get(emp)
        productivity_index = (qty_per_hour / team_avg_qty_per_hour * 100) if (qty_per_hour is not None and team_avg_qty_per_hour) else None

        score_components = []
        if attendance_pct is not None:
            score_components.append(attendance_pct)
        if rejection_pct is not None:
            score_components.append(max(0.0, 100 - rejection_pct))
        if productivity_index is not None:
            score_components.append(min(productivity_index, 150.0))
        score = (sum(score_components) / len(score_components)) if score_components else None

        performance_rows.append({
            "employee": emp,
            "total_hours": round(hours, 2),
            "qty_produced": round(qty, 2),
            "qty_per_hour": round(qty_per_hour, 2) if qty_per_hour is not None else None,
            "rejection_pct": round(rejection_pct, 2) if rejection_pct is not None else None,
            "attendance_pct": attendance_pct,
            "overtime_hours": overtime_hours_by_emp.get(emp, 0),
            "performance_score": round(score, 1) if score is not None else None,
        })
    performance_rows.sort(key=lambda x: (x["performance_score"] is None, -(x["performance_score"] or 0)))

    return {
        "from_date": from_date, "to_date": to_date, "period_days": period_days,
        "employee_attendance": {"rows": attendance_rows},
        "department_manpower": {"rows": department_manpower, "total_headcount": department_manpower_total},
        "salesperson_achievement": salesperson_achievement,
        "salesperson_collection": salesperson_collection,
        "production_productivity": {"rows": productivity_rows, "team_avg_qty_per_hour": round(team_avg_qty_per_hour, 2)},
        "overtime": {"summary": overtime_summary, "rows": overtime_day_rows},
        "labour_cost": {"by_employee": labour_by_employee, "by_operation": labour_by_operation, "total": round(labour_cost_total, 2)},
        "employee_performance": {"rows": performance_rows},
    }