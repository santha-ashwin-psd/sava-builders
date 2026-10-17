<template>
<div class="cust-page">
  <div class="cust-toolbar">
    <span style="font-size:18px;font-weight:700;color:#1a1a2e">Audit Log</span>
    <div style="display:flex;gap:8px">
      <button class="nim-btn nim-btn-ghost" @click="exportCSV" :disabled="!logs.length"><span v-html="icon('download',13)" style="vertical-align:-2px;margin-right:4px"/>Export CSV</button>
      <button class="nim-btn nim-btn-primary" @click="load"><span v-html="icon('refresh',13)" style="vertical-align:-2px;margin-right:4px"/>Refresh</button>
    </div>
  </div>
  <div class="cust-table-card sa-tbl-card" style="margin-top:0">
    <div v-if="loading" style="padding:40px;text-align:center;color:#868e96">Loading audit log…</div>
    <table v-else class="sal-desktop-table" style="width:100%;border-collapse:collapse;font-size:12.5px">
      <thead><tr style="background:#f8f9fc;border-bottom:2px solid #e4e8f0">
        <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#6b7db3">Date / Time</th>
        <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#6b7db3">User</th>
        <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#6b7db3">Document Type</th>
        <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#6b7db3">Document</th>
        <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#6b7db3">Action</th>
      </tr></thead>
      <tbody>
        <tr v-for="l in logs" :key="l.name" style="border-bottom:1px solid #f0f2f7">
          <td style="padding:9px 14px;color:#868e96">{{l.creation}}</td>
          <td style="padding:9px 14px;color:#4a5568">{{l.user}}</td>
          <td style="padding:9px 14px;color:#4a5568">{{l.doctype||'—'}}</td>
          <td style="padding:9px 14px;font-weight:600;color:#1a1a2e">{{l.doc_name||'—'}}</td>
          <td style="padding:9px 14px">
            <span :style="'background:'+(OP_COLORS[l.operation]||'#f8f9fa')+'22;color:'+(OP_COLORS[l.operation]||'#868e96')+';padding:2px 8px;border-radius:20px;font-size:11.5px;font-weight:600'">{{l.operation||'—'}}</span>
          </td>
        </tr>
        <tr v-if="!logs.length && !loading"><td colspan="5" style="padding:40px;text-align:center;color:#868e96">No audit log entries found</td></tr>
      </tbody>
    </table>

    <!-- Mobile cards (shown at ≤768px) -->
    <div v-if="!loading" class="sal-mobile-cards">
      <div v-if="!logs.length" class="sal-mc-empty">
        <div style="font-size:32px;margin-bottom:8px">📋</div>
        <div>No audit log entries found</div>
      </div>
      <template v-else>
        <div v-for="l in logs" :key="l.name" class="sal-mobile-card">
          <div class="sal-mc-top">
            <span class="sal-mc-date">{{ l.creation }}</span>
            <span class="sal-mc-op" :style="'background:'+(OP_COLORS[l.operation]||'#f8f9fa')+'22;color:'+(OP_COLORS[l.operation]||'#868e96')">{{ l.operation||'—' }}</span>
          </div>
          <div class="sal-mc-mid">{{ l.doc_name||'—' }}</div>
          <div class="sal-mc-meta">
            <span>{{ l.user }}</span>
            <span>{{ l.doctype||'—' }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiGET } from "../api/client.js";
import { useToast } from "../composables/useToast.js";
import { icon } from "../utils/icons.js";

const { toast } = useToast();

const logs    = ref([]);
const loading = ref(false);
const page    = ref(0);

const OP_COLORS = {
  Login: "#2F9E44", Logout: "#868E96", Created: "#1971C2",
  Submitted: "#2F9E44", Cancelled: "#C92A2A", Amended: "#E67700",
};

async function load() {
  loading.value = true;
  try {
    logs.value = await apiGET("psd_books.api.admin.get_audit_log", { page: page.value, page_len: 50 }) || [];
  } catch (e) { toast("Could not load audit log: " + e.message, "error"); }
  loading.value = false;
}

function exportCSV() {
  const header = ["Date", "User", "DocType", "Document", "Action", "Status"];
  const rows = logs.value.map((l) =>
    [l.creation, l.user, l.doctype || "", l.doc_name || "", l.operation || "", l.status || ""]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
  );
  const csv = [header.join(","), ...rows].join("\n");
  const a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  a.download = "audit_log.csv";
  a.click();
}

onMounted(load);
</script>

<style>
.sal-mobile-cards { display: none; }
.sal-desktop-table { display: table; }

@media (max-width: 768px) {
  .sal-desktop-table { display: none !important; }
  .sal-mobile-cards { display: flex; flex-direction: column; gap: 0; background: #f8fafc; }
  .sal-mobile-card { background: #fff; border-bottom: 1px solid #e5e7eb; padding: 12px 14px; }
  .sal-mc-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
  .sal-mc-date { font-size: 11.5px; color: #6b7280; }
  .sal-mc-op { padding: 2px 8px; border-radius: 20px; font-size: 11.5px; font-weight: 600; }
  .sal-mc-mid { font-size: 13px; font-weight: 700; color: #1a1a2e; margin-bottom: 4px; }
  .sal-mc-meta { display: flex; justify-content: space-between; font-size: 12px; color: #868e96; }
  .sal-mc-empty { text-align: center; padding: 32px 16px; color: #868e96; font-size: 13px; }
}
@media (max-width: 480px) {
  .cust-page { padding: 12px !important; }
}
</style>
