<template>
<div class="list-page">
  <div class="sales-toolbar">
    <div class="sales-search">
      <span v-html="icon('search',13)" style="color:#9ca3af;flex-shrink:0"></span>
      <input v-model="search" placeholder="Search weekly bills…" class="sales-search-input" autocomplete="off"/>
    </div>
    <div class="sales-pills">
      <button v-for="f in FILTERS" :key="f.k" class="sales-pill" :class="{active: activeFilter===f.k}" @click="activeFilter=f.k">
        {{ f.l }}
        <span class="sales-pill-count" :class="activeFilter===f.k?'':'zb-pc-muted'">{{ counts[f.k] }}</span>
      </button>
    </div>
    <div class="cust-toolbar-right" style="margin-left:auto">
      <button class="sales-btn-ghost" @click="load" title="Refresh"><span v-html="icon('refresh',13)"></span> Refresh</button>
      <button class="sales-btn-primary" :disabled="!$canCreate('admin')" :title="!$canCreate('admin') ? 'Not permitted' : ''" @click="openAdd"><span v-html="icon('plus',13)"></span> New Weekly Bill</button>
    </div>
  </div>

  <div class="inv-table-wrap">
    <table class="inv-table">
      <thead>
        <tr><th class="vt-th">Bill</th><th class="vt-th">Project</th><th class="vt-th">Contract</th><th class="vt-th">Week (Monday to Sunday)</th><th class="vt-th vt-th-r">Total to Pay (KES)</th><th class="vt-th vt-th-r">Balance to Pay (KES)</th><th class="vt-th">Status</th></tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="n in 6" :key="n" class="vt-row-shimmer"><td colspan="7"><div class="shimmer" style="height:12px;border-radius:3px;width:65%"></div></td></tr>
        </template>
        <tr v-else-if="!filtered.length">
          <td colspan="7" class="vt-empty">
            <div class="vt-empty-title">{{ search || activeFilter!=='all' ? 'No results found' : 'No weekly bills yet' }}</div>
            <div class="vt-empty-sub">{{ search || activeFilter!=='all' ? 'Try adjusting your search or filter' : 'Create the first weekly bill' }}</div>
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
    <div class="vt-footer" v-if="!loading && list.length">Showing <strong>{{ filtered.length }}</strong> of <strong>{{ list.length }}</strong> bills</div>
  </div>
  <p style="margin:10px 4px;font-size:12px;color:#6b7280">A project can have more than one bill in the same week. A bill lists the Approved contracts of all projects that still have a balance, and a contract can be paid once a week. A Director approves each bill, and the bill is locked once sent for approval.</p>

  <Teleport to="body">
    <div v-if="showDrawer" class="inv-drawer-bg" @click.self="showDrawer=false">
      <div class="inv-drawer-panel open ct-drawer" style="width:1160px;max-width:98vw">
        <div class="inv-dh" style="background:linear-gradient(135deg,#1e3a5f,#1a6ef7);padding:18px 24px">
          <div class="cust-drawer-header-left">
            <div class="cust-drawer-icon" style="color:#fff"><span v-html="icon('fileplus',16)"></span></div>
            <div>
              <div class="inv-dh-title">{{ form.name || 'New Weekly Bill' }}</div>
              <div class="cust-drawer-sub">{{ form.name ? form.status : 'Amounts to pay contractors for one week' }}</div>
            </div>
          </div>
          <button class="inv-dclose" style="background:rgba(255,255,255,.15);border:none;cursor:pointer;color:#fff;width:30px;height:30px;border-radius:8px;display:grid;place-items:center" @click="showDrawer=false" v-html="icon('x',15)"></button>
        </div>

        <div class="inv-dbody" style="padding:24px;overflow-y:auto;flex:1">
          <div class="inv-fg inv-fg2">
            <div class="inv-field">
              <label class="inv-lbl">Pick any date in the week <span class="nim-req">*</span></label>
              <input type="date" v-model="form.week_date" class="inv-fi" :style="errStyle('week_date')" :disabled="!ac.canEdit || !!form.name" @change="delete formErrors.week_date; refreshRows()"/>
              <div v-if="formErrors.week_date" class="ct-err">{{ formErrors.week_date }}</div>
            </div>
            <div class="inv-field">
              <label class="inv-lbl">Week (Monday to Sunday)</label>
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
                <tr v-else-if="!visible.length"><td colspan="8" class="vt-empty"><div class="vt-empty-sub">{{ rows.length ? 'All Approved contracts are fully paid' : 'There are no Approved contracts to bill' }}</div></td></tr>
                <tr v-else v-for="r in visible" :key="r.contract">
                  <td class="vt-td vt-td-mono">{{ r.contract }}</td>
                  <td class="vt-td">{{ contractorNames[r.contractor] || r.contractor }}<span v-if="certExpired(r.contractor)" class="ct-flag"> certificate expired</span></td>
                  <td class="vt-td">{{ contractActivity[r.contract] || '—' }}</td>
                  <td class="vt-td">{{ projectNames[contractProject[r.contract] || r.project] || contractProject[r.contract] || r.project || '—' }}</td>
                  <td class="vt-td vt-td-r">{{ fmtKES(r.contract_value) }}</td>
                  <td class="vt-td vt-td-r">{{ fmtKES(r.paid_till_now) }}<span v-if="!r.paid_till_now" class="ct-hint"> (New)</span></td>
                  <td class="vt-td vt-td-r">{{ fmtKES(r.balance) }}</td>
                  <td class="vt-td vt-td-r">
                    <input type="number" min="0" v-model.number="r.amount_to_pay" class="inv-fi" style="width:130px;text-align:right" :disabled="!ac.canEdit || !!r.paid_this_week || rowLocked(r)" :aria-label="'Amount to pay now, contract ' + r.contract" :style2="''"/>
                    <div v-if="r.paid_this_week" class="ct-hint">Already on {{ r.paid_this_week }} this week</div>
                    <div v-if="rowLocked(r)" class="ct-hint">Past week: already has payments</div>
                    <div v-if="rowError(r)" class="ct-err">{{ rowError(r) }}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="visible.length" style="margin-top:12px;font-weight:600;text-align:right">Total to pay now: KES {{ fmtKES(total) }}</div>
          <div class="ct-info"><span v-html="icon('info',14)"></span>Fully paid contracts are not listed. Contracts of all projects are shown. A contract can be paid once a week, and an amount can't be above its balance.</div>

          <div v-if="form.status===SENT_BACK && form.rejection_reason" class="ct-note ct-note-bad">Sent back: {{ form.rejection_reason }}</div>
          <div v-if="form.status===PENDING" class="ct-note">Waiting for Director approval. The bill is locked.</div>
          <div v-if="form.status===APPROVED" class="ct-note ct-note-ok">Approved by {{ ownerName(form.approved_by) }} on {{ fmtDate(form.approved_on) }}.</div>
          <div v-if="blockers.length && (ac.canSend || ac.canApprove)" class="ct-errbox">
            <div class="ct-errbox-title"><span v-html="icon('alert',15)"></span>Please fix the following</div>
            <ul><li v-for="b in blockers" :key="b">{{ b }}</li></ul>
          </div>
          <div v-if="droppedMsg" class="ct-note ct-note-bad">{{ droppedMsg }}</div>
        </div>

        <div class="inv-dfooter" style="border-top:1px solid #e8ecf0;padding:14px 24px;background:#fafbfd;flex-wrap:wrap;gap:8px">
          <button v-if="canDeleteDoc && $canDelete('admin')" class="form-btn form-btn-outline" :disabled="busy" @click="doDelete" style="margin-right:auto;color:#dc2626">Delete</button>
          <button class="form-btn form-btn-outline" @click="showDrawer=false">{{ ac.canEdit ? 'Cancel' : 'Close window' }}</button>
          <button v-if="ac.canEdit" class="form-btn form-btn-outline ct-btn-blue" :disabled="busy || !canWrite" @click="saveDraft(false)">{{ saving ? 'Saving…' : 'Save Draft' }}</button>
          <button v-if="ac.canSend" class="form-btn form-btn-primary" :disabled="busy || !canWrite || blockers.length>0 || !!droppedMsg" @click="sendForApproval">Send for approval</button>
          <button v-if="ac.canApprove" class="form-btn form-btn-primary" :disabled="busy || blockers.length>0" @click="approve">Approve as Director</button>
          <button v-if="ac.canSendBack" class="form-btn form-btn-outline" :disabled="busy" @click="sendBack">Send back</button>
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
  PENDING, APPROVED, SENT_BACK, weekLabel, matchesFilter, countsFor, matchesSearch, mergeRows, totalOf, rowError, visibleRows,
  billBlockers, validateBill, actionState, canDelete, toDoc, contractsLabel, projectsLabel, pastLocked,
} from "../utils/labourWeeklyBill.js";

