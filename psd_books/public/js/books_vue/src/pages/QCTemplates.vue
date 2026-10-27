<template>
  <div class="qct-page">

    <!-- ── KPI cards ── -->
    <div class="qct-kpis">
      <button type="button" class="qct-kpi k-total" :class="{ active: filterScope === '' }" @click="filterScope = ''">
        <span class="qct-kpi-ico">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </span>
        <span class="qct-kpi-txt"><span class="qct-kpi-lbl">Total Templates</span><span class="qct-kpi-val">{{ list.length }}</span></span>
      </button>
      <button type="button" class="qct-kpi k-spec" :class="{ active: filterScope === 'specific' }" @click="filterScope = 'specific'">
        <span class="qct-kpi-ico">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        </span>
        <span class="qct-kpi-txt"><span class="qct-kpi-lbl">Item-Specific</span><span class="qct-kpi-val">{{ scopeCounts.specific }}</span></span>
      </button>
      <button type="button" class="qct-kpi k-gen" :class="{ active: filterScope === 'generic' }" @click="filterScope = 'generic'">
        <span class="qct-kpi-ico">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </span>
        <span class="qct-kpi-txt"><span class="qct-kpi-lbl">Generic (All Items)</span><span class="qct-kpi-val">{{ scopeCounts.generic }}</span></span>
      </button>
      <div class="qct-kpi k-avg static">
        <span class="qct-kpi-ico">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        </span>
        <span class="qct-kpi-txt"><span class="qct-kpi-lbl">Avg Parameters</span><span class="qct-kpi-val">{{ avgParams }}</span></span>
      </div>
    </div>

    <!-- ── Filter panel ── -->
    <div class="qct-panel">
      <div class="qct-tabs-row">
        <div class="qct-tabs" role="tablist">
          <button v-for="t in typeTabs" :key="t.key" type="button" role="tab" class="qct-tab"
            :class="{ active: filterType === t.key }" :aria-selected="filterType === t.key" @click="filterType = t.key">
            <span v-if="t.color" class="qct-tab-dot" :style="'background:' + t.color"></span>
            {{ t.label }}
            <span class="qct-tab-cnt">{{ t.cnt }}</span>
          </button>
        </div>
        <button type="button" class="qct-btn-new" :disabled="!$canCreate('inventory')"
          :title="!$canCreate('inventory') ? 'Read-only access' : ''" @click="openCreate">
          <span v-html="icon('plus',16)"></span> New Template
        </button>
      </div>

      <div class="qct-filters">
        <label class="qct-search">
          <span v-html="icon('search',16)" class="qct-search-ico"></span>
          <input v-model="search" placeholder="Search template name, item, description…" class="qct-search-input" aria-label="Search templates" />
        </label>

        <div class="qct-ctl qct-ctl-select" :class="{ open: ddOpen }">
          <button type="button" class="qct-trigger" aria-haspopup="listbox" :aria-expanded="ddOpen"
            @click="toggleDD($event)" @keydown="ddKey($event)">{{ scopeLabel }}</button>
        </div>

        <button type="button" class="qct-btn qct-btn-icon" @click="load" :disabled="loading" title="Refresh" aria-label="Refresh">
          <span v-html="icon('refresh',16)"></span>
        </button>
        <button type="button" class="qct-btn" @click="exportCSV" :disabled="!sorted.length">
          <span v-html="icon('download',16)"></span> Export CSV<template v-if="selected.length"> ({{ selected.length }})</template>
        </button>
      </div>
    </div>

    <!-- ── Desktop table ── -->
    <div class="qct-tcard qct-table-wrap">
      <div class="qct-scroll">
        <table class="qct-table">
          <thead><tr>
            <th class="qct-th-chk"><input type="checkbox" class="qct-chk" :checked="allOnPageSelected" :disabled="!paginated.length" @change="toggleAll" aria-label="Select all on this page" /></th>
            <th @click="sort('template_name')" class="sortable">Template Name <span class="qct-sort" v-html="sortArrow('template_name')"></span></th>
            <th @click="sort('item')" class="sortable">Item <span class="qct-sort" v-html="sortArrow('item')"></span></th>
            <th @click="sort('item_group')" class="sortable">Item Group <span class="qct-sort" v-html="sortArrow('item_group')"></span></th>
            <th @click="sort('inspection_type')" class="sortable">Inspection Type <span class="qct-sort" v-html="sortArrow('inspection_type')"></span></th>
            <th @click="sort('parameter_count')" class="sortable qct-th-c">Parameters <span class="qct-sort" v-html="sortArrow('parameter_count')"></span></th>
            <th>Description</th>
            <th class="qct-th-actions">Actions</th>
          </tr></thead>
          <tbody>
            <template v-if="loading">
              <tr v-for="n in 6" :key="n"><td colspan="8" class="qct-skel-cell"><div class="qct-shimmer"></div></td></tr>
            </template>
            <template v-else>
              <tr v-for="t in paginated" :key="t.name" class="qct-row" :class="{ picked: selected.includes(t.name) }" @click="openView(t)">
                <td class="qct-td-chk" @click.stop><input type="checkbox" class="qct-chk" :checked="selected.includes(t.name)" @change="toggleRow(t.name)" :aria-label="'Select ' + t.template_name" /></td>
                <td>
                  <div class="qct-name-cell">
                    <span class="qct-tpl-ico">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </span>
                    <span class="qct-tpl-name">{{ t.template_name }}</span>
                  </div>
                </td>
                <td>
                  <span v-if="t.item" class="qct-item-badge">{{ t.item }}</span>
                  <span v-else class="qct-generic-badge">Generic</span>
                </td>
                <td class="qct-muted">{{ t.item_group || '—' }}</td>
                <td><span class="qct-type-badge" :style="typeStyle(t.inspection_type)">{{ t.inspection_type || 'All' }}</span></td>
                <td class="qct-td-c"><span class="qct-param-count">{{ t.parameter_count ?? '—' }}</span></td>
                <td class="qct-desc" :title="t.description || ''">{{ t.description || '—' }}</td>
                <td class="qct-td-actions" @click.stop>
                  <button type="button" class="qct-act" :disabled="!$canEdit('inventory')" :title="!$canEdit('inventory') ? 'Read-only access' : 'Edit'" aria-label="Edit template" @click="openEdit(t)">
                    <span v-html="icon('edit',16)"></span>
                  </button>
                  <button type="button" class="qct-act" title="View" aria-label="View template" @click="openView(t)">
                    <span v-html="icon('eye',16)"></span>
                  </button>
                  <button type="button" class="qct-act qct-act-del" :disabled="!$canDelete('inventory')" :title="!$canDelete('inventory') ? 'Not permitted' : 'Delete'" aria-label="Delete template" @click="deleteTemplate(t)">
                    <span v-html="icon('trash',16)"></span>
                  </button>
                </td>
              </tr>
              <tr v-if="!filtered.length">
                <td colspan="8" class="qct-empty">
                  <div class="qct-empty-art" aria-hidden="true">
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
                    <div class="qct-empty-title">No templates match your filters</div>
                    <div class="qct-empty-sub">Try a different search, type or scope.</div>
                  </template>
                  <template v-else>
                    <div class="qct-empty-title">No QC Templates found</div>
                    <div class="qct-empty-sub">Templates define the parameters inspectors check during a QC Inspection</div>
                    <button type="button" class="qct-btn-new qct-empty-btn" :disabled="!$canCreate('inventory')" :title="!$canCreate('inventory') ? 'Read-only access' : ''" @click="openCreate">
                      <span v-html="icon('plus',16)"></span> Create Template
                    </button>
                  </template>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div v-if="!loading && sorted.length" class="qct-foot">
        <Pagination v-model:page="page" v-model:page-size="pageSize" :total-items="sorted.length" />
      </div>
    </div>

    <!-- ── Mobile Card List (≤480px) ── -->
    <div class="qct-mobile-list">
      <template v-if="loading">
        <div v-for="n in 4" :key="n" class="qct-mobile-shimmer"></div>
      </template>
      <div v-else-if="!filtered.length" class="qct-mobile-empty">
        <div class="qct-empty-title">{{ list.length ? 'No templates match your filters' : 'No QC Templates found' }}</div>
        <div class="qct-empty-sub">{{ list.length ? 'Try a different search, type or scope.' : 'Templates define the parameters inspectors check during a QC Inspection' }}</div>
        <button v-if="!list.length" type="button" class="qct-btn-new qct-empty-btn" :disabled="!$canCreate('inventory')" @click="openCreate">
          <span v-html="icon('plus',16)"></span> Create Template
        </button>
      </div>
      <div v-else v-for="t in paginated" :key="t.name" class="qct-mob-card" @click="openView(t)">
        <div class="qct-mob-top">
          <div class="qct-name-cell" style="min-width:0">
            <span class="qct-tpl-ico">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </span>
            <span class="qct-mob-name">{{ t.template_name }}</span>
          </div>
          <span class="qct-param-count" style="flex-shrink:0">{{ t.parameter_count || 0 }} params</span>
        </div>
        <div class="qct-mob-badges">
          <span class="qct-type-badge" :style="typeStyle(t.inspection_type)">{{ t.inspection_type || 'All' }}</span>
          <span v-if="t.item" class="qct-item-badge">{{ t.item }}</span>
          <span v-else class="qct-generic-badge">Generic</span>
          <span v-if="t.item_group" class="qct-mob-group">{{ t.item_group }}</span>
        </div>
        <div v-if="t.description" class="qct-mob-desc">{{ t.description }}</div>
        <div class="qct-mob-footer" @click.stop>
          <span class="qct-mob-footer-hint">Tap to view details</span>
          <div style="display:flex;gap:6px">
            <button type="button" class="qct-act" :disabled="!$canEdit('inventory')" aria-label="Edit template" @click.stop="openEdit(t)"><span v-html="icon('edit',16)"></span></button>
            <button type="button" class="qct-act" aria-label="View template" @click.stop="openView(t)"><span v-html="icon('eye',16)"></span></button>
            <button type="button" class="qct-act qct-act-del" :disabled="!$canDelete('inventory')" aria-label="Delete template" @click.stop="deleteTemplate(t)"><span v-html="icon('trash',16)"></span></button>
          </div>
        </div>
      </div>
      <div v-if="!loading && sorted.length" class="qct-foot qct-foot-mobile">
        <Pagination v-model:page="page" v-model:page-size="pageSize" :total-items="sorted.length" />
      </div>
    </div>

    <!-- Scope dropdown list (fixed so cards never clip it) -->
    <ul v-if="ddOpen" class="qct-dd" :style="ddStyle" role="listbox" @mousedown.prevent>
      <li v-for="(o, i) in scopeOptions" :key="o.value" role="option" class="qct-dd-opt"
        :class="{ selected: o.value === filterScope, active: i === ddIndex }" :aria-selected="o.value === filterScope"
        @mouseenter="ddIndex = i" @click="pickDD(o)">
        <span class="qct-dd-label">{{ o.label }}</span>
        <span v-if="o.value === filterScope" class="qct-dd-check" v-html="icon('check',16)"></span>
      </li>
    </ul>

    <!-- ── Create Drawer ── -->
    <div v-if="createOpen" class="qct-overlay" @click.self="createOpen=false"></div>
    <div class="qct-drawer qct-pro" :class="{open: createOpen}" role="dialog" aria-modal="true" aria-label="New QC Template">
      <div class="qct-pro-head">
        <span class="qct-pro-head-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg></span>
        <div class="qct-pro-head-txt">
          <div class="qct-pro-title">New QC Template</div>
          <div class="qct-pro-sub">Define parameters for quality inspection</div>
        </div>
        <button type="button" class="qct-pro-close" aria-label="Close" @click="createOpen=false"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>

      <div class="qct-pro-body">
        <div class="qct-pro-sec"><span class="qct-pro-sec-ico"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span>Basic Information</div>

        <div class="qct-pro-grid">
          <div class="qct-pro-field qct-full">
            <label class="qct-pro-label" for="qct-new-name"><span class="qct-pro-lico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></span>Template Name <span class="req">*</span></label>
            <div class="qct-pro-ctl">
              <input id="qct-new-name" v-model="form.template_name" class="qct-pro-input" placeholder="e.g. Incoming Raw Material Check" />
            </div>
          </div>

          <div class="qct-pro-field">
            <label class="qct-pro-label"><span class="qct-pro-lico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></span>Item <span class="opt">(Optional)</span></label>
            <div class="qct-pro-ctl qct-pro-ss">
              <SearchableSelect v-model="form.item" :options="items" placeholder="Search item code…" value-key="value" label-key="label" />
              <span class="qct-pro-chev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></span>
            </div>
            <span v-if="form.item" class="qct-pro-hint">Template will apply only to this item</span>
          </div>

          <div class="qct-pro-field">
            <label class="qct-pro-label"><span class="qct-pro-lico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>Item Group <span class="opt">(Optional)</span></label>
            <div class="qct-pro-ctl qct-pro-ss">
              <SearchableSelect v-model="form.item_group" :options="itemGroups" placeholder="Search item group…" value-key="value" label-key="label" />
              <span class="qct-pro-chev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></span>
            </div>
            <span v-if="form.item_group" class="qct-pro-hint">Template will apply to all items in this group</span>
          </div>

          <div class="qct-pro-field qct-full">
            <label class="qct-pro-label" for="qct-new-type"><span class="qct-pro-lico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>Applicable Inspection Type</label>
            <div class="qct-pro-ctl">
              <select id="qct-new-type" v-model="form.inspection_type" class="qct-pro-input qct-pro-select">
                <option value="Incoming">Incoming — purchasing goods</option>
              </select>
              <span class="qct-pro-chev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></span>
            </div>
          </div>

          <div class="qct-pro-field qct-full">
            <label class="qct-pro-label" for="qct-new-desc"><span class="qct-pro-lico"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg></span>Description</label>
            <textarea id="qct-new-desc" v-model="form.description" rows="3" class="qct-pro-textarea" placeholder="Optional notes about this template…"></textarea>
          </div>
        </div>

        <div class="qct-pro-sec qct-pro-sec-params">
          <span class="qct-pro-sec-ico"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span>Inspection Parameters
          <button type="button" class="qct-pro-add" @click="addParam"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Parameter</button>
        </div>

        <div v-if="form.parameters.length === 0" class="qct-pro-empty">
          <span class="qct-pro-empty-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></span>
          <span>No parameters yet — click "Add Parameter" to define what inspectors should check</span>
        </div>

        <div v-for="(p, i) in form.parameters" :key="i" class="qct-pro-param">
          <div class="qct-pro-param-head">
            <span class="qct-pro-param-num">{{ i + 1 }}</span>
            <span class="qct-pro-param-name">{{ p.parameter || 'New Parameter' }}</span>
            <button type="button" class="qct-pro-param-del" aria-label="Remove parameter" @click="removeParam(i)"><span v-html="icon('x', 14)"></span></button>
          </div>
          <div class="qct-pro-param-grid">
            <div class="qct-pro-field">
              <label class="qct-pro-label">Parameter Name <span class="req">*</span></label>
              <div class="qct-pro-ctl"><input v-model="p.parameter" class="qct-pro-input qct-pro-input-sm" placeholder="e.g. Moisture Content" /></div>
            </div>
            <div class="qct-pro-field">
              <label class="qct-pro-label">Type</label>
              <div class="qct-pro-ctl">
                <select v-model="p.parameter_type" class="qct-pro-input qct-pro-input-sm qct-pro-select">
                  <option value="Numeric">Numeric (min/max range)</option>
                  <option value="Non-Numeric">Non-Numeric (expected value)</option>
                  <option value="Formula">Formula</option>
                </select>
                <span class="qct-pro-chev"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></span>
              </div>
            </div>
            <template v-if="p.parameter_type === 'Numeric'">
              <div class="qct-pro-field">
                <label class="qct-pro-label">Min Value</label>
                <div class="qct-pro-ctl"><input v-model.number="p.min_value" type="number" step="any" class="qct-pro-input qct-pro-input-sm" placeholder="0" /></div>
              </div>
              <div class="qct-pro-field">
                <label class="qct-pro-label">Max Value</label>
                <div class="qct-pro-ctl"><input v-model.number="p.max_value" type="number" step="any" class="qct-pro-input qct-pro-input-sm" placeholder="100" /></div>
              </div>
            </template>
            <template v-else-if="p.parameter_type === 'Non-Numeric'">
              <div class="qct-pro-field qct-full">
                <label class="qct-pro-label">Acceptance Criteria Value</label>
                <div class="qct-pro-ctl"><input v-model="p.acceptance_criteria_value" class="qct-pro-input qct-pro-input-sm" placeholder="e.g. No visible defects" /></div>
              </div>
            </template>
            <template v-else>
              <div class="qct-pro-field qct-full">
                <label class="qct-pro-label">Formula</label>
                <div class="qct-pro-ctl"><input v-model="p.formula" class="qct-pro-input qct-pro-input-sm" placeholder="e.g. reading >= 4.5 and reading <= 5.5" /></div>
                <span class="qct-pro-hint">Only the variable <code>reading</code> and <code>flt(...)</code> are available — no other parameter names, e.g. <code>flt(reading) &gt; 0</code>.</span>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="qct-pro-foot">
        <button type="button" class="qct-pro-btn-ghost" @click="createOpen=false">Cancel</button>
        <button type="button" class="qct-pro-btn-primary" :disabled="saving || !$canCreate('inventory')" @click="saveTemplate">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>{{ saving ? 'Saving…' : 'Save Template' }}
        </button>
      </div>
    </div>

    <!-- ── View / Edit Drawer ── -->
    <div v-if="viewOpen" class="qct-overlay" @click.self="viewOpen=false"></div>
    <div class="qct-drawer qct-view-drawer" :class="{open: viewOpen}">
      <template v-if="viewDoc">
        <div class="qct-dheader">
          <button class="qct-dclose" @click="viewOpen=false"><span v-html="icon('x', 16)"></span></button>
          <div class="qct-dh-top">
            <div class="qct-dh-ico">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div>
              <div class="qct-dh-title">{{ viewDoc.template_name }}</div>
              <div class="qct-dh-sub">{{ viewDoc.inspection_type || 'All' }} · {{ (viewDoc.parameters || []).length }} parameter(s)</div>
            </div>
            <span class="qct-type-badge" :style="typeStyle(viewDoc.inspection_type)" style="margin-left:auto;flex-shrink:0">
              {{ viewDoc.inspection_type || 'All' }}
            </span>
          </div>
        </div>
        <div class="qct-dbody">

          <!-- Summary -->
          <div class="qct-summary-grid">
            <div class="qct-sum-item">
              <span class="qct-sum-lbl">Item</span>
              <span class="qct-sum-val">{{ viewDoc.item || 'Generic (all items)' }}</span>
            </div>
            <div class="qct-sum-item">
              <span class="qct-sum-lbl">Item Group</span>
              <span class="qct-sum-val">{{ viewDoc.item_group || '—' }}</span>
            </div>
            <div class="qct-sum-item">
              <span class="qct-sum-lbl">Parameters</span>
              <span class="qct-sum-val" style="color:#2563eb;font-weight:700">{{ (viewDoc.parameters || []).length }}</span>
            </div>
            <div class="qct-sum-item">
              <span class="qct-sum-lbl">Inspection Type</span>
              <span class="qct-sum-val">{{ viewDoc.inspection_type || 'All' }}</span>
            </div>
          </div>

          <div v-if="viewDoc.description" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:13px;color:#374151">
            {{ viewDoc.description }}
          </div>

          <!-- Parameters table -->
          <div v-if="viewLoading">
            <div v-for="n in 3" :key="n" class="qct-shimmer" style="height:48px;margin-bottom:8px;border-radius:8px"></div>
          </div>
          <div v-else-if="(viewDoc.parameters || []).length">
            <div class="qct-view-sec-lbl">Parameters ({{ viewDoc.parameters.length }})</div>
            <table class="qct-params-tbl">
              <thead><tr>
                <th>#</th>
                <th>Parameter Name</th>
                <th>Type</th>
                <th>Range / Criteria</th>
              </tr></thead>
              <tbody>
                <tr v-for="(p, i) in viewDoc.parameters" :key="p.name || i">
                  <td style="color:#9ca3af;font-size:11px;font-weight:700;width:28px">{{ i + 1 }}</td>
                  <td style="font-weight:600;font-size:13px">{{ p.parameter }}</td>
                  <td><span class="qct-type-mini" :style="paramTypeStyle(p.parameter_type)">{{ p.parameter_type }}</span></td>
                  <td style="font-size:12px;color:#374151">
                    <template v-if="p.parameter_type === 'Numeric'">
                      {{ p.min_value ?? '—' }} → {{ p.max_value ?? '—' }}
                    </template>
                    <template v-else-if="p.parameter_type === 'Non-Numeric'">
                      {{ p.acceptance_criteria_value || '—' }}
                    </template>
                    <template v-else>
                      <code style="font-size:11px;background:#f3f4f6;padding:2px 6px;border-radius:4px">{{ p.formula || '—' }}</code>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="qct-param-empty">No parameters defined for this template</div>

          <div class="inv-view-footer" v-if="viewDoc.owner">
            Created by {{ ownerName(viewDoc.owner) }} on {{ fmtDate(viewDoc.creation) }}
            <template v-if="viewDoc.modified_by"> · Last modified by {{ ownerName(viewDoc.modified_by) }} on {{ fmtDate(viewDoc.modified) }}</template>
          </div>
        </div>
        <div class="qct-dfooter">
          <button class="qct-btn-ghost" @click="viewOpen=false">Close</button>
          <button class="qct-btn-edit" :disabled="!$canEdit('inventory')" :title="!$canEdit('inventory') ? 'Read-only access' : ''" @click="openEdit(viewDoc); viewOpen=false">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit
          </button>
          <button class="qct-act-btn qct-act-del" style="padding:8px 14px;border-radius:8px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px" :disabled="!$canDelete('inventory')" :title="!$canDelete('inventory') ? 'Not permitted' : ''" @click="deleteTemplate(viewDoc)">
            <span v-html="icon('trash', 13)"></span> Delete
          </button>
        </div>
      </template>
    </div>

    <!-- ── Edit Drawer ── -->
    <div v-if="editOpen" class="qct-overlay" @click.self="editOpen=false"></div>
    <div class="qct-drawer" :class="{open: editOpen}">
      <div class="qct-dheader" style="background:linear-gradient(135deg,#1e3a5f,#2563eb)">
        <button class="qct-dclose" @click="editOpen=false"><span v-html="icon('x', 16)"></span></button>
        <div class="qct-dh-top">
          <div class="qct-dh-ico">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
          <div>
            <div class="qct-dh-title">Edit QC Template</div>
            <div class="qct-dh-sub">{{ editForm._name }}</div>
          </div>
        </div>
      </div>
      <div class="qct-dbody">
        <div class="qct-section-lbl">Basic Information</div>
        <div class="qct-fields-grid">
          <div class="qct-field" style="grid-column:1/-1">
            <label class="qct-label">Template Name <span class="req">*</span></label>
            <input v-model="editForm.template_name" class="qct-input" placeholder="e.g. Incoming Raw Material Check" />
          </div>
          <div class="qct-field">
            <label class="qct-label">Item <span style="font-weight:400;color:#9ca3af">(Optional)</span></label>
            <SearchableSelect
              v-model="editForm.item"
              :options="items"
              placeholder="Search item code…"
              value-key="value"
              label-key="label"
            />
          </div>
          <div class="qct-field">
            <label class="qct-label">Item Group <span style="font-weight:400;color:#9ca3af">(Optional)</span></label>
            <SearchableSelect
              v-model="editForm.item_group"
              :options="itemGroups"
              placeholder="Search item group…"
              value-key="value"
              label-key="label"
            />
          </div>
          <div class="qct-field" style="grid-column:1/-1">
            <label class="qct-label">Applicable Inspection Type</label>
            <select v-model="editForm.inspection_type" class="qct-select-full">
              <option value="Incoming">Incoming — purchasing goods</option>
            </select>
          </div>
          <div class="qct-field" style="grid-column:1/-1">
            <label class="qct-label">Description</label>
            <textarea v-model="editForm.description" rows="2" class="qct-input" placeholder="Optional notes about this template…"></textarea>
          </div>
        </div>

        <div class="qct-section-lbl" style="margin-top:4px">
          Inspection Parameters
          <button class="qct-add-param-btn" @click="addEditParam">
            <span v-html="icon('plus', 11)"></span> Add Parameter
          </button>
        </div>

        <div v-if="editForm.parameters.length === 0" class="qct-param-empty">
          No parameters yet — click "Add Parameter" to define what inspectors should check
        </div>

        <div v-for="(p, i) in editForm.parameters" :key="i" class="qct-param-card">
          <div class="qct-param-header">
            <span class="qct-param-num">{{ i + 1 }}</span>
            <span style="font-size:12.5px;font-weight:600;color:#374151;flex:1">
              {{ p.parameter || 'New Parameter' }}
            </span>
            <button class="qct-param-del" @click="removeEditParam(i)"><span v-html="icon('x', 12)"></span></button>
          </div>
          <div class="qct-param-fields">
            <div class="qct-field">
              <label class="qct-label">Parameter Name <span class="req">*</span></label>
              <input v-model="p.parameter" class="qct-input qct-input-sm" placeholder="e.g. Moisture Content" />
            </div>
            <div class="qct-field">
              <label class="qct-label">Type</label>
              <select v-model="p.parameter_type" class="qct-select-full qct-input-sm">
                <option value="Numeric">Numeric (min/max range)</option>
                <option value="Non-Numeric">Non-Numeric (expected value)</option>
                <option value="Formula">Formula</option>
              </select>
            </div>
            <template v-if="p.parameter_type === 'Numeric'">
              <div class="qct-field">
                <label class="qct-label">Min Value</label>
                <input v-model.number="p.min_value" type="number" step="any" class="qct-input qct-input-sm" placeholder="0" />
              </div>
              <div class="qct-field">
                <label class="qct-label">Max Value</label>
                <input v-model.number="p.max_value" type="number" step="any" class="qct-input qct-input-sm" placeholder="100" />
              </div>
            </template>
            <template v-else-if="p.parameter_type === 'Non-Numeric'">
              <div class="qct-field" style="grid-column:1/-1">
                <label class="qct-label">Acceptance Criteria Value</label>
                <input v-model="p.acceptance_criteria_value" class="qct-input qct-input-sm" placeholder="e.g. No visible defects" />
              </div>
            </template>
            <template v-else>
              <div class="qct-field" style="grid-column:1/-1">
                <label class="qct-label">Formula</label>
                <input v-model="p.formula" class="qct-input qct-input-sm" placeholder="e.g. reading >= 4.5 and reading <= 5.5" />
                <span style="font-size:11px;color:#6b7280;margin-top:2px">Only the variable <code>reading</code> and <code>flt(...)</code> are available — no other parameter names, e.g. <code>flt(reading) &gt; 0</code>.</span>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="qct-dfooter">
        <button class="qct-btn-ghost" @click="editOpen=false">Cancel</button>
        <button class="qct-btn-primary" :disabled="editSaving || !$canEdit('inventory')" @click="updateTemplate">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          {{ editSaving ? 'Saving…' : 'Save Changes' }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from "vue";
import { apiCall, apiList } from "../api/client.js";
import { fmtDate } from "../utils/format.js";
import { ownerName } from "../utils/userNames.js";
import { useToast } from "../composables/useToast.js";
import { icon } from "../utils/icons.js";
import SearchableSelect from "../components/SearchableSelect.vue";
import Pagination from "../components/Pagination.vue";

const { toast } = useToast();

// ── State ──────────────────────────────────────────────────────────────────────
const list        = ref([]);
const loading     = ref(false);
const createOpen  = ref(false);
const viewOpen    = ref(false);
const viewDoc     = ref(null);
const viewLoading = ref(false);
const editOpen    = ref(false);
const editSaving  = ref(false);
const saving      = ref(false);
const search      = ref("");
const filterType  = ref("");
const filterScope = ref("");
const page        = ref(1);
const pageSize    = ref(25);
const sortCol     = ref("template_name");
const sortDir     = ref("asc");

// ── Dropdown data ──────────────────────────────────────────────────────────────
const items      = ref([]);
const itemGroups = ref([]);

const form = reactive({
  template_name:  "",
  item:           "",
  item_group:     "",
  inspection_type: "Incoming",
  description:    "",
  parameters:     [],
});

const editForm = reactive({
  _name:          "",
  template_name:  "",
  item:           "",
  item_group:     "",
  inspection_type: "Incoming",
  description:    "",
  parameters:     [],
});

// ── Type helpers ───────────────────────────────────────────────────────────────
const TYPE_COLOR = {
  "All":        "#6b7280",
  "Incoming":   "#0891b2",
  "Outgoing":   "#ea580c",
  "In Process": "#7c3aed",
};
function typeStyle(t) {
  const c = TYPE_COLOR[t] || TYPE_COLOR["All"];
  return `background:${c}18;color:${c};border:1px solid ${c}33`;
}
function paramTypeStyle(pt) {
  if (pt === "Numeric")     return "background:#eff6ff;color:#2563eb";
  if (pt === "Non-Numeric") return "background:#f0fdf4;color:#16a34a";
  return "background:#faf5ff;color:#7c3aed";
}

// ── Computed ───────────────────────────────────────────────────────────────────
const avgParams = computed(() => {
  if (!list.value.length) return 0;
  const total = list.value.reduce((s, t) => s + (t.parameter_count || 0), 0);
  return Math.round(total / list.value.length);
});

const scopeCounts = computed(() => ({
  specific: list.value.filter(t => t.item).length,
  generic:  list.value.filter(t => !t.item).length,
}));

const typeTabs = computed(() => {
  const n = k => list.value.filter(t => (t.inspection_type || "All") === k).length;
  return [
    { key: "",           label: "All",        color: "",        cnt: list.value.length },
    { key: "Incoming",   label: "Incoming",   color: TYPE_COLOR["Incoming"],   cnt: n("Incoming") },
    { key: "Outgoing",   label: "Outgoing",   color: TYPE_COLOR["Outgoing"],   cnt: n("Outgoing") },
    { key: "In Process", label: "In Process", color: TYPE_COLOR["In Process"], cnt: n("In Process") },
    { key: "All",        label: "Any Type",   color: TYPE_COLOR["All"],        cnt: n("All") },
  ];
});

const filtered = computed(() => {
  let r = list.value;
  if (filterType.value)  r = r.filter(t => (t.inspection_type || "All") === filterType.value);
  if (filterScope.value === "specific") r = r.filter(t => t.item);
  if (filterScope.value === "generic")  r = r.filter(t => !t.item);
  if (search.value.trim()) {
    const q = search.value.toLowerCase();
    r = r.filter(t =>
      (t.template_name || "").toLowerCase().includes(q) ||
      (t.item          || "").toLowerCase().includes(q) ||
      (t.description   || "").toLowerCase().includes(q)
    );
  }
  return r;
});

const sorted = computed(() => {
  const col = sortCol.value;
  return [...filtered.value].sort((a, b) => {
    const av = a[col] ?? "", bv = b[col] ?? "";
    const c = (typeof av === "number" && typeof bv === "number")
      ? av - bv
      : String(av).localeCompare(String(bv), undefined, { numeric: true });
    return sortDir.value === "asc" ? c : -c;
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(sorted.value.length / pageSize.value)));
const paginated  = computed(() => {
  const s = (page.value - 1) * pageSize.value;
  return sorted.value.slice(s, s + pageSize.value);
});

// Back to page 1 whenever the result set changes.
watch([search, filterType, filterScope, pageSize], () => { page.value = 1; });

// ── Row selection (Export CSV exports the selection when there is one) ─────────
const selected = ref([]);
const allOnPageSelected = computed(() =>
  paginated.value.length > 0 && paginated.value.every(t => selected.value.includes(t.name)));
function toggleAll(e) {
  const names = paginated.value.map(t => t.name);
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
  selected.value.length ? sorted.value.filter(t => selected.value.includes(t.name)) : sorted.value);

// ── Scope dropdown ─────────────────────────────────────────────────────────────
const ddOpen = ref(false);
const ddStyle = ref({});
const ddIndex = ref(0);
const scopeOptions = [
  { value: "",         label: "All Scopes" },
  { value: "specific", label: "Item-Specific" },
  { value: "generic",  label: "Generic" },
];
const scopeLabel = computed(() => (scopeOptions.find(o => o.value === filterScope.value) || scopeOptions[0]).label);
function toggleDD(ev) {
  if (ddOpen.value) { ddOpen.value = false; return; }
  const rect = ev.currentTarget.closest(".qct-ctl").getBoundingClientRect();
  const below = window.innerHeight - rect.bottom - 12;
  const up = below < 200 && rect.top > below;
  ddStyle.value = {
    left: rect.left + "px", minWidth: Math.max(rect.width, 200) + "px",
    ...(up ? { bottom: (window.innerHeight - rect.top + 6) + "px" } : { top: (rect.bottom + 6) + "px" }),
  };
  ddIndex.value = Math.max(0, scopeOptions.findIndex(o => o.value === filterScope.value));
  ddOpen.value = true;
}
function pickDD(o) { filterScope.value = o.value; ddOpen.value = false; }
function ddKey(e) {
  if (!ddOpen.value) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); toggleDD(e); }
    return;
  }
  const n = scopeOptions.length;
  if (e.key === "ArrowDown") { e.preventDefault(); ddIndex.value = (ddIndex.value + 1) % n; }
  else if (e.key === "ArrowUp") { e.preventDefault(); ddIndex.value = (ddIndex.value - 1 + n) % n; }
  else if (e.key === "Enter") { e.preventDefault(); pickDD(scopeOptions[ddIndex.value]); }
  else if (e.key === "Escape" || e.key === "Tab") { ddOpen.value = false; }
}
function onDocPointer(e) {
  if (ddOpen.value && !e.target.closest(".qct-dd") && !e.target.closest(".qct-ctl-select")) ddOpen.value = false;
}
function closeDD() { ddOpen.value = false; }

