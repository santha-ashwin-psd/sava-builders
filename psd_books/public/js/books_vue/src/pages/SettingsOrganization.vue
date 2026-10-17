<template>
<div class="cust-page">
  <div class="cust-toolbar">
    <span style="font-size:18px;font-weight:700;color:#1a1a2e">Organizations</span>
    <span style="background:#fff8f0;color:#e67700;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:600;border:1px solid #ffe8a3">Multi-org switcher — Coming Soon (P2)</span>
  </div>
  <div style="max-width:700px;display:grid;gap:12px">
    <div style="background:#f0f4ff;border:1px solid #c5d0fa;border-radius:10px;padding:16px;font-size:12.5px;color:#3b4a7a">
      Multi-organization switching allows you to manage multiple companies from one login. Currently your system has the companies listed below. Full switcher UI is coming in P2.
    </div>
    <div v-for="c in companies" :key="c.name" style="background:#fff;border:1px solid #e4e8f0;border-radius:10px;padding:16px;display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:40px;height:40px;border-radius:8px;background:#F3F0FF;display:flex;align-items:center;justify-content:center;font-size:18px">🏢</div>
        <div><div style="font-weight:700;color:#1a1a2e">{{c.company_name||c.name}}</div></div>
      </div>
      <span style="background:#ebfbee;color:#2f9e44;padding:2px 10px;border-radius:20px;font-size:11.5px;font-weight:600">Active</span>
    </div>
    <div v-if="!companies.length" style="background:#fff;border:1px dashed #e4e8f0;border-radius:10px;padding:30px;text-align:center;color:#868e96">No companies found</div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiList } from "../api/client.js";

const companies = ref([]);

async function load() {
  try {
    companies.value = await apiList("Books Company", {
      fields: ["name", "company_name", "currency"],
      limit: 50,
    });
  } catch (e) {
    console.error("Failed to load companies", e);
  }
}
onMounted(load);
</script>
