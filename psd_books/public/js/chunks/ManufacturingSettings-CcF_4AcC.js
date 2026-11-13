import { _ as S, x as C, o as B, a7 as h, c as l, a as e, b as x, d as r, t as v, W as _, w as i, v as m, F as y, r as w, A as k, $ as p, h as b, k as o } from "./main-DQXXITLP.js";
const O = { class: "msx-page" }, V = { class: "msx-panel" }, W = { class: "msx-hdr" }, j = { style: { display: "flex", "align-items": "center", gap: "10px" } }, U = {
  key: 0,
  class: "msx-saved"
}, A = ["disabled", "title"], D = {
  key: 0,
  class: "msx-spinner"
}, P = {
  key: 1,
  width: "13",
  height: "13",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, T = {
  key: 0,
  class: "msx-body"
}, I = {
  key: 1,
  class: "msx-body"
}, N = { class: "msx-sect" }, E = { class: "msx-fg" }, F = ["value"], R = ["value"], $ = ["value"], z = ["value"], H = { class: "msx-sect" }, J = { class: "msx-fg" }, L = { class: "msx-toggle-row" }, q = { class: "msx-toggle" }, G = { class: "msx-toggle" }, K = { class: "msx-toggle-row" }, Q = { class: "msx-toggle" }, X = { class: "msx-sect" }, Y = { class: "msx-fg" }, Z = { class: "msx-sect" }, ss = { class: "msx-fg" }, es = { class: "msx-toggle-row" }, as = { class: "msx-toggle" }, ts = { class: "msx-sect" }, ls = {
  class: "msx-toggle-row",
  style: { "padding-top": "0" }
}, os = { class: "msx-toggle" }, is = { class: "msx-toggle" }, ds = {
  key: 2,
  class: "msx-footer"
}, ns = {
  key: 0,
  class: "msx-saved"
}, rs = ["disabled", "title"], us = {
  key: 0,
  class: "msx-spinner"
}, vs = {
  __name: "ManufacturingSettings",
  setup(_s) {
    const { toast: g } = C(), u = b(!0), n = b(!1), f = b(!1), c = b([]), a = b({
      default_source_warehouse: "",
      default_wip_warehouse: "",
      default_fg_warehouse: "",
      default_scrap_warehouse: "",
      auto_create_job_cards: 1,
      over_production_allowance_pct: 0,
      allow_negative_stock: 0,
      absorb_abnormal_loss_into_fg_cost: 0,
      backflush_raw_materials_based_on: "BOM",
      default_bom_type: "Manufacturing",
      set_rate_of_sub_assembly_item_based_on_bom: 0,
      job_card_hours_per_day: 8,
      capacity_planning_for_days: 30,
      warn_if_bom_not_default: 1,
      warn_on_missing_job_cards: 1
    });
    B(async () => {
      u.value = !0;
      try {
        const d = await h("frappe.client.get_list", {
          doctype: "Warehouse",
          fields: ["name"],
          filters: [["is_group", "=", 0], ["disabled", "=", 0]],
          limit: 500,
          order_by: "name asc"
        });
        c.value = d || [];
        const s = await h(
          "psd_books.manufacturing.doctype.manufacturing_settings.manufacturing_settings.get_manufacturing_defaults"
        );
        s && Object.assign(a.value, s);
      } catch (d) {
        g("Error loading settings: " + d.message, "error");
      }
      u.value = !1;
    });
    async function M() {
      const d = parseFloat(a.value.over_production_allowance_pct) || 0;
      if (d < 0 || d > 100)
        return g("Over-Production Allowance must be between 0 and 100%", "error");
      n.value = !0, f.value = !1;
      try {
        await h("frappe.client.set_value", {
          doctype: "Manufacturing Settings",
          name: "Manufacturing Settings",
          fieldname: {
            default_source_warehouse: a.value.default_source_warehouse || "",
            default_wip_warehouse: a.value.default_wip_warehouse || "",
            default_fg_warehouse: a.value.default_fg_warehouse || "",
            default_scrap_warehouse: a.value.default_scrap_warehouse || "",
            auto_create_job_cards: a.value.auto_create_job_cards,
            over_production_allowance_pct: d,
            allow_negative_stock: a.value.allow_negative_stock,
            absorb_abnormal_loss_into_fg_cost: a.value.absorb_abnormal_loss_into_fg_cost,
            backflush_raw_materials_based_on: a.value.backflush_raw_materials_based_on,
            default_bom_type: a.value.default_bom_type,
            set_rate_of_sub_assembly_item_based_on_bom: a.value.set_rate_of_sub_assembly_item_based_on_bom,
            job_card_hours_per_day: a.value.job_card_hours_per_day,
            capacity_planning_for_days: a.value.capacity_planning_for_days,
            warn_if_bom_not_default: a.value.warn_if_bom_not_default,
            warn_on_missing_job_cards: a.value.warn_on_missing_job_cards
          }
        }), f.value = !0, g("Manufacturing Settings saved"), setTimeout(() => {
          f.value = !1;
        }, 3e3);
      } catch (s) {
        g("Failed to save: " + s.message, "error");
      }
      n.value = !1;
    }
    return (d, s) => (o(), l("div", O, [
      e("div", V, [
        e("div", W, [
          s[16] || (s[16] = e("div", null, [
            e("div", { class: "msx-hdr-title" }, "⚙️ Manufacturing Settings"),
            e("div", { class: "msx-hdr-sub" }, "Defaults and controls applied across BOMs, Work Orders, and Job Cards.")
          ], -1)),
          e("div", j, [
            f.value ? (o(), l("span", U, "✓ Saved")) : x("", !0),
            e("button", {
              class: "msx-btn msx-btn-light",
              disabled: n.value || u.value || !d.$canEdit("inventory"),
              title: d.$canEdit("inventory") ? "" : "Read-only access",
              onClick: M
            }, [
              n.value ? (o(), l("span", D)) : (o(), l("svg", P, [...s[15] || (s[15] = [
                e("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }, null, -1),
                e("polyline", { points: "17 21 17 13 7 13" }, null, -1),
                e("polyline", { points: "7 3 7 8 15 8" }, null, -1)
              ])])),
              r(" " + v(n.value ? "Saving…" : "Save Settings"), 1)
            ], 8, A)
          ])
        ]),
        u.value ? (o(), l("div", T, [...s[17] || (s[17] = [
          e("div", {
            class: "shimmer",
            style: { height: "120px", "border-radius": "10px", "margin-bottom": "16px" }
          }, null, -1),
          e("div", {
            class: "shimmer",
            style: { height: "120px", "border-radius": "10px", "margin-bottom": "16px" }
          }, null, -1),
          e("div", {
            class: "shimmer",
            style: { height: "120px", "border-radius": "10px" }
          }, null, -1)
        ])])) : (o(), l("div", I, [
          e("div", N, [
            s[30] || (s[30] = _('<div class="msx-sect-hdr" data-v-d9533005><div class="msx-sect-icon" data-v-d9533005><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-d9533005><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" data-v-d9533005></path><polyline points="9 22 9 12 15 12 15 22" data-v-d9533005></polyline></svg></div><div data-v-d9533005><div class="msx-sect-title" data-v-d9533005>Default Warehouses</div><div class="msx-sect-sub" data-v-d9533005>Pre-filled on new Work Orders. Can be overridden per document.</div></div></div>', 1)),
            e("div", E, [
              e("div", null, [
                s[19] || (s[19] = e("div", { class: "msx-hf-label" }, "Default Source Warehouse", -1)),
                i(e("select", {
                  class: "msx-fi",
                  "onUpdate:modelValue": s[0] || (s[0] = (t) => a.value.default_source_warehouse = t),
                  style: { width: "100%" }
                }, [
                  s[18] || (s[18] = e("option", { value: "" }, "— Select —", -1)),
                  (o(!0), l(y, null, w(c.value, (t) => (o(), l("option", {
                    key: t.name,
                    value: t.name
                  }, v(t.name), 9, F))), 128))
                ], 512), [
                  [m, a.value.default_source_warehouse]
                ]),
                s[20] || (s[20] = e("div", { class: "msx-hint" }, "Raw materials are drawn from here by default.", -1))
              ]),
              e("div", null, [
                s[22] || (s[22] = e("div", { class: "msx-hf-label" }, "Default WIP Warehouse", -1)),
                i(e("select", {
                  class: "msx-fi",
                  "onUpdate:modelValue": s[1] || (s[1] = (t) => a.value.default_wip_warehouse = t),
                  style: { width: "100%" }
                }, [
                  s[21] || (s[21] = e("option", { value: "" }, "— Select —", -1)),
                  (o(!0), l(y, null, w(c.value, (t) => (o(), l("option", {
                    key: t.name,
                    value: t.name
                  }, v(t.name), 9, R))), 128))
                ], 512), [
                  [m, a.value.default_wip_warehouse]
                ]),
                s[23] || (s[23] = e("div", { class: "msx-hint" }, 'Set this to enable the "Issue Materials" transfer step.', -1))
              ]),
              e("div", null, [
                s[25] || (s[25] = e("div", { class: "msx-hf-label" }, "Default Finished Goods Warehouse", -1)),
                i(e("select", {
                  class: "msx-fi",
                  "onUpdate:modelValue": s[2] || (s[2] = (t) => a.value.default_fg_warehouse = t),
                  style: { width: "100%" }
                }, [
                  s[24] || (s[24] = e("option", { value: "" }, "— Select —", -1)),
                  (o(!0), l(y, null, w(c.value, (t) => (o(), l("option", {
                    key: t.name,
                    value: t.name
                  }, v(t.name), 9, $))), 128))
                ], 512), [
                  [m, a.value.default_fg_warehouse]
                ]),
                s[26] || (s[26] = e("div", { class: "msx-hint" }, "Manufactured goods are received here by default.", -1))
              ]),
              e("div", null, [
                s[28] || (s[28] = e("div", { class: "msx-hf-label" }, "Default Scrap Warehouse", -1)),
                i(e("select", {
                  class: "msx-fi",
                  "onUpdate:modelValue": s[3] || (s[3] = (t) => a.value.default_scrap_warehouse = t),
                  style: { width: "100%" }
                }, [
                  s[27] || (s[27] = e("option", { value: "" }, "— Select —", -1)),
                  (o(!0), l(y, null, w(c.value, (t) => (o(), l("option", {
                    key: t.name,
                    value: t.name
                  }, v(t.name), 9, z))), 128))
                ], 512), [
                  [m, a.value.default_scrap_warehouse]
                ]),
                s[29] || (s[29] = e("div", { class: "msx-hint" }, "Recoverable scrap / by-products go here.", -1))
              ])
            ])
          ]),
          e("div", H, [
            s[39] || (s[39] = _('<div class="msx-sect-hdr" data-v-d9533005><div class="msx-sect-icon" data-v-d9533005><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-d9533005><rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-v-d9533005></rect><line x1="8" y1="21" x2="16" y2="21" data-v-d9533005></line><line x1="12" y1="17" x2="12" y2="21" data-v-d9533005></line></svg></div><div data-v-d9533005><div class="msx-sect-title" data-v-d9533005>Work Order Defaults</div></div></div>', 1)),
            e("div", J, [
              e("div", null, [
                s[31] || (s[31] = e("div", { class: "msx-hf-label" }, "Over-Production Allowance (%)", -1)),
                i(e("input", {
                  type: "number",
                  class: "msx-fi msx-fi-mono",
                  "onUpdate:modelValue": s[4] || (s[4] = (t) => a.value.over_production_allowance_pct = t),
                  min: "0",
                  max: "100",
                  step: "0.01",
                  style: { width: "100%" }
                }, null, 512), [
                  [k, a.value.over_production_allowance_pct]
                ]),
                s[32] || (s[32] = e("div", { class: "msx-hint" }, "% above the planned qty that can be produced without error. 0 = strict.", -1))
              ]),
              e("div", null, [
                s[34] || (s[34] = e("div", { class: "msx-hf-label" }, "Backflush Raw Materials Based On", -1)),
                i(e("select", {
                  class: "msx-fi",
                  "onUpdate:modelValue": s[5] || (s[5] = (t) => a.value.backflush_raw_materials_based_on = t),
                  style: { width: "100%" }
                }, [...s[33] || (s[33] = [
                  e("option", { value: "BOM" }, "BOM", -1),
                  e("option", { value: "Material Transferred for Manufacture" }, "Material Transferred for Manufacture", -1)
                ])], 512), [
                  [m, a.value.backflush_raw_materials_based_on]
                ]),
                s[35] || (s[35] = e("div", { class: "msx-hint" }, "How raw material consumption qty is calculated at completion.", -1))
              ])
            ]),
            e("div", L, [
              e("label", q, [
                i(e("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": s[6] || (s[6] = (t) => a.value.auto_create_job_cards = t),
                  "true-value": 1,
                  "false-value": 0
                }, null, 512), [
                  [p, a.value.auto_create_job_cards]
                ]),
                s[36] || (s[36] = r(" Auto-Create Job Cards on Submit", -1))
              ]),
              e("label", G, [
                i(e("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": s[7] || (s[7] = (t) => a.value.allow_negative_stock = t),
                  "true-value": 1,
                  "false-value": 0
                }, null, 512), [
                  [p, a.value.allow_negative_stock]
                ]),
                s[37] || (s[37] = r(" Allow Negative Stock", -1))
              ])
            ]),
            e("div", K, [
              e("label", Q, [
                i(e("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": s[8] || (s[8] = (t) => a.value.absorb_abnormal_loss_into_fg_cost = t),
                  "true-value": 1,
                  "false-value": 0
                }, null, 512), [
                  [p, a.value.absorb_abnormal_loss_into_fg_cost]
                ]),
                s[38] || (s[38] = r(" Absorb Abnormal Process Loss into Finished Good Cost", -1))
              ])
            ]),
            s[40] || (s[40] = e("div", {
              class: "msx-hint",
              style: { padding: "0 0 4px 0" }
            }, "Off (default): process loss beyond the BOM's expected shrinkage % is written off separately as Manufacturing Variance Loss, visible as its own line on the Work Order's Cost Breakdown. On: that loss is folded into the finished good's cost instead — no separate write-off, but wastage no longer shows as a distinct line.", -1))
          ]),
          e("div", X, [
            s[45] || (s[45] = _('<div class="msx-sect-hdr" data-v-d9533005><div class="msx-sect-icon" data-v-d9533005><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-d9533005><circle cx="12" cy="12" r="10" data-v-d9533005></circle><polyline points="12 6 12 12 16 14" data-v-d9533005></polyline></svg></div><div data-v-d9533005><div class="msx-sect-title" data-v-d9533005>Capacity Planning</div></div></div>', 1)),
            e("div", Y, [
              e("div", null, [
                s[41] || (s[41] = e("div", { class: "msx-hf-label" }, "Job Card Hours Per Day", -1)),
                i(e("input", {
                  type: "number",
                  class: "msx-fi msx-fi-mono",
                  "onUpdate:modelValue": s[9] || (s[9] = (t) => a.value.job_card_hours_per_day = t),
                  min: "0.1",
                  step: "0.5",
                  style: { width: "100%" }
                }, null, 512), [
                  [k, a.value.job_card_hours_per_day]
                ]),
                s[42] || (s[42] = e("div", { class: "msx-hint" }, "Working hours assumed per day when estimating how long a Work Order's operations will take.", -1))
              ]),
              e("div", null, [
                s[43] || (s[43] = e("div", { class: "msx-hf-label" }, "Capacity Planning Window (Days)", -1)),
                i(e("input", {
                  type: "number",
                  class: "msx-fi msx-fi-mono",
                  "onUpdate:modelValue": s[10] || (s[10] = (t) => a.value.capacity_planning_for_days = t),
                  min: "0",
                  step: "1",
                  style: { width: "100%" }
                }, null, 512), [
                  [k, a.value.capacity_planning_for_days]
                ]),
                s[44] || (s[44] = e("div", { class: "msx-hint" }, "If a Work Order's estimated duration exceeds this many days, a warning is shown on the Work Order.", -1))
              ])
            ])
          ]),
          e("div", Z, [
            s[49] || (s[49] = _('<div class="msx-sect-hdr" data-v-d9533005><div class="msx-sect-icon" data-v-d9533005><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-d9533005><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-d9533005></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-d9533005></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-d9533005></line></svg></div><div data-v-d9533005><div class="msx-sect-title" data-v-d9533005>BOM Defaults</div></div></div>', 1)),
            e("div", ss, [
              e("div", null, [
                s[47] || (s[47] = e("div", { class: "msx-hf-label" }, "Default BOM Type", -1)),
                i(e("select", {
                  class: "msx-fi",
                  "onUpdate:modelValue": s[11] || (s[11] = (t) => a.value.default_bom_type = t),
                  style: { width: "100%" }
                }, [...s[46] || (s[46] = [
                  e("option", { value: "Manufacturing" }, "Manufacturing", -1),
                  e("option", { value: "Packing" }, "Packing", -1),
                  e("option", { value: "Sub-Assembly" }, "Sub-Assembly", -1)
                ])], 512), [
                  [m, a.value.default_bom_type]
                ])
              ])
            ]),
            e("div", es, [
              e("label", as, [
                i(e("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": s[12] || (s[12] = (t) => a.value.set_rate_of_sub_assembly_item_based_on_bom = t),
                  "true-value": 1,
                  "false-value": 0
                }, null, 512), [
                  [p, a.value.set_rate_of_sub_assembly_item_based_on_bom]
                ]),
                s[48] || (s[48] = r(" Set Sub-Assembly Rate from BOM", -1))
              ])
            ])
          ]),
          s[53] || (s[53] = _('<div class="msx-sect" data-v-d9533005><div class="msx-sect-hdr" data-v-d9533005><div class="msx-sect-icon" data-v-d9533005><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-d9533005><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-d9533005></rect><line x1="16" y1="2" x2="16" y2="6" data-v-d9533005></line><line x1="8" y1="2" x2="8" y2="6" data-v-d9533005></line><line x1="3" y1="10" x2="21" y2="10" data-v-d9533005></line></svg></div><div data-v-d9533005><div class="msx-sect-title" data-v-d9533005>Capacity Planning</div></div></div><div class="msx-hint" style="margin:0;" data-v-d9533005> Capacity planning (working hours per day, planning horizon) isn&#39;t wired into scheduling yet — these controls were removed from here rather than left as settings that silently do nothing. They&#39;ll return once that feature ships. </div></div>', 1)),
          e("div", ts, [
            s[52] || (s[52] = _('<div class="msx-sect-hdr" data-v-d9533005><div class="msx-sect-icon" data-v-d9533005><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-d9533005><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" data-v-d9533005></path><path d="M13.73 21a2 2 0 0 1-3.46 0" data-v-d9533005></path></svg></div><div data-v-d9533005><div class="msx-sect-title" data-v-d9533005>Notifications &amp; Alerts</div></div></div>', 1)),
            e("div", ls, [
              e("label", os, [
                i(e("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": s[13] || (s[13] = (t) => a.value.warn_if_bom_not_default = t),
                  "true-value": 1,
                  "false-value": 0
                }, null, 512), [
                  [p, a.value.warn_if_bom_not_default]
                ]),
                s[50] || (s[50] = r(" Warn If BOM Is Not Default", -1))
              ]),
              e("label", is, [
                i(e("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": s[14] || (s[14] = (t) => a.value.warn_on_missing_job_cards = t),
                  "true-value": 1,
                  "false-value": 0
                }, null, 512), [
                  [p, a.value.warn_on_missing_job_cards]
                ]),
                s[51] || (s[51] = r(" Warn on Incomplete Job Cards", -1))
              ])
            ])
          ])
        ])),
        u.value ? x("", !0) : (o(), l("div", ds, [
          f.value ? (o(), l("span", ns, "✓ Settings saved")) : x("", !0),
          s[54] || (s[54] = e("div", { style: { flex: "1" } }, null, -1)),
          e("button", {
            class: "msx-btn msx-btn-mfg",
            disabled: n.value || u.value || !d.$canEdit("inventory"),
            title: d.$canEdit("inventory") ? "" : "Read-only access",
            onClick: M
          }, [
            n.value ? (o(), l("span", us)) : x("", !0),
            r(" " + v(n.value ? "Saving…" : "Save Settings"), 1)
          ], 8, rs)
        ]))
      ])
    ]));
  }
}, ps = /* @__PURE__ */ S(vs, [["__scopeId", "data-v-d9533005"]]);
export {
  ps as default
};
