import { _ as ct, x as mt, z as vt, o as _t, c as u, a as e, u as d, i as k, w as z, A, D as Z, d as h, C as ft, b as y, F as b, r as I, t as o, q as ht, n as L, f as M, e as tt, h as g, g as T, j as pt, k as r } from "./main-LhCeK3GV.js";
import { b as $, f as n } from "./format-BcJZDVG4.js";
import { _ as et } from "./SearchableSelect-CmWmhQpu.js";
import { S as yt } from "./SummaryStrip-BcGpwh6U.js";
const gt = { class: "sl-page" }, wt = { class: "sl-filterbar" }, kt = { class: "sl-fld sl-fld-search" }, bt = { class: "sl-search-wrap" }, Lt = ["innerHTML"], St = { class: "sl-fld sl-fld-item" }, Ct = { class: "sl-fld sl-fld-wh" }, Mt = { class: "sl-fld sl-fld-date" }, Tt = { class: "sl-fld sl-fld-date" }, qt = ["innerHTML"], Vt = ["disabled"], xt = ["innerHTML"], Ht = {
  key: 1,
  class: "sl-toolbar"
}, It = { class: "sl-filter-pills" }, $t = ["onClick"], Et = { class: "sl-fpill-count" }, Dt = { class: "sl-toolbar-right" }, Ot = { class: "sl-result" }, Nt = { class: "sl-card" }, Bt = { class: "sl-table sl-desktop-table" }, Rt = ["innerHTML"], Ut = ["innerHTML"], Ft = ["innerHTML"], Qt = ["innerHTML"], jt = ["innerHTML"], Wt = ["onClick"], zt = { class: "mono-sm text-muted" }, At = ["title"], Kt = { class: "text-muted" }, Pt = {
  class: "text-muted",
  style: { "font-size": "12px" }
}, Yt = { class: "sl-voucher" }, Gt = {
  key: 0,
  class: "sl-wh-flow"
}, Jt = ["title"], Xt = {
  key: 1,
  style: { color: "#9ca3af", "font-size": "11px" }
}, Zt = ["title"], te = {
  key: 1,
  class: "text-muted",
  style: { "font-size": "12px" }
}, ee = { class: "ta-r mono-sm" }, se = { class: "ta-r mono-sm" }, le = { key: 0 }, oe = {
  colspan: "9",
  class: "sl-empty"
}, ae = { class: "sl-mobile-cards" }, ne = {
  key: 1,
  class: "sl-mc-empty"
}, ie = ["onClick"], re = { class: "sl-mc-top" }, ue = { class: "sl-mc-date" }, de = { class: "sl-mc-mid" }, ce = { class: "sl-mc-meta" }, me = { class: "sl-dheader" }, ve = ["innerHTML"], _e = { class: "sl-dh-top" }, fe = { class: "sl-dh-ico" }, he = ["innerHTML"], pe = { class: "sl-dh-title" }, ye = { class: "sl-dh-sub" }, ge = {
  key: 0,
  style: { "margin-left": "6px" }
}, we = { class: "sl-dh-amount" }, ke = { class: "sl-dh-amt-lbl" }, be = { class: "sl-dbody" }, Le = { class: "sl-section-hdr" }, Se = ["innerHTML"], Ce = { class: "sl-meta-grid" }, Me = {
  key: 0,
  style: { "margin-left": "6px" }
}, Te = { class: "sl-section-hdr" }, qe = ["innerHTML"], Ve = { class: "sl-meta-grid" }, xe = { style: { color: "#2563eb" } }, He = ["innerHTML"], Ie = { class: "sl-dfooter" }, $e = {
  __name: "StockLedger",
  setup(Ee) {
    const { toast: K } = mt(), st = pt(), c = g([]), q = g(!1), E = g(!1), U = g([]), F = g([]), D = g(""), O = g("all"), S = g(!1), i = g(null), N = g("posting_date"), V = g("desc"), Q = /* @__PURE__ */ new Date(), lt = new Date(Q.getFullYear(), Q.getMonth(), 1).toISOString().slice(0, 10), m = vt({ item: "", warehouse: "", from_date: lt, to_date: Q.toISOString().slice(0, 10) });
    async function ot() {
      q.value = !0, E.value = !0;
      try {
        const t = [["company", "=", await tt()]];
        m.item && t.push(["item_code", "=", m.item]), m.warehouse && t.push(["warehouse", "=", m.warehouse]), m.from_date && t.push(["posting_date", ">=", m.from_date]), m.to_date && t.push(["posting_date", "<=", m.to_date]), c.value = await M("Stock Ledger Entry", { fields: ["name", "posting_date", "posting_time", "creation", "item_code", "warehouse", "voucher_type", "voucher_no", "actual_qty", "qty_after_transaction", "stock_value_difference", "valuation_rate"], filters: t, limit: 1e5, order: "posting_date asc" }), await ut(), await dt();
      } catch (l) {
        K.error(l.message || "Failed to load stock ledger");
      } finally {
        q.value = !1;
      }
    }
    const B = T(() => {
      let l = c.value;
      if (O.value === "in" ? l = l.filter((t) => n(t.actual_qty) > 0) : O.value === "out" && (l = l.filter((t) => n(t.actual_qty) < 0)), D.value.trim()) {
        const t = D.value.toLowerCase();
        l = l.filter((s) => (s.item_code || "").toLowerCase().includes(t) || (s.item_name || "").toLowerCase().includes(t) || (s.voucher_no || "").toLowerCase().includes(t) || (s.warehouse || "").toLowerCase().includes(t) || (s.voucher_type || "").toLowerCase().includes(t));
      }
      return l;
    }), C = T(() => {
      const l = N.value;
      return [...B.value].sort((t, s) => {
        const a = t[l] ?? "", f = s[l] ?? "";
        let p = typeof a == "number" ? a - f : String(a).localeCompare(String(f));
        return p === 0 && l === "posting_date" && (p = String(t.posting_time || "").localeCompare(String(s.posting_time || "")) || String(t.creation || "").localeCompare(String(s.creation || ""))), V.value === "asc" ? p : -p;
      });
    });
    function x(l) {
      N.value === l ? V.value = V.value === "asc" ? "desc" : "asc" : (N.value = l, V.value = "asc");
    }
    function H(l) {
      return N.value !== l ? '<span style="color:#d1d5db">⇅</span>' : V.value === "asc" ? "↑" : "↓";
    }
    const at = T(() => [
      { key: "all", label: "All", count: c.value.length },
      { key: "in", label: "Inward", count: c.value.filter((l) => n(l.actual_qty) > 0).length },
      { key: "out", label: "Outward", count: c.value.filter((l) => n(l.actual_qty) < 0).length }
    ]), j = T(() => B.value.filter((l) => n(l.actual_qty) > 0).reduce((l, t) => l + n(t.actual_qty), 0)), W = T(() => B.value.filter((l) => n(l.actual_qty) < 0).reduce((l, t) => l + Math.abs(n(t.actual_qty)), 0)), nt = T(() => B.value.reduce((l, t) => l + n(t.stock_value_difference), 0));
    function P(l) {
      i.value = l, S.value = !0;
    }
    function it(l) {
      l.voucher_no && st.push({ name: "stock-entries", query: { open: l.voucher_no } });
    }
    function R(l) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format(n(l));
    }
    function w(l) {
      return Number(n(l)).toLocaleString("en-US", { maximumFractionDigits: 3 });
    }
    function rt() {
      const l = C.value;
      if (!l.length) return;
      const t = (v) => {
        const _ = v == null ? "" : String(v);
        return /[",\n]/.test(_) ? '"' + _.replace(/"/g, '""') + '"' : _;
      }, s = [["Date", "Item", "Warehouse", "Voucher Type", "Voucher #", "Stock Movement", "Qty In/Out", "Balance Qty", "Value Change", "Valuation Rate"].join(",")];
      for (const v of l)
        s.push([$(v.posting_date), v.item_code || "", v.warehouse || "", v.voucher_type || "", v.voucher_no || "", [v.wh_from, v.wh_to].filter(Boolean).join(" → "), n(v.actual_qty), n(v.qty_after_transaction), n(v.stock_value_difference), n(v.valuation_rate)].map(t).join(","));
      const a = new Blob(["\uFEFF" + s.join(`\r
`)], { type: "text/csv;charset=utf-8;" }), f = URL.createObjectURL(a), p = document.createElement("a");
      p.href = f, p.download = `stock_ledger_${m.from_date}_to_${m.to_date}.csv`, p.click(), URL.revokeObjectURL(f), K.success(`Exported ${l.length} row(s)`);
    }
    async function ut() {
      const l = [...new Set(c.value.map((t) => t.item_code).filter(Boolean))];
      if (l.length)
        try {
          const t = await M("Item", { fields: ["name", "item_name"], filters: [["name", "in", l]], limit: 1e5 }), s = {};
          t.forEach((a) => {
            s[a.name] = a.item_name;
          }), c.value = c.value.map((a) => ({ ...a, item_name: s[a.item_code] || a.item_code }));
        } catch {
          c.value = c.value.map((t) => ({ ...t, item_name: t.item_code }));
        }
    }
    function Y(l) {
      if (!l) return "";
      const t = String(l).split(" - ");
      return t[0].length > 18 ? t[0].slice(0, 16) + "…" : t[0];
    }
    async function dt() {
      const l = [...new Set(c.value.filter((t) => t.voucher_type === "Stock Entry" && t.voucher_no).map((t) => t.voucher_no))];
      if (l.length)
        try {
          const t = {}, s = {};
          for (let a = 0; a < l.length; a += 300) {
            const f = l.slice(a, a + 300);
            (await M("Stock Entry", { fields: ["name", "from_warehouse", "to_warehouse"], filters: [["name", "in", f]], limit: 1e5 }) || []).forEach((_) => {
              t[_.name] = _;
            }), (await M("Stock Entry Detail", { fields: ["parent", "item_code", "s_warehouse", "t_warehouse"], filters: [["parent", "in", f]], limit: 1e5 }) || []).forEach((_) => {
              const X = _.parent + "|" + _.item_code;
              (s[X] || (s[X] = [])).push(_);
            });
          }
          c.value = c.value.map((a) => {
            if (a.voucher_type !== "Stock Entry") return a;
            const f = t[a.voucher_no] || {}, p = (s[a.voucher_no + "|" + a.item_code] || []).map((_) => ({ from: _.s_warehouse || f.from_warehouse || "", to: _.t_warehouse || f.to_warehouse || "" })), v = p.find((_) => _.from === a.warehouse || _.to === a.warehouse) || p[0] || { from: f.from_warehouse || "", to: f.to_warehouse || "" };
            return { ...a, wh_from: v.from, wh_to: v.to };
          });
        } catch {
        }
    }
    async function G(l = "") {
      try {
        const t = await M("Item", { fields: ["name", "item_name"], filters: l ? [["name", "like", "%" + l + "%"]] : [], limit: 200 });
        U.value = t.map((s) => ({ label: s.item_name || s.name, value: s.name }));
      } catch {
        U.value = [];
      }
    }
    async function J(l = "") {
      try {
        const t = await tt(), s = await M("Warehouse", { fields: ["name"], filters: [["company", "=", t], ["is_group", "=", 0], ...l ? [["name", "like", `%${l}%`]] : []], limit: 20 });
        F.value = s.map((a) => ({ label: a.name, value: a.name }));
      } catch {
        F.value = [];
      }
    }
    return _t(() => {
      G(""), J("");
    }), (l, t) => (r(), u("div", gt, [
      e("div", wt, [
        e("div", kt, [
          t[14] || (t[14] = e("label", { class: "sl-fld-lbl" }, "Search", -1)),
          e("div", bt, [
            e("span", {
              innerHTML: d(k)("search", 13),
              style: { color: "#94a3b8", "flex-shrink": "0" }
            }, null, 8, Lt),
            z(e("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (s) => D.value = s),
              placeholder: "Search item / voucher / warehouse…",
              class: "sl-search-input"
            }, null, 512), [
              [A, D.value]
            ])
          ])
        ]),
        e("div", St, [
          t[15] || (t[15] = e("label", { class: "sl-fld-lbl" }, "Item", -1)),
          Z(et, {
            modelValue: m.item,
            "onUpdate:modelValue": t[1] || (t[1] = (s) => m.item = s),
            options: U.value,
            placeholder: "All items",
            onSearch: G
          }, null, 8, ["modelValue", "options"])
        ]),
        e("div", Ct, [
          t[16] || (t[16] = e("label", { class: "sl-fld-lbl" }, "Warehouse", -1)),
          Z(et, {
            modelValue: m.warehouse,
            "onUpdate:modelValue": t[2] || (t[2] = (s) => m.warehouse = s),
            options: F.value,
            placeholder: "All warehouses",
            onSearch: J
          }, null, 8, ["modelValue", "options"])
        ]),
        e("div", Mt, [
          t[17] || (t[17] = e("label", { class: "sl-fld-lbl" }, "From", -1)),
          z(e("input", {
            "onUpdate:modelValue": t[3] || (t[3] = (s) => m.from_date = s),
            type: "date",
            class: "sl-input"
          }, null, 512), [
            [A, m.from_date]
          ])
        ]),
        e("div", Tt, [
          t[18] || (t[18] = e("label", { class: "sl-fld-lbl" }, "To", -1)),
          z(e("input", {
            "onUpdate:modelValue": t[4] || (t[4] = (s) => m.to_date = s),
            type: "date",
            class: "sl-input"
          }, null, 512), [
            [A, m.to_date]
          ])
        ]),
        e("button", {
          class: "sl-btn-primary",
          onClick: ot
        }, [
          e("span", {
            innerHTML: d(k)("refresh", 13)
          }, null, 8, qt),
          t[19] || (t[19] = h(" Run", -1))
        ]),
        e("button", {
          class: "sl-btn-ghost",
          onClick: rt,
          disabled: !c.value.length
        }, [
          e("span", {
            innerHTML: d(k)("download", 13)
          }, null, 8, xt),
          t[20] || (t[20] = h(" Export", -1))
        ], 8, Vt)
      ]),
      !q.value && c.value.length ? (r(), ft(yt, {
        key: 0,
        cards: [
          { label: "Inward Qty", tone: "success", value: w(j.value), valueClass: "green" },
          { label: "Outward Qty", tone: "danger", value: w(W.value), valueClass: "red" },
          { label: "Net Qty", tone: "accent", value: w(j.value - W.value), valueClass: j.value - W.value >= 0 ? "green" : "red" },
          { label: "Stock Value", tone: "info", value: R(nt.value), valueClass: "blue" }
        ]
      }, null, 8, ["cards"])) : y("", !0),
      E.value && c.value.length ? (r(), u("div", Ht, [
        e("div", It, [
          (r(!0), u(b, null, I(at.value, (s) => (r(), u("button", {
            key: s.key,
            class: L(["sl-fpill", { active: O.value === s.key }]),
            onClick: (a) => O.value = s.key
          }, [
            h(o(s.label) + " ", 1),
            e("span", Et, o(s.count), 1)
          ], 10, $t))), 128))
        ]),
        e("div", Dt, [
          e("span", Ot, o(C.value.length) + " of " + o(c.value.length), 1)
        ])
      ])) : y("", !0),
      e("div", Nt, [
        e("table", Bt, [
          e("thead", null, [
            e("tr", null, [
              e("th", {
                onClick: t[5] || (t[5] = (s) => x("posting_date")),
                class: "sortable"
              }, [
                t[21] || (t[21] = h("Date ", -1)),
                e("span", {
                  innerHTML: H("posting_date")
                }, null, 8, Rt)
              ]),
              e("th", {
                onClick: t[6] || (t[6] = (s) => x("item_name")),
                class: "sortable"
              }, [
                t[22] || (t[22] = h("Item ", -1)),
                e("span", {
                  innerHTML: H("item_name")
                }, null, 8, Ut)
              ]),
              e("th", {
                onClick: t[7] || (t[7] = (s) => x("warehouse")),
                class: "sortable"
              }, [
                t[23] || (t[23] = h("Warehouse ", -1)),
                e("span", {
                  innerHTML: H("warehouse")
                }, null, 8, Ft)
              ]),
              t[26] || (t[26] = e("th", null, "Voucher Type", -1)),
              t[27] || (t[27] = e("th", null, "Voucher #", -1)),
              t[28] || (t[28] = e("th", null, "Stock Movement", -1)),
              e("th", {
                onClick: t[8] || (t[8] = (s) => x("actual_qty")),
                class: "sortable ta-r"
              }, [
                t[24] || (t[24] = h("Qty In/Out ", -1)),
                e("span", {
                  innerHTML: H("actual_qty")
                }, null, 8, Qt)
              ]),
              e("th", {
                onClick: t[9] || (t[9] = (s) => x("qty_after_transaction")),
                class: "sortable ta-r"
              }, [
                t[25] || (t[25] = h("Balance Qty ", -1)),
                e("span", {
                  innerHTML: H("qty_after_transaction")
                }, null, 8, jt)
              ]),
              t[29] || (t[29] = e("th", { class: "ta-r" }, "Value", -1))
            ])
          ]),
          e("tbody", null, [
            q.value ? (r(), u(b, { key: 0 }, I(10, (s) => e("tr", { key: s }, [...t[30] || (t[30] = [
              e("td", { colspan: "9" }, [
                e("div", { class: "sl-shimmer" })
              ], -1)
            ])])), 64)) : (r(), u(b, { key: 1 }, [
              (r(!0), u(b, null, I(C.value, (s) => (r(), u("tr", {
                key: s.name,
                class: "sl-row",
                onClick: (a) => P(s)
              }, [
                e("td", zt, o(d($)(s.posting_date)), 1),
                e("td", {
                  class: "font-medium",
                  title: s.item_code
                }, o(s.item_name || s.item_code), 9, At),
                e("td", Kt, o(s.warehouse), 1),
                e("td", Pt, o(s.voucher_type), 1),
                e("td", null, [
                  e("span", Yt, o(s.voucher_no), 1)
                ]),
                e("td", null, [
                  s.wh_from || s.wh_to ? (r(), u("div", Gt, [
                    s.wh_from ? (r(), u("span", {
                      key: 0,
                      class: "sl-wh-tag",
                      title: s.wh_from
                    }, o(Y(s.wh_from)), 9, Jt)) : y("", !0),
                    s.wh_from && s.wh_to ? (r(), u("span", Xt, "→")) : y("", !0),
                    s.wh_to ? (r(), u("span", {
                      key: 2,
                      class: "sl-wh-tag sl-wh-tag-to",
                      title: s.wh_to
                    }, o(Y(s.wh_to)), 9, Zt)) : y("", !0)
                  ])) : (r(), u("span", te, "—"))
                ]),
                e("td", {
                  class: L(["ta-r mono-sm", d(n)(s.actual_qty) > 0 ? "green" : "red"])
                }, o(d(n)(s.actual_qty) > 0 ? "+" : "") + o(w(s.actual_qty)), 3),
                e("td", ee, o(w(s.qty_after_transaction)), 1),
                e("td", se, o(R(s.stock_value_difference)), 1)
              ], 8, Wt))), 128)),
              C.value.length ? y("", !0) : (r(), u("tr", le, [
                e("td", oe, o(E.value ? c.value.length ? "No entries match this filter" : "No ledger entries found" : "Run to view stock ledger"), 1)
              ]))
            ], 64))
          ])
        ]),
        e("div", ae, [
          q.value ? (r(), u(b, { key: 0 }, I(6, (s) => e("div", {
            key: s,
            class: "sl-mobile-card sl-mc--skeleton"
          }, [...t[31] || (t[31] = [
            e("div", {
              class: "sl-mc-shimmer",
              style: { height: "13px", width: "55%", "margin-bottom": "8px" }
            }, null, -1),
            e("div", {
              class: "sl-mc-shimmer",
              style: { height: "11px", width: "40%", "margin-bottom": "6px" }
            }, null, -1),
            e("div", {
              class: "sl-mc-shimmer",
              style: { height: "11px", width: "65%" }
            }, null, -1)
          ])])), 64)) : C.value.length ? (r(!0), u(b, { key: 2 }, I(C.value, (s) => (r(), u("div", {
            key: s.name,
            class: "sl-mobile-card",
            onClick: (a) => P(s)
          }, [
            e("div", re, [
              e("span", ue, o(d($)(s.posting_date)), 1),
              e("span", {
                class: L(d(n)(s.actual_qty) > 0 ? "sl-mc-pos" : "sl-mc-neg")
              }, o(d(n)(s.actual_qty) > 0 ? "+" : "") + o(w(s.actual_qty)), 3)
            ]),
            e("div", de, o(s.item_name || s.item_code), 1),
            e("div", ce, [
              e("span", null, o(s.voucher_type) + " · " + o(s.voucher_no), 1),
              e("span", null, "Bal: " + o(w(s.qty_after_transaction)), 1)
            ])
          ], 8, ie))), 128)) : (r(), u("div", ne, [
            t[32] || (t[32] = e("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "📒", -1)),
            e("div", null, o(E.value ? c.value.length ? "No entries match" : "No ledger entries" : "Run filters to view ledger"), 1)
          ]))
        ])
      ]),
      S.value ? (r(), u("div", {
        key: 2,
        class: "sl-overlay",
        onClick: t[10] || (t[10] = ht((s) => S.value = !1, ["self"]))
      })) : y("", !0),
      e("div", {
        class: L(["sl-drawer", { open: S.value }])
      }, [
        i.value ? (r(), u(b, { key: 0 }, [
          e("div", me, [
            e("button", {
              class: "sl-dclose",
              onClick: t[11] || (t[11] = (s) => S.value = !1)
            }, [
              e("span", {
                innerHTML: d(k)("x", 16)
              }, null, 8, ve)
            ]),
            e("div", _e, [
              e("div", fe, [
                e("span", {
                  innerHTML: d(k)("ledger", 20)
                }, null, 8, he)
              ]),
              e("div", null, [
                e("div", pe, o(i.value.item_code), 1),
                e("div", ye, [
                  h(o(i.value.warehouse) + " · " + o(d($)(i.value.posting_date)), 1),
                  i.value.posting_time ? (r(), u("span", ge, o(String(i.value.posting_time).slice(0, 8)), 1)) : y("", !0)
                ])
              ]),
              e("span", {
                class: L(["sl-badge", d(n)(i.value.actual_qty) >= 0 ? "badge-green" : "badge-red"])
              }, o(d(n)(i.value.actual_qty) >= 0 ? "Inward" : "Outward"), 3)
            ]),
            e("div", we, [
              e("div", ke, "Quantity " + o(d(n)(i.value.actual_qty) >= 0 ? "In" : "Out"), 1),
              e("div", {
                class: L(["sl-dh-amt-val", d(n)(i.value.actual_qty) >= 0 ? "green" : "red"])
              }, o(d(n)(i.value.actual_qty) > 0 ? "+" : "") + o(w(i.value.actual_qty)), 3)
            ])
          ]),
          e("div", be, [
            e("div", Le, [
              e("span", {
                innerHTML: d(k)("info", 13)
              }, null, 8, Se),
              t[33] || (t[33] = h(" Movement", -1))
            ]),
            e("div", Ce, [
              e("div", null, [
                t[34] || (t[34] = e("div", { class: "sl-meta-lbl" }, "Balance After", -1)),
                e("div", null, o(w(i.value.qty_after_transaction)), 1)
              ]),
              e("div", null, [
                t[35] || (t[35] = e("div", { class: "sl-meta-lbl" }, "Valuation Rate", -1)),
                e("div", null, o(R(i.value.valuation_rate)), 1)
              ]),
              e("div", null, [
                t[36] || (t[36] = e("div", { class: "sl-meta-lbl" }, "Value Change", -1)),
                e("div", {
                  class: L(d(n)(i.value.stock_value_difference) >= 0 ? "green" : "red")
                }, o(R(i.value.stock_value_difference)), 3)
              ]),
              e("div", null, [
                t[37] || (t[37] = e("div", { class: "sl-meta-lbl" }, "Posting Date", -1)),
                e("div", null, [
                  h(o(d($)(i.value.posting_date)), 1),
                  i.value.posting_time ? (r(), u("span", Me, o(String(i.value.posting_time).slice(0, 8)), 1)) : y("", !0)
                ])
              ])
            ]),
            e("div", Te, [
              e("span", {
                innerHTML: d(k)("file", 13)
              }, null, 8, qe),
              t[38] || (t[38] = h(" Source Voucher", -1))
            ]),
            e("div", Ve, [
              e("div", null, [
                t[39] || (t[39] = e("div", { class: "sl-meta-lbl" }, "Type", -1)),
                e("div", null, o(i.value.voucher_type || "—"), 1)
              ]),
              e("div", null, [
                t[40] || (t[40] = e("div", { class: "sl-meta-lbl" }, "Number", -1)),
                e("div", xe, o(i.value.voucher_no || "—"), 1)
              ])
            ]),
            i.value.voucher_type === "Stock Entry" ? (r(), u("button", {
              key: 0,
              class: "sl-link-btn",
              onClick: t[12] || (t[12] = (s) => it(i.value))
            }, [
              e("span", {
                innerHTML: d(k)("ext", 14)
              }, null, 8, He),
              t[41] || (t[41] = h(" Open Stock Entry ", -1))
            ])) : y("", !0)
          ]),
          e("div", Ie, [
            e("button", {
              class: "sl-btn-ghost",
              onClick: t[13] || (t[13] = (s) => S.value = !1)
            }, "Close")
          ])
        ], 64)) : y("", !0)
      ], 2)
    ]));
  }
}, Re = /* @__PURE__ */ ct($e, [["__scopeId", "data-v-ff905ded"]]);
export {
  Re as default
};
