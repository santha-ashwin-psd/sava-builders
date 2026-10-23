<template>
<div class="list-page">

  <!-- Toolbar -->
  <div class="sales-toolbar">
    <div class="sales-search">
      <span v-html="icon('search',13)" style="color:#9ca3af;flex-shrink:0"></span>
      <input v-model="search" placeholder="Search employees..." class="sales-search-input"/>
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
      <button class="sales-btn-primary" :disabled="!$canCreate('admin')" :title="!$canCreate('admin') ? 'Read-only access' : ''" @click="openNew"><span v-html="icon('plus',13)"></span> New Employee</button>
    </div>
  </div>

  <!-- Table -->
  <div class="inv-table-wrap">
    <table class="inv-table em-tbl">
      <thead><tr>
        <th class="sortable" @click="sortBy('name')">ID <span v-html="sortArrow('name')"></span></th>
        <th class="sortable" @click="sortBy('employee_name')">Name <span v-html="sortArrow('employee_name')"></span></th>
        <th class="sortable" @click="sortBy('designation')">Designation <span v-html="sortArrow('designation')"></span></th>
        <th class="sortable" @click="sortBy('department')">Department <span v-html="sortArrow('department')"></span></th>
        <th class="sortable" @click="sortBy('project')">Project <span v-html="sortArrow('project')"></span></th>
        <th class="sortable" @click="sortBy('user')">Login User <span v-html="sortArrow('user')"></span></th>
        <th class="sortable" @click="sortBy('status')">Status <span v-html="sortArrow('status')"></span></th>
        <th style="width:90px;text-align:center">Actions</th>
      </tr></thead>
      <tbody>
        <template v-if="loading"><tr v-for="n in 5" :key="n"><td colspan="8"><div class="shimmer"></div></td></tr></template>
        <tr v-else-if="!sorted.length"><td colspan="8" class="bk-empty-state"><div class="bk-empty-inner">
          <template v-if="search || filterTab!=='all'">
            <p class="bk-empty-title">No employees match your filters</p>
          </template>
          <template v-else>
            <p class="bk-empty-title">No employees yet</p>
            <p class="bk-empty-sub">Add your first employee to get started.</p>
            <button class="bk-empty-btn" :disabled="!$canCreate('admin')" @click="openNew"><span v-html="icon('plus',13)"></span> New Employee</button>
          </template>
        </div></td></tr>
        <tr v-else v-for="row in paged" :key="row.name" class="inv-row">
          <td @click="openEdit(row)" data-label="ID"><span class="inv-link">{{ row.name }}</span></td>
          <td @click="openEdit(row)" data-label="Name">{{ row.employee_name }}</td>
          <td @click="openEdit(row)" data-label="Designation">{{ row.designation || '—' }}</td>
          <td @click="openEdit(row)" data-label="Department">{{ row.department || '—' }}</td>
          <td @click="openEdit(row)" data-label="Project">{{ projectLabel(row.project) }}</td>
          <td @click="openEdit(row)" data-label="Login User">{{ row.user ? (members[row.user] || row.user) : '—' }}</td>
          <td @click="openEdit(row)" data-label="Status"><span class="inv-status-badge" :class="row.status === 'Inactive' ? 'status-draft' : 'status-active'">{{ row.status || 'Active' }}</span></td>
          <td style="text-align:center;white-space:nowrap" @click.stop>
            <button class="inv-act-btn" @click="openEdit(row)" :disabled="!$canEdit('admin')" title="Edit"><span v-html="icon('edit',13)"></span></button>
            <button class="inv-act-btn vt-act-del" @click="removeRow(row)" :disabled="!$canDelete('admin')" :title="!$canDelete('admin') ? 'Not permitted' : 'Delete'"><span v-html="icon('trash',13)"></span></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="!loading && sorted.length" style="padding:12px 4px 4px">
    <Pagination v-model:page="page" v-model:page-size="pageSize" :total-items="sorted.length" />
  </div>

  <!-- New / Edit form -->
  <div v-if="showForm" class="em-overlay" @click.self="closeForm">
    <div class="em-card">
      <div class="em-head">
        <h3 class="em-title">{{ isEdit ? 'Edit Employee' : 'New Employee' }}</h3>
        <button class="em-close" @click="closeForm">×</button>
      </div>
      <form class="em-body" @submit.prevent="save">
        <div class="em-group">
          <label>Employee Name <span class="nim-req">*</span></label>
          <input v-model="form.employee_name" required maxlength="140" />
        </div>
        <div class="em-row">
          <div class="em-group">
            <label>Designation</label>
            <input v-model="form.designation" maxlength="140" placeholder="e.g. Store Keeper" />
          </div>
          <div class="em-group">
            <label>Department</label>
            <input v-model="form.department" maxlength="140" placeholder="e.g. Stores" />
          </div>
        </div>
        <div class="em-group">
          <label>Project</label>
          <select v-model="form.project">
            <option value="">— None —</option>
            <option v-for="p in projectOptions" :key="p.value" :value="p.value">{{ p.label }}</option>
          </select>
          <div class="em-hint">Only open projects can be chosen. Leave blank for head-office staff.</div>
        </div>
        <div class="em-group">
          <label>Login User</label>
          <select v-model="form.user">
            <option value="">— No login —</option>
            <option v-for="m in memberOptions" :key="m.value" :value="m.value" :disabled="m.value !== form.user && taken.has(m.value)">
              {{ m.label }}{{ m.value !== form.user && taken.has(m.value) ? ' (already linked)' : '' }}
            </option>
          </select>
          <div class="em-hint">The system user this person logs in as. One employee per user.</div>
        </div>
        <div class="em-group">
          <label>Status</label>
          <select v-model="form.status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div class="em-actions">
          <button type="button" class="em-btn-sec" @click="closeForm">Cancel</button>
          <button type="submit" class="em-btn-pri" :disabled="saving || !(isEdit ? $canEdit('admin') : $canCreate('admin'))">{{ saving ? 'Saving…' : 'Save' }}</button>
        </div>
      </form>
    </div>
  </div>

