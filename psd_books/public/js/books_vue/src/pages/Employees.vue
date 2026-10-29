<template>
<div class="list-page em-page">

  <!-- Toolbar -->
  <div class="em-toolbar">
    <label class="em-search">
      <span v-html="icon('search',16)" class="em-search-ico"></span>
      <input v-model="search" placeholder="Search employees..." class="em-search-input" aria-label="Search employees"/>
    </label>

    <div class="em-tabs" role="tablist">
      <button v-for="t in tabs" :key="t.key" type="button" role="tab" class="em-tab"
        :class="{ active: filterTab === t.key }" :aria-selected="filterTab === t.key" @click="filterTab = t.key">
        {{ t.label }}
        <span v-if="t.key !== 'all'" class="em-tab-count">{{ counts[t.key] || 0 }}</span>
      </button>
    </div>

    <div class="em-actions">
      <button type="button" class="em-btn em-btn-icon" @click="load" title="Refresh" aria-label="Refresh" :disabled="loading">
        <span v-html="icon('refresh',16)"></span>
      </button>
      <button type="button" class="em-btn em-btn-ghost" @click="exportCSV" :disabled="!filtered.length">
        <span v-html="icon('download',16)"></span> Export CSV
      </button>
      <button type="button" class="em-btn em-btn-primary" :disabled="!$canCreate('admin')"
        :title="!$canCreate('admin') ? 'Read-only access' : ''" @click="openNew">
        <span v-html="icon('plus',16)"></span> New Employee
      </button>
    </div>
  </div>

  <!-- Table card -->
  <div class="em-card-table">
    <div class="em-scroll">
      <table class="em-tbl">
        <thead><tr>
          <th class="sortable" @click="sortBy('name')">ID <span class="em-sort" v-html="sortArrow('name')"></span></th>
          <th class="sortable" @click="sortBy('employee_name')">Name <span class="em-sort" v-html="sortArrow('employee_name')"></span></th>
          <th class="sortable" @click="sortBy('designation')">Designation <span class="em-sort" v-html="sortArrow('designation')"></span></th>
          <th class="sortable" @click="sortBy('department')">Department <span class="em-sort" v-html="sortArrow('department')"></span></th>
          <!-- Project column hidden -->
          <th class="sortable" @click="sortBy('user')">Login User <span class="em-sort" v-html="sortArrow('user')"></span></th>
          <th class="sortable" @click="sortBy('status')">Status <span class="em-sort" v-html="sortArrow('status')"></span></th>
          <th class="em-th-actions">Actions</th>
        </tr></thead>
        <tbody>
          <template v-if="loading">
            <tr v-for="n in 5" :key="n" class="em-skel"><td colspan="7"><div class="shimmer"></div></td></tr>
          </template>
          <tr v-else-if="!sorted.length"><td colspan="7" class="em-empty">
            <template v-if="search || filterTab !== 'all'">
              <p class="em-empty-title">No employees match your filters</p>
              <p class="em-empty-sub">Try a different search or switch the status filter.</p>
            </template>
            <template v-else>
              <p class="em-empty-title">No employees yet</p>
              <p class="em-empty-sub">Add your first employee to get started.</p>
              <button type="button" class="em-btn em-btn-primary" :disabled="!$canCreate('admin')" @click="openNew">
                <span v-html="icon('plus',16)"></span> New Employee
              </button>
            </template>
          </td></tr>
          <tr v-else v-for="row in paged" :key="row.name" class="em-row">
            <td @click="openEdit(row)" data-label="ID"><span class="em-id">{{ row.name }}</span></td>
            <td @click="openEdit(row)" data-label="Name" class="em-name">{{ row.employee_name }}</td>
            <td @click="openEdit(row)" data-label="Designation">{{ row.designation || '—' }}</td>
            <td @click="openEdit(row)" data-label="Department">{{ row.department || '—' }}</td>
            <td @click="openEdit(row)" data-label="Login User">{{ row.user ? (members[row.user] || row.user) : '—' }}</td>
            <td @click="openEdit(row)" data-label="Status">
              <span class="em-status" :class="row.status === 'Inactive' ? 'is-inactive' : 'is-active'">{{ row.status || 'Active' }}</span>
            </td>
            <td class="em-td-actions" @click.stop>
              <button type="button" class="em-act" @click="openEdit(row)" :disabled="!$canEdit('admin')" title="Edit" aria-label="Edit employee"><span v-html="icon('edit',16)"></span></button>
              <button type="button" class="em-act em-act-del" @click="removeRow(row)" :disabled="!$canDelete('admin')" :title="!$canDelete('admin') ? 'Not permitted' : 'Delete'" aria-label="Delete employee"><span v-html="icon('trash',16)"></span></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!loading && sorted.length" class="em-foot">
      <Pagination v-model:page="page" v-model:page-size="pageSize" :total-items="sorted.length" />
    </div>
  </div>

  <!-- New / Edit form -->
  <div v-if="showForm" class="em-overlay" @click.self="closeForm">
    <div class="em-card" role="dialog" aria-modal="true" aria-labelledby="em-dlg-title">
      <div class="em-head">
        <span class="em-head-ico" v-html="icon('user',22)"></span>
        <div class="em-head-text">
          <h3 id="em-dlg-title" class="em-title">{{ isEdit ? 'Edit Employee' : 'New Employee' }}</h3>
          <p class="em-subtitle">{{ isEdit ? 'Update the employee details' : 'Add a new employee to your company' }}</p>
        </div>
        <button type="button" class="em-close" @click="closeForm" aria-label="Close"><span v-html="icon('x',20)"></span></button>
      </div>

      <form class="em-body" @submit.prevent="save">
        <div class="em-group">
          <label for="em-f-name">Employee Name <span class="em-req">*</span></label>
          <div class="em-field">
            <span class="em-field-ico" v-html="icon('user',16)"></span>
            <input id="em-f-name" v-model="form.employee_name" required maxlength="140" placeholder="Full name" />
          </div>
        </div>

        <div class="em-row-2">
          <div class="em-group">
            <label for="em-f-desig">Designation</label>
            <div class="em-field">
              <span class="em-field-ico"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span>
              <input id="em-f-desig" v-model="form.designation" maxlength="140" placeholder="e.g. Store Keeper" />
            </div>
          </div>
          <div class="em-group">
            <label for="em-f-dept">Department</label>
            <div class="em-field">
              <span class="em-field-ico" v-html="icon('building',16)"></span>
              <input id="em-f-dept" v-model="form.department" maxlength="140" placeholder="e.g. Stores" />
            </div>
          </div>
        </div>

        <!-- Project field hidden in the dialog; form.project is still sent so an existing value isn't cleared -->
        <div class="em-group" v-if="false">
          <label for="em-f-project">Project</label>
          <div class="em-field em-field-select" :class="{ open: ddOpen === 'project' }">
            <span class="em-field-ico" v-html="icon('box',16)"></span>
            <button id="em-f-project" type="button" class="em-trigger" :class="{ 'is-placeholder': !form.project }"
              aria-haspopup="listbox" :aria-expanded="ddOpen === 'project'"
              @click="openDD('project', $event)" @keydown="ddKey('project', $event)">{{ labelFor('project') }}</button>
          </div>
          <div class="em-hint"><span v-html="icon('info',14)"></span> Only open projects can be chosen. Leave blank for head-office staff.</div>
        </div>

        <div class="em-group">
          <label for="em-f-user">Login User</label>
          <div class="em-field em-field-select" :class="{ open: ddOpen === 'user' }">
            <span class="em-field-ico" v-html="icon('user',16)"></span>
            <button id="em-f-user" type="button" class="em-trigger" :class="{ 'is-placeholder': !form.user }"
              aria-haspopup="listbox" :aria-expanded="ddOpen === 'user'"
              @click="openDD('user', $event)" @keydown="ddKey('user', $event)">{{ labelFor('user') }}</button>
          </div>
          <div class="em-hint">The system user this person logs in as. One employee per user.</div>
        </div>

        <div class="em-group">
          <label for="em-f-status">Status</label>
          <div class="em-field em-field-select" :class="{ open: ddOpen === 'status' }">
            <span class="em-dot" :class="form.status === 'Inactive' ? 'is-inactive' : 'is-active'"></span>
            <button id="em-f-status" type="button" class="em-trigger"
              aria-haspopup="listbox" :aria-expanded="ddOpen === 'status'"
              @click="openDD('status', $event)" @keydown="ddKey('status', $event)">{{ labelFor('status') }}</button>
          </div>
        </div>

        <div class="em-form-actions">
          <button type="button" class="em-btn em-btn-ghost" @click="closeForm">Cancel</button>
          <button type="submit" class="em-btn em-btn-primary" :disabled="saving || !(isEdit ? $canEdit('admin') : $canCreate('admin'))">
            <span v-html="icon('save',16)"></span> {{ saving ? 'Saving…' : 'Save' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Dropdown list (fixed so the modal never clips it) -->
    <ul v-if="ddOpen" class="em-dd" :style="ddStyle" role="listbox" @mousedown.prevent>
      <li v-for="(o, i) in ddOptions" :key="o.value" role="option" class="em-dd-opt"
        :class="{ selected: String(o.value) === String(form[ddOpen] ?? ''), active: i === ddIndex, disabled: o.disabled }"
        :aria-selected="String(o.value) === String(form[ddOpen] ?? '')" :aria-disabled="!!o.disabled"
        @mouseenter="ddIndex = i" @click="pickDD(o)">
        <span v-if="o.dot" class="em-dot" :class="o.dot"></span>
        <span class="em-dd-label">{{ o.label }}</span>
        <span v-if="String(o.value) === String(form[ddOpen] ?? '')" class="em-dd-check" v-html="icon('check',16)"></span>
      </li>
    </ul>
  </div>

</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
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
function closeForm() { ddOpen.value = null; showForm.value = false; }

// ── Styled dropdowns (Project / Login User / Status) ──
const ddOpen = ref(null);      // "project" | "user" | "status" | null
const ddStyle = ref({});
const ddIndex = ref(-1);

const ddOptions = computed(() => {
  const k = ddOpen.value;
  if (k === "project") return [{ value: "", label: "— Select —" }, ...projectOptions.value.map(p => ({ value: p.value, label: p.label }))];
  if (k === "user") return [{ value: "", label: "— No login —" }, ...memberOptions.value.map(m => {
    const linked = m.value !== form.value.user && taken.value.has(m.value);
    return { value: m.value, label: m.label + (linked ? " (already linked)" : ""), disabled: linked };
  })];
  if (k === "status") return [{ value: "Active", label: "Active", dot: "is-active" }, { value: "Inactive", label: "Inactive", dot: "is-inactive" }];
  return [];
});

function labelFor(key) {
  const v = form.value[key];
  if (key === "status") return v || "Active";
  if (key === "project") return v ? (projectOptions.value.find(p => p.value === v)?.label || projectLabel(v)) : "— Select —";
  if (key === "user") return v ? (members.value[v] || v) : "— No login —";
  return v || "";
}

function openDD(key, ev) {
  if (ddOpen.value === key) { ddOpen.value = null; return; }
  const field = ev.currentTarget.closest(".em-field");
  const r = field.getBoundingClientRect();
  const maxH = 260;
  const below = window.innerHeight - r.bottom - 12;
  const up = below < Math.min(maxH, 180) && r.top > below;
  ddStyle.value = {
    left: r.left + "px", width: r.width + "px", maxHeight: Math.max(120, Math.min(maxH, up ? r.top - 12 : below)) + "px",
    ...(up ? { bottom: (window.innerHeight - r.top + 6) + "px" } : { top: (r.bottom + 6) + "px" }),
  };
  ddOpen.value = key;
  const cur = ddOptions.value.findIndex(o => String(o.value) === String(form.value[key] ?? ""));
  ddIndex.value = cur >= 0 ? cur : 0;
}
function pickDD(o) {
  if (o.disabled) return;
  form.value[ddOpen.value] = o.value;
  ddOpen.value = null;
}
function ddKey(key, e) {
  if (ddOpen.value !== key) {
    if (["ArrowDown", "ArrowUp"].includes(e.key)) { e.preventDefault(); openDD(key, e); }
    return;
  }
  const n = ddOptions.value.length;
  if (e.key === "ArrowDown") { e.preventDefault(); ddIndex.value = (ddIndex.value + 1) % n; }
  else if (e.key === "ArrowUp") { e.preventDefault(); ddIndex.value = (ddIndex.value - 1 + n) % n; }
  else if (e.key === "Enter") { e.preventDefault(); const o = ddOptions.value[ddIndex.value]; if (o) pickDD(o); }
  else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); ddOpen.value = null; }
  else if (e.key === "Tab") ddOpen.value = null;
}
function onDocPointer(e) {
  if (ddOpen.value && !e.target.closest(".em-dd") && !e.target.closest(".em-field-select")) ddOpen.value = null;
}
function onAnyScroll(e) { if (ddOpen.value && !(e.target.closest && e.target.closest(".em-dd"))) ddOpen.value = null; }

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

