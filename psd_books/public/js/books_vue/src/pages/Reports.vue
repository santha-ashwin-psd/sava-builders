<template>
  <div class="page-reports">

    <!-- Page header -->
    <div class="reports-header">
      <div>
        <p class="reports-subtitle">Get detailed insights into your business performance</p>
      </div>
      <div class="reports-header-right">
        <div class="reports-header-icons">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="10" width="4" height="10" rx="1"/><rect x="10" y="6" width="4" height="14" rx="1"/><rect x="17" y="13" width="4" height="7" rx="1"/></svg>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v9l7 3"/></svg>
        </div>
      </div>
    </div>

    <!-- Report selector grid -->
    <div class="report-grid">
      <button
        v-for="(r, i) in reports"
        :key="r.key"
        class="report-card"
        :class="[tabColor(i), { active: activeReport === r.key }]"
        @click="activeReport = r.key"
      >
        <span class="report-card-icon" v-html="r.icon"></span>
        <span class="report-card-label">{{ r.label }}</span>
      </button>
    </div>

    <!-- Date range picker (hidden for aging reports which use as-of-date) -->
    <div class="books-card date-range-bar">
      <template v-if="['ar','ap','stockval','price_mrp','payables_mis'].includes(activeReport)">
        <span class="dr-icon">📅</span>
        <label class="dr-label">As of Date</label>
        <input type="date" v-model="toDate" class="dr-input" />
      </template>
      <template v-else>
        <span class="dr-icon">📅</span>
        <label class="dr-label">Date Range</label>
        <input type="date" v-model="fromDate" class="dr-input" />
        <span class="dr-to">To</span>
        <input type="date" v-model="toDate" class="dr-input" />
      </template>
      <button class="books-btn books-btn-primary" @click="runReport">▷ Run Report</button>
      <button class="books-btn dr-reset" @click="resetDateRange">⟳ Reset</button>
      <span class="dr-spacer"></span>
      <button v-if="['ar','ap'].includes(activeReport) && (arAging.length||apAging.length)"
        class="books-btn" style="background:#EBFBEE;color:#2F9E44;border:1px solid #8CE99A"
        @click="exportAgingCSV">
        Export CSV
      </button>
      <button v-if="activeReport === 'items' && itemSales.length"
        class="books-btn" style="background:#EBFBEE;color:#2F9E44;border:1px solid #8CE99A"
        @click="exportItemSalesCSV">
        Export CSV
      </button>
      <button v-if="activeReport === 'customers' && customerSales.length"
        class="books-btn" style="background:#EBFBEE;color:#2F9E44;border:1px solid #8CE99A"
        @click="exportCustomerSalesCSV">
        Export CSV
      </button>
      <button v-if="activeReport === 'profit' && profitReport.length"
        class="books-btn" style="background:#EBFBEE;color:#2F9E44;border:1px solid #8CE99A"
        @click="exportProfitCSV">
        Export CSV
      </button>
      <button v-if="activeReport === 'invoice_profit' && invoiceProfit.length"
        class="books-btn" style="background:#EBFBEE;color:#2F9E44;border:1px solid #8CE99A"
        @click="exportInvoiceProfitCSV">
        Export CSV
      </button>
    </div>

    <!-- P&L -->
    <div v-if="activeReport === 'pl'" class="pl-dash">
      <div class="pl-dash-header">
        <div class="pl-dash-title">
          <span class="pl-dash-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="10" width="4" height="10" rx="1"/><rect x="10" y="6" width="4" height="14" rx="1"/><rect x="17" y="13" width="4" height="7" rx="1"/></svg>
          </span>
          <div>
            <div class="pl-dash-h">Profit &amp; Loss</div>
            <div class="pl-dash-sub">Overview of your income, expenses and profitability</div>
          </div>
        </div>
        <div class="pl-dash-range">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/></svg>
          {{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }} <span class="pl-dash-range-caret">▾</span>
        </div>
      </div>

      <template v-if="plLoading"><div class="loading-shimmer" style="height:120px;border-radius:8px"></div></template>
      <template v-else-if="pl">
        <div class="pl-kpi-grid">
          <div class="pl-kpi c-emerald">
            <div class="pl-kpi-top"><span class="pl-kpi-icon">🪙</span><span class="pl-kpi-label">Total Income</span></div>
            <div class="pl-kpi-val green">{{ fmt(pl.total_income) }}</div>
            <div class="pl-kpi-trend" :class="trendClass(incomeChangePct)">{{ trendText(incomeChangePct) }}</div>
          </div>
          <div v-if="pl.cogs" class="pl-kpi c-pink">
            <div class="pl-kpi-top"><span class="pl-kpi-icon">🛒</span><span class="pl-kpi-label">Cost of Goods Sold</span></div>
            <div class="pl-kpi-val red">{{ fmt(pl.cogs) }}</div>
            <div class="pl-kpi-trend muted">vs previous period</div>
          </div>
          <div v-if="pl.cogs" class="pl-kpi c-amber">
            <div class="pl-kpi-top"><span class="pl-kpi-icon">📊</span><span class="pl-kpi-label">Gross Profit</span></div>
            <div class="pl-kpi-val" :class="pl.gross_profit >= 0 ? 'green' : 'red'">{{ fmt(pl.gross_profit) }}</div>
            <div class="pl-kpi-trend muted">vs previous period</div>
          </div>
          <div class="pl-kpi c-violet">
            <div class="pl-kpi-top"><span class="pl-kpi-icon">📄</span><span class="pl-kpi-label">Total Expense</span></div>
            <div class="pl-kpi-val red">{{ fmt(pl.total_expense) }}</div>
            <div class="pl-kpi-trend" :class="trendClass(expenseChangePct, true)">{{ trendText(expenseChangePct) }}</div>
          </div>
          <div v-if="pl.stock_adjustment" class="pl-kpi c-blue">
            <div class="pl-kpi-top"><span class="pl-kpi-icon">📦</span><span class="pl-kpi-label">Stock Adjustment</span></div>
            <div class="pl-kpi-val" :class="pl.stock_adjustment > 0 ? 'red' : 'green'">{{ fmt(pl.stock_adjustment) }}</div>
            <div class="pl-kpi-trend muted">vs previous period</div>
          </div>
          <div class="pl-kpi" :class="pl.net_profit >= 0 ? 'c-emerald' : 'c-pink'">
            <div class="pl-kpi-top"><span class="pl-kpi-icon">📈</span><span class="pl-kpi-label">Net Profit</span></div>
            <div class="pl-kpi-val" :class="pl.net_profit >= 0 ? 'green' : 'red'">{{ fmt(pl.net_profit) }}</div>
            <div class="pl-kpi-trend" :class="trendClass(netChangePct)">{{ trendText(netChangePct) }}</div>
          </div>
        </div>

        <!-- Monthly Trend -->
        <div v-if="plMonthly.length" class="pl-trend-card">
          <div class="pl-trend-header">
            <div class="pl-dash-title">
              <span class="pl-dash-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="10" width="4" height="10" rx="1"/><rect x="10" y="6" width="4" height="14" rx="1"/><rect x="17" y="13" width="4" height="7" rx="1"/></svg>
              </span>
              <div>
                <div class="pl-dash-h" style="font-size:14px">Monthly Trend</div>
                <div class="pl-dash-sub">Income vs Expense over the selected period</div>
              </div>
            </div>
            <div class="pl-trend-toggle">
              <button :class="{active: trendPeriod==='monthly'}" @click="trendPeriod='monthly'">Monthly</button>
              <button :class="{active: trendPeriod==='quarterly'}" @click="trendPeriod='quarterly'">Quarterly</button>
              <button :class="{active: trendPeriod==='yearly'}" @click="trendPeriod='yearly'">Yearly</button>
            </div>
          </div>

          <div class="pl-trend-body">
            <div class="pl-trend-chart-wrap">
              <div class="pl-trend-yaxis">
                <span v-for="t in chartTicks" :key="t">KES {{ fmtN(t) }}</span>
              </div>
              <div class="pl-trend-chart">
                <div v-for="m in plMonthly" :key="m.month" class="pl-trend-col">
                  <div class="pl-trend-bars">
                    <div class="pl-trend-bar income" :style="{height:barH(m.income)+'px'}" :title="'Income: KES '+fmtN(m.income)"></div>
                    <div class="pl-trend-bar expense" :style="{height:barH(m.expense)+'px'}" :title="'Expense: KES '+fmtN(m.expense)"></div>
                  </div>
                  <div class="pl-trend-month">{{ m.month.slice(5) }}</div>
                </div>
              </div>
            </div>
            <div class="pl-insights">
              <div class="pl-insights-title">💡 Insights</div>
              <div v-for="(ins, idx) in plInsights" :key="idx" class="pl-insight-item">
                <span class="pl-insight-icon" :class="ins.tone">{{ ins.icon }}</span>
                <div>
                  <div class="pl-insight-title">{{ ins.title }}</div>
                  <div class="pl-insight-desc">{{ ins.desc }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="pl-trend-legend">
            <span><span class="dot income"></span>Income</span>
            <span><span class="dot expense"></span>Expense</span>
          </div>
        </div>
      </template>
      <div v-else class="empty-msg">Run the report to see results.</div>
    </div>

    <!-- Balance sheet -->
    <div v-if="activeReport === 'bs'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 3 6v2h18V6z"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8"/><path d="M3 20h18"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Balance Sheet</div>
          <div class="bs-page-head-sub">What the business owns and owes</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">As of {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportBsCSV" :disabled="!bs">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 20h16"/></svg>
            Export
          </button>
        </div>
      </div>
      <template v-if="bsLoading"><div class="loading-shimmer" style="height:120px;border-radius:8px"></div></template>
      <template v-else-if="bs">
        <div class="bs-kpi-row">
          <div class="bs-kpi bs-kpi-assets">
            <div class="bs-kpi-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>
            </div>
            <div class="bs-kpi-body">
              <div class="bs-kpi-label">Total Assets</div>
              <div class="bs-kpi-amount">{{ fmt(bs.total_assets) }}</div>
            </div>
          </div>
          <div class="bs-kpi bs-kpi-liabilities">
            <div class="bs-kpi-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </div>
            <div class="bs-kpi-body">
              <div class="bs-kpi-label">Total Liabilities</div>
              <div class="bs-kpi-amount">{{ fmt(bs.total_liabilities) }}</div>
            </div>
          </div>
          <div class="bs-kpi bs-kpi-equity">
            <div class="bs-kpi-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="17" y="3" width="4" height="18"/></svg>
            </div>
            <div class="bs-kpi-body">
              <div class="bs-kpi-label">Total Equity</div>
              <div class="bs-kpi-amount">{{ fmt(bs.total_equity) }}</div>
            </div>
          </div>
        </div>
        <div class="bs-sum-status" :class="bsBalanced ? 'bs-ok' : 'bs-bad'">
          <span class="bs-sum-status-icon">{{ bsBalanced ? '✓' : '✕' }}</span>
          <div class="bs-sum-status-body">
            <div class="bs-sum-status-title">{{ bsBalanced ? 'Assets = Liabilities + Equity' : 'Balance sheet out of balance' }}</div>
            <div class="bs-sum-status-eq">{{ fmt(bs.total_assets) }} = {{ fmt(bs.total_liabilities) }} + {{ fmt(bs.total_equity) }}</div>
          </div>
        </div>
        <div class="bs-acc">
          <div v-for="g in bsGroups" :key="g.key" class="bs-acc-group" :class="g.cls">
            <div class="bs-acc-head" @click="bsToggle(g.key)">
              <div class="bs-acc-icon" v-html="g.icon"></div>
              <div class="bs-acc-head-text">
                <div class="bs-acc-label">{{ g.label }}</div>
                <div class="bs-acc-desc">{{ g.desc }}</div>
              </div>
              <div class="bs-acc-amount">{{ fmt(g.total) }}</div>
              <div class="bs-acc-chevron" :class="{ open: bsExpanded[g.key] }">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
              </div>
            </div>
            <div v-if="bsExpanded[g.key]" class="bs-acc-items">
              <div v-for="it in g.items" :key="it.label" class="bs-acc-item">
                <div class="bs-acc-item-icon" v-html="it.icon"></div>
                <div class="bs-acc-item-text">
                  <div class="bs-acc-item-label">{{ it.label }}</div>
                  <div v-if="it.desc" class="bs-acc-item-desc">{{ it.desc }}</div>
                </div>
                <div class="bs-acc-item-amount">{{ fmt(it.value) }}</div>
                <div class="bs-acc-item-caret">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div v-else class="empty-msg">Run the report to see results.</div>
    </div>

    <!-- Cash flow -->
    <div v-if="activeReport === 'cf'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon cf-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.1-2.8-2.8L7 14"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Cash Flow Statement</div>
          <div class="bs-page-head-sub">Track the movement of cash in and out of your business</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportCfCSV" :disabled="!cf">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 20h16"/></svg>
            Export
          </button>
        </div>
      </div>
      <template v-if="cfLoading"><div class="loading-shimmer" style="height:120px;border-radius:8px"></div></template>
      <template v-else-if="cf">
        <div class="cf-grid">
          <div class="cf-acc">
            <div class="cf-acc-row cf-row-operating">
              <div class="cf-acc-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z"/></svg></div>
              <div class="cf-acc-text">
                <div class="cf-acc-label">Operating Activities</div>
                <div class="cf-acc-desc">P&amp;L + working capital changes</div>
              </div>
              <div class="cf-acc-amount" :class="cf.operating >= 0 ? 'green' : 'red'">{{ fmt(cf.operating) }}</div>
            </div>
            <div class="cf-acc-row cf-row-investing">
              <div class="cf-acc-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg></div>
              <div class="cf-acc-text">
                <div class="cf-acc-label">Investing Activities</div>
                <div class="cf-acc-desc">Asset purchases and sales</div>
              </div>
              <div class="cf-acc-amount" :class="cf.investing >= 0 ? 'green' : 'red'">{{ fmt(cf.investing) }}</div>
            </div>
            <div class="cf-acc-row cf-row-financing">
              <div class="cf-acc-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 3 6v2h18V6z"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8"/><path d="M3 20h18"/></svg></div>
              <div class="cf-acc-text">
                <div class="cf-acc-label">Financing Activities</div>
                <div class="cf-acc-desc">Equity, loans and debt</div>
              </div>
              <div class="cf-acc-amount" :class="cf.financing >= 0 ? 'green' : 'red'">{{ fmt(cf.financing) }}</div>
            </div>
            <div class="cf-acc-row cf-row-net">
              <div class="cf-acc-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="17" y="3" width="4" height="18"/></svg></div>
              <div class="cf-acc-text">
                <div class="cf-acc-label">Net Change in Cash</div>
                <div class="cf-acc-desc">{{ cf.net_change >= 0 ? 'Increase' : 'Decrease' }} in cash during this period</div>
              </div>
              <div class="cf-acc-amount" :class="cf.net_change >= 0 ? 'green' : 'red'">{{ fmt(cf.net_change) }}</div>
            </div>
            <template v-if="cf.opening_cash != null">
              <div class="cf-flow-row">
                <div class="cf-flow-icon cf-flow-icon-open"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
                <div class="cf-acc-text">
                  <div class="cf-acc-label" style="font-size:13px">Opening Cash &amp; Bank</div>
                  <div class="cf-acc-desc">Balance at the beginning of the period</div>
                </div>
                <div class="cf-acc-amount" :class="cf.opening_cash >= 0 ? 'green' : 'red'">{{ fmt(cf.opening_cash) }}</div>
              </div>
              <div class="cf-flow-row">
                <div class="cf-flow-icon cf-flow-icon-close"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 5 5 12 12 19"/></svg></div>
                <div class="cf-acc-text">
                  <div class="cf-acc-label" style="font-size:13px">Closing Cash &amp; Bank</div>
                  <div class="cf-acc-desc">Balance at the end of the period</div>
                </div>
                <div class="cf-acc-amount" :class="cf.closing_cash >= 0 ? 'green' : 'red'">{{ fmt(cf.closing_cash) }}</div>
              </div>
            </template>
          </div>

          <div class="cf-side">
            <div class="cf-trend-box">
              <div class="cf-trend-box-head">
                <div>
                  <div class="cf-trend-box-title">Cash Flow Trend</div>
                  <div class="cf-trend-box-sub">Monthly cash flow movement</div>
                </div>
                <div class="cf-trend-period">Monthly</div>
              </div>
              <div v-if="cfMonthly.length" class="cf-trend-chart">
                <div class="cf-trend-baseline"></div>
                <div v-for="m in cfMonthly" :key="m.month" class="cf-trend-col">
                  <div class="cf-trend-bar operating" :style="cfBarStyle(m.operating)" :title="'Operating: ' + fmt(m.operating)"></div>
                  <div class="cf-trend-bar investing" :style="cfBarStyle(m.investing)" :title="'Investing: ' + fmt(m.investing)"></div>
                  <div class="cf-trend-bar financing" :style="cfBarStyle(m.financing)" :title="'Financing: ' + fmt(m.financing)"></div>
                  <div class="cf-trend-month">{{ m.month }}</div>
                </div>
              </div>
              <div v-else class="empty-msg" style="padding:20px 0">No monthly data for this range.</div>
              <div class="cf-trend-legend">
                <span><span class="dot" style="background:#10b981"></span>Operating</span>
                <span><span class="dot" style="background:#2563eb"></span>Investing</span>
                <span><span class="dot" style="background:#7c3aed"></span>Financing</span>
              </div>
            </div>
            <div class="cf-summary-box">
              <div class="cf-summary-icon">i</div>
              <div>
                <div class="cf-summary-title">Summary</div>
                <div class="cf-summary-text">
                  Cash {{ cf.net_change >= 0 ? 'increased' : 'decreased' }} by
                  <span :class="cf.net_change >= 0 ? 'green' : 'red'" style="font-weight:700">{{ fmt(Math.abs(cf.net_change)) }}</span>
                  during this period, from {{ fmt(cf.opening_cash) }} to {{ fmt(cf.closing_cash) }}.
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div v-else class="empty-msg">Run the report to see results.</div>
    </div>

    <!-- GST Summary -->
    <div v-if="activeReport === 'gst'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon gst-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">GST Summary</div>
          <div class="bs-page-head-sub">Overview of GST collected during the selected period</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportGstCSV" :disabled="!gst?.length">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 20h16"/></svg>
            Export
          </button>
        </div>
      </div>
      <template v-if="gstLoading"><div class="loading-shimmer" style="height:80px;border-radius:8px"></div></template>
      <template v-else-if="gst?.length">
        <div class="gst-cards">
          <div v-for="g in gstCards" :key="g.tax_type" class="gst-card" :class="g.cls">
            <div class="gst-card-head">
              <div class="gst-card-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg></div>
              <div>
                <div class="gst-card-title">{{ g.tax_type }}</div>
                <div class="gst-card-desc">{{ g.desc }}</div>
              </div>
            </div>
            <div class="gst-card-stats">
              <div>
                <div class="gst-stat-label">Invoice Count</div>
                <div class="gst-stat-value">{{ g.invoice_count }}</div>
              </div>
              <div>
                <div class="gst-stat-label">Total Tax</div>
                <div class="gst-stat-value">{{ fmt(g.total_tax) }}</div>
              </div>
            </div>
          </div>
          <div class="gst-card gst-c-total">
            <div class="gst-card-head">
              <div class="gst-card-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="17" x2="15" y2="17"/><line x1="9" y1="13" x2="12" y2="13"/></svg></div>
              <div>
                <div class="gst-card-title">Total Summary</div>
                <div class="gst-card-desc">Combined GST for the selected period</div>
              </div>
            </div>
            <div class="gst-card-stats">
              <div>
                <div class="gst-stat-label">Total Invoices</div>
                <div class="gst-stat-value">{{ gstTotalInvoices }}</div>
              </div>
              <div>
                <div class="gst-stat-label">Total Tax</div>
                <div class="gst-stat-value">{{ fmt(gstTotalTax) }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div v-else class="empty-msg">Run the report to see results.</div>
    </div>

    <!-- AR Aging -->
    <div v-if="activeReport === 'ar'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon ar-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Accounts Receivable Aging</div>
          <div class="bs-page-head-sub">Outstanding customer balances, grouped by how overdue they are</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">As of {{ fmtDate(toDate) }}</div>
          <div class="iws-export-wrap">
            <button class="bs-export-btn" @click="arExportOpen = !arExportOpen" :disabled="!arAging.length">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <template v-if="arExportOpen">
              <div class="iws-menu-backdrop" @click="arExportOpen = false"></div>
              <div class="iws-menu">
                <button class="iws-menu-item" @click="arExportOpen = false; exportAgingCSV()">Download CSV</button>
                <button class="iws-menu-item" @click="arExportOpen = false; copyArAgingToClipboard()">Copy to clipboard</button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <template v-if="arLoading"><div class="loading-shimmer" style="height:200px;border-radius:8px"></div></template>
      <template v-else-if="arAging.length">
        <div class="iws-body">
          <div class="iws-total-panel iws-total-panel-neg">
            <div class="iws-total-icon iws-total-icon-neg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="iws-total-label">Total Outstanding</div>
            <div class="iws-total-value iws-total-value-neg" :style="totalValStyle(fmtAmt(arTotals.total))">{{ fmtAmt(arTotals.total) }}</div>
            <div class="iws-total-meta">
              {{ arAging.length }} {{ arAging.length === 1 ? 'Customer' : 'Customers' }}
            </div>
            <div class="iws-total-sub" v-if="arTotals.days_90_plus">
              <span class="iws-total-sub-label">90+ days overdue</span>
              <span class="iws-total-sub-value">{{ fmtAmt(arTotals.days_90_plus) }}</span>
            </div>
          </div>

          <div class="iws-table-wrap">
            <table class="iws-table">
              <thead>
                <tr>
                  <th class="iws-idx">#</th>
                  <th @click="setArSort('customer')" class="iws-sortable">
                    <span>Customer</span><span class="iws-sort-ind" :class="arSortCls('customer')">&#8645;</span>
                  </th>
                  <th @click="setArSort('current')" class="iws-sortable ta-r">
                    <span>Current (KES)</span><span class="iws-sort-ind" :class="arSortCls('current')">&#8645;</span>
                  </th>
                  <th @click="setArSort('days_1_30')" class="iws-sortable ta-r">
                    <span>1–30 Days (KES)</span><span class="iws-sort-ind" :class="arSortCls('days_1_30')">&#8645;</span>
                  </th>
                  <th @click="setArSort('days_31_60')" class="iws-sortable ta-r">
                    <span>31–60 Days (KES)</span><span class="iws-sort-ind" :class="arSortCls('days_31_60')">&#8645;</span>
                  </th>
                  <th @click="setArSort('days_61_90')" class="iws-sortable ta-r">
                    <span>61–90 Days (KES)</span><span class="iws-sort-ind" :class="arSortCls('days_61_90')">&#8645;</span>
                  </th>
                  <th @click="setArSort('days_90_plus')" class="iws-sortable ta-r">
                    <span>90+ Days (KES)</span><span class="iws-sort-ind" :class="arSortCls('days_90_plus')">&#8645;</span>
                  </th>
                  <th @click="setArSort('total')" class="iws-sortable ta-r">
                    <span>Total (KES)</span><span class="iws-sort-ind" :class="arSortCls('total')">&#8645;</span>
                  </th>
                  <th class="iws-kebab-col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(r, i) in arAgingSorted" :key="r.customer">
                  <td class="iws-idx">{{ i + 1 }}</td>
                  <td class="iws-item-name">{{ r.customer_name || r.customer }}</td>
                  <td class="ta-r mono-sm">{{ r.current > 0 ? fmtN2(r.current) : '—' }}</td>
                  <td class="ta-r mono-sm" :class="r.days_1_30>0?'text-warn':''">{{ r.days_1_30 > 0 ? fmtN2(r.days_1_30) : '—' }}</td>
                  <td class="ta-r mono-sm" :class="r.days_31_60>0?'text-danger':''">{{ r.days_31_60 > 0 ? fmtN2(r.days_31_60) : '—' }}</td>
                  <td class="ta-r mono-sm" :class="r.days_61_90>0?'text-danger':''">{{ r.days_61_90 > 0 ? fmtN2(r.days_61_90) : '—' }}</td>
                  <td class="ta-r mono-sm" :class="r.days_90_plus>0?'text-danger fw-700':''">{{ r.days_90_plus > 0 ? fmtN2(r.days_90_plus) : '—' }}</td>
                  <td class="ta-r mono-sm fw-700 text-danger">{{ fmtAmt(r.total) }}</td>
                  <td class="iws-kebab-col">
                    <div class="iws-kebab-wrap">
                      <button class="iws-kebab" @click="arRowMenu = (arRowMenu === i ? null : i)" title="Row actions">&#8942;</button>
                      <template v-if="arRowMenu === i">
                        <div class="iws-menu-backdrop" @click="arRowMenu = null"></div>
                        <div class="iws-menu iws-menu-row">
                          <button class="iws-menu-item" @click="arRowMenu = null; copyAgingRow(r, true)">Copy row</button>
                          <button class="iws-menu-item" @click="arRowMenu = null; exportAgingRowCSV(r, true)">Download row as CSV</button>
                        </div>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="iws-total-row">
                  <td class="iws-idx"><span class="iws-sigma">&Sigma;</span></td>
                  <td class="fw-700">Total</td>
                  <td class="ta-r fw-700">{{ fmtAmt(arTotals.current) }}</td>
                  <td class="ta-r fw-700">{{ fmtAmt(arTotals.days_1_30) }}</td>
                  <td class="ta-r fw-700">{{ fmtAmt(arTotals.days_31_60) }}</td>
                  <td class="ta-r fw-700">{{ fmtAmt(arTotals.days_61_90) }}</td>
                  <td class="ta-r fw-700 text-danger">{{ fmtAmt(arTotals.days_90_plus) }}</td>
                  <td class="ta-r fw-700 text-danger">{{ fmtAmt(arTotals.total) }}</td>
                  <td class="iws-kebab-col"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </template>
      <div v-else class="empty-msg">{{arRan ? 'No outstanding receivables as of this date.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- AP Aging -->
    <div v-if="activeReport === 'ap'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon ap-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Accounts Payable Aging</div>
          <div class="bs-page-head-sub">Outstanding vendor balances, grouped by how overdue they are</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">As of {{ fmtDate(toDate) }}</div>
          <div class="iws-export-wrap">
            <button class="bs-export-btn" @click="apExportOpen = !apExportOpen" :disabled="!apAging.length">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <template v-if="apExportOpen">
              <div class="iws-menu-backdrop" @click="apExportOpen = false"></div>
              <div class="iws-menu">
                <button class="iws-menu-item" @click="apExportOpen = false; exportAgingCSV()">Download CSV</button>
                <button class="iws-menu-item" @click="apExportOpen = false; copyApAgingToClipboard()">Copy to clipboard</button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <template v-if="apLoading"><div class="loading-shimmer" style="height:200px;border-radius:8px"></div></template>
      <template v-else-if="apAging.length">
        <div class="iws-body">
          <div class="iws-total-panel iws-total-panel-neg">
            <div class="iws-total-icon iws-total-icon-neg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="iws-total-label">Total Outstanding</div>
            <div class="iws-total-value iws-total-value-neg" :style="totalValStyle(fmtAmt(apTotals.total))">{{ fmtAmt(apTotals.total) }}</div>
            <div class="iws-total-meta">
              {{ apAging.length }} {{ apAging.length === 1 ? 'Vendor' : 'Vendors' }}
            </div>
            <div class="iws-total-sub" v-if="apTotals.days_90_plus">
              <span class="iws-total-sub-label">90+ days overdue</span>
              <span class="iws-total-sub-value">{{ fmtAmt(apTotals.days_90_plus) }}</span>
            </div>
          </div>

          <div class="iws-table-wrap">
            <table class="iws-table">
              <thead>
                <tr>
                  <th class="iws-idx">#</th>
                  <th @click="setApSort('supplier')" class="iws-sortable">
                    <span>Vendor</span><span class="iws-sort-ind" :class="apSortCls('supplier')">&#8645;</span>
                  </th>
                  <th @click="setApSort('current')" class="iws-sortable ta-r">
                    <span>Current (KES)</span><span class="iws-sort-ind" :class="apSortCls('current')">&#8645;</span>
                  </th>
                  <th @click="setApSort('days_1_30')" class="iws-sortable ta-r">
                    <span>1–30 Days (KES)</span><span class="iws-sort-ind" :class="apSortCls('days_1_30')">&#8645;</span>
                  </th>
                  <th @click="setApSort('days_31_60')" class="iws-sortable ta-r">
                    <span>31–60 Days (KES)</span><span class="iws-sort-ind" :class="apSortCls('days_31_60')">&#8645;</span>
                  </th>
                  <th @click="setApSort('days_61_90')" class="iws-sortable ta-r">
                    <span>61–90 Days (KES)</span><span class="iws-sort-ind" :class="apSortCls('days_61_90')">&#8645;</span>
                  </th>
                  <th @click="setApSort('days_90_plus')" class="iws-sortable ta-r">
                    <span>90+ Days (KES)</span><span class="iws-sort-ind" :class="apSortCls('days_90_plus')">&#8645;</span>
                  </th>
                  <th @click="setApSort('total')" class="iws-sortable ta-r">
                    <span>Total (KES)</span><span class="iws-sort-ind" :class="apSortCls('total')">&#8645;</span>
                  </th>
                  <th class="iws-kebab-col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(r, i) in apAgingSorted" :key="r.supplier">
                  <td class="iws-idx">{{ i + 1 }}</td>
                  <td class="iws-item-name">{{ r.supplier_name || r.supplier }}</td>
                  <td class="ta-r mono-sm">{{ r.current > 0 ? fmtN2(r.current) : '—' }}</td>
                  <td class="ta-r mono-sm" :class="r.days_1_30>0?'text-warn':''">{{ r.days_1_30 > 0 ? fmtN2(r.days_1_30) : '—' }}</td>
                  <td class="ta-r mono-sm" :class="r.days_31_60>0?'text-danger':''">{{ r.days_31_60 > 0 ? fmtN2(r.days_31_60) : '—' }}</td>
                  <td class="ta-r mono-sm" :class="r.days_61_90>0?'text-danger':''">{{ r.days_61_90 > 0 ? fmtN2(r.days_61_90) : '—' }}</td>
                  <td class="ta-r mono-sm" :class="r.days_90_plus>0?'text-danger fw-700':''">{{ r.days_90_plus > 0 ? fmtN2(r.days_90_plus) : '—' }}</td>
                  <td class="ta-r mono-sm fw-700 text-danger">{{ fmtAmt(r.total) }}</td>
                  <td class="iws-kebab-col">
                    <div class="iws-kebab-wrap">
                      <button class="iws-kebab" @click="apRowMenu = (apRowMenu === i ? null : i)" title="Row actions">&#8942;</button>
                      <template v-if="apRowMenu === i">
                        <div class="iws-menu-backdrop" @click="apRowMenu = null"></div>
                        <div class="iws-menu iws-menu-row">
                          <button class="iws-menu-item" @click="apRowMenu = null; copyAgingRow(r, false)">Copy row</button>
                          <button class="iws-menu-item" @click="apRowMenu = null; exportAgingRowCSV(r, false)">Download row as CSV</button>
                        </div>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="iws-total-row">
                  <td class="iws-idx"><span class="iws-sigma">&Sigma;</span></td>
                  <td class="fw-700">Total</td>
                  <td class="ta-r fw-700">{{ fmtAmt(apTotals.current) }}</td>
                  <td class="ta-r fw-700">{{ fmtAmt(apTotals.days_1_30) }}</td>
                  <td class="ta-r fw-700">{{ fmtAmt(apTotals.days_31_60) }}</td>
                  <td class="ta-r fw-700">{{ fmtAmt(apTotals.days_61_90) }}</td>
                  <td class="ta-r fw-700 text-danger">{{ fmtAmt(apTotals.days_90_plus) }}</td>
                  <td class="ta-r fw-700 text-danger">{{ fmtAmt(apTotals.total) }}</td>
                  <td class="iws-kebab-col"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </template>
      <div v-else class="empty-msg">{{apRan ? 'No outstanding payables as of this date.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Item-wise Sales -->
    <div v-if="activeReport === 'items'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon iws-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Item-wise Sales</div>
          <div class="bs-page-head-sub">Sales summary by item for the selected period</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <div class="iws-export-wrap">
            <button class="bs-export-btn" @click="iwsExportOpen = !iwsExportOpen" :disabled="!itemSales.length">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <template v-if="iwsExportOpen">
              <div class="iws-menu-backdrop" @click="iwsExportOpen = false"></div>
              <div class="iws-menu">
                <button class="iws-menu-item" @click="iwsExportOpen = false; exportItemSalesCSV()">Download CSV</button>
                <button class="iws-menu-item" @click="iwsExportOpen = false; copyItemSalesToClipboard()">Copy to clipboard</button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <template v-if="itemsLoading"><div class="loading-shimmer" style="height:200px;border-radius:8px"></div></template>
      <template v-else-if="itemSales.length">
        <div class="iws-body">
          <div class="iws-total-panel">
            <div class="iws-total-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="20" x2="6" y2="13"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="9"/></svg>
            </div>
            <div class="iws-total-label">Total Sales</div>
            <div class="iws-total-value" :style="totalValStyle(fmtAmt(itemsTotals.amount))">{{ fmtAmt(itemsTotals.amount) }}</div>
            <div class="iws-total-meta">
              {{ itemSales.length }} {{ itemSales.length === 1 ? 'Item' : 'Items' }} &bull;
              {{ itemsTotals.invoices }} {{ itemsTotals.invoices === 1 ? 'Invoice' : 'Invoices' }}
            </div>
          </div>

          <div class="iws-table-wrap">
            <table class="iws-table">
              <thead>
                <tr>
                  <th class="iws-idx">#</th>
                  <th @click="setIwsSort('item')" class="iws-sortable">
                    <span>Item</span><span class="iws-sort-ind" :class="iwsSortCls('item')">&#8645;</span>
                  </th>
                  <th @click="setIwsSort('uom')" class="iws-sortable">
                    <span>UOM</span><span class="iws-sort-ind" :class="iwsSortCls('uom')">&#8645;</span>
                  </th>
                  <th @click="setIwsSort('invoice_count')" class="iws-sortable ta-r">
                    <span>Invoices</span><span class="iws-sort-ind" :class="iwsSortCls('invoice_count')">&#8645;</span>
                  </th>
                  <th @click="setIwsSort('qty_sold')" class="iws-sortable ta-r">
                    <span>Qty Sold</span><span class="iws-sort-ind" :class="iwsSortCls('qty_sold')">&#8645;</span>
                  </th>
                  <th @click="setIwsSort('avg_rate')" class="iws-sortable ta-r">
                    <span>Avg Rate (KES)</span><span class="iws-sort-ind" :class="iwsSortCls('avg_rate')">&#8645;</span>
                  </th>
                  <th @click="setIwsSort('total_discount')" class="iws-sortable ta-r">
                    <span>Discount (KES)</span><span class="iws-sort-ind" :class="iwsSortCls('total_discount')">&#8645;</span>
                  </th>
                  <th @click="setIwsSort('total_amount')" class="iws-sortable ta-r">
                    <span>Total Amount (KES)</span><span class="iws-sort-ind" :class="iwsSortCls('total_amount')">&#8645;</span>
                  </th>
                  <th class="iws-kebab-col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in itemSalesSorted" :key="(row.item_code || row.item_name) + '|' + (row.uom || '') + '|' + i">
                  <td class="iws-idx">{{ i + 1 }}</td>
                  <td class="iws-item-name">{{ row.item_name || row.item_code }}</td>
                  <td><span class="iws-uom">{{ row.uom || '—' }}</span></td>
                  <td class="ta-r mono-sm">{{ row.invoice_count }}</td>
                  <td class="ta-r mono-sm">{{ fmtN(row.qty_sold) }}</td>
                  <td class="ta-r mono-sm">{{ fmtN2(row.avg_rate) }}</td>
                  <td class="ta-r mono-sm red">{{ row.total_discount ? fmtN2(row.total_discount) : '—' }}</td>
                  <td class="ta-r mono-sm fw-700 green">{{ fmtAmt(row.total_amount) }}</td>
                  <td class="iws-kebab-col">
                    <div class="iws-kebab-wrap">
                      <button class="iws-kebab" @click="iwsRowMenu = (iwsRowMenu === i ? null : i)" title="Row actions">&#8942;</button>
                      <template v-if="iwsRowMenu === i">
                        <div class="iws-menu-backdrop" @click="iwsRowMenu = null"></div>
                        <div class="iws-menu iws-menu-row">
                          <button class="iws-menu-item" @click="iwsRowMenu = null; copyItemRow(row)">Copy row</button>
                          <button class="iws-menu-item" @click="iwsRowMenu = null; exportItemRowCSV(row)">Download row as CSV</button>
                        </div>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="iws-total-row">
                  <td class="iws-idx"><span class="iws-sigma">&Sigma;</span></td>
                  <td class="fw-700">Total</td>
                  <td></td>
                  <td class="ta-r fw-700">{{ itemsTotals.invoices }}</td>
                  <td class="ta-r fw-700">{{ fmtN(itemsTotals.qty) }}</td>
                  <td></td>
                  <td class="ta-r fw-700 red">{{ fmtAmt(itemsTotals.discount) }}</td>
                  <td class="ta-r fw-700 green">{{ fmtAmt(itemsTotals.amount) }}</td>
                  <td class="iws-kebab-col"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </template>
      <div v-else class="empty-msg">{{itemsRan ? 'No sales in this period.' : 'Run the report to see results.'}}</div>
    </div>


    <!-- Customer-wise Sales -->
    <div v-if="activeReport === 'customers'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon cws-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Customer-wise Sales</div>
          <div class="bs-page-head-sub">Sales summary by customer for the selected period</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <div class="iws-export-wrap">
            <button class="bs-export-btn" @click="cwsExportOpen = !cwsExportOpen" :disabled="!customerSales.length">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <template v-if="cwsExportOpen">
              <div class="iws-menu-backdrop" @click="cwsExportOpen = false"></div>
              <div class="iws-menu">
                <button class="iws-menu-item" @click="cwsExportOpen = false; exportCustomerSalesCSV()">Download CSV</button>
                <button class="iws-menu-item" @click="cwsExportOpen = false; copyCustomerSalesToClipboard()">Copy to clipboard</button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <template v-if="customersLoading"><div class="loading-shimmer" style="height:200px;border-radius:8px"></div></template>
      <template v-else-if="customerSales.length">
        <div class="iws-body">
          <div class="iws-total-panel">
            <div class="iws-total-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="20" x2="6" y2="13"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="9"/></svg>
            </div>
            <div class="iws-total-label">Total Sales</div>
            <div class="iws-total-value" :style="totalValStyle(fmtAmt(custTotals.amount))">{{ fmtAmt(custTotals.amount) }}</div>
            <div class="iws-total-meta">
              {{ customerSales.length }} {{ customerSales.length === 1 ? 'Customer' : 'Customers' }} &bull;
              {{ custTotals.invoices }} {{ custTotals.invoices === 1 ? 'Invoice' : 'Invoices' }}
            </div>
            <div class="iws-total-sub" v-if="custTotals.outstanding">
              <span class="iws-total-sub-label">Outstanding</span>
              <span class="iws-total-sub-value">{{ fmtAmt(custTotals.outstanding) }}</span>
            </div>
          </div>

          <div class="iws-table-wrap">
            <table class="iws-table">
              <thead>
                <tr>
                  <th class="iws-idx">#</th>
                  <th @click="setCwsSort('customer')" class="iws-sortable">
                    <span>Customer</span><span class="iws-sort-ind" :class="cwsSortCls('customer')">&#8645;</span>
                  </th>
                  <th @click="setCwsSort('invoice_count')" class="iws-sortable ta-r">
                    <span>Invoices</span><span class="iws-sort-ind" :class="cwsSortCls('invoice_count')">&#8645;</span>
                  </th>
                  <th @click="setCwsSort('net_total')" class="iws-sortable ta-r">
                    <span>Net Total (KES)</span><span class="iws-sort-ind" :class="cwsSortCls('net_total')">&#8645;</span>
                  </th>
                  <th @click="setCwsSort('total_discount')" class="iws-sortable ta-r">
                    <span>Discount (KES)</span><span class="iws-sort-ind" :class="cwsSortCls('total_discount')">&#8645;</span>
                  </th>
                  <th @click="setCwsSort('total_tax')" class="iws-sortable ta-r">
                    <span>Tax (KES)</span><span class="iws-sort-ind" :class="cwsSortCls('total_tax')">&#8645;</span>
                  </th>
                  <th @click="setCwsSort('avg_invoice_value')" class="iws-sortable ta-r">
                    <span>Avg Invoice (KES)</span><span class="iws-sort-ind" :class="cwsSortCls('avg_invoice_value')">&#8645;</span>
                  </th>
                  <th @click="setCwsSort('outstanding_amount')" class="iws-sortable ta-r">
                    <span>Outstanding (KES)</span><span class="iws-sort-ind" :class="cwsSortCls('outstanding_amount')">&#8645;</span>
                  </th>
                  <th @click="setCwsSort('total_amount')" class="iws-sortable ta-r">
                    <span>Total Amount (KES)</span><span class="iws-sort-ind" :class="cwsSortCls('total_amount')">&#8645;</span>
                  </th>
                  <th class="iws-kebab-col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in customerSalesSorted" :key="(row.customer || row.customer_name) + '|' + i">
                  <td class="iws-idx">{{ i + 1 }}</td>
                  <td class="iws-item-name">{{ row.customer_name || row.customer }}</td>
                  <td class="ta-r mono-sm">{{ row.invoice_count }}</td>
                  <td class="ta-r mono-sm">{{ fmtN2(row.net_total) }}</td>
                  <td class="ta-r mono-sm red">{{ row.total_discount ? fmtN2(row.total_discount) : '—' }}</td>
                  <td class="ta-r mono-sm">{{ fmtN2(row.total_tax) }}</td>
                  <td class="ta-r mono-sm">{{ fmtN2(row.avg_invoice_value) }}</td>
                  <td class="ta-r mono-sm" :class="row.outstanding_amount>0?'red':''">{{ row.outstanding_amount ? fmtAmt(row.outstanding_amount) : '—' }}</td>
                  <td class="ta-r mono-sm fw-700 green">{{ fmtAmt(row.total_amount) }}</td>
                  <td class="iws-kebab-col">
                    <div class="iws-kebab-wrap">
                      <button class="iws-kebab" @click="cwsRowMenu = (cwsRowMenu === i ? null : i)" title="Row actions">&#8942;</button>
                      <template v-if="cwsRowMenu === i">
                        <div class="iws-menu-backdrop" @click="cwsRowMenu = null"></div>
                        <div class="iws-menu iws-menu-row">
                          <button class="iws-menu-item" @click="cwsRowMenu = null; copyCustomerRow(row)">Copy row</button>
                          <button class="iws-menu-item" @click="cwsRowMenu = null; exportCustomerRowCSV(row)">Download row as CSV</button>
                        </div>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="iws-total-row">
                  <td class="iws-idx"><span class="iws-sigma">&Sigma;</span></td>
                  <td class="fw-700">Total</td>
                  <td class="ta-r fw-700">{{ custTotals.invoices }}</td>
                  <td class="ta-r fw-700">{{ fmtAmt(custTotals.net) }}</td>
                  <td class="ta-r fw-700 red">{{ fmtAmt(custTotals.discount) }}</td>
                  <td class="ta-r fw-700">{{ fmtAmt(custTotals.tax) }}</td>
                  <td></td>
                  <td class="ta-r fw-700 red">{{ fmtAmt(custTotals.outstanding) }}</td>
                  <td class="ta-r fw-700 green">{{ fmtAmt(custTotals.amount) }}</td>
                  <td class="iws-kebab-col"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </template>
      <div v-else class="empty-msg">{{customersRan ? 'No sales in this period.' : 'Run the report to see results.'}}</div>
    </div>


    <!-- Profit-wise Report -->
    <div v-if="activeReport === 'profit'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon pw-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Profit-wise Report (by Item)</div>
          <div class="bs-page-head-sub">Cost is estimated from current average valuation rate per item (excluding WIP warehouses); margins are indicative, not historical FIFO cost.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <div class="iws-export-wrap">
            <button class="bs-export-btn" @click="pwExportOpen = !pwExportOpen" :disabled="!profitReport.length">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <template v-if="pwExportOpen">
              <div class="iws-menu-backdrop" @click="pwExportOpen = false"></div>
              <div class="iws-menu">
                <button class="iws-menu-item" @click="pwExportOpen = false; exportProfitCSV()">Download CSV</button>
                <button class="iws-menu-item" @click="pwExportOpen = false; copyProfitToClipboard()">Copy to clipboard</button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <template v-if="profitLoading"><div class="loading-shimmer" style="height:200px;border-radius:8px"></div></template>
      <template v-else-if="profitReport.length">
        <div class="iws-body">
          <div class="iws-total-panel" :class="profitTotal>=0 ? '' : 'iws-total-panel-neg'">
            <div class="iws-total-icon" :class="profitTotal>=0 ? '' : 'iws-total-icon-neg'">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div class="iws-total-label">Total Profit</div>
            <div class="iws-total-value" :class="profitTotal>=0 ? '' : 'iws-total-value-neg'" :style="totalValStyle(fmtAmt(profitTotal))">{{ fmtAmt(profitTotal) }}</div>
            <div class="iws-total-meta">
              {{ profitReport.length }} {{ profitReport.length === 1 ? 'Item' : 'Items' }} &bull;
              <span :class="profitMarginTotal>=0 ? 'green' : 'red'">{{ profitMarginTotal.toFixed(1) }}% margin</span>
            </div>
            <div class="iws-total-sub" v-if="noCostDataCount">
              <span class="iws-total-sub-label">No cost data</span>
              <span class="iws-total-sub-value">{{ noCostDataCount }} item{{noCostDataCount>1?'s':''}}</span>
            </div>
          </div>

          <div class="iws-table-wrap">
            <table class="iws-table">
              <thead>
                <tr>
                  <th class="iws-idx">#</th>
                  <th @click="setPwSort('item')" class="iws-sortable">
                    <span>Item</span><span class="iws-sort-ind" :class="pwSortCls('item')">&#8645;</span>
                  </th>
                  <th @click="setPwSort('qty_sold')" class="iws-sortable ta-r">
                    <span>Qty Sold</span><span class="iws-sort-ind" :class="pwSortCls('qty_sold')">&#8645;</span>
                  </th>
                  <th @click="setPwSort('revenue')" class="iws-sortable ta-r">
                    <span>Revenue (KES)</span><span class="iws-sort-ind" :class="pwSortCls('revenue')">&#8645;</span>
                  </th>
                  <th @click="setPwSort('cost_rate')" class="iws-sortable ta-r">
                    <span>Cost Rate (KES)</span><span class="iws-sort-ind" :class="pwSortCls('cost_rate')">&#8645;</span>
                  </th>
                  <th @click="setPwSort('total_cost')" class="iws-sortable ta-r">
                    <span>Total Cost (KES)</span><span class="iws-sort-ind" :class="pwSortCls('total_cost')">&#8645;</span>
                  </th>
                  <th @click="setPwSort('profit')" class="iws-sortable ta-r">
                    <span>Profit (KES)</span><span class="iws-sort-ind" :class="pwSortCls('profit')">&#8645;</span>
                  </th>
                  <th @click="setPwSort('margin_pct')" class="iws-sortable ta-r">
                    <span>Margin %</span><span class="iws-sort-ind" :class="pwSortCls('margin_pct')">&#8645;</span>
                  </th>
                  <th class="iws-kebab-col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in profitReportSorted" :key="row.item_code + '|' + i">
                  <td class="iws-idx">{{ i + 1 }}</td>
                  <td class="iws-item-name">
                    {{ row.item_name || row.item_code }}
                    <span v-if="!row.cost_rate" class="badge badge-muted" style="margin-left:6px;font-size:10px" title="No valuation or standard buying rate found for this item — margin below is not meaningful">no cost data</span>
                  </td>
                  <td class="ta-r mono-sm">{{ fmtN(row.qty_sold) }}</td>
                  <td class="ta-r mono-sm">{{ fmtN2(row.revenue) }}</td>
                  <td class="ta-r mono-sm">{{ row.cost_rate ? fmtN2(row.cost_rate) : '—' }}</td>
                  <td class="ta-r mono-sm red">{{ row.total_cost ? fmtN2(row.total_cost) : '—' }}</td>
                  <td class="ta-r mono-sm fw-700" :class="row.profit>=0?'green':'red'">{{ row.cost_rate ? fmtAmt(row.profit) : '—' }}</td>
                  <td class="ta-r mono-sm" :class="row.margin_pct>=0?'green':'red'">{{ row.cost_rate ? Number(row.margin_pct||0).toFixed(1)+'%' : '—' }}</td>
                  <td class="iws-kebab-col">
                    <div class="iws-kebab-wrap">
                      <button class="iws-kebab" @click="pwRowMenu = (pwRowMenu === i ? null : i)" title="Row actions">&#8942;</button>
                      <template v-if="pwRowMenu === i">
                        <div class="iws-menu-backdrop" @click="pwRowMenu = null"></div>
                        <div class="iws-menu iws-menu-row">
                          <button class="iws-menu-item" @click="pwRowMenu = null; copyProfitRow(row)">Copy row</button>
                          <button class="iws-menu-item" @click="pwRowMenu = null; exportProfitRowCSV(row)">Download row as CSV</button>
                        </div>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="iws-total-row">
                  <td class="iws-idx"><span class="iws-sigma">&Sigma;</span></td>
                  <td class="fw-700">Total</td>
                  <td class="ta-r fw-700">{{ fmtN(profitReport.reduce((s,r)=>s+Number(r.qty_sold||0),0)) }}</td>
                  <td class="ta-r fw-700">{{ fmtAmt(profitReport.reduce((s,r)=>s+Number(r.revenue||0),0)) }}</td>
                  <td></td>
                  <td class="ta-r fw-700 red">{{ fmtAmt(profitReport.filter(r=>r.cost_rate).reduce((s,r)=>s+Number(r.total_cost||0),0)) }}</td>
                  <td class="ta-r fw-700" :class="profitTotal>=0?'green':'red'">{{ fmtAmt(profitTotal) }}</td>
                  <td class="ta-r fw-700" :class="profitMarginTotal>=0?'green':'red'">{{ profitMarginTotal.toFixed(1) }}%</td>
                  <td class="iws-kebab-col"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div v-if="noCostDataCount" style="font-size:11.5px;color:#94a3b8;margin-top:10px">
          {{ noCostDataCount }} item{{noCostDataCount>1?'s':''}} excluded from the profit/margin totals above — no valuation or standard buying rate found (see "no cost data" tag).
        </div>
      </template>
      <div v-else class="empty-msg">{{profitRan ? 'No sales in this period.' : 'Run the report to see results.'}}</div>
    </div>


    <!-- Invoice-wise Profit (single + multi-select) -->
    <div v-if="activeReport === 'invoice_profit'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon ip-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="9" y1="11" x2="13" y2="11"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Invoice Profitability</div>
          <div class="bs-page-head-sub">Cost is estimated from current average valuation rate per item (excluding WIP warehouses); margins are indicative, not historical FIFO cost. Tick rows to see profit for a single invoice or any combination of selected invoices.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <div class="iws-export-wrap">
            <button class="bs-export-btn" @click="ipExportOpen = !ipExportOpen" :disabled="!invoiceProfit.length">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <template v-if="ipExportOpen">
              <div class="iws-menu-backdrop" @click="ipExportOpen = false"></div>
              <div class="iws-menu">
                <button class="iws-menu-item" @click="ipExportOpen = false; exportInvoiceProfitCSV()">Download CSV{{ selectedInvoices.size ? ' (selected)' : '' }}</button>
                <button class="iws-menu-item" @click="ipExportOpen = false; copyInvoiceProfitToClipboard()">Copy to clipboard</button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <template v-if="invoiceProfitLoading"><div class="loading-shimmer" style="height:200px;border-radius:8px"></div></template>
      <template v-else-if="invoiceProfit.length">
        <div class="iws-body">
          <div class="iws-total-panel" :class="invoiceProfitTotals.profit>=0 ? '' : 'iws-total-panel-neg'">
            <div class="iws-total-icon" :class="invoiceProfitTotals.profit>=0 ? '' : 'iws-total-icon-neg'">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="9" y1="11" x2="13" y2="11"/></svg>
            </div>
            <div class="iws-total-label">Total Profit</div>
            <div class="iws-total-value" :class="invoiceProfitTotals.profit>=0 ? '' : 'iws-total-value-neg'" :style="totalValStyle(fmtAmt(invoiceProfitTotals.profit))">{{ fmtAmt(invoiceProfitTotals.profit) }}</div>
            <div class="iws-total-meta">
              {{ invoiceProfit.length }} {{ invoiceProfit.length === 1 ? 'Invoice' : 'Invoices' }} &bull;
              <span :class="invoiceProfitTotals.revenue ? (invoiceProfitTotals.profit>=0 ? 'green' : 'red') : ''">
                {{ invoiceProfitTotals.revenue ? (invoiceProfitTotals.profit/invoiceProfitTotals.revenue*100).toFixed(1) : '0.0' }}% margin
              </span>
            </div>
            <div class="iws-total-sub" v-if="selectedInvoices.size">
              <span class="iws-total-sub-label">{{ invoiceProfitSelectedTotals.count }} selected</span>
              <span class="iws-total-sub-value" :class="invoiceProfitSelectedTotals.profit>=0?'green':'red'" style="color:inherit">{{ fmtAmt(invoiceProfitSelectedTotals.profit) }}</span>
              <div style="font-size:11px;color:var(--text-3);margin-top:4px">
                Revenue {{ fmtAmt(invoiceProfitSelectedTotals.revenue) }} &bull; Cost {{ fmtAmt(invoiceProfitSelectedTotals.total_cost) }}
              </div>
            </div>
          </div>

          <div class="iws-table-wrap">
            <table class="iws-table">
              <thead>
                <tr>
                  <th class="iws-idx"><input type="checkbox" :checked="invoiceProfitAllSelected" @change="toggleAllInvoiceSelection" /></th>
                  <th @click="setIpSort('invoice')" class="iws-sortable">
                    <span>Invoice</span><span class="iws-sort-ind" :class="ipSortCls('invoice')">&#8645;</span>
                  </th>
                  <th @click="setIpSort('posting_date')" class="iws-sortable">
                    <span>Date</span><span class="iws-sort-ind" :class="ipSortCls('posting_date')">&#8645;</span>
                  </th>
                  <th @click="setIpSort('customer')" class="iws-sortable">
                    <span>Customer</span><span class="iws-sort-ind" :class="ipSortCls('customer')">&#8645;</span>
                  </th>
                  <th @click="setIpSort('revenue')" class="iws-sortable ta-r">
                    <span>Revenue (KES)</span><span class="iws-sort-ind" :class="ipSortCls('revenue')">&#8645;</span>
                  </th>
                  <th @click="setIpSort('total_cost')" class="iws-sortable ta-r">
                    <span>Est. Cost (KES)</span><span class="iws-sort-ind" :class="ipSortCls('total_cost')">&#8645;</span>
                  </th>
                  <th @click="setIpSort('profit')" class="iws-sortable ta-r">
                    <span>Profit (KES)</span><span class="iws-sort-ind" :class="ipSortCls('profit')">&#8645;</span>
                  </th>
                  <th @click="setIpSort('margin_pct')" class="iws-sortable ta-r">
                    <span>Margin %</span><span class="iws-sort-ind" :class="ipSortCls('margin_pct')">&#8645;</span>
                  </th>
                  <th class="iws-kebab-col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in invoiceProfitSorted" :key="row.invoice" :class="{ 'row-selected': selectedInvoices.has(row.invoice) }">
                  <td class="iws-idx"><input type="checkbox" :checked="selectedInvoices.has(row.invoice)" @change="toggleInvoiceSelection(row.invoice)" /></td>
                  <td class="mono-sm">
                    <a href="#" class="inv-detail-link" @click.prevent="openInvoiceDetail(row.invoice)">{{ row.invoice }}</a>
                    <span v-if="row.no_cost_lines" class="badge badge-muted" style="margin-left:6px;font-size:10px" title="One or more items on this invoice have no valuation or standard buying rate — cost/margin is understated">partial cost data</span>
                  </td>
                  <td class="mono-sm">{{ row.posting_date }}</td>
                  <td class="iws-item-name">{{ row.customer_name || row.customer }}</td>
                  <td class="ta-r mono-sm">{{ fmtAmt(row.revenue) }}</td>
                  <td class="ta-r mono-sm red">{{ fmtAmt(row.total_cost) }}</td>
                  <td class="ta-r mono-sm fw-700" :class="row.profit>=0?'green':'red'">{{ fmtAmt(row.profit) }}</td>
                  <td class="ta-r mono-sm" :class="row.margin_pct>=0?'green':'red'">{{ Number(row.margin_pct||0).toFixed(1) }}%</td>
                  <td class="iws-kebab-col">
                    <div class="iws-kebab-wrap">
                      <button class="iws-kebab" @click="ipRowMenu = (ipRowMenu === row.invoice ? null : row.invoice)" title="Row actions">&#8942;</button>
                      <template v-if="ipRowMenu === row.invoice">
                        <div class="iws-menu-backdrop" @click="ipRowMenu = null"></div>
                        <div class="iws-menu iws-menu-row">
                          <button class="iws-menu-item" @click="ipRowMenu = null; openInvoiceDetail(row.invoice)">View P&amp;L</button>
                          <button class="iws-menu-item" @click="ipRowMenu = null; copyInvoiceProfitRow(row)">Copy row</button>
                          <button class="iws-menu-item" @click="ipRowMenu = null; exportInvoiceProfitRowCSV(row)">Download row as CSV</button>
                        </div>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="iws-total-row">
                  <td class="iws-idx"><span class="iws-sigma">&Sigma;</span></td>
                  <td colspan="3" class="fw-700">Total</td>
                  <td class="ta-r fw-700">{{ fmtAmt(invoiceProfitTotals.revenue) }}</td>
                  <td class="ta-r fw-700 red">{{ fmtAmt(invoiceProfitTotals.total_cost) }}</td>
                  <td class="ta-r fw-700" :class="invoiceProfitTotals.profit>=0?'green':'red'">{{ fmtAmt(invoiceProfitTotals.profit) }}</td>
                  <td class="ta-r fw-700" :class="invoiceProfitTotals.profit>=0?'green':'red'">{{ invoiceProfitTotals.revenue ? (invoiceProfitTotals.profit/invoiceProfitTotals.revenue*100).toFixed(1) : '0.0' }}%</td>
                  <td class="iws-kebab-col"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </template>
      <div v-else class="empty-msg">{{invoiceProfitRan ? 'No sales in this period.' : 'Run the report to see results.'}}</div>
    </div>


    <!-- Single-invoice item-level P&L drill-down -->
    <Modal :show="invoiceDetailOpen" width="720px" :title="invoiceDetail ? `Profit & Loss — ${invoiceDetail.invoice.name}` : 'Profit & Loss'" @close="invoiceDetailOpen=false">
      <template v-if="invoiceDetailLoading"><div class="loading-shimmer" style="height:180px;border-radius:8px"></div></template>
      <template v-else-if="invoiceDetail">
        <div style="display:flex;flex-wrap:wrap;gap:16px;font-size:12.5px;color:#868E96;margin-bottom:14px">
          <span>Date: <strong style="color:#212529">{{ invoiceDetail.invoice.posting_date }}</strong></span>
          <span>Customer: <strong style="color:#212529">{{ invoiceDetail.invoice.customer_name || invoiceDetail.invoice.customer }}</strong></span>
          <span>Status: <strong style="color:#212529">{{ invoiceDetail.invoice.status }}</strong></span>
        </div>
        <div v-if="invoiceDetail.totals.no_cost_lines" style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
          {{ invoiceDetail.totals.no_cost_lines }} item{{invoiceDetail.totals.no_cost_lines>1?'s':''}} below have no valuation or standard buying rate — their cost is shown as "—" and excluded from the totals.
        </div>
        <table class="books-table aging-table" style="width:100%">
          <thead>
            <tr>
              <th>Item</th>
              <th class="ta-r">Qty</th>
              <th class="ta-r">Rate</th>
              <th class="ta-r">Revenue</th>
              <th class="ta-r">Cost Rate</th>
              <th class="ta-r">Total Cost</th>
              <th class="ta-r">Profit</th>
              <th class="ta-r">Margin %</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in invoiceDetail.items" :key="row.item_code">
              <td>{{ row.item_name || row.item_code }}</td>
              <td class="ta-r mono-sm">{{ fmtN(row.qty) }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(row.rate) }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(row.revenue) }}</td>
              <td class="ta-r mono-sm">{{ row.cost_rate ? fmtAmt(row.cost_rate) : '—' }}</td>
              <td class="ta-r mono-sm red">{{ row.cost_rate ? fmtAmt(row.total_cost) : '—' }}</td>
              <td class="ta-r mono-sm fw-700" :class="row.profit>=0?'green':'red'">{{ row.cost_rate ? fmtAmt(row.profit) : '—' }}</td>
              <td class="ta-r mono-sm" :class="row.margin_pct>=0?'green':'red'">{{ row.cost_rate ? Number(row.margin_pct||0).toFixed(1)+'%' : '—' }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="aging-totals-row">
              <td colspan="3" class="fw-700">TOTAL</td>
              <td class="ta-r fw-700">{{ fmtAmt(invoiceDetail.totals.revenue) }}</td>
              <td></td>
              <td class="ta-r fw-700 red">{{ fmtAmt(invoiceDetail.totals.total_cost) }}</td>
              <td class="ta-r fw-700" :class="invoiceDetail.totals.profit>=0?'green':'red'">{{ fmtAmt(invoiceDetail.totals.profit) }}</td>
              <td class="ta-r fw-700" :class="invoiceDetail.totals.profit>=0?'green':'red'">{{ Number(invoiceDetail.totals.margin_pct||0).toFixed(1) }}%</td>
            </tr>
          </tfoot>
        </table>
      </template>
      <div v-else class="empty-msg">Couldn't load this invoice.</div>
    </Modal>

    <!-- Trial Balance -->
    <div v-if="activeReport === 'tb'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon tb-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Trial Balance</div>
          <div class="bs-page-head-sub">Account-wise opening, movement and closing balances for the selected period</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <div class="iws-export-wrap">
            <button class="bs-export-btn" @click="tbExportOpen = !tbExportOpen" :disabled="!tb?.length">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <template v-if="tbExportOpen">
              <div class="iws-menu-backdrop" @click="tbExportOpen = false"></div>
              <div class="iws-menu">
                <button class="iws-menu-item" @click="tbExportOpen = false; exportTbCSV()">Download CSV</button>
                <button class="iws-menu-item" @click="tbExportOpen = false; copyTbToClipboard()">Copy to clipboard</button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <template v-if="tbLoading"><div class="loading-shimmer" style="height:200px;border-radius:8px"></div></template>
      <template v-else-if="tb?.length">
        <div class="bs-kpi-row" style="grid-template-columns: repeat(2, 1fr); margin-bottom:14px">
          <div class="bs-kpi bs-kpi-assets">
            <div class="bs-kpi-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
            </div>
            <div class="bs-kpi-body">
              <div class="bs-kpi-label">Total Debit</div>
              <div class="bs-kpi-amount">{{ fmtAmt(tbTotals.debit) }}</div>
            </div>
          </div>
          <div class="bs-kpi bs-kpi-liabilities">
            <div class="bs-kpi-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
            </div>
            <div class="bs-kpi-body">
              <div class="bs-kpi-label">Total Credit</div>
              <div class="bs-kpi-amount">{{ fmtAmt(tbTotals.credit) }}</div>
            </div>
          </div>
        </div>
        <div class="bs-sum-status" :class="tbBalanced ? 'bs-ok' : 'bs-bad'">
          <span class="bs-sum-status-icon">{{ tbBalanced ? '✓' : '✕' }}</span>
          <div class="bs-sum-status-body">
            <div class="bs-sum-status-title">{{ tbBalanced ? 'Total Debit = Total Credit' : 'Trial balance out of balance' }}</div>
            <div class="bs-sum-status-eq">{{ fmtAmt(tbTotals.debit) }} vs {{ fmtAmt(tbTotals.credit) }}<template v-if="!tbBalanced"> (diff {{ fmtAmt(tbTotals.debit - tbTotals.credit) }})</template></div>
          </div>
        </div>

        <div class="iws-table-wrap" style="margin-top:14px">
          <table class="iws-table">
            <thead>
              <tr>
                <th class="iws-idx">#</th>
                <th @click="setTbSort('account')" class="iws-sortable">
                  <span>Account</span><span class="iws-sort-ind" :class="tbSortCls('account')">&#8645;</span>
                </th>
                <th @click="setTbSort('account_type')" class="iws-sortable">
                  <span>Type</span><span class="iws-sort-ind" :class="tbSortCls('account_type')">&#8645;</span>
                </th>
                <th @click="setTbSort('opening')" class="iws-sortable ta-r">
                  <span>Opening (KES)</span><span class="iws-sort-ind" :class="tbSortCls('opening')">&#8645;</span>
                </th>
                <th @click="setTbSort('debit')" class="iws-sortable ta-r">
                  <span>Debit (KES)</span><span class="iws-sort-ind" :class="tbSortCls('debit')">&#8645;</span>
                </th>
                <th @click="setTbSort('credit')" class="iws-sortable ta-r">
                  <span>Credit (KES)</span><span class="iws-sort-ind" :class="tbSortCls('credit')">&#8645;</span>
                </th>
                <th @click="setTbSort('closing')" class="iws-sortable ta-r">
                  <span>Closing (KES)</span><span class="iws-sort-ind" :class="tbSortCls('closing')">&#8645;</span>
                </th>
                <th class="iws-kebab-col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in tbSorted" :key="row.account">
                <td class="iws-idx">{{ i + 1 }}</td>
                <td class="iws-item-name">{{ row.account }}</td>
                <td><span class="iws-uom" style="background:#f1f5f9;color:#475569">{{ row.account_type }}</span></td>
                <td class="ta-r mono-sm" :class="row.opening<0?'red':''">{{ fmtN2(row.opening||0) }}</td>
                <td class="ta-r mono-sm green">{{ row.debit ? fmtN2(row.debit) : '—' }}</td>
                <td class="ta-r mono-sm red">{{ row.credit ? fmtN2(row.credit) : '—' }}</td>
                <td class="ta-r mono-sm fw-700" :class="row.closing<0?'red':'green'">{{ fmtAmt(row.closing||0) }}</td>
                <td class="iws-kebab-col">
                  <div class="iws-kebab-wrap">
                    <button class="iws-kebab" @click="tbRowMenu = (tbRowMenu === i ? null : i)" title="Row actions">&#8942;</button>
                    <template v-if="tbRowMenu === i">
                      <div class="iws-menu-backdrop" @click="tbRowMenu = null"></div>
                      <div class="iws-menu iws-menu-row">
                        <button class="iws-menu-item" @click="tbRowMenu = null; copyTbRow(row)">Copy row</button>
                        <button class="iws-menu-item" @click="tbRowMenu = null; exportTbRowCSV(row)">Download row as CSV</button>
                      </div>
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="iws-total-row">
                <td class="iws-idx"><span class="iws-sigma">&Sigma;</span></td>
                <td class="fw-700">Total</td>
                <td></td>
                <td class="ta-r fw-700">{{ fmtAmt(tbTotals.opening) }}</td>
                <td class="ta-r fw-700 green">{{ fmtAmt(tbTotals.debit) }}</td>
                <td class="ta-r fw-700 red">{{ fmtAmt(tbTotals.credit) }}</td>
                <td class="ta-r fw-700">{{ fmtAmt(tbTotals.closing) }}</td>
                <td class="iws-kebab-col"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </template>
      <div v-else class="empty-msg">Run the report to see results.</div>
    </div>


    <!-- Stock vs GL Reconciliation -->
    <div v-if="activeReport === 'stockgl'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon sgl-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Stock Ledger vs Inventory GL</div>
          <div class="bs-page-head-sub">Compares the operational Stock Ledger (Bin valuation) against the financial General Ledger (Inventory Asset account balance) — this check is the tripwire that catches drift immediately instead of at year-end audit.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">As of {{ fmtDate(toDate) }}</div>
          <div class="iws-export-wrap">
            <button class="bs-export-btn" @click="sglExportOpen = !sglExportOpen" :disabled="!stockGl">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <template v-if="sglExportOpen">
              <div class="iws-menu-backdrop" @click="sglExportOpen = false"></div>
              <div class="iws-menu">
                <button class="iws-menu-item" @click="sglExportOpen = false; exportSglAccountsCSV()">Download account summary (CSV)</button>
                <button class="iws-menu-item" @click="sglExportOpen = false; exportSglItemsCSV()">Download item-level detail (CSV)</button>
                <button class="iws-menu-item" @click="sglExportOpen = false; copySglItemsToClipboard()">Copy item-level detail</button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <template v-if="stockGlLoading"><div class="loading-shimmer" style="height:160px;border-radius:8px"></div></template>
      <template v-else-if="stockGl">
        <div class="bs-kpi-row" style="grid-template-columns: repeat(3, 1fr); margin-bottom:14px">
          <div class="bs-kpi bs-kpi-assets">
            <div class="bs-kpi-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <div class="bs-kpi-body">
              <div class="bs-kpi-label">Bin Stock Value</div>
              <div class="bs-kpi-amount">{{ fmtAmt(stockGl.total_bin_value) }}</div>
            </div>
          </div>
          <div class="bs-kpi bs-kpi-equity">
            <div class="bs-kpi-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="3" x2="8" y2="21"/></svg>
            </div>
            <div class="bs-kpi-body">
              <div class="bs-kpi-label">Inventory GL Balance</div>
              <div class="bs-kpi-amount">{{ fmtAmt(stockGl.total_gl_balance) }}</div>
            </div>
          </div>
          <div class="bs-kpi" :class="stockGl.is_reconciled ? 'bs-kpi-assets' : 'bs-kpi-liabilities'">
            <div class="bs-kpi-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div class="bs-kpi-body">
              <div class="bs-kpi-label">Difference</div>
              <div class="bs-kpi-amount" :class="stockGl.is_reconciled ? '' : 'text-danger'">{{ fmtAmt(stockGl.total_difference) }}</div>
            </div>
          </div>
        </div>

        <div class="bs-sum-status" :class="stockGl.is_reconciled ? 'bs-ok' : 'bs-bad'">
          <span class="bs-sum-status-icon">{{ stockGl.is_reconciled ? '✓' : '✕' }}</span>
          <div class="bs-sum-status-body">
            <div class="bs-sum-status-title">{{ stockGl.is_reconciled ? 'Bin Stock Value = Inventory GL Balance' : 'Stock and GL are out of sync' }}</div>
            <div class="bs-sum-status-eq">{{ fmtAmt(stockGl.total_bin_value) }} vs {{ fmtAmt(stockGl.total_gl_balance) }}<template v-if="!stockGl.is_reconciled"> (diff {{ fmtAmt(stockGl.total_difference) }})</template></div>
          </div>
        </div>

        <div v-if="stockGl.grir_account" class="sgl-grir-note">
          <strong>Stock Received (GR/IR):</strong> <span class="mono-sm fw-600">{{ fmtAmt(stockGl.grir_balance) }}</span>
          <span> — goods received, awaiting bill. Nonzero is normal.</span>
        </div>

        <template v-if="stockGl.accounts?.length">
          <div class="iws-section-label">By Inventory Account</div>
          <div class="iws-table-wrap" style="margin-bottom:20px">
            <table class="iws-table">
              <thead>
                <tr>
                  <th class="iws-idx">#</th>
                  <th @click="setSglAccSort('account')" class="iws-sortable">
                    <span>Inventory Account</span><span class="iws-sort-ind" :class="sglAccSortCls('account')">&#8645;</span>
                  </th>
                  <th @click="setSglAccSort('bin_stock_value')" class="iws-sortable ta-r">
                    <span>Bin Stock Value (KES)</span><span class="iws-sort-ind" :class="sglAccSortCls('bin_stock_value')">&#8645;</span>
                  </th>
                  <th @click="setSglAccSort('gl_balance')" class="iws-sortable ta-r">
                    <span>GL Balance (KES)</span><span class="iws-sort-ind" :class="sglAccSortCls('gl_balance')">&#8645;</span>
                  </th>
                  <th @click="setSglAccSort('difference')" class="iws-sortable ta-r">
                    <span>Difference (KES)</span><span class="iws-sort-ind" :class="sglAccSortCls('difference')">&#8645;</span>
                  </th>
                  <th>Status</th>
                  <th class="iws-kebab-col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in sglAccountsSorted" :key="row.account">
                  <td class="iws-idx">{{ i + 1 }}</td>
                  <td class="iws-item-name">{{ row.account }}</td>
                  <td class="ta-r mono-sm">{{ fmtN2(row.bin_stock_value) }}</td>
                  <td class="ta-r mono-sm">{{ fmtN2(row.gl_balance) }}</td>
                  <td class="ta-r mono-sm" :class="row.is_reconciled ? '' : 'text-danger fw-700'">{{ fmtN2(row.difference) }}</td>
                  <td><span class="badge" :class="row.is_reconciled ? 'badge-blue' : 'badge-danger'">{{ row.is_reconciled ? 'OK' : 'DRIFT' }}</span></td>
                  <td class="iws-kebab-col">
                    <div class="iws-kebab-wrap">
                      <button class="iws-kebab" @click="sglAccRowMenu = (sglAccRowMenu === i ? null : i)" title="Row actions">&#8942;</button>
                      <template v-if="sglAccRowMenu === i">
                        <div class="iws-menu-backdrop" @click="sglAccRowMenu = null"></div>
                        <div class="iws-menu iws-menu-row">
                          <button class="iws-menu-item" @click="sglAccRowMenu = null; copySglAccountRow(row)">Copy row</button>
                        </div>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <template v-if="stockGl.items?.length">
          <div class="iws-section-label">Item-level Bin Detail</div>
          <div class="iws-table-wrap">
            <table class="iws-table">
              <thead>
                <tr>
                  <th class="iws-idx">#</th>
                  <th @click="setSglItemSort('item')" class="iws-sortable">
                    <span>Item</span><span class="iws-sort-ind" :class="sglItemSortCls('item')">&#8645;</span>
                  </th>
                  <th @click="setSglItemSort('warehouse')" class="iws-sortable">
                    <span>Warehouse</span><span class="iws-sort-ind" :class="sglItemSortCls('warehouse')">&#8645;</span>
                  </th>
                  <th @click="setSglItemSort('actual_qty')" class="iws-sortable ta-r">
                    <span>Qty</span><span class="iws-sort-ind" :class="sglItemSortCls('actual_qty')">&#8645;</span>
                  </th>
                  <th @click="setSglItemSort('valuation_rate')" class="iws-sortable ta-r">
                    <span>Valuation Rate (KES)</span><span class="iws-sort-ind" :class="sglItemSortCls('valuation_rate')">&#8645;</span>
                  </th>
                  <th @click="setSglItemSort('stock_value')" class="iws-sortable ta-r">
                    <span>Stock Value (KES)</span><span class="iws-sort-ind" :class="sglItemSortCls('stock_value')">&#8645;</span>
                  </th>
                  <th class="iws-kebab-col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in sglItemsSorted" :key="row.item_code + row.warehouse">
                  <td class="iws-idx">{{ i + 1 }}</td>
                  <td class="iws-item-name">{{ row.item_name || row.item_code }}</td>
                  <td><span class="iws-uom">{{ row.warehouse }}</span></td>
                  <td class="ta-r mono-sm">{{ fmtN(row.actual_qty) }}</td>
                  <td class="ta-r mono-sm">{{ fmtN2(row.valuation_rate) }}</td>
                  <td class="ta-r mono-sm fw-700 green">{{ fmtAmt(row.stock_value) }}</td>
                  <td class="iws-kebab-col">
                    <div class="iws-kebab-wrap">
                      <button class="iws-kebab" @click="sglItemRowMenu = (sglItemRowMenu === i ? null : i)" title="Row actions">&#8942;</button>
                      <template v-if="sglItemRowMenu === i">
                        <div class="iws-menu-backdrop" @click="sglItemRowMenu = null"></div>
                        <div class="iws-menu iws-menu-row">
                          <button class="iws-menu-item" @click="sglItemRowMenu = null; copySglItemRow(row)">Copy row</button>
                          <button class="iws-menu-item" @click="sglItemRowMenu = null; exportSglItemRowCSV(row)">Download row as CSV</button>
                        </div>
                      </template>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="iws-total-row">
                  <td class="iws-idx"><span class="iws-sigma">&Sigma;</span></td>
                  <td colspan="3" class="fw-700">Total</td>
                  <td></td>
                  <td class="ta-r fw-700 green">{{ fmtAmt(sglItemsTotal) }}</td>
                  <td class="iws-kebab-col"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </template>
      </template>
      <div v-else class="empty-msg">{{stockGlRan ? 'No stock on hand for this company.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Stock Valuation Summary -->
    <div v-if="activeReport === 'stockval'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon sv-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Stock Valuation Summary</div>
          <div class="bs-page-head-sub">Total stock value per warehouse, from current Bin valuation. Reflects live stock on hand — not a historical point-in-time snapshot, since stock quantities aren't tracked by date.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">As of {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportStockValCSV" :disabled="!stockVal?.by_warehouse?.length">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <template v-if="stockValLoading"><div class="loading-shimmer" style="height:160px;border-radius:8px"></div></template>
      <template v-else-if="stockVal">
        <div class="bs-kpi-row" style="grid-template-columns: 1fr; margin-bottom:14px">
          <div class="bs-kpi bs-kpi-assets">
            <div class="bs-kpi-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            </div>
            <div class="bs-kpi-body">
              <div class="bs-kpi-label">Grand Total Stock Value</div>
              <div class="bs-kpi-amount">{{ fmtAmt(stockVal.grand_total) }}</div>
            </div>
          </div>
        </div>

        <template v-if="stockVal.by_warehouse?.length">
          <div class="iws-section-label">By Warehouse</div>
          <div class="iws-table-wrap">
            <table class="iws-table">
              <thead>
                <tr>
                  <th class="iws-idx">#</th>
                  <th>Warehouse</th>
                  <th class="ta-r">Stock Value (KES)</th>
                  <th class="ta-r">% of Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in stockVal.by_warehouse" :key="row.warehouse">
                  <td class="iws-idx">{{ i + 1 }}</td>
                  <td class="iws-item-name">{{ row.warehouse }}</td>
                  <td class="ta-r mono-sm fw-700 green">{{ fmtAmt(row.stock_value) }}</td>
                  <td class="ta-r mono-sm">{{ stockVal.grand_total ? ((row.stock_value / stockVal.grand_total) * 100).toFixed(1) + '%' : '—' }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="iws-total-row">
                  <td class="iws-idx"><span class="iws-sigma">&Sigma;</span></td>
                  <td class="fw-700">Total</td>
                  <td class="ta-r fw-700 green">{{ fmtAmt(stockVal.grand_total) }}</td>
                  <td class="ta-r fw-700">100.0%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </template>
        <div v-else class="empty-msg">No stock on hand in any warehouse.</div>
      </template>
      <div v-else class="empty-msg">{{stockValRan ? 'No stock on hand for this company.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Selling Price & MRP -->
    <div v-if="activeReport === 'price_mrp'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon sv-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Selling Price &amp; MRP</div>
          <div class="bs-page-head-sub">Item-wise selling price and MRP per warehouse, from the Item master. Where MRP is not set on an item, the selling price is shown as MRP.</div>
        </div>
        <div class="bs-page-head-actions">
          <button class="bs-export-btn" @click="exportPriceMrpCSV" :disabled="!priceMrpFiltered.length">
            Export
          </button>
        </div>
      </div>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px">
        <input type="text" v-model="priceMrpSearch" class="dr-input" placeholder="Search item code or name" style="min-width:220px" />
        <select v-model="priceMrpWarehouse" class="dr-input">
          <option value="">All warehouses</option>
          <option v-for="w in (priceMrp?.warehouses || [])" :key="w" :value="w">{{ w }}</option>
        </select>
      </div>

      <template v-if="priceMrpLoading"><div class="loading-shimmer" style="height:160px;border-radius:8px"></div></template>
      <template v-else-if="priceMrp && priceMrpFiltered.length">
        <div class="iws-table-wrap">
          <table class="iws-table">
            <thead>
              <tr>
                <th class="iws-idx">#</th>
                <th>Item</th>
                <th>Warehouse</th>
                <th class="ta-r">Stock Qty</th>
                <th class="ta-r">Selling Price (KES)</th>
                <th class="ta-r">MRP (KES)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in priceMrpFiltered" :key="row.item_code + '|' + row.warehouse">
                <td class="iws-idx">{{ i + 1 }}</td>
                <td class="iws-item-name">{{ row.item_name || row.item_code }}<div class="mono-sm" style="opacity:.65">{{ row.item_code }}</div></td>
                <td>{{ row.warehouse || '—' }}</td>
                <td class="ta-r mono-sm">{{ row.qty }} {{ row.uom }}</td>
                <td class="ta-r mono-sm fw-700 green">{{ fmtAmt(row.selling_price) }}</td>
                <td class="ta-r mono-sm fw-700">{{ fmtAmt(row.mrp) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <div v-else class="empty-msg">{{ priceMrpRan ? 'No items found.' : 'Run the report to see results.' }}</div>
    </div>

    <!-- Daily Business MIS -->
    <div v-if="activeReport === 'mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon mis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Daily Business MIS</div>
          <div class="bs-page-head-sub">Day-by-day snapshot of Sales, Collection, Purchase, Expenses, Dispatch, Production, Stock Inward/Outward and running Outstanding for the selected period.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportDailyMisCSV" :disabled="!dailyMis?.days?.length">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <template v-if="misLoading"><div class="loading-shimmer" style="height:200px;border-radius:8px"></div></template>
      <template v-else-if="dailyMis">
        <div class="mis-summary-grid" style="margin-bottom:18px">
          <div class="mis-summary-card">
            <span class="bucket-label">Daily Sales</span>
            <span class="mis-summary-val">{{ fmtAmt(dailyMis.totals.sales_amount) }}</span>
          </div>
          <div class="mis-summary-card">
            <span class="bucket-label">Daily Collection</span>
            <span class="mis-summary-val green">{{ fmtAmt(dailyMis.totals.collection_amount) }}</span>
          </div>
          <div class="mis-summary-card">
            <span class="bucket-label">Daily Purchase</span>
            <span class="mis-summary-val">{{ fmtAmt(dailyMis.totals.purchase_amount) }}</span>
          </div>
          <div class="mis-summary-card">
            <span class="bucket-label">Daily Expenses</span>
            <span class="mis-summary-val red">{{ fmtAmt(dailyMis.totals.expense_amount) }}</span>
          </div>
          <div class="mis-summary-card">
            <span class="bucket-label">Daily Dispatch</span>
            <span class="mis-summary-val">{{ fmtN(dailyMis.totals.dispatch_qty) }} qty</span>
          </div>
          <div class="mis-summary-card">
            <span class="bucket-label">Daily Production</span>
            <span class="mis-summary-val">{{ fmtN(dailyMis.totals.production_qty) }} qty</span>
          </div>
          <div class="mis-summary-card">
            <span class="bucket-label">Stock Inward / Outward</span>
            <span class="mis-summary-val">{{ fmtN(dailyMis.totals.stock_inward_qty) }} / {{ fmtN(dailyMis.totals.stock_outward_qty) }}</span>
          </div>
          <div class="mis-summary-card">
            <span class="bucket-label">Closing Outstanding</span>
            <span class="mis-summary-val" :class="dailyMis.totals.closing_outstanding>=0?'':'green'">{{ fmtAmt(dailyMis.totals.closing_outstanding) }}</span>
          </div>
        </div>

        <template v-if="dailyMis.days?.length">
          <div class="iws-section-label">Day by Day</div>
          <div class="iws-table-wrap">
            <table class="iws-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th class="ta-r">Sales</th>
                  <th class="ta-r">Collection</th>
                  <th class="ta-r">Purchase</th>
                  <th class="ta-r">Expenses</th>
                  <th class="ta-r">Dispatch Qty</th>
                  <th class="ta-r">Production Qty</th>
                  <th class="ta-r">Stock In</th>
                  <th class="ta-r">Stock Out</th>
                  <th class="ta-r">Outstanding</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in dailyMis.days" :key="row.date">
                  <td class="iws-item-name">{{ row.date }}</td>
                  <td class="ta-r mono-sm">{{ fmtAmt(row.sales_amount) }}</td>
                  <td class="ta-r mono-sm green">{{ fmtAmt(row.collection_amount) }}</td>
                  <td class="ta-r mono-sm">{{ fmtAmt(row.purchase_amount) }}</td>
                  <td class="ta-r mono-sm red">{{ fmtAmt(row.expense_amount) }}</td>
                  <td class="ta-r mono-sm">{{ fmtN(row.dispatch_qty) }}</td>
                  <td class="ta-r mono-sm">{{ fmtN(row.production_qty) }}</td>
                  <td class="ta-r mono-sm">{{ fmtN(row.stock_inward_qty) }}</td>
                  <td class="ta-r mono-sm">{{ fmtN(row.stock_outward_qty) }}</td>
                  <td class="ta-r mono-sm fw-600">{{ fmtAmt(row.outstanding) }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="iws-total-row">
                  <td class="fw-700">TOTAL</td>
                  <td class="ta-r fw-700">{{ fmtAmt(dailyMis.totals.sales_amount) }}</td>
                  <td class="ta-r fw-700 green">{{ fmtAmt(dailyMis.totals.collection_amount) }}</td>
                  <td class="ta-r fw-700">{{ fmtAmt(dailyMis.totals.purchase_amount) }}</td>
                  <td class="ta-r fw-700 red">{{ fmtAmt(dailyMis.totals.expense_amount) }}</td>
                  <td class="ta-r fw-700">{{ fmtN(dailyMis.totals.dispatch_qty) }}</td>
                  <td class="ta-r fw-700">{{ fmtN(dailyMis.totals.production_qty) }}</td>
                  <td class="ta-r fw-700">{{ fmtN(dailyMis.totals.stock_inward_qty) }}</td>
                  <td class="ta-r fw-700">{{ fmtN(dailyMis.totals.stock_outward_qty) }}</td>
                  <td class="ta-r fw-700">{{ fmtAmt(dailyMis.totals.closing_outstanding) }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </template>
        <div v-else class="empty-msg">No activity in this period.</div>
      </template>
      <div v-else class="empty-msg">{{misRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Sales MIS -->
    <div v-if="activeReport === 'sales_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon smis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Sales MIS</div>
          <div class="bs-page-head-sub">Sales performance broken down by summary, target, product, customer, salesperson, branch, returns, discounts, pending orders and conversion.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportSalesMisCSV" :disabled="!salesMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in salesMisTabs" :key="t.key" class="report-tab"
          :class="{ active: salesMisTab === t.key }" @click="salesMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="salesMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="salesMis">

        <!-- Sales Summary -->
        <template v-if="salesMisTab === 'summary'">
          <div class="mis-summary-grid">
            <div class="mis-summary-card"><span class="bucket-label">Invoices</span><span class="mis-summary-val">{{ fmtN(salesMis.summary.invoice_count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Net Sales</span><span class="mis-summary-val">{{ fmtAmt(salesMis.summary.net_sales) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Total Tax</span><span class="mis-summary-val">{{ fmtAmt(salesMis.summary.total_tax) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Discount Given</span><span class="mis-summary-val red">{{ fmtAmt(salesMis.summary.header_discount) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Grand Total</span><span class="mis-summary-val green">{{ fmtAmt(salesMis.summary.grand_total) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Qty Sold</span><span class="mis-summary-val">{{ fmtN(salesMis.summary.total_qty) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Avg Invoice Value</span><span class="mis-summary-val">{{ fmtAmt(salesMis.summary.avg_invoice_value) }}</span></div>
          </div>
        </template>

        <!-- Sales Target vs Achievement -->
        <template v-else-if="salesMisTab === 'target'">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">
            <label class="dr-label">Sales Target (KES)</label>
            <input type="number" v-model.number="salesTarget" class="dr-input" style="width:160px" min="0" />
            <span style="font-size:11.5px;color:#94a3b8">No target is stored — enter one to compare against actuals for this period.</span>
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(3,1fr)">
            <div class="mis-summary-card"><span class="bucket-label">Target</span><span class="mis-summary-val">{{ fmtAmt(salesTarget) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Achieved</span><span class="mis-summary-val green">{{ fmtAmt(salesMis.summary.grand_total) }}</span></div>
            <div class="mis-summary-card">
              <span class="bucket-label">Achievement %</span>
              <span class="mis-summary-val" :class="achievementPct >= 100 ? 'green' : 'red'">{{ achievementPct.toFixed(1) }}%</span>
            </div>
          </div>
          <div class="pl-row" :class="salesMis.summary.grand_total >= salesTarget ? 'profit' : 'loss'" style="margin-top:12px">
            <span>Variance (Achieved − Target)</span>
            <span class="mono">{{ fmt(salesMis.summary.grand_total - salesTarget) }}</span>
          </div>
        </template>

        <!-- Product-wise Sales -->
        <table v-else-if="salesMisTab === 'product'" class="books-table aging-table" style="width:100%">
          <thead><tr><th>Item</th><th>UOM</th><th class="ta-r">Invoices</th><th class="ta-r">Qty Sold</th><th class="ta-r">Discount</th><th class="ta-r">Amount</th></tr></thead>
          <tbody>
            <tr v-for="r in salesMis.product_wise" :key="r.item_code">
              <td>{{ r.item_name || r.item_code }}</td>
              <td>{{ r.uom || '—' }}</td>
              <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
              <td class="ta-r mono-sm">{{ fmtN(r.qty_sold) }}</td>
              <td class="ta-r mono-sm red">{{ fmtAmt(r.total_discount) }}</td>
              <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_amount) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Customer-wise Sales -->
        <table v-else-if="salesMisTab === 'customer'" class="books-table aging-table" style="width:100%">
          <thead><tr><th>Customer</th><th class="ta-r">Invoices</th><th class="ta-r">Amount</th><th class="ta-r">Outstanding</th></tr></thead>
          <tbody>
            <tr v-for="r in salesMis.customer_wise" :key="r.customer">
              <td>{{ r.customer_name || r.customer }}</td>
              <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
              <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_amount) }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(r.outstanding_amount) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Salesperson-wise Sales -->
        <table v-else-if="salesMisTab === 'salesperson'" class="books-table aging-table" style="width:100%">
          <thead><tr><th>Salesperson</th><th class="ta-r">Invoices</th><th class="ta-r">Amount</th></tr></thead>
          <tbody>
            <tr v-for="r in salesMis.salesperson_wise" :key="r.sales_person">
              <td>{{ r.sales_person }}</td>
              <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
              <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_amount) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Branch / Location-wise Sales -->
        <template v-else-if="salesMisTab === 'branch'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:10px">No dedicated Branch/Location doctype exists — grouped by Cost Center as a proxy.</div>
          <table class="books-table aging-table" style="width:100%">
            <thead><tr><th>Branch / Cost Center</th><th class="ta-r">Invoices</th><th class="ta-r">Amount</th></tr></thead>
            <tbody>
              <tr v-for="r in salesMis.branch_wise" :key="r.branch">
                <td>{{ r.branch }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_amount) }}</td>
              </tr>
            </tbody>
          </table>
        </template>

        <!-- Sales Return -->
        <template v-else-if="salesMisTab === 'returns'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Return Count</span><span class="mis-summary-val">{{ salesMis.sales_return.return_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Return Value</span><span class="mis-summary-val red">{{ fmtAmt(salesMis.sales_return.return_total) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">% of Sales</span><span class="mis-summary-val">{{ salesMis.sales_return.return_pct_of_sales.toFixed(1) }}%</span></div>
          </div>
          <table v-if="salesMis.sales_return.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Credit Note</th><th>Date</th><th>Customer</th><th>Against Invoice</th><th class="ta-r">Amount</th><th>Reason</th></tr></thead>
            <tbody>
              <tr v-for="r in salesMis.sales_return.rows" :key="r.credit_note">
                <td>{{ r.credit_note }}</td>
                <td>{{ r.posting_date }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td>{{ r.return_against || '—' }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.grand_total) }}</td>
                <td>{{ r.reason || '—' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No sales returns in this period.</div>
        </template>

        <!-- Discount Analysis -->
        <template v-else-if="salesMisTab === 'discount'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Line Discount</span><span class="mis-summary-val red">{{ fmtAmt(salesMis.discount_analysis.total_line_discount) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Header Discount</span><span class="mis-summary-val red">{{ fmtAmt(salesMis.discount_analysis.total_header_discount) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Avg Discount %</span><span class="mis-summary-val">{{ salesMis.discount_analysis.avg_discount_pct.toFixed(1) }}%</span></div>
          </div>
          <div class="books-card-title" style="font-size:13px;margin-bottom:10px">By Customer</div>
          <table v-if="salesMis.discount_analysis.by_customer.length" class="books-table aging-table" style="width:100%;margin-bottom:20px">
            <thead><tr><th>Customer</th><th class="ta-r">Line Discount</th><th class="ta-r">Header Discount</th><th class="ta-r">Net Amount</th></tr></thead>
            <tbody>
              <tr v-for="r in salesMis.discount_analysis.by_customer" :key="r.customer">
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.line_discount) }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.header_discount) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.net_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No discounted invoices for any customer.</div>
          <div class="books-card-title" style="font-size:13px;margin-bottom:10px">By Item</div>
          <table v-if="salesMis.discount_analysis.by_item.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th class="ta-r">Discount</th><th class="ta-r">Net Amount</th></tr></thead>
            <tbody>
              <tr v-for="r in salesMis.discount_analysis.by_item" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.total_discount) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.net_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No discounted items.</div>
        </template>

        <!-- Sales Order Pending -->
        <template v-else-if="salesMisTab === 'pending'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Open Orders (as of To date)</span><span class="mis-summary-val">{{ salesMis.sales_order_pending.order_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Pending Value</span><span class="mis-summary-val red">{{ fmtAmt(salesMis.sales_order_pending.pending_total) }}</span></div>
          </div>
          <table v-if="salesMis.sales_order_pending.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Date</th><th>Customer</th><th>Status</th><th class="ta-r">Order Value</th><th class="ta-r">Billed</th><th class="ta-r">Pending</th></tr></thead>
            <tbody>
              <tr v-for="r in salesMis.sales_order_pending.rows" :key="r.sales_order">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.transaction_date }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td><span class="badge badge-blue">{{ r.status }}</span></td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.grand_total) }}</td>
                <td class="ta-r mono-sm green">{{ fmtAmt(r.billed_amount) }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtAmt(r.pending_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No pending sales orders.</div>
        </template>

        <!-- Sales Conversion -->
        <template v-else-if="salesMisTab === 'conversion'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">Based on Sales Orders placed within the selected date range.</div>
          <div class="mis-summary-grid">
            <div class="mis-summary-card"><span class="bucket-label">Orders Placed</span><span class="mis-summary-val">{{ salesMis.sales_conversion.order_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Converted to Invoice</span><span class="mis-summary-val green">{{ salesMis.sales_conversion.converted_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Conversion Rate</span><span class="mis-summary-val" :class="salesMis.sales_conversion.conversion_rate_pct>=50?'green':'red'">{{ salesMis.sales_conversion.conversion_rate_pct.toFixed(1) }}%</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Order Value</span><span class="mis-summary-val">{{ fmtAmt(salesMis.sales_conversion.order_value) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Billed Value</span><span class="mis-summary-val green">{{ fmtAmt(salesMis.sales_conversion.billed_value) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Value Conversion %</span><span class="mis-summary-val">{{ salesMis.sales_conversion.value_conversion_pct.toFixed(1) }}%</span></div>
          </div>
        </template>

      </template>
      <div v-else class="empty-msg">{{salesMisRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Collection & Receivables MIS -->
    <div v-if="activeReport === 'receivables'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon rmis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Collection & Receivables MIS</div>
          <div class="bs-page-head-sub">Total receivables, customer outstanding, ageing, collection targets and efficiency for the selected period.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">As of {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportReceivablesCSV" :disabled="!receivablesMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in receivablesTabs" :key="t.key" class="report-tab"
          :class="{ active: receivablesTab === t.key }" @click="receivablesTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="receivablesLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="receivablesMis">

        <!-- Total Receivables -->
        <template v-if="receivablesTab === 'total'">
          <div class="pl-row net loss" style="margin-bottom:12px">
            <span>Total Receivables (as of {{ receivablesMis.as_of_date }})</span>
            <span class="mono">{{ fmt(receivablesMis.total_outstanding) }}</span>
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(4,1fr)">
            <div class="mis-summary-card"><span class="bucket-label">Customers Owing</span><span class="mis-summary-val">{{ receivablesMis.customer_outstanding.length }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Open Invoices</span><span class="mis-summary-val">{{ receivablesMis.customer_outstanding.reduce((s,r)=>s+r.invoice_count,0) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Overdue Amount</span><span class="mis-summary-val red">{{ fmtAmt(receivablesMis.overdue.total) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Not Yet Due</span><span class="mis-summary-val green">{{ fmtAmt(receivablesMis.total_outstanding - receivablesMis.overdue.total) }}</span></div>
          </div>
        </template>

        <!-- Customer Outstanding -->
        <template v-else-if="receivablesTab === 'outstanding'">
          <div class="pl-row net loss" style="margin-bottom:12px">
            <span>Total Outstanding (as of {{ receivablesMis.as_of_date }})</span>
            <span class="mono">{{ fmt(receivablesMis.total_outstanding) }}</span>
          </div>
          <table v-if="receivablesMis.customer_outstanding.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Customer</th><th class="ta-r">Open Invoices</th><th>Oldest Due Date</th><th class="ta-r">Outstanding</th></tr></thead>
            <tbody>
              <tr v-for="r in receivablesMis.customer_outstanding" :key="r.customer">
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td>{{ r.oldest_due_date || '—' }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.outstanding_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No outstanding receivables.</div>
        </template>

        <!-- Ageing -->
        <template v-else-if="receivablesTab === 'ageing'">
          <div class="aging-buckets" style="margin-bottom:16px">
            <div class="aging-bucket"><span class="bucket-label">0-30 Days</span><span class="bucket-val mono-sm">{{ fmtAmt(receivablesMis.ageing_totals.days_0_30) }}</span></div>
            <div class="aging-bucket"><span class="bucket-label">31-60 Days</span><span class="bucket-val mono-sm">{{ fmtAmt(receivablesMis.ageing_totals.days_31_60) }}</span></div>
            <div class="aging-bucket"><span class="bucket-label">61-90 Days</span><span class="bucket-val mono-sm">{{ fmtAmt(receivablesMis.ageing_totals.days_61_90) }}</span></div>
            <div class="aging-bucket"><span class="bucket-label">90+ Days</span><span class="bucket-val mono-sm red">{{ fmtAmt(receivablesMis.ageing_totals.days_90_plus) }}</span></div>
            <div class="aging-bucket"><span class="bucket-label">Total</span><span class="bucket-val mono-sm fw-700">{{ fmtAmt(receivablesMis.ageing_totals.total) }}</span></div>
          </div>
          <table v-if="receivablesMis.ageing.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Customer</th><th class="ta-r">0-30</th><th class="ta-r">31-60</th><th class="ta-r">61-90</th><th class="ta-r">90+</th><th class="ta-r">Total</th></tr></thead>
            <tbody>
              <tr v-for="r in receivablesMis.ageing" :key="r.customer">
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.days_0_30) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.days_31_60) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.days_61_90) }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.days_90_plus) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No outstanding receivables.</div>
        </template>

        <!-- Collection Target vs Achievement -->
        <template v-else-if="receivablesTab === 'coll_target'">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">
            <label class="dr-label">Collection Target (KES)</label>
            <input type="number" v-model.number="collectionTarget" class="dr-input" style="width:160px" min="0" />
            <span style="font-size:11.5px;color:#94a3b8">No target is stored — enter one to compare against actual collections for this period.</span>
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(3,1fr)">
            <div class="mis-summary-card"><span class="bucket-label">Target</span><span class="mis-summary-val">{{ fmtAmt(collectionTarget) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Achieved</span><span class="mis-summary-val green">{{ fmtAmt(receivablesMis.daily_collection.total) }}</span></div>
            <div class="mis-summary-card">
              <span class="bucket-label">Achievement %</span>
              <span class="mis-summary-val" :class="collAchievementPct >= 100 ? 'green' : 'red'">{{ collAchievementPct.toFixed(1) }}%</span>
            </div>
          </div>
          <div class="pl-row" :class="receivablesMis.daily_collection.total >= collectionTarget ? 'profit' : 'loss'" style="margin-top:12px">
            <span>Variance (Achieved − Target)</span>
            <span class="mono">{{ fmt(receivablesMis.daily_collection.total - collectionTarget) }}</span>
          </div>
        </template>

        <!-- Daily Collection -->
        <template v-else-if="receivablesTab === 'daily_coll'">
          <div class="pl-row net profit" style="margin-bottom:12px">
            <span>Total Collection ({{ fromDate }} to {{ toDate }})</span>
            <span class="mono">{{ fmt(receivablesMis.daily_collection.total) }}</span>
          </div>
          <table v-if="receivablesMis.daily_collection.days.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Date</th><th class="ta-r">Payments</th><th class="ta-r">Amount</th></tr></thead>
            <tbody>
              <tr v-for="r in receivablesMis.daily_collection.days" :key="r.date">
                <td>{{ r.date }}</td>
                <td class="ta-r mono-sm">{{ r.count }}</td>
                <td class="ta-r mono-sm green">{{ fmtAmt(r.amount) }}</td>
              </tr>
            </tbody>
          </table>
        </template>

        <!-- Overdue Collection -->
        <template v-else-if="receivablesTab === 'overdue'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Overdue Invoices</span><span class="mis-summary-val">{{ receivablesMis.overdue.count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Overdue Amount</span><span class="mis-summary-val red">{{ fmtAmt(receivablesMis.overdue.total) }}</span></div>
          </div>
          <table v-if="receivablesMis.overdue.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Invoice</th><th>Customer</th><th>Due Date</th><th class="ta-r">Overdue Days</th><th class="ta-r">Outstanding</th></tr></thead>
            <tbody>
              <tr v-for="r in receivablesMis.overdue.rows" :key="r.invoice">
                <td>{{ r.invoice }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td>{{ r.due_date }}</td>
                <td class="ta-r mono-sm red fw-600">{{ r.overdue_days }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.outstanding_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No overdue invoices.</div>
        </template>

        <!-- Customer Credit Limit & Utilisation -->
        <template v-else-if="receivablesTab === 'credit'">
          <table v-if="receivablesMis.credit_utilisation.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Customer</th><th class="ta-r">Credit Limit</th><th class="ta-r">Outstanding</th><th class="ta-r">Utilisation</th><th>Status</th></tr></thead>
            <tbody>
              <tr v-for="r in receivablesMis.credit_utilisation" :key="r.customer">
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm">{{ r.credit_limit ? fmtAmt(r.credit_limit) : 'No limit set' }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.outstanding_amount) }}</td>
                <td class="ta-r mono-sm" :class="r.over_limit ? 'red fw-700' : ''">{{ r.utilisation_pct != null ? r.utilisation_pct.toFixed(1) + '%' : '—' }}</td>
                <td><span class="badge" :class="r.over_limit ? 'badge-danger' : 'badge-blue'">{{ r.over_limit ? 'Over Limit' : 'OK' }}</span></td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No customers with a credit limit or outstanding balance.</div>
        </template>

        <!-- Collection Efficiency -->
        <template v-else-if="receivablesTab === 'efficiency'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Efficiency % = Collections in period ÷ (Opening Receivables + Sales in period).
          </div>
          <div class="mis-summary-grid">
            <div class="mis-summary-card"><span class="bucket-label">Opening Receivables</span><span class="mis-summary-val">{{ fmtAmt(receivablesMis.collection_efficiency.opening_receivables) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Sales in Period</span><span class="mis-summary-val">{{ fmtAmt(receivablesMis.collection_efficiency.period_sales) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Receivable Pool</span><span class="mis-summary-val">{{ fmtAmt(receivablesMis.collection_efficiency.receivable_pool) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Collected in Period</span><span class="mis-summary-val green">{{ fmtAmt(receivablesMis.collection_efficiency.period_collection) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Closing Receivables</span><span class="mis-summary-val red">{{ fmtAmt(receivablesMis.collection_efficiency.closing_receivables) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Collection Efficiency</span><span class="mis-summary-val" :class="receivablesMis.collection_efficiency.efficiency_pct>=80?'green':'red'">{{ receivablesMis.collection_efficiency.efficiency_pct.toFixed(1) }}%</span></div>
          </div>
        </template>

      </template>
      <div v-else class="empty-msg">{{receivablesRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Purchase MIS -->
    <div v-if="activeReport === 'purchase_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon pmis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18.7 16l-5.1-5.1-2.8 2.8L7 10"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Purchase MIS</div>
          <div class="bs-page-head-sub">Purchase performance broken down by summary, supplier, product, target vs actual, price variance and pending orders/receipts.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportPurchaseMisCSV" :disabled="!purchaseMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in purchaseMisTabs" :key="t.key" class="report-tab"
          :class="{ active: purchaseMisTab === t.key }" @click="purchaseMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="purchaseMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="purchaseMis">

        <!-- Purchase Summary -->
        <template v-if="purchaseMisTab === 'summary'">
          <div class="mis-summary-grid">
            <div class="mis-summary-card"><span class="bucket-label">Bills</span><span class="mis-summary-val">{{ fmtN(purchaseMis.summary.invoice_count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Net Purchases</span><span class="mis-summary-val">{{ fmtAmt(purchaseMis.summary.net_purchases) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Total Tax</span><span class="mis-summary-val">{{ fmtAmt(purchaseMis.summary.total_tax) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Discount Received</span><span class="mis-summary-val green">{{ fmtAmt(purchaseMis.summary.header_discount) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Grand Total</span><span class="mis-summary-val red">{{ fmtAmt(purchaseMis.summary.grand_total) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Qty Purchased</span><span class="mis-summary-val">{{ fmtN(purchaseMis.summary.total_qty) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Avg Bill Value</span><span class="mis-summary-val">{{ fmtAmt(purchaseMis.summary.avg_invoice_value) }}</span></div>
          </div>
        </template>

        <!-- Supplier-wise Purchase -->
        <table v-else-if="purchaseMisTab === 'supplier'" class="books-table aging-table" style="width:100%">
          <thead><tr><th>Supplier</th><th class="ta-r">Bills</th><th class="ta-r">Amount</th><th class="ta-r">Outstanding</th></tr></thead>
          <tbody>
            <tr v-for="r in purchaseMis.supplier_wise" :key="r.supplier">
              <td>{{ r.supplier_name || r.supplier }}</td>
              <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
              <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_amount) }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(r.outstanding_amount) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Product-wise Purchase -->
        <table v-else-if="purchaseMisTab === 'product'" class="books-table aging-table" style="width:100%">
          <thead><tr><th>Item</th><th>UOM</th><th class="ta-r">Bills</th><th class="ta-r">Qty Purchased</th><th class="ta-r">Discount</th><th class="ta-r">Amount</th></tr></thead>
          <tbody>
            <tr v-for="r in purchaseMis.product_wise" :key="r.item_code">
              <td>{{ r.item_name || r.item_code }}</td>
              <td>{{ r.uom || '—' }}</td>
              <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
              <td class="ta-r mono-sm">{{ fmtN(r.qty_purchased) }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(r.total_discount || 0) }}</td>
              <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_amount) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Purchase Target / Budget vs Actual -->
        <template v-else-if="purchaseMisTab === 'target'">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;flex-wrap:wrap">
            <label class="dr-label">Purchase Target / Budget (KES)</label>
            <input type="number" v-model.number="purchaseTarget" class="dr-input" style="width:160px" min="0" />
            <span style="font-size:11.5px;color:#94a3b8">No target/budget is stored — enter one to compare against actual purchases for this period.</span>
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(3,1fr)">
            <div class="mis-summary-card"><span class="bucket-label">Target / Budget</span><span class="mis-summary-val">{{ fmtAmt(purchaseTarget) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Actual</span><span class="mis-summary-val red">{{ fmtAmt(purchaseMis.summary.grand_total) }}</span></div>
            <div class="mis-summary-card">
              <span class="bucket-label">Utilisation %</span>
              <span class="mis-summary-val" :class="purchaseAchievementPct <= 100 ? 'green' : 'red'">{{ purchaseAchievementPct.toFixed(1) }}%</span>
            </div>
          </div>
          <div class="pl-row" :class="purchaseMis.summary.grand_total <= purchaseTarget ? 'profit' : 'loss'" style="margin-top:12px">
            <span>Variance (Budget − Actual)</span>
            <span class="mono">{{ fmt(purchaseTarget - purchaseMis.summary.grand_total) }}</span>
          </div>
        </template>

        <!-- Purchase Price Variance -->
        <template v-else-if="purchaseMisTab === 'price_variance'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Actual weighted-average purchase rate this period vs. the Item's Standard Buying Rate.
            <span v-if="purchaseMis.no_standard_rate_count">{{ purchaseMis.no_standard_rate_count }} item(s) below have no Standard Buying Rate set and are excluded from the % comparison.</span>
          </div>
          <table v-if="purchaseMis.price_variance.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th class="ta-r">Qty Purchased</th><th class="ta-r">Actual Rate</th><th class="ta-r">Standard Rate</th><th class="ta-r">Variance</th><th class="ta-r">Variance %</th></tr></thead>
            <tbody>
              <tr v-for="r in purchaseMis.price_variance" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.qty_purchased) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.actual_rate) }}</td>
                <td class="ta-r mono-sm">{{ r.has_standard_rate ? fmtAmt(r.standard_rate) : 'Not set' }}</td>
                <td class="ta-r mono-sm" :class="!r.has_standard_rate ? '' : (r.variance > 0 ? 'red' : 'green')">{{ r.has_standard_rate ? fmtAmt(r.variance) : '—' }}</td>
                <td class="ta-r mono-sm fw-600" :class="!r.has_standard_rate ? '' : (r.variance_pct > 0 ? 'red' : 'green')">{{ r.has_standard_rate ? r.variance_pct.toFixed(1) + '%' : '—' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No purchases in this period.</div>
        </template>

        <!-- Pending Purchase Orders -->
        <template v-else-if="purchaseMisTab === 'pending_po'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Open Orders (as of To date)</span><span class="mis-summary-val">{{ purchaseMis.pending_purchase_orders.order_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Pending (Not Yet Billed)</span><span class="mis-summary-val red">{{ fmtAmt(purchaseMis.pending_purchase_orders.pending_total) }}</span></div>
          </div>
          <table v-if="purchaseMis.pending_purchase_orders.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Purchase Order</th><th>Date</th><th>Supplier</th><th>Status</th><th class="ta-r">Order Value</th><th class="ta-r">Billed</th><th class="ta-r">Pending</th></tr></thead>
            <tbody>
              <tr v-for="r in purchaseMis.pending_purchase_orders.rows" :key="r.purchase_order">
                <td>{{ r.purchase_order }}</td>
                <td>{{ r.transaction_date }}</td>
                <td>{{ r.supplier_name || r.supplier }}</td>
                <td><span class="badge badge-blue">{{ r.status }}</span></td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.grand_total) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.billed_amount || 0) }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtAmt(r.pending_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No pending Purchase Orders as of this date.</div>
        </template>

        <!-- Pending Material Receipts -->
        <template v-else-if="purchaseMisTab === 'pending_receipts'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Orders Awaiting Receipt</span><span class="mis-summary-val">{{ purchaseMis.pending_material_receipts.order_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Pending Receipt Value</span><span class="mis-summary-val red">{{ fmtAmt(purchaseMis.pending_material_receipts.pending_value) }}</span></div>
          </div>
          <table v-if="purchaseMis.pending_material_receipts.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Purchase Order</th><th>Date</th><th>Supplier</th><th>Status</th><th class="ta-r">Ordered Qty</th><th class="ta-r">Received Qty</th><th class="ta-r">Pending Qty</th></tr></thead>
            <tbody>
              <tr v-for="r in purchaseMis.pending_material_receipts.rows" :key="r.purchase_order">
                <td>{{ r.purchase_order }}</td>
                <td>{{ r.transaction_date }}</td>
                <td>{{ r.supplier_name || r.supplier }}</td>
                <td><span class="badge badge-blue">{{ r.status }}</span></td>
                <td class="ta-r mono-sm">{{ fmtN(r.ordered_qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.received_qty || 0) }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtN(r.pending_qty) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No pending material receipts as of this date.</div>
        </template>

        <!-- Purchase Return -->
        <template v-else-if="purchaseMisTab === 'returns'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Return Count</span><span class="mis-summary-val">{{ purchaseMis.purchase_return.return_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Return Value</span><span class="mis-summary-val green">{{ fmtAmt(purchaseMis.purchase_return.return_total) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">% of Purchases</span><span class="mis-summary-val">{{ purchaseMis.purchase_return.return_pct_of_purchases.toFixed(1) }}%</span></div>
          </div>
          <table v-if="purchaseMis.purchase_return.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Debit Note</th><th>Date</th><th>Supplier</th><th>Against Bill</th><th class="ta-r">Amount</th></tr></thead>
            <tbody>
              <tr v-for="r in purchaseMis.purchase_return.rows" :key="r.debit_note">
                <td>{{ r.debit_note }}</td>
                <td>{{ r.posting_date }}</td>
                <td>{{ r.supplier_name || r.supplier }}</td>
                <td>{{ r.return_against || '—' }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.grand_total) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No purchase returns in this period.</div>
        </template>

      </template>
      <div v-else class="empty-msg">{{purchaseMisRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Inventory MIS -->
    <div v-if="activeReport === 'inventory_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon invmis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Inventory MIS</div>
          <div class="bs-page-head-sub">Current stock, valuation, movement speed, ageing, reorder points and adjustments across all warehouses.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">As of {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportInventoryMisCSV" :disabled="!inventoryMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in inventoryMisTabs" :key="t.key" class="report-tab"
          :class="{ active: inventoryMisTab === t.key }" @click="inventoryMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="inventoryMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="inventoryMis">

        <!-- Current Stock -->
        <template v-if="inventoryMisTab === 'current_stock'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Total Qty on Hand</span><span class="mis-summary-val">{{ fmtN(inventoryMis.current_stock.total_qty) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Total Stock Value</span><span class="mis-summary-val green">{{ fmtAmt(inventoryMis.current_stock.total_value) }}</span></div>
          </div>
          <table v-if="inventoryMis.current_stock.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th>Warehouse</th><th>UOM</th><th class="ta-r">Qty</th><th class="ta-r">Rate</th><th class="ta-r">Value</th></tr></thead>
            <tbody>
              <tr v-for="r in inventoryMis.current_stock.rows" :key="r.item_code+r.warehouse">
                <td>{{ r.item_name || r.item_code }}</td>
                <td>{{ r.warehouse }}</td>
                <td>{{ r.uom || '—' }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.actual_qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.valuation_rate) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.stock_value) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No stock on hand.</div>
        </template>

        <!-- Stock Value -->
        <template v-else-if="inventoryMisTab === 'stock_value'">
          <div class="pl-row net profit" style="margin-bottom:12px">
            <span>Total Stock Value (all warehouses)</span>
            <span class="mono">{{ fmt(inventoryMis.stock_value.grand_total) }}</span>
          </div>
          <table v-if="inventoryMis.stock_value.by_warehouse.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Warehouse</th><th class="ta-r">Items</th><th class="ta-r">Qty</th><th class="ta-r">Stock Value</th></tr></thead>
            <tbody>
              <tr v-for="r in inventoryMis.stock_value.by_warehouse" :key="r.warehouse">
                <td>{{ r.warehouse }}</td>
                <td class="ta-r mono-sm">{{ r.item_count }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.total_qty) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.stock_value) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No stock on hand.</div>
        </template>

        <!-- Fast Moving Items -->
        <template v-else-if="inventoryMisTab === 'fast_moving'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Ranked by quantity consumed (stock-out) between {{ fromDate }} and {{ toDate }}.
          </div>
          <table v-if="inventoryMis.fast_moving.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th class="ta-r">Qty Consumed</th><th class="ta-r">Transactions</th><th class="ta-r">Current Qty</th></tr></thead>
            <tbody>
              <tr v-for="r in inventoryMis.fast_moving" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm fw-600 green">{{ fmtN(r.qty_consumed) }}</td>
                <td class="ta-r mono-sm">{{ r.transactions }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.current_qty) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No stock-out movement in this period.</div>
        </template>

        <!-- Slow Moving Items -->
        <template v-else-if="inventoryMisTab === 'slow_moving'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            In stock, last moved 30-180 days before {{ toDate }}.
          </div>
          <table v-if="inventoryMis.slow_moving.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th class="ta-r">Qty on Hand</th><th class="ta-r">Stock Value</th><th>Last Movement</th><th class="ta-r">Days Since</th></tr></thead>
            <tbody>
              <tr v-for="r in inventoryMis.slow_moving" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.actual_qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.stock_value) }}</td>
                <td>{{ r.last_movement_date }}</td>
                <td class="ta-r mono-sm red">{{ r.days_since_movement }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No slow moving items.</div>
        </template>

        <!-- Non-moving / Dead Stock -->
        <template v-else-if="inventoryMisTab === 'dead_stock'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Dead Stock Items</span><span class="mis-summary-val">{{ inventoryMis.dead_stock.rows.length }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Value Tied Up</span><span class="mis-summary-val red">{{ fmtAmt(inventoryMis.dead_stock.total_value) }}</span></div>
          </div>
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            In stock, no stock-out movement in over 180 days before {{ toDate }} (or ever).
          </div>
          <table v-if="inventoryMis.dead_stock.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th class="ta-r">Qty on Hand</th><th class="ta-r">Stock Value</th><th>Last Movement</th><th class="ta-r">Days Since</th></tr></thead>
            <tbody>
              <tr v-for="r in inventoryMis.dead_stock.rows" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.actual_qty) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.stock_value) }}</td>
                <td>{{ r.last_movement_date || 'Never' }}</td>
                <td class="ta-r mono-sm red">{{ r.days_since_movement ?? '—' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No dead stock.</div>
        </template>

        <!-- Stock Ageing -->
        <template v-else-if="inventoryMisTab === 'ageing'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Proxy ageing: days since each item+warehouse's most recent stock-in, as of {{ toDate }}.
          </div>
          <div class="aging-buckets" style="margin-bottom:16px">
            <div class="aging-bucket"><span class="bucket-label">0-30 Days</span><span class="bucket-val mono-sm">{{ fmtAmt(inventoryMis.stock_ageing.totals.days_0_30) }}</span></div>
            <div class="aging-bucket"><span class="bucket-label">31-60 Days</span><span class="bucket-val mono-sm">{{ fmtAmt(inventoryMis.stock_ageing.totals.days_31_60) }}</span></div>
            <div class="aging-bucket"><span class="bucket-label">61-90 Days</span><span class="bucket-val mono-sm">{{ fmtAmt(inventoryMis.stock_ageing.totals.days_61_90) }}</span></div>
            <div class="aging-bucket"><span class="bucket-label">90+ Days</span><span class="bucket-val mono-sm red">{{ fmtAmt(inventoryMis.stock_ageing.totals.days_90_plus) }}</span></div>
            <div class="aging-bucket"><span class="bucket-label">Total</span><span class="bucket-val mono-sm fw-700">{{ fmtAmt(inventoryMis.stock_ageing.totals.total) }}</span></div>
          </div>
          <table v-if="inventoryMis.stock_ageing.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th>Warehouse</th><th class="ta-r">Qty</th><th class="ta-r">Value</th><th>Last Receipt</th><th class="ta-r">Age (Days)</th></tr></thead>
            <tbody>
              <tr v-for="r in inventoryMis.stock_ageing.rows" :key="r.item_code+r.warehouse">
                <td>{{ r.item_name || r.item_code }}</td>
                <td>{{ r.warehouse }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.actual_qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.stock_value) }}</td>
                <td>{{ r.last_receipt_date || 'Never' }}</td>
                <td class="ta-r mono-sm" :class="(r.age_days||0)>90?'red fw-600':''">{{ r.age_days ?? '—' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No stock on hand.</div>
        </template>

        <!-- Reorder / Low Stock -->
        <template v-else-if="inventoryMisTab === 'reorder'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(1,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Items Below Reorder Level</span><span class="mis-summary-val red">{{ inventoryMis.reorder_low_stock.item_count }}</span></div>
          </div>
          <table v-if="inventoryMis.reorder_low_stock.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th>Warehouse</th><th class="ta-r">Qty on Hand</th><th class="ta-r">Reorder Level</th><th class="ta-r">Reorder Qty</th><th class="ta-r">Shortage</th></tr></thead>
            <tbody>
              <tr v-for="r in inventoryMis.reorder_low_stock.rows" :key="r.item_code+r.warehouse">
                <td>{{ r.item_name || r.item_code }}</td>
                <td>{{ r.warehouse }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtN(r.actual_qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.reorder_level) }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.reorder_qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.shortage_qty) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No items below reorder level.</div>
        </template>

        <!-- Excess Stock -->
        <template v-else-if="inventoryMisTab === 'excess'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            No Max Stock Level is stored — approximated from days-of-cover (qty ÷ trailing 90-day avg daily consumption); flagged when cover exceeds 180 days.
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(1,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Excess Stock Value</span><span class="mis-summary-val red">{{ fmtAmt(inventoryMis.excess_stock.total_value) }}</span></div>
          </div>
          <table v-if="inventoryMis.excess_stock.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th class="ta-r">Qty on Hand</th><th class="ta-r">Avg Daily Use</th><th class="ta-r">Days of Cover</th><th class="ta-r">Excess Qty</th><th class="ta-r">Excess Value</th></tr></thead>
            <tbody>
              <tr v-for="r in inventoryMis.excess_stock.rows" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.actual_qty) }}</td>
                <td class="ta-r mono-sm">{{ r.avg_daily_consumption }}</td>
                <td class="ta-r mono-sm red">{{ r.days_of_cover }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.excess_qty) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.excess_value) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No excess stock identified.</div>
        </template>

        <!-- Stock Adjustment -->
        <template v-else-if="inventoryMisTab === 'adjustment'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Adjustments</span><span class="mis-summary-val">{{ inventoryMis.stock_adjustment.entry_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Increase Value</span><span class="mis-summary-val green">{{ fmtAmt(inventoryMis.stock_adjustment.increase_value) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Decrease Value</span><span class="mis-summary-val red">{{ fmtAmt(inventoryMis.stock_adjustment.decrease_value) }}</span></div>
          </div>
          <table v-if="inventoryMis.stock_adjustment.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Stock Entry</th><th>Date</th><th>Item</th><th>Warehouse</th><th class="ta-r">Qty</th><th class="ta-r">Value</th><th>Reason</th></tr></thead>
            <tbody>
              <tr v-for="r in inventoryMis.stock_adjustment.rows" :key="r.stock_entry+r.item_code">
                <td>{{ r.stock_entry }}</td>
                <td>{{ r.posting_date }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td>{{ r.warehouse }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.qty >= 0 ? 'green' : 'red'">{{ fmtN(r.qty) }}</td>
                <td class="ta-r mono-sm" :class="r.value >= 0 ? '' : 'red'">{{ fmtAmt(r.value) }}</td>
                <td>{{ r.reason || '—' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No stock adjustments in this period.</div>
        </template>

        <!-- Stock Loss / Shortage -->
        <template v-else-if="inventoryMisTab === 'loss'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Loss Entries</span><span class="mis-summary-val">{{ inventoryMis.stock_loss.loss_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Value Lost</span><span class="mis-summary-val red">{{ fmtAmt(inventoryMis.stock_loss.loss_value) }}</span></div>
          </div>
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Scoped to negative-qty Stock Adjustment entries (physical-count shortfalls). Manufacturing Variance Loss is tracked separately on Work Orders.
          </div>
          <table v-if="inventoryMis.stock_loss.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Stock Entry</th><th>Date</th><th>Item</th><th>Warehouse</th><th class="ta-r">Qty Lost</th><th class="ta-r">Value Lost</th><th>Reason</th></tr></thead>
            <tbody>
              <tr v-for="r in inventoryMis.stock_loss.rows" :key="r.stock_entry+r.item_code">
                <td>{{ r.stock_entry }}</td>
                <td>{{ r.posting_date }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td>{{ r.warehouse }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtN(r.qty) }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.value) }}</td>
                <td>{{ r.reason || '—' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No stock loss/shortage in this period.</div>
        </template>

      </template>
      <div v-else class="empty-msg">{{inventoryMisRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Production MIS -->
    <div v-if="activeReport === 'production_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon prodmis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Production MIS</div>
          <div class="bs-page-head-sub">Production plan vs actual, WIP status, material availability and consumption, cost, efficiency and rejection/scrap for work orders.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportProductionMisCSV" :disabled="!productionMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in productionMisTabs" :key="t.key" class="report-tab"
          :class="{ active: productionMisTab === t.key }" @click="productionMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="productionMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="productionMis">

        <!-- Production Plan vs Actual -->
        <template v-if="productionMisTab === 'plan_vs_actual'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Planned Qty</span><span class="mis-summary-val">{{ fmtN(productionMis.plan_vs_actual.totals.planned_qty) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Produced Qty</span><span class="mis-summary-val green">{{ fmtN(productionMis.plan_vs_actual.totals.produced_qty) }}</span></div>
          </div>
          <table v-if="productionMis.plan_vs_actual.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Production Plan</th><th>Date</th><th>Item</th><th class="ta-r">Planned Qty</th><th class="ta-r">Produced Qty</th><th class="ta-r">Variance</th><th class="ta-r">Variance %</th></tr></thead>
            <tbody>
              <tr v-for="r in productionMis.plan_vs_actual.rows" :key="r.production_plan+r.item_code">
                <td>{{ r.production_plan }}</td>
                <td>{{ r.posting_date }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.planned_qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.produced_qty) }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.variance_qty >= 0 ? 'green' : 'red'">{{ fmtN(r.variance_qty) }}</td>
                <td class="ta-r mono-sm">{{ r.variance_pct != null ? r.variance_pct + '%' : '—' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No production plans posted in this period.</div>
        </template>

        <!-- Production Pending -->
        <template v-else-if="productionMisTab === 'pending'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Live snapshot of open Work Orders (not reconstructed as of {{ toDate }}).
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Pending Qty</span><span class="mis-summary-val red">{{ fmtN(productionMis.production_pending.pending_qty_total) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Overdue Work Orders</span><span class="mis-summary-val red">{{ productionMis.production_pending.overdue_count }}</span></div>
          </div>
          <table v-if="productionMis.production_pending.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Work Order</th><th>Item</th><th>Status</th><th class="ta-r">Qty</th><th class="ta-r">Produced</th><th class="ta-r">Pending</th><th>Planned End</th></tr></thead>
            <tbody>
              <tr v-for="r in productionMis.production_pending.rows" :key="r.work_order">
                <td>{{ r.work_order }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td>{{ r.status }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.produced_qty) }}</td>
                <td class="ta-r mono-sm fw-600 red">{{ fmtN(r.pending_qty) }}</td>
                <td :class="r.overdue ? 'red fw-600' : ''">{{ r.planned_end_date || '—' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No pending production.</div>
        </template>

        <!-- WIP Status -->
        <template v-else-if="productionMisTab === 'wip'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Work Orders In Process</span><span class="mis-summary-val">{{ productionMis.wip_status.wo_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">WIP Stock Value</span><span class="mis-summary-val">{{ fmtAmt(productionMis.wip_status.wip_value_total) }}</span></div>
          </div>
          <table v-if="productionMis.wip_status.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Work Order</th><th>Item</th><th class="ta-r">Qty</th><th class="ta-r">Produced</th><th class="ta-r">% Complete</th><th>WIP Warehouse</th><th class="ta-r">WIP Value</th></tr></thead>
            <tbody>
              <tr v-for="r in productionMis.wip_status.rows" :key="r.work_order">
                <td>{{ r.work_order }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.produced_qty) }}</td>
                <td class="ta-r mono-sm">{{ r.pct_complete }}%</td>
                <td>{{ r.wip_warehouse || '—' }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.wip_stock_value) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No Work Orders in process.</div>
        </template>

        <!-- Raw Material Availability -->
        <template v-else-if="productionMisTab === 'material_availability'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Live shortage check: still-to-issue qty on open Work Orders vs current stock at the source warehouse.
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(1,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Items Short</span><span class="mis-summary-val red">{{ productionMis.raw_material_availability.shortage_count }}</span></div>
          </div>
          <table v-if="productionMis.raw_material_availability.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Work Order</th><th>Item</th><th>Warehouse</th><th class="ta-r">Still to Issue</th><th class="ta-r">Available</th><th class="ta-r">Shortage</th></tr></thead>
            <tbody>
              <tr v-for="r in productionMis.raw_material_availability.rows" :key="r.work_order+r.item_code">
                <td>{{ r.work_order }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td>{{ r.warehouse }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.still_to_issue) }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.available_qty) }}</td>
                <td class="ta-r mono-sm fw-600 red">{{ fmtN(r.shortage_qty) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No material shortages against open Work Orders.</div>
        </template>

        <!-- Material Consumption -->
        <template v-else-if="productionMisTab === 'material_consumption'">
          <div class="pl-row net profit" style="margin-bottom:12px">
            <span>Total Material Consumed</span>
            <span class="mono">{{ fmt(productionMis.material_consumption.total_value) }}</span>
          </div>
          <table v-if="productionMis.material_consumption.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th class="ta-r">Qty Consumed</th><th class="ta-r">Transactions</th><th class="ta-r">Value Consumed</th></tr></thead>
            <tbody>
              <tr v-for="r in productionMis.material_consumption.rows" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.qty_consumed) }}</td>
                <td class="ta-r mono-sm">{{ r.transactions }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.value_consumed) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No material consumed against Work Orders in this period.</div>
        </template>

        <!-- Material Variance -->
        <template v-else-if="productionMisTab === 'material_variance'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(1,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Net Variance Value</span><span class="mis-summary-val" :class="productionMis.material_variance.net_variance_value >= 0 ? 'red' : 'green'">{{ fmtAmt(productionMis.material_variance.net_variance_value) }}</span></div>
          </div>
          <table v-if="productionMis.material_variance.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Work Order</th><th>Item</th><th class="ta-r">Required Qty</th><th class="ta-r">Consumed Qty</th><th class="ta-r">Variance Qty</th><th class="ta-r">Variance Value</th></tr></thead>
            <tbody>
              <tr v-for="r in productionMis.material_variance.rows" :key="r.work_order+r.item_code">
                <td>{{ r.work_order }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.required_qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.consumed_qty) }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.variance_qty > 0 ? 'red' : 'green'">{{ fmtN(r.variance_qty) }}</td>
                <td class="ta-r mono-sm" :class="r.variance_value > 0 ? 'red' : 'green'">{{ fmtAmt(r.variance_value) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No material variance in this period.</div>
        </template>

        <!-- Production Cost -->
        <template v-else-if="productionMisTab === 'production_cost'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Material Value</span><span class="mis-summary-val">{{ fmtAmt(productionMis.production_cost.total_material_value) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Operating Cost</span><span class="mis-summary-val">{{ fmtAmt(productionMis.production_cost.total_operating_cost) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Total Production Cost</span><span class="mis-summary-val fw-700">{{ fmtAmt(productionMis.production_cost.total_cost) }}</span></div>
          </div>
          <table v-if="productionMis.production_cost.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Work Order</th><th>Item</th><th class="ta-r">Produced</th><th class="ta-r">Material</th><th class="ta-r">Op. Cost</th><th class="ta-r">Total</th><th class="ta-r">Cost/Unit</th><th class="ta-r">Standard/Unit</th></tr></thead>
            <tbody>
              <tr v-for="r in productionMis.production_cost.rows" :key="r.work_order">
                <td>{{ r.work_order }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.produced_qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.material_value) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.operating_cost) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.actual_total_cost) }}</td>
                <td class="ta-r mono-sm">{{ r.actual_cost_per_unit != null ? fmtAmt(r.actual_cost_per_unit) : '—' }}</td>
                <td class="ta-r mono-sm" :class="r.cost_variance_per_unit > 0 ? 'red' : (r.cost_variance_per_unit < 0 ? 'green' : '')">{{ r.standard_cost_per_unit != null ? fmtAmt(r.standard_cost_per_unit) : '—' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No production cost recorded in this period.</div>
        </template>

        <!-- Production Efficiency -->
        <template v-else-if="productionMisTab === 'efficiency'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(1,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Avg Efficiency</span><span class="mis-summary-val">{{ productionMis.production_efficiency.avg_efficiency_pct != null ? productionMis.production_efficiency.avg_efficiency_pct + '%' : '—' }}</span></div>
          </div>
          <table v-if="productionMis.production_efficiency.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Work Order</th><th>Item</th><th>Status</th><th class="ta-r">Planned (min)</th><th class="ta-r">Actual (min)</th><th class="ta-r">Efficiency %</th></tr></thead>
            <tbody>
              <tr v-for="r in productionMis.production_efficiency.rows" :key="r.work_order">
                <td>{{ r.work_order }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td>{{ r.status }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.planned_mins) }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.actual_mins) }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.efficiency_pct >= 100 ? 'green' : 'red'">{{ r.efficiency_pct }}%</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No operation time logged for Work Orders scheduled in this period.</div>
        </template>

        <!-- Rejection / Rework -->
        <template v-else-if="productionMisTab === 'rejection'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Job Card scrap items not flagged as process loss — defective pieces that may be reworked.
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Rejected Qty</span><span class="mis-summary-val red">{{ fmtN(productionMis.rejection_rework.qty_total) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Value</span><span class="mis-summary-val red">{{ fmtAmt(productionMis.rejection_rework.value_total) }}</span></div>
          </div>
          <table v-if="productionMis.rejection_rework.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Job Card</th><th>Work Order</th><th>Operation</th><th>Item</th><th class="ta-r">Qty</th><th class="ta-r">Value</th></tr></thead>
            <tbody>
              <tr v-for="r in productionMis.rejection_rework.rows" :key="r.job_card+r.item_code">
                <td>{{ r.job_card }}</td>
                <td>{{ r.work_order }}</td>
                <td>{{ r.operation }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtN(r.qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No rejection/rework recorded in this period.</div>
        </template>

        <!-- Scrap / Wastage -->
        <template v-else-if="productionMisTab === 'scrap'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Scrap output rows on Manufacture stock entries, plus process/yield loss recorded on those entries.
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Scrap Value</span><span class="mis-summary-val red">{{ fmtAmt(productionMis.scrap_wastage.scrap_value_total) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Process Loss Qty</span><span class="mis-summary-val red">{{ fmtN(productionMis.scrap_wastage.process_loss_qty_total) }}</span></div>
          </div>
          <table v-if="productionMis.scrap_wastage.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Stock Entry</th><th>Work Order</th><th>Item</th><th class="ta-r">Qty</th><th class="ta-r">Value</th></tr></thead>
            <tbody>
              <tr v-for="r in productionMis.scrap_wastage.rows" :key="r.stock_entry+r.item_code">
                <td>{{ r.stock_entry }}</td>
                <td>{{ r.work_order || '—' }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtN(r.qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No scrap output recorded in this period.</div>
        </template>

      </template>
      <div v-else class="empty-msg">{{productionMisRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Product MIS -->
    <div v-if="activeReport === 'product_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon prdmis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Product MIS</div>
          <div class="bs-page-head-sub">Product-wise sales, profit, cost, margin, production, stock and wastage, plus top and low selling products for the period.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportProductMisCSV" :disabled="!productMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in productMisTabs" :key="t.key" class="report-tab"
          :class="{ active: productMisTab === t.key }" @click="productMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="productMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="productMis">

        <!-- Product-wise Sales -->
        <template v-if="productMisTab === 'sales'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Qty Sold</span><span class="mis-summary-val">{{ fmtN(productMis.product_wise_sales.totals.qty_sold) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Total Revenue</span><span class="mis-summary-val green">{{ fmtAmt(productMis.product_wise_sales.totals.total_amount) }}</span></div>
          </div>
          <table v-if="productMis.product_wise_sales.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th>UOM</th><th class="ta-r">Invoices</th><th class="ta-r">Qty Sold</th><th class="ta-r">Avg Rate</th><th class="ta-r">Revenue</th></tr></thead>
            <tbody>
              <tr v-for="r in productMis.product_wise_sales.rows" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td>{{ r.uom || '—' }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.qty_sold) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.avg_rate) }}</td>
                <td class="ta-r mono-sm fw-600 green">{{ fmtAmt(r.total_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No sales in this period.</div>
        </template>

        <!-- Product-wise Profit -->
        <template v-else-if="productMisTab === 'profit'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Revenue</span><span class="mis-summary-val">{{ fmtAmt(productMis.product_wise_profit.totals.revenue) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Cost</span><span class="mis-summary-val">{{ fmtAmt(productMis.product_wise_profit.totals.total_cost) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Profit</span><span class="mis-summary-val" :class="productMis.product_wise_profit.totals.profit >= 0 ? 'green' : 'red'">{{ fmtAmt(productMis.product_wise_profit.totals.profit) }}</span></div>
          </div>
          <table v-if="productMis.product_wise_profit.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th class="ta-r">Revenue</th><th class="ta-r">Cost</th><th class="ta-r">Profit</th><th class="ta-r">Margin %</th></tr></thead>
            <tbody>
              <tr v-for="r in productMis.product_wise_profit.rows" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.revenue) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.total_cost) }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.profit >= 0 ? 'green' : 'red'">{{ fmtAmt(r.profit) }}</td>
                <td class="ta-r mono-sm">{{ r.margin_pct }}%</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No sales in this period.</div>
        </template>

        <!-- Product-wise Cost -->
        <template v-else-if="productMisTab === 'cost'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Cost rate is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate.
          </div>
          <table v-if="productMis.product_wise_cost.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th class="ta-r">Qty Sold</th><th class="ta-r">Cost Rate</th><th class="ta-r">Total Cost</th></tr></thead>
            <tbody>
              <tr v-for="r in productMis.product_wise_cost.rows" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.qty_sold) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.cost_rate) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_cost) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No sales in this period.</div>
        </template>

        <!-- Product-wise Margin % -->
        <template v-else-if="productMisTab === 'margin'">
          <table v-if="productMis.product_wise_margin.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th class="ta-r">Revenue</th><th class="ta-r">Cost</th><th class="ta-r">Margin %</th></tr></thead>
            <tbody>
              <tr v-for="r in productMis.product_wise_margin.rows" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.revenue) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.total_cost) }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.margin_pct >= 0 ? 'green' : 'red'">{{ r.margin_pct }}%</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No sales in this period.</div>
        </template>

        <!-- Product-wise Production -->
        <template v-else-if="productMisTab === 'production'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Finished-goods receipts on Manufacture stock entries posted between {{ fromDate }} and {{ toDate }}.
          </div>
          <table v-if="productMis.product_wise_production.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th class="ta-r">Qty Produced</th><th class="ta-r">Value Produced</th><th class="ta-r">Transactions</th></tr></thead>
            <tbody>
              <tr v-for="r in productMis.product_wise_production.rows" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm fw-600 green">{{ fmtN(r.qty_produced) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.value_produced) }}</td>
                <td class="ta-r mono-sm">{{ r.transactions }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No production recorded in this period.</div>
        </template>

        <!-- Product-wise Stock -->
        <template v-else-if="productMisTab === 'stock'">
          <table v-if="productMis.product_wise_stock.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th>UOM</th><th class="ta-r">Qty on Hand</th><th class="ta-r">Rate</th><th class="ta-r">Stock Value</th></tr></thead>
            <tbody>
              <tr v-for="r in productMis.product_wise_stock.rows" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td>{{ r.uom || '—' }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.total_qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.valuation_rate) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_value) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No stock on hand.</div>
        </template>

        <!-- Product-wise Wastage -->
        <template v-else-if="productMisTab === 'wastage'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Scrap-flagged rows on Manufacture stock entries posted between {{ fromDate }} and {{ toDate }}.
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(2,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Qty Scrapped</span><span class="mis-summary-val red">{{ fmtN(productMis.product_wise_wastage.totals.qty_scrapped) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Value Scrapped</span><span class="mis-summary-val red">{{ fmtAmt(productMis.product_wise_wastage.totals.value_scrapped) }}</span></div>
          </div>
          <table v-if="productMis.product_wise_wastage.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th class="ta-r">Qty Scrapped</th><th class="ta-r">Value Scrapped</th><th class="ta-r">Transactions</th></tr></thead>
            <tbody>
              <tr v-for="r in productMis.product_wise_wastage.rows" :key="r.item_code">
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtN(r.qty_scrapped) }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.value_scrapped) }}</td>
                <td class="ta-r mono-sm">{{ r.transactions }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No wastage recorded in this period.</div>
        </template>

        <!-- Top Selling Products -->
        <template v-else-if="productMisTab === 'top_selling'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">Top 10 items by quantity sold in this period.</div>
          <table v-if="productMis.top_selling.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>#</th><th>Item</th><th class="ta-r">Qty Sold</th><th class="ta-r">Revenue</th></tr></thead>
            <tbody>
              <tr v-for="(r,idx) in productMis.top_selling.rows" :key="r.item_code">
                <td>{{ idx+1 }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm fw-600 green">{{ fmtN(r.qty_sold) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.total_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No sales in this period.</div>
        </template>

        <!-- Low Selling Products -->
        <template v-else-if="productMisTab === 'low_selling'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">Bottom 10 items by quantity sold in this period (items with at least one sale).</div>
          <table v-if="productMis.low_selling.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>#</th><th>Item</th><th class="ta-r">Qty Sold</th><th class="ta-r">Revenue</th></tr></thead>
            <tbody>
              <tr v-for="(r,idx) in productMis.low_selling.rows" :key="r.item_code">
                <td>{{ idx+1 }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtN(r.qty_sold) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.total_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No sales in this period.</div>
        </template>

      </template>
      <div v-else class="empty-msg">{{productMisRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Dispatch & Delivery MIS -->
    <div v-if="activeReport === 'dispatch_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon dmis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Dispatch & Delivery MIS</div>
          <div class="bs-page-head-sub">Dispatch summary, pending and delayed deliveries, customer-wise pending delivery and transport-wise dispatch for the period.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportDispatchMisCSV" :disabled="!dispatchMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in dispatchMisTabs" :key="t.key" class="report-tab"
          :class="{ active: dispatchMisTab === t.key }" @click="dispatchMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="dispatchMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="dispatchMis">

        <!-- Dispatch Summary -->
        <template v-if="dispatchMisTab === 'summary'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Delivery Notes posted between {{ fromDate }} and {{ toDate }}.
          </div>
          <div class="mis-summary-grid">
            <div class="mis-summary-card"><span class="bucket-label">Dispatches</span><span class="mis-summary-val">{{ fmtN(dispatchMis.dispatch_summary.dispatch_count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Total Qty Dispatched</span><span class="mis-summary-val green">{{ fmtN(dispatchMis.dispatch_summary.total_qty) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Total Value</span><span class="mis-summary-val">{{ fmtAmt(dispatchMis.dispatch_summary.total_value) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Customers Served</span><span class="mis-summary-val">{{ fmtN(dispatchMis.dispatch_summary.customer_count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Transporters Used</span><span class="mis-summary-val">{{ fmtN(dispatchMis.dispatch_summary.transporter_count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Avg Qty / Dispatch</span><span class="mis-summary-val">{{ fmtN(dispatchMis.dispatch_summary.avg_qty_per_dispatch) }}</span></div>
          </div>
        </template>

        <!-- Pending Dispatch -->
        <template v-else-if="dispatchMisTab === 'pending_dispatch'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Sales Order lines with nothing dispatched yet, as of {{ toDate }}.
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Orders</span><span class="mis-summary-val">{{ dispatchMis.pending_dispatch.order_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Pending Qty</span><span class="mis-summary-val red">{{ fmtN(dispatchMis.pending_dispatch.pending_qty) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Pending Value</span><span class="mis-summary-val red">{{ fmtAmt(dispatchMis.pending_dispatch.pending_value) }}</span></div>
          </div>
          <table v-if="dispatchMis.pending_dispatch.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Order Date</th><th>Customer</th><th>Item</th><th class="ta-r">Ordered Qty</th><th class="ta-r">Pending Qty</th><th class="ta-r">Pending Value</th></tr></thead>
            <tbody>
              <tr v-for="(r,idx) in dispatchMis.pending_dispatch.rows" :key="r.sales_order + '_' + r.item_code + '_' + idx">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.order_date }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.ordered_qty) }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtN(r.pending_qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.pending_value) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No pending dispatch as of this date.</div>
        </template>

        <!-- Delivery Pending -->
        <template v-else-if="dispatchMisTab === 'delivery_pending'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            All undelivered Sales Order quantity as of {{ toDate }}, including partially dispatched lines.
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Orders</span><span class="mis-summary-val">{{ dispatchMis.delivery_pending.order_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Pending Qty</span><span class="mis-summary-val red">{{ fmtN(dispatchMis.delivery_pending.pending_qty) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Pending Value</span><span class="mis-summary-val red">{{ fmtAmt(dispatchMis.delivery_pending.pending_value) }}</span></div>
          </div>
          <table v-if="dispatchMis.delivery_pending.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Delivery Date</th><th>Customer</th><th>Item</th><th class="ta-r">Ordered Qty</th><th class="ta-r">Dispatched Qty</th><th class="ta-r">Pending Qty</th></tr></thead>
            <tbody>
              <tr v-for="(r,idx) in dispatchMis.delivery_pending.rows" :key="r.sales_order + '_' + r.item_code + '_' + idx">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.delivery_date || '—' }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.ordered_qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.delivered_qty) }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtN(r.pending_qty) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No pending deliveries as of this date.</div>
        </template>

        <!-- Delayed Delivery -->
        <template v-else-if="dispatchMisTab === 'delayed_delivery'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Delivery Pending lines whose Delivery Date has already passed.
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Delayed Orders</span><span class="mis-summary-val red">{{ dispatchMis.delayed_delivery.order_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Pending Qty</span><span class="mis-summary-val red">{{ fmtN(dispatchMis.delayed_delivery.pending_qty) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Pending Value</span><span class="mis-summary-val red">{{ fmtAmt(dispatchMis.delayed_delivery.pending_value) }}</span></div>
          </div>
          <table v-if="dispatchMis.delayed_delivery.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Delivery Date</th><th>Days Overdue</th><th>Customer</th><th>Item</th><th class="ta-r">Pending Qty</th><th class="ta-r">Pending Value</th></tr></thead>
            <tbody>
              <tr v-for="(r,idx) in dispatchMis.delayed_delivery.rows" :key="r.sales_order + '_' + r.item_code + '_' + idx">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.delivery_date }}</td>
                <td class="red fw-600">{{ r.days_overdue }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtN(r.pending_qty) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.pending_value) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No delayed deliveries as of today.</div>
        </template>

        <!-- Customer-wise Pending Delivery -->
        <template v-else-if="dispatchMisTab === 'customer_pending'">
          <table v-if="dispatchMis.customer_wise_pending_delivery.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Customer</th><th class="ta-r">Orders</th><th class="ta-r">Pending Qty</th><th class="ta-r">Pending Value</th></tr></thead>
            <tbody>
              <tr v-for="r in dispatchMis.customer_wise_pending_delivery.rows" :key="r.customer">
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm">{{ r.order_count }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.pending_qty) }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtAmt(r.pending_value) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No pending deliveries as of this date.</div>
        </template>

        <!-- Transport-wise Dispatch -->
        <template v-else-if="dispatchMisTab === 'transport_wise'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Delivery Notes posted between {{ fromDate }} and {{ toDate }}, grouped by Transporter.
          </div>
          <table v-if="dispatchMis.transport_wise_dispatch.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Transporter</th><th class="ta-r">Dispatches</th><th class="ta-r">Customers</th><th class="ta-r">Total Qty</th><th class="ta-r">Total Value</th></tr></thead>
            <tbody>
              <tr v-for="r in dispatchMis.transport_wise_dispatch.rows" :key="r.transporter_name">
                <td>{{ r.transporter_name }}</td>
                <td class="ta-r mono-sm">{{ r.dispatch_count }}</td>
                <td class="ta-r mono-sm">{{ r.customer_count }}</td>
                <td class="ta-r mono-sm">{{ fmtN(r.total_qty) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_value) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No dispatches in this period.</div>
        </template>

      </template>
      <div v-else class="empty-msg">{{dispatchMisRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Order MIS -->
    <div v-if="activeReport === 'order_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon omis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Order MIS</div>
          <div class="bs-page-head-sub">Sales order pipeline — new, pending, under production, ready for dispatch, delayed, delivered, cancelled and order-wise profitability.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportOrderMisCSV" :disabled="!orderMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in orderMisTabs" :key="t.key" class="report-tab"
          :class="{ active: orderMisTab === t.key }" @click="orderMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="orderMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="orderMis">

        <!-- Summary (Total / New / Pending / Under Production / Ready / Delayed / Delivered / Cancelled) -->
        <template v-if="orderMisTab === 'summary'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Sales Orders placed between {{ fromDate }} and {{ toDate }}. Under Production / Ready for Dispatch are derived from linked Work Orders; Delayed is based on today's date.
          </div>
          <div class="mis-summary-grid">
            <div class="mis-summary-card"><span class="bucket-label">Total Orders</span><span class="mis-summary-val">{{ fmtN(orderMis.summary.total_orders.count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">New Orders</span><span class="mis-summary-val">{{ fmtN(orderMis.summary.new_orders.count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Pending Orders</span><span class="mis-summary-val">{{ fmtN(orderMis.summary.pending_orders.count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Under Production</span><span class="mis-summary-val">{{ fmtN(orderMis.summary.under_production.count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Ready for Dispatch</span><span class="mis-summary-val green">{{ fmtN(orderMis.summary.ready_for_dispatch.count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Delayed Orders</span><span class="mis-summary-val red">{{ fmtN(orderMis.summary.delayed_orders.count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Delivered Orders</span><span class="mis-summary-val green">{{ fmtN(orderMis.summary.delivered_orders.count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Cancelled Orders</span><span class="mis-summary-val red">{{ fmtN(orderMis.summary.cancelled_orders.count) }}</span></div>
          </div>
        </template>

        <!-- Total Orders -->
        <template v-else-if="orderMisTab === 'total'">
          <table v-if="orderMis.summary.total_orders.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Order Date</th><th>Delivery Date</th><th>Customer</th><th>Status</th><th class="ta-r">Order Value</th></tr></thead>
            <tbody>
              <tr v-for="r in orderMis.summary.total_orders.rows" :key="r.sales_order">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.order_date }}</td>
                <td>{{ r.delivery_date || '—' }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td><span class="badge badge-blue">{{ r.status }}</span></td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.grand_total) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No orders in this period.</div>
        </template>

        <!-- New Orders -->
        <template v-else-if="orderMisTab === 'new'">
          <table v-if="orderMis.summary.new_orders.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Order Date</th><th>Customer</th><th class="ta-r">Order Value</th></tr></thead>
            <tbody>
              <tr v-for="r in orderMis.summary.new_orders.rows" :key="r.sales_order">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.order_date }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.grand_total) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No new (unconfirmed) orders in this period.</div>
        </template>

        <!-- Pending Orders -->
        <template v-else-if="orderMisTab === 'pending'">
          <table v-if="orderMis.summary.pending_orders.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Order Date</th><th>Delivery Date</th><th>Customer</th><th>Status</th><th class="ta-r">Order Value</th></tr></thead>
            <tbody>
              <tr v-for="r in orderMis.summary.pending_orders.rows" :key="r.sales_order">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.order_date }}</td>
                <td>{{ r.delivery_date || '—' }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td><span class="badge badge-blue">{{ r.status }}</span></td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.grand_total) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No pending orders in this period.</div>
        </template>

        <!-- Orders Under Production -->
        <template v-else-if="orderMisTab === 'under_production'">
          <table v-if="orderMis.summary.under_production.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Order Date</th><th>Customer</th><th>Work Order Status</th><th class="ta-r">Order Value</th></tr></thead>
            <tbody>
              <tr v-for="r in orderMis.summary.under_production.rows" :key="r.sales_order">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.order_date }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td>{{ r.wo_statuses.join(', ') }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.grand_total) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No orders currently under production.</div>
        </template>

        <!-- Orders Ready for Dispatch -->
        <template v-else-if="orderMisTab === 'ready_for_dispatch'">
          <table v-if="orderMis.summary.ready_for_dispatch.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Order Date</th><th>Customer</th><th class="ta-r">Order Value</th></tr></thead>
            <tbody>
              <tr v-for="r in orderMis.summary.ready_for_dispatch.rows" :key="r.sales_order">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.order_date }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm fw-600 green">{{ fmtAmt(r.grand_total) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No orders ready for dispatch.</div>
        </template>

        <!-- Delayed Orders -->
        <template v-else-if="orderMisTab === 'delayed'">
          <table v-if="orderMis.summary.delayed_orders.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Delivery Date</th><th>Days Overdue</th><th>Customer</th><th>Status</th><th class="ta-r">Order Value</th></tr></thead>
            <tbody>
              <tr v-for="r in orderMis.summary.delayed_orders.rows" :key="r.sales_order">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.delivery_date }}</td>
                <td class="red fw-600">{{ r.days_overdue }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td><span class="badge badge-blue">{{ r.status }}</span></td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.grand_total) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No delayed orders as of today.</div>
        </template>

        <!-- Delivered Orders -->
        <template v-else-if="orderMisTab === 'delivered'">
          <table v-if="orderMis.summary.delivered_orders.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Order Date</th><th>Customer</th><th>Status</th><th class="ta-r">Order Value</th></tr></thead>
            <tbody>
              <tr v-for="r in orderMis.summary.delivered_orders.rows" :key="r.sales_order">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.order_date }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td><span class="badge badge-blue">{{ r.status }}</span></td>
                <td class="ta-r mono-sm fw-600 green">{{ fmtAmt(r.grand_total) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No delivered orders in this period.</div>
        </template>

        <!-- Cancelled Orders -->
        <template v-else-if="orderMisTab === 'cancelled'">
          <table v-if="orderMis.summary.cancelled_orders.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Order Date</th><th>Customer</th><th class="ta-r">Order Value</th></tr></thead>
            <tbody>
              <tr v-for="r in orderMis.summary.cancelled_orders.rows" :key="r.sales_order">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.order_date }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm red fw-600">{{ fmtAmt(r.grand_total) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No cancelled orders in this period.</div>
        </template>

        <!-- Order Value -->
        <template v-else-if="orderMisTab === 'order_value'">
          <div class="mis-summary-grid" style="grid-template-columns:repeat(1,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Total Order Value</span><span class="mis-summary-val">{{ fmtAmt(orderMis.order_value.total_value) }}</span></div>
          </div>
          <table v-if="orderMis.order_value.by_status.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Status</th><th class="ta-r">Orders</th><th class="ta-r">Value</th></tr></thead>
            <tbody>
              <tr v-for="r in orderMis.order_value.by_status" :key="r.status">
                <td><span class="badge badge-blue">{{ r.status }}</span></td>
                <td class="ta-r mono-sm">{{ r.order_count }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_value) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No orders in this period.</div>
        </template>

        <!-- Order-wise Profitability -->
        <template v-else-if="orderMisTab === 'profitability'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Cost rate is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate — applied to Sales Order lines whether or not the order has been invoiced yet.
          </div>
          <div class="mis-summary-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px">
            <div class="mis-summary-card"><span class="bucket-label">Revenue</span><span class="mis-summary-val">{{ fmtAmt(orderMis.order_profitability.totals.revenue) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Cost</span><span class="mis-summary-val">{{ fmtAmt(orderMis.order_profitability.totals.total_cost) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Profit</span><span class="mis-summary-val" :class="orderMis.order_profitability.totals.profit >= 0 ? 'green' : 'red'">{{ fmtAmt(orderMis.order_profitability.totals.profit) }}</span></div>
          </div>
          <table v-if="orderMis.order_profitability.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Date</th><th>Customer</th><th class="ta-r">Revenue</th><th class="ta-r">Cost</th><th class="ta-r">Profit</th><th class="ta-r">Margin %</th></tr></thead>
            <tbody>
              <tr v-for="r in orderMis.order_profitability.rows" :key="r.sales_order">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.order_date }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.revenue) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.total_cost) }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.profit >= 0 ? 'green' : 'red'">{{ fmtAmt(r.profit) }}</td>
                <td class="ta-r mono-sm">{{ r.margin_pct }}%</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No orders in this period.</div>
        </template>

      </template>
      <div v-else class="empty-msg">{{orderMisRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Profitability MIS -->
    <div v-if="activeReport === 'profitability_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon pfmis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Profitability MIS</div>
          <div class="bs-page-head-sub">Gross profit and margin by product, customer, order, branch and salesperson, plus the monthly profit trend. Excludes sales returns; cost is current average valuation, falling back to Standard Buying Rate.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportProfitabilityMisCSV" :disabled="!profitabilityMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in profitabilityMisTabs" :key="t.key" class="report-tab"
          :class="{ active: profitabilityMisTab === t.key }" @click="profitabilityMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="profitabilityMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="profitabilityMis">

        <!-- Summary (Gross Sales / Net Sales / Gross Profit / Gross Margin %) -->
        <template v-if="profitabilityMisTab === 'summary'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Excludes Sales Returns. Cost is the current average valuation rate (sellable warehouses), falling back to Standard Buying Rate.
          </div>
          <div class="mis-summary-grid">
            <div class="mis-summary-card"><span class="bucket-label">Gross Sales</span><span class="mis-summary-val">{{ fmtAmt(profitabilityMis.summary.gross_sales) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Net Sales</span><span class="mis-summary-val">{{ fmtAmt(profitabilityMis.summary.net_sales) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Total Cost</span><span class="mis-summary-val">{{ fmtAmt(profitabilityMis.summary.total_cost) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Gross Profit</span><span class="mis-summary-val" :class="profitabilityMis.summary.gross_profit >= 0 ? 'green' : 'red'">{{ fmtAmt(profitabilityMis.summary.gross_profit) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Gross Margin %</span><span class="mis-summary-val" :class="profitabilityMis.summary.gross_margin_pct >= 0 ? 'green' : 'red'">{{ profitabilityMis.summary.gross_margin_pct.toFixed(1) }}%</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Invoices</span><span class="mis-summary-val">{{ fmtN(profitabilityMis.summary.invoice_count) }}</span></div>
          </div>
        </template>

        <!-- Product-wise Profit -->
        <table v-else-if="profitabilityMisTab === 'product'" class="books-table aging-table" style="width:100%">
          <thead><tr><th>Item</th><th class="ta-r">Revenue</th><th class="ta-r">Cost</th><th class="ta-r">Profit</th><th class="ta-r">Margin %</th></tr></thead>
          <tbody>
            <tr v-for="r in profitabilityMis.product_wise_profit.rows" :key="r.item_code">
              <td>{{ r.item_name || r.item_code }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(r.revenue) }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(r.cost) }}</td>
              <td class="ta-r mono-sm fw-600" :class="r.profit >= 0 ? 'green' : 'red'">{{ fmtAmt(r.profit) }}</td>
              <td class="ta-r mono-sm">{{ r.margin_pct.toFixed(1) }}%</td>
            </tr>
          </tbody>
        </table>

        <!-- Customer-wise Profit -->
        <table v-else-if="profitabilityMisTab === 'customer'" class="books-table aging-table" style="width:100%">
          <thead><tr><th>Customer</th><th class="ta-r">Invoices</th><th class="ta-r">Revenue</th><th class="ta-r">Cost</th><th class="ta-r">Profit</th><th class="ta-r">Margin %</th></tr></thead>
          <tbody>
            <tr v-for="r in profitabilityMis.customer_wise_profit.rows" :key="r.customer">
              <td>{{ r.customer_name || r.customer }}</td>
              <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(r.revenue) }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(r.cost) }}</td>
              <td class="ta-r mono-sm fw-600" :class="r.profit >= 0 ? 'green' : 'red'">{{ fmtAmt(r.profit) }}</td>
              <td class="ta-r mono-sm">{{ r.margin_pct.toFixed(1) }}%</td>
            </tr>
          </tbody>
        </table>

        <!-- Order-wise Profit -->
        <template v-else-if="profitabilityMisTab === 'order'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Invoiced revenue and estimated cost, rolled up by the Sales Order each invoice line references.
          </div>
          <table v-if="profitabilityMis.order_wise_profit.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Sales Order</th><th>Customer</th><th class="ta-r">Revenue</th><th class="ta-r">Cost</th><th class="ta-r">Profit</th><th class="ta-r">Margin %</th></tr></thead>
            <tbody>
              <tr v-for="r in profitabilityMis.order_wise_profit.rows" :key="r.sales_order">
                <td>{{ r.sales_order }}</td>
                <td>{{ r.customer_name }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.revenue) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.cost) }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.profit >= 0 ? 'green' : 'red'">{{ fmtAmt(r.profit) }}</td>
                <td class="ta-r mono-sm">{{ r.margin_pct.toFixed(1) }}%</td>
              </tr>
              <tr v-if="profitabilityMis.order_wise_profit.no_order.revenue">
                <td colspan="2" style="color:#94a3b8">Invoices not linked to a Sales Order</td>
                <td class="ta-r mono-sm">{{ fmtAmt(profitabilityMis.order_wise_profit.no_order.revenue) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(profitabilityMis.order_wise_profit.no_order.cost) }}</td>
                <td class="ta-r mono-sm fw-600" :class="profitabilityMis.order_wise_profit.no_order.profit >= 0 ? 'green' : 'red'">{{ fmtAmt(profitabilityMis.order_wise_profit.no_order.profit) }}</td>
                <td class="ta-r mono-sm">—</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No order-linked sales in this period.</div>
        </template>

        <!-- Branch-wise Profit -->
        <template v-else-if="profitabilityMisTab === 'branch'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            No Branch doctype exists in this app — Cost Center is used as the branch grouping.
          </div>
          <table v-if="profitabilityMis.branch_wise_profit.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Branch (Cost Center)</th><th class="ta-r">Revenue</th><th class="ta-r">Cost</th><th class="ta-r">Profit</th><th class="ta-r">Margin %</th></tr></thead>
            <tbody>
              <tr v-for="r in profitabilityMis.branch_wise_profit.rows" :key="r.cost_center">
                <td>{{ r.cost_center_name }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.revenue) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.cost) }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.profit >= 0 ? 'green' : 'red'">{{ fmtAmt(r.profit) }}</td>
                <td class="ta-r mono-sm">{{ r.margin_pct.toFixed(1) }}%</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No sales in this period.</div>
        </template>

        <!-- Salesperson-wise Profit -->
        <table v-else-if="profitabilityMisTab === 'salesperson'" class="books-table aging-table" style="width:100%">
          <thead><tr><th>Salesperson</th><th class="ta-r">Revenue</th><th class="ta-r">Cost</th><th class="ta-r">Profit</th><th class="ta-r">Margin %</th></tr></thead>
          <tbody>
            <tr v-for="r in profitabilityMis.salesperson_wise_profit.rows" :key="r.sales_person">
              <td>{{ r.sales_person_name }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(r.revenue) }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(r.cost) }}</td>
              <td class="ta-r mono-sm fw-600" :class="r.profit >= 0 ? 'green' : 'red'">{{ fmtAmt(r.profit) }}</td>
              <td class="ta-r mono-sm">{{ r.margin_pct.toFixed(1) }}%</td>
            </tr>
          </tbody>
        </table>

        <!-- Monthly Profit Trend -->
        <template v-else-if="profitabilityMisTab === 'monthly_trend'">
          <table v-if="profitabilityMis.monthly_profit_trend.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Month</th><th class="ta-r">Revenue</th><th class="ta-r">Cost</th><th class="ta-r">Profit</th><th class="ta-r">Margin %</th></tr></thead>
            <tbody>
              <tr v-for="r in profitabilityMis.monthly_profit_trend.rows" :key="r.month">
                <td>{{ r.month }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.revenue) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.cost) }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.profit >= 0 ? 'green' : 'red'">{{ fmtAmt(r.profit) }}</td>
                <td class="ta-r mono-sm">{{ r.margin_pct.toFixed(1) }}%</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No sales in this period.</div>
        </template>

      </template>
      <div v-else class="empty-msg">{{profitabilityMisRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Expense MIS -->
    <div v-if="activeReport === 'expense_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon emis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Expense MIS</div>
          <div class="bs-page-head-sub">Total expenses by department and category, budget vs actual, fixed vs variable, trend and unusual/excess spend. Submitted Expense records only — Purchase Invoices and GL journal entries are not included here.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportExpenseMisCSV" :disabled="!expenseMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in expenseMisTabs" :key="t.key" class="report-tab"
          :class="{ active: expenseMisTab === t.key }" @click="expenseMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="expenseMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="expenseMis">

        <!-- Total Expenses -->
        <template v-if="expenseMisTab === 'summary'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Submitted Expense records only (see Expenses). Purchase Invoices and GL journal entries are not included here.
          </div>
          <div class="mis-summary-grid">
            <div class="mis-summary-card"><span class="bucket-label">Total Expenses</span><span class="mis-summary-val">{{ fmtAmt(expenseMis.summary.total_amount) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Net (excl. Tax)</span><span class="mis-summary-val">{{ fmtAmt(expenseMis.summary.net_amount) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Tax Amount</span><span class="mis-summary-val">{{ fmtAmt(expenseMis.summary.total_tax) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Expense Count</span><span class="mis-summary-val">{{ fmtN(expenseMis.summary.expense_count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Avg Expense</span><span class="mis-summary-val">{{ fmtAmt(expenseMis.summary.avg_expense) }}</span></div>
          </div>
        </template>

        <!-- Department-wise Expenses -->
        <template v-else-if="expenseMisTab === 'department'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            No Department doctype exists in this app — Cost Center is used as the department grouping.
          </div>
          <table v-if="expenseMis.department_wise.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Department (Cost Center)</th><th class="ta-r">Expenses</th><th class="ta-r">Amount</th></tr></thead>
            <tbody>
              <tr v-for="r in expenseMis.department_wise.rows" :key="r.cost_center">
                <td>{{ r.cost_center_name }}</td>
                <td class="ta-r mono-sm">{{ r.count }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No expenses in this period.</div>
        </template>

        <!-- Expense Category-wise -->
        <table v-else-if="expenseMisTab === 'category'" class="books-table aging-table" style="width:100%">
          <thead><tr><th>Category</th><th class="ta-r">Expenses</th><th class="ta-r">Amount</th><th class="ta-r">% of Total</th></tr></thead>
          <tbody>
            <tr v-for="r in expenseMis.category_wise.rows" :key="r.expense_type">
              <td>{{ r.category_name }}</td>
              <td class="ta-r mono-sm">{{ r.count }}</td>
              <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.amount) }}</td>
              <td class="ta-r mono-sm">{{ r.pct_of_total.toFixed(1) }}%</td>
            </tr>
          </tbody>
        </table>

        <!-- Budget vs Actual Expense -->
        <template v-else-if="expenseMisTab === 'budget'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Estimated: each Cost Center's stored budget is prorated to the {{ expenseMis.budget_vs_actual.period_days }}-day selected period from its Annual/Quarterly/Monthly budget period. Cost centers with no budget set are omitted.
          </div>
          <table v-if="expenseMis.budget_vs_actual.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Cost Center</th><th>Budget Period</th><th class="ta-r">Period Budget (est.)</th><th class="ta-r">Actual</th><th class="ta-r">Variance</th><th class="ta-r">Variance %</th></tr></thead>
            <tbody>
              <tr v-for="r in expenseMis.budget_vs_actual.rows" :key="r.cost_center">
                <td>{{ r.cost_center_name }}</td>
                <td>{{ r.budget_period }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.period_budget) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.actual) }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.variance > 0 ? 'red' : 'green'">{{ fmtAmt(r.variance) }}</td>
                <td class="ta-r mono-sm" :class="r.variance > 0 ? 'red' : 'green'">{{ r.variance_pct.toFixed(1) }}%</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No cost centers with a budget set.</div>
        </template>

        <!-- Fixed Expenses -->
        <template v-else-if="expenseMisTab === 'fixed'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Categorised by keyword match on the Expense Category name (rent, salary, insurance, depreciation, EMI, etc.) — no stored Fixed/Variable flag exists.
          </div>
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Fixed Total</span><span class="mis-summary-val">{{ fmtAmt(expenseMis.fixed_expenses.total) }}</span></div>
          </div>
          <table v-if="expenseMis.fixed_expenses.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Category</th><th class="ta-r">Expenses</th><th class="ta-r">Amount</th></tr></thead>
            <tbody>
              <tr v-for="r in expenseMis.fixed_expenses.rows" :key="r.expense_type">
                <td>{{ r.category_name }}</td>
                <td class="ta-r mono-sm">{{ r.count }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No categories matched the Fixed-expense keywords in this period.</div>
        </template>

        <!-- Variable Expenses -->
        <template v-else-if="expenseMisTab === 'variable'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Variable Total</span><span class="mis-summary-val">{{ fmtAmt(expenseMis.variable_expenses.total) }}</span></div>
          </div>
          <table v-if="expenseMis.variable_expenses.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Category</th><th class="ta-r">Expenses</th><th class="ta-r">Amount</th></tr></thead>
            <tbody>
              <tr v-for="r in expenseMis.variable_expenses.rows" :key="r.expense_type">
                <td>{{ r.category_name }}</td>
                <td class="ta-r mono-sm">{{ r.count }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No variable-expense categories in this period.</div>
        </template>

        <!-- Expense Trend -->
        <template v-else-if="expenseMisTab === 'trend'">
          <table v-if="expenseMis.expense_trend.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Month</th><th class="ta-r">Expenses</th><th class="ta-r">Amount</th></tr></thead>
            <tbody>
              <tr v-for="r in expenseMis.expense_trend.rows" :key="r.month">
                <td>{{ r.month }}</td>
                <td class="ta-r mono-sm">{{ r.count }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No expenses in this period.</div>
        </template>

        <!-- Unusual / Excess Expenses -->
        <template v-else-if="expenseMisTab === 'unusual'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Individual expenses flagged as statistical outliers within their own category for this period (mean + 2x std-dev, or 2x average for thin categories).
          </div>
          <table v-if="expenseMis.unusual_expenses.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Expense</th><th>Date</th><th>Category</th><th>Department</th><th class="ta-r">Amount</th><th class="ta-r">Category Avg</th><th>Basis</th></tr></thead>
            <tbody>
              <tr v-for="r in expenseMis.unusual_expenses.rows" :key="r.expense">
                <td>{{ r.expense }}</td>
                <td>{{ r.posting_date }}</td>
                <td>{{ r.category_name }}</td>
                <td>{{ r.cost_center_name || '—' }}</td>
                <td class="ta-r mono-sm fw-600 red">{{ fmtAmt(r.amount) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.category_avg) }}</td>
                <td style="font-size:11px;color:#94a3b8">{{ r.basis }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No unusual expenses detected in this period.</div>
        </template>

      </template>
      <div v-else class="empty-msg">{{expenseMisRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Payables MIS -->
    <div v-if="activeReport === 'payables_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon payblmis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Payables MIS</div>
          <div class="bs-page-head-sub">Supplier outstanding, payable ageing, overdue payables, amounts due this week/month, supplier-wise outstanding and payment due forecast.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">As of {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportPayablesMisCSV" :disabled="!payablesMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in payablesMisTabs" :key="t.key" class="report-tab"
          :class="{ active: payablesMisTab === t.key }" @click="payablesMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="payablesMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="payablesMis">

        <!-- Supplier Outstanding -->
        <template v-if="payablesMisTab === 'summary'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            As of {{ toDate }}. Submitted Purchase Invoices with a non-zero outstanding balance; Purchase Returns are netted in.
          </div>
          <div class="mis-summary-grid">
            <div class="mis-summary-card"><span class="bucket-label">Total Outstanding</span><span class="mis-summary-val">{{ fmtAmt(payablesMis.summary.total_outstanding) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Overdue Amount</span><span class="mis-summary-val red">{{ fmtAmt(payablesMis.summary.overdue_amount) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Not Yet Due</span><span class="mis-summary-val green">{{ fmtAmt(payablesMis.summary.not_yet_due_amount) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Invoices</span><span class="mis-summary-val">{{ fmtN(payablesMis.summary.invoice_count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Overdue Invoices</span><span class="mis-summary-val">{{ fmtN(payablesMis.summary.overdue_count) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Suppliers</span><span class="mis-summary-val">{{ fmtN(payablesMis.summary.supplier_count) }}</span></div>
          </div>
        </template>

        <!-- Payable Ageing -->
        <table v-else-if="payablesMisTab === 'ageing'" class="books-table aging-table" style="width:100%">
          <thead><tr><th>Supplier</th><th class="ta-r">Current</th><th class="ta-r">1-30</th><th class="ta-r">31-60</th><th class="ta-r">61-90</th><th class="ta-r">90+</th><th class="ta-r">Total</th></tr></thead>
          <tbody>
            <tr v-for="r in payablesMis.payable_ageing.rows" :key="r.supplier">
              <td>{{ r.supplier_name }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(r.current) }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(r.days_1_30) }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(r.days_31_60) }}</td>
              <td class="ta-r mono-sm">{{ fmtAmt(r.days_61_90) }}</td>
              <td class="ta-r mono-sm red">{{ fmtAmt(r.days_90_plus) }}</td>
              <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Overdue Payables -->
        <template v-else-if="payablesMisTab === 'overdue'">
          <table v-if="payablesMis.overdue_payables.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Invoice</th><th>Supplier</th><th>Due Date</th><th class="ta-r">Overdue Days</th><th class="ta-r">Outstanding</th></tr></thead>
            <tbody>
              <tr v-for="r in payablesMis.overdue_payables.rows" :key="r.invoice">
                <td>{{ r.invoice }}</td>
                <td>{{ r.supplier_name }}</td>
                <td>{{ r.due_date }}</td>
                <td class="ta-r mono-sm red">{{ r.overdue_days }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.outstanding_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No overdue payables as of {{ toDate }}.</div>
        </template>

        <!-- Due This Week -->
        <template v-else-if="payablesMisTab === 'due_week'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">Rolling 7 days from {{ toDate }}, not yet overdue.</div>
          <table v-if="payablesMis.due_this_week.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Invoice</th><th>Supplier</th><th>Due Date</th><th class="ta-r">Outstanding</th></tr></thead>
            <tbody>
              <tr v-for="r in payablesMis.due_this_week.rows" :key="r.invoice">
                <td>{{ r.invoice }}</td>
                <td>{{ r.supplier_name }}</td>
                <td>{{ r.due_date }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.outstanding_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">Nothing due in the next 7 days.</div>
        </template>

        <!-- Due This Month -->
        <template v-else-if="payablesMisTab === 'due_month'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">Calendar month containing {{ toDate }} — can include invoices already overdue earlier this month.</div>
          <table v-if="payablesMis.due_this_month.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Invoice</th><th>Supplier</th><th>Due Date</th><th class="ta-r">Outstanding</th></tr></thead>
            <tbody>
              <tr v-for="r in payablesMis.due_this_month.rows" :key="r.invoice">
                <td>{{ r.invoice }}</td>
                <td>{{ r.supplier_name }}</td>
                <td>{{ r.due_date }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.outstanding_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">Nothing due this month.</div>
        </template>

        <!-- Supplier-wise Outstanding -->
        <table v-else-if="payablesMisTab === 'supplier'" class="books-table aging-table" style="width:100%">
          <thead><tr><th>Supplier</th><th class="ta-r">Invoices</th><th class="ta-r">Outstanding</th><th class="ta-r">Overdue Amount</th><th class="ta-r">Oldest Overdue (days)</th></tr></thead>
          <tbody>
            <tr v-for="r in payablesMis.supplier_wise_outstanding.rows" :key="r.supplier">
              <td>{{ r.supplier_name }}</td>
              <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
              <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.outstanding) }}</td>
              <td class="ta-r mono-sm" :class="r.overdue_amount ? 'red' : ''">{{ fmtAmt(r.overdue_amount) }}</td>
              <td class="ta-r mono-sm">{{ r.max_overdue_days || '—' }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Payment Due Forecast -->
        <template v-else-if="payablesMisTab === 'forecast'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">Forward-looking cash-outflow view, bucketed by days until due from {{ toDate }}.</div>
          <table class="books-table aging-table" style="width:100%">
            <thead><tr><th>Bucket</th><th class="ta-r">Invoices</th><th class="ta-r">Amount</th></tr></thead>
            <tbody>
              <tr v-for="b in payablesMis.payment_due_forecast.rows" :key="b.key">
                <td :class="b.key === 'overdue' ? 'red' : ''">{{ b.label }}</td>
                <td class="ta-r mono-sm">{{ b.count }}</td>
                <td class="ta-r mono-sm fw-600" :class="b.key === 'overdue' ? 'red' : ''">{{ fmtAmt(b.amount) }}</td>
              </tr>
            </tbody>
          </table>
        </template>

      </template>
      <div v-else class="empty-msg">{{payablesMisRan ? 'No data as of this date.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Cash & Bank MIS -->
    <div v-if="activeReport === 'cash_bank_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon cbmis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Cash & Bank MIS</div>
          <div class="bs-page-head-sub">Cash position, bank balance, daily cash flow and bank movement, receipts, payments, cash forecast and fund requirement for the period.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportCashBankMisCSV" :disabled="!cashBankMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in cashBankMisTabs" :key="t.key" class="report-tab"
          :class="{ active: cashBankMisTab === t.key }" @click="cashBankMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="cashBankMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="cashBankMis">

        <!-- Cash Position -->
        <template v-if="cashBankMisTab === 'cash_position'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">As of {{ cashBankMis.as_of_date }}.</div>
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Total Cash</span><span class="mis-summary-val">{{ fmtAmt(cashBankMis.cash_position.total) }}</span></div>
          </div>
          <table v-if="cashBankMis.cash_position.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Account</th><th class="ta-r">Opening</th><th class="ta-r">Closing</th><th class="ta-r">Net Movement</th></tr></thead>
            <tbody>
              <tr v-for="r in cashBankMis.cash_position.rows" :key="r.account">
                <td>{{ r.account_name }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.opening_balance) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.closing_balance) }}</td>
                <td class="ta-r mono-sm" :class="r.net_movement >= 0 ? 'green' : 'red'">{{ fmtAmt(r.net_movement) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No Cash accounts found.</div>
        </template>

        <!-- Bank Balance -->
        <template v-else-if="cashBankMisTab === 'bank_balance'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">As of {{ cashBankMis.as_of_date }}.</div>
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Total Bank</span><span class="mis-summary-val">{{ fmtAmt(cashBankMis.bank_balance.total) }}</span></div>
          </div>
          <table v-if="cashBankMis.bank_balance.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Account</th><th class="ta-r">Opening</th><th class="ta-r">Closing</th><th class="ta-r">Net Movement</th></tr></thead>
            <tbody>
              <tr v-for="r in cashBankMis.bank_balance.rows" :key="r.account">
                <td>{{ r.account_name }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.opening_balance) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.closing_balance) }}</td>
                <td class="ta-r mono-sm" :class="r.net_movement >= 0 ? 'green' : 'red'">{{ fmtAmt(r.net_movement) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No Bank accounts found.</div>
        </template>

        <!-- Daily Cash Flow -->
        <template v-else-if="cashBankMisTab === 'daily_cash'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Opening</span><span class="mis-summary-val">{{ fmtAmt(cashBankMis.daily_cash_flow.opening_balance) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Receipts</span><span class="mis-summary-val green">{{ fmtAmt(cashBankMis.daily_cash_flow.total_receipts) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Payments</span><span class="mis-summary-val red">{{ fmtAmt(cashBankMis.daily_cash_flow.total_payments) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Closing</span><span class="mis-summary-val">{{ fmtAmt(cashBankMis.daily_cash_flow.closing_balance) }}</span></div>
          </div>
          <table class="books-table aging-table" style="width:100%">
            <thead><tr><th>Date</th><th class="ta-r">Receipts</th><th class="ta-r">Payments</th><th class="ta-r">Net</th><th class="ta-r">Balance</th></tr></thead>
            <tbody>
              <tr v-for="r in cashBankMis.daily_cash_flow.days" :key="r.date">
                <td>{{ r.date }}</td>
                <td class="ta-r mono-sm green">{{ fmtAmt(r.receipts) }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.payments) }}</td>
                <td class="ta-r mono-sm" :class="r.net >= 0 ? 'green' : 'red'">{{ fmtAmt(r.net) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.balance) }}</td>
              </tr>
            </tbody>
          </table>
        </template>

        <!-- Daily Bank Movement -->
        <template v-else-if="cashBankMisTab === 'daily_bank'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Opening</span><span class="mis-summary-val">{{ fmtAmt(cashBankMis.daily_bank_movement.opening_balance) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Deposits</span><span class="mis-summary-val green">{{ fmtAmt(cashBankMis.daily_bank_movement.total_receipts) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Withdrawals</span><span class="mis-summary-val red">{{ fmtAmt(cashBankMis.daily_bank_movement.total_payments) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Closing</span><span class="mis-summary-val">{{ fmtAmt(cashBankMis.daily_bank_movement.closing_balance) }}</span></div>
          </div>
          <table class="books-table aging-table" style="width:100%">
            <thead><tr><th>Date</th><th class="ta-r">Deposits</th><th class="ta-r">Withdrawals</th><th class="ta-r">Net</th><th class="ta-r">Balance</th></tr></thead>
            <tbody>
              <tr v-for="r in cashBankMis.daily_bank_movement.days" :key="r.date">
                <td>{{ r.date }}</td>
                <td class="ta-r mono-sm green">{{ fmtAmt(r.receipts) }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.payments) }}</td>
                <td class="ta-r mono-sm" :class="r.net >= 0 ? 'green' : 'red'">{{ fmtAmt(r.net) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.balance) }}</td>
              </tr>
            </tbody>
          </table>
        </template>

        <!-- Receipts -->
        <template v-else-if="cashBankMisTab === 'receipts'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Total Receipts</span><span class="mis-summary-val green">{{ fmtAmt(cashBankMis.receipts.total) }}</span></div>
          </div>
          <table v-if="cashBankMis.receipts.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Reference</th><th>Date</th><th>Party</th><th>Account</th><th>Mode</th><th class="ta-r">Amount</th></tr></thead>
            <tbody>
              <tr v-for="r in cashBankMis.receipts.rows" :key="r.reference">
                <td>{{ r.reference }}</td>
                <td>{{ r.date }}</td>
                <td>{{ r.party_name || r.party || '—' }}</td>
                <td>{{ r.account }}</td>
                <td>{{ r.mode_of_payment || '—' }}</td>
                <td class="ta-r mono-sm fw-600 green">{{ fmtAmt(r.amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No receipts in this period.</div>
        </template>

        <!-- Payments -->
        <template v-else-if="cashBankMisTab === 'payments'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Includes both Payment Entry (Pay) and Expense records paid directly from a Cash/Bank account.
          </div>
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Total Payments</span><span class="mis-summary-val red">{{ fmtAmt(cashBankMis.payments.total) }}</span></div>
          </div>
          <table v-if="cashBankMis.payments.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Reference</th><th>Date</th><th>Party</th><th>Account</th><th>Source</th><th class="ta-r">Amount</th></tr></thead>
            <tbody>
              <tr v-for="r in cashBankMis.payments.rows" :key="r.source + r.reference">
                <td>{{ r.reference }}</td>
                <td>{{ r.date }}</td>
                <td>{{ r.party_name || r.party || '—' }}</td>
                <td>{{ r.account }}</td>
                <td>{{ r.source }}</td>
                <td class="ta-r mono-sm fw-600 red">{{ fmtAmt(r.amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No payments in this period.</div>
        </template>

        <!-- Cash Forecast -->
        <template v-else-if="cashBankMisTab === 'forecast'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Projected from the current Cash + Bank position ({{ fmtAmt(cashBankMis.cash_forecast.current_position) }}), assuming every outstanding invoice settles on its due date.
          </div>
          <table class="books-table aging-table" style="width:100%">
            <thead><tr><th>Bucket</th><th class="ta-r">Expected Inflow</th><th class="ta-r">Expected Outflow</th><th class="ta-r">Net</th><th class="ta-r">Projected Balance</th></tr></thead>
            <tbody>
              <tr v-for="r in cashBankMis.cash_forecast.rows" :key="r.key">
                <td :class="r.key === 'overdue' ? 'red' : ''">{{ r.label }}</td>
                <td class="ta-r mono-sm green">{{ fmtAmt(r.inflow) }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.outflow) }}</td>
                <td class="ta-r mono-sm" :class="r.net >= 0 ? 'green' : 'red'">{{ fmtAmt(r.net) }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.projected_balance >= 0 ? '' : 'red'">{{ fmtAmt(r.projected_balance) }}</td>
              </tr>
            </tbody>
          </table>
        </template>

        <!-- Fund Requirement -->
        <template v-else-if="cashBankMisTab === 'fund_requirement'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Peak Fund Requirement</span><span class="mis-summary-val" :class="cashBankMis.fund_requirement.peak_requirement > 0 ? 'red' : 'green'">{{ fmtAmt(cashBankMis.fund_requirement.peak_requirement) }}</span></div>
          </div>
          <table v-if="cashBankMis.fund_requirement.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Bucket</th><th class="ta-r">Shortfall</th></tr></thead>
            <tbody>
              <tr v-for="r in cashBankMis.fund_requirement.rows" :key="r.key">
                <td class="red">{{ r.label }}</td>
                <td class="ta-r mono-sm fw-600 red">{{ fmtAmt(r.shortfall) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No projected shortfall — the current Cash + Bank position covers the forecast.</div>
        </template>

      </template>
      <div v-else class="empty-msg">{{cashBankMisRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Customer MIS -->
    <div v-if="activeReport === 'customer_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon custmis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Customer MIS</div>
          <div class="bs-page-head-sub">New, active, repeat and inactive customers, customer-wise sales/outstanding/profit, retention rate, and top customers for the period.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportCustomerMisCSV" :disabled="!customerMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in customerMisTabs" :key="t.key" class="report-tab"
          :class="{ active: customerMisTab === t.key }" @click="customerMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="customerMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="customerMis">

        <!-- Overview (always visible, above the sub-tabs) -->
        <div class="mis-summary-grid" style="margin-bottom:14px">
          <div class="mis-summary-card"><span class="bucket-label">Total Customers</span><span class="mis-summary-val">{{ fmtN(customerMis.summary.total_customers) }}</span></div>
          <div class="mis-summary-card"><span class="bucket-label">Active Customers</span><span class="mis-summary-val">{{ fmtN(customerMis.summary.active_count) }}</span></div>
          <div class="mis-summary-card"><span class="bucket-label">Active Revenue</span><span class="mis-summary-val green">{{ fmtAmt(customerMis.summary.active_revenue) }}</span></div>
          <div class="mis-summary-card"><span class="bucket-label">New Customers</span><span class="mis-summary-val">{{ fmtN(customerMis.summary.new_count) }}</span></div>
          <div class="mis-summary-card"><span class="bucket-label">Repeat Customers</span><span class="mis-summary-val">{{ fmtN(customerMis.summary.repeat_count) }}</span></div>
          <div class="mis-summary-card"><span class="bucket-label">Repeat Revenue</span><span class="mis-summary-val green">{{ fmtAmt(customerMis.summary.repeat_revenue) }}</span></div>
          <div class="mis-summary-card"><span class="bucket-label">Inactive Customers</span><span class="mis-summary-val red">{{ fmtN(customerMis.summary.inactive_count) }}</span></div>
          <div class="mis-summary-card"><span class="bucket-label">Retention Rate</span><span class="mis-summary-val">{{ Number(customerMis.summary.retention_pct).toFixed(1) }}%</span></div>
          <div class="mis-summary-card"><span class="bucket-label">Total Outstanding</span><span class="mis-summary-val red">{{ fmtAmt(customerMis.summary.total_outstanding) }}</span></div>
          <div class="mis-summary-card"><span class="bucket-label">Total Profit</span><span class="mis-summary-val" :class="customerMis.summary.total_profit >= 0 ? 'green' : 'red'">{{ fmtAmt(customerMis.summary.total_profit) }}</span></div>
        </div>

        <!-- New Customers -->
        <template v-if="customerMisTab === 'new_customers'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">New Customers</span><span class="mis-summary-val">{{ customerMis.new_customers.count }}</span></div>
          </div>
          <table v-if="customerMis.new_customers.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Customer</th><th>First Invoice Date</th><th class="ta-r">Invoices in Period</th><th class="ta-r">Revenue in Period</th></tr></thead>
            <tbody>
              <tr v-for="r in customerMis.new_customers.rows" :key="r.customer">
                <td>{{ r.customer_name || r.customer }}</td>
                <td>{{ r.first_invoice_date }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No new customers in this period.</div>
        </template>

        <!-- Active Customers -->
        <template v-else-if="customerMisTab === 'active_customers'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Active Customers</span><span class="mis-summary-val">{{ customerMis.active_customers.count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Revenue</span><span class="mis-summary-val green">{{ fmtAmt(customerMis.active_customers.total) }}</span></div>
          </div>
          <table v-if="customerMis.active_customers.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Customer</th><th class="ta-r">Invoices</th><th class="ta-r">Revenue</th><th>First Invoice</th><th>Last Invoice</th></tr></thead>
            <tbody>
              <tr v-for="r in customerMis.active_customers.rows" :key="r.customer">
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_amount) }}</td>
                <td>{{ r.first_invoice_in_period }}</td>
                <td>{{ r.last_invoice_in_period }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No active customers in this period.</div>
        </template>

        <!-- Repeat Customers -->
        <template v-else-if="customerMisTab === 'repeat_customers'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Repeat Customers</span><span class="mis-summary-val">{{ customerMis.repeat_customers.count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Revenue</span><span class="mis-summary-val green">{{ fmtAmt(customerMis.repeat_customers.total) }}</span></div>
          </div>
          <table v-if="customerMis.repeat_customers.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Customer</th><th class="ta-r">Invoices</th><th class="ta-r">Revenue</th></tr></thead>
            <tbody>
              <tr v-for="r in customerMis.repeat_customers.rows" :key="r.customer">
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No repeat customers in this period.</div>
        </template>

        <!-- Customer-wise Sales -->
        <template v-else-if="customerMisTab === 'customer_wise_sales'">
          <table v-if="customerMis.customer_wise_sales.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Customer</th><th class="ta-r">Invoices</th><th class="ta-r">Net Total</th><th class="ta-r">Discount</th><th class="ta-r">Tax</th><th class="ta-r">Total</th><th class="ta-r">Outstanding</th><th class="ta-r">Avg Invoice Value</th></tr></thead>
            <tbody>
              <tr v-for="r in customerMis.customer_wise_sales.rows" :key="r.customer">
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.net_total) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.total_discount) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.total_tax) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_amount) }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.outstanding_amount) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.avg_invoice_value) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No sales in this period.</div>
        </template>

        <!-- Customer-wise Outstanding -->
        <template v-else-if="customerMisTab === 'customer_wise_outstanding'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Total Outstanding</span><span class="mis-summary-val red">{{ fmtAmt(customerMis.customer_wise_outstanding.total) }}</span></div>
          </div>
          <table v-if="customerMis.customer_wise_outstanding.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Customer</th><th class="ta-r">Invoices</th><th class="ta-r">Outstanding</th><th>Oldest Due Date</th><th class="ta-r">Max Overdue Days</th></tr></thead>
            <tbody>
              <tr v-for="r in customerMis.customer_wise_outstanding.rows" :key="r.customer">
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td class="ta-r mono-sm fw-600 red">{{ fmtAmt(r.outstanding_amount) }}</td>
                <td>{{ r.oldest_due_date }}</td>
                <td class="ta-r mono-sm" :class="r.max_overdue_days > 0 ? 'red' : ''">{{ r.max_overdue_days }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No outstanding balances.</div>
        </template>

        <!-- Customer-wise Profit -->
        <template v-else-if="customerMisTab === 'customer_wise_profit'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Total Profit</span><span class="mis-summary-val" :class="customerMis.customer_wise_profit.total >= 0 ? 'green' : 'red'">{{ fmtAmt(customerMis.customer_wise_profit.total) }}</span></div>
          </div>
          <table v-if="customerMis.customer_wise_profit.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Customer</th><th class="ta-r">Invoices</th><th class="ta-r">Revenue</th><th class="ta-r">Cost</th><th class="ta-r">Profit</th><th class="ta-r">Margin %</th></tr></thead>
            <tbody>
              <tr v-for="r in customerMis.customer_wise_profit.rows" :key="r.customer">
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.revenue) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.total_cost) }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.profit >= 0 ? 'green' : 'red'">{{ fmtAmt(r.profit) }}</td>
                <td class="ta-r mono-sm">{{ Number(r.margin_pct).toFixed(1) }}%</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No profit data for this period.</div>
        </template>

        <!-- Customer Retention -->
        <template v-else-if="customerMisTab === 'customer_retention'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Comparing {{ customerMis.customer_retention.prev_from }} – {{ customerMis.customer_retention.prev_to }} (prior period) to the selected period.
          </div>
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Retention Rate</span><span class="mis-summary-val">{{ Number(customerMis.customer_retention.retention_pct).toFixed(1) }}%</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Retained</span><span class="mis-summary-val green">{{ customerMis.customer_retention.retained_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Churned</span><span class="mis-summary-val red">{{ customerMis.customer_retention.churned_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">New</span><span class="mis-summary-val">{{ customerMis.customer_retention.new_count }}</span></div>
          </div>
          <table v-if="customerMis.customer_retention.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Customer</th><th>Status</th></tr></thead>
            <tbody>
              <tr v-for="r in customerMis.customer_retention.rows" :key="r.customer">
                <td>{{ r.customer_name || r.customer }}</td>
                <td :class="r.status === 'Retained' ? 'green' : (r.status === 'Churned' ? 'red' : '')">{{ r.status }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No customer activity to compare.</div>
        </template>

        <!-- Top Customers -->
        <template v-else-if="customerMisTab === 'top_customers'">
          <table v-if="customerMis.top_customers.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>#</th><th>Customer</th><th class="ta-r">Invoices</th><th class="ta-r">Revenue</th></tr></thead>
            <tbody>
              <tr v-for="(r, idx) in customerMis.top_customers.rows" :key="r.customer">
                <td>{{ idx + 1 }}</td>
                <td>{{ r.customer_name || r.customer }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No sales in this period.</div>
        </template>

        <!-- Inactive Customers -->
        <template v-else-if="customerMisTab === 'inactive_customers'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Inactive Customers</span><span class="mis-summary-val">{{ customerMis.inactive_customers.count }}</span></div>
          </div>
          <table v-if="customerMis.inactive_customers.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Customer</th><th>Last Invoice Date</th><th class="ta-r">Days Inactive</th><th class="ta-r">Lifetime Invoices</th><th class="ta-r">Lifetime Revenue</th></tr></thead>
            <tbody>
              <tr v-for="r in customerMis.inactive_customers.rows" :key="r.customer">
                <td>{{ r.customer_name || r.customer }}</td>
                <td>{{ r.last_invoice_date }}</td>
                <td class="ta-r mono-sm red">{{ r.days_inactive }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.lifetime_revenue) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No inactive customers found.</div>
        </template>

      </template>
      <div v-else class="empty-msg">{{customerMisRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Supplier MIS -->
    <div v-if="activeReport === 'supplier_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon suppmis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Supplier MIS</div>
          <div class="bs-page-head-sub">Supplier-wise purchase and outstanding, payment ageing, price comparison, delivery/supplier performance and quality/rejection for the period.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportSupplierMisCSV" :disabled="!supplierMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in supplierMisTabs" :key="t.key" class="report-tab"
          :class="{ active: supplierMisTab === t.key }" @click="supplierMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="supplierMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="supplierMis">

        <!-- Supplier-wise Purchase -->
        <template v-if="supplierMisTab === 'supplier_wise_purchase'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Total Purchase</span><span class="mis-summary-val">{{ fmtAmt(supplierMis.supplier_wise_purchase.total) }}</span></div>
          </div>
          <table v-if="supplierMis.supplier_wise_purchase.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Supplier</th><th class="ta-r">Invoices</th><th class="ta-r">Net Total</th><th class="ta-r">Discount</th><th class="ta-r">Tax</th><th class="ta-r">Total</th><th class="ta-r">Outstanding</th><th class="ta-r">Avg Invoice Value</th></tr></thead>
            <tbody>
              <tr v-for="r in supplierMis.supplier_wise_purchase.rows" :key="r.supplier">
                <td>{{ r.supplier_name || r.supplier }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.net_total) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.total_discount) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.total_tax) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_amount) }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.outstanding_amount) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.avg_invoice_value) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No purchases in this period.</div>
        </template>

        <!-- Supplier Outstanding -->
        <template v-else-if="supplierMisTab === 'supplier_outstanding'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Total Outstanding</span><span class="mis-summary-val red">{{ fmtAmt(supplierMis.supplier_outstanding.total) }}</span></div>
          </div>
          <table v-if="supplierMis.supplier_outstanding.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Supplier</th><th class="ta-r">Invoices</th><th class="ta-r">Outstanding</th><th class="ta-r">Overdue Amount</th><th class="ta-r">Max Overdue Days</th></tr></thead>
            <tbody>
              <tr v-for="r in supplierMis.supplier_outstanding.rows" :key="r.supplier">
                <td>{{ r.supplier_name || r.supplier }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td class="ta-r mono-sm fw-600 red">{{ fmtAmt(r.outstanding_amount) }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.overdue_amount) }}</td>
                <td class="ta-r mono-sm" :class="r.max_overdue_days > 0 ? 'red' : ''">{{ r.max_overdue_days }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No outstanding balances.</div>
        </template>

        <!-- Supplier Payment Ageing -->
        <template v-else-if="supplierMisTab === 'supplier_payment_ageing'">
          <table v-if="supplierMis.supplier_payment_ageing.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Supplier</th><th class="ta-r">Current</th><th class="ta-r">1-30</th><th class="ta-r">31-60</th><th class="ta-r">61-90</th><th class="ta-r">90+</th><th class="ta-r">Total</th></tr></thead>
            <tbody>
              <tr v-for="r in supplierMis.supplier_payment_ageing.rows" :key="r.supplier">
                <td>{{ r.supplier_name || r.supplier }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.current) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.days_1_30) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.days_31_60) }}</td>
                <td class="ta-r mono-sm">{{ fmtAmt(r.days_61_90) }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.days_90_plus) }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No outstanding balances.</div>
        </template>

        <!-- Purchase Price Comparison -->
        <template v-else-if="supplierMisTab === 'purchase_price_comparison'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            {{ supplierMis.purchase_price_comparison.multi_supplier_item_count }} item(s) were purchased from more than one supplier in this period.
          </div>
          <table v-if="supplierMis.purchase_price_comparison.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Item</th><th>Supplier</th><th class="ta-r">Qty</th><th class="ta-r">Avg Rate</th><th class="ta-r">Vs Lowest</th><th>Best Price</th></tr></thead>
            <tbody>
              <tr v-for="(r, idx) in supplierMis.purchase_price_comparison.rows" :key="r.item_code + r.supplier">
                <td>{{ r.item_name || r.item_code }}</td>
                <td>{{ r.supplier_name || r.supplier }}</td>
                <td class="ta-r mono-sm">{{ r.qty }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.avg_rate) }}</td>
                <td class="ta-r mono-sm" :class="r.is_lowest ? 'green' : 'red'">{{ r.is_lowest ? '—' : '+' + Number(r.variance_vs_lowest_pct).toFixed(1) + '%' }}</td>
                <td>
                  <span v-if="r.is_lowest && r.supplier_count > 1" class="pill pill-green">Lowest</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No purchases in this period.</div>
        </template>

        <!-- Supplier Performance -->
        <template v-else-if="supplierMisTab === 'supplier_performance'">
          <table v-if="supplierMis.supplier_performance.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Supplier</th><th class="ta-r">Purchase Amount</th><th class="ta-r">Outstanding</th><th class="ta-r">On-time Delivery %</th><th class="ta-r">Rejection %</th><th class="ta-r">Avg Price Variance %</th><th class="ta-r">Score</th></tr></thead>
            <tbody>
              <tr v-for="r in supplierMis.supplier_performance.rows" :key="r.supplier">
                <td>{{ r.supplier_name || r.supplier }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_purchase_amount) }}</td>
                <td class="ta-r mono-sm red">{{ fmtAmt(r.outstanding_amount) }}</td>
                <td class="ta-r mono-sm">{{ r.on_time_delivery_pct != null ? Number(r.on_time_delivery_pct).toFixed(1) + '%' : '—' }}</td>
                <td class="ta-r mono-sm">{{ r.rejection_pct != null ? Number(r.rejection_pct).toFixed(1) + '%' : '—' }}</td>
                <td class="ta-r mono-sm">{{ r.avg_price_variance_pct != null ? Number(r.avg_price_variance_pct).toFixed(1) + '%' : '—' }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.performance_score != null && r.performance_score < 70 ? 'red' : 'green'">{{ r.performance_score != null ? Number(r.performance_score).toFixed(0) : '—' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No supplier activity in this period.</div>
        </template>

        <!-- Delivery Performance -->
        <template v-else-if="supplierMisTab === 'delivery_performance'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">On-time %</span><span class="mis-summary-val green">{{ Number(supplierMis.delivery_performance.summary.on_time_pct).toFixed(1) }}%</span></div>
            <div class="mis-summary-card"><span class="bucket-label">On-time</span><span class="mis-summary-val">{{ supplierMis.delivery_performance.summary.on_time_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Late</span><span class="mis-summary-val red">{{ supplierMis.delivery_performance.summary.late_count }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">No PO Reference</span><span class="mis-summary-val">{{ supplierMis.delivery_performance.summary.undated_count }}</span></div>
          </div>
          <div style="font-size:12px;font-weight:600;margin-bottom:8px">By Supplier</div>
          <table v-if="supplierMis.delivery_performance.by_supplier.length" class="books-table aging-table" style="width:100%;margin-bottom:20px">
            <thead><tr><th>Supplier</th><th class="ta-r">Receipts</th><th class="ta-r">On-time</th><th class="ta-r">Late</th><th class="ta-r">On-time %</th><th class="ta-r">Avg Delay (days)</th></tr></thead>
            <tbody>
              <tr v-for="r in supplierMis.delivery_performance.by_supplier" :key="r.supplier">
                <td>{{ r.supplier_name || r.supplier }}</td>
                <td class="ta-r mono-sm">{{ r.receipt_count }}</td>
                <td class="ta-r mono-sm green">{{ r.on_time_count }}</td>
                <td class="ta-r mono-sm red">{{ r.late_count }}</td>
                <td class="ta-r mono-sm fw-600">{{ Number(r.on_time_pct).toFixed(1) }}%</td>
                <td class="ta-r mono-sm">{{ Number(r.avg_delay_days).toFixed(1) }}</td>
              </tr>
            </tbody>
          </table>
          <div style="font-size:12px;font-weight:600;margin-bottom:8px">Receipts</div>
          <table v-if="supplierMis.delivery_performance.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Receipt</th><th>Supplier</th><th>Received Date</th><th>Expected Date</th><th class="ta-r">Delay (days)</th><th>Status</th></tr></thead>
            <tbody>
              <tr v-for="r in supplierMis.delivery_performance.rows" :key="r.receipt">
                <td>{{ r.receipt }}</td>
                <td>{{ r.supplier_name || r.supplier }}</td>
                <td>{{ r.received_date }}</td>
                <td>{{ r.expected_date || '—' }}</td>
                <td class="ta-r mono-sm" :class="r.has_reference && !r.on_time ? 'red' : ''">{{ r.has_reference ? r.delay_days : '—' }}</td>
                <td :class="!r.has_reference ? '' : (r.on_time ? 'green' : 'red')">{{ !r.has_reference ? 'No PO Ref' : (r.on_time ? 'On-time' : 'Late') }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No receipts in this period.</div>
        </template>

        <!-- Quality / Rejection -->
        <template v-else-if="supplierMisTab === 'quality_rejection'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Received Qty</span><span class="mis-summary-val">{{ supplierMis.quality_rejection.summary.total_received_qty }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Rejected Qty</span><span class="mis-summary-val red">{{ supplierMis.quality_rejection.summary.total_rejected_qty }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Rejection %</span><span class="mis-summary-val red">{{ Number(supplierMis.quality_rejection.summary.overall_rejection_pct).toFixed(2) }}%</span></div>
          </div>
          <div style="font-size:12px;font-weight:600;margin-bottom:8px">By Supplier</div>
          <table v-if="supplierMis.quality_rejection.by_supplier.length" class="books-table aging-table" style="width:100%;margin-bottom:20px">
            <thead><tr><th>Supplier</th><th class="ta-r">Received Qty</th><th class="ta-r">Accepted Qty</th><th class="ta-r">Rejected Qty</th><th class="ta-r">Rejection %</th></tr></thead>
            <tbody>
              <tr v-for="r in supplierMis.quality_rejection.by_supplier" :key="r.supplier">
                <td>{{ r.supplier_name || r.supplier }}</td>
                <td class="ta-r mono-sm">{{ r.received_qty }}</td>
                <td class="ta-r mono-sm green">{{ r.accepted_qty }}</td>
                <td class="ta-r mono-sm red">{{ r.rejected_qty }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.rejection_pct > 0 ? 'red' : ''">{{ Number(r.rejection_pct).toFixed(2) }}%</td>
              </tr>
            </tbody>
          </table>
          <div style="font-size:12px;font-weight:600;margin-bottom:8px">By Item</div>
          <table v-if="supplierMis.quality_rejection.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Supplier</th><th>Item</th><th class="ta-r">Received Qty</th><th class="ta-r">Accepted Qty</th><th class="ta-r">Rejected Qty</th><th class="ta-r">Rejection %</th></tr></thead>
            <tbody>
              <tr v-for="(r, idx) in supplierMis.quality_rejection.rows" :key="r.supplier + r.item_code + idx">
                <td>{{ r.supplier_name || r.supplier }}</td>
                <td>{{ r.item_name || r.item_code }}</td>
                <td class="ta-r mono-sm">{{ r.received_qty }}</td>
                <td class="ta-r mono-sm green">{{ r.accepted_qty }}</td>
                <td class="ta-r mono-sm red">{{ r.rejected_qty }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.rejection_pct > 0 ? 'red' : ''">{{ Number(r.rejection_pct).toFixed(2) }}%</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No receipts in this period.</div>
        </template>

      </template>
      <div v-else class="empty-msg">{{supplierMisRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

    <!-- Employee / Performance MIS -->
    <div v-if="activeReport === 'employee_mis'" class="books-card report-card bs-card">
      <div class="bs-page-head">
        <div class="bs-page-head-icon empmis-page-head-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="bs-page-head-text">
          <div class="bs-page-head-title">Employee / Performance MIS</div>
          <div class="bs-page-head-sub">This app has no HR/Payroll module — figures below are built from Job Card time logs and Sales Person records, so they only cover employees who had time logged or are set up as a Sales Person.</div>
        </div>
        <div class="bs-page-head-actions">
          <div class="bs-asof">{{ fmtDate(fromDate) }} - {{ fmtDate(toDate) }}</div>
          <button class="bs-export-btn" @click="exportEmployeeMisCSV" :disabled="!employeeMis">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
      </div>

      <div class="report-tabs" style="margin-bottom:14px">
        <button v-for="t in employeeMisTabs" :key="t.key" class="report-tab"
          :class="{ active: employeeMisTab === t.key }" @click="employeeMisTab = t.key">
          {{ t.label }}
        </button>
      </div>

      <template v-if="employeeMisLoading"><div class="loading-shimmer" style="height:220px;border-radius:8px"></div></template>
      <template v-else-if="employeeMis">

        <!-- Employee Attendance -->
        <template v-if="employeeMisTab === 'employee_attendance'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Proxy: a day counts as "present" if the employee has any Job Card time log on that date. {{ employeeMis.period_days }}-day period.
          </div>
          <table v-if="employeeMis.employee_attendance.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Employee</th><th class="ta-r">Present Days</th><th class="ta-r">Attendance %</th><th class="ta-r">Total Hours</th><th class="ta-r">Avg Hrs/Day</th></tr></thead>
            <tbody>
              <tr v-for="r in employeeMis.employee_attendance.rows" :key="r.employee">
                <td>{{ r.employee }}</td>
                <td class="ta-r mono-sm">{{ r.present_days }} / {{ r.period_days }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.attendance_pct >= 80 ? 'green' : 'red'">{{ r.attendance_pct }}%</td>
                <td class="ta-r mono-sm">{{ r.total_hours }}</td>
                <td class="ta-r mono-sm">{{ r.avg_hours_per_day }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No Job Card time logs in this period.</div>
        </template>

        <!-- Department-wise Manpower -->
        <template v-else-if="employeeMisTab === 'department_manpower'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Sales Person is the only doctype in this app with a department field, so this reflects active Sales Persons only.
          </div>
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Total Headcount</span><span class="mis-summary-val">{{ employeeMis.department_manpower.total_headcount }}</span></div>
          </div>
          <table v-if="employeeMis.department_manpower.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Department</th><th class="ta-r">Headcount</th><th>Employees</th></tr></thead>
            <tbody>
              <tr v-for="d in employeeMis.department_manpower.rows" :key="d.department">
                <td>{{ d.department }}</td>
                <td class="ta-r mono-sm fw-600">{{ d.headcount }}</td>
                <td style="font-size:11.5px;color:#64748b">{{ d.employees.map(e => e.sales_person_name).join(', ') }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No active Sales Persons set up.</div>
        </template>

        <!-- Salesperson Target vs Achievement -->
        <template v-else-if="employeeMisTab === 'salesperson_target'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            No target is stored — enter a target per salesperson to compare against actual sales for this period.
          </div>
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Total Achieved</span><span class="mis-summary-val green">{{ fmtAmt(employeeMis.salesperson_achievement.total_achieved) }}</span></div>
            <div class="mis-summary-card"><span class="bucket-label">Sales with No Salesperson</span><span class="mis-summary-val">{{ fmtAmt(employeeMis.salesperson_achievement.unassigned_sales) }}</span></div>
          </div>
          <table v-if="employeeMis.salesperson_achievement.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Salesperson</th><th class="ta-r">Invoices</th><th class="ta-r">Achieved</th><th class="ta-r">Target (KES)</th><th class="ta-r">Achievement %</th></tr></thead>
            <tbody>
              <tr v-for="r in employeeMis.salesperson_achievement.rows" :key="r.sales_person">
                <td>{{ r.sales_person_name || r.sales_person }}</td>
                <td class="ta-r mono-sm">{{ r.invoice_count }}</td>
                <td class="ta-r mono-sm fw-600 green">{{ fmtAmt(r.total_amount) }}</td>
                <td class="ta-r"><input type="number" v-model.number="spTargets[r.sales_person]" class="dr-input" style="width:110px;text-align:right" min="0" /></td>
                <td class="ta-r mono-sm fw-600" :class="spAchievementPct(r) >= 100 ? 'green' : 'red'">{{ spTargets[r.sales_person] ? spAchievementPct(r).toFixed(1) + '%' : '—' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No sales attributed to a salesperson in this period.</div>
        </template>

        <!-- Salesperson Collection -->
        <template v-else-if="employeeMisTab === 'salesperson_collection'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Total Collected</span><span class="mis-summary-val green">{{ fmtAmt(employeeMis.salesperson_collection.total_collected) }}</span></div>
          </div>
          <table v-if="employeeMis.salesperson_collection.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Salesperson</th><th class="ta-r">Payments</th><th class="ta-r">Collected Amount</th></tr></thead>
            <tbody>
              <tr v-for="r in employeeMis.salesperson_collection.rows" :key="r.sales_person">
                <td>{{ r.sales_person_name || r.sales_person }}</td>
                <td class="ta-r mono-sm">{{ r.payment_count }}</td>
                <td class="ta-r mono-sm fw-600 green">{{ fmtAmt(r.collected_amount) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No collections attributed to a salesperson in this period.</div>
        </template>

        <!-- Production Employee Productivity -->
        <template v-else-if="employeeMisTab === 'production_productivity'">
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Team Avg Qty/Hour</span><span class="mis-summary-val">{{ employeeMis.production_productivity.team_avg_qty_per_hour }}</span></div>
          </div>
          <table v-if="employeeMis.production_productivity.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Employee</th><th class="ta-r">Job Cards</th><th class="ta-r">Hours</th><th class="ta-r">Qty Produced</th><th class="ta-r">Avg Time/Unit (min)</th><th class="ta-r">Qty/Hour</th></tr></thead>
            <tbody>
              <tr v-for="r in employeeMis.production_productivity.rows" :key="r.employee">
                <td>{{ r.employee }}</td>
                <td class="ta-r mono-sm">{{ r.job_card_count }}</td>
                <td class="ta-r mono-sm">{{ r.total_hours }}</td>
                <td class="ta-r mono-sm fw-600">{{ r.qty_produced }}</td>
                <td class="ta-r mono-sm">{{ r.avg_time_per_unit_mins ?? '—' }}</td>
                <td class="ta-r mono-sm">{{ r.qty_per_hour ?? '—' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No Job Card time logs in this period.</div>
        </template>

        <!-- Overtime -->
        <template v-else-if="employeeMisTab === 'overtime'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Proxy: logged time beyond 8 hours (480 min) in a day, from Job Card time logs. No shift doctype exists to read an actual shift length from.
          </div>
          <table v-if="employeeMis.overtime.summary.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Employee</th><th class="ta-r">Overtime Days</th><th class="ta-r">Overtime Hours</th></tr></thead>
            <tbody>
              <tr v-for="r in employeeMis.overtime.summary" :key="r.employee">
                <td>{{ r.employee }}</td>
                <td class="ta-r mono-sm">{{ r.overtime_days }}</td>
                <td class="ta-r mono-sm fw-600 red">{{ r.overtime_hours }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No overtime in this period.</div>
        </template>

        <!-- Labour Cost -->
        <template v-else-if="employeeMisTab === 'labour_cost'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Proxy: logged hours × the Workstation's hour rate on each Job Card — there's no per-employee wage field in this app, so this is a cost-of-time figure, not real payroll cost.
          </div>
          <div class="mis-summary-grid" style="margin-bottom:14px">
            <div class="mis-summary-card"><span class="bucket-label">Total Labour Cost</span><span class="mis-summary-val red">{{ fmtAmt(employeeMis.labour_cost.total) }}</span></div>
          </div>
          <div style="font-size:12px;font-weight:600;margin-bottom:8px">By Employee</div>
          <table v-if="employeeMis.labour_cost.by_employee.length" class="books-table aging-table" style="width:100%;margin-bottom:20px">
            <thead><tr><th>Employee</th><th class="ta-r">Hours</th><th class="ta-r">Cost</th></tr></thead>
            <tbody>
              <tr v-for="r in employeeMis.labour_cost.by_employee" :key="r.employee">
                <td>{{ r.employee }}</td>
                <td class="ta-r mono-sm">{{ r.total_hours }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_cost) }}</td>
              </tr>
            </tbody>
          </table>
          <div style="font-size:12px;font-weight:600;margin-bottom:8px">By Operation</div>
          <table v-if="employeeMis.labour_cost.by_operation.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Operation</th><th class="ta-r">Employees</th><th class="ta-r">Hours</th><th class="ta-r">Cost</th></tr></thead>
            <tbody>
              <tr v-for="r in employeeMis.labour_cost.by_operation" :key="r.operation">
                <td>{{ r.operation }}</td>
                <td class="ta-r mono-sm">{{ r.employee_count }}</td>
                <td class="ta-r mono-sm">{{ r.total_hours }}</td>
                <td class="ta-r mono-sm fw-600">{{ fmtAmt(r.total_cost) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No Job Card time logs in this period.</div>
        </template>

        <!-- Employee Performance -->
        <template v-else-if="employeeMisTab === 'employee_performance'">
          <div style="font-size:11.5px;color:#94a3b8;margin-bottom:12px">
            Composite score = average of attendance %, output rate vs the team average (capped at 150%), and (100 − rejection %) — whichever of these apply to the employee.
          </div>
          <table v-if="employeeMis.employee_performance.rows.length" class="books-table aging-table" style="width:100%">
            <thead><tr><th>Employee</th><th class="ta-r">Hours</th><th class="ta-r">Qty Produced</th><th class="ta-r">Qty/Hour</th><th class="ta-r">Rejection %</th><th class="ta-r">Attendance %</th><th class="ta-r">Overtime Hrs</th><th class="ta-r">Score</th></tr></thead>
            <tbody>
              <tr v-for="r in employeeMis.employee_performance.rows" :key="r.employee">
                <td>{{ r.employee }}</td>
                <td class="ta-r mono-sm">{{ r.total_hours }}</td>
                <td class="ta-r mono-sm">{{ r.qty_produced }}</td>
                <td class="ta-r mono-sm">{{ r.qty_per_hour ?? '—' }}</td>
                <td class="ta-r mono-sm" :class="r.rejection_pct > 0 ? 'red' : ''">{{ r.rejection_pct != null ? r.rejection_pct + '%' : '—' }}</td>
                <td class="ta-r mono-sm">{{ r.attendance_pct != null ? r.attendance_pct + '%' : '—' }}</td>
                <td class="ta-r mono-sm">{{ r.overtime_hours }}</td>
                <td class="ta-r mono-sm fw-600" :class="r.performance_score != null && r.performance_score < 70 ? 'red' : 'green'">{{ r.performance_score ?? '—' }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="empty-msg">No Job Card time logs in this period.</div>
        </template>

      </template>
      <div v-else class="empty-msg">{{employeeMisRan ? 'No data for this period.' : 'Run the report to see results.'}}</div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFrappeCall, formatCurrency } from "../composables/useFrappe.js";
import { apiGET, resolveCompany } from "../api/client.js";
import Modal from "../components/Modal.vue";

const fmt    = formatCurrency;
const fmtAmt = (v) => v != null ? "KES " + Number(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—";
const fmtN   = (v) => Number(v||0).toLocaleString("en-US", { maximumFractionDigits: 0 });
const fmtN2  = (v) => Number(v||0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
function totalValStyle(text) {
  const len = String(text || "").length;
  let size = 24;
  if (len > 18) size = 15;
  else if (len > 15) size = 17;
  else if (len > 12) size = 19;
  else if (len > 10) size = 21;
  return { fontSize: size + "px" };
}

const today    = new Date();
const fromDate = ref(new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0,10));
const toDate   = ref(today.toISOString().slice(0,10));
function resetDateRange() {
  fromDate.value = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0,10);
  toDate.value = today.toISOString().slice(0,10);
}
const activeReport = ref("pl");

const { data: pl,  loading: plLoading,  execute: loadPl  } = useFrappeCall("psd_books.db.queries.get_profit_and_loss");
const { data: bs,  loading: bsLoading,  execute: loadBs  } = useFrappeCall("psd_books.db.queries.get_balance_sheet_totals");
const { data: cf,  loading: cfLoading,  execute: loadCf  } = useFrappeCall("psd_books.db.queries.get_cash_flow");
const { data: gst, loading: gstLoading, execute: loadGst } = useFrappeCall("psd_books.db.queries.get_gst_summary");
const { data: tb,  loading: tbLoading,  execute: loadTb  } = useFrappeCall("psd_books.db.queries.get_trial_balance");

const tbExportOpen = ref(false);
const tbRowMenu     = ref(null);
const tbSort        = ref({ key: "", dir: "asc" });

function sumTb(rows, field) { return (rows || []).reduce((s, r) => s + Number(r[field] || 0), 0); }
const tbTotals = computed(() => ({
  opening: sumTb(tb.value, "opening"),
  debit:   sumTb(tb.value, "debit"),
  credit:  sumTb(tb.value, "credit"),
  closing: sumTb(tb.value, "closing"),
}));
const tbBalanced = computed(() => Math.abs(tbTotals.value.debit - tbTotals.value.credit) < 0.01);

const tbSorted = computed(() => {
  const rows = [...(tb.value || [])];
  const key = tbSort.value.key;
  if (!key) return rows;
  const mul = tbSort.value.dir === "desc" ? -1 : 1;
  const val = (r) => (key === "account" || key === "account_type")
    ? String(r[key] || "").toLowerCase()
    : Number(r[key] || 0);
  rows.sort((a, b) => {
    const x = val(a), y = val(b);
    if (typeof x === "string") return mul * x.localeCompare(y);
    return mul * (x - y);
  });
  return rows;
});

function setTbSort(key) {
  if (tbSort.value.key === key) {
    tbSort.value = { key, dir: tbSort.value.dir === "asc" ? "desc" : "asc" };
  } else {
    tbSort.value = { key, dir: "asc" };
  }
}
function tbSortCls(key) {
  if (tbSort.value.key !== key) return "";
  return tbSort.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
}

const TB_HEADER = ["Account", "Type", "Opening", "Debit", "Credit", "Closing"];
function tbRowValues(r) {
  return [r.account, r.account_type, r.opening || 0, r.debit || 0, r.credit || 0, r.closing || 0];
}
function copyTbToClipboard() {
  const rows = tbSorted.value.map(r => tbRowValues(r).join("\t"));
  const t = tbTotals.value;
  rows.push(["Total", "", t.opening, t.debit, t.credit, t.closing].join("\t"));
  const text = [TB_HEADER.join("\t"), ...rows].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function copyTbRow(row) {
  const text = [TB_HEADER.join("\t"), tbRowValues(row).join("\t")].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function exportTbRowCSV(row) {
  const csv = [TB_HEADER.join(","), tbRowValues(row).join(",")].join("\n");
  const slug = String(row.account || "account").replace(/[^A-Za-z0-9_-]+/g, "_");
  iwsDownload(csv, "trial_balance_" + slug + "_" + toDate.value + ".csv");
}
function exportTbCSV() {
  if (!tb.value?.length) return;
  const lines = tbSorted.value.map(r => tbRowValues(r).join(","));
  const t = tbTotals.value;
  lines.push(["Total", "", t.opening, t.debit, t.credit, t.closing].join(","));
  const csv = [TB_HEADER.join(","), ...lines].join("\n");
  iwsDownload(csv, "trial_balance_" + toDate.value + ".csv");
}

const arAging  = ref([]);
const apAging  = ref([]);

const arExportOpen = ref(false);
const arRowMenu     = ref(null);
const arSort        = ref({ key: "", dir: "asc" });

function sumAging(rows, field) { return rows.reduce((s, r) => s + Number(r[field] || 0), 0); }
const arTotals = computed(() => ({
  current:      sumAging(arAging.value, "current"),
  days_1_30:    sumAging(arAging.value, "days_1_30"),
  days_31_60:   sumAging(arAging.value, "days_31_60"),
  days_61_90:   sumAging(arAging.value, "days_61_90"),
  days_90_plus: sumAging(arAging.value, "days_90_plus"),
  total:        sumAging(arAging.value, "total"),
}));

const arAgingSorted = computed(() => {
  const rows = [...(arAging.value || [])];
  const key = arSort.value.key;
  if (!key) return rows;
  const mul = arSort.value.dir === "desc" ? -1 : 1;
  const val = (r) => key === "customer"
    ? String(r.customer_name || r.customer || "").toLowerCase()
    : Number(r[key] || 0);
  rows.sort((a, b) => {
    const x = val(a), y = val(b);
    if (typeof x === "string") return mul * x.localeCompare(y);
    return mul * (x - y);
  });
  return rows;
});

function setArSort(key) {
  if (arSort.value.key === key) {
    arSort.value = { key, dir: arSort.value.dir === "asc" ? "desc" : "asc" };
  } else {
    arSort.value = { key, dir: "asc" };
  }
}
function arSortCls(key) {
  if (arSort.value.key !== key) return "";
  return arSort.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
}

function agingRowValues(r, isAR) {
  return [isAR ? (r.customer_name || r.customer) : (r.supplier_name || r.supplier), r.current, r.days_1_30, r.days_31_60, r.days_61_90, r.days_90_plus, r.total];
}
function agingHeader(isAR) {
  return [isAR ? "Customer" : "Vendor", "Current", "1-30 Days", "31-60 Days", "61-90 Days", "90+ Days", "Total"];
}
function copyArAgingToClipboard() {
  const header = agingHeader(true);
  const rows = arAgingSorted.value.map(r => agingRowValues(r, true).join("\t"));
  const t = arTotals.value;
  rows.push(["Total", t.current, t.days_1_30, t.days_31_60, t.days_61_90, t.days_90_plus, t.total].join("\t"));
  const text = [header.join("\t"), ...rows].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function copyAgingRow(row, isAR) {
  const header = agingHeader(isAR);
  const text = [header.join("\t"), agingRowValues(row, isAR).join("\t")].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function exportAgingRowCSV(row, isAR) {
  const header = agingHeader(isAR);
  const csv = [header.join(","), agingRowValues(row, isAR).join(",")].join("\n");
  const slug = String((isAR ? row.customer : row.supplier) || "party").replace(/[^A-Za-z0-9_-]+/g, "_");
  iwsDownload(csv, (isAR ? "ar_aging_" : "ap_aging_") + slug + "_" + toDate.value + ".csv");
}

const apExportOpen = ref(false);
const apRowMenu     = ref(null);
const apSort        = ref({ key: "", dir: "asc" });

const apTotals = computed(() => ({
  current:      sumAging(apAging.value, "current"),
  days_1_30:    sumAging(apAging.value, "days_1_30"),
  days_31_60:   sumAging(apAging.value, "days_31_60"),
  days_61_90:   sumAging(apAging.value, "days_61_90"),
  days_90_plus: sumAging(apAging.value, "days_90_plus"),
  total:        sumAging(apAging.value, "total"),
}));

const apAgingSorted = computed(() => {
  const rows = [...(apAging.value || [])];
  const key = apSort.value.key;
  if (!key) return rows;
  const mul = apSort.value.dir === "desc" ? -1 : 1;
  const val = (r) => key === "supplier"
    ? String(r.supplier_name || r.supplier || "").toLowerCase()
    : Number(r[key] || 0);
  rows.sort((a, b) => {
    const x = val(a), y = val(b);
    if (typeof x === "string") return mul * x.localeCompare(y);
    return mul * (x - y);
  });
  return rows;
});

function setApSort(key) {
  if (apSort.value.key === key) {
    apSort.value = { key, dir: apSort.value.dir === "asc" ? "desc" : "asc" };
  } else {
    apSort.value = { key, dir: "asc" };
  }
}
function apSortCls(key) {
  if (apSort.value.key !== key) return "";
  return apSort.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
}

function copyApAgingToClipboard() {
  const header = agingHeader(false);
  const rows = apAgingSorted.value.map(r => agingRowValues(r, false).join("\t"));
  const t = apTotals.value;
  rows.push(["Total", t.current, t.days_1_30, t.days_31_60, t.days_61_90, t.days_90_plus, t.total].join("\t"));
  const text = [header.join("\t"), ...rows].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
const plMonthly = ref([]);
const cfMonthly = ref([]);
const cfMaxVal = computed(() => Math.max(
  ...cfMonthly.value.flatMap(m => [Math.abs(m.operating || 0), Math.abs(m.investing || 0), Math.abs(m.financing || 0)]),
  1
));
function cfBarStyle(v) {
  const half = 60;
  const px = Math.round((Math.abs(Number(v) || 0) / cfMaxVal.value) * half);
  return (Number(v) || 0) >= 0
    ? { height: px + "px", bottom: "50%", top: "auto" }
    : { height: px + "px", top: "50%", bottom: "auto" };
}
function monthRangesBetween(from, to) {
  if (!from || !to) return [];
  const start = new Date(from), end = new Date(to);
  if (isNaN(start) || isNaN(end) || start > end) return [];
  const out = [];
  let cur = new Date(start.getFullYear(), start.getMonth(), 1);
  while (cur <= end) {
    const monthStart = new Date(cur.getFullYear(), cur.getMonth(), 1);
    const monthEnd = new Date(cur.getFullYear(), cur.getMonth() + 1, 0);
    const rangeFrom = monthStart < start ? start : monthStart;
    const rangeTo = monthEnd > end ? end : monthEnd;
    out.push({
      from: rangeFrom.toISOString().slice(0, 10),
      to: rangeTo.toISOString().slice(0, 10),
      month: cur.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    });
    cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
  }
  return out;
}
function exportCfCSV() {
  if (!cf.value) return;
  const header = ["Line", "Amount"].join(",");
  const lines = [
    ["Operating Activities", cf.value.operating].join(","),
    ["Investing Activities", cf.value.investing].join(","),
    ["Financing Activities", cf.value.financing].join(","),
    ["Net Change in Cash", cf.value.net_change].join(","),
    ["Opening Cash & Bank", cf.value.opening_cash].join(","),
    ["Closing Cash & Bank", cf.value.closing_cash].join(","),
  ];
  const csv = [header, ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cash_flow_" + toDate.value + ".csv";
  a.click();
  URL.revokeObjectURL(url);
}

const gstTaxDesc = { CGST: "Central Goods and Services Tax", SGST: "State Goods and Services Tax", IGST: "Integrated Goods and Services Tax", UTGST: "Union Territory Goods and Services Tax" };
const gstColors = ["gst-c-blue", "gst-c-emerald", "gst-c-cyan", "gst-c-amber", "gst-c-violet"];
const gstCards = computed(() => (gst.value || []).map((g, i) => ({
  ...g,
  desc: gstTaxDesc[g.tax_type] || "Goods and Services Tax",
  cls: gstColors[i % gstColors.length],
})));
const gstTotalInvoices = computed(() => (gst.value || []).reduce((s, g) => s + (Number(g.invoice_count) || 0), 0));
const gstTotalTax = computed(() => (gst.value || []).reduce((s, g) => s + (Number(g.total_tax) || 0), 0));
function exportGstCSV() {
  if (!gst.value?.length) return;
  const header = ["Tax Type", "Invoice Count", "Total Tax"].join(",");
  const lines = gst.value.map(g => [g.tax_type, g.invoice_count, g.total_tax].join(","));
  lines.push(["Total", gstTotalInvoices.value, gstTotalTax.value].join(","));
  const csv = [header, ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "gst_summary_" + toDate.value + ".csv";
  a.click();
  URL.revokeObjectURL(url);
}
const arLoading = ref(false);
const apLoading = ref(false);
const arRan = ref(false);
const apRan = ref(false);

const itemSales   = ref([]);
const itemsLoading = ref(false);
const itemsRan     = ref(false);

const customerSales   = ref([]);
const customersLoading = ref(false);
const customersRan     = ref(false);

const profitReport   = ref([]);
const profitLoading  = ref(false);
const profitRan      = ref(false);

const invoiceProfit        = ref([]);
const invoiceProfitLoading = ref(false);
const invoiceProfitRan     = ref(false);
const selectedInvoices     = ref(new Set());

const invoiceDetailOpen    = ref(false);
const invoiceDetailLoading = ref(false);
const invoiceDetail        = ref(null);
async function openInvoiceDetail(invoiceName) {
  invoiceDetailOpen.value = true;
  invoiceDetailLoading.value = true;
  invoiceDetail.value = null;
  try {
    invoiceDetail.value = await apiGET("psd_books.db.queries.get_invoice_profit_detail", { invoice: invoiceName });
  } catch {
    invoiceDetail.value = null;
  }
  invoiceDetailLoading.value = false;
}

const stockGl        = ref(null);
const stockGlLoading = ref(false);
const stockGlRan     = ref(false);

const sglExportOpen   = ref(false);
const sglAccRowMenu   = ref(null);
const sglItemRowMenu  = ref(null);
const sglAccSort      = ref({ key: "", dir: "asc" });
const sglItemSort     = ref({ key: "", dir: "asc" });

function genericSort(rows, sortState, strKeys) {
  const key = sortState.key;
  if (!key) return rows;
  const mul = sortState.dir === "desc" ? -1 : 1;
  const val = (r) => strKeys.includes(key) ? String(r[key] || "").toLowerCase() : Number(r[key] || 0);
  return [...rows].sort((a, b) => {
    const x = val(a), y = val(b);
    if (typeof x === "string") return mul * x.localeCompare(y);
    return mul * (x - y);
  });
}

const sglAccountsSorted = computed(() => genericSort(stockGl.value?.accounts || [], sglAccSort.value, ["account"]));
function setSglAccSort(key) {
  sglAccSort.value = sglAccSort.value.key === key
    ? { key, dir: sglAccSort.value.dir === "asc" ? "desc" : "asc" }
    : { key, dir: "asc" };
}
function sglAccSortCls(key) {
  if (sglAccSort.value.key !== key) return "";
  return sglAccSort.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
}

const sglItemsSorted = computed(() => {
  const rows = [...(stockGl.value?.items || [])];
  const key = sglItemSort.value.key;
  if (!key) return rows;
  const mul = sglItemSort.value.dir === "desc" ? -1 : 1;
  const val = (r) => {
    if (key === "item") return String(r.item_name || r.item_code || "").toLowerCase();
    if (key === "warehouse") return String(r.warehouse || "").toLowerCase();
    return Number(r[key] || 0);
  };
  rows.sort((a, b) => {
    const x = val(a), y = val(b);
    if (typeof x === "string") return mul * x.localeCompare(y);
    return mul * (x - y);
  });
  return rows;
});
function setSglItemSort(key) {
  sglItemSort.value = sglItemSort.value.key === key
    ? { key, dir: sglItemSort.value.dir === "asc" ? "desc" : "asc" }
    : { key, dir: "asc" };
}
function sglItemSortCls(key) {
  if (sglItemSort.value.key !== key) return "";
  return sglItemSort.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
}
const sglItemsTotal = computed(() => (stockGl.value?.items || []).reduce((s, r) => s + Number(r.stock_value || 0), 0));

const SGL_ACC_HEADER = ["Inventory Account", "Bin Stock Value", "GL Balance", "Difference", "Status"];
function sglAccRowValues(r) {
  return [r.account, r.bin_stock_value, r.gl_balance, r.difference, r.is_reconciled ? "OK" : "DRIFT"];
}
function copySglAccountRow(row) {
  const text = [SGL_ACC_HEADER.join("\t"), sglAccRowValues(row).join("\t")].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function exportSglAccountsCSV() {
  if (!stockGl.value?.accounts?.length) return;
  const lines = sglAccountsSorted.value.map(r => sglAccRowValues(r).join(","));
  const csv = [SGL_ACC_HEADER.join(","), ...lines].join("\n");
  iwsDownload(csv, "stock_vs_gl_accounts_" + toDate.value + ".csv");
}

const SGL_ITEM_HEADER = ["Item", "Warehouse", "Qty", "Valuation Rate", "Stock Value"];
function sglItemRowValues(r) {
  return [r.item_name || r.item_code, r.warehouse, r.actual_qty, r.valuation_rate, r.stock_value];
}
function copySglItemRow(row) {
  const text = [SGL_ITEM_HEADER.join("\t"), sglItemRowValues(row).join("\t")].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function copySglItemsToClipboard() {
  const rows = sglItemsSorted.value.map(r => sglItemRowValues(r).join("\t"));
  rows.push(["Total", "", "", "", sglItemsTotal.value].join("\t"));
  const text = [SGL_ITEM_HEADER.join("\t"), ...rows].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function exportSglItemRowCSV(row) {
  const csv = [SGL_ITEM_HEADER.join(","), sglItemRowValues(row).join(",")].join("\n");
  const slug = String(row.item_code || row.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_") + "_" + String(row.warehouse || "").replace(/[^A-Za-z0-9_-]+/g, "_");
  iwsDownload(csv, "stock_vs_gl_item_" + slug + ".csv");
}
function exportSglItemsCSV() {
  if (!stockGl.value?.items?.length) return;
  const lines = sglItemsSorted.value.map(r => sglItemRowValues(r).join(","));
  lines.push(["Total", "", "", "", sglItemsTotal.value].join(","));
  const csv = [SGL_ITEM_HEADER.join(","), ...lines].join("\n");
  iwsDownload(csv, "stock_vs_gl_items_" + toDate.value + ".csv");
}

const stockVal        = ref(null);
const stockValLoading = ref(false);
const stockValRan     = ref(false);
const priceMrp          = ref(null);
const priceMrpLoading   = ref(false);
const priceMrpRan       = ref(false);
const priceMrpSearch    = ref("");
const priceMrpWarehouse = ref("");
const priceMrpFiltered  = computed(() => {
  const q = priceMrpSearch.value.trim().toLowerCase();
  return (priceMrp.value?.rows || []).filter(r =>
    (!priceMrpWarehouse.value || r.warehouse === priceMrpWarehouse.value) &&
    (!q || (r.item_code || "").toLowerCase().includes(q) || (r.item_name || "").toLowerCase().includes(q))
  );
});

const dailyMis   = ref(null);
const misLoading = ref(false);
const misRan     = ref(false);

const salesMis        = ref(null);
const salesMisLoading = ref(false);
const salesMisRan     = ref(false);
const salesMisTab     = ref("summary");
const salesTarget     = ref(0);
const salesMisTabs = [
  { key: "summary",     label: "Sales Summary" },
  { key: "target",      label: "Target vs Achievement" },
  { key: "product",     label: "Product-wise" },
  { key: "customer",    label: "Customer-wise" },
  { key: "salesperson", label: "Salesperson-wise" },
  { key: "branch",      label: "Branch / Location-wise" },
  { key: "returns",     label: "Sales Return" },
  { key: "discount",    label: "Discount Analysis" },
  { key: "pending",     label: "Sales Order Pending" },
  { key: "conversion",  label: "Sales Conversion" },
];
const achievementPct = computed(() =>
  salesTarget.value ? (salesMis.value?.summary?.grand_total || 0) / salesTarget.value * 100 : 0
);

const receivablesMis     = ref(null);
const receivablesLoading = ref(false);
const receivablesRan     = ref(false);
const receivablesTab     = ref("total");
const collectionTarget   = ref(0);
const receivablesTabs = [
  { key: "total",       label: "Total Receivables" },
  { key: "outstanding", label: "Customer Outstanding" },
  { key: "ageing",      label: "Ageing" },
  { key: "coll_target", label: "Collection Target vs Achievement" },
  { key: "daily_coll",  label: "Daily Collection" },
  { key: "overdue",     label: "Overdue Collection" },
  { key: "credit",      label: "Credit Limit & Utilisation" },
  { key: "efficiency",  label: "Collection Efficiency" },
];
const collAchievementPct = computed(() =>
  collectionTarget.value ? (receivablesMis.value?.daily_collection?.total || 0) / collectionTarget.value * 100 : 0
);

const purchaseMis        = ref(null);
const purchaseMisLoading = ref(false);
const purchaseMisRan     = ref(false);
const purchaseMisTab     = ref("summary");
const purchaseTarget     = ref(0);
const purchaseMisTabs = [
  { key: "summary",           label: "Purchase Summary" },
  { key: "supplier",          label: "Supplier-wise" },
  { key: "product",           label: "Product-wise" },
  { key: "target",            label: "Target / Budget vs Actual" },
  { key: "price_variance",    label: "Price Variance" },
  { key: "pending_po",        label: "Pending Purchase Orders" },
  { key: "pending_receipts",  label: "Pending Material Receipts" },
  { key: "returns",           label: "Purchase Return" },
];
const purchaseAchievementPct = computed(() =>
  purchaseTarget.value ? (purchaseMis.value?.summary?.grand_total || 0) / purchaseTarget.value * 100 : 0
);

const inventoryMis        = ref(null);
const inventoryMisLoading = ref(false);
const inventoryMisRan     = ref(false);
const inventoryMisTab     = ref("current_stock");
const inventoryMisTabs = [
  { key: "current_stock", label: "Current Stock" },
  { key: "stock_value",   label: "Stock Value" },
  { key: "fast_moving",   label: "Fast Moving Items" },
  { key: "slow_moving",   label: "Slow Moving Items" },
  { key: "dead_stock",    label: "Non-moving / Dead Stock" },
  { key: "ageing",        label: "Stock Ageing" },
  { key: "reorder",       label: "Reorder / Low Stock" },
  { key: "excess",        label: "Excess Stock" },
  { key: "adjustment",    label: "Stock Adjustment" },
  { key: "loss",          label: "Stock Loss / Shortage" },
];

const productionMis        = ref(null);
const productionMisLoading = ref(false);
const productionMisRan     = ref(false);
const productionMisTab     = ref("plan_vs_actual");
const productionMisTabs = [
  { key: "plan_vs_actual",         label: "Production Plan vs Actual" },
  { key: "pending",                label: "Production Pending" },
  { key: "wip",                    label: "WIP Status" },
  { key: "material_availability",  label: "Raw Material Availability" },
  { key: "material_consumption",   label: "Material Consumption" },
  { key: "material_variance",      label: "Material Variance" },
  { key: "production_cost",        label: "Production Cost" },
  { key: "efficiency",             label: "Production Efficiency" },
  { key: "rejection",              label: "Rejection / Rework" },
  { key: "scrap",                  label: "Scrap / Wastage" },
];

const productMis        = ref(null);
const productMisLoading = ref(false);
const productMisRan     = ref(false);
const productMisTab     = ref("sales");
const productMisTabs = [
  { key: "sales",       label: "Product-wise Sales" },
  { key: "profit",      label: "Product-wise Profit" },
  { key: "cost",        label: "Product-wise Cost" },
  { key: "margin",      label: "Product-wise Margin %" },
  { key: "production",  label: "Product-wise Production" },
  { key: "stock",       label: "Product-wise Stock" },
  { key: "wastage",     label: "Product-wise Wastage" },
  { key: "top_selling", label: "Top Selling Products" },
  { key: "low_selling", label: "Low Selling Products" },
];

const dispatchMis        = ref(null);
const dispatchMisLoading = ref(false);
const dispatchMisRan     = ref(false);
const dispatchMisTab     = ref("summary");
const dispatchMisTabs = [
  { key: "summary",          label: "Dispatch Summary" },
  { key: "pending_dispatch", label: "Pending Dispatch" },
  { key: "delivery_pending", label: "Delivery Pending" },
  { key: "delayed_delivery", label: "Delayed Delivery" },
  { key: "customer_pending", label: "Customer-wise Pending Delivery" },
  { key: "transport_wise",   label: "Transport-wise Dispatch" },
];

const orderMis        = ref(null);
const orderMisLoading = ref(false);
const orderMisRan     = ref(false);
const orderMisTab     = ref("summary");
const orderMisTabs = [
  { key: "summary",            label: "Summary" },
  { key: "total",               label: "Total Orders" },
  { key: "new",                 label: "New Orders" },
  { key: "pending",             label: "Pending Orders" },
  { key: "under_production",    label: "Orders Under Production" },
  { key: "ready_for_dispatch",  label: "Orders Ready for Dispatch" },
  { key: "delayed",             label: "Delayed Orders" },
  { key: "delivered",           label: "Delivered Orders" },
  { key: "cancelled",           label: "Cancelled Orders" },
  { key: "order_value",         label: "Order Value" },
  { key: "profitability",       label: "Order-wise Profitability" },
];

const profitabilityMis        = ref(null);
const profitabilityMisLoading = ref(false);
const profitabilityMisRan     = ref(false);
const profitabilityMisTab     = ref("summary");
const profitabilityMisTabs = [
  { key: "summary",       label: "Summary" },
  { key: "product",       label: "Product-wise Profit" },
  { key: "customer",      label: "Customer-wise Profit" },
  { key: "order",         label: "Order-wise Profit" },
  { key: "branch",        label: "Branch-wise Profit" },
  { key: "salesperson",   label: "Salesperson-wise Profit" },
  { key: "monthly_trend", label: "Monthly Profit Trend" },
];

const expenseMis        = ref(null);
const expenseMisLoading = ref(false);
const expenseMisRan     = ref(false);
const expenseMisTab     = ref("summary");
const expenseMisTabs = [
  { key: "summary",    label: "Total Expenses" },
  { key: "department", label: "Department-wise" },
  { key: "category",   label: "Expense Category-wise" },
  { key: "budget",     label: "Budget vs Actual" },
  { key: "fixed",      label: "Fixed Expenses" },
  { key: "variable",   label: "Variable Expenses" },
  { key: "trend",      label: "Expense Trend" },
  { key: "unusual",    label: "Unusual / Excess" },
];

const payablesMis        = ref(null);
const payablesMisLoading = ref(false);
const payablesMisRan     = ref(false);
const payablesMisTab     = ref("summary");
const payablesMisTabs = [
  { key: "summary",   label: "Supplier Outstanding" },
  { key: "ageing",    label: "Payable Ageing" },
  { key: "overdue",   label: "Overdue Payables" },
  { key: "due_week",  label: "Due This Week" },
  { key: "due_month", label: "Due This Month" },
  { key: "supplier",  label: "Supplier-wise Outstanding" },
  { key: "forecast",  label: "Payment Due Forecast" },
];

const cashBankMis        = ref(null);
const cashBankMisLoading = ref(false);
const cashBankMisRan     = ref(false);
const cashBankMisTab     = ref("cash_position");
const cashBankMisTabs = [
  { key: "cash_position",    label: "Cash Position" },
  { key: "bank_balance",     label: "Bank Balance" },
  { key: "daily_cash",       label: "Daily Cash Flow" },
  { key: "daily_bank",       label: "Daily Bank Movement" },
  { key: "receipts",         label: "Receipts" },
  { key: "payments",         label: "Payments" },
  { key: "forecast",         label: "Cash Forecast" },
  { key: "fund_requirement", label: "Fund Requirement" },
];

const customerMis        = ref(null);
const customerMisLoading = ref(false);
const customerMisRan     = ref(false);
const customerMisTab     = ref("new_customers");
const customerMisTabs = [
  { key: "new_customers",             label: "New Customers" },
  { key: "active_customers",          label: "Active Customers" },
  { key: "repeat_customers",          label: "Repeat Customers" },
  { key: "customer_wise_sales",       label: "Customer-wise Sales" },
  { key: "customer_wise_outstanding", label: "Customer-wise Outstanding" },
  { key: "customer_wise_profit",      label: "Customer-wise Profit" },
  { key: "customer_retention",        label: "Customer Retention" },
  { key: "top_customers",             label: "Top Customers" },
  { key: "inactive_customers",        label: "Inactive Customers" },
];

const supplierMis        = ref(null);
const supplierMisLoading = ref(false);
const supplierMisRan     = ref(false);
const supplierMisTab     = ref("supplier_wise_purchase");
const supplierMisTabs = [
  { key: "supplier_wise_purchase",   label: "Supplier-wise Purchase" },
  { key: "supplier_outstanding",     label: "Supplier Outstanding" },
  { key: "supplier_payment_ageing",  label: "Supplier Payment Ageing" },
  { key: "purchase_price_comparison", label: "Purchase Price Comparison" },
  { key: "supplier_performance",     label: "Supplier Performance" },
  { key: "delivery_performance",     label: "Delivery Performance" },
  { key: "quality_rejection",        label: "Quality / Rejection" },
];

const employeeMis        = ref(null);
const employeeMisLoading = ref(false);
const employeeMisRan     = ref(false);
const employeeMisTab     = ref("employee_attendance");
const employeeMisTabs = [
  { key: "employee_attendance",    label: "Employee Attendance" },
  { key: "department_manpower",    label: "Department-wise Manpower" },
  { key: "salesperson_target",     label: "Salesperson Target vs Achievement" },
  { key: "salesperson_collection", label: "Salesperson Collection" },
  { key: "production_productivity", label: "Production Employee Productivity" },
  { key: "overtime",               label: "Overtime" },
  { key: "labour_cost",            label: "Labour Cost" },
  { key: "employee_performance",   label: "Employee Performance" },
];
const spTargets = ref({}); // sales_person -> client-entered target (not stored), for Salesperson Target vs Achievement
function spAchievementPct(r) {
  const target = spTargets.value[r.sales_person];
  return target ? (Number(r.total_amount) / target * 100) : 0;
}

function exportBsCSV() {
  const header = ["Section", "Line", "Amount"].join(",");
  const lines = [];
  bsGroups.value.forEach(g => {
    lines.push([g.label, "", g.total].join(","));
    g.items.forEach(it => lines.push([g.label, it.label, it.value].join(",")));
  });
  const csv = [header, ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "balance_sheet_" + toDate.value + ".csv";
  a.click();
  URL.revokeObjectURL(url);
}

const bsBalanced = computed(() => {
  if (!bs.value) return false;
  const a = Number(bs.value.total_assets) || 0;
  const l = Number(bs.value.total_liabilities) || 0;
  const e = Number(bs.value.total_equity) || 0;
  return Math.abs(a - (l + e)) < 1;
});
const bsExpanded = ref({ assets: true, liabilities: true, equity: true });
function bsToggle(key) { bsExpanded.value[key] = !bsExpanded.value[key]; }
const bsGroups = computed(() => {
  const b = bs.value || {};
  const n = (v) => Number(v) || 0;
  return [
    {
      key: "assets", label: "Assets", desc: "What the business owns",
      total: n(b.total_assets), cls: "bs-acc-assets",
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>`,
      items: [
        { label: "Current Assets", desc: "Cash, Bank, Debtors, Stock, etc.",
          value: n(b.cash_and_bank) + n(b.receivables) + n(b.inventory_value),
          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 10h20"/><circle cx="7" cy="14.5" r="1"/></svg>` },
        { label: "Non-Current Assets", desc: "Fixed Assets, Investments, etc.",
          value: n(b.other_assets) + n(b.itc_receivable),
          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M4 21V9l8-6 8 6v12"/><path d="M9 21v-6h6v6"/></svg>` },
      ],
    },
    {
      key: "liabilities", label: "Liabilities", desc: "What the business owes",
      total: n(b.total_liabilities), cls: "bs-acc-liabilities",
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
      items: [
        { label: "Current Liabilities", desc: "Creditors, Short-term Loans, etc.",
          value: n(b.payables) + n(b.gst_liability) + n(b.stock_received_not_billed),
          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 20c.2-2.3 1.9-4 4-4"/></svg>` },
        { label: "Non-Current Liabilities", desc: "Long-term Loans, Provisions, etc.",
          value: n(b.other_liabilities),
          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l3 3v17H6z"/><path d="M15 2v3h3"/><path d="M9 12h6M9 16h6"/></svg>` },
      ],
    },
    {
      key: "equity", label: "Equity", desc: "Owner's interest in the business",
      total: n(b.total_equity), cls: "bs-acc-equity",
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="17" y="3" width="4" height="18"/></svg>`,
      items: [
        { label: "Capital", desc: "", value: n(b.equity_capital),
          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>` },
        { label: "Retained Earnings", desc: "", value: n(b.retained_earnings),
          icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v9l6 3"/></svg>` },
      ],
    },
  ];
});
const maxMonthlyVal = computed(() => Math.max(...plMonthly.value.flatMap(m => [m.income||0, m.expense||0]), 1));
function barH(v) { return Math.round((Math.max(0,v) / maxMonthlyVal.value) * 130); }
const chartTicks = computed(() => {
  const max = maxMonthlyVal.value;
  return [max, max*0.66, max*0.33, 0].map(v => Math.round(v));
});
function fmtDate(d) {
  if (!d) return "";
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
const trendPeriod = ref("monthly");
function pctChange(curr, prev) {
  if (prev == null || curr == null) return null;
  if (prev === 0) return curr === 0 ? 0 : null;
  return ((curr - prev) / Math.abs(prev)) * 100;
}
const prevMonthPl = computed(() => plMonthly.value.length > 1 ? plMonthly.value[plMonthly.value.length - 2] : null);
const currMonthPl = computed(() => plMonthly.value.length ? plMonthly.value[plMonthly.value.length - 1] : null);
const incomeChangePct = computed(() => currMonthPl.value && prevMonthPl.value ? pctChange(currMonthPl.value.income, prevMonthPl.value.income) : null);
const expenseChangePct = computed(() => currMonthPl.value && prevMonthPl.value ? pctChange(currMonthPl.value.expense, prevMonthPl.value.expense) : null);
const netChangePct = computed(() => {
  if (!currMonthPl.value || !prevMonthPl.value) return null;
  return pctChange((currMonthPl.value.income||0) - (currMonthPl.value.expense||0), (prevMonthPl.value.income||0) - (prevMonthPl.value.expense||0));
});
function trendClass(pct, invert) {
  if (pct === null) return "muted";
  if (pct === 0) return "neutral";
  const up = pct > 0;
  const good = invert ? !up : up;
  return good ? "up" : "down";
}
function trendText(pct) {
  if (pct === null) return "— No change";
  if (pct === 0) return "— No change";
  const arrow = pct > 0 ? "↑" : "↓";
  return `${arrow} ${Math.abs(Math.round(pct))}% vs previous period`;
}
const plInsights = computed(() => {
  if (!pl.value) return [];
  const out = [];
  if (Number(pl.value.total_expense) > Number(pl.value.total_income)) {
    out.push({ icon: "↗", tone: "warn", title: "Expenses are higher", desc: "Your expenses are higher than income in this period." });
  }
  if (Number(pl.value.net_profit) < 0) {
    out.push({ icon: "↘", tone: "loss", title: "Net loss", desc: `You had a net loss of ${fmt(Math.abs(pl.value.net_profit))} in the selected period.` });
  } else if (Number(pl.value.net_profit) > 0) {
    out.push({ icon: "↗", tone: "good", title: "Net profit", desc: `You made a net profit of ${fmt(pl.value.net_profit)} in the selected period.` });
  }
  return out;
});

const profitTotal = computed(() => profitReport.value.filter(r => r.cost_rate).reduce((s,r) => s + Number(r.profit||0), 0));
const profitMarginTotal = computed(() => {
  const priced = profitReport.value.filter(r => r.cost_rate);
  const revenue = priced.reduce((s,r) => s + Number(r.revenue||0), 0);
  const profit = priced.reduce((s,r) => s + Number(r.profit||0), 0);
  return revenue !== 0 ? (profit / revenue) * 100 : 0;
});
const noCostDataCount = computed(() => profitReport.value.filter(r => !r.cost_rate).length);

const pwExportOpen = ref(false);
const pwRowMenu     = ref(null);
const pwSort        = ref({ key: "", dir: "asc" });

const profitReportSorted = computed(() => {
  const rows = [...(profitReport.value || [])];
  const key = pwSort.value.key;
  if (!key) return rows;
  const mul = pwSort.value.dir === "desc" ? -1 : 1;
  const val = (r) => key === "item"
    ? String(r.item_name || r.item_code || "").toLowerCase()
    : Number(r[key] || 0);
  rows.sort((a, b) => {
    const x = val(a), y = val(b);
    if (typeof x === "string") return mul * x.localeCompare(y);
    return mul * (x - y);
  });
  return rows;
});

function setPwSort(key) {
  if (pwSort.value.key === key) {
    pwSort.value = { key, dir: pwSort.value.dir === "asc" ? "desc" : "asc" };
  } else {
    pwSort.value = { key, dir: "asc" };
  }
}
function pwSortCls(key) {
  if (pwSort.value.key !== key) return "";
  return pwSort.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
}

const PW_HEADER = ["Item", "Qty Sold", "Revenue", "Cost Rate", "Total Cost", "Profit", "Margin %"];
function pwRowValues(r) {
  return [r.item_name || r.item_code, r.qty_sold, r.revenue, r.cost_rate, r.total_cost, r.profit, Number(r.margin_pct||0).toFixed(1)];
}
function copyProfitToClipboard() {
  const rows = profitReportSorted.value.map(r => pwRowValues(r).join("\t"));
  const text = [PW_HEADER.join("\t"), ...rows].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function copyProfitRow(row) {
  const text = [PW_HEADER.join("\t"), pwRowValues(row).join("\t")].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function exportProfitRowCSV(row) {
  const csv = [PW_HEADER.join(","), pwRowValues(row).join(",")].join("\n");
  const slug = String(row.item_code || row.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_");
  iwsDownload(csv, "profit_wise_report_" + slug + "_" + fromDate.value + "_to_" + toDate.value + ".csv");
}

const invoiceProfitSelectedRows = computed(() =>
  invoiceProfit.value.filter(r => selectedInvoices.value.has(r.invoice))
);
const invoiceProfitAllSelected = computed(() =>
  invoiceProfit.value.length > 0 && selectedInvoices.value.size === invoiceProfit.value.length
);
function toggleInvoiceSelection(invoice) {
  const s = new Set(selectedInvoices.value);
  if (s.has(invoice)) s.delete(invoice); else s.add(invoice);
  selectedInvoices.value = s;
}
function toggleAllInvoiceSelection() {
  selectedInvoices.value = invoiceProfitAllSelected.value
    ? new Set()
    : new Set(invoiceProfit.value.map(r => r.invoice));
}
function sumField(rows, field) { return rows.reduce((s, r) => s + Number(r[field] || 0), 0); }
const invoiceProfitTotals = computed(() => ({
  revenue: sumField(invoiceProfit.value, "revenue"),
  total_cost: sumField(invoiceProfit.value, "total_cost"),
  profit: sumField(invoiceProfit.value, "profit"),
}));
const invoiceProfitSelectedTotals = computed(() => ({
  count: invoiceProfitSelectedRows.value.length,
  revenue: sumField(invoiceProfitSelectedRows.value, "revenue"),
  total_cost: sumField(invoiceProfitSelectedRows.value, "total_cost"),
  profit: sumField(invoiceProfitSelectedRows.value, "profit"),
}));

const ipExportOpen = ref(false);
const ipRowMenu     = ref(null);
const ipSort        = ref({ key: "", dir: "asc" });

const invoiceProfitSorted = computed(() => {
  const rows = [...(invoiceProfit.value || [])];
  const key = ipSort.value.key;
  if (!key) return rows;
  const mul = ipSort.value.dir === "desc" ? -1 : 1;
  const val = (r) => {
    if (key === "invoice" || key === "posting_date") return String(r[key] || "");
    if (key === "customer") return String(r.customer_name || r.customer || "").toLowerCase();
    return Number(r[key] || 0);
  };
  rows.sort((a, b) => {
    const x = val(a), y = val(b);
    if (typeof x === "string") return mul * x.localeCompare(y);
    return mul * (x - y);
  });
  return rows;
});

function setIpSort(key) {
  if (ipSort.value.key === key) {
    ipSort.value = { key, dir: ipSort.value.dir === "asc" ? "desc" : "asc" };
  } else {
    ipSort.value = { key, dir: "asc" };
  }
}
function ipSortCls(key) {
  if (ipSort.value.key !== key) return "";
  return ipSort.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
}

const IP_HEADER = ["Invoice", "Date", "Customer", "Revenue", "Est. Cost", "Profit", "Margin %"];
function ipRowValues(r) {
  return [r.invoice, r.posting_date, r.customer_name || r.customer, r.revenue, r.total_cost, r.profit, Number(r.margin_pct||0).toFixed(1)];
}
function copyInvoiceProfitToClipboard() {
  const rows = (selectedInvoices.value.size ? invoiceProfitSelectedRows.value : invoiceProfitSorted.value).map(r => ipRowValues(r).join("\t"));
  const text = [IP_HEADER.join("\t"), ...rows].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function copyInvoiceProfitRow(row) {
  const text = [IP_HEADER.join("\t"), ipRowValues(row).join("\t")].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function exportInvoiceProfitRowCSV(row) {
  const csv = [IP_HEADER.join(","), ipRowValues(row).join(",")].join("\n");
  iwsDownload(csv, "invoice_profitability_" + row.invoice + ".csv");
}

async function runReport() {
  const needsRange = !['ar','ap','stockval','price_mrp','payables_mis'].includes(activeReport.value);
  if (needsRange && fromDate.value && toDate.value && fromDate.value > toDate.value) {
    alert("From date cannot be after To date.");
    return;
  }
  const company = await resolveCompany();
  // Blank From/To means "no filter, show everything" — let the backend
  // default to the widest possible range rather than sending an
  // empty string that would match nothing.
  const args = { company, from_date: fromDate.value || "", to_date: toDate.value || "" };
  if (activeReport.value === "pl") {
    await loadPl(args);
    try {
      plMonthly.value = await apiGET("psd_books.db.queries.get_pl_monthly_breakdown", args) || [];
    } catch { plMonthly.value = []; }
  }
  if (activeReport.value === "bs")  await loadBs({ company, as_of_date: toDate.value });
  if (activeReport.value === "cf") {
    await loadCf(args);
    try {
      const months = monthRangesBetween(fromDate.value, toDate.value);
      const results = await Promise.all(months.map(m =>
        apiGET("psd_books.db.queries.get_cash_flow", { company, from_date: m.from, to_date: m.to })
      ));
      cfMonthly.value = months.map((m, i) => ({ month: m.month, ...(results[i] || {}) }));
    } catch { cfMonthly.value = []; }
  }
  if (activeReport.value === "gst") await loadGst(args);
  if (activeReport.value === "tb")  await loadTb(args);
  if (activeReport.value === "ar") {
    arLoading.value = true; arRan.value = true;
    try { arAging.value = await apiGET("psd_books.db.queries.get_ar_aging", { company, as_of_date: toDate.value }) || []; }
    catch { arAging.value = []; }
    arLoading.value = false;
  }
  if (activeReport.value === "ap") {
    apLoading.value = true; apRan.value = true;
    try { apAging.value = await apiGET("psd_books.db.queries.get_ap_aging", { company, as_of_date: toDate.value }) || []; }
    catch { apAging.value = []; }
    apLoading.value = false;
  }
  if (activeReport.value === "items") {
    itemsLoading.value = true; itemsRan.value = true;
    try { itemSales.value = await apiGET("psd_books.db.queries.get_item_wise_sales", args) || []; }
    catch { itemSales.value = []; }
    itemsLoading.value = false;
  }
  if (activeReport.value === "customers") {
    customersLoading.value = true; customersRan.value = true;
    try { customerSales.value = await apiGET("psd_books.db.queries.get_customer_wise_sales", args) || []; }
    catch { customerSales.value = []; }
    customersLoading.value = false;
  }
  if (activeReport.value === "profit") {
    profitLoading.value = true; profitRan.value = true;
    try { profitReport.value = await apiGET("psd_books.db.queries.get_profit_wise_report", args) || []; }
    catch { profitReport.value = []; }
    profitLoading.value = false;
  }
  if (activeReport.value === "invoice_profit") {
    invoiceProfitLoading.value = true; invoiceProfitRan.value = true;
    selectedInvoices.value = new Set();
    try { invoiceProfit.value = await apiGET("psd_books.db.queries.get_invoice_wise_profit", args) || []; }
    catch { invoiceProfit.value = []; }
    invoiceProfitLoading.value = false;
  }
  if (activeReport.value === "stockgl") {
    stockGlLoading.value = true; stockGlRan.value = true;
    try { stockGl.value = await apiGET("psd_books.db.queries.get_inventory_reconciliation", { company }) || null; }
    catch { stockGl.value = null; }
    stockGlLoading.value = false;
  }
  if (activeReport.value === "stockval") {
    stockValLoading.value = true; stockValRan.value = true;
    try { stockVal.value = await apiGET("psd_books.api.inventory.get_stock_valuation_report", { as_of_date: toDate.value }) || null; }
    catch { stockVal.value = null; }
    stockValLoading.value = false;
  }
  if (activeReport.value === "price_mrp") {
    priceMrpLoading.value = true; priceMrpRan.value = true;
    try { priceMrp.value = await apiGET("psd_books.api.inventory.get_selling_mrp_report", {}) || null; }
    catch { priceMrp.value = null; }
    priceMrpLoading.value = false;
  }
  if (activeReport.value === "mis") {
    misLoading.value = true; misRan.value = true;
    try { dailyMis.value = await apiGET("psd_books.db.queries.get_daily_business_mis", args) || null; }
    catch { dailyMis.value = null; }
    misLoading.value = false;
  }
  if (activeReport.value === "sales_mis") {
    salesMisLoading.value = true; salesMisRan.value = true;
    try { salesMis.value = await apiGET("psd_books.db.queries.get_sales_mis", args) || null; }
    catch { salesMis.value = null; }
    salesMisLoading.value = false;
  }
  if (activeReport.value === "receivables") {
    receivablesLoading.value = true; receivablesRan.value = true;
    try { receivablesMis.value = await apiGET("psd_books.db.queries.get_receivables_mis", args) || null; }
    catch { receivablesMis.value = null; }
    receivablesLoading.value = false;
  }
  if (activeReport.value === "purchase_mis") {
    purchaseMisLoading.value = true; purchaseMisRan.value = true;
    try { purchaseMis.value = await apiGET("psd_books.db.queries.get_purchase_mis", args) || null; }
    catch { purchaseMis.value = null; }
    purchaseMisLoading.value = false;
  }
  if (activeReport.value === "inventory_mis") {
    inventoryMisLoading.value = true; inventoryMisRan.value = true;
    try { inventoryMis.value = await apiGET("psd_books.db.queries.get_inventory_mis", args) || null; }
    catch { inventoryMis.value = null; }
    inventoryMisLoading.value = false;
  }
  if (activeReport.value === "production_mis") {
    productionMisLoading.value = true; productionMisRan.value = true;
    try { productionMis.value = await apiGET("psd_books.db.queries.get_production_mis", args) || null; }
    catch { productionMis.value = null; }
    productionMisLoading.value = false;
  }
  if (activeReport.value === "product_mis") {
    productMisLoading.value = true; productMisRan.value = true;
    try { productMis.value = await apiGET("psd_books.db.queries.get_product_mis", args) || null; }
    catch { productMis.value = null; }
    productMisLoading.value = false;
  }
  if (activeReport.value === "dispatch_mis") {
    dispatchMisLoading.value = true; dispatchMisRan.value = true;
    try { dispatchMis.value = await apiGET("psd_books.db.queries.get_dispatch_delivery_mis", args) || null; }
    catch { dispatchMis.value = null; }
    dispatchMisLoading.value = false;
  }
  if (activeReport.value === "order_mis") {
    orderMisLoading.value = true; orderMisRan.value = true;
    try { orderMis.value = await apiGET("psd_books.db.queries.get_order_mis", args) || null; }
    catch { orderMis.value = null; }
    orderMisLoading.value = false;
  }
  if (activeReport.value === "profitability_mis") {
    profitabilityMisLoading.value = true; profitabilityMisRan.value = true;
    try { profitabilityMis.value = await apiGET("psd_books.db.queries.get_profitability_mis", args) || null; }
    catch { profitabilityMis.value = null; }
    profitabilityMisLoading.value = false;
  }
  if (activeReport.value === "expense_mis") {
    expenseMisLoading.value = true; expenseMisRan.value = true;
    try { expenseMis.value = await apiGET("psd_books.db.queries.get_expense_mis", args) || null; }
    catch { expenseMis.value = null; }
    expenseMisLoading.value = false;
  }
  if (activeReport.value === "payables_mis") {
    payablesMisLoading.value = true; payablesMisRan.value = true;
    try { payablesMis.value = await apiGET("psd_books.db.queries.get_payables_mis", { company, as_of_date: toDate.value }) || null; }
    catch { payablesMis.value = null; }
    payablesMisLoading.value = false;
  }
  if (activeReport.value === "cash_bank_mis") {
    cashBankMisLoading.value = true; cashBankMisRan.value = true;
    try { cashBankMis.value = await apiGET("psd_books.db.queries.get_cash_bank_mis", args) || null; }
    catch { cashBankMis.value = null; }
    cashBankMisLoading.value = false;
  }
  if (activeReport.value === "customer_mis") {
    customerMisLoading.value = true; customerMisRan.value = true;
    try { customerMis.value = await apiGET("psd_books.db.queries.get_customer_mis", args) || null; }
    catch { customerMis.value = null; }
    customerMisLoading.value = false;
  }
  if (activeReport.value === "supplier_mis") {
    supplierMisLoading.value = true; supplierMisRan.value = true;
    try { supplierMis.value = await apiGET("psd_books.db.queries.get_supplier_mis", args) || null; }
    catch { supplierMis.value = null; }
    supplierMisLoading.value = false;
  }
  if (activeReport.value === "employee_mis") {
    employeeMisLoading.value = true; employeeMisRan.value = true;
    try { employeeMis.value = await apiGET("psd_books.db.queries.get_employee_mis", args) || null; }
    catch { employeeMis.value = null; }
    employeeMisLoading.value = false;
  }
}

const iwsExportOpen = ref(false);
const iwsRowMenu    = ref(null);
const iwsSort       = ref({ key: "", dir: "asc" });

const itemsTotals = computed(() => (itemSales.value || []).reduce((acc, r) => ({
  invoices: acc.invoices + (Number(r.invoice_count) || 0),
  qty:      acc.qty      + (Number(r.qty_sold) || 0),
  discount: acc.discount + (Number(r.total_discount) || 0),
  amount:   acc.amount   + (Number(r.total_amount) || 0),
}), { invoices: 0, qty: 0, discount: 0, amount: 0 }));

const itemSalesSorted = computed(() => {
  const rows = [...(itemSales.value || [])];
  const key = iwsSort.value.key;
  if (!key) return rows;
  const mul = iwsSort.value.dir === "desc" ? -1 : 1;
  const val = (r) => {
    if (key === "item") return String(r.item_name || r.item_code || "").toLowerCase();
    if (key === "uom")  return String(r.uom || "").toLowerCase();
    return Number(r[key] || 0);
  };
  rows.sort((a, b) => {
    const x = val(a), y = val(b);
    if (typeof x === "string") return mul * x.localeCompare(y);
    return mul * (x - y);
  });
  return rows;
});

function setIwsSort(key) {
  if (iwsSort.value.key === key) {
    iwsSort.value = { key, dir: iwsSort.value.dir === "asc" ? "desc" : "asc" };
  } else {
    iwsSort.value = { key, dir: "asc" };
  }
}
function iwsSortCls(key) {
  if (iwsSort.value.key !== key) return "";
  return iwsSort.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
}

const IWS_HEADER = ["Item", "UOM", "Invoices", "Qty Sold", "Avg Rate", "Discount", "Total Amount"];
function iwsRowValues(r) {
  return [r.item_name || r.item_code, r.uom || "", r.invoice_count, r.qty_sold, r.avg_rate, r.total_discount || 0, r.total_amount];
}
function iwsDownload(csv, name) {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
function copyItemSalesToClipboard() {
  const rows = itemSalesSorted.value.map(r => iwsRowValues(r).join("\t"));
  const t = itemsTotals.value;
  rows.push(["Total", "", t.invoices, t.qty, "", t.discount, t.amount].join("\t"));
  const text = [IWS_HEADER.join("\t"), ...rows].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function copyItemRow(row) {
  const text = [IWS_HEADER.join("\t"), iwsRowValues(row).join("\t")].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function exportItemRowCSV(row) {
  const csv = [IWS_HEADER.join(","), iwsRowValues(row).join(",")].join("\n");
  const slug = String(row.item_code || row.item_name || "item").replace(/[^A-Za-z0-9_-]+/g, "_");
  iwsDownload(csv, "item_wise_sales_" + slug + "_" + fromDate.value + "_to_" + toDate.value + ".csv");
}

function exportItemSalesCSV() {
  if (!itemSales.value?.length) return;
  const lines = itemSalesSorted.value.map(r => iwsRowValues(r).join(","));
  const t = itemsTotals.value;
  lines.push(["Total", "", t.invoices, t.qty, "", t.discount, t.amount].join(","));
  const csv = [IWS_HEADER.join(","), ...lines].join("\n");
  iwsDownload(csv, "item_wise_sales_" + fromDate.value + "_to_" + toDate.value + ".csv");
}

const cwsExportOpen = ref(false);
const cwsRowMenu    = ref(null);
const cwsSort       = ref({ key: "", dir: "asc" });

const custTotals = computed(() => (customerSales.value || []).reduce((acc, r) => ({
  invoices:    acc.invoices    + (Number(r.invoice_count) || 0),
  net:         acc.net         + (Number(r.net_total) || 0),
  discount:    acc.discount    + (Number(r.total_discount) || 0),
  tax:         acc.tax         + (Number(r.total_tax) || 0),
  outstanding: acc.outstanding + (Number(r.outstanding_amount) || 0),
  amount:      acc.amount      + (Number(r.total_amount) || 0),
}), { invoices: 0, net: 0, discount: 0, tax: 0, outstanding: 0, amount: 0 }));

const customerSalesSorted = computed(() => {
  const rows = [...(customerSales.value || [])];
  const key = cwsSort.value.key;
  if (!key) return rows;
  const mul = cwsSort.value.dir === "desc" ? -1 : 1;
  const val = (r) => key === "customer"
    ? String(r.customer_name || r.customer || "").toLowerCase()
    : Number(r[key] || 0);
  rows.sort((a, b) => {
    const x = val(a), y = val(b);
    if (typeof x === "string") return mul * x.localeCompare(y);
    return mul * (x - y);
  });
  return rows;
});

function setCwsSort(key) {
  if (cwsSort.value.key === key) {
    cwsSort.value = { key, dir: cwsSort.value.dir === "asc" ? "desc" : "asc" };
  } else {
    cwsSort.value = { key, dir: "asc" };
  }
}
function cwsSortCls(key) {
  if (cwsSort.value.key !== key) return "";
  return cwsSort.value.dir === "asc" ? "iws-sort-asc" : "iws-sort-desc";
}

const CWS_HEADER = ["Customer", "Invoices", "Net Total", "Discount", "Tax", "Avg Invoice", "Outstanding", "Total Amount"];
function cwsRowValues(r) {
  return [r.customer_name || r.customer, r.invoice_count, r.net_total, r.total_discount || 0, r.total_tax, r.avg_invoice_value, r.outstanding_amount || 0, r.total_amount];
}
function copyCustomerSalesToClipboard() {
  const rows = customerSalesSorted.value.map(r => cwsRowValues(r).join("\t"));
  const t = custTotals.value;
  rows.push(["Total", t.invoices, t.net, t.discount, t.tax, "", t.outstanding, t.amount].join("\t"));
  const text = [CWS_HEADER.join("\t"), ...rows].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function copyCustomerRow(row) {
  const text = [CWS_HEADER.join("\t"), cwsRowValues(row).join("\t")].join("\n");
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text);
}
function exportCustomerRowCSV(row) {
  const csv = [CWS_HEADER.join(","), cwsRowValues(row).join(",")].join("\n");
  const slug = String(row.customer || row.customer_name || "customer").replace(/[^A-Za-z0-9_-]+/g, "_");
  iwsDownload(csv, "customer_wise_sales_" + slug + "_" + fromDate.value + "_to_" + toDate.value + ".csv");
}

function exportCustomerSalesCSV() {
  if (!customerSales.value?.length) return;
  const header = CWS_HEADER.join(",");
  const lines = customerSalesSorted.value.map(r => cwsRowValues(r).join(","));
  const t = custTotals.value;
  lines.push(["Total", t.invoices, t.net, t.discount, t.tax, "", t.outstanding, t.amount].join(","));
  const csv = [header, ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "customer_wise_sales_" + fromDate.value + "_to_" + toDate.value + ".csv";
  a.click();
  URL.revokeObjectURL(url);
}

function exportProfitCSV() {
  if (!profitReport.value?.length) return;
  const lines = profitReportSorted.value.map(r => pwRowValues(r).join(","));
  const csv = [PW_HEADER.join(","), ...lines].join("\n");
  iwsDownload(csv, "profit_wise_report_" + fromDate.value + "_to_" + toDate.value + ".csv");
}

function exportInvoiceProfitCSV() {
  if (!invoiceProfit.value?.length) return;
  const rows = invoiceProfitSelectedRows.value.length ? invoiceProfitSelectedRows.value : invoiceProfitSorted.value;
  const lines = rows.map(r => ipRowValues(r).join(","));
  const csv = [IP_HEADER.join(","), ...lines].join("\n");
  iwsDownload(csv, "invoice_profitability_" + fromDate.value + "_to_" + toDate.value + ".csv");
}

function exportStockValCSV() {
  const header = ["Warehouse","Stock Value","% of Total"].join(",");
  const total = stockVal.value?.grand_total || 0;
  const lines = (stockVal.value?.by_warehouse || []).map(r =>
    [r.warehouse, r.stock_value, total ? ((r.stock_value / total) * 100).toFixed(1) : "0"].join(",")
  );
  const csv = [header, ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "stock_valuation_summary_" + toDate.value + ".csv";
  a.click();
  URL.revokeObjectURL(url);
}

function exportPriceMrpCSV() {
  const q = v => '"' + String(v ?? "").replace(/"/g, '""') + '"';
  downloadCSV(["Item Code","Item Name","Warehouse","Stock Qty","UOM","Selling Price","MRP"],
    priceMrpFiltered.value.map(r => [q(r.item_code), q(r.item_name), q(r.warehouse), r.qty, q(r.uom), r.selling_price, r.mrp].join(",")),
    "selling_price_mrp_" + toDate.value + ".csv");
}

function exportDailyMisCSV() {
  const header = ["Date","Sales","Collection","Purchase","Expenses","Dispatch Qty","Production Qty","Stock In","Stock Out","Outstanding"].join(",");
  const lines = (dailyMis.value?.days || []).map(r =>
    [r.date, r.sales_amount, r.collection_amount, r.purchase_amount, r.expense_amount, r.dispatch_qty, r.production_qty, r.stock_inward_qty, r.stock_outward_qty, r.outstanding].join(",")
  );
  const csv = [header, ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "daily_business_mis_" + fromDate.value + "_to_" + toDate.value + ".csv";
  a.click();
  URL.revokeObjectURL(url);
}

function downloadCSV(header, lines, filename) {
  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportSalesMisCSV() {
  if (!salesMis.value) return;
  const suffix = fromDate.value + "_to_" + toDate.value + ".csv";
  const tab = salesMisTab.value;
  if (tab === "product") {
    downloadCSV(["Item","UOM","Invoices","Qty Sold","Discount","Amount"],
      salesMis.value.product_wise.map(r => [r.item_name||r.item_code, r.uom||"", r.invoice_count, r.qty_sold, r.total_discount||0, r.total_amount].join(",")),
      "sales_mis_product_wise_" + suffix);
  } else if (tab === "customer") {
    downloadCSV(["Customer","Invoices","Amount","Outstanding"],
      salesMis.value.customer_wise.map(r => [r.customer_name||r.customer, r.invoice_count, r.total_amount, r.outstanding_amount||0].join(",")),
      "sales_mis_customer_wise_" + suffix);
  } else if (tab === "salesperson") {
    downloadCSV(["Salesperson","Invoices","Amount"],
      salesMis.value.salesperson_wise.map(r => [r.sales_person, r.invoice_count, r.total_amount].join(",")),
      "sales_mis_salesperson_wise_" + suffix);
  } else if (tab === "branch") {
    downloadCSV(["Branch / Cost Center","Invoices","Amount"],
      salesMis.value.branch_wise.map(r => [r.branch, r.invoice_count, r.total_amount].join(",")),
      "sales_mis_branch_wise_" + suffix);
  } else if (tab === "returns") {
    downloadCSV(["Credit Note","Date","Customer","Against Invoice","Amount","Reason"],
      salesMis.value.sales_return.rows.map(r => [r.credit_note, r.posting_date, r.customer_name||r.customer, r.return_against||"", r.grand_total, (r.reason||"").replace(/,/g," ")].join(",")),
      "sales_mis_returns_" + suffix);
  } else if (tab === "discount") {
    downloadCSV(["Customer","Line Discount","Header Discount","Net Amount"],
      salesMis.value.discount_analysis.by_customer.map(r => [r.customer_name||r.customer, r.line_discount||0, r.header_discount||0, r.net_amount].join(",")),
      "sales_mis_discount_by_customer_" + suffix);
  } else if (tab === "pending") {
    downloadCSV(["Sales Order","Date","Customer","Status","Order Value","Billed","Pending"],
      salesMis.value.sales_order_pending.rows.map(r => [r.sales_order, r.transaction_date, r.customer_name||r.customer, r.status, r.grand_total, r.billed_amount||0, r.pending_amount].join(",")),
      "sales_mis_order_pending_" + suffix);
  } else {
    const s = salesMis.value.summary;
    downloadCSV(["Metric","Value"], [
      ["Invoices", s.invoice_count].join(","),
      ["Net Sales", s.net_sales].join(","),
      ["Total Tax", s.total_tax].join(","),
      ["Discount", s.header_discount].join(","),
      ["Grand Total", s.grand_total].join(","),
      ["Qty Sold", s.total_qty].join(","),
      ["Avg Invoice Value", s.avg_invoice_value].join(","),
    ], "sales_mis_summary_" + suffix);
  }
}

function exportReceivablesCSV() {
  if (!receivablesMis.value) return;
  const suffix = fromDate.value + "_to_" + toDate.value + ".csv";
  const tab = receivablesTab.value;
  if (tab === "ageing") {
    downloadCSV(["Customer","0-30","31-60","61-90","90+","Total"],
      receivablesMis.value.ageing.map(r => [r.customer_name||r.customer, r.days_0_30, r.days_31_60, r.days_61_90, r.days_90_plus, r.total].join(",")),
      "receivables_ageing_" + toDate.value + ".csv");
  } else if (tab === "daily_coll") {
    downloadCSV(["Date","Payments","Amount"],
      receivablesMis.value.daily_collection.days.map(r => [r.date, r.count, r.amount].join(",")),
      "receivables_daily_collection_" + suffix);
  } else if (tab === "overdue") {
    downloadCSV(["Invoice","Customer","Due Date","Overdue Days","Outstanding"],
      receivablesMis.value.overdue.rows.map(r => [r.invoice, r.customer_name||r.customer, r.due_date, r.overdue_days, r.outstanding_amount].join(",")),
      "receivables_overdue_" + toDate.value + ".csv");
  } else if (tab === "credit") {
    downloadCSV(["Customer","Credit Limit","Outstanding","Utilisation %"],
      receivablesMis.value.credit_utilisation.map(r => [r.customer_name||r.customer, r.credit_limit||0, r.outstanding_amount, r.utilisation_pct!=null?r.utilisation_pct.toFixed(1):""].join(",")),
      "receivables_credit_utilisation_" + toDate.value + ".csv");
  } else {
    downloadCSV(["Customer","Open Invoices","Oldest Due Date","Outstanding"],
      receivablesMis.value.customer_outstanding.map(r => [r.customer_name||r.customer, r.invoice_count, r.oldest_due_date||"", r.outstanding_amount].join(",")),
      "receivables_customer_outstanding_" + toDate.value + ".csv");
  }
}

function exportPurchaseMisCSV() {
  if (!purchaseMis.value) return;
  const suffix = fromDate.value + "_to_" + toDate.value + ".csv";
  const tab = purchaseMisTab.value;
  if (tab === "supplier") {
    downloadCSV(["Supplier","Bills","Amount","Outstanding"],
      purchaseMis.value.supplier_wise.map(r => [r.supplier_name||r.supplier, r.invoice_count, r.total_amount, r.outstanding_amount||0].join(",")),
      "purchase_mis_supplier_wise_" + suffix);
  } else if (tab === "product") {
    downloadCSV(["Item","UOM","Bills","Qty Purchased","Discount","Amount"],
      purchaseMis.value.product_wise.map(r => [r.item_name||r.item_code, r.uom||"", r.invoice_count, r.qty_purchased, r.total_discount||0, r.total_amount].join(",")),
      "purchase_mis_product_wise_" + suffix);
  } else if (tab === "price_variance") {
    downloadCSV(["Item","Qty Purchased","Actual Rate","Standard Rate","Variance","Variance %"],
      purchaseMis.value.price_variance.map(r => [r.item_name||r.item_code, r.qty_purchased, r.actual_rate,
        r.has_standard_rate ? r.standard_rate : "Not set", r.has_standard_rate ? r.variance : "",
        r.has_standard_rate ? r.variance_pct.toFixed(1) : ""].join(",")),
      "purchase_mis_price_variance_" + suffix);
  } else if (tab === "pending_po") {
    downloadCSV(["Purchase Order","Date","Supplier","Status","Order Value","Billed","Pending"],
      purchaseMis.value.pending_purchase_orders.rows.map(r => [r.purchase_order, r.transaction_date, r.supplier_name||r.supplier, r.status, r.grand_total, r.billed_amount||0, r.pending_amount].join(",")),
      "purchase_mis_pending_po_" + toDate.value + ".csv");
  } else if (tab === "pending_receipts") {
    downloadCSV(["Purchase Order","Date","Supplier","Status","Ordered Qty","Received Qty","Pending Qty"],
      purchaseMis.value.pending_material_receipts.rows.map(r => [r.purchase_order, r.transaction_date, r.supplier_name||r.supplier, r.status, r.ordered_qty, r.received_qty||0, r.pending_qty].join(",")),
      "purchase_mis_pending_receipts_" + toDate.value + ".csv");
  } else if (tab === "returns") {
    downloadCSV(["Debit Note","Date","Supplier","Against Bill","Amount"],
      purchaseMis.value.purchase_return.rows.map(r => [r.debit_note, r.posting_date, r.supplier_name||r.supplier, r.return_against||"", r.grand_total].join(",")),
      "purchase_mis_returns_" + suffix);
  } else {
    const s = purchaseMis.value.summary;
    downloadCSV(["Metric","Value"], [
      ["Bills", s.invoice_count].join(","),
      ["Net Purchases", s.net_purchases].join(","),
      ["Total Tax", s.total_tax].join(","),
      ["Discount Received", s.header_discount].join(","),
      ["Grand Total", s.grand_total].join(","),
      ["Qty Purchased", s.total_qty].join(","),
      ["Avg Bill Value", s.avg_invoice_value].join(","),
    ], "purchase_mis_summary_" + suffix);
  }
}

function exportInventoryMisCSV() {
  if (!inventoryMis.value) return;
  const suffix = toDate.value + ".csv";
  const tab = inventoryMisTab.value;
  if (tab === "current_stock") {
    downloadCSV(["Item","Warehouse","UOM","Qty","Rate","Value"],
      inventoryMis.value.current_stock.rows.map(r => [r.item_name||r.item_code, r.warehouse, r.uom||"", r.actual_qty, r.valuation_rate, r.stock_value].join(",")),
      "inventory_mis_current_stock_" + suffix);
  } else if (tab === "stock_value") {
    downloadCSV(["Warehouse","Items","Qty","Stock Value"],
      inventoryMis.value.stock_value.by_warehouse.map(r => [r.warehouse, r.item_count, r.total_qty, r.stock_value].join(",")),
      "inventory_mis_stock_value_" + suffix);
  } else if (tab === "fast_moving") {
    downloadCSV(["Item","Qty Consumed","Transactions","Current Qty"],
      inventoryMis.value.fast_moving.map(r => [r.item_name||r.item_code, r.qty_consumed, r.transactions, r.current_qty].join(",")),
      "inventory_mis_fast_moving_" + fromDate.value + "_to_" + toDate.value + ".csv");
  } else if (tab === "slow_moving") {
    downloadCSV(["Item","Qty on Hand","Stock Value","Last Movement","Days Since Movement"],
      inventoryMis.value.slow_moving.map(r => [r.item_name||r.item_code, r.actual_qty, r.stock_value, r.last_movement_date||"", r.days_since_movement].join(",")),
      "inventory_mis_slow_moving_" + suffix);
  } else if (tab === "dead_stock") {
    downloadCSV(["Item","Qty on Hand","Stock Value","Last Movement","Days Since Movement"],
      inventoryMis.value.dead_stock.rows.map(r => [r.item_name||r.item_code, r.actual_qty, r.stock_value, r.last_movement_date||"Never", r.days_since_movement ?? ""].join(",")),
      "inventory_mis_dead_stock_" + suffix);
  } else if (tab === "ageing") {
    downloadCSV(["Item","Warehouse","Qty","Stock Value","Last Receipt","Age (Days)"],
      inventoryMis.value.stock_ageing.rows.map(r => [r.item_name||r.item_code, r.warehouse, r.actual_qty, r.stock_value, r.last_receipt_date||"Never", r.age_days ?? ""].join(",")),
      "inventory_mis_ageing_" + suffix);
  } else if (tab === "reorder") {
    downloadCSV(["Item","Warehouse","Qty on Hand","Reorder Level","Reorder Qty","Shortage"],
      inventoryMis.value.reorder_low_stock.rows.map(r => [r.item_name||r.item_code, r.warehouse, r.actual_qty, r.reorder_level, r.reorder_qty, r.shortage_qty].join(",")),
      "inventory_mis_reorder_" + suffix);
  } else if (tab === "excess") {
    downloadCSV(["Item","Qty on Hand","Avg Daily Consumption","Days of Cover","Excess Qty","Excess Value"],
      inventoryMis.value.excess_stock.rows.map(r => [r.item_name||r.item_code, r.actual_qty, r.avg_daily_consumption, r.days_of_cover, r.excess_qty, r.excess_value].join(",")),
      "inventory_mis_excess_stock_" + suffix);
  } else if (tab === "adjustment") {
    downloadCSV(["Stock Entry","Date","Item","Warehouse","Qty","Rate","Value","Reason"],
      inventoryMis.value.stock_adjustment.rows.map(r => [r.stock_entry, r.posting_date, r.item_name||r.item_code, r.warehouse, r.qty, r.rate, r.value, (r.reason||"").replace(/,/g," ")].join(",")),
      "inventory_mis_stock_adjustment_" + fromDate.value + "_to_" + toDate.value + ".csv");
  } else if (tab === "loss") {
    downloadCSV(["Stock Entry","Date","Item","Warehouse","Qty Lost","Value Lost","Reason"],
      inventoryMis.value.stock_loss.rows.map(r => [r.stock_entry, r.posting_date, r.item_name||r.item_code, r.warehouse, r.qty, r.value, (r.reason||"").replace(/,/g," ")].join(",")),
      "inventory_mis_stock_loss_" + fromDate.value + "_to_" + toDate.value + ".csv");
  }
}

function exportProductionMisCSV() {
  if (!productionMis.value) return;
  const suffix = fromDate.value + "_to_" + toDate.value + ".csv";
  const tab = productionMisTab.value;
  if (tab === "plan_vs_actual") {
    downloadCSV(["Production Plan","Date","Item","Planned Qty","Produced Qty","Variance","Variance %"],
      productionMis.value.plan_vs_actual.rows.map(r => [r.production_plan, r.posting_date, r.item_name||r.item_code, r.planned_qty, r.produced_qty, r.variance_qty, r.variance_pct ?? ""].join(",")),
      "production_mis_plan_vs_actual_" + suffix);
  } else if (tab === "pending") {
    downloadCSV(["Work Order","Item","Status","Qty","Produced","Pending","Planned End"],
      productionMis.value.production_pending.rows.map(r => [r.work_order, r.item_name||r.item_code, r.status, r.qty, r.produced_qty, r.pending_qty, r.planned_end_date||""].join(",")),
      "production_mis_pending_" + toDate.value + ".csv");
  } else if (tab === "wip") {
    downloadCSV(["Work Order","Item","Qty","Produced","% Complete","WIP Warehouse","WIP Value"],
      productionMis.value.wip_status.rows.map(r => [r.work_order, r.item_name||r.item_code, r.qty, r.produced_qty, r.pct_complete, r.wip_warehouse||"", r.wip_stock_value].join(",")),
      "production_mis_wip_" + toDate.value + ".csv");
  } else if (tab === "material_availability") {
    downloadCSV(["Work Order","Item","Warehouse","Still to Issue","Available","Shortage"],
      productionMis.value.raw_material_availability.rows.map(r => [r.work_order, r.item_name||r.item_code, r.warehouse, r.still_to_issue, r.available_qty, r.shortage_qty].join(",")),
      "production_mis_material_availability_" + toDate.value + ".csv");
  } else if (tab === "material_consumption") {
    downloadCSV(["Item","Qty Consumed","Transactions","Value Consumed"],
      productionMis.value.material_consumption.rows.map(r => [r.item_name||r.item_code, r.qty_consumed, r.transactions, r.value_consumed].join(",")),
      "production_mis_material_consumption_" + suffix);
  } else if (tab === "material_variance") {
    downloadCSV(["Work Order","Item","Required Qty","Consumed Qty","Variance Qty","Variance Value"],
      productionMis.value.material_variance.rows.map(r => [r.work_order, r.item_name||r.item_code, r.required_qty, r.consumed_qty, r.variance_qty, r.variance_value].join(",")),
      "production_mis_material_variance_" + suffix);
  } else if (tab === "production_cost") {
    downloadCSV(["Work Order","Item","Produced","Material Value","Operating Cost","Total Cost","Cost/Unit","Standard/Unit"],
      productionMis.value.production_cost.rows.map(r => [r.work_order, r.item_name||r.item_code, r.produced_qty, r.material_value, r.operating_cost, r.actual_total_cost, r.actual_cost_per_unit ?? "", r.standard_cost_per_unit ?? ""].join(",")),
      "production_mis_cost_" + suffix);
  } else if (tab === "efficiency") {
    downloadCSV(["Work Order","Item","Status","Planned (min)","Actual (min)","Efficiency %"],
      productionMis.value.production_efficiency.rows.map(r => [r.work_order, r.item_name||r.item_code, r.status, r.planned_mins, r.actual_mins, r.efficiency_pct].join(",")),
      "production_mis_efficiency_" + suffix);
  } else if (tab === "rejection") {
    downloadCSV(["Job Card","Work Order","Operation","Item","Qty","Value"],
      productionMis.value.rejection_rework.rows.map(r => [r.job_card, r.work_order, r.operation||"", r.item_name||r.item_code, r.qty, r.amount].join(",")),
      "production_mis_rejection_" + suffix);
  } else if (tab === "scrap") {
    downloadCSV(["Stock Entry","Work Order","Item","Qty","Value"],
      productionMis.value.scrap_wastage.rows.map(r => [r.stock_entry, r.work_order||"", r.item_name||r.item_code, r.qty, r.amount].join(",")),
      "production_mis_scrap_" + suffix);
  }
}

function exportProductMisCSV() {
  if (!productMis.value) return;
  const suffix = fromDate.value + "_to_" + toDate.value + ".csv";
  const tab = productMisTab.value;
  if (tab === "sales") {
    downloadCSV(["Item","UOM","Invoices","Qty Sold","Avg Rate","Revenue"],
      productMis.value.product_wise_sales.rows.map(r => [r.item_name||r.item_code, r.uom||"", r.invoice_count, r.qty_sold, r.avg_rate, r.total_amount].join(",")),
      "product_mis_sales_" + suffix);
  } else if (tab === "profit") {
    downloadCSV(["Item","Revenue","Cost","Profit","Margin %"],
      productMis.value.product_wise_profit.rows.map(r => [r.item_name||r.item_code, r.revenue, r.total_cost, r.profit, r.margin_pct].join(",")),
      "product_mis_profit_" + suffix);
  } else if (tab === "cost") {
    downloadCSV(["Item","Qty Sold","Cost Rate","Total Cost"],
      productMis.value.product_wise_cost.rows.map(r => [r.item_name||r.item_code, r.qty_sold, r.cost_rate, r.total_cost].join(",")),
      "product_mis_cost_" + suffix);
  } else if (tab === "margin") {
    downloadCSV(["Item","Revenue","Cost","Margin %"],
      productMis.value.product_wise_margin.rows.map(r => [r.item_name||r.item_code, r.revenue, r.total_cost, r.margin_pct].join(",")),
      "product_mis_margin_" + suffix);
  } else if (tab === "production") {
    downloadCSV(["Item","Qty Produced","Value Produced","Transactions"],
      productMis.value.product_wise_production.rows.map(r => [r.item_name||r.item_code, r.qty_produced, r.value_produced, r.transactions].join(",")),
      "product_mis_production_" + suffix);
  } else if (tab === "stock") {
    downloadCSV(["Item","UOM","Qty on Hand","Rate","Stock Value"],
      productMis.value.product_wise_stock.rows.map(r => [r.item_name||r.item_code, r.uom||"", r.total_qty, r.valuation_rate, r.total_value].join(",")),
      "product_mis_stock_" + toDate.value + ".csv");
  } else if (tab === "wastage") {
    downloadCSV(["Item","Qty Scrapped","Value Scrapped","Transactions"],
      productMis.value.product_wise_wastage.rows.map(r => [r.item_name||r.item_code, r.qty_scrapped, r.value_scrapped, r.transactions].join(",")),
      "product_mis_wastage_" + suffix);
  } else if (tab === "top_selling") {
    downloadCSV(["Rank","Item","Qty Sold","Revenue"],
      productMis.value.top_selling.rows.map((r,idx) => [idx+1, r.item_name||r.item_code, r.qty_sold, r.total_amount].join(",")),
      "product_mis_top_selling_" + suffix);
  } else if (tab === "low_selling") {
    downloadCSV(["Rank","Item","Qty Sold","Revenue"],
      productMis.value.low_selling.rows.map((r,idx) => [idx+1, r.item_name||r.item_code, r.qty_sold, r.total_amount].join(",")),
      "product_mis_low_selling_" + suffix);
  }
}

function exportDispatchMisCSV() {
  if (!dispatchMis.value) return;
  const suffix = fromDate.value + "_to_" + toDate.value + ".csv";
  const tab = dispatchMisTab.value;
  if (tab === "pending_dispatch") {
    downloadCSV(["Sales Order","Order Date","Customer","Item","Ordered Qty","Pending Qty","Pending Value"],
      dispatchMis.value.pending_dispatch.rows.map(r => [r.sales_order, r.order_date, r.customer_name||r.customer, r.item_name||r.item_code, r.ordered_qty, r.pending_qty, r.pending_value].join(",")),
      "dispatch_mis_pending_dispatch_" + toDate.value + ".csv");
  } else if (tab === "delivery_pending") {
    downloadCSV(["Sales Order","Delivery Date","Customer","Item","Ordered Qty","Dispatched Qty","Pending Qty"],
      dispatchMis.value.delivery_pending.rows.map(r => [r.sales_order, r.delivery_date||"", r.customer_name||r.customer, r.item_name||r.item_code, r.ordered_qty, r.delivered_qty, r.pending_qty].join(",")),
      "dispatch_mis_delivery_pending_" + toDate.value + ".csv");
  } else if (tab === "delayed_delivery") {
    downloadCSV(["Sales Order","Delivery Date","Days Overdue","Customer","Item","Pending Qty","Pending Value"],
      dispatchMis.value.delayed_delivery.rows.map(r => [r.sales_order, r.delivery_date, r.days_overdue, r.customer_name||r.customer, r.item_name||r.item_code, r.pending_qty, r.pending_value].join(",")),
      "dispatch_mis_delayed_delivery_" + toDate.value + ".csv");
  } else if (tab === "customer_pending") {
    downloadCSV(["Customer","Orders","Pending Qty","Pending Value"],
      dispatchMis.value.customer_wise_pending_delivery.rows.map(r => [r.customer_name||r.customer, r.order_count, r.pending_qty, r.pending_value].join(",")),
      "dispatch_mis_customer_pending_" + toDate.value + ".csv");
  } else if (tab === "transport_wise") {
    downloadCSV(["Transporter","Dispatches","Customers","Total Qty","Total Value"],
      dispatchMis.value.transport_wise_dispatch.rows.map(r => [r.transporter_name, r.dispatch_count, r.customer_count, r.total_qty, r.total_value].join(",")),
      "dispatch_mis_transport_wise_" + suffix);
  }
}

function exportOrderMisCSV() {
  if (!orderMis.value) return;
  const suffix = fromDate.value + "_to_" + toDate.value + ".csv";
  const tab = orderMisTab.value;
  const bucketCSV = (bucketKey, cols, mapper, name) => {
    downloadCSV(cols, orderMis.value.summary[bucketKey].rows.map(mapper), "order_mis_" + name + "_" + suffix);
  };
  if (tab === "total") {
    bucketCSV("total_orders", ["Sales Order","Order Date","Delivery Date","Customer","Status","Order Value"],
      r => [r.sales_order, r.order_date, r.delivery_date||"", r.customer_name||r.customer, r.status, r.grand_total].join(","), "total_orders");
  } else if (tab === "new") {
    bucketCSV("new_orders", ["Sales Order","Order Date","Customer","Order Value"],
      r => [r.sales_order, r.order_date, r.customer_name||r.customer, r.grand_total].join(","), "new_orders");
  } else if (tab === "pending") {
    bucketCSV("pending_orders", ["Sales Order","Order Date","Delivery Date","Customer","Status","Order Value"],
      r => [r.sales_order, r.order_date, r.delivery_date||"", r.customer_name||r.customer, r.status, r.grand_total].join(","), "pending_orders");
  } else if (tab === "under_production") {
    bucketCSV("under_production", ["Sales Order","Order Date","Customer","Work Order Status","Order Value"],
      r => [r.sales_order, r.order_date, r.customer_name||r.customer, r.wo_statuses.join(" / "), r.grand_total].join(","), "under_production");
  } else if (tab === "ready_for_dispatch") {
    bucketCSV("ready_for_dispatch", ["Sales Order","Order Date","Customer","Order Value"],
      r => [r.sales_order, r.order_date, r.customer_name||r.customer, r.grand_total].join(","), "ready_for_dispatch");
  } else if (tab === "delayed") {
    bucketCSV("delayed_orders", ["Sales Order","Delivery Date","Days Overdue","Customer","Status","Order Value"],
      r => [r.sales_order, r.delivery_date, r.days_overdue, r.customer_name||r.customer, r.status, r.grand_total].join(","), "delayed_orders");
  } else if (tab === "delivered") {
    bucketCSV("delivered_orders", ["Sales Order","Order Date","Customer","Status","Order Value"],
      r => [r.sales_order, r.order_date, r.customer_name||r.customer, r.status, r.grand_total].join(","), "delivered_orders");
  } else if (tab === "cancelled") {
    bucketCSV("cancelled_orders", ["Sales Order","Order Date","Customer","Order Value"],
      r => [r.sales_order, r.order_date, r.customer_name||r.customer, r.grand_total].join(","), "cancelled_orders");
  } else if (tab === "order_value") {
    downloadCSV(["Status","Orders","Value"],
      orderMis.value.order_value.by_status.map(r => [r.status, r.order_count, r.total_value].join(",")),
      "order_mis_order_value_" + suffix);
  } else if (tab === "profitability") {
    downloadCSV(["Sales Order","Date","Customer","Revenue","Cost","Profit","Margin %"],
      orderMis.value.order_profitability.rows.map(r => [r.sales_order, r.order_date, r.customer_name||r.customer, r.revenue, r.total_cost, r.profit, r.margin_pct].join(",")),
      "order_mis_profitability_" + suffix);
  }
}

function exportProfitabilityMisCSV() {
  if (!profitabilityMis.value) return;
  const suffix = fromDate.value + "_to_" + toDate.value + ".csv";
  const tab = profitabilityMisTab.value;
  if (tab === "product") {
    downloadCSV(["Item","Revenue","Cost","Profit","Margin %"],
      profitabilityMis.value.product_wise_profit.rows.map(r => [r.item_name||r.item_code, r.revenue, r.cost, r.profit, r.margin_pct.toFixed(1)].join(",")),
      "profitability_mis_product_" + suffix);
  } else if (tab === "customer") {
    downloadCSV(["Customer","Invoices","Revenue","Cost","Profit","Margin %"],
      profitabilityMis.value.customer_wise_profit.rows.map(r => [r.customer_name||r.customer, r.invoice_count, r.revenue, r.cost, r.profit, r.margin_pct.toFixed(1)].join(",")),
      "profitability_mis_customer_" + suffix);
  } else if (tab === "order") {
    downloadCSV(["Sales Order","Customer","Revenue","Cost","Profit","Margin %"],
      profitabilityMis.value.order_wise_profit.rows.map(r => [r.sales_order, r.customer_name, r.revenue, r.cost, r.profit, r.margin_pct.toFixed(1)].join(",")),
      "profitability_mis_order_" + suffix);
  } else if (tab === "branch") {
    downloadCSV(["Branch (Cost Center)","Revenue","Cost","Profit","Margin %"],
      profitabilityMis.value.branch_wise_profit.rows.map(r => [r.cost_center_name, r.revenue, r.cost, r.profit, r.margin_pct.toFixed(1)].join(",")),
      "profitability_mis_branch_" + suffix);
  } else if (tab === "salesperson") {
    downloadCSV(["Salesperson","Revenue","Cost","Profit","Margin %"],
      profitabilityMis.value.salesperson_wise_profit.rows.map(r => [r.sales_person_name, r.revenue, r.cost, r.profit, r.margin_pct.toFixed(1)].join(",")),
      "profitability_mis_salesperson_" + suffix);
  } else if (tab === "monthly_trend") {
    downloadCSV(["Month","Revenue","Cost","Profit","Margin %"],
      profitabilityMis.value.monthly_profit_trend.rows.map(r => [r.month, r.revenue, r.cost, r.profit, r.margin_pct.toFixed(1)].join(",")),
      "profitability_mis_monthly_trend_" + suffix);
  }
}

function exportExpenseMisCSV() {
  if (!expenseMis.value) return;
  const suffix = fromDate.value + "_to_" + toDate.value + ".csv";
  const tab = expenseMisTab.value;
  if (tab === "department") {
    downloadCSV(["Department (Cost Center)","Expenses","Amount"],
      expenseMis.value.department_wise.rows.map(r => [r.cost_center_name, r.count, r.amount].join(",")),
      "expense_mis_department_" + suffix);
  } else if (tab === "category") {
    downloadCSV(["Category","Expenses","Amount","% of Total"],
      expenseMis.value.category_wise.rows.map(r => [r.category_name, r.count, r.amount, r.pct_of_total.toFixed(1)].join(",")),
      "expense_mis_category_" + suffix);
  } else if (tab === "budget") {
    downloadCSV(["Cost Center","Budget Period","Period Budget (est.)","Actual","Variance","Variance %"],
      expenseMis.value.budget_vs_actual.rows.map(r => [r.cost_center_name, r.budget_period, r.period_budget, r.actual, r.variance, r.variance_pct.toFixed(1)].join(",")),
      "expense_mis_budget_vs_actual_" + suffix);
  } else if (tab === "fixed") {
    downloadCSV(["Category","Expenses","Amount"],
      expenseMis.value.fixed_expenses.rows.map(r => [r.category_name, r.count, r.amount].join(",")),
      "expense_mis_fixed_" + suffix);
  } else if (tab === "variable") {
    downloadCSV(["Category","Expenses","Amount"],
      expenseMis.value.variable_expenses.rows.map(r => [r.category_name, r.count, r.amount].join(",")),
      "expense_mis_variable_" + suffix);
  } else if (tab === "trend") {
    downloadCSV(["Month","Expenses","Amount"],
      expenseMis.value.expense_trend.rows.map(r => [r.month, r.count, r.amount].join(",")),
      "expense_mis_trend_" + suffix);
  } else if (tab === "unusual") {
    downloadCSV(["Expense","Date","Category","Department","Amount","Category Avg","Basis"],
      expenseMis.value.unusual_expenses.rows.map(r => [r.expense, r.posting_date, r.category_name, r.cost_center_name||"", r.amount, r.category_avg, r.basis].join(",")),
      "expense_mis_unusual_" + suffix);
  }
}

function exportPayablesMisCSV() {
  if (!payablesMis.value) return;
  const suffix = toDate.value + ".csv";
  const tab = payablesMisTab.value;
  if (tab === "ageing") {
    downloadCSV(["Supplier","Current","1-30","31-60","61-90","90+","Total"],
      payablesMis.value.payable_ageing.rows.map(r => [r.supplier_name, r.current, r.days_1_30, r.days_31_60, r.days_61_90, r.days_90_plus, r.total].join(",")),
      "payables_mis_ageing_" + suffix);
  } else if (tab === "overdue") {
    downloadCSV(["Invoice","Supplier","Due Date","Overdue Days","Outstanding"],
      payablesMis.value.overdue_payables.rows.map(r => [r.invoice, r.supplier_name, r.due_date, r.overdue_days, r.outstanding_amount].join(",")),
      "payables_mis_overdue_" + suffix);
  } else if (tab === "due_week") {
    downloadCSV(["Invoice","Supplier","Due Date","Outstanding"],
      payablesMis.value.due_this_week.rows.map(r => [r.invoice, r.supplier_name, r.due_date, r.outstanding_amount].join(",")),
      "payables_mis_due_this_week_" + suffix);
  } else if (tab === "due_month") {
    downloadCSV(["Invoice","Supplier","Due Date","Outstanding"],
      payablesMis.value.due_this_month.rows.map(r => [r.invoice, r.supplier_name, r.due_date, r.outstanding_amount].join(",")),
      "payables_mis_due_this_month_" + suffix);
  } else if (tab === "supplier") {
    downloadCSV(["Supplier","Invoices","Outstanding","Overdue Amount","Oldest Overdue (days)"],
      payablesMis.value.supplier_wise_outstanding.rows.map(r => [r.supplier_name, r.invoice_count, r.outstanding, r.overdue_amount, r.max_overdue_days].join(",")),
      "payables_mis_supplier_" + suffix);
  } else if (tab === "forecast") {
    downloadCSV(["Bucket","Invoices","Amount"],
      payablesMis.value.payment_due_forecast.rows.map(b => [b.label, b.count, b.amount].join(",")),
      "payables_mis_forecast_" + suffix);
  }
}

function exportCashBankMisCSV() {
  if (!cashBankMis.value) return;
  const suffix = fromDate.value + "_to_" + toDate.value + ".csv";
  const tab = cashBankMisTab.value;
  if (tab === "cash_position") {
    downloadCSV(["Account","Opening","Closing","Net Movement"],
      cashBankMis.value.cash_position.rows.map(r => [r.account_name, r.opening_balance, r.closing_balance, r.net_movement].join(",")),
      "cash_bank_mis_cash_position_" + suffix);
  } else if (tab === "bank_balance") {
    downloadCSV(["Account","Opening","Closing","Net Movement"],
      cashBankMis.value.bank_balance.rows.map(r => [r.account_name, r.opening_balance, r.closing_balance, r.net_movement].join(",")),
      "cash_bank_mis_bank_balance_" + suffix);
  } else if (tab === "daily_cash") {
    downloadCSV(["Date","Receipts","Payments","Net","Balance"],
      cashBankMis.value.daily_cash_flow.days.map(r => [r.date, r.receipts, r.payments, r.net, r.balance].join(",")),
      "cash_bank_mis_daily_cash_flow_" + suffix);
  } else if (tab === "daily_bank") {
    downloadCSV(["Date","Deposits","Withdrawals","Net","Balance"],
      cashBankMis.value.daily_bank_movement.days.map(r => [r.date, r.receipts, r.payments, r.net, r.balance].join(",")),
      "cash_bank_mis_daily_bank_movement_" + suffix);
  } else if (tab === "receipts") {
    downloadCSV(["Reference","Date","Party","Account","Mode","Amount"],
      cashBankMis.value.receipts.rows.map(r => [r.reference, r.date, r.party_name||r.party||"", r.account, r.mode_of_payment||"", r.amount].join(",")),
      "cash_bank_mis_receipts_" + suffix);
  } else if (tab === "payments") {
    downloadCSV(["Reference","Date","Party","Account","Source","Amount"],
      cashBankMis.value.payments.rows.map(r => [r.reference, r.date, r.party_name||r.party||"", r.account, r.source, r.amount].join(",")),
      "cash_bank_mis_payments_" + suffix);
  } else if (tab === "forecast") {
    downloadCSV(["Bucket","Expected Inflow","Expected Outflow","Net","Projected Balance"],
      cashBankMis.value.cash_forecast.rows.map(r => [r.label, r.inflow, r.outflow, r.net, r.projected_balance].join(",")),
      "cash_bank_mis_forecast_" + suffix);
  } else if (tab === "fund_requirement") {
    downloadCSV(["Bucket","Shortfall"],
      cashBankMis.value.fund_requirement.rows.map(r => [r.label, r.shortfall].join(",")),
      "cash_bank_mis_fund_requirement_" + suffix);
  }
}

function exportCustomerMisCSV() {
  if (!customerMis.value) return;
  const suffix = fromDate.value + "_to_" + toDate.value + ".csv";
  const tab = customerMisTab.value;
  const name = r => r.customer_name || r.customer;
  if (tab === "new_customers") {
    downloadCSV(["Customer","First Invoice Date","Invoices in Period","Revenue in Period"],
      customerMis.value.new_customers.rows.map(r => [name(r), r.first_invoice_date, r.invoice_count, r.total_amount].join(",")),
      "customer_mis_new_customers_" + suffix);
  } else if (tab === "active_customers") {
    downloadCSV(["Customer","Invoices","Revenue","First Invoice","Last Invoice"],
      customerMis.value.active_customers.rows.map(r => [name(r), r.invoice_count, r.total_amount, r.first_invoice_in_period, r.last_invoice_in_period].join(",")),
      "customer_mis_active_customers_" + suffix);
  } else if (tab === "repeat_customers") {
    downloadCSV(["Customer","Invoices","Revenue"],
      customerMis.value.repeat_customers.rows.map(r => [name(r), r.invoice_count, r.total_amount].join(",")),
      "customer_mis_repeat_customers_" + suffix);
  } else if (tab === "customer_wise_sales") {
    downloadCSV(["Customer","Invoices","Net Total","Discount","Tax","Total","Outstanding","Avg Invoice Value"],
      customerMis.value.customer_wise_sales.rows.map(r => [name(r), r.invoice_count, r.net_total, r.total_discount, r.total_tax, r.total_amount, r.outstanding_amount, r.avg_invoice_value].join(",")),
      "customer_mis_customer_wise_sales_" + suffix);
  } else if (tab === "customer_wise_outstanding") {
    downloadCSV(["Customer","Invoices","Outstanding","Oldest Due Date","Max Overdue Days"],
      customerMis.value.customer_wise_outstanding.rows.map(r => [name(r), r.invoice_count, r.outstanding_amount, r.oldest_due_date, r.max_overdue_days].join(",")),
      "customer_mis_customer_wise_outstanding_" + suffix);
  } else if (tab === "customer_wise_profit") {
    downloadCSV(["Customer","Invoices","Revenue","Cost","Profit","Margin %"],
      customerMis.value.customer_wise_profit.rows.map(r => [name(r), r.invoice_count, r.revenue, r.total_cost, r.profit, Number(r.margin_pct).toFixed(1)].join(",")),
      "customer_mis_customer_wise_profit_" + suffix);
  } else if (tab === "customer_retention") {
    downloadCSV(["Customer","Status"],
      customerMis.value.customer_retention.rows.map(r => [name(r), r.status].join(",")),
      "customer_mis_customer_retention_" + suffix);
  } else if (tab === "top_customers") {
    downloadCSV(["Rank","Customer","Invoices","Revenue"],
      customerMis.value.top_customers.rows.map((r, idx) => [idx + 1, name(r), r.invoice_count, r.total_amount].join(",")),
      "customer_mis_top_customers_" + suffix);
  } else if (tab === "inactive_customers") {
    downloadCSV(["Customer","Last Invoice Date","Days Inactive","Lifetime Invoices","Lifetime Revenue"],
      customerMis.value.inactive_customers.rows.map(r => [name(r), r.last_invoice_date, r.days_inactive, r.invoice_count, r.lifetime_revenue].join(",")),
      "customer_mis_inactive_customers_" + suffix);
  }
}

function exportSupplierMisCSV() {
  if (!supplierMis.value) return;
  const suffix = fromDate.value + "_to_" + toDate.value + ".csv";
  const tab = supplierMisTab.value;
  const name = r => r.supplier_name || r.supplier;
  if (tab === "supplier_wise_purchase") {
    downloadCSV(["Supplier","Invoices","Net Total","Discount","Tax","Total","Outstanding","Avg Invoice Value"],
      supplierMis.value.supplier_wise_purchase.rows.map(r => [name(r), r.invoice_count, r.net_total, r.total_discount, r.total_tax, r.total_amount, r.outstanding_amount, r.avg_invoice_value].join(",")),
      "supplier_mis_supplier_wise_purchase_" + suffix);
  } else if (tab === "supplier_outstanding") {
    downloadCSV(["Supplier","Invoices","Outstanding","Overdue Amount","Max Overdue Days"],
      supplierMis.value.supplier_outstanding.rows.map(r => [name(r), r.invoice_count, r.outstanding_amount, r.overdue_amount, r.max_overdue_days].join(",")),
      "supplier_mis_supplier_outstanding_" + suffix);
  } else if (tab === "supplier_payment_ageing") {
    downloadCSV(["Supplier","Current","1-30","31-60","61-90","90+","Total"],
      supplierMis.value.supplier_payment_ageing.rows.map(r => [name(r), r.current, r.days_1_30, r.days_31_60, r.days_61_90, r.days_90_plus, r.total].join(",")),
      "supplier_mis_supplier_payment_ageing_" + suffix);
  } else if (tab === "purchase_price_comparison") {
    downloadCSV(["Item","Supplier","Qty","Avg Rate","Is Lowest","Vs Lowest %"],
      supplierMis.value.purchase_price_comparison.rows.map(r => [r.item_name || r.item_code, name(r), r.qty, r.avg_rate, r.is_lowest ? "Yes" : "No", Number(r.variance_vs_lowest_pct).toFixed(1)].join(",")),
      "supplier_mis_purchase_price_comparison_" + suffix);
  } else if (tab === "supplier_performance") {
    downloadCSV(["Supplier","Purchase Amount","Outstanding","On-time Delivery %","Rejection %","Avg Price Variance %","Score"],
      supplierMis.value.supplier_performance.rows.map(r => [name(r), r.total_purchase_amount, r.outstanding_amount, r.on_time_delivery_pct ?? "", r.rejection_pct ?? "", r.avg_price_variance_pct ?? "", r.performance_score ?? ""].join(",")),
      "supplier_mis_supplier_performance_" + suffix);
  } else if (tab === "delivery_performance") {
    downloadCSV(["Receipt","Supplier","Received Date","Expected Date","Delay (days)","Status"],
      supplierMis.value.delivery_performance.rows.map(r => [r.receipt, name(r), r.received_date, r.expected_date || "", r.has_reference ? r.delay_days : "", !r.has_reference ? "No PO Ref" : (r.on_time ? "On-time" : "Late")].join(",")),
      "supplier_mis_delivery_performance_" + suffix);
  } else if (tab === "quality_rejection") {
    downloadCSV(["Supplier","Item","Received Qty","Accepted Qty","Rejected Qty","Rejection %"],
      supplierMis.value.quality_rejection.rows.map(r => [name(r), r.item_name || r.item_code, r.received_qty, r.accepted_qty, r.rejected_qty, Number(r.rejection_pct).toFixed(2)].join(",")),
      "supplier_mis_quality_rejection_" + suffix);
  }
}

function exportEmployeeMisCSV() {
  if (!employeeMis.value) return;
  const suffix = fromDate.value + "_to_" + toDate.value + ".csv";
  const tab = employeeMisTab.value;
  const name = r => r.sales_person_name || r.sales_person;
  if (tab === "employee_attendance") {
    downloadCSV(["Employee","Present Days","Period Days","Attendance %","Total Hours","Avg Hrs/Day"],
      employeeMis.value.employee_attendance.rows.map(r => [r.employee, r.present_days, r.period_days, r.attendance_pct, r.total_hours, r.avg_hours_per_day].join(",")),
      "employee_mis_attendance_" + suffix);
  } else if (tab === "department_manpower") {
    downloadCSV(["Department","Headcount","Employees"],
      employeeMis.value.department_manpower.rows.map(d => [d.department, d.headcount, '"' + d.employees.map(e => e.sales_person_name).join("; ") + '"'].join(",")),
      "employee_mis_department_manpower_" + suffix);
  } else if (tab === "salesperson_target") {
    downloadCSV(["Salesperson","Invoices","Achieved","Target","Achievement %"],
      employeeMis.value.salesperson_achievement.rows.map(r => [name(r), r.invoice_count, r.total_amount, spTargets.value[r.sales_person] || "", spTargets.value[r.sales_person] ? spAchievementPct(r).toFixed(1) : ""].join(",")),
      "employee_mis_salesperson_target_" + suffix);
  } else if (tab === "salesperson_collection") {
    downloadCSV(["Salesperson","Payments","Collected Amount"],
      employeeMis.value.salesperson_collection.rows.map(r => [name(r), r.payment_count, r.collected_amount].join(",")),
      "employee_mis_salesperson_collection_" + suffix);
  } else if (tab === "production_productivity") {
    downloadCSV(["Employee","Job Cards","Hours","Qty Produced","Avg Time/Unit (min)","Qty/Hour"],
      employeeMis.value.production_productivity.rows.map(r => [r.employee, r.job_card_count, r.total_hours, r.qty_produced, r.avg_time_per_unit_mins ?? "", r.qty_per_hour ?? ""].join(",")),
      "employee_mis_production_productivity_" + suffix);
  } else if (tab === "overtime") {
    downloadCSV(["Employee","Overtime Days","Overtime Hours"],
      employeeMis.value.overtime.summary.map(r => [r.employee, r.overtime_days, r.overtime_hours].join(",")),
      "employee_mis_overtime_" + suffix);
  } else if (tab === "labour_cost") {
    downloadCSV(["Employee","Hours","Cost"],
      employeeMis.value.labour_cost.by_employee.map(r => [r.employee, r.total_hours, r.total_cost].join(",")),
      "employee_mis_labour_cost_" + suffix);
  } else if (tab === "employee_performance") {
    downloadCSV(["Employee","Hours","Qty Produced","Qty/Hour","Rejection %","Attendance %","Overtime Hrs","Score"],
      employeeMis.value.employee_performance.rows.map(r => [r.employee, r.total_hours, r.qty_produced, r.qty_per_hour ?? "", r.rejection_pct ?? "", r.attendance_pct ?? "", r.overtime_hours, r.performance_score ?? ""].join(",")),
      "employee_mis_performance_" + suffix);
  }
}

function exportAgingCSV() {
  const isAR = activeReport.value === "ar";
  const rows = isAR ? arAging.value : apAging.value;
  const nameCol = isAR ? "Customer" : "Vendor";
  const keyCol  = isAR ? "customer_name" : "supplier_name";
  const header = [nameCol,"Current","1-30 Days","31-60 Days","61-90 Days","90+ Days","Total"].join(",");
  const lines = rows.map(r =>
    [r[keyCol]||r[isAR?'customer':'supplier'], r.current, r.days_1_30, r.days_31_60, r.days_61_90, r.days_90_plus, r.total]
      .join(",")
  );
  const csv = [header, ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = (isAR ? "ar_aging" : "ap_aging") + "_" + toDate.value + ".csv";
  a.click();
  URL.revokeObjectURL(url);
}

const reports = [
  { key: "pl",  label: "Profit & Loss",  icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>` },
  { key: "bs",  label: "Balance Sheet",  icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="3" x2="8" y2="21"/></svg>` },
  { key: "cf",  label: "Cash Flow",      icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>` },
  { key: "gst", label: "GST Summary",    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>` },
  { key: "items", label: "Item-wise Sales", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>` },
  { key: "customers", label: "Customer-wise Sales", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
  { key: "profit", label: "Profit-wise", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>` },
  { key: "invoice_profit", label: "Invoice Profitability", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="17" x2="15" y2="17"/><line x1="9" y1="13" x2="12" y2="13"/></svg>` },
  { key: "ar",  label: "AR Aging",       icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>` },
  { key: "ap",  label: "AP Aging",       icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 8 14"/></svg>` },
  { key: "tb",  label: "Trial Balance",  icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>` },
  { key: "stockgl", label: "Stock vs GL", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>` },
  { key: "stockval", label: "Stock Valuation", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>` },
  { key: "price_mrp", label: "Selling Price & MRP", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>` },
  { key: "mis", label: "Daily Business MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/></svg>` },
  { key: "sales_mis", label: "Sales MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.1-2.8-2.8L7 14"/></svg>` },
  { key: "receivables", label: "Collection & Receivables MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>` },
  { key: "purchase_mis", label: "Purchase MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18.7 16l-5.1-5.1-2.8 2.8L7 10"/></svg>` },
  { key: "inventory_mis", label: "Inventory MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>` },
  { key: "production_mis", label: "Production MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>` },
  { key: "product_mis", label: "Product MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>` },
  { key: "dispatch_mis", label: "Dispatch & Delivery MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>` },
  { key: "order_mis", label: "Order MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>` },
  { key: "profitability_mis", label: "Profitability MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>` },
  { key: "expense_mis", label: "Expense MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></svg>` },
  { key: "payables_mis", label: "Payables MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>` },
  { key: "cash_bank_mis", label: "Cash & Bank MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/></svg>` },
  { key: "customer_mis", label: "Customer MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
  { key: "supplier_mis", label: "Supplier MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>` },
  { key: "employee_mis", label: "Employee / Performance MIS", icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
];

const tabPalette = ["c-blue","c-slate","c-cyan","c-amber","c-pink","c-slate","c-emerald","c-violet","c-blue","c-blue"];
function tabColor(i) {
  return tabPalette[i % tabPalette.length];
}
</script>

<style scoped>
.pill { display:inline-block; padding:2px 8px; border-radius:10px; font-size:10.5px; font-weight:600; }
.pill-green { background:#EBFBEE; color:#2F9E44; border:1px solid #8CE99A; }
.row-selected { background: #F8F9FF; }
.inv-detail-link { color: var(--accent, #4C6EF5); text-decoration: none; font-weight: 600; }
.inv-detail-link:hover { text-decoration: underline; }
.page-reports { display: flex; flex-direction: column; gap: 16px; padding: 24px; }

/* Page header */
.reports-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.reports-title { font-size: 22px; font-weight: 700; color: var(--text); margin: 0; font-family: var(--font); }
.reports-subtitle { font-size: 13px; color: var(--text-3); margin: 0; }
.reports-header-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.reports-header-icons { display: flex; gap: 10px; color: var(--accent); opacity: .55; }

/* Report selector grid */
.report-grid {
  display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px;
}
@media (max-width: 1100px) { .report-grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 700px)  { .report-grid { grid-template-columns: repeat(2, 1fr); } }
.report-card {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 14px; border-radius: var(--radius-sm);
  border: 1px solid var(--border); background: var(--surface);
  color: var(--text-3); cursor: pointer; font-size: 13px; font-weight: 600;
  transition: all .15s; font-family: var(--font); text-align: left;
}
.report-card:hover { border-color: var(--accent); color: var(--text); }
.report-card-icon {
  display: flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
}
.report-card-label { line-height: 1.3; }
.report-card.active { background: var(--accent-soft); border-color: var(--accent); color: var(--accent); }
.report-card.active .report-card-icon { background: var(--accent); color: #fff; }

.report-card.c-blue    .report-card-icon { background: #E7F5FF; color: #1971C2; }
.report-card.c-slate   .report-card-icon { background: #F1F3F5; color: #495057; }
.report-card.c-cyan    .report-card-icon { background: #E3FAFC; color: #0C8599; }
.report-card.c-amber   .report-card-icon { background: #FFF4E6; color: #E8590C; }
.report-card.c-pink    .report-card-icon { background: #FFF0F6; color: #C2255C; }
.report-card.c-emerald .report-card-icon { background: #EBFBEE; color: #2F9E44; }
.report-card.c-violet  .report-card-icon { background: #F3F0FF; color: #7048E8; }
.report-card.active .report-card-icon { background: var(--accent) !important; color: #fff !important; }

.date-range-bar {
  display: flex; align-items: center; gap: 12px; padding: 14px 20px; flex-wrap: wrap;
}
.dr-icon { font-size: 13px; opacity: .7; }
.dr-label { font-size: 12px; font-family: var(--font); color: var(--text-3); letter-spacing: .06em; }
.dr-to { font-size: 12px; color: var(--text-3); }
.dr-input {
  background: var(--surface-2); border: 1px solid var(--border);
  border-radius: var(--radius-sm); padding: 6px 10px; color: var(--text);
  font-size: 12.5px; font-family: var(--font); outline: none;
}
.dr-input:focus { border-color: var(--accent); }
.dr-reset { background: var(--surface); border: 1px solid var(--border); color: var(--text-3); }
.dr-spacer { flex: 1; }

/* Profit & Loss dashboard */
.pl-dash { display: flex; flex-direction: column; gap: 16px; }
.pl-dash-header {
  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm);
  padding: 14px 18px;
}
.pl-dash-title { display: flex; align-items: center; gap: 12px; }
.pl-dash-icon {
  width: 36px; height: 36px; border-radius: 10px; background: #E7F5FF; color: #1971C2;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.pl-dash-h { font-size: 15px; font-weight: 700; color: var(--text); }
.pl-dash-sub { font-size: 12px; color: var(--text-3); margin-top: 2px; }
.pl-dash-range {
  display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--text);
  border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 7px 12px; font-weight: 600;
}
.pl-dash-range-caret { color: var(--text-3); font-size: 10px; }

.pl-kpi-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
@media (max-width: 1100px) { .pl-kpi-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 650px)  { .pl-kpi-grid { grid-template-columns: repeat(2, 1fr); } }
.pl-kpi { border-radius: var(--radius-sm); padding: 14px 16px; border: 1px solid transparent; }
.pl-kpi-top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 12.5px; font-weight: 600; color: var(--text); }
.pl-kpi-icon { font-size: 14px; }
.pl-kpi-val { font-size: 18px; font-weight: 700; font-family: var(--font); margin-bottom: 6px; }
.pl-kpi-val.green { color: var(--green); }
.pl-kpi-val.red   { color: var(--red); }
.pl-kpi-trend { font-size: 11px; font-weight: 600; }
.pl-kpi-trend.up      { color: var(--green); }
.pl-kpi-trend.down    { color: var(--red); }
.pl-kpi-trend.neutral,
.pl-kpi-trend.muted   { color: var(--text-3); font-weight: 500; }
.pl-kpi.c-emerald { background: #EBFBEE; }
.pl-kpi.c-pink    { background: #FFF0F6; }
.pl-kpi.c-amber   { background: #FFF4E6; }
.pl-kpi.c-violet  { background: #F3F0FF; }
.pl-kpi.c-blue    { background: #E7F5FF; }

.pl-trend-card {
  background: var(--surface); border-radius: var(--radius-sm);
  padding: 16px 18px; display: flex; flex-direction: column; gap: 14px;
}
.pl-trend-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.pl-trend-toggle { display: flex; border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; }
.pl-trend-toggle button {
  border: none; background: var(--surface); color: var(--text-3); padding: 6px 14px;
  font-size: 12px; font-weight: 600; cursor: pointer; font-family: var(--font);
}
.pl-trend-toggle button.active { background: var(--accent); color: #fff; }
.pl-trend-body { display: flex; gap: 20px; align-items: stretch; }
.pl-trend-chart-wrap { flex: 1; display: flex; gap: 8px; min-width: 0; }
.pl-trend-yaxis { display: flex; flex-direction: column; justify-content: space-between; font-size: 11px; color: var(--text-3); padding: 2px 0; }
.pl-trend-chart { flex: 1; display: flex; align-items: flex-end; gap: 6px; min-height: 150px; overflow-x: auto; border-left: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 0 8px; }
.pl-trend-col { flex: 1; min-width: 40px; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.pl-trend-bars { width: 100%; display: flex; align-items: flex-end; justify-content: center; gap: 4px; }
.pl-trend-bar { width: 16px; border-radius: 3px 3px 0 0; min-height: 2px; transition: height .3s; }
.pl-trend-bar.income  { background: #4C6EF5; }
.pl-trend-bar.expense { background: #FA5252; }
.pl-trend-month { font-size: 10.5px; color: var(--text-3); }
.pl-trend-legend { display: flex; gap: 16px; justify-content: center; font-size: 11.5px; color: var(--text-3); }
.pl-trend-legend .dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; margin-right: 4px; vertical-align: middle; }
.pl-trend-legend .dot.income { background: #4C6EF5; }
.pl-trend-legend .dot.expense { background: #FA5252; }

.pl-insights { width: 240px; flex-shrink: 0; background: var(--surface-2); border-radius: var(--radius-sm); padding: 14px 16px; display: flex; flex-direction: column; gap: 12px; }
@media (max-width: 800px) { .pl-trend-body { flex-direction: column; } .pl-insights { width: auto; } }
.pl-insights-title { font-size: 12.5px; font-weight: 700; color: var(--text); }
.pl-insight-item { display: flex; gap: 10px; align-items: flex-start; }
.pl-insight-icon { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
.pl-insight-icon.warn { background: #FFF0F6; color: #C2255C; }
.pl-insight-icon.loss { background: #E7F5FF; color: #1971C2; }
.pl-insight-icon.good { background: #EBFBEE; color: #2F9E44; }
.pl-insight-title { font-size: 12.5px; font-weight: 600; color: var(--text); }
.pl-insight-desc { font-size: 11.5px; color: var(--text-3); margin-top: 2px; line-height: 1.4; }

.pl-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 14px;
}
.pl-row.net { border-bottom: none; font-size: 16px; font-weight: 700; margin-top: 4px; }
.pl-row.profit .mono { color: var(--green); }
.pl-row.loss   .mono { color: var(--red);   }
.pl-divider { height: 2px; background: var(--border); margin: 4px 0; }

.bs-card { overflow: visible; display: block; align-items: initial; cursor: default; }
.bs-card:hover { border-color: var(--border); color: inherit; }
.bs-page-head { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 18px; }
.bs-page-head-icon {
  width: 34px; height: 34px; flex: 0 0 34px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  background: #e0e7ff; color: #4338ca;
}
.bs-page-head-text { flex: 1; min-width: 0; }
.bs-page-head-title { font-size: 16px; font-weight: 700; color: var(--text); }
.bs-page-head-sub { font-size: 12px; color: var(--text-3); margin-top: 1px; }
.bs-page-head-actions { display: flex; align-items: center; gap: 10px; }
.bs-asof {
  font-size: 12.5px; font-weight: 600; color: var(--text-2);
  border: 1px solid var(--border); border-radius: 8px; padding: 7px 12px;
}
.bs-export-btn {
  display: flex; align-items: center; gap: 6px;
  font-size: 12.5px; font-weight: 600; color: #1d4ed8;
  background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px;
  padding: 7px 12px; cursor: pointer;
}
.bs-export-btn:hover { background: #dbeafe; }
.bs-export-btn:disabled { opacity: .5; cursor: not-allowed; }

.bs-kpi-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 14px; }
@media (max-width: 700px) { .bs-kpi-row { grid-template-columns: 1fr; } }
.bs-kpi { display: flex; align-items: center; gap: 12px; border-radius: 12px; padding: 14px 16px; }
.bs-kpi-icon {
  width: 34px; height: 34px; flex: 0 0 34px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
}
.bs-kpi-label { font-size: 12px; color: var(--text-3); margin-bottom: 3px; }
.bs-kpi-amount { font-size: 17px; font-weight: 700; }
.bs-kpi-assets { background: #eef2ff; }
.bs-kpi-assets .bs-kpi-icon { background: #e0e7ff; color: #4338ca; }
.bs-kpi-assets .bs-kpi-amount { color: #1e293b; }
.bs-kpi-liabilities { background: #fef2f2; }
.bs-kpi-liabilities .bs-kpi-icon { background: #fee2e2; color: #dc2626; }
.bs-kpi-liabilities .bs-kpi-amount { color: #1e293b; }
.bs-kpi-equity { background: #fffbeb; }
.bs-kpi-equity .bs-kpi-icon { background: #fef3c7; color: #b45309; }
.bs-kpi-equity .bs-kpi-amount { color: #1e293b; }

.bs-acc { display: flex; flex-direction: column; gap: 10px; margin-top: 14px; }

.bs-acc-group { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
.bs-acc-head {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px; cursor: pointer; background: var(--surface-2);
}
.bs-acc-icon {
  width: 34px; height: 34px; flex: 0 0 34px;
  border-radius: 9px; display: flex; align-items: center; justify-content: center;
}
.bs-acc-head-text { flex: 1; min-width: 0; }
.bs-acc-label { font-weight: 700; font-size: 14px; }
.bs-acc-desc { font-size: 11.5px; color: var(--text-3); margin-top: 1px; }
.bs-acc-amount { font-weight: 700; font-size: 15px; margin-right: 4px; white-space: nowrap; }
.bs-acc-chevron { display: flex; color: var(--text-3); transition: transform .15s ease; }
.bs-acc-chevron.open { transform: rotate(0deg); }
.bs-acc-chevron:not(.open) { transform: rotate(180deg); }

.bs-acc-items { display: flex; flex-direction: column; }
.bs-acc-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px 12px 20px; border-top: 1px solid var(--border);
}
.bs-acc-item-icon {
  width: 26px; height: 26px; flex: 0 0 26px;
  border-radius: 7px; display: flex; align-items: center; justify-content: center;
  background: var(--surface-2);
}
.bs-acc-item-text { flex: 1; min-width: 0; }
.bs-acc-item-label { font-weight: 600; font-size: 13px; }
.bs-acc-item-desc { font-size: 11px; color: var(--text-3); margin-top: 1px; }
.bs-acc-item-amount { font-weight: 600; font-size: 13px; white-space: nowrap; }
.bs-acc-item-caret { display: flex; color: var(--text-3); flex: 0 0 auto; }

.bs-acc-assets .bs-acc-amount   { color: #15803d; }
.bs-acc-assets .bs-acc-icon     { background: #dbeafe; color: #2563eb; }
.bs-acc-liabilities .bs-acc-amount { color: #dc2626; }
.bs-acc-liabilities .bs-acc-icon   { background: #fee2e2; color: #dc2626; }
.bs-acc-equity .bs-acc-amount   { color: #b45309; }
.bs-acc-equity .bs-acc-icon     { background: #fef3c7; color: #b45309; }

.bs-sum-status { margin-top: 14px; }
.bs-sum-status {
  display: flex; align-items: center; gap: 12px;
  border-radius: 12px; padding: 16px;
  font-size: 12.5px;
}
.bs-sum-status.bs-ok  { background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0; }
.bs-sum-status.bs-bad { background:#fef2f2; color:#b91c1c; border:1px solid #fecaca; }
.bs-sum-status-icon {
  width: 28px; height: 28px; flex: 0 0 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; background: rgba(255,255,255,.6);
}
.bs-sum-status-title { font-weight: 600; }
.bs-sum-status-eq { font-weight: 500; opacity:.85; margin-top: 2px; }

.cf-page-head-icon { background: #dbeafe; color: #2563eb; }

.cf-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 16px; align-items: start; margin-top: 14px; }
@media (max-width: 900px) { .cf-grid { grid-template-columns: 1fr; } }

.cf-acc { display: flex; flex-direction: column; gap: 10px; }
.cf-acc-row {
  display: flex; align-items: center; gap: 12px;
  border-radius: 10px; padding: 14px 16px;
}
.cf-acc-icon {
  width: 32px; height: 32px; flex: 0 0 32px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
}
.cf-acc-text { flex: 1; min-width: 0; }
.cf-acc-label { font-weight: 700; font-size: 13.5px; }
.cf-acc-desc { font-size: 11.5px; color: var(--text-3); margin-top: 1px; }
.cf-acc-amount { font-weight: 700; font-size: 14.5px; margin-right: 4px; white-space: nowrap; }

.cf-row-operating { background: #ecfdf5; }
.cf-row-operating .cf-acc-icon { background: #d1fae5; color: #059669; }
.cf-row-investing { background: #eff6ff; }
.cf-row-investing .cf-acc-icon { background: #dbeafe; color: #2563eb; }
.cf-row-financing { background: #f5f3ff; }
.cf-row-financing .cf-acc-icon { background: #ede9fe; color: #7c3aed; }
.cf-row-net { background: #ecfdf5; cursor: default; }
.cf-row-net .cf-acc-icon { background: #d1fae5; color: #059669; }

.cf-flow-row { display: flex; align-items: center; gap: 12px; padding: 6px 16px; }
.cf-flow-icon {
  width: 26px; height: 26px; flex: 0 0 26px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.cf-flow-icon-open  { background: #d1fae5; color: #059669; }
.cf-flow-icon-close { background: #fee2e2; color: #dc2626; }

.cf-side { display: flex; flex-direction: column; gap: 14px; }
.cf-trend-box { border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
.cf-trend-box-head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
.cf-trend-box-title { font-weight: 700; font-size: 13.5px; }
.cf-trend-box-sub { font-size: 11.5px; color: var(--text-3); margin-top: 1px; }
.cf-trend-period { font-size: 11.5px; color: var(--text-3); border: 1px solid var(--border); border-radius: 6px; padding: 3px 8px; }

.cf-trend-chart { position: relative; display: flex; align-items: stretch; gap: 16px; height: 140px; margin-bottom: 8px; }
.cf-trend-baseline { position: absolute; left: 0; right: 0; top: 50%; border-top: 1px dashed var(--border); }
.cf-trend-col { position: relative; flex: 1; min-width: 30px; }
.cf-trend-bar { position: absolute; width: 7px; border-radius: 2px; }
.cf-trend-bar.operating { background: #10b981; left: calc(50% - 12px); }
.cf-trend-bar.investing { background: #2563eb; left: calc(50% - 3px); }
.cf-trend-bar.financing { background: #7c3aed; left: calc(50% + 6px); }
.cf-trend-month { position: absolute; bottom: -20px; left: 0; right: 0; text-align: center; font-size: 10.5px; color: var(--text-3); }

.cf-trend-legend { display: flex; gap: 14px; font-size: 11px; color: var(--text-3); margin-top: 22px; flex-wrap: wrap; }
.cf-trend-legend .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; }

.cf-summary-box { display: flex; gap: 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 14px; }
.cf-summary-icon {
  width: 22px; height: 22px; flex: 0 0 22px; border-radius: 50%;
  background: #2563eb; color: #fff; font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.cf-summary-title { font-weight: 700; font-size: 12.5px; margin-bottom: 2px; }
.cf-summary-text { font-size: 12px; color: var(--text-2); line-height: 1.5; }

.aging-table th, .aging-table td { padding: 9px 12px; white-space: nowrap; }
.aging-total { background: #F8F9FA; }
.aging-totals-row td { border-top: 2px solid #E2E8F0; background: #F8F9FA; }

/* GST Cards */
.gst-page-head-icon { background: #dbeafe; color: #2563eb; }

/* ---- Item-wise Sales ---- */
.iws-page-head-icon { background: #dbeafe; color: #2563eb; }
.cws-page-head-icon { background: #ede9fe; color: #7c3aed; }
.pw-page-head-icon { background: #fef3c7; color: #b45309; }
.ip-page-head-icon { background: #dbeafe; color: #2563eb; }
.ar-page-head-icon { background: #fee2e2; color: #dc2626; }
.ap-page-head-icon { background: #fef3c7; color: #b45309; }
.tb-page-head-icon { background: #e0e7ff; color: #4338ca; }
.sgl-page-head-icon { background: #cffafe; color: #0e7490; }
.sv-page-head-icon { background: #ede9fe; color: #6d28d9; }
.mis-page-head-icon { background: #dcfce7; color: #15803d; }
.smis-page-head-icon { background: #fce7f3; color: #be185d; }
.rmis-page-head-icon { background: #fef9c3; color: #a16207; }
.pmis-page-head-icon { background: #dbeafe; color: #1d4ed8; }
.invmis-page-head-icon { background: #cffafe; color: #0e7490; }
.prodmis-page-head-icon { background: #ffedd5; color: #c2410c; }
.prdmis-page-head-icon { background: #e0e7ff; color: #4338ca; }
.dmis-page-head-icon { background: #d1fae5; color: #047857; }
.omis-page-head-icon { background: #e0f2fe; color: #0369a1; }
.pfmis-page-head-icon { background: #dcfce7; color: #16a34a; }
.emis-page-head-icon { background: #fee2e2; color: #b91c1c; }
.payblmis-page-head-icon { background: #fef3c7; color: #b45309; }
.cbmis-page-head-icon { background: #cffafe; color: #0e7490; }
.custmis-page-head-icon { background: #ede9fe; color: #6d28d9; }
.suppmis-page-head-icon { background: #d1fae5; color: #047857; }
.empmis-page-head-icon { background: #ffe4e6; color: #be123c; }

/* Report sub-tabs (used across MIS reports) */
.report-tabs { display: flex; flex-wrap: wrap; gap: 6px; }
.report-tab {
  padding: 7px 13px; border-radius: 999px; border: 1px solid var(--border, #e2e8f0);
  background: var(--surface, #fff); color: var(--text-3, #64748b);
  font-size: 12.5px; font-weight: 600; cursor: pointer; transition: all .15s;
  font-family: var(--font); white-space: nowrap;
}
.report-tab:hover { border-color: var(--accent, #4C6EF5); color: var(--text, #1e293b); }
.report-tab.active { background: var(--accent, #4C6EF5); border-color: var(--accent, #4C6EF5); color: #fff; }
.iws-export-wrap { position: relative; }
.iws-menu-backdrop { position: fixed; inset: 0; z-index: 40; }
.iws-menu {
  position: absolute; right: 0; top: calc(100% + 6px); z-index: 41;
  min-width: 180px; padding: 6px; border-radius: 10px;
  background: var(--surface); border: 1px solid var(--border);
  box-shadow: 0 8px 24px rgba(15, 23, 42, .12);
}
.iws-menu-item {
  display: block; width: 100%; text-align: left; border: 0; background: transparent;
  padding: 8px 10px; border-radius: 7px; font-size: 12.5px; color: var(--text); cursor: pointer;
}
.iws-menu-item:hover { background: var(--surface-2); }

.iws-body { display: flex; align-items: flex-start; gap: 14px; }
@media (max-width: 900px) { .iws-body { flex-direction: column; } }

.iws-total-panel {
  flex: 0 0 200px; width: 200px; align-self: stretch;
  background: #f0fdf4; border: 1px solid #dcfce7; border-radius: 12px; padding: 18px 16px;
  height: fit-content;
}
@media (max-width: 900px) { .iws-total-panel { flex: 1 1 auto; width: 100%; } }
.iws-total-icon {
  width: 44px; height: 44px; border-radius: 12px; margin-bottom: 14px;
  display: flex; align-items: center; justify-content: center;
  background: #dcfce7; color: #16a34a;
}
.iws-total-label { font-size: 12.5px; color: var(--text-3); }
.iws-total-value { font-size: 24px; font-weight: 800; color: #16a34a; margin-top: 4px; letter-spacing: -.4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
.iws-total-meta { font-size: 11.5px; color: var(--text-3); margin-top: 6px; }
.iws-total-sub { margin-top: 12px; padding-top: 10px; border-top: 1px solid #dcfce7; }
.iws-total-sub-label { display: block; font-size: 11.5px; color: var(--text-3); }
.iws-total-sub-value { font-size: 14px; font-weight: 700; color: #dc2626; }
.iws-total-panel-neg { background: #fef2f2; border-color: #fecaca; }
.iws-total-icon-neg { background: #fee2e2; color: #dc2626; }
.iws-total-value-neg { color: #dc2626; }

.iws-section-label { font-size: 12.5px; font-weight: 700; color: var(--text); margin: 4px 0 10px; }
.sgl-grir-note {
  font-size: 12px; color: #475569; background: #f8fafc; border: 1px solid var(--border);
  border-radius: 9px; padding: 10px 14px; margin: 14px 0;
}

.iws-table-wrap { flex: 1; min-width: 0; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
.iws-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.iws-table thead th {
  background: var(--surface-2); color: var(--text-3);
  font-size: 11.5px; font-weight: 600; text-align: left;
  padding: 11px 12px; border-bottom: 1px solid var(--border); white-space: nowrap;
}
.iws-table thead th.ta-r { text-align: right; }
.iws-sortable { cursor: pointer; user-select: none; }
.iws-sortable:hover { color: var(--text); }
.iws-sort-ind { margin-left: 5px; opacity: .35; font-size: 11px; }
.iws-sort-asc, .iws-sort-desc { opacity: 1; color: #2563eb; }
.iws-table tbody td { padding: 12px; border-bottom: 1px solid var(--border); vertical-align: middle; }
.iws-table tbody tr:hover { background: var(--surface-2); }
.iws-idx { width: 42px; color: var(--text-3); font-size: 12px; }
.iws-item-name { font-weight: 600; color: var(--text); }
.iws-uom {
  display: inline-block; padding: 3px 9px; border-radius: 999px;
  background: #dbeafe; color: #1d4ed8; font-size: 11.5px; font-weight: 600;
}
.iws-kebab-col { width: 38px; text-align: center; }
.iws-kebab-wrap { position: relative; display: inline-block; }
.iws-kebab {
  border: 0; background: transparent; cursor: pointer; color: var(--text-3);
  font-size: 16px; line-height: 1; padding: 2px 6px; border-radius: 6px;
}
.iws-kebab:hover { background: var(--surface-2); color: var(--text); }
.iws-menu-row { min-width: 190px; }
.iws-table tfoot .iws-total-row td {
  background: #eff6ff; border-top: 1px solid #bfdbfe; padding: 13px 12px; font-size: 13.5px;
}
.iws-sigma {
  display: inline-flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; border-radius: 7px; background: #dbeafe; color: #2563eb; font-weight: 700;
}
.gst-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 14px; margin-top: 14px; }
.gst-card { border-radius: 12px; padding: 16px; background: var(--surface-2); }
.gst-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.gst-card-icon {
  width: 34px; height: 34px; flex: 0 0 34px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.gst-card-title { font-weight: 700; font-size: 14px; }
.gst-card-desc { font-size: 11.5px; color: var(--text-3); margin-top: 1px; }
.gst-card-stats { display: flex; gap: 24px; }
.gst-stat-label { font-size: 11.5px; color: var(--text-3); margin-bottom: 3px; }
.gst-stat-value { font-size: 18px; font-weight: 700; }

.gst-c-blue    { background: #eff6ff; }
.gst-c-blue .gst-card-icon    { background: #dbeafe; color: #2563eb; }
.gst-c-blue .gst-stat-value   { color: #2563eb; }
.gst-c-emerald { background: #ecfdf5; }
.gst-c-emerald .gst-card-icon { background: #d1fae5; color: #059669; }
.gst-c-emerald .gst-stat-value{ color: #059669; }
.gst-c-cyan    { background: #ecfeff; }
.gst-c-cyan .gst-card-icon    { background: #cffafe; color: #0891b2; }
.gst-c-cyan .gst-stat-value   { color: #0891b2; }
.gst-c-amber   { background: #fffbeb; }
.gst-c-amber .gst-card-icon   { background: #fef3c7; color: #b45309; }
.gst-c-amber .gst-stat-value  { color: #b45309; }
.gst-c-violet  { background: #f5f3ff; }
.gst-c-violet .gst-card-icon  { background: #ede9fe; color: #7c3aed; }
.gst-c-violet .gst-stat-value { color: #7c3aed; }
.gst-c-total { background: var(--surface-2); }
.gst-c-total .gst-card-icon { background: #e2e8f0; color: #475569; }
.gst-c-total .gst-stat-value { color: var(--text); }

/* Aging Cards */
.aging-cards { display: flex; flex-direction: column; gap: 10px; }
.aging-card {
  background: var(--surface-2); border-radius: var(--radius-sm);
  padding: 14px 16px; border: 1px solid var(--border);
}
.aging-card-totals { border: 2px solid var(--border); background: #F8F9FA; }
.aging-card-name { font-size: 13.5px; font-weight: 600; color: var(--text); margin-bottom: 10px; }
.aging-buckets { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-bottom: 10px; }
@media (max-width: 600px) { .aging-buckets { grid-template-columns: repeat(2, 1fr); } }
.aging-bucket { display: flex; flex-direction: column; gap: 3px; }
.bucket-label { font-size: 10.5px; color: var(--text-3); text-transform: uppercase; letter-spacing: .05em; }
.bucket-val { font-size: 13px; }
.aging-card-total {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 10px; border-top: 1px solid var(--border); font-size: 13px;
}

/* Trial Balance Cards */
.tb-cards { display: flex; flex-direction: column; gap: 10px; }
.tb-card {
  background: var(--surface-2); border-radius: var(--radius-sm);
  padding: 14px 16px; border: 1px solid var(--border);
}
.tb-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 12px; }
.tb-account-name { font-size: 13px; font-weight: 600; color: var(--text); line-height: 1.4; }
.tb-buckets { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
@media (max-width: 500px) { .tb-buckets { grid-template-columns: repeat(2, 1fr); } }
.tb-bucket { display: flex; flex-direction: column; gap: 3px; }
.text-warn   { color: #E67700; }
.text-danger { color: #C92A2A; }
.fw-600 { font-weight: 600; }
.fw-700 { font-weight: 700; }

/* Daily Business MIS */
.mis-summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
@media (max-width: 900px) { .mis-summary-grid { grid-template-columns: repeat(2, 1fr); } }
.mis-summary-card {
  background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--radius-sm);
  padding: 12px 14px; display: flex; flex-direction: column; gap: 6px;
}
.mis-summary-val { font-size: 16px; font-weight: 700; font-family: var(--font); }

.mono-sm  {font-size: 13px; }
.green    { color: var(--green); }
.red      { color: var(--red);   }
.ta-r     { text-align: right; }
.empty-msg { text-align: center; padding: 32px; color: var(--text-3); font-size: 13px; }

.badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 10px; font-size: 11.5px; font-weight: 600; }
.badge-blue   { background: #E7F5FF; color: #1971C2; }
.badge-muted  { background: #F1F3F5; color: #868E96; }
.badge-danger { background: #FFF5F5; color: #C92A2A; }

@media (max-width: 768px) {
  .date-range-bar { padding: 12px 14px; gap: 8px; }
  .report-card { overflow-x: auto; }
}
@media (max-width: 480px) {
  .page-reports { padding: 12px; gap: 12px; }
  .dr-input { width: 100%; }
}
</style>