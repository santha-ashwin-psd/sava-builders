<template>
  <div class="qc-page">

    <!-- ── KPI cards ── -->
    <div class="qc-kpis">
      <button type="button" class="qc-kpi k-total" :class="{ active: filterStatus === 'all' }" @click="filterStatus = 'all'">
        <span class="qc-kpi-ico">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>
        </span>
        <span class="qc-kpi-txt"><span class="qc-kpi-lbl">Total</span><span class="qc-kpi-val">{{ stats.total }}</span></span>
      </button>
      <button type="button" class="qc-kpi k-pass" :class="{ active: filterStatus === 'Pass' }" @click="filterStatus = 'Pass'">
        <span class="qc-kpi-ico">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </span>
        <span class="qc-kpi-txt"><span class="qc-kpi-lbl">Passed</span><span class="qc-kpi-val">{{ stats.passed }}</span></span>
      </button>
      <button type="button" class="qc-kpi k-fail" :class="{ active: filterStatus === 'Fail' }" @click="filterStatus = 'Fail'">
        <span class="qc-kpi-ico">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </span>
        <span class="qc-kpi-txt"><span class="qc-kpi-lbl">Failed</span><span class="qc-kpi-val">{{ stats.failed }}</span></span>
      </button>
      <button type="button" class="qc-kpi k-pend" :class="{ active: filterStatus === 'Pending' }" @click="filterStatus = 'Pending'">
        <span class="qc-kpi-ico">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </span>
        <span class="qc-kpi-txt"><span class="qc-kpi-lbl">Pending</span><span class="qc-kpi-val">{{ stats.pending }}</span></span>
      </button>
      <div class="qc-kpi k-rate static">
        <span class="qc-kpi-ico">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        </span>
        <span class="qc-kpi-txt"><span class="qc-kpi-lbl">Pass Rate</span><span class="qc-kpi-val">{{ passRate }}%</span></span>
      </div>
    </div>

    <!-- ── Filter panel ── -->
    <div class="qc-panel">
      <div class="qc-tabs-row">
        <div class="qc-tabs" role="tablist">
          <button v-for="t in typeTabs" :key="t.key" type="button" role="tab" class="qc-tab"
            :class="{ active: activeType === t.key }" :aria-selected="activeType === t.key" @click="activeType = t.key">
            <span v-if="t.key !== 'all'" class="qc-tab-dot" :style="'background:' + t.color"></span>
            {{ t.label }}
            <span class="qc-tab-cnt">{{ t.cnt }}</span>
          </button>
        </div>
        <button type="button" class="qc-btn-new" :disabled="!$canCreate('inventory')"
          :title="!$canCreate('inventory') ? 'Read-only access' : ''" @click="openNew">
          <span v-html="icon('plus',16)"></span> New Inspection
        </button>
      </div>

      <div class="qc-filters">
        <label class="qc-search">
          <span v-html="icon('search',16)" class="qc-search-ico"></span>
          <input v-model="search" placeholder="Search inspection #, item, reference…" class="qc-search-input" aria-label="Search inspections" />
        </label>

        <div class="qc-dates">
          <input type="date" v-model="dateFrom" class="qc-ctl qc-date" aria-label="From date" />
          <span class="qc-to">to</span>
          <input type="date" v-model="dateTo" class="qc-ctl qc-date" aria-label="To date" />
        </div>

        <button type="button" class="qc-btn qc-btn-icon" @click="load" :disabled="loading" title="Refresh" aria-label="Refresh">
          <span v-html="icon('refresh',16)"></span>
        </button>
        <button type="button" class="qc-btn" @click="exportCSV" :disabled="!sorted.length">
          <span v-html="icon('download',16)"></span> Export CSV<template v-if="selected.length"> ({{ selected.length }})</template>
        </button>
      </div>
    </div>

    <!-- ── Desktop table ── -->
    <div class="qc-tcard qc-table-wrap">
      <div class="qc-scroll">
        <table class="qc-table">
          <thead><tr>
            <th class="qc-th-chk"><input type="checkbox" class="qc-chk" :checked="allOnPageSelected" :disabled="!paginated.length" @change="toggleAll" aria-label="Select all on this page" /></th>
            <th @click="sort('name')" class="sortable">Inspection # <span class="qc-sort" v-html="sortArrow('name')"></span></th>
            <th @click="sort('inspection_type')" class="sortable">Type <span class="qc-sort" v-html="sortArrow('inspection_type')"></span></th>
            <th @click="sort('reference_name')" class="sortable">Reference <span class="qc-sort" v-html="sortArrow('reference_name')"></span></th>
            <th @click="sort('item')" class="sortable">Item <span class="qc-sort" v-html="sortArrow('item')"></span></th>
            <th @click="sort('inspection_date')" class="sortable">Date <span class="qc-sort" v-html="sortArrow('inspection_date')"></span></th>
            <th @click="sort('inspected_by')" class="sortable">Inspected By <span class="qc-sort" v-html="sortArrow('inspected_by')"></span></th>
            <th>Readings</th>
            <th @click="sort('status')" class="sortable">Status <span class="qc-sort" v-html="sortArrow('status')"></span></th>
            <th class="qc-th-actions">Actions</th>
          </tr></thead>
          <tbody>
            <template v-if="loading">
              <tr v-for="n in 6" :key="n"><td colspan="10" class="qc-skel-cell"><div class="qc-shimmer"></div></td></tr>
            </template>
            <template v-else>
              <tr v-for="r in paginated" :key="r.name" class="qc-row" :class="{ picked: selected.includes(r.name) }" @click="openView(r)">
                <td class="qc-td-chk" @click.stop><input type="checkbox" class="qc-chk" :checked="selected.includes(r.name)" @change="toggleRow(r.name)" :aria-label="'Select ' + r.name" /></td>
                <td><span class="qc-num">{{ r.name }}</span></td>
                <td><span class="qc-type-badge" :style="typeStyle(r.inspection_type)">{{ r.inspection_type }}</span></td>
                <td>
                  <div class="qc-two"><span class="qc-sub">{{ r.reference_type }}</span><span class="qc-ref">{{ r.reference_name || '—' }}</span></div>
                </td>
                <td>
                  <div class="qc-two"><span class="qc-strong">{{ r.item }}</span><span v-if="r.item_name && r.item_name !== r.item" class="qc-sub">{{ r.item_name }}</span></div>
                </td>
                <td class="qc-muted">{{ fmtDate(r.inspection_date) }}</td>
                <td class="qc-muted">{{ shortUser(r.inspected_by) }}</td>
                <td>
                  <span v-if="r.total_readings" class="qc-readings">
                    <b class="ok">{{ r.accepted_readings }}</b><i>/</i><b class="bad">{{ r.rejected_readings }}</b><span class="of"> of {{ r.total_readings }}</span>
                  </span>
                  <span v-else class="qc-muted">—</span>
                </td>
                <td><span class="qc-status-badge" :class="statusClass(r)">{{ r.status }}</span></td>
                <td class="qc-td-actions" @click.stop>
                  <button type="button" class="qc-act" :disabled="!$canEdit('inventory')" :title="!$canEdit('inventory') ? 'Read-only access' : 'Edit'" aria-label="Edit inspection" @click="openEdit(r)">
                    <span v-html="icon('edit',16)"></span>
                  </button>
                  <button type="button" class="qc-act" title="View" aria-label="View inspection" @click="openView(r)">
                    <span v-html="icon('eye',16)"></span>
                  </button>
                </td>
              </tr>
              <tr v-if="!sorted.length">
                <td colspan="10" class="qc-empty">
                  <div class="qc-empty-art" aria-hidden="true">
                    <svg width="150" height="120" viewBox="0 0 150 120" fill="none">
                      <circle cx="75" cy="60" r="50" fill="#e8f0fe"/>
                      <path d="M24 70h9M20 62h6M124 38h10M129 30h5" stroke="#8fb0f2" stroke-width="2" stroke-linecap="round"/>
                      <path d="M58 32h22l12 12v36a4 4 0 0 1-4 4H58a4 4 0 0 1-4-4V36a4 4 0 0 1 4-4z" fill="#fff" stroke="#2f6df0" stroke-width="3" stroke-linejoin="round"/>
                      <path d="M80 32v12h12" stroke="#2f6df0" stroke-width="3" stroke-linejoin="round"/>
                      <path d="M62 50h10M62 58h8" stroke="#8fb0f2" stroke-width="3" stroke-linecap="round"/>
                      <circle cx="82" cy="70" r="11" fill="#fff" stroke="#2f6df0" stroke-width="3.5"/>
                      <path d="M90 78l9 9" stroke="#2f6df0" stroke-width="4.5" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <template v-if="list.length">
                    <div class="qc-empty-title">No inspections match your filters</div>
                    <div class="qc-empty-sub">Try a different search, status or date range.</div>
                  </template>
                  <template v-else>
                    <div class="qc-empty-title">No QC Inspections found</div>
                    <div class="qc-empty-sub">Create an inspection from a Purchase Receipt, Invoice, or Delivery Note</div>
                  </template>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div v-if="!loading && sorted.length" class="qc-foot">
        <Pagination v-model:page="page" v-model:page-size="pageSize" :total-items="sorted.length" />
      </div>
    </div>

    <!-- ── Mobile Card List (≤480px) ── -->
    <div class="qc-mobile-list">
      <template v-if="loading">
        <div v-for="n in 5" :key="n" class="qc-mobile-shimmer"></div>
      </template>
      <div v-else-if="!sorted.length" class="qc-mobile-empty">
        <div class="qc-empty-title">No QC Inspections found</div>
        <div class="qc-empty-sub">Create an inspection from a Purchase Receipt, Invoice, or Delivery Note</div>
      </div>
      <div v-else v-for="r in paginated" :key="r.name" class="qc-mob-card" :style="'border-left-color:' + typeAccent(r.inspection_type)" @click="openView(r)">
        <div class="qc-mob-top">
          <span class="qc-num">{{ r.name }}</span>
          <span class="qc-status-badge" :class="statusClass(r)">{{ r.status }}</span>
        </div>
        <div class="qc-mob-row2">
          <span class="qc-type-badge" :style="typeStyle(r.inspection_type)">{{ r.inspection_type }}</span>
          <span class="qc-mob-date">{{ fmtDate(r.inspection_date) }}</span>
        </div>
        <div class="qc-mob-item">
          <span class="qc-mob-lbl">Item</span>
          <span class="qc-mob-val">{{ r.item }}<span v-if="r.item_name && r.item_name !== r.item" class="qc-mob-sub"> · {{ r.item_name }}</span></span>
        </div>
        <div class="qc-mob-item">
          <span class="qc-mob-lbl">Reference</span>
          <span class="qc-mob-val" style="color:#1a6ef7">{{ r.reference_name || '—' }}<span class="qc-mob-sub"> ({{ r.reference_type }})</span></span>
        </div>
        <div class="qc-mob-footer">
          <span v-if="r.total_readings" class="qc-readings">
            <b class="ok">{{ r.accepted_readings }}</b><i>/</i><b class="bad">{{ r.rejected_readings }}</b><span class="of"> of {{ r.total_readings }}</span>
          </span>
          <span v-else class="qc-muted">No readings</span>
          <span class="qc-mob-inspector">{{ shortUser(r.inspected_by) }}</span>
        </div>
      </div>
      <div v-if="!loading && sorted.length" class="qc-foot qc-foot-mobile">
        <Pagination v-model:page="page" v-model:page-size="pageSize" :total-items="sorted.length" />
      </div>
    </div>

    <!-- ── Create Drawer ── -->
    <div v-if="drawerOpen" class="qc-overlay" @click.self="drawerOpen=false"></div>
    <div class="qc-drawer qc-pro" :class="{open:drawerOpen}" role="dialog" aria-modal="true" aria-label="New QC Inspection">
      <div class="qc-pro-head">
        <span class="qc-pro-head-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg></span>
        <div class="qc-pro-head-txt">
          <div class="qc-pro-title">New QC Inspection</div>
          <div class="qc-pro-sub">Record quality check for an item</div>
        </div>
        <button type="button" class="qc-pro-close" aria-label="Close" @click="drawerOpen=false"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>

      <div class="qc-pro-body">
        <div class="qc-pro-grid">
          <div class="qc-pro-field">
            <label class="qc-pro-label" for="qci-type"><span class="qc-pro-lico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>Inspection Type <span class="req">*</span></label>
            <div class="qc-pro-ctl">
              <input id="qci-type" value="Incoming — Purchasing goods" class="qc-pro-input qc-pro-readonly" readonly tabindex="-1" aria-readonly="true" />
              <span class="qc-pro-chev"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
            </div>
          </div>

          <div class="qc-pro-field">
            <label class="qc-pro-label" for="qci-reftype"><span class="qc-pro-lico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>Reference Doc Type <span class="req">*</span></label>
            <div class="qc-pro-ctl">
              <input id="qci-reftype" :value="form.reference_type" class="qc-pro-input qc-pro-readonly" readonly tabindex="-1" aria-readonly="true" />
              <span class="qc-pro-chev"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
            </div>
          </div>

          <div class="qc-pro-field">
            <label class="qc-pro-label"><span class="qc-pro-lico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>Reference Document <span class="req">*</span></label>
            <div class="qc-pro-ctl qc-pro-ss">
              <SearchableSelect
                v-model="form.reference_name"
                :options="refDocs"
                :placeholder="form.reference_type ? (refDocsLoading ? 'Loading…' : 'Search ' + form.reference_type + '…') : 'Select a Doc Type first…'"
                :disabled="!form.reference_type"
                value-key="value"
                label-key="label"
              />
              <span class="qc-pro-chev"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></span>
            </div>
          </div>

          <div class="qc-pro-field">
            <label class="qc-pro-label"><span class="qc-pro-lico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></span>Item <span class="req">*</span></label>
            <div class="qc-pro-ctl qc-pro-ss">
              <SearchableSelect
                v-model="form.item"
                :options="items"
                :placeholder="!form.reference_name ? 'Select a Reference Document first…' : (itemsLoading ? 'Loading…' : 'Search item code…')"
                :disabled="!form.reference_name"
                value-key="value"
                label-key="label"
              />
              <span class="qc-pro-chev"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></span>
            </div>
          </div>

          <div class="qc-pro-field">
            <label class="qc-pro-label" for="qci-sample"><span class="qc-pro-lico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg></span>Sample Size</label>
            <div class="qc-pro-ctl">
              <input id="qci-sample" v-model.number="form.sample_size" type="number" min="0" step="0.001" class="qc-pro-input" />
            </div>
          </div>

          <div class="qc-pro-field">
            <label class="qc-pro-label" for="qci-date"><span class="qc-pro-lico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>Inspection Date <span class="req">*</span></label>
            <div class="qc-pro-ctl">
              <input id="qci-date" v-model="form.inspection_date" type="date" class="qc-pro-input" />
            </div>
          </div>

          <div class="qc-pro-field qc-full">
            <label class="qc-pro-label" for="qci-remarks"><span class="qc-pro-lico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>Remarks</label>
            <textarea id="qci-remarks" v-model="form.remarks" rows="3" class="qc-pro-textarea" placeholder="Optional observations…"></textarea>
          </div>
        </div>
      </div>

      <div class="qc-pro-foot">
        <button type="button" class="qc-pro-btn-ghost" @click="drawerOpen=false">Cancel</button>
        <button type="button" class="qc-pro-btn-primary" :disabled="drawerSaving || !$canCreate('inventory')" @click="saveInspection">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>{{ drawerSaving ? 'Creating…' : 'Create Inspection' }}
        </button>
      </div>
    </div>

    <!-- ── View Drawer ── -->
    <div v-if="viewOpen" class="qc-overlay" @click.self="viewOpen=false"></div>
    <div class="qc-drawer qc-view-drawer" :class="{open:viewOpen}">
      <template v-if="viewDoc">
        <div class="qc-dheader" :style="'background:'+typeGrad(viewDoc.inspection_type)">
          <button class="qc-dclose" style="color:#fff;background:rgba(255,255,255,.15)" @click="viewOpen=false"><span v-html="icon('x',16)"></span></button>
          <div class="qc-dh-top">
            <div class="qc-dh-ico" style="background:rgba(255,255,255,.2)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>
            </div>
            <div>
              <div class="qc-dh-title" style="color:#fff">{{ viewDoc.name }}</div>
              <div class="qc-dh-sub" style="color:rgba(255,255,255,.8)">{{ viewDoc.inspection_type }} · {{ fmtDate(viewDoc.inspection_date) }}</div>
            </div>
            <span class="qc-status-badge" :class="statusClass(viewDoc)" style="margin-left:auto;flex-shrink:0">{{ viewDoc.status }}</span>
          </div>
        </div>
        <div class="qc-dbody">

          <!-- Summary bar -->
          <div class="qc-summary-bar">
            <div class="qc-sumbar-item">
              <span class="qc-sumbar-lbl">Reference</span>
              <span class="qc-sumbar-val" style="color:#2563eb">{{ viewDoc.reference_type }} / <DocLink :doctype="viewDoc.reference_type" :name="viewDoc.reference_name" :mono-style="false" style="color:#2563eb" /></span>
            </div>
            <div class="qc-sumbar-item" v-if="viewDoc.work_order">
              <span class="qc-sumbar-lbl">Work Order</span>
              <span class="qc-sumbar-val"><DocLink doctype="Work Order" :name="viewDoc.work_order" :mono-style="false" style="color:#2563eb" /></span>
            </div>
            <div class="qc-sumbar-item">
              <span class="qc-sumbar-lbl">Item</span>
              <span class="qc-sumbar-val">{{ viewDoc.item }}</span>
            </div>
            <div class="qc-sumbar-item">
              <span class="qc-sumbar-lbl">Inspected By</span>
              <span class="qc-sumbar-val">{{ shortUser(viewDoc.inspected_by) }}</span>
            </div>
            <div class="qc-sumbar-item">
              <span class="qc-sumbar-lbl">Sample Size</span>
              <span class="qc-sumbar-val">{{ viewDoc.sample_size || '—' }}</span>
            </div>
          </div>

          <!-- Pass/Fail progress -->
          <div v-if="viewDoc.total_readings" class="qc-progress-section">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px">
              <span style="font-size:12px;font-weight:600;color:#374151">Reading Results</span>
              <span style="font-size:12px;color:#6b7280">{{ viewDoc.accepted_readings }}/{{ viewDoc.total_readings }} Accepted</span>
            </div>
            <div class="qc-progress-bar">
              <div class="qc-progress-fill" :style="'width:'+Math.round((viewDoc.accepted_readings/viewDoc.total_readings)*100)+'%;background:'+(viewDoc.status==='Pass'?'#16a34a':'#dc2626')"></div>
            </div>
          </div>

          <!-- Readings table -->
          <div class="qc-view-section" v-if="viewLoading">
            <div v-for="n in 4" :key="n" class="qc-shimmer" style="height:36px;margin-bottom:6px;border-radius:6px"></div>
          </div>
          <div class="qc-view-section" v-else-if="(viewDoc.readings||[]).length">
            <div class="qc-view-sec-lbl">Readings ({{ viewDoc.readings.length }})</div>
            <table class="qc-readings-tbl">
              <thead><tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Expected</th>
                <th>Reading Value</th>
                <th>Result</th>
              </tr></thead>
              <tbody>
                <tr v-for="rd in viewDoc.readings" :key="rd.name||rd.idx" :class="'qc-reading-row-'+(rd.status||'Pending').toLowerCase()">
                  <td style="font-weight:600;font-size:12.5px">{{ rd.template_parameter }}</td>
                  <td><span class="qc-type-mini" :style="paramTypeStyle(rd.parameter_type)">{{ rd.parameter_type }}</span></td>
                  <td style="font-size:12px;color:#6b7280">
                    <template v-if="rd.parameter_type==='Numeric'">{{ rd.min_value }} – {{ rd.max_value }}</template>
                    <template v-else-if="rd.parameter_type==='Non-Numeric'">{{ rd.acceptance_criteria_value }}</template>
                    <template v-else>Formula</template>
                  </td>
                  <td>
                    <input v-if="viewDoc.docstatus===0" v-model="rd.reading_value" class="qc-rd-input" :placeholder="'Enter value…'" @change="markDirty" />
                    <span v-else style="font-size:12.5px;font-weight:600">{{ rd.reading_value || '—' }}</span>
                  </td>
                  <td>
                    <span class="qc-rd-badge" :class="'qc-rd-'+(rd.status||'Pending').toLowerCase()">{{ rd.status || 'Pending' }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="viewDoc.docstatus===0 && isDirty" style="margin-top:8px;display:flex;justify-content:flex-end">
              <button class="qc-btn-save" :disabled="saving || !$canEdit('inventory')" @click="saveReadings">
                <span v-html="icon('save',13)"></span>{{ saving?'Saving…':'Save Readings' }}
              </button>
            </div>
          </div>
          <div v-else class="qc-view-section">
            <div class="qc-view-sec-lbl">Readings</div>
            <div style="padding:16px;text-align:center;color:#9ca3af;font-size:13px">No readings recorded yet</div>
          </div>

          <!-- Accept/Reject Qty split -->
          <div class="qc-view-section" v-if="viewDoc.inspected_qty">
            <div class="qc-view-sec-lbl">Accepted / Rejected Qty</div>
            <div v-if="viewDoc.docstatus===0">
              <div class="qc-qty-grid">
                <div class="qc-qty-card qc-qty-card--fixed">
                  <label class="qc-qty-lbl">Inspected Qty</label>
                  <div class="qc-qty-fixed-val">{{ viewDoc.inspected_qty }}</div>
                </div>
                <div class="qc-qty-card">
                  <label class="qc-qty-lbl" for="qc-accepted-qty">Accepted Qty</label>
                  <input id="qc-accepted-qty" type="number" min="0" step="0.001" class="qc-input qc-qty-input"
                         v-model.number="viewDoc.accepted_qty"
                         @change="onAcceptedQtyChange" />
                </div>
                <div class="qc-qty-card">
                  <label class="qc-qty-lbl" for="qc-rejected-qty">Rejected Qty</label>
                  <input id="qc-rejected-qty" type="number" min="0" step="0.001" class="qc-input qc-qty-input"
                         v-model.number="viewDoc.rejected_qty"
                         @change="onRejectedQtyChange" />
                </div>
              </div>
              <div v-if="Number(viewDoc.accepted_qty||0)+Number(viewDoc.rejected_qty||0) !== Number(viewDoc.inspected_qty||0)"
                   class="qc-qty-warn">
                <span v-html="icon('alert-triangle',13)"></span>
                Accepted + Rejected must sum to {{ viewDoc.inspected_qty }}
              </div>
            </div>
            <div v-else style="display:flex;gap:16px;flex-wrap:wrap">
              <div><span class="qc-meta-lbl">Inspected</span><div style="font-size:12.5px;margin-top:2px">{{ viewDoc.inspected_qty }}</div></div>
              <div><span class="qc-meta-lbl">Accepted</span><div style="font-size:12.5px;margin-top:2px;color:#16a34a;font-weight:600">{{ viewDoc.accepted_qty || 0 }}</div></div>
              <div><span class="qc-meta-lbl">Rejected</span><div style="font-size:12.5px;margin-top:2px;color:#dc2626;font-weight:600">{{ viewDoc.rejected_qty || 0 }}</div></div>
            </div>
          </div>


          <!-- Remarks -->
          <div class="qc-view-section" v-if="viewDoc.remarks">
            <div class="qc-view-sec-lbl">Remarks</div>
            <div style="font-size:13px;color:#374151;background:#f8fafc;border-radius:6px;padding:10px 12px;border:1px solid #e2e8f0">{{ viewDoc.remarks }}</div>
          </div>

          <!-- Meta -->
          <div class="qc-view-section">
            <div style="display:flex;gap:16px;flex-wrap:wrap">
              <div v-if="viewDoc.inspected_by"><span class="qc-meta-lbl">Inspected By</span><div style="font-size:12.5px;margin-top:2px">{{ viewDoc.inspected_by }}</div></div>
              <div v-if="viewDoc.verified_by"><span class="qc-meta-lbl">Verified By</span><div style="font-size:12.5px;margin-top:2px">{{ viewDoc.verified_by }}</div></div>
              <div v-if="viewDoc.qc_inspection_template"><span class="qc-meta-lbl">Template</span><div style="font-size:12.5px;margin-top:2px">{{ viewDoc.qc_inspection_template }}</div></div>
              <div v-if="viewDoc.creation"><span class="qc-meta-lbl">Created</span><div style="font-size:12.5px;margin-top:2px">{{ fmtDate(viewDoc.creation?.slice(0,10)) }}</div></div>
              <div v-if="viewDoc.owner"><span class="qc-meta-lbl">Created By</span><div style="font-size:12.5px;margin-top:2px">{{ ownerName(viewDoc.owner) }}</div></div>
              <div v-if="viewDoc.modified_by"><span class="qc-meta-lbl">Last Modified By</span><div style="font-size:12.5px;margin-top:2px">{{ ownerName(viewDoc.modified_by) }} on {{ fmtDate(viewDoc.modified?.slice(0,10)) }}</div></div>
            </div>
          </div>

        </div>
        <div class="qc-dfooter">
          <button class="qc-btn-ghost" @click="viewOpen=false">Close</button>
          <!-- Release from Quarantine: a Pass inspection whose stock was pre-emptively
               quarantined at receipt/manufacture but never auto-released (auto-release
               toggle off in Books Company settings). This is the only way that stock
               can ever leave quarantine -- release_from_hold() requires an Approved QC
               Approval Request, and those are never created for a Pass result. -->
          <button
            v-if="viewDoc.docstatus === 1 && viewDoc.status === 'Pass' && viewDoc.release_status === 'Not Released'"
            class="qc-btn-approval"
            :disabled="releaseSending || !$canEdit('inventory')"
            @click="releaseFromQuarantine(viewDoc.name)"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
            {{ releaseSending ? 'Releasing…' : 'Release from Quarantine' }}
          </button>
          <!-- Request Approval button: only for submitted inspections that failed QC -->
          <button
            v-if="viewDoc.docstatus === 1 && viewDoc.status === 'Fail'"
            class="qc-btn-approval"
            :disabled="approvalSending || !$canEdit('inventory')"
            @click="requestApproval(viewDoc.name)"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>
            {{ approvalSending ? 'Requesting…' : 'Request Approval' }}
          </button>
          <!-- Certificate of Analysis: available for any submitted inspection -->
          <button
            v-if="viewDoc.docstatus === 1"
            class="qc-btn-ghost"
            :disabled="coaSending"
            @click="printCOA(viewDoc.name)"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
            {{ coaSending ? 'Generating…' : 'Print / Download COA' }}
          </button>
          <button v-if="viewDoc.docstatus===0" class="qc-btn-edit" :disabled="!$canEdit('inventory')" :title="!$canEdit('inventory') ? 'Read-only access' : ''" @click="openEdit(viewDoc);viewOpen=false">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit
          </button>
          <button v-if="viewDoc.docstatus===0" class="qc-btn-save" :disabled="saving || !$canEdit('inventory')" @click="saveReadings">
            <span v-html="icon('save',13)"></span>{{ saving?'Saving…':'Save' }}
          </button>
          <button v-if="viewDoc.docstatus===0 && (viewDoc.readings||[]).length" class="qc-btn-primary" :disabled="saving || !$canEdit('inventory')" @click="submitInspection(viewDoc.name)">
            <span v-html="icon('check',13)"></span>{{ saving?'Submitting…':'Submit' }}
          </button>
        </div>
      </template>
    </div>

    <!-- ── Edit Drawer ── -->
    <div v-if="editOpen" class="qc-overlay" @click.self="editOpen=false"></div>
    <div class="qc-drawer" :class="{open:editOpen}">
      <div class="qc-dheader" style="background:linear-gradient(135deg,#1e3a5f,#2563eb)">
        <button class="qc-dclose" @click="editOpen=false"><span v-html="icon('x',16)"></span></button>
        <div class="qc-dh-top">
          <div class="qc-dh-ico">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
          <div>
            <div class="qc-dh-title">Edit QC Inspection</div>
            <div class="qc-dh-sub">{{ editForm._name }}</div>
          </div>
        </div>
      </div>
      <div class="qc-dbody">
        <div class="qc-fields-grid">
          <div class="qc-field">
            <label class="qc-label">Inspection Type <span class="req">*</span></label>
            <select v-model="editForm.inspection_type" class="qc-select-full">
              <option value="Incoming">Incoming — Purchasing goods</option>
              <option value="Outgoing">Outgoing — Dispatching goods</option>
              <option value="In Process">In Process — Manufacturing</option>
            </select>
          </div>
          <div class="qc-field">
            <label class="qc-label">Reference Doc Type <span class="req">*</span></label>
            <select v-model="editForm.reference_type" class="qc-select-full">
              <option value="">Select…</option>
              <option v-for="rt in REF_TYPE_MAP[editForm.inspection_type] || refTypes" :key="rt" :value="rt">{{ rt }}</option>
            </select>
          </div>
          <div class="qc-field">
            <label class="qc-label">Reference Document <span class="req">*</span></label>
            <SearchableSelect
              v-model="editForm.reference_name"
              :options="editRefDocs"
              :placeholder="editForm.reference_type ? (editRefLoading ? 'Loading…' : 'Search ' + editForm.reference_type + '…') : 'Select a Doc Type first…'"
              :disabled="!editForm.reference_type"
              value-key="value"
              label-key="label"
            />
          </div>
          <div class="qc-field">
            <label class="qc-label">Item <span class="req">*</span></label>
            <SearchableSelect
              v-model="editForm.item"
              :options="items"
              :placeholder="!editForm.reference_name ? 'Select a Reference Document first…' : (itemsLoading ? 'Loading…' : 'Search item code…')"
              :disabled="!editForm.reference_name"
              value-key="value"
              label-key="label"
            />
          </div>
          <div class="qc-field">
            <label class="qc-label">Sample Size</label>
            <input v-model.number="editForm.sample_size" type="number" min="0" step="0.001" class="qc-input" />
          </div>
          <div class="qc-field">
            <label class="qc-label">Inspection Date <span class="req">*</span></label>
            <input v-model="editForm.inspection_date" type="date" class="qc-input" />
          </div>
          <div class="qc-field" style="grid-column:1/-1">
            <label class="qc-label">Remarks</label>
            <textarea v-model="editForm.remarks" rows="2" class="qc-input" placeholder="Optional observations…"></textarea>
          </div>
          <div class="qc-field" style="grid-column:1/-1">
            <label class="qc-label">QC Template</label>
            <div style="display:flex;gap:8px;align-items:center">
              <select v-model="editForm.qc_inspection_template" class="qc-select-full" style="flex:1">
                <option value="">— No template —</option>
                <option v-for="t in editTemplates" :key="t.name" :value="t.name">
                  {{ t.template_name }} ({{ t.parameter_count }} param{{ t.parameter_count===1?'':'s' }})
                </option>
              </select>
              <button
                type="button"
                class="qc-btn-ghost"
                :disabled="applyingTemplate || !editForm.qc_inspection_template"
                @click="applyTemplate"
              >
                {{ applyingTemplate ? 'Applying…' : 'Apply Template' }}
              </button>
            </div>
            <div style="font-size:11px;color:#9ca3af;margin-top:4px">
              Applying a template rebuilds the Readings table from its parameters. Any previously entered reading values will be cleared. Only available on Draft inspections.
            </div>
          </div>
        </div>
      </div>
      <div class="qc-dfooter">
        <button class="qc-btn-ghost" @click="editOpen=false">Cancel</button>
        <button class="qc-btn-primary" :disabled="editSaving || !$canEdit('inventory')" @click="updateInspection">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          {{ editSaving ? 'Saving…' : 'Save Changes' }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { apiCall, apiList } from "../api/client.js";
import { useToast } from "../composables/useToast.js";
import { icon } from "../utils/icons.js";
import { fmtDate } from "../utils/format.js";
import { ownerName } from "../utils/userNames.js";
import SearchableSelect from "../components/SearchableSelect.vue";
import DocLink from "../components/DocLink.vue";
import Pagination from "../components/Pagination.vue";

const { toast } = useToast();
const route = useRoute();
const router = useRouter();

// ── State ─────────────────────────────────────────────────────────────────────
const list        = ref([]);
const loading     = ref(false);
const drawerOpen  = ref(false);
const drawerSaving = ref(false);
const editOpen    = ref(false);
const editSaving  = ref(false);
const editTemplates     = ref([]);
const editTemplateLoading = ref(false);
const applyingTemplate  = ref(false);
const viewOpen    = ref(false);
const viewDoc     = ref(null);
const viewLoading = ref(false);
const approvalSending = ref(false);
const releaseSending  = ref(false);
const coaSending  = ref(false);
const saving      = ref(false);
const isDirty     = ref(false);
const search      = ref("");
const filterStatus = ref("all");
const activeType  = ref("all");
const dateFrom    = ref("");
const dateTo      = ref("");
const page        = ref(1);
const pageSize    = ref(25);
const sortCol     = ref("inspection_date");
const sortDir     = ref("desc");

// Edit form
const editForm = reactive({
  _name:          "",
  inspection_type: "Incoming",
  reference_type:  "",
  reference_name:  "",
  item:            "",
  sample_size:     1,
  inspection_date: "",
  remarks:         "",
  qc_inspection_template: "",
});
const editRefDocs  = ref([]);
const editRefLoading = ref(false);
// Guards the reference_type watcher below from clearing reference_name while
// openEdit() is hydrating the form from an existing record (see openEdit()).
const suppressEditRefWatch = ref(false);

const refTypes = ["Purchase Receipt", "Purchase Invoice", "Delivery Note", "Sales Invoice", "Stock Entry"];

// ── Dropdown data ──────────────────────────────────────────────────
const refDocs       = ref([]);   // Reference Document options
const refDocsLoading = ref(false);
const items         = ref([]);   // Item options
const itemsLoading  = ref(false);

const form = reactive({
  inspection_type: "Incoming",
  reference_type: "Purchase Receipt",
  reference_name: "",
  item: "",
  sample_size: 1,
  inspection_date: new Date().toISOString().slice(0, 10),
  remarks: "",
});

// ── Reference Doc Type options driven by Inspection Type ───────────────────────
const REF_TYPE_MAP = {
  "Incoming":   ["Purchase Receipt", "Purchase Invoice"],
  "Outgoing":   ["Delivery Note", "Sales Invoice"],
  "In Process": ["Stock Entry"],
};

// Inspection is Incoming-only and always against a Purchase Receipt
watch(() => form.inspection_type, () => {
  form.reference_type  = "Purchase Receipt";
  form.reference_name  = "";
  refDocs.value        = [];
}, { immediate: true });

// Fetch reference docs whenever reference_type changes
watch(() => form.reference_type, (newType) => {
  form.reference_name = "";
  if (newType) fetchRefDocs("");
  else refDocs.value = [];
});

// Fetch items scoped to the chosen reference document whenever it changes
watch(() => form.reference_name, (newName) => {
  form.item = "";
  fetchItems(form.reference_type, newName);
});

// ── Type config ────────────────────────────────────────────────────────────────
const TYPE_META = {
  "Incoming":   { color: "#0891b2", grad: "linear-gradient(135deg,#0c4a6e,#0891b2)" },
  "Outgoing":   { color: "#ea580c", grad: "linear-gradient(135deg,#7c2d12,#ea580c)" },
  "In Process": { color: "#7c3aed", grad: "linear-gradient(135deg,#3b0764,#7c3aed)" },
};

function typeStyle(t) {
  const m = TYPE_META[t] || { color: "#6b7280" };
  return `background:${m.color}18;color:${m.color};border:1px solid ${m.color}33`;
}
function typeGrad(t) {
  return (TYPE_META[t] || { grad: "linear-gradient(135deg,#374151,#6b7280)" }).grad;
}
function typeAccent(t) {
  return (TYPE_META[t] || { color: "#6b7280" }).color;
}
function paramTypeStyle(pt) {
  if (pt === "Numeric")     return "background:#eff6ff;color:#2563eb";
  if (pt === "Non-Numeric") return "background:#f0fdf4;color:#16a34a";
  return "background:#faf5ff;color:#7c3aed";
}
function statusClass(r) {
  const s = r.status || "";
  if (s === "Pass")    return "qc-status-pass";
  if (s === "Fail")    return "qc-status-fail";
  return "qc-status-pending";
}
function shortUser(u) {
  if (!u) return "—";
  return u.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, c => c.toUpperCase()).slice(0, 18);
}

// ── Computed ───────────────────────────────────────────────────────────────────
const stats = computed(() => ({
  total:   list.value.length,
  passed:  list.value.filter(r => r.status === "Pass").length,
  failed:  list.value.filter(r => r.status === "Fail").length,
  pending: list.value.filter(r => r.status === "Pending" || r.docstatus === 0).length,
}));

const passRate = computed(() => {
  const t = stats.value.total;
  return t > 0 ? Math.round((stats.value.passed / t) * 100) : 0;
});

const typeTabs = computed(() => [
  { key: "all",        label: "All",        color: "#6b7280", cnt: list.value.length },
  { key: "Incoming",   label: "Incoming",   color: "#0891b2", cnt: list.value.filter(r => r.inspection_type === "Incoming").length },
  { key: "Outgoing",   label: "Outgoing",   color: "#ea580c", cnt: list.value.filter(r => r.inspection_type === "Outgoing").length },
  { key: "In Process", label: "In Process", color: "#7c3aed", cnt: list.value.filter(r => r.inspection_type === "In Process").length },
]);

const filtered = computed(() => {
  let r = list.value;
  if (activeType.value !== "all")       r = r.filter(x => x.inspection_type === activeType.value);
  if (filterStatus.value !== "all")     r = r.filter(x => x.status === filterStatus.value);
  if (dateFrom.value)                   r = r.filter(x => x.inspection_date >= dateFrom.value);
  if (dateTo.value)                     r = r.filter(x => x.inspection_date <= dateTo.value);
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    r = r.filter(x =>
      (x.name || "").toLowerCase().includes(q) ||
      (x.item || "").toLowerCase().includes(q) ||
      (x.item_name || "").toLowerCase().includes(q) ||
      (x.reference_name || "").toLowerCase().includes(q)
    );
  }
  return r;
});

