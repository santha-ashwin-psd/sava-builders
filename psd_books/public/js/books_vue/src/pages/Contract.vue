<template>
<div class="list-page">
  <div class="sales-toolbar">
    <div class="sales-search">
      <span v-html="icon('search',13)" style="color:#9ca3af;flex-shrink:0"></span>
      <input v-model="search" placeholder="Search contracts…" class="sales-search-input" autocomplete="off"/>
    </div>
    <div class="sales-pills">
      <button v-for="f in FILTERS" :key="f.k" class="sales-pill" :class="{active: activeFilter===f.k}" @click="activeFilter=f.k">
        {{ f.l }}
        <span class="sales-pill-count" :class="activeFilter===f.k?'':'zb-pc-muted'">{{ counts[f.k] }}</span>
      </button>
    </div>
    <div class="cust-toolbar-right" style="margin-left:auto">
      <button class="sales-btn-ghost" @click="load" title="Refresh"><span v-html="icon('refresh',13)"></span> Refresh</button>
      <button class="sales-btn-primary" :disabled="!$canCreate('admin')" :title="!$canCreate('admin') ? 'Not permitted' : ''" @click="openAdd"><span v-html="icon('plus',13)"></span> New Contract</button>
    </div>
  </div>

  <div class="inv-table-wrap">
    <table class="inv-table">
      <thead>
        <tr>
          <th class="vt-th">Contract</th><th class="vt-th">Project</th><th class="vt-th">Task / Activity</th><th class="vt-th">Contractor</th>
          <th class="vt-th vt-th-r">Contract Value (KES)</th><th class="vt-th">Period</th><th class="vt-th">Status</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="n in 6" :key="n" class="vt-row-shimmer"><td colspan="7"><div class="shimmer" style="height:12px;border-radius:3px;width:65%"></div></td></tr>
        </template>
        <tr v-else-if="!filtered.length">
          <td colspan="7" class="vt-empty">
            <div class="vt-empty-title">{{ search || activeFilter!=='all' ? 'No results found' : 'No contracts yet' }}</div>
            <div class="vt-empty-sub">{{ search || activeFilter!=='all' ? 'Try adjusting your search or filter' : 'Add your first labour contract to get started' }}</div>
          </td>
        </tr>
        <tr v-else v-for="c in filtered" :key="c.name" class="inv-row" @click="openEdit(c)">
          <td class="vt-td vt-td-mono">{{ c.name }}</td>
          <td class="vt-td">{{ names.project[c.project] || c.project }}</td>
          <td class="vt-td">{{ names.activity[c.activity] || c.activity }}</td>
          <td class="vt-td">{{ names.contractor[c.contractor] || c.contractor }}</td>
          <td class="vt-td vt-td-r">{{ fmtKES(c.contract_value) }}</td>
          <td class="vt-td vt-td-secondary">{{ fmtDate(c.start_date) }} – {{ fmtDate(c.end_date) }}</td>
          <td class="vt-td"><span class="vt-badge" :class="'vt-badge-'+statusClass(c.status)"><span class="vt-badge-dot"></span>{{ c.status }}</span></td>
        </tr>
      </tbody>
    </table>
    <div class="vt-footer" v-if="!loading && list.length">Showing <strong>{{ filtered.length }}</strong> of <strong>{{ list.length }}</strong> contracts</div>
  </div>
  <p style="margin:10px 4px;font-size:12px;color:#6b7280">A Director approves each contract. The value is locked once the contract is sent for approval. A contractor can hold any number of contracts. Each activity can be used on one contract only.</p>

  <Teleport to="body">
    <div v-if="showDrawer" class="inv-drawer-bg" @click.self="showDrawer=false">
      <div class="inv-drawer-panel open ct-drawer" style="width:560px;max-width:98vw">
        <div class="inv-dh" style="background:linear-gradient(135deg,#1e3a5f,#1a6ef7);padding:18px 24px">
          <div class="cust-drawer-header-left">
            <div class="cust-drawer-icon" style="color:#fff"><span v-html="icon('file',16)"></span></div>
            <div>
              <div class="inv-dh-title">{{ form.name || 'New Contract' }}</div>
              <div class="cust-drawer-sub">{{ form.name ? form.status : 'Labour contract for one task on one project' }}</div>
            </div>
          </div>
          <button class="inv-dclose" style="background:rgba(255,255,255,.15);border:none;cursor:pointer;color:#fff;width:30px;height:30px;border-radius:8px;display:grid;place-items:center" @click="showDrawer=false" v-html="icon('x',15)"></button>
        </div>

        <div class="inv-dbody" style="padding:24px;overflow-y:auto;flex:1">
          <div class="inv-fg inv-fg2">
            <div class="inv-field">
              <label class="inv-lbl">Project <span class="nim-req">*</span></label>
              <select v-model="form.project" class="inv-fi" :style="errStyle('project')" :disabled="!ac.canEdit" @change="delete formErrors.project; delete formErrors.activity">
                <option value="">Select project</option>
                <option v-for="p in projectOptions" :key="p.name" :value="p.name">{{ p.project_name || p.name }}</option>
              </select>
              <div v-if="formErrors.project" class="ct-err">{{ formErrors.project }}</div>
            </div>
            <div class="inv-field">
              <label class="inv-lbl">Task / Activity <span class="nim-req">*</span></label>
              <select v-model="form.activity" class="inv-fi" :style="errStyle('activity')" :disabled="!ac.canEdit" @change="delete formErrors.activity">
                <option value="">Select activity</option>
                <option v-for="a in activityOptions" :key="a.name" :value="a.name">{{ a.activity_name || a.name }}</option>
              </select>
              <div v-if="formErrors.activity" class="ct-err">{{ formErrors.activity }}</div>
            </div>
            <div class="inv-field" style="grid-column:span 2">
              <label class="inv-lbl">Contractor <span class="nim-req">*</span></label>
              <select v-model="form.contractor" class="inv-fi" :style="errStyle('contractor')" :disabled="!ac.canEdit" @change="delete formErrors.contractor">
                <option value="">Select contractor</option>
                <option v-for="c in contractorOptions" :key="c.name" :value="c.name">{{ c.contractor_name || c.name }}{{ isCertExpired(c.tax_cert_expiry) ? ' (certificate expired)' : '' }}</option>
              </select>
              <div v-if="formErrors.contractor" class="ct-err">{{ formErrors.contractor }}</div>
            </div>
            <div class="inv-field">
              <label class="inv-lbl">Start Date <span class="nim-req">*</span></label>
              <input type="date" v-model="form.start_date" class="inv-fi" :style="errStyle('start_date')" :disabled="!ac.canEdit" @input="delete formErrors.start_date"/>
              <div v-if="formErrors.start_date" class="ct-err">{{ formErrors.start_date }}</div>
            </div>
            <div class="inv-field">
              <label class="inv-lbl">End Date <span class="nim-req">*</span></label>
              <input type="date" v-model="form.end_date" class="inv-fi" :style="errStyle('end_date')" :disabled="!ac.canEdit" @input="delete formErrors.end_date"/>
              <div v-if="formErrors.end_date" class="ct-err">{{ formErrors.end_date }}</div>
            </div>
            <div class="inv-field" style="grid-column:span 2">
              <label class="inv-lbl">Contract Value (KES) <span class="nim-req">*</span></label>
              <input type="number" min="0" v-model.number="form.contract_value" class="inv-fi" :style="errStyle('contract_value')" :disabled="!ac.canEdit" @input="delete formErrors.contract_value"/>
              <div v-if="formErrors.contract_value" class="ct-err">{{ formErrors.contract_value }}</div>
              <div v-else class="ct-info"><span v-html="icon('info',14)"></span>{{ ac.canEdit ? 'Value locks once sent for approval.' : 'Value is locked.' }}</div>
            </div>
            <div class="inv-field" style="grid-column:span 2">
              <label class="inv-lbl">Narration</label>
              <textarea v-model="form.narration" class="inv-fi" rows="3" placeholder="Enter narration" :disabled="!ac.canEdit" style="height:auto;padding:8px 10px"></textarea>
            </div>
          </div>

          <div v-if="form.status===SENT_BACK && form.rejection_reason" class="ct-note ct-note-bad">Sent back: {{ form.rejection_reason }}</div>
          <div v-if="form.status===PENDING" class="ct-note">Waiting for Director approval. The contract is locked.</div>
          <div v-if="form.status===APPROVED" class="ct-note ct-note-ok">Approved by {{ ownerName(form.approved_by) }} on {{ fmtDate(form.approved_on) }}. Contract value is locked.</div>
          <div v-if="form.status===CLOSED" class="ct-note">Closed on {{ fmtDate(form.closed_on) }}. Only a Director can reopen it.</div>
          <div v-if="blockers.length && (ac.canSend || ac.canApprove)" class="ct-errbox">
            <div class="ct-errbox-title"><span v-html="icon('alert',15)"></span>{{ blockersTitle }}</div>
            <ul><li v-for="b in blockers" :key="b">{{ b }}</li></ul>
          </div>
        </div>

        <div class="inv-dfooter" style="border-top:1px solid #e8ecf0;padding:14px 24px;background:#fafbfd;flex-wrap:wrap;gap:8px">
          <button v-if="canDeleteDoc && $canDelete('admin')" class="form-btn form-btn-outline" :disabled="busy" @click="doDelete" style="margin-right:auto;color:#dc2626">Delete</button>
          <button class="form-btn form-btn-outline" @click="showDrawer=false">{{ ac.canEdit ? 'Cancel' : 'Close window' }}</button>
          <button v-if="ac.canEdit" class="form-btn form-btn-outline ct-btn-blue" :disabled="busy || !canWrite" @click="saveDraft(false)">{{ saving ? 'Saving…' : 'Save Draft' }}</button>
          <button v-if="ac.canSend" class="form-btn form-btn-primary" :disabled="busy || !canWrite || blockers.length>0" @click="sendForApproval">Submit for approval</button>
          <button v-if="ac.canApprove" class="form-btn form-btn-primary" :disabled="busy || blockers.length>0" @click="approve">Approve as Director</button>
          <button v-if="ac.canSendBack" class="form-btn form-btn-outline" :disabled="busy" @click="sendBack">Send back</button>
          <button v-if="ac.canClose" class="form-btn form-btn-outline" :disabled="busy || !canWrite" @click="closeContract">Close contract</button>
          <button v-if="ac.canReopen" class="form-btn form-btn-primary" :disabled="busy" @click="reopenContract">Reopen contract</button>
        </div>
      </div>
    </div>
  </Teleport>
