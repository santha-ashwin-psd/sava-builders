import { _ as nt, x as ot, c as i, a as t, u, i as d, d as p, F as k, r as q, q as le, n as g, t as n, b, w as fe, A as ke, D as ut, a4 as me, p as se, l as dt, g as _, h as f, J as ct, z as he, j as pt, k as r, a9 as _e, O as yt } from "./main-CULz3kda.js";
import { u as bt } from "./usePagination-CVcVDEji.js";
import { P as vt } from "./Pagination-Cxk1YoNH.js";
const ft = { class: "bi-page" }, kt = { class: "bi-head" }, mt = ["innerHTML"], ht = { class: "bi-category-section" }, _t = { class: "bi-category-tabs" }, gt = ["onClick"], xt = ["innerHTML"], qt = { class: "bi-type-row" }, Ct = ["onClick"], wt = ["innerHTML"], Tt = { class: "bi-type-label" }, Mt = { class: "bi-type-req" }, Lt = ["innerHTML"], Et = { class: "bi-stepper" }, It = ["onClick"], St = { class: "bi-step-dot" }, Ht = ["innerHTML"], Rt = { key: 1 }, At = { class: "bi-step-info" }, Ft = { class: "bi-step-label" }, Dt = { class: "bi-step-sub" }, Vt = {
  key: 0,
  class: "bi-card"
}, Bt = { class: "bi-upload-grid" }, Pt = { class: "bi-dropzone-wrap" }, $t = { class: "bi-dz-icon-stack" }, Ot = { class: "bi-dz-upload-badge" }, Nt = ["innerHTML"], zt = ["innerHTML"], Ut = { class: "bi-dz-title" }, jt = { class: "bi-dz-sub" }, Qt = ["innerHTML"], Gt = { class: "bi-secure-note" }, Kt = ["innerHTML"], Wt = { class: "bi-req-panel" }, Yt = { class: "bi-req-panel-title" }, Jt = {
  key: 0,
  class: "bi-req-note"
}, Zt = { class: "bi-req-chip-row" }, Xt = {
  key: 0,
  class: "bi-error-banner"
}, el = ["innerHTML"], tl = { class: "bi-step-actions" }, ll = {
  key: 0,
  class: "bi-step-actions-hint"
}, sl = ["disabled"], al = ["innerHTML"], il = {
  key: 1,
  class: "bi-card"
}, rl = { class: "bi-card-head-row" }, nl = { style: { display: "flex", gap: "8px" } }, ol = ["innerHTML"], ul = { class: "bi-map-grid" }, dl = { class: "bi-map-table-wrap" }, cl = { class: "b-table bi-map-table" }, pl = { class: "bi-map-col" }, yl = { class: "bi-map-sample" }, bl = ["value", "onChange"], vl = { label: "Required fields" }, fl = ["value", "disabled"], kl = { label: "Optional fields" }, ml = ["value", "disabled"], hl = { style: { "text-align": "center", width: "30px" } }, _l = ["innerHTML"], gl = ["innerHTML"], xl = { class: "bi-req-panel" }, ql = { class: "bi-coverage-list" }, Cl = ["innerHTML"], wl = ["innerHTML"], Tl = { class: "bi-coverage-field" }, Ml = { class: "bi-coverage-source" }, Ll = {
  key: 0,
  class: "bi-warn-banner"
}, El = ["innerHTML"], Il = {
  key: 1,
  class: "bi-ok-banner"
}, Sl = ["innerHTML"], Hl = { class: "bi-step-actions" }, Rl = ["innerHTML"], Al = {
  key: 2,
  class: "bi-card",
  style: { padding: "0", overflow: "hidden" }
}, Fl = {
  class: "bi-card-head-row",
  style: { padding: "16px 20px 0" }
}, Dl = ["innerHTML"], Vl = { class: "bi-summary-row" }, Bl = {
  class: "bi-search",
  style: { "margin-left": "auto" }
}, Pl = ["innerHTML"], $l = { class: "bi-table-wrap" }, Ol = { class: "b-table bi-validate-table" }, Nl = { style: { width: "34px" } }, zl = ["checked"], Ul = ["checked", "onChange"], jl = { class: "c-muted" }, Ql = ["title"], Gl = ["innerHTML"], Kl = ["innerHTML"], Wl = ["innerHTML"], Yl = ["innerHTML"], Jl = ["onClick"], Zl = ["onUpdate:modelValue"], Xl = { key: 0 }, es = ["colspan"], ts = { class: "bi-pager" }, ls = { class: "bi-footer-bar" }, ss = { class: "bi-footer-right" }, as = {
  class: "c-muted",
  style: { "font-size": "12.5px" }
}, is = ["disabled", "title"], rs = ["innerHTML"], ns = {
  key: 3,
  class: "bi-card bi-importing"
}, os = { class: "bi-importing-title" }, us = { class: "bi-importing-sub" }, ds = { class: "bi-progress-track" }, cs = {
  key: 4,
  class: "bi-card"
}, ps = { class: "bi-results-grid" }, ys = { class: "bi-result-tile green" }, bs = { class: "bi-result-num" }, vs = { class: "bi-result-tile amber" }, fs = { class: "bi-result-num" }, ks = { class: "bi-result-tile red" }, ms = { class: "bi-result-num" }, hs = {
  key: 0,
  class: "bi-error-section"
}, _s = { class: "bi-card-head-row" }, gs = { style: { "font-size": "12.5px", "font-weight": "700", color: "#C92A2A" } }, xs = ["innerHTML"], qs = { class: "bi-error-list" }, Cs = { class: "bi-error-row" }, ws = { class: "bi-error-msg" }, Ts = { class: "bi-step-actions" }, ge = 40, Ms = {
  __name: "BulkImport",
  setup(Ls) {
    const { toast: xe } = ot(), qe = pt(), ae = [
      { n: 1, label: "Upload", sub: "Upload your CSV file" },
      { n: 2, label: "Map Columns", sub: "Match CSV columns to fields" },
      { n: 3, label: "Validate", sub: "Review and fix issues" },
      { n: 4, label: "Import", sub: "Import your data" },
      { n: 5, label: "Done", sub: "Review summary" }
    ], ie = [
      { key: "Customer", label: "Customers", icon: "users", iconBg: "#eaf1ff", iconColor: "#1a6ef7", route: "/customers", fields: [
        { key: "customer_name", label: "Customer Name", required: !0, type: "text" },
        { key: "customer_type", label: "Customer Type", required: !1, type: "text" },
        { key: "email_id", label: "Email", required: !1, type: "email" },
        { key: "mobile_no", label: "Mobile", required: !1, type: "text" },
        { key: "phone", label: "Phone", required: !1, type: "text" },
        { key: "tax_id", label: "KRA PIN", required: !1, type: "gstin" },
        { key: "city", label: "City", required: !1, type: "text" },
        { key: "state", label: "State", required: !1, type: "text" },
        { key: "country", label: "Country", required: !1, type: "text" },
        { key: "payment_terms", label: "Payment Terms", required: !1, type: "text" }
      ] },
      { key: "Supplier", label: "Vendors", icon: "vendors", iconBg: "#E8F5E9", iconColor: "#2E7D32", route: "/vendors", fields: [
        { key: "supplier_name", label: "Vendor Name", required: !0, type: "text" },
        { key: "supplier_type", label: "Vendor Type", required: !1, type: "text" },
        { key: "email_id", label: "Email", required: !1, type: "email" },
        { key: "mobile_no", label: "Mobile", required: !1, type: "text" },
        { key: "phone", label: "Phone", required: !1, type: "text" },
        { key: "tax_id", label: "KRA PIN", required: !1, type: "gstin" },
        { key: "city", label: "City", required: !1, type: "text" },
        { key: "state", label: "State", required: !1, type: "text" },
        { key: "country", label: "Country", required: !1, type: "text" },
        { key: "payment_terms", label: "Payment Terms", required: !1, type: "text" }
      ] },
      { key: "Item", label: "Items", icon: "box", iconBg: "#E8F5E9", iconColor: "#388E3C", route: "/inventory/items", fields: [
        { key: "item_name", label: "Item Name", required: !0, type: "text" },
        { key: "item_code", label: "Item Code", required: !1, type: "text" },
        { key: "item_group", label: "Item Group", required: !1, type: "text" },
        { key: "item_type", label: "Item Type", required: !1, type: "text" },
        { key: "is_asset_item", label: "Is Asset Item (1/0)", required: !1, type: "text" },
        { key: "stock_uom", label: "Stock UOM", required: !1, type: "text" },
        { key: "description", label: "Description", required: !1, type: "text" },
        { key: "is_purchase_item", label: "Is Purchase Item", required: !1, type: "text" },
        { key: "default_purchase_tax_template", label: "Purchase Tax Template", required: !1, type: "text" },
        { key: "purchase_uom", label: "Purchase UOM", required: !1, type: "text" },
        { key: "purchase_conversion_factor", label: "Stock UOM per 1 Purchase UOM", required: !1, type: "number" }
      ] },
      {
        key: "Sales Invoice",
        label: "Invoices",
        icon: "fileplus",
        iconBg: "#FFF3E0",
        iconColor: "#E65100",
        route: "/invoices",
        note: "One row = one invoice with a single line item.",
        fields: [
          { key: "customer", label: "Customer", required: !0, type: "text" },
          { key: "posting_date", label: "Posting Date", required: !1, type: "date" },
          { key: "due_date", label: "Due Date", required: !1, type: "date" },
          { key: "item_code", label: "Item Code", required: !0, type: "text" },
          { key: "qty", label: "Quantity", required: !1, type: "number" },
          { key: "rate", label: "Rate", required: !1, type: "number" },
          { key: "tax_type", label: "Tax Type", required: !1, type: "text" },
          { key: "tax_rate", label: "Tax Rate %", required: !1, type: "number" },
          { key: "currency", label: "Currency", required: !1, type: "text" },
          { key: "remarks", label: "Remarks", required: !1, type: "text" }
        ]
      },
      {
        key: "Quotation",
        label: "Quotes",
        icon: "quote",
        iconBg: "#FFF8E1",
        iconColor: "#F57F17",
        route: "/quotes",
        note: "One row = one quote with a single line item.",
        fields: [
          { key: "customer", label: "Customer", required: !0, type: "text" },
          { key: "transaction_date", label: "Transaction Date", required: !1, type: "date" },
          { key: "valid_till", label: "Valid Till", required: !1, type: "date" },
          { key: "item_code", label: "Item Code", required: !0, type: "text" },
          { key: "qty", label: "Quantity", required: !1, type: "number" },
          { key: "rate", label: "Rate", required: !1, type: "number" },
          { key: "tax_type", label: "Tax Type", required: !1, type: "text" },
          { key: "tax_rate", label: "Tax Rate %", required: !1, type: "number" },
          { key: "currency", label: "Currency", required: !1, type: "text" },
          { key: "remarks", label: "Remarks", required: !1, type: "text" }
        ]
      },
      {
        key: "Sales Order",
        label: "Sales Orders",
        icon: "order",
        iconBg: "#E0F7FA",
        iconColor: "#00838F",
        route: "/sales-orders",
        note: "One row = one order with a single line item.",
        fields: [
          { key: "customer", label: "Customer", required: !0, type: "text" },
          { key: "transaction_date", label: "Transaction Date", required: !1, type: "date" },
          { key: "delivery_date", label: "Delivery Date", required: !1, type: "date" },
          { key: "item_code", label: "Item Code", required: !0, type: "text" },
          { key: "qty", label: "Quantity", required: !1, type: "number" },
          { key: "rate", label: "Rate", required: !1, type: "number" },
          { key: "tax_type", label: "Tax Type", required: !1, type: "text" },
          { key: "tax_rate", label: "Tax Rate %", required: !1, type: "number" },
          { key: "currency", label: "Currency", required: !1, type: "text" },
          { key: "remarks", label: "Remarks", required: !1, type: "text" }
        ]
      },
      {
        key: "Purchase Invoice",
        label: "Bills",
        icon: "purchase",
        iconBg: "#FFF3E0",
        iconColor: "#BF360C",
        route: "/bills",
        note: "One row = one bill with a single line item; vendor must already exist.",
        fields: [
          { key: "supplier", label: "Vendor", required: !0, type: "text" },
          { key: "bill_no", label: "Bill No.", required: !1, type: "text" },
          { key: "bill_date", label: "Bill Date", required: !1, type: "date" },
          { key: "posting_date", label: "Posting Date", required: !1, type: "date" },
          { key: "due_date", label: "Due Date", required: !1, type: "date" },
          { key: "item_code", label: "Item Code", required: !0, type: "text" },
          { key: "qty", label: "Quantity", required: !1, type: "number" },
          { key: "rate", label: "Rate", required: !1, type: "number" },
          { key: "tax_type", label: "Tax Type", required: !1, type: "text" },
          { key: "tax_rate", label: "Tax Rate %", required: !1, type: "number" },
          { key: "currency", label: "Currency", required: !1, type: "text" },
          { key: "remarks", label: "Remarks", required: !1, type: "text" }
        ]
      },
      {
        key: "Expense",
        label: "Expenses",
        icon: "expense",
        iconBg: "#FFF8E1",
        iconColor: "#E65100",
        route: "/expenses",
        note: "Expense type, amount, account and payment source are all required.",
        fields: [
          { key: "posting_date", label: "Posting Date", required: !1, type: "date" },
          { key: "expense_type", label: "Expense Type", required: !0, type: "text" },
          { key: "description", label: "Description", required: !1, type: "text" },
          { key: "amount", label: "Amount", required: !0, type: "number" },
          { key: "gst_rate", label: "GST Rate %", required: !1, type: "number" },
          { key: "expense_account", label: "Expense Account", required: !0, type: "text" },
          { key: "paid_through", label: "Paid Through", required: !0, type: "text" },
          { key: "vendor", label: "Vendor", required: !1, type: "text" },
          { key: "reference_no", label: "Reference No.", required: !1, type: "text" },
          { key: "notes", label: "Notes", required: !1, type: "text" }
        ]
      },
      {
        key: "Purchase Order",
        label: "Purchase Orders",
        icon: "truck",
        iconBg: "#E8EAF6",
        iconColor: "#3949AB",
        route: "/purchase-orders",
        note: "One row = one PO with a single line item; vendor must already exist.",
        fields: [
          { key: "supplier", label: "Vendor", required: !0, type: "text" },
          { key: "transaction_date", label: "Transaction Date", required: !1, type: "date" },
          { key: "expected_delivery_date", label: "Expected Delivery", required: !1, type: "date" },
          { key: "item_code", label: "Item Code", required: !0, type: "text" },
          { key: "qty", label: "Quantity", required: !1, type: "number" },
          { key: "rate", label: "Rate", required: !1, type: "number" },
          { key: "tax_type", label: "Tax Type", required: !1, type: "text" },
          { key: "tax_rate", label: "Tax Rate %", required: !1, type: "number" },
          { key: "currency", label: "Currency", required: !1, type: "text" },
          { key: "remarks", label: "Remarks", required: !1, type: "text" }
        ]
      },
      {
        key: "Asset",
        label: "Assets",
        icon: "box",
        iconBg: "#EDE7F6",
        iconColor: "#5E35B1",
        route: "/assets",
        note: "New assets are created in Draft status — submit them from the Assets list once reviewed.",
        fields: [
          { key: "asset_name", label: "Asset Name", required: !0, type: "text" },
          { key: "asset_code", label: "Asset Code", required: !1, type: "text" },
          { key: "asset_category", label: "Asset Category", required: !1, type: "text" },
          { key: "purchase_date", label: "Purchase Date", required: !1, type: "date" },
          { key: "available_for_use_date", label: "Available For Use Date", required: !1, type: "date" },
          { key: "qty", label: "Quantity", required: !1, type: "number" },
          { key: "purchase_cost", label: "Purchase Cost", required: !1, type: "number" },
          { key: "taxable_value", label: "Taxable Value", required: !1, type: "number" },
          { key: "location", label: "Location", required: !1, type: "text" },
          { key: "department", label: "Department", required: !1, type: "text" },
          { key: "supplier", label: "Vendor", required: !1, type: "text" },
          { key: "depreciation_method", label: "Depreciation Method", required: !1, type: "text" },
          { key: "useful_life", label: "Useful Life (years)", required: !1, type: "number" },
          { key: "salvage_value", label: "Salvage Value", required: !1, type: "number" },
          { key: "description", label: "Description", required: !1, type: "text" }
        ]
      }
    ], Ce = [
      { key: "contacts", label: "Contacts", icon: "users" },
      { key: "sales", label: "Sales", icon: "fileplus" },
      { key: "purchases", label: "Inventory", icon: "purchase" },
      { key: "assets", label: "Assets", icon: "box" }
    ], we = ["sales", "assets"], re = ["Customer", "Expense", "Purchase Invoice", "Purchase Order", "Asset"], Te = Ce.filter((l) => !we.includes(l.key)), J = {
      contacts: ["Customer", "Supplier"],
      sales: ["Sales Invoice", "Quotation", "Sales Order"],
      purchases: ["Purchase Invoice", "Purchase Order", "Expense", "Item"],
      assets: ["Asset"]
    }, Z = f("contacts"), Me = _(
      () => ie.filter((l) => {
        var e;
        return ((e = J[Z.value]) == null ? void 0 : e.includes(l.key)) && !re.includes(l.key);
      })
    );
    function Le(l) {
      Z.value = l, J[l].includes(L.value) || oe(J[l].find((e) => !re.includes(e)));
    }
    const L = f("Supplier"), y = f(1), j = f(!1), P = f(!1), V = f(""), Q = f(0), C = f([]), w = f([]), E = f(""), m = he({}), $ = f([]), F = f([]), O = f(""), I = f("all"), D = f(null), G = f(!1), v = he({ done: 0, total: 0, batchIndex: 0, batchCount: 0 }), S = f({ created: 0, skipped: 0, errors: [] }), R = _(() => ie.find((l) => l.key === L.value)), T = _(() => R.value.fields), X = _(() => T.value.filter((l) => l.required)), Ee = _(() => T.value.filter((l) => !l.required));
    function ne(l) {
      return l.fields.filter((e) => e.required).length;
    }
    function Ie(l) {
      return y.value === l ? "active" : y.value > l ? "done" : "";
    }
    function Se(l) {
      l < y.value && l >= 1 && (y.value = l);
    }
    function oe(l) {
      L.value = l, ue();
    }
    function ue() {
      y.value = 1, V.value = "", Q.value = 0, C.value = [], w.value = [], E.value = "", P.value = !1, Object.keys(m).forEach((l) => delete m[l]), $.value = [], F.value = [], O.value = "", I.value = "all", B.value = 1, D.value = null, G.value = !1, v.done = 0, v.total = 0, v.batchIndex = 0, v.batchCount = 0, S.value = { created: 0, skipped: 0, errors: [] };
    }
    function He() {
      V.value = "", Q.value = 0, C.value = [], w.value = [], E.value = "", Object.keys(m).forEach((l) => delete m[l]);
    }
    function Re(l) {
      j.value = !1;
      const e = l.dataTransfer.files[0];
      e && de(e);
    }
    function Ae(l) {
      const e = l.target.files[0];
      e && de(e), l.target.value = "";
    }
    function de(l) {
      if (!l.name.toLowerCase().endsWith(".csv")) {
        E.value = "Only .csv files are supported";
        return;
      }
      V.value = l.name, Q.value = l.size, E.value = "", P.value = !0;
      const e = new FileReader();
      e.onload = (s) => {
        De(Fe(s.target.result)), P.value = !1;
      }, e.onerror = () => {
        E.value = "Could not read that file", P.value = !1;
      }, e.readAsArrayBuffer(l);
    }
    function Fe(l) {
      const e = new Uint8Array(l);
      try {
        return new TextDecoder("utf-8", { fatal: !0 }).decode(e);
      } catch {
        return new TextDecoder("windows-1252").decode(e);
      }
    }
    function De(l) {
      l.charCodeAt(0) === 65279 && (l = l.slice(1));
      const e = l.trim().split(/\r?\n/);
      if (e.length < 2) {
        E.value = "CSV must have a header row and at least one data row", C.value = [];
        return;
      }
      const s = e[0].split(",").map((o) => o.trim().replace(/^"|"$/g, ""));
      w.value = s;
      const a = [];
      for (let o = 1; o < e.length; o++) {
        const c = e[o].trim();
        if (!c) continue;
        const A = Ve(c), H = {};
        s.forEach((h, x) => {
          H[h] = (A[x] || "").trim().replace(/^"|"$/g, "");
        }), a.push(H);
      }
      if (!a.length) {
        E.value = "No data rows found in CSV", C.value = [];
        return;
      }
      C.value = a, E.value = "", ce();
    }
    function Ve(l) {
      const e = [];
      let s = "", a = !1;
      for (let o = 0; o < l.length; o++) {
        const c = l[o];
        c === '"' ? a = !a : c === "," && !a ? (e.push(s), s = "") : s += c;
      }
      return e.push(s), e;
    }
    function Be(l) {
      const e = C.value.find((s) => (s[l] || "").trim());
      return e ? e[l] : "";
    }
    function Pe(l) {
      return l ? l < 1024 ? l + " B" : l < 1024 * 1024 ? (l / 1024).toFixed(1) + " KB" : (l / (1024 * 1024)).toFixed(1) + " MB" : "0 B";
    }
    async function $e() {
      try {
        const l = await dt("psd_books.api.import_data.get_sample_csv", { doctype: L.value });
        ve(l, `sample_${L.value.toLowerCase().replace(/ /g, "_")}_import.csv`, "text/csv");
      } catch (l) {
        xe.error("Could not download sample: " + l.message);
      }
    }
    function N(l) {
      return (l || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    }
    function ce() {
      const l = /* @__PURE__ */ new Set();
      for (const e of w.value) {
        const s = N(e);
        let a = T.value.find((o) => !l.has(o.key) && (N(o.key) === s || N(o.label) === s));
        a || (a = T.value.find((o) => !l.has(o.key) && s && (s.includes(N(o.key)) || N(o.key).includes(s)))), m[e] = a ? a.key : "", a && l.add(a.key);
      }
    }
    function Oe() {
      w.value.forEach((l) => {
        m[l] = "";
      });
    }
    function Ne(l, e) {
      if (e)
        for (const s of w.value)
          s !== l && m[s] === e && (m[s] = "");
      m[l] = e;
    }
    function pe(l, e) {
      return Object.entries(m).some(([s, a]) => s !== l && a === e);
    }
    const K = _(() => {
      const l = {};
      for (const e of w.value)
        m[e] && (l[m[e]] = e);
      return l;
    }), ze = _(() => X.value.every((l) => !!K.value[l.key])), Ue = _(() => C.value.map((l) => {
      const e = {};
      for (const s of w.value) {
        const a = m[s];
        a && (e[a] = l[s]);
      }
      return e;
    }));
    function je() {
      C.value.length && (y.value = 2);
    }
    function Qe() {
      $.value = Ue.value.map((l) => ({ ...l })), F.value = $.value.map(() => !0), O.value = "", I.value = "all", B.value = 1, y.value = 3;
    }
    function Ge(l) {
      if (!l || (l = l.trim(), !l) || /^\d{4}-\d{2}-\d{2}$/.test(l) || /^\d{4}\/\d{1,2}\/\d{1,2}$/.test(l)) return !0;
      const e = l.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
      if (e) {
        const s = +e[1], a = +e[2];
        if (s > 12 || a <= 12) return !0;
      }
      return !1;
    }
    function Ke(l) {
      return l == null || String(l).trim() === "" ? !0 : !isNaN(parseFloat(String(l).replace(/,/g, "")));
    }
    function We(l, e) {
      const s = [];
      let a = !1, o = !1, c = !1, A = !1;
      for (const h of e) {
        const x = (l[h.key] ?? "").toString().trim();
        h.required && !x && (a = !0, s.push({ field: h.key, kind: "missing", message: `${h.label} is required` })), h.type === "date" && x && !Ge(x) && (o = !0, s.push({ field: h.key, kind: "date", message: `${h.label} "${x}" isn't a recognised date format` })), h.type === "number" && x && !Ke(x) && (c = !0, s.push({ field: h.key, kind: "number", message: `${h.label} "${x}" isn't numeric — will be treated as 0` })), h.type === "gstin" && x && !yt.test(x.toUpperCase()) && (A = !0, s.push({ field: h.key, kind: "gstin", message: `${h.label} "${x}" isn't a valid KRA PIN (e.g. A123456789Z)` }));
      }
      let H = "ready";
      return o ? H = "fail" : a ? H = "skip" : (c || A) && (H = "notice"), { issues: s, status: H };
    }
    const W = _(() => $.value.map((l, e) => {
      const { issues: s, status: a } = We(l, T.value);
      return { idx: e, rowNumber: e + 1, data: l, issues: s, status: a };
    })), M = _(() => {
      const l = { total: W.value.length, ready: 0, notice: 0, skip: 0, fail: 0 };
      for (const e of W.value) l[e.status]++;
      return l;
    }), ee = _(() => T.value.filter((l) => K.value[l.key])), Ye = _(() => {
      let l = W.value;
      I.value !== "all" && (l = l.filter((s) => s.status === I.value));
      const e = O.value.trim().toLowerCase();
      return e && (l = l.filter((s) => Object.values(s.data).some((a) => String(a || "").toLowerCase().includes(e)))), l;
    }), { page: B, pageSize: te, paged: z, totalItems: Je } = bt(Ye, { storageKey: "bulkimport" });
    function U(l) {
      I.value = l, B.value = 1;
    }
    const Y = _(() => F.value.filter(Boolean).length), Ze = _(() => z.value.length > 0 && z.value.every((l) => F.value[l.idx]));
    function Xe(l, e) {
      F.value[l] = e;
    }
    function et(l) {
      z.value.forEach((e) => {
        F.value[e.idx] = l;
      });
    }
    function tt(l, e) {
      D.value = { idx: l, field: e };
    }
    async function lt() {
      const l = $.value.map((a, o) => o).filter((a) => F.value[a]);
      if (!l.length) return;
      G.value = !0, y.value = 4;
      const e = [];
      for (let a = 0; a < l.length; a += ge) e.push(l.slice(a, a + ge));
      v.done = 0, v.total = l.length, v.batchIndex = 0, v.batchCount = e.length;
      const s = { created: 0, skipped: 0, errors: [] };
      for (const a of e) {
        v.batchIndex++;
        const o = a.map((c) => $.value[c]);
        try {
          const c = await ct("psd_books.api.import_data.bulk_import", {
            doctype: L.value,
            rows_json: JSON.stringify(o)
          });
          s.created += c.created || 0, s.skipped += c.skipped || 0, (c.errors || []).forEach((A) => {
            const H = a[(A.row || 1) - 1];
            s.errors.push({ row: H != null ? H + 1 : A.row, data: A.data, error: A.error });
          });
        } catch (c) {
          s.errors.push({ row: "—", data: {}, error: c.message || "This batch failed to import" });
        }
        v.done += a.length;
      }
      S.value = s, G.value = !1, y.value = 5;
    }
    const st = _(() => v.total ? Math.round(v.done / v.total * 100) : 0);
    function ye(l) {
      return l = l == null ? "" : String(l), /[",\n]/.test(l) && (l = '"' + l.replace(/"/g, '""') + '"'), l;
    }
    function be(l, e, s) {
      const a = [e.map(ye).join(",")];
      s.forEach((o) => a.push(o.map(ye).join(","))), ve(a.join(`
`), l, "text/csv");
    }
    function ve(l, e, s) {
      const a = new Blob([l], { type: s }), o = URL.createObjectURL(a), c = document.createElement("a");
      c.href = o, c.download = e, c.click(), URL.revokeObjectURL(o);
    }
    function at() {
      const l = W.value.filter((a) => a.status === "skip" || a.status === "fail"), e = ["Row", "Issues", ...T.value.map((a) => a.label)], s = l.map((a) => [a.rowNumber, a.issues.map((o) => o.message).join("; "), ...T.value.map((o) => a.data[o.key] || "")]);
      be(`flagged_${L.value.toLowerCase().replace(/ /g, "_")}.csv`, e, s);
    }
    function it() {
      const l = ["Row", "Error", ...T.value.map((s) => s.label)], e = S.value.errors.map((s) => [s.row, s.error, ...T.value.map((a) => s.data && s.data[a.key] || "")]);
      be(`import_errors_${L.value.toLowerCase().replace(/ /g, "_")}.csv`, l, e);
    }
    function rt() {
      var l;
      (l = R.value) != null && l.route && qe.push(R.value.route);
    }
    return (l, e) => (r(), i("div", ft, [
      t("div", kt, [
        e[19] || (e[19] = t("div", null, [
          t("div", { class: "bi-title" }, "Bulk Import"),
          t("div", { class: "bi-subtitle" }, "Import your business data quickly and accurately using a CSV file.")
        ], -1)),
        t("button", {
          class: "sales-btn-ghost bi-download-btn",
          onClick: $e
        }, [
          t("span", {
            innerHTML: u(d)("download", 14),
            style: { "vertical-align": "-2px", "margin-right": "6px" }
          }, null, 8, mt),
          e[18] || (e[18] = p(" Download Sample CSV ", -1))
        ])
      ]),
      t("div", ht, [
        t("div", _t, [
          (r(!0), i(k, null, q(u(Te), (s) => (r(), i("button", {
            key: s.key,
            class: g(["bi-cat-tab", { active: Z.value === s.key }]),
            onClick: (a) => Le(s.key)
          }, [
            t("span", {
              innerHTML: u(d)(s.icon, 13),
              style: { "vertical-align": "-2px", "margin-right": "5px" }
            }, null, 8, xt),
            p(" " + n(s.label), 1)
          ], 10, gt))), 128))
        ]),
        t("div", qt, [
          (r(!0), i(k, null, q(Me.value, (s) => (r(), i("button", {
            key: s.key,
            class: g(["bi-type-card", { active: L.value === s.key }]),
            onClick: (a) => oe(s.key)
          }, [
            t("div", {
              class: "bi-type-icon-wrap",
              style: se({ background: s.iconBg || "#eaf1ff" })
            }, [
              t("span", {
                class: "bi-type-icon",
                style: se({ color: s.iconColor || "#1a6ef7" }),
                innerHTML: u(d)(s.icon, 20)
              }, null, 12, wt)
            ], 4),
            t("span", Tt, n(s.label), 1),
            t("span", Mt, n(ne(s)) + " required field" + n(ne(s) === 1 ? "" : "s"), 1),
            L.value === s.key ? (r(), i("span", {
              key: 0,
              class: "bi-type-check",
              innerHTML: u(d)("check", 11)
            }, null, 8, Lt)) : b("", !0)
          ], 10, Ct))), 128))
        ])
      ]),
      t("div", Et, [
        (r(), i(k, null, q(ae, (s, a) => (r(), i(k, {
          key: s.n
        }, [
          t("div", {
            class: g(["bi-step", Ie(s.n)]),
            onClick: (o) => Se(s.n)
          }, [
            t("div", St, [
              y.value > s.n ? (r(), i("span", {
                key: 0,
                innerHTML: u(d)("check", 12)
              }, null, 8, Ht)) : (r(), i("span", Rt, n(s.n), 1))
            ]),
            t("div", At, [
              t("div", Ft, n(s.label), 1),
              t("div", Dt, n(s.sub), 1)
            ])
          ], 10, It),
          a < ae.length - 1 ? (r(), i("div", {
            key: 0,
            class: g(["bi-step-line", { filled: y.value > s.n, flowing: G.value && y.value === 4 && s.n === 4 }])
          }, null, 2)) : b("", !0)
        ], 64))), 64))
      ]),
      y.value === 1 ? (r(), i("div", Vt, [
        e[31] || (e[31] = t("div", { class: "bi-card-head" }, "Upload your CSV", -1)),
        t("div", Bt, [
          t("div", Pt, [
            t("div", {
              class: g(["bi-dropzone", { dragging: j.value, "has-file": !!V.value }]),
              onDragover: e[0] || (e[0] = le((s) => j.value = !0, ["prevent"])),
              onDragleave: e[1] || (e[1] = (s) => j.value = !1),
              onDrop: le(Re, ["prevent"]),
              onClick: e[2] || (e[2] = (s) => !V.value && l.$refs.fileInput.click())
            }, [
              t("input", {
                ref: "fileInput",
                type: "file",
                accept: ".csv",
                style: { display: "none" },
                onChange: Ae
              }, null, 544),
              V.value ? (r(), i(k, { key: 1 }, [
                t("span", {
                  class: "bi-dz-icon ok",
                  innerHTML: u(d)("file-text", 30)
                }, null, 8, zt),
                t("div", Ut, n(V.value), 1),
                t("div", jt, n(Pe(Q.value)) + " · " + n(C.value.length) + " row" + n(C.value.length !== 1 ? "s" : "") + " · " + n(w.value.length) + " column" + n(w.value.length !== 1 ? "s" : ""), 1),
                t("button", {
                  class: "b-btn b-btn-ghost bi-dz-remove",
                  onClick: le(He, ["stop"])
                }, [
                  t("span", {
                    innerHTML: u(d)("x", 12)
                  }, null, 8, Qt),
                  e[24] || (e[24] = p(" Remove ", -1))
                ])
              ], 64)) : (r(), i(k, { key: 0 }, [
                t("div", $t, [
                  e[20] || (e[20] = t("svg", {
                    width: "52",
                    height: "60",
                    viewBox: "0 0 52 60",
                    fill: "none"
                  }, [
                    t("rect", {
                      x: "2",
                      y: "2",
                      width: "40",
                      height: "52",
                      rx: "4",
                      fill: "#eaf1ff",
                      stroke: "#bfdbfe",
                      "stroke-width": "1.5"
                    }),
                    t("rect", {
                      x: "10",
                      y: "2",
                      width: "40",
                      height: "52",
                      rx: "4",
                      fill: "white",
                      stroke: "#bfdbfe",
                      "stroke-width": "1.5"
                    }),
                    t("text", {
                      x: "30",
                      y: "32",
                      "text-anchor": "middle",
                      "font-size": "9",
                      "font-weight": "700",
                      fill: "#1a6ef7",
                      "font-family": "sans-serif"
                    }, "CSV")
                  ], -1)),
                  t("div", Ot, [
                    t("span", {
                      innerHTML: u(d)("upload", 12)
                    }, null, 8, Nt)
                  ])
                ]),
                e[21] || (e[21] = t("div", { class: "bi-dz-title" }, "Drag and drop your CSV file here", -1)),
                e[22] || (e[22] = t("div", { class: "bi-dz-browse" }, "or click to browse", -1)),
                e[23] || (e[23] = t("div", { class: "bi-dz-sub" }, ".csv files only (UTF-8 encoded)", -1))
              ], 64))
            ], 34),
            t("div", Gt, [
              t("span", {
                class: "bi-secure-icon",
                innerHTML: u(d)("shield", 13)
              }, null, 8, Kt),
              e[25] || (e[25] = t("div", null, [
                t("div", { class: "bi-secure-title" }, "Your data is secure and private"),
                t("div", { class: "bi-secure-sub" }, "We never store your files.")
              ], -1))
            ])
          ]),
          t("div", Wt, [
            t("div", Yt, [
              e[26] || (e[26] = p("Importing ", -1)),
              t("b", null, n(R.value.label), 1)
            ]),
            e[28] || (e[28] = t("div", { class: "bi-req-list-label" }, "This import will understand the following columns:", -1)),
            R.value.note ? (r(), i("div", Jt, n(R.value.note), 1)) : b("", !0),
            t("div", Zt, [
              (r(!0), i(k, null, q(T.value, (s) => (r(), i("span", {
                key: s.key,
                class: g(["bi-field-chip", s.required ? "bi-field-chip--required" : ""])
              }, [
                e[27] || (e[27] = t("span", { class: "bi-chip-dot" }, "•", -1)),
                p(" " + n(s.label), 1),
                s.required ? (r(), i(k, { key: 0 }, [
                  p("*")
                ], 64)) : b("", !0)
              ], 2))), 128))
            ]),
            e[29] || (e[29] = t("div", { class: "bi-req-hint" }, [
              t("span", { style: { color: "#C92A2A", "font-weight": "600" } }, "*"),
              p(" Required — rows missing this are skipped")
            ], -1))
          ])
        ]),
        E.value ? (r(), i("div", Xt, [
          t("span", {
            innerHTML: u(d)("alert-circle", 14)
          }, null, 8, el),
          p(" " + n(E.value), 1)
        ])) : b("", !0),
        t("div", tl, [
          P.value ? (r(), i("span", ll, "Reading file…")) : b("", !0),
          t("button", {
            class: "b-btn b-btn-primary",
            disabled: !C.value.length || P.value,
            onClick: je
          }, [
            e[30] || (e[30] = p(" Continue to Map Columns ", -1)),
            t("span", {
              innerHTML: u(d)("arrow-right", 13),
              style: { "vertical-align": "-2px", "margin-left": "4px" }
            }, null, 8, al)
          ], 8, sl)
        ])
      ])) : b("", !0),
      y.value === 2 ? (r(), i("div", il, [
        t("div", rl, [
          e[33] || (e[33] = t("div", { class: "bi-card-head" }, "Map your columns", -1)),
          t("div", nl, [
            t("button", {
              class: "b-btn b-btn-ghost",
              onClick: ce,
              style: { "font-size": "12px" }
            }, [
              t("span", {
                innerHTML: u(d)("refresh", 12)
              }, null, 8, ol),
              e[32] || (e[32] = p(" Auto-map again ", -1))
            ]),
            t("button", {
              class: "b-btn b-btn-ghost",
              onClick: Oe,
              style: { "font-size": "12px" }
            }, "Clear all")
          ])
        ]),
        e[40] || (e[40] = t("div", { class: "bi-map-sub" }, "Tell us which CSV column feeds which field. We've guessed where we could — check the rest.", -1)),
        t("div", ul, [
          t("div", dl, [
            t("table", cl, [
              e[35] || (e[35] = t("thead", null, [
                t("tr", null, [
                  t("th", null, "CSV Column"),
                  t("th", null, "Sample Value"),
                  t("th", null, "Maps To"),
                  t("th")
                ])
              ], -1)),
              t("tbody", null, [
                (r(!0), i(k, null, q(w.value, (s) => (r(), i("tr", { key: s }, [
                  t("td", pl, n(s), 1),
                  t("td", yl, n(Be(s) || "—"), 1),
                  t("td", null, [
                    t("select", {
                      class: "nim-input bi-map-select",
                      value: m[s] || "",
                      onChange: (a) => Ne(s, a.target.value)
                    }, [
                      e[34] || (e[34] = t("option", { value: "" }, "Don't import this column", -1)),
                      t("optgroup", vl, [
                        (r(!0), i(k, null, q(X.value, (a) => (r(), i("option", {
                          key: a.key,
                          value: a.key,
                          disabled: pe(s, a.key)
                        }, n(a.label), 9, fl))), 128))
                      ]),
                      t("optgroup", kl, [
                        (r(!0), i(k, null, q(Ee.value, (a) => (r(), i("option", {
                          key: a.key,
                          value: a.key,
                          disabled: pe(s, a.key)
                        }, n(a.label), 9, ml))), 128))
                      ])
                    ], 40, bl)
                  ]),
                  t("td", hl, [
                    m[s] ? (r(), i("span", {
                      key: 0,
                      style: { color: "#2F9E44" },
                      innerHTML: u(d)("check", 14)
                    }, null, 8, _l)) : (r(), i("span", {
                      key: 1,
                      style: { color: "#CED4DA" },
                      innerHTML: u(d)("circle", 14)
                    }, null, 8, gl))
                  ])
                ]))), 128))
              ])
            ])
          ]),
          t("div", xl, [
            e[38] || (e[38] = t("div", { class: "bi-req-panel-title" }, "Required field coverage", -1)),
            t("div", ql, [
              (r(!0), i(k, null, q(X.value, (s) => (r(), i("div", {
                key: s.key,
                class: "bi-coverage-row"
              }, [
                K.value[s.key] ? (r(), i("span", {
                  key: 0,
                  style: { color: "#2F9E44" },
                  innerHTML: u(d)("check", 14)
                }, null, 8, Cl)) : (r(), i("span", {
                  key: 1,
                  style: { color: "#C92A2A" },
                  innerHTML: u(d)("x-circle", 14)
                }, null, 8, wl)),
                t("span", Tl, n(s.label), 1),
                t("span", Ml, n(K.value[s.key] || "Not mapped"), 1)
              ]))), 128))
            ]),
            ze.value ? (r(), i("div", Il, [
              t("span", {
                innerHTML: u(d)("check", 13)
              }, null, 8, Sl),
              e[37] || (e[37] = p(" All required fields are mapped. ", -1))
            ])) : (r(), i("div", Ll, [
              t("span", {
                innerHTML: u(d)("alert-circle", 13)
              }, null, 8, El),
              e[36] || (e[36] = p(" Rows missing a required field will be skipped on import. ", -1))
            ]))
          ])
        ]),
        t("div", Hl, [
          t("button", {
            class: "b-btn b-btn-ghost",
            onClick: e[3] || (e[3] = (s) => y.value = 1)
          }, "← Back"),
          t("button", {
            class: "b-btn b-btn-primary",
            onClick: Qe
          }, [
            e[39] || (e[39] = p(" Preview & Validate ", -1)),
            t("span", {
              innerHTML: u(d)("arrow-right", 13),
              style: { "vertical-align": "-2px" }
            }, null, 8, Rl)
          ])
        ])
      ])) : b("", !0),
      y.value === 3 ? (r(), i("div", Al, [
        t("div", Fl, [
          e[42] || (e[42] = t("div", { class: "bi-card-head" }, "Validate & preview", -1)),
          M.value.skip + M.value.fail > 0 ? (r(), i("button", {
            key: 0,
            class: "b-btn b-btn-ghost",
            onClick: at,
            style: { "font-size": "12px" }
          }, [
            t("span", {
              innerHTML: u(d)("download", 12)
            }, null, 8, Dl),
            e[41] || (e[41] = p(" Download flagged rows ", -1))
          ])) : b("", !0)
        ]),
        t("div", Vl, [
          t("button", {
            class: g(["bi-summary-chip", { active: I.value === "all" }]),
            onClick: e[4] || (e[4] = (s) => U("all"))
          }, [
            t("b", null, n(M.value.total), 1),
            e[43] || (e[43] = p(" Total ", -1))
          ], 2),
          t("button", {
            class: g(["bi-summary-chip green", { active: I.value === "ready" }]),
            onClick: e[5] || (e[5] = (s) => U("ready"))
          }, [
            t("b", null, n(M.value.ready), 1),
            e[44] || (e[44] = p(" Ready ", -1))
          ], 2),
          M.value.notice > 0 ? (r(), i("button", {
            key: 0,
            class: g(["bi-summary-chip blue", { active: I.value === "notice" }]),
            onClick: e[6] || (e[6] = (s) => U("notice"))
          }, [
            t("b", null, n(M.value.notice), 1),
            e[45] || (e[45] = p(" Notices ", -1))
          ], 2)) : b("", !0),
          M.value.skip > 0 ? (r(), i("button", {
            key: 1,
            class: g(["bi-summary-chip amber", { active: I.value === "skip" }]),
            onClick: e[7] || (e[7] = (s) => U("skip"))
          }, [
            t("b", null, n(M.value.skip), 1),
            e[46] || (e[46] = p(" Will skip ", -1))
          ], 2)) : b("", !0),
          M.value.fail > 0 ? (r(), i("button", {
            key: 2,
            class: g(["bi-summary-chip red", { active: I.value === "fail" }]),
            onClick: e[8] || (e[8] = (s) => U("fail"))
          }, [
            t("b", null, n(M.value.fail), 1),
            e[47] || (e[47] = p(" Will fail ", -1))
          ], 2)) : b("", !0),
          t("div", Bl, [
            t("span", {
              innerHTML: u(d)("search", 13)
            }, null, 8, Pl),
            fe(t("input", {
              "onUpdate:modelValue": e[9] || (e[9] = (s) => O.value = s),
              placeholder: "Search rows…",
              onInput: e[10] || (e[10] = (s) => B.value = 1)
            }, null, 544), [
              [ke, O.value]
            ])
          ])
        ]),
        t("div", $l, [
          t("table", Ol, [
            t("thead", null, [
              t("tr", null, [
                t("th", Nl, [
                  t("input", {
                    type: "checkbox",
                    checked: Ze.value,
                    onChange: e[11] || (e[11] = (s) => et(s.target.checked))
                  }, null, 40, zl)
                ]),
                e[48] || (e[48] = t("th", { style: { width: "40px" } }, "#", -1)),
                e[49] || (e[49] = t("th", { style: { width: "28px" } }, null, -1)),
                (r(!0), i(k, null, q(ee.value, (s) => (r(), i("th", {
                  key: s.key
                }, n(s.label), 1))), 128))
              ])
            ]),
            t("tbody", null, [
              (r(!0), i(k, null, q(u(z), (s) => (r(), i("tr", {
                key: s.idx,
                class: g("bi-row-" + s.status)
              }, [
                t("td", null, [
                  t("input", {
                    type: "checkbox",
                    checked: F.value[s.idx],
                    onChange: (a) => Xe(s.idx, a.target.checked)
                  }, null, 40, Ul)
                ]),
                t("td", jl, n(s.rowNumber), 1),
                t("td", null, [
                  t("span", {
                    title: s.issues.map((a) => a.message).join("; ")
                  }, [
                    s.status === "ready" ? (r(), i("span", {
                      key: 0,
                      style: { color: "#2F9E44" },
                      innerHTML: u(d)("check", 13)
                    }, null, 8, Gl)) : s.status === "notice" ? (r(), i("span", {
                      key: 1,
                      style: { color: "#1971C2" },
                      innerHTML: u(d)("info", 13)
                    }, null, 8, Kl)) : s.status === "skip" ? (r(), i("span", {
                      key: 2,
                      style: { color: "#E67700" },
                      innerHTML: u(d)("alert-circle", 13)
                    }, null, 8, Wl)) : (r(), i("span", {
                      key: 3,
                      style: { color: "#C92A2A" },
                      innerHTML: u(d)("x-circle", 13)
                    }, null, 8, Yl))
                  ], 8, Ql)
                ]),
                (r(!0), i(k, null, q(ee.value, (a) => (r(), i("td", {
                  key: a.key,
                  class: "bi-cell",
                  onClick: (o) => tt(s.idx, a.key)
                }, [
                  D.value && D.value.idx === s.idx && D.value.field === a.key ? fe((r(), i("input", {
                    key: 0,
                    "onUpdate:modelValue": (o) => s.data[a.key] = o,
                    class: "bi-cell-input",
                    autofocus: "",
                    onBlur: e[12] || (e[12] = (o) => D.value = null),
                    onKeyup: [
                      e[13] || (e[13] = _e((o) => D.value = null, ["enter"])),
                      e[14] || (e[14] = _e((o) => D.value = null, ["esc"]))
                    ]
                  }, null, 40, Zl)), [
                    [ke, s.data[a.key]]
                  ]) : (r(), i("span", {
                    key: 1,
                    class: g({ "bi-cell-empty": !s.data[a.key] })
                  }, n(s.data[a.key] || "—"), 3))
                ], 8, Jl))), 128))
              ], 2))), 128)),
              u(z).length ? b("", !0) : (r(), i("tr", Xl, [
                t("td", {
                  colspan: ee.value.length + 3,
                  class: "b-empty"
                }, "No rows match this filter.", 8, es)
              ]))
            ])
          ])
        ]),
        t("div", ts, [
          ut(vt, {
            page: u(B),
            "onUpdate:page": e[15] || (e[15] = (s) => me(B) ? B.value = s : null),
            "page-size": u(te),
            "onUpdate:pageSize": e[16] || (e[16] = (s) => me(te) ? te.value = s : null),
            "total-items": u(Je)
          }, null, 8, ["page", "page-size", "total-items"])
        ]),
        t("div", ls, [
          t("button", {
            class: "b-btn b-btn-ghost",
            onClick: e[17] || (e[17] = (s) => y.value = 2)
          }, "← Back to Mapping"),
          t("div", ss, [
            t("span", as, n(Y.value) + " of " + n(M.value.total) + " rows selected", 1),
            t("button", {
              class: "b-btn b-btn-primary",
              disabled: !Y.value || !l.$canCreate("admin"),
              title: l.$canCreate("admin") ? "" : "Read-only access",
              onClick: lt
            }, [
              t("span", {
                innerHTML: u(d)("upload", 13),
                style: { "vertical-align": "-2px" }
              }, null, 8, rs),
              p(" Import " + n(Y.value) + " Record" + n(Y.value !== 1 ? "s" : ""), 1)
            ], 8, is)
          ])
        ])
      ])) : b("", !0),
      y.value === 4 ? (r(), i("div", ns, [
        e[50] || (e[50] = t("div", { class: "bi-spinner" }, null, -1)),
        t("div", os, "Importing your " + n(R.value.label.toLowerCase()) + "…", 1),
        t("div", us, "Batch " + n(v.batchIndex) + " of " + n(v.batchCount) + " — " + n(v.done) + " / " + n(v.total) + " rows processed", 1),
        t("div", ds, [
          t("div", {
            class: "bi-progress-fill",
            style: se({ width: st.value + "%" })
          }, null, 4)
        ]),
        e[51] || (e[51] = t("div", {
          class: "c-muted",
          style: { "font-size": "12px" }
        }, "Don't close this tab while the import is running.", -1))
      ])) : b("", !0),
      y.value === 5 ? (r(), i("div", cs, [
        e[56] || (e[56] = t("div", { class: "bi-card-head" }, "Import complete", -1)),
        t("div", ps, [
          t("div", ys, [
            t("div", bs, n(S.value.created), 1),
            e[52] || (e[52] = t("div", { class: "bi-result-label" }, "Created", -1))
          ]),
          t("div", vs, [
            t("div", fs, n(S.value.skipped), 1),
            e[53] || (e[53] = t("div", { class: "bi-result-label" }, "Skipped", -1))
          ]),
          t("div", ks, [
            t("div", ms, n(S.value.errors.length), 1),
            e[54] || (e[54] = t("div", { class: "bi-result-label" }, "Errors", -1))
          ])
        ]),
        S.value.errors.length ? (r(), i("div", hs, [
          t("div", _s, [
            t("div", gs, "Errors (" + n(S.value.errors.length) + ")", 1),
            t("button", {
              class: "b-btn b-btn-ghost",
              onClick: it,
              style: { "font-size": "12px" }
            }, [
              t("span", {
                innerHTML: u(d)("download", 12)
              }, null, 8, xs),
              e[55] || (e[55] = p(" Download error report ", -1))
            ])
          ]),
          t("div", qs, [
            (r(!0), i(k, null, q(S.value.errors, (s, a) => (r(), i("div", {
              key: a,
              class: "bi-error-item"
            }, [
              t("span", Cs, "Row " + n(s.row), 1),
              t("span", ws, n(s.error), 1)
            ]))), 128))
          ])
        ])) : b("", !0),
        t("div", Ts, [
          t("button", {
            class: "b-btn b-btn-ghost",
            onClick: ue
          }, "Import Another File"),
          S.value.created > 0 && R.value.route ? (r(), i("button", {
            key: 0,
            class: "b-btn b-btn-primary",
            onClick: rt
          }, " View " + n(R.value.label) + " → ", 1)) : b("", !0)
        ])
      ])) : b("", !0)
    ]));
  }
}, Hs = /* @__PURE__ */ nt(Ms, [["__scopeId", "data-v-54b4d68e"]]);
export {
  Hs as default
};
