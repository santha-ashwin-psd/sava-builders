import { _ as Mt, x as Lt, z as et, y as $t, o as Et, c as d, a as s, w as c, v as q, F as k, r as h, u as v, i as T, d as y, b as m, A as f, t as i, C as nt, q as J, n as G, H as at, e as ot, l as lt, f as dt, h as p, g as D, J as it, k as l } from "./main-DU_9tUQf.js";
import { f as u, b as rt } from "./format-BcJZDVG4.js";
const Vt = { class: "tds-page" }, At = { class: "tds-topbar" }, Ht = { class: "tds-topbar-row" }, Nt = { class: "tds-controls" }, Pt = ["value"], Ut = ["disabled"], It = ["innerHTML"], Ft = ["innerHTML"], Rt = ["disabled", "title"], Bt = ["innerHTML"], qt = { class: "tds-search-wrap" }, Gt = ["innerHTML"], Ot = {
  key: 0,
  class: "tds-note"
}, zt = ["innerHTML"], jt = {
  key: 1,
  class: "tds-summary"
}, Jt = { class: "tds-sum-card" }, Yt = { class: "tds-sum-val" }, Kt = { class: "tds-sum-card" }, Zt = { class: "tds-sum-val red" }, Qt = { class: "tds-sum-card" }, Wt = { class: "tds-sum-val" }, Xt = { class: "tds-sum-card" }, ts = { class: "tds-sum-val blue" }, ss = {
  key: 2,
  class: "tds-sections"
}, es = { class: "tds-sections-grid" }, ns = { class: "tds-sec-label" }, as = { class: "tds-sec-badge" }, os = { class: "tds-sec-count" }, ls = { class: "tds-sec-amount" }, ds = { class: "tds-card" }, is = { class: "tds-table tds-desktop-table" }, rs = ["innerHTML"], us = ["innerHTML"], cs = { class: "tds-code" }, ps = { class: "mono-sm text-muted" }, ms = { class: "tds-section-badge" }, vs = { class: "ta-r mono-sm" }, ys = { class: "ta-r mono-sm text-muted" }, fs = { class: "ta-r mono-sm red" }, _s = { class: "ta-r mono-sm" }, bs = {
  key: 1,
  class: "text-muted",
  style: { "font-size": "11.5px" }
}, gs = ["disabled", "title", "onClick"], Ss = { key: 0 }, ks = { class: "tds-mobile-cards" }, ws = {
  key: 1,
  class: "tds-mc-empty"
}, hs = { class: "tds-mc-top" }, Ts = { class: "tds-mc-docno" }, Ds = { class: "tds-mc-mid" }, Cs = { class: "tds-mc-meta" }, xs = { class: "tds-mc-tds red" }, Ms = {
  key: 0,
  class: "tds-mc-footer"
}, Ls = ["disabled", "onClick"], $s = {
  key: 0,
  class: "tds-load-more-wrap"
}, Es = { class: "tds-drawer-header" }, Vs = ["innerHTML"], As = { class: "tds-drawer-body" }, Hs = { class: "tds-form-grid" }, Ns = { class: "tds-form-field" }, Ps = { class: "tds-form-field" }, Us = { class: "tds-form-field" }, Is = ["value"], Fs = { class: "tds-form-field" }, Rs = {
  class: "tds-form-field",
  style: { "grid-column": "span 2" }
}, Bs = { class: "tds-form-field" }, qs = { class: "tds-form-field" }, Gs = { class: "tds-form-field" }, Os = { class: "tds-form-field" }, zs = {
  class: "tds-form-field",
  style: { "grid-column": "span 2" }
}, js = { style: { background: "#f9fafb", border: "1px solid #e5e7eb", "border-radius": "6px", padding: "8px 12px", "font-size": "14px", "font-weight": "700", color: "#dc2626" } }, Js = {
  class: "tds-form-field",
  style: { "grid-column": "span 2" }
}, Ys = ["value"], Ks = {
  class: "tds-form-field",
  style: { "grid-column": "span 2" }
}, Zs = { class: "tds-drawer-footer" }, Qs = ["disabled", "title"], Ws = ["innerHTML"], Xs = {
  key: 1,
  class: "tds-modal"
}, te = { class: "tds-modal-header" }, se = ["innerHTML"], ee = { style: { padding: "16px 20px", display: "flex", "flex-direction": "column", gap: "12px" } }, ne = { style: { padding: "12px 20px", display: "flex", "justify-content": "flex-end", gap: "8px", "border-top": "1px solid #f3f4f6" } }, ae = ["disabled", "title"], Y = 10, oe = {
  __name: "TDS",
  setup(le) {
    const ut = { "194C": 1, "194J": 10, "194A": 10, "194H": 5, "194I": 10, 192: 0, 195: 20, Other: 10 }, { toast: w } = Lt(), _ = p([]), b = p(!1), E = p(""), L = p(""), I = p("posting_date"), V = p("desc"), O = p(!1), z = p([]), A = p([]), C = p(!1), H = p(!1), a = et({
      date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      section: "",
      party: "",
      party_name: "",
      pan: "",
      nature_of_payment: "",
      amount: 0,
      rate: 0,
      surcharge: 0,
      cess: 0,
      tds_total: 0,
      expense_account: "",
      remarks: ""
    }), x = p(!1), F = p(!1), R = p(null), M = et({ challan_no: "", challan_date: "" }), K = /* @__PURE__ */ new Date();
    function ct() {
      const n = [];
      for (let t = 0; t < 12; t++) {
        const e = new Date(K.getFullYear(), K.getMonth() - t, 1), r = `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}`, S = e.toLocaleString("en-US", { month: "long", year: "numeric" });
        n.push({ v: r, l: S });
      }
      return n;
    }
    const pt = ct();
    async function N() {
      b.value = !0, O.value = !1;
      try {
        const t = { company: await ot() };
        if (L.value) {
          const [o, j] = L.value.split("-");
          t.from_date = `${o}-${j}-01`, t.to_date = `${o}-${j}-${new Date(+o, +j, 0).getDate()}`;
        }
        const [e, r] = await Promise.all([
          lt("psd_books.db.queries.get_tds_transactions", t).catch(() => []),
          lt("psd_books.api.gst.get_tds_entries", t).catch(() => [])
        ]), S = (Array.isArray(e) ? e : []).map((o) => ({
          name: o.name,
          posting_date: o.posting_date,
          party: o.supplier_name || o.supplier || "",
          tds_section: o.tds_section || o.tax_type || "",
          gross_amount: u(o.gross_amount),
          rate: o.rate,
          tds_amount: u(o.tds_amount),
          net_payment: u(o.net_payment),
          source: "bill",
          status: "",
          entry_name: null
        })), B = (Array.isArray(r) ? r : []).map((o) => ({
          name: o.voucher_no || o.name,
          posting_date: o.date,
          party: o.party_name || o.party || "",
          tds_section: o.section || "",
          gross_amount: u(o.amount),
          rate: o.amount > 0 ? Math.round(u(o.tds_total) / u(o.amount) * 100 * 100) / 100 : 0,
          tds_amount: u(o.tds_total),
          net_payment: u(o.amount) - u(o.tds_total),
          source: "entry",
          status: o.status || "Pending",
          entry_name: o.name
        })), Ct = new Set(S.map((o) => o.name).filter(Boolean)), xt = B.filter((o) => !o.name || !Ct.has(o.name));
        _.value = [...S, ...xt], _.value.length || (O.value = !0);
      } catch (n) {
        w.error(n.message || "Failed to load TDS data");
      } finally {
        b.value = !1;
      }
    }
    async function mt() {
      try {
        const n = await dt("Account", {
          fields: ["name", "account_name"],
          filters: [["is_group", "=", 0], ["account_type", "=", "Expense"]],
          limit: 100
        });
        z.value = n || [];
      } catch {
        z.value = [];
      }
    }
    async function Z() {
      try {
        const n = await dt("Supplier", {
          fields: ["name", "supplier_name"],
          filters: [["disabled", "=", 0]],
          limit: 1e5
        });
        A.value = n || [];
      } catch {
        A.value = [];
      }
    }
    const vt = D(() => _.value.reduce((n, t) => n + u(t.tds_amount), 0)), yt = D(() => _.value.reduce((n, t) => n + u(t.gross_amount), 0)), ft = D(() => _.value.reduce((n, t) => n + u(t.net_payment), 0)), Q = D(() => {
      const n = {};
      return _.value.forEach((t) => {
        const e = t.tds_section || "Unknown";
        n[e] || (n[e] = { section: e, count: 0, amount: 0 }), n[e].count++, n[e].amount += u(t.tds_amount);
      }), Object.values(n).sort((t, e) => e.amount - t.amount);
    }), _t = D(() => {
      if (!E.value.trim()) return _.value;
      const n = E.value.toLowerCase();
      return _.value.filter(
        (t) => (t.party || "").toLowerCase().includes(n) || (t.tds_section || "").toLowerCase().includes(n)
      );
    }), $ = D(() => {
      const n = I.value;
      return [..._t.value].sort((t, e) => {
        const r = t[n] ?? "", S = e[n] ?? "", B = typeof r == "number" ? r - S : String(r).localeCompare(String(S));
        return V.value === "asc" ? B : -B;
      });
    });
    function W(n) {
      I.value === n ? V.value = V.value === "asc" ? "desc" : "asc" : (I.value = n, V.value = "asc");
    }
    function X(n) {
      return I.value !== n ? '<span style="color:#d1d5db">⇅</span>' : V.value === "asc" ? "↑" : "↓";
    }
    const P = p(Y), tt = D(() => $.value.slice(0, P.value)), bt = D(() => P.value < $.value.length);
    function gt() {
      P.value += Y;
    }
    $t([E, L], () => {
      P.value = Y;
    });
    function St() {
      Object.assign(a, {
        date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        section: "",
        party: "",
        party_name: "",
        pan: "",
        nature_of_payment: "",
        amount: 0,
        rate: 0,
        surcharge: 0,
        cess: 0,
        tds_total: 0,
        expense_account: "",
        remarks: ""
      }), A.value.length || Z(), C.value = !0;
    }
    function kt() {
      const n = A.value.find((t) => t.name === a.party);
      a.party_name = n ? n.supplier_name || n.name : a.party;
    }
    function wt() {
      a.rate = ut[a.section] ?? 0, U();
    }
    function U() {
      a.tds_total = Math.round(
        u(a.amount) * (u(a.rate) + u(a.surcharge) + u(a.cess)) / 100 * 100
      ) / 100;
    }
    async function ht() {
      if (!a.section) return w.error("TDS Section is required");
      if (!a.party.trim()) return w.error("Party name is required");
      if (!a.amount || a.amount <= 0) return w.error("Gross amount must be positive");
      H.value = !0;
      try {
        const n = await ot();
        await it("psd_books.api.gst.save_tds_entry", {
          data: JSON.stringify({ ...a, company: n })
        }), w.success("TDS Entry saved successfully"), C.value = !1, await N();
      } catch (n) {
        w.error(n.message || "Failed to save TDS entry");
      } finally {
        H.value = !1;
      }
    }
    function st(n) {
      R.value = n, Object.assign(M, { challan_no: n.challan_no || "", challan_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) }), x.value = !0;
    }
    async function Tt() {
      var n;
      if ((n = R.value) != null && n.entry_name) {
        F.value = !0;
        try {
          await it("psd_books.api.gst.update_tds_entry_status", {
            entry_name: R.value.entry_name,
            status: "Deposited",
            challan_no: M.challan_no,
            challan_date: M.challan_date
          }), w.success("TDS Entry marked as Deposited"), x.value = !1, R.value = null, await N();
        } catch (t) {
          w.error(t.message || "Failed to update status");
        } finally {
          F.value = !1;
        }
      }
    }
    function Dt() {
      const t = [
        ["Voucher / Ref", "Date", "Party", "TDS Section", "Gross Amount", "TDS Rate %", "TDS Amount", "Net Payment", "Source", "Status"],
        ...$.value.map((r) => [
          r.name,
          r.posting_date,
          r.party || "",
          r.tds_section || "",
          u(r.gross_amount),
          r.rate || "",
          u(r.tds_amount),
          u(r.net_payment),
          r.source === "entry" ? "Manual" : "Bill",
          r.status || ""
        ])
      ].map((r) => r.map((S) => `"${String(S ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), e = document.createElement("a");
      e.href = "data:text/csv;charset=utf-8," + encodeURIComponent(t), e.download = `TDS_${L.value || "all"}.csv`, e.click();
    }
    function g(n) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format(u(n));
    }
    return Et(() => {
      N(), mt(), Z();
    }), (n, t) => (l(), d("div", Vt, [
      s("div", At, [
        s("div", Ht, [
          t[27] || (t[27] = s("div", null, [
            s("div", { class: "tds-title" }, "TDS"),
            s("div", { class: "tds-subtitle" }, "Tax Deducted at Source — Purchase Invoice Deductions & Manual Entries")
          ], -1)),
          s("div", Nt, [
            c(s("select", {
              "onUpdate:modelValue": t[0] || (t[0] = (e) => L.value = e),
              class: "tds-select",
              onChange: N
            }, [
              t[24] || (t[24] = s("option", { value: "" }, "All Periods", -1)),
              (l(!0), d(k, null, h(v(pt), (e) => (l(), d("option", {
                key: e.v,
                value: e.v
              }, i(e.l), 9, Pt))), 128))
            ], 544), [
              [q, L.value]
            ]),
            s("button", {
              class: "tds-btn-ghost",
              onClick: N,
              disabled: b.value
            }, [
              s("span", {
                innerHTML: v(T)("refresh", 14)
              }, null, 8, It)
            ], 8, Ut),
            _.value.length ? (l(), d("button", {
              key: 0,
              class: "tds-btn-ghost",
              onClick: Dt
            }, [
              s("span", {
                innerHTML: v(T)("download", 13)
              }, null, 8, Ft),
              t[25] || (t[25] = y(" CSV", -1))
            ])) : m("", !0),
            s("button", {
              class: "tds-btn-primary",
              disabled: !n.$canCreate("accounts"),
              title: n.$canCreate("accounts") ? "" : "Read-only access",
              onClick: St
            }, [
              s("span", {
                innerHTML: v(T)("plus", 13)
              }, null, 8, Bt),
              t[26] || (t[26] = y(" New TDS Entry", -1))
            ], 8, Rt)
          ])
        ]),
        s("div", qt, [
          s("span", {
            innerHTML: v(T)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, Gt),
          c(s("input", {
            "onUpdate:modelValue": t[1] || (t[1] = (e) => E.value = e),
            placeholder: "Search by party or section…",
            class: "tds-search-input"
          }, null, 512), [
            [f, E.value]
          ])
        ])
      ]),
      !b.value && O.value ? (l(), d("div", Ot, [
        s("span", {
          innerHTML: v(T)("info", 14)
        }, null, 8, zt),
        t[28] || (t[28] = y(' No TDS deductions found. TDS transactions appear here when a Purchase Invoice has a tax line with "TDS", "194C", "194J" etc. in the description, or when a manual TDS Entry is created. ', -1))
      ])) : m("", !0),
      b.value ? m("", !0) : (l(), d("div", jt, [
        s("div", Jt, [
          t[29] || (t[29] = s("div", { class: "tds-sum-lbl" }, "Total Deductions", -1)),
          s("div", Yt, i(_.value.length), 1)
        ]),
        s("div", Kt, [
          t[30] || (t[30] = s("div", { class: "tds-sum-lbl" }, "Total TDS Deducted", -1)),
          s("div", Zt, i(g(vt.value)), 1)
        ]),
        s("div", Qt, [
          t[31] || (t[31] = s("div", { class: "tds-sum-lbl" }, "Gross Payment", -1)),
          s("div", Wt, i(g(yt.value)), 1)
        ]),
        s("div", Xt, [
          t[32] || (t[32] = s("div", { class: "tds-sum-lbl" }, "Net Payment", -1)),
          s("div", ts, i(g(ft.value)), 1)
        ])
      ])),
      !b.value && Q.value.length > 1 ? (l(), d("div", ss, [
        t[33] || (t[33] = s("div", { class: "tds-sections-title" }, "Section-wise Breakdown", -1)),
        s("div", es, [
          (l(!0), d(k, null, h(Q.value, (e) => (l(), d("div", {
            key: e.section,
            class: "tds-sec-card"
          }, [
            s("div", ns, [
              s("span", as, i(e.section), 1)
            ]),
            s("div", os, i(e.count) + " transaction" + i(e.count > 1 ? "s" : ""), 1),
            s("div", ls, i(g(e.amount)), 1)
          ]))), 128))
        ])
      ])) : m("", !0),
      s("div", ds, [
        s("table", is, [
          s("thead", null, [
            s("tr", null, [
              s("th", {
                onClick: t[2] || (t[2] = (e) => W("name")),
                class: "sortable"
              }, [
                t[34] || (t[34] = y("Voucher / Ref ", -1)),
                s("span", {
                  innerHTML: X("name")
                }, null, 8, rs)
              ]),
              s("th", {
                onClick: t[3] || (t[3] = (e) => W("posting_date")),
                class: "sortable"
              }, [
                t[35] || (t[35] = y("Date ", -1)),
                s("span", {
                  innerHTML: X("posting_date")
                }, null, 8, us)
              ]),
              t[36] || (t[36] = s("th", null, "Party", -1)),
              t[37] || (t[37] = s("th", null, "TDS Section", -1)),
              t[38] || (t[38] = s("th", { class: "ta-r" }, "Gross Amount", -1)),
              t[39] || (t[39] = s("th", { class: "ta-r" }, "TDS Rate %", -1)),
              t[40] || (t[40] = s("th", { class: "ta-r" }, "TDS Amount", -1)),
              t[41] || (t[41] = s("th", { class: "ta-r" }, "Net Payment", -1)),
              t[42] || (t[42] = s("th", null, "Source", -1)),
              t[43] || (t[43] = s("th", null, "Status", -1)),
              t[44] || (t[44] = s("th", null, "Action", -1))
            ])
          ]),
          s("tbody", null, [
            b.value ? (l(), d(k, { key: 0 }, h(8, (e) => s("tr", { key: e }, [...t[45] || (t[45] = [
              s("td", { colspan: "11" }, [
                s("div", { class: "tds-shimmer" })
              ], -1)
            ])])), 64)) : (l(), d(k, { key: 1 }, [
              (l(!0), d(k, null, h(tt.value, (e) => (l(), d("tr", {
                key: (e.entry_name || e.name) + (e.tds_section || ""),
                class: "tds-row"
              }, [
                s("td", null, [
                  s("span", cs, i(e.name), 1)
                ]),
                s("td", ps, i(v(rt)(e.posting_date)), 1),
                s("td", null, i(e.party || "—"), 1),
                s("td", null, [
                  s("span", ms, i(e.tds_section || "—"), 1)
                ]),
                s("td", vs, i(g(e.gross_amount)), 1),
                s("td", ys, i(e.rate ? `${e.rate}%` : "—"), 1),
                s("td", fs, i(g(e.tds_amount)), 1),
                s("td", _s, i(g(e.net_payment)), 1),
                s("td", null, [
                  s("span", {
                    class: G(["tds-source-badge", e.source === "entry" ? "tds-source-manual" : "tds-source-bill"])
                  }, i(e.source === "entry" ? "Manual" : "Bill"), 3)
                ]),
                s("td", null, [
                  e.source === "entry" ? (l(), d("span", {
                    key: 0,
                    class: G(["tds-status-badge", "tds-status-" + (e.status || "pending").toLowerCase()])
                  }, i(e.status || "Pending"), 3)) : (l(), d("span", bs, "From PI"))
                ]),
                s("td", null, [
                  e.source === "entry" && e.status !== "Deposited" && e.status !== "Filed" ? (l(), d("button", {
                    key: 0,
                    class: "tds-act-btn",
                    disabled: !n.$canEdit("accounts"),
                    title: n.$canEdit("accounts") ? "" : "Read-only access",
                    onClick: (r) => st(e)
                  }, "Mark Deposited", 8, gs)) : m("", !0)
                ])
              ]))), 128)),
              $.value.length ? m("", !0) : (l(), d("tr", Ss, [...t[46] || (t[46] = [
                s("td", {
                  colspan: "11",
                  class: "tds-empty"
                }, "No TDS transactions found", -1)
              ])]))
            ], 64))
          ])
        ]),
        s("div", ks, [
          b.value ? (l(), d(k, { key: 0 }, h(6, (e) => s("div", {
            key: e,
            class: "tds-mobile-card tds-mc--skeleton"
          }, [...t[47] || (t[47] = [
            s("div", {
              class: "tds-mc-shimmer",
              style: { height: "13px", width: "55%", "margin-bottom": "8px" }
            }, null, -1),
            s("div", {
              class: "tds-mc-shimmer",
              style: { height: "11px", width: "40%", "margin-bottom": "6px" }
            }, null, -1),
            s("div", {
              class: "tds-mc-shimmer",
              style: { height: "11px", width: "65%" }
            }, null, -1)
          ])])), 64)) : $.value.length ? (l(!0), d(k, { key: 2 }, h(tt.value, (e) => (l(), d("div", {
            key: (e.entry_name || e.name) + (e.tds_section || ""),
            class: "tds-mobile-card"
          }, [
            s("div", hs, [
              s("span", Ts, i(e.name), 1),
              s("span", {
                class: G(["tds-source-badge", e.source === "entry" ? "tds-source-manual" : "tds-source-bill"])
              }, i(e.source === "entry" ? "Manual" : "Bill"), 3)
            ]),
            s("div", Ds, i(e.party || "—"), 1),
            s("div", Cs, [
              s("span", null, i(v(rt)(e.posting_date)) + i(e.tds_section ? " · " + e.tds_section : ""), 1),
              s("span", xs, i(g(e.tds_amount)), 1)
            ]),
            e.source === "entry" && e.status !== "Deposited" && e.status !== "Filed" ? (l(), d("div", Ms, [
              s("button", {
                class: "tds-act-btn",
                disabled: !n.$canEdit("accounts"),
                onClick: J((r) => st(e), ["stop"])
              }, "Mark Deposited", 8, Ls)
            ])) : m("", !0)
          ]))), 128)) : (l(), d("div", ws, [...t[48] || (t[48] = [
            s("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "📋", -1),
            s("div", null, "No TDS transactions found", -1)
          ])]))
        ]),
        !b.value && bt.value ? (l(), d("div", $s, [
          s("button", {
            class: "tds-btn-ghost tds-load-more-btn",
            onClick: gt
          }, " Load More (" + i($.value.length - P.value) + " remaining) ", 1)
        ])) : m("", !0)
      ]),
      (l(), nt(at, { to: "body" }, [
        C.value ? (l(), d("div", {
          key: 0,
          class: "tds-drawer-bg",
          onClick: t[4] || (t[4] = J((e) => C.value = !1, ["self"]))
        })) : m("", !0),
        s("div", {
          class: G(["tds-drawer-panel", { open: C.value }])
        }, [
          s("div", Es, [
            t[49] || (t[49] = s("div", null, [
              s("div", { class: "tds-drawer-title" }, "New TDS Entry"),
              s("div", { class: "tds-drawer-sub" }, "Record a TDS deduction manually")
            ], -1)),
            s("button", {
              class: "tds-drawer-close",
              onClick: t[5] || (t[5] = (e) => C.value = !1),
              innerHTML: v(T)("x", 15)
            }, null, 8, Vs)
          ]),
          s("div", As, [
            s("div", Hs, [
              s("div", Ns, [
                t[50] || (t[50] = s("label", { class: "tds-lbl" }, [
                  y("Date "),
                  s("span", { class: "tds-req" }, "*")
                ], -1)),
                c(s("input", {
                  "onUpdate:modelValue": t[6] || (t[6] = (e) => a.date = e),
                  type: "date",
                  class: "tds-fi"
                }, null, 512), [
                  [f, a.date]
                ])
              ]),
              s("div", Ps, [
                t[52] || (t[52] = s("label", { class: "tds-lbl" }, [
                  y("TDS Section "),
                  s("span", { class: "tds-req" }, "*")
                ], -1)),
                c(s("select", {
                  "onUpdate:modelValue": t[7] || (t[7] = (e) => a.section = e),
                  class: "tds-fi",
                  onChange: wt
                }, [...t[51] || (t[51] = [
                  s("option", { value: "" }, "Select Section", -1),
                  s("option", null, "194C", -1),
                  s("option", null, "194J", -1),
                  s("option", null, "194A", -1),
                  s("option", null, "194H", -1),
                  s("option", null, "194I", -1),
                  s("option", null, "192", -1),
                  s("option", null, "195", -1),
                  s("option", null, "Other", -1)
                ])], 544), [
                  [q, a.section]
                ])
              ]),
              s("div", Us, [
                t[54] || (t[54] = s("label", { class: "tds-lbl" }, [
                  y("Party (Vendor) "),
                  s("span", { class: "tds-req" }, "*")
                ], -1)),
                c(s("select", {
                  "onUpdate:modelValue": t[8] || (t[8] = (e) => a.party = e),
                  class: "tds-fi",
                  onChange: kt
                }, [
                  t[53] || (t[53] = s("option", { value: "" }, "Select Supplier", -1)),
                  (l(!0), d(k, null, h(A.value, (e) => (l(), d("option", {
                    key: e.name,
                    value: e.name
                  }, i(e.supplier_name || e.name), 9, Is))), 128))
                ], 544), [
                  [q, a.party]
                ])
              ]),
              s("div", Fs, [
                t[55] || (t[55] = s("label", { class: "tds-lbl" }, "PAN Number", -1)),
                c(s("input", {
                  "onUpdate:modelValue": t[9] || (t[9] = (e) => a.pan = e),
                  class: "tds-fi",
                  placeholder: "ABCDE1234F",
                  onInput: t[10] || (t[10] = (e) => a.pan = a.pan.toUpperCase())
                }, null, 544), [
                  [f, a.pan]
                ])
              ]),
              s("div", Rs, [
                t[56] || (t[56] = s("label", { class: "tds-lbl" }, "Nature of Payment", -1)),
                c(s("input", {
                  "onUpdate:modelValue": t[11] || (t[11] = (e) => a.nature_of_payment = e),
                  class: "tds-fi",
                  placeholder: "e.g. Professional Services, Rent"
                }, null, 512), [
                  [f, a.nature_of_payment]
                ])
              ]),
              s("div", Bs, [
                t[57] || (t[57] = s("label", { class: "tds-lbl" }, [
                  y("Gross Amount "),
                  s("span", { class: "tds-req" }, "*")
                ], -1)),
                c(s("input", {
                  "onUpdate:modelValue": t[12] || (t[12] = (e) => a.amount = e),
                  type: "number",
                  min: "0",
                  step: "0.01",
                  class: "tds-fi",
                  onInput: U
                }, null, 544), [
                  [
                    f,
                    a.amount,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              s("div", qs, [
                t[58] || (t[58] = s("label", { class: "tds-lbl" }, "TDS Rate (%)", -1)),
                c(s("input", {
                  "onUpdate:modelValue": t[13] || (t[13] = (e) => a.rate = e),
                  type: "number",
                  min: "0",
                  max: "100",
                  step: "0.01",
                  class: "tds-fi",
                  onInput: U
                }, null, 544), [
                  [
                    f,
                    a.rate,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              s("div", Gs, [
                t[59] || (t[59] = s("label", { class: "tds-lbl" }, "Surcharge (%)", -1)),
                c(s("input", {
                  "onUpdate:modelValue": t[14] || (t[14] = (e) => a.surcharge = e),
                  type: "number",
                  min: "0",
                  step: "0.01",
                  class: "tds-fi",
                  onInput: U
                }, null, 544), [
                  [
                    f,
                    a.surcharge,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              s("div", Os, [
                t[60] || (t[60] = s("label", { class: "tds-lbl" }, "Cess (%)", -1)),
                c(s("input", {
                  "onUpdate:modelValue": t[15] || (t[15] = (e) => a.cess = e),
                  type: "number",
                  min: "0",
                  step: "0.01",
                  class: "tds-fi",
                  onInput: U
                }, null, 544), [
                  [
                    f,
                    a.cess,
                    void 0,
                    { number: !0 }
                  ]
                ])
              ]),
              s("div", zs, [
                t[61] || (t[61] = s("label", { class: "tds-lbl" }, "TDS Amount (auto-calculated)", -1)),
                s("div", js, i(g(a.tds_total)), 1)
              ]),
              s("div", Js, [
                t[63] || (t[63] = s("label", { class: "tds-lbl" }, [
                  y("Expense Account "),
                  s("span", { style: { color: "#9ca3af", "font-weight": "400" } }, "(optional — posts GL on save)")
                ], -1)),
                c(s("select", {
                  "onUpdate:modelValue": t[16] || (t[16] = (e) => a.expense_account = e),
                  class: "tds-fi"
                }, [
                  t[62] || (t[62] = s("option", { value: "" }, "— No GL posting —", -1)),
                  (l(!0), d(k, null, h(z.value, (e) => (l(), d("option", {
                    key: e.name,
                    value: e.name
                  }, i(e.account_name || e.name), 9, Ys))), 128))
                ], 512), [
                  [q, a.expense_account]
                ])
              ]),
              s("div", Ks, [
                t[64] || (t[64] = s("label", { class: "tds-lbl" }, "Remarks", -1)),
                c(s("textarea", {
                  "onUpdate:modelValue": t[17] || (t[17] = (e) => a.remarks = e),
                  class: "tds-fi",
                  rows: "2",
                  placeholder: "Internal notes…"
                }, null, 512), [
                  [f, a.remarks]
                ])
              ])
            ])
          ]),
          s("div", Zs, [
            s("button", {
              class: "tds-btn-ghost",
              onClick: t[18] || (t[18] = (e) => C.value = !1)
            }, "Cancel"),
            s("button", {
              class: "tds-btn-primary",
              disabled: H.value || !n.$canCreate("accounts"),
              title: n.$canCreate("accounts") ? "" : "Read-only access",
              onClick: ht
            }, [
              H.value ? (l(), d("span", {
                key: 0,
                innerHTML: v(T)("refresh", 13),
                style: { animation: "spin 1s linear infinite" }
              }, null, 8, Ws)) : m("", !0),
              y(" " + i(H.value ? "Saving…" : "Save TDS Entry"), 1)
            ], 8, Qs)
          ])
        ], 2)
      ])),
      (l(), nt(at, { to: "body" }, [
        x.value ? (l(), d("div", {
          key: 0,
          class: "tds-drawer-bg",
          onClick: t[19] || (t[19] = J((e) => x.value = !1, ["self"]))
        })) : m("", !0),
        x.value ? (l(), d("div", Xs, [
          s("div", te, [
            t[65] || (t[65] = s("span", { style: { "font-size": "14px", "font-weight": "700", color: "#111827" } }, "Mark TDS as Deposited", -1)),
            s("button", {
              class: "tds-drawer-close",
              onClick: t[20] || (t[20] = (e) => x.value = !1),
              innerHTML: v(T)("x", 14)
            }, null, 8, se)
          ]),
          s("div", ee, [
            s("div", null, [
              t[66] || (t[66] = s("label", { class: "tds-lbl" }, "Challan Number", -1)),
              c(s("input", {
                "onUpdate:modelValue": t[21] || (t[21] = (e) => M.challan_no = e),
                class: "tds-fi",
                placeholder: "Challan reference number"
              }, null, 512), [
                [f, M.challan_no]
              ])
            ]),
            s("div", null, [
              t[67] || (t[67] = s("label", { class: "tds-lbl" }, "Challan Date", -1)),
              c(s("input", {
                "onUpdate:modelValue": t[22] || (t[22] = (e) => M.challan_date = e),
                type: "date",
                class: "tds-fi"
              }, null, 512), [
                [f, M.challan_date]
              ])
            ])
          ]),
          s("div", ne, [
            s("button", {
              class: "tds-btn-ghost",
              onClick: t[23] || (t[23] = (e) => x.value = !1)
            }, "Cancel"),
            s("button", {
              class: "tds-btn-primary",
              disabled: F.value || !n.$canEdit("accounts"),
              title: n.$canEdit("accounts") ? "" : "Read-only access",
              onClick: Tt
            }, i(F.value ? "Saving…" : "Mark Deposited"), 9, ae)
          ])
        ])) : m("", !0)
      ]))
    ]));
  }
}, re = /* @__PURE__ */ Mt(oe, [["__scopeId", "data-v-f0828bed"]]);
export {
  re as default
};
