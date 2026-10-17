<template>
  <Teleport to="body">
    <div v-if="state.open" class="emd-backdrop" @click.self="onClose">
      <div class="emd-dialog">
        <div class="emd-header">
          <span class="emd-title">Send {{ state.docLabel }}</span>
          <button class="emd-close" @click="onClose" :disabled="sending">✕</button>
        </div>
        <div class="emd-body">
          <div v-if="loading" class="emd-loading">Loading email defaults…</div>
          <template v-else>
            <div class="emd-field">
              <label class="emd-lbl">To <span class="emd-req">*</span></label>
              <input v-model="form.to" type="email" class="emd-input" placeholder="customer@example.com" />
            </div>
            <div class="emd-field">
              <label class="emd-lbl">CC</label>
              <input v-model="form.cc" type="email" class="emd-input" placeholder="cc@example.com (comma-separated)" />
            </div>
            <div class="emd-field">
              <label class="emd-lbl">Subject <span class="emd-req">*</span></label>
              <input v-model="form.subject" class="emd-input" />
            </div>
            <div class="emd-field">
              <div class="emd-lbl-row">
                <label class="emd-lbl">Message</label>
                <button
                  v-if="state.enhanceEndpoint"
                  class="emd-enhance"
                  :disabled="enhancing || !form.body"
                  @click="onEnhance"
                  title="AI rewrite"
                >✨ {{ enhancing ? "Enhancing…" : "AI Enhance" }}</button>
              </div>
              <div
                ref="bodyRef"
                class="emd-rich"
                contenteditable="true"
                @input="form.body = $event.target.innerHTML"
              ></div>
            </div>
            <div class="emd-note">📎 The PDF will be attached automatically.</div>
          </template>
        </div>
        <div class="emd-footer">
          <button class="emd-btn emd-btn-ghost" @click="onClose" :disabled="sending">Cancel</button>
          <button
            class="emd-btn emd-btn-primary"
            :disabled="sending || loading || !form.to || !form.subject"
            @click="onSend"
          >{{ sending ? "Sending…" : "Send Email" }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive, ref, watch, nextTick } from "vue";
import { apiGET, apiPOST, apiGet } from "../api/client.js";
import { useEmailDialog } from "../composables/useEmailDialog.js";
import { useToast } from "../composables/useToast.js";
import { useLivePreview } from "../composables/useLivePreview.js";

const { state, complete } = useEmailDialog();
const { toast } = useToast();
const { setCompany, renderDocument } = useLivePreview();

const loading = ref(false);
const sending = ref(false);
const enhancing = ref(false);
const bodyRef = ref(null);
const form = reactive({ to: "", cc: "", subject: "", body: "" });

watch(() => state.open, async (open) => {
  if (!open) return;
  Object.assign(form, { to: "", cc: "", subject: "", body: "" });
  loading.value = true;
  try {
    const params = { [state.paramKey]: state.name };
    const d = await apiGET(state.getDefaultsEndpoint, params);
    if (d) {
      form.to = d.to || "";
      form.subject = d.subject || "";
      form.body = d.body || "";
    }
  } catch (e) {
    toast("Failed to load email defaults", "error");
  }
  loading.value = false;
  await nextTick();
  if (bodyRef.value) bodyRef.value.innerHTML = form.body;
});

async function onEnhance() {
  if (!state.enhanceEndpoint || !form.body) return;
  enhancing.value = true;
  try {
    const r = await apiPOST(state.enhanceEndpoint, {
      subject: form.subject,
      body: form.body,
      [state.paramKey]: state.name,
    });
    if (r?.subject) form.subject = r.subject;
    if (r?.body) {
      form.body = r.body;
      if (bodyRef.value) bodyRef.value.innerHTML = r.body;
    }
    toast("Enhanced", "success");
  } catch (e) {
    toast("Enhance failed: " + (e.message || ""), "error");
  }
  enhancing.value = false;
}

