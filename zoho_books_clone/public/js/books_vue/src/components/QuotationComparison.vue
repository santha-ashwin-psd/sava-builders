<template>
  <!-- Sava A9.6: compare the Active supplier quotations of one RFQ, choose a supplier per line.
       Rendered inside RequestForQuotation.vue so it stacks above the RFQ drawer. -->
  <div v-if="open" class="inv-drawer-bg" @click.self="close">
    <div class="inv-drawer-panel" style="width:min(1120px,96vw);max-width:96vw">
      <div class="inv-dh">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <div class="inv-dh-title">Quotation Comparison</div>
          <span class="inv-dh-sub" style="margin-left:4px">{{ rfq }}<template v-if="cmp"> · {{ cmp.name }}</template></span>
          <span v-if="cmp" class="inv-status-badge" :class="statusClass(cmp.status)">{{ cmp.status }}</span>
        </div>
        <button class="inv-dclose" @click="close" :disabled="saving"><span v-html="icon('x',16)"></span></button>
      </div>

      <div class="inv-content-row">
        <div class="inv-dbody">
          <div v-if="loading" style="padding:24px"><div class="shimmer" style="height:12px"></div></div>
          <div v-else-if="loadError" class="exp-field-hint" style="padding:16px;color:#C92A2A">{{ loadError }}</div>
          <template v-else-if="data">

            <!-- other comparisons on this RFQ -->
            <div v-if="(data.comparisons||[]).length && (data.comparisons.length > 1 || !cmp)" class="pr-actions-row" style="margin-bottom:10px;flex-wrap:wrap">
              <span class="exp-field-hint" style="margin:0">Comparisons on this RFQ:</span>
              <button v-for="h in data.comparisons" :key="h.name" class="inv-ab-btn" :class="{'inv-ab-primary': cmp && cmp.name===h.name}" @click="load(h.name)">
                {{ h.name }} · {{ h.status }}
              </button>
              <button v-if="data.can_create && cmp" class="inv-ab-btn" @click="load()">New comparison</button>
            </div>

            <div v-if="cmp && cmp.status==='Rejected' && cmp.rejection_reason" class="exp-field-hint" style="margin-bottom:10px;color:#C92A2A">
              Rejected: {{ cmp.rejection_reason }}
            </div>
            <div v-if="data.unquoted && data.unquoted.length" class="exp-field-hint" style="margin-bottom:10px;color:#b45309">
              No supplier has quoted: {{ data.unquoted.join(', ') }}. The comparison can be saved, but it can't be approved until every item has a supplier.
            </div>
            <div v-if="!cmp && !data.can_create" class="exp-field-hint" style="margin-bottom:10px;color:#b45309">
              A comparison can only be made while the request is Sent.
            </div>
            <div v-if="!suppliers.length" class="exp-field-hint" style="padding:16px">
              There are no Active quotations on this request yet. Enter at least one quotation first.
            </div>

            <!-- Grid: item x supplier -->
            <div v-else class="add-card">
              <div class="add-card-header">
                <div class="add-card-title">
                  Items by supplier
                  <span style="font-size:11.5px;color:#6b7280;font-weight:400;letter-spacing:0;text-transform:none">&nbsp;· net rate after discount, before VAT; L1 is the lowest rate</span>
                </div>
              </div>
              <div class="add-card-body" style="padding:0;overflow-x:auto">
                <table class="inv-table pr-items-tbl">
                  <thead>
                    <tr>
                      <th style="width:32px">#</th>
                      <th style="min-width:180px">Item</th>
                      <th class="ta-r" style="width:90px">Qty</th>
                      <th v-for="q in suppliers" :key="q.quotation" style="min-width:150px">
                        <div>{{ q.supplier_name }}</div>
                        <div class="c-muted mono-sm" style="font-weight:400">{{ q.quotation }}<template v-if="q.delivery_days != null"> · {{ q.delivery_days }} d</template></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(e,i) in data.ranking" :key="e.line.mrn_item">
                      <tr class="inv-row">
                        <td class="pr-row-num">{{ i+1 }}</td>
                        <td style="font-weight:500;color:#111827">{{ e.line.item_name || e.line.item_code }}</td>
                        <td class="ta-r mono">{{ e.line.qty }} <span class="c-muted">{{ e.line.uom || '' }}</span></td>
                        <td v-for="q in suppliers" :key="q.quotation">
                          <template v-if="offerFor(e, q.quotation)">
                            <label style="display:flex;gap:8px;align-items:flex-start;cursor:pointer">
                              <input type="radio" :name="'cmp-'+e.line.mrn_item" :value="q.quotation"
                                v-model="choices[e.line.mrn_item].quotation" :disabled="!editable" style="margin-top:3px"/>
                              <span>
                                <span class="inv-status-badge" :class="rankClass(offerFor(e, q.quotation).rank)">{{ offerFor(e, q.quotation).label }}</span>
                                <span class="mono" style="margin-left:6px">{{ money(offerFor(e, q.quotation).net_rate) }}</span>
                                <div class="c-muted mono-sm">incl. VAT {{ money(offerFor(e, q.quotation).amount + offerFor(e, q.quotation).tax_amount) }}</div>
                              </span>
                            </label>
                          </template>
                          <span v-else class="c-muted">—</span>
                        </td>
                      </tr>
                      <tr v-if="needsReason(e) || savedReason(e)" class="inv-row">
                        <td></td>
                        <td :colspan="suppliers.length + 2">
                          <template v-if="editable">
                            <label class="inv-lbl" style="margin-bottom:2px">Reason for choosing {{ chosenOffer(e).supplier_name }} (rate is above L1) <span class="inv-req">*</span></label>
                            <input class="inv-fi" v-model="choices[e.line.mrn_item].reason" maxlength="300" placeholder="Why not the lowest quotation?"/>
                          </template>
                          <div v-else class="exp-field-hint" style="margin:0">Reason: {{ savedReason(e) }}</div>
                        </td>
                      </tr>
                      <tr v-if="!e.offers.length" class="inv-row">
                        <td></td>
                        <td :colspan="suppliers.length + 2" class="exp-field-hint" style="color:#b45309;margin:0">Not quoted by any supplier</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Supplier totals -->
            <div v-if="suppliers.length" class="add-card">
              <div class="add-card-header"><div class="add-card-title">Award by supplier <span style="font-size:11.5px;color:#6b7280;font-weight:400;letter-spacing:0;text-transform:none">&nbsp;· one LPO per supplier</span></div></div>
              <div class="add-card-body" style="padding:0">
                <table class="inv-table pr-items-tbl">
                  <thead><tr><th>Supplier</th><th class="ta-r" style="width:70px">Lines</th><th class="ta-r" style="width:130px">Net</th><th class="ta-r" style="width:130px">VAT</th><th class="ta-r" style="width:140px">Total</th></tr></thead>
                  <tbody>
                    <tr v-for="s in supplierRows" :key="s.supplier" class="inv-row">
                      <td style="font-weight:500;color:#111827">{{ s.supplier_name }}</td>
                      <td class="ta-r mono">{{ s.line_count }}</td>
                      <td class="ta-r mono">{{ money(s.net_total) }}</td>
                      <td class="ta-r mono">{{ money(s.total_tax) }}</td>
                      <td class="ta-r mono">{{ money(s.grand_total) }}</td>
                    </tr>
                    <tr v-if="!supplierRows.length"><td colspan="5" style="text-align:center;padding:16px;color:#9ca3af;font-size:13px">No supplier chosen yet</td></tr>
                  </tbody>
                </table>
                <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;padding:10px 14px 12px;font-size:13px">
                  <div>Net total: <strong class="mono">{{ money(totals.net) }}</strong></div>
                  <div>VAT: <strong class="mono">{{ money(totals.tax) }}</strong></div>
                  <div style="font-size:14px">Grand total: <strong class="mono">KES {{ money(totals.grand) }}</strong></div>
                  <div v-if="editable" class="exp-field-hint">Preview only. The saved totals are calculated by the server.</div>
                </div>
              </div>
            </div>

            <!-- Approval steps -->
            <div v-if="cmp && (cmp.approval_steps||[]).length" class="add-card">
              <div class="add-card-header"><div class="add-card-title">Approval</div></div>
              <div class="add-card-body" style="padding:0">
                <table class="inv-table pr-items-tbl">
                  <thead><tr><th style="width:60px">Level</th><th>Role</th><th style="width:100px">Status</th><th>Approver</th><th style="width:150px">On</th><th>Remarks</th></tr></thead>
                  <tbody>
                    <tr v-for="s in cmp.approval_steps" :key="s.level" class="inv-row">
                      <td class="mono">{{ s.level }}</td>
                      <td>{{ s.role }}</td>
                      <td><span class="inv-status-badge" :class="stepClass(s.status)">{{ s.status }}</span></td>
                      <td class="c-muted">{{ s.approver || '—' }}</td>
                      <td class="c-muted mono-sm">{{ s.approved_on ? String(s.approved_on).slice(0,16) : '—' }}</td>
                      <td class="c-muted">{{ s.remarks || '' }}</td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="cmp.raised_by" class="exp-field-hint" style="padding:8px 14px;margin:0">Raised by {{ cmp.raised_by }}</div>
              </div>
            </div>

            <!-- Pending approval: what the caller may do -->
            <div v-if="cmp && cmp.status==='Pending Approval'" class="add-card">
              <div class="add-card-header"><div class="add-card-title">Your action</div></div>
              <div class="add-card-body" style="padding:12px 14px">
                <div v-if="cmp.action && cmp.action.can_act">
                  <div class="exp-field-hint" style="margin:0 0 8px">Level {{ cmp.action.level }} ({{ cmp.action.role }}) is waiting for you.</div>
                  <input class="inv-fi" v-model="remarks" maxlength="300" placeholder="Remarks (optional)"/>
                  <textarea v-if="showReject" class="inv-fi" v-model="rejectReason" rows="2" maxlength="300" placeholder="Rejection reason (required)…" style="margin-top:8px;border-color:#fca5a5"></textarea>
                </div>
                <div v-else class="exp-field-hint" style="margin:0">
                  <template v-if="cmp.action && cmp.action.level">Waiting for level {{ cmp.action.level }} ({{ cmp.action.role }}). </template>{{ (cmp.action && cmp.action.reason) || '' }}
                </div>
              </div>
            </div>

            <!-- LPOs -->
            <div v-if="cmp && (cmp.lpos||[]).length" class="add-card">
              <div class="add-card-header"><div class="add-card-title">LPOs created</div></div>
              <div class="add-card-body" style="padding:0">
                <table class="inv-table pr-items-tbl">
                  <thead><tr><th>Purchase Order</th><th>Supplier</th><th style="width:100px">Status</th><th class="ta-r" style="width:140px">Total</th></tr></thead>
                  <tbody>
                    <tr v-for="p in cmp.lpos" :key="p.name" class="inv-row">
                      <td><DocLink doctype="Purchase Order" :name="p.name" /></td>
                      <td>{{ p.supplier_name || p.supplier }}</td>
                      <td>{{ p.status }}</td>
                      <td class="ta-r mono">{{ money(p.grand_total) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </template>
        </div>
      </div>

      <div class="inv-dfooter">
        <div class="add-footer-status">{{ footerStatus }}</div>
        <div class="add-footer-actions">
          <button class="add-btn-cancel" @click="close" :disabled="saving">Close</button>
          <button v-if="editable && !cmp && suppliers.length" class="add-btn-draft" @click="create" :disabled="saving || loading">
            <span v-html="icon('save',13)"></span> {{ saving ? 'Creating…' : 'Create Comparison' }}
          </button>
          <button v-if="editable && cmp && suppliers.length" class="add-btn-draft" @click="saveSelection" :disabled="saving || loading">
            <span v-html="icon('save',13)"></span> {{ saving ? 'Saving…' : 'Save Selection' }}
          </button>
          <button v-if="editable && cmp && canEdit" class="add-btn-draft" @click="sendForApproval"
            :disabled="saving || loading || dirty || (data.unquoted && data.unquoted.length > 0)"
            :title="dirty ? 'Save the selection first' : ((data.unquoted && data.unquoted.length) ? 'Every item needs a quotation' : '')">
            Send for Approval
          </button>
          <template v-if="cmp && cmp.status==='Pending Approval' && cmp.action && cmp.action.can_act">
            <button class="add-btn-cancel" style="color:#C92A2A" @click="doReject" :disabled="saving">{{ showReject ? 'Confirm Reject' : 'Reject' }}</button>
            <button class="add-btn-draft" @click="doApprove" :disabled="saving">{{ saving ? 'Working…' : 'Approve' }}</button>
          </template>
          <button v-if="cmp && cmp.status==='Approved'" class="add-btn-draft" @click="doCreateLpos" :disabled="saving">
            {{ saving ? 'Creating…' : 'Create LPOs' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { apiGET, apiPOST } from "../api/client.js";
import DocLink from "./DocLink.vue";
import { useToast } from "../composables/useToast.js";
import { icon } from "../utils/icons.js";

const props = defineProps({
  open: { type: Boolean, default: false },
  rfq: { type: String, default: "" },
  canEdit: { type: Boolean, default: false },
});
const emit = defineEmits(["close", "changed"]);

const { toast } = useToast();
const API = "zoho_books_clone.api.quotation_comparison.";
const HINT = { module: "bills", action: "write" };

const loading = ref(false);
const saving = ref(false);
const loadError = ref("");
const data = ref(null);
const choices = ref({});   // { mrn_item: { quotation, reason } }
const remarks = ref("");
const showReject = ref(false);
const rejectReason = ref("");
const snapshot = ref("");  // selection as last loaded or saved, to spot unsaved changes

const cmp = computed(() => (data.value && data.value.comparison) || null);

// A new comparison or a Draft can be edited by someone who may edit; every other status is read-only.
const editable = computed(() => {
  if (!props.canEdit || !data.value) return false;
  return cmp.value ? !!cmp.value.editable : !!data.value.can_create;
});

const r2 = (x) => Math.round(Number(x || 0) * 100 + 1e-9) / 100;
function money(v) {
  return Number(v || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// one column per Active quotation, in supplier-name order
const suppliers = computed(() => {
  const seen = new Map();
  for (const e of (data.value?.ranking || [])) {
    for (const o of e.offers) {
      if (!seen.has(o.quotation)) seen.set(o.quotation, { quotation: o.quotation, supplier: o.supplier, supplier_name: o.supplier_name, delivery_days: o.delivery_days });
    }
  }
  return [...seen.values()].sort((a, b) => String(a.supplier_name).localeCompare(String(b.supplier_name)));
});

function offerFor(entry, quotation) { return entry.offers.find(o => o.quotation === quotation) || null; }
function chosenOffer(entry) {
  const c = choices.value[entry.line.mrn_item];
  return c && c.quotation ? offerFor(entry, c.quotation) : null;
}
// Same rule as the server: a reason is needed only when the chosen net rate is above L1.
function needsReason(entry) {
  if (!editable.value) return false;
  const o = chosenOffer(entry);
  return !!o && entry.offers.length > 0 && o.net_rate > entry.offers[0].net_rate;
}
function savedReason(entry) {
  if (editable.value) return "";
  const c = choices.value[entry.line.mrn_item];
  return c && c.reason ? c.reason : "";
}

// Preview from the chosen offers while editing; the server's figures once saved and read-only.
const preview = computed(() => {
  const groups = new Map();
  let net = 0, tax = 0;
  for (const e of (data.value?.ranking || [])) {
    const o = chosenOffer(e);
    if (!o) continue;
    net += o.amount; tax += o.tax_amount;
    const g = groups.get(o.supplier) || { supplier: o.supplier, supplier_name: o.supplier_name, line_count: 0, net_total: 0, total_tax: 0 };
    g.line_count += 1; g.net_total += o.amount; g.total_tax += o.tax_amount;
    groups.set(o.supplier, g);
  }
  const rows = [...groups.values()].map(g => ({ ...g, net_total: r2(g.net_total), total_tax: r2(g.total_tax), grand_total: r2(g.net_total + g.total_tax) }));
  return { rows, net: r2(net), tax: r2(tax), grand: r2(net + tax) };
});
const useServer = computed(() => !!cmp.value && !editable.value);
const supplierRows = computed(() => (useServer.value ? (cmp.value.supplier_totals || []) : preview.value.rows));
const totals = computed(() => useServer.value
  ? { net: cmp.value.net_total, tax: cmp.value.total_tax, grand: cmp.value.grand_total }
  : preview.value);

const footerStatus = computed(() => {
  if (!data.value) return "";
  if (!cmp.value) return "New comparison — not saved";
  return editable.value ? "Draft — selection not final until saved" : cmp.value.status;
});

const dirty = computed(() => !!cmp.value && editable.value && !!data.value && JSON.stringify(rowsToSend()) !== snapshot.value);

function statusClass(s) {
  if (s === "Approved" || s === "LPOs Created") return "b-badge-green";
  if (s === "Rejected") return "b-badge-red";
  return "b-badge-orange";
}
function stepClass(s) { return s === "Approved" ? "b-badge-green" : (s === "Rejected" ? "b-badge-red" : "b-badge-orange"); }
function rankClass(rank) { return rank === 1 ? "b-badge-green" : (rank === 2 ? "b-badge-orange" : "b-badge-muted"); }

function initChoices() {
  const saved = {};
  for (const it of (data.value?.items || [])) saved[it.mrn_item] = it;
  const out = {};
  for (const e of data.value.ranking) {
    const key = e.line.mrn_item;
    out[key] = cmp.value
      ? { quotation: saved[key]?.selected_quotation || null, reason: saved[key]?.reason || "" }
      : { quotation: e.default_quotation || null, reason: "" };
  }
  choices.value = out;
  remarks.value = ""; rejectReason.value = ""; showReject.value = false;
  snapshot.value = JSON.stringify(rowsToSend());
}

async function load(name) {
  loading.value = true; loadError.value = "";
  try {
    const args = { request_for_quotation: props.rfq };
    if (name) args.name = name;
    data.value = await apiGET(API + "get_comparison_data", args);
    initChoices();
  } catch (e) {
    data.value = null;
    loadError.value = e.message || "Could not load the comparison";
  }
  loading.value = false;
}

watch(() => props.open, (v) => { if (v) load(); }, { immediate: true });

function validate() {
  for (const e of data.value.ranking) {
    if (!e.offers.length) continue;
    const label = e.line.item_name || e.line.item_code;
    if (!chosenOffer(e)) return `Choose a supplier for ${label}`;
    if (needsReason(e) && !String(choices.value[e.line.mrn_item].reason || "").trim()) {
      return `Give a reason for ${label}: the chosen rate is above the lowest (L1)`;
    }
  }
  return "";
}

function rowsToSend() {
  return data.value.ranking.map(e => {
    const c = choices.value[e.line.mrn_item];
    return { mrn_item: e.line.mrn_item, selected_quotation: e.offers.length ? (c.quotation || null) : null, reason: needsReason(e) ? String(c.reason || "").trim() : "" };
  });
}

async function create() {
  const err = validate();
  if (err) return toast.error(err);
  saving.value = true;
  try {
    const selections = {};
    for (const r of rowsToSend()) {
      if (r.selected_quotation) selections[r.mrn_item] = { selected_quotation: r.selected_quotation, reason: r.reason };
    }
    const res = await apiPOST(API + "create_comparison", { request_for_quotation: props.rfq, selections }, HINT);
    toast.success(`Comparison ${res.name} created`);
    emit("changed", res);
    await load(res.name);
  } catch (e) {
    toast.error(e.message || "Could not create the comparison");
  }
  saving.value = false;
}

async function saveSelection() {
  const err = validate();
  if (err) return toast.error(err);
  saving.value = true;
  try {
    const res = await apiPOST(API + "save_selection", { name: cmp.value.name, data: { items: rowsToSend() } }, HINT);
    toast.success(`Comparison ${res.name} saved`);
    emit("changed", res);
    await load(res.name);
  } catch (e) {
    toast.error(e.message || "Could not save the selection");
  }
  saving.value = false;
}

async function runAction(method, args, okMsg, failMsg) {
  saving.value = true;
  try {
    const res = await apiPOST(API + method, args);   // no write hint: approvers may be read-only on Bills
    toast.success(okMsg(res));
    emit("changed", res);
    await load(cmp.value.name);
  } catch (e) {
    toast.error(e.message || failMsg);
  }
  saving.value = false;
}

function sendForApproval() {
  if (dirty.value) return toast.error("Save the selection first");
  return runAction("submit_for_approval", { name: cmp.value.name }, (r) => `${r.name} sent for approval`, "Could not send for approval");
}
function doApprove() {
  return runAction("approve_comparison", { name: cmp.value.name, remarks: remarks.value.trim() }, (r) => `${r.name} ${r.status === "Approved" ? "approved" : "level approved"}`, "Could not approve");
}
function doReject() {
  if (!showReject.value) { showReject.value = true; return; }
  if (!rejectReason.value.trim()) return toast.error("Rejection reason is required");
  return runAction("reject_comparison", { name: cmp.value.name, reason: rejectReason.value.trim() }, (r) => `${r.name} rejected`, "Could not reject");
}
function doCreateLpos() {
  return runAction("create_lpos", { name: cmp.value.name }, (r) => `${(r.lpos || []).length} LPO(s) created`, "Could not create the LPOs");
}

function close() { if (!saving.value) emit("close"); }
</script>