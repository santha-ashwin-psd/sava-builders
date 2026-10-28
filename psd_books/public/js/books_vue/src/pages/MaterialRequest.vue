<template>
<div class="bomx-page">
  <!-- ══════════ LIST VIEW ══════════ -->
  <div class="mrl">
    <div class="mrl-toolbar">
      <div class="mrl-search">
        <span v-html="icon('search',13)" style="color:#9ca3af;flex-shrink:0"></span>
        <input v-model="search" type="text" placeholder="Search material requests..." />
      </div>
      <div class="mrl-pills">
        <button v-for="t in statusTabs" :key="t" class="mrl-pill" :class="{active: filterStatus===t}" @click="filterStatus=t">{{ t || 'All' }}</button>
      </div>
      <div class="mrl-actions">
        <select v-model="filterType" class="mrl-select">
          <option value="">All Types</option>
          <option value="Purchase">Purchase</option>
          <option value="Asset">Asset</option>
<option value="Material Transfer">Material Transfer</option>
        </select>
        <button class="mrl-btn" @click="reloadList" title="Refresh" :disabled="loading"><span v-html="icon('refresh',14)"></span></button>
        <button class="mrl-btn" @click="exportCSV" :disabled="!sorted.length"><span v-html="icon('download',14)"></span> CSV</button>
        <button class="mrl-btn mrl-btn-pri" :disabled="!canRaiseMR" :title="!canRaiseMR ? MR_CREATOR_NOTE : ''" @click="openAdd"><span v-html="icon('plus',13)"></span> New Material Request</button>
      </div>
    </div>

    <div class="mrl-kpis">
      <div v-for="k in kpis" :key="k.key" class="mrl-kpi mrl-kpi-click" :class="['mrl-kpi-' + k.key, { 'mrl-kpi-on': filterStatus === k.filter }]" role="button" tabindex="0" :title="'Show ' + k.label.toLowerCase()" @click="filterStatus = k.filter" @keydown.enter="filterStatus = k.filter">
        <div class="mrl-kpi-icon" v-html="icon(k.icon, 20)"></div>
        <div>
          <div class="mrl-kpi-label">{{ k.label }}</div>
          <div class="mrl-kpi-value">{{ k.value }}</div>
          <div class="mrl-kpi-sub">{{ k.sub }}</div>
        </div>
      </div>
    </div>

    <div class="mrl-table-wrap">
      <table class="mrl-table">
        <thead><tr>
          <th>Material Request No.</th><th>Request Type</th><th>Reference</th><th>Requested Date</th><th>Requested By</th><th>Status</th><th style="text-align:center">Actions</th>
        </tr></thead>
        <tbody>
          <template v-if="loading"><tr v-for="n in 5" :key="n"><td colspan="7"><div class="shimmer" style="height:26px;border-radius:6px"></div></td></tr></template>
          <tr v-else-if="!sorted.length"><td colspan="7" class="mrl-empty">No Material Requests found</td></tr>
          <tr v-else v-for="row in paged" :key="row.name" class="mrl-row" @click="selectMR(row.name)">
            <td><span class="mrl-link">{{ row.name }}</span></td>
            <td>{{ row.material_request_type || '—' }}</td>
            <td>{{ refLabel(row) }}</td>
            <td>{{ fmtDate(row.posting_date) }}</td>
            <td>{{ row.owner ? ownerName(row.owner) : '—' }}</td>
            <td><span class="bomx-badge" :class="statusClass(row)">{{ row.status }}</span></td>
            <td style="text-align:center" @click.stop><button class="mrl-act" title="Open" @click="selectMR(row.name)"><span v-html="icon('ext',13)"></span></button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!loading && sorted.length" class="mrl-foot">
      <Pagination v-model:page="page" v-model:page-size="pageSize" :total-items="sorted.length" />
    </div>
  </div>

    <!-- ══════════ DETAIL ══════════ -->
    <div v-if="selectedName" class="mr-drawer-overlay">
    <div class="mr-drawer">

      <template v-if="selectedName">
        <div v-if="loading" class="bomx-empty-state"><div class="shimmer" style="height:200px;border-radius:10px"></div></div>

        <template v-else>
          <!-- Header -->
          <div class="bomx-detail-hdr">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">
              <div style="min-width:0;display:flex;align-items:center;gap:12px">
                <div>
                <div class="bomx-detail-title">{{ isNew ? 'New Material Request' : mr.name }}<span v-if="isNew" class="mr-draft-badge">Draft</span></div>
                <div class="bomx-detail-meta">
                  <span v-if="isNew">Create a new material request</span>
                  <span v-if="!isNew">{{ mr.material_request_type }}</span>
                  <span v-if="!isNew">•</span>
                  <span v-if="!isNew">{{ fmtDate(mr.posting_date) }}</span>
                  <span v-if="!isNew">•</span>
                  <span class="bomx-badge" :class="statusClass(mr)" style="font-size:11px" v-if="!isNew">{{ mr.status }}</span>
                </div>
                </div>
              </div>
              <div style="display:flex;gap:6px;flex-shrink:0;flex-wrap:wrap;justify-content:flex-end">
                <button v-if="!isNew" class="bomx-btn bomx-btn-light" @click="printMR"><span v-html="icon('printer',12)"></span> Print</button>
                <button v-if="!isNew && (mr.docstatus===0 || mr.docstatus===2)" class="bomx-btn" style="background:var(--bx-redS);color:var(--bx-red)" @click="deleteMR" :disabled="submitting || saving || !canDeleteMR" :title="!canDeleteMR ? MR_CANCEL_NOTE : 'Delete this Material Request'">
                  <span v-html="icon('trash',12)"></span> Delete
                </button>
                <button v-if="!isNew && mr.docstatus===2" class="bomx-btn bomx-btn-light" @click="amendMR" :disabled="submitting || !canRaiseMR">
                  {{ submitting ? 'Amending…' : 'Amend' }}
                </button>
                <button v-if="!isNew && mr.docstatus===1" class="bomx-btn" style="background:var(--bx-redS);color:var(--bx-red)" @click="cancelMR" :disabled="submitting || !canCancelMR" :title="!canCancelMR ? MR_CANCEL_NOTE : ''">
                  {{ submitting ? 'Cancelling…' : 'Cancel' }}
                </button>
                <button v-if="SHOW_CREATE_PO && !isNew && mr.docstatus===1 && isPurchaseLike && mr.status !== 'Ordered'" class="bomx-btn" style="background:var(--bx-blueS);color:var(--bx-blue)" @click="createPurchaseOrder" :disabled="actionLoading==='po' || !canCreatePO || !!linkedNote" :title="!canCreatePO ? PO_NOTE : linkedNote">
                  {{ actionLoading === 'po' ? 'Creating…' : 'Create Purchase Order' }}
                </button>
                <span v-if="!isNew && mr.docstatus===1 && isPurchaseLike && mr.status === 'Ordered'" class="bomx-badge badge-active" style="align-self:center">Purchase Order Created</span>
                <button v-if="!isNew && mr.docstatus===1 && isPurchaseLike && (mr.status==='Approved' || mr.status==='Partly Issued')" class="bomx-btn" style="background:var(--bx-blueS);color:var(--bx-blue)" @click="createRfq" :disabled="!canCreateRFQ || !!linkedNote" :title="!canCreateRFQ ? RFQ_NOTE : linkedNote">
                  Create RFQ
                </button>
                <button v-if="!isNew && mr.docstatus===1 && !isPurchaseLike && (mr.status==='Approved' || mr.status==='Partly Issued')" class="bomx-btn" style="background:var(--bx-blueS);color:var(--bx-blue)" @click="issueFromStore" :disabled="!canIssueStock" :title="!canIssueStock ? ISSUE_NOTE : ''">
                  Issue from Store
                </button>
                <button v-if="!isNew && mr.docstatus===0 && mr.production_plan" class="bomx-btn bomx-btn-light" @click="submitMR" :disabled="submitting || saving || !$canEdit('inventory')">
                  {{ submitting ? 'Submitting…' : 'Submit' }}
                </button>
                <button v-if="!isNew && mr.docstatus===0 && !mr.production_plan && (mr.status==='Draft' || mr.status==='Sent Back')" class="bomx-btn bomx-btn-light" @click="sendForApproval" :disabled="submitting || saving || !$canEdit('inventory')">
                  {{ submitting ? 'Sending…' : 'Send for Approval' }}
                </button>
                <button v-if="!isNew && mr.docstatus===0 && mr.status==='Pending Approval' && approval.can_approve && !showSendBack" class="bomx-btn bomx-btn-light" @click="approveMR" :disabled="submitting">
                  {{ submitting ? 'Approving…' : 'Approve' }}
                </button>
                <button v-if="!isNew && mr.docstatus===0 && mr.status==='Pending Approval' && approval.can_approve && !showSendBack" class="bomx-btn bomx-btn-light" @click="showSendBack = true" :disabled="submitting">
                  Send Back
                </button>
                <button v-if="!readOnly && !isNew" class="bomx-btn bomx-btn-light" @click="save" :disabled="saving || loading || !(isNew ? canRaiseMR : canEditMR)">
                  {{ saving ? 'Saving…' : (isNew ? 'Save Material Request' : 'Save Changes') }}
                </button>
                <button class="mr-drawer-x" @click="goBackToList" :disabled="saving || submitting" title="Close"><span v-html="icon('x',16)"></span></button>
              </div>
            </div>
          </div>

          <div v-if="showFollowOnNotes" class="bomx-who-note" style="margin:10px 16px">
            <div v-for="n in followOnNotes" :key="n">{{ n }}</div>
          </div>
          <div v-if="isNew && !canRaiseMR" class="bomx-who-note" style="margin:10px 16px">{{ MR_CREATOR_NOTE }} You can view this form but not save it.</div>
          <div class="bomx-toggle-row" v-if="!isNew && mr.status==='Pending Approval'">
            <div class="bomx-field-hint" style="margin:0">
              <template v-if="approval.can_approve">Waiting for your approval.</template>
              <template v-else>Waiting for approval by {{ approval.project_manager ? ownerName(approval.project_manager) : 'the Project Manager' }}.</template>
            </div>
          </div>
          <div class="bomx-toggle-row" v-if="!isNew && mr.status==='Pending Approval' && approval.can_approve && showSendBack" style="align-items:flex-start">
            <textarea class="bomx-fi" v-model="sendBackReason" rows="2" placeholder="Reason for sending back (required)" style="flex:1;min-width:260px;resize:vertical"></textarea>
            <button class="mrx-sb-confirm" @click="sendBackMR" :disabled="submitting || !sendBackReason.trim()">{{ submitting ? 'Sending…' : 'Confirm Send Back' }}</button>
            <button class="mrx-sb-cancel" @click="showSendBack = false; sendBackReason = ''" :disabled="submitting">Cancel</button>
          </div>
          <div class="mrx-sb-note" v-if="!isNew && mr.status==='Sent Back' && mr.docstatus===0">
            <span class="mrx-sb-tag">Sent Back</span>
            <div>
              <div class="mrx-sb-reason">{{ mr.send_back_reason }}</div>
              <div class="mrx-sb-meta">Sent back by {{ ownerName(mr.sent_back_by) }} on {{ fmtDate(mr.sent_back_on) }}. Correct it and send it for approval again.</div>
            </div>
          </div>

          <!-- Header fields -->
          <div class="bomx-hdr-fields">
            <div>
              <div class="bomx-hf-label">Purpose <span style="color:var(--bx-red)">*</span></div>
              <select class="bomx-fi" v-model="mr.material_request_type" :disabled="readOnly" style="width:100%" @change="onPurposeChange">
                <option value="Purchase">Purchase</option>
                <option value="Asset">Asset</option>
