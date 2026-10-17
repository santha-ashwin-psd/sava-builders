<template>
  <Teleport to="body">
    <div class="bv-toast-stack">
      <div
        v-for="t in items" :key="t.id"
        class="bv-toast"
        :class="`bv-toast-${t.type}`"
      >{{ t.message }}</div>
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from "../composables/useToast.js";
const { items } = useToast();
</script>

<style>
/* Mirrors the inline-styled toast at books.js:274-288 — uses the legacy
   color palette and animation so visual parity holds during parallel run. */
.bv-toast-stack {
  position: fixed; top: 20px; right: 20px; z-index: 99999;
  display: flex; flex-direction: column; gap: 8px;
  pointer-events: none;
}
.bv-toast {
  pointer-events: auto;
  color: #fff; padding: 12px 20px; border-radius: 8px;
  font-size: 13px; font-weight: 500;
  font-family: 'Plus Jakarta Sans', 'Lato', system-ui, sans-serif;
  box-shadow: 0 4px 20px rgba(0,0,0,.2);
  max-width: 360px; line-height: 1.4;
  animation: bv-toast-in .2s ease;
}
.bv-toast-success { background: #2F9E44; }
.bv-toast-error   { background: #C92A2A; }
.bv-toast-warning { background: #E67700; }
.bv-toast-info    { background: #2563eb; }
@keyframes bv-toast-in {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: none; }
}
</style>
