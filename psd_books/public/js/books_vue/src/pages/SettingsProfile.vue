<template>
<div class="sp-page">

  <!-- ── Sticky Header + Tabs ─────────────────────────────────────── -->
  <div class="sp-sticky">
    <div class="sp-header">
      <span class="sp-title">My Account</span>
      <button v-if="activeTab === 'profile'" class="nim-btn nim-btn-primary sp-save-btn" @click="saveProfile" :disabled="saving">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
        {{ saving ? 'Saving…' : 'Save Changes' }}
      </button>
      <button v-else class="nim-btn nim-btn-primary sp-save-btn" @click="changePassword" :disabled="savingPw">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        {{ savingPw ? 'Updating…' : 'Update Password' }}
      </button>
    </div>
    <div class="sp-tabs">
      <button v-for="t in TABS" :key="t.k"
        class="sp-tab" :class="{ 'sp-tab--active': activeTab === t.k }"
        @click="activeTab = t.k">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="t.icon"></svg>
        {{ t.l }}
      </button>
    </div>
  </div>

  <!-- ── Profile Tab ───────────────────────────────────────────────── -->
  <div v-if="activeTab === 'profile'" class="sp-body">

    <!-- LEFT COLUMN -->
    <div class="sp-col-main">

      <!-- Avatar Hero Card -->
      <div class="sp-card sp-avatar-card">
        <div class="sp-avatar-section">
          <!-- Avatar with online dot -->
          <div class="sp-avatar-wrap">
            <div class="sp-avatar">
              <span>{{ initials }}</span>
              <div class="sp-avatar-ring"></div>
            </div>
            <div class="sp-online-dot"></div>
          </div>
          <!-- Identity -->
          <div class="sp-identity">
            <div class="sp-identity-name">{{ profile.first_name }} {{ profile.last_name }}</div>
            <div class="sp-identity-email">{{ profile.email }}</div>
            <div class="sp-identity-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Active Account
            </div>
          </div>
          <!-- Stats with icons -->
          <div class="sp-hero-stats">
            <div class="sp-hero-stat">
              <div class="sp-hero-stat-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div class="sp-hero-stat-val">{{ role || 'Member' }}</div>
              <div class="sp-hero-stat-lbl">ROLE</div>
            </div>
            <div class="sp-hero-stat-sep"></div>
            <div class="sp-hero-stat">
              <div class="sp-hero-stat-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div class="sp-hero-stat-val">Today</div>
              <div class="sp-hero-stat-lbl">JOINED</div>
            </div>
            <div class="sp-hero-stat-sep"></div>
            <div class="sp-hero-stat">
              <div class="sp-hero-stat-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div class="sp-hero-stat-val">Active</div>
              <div class="sp-hero-stat-lbl">STATUS</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Personal Information Card -->
      <div class="sp-card">
        <div class="sp-card-header">
          <div class="sp-card-icon sp-card-icon--blue">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div>
            <div class="sp-card-title">Personal Information</div>
            <div class="sp-card-subtitle">Update your name and contact details</div>
          </div>
        </div>
        <div class="sp-divider"></div>
        <div class="sp-fg">
          <div class="nim-field">
            <label class="nim-label">First Name</label>
            <input class="nim-input" v-model="profile.first_name" placeholder="Enter first name"/>
          </div>
          <div class="nim-field">
            <label class="nim-label">Last Name</label>
            <input class="nim-input" v-model="profile.last_name" placeholder="Enter last name"/>
          </div>
          <div class="nim-field sp-full">
            <label class="nim-label">Email Address</label>
            <div class="sp-input-locked">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input class="nim-input sp-locked-input" :value="profile.email" disabled/>
            </div>
            <div class="sp-field-hint">Email cannot be changed. Contact your administrator.</div>
          </div>
          <div class="nim-field">
            <label class="nim-label">Phone</label>
            <div class="sp-input-icon-wrap">
              <svg class="sp-input-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <input class="nim-input sp-icon-input" v-model="profile.phone" placeholder="+254 700 000 000"/>
            </div>
          </div>
          <div class="nim-field">
            <label class="nim-label">Mobile</label>
            <div class="sp-input-icon-wrap">
              <svg class="sp-input-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>
              <input class="nim-input sp-icon-input" v-model="profile.mobile_no" placeholder="+254 700 000 000"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Security Tip Banner -->
      <div class="sp-security-tip">
        <div class="sp-tip-shield-left">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div class="sp-tip-content">
          <div class="sp-tip-title">Account Security Tip</div>
          <div class="sp-tip-text">Keep your account secure by using a strong password and enabling two-factor authentication.</div>
        </div>
        <div class="sp-tip-shield-right">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div class="sp-tip-stars">
            <span v-for="i in 5" :key="i" class="sp-tip-star">★</span>
          </div>
        </div>
      </div>

    </div>

    <!-- RIGHT SIDEBAR -->
    <div class="sp-col-side">

      <!-- Account Summary Card -->
      <div class="sp-card">
        <div class="sp-card-header">
          <div class="sp-card-icon sp-card-icon--green">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
          </div>
          <div>
            <div class="sp-card-title">Account Summary</div>
            <div class="sp-card-subtitle">Your account at a glance</div>
          </div>
        </div>
        <div class="sp-divider"></div>
        <div class="sp-summary-list">
          <div class="sp-summary-row">
            <span class="sp-summary-lbl">Full Name</span>
            <span class="sp-summary-val">{{ profile.first_name }} {{ profile.last_name }}</span>
          </div>
          <div class="sp-summary-row">
            <span class="sp-summary-lbl">Email</span>
            <span class="sp-summary-val sp-summary-mono">{{ profile.email }}</span>
          </div>
          <div class="sp-summary-row">
            <span class="sp-summary-lbl">Phone</span>
            <span class="sp-summary-val">{{ profile.phone || '—' }}</span>
          </div>
          <div class="sp-summary-row">
            <span class="sp-summary-lbl">Mobile</span>
            <span class="sp-summary-val">{{ profile.mobile_no || '—' }}</span>
          </div>
          <div class="sp-summary-divider"></div>
          <div class="sp-summary-row">
            <span class="sp-summary-lbl">Account Status</span>
            <span class="sp-pill sp-pill--green">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg>
              Active
            </span>
          </div>
        </div>
      </div>

      <!-- Security Status Card -->
      <div class="sp-card">
        <div class="sp-card-header">
          <div class="sp-card-icon sp-card-icon--indigo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <div class="sp-card-title">Security Status</div>
            <div class="sp-card-subtitle">Your account protection level</div>
          </div>
        </div>
        <div class="sp-divider"></div>
        <div class="sp-sec-list">
          <div class="sp-sec-row">
            <div class="sp-sec-check sp-sec-check--on">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="sp-sec-info">
              <div class="sp-sec-label">Password Set</div>
              <div class="sp-sec-sub">Account is password protected</div>
            </div>
          </div>
          <div class="sp-sec-row">
            <div class="sp-sec-check sp-sec-check--on">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="sp-sec-info">
              <div class="sp-sec-label">Email Verified</div>
              <div class="sp-sec-sub">Login email is verified</div>
            </div>
          </div>
        </div>
        <div class="sp-divider"></div>
        <button class="sp-link-btn" @click="activeTab = 'security'">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Manage Security Settings
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:auto"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

    </div>
  </div>

  <!-- ── Security Tab ──────────────────────────────────────────────── -->
  <div v-else class="sp-body">

    <!-- LEFT: Password Card -->
    <div class="sp-col-main">
      <div class="sp-card">
        <div class="sp-card-header">
          <div class="sp-card-icon sp-card-icon--indigo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div>
            <div class="sp-card-title">Change Password</div>
            <div class="sp-card-subtitle">Use at least 8 characters with letters and numbers</div>
          </div>
        </div>
        <div class="sp-divider"></div>
        <div class="sp-fg sp-fg--single">
          <div class="nim-field">
            <label class="nim-label">Current Password</label>
            <div class="sp-pw-field">
              <input class="nim-input sp-pw-input" :type="showPw.old ? 'text' : 'password'" v-model="pwForm.old_password" placeholder="Enter current password"/>
              <button class="sp-pw-eye" @click="showPw.old = !showPw.old" type="button">
                <svg v-if="!showPw.old" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>
          <div class="nim-field">
            <label class="nim-label">New Password</label>
            <div class="sp-pw-field">
              <input class="nim-input sp-pw-input" :type="showPw.new ? 'text' : 'password'" v-model="pwForm.new_password" placeholder="Enter new password"/>
              <button class="sp-pw-eye" @click="showPw.new = !showPw.new" type="button">
                <svg v-if="!showPw.new" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
            <div v-if="pwForm.new_password" class="sp-pw-strength">
              <div class="sp-pw-bars">
                <div v-for="i in 4" :key="i" class="sp-pw-bar"
                  :class="{ 'sp-pw-bar--weak': pwStrength >= 1 && i === 1, 'sp-pw-bar--fair': pwStrength >= 2 && i <= 2, 'sp-pw-bar--good': pwStrength >= 3 && i <= 3, 'sp-pw-bar--strong': pwStrength >= 4 }">
                </div>
              </div>
              <span class="sp-pw-label" :class="'sp-pw-label--' + pwStrengthLabel.toLowerCase()">{{ pwStrengthLabel }}</span>
            </div>
          </div>
          <div class="nim-field">
            <label class="nim-label">Confirm New Password</label>
            <div class="sp-pw-field">
              <input class="nim-input sp-pw-input"
                :type="showPw.confirm ? 'text' : 'password'"
                v-model="pwForm.confirm_password"
                placeholder="Re-enter new password"
                :style="pwForm.confirm_password && pwForm.new_password !== pwForm.confirm_password ? 'border-color:#dc2626' : pwForm.confirm_password && pwForm.new_password === pwForm.confirm_password ? 'border-color:#2f9e44' : ''"/>
              <button class="sp-pw-eye" @click="showPw.confirm = !showPw.confirm" type="button">
                <svg v-if="!showPw.confirm" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
            <div v-if="pwForm.confirm_password && pwForm.new_password !== pwForm.confirm_password"
              style="margin-top:4px;font-size:12px;color:#dc2626;display:flex;align-items:center;gap:4px">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16.01"/></svg>
              Passwords do not match
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT SIDEBAR: Security -->
    <div class="sp-col-side">

      <!-- Security checklist -->
      <div class="sp-card">
        <div class="sp-card-header">
          <div class="sp-card-icon sp-card-icon--indigo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <div class="sp-card-title">Security Status</div>
            <div class="sp-card-subtitle">Your account protection level</div>
          </div>
        </div>
        <div class="sp-divider"></div>
        <div class="sp-sec-list">
          <div class="sp-sec-row">
            <div class="sp-sec-check sp-sec-check--on">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="sp-sec-info">
              <div class="sp-sec-label">Password Set</div>
              <div class="sp-sec-sub">Account is password protected</div>
            </div>
          </div>
          <div class="sp-sec-row">
            <div class="sp-sec-check sp-sec-check--on">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="sp-sec-info">
              <div class="sp-sec-label">Email Verified</div>
              <div class="sp-sec-sub">Login email is verified</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Password Tips -->
      <div class="sp-card sp-tips-card">
        <div class="sp-tips-header">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16.01"/></svg>
          Password Tips
        </div>
        <div class="sp-tips-list">
          <div class="sp-tip">Use at least 8 characters with uppercase, numbers and symbols.</div>
          <div class="sp-tip">Avoid using your name, email, or common words.</div>
          <div class="sp-tip">Change your password every 3–6 months for best security.</div>
        </div>
      </div>

    </div>
  </div>

  <!-- ── Footer ────────────────────────────────────────────────────── -->
  <div class="sp-footer">
    <div class="sp-footer-left">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      Your account information is encrypted and secure
    </div>
    <div class="sp-footer-right">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      Last updated: Today, 10:30 AM
    </div>
  </div>

