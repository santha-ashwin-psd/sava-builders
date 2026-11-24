<template>
<div class="list-page">
  <div class="sales-toolbar">
    <div class="sales-search">
      <span v-html="icon('search',13)" style="color:#9ca3af;flex-shrink:0"></span>
      <input v-model="search" placeholder="Search contractors…" class="sales-search-input" autocomplete="off"/>
    </div>
    <div class="sales-pills">
      <button v-for="f in FILTERS" :key="f.k" class="sales-pill" :class="{active: activeFilter===f.k}" @click="activeFilter=f.k">
        {{ f.l }}
        <span class="sales-pill-count" :class="activeFilter===f.k?'':'zb-pc-muted'">{{ counts[f.k] }}</span>
      </button>
    </div>
    <div class="cust-toolbar-right" style="margin-left:auto">
      <button class="sales-btn-ghost" @click="load" title="Refresh"><span v-html="icon('refresh',13)"></span> Refresh</button>
      <button class="sales-btn-primary" :disabled="!$canCreate('admin')" :title="!$canCreate('admin') ? 'Not permitted' : ''" @click="openAdd"><span v-html="icon('plus',13)"></span> New Contractor</button>
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
          <th class="vt-th">Contractor</th>
          <th class="vt-th">Type</th>
          <th class="vt-th">ID / Reg. No.</th>
          <th class="vt-th">KRA PIN</th>
          <th class="vt-th">Certificate</th>
          <th class="vt-th">Phone</th>
          <th class="vt-th">Status</th>
          <th class="vt-th vt-th-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="n in 6" :key="n" class="vt-row-shimmer"><td colspan="8"><div class="shimmer" style="height:12px;border-radius:3px;width:65%"></div></td></tr>
        </template>
        <tr v-else-if="!filtered.length">
          <td colspan="8" class="vt-empty">
            <div class="vt-empty-title">{{ search || activeFilter!=='all' ? 'No results found' : 'No contractors yet' }}</div>
            <div class="vt-empty-sub">{{ search || activeFilter!=='all' ? 'Try adjusting your search or filter' : 'Add your first contractor to get started' }}</div>
            <button v-if="!search && activeFilter==='all'" class="nim-btn nim-btn-primary" :disabled="!$canCreate('admin')" style="margin-top:14px" @click="openAdd"><span v-html="icon('plus',13)"></span> New Contractor</button>
          </td>
        </tr>
        <tr v-else v-for="c in filtered" :key="c.name" class="inv-row" :class="c.disabled ? 'vt-row-disabled' : ''" @click="canEditRow && openEdit(c)">
          <td class="vt-td vt-td-vendor">
            <div class="vt-vendor-cell">
              <div class="vt-avatar" :class="c.disabled ? 'vt-avatar-disabled' : ''">{{ contractorInitials(c.contractor_name) }}</div>
              <div>
                <div class="vt-vendor-name inv-customer">{{ c.contractor_name || c.name }}</div>
                <div class="vt-vendor-id">{{ c.name }}</div>
              </div>
            </div>
          </td>
          <td class="vt-td"><span class="vt-badge vt-badge-blue">{{ c.contractor_type || '—' }}</span></td>
          <td class="vt-td vt-td-mono">{{ c.id_no || '—' }}</td>
          <td class="vt-td vt-td-mono">{{ c.kra_pin || '—' }}</td>
          <td class="vt-td">
            <span class="inv-status-badge" :class="isCertExpired(c.tax_cert_expiry) ? 'vt-badge-red' : 'vt-badge-green'">
              <span class="vt-badge-dot"></span>{{ isCertExpired(c.tax_cert_expiry) ? 'Expired ' : 'Valid to ' }}{{ fmtDate(c.tax_cert_expiry) }}
            </span>
          </td>
          <td class="vt-td vt-td-secondary">{{ c.phone || '—' }}</td>
          <td class="vt-td">
            <span class="inv-status-badge" :class="c.disabled ? 'vt-badge-red' : 'vt-badge-green'">
              <span class="vt-badge-dot"></span>{{ c.disabled ? 'Inactive' : 'Active' }}
            </span>
          </td>
          <td class="vt-td vt-td-actions" @click.stop>
            <div class="vt-actions">
              <button class="inv-act-btn vt-act-edit" :disabled="!$canEdit('admin')" :title="!$canEdit('admin') ? 'Not permitted' : 'Edit'" @click="openEdit(c)"><span v-html="icon('edit',13)"></span></button>
              <button class="inv-act-btn" :disabled="!$canEdit('admin') || busyName===c.name" :title="c.disabled ? 'Activate' : 'Deactivate'" @click="toggleActive(c)" style="font-size:11.5px;font-weight:600;padding:0 8px;width:auto">{{ c.disabled ? 'Activate' : 'Deactivate' }}</button>
              <button class="inv-act-btn vt-act-del" :disabled="!$canDelete('admin')" :title="!$canDelete('admin') ? 'Not permitted' : 'Delete'" @click="confirmDelete(c)"><span v-html="icon('trash',13)"></span></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="vt-footer" v-if="!loading && list.length">Showing <strong>{{ filtered.length }}</strong> of <strong>{{ list.length }}</strong> contractors</div>
  </div>
  <p style="margin:10px 4px;font-size:12px;color:#6b7280">Contractors with an expired certificate can’t get new contracts or bills. A contractor in use can be deactivated but not deleted.</p>

  <!-- Add / Edit drawer -->
  <Teleport to="body">
    <div v-if="showDrawer" class="inv-drawer-bg" @click.self="showDrawer=false">
      <div class="inv-drawer-panel" :class="{open:showDrawer}" style="width:560px;max-width:98vw">
        <div class="inv-dh" style="background:linear-gradient(135deg,#0f766e,#115e59);padding:18px 24px">
          <div class="cust-drawer-header-left">
            <div class="cust-drawer-icon" style="color:#fff"><span v-html="icon('users',16)"></span></div>
            <div>
              <div class="inv-dh-title">{{ drawerMode==='add' ? 'New Contractor' : 'Edit Contractor' }}</div>
              <div class="cust-drawer-sub">{{ drawerMode==='edit' ? form.name : 'Fill in contractor details' }}</div>
            </div>
          </div>
          <button class="inv-dclose" style="background:rgba(255,255,255,.15);border:none;cursor:pointer;color:#fff;width:30px;height:30px;border-radius:8px;display:grid;place-items:center" @click="showDrawer=false" v-html="icon('x',15)"></button>
        </div>

        <div class="inv-dbody" style="padding:24px;overflow-y:auto;flex:1">
          <div class="inv-sec-lbl" style="margin-top:0">Basic Information</div>
          <div class="inv-fg inv-fg2">
            <div class="inv-field" style="grid-column:span 2">
              <label class="inv-lbl">Name <span class="nim-req">*</span></label>
              <input v-model="form.contractor_name" class="inv-fi" :style="errStyle('contractor_name')" placeholder="Company or individual name" @input="delete formErrors.contractor_name"/>
              <div v-if="formErrors.contractor_name" class="ct-err">{{ formErrors.contractor_name }}</div>
            </div>
            <div class="inv-field">
              <label class="inv-lbl">Type <span class="nim-req">*</span></label>
              <select v-model="form.contractor_type" class="inv-fi">
                <option v-for="t in CONTRACTOR_TYPES" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
            <div class="inv-field">
              <label class="inv-lbl">ID or Registration No. <span class="nim-req">*</span></label>
              <input v-model="form.id_no" class="inv-fi" :style="errStyle('id_no')" @input="delete formErrors.id_no"/>
              <div v-if="formErrors.id_no" class="ct-err">{{ formErrors.id_no }}</div>
            </div>
            <div class="inv-field">
              <label class="inv-lbl">KRA PIN <span class="nim-req">*</span></label>
              <input v-model="form.kra_pin" class="inv-fi" :style="errStyle('kra_pin')" placeholder="A123456789Z" maxlength="11"
                @input="form.kra_pin=form.kra_pin.toUpperCase().replace(/[^A-Z0-9]/g,''); delete formErrors.kra_pin"/>
              <div v-if="formErrors.kra_pin" class="ct-err">{{ formErrors.kra_pin }}</div>
            </div>
            <div class="inv-field">
              <label class="inv-lbl">Tax Certificate Expiry <span class="nim-req">*</span></label>
              <input type="date" v-model="form.tax_cert_expiry" class="inv-fi" :style="errStyle('tax_cert_expiry')" @input="delete formErrors.tax_cert_expiry"/>
              <div v-if="formErrors.tax_cert_expiry" class="ct-err">{{ formErrors.tax_cert_expiry }}</div>
            </div>
          </div>

          <div class="inv-sec-lbl">Contact and Bank</div>
          <div class="inv-fg inv-fg2">
            <div class="inv-field">
              <label class="inv-lbl">Phone</label>
              <input type="tel" inputmode="tel" autocomplete="off" :value="form.phone" @input="onPhoneInput" class="inv-fi" placeholder="0712 345 678"/>
            </div>
            <div class="inv-field">
              <label class="inv-lbl">Bank and Account No.</label>
              <input v-model="form.bank_details" class="inv-fi" placeholder="Equity 0123456789"/>
            </div>
            <div class="inv-field" style="grid-column:span 2">
              <label class="inv-lbl">NCA Registration (optional)</label>
              <input v-model="form.nca_reg_no" class="inv-fi" placeholder="NCA-0000"/>
            </div>
          </div>

          <div class="inv-view-footer" v-if="drawerMode==='edit' && form.owner">
            Created by {{ ownerName(form.owner) }} on {{ fmtDate(form.creation) }}
            <template v-if="form.modified_by"> · Last modified by {{ ownerName(form.modified_by) }} on {{ fmtDate(form.modified) }}</template>
          </div>
        </div>

        <div class="inv-dfooter" style="border-top:1px solid #e8ecf0;padding:14px 24px;background:#fafbfd">
          <button class="form-btn form-btn-outline" @click="showDrawer=false">Cancel</button>
          <button class="form-btn form-btn-primary" @click="saveContractor" :disabled="saving || !(drawerMode==='edit' ? $canEdit('admin') : $canCreate('admin'))">
            <span v-if="saving" v-html="icon('refresh',13)" style="animation:spin 1s linear infinite"></span>
            {{ saving ? 'Saving…' : (drawerMode==='add' ? 'Save Contractor' : 'Save Changes') }}
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
            <div class="nim-header-title">Delete Contractor?</div>
          </div>
          <button class="nim-close" @click="showDelete=false" v-html="icon('x',15)"></button>
        </div>
        <div class="nim-body" style="padding:20px 24px">
          <p style="font-size:14px;color:#374151;line-height:1.6">
            Are you sure you want to delete <strong>{{ deleteTarget?.contractor_name }}</strong>?
            This action cannot be undone. A contractor used on a contract can only be deactivated.
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
// Labour Contract > Contractors. Same list / drawer UI as Vendors; data in the "Labour Contractor" doctype.
import { ref, reactive, computed, onMounted } from "vue";
import { apiList, apiSave, apiDelete, resolveCompany } from "../api/client.js";
import { useToast } from "../composables/useToast.js";
import { fmtDate } from "../utils/format.js";
import { ownerName } from "../utils/userNames.js";
import { icon } from "../utils/icons.js";
import {
  CONTRACTOR_TYPES, isCertExpired, contractorInitials, matchesFilter, countsFor, matchesSearch, validateContractor, cleanPhone,
} from "../utils/labourContractor.js";