<option value="Material Transfer">Material Transfer</option>
              </select>
            </div>
            <div>
              <div class="bomx-hf-label">Required By <span style="color:var(--bx-red)">*</span></div>
              <input class="bomx-fi" type="date" v-model="mr.posting_date" :disabled="readOnly" style="width:100%"/>
            </div>
            <div>
              <div class="bomx-hf-label">Project <span v-if="!mr.production_plan" style="color:var(--bx-red)">*</span></div>
              <SearchableSelect v-model="mr.project" :options="projects" :disabled="readOnly" placeholder="Select project" @update:modelValue="onProjectPicked" @search="q => fetchProjects(q, mr.project)" />
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
            <div class="mrx-items" :class="{ 'mrx-has-wh': mr.production_plan }" style="margin-bottom:20px">
              <div v-if="!mr.items || !mr.items.length" class="bomx-tree-empty">No items yet. Add a row or create from Production Plan.</div>
              <template v-else>
                <div class="mrx-head">
                  <span class="mrx-c-no">#</span>
                  <span>Item</span>
                  <span>Required Qty</span>
                  <span>UOM</span>
                  <span v-if="mr.production_plan">Warehouse</span>
                  <span v-if="!readOnly"></span>
                </div>
                <div v-for="(row, idx) in mr.items" :key="idx" class="mrx-row">
                  <span class="mrx-c-no">{{ idx + 1 }}</span>
                  <SearchableSelect v-model="row.item_code" :options="ssOpts2" placeholder="— Select Item —" :disabled="readOnly" @select="onItemChange(row)" compact />
                  <input class="bomx-fi bomx-fi-mono" type="number" v-model="row.required_qty" min="0.001" step="any" :disabled="readOnly"/>
                  <SearchableSelect v-model="row.uom" :options="ssOpts3" placeholder="—" :disabled="readOnly" compact />
                  <SearchableSelect v-if="mr.production_plan" v-model="row.warehouse" :options="ssOpts4" placeholder="— Select —" :disabled="readOnly" compact />
                  <button v-if="!readOnly" class="bomx-btn-icon danger" @click="mr.items.splice(idx,1)" title="Remove row">
                    <span v-html="icon('trash',13)"></span>
                  </button>
                </div>
              </template>
              <button v-if="!readOnly && mr.items && mr.items.length" class="mrx-add" @click="addItem">
                <span v-html="icon('plus',12)"></span> Add another item
              </button>
            </div>

            <div class="bomx-section-lbl">Remarks</div>
            <textarea class="bomx-fi" v-model="mr.remarks" rows="3" :disabled="readOnly" style="width:100%;min-height:90px;resize:vertical" placeholder="Optional notes…"></textarea>

            <div class="inv-view-footer" v-if="!isNew && mr.owner">
              Created by {{ ownerName(mr.owner) }} on {{ fmtDate(mr.creation) }}
              <template v-if="mr.approved_by"> · Approved by {{ ownerName(mr.approved_by) }} on {{ fmtDate(mr.approved_on) }}</template>
              <template v-if="mr.modified_by"> · Last modified by {{ ownerName(mr.modified_by) }} on {{ fmtDate(mr.modified) }}</template>
            </div>
          </div>
          <div v-if="isNew" class="mr-drawer-foot">
            <span class="mr-drawer-foot-note">New material request — unsaved</span>
            <div style="display:flex;gap:10px">
              <button class="mr-btn-cancel" @click="goBackToList" :disabled="saving">Cancel</button>
              <button class="mr-btn-save" @click="save" :disabled="saving || loading || readOnly || !canRaiseMR" :title="!canRaiseMR ? MR_CREATOR_NOTE : ''"><span v-html="icon('file',14)"></span> {{ saving ? 'Saving…' : 'Save Material Request' }}</button>
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
import { apiGet, apiGET, apiPOST, apiSave, apiList, apiSubmit, apiCancel, apiAmend, apiDelete, resolveCompany } from "../api/client.js";
import { ownerName } from "../utils/userNames.js";
import { useLivePreview, MR_PRINT_CONFIG, prepareMRPrint } from "../composables/useLivePreview.js";
import DocLink from "../components/DocLink.vue";
import Pagination from "../components/Pagination.vue";
import { icon as sharedIcon } from "../utils/icons.js";
import { useToast } from "../composables/useToast.js";
import { usePermissions } from "../composables/usePermissions.js";
import { useConfirm } from "../composables/useConfirm.js";

