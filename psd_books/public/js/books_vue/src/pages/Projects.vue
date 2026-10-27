<template>
<div class="list-page">

  <!-- Toolbar -->
  <div class="sales-toolbar">
    <div class="sales-search">
      <span v-html="icon('search',13)" style="color:#9ca3af;flex-shrink:0"></span>
      <input v-model="search" placeholder="Search projects..." class="sales-search-input"/>
    </div>
    <div class="sales-pills">
      <button v-for="t in tabs" :key="t.key" class="sales-pill" :class="{active:filterTab===t.key}" @click="filterTab=t.key">
        {{ t.label }}
        <span v-if="t.key!=='all'" class="sales-pill-count">{{ counts[t.key] || 0 }}</span>
      </button>
    </div>
    <div class="sales-actions">
      <select v-model="dateRange" class="sales-select" title="Filter by start date">
        <option v-for="d in dateRanges" :key="d.key" :value="d.key">{{ d.label }}</option>
      </select>
      <button class="sales-btn-ghost" @click="load" title="Refresh" :disabled="loading"><span v-html="icon('refresh',14)"></span></button>
      <button class="sales-btn-ghost" @click="exportCSV" title="Export CSV" :disabled="!filtered.length"><span v-html="icon('download',14)"></span> CSV</button>
      <button class="sales-btn-primary" :disabled="!canCreateProject" :title="!canCreateProject ? 'Only a Project Manager, Books Admin or Director can create projects' : ''" @click="openNew"><span v-html="icon('plus',13)"></span> New Project</button>
    </div>
  </div>

  <!-- KPI cards -->
  <div class="pj-kpis">
    <div v-for="k in kpis" :key="k.key" class="pj-kpi pj-kpi-click" :class="['pj-kpi-' + k.key, { 'pj-kpi-on': filterTab === k.tab }]" role="button" tabindex="0" :title="'Show ' + k.label.toLowerCase()" @click="filterTab = k.tab" @keydown.enter="filterTab = k.tab">
      <div class="pj-kpi-icon" v-html="icon(k.icon, 20)"></div>
      <div class="pj-kpi-body">
        <div class="pj-kpi-label">{{ k.label }}</div>
        <div class="pj-kpi-value">{{ k.value }}</div>
        <div class="pj-kpi-sub">{{ k.sub }}</div>
      </div>
    </div>
  </div>

  <!-- Table -->
  <div class="inv-table-wrap">
    <table class="inv-table pj-tbl">
      <thead><tr>
        <th class="sortable" @click="sortBy('project_code')">Code <span v-html="sortArrow('project_code')"></span></th>
        <th class="sortable" @click="sortBy('project_name')">Project Name <span v-html="sortArrow('project_name')"></span></th>
        <th class="sortable" @click="sortBy('start_date')">Start Date <span v-html="sortArrow('start_date')"></span></th>
        <th class="sortable" @click="sortBy('expected_end_date')">Expected End <span v-html="sortArrow('expected_end_date')"></span></th>
        <th class="sortable" @click="sortBy('project_manager')">Project Manager <span v-html="sortArrow('project_manager')"></span></th>
        <th class="sortable" @click="sortBy('status')">Status <span v-html="sortArrow('status')"></span></th>
        <th style="width:80px;text-align:center">Actions</th>
      </tr></thead>
      <tbody>
        <template v-if="loading"><tr v-for="n in 5" :key="n"><td colspan="7"><div class="shimmer"></div></td></tr></template>
        <tr v-else-if="!sorted.length"><td colspan="7" class="bk-empty-state"><div class="bk-empty-inner">
          <template v-if="search || filterTab!=='all' || dateRange!=='all'">
            <p class="bk-empty-title">No projects match your filters</p>
          </template>
          <template v-else>
            <p class="bk-empty-title">No projects yet</p>
            <p class="bk-empty-sub">Create your first project to get started.</p>
            <button class="bk-empty-btn" :disabled="!canCreateProject" @click="openNew"><span v-html="icon('plus',13)"></span> New Project</button>
          </template>
        </div></td></tr>
        <tr v-else v-for="row in paged" :key="row.name" class="inv-row">
          <td @click="openEdit(row)" data-label="Code"><span class="inv-link pj-code">{{ row.project_code || row.name }}</span></td>
          <td @click="openEdit(row)" data-label="Project Name">{{ row.project_name }}</td>
          <td @click="openEdit(row)" data-label="Start Date">{{ row.start_date ? fmtDate(row.start_date) : '—' }}</td>
          <td @click="openEdit(row)" data-label="Expected End">{{ row.expected_end_date ? fmtDate(row.expected_end_date) : '—' }}</td>
          <td @click="openEdit(row)" data-label="Project Manager">{{ row.project_manager ? (members[row.project_manager] || row.project_manager) : '—' }}</td>
          <td @click="openEdit(row)" data-label="Status"><span class="inv-status-badge" :class="isOverdue(row) ? 'pj-badge-overdue' : (row.status === 'Closed' ? 'status-draft' : 'status-active')">{{ isOverdue(row) ? 'Overdue' : (row.status || 'Open') }}</span></td>
          <td style="text-align:center;white-space:nowrap" @click.stop>
            <button class="inv-act-btn" @click="openEdit(row)" :disabled="!canEditProject" title="Edit"><span v-html="icon('edit',13)"></span></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="!loading && sorted.length" style="padding:12px 4px 4px">
    <Pagination v-model:page="page" v-model:page-size="pageSize" :total-items="sorted.length" />
  </div>

  <!-- New / Edit form -->
  <div v-if="showForm" class="pj-overlay" @click.self="closeForm">
    <div class="pj-card">
      <div class="pj-head">
        <div class="pj-head-icon" v-html="icon('folder', 24)"></div>
        <div class="pj-head-text">
          <h3 class="pj-title">{{ isEdit ? 'Edit Project' : 'New Project' }}</h3>
          <div class="pj-subtitle">{{ isEdit ? 'Update project details' : 'Create a new project and set project details' }}</div>
        </div>
        <button type="button" class="pj-close" @click="closeForm" title="Close"><span v-html="icon('x', 20)"></span></button>
      </div>
      <form class="pj-body" @submit.prevent="save">
        <div class="pj-group">
          <label>Project Code <span class="nim-req">*</span></label>
          <div class="pj-ctl"><span class="pj-ico" v-html="icon('file', 16)"></span><input v-model="form.project_code" :disabled="isEdit" required maxlength="40" placeholder="e.g. SB-001" /></div>
        </div>
        <div class="pj-group">
          <label>Project Name <span class="nim-req">*</span></label>
          <div class="pj-ctl"><span class="pj-ico" v-html="TEXT_ICON"></span><input v-model="form.project_name" required maxlength="140" :disabled="formLocked" placeholder="Enter project name" /></div>
        </div>
        <div class="pj-row">
          <div class="pj-group">
            <label>Start Date <span class="nim-req">*</span></label>
            <div class="pj-ctl"><span class="pj-ico" v-html="icon('calendar', 16)"></span><input type="date" v-model="form.start_date" required :disabled="formLocked" /></div>
          </div>
          <div class="pj-group">
            <label>Expected End Date</label>
            <div class="pj-ctl"><span class="pj-ico" v-html="icon('calendar', 16)"></span><input type="date" v-model="form.expected_end_date" :min="form.start_date || null" :disabled="formLocked" /></div>
          </div>
        </div>
        <div class="pj-group">
          <label>Project Manager <span v-if="isAdmin && !isEdit" style="color:#e03131">*</span></label>
          <div class="pj-ctl">
            <span class="pj-ico" v-html="icon('user', 16)"></span>
            <select v-if="isAdmin" v-model="form.project_manager" :disabled="formLocked" :required="!isEdit">
              <option value="" :disabled="!isEdit">{{ isEdit ? '— None —' : '— Select Project Manager —' }}</option>
              <option v-for="m in managerOptions" :key="m.value" :value="m.value">{{ m.label }}</option>
            </select>
            <input v-else :value="managerLabel" disabled />
          </div>
          <div v-if="isAdmin" class="pj-hint">
            Approves this project's material requests. Only users with the Project Manager role are listed.
            <span v-if="!managerOptions.length"> No Project Manager exists yet: add one under Settings &gt; Users.</span>
          </div>
          <div v-else class="pj-hint">
            {{ isEdit ? 'Only a Books Admin or Director can change the Project Manager.' : 'You will be the Project Manager of this project.' }}
          </div>
        </div>
        <div class="pj-group">
          <label>Warehouse</label>
          <div class="pj-ctl">
            <span class="pj-ico" v-html="icon('box', 16)"></span>
            <select v-model="form.warehouse" :disabled="formLocked">
              <option value="">— None —</option>
              <option v-for="w in warehouseOptions" :key="w" :value="w">{{ w }}</option>
              <option v-if="form.warehouse && !warehouseOptions.includes(form.warehouse)" :value="form.warehouse">{{ form.warehouse }}</option>
            </select>
          </div>
          <div class="pj-hint">Project store for this project (optional). Linked both ways with the warehouse's Projects list. Create a new store under Inventory &gt; Warehouses.</div>
        </div>
        <div v-if="noProjectRights" class="pj-hint" style="margin-bottom:8px">
          You can view this project, but only a Project Manager, Books Admin or Director can edit it.
        </div>
        <div v-if="isEdit" class="pj-group">
          <label>Status</label>
          <div class="pj-ctl"><span class="pj-ico" v-html="icon('info', 16)"></span><input :value="form.status || 'Open'" disabled /></div>
          <div v-if="isClosed && form.closed_on" class="pj-hint">
            Closed by {{ form.closed_by || 'unknown' }} on {{ String(form.closed_on).slice(0, 16).replace('T', ' ') }}
          </div>
        </div>
        <div v-if="blockers.length" class="pj-blockers">
          <div class="pj-blockers-title">Can't close yet - these are still open:</div>
          <ul>
            <li v-for="b in blockers" :key="b.doctype">
              <strong>{{ b.count }} {{ b.label }}</strong>: {{ b.names.join(', ') }}<span v-if="b.count > b.names.length"> and {{ b.count - b.names.length }} more</span>
            </li>
          </ul>
        </div>
        <div class="pj-actions">
          <button v-if="isEdit && !isClosed" type="button" class="pj-btn-warn" style="margin-right:auto"
            :disabled="closing || !canEditProject" @click="closeProject">{{ closing ? 'Checking…' : 'Close Project' }}</button>
          <button v-if="isEdit && isClosed && isAdmin" type="button" class="pj-btn-sec" style="margin-right:auto"
            :disabled="closing" @click="reopenProject">{{ closing ? 'Reopening…' : 'Reopen Project' }}</button>
          <button type="button" class="pj-btn-sec" @click="closeForm">Cancel</button>
          <button type="submit" class="pj-btn-pri" :disabled="saving || isClosed || !(isEdit ? canEditProject : canCreateProject)">{{ saving ? 'Saving…' : 'Save' }}</button>
        </div>
      </form>
    </div>
  </div>