const { toast } = useToast();
const DT = "Labour Contractor";
const FILTERS = [
  { k: "all", l: "All" }, { k: "active", l: "Active" }, { k: "inactive", l: "Inactive" }, { k: "expired", l: "Certificate expired" },
];

const list = ref([]);
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
function onPhoneInput(e) {   // digits, spaces and a leading + only
  const v = cleanPhone(e.target.value);
  e.target.value = v;
  form.phone = v;
}
const canEditRow = true;

function blankForm() {
  return {
    name: "", contractor_name: "", contractor_type: "Individual", id_no: "", kra_pin: "", tax_cert_expiry: "",
    phone: "", bank_details: "", nca_reg_no: "", owner: "", creation: "", modified: "", modified_by: "",
  };
}
function resetForm(src) {
  Object.keys(formErrors).forEach((k) => delete formErrors[k]);
  Object.keys(form).forEach((k) => delete form[k]);
  Object.assign(form, blankForm(), src || {});
}

const counts = computed(() => countsFor(list.value));
const filtered = computed(() =>
  list.value.filter((c) => matchesFilter(c, activeFilter.value) && matchesSearch(c, search.value))
);
const kpiCards = computed(() => [
  {
    key: "total", label: "Total Contractors", value: counts.value.all, sub: "all contractors",
    icon: icon("users", 18), color: "#2563eb", iconBg: "#eff6ff", valueClass: "bk-kpi-blue",
  },
  {
    key: "active", label: "Active", value: counts.value.active, sub: "can get contracts",
    icon: icon("check", 18), color: "#16a34a", iconBg: "#f0fdf4", valueClass: "bk-kpi-green",
  },
  {
    key: "expired", label: "Certificate Expired", value: counts.value.expired, sub: "active, need renewal",
    icon: icon("alert", 18), color: "#d97706", iconBg: "#fff7ed", valueClass: "bk-kpi-amber",
  },
]);

