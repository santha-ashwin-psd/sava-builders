import { _ as ve, x as _e, h as f, z as se, o as he, c, a, u as r, i as M, w as B, A as P, v as ge, F as y, r as S, d as U, C as fe, b as u, t as o, D as G, a4 as oe, e as ye, f as ke, S as we, l as le, g as D, k as l, n as J, q as T, p as ce, J as ie } from "./main-B333i53I.js";
import { f as _, b as E } from "./format-BcJZDVG4.js";
import { S as Ce } from "./SummaryStrip-uwM0R0p2.js";
import { P as Se } from "./Pagination-DSWYlDyQ.js";
import { u as xe } from "./usePagination-CUk-A26a.js";
import { D as re } from "./DocLink-CfQzTPNs.js";
const Re = { class: "br-page" }, Me = { class: "br-actions" }, $e = { style: { display: "flex", gap: "10px", "align-items": "center", "flex-wrap": "wrap" } }, Le = { class: "br-search-wrap" }, Be = ["innerHTML"], Ue = ["value"], De = ["disabled"], Te = ["innerHTML"], Ee = {
  key: 1,
  class: "br-toolbar"
}, ze = { class: "br-filter-pills" }, Fe = ["onClick"], He = { class: "br-fpill-count" }, Ne = {
  class: "br-toolbar-right",
  style: { "margin-left": "auto" }
}, Ve = ["disabled"], Ae = ["innerHTML"], Pe = {
  key: 2,
  class: "br-reconcile-bar"
}, Oe = { class: "br-rb-count" }, je = ["innerHTML"], Ie = ["disabled", "title"], qe = ["innerHTML"], We = {
  key: 1,
  class: "br-rb-note"
}, Ye = {
  key: 3,
  class: "br-section-title"
}, Ke = {
  key: 4,
  class: "br-card"
}, Ge = { class: "br-table br-table--desktop" }, Je = { style: { width: "32px" } }, Qe = ["checked"], Xe = { class: "br-row" }, Ze = ["checked", "onChange"], et = { class: "mono-sm" }, tt = { class: "br-description" }, at = { class: "mono-sm text-muted" }, nt = { class: "ta-r mono-sm green" }, st = { class: "ta-r mono-sm red" }, ot = ["onClick", "disabled"], lt = {
  key: 0,
  class: "br-suggest-row"
}, ct = {
  colspan: "8",
  style: { padding: "0" }
}, it = { class: "br-suggest-panel" }, rt = { style: { "font-size": "12px", "font-weight": "600", color: "#1e40af", "margin-bottom": "8px" } }, dt = {
  key: 0,
  style: { "font-size": "12.5px", color: "#6b7280", padding: "8px" }
}, ut = { class: "br-suggest-meta" }, mt = { class: "br-suggest-info" }, bt = { class: "br-suggest-amt" }, pt = ["onClick", "disabled", "title"], vt = ["onClick"], _t = { key: 0 }, ht = {
  colspan: "8",
  class: "br-empty"
}, gt = { class: "br-cards--mobile" }, ft = { key: 0 }, yt = { class: "br-card-header" }, kt = ["checked", "onChange"], wt = { class: "br-card-date mono-sm" }, Ct = ["title"], St = {
  key: 0,
  class: "br-card-ref mono-sm"
}, xt = { class: "br-card-amounts" }, Rt = {
  key: 0,
  class: "br-card-amt-item"
}, Mt = { class: "br-card-amt-val green" }, $t = {
  key: 1,
  class: "br-card-amt-item"
}, Lt = { class: "br-card-amt-val red" }, Bt = {
  key: 1,
  class: "br-card-actions"
}, Ut = ["onClick", "disabled"], Dt = {
  key: 2,
  class: "br-suggest-panel",
  style: { "margin-top": "10px" }
}, Tt = { style: { "font-size": "12px", "font-weight": "600", color: "#1e40af", "margin-bottom": "8px" } }, Et = {
  key: 0,
  style: { "font-size": "12.5px", color: "#6b7280", padding: "8px" }
}, zt = { class: "br-suggest-meta" }, Ft = { class: "br-suggest-info" }, Ht = { class: "br-suggest-amt" }, Nt = ["onClick", "disabled", "title"], Vt = ["onClick"], At = {
  key: 2,
  class: "br-empty",
  style: { padding: "32px 16px", "text-align": "center" }
}, Pt = {
  key: 5,
  style: { padding: "4px 0 0" }
}, Ot = {
  key: 6,
  class: "br-placeholder"
}, jt = ["innerHTML"], It = {
  __name: "BankReconciliation",
  setup(qt) {
    const { toast: x } = _e(), Q = we(), $ = f([]), k = f([]), R = f(!1), w = f(!1), z = f(0), m = f(/* @__PURE__ */ new Set()), F = f(""), H = f("all"), N = f((/* @__PURE__ */ new Date()).toISOString().slice(0, 10)), V = f(!1), O = /* @__PURE__ */ new Date(), de = new Date(O.getFullYear(), O.getMonth(), 1).toISOString().slice(0, 10), d = se({ bank_account: "", from_date: de, to_date: O.toISOString().slice(0, 10) });
    async function ue() {
      try {
        const n = await ye();
        $.value = await ke("Bank Account", { fields: ["name", "account_name", "is_default"], filters: [["company", "=", n]], order: "is_default desc, account_name asc", limit: 50 });
      } catch {
      }
    }
    async function A() {
      if (d.bank_account) {
        R.value = !0, w.value = !0, z.value = 0, m.value = /* @__PURE__ */ new Set();
        try {
          const n = await le("psd_books.api.docs.get_bank_reconciliation", {
            bank_account: d.bank_account,
            from_date: d.from_date,
            to_date: d.to_date
          });
          k.value = ((n == null ? void 0 : n.bank_transactions) || []).map((t) => ({
            ...t,
            deposit: _(t.credit || 0),
            withdrawal: _(t.debit || 0)
          })), z.value = _((n == null ? void 0 : n.gl_balance) || 0);
        } catch (n) {
          x.error(n.message || "Failed to load");
        } finally {
          R.value = !1;
        }
      }
    }
    const C = D(() => {
      const n = k.value.reduce((v, L) => v + _(L.deposit), 0), t = k.value.reduce((v, L) => v + _(L.withdrawal), 0), e = n - t, s = k.value.filter((v) => v.status !== "Reconciled").length;
      return { statementBalance: e, systemBalance: z.value, diff: z.value - e, unmatched: s };
    });
    function h(n) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 2 }).format(_(n));
    }
    const me = D(() => {
      const n = k.value.filter((t) => t.status === "Reconciled").length;
      return [
        { key: "all", label: "All", count: k.value.length },
        { key: "Unreconciled", label: "Unreconciled", count: k.value.length - n },
        { key: "Reconciled", label: "Reconciled", count: n }
      ];
    }), g = D(() => {
      let n = k.value;
      if (H.value === "Reconciled" ? n = n.filter((t) => t.status === "Reconciled") : H.value === "Unreconciled" && (n = n.filter((t) => t.status !== "Reconciled")), F.value.trim()) {
        const t = F.value.toLowerCase();
        n = n.filter((e) => (e.description || "").toLowerCase().includes(t) || (e.reference_number || "").toLowerCase().includes(t));
      }
      return n;
    }), { page: j, pageSize: I, paged: q } = xe(g, { storageKey: "bank-reconciliation" }), W = D(() => g.value.filter((n) => n.status !== "Reconciled" && m.value.has(n.name)));
    function X(n) {
      const t = new Set(m.value);
      t.has(n) ? t.delete(n) : t.add(n), m.value = t;
    }
    const Z = D(() => g.value.length > 0 && g.value.every((n) => m.value.has(n.name)));
    function be() {
      Z.value ? m.value = /* @__PURE__ */ new Set() : m.value = new Set(g.value.map((n) => n.name));
    }
    function ee() {
      var ne;
      const n = m.value.size ? g.value.filter((b) => m.value.has(b.name)) : g.value;
      if (!n.length) return;
      const t = (b) => {
        const K = b == null ? "" : String(b);
        return /[",\n]/.test(K) ? '"' + K.replace(/"/g, '""') + '"' : K;
      }, e = [["Date", "Description", "Reference", "Deposit", "Withdrawal", "Status"].join(",")];
      for (const b of n)
        e.push([E(b.date), b.description || "", b.reference_number || "", _(b.deposit) || 0, _(b.withdrawal) || 0, b.status || "Unreconciled"].map(t).join(","));
      const s = new Blob(["\uFEFF" + e.join(`\r
`)], { type: "text/csv;charset=utf-8;" }), v = URL.createObjectURL(s), L = ((ne = $.value.find((b) => b.name === d.bank_account)) == null ? void 0 : ne.account_name) || d.bank_account || "reconciliation", Y = document.createElement("a");
      Y.href = v, Y.download = `reconciliation_${L}_${d.from_date}_to_${d.to_date}.csv`.replace(/\s+/g, "_"), Y.click(), URL.revokeObjectURL(v), x.success(`Exported ${n.length} row(s)`);
    }
    async function pe() {
      const n = W.value.map((e) => e.name);
      if (!n.length || !N.value) return;
      V.value = !0;
      let t = 0;
      try {
        for (const e of n)
          try {
            await ie("psd_books.api.docs.reconcile_bank_transaction", { bank_transaction_name: e }, { module: "banking", action: "edit" }), t++;
          } catch {
          }
        x.success(`${t} transaction(s) marked as reconciled`), await A();
      } catch (e) {
        x.error(e.message || "Failed to reconcile transactions");
      } finally {
        V.value = !1;
      }
    }
    const i = se({}), p = f("");
    async function te(n) {
      if (i[n.name]) {
        i[n.name] = null;
        return;
      }
      p.value = n.name;
      try {
        i[n.name] = await le(
          "psd_books.api.docs.suggest_payment_matches",
          { bank_transaction_name: n.name }
        );
      } catch (t) {
        x.error(t.message || "Failed to suggest matches");
      }
      p.value = "";
    }
    async function ae(n, t) {
      p.value = t.name;
      try {
        await ie(
          "psd_books.api.docs.reconcile_bank_transaction",
          { bank_transaction_name: n.name, payment_entry_name: t.name },
          { module: "banking", action: "edit" }
        ), x.success(`${n.name} matched to ${t.name}`), i[n.name] = null, await A();
      } catch (e) {
        x.error(e.message || "Match failed");
      }
      p.value = "";
    }
    return he(async () => {
      var e, s;
      await ue();
      const n = Q.query.account ? String(Q.query.account) : "", t = (e = $.value.find((v) => v.is_default)) == null ? void 0 : e.name;
      d.bank_account = n || t || ((s = $.value[0]) == null ? void 0 : s.name) || "", d.bank_account && await A();
    }), (n, t) => (l(), c("div", Re, [
      a("div", Me, [
        a("div", $e, [
          a("div", Le, [
            a("span", {
              innerHTML: r(M)("search", 13),
              style: { color: "#94a3b8", "flex-shrink": "0" }
            }, null, 8, Be),
            B(a("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (e) => F.value = e),
              placeholder: "Search statement…",
              class: "br-search-input"
            }, null, 512), [
              [P, F.value]
            ])
          ]),
          B(a("select", {
            "onUpdate:modelValue": t[1] || (t[1] = (e) => d.bank_account = e),
            class: "br-select",
            style: { "min-width": "220px" }
          }, [
            t[11] || (t[11] = a("option", { value: "" }, "— Select Bank Account —", -1)),
            (l(!0), c(y, null, S($.value, (e) => (l(), c("option", {
              key: e.name,
              value: e.name
            }, o(e.account_name || e.name), 9, Ue))), 128))
          ], 512), [
            [ge, d.bank_account]
          ]),
          B(a("input", {
            "onUpdate:modelValue": t[2] || (t[2] = (e) => d.from_date = e),
            type: "date",
            class: "br-input"
          }, null, 512), [
            [P, d.from_date]
          ]),
          B(a("input", {
            "onUpdate:modelValue": t[3] || (t[3] = (e) => d.to_date = e),
            type: "date",
            class: "br-input"
          }, null, 512), [
            [P, d.to_date]
          ]),
          a("button", {
            class: "br-btn-primary",
            onClick: A,
            disabled: !d.bank_account
          }, [
            a("span", {
              innerHTML: r(M)("refresh", 13)
            }, null, 8, Te),
            t[12] || (t[12] = U(" Run ", -1))
          ], 8, De)
        ])
      ]),
      !R.value && w.value ? (l(), fe(Ce, {
        key: 0,
        cards: [
          { label: "Bank Statement Amount", tone: "accent", value: h(C.value.statementBalance) },
          { label: "ERP Book Balance", tone: "default", value: h(C.value.systemBalance) },
          { label: "Variance", tone: Math.abs(C.value.diff) < 0.01 ? "success" : "danger", value: h(C.value.diff), valueClass: Math.abs(C.value.diff) < 0.01 ? "green" : "red" },
          { label: "Unmatched", tone: C.value.unmatched > 0 ? "warn" : "default", value: C.value.unmatched, valueClass: C.value.unmatched > 0 ? "orange" : "" }
        ]
      }, null, 8, ["cards"])) : u("", !0),
      w.value && !R.value ? (l(), c("div", Ee, [
        a("div", ze, [
          (l(!0), c(y, null, S(me.value, (e) => (l(), c("button", {
            key: e.key,
            class: J(["br-fpill", { active: H.value === e.key }]),
            onClick: (s) => H.value = e.key
          }, [
            U(o(e.label) + " ", 1),
            a("span", He, o(e.count), 1)
          ], 10, Fe))), 128))
        ]),
        a("div", Ne, [
          a("button", {
            class: "br-btn-ghost",
            onClick: ee,
            disabled: !g.value.length
          }, [
            a("span", {
              innerHTML: r(M)("download", 14)
            }, null, 8, Ae),
            t[13] || (t[13] = U(" Export ", -1))
          ], 8, Ve)
        ])
      ])) : u("", !0),
      w.value && m.value.size > 0 ? (l(), c("div", Pe, [
        a("span", Oe, o(m.value.size) + " selected", 1),
        a("button", {
          class: "br-rb-export",
          onClick: ee
        }, [
          a("span", {
            innerHTML: r(M)("download", 13)
          }, null, 8, je),
          t[14] || (t[14] = U(" Export selected", -1))
        ]),
        t[16] || (t[16] = a("div", { class: "br-rb-spacer" }, null, -1)),
        W.value.length ? (l(), c(y, { key: 0 }, [
          t[15] || (t[15] = a("label", { style: { "font-size": "13px", color: "#374151" } }, "Clearance Date", -1)),
          B(a("input", {
            "onUpdate:modelValue": t[4] || (t[4] = (e) => N.value = e),
            type: "date",
            class: "br-input",
            style: { width: "150px" }
          }, null, 512), [
            [P, N.value]
          ]),
          a("button", {
            class: "br-btn-primary",
            disabled: V.value || !N.value || !n.$canEdit("banking"),
            title: n.$canEdit("banking") ? "" : "Read-only access",
            onClick: pe
          }, [
            a("span", {
              innerHTML: r(M)("check", 13)
            }, null, 8, qe),
            U(" " + o(V.value ? "Saving…" : `Mark ${W.value.length} Reconciled`), 1)
          ], 8, Ie)
        ], 64)) : (l(), c("span", We, "All selected rows are already reconciled")),
        a("button", {
          class: "br-rb-clear",
          onClick: t[5] || (t[5] = (e) => m.value = /* @__PURE__ */ new Set())
        }, "Clear")
      ])) : u("", !0),
      w.value ? (l(), c("div", Ye, "Bank Transactions (Statement)")) : u("", !0),
      w.value ? (l(), c("div", Ke, [
        a("table", Ge, [
          a("thead", null, [
            a("tr", null, [
              a("th", Je, [
                a("input", {
                  type: "checkbox",
                  checked: Z.value,
                  onChange: be
                }, null, 40, Qe)
              ]),
              t[17] || (t[17] = a("th", null, "Date", -1)),
              t[18] || (t[18] = a("th", null, "Description", -1)),
              t[19] || (t[19] = a("th", null, "Reference", -1)),
              t[20] || (t[20] = a("th", { class: "ta-r" }, "Deposit", -1)),
              t[21] || (t[21] = a("th", { class: "ta-r" }, "Withdrawal", -1)),
              t[22] || (t[22] = a("th", null, "Status", -1)),
              t[23] || (t[23] = a("th", { style: { width: "130px" } }, "Match", -1))
            ])
          ]),
          a("tbody", null, [
            R.value ? (l(), c(y, { key: 0 }, S(5, (e) => a("tr", { key: e }, [...t[24] || (t[24] = [
              a("td", { colspan: "8" }, [
                a("div", { class: "br-shimmer" })
              ], -1)
            ])])), 64)) : (l(), c(y, { key: 1 }, [
              (l(!0), c(y, null, S(r(q), (e) => (l(), c(y, {
                key: e.name
              }, [
                a("tr", Xe, [
                  a("td", {
                    onClick: t[6] || (t[6] = T(() => {
                    }, ["stop"]))
                  }, [
                    a("input", {
                      type: "checkbox",
                      checked: m.value.has(e.name),
                      onChange: (s) => X(e.name)
                    }, null, 40, Ze)
                  ]),
                  a("td", et, o(r(E)(e.date)), 1),
                  a("td", tt, o(e.description || "—"), 1),
                  a("td", at, o(e.reference_number || "—"), 1),
                  a("td", nt, o(r(_)(e.deposit) > 0 ? h(e.deposit) : "—"), 1),
                  a("td", st, o(r(_)(e.withdrawal) > 0 ? h(e.withdrawal) : "—"), 1),
                  a("td", null, [
                    a("span", {
                      class: J(["br-badge", e.status === "Reconciled" ? "badge-green" : "badge-orange"])
                    }, o(e.status || "Unreconciled"), 3)
                  ]),
                  a("td", null, [
                    e.status !== "Reconciled" ? (l(), c("button", {
                      key: 0,
                      class: "br-match-btn",
                      onClick: T((s) => te(e), ["stop"]),
                      disabled: p.value === e.name
                    }, o(p.value === e.name ? "…" : "🔍 Suggest"), 9, ot)) : u("", !0)
                  ])
                ]),
                i[e.name] ? (l(), c("tr", lt, [
                  a("td", ct, [
                    a("div", it, [
                      a("div", rt, " 🤖 " + o(i[e.name].matches.length) + " candidate payment" + o(i[e.name].matches.length === 1 ? "" : "s") + " for " + o(h(i[e.name].bt_amount)) + " (" + o(i[e.name].bt_direction === "in" ? "received" : "paid out") + ") ", 1),
                      i[e.name].matches.length ? u("", !0) : (l(), c("div", dt, "No Payment Entries matched on amount + date. You can mark this row Reconciled manually if you reviewed it.")),
                      (l(!0), c(y, null, S(i[e.name].matches, (s) => (l(), c("div", {
                        key: s.name,
                        class: "br-suggest-card"
                      }, [
                        a("div", ut, [
                          a("span", {
                            class: "br-num",
                            onClick: t[7] || (t[7] = T(() => {
                            }, ["stop"]))
                          }, [
                            G(re, {
                              doctype: "Payment Entry",
                              name: s.name
                            }, null, 8, ["name"])
                          ]),
                          a("span", {
                            class: "br-score",
                            style: ce(`background:${s.score >= 80 ? "#dcfce7" : s.score >= 50 ? "#fef3c7" : "#fee2e2"};color:${s.score >= 80 ? "#16a34a" : s.score >= 50 ? "#d97706" : "#dc2626"}`)
                          }, o(s.score.toFixed(0)) + "% confidence", 5)
                        ]),
                        a("div", mt, [
                          a("span", null, o(s.party_name || s.party) + " · " + o(r(E)(s.payment_date)) + " · " + o(s.mode_of_payment || "—"), 1)
                        ]),
                        a("div", bt, o(h(s.paid_amount)), 1),
                        a("button", {
                          class: "br-match-confirm",
                          onClick: (v) => ae(e, s),
                          disabled: p.value === s.name || !n.$canEdit("banking"),
                          title: n.$canEdit("banking") ? "" : "Read-only access"
                        }, o(p.value === s.name ? "…" : "✓ Match"), 9, pt)
                      ]))), 128)),
                      a("button", {
                        class: "br-suggest-close",
                        onClick: (s) => i[e.name] = null
                      }, "close", 8, vt)
                    ])
                  ])
                ])) : u("", !0)
              ], 64))), 128)),
              g.value.length ? u("", !0) : (l(), c("tr", _t, [
                a("td", ht, o(k.value.length ? "No transactions match this filter" : "No transactions in this period"), 1)
              ]))
            ], 64))
          ])
        ]),
        a("div", gt, [
          R.value ? (l(), c("div", ft, [
            (l(), c(y, null, S(4, (e) => a("div", {
              key: e,
              class: "br-card-shimmer"
            })), 64))
          ])) : r(q).length ? (l(!0), c(y, { key: 1 }, S(r(q), (e) => (l(), c("div", {
            key: e.name,
            class: "br-card"
          }, [
            a("div", yt, [
              a("input", {
                type: "checkbox",
                checked: m.value.has(e.name),
                onChange: (s) => X(e.name),
                class: "br-card-chk"
              }, null, 40, kt),
              a("span", wt, o(r(E)(e.date)), 1),
              a("span", {
                class: J(["br-badge", e.status === "Reconciled" ? "badge-green" : "badge-orange"])
              }, o(e.status || "Unreconciled"), 3)
            ]),
            a("td", {
              class: "br-description",
              title: e.description
            }, o(e.description || "—"), 9, Ct),
            e.reference_number ? (l(), c("div", St, "Ref: " + o(e.reference_number), 1)) : u("", !0),
            a("div", xt, [
              r(_)(e.deposit) > 0 ? (l(), c("div", Rt, [
                t[25] || (t[25] = a("span", { class: "br-card-amt-lbl" }, "Deposit", -1)),
                a("span", Mt, o(h(e.deposit)), 1)
              ])) : u("", !0),
              r(_)(e.withdrawal) > 0 ? (l(), c("div", $t, [
                t[26] || (t[26] = a("span", { class: "br-card-amt-lbl" }, "Withdrawal", -1)),
                a("span", Lt, o(h(e.withdrawal)), 1)
              ])) : u("", !0)
            ]),
            e.status !== "Reconciled" ? (l(), c("div", Bt, [
              a("button", {
                class: "br-match-btn",
                onClick: T((s) => te(e), ["stop"]),
                disabled: p.value === e.name
              }, o(p.value === e.name ? "…" : "🔍 Suggest Match"), 9, Ut)
            ])) : u("", !0),
            i[e.name] ? (l(), c("div", Dt, [
              a("div", Tt, " 🤖 " + o(i[e.name].matches.length) + " candidate payment" + o(i[e.name].matches.length === 1 ? "" : "s") + " for " + o(h(i[e.name].bt_amount)) + " (" + o(i[e.name].bt_direction === "in" ? "received" : "paid out") + ") ", 1),
              i[e.name].matches.length ? u("", !0) : (l(), c("div", Et, "No Payment Entries matched on amount + date. You can mark this row Reconciled manually if you reviewed it.")),
              (l(!0), c(y, null, S(i[e.name].matches, (s) => (l(), c("div", {
                key: s.name,
                class: "br-suggest-card"
              }, [
                a("div", zt, [
                  a("span", {
                    class: "br-num",
                    onClick: t[8] || (t[8] = T(() => {
                    }, ["stop"]))
                  }, [
                    G(re, {
                      doctype: "Payment Entry",
                      name: s.name
                    }, null, 8, ["name"])
                  ]),
                  a("span", {
                    class: "br-score",
                    style: ce(`background:${s.score >= 80 ? "#dcfce7" : s.score >= 50 ? "#fef3c7" : "#fee2e2"};color:${s.score >= 80 ? "#16a34a" : s.score >= 50 ? "#d97706" : "#dc2626"}`)
                  }, o(s.score.toFixed(0)) + "% confidence", 5)
                ]),
                a("div", Ft, [
                  a("span", null, o(s.party_name || s.party) + " · " + o(r(E)(s.payment_date)) + " · " + o(s.mode_of_payment || "—"), 1)
                ]),
                a("div", Ht, o(h(s.paid_amount)), 1),
                a("button", {
                  class: "br-match-confirm",
                  onClick: (v) => ae(e, s),
                  disabled: p.value === s.name || !n.$canEdit("banking"),
                  title: n.$canEdit("banking") ? "" : "Read-only access"
                }, o(p.value === s.name ? "…" : "✓ Match"), 9, Nt)
              ]))), 128)),
              a("button", {
                class: "br-suggest-close",
                onClick: (s) => i[e.name] = null
              }, "close", 8, Vt)
            ])) : u("", !0)
          ]))), 128)) : (l(), c("div", At, o(k.value.length ? "No transactions match this filter" : "No transactions in this period"), 1))
        ])
      ])) : u("", !0),
      w.value && !R.value && g.value.length ? (l(), c("div", Pt, [
        G(Se, {
          page: r(j),
          "onUpdate:page": t[9] || (t[9] = (e) => oe(j) ? j.value = e : null),
          "page-size": r(I),
          "onUpdate:pageSize": t[10] || (t[10] = (e) => oe(I) ? I.value = e : null),
          "total-items": g.value.length
        }, null, 8, ["page", "page-size", "total-items"])
      ])) : u("", !0),
      w.value ? u("", !0) : (l(), c("div", Ot, [
        a("span", {
          innerHTML: r(M)("balance", 40),
          style: { color: "#d1d5db", display: "block", margin: "0 auto 16px" }
        }, null, 8, jt),
        t[27] || (t[27] = a("div", { style: { "font-weight": "600", color: "#374151", "margin-bottom": "6px" } }, "Bank Reconciliation", -1)),
        t[28] || (t[28] = a("div", { style: { color: "#9ca3af", "font-size": "13px" } }, "Select a bank account and date range, then click Run to view the reconciliation statement.", -1))
      ]))
    ]));
  }
}, Xt = /* @__PURE__ */ ve(It, [["__scopeId", "data-v-618f26dd"]]);
export {
  Xt as default
};
