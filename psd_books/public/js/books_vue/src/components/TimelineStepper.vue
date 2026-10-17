<template>
  <div class="tls-wrap">
    <template v-for="(step, i) in steps" :key="step.key">
      <div
        class="tls-step"
        :class="{ done: step.done, danger: step.danger, current: step.current }"
      >
        <div
          class="tls-dot"
          @mouseenter="show(step, $event)"
          @mouseleave="hide"
          @touchstart.passive="show(step, $event)"
          @touchend.passive="hide"
        >
          <span v-if="step.danger">!</span>
          <span v-else-if="step.done">✓</span>
          <span v-else>{{ i + 1 }}</span>
        </div>
        <div class="tls-lbl">{{ step.label }}</div>
      </div>
      <div
        v-if="i < steps.length - 1"
        class="tls-line"
        :class="{
          done: steps[i + 1].done || steps[i + 1].current,
          danger: steps[i + 1].danger,
        }"
      ></div>
    </template>

    <!-- Custom tooltip -->
    <Teleport to="body">
      <div
        v-if="tooltip.visible"
        class="tls-tooltip"
        :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }"
      >
        {{ tooltip.label }}
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { reactive } from "vue";

defineProps({
  steps: { type: Array, required: true },
});

const tooltip = reactive({ visible: false, label: "", x: 0, y: 0 });

function show(step, e) {
  const rect = (e.touches ? e.touches[0].target : e.target).getBoundingClientRect();
  tooltip.label   = step.label;
  tooltip.x       = rect.left + rect.width / 2;
  tooltip.y       = rect.top - 8;
  tooltip.visible = true;
}
function hide() {
  tooltip.visible = false;
}
</script>

<style scoped>
.tls-wrap {
  display: flex; align-items: center; gap: 4px;
  padding: 18px 24px;
}
.tls-step { display: flex; align-items: center; gap: 8px; position: relative; }
.tls-dot {
  width: 26px; height: 26px; border-radius: 50%;
  background: #f3f4f6; color: #9ca3af;
  display: grid; place-items: center; font-size: 12px; font-weight: 700;
  border: 2px solid #e5e7eb; transition: all .2s;
  font-family: 'Plus Jakarta Sans', 'Lato', sans-serif;
  cursor: default;
}
.tls-step.done .tls-dot    { background: #059669; color: #fff; border-color: #059669; }
.tls-step.danger .tls-dot  { background: #dc2626; color: #fff; border-color: #dc2626; }
.tls-step.current .tls-dot { background: #2563eb; color: #fff; border-color: #2563eb; }
.tls-lbl {
  font-size: 12px; font-weight: 600;
  color: #9ca3af; white-space: nowrap;
}
.tls-step.done .tls-lbl    { color: #059669; }
.tls-step.current .tls-lbl { color: #2563eb; }
.tls-step.danger .tls-lbl  { color: #dc2626; }
.tls-line {
  flex: 1; height: 2px; min-width: 24px;
  background: #e5e7eb; transition: background .2s;
}
.tls-line.done   { background: #059669; }
.tls-line.danger { background: #dc2626; }

@media (max-width: 540px) {
  .tls-wrap { padding: 12px 16px; gap: 0; }
  .tls-lbl  { display: none; }
  .tls-step { gap: 0; }
  .tls-dot  { width: 26px; height: 26px; font-size: 11px; flex-shrink: 0; }
  .tls-line { flex: 1; min-width: 20px; }
}
</style>

<!-- Tooltip lives outside scoped so it can be in <body> via Teleport -->
<style>
.tls-tooltip {
  position: fixed;
  transform: translate(-50%, -100%);
  background: #1a1a2e;
  color: #fff;
  font-size: 11.5px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 99999;
  box-shadow: 0 2px 8px rgba(0,0,0,.18);
  margin-top: -4px;
}
.tls-tooltip::after {
  content: '';
  position: absolute;
  top: 100%; left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #1a1a2e;
}
</style>