</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { apiGET, apiPOST } from "../api/client.js";
import { useToast } from "../composables/useToast.js";
import { usePermissions } from "../composables/usePermissions.js";

const { toast } = useToast();
const { role } = usePermissions();

const TABS = [
  { k: "profile",  l: "Profile",  icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
  { k: "security", l: "Security", icon: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>' },
];

const profile   = reactive({ email: "", first_name: "", last_name: "", phone: "", mobile_no: "", user_image: "" });
const pwForm    = reactive({ old_password: "", new_password: "", confirm_password: "" });
const saving    = ref(false);
const savingPw  = ref(false);
const activeTab = ref("profile");
const showPw    = reactive({ old: false, new: false, confirm: false });

async function loadProfile() {
  try {
    const p = await apiGET("psd_books.api.admin.get_profile");
    Object.assign(profile, p);
  } catch (e) { toast("Could not load profile", "error"); }
}

async function saveProfile() {
  saving.value = true;
  try {
    const r = await apiPOST("psd_books.api.admin.update_profile", {
      first_name: profile.first_name, last_name: profile.last_name,
      phone: profile.phone, mobile_no: profile.mobile_no,
    });
    if (r?.full_name) window.frappe.session.user_fullname = r.full_name;
    toast("Profile updated successfully");
  } catch (e) { toast(e.message, "error"); }
  saving.value = false;
}

async function changePassword() {
  if (!pwForm.old_password || !pwForm.new_password)      return toast("All fields required", "error");
  if (pwForm.new_password !== pwForm.confirm_password)   return toast("New passwords do not match", "error");
  if (pwForm.new_password.length < 8)                    return toast("Password must be at least 8 characters", "error");
  savingPw.value = true;
  try {
    await apiPOST("psd_books.api.admin.change_password", {
      old_password: pwForm.old_password, new_password: pwForm.new_password,
    });
    toast("Password changed successfully");
    Object.assign(pwForm, { old_password: "", new_password: "", confirm_password: "" });
  } catch (e) { toast(e.message, "error"); }
  savingPw.value = false;
}

const initials = computed(() => {
  const base = ((profile.first_name || "") + " " + (profile.last_name || "")).trim() || profile.email || "U";
  return base.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
});

const pwStrength = computed(() => {
  const p = pwForm.new_password;
  if (!p) return 0;
  let score = 0;
  if (p.length >= 8)            score++;
  if (/[A-Z]/.test(p))         score++;
  if (/[0-9]/.test(p))         score++;
  if (/[^A-Za-z0-9]/.test(p))  score++;
  return score;
});

const pwStrengthLabel = computed(() =>
  ["", "Weak", "Fair", "Good", "Strong"][pwStrength.value] || ""
);

onMounted(loadProfile);
</script>

<style scoped>
/* ── Page ──────────────────────────────────────────────────────────── */
.sp-page {
  background: #f0f2f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Sticky header ─────────────────────────────────────────────────── */
.sp-sticky {
  position: sticky;
  top: 0;
  z-index: 20;
  background: #f0f2f5;
}
.sp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 24px 0;
}
.sp-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.3px;
}
.sp-save-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13.5px;
  font-weight: 600;
  padding: 9px 20px;
  border-radius: 8px;
}