function sort(col) {
  if (sortCol.value === col) sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  else { sortCol.value = col; sortDir.value = "asc"; }
}
function sortArrow(col) {
  if (sortCol.value !== col) return "⇕";
  return sortDir.value === "asc" ? "▲" : "▼";
}

// ── API ────────────────────────────────────────────────────────────────────────
async function load() {
  loading.value = true;
  try {
    const res = await apiCall("psd_books.api.qc.get_templates", {});
    const templates = res?.message || res || [];
    // Fetch parameter counts in one pass via detail calls (or use the count from list)
    list.value = templates.map(t => ({ ...t, parameter_count: t.parameter_count ?? null }));
  } catch (e) {
    toast.error(e.message || "Failed to load QC Templates");
  } finally {
    loading.value = false;
  }
}

async function openView(t) {
  viewDoc.value = { ...t };
  viewOpen.value = true;
  viewLoading.value = true;
  try {
    const res = await apiCall("psd_books.api.qc.get_template_detail", { template_name: t.name || t.template_name });
    if (res?.message) viewDoc.value = res.message;
    else if (res)     viewDoc.value = res;
  } catch { /* keep list row */ }
  viewLoading.value = false;
}

function openCreate() {
  Object.assign(form, {
    template_name:  "",
    item:           "",
    item_group:     "",
    inspection_type: "Incoming",
    description:    "",
    parameters:     [],
  });
  // Load dropdowns when drawer opens
  fetchItems("");
  fetchItemGroups("");
  createOpen.value = true;
}

