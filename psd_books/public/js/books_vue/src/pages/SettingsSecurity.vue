<template>
  <div class="s-page">
    <div class="s-head">
      <div>
        <div class="s-title">Security</div>
        <div class="s-sub">2FA status, your recent activity, and where to view the full audit trail.</div>
      </div>
      <button class="s-cta" @click="goAudit"><span v-html="icon('audit',13)"></span> Open Audit Log</button>
    </div>

    <div v-if="loading" class="s-loading">Loading…</div>
    <div v-else class="s-grid">

      <!-- 2FA card -->
      <div class="s-card">
        <div class="s-card-head">
          <div class="s-card-ico" :class="twoFA?'on':''"><span v-html="icon('shield',18)"></span></div>
          <div>
            <div class="s-card-title">Two-Factor Authentication</div>
            <div class="s-card-sub">Authenticator-app (TOTP) code on every login</div>
          </div>
          <span class="s-pill" :class="twoFA?'on':'off'">{{ twoFA ? 'Enabled' : 'Disabled' }}</span>
        </div>
        <div class="s-card-body">
          <p v-if="twoFA" class="s-line">2FA is active for this site. New logins must enter a one-time code from an authenticator app (Google Authenticator, Authy, 1Password).</p>
          <p v-else class="s-line">2FA is off site-wide. To enable, set <span class="s-mono">enable_two_factor_auth: 1</span> in <span class="s-mono">site_config.json</span> and restart bench. Each user then configures their authenticator on next login.</p>
          <div class="s-note" v-if="!twoFA">Note: this dev site has <span class="s-mono">ignore_csrf: 1</span> set for SPA reliability — recommended to flip both before production.</div>
        </div>
      </div>

      <!-- Your activity -->
      <div class="s-card">
        <div class="s-card-head">
          <div class="s-card-ico"><span v-html="icon('user',18)"></span></div>
          <div>
            <div class="s-card-title">Your Activity</div>
            <div class="s-card-sub">Signed in as {{ profile.full_name || profile.email || 'you' }}</div>
          </div>
        </div>
        <div class="s-card-body">
          <div class="s-rows">
            <div class="s-row"><div class="s-row-lbl">Email</div><div class="s-row-val">{{ profile.email || '—' }}</div></div>
            <div class="s-row"><div class="s-row-lbl">Last login</div><div class="s-row-val mono">{{ fmt(profile.last_login) }}</div></div>
            <div class="s-row"><div class="s-row-lbl">Last active</div><div class="s-row-val mono">{{ fmt(profile.last_active) }}</div></div>
            <div class="s-row"><div class="s-row-lbl">Roles</div><div class="s-row-val">{{ (profile.roles||[]).join(', ') || '—' }}</div></div>
          </div>
          <button class="s-link-btn" @click="goProfile"><span v-html="icon('edit',13)"></span> Change password / profile</button>
        </div>
      </div>

      <!-- Audit trail -->
      <div class="s-card">
        <div class="s-card-head">
          <div class="s-card-ico"><span v-html="icon('audit',18)"></span></div>
          <div>
            <div class="s-card-title">Audit Log</div>
            <div class="s-card-sub">Every login, create, edit and submit is recorded</div>
          </div>
        </div>
        <div class="s-card-body">
          <p class="s-line">A full activity trail is available — use it to investigate who changed what and when. The list updates in real time.</p>
          <button class="s-link-btn" @click="goAudit"><span v-html="icon('audit',13)"></span> Open Audit Log</button>
        </div>
      </div>

      <!-- Team enabled users -->
      <div class="s-card">
        <div class="s-card-head">
          <div class="s-card-ico"><span v-html="icon('users',18)"></span></div>
          <div>
            <div class="s-card-title">Team Access</div>
            <div class="s-card-sub">{{ enabledCount }} active · {{ disabledCount }} disabled</div>
          </div>
        </div>
        <div class="s-card-body">
          <div v-if="!members.length" class="s-empty">No team members.</div>
          <div v-else class="s-rows">
            <div v-for="m in members.slice(0,5)" :key="m.email" class="s-row">
              <div class="s-row-lbl" style="display:flex;align-items:center;gap:8px">
                <span class="s-status-dot" :class="m.enabled?'on':'off'"></span>
                <span>{{ m.full_name || m.email }}</span>
              </div>
              <div class="s-row-val mono">{{ fmt(m.last_login) || '—' }}</div>
            </div>
            <div v-if="members.length>5" class="s-row-more">+{{ members.length-5 }} more — open Users</div>
          </div>
          <button class="s-link-btn" @click="goUsers"><span v-html="icon('users',13)"></span> Manage Users</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { apiGET } from "../api/client.js";
