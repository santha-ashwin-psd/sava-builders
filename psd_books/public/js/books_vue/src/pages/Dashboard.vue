<template>
  <div class="ov-wrap">

    <!-- ── Hero ── -->
    <div class="ov-hero">
      <div class="ov-hero-left">
        <div class="ov-greeting">{{ greeting }}<span v-if="companyName">, {{ companyName }}</span> 👋</div>
        <div class="ov-subgreeting">Here's what's happening across your projects today.</div>
      </div>
      <div class="ov-hero-right">
        <div class="ov-date-pill"><span v-html="iconCal"></span>{{ todayLabel }}</div>
        <div class="ov-hero-btns">
          <button class="ov-ghost-btn" @click="refreshAll" :disabled="loading">
            <span v-html="iconRefresh" :class="{ 'ov-spin': loading }"></span> Refresh
          </button>
          <button class="ov-primary-btn" @click="navTo('/manufacturing/material-request/new')">
            <span v-html="iconPlus"></span> New Material Request
          </button>
        </div>
      </div>
    </div>

    <!-- ── KPI tiles ── -->
    <div class="ov-kpi-grid">
      <div v-for="kpi in kpiCards" :key="kpi.key" class="ov-kpi" :class="kpi.accent" @click="navTo(kpi.route)">
        <div class="ov-kpi-icon"><span v-html="kpi.icon"></span></div>
        <div class="ov-kpi-main">
          <div class="ov-kpi-label">{{ kpi.label }}</div>
          <div class="ov-kpi-value">
            <div v-if="loading" class="ov-shimmer" style="width:70px;height:24px;border-radius:6px"></div>
            <template v-else>{{ kpi.value }}</template>
          </div>
          <div class="ov-kpi-foot" :class="kpi.trend ? 'ov-trend-' + kpi.trend : ''">
            <template v-if="kpi.trend === 'up'">↑ </template><template v-else-if="kpi.trend === 'down'">↓ </template>{{ kpi.sub }}
          </div>
        </div>
        <span class="ov-kpi-go" v-html="iconArrow"></span>
        <svg class="ov-spark" viewBox="0 0 100 32" preserveAspectRatio="none">
          <path :d="kpi.spark.area" :fill="kpi.color" fill-opacity=".10" />
          <path :d="kpi.spark.line" fill="none" :stroke="kpi.color" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
        </svg>
      </div>
    </div>

    <!-- ── Pipeline + Pending approvals ── -->
    <div class="ov-row">
      <div class="ov-card">
        <div class="ov-card-head">
          <div class="ov-head-l">
            <span class="ov-head-ico ov-ico-blue" v-html="iconClip"></span>
            <div>
              <div class="ov-card-title">Material Request Pipeline</div>
              <div class="ov-card-sub">Requests by status</div>
            </div>
          </div>
          <select class="ov-select" v-model="period">
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="all">All Time</option>
          </select>
        </div>
        <div v-if="loading" class="ov-shimmer" style="height:190px;border-radius:10px"></div>
        <div v-else-if="!allTimeTotal" class="ov-empty">
          <div class="ov-empty-title">No material requests yet</div>
          <button class="ov-primary-btn ov-sm" style="background:#2563eb;color:#fff" @click="navTo('/manufacturing/material-request/new')">
            <span v-html="iconPlus"></span> New Material Request
          </button>
        </div>
        <div v-else class="ov-bars">
          <div v-for="st in pipelineRows" :key="st.key" class="ov-bar-row" @click="navTo('/manufacturing/material-request')">
            <span class="ov-bar-lbl">{{ st.label }}</span>
            <div class="ov-bar-track"><div class="ov-bar-fill" :style="{ width: st.pct + '%', background: st.color }"></div></div>
            <span class="ov-bar-n" :style="{ color: st.count ? st.color : '#94a3b8' }">{{ st.count }}</span>
          </div>
        </div>
      </div>

      <div class="ov-card">
        <div class="ov-card-head">
          <div class="ov-head-l">
            <span class="ov-head-ico ov-ico-blue" v-html="iconCheckSq"></span>
            <div class="ov-card-title">Pending Approvals</div>
          </div>
          <span class="ov-badge" :class="approvals.length ? 'ov-badge-amber' : 'ov-badge-green'">
            <template v-if="approvals.length">↥ </template>{{ approvals.length }} waiting
          </span>
        </div>
        <div v-if="loading" class="ov-shimmer" style="height:190px;border-radius:10px"></div>
        <template v-else-if="approvals.length">
          <div class="ov-appr-list">
            <div v-for="r in approvals.slice(0, 4)" :key="r.doctype + r.name" class="ov-appr" @click="openDoc(r)">
              <span class="ov-appr-ico" v-html="iconDoc"></span>
              <div class="ov-appr-info">
                <div class="ov-appr-name">{{ r.name }}</div>
                <div class="ov-appr-sub">{{ r.doctype }}<span v-if="r.project_label"> · {{ r.project_label }}</span></div>
              </div>
              <div class="ov-appr-right">
                <div class="ov-appr-date"><span v-html="iconClock"></span>{{ fmtDate(r.date) }}</div>
                <span v-if="r.for_me" class="ov-pill ov-pill-blue">For you</span>
                <span v-else-if="r.amount" class="ov-appr-amt">{{ fmt(r.amount) }}</span>
              </div>
            </div>
          </div>
          <button class="ov-wide-btn" @click="navTo('/manufacturing/material-request')">View all approvals →</button>
        </template>
        <div v-else class="ov-empty">
          <div class="ov-empty-icon ov-ok" v-html="iconCheck"></div>
          <div class="ov-empty-title" style="color:#16a34a">All caught up!</div>
          <div class="ov-empty-sub">Nothing is waiting for approval.</div>
        </div>
      </div>
    </div>

    <!-- ── Deliveries + Quality ── -->
    <div class="ov-row">
      <div class="ov-card">
        <div class="ov-card-head">
          <div class="ov-head-l">
            <span class="ov-head-ico ov-ico-blue" v-html="iconTruck"></span>
            <div>
              <div class="ov-card-title">Awaiting Delivery</div>
              <div class="ov-card-sub">Purchase orders not yet fully received</div>
            </div>
          </div>
          <button class="ov-link" @click="navTo('/purchase-orders')">View all →</button>
        </div>
        <div v-if="loading" class="ov-shimmer" style="height:190px;border-radius:10px"></div>
        <template v-else-if="d.awaiting_delivery && d.awaiting_delivery.length">
          <div class="ov-tbl-wrap">
            <table class="ov-tbl">
              <thead>
                <tr><th>PO Number</th><th>Supplier</th><th>Project</th><th class="ta-r">Amount</th><th>Expected</th></tr>
              </thead>
              <tbody>
                <tr v-for="r in d.awaiting_delivery" :key="r.name" @click="openDoc({ doctype: 'Purchase Order', name: r.name })">
                  <td><span class="ov-dot" :style="{ background: poDot(r.status) }"></span><span class="ov-tbl-link">{{ r.name }}</span></td>
                  <td>{{ r.supplier_name || '—' }}</td>
                  <td class="ov-clip">{{ r.project_label || '—' }}</td>
                  <td class="ta-r">{{ fmt(r.grand_total) }}</td>
                  <td class="ov-muted">{{ fmtDate(r.expected_delivery_date || r.date) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="ov-link ov-foot-link" @click="navTo('/purchase-orders')">View all pending deliveries →</button>
        </template>
        <div v-else class="ov-empty"><div class="ov-empty-sub">No purchase orders awaiting delivery.</div></div>
      </div>

      <div class="ov-card">
        <div class="ov-card-head">
          <div class="ov-head-l">
            <span class="ov-head-ico ov-ico-blue" v-html="iconShield"></span>
            <div>
              <div class="ov-card-title">Quality Inspections</div>
              <div class="ov-card-sub">All QC inspections</div>
            </div>
          </div>
          <button class="ov-link" @click="navTo('/quality/inspections')">View all →</button>
        </div>
        <div v-if="loading" class="ov-shimmer" style="height:190px;border-radius:10px"></div>
        <template v-else>
          <div class="ov-qc-tiles">
            <div class="ov-qc ov-qc-green" @click="navTo('/quality/inspections')"><span class="ov-qc-ico" v-html="iconClockSm"></span><span class="ov-qc-lbl">Pending</span><span class="ov-qc-n">{{ qc.pending }}</span></div>
            <div class="ov-qc ov-qc-blue"  @click="navTo('/quality/inspections')"><span class="ov-qc-ico" v-html="iconCheckSm"></span><span class="ov-qc-lbl">Passed</span><span class="ov-qc-n">{{ qc.pass }}</span></div>
            <div class="ov-qc ov-qc-red"   @click="navTo('/quality/inspections')"><span class="ov-qc-ico" v-html="iconXSm"></span><span class="ov-qc-lbl">Failed</span><span class="ov-qc-n">{{ qc.fail }}</span></div>
          </div>
          <div class="ov-sec-lbl">Recent Inspections</div>
          <div v-if="d.qc_recent && d.qc_recent.length" class="ov-tbl-wrap">
            <table class="ov-tbl ov-tbl-qc">
              <thead><tr><th>Item / Reference</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                <tr v-for="q in d.qc_recent" :key="q.name" @click="navTo({ path: '/quality/inspections', query: { open: q.name } })">
                  <td><div class="ov-qc-item">{{ q.item_name || q.item || '—' }}</div><div class="ov-qc-ref">{{ q.name }}</div></td>
                  <td><span class="ov-pill" :class="qcPill(q.status)">{{ qcLabel(q.status) }}</span></td>
                  <td class="ov-muted">{{ fmtDate(q.inspection_date) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="ov-empty" style="padding:16px"><div class="ov-empty-sub">No inspections yet.</div></div>
        </template>
      </div>
    </div>

    <!-- ── Project snapshot + Recent activity ── -->
    <div class="ov-row ov-row-snap">
      <div class="ov-card">
        <div class="ov-card-head">
          <div class="ov-head-l">
            <span class="ov-head-ico ov-ico-blue" v-html="iconFolderSq"></span>
            <div>
              <div class="ov-card-title">Project Snapshot</div>
              <div class="ov-card-sub">Open material requests and purchase orders per project</div>
            </div>
          </div>
          <select class="ov-select" v-model="snapProject">
            <option value="">All projects</option>
            <option v-for="pr in snapshot" :key="pr.name" :value="pr.name">{{ projLabel(pr) }}</option>
          </select>
        </div>
        <div v-if="loading" class="ov-shimmer" style="height:200px;border-radius:10px"></div>
        <div v-else-if="snapshotShown.length" class="ov-tbl-wrap ov-snap-wrap">
          <table class="ov-tbl ov-snap-tbl">
            <thead>
              <tr>
                <th rowspan="2" class="ov-th-n">#</th>
                <th rowspan="2">Project</th>
                <th colspan="2" class="ta-c">Material Requests</th>
                <th colspan="2" class="ta-c">Purchase Orders</th>
                <!-- Total Value column hidden -->
                <th rowspan="2">Progress</th>
                <th rowspan="2">Status</th>
                <th rowspan="2" class="ta-c">Action</th>
              </tr>
              <tr class="ov-subhead"><th class="ta-c">Open</th><th class="ta-c">Total</th><th class="ta-c">Open</th><th class="ta-c">Total</th></tr>
            </thead>
            <tbody>
              <tr v-for="(pr, i) in snapshotShown" :key="pr.name" @click="navTo('/projects')">
                <td><span class="ov-rank-badge" :class="i < 4 ? 'ov-rank-' + (i + 1) : 'ov-rank-n'">{{ i + 1 }}</span></td>
                <td class="ov-snap-name">{{ projLabel(pr) }}</td>
                <td class="ta-c" :class="{ 'ov-zero': !pr.open_mrs }">{{ pr.open_mrs }}</td>
                <td class="ta-c" :class="{ 'ov-zero': !pr.total_mrs }">{{ pr.total_mrs }}</td>
                <td class="ta-c" :class="{ 'ov-zero': !pr.open_pos }">{{ pr.open_pos }}</td>
                <td class="ta-c" :class="{ 'ov-zero': !pr.total_pos }">{{ pr.total_pos }}</td>
                <!-- Total Value cell hidden: <td class="ta-r ov-val">{{ fmt(pr.total_value) }}</td> -->
                <td>
                  <div class="ov-prog">
                    <div class="ov-prog-track"><div class="ov-prog-fill" :style="{ width: pr.progress + '%' }"></div></div>
                    <span class="ov-prog-n">{{ pr.progress }}%</span>
                  </div>
                </td>
                <td><span class="ov-pill" :class="pr.status === 'Closed' ? 'ov-pill-amber' : 'ov-pill-green'">{{ pr.status === 'Closed' ? 'Closed' : 'Active' }}</span></td>
                <td class="ta-c ov-act" @click.stop>
                  <button class="ov-kebab" @click="menuFor = menuFor === pr.name ? '' : pr.name" aria-label="Actions">⋮</button>
                  <div v-if="menuFor === pr.name" class="ov-menu">
                    <button @click="navTo('/projects')">View projects</button>
                    <button @click="navTo('/manufacturing/material-request')">Material Requests</button>
                    <button @click="navTo('/purchase-orders')">Purchase Orders</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="ov-empty"><div class="ov-empty-sub">No open projects.</div></div>
      </div>

      <div class="ov-card">
        <div class="ov-card-head">
          <div class="ov-head-l">
            <span class="ov-head-ico ov-ico-blue" v-html="iconBolt"></span>
            <div class="ov-card-title">Recent Activity</div>
          </div>
          <button class="ov-link" @click="navTo('/manufacturing/material-request')">View all →</button>
        </div>
        <div v-if="loading" class="ov-shimmer" style="height:120px;border-radius:10px"></div>
        <div v-else-if="d.recent_activity && d.recent_activity.length" class="ov-timeline">
          <div v-for="row in d.recent_activity" :key="row.doctype + row.name" class="ov-tl-row" @click="openDoc(row)">
            <div class="ov-tl-dot" :class="actDotClass(row.status)"><span v-html="actIcon(row.status)"></span></div>
            <div class="ov-tl-body">
              <div class="ov-tl-desc">{{ row.doctype }} <span class="ov-tl-doc">{{ row.name }}</span> {{ actVerb(row.status) }}</div>
              <div class="ov-tl-by">by {{ ownerName(row.modified_by) }}<span v-if="row.project_label"> · {{ row.project_label }}</span></div>
            </div>
            <div class="ov-tl-date">{{ fmtStamp(row.modified) }}</div>
          </div>
        </div>
        <div v-else class="ov-empty" style="padding:24px 0"><div class="ov-empty-sub">No recent activity</div></div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useFrappeCall, formatCurrency, formatDate } from "../composables/useFrappe.js";
import { apiGET } from "../api/client.js";
import { ownerName } from "../utils/userNames.js";

const router  = useRouter();
const fmt     = (v) => formatCurrency(v);
const fmtDate = (v) => (v ? formatDate(v) : "—");
const navTo   = (p) => router.push(p);

// ── Greeting / date ──
const companyName = ref(window.__booksCompany || "");
const greeting = computed(() => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
});
const todayLabel = (() => {
  const now = new Date();
  const wd = now.toLocaleDateString("en-GB", { weekday: "long" });
  const rest = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return `${wd}, ${rest}`;
})();

// ── Data (one call) ──
const { data: dash, loading: callLoading, execute } = useFrappeCall("psd_books.api.dashboard.get_projects_dashboard");
const loaded = ref(false);
const loading = computed(() => callLoading.value || !loaded.value);
async function refreshAll() { await execute(); loaded.value = true; }
const d = computed(() => dash.value?.message || dash.value || {});
onMounted(() => {
  refreshAll();
  if (!companyName.value) {
    apiGET("psd_books.api.admin.get_company_settings")
      .then(x => { companyName.value = x?.default_company || ""; }).catch(() => {});
  }
});

const qc = computed(() => d.value.qc || { pending: 0, pass: 0, fail: 0 });
const approvals = computed(() => d.value.pending_approvals || []);

// ── Sparklines ──
function spark(vals) {
  const v = (vals && vals.length > 1) ? vals : [0, 0];
  const max = Math.max(...v), min = Math.min(...v), span = max - min;
  const pts = v.map((n, i) => {
    const x = (i / (v.length - 1)) * 100;
    const y = span ? 28 - ((n - min) / span) * 22 : 22;   // flat line when there is no variation
    return [x, y];
  });
  // smooth curve through the points
  let line = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], cx = (x0 + x1) / 2;
    line += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return { line, area: `${line} L100,32 L0,32 Z` };
}

// ── KPI tiles ──
const kpiCards = computed(() => {
  const x = d.value, sp = x.spark || {};
  const pct = x.material_value_change_pct;
  return [
    { key: "projects", label: "Active Projects", accent: "ov-a-blue", icon: iconGlyph("folder"), route: "/projects", color: "#2563eb",
      value: x.active_projects ?? 0, sub: `${x.new_projects_month ?? 0} this month`, trend: (x.new_projects_month || 0) > 0 ? "up" : "", spark: spark(sp.projects) },
    { key: "mr", label: "MRs Pending Approval", accent: "ov-a-amber", icon: iconGlyph("clock"), route: "/manufacturing/material-request", color: "#f59e0b",
      value: x.mr_pending_count ?? 0, sub: "Waiting for project manager", trend: "", spark: spark(sp.mr) },
    { key: "po", label: "Open Purchase Orders", accent: "ov-a-green", icon: iconGlyph("bill"), route: "/purchase-orders", color: "#16a34a",
      value: x.open_po_count ?? 0, sub: `${x.new_pos_week ?? 0} this week`, trend: (x.new_pos_week || 0) > 0 ? "up" : "", spark: spark(sp.po) },
    { key: "val", label: "Total Material Value", accent: "ov-a-purple", icon: iconGlyph("box"), route: "/purchase-orders", color: "#7c3aed",
      value: fmt(x.material_value || 0),
      sub: pct == null ? "This month's purchase orders" : `${Math.abs(pct)}% vs last month`,
      trend: pct == null ? "" : pct >= 0 ? "up" : "down", spark: spark(sp.value) },
  ];
});

// ── MR pipeline ──
const PIPELINE = [
  { key: "Draft",            label: "Draft",            color: "#94a3b8" },
  { key: "Pending Approval", label: "Pending Approval", color: "#f59e0b" },
  { key: "Sent Back",        label: "Sent Back",        color: "#fb7185" },
  { key: "Approved",         label: "Approved",         color: "#2563eb" },
  { key: "Partly Issued",    label: "Partly Issued",    color: "#fb923c" },
  { key: "Issued",           label: "Issued",           color: "#34d399" },
  { key: "Ordered",          label: "Ordered",          color: "#8b5cf6" },
];
const period = ref("month");
const pipelineData = computed(() => (d.value.mr_pipeline_periods || {})[period.value] || d.value.mr_pipeline || {});
const allTimeTotal = computed(() => PIPELINE.reduce((a, s) => a + ((d.value.mr_pipeline || {})[s.key] || 0), 0));
const pipelineRows = computed(() => {
  const src = pipelineData.value;
  const max = Math.max(1, ...PIPELINE.map(s => src[s.key] || 0));
  return PIPELINE.map(s => {
    const count = src[s.key] || 0;
    return { ...s, count, pct: Math.round(count / max * 100) };
  });
});

// ── Awaiting delivery / QC helpers ──
const poDot = (st) => (st === "Partially Received" ? "#2563eb" : "#f59e0b");
const qcLabel = (s) => (s === "Pass" ? "Passed" : s === "Fail" ? "Failed" : s || "Pending");
const qcPill = (s) => (s === "Pass" ? "ov-pill-green" : s === "Fail" ? "ov-pill-red" : "ov-pill-amber");

// ── Project snapshot ──
const snapshot = computed(() => d.value.project_snapshot || []);
const snapProject = ref("");
const menuFor = ref("");
const closeMenu = () => { menuFor.value = ""; };
onMounted(() => window.addEventListener("click", closeMenu));
onUnmounted(() => window.removeEventListener("click", closeMenu));
const snapshotShown = computed(() => snapProject.value ? snapshot.value.filter(p => p.name === snapProject.value) : snapshot.value);
const projLabel = (pr) => `${pr.project_code || pr.name}${pr.project_name ? " – " + pr.project_name : ""}`;

// ── Recent activity ──
const VERB = { "Approved": "approved", "Pending Approval": "sent for approval", "Sent Back": "sent back", "Draft": "saved as draft",
  "Partly Issued": "partly issued", "Issued": "issued", "Ordered": "ordered", "To Receive": "confirmed", "Partially Received": "partially received",
  "Received": "received", "Completed": "completed", "Submitted": "submitted" };
const actVerb = (s) => VERB[s] || (s ? `is ${String(s).toLowerCase()}` : "updated");
const GOOD = ["Approved", "Issued", "Received", "Completed", "Ordered"];
const actDotClass = (s) => GOOD.includes(s) ? "ov-d-green" : s === "Sent Back" ? "ov-d-red" : s === "Pending Approval" ? "ov-d-amber" : "ov-d-blue";
const actIcon = (s) => iconGlyph(GOOD.includes(s) ? "tick" : "bill");
function fmtStamp(v) {
  if (!v) return "";
  const t = new Date(String(v).replace(" ", "T"));
  if (isNaN(t)) return String(v);
  const date = t.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const time = t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  return `${date}, ${time}`;
}

// ── Opening documents ──
function openDoc(r) {
  if (r.doctype === "Material Request") return navTo("/manufacturing/material-request/" + encodeURIComponent(r.name));
  if (r.doctype === "Purchase Order")   return navTo({ path: "/purchase-orders",   query: { open: r.name } });
  if (r.doctype === "Purchase Receipt") return navTo({ path: "/purchase-receipts", query: { open: r.name } });
}

// ── Inline SVG glyphs ──
function iconGlyph(k, size = 20) {
  const s = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const map = {
    clock:  `<svg ${s}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    bill:   `<svg ${s}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>`,
    folder: `<svg ${s}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>`,
    box:    `<svg ${s}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    tick:   `<svg ${s}><polyline points="20 6 9 17 4 12"/></svg>`,
  };
  return map[k] || "";
}
const mk = (inner, w = 18) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
const iconPlus     = mk('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', 14);
const iconRefresh  = mk('<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>', 14);
const iconCal      = mk('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', 14);
const iconArrow    = mk('<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>', 13);
const iconClip     = mk('<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>');
const iconCheckSq  = mk('<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>');
const iconTruck    = mk('<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>');
const iconShield   = mk('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>');
const iconFolderSq = mk('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>');
const iconBolt     = mk('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>');
const iconDoc      = mk('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>');
const iconClock    = mk('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 12);
const iconClockSm  = mk('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 14);
const iconCheckSm  = mk('<polyline points="20 6 9 17 4 12"/>', 14);
const iconXSm      = mk('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 14);
const iconCheck    = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#dcfce7"/><polyline points="7 12.5 10.5 16 17 9" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
</script>

<style scoped>
.ov-wrap {
  display: flex; flex-direction: column; gap: 16px;
  padding: 24px 28px;
  font-family: "Plus Jakarta Sans", Lato, system-ui, sans-serif;
  background: #f8fafc; min-height: 100%;
  color: #0f172a;
}
.ta-r { text-align: right; }

/* ── Hero ── */
.ov-hero {
  position: relative; overflow: hidden;
  display: flex; align-items: stretch; justify-content: space-between; gap: 16px;
  padding: 22px 26px; border-radius: 16px;
  background: linear-gradient(110deg, #1d4ed8 0%, #2563eb 55%, #3b82f6 100%);
  color: #fff; box-shadow: 0 10px 26px rgba(37,99,235,.22);
}
.ov-hero::after {
  content: ""; position: absolute; right: 120px; bottom: 0; width: 360px; height: 100%;
  opacity: .16; pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 120' fill='none' stroke='white' stroke-width='1.5'%3E%3Cpath d='M20 120V60h50v60M70 120V30l60-18v108M130 120V50h60v70M190 120V20l50-14v114M240 120V70h70v50'/%3E%3Cpath d='M85 45h30M85 62h30M85 79h30M85 96h30M205 36h20M205 54h20M205 72h20M205 90h20'/%3E%3C/svg%3E") no-repeat right bottom / contain;
}
.ov-hero-left, .ov-hero-right { position: relative; z-index: 1; }
.ov-greeting { font-size: 21px; font-weight: 800; letter-spacing: -.02em; }
.ov-subgreeting { font-size: 13px; opacity: .88; margin-top: 4px; }
.ov-hero-right { display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; gap: 14px; flex-shrink: 0; }
.ov-date-pill { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #334155; border-radius: 9px; padding: 7px 14px; font-size: 12.5px; font-weight: 600; }
.ov-hero-btns { display: flex; align-items: center; gap: 10px; }
.ov-primary-btn {
  display: inline-flex; align-items: center; gap: 7px;
  background: #fff; color: #1d4ed8; border: none; border-radius: 10px;
  padding: 9px 16px; font-size: 13px; font-weight: 700; cursor: pointer;
  font-family: inherit; transition: transform .12s, box-shadow .12s;
}
.ov-primary-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0,0,0,.16); }
.ov-primary-btn.ov-sm { padding: 8px 14px; font-size: 12.5px; }
.ov-ghost-btn {
  display: inline-flex; align-items: center; gap: 7px;
  background: rgba(255,255,255,.12); color: #fff;
  border: 1px solid rgba(255,255,255,.5); border-radius: 10px;
  padding: 9px 16px; font-size: 12.5px; font-weight: 600; cursor: pointer;
  font-family: inherit; transition: background .12s;
}
.ov-ghost-btn:hover { background: rgba(255,255,255,.24); }
.ov-ghost-btn:disabled { opacity: .7; cursor: default; }
.ov-spin { display: inline-flex; animation: ov-rot 1s linear infinite; }
@keyframes ov-rot { to { transform: rotate(360deg); } }

/* ── KPI tiles ── */
.ov-kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.ov-kpi {
  position: relative; display: flex; align-items: flex-start; gap: 14px;
  background: #fff; border: 1px solid #eef1f5; border-radius: 14px;
  padding: 18px 18px 16px; cursor: pointer; overflow: hidden;
  box-shadow: 0 1px 2px rgba(15,23,42,.04);
  transition: box-shadow .15s, transform .15s;
}
.ov-kpi:hover { box-shadow: 0 8px 22px rgba(15,23,42,.09); transform: translateY(-2px); }
.ov-a-blue   { background: linear-gradient(135deg, #f5f9ff, #fff 60%); } .ov-a-blue   .ov-kpi-icon { background: #dbeafe; color: #2563eb; }
.ov-a-amber  { background: linear-gradient(135deg, #fff9f2, #fff 60%); } .ov-a-amber  .ov-kpi-icon { background: #ffedd5; color: #ea580c; }
.ov-a-green  { background: linear-gradient(135deg, #f3fcf6, #fff 60%); } .ov-a-green  .ov-kpi-icon { background: #dcfce7; color: #16a34a; }
.ov-a-purple { background: linear-gradient(135deg, #f8f5ff, #fff 60%); } .ov-a-purple .ov-kpi-icon { background: #ede9fe; color: #7c3aed; }
.ov-kpi-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ov-kpi-main { min-width: 0; position: relative; z-index: 1; }
.ov-kpi-label { font-size: 11.5px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: .04em; }
.ov-kpi-value { font-size: 25px; font-weight: 800; letter-spacing: -.03em; margin-top: 3px; line-height: 1.15; }
.ov-kpi-foot { font-size: 11.5px; color: #94a3b8; margin-top: 4px; }
.ov-trend-up { color: #16a34a; font-weight: 600; } .ov-trend-down { color: #dc2626; font-weight: 600; }
.ov-kpi-go { position: absolute; top: 14px; right: 14px; width: 26px; height: 26px; border-radius: 50%; background: #fff; border: 1px solid #e2e8f0; color: #334155; display: flex; align-items: center; justify-content: center; z-index: 2; }
.ov-spark { position: absolute; right: 0; bottom: 0; width: 48%; height: 40px; opacity: .95; }

/* ── Layout rows ── */
.ov-row { display: grid; grid-template-columns: 1.25fr 1fr; gap: 16px; align-items: stretch; }

/* ── Cards ── */
.ov-card { background: #fff; border: 1px solid #eef1f5; border-radius: 14px; padding: 20px 22px; box-shadow: 0 1px 2px rgba(15,23,42,.04); min-width: 0; }
.ov-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.ov-head-l { display: flex; align-items: center; gap: 12px; min-width: 0; }
.ov-head-ico { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ov-ico-blue { background: #e0ecff; color: #2563eb; }
.ov-card-title { font-size: 15px; font-weight: 700; color: #0f172a; }
.ov-card-sub { font-size: 12px; color: #94a3b8; margin-top: 2px; }
.ov-link { background: none; border: none; cursor: pointer; font-size: 12.5px; font-weight: 600; color: #2563eb; font-family: inherit; padding: 0; white-space: nowrap; }
.ov-link:hover { text-decoration: underline; }
.ov-select {
  background-color: #fff; color: #334155; border: 1px solid #e2e8f0; border-radius: 9px;
  padding: 7px 30px 7px 12px; font-size: 12.5px; font-weight: 600; font-family: inherit; cursor: pointer; outline: none;
  appearance: none; -webkit-appearance: none; max-width: 190px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='3'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 11px center;
}

/* ── Pipeline bars ── */
.ov-bars { display: flex; flex-direction: column; gap: 14px; padding-top: 4px; }
.ov-bar-row { display: grid; grid-template-columns: 112px 1fr 34px; align-items: center; gap: 12px; cursor: pointer; }
.ov-bar-lbl { font-size: 12.5px; color: #334155; }
.ov-bar-track { background: #f1f5f9; border-radius: 20px; height: 9px; overflow: hidden; }
.ov-bar-fill { height: 100%; border-radius: 20px; transition: width .6s ease; min-width: 0; }
.ov-bar-n { font-size: 13px; font-weight: 800; text-align: right; }

/* ── Badges / pills ── */
.ov-badge { display: inline-flex; align-items: center; gap: 3px; padding: 4px 11px; border-radius: 20px; font-size: 11.5px; font-weight: 700; white-space: nowrap; }
.ov-badge-amber { background: #fff1e0; color: #c2410c; } .ov-badge-green { background: #f0fdf4; color: #15803d; }
.ov-pill { display: inline-flex; align-items: center; padding: 3px 11px; border-radius: 7px; font-size: 11.5px; font-weight: 700; }
.ov-pill-blue { background: #e0ecff; color: #1d4ed8; }
.ov-pill-green { background: #dcfce7; color: #15803d; } .ov-pill-amber { background: #ffedd5; color: #c2410c; } .ov-pill-red { background: #fee2e2; color: #b91c1c; }

/* ── Pending approvals ── */
.ov-appr-list { display: flex; flex-direction: column; gap: 10px; }
.ov-appr { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid #eef1f5; border-radius: 12px; cursor: pointer; transition: background .12s, border-color .12s; }
.ov-appr:hover { background: #f8fafc; border-color: #dbe4f0; }
.ov-appr-ico { width: 38px; height: 38px; border-radius: 10px; background: #e0ecff; color: #2563eb; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ov-appr-info { flex: 1; min-width: 0; }
.ov-appr-name { font-size: 13.5px; font-weight: 700; color: #2563eb; }
.ov-appr-sub { font-size: 11.5px; color: #94a3b8; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ov-appr-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }
.ov-appr-date { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; color: #94a3b8; }
.ov-appr-amt { font-size: 12.5px; font-weight: 700; color: #334155; }
.ov-wide-btn { width: 100%; margin-top: 12px; background: #eff5ff; border: none; border-radius: 10px; padding: 11px; font-size: 12.5px; font-weight: 700; color: #2563eb; cursor: pointer; font-family: inherit; }
.ov-wide-btn:hover { background: #e0ecff; }

/* ── Tables ── */
.ov-tbl-wrap { overflow-x: auto; border-radius: 10px; }
.ov-tbl { width: 100%; border-collapse: collapse; font-size: 12.5px; }
.ov-tbl thead th { background: #f1f5f9; color: #475569; font-weight: 700; font-size: 11.5px; text-align: left; padding: 9px 12px; white-space: nowrap; }
.ov-tbl thead th.ta-r { text-align: right; }
.ov-tbl tbody td { padding: 11px 12px; border-bottom: 1px solid #f1f4f8; color: #334155; white-space: nowrap; }
.ov-tbl tbody tr { cursor: pointer; transition: background .12s; }
.ov-tbl tbody tr:hover { background: #f8fafc; }
.ov-tbl tbody tr:last-child td { border-bottom: none; }
.ov-tbl-link { color: #2563eb; font-weight: 700; }
.ov-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 10px; vertical-align: middle; }
.ov-clip { max-width: 150px; overflow: hidden; text-overflow: ellipsis; }
.ov-muted { color: #64748b; }
.ov-foot-link { display: block; margin-top: 12px; }

/* ── Quality ── */
.ov-qc-tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px; }
.ov-qc { display: flex; align-items: center; gap: 8px; padding: 11px 14px; border-radius: 10px; cursor: pointer; font-size: 12.5px; font-weight: 600; border: 1px solid transparent; }
.ov-qc-ico { width: 24px; height: 24px; border-radius: 7px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,.7); }
.ov-qc-lbl { flex: 1; }
.ov-qc-n { font-size: 17px; font-weight: 800; }
.ov-qc-green { background: #ecfdf3; color: #15803d; border-color: #c9f1d8; }
.ov-qc-blue  { background: #eaf2ff; color: #1d4ed8; border-color: #cfe0ff; }
.ov-qc-red   { background: #fff0f0; color: #b91c1c; border-color: #fcd5d5; }
.ov-sec-lbl { font-size: 12.5px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
.ov-qc-item { font-weight: 600; color: #0f172a; }
.ov-qc-ref { font-size: 10.5px; color: #94a3b8; margin-top: 1px; }
.ov-tbl-qc tbody td { white-space: normal; padding: 9px 12px; }

/* ── Project snapshot ── */
.ov-row-snap { grid-template-columns: 1.9fr 1fr; }
.ov-snap-wrap { overflow-x: auto; }
.ov-snap-tbl thead th { background: #f1f5f9; }
.ov-snap-tbl .ov-subhead th { background: #f1f5f9; color: #94a3b8; font-weight: 600; padding-top: 0; }
.ov-snap-tbl thead tr:first-child th { padding-bottom: 4px; }
.ov-th-n { width: 40px; }
.ta-c { text-align: center; }
.ov-snap-tbl tbody td { padding: 9px 12px; }
.ov-snap-name { font-weight: 600; color: #0f172a; }
.ov-zero { color: #94a3b8; }
.ov-val { font-weight: 600; color: #0f172a; }
.ov-rank-badge { width: 26px; height: 26px; border-radius: 7px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: #fff; background: #94a3b8; }
.ov-rank-1 { background: #f59e0b; } .ov-rank-2 { background: #64748b; } .ov-rank-3 { background: #c2410c; } .ov-rank-4 { background: #3b82f6; }
.ov-rank-n { background: #e8edf3; color: #475569; }
.ov-prog { display: flex; align-items: center; gap: 10px; min-width: 130px; }
.ov-prog-track { flex: 1; height: 7px; border-radius: 20px; background: #e8eef7; overflow: hidden; }
.ov-prog-fill { height: 100%; border-radius: 20px; background: #3b82f6; }
.ov-prog-n { font-size: 12px; color: #475569; width: 34px; text-align: right; }
.ov-act { position: relative; }
.ov-kebab { background: none; border: none; cursor: pointer; font-size: 18px; line-height: 1; color: #334155; padding: 2px 8px; border-radius: 6px; }
.ov-kebab:hover { background: #eef2f7; }
.ov-menu { position: absolute; right: 12px; top: 34px; z-index: 20; min-width: 160px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; box-shadow: 0 10px 24px rgba(15,23,42,.14); padding: 4px; text-align: left; }
.ov-menu button { display: block; width: 100%; text-align: left; background: none; border: none; padding: 8px 12px; font-size: 12.5px; color: #334155; border-radius: 7px; cursor: pointer; font-family: inherit; }
.ov-menu button:hover { background: #f1f5f9; }

/* ── Activity ── */
.ov-timeline { display: flex; flex-direction: column; }
.ov-tl-row { display: flex; align-items: center; gap: 12px; padding: 10px 6px; border-radius: 9px; cursor: pointer; transition: background .12s; }
.ov-tl-row:hover { background: #f8fafc; }
.ov-tl-dot { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ov-tl-dot :deep(svg) { width: 14px; height: 14px; }
.ov-d-green { background: #dcfce7; color: #16a34a; } .ov-d-blue { background: #e0ecff; color: #2563eb; }
.ov-d-amber { background: #ffedd5; color: #ea580c; } .ov-d-red { background: #fee2e2; color: #dc2626; }
.ov-tl-body { flex: 1; min-width: 0; }
.ov-tl-desc { font-size: 13px; color: #334155; font-weight: 500; }
.ov-tl-doc { color: #2563eb; font-weight: 700; }
.ov-tl-by { font-size: 11.5px; color: #94a3b8; margin-top: 1px; }
.ov-tl-date { font-size: 11.5px; color: #94a3b8; flex-shrink: 0; }

/* ── Empty / shimmer ── */
.ov-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 30px 16px; text-align: center; }
.ov-empty-icon.ov-ok { opacity: 1; }
.ov-empty-title { font-size: 14px; font-weight: 700; color: #334155; }
.ov-empty-sub { font-size: 12.5px; color: #94a3b8; line-height: 1.5; max-width: 260px; }
.ov-shimmer { background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%); background-size: 200% 100%; animation: ov-sh 1.4s infinite; }
@keyframes ov-sh { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }

/* ── Responsive ── */
@media (max-width: 1200px) {
  .ov-row, .ov-row-snap { grid-template-columns: 1fr; }
  .ov-kpi-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .ov-wrap { padding: 16px; gap: 14px; }
  .ov-hero { flex-direction: column; gap: 14px; padding: 18px 20px; }
  .ov-hero-right { width: 100%; align-items: flex-start; }
  .ov-hero-btns { width: 100%; }
  .ov-primary-btn { flex: 1; justify-content: center; }
  .ov-qc-tiles { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .ov-wrap { padding: 12px 10px; gap: 12px; }
  .ov-kpi-grid { grid-template-columns: 1fr; gap: 10px; }
  .ov-card { padding: 16px; border-radius: 12px; }
  .ov-greeting { font-size: 18px; }
  .ov-bar-row { grid-template-columns: 92px 1fr 30px; }
  .ov-tl-date { display: none; }
}
</style>