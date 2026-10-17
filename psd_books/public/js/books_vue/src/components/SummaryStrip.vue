<template>
  <div class="ssm-strip" :style="gridStyle">
    <div
      v-for="(card, i) in cards"
      :key="i"
      class="ssm-card"
      :class="`ssm-${card.tone || 'default'}`"
    >
      <div class="ssm-lbl">{{ card.label }}</div>
      <div class="ssm-val" :class="card.valueClass">{{ card.value }}</div>
      <div v-if="card.sub" class="ssm-sub">{{ card.sub }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /**
   * Array of card descriptors:
   *   { label, value, tone?, sub?, valueClass? }
   * Tones: 'default' | 'accent' (blue) | 'success' (green) | 'warn' (amber)
   *        | 'danger' (red) | 'info' (cyan)
   * valueClass override hooks: 'green' | 'orange' | 'red' | 'blue'
   */
  cards: { type: Array, required: true },
});

// Force a fixed column count when cards.length is small (4/5 cards),
// otherwise auto-fit for responsive layouts.
const gridStyle = computed(() => {
  const n = props.cards.length;
  if (n >= 3 && n <= 6) {
    return `grid-template-columns: repeat(${n}, 1fr);`;
  }
  return "grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));";
});
</script>

<style scoped>
.ssm-strip {
  display: grid;
  gap: 12px;
}

/* Base card */
.ssm-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: box-shadow .15s;
}
.ssm-card:hover { box-shadow: 0 2px 8px rgba(15,23,42,.06); }

/* Tone variants — gradient + tinted border */
.ssm-accent  { background: linear-gradient(135deg, #eff6ff, #fff); border-color: #bfdbfe; }
.ssm-success { background: linear-gradient(135deg, #f0fdf4, #fff); border-color: #bbf7d0; }
.ssm-warn    { background: linear-gradient(135deg, #fffbeb, #fff); border-color: #fde68a; }
.ssm-danger  { background: linear-gradient(135deg, #fef2f2, #fff); border-color: #fecaca; }
.ssm-info    { background: linear-gradient(135deg, #ecfeff, #fff); border-color: #a5f3fc; }

/* Typography */
.ssm-lbl {
  font-size: 11px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: .05em;
  font-weight: 600;
}
.ssm-val {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
  margin-top: 2px;
}
.ssm-sub {
  font-size: 11.5px;
  color: #9ca3af;
  margin-top: 2px;
}

/* Value-color override hooks (per-card) */
.ssm-val.green  { color: #16a34a !important; }
.ssm-val.orange { color: #ea580c !important; }
.ssm-val.red    { color: #dc2626 !important; }
.ssm-val.blue   { color: #2563eb !important; }
</style>
