<template>
  <div class="qcar-page">

    <!-- ── KPI cards ── -->
    <div class="qcar-kpis">
      <button type="button" class="qcar-kpi k-total" :class="{ active: filterStatus === 'all' }" @click="filterStatus = 'all'">
        <span class="qcar-kpi-ico">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>
        </span>
        <span class="qcar-kpi-txt"><span class="qcar-kpi-lbl">Total</span><span class="qcar-kpi-val">{{ stats.total }}</span></span>
      </button>
      <button type="button" class="qcar-kpi k-pend" :class="{ active: filterStatus === 'Pending' }" @click="filterStatus = 'Pending'">
        <span class="qcar-kpi-ico">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </span>
        <span class="qcar-kpi-txt"><span class="qcar-kpi-lbl">Pending</span><span class="qcar-kpi-val">{{ stats.pending }}</span></span>
      </button>
      <button type="button" class="qcar-kpi k-appr" :class="{ active: filterStatus === 'Approved' }" @click="filterStatus = 'Approved'">
        <span class="qcar-kpi-ico">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </span>
        <span class="qcar-kpi-txt"><span class="qcar-kpi-lbl">Approved</span><span class="qcar-kpi-val">{{ stats.approved }}</span></span>
      </button>
      <button type="button" class="qcar-kpi k-rej" :class="{ active: filterStatus === 'Rejected' }" @click="filterStatus = 'Rejected'">
        <span class="qcar-kpi-ico">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </span>
        <span class="qcar-kpi-txt"><span class="qcar-kpi-lbl">Rejected</span><span class="qcar-kpi-val">{{ stats.rejected }}</span></span>
      </button>
    </div>

    <!-- ── Search panel ── -->
    <div class="qcar-panel">
      <label class="qcar-search">
        <span v-html="icon('search',16)" class="qcar-search-ico"></span>
        <input v-model="search" placeholder="Search request #, item, inspection…" class="qcar-search-input" aria-label="Search approval requests" />
      </label>
      <button type="button" class="qcar-btn qcar-btn-icon" @click="load" :disabled="loading" title="Refresh" aria-label="Refresh">
        <span v-html="icon('refresh',16)"></span>
      </button>
    </div>

    <!-- ── Desktop table ── -->
    <div class="qcar-tcard qcar-table-wrap">
      <div class="qcar-scroll">
        <table class="qcar-table">
          <thead><tr>
            <th @click="sort('name')" class="sortable">Request # <span class="qcar-sort" v-html="sortArrow('name')"></span></th>
            <th @click="sort('qc_inspection')" class="sortable">QC Inspection <span class="qcar-sort" v-html="sortArrow('qc_inspection')"></span></th>
            <th @click="sort('item')" class="sortable">Item <span class="qcar-sort" v-html="sortArrow('item')"></span></th>
            <th @click="sort('reference_name')" class="sortable">Reference <span class="qcar-sort" v-html="sortArrow('reference_name')"></span></th>
            <th @click="sort('requested_by')" class="sortable">Requested By <span class="qcar-sort" v-html="sortArrow('requested_by')"></span></th>
            <th @click="sort('request_date')" class="sortable">Date <span class="qcar-sort" v-html="sortArrow('request_date')"></span></th>
            <th @click="sort('approval_status')" class="sortable">Status <span class="qcar-sort" v-html="sortArrow('approval_status')"></span></th>
            <th class="qcar-th-actions">Actions</th>
          </tr></thead>
          <tbody>
            <template v-if="loading">
              <tr v-for="n in 6" :key="n"><td colspan="8" class="qcar-skel-cell"><div class="qcar-shimmer"></div></td></tr>
            </template>
            <template v-else>
              <tr v-for="r in paged" :key="r.name" class="qcar-row" @click="openView(r)">
                <td><span class="qcar-num">{{ r.name }}</span></td>
                <td><span class="qcar-ref">{{ r.qc_inspection }}</span></td>
                <td>
                  <div class="qcar-two"><span class="qcar-strong">{{ r.item }}</span><span class="qcar-sub">{{ r.inspection_type }}</span></div>
                </td>
                <td>
                  <div class="qcar-two"><span class="qcar-sub">{{ r.reference_type }}</span><span class="qcar-ref">{{ r.reference_name || '—' }}</span></div>
                </td>
                <td class="qcar-muted">{{ shortUser(r.requested_by) }}</td>
                <td class="qcar-muted">{{ fmtDate(r.request_date) }}</td>
                <td><span class="qcar-status-badge" :class="statusClass(r.approval_status)">{{ r.approval_status }}</span></td>
                <td class="qcar-td-actions" @click.stop>
                  <button type="button" class="qcar-act" title="View" aria-label="View request" @click="openView(r)"><span v-html="icon('eye',16)"></span></button>
                </td>
              </tr>
              <tr v-if="!sorted.length">
                <td colspan="8" class="qcar-empty">
                  <div class="qcar-empty-art" aria-hidden="true">
                    <svg width="150" height="120" viewBox="0 0 150 120" fill="none">
                    <circle cx="75" cy="60" r="50" fill="#e6f6ed"/>
                    <path d="M24 70h9M20 62h6M124 38h10M129 30h5" stroke="#86d3a6" stroke-width="2" stroke-linecap="round"/>
                    <path d="M56 30h24l12 12v38a4 4 0 0 1-4 4H56a4 4 0 0 1-4-4V34a4 4 0 0 1 4-4z" fill="#fff" stroke="#16a34a" stroke-width="3" stroke-linejoin="round"/>
                    <path d="M80 30v12h12" stroke="#16a34a" stroke-width="3" stroke-linejoin="round"/>
                    <path d="M60 52h12M60 60h8" stroke="#86d3a6" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="86" cy="76" r="14" fill="#16a34a"/>
                    <path d="M79.5 76.5l4.5 4.5 8-9" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  </div>
                  <template v-if="list.length">
                    <div class="qcar-empty-title">No requests match your filters</div>
                    <div class="qcar-empty-sub">Try a different search or status.</div>
                  </template>
                  <template v-else>
                    <div class="qcar-empty-title">No QC Approval Requests found</div>
                    <div class="qcar-empty-sub">Requests are auto-created when a QC Inspection fails</div>
                  </template>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div v-if="!loading && sorted.length" class="qcar-foot">
        <Pagination v-model:page="page" v-model:page-size="pageSize" :total-items="sorted.length" />
      </div>
    </div>

    <!-- Mobile card list (replaces the table at ≤680px) -->
    <div class="qcar-cards-wrap">
      <template v-if="loading">
        <div v-for="n in 4" :key="n" class="qcar-mcard"><div class="qcar-shimmer" style="height:70px"></div></div>
      </template>
      <template v-else>
        <div v-for="r in paged" :key="r.name" class="qcar-mcard" @click="openView(r)">
          <div class="qcar-mcard-top">
            <span class="qcar-num">{{ r.name }}</span>
            <span class="qcar-status-badge" :class="statusClass(r.approval_status)">{{ r.approval_status }}</span>
          </div>
          <div class="qcar-mcard-sub">{{ r.item }}</div>
          <div class="qcar-mcard-hint">{{ r.inspection_type }} · {{ r.reference_type }} / {{ r.reference_name || '—' }}</div>
          <div class="qcar-mcard-meta">
            <span class="qcar-ref">{{ r.qc_inspection }}</span>
            <span>{{ shortUser(r.requested_by) }}</span>
            <span>{{ fmtDate(r.request_date) }}</span>
          </div>
        </div>
        <div v-if="!sorted.length" class="qcar-mcard qcar-mobile-empty">
          <div class="qcar-empty-title">{{ list.length ? 'No requests match your filters' : 'No QC Approval Requests found' }}</div>
          <div class="qcar-empty-sub">{{ list.length ? 'Try a different search or status.' : 'Requests are auto-created when a QC Inspection fails' }}</div>
        </div>
        <div v-if="sorted.length" class="qcar-foot qcar-foot-mobile">
          <Pagination v-model:page="page" v-model:page-size="pageSize" :total-items="sorted.length" />
        </div>
      </template>
    </div>

    <!-- ── Detail / Action Drawer ── -->
    <div v-if="viewOpen" class="qcar-overlay" @click.self="viewOpen=false"></div>
    <div class="qcar-drawer" :class="{open: viewOpen}">
      <template v-if="viewDoc">
        <div class="qcar-dheader">
          <button class="qcar-dclose" @click="viewOpen=false"><span v-html="icon('x',16)"></span></button>
          <div class="qcar-dh-top">
            <div class="qcar-dh-ico">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
            </div>
            <div>
              <div class="qcar-dh-title">{{ viewDoc.name }}</div>
              <div class="qcar-dh-sub">QC Approval Request · {{ fmtDate(viewDoc.request_date) }}</div>
            </div>
            <span class="qcar-status-badge" :class="statusClass(viewDoc.approval_status)" style="margin-left:auto;flex-shrink:0">{{ viewDoc.approval_status }}</span>
          </div>
        </div>
        <div class="qcar-dbody">

          <!-- Info grid -->
          <div class="qcar-info-grid">
            <div><span class="qcar-info-lbl">QC Inspection</span><div class="qcar-info-val" style="color:#2563eb">{{ viewDoc.qc_inspection }}</div></div>
            <div><span class="qcar-info-lbl">Item</span><div class="qcar-info-val">{{ viewDoc.item }}</div></div>
            <div><span class="qcar-info-lbl">Inspection Type</span><div class="qcar-info-val">{{ viewDoc.inspection_type }}</div></div>
            <div><span class="qcar-info-lbl">Reference</span><div class="qcar-info-val" style="color:#2563eb">{{ viewDoc.reference_type }} / {{ viewDoc.reference_name }}</div></div>
            <div><span class="qcar-info-lbl">Requested By</span><div class="qcar-info-val">{{ viewDoc.requested_by }}</div></div>
            <div><span class="qcar-info-lbl">Request Date</span><div class="qcar-info-val">{{ fmtDate(viewDoc.request_date) }}</div></div>
          </div>

          <!-- Remarks -->
          <div v-if="viewDoc.approval_remarks" class="qcar-view-section">
            <div class="qcar-sec-lbl">Request Remarks</div>
            <div class="qcar-remarks-box">{{ viewDoc.approval_remarks }}</div>
          </div>

          <!-- Outcome (approved/rejected) -->
          <div v-if="viewDoc.approval_status !== 'Pending'" class="qcar-view-section">
            <div class="qcar-sec-lbl">{{ viewDoc.approval_status === 'Approved' ? 'Approval' : 'Rejection' }} Details</div>
            <div class="qcar-info-grid">
              <div><span class="qcar-info-lbl">By</span><div class="qcar-info-val">{{ viewDoc.approved_by || '—' }}</div></div>
              <div><span class="qcar-info-lbl">Date</span><div class="qcar-info-val">{{ fmtDate(viewDoc.approval_date) }}</div></div>
            </div>
            <div v-if="viewDoc.rejection_reason" style="margin-top:8px">
              <div class="qcar-sec-lbl" style="color:#dc2626">Rejection Reason</div>
              <div class="qcar-remarks-box" style="border-color:#fca5a5;background:#fef2f2">{{ viewDoc.rejection_reason }}</div>
            </div>
          </div>

          <!-- Quarantine / Release from Hold (Approved requests only) -->
          <div v-if="viewDoc.approval_status === 'Approved'" class="qcar-view-section">
            <div class="qcar-sec-lbl">Quarantine Hold</div>

            <div v-if="holdLoading" class="qcar-remarks-box">Checking hold status…</div>

            <template v-else-if="holdInfo && holdInfo.qc_hold">
              <div class="qcar-remarks-box" style="border-color:#fdba74;background:#fff7ed">
                Item <strong>{{ viewDoc.item }}</strong> is still in quarantine{{ holdInfo.quarantine_warehouse ? ' (' + holdInfo.quarantine_warehouse + ')' : '' }}.
                Choose a disposition to release it.
              </div>
              <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
                <select v-model="releaseForm.disposition" class="qcar-input">
                  <option value="Release to Stock">Release to Stock</option>
                  <option value="Scrap">Scrap</option>
                  <option value="Return to Supplier">Return to Supplier</option>
                </select>
                <select
                  v-if="releaseForm.disposition !== 'Scrap'"
                  v-model="releaseForm.target_warehouse"
                  class="qcar-input"
                >
                  <option value="">— Select target warehouse —</option>
                  <option v-for="w in warehouses" :key="w.name" :value="w.name">{{ w.warehouse_name || w.name }}</option>
                </select>
                <button class="qcar-btn-approve" :disabled="releasing || !$canEdit('inventory')" @click="doRelease">
                  <span v-html="icon('check',13)"></span>{{ releasing ? 'Releasing…' : 'Release from Hold' }}
                </button>
              </div>
            </template>

            <div v-else class="qcar-remarks-box" style="border-color:#bbf7d0;background:#f0fdf4;color:#15803d">
              Not currently on hold — stock has already been released (or no quarantine warehouse was configured).
            </div>
          </div>

          <!-- Action: Approve / Reject (Pending only, for admins) -->
          <div v-if="viewDoc.approval_status === 'Pending'" class="qcar-view-section">
            <div class="qcar-sec-lbl">Action</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <textarea v-model="actionRemarks" class="qcar-input" rows="2" placeholder="Remarks (optional for approve, required for reject)…"></textarea>
              <textarea v-if="showRejectReason" v-model="rejectReason" class="qcar-input" rows="2" placeholder="Rejection reason (required)…" style="border-color:#fca5a5"></textarea>
              <div style="display:flex;gap:8px">
                <button class="qcar-btn-approve" :disabled="actionSaving || !$canEdit('inventory')" @click="doApprove">
                  <span v-html="icon('check',13)"></span>{{ actionSaving && actionMode==='approve' ? 'Approving…' : 'Approve' }}
                </button>
                <button class="qcar-btn-reject" :disabled="actionSaving || !$canEdit('inventory')" @click="doReject">
                  <span v-html="icon('x',13)"></span>{{ actionSaving && actionMode==='reject' ? 'Rejecting…' : 'Reject' }}
                </button>
              </div>
            </div>
          </div>

          <div class="inv-view-footer" v-if="viewDoc.owner">
            Created by {{ ownerName(viewDoc.owner) }} on {{ fmtDate(viewDoc.creation) }}
            <template v-if="viewDoc.modified_by"> · Last modified by {{ ownerName(viewDoc.modified_by) }} on {{ fmtDate(viewDoc.modified) }}</template>
          </div>

        </div>
        <div class="qcar-dfooter">
          <button class="qcar-btn-ghost" @click="viewOpen=false">Close</button>
        </div>
      </template>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { apiCall, apiList, apiGet } from "../api/client.js";