function addParam() {
  form.parameters.push({
    parameter:                 "",
    parameter_type:           "Numeric",
    min_value:                null,
    max_value:                null,
    acceptance_criteria_value: "",
    formula:                  "",
  });
}

// ── Dropdown fetchers ──────────────────────────────────────────────────────────
async function fetchItems(q = "") {
  try {
    const rows = await apiList("Item", {
      fields:  ["name", "item_name"],
      filters: [["disabled", "=", 0], ...(q ? [["name", "like", `%${q}%`]] : [])],
      limit:   50,
      order:   "item_name asc",
    });
    items.value = rows.map(r => ({ value: r.name, label: r.item_name ? `${r.name} — ${r.item_name}` : r.name }));
  } catch { items.value = []; }
}

async function fetchItemGroups(q = "") {
  try {
    const rows = await apiList("Item Group", {
      fields:  ["name"],
      filters: [["is_group", "=", 0], ...(q ? [["name", "like", `%${q}%`]] : [])],
      limit:   50,
      order:   "name asc",
    });
    itemGroups.value = rows.map(r => ({ value: r.name, label: r.name }));
  } catch { itemGroups.value = []; }
}

function removeParam(i) {
  form.parameters.splice(i, 1);
}

async function saveTemplate() {
  if (!form.template_name.trim()) {
    return toast.error("Template Name is required.");
  }
  saving.value = true;
  try {
    await apiCall("frappe.client.insert", {
      doc: {
        doctype: "QC Inspection Template",
        template_name: form.template_name.trim(),
        item:           form.item.trim() || null,
        item_group:     form.item_group.trim() || null,
        inspection_type: form.inspection_type,
        description:    form.description.trim() || null,
        parameters: form.parameters.map((p, i) => ({
          doctype:                  "QC Inspection Template Parameter",
          idx:                      i + 1,
          parameter:                 p.parameter,
          parameter_type:           p.parameter_type,
          min_value:                p.parameter_type === "Numeric"     ? (p.min_value ?? null) : null,
          max_value:                p.parameter_type === "Numeric"     ? (p.max_value ?? null) : null,
          acceptance_criteria_value: p.parameter_type === "Non-Numeric" ? p.acceptance_criteria_value : null,
          formula:                  p.parameter_type === "Formula"     ? p.formula : null,
        })),
      },
    });
    toast.success(`Template "${form.template_name}" created`);
    createOpen.value = false;
    await load();
  } catch (e) {
    toast.error(e.message || "Failed to save template");
  } finally {
    saving.value = false;
  }
}