</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useToast } from "../composables/useToast.js";
import { apiList, apiSave, apiGET, apiPOST, resolveCompany } from "../api/client.js";
import { useConfirm } from "../composables/useConfirm.js";
import { usePermissions } from "../composables/usePermissions.js";
import { fmtDate } from "../utils/format.js";
import { icon } from "../utils/icons.js";
import { session } from "../api/session.js";
import Pagination from "../components/Pagination.vue";

const { toast } = useToast();
const { confirm } = useConfirm();
const { isAdmin, flags } = usePermissions();

// Only a Project Manager, Books Admin or Director can create or edit a project (the server
// enforces this too; these flags only hide / disable the buttons).
const canCreateProject = computed(() => isAdmin.value || !!flags.value.doc_access?.Project?.create);
const canEditProject = computed(() => isAdmin.value || !!flags.value.doc_access?.Project?.edit);

const list = ref([]);
const loading = ref(false);
const search = ref("");
const filterTab = ref("all");
const page = ref(1);
const pageSize = ref(25);
const sortKey = ref("project_code");
const sortDir = ref(1);
const showForm = ref(false);
const isEdit = ref(false);
const saving = ref(false);
const closing = ref(false);
const blockers = ref([]);
const form = ref(blankForm());
const members = ref({});
const pmList = ref([]);  // users who hold the Project Manager role
const managerOptions = computed(() => {
  const opts = pmList.value.map(u => ({ value: u.name, label: u.label || u.name }));
  const cur = form.value.project_manager;
  // An older project may have a manager who has no Project Manager role: keep it visible.
  if (cur && !opts.some(o => o.value === cur)) {
    opts.unshift({ value: cur, label: (members.value[cur] || cur) + " (no Project Manager role)" });
  }
  return opts.sort((a, b) => a.label.localeCompare(b.label));
});
const managerLabel = computed(() => {
  const u = form.value.project_manager;
  if (!u) return "—";
  return members.value[u] || (u === session.user ? session.fullname : "") || u;
});
const isClosed = computed(() => isEdit.value && form.value.status === "Closed");
// Read-only when the project is Closed, or the user may not edit (create) projects.
const noProjectRights = computed(() => isEdit.value ? !canEditProject.value : !canCreateProject.value);
const formLocked = computed(() => isClosed.value || noProjectRights.value);

