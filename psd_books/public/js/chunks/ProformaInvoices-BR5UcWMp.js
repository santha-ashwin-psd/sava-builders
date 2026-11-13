import { _ as me, x as pe, z as ve, o as fe, c as d, a as e, u as i, i as u, w, A as C, d as b, C as j, b as v, F as S, r as P, t as a, D as E, a4 as Q, q as V, n as G, H as be, f as q, h as m, g as X, L as _e, e as ye, K as ge, a2 as he, j as ke, S as we, k as r, X as Ce } from "./main-DQXXITLP.js";
import { _ as J } from "./SearchableSelect-C7RyckVo.js";
import { o as Se } from "./useOpenFromQuery-CuI4Ip3p.js";
import { u as Te } from "./usePagination-BFv1KCj3.js";
/* empty css                                                                 */
import { P as Ie } from "./Pagination-BFnGFolN.js";
import { S as Le } from "./SummaryStrip-lrQZwdL4.js";
import { b as W } from "./format-BcJZDVG4.js";
import { o as Y } from "./userNames-C68bdcZT.js";
const xe = { class: "b-page" }, Me = { class: "b-action-bar" }, De = { style: { display: "flex", "align-items": "center", gap: "6px", background: "#fff", border: "1px solid #E2E8F0", "border-radius": "20px", padding: "5px 14px", flex: "1", "max-width": "280px" } }, He = ["innerHTML"], $e = { style: { display: "flex", gap: "6px", "margin-left": "auto" } }, Pe = ["innerHTML"], Ve = ["disabled", "title"], Ae = ["innerHTML"], ze = {
  class: "b-card",
  style: { padding: "0", overflow: "hidden" }
}, Ne = { class: "b-table" }, Ue = { key: 1 }, Fe = {
  colspan: "6",
  class: "b-empty"
}, Ee = ["onClick"], qe = {
  class: "mono",
  style: { "font-size": "12px", color: "#3B5BDB" }
}, Re = { class: "fw-600" }, Ke = {
  class: "c-muted",
  style: { "font-size": "12.5px" }
}, Be = {
  class: "ta-r mono",
  style: { "font-weight": "600", color: "#2F9E44" }
}, Oe = { style: { "text-align": "center" } }, je = ["onClick", "disabled", "title", "innerHTML"], Qe = {
  key: 1,
  style: { "margin-top": "12px" }
}, Ge = { class: "pf-view-head" }, Xe = { class: "pf-view-head-row" }, Je = { class: "pf-view-num" }, We = { class: "pf-view-sub" }, Ye = ["innerHTML"], Ze = { class: "pf-view-amount" }, et = { class: "pf-dbody" }, tt = { class: "pf-section" }, st = { class: "pf-section-hdr" }, nt = ["innerHTML"], ot = { class: "pf-meta-grid" }, at = { style: { "font-weight": "600" } }, lt = {
  class: "mono",
  style: { color: "#16a34a", "font-weight": "700" }
}, it = {
  key: 0,
  style: { "grid-column": "1/-1" }
}, rt = {
  key: 0,
  class: "pf-section"
}, dt = { class: "pf-section-hdr" }, ut = ["innerHTML"], ct = { style: { "margin-left": "auto", "font-size": "11.5px", color: "#6b7280", "text-transform": "none", "letter-spacing": "0" } }, mt = {
  class: "b-table",
  style: { "font-size": "12.5px" }
}, pt = { class: "ta-r" }, vt = { class: "ta-r mono" }, ft = { class: "ta-r mono fw-700" }, bt = {
  key: 1,
  class: "inv-view-footer"
}, _t = { class: "pf-dfooter" }, yt = ["innerHTML"], gt = ["disabled", "title"], ht = { class: "pf-dheader" }, kt = { class: "pf-dheader-left" }, wt = { class: "pf-dheader-ico" }, Ct = ["innerHTML"], St = ["innerHTML"], Tt = { class: "pf-dbody" }, It = { class: "pf-section" }, Lt = { class: "pf-section-hdr" }, xt = ["innerHTML"], Mt = { class: "pf-grid" }, Dt = {
  class: "pf-field",
  style: { "grid-column": "1/-1" }
}, Ht = { class: "pf-field" }, $t = { class: "pf-field" }, Pt = {
  class: "pf-field",
  style: { "grid-column": "1/-1" }
}, Vt = { class: "pf-section" }, At = { class: "pf-section-hdr" }, zt = ["innerHTML"], Nt = ["disabled"], Ut = ["innerHTML"], Ft = ["onUpdate:modelValue", "onInput"], Et = ["onUpdate:modelValue", "onInput"], qt = ["disabled", "onClick"], Rt = ["innerHTML"], Kt = {
  key: 0,
  class: "pf-items-empty"
}, Bt = { class: "pf-total" }, Ot = { class: "mono" }, jt = { class: "pf-dfooter" }, Qt = ["disabled"], Gt = ["disabled", "title"], Xt = {
  class: "b-card b-card-body",
  style: { "max-width": "400px", width: "90%" }
}, Jt = { style: { "font-size": "13px", color: "#374151", "margin-bottom": "20px" } }, Wt = { style: { display: "flex", gap: "8px", "justify-content": "flex-end" } }, Yt = ["disabled"], Zt = {
  __name: "ProformaInvoices",
  setup(es) {
    const { toast: y } = pe(), Z = ke(), ee = we(), _ = m([]), T = m(!1), M = m(""), g = m(!1), o = m(null), h = m(!1), I = m(!1), D = m(!1), L = m(!1), A = m(null), te = m([]), z = m([]), H = m([]), l = ve({
      customer: "",
      posting_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      due_date: "",
      remarks: "Proforma Invoice",
      items: []
    }), k = (n) => Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), se = X(() => l.items.reduce((n, t) => n + (parseFloat(t.amount) || 0), 0)), x = X(() => {
      const n = M.value.trim().toLowerCase();
      return n ? _.value.filter(
        (t) => (t.name || "").toLowerCase().includes(n) || (t.customer_name || "").toLowerCase().includes(n)
      ) : _.value;
    }), { page: N, pageSize: U, paged: ne } = Te(x, { storageKey: "proforma" });
    async function $() {
      T.value = !0;
      try {
        _.value = await q("Sales Invoice", {
          fields: ["name", "customer", "customer_name", "posting_date", "grand_total", "notes", "docstatus"],
          filters: [["docstatus", "=", 0], ["notes", "like", "%Proforma%"]],
          limit: 200
        }), _.value = _.value.map((n) => ({ ...n, remarks: n.notes }));
      } catch (n) {
        console.warn("Proforma load failed:", n.message), _.value = [];
      } finally {
        T.value = !1;
      }
    }
    async function R(n) {
      g.value = !0;
      try {
        o.value = await Ce("Sales Invoice", n.name);
      } catch {
        o.value = n;
      }
    }
    function oe() {
      o.value && window.open(`/printview?doctype=Sales%20Invoice&name=${o.value.name}&format=Standard&no_letterhead=0`, "_blank");
    }
    async function ae() {
      if (o.value) {
        D.value = !0;
        try {
          await _e("Sales Invoice", o.value.name), y.success(`Invoice ${o.value.name} finalized`), g.value = !1, Z.push("/invoices");
        } catch (n) {
          y.error(n.message || "Conversion failed");
        } finally {
          D.value = !1;
        }
      }
    }
    function le() {
      Object.assign(l, { customer: "", posting_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), due_date: "", remarks: "Proforma Invoice", items: [] }), te.value = [], B(""), O(""), K(), h.value = !0;
    }
    function K() {
      l.items.push({ item_code: "", qty: 1, rate: 0, amount: 0 });
    }
    function ie(n) {
      l.items.splice(n, 1);
    }
    function F(n) {
      n.amount = (parseFloat(n.qty) || 0) * (parseFloat(n.rate) || 0);
    }
    async function B(n = "") {
      try {
        const t = [["disabled", "=", 0]];
        n && t.push(["customer_name", "like", "%" + n + "%"]);
        const c = await q("Customer", { fields: ["name", "customer_name"], filters: t, limit: 30, order: "customer_name asc" });
        z.value = (c || []).map((s) => ({ ...s, label: s.customer_name || s.name, value: s.name }));
      } catch {
        z.value = [];
      }
    }
    async function O(n = "") {
      try {
        const t = [["disabled", "=", 0]];
        n && t.push(["item_name", "like", "%" + n + "%"]);
        const c = await q("Item", { fields: ["name", "item_name", "standard_rate", "stock_uom", "description"], filters: [...t, ["has_variants", "=", 0], ["is_sales_item", "=", 1]], limit: 30, order: "item_name asc" });
        H.value = (c || []).map((s) => ({
          ...s,
          label: s.item_name || s.name,
          value: s.name,
          rate: s.standard_rate || 0,
          uom: s.stock_uom || "Nos",
          description: s.description || ""
        }));
      } catch {
        H.value = [];
      }
    }
    function re(n, t) {
      const c = (t == null ? void 0 : t.value) ?? t;
      n.item_code = c;
      const s = H.value.find((p) => p.value === c || p.name === c);
      s && (n.rate = s.rate ?? 0, n.item_name = s.label || s.item_name || c, n.description = s.description || "", F(n));
    }
    async function de() {
      if (!l.customer.trim()) {
        y.error("Customer is required");
        return;
      }
      if (!l.items.length || !l.items[0].item_code) {
        y.error("Add at least one item");
        return;
      }
      I.value = !0;
      try {
        const n = await ye(), t = {
          doctype: "Sales Invoice",
          customer: l.customer,
          posting_date: l.posting_date,
          due_date: l.due_date || l.posting_date,
          company: n,
          notes: l.remarks || "Proforma Invoice",
          items: l.items.filter((s) => {
            var p;
            return (p = s.item_code) == null ? void 0 : p.trim();
          }).map((s) => ({
            doctype: "Sales Invoice Item",
            item_code: s.item_code,
            item_name: s.item_name || s.item_code,
            description: s.description || s.item_name || s.item_code,
            qty: parseFloat(s.qty) || 1,
            rate: parseFloat(s.rate) || 0,
            amount: parseFloat(s.amount) || 0
          }))
        }, c = await ge(t);
        y.success(`Proforma ${c.name} saved`), h.value = !1, await $();
      } catch (n) {
        y.error(n.message || "Failed to save");
      } finally {
        I.value = !1;
      }
    }
    function ue(n) {
      A.value = n, L.value = !0;
    }
    async function ce() {
      try {
        await he("Sales Invoice", A.value.name), y.success("Deleted"), L.value = !1, await $();
      } catch (n) {
        y.error(n.message || "Delete failed");
      }
    }
    return fe(async () => {
      await $(), Se({
        route: ee,
        openByName: (n) => R(_.value.find((t) => t.name === n) || { name: n })
      });
    }), (n, t) => {
      var c;
      return r(), d("div", xe, [
        e("div", Me, [
          e("div", De, [
            e("span", {
              innerHTML: i(u)("search", 13),
              style: { color: "#868E96", "flex-shrink": "0" }
            }, null, 8, He),
            w(e("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (s) => M.value = s),
              placeholder: "Search proforma invoices…",
              style: { border: "none", outline: "none", "font-size": "13px", width: "100%", background: "transparent", "font-family": "inherit" }
            }, null, 512), [
              [C, M.value]
            ])
          ]),
          e("div", $e, [
            e("button", {
              class: "b-btn b-btn-ghost",
              onClick: $
            }, [
              e("span", {
                innerHTML: i(u)("refresh", 13)
              }, null, 8, Pe)
            ]),
            e("button", {
              class: "b-btn b-btn-primary",
              disabled: !n.$canCreate("invoices"),
              title: n.$canCreate("invoices") ? "" : "Read-only access",
              onClick: le
            }, [
              e("span", {
                innerHTML: i(u)("plus", 13)
              }, null, 8, Ae),
              t[15] || (t[15] = b(" New Proforma", -1))
            ], 8, Ve)
          ])
        ]),
        T.value ? v("", !0) : (r(), j(Le, {
          key: 0,
          cards: [
            { label: "Total Proformas", tone: "accent", value: _.value.length },
            { label: "In Filter", tone: "info", value: x.value.length, valueClass: "blue" },
            { label: "Pipeline Value", tone: "warn", value: "KES " + k(_.value.reduce((s, p) => s + (Number(p.grand_total) || 0), 0)) }
          ]
        }, null, 8, ["cards"])),
        e("div", ze, [
          e("table", Ne, [
            t[18] || (t[18] = e("thead", null, [
              e("tr", null, [
                e("th", null, "Proforma #"),
                e("th", null, "Customer"),
                e("th", null, "Date"),
                e("th", { class: "ta-r" }, "Amount"),
                e("th", null, "Status"),
                e("th")
              ])
            ], -1)),
            e("tbody", null, [
              T.value ? (r(), d(S, { key: 0 }, P(5, (s) => e("tr", { key: s }, [...t[16] || (t[16] = [
                e("td", {
                  colspan: "6",
                  style: { padding: "14px" }
                }, [
                  e("div", {
                    class: "b-shimmer",
                    style: { height: "12px" }
                  })
                ], -1)
              ])])), 64)) : x.value.length ? (r(!0), d(S, { key: 2 }, P(i(ne), (s) => (r(), d("tr", {
                key: s.name,
                class: "clickable",
                onClick: (p) => R(s)
              }, [
                e("td", null, [
                  e("span", qe, a(s.name), 1)
                ]),
                e("td", Re, a(s.customer_name || s.customer || "—"), 1),
                e("td", Ke, a(s.posting_date || "—"), 1),
                e("td", Be, "KES " + a(k(s.grand_total)), 1),
                t[17] || (t[17] = e("td", null, [
                  e("span", { class: "b-badge b-badge-orange" }, "Draft / Proforma")
                ], -1)),
                e("td", Oe, [
                  e("button", {
                    onClick: V((p) => ue(s), ["stop"]),
                    disabled: !n.$canDelete("invoices"),
                    title: n.$canDelete("invoices") ? "" : "Not permitted",
                    style: { background: "none", border: "none", cursor: "pointer", color: "#C92A2A", padding: "4px" },
                    innerHTML: i(u)("trash", 13)
                  }, null, 8, je)
                ])
              ], 8, Ee))), 128)) : (r(), d("tr", Ue, [
                e("td", Fe, a(M.value ? "No proforma invoices match your search" : "No proforma invoices yet"), 1)
              ]))
            ])
          ])
        ]),
        !T.value && x.value.length ? (r(), d("div", Qe, [
          E(Ie, {
            page: i(N),
            "onUpdate:page": t[1] || (t[1] = (s) => Q(N) ? N.value = s : null),
            "page-size": i(U),
            "onUpdate:pageSize": t[2] || (t[2] = (s) => Q(U) ? U.value = s : null),
            "total-items": x.value.length
          }, null, 8, ["page", "page-size", "total-items"])
        ])) : v("", !0),
        (r(), j(be, { to: "body" }, [
          g.value ? (r(), d("div", {
            key: 0,
            class: "pf-overlay",
            onClick: t[3] || (t[3] = V((s) => g.value = !1, ["self"]))
          })) : v("", !0),
          e("div", {
            class: G(["pf-drawer pf-view-drawer", { open: g.value }])
          }, [
            o.value ? (r(), d(S, { key: 0 }, [
              e("div", Ge, [
                e("div", Xe, [
                  e("div", null, [
                    e("div", Je, a(o.value.name), 1),
                    e("div", We, "Proforma Invoice · " + a(o.value.posting_date), 1)
                  ]),
                  e("button", {
                    class: "pf-dclose",
                    onClick: t[4] || (t[4] = (s) => g.value = !1)
                  }, [
                    e("span", {
                      innerHTML: i(u)("x", 16)
                    }, null, 8, Ye)
                  ])
                ]),
                e("div", Ze, "KES " + a(k(o.value.grand_total)), 1)
              ]),
              e("div", et, [
                e("div", tt, [
                  e("div", st, [
                    e("span", {
                      innerHTML: i(u)("user", 13)
                    }, null, 8, nt),
                    t[19] || (t[19] = e("span", null, "Customer & Date", -1))
                  ]),
                  e("div", ot, [
                    e("div", null, [
                      t[20] || (t[20] = e("div", { class: "pf-meta-lbl" }, "Customer", -1)),
                      e("div", at, a(o.value.customer_name || o.value.customer), 1)
                    ]),
                    e("div", null, [
                      t[21] || (t[21] = e("div", { class: "pf-meta-lbl" }, "Date", -1)),
                      e("div", null, a(o.value.posting_date), 1)
                    ]),
                    e("div", null, [
                      t[22] || (t[22] = e("div", { class: "pf-meta-lbl" }, "Valid Until", -1)),
                      e("div", null, a(o.value.due_date || "—"), 1)
                    ]),
                    e("div", null, [
                      t[23] || (t[23] = e("div", { class: "pf-meta-lbl" }, "Grand Total", -1)),
                      e("div", lt, "KES " + a(k(o.value.grand_total)), 1)
                    ]),
                    o.value.remarks ? (r(), d("div", it, [
                      t[24] || (t[24] = e("div", { class: "pf-meta-lbl" }, "Remarks", -1)),
                      e("div", null, a(o.value.remarks), 1)
                    ])) : v("", !0)
                  ])
                ]),
                (o.value.items || []).length ? (r(), d("div", rt, [
                  e("div", dt, [
                    e("span", {
                      innerHTML: i(u)("box", 13)
                    }, null, 8, ut),
                    t[25] || (t[25] = e("span", null, "Items", -1)),
                    e("span", ct, a((o.value.items || []).length) + " line" + a((o.value.items || []).length !== 1 ? "s" : ""), 1)
                  ]),
                  e("table", mt, [
                    t[26] || (t[26] = e("thead", null, [
                      e("tr", null, [
                        e("th", null, "Item"),
                        e("th", { class: "ta-r" }, "Qty"),
                        e("th", { class: "ta-r" }, "Rate"),
                        e("th", { class: "ta-r" }, "Amount")
                      ])
                    ], -1)),
                    e("tbody", null, [
                      (r(!0), d(S, null, P(o.value.items, (s) => (r(), d("tr", {
                        key: s.name || s.item_code
                      }, [
                        e("td", null, a(s.item_name || s.item_code), 1),
                        e("td", pt, a(s.qty), 1),
                        e("td", vt, "KES " + a(k(s.rate)), 1),
                        e("td", ft, "KES " + a(k(s.amount)), 1)
                      ]))), 128))
                    ])
                  ])
                ])) : v("", !0),
                o.value.owner ? (r(), d("div", bt, [
                  b(" Created by " + a(i(Y)(o.value.owner)) + " on " + a(i(W)(o.value.creation)) + " ", 1),
                  o.value.modified_by ? (r(), d(S, { key: 0 }, [
                    b(" · Last modified by " + a(i(Y)(o.value.modified_by)) + " on " + a(i(W)(o.value.modified)), 1)
                  ], 64)) : v("", !0)
                ])) : v("", !0)
              ]),
              e("div", _t, [
                e("button", {
                  class: "b-btn b-btn-ghost",
                  onClick: t[5] || (t[5] = (s) => g.value = !1)
                }, "Close"),
                e("button", {
                  class: "b-btn pf-btn-amber",
                  onClick: oe
                }, [
                  e("span", {
                    innerHTML: i(u)("print", 13)
                  }, null, 8, yt),
                  t[27] || (t[27] = b(" Print ", -1))
                ]),
                e("button", {
                  class: "b-btn b-btn-primary",
                  disabled: D.value || !n.$canEdit("invoices"),
                  title: n.$canEdit("invoices") ? "" : "Read-only access",
                  onClick: ae
                }, a(D.value ? "Converting…" : "→ Convert to Invoice"), 9, gt)
              ])
            ], 64)) : v("", !0)
          ], 2),
          h.value ? (r(), d("div", {
            key: 1,
            class: "pf-overlay",
            onClick: t[6] || (t[6] = V((s) => h.value = !1, ["self"]))
          })) : v("", !0),
          e("div", {
            class: G(["pf-drawer", { open: h.value }])
          }, [
            e("div", ht, [
              e("div", kt, [
                e("div", wt, [
                  e("span", {
                    innerHTML: i(u)("invoices", 18)
                  }, null, 8, Ct)
                ]),
                t[28] || (t[28] = e("div", null, [
                  e("div", { class: "pf-dheader-title" }, "New Proforma Invoice"),
                  e("div", { class: "pf-dheader-sub" }, "A draft quote-style invoice for advance billing")
                ], -1))
              ]),
              e("button", {
                class: "pf-dclose",
                onClick: t[7] || (t[7] = (s) => h.value = !1)
              }, [
                e("span", {
                  innerHTML: i(u)("x", 16)
                }, null, 8, St)
              ])
            ]),
            e("div", Tt, [
              e("div", It, [
                e("div", Lt, [
                  e("span", {
                    innerHTML: i(u)("user", 13)
                  }, null, 8, xt),
                  t[29] || (t[29] = e("span", null, "Customer & Date", -1))
                ]),
                e("div", Mt, [
                  e("div", Dt, [
                    t[30] || (t[30] = e("label", { class: "pf-flbl" }, [
                      b("Customer "),
                      e("span", { class: "req" }, "*")
                    ], -1)),
                    E(J, {
                      modelValue: l.customer,
                      "onUpdate:modelValue": t[8] || (t[8] = (s) => l.customer = s),
                      options: z.value,
                      placeholder: "Select customer…",
                      createable: !0,
                      createDoctype: "Customer",
                      onSearch: B
                    }, null, 8, ["modelValue", "options"])
                  ]),
                  e("div", Ht, [
                    t[31] || (t[31] = e("label", { class: "pf-flbl" }, [
                      b("Date "),
                      e("span", { class: "req" }, "*")
                    ], -1)),
                    w(e("input", {
                      class: "pf-input",
                      type: "date",
                      "onUpdate:modelValue": t[9] || (t[9] = (s) => l.posting_date = s)
                    }, null, 512), [
                      [C, l.posting_date]
                    ])
                  ]),
                  e("div", $t, [
                    t[32] || (t[32] = e("label", { class: "pf-flbl" }, "Valid Until", -1)),
                    w(e("input", {
                      class: "pf-input",
                      type: "date",
                      "onUpdate:modelValue": t[10] || (t[10] = (s) => l.due_date = s)
                    }, null, 512), [
                      [C, l.due_date]
                    ])
                  ]),
                  e("div", Pt, [
                    t[33] || (t[33] = e("label", { class: "pf-flbl" }, "Remarks", -1)),
                    w(e("input", {
                      class: "pf-input",
                      "onUpdate:modelValue": t[11] || (t[11] = (s) => l.remarks = s),
                      placeholder: "e.g. Proforma Invoice for advance payment"
                    }, null, 512), [
                      [C, l.remarks]
                    ])
                  ])
                ])
              ]),
              e("div", Vt, [
                e("div", At, [
                  e("span", {
                    innerHTML: i(u)("box", 13)
                  }, null, 8, zt),
                  t[35] || (t[35] = e("span", null, [
                    b("Items "),
                    e("span", { class: "req" }, "*")
                  ], -1)),
                  e("button", {
                    class: "b-btn b-btn-ghost",
                    style: { "margin-left": "auto", padding: "4px 10px", "font-size": "12px" },
                    disabled: !n.$canCreate("invoices"),
                    onClick: K
                  }, [
                    e("span", {
                      innerHTML: i(u)("plus", 11),
                      style: { "vertical-align": "-1px", "margin-right": "3px" }
                    }, null, 8, Ut),
                    t[34] || (t[34] = b(" Add Item ", -1))
                  ], 8, Nt)
                ]),
                (r(!0), d(S, null, P(l.items, (s, p) => (r(), d("div", {
                  key: p,
                  class: "pf-item-row"
                }, [
                  E(J, {
                    modelValue: s.item_code,
                    "onUpdate:modelValue": (f) => s.item_code = f,
                    options: H.value,
                    placeholder: "Select item…",
                    createable: !0,
                    createDoctype: "Item",
                    onSearch: O,
                    onSelect: (f) => re(s, f)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onSelect"]),
                  w(e("input", {
                    class: "pf-input ta-r",
                    type: "number",
                    "onUpdate:modelValue": (f) => s.qty = f,
                    placeholder: "Qty",
                    min: "0.01",
                    onInput: (f) => F(s)
                  }, null, 40, Ft), [
                    [
                      C,
                      s.qty,
                      void 0,
                      { number: !0 }
                    ]
                  ]),
                  w(e("input", {
                    class: "pf-input ta-r",
                    type: "number",
                    "onUpdate:modelValue": (f) => s.rate = f,
                    placeholder: "Rate",
                    min: "0",
                    onInput: (f) => F(s)
                  }, null, 40, Et), [
                    [
                      C,
                      s.rate,
                      void 0,
                      { number: !0 }
                    ]
                  ]),
                  e("button", {
                    class: "pf-rm",
                    disabled: !n.$canCreate("invoices"),
                    onClick: (f) => ie(p)
                  }, [
                    e("span", {
                      innerHTML: i(u)("trash", 12)
                    }, null, 8, Rt)
                  ], 8, qt)
                ]))), 128)),
                l.items.length ? v("", !0) : (r(), d("div", Kt, "No items yet — click Add Item")),
                e("div", Bt, [
                  t[36] || (t[36] = e("span", null, "Total", -1)),
                  e("span", Ot, "KES " + a(k(se.value)), 1)
                ])
              ])
            ]),
            e("div", jt, [
              e("button", {
                class: "b-btn b-btn-ghost",
                onClick: t[12] || (t[12] = (s) => h.value = !1),
                disabled: I.value
              }, "Cancel", 8, Qt),
              e("button", {
                class: "b-btn b-btn-primary",
                disabled: I.value || !n.$canCreate("invoices"),
                title: n.$canCreate("invoices") ? "" : "Read-only access",
                onClick: de
              }, a(I.value ? "Saving…" : "Save Proforma"), 9, Gt)
            ])
          ], 2),
          L.value ? (r(), d("div", {
            key: 2,
            style: { position: "fixed", inset: "0", background: "rgba(0,0,0,.45)", "z-index": "1000", display: "flex", "align-items": "center", "justify-content": "center" },
            onClick: t[14] || (t[14] = V((s) => L.value = !1, ["self"]))
          }, [
            e("div", Xt, [
              t[39] || (t[39] = e("div", { style: { "font-size": "15px", "font-weight": "700", "margin-bottom": "8px", color: "#C92A2A" } }, "Delete Proforma?", -1)),
              e("div", Jt, [
                t[37] || (t[37] = b("Delete ", -1)),
                e("strong", null, a((c = A.value) == null ? void 0 : c.name), 1),
                t[38] || (t[38] = b("? This cannot be undone.", -1))
              ]),
              e("div", Wt, [
                e("button", {
                  class: "b-btn b-btn-ghost",
                  onClick: t[13] || (t[13] = (s) => L.value = !1)
                }, "Cancel"),
                e("button", {
                  class: "b-btn",
                  style: { background: "#C92A2A", color: "#fff", "border-color": "#C92A2A" },
                  disabled: !n.$canDelete("invoices"),
                  onClick: ce
                }, "Delete", 8, Yt)
              ])
            ])
          ])) : v("", !0)
        ]))
      ]);
    };
  }
}, us = /* @__PURE__ */ me(Zt, [["__scopeId", "data-v-c20d6bb5"]]);
export {
  us as default
};
