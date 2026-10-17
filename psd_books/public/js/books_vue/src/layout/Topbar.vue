<template>
  <header class="bv-topbar">
    <!-- Hamburger: visible on mobile only -->
    <button class="bv-hamburger" @click="$emit('toggle-mobile')" aria-label="Open menu">
      <span class="bv-ham-icon"></span>
    </button>

    <div class="bv-topbar-title">{{ title }}</div>
    <!-- <div class="bv-topbar-divider"></div>

    <div class="bv-topbar-search">
      <IconSvg name="search" :size="13" />
      <input
        v-model="query"
        placeholder="Search invoices, customers, items…"
        @keydown.enter="doSearch"
      />
    </div> -->

    <div class="bv-topbar-spacer"></div>

    <button class="bv-topbar-icon-btn bv-topbar-ai-btn" title="AI Assistant" @click="$emit('toggle-ai')">
      <IconSvg name="sparkle" :size="17" />
      <span v-if="alertCount > 0" class="bv-ai-badge">{{ alertCount > 9 ? '9+' : alertCount }}</span>
    </button>

    <div class="bv-topbar-user" @click.stop="userOpen = !userOpen">
      <div class="bv-topbar-avatar">{{ initials }}</div>
      <span class="bv-topbar-username">{{ session.fullname || session.user }}</span>
      <span class="bv-topbar-chevron">
        <IconSvg :name="userOpen ? 'chevU' : 'chevD'" :size="12" />
      </span>

      <div v-if="userOpen" class="bv-topbar-user-menu">
        <a href="#" @click.prevent="router.push('/settings/profile'); userOpen=false">
          <IconSvg name="user" :size="14" /> My Profile
        </a>
        <a v-if="isAdmin" href="#" @click.prevent="router.push('/settings/users'); userOpen=false">
          <IconSvg name="users" :size="14" /> Users
        </a>
        <a v-if="isAdmin" href="#" @click.prevent="router.push('/settings/company'); userOpen=false">
          <IconSvg name="building" :size="14" /> Company Settings
        </a>
        <hr />
        <a href="#" class="danger" @click.prevent="doLogout">
          <IconSvg name="logout" :size="14" /> Sign out
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import IconSvg from "../components/IconSvg.vue";
import { titleFor } from "./nav.js";
import { session } from "../api/session.js";
import { usePermissions } from "../composables/usePermissions.js";
import { useConfirm } from "../composables/useConfirm.js";

const { confirm } = useConfirm();

defineEmits(["toggle-ai", "toggle-mobile"])
defineProps({ alertCount: { type: Number, default: 0 } });

const route   = useRoute();
const router  = useRouter();
const query   = ref("");
const userOpen = ref(false);
const { isAdmin } = usePermissions();

const title = computed(() => titleFor(route.path));

const initials = computed(() => {
  const n = (session.fullname || session.user || "?").trim();
  const parts = n.split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return ((parts[0][0] || "") + (parts[1]?.[0] || "")).toUpperCase();
});

async function doLogout() {
  userOpen.value = false;
  const ok = await confirm({
    title: "Sign out?",
    body: "Are you sure you want to sign out of your account?",
    okLabel: "Sign Out",
    cancelLabel: "Cancel",
    okStyle: "danger",
  });
  if (!ok) return;
  try {
    const csrf = window.frappe?.csrf_token ||
      document.cookie.match(/csrf_token=([^;]+)/)?.[1] || "";
    await fetch("/api/method/logout", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Frappe-CSRF-Token": csrf,
      },
      body: csrf ? "csrf_token=" + encodeURIComponent(csrf) : "",
    });
  } catch {}
  window.location.replace("/login");
}

function doSearch() {
  if (!query.value.trim()) return;
  window.open(`/app/search?q=${encodeURIComponent(query.value)}`, "_blank");
}

function onDocClick(e) {
  if (!e.target.closest(".bv-topbar-user")) userOpen.value = false;
}
onMounted(()   => document.addEventListener("click", onDocClick));
onUnmounted(() => document.removeEventListener("click", onDocClick));
</script>