</div>
</template>

<script setup>
// Labour Contract > Contract (prototype v11). List + drawer; data in the "Labour Contract" doctype,
// approval through psd_books.api.labour_contract (only a Director approves).
import { ref, reactive, computed, onMounted } from "vue";
import { apiList, apiSave, apiDelete, apiPOST, apiGET, resolveCompany } from "../api/client.js";
import { useToast } from "../composables/useToast.js";
import { useConfirm } from "../composables/useConfirm.js";
import { usePrompt } from "../composables/usePrompt.js";
import { usePermissions } from "../composables/usePermissions.js";
import { fmtDate } from "../utils/format.js";
import { ownerName } from "../utils/userNames.js";
import { icon } from "../utils/icons.js";
import { isCertExpired } from "../utils/labourContractor.js";
import {
  DRAFT, PENDING, APPROVED, SENT_BACK, CLOSED, statusClass, fmtKES, matchesFilter, countsFor, matchesSearch,
  blockersFor, validateContract, actionState, canDelete,
} from "../utils/labourContract.js";
import { freeActivities } from "../utils/labourActivity.js";

const { toast } = useToast();
const { confirm } = useConfirm();
const { prompt } = usePrompt();
const { canEdit: canEditModule } = usePermissions();
const DT = "Labour Contract";
const API = "psd_books.api.labour_contract.";
const FILTERS = [{ k: "all", l: "All" }, { k: "draft", l: "Draft" }, { k: "pending", l: "Pending" }, { k: "approved", l: "Approved" }, { k: "closed", l: "Closed" }];