</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useToast } from "../composables/useToast.js";
import { apiList, apiSave, apiDelete, apiGET, resolveCompany } from "../api/client.js";
import { useConfirm } from "../composables/useConfirm.js";
import { useProjectOptions } from "../composables/useProjectOptions.js";
import { icon } from "../utils/icons.js";
import Pagination from "../components/Pagination.vue";

const { toast } = useToast();
const { confirm } = useConfirm();
const { projects: projectOptions, fetchProjects } = useProjectOptions();

const list = ref([]);
const loading = ref(false);
const search = ref("");
const filterTab = ref("all");
const page = ref(1);
const pageSize = ref(25);
const sortKey = ref("employee_name");
const sortDir = ref(1);
const showForm = ref(false);
const isEdit = ref(false);
const saving = ref(false);
const form = ref(blankForm());
const members = ref({});
const projectNames = ref({});

const memberOptions = computed(() => Object.entries(members.value)
  .map(([value, label]) => ({ value, label: label || value }))
  .sort((a, b) => a.label.localeCompare(b.label)));
// Users already linked to an employee (the server also enforces one employee per user).
const taken = computed(() => new Set(list.value.map(r => r.user).filter(Boolean)));

const tabs = [
  { key: "all", label: "All" },
  { key: "Active", label: "Active" },
  { key: "Inactive", label: "Inactive" },
];

function blankForm() {
  return { employee_name: "", designation: "", department: "", project: "", user: "", status: "Active" };
}

const counts = computed(() => {
  const c = { Active: 0, Inactive: 0 };
  for (const r of list.value) c[r.status === "Inactive" ? "Inactive" : "Active"]++;
  return c;
});

function projectLabel(name) {
  if (!name) return "—";
  return projectNames.value[name] || name;
}

const filtered = computed(() => {
  let rows = list.value;
  if (filterTab.value !== "all") rows = rows.filter(r => (r.status || "Active") === filterTab.value);
  const s = search.value.trim().toLowerCase();
  if (s) rows = rows.filter(r =>
    (r.name || "").toLowerCase().includes(s) ||
    (r.employee_name || "").toLowerCase().includes(s) ||
    (r.designation || "").toLowerCase().includes(s) ||
    (r.department || "").toLowerCase().includes(s) ||
    projectLabel(r.project).toLowerCase().includes(s) ||
    (r.user || "").toLowerCase().includes(s));
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
    list.value = await apiList("Employee", {
      fields: ["name", "employee_name", "designation", "department", "project", "user", "status", "company"],
      filters: company ? [["company", "=", company]] : [],
      order: "employee_name asc",
      limit: 1000,
    }) || [];
  } catch (e) {
    toast.error("Failed to load employees: " + e.message);
    list.value = [];
  } finally {
    loading.value = false;
  }
}

