import { _ as ee, x as te, h as w, o as se, c as i, a as t, d as E, F as m, r as T, w as oe, A as ne, u as M, i as B, b, n as g, t as d, D as ae, E as ie, C as le, q as H, H as re, e as V, l as de, g as I, Y as ce, K as ue, L as pe, z as J, R as be, k as a, p as O } from "./main-BQ2g2zvG.js";
const fe = { class: "b-page" }, ge = {
  class: "b-card ob-desktop-stepper",
  style: { padding: "14px 18px", display: "flex", "align-items": "center" }
}, ve = { style: { display: "flex", "align-items": "center" } }, ye = ["innerHTML"], me = { key: 1 }, xe = { class: "ob-mobile-stepper" }, he = { class: "ob-ms-dots" }, _e = { class: "ob-ms-dot-wrap" }, ke = ["innerHTML"], Ee = { key: 1 }, we = { class: "ob-ms-labels" }, Ce = {
  class: "ob-go-live-bar",
  style: { display: "flex", "align-items": "center", "justify-content": "space-between", gap: "12px", "flex-wrap": "wrap" }
}, qe = { style: { display: "flex", "align-items": "center", gap: "8px", "flex-wrap": "wrap" } }, Fe = ["disabled"], Ae = { style: { display: "flex", gap: "8px", "align-items": "center" } }, Se = {
  key: 0,
  style: { display: "inline-flex", "align-items": "center", gap: "6px", background: "#EBFBEE", color: "#2F9E44", border: "1px solid rgba(47,158,68,.2)", "border-radius": "8px", padding: "6px 14px", "font-size": "13px", "font-weight": "600" }
}, ze = ["innerHTML"], Te = ["disabled", "title"], De = ["disabled", "title"], Le = ["innerHTML"], Me = {
  key: 0,
  class: "b-card",
  style: { padding: "40px", "text-align": "center", color: "#868E96" }
}, Be = {
  key: 1,
  class: "b-card ob-eq-card",
  style: { padding: "16px 20px" }
}, Oe = {
  class: "ob-eq-strip",
  style: { display: "flex", "align-items": "center", "flex-wrap": "wrap", gap: "0" }
}, Ne = {
  class: "ob-eq-cell",
  style: { flex: "1", padding: "12px 16px", "border-radius": "8px", "text-align": "center", background: "#E0F7FA" }
}, Ie = {
  class: "ob-eq-val",
  style: { "font-size": "18px", "font-weight": "700", color: "#0C8599" }
}, $e = {
  class: "ob-eq-cell",
  style: { flex: "1", padding: "12px 16px", "border-radius": "8px", "text-align": "center", background: "#FFE3E3" }
}, je = {
  class: "ob-eq-val",
  style: { "font-size": "18px", "font-weight": "700", color: "#C92A2A" }
}, Re = {
  class: "ob-eq-cell",
  style: { flex: "1", padding: "12px 16px", "border-radius": "8px", "text-align": "center", background: "#F3F0FF" }
}, Ye = {
  class: "ob-eq-val",
  style: { "font-size": "18px", "font-weight": "700", color: "#2563eb" }
}, He = { key: 0 }, Ve = { key: 1 }, Je = { key: 2 }, Ge = {
  key: 0,
  class: "b-card",
  style: { padding: "0", overflow: "hidden" }
}, Ke = ["onClick"], Pe = { style: { display: "flex", "align-items": "center", gap: "10px" } }, Ue = { style: { "font-size": "13px", color: "#868E96" } }, We = { style: { display: "flex", "align-items": "center", gap: "12px" } }, Qe = { style: { "font-size": "13px", color: "#1A1D23" } }, Xe = {
  key: 0,
  style: { "font-size": "11px", color: "#868E96" }
}, Ze = ["value", "disabled", "onInput"], et = ["disabled", "onChange"], tt = ["selected"], st = ["selected"], ot = {
  class: "ob-sec-footer",
  style: { display: "grid", "grid-template-columns": "1fr 130px 130px", gap: "10px", padding: "10px 16px", background: "#F8F9FC", "border-top": "1px solid #E2E8F0" }
}, nt = { style: { "font-size": "12px", "font-weight": "600", color: "#868E96" } }, at = {
  key: 0,
  class: "b-card",
  style: { padding: "40px", "text-align": "center", color: "#868E96" }
}, it = { style: { background: "#fff", "border-radius": "12px", padding: "28px 32px", "max-width": "500px", width: "100%" } }, lt = { key: 0 }, rt = { key: 1 }, dt = { style: { display: "flex", gap: "10px", "justify-content": "flex-end" } }, ct = ["disabled"], ut = { style: { background: "#fff", "border-radius": "12px", padding: "28px 32px", "max-width": "420px", width: "100%" } }, pt = { style: { display: "flex", gap: "10px", "justify-content": "flex-end" } }, bt = {
  __name: "OpeningBalances",
  setup(ft) {
    const { toast: _ } = te(), { canCreate: $ } = be(), x = {
      Asset: { color: "#0C8599", bg: "#E0F7FA", label: "Assets", balType: "Debit" },
      Liability: { color: "#C92A2A", bg: "#FFE3E3", label: "Liabilities", balType: "Credit" },
      Equity: { color: "#2563eb", bg: "#F3F0FF", label: "Equity", balType: "Credit" },
      Income: { color: "#2F9E44", bg: "#EBFBEE", label: "Income", balType: "Credit" },
      Expense: { color: "#E67700", bg: "#FFF3BF", label: "Expenses", balType: "Debit" }
    }, G = ["Asset", "Liability", "Equity", "Income", "Expense"], D = w(!0), v = w([]), u = J({}), y = J({}), C = w((/* @__PURE__ */ new Date()).toISOString().slice(0, 10)), c = w(!1), L = w(["Asset", "Liability", "Equity", "Income", "Expense"]), q = w(!1), F = w(!1);
    function k(s) {
      return Math.round(Number(s || 0) * 100) / 100;
    }
    function f(s) {
      const e = Number(s || 0);
      return e === 0 ? "KES 0" : "KES " + Math.abs(e).toLocaleString("en-US", { minimumFractionDigits: 2 });
    }
    function K(s, e) {
      return s = (s || "").toLowerCase(), e = (e || "").toLowerCase(), s === "income" || s.includes("income") ? "Income" : s === "expense" || s.includes("expense") || s === "cost of goods sold" || s === "depreciation" ? "Expense" : s === "payable" || s === "liability" || s === "credit card" ? "Liability" : s === "equity" || s.includes("retained") ? "Equity" : s === "tax" && (e.includes("payable") || e.includes("output")) ? "Liability" : "Asset";
    }
    async function P() {
      D.value = !0;
      try {
        const s = await V(), e = await de("psd_books.api.books_data.get_chart_of_accounts", { company: s });
        let r = Array.isArray(e) ? e : [];
        if (s) {
          const o = new Set(r.map((n) => n.account_name || n.name));
          r = r.filter((n) => {
            const h = n.account_name || n.name;
            return h.endsWith(" - " + s) || !o.has(h + " - " + s);
          });
        }
        v.value = r.filter((o) => !o.is_group).map((o) => ({
          name: o.name,
          account_name: o.account_name || o.name,
          root_type: o.root_type || K(o.account_type, o.account_name || o.name),
          account_type: o.account_type || ""
        })), v.value.forEach((o) => {
          var n;
          y[o.name] = ((n = x[o.root_type]) == null ? void 0 : n.balType) || "Debit";
        });
        try {
          const o = JSON.parse(localStorage.getItem("books_ob") || "{}");
          o.b && Object.assign(u, o.b), o.date && (C.value = o.date), c.value = localStorage.getItem("books_ob_status") === "submitted", o.d && v.value.forEach((n) => {
            o.d[n.name] !== void 0 && (y[n.name] = o.d[n.name]);
          });
        } catch {
        }
        v.value.length ? _("Loaded " + v.value.length + " accounts", "info") : _("No accounts found — set up Chart of Accounts first", "info");
      } catch (s) {
        _("Could not load accounts: " + s.message, "error");
      } finally {
        D.value = !1;
      }
    }
    function A() {
      try {
        localStorage.setItem("books_ob", JSON.stringify({ b: { ...u }, d: { ...y }, date: C.value }));
      } catch {
      }
    }
    const l = I(() => {
      let s = 0, e = 0, r = 0;
      return v.value.forEach((o) => {
        var Y;
        const n = k(Number(u[o.name] || 0));
        if (!n) return;
        const N = ((y[o.name] || ((Y = x[o.root_type]) == null ? void 0 : Y.balType) || "Debit") === "Debit" ? 1 : -1) * n;
        o.root_type === "Asset" ? s += N : o.root_type === "Liability" ? e -= N : o.root_type === "Equity" && (r -= N);
      }), { assets: k(s), liabilities: k(e), equity: k(r), diff: k(s - (e + r)) };
    }), p = I(() => {
      if (c.value) return 4;
      const { diff: s } = l.value, e = Object.keys(u).some((o) => Number(u[o]) > 0);
      return e && Math.abs(s) < 0.01 ? 3 : e ? 2 : C.value ? 1 : 0;
    }), S = I(() => Object.keys(u).some((s) => Number(u[s]) > 0));
    function U(s, e) {
      const r = parseFloat(e) || 0;
      r > 0 ? u[s] = r : delete u[s], A();
    }
    function W(s, e) {
      y[s] = e, A();
    }
    function Q(s) {
      const e = L.value.indexOf(s);
      e >= 0 ? L.value.splice(e, 1) : L.value.push(s);
    }
    function j(s) {
      return L.value.includes(s);
    }
    function z(s) {
      return v.value.filter((e) => e.root_type === s);
    }
    function R(s) {
      return k(z(s).reduce((e, r) => e + k(Number(u[r.name] || 0)), 0));
    }
    async function X() {
      if (!$("accounts")) {
        _("Read-only access", "error"), q.value = !1;
        return;
      }
      q.value = !1;
      const s = C.value || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), e = [];
      v.value.forEach((r) => {
        const o = k(Number(u[r.name] || 0));
        if (!o) return;
        const n = y[r.name] || "Debit";
        e.push({
          doctype: "Journal Entry Account",
          account: r.name,
          debit: n === "Debit" ? o : 0,
          credit: n === "Credit" ? o : 0
        });
      });
      try {
        const o = {
          doctype: "Journal Entry",
          naming_series: "JV-.YYYY.-",
          company: await V(),
          voucher_type: "Opening Entry",
          posting_date: s,
          remark: "Opening Balances as at " + s,
          accounts: e
        }, n = await ue(o);
        await pe("Journal Entry", n.name), _("Opening entry posted: " + n.name, "success"), c.value = !0, localStorage.setItem("books_ob_status", "submitted"), A();
      } catch (r) {
        _("Failed to post opening entry — " + (r.message || "please try again"), "error");
      }
    }
    function Z() {
      if (!$("accounts")) {
        _("Read-only access", "error"), F.value = !1;
        return;
      }
      Object.keys(u).forEach((s) => delete u[s]), c.value = !1, localStorage.removeItem("books_ob_status"), v.value.forEach((s) => {
        var e;
        y[s.name] = ((e = x[s.root_type]) == null ? void 0 : e.balType) || "Debit";
      }), F.value = !1, A(), _("Opening balances reset");
    }
    return se(P), (s, e) => {
      const r = ce("router-link");
      return a(), i("div", fe, [
        e[28] || (e[28] = t("div", { style: { background: "#EEF2FF", border: "1px solid rgba(59,91,219,.15)", "border-radius": "8px", padding: "12px 16px", "font-size": "13px", color: "#2f4ec4", "line-height": "1.6" } }, [
          t("strong", null, "What is this?"),
          E(" Enter account balances from your previous accounting system as of the date you start using Books. This is done "),
          t("strong", null, "once"),
          E(". After submission, balances are locked and posted as an Opening Journal Entry. ")
        ], -1)),
        t("div", ge, [
          (a(), i(m, null, T(["Set go-live date", "Enter balances", "Verify equation", "Submit"], (o, n) => (a(), i(m, { key: n }, [
            t("div", ve, [
              t("div", {
                class: g(["ob-step-dot", n < p.value || c.value ? "ob-dot-done" : n === p.value && !c.value ? "ob-dot-active" : "ob-dot-pending"])
              }, [
                n < p.value || c.value ? (a(), i("span", {
                  key: 0,
                  innerHTML: M(B)("check", 12)
                }, null, 8, ye)) : (a(), i("span", me, d(n + 1), 1))
              ], 2),
              t("span", {
                class: g(["ob-step-lbl", n < p.value || c.value ? "ob-lbl-done" : n === p.value && !c.value ? "ob-lbl-active" : "ob-lbl-muted"])
              }, d(o), 3)
            ]),
            n < 3 ? (a(), i("div", {
              key: 0,
              class: g(["ob-step-line", n < p.value || c.value ? "ob-line-done" : ""])
            }, null, 2)) : b("", !0)
          ], 64))), 64))
        ]),
        t("div", xe, [
          t("div", he, [
            (a(), i(m, null, T(["Set go-live date", "Enter balances", "Verify equation", "Submit"], (o, n) => (a(), i(m, {
              key: "d" + n
            }, [
              t("div", _e, [
                t("div", {
                  class: g(["ob-step-dot ob-ms-dot", n < p.value || c.value ? "ob-dot-done" : n === p.value && !c.value ? "ob-dot-active" : "ob-dot-pending"])
                }, [
                  n < p.value || c.value ? (a(), i("span", {
                    key: 0,
                    innerHTML: M(B)("check", 11)
                  }, null, 8, ke)) : (a(), i("span", Ee, d(n + 1), 1))
                ], 2)
              ]),
              n < 3 ? (a(), i("div", {
                key: 0,
                class: g(["ob-ms-line", n < p.value || c.value ? "ob-line-done" : ""])
              }, null, 2)) : b("", !0)
            ], 64))), 64))
          ]),
          t("div", we, [
            (a(), i(m, null, T(["Set go-live date", "Enter balances", "Verify equation", "Submit"], (o, n) => t("span", {
              key: "l" + n,
              class: g(["ob-ms-lbl", n < p.value || c.value ? "ob-lbl-done" : n === p.value && !c.value ? "ob-lbl-active" : "ob-lbl-muted"])
            }, d(o), 3)), 64))
          ])
        ]),
        t("div", Ce, [
          t("div", qe, [
            e[8] || (e[8] = t("label", { style: { "font-size": "13px", "font-weight": "600", color: "#868E96", "white-space": "nowrap" } }, "Go-live Date", -1)),
            oe(t("input", {
              type: "date",
              "onUpdate:modelValue": e[0] || (e[0] = (o) => C.value = o),
              onChange: A,
              disabled: c.value || !s.$canCreate("accounts"),
              class: "b-input"
            }, null, 40, Fe), [
              [ne, C.value]
            ]),
            e[9] || (e[9] = t("span", { style: { "font-size": "12px", color: "#868E96" } }, "Balances as at the closing of this date from your previous system.", -1))
          ]),
          t("div", Ae, [
            c.value ? (a(), i("span", Se, [
              t("span", {
                innerHTML: M(B)("check", 13)
              }, null, 8, ze),
              e[10] || (e[10] = E("Submitted", -1))
            ])) : b("", !0),
            S.value || c.value ? (a(), i("button", {
              key: 1,
              class: "b-btn b-btn-ghost",
              disabled: !s.$canCreate("accounts"),
              title: s.$canCreate("accounts") ? "" : "Read-only access",
              onClick: e[1] || (e[1] = (o) => F.value = !0)
            }, "Reset", 8, Te)) : b("", !0),
            c.value ? b("", !0) : (a(), i("button", {
              key: 2,
              class: g(["b-btn", Math.abs(l.value.diff) < 0.01 && S.value ? "b-btn-primary" : "b-btn-ghost"]),
              disabled: !S.value || !s.$canCreate("accounts"),
              title: s.$canCreate("accounts") ? "" : "Read-only access",
              onClick: e[2] || (e[2] = (o) => Math.abs(l.value.diff) < 0.01 && S.value ? q.value = !0 : null)
            }, [
              t("span", {
                innerHTML: M(B)("check", 13)
              }, null, 8, Le),
              E(" " + d(Math.abs(l.value.diff) < 0.01 && S.value ? "Submit Opening Balances" : "Needs Balancing"), 1)
            ], 10, De))
          ])
        ]),
        D.value ? (a(), i("div", Me, [...e[11] || (e[11] = [
          t("div", {
            class: "b-shimmer",
            style: { "max-width": "300px", margin: "0 auto", height: "14px" }
          }, null, -1)
        ])])) : (a(), i("div", Be, [
          e[17] || (e[17] = t("div", {
            class: "ob-eq-title",
            style: { "font-size": "11px", "font-weight": "700", "letter-spacing": ".5px", "text-transform": "uppercase", color: "#868E96", "margin-bottom": "12px" }
          }, "Accounting Equation Check — Assets = Liabilities + Equity", -1)),
          t("div", Oe, [
            t("div", Ne, [
              e[12] || (e[12] = t("div", {
                class: "ob-eq-lbl",
                style: { "font-size": "11px", "font-weight": "600", "text-transform": "uppercase", "letter-spacing": ".4px", color: "#0C8599", "margin-bottom": "4px" }
              }, "Assets", -1)),
              t("div", Ie, d(f(l.value.assets)), 1)
            ]),
            e[15] || (e[15] = t("div", {
              class: "ob-eq-op",
              style: { "font-size": "20px", "font-weight": "700", color: "#868E96", padding: "0 12px", "align-self": "center" }
            }, "=", -1)),
            t("div", $e, [
              e[13] || (e[13] = t("div", {
                class: "ob-eq-lbl",
                style: { "font-size": "11px", "font-weight": "600", "text-transform": "uppercase", "letter-spacing": ".4px", color: "#C92A2A", "margin-bottom": "4px" }
              }, "Liabilities", -1)),
              t("div", je, d(f(l.value.liabilities)), 1)
            ]),
            e[16] || (e[16] = t("div", {
              class: "ob-eq-op",
              style: { "font-size": "20px", "font-weight": "700", color: "#868E96", padding: "0 12px", "align-self": "center" }
            }, "+", -1)),
            t("div", Re, [
              e[14] || (e[14] = t("div", {
                class: "ob-eq-lbl",
                style: { "font-size": "11px", "font-weight": "600", "text-transform": "uppercase", "letter-spacing": ".4px", color: "#2563eb", "margin-bottom": "4px" }
              }, "Equity", -1)),
              t("div", Ye, d(f(l.value.equity)), 1)
            ])
          ]),
          t("div", {
            class: g(["ob-eq-diff", !l.value.assets && !l.value.liabilities && !l.value.equity ? "ob-eq-zero" : Math.abs(l.value.diff) < 0.01 ? "ob-eq-ok" : "ob-eq-err"])
          }, [
            !l.value.assets && !l.value.liabilities && !l.value.equity ? (a(), i("span", He, "Enter balances to check the equation")) : Math.abs(l.value.diff) < 0.01 ? (a(), i("span", Ve, "✓ Balanced — Assets = Liabilities + Equity = " + d(f(l.value.assets)), 1)) : (a(), i("span", Je, "✗ Out of balance by " + d(f(Math.abs(l.value.diff))) + " — " + d(l.value.diff > 0 ? "Assets exceed Liabilities+Equity" : "Liabilities+Equity exceed Assets"), 1))
          ], 2)
        ])),
        D.value ? b("", !0) : (a(), i(m, { key: 2 }, [
          (a(), i(m, null, T(G, (o) => (a(), i(m, { key: o }, [
            z(o).length ? (a(), i("div", Ge, [
              t("div", {
                class: "ob-sec-header",
                style: { display: "flex", "align-items": "center", "justify-content": "space-between", padding: "12px 16px", cursor: "pointer", "user-select": "none" },
                onClick: (n) => Q(o)
              }, [
                t("div", Pe, [
                  t("span", {
                    style: O([{ "font-size": "11px", "font-weight": "700", padding: "3px 10px", "border-radius": "20px" }, { background: x[o].bg, color: x[o].color }])
                  }, d(x[o].label), 5),
                  t("span", Ue, d(z(o).length) + " accounts  ·  " + d(z(o).filter((n) => u[n.name] > 0).length) + " filled", 1)
                ]),
                t("div", We, [
                  t("span", {
                    style: O([{ "font-size": "14px", "font-weight": "700" }, { color: x[o].color }])
                  }, d(f(R(o))), 5),
                  t("span", {
                    style: O([{ "font-size": "11px", color: "#868E96", transition: "transform .2s", display: "inline-block" }, { transform: j(o) ? "rotate(90deg)" : "rotate(0deg)" }])
                  }, "▶", 4)
                ])
              ], 8, Ke),
              j(o) ? (a(), i(m, { key: 0 }, [
                e[19] || (e[19] = t("div", {
                  class: "ob-col-header",
                  style: { display: "grid", "grid-template-columns": "1fr 130px 130px", "align-items": "center", gap: "10px", padding: "8px 16px", background: "#F8F9FC", "border-top": "1px solid #F1F3F5" }
                }, [
                  t("div", { style: { "font-size": "10.5px", "font-weight": "700", "letter-spacing": ".5px", "text-transform": "uppercase", color: "#868E96" } }, "Account"),
                  t("div", { style: { "font-size": "10.5px", "font-weight": "700", "letter-spacing": ".5px", "text-transform": "uppercase", color: "#868E96", "text-align": "right" } }, "Balance (KES)"),
                  t("div", { style: { "font-size": "10.5px", "font-weight": "700", "letter-spacing": ".5px", "text-transform": "uppercase", color: "#868E96" } }, "Dr / Cr")
                ], -1)),
                (a(!0), i(m, null, T(z(o), (n) => (a(), i("div", {
                  key: n.name,
                  class: "ob-acct-row"
                }, [
                  t("div", null, [
                    t("div", Qe, d(n.account_name), 1),
                    n.account_type ? (a(), i("div", Xe, d(n.account_type), 1)) : b("", !0)
                  ]),
                  t("input", {
                    type: "number",
                    min: "0",
                    step: "0.01",
                    class: g(["ob-bal-input", u[n.name] > 0 ? "ob-has-val" : ""]),
                    value: u[n.name] || "",
                    placeholder: "0.00",
                    disabled: c.value || !s.$canCreate("accounts"),
                    onInput: (h) => U(n.name, h.target.value),
                    onFocus: e[3] || (e[3] = (h) => h.target.select())
                  }, null, 42, Ze),
                  t("select", {
                    class: g(["ob-dr-cr-sel", (y[n.name] || "Debit") === "Debit" ? "ob-dr" : "ob-cr"]),
                    disabled: c.value || !s.$canCreate("accounts"),
                    onChange: (h) => W(n.name, h.target.value)
                  }, [
                    t("option", {
                      value: "Debit",
                      selected: (y[n.name] || "Debit") === "Debit"
                    }, "Dr (Debit)", 8, tt),
                    t("option", {
                      value: "Credit",
                      selected: (y[n.name] || "Debit") === "Credit"
                    }, "Cr (Credit)", 8, st)
                  ], 42, et)
                ]))), 128)),
                t("div", ot, [
                  t("div", nt, "Total " + d(x[o].label), 1),
                  t("div", {
                    style: O([{ "font-size": "13px", "font-weight": "700", "text-align": "right" }, { color: x[o].color }])
                  }, d(f(R(o))), 5),
                  e[18] || (e[18] = t("div", null, null, -1))
                ])
              ], 64)) : b("", !0)
            ])) : b("", !0)
          ], 64))), 64)),
          v.value.length ? b("", !0) : (a(), i("div", at, [
            e[21] || (e[21] = t("div", { style: { "font-size": "36px", "margin-bottom": "12px" } }, "📄", -1)),
            e[22] || (e[22] = t("div", { style: { "font-weight": "600", "margin-bottom": "8px", color: "#1A1D23" } }, "No accounts found", -1)),
            e[23] || (e[23] = t("div", { style: { "font-size": "13px", "margin-bottom": "16px" } }, "Set up your Chart of Accounts first, then come back to enter opening balances.", -1)),
            ae(r, {
              to: "/accounting/chart-of-accounts",
              class: "b-btn b-btn-primary"
            }, {
              default: ie(() => [...e[20] || (e[20] = [
                E("Go to Chart of Accounts", -1)
              ])]),
              _: 1
            })
          ]))
        ], 64)),
        (a(), le(re, { to: "body" }, [
          q.value ? (a(), i("div", {
            key: 0,
            style: { position: "fixed", inset: "0", "z-index": "1000", background: "rgba(0,0,0,.5)", display: "flex", "align-items": "center", "justify-content": "center", padding: "20px" },
            onClick: e[5] || (e[5] = H((o) => q.value = !1, ["self"]))
          }, [
            t("div", it, [
              e[24] || (e[24] = t("div", { style: { "font-size": "18px", "font-weight": "700", "margin-bottom": "8px" } }, "Submit Opening Balances?", -1)),
              e[25] || (e[25] = t("div", { style: { "font-size": "13px", color: "#868E96", "margin-bottom": "14px", "line-height": "1.6" } }, [
                E("This will create an "),
                t("strong", null, "Opening Entry"),
                E(" journal in Frappe and lock all balances. You "),
                t("strong", null, "cannot edit"),
                E(" opening balances after submission without cancelling the journal entry.")
              ], -1)),
              t("div", {
                class: g(["ob-eq-diff", Math.abs(l.value.diff) < 0.01 ? "ob-eq-ok" : "ob-eq-err"]),
                style: { "margin-bottom": "20px" }
              }, [
                Math.abs(l.value.diff) < 0.01 ? (a(), i("span", lt, "✓ Assets (" + d(f(l.value.assets)) + ") = Liabilities (" + d(f(l.value.liabilities)) + ") + Equity (" + d(f(l.value.equity)) + ")", 1)) : (a(), i("span", rt, "✗ Out of balance by " + d(f(Math.abs(l.value.diff))) + ". Please fix before submitting.", 1))
              ], 2),
              t("div", dt, [
                t("button", {
                  class: "b-btn b-btn-ghost",
                  onClick: e[4] || (e[4] = (o) => q.value = !1)
                }, "Go Back"),
                t("button", {
                  class: "b-btn",
                  style: { background: "#2F9E44", color: "#fff", "border-color": "#2F9E44" },
                  disabled: Math.abs(l.value.diff) >= 0.01,
                  onClick: X
                }, "Yes, Submit", 8, ct)
              ])
            ])
          ])) : b("", !0),
          F.value ? (a(), i("div", {
            key: 1,
            style: { position: "fixed", inset: "0", "z-index": "1000", background: "rgba(0,0,0,.5)", display: "flex", "align-items": "center", "justify-content": "center", padding: "20px" },
            onClick: e[7] || (e[7] = H((o) => F.value = !1, ["self"]))
          }, [
            t("div", ut, [
              e[26] || (e[26] = t("div", { style: { "font-size": "18px", "font-weight": "700", "margin-bottom": "8px" } }, "Reset All Balances?", -1)),
              e[27] || (e[27] = t("div", { style: { "font-size": "13px", color: "#868E96", "margin-bottom": "24px", "line-height": "1.6" } }, "This will clear all entered balances. You will need to re-enter them.", -1)),
              t("div", pt, [
                t("button", {
                  class: "b-btn b-btn-ghost",
                  onClick: e[6] || (e[6] = (o) => F.value = !1)
                }, "Cancel"),
                t("button", {
                  class: "b-btn",
                  style: { background: "#C92A2A", color: "#fff", "border-color": "#C92A2A" },
                  onClick: Z
                }, "Yes, Reset")
              ])
            ])
          ])) : b("", !0)
        ]))
      ]);
    };
  }
}, vt = /* @__PURE__ */ ee(bt, [["__scopeId", "data-v-16ba1a64"]]);
export {
  vt as default
};