const list = ref([]);
const projects = ref([]);
const activities = ref([]);
const contractors = ref([]);
const canApprove = ref(false);
const loading = ref(true);
const search = ref("");
const activeFilter = ref("all");
const showDrawer = ref(false);
const saving = ref(false);
const busy = ref(false);
const formErrors = reactive({});
const form = reactive({});

const canWrite = computed(() => canEditModule("admin"));
const blank = () => ({ name: "", status: DRAFT, project: "", activity: "", contractor: "", start_date: "", end_date: "", contract_value: "", narration: "",
  raised_by: "", approved_by: "", approved_on: "", rejection_reason: "", closed_on: "" });
function resetForm(src) {
  Object.keys(formErrors).forEach((k) => delete formErrors[k]);
  Object.keys(form).forEach((k) => delete form[k]);
  Object.assign(form, blank(), src || {});
}

const names = computed(() => ({
  project: Object.fromEntries(projects.value.map((p) => [p.name, p.project_name || p.name])),
  activity: Object.fromEntries(activities.value.map((a) => [a.name, a.activity_name || a.name])),
  contractor: Object.fromEntries(contractors.value.map((c) => [c.name, c.contractor_name || c.name])),
}));
const counts = computed(() => countsFor(list.value));
const filtered = computed(() => list.value.filter((c) => matchesFilter(c, activeFilter.value) && matchesSearch(c, search.value, names.value)));
// Only open projects, active activities and active contractors can be picked; the one already on the contract stays listed.
const projectOptions = computed(() => projects.value.filter((p) => p.status !== "Closed" || p.name === form.project));
const activityOptions = computed(() => freeActivities(activities.value, list.value, form.name, form.activity));
const contractorOptions = computed(() => contractors.value.filter((c) => !c.disabled || c.name === form.contractor));
const ac = computed(() => actionState(form.status, canApprove.value));
const canDeleteDoc = computed(() => !!form.name && canDelete(form, canApprove.value));
const blockersTitle = computed(() => blockers.value.every((b) => /^(Choose|Enter|Select)/.test(b)) ? "Please complete the required fields" : "Please fix the following");
const blockers = computed(() => blockersFor(form, contractors.value.find((c) => c.name === form.contractor), list.value));

