<template>
  <div class="lpp-pane">
    <div class="lpp-toolbar">
      <span class="lpp-title">LIVE PREVIEW</span>
      <div class="lpp-templates">
        <button
          v-for="t in templates"
          :key="t"
          class="lpp-tbtn"
          :class="{ active: template === t }"
          @click="template = t"
        >{{ t.charAt(0).toUpperCase() + t.slice(1) }}</button>
      </div>
      <div class="lpp-brand">
        <input v-model="brandColor" type="color" class="lpp-color" title="Brand color"/>
        <input v-model="logo" class="lpp-logo" placeholder="Logo URL" />
      </div>
      <button class="lpp-print" @click="onPrint">🖨 Print</button>
    </div>
    <iframe ref="frameRef" class="lpp-iframe" sandbox="allow-same-origin allow-modals"></iframe>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useLivePreview } from "../composables/useLivePreview.js";

const props = defineProps({
  doc:    { type: Object, required: true },
  config: { type: Object, required: true },
});

const { template, brandColor, logo, renderDocument } = useLivePreview();
const frameRef = ref(null);
const templates = ["classic", "modern", "minimal"];

function refresh() {
  if (!frameRef.value) return;
  const html = renderDocument(props.doc, props.config);
  const fdoc = frameRef.value.contentDocument || frameRef.value.contentWindow.document;
  fdoc.open(); fdoc.write(html); fdoc.close();
}

onMounted(refresh);
watch([() => props.doc, template, brandColor, logo, () => props.config], refresh, { deep: true });

function onPrint() {
  const html = renderDocument(props.doc, props.config);
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 250);
}
</script>

<style scoped>
.lpp-pane {
  display: flex; flex-direction: column;
  border-left: 1px solid #e5e7eb; background: #f8fafc;
  height: 100%; min-width: 480px; max-width: 720px;
}
.lpp-toolbar {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 14px; background: #fff; border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap; flex-shrink: 0;
}
.lpp-title { font-size: 10.5px; font-weight: 700; color: #6b7280; letter-spacing: .06em; }
.lpp-templates { display: flex; gap: 4px; }
.lpp-tbtn {
  font: inherit; font-size: 11px; padding: 4px 10px; border-radius: 6px;
  border: 1px solid #e5e7eb; background: #fff; color: #374151; cursor: pointer;
}
.lpp-tbtn:hover { background: #f9fafb; }
.lpp-tbtn.active { background: #1a6ef7; color: #fff; border-color: #1a6ef7; }
.lpp-brand { display: flex; gap: 4px; margin-left: auto; }
.lpp-color {
  width: 28px; height: 26px; padding: 0; border: 1px solid #e5e7eb; border-radius: 6px;
  cursor: pointer; background: transparent;
}
.lpp-logo {
  border: 1px solid #e5e7eb; border-radius: 6px; padding: 4px 8px;
  font-size: 11px; outline: none; width: 140px;
}
.lpp-print {
  background: #1a6ef7; color: #fff; border: none; border-radius: 6px;
  padding: 5px 10px; font: inherit; font-size: 11.5px; font-weight: 600;
  cursor: pointer;
}
.lpp-print:hover { background: #1d4ed8; }
.lpp-iframe { flex: 1; width: 100%; border: none; background: #fff; }
</style>