const { toast } = useToast();
const { confirm } = useConfirm();
const { prompt } = usePrompt();
const { canEdit: canEditModule } = usePermissions();
const DT = "Labour Weekly Bill";
const API = "psd_books.api.labour_weekly_bill.";
const FILTERS = [{ k: "all", l: "All" }, { k: "draft", l: "Draft" }, { k: "pending", l: "Pending" }, { k: "approved", l: "Approved" }];

const list = ref([]);
const projects = ref([]);
const columns = ref({});
const contractActivity = ref({});
const contractProject = ref({});
const contractors = ref([]);
const canApprove = ref(false);
const loading = ref(true);
const search = ref("");
const activeFilter = ref("all");
const showDrawer = ref(false);
const saving = ref(false);
const busy = ref(false);
const rows = ref([]);
const visible = computed(() => visibleRows(rows.value));
const rowsLoading = ref(false);
const droppedMsg = ref("");
const formErrors = reactive({});
const form = reactive({});

const canWrite = computed(() => canEditModule("admin"));
const blank = () => ({ name: "", status: "Draft", project: "", week_date: todayISO(), raised_by: "", approved_by: "", approved_on: "", rejection_reason: "" });
function resetForm(src) {
  Object.keys(formErrors).forEach((k) => delete formErrors[k]);
  Object.keys(form).forEach((k) => delete form[k]);
  Object.assign(form, blank(), src || {});
  rows.value = []; droppedMsg.value = "";
}