async function deleteTemplate(t) {
  const name = t.name || t.template_name;
  try {
    const res = await apiCall("psd_books.api.qc.check_template_usage", { template_name: name });
    const usage = res?.message || res || {};
    const count = usage.inspection_count || 0;
    if (count > 0) {
      return toast.error(
        `Cannot delete "${t.template_name}" — it is used by ${count} QC Inspection${count === 1 ? "" : "s"}.`
      );
    }
  } catch (e) {
    // If the usage check itself fails, don't silently allow an unchecked delete.
    return toast.error(e.message || "Failed to verify template usage before delete");
  }
  if (!confirm(`Delete template "${t.template_name}"? This cannot be undone.`)) return;
  try {
    await apiCall("frappe.client.delete", { doctype: "QC Inspection Template", name });
    toast.success(`Template "${t.template_name}" deleted`);
    viewOpen.value = false;
    await load();
  } catch (e) {
    toast.error(e.message || "Failed to delete template");
  }
}

// ── Edit Template ──────────────────────────────────────────────────────────────
async function openEdit(t) {
  // Fetch full detail first so we have all parameters
  let detail = { ...t };
  try {
    const res = await apiCall("psd_books.api.qc.get_template_detail", { template_name: t.name || t.template_name });
    if (res?.message) detail = res.message;
    else if (res)     detail = res;
  } catch { /* fall back to list row */ }

  Object.assign(editForm, {
    _name:           detail.name || detail.template_name || "",
    template_name:   detail.template_name || "",
    item:            detail.item            || "",
    item_group:      detail.item_group      || "",
    inspection_type: "Incoming",
    description:     detail.description     || "",
    parameters: (detail.parameters || []).map(p => ({
      name:                      p.name || "",
      parameter:                 p.parameter || "",
      parameter_type:            p.parameter_type || "Numeric",
      min_value:                 p.min_value ?? null,
      max_value:                 p.max_value ?? null,
      acceptance_criteria_value: p.acceptance_criteria_value || "",
      formula:                   p.formula || "",
    })),
  });
  // Load dropdowns
  fetchItems("");
  fetchItemGroups("");
  editOpen.value = true;
}

