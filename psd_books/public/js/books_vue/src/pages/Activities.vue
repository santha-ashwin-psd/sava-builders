<template>
<div class="list-page">
  <div class="sales-toolbar">
    <div class="sales-search">
      <span v-html="icon('search',13)" style="color:#9ca3af;flex-shrink:0"></span>
      <input v-model="search" placeholder="Search activities…" class="sales-search-input" autocomplete="off"/>
    </div>
    <div class="sales-pills">
      <button v-for="f in FILTERS" :key="f.k" class="sales-pill" :class="{active: activeFilter===f.k}" @click="activeFilter=f.k">
        {{ f.l }}
        <span class="sales-pill-count" :class="activeFilter===f.k?'':'zb-pc-muted'">{{ counts[f.k] }}</span>
      </button>
    </div>
    <div class="cust-toolbar-right" style="margin-left:auto">
      <button class="sales-btn-ghost" @click="load" title="Refresh"><span v-html="icon('refresh',13)"></span> Refresh</button>
      <button class="sales-btn-primary" :disabled="!$canCreate('admin')" :title="!$canCreate('admin') ? 'Not permitted' : ''" @click="openAdd"><span v-html="icon('plus',13)"></span> New Activity</button>
    </div>
  </div>

  <div class="bk-kpi-grid bk-kpi-grid-4" style="margin-bottom:18px">
    <div v-for="kpi in kpiCards" :key="kpi.key" class="bk-kpi-card">
      <div class="bk-kpi-inner">
        <div class="bk-kpi-icon" :style="{ background: kpi.iconBg }"><span v-html="kpi.icon" :style="{ color: kpi.color }"></span></div>
        <div class="bk-kpi-body">
          <div class="bk-kpi-label">{{ kpi.label }}</div>
          <div class="bk-kpi-value" :class="kpi.valueClass">
            <template v-if="loading"><div class="b-shimmer" style="width:64px;height:22px;margin-top:2px;border-radius:4px"></div></template>
            <template v-else>{{ kpi.value }}</template>
          </div>
          <div class="bk-kpi-trend bk-trend-neutral">{{ kpi.sub }}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="inv-table-wrap">
    <table class="inv-table">
      <thead>
        <tr>
          <th class="vt-th">Code</th>
          <th class="vt-th">Activity</th>
          <th class="vt-th">Category</th>
          <th class="vt-th">Used on</th>
          <th class="vt-th">Status</th>
          <th class="vt-th vt-th-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="n in 6" :key="n" class="vt-row-shimmer"><td colspan="6"><div class="shimmer" style="height:12px;border-radius:3px;width:65%"></div></td></tr>
        </template>
        <tr v-else-if="!filtered.length">
          <td colspan="6" class="vt-empty">
            <div class="vt-empty-title">{{ search || activeFilter!=='all' ? 'No results found' : 'No activities yet' }}</div>
            <div class="vt-empty-sub">{{ search || activeFilter!=='all' ? 'Try adjusting your search or filter' : 'Add your first activity to get started' }}</div>
            <button v-if="!search && activeFilter==='all'" class="nim-btn nim-btn-primary" :disabled="!$canCreate('admin')" style="margin-top:14px" @click="openAdd"><span v-html="icon('plus',13)"></span> New Activity</button>
          </td>
        </tr>
        <tr v-else v-for="a in filtered" :key="a.name" class="inv-row" :class="a.disabled ? 'vt-row-disabled' : ''" @click="openEdit(a)">
          <td class="vt-td vt-td-mono">{{ a.name }}</td>
          <td class="vt-td"><div class="vt-vendor-name inv-customer">{{ a.activity_name || a.name }}</div></td>
          <td class="vt-td"><span class="vt-badge vt-badge-blue">{{ a.category || '—' }}</span></td>
          <td class="vt-td" :class="isUsed(a) ? '' : 'vt-td-secondary'">{{ usedOnText(a, usage) }}</td>
          <td class="vt-td">
            <span class="inv-status-badge" :class="a.disabled ? 'vt-badge-red' : 'vt-badge-green'">
              <span class="vt-badge-dot"></span>{{ a.disabled ? 'Inactive' : 'Active' }}
            </span>
          </td>
          <td class="vt-td vt-td-actions" @click.stop>
            <div class="vt-actions">
              <button class="inv-act-btn vt-act-edit" :disabled="!$canEdit('admin')" :title="!$canEdit('admin') ? 'Not permitted' : 'Edit'" @click="openEdit(a)"><span v-html="icon('edit',13)"></span></button>
              <button class="inv-act-btn" :disabled="!$canEdit('admin') || busyName===a.name" :title="a.disabled ? 'Activate' : 'Deactivate'" @click="toggleActive(a)" style="font-size:11.5px;font-weight:600;padding:0 8px;width:auto">{{ a.disabled ? 'Activate' : 'Deactivate' }}</button>
              <button class="inv-act-btn vt-act-del" :disabled="!$canDelete('admin') || isUsed(a)" :title="!$canDelete('admin') ? 'Not permitted' : (isUsed(a) ? 'Used on a contract. Deactivate instead.' : 'Delete')" @click="confirmDelete(a)"><span v-html="icon('trash',13)"></span></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="vt-footer" v-if="!loading && list.length">Showing <strong>{{ filtered.length }}</strong> of <strong>{{ list.length }}</strong> activities</div>
  </div>
  <p style="margin:10px 4px;font-size:12px;color:#6b7280">Only active activities appear when you create a contract. An activity can be used on one contract only, so create a new activity for each contract. An activity used on a contract can be deactivated but not deleted.</p>

  <!-- Add / Edit drawer -->
  <Teleport to="body">
    <div v-if="showDrawer" class="inv-drawer-bg" @click.self="showDrawer=false">
      <div class="inv-drawer-panel" :class="{open:showDrawer}" style="width:480px;max-width:98vw">
        <div class="inv-dh" style="background:linear-gradient(135deg,#0f766e,#115e59);padding:18px 24px">
          <div class="cust-drawer-header-left">
            <div class="cust-drawer-icon" style="color:#fff"><span v-html="icon('stack',16)"></span></div>
            <div>
              <div class="inv-dh-title">{{ drawerMode==='add' ? 'New Activity' : 'Edit Activity' }}</div>
              <div class="cust-drawer-sub">{{ drawerMode==='edit' ? form.name : 'A kind of work that can be contracted out' }}</div>
            </div>
          </div>
          <button class="inv-dclose" style="background:rgba(255,255,255,.15);border:none;cursor:pointer;color:#fff;width:30px;height:30px;border-radius:8px;display:grid;place-items:center" @click="showDrawer=false" v-html="icon('x',15)"></button>
        </div>

        <div class="inv-dbody" style="padding:24px;overflow-y:auto;flex:1">
          <div class="inv-sec-lbl" style="margin-top:0">Activity</div>
          <div class="inv-fg inv-fg2">
            <div class="inv-field">
              <label class="inv-lbl">Code <span class="nim-req">*</span></label>
              <input v-model="form.activity_code" class="inv-fi" :style="errStyle('activity_code')" :readonly="drawerMode==='edit'" maxlength="20" placeholder="ACT-004"
                @input="form.activity_code=form.activity_code.toUpperCase().replace(/[^A-Z0-9-]/g,''); delete formErrors.activity_code"/>
              <div v-if="formErrors.activity_code" class="ct-err">{{ formErrors.activity_code }}</div>
              <div v-else-if="drawerMode==='edit'" class="ct-hint">The code can’t be changed once saved.</div>
            </div>
            <div class="inv-field">
              <label class="inv-lbl">Category <span class="nim-req">*</span></label>
              <select v-model="form.category" class="inv-fi" :style="errStyle('category')" @change="delete formErrors.category">
                <option v-for="c in ACTIVITY_CATEGORIES" :key="c" :value="c">{{ c }}</option>
              </select>
              <div v-if="formErrors.category" class="ct-err">{{ formErrors.category }}</div>
            </div>
            <div class="inv-field" style="grid-column:span 2">
              <label class="inv-lbl">Activity Name <span class="nim-req">*</span></label>
              <input v-model="form.activity_name" class="inv-fi" :style="errStyle('activity_name')" placeholder="Painting house" @input="delete formErrors.activity_name"/>
              <div v-if="formErrors.activity_name" class="ct-err">{{ formErrors.activity_name }}</div>
            </div>
          </div>

          <div class="inv-view-footer" v-if="drawerMode==='edit' && form.owner">
            Created by {{ ownerName(form.owner) }} on {{ fmtDate(form.creation) }}
            <template v-if="form.modified_by"> · Last modified by {{ ownerName(form.modified_by) }} on {{ fmtDate(form.modified) }}</template>
          </div>
        </div>

        <div class="inv-dfooter" style="border-top:1px solid #e8ecf0;padding:14px 24px;background:#fafbfd">
          <button class="form-btn form-btn-outline" @click="showDrawer=false">Cancel</button>
          <button class="form-btn form-btn-primary" @click="saveActivity" :disabled="saving || !(drawerMode==='edit' ? $canEdit('admin') : $canCreate('admin'))">
            <span v-if="saving" v-html="icon('refresh',13)" style="animation:spin 1s linear infinite"></span>
            {{ saving ? 'Saving…' : (drawerMode==='add' ? 'Save Activity' : 'Save Changes') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- Delete confirm -->
  <Teleport to="body">
    <div v-if="showDelete" class="nim-overlay" @click.self="showDelete=false">
      <div class="nim-dialog" style="max-width:420px">
        <div class="nim-header" style="background:linear-gradient(135deg,#dc2626,#b91c1c)">
          <div class="nim-header-left">
            <div class="nim-header-icon" style="color:#fff;"><span v-html="icon('trash',16)"></span></div>
            <div class="nim-header-title">Delete Activity?</div>
          </div>
          <button class="nim-close" @click="showDelete=false" v-html="icon('x',15)"></button>
        </div>
        <div class="nim-body" style="padding:20px 24px">
          <p style="font-size:14px;color:#374151;line-height:1.6">
            Are you sure you want to delete <strong>{{ deleteTarget?.activity_name }}</strong>?
            This action cannot be undone. An activity used on a contract can only be deactivated.
          </p>
        </div>
        <div class="inv-dfooter">
          <button class="form-btn form-btn-outline" @click="showDelete=false">Cancel</button>
          <button @click="doDelete" :disabled="deleting || !$canDelete('admin')"
            style="height:37px;padding:0 18px;border-radius:8px;font-size:13.5px;font-weight:600;cursor:pointer;font-family:inherit;border:none;background:#dc2626;color:#fff;display:inline-flex;align-items:center;gap:6px">
            <span v-if="deleting" v-html="icon('refresh',13)" style="animation:spin 1s linear infinite"></span>
            {{ deleting ? 'Deleting…' : 'Yes, Delete' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</div>
</template>

<script setup>
// Labour Contract > Activities. Same list / drawer UI as Contractors; data in the "Labour Activity" doctype.
import { ref, reactive, computed, onMounted } from "vue";
import { apiList, apiSave, apiDelete, resolveCompany } from "../api/client.js";
import { useToast } from "../composables/useToast.js";
import { fmtDate } from "../utils/format.js";
import { ownerName } from "../utils/userNames.js";
import { icon } from "../utils/icons.js";
import {
  ACTIVITY_CATEGORIES, nextActivityCode, matchesFilter, countsFor, matchesSearch, usedOnText, validateActivity, cleanName, buildUsage,
} from "../utils/labourActivity.js";

const { toast } = useToast();
const DT = "Labour Activity";
const FILTERS = [{ k: "all", l: "All" }, { k: "active", l: "Active" }, { k: "inactive", l: "Inactive" }];

const list = ref([]);
// Activity code -> the contract that uses it (e.g. "LC-2026-0001"), filled in load().
const usage = ref({});
const loading = ref(true);
const search = ref("");
const activeFilter = ref("all");
const showDrawer = ref(false);
const drawerMode = ref("add");
const saving = ref(false);
const showDelete = ref(false);
const deleteTarget = ref(null);
const deleting = ref(false);
const busyName = ref("");
const formErrors = reactive({});
const form = reactive({});

function blankForm() {
  return {
    name: "", activity_code: "", activity_name: "", category: ACTIVITY_CATEGORIES[0],
    owner: "", creation: "", modified: "", modified_by: "",
  };
}
function resetForm(src) {
  Object.keys(formErrors).forEach((k) => delete formErrors[k]);
  Object.keys(form).forEach((k) => delete form[k]);
  Object.assign(form, blankForm(), src || {});
}

const isUsed = (a) => usedOnText(a, usage.value) !== "Not used";
const counts = computed(() => countsFor(list.value));
const filtered = computed(() =>
  list.value.filter((a) => matchesFilter(a, activeFilter.value) && matchesSearch(a, search.value))
);
const kpiCards = computed(() => [
  {
    key: "total", label: "Total Activities", value: counts.value.all, sub: "all activities",
    icon: icon("stack", 18), color: "#2563eb", iconBg: "#eff6ff", valueClass: "bk-kpi-blue",
  },
  {
    key: "active", label: "Active", value: counts.value.active, sub: "can be put on a contract",
    icon: icon("check", 18), color: "#16a34a", iconBg: "#f0fdf4", valueClass: "bk-kpi-green",
  },
  {
    key: "inactive", label: "Inactive", value: counts.value.inactive, sub: "hidden from new contracts",
    icon: icon("x", 18), color: "#d97706", iconBg: "#fff7ed", valueClass: "bk-kpi-amber",
  },
  {
    key: "used", label: "Used on Contracts", value: list.value.filter(isUsed).length, sub: "can’t be deleted",
    icon: icon("alert", 18), color: "#7c3aed", iconBg: "#f5f3ff", valueClass: "",
  },
]);

function errStyle(f) { return formErrors[f] ? "border-color:#dc2626;background:#fff5f5" : ""; }

async function load() {
  loading.value = true;
  try {
    const rows = await apiList(DT, {
      fields: ["name", "activity_code", "activity_name", "category", "disabled", "owner", "creation", "modified", "modified_by"],
      order: "creation desc", limit: 500,
    });
    list.value = rows || [];
    // Which contract uses each activity. If the user can't read contracts, every activity shows "Not used"; the server still blocks delete.
    try { usage.value = buildUsage(await apiList("Labour Contract", { fields: ["name", "activity"], limit: 1000 })); } catch (_) { usage.value = {}; }
  } catch (e) {
    toast("Failed to load activities: " + (e.message || e), "error");
  } finally { loading.value = false; }
}

function openAdd() {
  resetForm({ activity_code: nextActivityCode(list.value) });
  drawerMode.value = "add";
  showDrawer.value = true;
}
function openEdit(a) {
  resetForm({ ...a });
  drawerMode.value = "edit";
  showDrawer.value = true;
}

async function saveActivity() {
  const errs = validateActivity(form, list.value, drawerMode.value === "edit" ? form.name : "");
  Object.keys(formErrors).forEach((k) => delete formErrors[k]);
  Object.assign(formErrors, errs);
  if (Object.keys(errs).length) { toast(Object.values(errs)[0], "error"); return; }
  saving.value = true;
  try {
    const company = await resolveCompany();
    await apiSave({
      doctype: DT,
      ...(drawerMode.value === "edit" ? { name: form.name } : { activity_code: form.activity_code.trim().toUpperCase() }),
      company,
      activity_name: cleanName(form.activity_name),
      category: form.category,
    });
    toast(drawerMode.value === "edit" ? "Activity updated" : "Activity added");
    showDrawer.value = false;
    await load();
  } catch (e) {
    toast(e.message || "Could not save activity", "error");
  } finally { saving.value = false; }
}

async function toggleActive(a) {
  busyName.value = a.name;
  try {
    await apiSave({ doctype: DT, name: a.name, disabled: a.disabled ? 0 : 1 });
    toast(a.disabled ? "Activity activated" : "Activity deactivated");
    await load();
  } catch (e) {
    toast(e.message || "Could not update activity", "error");
  } finally { busyName.value = ""; }
}

function confirmDelete(a) { deleteTarget.value = a; showDelete.value = true; }
async function doDelete() {
  if (!deleteTarget.value) return;
  deleting.value = true;
  try {
    await apiDelete(DT, deleteTarget.value.name);
    toast("Activity deleted");
    showDelete.value = false;
    deleteTarget.value = null;
    await load();
  } catch (e) {
    toast(e.message || "Could not delete activity", "error");
  } finally { deleting.value = false; }
}

onMounted(load);
</script>

<style scoped>
.nim-req, .inv-req { color: #dc2626; }
.cust-drawer-sub { color: #fff; font-size: 12px; margin-top: 2px; }
.ct-err { margin-top: 4px; font-size: 12px; color: #dc2626; }
.ct-hint { margin-top: 4px; font-size: 12px; color: #9ca3af; }
.inv-drawer-panel.open {
  transform: translateX(0);
}
.vt-vendor-name {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  line-height: 1.3;
}
.vt-th {
  padding: 10px 14px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
  user-select: none;
}
.vt-th-actions { text-align: center; width: 88px; }
.vt-td {
  padding: 11px 14px;
  vertical-align: middle;
  color: #374151;
  white-space: nowrap;
}
.vt-td-mono   { font-size: 13px; color: #374151; }
.vt-td-secondary { color: #6b7280; font-size: 12.5px; }
.vt-td-actions { text-align: center; width: 88px; }
.vt-row-shimmer td { padding: 13px 14px; }
.vt-row-disabled   { opacity: 0.55; }
.vt-actions {
  display: flex;
  gap: 3px;
  justify-content: center;
  opacity: 1;
  transition: opacity 0.12s;
}
.inv-row:hover .vt-actions { opacity: 1; }
.vt-act-edit:hover { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }
.vt-act-del:hover  { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
.vt-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 9px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
  line-height: 1.6;
}
.vt-badge-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.vt-badge-green             { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
.vt-badge-green .vt-badge-dot { background: #22c55e; }
.vt-badge-red               { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
.vt-badge-red   .vt-badge-dot { background: #ef4444; }
.vt-badge-blue  { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.vt-empty { padding: 52px 24px; text-align: center; }
.vt-empty-title { font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px; }
.vt-empty-sub   { font-size: 13px; color: #9ca3af; }
.vt-footer { padding: 9px 16px; border-top: 1px solid #f3f4f6; font-size: 12px; color: #9ca3af; background: #fafafa; }
.vt-footer strong { color: #6b7280; font-weight: 600; }
</style>