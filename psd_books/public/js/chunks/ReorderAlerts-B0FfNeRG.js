import { _ as re, x as le, o as te, c as n, a as e, u as m, i as f, d as u, n as v, t as o, b as y, F as h, r as T, w, A as H, p as $, v as D, C as se, q as oe, H as ae, e as ie, l as de, f as F, h as _, g, z as ne, J as Q, k as d } from "./main-UuZwJvYM.js";
import { f as i } from "./format-BcJZDVG4.js";
const ue = { class: "rm-page" }, me = { class: "rm-header" }, ve = ["disabled"], ce = ["innerHTML"], _e = {
  key: 0,
  class: "rm-stats"
}, pe = { class: "rm-stat" }, be = { class: "rm-stat-val clr-blue" }, fe = { class: "rm-stat" }, ye = { class: "rm-stat-val" }, ge = { class: "rm-list-panel" }, he = { class: "rm-filter-tabs" }, we = ["onClick"], ke = { class: "rm-list-search" }, qe = ["innerHTML"], Ce = {
  key: 0,
  class: "rm-list-items"
}, Oe = {
  key: 1,
  class: "rm-list-items"
}, Me = {
  key: 0,
  class: "rm-list-empty"
}, Le = ["onClick"], Te = { class: "rm-item-top" }, Se = { class: "rm-item-name" }, Pe = { class: "rm-item-meta" }, xe = { class: "rm-item-code" }, Ae = { class: "rm-item-stock" }, He = { style: { color: "#6b7280" } }, Re = {
  key: 0,
  class: "rm-item-auto-badge"
}, $e = ["innerHTML"], Ee = ["innerHTML"], Ne = {
  key: 0,
  class: "rm-detail-empty"
}, Ve = { class: "rm-item-header-card" }, ze = { class: "rm-ih-top" }, Ie = { class: "rm-ih-name" }, Ue = { class: "rm-ih-code" }, Be = { class: "rm-ih-metrics" }, We = { class: "rm-metric" }, De = { class: "rm-metric" }, Fe = { class: "rm-metric-val" }, Qe = { class: "rm-metric" }, je = { class: "rm-stock-bar-wrap" }, Je = { class: "rm-stock-bar" }, Ke = { class: "rm-stock-bar-labels" }, Ye = { style: { "font-size": "10px", color: "#6b7280" } }, Ge = { class: "rm-card" }, Xe = { class: "rm-auto-po-row" }, Ze = { class: "rm-auto-po-info" }, er = { class: "rm-auto-po-title" }, rr = ["innerHTML"], lr = { class: "rm-auto-po-desc" }, tr = ["disabled", "title"], sr = {
  key: 0,
  class: "rm-auto-po-warn"
}, or = ["innerHTML"], ar = { class: "rm-card" }, ir = { class: "rm-cfg-grid" }, dr = { class: "rm-cfg-field rm-cfg-full" }, nr = ["value"], ur = { class: "rm-cfg-field rm-cfg-full" }, mr = { value: "" }, vr = ["value"], cr = { class: "rm-cfg-field" }, _r = { class: "rm-cfg-field" }, pr = { class: "rm-cfg-field rm-cfg-full" }, br = { class: "rm-cfg-actions" }, fr = ["disabled"], yr = {
  key: 0,
  class: "rm-spinner"
}, gr = ["disabled", "title"], hr = ["innerHTML"], wr = { class: "rm-modal" }, kr = { class: "rm-modal-body" }, qr = { class: "rm-modal-item-chip" }, Cr = { class: "rm-modal-list" }, Or = { class: "rm-modal-actions" }, Mr = ["disabled"], Lr = {
  __name: "ReorderAlerts",
  setup(Tr) {
    const { toast: k } = le(), c = _([]), q = _(!1), a = _(null), l = ne({
      // editable config form for selected item
      reorder_supplier: "",
      reorder_warehouse_override: "",
      reorder_qty: 0,
      reorder_level: 0,
      reorder_notes: "",
      auto_po_enabled: 0,
      actual_qty: 0,
      below_reorder: !1,
      shortage_qty: 0
    }), C = _(!1), S = _(!1), O = _(!1), P = _(""), M = _("all"), E = _([]), N = _([]), L = g(() => c.value.filter((t) => i(t.actual_qty) <= 0)), x = g(() => c.value.filter((t) => i(t.actual_qty) > 0 && t.below_reorder)), V = g(() => c.value.filter((t) => t.auto_po_enabled)), j = g(() => [
      { k: "all", l: "All Monitored", count: c.value.length },
      { k: "below", l: "Below Reorder", count: L.value.length + x.value.length },
      { k: "critical", l: "Critical", count: L.value.length },
      { k: "auto", l: "Auto-PO Active", count: V.value.length }
    ]), z = g(() => {
      let t = c.value;
      if (M.value === "below" && (t = t.filter((r) => r.below_reorder)), M.value === "critical" && (t = t.filter((r) => i(r.actual_qty) <= 0)), M.value === "auto" && (t = t.filter((r) => r.auto_po_enabled)), P.value.trim()) {
        const r = P.value.toLowerCase();
        t = t.filter(
          (b) => (b.item_code || "").toLowerCase().includes(r) || (b.item_name || "").toLowerCase().includes(r)
        );
      }
      return t;
    }), J = g(() => {
      const t = Math.max(i(l.actual_qty), i(l.reorder_level) * 1.5, 1);
      return Math.min(i(l.actual_qty) / t * 100, 100);
    }), K = g(() => {
      const t = Math.max(i(l.actual_qty), i(l.reorder_level) * 1.5, 1);
      return Math.min(i(l.reorder_level) / t * 100, 100);
    });
    async function I() {
      q.value = !0, a.value = null;
      try {
        const [t, r, b, A] = await Promise.all([
          ie(),
          de("psd_books.api.inventory.get_reorder_dashboard"),
          F("Supplier", { fields: ["name", "supplier_name"], limit: 500, order_by: "supplier_name asc" }),
          F("Warehouse", { fields: ["name", "warehouse_name"], filters: [["is_group", "=", 0], ["disabled", "=", 0]], limit: 500 })
        ]);
        c.value = r || [], E.value = b || [], N.value = A || [];
      } catch (t) {
        k(t.message || "Failed to load reorder data", "error");
      } finally {
        q.value = !1;
      }
    }
    function Y(t) {
      a.value = t, Object.assign(l, {
        reorder_supplier: t.reorder_supplier || "",
        reorder_warehouse_override: t.reorder_warehouse_override || "",
        reorder_qty: i(t.reorder_qty),
        reorder_level: i(t.reorder_level),
        reorder_notes: t.reorder_notes || "",
        auto_po_enabled: t.auto_po_enabled || 0,
        actual_qty: i(t.actual_qty),
        below_reorder: t.below_reorder,
        shortage_qty: i(t.shortage_qty)
      });
    }
    async function G() {
      if (a.value) {
        C.value = !0;
        try {
          await Q("psd_books.api.inventory.save_item_reorder_config", {
            item_code: a.value.item_code,
            supplier: l.reorder_supplier,
            warehouse_override: l.reorder_warehouse_override,
            reorder_qty: l.reorder_qty,
            reorder_level: l.reorder_level,
            auto_po_enabled: l.auto_po_enabled,
            notes: l.reorder_notes
          });
          const t = c.value.findIndex((r) => r.item_code === a.value.item_code);
          if (t >= 0) {
            const r = {
              reorder_supplier: l.reorder_supplier,
              reorder_warehouse_override: l.reorder_warehouse_override,
              reorder_qty: l.reorder_qty,
              reorder_level: l.reorder_level,
              reorder_notes: l.reorder_notes,
              auto_po_enabled: l.auto_po_enabled
            };
            r.below_reorder = c.value[t].actual_qty < r.reorder_level, r.shortage_qty = Math.max(r.reorder_level - c.value[t].actual_qty, 0), Object.assign(c.value[t], r), a.value = c.value[t], l.below_reorder = r.below_reorder, l.shortage_qty = r.shortage_qty;
          }
          k("Reorder config saved", "success");
        } catch (t) {
          k(t.message || "Save failed", "error");
        } finally {
          C.value = !1;
        }
      }
    }
    function X() {
      l.auto_po_enabled ? l.auto_po_enabled = 0 : O.value = !0;
    }
    function Z() {
      l.auto_po_enabled = 1, O.value = !1;
    }
    async function ee() {
      if (a.value) {
        S.value = !0;
        try {
          const t = await Q("psd_books.api.inventory.create_po_from_reorder", {
            items: JSON.stringify([{
              item_code: a.value.item_code,
              qty: l.reorder_qty || a.value.reorder_qty,
              warehouse: l.reorder_warehouse_override || a.value.default_warehouse
            }]),
            supplier: l.reorder_supplier
          });
          k(`Purchase Order ${t.name} created as draft`, "success");
        } catch (t) {
          k(t.message || "Failed to create PO", "error");
        } finally {
          S.value = !1;
        }
      }
    }
    function p(t) {
      return Number(i(t)).toLocaleString("en-US", { maximumFractionDigits: 2 });
    }
    return te(I), (t, r) => {
      var b, A, U, B, W;
      return d(), n("div", ue, [
        e("div", me, [
          r[10] || (r[10] = e("div", { class: "rm-header-left" }, [
            e("div", { class: "rm-title" }, "Reorder Management"),
            e("div", { class: "rm-subtitle" }, "Monitor stock levels and configure automatic purchase orders")
          ], -1)),
          e("button", {
            class: "rm-btn-ghost",
            onClick: I,
            disabled: q.value
          }, [
            e("span", {
              innerHTML: m(f)("refresh", 14)
            }, null, 8, ce),
            r[9] || (r[9] = u(" Refresh ", -1))
          ], 8, ve)
        ]),
        q.value ? y("", !0) : (d(), n("div", _e, [
          e("div", {
            class: v(["rm-stat", { "rm-stat--alert": L.value.length }])
          }, [
            e("div", {
              class: v(["rm-stat-val", L.value.length ? "clr-red" : "clr-ok"])
            }, o(L.value.length), 3),
            r[11] || (r[11] = e("div", { class: "rm-stat-lbl" }, "Critical (0 stock)", -1))
          ], 2),
          e("div", {
            class: v(["rm-stat", { "rm-stat--warn": x.value.length }])
          }, [
            e("div", {
              class: v(["rm-stat-val", x.value.length ? "clr-orange" : "clr-ok"])
            }, o(x.value.length), 3),
            r[12] || (r[12] = e("div", { class: "rm-stat-lbl" }, "Low Stock", -1))
          ], 2),
          e("div", pe, [
            e("div", be, o(V.value.length), 1),
            r[13] || (r[13] = e("div", { class: "rm-stat-lbl" }, "Auto-PO Enabled", -1))
          ]),
          e("div", fe, [
            e("div", ye, o(c.value.length), 1),
            r[14] || (r[14] = e("div", { class: "rm-stat-lbl" }, "Total Monitored", -1))
          ])
        ])),
        e("div", {
          class: v(["rm-body", { "rm-body--detail-open": a.value }])
        }, [
          e("div", ge, [
            e("div", he, [
              (d(!0), n(h, null, T(j.value, (s) => (d(), n("button", {
                key: s.k,
                class: v(["rm-ftab", { "rm-ftab--active": M.value === s.k }]),
                onClick: (R) => M.value = s.k
              }, [
                u(o(s.l) + " ", 1),
                s.count > 0 ? (d(), n("span", {
                  key: 0,
                  class: v(["rm-ftab-badge", s.k === "critical" ? "badge-red" : s.k === "below" ? "badge-orange" : "badge-blue"])
                }, o(s.count), 3)) : y("", !0)
              ], 10, we))), 128))
            ]),
            e("div", ke, [
              e("span", {
                innerHTML: m(f)("search", 13),
                style: { color: "#9ca3af", "flex-shrink": "0" }
              }, null, 8, qe),
              w(e("input", {
                "onUpdate:modelValue": r[0] || (r[0] = (s) => P.value = s),
                placeholder: "Search items…",
                class: "rm-search-input"
              }, null, 512), [
                [H, P.value]
              ])
            ]),
            q.value ? (d(), n("div", Ce, [
              (d(), n(h, null, T(6, (s) => e("div", {
                key: s,
                class: "rm-item-row rm-item-row--sk"
              }, [...r[15] || (r[15] = [
                e("div", {
                  class: "rm-sk-line",
                  style: { width: "55%", height: "13px", "margin-bottom": "6px" }
                }, null, -1),
                e("div", {
                  class: "rm-sk-line",
                  style: { width: "35%", height: "11px" }
                }, null, -1)
              ])])), 64))
            ])) : (d(), n("div", Oe, [
              z.value.length ? y("", !0) : (d(), n("div", Me, [...r[16] || (r[16] = [
                e("div", { style: { "font-size": "28px", "margin-bottom": "6px" } }, "✅", -1),
                e("div", null, "No items match this filter", -1)
              ])])),
              (d(!0), n(h, null, T(z.value, (s) => {
                var R;
                return d(), n("div", {
                  key: s.item_code,
                  class: v(["rm-item-row", {
                    "rm-item-row--selected": ((R = a.value) == null ? void 0 : R.item_code) === s.item_code,
                    "rm-item-row--critical": m(i)(s.actual_qty) <= 0,
                    "rm-item-row--low": m(i)(s.actual_qty) > 0 && s.below_reorder
                  }]),
                  onClick: (Sr) => Y(s)
                }, [
                  e("div", Te, [
                    e("span", Se, o(s.item_name || s.item_code), 1),
                    e("span", {
                      class: v(["rm-badge", m(i)(s.actual_qty) <= 0 ? "badge-red" : s.below_reorder ? "badge-orange" : "badge-green"])
                    }, o(m(i)(s.actual_qty) <= 0 ? "Critical" : s.below_reorder ? "Low Stock" : "OK"), 3)
                  ]),
                  e("div", Pe, [
                    e("span", xe, o(s.item_code), 1),
                    e("span", Ae, [
                      e("span", {
                        class: v(m(i)(s.actual_qty) <= 0 ? "clr-red" : s.below_reorder ? "clr-orange" : "")
                      }, o(p(s.actual_qty)), 3),
                      r[17] || (r[17] = e("span", { style: { color: "#d1d5db" } }, " / ", -1)),
                      e("span", He, o(p(s.reorder_level)), 1)
                    ])
                  ]),
                  s.auto_po_enabled ? (d(), n("div", Re, [
                    e("span", {
                      innerHTML: m(f)("zap", 10)
                    }, null, 8, $e),
                    r[18] || (r[18] = u(" Auto-PO ", -1))
                  ])) : y("", !0)
                ], 10, Le);
              }), 128))
            ]))
          ]),
          e("div", {
            class: v(["rm-detail-panel", { "rm-detail-panel--visible": a.value }])
          }, [
            e("button", {
              class: "rm-mobile-back",
              onClick: r[1] || (r[1] = (s) => a.value = null)
            }, [
              e("span", {
                innerHTML: m(f)("arrow-left", 14)
              }, null, 8, Ee),
              r[19] || (r[19] = u(" Back to list ", -1))
            ]),
            a.value ? (d(), n(h, { key: 1 }, [
              e("div", Ve, [
                e("div", ze, [
                  e("div", null, [
                    e("div", Ie, o(a.value.item_name || a.value.item_code), 1),
                    e("div", Ue, o(a.value.item_code), 1)
                  ]),
                  e("span", {
                    class: v(["rm-badge rm-badge--lg", m(i)(l.actual_qty) <= 0 ? "badge-red" : l.below_reorder ? "badge-orange" : "badge-green"])
                  }, o(m(i)(l.actual_qty) <= 0 ? "Critical" : l.below_reorder ? "Low Stock" : "OK"), 3)
                ]),
                e("div", Be, [
                  e("div", We, [
                    e("div", {
                      class: v(["rm-metric-val", m(i)(l.actual_qty) <= 0 ? "clr-red" : l.below_reorder ? "clr-orange" : "clr-ok"])
                    }, o(p(l.actual_qty)), 3),
                    r[21] || (r[21] = e("div", { class: "rm-metric-lbl" }, "Current Stock", -1))
                  ]),
                  r[24] || (r[24] = e("div", { class: "rm-metric-div" }, null, -1)),
                  e("div", De, [
                    e("div", Fe, o(p(l.reorder_level)), 1),
                    r[22] || (r[22] = e("div", { class: "rm-metric-lbl" }, "Reorder Level", -1))
                  ]),
                  r[25] || (r[25] = e("div", { class: "rm-metric-div" }, null, -1)),
                  e("div", Qe, [
                    e("div", {
                      class: v(["rm-metric-val", l.shortage_qty > 0 ? "clr-red" : ""])
                    }, o(p(l.shortage_qty)), 3),
                    r[23] || (r[23] = e("div", { class: "rm-metric-lbl" }, "Shortage", -1))
                  ])
                ]),
                e("div", je, [
                  e("div", Je, [
                    e("div", {
                      class: v(["rm-stock-fill", m(i)(l.actual_qty) <= 0 ? "fill-red" : l.below_reorder ? "fill-orange" : "fill-green"]),
                      style: $({ width: J.value + "%" })
                    }, null, 6),
                    e("div", {
                      class: "rm-stock-marker",
                      style: $({ left: K.value + "%" }),
                      title: "Reorder Level"
                    }, null, 4)
                  ]),
                  e("div", Ke, [
                    r[26] || (r[26] = e("span", { style: { "font-size": "10px", color: "#6b7280" } }, "0", -1)),
                    e("span", Ye, "Reorder level: " + o(p(l.reorder_level)), 1)
                  ])
                ])
              ]),
              e("div", Ge, [
                e("div", Xe, [
                  e("div", Ze, [
                    e("div", er, [
                      e("span", {
                        innerHTML: m(f)("zap", 15),
                        style: $({ color: l.auto_po_enabled ? "#2563eb" : "#9ca3af" })
                      }, null, 12, rr),
                      r[27] || (r[27] = u(" Auto Purchase Order ", -1))
                    ]),
                    e("div", lr, o(l.auto_po_enabled ? "A draft PO is automatically created when stock drops below the reorder level." : "Only a notification is sent when stock drops below the reorder level."), 1)
                  ]),
                  e("button", {
                    class: v(["rm-toggle", { "rm-toggle--on": l.auto_po_enabled }]),
                    disabled: !t.$canEdit("inventory"),
                    title: t.$canEdit("inventory") ? "" : "Read-only access",
                    onClick: X
                  }, [...r[28] || (r[28] = [
                    e("div", { class: "rm-toggle-knob" }, null, -1)
                  ])], 10, tr)
                ]),
                l.auto_po_enabled && !l.reorder_supplier ? (d(), n("div", sr, [
                  e("span", {
                    innerHTML: m(f)("alert-triangle", 13)
                  }, null, 8, or),
                  r[29] || (r[29] = u(" Set a supplier below so auto-PO knows who to order from. ", -1))
                ])) : y("", !0)
              ]),
              e("div", ar, [
                r[41] || (r[41] = e("div", { class: "rm-card-title" }, "Reorder Configuration", -1)),
                e("div", ir, [
                  e("div", dr, [
                    r[31] || (r[31] = e("label", { class: "rm-label" }, "Supplier", -1)),
                    w(e("select", {
                      class: "rm-input",
                      "onUpdate:modelValue": r[2] || (r[2] = (s) => l.reorder_supplier = s)
                    }, [
                      r[30] || (r[30] = e("option", { value: "" }, "— Select Supplier —", -1)),
                      (d(!0), n(h, null, T(E.value, (s) => (d(), n("option", {
                        key: s.name,
                        value: s.name
                      }, o(s.supplier_name || s.name), 9, nr))), 128))
                    ], 512), [
                      [D, l.reorder_supplier]
                    ]),
                    r[32] || (r[32] = e("div", { class: "rm-field-hint" }, "Who supplies this item for restocking", -1))
                  ]),
                  e("div", ur, [
                    r[33] || (r[33] = e("label", { class: "rm-label" }, "Receive into Warehouse", -1)),
                    w(e("select", {
                      class: "rm-input",
                      "onUpdate:modelValue": r[3] || (r[3] = (s) => l.reorder_warehouse_override = s)
                    }, [
                      e("option", mr, o(a.value.default_warehouse ? `Default (${a.value.default_warehouse})` : "— Select Warehouse —"), 1),
                      (d(!0), n(h, null, T(N.value, (s) => (d(), n("option", {
                        key: s.name,
                        value: s.name
                      }, o(s.warehouse_name || s.name), 9, vr))), 128))
                    ], 512), [
                      [D, l.reorder_warehouse_override]
                    ]),
                    r[34] || (r[34] = e("div", { class: "rm-field-hint" }, "Where goods will be received (leave blank to use item's default warehouse)", -1))
                  ]),
                  e("div", cr, [
                    r[35] || (r[35] = e("label", { class: "rm-label" }, "Reorder Level", -1)),
                    w(e("input", {
                      class: "rm-input",
                      type: "number",
                      min: "0",
                      "onUpdate:modelValue": r[4] || (r[4] = (s) => l.reorder_level = s),
                      placeholder: "e.g. 10"
                    }, null, 512), [
                      [
                        H,
                        l.reorder_level,
                        void 0,
                        { number: !0 }
                      ]
                    ]),
                    r[36] || (r[36] = e("div", { class: "rm-field-hint" }, "Alert triggers when stock falls below this", -1))
                  ]),
                  e("div", _r, [
                    r[37] || (r[37] = e("label", { class: "rm-label" }, "Order Quantity", -1)),
                    w(e("input", {
                      class: "rm-input",
                      type: "number",
                      min: "0",
                      "onUpdate:modelValue": r[5] || (r[5] = (s) => l.reorder_qty = s),
                      placeholder: "e.g. 100"
                    }, null, 512), [
                      [
                        H,
                        l.reorder_qty,
                        void 0,
                        { number: !0 }
                      ]
                    ]),
                    r[38] || (r[38] = e("div", { class: "rm-field-hint" }, "Units to order per reorder", -1))
                  ]),
                  e("div", pr, [
                    r[39] || (r[39] = e("label", { class: "rm-label" }, "Notes / Terms", -1)),
                    w(e("textarea", {
                      class: "rm-input rm-textarea",
                      "onUpdate:modelValue": r[6] || (r[6] = (s) => l.reorder_notes = s),
                      placeholder: "e.g. always request quality certificate, 30-day credit terms…",
                      rows: "3"
                    }, null, 512), [
                      [H, l.reorder_notes]
                    ]),
                    r[40] || (r[40] = e("div", { class: "rm-field-hint" }, "Attached to auto-generated purchase orders", -1))
                  ])
                ]),
                e("div", br, [
                  e("button", {
                    class: "rm-btn-primary",
                    onClick: G,
                    disabled: C.value || !t.$canEdit("inventory")
                  }, [
                    C.value ? (d(), n("span", yr)) : y("", !0),
                    u(" " + o(C.value ? "Saving…" : "Save Config"), 1)
                  ], 8, fr),
                  e("button", {
                    class: "rm-btn-secondary",
                    onClick: ee,
                    disabled: S.value || !t.$canCreate("bills"),
                    title: t.$canCreate("bills") ? "" : "Read-only access"
                  }, [
                    e("span", {
                      innerHTML: m(f)("plus", 14)
                    }, null, 8, hr),
                    u(" " + o(S.value ? "Creating…" : "Create PO Now"), 1)
                  ], 8, gr)
                ])
              ])
            ], 64)) : (d(), n("div", Ne, [...r[20] || (r[20] = [
              e("div", { class: "rm-detail-empty-icon" }, "📦", -1),
              e("div", { class: "rm-detail-empty-title" }, "Select an item", -1),
              e("div", { class: "rm-detail-empty-sub" }, "Choose an item from the list to view and configure its reorder settings", -1)
            ])]))
          ], 2)
        ], 2),
        (d(), se(ae, { to: "body" }, [
          O.value ? (d(), n("div", {
            key: 0,
            class: "rm-modal-overlay",
            onClick: r[8] || (r[8] = oe((s) => O.value = !1, ["self"]))
          }, [
            e("div", wr, [
              r[51] || (r[51] = e("div", { class: "rm-modal-icon" }, "🤖", -1)),
              r[52] || (r[52] = e("div", { class: "rm-modal-title" }, "Enable Auto Purchase Orders?", -1)),
              e("div", kr, [
                r[49] || (r[49] = e("p", null, [
                  u("You're enabling "),
                  e("b", null, "automatic PO creation"),
                  u(" for:")
                ], -1)),
                e("div", qr, o(((b = a.value) == null ? void 0 : b.item_name) || ((A = a.value) == null ? void 0 : A.item_code)), 1),
                e("p", null, [
                  r[42] || (r[42] = u("Whenever stock drops below ", -1)),
                  e("b", null, o(p(l.reorder_level)) + " " + o(((U = a.value) == null ? void 0 : U.stock_uom) || "units"), 1),
                  r[43] || (r[43] = u(", the system will ", -1)),
                  r[44] || (r[44] = e("b", null, "automatically create a draft Purchase Order", -1)),
                  r[45] || (r[45] = u(" using:", -1))
                ]),
                e("ul", Cr, [
                  e("li", null, [
                    r[46] || (r[46] = e("b", null, "Supplier:", -1)),
                    u(" " + o(l.reorder_supplier || "(not set — set one to avoid blank POs)"), 1)
                  ]),
                  e("li", null, [
                    r[47] || (r[47] = e("b", null, "Warehouse:", -1)),
                    u(" " + o(l.reorder_warehouse_override || ((B = a.value) == null ? void 0 : B.default_warehouse) || "(not set)"), 1)
                  ]),
                  e("li", null, [
                    r[48] || (r[48] = e("b", null, "Order Qty:", -1)),
                    u(" " + o(p(l.reorder_qty)) + " " + o(((W = a.value) == null ? void 0 : W.stock_uom) || "units"), 1)
                  ])
                ]),
                r[50] || (r[50] = e("div", { class: "rm-modal-note" }, [
                  u(" The PO will be in "),
                  e("b", null, "Draft"),
                  u(" status — you must submit it manually to place the order. ")
                ], -1))
              ]),
              e("div", Or, [
                e("button", {
                  class: "rm-btn-ghost",
                  onClick: r[7] || (r[7] = (s) => O.value = !1)
                }, "Cancel"),
                e("button", {
                  class: "rm-btn-primary",
                  disabled: !t.$canEdit("inventory"),
                  onClick: Z
                }, "Yes, Enable Auto-PO", 8, Mr)
              ])
            ])
          ])) : y("", !0)
        ]))
      ]);
    };
  }
}, Ar = /* @__PURE__ */ re(Lr, [["__scopeId", "data-v-5fd45b91"]]);
export {
  Ar as default
};