import { useToast } from "../composables/useToast.js";
import { icon } from "../utils/icons.js";
import { fmtDate } from "../utils/format.js";
import { ownerName } from "../utils/userNames.js";
import Pagination from "../components/Pagination.vue";

const { toast } = useToast();

// ── State ──────────────────────────────────────────────────────────────────────
const list        = ref([]);
const loading     = ref(false);
const viewOpen    = ref(false);
const viewDoc     = ref(null);
const search      = ref("");
const filterStatus = ref("all");
const page        = ref(1);
const pageSize    = ref(25);
const sortCol     = ref("");     // empty = keep the server's order (newest first)
const sortDir     = ref("asc");
const actionRemarks = ref("");
const rejectReason  = ref("");
const showRejectReason = ref(false);
const actionSaving  = ref(false);
const actionMode    = ref("");

// ── Quarantine / Release-from-Hold state ────────────────────────────────────────
const holdInfo   = ref(null);
const holdLoading = ref(false);
const warehouses  = ref([]);
const releasing    = ref(false);
const releaseForm  = reactive({ disposition: "Release to Stock", target_warehouse: "" });

// ── Helpers ────────────────────────────────────────────────────────────────────
function statusClass(s) {
  if (s === "Approved") return "qcar-status-approved";
  if (s === "Rejected") return "qcar-status-rejected";
  return "qcar-status-pending";
}
function shortUser(u) {
  if (!u) return "—";
  return u.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, c => c.toUpperCase()).slice(0, 18);
}

