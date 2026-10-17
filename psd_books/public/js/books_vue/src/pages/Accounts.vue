<template>
  <div class="coa-page">

    <!-- ── Summary Cards ── -->
    <div class="coa-summary-row">
      <div
        v-for="cat in summaryCards"
        :key="cat.key"
        class="coa-summary-card"
        :class="[`coa-card--${cat.key}`, { 'coa-card--active': activeRoot === cat.rootType }]"
        @click="filterByRoot(cat.rootType)"
      >
        <div class="coa-card-header">{{ cat.label }}</div>
        <div class="coa-card-count">{{ cat.count }}</div>
        <div class="coa-card-meta">{{ cat.balanceDir }} · {{ cat.hasOpening ? 'Has opening' : 'No opening' }}</div>
      </div>
    </div>

    <!-- ── Toolbar ── -->
    <div class="coa-toolbar">
      <div class="coa-search-wrap">
        <svg class="coa-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          v-model="searchQ"
          class="coa-search-input"
          placeholder="Search account name or code"
        />
      </div>
      <div class="coa-toolbar-btns">
        <button class="coa-ghost-btn" @click="doExpandAll">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
          Expand All
        </button>
        <button class="coa-ghost-btn" @click="doCollapseAll">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg>
          Collapse All
        </button>
        <button class="coa-ghost-btn" @click="load">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
          Refresh
        </button>
        <button class="coa-primary-btn" @click="openAddModal">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Add Account
        </button>
      </div>
    </div>

    <!-- ── Tree Table ── -->
    <div class="coa-table-wrap">
      <table class="coa-table">
        <thead>
          <tr>
            <th class="col-name">Account Name</th>
            <th class="col-type">Type</th>
            <th class="col-no">Account No.</th>
            <th class="col-opening">Opening Balance</th>
            <th class="col-balance">Balance Type</th>
            <th class="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loading shimmer -->
          <template v-if="loading">
            <tr v-for="n in 10" :key="n" class="shimmer-row">
              <td colspan="6"><div class="loading-shimmer"></div></td>
            </tr>
          </template>

          <!-- Tree rows -->
          <template v-else>
            <tr
              v-for="row in visibleRows"
              :key="row.name"
              class="coa-row"
              :class="{ 'coa-row--group': row.is_group }"
            >
              <!-- Account Name with indent + toggle -->
              <td class="coa-name-cell" :style="{ paddingLeft: `${12 + row._depth * 22}px` }">
                <button
                  v-if="row.is_group && row._children.length"
                  class="coa-toggle-btn"
                  @click.stop="toggleNode(row)"
                  :aria-label="row._expanded ? 'Collapse' : 'Expand'"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path :d="row._expanded ? 'M6 9l6 6 6-6' : 'M9 6l6 6-6 6'"/>
                  </svg>
                </button>
                <span v-else class="coa-toggle-spacer"></span>

                <span class="coa-type-dot" :class="`dot--${dotKey(row)}`"></span>

                <span class="coa-acct-name" :class="{ 'coa-acct-name--group': row.is_group }">
                  {{ row.account_name }}
                </span>
              </td>

              <!-- Type -->
              <td class="coa-type-cell">
                <span v-if="row.is_group" class="coa-badge coa-badge--muted">Group</span>
                <span class="coa-badge" :class="typeBadge(row.root_type || row.account_type)">
                  {{ row.root_type || row.account_type || '—' }}
                </span>
              </td>

              <!-- Account No. -->
              <td class="coa-mono">{{ row.account_number || '—' }}</td>

              <!-- Opening Balance -->
              <td class="coa-mono">
                {{ (row.opening_balance != null && row.opening_balance !== '') ? fmt(row.opening_balance) : '—' }}
              </td>

              <!-- Balance Type -->
              <td>
                <span
                  v-if="row.balance_must_be"
                  class="coa-badge"
                  :class="row.balance_must_be === 'Debit' ? 'coa-badge--debit' : 'coa-badge--credit'"
                >{{ row.balance_must_be }}</span>
                <span v-else class="coa-muted">—</span>
              </td>

              <!-- Actions -->
              <td class="coa-actions-cell">
                <button class="coa-icon-btn" @click.stop="openEditModal(row)" title="Edit account">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
              </td>
            </tr>

            <tr v-if="!loading && !visibleRows.length">
              <td colspan="6" class="coa-empty">No accounts found</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- ── Add / Edit Modal ── -->
    <teleport to="body">
      <div v-if="modal.open" class="coa-overlay" @click.self="closeModal">
        <div class="coa-modal">
          <div class="coa-modal-header">
            <h2 class="coa-modal-title">{{ modal.editing ? 'Edit Account' : 'Add Account' }}</h2>
            <button class="coa-modal-close" @click="closeModal" aria-label="Close">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <form class="coa-modal-body" @submit.prevent="submitForm">
            <div class="coa-form-grid">

              <div class="coa-field coa-field--full">
                <label class="coa-label">Account Name <span class="coa-req">*</span></label>
                <input class="coa-input" v-model="form.account_name" required placeholder="e.g. Trade Receivables" />
              </div>

              <div class="coa-field">
                <label class="coa-label">Account Number</label>
                <input class="coa-input" v-model="form.account_number" placeholder="e.g. 1100" />
              </div>

              <div class="coa-field">
                <label class="coa-label">Root Type</label>
                <select class="coa-select" v-model="form.root_type">
                  <option value="">— Select —</option>
                  <option v-for="rt in ROOT_TYPES" :key="rt" :value="rt">{{ rt }}</option>
                </select>
              </div>

              <div class="coa-field">
                <label class="coa-label">Account Type</label>
                <select class="coa-select" v-model="form.account_type">
                  <option value="">— Select —</option>
                  <option v-for="at in ACCOUNT_TYPES" :key="at" :value="at">{{ at }}</option>
                </select>
              </div>

              <div class="coa-field">
                <label class="coa-label">Parent Account</label>
                <select class="coa-select" v-model="form.parent_account">
                  <option value="">— (Root) —</option>
                  <option v-for="a in groupAccounts" :key="a.name" :value="a.name">{{ a.account_name }}</option>
                </select>
              </div>

              <div class="coa-field">
                <label class="coa-label">Opening Balance</label>
                <input class="coa-input" type="number" step="0.01" v-model="form.opening_balance" placeholder="0.00" />
              </div>

              <div class="coa-field">
                <label class="coa-label">Balance Type</label>
                <select class="coa-select" v-model="form.balance_must_be">
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>

              <div class="coa-field coa-field--check">
                <label class="coa-checkbox-label">
                  <input type="checkbox" v-model="form.is_group" />
                  <span>Is Group <span class="coa-hint">(can contain sub-accounts)</span></span>
                </label>
              </div>

            </div>

            <div class="coa-modal-footer">
              <button type="button" class="coa-ghost-btn" @click="closeModal">Cancel</button>
              <button type="submit" class="coa-primary-btn" :disabled="saving">
                {{ saving ? 'Saving…' : (modal.editing ? 'Update Account' : 'Create Account') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { formatCurrency } from "../composables/useFrappe.js";

const fmt = formatCurrency;

// ── Constants ────────────────────────────────────────────────────────────────
const ROOT_TYPES = ["Asset", "Liability", "Equity", "Income", "Expense"];

const ACCOUNT_TYPES = [
  "Accumulated Depreciation", "Asset Received But Not Billed",
  "Bank", "Cash", "Chargeable", "Cost of Goods Sold",
  "Depreciation", "Equity", "Expense Account",
  "Expenses Included In Asset Valuation", "Expenses Included In Valuation",
  "Fixed Asset", "Income Account", "Liability",
  "Payable", "Receivable", "Round Off",
  "Stock", "Stock Adjustment", "Tax", "Temporary",
];

const ROOT_META = {
  Asset:     { label: "ASSET",     balanceDir: "Normally Dr", key: "asset"     },
  Liability: { label: "LIABILITY", balanceDir: "Normally Cr", key: "liability" },
  Equity:    { label: "EQUITY",    balanceDir: "Normally Cr", key: "equity"    },
  Income:    { label: "INCOME",    balanceDir: "Normally Cr", key: "income"    },
  Expense:   { label: "EXPENSE",   balanceDir: "Normally Dr", key: "expense"   },
};

const TYPE_BADGE = {
  Asset:      "coa-badge--asset",
  Liability:  "coa-badge--liability",
  Equity:     "coa-badge--equity",
  Income:     "coa-badge--income",
  Expense:    "coa-badge--expense",
  Bank:       "coa-badge--bank",
  Cash:       "coa-badge--income",
  Payable:    "coa-badge--liability",
  Receivable: "coa-badge--asset",
  Tax:        "coa-badge--equity",
};

// ── State ─────────────────────────────────────────────────────────────────────
const loading     = ref(false);
const saving      = ref(false);
const allAccounts = ref([]);
const treeRoots   = ref([]);
const searchQ     = ref("");
const activeRoot  = ref("");

const modal = ref({ open: false, editing: false });
const form  = ref(emptyForm());

function emptyForm() {
  return {
    name: null, account_name: "", account_number: "",
    root_type: "", account_type: "", parent_account: "",
    is_group: false, opening_balance: null, balance_must_be: "Debit",
  };
}

// ── Data fetching ─────────────────────────────────────────────────────────────
// Detect the current company from Frappe boot/defaults
function currentCompany() {
  return (
    frappe?.defaults?.get_user_default?.("company") ||
    frappe?.boot?.sysdefaults?.company ||
    ""
  );
}

// Bare Frappe template root names shipped without a company.
const GENERIC_ROOT_NAMES = new Set([
  "Assets", "Liabilities", "Liability",
  "Equity", "Income", "Expenses", "Expense",
]);

/**
 * Remove unnamed template root accounts.
 * Strategy A (preferred): if company is known, keep only root-level groups
 *   whose name contains the company string.
 * Strategy B (fallback): if company is unknown, drop anything whose name is
 *   in GENERIC_ROOT_NAMES when a non-generic sibling root exists.
 */
function deduplicateRoots(flat, company) {
  // Identify top-level groups (no parent_account)
  const topGroups = flat.filter(a => !a.parent_account);

  if (company) {
    // Strategy A — keep top-level groups that contain the company name
    const hasCompanyGroup = topGroups.some(a =>
      a.account_name && a.account_name.includes(company)
    );
    if (!hasCompanyGroup) return flat; // no company-specific roots → show all

    return flat.filter(a => {
      if (!a.parent_account && GENERIC_ROOT_NAMES.has(a.account_name)) return false;
      return true;
    });
  }

  // Strategy B — name-based dedup without company
  const hasNonGenericTop = topGroups.some(a => !GENERIC_ROOT_NAMES.has(a.account_name));
  if (!hasNonGenericTop) return flat;

  return flat.filter(a => !(GENERIC_ROOT_NAMES.has(a.account_name) && !a.parent_account));
}

async function load() {
  loading.value = true;
  try {
    const company = currentCompany();
    const res = await frappe.call({
      method: "psd_books.api.books_data.get_chart_of_accounts",
      args:   { company },
    });
    const raw = res.message || [];
    allAccounts.value = deduplicateRoots(raw, company);
    treeRoots.value   = buildTree(allAccounts.value);
  } catch (e) {
    console.error("[CoA] load error", e);
  } finally {
    loading.value = false;
  }
}

// ── Tree construction ─────────────────────────────────────────────────────────
function buildTree(flat) {
  const map = {};
  flat.forEach(a => {
    map[a.name] = { ...a, _children: [], _expanded: false, _depth: 0 };
    // Normalise is_group to boolean
    map[a.name].is_group = !!a.is_group;
  });

  const roots = [];
  flat.forEach(a => {
    const node = map[a.name];
    if (a.parent_account && map[a.parent_account]) {
      map[a.parent_account]._children.push(node);
    } else {
      roots.push(node);
    }
  });

  function assignDepths(nodes, depth) {
    nodes.forEach(n => { n._depth = depth; assignDepths(n._children, depth + 1); });
  }
  assignDepths(roots, 0);

  return roots;
}

// ── Flatten with visibility rules ─────────────────────────────────────────────
function flattenNodes(nodes, query, result = []) {
  for (const n of nodes) {
    if (query) {
      const selfMatch = matchesQuery(n, query);
      const childMatch = hasDescendant(n, query);
      if (!selfMatch && !childMatch) continue;
      result.push(n);
      if (n._children.length) flattenNodes(n._children, query, result);
    } else {
      result.push(n);
      if (n._expanded && n._children.length) flattenNodes(n._children, "", result);
    }
  }
  return result;
}

function matchesQuery(node, q) {
  return (
    node.account_name?.toLowerCase().includes(q) ||
    (node.account_number && String(node.account_number).toLowerCase().includes(q))
  );
}

function hasDescendant(node, q) {
  return node._children.some(c => matchesQuery(c, q) || hasDescendant(c, q));
}

// ── Computed ───────────────────────────────────────────────────────────────────
const summaryCards = computed(() =>
  ROOT_TYPES.map(rt => {
    const nodes = allAccounts.value.filter(a => a.root_type === rt);
    return {
      rootType:   rt,
      ...ROOT_META[rt],
      count:      nodes.length,
      hasOpening: nodes.some(a => a.opening_balance && Number(a.opening_balance) !== 0),
    };
  })
);

const visibleRows = computed(() => {
  const q = searchQ.value.trim().toLowerCase();
  let roots = treeRoots.value;
  if (activeRoot.value) {
    roots = roots.filter(r => r.root_type === activeRoot.value || r.account_type === activeRoot.value);
  }
  return flattenNodes(roots, q);
});

const groupAccounts = computed(() => allAccounts.value.filter(a => a.is_group));

// ── Helpers ───────────────────────────────────────────────────────────────────
function dotKey(row) {
  const rt = (row.root_type || row.account_type || "").toLowerCase();
  if (rt === "asset" || rt === "receivable" || rt === "fixed asset") return "asset";
  if (rt === "liability" || rt === "payable")                          return "liability";
  if (rt === "equity")                                                  return "equity";
  if (rt === "income" || rt === "income account")                       return "income";
  if (rt === "expense" || rt === "expense account")                     return "expense";
  if (rt === "bank")                                                    return "bank";
  if (rt === "cash")                                                    return "cash";
  return "muted";
}

function typeBadge(t) {
  return TYPE_BADGE[t] || "coa-badge--muted";
}

// ── Tree controls ─────────────────────────────────────────────────────────────
function toggleNode(node) {
  node._expanded = !node._expanded;
}

function setAllExpanded(nodes, val) {
  nodes.forEach(n => { n._expanded = val; setAllExpanded(n._children, val); });
}

function doExpandAll()   { setAllExpanded(treeRoots.value, true);  }
function doCollapseAll() { setAllExpanded(treeRoots.value, false); }

function filterByRoot(rt) {
  activeRoot.value = activeRoot.value === rt ? "" : rt;
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function openAddModal() {
  form.value  = emptyForm();
  modal.value = { open: true, editing: false };
}

function openEditModal(row) {
  form.value = {
    name:            row.name,
    account_name:    row.account_name    || "",
    account_number:  row.account_number  || "",
    root_type:       row.root_type       || "",
    account_type:    row.account_type    || "",
    parent_account:  row.parent_account  || "",
    is_group:        !!row.is_group,
    opening_balance: row.opening_balance ?? null,
    balance_must_be: row.balance_must_be || "Debit",
  };
  modal.value = { open: true, editing: true };
}

function closeModal() {
  modal.value.open = false;
}

async function submitForm() {
  saving.value = true;
  try {
    await frappe.call({
      method: "psd_books.api.books_data.save_account",
      args: {
        op:              modal.value.editing ? "update" : "create",
        name:            form.value.name,
        account_name:    form.value.account_name,
        account_number:  form.value.account_number,
        root_type:       form.value.root_type,
        account_type:    form.value.account_type,
        parent_account:  form.value.parent_account,
        is_group:        form.value.is_group ? 1 : 0,
        opening_balance: form.value.opening_balance,
        balance_must_be: form.value.balance_must_be,
      },
    });
    closeModal();
    await load();
  } catch (e) {
    frappe.msgprint({
      title:     "Error",
      indicator: "red",
      message:   (e && (e.message || e.exc)) || "Could not save account.",
    });
  } finally {
    saving.value = false;
  }
}

onMounted(load);
</script>

<style scoped>
/* ── Page shell ── */
.coa-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  min-height: 100%;
  background: #f4f6f9;
  font-family: 'DM Sans', 'Outfit', system-ui, sans-serif;
}

/* ── Summary cards ── */
.coa-summary-row {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.coa-summary-card {
  flex: 1;
  min-width: 150px;
  background: #fff;
  border: 1px solid #e8eaed;
  border-radius: 10px;
  padding: 16px 18px;
  border-left: 4px solid #e8eaed;
  cursor: pointer;
  transition: transform .14s, box-shadow .14s, border-left-color .14s;
  user-select: none;
}
.coa-summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,.08);
}
.coa-summary-card.coa-card--active {
  box-shadow: 0 0 0 2px currentColor;
}

.coa-card--asset     { border-left-color: #2563eb; }
.coa-card--liability { border-left-color: #dc2626; }
.coa-card--equity    { border-left-color: #7c3aed; }
.coa-card--income    { border-left-color: #16a34a; }
.coa-card--expense   { border-left-color: #d97706; }

.coa-card-header {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.coa-card--asset .coa-card-header     { color: #2563eb; }
.coa-card--liability .coa-card-header { color: #dc2626; }
.coa-card--equity .coa-card-header    { color: #7c3aed; }
.coa-card--income .coa-card-header    { color: #16a34a; }
.coa-card--expense .coa-card-header   { color: #d97706; }

.coa-card-count {
  font-size: 30px;
  font-weight: 700;
  color: #111827;
  line-height: 1;
  margin-bottom: 5px;
}
.coa-card-meta {
  font-size: 11.5px;
  color: #9ca3af;
}

/* ── Toolbar ── */
.coa-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  background: #fff;
  border: 1px solid #e8eaed;
  border-radius: 10px;
  padding: 10px 14px;
}

.coa-search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.coa-search-icon {
  position: absolute;
  left: 10px;
  color: #9ca3af;
  pointer-events: none;
}
.coa-search-input {
  padding: 7px 12px 7px 32px;
  border: 1px solid #e8eaed;
  border-radius: 8px;
  font-size: 13px;
  color: #374151;
  background: #f9fafb;
  outline: none;
  width: 260px;
  transition: border-color .14s, width .2s;
  font-family: inherit;
}
.coa-search-input:focus { border-color: #2563eb; background: #fff; width: 310px; }
.coa-search-input::placeholder { color: #9ca3af; }

.coa-toolbar-btns {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* Shared button base */
.coa-ghost-btn,
.coa-primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 13px;
  border-radius: 7px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: background .14s, transform .1s;
  white-space: nowrap;
}
.coa-ghost-btn {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
}
.coa-ghost-btn:hover { background: #e5e7eb; }

.coa-primary-btn {
  background: #2563eb;
  color: #fff;
}
.coa-primary-btn:hover { background: #1d4ed8; transform: translateY(-1px); }
.coa-primary-btn:disabled { opacity: .6; cursor: not-allowed; transform: none; }

/* ── Table ── */
.coa-table-wrap {
  background: #fff;
  border: 1px solid #e8eaed;
  border-radius: 10px;
  overflow: hidden;
}

.coa-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.coa-table thead th {
  background: #f9fafb;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: #6b7280;
  padding: 11px 14px;
  border-bottom: 1px solid #e8eaed;
  text-align: left;
}
.coa-table td {
  padding: 9px 14px;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
  vertical-align: middle;
}
.coa-table tbody tr:last-child td { border-bottom: none; }

.col-name    { width: 35%; }
.col-type    { width: 16%; }
.col-no      { width: 11%; }
.col-opening { width: 14%; }
.col-balance { width: 12%; }
.col-actions { width: 12%; }

/* Row states */
.coa-row--group > td { background: #fafafa; }
.coa-row--group:hover > td { background: #f3f4f6; }
.coa-row:not(.coa-row--group):hover > td { background: #eff6ff; }

.shimmer-row td { padding: 10px 14px; }
.loading-shimmer {
  height: 13px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 6px;
}
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

/* ── Name cell ── */
.coa-name-cell {
  display: flex;
  align-items: center;
  gap: 7px;
}

.coa-toggle-btn {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b7280;
  flex-shrink: 0;
  transition: background .12s, color .12s;
  padding: 0;
}
.coa-toggle-btn:hover { background: #e5e7eb; color: #111827; }
.coa-toggle-spacer { width: 20px; flex-shrink: 0; }

.coa-type-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot--asset     { background: #2563eb; }
.dot--liability { background: #dc2626; }
.dot--equity    { background: #7c3aed; }
.dot--income    { background: #16a34a; }
.dot--expense   { background: #d97706; }
.dot--bank      { background: #0891b2; }
.dot--cash      { background: #059669; }
.dot--muted     { background: #d1d5db; }

.coa-acct-name { font-size: 13px; color: #1f2937; }
.coa-acct-name--group { font-weight: 700; color: #111827; }

/* ── Type badges ── */
.coa-type-cell { display: flex; gap: 4px; flex-wrap: wrap; align-items: center; }

.coa-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}
.coa-badge--asset     { background: #dbeafe; color: #1d4ed8; }
.coa-badge--liability { background: #fee2e2; color: #b91c1c; }
.coa-badge--equity    { background: #ede9fe; color: #6d28d9; }
.coa-badge--income    { background: #dcfce7; color: #15803d; }
.coa-badge--expense   { background: #fef3c7; color: #92400e; }
.coa-badge--bank      { background: #e0f2fe; color: #0369a1; }
.coa-badge--muted     { background: #f3f4f6; color: #6b7280; }
.coa-badge--debit     { background: #dbeafe; color: #1d4ed8; }
.coa-badge--credit    { background: #fef3c7; color: #92400e; }

/* ── Actions ── */
.coa-actions-cell { text-align: center; }

.coa-icon-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all .12s;
  padding: 0;
}
.coa-icon-btn:hover { background: #f3f4f6; color: #374151; border-color: #d1d5db; }

/* ── Misc ── */
.coa-mono  { font-size: 12px; color: #6b7280; }
.coa-muted { color: #9ca3af; }
.coa-empty { text-align: center; color: #9ca3af; padding: 48px !important; font-size: 14px; }

/* ── Modal overlay ── */
.coa-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.coa-modal {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 560px;
  box-shadow: 0 20px 60px rgba(0,0,0,.22);
  display: flex;
  flex-direction: column;
  max-height: 92vh;
  overflow: hidden;
}

.coa-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f3f4f6;
}
.coa-modal-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}
.coa-modal-close {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  padding: 0;
}
.coa-modal-close:hover { background: #f3f4f6; }

.coa-modal-body {
  padding: 20px 24px 8px;
  overflow-y: auto;
  flex: 1;
}

/* ── Form grid ── */
.coa-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.coa-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.coa-field--full  { grid-column: 1 / -1; }
.coa-field--check { grid-column: 1 / -1; }

.coa-label { font-size: 12px; font-weight: 600; color: #374151; }
.coa-req   { color: #dc2626; }
.coa-hint  { font-weight: 400; color: #9ca3af; font-size: 11px; }

.coa-input,
.coa-select {
  padding: 8px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 7px;
  font-size: 13px;
  color: #111827;
  background: #fafafa;
  outline: none;
  font-family: inherit;
  transition: border-color .14s, background .14s;
}
.coa-input:focus, .coa-select:focus { border-color: #2563eb; background: #fff; }

.coa-checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
}
.coa-checkbox-label input[type="checkbox"] {
  width: 15px;
  height: 15px;
  accent-color: #2563eb;
  cursor: pointer;
}

.coa-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 24px 20px;
  border-top: 1px solid #f3f4f6;
  margin-top: 12px;
}
</style>