const TEXT_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>';

const tabs = [
  { key: "all", label: "All" },
  { key: "Open", label: "Open" },
  { key: "Overdue", label: "Overdue" },
  { key: "Closed", label: "Closed" },
];
const dateRange = ref("all");
const dateRanges = [
  { key: "all", label: "All Time" },
  { key: "month", label: "This Month" },
  { key: "quarter", label: "This Quarter" },
  { key: "year", label: "This Year" },
];

function todayStr() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
// Open project whose expected end date has passed.
function isOverdue(r) {
  return r.status !== "Closed" && !!r.expected_end_date && String(r.expected_end_date).slice(0, 10) < todayStr();
}
function inDateRange(r) {
  if (dateRange.value === "all") return true;
  const sd = String(r.start_date || "").slice(0, 10);
  if (!sd) return false;
  const d = new Date();
  const y = d.getFullYear(), m = d.getMonth();
  const qStart = Math.floor(m / 3) * 3;
  const fmt = (yy, mm) => yy + "-" + String(mm + 1).padStart(2, "0");
  if (dateRange.value === "month") return sd.slice(0, 7) === fmt(y, m);
  if (dateRange.value === "year") return sd.slice(0, 4) === String(y);
  return sd.slice(0, 4) === String(y) && Number(sd.slice(5, 7)) - 1 >= qStart && Number(sd.slice(5, 7)) - 1 < qStart + 3;
}