// ── Computed ───────────────────────────────────────────────────────────────────
const stats = computed(() => ({
  total:    list.value.length,
  pending:  list.value.filter(r => r.approval_status === "Pending").length,
  approved: list.value.filter(r => r.approval_status === "Approved").length,
  rejected: list.value.filter(r => r.approval_status === "Rejected").length,
}));

const filtered = computed(() => {
  let r = list.value;
  if (filterStatus.value !== "all") r = r.filter(x => x.approval_status === filterStatus.value);
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    r = r.filter(x =>
      (x.name || "").toLowerCase().includes(q) ||
      (x.qc_inspection || "").toLowerCase().includes(q) ||
      (x.item || "").toLowerCase().includes(q) ||
      (x.reference_name || "").toLowerCase().includes(q)
    );
  }
  return r;
});

const sorted = computed(() => {
  const col = sortCol.value;
  if (!col) return filtered.value;
  return [...filtered.value].sort((a, b) => {
    const c = String(a[col] ?? "").localeCompare(String(b[col] ?? ""), undefined, { numeric: true });
    return sortDir.value === "asc" ? c : -c;
  });
});
const paged = computed(() => {
  const s = (page.value - 1) * pageSize.value;
  return sorted.value.slice(s, s + pageSize.value);
});
function sort(col) {
  if (sortCol.value === col) sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  else { sortCol.value = col; sortDir.value = "asc"; }
}
function sortArrow(col) {
  if (sortCol.value !== col) return "⇕";
  return sortDir.value === "asc" ? "▲" : "▼";
}
// Back to page 1 whenever the result set changes.
watch([search, filterStatus, pageSize], () => { page.value = 1; });

