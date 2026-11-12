import { _ as d, k as r, C as m, E as k, ae as i, q as h, n as l, c as y, g as f, Y as g, d as c, t as u } from "./main-Cij9_Vxg.js";
/* empty css                                                                 */
const v = {
  __name: "DocLink",
  props: {
    /** Frappe doctype name, e.g. "Sales Invoice" */
    doctype: { type: String, required: !0 },
    /** Record name, e.g. "INV-2026-00072" */
    name: { type: String, default: "" },
    /** Style toggle — true → monospace blue (default); false → inherit parent style */
    monoStyle: { type: Boolean, default: !0 }
  },
  setup(t) {
    const n = t, p = {
      "Sales Invoice": "list:/invoices",
      "Purchase Invoice": "list:/purchases",
      Quotation: "list:/quotes",
      "Sales Order": "list:/sales-orders",
      "Purchase Order": "list:/purchase-orders",
      "Payment Entry": "list:/payments-received",
      "Bank Transaction": "list:/banking/transactions",
      "Credit Note": "list:/credit-notes",
      "Debit Note": "list:/debit-notes",
      "Delivery Note": "list:/delivery-challans",
      "Purchase Receipt": "list:/purchase-receipts",
      "QC Inspection": "list:/quality/inspections",
      "Request for Quotation": "list:/rfqs",
      "Auto Repeat": "list:/recurring",
      "E Way Bill": "list:/eway-bills",
      Customer: "path:/customers",
      Supplier: "list:/vendors",
      Item: "list:/inventory/items",
      "Journal Entry": "list:/accounting/journal-entries",
      Expense: "list:/expenses",
      "Landed Cost Voucher": "path:/purchasing/landed-cost-vouchers",
      "Stock Entry": "list:/inventory/stock-entries",
      BOM: "path:/manufacturing/bom",
      "Work Order": "path:/manufacturing/work-order",
      "Job Card": "path:/manufacturing/job-card",
      "Packing Slip": "path:/manufacturing/packing-slip",
      "Production Plan": "path:/manufacturing/production-plan",
      "Material Request": "path:/manufacturing/material-request",
      Routing: "path:/manufacturing/routing",
      Workstation: "path:/manufacturing/workstation"
    }, o = f(() => {
      const e = p[n.doctype];
      if (!e || !n.name) return null;
      const [a, s] = e.split(":");
      return a === "path" ? { path: `${s}/${encodeURIComponent(n.name)}` } : { path: s, query: { open: n.name } };
    });
    return (e, a) => {
      const s = g("router-link");
      return o.value ? (r(), m(s, {
        key: 0,
        to: o.value,
        target: "_blank",
        class: l(["doc-link", { mono: t.monoStyle }]),
        onClick: a[0] || (a[0] = h(() => {
        }, ["stop"]))
      }, {
        default: k(() => [
          i(e.$slots, "default", {}, () => [
            c(u(t.name), 1)
          ], !0)
        ]),
        _: 3
      }, 8, ["to", "class"])) : (r(), y("span", {
        key: 1,
        class: l(["doc-link-disabled", { mono: t.monoStyle }])
      }, [
        i(e.$slots, "default", {}, () => [
          c(u(t.name), 1)
        ], !0)
      ], 2));
    };
  }
}, b = /* @__PURE__ */ d(v, [["__scopeId", "data-v-07e9d1da"]]);
export {
  b as D
};