function errStyle(f) { return formErrors[f] ? "border-color:#dc2626;background:#fff5f5" : ""; }

async function load() {
  loading.value = true;
  try {
    const [rows, pr, ac2, ct, perm] = await Promise.all([
      apiList(DT, { fields: ["name", "status", "project", "activity", "contractor", "start_date", "end_date", "contract_value", "narration",
        "raised_by", "approved_by", "approved_on", "rejection_reason", "closed_on"], order: "modified desc", limit: 1000 }),
      apiList("Project", { fields: ["name", "project_name", "status"], limit: 1000 }),
      apiList("Labour Activity", { fields: ["name", "activity_name", "disabled"], order: "activity_code asc", limit: 500 }),
      apiList("Labour Contractor", { fields: ["name", "contractor_name", "disabled", "tax_cert_expiry"], order: "contractor_name asc", limit: 1000 }),
      apiGET(API + "my_permissions", {}),
    ]);
    list.value = rows || []; projects.value = pr || []; activities.value = ac2 || []; contractors.value = ct || [];
    canApprove.value = !!(perm && perm.can_approve);
  } catch (e) {
    toast("Failed to load contracts: " + (e.message || e), "error");
  } finally { loading.value = false; }
}

function openAdd() { resetForm(); showDrawer.value = true; }
function openEdit(c) { resetForm({ ...c }); showDrawer.value = true; }

// Saves the draft; returns the saved contract name, or "" when validation or the server refused it.
async function saveDraft(quiet) {
  const errs = validateContract(form, list.value, form.name);
  Object.keys(formErrors).forEach((k) => delete formErrors[k]);
  Object.assign(formErrors, errs);
  if (Object.keys(errs).length) { toast(Object.values(errs)[0], "error"); return ""; }
  saving.value = true;
  try {
    const company = await resolveCompany();
    const res = await apiSave({
      doctype: DT, ...(form.name ? { name: form.name } : {}), company,
      project: form.project, activity: form.activity, contractor: form.contractor,
      start_date: form.start_date, end_date: form.end_date, contract_value: Number(form.contract_value) || 0,
      narration: (form.narration || "").trim(),
    });
    const name = (res && (res.name || res.doc?.name)) || form.name;
    if (!quiet) toast(form.name ? "Contract updated" : "Contract saved");
    form.name = name;
    await load();
    return name;
  } catch (e) {
    toast(e.message || "Could not save contract", "error");
    return "";
  } finally { saving.value = false; }
}

