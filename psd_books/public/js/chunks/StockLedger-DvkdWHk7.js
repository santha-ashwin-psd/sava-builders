import { _ as re, x as ue, z as de, o as ce, c, a as t, u as i, i as h, w as W, A as z, D as J, d as m, C as ve, b as y, F as g, r as H, t as a, q as me, n as b, f as U, e as X, h as f, g as C, j as _e, k as r } from "./main-BmX9V7v7.js";
import { b as x, f as n } from "./format-BcJZDVG4.js";
import { _ as Z } from "./SearchableSelect-Cc8f6Ofm.js";
import { S as fe } from "./SummaryStrip-D_vNEZNe.js";
const pe = { class: "sl-page" }, he = { class: "sl-filterbar" }, ye = { class: "sl-fld sl-fld-search" }, ge = { class: "sl-search-wrap" }, be = ["innerHTML"], ke = { class: "sl-fld sl-fld-item" }, we = { class: "sl-fld sl-fld-wh" }, Le = { class: "sl-fld sl-fld-date" }, Ce = { class: "sl-fld sl-fld-date" }, Te = ["innerHTML"], Me = ["disabled"], qe = ["innerHTML"], Se = {
  key: 1,
  class: "sl-toolbar"
}, Ve = { class: "sl-filter-pills" }, He = ["onClick"], xe = { class: "sl-fpill-count" }, Ie = { class: "sl-toolbar-right" }, $e = { class: "sl-result" }, Oe = { class: "sl-card" }, De = { class: "sl-table sl-desktop-table" }, Ne = ["innerHTML"], Re = ["innerHTML"], Ue = ["innerHTML"], Be = ["innerHTML"], Ee = ["innerHTML"], Fe = ["onClick"], Qe = { class: "mono-sm text-muted" }, je = ["title"], Ae = { class: "text-muted" }, We = {
  class: "text-muted",
  style: { "font-size": "12px" }
}, ze = { class: "sl-voucher" }, Ke = { class: "ta-r mono-sm" }, Pe = { class: "ta-r mono-sm" }, Ye = { key: 0 }, Ge = {
  colspan: "8",
  class: "sl-empty"
}, Je = { class: "sl-mobile-cards" }, Xe = {
  key: 1,
  class: "sl-mc-empty"
}, Ze = ["onClick"], et = { class: "sl-mc-top" }, tt = { class: "sl-mc-date" }, st = { class: "sl-mc-mid" }, lt = { class: "sl-mc-meta" }, at = { class: "sl-dheader" }, nt = ["innerHTML"], ot = { class: "sl-dh-top" }, it = { class: "sl-dh-ico" }, rt = ["innerHTML"], ut = { class: "sl-dh-title" }, dt = { class: "sl-dh-sub" }, ct = {
  key: 0,
  style: { "margin-left": "6px" }
}, vt = { class: "sl-dh-amount" }, mt = { class: "sl-dh-amt-lbl" }, _t = { class: "sl-dbody" }, ft = { class: "sl-section-hdr" }, pt = ["innerHTML"], ht = { class: "sl-meta-grid" }, yt = {
  key: 0,
  style: { "margin-left": "6px" }
}, gt = { class: "sl-section-hdr" }, bt = ["innerHTML"], kt = { class: "sl-meta-grid" }, wt = { style: { color: "#2563eb" } }, Lt = ["innerHTML"], Ct = { class: "sl-dfooter" }, Tt = {
  __name: "StockLedger",
  setup(Mt) {
    const { toast: K } = ue(), ee = _e(), v = f([]), T = f(!1), I = f(!1), B = f([]), E = f([]), $ = f(""), O = f("all"), k = f(!1), o = f(null), D = f("posting_date"), M = f("desc"), F = /* @__PURE__ */ new Date(), te = new Date(F.getFullYear(), F.getMonth(), 1).toISOString().slice(0, 10), u = de({ item: "", warehouse: "", from_date: te, to_date: F.toISOString().slice(0, 10) });
    async function se() {
      T.value = !0, I.value = !0;
      try {
        const e = [["company", "=", await X()]];
        u.item && e.push(["item_code", "=", u.item]), u.warehouse && e.push(["warehouse", "=", u.warehouse]), u.from_date && e.push(["posting_date", ">=", u.from_date]), u.to_date && e.push(["posting_date", "<=", u.to_date]), v.value = await U("Stock Ledger Entry", { fields: ["name", "posting_date", "posting_time", "item_code", "warehouse", "voucher_type", "voucher_no", "actual_qty", "qty_after_transaction", "stock_value_difference", "valuation_rate"], filters: e, limit: 1e5, order: "posting_date asc" }), await ie();
      } catch (l) {
        K.error(l.message || "Failed to load stock ledger");
      } finally {
        T.value = !1;
      }
    }
    const N = C(() => {
      let l = v.value;
      if (O.value === "in" ? l = l.filter((e) => n(e.actual_qty) > 0) : O.value === "out" && (l = l.filter((e) => n(e.actual_qty) < 0)), $.value.trim()) {
        const e = $.value.toLowerCase();
        l = l.filter((s) => (s.item_code || "").toLowerCase().includes(e) || (s.item_name || "").toLowerCase().includes(e) || (s.voucher_no || "").toLowerCase().includes(e) || (s.warehouse || "").toLowerCase().includes(e) || (s.voucher_type || "").toLowerCase().includes(e));
      }
      return l;
    }), w = C(() => {
      const l = D.value;
      return [...N.value].sort((e, s) => {
        const d = e[l] ?? "", V = s[l] ?? "", L = typeof d == "number" ? d - V : String(d).localeCompare(String(V));
        return M.value === "asc" ? L : -L;
      });
    });
    function q(l) {
      D.value === l ? M.value = M.value === "asc" ? "desc" : "asc" : (D.value = l, M.value = "asc");
    }
    function S(l) {
      return D.value !== l ? '<span style="color:#d1d5db">⇅</span>' : M.value === "asc" ? "↑" : "↓";
    }
    const le = C(() => [
      { key: "all", label: "All", count: v.value.length },
      { key: "in", label: "Inward", count: v.value.filter((l) => n(l.actual_qty) > 0).length },
      { key: "out", label: "Outward", count: v.value.filter((l) => n(l.actual_qty) < 0).length }
    ]), Q = C(() => N.value.filter((l) => n(l.actual_qty) > 0).reduce((l, e) => l + n(e.actual_qty), 0)), j = C(() => N.value.filter((l) => n(l.actual_qty) < 0).reduce((l, e) => l + Math.abs(n(e.actual_qty)), 0)), ae = C(() => N.value.reduce((l, e) => l + n(e.stock_value_difference), 0));
    function P(l) {
      o.value = l, k.value = !0;
    }
    function ne(l) {
      l.voucher_no && ee.push({ name: "stock-entries", query: { open: l.voucher_no } });
    }
    function R(l) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format(n(l));
    }
    function p(l) {
      return Number(n(l)).toLocaleString("en-US", { maximumFractionDigits: 3 });
    }
    function oe() {
      const l = w.value;
      if (!l.length) return;
      const e = (_) => {
        const A = _ == null ? "" : String(_);
        return /[",\n]/.test(A) ? '"' + A.replace(/"/g, '""') + '"' : A;
      }, s = [["Date", "Item", "Warehouse", "Voucher Type", "Voucher #", "Qty In/Out", "Balance Qty", "Value Change", "Valuation Rate"].join(",")];
      for (const _ of l)
        s.push([x(_.posting_date), _.item_code || "", _.warehouse || "", _.voucher_type || "", _.voucher_no || "", n(_.actual_qty), n(_.qty_after_transaction), n(_.stock_value_difference), n(_.valuation_rate)].map(e).join(","));
      const d = new Blob(["\uFEFF" + s.join(`\r
`)], { type: "text/csv;charset=utf-8;" }), V = URL.createObjectURL(d), L = document.createElement("a");
      L.href = V, L.download = `stock_ledger_${u.from_date}_to_${u.to_date}.csv`, L.click(), URL.revokeObjectURL(V), K.success(`Exported ${l.length} row(s)`);
    }
    async function ie() {
      const l = [...new Set(v.value.map((e) => e.item_code).filter(Boolean))];
      if (l.length)
        try {
          const e = await U("Item", { fields: ["name", "item_name"], filters: [["name", "in", l]], limit: 1e5 }), s = {};
          e.forEach((d) => {
            s[d.name] = d.item_name;
          }), v.value = v.value.map((d) => ({ ...d, item_name: s[d.item_code] || d.item_code }));
        } catch {
          v.value = v.value.map((e) => ({ ...e, item_name: e.item_code }));
        }
    }
    async function Y(l = "") {
      try {
        const e = await U("Item", { fields: ["name", "item_name"], filters: l ? [["name", "like", "%" + l + "%"]] : [], limit: 200 });
        B.value = e.map((s) => ({ label: s.item_name || s.name, value: s.name }));
      } catch {
        B.value = [];
      }
    }
    async function G(l = "") {
      try {
        const e = await X(), s = await U("Warehouse", { fields: ["name"], filters: [["company", "=", e], ["is_group", "=", 0], ...l ? [["name", "like", `%${l}%`]] : []], limit: 20 });
        E.value = s.map((d) => ({ label: d.name, value: d.name }));
      } catch {
        E.value = [];
      }
    }
    return ce(() => {
      Y(""), G("");
    }), (l, e) => (r(), c("div", pe, [
      t("div", he, [
        t("div", ye, [
          e[14] || (e[14] = t("label", { class: "sl-fld-lbl" }, "Search", -1)),
          t("div", ge, [
            t("span", {
              innerHTML: i(h)("search", 13),
              style: { color: "#94a3b8", "flex-shrink": "0" }
            }, null, 8, be),
            W(t("input", {
              "onUpdate:modelValue": e[0] || (e[0] = (s) => $.value = s),
              placeholder: "Search item / voucher / warehouse…",
              class: "sl-search-input"
            }, null, 512), [
              [z, $.value]
            ])
          ])
        ]),
        t("div", ke, [
          e[15] || (e[15] = t("label", { class: "sl-fld-lbl" }, "Item", -1)),
          J(Z, {
            modelValue: u.item,
            "onUpdate:modelValue": e[1] || (e[1] = (s) => u.item = s),
            options: B.value,
            placeholder: "All items",
            onSearch: Y
          }, null, 8, ["modelValue", "options"])
        ]),
        t("div", we, [
          e[16] || (e[16] = t("label", { class: "sl-fld-lbl" }, "Warehouse", -1)),
          J(Z, {
            modelValue: u.warehouse,
            "onUpdate:modelValue": e[2] || (e[2] = (s) => u.warehouse = s),
            options: E.value,
            placeholder: "All warehouses",
            onSearch: G
          }, null, 8, ["modelValue", "options"])
        ]),
        t("div", Le, [
          e[17] || (e[17] = t("label", { class: "sl-fld-lbl" }, "From", -1)),
          W(t("input", {
            "onUpdate:modelValue": e[3] || (e[3] = (s) => u.from_date = s),
            type: "date",
            class: "sl-input"
          }, null, 512), [
            [z, u.from_date]
          ])
        ]),
        t("div", Ce, [
          e[18] || (e[18] = t("label", { class: "sl-fld-lbl" }, "To", -1)),
          W(t("input", {
            "onUpdate:modelValue": e[4] || (e[4] = (s) => u.to_date = s),
            type: "date",
            class: "sl-input"
          }, null, 512), [
            [z, u.to_date]
          ])
        ]),
        t("button", {
          class: "sl-btn-primary",
          onClick: se
        }, [
          t("span", {
            innerHTML: i(h)("refresh", 13)
          }, null, 8, Te),
          e[19] || (e[19] = m(" Run", -1))
        ]),
        t("button", {
          class: "sl-btn-ghost",
          onClick: oe,
          disabled: !v.value.length
        }, [
          t("span", {
            innerHTML: i(h)("download", 13)
          }, null, 8, qe),
          e[20] || (e[20] = m(" Export", -1))
        ], 8, Me)
      ]),
      !T.value && v.value.length ? (r(), ve(fe, {
        key: 0,
        cards: [
          { label: "Inward Qty", tone: "success", value: p(Q.value), valueClass: "green" },
          { label: "Outward Qty", tone: "danger", value: p(j.value), valueClass: "red" },
          { label: "Net Qty", tone: "accent", value: p(Q.value - j.value), valueClass: Q.value - j.value >= 0 ? "green" : "red" },
          { label: "Stock Value", tone: "info", value: R(ae.value), valueClass: "blue" }
        ]
      }, null, 8, ["cards"])) : y("", !0),
      I.value && v.value.length ? (r(), c("div", Se, [
        t("div", Ve, [
          (r(!0), c(g, null, H(le.value, (s) => (r(), c("button", {
            key: s.key,
            class: b(["sl-fpill", { active: O.value === s.key }]),
            onClick: (d) => O.value = s.key
          }, [
            m(a(s.label) + " ", 1),
            t("span", xe, a(s.count), 1)
          ], 10, He))), 128))
        ]),
        t("div", Ie, [
          t("span", $e, a(w.value.length) + " of " + a(v.value.length), 1)
        ])
      ])) : y("", !0),
      t("div", Oe, [
        t("table", De, [
          t("thead", null, [
            t("tr", null, [
              t("th", {
                onClick: e[5] || (e[5] = (s) => q("posting_date")),
                class: "sortable"
              }, [
                e[21] || (e[21] = m("Date ", -1)),
                t("span", {
                  innerHTML: S("posting_date")
                }, null, 8, Ne)
              ]),
              t("th", {
                onClick: e[6] || (e[6] = (s) => q("item_name")),
                class: "sortable"
              }, [
                e[22] || (e[22] = m("Item ", -1)),
                t("span", {
                  innerHTML: S("item_name")
                }, null, 8, Re)
              ]),
              t("th", {
                onClick: e[7] || (e[7] = (s) => q("warehouse")),
                class: "sortable"
              }, [
                e[23] || (e[23] = m("Warehouse ", -1)),
                t("span", {
                  innerHTML: S("warehouse")
                }, null, 8, Ue)
              ]),
              e[26] || (e[26] = t("th", null, "Voucher Type", -1)),
              e[27] || (e[27] = t("th", null, "Voucher #", -1)),
              t("th", {
                onClick: e[8] || (e[8] = (s) => q("actual_qty")),
                class: "sortable ta-r"
              }, [
                e[24] || (e[24] = m("Qty In/Out ", -1)),
                t("span", {
                  innerHTML: S("actual_qty")
                }, null, 8, Be)
              ]),
              t("th", {
                onClick: e[9] || (e[9] = (s) => q("qty_after_transaction")),
                class: "sortable ta-r"
              }, [
                e[25] || (e[25] = m("Balance Qty ", -1)),
                t("span", {
                  innerHTML: S("qty_after_transaction")
                }, null, 8, Ee)
              ]),
              e[28] || (e[28] = t("th", { class: "ta-r" }, "Value", -1))
            ])
          ]),
          t("tbody", null, [
            T.value ? (r(), c(g, { key: 0 }, H(10, (s) => t("tr", { key: s }, [...e[29] || (e[29] = [
              t("td", { colspan: "8" }, [
                t("div", { class: "sl-shimmer" })
              ], -1)
            ])])), 64)) : (r(), c(g, { key: 1 }, [
              (r(!0), c(g, null, H(w.value, (s) => (r(), c("tr", {
                key: s.name,
                class: "sl-row",
                onClick: (d) => P(s)
              }, [
                t("td", Qe, a(i(x)(s.posting_date)), 1),
                t("td", {
                  class: "font-medium",
                  title: s.item_code
                }, a(s.item_name || s.item_code), 9, je),
                t("td", Ae, a(s.warehouse), 1),
                t("td", We, a(s.voucher_type), 1),
                t("td", null, [
                  t("span", ze, a(s.voucher_no), 1)
                ]),
                t("td", {
                  class: b(["ta-r mono-sm", i(n)(s.actual_qty) > 0 ? "green" : "red"])
                }, a(i(n)(s.actual_qty) > 0 ? "+" : "") + a(p(s.actual_qty)), 3),
                t("td", Ke, a(p(s.qty_after_transaction)), 1),
                t("td", Pe, a(R(s.stock_value_difference)), 1)
              ], 8, Fe))), 128)),
              w.value.length ? y("", !0) : (r(), c("tr", Ye, [
                t("td", Ge, a(I.value ? v.value.length ? "No entries match this filter" : "No ledger entries found" : "Run to view stock ledger"), 1)
              ]))
            ], 64))
          ])
        ]),
        t("div", Je, [
          T.value ? (r(), c(g, { key: 0 }, H(6, (s) => t("div", {
            key: s,
            class: "sl-mobile-card sl-mc--skeleton"
          }, [...e[30] || (e[30] = [
            t("div", {
              class: "sl-mc-shimmer",
              style: { height: "13px", width: "55%", "margin-bottom": "8px" }
            }, null, -1),
            t("div", {
              class: "sl-mc-shimmer",
              style: { height: "11px", width: "40%", "margin-bottom": "6px" }
            }, null, -1),
            t("div", {
              class: "sl-mc-shimmer",
              style: { height: "11px", width: "65%" }
            }, null, -1)
          ])])), 64)) : w.value.length ? (r(!0), c(g, { key: 2 }, H(w.value, (s) => (r(), c("div", {
            key: s.name,
            class: "sl-mobile-card",
            onClick: (d) => P(s)
          }, [
            t("div", et, [
              t("span", tt, a(i(x)(s.posting_date)), 1),
              t("span", {
                class: b(i(n)(s.actual_qty) > 0 ? "sl-mc-pos" : "sl-mc-neg")
              }, a(i(n)(s.actual_qty) > 0 ? "+" : "") + a(p(s.actual_qty)), 3)
            ]),
            t("div", st, a(s.item_name || s.item_code), 1),
            t("div", lt, [
              t("span", null, a(s.voucher_type) + " · " + a(s.voucher_no), 1),
              t("span", null, "Bal: " + a(p(s.qty_after_transaction)), 1)
            ])
          ], 8, Ze))), 128)) : (r(), c("div", Xe, [
            e[31] || (e[31] = t("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "📒", -1)),
            t("div", null, a(I.value ? v.value.length ? "No entries match" : "No ledger entries" : "Run filters to view ledger"), 1)
          ]))
        ])
      ]),
      k.value ? (r(), c("div", {
        key: 2,
        class: "sl-overlay",
        onClick: e[10] || (e[10] = me((s) => k.value = !1, ["self"]))
      })) : y("", !0),
      t("div", {
        class: b(["sl-drawer", { open: k.value }])
      }, [
        o.value ? (r(), c(g, { key: 0 }, [
          t("div", at, [
            t("button", {
              class: "sl-dclose",
              onClick: e[11] || (e[11] = (s) => k.value = !1)
            }, [
              t("span", {
                innerHTML: i(h)("x", 16)
              }, null, 8, nt)
            ]),
            t("div", ot, [
              t("div", it, [
                t("span", {
                  innerHTML: i(h)("ledger", 20)
                }, null, 8, rt)
              ]),
              t("div", null, [
                t("div", ut, a(o.value.item_code), 1),
                t("div", dt, [
                  m(a(o.value.warehouse) + " · " + a(i(x)(o.value.posting_date)), 1),
                  o.value.posting_time ? (r(), c("span", ct, a(String(o.value.posting_time).slice(0, 8)), 1)) : y("", !0)
                ])
              ]),
              t("span", {
                class: b(["sl-badge", i(n)(o.value.actual_qty) >= 0 ? "badge-green" : "badge-red"])
              }, a(i(n)(o.value.actual_qty) >= 0 ? "Inward" : "Outward"), 3)
            ]),
            t("div", vt, [
              t("div", mt, "Quantity " + a(i(n)(o.value.actual_qty) >= 0 ? "In" : "Out"), 1),
              t("div", {
                class: b(["sl-dh-amt-val", i(n)(o.value.actual_qty) >= 0 ? "green" : "red"])
              }, a(i(n)(o.value.actual_qty) > 0 ? "+" : "") + a(p(o.value.actual_qty)), 3)
            ])
          ]),
          t("div", _t, [
            t("div", ft, [
              t("span", {
                innerHTML: i(h)("info", 13)
              }, null, 8, pt),
              e[32] || (e[32] = m(" Movement", -1))
            ]),
            t("div", ht, [
              t("div", null, [
                e[33] || (e[33] = t("div", { class: "sl-meta-lbl" }, "Balance After", -1)),
                t("div", null, a(p(o.value.qty_after_transaction)), 1)
              ]),
              t("div", null, [
                e[34] || (e[34] = t("div", { class: "sl-meta-lbl" }, "Valuation Rate", -1)),
                t("div", null, a(R(o.value.valuation_rate)), 1)
              ]),
              t("div", null, [
                e[35] || (e[35] = t("div", { class: "sl-meta-lbl" }, "Value Change", -1)),
                t("div", {
                  class: b(i(n)(o.value.stock_value_difference) >= 0 ? "green" : "red")
                }, a(R(o.value.stock_value_difference)), 3)
              ]),
              t("div", null, [
                e[36] || (e[36] = t("div", { class: "sl-meta-lbl" }, "Posting Date", -1)),
                t("div", null, [
                  m(a(i(x)(o.value.posting_date)), 1),
                  o.value.posting_time ? (r(), c("span", yt, a(String(o.value.posting_time).slice(0, 8)), 1)) : y("", !0)
                ])
              ])
            ]),
            t("div", gt, [
              t("span", {
                innerHTML: i(h)("file", 13)
              }, null, 8, bt),
              e[37] || (e[37] = m(" Source Voucher", -1))
            ]),
            t("div", kt, [
              t("div", null, [
                e[38] || (e[38] = t("div", { class: "sl-meta-lbl" }, "Type", -1)),
                t("div", null, a(o.value.voucher_type || "—"), 1)
              ]),
              t("div", null, [
                e[39] || (e[39] = t("div", { class: "sl-meta-lbl" }, "Number", -1)),
                t("div", wt, a(o.value.voucher_no || "—"), 1)
              ])
            ]),
            o.value.voucher_type === "Stock Entry" ? (r(), c("button", {
              key: 0,
              class: "sl-link-btn",
              onClick: e[12] || (e[12] = (s) => ne(o.value))
            }, [
              t("span", {
                innerHTML: i(h)("ext", 14)
              }, null, 8, Lt),
              e[40] || (e[40] = m(" Open Stock Entry ", -1))
            ])) : y("", !0)
          ]),
          t("div", Ct, [
            t("button", {
              class: "sl-btn-ghost",
              onClick: e[13] || (e[13] = (s) => k.value = !1)
            }, "Close")
          ])
        ], 64)) : y("", !0)
      ], 2)
    ]));
  }
}, xt = /* @__PURE__ */ re(Tt, [["__scopeId", "data-v-56cbb89e"]]);
export {
  xt as default
};
