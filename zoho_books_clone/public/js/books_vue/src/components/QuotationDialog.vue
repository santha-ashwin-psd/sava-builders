<template>
  <!-- Sava A8.4: enter / revise a supplier quotation against one RFQ + supplier.
       Rendered inside RequestForQuotation.vue's own Teleport so it stacks above the RFQ drawer. -->
  <div v-if="open" class="inv-drawer-bg" @click.self="close">
    <div class="inv-drawer-panel">
      <div class="inv-dh">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <div class="inv-dh-title">{{ isRevision ? "Revise Quotation" : "Enter Quotation" }}</div>
          <span class="inv-dh-sub" style="margin-left:4px">{{ supplierName || supplier }} · {{ rfq }}</span>
        </div>
        <button class="inv-dclose" @click="close" :disabled="saving"><span v-html="icon('x',16)"></span></button>
      </div>

      <div class="inv-content-row">
        <div class="inv-dbody">
          <div v-if="loading" style="padding:24px"><div class="shimmer" style="height:12px"></div></div>
          <div v-else-if="loadError" class="exp-field-hint" style="padding:16px;color:#C92A2A">{{ loadError }}</div>
          <template v-else>

            <div v-if="isRevision" class="exp-field-hint" style="margin-bottom:10px">
              Revising {{ form.active_quotation }} (revision {{ form.revision_no }}). Saving makes it Superseded and creates revision {{ form.revision_no + 1 }} as the Active quotation.
            </div>

            <!-- Header -->
            <div class="add-card">
              <div class="add-card-header"><div class="add-card-title">Quotation Details</div></div>
              <div class="add-card-body">
                <div class="inv-fg inv-fg2">
                  <div>
                    <label class="inv-lbl">Quotation Date <span class="inv-req">*</span></label>
                    <input class="inv-fi" type="date" v-model="form.quotation_date"/>
                  </div>
                  <div>
                    <label class="inv-lbl">Delivery (days)</label>
                    <input class="inv-fi" type="number" min="0" step="1" v-model.number="form.delivery_days" placeholder="e.g. 7"/>
                  </div>
                  <div>
                    <label class="inv-lbl">Payment Terms</label>
                    <select class="inv-fi" v-model="form.payment_terms">
                      <option value="">— Select Payment Terms —</option>
                      <option v-for="t in termsOptions" :key="t" :value="t">{{ t }}</option>
                    </select>
                  </div>
                  <div style="grid-column:1/-1">
                    <label class="inv-lbl">Remarks</label>
                    <textarea class="inv-fi" v-model="form.remarks" rows="2" maxlength="500" placeholder="Optional" style="resize:vertical"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lines -->
            <div class="add-card">
              <div class="add-card-header">
                <div class="add-card-title">
                  Items
                  <span style="font-size:11.5px;color:#6b7280;font-weight:400;letter-spacing:0;text-transform:none">&nbsp;· rates before VAT; leave the rate blank for items the supplier did not quote</span>
                </div>
              </div>
              <div class="add-card-body" style="padding:16px 16px 8px">
                <div class="po-item-cards">
                  <div v-for="(it,idx) in form.items" :key="it.mrn_item" class="po-item-card">
                    <div class="po-item-card-header">
                      <span class="po-item-card-num">#{{ idx+1 }}</span>
                      <span class="po-item-card-title">{{ it.item_name || it.item_code }}</span>
                      <div class="po-item-card-subtotal">
                        <span class="po-item-card-subtotal-label">{{ calc(it).quoted ? 'TOTAL INCL. VAT' : '' }}</span>
                        <span class="po-item-card-amount">{{ calc(it).quoted ? money(calc(it).amount + calc(it).tax) : 'Not quoted' }}</span>
                      </div>
                    </div>
                    <div class="po-item-card-body">
                      <div class="po-item-col po-item-col--left">
                        <div class="po-item-num-row">
                          <div class="po-item-field">
                            <label>Qty</label>
                            <input class="inv-fi" :value="it.qty" readonly tabindex="-1" style="background:#f3f4f6;color:#6b7280"/>
                          </div>
                          <div class="po-item-field">
                            <label>UOM</label>
                            <input class="inv-fi" :value="it.uom || '—'" readonly tabindex="-1" style="background:#f3f4f6;color:#6b7280"/>
                          </div>
                        </div>
                      </div>
                      <div class="po-item-col po-item-col--right">
                        <div class="po-item-num-row">
                          <div class="po-item-field">
                            <label>Rate (KES)</label>
                            <input class="inv-fi" type="number" min="0" step="0.01" v-model="it.rate" placeholder="Not quoted"/>
                          </div>
                          <div class="po-item-field">
                            <label>Discount %</label>
                            <input class="inv-fi" type="number" min="0" max="100" step="0.01" v-model="it.discount_percent"/>
                          </div>
                          <div class="po-item-field">
                            <label>VAT %</label>
                            <input class="inv-fi" :value="it.vat_percent" readonly tabindex="-1" style="background:#f3f4f6;color:#6b7280"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;padding:10px 4px 12px;font-size:13px">
                  <div>Net total: <strong class="mono">{{ money(totals.net) }}</strong></div>
                  <div>VAT: <strong class="mono">{{ money(totals.tax) }}</strong></div>
                  <div style="font-size:14px">Grand total: <strong class="mono">KES {{ money(totals.grand) }}</strong></div>
                  <div class="exp-field-hint">Preview only. The saved totals are calculated by the server.</div>
                </div>
              </div>
            </div>

          </template>
        </div>
      </div>

      <div class="inv-dfooter">
        <div class="add-footer-status">{{ isRevision ? 'Revision of ' + form.active_quotation : 'New quotation — unsaved' }}</div>
        <div class="add-footer-actions">
          <button class="add-btn-cancel" @click="close" :disabled="saving">Cancel</button>
          <button class="add-btn-draft" @click="save" :disabled="saving || loading || !!loadError">
            <span v-html="icon('save',13)"></span> {{ saving ? 'Saving…' : (isRevision ? 'Save Revision' : 'Save Quotation') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { apiGET, apiPOST, apiList } from "../api/client.js";
import { useToast } from "../composables/useToast.js";
import { icon } from "../utils/icons.js";
import { flt } from "../utils/format.js";

const props = defineProps({
  open: { type: Boolean, default: false },
  rfq: { type: String, default: "" },
  supplier: { type: String, default: "" },
  supplierName: { type: String, default: "" },
});
const emit = defineEmits(["close", "saved"]);

const { toast } = useToast();
const API = "zoho_books_clone.api.supplier_quotation.";
const HINT = { module: "bills", action: "write" };

const loading = ref(false);
const saving = ref(false);
const loadError = ref("");
const termsOptions = ref([]);
const form = reactive({
  quotation_date: "", delivery_days: null, payment_terms: "", remarks: "",
  active_quotation: null, revision_no: 0, items: [],
});
const isRevision = computed(() => !!form.active_quotation);

// Same rules as invoicing/supplier_quotation_calc.py: no rate = not quoted;
// amount = qty x rate x (1 - discount%), rounded to 2 places; VAT on that amount, rounded to 2 places.
const r2 = (x) => Math.round(x * 100 + 1e-9) / 100;
function quoted(it) { return it.rate !== "" && it.rate != null && flt(it.rate) > 0; }
function calc(it) {
  if (!quoted(it)) return { quoted: false, amount: 0, tax: 0 };
  const amount = r2(flt(it.qty) * flt(it.rate) * (100 - flt(it.discount_percent)) / 100);
  return { quoted: true, amount, tax: r2(amount * flt(it.vat_percent) / 100) };
}
const totals = computed(() => {
  let net = 0, tax = 0;
  for (const it of form.items) { const c = calc(it); net += c.amount; tax += c.tax; }
  net = r2(net); tax = r2(tax);
  return { net, tax, grand: r2(net + tax) };
});
function money(v) {
  return Number(v || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function loadTerms() {
  if (termsOptions.value.length) return;
  try {
    const r = await apiList("Payment Terms", { fields: ["name"], order: "credit_days asc, name asc", limit: 100 });
    termsOptions.value = (r || []).map(x => x.name);
  } catch { termsOptions.value = []; }
}

async function load() {
  loading.value = true; loadError.value = "";
  try {
    const [d] = await Promise.all([
      apiGET(API + "get_quotation_prefill", { request_for_quotation: props.rfq, supplier: props.supplier }),
      loadTerms(),
    ]);
    Object.assign(form, {
      quotation_date: d.quotation_date || "", delivery_days: d.delivery_days ?? null,
      payment_terms: d.payment_terms || "", remarks: d.remarks || "",
      active_quotation: d.active_quotation || null, revision_no: d.revision_no || 0,
    });
    // keep a saved payment term selectable even if it is not in the first 100 options
    if (form.payment_terms && !termsOptions.value.includes(form.payment_terms)) termsOptions.value.push(form.payment_terms);
    form.items = (d.items || []).map(it => ({
      mrn_item: it.mrn_item, item_code: it.item_code, item_name: it.item_name, uom: it.uom,
      qty: it.qty, vat_percent: it.vat_percent,
      rate: it.rate == null ? "" : it.rate, discount_percent: it.discount_percent ?? 0,
    }));
  } catch (e) {
    loadError.value = e.message || "Could not load the quotation form";
  }
  loading.value = false;
}

watch(() => props.open, (v) => { if (v) load(); }, { immediate: true });

function validate() {
  if (!form.quotation_date) return "Enter the quotation date";
  if (form.delivery_days !== null && form.delivery_days !== "" && !(flt(form.delivery_days) >= 0)) return "Delivery days can't be negative";
  for (const it of form.items) {
    if (it.rate !== "" && it.rate != null && flt(it.rate) < 0) return `${it.item_code}: rate can't be negative`;
    const d = flt(it.discount_percent);
    if (d < 0 || d > 100) return `${it.item_code}: discount must be between 0 and 100%`;
  }
  if (!form.items.some(quoted)) return "Enter a rate for at least one item";
  return "";
}

async function save() {
  const err = validate();
  if (err) return toast.error(err);
  saving.value = true;
  try {
    const data = {
      request_for_quotation: props.rfq, supplier: props.supplier,
      quotation_date: form.quotation_date,
      delivery_days: form.delivery_days === "" ? null : form.delivery_days,
      payment_terms: form.payment_terms || null, remarks: form.remarks || "",
      items: form.items.map(it => ({
        mrn_item: it.mrn_item,
        rate: quoted(it) ? flt(it.rate) : null,
        discount_percent: flt(it.discount_percent),
      })),
    };
    const res = isRevision.value
      ? await apiPOST(API + "revise_quotation", { name: form.active_quotation, data }, HINT)
      : await apiPOST(API + "enter_quotation", { data }, HINT);
    toast.success(`Quotation ${res.name} saved`);
    emit("saved", res);
  } catch (e) {
    toast.error(e.message || "Could not save the quotation");
  }
  saving.value = false;
}

function close() { if (!saving.value) emit("close"); }
</script>