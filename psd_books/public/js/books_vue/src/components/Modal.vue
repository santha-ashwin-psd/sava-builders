<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="nim-overlay"
      @mousedown.self="closeOnBackdrop && $emit('close')"
    >
      <div class="nim-dialog" :style="{ maxWidth: width }">
        <div v-if="$slots.header || title" class="nim-dialog-header">
          <slot name="header">
            <h3>{{ title }}</h3>
            <button v-if="closable" class="nim-dialog-close" @click="$emit('close')">✕</button>
          </slot>
        </div>
        <div class="nim-dialog-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="nim-dialog-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  show:            { type: Boolean, required: true },
  title:           { type: String,  default: "" },
  width:           { type: String,  default: "560px" },
  closable:        { type: Boolean, default: true },
  closeOnBackdrop: { type: Boolean, default: true },
});
defineEmits(["close"]);
</script>

<style>
.nim-overlay {
  position: fixed; inset: 0;
  background: rgba(15, 23, 42, .5);
  z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  animation: nim-overlay-in .15s ease;
}
.nim-dialog {
  background: #fff;
  border-radius: 12px;
  width: 100%; max-width: 560px;
  max-height: 92vh;
  display: flex; flex-direction: column;
  box-shadow: 0 12px 40px rgba(0, 0, 0, .2);
  animation: nim-dialog-in .2s cubic-bezier(.34, 1.56, .64, 1);
  overflow: hidden;
  font-family: 'Plus Jakarta Sans', 'Lato', system-ui, sans-serif;
}
.nim-dialog-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}
.nim-dialog-header h3 {
  font-size: 15px; font-weight: 700; color: #111827;
  margin: 0;
}
.nim-dialog-close {
  background: transparent; border: none; cursor: pointer;
  font-size: 16px; color: #6b7280;
  width: 28px; height: 28px; border-radius: 6px;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background .12s, color .12s;
}
.nim-dialog-close:hover { background: #f3f4f6; color: #111827; }
.nim-dialog-body {
  padding: 16px 18px;
  flex: 1;
  overflow-y: auto;
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
}
.nim-dialog-footer {
  display: flex; justify-content: flex-end; gap: 8px;
  padding: 12px 18px;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
  background: #fafafa;
}
.nim-btn-danger {
  background: #dc2626; border-color: #dc2626; color: #fff;
}
.nim-btn-danger:hover:not(:disabled) { background: #b91c1c; border-color: #b91c1c;color: #fff; }
@keyframes nim-overlay-in {
  from { opacity: 0; } to { opacity: 1; }
}
@keyframes nim-dialog-in {
  from { opacity: 0; transform: scale(.96) translateY(8px); }
  to   { opacity: 1; transform: none; }
}
</style>