const projectNames = computed(() => Object.fromEntries(projects.value.map((p) => [p.name, p.project_name || p.name])));
const contractorNames = computed(() => Object.fromEntries(contractors.value.map((c) => [c.name, c.contractor_name || c.name])));
const counts = computed(() => countsFor(list.value));
const filtered = computed(() => list.value.filter((b) => matchesFilter(b, activeFilter.value) && matchesSearch(b, search.value, projectNames.value, columns.value)));
const ac = computed(() => actionState(form.status, canApprove.value));
const canDeleteDoc = computed(() => !!form.name && canDelete(form));
const total = computed(() => totalOf(rows.value));
const blockers = computed(() => billBlockers(rows.value, contractors.value));
const rowLocked = (r) => pastLocked(r, form.week_date, !form.name);
const certExpired = (id) => { const c = contractors.value.find((x) => x.name === id); return !!c && isCertExpired(c.tax_cert_expiry); };

function errStyle(f) { return formErrors[f] ? "border-color:#dc2626;background:#fff5f5" : ""; }

async function load() {
  loading.value = true;
  try {
    const [bills, pr, ct, perm] = await Promise.all([
      apiList(DT, { fields: ["name", "status", "project", "week_start", "week_end", "total_amount", "raised_by"], order: "week_start desc, modified desc", limit: 1000 }),
      apiList("Project", { fields: ["name", "project_name", "status"], limit: 1000 }),
      apiList("Labour Contractor", { fields: ["name", "contractor_name", "disabled", "tax_cert_expiry"], order: "contractor_name asc", limit: 1000 }),
      apiGET("psd_books.api.labour_contract.my_permissions", {}),
    ]);
    list.value = bills || []; projects.value = pr || []; contractors.value = ct || [];
    canApprove.value = !!(perm && perm.can_approve);
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
    Object.assign(form, { rejection_reason: doc.rejection_reason, approved_by: doc.approved_by, approved_on: doc.approved_on, raised_by: doc.raised_by });
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
      Object.assign(form, { status: r.status, raised_by: r.raised_by, approved_by: r.approved_by, approved_on: r.approved_on, rejection_reason: r.rejection_reason });
      if (actionState(r.status, false).canEdit) await refreshRows(r.lines || []);
      else rows.value = (r.lines || []).map((l) => ({ ...l }));
    }
  } catch (e) {
    toast(e.message || "Action failed", "error");
  } finally { busy.value = false; }
}

async function sendForApproval() {
  const ok = await confirm({ title: "Send for approval?", body: "Send this bill to the Director for approval? Total to pay: KES " + fmtKES(total.value) + ". The bill is locked once it is sent.", okLabel: "Send for approval", okStyle: "primary" });
  if (!ok) return;
  const name = await saveDraft(true);
  if (name) await run("send_for_approval", { name }, "Sent for Director approval");
}
async function approve() {
  const ok = await confirm({ title: "Approve bill?", body: "Approve " + form.name + "? Total to pay: KES " + fmtKES(total.value) + ".", okLabel: "Approve", okStyle: "primary" });
  if (ok) await run("approve_bill", { name: form.name }, "Bill approved");
}
async function sendBack() {
  const reason = await prompt({ title: "Send back", label: "Reason", okLabel: "Send back" });
  if (!reason || !reason.trim()) return;
  await run("send_back_bill", { name: form.name, reason: reason.trim() }, "Sent back");
}
async function doDelete() {
  const ok = await confirm({ title: "Delete bill?", body: "Delete " + form.name + "? Only a bill never sent for approval can be deleted." });
  if (!ok) return;
  busy.value = true;
  try { await apiDelete(DT, form.name); toast("Bill deleted"); showDrawer.value = false; await load(); }
  catch (e) { toast(e.message || "Could not delete bill", "error"); }
  finally { busy.value = false; }
}

onMounted(load);
</script>

<style scoped>
.nim-req, .inv-req { color: #dc2626; }
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