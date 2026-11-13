import { _ as Mt, ah as St, x as Pt, y as Ue, h as m, o as At, e as He, f as w, X as Lt, l as Ot, c as o, a as s, w as A, A as H, F as h, r as E, v as Qe, d as y, D as j, b as r, q as Fe, t as i, n as X, u as L, S as Tt, g as p, J as ce, i as Dt, ax as Et, ay as jt, a2 as Nt, R as Vt, as as $t, a8 as It, L as Bt, K as Ut, j as Ht, a3 as Qt, k as n, a9 as Ft, C as zt } from "./main-BYfdjbM7.js";
import { _ as Q } from "./SearchableSelect-D6VlErXu.js";
import { u as Kt } from "./useProjectOptions-DWVsnb-c.js";
import { o as O } from "./userNames-C-jSbOMF.js";
import { D as Wt } from "./DocLink-BhLB4NMA.js";
import { P as Gt } from "./Pagination-C1o9mUWX.js";
const Xt = { class: "bomx-page" }, Yt = { class: "mrl" }, Jt = { class: "mrl-toolbar" }, Zt = { class: "mrl-search" }, ea = ["innerHTML"], ta = { class: "mrl-pills" }, aa = ["onClick"], la = { class: "mrl-actions" }, sa = ["disabled"], na = ["innerHTML"], oa = ["disabled"], ra = ["innerHTML"], ia = ["disabled", "title"], ua = ["innerHTML"], da = { class: "mrl-kpis" }, ca = ["title", "onClick", "onKeydown"], va = ["innerHTML"], ma = { class: "mrl-kpi-label" }, pa = { class: "mrl-kpi-value" }, _a = { class: "mrl-kpi-sub" }, ya = { class: "mrl-table-wrap" }, ba = { class: "mrl-table" }, fa = { key: 1 }, ha = ["onClick"], ga = {
  class: "mrl-c-no",
  "data-label": "MRN No"
}, ka = { class: "mrl-link" }, xa = { "data-label": "Type" }, wa = { "data-label": "Project" }, qa = { "data-label": "Entry Date" }, Ra = { "data-label": "Expected Delivery Date" }, Ca = { "data-label": "Requested By" }, Ma = {
  class: "mrl-c-status",
  "data-label": "Status"
}, Sa = ["onClick"], Pa = ["innerHTML"], Aa = {
  key: 0,
  class: "mrl-foot"
}, La = { class: "mr-drawer" }, Oa = {
  key: 0,
  class: "bomx-empty-state"
}, Ta = { class: "bomx-detail-hdr" }, Da = { style: { display: "flex", "align-items": "flex-start", "justify-content": "space-between", gap: "12px", "flex-wrap": "wrap" } }, Ea = { style: { "min-width": "0", display: "flex", "align-items": "center", gap: "12px" } }, ja = { class: "bomx-detail-title" }, Na = {
  key: 0,
  class: "mr-draft-badge"
}, Va = { class: "bomx-detail-meta" }, $a = { key: 0 }, Ia = { key: 1 }, Ba = { key: 2 }, Ua = { key: 3 }, Ha = { key: 4 }, Qa = { style: { display: "flex", gap: "6px", "flex-shrink": "0", "flex-wrap": "wrap", "justify-content": "flex-end" } }, Fa = ["innerHTML"], za = ["disabled", "title"], Ka = ["innerHTML"], Wa = ["title"], Ga = ["disabled"], Xa = ["disabled", "title"], Ya = ["disabled", "title"], Ja = {
  key: 6,
  class: "bomx-badge badge-active",
  style: { "align-self": "center" }
}, Za = ["disabled", "title"], el = ["disabled", "title"], tl = ["disabled"], al = ["disabled"], ll = ["disabled"], sl = ["disabled"], nl = ["disabled"], ol = ["disabled"], rl = ["innerHTML"], il = {
  key: 0,
  class: "bomx-who-note",
  style: { margin: "10px 16px" }
}, ul = {
  key: 1,
  class: "bomx-who-note",
  style: { margin: "10px 16px" }
}, dl = {
  key: 2,
  class: "bomx-toggle-row"
}, cl = {
  class: "bomx-field-hint",
  style: { margin: "0" }
}, vl = {
  key: 3,
  class: "bomx-toggle-row",
  style: { "align-items": "flex-start" }
}, ml = ["disabled"], pl = ["disabled"], _l = {
  key: 4,
  class: "mrx-sb-note"
}, yl = { class: "mrx-sb-reason" }, bl = { class: "mrx-sb-meta" }, fl = { class: "bomx-hdr-fields" }, hl = ["disabled"], gl = ["value"], kl = ["disabled"], xl = ["disabled"], wl = { class: "bomx-hf-label" }, ql = {
  key: 0,
  style: { color: "var(--bx-red)" }
}, Rl = { class: "bomx-hf-label" }, Cl = {
  key: 0,
  style: { color: "var(--bx-red)" }
}, Ml = {
  key: 5,
  class: "bomx-toggle-row"
}, Sl = {
  class: "bomx-field-hint",
  style: { margin: "0" }
}, Pl = { class: "bomx-body" }, Al = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", "margin-bottom": "8px" } }, Ll = ["disabled", "title"], Ol = ["innerHTML"], Tl = {
  key: 0,
  class: "bomx-tree-empty"
}, Dl = { class: "mrx-head" }, El = { key: 0 }, jl = { key: 1 }, Nl = { class: "mrx-c-no" }, Vl = ["onUpdate:modelValue", "disabled"], $l = ["onClick"], Il = ["innerHTML"], Bl = ["innerHTML"], Ul = {
  key: 0,
  style: { margin: "10px 0 4px", "font-size": "13px" }
}, Hl = ["disabled"], Ql = {
  key: 1,
  class: "inv-view-footer"
}, Fl = {
  key: 6,
  class: "mr-drawer-foot"
}, zl = { style: { display: "flex", gap: "10px" } }, Kl = ["disabled"], Wl = ["disabled", "title"], Gl = ["innerHTML"], ze = "__active", ve = "Only a Site Engineer, Books Admin or Director can raise a material request.", Ke = "Only a Site Engineer, Purchase Officer, Purchase Manager, Director or Books Admin can cancel or delete a material request.", ke = "Only a Purchase Officer, Books Admin or Director can create a purchase order.", xe = "Only a Purchase Officer, Books Admin or Director can create an RFQ.", we = "Only a Store Keeper, Books Admin or Director can issue stock from the store.", qe = 10, Xl = {
  __name: "MaterialRequest",
  setup(Yl) {
    const { printDoc: We } = St();
    async function Ge() {
      const t = await Et({ ...a.value, requested_by_name: O(a.value.owner), approved_by_name: a.value.approved_by ? O(a.value.approved_by) : "" });
      We(t, { ...jt, companyName: a.value.company || "" });
    }
    const M = Tt(), S = Ht(), { toast: d } = Pt(), { confirm: Re } = Qt(), k = m(!1), me = m([]), Y = m(""), R = m(""), F = m(""), J = m(1), Z = m(25), pe = m({}), Ce = p(() => M.params.name && M.params.name !== "new" ? M.params.name : M.params.name === "new" ? "new" : null);
    function z(t) {
      return t && (t.employee_name || t.employee) || "-";
    }
    async function q() {
      try {
        const e = await w("Material Request", { fields: ["name", "material_request_type", "posting_date", "entry_date", "production_plan", "project", "owner", "employee", "employee_name", "status", "docstatus", "modified"], limit: 1e3, order: "modified desc" });
        me.value = e || [];
      } catch (t) {
        d("Could not load Material Requests: " + t.message, "error");
      }
      try {
        const t = await w("Project", { fields: ["name", "project_name"], limit: 1e3 });
        pe.value = Object.fromEntries((t || []).map((e) => [e.name, e.project_name]));
      } catch {
        pe.value = {};
      }
    }
    async function Xe() {
      k.value = !0;
      try {
        await q();
      } finally {
        k.value = !1;
      }
    }
    function _e(t) {
      return t.project ? pe.value[t.project] || t.project : t.production_plan || "—";
    }
    function Me(t) {
      const e = String(t || "");
      let l = e.match(/^(\d+)(?:-(\d+))?$/);
      return l ? [1, +l[1], +(l[2] || 0)] : (l = e.match(/(\d+)\D*$/), [0, l ? +l[1] : 0, 0]);
    }
    function Ye(t, e) {
      const l = Me(t.name), v = Me(e.name);
      return v[0] - l[0] || v[1] - l[1] || v[2] - l[2] || String(e.name).localeCompare(String(t.name));
    }
    const N = p(() => {
      let t = me.value;
      R.value === ze ? t = t.filter((l) => Se.includes(l.status)) : R.value && (t = t.filter((l) => l.status === R.value)), F.value && (t = t.filter((l) => l.material_request_type === F.value));
      const e = Y.value.toLowerCase().trim();
      return e && (t = t.filter((l) => [l.name, l.material_request_type, l.production_plan, _e(l), z(l) === "-" ? "" : z(l)].filter(Boolean).join(" ").toLowerCase().includes(e))), [...t].sort(Ye);
    }), Je = p(() => {
      const t = (J.value - 1) * Z.value;
      return N.value.slice(t, t + Z.value);
    });
    Ue([Y, R, F], () => {
      J.value = 1;
    });
    const Se = ["Draft", "Pending Approval", "Sent Back", "Approved", "Partly Issued"], Ze = ["", "Partially Ordered", "Ordered", "Received", "Approved", "Pending Approval", "Partly Issued", "Issued", "Draft", "Sent Back", "Cancelled"], et = p(() => {
      const t = me.value, e = (v) => t.filter((_) => _.status === v).length, l = t.filter((v) => Se.includes(v.status)).length;
      return [
        { key: "total", label: "TOTAL MATERIAL REQUESTS", value: t.length, sub: "All material requests", icon: "file", filter: "" },
        { key: "active", label: "ACTIVE REQUESTS", value: l, sub: "Currently open", icon: "activity", filter: ze },
        { key: "ordered", label: "ORDERED", value: e("Ordered"), sub: "Material requests ordered", icon: "check", filter: "Ordered" },
        { key: "pending", label: "PENDING APPROVAL", value: e("Pending Approval"), sub: "Awaiting approval", icon: "alert", filter: "Pending Approval" }
      ];
    });
    function tt() {
      const t = ["MRN No", "Request Type", "Project", "Entry Date", "Expected Delivery Date", "Requested By", "Status"], e = N.value.map((f) => [f.name, f.material_request_type || "", _e(f), f.entry_date || "", f.posting_date || "", z(f) === "-" ? "" : z(f), f.status || ""]), l = [t, ...e].map((f) => f.map((U) => `"${String(U ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), v = URL.createObjectURL(new Blob([l], { type: "text/csv;charset=utf-8;" })), _ = document.createElement("a");
      _.href = v, _.download = "material_requests.csv", _.click(), URL.revokeObjectURL(v);
    }
    function Pe(t) {
      const e = t.status;
      return e === "Approved" || e === "Partly Issued" || e === "Issued" || e === "Submitted" || e === "Partially Ordered" || e === "Ordered" || e === "Received" ? "badge-active" : e === "Cancelled" || e === "Sent Back" ? "badge-cancelled" : "badge-obsolete";
    }
    function Ae(t) {
      S.push(`/manufacturing/material-request/${t}`);
    }
    function at() {
      if (!C.value) {
        d(ve, "error");
        return;
      }
      S.push("/manufacturing/material-request/new");
    }
    function ee() {
      S.push("/manufacturing/material-request");
    }
    const u = p(() => M.params.name === "new"), x = m(!1), c = m(!1), Le = m(!1);
    function te() {
      return {
        doctype: "Material Request",
        material_request_type: "Purchase",
        status: "Draft",
        posting_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        entry_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
        employee: "",
        employee_name: "",
        company: "",
        production_plan: "",
        project: "",
        delivery_warehouse: "",
        items: [],
        remarks: ""
      };
    }
    const a = m(te()), ae = m(""), { projects: lt, fetchProjects: ye } = Kt(), be = m([]), V = m([]), $ = p(() => ["Purchase", "Asset"].includes(a.value && a.value.material_request_type)), le = m([]), se = m([]), fe = m([]), st = p(() => {
      const t = [{ value: "", label: "— Select —" }];
      for (const l of fe.value) t.push({ value: l.value, label: l.label });
      const e = a.value && a.value.employee;
      return e && !t.some((l) => l.value === e) && t.push({ value: e, label: a.value.employee_name || O(e) }), t;
    });
    function nt(t) {
      const e = fe.value.find((l) => l.value === t);
      a.value.employee_name = e ? e.label : "";
    }
    async function ot(t) {
      let e = [];
      try {
        e = await w("Employee", {
          fields: ["name", "employee_name", "status"],
          filters: t ? [["company", "=", t], ["status", "!=", "Inactive"]] : [["status", "!=", "Inactive"]],
          order: "employee_name asc",
          limit: 1e3
        }) || [];
      } catch {
        e = [];
      }
      fe.value = e.map((l) => ({ value: l.name, label: l.employee_name || l.name }));
    }
    const { isAdmin: I, flags: K } = Vt(), C = p(() => {
      var t, e;
      return I.value || !!((e = (t = K.value.doc_access) == null ? void 0 : t["Material Request"]) != null && e.create);
    }), he = p(() => {
      var t, e;
      return I.value || !!((e = (t = K.value.doc_access) == null ? void 0 : t["Material Request"]) != null && e.edit);
    }), Oe = p(() => {
      var t, e;
      return I.value || !!((e = (t = K.value.doc_access) == null ? void 0 : t["Material Request"]) != null && e.cancel);
    }), Te = p(() => {
      var t, e;
      return I.value || !!((e = (t = K.value.doc_access) == null ? void 0 : t["Material Request"]) != null && e.delete);
    }), ge = (t) => {
      var e, l;
      return I.value || !!((l = (e = K.value.doc_access) == null ? void 0 : e[t]) != null && l.create);
    }, ne = p(() => ge("Purchase Order")), oe = p(() => ge("Request for Quotation")), re = p(() => ge("Delivery Note")), ie = m({ rfq: "", po: "" }), De = p(() => ""), W = m([]);
    async function rt() {
      W.value = [];
      const t = a.value;
      if (!(!t || !t.name || t.docstatus !== 1 || !["Purchase", "Asset"].includes(t.material_request_type)))
        try {
          const e = await ce("psd_books.api.inventory.get_mrn_remaining", { material_request: t.name });
          a.value && a.value.name === t.name && (W.value = e || []);
        } catch {
          W.value = [];
        }
    }
    const ue = p(() => {
      const { rfq: t, po: e } = ie.value;
      return t && e ? `RFQ ${t} and purchase order ${e} already exist for this request.` : t ? `RFQ ${t} already exists for this request.` : e ? `Purchase order ${e} already exists for this request.` : "";
    });
    async function it() {
      ie.value = { rfq: "", po: "" };
      const t = a.value;
      if (!t || !t.name || t.docstatus !== 1 || !["Purchase", "Asset"].includes(t.material_request_type)) return;
      const e = async (_, f) => {
        var U;
        try {
          return ((U = (await w(_, { fields: ["name"], filters: f, limit: 1 }) || [])[0]) == null ? void 0 : U.name) || "";
        } catch {
          return "";
        }
      }, [l, v] = await Promise.all([
        e("Request for Quotation", [["material_request", "=", t.name], ["status", "!=", "Cancelled"]]),
        e("Purchase Order", [["material_request", "=", t.name], ["docstatus", "!=", 2]])
      ]);
      a.value && a.value.name === t.name && (ie.value = { rfq: l, po: v });
    }
    const Ee = p(() => {
      const t = [];
      return $.value && (ne.value || t.push(ke), oe.value || t.push(xe)), !$.value && !re.value && t.push(we), t;
    }), ut = p(() => !u.value && a.value.docstatus === 1 && (a.value.status === "Approved" || a.value.status === "Partly Issued") && Ee.value.length > 0), b = p(() => u.value && !C.value || !u.value && (a.value.docstatus === 1 || a.value.docstatus === 2 || a.value.status === "Pending Approval")), P = m({ can_approve: !1, project_manager: "", reason: "" }), B = m(!1), T = m("");
    At(async () => {
      k.value = !0;
      try {
        const t = await He();
        [be.value, V.value, le.value] = await Promise.all([
          w("Company", { fields: ["name"], limit: 1e5 }),
          w("Item", { fields: ["name", "item_name", "stock_uom", "is_asset_item"], filters: [["disabled", "=", 0]], limit: 5e3, order: "name asc" }),
          w("UOM", { fields: ["name"], limit: 200, order: "name asc" })
        ]), be.value = be.value || [], V.value = V.value || [], le.value = le.value || [];
        const e = await w("Warehouse", {
          fields: ["name"],
          filters: t ? [["company", "=", t], ["is_group", "=", 0]] : [["is_group", "=", 0]],
          limit: 1e3
        });
        se.value = e || [], await ot(t), await q(), await ye(""), M.params.name && !u.value ? await G() : u.value && (a.value.company = t || "");
      } catch (t) {
        d("Error loading data: " + t.message, "error");
      }
      k.value = !1;
    }), Ue(() => M.params.name, async (t) => {
      if (!t) {
        a.value = te();
        return;
      }
      k.value = !0;
      try {
        if (u.value) {
          a.value = te();
          const e = await He();
          a.value.company = e || "";
        } else
          await G();
      } catch (e) {
        d("Error loading Material Request: " + e.message, "error");
      }
      k.value = !1;
    });
    async function dt(t) {
      if (!(!t || b.value))
        try {
          const e = await w("Project", { fields: ["warehouse"], filters: [["name", "=", t]], limit: 1 }), l = e && e[0] && e[0].warehouse;
          if (!l || a.value.project !== t) return;
          se.value.some((v) => v.name === l) || se.value.push({ name: l }), a.value.delivery_warehouse = l;
        } catch {
        }
    }
    async function G() {
      var e;
      const t = await Lt("Material Request", M.params.name);
      if (a.value = t, ae.value = "", (t == null ? void 0 : t.docstatus) === 2)
        try {
          const l = await w("Material Request", { fields: ["name"], filters: [["amended_from", "=", t.name]], limit: 1 });
          ae.value = ((e = l == null ? void 0 : l[0]) == null ? void 0 : e.name) || "";
        } catch {
        }
      a.value.items || (a.value.items = []), a.value.project && ye("", a.value.project), await ct(), it(), rt();
    }
    async function ct() {
      if (P.value = { can_approve: !1, project_manager: "", reason: "" }, !(!a.value.name || a.value.status !== "Pending Approval"))
        try {
          P.value = await Ot("psd_books.api.mrn.get_approval_state", { name: a.value.name });
        } catch {
        }
    }
    async function vt() {
      if (a.value.name) {
        c.value = !0;
        try {
          await ce("psd_books.api.mrn.send_for_approval", { name: a.value.name }), d("Sent for approval"), await G(), q();
        } catch (t) {
          d(t.message, "error");
        }
        c.value = !1;
      }
    }
    async function mt() {
      if (!(!a.value.name || !T.value.trim())) {
        c.value = !0;
        try {
          await ce("psd_books.api.mrn.send_back_mrn", { name: a.value.name, reason: T.value.trim() }), d("Sent back to the requester"), B.value = !1, T.value = "", await G(), q();
        } catch (t) {
          d(t.message, "error");
        }
        c.value = !1;
      }
    }
    async function pt() {
      if (a.value.name) {
        c.value = !0;
        try {
          await ce("psd_books.api.mrn.approve_mrn", { name: a.value.name }), d("Material Request approved"), await G(), q();
        } catch (t) {
          d(t.message, "error");
        }
        c.value = !1;
      }
    }
    const de = p(() => !a.value.production_plan && (a.value.items || []).length >= qe);
    function je() {
      if (de.value) {
        d(`A Material Request can have at most ${qe} items. Raise a second request for the rest.`, "error");
        return;
      }
      a.value.items.push({ item_code: "", item_name: "", required_qty: 1, uom: "", warehouse: "" });
    }
    function Ne(t) {
      const e = a.value.material_request_type;
      return e === "Asset" ? !!t.is_asset_item : e === "Purchase" ? !t.is_asset_item : !0;
    }
    function _t() {
      const t = {};
      (V.value || []).forEach((l) => {
        t[l.name] = l;
      });
      let e = 0;
      for (const l of a.value.items || [])
        l.item_code && t[l.item_code] && !Ne(t[l.item_code]) && (l.item_code = "", l.item_name = "", l.uom = "", e++);
      e && d(`${e} item${e > 1 ? "s" : ""} cleared. They don't match the ${a.value.material_request_type} purpose.`, "error");
    }
    function yt(t) {
      const e = V.value.find((l) => l.name === t.item_code);
      t.item_name = e ? e.item_name : "", t.uom = e ? e.stock_uom : "";
    }
    async function Ve() {
      if (!a.value.entry_date) return d("Entry Date is required", "error");
      if (!a.value.posting_date) return d("Expected Delivery Date is required", "error");
      if (!a.value.production_plan) {
        if (!a.value.project && a.value.material_request_type !== "Asset") return d("Select a project", "error");
        if (!a.value.delivery_warehouse) return d("Select a delivery warehouse", "error");
      }
      if (!a.value.items.length) return d("Add at least one item", "error");
      for (const t of a.value.items) {
        if (!t.item_code) return d("Select an item for every row", "error");
        if (!t.required_qty || t.required_qty <= 0) return d(`Required Qty must be > 0 for ${t.item_code}`, "error");
      }
      x.value = !0;
      try {
        const t = await Ut(a.value);
        d(u.value ? "Material Request created" : "Material Request updated"), u.value ? S.replace(`/manufacturing/material-request/${t.name}`) : a.value = t, q();
      } catch (t) {
        d(t.message, "error");
      }
      x.value = !1;
    }
    async function bt() {
      if (a.value.name) {
        c.value = !0;
        try {
          const t = await Bt("Material Request", a.value.name);
          a.value = t, d("Material Request submitted"), q();
        } catch (t) {
          d(t.message, "error");
        }
        c.value = !1;
      }
    }
    async function ft() {
      if (await Re({ title: "Cancel Material Request?", body: "Cancel this Material Request?", okLabel: "Cancel Request", okStyle: "danger" })) {
        c.value = !0;
        try {
          const t = await It("Material Request", a.value.name);
          a.value = t, d("Cancelled"), q();
        } catch (t) {
          d(t.message, "error");
        }
        c.value = !1;
      }
    }
    async function ht(t) {
      const e = async (f, U) => {
        var Be;
        try {
          return ((Be = (await w(f, { fields: ["name"], filters: U, limit: 1 }) || [])[0]) == null ? void 0 : Be.name) || "";
        } catch {
          return "";
        }
      }, [l, v, _] = await Promise.all([
        e("Request for Quotation", [["material_request", "=", t], ["status", "!=", "Cancelled"]]),
        e("Purchase Order", [["material_request", "=", t], ["docstatus", "!=", 2]]),
        e("Delivery Note", [["material_request", "=", t], ["docstatus", "!=", 2]])
      ]);
      return [l && `RFQ ${l}`, v && `Purchase Order ${v}`, _ && `Delivery Note ${_}`].filter(Boolean);
    }
    async function gt() {
      const t = a.value.name;
      if (!(!t || ![0, 2].includes(a.value.docstatus))) {
        c.value = !0;
        try {
          const e = await ht(t);
          if (e.length) {
            d(`Cannot delete ${t}: it is used by ${e.join(", ")}. Cancel or delete that first.`, "error");
            return;
          }
          if (c.value = !1, !await Re({ title: "Delete Material Request?", body: `Delete ${t} permanently? This cannot be undone.`, okLabel: "Delete", okStyle: "danger" })) return;
          c.value = !0, await Nt("Material Request", t), d(`${t} deleted`), a.value = te(), await q(), ee();
        } catch (e) {
          d(e.message || "Delete failed", "error");
        } finally {
          c.value = !1;
        }
      }
    }
    async function kt() {
      c.value = !0;
      try {
        const t = await $t("Material Request", a.value.name);
        d(`Revision ${t.name} created`), S.push(`/manufacturing/material-request/${t.name}`), q();
      } catch (t) {
        d(t.message, "error");
      }
      c.value = !1;
    }
    async function xt() {
      if (!ne.value) {
        d(ke, "error");
        return;
      }
      S.push(`/purchase-orders?new_from_mr=${a.value.name}`);
    }
    function wt() {
      if (!oe.value) {
        d(xe, "error");
        return;
      }
      if (ue.value) {
        d(ue.value, "error");
        return;
      }
      S.push(`/rfqs?new_from_mrn=${encodeURIComponent(a.value.name)}`);
    }
    function qt() {
      if (!re.value) {
        d(we, "error");
        return;
      }
      S.push(`/delivery-challans?new_from_mrn=${encodeURIComponent(a.value.name)}`);
    }
    function D(t) {
      if (!t) return "—";
      const e = new Date(t);
      return isNaN(e) ? t : e.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }
    const $e = {
      plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
      trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
    };
    function g(t, e) {
      return $e[t] ? ($e[t] || "").replace("<svg ", `<svg width="${e}" height="${e}" `) : Dt(t, e);
    }
    const Rt = p(() => [{ value: "", label: "— Select Item —" }, ...(V.value || []).filter((t) => Ne(t) || (a.value.items || []).some((e) => e.item_code === t.name)).map((t) => ({ value: t.name, label: t.item_name || t.name }))]), Ct = p(() => [{ value: "", label: "—" }, ...(le.value || []).map((t) => ({ value: t.name, label: t.name }))]), Ie = p(() => [{ value: "", label: "— Select —" }, ...(se.value || []).map((t) => ({ value: t.name, label: t.name }))]);
    return (t, e) => (n(), o("div", Xt, [
      s("div", Yt, [
        s("div", Jt, [
          s("div", Zt, [
            s("span", {
              innerHTML: g("search", 13),
              style: { color: "#9ca3af", "flex-shrink": "0" }
            }, null, 8, ea),
            A(s("input", {
              "onUpdate:modelValue": e[0] || (e[0] = (l) => Y.value = l),
              type: "text",
              placeholder: "Search material requests..."
            }, null, 512), [
              [H, Y.value]
            ])
          ]),
          s("div", ta, [
            (n(), o(h, null, E(Ze, (l) => s("button", {
              key: l,
              class: X(["mrl-pill", { active: R.value === l }]),
              onClick: (v) => R.value = l
            }, i(l || "All"), 11, aa)), 64))
          ]),
          s("div", la, [
            A(s("select", {
              "onUpdate:modelValue": e[1] || (e[1] = (l) => F.value = l),
              class: "mrl-select"
            }, [...e[17] || (e[17] = [
              s("option", { value: "" }, "All Types", -1),
              s("option", { value: "Purchase" }, "Purchase", -1),
              s("option", { value: "Asset" }, "Asset", -1)
            ])], 512), [
              [Qe, F.value]
            ]),
            s("button", {
              class: "mrl-btn",
              onClick: Xe,
              title: "Refresh",
              disabled: k.value
            }, [
              s("span", {
                innerHTML: g("refresh", 14)
              }, null, 8, na)
            ], 8, sa),
            s("button", {
              class: "mrl-btn",
              onClick: tt,
              disabled: !N.value.length
            }, [
              s("span", {
                innerHTML: g("download", 14)
              }, null, 8, ra),
              e[18] || (e[18] = y(" CSV", -1))
            ], 8, oa),
            s("button", {
              class: "mrl-btn mrl-btn-pri",
              disabled: !C.value,
              title: C.value ? "" : ve,
              onClick: at
            }, [
              s("span", {
                innerHTML: g("plus", 13)
              }, null, 8, ua),
              e[19] || (e[19] = y(" New Material Request", -1))
            ], 8, ia)
          ])
        ]),
        s("div", da, [
          (n(!0), o(h, null, E(et.value, (l) => (n(), o("div", {
            key: l.key,
            class: X(["mrl-kpi mrl-kpi-click", ["mrl-kpi-" + l.key, { "mrl-kpi-on": R.value === l.filter }]]),
            role: "button",
            tabindex: "0",
            title: "Show " + l.label.toLowerCase(),
            onClick: (v) => R.value = l.filter,
            onKeydown: Ft((v) => R.value = l.filter, ["enter"])
          }, [
            s("div", {
              class: "mrl-kpi-icon",
              innerHTML: g(l.icon, 20)
            }, null, 8, va),
            s("div", null, [
              s("div", ma, i(l.label), 1),
              s("div", pa, i(l.value), 1),
              s("div", _a, i(l.sub), 1)
            ])
          ], 42, ca))), 128))
        ]),
        s("div", ya, [
          s("table", ba, [
            e[22] || (e[22] = s("thead", null, [
              s("tr", null, [
                s("th", null, "MRN No"),
                s("th", null, "Request Type"),
                s("th", null, "Project"),
                s("th", null, "Entry Date"),
                s("th", null, "Expected Delivery Date"),
                s("th", null, "Requested By"),
                s("th", null, "Status"),
                s("th", { style: { "text-align": "center" } }, "Actions")
              ])
            ], -1)),
            s("tbody", null, [
              k.value ? (n(), o(h, { key: 0 }, E(5, (l) => s("tr", { key: l }, [...e[20] || (e[20] = [
                s("td", { colspan: "8" }, [
                  s("div", {
                    class: "shimmer",
                    style: { height: "26px", "border-radius": "6px" }
                  })
                ], -1)
              ])])), 64)) : N.value.length ? (n(!0), o(h, { key: 2 }, E(Je.value, (l) => (n(), o("tr", {
                key: l.name,
                class: "mrl-row",
                onClick: (v) => Ae(l.name)
              }, [
                s("td", ga, [
                  s("span", ka, i(l.name), 1)
                ]),
                s("td", xa, i(l.material_request_type || "—"), 1),
                s("td", wa, i(_e(l)), 1),
                s("td", qa, i(D(l.entry_date)), 1),
                s("td", Ra, i(D(l.posting_date)), 1),
                s("td", Ca, i(z(l)), 1),
                s("td", Ma, [
                  s("span", {
                    class: X(["bomx-badge", Pe(l)])
                  }, i(l.status), 3)
                ]),
                s("td", {
                  class: "mrl-c-act",
                  style: { "text-align": "center" },
                  onClick: e[2] || (e[2] = Fe(() => {
                  }, ["stop"]))
                }, [
                  s("button", {
                    class: "mrl-act",
                    title: "Open",
                    onClick: (v) => Ae(l.name)
                  }, [
                    s("span", {
                      innerHTML: g("ext", 13)
                    }, null, 8, Pa)
                  ], 8, Sa)
                ])
              ], 8, ha))), 128)) : (n(), o("tr", fa, [...e[21] || (e[21] = [
                s("td", {
                  colspan: "8",
                  class: "mrl-empty"
                }, "No Material Requests found", -1)
              ])]))
            ])
          ])
        ]),
        !k.value && N.value.length ? (n(), o("div", Aa, [
          j(Gt, {
            page: J.value,
            "onUpdate:page": e[3] || (e[3] = (l) => J.value = l),
            "page-size": Z.value,
            "onUpdate:pageSize": e[4] || (e[4] = (l) => Z.value = l),
            "total-items": N.value.length
          }, null, 8, ["page", "page-size", "total-items"])
        ])) : r("", !0)
      ]),
      Ce.value ? (n(), o("div", {
        key: 0,
        class: "mr-drawer-overlay",
        onClick: e[16] || (e[16] = Fe((l) => !(x.value || c.value) && ee(), ["self"]))
      }, [
        s("div", La, [
          Ce.value ? (n(), o(h, { key: 0 }, [
            k.value ? (n(), o("div", Oa, [...e[23] || (e[23] = [
              s("div", {
                class: "shimmer",
                style: { height: "200px", "border-radius": "10px" }
              }, null, -1)
            ])])) : (n(), o(h, { key: 1 }, [
              s("div", Ta, [
                s("div", Da, [
                  s("div", Ea, [
                    s("div", null, [
                      s("div", ja, [
                        y(i(u.value ? "New Material Request" : a.value.name), 1),
                        u.value ? (n(), o("span", Na, "Draft")) : r("", !0)
                      ]),
                      s("div", Va, [
                        u.value ? (n(), o("span", $a, "Create a new material request")) : r("", !0),
                        u.value ? r("", !0) : (n(), o("span", Ia, i(a.value.material_request_type), 1)),
                        u.value ? r("", !0) : (n(), o("span", Ba, "•")),
                        u.value ? r("", !0) : (n(), o("span", Ua, i(D(a.value.posting_date)), 1)),
                        u.value ? r("", !0) : (n(), o("span", Ha, "•")),
                        u.value ? r("", !0) : (n(), o("span", {
                          key: 5,
                          class: X(["bomx-badge", Pe(a.value)]),
                          style: { "font-size": "11px" }
                        }, i(a.value.status), 3))
                      ])
                    ])
                  ]),
                  s("div", Qa, [
                    u.value ? r("", !0) : (n(), o("button", {
                      key: 0,
                      class: "bomx-btn bomx-btn-light",
                      onClick: Ge
                    }, [
                      s("span", {
                        innerHTML: g("printer", 12)
                      }, null, 8, Fa),
                      e[24] || (e[24] = y(" Print", -1))
                    ])),
                    !u.value && (a.value.docstatus === 0 || a.value.docstatus === 2) ? (n(), o("button", {
                      key: 1,
                      class: "bomx-btn",
                      style: { background: "var(--bx-redS)", color: "var(--bx-red)" },
                      onClick: gt,
                      disabled: c.value || x.value || !Te.value,
                      title: Te.value ? "Delete this Material Request" : Ke
                    }, [
                      s("span", {
                        innerHTML: g("trash", 12)
                      }, null, 8, Ka),
                      e[25] || (e[25] = y(" Delete ", -1))
                    ], 8, za)) : r("", !0),
                    !u.value && a.value.docstatus === 2 && ae.value ? (n(), o("span", {
                      key: 2,
                      class: "bomx-btn bomx-btn-light",
                      style: { cursor: "default", opacity: ".8" },
                      title: "Amended as " + ae.value
                    }, "Amended", 8, Wa)) : !u.value && a.value.docstatus === 2 && L(I) ? (n(), o("button", {
                      key: 3,
                      class: "bomx-btn bomx-btn-light",
                      onClick: kt,
                      disabled: c.value || !C.value
                    }, i(c.value ? "Amending…" : "Amend"), 9, Ga)) : r("", !0),
                    !u.value && a.value.docstatus === 1 ? (n(), o("button", {
                      key: 4,
                      class: "bomx-btn",
                      style: { background: "var(--bx-redS)", color: "var(--bx-red)" },
                      onClick: ft,
                      disabled: c.value || !Oe.value,
                      title: Oe.value ? "" : Ke
                    }, i(c.value ? "Cancelling…" : "Cancel"), 9, Xa)) : r("", !0),
                    !u.value && a.value.docstatus === 1 && $.value && a.value.status !== "Ordered" && a.value.status !== "Received" ? (n(), o("button", {
                      key: 5,
                      class: "bomx-btn",
                      style: { background: "var(--bx-blueS)", color: "var(--bx-blue)" },
                      onClick: xt,
                      disabled: Le.value === "po" || !ne.value || !!De.value,
                      title: ne.value ? De.value : ke
                    }, i(Le.value === "po" ? "Creating…" : a.value.status === "Partially Ordered" || ie.value.po ? "Create PO for Remaining" : "Create Purchase Order"), 9, Ya)) : r("", !0),
                    !u.value && a.value.docstatus === 1 && $.value && (a.value.status === "Ordered" || a.value.status === "Received") ? (n(), o("span", Ja, "Purchase Order Created")) : r("", !0),
                    !u.value && a.value.docstatus === 1 && $.value && (a.value.status === "Approved" || a.value.status === "Partly Issued") ? (n(), o("button", {
                      key: 7,
                      class: "bomx-btn",
                      style: { background: "var(--bx-blueS)", color: "var(--bx-blue)" },
                      onClick: wt,
                      disabled: !oe.value || !!ue.value,
                      title: oe.value ? ue.value : xe
                    }, " Create RFQ ", 8, Za)) : r("", !0),
                    !u.value && a.value.docstatus === 1 && !$.value && (a.value.status === "Approved" || a.value.status === "Partly Issued") ? (n(), o("button", {
                      key: 8,
                      class: "bomx-btn",
                      style: { background: "var(--bx-blueS)", color: "var(--bx-blue)" },
                      onClick: qt,
                      disabled: !re.value,
                      title: re.value ? "" : we
                    }, " Issue from Store ", 8, el)) : r("", !0),
                    !u.value && a.value.docstatus === 0 && a.value.production_plan ? (n(), o("button", {
                      key: 9,
                      class: "bomx-btn bomx-btn-light",
                      onClick: bt,
                      disabled: c.value || x.value || !he.value
                    }, i(c.value ? "Submitting…" : "Submit"), 9, tl)) : r("", !0),
                    !u.value && a.value.docstatus === 0 && !a.value.production_plan && (a.value.status === "Draft" || a.value.status === "Sent Back") ? (n(), o("button", {
                      key: 10,
                      class: "bomx-btn bomx-btn-light",
                      onClick: vt,
                      disabled: c.value || x.value || !he.value
                    }, i(c.value ? "Sending…" : "Send for Approval"), 9, al)) : r("", !0),
                    !u.value && a.value.docstatus === 0 && a.value.status === "Pending Approval" && P.value.can_approve && !B.value ? (n(), o("button", {
                      key: 11,
                      class: "bomx-btn bomx-btn-light",
                      onClick: pt,
                      disabled: c.value
                    }, i(c.value ? "Approving…" : "Approve"), 9, ll)) : r("", !0),
                    !u.value && a.value.docstatus === 0 && a.value.status === "Pending Approval" && P.value.can_approve && !B.value ? (n(), o("button", {
                      key: 12,
                      class: "bomx-btn bomx-btn-light",
                      onClick: e[5] || (e[5] = (l) => B.value = !0),
                      disabled: c.value
                    }, " Send Back ", 8, sl)) : r("", !0),
                    !b.value && !u.value ? (n(), o("button", {
                      key: 13,
                      class: "bomx-btn bomx-btn-light",
                      onClick: Ve,
                      disabled: x.value || k.value || !(u.value ? C.value : he.value)
                    }, i(x.value ? "Saving…" : u.value ? "Save Material Request" : "Save Changes"), 9, nl)) : r("", !0),
                    s("button", {
                      class: "mr-drawer-x",
                      onClick: ee,
                      disabled: x.value || c.value,
                      title: "Close"
                    }, [
                      s("span", {
                        innerHTML: g("x", 16)
                      }, null, 8, rl)
                    ], 8, ol)
                  ])
                ])
              ]),
              ut.value ? (n(), o("div", il, [
                (n(!0), o(h, null, E(Ee.value, (l) => (n(), o("div", { key: l }, i(l), 1))), 128))
              ])) : r("", !0),
              u.value && !C.value ? (n(), o("div", ul, i(ve) + " You can view this form but not save it.")) : r("", !0),
              !u.value && a.value.status === "Pending Approval" ? (n(), o("div", dl, [
                s("div", cl, [
                  P.value.can_approve ? (n(), o(h, { key: 0 }, [
                    y("Waiting for your approval.")
                  ], 64)) : (n(), o(h, { key: 1 }, [
                    y("Waiting for approval by " + i(P.value.project_manager ? L(O)(P.value.project_manager) : "the Project Manager") + ".", 1)
                  ], 64))
                ])
              ])) : r("", !0),
              !u.value && a.value.status === "Pending Approval" && P.value.can_approve && B.value ? (n(), o("div", vl, [
                A(s("textarea", {
                  class: "bomx-fi",
                  "onUpdate:modelValue": e[6] || (e[6] = (l) => T.value = l),
                  rows: "2",
                  placeholder: "Reason for sending back (required)",
                  style: { flex: "1", "min-width": "260px", resize: "vertical" }
                }, null, 512), [
                  [H, T.value]
                ]),
                s("button", {
                  class: "mrx-sb-confirm",
                  onClick: mt,
                  disabled: c.value || !T.value.trim()
                }, i(c.value ? "Sending…" : "Confirm Send Back"), 9, ml),
                s("button", {
                  class: "mrx-sb-cancel",
                  onClick: e[7] || (e[7] = (l) => {
                    B.value = !1, T.value = "";
                  }),
                  disabled: c.value
                }, "Cancel", 8, pl)
              ])) : r("", !0),
              !u.value && a.value.status === "Sent Back" && a.value.docstatus === 0 ? (n(), o("div", _l, [
                e[26] || (e[26] = s("span", { class: "mrx-sb-tag" }, "Sent Back", -1)),
                s("div", null, [
                  s("div", yl, i(a.value.send_back_reason), 1),
                  s("div", bl, "Sent back by " + i(L(O)(a.value.sent_back_by)) + " on " + i(D(a.value.sent_back_on)) + ". Correct it and send it for approval again.", 1)
                ])
              ])) : r("", !0),
              s("div", fl, [
                s("div", null, [
                  e[29] || (e[29] = s("div", { class: "bomx-hf-label" }, [
                    y("Purpose "),
                    s("span", { style: { color: "var(--bx-red)" } }, "*")
                  ], -1)),
                  A(s("select", {
                    class: "bomx-fi",
                    "onUpdate:modelValue": e[8] || (e[8] = (l) => a.value.material_request_type = l),
                    disabled: b.value,
                    style: { width: "100%" },
                    onChange: _t
                  }, [
                    e[27] || (e[27] = s("option", { value: "Purchase" }, "Purchase", -1)),
                    e[28] || (e[28] = s("option", { value: "Asset" }, "Asset", -1)),
                    a.value.material_request_type && !["Purchase", "Asset"].includes(a.value.material_request_type) ? (n(), o("option", {
                      key: 0,
                      value: a.value.material_request_type
                    }, i(a.value.material_request_type), 9, gl)) : r("", !0)
                  ], 40, hl), [
                    [Qe, a.value.material_request_type]
                  ])
                ]),
                s("div", null, [
                  e[30] || (e[30] = s("div", { class: "bomx-hf-label" }, [
                    y("Entry Date "),
                    s("span", { style: { color: "var(--bx-red)" } }, "*")
                  ], -1)),
                  A(s("input", {
                    class: "bomx-fi",
                    type: "date",
                    "onUpdate:modelValue": e[9] || (e[9] = (l) => a.value.entry_date = l),
                    disabled: b.value,
                    style: { width: "100%" }
                  }, null, 8, kl), [
                    [H, a.value.entry_date]
                  ])
                ]),
                s("div", null, [
                  e[31] || (e[31] = s("div", { class: "bomx-hf-label" }, [
                    y("Expected Delivery Date "),
                    s("span", { style: { color: "var(--bx-red)" } }, "*")
                  ], -1)),
                  A(s("input", {
                    class: "bomx-fi",
                    type: "date",
                    "onUpdate:modelValue": e[10] || (e[10] = (l) => a.value.posting_date = l),
                    disabled: b.value,
                    style: { width: "100%" }
                  }, null, 8, xl), [
                    [H, a.value.posting_date]
                  ])
                ]),
                s("div", null, [
                  e[32] || (e[32] = s("div", { class: "bomx-hf-label" }, "Employee", -1)),
                  j(Q, {
                    modelValue: a.value.employee,
                    "onUpdate:modelValue": [
                      e[11] || (e[11] = (l) => a.value.employee = l),
                      nt
                    ],
                    options: st.value,
                    disabled: b.value,
                    placeholder: "Select employee"
                  }, null, 8, ["modelValue", "options", "disabled"])
                ]),
                s("div", null, [
                  s("div", wl, [
                    e[33] || (e[33] = y("Project ", -1)),
                    !a.value.production_plan && a.value.material_request_type !== "Asset" ? (n(), o("span", ql, "*")) : r("", !0)
                  ]),
                  j(Q, {
                    modelValue: a.value.project,
                    "onUpdate:modelValue": [
                      e[12] || (e[12] = (l) => a.value.project = l),
                      dt
                    ],
                    options: L(lt),
                    disabled: b.value,
                    placeholder: "Select project",
                    onSearch: e[13] || (e[13] = (l) => L(ye)(l, a.value.project))
                  }, null, 8, ["modelValue", "options", "disabled"])
                ]),
                s("div", null, [
                  s("div", Rl, [
                    e[34] || (e[34] = y("Delivery Warehouse ", -1)),
                    a.value.production_plan ? r("", !0) : (n(), o("span", Cl, "*"))
                  ]),
                  j(Q, {
                    modelValue: a.value.delivery_warehouse,
                    "onUpdate:modelValue": e[14] || (e[14] = (l) => a.value.delivery_warehouse = l),
                    options: Ie.value,
                    disabled: b.value,
                    placeholder: "Select warehouse"
                  }, null, 8, ["modelValue", "options", "disabled"])
                ])
              ]),
              a.value.production_plan ? (n(), o("div", Ml, [
                s("div", Sl, [
                  e[35] || (e[35] = y(" Production Plan: ", -1)),
                  j(Wt, {
                    doctype: "Production Plan",
                    name: a.value.production_plan
                  }, null, 8, ["name"])
                ])
              ])) : r("", !0),
              s("div", Pl, [
                s("div", Al, [
                  e[37] || (e[37] = s("span", {
                    class: "bomx-section-lbl",
                    style: { "margin-bottom": "0" }
                  }, "Items", -1)),
                  b.value ? r("", !0) : (n(), o("button", {
                    key: 0,
                    class: "bomx-btn bomx-btn-sm bomx-btn-light",
                    style: { color: "var(--bx-mfgB)", border: "1px solid var(--bx-mfg)" },
                    onClick: je,
                    disabled: de.value,
                    title: de.value ? `At most ${qe} items per Material Request` : ""
                  }, [
                    s("span", {
                      innerHTML: g("plus", 12)
                    }, null, 8, Ol),
                    e[36] || (e[36] = y(" Add Row ", -1))
                  ], 8, Ll))
                ]),
                s("div", {
                  class: X(["mrx-items", { "mrx-has-wh": a.value.production_plan }]),
                  style: { "margin-bottom": "20px" }
                }, [
                  !a.value.items || !a.value.items.length ? (n(), o("div", Tl, "No items yet. Add a row or create from Production Plan.")) : (n(), o(h, { key: 1 }, [
                    s("div", Dl, [
                      e[38] || (e[38] = s("span", { class: "mrx-c-no" }, "#", -1)),
                      e[39] || (e[39] = s("span", null, "Item", -1)),
                      e[40] || (e[40] = s("span", null, "Required Qty", -1)),
                      e[41] || (e[41] = s("span", null, "UOM", -1)),
                      a.value.production_plan ? (n(), o("span", El, "Warehouse")) : r("", !0),
                      b.value ? r("", !0) : (n(), o("span", jl))
                    ]),
                    (n(!0), o(h, null, E(a.value.items, (l, v) => (n(), o("div", {
                      key: v,
                      class: "mrx-row"
                    }, [
                      s("span", Nl, i(v + 1), 1),
                      j(Q, {
                        modelValue: l.item_code,
                        "onUpdate:modelValue": (_) => l.item_code = _,
                        options: Rt.value,
                        placeholder: "— Select Item —",
                        disabled: b.value,
                        onSelect: (_) => yt(l),
                        compact: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled", "onSelect"]),
                      A(s("input", {
                        class: "bomx-fi bomx-fi-mono",
                        type: "number",
                        "onUpdate:modelValue": (_) => l.required_qty = _,
                        min: "0.001",
                        step: "any",
                        disabled: b.value
                      }, null, 8, Vl), [
                        [H, l.required_qty]
                      ]),
                      j(Q, {
                        modelValue: l.uom,
                        "onUpdate:modelValue": (_) => l.uom = _,
                        options: Ct.value,
                        placeholder: "—",
                        disabled: b.value,
                        compact: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"]),
                      a.value.production_plan ? (n(), zt(Q, {
                        key: 0,
                        modelValue: l.warehouse,
                        "onUpdate:modelValue": (_) => l.warehouse = _,
                        options: Ie.value,
                        placeholder: "— Select —",
                        disabled: b.value,
                        compact: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"])) : r("", !0),
                      b.value ? r("", !0) : (n(), o("button", {
                        key: 1,
                        class: "bomx-btn-icon danger",
                        onClick: (_) => a.value.items.splice(v, 1),
                        title: "Remove row"
                      }, [
                        s("span", {
                          innerHTML: g("trash", 13)
                        }, null, 8, Il)
                      ], 8, $l))
                    ]))), 128))
                  ], 64)),
                  !b.value && a.value.items && a.value.items.length && !de.value ? (n(), o("button", {
                    key: 2,
                    class: "mrx-add",
                    onClick: je
                  }, [
                    s("span", {
                      innerHTML: g("plus", 12)
                    }, null, 8, Bl),
                    e[42] || (e[42] = y(" Add another item ", -1))
                  ])) : r("", !0)
                ], 2),
                !u.value && W.value.some((l) => l.ordered > 0) ? (n(), o("div", Ul, [
                  e[43] || (e[43] = s("div", { class: "bomx-section-lbl" }, "Ordered so far", -1)),
                  (n(!0), o(h, null, E(W.value, (l) => (n(), o("div", {
                    key: l.item_code,
                    style: { display: "flex", "justify-content": "space-between", padding: "3px 0", "border-bottom": "1px solid #eef0f3" }
                  }, [
                    s("span", null, i(l.item_name || l.item_code), 1),
                    s("span", null, [
                      y("MRN " + i(l.mrn_qty) + " · Ordered " + i(l.ordered) + " · ", 1),
                      s("b", null, "Balance " + i(l.remaining), 1)
                    ])
                  ]))), 128))
                ])) : r("", !0),
                e[44] || (e[44] = s("div", { class: "bomx-section-lbl" }, "Remarks", -1)),
                A(s("textarea", {
                  class: "bomx-fi",
                  "onUpdate:modelValue": e[15] || (e[15] = (l) => a.value.remarks = l),
                  rows: "3",
                  disabled: b.value,
                  style: { width: "100%", "min-height": "90px", resize: "vertical" },
                  placeholder: "Optional notes…"
                }, null, 8, Hl), [
                  [H, a.value.remarks]
                ]),
                !u.value && a.value.owner ? (n(), o("div", Ql, [
                  y(" Created by " + i(L(O)(a.value.owner)) + " on " + i(D(a.value.creation)) + " ", 1),
                  a.value.approved_by ? (n(), o(h, { key: 0 }, [
                    y(" · Approved by " + i(L(O)(a.value.approved_by)) + " on " + i(D(a.value.approved_on)), 1)
                  ], 64)) : r("", !0),
                  a.value.modified_by ? (n(), o(h, { key: 1 }, [
                    y(" · Last modified by " + i(L(O)(a.value.modified_by)) + " on " + i(D(a.value.modified)), 1)
                  ], 64)) : r("", !0)
                ])) : r("", !0)
              ]),
              u.value ? (n(), o("div", Fl, [
                e[45] || (e[45] = s("span", { class: "mr-drawer-foot-note" }, "New material request — unsaved", -1)),
                s("div", zl, [
                  s("button", {
                    class: "mr-btn-cancel",
                    onClick: ee,
                    disabled: x.value
                  }, "Cancel", 8, Kl),
                  s("button", {
                    class: "mr-btn-save",
                    onClick: Ve,
                    disabled: x.value || k.value || b.value || !C.value,
                    title: C.value ? "" : ve
                  }, [
                    s("span", {
                      innerHTML: g("file", 14)
                    }, null, 8, Gl),
                    y(" " + i(x.value ? "Saving…" : "Save Material Request"), 1)
                  ], 8, Wl)
                ])
              ])) : r("", !0)
            ], 64))
          ], 64)) : r("", !0)
        ])
      ])) : r("", !0)
    ]));
  }
}, ss = /* @__PURE__ */ Mt(Xl, [["__scopeId", "data-v-b9c732ec"]]);
export {
  ss as default
};
