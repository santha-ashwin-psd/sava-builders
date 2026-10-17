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
      <button class="sales-btn-ghost" @click="load" title="Refresh" :disabled="loading"><span v-html="icon('refresh',14)"></span></button>
      <button class="sales-btn-ghost" @click="exportCSV" title="Export CSV" :disabled="!filtered.length"><span v-html="icon('download',14)"></span> CSV</button>
      <button class="sales-btn-primary" :disabled="!$canCreate('inventory')" :title="!$canCreate('inventory') ? 'Read-only access' : ''" @click="openNew"><span v-html="icon('plus',13)"></span> New Project</button>
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
          <template v-if="search || filterTab!=='all'">
            <p class="bk-empty-title">No projects match your filters</p>
          </template>
          <template v-else>
            <p class="bk-empty-title">No projects yet</p>
            <p class="bk-empty-sub">Create your first project to get started.</p>
            <button class="bk-empty-btn" :disabled="!$canCreate('inventory')" @click="openNew"><span v-html="icon('plus',13)"></span> New Project</button>
          </template>
        </div></td></tr>
        <tr v-else v-for="row in paged" :key="row.name" class="inv-row">
          <td @click="openEdit(row)" data-label="Code"><span class="inv-link pj-code">{{ row.project_code || row.name }}</span></td>
          <td @click="openEdit(row)" data-label="Project Name">{{ row.project_name }}</td>
          <td @click="openEdit(row)" data-label="Start Date">{{ row.start_date ? fmtDate(row.start_date) : '—' }}</td>
          <td @click="openEdit(row)" data-label="Expected End">{{ row.expected_end_date ? fmtDate(row.expected_end_date) : '—' }}</td>
          <td @click="openEdit(row)" data-label="Project Manager">{{ row.project_manager ? (members[row.project_manager] || row.project_manager) : '—' }}</td>
          <td @click="openEdit(row)" data-label="Status"><span class="inv-status-badge" :class="row.status === 'Closed' ? 'status-draft' : 'status-active'">{{ row.status || 'Open' }}</span></td>
          <td style="text-align:center;white-space:nowrap" @click.stop>
            <button class="inv-act-btn" @click="openEdit(row)" :disabled="!$canEdit('inventory')" title="Edit"><span v-html="icon('edit',13)"></span></button>
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
        <h3 class="pj-title">{{ isEdit ? 'Edit Project' : 'New Project' }}</h3>
        <button class="pj-close" @click="closeForm">×</button>
      </div>
      <form class="pj-body" @submit.prevent="save">
        <div class="pj-group">
          <label>Project Code <span class="nim-req">*</span></label>
          <input v-model="form.project_code" :disabled="isEdit" required maxlength="40" placeholder="e.g. SB-001" />
        </div>
        <div class="pj-group">
          <label>Project Name <span class="nim-req">*</span></label>
          <input v-model="form.project_name" required maxlength="140" :disabled="isClosed" />
        </div>
        <div class="pj-row">
          <div class="pj-group">
            <label>Start Date <span class="nim-req">*</span></label>
            <input type="date" v-model="form.start_date" required :disabled="isClosed" />
          </div>
          <div class="pj-group">
            <label>Expected End Date</label>
            <input type="date" v-model="form.expected_end_date" :min="form.start_date || null" :disabled="isClosed" />
          </div>
        </div>
        <div class="pj-group">
          <label>Project Manager</label>
          <select v-model="form.project_manager" :disabled="isClosed">
            <option value="">— None —</option>
            <option v-for="m in memberOptions" :key="m.value" :value="m.value">{{ m.label }}</option>
          </select>
          <div class="pj-hint">Approves this project's material requests. Must be a company member and not a Books Viewer.</div>
        </div>
        <div v-if="isEdit" class="pj-group">
          <label>Status</label>
          <input :value="form.status || 'Open'" disabled />
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
            :disabled="closing || !$canEdit('inventory')" @click="closeProject">{{ closing ? 'Checking…' : 'Close Project' }}</button>
          <button v-if="isEdit && isClosed && isAdmin" type="button" class="pj-btn-sec" style="margin-right:auto"
            :disabled="closing" @click="reopenProject">{{ closing ? 'Reopening…' : 'Reopen Project' }}</button>
          <button type="button" class="pj-btn-sec" @click="closeForm">Cancel</button>
          <button type="submit" class="pj-btn-pri" :disabled="saving || isClosed || !(isEdit ? $canEdit('inventory') : $canCreate('inventory'))">{{ saving ? 'Saving…' : 'Save' }}</button>
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
import Pagination from "../components/Pagination.vue";

const { toast } = useToast();
const { confirm } = useConfirm();
const { isAdmin } = usePermissions();

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
const memberOptions = computed(() => Object.entries(members.value)
  .map(([value, label]) => ({ value, label: label || value }))
  .sort((a, b) => a.label.localeCompare(b.label)));
const isClosed = computed(() => isEdit.value && form.value.status === "Closed");

const tabs = [
  { key: "all", label: "All" },
  { key: "Open", label: "Open" },
  { key: "Closed", label: "Closed" },
];

function blankForm() {
  return { project_code: "", project_name: "", start_date: "", expected_end_date: "", project_manager: "" };
}

const counts = computed(() => {
  const c = { Open: 0, Closed: 0 };
  for (const r of list.value) c[r.status === "Closed" ? "Closed" : "Open"]++;
  return c;
});

const filtered = computed(() => {
  let rows = list.value;
  if (filterTab.value !== "all") rows = rows.filter(r => (r.status || "Open") === filterTab.value);
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
      fields: ["name", "project_code", "project_name", "start_date", "expected_end_date", "project_manager", "status", "closed_by", "closed_on", "company"],
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
  showForm.value = true;
}
function openEdit(row) {
  isEdit.value = true;
  blockers.value = [];
  form.value = { ...row };
  showForm.value = true;
}
function closeForm() { showForm.value = false; }

async function save() {
  const f = form.value;
  if (f.expected_end_date && f.start_date && f.expected_end_date < f.start_date) {
    toast.error("Expected End Date cannot be before Start Date");
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

async function loadMembers() {
  try {
    members.value = (await apiGET("psd_books.api.admin.get_company_user_names")) || {};
  } catch (e) {
    members.value = {};
  }
}

onMounted(() => { load(); loadMembers(); });
</script>

<style scoped>
.pj-tbl { min-width: 720px; }
.pj-code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
.pj-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.pj-card { background: #fff; border-radius: 10px; width: 520px; max-width: 98%; }
.pj-head { padding: 16px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
.pj-title { font-size: 17px; font-weight: 700; margin: 0; }
.pj-close { background: none; border: none; font-size: 24px; cursor: pointer; color: #6b7280; }
.pj-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.pj-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.pj-group { display: flex; flex-direction: column; gap: 5px; }
.pj-group label { font-size: 12.5px; font-weight: 600; color: #374151; }
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
.pj-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px; }
.pj-btn-sec { padding: 8px 14px; border: 1px solid #d1d5db; background: #fff; border-radius: 6px; font-size: 13px; cursor: pointer; }
.pj-btn-pri { padding: 8px 16px; border: none; background: #1a6ef7; color: #fff; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
.pj-btn-pri:disabled { opacity: .55; cursor: not-allowed; }
@media (max-width: 768px) { .pj-tbl { min-width: 0; } .pj-row { grid-template-columns: 1fr; } }
</style>