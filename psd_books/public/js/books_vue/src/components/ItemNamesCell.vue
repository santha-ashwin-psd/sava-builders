<template>
  <div class="inc-text" @mouseenter="show" @mouseleave="hide">{{ text || '—' }}</div>
  <Teleport to="body">
    <div v-if="tip.show" class="inc-tip" :style="{ left: tip.x + 'px', top: tip.y + 'px' }">{{ text }}</div>
  </Teleport>
</template>

<script setup>
import { computed, reactive } from "vue";

const props = defineProps({ names: { type: Array, default: () => [] } });
const text = computed(() => (props.names || []).join(", "));
const tip = reactive({ show: false, x: 0, y: 0 });

function show(ev) {
  if (!text.value) return;
  const r = ev.currentTarget.getBoundingClientRect();
  tip.x = Math.max(8, Math.min(r.left, window.innerWidth - 436));
  tip.y = r.bottom + 6;
  tip.show = true;
}
function hide() { tip.show = false; }
</script>

<style scoped>
.inc-text { max-width:240px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#374151; font-size:12.5px; }
.inc-tip { position:fixed; z-index:99999; max-width:420px; box-sizing:border-box; background:#fff; color:#1f2937; border:1.5px solid #3b82f6; border-radius:10px; padding:14px 18px; font-size:16px; line-height:1.5; box-shadow:0 8px 24px rgba(15,23,42,.14); pointer-events:none; white-space:normal; word-break:break-word; }
</style>