function blankForm() {
  return { project_code: "", project_name: "", start_date: "", expected_end_date: "", project_manager: "", warehouse: "" };
}

const counts = computed(() => {
  const c = { Open: 0, Closed: 0, Overdue: 0 };
  for (const r of list.value) {
    c[r.status === "Closed" ? "Closed" : "Open"]++;
    if (isOverdue(r)) c.Overdue++;
  }
  return c;
});

const kpis = computed(() => {
  const open = counts.value.Open, closed = counts.value.Closed, overdue = counts.value.Overdue;
  return [
    { key: "total", label: "TOTAL PROJECTS", value: list.value.length, sub: "All projects", icon: "folder", tab: "all" },
    { key: "active", label: "ACTIVE PROJECTS", value: open, sub: "Currently open", icon: "activity", tab: "Open" },
    { key: "done", label: "COMPLETED", value: closed, sub: "Closed projects", icon: "check", tab: "Closed" },
    { key: "overdue", label: "OVERDUE", value: overdue, sub: overdue ? "Past expected end date" : "None overdue", icon: "alert", tab: "Overdue" },
  ];
});

const filtered = computed(() => {
  let rows = list.value;
  if (filterTab.value === "Overdue") rows = rows.filter(isOverdue);
  else if (filterTab.value !== "all") rows = rows.filter(r => (r.status || "Open") === filterTab.value);
  if (dateRange.value !== "all") rows = rows.filter(inDateRange);
  const s = search.value.trim().toLowerCase();
  if (s) rows = rows.filter(r =>
    (r.project_code || "").toLowerCase().includes(s) ||
    (r.project_name || "").toLowerCase().includes(s));
  return rows;
});