function addEditParam() {
  editForm.parameters.push({
    name: "",
    parameter:                 "",
    parameter_type:           "Numeric",
    min_value:                null,
    max_value:                null,
    acceptance_criteria_value: "",
    formula:                  "",
  });
}

function removeEditParam(i) {
  editForm.parameters.splice(i, 1);
}

async function updateTemplate() {
  if (!editForm.template_name.trim()) {
    return toast.error("Template Name is required.");
  }
  editSaving.value = true;
  try {
    const docName = editForm._name;
    // Single atomic backend call — loads the doc via frappe.get_doc() so its
    // `modified` timestamp always matches the DB row (avoids a
    // TimestampMismatchError, which a client-built doc dict sent through
    // frappe.client.save would trip on every save) and updates parent
    // fields + the full parameter child table together (no partial,
    // un-rolled-back update if validation fails).
    await apiCall("psd_books.api.qc.update_template", {
      template_name: docName,
      template_name_new: editForm.template_name.trim(),
      item: editForm.item.trim() || null,
      item_group: editForm.item_group.trim() || null,
      inspection_type: editForm.inspection_type,
      description: editForm.description.trim() || null,
      parameters_json: editForm.parameters.map(p => ({
        parameter:                 p.parameter,
        parameter_type:            p.parameter_type,
        min_value:                 p.parameter_type === "Numeric"     ? (p.min_value ?? null) : null,
        max_value:                 p.parameter_type === "Numeric"     ? (p.max_value ?? null) : null,
        acceptance_criteria_value: p.parameter_type === "Non-Numeric" ? p.acceptance_criteria_value : null,
        formula:                   p.parameter_type === "Formula"     ? p.formula : null,
      })),
    });
    toast.success(`Template "${editForm.template_name}" updated`);
    editOpen.value = false;
    await load();
  } catch (e) {
    toast.error(e.message || "Failed to update template");
  } finally {
    editSaving.value = false;
  }
}

