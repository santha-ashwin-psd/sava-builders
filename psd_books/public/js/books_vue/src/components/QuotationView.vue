<template>
  <!-- Read-only view of one saved supplier quotation (rates, discount, VAT, totals as saved by the server).
       Rendered inside RequestForQuotation.vue's Teleport so it stacks above the RFQ drawer. -->
  <div v-if="open" class="inv-drawer-bg" @click.self="close">
    <div class="inv-drawer-panel">
      <div class="inv-dh">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <div class="inv-dh-title">Quoted Prices</div>
          <span class="inv-dh-sub" style="margin-left:4px">{{ supplierName || (doc && doc.supplier_name) || '' }} · {{ quotation }}</span>
        </div>
        <button class="inv-dclose" @click="close"><span v-html="icon('x',16)"></span></button>
      </div>

      <div class="inv-content-row">
        <div class="inv-dbody">
          <div v-if="loading" style="padding:24px"><div class="shimmer" style="height:12px"></div></div>
          <div v-else-if="loadError" class="exp-field-hint" style="padding:16px;color:#C92A2A">{{ loadError }}</div>
          <template v-else-if="doc">

            <div class="exp-field-hint" style="margin-bottom:10px">
              {{ doc.name }} (revision {{ doc.revision_no || 0 }}) · {{ doc.status }}
            </div>

            <!-- Header -->
            <div class="add-card">
              <div class="add-card-header"><div class="add-card-title">Quotation Details</div></div>
              <div class="add-card-body">
                <div class="inv-fg inv-fg2">
                  <div>
                    <label class="inv-lbl">Quotation Date</label>
                    <input class="inv-fi" :value="doc.quotation_date || '—'" readonly tabindex="-1" :style="ro"/>
                  </div>
                  <div>
                    <label class="inv-lbl">Delivery (days)</label>
                    <input class="inv-fi" :value="doc.delivery_days ?? '—'" readonly tabindex="-1" :style="ro"/>
                  </div>
                  <div>
                    <label class="inv-lbl">Payment Terms</label>
                    <input class="inv-fi" :value="doc.payment_terms || '—'" readonly tabindex="-1" :style="ro"/>
                  </div>
                  <div style="grid-column:1/-1">
                    <label class="inv-lbl">Remarks</label>
                    <textarea class="inv-fi" :value="doc.remarks || ''" rows="2" readonly tabindex="-1" placeholder="—" :style="ro + ';resize:none'"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lines -->
            <div class="add-card">
              <div class="add-card-header">
                <div class="add-card-title">
                  Items
                  <span style="font-size:11.5px;color:#6b7280;font-weight:400;letter-spacing:0;text-transform:none">&nbsp;· rates in KES, before VAT</span>
                </div>
              </div>
              <div class="add-card-body" style="padding:16px 16px 8px">
                <div class="po-item-cards">
                  <div v-for="(it,idx) in doc.items || []" :key="it.name || idx" class="po-item-card">
                    <div class="po-item-card-header">
                      <span class="po-item-card-num">#{{ idx+1 }}</span>
                      <span class="po-item-card-title">{{ it.item_name || it.item_code }}</span>
                      <div class="po-item-card-subtotal">
                        <span class="po-item-card-subtotal-label">{{ isQuoted(it) ? 'TOTAL INCL. VAT' : '' }}</span>
                        <span class="po-item-card-amount">{{ isQuoted(it) ? money(flt(it.amount) + flt(it.tax_amount)) : 'Not quoted' }}</span>
                      </div>
                    </div>
                    <div class="po-item-card-body">
                      <div class="po-item-col po-item-col--left">
                        <div class="po-item-num-row">
                          <div class="po-item-field">
                            <label>Qty</label>
                            <input class="inv-fi" :value="it.qty" readonly tabindex="-1" :style="ro"/>
                          </div>
                          <div class="po-item-field">
                            <label>UOM</label>
                            <input class="inv-fi" :value="it.uom || '—'" readonly tabindex="-1" :style="ro"/>
                          </div>
                        </div>
                      </div>
                      <div class="po-item-col po-item-col--right">
                        <div class="po-item-num-row">
                          <div class="po-item-field">
                            <label>Rate (KES per {{ it.uom || 'unit' }})</label>
                            <input class="inv-fi" :value="isQuoted(it) ? it.rate : ''" placeholder="Not quoted" readonly tabindex="-1" :style="ro"/>
                          </div>
                          <div class="po-item-field">
                            <label>Discount %</label>
                            <input class="inv-fi" :value="it.discount_percent || 0" readonly tabindex="-1" :style="ro"/>
                          </div>
                          <div class="po-item-field">
                            <label>VAT %</label>
                            <input class="inv-fi" :value="it.vat_percent || 0" readonly tabindex="-1" :style="ro"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;padding:10px 4px 12px;font-size:13px">
                  <div>Net total: <strong class="mono">{{ money(doc.net_total) }}</strong></div>
                  <div>VAT: <strong class="mono">{{ money(doc.total_tax) }}</strong></div>
                  <div style="font-size:14px">Grand total: <strong class="mono">KES {{ money(doc.grand_total) }}</strong></div>
                </div>
              </div>
            </div>

          </template>
        </div>
      </div>

      <div class="inv-dfooter">
        <div class="add-footer-status">View only</div>
        <div class="add-footer-actions">
          <button class="add-btn-cancel" @click="close">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { apiGet } from "../api/client.js";
import { icon } from "../utils/icons.js";
import { flt } from "../utils/format.js";

const props = defineProps({
  open: { type: Boolean, default: false },
  quotation: { type: String, default: "" },
  supplierName: { type: String, default: "" },
});
const emit = defineEmits(["close"]);

const loading = ref(false);
const loadError = ref("");
const doc = ref(null);
const ro = "background:#f3f4f6;color:#374151";   // same grey as the read-only fields in the revise screen

function isQuoted(it) { return it.rate != null && it.rate !== "" && flt(it.rate) > 0; }
function money(v) {
  return Number(v || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function load() {
  loading.value = true; loadError.value = ""; doc.value = null;
  try { doc.value = await apiGet("Supplier Quotation", props.quotation); }
  catch (e) { loadError.value = e.message || "Could not load the quotation"; }
  loading.value = false;
}

watch(() => props.open, (v) => { if (v && props.quotation) load(); }, { immediate: true });

function close() { emit("close"); }
</script>