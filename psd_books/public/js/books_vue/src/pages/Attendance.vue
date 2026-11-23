<template>
<div class="list-page">
  <div class="sales-toolbar">
    <div class="sales-search">
      <span v-html="icon('search',13)" style="color:#9ca3af;flex-shrink:0"></span>
      <input v-model="search" placeholder="Search wages sheets…" class="sales-search-input" autocomplete="off"/>
    </div>
    <div class="sales-pills">
      <button v-for="f in FILTERS" :key="f.k" class="sales-pill" :class="{active: activeFilter===f.k}" @click="activeFilter=f.k">
        {{ f.l }}
        <span class="sales-pill-count" :class="activeFilter===f.k?'':'zb-pc-muted'">{{ counts[f.k] }}</span>
      </button>
    </div>
    <div class="cust-toolbar-right" style="margin-left:auto">
      <button class="sales-btn-ghost" @click="load" title="Refresh"><span v-html="icon('refresh',13)"></span> Refresh</button>
      <button class="sales-btn-primary" :disabled="!$canCreate('admin')" :title="!$canCreate('admin') ? 'Not permitted' : ''" @click="openAdd"><span v-html="icon('plus',13)"></span> New Wages Sheet</button>
    </div>
  </div>

  <div class="inv-table-wrap">
    <table class="inv-table">
      <thead>
        <tr><th class="vt-th">Sheet</th><th class="vt-th">Week (Saturday to Friday)</th><th class="vt-th vt-th-r">Total Wages (KES)</th><th class="vt-th">Status</th></tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="n in 6" :key="n" class="vt-row-shimmer"><td colspan="4"><div class="shimmer" style="height:12px;border-radius:3px;width:65%"></div></td></tr>
        </template>
        <tr v-else-if="!filtered.length">
          <td colspan="4" class="vt-empty">
            <div class="vt-empty-title">{{ search || activeFilter!=='all' ? 'No results found' : 'No wages sheets yet' }}</div>
            <div class="vt-empty-sub">{{ search || activeFilter!=='all' ? 'Try adjusting your search or filter' : 'Create the first weekly wages sheet' }}</div>
          </td>
        </tr>
        <tr v-else v-for="s in filtered" :key="s.name" class="inv-row" @click="openEdit(s)">
          <td class="vt-td vt-td-mono">{{ s.name }}</td>
          <td class="vt-td vt-td-secondary">{{ weekLabel(s.week_start) }}</td>
          <td class="vt-td vt-td-r">{{ fmtKES(s.total_amount) }}</td>
          <td class="vt-td"><span class="vt-badge" :class="'vt-badge-'+statusClass(s.status)"><span class="vt-badge-dot"></span>{{ s.status }}</span></td>
        </tr>
      </tbody>
    </table>
    <div class="vt-footer" v-if="!loading && list.length">Showing <strong>{{ filtered.length }}</strong> of <strong>{{ list.length }}</strong> sheets</div>
  </div>
  <p style="margin:10px 4px;font-size:12px;color:#6b7280">One sheet per week for all Active employees, Saturday to Friday. A Director approves each sheet; once sent for approval it is locked, and a submitted sheet is final.</p>

  <Teleport to="body">
    <div v-if="showDrawer" class="inv-drawer-bg" @click.self="showDrawer=false"></div>
    <div class="inv-drawer-panel at-drawer" :class="{open:showDrawer}">

      <!-- Header -->
      <div class="inv-dh">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <div class="inv-dh-title">{{ form.name || 'New Wages Sheet' }}</div>
          <span class="at-badge">{{ form.name ? form.status : 'Draft' }}</span>
        </div>
        <button class="inv-dclose" @click="showDrawer=false"><span v-html="icon('x',16)"></span></button>
      </div>

      <div class="inv-dbody">
        <div v-if="existingSheet" class="ct-errbox">
          <div class="ct-errbox-title"><span v-html="icon('alert',15)"></span>There is already a sheet for this week</div>
          <ul><li>Sheet {{ existingSheet }} covers this week. Open it from the list instead.</li></ul>
        </div>
        <div v-if="addedMsg" class="ct-note">{{ addedMsg }}</div>
        <div v-if="form.status===SENT_BACK && form.rejection_reason" class="ct-note ct-note-bad">Sent back: {{ form.rejection_reason }}</div>
        <div v-if="form.status===PENDING" class="ct-note">Waiting for Director approval. The sheet is locked.</div>
        <div v-if="form.status===APPROVED" class="ct-note ct-note-ok">Approved by {{ ownerName(form.approved_by) }} on {{ fmtDate(form.approved_on) }}. Submit to finalise.</div>
        <div v-if="form.status===SUBMITTED" class="ct-note ct-note-ok">Submitted by {{ ownerName(form.submitted_by) }} on {{ fmtDate(form.submitted_on) }}. This week's wages sheet is final.</div>

        <!-- Card 1: Week -->
        <div class="add-card at-card-first">
          <div class="add-card-header" @click="atCollapsed.week=!atCollapsed.week">
            <div class="add-card-title">
              <span class="add-card-title-icon"><span v-html="icon('calendar',16)"></span></span>
              Week
            </div>
            <span class="add-card-chevron" :class="{collapsed:atCollapsed.week}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </div>
          <div class="add-card-body" :class="{collapsed:atCollapsed.week}">
            <div class="inv-fg inv-fg3">
              <div>
                <label class="inv-lbl">Pick any date in the week <span class="inv-req">*</span></label>
                <input type="date" v-model="form.week_date" class="inv-fi" :style="errStyle('week_date')" :disabled="!ac.canEdit || !!form.name" @change="delete formErrors.week_date; refreshRows([])"/>
                <div v-if="formErrors.week_date" class="ct-err">{{ formErrors.week_date }}</div>
              </div>
              <div>
                <label class="inv-lbl">Week (Saturday to Friday)</label>
                <input class="inv-fi" :value="weekLabel(form.week_date)" disabled/>
              </div>
              <div class="at-period">
                <span class="at-period-icon" v-html="icon('calendar',16)"></span>
                <div>
                  <div class="at-period-lbl">Week Period</div>
                  <div class="at-period-val">{{ weekLabel(form.week_date) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: Attendance -->
        <div class="add-card">
          <div class="add-card-header" @click="atCollapsed.sheet=!atCollapsed.sheet">
            <div class="add-card-title">
              <span class="add-card-title-icon"><span v-html="icon('check',16)"></span></span>
              Attendance
              <span class="at-count">{{ rows.length }} employee{{ rows.length !== 1 ? 's' : '' }}</span>
            </div>
            <span class="add-card-chevron" :class="{collapsed:atCollapsed.sheet}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </span>
          </div>
          <div class="add-card-body" :class="{collapsed:atCollapsed.sheet}">
            <div class="at-grid" style="overflow-x:auto">
              <table class="inv-table" style="font-size:12px;min-width:1240px">
                <thead>
                  <tr>
                    <th class="vt-th">#</th><th class="vt-th">ID No.</th><th class="vt-th">Name</th><th class="vt-th">Grade</th><th class="vt-th">Area of Work</th>
                    <th v-for="(d, i) in DAYS" :key="d.key" class="vt-th" style="text-align:center">{{ d.label }}<div class="ct-dd">{{ dates[i] }}</div></th>
                    <th class="vt-th vt-th-r">Days</th><th class="vt-th vt-th-r">Rate/Day</th><th class="vt-th vt-th-r">OT Hrs</th><th class="vt-th vt-th-r">OT Amt</th><th class="vt-th vt-th-r">SHA</th><th class="vt-th vt-th-r">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="rowsLoading"><td colspan="19" class="vt-empty"><div class="vt-empty-sub">Loading employees…</div></td></tr>
                  <tr v-else-if="!rows.length"><td colspan="19" class="vt-empty"><div class="vt-empty-sub">There are no Active employees to list</div></td></tr>
                  <tr v-else v-for="(r, i) in rows" :key="r.employee">
                    <td class="vt-td">{{ i + 1 }}</td>
                    <td class="vt-td vt-td-mono">{{ r.id_no || '—' }}</td>
                    <td class="vt-td">{{ r.employee_name }}</td>
                    <td class="vt-td">
                      <select v-model="r.grade" class="inv-fi" style="width:64px" :disabled="!ac.canEdit" :aria-label="'Grade, ' + r.employee_name">
                        <option v-for="g in GRADES" :key="g" :value="g">{{ g }}</option>
                      </select>
                    </td>
                    <td class="vt-td"><input v-model="r.area_of_work" class="inv-fi" style="width:120px" :disabled="!ac.canEdit" :aria-label="'Area of work, ' + r.employee_name"/></td>
                    <td v-for="d in DAYS" :key="d.key" class="vt-td" style="text-align:center">
                      <input type="checkbox" :checked="!!Number(r[d.key])" :disabled="!ac.canEdit" :aria-label="'Present ' + d.label + ', ' + r.employee_name" @change="r[d.key] = $event.target.checked ? 1 : 0"/>
                    </td>
                    <td class="vt-td vt-td-r">{{ figures(r).days }}</td>
                    <td class="vt-td vt-td-r"><input type="number" min="0" v-model.number="r.rate" class="inv-fi" style="width:80px;text-align:right" :disabled="!ac.canEdit" :aria-label="'Rate per day, ' + r.employee_name"/></td>
                    <td class="vt-td vt-td-r"><input type="number" min="0" step="0.5" v-model.number="r.ot_hours" class="inv-fi" style="width:64px;text-align:right" :disabled="!ac.canEdit" :aria-label="'OT hours, ' + r.employee_name"/></td>
                    <td class="vt-td vt-td-r">{{ fmtOt(figures(r).otAmount) }}</td>
                    <td class="vt-td vt-td-r"><input type="number" min="0" v-model.number="r.sha" class="inv-fi" style="width:72px;text-align:right" :disabled="!ac.canEdit" :aria-label="'SHA, ' + r.employee_name"/></td>
                    <td class="vt-td vt-td-r"><b>{{ fmtKES(figures(r).total) }}</b><div v-if="rowError(r)" class="ct-err">{{ rowError(r) }}</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="at-foot">
              <div class="ct-info"><span v-html="icon('info',14)"></span>Total = days x rate + OT amount - SHA, rounded to the shilling. OT amount = OT hours x rate / 8. An employee with no days and no OT is paid nothing.</div>
              <div v-if="rows.length" class="at-totals">Week: {{ totals.employees }} employees paid, {{ totals.days }} employee-days, wages KES {{ fmtKES(totals.total) }}</div>
            </div>
          </div>
        </div>

        <div v-if="blockers.length && (ac.canSend || ac.canApprove)" class="ct-errbox">
          <div class="ct-errbox-title"><span v-html="icon('alert',15)"></span>{{ ac.canApprove ? "Can't approve yet" : "Can't send for approval yet" }}</div>
          <ul><li v-for="b in blockers" :key="b">{{ b }}</li></ul>
        </div>
      </div>

      <!-- Footer -->
      <div class="inv-dfooter">
        <div class="add-footer-status">{{ form.name ? 'Editing: ' + form.name : 'New wages sheet — unsaved' }}</div>
        <div class="add-footer-actions">
          <button v-if="canDeleteDoc && $canDelete('admin')" class="add-btn-cancel at-del" :disabled="busy" @click="doDelete">Delete</button>
          <button class="add-btn-cancel" :disabled="!rows.length" @click="printSheet"><span v-html="icon('print',13)"></span>&nbsp;Print</button>
          <button class="add-btn-cancel" @click="showDrawer=false">{{ ac.canEdit ? 'Cancel' : 'Close window' }}</button>
          <button v-if="ac.canEdit" class="add-btn-draft" :disabled="busy || !canWrite || !!existingSheet" @click="saveDraft(false)"><span v-html="icon('save',13)"></span> {{ saving ? 'Saving…' : 'Save Draft' }}</button>
          <button v-if="ac.canSend" class="add-btn-more" :disabled="busy || !canWrite || !!existingSheet || blockers.length>0" @click="sendForApproval"><span v-html="icon('check',13)"></span> Send for approval</button>
          <button v-if="ac.canApprove" class="add-btn-more" :disabled="busy || blockers.length>0" @click="approve">Approve as Director</button>
          <button v-if="ac.canSendBack" class="add-btn-cancel" :disabled="busy" @click="sendBack">Send back</button>
          <button v-if="ac.canSubmit" class="add-btn-more" :disabled="busy || !canWrite" @click="submitSheet">Submit</button>
        </div>
      </div>
    </div>
  </Teleport>
</div>
</template>

<script setup>
// Labour Contract > Attendance (prototype v11, laid out like the client's paper wages sheet). List + drawer; data in the
// "Labour Attendance Sheet" doctype, approval through psd_books.api.labour_attendance (only a Director approves).
import { ref, reactive, computed, onMounted } from "vue";
import { apiList, apiGet, apiSave, apiDelete, apiPOST, apiGET, resolveCompany } from "../api/client.js";
import { useToast } from "../composables/useToast.js";
import { useConfirm } from "../composables/useConfirm.js";
import { usePrompt } from "../composables/usePrompt.js";
import { usePermissions } from "../composables/usePermissions.js";
import { fmtDate } from "../utils/format.js";
import { ownerName } from "../utils/userNames.js";
import { icon } from "../utils/icons.js";
import { todayISO } from "../utils/labourContractor.js";
import { statusClass, fmtKES } from "../utils/labourContract.js";
import {
  PENDING, APPROVED, SUBMITTED, SENT_BACK, DAYS, GRADES, weekLabel, dayDates, figures, totalsOf, mergeRows, rowError,
  sheetBlockers, validateSheet, matchesFilter, countsFor, matchesSearch, actionState, canDelete, toDoc, printHtml,
} from "../utils/labourAttendance.js";

const { toast } = useToast();
const { confirm } = useConfirm();
const { prompt } = usePrompt();
const { canEdit: canEditModule } = usePermissions();
const DT = "Labour Attendance Sheet";
const API = "psd_books.api.labour_attendance.";
const FILTERS = [{ k: "all", l: "All" }, { k: "draft", l: "Draft" }, { k: "pending", l: "Pending" }, { k: "approved", l: "Approved" }, { k: "submitted", l: "Submitted" }];

const list = ref([]);
const canApprove = ref(false);
const loading = ref(true);
const search = ref("");
const activeFilter = ref("all");
const showDrawer = ref(false);
const saving = ref(false);
const busy = ref(false);
const rows = ref([]);
const rowsLoading = ref(false);
const existingSheet = ref("");
const addedMsg = ref("");
const atCollapsed = reactive({ week: false, sheet: false });
const formErrors = reactive({});
const form = reactive({});

const canWrite = computed(() => canEditModule("admin"));
const blank = () => ({ name: "", status: "Draft", week_date: todayISO(), raised_by: "", approved_by: "", approved_on: "", submitted_by: "", submitted_on: "", rejection_reason: "" });
function resetForm(src) {
  Object.keys(formErrors).forEach((k) => delete formErrors[k]);
  Object.keys(form).forEach((k) => delete form[k]);
  Object.assign(form, blank(), src || {});
  rows.value = []; existingSheet.value = ""; addedMsg.value = "";
}

const counts = computed(() => countsFor(list.value));
const filtered = computed(() => list.value.filter((s) => matchesFilter(s, activeFilter.value) && matchesSearch(s, search.value)));
const ac = computed(() => actionState(form.status, canApprove.value));
const canDeleteDoc = computed(() => !!form.name && canDelete(form));
const totals = computed(() => totalsOf(rows.value));
const blockers = computed(() => sheetBlockers(rows.value));
const dates = computed(() => dayDates(form.week_date || todayISO()));
const fmtOt = (v) => (Math.round((Number(v) || 0) * 100) / 100).toLocaleString("en-US", { maximumFractionDigits: 2 });

function errStyle(f) { return formErrors[f] ? "border-color:#dc2626;background:#fff5f5" : ""; }

async function load() {
  loading.value = true;
  try {
    const [sheets, perm] = await Promise.all([
      apiList(DT, { fields: ["name", "status", "week_start", "week_end", "total_amount", "raised_by"], order: "week_start desc, modified desc", limit: 1000 }),
      apiGET("psd_books.api.labour_contract.my_permissions", {}),
    ]);
    list.value = sheets || [];
    canApprove.value = !!(perm && perm.can_approve);
  } catch (e) {
    toast("Failed to load wages sheets: " + (e.message || e), "error");
  } finally { loading.value = false; }
}

// Every Active employee with fresh carried values; keeps the entries already typed or saved.
async function refreshRows(saved) {
  addedMsg.value = ""; existingSheet.value = "";
  if (!form.week_date) { rows.value = []; return; }
  rowsLoading.value = true;
  try {
    const p = await apiGET(API + "preview", { week_date: form.week_date, name: form.name || null });
    existingSheet.value = p.existing_sheet || "";
    const m = mergeRows(p.rows || [], saved === undefined ? rows.value : saved);
    rows.value = m.rows;
    if (m.added.length) addedMsg.value = "New employees added to this sheet: " + m.added.join(", ") + ".";
  } catch (e) {
    rows.value = [];
    toast(e.message || "Could not load employees", "error");
  } finally { rowsLoading.value = false; }
}

function openAdd() { resetForm(); showDrawer.value = true; refreshRows([]); }
async function openEdit(s) {
  resetForm({ ...s, week_date: s.week_start });
  showDrawer.value = true;
  try {
    const doc = await apiGet(DT, s.name);
    Object.assign(form, { status: doc.status, rejection_reason: doc.rejection_reason, approved_by: doc.approved_by, approved_on: doc.approved_on, raised_by: doc.raised_by, submitted_by: doc.submitted_by, submitted_on: doc.submitted_on });
    if (actionState(doc.status, false).canEdit) await refreshRows(doc.lines || []);
    else rows.value = (doc.lines || []).map((l) => ({ ...l })); // locked: show the sheet as saved
  } catch (e) { toast(e.message || "Could not open sheet", "error"); }
}

// Saves the draft; returns the saved sheet name, or "" when validation or the server refused it.
async function saveDraft(quiet) {
  const errs = validateSheet(form, rows.value);
  Object.keys(formErrors).forEach((k) => delete formErrors[k]);
  Object.assign(formErrors, errs);
  if (Object.keys(errs).length) { toast(Object.values(errs)[0], "error"); return ""; }
  const bad = rows.value.map((r) => rowError(r)).find(Boolean);
  if (bad) { toast(bad, "error"); return ""; }
  saving.value = true;
  try {
    const res = await apiSave(toDoc(form, rows.value, await resolveCompany()));
    const name = (res && res.name) || form.name;
    if (!quiet) toast(form.name ? "Sheet updated" : "Sheet saved");
    form.name = name;
    await load();
    return name;
  } catch (e) {
    toast(e.message || "Could not save sheet", "error");
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
      Object.assign(form, { status: r.status, raised_by: r.raised_by, approved_by: r.approved_by, approved_on: r.approved_on, submitted_by: r.submitted_by, submitted_on: r.submitted_on, rejection_reason: r.rejection_reason });
      if (actionState(r.status, false).canEdit) await refreshRows(r.lines || []);
      else rows.value = (r.lines || []).map((l) => ({ ...l }));
    }
  } catch (e) {
    toast(e.message || "Action failed", "error");
  } finally { busy.value = false; }
}

async function sendForApproval() {
  const ok = await confirm({ title: "Send for approval?", body: "Send this wages sheet to the Director for approval? Wages: KES " + fmtKES(totals.value.total) + " for " + totals.value.employees + " employees. The sheet is locked once it is sent.", okLabel: "Send for approval", okStyle: "primary" });
  if (!ok) return;
  const name = await saveDraft(true);
  if (name) await run("send_for_approval", { name }, "Sent for Director approval");
}
async function approve() {
  const ok = await confirm({ title: "Approve wages sheet?", body: "Approve " + form.name + "? Wages: KES " + fmtKES(totals.value.total) + " for " + totals.value.employees + " employees. Submit it afterwards to finalise.", okLabel: "Approve", okStyle: "primary" });
  if (ok) await run("approve_sheet", { name: form.name }, "Sheet approved");
}
async function sendBack() {
  const reason = await prompt({ title: "Send back", label: "Reason", okLabel: "Send back" });
  if (!reason || !reason.trim()) return;
  await run("send_back_sheet", { name: form.name, reason: reason.trim() }, "Sent back");
}
async function submitSheet() {
  const ok = await confirm({ title: "Submit wages sheet?", body: "Submit " + form.name + "? A submitted sheet is final and can't be edited." });
  if (ok) await run("submit_sheet", { name: form.name }, "Sheet submitted");
}
async function doDelete() {
  const ok = await confirm({ title: "Delete sheet?", body: "Delete " + form.name + "? Only a sheet never sent for approval can be deleted." });
  if (!ok) return;
  busy.value = true;
  try { await apiDelete(DT, form.name); toast("Sheet deleted"); showDrawer.value = false; await load(); }
  catch (e) { toast(e.message || "Could not delete sheet", "error"); }
  finally { busy.value = false; }
}

// Opens the paper-style sheet in a new window and prints it.
function printSheet() {
  const w = window.open("", "_blank");
  if (!w) { toast("Allow pop-ups to print the sheet", "error"); return; }
  w.document.write(printHtml(form.week_date, rows.value));
  w.document.close();
  w.focus();
  w.print();
}

onMounted(load);
</script>

<style scoped>
.nim-req, .inv-req { color: #dc2626; }
.ct-err { margin-top: 4px; font-size: 12px; color: #dc2626; }
.ct-dd { font-size: 10px; font-weight: 500; color: #9ca3af; letter-spacing: 0; }
.ct-hint-line { margin: 8px 0 0; font-size: 12px; color: #6b7280; }
.ct-note { margin-top: 14px; padding: 10px 12px; border-radius: 8px; font-size: 12.5px; background: #f3f4f6; color: #374151; }
.ct-note-bad { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
.ct-note-ok { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
.vt-th { padding: 10px 10px; text-align: left; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; background: #f9fafb; border-bottom: 1px solid #e5e7eb; white-space: nowrap; user-select: none; }
.vt-th-r, .vt-td-r { text-align: right; }
.vt-td { padding: 8px 10px; vertical-align: middle; color: #374151; white-space: nowrap; }
.vt-td-mono { font-size: 12.5px; }
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
.ct-errbox { margin-top: 14px; padding: 12px 14px; border-radius: 8px; background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; font-size: 13px; }
.ct-errbox-title { display: flex; align-items: center; gap: 8px; font-weight: 700; }
.ct-errbox ul { margin: 8px 0 0; padding-left: 22px; }
.ct-errbox li { margin: 2px 0; }
.ct-info { display: flex; align-items: center; gap: 8px; padding: 9px 12px; border-radius: 8px; font-size: 12.5px; background: #eff6ff; color: #1d4ed8; }
.ct-note-ok { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
.at-drawer { width: 1360px; right: -1360px; transition: right .22s ease; position: fixed; top: 0; bottom: 0; max-width: 96vw; z-index: 8100; background: #fff; display: flex; flex-direction: column; }
.at-drawer.open { right: 0; }
.at-drawer .inv-dbody { background: #f5f6f8; }
.at-card-first { margin-top: 14px; }
.at-drawer .ct-note:first-child, .at-drawer .ct-errbox:first-child { margin-top: 0; }
.at-badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; background: rgba(255,255,255,.15); color: rgba(255,255,255,.85); border: 1px solid rgba(255,255,255,.25); }
.at-period { display: flex; align-items: center; gap: 10px; align-self: end; padding: 8px 12px; border-radius: 8px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; }
.at-period-lbl { font-size: 11px; font-weight: 600; color: #1e3a5f; }
.at-period-val { font-size: 12.5px; }
.at-count { margin-left: 6px; padding: 1px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.at-grid .inv-fi { padding: 5px 8px; font-size: 12.5px; min-height: 0; }
.at-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-top: 12px; }
.at-foot .ct-info { flex: 1; min-width: 260px; }
.at-totals { padding: 8px 14px; border-radius: 8px; border: 1px solid #1a6ef7; background: #fff; font-weight: 600; font-size: 13px; color: #111827; }
.at-del { margin-right: auto; color: #dc2626; }
.add-btn-cancel:disabled, .add-btn-more:disabled { opacity: .5; cursor: not-allowed; }
@media (max-width: 900px) { .at-drawer { width: 100% !important; right: -100%; max-width: 100%; } }
</style>