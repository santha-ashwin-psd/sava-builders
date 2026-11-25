<template>
<div class="list-page">
  <div class="sales-toolbar">
    <div class="sales-search">
      <span v-html="icon('search',13)" style="color:#9ca3af;flex-shrink:0"></span>
      <input v-model="search" placeholder="Search weekly bills…" class="sales-search-input" autocomplete="off"/>
    </div>
    <div class="sales-pills">
      <button v-for="f in FILTERS" :key="f.k" class="sales-pill" :class="[{active: activeFilter===f.k}, f.k!=='all' ? PILL_CLASS[f.k] : '']" @click="activeFilter=f.k">
        {{ f.l }}
        <span class="sales-pill-count" :class="activeFilter===f.k?'':'zb-pc-muted'">{{ counts[f.k] }}</span>
      </button>
    </div>
    <select v-model="projectFilter" class="inv-fi ct-project-filter" title="Filter by project">
      <option value="">All projects</option>
      <option v-for="p in projects" :key="p.name" :value="p.name">{{ p.project_name || p.name }}</option>
    </select>
    <div class="cust-toolbar-right" style="margin-left:auto">
      <button class="sales-btn-ghost" @click="load" title="Refresh"><span v-html="icon('refresh',13)"></span> Refresh</button>
      <button class="sales-btn-primary" :disabled="!$canCreate('admin')" :title="!$canCreate('admin') ? 'Not permitted' : ''" @click="openAdd"><span v-html="icon('plus',13)"></span> New Weekly Bill</button>
    </div>
  </div>


  <!-- KPI cards (click a card to filter the list) -->
  <div class="bk-kpi-grid bk-kpi-grid-4">
    <div class="bk-kpi-card bk-kpi-accent clickable" @click="activeFilter='all'"><div class="bk-kpi-inner"><div class="bk-kpi-icon" style="background:#dbeafe"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div class="bk-kpi-body"><div class="bk-kpi-label">Total Bills</div><div class="bk-kpi-value">{{ kpi.all.n }}</div><div class="bk-kpi-trend ct-kpi-sub">KES {{ fmtKES(kpi.all.value) }}</div></div></div></div>
    <div class="bk-kpi-card clickable" @click="activeFilter='draft'"><div class="bk-kpi-inner"><div class="bk-kpi-icon" style="background:#e2e8f0"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></div><div class="bk-kpi-body"><div class="bk-kpi-label">Draft</div><div class="bk-kpi-value">{{ kpi.draft.n }}</div><div class="bk-kpi-trend ct-kpi-sub">KES {{ fmtKES(kpi.draft.value) }}</div></div></div></div>
    <div class="bk-kpi-card bk-kpi-warn clickable" @click="activeFilter='pending'"><div class="bk-kpi-inner"><div class="bk-kpi-icon" style="background:#fef3c7"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><div class="bk-kpi-body"><div class="bk-kpi-label">Pending Approval</div><div class="bk-kpi-value bk-kpi-amber">{{ kpi.pending.n }}</div><div class="bk-kpi-trend ct-kpi-sub">KES {{ fmtKES(kpi.pending.value) }}</div></div></div></div>
    <div class="bk-kpi-card clickable" @click="activeFilter='approved'"><div class="bk-kpi-inner"><div class="bk-kpi-icon" style="background:#dcfce7"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#16a34a" stroke-width="1.8"/><polyline points="7 12.5 10.5 16 17 9" stroke="#16a34a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="bk-kpi-body"><div class="bk-kpi-label">Approved</div><div class="bk-kpi-value bk-kpi-green">{{ kpi.approved.n }}</div><div class="bk-kpi-trend ct-kpi-sub">KES {{ fmtKES(kpi.approved.value) }}</div></div></div></div>
  </div>
  <div class="bk-stat-grid">
    <div class="bk-stat-card"><div class="bk-stat-content"><div><div class="bk-stat-label">Bills This Week</div><div class="bk-stat-value">{{ kpi.weekN }}</div></div><div class="bk-stat-icon" style="background:#dbeafe;color:#2563eb"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div></div></div>
    <div class="bk-stat-card"><div class="bk-stat-content"><div><div class="bk-stat-label">Amount This Week</div><div class="bk-stat-value bk-kpi-blue" style="font-size:16px">KES {{ fmtKES(kpi.weekValue) }}</div></div><div class="bk-stat-icon" style="background:#cffafe;color:#0891b2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg></div></div></div>
    <div class="bk-stat-card"><div class="bk-stat-content"><div><div class="bk-stat-label">Total Paid</div><div class="bk-stat-value bk-kpi-green" style="font-size:16px">KES {{ fmtKES(kpi.paid) }}</div></div><div class="bk-stat-icon" style="background:#dcfce7;color:#16a34a"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg></div></div></div>
    <div class="bk-stat-card"><div class="bk-stat-content"><div><div class="bk-stat-label">Balance To Pay</div><div class="bk-stat-value bk-kpi-amber" style="font-size:16px">KES {{ fmtKES(balanceToPay) }}</div></div><div class="bk-stat-icon" style="background:#fef3c7;color:#d97706"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div></div></div>
  </div>

  <div class="inv-table-wrap">
    <table class="inv-table">
      <thead>
        <tr><th class="vt-th">Bill</th><th class="vt-th">Project</th><th class="vt-th">Contract</th><th class="vt-th">Week (Saturday to Friday)</th><th class="vt-th vt-th-r">Total to Pay (KES)</th><th class="vt-th vt-th-r">Balance to Pay (KES)</th><th class="vt-th">Status</th></tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="n in 6" :key="n" class="vt-row-shimmer"><td colspan="7"><div class="shimmer" style="height:12px;border-radius:3px;width:65%"></div></td></tr>
        </template>
        <tr v-else-if="!filtered.length">
          <td colspan="7" class="vt-empty">
            <div class="vt-empty-title">{{ search || projectFilter || activeFilter!=='all' ? 'No results found' : 'No weekly bills yet' }}</div>
            <div class="vt-empty-sub">{{ search || projectFilter || activeFilter!=='all' ? 'Try adjusting your search or filter' : 'Create the first weekly bill' }}</div>
          </td>
        </tr>
        <tr v-else v-for="b in filtered" :key="b.name" class="inv-row" @click="openEdit(b)">
          <td class="vt-td vt-td-mono">{{ b.name }}</td>
          <td class="vt-td">{{ projectsLabel(b, columns[b.name], projectNames) }}</td>
          <td class="vt-td vt-td-mono" :title="((columns[b.name] || {}).contracts || []).join(', ')">{{ contractsLabel((columns[b.name] || {}).contracts) }}</td>
          <td class="vt-td vt-td-secondary">{{ weekLabel(b.week_start) }}</td>
          <td class="vt-td vt-td-r">{{ fmtKES(b.total_amount) }}</td>
          <td class="vt-td vt-td-r">{{ columns[b.name] ? fmtKES(columns[b.name].balance_after) : '—' }}</td>
          <td class="vt-td"><span class="vt-badge" :class="'vt-badge-'+statusClass(b.status)"><span class="vt-badge-dot"></span>{{ b.status }}</span></td>
        </tr>
      </tbody>
    </table>
    <div class="vt-footer" v-if="!loading && list.length">Showing <strong>{{ filtered.length }}</strong> of <strong>{{ scoped.length }}</strong> bills</div>
  </div>
  <p style="margin:10px 4px;font-size:12px;color:#6b7280">A project can have more than one bill in the same week. A bill lists the Approved contracts of all projects that still have a balance, and a contract can be paid once a week. A Director approves each bill, and the bill is locked once sent for approval.</p>

  <Teleport to="body">
    <div v-if="showDrawer" class="inv-drawer-bg" @click.self="showDrawer=false">
      <div class="inv-drawer-panel open ct-drawer" style="width:1160px;max-width:98vw">
        <div class="inv-dh" style="background:linear-gradient(135deg,#1e3a5f,#1a6ef7);padding:18px 24px">
          <div class="cust-drawer-header-left">
            <div>
              <div class="inv-dh-title">{{ form.name || 'New Weekly Bill' }}</div>
              <div class="cust-drawer-sub">{{ form.name ? form.status : 'Amounts to pay contractors for one week' }}</div>
            </div>
          </div>
          <button class="inv-dclose" style="background:rgba(255,255,255,.15);border:none;cursor:pointer;color:#fff;width:30px;height:30px;border-radius:8px;display:grid;place-items:center" @click="showDrawer=false" v-html="icon('x',15)"></button>
        </div>

        <div class="inv-dbody" style="padding:24px;overflow-y:auto;flex:1">
          <div class="inv-fg" :class="ac.canEdit ? 'inv-fg3' : 'inv-fg2'">
            <div v-if="ac.canEdit" class="inv-field">
              <label class="inv-lbl">Project</label>
              <select v-model="drawerProject" class="inv-fi" @change="onDrawerProject">
                <option value="">All projects</option>
                <option v-for="p in openProjects" :key="p.name" :value="p.name">{{ p.project_name || p.name }}</option>
              </select>
            </div>
            <div class="inv-field">
              <label class="inv-lbl">Pick any date in the week <span class="nim-req">*</span></label>
              <input type="date" v-model="form.week_date" class="inv-fi" :style="errStyle('week_date')" :disabled="!ac.canEdit || !!form.name" @change="delete formErrors.week_date; refreshRows()"/>
              <div v-if="formErrors.week_date" class="ct-err">{{ formErrors.week_date }}</div>
            </div>
            <div class="inv-field">
              <label class="inv-lbl">Week (Saturday to Friday)</label>
              <input class="inv-fi" :value="weekLabel(form.week_date)" disabled/>
            </div>
          </div>


          <div style="overflow-x:auto;margin-top:16px">
            <table class="inv-table">
              <thead>
                <tr><th class="vt-th">Contract</th><th class="vt-th">Contractor</th><th class="vt-th">Activity</th><th class="vt-th">Project</th><th class="vt-th vt-th-r">Contract Value</th><th class="vt-th vt-th-r">Paid Till Now</th><th class="vt-th vt-th-r">Balance Amount</th><th class="vt-th vt-th-r">Amount To Pay Now</th></tr>
              </thead>
              <tbody>
                <tr v-if="rowsLoading"><td colspan="8" class="vt-empty"><div class="vt-empty-sub">Loading contracts…</div></td></tr>
                <tr v-else-if="!visible.length"><td colspan="8" class="vt-empty"><div class="vt-empty-sub">{{ !ac.canEdit ? 'No contracts on this bill' : drawerProject ? 'No unpaid Approved contracts for this project' : rows.length ? 'All Approved contracts are fully paid' : 'There are no Approved contracts to bill' }}</div></td></tr>
                <tr v-else v-for="r in visible" :key="r.contract">
                  <td class="vt-td vt-td-mono">{{ r.contract }}</td>
                  <td class="vt-td">{{ contractorNames[r.contractor] || r.contractor }}<span v-if="certExpired(r.contractor)" class="ct-flag"> certificate expired</span></td>
                  <td class="vt-td">{{ contractActivity[r.contract] || '—' }}</td>
                  <td class="vt-td">{{ projectNames[contractProject[r.contract] || r.project] || contractProject[r.contract] || r.project || '—' }}</td>
                  <td class="vt-td vt-td-r">{{ fmtKES(r.contract_value) }}</td>
                  <td class="vt-td vt-td-r">{{ fmtKES(r.paid_till_now) }}<span v-if="!r.paid_till_now" class="ct-hint"> (New)</span></td>
                  <td class="vt-td vt-td-r">{{ fmtKES(r.balance) }}</td>
                  <td class="vt-td vt-td-r">
                    <input type="text" inputmode="decimal" autocomplete="off" :value="r.amount_to_pay" @input="onAmountInput($event, r)" class="inv-fi" style="width:130px;text-align:right" :disabled="!ac.canEdit || !!r.paid_this_week || rowLocked(r)" :aria-label="'Amount to pay now, contract ' + r.contract" :style2="''"/>
                    <div v-if="r.paid_this_week" class="ct-hint">Already on {{ r.paid_this_week }} this week</div>
                    <div v-if="rowLocked(r)" class="ct-hint">Past week: already has payments</div>
                    <div v-if="rowError(r)" class="ct-err">{{ rowError(r) }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="visible.length" style="margin-top:12px;font-weight:600;text-align:right">Total to pay now: KES {{ fmtKES(total) }}</div>
          <div v-if="ac.canEdit" class="ct-info"><span v-html="icon('info',14)"></span>Fully paid contracts are not listed. Contracts of all projects are shown unless you pick a project. A contract can be paid once a week, and an amount can't be above its balance.</div>

          <div v-if="form.status===SENT_BACK && form.rejection_reason" class="ct-note ct-note-bad">Sent back: {{ form.rejection_reason }}</div>
          <div v-if="form.status===PENDING" class="ct-note">Waiting for Director approval. The bill is locked.</div>
          <div v-if="form.status===APPROVED" class="ct-note ct-note-ok">Approved by {{ ownerName(form.approved_by) }} on {{ fmtDate(form.approved_on) }}. Payment is not recorded until the bill is marked Paid.</div>
          <div v-if="form.status===CANCELLED" class="ct-note ct-note-bad">Cancelled by {{ ownerName(form.cancelled_by) }} on {{ fmtDate(form.cancelled_on) }}: {{ form.cancel_reason }}<span v-if="form.amended_from"> (amended from {{ form.amended_from }})</span></div>
          <div v-if="form.amended_from && form.status!==CANCELLED" class="ct-note">Amended from {{ form.amended_from }}.</div>
          <div v-if="form.status===PAID" class="ct-note ct-note-ok">Paid. Marked paid by {{ ownerName(form.paid_by) }} on {{ fmtDate(form.paid_on) }}. Approved by {{ ownerName(form.approved_by) }} on {{ fmtDate(form.approved_on) }}.</div>
          <div v-if="blockers.length && (ac.canSend || ac.canApprove)" class="ct-errbox">
            <div class="ct-errbox-title"><span v-html="icon('alert',15)"></span>Please fix the following</div>
            <ul><li v-for="b in blockers" :key="b">{{ b }}</li></ul>
          </div>
          <div v-if="droppedMsg" class="ct-note ct-note-bad">{{ droppedMsg }}</div>
        </div>

        <div class="inv-dfooter">
          <div class="add-footer-status">{{ form.name ? 'Editing: ' + form.name : 'New weekly bill — unsaved' }}</div>
          <div class="add-footer-actions">
            <button v-if="canDeleteDoc && $canDelete('admin')" class="add-btn-cancel wb-del" :disabled="busy" @click="doDelete">Delete</button>
            <button class="add-btn-cancel" @click="showDrawer=false">{{ ac.canEdit ? 'Cancel' : 'Close window' }}</button>
            <button v-if="ac.canEdit" class="add-btn-draft" :disabled="busy || !canWrite" @click="saveDraft(false)"><span v-html="icon('save',13)"></span> {{ saving ? 'Saving…' : 'Save Draft' }}</button>
            <button v-if="ac.canSend" class="add-btn-more" :disabled="busy || !canWrite || blockers.length>0 || !!droppedMsg" @click="sendForApproval"><span v-html="icon('check',13)"></span> Send for approval</button>
            <button v-if="ac.canApprove" class="add-btn-more" :disabled="busy || blockers.length>0" @click="approve">Approve as Director</button>
            <button v-if="ac.canReopen" class="add-btn-draft" :disabled="busy" @click="reopen">Edit</button>
            <button v-if="ac.canCancel" class="add-btn-cancel wb-cancel-bill" :disabled="busy" @click="cancelBill">Cancel bill</button>
            <button v-if="form.name && canPrint(form.status)" class="add-btn-cancel" :disabled="!visible.length" @click="printBill"><span v-html="icon('print',13)"></span>&nbsp;Print</button>
            <button v-if="ac.canMarkUnpaid" class="add-btn-cancel" :disabled="busy" @click="markUnpaid">Mark unpaid</button>
            <button v-if="ac.canAmend" class="add-btn-more" :disabled="busy || !canWrite" @click="amend">Amend</button>
            <button v-if="ac.canMarkPaid" class="add-btn-more" :disabled="busy" @click="markPaid">Paid</button>
            <button v-if="ac.canSendBack" class="add-btn-cancel" :disabled="busy" @click="sendBack">Send back</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</div>
</template>

<script setup>
// Labour Contract > Weekly Bill (prototype v11). List + drawer; data in the "Labour Weekly Bill" doctype,
// approval through psd_books.api.labour_weekly_bill (only a Director approves).
import { ref, reactive, computed, onMounted } from "vue";
import { apiList, apiGet, apiSave, apiDelete, apiPOST, apiGET, resolveCompany } from "../api/client.js";
import { useToast } from "../composables/useToast.js";
import { useConfirm } from "../composables/useConfirm.js";
import { usePrompt } from "../composables/usePrompt.js";
import { usePermissions } from "../composables/usePermissions.js";
import { fmtDate } from "../utils/format.js";
import { ownerName } from "../utils/userNames.js";
import { icon } from "../utils/icons.js";
import { isCertExpired, todayISO } from "../utils/labourContractor.js";
import { statusClass, fmtKES } from "../utils/labourContract.js";
import {
  PENDING, APPROVED, SENT_BACK, PAID, CANCELLED, weekLabel, matchesFilter, countsFor, matchesSearch, mergeRows, totalOf, rowError, visibleRows,
  billBlockers, validateBill, actionState, canPrint, printHtml, cleanAmount, lockedRows, canDelete, toDoc, contractsLabel, projectsLabel, pastLocked, inProject, kpiFor,
} from "../utils/labourWeeklyBill.js";

const { toast } = useToast();
const { confirm } = useConfirm();
const { prompt } = usePrompt();
const { canEdit: canEditModule } = usePermissions();
const DT = "Labour Weekly Bill";
const API = "psd_books.api.labour_weekly_bill.";
const FILTERS = [{ k: "all", l: "All" }, { k: "draft", l: "Draft" }, { k: "pending", l: "Pending" }, { k: "approved", l: "Approved" }, { k: "paid", l: "Paid" }, { k: "cancelled", l: "Cancelled" }];

const list = ref([]);
const projects = ref([]);
const columns = ref({});
const contractActivity = ref({});
const contractProject = ref({});
const contractors = ref([]);
const canApprove = ref(false);
function onAmountInput(e, r) {   // digits and one decimal point only
  const c = cleanAmount(e.target.value);
  e.target.value = c;
  r.amount_to_pay = c;
}
const canPay = ref(false);   // Director, Purchase Manager or Admin: the Paid button
const loading = ref(true);
const search = ref("");
const activeFilter = ref("all");
const projectFilter = ref("");
const balances = ref({});   // {project: balance still to pay on its Approved contracts}
// Pill colours, same look as the Purchase Orders pills
const PILL_CLASS = { draft: "pill-draft", pending: "pill-unpaid", approved: "pill-paid", paid: "pill-paid", cancelled: "pill-draft" };
const showDrawer = ref(false);
const saving = ref(false);
const busy = ref(false);
const rows = ref([]);
// A bill being edited lists every unpaid contract; a locked one (Pending, Approved, Paid) lists only the contracts paid on it.
const drawerProject = ref("");   // drawer-only filter on the contract rows; not saved on the bill
const projOf = (r) => contractProject.value[r.contract] || r.project || "";
const visible = computed(() => {
  const base = ac.value.canEdit ? visibleRows(rows.value) : lockedRows(rows.value);
  return drawerProject.value && ac.value.canEdit ? base.filter((r) => projOf(r) === drawerProject.value) : base;
});
// Choosing a project clears amounts typed on contracts of other projects, so nothing hidden is saved.
function onDrawerProject() {
  if (!drawerProject.value) return;
  rows.value = rows.value.map((r) => (projOf(r) === drawerProject.value ? r : { ...r, amount_to_pay: "" }));
}
const rowsLoading = ref(false);
const droppedMsg = ref("");
const formErrors = reactive({});
const form = reactive({});

const canWrite = computed(() => canEditModule("admin"));
const blank = () => ({ name: "", status: "Draft", project: "", week_date: todayISO(), raised_by: "", approved_by: "", approved_on: "", paid_by: "", paid_on: "", cancelled_by: "", cancelled_on: "", cancel_reason: "", amended_from: "", rejection_reason: "" });
function resetForm(src) {
  Object.keys(formErrors).forEach((k) => delete formErrors[k]);
  Object.keys(form).forEach((k) => delete form[k]);
  Object.assign(form, blank(), src || {});
  rows.value = []; droppedMsg.value = ""; drawerProject.value = "";
}

const openProjects = computed(() => projects.value.filter((p) => p.status !== "Closed"));
const projectNames = computed(() => Object.fromEntries(projects.value.map((p) => [p.name, p.project_name || p.name])));
const contractorNames = computed(() => Object.fromEntries(contractors.value.map((c) => [c.name, c.contractor_name || c.name])));
// The project filter narrows the pills, the cards and the table together
const scoped = computed(() => projectFilter.value ? list.value.filter((b) => inProject(b, projectFilter.value, columns.value)) : list.value);
const counts = computed(() => countsFor(scoped.value));
const kpi = computed(() => kpiFor(scoped.value, todayISO()));
const balanceToPay = computed(() => projectFilter.value
  ? Number(balances.value[projectFilter.value]) || 0
  : Object.values(balances.value).reduce((a, v) => a + (Number(v) || 0), 0));
const filtered = computed(() => scoped.value.filter((b) => matchesFilter(b, activeFilter.value) && matchesSearch(b, search.value, projectNames.value, columns.value)));
const ac = computed(() => actionState(form.status, canApprove.value, canPay.value));
const canDeleteDoc = computed(() => !!form.name && canDelete(form));
const total = computed(() => totalOf(rows.value));
const blockers = computed(() => billBlockers(rows.value, contractors.value));
const rowLocked = (r) => pastLocked(r, form.week_date, !form.name);
const certExpired = (id) => { const c = contractors.value.find((x) => x.name === id); return !!c && isCertExpired(c.tax_cert_expiry); };

function errStyle(f) { return formErrors[f] ? "border-color:#dc2626;background:#fff5f5" : ""; }

async function load() {
  loading.value = true;
  try {
    const [bills, pr, ct, perm, bal] = await Promise.all([
      apiList(DT, { fields: ["name", "status", "project", "week_start", "week_end", "total_amount", "raised_by"], order: "creation desc", limit: 1000 }),
      apiList("Project", { fields: ["name", "project_name", "status"], limit: 1000 }),
      apiList("Labour Contractor", { fields: ["name", "contractor_name", "disabled", "tax_cert_expiry"], order: "contractor_name asc", limit: 1000 }),
      apiGET("psd_books.api.labour_contract.my_permissions", {}),
      apiGET(API + "balance_by_project", {}).catch(() => ({})),   // card only: the page still opens if this fails
    ]);
    list.value = bills || []; projects.value = pr || []; contractors.value = ct || [];
    canApprove.value = !!(perm && perm.can_approve);
    canPay.value = !!(perm && perm.can_mark_paid);
    balances.value = (bal && typeof bal === "object" && !Array.isArray(bal)) ? (bal.message || bal) : {};
    loadColumns();
    loadActivities();
  } catch (e) {
    toast("Failed to load weekly bills: " + (e.message || e), "error");
  } finally { loading.value = false; }
}

// Contract numbers and balance still to pay after each bill (list columns). A failure leaves the cells as "—".
async function loadColumns() {
  try { columns.value = (await apiGET(API + "list_columns", { names: list.value.map((b) => b.name) })) || {}; }
  catch (e) { columns.value = {}; }
}

// Activity name and project of each contract (the drawer's Activity and Project columns). A failure leaves the cells as "—".
async function loadActivities() {
  try {
    const [cs, acts] = await Promise.all([
      apiList("Labour Contract", { fields: ["name", "activity", "project"], limit: 1000 }),
      apiList("Labour Activity", { fields: ["name", "activity_name"], limit: 1000 }),
    ]);
    const an = Object.fromEntries((acts || []).map((a) => [a.name, a.activity_name || a.name]));
    contractActivity.value = Object.fromEntries((cs || []).map((c) => [c.name, an[c.activity] || c.activity || ""]));
    contractProject.value = Object.fromEntries((cs || []).map((c) => [c.name, c.project || ""]));
  } catch (e) { contractActivity.value = {}; contractProject.value = {}; }
}

// Approved contracts of all projects with fresh figures; keeps the amounts already typed or saved.
async function refreshRows(saved) {
  droppedMsg.value = "";
  if (!form.week_date) { rows.value = []; return; }
  rowsLoading.value = true;
  try {
    const p = await apiGET(API + "preview", { week_date: form.week_date, name: form.name || null });
    const m = mergeRows(p.rows || [], saved || rows.value);
    rows.value = m.rows.map((r) => (rowLocked(r) ? { ...r, amount_to_pay: "" } : r));
    if (m.dropped.length) droppedMsg.value = "Contract " + m.dropped.join(", ") + " is no longer Approved, or its project is Closed, so it can't be paid on this bill.";
  } catch (e) {
    rows.value = [];
    toast(e.message || "Could not load contracts", "error");
  } finally { rowsLoading.value = false; }
}

function openAdd() { resetForm(); showDrawer.value = true; refreshRows(); }
async function openEdit(b) {
  resetForm({ ...b, week_date: b.week_start });
  showDrawer.value = true;
  try {
    const doc = await apiGet(DT, b.name);
    Object.assign(form, { rejection_reason: doc.rejection_reason, approved_by: doc.approved_by, approved_on: doc.approved_on, paid_by: doc.paid_by, paid_on: doc.paid_on, cancelled_by: doc.cancelled_by, cancelled_on: doc.cancelled_on, cancel_reason: doc.cancel_reason, amended_from: doc.amended_from, raised_by: doc.raised_by });
    if (actionState(doc.status, false).canEdit) await refreshRows(doc.lines || []);
    else rows.value = (doc.lines || []).map((l) => ({ ...l })); // locked: show the bill as saved
  } catch (e) { toast(e.message || "Could not open bill", "error"); }
}

// Saves the draft; returns the saved bill name, or "" when validation or the server refused it.
async function saveDraft(quiet) {
  const errs = validateBill(form, rows.value);
  Object.keys(formErrors).forEach((k) => delete formErrors[k]);
  Object.assign(formErrors, errs);
  if (Object.keys(errs).length) { toast(Object.values(errs)[0], "error"); return ""; }
  const bad = rows.value.map((r) => rowError(r)).find(Boolean);
  if (bad) { toast(bad, "error"); return ""; }
  saving.value = true;
  try {
    const res = await apiSave(toDoc(form, rows.value, await resolveCompany()));
    const name = (res && res.name) || form.name;
    if (!quiet) toast(form.name ? "Bill updated" : "Bill saved");
    form.name = name;
    await load();
    return name;
  } catch (e) {
    toast(e.message || "Could not save bill", "error");
    return "";
  } finally { saving.value = false; }
}

async function run(method, args, okMsg) {
  busy.value = true;
  try {
    const r = await apiPOST(API + method, args);
    toast(okMsg);
    await load();
    if (r && r.name) {
      Object.assign(form, { status: r.status, raised_by: r.raised_by, approved_by: r.approved_by, approved_on: r.approved_on, paid_by: r.paid_by, paid_on: r.paid_on, cancelled_by: r.cancelled_by, cancelled_on: r.cancelled_on, cancel_reason: r.cancel_reason, amended_from: r.amended_from, rejection_reason: r.rejection_reason });
      if (actionState(r.status, false).canEdit) await refreshRows(r.lines || []);
      else rows.value = (r.lines || []).map((l) => ({ ...l }));
    }
  } catch (e) {
    toast(e.message || "Action failed", "error");
  } finally { busy.value = false; }
}

async function sendForApproval() {
  const ok = await confirm({ title: "Confirm to send for approval", body: "Send this bill to the Director for approval? Total to pay: KES " + fmtKES(total.value) + ". The bill is locked once it is sent.", okLabel: "Send for approval", okStyle: "primary" });
  if (!ok) return;
  const name = await saveDraft(true);
  if (name) await run("send_for_approval", { name }, "Sent for Director approval");
}
async function approve() {
  const ok = await confirm({ title: "Confirm to approve", body: "Approve " + form.name + "? Total to pay: KES " + fmtKES(total.value) + ".", okLabel: "Approve", okStyle: "primary" });
  if (ok) await run("approve_bill", { name: form.name }, "Bill approved");
}
async function markPaid() {
  const ok = await confirm({ title: "Confirm to mark as paid", body: "Mark bill " + form.name + " as paid? Total paid: KES " + fmtKES(total.value) + ". The payment is recorded now and can't be undone.", okLabel: "Yes, mark as Paid", okStyle: "primary" });
  if (ok) await run("mark_paid", { name: form.name }, "Payment recorded");
}
async function reopen() {
  const ok = await confirm({ title: "Confirm to edit", body: "Reopen " + form.name + " as a Draft so the amounts can be changed? Its approval is cleared and it must be sent to the Director for approval again.", okLabel: "Reopen for editing", okStyle: "primary" });
  if (ok) await run("reopen_bill", { name: form.name }, "Bill reopened as Draft");
}
async function markUnpaid() {
  const ok = await confirm({ title: "Confirm to mark as unpaid", body: "Reverse the payment of " + form.name + " (KES " + fmtKES(total.value) + ")? The bill goes back to Approved and the amount no longer counts as paid.", okLabel: "Yes, mark unpaid", okStyle: "primary" });
  if (ok) await run("mark_unpaid", { name: form.name }, "Bill marked unpaid");
}
async function cancelBill() {
  const reason = await prompt({ title: "Cancel bill", label: "Reason", okLabel: "Cancel bill" });
  if (!reason || !reason.trim()) return;
  await run("cancel_bill", { name: form.name, reason: reason.trim() }, "Bill cancelled");
}
async function amend() {
  const ok = await confirm({ title: "Confirm to amend", body: "Make a new Draft bill from " + form.name + " with the same week and amounts. You can change it and send it for approval.", okLabel: "Amend", okStyle: "primary" });
  if (!ok) return;
  busy.value = true;
  try {
    const r = await apiPOST(API + "amend_bill", { name: form.name });
    toast("New draft " + r.name + " made");
    await load();
    const nb = list.value.find((x) => x.name === r.name);
    if (nb) await openEdit(nb); else showDrawer.value = false;
  } catch (e) {
    toast(e.message || "Could not amend bill", "error");
  } finally { busy.value = false; }
}
async function sendBack() {
  const reason = await prompt({ title: "Send back", label: "Reason", okLabel: "Send back" });
  if (!reason || !reason.trim()) return;
  await run("send_back_bill", { name: form.name, reason: reason.trim() }, "Sent back");
}
async function doDelete() {
  const ok = await confirm({ title: "Confirm to delete", body: "Delete " + form.name + "? Only a Draft never sent for approval, or a Cancelled bill, can be deleted." });
  if (!ok) return;
  busy.value = true;
  try { await apiDelete(DT, form.name); toast("Bill deleted"); showDrawer.value = false; await load(); }
  catch (e) { toast(e.message || "Could not delete bill", "error"); }
  finally { busy.value = false; }
}

// Prints an approved (or paid) bill: the contracts shown in the drawer, in a new window.
function printBill() {
  const w = window.open("", "_blank");
  if (!w) { toast("Allow pop-ups to print the bill", "error"); return; }
  const lines = visible.value.map((r) => ({
    contract: r.contract,
    contractor: contractorNames.value[r.contractor] || r.contractor,
    activity: contractActivity.value[r.contract] || "",
    project: projectNames.value[contractProject.value[r.contract] || r.project] || contractProject.value[r.contract] || r.project || "",
    contract_value: r.contract_value, paid_till_now: r.paid_till_now, balance: r.balance, amount_to_pay: r.amount_to_pay,
  }));
  const bill = { name: form.name, status: form.status, week_date: form.week_date,
    approved_by: form.approved_by ? ownerName(form.approved_by) : "", approved_on: form.approved_on,
    paid_by: form.paid_by ? ownerName(form.paid_by) : "", paid_on: form.paid_on };
  w.document.write(printHtml(bill, lines));
  w.document.close();
  w.focus();
  w.print();
}

onMounted(load);
</script>

<style scoped>
.nim-req, .inv-req { color: #dc2626; }
.ct-project-filter { width: 190px; height: 34px; border-radius: 8px; border: 1px solid #e5e7eb; background: #fff; font-size: 13px; }
.ct-kpi-sub { display: block !important; color: #6b7280; font-weight: 500; }
.cust-drawer-sub { color: #fff; font-size: 12px; margin-top: 2px; }
.ct-err { margin-top: 4px; font-size: 12px; color: #dc2626; }
.ct-hint { font-size: 12px; color: #9ca3af; }
.ct-flag { font-size: 11px; color: #b91c1c; }
.ct-note { margin-top: 14px; padding: 10px 12px; border-radius: 8px; font-size: 12.5px; background: #f3f4f6; color: #374151; }
.ct-note-bad { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
.ct-drawer .vt-th, .ct-drawer .vt-td { padding-left: 10px; padding-right: 10px; }
.ct-drawer .inv-lbl { font-weight: 600; color: #111827; }
.ct-drawer .inv-fi { height: 40px; border-radius: 8px; border-color: #d1d5db; }
.ct-drawer .inv-fi:focus { border-color: #1a6ef7; box-shadow: 0 0 0 3px rgba(26,110,247,.15); outline: none; }
.ct-info { margin-top: 12px; display: flex; align-items: center; gap: 8px; padding: 9px 12px; border-radius: 8px; font-size: 12.5px; background: #eff6ff; color: #1d4ed8; }
.ct-errbox { margin-top: 14px; padding: 12px 14px; border-radius: 8px; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 13px; }
.ct-errbox-title { display: flex; align-items: center; gap: 8px; font-weight: 700; }
.ct-errbox ul { margin: 8px 0 0; padding-left: 22px; }
.ct-errbox li { margin: 2px 0; }
.wb-del { margin-right: auto; color: #dc2626; }
.wb-cancel-bill { color: #dc2626; border-color: #fecaca; }
.ct-btn-blue { color: #1a6ef7; border-color: #1a6ef7; }
.ct-btn-blue:hover:not(:disabled) { background: #eff6ff; }
.ct-note-ok { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
.vt-th { padding: 10px 14px; text-align: left; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; background: #f9fafb; border-bottom: 1px solid #e5e7eb; white-space: nowrap; user-select: none; }
.vt-th-r, .vt-td-r { text-align: right; }
.vt-td { padding: 11px 14px; vertical-align: middle; color: #374151; white-space: nowrap; }
.vt-td-mono { font-size: 13px; }
.vt-td-secondary { color: #6b7280; font-size: 12.5px; }
.vt-row-shimmer td { padding: 13px 14px; }
.vt-badge { display: inline-flex; align-items: center; gap: 5px; padding: 2px 9px; border-radius: 20px; font-size: 11.5px; font-weight: 500; white-space: nowrap; line-height: 1.6; }
.vt-badge-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; background: currentColor; }
.vt-badge-green { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
.vt-badge-red { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
.vt-badge-blue { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.vt-badge-amber { background: #fff7ed; color: #b45309; border: 1px solid #fed7aa; }
.vt-empty { padding: 36px 24px; text-align: center; }
.vt-empty-title { font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px; }
.vt-empty-sub { font-size: 13px; color: #9ca3af; }
.vt-footer { padding: 9px 16px; border-top: 1px solid #f3f4f6; font-size: 12px; color: #9ca3af; background: #fafafa; }
.vt-footer strong { color: #6b7280; font-weight: 600; }
</style>