const sorted = computed(() => {
  const key = sortKey.value, dir = sortDir.value;
  return [...filtered.value].sort((a, b) =>
    String(a[key] ?? "").localeCompare(String(b[key] ?? ""), undefined, { numeric: true }) * dir);
});

const paged = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return sorted.value.slice(start, start + pageSize.value);
});

function sortBy(key) {
  if (sortKey.value === key) sortDir.value *= -1;
  else { sortKey.value = key; sortDir.value = 1; }
}
function sortArrow(key) {
  if (sortKey.value !== key) return "";
  return sortDir.value === 1 ? "&#9650;" : "&#9660;";
}

async function load() {
  loading.value = true;
  try {
    const company = await resolveCompany();
    list.value = await apiList("Project", {
      fields: ["name", "project_code", "project_name", "start_date", "expected_end_date", "project_manager", "warehouse", "status", "closed_by", "closed_on", "company"],
      filters: company ? [["company", "=", company]] : [],
      order: "project_code asc",
      limit: 500,
    }) || [];
  } catch (e) {
    toast.error("Failed to load projects: " + e.message);
    list.value = [];
  } finally {
    loading.value = false;
  }
}

function openNew() {
  isEdit.value = false;
  blockers.value = [];
  form.value = blankForm();
  // A Project Manager who creates a project becomes its manager; a Books Admin / Director picks one.
  if (!isAdmin.value) form.value.project_manager = session.user;
  showForm.value = true;
}
function openEdit(row) {
  isEdit.value = true;
  blockers.value = [];
  form.value = { ...row, warehouse: row.warehouse || "" };
  showForm.value = true;
}
function closeForm() { showForm.value = false; }

async function save() {
  const f = form.value;
  if (f.expected_end_date && f.start_date && f.expected_end_date < f.start_date) {
    toast.error("Expected End Date cannot be before Start Date");
    return;
  }
  if (!isEdit.value && isAdmin.value && !f.project_manager) {
    toast.error("Select a Project Manager for this project");
    return;
  }
  saving.value = true;
  try {
    const doc = {
      doctype: "Project",
      project_code: (f.project_code || "").trim(),
      project_name: (f.project_name || "").trim(),
      start_date: f.start_date,
      expected_end_date: f.expected_end_date || null,
      project_manager: f.project_manager || null,
      warehouse: f.warehouse || null,
    };
    if (isEdit.value) {
      doc.name = f.name;
    } else {
      doc.company = await resolveCompany();
    }
    await apiSave(doc);
    toast.success(isEdit.value ? "Project updated" : "Project created");
    showForm.value = false;
    await load();
  } catch (e) {
    toast.error("Failed to save project: " + e.message);
  } finally {
    saving.value = false;
  }
}

