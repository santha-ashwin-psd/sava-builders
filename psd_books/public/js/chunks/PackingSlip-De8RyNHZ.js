import { _ as Le, x as Ue, h as f, y as ee, o as We, e as Fe, f as N, X as ze, c as n, a, d as x, t as i, w, v as De, W as Ie, A as P, F as M, r as te, b as r, n as G, D as _, u as be, S as Re, a7 as ae, g, K as Q, j as Te, a3 as He, k as l, p as je, C as Ae } from "./main-BAIA2aBR.js";
import { _ as C } from "./SearchableSelect-D-Fn5c2t.js";
import { o as ke } from "./userNames-WetNSJkN.js";
import { D as se } from "./DocLink-DUl_yykC.js";
const Ge = { class: "psx-page" }, Qe = { class: "psx-two-col" }, Ke = { class: "psx-list-panel" }, Xe = { class: "psx-panel-hdr" }, Ye = { class: "psx-panel-title" }, Je = { class: "psx-count" }, Ze = ["disabled", "title"], et = ["innerHTML"], tt = { class: "psx-list" }, at = {
  key: 1,
  class: "psx-list-empty"
}, st = ["onClick"], ot = { style: { display: "flex", "align-items": "flex-start", "justify-content": "space-between", gap: "8px" } }, lt = { class: "psx-item-name" }, nt = { class: "psx-item-meta" }, it = { class: "mono" }, dt = { key: 0 }, rt = { key: 1 }, ut = { class: "psx-item-right" }, pt = {
  class: "mono",
  style: { "font-size": "12.5px", "font-weight": "700", color: "var(--bx-mfgB)" }
}, ct = { style: { "font-size": "12px", color: "var(--bx-muted)", "margin-left": "auto" } }, mt = { class: "psx-list-pager" }, vt = { style: { display: "flex", gap: "6px" } }, bt = ["disabled"], kt = ["disabled"], ft = { class: "psx-detail-panel" }, gt = {
  key: 0,
  class: "psx-empty-state"
}, yt = ["disabled", "title"], ht = ["innerHTML"], xt = {
  key: 0,
  class: "psx-empty-state"
}, _t = { class: "psx-detail-hdr" }, wt = { class: "psx-hdr-flex" }, St = { class: "psx-hdr-info" }, Pt = { class: "psx-detail-title" }, Ct = { class: "psx-detail-meta" }, qt = {
  key: 0,
  class: "mono"
}, $t = { key: 1 }, Ot = { class: "psx-hdr-actions" }, Vt = ["innerHTML"], Bt = ["disabled"], Nt = ["disabled"], Mt = ["disabled"], Et = ["disabled"], Lt = { class: "psx-hdr-fields" }, Ut = {
  key: 0,
  style: { "font-size": "11px", color: "#94a3b8", "margin-top": "4px" }
}, Wt = ["value"], Ft = ["value"], zt = ["disabled"], Dt = ["disabled"], It = ["disabled"], Rt = { key: 0 }, Tt = ["value"], Ht = { class: "psx-body" }, jt = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", "margin-bottom": "8px" } }, At = { style: { display: "flex", gap: "8px" } }, Gt = ["disabled"], Qt = ["innerHTML"], Kt = { class: "psx-item-cards" }, Xt = {
  key: 0,
  class: "psx-tree-empty"
}, Yt = { class: "psx-item-card-hdr" }, Jt = ["onClick"], Zt = { class: "psx-item-card-body" }, ea = { class: "psx-item-field" }, ta = ["onUpdate:modelValue", "disabled"], aa = { class: "psx-item-field" }, sa = ["onUpdate:modelValue"], oa = { class: "psx-item-field" }, la = { class: "psx-item-field" }, na = {
  key: 0,
  class: "psx-item-field"
}, ia = ["onUpdate:modelValue", "disabled"], da = {
  key: 0,
  style: { padding: "12px 2px", display: "flex", gap: "24px", "font-size": "13px", color: "var(--bx-muted)", "margin-top": "6px" }
}, ra = { style: { color: "var(--bx-text)" } }, ua = {
  key: 0,
  style: { color: "var(--bx-green)", "font-weight": "600" }
}, pa = { style: { "margin-top": "18px" } }, ca = {
  key: 1,
  class: "psx-lo-cell",
  style: { "margin-top": "18px", display: "flex", "align-items": "center", "justify-content": "space-between" }
}, ma = { style: { "font-size": "13px" } }, va = {
  key: 2,
  class: "psx-lo-cell",
  style: { "margin-top": "10px", display: "flex", "align-items": "center", "justify-content": "space-between" }
}, ba = { style: { "font-size": "13px" } }, ka = {
  key: 0,
  class: "inv-view-footer"
}, fa = { class: "psx-footer" }, ga = ["disabled"], E = 20, ya = {
  __name: "PackingSlip",
  setup(ha) {
    const S = Re(), F = Te(), { toast: m } = Ue(), { confirm: oe } = He(), q = f(!1), le = f([]), K = f(""), z = f(""), h = f(0), ne = g(() => S.params.name && S.params.name !== "new" ? S.params.name : S.params.name === "new" ? "new" : null);
    async function L() {
      q.value = !0;
      try {
        const e = await N("Packing Slip", { fields: ["name", "work_order", "production_item", "qty_to_pack", "packing_date", "status", "modified"], limit: 1e3, order: "modified desc" });
        le.value = e || [];
      } catch {
        m("Could not load Packing Slips", "error");
      }
      q.value = !1;
    }
    const $ = g(() => {
      let t = le.value;
      z.value && (t = t.filter((o) => o.status === z.value));
      const e = K.value.toLowerCase().trim();
      return e && (t = t.filter((o) => [o.name, o.work_order, o.production_item].filter(Boolean).join(" ").toLowerCase().includes(e))), t;
    }), ie = g(() => $.value.slice(h.value * E, (h.value + 1) * E));
    function de(t) {
      return t === "Packed" ? "badge-active" : t === "In Progress" ? "badge-changed" : t === "Cancelled" ? "badge-removed" : "badge-draft";
    }
    function fe(t) {
      F.push(`/manufacturing/packing-slip/${t}`);
    }
    function re() {
      F.push("/manufacturing/packing-slip/new");
    }
    function ue() {
      F.push("/manufacturing/packing-slip");
    }
    const p = g(() => S.params.name === "new"), X = f(!1), v = f(!1), D = f(!1);
    function Y() {
      return {
        doctype: "Packing Slip",
        work_order: "",
        production_item: "",
        bom: "",
        source_work_order: "",
        status: "Draft",
        qty_to_pack: 1,
        packing_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        packed_by: "",
        source_warehouse: "",
        target_warehouse: "",
        stock_entry: "",
        posted_batch_no: "",
        items: [],
        remarks: ""
      };
    }
    const s = f(Y()), O = f([]), J = f([]), pe = f([]), y = g(() => !p.value && (s.value.status === "Packed" || s.value.status === "Cancelled")), V = g(() => !!s.value.stock_entry || s.value.status === "Cancelled"), I = f([]), R = f(!1), T = f({});
    function ce(t) {
      return T.value[t.item_code] || [];
    }
    async function H() {
      const t = [...new Set(
        (s.value.items || []).map((e) => e.source_warehouse || s.value.source_warehouse).filter(Boolean)
      )];
      if (!t.length) {
        T.value = {};
        return;
      }
      try {
        const e = await Promise.all(
          t.map((u) => ae("psd_books.api.inventory.get_warehouse_batches", { warehouse: u }).catch(() => ({})))
        ), o = {};
        e.forEach((u) => {
          const d = (u == null ? void 0 : u.message) || u || {};
          Object.entries(d).forEach(([k, B]) => {
            o[k] = [...o[k] || [], ...B];
          });
        }), T.value = o;
      } catch {
        T.value = {};
      }
    }
    ee(() => s.value.source_warehouse, H), ee(() => (s.value.items || []).map((t) => t.source_warehouse).join(","), H);
    const ge = g(
      () => (s.value.items || []).filter((t) => b(t.packed_qty) >= b(t.required_qty) - 1e-4 && b(t.required_qty) > 0).length
    );
    We(async () => {
      q.value = !0;
      try {
        const t = await Fe(), [e, o, u, d, k] = await Promise.all([
          N("Work Order", {
            fields: ["name", "production_item", "bom", "status", "qty", "produced_qty"],
            filters: [["docstatus", "=", 1], ["status", "!=", "Cancelled"]],
            limit: 500,
            order: "name desc"
          }),
          // A Packing Slip only ever consumes bulk stock into retail packs, which
          // is exactly what a "Packing" type BOM models (bulk_item + packing_items).
          // A regular "Manufacturing"/"Sub-Assembly" BOM explodes into raw
          // materials instead -- if a Work Order built on one of those slipped
          // through here, its raw-material breakdown would show up in the
          // Packing Slip's items table by mistake. Restricting the Work Order
          // picker to only Packing-BOM-backed orders prevents that at the source.
          N("BOM", {
            fields: ["name"],
            filters: [["bom_type", "=", "Packing"], ["docstatus", "=", 1]],
            limit: 2e3
          }),
          N("Item", { fields: ["name", "item_name", "stock_uom"], filters: [["is_stock_item", "=", 1], ["disabled", "=", 0]], limit: 5e3, order: "name asc" }),
          N("UOM", { fields: ["name"], limit: 200, order: "name asc" }),
          N("Warehouse", { fields: ["name"], filters: [["company", "=", t], ["is_group", "=", 0]], limit: 200, order: "name asc" })
        ]), B = new Set((o || []).map((W) => W.name));
        O.value = (e || []).filter((W) => B.has(W.bom)), J.value = u || [], pe.value = d || [], I.value = k || [];
      } catch (t) {
        m("Error loading manufacturing data: " + t.message, "error");
      }
      await L(), S.params.name && await Z(), await H(), q.value = !1;
    }), ee(() => S.params.name, async (t) => {
      if (!t) {
        s.value = Y();
        return;
      }
      await Z(), await H();
    });
    async function Z() {
      if (p.value) {
        s.value = Y();
        return;
      }
      X.value = !0;
      try {
        const t = await ze("Packing Slip", S.params.name);
        s.value = t, s.value.items || (s.value.items = []);
      } catch (t) {
        m("Error loading Packing Slip: " + t.message, "error"), ue();
      }
      X.value = !1;
    }
    async function ye() {
      const t = O.value.find((e) => e.name === s.value.work_order);
      t && (s.value.production_item = t.production_item || "", s.value.bom = t.bom || "", s.value.qty_to_pack = Math.max(0, b(t.qty) - b(t.produced_qty)), await me());
    }
    async function me() {
      if (!s.value.work_order) return;
      const t = O.value.find((e) => e.name === s.value.work_order);
      if (!t || !t.bom) return m("No BOM found on the selected Work Order", "error");
      D.value = !0;
      try {
        const e = await ae(
          "psd_books.manufacturing.work_order_engine.get_bom_breakdown",
          { bom: t.bom, qty: b(s.value.qty_to_pack) || b(t.qty) || 1, work_order: t.name }
        );
        s.value.items = (e.items || []).map((o) => ({
          item_code: o.item_code,
          item_name: o.item_name || "",
          // Backend already rounds required_qty (get_bom_breakdown); round4 here
          // too as a defensive mirror of BOM.vue/WorkOrder.vue's own round4, in
          // case this value gets re-derived client-side before save.
          required_qty: Se(o.required_qty),
          packed_qty: 0,
          uom: o.uom || "",
          source_warehouse: o.source_warehouse || ""
        })), s.value.items.length || m("No materials found in BOM. Make sure the Packing BOM has packing materials.", "error");
      } catch (e) {
        m(e.message, "error");
      }
      D.value = !1;
    }
    function he() {
      s.value.items.push({ item_code: "", item_name: "", required_qty: 1, packed_qty: 0, uom: "", source_warehouse: "" });
    }
    async function ve() {
      if (!s.value.work_order) return m("Select a Work Order", "error");
      if (!s.value.items.length) return m("Add at least one item", "error");
      v.value = !0;
      try {
        const t = await Q(s.value);
        m(p.value ? "Packing Slip created" : "Packing Slip updated"), p.value ? F.replace(`/manufacturing/packing-slip/${t.name}`) : s.value = t, L();
      } catch (t) {
        m(t.message, "error");
      }
      v.value = !1;
    }
    async function xe() {
      v.value = !0;
      try {
        s.value.status = "Packed";
        for (const e of s.value.items)
          b(e.packed_qty) < b(e.required_qty) && (e.packed_qty = e.required_qty);
        const t = await Q(s.value);
        s.value = t, m("Packing Slip marked as Packed"), L();
      } catch (t) {
        m(t.message, "error");
      }
      v.value = !1;
    }
    async function _e() {
      if (!s.value.source_warehouse) return m("Select a 'Consume Materials From' warehouse first", "error");
      R.value = !0;
      try {
        const t = await Q(s.value);
        s.value = t;
        const e = await ae(
          "psd_books.manufacturing.packing_engine.post_packing_consumption",
          { packing_slip: s.value.name }
        );
        m(`Stock posted — ${e}`), await Z(), L();
      } catch (t) {
        /Not enough stock/i.test(t.message || "") || /Cannot pack/i.test(t.message || "") ? await oe({
          title: "Could Not Pack",
          body: t.message,
          okLabel: "OK",
          okStyle: "primary",
          hideCancel: !0
        }) : m(t.message, "error");
      }
      R.value = !1;
    }
    async function we() {
      if (oe("Cancel this Packing Slip?")) {
        v.value = !0;
        try {
          s.value.status = "Cancelled";
          const t = await Q(s.value);
          s.value = t, m("Packing Slip cancelled"), L();
        } catch (t) {
          m(t.message, "error");
        }
        v.value = !1;
      }
    }
    function b(t) {
      const e = parseFloat(t);
      return isNaN(e) ? 0 : e;
    }
    function Se(t) {
      return Math.round((b(t) + Number.EPSILON) * 1e4) / 1e4;
    }
    function U(t) {
      const e = parseFloat(t);
      return isNaN(e) ? "0.00" : e.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function j(t) {
      if (!t) return "—";
      const e = new Date(t);
      return isNaN(e) ? t : e.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }
    function c(t) {
      return String(t ?? "").replace(/[&<>"']/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]);
    }
    function Pe() {
      const t = s.value, e = (k) => {
        const B = J.value.find((W) => W.name === k);
        return B && B.item_name || k;
      }, o = (t.items || []).length ? (t.items || []).map((k) => `
        <tr>
          <td>${c(k.item_code)}</td>
          <td>${c(e(k.item_code))}</td>
          <td style="text-align:right">${c(U(k.required_qty))}</td>
          <td style="text-align:right">${c(U(k.packed_qty))}</td>
          <td>${c(k.uom || "Nos")}</td>
          <td>${c(k.source_warehouse || "—")}</td>
          <td>${c(k.batch_no || "—")}</td>
        </tr>`).join("") : '<tr><td colspan="7" style="text-align:center;color:#868E96">No items</td></tr>', u = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Packing Slip ${c(t.name)}</title>
        <style>
          * { box-sizing:border-box; margin:0; padding:0; }
          body { font-family: Arial, Helvetica, sans-serif; color:#1A1D23; background:#e5e7eb; min-height:100vh; }
          .toolbar { position:sticky; top:0; z-index:10; background:#fff; padding:10px 18px; border-bottom:1px solid #e5e7eb; display:flex; align-items:center; gap:10px; box-shadow:0 1px 4px rgba(0,0,0,.06); }
          .tb-lbl { font-size:11.5px; font-weight:700; color:#374151; letter-spacing:.04em; }
          .print-btn { margin-left:auto; background:#1a6ef7; color:#fff; border:none; padding:7px 16px; border-radius:7px; font-weight:700; cursor:pointer; font:inherit; font-size:12.5px; display:flex; align-items:center; gap:6px; }
          .print-btn:hover { background:#1558d0; }
          .doc-wrap { max-width:820px; margin:20px auto; background:#fff; box-shadow:0 4px 24px rgba(0,0,0,.1); border-radius:8px; overflow:hidden; }
          .sheet { padding:28px 30px; }
          h1 { font-size:18px; margin:0 0 4px; }
          .sub { color:#868E96; font-size:12px; margin-bottom:20px; padding-bottom:14px; border-bottom:1px solid #E2E8F0; }
          .meta { display:grid; grid-template-columns: 1fr 1fr; gap:10px 24px; margin-bottom:22px; font-size:13px; }
          .meta div { border:1px solid #E2E8F0; border-radius:6px; padding:8px 10px; }
          .meta div span { color:#868E96; display:block; font-size:10.5px; text-transform:uppercase; letter-spacing:.04em; margin-bottom:2px; }
          table { width:100%; border-collapse:collapse; font-size:13px; border:1px solid #E2E8F0; border-radius:6px; overflow:hidden; margin-bottom:22px; }
          th, td { border:1px solid #E2E8F0; padding:8px 10px; text-align:left; }
          th { background:#F8F9FC; font-size:11px; text-transform:uppercase; letter-spacing:.03em; color:#868E96; }
          h2 { font-size:13px; text-transform:uppercase; letter-spacing:.03em; color:#868E96; margin:0 0 8px; }
          .rem { border:1px solid #E2E8F0; border-radius:6px; padding:10px; font-size:13px; min-height:40px; white-space:pre-wrap; }
          @media print { .toolbar { display:none!important; } body { background:#fff; } .doc-wrap { box-shadow:none; margin:0; max-width:none; border-radius:0; } }
        </style>
      </head>
      <body>
        <div class="toolbar">
          <span class="tb-lbl">PRINT PREVIEW</span>
          <button class="print-btn" onclick="window.print()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print
          </button>
        </div>
        <div class="doc-wrap"><div class="sheet">
          <h1>Packing Slip — ${c(t.name)}</h1>
          <div class="sub">Printed ${c((/* @__PURE__ */ new Date()).toLocaleString())}</div>
          <div class="meta">
            <div><span>Work Order</span>${c(t.work_order || "—")}</div>
            <div><span>Item Being Packed</span>${c(e(t.production_item) || t.production_item || "—")}</div>
            <div><span>Packing BOM</span>${c(t.bom || "—")}</div>
            <div><span>Status</span>${c(t.status || "Draft")}</div>
            <div><span>Qty to Pack</span>${c(U(t.qty_to_pack || 0))}</div>
            <div><span>Packing Date</span>${c(j(t.packing_date) || "—")}</div>
            <div><span>Packed By</span>${c(t.packed_by || "—")}</div>
            <div><span>Consume Materials From</span>${c(t.source_warehouse || "—")}</div>
          </div>

          <h2>Items to Pack</h2>
          <table>
            <thead><tr><th>Item Code</th><th>Item Name</th><th style="text-align:right">Required</th><th style="text-align:right">Packed</th><th>UOM</th><th>Source Warehouse</th><th>Batch</th></tr></thead>
            <tbody>${o}</tbody>
          </table>

          ${t.remarks ? `<h2>Remarks</h2><div class="rem">${c(t.remarks)}</div>` : ""}
        </div></div>
      </body>
    </html>`, d = window.open("", "_blank");
      if (!d) {
        m("Please allow pop-ups to print", "error");
        return;
      }
      d.document.open(), d.document.write(u), d.document.close(), d.focus();
    }
    const Ce = {
      plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
      printer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>'
    };
    function A(t, e) {
      return (Ce[t] || "").replace("<svg ", `<svg width="${e}" height="${e}" `);
    }
    const qe = g(() => [{ value: "", label: "— Select —" }, ...(O.value || []).map((t) => ({ value: t.name, label: `${t.name} — ${t.production_item}` }))]), $e = g(() => [{ value: "", label: "— None —" }, ...(O.value || []).map((t) => ({ value: t.name, label: `${t.name} — ${t.production_item}` }))]), Oe = g(() => [{ value: "", label: "— Select —" }, ...(I.value || []).map((t) => ({ value: t.name, label: t.name }))]), Ve = g(() => [{ value: "", label: "— Defaults to Work Order FG Warehouse —" }, ...(I.value || []).map((t) => ({ value: t.name, label: t.name }))]), Be = g(() => [{ value: "", label: "— Select —" }, ...(J.value || []).map((t) => ({ value: t.name, label: t.item_name || t.name }))]), Ne = g(() => [{ value: "", label: "—" }, ...(pe.value || []).map((t) => ({ value: t.name, label: t.name }))]), Me = g(() => [{ value: "", label: '— Use "Consume Materials From" above —' }, ...(I.value || []).map((t) => ({ value: t.name, label: t.name }))]);
    function Ee(t) {
      const e = ce(t) || [], o = e.map((u) => ({ value: u.batch_no, label: `${u.batch_no} — ${U(u.qty)} on hand${u.is_expired ? " · Expired" : u.expires_soon ? " · Expires soon" : ""}` }));
      return t.batch_no && !e.some((u) => u.batch_no === t.batch_no) && o.push({ value: t.batch_no, label: t.batch_no }), [{ value: "", label: "— Select Batch —" }, ...o];
    }
    return (t, e) => (l(), n("div", Ge, [
      a("div", Qe, [
        a("div", Ke, [
          a("div", Xe, [
            a("span", Ye, [
              e[14] || (e[14] = x("📦 Packing Slips ", -1)),
              a("span", Je, "(" + i($.value.length) + ")", 1)
            ]),
            a("button", {
              class: "psx-btn psx-btn-mfg psx-btn-sm",
              disabled: !t.$canCreate("inventory"),
              title: t.$canCreate("inventory") ? "" : "Read-only access",
              onClick: re
            }, [
              a("span", {
                innerHTML: A("plus", 12)
              }, null, 8, et),
              e[15] || (e[15] = x(" New", -1))
            ], 8, Ze)
          ]),
          w(a("select", {
            class: "psx-fi psx-status-filter",
            "onUpdate:modelValue": e[0] || (e[0] = (o) => z.value = o),
            onChange: e[1] || (e[1] = (o) => h.value = 0)
          }, [...e[16] || (e[16] = [
            Ie('<option value="" data-v-75f4465a>All Status</option><option value="Draft" data-v-75f4465a>Draft</option><option value="In Progress" data-v-75f4465a>In Progress</option><option value="Packed" data-v-75f4465a>Packed</option><option value="Cancelled" data-v-75f4465a>Cancelled</option>', 5)
          ])], 544), [
            [De, z.value]
          ]),
          w(a("input", {
            class: "psx-search",
            "onUpdate:modelValue": e[2] || (e[2] = (o) => K.value = o),
            type: "text",
            placeholder: "Search by name or work order…"
          }, null, 512), [
            [P, K.value]
          ]),
          a("div", tt, [
            q.value ? (l(), n(M, { key: 0 }, te(5, (o) => a("div", {
              key: o,
              class: "psx-item"
            }, [...e[17] || (e[17] = [
              a("div", {
                class: "shimmer",
                style: { height: "38px", "border-radius": "6px" }
              }, null, -1)
            ])])), 64)) : ie.value.length ? (l(!0), n(M, { key: 2 }, te(ie.value, (o) => (l(), n("div", {
              key: o.name,
              class: G(["psx-item", { active: ne.value === o.name }]),
              onClick: (u) => fe(o.name)
            }, [
              a("div", ot, [
                a("div", lt, i(o.production_item || o.name), 1),
                a("span", {
                  class: G(["psx-badge", de(o.status)])
                }, i(o.status), 3)
              ]),
              a("div", nt, [
                a("span", it, i(o.name), 1),
                o.work_order ? (l(), n("span", dt, "•")) : r("", !0),
                o.work_order ? (l(), n("span", rt, [
                  _(se, {
                    doctype: "Work Order",
                    name: o.work_order,
                    "mono-style": !1
                  }, null, 8, ["name"])
                ])) : r("", !0)
              ]),
              a("div", ut, [
                e[18] || (e[18] = a("span", { style: { "font-size": "12px", color: "var(--bx-muted)" } }, "Qty:", -1)),
                a("span", pt, i(U(o.qty_to_pack)), 1),
                a("span", ct, i(j(o.packing_date)), 1)
              ])
            ], 10, st))), 128)) : (l(), n("div", at, "No Packing Slips found"))
          ]),
          a("div", mt, [
            a("span", null, i($.value.length ? h.value * E + 1 : 0) + "–" + i(Math.min((h.value + 1) * E, $.value.length)) + " of " + i($.value.length), 1),
            a("div", vt, [
              a("button", {
                class: "psx-btn-icon",
                onClick: e[3] || (e[3] = (o) => h.value > 0 && h.value--),
                disabled: h.value === 0
              }, "‹", 8, bt),
              a("button", {
                class: "psx-btn-icon",
                onClick: e[4] || (e[4] = (o) => (h.value + 1) * E < $.value.length && h.value++),
                disabled: (h.value + 1) * E >= $.value.length
              }, "›", 8, kt)
            ])
          ])
        ]),
        a("div", ft, [
          ne.value ? (l(), n(M, { key: 1 }, [
            X.value ? (l(), n("div", xt, [...e[23] || (e[23] = [
              a("div", {
                class: "shimmer",
                style: { height: "200px", "border-radius": "10px" }
              }, null, -1)
            ])])) : (l(), n(M, { key: 1 }, [
              a("div", _t, [
                a("div", wt, [
                  a("div", St, [
                    a("div", Pt, i(p.value ? "New Packing Slip" : s.value.production_item || s.value.name), 1),
                    a("div", Ct, [
                      p.value ? r("", !0) : (l(), n("span", qt, i(s.value.name), 1)),
                      p.value ? r("", !0) : (l(), n("span", $t, "•")),
                      a("span", null, "Qty to Pack: " + i(s.value.qty_to_pack || 0), 1),
                      e[24] || (e[24] = a("span", null, "•", -1)),
                      a("span", {
                        class: G(["psx-badge", de(s.value.status)]),
                        style: { "font-size": "11px" }
                      }, i(s.value.status), 3)
                    ])
                  ]),
                  a("div", Ot, [
                    a("button", {
                      class: "psx-btn psx-btn-ghost-inv",
                      onClick: ue
                    }, "Back"),
                    p.value ? r("", !0) : (l(), n("button", {
                      key: 0,
                      class: "psx-btn psx-btn-ghost-inv",
                      onClick: Pe,
                      title: "Print Packing Slip"
                    }, [
                      a("span", {
                        innerHTML: A("printer", 12)
                      }, null, 8, Vt),
                      e[25] || (e[25] = x(" Print ", -1))
                    ])),
                    !p.value && s.value.status !== "Cancelled" ? (l(), n("button", {
                      key: 1,
                      class: "psx-btn psx-btn-light",
                      style: { color: "#C92A2A" },
                      onClick: we,
                      disabled: v.value || !t.$canDelete("inventory")
                    }, i(v.value ? "Cancelling…" : "Cancel"), 9, Bt)) : r("", !0),
                    !p.value && s.value.status === "In Progress" ? (l(), n("button", {
                      key: 2,
                      class: "psx-btn psx-btn-light",
                      style: { color: "#2F9E44" },
                      onClick: xe,
                      disabled: v.value || !t.$canEdit("inventory")
                    }, i(v.value ? "Saving…" : "Mark as Packed"), 9, Nt)) : r("", !0),
                    !p.value && s.value.status === "Packed" && !s.value.stock_entry ? (l(), n("button", {
                      key: 3,
                      class: "psx-btn psx-btn-mfg",
                      onClick: _e,
                      disabled: R.value || v.value || !t.$canEdit("inventory")
                    }, i(R.value ? "Posting…" : "📦 Post Stock Consumption"), 9, Mt)) : r("", !0),
                    y.value ? r("", !0) : (l(), n("button", {
                      key: 4,
                      class: "psx-btn psx-btn-light",
                      onClick: ve,
                      disabled: v.value || q.value || !(p.value ? t.$canCreate("inventory") : t.$canEdit("inventory"))
                    }, i(v.value ? "Saving…" : p.value ? "Save" : "Save Changes"), 9, Et))
                  ])
                ])
              ]),
              a("div", Lt, [
                a("div", null, [
                  e[26] || (e[26] = a("div", { class: "psx-hf-label" }, "Work Order", -1)),
                  _(C, {
                    modelValue: s.value.work_order,
                    "onUpdate:modelValue": e[5] || (e[5] = (o) => s.value.work_order = o),
                    options: qe.value,
                    placeholder: "— Select —",
                    disabled: !p.value,
                    onSelect: e[6] || (e[6] = (o) => ye()),
                    style: { width: "100%" }
                  }, null, 8, ["modelValue", "options", "disabled"]),
                  O.value.length ? r("", !0) : (l(), n("div", Ut, " No submitted Work Orders on a Packing BOM found. Create a Work Order against a Packing-type BOM first. "))
                ]),
                a("div", null, [
                  e[27] || (e[27] = a("div", { class: "psx-hf-label" }, "Item Being Packed", -1)),
                  a("input", {
                    class: "psx-fi",
                    value: s.value.production_item || "—",
                    disabled: "",
                    style: { width: "100%" }
                  }, null, 8, Wt)
                ]),
                a("div", null, [
                  e[28] || (e[28] = a("div", { class: "psx-hf-label" }, "Packing BOM", -1)),
                  a("input", {
                    class: "psx-fi",
                    value: s.value.bom || "—",
                    disabled: "",
                    style: { width: "100%" }
                  }, null, 8, Ft)
                ]),
                a("div", null, [
                  e[29] || (e[29] = a("div", { class: "psx-hf-label" }, "Sourced From (Bulk WO)", -1)),
                  _(C, {
                    modelValue: s.value.source_work_order,
                    "onUpdate:modelValue": e[7] || (e[7] = (o) => s.value.source_work_order = o),
                    options: $e.value,
                    placeholder: "— None —",
                    disabled: y.value,
                    style: { width: "100%" }
                  }, null, 8, ["modelValue", "options", "disabled"])
                ]),
                a("div", null, [
                  e[30] || (e[30] = a("div", { class: "psx-hf-label" }, "Qty to Pack", -1)),
                  w(a("input", {
                    class: "psx-fi psx-fi-mono",
                    type: "number",
                    "onUpdate:modelValue": e[8] || (e[8] = (o) => s.value.qty_to_pack = o),
                    min: "0.001",
                    step: "any",
                    disabled: y.value,
                    style: { width: "100%" }
                  }, null, 8, zt), [
                    [P, s.value.qty_to_pack]
                  ])
                ]),
                a("div", null, [
                  e[31] || (e[31] = a("div", { class: "psx-hf-label" }, "Packing Date", -1)),
                  w(a("input", {
                    class: "psx-fi",
                    type: "date",
                    "onUpdate:modelValue": e[9] || (e[9] = (o) => s.value.packing_date = o),
                    disabled: y.value,
                    style: { width: "100%" }
                  }, null, 8, Dt), [
                    [P, s.value.packing_date]
                  ])
                ]),
                a("div", null, [
                  e[32] || (e[32] = a("div", { class: "psx-hf-label" }, "Packed By", -1)),
                  w(a("input", {
                    class: "psx-fi",
                    "onUpdate:modelValue": e[10] || (e[10] = (o) => s.value.packed_by = o),
                    disabled: y.value,
                    style: { width: "100%" }
                  }, null, 8, It), [
                    [P, s.value.packed_by]
                  ])
                ]),
                a("div", null, [
                  e[33] || (e[33] = a("div", { class: "psx-hf-label" }, "Consume Materials From", -1)),
                  _(C, {
                    modelValue: s.value.source_warehouse,
                    "onUpdate:modelValue": e[11] || (e[11] = (o) => s.value.source_warehouse = o),
                    options: Oe.value,
                    placeholder: "— Select —",
                    disabled: V.value,
                    style: { width: "100%" }
                  }, null, 8, ["modelValue", "options", "disabled"])
                ]),
                a("div", null, [
                  e[34] || (e[34] = a("div", { class: "psx-hf-label" }, "Receive Packed Goods At", -1)),
                  _(C, {
                    modelValue: s.value.target_warehouse,
                    "onUpdate:modelValue": e[12] || (e[12] = (o) => s.value.target_warehouse = o),
                    options: Ve.value,
                    placeholder: "— Defaults to Work Order FG Warehouse —",
                    disabled: V.value,
                    style: { width: "100%" }
                  }, null, 8, ["modelValue", "options", "disabled"])
                ]),
                s.value.stock_entry ? (l(), n("div", Rt, [
                  e[35] || (e[35] = a("div", { class: "psx-hf-label" }, "Stock Entry Posted", -1)),
                  a("input", {
                    class: "psx-fi",
                    value: s.value.stock_entry,
                    disabled: "",
                    style: { width: "100%", color: "var(--bx-green)", "font-weight": "600" }
                  }, null, 8, Tt)
                ])) : r("", !0)
              ]),
              a("div", Ht, [
                a("div", jt, [
                  e[37] || (e[37] = a("div", { class: "psx-section-lbl" }, "Items to Pack", -1)),
                  a("div", At, [
                    !y.value && s.value.work_order ? (l(), n("button", {
                      key: 0,
                      class: "psx-btn psx-btn-light psx-btn-sm",
                      onClick: me,
                      disabled: D.value
                    }, i(D.value ? "Loading…" : "↻ Reload from WO"), 9, Gt)) : r("", !0),
                    y.value ? r("", !0) : (l(), n("button", {
                      key: 1,
                      class: "psx-btn psx-btn-light psx-btn-sm",
                      onClick: he
                    }, [
                      a("span", {
                        innerHTML: A("plus", 11)
                      }, null, 8, Qt),
                      e[36] || (e[36] = x(" Add Row", -1))
                    ]))
                  ])
                ]),
                a("div", Kt, [
                  !s.value.items || !s.value.items.length ? (l(), n("div", Xt, 'No items. Select a Work Order and click "Reload from WO".')) : r("", !0),
                  (l(!0), n(M, null, te(s.value.items, (o, u) => (l(), n("div", {
                    key: u,
                    class: G(["psx-item-card", { "psx-item-card-done": b(o.packed_qty) >= b(o.required_qty) - 1e-3 && b(o.required_qty) > 0 }])
                  }, [
                    a("div", Yt, [
                      _(C, {
                        modelValue: o.item_code,
                        "onUpdate:modelValue": (d) => o.item_code = d,
                        options: Be.value,
                        placeholder: "— Select —",
                        disabled: y.value,
                        style: { flex: "1", "min-width": "0" },
                        compact: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"]),
                      y.value ? r("", !0) : (l(), n("button", {
                        key: 0,
                        class: "psx-btn-icon danger",
                        onClick: (d) => s.value.items.splice(u, 1)
                      }, [...e[38] || (e[38] = [
                        a("svg", {
                          width: "13",
                          height: "13",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          a("line", {
                            x1: "18",
                            y1: "6",
                            x2: "6",
                            y2: "18"
                          }),
                          a("line", {
                            x1: "6",
                            y1: "6",
                            x2: "18",
                            y2: "18"
                          })
                        ], -1)
                      ])], 8, Jt))
                    ]),
                    a("div", Zt, [
                      a("div", ea, [
                        e[39] || (e[39] = a("label", null, "Required", -1)),
                        w(a("input", {
                          type: "number",
                          class: "psx-fi psx-fi-mono",
                          "onUpdate:modelValue": (d) => o.required_qty = d,
                          step: "any",
                          disabled: y.value
                        }, null, 8, ta), [
                          [P, o.required_qty]
                        ])
                      ]),
                      a("div", aa, [
                        e[40] || (e[40] = a("label", null, "Packed", -1)),
                        w(a("input", {
                          type: "number",
                          class: "psx-fi psx-fi-mono",
                          "onUpdate:modelValue": (d) => o.packed_qty = d,
                          min: "0",
                          step: "any",
                          style: je(b(o.packed_qty) > b(o.required_qty) ? "border-color:var(--bx-red);" : "")
                        }, null, 12, sa), [
                          [P, o.packed_qty]
                        ])
                      ]),
                      a("div", oa, [
                        e[41] || (e[41] = a("label", null, "UOM", -1)),
                        _(C, {
                          modelValue: o.uom,
                          "onUpdate:modelValue": (d) => o.uom = d,
                          options: Ne.value,
                          placeholder: "—",
                          disabled: y.value,
                          compact: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"])
                      ]),
                      a("div", la, [
                        e[42] || (e[42] = a("label", null, "Source Warehouse", -1)),
                        _(C, {
                          modelValue: o.source_warehouse,
                          "onUpdate:modelValue": (d) => o.source_warehouse = d,
                          options: Me.value,
                          placeholder: '— Use "Consume Materials From" above —',
                          disabled: V.value,
                          compact: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"])
                      ]),
                      o.batch_no || !V.value ? (l(), n("div", na, [
                        e[43] || (e[43] = a("label", null, "Batch", -1)),
                        ce(o).length || o.batch_no ? (l(), Ae(C, {
                          key: 0,
                          modelValue: o.batch_no,
                          "onUpdate:modelValue": (d) => o.batch_no = d,
                          options: Ee(o),
                          placeholder: "— Select Batch —",
                          disabled: V.value,
                          compact: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"])) : w((l(), n("input", {
                          key: 1,
                          class: "psx-fi",
                          "onUpdate:modelValue": (d) => o.batch_no = d,
                          placeholder: "No batches in warehouse",
                          disabled: V.value
                        }, null, 8, ia)), [
                          [P, o.batch_no]
                        ])
                      ])) : r("", !0)
                    ])
                  ], 2))), 128))
                ]),
                s.value.items && s.value.items.length ? (l(), n("div", da, [
                  a("span", null, [
                    a("strong", ra, i(ge.value), 1),
                    x(" / " + i(s.value.items.length) + " items fully packed", 1)
                  ]),
                  s.value.status === "Packed" ? (l(), n("span", ua, "✓ All items packed")) : r("", !0)
                ])) : r("", !0),
                a("div", pa, [
                  e[44] || (e[44] = a("div", { class: "psx-section-lbl" }, "Remarks", -1)),
                  w(a("textarea", {
                    class: "psx-fi",
                    style: { width: "100%", resize: "vertical" },
                    rows: "3",
                    "onUpdate:modelValue": e[13] || (e[13] = (o) => s.value.remarks = o)
                  }, null, 512), [
                    [P, s.value.remarks]
                  ])
                ]),
                !p.value && s.value.work_order ? (l(), n("div", ca, [
                  a("div", null, [
                    e[45] || (e[45] = a("div", {
                      class: "psx-section-lbl",
                      style: { "margin-bottom": "2px" }
                    }, "Linked Work Order", -1)),
                    a("div", ma, [
                      _(se, {
                        doctype: "Work Order",
                        name: s.value.work_order,
                        "mono-style": !1
                      }, null, 8, ["name"])
                    ])
                  ])
                ])) : r("", !0),
                !p.value && s.value.source_work_order ? (l(), n("div", va, [
                  a("div", null, [
                    e[47] || (e[47] = a("div", {
                      class: "psx-section-lbl",
                      style: { "margin-bottom": "2px" }
                    }, "Sourced From", -1)),
                    a("div", ba, [
                      e[46] || (e[46] = x("Bulk item packed from ", -1)),
                      _(se, {
                        doctype: "Work Order",
                        name: s.value.source_work_order,
                        "mono-style": !1
                      }, null, 8, ["name"])
                    ])
                  ])
                ])) : r("", !0)
              ]),
              !p.value && s.value.owner ? (l(), n("div", ka, [
                x(" Created by " + i(be(ke)(s.value.owner)) + " on " + i(j(s.value.creation)) + " ", 1),
                s.value.modified_by ? (l(), n(M, { key: 0 }, [
                  x(" · Last modified by " + i(be(ke)(s.value.modified_by)) + " on " + i(j(s.value.modified)), 1)
                ], 64)) : r("", !0)
              ])) : r("", !0),
              a("div", fa, [
                e[49] || (e[49] = a("div", { style: { flex: "1" } }, null, -1)),
                y.value ? r("", !0) : (l(), n("button", {
                  key: 0,
                  class: "psx-btn psx-btn-mfg",
                  onClick: ve,
                  disabled: v.value || q.value || !(p.value ? t.$canCreate("inventory") : t.$canEdit("inventory"))
                }, [
                  e[48] || (e[48] = a("svg", {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    a("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }),
                    a("polyline", { points: "17 21 17 13 7 13" }),
                    a("polyline", { points: "7 3 7 8 15 8" })
                  ], -1)),
                  x(" " + i(v.value ? "Saving…" : p.value ? "Save Packing Slip" : "Save Changes"), 1)
                ], 8, ga))
              ])
            ], 64))
          ], 64)) : (l(), n("div", gt, [
            e[20] || (e[20] = a("div", { class: "psx-empty-icon" }, "📄", -1)),
            e[21] || (e[21] = a("div", { class: "psx-empty-title" }, "Select a Packing Slip", -1)),
            e[22] || (e[22] = a("div", { class: "psx-empty-sub" }, "Choose a Packing Slip from the list to view or edit its details, or create a new one.", -1)),
            a("button", {
              class: "psx-btn psx-btn-mfg",
              disabled: !t.$canCreate("inventory"),
              title: t.$canCreate("inventory") ? "" : "Read-only access",
              onClick: re
            }, [
              a("span", {
                innerHTML: A("plus", 13)
              }, null, 8, ht),
              e[19] || (e[19] = x(" Create Packing Slip", -1))
            ], 8, yt)
          ]))
        ])
      ])
    ]));
  }
}, Pa = /* @__PURE__ */ Le(ya, [["__scopeId", "data-v-75f4465a"]]);
export {
  Pa as default
};
