import { _ as Q, o as U, c as l, a as e, t as n, u as a, s as I, i as u, n as h, F as g, r as M, b as A, d as p, e as j, f, g as z, h as _, j as W, k as d } from "./main-CULz3kda.js";
import { f as b } from "./format-BcJZDVG4.js";
const Y = { class: "db-page" }, J = { class: "db-header" }, X = { class: "db-greeting" }, Z = { class: "db-company" }, ee = { class: "db-header-right" }, se = { class: "db-date" }, te = { class: "db-kpi-grid" }, ne = ["innerHTML"], oe = { class: "db-kpi-body" }, ie = { class: "db-kpi-sub" }, le = ["innerHTML"], ae = { class: "db-kpi-body" }, de = { class: "db-kpi-sub" }, re = ["innerHTML"], ue = { class: "db-kpi-body" }, ce = { class: "db-kpi-sub" }, ve = ["innerHTML"], pe = { class: "db-kpi-body" }, be = { class: "db-kpi-sub" }, me = { class: "db-two-col" }, ye = { class: "db-panel" }, _e = { class: "db-panel-header" }, ke = {
  key: 1,
  class: "db-mini-table"
}, ge = { class: "db-doc-link" }, fe = {
  class: "text-muted",
  style: { "max-width": "140px", overflow: "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" }
}, he = { class: "ta-r mono-sm" }, Ce = { key: 0 }, Le = { class: "db-panel" }, Me = { class: "db-alert-section" }, we = { class: "db-alert-doc" }, Te = { class: "db-alert-party" }, He = { class: "ta-r" }, xe = { class: "mono-sm red" }, Ie = { class: "db-alert-age" }, Pe = {
  key: 0,
  class: "db-alert-none"
}, $e = ["innerHTML"], Ne = { class: "db-alert-section" }, Se = {
  key: 0,
  class: "db-shimmer",
  style: { margin: "8px 16px" }
}, qe = { class: "db-alert-doc" }, Ae = {
  key: 1,
  class: "db-alert-none"
}, Re = ["innerHTML"], De = { class: "db-quick-section" }, Oe = { class: "db-quick-grid" }, Ee = ["innerHTML"], Fe = ["innerHTML"], Be = ["innerHTML"], Ve = ["innerHTML"], Ge = ["innerHTML"], Ke = ["innerHTML"], Qe = {
  __name: "PhaseAHome",
  setup(Ue) {
    const R = W();
    function r(o) {
      R.push(o);
    }
    const m = /* @__PURE__ */ new Date(), D = m.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }), P = m.getHours(), O = P < 12 ? "Good morning" : P < 17 ? "Good afternoon" : "Good evening", E = z(() => {
      const o = I.fullname || I.user || "";
      return o.split(" ")[0] || o;
    }), $ = new Date(m.getFullYear(), m.getMonth(), 1).toISOString().slice(0, 10), N = m.toISOString().slice(0, 10), c = _(!0), v = _({ receivables: 0, payables: 0, income: 0, expenses: 0, invoiceCount: 0, billCount: 0, paidCount: 0, expenseCount: 0 }), w = _(!0), T = _([]), C = _(!0), H = _([]), L = _(0);
    async function F() {
      try {
        const o = await j(), [s, t, x, S, G] = await Promise.all([
          f("Sales Invoice", {
            fields: ["name", "customer", "customer_name", "grand_total", "outstanding_amount", "status", "posting_date", "due_date"],
            filters: [["company", "=", o], ["docstatus", "=", 1], ["outstanding_amount", ">", 0]],
            limit: 100,
            order: "posting_date desc, creation desc"
          }),
          f("Purchase Invoice", {
            fields: ["name", "supplier", "grand_total", "outstanding_amount", "status", "posting_date"],
            filters: [["company", "=", o], ["docstatus", "=", 1], ["outstanding_amount", ">", 0]],
            limit: 100
          }),
          f("Payment Entry", {
            fields: ["name", "paid_amount", "payment_date"],
            filters: [["company", "=", o], ["payment_type", "=", "Receive"], ["payment_date", ">=", $], ["payment_date", "<=", N]],
            limit: 200
          }),
          f("Payment Entry", {
            fields: ["name", "paid_amount", "payment_date"],
            filters: [["company", "=", o], ["payment_type", "=", "Pay"], ["payment_date", ">=", $], ["payment_date", "<=", N]],
            limit: 200
          }),
          f("Warehouse", { fields: ["name"], filters: [["company", "=", o], ["is_group", "=", 0]], limit: 200 })
        ]), q = G.map((i) => i.name), K = q.length ? await f("Bin", {
          fields: ["item_code", "actual_qty", "reorder_level"],
          filters: [["warehouse", "in", q], ["reorder_level", ">", 0]],
          limit: 500
        }) : [];
        v.value = {
          receivables: s.reduce((i, y) => i + b(y.outstanding_amount), 0),
          payables: t.reduce((i, y) => i + b(y.outstanding_amount), 0),
          income: x.reduce((i, y) => i + b(y.paid_amount), 0),
          expenses: S.reduce((i, y) => i + b(y.paid_amount), 0),
          invoiceCount: s.length,
          billCount: t.length,
          paidCount: x.length,
          expenseCount: S.length
        }, c.value = !1, T.value = s.slice(0, 7), w.value = !1, H.value = s.filter((i) => i.due_date && new Date(i.due_date) < m && b(i.outstanding_amount) > 0), L.value = K.filter((i) => b(i.actual_qty) <= b(i.reorder_level)).length, C.value = !1;
      } catch {
        c.value = !1, w.value = !1, C.value = !1;
      }
    }
    function B(o) {
      const s = o.status;
      return s === "Overdue" ? "badge-red" : s === "Unpaid" ? "badge-orange" : s === "Paid" ? "badge-green" : s === "Partially Paid" ? "badge-blue" : "badge-grey";
    }
    function V(o) {
      return o ? Math.floor((m - new Date(o)) / 864e5) : 0;
    }
    function k(o) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format(b(o));
    }
    return U(F), (o, s) => (d(), l("div", Y, [
      e("div", J, [
        e("div", null, [
          e("div", X, n(a(O)) + ", " + n(E.value), 1),
          e("div", Z, n(a(I).company), 1)
        ]),
        e("div", ee, [
          e("span", se, n(a(D)), 1)
        ])
      ]),
      e("div", te, [
        e("div", {
          class: "db-kpi-card",
          onClick: s[0] || (s[0] = (t) => r("/invoices"))
        }, [
          e("div", {
            class: "db-kpi-icon",
            style: { background: "#eff6ff", color: "#2563eb" },
            innerHTML: a(u)("file-text", 20)
          }, null, 8, ne),
          e("div", oe, [
            s[13] || (s[13] = e("div", { class: "db-kpi-lbl" }, "Total Receivables", -1)),
            e("div", {
              class: h(["db-kpi-val", c.value ? "db-kpi-loading" : ""])
            }, n(c.value ? "—" : k(v.value.receivables)), 3),
            e("div", ie, n(v.value.invoiceCount) + " open invoices", 1)
          ])
        ]),
        e("div", {
          class: "db-kpi-card",
          onClick: s[1] || (s[1] = (t) => r("/purchases"))
        }, [
          e("div", {
            class: "db-kpi-icon",
            style: { background: "#fef3c7", color: "#d97706" },
            innerHTML: a(u)("shopping-cart", 20)
          }, null, 8, le),
          e("div", ae, [
            s[14] || (s[14] = e("div", { class: "db-kpi-lbl" }, "Total Payables", -1)),
            e("div", {
              class: h(["db-kpi-val", c.value ? "db-kpi-loading" : ""])
            }, n(c.value ? "—" : k(v.value.payables)), 3),
            e("div", de, n(v.value.billCount) + " unpaid bills", 1)
          ])
        ]),
        e("div", {
          class: "db-kpi-card",
          onClick: s[2] || (s[2] = (t) => r("/payments-received"))
        }, [
          e("div", {
            class: "db-kpi-icon",
            style: { background: "#dcfce7", color: "#16a34a" },
            innerHTML: a(u)("trending-up", 20)
          }, null, 8, re),
          e("div", ue, [
            s[15] || (s[15] = e("div", { class: "db-kpi-lbl" }, "Income This Month", -1)),
            e("div", {
              class: h(["db-kpi-val", c.value ? "db-kpi-loading" : ""])
            }, n(c.value ? "—" : k(v.value.income)), 3),
            e("div", ce, n(v.value.paidCount) + " payments received", 1)
          ])
        ]),
        e("div", {
          class: "db-kpi-card",
          onClick: s[3] || (s[3] = (t) => r("/payments"))
        }, [
          e("div", {
            class: "db-kpi-icon",
            style: { background: "#fee2e2", color: "#dc2626" },
            innerHTML: a(u)("trending-down", 20)
          }, null, 8, ve),
          e("div", pe, [
            s[16] || (s[16] = e("div", { class: "db-kpi-lbl" }, "Expenses This Month", -1)),
            e("div", {
              class: h(["db-kpi-val", c.value ? "db-kpi-loading" : ""])
            }, n(c.value ? "—" : k(v.value.expenses)), 3),
            e("div", be, n(v.value.expenseCount) + " transactions", 1)
          ])
        ])
      ]),
      e("div", me, [
        e("div", ye, [
          e("div", _e, [
            s[17] || (s[17] = e("span", { class: "db-panel-title" }, "Recent Invoices", -1)),
            e("button", {
              class: "db-link-btn",
              onClick: s[4] || (s[4] = (t) => r("/invoices"))
            }, "View all →")
          ]),
          w.value ? (d(), l(g, { key: 0 }, M(5, (t) => e("div", {
            key: t,
            class: "db-shimmer",
            style: { margin: "10px 16px" }
          })), 64)) : (d(), l("table", ke, [
            s[19] || (s[19] = e("thead", null, [
              e("tr", null, [
                e("th", null, "Invoice"),
                e("th", null, "Customer"),
                e("th", { class: "ta-r" }, "Amount"),
                e("th", null, "Status")
              ])
            ], -1)),
            e("tbody", null, [
              (d(!0), l(g, null, M(T.value, (t) => (d(), l("tr", {
                key: t.name,
                class: "db-mini-row"
              }, [
                e("td", null, [
                  e("span", ge, n(t.name), 1)
                ]),
                e("td", fe, n(t.customer_name || t.customer), 1),
                e("td", he, n(k(t.grand_total)), 1),
                e("td", null, [
                  e("span", {
                    class: h(["db-badge", B(t)])
                  }, n(t.status), 3)
                ])
              ]))), 128)),
              T.value.length ? A("", !0) : (d(), l("tr", Ce, [...s[18] || (s[18] = [
                e("td", {
                  colspan: "4",
                  class: "db-empty"
                }, "No invoices yet", -1)
              ])]))
            ])
          ]))
        ]),
        e("div", Le, [
          s[26] || (s[26] = e("div", { class: "db-panel-header" }, [
            e("span", { class: "db-panel-title" }, "Alerts")
          ], -1)),
          e("div", Me, [
            s[21] || (s[21] = e("div", { class: "db-alert-hdr" }, "Overdue Invoices", -1)),
            C.value ? (d(), l(g, { key: 0 }, M(3, (t) => e("div", {
              key: t,
              class: "db-shimmer",
              style: { margin: "8px 16px" }
            })), 64)) : (d(), l(g, { key: 1 }, [
              (d(!0), l(g, null, M(H.value.slice(0, 4), (t) => (d(), l("div", {
                key: t.name,
                class: "db-alert-row",
                onClick: s[5] || (s[5] = (x) => r("/invoices"))
              }, [
                e("div", null, [
                  e("div", we, n(t.name), 1),
                  e("div", Te, n(t.customer_name || t.customer), 1)
                ]),
                e("div", He, [
                  e("div", xe, n(k(t.outstanding_amount)), 1),
                  e("div", Ie, n(V(t.due_date)) + "d overdue", 1)
                ])
              ]))), 128)),
              H.value.length ? A("", !0) : (d(), l("div", Pe, [
                e("span", {
                  innerHTML: a(u)("check-circle", 14),
                  style: { color: "#16a34a" }
                }, null, 8, $e),
                s[20] || (s[20] = p(" No overdue invoices", -1))
              ]))
            ], 64))
          ]),
          e("div", Ne, [
            s[25] || (s[25] = e("div", { class: "db-alert-hdr" }, "Reorder Alerts", -1)),
            C.value ? (d(), l("div", Se)) : (d(), l(g, { key: 1 }, [
              L.value > 0 ? (d(), l("div", {
                key: 0,
                class: "db-alert-row",
                style: { cursor: "pointer" },
                onClick: s[6] || (s[6] = (t) => r("/inventory/reorder-alerts"))
              }, [
                e("div", null, [
                  e("div", qe, n(L.value) + " item" + n(L.value > 1 ? "s" : "") + " below reorder level", 1),
                  s[22] || (s[22] = e("div", { class: "db-alert-party" }, "Click to view", -1))
                ]),
                s[23] || (s[23] = e("span", { class: "db-badge badge-orange" }, "Action needed", -1))
              ])) : (d(), l("div", Ae, [
                e("span", {
                  innerHTML: a(u)("check-circle", 14),
                  style: { color: "#16a34a" }
                }, null, 8, Re),
                s[24] || (s[24] = p(" Stock levels are OK", -1))
              ]))
            ], 64))
          ])
        ])
      ]),
      e("div", De, [
        s[33] || (s[33] = e("div", {
          class: "db-panel-title",
          style: { "margin-bottom": "12px" }
        }, "Quick Actions", -1)),
        e("div", Oe, [
          e("button", {
            class: "db-quick-btn",
            onClick: s[7] || (s[7] = (t) => r("/invoices"))
          }, [
            e("span", {
              innerHTML: a(u)("file-plus", 16)
            }, null, 8, Ee),
            s[27] || (s[27] = p(" New Invoice", -1))
          ]),
          e("button", {
            class: "db-quick-btn",
            onClick: s[8] || (s[8] = (t) => r("/purchases"))
          }, [
            e("span", {
              innerHTML: a(u)("file-minus", 16)
            }, null, 8, Fe),
            s[28] || (s[28] = p(" New Bill", -1))
          ]),
          e("button", {
            class: "db-quick-btn",
            onClick: s[9] || (s[9] = (t) => r("/payments-received"))
          }, [
            e("span", {
              innerHTML: a(u)("dollar-sign", 16)
            }, null, 8, Be),
            s[29] || (s[29] = p(" Record Payment", -1))
          ]),
          e("button", {
            class: "db-quick-btn",
            onClick: s[10] || (s[10] = (t) => r("/quotes"))
          }, [
            e("span", {
              innerHTML: a(u)("send", 16)
            }, null, 8, Ve),
            s[30] || (s[30] = p(" New Quote", -1))
          ]),
          e("button", {
            class: "db-quick-btn",
            onClick: s[11] || (s[11] = (t) => r("/expenses"))
          }, [
            e("span", {
              innerHTML: a(u)("credit-card", 16)
            }, null, 8, Ge),
            s[31] || (s[31] = p(" Log Expense", -1))
          ]),
          e("button", {
            class: "db-quick-btn",
            onClick: s[12] || (s[12] = (t) => r("/reports"))
          }, [
            e("span", {
              innerHTML: a(u)("bar-chart-2", 16)
            }, null, 8, Ke),
            s[32] || (s[32] = p(" Run Reports", -1))
          ])
        ])
      ])
    ]));
  }
}, We = /* @__PURE__ */ Q(Qe, [["__scopeId", "data-v-078a44d7"]]);
export {
  We as default
};