function errStyle(f) { return formErrors[f] ? "border-color:#dc2626;background:#fff5f5" : ""; }

async function load() {
  loading.value = true;
  try {
    const rows = await apiList(DT, {
      fields: ["name", "contractor_name", "contractor_type", "id_no", "kra_pin", "tax_cert_expiry", "phone",
        "bank_details", "nca_reg_no", "disabled", "owner", "creation", "modified", "modified_by"],
      order: "contractor_name asc", limit: 500,
    });
    list.value = rows || [];
  } catch (e) {
    toast("Failed to load contractors: " + (e.message || e), "error");
  } finally { loading.value = false; }
}

function openAdd() {
  resetForm();
  drawerMode.value = "add";
  showDrawer.value = true;
}
function openEdit(c) {
  resetForm({ ...c, tax_cert_expiry: c.tax_cert_expiry ? String(c.tax_cert_expiry).slice(0, 10) : "" });
  drawerMode.value = "edit";
  showDrawer.value = true;
}

async function saveContractor() {
  const errs = validateContractor(form, list.value, drawerMode.value === "edit" ? form.name : "");
  Object.keys(formErrors).forEach((k) => delete formErrors[k]);
  Object.assign(formErrors, errs);
  if (Object.keys(errs).length) { toast(Object.values(errs)[0], "error"); return; }
  saving.value = true;
  try {
    const company = await resolveCompany();
    await apiSave({
      doctype: DT,
      ...(drawerMode.value === "edit" ? { name: form.name } : {}),
      company,
      contractor_name: form.contractor_name.trim(),
      contractor_type: form.contractor_type,
      id_no: form.id_no.trim(),
      kra_pin: form.kra_pin.trim().toUpperCase(),
      tax_cert_expiry: form.tax_cert_expiry,
      phone: (form.phone || "").trim(),
      bank_details: (form.bank_details || "").trim(),
      nca_reg_no: (form.nca_reg_no || "").trim(),
    });
    toast(drawerMode.value === "edit" ? "Contractor updated" : "Contractor added");
    showDrawer.value = false;
    await load();
  } catch (e) {
    toast(e.message || "Could not save contractor", "error");
  } finally { saving.value = false; }
}