async function closeProject() {
  closing.value = true;
  blockers.value = [];
  try {
    const st = await apiGET("psd_books.api.projects.get_project_close_status", { project: form.value.name });
    if (!st?.can_close) {
      blockers.value = st?.open || [];
      if (!blockers.value.length) toast.error("This project can't be closed");
      return;
    }
    const ok = await confirm({
      title: "Close project?",
      body: `Close ${form.value.project_code}? No new MRN, LPO, GRN, delivery note, stock entry or purchase invoice can use it afterwards.`,
      okLabel: "Close Project",
      okStyle: "primary",
    });
    if (!ok) return;
    const res = await apiPOST("psd_books.api.projects.close_project", { project: form.value.name });
    toast.success("Project closed");
    form.value = { ...form.value, status: "Closed", closed_by: res?.closed_by, closed_on: res?.closed_on };
    await load();
  } catch (e) {
    toast.error("Failed to close project: " + e.message);
  } finally {
    closing.value = false;
  }
}

async function reopenProject() {
  const ok = await confirm({
    title: "Reopen project?",
    body: `Reopen ${form.value.project_code}? New documents can use it again.`,
    okLabel: "Reopen",
    okStyle: "primary",
  });
  if (!ok) return;
  closing.value = true;
  try {
    await apiPOST("psd_books.api.projects.reopen_project", { project: form.value.name });
    toast.success("Project reopened");
    form.value = { ...form.value, status: "Open", closed_by: null, closed_on: null };
    await load();
  } catch (e) {
    toast.error("Failed to reopen project: " + e.message);
  } finally {
    closing.value = false;
  }
}