onMounted(() => {
  load(); loadProjectNames(); loadMembers();
  document.addEventListener("mousedown", onDocPointer);
  window.addEventListener("scroll", onAnyScroll, true);
  window.addEventListener("resize", () => { ddOpen.value = null; });
});
onUnmounted(() => {
  document.removeEventListener("mousedown", onDocPointer);
  window.removeEventListener("scroll", onAnyScroll, true);
});
</script>

<style scoped>
.em-page {
  --em-blue: #1a6ef7;
  --em-blue-dark: #1558d6;
  --em-ink: #0f172a;
  --em-text: #334155;
  --em-muted: #64748b;
  --em-line: #e8edf3;
  --em-card: #fff;
  display: flex; flex-direction: column; gap: 20px;
  color: var(--em-text);
}

/* ── Toolbar card ── */
.em-toolbar {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  background: var(--em-card); border: 1px solid var(--em-line); border-radius: 16px;
  padding: 14px 16px;
  box-shadow: 0 1px 2px rgba(15,23,42,.03);
}
.em-search {
  display: flex; align-items: center; gap: 10px;
  flex: 1 1 200px; min-width: 180px; max-width: 340px; height: 38px; padding: 0 14px;
  border: 1px solid var(--em-line); border-radius: 999px; background: #fff;
  color: #94a3b8; transition: border-color .15s, box-shadow .15s;
}
.em-search:focus-within { border-color: var(--em-blue); box-shadow: 0 0 0 3px rgba(26,110,247,.12); }
.em-search-ico { display: inline-flex; flex-shrink: 0; }
.em-search-input {
  border: none; outline: none; background: transparent; width: 100%; min-width: 0;
  font: inherit; font-size: 13.5px; color: var(--em-ink);
}
.em-search-input::placeholder { color: #94a3b8; }

.em-tabs { display: flex; gap: 8px; flex: 0 0 auto; }
.em-tab {
  display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 16px;
  border: 1px solid var(--em-line); border-radius: 999px; background: #fff;
  font: inherit; font-size: 13.5px; font-weight: 500; color: var(--em-text); cursor: pointer; white-space: nowrap;
  transition: background .15s, border-color .15s, color .15s;
}
.em-tab:hover { border-color: #cbd5e1; }
.em-tab.active { background: var(--em-blue); border-color: var(--em-blue); color: #fff; font-weight: 600; }
.em-tab-count {
  min-width: 24px; height: 24px; padding: 0 6px; display: inline-flex; align-items: center; justify-content: center;
  border-radius: 999px; background: #eef2f6; color: var(--em-text); font-size: 12.5px; font-weight: 600;
}
.em-tab.active .em-tab-count { background: rgba(255,255,255,.22); color: #fff; }

.em-actions { display: flex; align-items: center; gap: 8px; margin-left: auto; flex: 0 0 auto; flex-wrap: nowrap; }
.em-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  height: 38px; padding: 0 14px; border-radius: 10px; border: 1px solid var(--em-line);
  background: #fff; color: var(--em-ink); font: inherit; font-size: 13.5px; font-weight: 500;
  cursor: pointer; white-space: nowrap; transition: background .15s, border-color .15s, color .15s;
}
.em-btn > span { display: inline-flex; }
.em-btn:hover:not(:disabled) { background: #f8fafc; border-color: #cbd5e1; }
.em-btn:disabled { opacity: .5; cursor: not-allowed; }
.em-btn-icon { width: 38px; padding: 0; }
.em-btn-primary { background: var(--em-blue); border-color: var(--em-blue); color: #fff; font-weight: 600; }
.em-btn-primary:hover:not(:disabled) { background: var(--em-blue-dark); border-color: var(--em-blue-dark); }
.em-btn:focus-visible, .em-tab:focus-visible, .em-act:focus-visible { outline: 2px solid var(--em-blue); outline-offset: 2px; }

/* ── Table card ── */
.em-card-table {
  background: var(--em-card); border: 1px solid var(--em-line); border-radius: 16px;
  box-shadow: 0 1px 2px rgba(15,23,42,.03); overflow: hidden;
}
.em-scroll { overflow-x: auto; }
.em-tbl { width: 100%; min-width: 900px; border-collapse: collapse; font-size: 14px; }
.em-tbl thead th {
  padding: 16px 14px; text-align: left; font-size: 13.5px; font-weight: 500; color: var(--em-muted);
  background: #fff; border-bottom: 1px solid var(--em-line); white-space: nowrap; user-select: none;
}
.em-tbl thead th.sortable { cursor: pointer; }
.em-tbl thead th.sortable:hover { color: var(--em-text); }
.em-th-actions { text-align: center !important; }
.em-sort { display: inline-block; margin-left: 4px; font-size: 11px; color: var(--em-text); }
.em-tbl tbody td { padding: 0 14px; height: 68px; white-space: nowrap; border-bottom: 1px solid var(--em-line); color: var(--em-ink); vertical-align: middle; }
.em-tbl tbody tr:last-child td { border-bottom: none; }
.em-row { cursor: pointer; transition: background .12s; }
.em-row:hover { background: #f8fafc; }
.em-id { color: var(--em-blue); font-weight: 600; }
.em-name { font-weight: 500; }

.em-status {
  display: inline-flex; align-items: center; height: 28px; padding: 0 14px;
  border-radius: 999px; font-size: 13px; font-weight: 600;
}
.em-status.is-active { background: #dcfce7; color: #15803d; }
.em-status.is-inactive { background: #f1f5f9; color: #64748b; }

.em-td-actions { text-align: center; white-space: nowrap; }
.em-act {
  width: 34px; height: 34px; margin: 0 2px; display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid var(--em-line); border-radius: 10px; background: #fff; color: var(--em-text); cursor: pointer;
  transition: background .15s, border-color .15s, color .15s;
}
.em-act > span { display: inline-flex; }
.em-act:hover:not(:disabled) { background: #f1f5f9; border-color: #cbd5e1; color: var(--em-ink); }
.em-act-del:hover:not(:disabled) { background: #fef2f2; border-color: #fecaca; color: #dc2626; }
.em-act:disabled { opacity: .4; cursor: not-allowed; }

.em-skel td { height: auto !important; padding: 14px 20px !important; }
.em-empty { text-align: center; padding: 56px 20px !important; height: auto !important; }
.em-empty-title { margin: 0 0 4px; font-size: 15px; font-weight: 600; color: var(--em-ink); }
.em-empty-sub { margin: 0 0 16px; font-size: 13.5px; color: var(--em-muted); }

/* ── Footer (shared Pagination restyled to sit inside the card) ── */
.em-foot { border-top: 1px solid var(--em-line); padding: 14px 16px; }
.em-foot :deep(.pg-wrap) { padding: 0; border: none; border-radius: 0; background: transparent; font-family: inherit; }
.em-foot :deep(.pg-label), .em-foot :deep(.pg-summary) { font-size: 13.5px; color: var(--em-muted); }
.em-foot :deep(.pg-left) { gap: 12px; }
.em-foot :deep(.pg-select) {
  height: 36px; min-width: 68px; padding: 0 30px 0 12px; font-size: 13.5px; color: var(--em-ink);
  border: 1px solid var(--em-line); border-radius: 10px;
}
.em-foot :deep(.pg-select:focus) { border-color: var(--em-blue); box-shadow: 0 0 0 3px rgba(26,110,247,.12); }
.em-foot :deep(.pg-chevron) { right: 13px; width: 12px; height: 8px; }
.em-foot :deep(.pg-right) { gap: 16px; }
.em-foot :deep(.pg-nav) { gap: 6px; }
.em-foot :deep(.pg-btn) { min-width: 36px; height: 36px; border: 1px solid var(--em-line); border-radius: 10px; font-size: 13.5px; }
.em-foot :deep(.pg-icon-btn svg) { width: 16px; height: 16px; }
.em-foot :deep(.pg-btn.pg-page.active) { background: var(--em-blue); border-color: var(--em-blue); color: #fff; }

/* ── Modal form ── */
.em-overlay { position: fixed; inset: 0; background: rgba(15,23,42,.45); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.em-card { background: #fff; border-radius: 16px; width: 560px; max-width: 100%; max-height: 96vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 24px 60px rgba(15,23,42,.28); }
.em-head { display: flex; align-items: center; gap: 14px; padding: 22px 26px; background: #f3f7fd; border-bottom: 1px solid var(--em-line); }
.em-head-ico { width: 50px; height: 50px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; background: #e3edfd; color: var(--em-blue); }
.em-head-text { flex: 1; min-width: 0; }
.em-title { font-size: 19px; font-weight: 700; margin: 0; color: var(--em-ink); }
.em-subtitle { margin: 2px 0 0; font-size: 13px; color: var(--em-muted); }
.em-close { width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center; background: none; border: none; border-radius: 8px; cursor: pointer; color: var(--em-text); }
.em-close:hover { background: rgba(15,23,42,.06); }
.em-close:focus-visible { outline: 2px solid var(--em-blue); outline-offset: 2px; }

.em-body { padding: 22px 26px 24px; display: flex; flex-direction: column; gap: 18px; overflow-y: auto; }
.em-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.em-group { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.em-group label { font-size: 13.5px; font-weight: 600; color: #475a7a; }
.em-req { color: #dc2626; }

.em-field {
  position: relative; display: flex; align-items: center; gap: 12px; height: 46px; padding: 0 14px;
  border: 1px solid var(--em-line); border-radius: 10px; background: #fff; box-shadow: 0 1px 2px rgba(15,23,42,.03);
  transition: border-color .15s, box-shadow .15s;
}
.em-field:focus-within { border-color: var(--em-blue); box-shadow: 0 0 0 3px rgba(26,110,247,.12); }
.em-field-ico { display: inline-flex; flex-shrink: 0; color: #7b8aa3; }
.em-field input, .em-field select {
  flex: 1; min-width: 0; height: 100%; border: none; outline: none; background: transparent;
  font: inherit; font-size: 14px; color: var(--em-ink);
}
.em-field input::placeholder { color: #a0aabc; }
.em-trigger {
  flex: 1; min-width: 0; height: 100%; padding: 0 24px 0 0; border: none; outline: none; background: transparent;
  font: inherit; font-size: 14px; color: var(--em-ink); text-align: left; cursor: pointer;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.em-trigger.is-placeholder { color: #64748b; }
.em-field-select::after {
  content: ""; position: absolute; right: 16px; top: 50%; width: 7px; height: 7px; margin-top: -6px;
  border-right: 2px solid var(--em-ink); border-bottom: 2px solid var(--em-ink); transform: rotate(45deg); pointer-events: none;
  transition: transform .15s, margin-top .15s;
}
.em-field-select.open { border-color: var(--em-blue); box-shadow: 0 0 0 3px rgba(26,110,247,.12); }
.em-field-select.open::after { transform: rotate(-135deg); margin-top: -2px; }

/* Dropdown list */
.em-dd {
  position: fixed; z-index: 1100; margin: 0; padding: 6px; list-style: none; overflow-y: auto;
  background: #fff; border: 1px solid var(--em-line); border-radius: 12px;
  box-shadow: 0 12px 32px rgba(15,23,42,.16), 0 2px 6px rgba(15,23,42,.06);
}
.em-dd-opt {
  display: flex; align-items: center; gap: 10px; min-height: 40px; padding: 0 12px; border-radius: 8px;
  font-size: 14px; color: var(--em-ink); cursor: pointer;
}
.em-dd-opt.active { background: #f1f5f9; }
.em-dd-opt.selected { color: var(--em-blue); font-weight: 600; background: #eff5ff; }
.em-dd-opt.disabled { color: #94a3b8; cursor: not-allowed; }
.em-dd-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.em-dd-check { display: inline-flex; color: var(--em-blue); }
.em-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin: 0 3px; }
.em-dot.is-active { background: #10b981; }
.em-dot.is-inactive { background: #94a3b8; }
.em-hint { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: var(--em-muted); }
.em-hint > span { display: inline-flex; color: #7b8aa3; }

.em-form-actions { display: flex; justify-content: flex-end; gap: 12px; margin: 6px -26px -24px; padding: 18px 26px; border-top: 1px solid var(--em-line); }
.em-form-actions .em-btn { height: 44px; padding: 0 22px; font-size: 14px; }

/* ── Responsive ── */
@media (max-width: 960px) {
  .em-search { flex: 1 1 100%; max-width: none; }
  .em-tabs { flex: 1 1 100%; order: 3; overflow-x: auto; scrollbar-width: none; }
  .em-actions { margin-left: 0; width: 100%; }
  .em-actions .em-btn-primary { flex: 1; }
}
@media (max-width: 768px) {
  .em-toolbar { padding: 14px; }
  .em-row-2 { grid-template-columns: 1fr; }
  .em-head, .em-body { padding-left: 18px; padding-right: 18px; }
  .em-form-actions { margin-left: -18px; margin-right: -18px; padding-left: 18px; padding-right: 18px; }
  .em-tbl { min-width: 0; }
  .em-tbl thead { display: none; }
  .em-tbl, .em-tbl tbody, .em-tbl tr, .em-tbl td { display: block; width: 100%; }
  .em-row { padding: 12px 16px; border-bottom: 1px solid var(--em-line); }
  .em-tbl tbody td { height: auto; border: none; padding: 5px 0; white-space: normal; display: flex; justify-content: space-between; gap: 12px; text-align: right; }
  .em-tbl tbody td::before { content: attr(data-label); color: var(--em-muted); font-size: 13px; text-align: left; flex-shrink: 0; }
  .em-td-actions { justify-content: flex-end !important; padding-top: 10px !important; }
  .em-td-actions::before { display: none; }
  .em-foot { padding: 14px; }
}
</style>