// Purchase Orders are made only from an RFQ comparison (Sava). Set to true to show "Create Purchase Order" on a Material Request again.
const SHOW_CREATE_PO = false;

const { printDoc } = useLivePreview();
async function printMR() {
  const d = await prepareMRPrint({ ...mr.value, requested_by_name: ownerName(mr.value.owner), approved_by_name: mr.value.approved_by ? ownerName(mr.value.approved_by) : "" });
  printDoc(d, { ...MR_PRINT_CONFIG, companyName: mr.value.company || "" });
}

const route = useRoute();
const router = useRouter();
const { toast } = useToast();
const { confirm } = useConfirm();

// ── LIST STATE ──────────────────────────────────────────────
const loading = ref(false);
const list = ref([]);
const search = ref("");
const filterStatus = ref("");
const filterType = ref("");
const page = ref(1);
const pageSize = ref(25);
const projectNames = ref({});

const statusOptions = ["Draft", "Pending Approval", "Sent Back", "Approved", "Partly Issued", "Issued", "Submitted", "Ordered", "Cancelled"];

const selectedName = computed(() => (route.params.name && route.params.name !== "new") ? route.params.name : (route.params.name === "new" ? "new" : null));

async function loadList() {
  try {
    const fields = ["name", "material_request_type", "posting_date", "production_plan", "project", "owner", "status", "docstatus", "modified"];
    const r = await apiList("Material Request", { fields, limit: 1000, order: "modified desc" });
    list.value = r || [];
  } catch (e) {
    toast("Could not load Material Requests: " + e.message, "error");
  }
  try {
    const pr = await apiList("Project", { fields: ["name", "project_name"], limit: 1000 });
    projectNames.value = Object.fromEntries((pr || []).map(x => [x.name, x.project_name]));
  } catch (e) { projectNames.value = {}; }
}
async function reloadList() {
  loading.value = true;
  try { await loadList(); } finally { loading.value = false; }
}
function refLabel(row) {
  if (row.project) return projectNames.value[row.project] || row.project;
  return row.production_plan || "—";
}

