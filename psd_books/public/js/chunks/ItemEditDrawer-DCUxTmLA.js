import { x as Ve, j as Ae, y as Be, o as Ge, k as o, C as Re, c as r, q as ie, b as c, a, n as U, t as m, u as h, i as $, r as T, F as b, d as S, w as x, A as F, D as oe, p as ne, v as E, H as Le, f as I, e as Ue, l as Ee, h as _, z as De, K as le, g as re, J as ze } from "./main-BmCP9zzu.js";
import { u as Ne } from "./useBarcodeScanner-CM52u1Ks.js";
import { f as u } from "./format-BcJZDVG4.js";
import { _ as de } from "./SearchableSelect-BSBsdJym.js";
const We = { class: "ad-header" }, je = { class: "ad-header-left" }, He = {
  key: 0,
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, $e = {
  key: 1,
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ke = { class: "ad-title" }, Ye = { class: "ad-subtitle" }, Je = ["innerHTML"], Qe = { class: "ad-tabs" }, Xe = ["onClick"], Ze = { class: "ad-body" }, et = { class: "ad-section" }, tt = { class: "ad-grid-2" }, at = { class: "ad-field" }, st = { class: "ad-field" }, it = { class: "ad-field" }, ot = { class: "ad-section" }, nt = { class: "ad-toggle-row" }, lt = { class: "ad-switch" }, rt = ["checked"], dt = {
  key: 0,
  class: "ad-section"
}, ut = { class: "ad-type-grid" }, ct = ["onClick"], _t = { class: "ad-type-icon" }, pt = { class: "ad-type-label" }, mt = { key: 0 }, ft = { key: 1 }, vt = { key: 2 }, ht = { key: 3 }, bt = { key: 4 }, yt = { key: 5 }, gt = { key: 6 }, kt = { class: "ad-section" }, xt = { class: "ad-toggle-row" }, wt = { class: "ad-switch" }, It = ["checked"], Mt = { class: "ad-section" }, St = { class: "ad-grid-2" }, Pt = { class: "ad-field" }, qt = ["disabled", "title"], Ct = ["value"], Tt = {
  key: 0,
  class: "ad-hint",
  style: { "margin-top": "4px" }
}, Ft = { class: "ad-field" }, Ot = ["value"], Vt = { key: 0 }, At = { class: "ad-field" }, Bt = { style: { display: "flex", gap: "6px" } }, Gt = ["innerHTML"], Rt = { class: "ad-field" }, Lt = { class: "ad-toggle-row" }, Ut = { class: "ad-switch" }, Et = ["checked"], Dt = { class: "ad-section" }, zt = {
  class: "ad-field",
  style: { "margin-top": "12px" }
}, Nt = ["value"], Wt = {
  class: "ad-toggle-row",
  style: { "margin-bottom": "20px" }
}, jt = { class: "ad-switch" }, Ht = ["checked"], $t = {
  key: 0,
  style: { "margin-bottom": "20px", "margin-top": "-10px", "font-size": "12px", color: "#b45309", background: "#fffbeb", border: "1px solid #fde68a", "border-radius": "6px", padding: "8px 10px" }
}, Kt = {
  key: 1,
  class: "ad-section"
}, Yt = { class: "ad-grid-2" }, Jt = { class: "ad-field" }, Qt = { class: "ad-section" }, Xt = { class: "ad-grid-2" }, Zt = {
  class: "ad-field",
  style: { "grid-column": "1/-1" }
}, ea = { class: "ad-section" }, ta = {
  class: "ad-toggle-sub",
  style: { "margin-bottom": "10px" }
}, aa = { class: "ad-grid-2" }, sa = { class: "ad-field" }, ia = ["value"], oa = { class: "ad-field" }, na = { class: "ad-label" }, la = { style: { display: "flex", "align-items": "center", gap: "6px" } }, ra = ["disabled"], da = {
  class: "text-muted",
  style: { "font-size": "12.5px", "white-space": "nowrap" }
}, ua = {
  key: 0,
  class: "ad-empty-state"
}, ca = {
  class: "ad-toggle-row",
  style: { "margin-bottom": "18px" }
}, _a = { class: "ad-switch" }, pa = ["checked"], ma = {
  key: 0,
  class: "vr-manage-cta"
}, fa = ["disabled"], va = {
  key: 1,
  class: "ad-empty-state",
  style: { "padding-top": "8px" }
}, ha = { class: "ad-footer" }, ba = ["disabled"], ya = {
  key: 0,
  class: "ad-spinner",
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5"
}, ga = {
  class: "rp-modal",
  style: { "max-width": "420px" }
}, ka = { class: "rp-header" }, xa = ["innerHTML"], wa = { style: { padding: "16px" } }, Ia = {
  key: 0,
  style: { "font-size": "13px", color: "#b91c1c", background: "#fef2f2", border: "1px solid #fecaca", "border-radius": "8px", padding: "12px" }
}, Ta = {
  __name: "ItemEditDrawer",
  emits: ["saved"],
  setup(Ma, { expose: ue, emit: ce }) {
    const { toast: g } = Ve();
    function _e(i) {
      i = (i || "").trim(), !(!i || !y.value) && (t.barcode = i, g(`Barcode captured: ${i}`, "success"), O());
    }
    const { cameraOpen: pe, cameraError: K, videoRef: me, openCamera: Y, closeCamera: O } = Ne({ onScan: _e }), J = Ae(), fe = ce, y = _(!1), p = _("add"), M = _("basic"), V = _(!1), D = _([]), z = _([]), P = _([]), A = _([]), ve = re(() => A.value.filter((i) => i.applies_to === "Purchase" || i.applies_to === "Both" || !i.applies_to)), B = _([]), N = _([]), Q = _([]), X = _(!1), q = _({ income: "", expense: "" }), W = _([]), j = _([]), C = _([]), t = De({
      name: "",
      item_code: "",
      item_name: "",
      item_group: "",
      item_type: "Product",
      stock_uom: "Nos",
      hsn_code: "",
      barcode: "",
      description: "",
      disabled: 0,
      brand: "",
      standard_rate: 0,
      standard_buying_rate: 0,
      mrp: 0,
      gst_rate: 16,
      tax_code: "",
      default_purchase_tax_template: "",
      income_account: "",
      expense_account: "",
      is_sales_item: 1,
      is_purchase_item: 1,
      portal_item: 0,
      is_asset_item: 0,
      is_fixed_asset: 0,
      asset_category: "",
      is_stock_item: 1,
      has_batch_no: 0,
      shelf_life_in_days: 0,
      valuation_method: "FIFO",
      default_warehouse: "",
      reorder_level: 0,
      reorder_qty: 0,
      opening_stock: 0,
      default_bom: "",
      quality_inspection_required: 0,
      min_order_qty: 0,
      lead_time_days: 0,
      inspection_required_before_purchase: 0,
      inspection_required_before_delivery: 0,
      inspection_required_before_manufacture: 0,
      has_variants: 0,
      purchase_uom: "",
      purchase_conversion_factor: 1,
      other_uom_conversions: []
    }), G = _([]), R = _(!1), he = (i) => String(i || "").split(",").map((e) => e.trim()).filter(Boolean);
    function be(i) {
      J.push({ name: "inventory-variants", params: { template: i.name } });
    }
    async function ye() {
      R.value = !0;
      try {
        t.has_variants = 1;
        const i = await se({ close: !1 });
        if (!i) return;
        y.value = !1, J.push({ name: "inventory-variants", params: { template: i } });
      } catch (i) {
        g("Could not open Variant Manager: " + i.message, "error");
      } finally {
        R.value = !1;
      }
    }
    const ge = ["Raw Material", "Work In Progress", "Finished Good", "Packing Material", "Scrap Item", "Product", "Service"], ke = {
      "Raw Material": "🌿",
      "Work In Progress": "⚙️",
      "Finished Good": "✅",
      "Packing Material": "📦",
      "Scrap Item": "♻️",
      Product: "🛒",
      Service: "🛠️"
    }, xe = {
      "Raw Material": "Raw Material",
      "Work In Progress": "WIP",
      "Finished Good": "Finished Good",
      "Packing Material": "Packing Material",
      "Scrap Item": "Scrap Item",
      Product: "Product",
      Service: "Service"
    }, Z = {
      "Raw Material": { bg: "#dcfce7", text: "#15803d" },
      "Work In Progress": { bg: "#fef9c3", text: "#a16207" },
      "Finished Good": { bg: "#dbeafe", text: "#1d4ed8" },
      "Packing Material": { bg: "#ede9fe", text: "#6d28d9" },
      "Scrap Item": { bg: "#fef3c7", text: "#b45309" },
      Product: { bg: "#f1f5f9", text: "#475569" },
      Service: { bg: "#fee2e2", text: "#b91c1c" }
    }, ee = {
      "Raw Material": { warehouse_type: "Raw Material Store", valuation: "FIFO", is_stock: 1, is_sales: 0, is_purchase: 1 },
      "Work In Progress": { warehouse_type: "WIP", valuation: "Moving Average", is_stock: 1, is_sales: 0, is_purchase: 0 },
      "Finished Good": { warehouse_type: "Finished Goods", valuation: "FIFO", is_stock: 1, is_sales: 1, is_purchase: 0 },
      "Packing Material": { warehouse_type: "Raw Material Store", valuation: "FIFO", is_stock: 1, is_sales: 0, is_purchase: 1 },
      "Scrap Item": { warehouse_type: "Scrap", valuation: "Moving Average", is_stock: 1, is_sales: 1, is_purchase: 0 },
      Product: { warehouse_type: "", valuation: "FIFO", is_stock: 1, is_sales: 1, is_purchase: 1 },
      Service: { warehouse_type: "", valuation: "FIFO", is_stock: 0, is_sales: 1, is_purchase: 1 }
    }, we = re(
      () => z.value.filter((i) => !i.is_group).map((i) => ({ value: i.name, label: i.name }))
    );
    async function Ie() {
      var k, f;
      const [i, e, d, n, s, v, w] = await Promise.allSettled([
        I("Item Group", { fields: ["name", "is_group"], order: "name asc", limit: 200 }),
        I("Warehouse", {
          fields: ["name", "warehouse_name", "warehouse_type"],
          filters: [["disabled", "=", 0]],
          order: "warehouse_name asc",
          limit: 200
        }),
        I("Tax Template", {
          fields: ["name", "template_name", "applies_to"],
          filters: [["disabled", "=", 0]],
          order: "template_name asc",
          limit: 100
        }),
        I("UOM", { fields: ["name"], order: "name asc", limit: 200 }),
        I("Brand", { fields: ["name"], filters: [["disabled", "=", 0]], order: "name asc", limit: 200 }),
        Ue().then(async (l) => (await Pe(l), l)),
        I("Asset Category", { fields: ["name", "category_name"], filters: [["is_active", "=", 1]], order: "category_name asc", limit: 200 })
      ]);
      i.status === "fulfilled" ? (z.value = i.value || [], D.value = (i.value || []).map((l) => l.name)) : D.value = ["Raw Materials", "Herbs & Botanicals", "Minerals & Bhasmas", "Oils & Fats", "WIP - Semi Finished", "Finished Goods - Capsules", "Finished Goods - Tablets", "Finished Goods - Oils", "Finished Goods - Churnam", "Finished Goods - Kashayam", "Finished Goods - Lehyam", "Packing Materials - Primary", "Packing Materials - Secondary", "Scrap Materials", "Services"], e.status === "fulfilled" ? P.value = (e.value || []).map((l) => ({
        name: l.name,
        label: (l.warehouse_name || l.name) + (l.warehouse_type ? " (" + l.warehouse_type + ")" : "")
      })) : P.value = [], d.status === "fulfilled" ? (A.value = (d.value || []).map((l) => ({ name: l.name, label: l.template_name || l.name, applies_to: l.applies_to || "Both" })), y.value && p.value === "add" && ae()) : A.value = [], n.status === "fulfilled" ? B.value = (n.value || []).map((l) => l.name) : B.value = ["Nos", "Kg", "Ltr", "Mtr", "Box", "Pcs", "Set", "Dozen"], s.status === "fulfilled" ? N.value = (s.value || []).map((l) => l.name) : N.value = [], w.status === "fulfilled" ? Q.value = (w.value || []).map((l) => ({ name: l.name, label: l.category_name || l.name })) : Q.value = [], v.status === "fulfilled" ? q.value = {
        income: ((k = W.value[0]) == null ? void 0 : k.value) || "",
        expense: ((f = j.value[0]) == null ? void 0 : f.value) || ""
      } : (q.value = { income: "", expense: "" }, W.value = [], j.value = []);
    }
    async function Me() {
      try {
        const i = await I("Item Group", { fields: ["name", "is_group"], order: "name asc", limit: 200 });
        z.value = i || [], D.value = (i || []).map((e) => e.name);
      } catch {
      }
    }
    async function Se(i) {
      if (i != null && i.trim())
        try {
          await le({ doctype: "Item Group", name: i.trim(), parent_item_group: "All Item Groups", is_group: 0 }), await Me(), t.item_group = i.trim(), g(`Group "${i.trim()}" created`);
        } catch (e) {
          g("Could not create group: " + e.message, "error");
        }
    }
    async function Pe(i) {
      const e = (k) => (k || []).map((f) => ({ value: f.name, label: f.name })), d = async (k, f) => {
        const l = [["is_group", "=", 0]];
        return f && l.push(["company", "=", f]), l.push(k), await I("Account", { fields: ["name"], filters: l, order: "name asc", limit: 500 });
      }, n = ["account_type", "=", "Income"], s = ["account_type", "in", ["Expense", "Cost of Goods Sold"]];
      let v = await d(n, i), w = await d(s, i);
      !v.length && !w.length && (v = await d(n, ""), w = await d(s, "")), W.value = e(v), j.value = e(w);
    }
    async function te(i) {
      if (!i) {
        C.value = [];
        return;
      }
      try {
        const e = await I("BOM", {
          fields: ["name", "item", "is_active", "is_default", "docstatus"],
          filters: [["item", "=", i], ["is_active", "=", 1], ["docstatus", "=", 1]],
          limit: 100,
          order: "is_default desc, modified desc"
        });
        C.value = e || [];
      } catch {
        C.value = [];
      }
    }
    Be(() => t.item_type, (i) => {
      p.value === "edit" && (i === "Finished Good" || i === "Work In Progress") ? te(t.name) : (C.value = [], t.default_bom = "");
    });
    let L = "";
    function qe(i) {
      t.is_asset_item = i ? 1 : 0, i ? (t.item_type !== "Product" && (L = t.item_type), t.item_type = "Product", H("Product")) : (t.item_type = L || "Raw Material", H(t.item_type), L = "");
    }
    function H(i) {
      const e = ee[i] || {};
      if (t.is_stock_item = e.is_stock !== void 0 ? e.is_stock : 1, t.is_sales_item = e.is_sales !== void 0 ? e.is_sales : 1, t.is_purchase_item = e.is_purchase !== void 0 ? e.is_purchase : 1, e.valuation && (t.valuation_method = e.valuation), e.warehouse_type && P.value.length) {
        const d = P.value.find((n) => (n.label || "").toLowerCase().includes(e.warehouse_type.toLowerCase()));
        d && (t.default_warehouse = d.name);
      }
    }
    function Ce(i) {
      p.value = "add", M.value = "basic", L = "", X.value = !1;
      const e = i || "Raw Material", d = ee[e] || {};
      if (Object.assign(t, {
        name: "",
        item_code: "",
        item_name: "",
        item_group: "",
        item_type: e,
        stock_uom: "Nos",
        hsn_code: "",
        barcode: "",
        description: "",
        disabled: 0,
        brand: "",
        standard_rate: 0,
        standard_buying_rate: 0,
        mrp: 0,
        gst_rate: 16,
        tax_code: "",
        default_purchase_tax_template: "",
        income_account: q.value.income,
        expense_account: q.value.expense,
        is_stock_item: d.is_stock !== void 0 ? d.is_stock : 1,
        is_sales_item: d.is_sales !== void 0 ? d.is_sales : 1,
        is_purchase_item: d.is_purchase !== void 0 ? d.is_purchase : 1,
        portal_item: 0,
        is_asset_item: 0,
        is_fixed_asset: 0,
        asset_category: "",
        has_batch_no: 0,
        shelf_life_in_days: 0,
        valuation_method: d.valuation || "FIFO",
        default_warehouse: "",
        reorder_level: 0,
        reorder_qty: 0,
        opening_stock: 0,
        default_bom: "",
        quality_inspection_required: 0,
        min_order_qty: 0,
        lead_time_days: 0,
        inspection_required_before_purchase: 0,
        inspection_required_before_delivery: 0,
        inspection_required_before_manufacture: 0,
        purchase_uom: "",
        purchase_conversion_factor: 1,
        other_uom_conversions: []
      }), d.warehouse_type && P.value.length) {
        const n = P.value.find((s) => (s.label || "").toLowerCase().includes(d.warehouse_type.toLowerCase()));
        n && (t.default_warehouse = n.name);
      }
      C.value = [], G.value = [], ae(), y.value = !0;
    }
    function ae() {
      const i = A.value.find((d) => d.label === "VAT 16%"), e = A.value.find((d) => d.label === "Input VAT 16%");
      i && !t.tax_code && (t.tax_code = i.name), e && !t.default_purchase_tax_template && (t.default_purchase_tax_template = e.name);
    }
    async function Te(i) {
      p.value = "edit", M.value = "basic", X.value = !1, Object.assign(t, {
        ...i,
        hsn_code: "",
        barcode: "",
        description: "",
        standard_buying_rate: 0,
        mrp: 0,
        brand: "",
        tax_code: "",
        default_purchase_tax_template: "",
        income_account: "",
        expense_account: "",
        valuation_method: "FIFO",
        default_warehouse: "",
        reorder_level: 0,
        reorder_qty: 0,
        opening_stock: 0
      }), G.value = [], y.value = !0;
      try {
        const e = await Ee("psd_books.api.docs.get_doc", { doctype: "Item", name: i.name });
        Object.assign(t, {
          hsn_code: e.hsn_code || "",
          barcode: e.barcode || "",
          description: e.description || "",
          standard_rate: u(e.standard_rate),
          standard_buying_rate: u(e.standard_buying_rate),
          mrp: u(e.mrp),
          tax_code: e.tax_code || "",
          default_purchase_tax_template: e.default_purchase_tax_template || "",
          income_account: e.income_account || q.value.income,
          expense_account: e.expense_account || q.value.expense,
          is_stock_item: e.is_stock_item ? 1 : 0,
          is_sales_item: e.is_sales_item === 0 ? 0 : 1,
          is_purchase_item: e.is_purchase_item === 0 ? 0 : 1,
          portal_item: e.portal_item ? 1 : 0,
          is_asset_item: e.is_asset_item ? 1 : 0,
          is_fixed_asset: e.is_fixed_asset ? 1 : 0,
          asset_category: e.asset_category || "",
          has_batch_no: e.has_batch_no ? 1 : 0,
          shelf_life_in_days: u(e.shelf_life_in_days),
          valuation_method: e.valuation_method || "FIFO",
          default_warehouse: e.default_warehouse || "",
          reorder_level: u(e.reorder_level),
          reorder_qty: u(e.reorder_qty),
          opening_stock: u(e.opening_stock),
          disabled: e.disabled ? 1 : 0,
          brand: e.brand || "",
          has_variants: e.has_variants ? 1 : 0,
          default_bom: e.default_bom || "",
          quality_inspection_required: e.quality_inspection_required ? 1 : 0,
          inspection_required_before_purchase: e.inspection_required_before_purchase ? 1 : 0,
          inspection_required_before_delivery: e.inspection_required_before_delivery ? 1 : 0,
          inspection_required_before_manufacture: e.inspection_required_before_manufacture ? 1 : 0,
          min_order_qty: u(e.min_order_qty),
          lead_time_days: e.lead_time_days ? parseInt(e.lead_time_days) : 0,
          purchase_uom: e.purchase_uom || "",
          purchase_conversion_factor: (() => {
            const s = (e.uom_conversions || []).find((v) => v.uom === e.purchase_uom);
            return s ? u(s.conversion_factor) : 1;
          })(),
          // Conversions set elsewhere (e.g. Warehouses > Set UOM) - kept as-is on save
          // so editing the item here never wipes them.
          other_uom_conversions: (e.uom_conversions || []).filter((n) => n.uom && n.uom !== e.purchase_uom && n.uom !== e.stock_uom).map((n) => ({ uom: n.uom, conversion_factor: u(n.conversion_factor) }))
        }), e.item_type === "Finished Good" || e.item_type === "Work In Progress" ? te(i.name) : C.value = [];
        const d = {};
        for (const n of e.attributes || [])
          n.attribute && (d[n.attribute] = d[n.attribute] || [], n.attribute_value && !d[n.attribute].includes(n.attribute_value) && d[n.attribute].push(n.attribute_value));
        G.value = Object.entries(d).map(([n, s]) => ({ attribute: n, valuesText: s.join(", ") }));
      } catch (e) {
        g("Could not load full item details: " + e.message, "error");
      }
    }
    function Fe() {
      const i = [
        [!t.item_name.trim(), "Item name is required", "basic"],
        [!t.stock_uom, "Default UOM is required", "basic"],
        // Sales tax template field hidden for Sava, so its required check is off too
        // [!form.tax_code,                                 "Default Sales Tax Template is required",     "pricing"],
        // Accounts section hidden for Sava, so these required checks are off too (else save is blocked)
        // [!form.income_account,                           "Income account is required",   "pricing"],
        // [!form.expense_account,                          "Expense account is required",  "pricing"],
        // Default Warehouse is optional now (can be set later)
        [
          !!t.is_fixed_asset && !!t.is_stock_item,
          "An item can't be both Is Fixed Asset and Track Inventory — a fixed asset is capitalized, not stocked. Turn one off.",
          "basic"
        ],
        [
          t.item_type !== "Work In Progress" && !t.is_sales_item && !t.is_purchase_item,
          "Enable Sales Item and/or Purchase Item — an item unusable in both won't show up anywhere",
          "basic"
        ],
        [
          !!t.purchase_uom && t.purchase_uom !== t.stock_uom && u(t.purchase_conversion_factor) <= 0,
          "Enter how many " + (t.stock_uom || "Stock UOM") + " make up 1 " + t.purchase_uom,
          "inventory"
        ]
      ];
      for (const [e, d, n] of i)
        if (e)
          return M.value = n, g(d, "error"), !1;
      return !0;
    }
    async function se({ close: i = !0 } = {}) {
      if (!Fe()) return null;
      V.value = !0;
      try {
        const e = p.value === "edit", d = t.item_code || t.item_name, n = u(t.opening_stock), s = u(t.standard_buying_rate) || u(t.standard_rate) || 0, v = [];
        if (t.has_variants) {
          for (const l of G.value)
            if (l.attribute)
              for (const Oe of he(l.valuesText)) v.push({ doctype: "Item Variant Attribute", attribute: l.attribute, attribute_value: Oe });
        }
        const w = {
          doctype: "Item",
          item_name: t.item_name,
          item_code: d,
          item_group: t.item_group || "Products",
          item_type: t.item_type,
          stock_uom: t.stock_uom,
          hsn_code: t.hsn_code,
          barcode: t.barcode || "",
          description: t.description,
          disabled: t.disabled ? 1 : 0,
          brand: t.brand || "",
          standard_rate: u(t.standard_rate),
          standard_buying_rate: u(t.standard_buying_rate),
          mrp: u(t.mrp),
          tax_code: t.tax_code,
          default_purchase_tax_template: t.default_purchase_tax_template || "",
          income_account: t.income_account,
          expense_account: t.expense_account,
          is_stock_item: t.is_stock_item ? 1 : 0,
          has_batch_no: t.is_stock_item && t.has_batch_no ? 1 : 0,
          is_sales_item: t.is_sales_item ? 1 : 0,
          is_purchase_item: t.is_purchase_item ? 1 : 0,
          portal_item: t.portal_item ? 1 : 0,
          is_asset_item: t.is_asset_item ? 1 : 0,
          is_fixed_asset: t.is_fixed_asset ? 1 : 0,
          asset_category: t.is_fixed_asset && t.asset_category || "",
          shelf_life_in_days: t.is_stock_item && t.has_batch_no ? u(t.shelf_life_in_days) : 0,
          valuation_method: t.valuation_method,
          default_warehouse: t.default_warehouse,
          reorder_level: u(t.reorder_level),
          reorder_qty: u(t.reorder_qty),
          opening_stock: n,
          has_variants: t.has_variants ? 1 : 0,
          attributes: v,
          default_bom: (t.item_type === "Finished Good" || t.item_type === "Work In Progress") && t.default_bom || "",
          inspection_required_before_purchase: t.inspection_required_before_purchase ? 1 : 0,
          inspection_required_before_delivery: t.inspection_required_before_delivery ? 1 : 0,
          inspection_required_before_manufacture: t.inspection_required_before_manufacture ? 1 : 0,
          // Legacy field kept in sync (OR of the three) so any older reports/filters relying on it still work.
          quality_inspection_required: t.inspection_required_before_purchase || t.inspection_required_before_delivery || t.inspection_required_before_manufacture ? 1 : 0,
          min_order_qty: u(t.min_order_qty),
          lead_time_days: t.lead_time_days ? parseInt(t.lead_time_days) : 0,
          purchase_uom: t.purchase_uom || "",
          uom_conversions: [
            ...(t.other_uom_conversions || []).filter((l) => l.uom !== t.purchase_uom && l.uom !== t.stock_uom && u(l.conversion_factor) > 0),
            ...t.purchase_uom && t.purchase_uom !== t.stock_uom ? [{ uom: t.purchase_uom, conversion_factor: u(t.purchase_conversion_factor) }] : []
          ]
        };
        e && (w.name = t.name);
        const k = await le(w), f = (k == null ? void 0 : k.name) || t.name || d;
        if (t.name = f, !e && t.is_stock_item && n > 0 && t.default_warehouse)
          try {
            const l = await ze("psd_books.api.inventory.create_opening_stock", {
              item_code: f,
              item_name: t.item_name,
              warehouse: t.default_warehouse,
              qty: n,
              rate: s
            });
            g("Stock entry " + l.stock_entry + " created: +" + n + " in " + t.default_warehouse);
          } catch (l) {
            g("Item saved but stock entry failed: " + l.message, "error");
          }
        return fe("saved", { name: f, isEdit: e }), i ? (g(e ? "Item updated" : "Item created"), y.value = !1) : p.value = "edit", f;
      } catch (e) {
        return g("Save failed: " + e.message, "error"), null;
      } finally {
        V.value = !1;
      }
    }
    return Ge(() => {
      Ie();
    }), ue({ openAdd: Ce, openEdit: Te, openVariants: be }), (i, e) => {
      var d, n;
      return o(), Re(Le, { to: "body" }, [
        y.value ? (o(), r("div", {
          key: 0,
          class: "ad-backdrop",
          onClick: e[0] || (e[0] = ie((s) => y.value = !1, ["self"]))
        })) : c("", !0),
        a("div", {
          class: U(["ad-panel", y.value ? "ad-panel--open" : ""])
        }, [
          a("div", We, [
            a("div", je, [
              a("div", {
                class: U(["ad-avatar", p.value === "add" ? "ad-avatar--add" : "ad-avatar--edit"])
              }, [
                p.value === "add" ? (o(), r("svg", He, [...e[40] || (e[40] = [
                  a("line", {
                    x1: "12",
                    y1: "5",
                    x2: "12",
                    y2: "19"
                  }, null, -1),
                  a("line", {
                    x1: "5",
                    y1: "12",
                    x2: "19",
                    y2: "12"
                  }, null, -1)
                ])])) : (o(), r("svg", $e, [...e[41] || (e[41] = [
                  a("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }, null, -1),
                  a("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" }, null, -1)
                ])]))
              ], 2),
              a("div", null, [
                a("div", Ke, m(p.value === "add" ? "New Item" : "Edit Item"), 1),
                a("div", Ye, m(p.value === "edit" ? t.item_code : "Fill in the details below"), 1)
              ])
            ]),
            a("button", {
              class: "ad-close",
              onClick: e[1] || (e[1] = (s) => y.value = !1)
            }, [
              a("span", {
                innerHTML: h($)("x", 15)
              }, null, 8, Je)
            ])
          ]),
          a("div", Qe, [
            (o(), r(b, null, T([{ k: "basic", l: "Basic Info", icon: "📋" }, { k: "pricing", l: "Pricing & Tax", icon: "💰" }, { k: "inventory", l: "Inventory", icon: "📦" }], (s) => a("button", {
              key: s.k,
              class: U(["ad-tab", M.value === s.k ? "ad-tab--active" : ""]),
              onClick: (v) => M.value = s.k
            }, m(s.l), 11, Xe)), 64))
          ]),
          a("div", Ze, [
            M.value === "basic" ? (o(), r(b, { key: 0 }, [
              a("div", et, [
                e[45] || (e[45] = a("div", { class: "ad-section-title" }, "Item Identity", -1)),
                a("div", tt, [
                  a("div", at, [
                    e[42] || (e[42] = a("label", { class: "ad-label" }, [
                      S("Item Name "),
                      a("span", { class: "ad-required" }, "*")
                    ], -1)),
                    x(a("input", {
                      class: "ad-input",
                      "onUpdate:modelValue": e[2] || (e[2] = (s) => t.item_name = s),
                      placeholder: "e.g. Laptop 15-inch"
                    }, null, 512), [
                      [F, t.item_name]
                    ])
                  ]),
                  a("div", st, [
                    e[43] || (e[43] = a("label", { class: "ad-label" }, [
                      S("Item Code "),
                      a("span", { class: "ad-required" }, "*")
                    ], -1)),
                    x(a("input", {
                      class: "ad-input",
                      "onUpdate:modelValue": e[3] || (e[3] = (s) => t.item_code = s),
                      placeholder: "Auto-filled from name if blank"
                    }, null, 512), [
                      [F, t.item_code]
                    ])
                  ])
                ]),
                a("div", it, [
                  e[44] || (e[44] = a("label", { class: "ad-label" }, "Item Group", -1)),
                  oe(de, {
                    modelValue: t.item_group,
                    "onUpdate:modelValue": e[4] || (e[4] = (s) => t.item_group = s),
                    options: we.value,
                    placeholder: "Search or create a group…",
                    createable: !0,
                    onCreate: Se
                  }, null, 8, ["modelValue", "options"])
                ])
              ]),
              a("div", ot, [
                a("div", nt, [
                  e[47] || (e[47] = a("div", { class: "ad-toggle-left" }, [
                    a("div", { class: "ad-toggle-title" }, "Asset Item"),
                    a("div", { class: "ad-toggle-sub" }, "Equipment and tools kept in the warehouse. Only Asset items can be requested with the Asset purpose on a Material Request")
                  ], -1)),
                  a("label", lt, [
                    a("input", {
                      type: "checkbox",
                      checked: !!t.is_asset_item,
                      onChange: e[5] || (e[5] = (s) => qe(s.target.checked))
                    }, null, 40, rt),
                    e[46] || (e[46] = a("span", { class: "ad-switch-track ad-switch-track--green" }, null, -1))
                  ])
                ]),
                t.is_asset_item ? (o(), r("div", {
                  key: 0,
                  style: ne(t.is_purchase_item ? "margin-top:10px;font-size:12px;color:#1d4ed8;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:8px 10px" : "margin-top:10px;font-size:12px;color:#b45309;background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:8px 10px")
                }, [
                  S(m(t.is_purchase_item ? "ℹ️" : "⚠️") + " To purchase this asset, keep the ", 1),
                  e[48] || (e[48] = a("b", null, "Purchase Item", -1)),
                  e[49] || (e[49] = S(" toggle below turned on. ", -1))
                ], 4)) : c("", !0)
              ]),
              t.is_asset_item ? c("", !0) : (o(), r("div", dt, [
                e[50] || (e[50] = a("div", { class: "ad-section-title" }, [
                  S("Item Type "),
                  a("span", {
                    class: "ad-hint",
                    style: { "font-size": "11px", "font-weight": "400" }
                  }, "(sets stock & valuation defaults)")
                ], -1)),
                a("div", ut, [
                  (o(), r(b, null, T(ge, (s) => a("button", {
                    key: s,
                    type: "button",
                    class: U(["ad-type-btn", { "ad-type-btn--active": t.item_type === s }]),
                    onClick: (v) => {
                      t.item_type = s, H(s);
                    }
                  }, [
                    a("span", _t, m(ke[s]), 1),
                    a("span", pt, m(xe[s] || s), 1)
                  ], 10, ct)), 64))
                ]),
                t.item_type ? (o(), r("div", {
                  key: 0,
                  class: "ad-type-info-strip",
                  style: ne({ background: ((d = Z[t.item_type]) == null ? void 0 : d.bg) || "#f1f5f9", color: ((n = Z[t.item_type]) == null ? void 0 : n.text) || "#475569" })
                }, [
                  t.item_type === "Raw Material" ? (o(), r("span", mt, "🧱 Construction materials bought and used on site — cement, steel, sand, binding wire, etc.")) : t.item_type === "Work In Progress" ? (o(), r("span", ft, "⚙️ Partly prepared material, not yet ready to use on site")) : t.item_type === "Finished Good" ? (o(), r("span", vt, "✅ Ready-made items and components that are used as they are")) : t.item_type === "Packing Material" ? (o(), r("span", ht, "📦 Bags, crates, wrapping and other packaging that comes with materials")) : t.item_type === "Scrap Item" ? (o(), r("span", bt, "♻️ Offcuts and surplus material left over on site — low value, can be resold")) : t.item_type === "Service" ? (o(), r("span", yt, "🛠️ Non-stock service — no inventory tracked")) : (o(), r("span", gt, "🛒 General purchased product"))
                ], 4)) : c("", !0)
              ])),
              a("div", kt, [
                e[60] || (e[60] = a("div", { class: "ad-section-title" }, [
                  S("Applicability "),
                  a("span", {
                    class: "ad-hint",
                    style: { "font-size": "11px", "font-weight": "400" }
                  }, "(where this item shows up)")
                ], -1)),
                a("div", xt, [
                  e[52] || (e[52] = a("div", { class: "ad-toggle-left" }, [
                    a("div", { class: "ad-toggle-title" }, "Purchase Item"),
                    a("div", { class: "ad-toggle-sub" }, "Show this item when creating Purchase Invoices, Purchase Orders, and Purchase Receipts")
                  ], -1)),
                  a("label", wt, [
                    a("input", {
                      type: "checkbox",
                      checked: !!t.is_purchase_item,
                      onChange: e[6] || (e[6] = (s) => t.is_purchase_item = s.target.checked ? 1 : 0)
                    }, null, 40, It),
                    e[51] || (e[51] = a("span", { class: "ad-switch-track ad-switch-track--green" }, null, -1))
                  ])
                ]),
                c("", !0),
                c("", !0),
                c("", !0),
                c("", !0),
                c("", !0)
              ]),
              a("div", Mt, [
                e[67] || (e[67] = a("div", { class: "ad-section-title" }, "Additional Info", -1)),
                a("div", St, [
                  a("div", Pt, [
                    e[62] || (e[62] = a("label", { class: "ad-label" }, [
                      S("Default UOM "),
                      a("span", { class: "ad-required" }, "*")
                    ], -1)),
                    x(a("select", {
                      class: "ad-input",
                      "onUpdate:modelValue": e[13] || (e[13] = (s) => t.stock_uom = s),
                      disabled: p.value === "edit",
                      title: p.value === "edit" ? "Default UOM cannot be changed after the item is created" : ""
                    }, [
                      e[61] || (e[61] = a("option", { value: "" }, "— Select UOM —", -1)),
                      (o(!0), r(b, null, T(B.value, (s) => (o(), r("option", {
                        key: s,
                        value: s
                      }, m(s), 9, Ct))), 128))
                    ], 8, qt), [
                      [E, t.stock_uom]
                    ]),
                    p.value === "edit" ? (o(), r("div", Tt, "Locked after creation — changing it would corrupt existing stock and rates.")) : c("", !0)
                  ]),
                  a("div", Ft, [
                    e[64] || (e[64] = a("label", { class: "ad-label" }, "Brand", -1)),
                    x(a("select", {
                      class: "ad-input",
                      "onUpdate:modelValue": e[14] || (e[14] = (s) => t.brand = s)
                    }, [
                      e[63] || (e[63] = a("option", { value: "" }, "— Select —", -1)),
                      (o(!0), r(b, null, T(N.value, (s) => (o(), r("option", {
                        key: s,
                        value: s
                      }, m(s), 9, Ot))), 128))
                    ], 512), [
                      [E, t.brand]
                    ])
                  ])
                ]),
                p.value === "edit" ? (o(), r("div", Vt, [
                  a("div", At, [
                    e[65] || (e[65] = a("label", { class: "ad-label" }, "Barcode", -1)),
                    a("div", Bt, [
                      x(a("input", {
                        class: "ad-input",
                        "onUpdate:modelValue": e[15] || (e[15] = (s) => t.barcode = s),
                        placeholder: "Scan or type barcode/SKU",
                        style: { flex: "1" }
                      }, null, 512), [
                        [F, t.barcode]
                      ]),
                      a("button", {
                        type: "button",
                        class: "add-lines-add-btn",
                        style: { "flex-shrink": "0" },
                        onClick: e[16] || (e[16] = (...s) => h(Y) && h(Y)(...s)),
                        title: "Scan a barcode to fill this field"
                      }, [
                        a("span", {
                          innerHTML: h($)("qr", 13)
                        }, null, 8, Gt)
                      ])
                    ])
                  ])
                ])) : c("", !0),
                a("div", Rt, [
                  e[66] || (e[66] = a("label", { class: "ad-label" }, "Description", -1)),
                  x(a("textarea", {
                    class: "ad-input ad-textarea",
                    "onUpdate:modelValue": e[17] || (e[17] = (s) => t.description = s),
                    rows: "3",
                    placeholder: "Optional item description…"
                  }, null, 512), [
                    [F, t.description]
                  ])
                ])
              ]),
              a("div", Lt, [
                e[69] || (e[69] = a("div", { class: "ad-toggle-left" }, [
                  a("div", { class: "ad-toggle-title" }, "Mark as Inactive"),
                  a("div", { class: "ad-toggle-sub" }, "Inactive items won't appear in transaction dropdowns")
                ], -1)),
                a("label", Ut, [
                  a("input", {
                    type: "checkbox",
                    checked: !!t.disabled,
                    onChange: e[18] || (e[18] = (s) => t.disabled = s.target.checked ? 1 : 0)
                  }, null, 40, Et),
                  e[68] || (e[68] = a("span", { class: "ad-switch-track" }, null, -1))
                ])
              ])
            ], 64)) : M.value === "pricing" ? (o(), r(b, { key: 1 }, [
              c("", !0),
              a("div", Dt, [
                e[79] || (e[79] = a("div", { class: "ad-section-title" }, "Tax", -1)),
                a("div", zt, [
                  e[77] || (e[77] = a("label", { class: "ad-label" }, "Default Purchase Tax Template", -1)),
                  x(a("select", {
                    class: "ad-input",
                    "onUpdate:modelValue": e[21] || (e[21] = (s) => t.default_purchase_tax_template = s)
                  }, [
                    e[76] || (e[76] = a("option", { value: "" }, "— Select —", -1)),
                    (o(!0), r(b, null, T(ve.value, (s) => (o(), r("option", {
                      key: s.name,
                      value: s.name
                    }, m(s.label), 9, Nt))), 128))
                  ], 512), [
                    [E, t.default_purchase_tax_template]
                  ]),
                  e[78] || (e[78] = a("div", {
                    class: "ad-hint",
                    style: { "margin-top": "6px" }
                  }, " Auto-filled on Bills, Debit Notes & Purchase Orders instead of the Sales template above — purchases need to post to an Input VAT account, not the VAT Payable account sales use. Left blank, the field is left empty on Bills too, so it won't silently pick the wrong account. ", -1))
                ])
              ])
            ], 64)) : M.value === "inventory" ? (o(), r(b, { key: 2 }, [
              a("div", Wt, [
                e[81] || (e[81] = a("div", { class: "ad-toggle-left" }, [
                  a("div", { class: "ad-toggle-title" }, "Track Inventory"),
                  a("div", { class: "ad-toggle-sub" }, "Maintain stock levels and ledger for this item")
                ], -1)),
                a("label", jt, [
                  a("input", {
                    type: "checkbox",
                    checked: !!t.is_stock_item,
                    onChange: e[22] || (e[22] = (s) => t.is_stock_item = s.target.checked ? 1 : 0)
                  }, null, 40, Ht),
                  e[80] || (e[80] = a("span", { class: "ad-switch-track ad-switch-track--green" }, null, -1))
                ])
              ]),
              t.is_stock_item && t.is_fixed_asset ? (o(), r("div", $t, " ⚠ Is Fixed Asset is also on for this item (Basic tab). A fixed asset shouldn't also be tracked as stock — the purchase would get double-booked (once to Fixed Asset, once to Stock/Inventory) and sit in a warehouse it'll never actually move from. Turn off Is Fixed Asset, or uncheck Track Inventory. ")) : c("", !0),
              t.is_stock_item && t.has_batch_no ? (o(), r("div", Kt, [
                e[84] || (e[84] = a("div", { class: "ad-section-title" }, "Shelf Life", -1)),
                a("div", Yt, [
                  a("div", Jt, [
                    e[82] || (e[82] = a("label", { class: "ad-label" }, "Shelf Life (Days)", -1)),
                    x(a("input", {
                      type: "number",
                      class: "ad-input",
                      "onUpdate:modelValue": e[23] || (e[23] = (s) => t.shelf_life_in_days = s),
                      min: "0"
                    }, null, 512), [
                      [F, t.shelf_life_in_days]
                    ]),
                    e[83] || (e[83] = a("div", {
                      class: "ad-toggle-sub",
                      style: { "margin-top": "4px" }
                    }, "If set, a Batch's Expiry Date is auto-calculated from Manufacturing Date + Shelf Life when left blank.", -1))
                  ])
                ])
              ])) : c("", !0),
              a("div", Qt, [
                e[89] || (e[89] = a("div", { class: "ad-section-title" }, "Stock Settings", -1)),
                a("div", Xt, [
                  c("", !0),
                  a("div", Zt, [
                    e[86] || (e[86] = a("label", { class: "ad-label" }, "Default Warehouse", -1)),
                    oe(de, {
                      modelValue: t.default_warehouse,
                      "onUpdate:modelValue": e[25] || (e[25] = (s) => t.default_warehouse = s),
                      options: P.value,
                      "value-key": "name",
                      "label-key": "label",
                      placeholder: "Select warehouse…"
                    }, null, 8, ["modelValue", "options"])
                  ])
                ]),
                c("", !0)
              ]),
              a("div", ea, [
                e[92] || (e[92] = a("div", { class: "ad-section-title" }, "Purchase Unit Conversion", -1)),
                a("div", ta, " If you buy this item in a different unit than you manufacture with (e.g. buy in Box, use in Kg), set that here. Purchase Orders/Invoices/Receipts entered in the Purchase UOM are auto-converted to Stock UOM (" + m(t.stock_uom || "Nos") + ") before hitting inventory and manufacturing. ", 1),
                a("div", aa, [
                  a("div", sa, [
                    e[91] || (e[91] = a("label", { class: "ad-label" }, "Purchase UOM", -1)),
                    x(a("select", {
                      class: "ad-input",
                      "onUpdate:modelValue": e[28] || (e[28] = (s) => t.purchase_uom = s)
                    }, [
                      e[90] || (e[90] = a("option", { value: "" }, "— Same as Stock UOM —", -1)),
                      (o(!0), r(b, null, T(B.value, (s) => (o(), r("option", {
                        key: s,
                        value: s
                      }, m(s), 9, ia))), 128))
                    ], 512), [
                      [E, t.purchase_uom]
                    ])
                  ]),
                  a("div", oa, [
                    a("label", na, "1 " + m(t.purchase_uom || "Purchase Unit") + " =", 1),
                    a("div", la, [
                      x(a("input", {
                        type: "number",
                        class: "ad-input",
                        "onUpdate:modelValue": e[29] || (e[29] = (s) => t.purchase_conversion_factor = s),
                        min: "0",
                        step: "any",
                        disabled: !t.purchase_uom,
                        style: { flex: "1" }
                      }, null, 8, ra), [
                        [
                          F,
                          t.purchase_conversion_factor,
                          void 0,
                          { number: !0 }
                        ]
                      ]),
                      a("span", da, m(t.stock_uom || "Nos"), 1)
                    ])
                  ])
                ])
              ]),
              c("", !0),
              c("", !0)
            ], 64)) : (o(), r(b, { key: 3 }, [
              p.value !== "edit" ? (o(), r("div", ua, [...e[107] || (e[107] = [
                a("div", { class: "ad-empty-icon" }, "🧩", -1),
                a("div", { class: "ad-empty-title" }, "Save the item first", -1),
                a("div", { class: "ad-empty-sub" }, "Create this item, then reopen it to configure attributes and generate variants.", -1)
              ])])) : (o(), r(b, { key: 1 }, [
                a("div", ca, [
                  e[109] || (e[109] = a("div", { class: "ad-toggle-left" }, [
                    a("div", { class: "ad-toggle-title" }, "Variant template"),
                    a("div", { class: "ad-toggle-sub" }, "Define attributes (Size, Colour…) and generate a sellable item for each combination.")
                  ], -1)),
                  a("label", _a, [
                    a("input", {
                      type: "checkbox",
                      checked: !!t.has_variants,
                      onChange: e[36] || (e[36] = (s) => t.has_variants = s.target.checked ? 1 : 0)
                    }, null, 40, pa),
                    e[108] || (e[108] = a("span", { class: "ad-switch-track ad-switch-track--green" }, null, -1))
                  ])
                ]),
                t.has_variants ? (o(), r("div", ma, [
                  e[110] || (e[110] = a("div", { class: "vr-manage-text" }, [
                    a("div", { class: "vr-manage-title" }, "Variant Manager"),
                    a("div", { class: "vr-manage-sub" }, "Define attributes, generate variants, and edit prices, SKUs & stock on a dedicated page.")
                  ], -1)),
                  a("button", {
                    class: "ad-btn-primary",
                    disabled: R.value,
                    onClick: ye
                  }, m(R.value ? "Opening…" : "Open Variant Manager →"), 9, fa)
                ])) : (o(), r("div", va, [...e[111] || (e[111] = [
                  a("div", { class: "ad-empty-icon" }, "🧩", -1),
                  a("div", { class: "ad-empty-sub" }, "Turn on “Variant template” to define attributes and generate variants.", -1)
                ])]))
              ], 64))
            ], 64))
          ]),
          a("div", ha, [
            a("button", {
              class: "ad-btn-ghost",
              onClick: e[37] || (e[37] = (s) => y.value = !1)
            }, "Cancel"),
            a("button", {
              class: "ad-btn-primary",
              disabled: V.value,
              onClick: se
            }, [
              V.value ? (o(), r("svg", ya, [...e[112] || (e[112] = [
                a("path", { d: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" }, null, -1)
              ])])) : c("", !0),
              S(" " + m(V.value ? "Saving…" : p.value === "edit" ? "Update Item" : "Create Item"), 1)
            ], 8, ba)
          ])
        ], 2),
        h(pe) ? (o(), r("div", {
          key: 1,
          class: "rp-bg",
          onClick: e[39] || (e[39] = ie((...s) => h(O) && h(O)(...s), ["self"]))
        }, [
          a("div", ga, [
            a("div", ka, [
              e[113] || (e[113] = a("h3", null, "Scan Barcode", -1)),
              a("button", {
                class: "inv-dclose",
                onClick: e[38] || (e[38] = (...s) => h(O) && h(O)(...s))
              }, [
                a("span", {
                  innerHTML: h($)("x", 16)
                }, null, 8, xa)
              ])
            ]),
            a("div", wa, [
              h(K) ? (o(), r("div", Ia, m(h(K)), 1)) : (o(), r(b, { key: 1 }, [
                a("video", {
                  ref_key: "itemScanVideoRef",
                  ref: me,
                  autoplay: "",
                  playsinline: "",
                  muted: "",
                  style: { width: "100%", "border-radius": "8px", background: "#000" }
                }, null, 512),
                e[114] || (e[114] = a("p", { style: { "font-size": "12px", color: "#6b7280", "margin-top": "10px", "text-align": "center" } }, "Point the camera at the barcode", -1))
              ], 64)),
              e[115] || (e[115] = a("p", { style: { "font-size": "11.5px", color: "#9ca3af", "margin-top": "8px", "text-align": "center" } }, " Tip: a USB/Bluetooth barcode scanner also works directly — just scan while this field is on screen. ", -1))
            ])
          ])
        ])) : c("", !0)
      ]);
    };
  }
};
export {
  Ta as _
};
