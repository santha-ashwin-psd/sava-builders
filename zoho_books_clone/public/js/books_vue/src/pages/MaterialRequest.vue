<template>
<div class="bomx-page">
  <div class="bomx-two-col">

    <!-- ══════════ LEFT: MATERIAL REQUEST LIST ══════════ -->
    <div class="bomx-list-panel">
      <div class="bomx-panel-hdr">
        <span class="bomx-panel-title">📦 All Material Requests <span class="bomx-count">({{ sorted.length }})</span></span>
        <button class="bomx-btn bomx-btn-mfg bomx-btn-sm" :disabled="!$canCreate('inventory')" :title="!$canCreate('inventory') ? 'Read-only access' : ''" @click="openAdd"><span v-html="icon('plus',12)"></span> New</button>
      </div>
      <SearchableSelect v-model="filterStatus" :options="ssOpts1" placeholder="All Status" compact />
      <input class="bomx-search" v-model="search" type="text" placeholder="Search Material Requests…"/>
      <div class="bomx-list">
        <template v-if="loading">
          <div v-for="n in 5" :key="n" class="bomx-item"><div class="shimmer" style="height:38px;border-radius:6px"></div></div>
        </template>
        <div v-else-if="!sorted.length" class="bomx-list-empty">No Material Requests found</div>
        <div v-else v-for="row in sorted" :key="row.name"
             class="bomx-item" :class="{active: selectedName === row.name}"
             @click="selectMR(row.name)">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
            <div class="bomx-item-name">{{ row.name }}</div>
            <span class="bomx-badge" :class="statusClass(row)">{{ row.status }}</span>
          </div>
          <div class="bomx-item-meta">
            <span>{{ row.material_request_type || '—' }}</span>
            <span>•</span>
            <span class="mono">{{ fmtDate(row.posting_date) }}</span>
          </div>
          <div class="bomx-item-right" v-if="row.production_plan">
            <span style="font-size:12px;color:var(--bx-muted)">{{ row.production_plan }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════ RIGHT: MATERIAL REQUEST DETAIL ══════════ -->
    <div class="bomx-detail-panel">

      <!-- Empty state -->
      <div v-if="!selectedName" class="bomx-empty-state">
        <div class="bomx-empty-icon">📦</div>
        <div class="bomx-empty-title">Select a Material Request</div>
        <div class="bomx-empty-sub">Choose a Material Request from the list to view or edit its items.</div>
        <button class="bomx-btn bomx-btn-mfg" :disabled="!$canCreate('inventory')" :title="!$canCreate('inventory') ? 'Read-only access' : ''" @click="openAdd"><span v-html="icon('plus',13)"></span> Create Material Request</button>
      </div>

      <template v-else>
        <div v-if="loading" class="bomx-empty-state"><div class="shimmer" style="height:200px;border-radius:10px"></div></div>

        <template v-else>
          <!-- Header -->
          <div class="bomx-detail-hdr">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">
              <div style="min-width:0">
                <div class="bomx-detail-title">{{ isNew ? 'New Material Request' : mr.name }}</div>
                <div class="bomx-detail-meta">
                  <span v-if="!isNew">{{ mr.material_request_type }}</span>
                  <span v-if="!isNew">•</span>
                  <span v-if="!isNew">{{ fmtDate(mr.posting_date) }}</span>
                  <span v-if="!isNew">•</span>
                  <span class="bomx-badge" :class="statusClass(mr)" style="font-size:11px" v-if="!isNew">{{ mr.status }}</span>
                </div>
              </div>
              <div style="display:flex;gap:6px;flex-shrink:0;flex-wrap:wrap;justify-content:flex-end">
                <button class="bomx-btn bomx-btn-ghost-inv" @click="goBackToList" :disabled="saving || submitting">Back</button>
                <button v-if="!isNew && mr.docstatus===2" class="bomx-btn bomx-btn-light" @click="amendMR" :disabled="submitting || !$canCreate('inventory')">
                  {{ submitting ? 'Amending…' : 'Amend' }}
                </button>
                <button v-if="!isNew && mr.docstatus===1" class="bomx-btn" style="background:var(--bx-redS);color:var(--bx-red)" @click="cancelMR" :disabled="submitting || !$canDelete('inventory')">
                  {{ submitting ? 'Cancelling…' : 'Cancel' }}
                </button>
                <button v-if="!isNew && mr.docstatus===1 && mr.material_request_type==='Purchase' && mr.status !== 'Ordered'" class="bomx-btn" style="background:var(--bx-blueS);color:var(--bx-blue)" @click="createPurchaseOrder" :disabled="actionLoading==='po' || !$canCreate('inventory')">
                  {{ actionLoading === 'po' ? 'Creating…' : 'Create Purchase Order' }}
                </button>
                <span v-if="!isNew && mr.docstatus===1 && mr.material_request_type==='Purchase' && mr.status === 'Ordered'" class="bomx-badge badge-active" style="align-self:center">Purchase Order Created</span>
                <button v-if="!isNew && mr.docstatus===1 && mr.material_request_type==='Purchase' && (mr.status==='Approved' || mr.status==='Partly Issued')" class="bomx-btn" style="background:var(--bx-blueS);color:var(--bx-blue)" @click="createRfq" :disabled="!$canCreate('bills')" :title="!$canCreate('bills') ? 'You need Purchases access to request quotations' : ''">
                  Create RFQ
                </button>
                <button v-if="!isNew && mr.docstatus===1 && (mr.status==='Approved' || mr.status==='Partly Issued')" class="bomx-btn" style="background:var(--bx-blueS);color:var(--bx-blue)" @click="issueFromStore" :disabled="!$canCreate('invoices')" :title="!$canCreate('invoices') ? 'You need Invoices access to issue stock' : ''">
                  Issue from Store
                </button>
                <button v-if="!isNew && mr.docstatus===0 && mr.production_plan" class="bomx-btn bomx-btn-light" @click="submitMR" :disabled="submitting || saving || !$canEdit('inventory')">
                  {{ submitting ? 'Submitting…' : 'Submit' }}
                </button>
                <button v-if="!isNew && mr.docstatus===0 && !mr.production_plan && (mr.status==='Draft' || mr.status==='Sent Back')" class="bomx-btn bomx-btn-light" @click="sendForApproval" :disabled="submitting || saving || !$canEdit('inventory')">
                  {{ submitting ? 'Sending…' : 'Send for Approval' }}
                </button>
                <button v-if="!isNew && mr.docstatus===0 && mr.status==='Pending Approval' && approval.can_approve" class="bomx-btn bomx-btn-light" @click="approveMR" :disabled="submitting">
                  {{ submitting ? 'Approving…' : 'Approve' }}
                </button>
                <button v-if="!isNew && mr.docstatus===0 && mr.status==='Pending Approval' && approval.can_approve" class="bomx-btn bomx-btn-light" @click="showSendBack = !showSendBack" :disabled="submitting">
                  Send Back
                </button>
                <button v-if="!readOnly" class="bomx-btn bomx-btn-light" @click="save" :disabled="saving || loading || !(isNew ? $canCreate('inventory') : $canEdit('inventory'))">
                  {{ saving ? 'Saving…' : (isNew ? 'Save Material Request' : 'Save Changes') }}
                </button>
              </div>
            </div>
          </div>

          <div class="bomx-toggle-row" v-if="!isNew && mr.status==='Pending Approval'">
            <div class="bomx-field-hint" style="margin:0">
              <template v-if="approval.can_approve">Waiting for your approval.</template>
              <template v-else>Waiting for approval by {{ approval.project_manager ? ownerName(approval.project_manager) : 'the Project Manager' }}.</template>
            </div>
          </div>
          <div class="bomx-toggle-row" v-if="!isNew && mr.status==='Pending Approval' && approval.can_approve && showSendBack" style="align-items:flex-start">
            <textarea class="bomx-fi" v-model="sendBackReason" rows="2" placeholder="Reason for sending back (required)" style="flex:1;min-width:260px;resize:vertical"></textarea>
            <button class="bomx-btn bomx-btn-light" @click="sendBackMR" :disabled="submitting || !sendBackReason.trim()">{{ submitting ? 'Sending…' : 'Confirm Send Back' }}</button>
            <button class="bomx-btn bomx-btn-light" @click="showSendBack = false; sendBackReason = ''" :disabled="submitting">Cancel</button>
          </div>
          <div class="bomx-toggle-row" v-if="!isNew && mr.status==='Sent Back' && mr.docstatus===0">
            <div class="bomx-field-hint" style="margin:0">
              Sent back by {{ ownerName(mr.sent_back_by) }} on {{ fmtDate(mr.sent_back_on) }}: {{ mr.send_back_reason }}. Correct it and send it for approval again.
            </div>
          </div>

          <!-- Header fields -->
          <div class="bomx-hdr-fields">
            <div>
              <div class="bomx-hf-label">Purpose <span style="color:var(--bx-red)">*</span></div>
              <select class="bomx-fi" v-model="mr.material_request_type" :disabled="readOnly" style="width:100%">
                <option value="Purchase">Purchase</option>
                <option value="Material Transfer">Material Transfer</option>
              </select>
            </div>
            <div>
              <div class="bomx-hf-label">Required By <span style="color:var(--bx-red)">*</span></div>
              <input class="bomx-fi" type="date" v-model="mr.posting_date" :disabled="readOnly" style="width:100%"/>
            </div>
            <div>
              <div class="bomx-hf-label">Project <span v-if="!mr.production_plan" style="color:var(--bx-red)">*</span></div>
              <SearchableSelect v-model="mr.project" :options="projects" :disabled="readOnly" placeholder="Select project" @search="q => fetchProjects(q, mr.project)" />
            </div>
            <div>
              <div class="bomx-hf-label">Delivery Warehouse <span v-if="!mr.production_plan" style="color:var(--bx-red)">*</span></div>
              <SearchableSelect v-model="mr.delivery_warehouse" :options="ssOpts4" :disabled="readOnly" placeholder="Select warehouse" />
            </div>
          </div>
          <div class="bomx-toggle-row" v-if="mr.production_plan">
            <div class="bomx-field-hint" style="margin:0">
              Production Plan:
              <DocLink doctype="Production Plan" :name="mr.production_plan" />
            </div>
          </div>

          <!-- Body -->
          <div class="bomx-body">

            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <span class="bomx-section-lbl" style="margin-bottom:0">Items</span>
              <button v-if="!readOnly" class="bomx-btn bomx-btn-sm bomx-btn-light" style="color:var(--bx-mfgB);border:1px solid var(--bx-mfg)" @click="addItem">
                <span v-html="icon('plus',12)"></span> Add Row
              </button>
            </div>
            <div class="bomx-rm-cards" style="margin-bottom:20px">
              <div v-if="!mr.items || !mr.items.length" class="bomx-tree-empty">No items yet. Add a row or create from Production Plan.</div>
              <div v-for="(row, idx) in mr.items" :key="idx" class="bomx-rm-card">
                <div class="bomx-rm-card-hdr">
                  <span class="bomx-rm-card-title">{{ row.item_name || row.item_code || 'New Row' }}</span>
                  <button v-if="!readOnly" class="bomx-btn-icon danger" @click="mr.items.splice(idx,1)" title="Remove">
                    <span v-html="icon('trash',13)"></span>
                  </button>
                </div>
                <div class="bomx-rm-card-body">
                  <div class="bomx-rm-field" style="grid-column:span 2">
                    <label>Item</label>
                    <SearchableSelect v-model="row.item_code" :options="ssOpts2" placeholder="— Select Item —" :disabled="readOnly" @select="onItemChange(row)" compact />
                  </div>
                  <div class="bomx-rm-field">
                    <label>Required Qty</label>
                    <input class="bomx-fi bomx-fi-mono" type="number" v-model="row.required_qty" min="0.001" step="any" :disabled="readOnly"/>
                  </div>
                  <div class="bomx-rm-field">
                    <label>UOM</label>
                    <SearchableSelect v-model="row.uom" :options="ssOpts3" placeholder="—" :disabled="readOnly" compact />
                  </div>
                  <div class="bomx-rm-field" style="grid-column:span 2">
                    <label>Intended Use <span v-if="!mr.production_plan" style="color:var(--bx-red)">*</span></label>
                    <input class="bomx-fi" type="text" v-model="row.intended_use" :disabled="readOnly" placeholder="What the material is for"/>
                  </div>
                  <div class="bomx-rm-field" style="grid-column:span 2" v-if="mr.production_plan">
                    <label>Warehouse</label>
                    <SearchableSelect v-model="row.warehouse" :options="ssOpts4" placeholder="— Select —" :disabled="readOnly" compact />
                  </div>
                </div>
              </div>
            </div>

            <div class="bomx-section-lbl">Remarks</div>
            <textarea class="bomx-fi" v-model="mr.remarks" rows="3" :disabled="readOnly" style="width:100%;min-height:90px;resize:vertical" placeholder="Optional notes…"></textarea>

            <div class="inv-view-footer" v-if="!isNew && mr.owner">
              Created by {{ ownerName(mr.owner) }} on {{ fmtDate(mr.creation) }}
              <template v-if="mr.approved_by"> · Approved by {{ ownerName(mr.approved_by) }} on {{ fmtDate(mr.approved_on) }}</template>
              <template v-if="mr.modified_by"> · Last modified by {{ ownerName(mr.modified_by) }} on {{ fmtDate(mr.modified) }}</template>
            </div>
          </div>
        </template>
      </template>
    </div>

  </div>
</div>
</template>

<script setup>
import SearchableSelect from "../components/SearchableSelect.vue";
import { useProjectOptions } from "../composables/useProjectOptions.js";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { apiGet, apiGET, apiPOST, apiSave, apiList, apiSubmit, apiCancel, apiAmend, resolveCompany } from "../api/client.js";
import { ownerName } from "../utils/userNames.js";
import DocLink from "../components/DocLink.vue";
import { useToast } from "../composables/useToast.js";
import { useConfirm } from "../composables/useConfirm.js";

const route = useRoute();
const router = useRouter();
const { toast } = useToast();
const { confirm } = useConfirm();

// ── LIST STATE ──────────────────────────────────────────────
const loading = ref(false);
const list = ref([]);
const search = ref("");
const filterStatus = ref("");

const statusOptions = ["Draft", "Pending Approval", "Sent Back", "Approved", "Partly Issued", "Issued", "Submitted", "Ordered", "Cancelled"];

const selectedName = computed(() => (route.params.name && route.params.name !== "new") ? route.params.name : (route.params.name === "new" ? "new" : null));

async function loadList() {
  try {
    const fields = ["name", "material_request_type", "posting_date", "production_plan", "status", "docstatus", "modified"];
    const r = await apiList("Material Request", { fields, limit: 1000, order: "modified desc" });
    list.value = r || [];
  } catch (e) {
    toast("Could not load Material Requests: " + e.message, "error");
  }
}

const sorted = computed(() => {
  let r = list.value;
  if (filterStatus.value) r = r.filter(i => i.status === filterStatus.value);
  const q = search.value.toLowerCase().trim();
  if (q) r = r.filter(i => [i.name, i.material_request_type, i.production_plan].filter(Boolean).join(" ").toLowerCase().includes(q));
  return r;
});

function statusClass(row) {
  const s = row.status;
  if (s === "Approved" || s === "Partly Issued" || s === "Issued" || s === "Submitted" || s === "Ordered") return "badge-active";
  if (s === "Cancelled" || s === "Sent Back") return "badge-cancelled";
  return "badge-obsolete";
}

function selectMR(name) {
  router.push(`/manufacturing/material-request/${name}`);
}
function openAdd() {
  router.push("/manufacturing/material-request/new");
}
function goBackToList() {
  router.push("/manufacturing/material-request");
}

// ── DETAIL STATE ─────────────────────────────────────────────
const isNew = computed(() => route.params.name === "new");
const saving = ref(false);
const submitting = ref(false);
const actionLoading = ref(false);

function emptyMR() {
  return {
    doctype: "Material Request",
    material_request_type: "Purchase",
    status: "Draft",
    posting_date: new Date().toISOString().slice(0, 10),
    company: "",
    production_plan: "",
    project: "",
    delivery_warehouse: "",
    items: [],
    remarks: "",
  };
}
const mr = ref(emptyMR());
const { projects, fetchProjects } = useProjectOptions();

const companiesList = ref([]);
const itemsList = ref([]);
const uomList = ref([]);
const warehouseList = ref([]);

const readOnly = computed(() => !isNew.value && (mr.value.docstatus === 1 || mr.value.docstatus === 2 || mr.value.status === "Pending Approval"));
const approval = ref({ can_approve: false, project_manager: "", reason: "" });
const showSendBack = ref(false);
const sendBackReason = ref("");

onMounted(async () => {
  loading.value = true;
  try {
    const co = await resolveCompany();

    [companiesList.value, itemsList.value, uomList.value] = await Promise.all([
      apiList("Company", { fields: ["name"], limit: 100000 }),
      apiList("Item", { fields: ["name", "item_name", "stock_uom"], filters: [["disabled", "=", 0]], limit: 5000, order: "name asc" }),
      apiList("UOM", { fields: ["name"], limit: 200, order: "name asc" }),
    ]);
    companiesList.value = companiesList.value || [];
    itemsList.value = itemsList.value || [];
    uomList.value = uomList.value || [];

    const whs = await apiList("Warehouse", {
      fields: ["name"],
      filters: co ? [["company", "=", co], ["is_group", "=", 0]] : [["is_group", "=", 0]],
      limit: 1000,
    });
    warehouseList.value = whs || [];

    await loadList();
    await fetchProjects("");
    if (route.params.name && !isNew.value) await loadMR();
    else if (isNew.value) mr.value.company = co || "";
  } catch (e) {
    toast("Error loading data: " + e.message, "error");
  }
  loading.value = false;
});

watch(() => route.params.name, async (name) => {
  if (!name) { mr.value = emptyMR(); return; }
  loading.value = true;
  try {
    if (isNew.value) {
      mr.value = emptyMR();
      const co = await resolveCompany();
      mr.value.company = co || "";
    } else {
      await loadMR();
    }
  } catch (e) {
    toast("Error loading Material Request: " + e.message, "error");
  }
  loading.value = false;
});

async function loadMR() {
  const data = await apiGet("Material Request", route.params.name);
  mr.value = data;
  if (!mr.value.items) mr.value.items = [];
  if (mr.value.project) fetchProjects("", mr.value.project);
  await loadApproval();
}

async function loadApproval() {
  approval.value = { can_approve: false, project_manager: "", reason: "" };
  if (!mr.value.name || mr.value.status !== "Pending Approval") return;
  try {
    approval.value = await apiGET("zoho_books_clone.api.mrn.get_approval_state", { name: mr.value.name });
  } catch (e) { /* the buttons simply stay hidden */ }
}

async function sendForApproval() {
  if (!mr.value.name) return;
  submitting.value = true;
  try {
    await apiPOST("zoho_books_clone.api.mrn.send_for_approval", { name: mr.value.name });
    toast("Sent for approval");
    await loadMR();
    loadList();
  } catch (e) {
    toast(e.message, "error");
  }
  submitting.value = false;
}

async function sendBackMR() {
  if (!mr.value.name || !sendBackReason.value.trim()) return;
  submitting.value = true;
  try {
    await apiPOST("zoho_books_clone.api.mrn.send_back_mrn", { name: mr.value.name, reason: sendBackReason.value.trim() });
    toast("Sent back to the requester");
    showSendBack.value = false;
    sendBackReason.value = "";
    await loadMR();
    loadList();
  } catch (e) {
    toast(e.message, "error");
  }
  submitting.value = false;
}

async function approveMR() {
  if (!mr.value.name) return;
  submitting.value = true;
  try {
    await apiPOST("zoho_books_clone.api.mrn.approve_mrn", { name: mr.value.name });
    toast("Material Request approved");
    await loadMR();
    loadList();
  } catch (e) {
    toast(e.message, "error");
  }
  submitting.value = false;
}

function addItem() {
  mr.value.items.push({ item_code: "", item_name: "", required_qty: 1, uom: "", warehouse: "", intended_use: "" });
}

function onItemChange(row) {
  const item = itemsList.value.find(i => i.name === row.item_code);
  row.item_name = item ? item.item_name : "";
  row.uom = item ? item.stock_uom : "";
}

async function save() {
  if (!mr.value.posting_date) return toast("Required By date is required", "error");
  if (!mr.value.production_plan) {
    if (!mr.value.project) return toast("Select a project", "error");
    if (!mr.value.delivery_warehouse) return toast("Select a delivery warehouse", "error");
  }
  if (!mr.value.items.length) return toast("Add at least one item", "error");
  for (const r of mr.value.items) {
    if (!r.item_code) return toast("Select an item for every row", "error");
    if (!r.required_qty || r.required_qty <= 0) return toast(`Required Qty must be > 0 for ${r.item_code}`, "error");
    if (!mr.value.production_plan && !(r.intended_use || "").trim()) return toast(`Enter the intended use for ${r.item_code}`, "error");
  }
  saving.value = true;
  try {
    const doc = await apiSave(mr.value);
    toast(isNew.value ? "Material Request created" : "Material Request updated");
    if (isNew.value) {
      router.replace(`/manufacturing/material-request/${doc.name}`);
    } else {
      mr.value = doc;
    }
    loadList();
  } catch (e) {
    toast(e.message, "error");
  }
  saving.value = false;
}

async function submitMR() {
  if (!mr.value.name) return;
  submitting.value = true;
  try {
    const doc = await apiSubmit("Material Request", mr.value.name);
    mr.value = doc;
    toast("Material Request submitted");
    loadList();
  } catch (e) {
    toast(e.message, "error");
  }
  submitting.value = false;
}

async function cancelMR() {
  if (!(await confirm({ title: "Cancel Material Request?", body: "Cancel this Material Request?", okLabel: "Cancel Request", okStyle: "danger" }))) return;
  submitting.value = true;
  try {
    const doc = await apiCancel("Material Request", mr.value.name);
    mr.value = doc;
    toast("Cancelled");
    loadList();
  } catch (e) {
    toast(e.message, "error");
  }
  submitting.value = false;
}

async function amendMR() {
  submitting.value = true;
  try {
    const doc = await apiAmend("Material Request", mr.value.name);
    toast(`Revision ${doc.name} created`);
    router.push(`/manufacturing/material-request/${doc.name}`);
    loadList();
  } catch (e) {
    toast(e.message, "error");
  }
  submitting.value = false;
}

async function createPurchaseOrder() {
  router.push(`/purchase-orders?new_from_mr=${mr.value.name}`);
}

function createRfq() {
  router.push(`/rfqs?new_from_mrn=${encodeURIComponent(mr.value.name)}`);
}

function issueFromStore() {
  router.push(`/delivery-challans?new_from_mrn=${encodeURIComponent(mr.value.name)}`);
}

function fmtDate(d) {
  if (!d) return "—";
  const o = new Date(d);
  if (isNaN(o)) return d;
  return o.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// ── UTIL ─────────────────────────────────────────────────────
const ICONS = {
  plus:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
};
function icon(name, size) {
  return (ICONS[name] || "").replace("<svg ", `<svg width="${size}" height="${size}" `);
}

// ── Searchable dropdown options (typing filters the list) ──
const ssOpts1 = computed(() => [{ value: '', label: 'All Status' }, ...(statusOptions || []).map(s => ({ value: s, label: s }))]);
const ssOpts2 = computed(() => [{ value: '', label: '— Select Item —' }, ...(itemsList.value || []).map(i => ({ value: i.name, label: i.item_name || i.name }))]);
const ssOpts3 = computed(() => [{ value: '', label: '—' }, ...(uomList.value || []).map(u => ({ value: u.name, label: u.name }))]);
const ssOpts4 = computed(() => [{ value: '', label: '— Select —' }, ...(warehouseList.value || []).map(w => ({ value: w.name, label: w.name }))]);
</script>

<style scoped>
.bomx-page {
  --bx-bg:#F3F4F6; --bx-surface:#FFFFFF; --bx-surf2:#F8F9FC; --bx-border:#E2E8F0;
  --bx-text:#1A1D23; --bx-muted:#868E96;
  --bx-green:#2F9E44; --bx-greenS:#EBFBEE;
  --bx-red:#C92A2A; --bx-redS:#FFF5F5;
  --bx-amber:#E67700; --bx-amberS:#FFF3BF;
  --bx-blue:#1971C2; --bx-blueS:#E7F5FF;
  --bx-violet:#7048E8; --bx-violetS:#F3F0FF;
  --bx-mfg:#1a6ef7; --bx-mfgL:#2f74f5; --bx-mfgS:#EAF1FF; --bx-mfgB:#1e3a5f;
  --bx-radius:10px; --bx-rsm:6px;
  padding: 16px;
}
.bomx-two-col { display:grid; grid-template-columns: 340px 1fr; gap:16px; align-items:start; }
@media (max-width:1000px) { .bomx-two-col { grid-template-columns: 1fr; } }


/* ── List panel ── */
.bomx-list-panel { background:var(--bx-surface); border:1px solid var(--bx-border); border-radius:var(--bx-radius); overflow:hidden; display:flex; flex-direction:column; }
.bomx-panel-hdr { padding:12px 14px; border-bottom:1px solid var(--bx-border); background:var(--bx-surf2); display:flex; align-items:center; justify-content:space-between; gap:8px; }
.bomx-panel-title { font-size:13px; font-weight:700; color:var(--bx-text); }
.bomx-count { font-size:12px; font-weight:400; color:var(--bx-muted); }
.bomx-status-filter { margin:8px 12px 0; width:calc(100% - 24px); font-size:12px; padding:6px 10px; }
.bomx-search { width:100%; border:none; outline:none; font-size:13px; padding:10px 14px; margin-top:8px; border-bottom:1px solid var(--bx-border); background:#fff; color:var(--bx-text); }
.bomx-search::placeholder { color:var(--bx-muted); }
.bomx-list { overflow-y:auto; max-height: calc(100vh - 230px); }
.bomx-list-empty { text-align:center; padding:32px; color:var(--bx-muted); font-size:13px; }
.bomx-item { padding:12px 14px; border-bottom:1px solid #F1F3F5; cursor:pointer; transition:background .12s; display:flex; flex-direction:column; gap:4px; }
.bomx-item:hover { background:#FAFBFF; }
.bomx-item.active { background:var(--bx-mfgS); border-left:3px solid var(--bx-mfg); }
.bomx-item-name { font-size:13.5px; font-weight:600; color:var(--bx-text); }
.bomx-item-meta { display:flex; align-items:center; gap:6px; font-size:12px; color:var(--bx-muted); }
.bomx-item-right { display:flex; align-items:center; gap:6px; margin-top:2px; }

/* ── Badges ── */
.bomx-badge { display:inline-flex; align-items:center; padding:2px 8px; border-radius:20px; font-size:11px; font-weight:600; white-space:nowrap; }
.badge-active { background:var(--bx-greenS); color:var(--bx-green); }
.badge-obsolete { background:var(--bx-amberS); color:var(--bx-amber); }
.badge-cancelled { background:var(--bx-redS); color:var(--bx-red); }

/* ── Detail panel ── */
.bomx-detail-panel { background:var(--bx-surface); border:1px solid var(--bx-border); border-radius:var(--bx-radius); overflow:hidden; display:flex; flex-direction:column; min-height: calc(100vh - 100px); }
.bomx-empty-state { text-align:center; padding:60px 20px; color:var(--bx-muted); }
.bomx-empty-icon { font-size:48px; margin-bottom:14px; }
.bomx-empty-title { font-size:16px; font-weight:700; color:var(--bx-text); margin-bottom:6px; }
.bomx-empty-sub { font-size:13px; line-height:1.6; max-width:280px; margin:0 auto 20px; }

.bomx-detail-hdr { padding:18px 22px; background:linear-gradient(135deg, var(--bx-mfgB), var(--bx-mfg)); }
.bomx-detail-title { font-size:18px; font-weight:700; color:#fff; margin-bottom:4px; }
.bomx-detail-meta { font-size:12.5px; color:rgba(255,255,255,.75); display:flex; align-items:center; gap:8px; flex-wrap:wrap; }

.bomx-hdr-fields { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; padding:16px 22px; border-bottom:1px solid var(--bx-border); background:var(--bx-surf2); }
.bomx-hf-label { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--bx-muted); margin-bottom:4px; }
.bomx-field-hint { font-size:12px; color:var(--bx-muted); margin-top:5px; }
.bomx-toggle-row { display:flex; gap:20px; padding:12px 22px; flex-wrap:wrap; background:var(--bx-surf2); border-bottom:1px solid var(--bx-border); }

.bomx-body { padding:20px 22px; overflow-y:auto; flex:1; }
.bomx-section-lbl { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:var(--bx-muted); margin-bottom:8px; }
.bomx-tree-empty { text-align:center; padding:20px; color:var(--bx-muted); font-size:13px; }
.bomx-link { color:var(--bx-mfg); font-weight:600; cursor:pointer; }
.bomx-link:hover { text-decoration:underline; }

/* ── Child-row cards ── */
.bomx-rm-cards { display:flex; flex-direction:column; gap:10px; }
.bomx-rm-card { background:#fff; border:1px solid var(--bx-border); border-radius:var(--bx-radius); overflow:hidden; box-shadow:0 1px 3px rgba(16,24,40,.04); }
.bomx-rm-card-hdr { display:flex; align-items:center; gap:10px; padding:10px 14px; background:var(--bx-mfgS); border-bottom:1px solid var(--bx-border); }
.bomx-rm-card-title { flex:1; min-width:0; font-weight:600; }
.bomx-rm-card-body { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:10px; padding:12px 14px; }
.bomx-rm-field { display:flex; flex-direction:column; gap:4px; min-width:0; }
.bomx-rm-field label { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--bx-muted); }
.bomx-rm-field .bomx-fi { width:100%; }
@media (max-width:640px) {
  .bomx-rm-card-body { grid-template-columns:1fr 1fr; }
}

/* ── Buttons / inputs ── */
.bomx-fi { border:1px solid #CDD5E0; border-radius:var(--bx-rsm); padding:7px 9px; font-size:13px; color:var(--bx-text); background:#fff; outline:none; }
.bomx-fi:focus { border-color:var(--bx-mfg); box-shadow:0 0 0 3px rgba(180,83,9,.1); }
.bomx-fi:disabled { background:#F8F9FC; color:var(--bx-muted); }
select.bomx-fi {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
}
select.bomx-fi:disabled { background-image: none; padding-right: 9px; }
.bomx-btn { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; border-radius:var(--bx-rsm); font-size:13px; font-weight:600; cursor:pointer; border:1px solid transparent; line-height:1; white-space:nowrap; }
.bomx-btn:disabled { opacity:.6; cursor:not-allowed; }
.bomx-btn-sm { padding:6px 10px; font-size:12px; }
.bomx-btn-mfg { background:var(--bx-mfg); color:#fff; }
.bomx-btn-mfg:hover:not(:disabled) { background:var(--bx-mfgB); }
.bomx-btn-light { background:rgba(255,255,255,.92); color:var(--bx-mfgB); }
.bomx-btn-light:hover:not(:disabled) { background:#fff; }
.bomx-btn-ghost-inv { background:rgba(255,255,255,.15); color:#fff; border-color:rgba(255,255,255,.3); }
.bomx-btn-ghost-inv:hover:not(:disabled) { background:rgba(255,255,255,.25); }
.bomx-btn-icon { background:none; border:1px solid var(--bx-border); border-radius:5px; cursor:pointer; padding:4px 6px; display:inline-flex; color:var(--bx-muted); }
.bomx-btn-icon:hover { border-color:var(--bx-mfg); color:var(--bx-mfg); background:var(--bx-mfgS); }
.bomx-btn-icon.danger { color:var(--bx-red); }
.bomx-btn-icon.danger:hover { background:var(--bx-redS); border-color:var(--bx-red); }

.shimmer { background:linear-gradient(90deg,#f1f3f5 25%,#e9ecef 37%,#f1f3f5 63%); background-size:400% 100%; animation:shimmer 1.4s ease infinite; }
@keyframes shimmer { 0%{background-position:100% 50%} 100%{background-position:0 50%} }

/* ── Mobile responsive ── */
@media (max-width:768px) {
  .bomx-page { padding:10px; overflow-x:hidden; }
  .bomx-two-col { gap:12px; }
  .bomx-list { max-height:280px; }
  .bomx-detail-panel { min-height:auto; }

  .bomx-detail-hdr { padding:14px 16px; }
  .bomx-detail-title { font-size:16px; }

  .bomx-hdr-fields { grid-template-columns:1fr; padding:12px 16px; gap:10px; }
  .bomx-toggle-row { padding:10px 16px; }
  .bomx-body { padding:14px 16px; }

  .bomx-rm-card-body { grid-template-columns:1fr 1fr; }
}

@media (max-width:420px) {
  .bomx-rm-card-body { grid-template-columns:1fr; }
}
</style>