const sorted = computed(() => {
  let r = list.value;
  if (filterStatus.value === ACTIVE_KEY) r = r.filter(i => ACTIVE_STATUSES.includes(i.status));
  else if (filterStatus.value) r = r.filter(i => i.status === filterStatus.value);
  if (filterType.value) r = r.filter(i => i.material_request_type === filterType.value);
  const q = search.value.toLowerCase().trim();
  if (q) r = r.filter(i => [i.name, i.material_request_type, i.production_plan, refLabel(i), i.owner ? ownerName(i.owner) : ""].filter(Boolean).join(" ").toLowerCase().includes(q));
  return r;
});
const paged = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return sorted.value.slice(start, start + pageSize.value);
});
watch([search, filterStatus, filterType], () => { page.value = 1; });

const ACTIVE_KEY = "__active";
const ACTIVE_STATUSES = ["Draft", "Pending Approval", "Sent Back", "Approved", "Partly Issued"];
const statusTabs = ["", "Ordered", "Approved", "Pending Approval", "Partly Issued", "Issued", "Draft", "Sent Back", "Cancelled"];
const kpis = computed(() => {
  const l = list.value;
  const n = st => l.filter(i => i.status === st).length;
  const active = l.filter(i => ACTIVE_STATUSES.includes(i.status)).length;
  return [
    { key: "total", label: "TOTAL MATERIAL REQUESTS", value: l.length, sub: "All material requests", icon: "file", filter: "" },
    { key: "active", label: "ACTIVE REQUESTS", value: active, sub: "Currently open", icon: "activity", filter: ACTIVE_KEY },
    { key: "ordered", label: "ORDERED", value: n("Ordered"), sub: "Material requests ordered", icon: "check", filter: "Ordered" },
    { key: "pending", label: "PENDING APPROVAL", value: n("Pending Approval"), sub: "Awaiting approval", icon: "alert", filter: "Pending Approval" },
  ];
});
function exportCSV() {
  const headers = ["Material Request No.", "Request Type", "Reference", "Requested Date", "Requested By", "Status"];
  const rows = sorted.value.map(r => [r.name, r.material_request_type || "", refLabel(r), r.posting_date || "", r.owner ? ownerName(r.owner) : "", r.status || ""]);
  const csv = [headers, ...rows].map(row => row.map(v => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url; a.download = "material_requests.csv"; a.click();
  URL.revokeObjectURL(url);
}

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
  if (!canRaiseMR.value) { toast(MR_CREATOR_NOTE, "error"); return; }
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
const isPurchaseLike = computed(() => ["Purchase", "Asset"].includes(mr.value && mr.value.material_request_type));
const uomList = ref([]);
const warehouseList = ref([]);

// Who may raise a material request is decided on the server (Site Engineer, Books Admin, Director);
// doc_access carries that answer to the screen. These only disable buttons / fields.
const { isAdmin, flags } = usePermissions();
const MR_CREATOR_NOTE = "Only a Site Engineer, Books Admin or Director can raise a material request.";
const canRaiseMR = computed(() => isAdmin.value || !!flags.value.doc_access?.["Material Request"]?.create);
const canEditMR = computed(() => isAdmin.value || !!flags.value.doc_access?.["Material Request"]?.edit);
// Who may cancel or delete one is decided on the server (Site Engineer, Purchase Officer, Purchase Manager, Director, Books Admin).
const MR_CANCEL_NOTE = "Only a Site Engineer, Purchase Officer, Purchase Manager, Director or Books Admin can cancel or delete a material request.";
const canCancelMR = computed(() => isAdmin.value || !!flags.value.doc_access?.["Material Request"]?.cancel);
const canDeleteMR = computed(() => isAdmin.value || !!flags.value.doc_access?.["Material Request"]?.delete);
// Follow-on documents from an approved MRN: who may create each (the server enforces the same rules).
const PO_NOTE = "Only a Purchase Officer, Books Admin or Director can create a purchase order.";
const RFQ_NOTE = "Only a Purchase Officer, Books Admin or Director can create an RFQ.";
const ISSUE_NOTE = "Only a Store Keeper, Books Admin or Director can issue stock from the store.";
const docRight = (dt) => isAdmin.value || !!flags.value.doc_access?.[dt]?.create;
const canCreatePO = computed(() => docRight("Purchase Order"));
const canCreateRFQ = computed(() => docRight("Request for Quotation"));
const canIssueStock = computed(() => docRight("Delivery Note"));
// An RFQ or purchase order already made from this MRN locks both buttons, so they can't be created twice.
// Cancelled ones don't count. Looked up when the MRN is loaded.
const linkedDocs = ref({ rfq: "", po: "" });
const linkedNote = computed(() => {
  const { rfq, po } = linkedDocs.value;
  if (rfq && po) return `RFQ ${rfq} and purchase order ${po} already exist for this request.`;
  if (rfq) return `RFQ ${rfq} already exists for this request.`;
  if (po) return `Purchase order ${po} already exists for this request.`;
  return "";
});
async function loadLinkedDocs() {
  linkedDocs.value = { rfq: "", po: "" };
  const m = mr.value;
  if (!m || !m.name || m.docstatus !== 1 || !["Purchase", "Asset"].includes(m.material_request_type)) return;
  const first = async (dt, filters) => {
    try { return ((await apiList(dt, { fields: ["name"], filters, limit: 1 })) || [])[0]?.name || ""; }
    catch { return ""; }
  };
  const [rfq, po] = await Promise.all([
    first("Request for Quotation", [["material_request", "=", m.name], ["status", "!=", "Cancelled"]]),
    first("Purchase Order", [["material_request", "=", m.name], ["docstatus", "!=", 2]]),
  ]);
  if (mr.value && mr.value.name === m.name) linkedDocs.value = { rfq, po };
}
const followOnNotes = computed(() => {
  const out = [];
  if (isPurchaseLike.value) {
    if (!canCreatePO.value) out.push(PO_NOTE);
    if (!canCreateRFQ.value) out.push(RFQ_NOTE);
  }
  if (!isPurchaseLike.value && !canIssueStock.value) out.push(ISSUE_NOTE);
  return out;
});
const showFollowOnNotes = computed(() => !isNew.value && mr.value.docstatus === 1 &&
  (mr.value.status === "Approved" || mr.value.status === "Partly Issued") && followOnNotes.value.length > 0);

const readOnly = computed(() => (isNew.value && !canRaiseMR.value) ||
  (!isNew.value && (mr.value.docstatus === 1 || mr.value.docstatus === 2 || mr.value.status === "Pending Approval")));
const approval = ref({ can_approve: false, project_manager: "", reason: "" });
const showSendBack = ref(false);
const sendBackReason = ref("");

onMounted(async () => {
  loading.value = true;
  try {
    const co = await resolveCompany();

    [companiesList.value, itemsList.value, uomList.value] = await Promise.all([
      apiList("Company", { fields: ["name"], limit: 100000 }),
      apiList("Item", { fields: ["name", "item_name", "stock_uom", "is_asset_item"], filters: [["disabled", "=", 0]], limit: 5000, order: "name asc" }),
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

// Picking a project fills Delivery Warehouse from the project's own store (if it has one).
// A project with no store leaves the field as it is; the user can still change it by hand.
async function onProjectPicked(proj) {
  if (!proj || readOnly.value) return;
  try {
    const rows = await apiList("Project", { fields: ["warehouse"], filters: [["name", "=", proj]], limit: 1 });
    const wh = rows && rows[0] && rows[0].warehouse;
    if (!wh || mr.value.project !== proj) return;
    if (!warehouseList.value.some(w => w.name === wh)) warehouseList.value.push({ name: wh });
    mr.value.delivery_warehouse = wh;
  } catch (e) { /* leave the warehouse as it is */ }
}

async function loadMR() {
  const data = await apiGet("Material Request", route.params.name);
  mr.value = data;
  if (!mr.value.items) mr.value.items = [];
  if (mr.value.project) fetchProjects("", mr.value.project);
  await loadApproval();
  loadLinkedDocs();
}

async function loadApproval() {
  approval.value = { can_approve: false, project_manager: "", reason: "" };
  if (!mr.value.name || mr.value.status !== "Pending Approval") return;
  try {
    approval.value = await apiGET("psd_books.api.mrn.get_approval_state", { name: mr.value.name });
  } catch (e) { /* the buttons simply stay hidden */ }
}

async function sendForApproval() {
  if (!mr.value.name) return;
  submitting.value = true;
  try {
    await apiPOST("psd_books.api.mrn.send_for_approval", { name: mr.value.name });
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
    await apiPOST("psd_books.api.mrn.send_back_mrn", { name: mr.value.name, reason: sendBackReason.value.trim() });
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
    await apiPOST("psd_books.api.mrn.approve_mrn", { name: mr.value.name });
    toast("Material Request approved");
    await loadMR();
    loadList();
  } catch (e) {
    toast(e.message, "error");
  }
  submitting.value = false;
}

function addItem() {
  mr.value.items.push({ item_code: "", item_name: "", required_qty: 1, uom: "", warehouse: "" });
}

function itemAllowed(i) {
  const t = mr.value.material_request_type;
  if (t === "Asset") return !!i.is_asset_item;
  if (t === "Purchase") return !i.is_asset_item;
  return true;
}

function onPurposeChange() {
  const byCode = {};
  (itemsList.value || []).forEach(i => { byCode[i.name] = i; });
  let cleared = 0;
  for (const r of mr.value.items || []) {
    if (r.item_code && byCode[r.item_code] && !itemAllowed(byCode[r.item_code])) { r.item_code = ""; r.item_name = ""; r.uom = ""; cleared++; }
  }
  if (cleared) toast(`${cleared} item${cleared > 1 ? "s" : ""} cleared. They don't match the ${mr.value.material_request_type} purpose.`, "error");
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

// Delete a Material Request raised by mistake. Only a draft / pending / sent-back request or a cancelled one
// can be deleted (a submitted one is cancelled first). Blocked while a live RFQ, Purchase Order or Delivery
// Note / Store Issue still points at it, because the server delete skips Frappe's linked-document check.
async function liveLinksOf(name) {
  const first = async (dt, filters) => {
    try { return ((await apiList(dt, { fields: ["name"], filters, limit: 1 })) || [])[0]?.name || ""; }
    catch { return ""; }
  };
  const [rfq, po, dn] = await Promise.all([
    first("Request for Quotation", [["material_request", "=", name], ["status", "!=", "Cancelled"]]),
    first("Purchase Order", [["material_request", "=", name], ["docstatus", "!=", 2]]),
    first("Delivery Note", [["material_request", "=", name], ["docstatus", "!=", 2]]),
  ]);
  return [rfq && `RFQ ${rfq}`, po && `Purchase Order ${po}`, dn && `Delivery Note ${dn}`].filter(Boolean);
}

async function deleteMR() {
  const name = mr.value.name;
  if (!name || ![0, 2].includes(mr.value.docstatus)) return;
  submitting.value = true;
  try {
    const links = await liveLinksOf(name);
    if (links.length) { toast(`Cannot delete ${name}: it is used by ${links.join(", ")}. Cancel or delete that first.`, "error"); return; }
    submitting.value = false;
    if (!(await confirm({ title: "Delete Material Request?", body: `Delete ${name} permanently? This cannot be undone.`, okLabel: "Delete", okStyle: "danger" }))) return;
    submitting.value = true;
    await apiDelete("Material Request", name);
    toast(`${name} deleted`);
    mr.value = emptyMR();
    await loadList();
    goBackToList();
  } catch (e) {
    toast(e.message || "Delete failed", "error");
  } finally {
    submitting.value = false;
  }
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
  if (!canCreatePO.value) { toast(PO_NOTE, "error"); return; }
  if (linkedNote.value) { toast(linkedNote.value, "error"); return; }
  router.push(`/purchase-orders?new_from_mr=${mr.value.name}`);
}

function createRfq() {
  if (!canCreateRFQ.value) { toast(RFQ_NOTE, "error"); return; }
  if (linkedNote.value) { toast(linkedNote.value, "error"); return; }
  router.push(`/rfqs?new_from_mrn=${encodeURIComponent(mr.value.name)}`);
}

function issueFromStore() {
  if (!canIssueStock.value) { toast(ISSUE_NOTE, "error"); return; }
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
  if (!ICONS[name]) return sharedIcon(name, size);
  return (ICONS[name] || "").replace("<svg ", `<svg width="${size}" height="${size}" `);
}

// ── Searchable dropdown options (typing filters the list) ──
const ssOpts1 = computed(() => [{ value: '', label: 'All Status' }, ...(statusOptions || []).map(s => ({ value: s, label: s }))]);
const ssOpts2 = computed(() => [{ value: '', label: '— Select Item —' }, ...(itemsList.value || []).filter(i => itemAllowed(i) || (mr.value.items || []).some(r => r.item_code === i.name)).map(i => ({ value: i.name, label: i.item_name || i.name }))]);
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

/* ── Send back actions + notice ── */
.mrx-sb-confirm { padding:8px 16px; border:none; border-radius:8px; background:#dc2626; color:#fff; font-size:13px; font-weight:700; cursor:pointer; box-shadow:0 1px 2px rgba(220,38,38,.35); }
.mrx-sb-confirm:hover:not(:disabled) { background:#b91c1c; }
.mrx-sb-confirm:disabled { opacity:.45; cursor:not-allowed; box-shadow:none; }
.mrx-sb-cancel { padding:7px 16px; border:1.5px solid #94a3b8; border-radius:8px; background:#fff; color:#334155; font-size:13px; font-weight:600; cursor:pointer; }
.mrx-sb-cancel:hover:not(:disabled) { background:#f1f5f9; border-color:#64748b; }
.mrx-sb-note { display:flex; align-items:flex-start; gap:12px; margin:0; padding:12px 22px; background:#fef2f2; border-bottom:1px solid #fecaca; border-left:4px solid #dc2626; }
.mrx-sb-tag { flex-shrink:0; padding:3px 10px; border-radius:999px; background:#dc2626; color:#fff; font-size:11px; font-weight:700; letter-spacing:.03em; text-transform:uppercase; }
.mrx-sb-reason { font-size:14px; font-weight:700; color:#991b1b; }
.mrx-sb-meta { margin-top:2px; font-size:12px; color:#7f1d1d; }

/* ── Compact item rows (New / edit Material Request) ── */
.mrx-items { background:#fff; border:1px solid var(--bx-border); border-radius:var(--bx-radius); box-shadow:0 1px 3px rgba(16,24,40,.04); overflow:hidden; --mrx-cols:34px minmax(0,1fr) 110px 130px 32px; }
.mrx-items.mrx-has-wh { --mrx-cols:34px minmax(0,1fr) 110px 130px minmax(0,.8fr) 32px; }
.mrx-head, .mrx-row { display:grid; grid-template-columns:var(--mrx-cols); gap:10px; align-items:center; padding:0 14px; }
.mrx-head { padding-top:9px; padding-bottom:9px; background:var(--bx-mfgS); border-bottom:1px solid var(--bx-border); font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--bx-muted); }
.mrx-row { padding-top:6px; padding-bottom:6px; border-bottom:1px solid #eef1f5; }
.mrx-row:hover { background:#fafbfd; }
.mrx-c-no { text-align:center; font-size:12px; color:var(--bx-muted); }
.mrx-row .bomx-fi { width:100%; }
.mrx-add { display:flex; align-items:center; justify-content:center; gap:6px; width:100%; padding:10px; border:none; background:#fff; color:var(--bx-mfgB); font-size:13px; font-weight:600; cursor:pointer; }
.mrx-add:hover { background:var(--bx-mfgS); }
@media (max-width:640px) {
  .mrx-head { display:none; }
  .mrx-row, .mrx-items.mrx-has-wh .mrx-row { grid-template-columns:28px minmax(0,1fr) 32px; row-gap:6px; padding:10px 12px; }
  .mrx-row > :nth-child(3), .mrx-row > :nth-child(4), .mrx-row > :nth-child(5) { grid-column:2; }
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
.bomx-who-note { font-size:11.5px; color:var(--bx-muted); background:#F8F9FC; border:1px solid #E4E8F0; border-radius:8px; padding:6px 10px; margin:8px 10px; line-height:1.4; }
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

/* ── List view (table + KPI cards) ── */
.mrl-toolbar { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:16px; }
.mrl-search { display:flex; align-items:center; gap:8px; background:#fff; border:1px solid #e5e7eb; border-radius:999px; padding:0 14px; height:36px; min-width:240px; }
.mrl-search input { border:none; outline:none; background:transparent; font-size:13px; width:100%; }
.mrl-pills { display:flex; gap:8px; flex-wrap:wrap; }
.mrl-pill { height:34px; padding:0 14px; border:1px solid #e5e7eb; background:#fff; border-radius:999px; font-size:12.5px; font-weight:500; color:#111827; cursor:pointer; }
.mrl-pill.active { background:#1a6ef7; border-color:#1a6ef7; color:#fff; font-weight:600; }
.mrl-actions { display:flex; align-items:center; gap:8px; margin-left:auto; }
.mrl-select { height:34px; border:1px solid #e5e7eb; background:#fff; border-radius:8px; padding:0 10px; font-size:12.5px; }
.mrl-btn { display:inline-flex; align-items:center; gap:6px; height:34px; padding:0 12px; border:1px solid #e5e7eb; background:#fff; border-radius:8px; font-size:12.5px; font-weight:600; cursor:pointer; color:#111827; }
.mrl-btn:disabled { opacity:.55; cursor:not-allowed; }
.mrl-btn-pri { background:#1a6ef7; border-color:#1a6ef7; color:#fff; }
.mrl-kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:18px; }
.mrl-kpi { display:flex; align-items:center; gap:16px; padding:20px 22px; border:1px solid #e5e7eb; border-radius:14px; background:#fff; }
.mrl-kpi-icon { width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.mrl-kpi-label { font-size:11.5px; font-weight:600; letter-spacing:.06em; color:#4b5563; }
.mrl-kpi-value { font-size:28px; font-weight:800; color:#111827; line-height:1.15; }
.mrl-kpi-sub { font-size:12px; color:#6b7280; margin-top:2px; }
.mrl-kpi-click { cursor:pointer; transition:box-shadow .15s, transform .15s, border-color .15s; }
.mrl-kpi-click:hover { box-shadow:0 4px 14px rgba(15,23,42,.08); transform:translateY(-1px); }
.mrl-kpi-on { border-color:#2563eb !important; box-shadow:0 0 0 2px rgba(37,99,235,.25); }
.mrl-kpi-total { background:linear-gradient(135deg,#eff6ff,#fff); border-color:#dbeafe; } .mrl-kpi-total .mrl-kpi-icon { background:#dbeafe; color:#2563eb; }
.mrl-kpi-active .mrl-kpi-icon { background:#ede9fe; color:#7c3aed; }
.mrl-kpi-ordered { background:linear-gradient(135deg,#ecfdf5,#fff); border-color:#bbf7d0; } .mrl-kpi-ordered .mrl-kpi-icon { background:#d1fae5; color:#16a34a; } .mrl-kpi-ordered .mrl-kpi-value { color:#16a34a; }
.mrl-kpi-pending { background:linear-gradient(135deg,#fef2f2,#fff); border-color:#fecaca; } .mrl-kpi-pending .mrl-kpi-icon { background:#fee2e2; color:#dc2626; } .mrl-kpi-pending .mrl-kpi-value { color:#dc2626; }
.mrl-table-wrap { background:#fff; border:1px solid #e5e7eb; border-radius:12px; overflow-x:auto; }
.mrl-table { width:100%; border-collapse:collapse; font-size:13px; min-width:760px; }
.mrl-table th { text-align:left; padding:12px 14px; font-size:12.5px; font-weight:600; color:#4b5563; border-bottom:1px solid #e5e7eb; white-space:nowrap; }
.mrl-table td { padding:12px 14px; border-bottom:1px solid #f1f5f9; color:#111827; }
.mrl-row { cursor:pointer; } .mrl-row:hover { background:#f8fafc; }
.mrl-link { color:#1a6ef7; font-weight:600; }
.mrl-act { width:30px; height:30px; border:1px solid #e5e7eb; background:#fff; border-radius:8px; cursor:pointer; color:#4b5563; }
.mrl-empty { text-align:center; padding:36px; color:#6b7280; }
.mrl-foot { margin-top:14px; background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:8px 12px; }
@media (max-width:1024px) { .mrl-kpis { grid-template-columns:repeat(2,1fr); } .mrl-actions { margin-left:0; } }

/* ── New request drawer ── */
.mr-drawer-overlay { position:fixed; inset:0; background:rgba(15,23,42,.45); z-index:1000; display:flex; justify-content:flex-end; }
.mr-drawer { width:min(960px,100vw); height:100%; background:#f4f6f9; overflow-y:auto; display:flex; flex-direction:column; box-shadow:-8px 0 30px rgba(0,0,0,.2); }
.mr-drawer .bomx-detail-hdr { position:sticky; top:0; z-index:3; background:linear-gradient(135deg,#1a237e 0%,#1565c0 100%); padding:14px 28px; }
.mr-drawer .bomx-detail-title { font-size:20px; color:#fff; margin-bottom:0; display:flex; align-items:center; gap:10px; }
.mr-drawer .bomx-detail-meta { color:rgba(255,255,255,.65); font-size:12px; margin-top:2px; }
.mr-draft-badge { display:inline-flex; align-items:center; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:700; background:rgba(255,255,255,.15); color:rgba(255,255,255,.85); border:1px solid rgba(255,255,255,.25); }
.mr-drawer-x { width:30px; height:30px; border:none; border-radius:8px; background:#fff; color:#000; cursor:pointer; display:grid; place-items:center; flex-shrink:0; }
.mr-drawer-x:hover { background:#f8fafc; }
.mr-drawer .bomx-hdr-fields { grid-template-columns:1fr 1fr; background:#fff; padding:16px 28px; border-bottom:1px solid #e3e8ef; }
.mr-drawer .bomx-body { overflow:visible; flex:1; background:#f4f6f9; padding:20px 28px 28px; }
.mr-drawer-foot { position:sticky; bottom:0; z-index:3; display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 28px; background:#fff; border-top:1px solid #e3e8ef; }
.mr-drawer-foot-note { font-size:12px; color:#9ca3af; }
.mr-btn-cancel { display:inline-flex; align-items:center; border:1px solid #d9e0ea; border-radius:7px; background:#fff; color:#374151; padding:8px 20px; font-size:13.5px; font-weight:600; cursor:pointer; font-family:inherit; }
.mr-btn-cancel:hover { border-color:#9ca3af; background:#f8fafc; }
.mr-btn-save { display:inline-flex; align-items:center; gap:6px; border:1.5px solid #1565c0; border-radius:7px; background:#1565c0; color:#fff; padding:8px 18px; font-size:13.5px; font-weight:700; cursor:pointer; font-family:inherit; }
.mr-btn-save:hover { background:#1251a3; }
.mr-btn-save:disabled, .mr-btn-cancel:disabled { opacity:.5; cursor:not-allowed; }
</style>