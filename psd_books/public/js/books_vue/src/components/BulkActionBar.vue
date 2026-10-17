<template>
  <transition name="bab-slide">
    <div v-if="count > 0" class="bab-bar">
      <span class="bab-count">{{ count }} selected</span>
      <slot />
      <button class="bab-clear" @click="$emit('clear')">✕ Clear</button>
    </div>
  </transition>
</template>

<script setup>
defineProps({ count: { type: Number, default: 0 } });
defineEmits(["clear"]);
</script>

<style scoped>
.bab-bar {
  display: flex; align-items: center; gap: 8px;
  margin: 12px 24px 0; padding: 10px 16px;
  background: #eff6ff; color: #1f2937; border: 1px solid #bfdbfe; border-radius: 10px;
  flex-wrap: wrap; font-size: 13px;
}
.bab-count {
  font-size: 13px; font-weight: 700; color: #1a6ef7; margin-right: 4px;
}
.bab-clear {
  margin-left: auto; background: none; border: none; color: #6b7280;
  font: inherit; cursor: pointer; font-size: 12.5px; padding: 4px 8px; border-radius: 4px;
}
.bab-clear:hover { background: #e0e7ff; color: #1a6ef7; }
.bab-bar :deep(button:not(.bab-clear)) {
  background: #fff; border: 1px solid #e2e8f0;
  color: #374151; font: inherit; font-size: 12.5px; font-weight: 600;
  padding: 5px 12px; border-radius: 6px;
  cursor: pointer; transition: border-color .15s, background .15s, color .15s;
  display: inline-flex; align-items: center; gap: 5px;
}
.bab-bar :deep(button:not(.bab-clear):hover:not(:disabled)) {
  background: #f8fafc; border-color: #1a6ef7; color: #1a6ef7;
}
.bab-bar :deep(button:not(.bab-clear):disabled) { opacity: .5; cursor: not-allowed; }
.bab-bar :deep(button.bab-danger) {
  border-color: rgba(220,38,38,.3); color: #dc2626;
}
.bab-bar :deep(button.bab-danger:hover:not(:disabled)) {
  background: #fee2e2; border-color: #dc2626; color: #dc2626;
}
.bab-slide-enter-active, .bab-slide-leave-active { transition: all .18s; }
.bab-slide-enter-from, .bab-slide-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