// Runs a workflow call, then shows the returned contract.
async function run(method, args, okMsg) {
  busy.value = true;
  try {
    const r = await apiPOST(API + method, args);
    toast(okMsg);
    await load();
    if (r && r.name) resetForm(list.value.find((c) => c.name === r.name) || r);
  } catch (e) {
    toast(e.message || "Action failed", "error");
  } finally { busy.value = false; }
}

async function sendForApproval() {
  const ok = await confirm({ title: "Send for approval?", body: "Send this contract to the Director for approval? The contract value is locked once it is sent.", okLabel: "Send for approval", okStyle: "primary" });
  if (!ok) return;
  const name = await saveDraft(true);
  if (name) await run("send_for_approval", { name }, "Sent for Director approval");
}
async function approve() {
  const ok = await confirm({ title: "Approve contract?", body: "Approve " + form.name + "? The contract value is locked once it is approved.", okLabel: "Approve", okStyle: "primary" });
  if (ok) await run("approve_contract", { name: form.name }, "Contract approved");
}
async function sendBack() {
  const reason = await prompt({ title: "Send back", label: "Reason", okLabel: "Send back" });
  if (!reason || !reason.trim()) return;
  await run("send_back_contract", { name: form.name, reason: reason.trim() }, "Sent back");
}
async function closeContract() {
  const ok = await confirm({ title: "Close contract?", body: "A closed contract is locked. Only a Director can reopen it.", okLabel: "Close contract", okStyle: "primary" });
  if (ok) await run("close_contract", { name: form.name }, "Contract closed");
}
async function reopenContract() {
  const ok = await confirm({ title: "Reopen contract?", body: "Reopen " + form.name + "? It goes back to Approved and can be used on weekly bills again.", okLabel: "Reopen contract", okStyle: "primary" });
  if (ok) await run("reopen_contract", { name: form.name }, "Contract reopened");
}
async function doDelete() {
  const ok = await confirm({ title: "Delete contract?", body: "Delete " + form.name + "? This can't be undone. A contract on a weekly bill can't be deleted." });
  if (!ok) return;
  busy.value = true;
  try { await apiDelete(DT, form.name); toast("Contract deleted"); showDrawer.value = false; await load(); }
  catch (e) { toast(e.message || "Could not delete contract", "error"); }
  finally { busy.value = false; }
}

onMounted(load);
</script>

<style scoped>
.nim-req, .inv-req { color: #dc2626; }
.cust-drawer-sub { color: #fff; font-size: 12px; margin-top: 2px; }
.ct-err { margin-top: 4px; font-size: 12px; color: #dc2626; }
.ct-hint { margin-top: 4px; font-size: 12px; color: #9ca3af; }
.ct-note { margin-top: 14px; padding: 10px 12px; border-radius: 8px; font-size: 12.5px; background: #f3f4f6; color: #374151; }
.ct-note-bad { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
.ct-drawer .inv-lbl { font-weight: 600; color: #111827; }
.ct-drawer .inv-fi { height: 40px; border-radius: 8px; border-color: #d1d5db; }
.ct-drawer textarea.inv-fi { height: auto; }
.ct-drawer .inv-fi:focus { border-color: #1a6ef7; box-shadow: 0 0 0 3px rgba(26,110,247,.15); outline: none; }
.ct-info { margin-top: 8px; display: flex; align-items: center; gap: 8px; padding: 9px 12px; border-radius: 8px; font-size: 12.5px; background: #eff6ff; color: #1d4ed8; }
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
.vt-empty { padding: 52px 24px; text-align: center; }
.vt-empty-title { font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px; }
.vt-empty-sub { font-size: 13px; color: #9ca3af; }
.vt-footer { padding: 9px 16px; border-top: 1px solid #f3f4f6; font-size: 12px; color: #9ca3af; background: #fafafa; }
.vt-footer strong { color: #6b7280; font-weight: 600; }
</style>