function exportCSV() {
  const headers = ["Code", "Project Name", "Start Date", "Expected End Date", "Project Manager", "Status"];
  const rows = filtered.value.map(r => [r.project_code || r.name, r.project_name, r.start_date || "", r.expected_end_date || "", r.project_manager ? (members.value[r.project_manager] || r.project_manager) : "", r.status || "Open"]);
  const csv = [headers, ...rows].map(row => row.map(v => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url; a.download = "projects.csv"; a.click();
  URL.revokeObjectURL(url);
}

const warehouseOptions = ref([]);
async function loadWarehouses() {
  try {
    const company = await resolveCompany();
    const r = await apiList("Warehouse", {
      fields: ["name"],
      filters: [...(company ? [["company", "=", company]] : []), ["is_group", "=", 0], ["disabled", "=", 0], ["store_role", "in", ["Project Main Store", "Site Store"]]],
      order: "name asc",
      limit: 500,
    }) || [];
    warehouseOptions.value = r.map(x => x.name);
  } catch (e) {
    warehouseOptions.value = [];
  }
}

async function loadMembers() {
  try {
    members.value = (await apiGET("psd_books.api.admin.get_company_user_names")) || {};
  } catch (e) {
    members.value = {};
  }
  try {
    pmList.value = (await apiGET("psd_books.api.admin.get_project_manager_options")) || [];
  } catch (e) {
    pmList.value = [];
  }
}

onMounted(() => { load(); loadMembers(); loadWarehouses(); });
</script>

<style scoped>
.pj-tbl { min-width: 720px; }
.pj-code { font-family: inherit; }
.pj-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.pj-card { background: #fff; border-radius: 16px; width: 560px; max-width: 98%; max-height: 94vh; overflow-y: auto; box-shadow: 0 20px 50px rgba(15,23,42,.25); }
.pj-head { padding: 20px 24px; background: #eff6ff; display: flex; align-items: center; gap: 14px; }
.pj-head-icon { width: 48px; height: 48px; border-radius: 12px; background: #dbeafe; color: #2563eb; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pj-head-text { flex: 1; min-width: 0; }
.pj-subtitle { font-size: 13px; color: #6b7280; margin-top: 2px; }
.pj-title { font-size: 20px; font-weight: 700; margin: 0; color: #111827; }
.pj-close { background: none; border: none; cursor: pointer; color: #374151; display: flex; align-items: center; padding: 4px; border-radius: 6px; align-self: flex-start; }
.pj-close:hover { background: rgba(0,0,0,.05); }
.pj-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.pj-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.pj-group { display: flex; flex-direction: column; gap: 5px; }
.pj-group label { font-size: 13.5px; font-weight: 600; color: #374151; }
.pj-ctl { position: relative; }
.pj-ico { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #6b7280; display: flex; pointer-events: none; z-index: 1; }
.pj-group .pj-ctl input, .pj-group .pj-ctl select { height: 42px; padding-left: 42px; border-radius: 10px; font-size: 14px; }
.pj-group input { width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; outline: none; box-sizing: border-box; }
.pj-group select { width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; outline: none; box-sizing: border-box; background: #fff; }
.pj-group select:disabled { background: #f3f4f6; color: #6b7280; }
.pj-group input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,.08); }
.pj-group input:disabled { background: #f3f4f6; color: #6b7280; }
.pj-hint { font-size: 12px; color: #6b7280; margin-top: 2px; }
.pj-blockers { background: #fef3c7; border: 1px solid #fcd34d; color: #92400e; border-radius: 6px; padding: 10px 12px; font-size: 12.5px; }
.pj-blockers-title { font-weight: 700; margin-bottom: 4px; }
.pj-blockers ul { margin: 0; padding-left: 18px; }
.pj-btn-warn { padding: 8px 14px; border: 1px solid #fca5a5; background: #fff; color: #b91c1c; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
.pj-btn-warn:disabled { opacity: .55; cursor: not-allowed; }
.pj-actions { display: flex; justify-content: flex-end; gap: 10px; margin: 8px -24px -24px; padding: 16px 24px; border-top: 1px solid #e5e7eb; }
.pj-btn-sec { padding: 10px 20px; border: 1px solid #d1d5db; background: #fff; border-radius: 6px; font-size: 13px; cursor: pointer; }
.pj-btn-pri { padding: 10px 26px; border: none; background: #1a6ef7; color: #fff; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
.pj-btn-pri:disabled { opacity: .55; cursor: not-allowed; }
.pj-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 0 0 18px; }
.pj-kpi { display: flex; align-items: center; gap: 16px; padding: 20px 22px; border: 1px solid #e5e7eb; border-radius: 14px; background: #fff; }
.pj-kpi-icon { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.pj-kpi-label { font-size: 11.5px; font-weight: 600; letter-spacing: .06em; color: #4b5563; }
.pj-kpi-value { font-size: 28px; font-weight: 800; color: #111827; line-height: 1.15; }
.pj-kpi-sub { font-size: 12px; font-weight: 500; color: #6b7280; margin-top: 2px; }
.pj-kpi-total { background: linear-gradient(135deg, #eff6ff, #fff); border-color: #dbeafe; } .pj-kpi-total .pj-kpi-icon { background: #dbeafe; color: #2563eb; }
.pj-kpi-active { background: #fff; } .pj-kpi-active .pj-kpi-icon { background: #ede9fe; color: #7c3aed; }
.pj-kpi-done { background: linear-gradient(135deg, #ecfdf5, #fff); border-color: #bbf7d0; } .pj-kpi-done .pj-kpi-icon { background: #d1fae5; color: #16a34a; } .pj-kpi-done .pj-kpi-value { color: #16a34a; }
.pj-kpi-overdue { background: linear-gradient(135deg, #fef2f2, #fff); border-color: #fecaca; } .pj-kpi-overdue .pj-kpi-icon { background: #fee2e2; color: #dc2626; } .pj-kpi-overdue .pj-kpi-value { color: #dc2626; }
.pj-kpi-click { cursor: pointer; transition: box-shadow .15s, transform .15s, border-color .15s; }
.pj-kpi-click:hover { box-shadow: 0 4px 14px rgba(15,23,42,.08); transform: translateY(-1px); }
.pj-kpi-on { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,.25); }
.pj-badge-overdue { background: #fee2e2; color: #b91c1c; }
@media (max-width: 1024px) { .pj-kpis { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .pj-tbl { min-width: 0; } .pj-row { grid-template-columns: 1fr; } }
</style>