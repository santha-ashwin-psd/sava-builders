<template>
<div class="list-page">
  <div style="max-width:560px;margin:60px auto;text-align:center;padding:32px;border:1px solid #e5e7eb;border-radius:12px;background:#fff">
    <div style="font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#6b7280;margin-bottom:6px">Labour Contract</div>
    <h2 style="margin:0 0 8px;font-size:20px;font-weight:600">{{ title }}</h2>
    <p style="margin:0;color:#6b7280;font-size:14px">Coming soon.</p>
  </div>
</div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const title = computed(() => route.meta?.title || "Labour Contract");
</script>