// Every project (open or closed) so the list can show "CODE — name" for any employee.
async function loadProjectNames() {
  try {
    const company = await resolveCompany();
    const rows = await apiList("Project", {
      fields: ["name", "project_code", "project_name"],
      filters: company ? [["company", "=", company]] : [],
      limit: 500,
    }) || [];
    const map = {};
    for (const r of rows) map[r.name] = `${r.project_code || r.name} — ${r.project_name || ""}`.trim();
    projectNames.value = map;
  } catch (e) {
    projectNames.value = {};
  }
}

async function loadMembers() {
  try {
    members.value = (await apiGET("psd_books.api.admin.get_company_user_names")) || {};
  } catch (e) {
    members.value = {};
  }
}

async function openNew() {
  isEdit.value = false;
  form.value = blankForm();
  await fetchProjects("", "");
  showForm.value = true;
}
async function openEdit(row) {
  isEdit.value = true;
  form.value = {
    ...blankForm(), ...row,
    designation: row.designation || "", department: row.department || "",
    project: row.project || "", user: row.user || "", status: row.status || "Active",
  };
  await fetchProjects("", row.project || "");
  showForm.value = true;
}
function closeForm() { showForm.value = false; }

async function save() {
  const f = form.value;
  saving.value = true;
  try {
    const doc = {
      doctype: "Employee",
      employee_name: (f.employee_name || "").trim(),
      designation: (f.designation || "").trim() || null,
      department: (f.department || "").trim() || null,
      project: f.project || null,
      user: f.user || null,
      status: f.status || "Active",
    };
    if (isEdit.value) {
      doc.name = f.name;
    } else {
      doc.company = await resolveCompany();
    }
    await apiSave(doc);
    toast.success(isEdit.value ? "Employee updated" : "Employee created");
    showForm.value = false;
    await load();
  } catch (e) {
    toast.error("Failed to save employee: " + e.message);
  } finally {
    saving.value = false;
  }
}

async function removeRow(row) {
  const ok = await confirm({
    title: "Delete employee?",
    body: `Delete ${row.employee_name} (${row.name})? This can't be undone. Mark the employee Inactive instead if they have left.`,
    okLabel: "Delete",
    okStyle: "danger",
  });
  if (!ok) return;
  try {
    await apiDelete("Employee", row.name);
    toast.success("Employee deleted");
    await load();
  } catch (e) {
    toast.error("Failed to delete employee: " + e.message);
  }
}

function exportCSV() {
  const headers = ["ID", "Name", "Designation", "Department", "Project", "Login User", "Status"];
  const rows = filtered.value.map(r => [r.name, r.employee_name, r.designation || "", r.department || "",
    r.project ? projectLabel(r.project) : "", r.user || "", r.status || "Active"]);
  const csv = [headers, ...rows].map(row => row.map(v => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url; a.download = "employees.csv"; a.click();
  URL.revokeObjectURL(url);
}

onMounted(() => { load(); loadProjectNames(); loadMembers(); });
</script>

<style scoped>
.em-tbl { min-width: 860px; }
.em-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.em-card { background: #fff; border-radius: 10px; width: 520px; max-width: 98%; max-height: 96vh; overflow-y: auto; }
.em-head { padding: 16px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
.em-title { font-size: 17px; font-weight: 700; margin: 0; }
.em-close { background: none; border: none; font-size: 24px; cursor: pointer; color: #6b7280; }
.em-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.em-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.em-group { display: flex; flex-direction: column; gap: 5px; }
.em-group label { font-size: 12.5px; font-weight: 600; color: #374151; }
.em-group input, .em-group select { width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; outline: none; box-sizing: border-box; background: #fff; }
.em-group input:focus, .em-group select:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,.08); }
.em-hint { font-size: 12px; color: #6b7280; margin-top: 2px; }
.em-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px; }
.em-btn-sec { padding: 8px 14px; border: 1px solid #d1d5db; background: #fff; border-radius: 6px; font-size: 13px; cursor: pointer; }
.em-btn-pri { padding: 8px 16px; border: none; background: #1a6ef7; color: #fff; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
.em-btn-pri:disabled { opacity: .55; cursor: not-allowed; }
@media (max-width: 768px) { .em-tbl { min-width: 0; } .em-row { grid-template-columns: 1fr; } }
</style>