// ── API ────────────────────────────────────────────────────────────────────────
async function load() {
  loading.value = true;
  try {
    const res = await apiCall("psd_books.api.qc_approval.list_qc_approval_requests", {
      approval_status: "all", page_len: 200, page: 0,
    });
    list.value = res?.message?.requests || res?.requests || [];
  } catch (e) {
    toast.error(e.message || "Failed to load QC Approval Requests");
  } finally {
    loading.value = false;
  }
}

async function openView(r) {
  viewDoc.value = { ...r };
  viewOpen.value = true;
  actionRemarks.value = "";
  rejectReason.value = "";
  showRejectReason.value = false;
  actionMode.value = "";

  holdInfo.value = null;
  releaseForm.disposition = "Release to Stock";
  releaseForm.target_warehouse = "";

  if (r.approval_status === "Approved" && r.qc_inspection) {
    await loadHoldInfo(r.qc_inspection);
    if (!warehouses.value.length) await loadWarehouses();
  }

  try {
    const full = await apiGet("QC Approval Request", r.name);
    if (viewDoc.value && viewDoc.value.name === r.name) viewDoc.value = { ...viewDoc.value, ...full };
  } catch (e) {}
}

async function loadHoldInfo(inspectionName) {
  holdLoading.value = true;
  try {
    const res = await apiCall("psd_books.api.qc.get_inspection_detail", {
      inspection_name: inspectionName,
    });
    const doc = res?.message || res;
    holdInfo.value = {
      qc_hold: !!doc?.qc_hold,
      quarantine_warehouse: doc?.quarantine_warehouse || "",
    };
  } catch (e) {
    holdInfo.value = null;
  } finally {
    holdLoading.value = false;
  }
}