function exportCSV() {
  const rows = exportRows.value;
  if (!rows.length) return;
  const esc = v => { const s = v == null ? "" : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  const hdr = ["Template Name", "Item", "Item Group", "Inspection Type", "Parameters", "Description"];
  const lines = [hdr.join(",")];
  for (const t of rows) {
    lines.push([
      t.template_name, t.item || "", t.item_group || "",
      t.inspection_type || "All", t.parameter_count || 0, t.description || "",
    ].map(esc).join(","));
  }
  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `qc_templates_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click(); URL.revokeObjectURL(url);
  toast.success(`Exported ${rows.length} template(s)`);
}

onMounted(() => {
  load();
  document.addEventListener("mousedown", onDocPointer);
  window.addEventListener("scroll", closeDD, true);
  window.addEventListener("resize", closeDD);
});
onUnmounted(() => {
  document.removeEventListener("mousedown", onDocPointer);
  window.removeEventListener("scroll", closeDD, true);
  window.removeEventListener("resize", closeDD);
});
</script>

<style scoped>
.qct-page {
  --qc-blue:#1a6ef7; --qc-blue-dark:#1558d6; --qc-ink:#0f172a; --qc-text:#334155; --qc-muted:#64748b; --qc-line:#e8edf3;
  display:flex; flex-direction:column; gap:20px; padding:24px; min-width:0; color:var(--qc-text);
}

/* KPI cards */
.qct-kpis { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:16px; min-width:0; }
.qct-kpi {
  --tint:#f3f7ff; --edge:#dbe6fb; --ico-bg:#e1ecfd; --ico:#2f6df0; --val:var(--qc-ink);
  display:flex; align-items:center; gap:18px; min-width:0; padding:20px 22px; text-align:left; font:inherit;
  border:1px solid var(--edge); border-radius:16px; cursor:pointer;
  background:linear-gradient(135deg, var(--tint), #fff 85%); transition:box-shadow .15s, border-color .15s;
}
.qct-kpi.static { cursor:default; }
.qct-kpi:not(.static):hover { box-shadow:0 4px 14px rgba(15,23,42,.07); }
.qct-kpi.active { border-color:var(--ico); box-shadow:0 0 0 3px color-mix(in srgb, var(--ico) 18%, transparent); }
.qct-kpi:focus-visible { outline:2px solid var(--qc-blue); outline-offset:2px; }
.qct-kpi-ico { width:60px; height:60px; flex-shrink:0; display:inline-flex; align-items:center; justify-content:center; border-radius:16px; background:var(--ico-bg); color:var(--ico); }
.qct-kpi-txt { display:flex; flex-direction:column; gap:4px; min-width:0; }
.qct-kpi-lbl { font-size:12.5px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:var(--qc-muted); }
.qct-kpi-val { font-size:30px; font-weight:700; line-height:1.05; color:var(--val); }
.k-spec { --tint:#ecfaf2; --edge:#cdeedb; --ico-bg:#d3f3e1; --ico:#16a34a; --val:#15803d; }
.k-gen  { --tint:#f6f0ff; --edge:#e7dcfb; --ico-bg:#ece1fc; --ico:#7c3aed; --val:#7c3aed; }
.k-avg  { --tint:#fff7e8; --edge:#fde6bd; --ico-bg:#fdecc8; --ico:#e8870c; --val:#d97706; }

/* Filter panel */
.qct-panel { background:#fff; border:1px solid var(--qc-line); border-radius:16px; padding:18px 20px; display:flex; flex-direction:column; gap:16px; box-shadow:0 1px 2px rgba(15,23,42,.03); }
.qct-tabs-row { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
.qct-tabs { display:flex; gap:10px; flex-wrap:wrap; }
.qct-tab { display:inline-flex; align-items:center; gap:8px; height:40px; padding:0 16px; border:1px solid var(--qc-line); border-radius:999px; background:#fff; font:inherit; font-size:14px; font-weight:600; color:var(--qc-text); cursor:pointer; white-space:nowrap; transition:background .15s, border-color .15s, color .15s; }
.qct-tab:hover { border-color:#cbd5e1; }
.qct-tab.active { background:var(--qc-blue); border-color:var(--qc-blue); color:#fff; }
.qct-tab-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
.qct-tab-cnt { min-width:24px; height:24px; padding:0 7px; display:inline-flex; align-items:center; justify-content:center; border-radius:999px; background:#eef2f6; color:var(--qc-muted); font-size:12.5px; font-weight:600; }
.qct-tab.active .qct-tab-cnt { background:rgba(255,255,255,.24); color:#fff; }
.qct-tab:focus-visible, .qct-btn:focus-visible, .qct-btn-new:focus-visible, .qct-act:focus-visible { outline:2px solid var(--qc-blue); outline-offset:2px; }

.qct-btn-new { display:inline-flex; align-items:center; gap:8px; height:42px; padding:0 18px; border:none; border-radius:10px; background:var(--qc-blue); color:#fff; font:inherit; font-size:14px; font-weight:600; cursor:pointer; white-space:nowrap; transition:background .15s; }
.qct-btn-new > span, .qct-btn > span { display:inline-flex; }
.qct-btn-new:hover:not(:disabled) { background:var(--qc-blue-dark); }
.qct-btn-new:disabled { opacity:.5; cursor:not-allowed; }
.qct-empty-btn { margin-top:20px; }

.qct-filters { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
.qct-search { flex:1 1 260px; min-width:200px; display:flex; align-items:center; gap:10px; height:46px; padding:0 16px; border:1px solid var(--qc-line); border-radius:12px; background:#fff; color:#94a3b8; transition:border-color .15s, box-shadow .15s; }
.qct-search:focus-within { border-color:var(--qc-blue); box-shadow:0 0 0 3px rgba(26,110,247,.12); }
.qct-search-ico { display:inline-flex; flex-shrink:0; }
.qct-search-input { border:none; outline:none; background:transparent; width:100%; min-width:0; font:inherit; font-size:14px; color:var(--qc-ink); }
.qct-search-input::placeholder { color:#94a3b8; }
.qct-ctl { height:46px; border:1px solid var(--qc-line); border-radius:12px; background:#fff; font:inherit; font-size:14px; color:var(--qc-ink); transition:border-color .15s, box-shadow .15s; }
.qct-ctl-select { position:relative; display:flex; min-width:170px; }
.qct-ctl-select.open { border-color:var(--qc-blue); box-shadow:0 0 0 3px rgba(26,110,247,.12); }
.qct-trigger { flex:1; height:100%; padding:0 40px 0 16px; border:none; outline:none; background:transparent; font:inherit; font-size:14px; color:var(--qc-ink); text-align:left; cursor:pointer; white-space:nowrap; }
.qct-ctl-select::after { content:""; position:absolute; right:16px; top:50%; width:7px; height:7px; margin-top:-6px; border-right:2px solid var(--qc-ink); border-bottom:2px solid var(--qc-ink); transform:rotate(45deg); pointer-events:none; transition:transform .15s, margin-top .15s; }
.qct-ctl-select.open::after { transform:rotate(-135deg); margin-top:-2px; }
.qct-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; height:46px; padding:0 18px; border:1px solid var(--qc-line); border-radius:12px; background:#fff; color:var(--qc-ink); font:inherit; font-size:14px; font-weight:500; cursor:pointer; white-space:nowrap; transition:background .15s, border-color .15s; }
.qct-btn:hover:not(:disabled) { background:#f8fafc; border-color:#cbd5e1; }
.qct-btn:disabled { opacity:.5; cursor:not-allowed; }
.qct-btn-icon { width:46px; padding:0; }

/* Dropdown list */
.qct-dd { position:fixed; z-index:1100; margin:0; padding:6px; list-style:none; background:#fff; border:1px solid var(--qc-line); border-radius:12px; box-shadow:0 12px 32px rgba(15,23,42,.16), 0 2px 6px rgba(15,23,42,.06); }
.qct-dd-opt { display:flex; align-items:center; gap:10px; min-height:40px; padding:0 12px; border-radius:8px; font-size:14px; color:var(--qc-ink); cursor:pointer; }
.qct-dd-opt.active { background:#f1f5f9; }
.qct-dd-opt.selected { color:var(--qc-blue); font-weight:600; background:#eff5ff; }
.qct-dd-label { flex:1; white-space:nowrap; }
.qct-dd-check { display:inline-flex; color:var(--qc-blue); }

/* Table card */
.qct-tcard { background:#fff; border:1px solid var(--qc-line); border-radius:16px; overflow:hidden; box-shadow:0 1px 2px rgba(15,23,42,.03); }
.qct-scroll { overflow-x:auto; }
.qct-table { width:100%; min-width:980px; border-collapse:collapse; font-size:14px; }
.qct-table th { background:#f8fafc; padding:18px 14px; font-size:12.5px; font-weight:700; letter-spacing:.03em; text-transform:uppercase; color:#475a7a; text-align:left; border-bottom:1px solid var(--qc-line); white-space:nowrap; user-select:none; }
.qct-table th.sortable:hover { color:var(--qc-ink); }
.qct-sort { margin-left:4px; font-size:11px; color:#9aa7bb; letter-spacing:0; }
.qct-th-chk, .qct-td-chk { width:56px; padding-left:20px !important; padding-right:0 !important; }
.qct-th-c, .qct-td-c { text-align:center !important; }
.qct-th-actions { text-align:center !important; }
.qct-table td { padding:16px 14px; border-bottom:1px solid var(--qc-line); vertical-align:middle; color:var(--qc-ink); }
.qct-table tbody tr:last-child td { border-bottom:none; }
.qct-row { cursor:pointer; transition:background .12s; }
.qct-row:hover { background:#f8fafc; }
.qct-row.picked { background:#f2f7ff; }
.qct-chk { width:18px; height:18px; margin:0; accent-color:var(--qc-blue); cursor:pointer; }
.qct-name-cell { display:flex; align-items:center; gap:12px; }
.qct-tpl-ico { width:36px; height:36px; border-radius:10px; background:#e8f0fe; color:var(--qc-blue); display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
.qct-tpl-name { font-weight:600; color:var(--qc-ink); }
.qct-item-badge { display:inline-flex; align-items:center; height:26px; font-size:12.5px; font-weight:600; background:#eff5ff; color:var(--qc-blue); padding:0 12px; border-radius:999px; border:1px solid #cfe0fd; white-space:nowrap; }
.qct-generic-badge { display:inline-flex; align-items:center; height:26px; font-size:12.5px; font-weight:600; background:#f1f5f9; color:var(--qc-muted); padding:0 12px; border-radius:999px; }
.qct-type-badge { display:inline-flex; align-items:center; height:26px; font-size:12.5px; font-weight:600; padding:0 12px; border-radius:999px; white-space:nowrap; }
.qct-type-mini { font-size:10px; font-weight:600; padding:2px 7px; border-radius:10px; }
.qct-param-count { display:inline-flex; align-items:center; justify-content:center; min-width:32px; height:28px; padding:0 10px; font-size:13px; font-weight:700; color:var(--qc-blue); background:#eff5ff; border-radius:999px; white-space:nowrap; }
.qct-muted { color:var(--qc-muted); white-space:nowrap; }
.qct-desc { max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--qc-muted); }
.qct-td-actions { text-align:center; white-space:nowrap; }
.qct-act { width:36px; height:36px; margin:0 3px; display:inline-flex; align-items:center; justify-content:center; border:1px solid var(--qc-line); border-radius:10px; background:#fff; color:var(--qc-text); cursor:pointer; transition:background .15s, border-color .15s, color .15s; }
.qct-act > span { display:inline-flex; }
.qct-act:hover:not(:disabled) { background:#f1f5f9; border-color:#cbd5e1; color:var(--qc-ink); }
.qct-act-del:hover:not(:disabled) { background:#fef2f2; border-color:#fecaca; color:#dc2626; }
.qct-act:disabled { opacity:.4; cursor:not-allowed; }
/* Used by the delete button inside the view drawer */
.qct-act-btn { background:#fff; border:1px solid var(--qc-line); border-radius:8px; padding:5px 7px; cursor:pointer; color:var(--qc-muted); display:inline-flex; align-items:center; }
.qct-act-btn:hover { background:#f3f4f6; }
.qct-act-btn.qct-act-del { color:#dc2626; border-color:#fca5a5; }
.qct-act-btn.qct-act-del:hover { background:#fef2f2; }
.sortable { cursor:pointer; }
.ta-r { text-align:right; }
.ta-c { text-align:center; }

.qct-empty { text-align:center; padding:48px 20px 56px !important; }
.qct-empty-art { display:flex; justify-content:center; margin-bottom:10px; }
.qct-empty-title { font-size:20px; font-weight:700; color:var(--qc-ink); margin-bottom:8px; }
.qct-empty-sub { font-size:14px; color:var(--qc-muted); }
.qct-skel-cell { padding:14px 20px !important; }
.qct-shimmer { height:32px; background:linear-gradient(90deg,#f3f4f6 25%,#e9ecef 50%,#f3f4f6 75%); background-size:200%; animation:shimmer 1.4s infinite; border-radius:6px; }
@keyframes shimmer { 0%{background-position:200%} 100%{background-position:-200%} }

/* Footer pagination */
.qct-foot { border-top:1px solid var(--qc-line); padding:14px 16px; }
.qct-foot :deep(.pg-wrap) { padding:0; border:none; border-radius:0; background:transparent; font-family:inherit; }
.qct-foot :deep(.pg-label), .qct-foot :deep(.pg-summary) { font-size:13.5px; color:var(--qc-muted); }
.qct-foot :deep(.pg-left) { gap:12px; }
.qct-foot :deep(.pg-select) { height:36px; min-width:68px; padding:0 30px 0 12px; font-size:13.5px; color:var(--qc-ink); border:1px solid var(--qc-line); border-radius:10px; }
.qct-foot :deep(.pg-chevron) { right:13px; width:12px; height:8px; }
.qct-foot :deep(.pg-right) { gap:16px; }
.qct-foot :deep(.pg-nav) { gap:6px; }
.qct-foot :deep(.pg-btn) { min-width:36px; height:36px; border:1px solid var(--qc-line); border-radius:10px; font-size:13.5px; }
.qct-foot :deep(.pg-icon-btn svg) { width:16px; height:16px; }
.qct-foot :deep(.pg-btn.pg-page.active) { background:var(--qc-blue); border-color:var(--qc-blue); color:#fff; }

/* Buttons */
.qct-btn-primary { display:inline-flex; align-items:center; gap:6px; background:#1a6ef7; color:#fff; border:none; border-radius:8px; padding:8px 14px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; transition:background .15s; }
.qct-btn-primary:hover { background:#1d4ed8; } .qct-btn-primary:disabled { opacity:.5; cursor:not-allowed; }
.qct-btn-ghost { display:inline-flex; align-items:center; gap:6px; background:#fff; border:1px solid #e5e7eb; border-radius:8px; padding:8px 12px; font-size:13px; color:#374151; cursor:pointer; font-family:inherit; }
.qct-btn-ghost:hover { background:#f9fafb; }
.qct-btn-edit { display:inline-flex; align-items:center; gap:6px; background:#fffbeb; border:1px solid #f59e0b; color:#b45309; border-radius:8px; padding:8px 14px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; }
.qct-btn-edit:hover { background:#fef3c7; }

/* Drawer */
.qct-overlay { position:fixed; inset:0; background:rgba(0,0,0,.35); z-index:998; }
.qct-drawer { position:fixed; right:0; top:0; bottom:0; width:560px; background:#fff; z-index:999; display:flex; flex-direction:column; transform:translateX(100%); transition:transform .25s cubic-bezier(.4,0,.2,1); box-shadow:-4px 0 24px rgba(0,0,0,.12); }
.qct-drawer.open { transform:translateX(0); }
.qct-view-drawer { width:620px; }
.qct-dheader { padding:20px 20px 16px; background:linear-gradient(135deg,#1e3a5f,#2563eb); position:relative; flex-shrink:0; }
.qct-dh-top { display:flex; align-items:center; gap:12px; }
.qct-dh-ico { width:40px; height:40px; border-radius:10px; background:rgba(255,255,255,.2); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.qct-dh-title { font-size:16px; font-weight:700; color:#fff; }
.qct-dh-sub { font-size:12px; color:rgba(255,255,255,.75); margin-top:2px; }
.qct-dclose { position:absolute; top:14px; right:14px; background:rgba(255,255,255,.15); border:none; border-radius:8px; padding:6px; cursor:pointer; color:#fff; display:flex; align-items:center; }
.qct-dclose:hover { background:rgba(255,255,255,.25); }
.qct-dbody { flex:1; overflow-y:auto; padding:18px 20px; display:flex; flex-direction:column; gap:14px; width:100%; box-sizing:border-box; }
.qct-dfooter { padding:14px 20px; border-top:1px solid #e5e7eb; display:flex; gap:8px; justify-content:flex-end; flex-shrink:0; }

/* Create form */
.qct-section-lbl { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:#9ca3af; display:flex; align-items:center; gap:8px; }
.qct-fields-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; min-width:0; }
.qct-field { display:flex; flex-direction:column; gap:4px; min-width:0; }
.qct-label { font-size:12px; font-weight:600; color:#374151; }
.req { color:#ef4444; }
.qct-input { border:1px solid #e5e7eb; border-radius:8px; padding:8px 10px; font:inherit; font-size:13px; outline:none; color:#111827; transition:border-color .15s; width:100%; box-sizing:border-box; }
.qct-input:focus { border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.08); }
.qct-input-sm { padding:6px 8px; font-size:12.5px; }
.qct-select-full { border:1px solid #e5e7eb; border-radius:8px; padding:8px 10px; font:inherit; font-size:13px; outline:none; color:#111827; background:#fff; width:100%; box-sizing:border-box; }
.qct-select-full:focus { border-color:#2563eb; }

/* Parameter cards */
.qct-add-param-btn { margin-left:auto; display:inline-flex; align-items:center; gap:4px; background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe; border-radius:6px; padding:3px 9px; font-size:11.5px; font-weight:600; cursor:pointer; font-family:inherit; }
.qct-add-param-btn:hover { background:#dbeafe; }
.qct-param-empty { text-align:center; padding:20px; color:#9ca3af; font-size:12.5px; background:#f9fafb; border-radius:8px; border:1px dashed #e5e7eb; }
/* NOTE: NO overflow:hidden on param-card — that clips the inputs! */
.qct-param-card { border:1px solid #e5e7eb; border-radius:10px; width:100%; box-sizing:border-box; background:#fff; }
.qct-param-header { background:#f9fafb; padding:10px 12px; display:flex; align-items:center; gap:8px; border-bottom:1px solid #e5e7eb; border-top-left-radius:9px; border-top-right-radius:9px; }
.qct-param-num { width:22px; height:22px; border-radius:50%; background:#2563eb; color:#fff; font-size:10.5px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.qct-param-del { margin-left:auto; flex-shrink:0; background:none; border:none; cursor:pointer; color:#9ca3af; padding:4px; display:flex; align-items:center; border-radius:4px; }
.qct-param-del:hover { color:#dc2626; background:#fee2e2; }
.qct-param-fields { padding:12px; display:grid; grid-template-columns:1fr 1fr; gap:10px; width:100%; box-sizing:border-box; }

/* View sections */
.qct-summary-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; background:#f8fafc; border-radius:8px; padding:12px 14px; border:1px solid #e5e7eb; }
.qct-sum-item { display:flex; flex-direction:column; gap:2px; }
.qct-sum-lbl { font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:#9ca3af; }
.qct-sum-val { font-size:13px; font-weight:600; color:#0f172a; }
.qct-view-sec-lbl { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:#9ca3af; margin-bottom:6px; }
.qct-params-tbl { width:100%; border-collapse:collapse; font-size:13px; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
.qct-params-tbl th { background:#f9fafb; padding:8px 12px; font-size:10.5px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:#6b7280; text-align:left; border-bottom:1px solid #e5e7eb; }
.qct-params-tbl td { padding:10px 12px; border-bottom:1px solid #f3f4f6; vertical-align:middle; }
.qct-params-tbl tr:last-child td { border-bottom:none; }

/* ── Mobile card list: hidden by default, shown ≤480px ── */
.qct-mobile-list { display:none; }

/* ── Responsive ── */
@media (max-width: 1100px) {
  .qct-kpis { grid-template-columns:repeat(2, minmax(0,1fr)); }
}
@media (max-width: 768px) {
  .qct-page { padding:12px; }
  .qct-drawer,.qct-view-drawer { width:100%; }
  .qct-fields-grid { grid-template-columns:1fr; }
}
@media (max-width: 480px) {
  .qct-page { padding:10px 8px; gap:12px; }
  .qct-table-wrap { display:none; }
  .qct-mobile-list { display:flex; flex-direction:column; gap:10px; }
  .qct-mobile-shimmer { height:120px; border-radius:12px; background:linear-gradient(90deg,#f3f4f6 25%,#e9ecef 50%,#f3f4f6 75%); background-size:200%; animation:shimmer 1.4s infinite; }
  .qct-mobile-empty { text-align:center; padding:40px 16px; background:#fff; border:1px solid var(--qc-line); border-radius:14px; }
  .qct-mobile-empty .qct-empty-title { font-size:16px; }
  .qct-mobile-empty .qct-empty-sub { font-size:13px; }
  .qct-mob-card { background:#fff; border:1px solid var(--qc-line); border-radius:14px; padding:12px 14px; display:flex; flex-direction:column; gap:10px; cursor:pointer; }
  .qct-mob-card:active { box-shadow:0 4px 16px rgba(0,0,0,.08); }
  .qct-mob-top { display:flex; align-items:center; justify-content:space-between; gap:8px; }
  .qct-mob-name { font-weight:700; font-size:14px; color:var(--qc-ink); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .qct-mob-badges { display:flex; flex-wrap:wrap; gap:6px; align-items:center; }
  .qct-mob-group { font-size:12px; font-weight:600; background:#f1f5f9; color:var(--qc-muted); padding:3px 10px; border-radius:999px; }
  .qct-mob-desc { font-size:12.5px; color:var(--qc-muted); line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .qct-mob-footer { display:flex; align-items:center; justify-content:space-between; padding-top:8px; border-top:1px solid #f1f5f9; }
  .qct-mob-footer-hint { font-size:11.5px; color:#94a3b8; }
  .qct-foot-mobile { border:1px solid var(--qc-line); border-radius:14px; background:#fff; padding:10px; }

  .qct-kpis { grid-template-columns:1fr 1fr; gap:10px; }
  .qct-kpi { padding:12px 14px; gap:12px; border-radius:14px; }
  .qct-kpi-ico { width:44px; height:44px; border-radius:12px; }
  .qct-kpi-ico svg { width:22px; height:22px; }
  .qct-kpi-lbl { font-size:10.5px; letter-spacing:.02em; }
  .qct-kpi-val { font-size:22px; }

  .qct-panel { padding:12px; border-radius:14px; gap:12px; }
  .qct-tabs-row { flex-direction:column; align-items:stretch; }
  .qct-tabs { gap:6px; }
  .qct-tab { height:34px; padding:0 11px; font-size:12.5px; gap:6px; }
  .qct-tab-cnt { min-width:20px; height:20px; font-size:11px; }
  .qct-btn-new { width:100%; justify-content:center; }
  .qct-filters { gap:8px; }
  .qct-search, .qct-ctl-select { flex:1 1 100%; }
  .qct-ctl, .qct-search, .qct-btn { height:42px; }
  .qct-btn-icon { width:42px; }

  .qct-dheader { padding:16px 14px 12px; }
  .qct-dh-title { font-size:14px; }
  .qct-dh-sub { font-size:11px; }
  .qct-dbody { padding:12px 14px; gap:10px; }
  .qct-dfooter { padding:12px 14px; }
  .qct-fields-grid,.qct-param-fields { grid-template-columns:1fr; gap:8px; }
  .qct-summary-grid { grid-template-columns:1fr 1fr; }
  .qct-params-tbl { font-size:12px; }
  .qct-params-tbl th { padding:7px 8px; font-size:10px; }
  .qct-params-tbl td { padding:8px 8px; }
}
@media (max-width: 375px) {
  .qct-page { padding:8px 6px; gap:10px; }
  .qct-mob-card { padding:10px 12px; }
  .qct-dheader { padding:12px 12px 10px; }
  .qct-dh-title { font-size:13px; }
  .qct-dbody { padding:12px; }
  .qct-dfooter { padding:10px 12px; }
  .qct-summary-grid { grid-template-columns:1fr; }
}

/* ── New QC Template drawer (pro) — app theme: Inter (var(--font)), QC-family header ── */
.qct-pro { width:600px; max-width:100vw; font-family:var(--font, 'Inter', system-ui, sans-serif); background:#fff; }
.qct-pro button, .qct-pro input, .qct-pro select, .qct-pro textarea { font-family:inherit; }
.qct-pro-head { display:flex; align-items:center; gap:12px; padding:20px 20px 16px; background:linear-gradient(135deg,#1e3a5f,#2563eb); color:#fff; flex-shrink:0; position:relative; }
.qct-pro-head-ico { width:40px; height:40px; border-radius:10px; background:rgba(255,255,255,.2); display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
.qct-pro-head-txt { flex:1; min-width:0; }
.qct-pro-title { font-size:16px; font-weight:700; color:#fff; }
.qct-pro-sub { font-size:12px; color:rgba(255,255,255,.75); margin-top:2px; }
.qct-pro-close { width:32px; height:32px; border:none; background:rgba(255,255,255,.15); color:#fff; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; }
.qct-pro-close:hover { background:rgba(255,255,255,.25); }
.qct-pro-close:focus-visible, .qct-pro-add:focus-visible, .qct-pro-btn-ghost:focus-visible, .qct-pro-btn-primary:focus-visible { outline:2px solid #2563eb; outline-offset:2px; }

.qct-pro-body { flex:1; overflow-y:auto; padding:18px 20px 24px; display:flex; flex-direction:column; gap:16px; box-sizing:border-box; }
.qct-pro-sec { display:flex; align-items:center; gap:8px; font-size:13.5px; font-weight:700; color:#111827; padding-bottom:8px; border-bottom:1px solid #eef2f6; }
.qct-pro-sec-ico { display:inline-flex; color:#2563eb; }
.qct-pro-sec-params { border-bottom:none; padding-bottom:0; margin-top:4px; }

.qct-pro-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; min-width:0; }
.qct-pro-field { display:flex; flex-direction:column; gap:6px; min-width:0; }
.qct-pro .qct-full { grid-column:1/-1; }
.qct-pro-label { display:flex; align-items:center; gap:6px; font-size:12.5px; font-weight:600; color:#374151; }
.qct-pro-lico { display:inline-flex; color:#2563eb; }
.qct-pro .req { color:#ef4444; }
.qct-pro .opt { font-weight:400; color:#9ca3af; }
.qct-pro-hint { font-size:11.5px; color:#6b7280; line-height:1.4; }
.qct-pro-hint code { background:#f3f4f6; padding:1px 5px; border-radius:4px; font-size:11px; }

.qct-pro-ctl { position:relative; display:flex; align-items:center; min-width:0; }
.qct-pro-chev { position:absolute; right:12px; top:0; bottom:0; display:inline-flex; align-items:center; color:#374151; pointer-events:none; z-index:1; }
.qct-pro-chev svg { width:14px; height:14px; }
.qct-pro-input { width:100%; box-sizing:border-box; height:40px; padding:0 36px 0 12px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; font-size:13px; color:#111827; outline:none; transition:border-color .15s, box-shadow .15s; }
.qct-pro-input::placeholder, .qct-pro-textarea::placeholder { color:#9ca3af; font-style:normal; }
.qct-pro-input:hover, .qct-pro-textarea:hover { border-color:#d1d5db; }
.qct-pro-input:focus, .qct-pro-textarea:focus { border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.08); }
.qct-pro-select { appearance:none; -webkit-appearance:none; cursor:pointer; }
.qct-pro-textarea { width:100%; box-sizing:border-box; min-height:76px; padding:10px 12px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; font-size:13px; color:#111827; outline:none; resize:vertical; transition:border-color .15s, box-shadow .15s; }

.qct-pro-ss { display:block; }
.qct-pro-ss :deep(.ss-wrap) { width:100%; }
.qct-pro-ss :deep(.ss-trigger) { height:40px; min-height:40px; box-sizing:border-box; padding:0 36px 0 12px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; font-size:13px; color:#111827; }
.qct-pro-ss :deep(.ss-trigger:hover) { border-color:#d1d5db; }
.qct-pro-ss :deep(.ss-trigger:focus), .qct-pro-ss :deep(.ss-trigger.open) { border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.08); }
.qct-pro-ss :deep(.ss-ph) { color:#9ca3af; }
.qct-pro-ss :deep(.ss-caret) { display:none; }

.qct-pro-add { margin-left:auto; display:inline-flex; align-items:center; gap:5px; height:30px; padding:0 11px; border:1px solid #bfdbfe; border-radius:6px; background:#eff6ff; color:#2563eb; font-size:12px; font-weight:600; cursor:pointer; }
.qct-pro-add:hover { background:#dbeafe; }
.qct-pro-add svg { width:12px; height:12px; }

.qct-pro-empty { display:flex; align-items:center; justify-content:center; gap:12px; padding:16px 18px; border-radius:8px; background:#eff6ff; color:#475569; font-size:12.5px; line-height:1.5; text-align:center; }
.qct-pro-empty-ico { display:inline-flex; color:#2563eb; flex-shrink:0; }
.qct-pro-empty-ico svg { width:20px; height:20px; }

.qct-pro-param { border:1px solid #e5e7eb; border-radius:10px; background:#fff; }
.qct-pro-param-head { display:flex; align-items:center; gap:8px; padding:10px 12px; background:#f9fafb; border-bottom:1px solid #e5e7eb; border-radius:9px 9px 0 0; }
.qct-pro-param-num { width:22px; height:22px; border-radius:50%; background:#2563eb; color:#fff; font-size:10.5px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
.qct-pro-param-name { flex:1; min-width:0; font-size:12.5px; font-weight:600; color:#374151; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.qct-pro-param-del { width:26px; height:26px; border:none; background:none; color:#9ca3af; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; }
.qct-pro-param-del:hover { background:#fee2e2; color:#dc2626; }
.qct-pro-param-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; padding:12px; }
.qct-pro-input-sm { height:36px; font-size:12.5px; }

.qct-pro-foot { display:flex; justify-content:flex-end; gap:8px; padding:14px 20px; border-top:1px solid #e5e7eb; background:#fff; flex-shrink:0; }
.qct-pro-btn-ghost { height:38px; padding:0 16px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; color:#374151; font-size:13px; font-weight:500; cursor:pointer; }
.qct-pro-btn-ghost:hover { background:#f9fafb; }
.qct-pro-btn-primary { display:inline-flex; align-items:center; gap:6px; height:38px; padding:0 16px; border:none; border-radius:8px; background:#1a6ef7; color:#fff; font-size:13px; font-weight:600; cursor:pointer; transition:background .15s; }
.qct-pro-btn-primary svg { width:14px; height:14px; }
.qct-pro-btn-primary:hover:not(:disabled) { background:#1d4ed8; }
.qct-pro-btn-primary:disabled { opacity:.5; cursor:not-allowed; }

@media (max-width:640px) {
  .qct-pro { width:100%; }
  .qct-pro-head { padding:16px 14px 12px; }
  .qct-pro-title { font-size:14px; }
  .qct-pro-sub { font-size:11px; }
  .qct-pro-body { padding:12px 14px; gap:12px; }
  .qct-pro-grid, .qct-pro-param-grid { grid-template-columns:1fr; gap:10px; }
  .qct-pro-empty { flex-direction:column; gap:6px; }
  .qct-pro-foot { padding:12px 14px; }
}
</style>