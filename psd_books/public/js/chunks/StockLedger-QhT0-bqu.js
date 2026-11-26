import { _ as ve, y as _e, A as fe, o as he, c as u, a as t, u as d, i as k, w as z, B as K, E as ee, d as h, D as pe, b as g, F as b, r as I, t as o, x as ye, n as S, f as M, e as te, h as y, g as T, j as ge, k as r } from "./main-BBWbU-FH.js";
import { b as $, f as n } from "./format-BcJZDVG4.js";
import { _ as se } from "./SearchableSelect-Bs7ky2tj.js";
import { S as we } from "./SummaryStrip-CvLoFfNG.js";
const ke = { class: "sl-page" }, be = { class: "sl-filterbar" }, Se = { class: "sl-fld sl-fld-search" }, Le = { class: "sl-search-wrap" }, Ce = ["innerHTML"], Me = { class: "sl-fld sl-fld-item" }, Te = { class: "sl-fld sl-fld-wh" }, qe = { class: "sl-fld sl-fld-date" }, Ve = { class: "sl-fld sl-fld-date" }, xe = ["innerHTML"], He = ["disabled"], Ie = ["innerHTML"], $e = {
  key: 1,
  class: "sl-toolbar"
}, Ee = { class: "sl-filter-pills" }, De = ["onClick"], Oe = { class: "sl-fpill-count" }, Ne = { class: "sl-toolbar-right" }, Be = { class: "sl-result" }, Re = { class: "sl-card" }, Ue = { class: "sl-table sl-desktop-table" }, Fe = ["innerHTML"], Qe = ["innerHTML"], je = ["innerHTML"], We = ["innerHTML"], Ae = ["innerHTML"], ze = ["onClick"], Ke = { class: "mono-sm text-muted" }, Pe = ["title"], Ye = { class: "text-muted" }, Ge = {
  class: "text-muted",
  style: { "font-size": "12px" }
}, Je = { class: "sl-voucher" }, Xe = {
  key: 0,
  class: "sl-wh-flow"
}, Ze = ["title"], et = {
  key: 1,
  style: { color: "#9ca3af", "font-size": "11px" }
}, tt = ["title"], st = {
  key: 1,
  class: "text-muted",
  style: { "font-size": "12px" }
}, lt = { class: "ta-r mono-sm" }, ot = { class: "ta-r mono-sm" }, at = { key: 0 }, nt = {
  colspan: "9",
  class: "sl-empty"
}, it = { class: "sl-mobile-cards" }, rt = {
  key: 1,
  class: "sl-mc-empty"
}, ut = ["onClick"], dt = { class: "sl-mc-top" }, ct = { class: "sl-mc-date" }, mt = { class: "sl-mc-mid" }, vt = { class: "sl-mc-meta" }, _t = { class: "sl-dheader" }, ft = ["innerHTML"], ht = { class: "sl-dh-top" }, pt = { class: "sl-dh-ico" }, yt = ["innerHTML"], gt = { class: "sl-dh-title" }, wt = { class: "sl-dh-sub" }, kt = {
  key: 0,
  style: { "margin-left": "6px" }
}, bt = { class: "sl-dh-amount" }, St = { class: "sl-dh-amt-lbl" }, Lt = { class: "sl-dbody" }, Ct = { class: "sl-section-hdr" }, Mt = ["innerHTML"], Tt = { class: "sl-meta-grid" }, qt = {
  key: 0,
  style: { "margin-left": "6px" }
}, Vt = { class: "sl-section-hdr" }, xt = ["innerHTML"], Ht = { class: "sl-meta-grid" }, It = { style: { color: "#2563eb" } }, $t = ["innerHTML"], Et = { class: "sl-dfooter" }, Dt = {
  __name: "StockLedger",
  setup(Ot) {
    const { toast: P } = _e(), le = ge(), m = y([]), q = y(!1), E = y(!1), F = y([]), Q = y([]), D = y(""), O = y("all"), L = y(!1), i = y(null), N = y("posting_date"), V = y("desc"), j = /* @__PURE__ */ new Date(), oe = new Date(j.getFullYear(), j.getMonth(), 1).toISOString().slice(0, 10), c = fe({ item: "", warehouse: "", from_date: oe, to_date: j.toISOString().slice(0, 10) });
    async function ae() {
      q.value = !0, E.value = !0;
      try {
        const e = [["company", "=", await te()], ["is_cancelled", "=", 0]];
        c.item && e.push(["item_code", "=", c.item]), c.warehouse && e.push(["warehouse", "=", c.warehouse]), c.from_date && e.push(["posting_date", ">=", c.from_date]), c.to_date && e.push(["posting_date", "<=", c.to_date]), m.value = await M("Stock Ledger Entry", { fields: ["name", "posting_date", "posting_time", "creation", "item_code", "warehouse", "voucher_type", "voucher_no", "actual_qty", "qty_after_transaction", "stock_value_difference", "valuation_rate"], filters: e, limit: 1e5, order: "posting_date asc" }), await de(), await ce();
      } catch (l) {
        P.error(l.message || "Failed to load stock ledger");
      } finally {
        q.value = !1;
      }
    }
    const B = T(() => {
      let l = m.value;
      if (O.value === "in" ? l = l.filter((e) => n(e.actual_qty) > 0) : O.value === "out" && (l = l.filter((e) => n(e.actual_qty) < 0)), D.value.trim()) {
        const e = D.value.toLowerCase();
        l = l.filter((s) => (s.item_code || "").toLowerCase().includes(e) || (s.item_name || "").toLowerCase().includes(e) || (s.voucher_no || "").toLowerCase().includes(e) || (s.warehouse || "").toLowerCase().includes(e) || (s.voucher_type || "").toLowerCase().includes(e));
      }
      return l;
    }), C = T(() => {
      const l = N.value;
      return [...B.value].sort((e, s) => {
        const a = e[l] ?? "", v = s[l] ?? "";
        let p = typeof a == "number" ? a - v : String(a).localeCompare(String(v));
        return p === 0 && l === "posting_date" && (p = String(e.posting_time || "").localeCompare(String(s.posting_time || "")) || String(e.creation || "").localeCompare(String(s.creation || ""))), V.value === "asc" ? p : -p;
      });
    });
    function x(l) {
      N.value === l ? V.value = V.value === "asc" ? "desc" : "asc" : (N.value = l, V.value = "asc");
    }
    function H(l) {
      return N.value !== l ? '<span style="color:#d1d5db">⇅</span>' : V.value === "asc" ? "↑" : "↓";
    }
    const ne = T(() => [
      { key: "all", label: "All", count: m.value.length },
      { key: "in", label: "Inward", count: m.value.filter((l) => n(l.actual_qty) > 0).length },
      { key: "out", label: "Outward", count: m.value.filter((l) => n(l.actual_qty) < 0).length }
    ]), W = T(() => B.value.filter((l) => n(l.actual_qty) > 0).reduce((l, e) => l + n(e.actual_qty), 0)), A = T(() => B.value.filter((l) => n(l.actual_qty) < 0).reduce((l, e) => l + Math.abs(n(e.actual_qty)), 0)), ie = T(() => B.value.reduce((l, e) => l + n(e.stock_value_difference), 0));
    function Y(l) {
      i.value = l, L.value = !0;
    }
    function re(l) {
      l.voucher_no && le.push({ name: "stock-entries", query: { open: l.voucher_no } });
    }
    function R(l) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format(n(l));
    }
    function w(l) {
      return Number(n(l)).toLocaleString("en-US", { maximumFractionDigits: 3 });
    }
    function ue() {
      const l = C.value;
      if (!l.length) return;
      const e = (_) => {
        const f = _ == null ? "" : String(_);
        return /[",\n]/.test(f) ? '"' + f.replace(/"/g, '""') + '"' : f;
      }, s = [["Date", "Item", "Warehouse", "Voucher Type", "Voucher #", "Stock Movement", "Qty In/Out", "Balance Qty", "Value Change", "Valuation Rate"].join(",")];
      for (const _ of l)
        s.push([$(_.posting_date), _.item_code || "", _.warehouse || "", _.voucher_type || "", _.voucher_no || "", [_.wh_from, _.wh_to].filter(Boolean).join(" → "), n(_.actual_qty), n(_.qty_after_transaction), n(_.stock_value_difference), n(_.valuation_rate)].map(e).join(","));
      const a = new Blob(["\uFEFF" + s.join(`\r
`)], { type: "text/csv;charset=utf-8;" }), v = URL.createObjectURL(a), p = document.createElement("a");
      p.href = v, p.download = `stock_ledger_${c.from_date}_to_${c.to_date}.csv`, p.click(), URL.revokeObjectURL(v), P.success(`Exported ${l.length} row(s)`);
    }
    async function de() {
      const l = [...new Set(m.value.map((e) => e.item_code).filter(Boolean))];
      if (l.length)
        try {
          const e = await M("Item", { fields: ["name", "item_name"], filters: [["name", "in", l]], limit: 1e5 }), s = {};
          e.forEach((a) => {
            s[a.name] = a.item_name;
          }), m.value = m.value.map((a) => ({ ...a, item_name: s[a.item_code] || a.item_code }));
        } catch {
          m.value = m.value.map((e) => ({ ...e, item_name: e.item_code }));
        }
    }
    function G(l) {
      if (!l) return "";
      const e = String(l).split(" - ");
      return e[0].length > 18 ? e[0].slice(0, 16) + "…" : e[0];
    }
    async function ce() {
      const l = [...new Set(m.value.filter((e) => e.voucher_type === "Stock Entry" && e.voucher_no).map((e) => e.voucher_no))];
      if (l.length)
        try {
          const e = {}, s = {};
          for (let a = 0; a < l.length; a += 300) {
            const v = l.slice(a, a + 300);
            (await M("Stock Entry", { fields: ["name", "from_warehouse", "to_warehouse"], filters: [["name", "in", v]], limit: 1e5 }) || []).forEach((f) => {
              e[f.name] = f;
            }), (await M("Stock Entry Detail", { fields: ["parent", "item_code", "s_warehouse", "t_warehouse"], filters: [["parent", "in", v]], limit: 1e5 }) || []).forEach((f) => {
              const Z = f.parent + "|" + f.item_code;
              (s[Z] || (s[Z] = [])).push(f);
            });
          }
          m.value = m.value.map((a) => {
            if (a.voucher_type !== "Stock Entry") return a;
            const v = e[a.voucher_no] || {}, p = (s[a.voucher_no + "|" + a.item_code] || []).map((f) => ({ from: f.s_warehouse || v.from_warehouse || "", to: f.t_warehouse || v.to_warehouse || "" })), _ = p.find((f) => f.from === a.warehouse || f.to === a.warehouse) || p[0] || { from: v.from_warehouse || "", to: v.to_warehouse || "" };
            return { ...a, wh_from: _.from, wh_to: _.to };
          });
        } catch {
        }
    }
    const U = y(null);
    function me(l) {
      U.value = l && l.value ? { label: l.label, value: l.value } : null;
    }
    async function J(l = "") {
      try {
        const s = (await M("Item", { fields: ["name", "item_name"], filters: l ? [["item_name", "like", "%" + l + "%"]] : [], order: "item_name asc", limit: 200 })).map((v) => ({ label: v.item_name || v.name, value: v.name })), a = U.value;
        c.item && a && a.value === c.item && !s.some((v) => v.value === a.value) && s.unshift(a), F.value = s;
      } catch {
        F.value = U.value ? [U.value] : [];
      }
    }
    async function X(l = "") {
      try {
        const e = await te(), s = await M("Warehouse", { fields: ["name"], filters: [["company", "=", e], ["is_group", "=", 0], ...l ? [["name", "like", `%${l}%`]] : []], limit: 20 });
        Q.value = s.map((a) => ({ label: a.name, value: a.name }));
      } catch {
        Q.value = [];
      }
    }
    return he(() => {
      J(""), X("");
    }), (l, e) => (r(), u("div", ke, [
      t("div", be, [
        t("div", Se, [
          e[14] || (e[14] = t("label", { class: "sl-fld-lbl" }, "Search", -1)),
          t("div", Le, [
            t("span", {
              innerHTML: d(k)("search", 13),
              style: { color: "#94a3b8", "flex-shrink": "0" }
            }, null, 8, Ce),
            z(t("input", {
              "onUpdate:modelValue": e[0] || (e[0] = (s) => D.value = s),
              placeholder: "Search item / voucher / warehouse…",
              class: "sl-search-input"
            }, null, 512), [
              [K, D.value]
            ])
          ])
        ]),
        t("div", Me, [
          e[15] || (e[15] = t("label", { class: "sl-fld-lbl" }, "Item", -1)),
          ee(se, {
            modelValue: c.item,
            "onUpdate:modelValue": e[1] || (e[1] = (s) => c.item = s),
            options: F.value,
            placeholder: "All items",
            onSearch: J,
            onSelect: me
          }, null, 8, ["modelValue", "options"])
        ]),
        t("div", Te, [
          e[16] || (e[16] = t("label", { class: "sl-fld-lbl" }, "Warehouse", -1)),
          ee(se, {
            modelValue: c.warehouse,
            "onUpdate:modelValue": e[2] || (e[2] = (s) => c.warehouse = s),
            options: Q.value,
            placeholder: "All warehouses",
            onSearch: X
          }, null, 8, ["modelValue", "options"])
        ]),
        t("div", qe, [
          e[17] || (e[17] = t("label", { class: "sl-fld-lbl" }, "From", -1)),
          z(t("input", {
            "onUpdate:modelValue": e[3] || (e[3] = (s) => c.from_date = s),
            type: "date",
            class: "sl-input"
          }, null, 512), [
            [K, c.from_date]
          ])
        ]),
        t("div", Ve, [
          e[18] || (e[18] = t("label", { class: "sl-fld-lbl" }, "To", -1)),
          z(t("input", {
            "onUpdate:modelValue": e[4] || (e[4] = (s) => c.to_date = s),
            type: "date",
            class: "sl-input"
          }, null, 512), [
            [K, c.to_date]
          ])
        ]),
        t("button", {
          class: "sl-btn-primary",
          onClick: ae
        }, [
          t("span", {
            innerHTML: d(k)("refresh", 13)
          }, null, 8, xe),
          e[19] || (e[19] = h(" Run", -1))
        ]),
        t("button", {
          class: "sl-btn-ghost",
          onClick: ue,
          disabled: !m.value.length
        }, [
          t("span", {
            innerHTML: d(k)("download", 13)
          }, null, 8, Ie),
          e[20] || (e[20] = h(" Export", -1))
        ], 8, He)
      ]),
      !q.value && m.value.length ? (r(), pe(we, {
        key: 0,
        cards: [
          { label: "Inward Qty", tone: "success", value: w(W.value), valueClass: "green" },
          { label: "Outward Qty", tone: "danger", value: w(A.value), valueClass: "red" },
          { label: "Net Qty", tone: "accent", value: w(W.value - A.value), valueClass: W.value - A.value >= 0 ? "green" : "red" },
          { label: "Stock Value", tone: "info", value: R(ie.value), valueClass: "blue" }
        ]
      }, null, 8, ["cards"])) : g("", !0),
      E.value && m.value.length ? (r(), u("div", $e, [
        t("div", Ee, [
          (r(!0), u(b, null, I(ne.value, (s) => (r(), u("button", {
            key: s.key,
            class: S(["sl-fpill", { active: O.value === s.key }]),
            onClick: (a) => O.value = s.key
          }, [
            h(o(s.label) + " ", 1),
            t("span", Oe, o(s.count), 1)
          ], 10, De))), 128))
        ]),
        t("div", Ne, [
          t("span", Be, o(C.value.length) + " of " + o(m.value.length), 1)
        ])
      ])) : g("", !0),
      t("div", Re, [
        t("table", Ue, [
          t("thead", null, [
            t("tr", null, [
              t("th", {
                onClick: e[5] || (e[5] = (s) => x("posting_date")),
                class: "sortable"
              }, [
                e[21] || (e[21] = h("Date ", -1)),
                t("span", {
                  innerHTML: H("posting_date")
                }, null, 8, Fe)
              ]),
              t("th", {
                onClick: e[6] || (e[6] = (s) => x("item_name")),
                class: "sortable"
              }, [
                e[22] || (e[22] = h("Item ", -1)),
                t("span", {
                  innerHTML: H("item_name")
                }, null, 8, Qe)
              ]),
              t("th", {
                onClick: e[7] || (e[7] = (s) => x("warehouse")),
                class: "sortable"
              }, [
                e[23] || (e[23] = h("Warehouse ", -1)),
                t("span", {
                  innerHTML: H("warehouse")
                }, null, 8, je)
              ]),
              e[26] || (e[26] = t("th", null, "Voucher Type", -1)),
              e[27] || (e[27] = t("th", null, "Voucher #", -1)),
              e[28] || (e[28] = t("th", null, "Stock Movement", -1)),
              t("th", {
                onClick: e[8] || (e[8] = (s) => x("actual_qty")),
                class: "sortable ta-r"
              }, [
                e[24] || (e[24] = h("Qty In/Out ", -1)),
                t("span", {
                  innerHTML: H("actual_qty")
                }, null, 8, We)
              ]),
              t("th", {
                onClick: e[9] || (e[9] = (s) => x("qty_after_transaction")),
                class: "sortable ta-r"
              }, [
                e[25] || (e[25] = h("Balance Qty ", -1)),
                t("span", {
                  innerHTML: H("qty_after_transaction")
                }, null, 8, Ae)
              ]),
              e[29] || (e[29] = t("th", { class: "ta-r" }, "Value", -1))
            ])
          ]),
          t("tbody", null, [
            q.value ? (r(), u(b, { key: 0 }, I(10, (s) => t("tr", { key: s }, [...e[30] || (e[30] = [
              t("td", { colspan: "9" }, [
                t("div", { class: "sl-shimmer" })
              ], -1)
            ])])), 64)) : (r(), u(b, { key: 1 }, [
              (r(!0), u(b, null, I(C.value, (s) => (r(), u("tr", {
                key: s.name,
                class: "sl-row",
                onClick: (a) => Y(s)
              }, [
                t("td", Ke, o(d($)(s.posting_date)), 1),
                t("td", {
                  class: "font-medium",
                  title: s.item_code
                }, o(s.item_name || s.item_code), 9, Pe),
                t("td", Ye, o(s.warehouse), 1),
                t("td", Ge, o(s.voucher_type), 1),
                t("td", null, [
                  t("span", Je, o(s.voucher_no), 1)
                ]),
                t("td", null, [
                  s.wh_from || s.wh_to ? (r(), u("div", Xe, [
                    s.wh_from ? (r(), u("span", {
                      key: 0,
                      class: "sl-wh-tag",
                      title: s.wh_from
                    }, o(G(s.wh_from)), 9, Ze)) : g("", !0),
                    s.wh_from && s.wh_to ? (r(), u("span", et, "→")) : g("", !0),
                    s.wh_to ? (r(), u("span", {
                      key: 2,
                      class: "sl-wh-tag sl-wh-tag-to",
                      title: s.wh_to
                    }, o(G(s.wh_to)), 9, tt)) : g("", !0)
                  ])) : (r(), u("span", st, "—"))
                ]),
                t("td", {
                  class: S(["ta-r mono-sm", d(n)(s.actual_qty) > 0 ? "green" : "red"])
                }, o(d(n)(s.actual_qty) > 0 ? "+" : "") + o(w(s.actual_qty)), 3),
                t("td", lt, o(w(s.qty_after_transaction)), 1),
                t("td", ot, o(R(s.stock_value_difference)), 1)
              ], 8, ze))), 128)),
              C.value.length ? g("", !0) : (r(), u("tr", at, [
                t("td", nt, o(E.value ? m.value.length ? "No entries match this filter" : "No ledger entries found" : "Run to view stock ledger"), 1)
              ]))
            ], 64))
          ])
        ]),
        t("div", it, [
          q.value ? (r(), u(b, { key: 0 }, I(6, (s) => t("div", {
            key: s,
            class: "sl-mobile-card sl-mc--skeleton"
          }, [...e[31] || (e[31] = [
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
          ])])), 64)) : C.value.length ? (r(!0), u(b, { key: 2 }, I(C.value, (s) => (r(), u("div", {
            key: s.name,
            class: "sl-mobile-card",
            onClick: (a) => Y(s)
          }, [
            t("div", dt, [
              t("span", ct, o(d($)(s.posting_date)), 1),
              t("span", {
                class: S(d(n)(s.actual_qty) > 0 ? "sl-mc-pos" : "sl-mc-neg")
              }, o(d(n)(s.actual_qty) > 0 ? "+" : "") + o(w(s.actual_qty)), 3)
            ]),
            t("div", mt, o(s.item_name || s.item_code), 1),
            t("div", vt, [
              t("span", null, o(s.voucher_type) + " · " + o(s.voucher_no), 1),
              t("span", null, "Bal: " + o(w(s.qty_after_transaction)), 1)
            ])
          ], 8, ut))), 128)) : (r(), u("div", rt, [
            e[32] || (e[32] = t("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "📒", -1)),
            t("div", null, o(E.value ? m.value.length ? "No entries match" : "No ledger entries" : "Run filters to view ledger"), 1)
          ]))
        ])
      ]),
      L.value ? (r(), u("div", {
        key: 2,
        class: "sl-overlay",
        onClick: e[10] || (e[10] = ye((s) => L.value = !1, ["self"]))
      })) : g("", !0),
      t("div", {
        class: S(["sl-drawer", { open: L.value }])
      }, [
        i.value ? (r(), u(b, { key: 0 }, [
          t("div", _t, [
            t("button", {
              class: "sl-dclose",
              onClick: e[11] || (e[11] = (s) => L.value = !1)
            }, [
              t("span", {
                innerHTML: d(k)("x", 16)
              }, null, 8, ft)
            ]),
            t("div", ht, [
              t("div", pt, [
                t("span", {
                  innerHTML: d(k)("ledger", 20)
                }, null, 8, yt)
              ]),
              t("div", null, [
                t("div", gt, o(i.value.item_code), 1),
                t("div", wt, [
                  h(o(i.value.warehouse) + " · " + o(d($)(i.value.posting_date)), 1),
                  i.value.posting_time ? (r(), u("span", kt, o(String(i.value.posting_time).slice(0, 8)), 1)) : g("", !0)
                ])
              ]),
              t("span", {
                class: S(["sl-badge", d(n)(i.value.actual_qty) >= 0 ? "badge-green" : "badge-red"])
              }, o(d(n)(i.value.actual_qty) >= 0 ? "Inward" : "Outward"), 3)
            ]),
            t("div", bt, [
              t("div", St, "Quantity " + o(d(n)(i.value.actual_qty) >= 0 ? "In" : "Out"), 1),
              t("div", {
                class: S(["sl-dh-amt-val", d(n)(i.value.actual_qty) >= 0 ? "green" : "red"])
              }, o(d(n)(i.value.actual_qty) > 0 ? "+" : "") + o(w(i.value.actual_qty)), 3)
            ])
          ]),
          t("div", Lt, [
            t("div", Ct, [
              t("span", {
                innerHTML: d(k)("info", 13)
              }, null, 8, Mt),
              e[33] || (e[33] = h(" Movement", -1))
            ]),
            t("div", Tt, [
              t("div", null, [
                e[34] || (e[34] = t("div", { class: "sl-meta-lbl" }, "Balance After", -1)),
                t("div", null, o(w(i.value.qty_after_transaction)), 1)
              ]),
              t("div", null, [
                e[35] || (e[35] = t("div", { class: "sl-meta-lbl" }, "Valuation Rate", -1)),
                t("div", null, o(R(i.value.valuation_rate)), 1)
              ]),
              t("div", null, [
                e[36] || (e[36] = t("div", { class: "sl-meta-lbl" }, "Value Change", -1)),
                t("div", {
                  class: S(d(n)(i.value.stock_value_difference) >= 0 ? "green" : "red")
                }, o(R(i.value.stock_value_difference)), 3)
              ]),
              t("div", null, [
                e[37] || (e[37] = t("div", { class: "sl-meta-lbl" }, "Posting Date", -1)),
                t("div", null, [
                  h(o(d($)(i.value.posting_date)), 1),
                  i.value.posting_time ? (r(), u("span", qt, o(String(i.value.posting_time).slice(0, 8)), 1)) : g("", !0)
                ])
              ])
            ]),
            t("div", Vt, [
              t("span", {
                innerHTML: d(k)("file", 13)
              }, null, 8, xt),
              e[38] || (e[38] = h(" Source Voucher", -1))
            ]),
            t("div", Ht, [
              t("div", null, [
                e[39] || (e[39] = t("div", { class: "sl-meta-lbl" }, "Type", -1)),
                t("div", null, o(i.value.voucher_type || "—"), 1)
              ]),
              t("div", null, [
                e[40] || (e[40] = t("div", { class: "sl-meta-lbl" }, "Number", -1)),
                t("div", It, o(i.value.voucher_no || "—"), 1)
              ])
            ]),
            i.value.voucher_type === "Stock Entry" ? (r(), u("button", {
              key: 0,
              class: "sl-link-btn",
              onClick: e[12] || (e[12] = (s) => re(i.value))
            }, [
              t("span", {
                innerHTML: d(k)("ext", 14)
              }, null, 8, $t),
              e[41] || (e[41] = h(" Open Stock Entry ", -1))
            ])) : g("", !0)
          ]),
          t("div", Et, [
            t("button", {
              class: "sl-btn-ghost",
              onClick: e[13] || (e[13] = (s) => L.value = !1)
            }, "Close")
          ])
        ], 64)) : g("", !0)
      ], 2)
    ]));
  }
}, Ft = /* @__PURE__ */ ve(Dt, [["__scopeId", "data-v-70ec32d8"]]);
export {
  Ft as default
};
