<template>
<div class="list-page">
  <!-- Toolbar -->
  <div class="sales-toolbar">
    <div class="sales-search">
      <span v-html="icon('search',13)" style="color:#9ca3af;flex-shrink:0"></span>
      <input v-model="search" placeholder="Search RFQ, MRN, project…" class="sales-search-input"/>
    </div>
    <div class="sales-pills">
      <button v-for="t in TABS" :key="t.k" class="sales-pill" :class="{active:tab===t.k}" @click="tab=t.k">
        {{t.l}}
        <span v-if="t.k!=='all'" class="sales-pill-count">{{tabCounts[t.k]}}</span>
      </button>
    </div>
    <div style="margin-left:auto;display:flex;gap:6px">
      <select v-model="dateRange" class="sales-select" title="Filter by date">
        <option v-for="d in DATE_RANGES" :key="d.k" :value="d.k">{{ d.l }}</option>
      </select>
      <button class="sales-btn-ghost" @click="load" title="Refresh"><span v-html="icon('refresh',13)"></span></button>
      <button class="sales-btn-ghost" @click="exportCSV" title="Export CSV" :disabled="!filtered.length"><span v-html="icon('download',13)"></span> CSV</button>
      <!-- New RFQ hidden: RFQs are raised only via Material Request -->
    </div>
  </div>

  <div class="rfq-kpis">
    <div v-for="k in kpis" :key="k.key" class="rfq-kpi rfq-kpi-click" :class="['rfq-kpi-' + k.key, { 'rfq-kpi-on': tab === k.tab }]" role="button" tabindex="0" :title="'Show ' + k.label.toLowerCase()" @click="tab = k.tab" @keydown.enter="tab = k.tab">
      <div class="rfq-kpi-icon" v-html="icon(k.icon, 20)"></div>
      <div>
        <div class="rfq-kpi-label">{{ k.label }}</div>
        <div class="rfq-kpi-value">{{ k.value }}</div>
        <div class="rfq-kpi-sub">{{ k.sub }}</div>
      </div>
    </div>
  </div>

  <div class="rfq-mr-note">
    <span v-html="icon('file',14)"></span>
    <span>Requests for Quotation can only be created through a <b>Material Request</b>. </span>
    <router-link to="/manufacturing/material-request" class="rfq-mr-link">Go to Material Requests &rarr;</router-link>
  </div>

  <!-- List -->
  <div class="inv-table-wrap">
    <table class="inv-table">
      <thead>
        <tr>
          <th>RFQ #</th>
          <th>Material Request</th>
          <th>Project</th>
          <th>Date</th>
          <th>Respond By</th>
          <th>Status</th>
          <th style="width:120px;text-align:center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="n in 5" :key="n"><td colspan="7" style="padding:14px"><div class="shimmer" style="height:12px"></div></td></tr>
        </template>
        <tr v-else-if="!filtered.length">
          <td colspan="7" class="bk-empty-state">
            <div class="bk-empty-inner">
              <p class="bk-empty-title">{{ search || tab!=='all' || dateRange!=='all' ? 'No results match your filters' : 'No quotation requests yet' }}</p>
              <p v-if="!search && tab==='all'" class="bk-empty-sub">Open an Approved Material Request and click Create RFQ.</p>
            </div>
          </td>
        </tr>
        <tr v-else v-for="r in paged" :key="r.name" class="inv-row" @click="openView(r)">
          <td><DocLink doctype="Request for Quotation" :name="r.name" /></td>
          <td class="mono-sm">{{ r.material_request || '—' }}</td>
          <td class="c-muted">{{ projectLabel(r.project) || '—' }}</td>
          <td class="c-muted">{{ r.posting_date ? fmtDate(r.posting_date) : '—' }}</td>
          <td class="c-muted">{{ r.respond_by ? fmtDate(r.respond_by) : '—' }}</td>
          <td><span class="inv-status-badge" :class="statusClass(displayStatus(r))">{{ displayStatus(r) }}</span></td>
          <td @click.stop>
            <div class="pr-actions-row">
              <button class="inv-act-btn" @click.stop="openView(r)" title="View"><span v-html="icon('eye',12)"></span></button>
              <button v-if="r.status!=='Cancelled' && $canEdit('bills')" class="inv-act-btn" @click.stop="openEdit(r)" title="Edit"><span v-html="icon('edit',12)"></span></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="!loading && filtered.length" style="padding:12px 0 4px">
    <Pagination v-model:page="page" v-model:page-size="pageSize" :total-items="filtered.length" />
  </div>

  <Teleport to="body">

    <!-- VIEW DRAWER -->
    <div v-if="viewOpen" class="inv-drawer-bg" @click.self="viewOpen=false">
      <div class="inv-drawer-panel inv-view-page pr-view-drawer">
        <template v-if="viewDoc">
          <div class="inv-view-header">
            <div>
              <div class="inv-view-number">{{ viewDoc.name }}</div>
              <div class="inv-view-subtitle">Request for Quotation · {{ viewDoc.posting_date }} · <span class="inv-hdr-badge" :class="statusClass(displayStatus(viewDoc))">{{ displayStatus(viewDoc) }}</span></div>
            </div>
            <div class="rfq-hdr-right">
              <div class="rfq-hdr-actions">
                <button v-if="canSend(viewDoc)" class="inv-ab-btn inv-ab-primary" :disabled="sending || !$canEdit('bills')" :title="!$canEdit('bills') ? 'Read-only access' : ''" @click="sendRfq">
                  <span v-html="icon('send',13)"></span> {{ sending ? 'Sending…' : sendLabel(viewDoc) }}
                </button>
                <button v-if="viewDoc.status!=='Cancelled' && $canEdit('bills')" class="inv-ab-btn" @click="openEdit(viewDoc); viewOpen=false">
                  <span v-html="icon('edit',13)"></span> Edit
                </button>
                <button v-if="viewDoc.status!=='Cancelled'" class="inv-ab-btn pr-act-cancel" :disabled="!$canEdit('bills')" :title="!$canEdit('bills') ? 'Read-only access' : ''" @click="cancelRfq">
                  <span v-html="icon('x',13)"></span> Cancel RFQ
                </button>
              </div>
              <button class="inv-dclose" @click="viewOpen=false"><span v-html="icon('x',16)"></span></button>
            </div>
          </div>

          <div class="inv-dbody">
            <div class="pr-view-card">
              <div class="pr-view-card-hdr">Request Details</div>
              <div class="pr-info-grid">
                <div class="pr-info-item"><div class="pr-info-lbl">Material Request</div><div class="pr-info-val pr-info-link"><DocLink doctype="Material Request" :name="viewDoc.material_request" /></div></div>
                <div class="pr-info-item"><div class="pr-info-lbl">Project</div><div class="pr-info-val" :class="{'pr-info-empty':!viewDoc.project}">{{ viewDoc.project || '—' }}</div></div>
                <div class="pr-info-item"><div class="pr-info-lbl">RFQ Date</div><div class="pr-info-val">{{ viewDoc.posting_date || '—' }}</div></div>
                <div class="pr-info-item"><div class="pr-info-lbl">Respond By</div><div class="pr-info-val">{{ viewDoc.respond_by || '—' }}</div></div>
                <div class="pr-info-item"><div class="pr-info-lbl">Delivery Warehouse</div><div class="pr-info-val" :class="{'pr-info-empty':!viewDoc.delivery_warehouse}">{{ viewDoc.delivery_warehouse || '—' }}</div></div>
                <div v-if="viewDoc.message" class="pr-info-item pr-info-full"><div class="pr-info-lbl">Message to Suppliers</div><div class="pr-info-val" style="color:#6b7280">{{ viewDoc.message }}</div></div>
              </div>
            </div>

            <div class="pr-view-card">
              <div class="pr-view-card-hdr">
                Suppliers
                <span class="pr-item-count">{{ sentCount(viewDoc) }} of {{ (viewDoc.suppliers||[]).length }} sent</span>
              </div>
              <table class="inv-table pr-items-tbl">
                <thead><tr><th style="width:32px">#</th><th>Supplier</th><th>Email</th><th style="width:90px">Status</th><th style="width:150px">Sent On</th><th style="width:190px">Quotation</th><th v-if="showActions(viewDoc, $canEdit('bills'))" style="width:190px">Actions</th></tr></thead>
                <tbody>
                  <tr v-for="(s,i) in viewDoc.suppliers||[]" :key="s.name||i" class="inv-row">
                    <td class="pr-row-num">{{ i+1 }}</td>
                    <td style="font-weight:500;color:#111827">{{ s.supplier_name || s.supplier }}</td>
                    <td class="c-muted">{{ s.email_id || '—' }}</td>
                    <td>
                      <span class="inv-status-badge" :class="sendClass(s.send_status)">{{ s.send_status || 'Pending' }}</span>
                      <div v-if="s.send_status==='Failed' && s.send_error" style="font-size:11px;color:#C92A2A;margin-top:3px">{{ s.send_error }}</div>
                    </td>
                    <td class="c-muted mono-sm">{{ s.sent_on ? String(s.sent_on).slice(0,16) : '—' }}</td>
                    <td>
                      <template v-if="s.quotation">
                        <div class="mono-sm" style="color:#111827">{{ s.quotation }}</div>
                        <div class="c-muted mono-sm">{{ s.quoted_on || '' }}</div>
                      </template>
                      <span v-else class="c-muted">Not quoted</span>
                    </td>
                    <td v-if="showActions(viewDoc, $canEdit('bills'))" @click.stop>
                      <div class="pr-actions-row">
                        <button v-if="s.quotation" class="inv-act-btn" title="View quoted prices" @click="openQuoteView(s)"><span v-html="icon('eye',12)"></span></button>
                        <template v-if="canQuote(viewDoc) && $canEdit('bills')">
                          <button v-if="!s.quotation" class="inv-ab-btn inv-ab-primary" @click="openQuote(s)">Enter Quotation</button>
                          <template v-else>
                            <button class="inv-ab-btn" @click="openQuote(s)">Revise</button>
                            <button class="inv-ab-btn pr-act-cancel" @click="cancelQuote(s)">Cancel</button>
                          </template>
                        </template>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!(viewDoc.suppliers||[]).length"><td :colspan="showActions(viewDoc, $canEdit('bills')) ? 7 : 6" style="text-align:center;padding:24px;color:#9ca3af;font-size:13px">No suppliers added</td></tr>
                </tbody>
              </table>
              <div v-if="(viewDoc.suppliers||[]).length < 1 && viewDoc.status!=='Cancelled'" class="pr-info-val" style="padding:10px 14px;color:#b45309;font-size:12.5px">
                At least 1 supplier is needed before this can be sent.
              </div>
            </div>

            <div class="pr-view-card">
              <div class="pr-view-card-hdr">Items <span class="pr-item-count">{{ (viewDoc.items||[]).length }} line{{ (viewDoc.items||[]).length!==1?'s':'' }}</span></div>
              <table class="inv-table pr-items-tbl">
                <thead><tr><th style="width:32px">#</th><th>Item</th><th class="ta-r" style="width:80px">Qty</th><th style="width:60px">UOM</th></tr></thead>
                <tbody>
                  <tr v-for="(it,i) in viewDoc.items||[]" :key="it.name||i" class="inv-row">
                    <td class="pr-row-num">{{ i+1 }}</td>
                    <td style="font-weight:500;color:#111827">{{ it.item_name || it.item_code }}</td>
                    <td class="ta-r mono">{{ it.qty }}</td>
                    <td class="c-muted">{{ it.uom || '—' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="viewDoc.owner" class="inv-view-footer">
            Created by {{ ownerName(viewDoc.owner) }} on {{ fmtDate(viewDoc.creation) }}
            <template v-if="viewDoc.modified_by"> · Last modified by {{ ownerName(viewDoc.modified_by) }} on {{ fmtDate(viewDoc.modified) }}</template>
          </div>
        </template>
      </div>
    </div>

    <!-- QUOTATION DRAWER (Sava A8.4) -->
    <QuotationDialog :open="qd.open" :rfq="qd.rfq" :supplier="qd.supplier" :supplier-name="qd.supplier_name"
      @close="qd.open=false" @saved="onQuoteSaved" />

    <!-- QUOTED PRICES (read-only) -->
    <QuotationView :open="qv.open" :quotation="qv.name" :supplier-name="qv.supplier_name" @close="qv.open=false" />

    <!-- FORM DRAWER -->
    <div v-if="formOpen" class="inv-drawer-bg" @click.self="editingName ? formOpen=false : null">
      <div class="inv-drawer-panel" :class="{'is-add':!editingName}">
        <div class="inv-dh">
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <div class="inv-dh-title">{{ editingName ? 'Edit Request for Quotation' : 'New Request for Quotation' }}</div>
            <span v-if="!editingName" class="add-status-badge">Draft</span>
            <span v-else class="inv-dh-sub" style="margin-left:4px">{{ editingName }}</span>
          </div>
          <button class="inv-dclose" @click="formOpen=false"><span v-html="icon('x',16)"></span></button>
        </div>

        <div class="inv-content-row">
          <div class="inv-dbody">

            <!-- Details -->
            <div class="add-card">
              <div class="add-card-header" @click="collapsed.details=!collapsed.details">
                <div class="add-card-title"><span class="add-card-title-icon"><span v-html="icon('file',16)"></span></span> Request Details</div>
              </div>
              <div class="add-card-body" :class="{collapsed:collapsed.details}">
                <div class="inv-fg inv-fg2">
                  <div style="grid-column:1/-1">
                    <label class="inv-lbl">Material Request (MRN) <span class="inv-req">*</span></label>
                    <SearchableSelect v-model="form.material_request" :options="mrnOptions" :disabled="!!editingName" placeholder="Select an Approved MRN…" @search="fetchMrns" @select="onMrnPick"/>
                    <div class="exp-field-hint">Only Approved or Partly Issued Purchase requests can have a quotation request.</div>
                  </div>
                  <div>
                    <label class="inv-lbl">Entry Date <span class="inv-req">*</span></label>
                    <input class="inv-fi" type="date" v-model="form.entry_date"/>
                  </div>
                  <div>
                    <label class="inv-lbl">RFQ Date <span class="inv-req">*</span></label>
                    <input class="inv-fi" type="date" v-model="form.posting_date"/>
                  </div>
                  <div>
                    <label class="inv-lbl">Respond By</label>
                    <input class="inv-fi" type="date" v-model="form.respond_by"/>
                  </div>
                  <div>
                    <label class="inv-lbl">Project</label>
                    <input class="inv-fi" :value="form.project || '—'" readonly tabindex="-1" style="background:#f3f4f6;color:#6b7280"/>
                  </div>
                  <div>
                    <label class="inv-lbl">Delivery Warehouse</label>
                    <input class="inv-fi" :value="form.delivery_warehouse || '—'" readonly tabindex="-1" style="background:#f3f4f6;color:#6b7280"/>
                  </div>
                  <div style="grid-column:1/-1">
                    <label class="inv-lbl">Message to Suppliers</label>
                    <textarea class="inv-fi" v-model="form.message" rows="2" maxlength="500" placeholder="Optional note added to the email" style="resize:vertical"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Items -->
            <div class="add-card">
              <div class="add-card-header" @click="collapsed.items=!collapsed.items">
                <div class="add-card-title">
                  <span class="add-card-title-icon"><span v-html="icon('box',16)"></span></span> Items <span class="inv-req">*</span>
                  <span style="font-size:11.5px;color:#6b7280;font-weight:400;letter-spacing:0;text-transform:none">&nbsp;· {{ form.items.length }} line{{ form.items.length!==1?'s':'' }}</span>
                </div>
              </div>
              <div class="add-card-body" :class="{collapsed:collapsed.items}" style="padding:16px 16px 8px">
                <div v-if="itemsLocked" class="exp-field-hint" style="margin-bottom:8px">Items can't be changed after the request was sent. You can still add suppliers and send again.</div>
                <div class="po-item-cards">
                  <div v-for="(it,idx) in form.items" :key="it._id" class="po-item-card">
                    <div class="po-item-card-header">
                      <span class="po-item-card-num">#{{ idx+1 }}</span>
                      <span class="po-item-card-title">{{ it.item_name || it.item_code }}</span>
                      <div class="po-item-card-subtotal"><span class="po-item-card-subtotal-label">QTY</span><span class="po-item-card-amount">{{ it.qty || '—' }}</span></div>
                      <button v-if="!itemsLocked" class="po-item-card-rm" @click.stop="removeItem(idx)"><span v-html="icon('x',16)"></span></button>
                    </div>
                    <div class="po-item-card-body" style="grid-template-columns:1fr">
                      <div class="po-item-col po-item-col--right">
                        <div class="po-item-num-row">
                          <div class="po-item-field">
                            <label>Qty <span class="inv-req">*</span></label>
                            <input class="inv-fi" type="number" v-model.number="it.qty" min="0.01" :max="it.pending_qty ?? undefined" step="0.01" disabled title="Quantity comes from the material request and can't be changed here"/>
                            <div v-if="it.pending_qty != null" class="exp-field-hint">Pending on MRN: {{ it.pending_qty }} {{ it.uom }}</div>
                          </div>
                          <div class="po-item-field">
                            <label>UOM</label>
                            <input class="inv-fi" :value="it.uom || '—'" readonly tabindex="-1" style="background:#f3f4f6;color:#6b7280"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="!form.items.length" class="pr-items-empty" style="padding:20px 0 8px">Pick a Material Request to load its items.</div>
              </div>
            </div>

            <!-- Suppliers -->
            <div class="add-card">
              <div class="add-card-header" @click="collapsed.suppliers=!collapsed.suppliers">
                <div class="add-card-title">
                  <span class="add-card-title-icon"><span v-html="icon('truck',16)"></span></span> Suppliers <span class="inv-req">*</span>
                  <span style="font-size:11.5px;color:#6b7280;font-weight:400;letter-spacing:0;text-transform:none">&nbsp;· {{ form.suppliers.length }} of at least 1</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px" @click.stop>
                  <button class="add-lines-add-btn" @click="addSupplier"><span v-html="icon('plus',13)"></span> Add Supplier</button>
                </div>
              </div>
              <div class="add-card-body" :class="{collapsed:collapsed.suppliers}" style="padding:16px 16px 8px">
                <div class="po-item-cards">
                  <div v-for="(s,idx) in form.suppliers" :key="s._id" class="po-item-card">
                    <div class="po-item-card-header">
                      <span class="po-item-card-num">#{{ idx+1 }}</span>
                      <span class="po-item-card-title">{{ s.supplier_name || s.supplier || 'Supplier' }}</span>
                      <span v-if="s.send_status && s.send_status!=='Pending'" class="inv-status-badge" :class="sendClass(s.send_status)">{{ s.send_status }}</span>
                      <button class="po-item-card-rm" @click.stop="removeSupplier(idx)"><span v-html="icon('x',16)"></span></button>
                    </div>
                    <div class="po-item-card-body">
                      <div class="po-item-col po-item-col--left">
                        <div class="po-item-field">
                          <label>Supplier <span class="inv-req">*</span></label>
                          <SearchableSelect v-model="s.supplier" :options="supplierOptions" placeholder="Search supplier…" @search="fetchSuppliers" @select="o => onSupplierPick(s, o)"/>
                        </div>
                      </div>
                      <div class="po-item-col po-item-col--right">
                        <div class="po-item-field">
                          <label>Email <span class="inv-req">*</span></label>
                          <input class="inv-fi" type="email" v-model="s.email_id" placeholder="supplier@example.com"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="!form.suppliers.length" class="pr-items-empty" style="padding:20px 0 8px">No suppliers yet — click Add Supplier.</div>
              </div>
            </div>

          </div>
        </div>

        <div class="inv-dfooter">
          <div class="add-footer-status">{{ editingName ? 'Editing: ' + editingName : 'New RFQ — unsaved changes' }}</div>
          <div class="add-footer-actions">
            <button class="add-btn-cancel" @click="formOpen=false" :disabled="saving">Cancel</button>
            <button class="add-btn-draft" @click="save(false)" :disabled="saving || !(editingName ? $canEdit('bills') : canCreateRfq)">
              <span v-html="icon('save',13)"></span> {{ saving ? 'Saving…' : 'Save' }}
            </button>
            <button class="add-btn-more" @click="save(true)" :disabled="saving || !(editingName ? $canEdit('bills') : canCreateRfq)" title="Save, then email every supplier">
              <span v-html="icon('send',13)"></span> {{ saving ? 'Saving…' : 'Save & Send' }}
            </button>
          </div>
        </div>
      </div>
    </div>

  </Teleport>
</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useOpenFromQuery } from "../composables/useOpenFromQuery.js";
import { apiList, apiGet, apiGET, apiPOST, apiSave, resolveCompany } from "../api/client.js";
import SearchableSelect from "../components/SearchableSelect.vue";
import DocLink from "../components/DocLink.vue";
import QuotationDialog from "../components/QuotationDialog.vue";
import QuotationView from "../components/QuotationView.vue";
import Pagination from "../components/Pagination.vue";
import { usePagination } from "../composables/usePagination.js";
import { useToast } from "../composables/useToast.js";
import { useConfirm } from "../composables/useConfirm.js";
import { icon } from "../utils/icons.js";
import { usePermissions } from "../composables/usePermissions.js";
import { flt, fmtDate } from "../utils/format.js";
import { ownerName } from "../utils/userNames.js";

const { toast } = useToast();
const { confirm } = useConfirm();
const route  = useRoute();
const router = useRouter();

const API = "psd_books.api.rfq.";
const HINT = { module: "bills", action: "write" };

// Rights come from the server (module level + Sava job role), the same rules the API enforces.
// These only grey out buttons; the server still checks every call.
const { isAdmin, flags } = usePermissions();
const canCreateRfq = computed(() => isAdmin.value || !!flags.value.doc_access?.["Request for Quotation"]?.create);

const TABS = [{k:"all",l:"All"},{k:"Draft",l:"Draft"},{k:"Sent",l:"Sent"},{k:"Cancelled",l:"Cancelled"}];
const list     = ref([]);
const loading  = ref(false);
const search   = ref("");
const tab      = ref("all");
const dateRange = ref("all");
const DATE_RANGES = [{k:"all",l:"All Time"},{k:"month",l:"This Month"},{k:"quarter",l:"This Quarter"},{k:"year",l:"This Year"}];
function inDateRange(r) {
  if (dateRange.value === "all") return true;
  const d = String(r.posting_date || "").slice(0, 10);
  if (!d) return false;
  const n = new Date(), y = String(n.getFullYear()), m = n.getMonth();
  const dm = Number(d.slice(5, 7)) - 1;
  if (dateRange.value === "year") return d.slice(0, 4) === y;
  if (dateRange.value === "month") return d.slice(0, 4) === y && dm === m;
  const q = Math.floor(m / 3) * 3;
  return d.slice(0, 4) === y && dm >= q && dm < q + 3;
}
const viewOpen = ref(false);
const viewDoc  = ref(null);
const formOpen = ref(false);
const saving   = ref(false);
const sending  = ref(false);
const editingName = ref("");
const mrnOptions = ref([]);
const projectNames = ref({});
const projectLabel = (code) => (code ? (projectNames.value[code] || code) : "");
const supplierOptions = ref([]);
const collapsed = reactive({ details: false, items: false, suppliers: false });

let _lid = 1;
const blankForm = () => ({
  material_request: "", entry_date: new Date().toISOString().slice(0, 10), posting_date: new Date().toISOString().slice(0, 10), respond_by: "",
  project: "", delivery_warehouse: "", message: "", status: "Draft", items: [], suppliers: [],
});
const form = reactive(blankForm());
const itemsLocked = computed(() => !!editingName.value && form.status === "Sent");

const tabCounts = computed(() => ({
  Draft:     list.value.filter(r => r.status === "Draft").length,
  Sent:      list.value.filter(r => r.status === "Sent").length,
  Cancelled: list.value.filter(r => r.status === "Cancelled").length,
}));

const kpis = computed(() => {
  const l = list.value;
  const n = st => l.filter(r => r.status === st).length;
  return [
    { key: "total", label: "TOTAL RFQs", value: l.length, sub: "All requests", icon: "file", tab: "all" },
    { key: "active", label: "ACTIVE RFQs", value: l.length - n("Cancelled"), sub: "Draft, Sent & In Progress", icon: "activity", tab: "active" },
    { key: "sent", label: "SENT", value: n("Sent"), sub: "RFQs sent to suppliers", icon: "check", tab: "Sent" },
    { key: "cancelled", label: "CANCELLED", value: n("Cancelled"), sub: "Cancelled RFQs", icon: "cancel", tab: "Cancelled" },
  ];
});
function exportCSV() {
  const headers = ["RFQ #", "Material Request", "Project", "Date", "Respond By", "Status"];
  const rows = filtered.value.map(r => [r.name, r.material_request || "", r.project || "", r.posting_date || "", r.respond_by || "", displayStatus(r)]);
  const csv = [headers, ...rows].map(row => row.map(v => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url; a.download = "requests_for_quotation.csv"; a.click();
  URL.revokeObjectURL(url);
}

const filtered = computed(() => {
  let rows = list.value;
  if (tab.value === "active") rows = rows.filter(r => r.status !== "Cancelled");
  else if (tab.value !== "all") rows = rows.filter(r => r.status === tab.value);
  if (dateRange.value !== "all") rows = rows.filter(inDateRange);
  const q = search.value.trim().toLowerCase();
  if (q) rows = rows.filter(r => [r.name, r.material_request, r.project, projectLabel(r.project)].some(v => (v || "").toLowerCase().includes(q)));
  return rows;
});
const { page, pageSize, paged } = usePagination(filtered, { storageKey: "rfqs" });

const progress = ref({});   // { rfq name: { quoted, total } } from get_rfq_progress
function displayStatus(r) {
  if (!r) return "";
  const p = progress.value[r.name];
  if (r.status === "Sent" && p && p.quoted) return `${p.quoted} of ${Math.max(p.total, p.quoted)} quoted`;
  return r.status;
}
function statusClass(s) {
  if (s === "Cancelled") return "b-badge-muted";
  if (s === "Sent" || / quoted$/.test(s || "")) return "b-badge-blue";
  return "b-badge-orange";
}
function sendClass(s) {
  if (s === "Sent") return "b-badge-green";
  if (s === "Failed") return "b-badge-red";
  return "b-badge-orange";
}
function sentCount(d) { return (d.suppliers || []).filter(s => s.send_status === "Sent").length; }
function canSend(d) {
  return d && d.status !== "Cancelled" && (d.suppliers || []).some(s => s.send_status !== "Sent");
}
function sendLabel(d) { return sentCount(d) ? "Send to Remaining" : "Send to Suppliers"; }

async function load() {
  loading.value = true;
  try {
    list.value = await apiList("Request for Quotation", {
      fields: ["name", "material_request", "project", "posting_date", "respond_by", "status", "modified"],
      limit: 100000, order: "modified desc",
    }) || [];
  } catch (e) {
    toast.error(e.message || "Could not load Requests for Quotation");
    list.value = [];
  }
  try {
    const pr = await apiList("Project", { fields: ["name", "project_name"], limit: 1000 });
    projectNames.value = Object.fromEntries((pr || []).map(x => [x.name, x.project_name]));
  } catch (e) { projectNames.value = {}; }
  try {
    const pr = await apiGET("psd_books.api.rfq.get_rfq_progress");
    progress.value = (pr && pr.progress) || {};
  } catch { progress.value = {}; }
  loading.value = false;
}

async function openView(r) {
  viewOpen.value = true;
  viewDoc.value = null;
  try { viewDoc.value = await apiGet("Request for Quotation", r.name); }
  catch (e) { toast.error(e.message || "Failed to load"); viewOpen.value = false; }
}

async function refreshView() {
  if (!viewDoc.value) return;
  viewDoc.value = await apiGet("Request for Quotation", viewDoc.value.name);
}

// --- pickers -----------------------------------------------------------------
async function fetchMrns(q = "") {
  try {
    const filters = [["docstatus", "=", 1], ["material_request_type", "in", ["Purchase", "Asset"]],
      ["status", "in", ["Approved", "Partly Issued"]]];
    if (q) filters.push(["name", "like", `%${q}%`]);
    const rows = await apiList("Material Request", {
      fields: ["name", "project", "posting_date"], filters, limit: 30, order: "modified desc",
    });
    mrnOptions.value = (rows || []).map(r => ({ value: r.name, label: [r.name, r.project].filter(Boolean).join("  •  ") }));
  } catch { mrnOptions.value = []; }
}

async function fetchSuppliers(q = "") {
  try {
    const filters = [["disabled", "=", 0]];
    if (q) filters.push(["supplier_name", "like", `%${q}%`]);
    const rows = await apiList("Supplier", {
      fields: ["name", "supplier_name", "email_id"], filters, limit: 30, order: "supplier_name asc",
    });
    supplierOptions.value = (rows || []).map(r => ({
      value: r.name, label: r.supplier_name || r.name, supplier_name: r.supplier_name || r.name, email_id: r.email_id || "",
    }));
  } catch { supplierOptions.value = []; }
}

function onSupplierPick(row, opt) {
  const o = opt && typeof opt === "object" ? opt : supplierOptions.value.find(x => x.value === opt);
  if (!o) return;
  row.supplier = o.value;
  row.supplier_name = o.supplier_name || o.label || o.value;
  row.email_id = o.email_id || "";
}

// --- form --------------------------------------------------------------------
function resetForm() {
  Object.assign(form, blankForm());
  editingName.value = "";
}

function applyPrefill(d) {
  Object.assign(form, {
    material_request: d.material_request,
    project: d.project || "",
    delivery_warehouse: d.delivery_warehouse || "",
    posting_date: d.posting_date || form.posting_date,
    entry_date: d.entry_date || form.entry_date,
    respond_by: d.respond_by || "",
  });
  form.items = (d.items || []).map(it => ({
    _id: _lid++, mrn_item: it.mrn_item, item_code: it.item_code, item_name: it.item_name || it.item_code,
    uom: it.uom || "", qty: flt(it.qty), pending_qty: flt(it.qty), intended_use: it.intended_use || "",
  }));
}

async function onMrnPick(opt) {
  const name = (opt && opt.value) || opt;
  if (!name || editingName.value) return;
  try { applyPrefill(await apiGET(API + "get_rfq_prefill", { mrn: name })); }
  catch (e) { toast.error(e.message); form.material_request = ""; form.items = []; }
}

// Sava A7.2: start from an Approved MRN (Create RFQ button on the MRN screen)
async function openNew(mrn) {
  resetForm();
  fetchSuppliers("");
  fetchMrns("");
  formOpen.value = true;
  if (mrn) {
    try {
      applyPrefill(await apiGET(API + "get_rfq_prefill", { mrn }));
      if (!mrnOptions.value.some(o => o.value === mrn)) mrnOptions.value.push({ value: mrn, label: mrn });
    } catch (e) {
      toast.error(e.message);
      formOpen.value = false;
    }
  }
}

async function openEdit(r) {
  resetForm();
  fetchSuppliers("");
  try {
    const d = await apiGet("Request for Quotation", r.name);
    editingName.value = d.name;
    Object.assign(form, {
      material_request: d.material_request, project: d.project || "", delivery_warehouse: d.delivery_warehouse || "",
      posting_date: d.posting_date, entry_date: d.entry_date || d.posting_date, respond_by: d.respond_by || "", message: d.message || "", status: d.status,
    });
    mrnOptions.value = [{ value: d.material_request, label: d.material_request }];
    form.items = (d.items || []).map(it => ({
      _id: _lid++, name: it.name, mrn_item: it.mrn_item, item_code: it.item_code, item_name: it.item_name,
      uom: it.uom || "", qty: flt(it.qty), pending_qty: null, intended_use: it.intended_use || "",
    }));
    form.suppliers = (d.suppliers || []).map(s => ({
      _id: _lid++, name: s.name, supplier: s.supplier, supplier_name: s.supplier_name,
      email_id: s.email_id || "", send_status: s.send_status, sent_on: s.sent_on, send_error: s.send_error,
    }));
    formOpen.value = true;
  } catch (e) { toast.error(e.message || "Failed to load"); }
}

function removeItem(i) { form.items.splice(i, 1); }
function addSupplier() { form.suppliers.push({ _id: _lid++, supplier: "", supplier_name: "", email_id: "", send_status: "Pending" }); }
function removeSupplier(i) { form.suppliers.splice(i, 1); }

function validateForm() {
  if (!form.material_request) return "Select the Material Request";
  if (!form.entry_date) return "Entry Date is required";
  if (!form.items.length) return "Add at least one item";
  for (const it of form.items) {
    if (!(flt(it.qty) > 0)) return `Qty must be greater than zero for ${it.item_code}`;
    if (it.pending_qty != null && flt(it.qty) > flt(it.pending_qty) + 1e-4)
      return `${it.item_code}: only ${it.pending_qty} pending on the MRN`;
  }
  const seen = new Set();
  for (const s of form.suppliers) {
    if (!s.supplier) return "Select a supplier on every supplier row";
    if (seen.has(s.supplier)) return `Supplier ${s.supplier_name || s.supplier} is listed twice`;
    seen.add(s.supplier);
  }
  return "";
}

async function save(andSend) {
  const err = validateForm();
  if (err) return toast.error(err);
  if (andSend) {
    if (form.suppliers.length < 1) return toast.error("Add at least 1 supplier before sending");
    const noEmail = form.suppliers.filter(s => !(s.email_id || "").trim()).map(s => s.supplier_name || s.supplier);
    if (noEmail.length) return toast.error("No email address for: " + noEmail.join(", "));
  }
  saving.value = true;
  try {
    const doc = {
      doctype: "Request for Quotation",
      company: await resolveCompany(),
      material_request: form.material_request,
      posting_date: form.posting_date,
      entry_date: form.entry_date,
      respond_by: form.respond_by || null,
      message: form.message || "",
      items: form.items.map(it => ({
        doctype: "Request for Quotation Item", ...(it.name ? { name: it.name } : {}),
        mrn_item: it.mrn_item, item_code: it.item_code, item_name: it.item_name,
        qty: flt(it.qty), uom: it.uom || "", intended_use: it.intended_use || "",
      })),
      suppliers: form.suppliers.map(s => ({
        doctype: "Request for Quotation Supplier", ...(s.name ? { name: s.name } : {}),
        supplier: s.supplier, supplier_name: s.supplier_name, email_id: (s.email_id || "").trim(),
      })),
    };
    if (editingName.value) doc.name = editingName.value;
    const saved = await apiSave(doc);
    const name = saved?.name || editingName.value;
    if (andSend) {
      await doSend(name);
    } else {
      toast.success(`RFQ ${name} saved`);
    }
    formOpen.value = false;
    await load();
  } catch (e) {
    toast.error(e.message || "Failed to save");
  }
  saving.value = false;
}

// --- supplier quotations (Sava A8.4) -------------------------------------------
const SQ_API = "psd_books.api.supplier_quotation.";
const qd = reactive({ open: false, rfq: "", supplier: "", supplier_name: "" });

const qv = reactive({ open: false, name: "", supplier_name: "" });
function showActions(d, canEdit) { return !!d && ((canQuote(d) && !!canEdit) || (d.suppliers || []).some(s => s.quotation)); }
function openQuoteView(s) { Object.assign(qv, { open: true, name: s.quotation, supplier_name: s.supplier_name || s.supplier }); }

function canQuote(d) { return !!d && d.status === "Sent"; }  // template adds $canEdit('bills')

function openQuote(s) {
  if (!viewDoc.value) return;
  Object.assign(qd, { open: true, rfq: viewDoc.value.name, supplier: s.supplier, supplier_name: s.supplier_name || s.supplier });
}

async function onQuoteSaved() {
  qd.open = false;
  try { await refreshView(); } catch {}
}

async function cancelQuote(s) {
  if (!s.quotation) return;
  const ok = await confirm({
    title: "Cancel quotation?",
    body: `${s.quotation} from ${s.supplier_name || s.supplier} will be cancelled. You can enter a new quotation for this supplier afterwards.`,
    okLabel: "Cancel Quotation", cancelLabel: "Keep", okStyle: "danger",
  });
  if (!ok) return;
  try {
    await apiPOST(SQ_API + "cancel_quotation", { name: s.quotation }, HINT);
    toast.success(`Quotation ${s.quotation} cancelled`);
    await refreshView();
  } catch (e) { toast.error(e.message || "Cancel failed"); }
}

// --- send / cancel -------------------------------------------------------------
async function doSend(name) {
  const res = await apiPOST(API + "send_rfq", { name }, HINT);
  const ok = (res.sent || []).length, bad = (res.failed || []).length;
  if (bad) toast.error(`${ok} sent, ${bad} failed. Check the supplier list and send again to retry.`);
  else toast.success(`RFQ ${name} sent to ${ok} supplier${ok !== 1 ? "s" : ""}`);
  return res;
}

async function sendRfq() {
  if (!viewDoc.value) return;
  sending.value = true;
  try { await doSend(viewDoc.value.name); }
  catch (e) { toast.error(e.message || "Send failed"); }
  try { await refreshView(); await load(); } catch {}
  sending.value = false;
}

async function cancelRfq() {
  if (!viewDoc.value) return;
  const ok = await confirm({
    title: "Cancel Request for Quotation?",
    body: `${viewDoc.value.name} will be cancelled and can no longer be edited or sent.`,
    okLabel: "Cancel RFQ", okStyle: "danger",
  });
  if (!ok) return;
  try {
    await apiPOST(API + "cancel_rfq", { name: viewDoc.value.name }, HINT);
    toast.success("Request for Quotation cancelled");
    await refreshView();
    await load();
  } catch (e) { toast.error(e.message || "Cancel failed"); }
}

onMounted(async () => {
  await load();
  useOpenFromQuery({
    route,
    openByName: (n) => openView(list.value.find(r => r.name === n) || { name: n }),
  });
  if (route.query.new_from_mrn) {
    const mrn = String(route.query.new_from_mrn);
    router.replace({ path: route.path, query: {} });
    await openNew(mrn);
  }
});
</script>

<style scoped>
.rfq-kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin:0 0 18px; }
.rfq-kpi { display:flex; align-items:center; gap:16px; padding:20px 22px; border:1px solid #e5e7eb; border-radius:14px; background:#fff; }
.rfq-kpi-icon { width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.rfq-kpi-label { font-size:11.5px; font-weight:600; letter-spacing:.06em; color:#4b5563; }
.rfq-kpi-value { font-size:28px; font-weight:800; color:#111827; line-height:1.15; }
.rfq-kpi-sub { font-size:12px; color:#6b7280; margin-top:2px; }
.rfq-kpi-click { cursor:pointer; transition:box-shadow .15s, transform .15s, border-color .15s; }
.rfq-kpi-click:hover { box-shadow:0 4px 14px rgba(15,23,42,.08); transform:translateY(-1px); }
.rfq-kpi-on { border-color:#2563eb !important; box-shadow:0 0 0 2px rgba(37,99,235,.25); }
.rfq-kpi-total { background:linear-gradient(135deg,#eff6ff,#fff); border-color:#dbeafe; } .rfq-kpi-total .rfq-kpi-icon { background:#dbeafe; color:#2563eb; }
.rfq-kpi-active { background:linear-gradient(135deg,#f5f3ff,#fff); border-color:#ede9fe; } .rfq-kpi-active .rfq-kpi-icon { background:#ede9fe; color:#7c3aed; }
.rfq-kpi-sent { background:linear-gradient(135deg,#ecfdf5,#fff); border-color:#bbf7d0; } .rfq-kpi-sent .rfq-kpi-icon { background:#d1fae5; color:#16a34a; }
.rfq-kpi-cancelled { background:linear-gradient(135deg,#fef2f2,#fff); border-color:#fecaca; } .rfq-kpi-cancelled .rfq-kpi-icon { background:#fee2e2; color:#dc2626; } .rfq-kpi-cancelled .rfq-kpi-value { color:#dc2626; }
@media (max-width:1024px) { .rfq-kpis { grid-template-columns:repeat(2,1fr); } }
.rfq-mr-note{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 14px;padding:10px 14px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;color:#1e40af;font-size:13px}
.rfq-mr-link{color:#1d4ed8;font-weight:600;text-decoration:none}
.rfq-mr-link:hover{text-decoration:underline}
/* RFQ view drawer: same look as the GRN / PO view drawers.
   list.css, view.css, edit.css and add.css are already global (main.js);
   only the page-scoped pr-* rules were missing here. */
.pr-view-drawer { width: min(960px, 100vw); max-width: 100vw; background: #f4f6f9; }
.pr-view-drawer .inv-view-header { background: linear-gradient(135deg,#1a237e 0%,#1565c0 100%); padding: 14px 28px; border-bottom: none; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
.pr-view-drawer .inv-view-number { color: #fff; font-size: 20px; }
.pr-view-drawer .inv-view-subtitle { color: rgba(255,255,255,.65); font-size: 12px; margin-top: 2px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.rfq-hdr-right { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
.rfq-hdr-actions { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
.pr-view-drawer .rfq-hdr-actions .inv-ab-btn { background: #fff; border-color: #fff; color: #1565c0; font-weight: 600; }
.pr-view-drawer .rfq-hdr-actions .inv-ab-btn:hover { background: #f1f5f9; border-color: #f1f5f9; color: #1565c0; }
.pr-view-drawer .rfq-hdr-actions .inv-ab-primary { background: #dbeafe; border-color: #dbeafe; color: #1d4ed8; }
.pr-view-drawer .rfq-hdr-actions .inv-ab-primary:hover { background: #bfdbfe; border-color: #bfdbfe; color: #1d4ed8; }
.pr-view-drawer .rfq-hdr-actions .pr-act-cancel { background: #fee2e2 !important; border-color: #fee2e2 !important; color: #dc2626 !important; }
.pr-view-drawer .rfq-hdr-actions .pr-act-cancel:hover { background: #fecaca !important; border-color: #fecaca !important; color: #b91c1c !important; }
.pr-view-drawer .inv-dclose { width: 30px; height: 30px; border: none; border-radius: 8px; background: #fff; color: #000; display: grid; place-items: center; flex-shrink: 0; }
.pr-view-drawer .inv-dclose:hover { background: #f8fafc; }

/* -- Action bar primary button -- */
.inv-ab-primary { background:#2563eb;border-color:#2563eb;color:#fff; }
.inv-ab-primary:hover { background:#1d4ed8;border-color:#1d4ed8;color:#fff; }
.pr-act-cancel:hover { background:#fffbeb !important;border-color:#fde68a !important;color:#d97706 !important; }

/* -- View cards -- */
.pr-view-card { background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;margin-bottom:14px; }
.pr-view-card-hdr { display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:#f8fafc;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:700;color:#374151;letter-spacing:.02em; }
.pr-item-count { font-size:11.5px;font-weight:500;color:#6b7280;letter-spacing:0; }

/* -- Info grid -- */
.pr-info-grid { display:grid;grid-template-columns:1fr 1fr;gap:0; }
.pr-info-item { padding:10px 16px;border-bottom:1px solid #f1f5f9; }
.pr-info-item:nth-child(odd) { border-right:1px solid #f1f5f9; }
.pr-info-full { grid-column:1/-1; }
.pr-info-lbl { font-size:10.5px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em;margin-bottom:3px; }
.pr-info-val { font-size:13px;color:#111827;line-height:1.4; }
.pr-info-empty { color:#9ca3af !important; }
.pr-info-link a, .pr-info-link span { color:#2563eb;font-weight:500; }

/* -- Tables inside cards -- */
.pr-items-tbl { font-size:12.5px;width:100%; }
.pr-items-tbl td { vertical-align:middle; }
.pr-row-num { color:#9ca3af;font-size:11.5px;font-weight:600;text-align:center; }
.pr-actions-row { display:flex;align-items:center;justify-content:center;gap:4px;flex-wrap:nowrap; }
.pr-actions-row .inv-ab-btn { padding:4px 10px;font-size:12px;white-space:nowrap; }

/* -- Misc -- */
.ta-r { text-align:right; }
.c-muted { color:#6b7280; }
.mono { font-size:13px; }

@media (max-width: 768px) {
  .pr-info-grid { grid-template-columns:1fr; }
  .pr-info-item:nth-child(odd) { border-right:none; }
  .pr-view-card { overflow-x:auto; }
}
</style>