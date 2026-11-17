import { _ as Ye, y as We, z as Q, h as r, o as ke, f as T, c as o, a as t, w as S, B as z, F as _, r as A, d as g, b as u, E as C, D as se, x as B, t as i, n as Y, v as Xe, u as W, J as Ze, e as et, g as b, a7 as Ce, as as tt, a8 as st, M as at, L as lt, V as nt, j as ot, Y as it, k as n } from "./main-aC8p0ain.js";
import { D as ae } from "./DocLink-BNaIWK9a.js";
import { b as xe } from "./format-BcJZDVG4.js";
import { o as we } from "./userNames-DC8Gcq54.js";
import { P as ut } from "./Pagination-CDqYv7KU.js";
import { _ as D } from "./SearchableSelect-C5oTpRJi.js";
import { J as rt } from "./JournalTab-x1SNpidd.js";
const ct = { class: "list-page" }, dt = { class: "sales-toolbar" }, vt = { class: "sales-search" }, pt = ["innerHTML"], ht = { class: "sales-pills" }, mt = ["onClick"], yt = {
  key: 0,
  class: "sales-pill-count"
}, _t = { class: "sales-actions" }, ft = ["disabled"], gt = ["innerHTML"], bt = ["disabled", "title"], kt = ["innerHTML"], Ct = { class: "inv-table-wrap" }, xt = { class: "inv-table inv-desktop-table" }, wt = ["onClick"], Lt = ["onClick"], Vt = ["onClick"], Tt = { key: 2 }, St = ["onClick"], Pt = ["onClick"], $t = ["onClick"], Mt = { style: { display: "flex", gap: "4px", "justify-content": "center" } }, Nt = ["onClick"], Rt = ["innerHTML"], Et = ["onClick"], It = ["innerHTML"], zt = ["onClick"], At = ["innerHTML"], Bt = { key: 0 }, Dt = {
  colspan: "7",
  class: "bk-empty-state"
}, Ht = { class: "bk-empty-inner" }, Ut = ["disabled", "title"], Ot = ["innerHTML"], jt = {
  key: 0,
  style: { padding: "12px 0px 4px" }
}, qt = { class: "inv-drawer-panel inv-drawer-wide lcv-drawer" }, Ft = { class: "inv-dh" }, Jt = { class: "inv-dh-title" }, Gt = {
  key: 0,
  class: "inv-dh-sub"
}, Kt = {
  key: 0,
  style: { "margin-left": "6px" }
}, Qt = { style: { display: "flex", "align-items": "center", gap: "10px" } }, Yt = ["innerHTML"], Wt = { class: "inv-dbody" }, Xt = {
  key: 0,
  class: "shimmer",
  style: { height: "200px", "border-radius": "10px" }
}, Zt = {
  key: 0,
  class: "lcv-notice"
}, es = ["innerHTML"], ts = { key: 0 }, ss = {
  class: "lcv-grid",
  style: { "margin-bottom": "16px" }
}, as = ["disabled"], ls = ["disabled"], ns = {
  key: 1,
  style: { "margin-bottom": "20px" }
}, os = ["disabled"], is = {
  key: 0,
  style: { "margin-left": "10px", "font-size": "12.5px", color: "#9ca3af" }
}, us = {
  key: 2,
  class: "inv-table-wrap",
  style: { "margin-bottom": "8px" }
}, rs = {
  class: "inv-table",
  style: { "font-size": "13px" }
}, cs = {
  key: 0,
  style: { width: "110px" }
}, ds = {
  key: 1,
  style: { width: "36px" }
}, vs = { class: "ta-r" }, ps = ["onUpdate:modelValue", "disabled"], hs = ["onUpdate:modelValue", "disabled"], ms = { key: 0 }, ys = ["onClick"], _s = {
  key: 1,
  class: "c-muted",
  style: { "font-size": "11.5px" }
}, fs = {
  key: 1,
  style: { "text-align": "center" }
}, gs = ["disabled", "onClick"], bs = ["innerHTML"], ks = {
  key: 3,
  class: "lcv-empty-box"
}, Cs = ["innerHTML"], xs = {
  key: 5,
  style: { "font-size": "11.5px", color: "#94a3b8", margin: "-4px 0 8px 2px" }
}, ws = { class: "inv-sec-lbl" }, Ls = {
  key: 6,
  class: "inv-table-wrap"
}, Vs = {
  class: "inv-table",
  style: { "font-size": "12.5px" }
}, Ts = {
  key: 0,
  class: "ta-r"
}, Ss = {
  class: "mono-sm",
  style: { "font-size": "11px", color: "#9ca3af" }
}, Ps = { class: "ta-r mono-sm" }, $s = { class: "ta-r mono-sm" }, Ms = { class: "ta-r mono-sm" }, Ns = {
  class: "ta-r mono-sm",
  style: { "font-weight": "700", color: "#1e3a5f" }
}, Rs = {
  class: "ta-r mono-sm",
  style: { "font-weight": "700", color: "#059669" }
}, Es = {
  key: 0,
  class: "ta-r mono-sm"
}, Is = {
  key: 7,
  class: "lcv-empty-box"
}, zs = {
  class: "lcv-grid",
  style: { "margin-top": "20px" }
}, As = {
  class: "mono-sm",
  style: { "font-size": "14px", "font-weight": "700" }
}, Bs = {
  class: "mono-sm",
  style: { "font-size": "14px", "font-weight": "700", color: "#1e3a5f" }
}, Ds = { key: 0 }, Hs = {
  class: "mono-sm",
  style: { "font-size": "14px", "font-weight": "700", color: "#059669" }
}, Us = { style: { "margin-top": "18px" } }, Os = ["disabled"], js = {
  key: 2,
  class: "inv-view-footer"
}, qs = { class: "inv-dfooter" }, Fs = { style: { display: "flex", gap: "8px", "flex-wrap": "wrap" } }, Js = ["disabled", "title"], Gs = ["disabled", "title"], Ks = ["disabled", "title"], Qs = { style: { display: "flex", gap: "8px" } }, Ys = ["disabled", "title"], Le = "psd_books.inventory.landed_cost_engine.", Ws = {
  __name: "LandedCostVoucher",
  setup(Xs) {
    const f = nt(), P = ot(), { toast: v } = We();
    function le(s) {
      const e = Number(s);
      return isNaN(e) ? 0 : e;
    }
    function Ve() {
      const s = /* @__PURE__ */ new Date(), e = (l) => String(l).padStart(2, "0");
      return `${s.getFullYear()}-${e(s.getMonth() + 1)}-${e(s.getDate())}`;
    }
    const $ = r(!1), M = r([]), N = r(""), x = r(""), H = r(1), U = r(20), Te = [
      { key: "", label: "All" },
      { key: "draft", label: "Draft" },
      { key: "submitted", label: "Submitted" },
      { key: "cancelled", label: "Cancelled" }
    ], Se = b(() => ({
      draft: M.value.filter((s) => s.docstatus === 0).length,
      submitted: M.value.filter((s) => s.docstatus === 1).length,
      cancelled: M.value.filter((s) => s.docstatus === 2).length
    }));
    async function L() {
      $.value = !0;
      try {
        const e = await T("Landed Cost Voucher", { fields: ["name", "posting_date", "purchase_receipt", "purchase_invoice", "distribution_method", "total_charges", "total_capitalized_amount", "docstatus", "modified"], limit: 1e5, order: "modified desc" });
        M.value = e || [];
      } catch (s) {
        v("Could not load Landed Cost Vouchers: " + s.message, "error");
      }
      $.value = !1;
    }
    const O = b(() => {
      let s = M.value;
      x.value === "draft" ? s = s.filter((l) => l.docstatus === 0) : x.value === "submitted" ? s = s.filter((l) => l.docstatus === 1) : x.value === "cancelled" && (s = s.filter((l) => l.docstatus === 2));
      const e = N.value.toLowerCase().trim();
      return e && (s = s.filter(
        (l) => (l.name || "").toLowerCase().includes(e) || (l.purchase_receipt || "").toLowerCase().includes(e) || (l.purchase_invoice || "").toLowerCase().includes(e)
      )), s;
    }), Pe = b(() => {
      const s = (H.value - 1) * U.value;
      return O.value.slice(s, s + U.value);
    });
    Q([N, x], () => {
      H.value = 1;
    });
    function ne(s) {
      return s.docstatus === 1 ? "Submitted" : s.docstatus === 2 ? "Cancelled" : "Draft";
    }
    function oe(s) {
      return s.docstatus === 1 ? "status-submitted" : s.docstatus === 2 ? "status-cancelled" : "status-draft";
    }
    const V = r(!1), w = r(null), h = b(() => w.value === null), X = r(!1), R = r(!1), j = r(!1), q = r(!1), F = r(!1), J = r(!1), G = r(!1), d = b(() => !h.value && a.value.docstatus !== 0);
    function Z() {
      return {
        doctype: "Landed Cost Voucher",
        posting_date: Ve(),
        distribution_method: "By Value",
        purchase_receipt: "",
        purchase_invoice: "",
        items: [],
        charges: [],
        total_purchase_amount: 0,
        total_charges: 0,
        total_capitalized_amount: 0,
        remarks: "",
        docstatus: 0
      };
    }
    const a = r(Z()), ie = r([]), $e = b(
      () => ie.value.map((s) => ({ value: s.name, label: s.account_name || s.name }))
    ), ue = r([]), Me = b(
      () => ue.value.map((s) => ({ value: s.name, label: s.account_name || s.name }))
    ), ee = r([]), Ne = b(
      () => ee.value.map((s) => ({ value: s.name, label: s.category_name || s.name }))
    );
    async function Re() {
      try {
        const s = await et();
        ee.value = await T("Expense Category", {
          fields: ["name", "category_name"],
          filters: [["disabled", "=", 0], ["company", "=", s]],
          order_by: "category_name asc",
          limit: 200
        });
      } catch {
        ee.value = [];
      }
    }
    async function Ee() {
      try {
        ie.value = await T("Account", {
          fields: ["name", "account_name", "account_type"],
          filters: [["is_group", "=", 0], ["disabled", "=", 0], ["account_type", "=", "Expense"]],
          limit: 1e5
        });
      } catch {
      }
    }
    async function Ie() {
      try {
        ue.value = await T("Account", {
          fields: ["name", "account_name", "account_type"],
          filters: [["is_group", "=", 0], ["disabled", "=", 0], ["account_type", "in", ["Cash", "Bank"]]],
          limit: 1e5
        });
      } catch {
      }
    }
    function re() {
      w.value = null, a.value = Z(), V.value = !0, f.name !== "landed-cost-vouchers" && P.replace("/purchasing/landed-cost-vouchers");
    }
    function k(s) {
      w.value = s.name, V.value = !0, E(s.name), f.name !== "landed-cost-vouchers" && P.replace("/purchasing/landed-cost-vouchers");
    }
    function te() {
      V.value = !1;
    }
    async function ce() {
      const s = f.params.name;
      if (s === "new") {
        w.value = null, a.value = Z();
        const e = f.query.purchase_receipt || f.query.purchase_invoice;
        f.query.purchase_receipt ? a.value.purchase_receipt = f.query.purchase_receipt : f.query.purchase_invoice && (a.value.purchase_invoice = f.query.purchase_invoice), V.value = !0, e && await K(), P.replace("/purchasing/landed-cost-vouchers");
      } else s && (w.value = s, V.value = !0, E(s), P.replace("/purchasing/landed-cost-vouchers"));
    }
    ke(ce), Q(() => f.params.name, (s, e) => {
      s && s !== e && ce();
    });
    async function E(s) {
      X.value = !0;
      try {
        const e = await it("Landed Cost Voucher", s);
        e.items = e.items || [], e.charges = e.charges || [], a.value = e;
      } catch (e) {
        v("Could not load " + s + ": " + e.message, "error");
      }
      X.value = !1;
    }
    ke(() => {
      L(), Ee(), Ie(), me(), ye(), Re();
    });
    function ze() {
      a.value.charges.push({ description: "", account: "", amount: 0, paid_through: "", expense_type: "" });
    }
    function Ae(s) {
      P.push({ path: "/expenses", query: { view: s } });
    }
    function Be(s) {
      a.value.charges.splice(s, 1), I();
    }
    async function K() {
      const s = a.value.purchase_receipt ? "Purchase Receipt" : a.value.purchase_invoice ? "Purchase Invoice" : null, e = a.value.purchase_receipt || a.value.purchase_invoice;
      if (!s || !e) {
        v("Set a Purchase Receipt or Purchase Invoice first.", "error");
        return;
      }
      J.value = !0;
      try {
        const l = await Ce(Le + "get_landed_cost_preview", {
          source_doctype: s,
          source_name: e,
          charges: JSON.stringify(a.value.charges.map((c) => ({ amount: c.amount }))),
          distribution_method: a.value.distribution_method
        });
        a.value.items = l.items || [], a.value.total_purchase_amount = l.total_purchase_amount || 0, a.value.total_charges = l.total_charges || 0, a.value.charges.length || v("Items pulled. Add charges below to allocate.", "success");
      } catch (l) {
        v("Could not pull items: " + l.message, "error");
      }
      J.value = !1;
    }
    let de = null;
    function I() {
      a.value.items.length && (clearTimeout(de), de = setTimeout(async () => {
        const s = a.value.purchase_receipt ? "Purchase Receipt" : a.value.purchase_invoice ? "Purchase Invoice" : null, e = a.value.purchase_receipt || a.value.purchase_invoice;
        if (!(!s || !e)) {
          G.value = !0;
          try {
            const l = await Ce(Le + "get_landed_cost_preview", {
              source_doctype: s,
              source_name: e,
              charges: JSON.stringify(a.value.charges.map((p) => ({ amount: p.amount }))),
              distribution_method: a.value.distribution_method
            }), c = l.items || [];
            c.length === a.value.items.length && a.value.items.forEach((p, be) => {
              p.allocated_amount = c[be].allocated_amount, p.new_valuation_rate = c[be].new_valuation_rate;
            }), a.value.total_charges = l.total_charges || 0;
          } catch {
          }
          G.value = !1;
        }
      }, 400));
    }
    Q(() => a.value.charges.map((s) => s.amount).join(","), I), Q(() => a.value.distribution_method, I);
    const ve = r([]), pe = r([]);
    function he(s) {
      const e = [s.name];
      return s.supplier && e.push(s.supplier), s.posting_date && e.push(s.posting_date), e.join(" • ");
    }
    const De = b(() => ve.value.map((s) => ({ value: s.name, label: he(s) }))), He = b(() => pe.value.map((s) => ({ value: s.name, label: he(s) })));
    async function me(s = "") {
      try {
        const e = [["docstatus", "=", 1]];
        s && e.push(["name", "like", "%" + s + "%"]), ve.value = await T("Purchase Receipt", {
          fields: ["name", "supplier", "posting_date"],
          filters: e,
          limit: 50,
          order: "posting_date desc"
        });
      } catch {
      }
    }
    async function ye(s = "") {
      try {
        const e = [["docstatus", "=", 1]];
        s && e.push(["name", "like", "%" + s + "%"]), pe.value = await T("Purchase Invoice", {
          fields: ["name", "supplier", "posting_date"],
          filters: e,
          limit: 50,
          order: "posting_date desc"
        });
      } catch {
      }
    }
    let _e = null;
    function Ue(s) {
      clearTimeout(_e), _e = setTimeout(() => me(s), 250);
    }
    let fe = null;
    function Oe(s) {
      clearTimeout(fe), fe = setTimeout(() => ye(s), 250);
    }
    function ge() {
      a.value.items = [], a.value.charges = [], a.value.total_purchase_amount = 0, a.value.total_charges = 0;
    }
    async function je(s) {
      s ? (a.value.purchase_invoice = "", await K()) : ge();
    }
    async function qe(s) {
      s ? (a.value.purchase_receipt = "", await K()) : ge();
    }
    async function Fe() {
      if (!a.value.purchase_receipt && !a.value.purchase_invoice) {
        v("Set a Purchase Receipt or Purchase Invoice.", "error");
        return;
      }
      if (!a.value.items.length) {
        v("Pull items from the source document first.", "error");
        return;
      }
      if (!a.value.charges.length) {
        v("Add at least one charge.", "error");
        return;
      }
      if (a.value.charges.find((e) => !(e.reference_doctype && e.reference_name) && !e.paid_through)) {
        v("Every charge needs a Paid Through account (or must already be linked to a Bill/Journal Entry).", "error");
        return;
      }
      R.value = !0;
      try {
        const e = await lt(a.value);
        a.value = e, w.value = e.name, v("Saved.", "success"), L();
      } catch (e) {
        v("Save failed: " + e.message, "error");
      }
      R.value = !1;
    }
    async function Je() {
      j.value = !0;
      try {
        await at("Landed Cost Voucher", a.value.name), v("Submitted — charges capitalized into stock value.", "success"), await E(a.value.name), L();
      } catch (s) {
        v("Submit failed: " + s.message, "error");
      }
      j.value = !1;
    }
    async function Ge() {
      if (confirm(`Cancel ${a.value.name}? This reverses the stock valuation and GL entries.`)) {
        q.value = !0;
        try {
          await st("Landed Cost Voucher", a.value.name), v("Cancelled.", "success"), await E(a.value.name), L();
        } catch (s) {
          v("Cancel failed: " + s.message, "error");
        }
        q.value = !1;
      }
    }
    async function Ke() {
      F.value = !0;
      try {
        const s = await tt("Landed Cost Voucher", a.value.name);
        v("Amendment created.", "success"), w.value = s.name, await E(s.name), L();
      } catch (s) {
        v("Amend failed: " + s.message, "error");
      }
      F.value = !1;
    }
    function m(s) {
      return s == null || isNaN(s) ? "KES 0.00" : "KES " + Number(s).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    const Qe = {
      plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
      trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
      search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>',
      check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
      eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
      edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
      refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>',
      x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
    };
    function y(s, e) {
      return (Qe[s] || "").replace("<svg ", `<svg width="${e}" height="${e}" `);
    }
    return (s, e) => (n(), o("div", ct, [
      t("div", dt, [
        t("div", vt, [
          t("span", {
            innerHTML: y("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, pt),
          S(t("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (l) => N.value = l),
            placeholder: "Search by voucher no, PR or PI…",
            class: "sales-search-input"
          }, null, 512), [
            [z, N.value]
          ])
        ]),
        t("div", ht, [
          (n(), o(_, null, A(Te, (l) => t("button", {
            key: l.key,
            class: Y(["sales-pill", { active: x.value === l.key }]),
            onClick: (c) => x.value = l.key
          }, [
            g(i(l.label), 1),
            l.key ? (n(), o("span", yt, i(Se.value[l.key]), 1)) : u("", !0)
          ], 10, mt)), 64))
        ]),
        t("div", _t, [
          t("button", {
            class: "sales-btn-ghost",
            onClick: L,
            title: "Refresh",
            disabled: $.value
          }, [
            t("span", {
              innerHTML: y("refresh", 14)
            }, null, 8, gt)
          ], 8, ft),
          t("button", {
            class: "sales-btn-primary",
            disabled: !s.$canCreate("bills"),
            title: s.$canCreate("bills") ? "" : "Read-only access",
            onClick: re
          }, [
            t("span", {
              innerHTML: y("plus", 13)
            }, null, 8, kt),
            e[12] || (e[12] = g(" New Voucher ", -1))
          ], 8, bt)
        ])
      ]),
      t("div", Ct, [
        t("table", xt, [
          e[20] || (e[20] = t("thead", null, [
            t("tr", null, [
              t("th", null, "DATE"),
              t("th", null, "VOUCHER#"),
              t("th", null, "SOURCE DOC"),
              t("th", null, "DISTRIBUTION"),
              t("th", { class: "ta-r" }, "CHARGES"),
              t("th", null, "STATUS"),
              t("th", { style: { width: "120px", "text-align": "center" } }, "ACTIONS")
            ])
          ], -1)),
          t("tbody", null, [
            $.value ? (n(), o(_, { key: 0 }, A(6, (l) => t("tr", {
              key: l,
              class: "shimmer-row"
            }, [...e[13] || (e[13] = [
              t("td", null, [
                t("div", {
                  class: "shimmer",
                  style: { width: "80px" }
                })
              ], -1),
              t("td", null, [
                t("div", {
                  class: "shimmer",
                  style: { width: "110px" }
                })
              ], -1),
              t("td", null, [
                t("div", {
                  class: "shimmer",
                  style: { width: "120px" }
                })
              ], -1),
              t("td", null, [
                t("div", {
                  class: "shimmer",
                  style: { width: "90px" }
                })
              ], -1),
              t("td", null, [
                t("div", {
                  class: "shimmer",
                  style: { width: "80px", "margin-left": "auto" }
                })
              ], -1),
              t("td", null, [
                t("div", {
                  class: "shimmer",
                  style: { width: "70px" }
                })
              ], -1),
              t("td", null, null, -1)
            ])])), 64)) : (n(), o(_, { key: 1 }, [
              (n(!0), o(_, null, A(Pe.value, (l) => (n(), o("tr", {
                key: l.name,
                class: "inv-row"
              }, [
                t("td", {
                  onClick: (c) => k(l),
                  class: "text-muted mono-sm"
                }, i(l.posting_date), 9, wt),
                t("td", {
                  onClick: (c) => k(l)
                }, [
                  C(ae, {
                    doctype: "Landed Cost Voucher",
                    name: l.name
                  }, null, 8, ["name"])
                ], 8, Lt),
                t("td", {
                  onClick: (c) => k(l),
                  class: "mono-sm"
                }, [
                  l.purchase_receipt ? (n(), se(ae, {
                    key: 0,
                    doctype: "Purchase Receipt",
                    name: l.purchase_receipt,
                    onClick: e[1] || (e[1] = B(() => {
                    }, ["stop"]))
                  }, null, 8, ["name"])) : l.purchase_invoice ? (n(), se(ae, {
                    key: 1,
                    doctype: "Purchase Invoice",
                    name: l.purchase_invoice,
                    onClick: e[2] || (e[2] = B(() => {
                    }, ["stop"]))
                  }, null, 8, ["name"])) : (n(), o("span", Tt, "—"))
                ], 8, Vt),
                t("td", {
                  onClick: (c) => k(l)
                }, i(l.distribution_method || "—"), 9, St),
                t("td", {
                  onClick: (c) => k(l),
                  class: "ta-r mono-sm"
                }, i(m(l.total_charges)), 9, Pt),
                t("td", {
                  onClick: (c) => k(l)
                }, [
                  t("span", {
                    class: Y(["inv-status-badge", oe(l)])
                  }, i(ne(l)), 3)
                ], 8, $t),
                t("td", {
                  style: { "text-align": "center" },
                  onClick: e[3] || (e[3] = B(() => {
                  }, ["stop"]))
                }, [
                  t("div", Mt, [
                    t("button", {
                      class: "inv-act-btn",
                      onClick: (c) => k(l),
                      title: "View"
                    }, [
                      t("span", {
                        innerHTML: y("eye", 13)
                      }, null, 8, Rt)
                    ], 8, Nt),
                    l.docstatus === 0 ? (n(), o("button", {
                      key: 0,
                      class: "inv-act-btn",
                      onClick: (c) => k(l),
                      title: "Edit"
                    }, [
                      t("span", {
                        innerHTML: y("edit", 13)
                      }, null, 8, It)
                    ], 8, Et)) : u("", !0),
                    l.docstatus === 2 ? (n(), o("button", {
                      key: 1,
                      class: "inv-act-btn",
                      onClick: (c) => k(l),
                      title: "Amend"
                    }, [
                      t("span", {
                        innerHTML: y("refresh", 13)
                      }, null, 8, At)
                    ], 8, zt)) : u("", !0)
                  ])
                ])
              ]))), 128)),
              O.value.length ? u("", !0) : (n(), o("tr", Bt, [
                t("td", Dt, [
                  t("div", Ht, [
                    N.value || x.value ? (n(), o(_, { key: 0 }, [
                      e[14] || (e[14] = t("svg", {
                        width: "44",
                        height: "44",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "#cbd5e1",
                        "stroke-width": "1.3"
                      }, [
                        t("circle", {
                          cx: "11",
                          cy: "11",
                          r: "8"
                        }),
                        t("line", {
                          x1: "21",
                          y1: "21",
                          x2: "16.65",
                          y2: "16.65"
                        })
                      ], -1)),
                      e[15] || (e[15] = t("p", { class: "bk-empty-title" }, "No vouchers match your filters", -1))
                    ], 64)) : (n(), o(_, { key: 1 }, [
                      e[17] || (e[17] = t("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "📦", -1)),
                      e[18] || (e[18] = t("p", { class: "bk-empty-title" }, "No Landed Cost Vouchers created yet", -1)),
                      e[19] || (e[19] = t("p", { class: "bk-empty-sub" }, "Capitalize freight and transport charges into stock value.", -1)),
                      t("button", {
                        class: "bk-empty-btn",
                        disabled: !s.$canCreate("bills"),
                        title: s.$canCreate("bills") ? "" : "Read-only access",
                        onClick: re
                      }, [
                        t("span", {
                          innerHTML: y("plus", 13)
                        }, null, 8, Ot),
                        e[16] || (e[16] = g(" New Voucher", -1))
                      ], 8, Ut)
                    ], 64))
                  ])
                ])
              ]))
            ], 64))
          ])
        ])
      ]),
      !$.value && O.value.length ? (n(), o("div", jt, [
        C(ut, {
          page: H.value,
          "onUpdate:page": e[4] || (e[4] = (l) => H.value = l),
          "page-size": U.value,
          "onUpdate:pageSize": e[5] || (e[5] = (l) => U.value = l),
          "total-items": O.value.length
        }, null, 8, ["page", "page-size", "total-items"])
      ])) : u("", !0),
      (n(), se(Ze, { to: "body" }, [
        V.value ? (n(), o("div", {
          key: 0,
          class: "inv-drawer-bg",
          onClick: B(te, ["self"])
        }, [
          t("div", qt, [
            t("div", Ft, [
              t("div", null, [
                t("div", Jt, i(h.value ? "New Landed Cost Voucher" : a.value.name), 1),
                h.value ? u("", !0) : (n(), o("div", Gt, [
                  g(i(a.value.posting_date), 1),
                  a.value.posting_time ? (n(), o("span", Kt, i(String(a.value.posting_time).slice(0, 8)), 1)) : u("", !0),
                  g(" • " + i(a.value.purchase_receipt || a.value.purchase_invoice || "No source"), 1)
                ]))
              ]),
              t("div", Qt, [
                h.value ? u("", !0) : (n(), o("span", {
                  key: 0,
                  class: Y(["inv-status-badge", oe(a.value)])
                }, i(ne(a.value)), 3)),
                t("button", {
                  class: "inv-dclose",
                  onClick: te
                }, [
                  t("span", {
                    innerHTML: y("x", 16)
                  }, null, 8, Yt)
                ])
              ])
            ]),
            t("div", Wt, [
              X.value ? (n(), o("div", Xt)) : (n(), o(_, { key: 1 }, [
                a.value.docstatus === 1 ? (n(), o("div", Zt, [
                  t("span", {
                    innerHTML: y("check", 14)
                  }, null, 8, es),
                  g(" Submitted — " + i(m(a.value.total_capitalized_amount)) + " of " + i(m(a.value.total_charges)) + " in charges has been capitalized into stock value. ", 1),
                  le(a.value.total_capitalized_amount) < le(a.value.total_charges) ? (n(), o("span", ts, " The remainder stays booked as a period expense (some received stock was already issued before this voucher was submitted). ")) : u("", !0)
                ])) : u("", !0),
                e[44] || (e[44] = t("div", { class: "inv-sec-lbl" }, "Source Document", -1)),
                t("div", ss, [
                  t("div", null, [
                    e[21] || (e[21] = t("label", { class: "inv-lbl" }, "Posting Date", -1)),
                    S(t("input", {
                      class: "inv-fi",
                      type: "date",
                      "onUpdate:modelValue": e[6] || (e[6] = (l) => a.value.posting_date = l),
                      disabled: d.value
                    }, null, 8, as), [
                      [z, a.value.posting_date]
                    ])
                  ]),
                  t("div", null, [
                    e[23] || (e[23] = t("label", { class: "inv-lbl" }, "Distribution Method", -1)),
                    S(t("select", {
                      class: "inv-fi",
                      "onUpdate:modelValue": e[7] || (e[7] = (l) => a.value.distribution_method = l),
                      disabled: d.value,
                      onChange: I
                    }, [...e[22] || (e[22] = [
                      t("option", { value: "By Value" }, "By Value", -1),
                      t("option", { value: "By Qty" }, "By Qty", -1)
                    ])], 40, ls), [
                      [Xe, a.value.distribution_method]
                    ])
                  ]),
                  t("div", null, [
                    e[24] || (e[24] = t("label", { class: "inv-lbl" }, "Purchase Receipt", -1)),
                    C(D, {
                      modelValue: a.value.purchase_receipt,
                      "onUpdate:modelValue": [
                        e[8] || (e[8] = (l) => a.value.purchase_receipt = l),
                        je
                      ],
                      options: De.value,
                      placeholder: "— Select Purchase Receipt —",
                      disabled: d.value || !!a.value.purchase_invoice,
                      onSearch: Ue
                    }, null, 8, ["modelValue", "options", "disabled"])
                  ]),
                  t("div", null, [
                    e[25] || (e[25] = t("label", { class: "inv-lbl" }, "Purchase Invoice", -1)),
                    C(D, {
                      modelValue: a.value.purchase_invoice,
                      "onUpdate:modelValue": [
                        e[9] || (e[9] = (l) => a.value.purchase_invoice = l),
                        qe
                      ],
                      options: He.value,
                      placeholder: "— Select Purchase Invoice —",
                      disabled: d.value || !!a.value.purchase_receipt,
                      onSearch: Oe
                    }, null, 8, ["modelValue", "options", "disabled"])
                  ])
                ]),
                d.value ? u("", !0) : (n(), o("div", ns, [
                  t("button", {
                    class: "sales-btn-ghost",
                    onClick: K,
                    disabled: J.value || !a.value.purchase_receipt && !a.value.purchase_invoice
                  }, i(J.value ? "Pulling…" : "⇩ Pull Items from Source"), 9, os),
                  !a.value.items.length && (a.value.purchase_receipt || a.value.purchase_invoice) ? (n(), o("span", is, " Pull items to build the allocation, then add charges below. ")) : u("", !0)
                ])),
                e[45] || (e[45] = t("div", { class: "inv-sec-lbl" }, "Charges", -1)),
                a.value.charges.length ? (n(), o("div", us, [
                  t("table", rs, [
                    t("thead", null, [
                      t("tr", null, [
                        e[26] || (e[26] = t("th", { style: { width: "220px" } }, "Expense Account", -1)),
                        e[27] || (e[27] = t("th", {
                          class: "ta-r",
                          style: { width: "120px" }
                        }, "Amount", -1)),
                        e[28] || (e[28] = t("th", null, "Description (optional)", -1)),
                        e[29] || (e[29] = t("th", { style: { width: "200px" } }, "Paid Through", -1)),
                        e[30] || (e[30] = t("th", { style: { width: "150px" } }, "Expense Type", -1)),
                        d.value ? (n(), o("th", cs, "Expense")) : u("", !0),
                        d.value ? u("", !0) : (n(), o("th", ds))
                      ])
                    ]),
                    t("tbody", null, [
                      (n(!0), o(_, null, A(a.value.charges, (l, c) => (n(), o("tr", { key: c }, [
                        t("td", null, [
                          C(D, {
                            modelValue: l.account,
                            "onUpdate:modelValue": (p) => l.account = p,
                            options: $e.value,
                            placeholder: "— Select expense account —",
                            disabled: d.value,
                            compact: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"])
                        ]),
                        t("td", vs, [
                          S(t("input", {
                            class: "inv-fi mono-sm",
                            type: "number",
                            min: "0",
                            step: "any",
                            "onUpdate:modelValue": (p) => l.amount = p,
                            disabled: d.value,
                            onChange: I,
                            style: { width: "110px", "text-align": "right" }
                          }, null, 40, ps), [
                            [
                              z,
                              l.amount,
                              void 0,
                              { number: !0 }
                            ]
                          ])
                        ]),
                        t("td", null, [
                          S(t("input", {
                            class: "inv-fi",
                            "onUpdate:modelValue": (p) => l.description = p,
                            disabled: d.value,
                            placeholder: "e.g. Inward Freight — KPN Logistics"
                          }, null, 8, hs), [
                            [z, l.description]
                          ])
                        ]),
                        t("td", null, [
                          C(D, {
                            modelValue: l.paid_through,
                            "onUpdate:modelValue": (p) => l.paid_through = p,
                            options: Me.value,
                            placeholder: "— Cash/Bank —",
                            disabled: d.value || !!(l.reference_doctype && l.reference_name),
                            compact: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"])
                        ]),
                        t("td", null, [
                          C(D, {
                            modelValue: l.expense_type,
                            "onUpdate:modelValue": (p) => l.expense_type = p,
                            options: Ne.value,
                            placeholder: "— Category —",
                            disabled: d.value,
                            compact: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"])
                        ]),
                        d.value ? (n(), o("td", ms, [
                          l.reference_doctype === "Expense" && l.reference_name ? (n(), o("a", {
                            key: 0,
                            href: "#",
                            class: "mono-sm",
                            style: { color: "#3B5BDB", "font-weight": "600" },
                            onClick: B((p) => Ae(l.reference_name), ["prevent"])
                          }, i(l.reference_name), 9, ys)) : (n(), o("span", _s, i(l.reference_doctype ? l.reference_doctype + " " + l.reference_name : "—"), 1))
                        ])) : u("", !0),
                        d.value ? u("", !0) : (n(), o("td", fs, [
                          t("button", {
                            class: "inv-act-btn",
                            style: { color: "#dc2626" },
                            disabled: !(h.value ? s.$canCreate("bills") : s.$canEdit("bills")),
                            onClick: (p) => Be(c)
                          }, [
                            t("span", {
                              innerHTML: y("trash", 13)
                            }, null, 8, bs)
                          ], 8, gs)
                        ]))
                      ]))), 128))
                    ])
                  ])
                ])) : (n(), o("div", ks, "No charges added yet.")),
                d.value ? u("", !0) : (n(), o("div", {
                  key: 4,
                  class: Y(["lcv-add-row", { disabled: !(h.value ? s.$canCreate("bills") : s.$canEdit("bills")) }]),
                  onClick: e[10] || (e[10] = (l) => (h.value ? s.$canCreate("bills") : s.$canEdit("bills")) && ze())
                }, [
                  t("span", {
                    innerHTML: y("plus", 13)
                  }, null, 8, Cs),
                  e[31] || (e[31] = g(" Add Charge ", -1))
                ], 2)),
                !d.value && a.value.charges.length ? (n(), o("div", xs, " Paid Through is required unless this charge is already booked on another document (Bill/Journal Entry) — on submit, a new Expense entry is auto-created for it and then reclassified into stock value. ")) : u("", !0),
                t("div", ws, "Item Allocation " + i(G.value ? "(recalculating…)" : ""), 1),
                a.value.items.length ? (n(), o("div", Ls, [
                  t("table", Vs, [
                    t("thead", null, [
                      t("tr", null, [
                        e[32] || (e[32] = t("th", null, "Item", -1)),
                        e[33] || (e[33] = t("th", null, "Warehouse", -1)),
                        e[34] || (e[34] = t("th", { class: "ta-r" }, "Qty", -1)),
                        e[35] || (e[35] = t("th", { class: "ta-r" }, "Purchase Amt", -1)),
                        e[36] || (e[36] = t("th", { class: "ta-r" }, "Old Rate", -1)),
                        e[37] || (e[37] = t("th", { class: "ta-r" }, "Allocated", -1)),
                        e[38] || (e[38] = t("th", { class: "ta-r" }, "New Rate", -1)),
                        a.value.docstatus === 1 ? (n(), o("th", Ts, "Capitalized")) : u("", !0)
                      ])
                    ]),
                    t("tbody", null, [
                      (n(!0), o(_, null, A(a.value.items, (l, c) => (n(), o("tr", { key: c }, [
                        t("td", null, [
                          g(i(l.item_name || l.item_code), 1),
                          t("div", Ss, i(l.item_code), 1)
                        ]),
                        t("td", null, i(l.warehouse), 1),
                        t("td", Ps, i(l.received_qty), 1),
                        t("td", $s, i(m(l.purchase_amount)), 1),
                        t("td", Ms, i(m(l.valuation_rate)), 1),
                        t("td", Ns, i(m(l.allocated_amount)), 1),
                        t("td", Rs, i(m(l.new_valuation_rate)), 1),
                        a.value.docstatus === 1 ? (n(), o("td", Es, i(m(l.capitalized_amount)), 1)) : u("", !0)
                      ]))), 128))
                    ])
                  ])
                ])) : (n(), o("div", Is, "Pull items from a source document to see the allocation.")),
                t("div", zs, [
                  t("div", null, [
                    e[39] || (e[39] = t("div", { class: "inv-lbl" }, "Total Purchase Amount", -1)),
                    t("div", As, i(m(a.value.total_purchase_amount)), 1)
                  ]),
                  t("div", null, [
                    e[40] || (e[40] = t("div", { class: "inv-lbl" }, "Total Charges", -1)),
                    t("div", Bs, i(m(a.value.total_charges)), 1)
                  ]),
                  a.value.docstatus === 1 ? (n(), o("div", Ds, [
                    e[41] || (e[41] = t("div", { class: "inv-lbl" }, "Total Capitalized", -1)),
                    t("div", Hs, i(m(a.value.total_capitalized_amount)), 1)
                  ])) : u("", !0)
                ]),
                t("div", Us, [
                  e[42] || (e[42] = t("label", { class: "inv-lbl" }, "Remarks", -1)),
                  S(t("textarea", {
                    class: "inv-fi",
                    "onUpdate:modelValue": e[11] || (e[11] = (l) => a.value.remarks = l),
                    disabled: d.value,
                    rows: "2"
                  }, null, 8, Os), [
                    [z, a.value.remarks]
                  ])
                ]),
                !h.value && a.value.docstatus === 1 ? (n(), o(_, { key: 8 }, [
                  e[43] || (e[43] = t("div", {
                    class: "inv-sec-lbl",
                    style: { "margin-top": "18px" }
                  }, "Journal", -1)),
                  C(rt, {
                    "voucher-type": "Landed Cost Voucher",
                    "voucher-no": a.value.name,
                    label: "Landed Cost Voucher",
                    currency: a.value.currency || "INR"
                  }, null, 8, ["voucher-no", "currency"])
                ], 64)) : u("", !0)
              ], 64)),
              !h.value && a.value.owner ? (n(), o("div", js, [
                g(" Created by " + i(W(we)(a.value.owner)) + " on " + i(W(xe)(a.value.creation)) + " ", 1),
                a.value.modified_by ? (n(), o(_, { key: 0 }, [
                  g(" · Last modified by " + i(W(we)(a.value.modified_by)) + " on " + i(W(xe)(a.value.modified)), 1)
                ], 64)) : u("", !0)
              ])) : u("", !0)
            ]),
            t("div", qs, [
              t("div", Fs, [
                !h.value && a.value.docstatus === 2 ? (n(), o("button", {
                  key: 0,
                  class: "sales-btn-ghost",
                  disabled: F.value || !s.$canCreate("bills"),
                  title: s.$canCreate("bills") ? "" : "Read-only access",
                  onClick: Ke
                }, i(F.value ? "Amending…" : "Amend"), 9, Js)) : u("", !0),
                !h.value && a.value.docstatus === 1 ? (n(), o("button", {
                  key: 1,
                  class: "sales-btn-ghost",
                  style: { color: "#dc2626" },
                  disabled: q.value || !s.$canDelete("bills"),
                  title: s.$canDelete("bills") ? "" : "Not permitted",
                  onClick: Ge
                }, i(q.value ? "Cancelling…" : "Cancel Voucher"), 9, Gs)) : u("", !0),
                !h.value && a.value.docstatus === 0 ? (n(), o("button", {
                  key: 2,
                  class: "sales-btn-primary",
                  disabled: j.value || R.value || !s.$canEdit("bills"),
                  title: s.$canEdit("bills") ? "" : "Read-only access",
                  onClick: Je
                }, i(j.value ? "Submitting…" : "Submit"), 9, Ks)) : u("", !0)
              ]),
              t("div", Qs, [
                t("button", {
                  class: "add-btn-cancel",
                  onClick: te
                }, "Close"),
                d.value === !1 ? (n(), o("button", {
                  key: 0,
                  class: "add-btn-draft",
                  disabled: R.value || G.value || !(h.value ? s.$canCreate("bills") : s.$canEdit("bills")),
                  title: (h.value ? s.$canCreate("bills") : s.$canEdit("bills")) ? "" : "Read-only access",
                  onClick: Fe
                }, i(R.value ? "Saving…" : h.value ? "Save" : "Save Changes"), 9, Ys)) : u("", !0)
              ])
            ])
          ])
        ])) : u("", !0)
      ]))
    ]));
  }
}, oa = /* @__PURE__ */ Ye(Ws, [["__scopeId", "data-v-d554cd7a"]]);
export {
  oa as default
};