async function loadWarehouses() {
  try {
    const res = await apiList("Warehouse", {
      fields: ["name", "warehouse_name"],
      filters: [["disabled", "=", 0]],
      limit: 200,
    });
    warehouses.value = res?.message || res || [];
  } catch (e) {
    warehouses.value = [];
  }
}

async function doRelease() {
  if (!viewDoc.value?.qc_inspection) return;
  if (releaseForm.disposition !== "Scrap" && !releaseForm.target_warehouse) {
    return toast.error("Target warehouse is required for this disposition.");
  }
  releasing.value = true;
  try {
    await apiCall("psd_books.quality.qc_hold_manager.release_from_hold", {
      inspection_name: viewDoc.value.qc_inspection,
      disposition: releaseForm.disposition,
      target_warehouse: releaseForm.target_warehouse,
    });
    toast.success("QC Hold released");
    await loadHoldInfo(viewDoc.value.qc_inspection);
  } catch (e) {
    toast.error(e.message || "Release failed");
  } finally {
    releasing.value = false;
  }
}

async function doApprove() {
  if (!viewDoc.value) return;
  actionSaving.value = true;
  actionMode.value = "approve";
  try {
    await apiCall("psd_books.api.qc_approval.approve_qc_approval_request", {
      request_name: viewDoc.value.name,
      remarks: actionRemarks.value,
    });
    toast.success(`${viewDoc.value.name} approved`);
    viewOpen.value = false;
    await load();
  } catch (e) {
    toast.error(e.message || "Approval failed");
  } finally {
    actionSaving.value = false;
  }
}

async function doReject() {
  if (!viewDoc.value) return;
  if (!showRejectReason.value) {
    showRejectReason.value = true;
    return;
  }
  if (!rejectReason.value.trim()) {
    return toast.error("Rejection reason is required.");
  }
  actionSaving.value = true;
  actionMode.value = "reject";
  try {
    await apiCall("psd_books.api.qc_approval.reject_qc_approval_request", {
      request_name: viewDoc.value.name,
      rejection_reason: rejectReason.value,
    });
    toast.success(`${viewDoc.value.name} rejected`);
    viewOpen.value = false;
    await load();
  } catch (e) {
    toast.error(e.message || "Rejection failed");
  } finally {
    actionSaving.value = false;
  }
}

onMounted(load);
</script>

<style scoped>
.qcar-page {
  --qc-blue:#1a6ef7; --qc-ink:#0f172a; --qc-text:#334155; --qc-muted:#64748b; --qc-line:#e8edf3;
  display:flex; flex-direction:column; gap:20px; padding:24px; min-width:0; color:var(--qc-text);
}