const sorted = computed(() => {
  const col = sortCol.value;
  return [...filtered.value].sort((a, b) => {
    const av = a[col] ?? "", bv = b[col] ?? "";
    const c = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
    return sortDir.value === "asc" ? c : -c;
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(sorted.value.length / pageSize.value)));
const paginated  = computed(() => {
  const s = (page.value - 1) * pageSize.value;
  return sorted.value.slice(s, s + pageSize.value);
});

// Back to page 1 whenever the result set changes.
watch([search, activeType, filterStatus, dateFrom, dateTo, pageSize], () => { page.value = 1; });

// ── Row selection (Export CSV exports the selection when there is one) ─────────
const selected = ref([]);
const allOnPageSelected = computed(() =>
  paginated.value.length > 0 && paginated.value.every(r => selected.value.includes(r.name)));
function toggleAll(e) {
  const names = paginated.value.map(r => r.name);
  selected.value = e.target.checked
    ? [...new Set([...selected.value, ...names])]
    : selected.value.filter(n => !names.includes(n));
}
function toggleRow(name) {
  selected.value = selected.value.includes(name)
    ? selected.value.filter(n => n !== name)
    : [...selected.value, name];
}
const exportRows = computed(() =>
  selected.value.length ? sorted.value.filter(r => selected.value.includes(r.name)) : sorted.value);

function sort(col) {
  if (sortCol.value === col) sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  else { sortCol.value = col; sortDir.value = "asc"; }
}
function sortArrow(col) {
  if (sortCol.value !== col) return "⇕";
  return sortDir.value === "asc" ? "▲" : "▼";
}

// ── API helpers ────────────────────────────────────────────────────────────────
async function load() {
  loading.value = true;
  try {
    const res = await apiCall("psd_books.api.qc.list_inspections", {
      page_len: 200, page: 0,
    });
    list.value = res?.message?.inspections || res?.inspections || [];
  } catch (e) {
    toast.error(e.message || "Failed to load QC Inspections");
  } finally {
    loading.value = false;
  }

  // Deep-link support: /quality/inspections?open=QCI-0001 (used by the
  // Work Order QC panel to jump straight to a specific inspection).
  const openName = route.query.open;
  if (openName) {
    const row = list.value.find(r => r.name === openName);
    if (row) openView(row);
    else openView({ name: openName });
  }
}

async function openView(r) {
  viewDoc.value = { ...r };
  viewOpen.value = true;
  isDirty.value = false;
  viewLoading.value = true;
  try {
    const res = await apiCall("psd_books.api.qc.get_inspection_detail", { inspection_name: r.name });
    if (res?.message) viewDoc.value = res.message;
    else if (res) viewDoc.value = res;
  } catch { /* keep list row */ }
  viewLoading.value = false;
}

function markDirty() { isDirty.value = true; }

function onAcceptedQtyChange() {
  if (!viewDoc.value?.inspected_qty) return;
  const inspected = Number(viewDoc.value.inspected_qty) || 0;
  const accepted = Math.max(0, Math.min(inspected, Number(viewDoc.value.accepted_qty) || 0));
  viewDoc.value.accepted_qty = accepted;
  viewDoc.value.rejected_qty = +(inspected - accepted).toFixed(3);
  markDirty();
}

function onRejectedQtyChange() {
  if (!viewDoc.value?.inspected_qty) return;
  const inspected = Number(viewDoc.value.inspected_qty) || 0;
  const rejected = Math.max(0, Math.min(inspected, Number(viewDoc.value.rejected_qty) || 0));
  viewDoc.value.rejected_qty = rejected;
  viewDoc.value.accepted_qty = +(inspected - rejected).toFixed(3);
  markDirty();
}

async function saveReadings() {
  if (!viewDoc.value) return;
  saving.value = true;
  try {
    const readings = (viewDoc.value.readings || []).map((rd, i) => ({
      idx: rd.idx || (i + 1),
      reading_value: rd.reading_value || "",
      remarks: rd.remarks || "",
    }));
    const res = await apiCall("psd_books.api.qc.save_qc_readings", {
      inspection_name: viewDoc.value.name,
      readings_json: JSON.stringify(readings),
      accepted_qty: viewDoc.value.inspected_qty ? viewDoc.value.accepted_qty : undefined,
      rejected_qty: viewDoc.value.inspected_qty ? viewDoc.value.rejected_qty : undefined,
    });
    const data = res?.message || res;
    if (data) {
      viewDoc.value.status = data.status;
      viewDoc.value.accepted_readings = data.accepted;
      viewDoc.value.rejected_readings = data.rejected;
      viewDoc.value.total_readings = data.total;
      if (data.readings) viewDoc.value.readings = data.readings;
      if (data.accepted_qty !== undefined) viewDoc.value.accepted_qty = data.accepted_qty;
      if (data.rejected_qty !== undefined) viewDoc.value.rejected_qty = data.rejected_qty;
    }
    isDirty.value = false;
    toast.success("Readings saved");
    await load();
  } catch (e) {
    toast.error(e.message || "Failed to save readings");
  } finally { saving.value = false; }
}

async function submitInspection(name) {
  saving.value = true;
  try {
    const res = await apiCall("psd_books.api.qc.submit_qc_inspection", { inspection_name: name });
    const data = res?.message || res;
    if (viewDoc.value) {
      viewDoc.value.docstatus = 1;
      viewDoc.value.status = data?.status || viewDoc.value.status;
    }
    toast.success(`QC Inspection ${name} submitted — ${data?.status || ""}`);
    viewOpen.value = false;
    await load();
  } catch (e) {
    toast.error(e.message || "Submit failed");
  } finally { saving.value = false; }
}

async function requestApproval(inspectionName) {
  if (!inspectionName) return;
  approvalSending.value = true;
  try {
    await apiCall("psd_books.api.qc_approval.create_qc_approval_request", {
      inspection_name: inspectionName,
      reason: "",
    });
    toast.success(`Approval request created for ${inspectionName} — check Pending Approvals`);
    viewOpen.value = false;
  } catch (e) {
    toast.error(e.message || "Failed to create approval request");
  } finally {
    approvalSending.value = false;
  }
}

async function releaseFromQuarantine(inspectionName) {
  if (!inspectionName) return;
  releaseSending.value = true;
  try {
    const res = await apiCall("psd_books.quality.qc_hold_manager.manual_release_quarantine", {
      inspection_name: inspectionName,
    });
    const data = res?.message || res;
    if (data?.status === "ok") {
      if (viewDoc.value) {
        viewDoc.value.release_status = data.release_status;
        viewDoc.value.release_stock_entry = data.stock_entry;
      }
      toast.success(`Stock released from quarantine to target warehouse via ${data.stock_entry || "Stock Entry"}`);
      await load();
    } else {
      toast.error("Release did not complete — check the QC Inspection for details");
    }
  } catch (e) {
    toast.error(e.message || "Failed to release from quarantine");
  } finally {
    releaseSending.value = false;
  }
}

async function printCOA(inspectionName) {
  if (!inspectionName) return;
  coaSending.value = true;
  try {
    const res = await apiCall("psd_books.api.qc.generate_coa", {
      inspection_name: inspectionName,
    });
    const data = res?.message || res || {};
    if (!data.html) throw new Error("Certificate of Analysis returned no content");
    // Open in a new tab so the browser's own print/save-as-PDF affordances are available.
    const win = window.open("", "_blank");
    if (!win) {
      toast.error("Pop-up blocked — please allow pop-ups to view the Certificate of Analysis.");
      return;
    }
    win.document.open();
    win.document.write(data.html);
    win.document.close();
  } catch (e) {
    toast.error(e.message || "Failed to generate Certificate of Analysis");
  } finally {
    coaSending.value = false;
  }
}

function openNew() {
  Object.assign(form, {
    inspection_type: "Incoming",
    reference_type: "Purchase Receipt",
    reference_name: "",
    item: "",
    sample_size: 1,
    inspection_date: new Date().toISOString().slice(0, 10),
    remarks: "",
  });
  refDocs.value = [];
  items.value   = [];
  fetchRefDocs("");
  drawerOpen.value = true;
}

// ── Edit Inspection ────────────────────────────────────────────────────────────
async function fetchEditRefDocs(q = "") {
  if (!editForm.reference_type) { editRefDocs.value = []; return; }
  editRefLoading.value = true;
  try {
    const LABEL_FIELD = {
      "Purchase Receipt": "supplier",
      "Purchase Invoice": "supplier",
      "Delivery Note":    "customer",
      "Sales Invoice":    "customer",
      "Stock Entry":      "stock_entry_type",
    };
    const labelField = LABEL_FIELD[editForm.reference_type] || null;
    const fields = labelField ? ["name", labelField] : ["name"];
    const rows = await apiList(editForm.reference_type, {
      fields,
      filters: [["docstatus", "!=", 2], ...(q ? [["name", "like", `%${q}%`]] : [])],
      limit: 50,
      order: "modified desc",
    });
    editRefDocs.value = rows.map(r => ({
      value: r.name,
      label: labelField && r[labelField] ? `${r.name}  —  ${r[labelField]}` : r.name,
    }));
  } catch { editRefDocs.value = []; }
  finally { editRefLoading.value = false; }
}

watch(() => editForm.reference_type, (newType) => {
  if (suppressEditRefWatch.value) return;
  editForm.reference_name = "";
  if (newType) fetchEditRefDocs("");
  else editRefDocs.value = [];
});

watch(() => editForm.reference_name, (newName) => {
  if (suppressEditRefWatch.value) return;
  editForm.item = "";
  fetchItems(editForm.reference_type, newName);
});

function openEdit(r) {
  suppressEditRefWatch.value = true;
  Object.assign(editForm, {
    _name:           r.name || "",
    inspection_type: r.inspection_type || "Incoming",
    reference_type:  r.reference_type  || "",
    reference_name:  r.reference_name  || "",
    item:            r.item            || "",
    sample_size:     r.sample_size     || 1,
    inspection_date: r.inspection_date || new Date().toISOString().slice(0, 10),
    remarks:         r.remarks         || "",
    qc_inspection_template: r.qc_inspection_template || "",
  });
  // Let the reference_type watcher run (and skip clearing) before re-enabling it
  // for genuine user-driven Reference Doc Type changes.
  nextTick(() => { suppressEditRefWatch.value = false; });
  // Load current ref docs and items for dropdowns
  fetchItems(r.reference_type, r.reference_name);
  if (r.reference_type) fetchEditRefDocs("");
  fetchEditTemplates();
  editOpen.value = true;
}

// Load all available templates so the user can manually (re-)attach one to
// a Draft inspection whose readings never got populated (see
// applyTemplate()). Intentionally unfiltered -- a matching template may not
// have existed for this item/inspection_type at creation time, but the user
// may still want to pick a close match manually.
async function fetchEditTemplates() {
  editTemplateLoading.value = true;
  try {
    const res = await apiCall("psd_books.api.qc.get_templates", {});
    editTemplates.value = res?.message || res || [];
  } catch { editTemplates.value = []; }
  finally { editTemplateLoading.value = false; }
}

// (Re-)attach the selected template to this Draft inspection and rebuild its
// Readings table from the template's parameters. This is the fix for
// inspections created before a matching template existed -- template
// resolution otherwise only ever runs once, at creation time.
async function applyTemplate() {
  if (!editForm.qc_inspection_template) return;
  applyingTemplate.value = true;
  try {
    const res = await apiCall("psd_books.api.qc.apply_qc_template", {
      inspection_name: editForm._name,
      template_name: editForm.qc_inspection_template,
    });
    const data = res?.message || res;
    const count = data?.doc?.readings?.length || 0;
    toast.success(`Template applied — ${count} reading${count === 1 ? "" : "s"} generated`);
    editOpen.value = false;
    await load();
    if (data?.doc) openView(data.doc);
  } catch (e) {
    toast.error(e.message || "Failed to apply template");
  } finally { applyingTemplate.value = false; }
}

async function updateInspection() {
  const refName  = (editForm.reference_name || "").trim();
  const itemCode = (editForm.item || "").trim();
  if (!editForm.reference_type) return toast.error("Please select a Reference Doc Type.");
  if (!refName)                 return toast.error("Reference Document is required.");
  if (!itemCode)                return toast.error("Item is required.");

  editSaving.value = true;
  try {
    await apiCall("psd_books.api.qc.update_qc_inspection", {
      inspection_name:  editForm._name,
      inspection_type:  editForm.inspection_type,
      reference_type:   editForm.reference_type,
      reference_name:   refName,
      item_code:        itemCode,
      sample_size:      editForm.sample_size || 1,
      inspection_date:  editForm.inspection_date,
      remarks:          editForm.remarks || "",
    });
    toast.success(`Inspection ${editForm._name} updated`);
    editOpen.value = false;
    await load();
  } catch (e) {
    toast.error(e.message || "Failed to update inspection");
  } finally { editSaving.value = false; }
}

async function saveInspection() {
  // Sanitize inputs — trim whitespace and stray special characters
  const refName  = (form.reference_name || "").trim().replace(/[`'"]/g, "");
  const itemCode = (form.item || "").trim().replace(/[`'"]/g, "");

  if (!form.reference_type) {
    return toast.error("Please select a Reference Doc Type.");
  }
  if (!refName) {
    return toast.error("Reference Document name is required (e.g. PREC-2026-00001).");
  }
  if (!itemCode) {
    return toast.error("Item code is required.");
  }

  drawerSaving.value = true;
  try {
    const res = await apiCall("psd_books.api.qc.create_qc_inspection", {
      reference_type: form.reference_type,
      reference_name: refName,
      item_code: itemCode,
      inspection_type: form.inspection_type,
    });
    // apiCall may already unwrap `message`; the payload itself also has a
    // `message` string field, so only unwrap when it is an object.
    const data = (res && typeof res.message === "object" && res.message) ? res.message : res;
    if (data?.created === false) {
      // Inspection already exists — tell the user, keep the drawer open
      const who = data.inspection_name ? ` (${data.inspection_name})` : "";
      toast.error(`Inspection already exists for this ${form.reference_type} and item${who}.`);
    } else if (data?.inspection_name) {
      toast.success(`QC Inspection ${data.inspection_name} created`);
      drawerOpen.value = false;
      await load();
      // Auto-open the new inspection
      openView({ name: data.inspection_name, ...data.doc });
    } else {
      toast.error(data?.message || "Failed to create inspection");
    }
  } catch (e) {
    toast.error(e.message || "Failed to create inspection");
  } finally { drawerSaving.value = false; }
}

// ── Dropdown fetchers ──────────────────────────────────────────────────
// Fetch documents of the chosen Reference DocType (Purchase Invoice, etc.)
async function fetchRefDocs(q = "") {
  if (!form.reference_type) { refDocs.value = []; return; }
  refDocsLoading.value = true;
  try {
    // Doctype-specific field mapping for a meaningful label
    const LABEL_FIELD = {
      "Purchase Receipt": "supplier",
      "Purchase Invoice": "supplier",
      "Delivery Note":    "customer",
      "Sales Invoice":    "customer",
      "Stock Entry":      "stock_entry_type",
    };
    const labelField = LABEL_FIELD[form.reference_type] || null;
    const fields = labelField ? ["name", labelField] : ["name"];
    const qFilter = q ? [["name", "like", `%${q}%`]] : [];
    const rows = await apiList(form.reference_type, {
      fields,
      filters: [["docstatus", "!=", 2], ...qFilter],
      limit: 50,
      order: "modified desc",
    });
    refDocs.value = rows.map(r => ({
      value: r.name,
      label: labelField && r[labelField]
        ? `${r.name}  —  ${r[labelField]}`
        : r.name,
    }));
  } catch { refDocs.value = []; }
  finally { refDocsLoading.value = false; }
}

// Fetch Items — scoped to the selected Reference Document. The Item
// dropdown must only ever offer items that actually appear on that
// document (see get_reference_doc_items), not every Item in the system.
async function fetchItems(referenceType, referenceName) {
  if (!referenceType || !referenceName) { items.value = []; return; }
  itemsLoading.value = true;
  try {
    const rows = await apiCall("psd_books.api.qc.get_reference_doc_items", {
      reference_type: referenceType,
      reference_name: referenceName,
    });
    items.value = (rows || []).map(r => ({
      value: r.item_code,
      label: r.item_name && r.item_name !== r.item_code ? `${r.item_code} — ${r.item_name}` : r.item_code,
    }));
  } catch { items.value = []; }
  finally { itemsLoading.value = false; }
}

function exportCSV() {
  const rows = exportRows.value;
  if (!rows.length) return;
  const esc = v => { const s = v == null ? "" : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  const hdr = ["Inspection #", "Type", "Reference Type", "Reference", "Item", "Date", "Status", "Accepted", "Rejected", "Total", "Inspected By"];
  const lines = [hdr.join(",")];
  for (const r of rows) {
    lines.push([
      r.name, r.inspection_type, r.reference_type, r.reference_name || "",
      r.item, r.inspection_date, r.status,
      r.accepted_readings || 0, r.rejected_readings || 0, r.total_readings || 0, r.inspected_by || "",
    ].map(esc).join(","));
  }
  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `qc_inspections_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click(); URL.revokeObjectURL(url);
  toast.success(`Exported ${rows.length} row(s)`);
}

onMounted(() => {
  load();
});
</script>

<style scoped>
.qc-page {
  --qc-blue: #1a6ef7; --qc-blue-dark: #1558d6; --qc-ink: #0f172a; --qc-text: #334155;
  --qc-muted: #64748b; --qc-line: #e8edf3;
  display:flex; flex-direction:column; gap:20px; padding:24px; min-width:0; color:var(--qc-text);
}

/* KPI cards */
.qc-kpis { display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:16px; min-width:0; }
.qc-kpi {
  --tint:#f3f7ff; --edge:#dbe6fb; --ico-bg:#e1ecfd; --ico:#2f6df0; --val:var(--qc-ink);
  display:flex; align-items:center; gap:18px; min-width:0; padding:20px 22px; text-align:left; font:inherit;
  border:1px solid var(--edge); border-radius:16px; cursor:pointer;
  background:linear-gradient(135deg, var(--tint), #fff 85%);
  transition:box-shadow .15s, border-color .15s;
}
.qc-kpi.static { cursor:default; }
.qc-kpi:not(.static):hover { box-shadow:0 4px 14px rgba(15,23,42,.07); }
.qc-kpi.active { border-color:var(--ico); box-shadow:0 0 0 3px color-mix(in srgb, var(--ico) 18%, transparent); }
.qc-kpi:focus-visible { outline:2px solid var(--qc-blue); outline-offset:2px; }
.qc-kpi-ico { width:60px; height:60px; flex-shrink:0; display:inline-flex; align-items:center; justify-content:center; border-radius:16px; background:var(--ico-bg); color:var(--ico); }
.qc-kpi-txt { display:flex; flex-direction:column; gap:4px; min-width:0; }
.qc-kpi-lbl { font-size:12.5px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:var(--qc-muted); }
.qc-kpi-val { font-size:30px; font-weight:700; line-height:1.05; color:var(--val); }
.k-pass { --tint:#ecfaf2; --edge:#cdeedb; --ico-bg:#d3f3e1; --ico:#16a34a; --val:#15803d; }
.k-fail { --tint:#fff0ef; --edge:#fbd5d3; --ico-bg:#fddcda; --ico:#dc2626; --val:#b91c1c; }
.k-pend { --tint:#fff7e8; --edge:#fde6bd; --ico-bg:#fdecc8; --ico:#e8870c; --val:#d97706; }
.k-rate { --tint:#f6f0ff; --edge:#e7dcfb; --ico-bg:#ece1fc; --ico:#7c3aed; --val:#7c3aed; }

/* Filter panel */
.qc-panel { background:#fff; border:1px solid var(--qc-line); border-radius:16px; padding:18px 20px; display:flex; flex-direction:column; gap:16px; box-shadow:0 1px 2px rgba(15,23,42,.03); }
.qc-tabs-row { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
.qc-tabs { display:flex; gap:10px; flex-wrap:wrap; }
.qc-tab {
  display:inline-flex; align-items:center; gap:8px; height:40px; padding:0 16px; border:1px solid var(--qc-line); border-radius:999px;
  background:#fff; font:inherit; font-size:14px; font-weight:600; color:var(--qc-text); cursor:pointer; white-space:nowrap;
  transition:background .15s, border-color .15s, color .15s;
}
.qc-tab:hover { border-color:#cbd5e1; }
.qc-tab.active { background:var(--qc-blue); border-color:var(--qc-blue); color:#fff; }
.qc-tab-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
.qc-tab-cnt { min-width:24px; height:24px; padding:0 7px; display:inline-flex; align-items:center; justify-content:center; border-radius:999px; background:#eef2f6; color:var(--qc-muted); font-size:12.5px; font-weight:600; }
.qc-tab.active .qc-tab-cnt { background:rgba(255,255,255,.24); color:#fff; }
.qc-tab:focus-visible, .qc-btn:focus-visible, .qc-btn-new:focus-visible, .qc-act:focus-visible { outline:2px solid var(--qc-blue); outline-offset:2px; }

.qc-btn-new { display:inline-flex; align-items:center; gap:8px; height:42px; padding:0 18px; border:none; border-radius:10px; background:var(--qc-blue); color:#fff; font:inherit; font-size:14px; font-weight:600; cursor:pointer; white-space:nowrap; transition:background .15s; }
.qc-btn-new > span, .qc-btn > span { display:inline-flex; }
.qc-btn-new:hover:not(:disabled) { background:var(--qc-blue-dark); }
.qc-btn-new:disabled { opacity:.5; cursor:not-allowed; }

.qc-filters { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
.qc-search { flex:1 1 260px; min-width:200px; display:flex; align-items:center; gap:10px; height:46px; padding:0 16px; border:1px solid var(--qc-line); border-radius:12px; background:#fff; color:#94a3b8; transition:border-color .15s, box-shadow .15s; }
.qc-search:focus-within { border-color:var(--qc-blue); box-shadow:0 0 0 3px rgba(26,110,247,.12); }
.qc-search-ico { display:inline-flex; flex-shrink:0; }
.qc-search-input { border:none; outline:none; background:transparent; width:100%; min-width:0; font:inherit; font-size:14px; color:var(--qc-ink); }
.qc-search-input::placeholder { color:#94a3b8; }

.qc-ctl { height:46px; border:1px solid var(--qc-line); border-radius:12px; background:#fff; font:inherit; font-size:14px; color:var(--qc-ink); transition:border-color .15s, box-shadow .15s; }
.qc-ctl:focus-within, .qc-date:focus { border-color:var(--qc-blue); box-shadow:0 0 0 3px rgba(26,110,247,.12); outline:none; }
.qc-dates { display:flex; align-items:center; gap:10px; }
.qc-date { padding:0 14px; width:168px; }
.qc-to { font-size:14px; color:var(--qc-muted); }

.qc-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; height:46px; padding:0 18px; border:1px solid var(--qc-line); border-radius:12px; background:#fff; color:var(--qc-ink); font:inherit; font-size:14px; font-weight:500; cursor:pointer; white-space:nowrap; transition:background .15s, border-color .15s; }
.qc-btn:hover:not(:disabled) { background:#f8fafc; border-color:#cbd5e1; }
.qc-btn:disabled { opacity:.5; cursor:not-allowed; }
.qc-btn-icon { width:46px; padding:0; }


/* Table card */
.qc-tcard { background:#fff; border:1px solid var(--qc-line); border-radius:16px; overflow:hidden; box-shadow:0 1px 2px rgba(15,23,42,.03); }
.qc-scroll { overflow-x:auto; }
.qc-table { width:100%; min-width:1040px; border-collapse:collapse; font-size:14px; }
.qc-table th { background:#f8fafc; padding:18px 14px; font-size:12.5px; font-weight:700; letter-spacing:.03em; text-transform:uppercase; color:#475a7a; text-align:left; border-bottom:1px solid var(--qc-line); white-space:nowrap; user-select:none; }
.qc-table th.sortable:hover { color:var(--qc-ink); }
.qc-sort { margin-left:4px; font-size:11px; color:#9aa7bb; letter-spacing:0; }
.qc-th-chk, .qc-td-chk { width:56px; padding-left:20px !important; padding-right:0 !important; }
.qc-th-actions { text-align:center !important; }
.qc-table td { padding:16px 14px; border-bottom:1px solid var(--qc-line); vertical-align:middle; color:var(--qc-ink); }
.qc-table tbody tr:last-child td { border-bottom:none; }
.qc-row { cursor:pointer; transition:background .12s; }
.qc-row:hover { background:#f8fafc; }
.qc-row.picked { background:#f2f7ff; }
.qc-chk { width:18px; height:18px; margin:0; accent-color:var(--qc-blue); cursor:pointer; }
.qc-num { color:var(--qc-blue); font-weight:600; white-space:nowrap; }
.qc-type-badge { display:inline-flex; align-items:center; height:26px; font-size:12.5px; font-weight:600; padding:0 12px; border-radius:999px; white-space:nowrap; }
.qc-type-mini { font-size:10px; font-weight:600; padding:2px 6px; border-radius:10px; }
.qc-two { display:flex; flex-direction:column; gap:2px; }
.qc-sub { font-size:12px; color:#94a3b8; }
.qc-ref { font-weight:600; color:var(--qc-blue); }
.qc-strong { font-weight:600; }
.qc-muted { color:var(--qc-muted); white-space:nowrap; }
.qc-readings { font-size:13.5px; white-space:nowrap; }
.qc-readings b { font-weight:700; }
.qc-readings b.ok { color:#16a34a; }
.qc-readings b.bad { color:#dc2626; }
.qc-readings i { color:#94a3b8; font-style:normal; margin:0 2px; }
.qc-readings .of { color:#94a3b8; font-size:12px; }
.qc-td-actions { text-align:center; white-space:nowrap; }
.qc-act { width:36px; height:36px; margin:0 3px; display:inline-flex; align-items:center; justify-content:center; border:1px solid var(--qc-line); border-radius:10px; background:#fff; color:var(--qc-text); cursor:pointer; transition:background .15s, border-color .15s, color .15s; }
.qc-act > span { display:inline-flex; }
.qc-act:hover:not(:disabled) { background:#f1f5f9; border-color:#cbd5e1; color:var(--qc-ink); }
.qc-act:disabled { opacity:.4; cursor:not-allowed; }
.sortable { cursor:pointer; }
.ta-r { text-align:right; }
.text-muted { color:#9ca3af; }
.mono-sm { font-size:12px; }

.qc-empty { text-align:center; padding:48px 20px 56px !important; }
.qc-empty-art { display:flex; justify-content:center; margin-bottom:10px; }
.qc-empty-title { font-size:20px; font-weight:700; color:var(--qc-ink); margin-bottom:8px; }
.qc-empty-sub { font-size:14px; color:var(--qc-muted); }
.qc-skel-cell { padding:14px 20px !important; }
.qc-shimmer { height:32px; background:linear-gradient(90deg,#f3f4f6 25%,#e9ecef 50%,#f3f4f6 75%); background-size:200%; animation:shimmer 1.4s infinite; border-radius:6px; }
@keyframes shimmer { 0%{background-position:200%} 100%{background-position:-200%} }

/* Footer pagination */
.qc-foot { border-top:1px solid var(--qc-line); padding:14px 16px; }
.qc-foot :deep(.pg-wrap) { padding:0; border:none; border-radius:0; background:transparent; font-family:inherit; }
.qc-foot :deep(.pg-label), .qc-foot :deep(.pg-summary) { font-size:13.5px; color:var(--qc-muted); }
.qc-foot :deep(.pg-left) { gap:12px; }
.qc-foot :deep(.pg-select) { height:36px; min-width:68px; padding:0 30px 0 12px; font-size:13.5px; color:var(--qc-ink); border:1px solid var(--qc-line); border-radius:10px; }
.qc-foot :deep(.pg-chevron) { right:13px; width:12px; height:8px; }
.qc-foot :deep(.pg-right) { gap:16px; }
.qc-foot :deep(.pg-nav) { gap:6px; }
.qc-foot :deep(.pg-btn) { min-width:36px; height:36px; border:1px solid var(--qc-line); border-radius:10px; font-size:13.5px; }
.qc-foot :deep(.pg-icon-btn svg) { width:16px; height:16px; }
.qc-foot :deep(.pg-btn.pg-page.active) { background:var(--qc-blue); border-color:var(--qc-blue); color:#fff; }

/* Buttons */
.qc-btn-primary { display:inline-flex; align-items:center; gap:6px; background:#1a6ef7; color:#fff; border:none; border-radius:8px; padding:8px 14px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; transition:background .15s; }
.qc-btn-primary:hover { background:#1d4ed8; } .qc-btn-primary:disabled { opacity:.5; cursor:not-allowed; }
.qc-btn-ghost { display:inline-flex; align-items:center; gap:6px; background:#fff; border:1px solid #e5e7eb; border-radius:8px; padding:8px 12px; font-size:13px; color:#374151; cursor:pointer; font-family:inherit; }
.qc-btn-ghost:hover { background:#f9fafb; }
.qc-btn-save { display:inline-flex; align-items:center; gap:6px; background:#f0fdf4; border:1px solid #16a34a; color:#16a34a; border-radius:8px; padding:8px 14px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; }
.qc-btn-save:hover { background:#dcfce7; } .qc-btn-save:disabled { opacity:.5; cursor:not-allowed; }
.qc-btn-edit { display:inline-flex; align-items:center; gap:6px; background:#fffbeb; border:1px solid #f59e0b; color:#b45309; border-radius:8px; padding:8px 14px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; }
.qc-btn-edit:hover { background:#fef3c7; }
.qc-btn-approval { display:inline-flex; align-items:center; gap:6px; background:#faf5ff; border:1px solid #7c3aed; color:#7c3aed; border-radius:8px; padding:8px 14px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; }
.qc-btn-approval:hover { background:#ede9fe; } .qc-btn-approval:disabled { opacity:.5; cursor:not-allowed; }

/* Status badges */
.qc-status-badge { display:inline-flex; align-items:center; height:28px; font-size:12.5px; font-weight:600; padding:0 14px; border-radius:999px; white-space:nowrap; }
.qc-status-pass    { background:#dcfce7; color:#15803d; }
.qc-status-fail    { background:#fee2e2; color:#dc2626; }
.qc-status-pending { background:#fef3c7; color:#b45309; }

/* Drawer */
.qc-overlay { position:fixed; inset:0; background:rgba(0,0,0,.35); z-index:998; }
.qc-drawer { position:fixed; right:0; top:0; bottom:0; width:540px; background:#fff; z-index:999; display:flex; flex-direction:column; transform:translateX(100%); transition:transform .25s cubic-bezier(.4,0,.2,1); box-shadow:-4px 0 24px rgba(0,0,0,.12); }
.qc-drawer.open { transform:translateX(0); }
.qc-view-drawer { width:620px; }
.qc-dheader { padding:20px 20px 16px; background:linear-gradient(135deg,#1e3a5f,#2563eb); position:relative; flex-shrink:0; }
.qc-dh-top { display:flex; align-items:center; gap:12px; }
.qc-dh-ico { width:40px; height:40px; border-radius:10px; background:rgba(255,255,255,.2); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.qc-dh-title { font-size:16px; font-weight:700; color:#fff; }
.qc-dh-sub { font-size:12px; color:rgba(255,255,255,.75); margin-top:2px; }
.qc-dclose { position:absolute; top:14px; right:14px; background:rgba(255,255,255,.15); border:none; border-radius:8px; padding:6px; cursor:pointer; color:#fff; display:flex; align-items:center; }
.qc-dclose:hover { background:rgba(255,255,255,.25); }
.qc-dbody { flex:1; overflow-y:auto; padding:18px 20px; display:flex; flex-direction:column; gap:14px; }
.qc-dfooter { padding:14px 20px; border-top:1px solid #e5e7eb; display:flex; gap:8px; justify-content:flex-end; flex-shrink:0; }

/* Create form */
.qc-fields-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.qc-field { display:flex; flex-direction:column; gap:4px; }
.qc-label { font-size:12px; font-weight:600; color:#374151; }
.req { color:#ef4444; }
.qc-input { border:1px solid #e5e7eb; border-radius:8px; padding:8px 10px; font:inherit; font-size:13px; outline:none; color:#111827; transition:border-color .15s; }
.qc-input:focus { border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.08); }
.qc-select-full { border:1px solid #e5e7eb; border-radius:8px; padding:8px 10px; font:inherit; font-size:13px; outline:none; color:#111827; background:#fff; width:100%; }
.qc-select-full:focus { border-color:#2563eb; }

/* View sections */
.qc-summary-bar { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; background:#f8fafc; border-radius:8px; padding:12px 14px; border:1px solid #e5e7eb; }
.qc-sumbar-item { display:flex; flex-direction:column; gap:2px; }
.qc-sumbar-lbl { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:#9ca3af; }
.qc-sumbar-val { font-size:13px; font-weight:600; color:#0f172a; }

.qc-progress-section { display:flex; flex-direction:column; gap:6px; }
.qc-progress-bar { height:8px; background:#f3f4f6; border-radius:4px; overflow:hidden; }
.qc-progress-fill { height:100%; border-radius:4px; transition:width .4s; }

.qc-view-section { display:flex; flex-direction:column; gap:6px; }
.qc-view-sec-lbl { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:#9ca3af; }
.qc-meta-lbl { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:#9ca3af; }
.qc-qty-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; }
.qc-qty-card { background:#f8fafc; border:1px solid #e5e7eb; border-radius:8px; padding:10px 12px; display:flex; flex-direction:column; gap:6px; }
.qc-qty-lbl { font-size:11px; font-weight:600; color:#6b7280; }
.qc-qty-fixed-val { font-size:15px; font-weight:700; color:#111827; padding:7px 0; }
.qc-qty-input { width:100%; box-sizing:border-box; font-size:14px; font-weight:600; }
.qc-qty-warn { display:flex; align-items:center; gap:6px; margin-top:8px; padding:8px 12px; background:#fef2f2; border:1px solid #fecaca; border-radius:8px; font-size:12px; font-weight:600; color:#dc2626; }
@media (max-width:520px) {
  .qc-qty-grid { grid-template-columns:1fr; }
}

/* Readings table */
.qc-readings-tbl { width:100%; border-collapse:collapse; font-size:12.5px; }
.qc-readings-tbl th { background:#f9fafb; padding:8px 10px; font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:#6b7280; text-align:left; border-bottom:1px solid #e5e7eb; }
.qc-readings-tbl td { padding:8px 10px; border-bottom:1px solid #f3f4f6; vertical-align:middle; }
.qc-reading-row-accepted { background:#f0fdf4; }
.qc-reading-row-rejected { background:#fef2f2; }
.qc-rd-input { border:1px solid #e5e7eb; border-radius:6px; padding:4px 8px; font:inherit; font-size:12.5px; outline:none; width:100%; }
.qc-rd-input:focus { border-color:#2563eb; }
.qc-rd-badge { font-size:10.5px; font-weight:700; padding:2px 8px; border-radius:12px; }
.qc-rd-accepted { background:#dcfce7; color:#15803d; }
.qc-rd-rejected  { background:#fee2e2; color:#dc2626; }
.qc-rd-pending   { background:#fef3c7; color:#b45309; }

/* ── Mobile card list: hidden by default, shown ≤480px ── */
.qc-mobile-list { display:none; }

/* ── Responsive ── */
@media (max-width: 1280px) {
  .qc-kpis { grid-template-columns:repeat(3, minmax(0,1fr)); }
}
@media (max-width: 900px) {
  .qc-dates { flex:1 1 100%; }
  .qc-date { flex:1; width:auto; min-width:0; }
}
@media (max-width: 480px) {
  .qc-page { padding:10px 8px; gap:12px; }
  .qc-table-wrap { display:none; }
  .qc-mobile-list { display:flex; flex-direction:column; gap:10px; }
  .qc-mobile-shimmer { height:110px; border-radius:12px; background:linear-gradient(90deg,#f3f4f6 25%,#e9ecef 50%,#f3f4f6 75%); background-size:200%; animation:shimmer 1.4s infinite; }
  .qc-mobile-empty { text-align:center; padding:40px 16px; background:#fff; border:1px solid var(--qc-line); border-radius:14px; }
  .qc-mobile-empty .qc-empty-title { font-size:16px; }
  .qc-mobile-empty .qc-empty-sub { font-size:13px; }
  .qc-mob-card { background:#fff; border:1px solid var(--qc-line); border-radius:14px; border-left:4px solid #6b7280; padding:12px 14px; display:flex; flex-direction:column; gap:8px; cursor:pointer; }
  .qc-mob-card:active { box-shadow:0 4px 16px rgba(0,0,0,.08); }
  .qc-mob-top { display:flex; align-items:center; justify-content:space-between; }
  .qc-mob-row2 { display:flex; align-items:center; gap:8px; }
  .qc-mob-date { font-size:12px; color:#94a3b8; margin-left:auto; }
  .qc-mob-item { display:flex; align-items:baseline; gap:6px; font-size:13px; }
  .qc-mob-lbl { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:#94a3b8; flex-shrink:0; min-width:60px; }
  .qc-mob-val { font-weight:600; color:var(--qc-ink); line-height:1.3; word-break:break-word; }
  .qc-mob-sub { font-weight:400; color:#94a3b8; font-size:11.5px; }
  .qc-mob-footer { display:flex; align-items:center; justify-content:space-between; padding-top:6px; border-top:1px solid #f1f5f9; }
  .qc-mob-inspector { font-size:12px; color:var(--qc-muted); }
  .qc-foot-mobile { border:1px solid var(--qc-line); border-radius:14px; background:#fff; padding:10px; }

  .qc-kpis { grid-template-columns:1fr 1fr; gap:10px; }
  .qc-kpis > .qc-kpi:last-child { grid-column:1 / -1; }
  .qc-kpi { padding:12px 14px; gap:12px; border-radius:14px; }
  .qc-kpi-ico { width:44px; height:44px; border-radius:12px; }
  .qc-kpi-ico svg { width:22px; height:22px; }
  .qc-kpi-lbl { font-size:11px; }
  .qc-kpi-val { font-size:22px; }

  .qc-panel { padding:12px; border-radius:14px; gap:12px; }
  .qc-tabs { gap:6px; }
  .qc-tab { height:34px; padding:0 11px; font-size:12.5px; gap:6px; }
  .qc-tab-cnt { min-width:20px; height:20px; font-size:11px; }
  .qc-btn-new { width:100%; justify-content:center; }
  .qc-tabs-row { flex-direction:column; align-items:stretch; }
  .qc-filters { gap:8px; }
  .qc-search,   .qc-ctl, .qc-search, .qc-btn { height:42px; }
  .qc-btn-icon { width:42px; }

  .qc-drawer,.qc-view-drawer { width:100%; }
  .qc-dheader { padding:16px 14px 12px; }
  .qc-dh-title { font-size:14px; }
  .qc-dh-sub { font-size:11px; }
  .qc-dbody { padding:14px; gap:12px; }
  .qc-dfooter { padding:12px 14px; }
  .qc-fields-grid { grid-template-columns:1fr; gap:10px; }
  .qc-summary-bar { grid-template-columns:1fr 1fr; }
}
@media (max-width: 375px) {
  .qc-page { padding:8px 6px; }
  .qc-mob-card { padding:10px 12px; }
  .qc-dheader { padding:12px 12px 10px; }
  .qc-dh-title { font-size:13px; }
  .qc-dbody { padding:12px; }
  .qc-dfooter { padding:10px 12px; }
  .qc-summary-bar { grid-template-columns:1fr; }
}

/* ── New QC Inspection drawer (pro) — app theme: Inter (var(--font)), QC-family header ── */
.qc-pro { width:600px; max-width:100vw; font-family:var(--font, 'Inter', system-ui, sans-serif); background:#fff; }
.qc-pro button, .qc-pro input, .qc-pro select, .qc-pro textarea { font-family:inherit; }
.qc-pro-head { display:flex; align-items:center; gap:12px; padding:20px 20px 16px; background:linear-gradient(135deg,#1e3a5f,#2563eb); color:#fff; flex-shrink:0; position:relative; }
.qc-pro-head-ico { width:40px; height:40px; border-radius:10px; background:rgba(255,255,255,.2); display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
.qc-pro-head-txt { flex:1; min-width:0; }
.qc-pro-title { font-size:16px; font-weight:700; color:#fff; }
.qc-pro-sub { font-size:12px; color:rgba(255,255,255,.75); margin-top:2px; }
.qc-pro-close { width:32px; height:32px; border:none; background:rgba(255,255,255,.15); color:#fff; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; }
.qc-pro-close:hover { background:rgba(255,255,255,.25); }
.qc-pro-close:focus-visible, .qc-pro-btn-ghost:focus-visible, .qc-pro-btn-primary:focus-visible { outline:2px solid #2563eb; outline-offset:2px; }
.qc-pro-body { flex:1; overflow-y:auto; padding:20px 20px 24px; display:flex; flex-direction:column; gap:16px; box-sizing:border-box; }

.qc-pro-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; min-width:0; }
.qc-pro-field { display:flex; flex-direction:column; gap:6px; min-width:0; }
.qc-pro .qc-full { grid-column:1/-1; }
.qc-pro-label { display:flex; align-items:center; gap:6px; font-size:12.5px; font-weight:600; color:#374151; }
.qc-pro-lico { display:inline-flex; color:#2563eb; }
.qc-pro .req { color:#ef4444; }
.qc-pro-hint { font-size:11.5px; color:#6b7280; line-height:1.4; }

.qc-pro-ctl { position:relative; display:flex; align-items:center; min-width:0; }
.qc-pro-chev { position:absolute; right:12px; top:0; bottom:0; display:inline-flex; align-items:center; color:#374151; pointer-events:none; z-index:1; }
.qc-pro-chev svg { width:14px; height:14px; }
.qc-pro-input { width:100%; box-sizing:border-box; height:40px; padding:0 36px 0 12px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; font-size:13px; color:#111827; outline:none; transition:border-color .15s, box-shadow .15s; }
.qc-pro-input::placeholder, .qc-pro-textarea::placeholder { color:#9ca3af; font-style:normal; }
.qc-pro-input:hover, .qc-pro-textarea:hover { border-color:#d1d5db; }
.qc-pro-input:focus, .qc-pro-textarea:focus { border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.08); }
.qc-pro-input[type="date"] { padding-right:12px; }
.qc-pro-readonly { background:#f8fafc; color:#374151; cursor:default; }
.qc-pro-readonly:focus { border-color:#e5e7eb; box-shadow:none; }
.qc-pro-select { appearance:none; -webkit-appearance:none; cursor:pointer; }
.qc-pro-textarea { width:100%; box-sizing:border-box; min-height:76px; padding:10px 12px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; font-size:13px; color:#111827; outline:none; resize:vertical; transition:border-color .15s, box-shadow .15s; }

.qc-pro-ss { display:block; }
.qc-pro-ss :deep(.ss-wrap) { width:100%; }
.qc-pro-ss :deep(.ss-trigger) { height:40px; min-height:40px; box-sizing:border-box; padding:0 36px 0 12px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; font-size:13px; color:#111827; }
.qc-pro-ss :deep(.ss-trigger:hover) { border-color:#d1d5db; }
.qc-pro-ss :deep(.ss-trigger:focus), .qc-pro-ss :deep(.ss-trigger.open) { border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.08); }
.qc-pro-ss :deep(.ss-ph) { color:#9ca3af; }
.qc-pro-ss :deep(.ss-trigger.ss-disabled) { background:#f8fafc; color:#9ca3af; cursor:not-allowed; }
.qc-pro-ss :deep(.ss-caret) { display:none; }

.qc-pro-foot { display:flex; justify-content:flex-end; gap:8px; padding:14px 20px; border-top:1px solid #e5e7eb; background:#fff; flex-shrink:0; }
.qc-pro-btn-ghost { height:38px; padding:0 16px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; color:#374151; font-size:13px; font-weight:500; cursor:pointer; }
.qc-pro-btn-ghost:hover { background:#f9fafb; }
.qc-pro-btn-primary { display:inline-flex; align-items:center; gap:6px; height:38px; padding:0 16px; border:none; border-radius:8px; background:#1a6ef7; color:#fff; font-size:13px; font-weight:600; cursor:pointer; transition:background .15s; }
.qc-pro-btn-primary svg { width:14px; height:14px; }
.qc-pro-btn-primary:hover:not(:disabled) { background:#1d4ed8; }
.qc-pro-btn-primary:disabled { opacity:.5; cursor:not-allowed; }

@media (max-width:640px) {
  .qc-pro { width:100%; }
  .qc-pro-head { padding:16px 14px 12px; }
  .qc-pro-title { font-size:14px; }
  .qc-pro-sub { font-size:11px; }
  .qc-pro-body { padding:12px 14px; gap:12px; }
  .qc-pro-grid { grid-template-columns:1fr; gap:10px; }
  .qc-pro-foot { padding:12px 14px; }
}
</style>