async function onSend() {
  if (!form.to) { toast("Recipient is required", "error"); return; }
  sending.value = true;
  try {
    const payload = {
      [state.paramKey]: state.name,
      to: form.to,
      subject: form.subject,
      body: form.body,
      cc: form.cc || "",
    };
    // Render the attached PDF from the user's active branding template so the
    // emailed document matches the on-screen download exactly.
    if (state.printConfig) {
      try {
        const doc = await apiGet(state.doctype, state.name);
        await setCompany(doc?.company || "");
        payload.pdf_html = renderDocument(doc, {
          ...state.printConfig,
          companyName: doc?.company || "",
        });
      } catch (e) { /* fall back to server print format */ }
    }
    await apiPOST(state.sendEndpoint, payload);
    toast("Email sent", "success");
    complete(true);
  } catch (e) {
    toast("Send failed: " + (e.message || ""), "error");
  }
  sending.value = false;
}

function onClose() {
  if (sending.value) return;
  complete(false);
}
</script>

<style scoped>
.emd-backdrop {
  position: fixed; inset: 0; background: rgba(15,23,42,.5);
  z-index: 10000; display: flex; align-items: center; justify-content: center;
}
.emd-dialog {
  background: #fff; border-radius: 12px; width: 560px; max-width: 96vw;
  max-height: 92vh; display: flex; flex-direction: column;
  box-shadow: 0 12px 40px rgba(0,0,0,.2);
  animation: emd-in .2s cubic-bezier(.34,1.56,.64,1);
}
@keyframes emd-in { from { opacity: 0; transform: scale(.96) translateY(8px); } to { opacity: 1; transform: none; } }
.emd-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 18px; border-bottom: 1px solid #e5e7eb; flex-shrink: 0;
}
.emd-title { font-size: 15px; font-weight: 700; color: #111827; }
.emd-close {
  background: transparent; border: none; cursor: pointer; font-size: 16px; color: #6b7280;
  width: 28px; height: 28px; border-radius: 6px;
}
.emd-close:hover { background: #f3f4f6; }
.emd-close:disabled { opacity: .4; cursor: not-allowed; }
.emd-body {
  padding: 16px 18px; flex: 1; overflow-y: auto;
  display: flex; flex-direction: column; gap: 12px;
}
.emd-loading { text-align: center; padding: 24px; color: #6b7280; font-size: 13px; }
.emd-field { display: flex; flex-direction: column; gap: 4px; }
.emd-lbl-row { display: flex; align-items: center; justify-content: space-between; }
.emd-lbl { font-size: 12px; font-weight: 600; color: #374151; }
.emd-req { color: #ef4444; margin-left: 2px; }
.emd-input {
  border: 1px solid #e5e7eb; border-radius: 6px; padding: 8px 10px;
  font-size: 13px; outline: none; background: #fff;
}
.emd-input:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,.08); }
.emd-rich {
  min-height: 160px; max-height: 280px; overflow-y: auto;
  border: 1px solid #e5e7eb; border-radius: 6px; padding: 10px 12px;
  font-size: 13px; background: #fff; outline: none; line-height: 1.5;
}
.emd-rich:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,.08); }
.emd-enhance {
  background: #f0f9ff; border: 1px solid #bae6fd; color: #0369a1;
  font: inherit; font-size: 11px; font-weight: 600; padding: 3px 10px;
  border-radius: 999px; cursor: pointer;
}
.emd-enhance:hover:not(:disabled) { background: #e0f2fe; }
.emd-enhance:disabled { opacity: .5; cursor: not-allowed; }
.emd-note { font-size: 11.5px; color: #6b7280; padding: 6px 10px; background: #f8fafc; border-radius: 6px; }
.emd-footer {
  display: flex; justify-content: flex-end; gap: 8px;
  padding: 12px 18px; border-top: 1px solid #e5e7eb; flex-shrink: 0;
}
.emd-btn {
  font: inherit; font-size: 13px; padding: 8px 16px; border-radius: 8px;
  border: 1px solid transparent; cursor: pointer; font-weight: 600;
}
.emd-btn:disabled { opacity: .5; cursor: not-allowed; }
.emd-btn-ghost { background: #fff; border-color: #e5e7eb; color: #374151; }
.emd-btn-ghost:hover:not(:disabled) { background: #f9fafb; }
.emd-btn-primary { background: #2563eb; color: #fff; }
.emd-btn-primary:hover:not(:disabled) { background: #1d4ed8; }
</style>