/* KPI cards */
.qcar-kpis { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:16px; min-width:0; }
.qcar-kpi {
  --tint:#f3f7ff; --edge:#dbe6fb; --ico-bg:#e1ecfd; --ico:#2f6df0; --val:var(--qc-ink);
  display:flex; align-items:center; gap:18px; min-width:0; padding:20px 22px; text-align:left; font:inherit;
  border:1px solid var(--edge); border-radius:16px; cursor:pointer;
  background:linear-gradient(135deg, var(--tint), #fff 85%); transition:box-shadow .15s, border-color .15s;
}
.qcar-kpi:hover { box-shadow:0 4px 14px rgba(15,23,42,.07); }
.qcar-kpi.active { border-color:var(--ico); box-shadow:0 0 0 3px color-mix(in srgb, var(--ico) 18%, transparent); }
.qcar-kpi:focus-visible { outline:2px solid var(--qc-blue); outline-offset:2px; }
.qcar-kpi-ico { width:60px; height:60px; flex-shrink:0; display:inline-flex; align-items:center; justify-content:center; border-radius:16px; background:var(--ico-bg); color:var(--ico); }
.qcar-kpi-txt { display:flex; flex-direction:column; gap:4px; min-width:0; }
.qcar-kpi-lbl { font-size:12.5px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:var(--qc-muted); }
.qcar-kpi-val { font-size:30px; font-weight:700; line-height:1.05; color:var(--val); }
.k-pend { --tint:#fff7e8; --edge:#fde6bd; --ico-bg:#fdecc8; --ico:#e8870c; --val:#d97706; }
.k-appr { --tint:#ecfaf2; --edge:#cdeedb; --ico-bg:#d3f3e1; --ico:#16a34a; --val:#15803d; }
.k-rej  { --tint:#fff0ef; --edge:#fbd5d3; --ico-bg:#fddcda; --ico:#dc2626; --val:#b91c1c; }

/* Search panel */
.qcar-panel { display:flex; align-items:center; gap:12px; background:#fff; border:1px solid var(--qc-line); border-radius:16px; padding:14px 16px; box-shadow:0 1px 2px rgba(15,23,42,.03); }
.qcar-search { flex:1; min-width:0; display:flex; align-items:center; gap:10px; height:46px; padding:0 16px; border:1px solid var(--qc-line); border-radius:12px; background:#fff; color:#94a3b8; transition:border-color .15s, box-shadow .15s; }
.qcar-search:focus-within { border-color:var(--qc-blue); box-shadow:0 0 0 3px rgba(26,110,247,.12); }
.qcar-search-ico { display:inline-flex; flex-shrink:0; }
.qcar-search-input { border:none; outline:none; background:transparent; width:100%; min-width:0; font:inherit; font-size:14px; color:var(--qc-ink); }
.qcar-search-input::placeholder { color:#94a3b8; }
.qcar-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; height:46px; padding:0 18px; border:1px solid var(--qc-line); border-radius:12px; background:#fff; color:var(--qc-ink); font:inherit; font-size:14px; font-weight:500; cursor:pointer; transition:background .15s, border-color .15s; }
.qcar-btn > span { display:inline-flex; }
.qcar-btn:hover:not(:disabled) { background:#f8fafc; border-color:#cbd5e1; }
.qcar-btn:disabled { opacity:.5; cursor:not-allowed; }
.qcar-btn:focus-visible, .qcar-act:focus-visible { outline:2px solid var(--qc-blue); outline-offset:2px; }
.qcar-btn-icon { width:46px; padding:0; }

/* Table card */
.qcar-tcard { background:#fff; border:1px solid var(--qc-line); border-radius:16px; overflow:hidden; box-shadow:0 1px 2px rgba(15,23,42,.03); }
.qcar-scroll { overflow-x:auto; }
.qcar-table { width:100%; min-width:900px; border-collapse:collapse; font-size:14px; }
.qcar-table th { background:#f8fafc; padding:18px 14px; font-size:12.5px; font-weight:700; letter-spacing:.03em; text-transform:uppercase; color:#475a7a; text-align:left; border-bottom:1px solid var(--qc-line); white-space:nowrap; user-select:none; }
.qcar-table th:first-child, .qcar-table td:first-child { padding-left:22px; }
.qcar-table th.sortable:hover { color:var(--qc-ink); }
.qcar-sort { margin-left:4px; font-size:11px; color:#9aa7bb; letter-spacing:0; }
.qcar-th-actions { text-align:center !important; }
.qcar-table td { padding:16px 14px; border-bottom:1px solid var(--qc-line); vertical-align:middle; color:var(--qc-ink); }
.qcar-table tbody tr:last-child td { border-bottom:none; }
.qcar-row { cursor:pointer; transition:background .12s; }
.qcar-row:hover { background:#f8fafc; }
.qcar-num { color:var(--qc-blue); font-weight:600; white-space:nowrap; }
.qcar-ref { color:var(--qc-blue); font-weight:600; }
.qcar-two { display:flex; flex-direction:column; gap:2px; }
.qcar-sub { font-size:12px; color:#94a3b8; }
.qcar-strong { font-weight:600; }
.qcar-muted { color:var(--qc-muted); white-space:nowrap; }
.qcar-td-actions { text-align:center; white-space:nowrap; }
.qcar-act { width:36px; height:36px; display:inline-flex; align-items:center; justify-content:center; border:1px solid var(--qc-line); border-radius:10px; background:#fff; color:var(--qc-text); cursor:pointer; transition:background .15s, border-color .15s, color .15s; }
.qcar-act > span { display:inline-flex; }
.qcar-act:hover { background:#f1f5f9; border-color:#cbd5e1; color:var(--qc-ink); }
.sortable { cursor:pointer; }
.qcar-act-btn { background:#fff; border:1px solid var(--qc-line); border-radius:8px; padding:5px 7px; cursor:pointer; color:var(--qc-muted); }

.qcar-empty { text-align:center; padding:48px 20px 56px !important; }
.qcar-empty-art { display:flex; justify-content:center; margin-bottom:10px; }
.qcar-empty-title { font-size:20px; font-weight:700; color:var(--qc-ink); margin-bottom:8px; }
.qcar-empty-sub { font-size:14px; color:var(--qc-muted); }
.qcar-skel-cell { padding:14px 20px !important; }
.qcar-shimmer { height:32px; background:linear-gradient(90deg,#f3f4f6 25%,#e9ecef 50%,#f3f4f6 75%); background-size:200%; animation:shimmer 1.4s infinite; border-radius:6px; }
@keyframes shimmer { 0%{background-position:200%} 100%{background-position:-200%} }

/* Footer pagination */
.qcar-foot { border-top:1px solid var(--qc-line); padding:14px 16px; }
.qcar-foot :deep(.pg-wrap) { padding:0; border:none; border-radius:0; background:transparent; font-family:inherit; }
.qcar-foot :deep(.pg-label), .qcar-foot :deep(.pg-summary) { font-size:13.5px; color:var(--qc-muted); }
.qcar-foot :deep(.pg-left) { gap:12px; }
.qcar-foot :deep(.pg-select) { height:36px; min-width:68px; padding:0 30px 0 12px; font-size:13.5px; color:var(--qc-ink); border:1px solid var(--qc-line); border-radius:10px; }
.qcar-foot :deep(.pg-chevron) { right:13px; width:12px; height:8px; }
.qcar-foot :deep(.pg-right) { gap:16px; }
.qcar-foot :deep(.pg-nav) { gap:6px; }
.qcar-foot :deep(.pg-btn) { min-width:36px; height:36px; border:1px solid var(--qc-line); border-radius:10px; font-size:13.5px; }
.qcar-foot :deep(.pg-icon-btn svg) { width:16px; height:16px; }
.qcar-foot :deep(.pg-btn.pg-page.active) { background:var(--qc-blue); border-color:var(--qc-blue); color:#fff; }

/* ── Mobile card list (hidden on desktop; swaps in for the table on small screens) ── */
.qcar-cards-wrap { display:none; flex-direction:column; gap:10px; }
.qcar-mcard { background:#fff; border:1px solid var(--qc-line); border-radius:14px; padding:12px 14px; cursor:pointer; }
.qcar-mcard:active { box-shadow:0 4px 16px rgba(0,0,0,.08); }
.qcar-mcard-top { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:8px; }
.qcar-mcard-sub { font-size:14px; font-weight:600; color:var(--qc-ink); margin-bottom:2px; }
.qcar-mcard-hint { font-size:12px; color:#94a3b8; margin-bottom:8px; }
.qcar-mcard-meta { display:flex; align-items:center; gap:10px; flex-wrap:wrap; font-size:12.5px; color:var(--qc-muted); padding-top:8px; border-top:1px solid #f1f5f9; }
.qcar-mobile-empty { text-align:center; padding:36px 16px; cursor:default; }
.qcar-mobile-empty .qcar-empty-title { font-size:16px; }
.qcar-mobile-empty .qcar-empty-sub { font-size:13px; }
.qcar-foot-mobile { border:1px solid var(--qc-line); border-radius:14px; background:#fff; padding:10px; }
@media (max-width:680px) {
  .qcar-table-wrap { display:none; }
  .qcar-cards-wrap { display:flex; }
}
@media (max-width:1100px) {
  .qcar-kpis { grid-template-columns:repeat(2, minmax(0,1fr)); }
}

/* Status badges */
.qcar-status-badge { display:inline-flex; align-items:center; height:28px; font-size:12.5px; font-weight:600; padding:0 14px; border-radius:999px; white-space:nowrap; }
.qcar-status-approved { background:#dcfce7; color:#15803d; }
.qcar-status-rejected { background:#fee2e2; color:#dc2626; }
.qcar-status-pending  { background:#fef3c7; color:#b45309; }

.qcar-btn-ghost { display:inline-flex; align-items:center; gap:6px; background:#fff; border:1px solid var(--qc-line); border-radius:10px; padding:9px 14px; font-size:13px; color:var(--qc-text); cursor:pointer; font-family:inherit; }
.qcar-btn-ghost:hover { background:#f8fafc; }

/* Drawer */
.qcar-overlay { position:fixed; inset:0; background:rgba(0,0,0,.35); z-index:998; }
.qcar-drawer { position:fixed; right:0; top:0; bottom:0; width:560px; background:#fff; z-index:999; display:flex; flex-direction:column; transform:translateX(100%); transition:transform .25s cubic-bezier(.4,0,.2,1); box-shadow:-4px 0 24px rgba(0,0,0,.12); }
.qcar-drawer.open { transform:translateX(0); }
.qcar-dheader { padding:20px 20px 16px; background:linear-gradient(135deg,#1e3a5f,#2563eb); position:relative; flex-shrink:0; }
.qcar-dh-top { display:flex; align-items:center; gap:12px; }
.qcar-dh-ico { width:40px; height:40px; border-radius:10px; background:rgba(255,255,255,.2); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.qcar-dh-title { font-size:16px; font-weight:700; color:#fff; }
.qcar-dh-sub { font-size:12px; color:rgba(255,255,255,.75); margin-top:2px; }
.qcar-dclose { position:absolute; top:14px; right:14px; background:rgba(255,255,255,.15); border:none; border-radius:8px; padding:6px; cursor:pointer; color:#fff; display:flex; align-items:center; }
.qcar-dclose:hover { background:rgba(255,255,255,.25); }
.qcar-dbody { flex:1; overflow-y:auto; padding:18px 20px; display:flex; flex-direction:column; gap:14px; }
.qcar-dfooter { padding:14px 20px; border-top:1px solid #e5e7eb; display:flex; gap:8px; justify-content:flex-end; flex-shrink:0; }

/* Info grid */
.qcar-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; background:#f8fafc; border-radius:8px; padding:12px 14px; border:1px solid #e5e7eb; }
.qcar-info-lbl { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:#9ca3af; }
.qcar-info-val { font-size:13px; font-weight:600; color:#0f172a; margin-top:2px; }

/* View sections */
.qcar-view-section { display:flex; flex-direction:column; gap:6px; }
.qcar-sec-lbl { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:#9ca3af; }
.qcar-remarks-box { font-size:13px; color:#374151; background:#f8fafc; border-radius:6px; padding:10px 12px; border:1px solid #e2e8f0; }
.qcar-input { border:1px solid #e5e7eb; border-radius:8px; padding:8px 10px; font:inherit; font-size:13px; outline:none; color:#111827; resize:vertical; transition:border-color .15s; }
.qcar-input:focus { border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.08); }

/* Action buttons */
.qcar-btn-approve { display:inline-flex; align-items:center; gap:6px; background:#f0fdf4; border:1px solid #16a34a; color:#16a34a; border-radius:8px; padding:8px 14px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; }
.qcar-btn-approve:hover { background:#dcfce7; } .qcar-btn-approve:disabled { opacity:.5; cursor:not-allowed; }
.qcar-btn-reject  { display:inline-flex; align-items:center; gap:6px; background:#fef2f2; border:1px solid #dc2626; color:#dc2626; border-radius:8px; padding:8px 14px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; }
.qcar-btn-reject:hover { background:#fee2e2; } .qcar-btn-reject:disabled { opacity:.5; cursor:not-allowed; }

@media (max-width: 480px) {
  .qcar-page { padding:10px 8px; gap:12px; }
  .qcar-kpis { gap:10px; }
  .qcar-kpi { padding:12px 14px; gap:12px; border-radius:14px; }
  .qcar-kpi-ico { width:44px; height:44px; border-radius:12px; }
  .qcar-kpi-ico svg { width:22px; height:22px; }
  .qcar-kpi-lbl { font-size:10.5px; letter-spacing:.02em; }
  .qcar-kpi-val { font-size:22px; }
  .qcar-panel { padding:10px; border-radius:14px; }
  .qcar-search, .qcar-btn { height:42px; }
  .qcar-btn-icon { width:42px; }
  .qcar-drawer { width:100%; }
  .qcar-info-grid { grid-template-columns:1fr; gap:12px; padding:12px; }
}
</style>