/* ── Tabs ──────────────────────────────────────────────────────────── */
.sp-tabs {
  display: flex;
  border-bottom: 2px solid #e4e8f0;
  padding: 0 24px;
  margin-top: 14px;
  overflow-x: auto;
  scrollbar-width: none;
}
.sp-tabs::-webkit-scrollbar { display: none; }
.sp-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #868e96;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: color .15s;
}
.sp-tab:hover { color: #374151; }
.sp-tab--active { color: #2563eb; border-bottom-color: #2563eb; }

/* ── TWO-COLUMN BODY ───────────────────────────────────────────────── */
.sp-body {
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
  align-items: start;
  flex: 1;
}
.sp-col-main {
  display: grid;
  gap: 20px;
  align-content: start;
}
.sp-col-side {
  display: grid;
  gap: 16px;
  align-content: start;
}

/* ── Cards ─────────────────────────────────────────────────────────── */
.sp-card {
  background: #fff;
  border: 1px solid #e8ecf2;
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,.04);
}

.sp-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
}
.sp-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sp-card-icon--blue   { background: #eff6ff; color: #2563eb; }
.sp-card-icon--indigo { background: #eef2ff; color: #4f46e5; }
.sp-card-icon--green  { background: #f0fdf4; color: #16a34a; }

.sp-card-title {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
}
.sp-card-subtitle {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 2px;
}

.sp-divider {
  height: 1px;
  background: #f3f4f6;
  margin: 18px 0;
}

/* ── Avatar Hero ───────────────────────────────────────────────────── */
.sp-avatar-card {
  background: linear-gradient(135deg, #1e3a8a 0%, #2d3591 50%, #3730a3 100%);
  border: none;
  color: #fff;
  box-shadow: 0 4px 20px rgba(30, 58, 138, 0.3);
  position: relative;
  overflow: hidden;
  padding: 20px 24px;
}
.sp-avatar-card::before {
  content: '';
  position: absolute;
  top: -40px;
  right: -40px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(255,255,255,.05);
  pointer-events: none;
}
.sp-avatar-card::after {
  content: '';
  position: absolute;
  bottom: -30px;
  left: 30%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255,255,255,.04);
  pointer-events: none;
}

.sp-avatar-section {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 1;
  justify-content: space-between;
}

/* Avatar with online dot */
.sp-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}
.sp-avatar {
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background: rgba(255,255,255,.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 1px;
  border: 2px solid rgba(255,255,255,.3);
}
.sp-online-dot {
  position: absolute;
  bottom: 3px;
  right: 3px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid #1e3a8a;
}

.sp-identity { flex: 1; min-width: 0; margin-right: 12px; }
.sp-identity-name {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sp-identity-email {
  font-size: 13px;
  color: rgba(255,255,255,.72);
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sp-identity-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  font-size: 11.5px;
  font-weight: 600;
  color: #4ade80;
  background: rgba(74,222,128,.15);
  border: 1px solid rgba(74,222,128,.3);
  padding: 4px 12px;
  border-radius: 20px;
}

/* Hero stats strip */
.sp-hero-stats {
  display: flex;
  align-items: center;
  background: rgba(0,0,30,.28);
  border-radius: 14px;
  padding: 14px 6px;
  flex-shrink: 0;
  gap: 0;
  backdrop-filter: blur(4px);
}
.sp-hero-stat {
  text-align: center;
  padding: 0 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.sp-hero-stat-icon {
  color: rgba(255,255,255,.75);
  display: flex;
  align-items: center;
  justify-content: center;
}
.sp-hero-stat-val {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}
.sp-hero-stat-lbl {
  font-size: 9.5px;
  color: rgba(255,255,255,.5);
  text-transform: uppercase;
  letter-spacing: .8px;
  font-weight: 500;
}
.sp-hero-stat-sep {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,.15);
  flex-shrink: 0;
}

/* ── Form grid ─────────────────────────────────────────────────────── */
.sp-fg {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 2px;
}
.sp-fg--single { grid-template-columns: 1fr; }
.sp-full { grid-column: 1 / -1; }

/* ── Input with icon ───────────────────────────────────────────────── */
.sp-input-icon-wrap { position: relative; display: flex; align-items: center; }
.sp-input-icon {
  position: absolute;
  left: 10px;
  color: #9ca3af;
  pointer-events: none;
}
.sp-icon-input { padding-left: 30px !important; }

/* ── Locked email ──────────────────────────────────────────────────── */
.sp-input-locked { position: relative; display: flex; align-items: center; }
.sp-input-locked svg {
  position: absolute;
  left: 10px;
  color: #9ca3af;
  pointer-events: none;
}
.sp-locked-input {
  padding-left: 30px !important;
  background: #f9fafb !important;
  color: #9ca3af !important;
  cursor: not-allowed;
}
.sp-field-hint { font-size: 11.5px; color: #9ca3af; margin-top: 5px; }

/* ── Security Tip Banner ───────────────────────────────────────────── */
.sp-security-tip {
  background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%);
  border-radius: 14px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(30,64,175,.25);
}
.sp-tip-shield-left {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: rgba(255,255,255,.15);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sp-tip-content { flex: 1; min-width: 0; }
.sp-tip-title {
  font-size: 13.5px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}
.sp-tip-text {
  font-size: 12px;
  color: rgba(255,255,255,.75);
  line-height: 1.5;
}
.sp-tip-shield-right {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.sp-tip-stars {
  display: flex;
  gap: 2px;
}
.sp-tip-star {
  font-size: 10px;
  color: rgba(255,255,255,.3);
}

/* ── Password eye ──────────────────────────────────────────────────── */
.sp-pw-field { position: relative; display: flex; align-items: center; }
.sp-pw-input { padding-right: 38px !important; }
.sp-pw-eye {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  padding: 2px;
  display: flex;
  align-items: center;
  transition: color .15s;
}
.sp-pw-eye:hover { color: #374151; }

/* ── Password strength ─────────────────────────────────────────────── */
.sp-pw-strength { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
.sp-pw-bars { display: flex; gap: 4px; flex: 1; }
.sp-pw-bar {
  height: 4px;
  border-radius: 2px;
  flex: 1;
  background: #e4e8f0;
  transition: background .25s;
}
.sp-pw-bar--weak   { background: #ef4444; }
.sp-pw-bar--fair   { background: #f97316; }
.sp-pw-bar--good   { background: #eab308; }
.sp-pw-bar--strong { background: #22c55e; }
.sp-pw-label { font-size: 11px; font-weight: 700; min-width: 40px; text-align: right; }
.sp-pw-label--weak   { color: #ef4444; }
.sp-pw-label--fair   { color: #f97316; }
.sp-pw-label--good   { color: #eab308; }
.sp-pw-label--strong { color: #22c55e; }

/* ── Account Summary (sidebar) ─────────────────────────────────────── */
.sp-summary-list { display: flex; flex-direction: column; gap: 14px; }
.sp-summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}
.sp-summary-lbl {
  font-size: 12.5px;
  color: #6b7280;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}
.sp-summary-val {
  font-size: 12.5px;
  font-weight: 600;
  color: #111827;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sp-summary-mono { font-size: 12px; }
.sp-summary-divider {
  height: 1px;
  background: #f3f4f6;
  margin: 2px 0;
}

.sp-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  flex-shrink: 0;
}
.sp-pill--green { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }

/* ── Security check list ───────────────────────────────────────────── */
.sp-sec-list { display: flex; flex-direction: column; gap: 14px; }
.sp-sec-row { display: flex; align-items: center; gap: 12px; }
.sp-sec-check {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sp-sec-check--on  { background: #f0fdf4; color: #16a34a; border: 1.5px solid #bbf7d0; }
.sp-sec-check--off { background: #fff5f5; color: #dc2626; border: 1.5px solid #fecaca; }
.sp-sec-label { font-size: 13px; font-weight: 700; color: #111827; }
.sp-sec-sub   { font-size: 12px; color: #9ca3af; margin-top: 2px; }

.sp-link-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #2563eb;
  padding: 0;
  width: 100%;
  transition: color .15s;
}
.sp-link-btn:hover { color: #1d4ed8; }

/* ── Tips card ─────────────────────────────────────────────────────── */
.sp-tips-card {
  background: #f8faff;
  border-color: #dbeafe;
}
.sp-tips-header {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 12px;
}
.sp-tips-list { display: flex; flex-direction: column; gap: 9px; }
.sp-tip {
  font-size: 12px;
  color: #4b5563;
  line-height: 1.5;
  padding-left: 12px;
  border-left: 2px solid #93c5fd;
}

/* ── Footer ────────────────────────────────────────────────────────── */
.sp-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border-top: 1px solid #e8ecf2;
  background: #f0f2f5;
  margin-top: auto;
}
.sp-footer-left,
.sp-footer-right {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: #9ca3af;
  font-weight: 500;
}

/* ── Responsive ────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .sp-body { grid-template-columns: 1fr; }
  .sp-col-side { grid-template-columns: 1fr 1fr; }
  .sp-hero-stats { display: none; }
}
@media (max-width: 600px) {
  .sp-fg { grid-template-columns: 1fr; }
  .sp-full { grid-column: auto; }
  .sp-header { padding: 12px 16px 0; gap: 8px; }
  .sp-save-btn { font-size: 12.5px; padding: 8px 14px; gap: 5px; }
  .sp-tabs {
    padding: 0;
    margin-top: 10px;
    mask-image: linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%);
    -webkit-overflow-scrolling: touch;
  }
  .sp-tab { padding: 10px 16px; font-size: 12.5px; }
  .sp-tab:first-child { padding-left: 20px; }
  .sp-tab:last-child  { padding-right: 20px; }
  .sp-body   { padding: 14px; gap: 14px; }
  .sp-card   { padding: 16px; }
  .sp-title  { font-size: 17px; }
  .sp-col-side { grid-template-columns: 1fr; }
  .sp-avatar { width: 58px; height: 58px; font-size: 18px; }
  .sp-identity-name { font-size: 14px; }
  .sp-footer { flex-direction: column; gap: 6px; text-align: center; }
}
</style>