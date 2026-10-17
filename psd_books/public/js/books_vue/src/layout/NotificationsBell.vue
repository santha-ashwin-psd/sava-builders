<template>
  <div class="bv-notif" @click.stop>
    <button class="bv-notif-trigger" @click="open = !open" :title="`${unread} unread`">
      <IconSvg name="bell" :size="18" />
      <span v-if="unread > 0" class="bv-notif-badge">{{ unread > 9 ? "9+" : unread }}</span>
    </button>
    <div v-if="open" class="bv-notif-panel">
      <div class="bv-notif-header">Notifications</div>
      <div v-if="!items.length" class="bv-notif-empty">You're all caught up.</div>
      <div v-for="(n, i) in items" :key="i" class="bv-notif-item">
        <div class="bv-notif-item-title">{{ n.title }}</div>
        <div class="bv-notif-item-body">{{ n.body }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import IconSvg from "../components/IconSvg.vue";
import { apiGET } from "../api/client.js";

const open   = ref(false);
const items  = ref([]);
const unread = ref(0);

let timer = null;

async function load() {
  try {
    const data = await apiGET("psd_books.api.admin.get_notifications");
    const flat = [];
    if (data?.overdue_invoices?.length)
      flat.push({ title: "Overdue Invoices",  body: `${data.overdue_invoices.length} invoices past due` });
    if (data?.due_bills?.length)
      flat.push({ title: "Bills Due",         body: `${data.due_bills.length} bills awaiting payment` });
    if (data?.reorder_alerts?.length)
      flat.push({ title: "Reorder Alerts",    body: `${data.reorder_alerts.length} items below reorder level` });
    items.value  = flat;
    unread.value = flat.length;
  } catch {
    // Permissions errors etc. — silent. The bell just shows zero.
  }
}

function onDocClick(e) {
  if (!e.target.closest(".bv-notif")) open.value = false;
}

onMounted(() => {
  load();
  timer = setInterval(load, 5 * 60 * 1000); // legacy cadence: 5 min
  document.addEventListener("click", onDocClick);
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
  document.removeEventListener("click", onDocClick);
});
</script>
