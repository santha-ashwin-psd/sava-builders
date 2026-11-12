import { _ as oe, x as ae, o as le, c as u, a as s, u as y, i as D, w as ne, A as re, D as x, d as m, C as ue, b as H, t as a, F as C, r as $, l as ie, e as de, f as ce, au as P, h as v, z as me, g as T, a7 as ve, j as pe, k as n, n as J, q as _e } from "./main-D4r-IT_f.js";
import { f as c } from "./format-BcJZDVG4.js";
import { _ as I } from "./SearchableSelect-R1pfpiop.js";
import { S as he } from "./SummaryStrip-CENSyxF5.js";
import { u as fe } from "./useProjectOptions-CziIy6tB.js";
const ye = { class: "sv-page" }, be = { class: "sv-filterbar" }, ke = { class: "sv-fld sv-fld-search" }, ge = { class: "sv-search-wrap" }, we = ["innerHTML"], Le = { class: "sv-fld sv-fld-item" }, Se = { class: "sv-fld sv-fld-wh" }, Ce = { class: "sv-fld sv-fld-wh" }, Te = { class: "sv-fld sv-fld-grp" }, Me = ["innerHTML"], Ve = ["disabled"], je = ["innerHTML"], xe = {
  key: 1,
  class: "sv-toolbar"
}, He = { class: "sv-result" }, $e = { class: "sv-card" }, Ie = { class: "sv-table sv-desktop-table" }, Ne = ["innerHTML"], Ue = ["innerHTML"], Ae = ["innerHTML"], qe = ["innerHTML"], Re = ["innerHTML"], Be = ["innerHTML"], De = ["innerHTML"], Ge = { class: "sv-code" }, Oe = { class: "text-muted" }, ze = { class: "text-muted" }, Ee = { class: "text-muted" }, Fe = ["title"], Qe = { class: "ta-r" }, We = ["title"], Pe = {
  key: 1,
  class: "text-muted"
}, Je = { class: "ta-r mono-sm font-medium" }, Ke = { class: "ta-r" }, Ze = ["onClick"], Xe = { key: 0 }, Ye = {
  colspan: "10",
  class: "sv-empty"
}, et = { class: "sv-mobile-cards" }, tt = {
  key: 1,
  class: "sv-mc-empty"
}, st = { class: "sv-mc-top" }, ot = { class: "sv-mc-code" }, at = { class: "sv-mc-value" }, lt = { class: "sv-mc-mid" }, nt = {
  class: "text-muted",
  style: { "font-weight": "400" }
}, rt = { class: "sv-mc-meta" }, ut = ["title"], it = ["onClick"], dt = {
  __name: "StockValuation",
  setup(ct) {
    const { toast: G } = ae(), K = pe(), i = v([]), b = v(!1), M = v(""), V = v({});
    function O(o) {
      K.push({ name: "inventory-adjustments", query: { item: o.item_code, warehouse: o.warehouse } });
    }
    function w(o) {
      return V.value[`${o.item_code}::${o.warehouse}`] || { has_landed_cost: !1, base_rate: o.valuation_rate, landed_rate: 0, valuation_rate: o.valuation_rate };
    }
    function N(o) {
      const e = w(o);
      return e.has_landed_cost ? `Base rate ${p(e.base_rate)} + landed cost ${p(e.landed_rate)} = ${p(e.valuation_rate)} per unit` : "No landed costs capitalized into this rate.";
    }
    async function Z(o) {
      const e = o.filter((t) => t.item_code && t.warehouse).map((t) => ({ item_code: t.item_code, warehouse: t.warehouse }));
      if (!e.length) {
        V.value = {};
        return;
      }
      try {
        const t = await ve("psd_books.inventory.landed_cost_engine.get_landed_cost_breakdown", { pairs: JSON.stringify(e) });
        V.value = t || {};
      } catch {
        V.value = {};
      }
    }
    const U = v([]), A = v([]), q = v([]), j = v("stock_value"), L = v("desc"), l = me({ warehouse: "", item_group: "", item: "", project: "" }), { projects: X, fetchProjects: z } = fe();
    async function E() {
      b.value = !0;
      try {
        const o = { show_zero_stock: 1 };
        l.warehouse && (o.warehouse = l.warehouse), l.item_group && (o.item_group = l.item_group), l.project && (o.project = l.project);
        const e = await ie("psd_books.api.inventory.get_stock_summary", o), t = Array.isArray(e) ? e : (e == null ? void 0 : e.message) || [];
        i.value = t.map((r) => ({ ...r, stock_uom: r.uom || r.stock_uom || "" })), Z(i.value);
      } catch (o) {
        G.error(o.message || "Failed to load valuation");
      } finally {
        b.value = !1;
      }
    }
    const Y = T(() => {
      let o = i.value;
      if (l.item && (o = o.filter((t) => t.item_code === l.item)), !M.value.trim()) return o;
      const e = M.value.toLowerCase();
      return o.filter((t) => (t.item_code || "").toLowerCase().includes(e) || (t.item_name || "").toLowerCase().includes(e) || (t.item_group || "").toLowerCase().includes(e));
    }), _ = T(() => {
      const o = j.value;
      return [...Y.value].sort((e, t) => {
        const r = e[o] ?? "", S = t[o] ?? "", k = typeof r == "number" ? r - S : String(r).localeCompare(String(S));
        return L.value === "asc" ? k : -k;
      });
    });
    function h(o) {
      j.value === o ? L.value = L.value === "asc" ? "desc" : "asc" : (j.value = o, L.value = "asc");
    }
    function f(o) {
      return j.value !== o ? '<span style="color:#d1d5db">⇅</span>' : L.value === "asc" ? "↑" : "↓";
    }
    const ee = T(() => i.value.reduce((o, e) => o + c(e.stock_value), 0)), te = T(() => i.value.reduce((o, e) => o + c(e.actual_qty), 0)), R = T(() => i.value.filter((o) => c(o.actual_qty) <= 0).length);
    function p(o) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format(c(o));
    }
    function B(o) {
      return Number(c(o)).toLocaleString("en-US", { maximumFractionDigits: 3 });
    }
    function se() {
      const o = _.value;
      if (!o.length) return;
      const e = (d) => {
        const g = d == null ? "" : String(d);
        return /[",\n]/.test(g) ? '"' + g.replace(/"/g, '""') + '"' : g;
      }, t = [["Item", "Item Name", "Group", "Warehouse", "UOM", "Qty", "Rate", "Base Rate", "Landed Rate", "Stock Value"].join(",")];
      for (const d of o) {
        const g = w(d);
        t.push([d.item_code || "", d.item_name || "", d.item_group || "", d.warehouse || "", d.stock_uom || "", c(d.actual_qty), c(d.valuation_rate), c(g.base_rate), c(g.landed_rate), c(d.stock_value)].map(e).join(","));
      }
      const r = new Blob(["\uFEFF" + t.join(`\r
`)], { type: "text/csv;charset=utf-8;" }), S = URL.createObjectURL(r), k = document.createElement("a");
      k.href = S, k.download = `stock_valuation_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`, k.click(), URL.revokeObjectURL(S), G.success(`Exported ${o.length} row(s)`);
    }
    async function F(o = "") {
      try {
        const e = await de(), t = await ce("Warehouse", { fields: ["name"], filters: [["company", "=", e], ["is_group", "=", 0], ...o ? [["name", "like", `%${o}%`]] : []], limit: 20 });
        U.value = t.map((r) => ({ label: r.name, value: r.name }));
      } catch {
        U.value = [];
      }
    }
    async function Q(o = "") {
      try {
        const e = await P("Item Group", o);
        A.value = e.map((t) => ({ label: t.name, value: t.name }));
      } catch {
        A.value = [];
      }
    }
    async function W(o = "") {
      try {
        const e = await P("Item", o);
        q.value = e.map((t) => ({ label: t.name, value: t.name }));
      } catch {
        q.value = [];
      }
    }
    return le(() => {
      E(), F(""), Q(""), W(""), z("");
    }), (o, e) => (n(), u("div", ye, [
      s("div", be, [
        s("div", ke, [
          e[12] || (e[12] = s("label", { class: "sv-fld-lbl" }, "Search", -1)),
          s("div", ge, [
            s("span", {
              innerHTML: y(D)("search", 13),
              style: { color: "#94a3b8", "flex-shrink": "0" }
            }, null, 8, we),
            ne(s("input", {
              "onUpdate:modelValue": e[0] || (e[0] = (t) => M.value = t),
              placeholder: "Search item / group…",
              class: "sv-search-input"
            }, null, 512), [
              [re, M.value]
            ])
          ])
        ]),
        s("div", Le, [
          e[13] || (e[13] = s("label", { class: "sv-fld-lbl" }, "Item", -1)),
          x(I, {
            modelValue: l.item,
            "onUpdate:modelValue": e[1] || (e[1] = (t) => l.item = t),
            options: q.value,
            placeholder: "All items",
            onSearch: W
          }, null, 8, ["modelValue", "options"])
        ]),
        s("div", Se, [
          e[14] || (e[14] = s("label", { class: "sv-fld-lbl" }, "Warehouse", -1)),
          x(I, {
            modelValue: l.warehouse,
            "onUpdate:modelValue": e[2] || (e[2] = (t) => l.warehouse = t),
            options: U.value,
            placeholder: "All warehouses",
            onSearch: F
          }, null, 8, ["modelValue", "options"])
        ]),
        s("div", Ce, [
          e[15] || (e[15] = s("label", { class: "sv-fld-lbl" }, "Project", -1)),
          x(I, {
            modelValue: l.project,
            "onUpdate:modelValue": e[3] || (e[3] = (t) => l.project = t),
            options: y(X),
            placeholder: "All projects",
            onSearch: y(z)
          }, null, 8, ["modelValue", "options", "onSearch"])
        ]),
        s("div", Te, [
          e[16] || (e[16] = s("label", { class: "sv-fld-lbl" }, "Item Group", -1)),
          x(I, {
            modelValue: l.item_group,
            "onUpdate:modelValue": e[4] || (e[4] = (t) => l.item_group = t),
            options: A.value,
            placeholder: "All item groups",
            onSearch: Q
          }, null, 8, ["modelValue", "options"])
        ]),
        s("button", {
          class: "sv-btn-primary",
          onClick: E
        }, [
          s("span", {
            innerHTML: y(D)("refresh", 13)
          }, null, 8, Me),
          e[17] || (e[17] = m(" Refresh", -1))
        ]),
        s("button", {
          class: "sv-btn-ghost",
          onClick: se,
          disabled: !i.value.length
        }, [
          s("span", {
            innerHTML: y(D)("download", 13)
          }, null, 8, je),
          e[18] || (e[18] = m(" Export", -1))
        ], 8, Ve),
        e[19] || (e[19] = s("span", { class: "sv-asof" }, "As of today", -1))
      ]),
      !b.value && i.value.length ? (n(), ue(he, {
        key: 0,
        cards: [
          { label: "Total Items", tone: "default", value: i.value.length },
          { label: "Total Stock Value", tone: "accent", value: p(ee.value), valueClass: "blue" },
          { label: "Zero Stock Items", tone: R.value > 0 ? "warn" : "default", value: R.value, valueClass: R.value > 0 ? "orange" : "" },
          { label: "Total Qty", tone: "info", value: B(te.value) }
        ]
      }, null, 8, ["cards"])) : H("", !0),
      !b.value && i.value.length ? (n(), u("div", xe, [
        s("span", He, a(_.value.length) + " item" + a(_.value.length === 1 ? "" : "s"), 1)
      ])) : H("", !0),
      s("div", $e, [
        s("table", Ie, [
          s("thead", null, [
            s("tr", null, [
              s("th", {
                onClick: e[5] || (e[5] = (t) => h("item_code")),
                class: "sortable"
              }, [
                e[20] || (e[20] = m("Item ", -1)),
                s("span", {
                  innerHTML: f("item_code")
                }, null, 8, Ne)
              ]),
              s("th", {
                onClick: e[6] || (e[6] = (t) => h("item_name")),
                class: "sortable"
              }, [
                e[21] || (e[21] = m("Item Name ", -1)),
                s("span", {
                  innerHTML: f("item_name")
                }, null, 8, Ue)
              ]),
              s("th", {
                onClick: e[7] || (e[7] = (t) => h("warehouse")),
                class: "sortable"
              }, [
                e[22] || (e[22] = m("Warehouse ", -1)),
                s("span", {
                  innerHTML: f("warehouse")
                }, null, 8, Ae)
              ]),
              s("th", {
                onClick: e[8] || (e[8] = (t) => h("item_group")),
                class: "sortable"
              }, [
                e[23] || (e[23] = m("Group ", -1)),
                s("span", {
                  innerHTML: f("item_group")
                }, null, 8, qe)
              ]),
              e[27] || (e[27] = s("th", null, "UOM", -1)),
              s("th", {
                onClick: e[9] || (e[9] = (t) => h("actual_qty")),
                class: "sortable ta-r"
              }, [
                e[24] || (e[24] = m("Qty ", -1)),
                s("span", {
                  innerHTML: f("actual_qty")
                }, null, 8, Re)
              ]),
              s("th", {
                onClick: e[10] || (e[10] = (t) => h("valuation_rate")),
                class: "sortable ta-r"
              }, [
                e[25] || (e[25] = m("Rate ", -1)),
                s("span", {
                  innerHTML: f("valuation_rate")
                }, null, 8, Be)
              ]),
              e[28] || (e[28] = s("th", {
                class: "ta-r",
                style: { width: "70px" }
              }, "Landed?", -1)),
              s("th", {
                onClick: e[11] || (e[11] = (t) => h("stock_value")),
                class: "sortable ta-r"
              }, [
                e[26] || (e[26] = m("Stock Value ", -1)),
                s("span", {
                  innerHTML: f("stock_value")
                }, null, 8, De)
              ]),
              e[29] || (e[29] = s("th", { style: { width: "80px" } }, null, -1))
            ])
          ]),
          s("tbody", null, [
            b.value ? (n(), u(C, { key: 0 }, $(10, (t) => s("tr", { key: t }, [...e[30] || (e[30] = [
              s("td", { colspan: "10" }, [
                s("div", { class: "sv-shimmer" })
              ], -1)
            ])])), 64)) : (n(), u(C, { key: 1 }, [
              (n(!0), u(C, null, $(_.value, (t) => (n(), u("tr", {
                key: t.item_code + t.warehouse,
                class: "sv-row"
              }, [
                s("td", null, [
                  s("span", Ge, a(t.item_code), 1)
                ]),
                s("td", null, a(t.item_name || t.item_code), 1),
                s("td", Oe, a(t.warehouse || "—"), 1),
                s("td", ze, a(t.item_group || "—"), 1),
                s("td", Ee, a(t.stock_uom || "—"), 1),
                s("td", {
                  class: J(["ta-r mono-sm", y(c)(t.actual_qty) <= 0 ? "red" : ""])
                }, a(B(t.actual_qty)), 3),
                s("td", {
                  class: "ta-r mono-sm",
                  title: N(t)
                }, a(p(t.valuation_rate)), 9, Fe),
                s("td", Qe, [
                  w(t).has_landed_cost ? (n(), u("span", {
                    key: 0,
                    class: "sv-landed-badge",
                    title: N(t)
                  }, "🚚 " + a(p(w(t).landed_rate)), 9, We)) : (n(), u("span", Pe, "—"))
                ]),
                s("td", Je, a(p(t.stock_value)), 1),
                s("td", Ke, [
                  s("button", {
                    class: "sv-adjust-btn",
                    onClick: (r) => O(t)
                  }, "Adjust", 8, Ze)
                ])
              ]))), 128)),
              _.value.length ? H("", !0) : (n(), u("tr", Xe, [
                s("td", Ye, a(i.value.length ? "No items match your search" : "No stock data found"), 1)
              ]))
            ], 64))
          ])
        ]),
        s("div", et, [
          b.value ? (n(), u(C, { key: 0 }, $(6, (t) => s("div", {
            key: t,
            class: "sv-mobile-card sv-mc--skeleton"
          }, [...e[31] || (e[31] = [
            s("div", {
              class: "sv-mc-shimmer",
              style: { height: "13px", width: "55%", "margin-bottom": "8px" }
            }, null, -1),
            s("div", {
              class: "sv-mc-shimmer",
              style: { height: "11px", width: "40%", "margin-bottom": "6px" }
            }, null, -1),
            s("div", {
              class: "sv-mc-shimmer",
              style: { height: "11px", width: "65%" }
            }, null, -1)
          ])])), 64)) : _.value.length ? (n(!0), u(C, { key: 2 }, $(_.value, (t) => (n(), u("div", {
            key: t.item_code + t.warehouse,
            class: "sv-mobile-card"
          }, [
            s("div", st, [
              s("span", ot, a(t.item_code), 1),
              s("span", at, a(p(t.stock_value)), 1)
            ]),
            s("div", lt, [
              m(a(t.item_name || t.item_code) + " ", 1),
              s("span", nt, "· " + a(t.warehouse || "—"), 1)
            ]),
            s("div", rt, [
              s("span", {
                class: J(y(c)(t.actual_qty) <= 0 ? "sv-mc-neg" : "")
              }, a(B(t.actual_qty)) + " " + a(t.stock_uom || ""), 3),
              w(t).has_landed_cost ? (n(), u("span", {
                key: 0,
                class: "sv-landed-badge",
                title: N(t)
              }, "🚚 landed", 8, ut)) : H("", !0),
              s("button", {
                class: "sv-adjust-btn",
                onClick: _e((r) => O(t), ["stop"])
              }, "Adjust", 8, it)
            ])
          ]))), 128)) : (n(), u("div", tt, [
            e[32] || (e[32] = s("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "📦", -1)),
            s("div", null, a(i.value.length ? "No items match" : "No stock data found"), 1)
          ]))
        ])
      ])
    ]));
  }
}, ft = /* @__PURE__ */ oe(dt, [["__scopeId", "data-v-1682fd98"]]);
export {
  ft as default
};