async function toggleActive(c) {
  busyName.value = c.name;
  try {
    await apiSave({ doctype: DT, name: c.name, disabled: c.disabled ? 0 : 1 });
    toast(c.disabled ? "Contractor activated" : "Contractor deactivated");
    await load();
  } catch (e) {
    toast(e.message || "Could not update contractor", "error");
  } finally { busyName.value = ""; }
}

function confirmDelete(c) { deleteTarget.value = c; showDelete.value = true; }
async function doDelete() {
  if (!deleteTarget.value) return;
  deleting.value = true;
  try {
    await apiDelete(DT, deleteTarget.value.name);
    toast("Contractor deleted");
    showDelete.value = false;
    deleteTarget.value = null;
    await load();
  } catch (e) {
    toast(e.message || "Could not delete contractor", "error");
  } finally { deleting.value = false; }
}

onMounted(load);
</script>

<style scoped>
.nim-req, .inv-req { color: #dc2626; }
.cust-drawer-sub { color: #fff; font-size: 12px; margin-top: 2px; }
.ct-err { margin-top: 4px; font-size: 12px; color: #dc2626; }
.inv-drawer-panel.open {
  transform: translateX(0);
}
/* ── Vendor avatar circle (orange gradient) ─────────────── */
.vt-vendor-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}
.vt-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(135deg, #E67700, #C96200);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.03em;
}
.vt-avatar-disabled { background: #d1d5db; }
.vt-vendor-name {
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  line-height: 1.3;
}
.vt-vendor-id {
  font-size: 11.5px;
  color: #9ca3af;
  margin-top: 1px;
}
/* ── Vendor-specific column helpers ─────────────────────── */
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
.vt-th-check  { width: 36px; padding-left: 16px; }
.vt-th-num    { text-align: right; }
.vt-th-actions { text-align: center; width: 88px; }
.vt-td {
  padding: 11px 14px;
  vertical-align: middle;
  color: #374151;
  white-space: nowrap;
}
.vt-td-check  { padding-left: 16px; width: 36px; }
.vt-td-num    { text-align: right; }
.vt-td-mono   { font-size: 13px; color: #374151; }
.vt-td-secondary { color: #6b7280; font-size: 12.5px; }
.vt-td-actions { text-align: center; width: 88px; }
.vt-checkbox { width: 15px; height: 15px; accent-color: #E67700; cursor: pointer; border-radius: 3px; }
.vt-row-shimmer td { padding: 13px 14px; }
.vt-row-disabled   { opacity: 0.55; }
.vt-row-selected   { background: #fff7ed !important; }
.vt-actions {
  display: flex;
  gap: 3px;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.12s;
}
.inv-row:hover .vt-actions { opacity: 1; }
.vt-act-edit:hover { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }
.vt-act-del:hover  { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
.vt-amount-due { font-weight: 600; color: #E67700; font-size: 13px; }
.vt-amount-nil { color: #d1d5db; }
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
.vt-badge-gray  { background: #f9fafb; color: #6b7280; border: 1px solid #e5e7eb; }
.vt-badge-amber { background: #fff7ed; color: #b45309; border: 1px solid #fed7aa; }
.vt-empty { padding: 52px 24px; text-align: center; }
.vt-empty-icon {
  margin: 0 auto 14px; width: 56px; height: 56px; border-radius: 14px;
  background: #f9fafb; border: 1px solid #e5e7eb;
  display: flex; align-items: center; justify-content: center;
}
.vt-empty-title { font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px; }
.vt-empty-sub   { font-size: 13px; color: #9ca3af; }
.vt-footer { padding: 9px 16px; border-top: 1px solid #f3f4f6; font-size: 12px; color: #9ca3af; background: #fafafa; }
.vt-footer strong { color: #6b7280; font-weight: 600; }
</style>