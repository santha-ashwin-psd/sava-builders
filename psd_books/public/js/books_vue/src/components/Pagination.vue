<template>
  <div class="pg-wrap">
    <!-- Left: Show X entries -->
    <div class="pg-left">
      <span class="pg-label">Show</span>
      <div class="pg-select-wrap">
        <select :value="pageSize" @change="$emit('update:pageSize', Number($event.target.value))" class="pg-select">
          <option v-for="s in sizeOptions" :key="s" :value="s">{{ s }}</option>
        </select>
        <svg class="pg-chevron" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="pg-label">entries</span>
    </div>

    <!-- Right: Showing X to Y of Z entries + nav -->
    <div class="pg-right">
      <span class="pg-summary">
        Showing {{ rangeStart }} to {{ rangeEnd }} of {{ totalItems }} entries
      </span>

      <div class="pg-nav">
        <!-- First page -->
        <button class="pg-btn pg-icon-btn" :disabled="page === 1" @click="$emit('update:page', 1)" title="First page">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 3v10M12 4L6 8l6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Prev -->
        <button class="pg-btn pg-icon-btn" :disabled="page === 1" @click="$emit('update:page', page - 1)" title="Previous">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4L6 8l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Page numbers -->
        <span v-for="p in pageList" :key="p.k" class="pg-page-cell">
          <button
            v-if="p.kind === 'page'"
            class="pg-btn pg-page"
            :class="{ active: p.n === page }"
            @click="$emit('update:page', p.n)"
          >{{ p.n }}</button>
          <span v-else class="pg-ellipsis">…</span>
        </span>

        <!-- Next -->
        <button class="pg-btn pg-icon-btn" :disabled="page === totalPages" @click="$emit('update:page', page + 1)" title="Next">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Last page -->
        <button class="pg-btn pg-icon-btn" :disabled="page === totalPages" @click="$emit('update:page', totalPages)" title="Last page">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3v10M4 4l6 4-6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  page:        { type: Number, required: true },
  pageSize:    { type: Number, required: true },
  totalItems:  { type: Number, required: true },
  sizeOptions: { type: Array, default: () => [10, 25, 50, 100] },
});

defineEmits(["update:page", "update:pageSize"]);

const totalPages = computed(() => Math.max(1, Math.ceil(props.totalItems / props.pageSize)));
const rangeStart = computed(() => props.totalItems === 0 ? 0 : (props.page - 1) * props.pageSize + 1);
const rangeEnd   = computed(() => props.totalItems === 0 ? 0 : Math.min(props.totalItems, props.page * props.pageSize));

const pageList = computed(() => {
  const cur = props.page;
  const max = totalPages.value;
  if (max <= 7) {
    return Array.from({ length: max }, (_, i) => ({ kind: "page", n: i + 1, k: `p${i + 1}` }));
  }
  const out = [];
  const push = (n) => out.push({ kind: "page", n, k: `p${n}` });
  const gap = (id) => out.push({ kind: "gap", k: `g${id}` });

  push(1);
  if (cur > 4) gap("L");
  for (let n = Math.max(2, cur - 1); n <= Math.min(max - 1, cur + 1); n++) push(n);
  if (cur < max - 3) gap("R");
  push(max);
  return out;
});
</script>

<style scoped>
.pg-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 16px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 13px;
  color: #374151;
}

/* ── Left: Show X entries ── */
.pg-left {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
}

.pg-label {
  font-size: 13px;
  color: #374151;
}

.pg-select-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.pg-select {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 3px 24px 3px 8px;
  font-size: 13px;
  color: #374151;
  background: #fff;
  cursor: pointer;
  outline: none;
  line-height: 1.4;
}

.pg-select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
}

.pg-chevron {
  position: absolute;
  right: 7px;
  width: 10px;
  height: 10px;
  color: #6b7280;
  pointer-events: none;
}

/* ── Right: summary + nav ── */
.pg-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.pg-summary {
  font-size: 13px;
  color: #374151;
  white-space: nowrap;
}

/* ── Navigation ── */
.pg-nav {
  display: flex;
  align-items: center;
  gap: 2px;
}

.pg-page-cell {
  display: inline-flex;
  align-items: center;
}

.pg-btn {
  min-width: 28px;
  height: 28px;
  padding: 0;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pg-icon-btn {
  color: #6b7280;
}

.pg-icon-btn svg {
  width: 14px;
  height: 14px;
}

.pg-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #9ca3af;
  color: #111827;
}

.pg-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pg-btn.pg-page {
  min-width: 28px;
}

.pg-btn.pg-page.active {
  background: #4f7ef8;
  color: #fff;
  border-color: #4f7ef8;
  font-weight: 600;
}

.pg-btn.pg-page.active:hover {
  background: #3b6ef0;
  border-color: #3b6ef0;
}

.pg-ellipsis {
  padding: 0 4px;
  color: #9ca3af;
  font-weight: 600;
  user-select: none;
  font-size: 13px;
}

@media (max-width: 720px) {
  .pg-wrap {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .pg-right {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .pg-nav {
    justify-content: center;
  }
}
</style>