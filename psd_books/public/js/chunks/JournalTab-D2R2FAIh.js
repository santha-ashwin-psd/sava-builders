import { _ as T, y as k, k as o, c as r, a as s, d as w, t as n, F as _, r as m, h as y, g as v, l as x } from "./main-DvPfzYHr.js";
/* empty css                                                                    */
const S = { class: "jt-wrap" }, D = { class: "jt-currency-note" }, F = { class: "jt-currency-badge" }, B = { class: "jt-doctype-lbl" }, I = {
  key: 0,
  class: "jt-loading"
}, J = {
  key: 1,
  class: "jt-empty"
}, R = {
  key: 2,
  class: "jt-table"
}, q = { class: "jt-acct" }, z = { class: "ta-r" }, A = { class: "ta-r" }, C = { class: "jt-row jt-total" }, E = { class: "ta-r" }, L = { class: "ta-r" }, V = {
  __name: "JournalTab",
  props: {
    /** Frappe voucher_type, e.g. "Sales Invoice", "Purchase Invoice", "Expense", "Payment Entry" */
    voucherType: { type: String, required: !0 },
    /** Voucher document name/id, e.g. "INV-2026-00018" */
    voucherNo: { type: String, required: !0 },
    /** Heading shown above the table, e.g. "Invoice", "Expense" */
    label: { type: String, default: "" },
    currency: { type: String, default: "INR" }
  },
  setup(u) {
    const c = u, i = y([]), d = y(!1);
    function h(e) {
      let t = Number(e.debit || 0), a = Number(e.credit || 0);
      return t < 0 && (a += -t, t = 0), a < 0 && (t += -a, a = 0), { ...e, debit: t, credit: a };
    }
    const p = v(() => i.value.map(h)), b = v(() => p.value.reduce((e, t) => e + t.debit, 0)), f = v(() => p.value.reduce((e, t) => e + t.credit, 0));
    function l(e) {
      return Number(e || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function g(e) {
      if (!e) return "";
      const t = e.lastIndexOf(" - ");
      return t > -1 ? e.slice(0, t) : e;
    }
    async function j() {
      if (!c.voucherType || !c.voucherNo) {
        i.value = [];
        return;
      }
      d.value = !0;
      try {
        const e = await x("psd_books.api.books_data.get_voucher_journal", {
          voucher_type: c.voucherType,
          voucher_no: c.voucherNo
        });
        i.value = e && e.rows || [];
      } catch {
        i.value = [];
      } finally {
        d.value = !1;
      }
    }
    return k(() => [c.voucherType, c.voucherNo], j, { immediate: !0 }), (e, t) => (o(), r("div", S, [
      s("div", D, [
        t[0] || (t[0] = w(" Amount is displayed in your base currency ", -1)),
        s("span", F, n(u.currency), 1)
      ]),
      s("div", B, n(u.label), 1),
      d.value ? (o(), r("div", I, [
        (o(), r(_, null, m(3, (a) => s("div", {
          class: "b-shimmer",
          style: { height: "14px", "margin-bottom": "8px" },
          key: a
        })), 64))
      ])) : i.value.length ? (o(), r("div", R, [
        t[2] || (t[2] = s("div", { class: "jt-row jt-head" }, [
          s("span", null, "Account"),
          s("span", { class: "ta-r" }, "Debit"),
          s("span", { class: "ta-r" }, "Credit")
        ], -1)),
        (o(!0), r(_, null, m(p.value, (a, N) => (o(), r("div", {
          key: N,
          class: "jt-row"
        }, [
          s("span", q, n(g(a.account)), 1),
          s("span", z, n(a.debit ? l(a.debit) : "—"), 1),
          s("span", A, n(a.credit ? l(a.credit) : "—"), 1)
        ]))), 128)),
        s("div", C, [
          t[1] || (t[1] = s("span", null, "Total", -1)),
          s("span", E, n(l(b.value)), 1),
          s("span", L, n(l(f.value)), 1)
        ])
      ])) : (o(), r("div", J, "No journal entries found for this transaction."))
    ]));
  }
}, U = /* @__PURE__ */ T(V, [["__scopeId", "data-v-f0d30809"]]);
export {
  U as J
};
