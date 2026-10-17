<template>
  <canvas ref="cvs" :style="{ width: size + 'px', height: size + 'px' }" />
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import QRCode from "qrcode";

const props = defineProps({
  irn:  { type: String, default: "" },
  size: { type: Number, default: 140 },
});

const cvs = ref(null);

function draw() {
  if (!cvs.value || !props.irn) return;
  QRCode.toCanvas(cvs.value, props.irn, {
    width: props.size,
    margin: 1,
    color: { dark: "#111827", light: "#ffffff" },
  }).catch(() => {});
}

onMounted(draw);
watch(() => [props.irn, props.size], draw);
</script>
