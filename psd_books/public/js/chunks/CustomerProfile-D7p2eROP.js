import { _ as dt, x as ut, z as pt, o as mt, y as vt, c as l, a as e, D as B, E as _t, t as n, b as c, d as f, u as p, F as L, i as S, n as w, C as yt, r as R, q as bt, w as O, A as K, v as ft, X as ht, l as N, Y as gt, h as C, g as P, K as kt, L as wt, S as Ct, j as xt, k as i } from "./main-B4BdT7Fg.js";
import { b as M } from "./format-BcJZDVG4.js";
import { o as Y } from "./userNames-Cwhv_QJ8.js";
import { D as q } from "./DocLink-BgzznLsT.js";
import { A as St } from "./AddressManager-CoyEVizY.js";
const Dt = { class: "cp-page" }, $t = { class: "cp-bread" }, Lt = ["innerHTML"], Nt = { class: "cp-bread-cur" }, Pt = { class: "cp-header" }, Mt = { class: "cp-header-left" }, Tt = { class: "cp-avatar" }, At = { class: "cp-name" }, It = { class: "cp-meta" }, Ht = {
  key: 0,
  class: "cp-chip"
}, Rt = {
  key: 1,
  class: "cp-chip cp-chip-muted"
}, Et = {
  key: 2,
  class: "cp-chip cp-chip-muted"
}, Ft = {
  key: 3,
  class: "cp-chip cp-chip-danger"
}, Bt = {
  key: 0,
  class: "inv-view-footer",
  style: { padding: "6px 0 0" }
}, Ot = { style: { display: "flex", gap: "8px" } }, zt = ["disabled"], Ut = ["innerHTML"], jt = ["innerHTML"], Vt = ["innerHTML"], Gt = ["innerHTML"], Kt = { class: "cp-stats" }, Yt = { class: "cp-stat-sub" }, qt = { class: "cp-stat-card" }, Xt = { class: "cp-stat-sub" }, Jt = { class: "cp-stat-card" }, Wt = { class: "cp-stat-val" }, Qt = { class: "cp-stat-sub" }, Zt = { class: "cp-stat-card" }, te = { class: "cp-stat-val cp-stat-val-sm" }, ee = { class: "cp-stat-sub" }, se = { class: "cp-contact-card" }, ae = { class: "cp-contact-section" }, ne = { class: "cp-contact-row" }, oe = { class: "cp-kv" }, ie = ["href"], le = { key: 1 }, ce = { class: "cp-kv" }, re = ["href"], de = { key: 1 }, ue = { class: "cp-kv" }, pe = ["href"], me = { key: 1 }, ve = { class: "cp-kv" }, _e = { class: "mono" }, ye = { class: "cp-contact-section" }, be = {
  key: 1,
  style: { color: "#9ca3af", "font-style": "italic", "font-size": "12.5px" }
}, fe = { class: "cp-contact-section" }, he = { class: "cp-contact-row" }, ge = { class: "cp-kv" }, ke = { class: "cp-kv" }, we = { class: "mono" }, Ce = { class: "cp-kv" }, xe = { class: "mono-sm" }, Se = {
  key: 0,
  class: "cp-ob-card"
}, De = {
  key: 0,
  class: "cp-chip",
  style: { "margin-left": "6px" }
}, $e = ["disabled", "title"], Le = ["innerHTML"], Ne = { class: "cp-tabs" }, Pe = ["onClick"], Me = {
  key: 0,
  class: "cp-tab-count"
}, Te = { class: "cp-modal" }, Ae = { class: "cp-modal-field" }, Ie = ["max"], He = { class: "cp-modal-field" }, Re = ["value"], Ee = { class: "cp-modal-field" }, Fe = { class: "cp-modal-actions" }, Be = ["disabled"], Oe = { class: "cp-tab-body" }, ze = {
  key: 0,
  class: "cp-empty"
}, Ue = { key: 1 }, je = { class: "cp-table" }, Ve = { class: "text-muted" }, Ge = { class: "ta-r mono-sm" }, Ke = { class: "cp-status" }, Ye = { key: 0 }, qe = { key: 2 }, Xe = { class: "cp-table" }, Je = {
  key: 0,
  class: "ta-r"
}, We = { class: "text-muted" }, Qe = {
  key: 0,
  class: "ta-r mono-sm"
}, Ze = { class: "cp-status" }, ts = { key: 0 }, es = ["colspan"], ss = {
  __name: "CustomerProfile",
  setup(as) {
    const y = Ct(), X = xt(), { toast: m } = ut(), o = C({}), d = C({ outstanding: 0, cn_credit: 0, open_invoice_count: 0, open_cn_count: 0, last_txn_date: null }), x = C([]), k = C("overview"), E = C(!1), r = C({ has_opening_je: !1 }), D = C(!1), T = C(!1), u = pt({ amount: 0, bank_cash_account: "", payment_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) }), J = P(() => [
      { k: "overview", l: "Overview" },
      { k: "Invoice", l: "Invoices", count: $.value.invoices },
      { k: "Credit Note", l: "Credit Notes", count: $.value.credit_notes },
      { k: "Payment", l: "Payments", count: $.value.payments }
    ]), $ = P(() => {
      const s = { invoices: 0, credit_notes: 0, payments: 0 };
      for (const t of x.value)
        t.type === "Invoice" ? s.invoices++ : t.type === "Credit Note" ? s.credit_notes++ : t.type === "Payment" && s.payments++;
      return s;
    }), z = P(() => x.value.filter((s) => s.type === k.value)), W = P(
      () => x.value.filter((s) => s.type === "Invoice").reduce((s, t) => s + Math.abs(t.amount || 0), 0)
    ), Q = P(() => (o.value.customer_name || y.params.name || "").split(/\s+/).filter(Boolean).slice(0, 2).map((t) => t[0]).join("").toUpperCase() || "?");
    function h(s) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", minimumFractionDigits: 0 }).format(Number(s || 0));
    }
    function Z(s) {
      if (!s) return "Never";
      const t = Math.floor((/* @__PURE__ */ new Date() - new Date(s)) / 864e5);
      return t === 0 ? "Today" : t === 1 ? "Yesterday" : t < 30 ? `${t} days ago` : t < 365 ? `${Math.floor(t / 30)} months ago` : `${Math.floor(t / 365)} years ago`;
    }
    function tt(s) {
      return s === "Invoice" ? "type-invoice" : s === "Credit Note" ? "type-cn" : "type-payment";
    }
    function U(s) {
      return s === "Invoice" || s === "Credit Note" ? "Sales Invoice" : s === "Payment" ? "Payment Entry" : "";
    }
    async function F() {
      E.value = !0;
      try {
        const s = y.params.name, [t, v, a, g] = await Promise.all([
          ht("Customer", s).catch(() => ({})),
          N("psd_books.api.docs.get_customer_summary", { customer: s }).catch(() => ({})),
          N("psd_books.api.docs.get_customer_transactions", { customer: s, limit: 200 }).catch(() => []),
          N(
            "psd_books.accounts.opening_balance.get_opening_balance_payment_info",
            { party_type: "Customer", party: s }
          ).catch(() => ({ has_opening_je: !1 }))
        ]);
        o.value = t || {}, d.value = v || d.value, x.value = Array.isArray(a) ? a : [], r.value = g || { has_opening_je: !1 };
      } catch (s) {
        m.error(s.message || "Failed to load customer");
      } finally {
        E.value = !1;
      }
    }
    function et() {
      var s, t;
      u.amount = r.value.outstanding, u.bank_cash_account = ((t = (s = r.value.bank_cash_accounts) == null ? void 0 : s[0]) == null ? void 0 : t.name) || "", u.payment_date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), D.value = !0;
    }
    async function st() {
      const s = Number(u.amount);
      if (!u.bank_cash_account) {
        m.error("Choose an account to pay into");
        return;
      }
      if (!s || s <= 0) {
        m.error("Enter a valid amount");
        return;
      }
      if (s > r.value.outstanding + 0.01) {
        m.error("Amount exceeds outstanding opening balance");
        return;
      }
      T.value = !0;
      try {
        const t = {
          doctype: "Payment Entry",
          payment_type: "Receive",
          party_type: "Customer",
          party: y.params.name,
          party_name: o.value.customer_name,
          company: r.value.company,
          paid_from: r.value.party_account,
          paid_to: u.bank_cash_account,
          paid_amount: s,
          received_amount: s,
          payment_date: u.payment_date,
          remarks: `Opening balance payment for ${o.value.customer_name || y.params.name}`,
          references: [{
            reference_doctype: "Journal Entry",
            reference_name: r.value.journal_entry,
            allocated_amount: s
          }]
        }, v = await kt(t);
        await wt("Payment Entry", v.name), m.success("Payment recorded"), D.value = !1, await F();
      } catch (t) {
        m.error(t.message || "Failed to record payment");
      } finally {
        T.value = !1;
      }
    }
    function j() {
    }
    mt(F), vt(() => y.params.name, F);
    function at() {
      o.value.email_id && (window.location.href = `mailto:${o.value.email_id}`);
    }
    async function nt() {
      var s;
      try {
        const t = await N(
          "psd_books.api.docs.get_customer_statement",
          { customer: y.params.name }
        );
        if (!t || !((s = t.rows) != null && s.length)) {
          m.error("No statement rows in this period");
          return;
        }
        await lt(t);
      } catch (t) {
        m.error(t.message || "Statement download failed");
      }
    }
    async function ot() {
      var s;
      try {
        const t = await N(
          "psd_books.api.docs.get_customer_statement",
          { customer: y.params.name }
        );
        if (!t || !((s = t.rows) != null && s.length)) {
          m.error("No statement rows in this period");
          return;
        }
        const g = V(t).replace("<body>", "<body>" + `
      <style>
        .stmt-toolbar { position:sticky; top:0; z-index:10; background:#fff; padding:10px 18px; border-bottom:1px solid #e5e7eb; display:flex; align-items:center; gap:10px; box-shadow:0 1px 4px rgba(0,0,0,.06); font-family:Arial,Helvetica,sans-serif; }
        .stmt-toolbar .tb-lbl { font-size:11.5px; font-weight:700; color:#374151; letter-spacing:.04em; }
        .stmt-toolbar .print-btn { margin-left:auto; background:#1a6ef7; color:#fff; border:none; padding:7px 16px; border-radius:7px; font-weight:700; cursor:pointer; font:inherit; font-size:12.5px; display:flex; align-items:center; gap:6px; }
        .stmt-toolbar .print-btn:hover { background:#1558d0; }
        @media print { .stmt-toolbar { display:none!important; } }
      </style>
      <div class="stmt-toolbar">
        <span class="tb-lbl">PRINT PREVIEW</span>
        <button class="print-btn" onclick="window.print()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print
        </button>
      </div>`), b = window.open("", "_blank");
        if (!b) {
          m.error("Please allow pop-ups to print");
          return;
        }
        b.document.open(), b.document.write(g), b.document.close(), b.focus();
      } catch (t) {
        m.error(t.message || "Failed to build statement preview");
      }
    }
    function A(s) {
      const t = Number(s || 0);
      return t ? t.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "";
    }
    function it(s) {
      if (!s) return "";
      const t = new Date(s);
      return isNaN(t) ? String(s) : t.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
    }
    function V(s) {
      const t = o.value.customer_name || y.params.name, v = window.__booksCompany || "", a = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }), g = s.rows.map((_) => {
        const G = Number(_.balance || 0), rt = `${A(Math.abs(G))} ${G >= 0 ? "Dr" : "Cr"}`;
        return `<tr>
      <td>${it(_.date)}</td>
      <td>${_.type || ""}</td>
      <td>${_.ref || ""}</td>
      <td class="num">${A(_.debit)}</td>
      <td class="num">${A(_.credit)}</td>
      <td class="num bal">${rt}</td>
    </tr>`;
      }).join(""), b = s.totals || {}, I = Number(b.closing_balance || 0), H = `${A(Math.abs(I))} ${I >= 0 ? "Dr" : "Cr"}`;
      return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  @page { size: A4; margin: 18mm 14mm; }
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; font-size: 12px; }
  .stmt-header { text-align: center; margin-bottom: 4px; }
  .stmt-company { font-size: 16px; font-weight: 700; letter-spacing: .02em; }
  .stmt-title { font-size: 13px; font-weight: 600; margin-top: 10px; }
  .stmt-sub { font-size: 11.5px; color: #444; margin-top: 2px; }
  table { width: 100%; border-collapse: collapse; margin-top: 14px; }
  th, td { border: 1px solid #999; padding: 5px 8px; font-size: 11.5px; }
  th { background: #f0f0f0; text-align: left; font-weight: 700; }
  td.num, th.num { text-align: right; white-space: nowrap; }
  td.bal { font-weight: 600; }
  tfoot td { font-weight: 700; background: #f7f7f7; }
</style></head>
<body>
  <div class="stmt-header">
    ${v ? `<div class="stmt-company">${v}</div>` : ""}
    <div class="stmt-title">Account Statement</div>
    <div class="stmt-sub">Account: ${t} &nbsp;|&nbsp; As on ${a}</div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Type</th>
        <th>Ref No</th>
        <th class="num">Debit</th>
        <th class="num">Credit</th>
        <th class="num">Balance</th>
      </tr>
    </thead>
    <tbody>${g}</tbody>
    <tfoot>
      <tr>
        <td colspan="5">Closing Balance</td>
        <td class="num">${H}</td>
      </tr>
    </tfoot>
  </table>
</body></html>`;
    }
    async function lt(s) {
      var a;
      const t = V(s), v = `statement-${y.params.name}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.pdf`;
      try {
        const g = ((a = window.frappe) == null ? void 0 : a.csrf_token) || "", b = await fetch("/api/method/psd_books.api.docs.render_pdf_from_html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Frappe-CSRF-Token": g },
          credentials: "same-origin",
          body: new URLSearchParams({ pdf_html: t, filename: v })
        });
        if (!b.ok) throw new Error("PDF generation failed");
        const I = await b.blob(), H = URL.createObjectURL(I), _ = document.createElement("a");
        _.href = H, _.download = v, document.body.appendChild(_), _.click(), _.remove(), setTimeout(() => URL.revokeObjectURL(H), 5e3);
      } catch {
        m.error("Failed to generate statement PDF");
      }
    }
    function ct() {
      X.push({ path: "/invoices", query: { new: 1, customer: y.params.name } });
    }
    return (s, t) => {
      const v = gt("router-link");
      return i(), l("div", Dt, [
        e("div", $t, [
          B(v, {
            to: "/customers",
            class: "cp-back"
          }, {
            default: _t(() => [
              e("span", {
                innerHTML: p(S)("arrow-right", 13),
                style: { transform: "rotate(180deg)" }
              }, null, 8, Lt),
              t[5] || (t[5] = f(" All Customers ", -1))
            ]),
            _: 1
          }),
          t[6] || (t[6] = e("span", { class: "cp-bread-sep" }, "/", -1)),
          e("span", Nt, n(o.value.customer_name || s.$route.params.name), 1)
        ]),
        e("div", Pt, [
          e("div", Mt, [
            e("div", Tt, n(Q.value), 1),
            e("div", null, [
              e("div", At, n(o.value.customer_name || s.$route.params.name), 1),
              e("div", It, [
                o.value.customer_type ? (i(), l("span", Ht, n(o.value.customer_type), 1)) : c("", !0),
                o.value.customer_group ? (i(), l("span", Rt, n(o.value.customer_group), 1)) : c("", !0),
                o.value.territory ? (i(), l("span", Et, n(o.value.territory), 1)) : c("", !0),
                o.value.disabled ? (i(), l("span", Ft, "Disabled")) : c("", !0)
              ]),
              o.value.owner ? (i(), l("div", Bt, [
                f(" Created by " + n(p(Y)(o.value.owner)) + " on " + n(p(M)(o.value.creation)) + " ", 1),
                o.value.modified_by ? (i(), l(L, { key: 0 }, [
                  f(" · Last modified by " + n(p(Y)(o.value.modified_by)) + " on " + n(p(M)(o.value.modified)), 1)
                ], 64)) : c("", !0)
              ])) : c("", !0)
            ])
          ]),
          e("div", Ot, [
            e("button", {
              class: "cp-btn-ghost",
              onClick: at,
              disabled: !o.value.email_id
            }, [
              e("span", {
                innerHTML: p(S)("mail", 13)
              }, null, 8, Ut),
              t[7] || (t[7] = f(" Email ", -1))
            ], 8, zt),
            e("button", {
              class: "cp-btn-ghost",
              onClick: nt
            }, [
              e("span", {
                innerHTML: p(S)("download", 13)
              }, null, 8, jt),
              t[8] || (t[8] = f(" Statement ", -1))
            ]),
            e("button", {
              class: "cp-btn-ghost",
              onClick: ot
            }, [
              e("span", {
                innerHTML: p(S)("printer", 13)
              }, null, 8, Vt),
              t[9] || (t[9] = f(" Print ", -1))
            ]),
            e("button", {
              class: "cp-btn-primary",
              onClick: ct
            }, [
              e("span", {
                innerHTML: p(S)("plus", 13)
              }, null, 8, Gt),
              t[10] || (t[10] = f(" New Invoice ", -1))
            ])
          ])
        ]),
        e("div", Kt, [
          e("div", {
            class: w(["cp-stat-card", { warn: d.value.outstanding > 0 }])
          }, [
            t[11] || (t[11] = e("div", { class: "cp-stat-lbl" }, "Outstanding", -1)),
            e("div", {
              class: w(["cp-stat-val", d.value.outstanding > 0 ? "red" : "green"])
            }, n(h(d.value.outstanding)), 3),
            e("div", Yt, n(d.value.open_invoice_count) + " open invoice" + n(d.value.open_invoice_count !== 1 ? "s" : ""), 1)
          ], 2),
          e("div", qt, [
            t[12] || (t[12] = e("div", { class: "cp-stat-lbl" }, "Credit Note Balance", -1)),
            e("div", {
              class: w(["cp-stat-val", d.value.cn_credit > 0 ? "green" : ""])
            }, n(h(d.value.cn_credit)), 3),
            e("div", Xt, n(d.value.open_cn_count) + " open CN" + n(d.value.open_cn_count !== 1 ? "s" : ""), 1)
          ]),
          e("div", Jt, [
            t[13] || (t[13] = e("div", { class: "cp-stat-lbl" }, "Lifetime Billed", -1)),
            e("div", Wt, n(h(W.value)), 1),
            e("div", Qt, n($.value.invoices) + " invoice" + n($.value.invoices !== 1 ? "s" : ""), 1)
          ]),
          e("div", Zt, [
            t[14] || (t[14] = e("div", { class: "cp-stat-lbl" }, "Last Activity", -1)),
            e("div", te, n(p(M)(d.value.last_txn_date) || "—"), 1),
            e("div", ee, n(Z(d.value.last_txn_date)), 1)
          ])
        ]),
        e("div", se, [
          e("div", ae, [
            t[19] || (t[19] = e("div", { class: "cp-section-title" }, "Contact", -1)),
            e("div", ne, [
              e("div", oe, [
                t[15] || (t[15] = e("span", { class: "cp-k" }, "Email", -1)),
                o.value.email_id ? (i(), l("a", {
                  key: 0,
                  href: `mailto:${o.value.email_id}`,
                  class: "cp-link"
                }, n(o.value.email_id), 9, ie)) : (i(), l("span", le, "—"))
              ]),
              e("div", ce, [
                t[16] || (t[16] = e("span", { class: "cp-k" }, "Mobile", -1)),
                o.value.mobile_no ? (i(), l("a", {
                  key: 0,
                  href: `tel:${o.value.mobile_no}`,
                  class: "cp-link"
                }, n(o.value.mobile_no), 9, re)) : (i(), l("span", de, "—"))
              ]),
              e("div", ue, [
                t[17] || (t[17] = e("span", { class: "cp-k" }, "Phone", -1)),
                o.value.phone ? (i(), l("a", {
                  key: 0,
                  href: `tel:${o.value.phone}`,
                  class: "cp-link"
                }, n(o.value.phone), 9, pe)) : (i(), l("span", me, "—"))
              ]),
              e("div", ve, [
                t[18] || (t[18] = e("span", { class: "cp-k" }, "KRA PIN", -1)),
                e("span", _e, n(o.value.tax_id || "—"), 1)
              ])
            ])
          ]),
          e("div", ye, [
            t[20] || (t[20] = e("div", { class: "cp-section-title" }, "Addresses", -1)),
            o.value.name ? (i(), yt(St, {
              key: 0,
              partyDoctype: "Customer",
              partyName: o.value.name,
              onAddressSaved: j,
              onAddressDeleted: j
            }, null, 8, ["partyName"])) : (i(), l("div", be, "No address on file"))
          ]),
          e("div", fe, [
            t[24] || (t[24] = e("div", { class: "cp-section-title" }, "Accounts", -1)),
            e("div", he, [
              e("div", ge, [
                t[21] || (t[21] = e("span", { class: "cp-k" }, "Payment Terms", -1)),
                e("span", null, n(o.value.payment_terms || "—"), 1)
              ]),
              e("div", ke, [
                t[22] || (t[22] = e("span", { class: "cp-k" }, "Credit Limit", -1)),
                e("span", we, n(o.value.credit_limit ? h(o.value.credit_limit) : "—"), 1)
              ]),
              e("div", Ce, [
                t[23] || (t[23] = e("span", { class: "cp-k" }, "Receivable A/c", -1)),
                e("span", xe, n(o.value.default_receivable_account || "—"), 1)
              ])
            ])
          ])
        ]),
        r.value.has_opening_je ? (i(), l("div", Se, [
          e("div", null, [
            t[25] || (t[25] = e("div", {
              class: "cp-section-title",
              style: { border: "none", padding: "0" }
            }, "Opening Balance", -1)),
            e("div", {
              class: w(["cp-ob-amt", { green: r.value.outstanding <= 0 }])
            }, [
              f(n(h(r.value.outstanding)) + " ", 1),
              r.value.outstanding <= 0 ? (i(), l("span", De, "Paid")) : c("", !0)
            ], 2)
          ]),
          r.value.outstanding > 0 ? (i(), l("button", {
            key: 0,
            class: "cp-btn-primary",
            disabled: !s.$canCreate("payments"),
            title: s.$canCreate("payments") ? "" : "Read-only access",
            onClick: et
          }, [
            e("span", {
              innerHTML: p(S)("plus", 13)
            }, null, 8, Le),
            t[26] || (t[26] = f(" Pay ", -1))
          ], 8, $e)) : c("", !0)
        ])) : c("", !0),
        e("div", Ne, [
          (i(!0), l(L, null, R(J.value, (a) => (i(), l("button", {
            key: a.k,
            class: w(["cp-tab", { active: k.value === a.k }]),
            onClick: (g) => k.value = a.k
          }, [
            f(n(a.l), 1),
            a.count ? (i(), l("span", Me, n(a.count), 1)) : c("", !0)
          ], 10, Pe))), 128))
        ]),
        D.value ? (i(), l("div", {
          key: 1,
          class: "cp-modal-overlay",
          onClick: t[4] || (t[4] = bt((a) => D.value = !1, ["self"]))
        }, [
          e("div", Te, [
            t[30] || (t[30] = e("div", { class: "cp-modal-title" }, "Pay Opening Balance", -1)),
            e("label", Ae, [
              t[27] || (t[27] = e("span", null, "Amount", -1)),
              O(e("input", {
                type: "number",
                "onUpdate:modelValue": t[0] || (t[0] = (a) => u.amount = a),
                max: r.value.outstanding,
                min: "0.01",
                step: "0.01"
              }, null, 8, Ie), [
                [
                  K,
                  u.amount,
                  void 0,
                  { number: !0 }
                ]
              ])
            ]),
            e("label", He, [
              t[28] || (t[28] = e("span", null, "Pay Into", -1)),
              O(e("select", {
                "onUpdate:modelValue": t[1] || (t[1] = (a) => u.bank_cash_account = a)
              }, [
                (i(!0), l(L, null, R(r.value.bank_cash_accounts, (a) => (i(), l("option", {
                  key: a.name,
                  value: a.name
                }, n(a.name), 9, Re))), 128))
              ], 512), [
                [ft, u.bank_cash_account]
              ])
            ]),
            e("label", Ee, [
              t[29] || (t[29] = e("span", null, "Date", -1)),
              O(e("input", {
                type: "date",
                "onUpdate:modelValue": t[2] || (t[2] = (a) => u.payment_date = a)
              }, null, 512), [
                [K, u.payment_date]
              ])
            ]),
            e("div", Fe, [
              e("button", {
                class: "cp-btn-ghost",
                onClick: t[3] || (t[3] = (a) => D.value = !1)
              }, "Cancel"),
              e("button", {
                class: "cp-btn-primary",
                disabled: T.value || !s.$canCreate("payments"),
                onClick: st
              }, n(T.value ? "Recording…" : "Record Payment"), 9, Be)
            ])
          ])
        ])) : c("", !0),
        e("div", Oe, [
          E.value ? (i(), l("div", ze, "Loading…")) : k.value === "overview" ? (i(), l("div", Ue, [
            e("table", je, [
              t[32] || (t[32] = e("thead", null, [
                e("tr", null, [
                  e("th", null, "Type"),
                  e("th", null, "Document"),
                  e("th", null, "Date"),
                  e("th", { class: "ta-r" }, "Amount"),
                  e("th", { class: "ta-r" }, "Outstanding"),
                  e("th", null, "Status")
                ])
              ], -1)),
              e("tbody", null, [
                (i(!0), l(L, null, R(x.value, (a) => (i(), l("tr", {
                  key: a.type + a.name
                }, [
                  e("td", null, [
                    e("span", {
                      class: w(["cp-type-pill", tt(a.type)])
                    }, n(a.type), 3)
                  ]),
                  e("td", null, [
                    B(q, {
                      doctype: U(a.type),
                      name: a.name
                    }, null, 8, ["doctype", "name"])
                  ]),
                  e("td", Ve, n(p(M)(a.date)), 1),
                  e("td", {
                    class: w(["ta-r mono-sm", a.amount < 0 ? "red" : ""])
                  }, n(h(a.amount)), 3),
                  e("td", Ge, n(a.outstanding ? h(a.outstanding) : "—"), 1),
                  e("td", null, [
                    e("span", Ke, n(a.status || (a.docstatus === 2 ? "Cancelled" : a.docstatus === 0 ? "Draft" : "Submitted")), 1)
                  ])
                ]))), 128)),
                x.value.length ? c("", !0) : (i(), l("tr", Ye, [...t[31] || (t[31] = [
                  e("td", {
                    colspan: "6",
                    class: "cp-empty"
                  }, "No activity yet", -1)
                ])]))
              ])
            ])
          ])) : (i(), l("div", qe, [
            e("table", Xe, [
              e("thead", null, [
                e("tr", null, [
                  t[33] || (t[33] = e("th", null, "Document #", -1)),
                  t[34] || (t[34] = e("th", null, "Date", -1)),
                  t[35] || (t[35] = e("th", { class: "ta-r" }, "Amount", -1)),
                  k.value === "Invoice" ? (i(), l("th", Je, "Outstanding")) : c("", !0),
                  t[36] || (t[36] = e("th", null, "Status", -1))
                ])
              ]),
              e("tbody", null, [
                (i(!0), l(L, null, R(z.value, (a) => (i(), l("tr", {
                  key: a.name
                }, [
                  e("td", null, [
                    B(q, {
                      doctype: U(a.type),
                      name: a.name
                    }, null, 8, ["doctype", "name"])
                  ]),
                  e("td", We, n(p(M)(a.date)), 1),
                  e("td", {
                    class: w(["ta-r mono-sm", a.amount < 0 ? "red" : ""])
                  }, n(h(Math.abs(a.amount))), 3),
                  k.value === "Invoice" ? (i(), l("td", Qe, n(a.outstanding ? h(a.outstanding) : "—"), 1)) : c("", !0),
                  e("td", null, [
                    e("span", Ze, n(a.status || (a.docstatus === 2 ? "Cancelled" : a.docstatus === 0 ? "Draft" : "Submitted")), 1)
                  ])
                ]))), 128)),
                z.value.length ? c("", !0) : (i(), l("tr", ts, [
                  e("td", {
                    colspan: k.value === "Invoice" ? 5 : 4,
                    class: "cp-empty"
                  }, "No " + n(k.value.toLowerCase()) + "s yet", 9, es)
                ]))
              ])
            ])
          ]))
        ])
      ]);
    };
  }
}, rs = /* @__PURE__ */ dt(ss, [["__scopeId", "data-v-6371b7f8"]]);
export {
  rs as default
};