import { useToast } from "../composables/useToast.js";
import { icon } from "../utils/icons.js";

const { toast } = useToast();
const router = useRouter();
const loading = ref(true);
const profile = ref({});
const members = ref([]);
const twoFA = ref(false);

const enabledCount = computed(() => members.value.filter(m => m.enabled).length);
const disabledCount = computed(() => members.value.filter(m => !m.enabled).length);

function fmt(d) {
  if (!d) return "";
  try { return new Date(d).toLocaleString("en-IN", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" }); }
  catch { return d; }
}

async function load() {
  loading.value = true;
  try {
    const [p, ms, sec] = await Promise.all([
      apiGET("psd_books.api.admin.get_profile").catch(() => ({})),
      apiGET("psd_books.api.admin.get_company_members").catch(() => []),
      apiGET("frappe.client.get_value", { doctype: "System Settings", fieldname: "enable_two_factor_auth" }).catch(() => null),
    ]);
    profile.value = p?.message || p || {};
    members.value = Array.isArray(ms) ? ms : (ms?.message || []);
    const val = sec?.enable_two_factor_auth ?? sec?.message?.enable_two_factor_auth;
    twoFA.value = !!(val && Number(val));
  } catch (e) { toast.error(e.message || "Failed to load security overview"); }
  finally { loading.value = false; }
}

function goAudit()   { router.push({ name: "settings-audit-log" }); }
function goProfile() { router.push({ name: "settings-profile" }); }
function goUsers()   { router.push({ name: "settings-users" }); }

onMounted(load);
</script>

<style scoped>
.s-page{display:flex;flex-direction:column;gap:18px;padding:24px;}
.s-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;}
.s-title{font-size:18px;font-weight:700;color:#0f172a;}
.s-sub{font-size:12.5px;color:#64748b;margin-top:2px;max-width:680px;line-height:1.5;}
.s-cta{display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid #e2e8f0;color:#334155;border-radius:8px;padding:8px 13px;font-size:13px;font-weight:600;cursor:pointer;}
.s-cta:hover{background:#f8fafc;border-color:#cbd5e1;}
.s-loading{padding:40px;text-align:center;color:#94a3b8;}

.s-grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(380px, 1fr));gap:14px;}
.s-card{background:#fff;border:1px solid #e5e7eb;border-radius:14px;display:flex;flex-direction:column;}
.s-card-head{display:flex;align-items:flex-start;gap:12px;padding:18px 18px 14px;border-bottom:1px solid #f1f5f9;}
.s-card-ico{width:38px;height:38px;border-radius:10px;background:#f1f5f9;color:#64748b;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.s-card-ico.on{background:#dcfce7;color:#16a34a;}
.s-card-title{font-size:14px;font-weight:700;color:#0f172a;}
.s-card-sub{font-size:11.5px;color:#64748b;margin-top:1px;}
.s-pill{margin-left:auto;align-self:center;display:inline-flex;align-items:center;border-radius:20px;padding:3px 11px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;}
.s-pill.on{background:#dcfce7;color:#16a34a;}
.s-pill.off{background:#fef2f2;color:#dc2626;}
.s-card-body{padding:14px 18px 18px;display:flex;flex-direction:column;gap:10px;}
.s-line{font-size:12.5px;color:#475569;line-height:1.55;margin:0;}
.s-mono{font-size:11.5px;background:#f1f5f9;color:#0f172a;padding:1px 6px;border-radius:4px;}
.s-note{font-size:11.5px;color:#94a3b8;}
.s-rows{display:flex;flex-direction:column;gap:8px;}
.s-row{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:12.5px;}
.s-row-lbl{color:#64748b;}
.s-row-val{color:#0f172a;font-weight:500;}
.s-row-val.mono{font-size:11.5px;}
.s-row-more{font-size:11.5px;color:#94a3b8;}
.s-status-dot{width:8px;height:8px;border-radius:50%;display:inline-block;}
.s-status-dot.on{background:#16a34a;}
.s-status-dot.off{background:#9ca3af;}
.s-empty{font-size:12px;color:#94a3b8;padding:8px;text-align:center;}
.s-link-btn{display:inline-flex;align-items:center;gap:6px;align-self:flex-start;background:#eff6ff;border:1px solid #bfdbfe;color:#1d4ed8;border-radius:8px;padding:7px 12px;font:inherit;font-size:12.5px;font-weight:600;cursor:pointer;margin-top:4px;}
.s-link-btn:hover{background:#dbeafe;}
</style>
