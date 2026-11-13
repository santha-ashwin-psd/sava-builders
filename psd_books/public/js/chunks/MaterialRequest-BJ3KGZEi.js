import { _ as Mt, ah as St, x as Pt, y as Ue, h as m, o as At, e as He, f as w, X as Lt, l as Ot, c as o, a as s, w as A, A as H, F as f, r as j, v as Qe, d as b, D as N, b as r, q as Fe, t as u, n as X, u as L, S as Tt, g as p, J as ce, i as jt, ax as Nt, ay as Vt, a2 as Dt, R as $t, as as Bt, a8 as Et, L as It, K as Ut, j as Ht, a3 as Qt, k as n, a9 as Ft, C as zt } from "./main-DQXXITLP.js";
import { _ as Q } from "./SearchableSelect-C7RyckVo.js";
import { u as Kt } from "./useProjectOptions-Bbb5VX7W.js";
import { o as O } from "./userNames-C68bdcZT.js";
import { D as Wt } from "./DocLink-BEzV_wim.js";
import { P as Gt } from "./Pagination-BFnGFolN.js";
const Xt = { class: "bomx-page" }, Yt = { class: "mrl" }, Jt = { class: "mrl-toolbar" }, Zt = { class: "mrl-search" }, ea = ["innerHTML"], ta = { class: "mrl-pills" }, aa = ["onClick"], la = { class: "mrl-actions" }, sa = ["disabled"], na = ["innerHTML"], oa = ["disabled"], ra = ["innerHTML"], ua = ["disabled", "title"], ia = ["innerHTML"], da = { class: "mrl-kpis" }, ca = ["title", "onClick", "onKeydown"], va = ["innerHTML"], ma = { class: "mrl-kpi-label" }, pa = { class: "mrl-kpi-value" }, _a = { class: "mrl-kpi-sub" }, ba = { class: "mrl-table-wrap" }, ya = { class: "mrl-table" }, fa = { key: 1 }, ha = ["onClick"], ga = {
  class: "mrl-c-no",
  "data-label": "MRN No"
}, ka = { class: "mrl-link" }, xa = { "data-label": "Type" }, wa = { "data-label": "Project" }, qa = { "data-label": "Required By" }, Ra = { "data-label": "Requested By" }, Ca = {
  class: "mrl-c-status",
  "data-label": "Status"
}, Ma = ["onClick"], Sa = ["innerHTML"], Pa = {
  key: 0,
  class: "mrl-foot"
}, Aa = { class: "mr-drawer" }, La = {
  key: 0,
  class: "bomx-empty-state"
}, Oa = { class: "bomx-detail-hdr" }, Ta = { style: { display: "flex", "align-items": "flex-start", "justify-content": "space-between", gap: "12px", "flex-wrap": "wrap" } }, ja = { style: { "min-width": "0", display: "flex", "align-items": "center", gap: "12px" } }, Na = { class: "bomx-detail-title" }, Va = {
  key: 0,
  class: "mr-draft-badge"
}, Da = { class: "bomx-detail-meta" }, $a = { key: 0 }, Ba = { key: 1 }, Ea = { key: 2 }, Ia = { key: 3 }, Ua = { key: 4 }, Ha = { style: { display: "flex", gap: "6px", "flex-shrink": "0", "flex-wrap": "wrap", "justify-content": "flex-end" } }, Qa = ["innerHTML"], Fa = ["disabled", "title"], za = ["innerHTML"], Ka = ["title"], Wa = ["disabled"], Ga = ["disabled", "title"], Xa = ["disabled", "title"], Ya = {
  key: 6,
  class: "bomx-badge badge-active",
  style: { "align-self": "center" }
}, Ja = ["disabled", "title"], Za = ["disabled", "title"], el = ["disabled"], tl = ["disabled"], al = ["disabled"], ll = ["disabled"], sl = ["disabled"], nl = ["disabled"], ol = ["innerHTML"], rl = {
  key: 0,
  class: "bomx-who-note",
  style: { margin: "10px 16px" }
}, ul = {
  key: 1,
  class: "bomx-who-note",
  style: { margin: "10px 16px" }
}, il = {
  key: 2,
  class: "bomx-toggle-row"
}, dl = {
  class: "bomx-field-hint",
  style: { margin: "0" }
}, cl = {
  key: 3,
  class: "bomx-toggle-row",
  style: { "align-items": "flex-start" }
}, vl = ["disabled"], ml = ["disabled"], pl = {
  key: 4,
  class: "mrx-sb-note"
}, _l = { class: "mrx-sb-reason" }, bl = { class: "mrx-sb-meta" }, yl = { class: "bomx-hdr-fields" }, fl = ["disabled"], hl = ["value"], gl = ["disabled"], kl = ["disabled"], xl = { class: "bomx-hf-label" }, wl = {
  key: 0,
  style: { color: "var(--bx-red)" }
}, ql = { class: "bomx-hf-label" }, Rl = {
  key: 0,
  style: { color: "var(--bx-red)" }
}, Cl = {
  key: 5,
  class: "bomx-toggle-row"
}, Ml = {
  class: "bomx-field-hint",
  style: { margin: "0" }
}, Sl = { class: "bomx-body" }, Pl = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", "margin-bottom": "8px" } }, Al = ["disabled", "title"], Ll = ["innerHTML"], Ol = {
  key: 0,
  class: "bomx-tree-empty"
}, Tl = { class: "mrx-head" }, jl = { key: 0 }, Nl = { key: 1 }, Vl = { class: "mrx-c-no" }, Dl = ["onUpdate:modelValue", "disabled"], $l = ["onClick"], Bl = ["innerHTML"], El = ["innerHTML"], Il = {
  key: 0,
  style: { margin: "10px 0 4px", "font-size": "13px" }
}, Ul = ["disabled"], Hl = {
  key: 1,
  class: "inv-view-footer"
}, Ql = {
  key: 6,
  class: "mr-drawer-foot"
}, Fl = { style: { display: "flex", gap: "10px" } }, zl = ["disabled"], Kl = ["disabled", "title"], Wl = ["innerHTML"], ze = "__active", ve = "Only a Site Engineer, Books Admin or Director can raise a material request.", Ke = "Only a Site Engineer, Purchase Officer, Purchase Manager, Director or Books Admin can cancel or delete a material request.", ke = "Only a Purchase Officer, Books Admin or Director can create a purchase order.", xe = "Only a Purchase Officer, Books Admin or Director can create an RFQ.", we = "Only a Store Keeper, Books Admin or Director can issue stock from the store.", qe = 10, Gl = {
  __name: "MaterialRequest",
  setup(Xl) {
    const { printDoc: We } = St();
    async function Ge() {
      const t = await Nt({ ...a.value, requested_by_name: O(a.value.owner), approved_by_name: a.value.approved_by ? O(a.value.approved_by) : "" });
      We(t, { ...Vt, companyName: a.value.company || "" });
    }
    const M = Tt(), S = Ht(), { toast: d } = Pt(), { confirm: Re } = Qt(), k = m(!1), me = m([]), Y = m(""), R = m(""), F = m(""), J = m(1), Z = m(25), pe = m({}), Ce = p(() => M.params.name && M.params.name !== "new" ? M.params.name : M.params.name === "new" ? "new" : null);
    function z(t) {
      return t && (t.employee_name || t.employee) || "-";
    }
    async function q() {
      try {
        const e = await w("Material Request", { fields: ["name", "material_request_type", "posting_date", "production_plan", "project", "owner", "employee", "employee_name", "status", "docstatus", "modified"], limit: 1e3, order: "modified desc" });
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
    const V = p(() => {
      let t = me.value;
      R.value === ze ? t = t.filter((l) => Se.includes(l.status)) : R.value && (t = t.filter((l) => l.status === R.value)), F.value && (t = t.filter((l) => l.material_request_type === F.value));
      const e = Y.value.toLowerCase().trim();
      return e && (t = t.filter((l) => [l.name, l.material_request_type, l.production_plan, _e(l), z(l) === "-" ? "" : z(l)].filter(Boolean).join(" ").toLowerCase().includes(e))), [...t].sort(Ye);
    }), Je = p(() => {
      const t = (J.value - 1) * Z.value;
      return V.value.slice(t, t + Z.value);
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
      const t = ["MRN No", "Request Type", "Project", "Required By", "Requested By", "Status"], e = V.value.map((g) => [g.name, g.material_request_type || "", _e(g), g.posting_date || "", z(g) === "-" ? "" : z(g), g.status || ""]), l = [t, ...e].map((g) => g.map((U) => `"${String(U ?? "").replace(/"/g, '""')}"`).join(",")).join(`
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
    const i = p(() => M.params.name === "new"), x = m(!1), c = m(!1), Le = m(!1);
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
    const a = m(te()), ae = m(""), { projects: lt, fetchProjects: be } = Kt(), ye = m([]), D = m([]), $ = p(() => ["Purchase", "Asset"].includes(a.value && a.value.material_request_type)), le = m([]), se = m([]), fe = m([]), st = p(() => {
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
    const { isAdmin: B, flags: K } = $t(), C = p(() => {
      var t, e;
      return B.value || !!((e = (t = K.value.doc_access) == null ? void 0 : t["Material Request"]) != null && e.create);
    }), he = p(() => {
      var t, e;
      return B.value || !!((e = (t = K.value.doc_access) == null ? void 0 : t["Material Request"]) != null && e.edit);
    }), Oe = p(() => {
      var t, e;
      return B.value || !!((e = (t = K.value.doc_access) == null ? void 0 : t["Material Request"]) != null && e.cancel);
    }), Te = p(() => {
      var t, e;
      return B.value || !!((e = (t = K.value.doc_access) == null ? void 0 : t["Material Request"]) != null && e.delete);
    }), ge = (t) => {
      var e, l;
      return B.value || !!((l = (e = K.value.doc_access) == null ? void 0 : e[t]) != null && l.create);
    }, ne = p(() => ge("Purchase Order")), oe = p(() => ge("Request for Quotation")), re = p(() => ge("Delivery Note")), ue = m({ rfq: "", po: "" }), je = p(() => ""), W = m([]);
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
    const ie = p(() => {
      const { rfq: t, po: e } = ue.value;
      return t && e ? `RFQ ${t} and purchase order ${e} already exist for this request.` : t ? `RFQ ${t} already exists for this request.` : e ? `Purchase order ${e} already exists for this request.` : "";
    });
    async function ut() {
      ue.value = { rfq: "", po: "" };
      const t = a.value;
      if (!t || !t.name || t.docstatus !== 1 || !["Purchase", "Asset"].includes(t.material_request_type)) return;
      const e = async (_, g) => {
        var U;
        try {
          return ((U = (await w(_, { fields: ["name"], filters: g, limit: 1 }) || [])[0]) == null ? void 0 : U.name) || "";
        } catch {
          return "";
        }
      }, [l, v] = await Promise.all([
        e("Request for Quotation", [["material_request", "=", t.name], ["status", "!=", "Cancelled"]]),
        e("Purchase Order", [["material_request", "=", t.name], ["docstatus", "!=", 2]])
      ]);
      a.value && a.value.name === t.name && (ue.value = { rfq: l, po: v });
    }
    const Ne = p(() => {
      const t = [];
      return $.value && (ne.value || t.push(ke), oe.value || t.push(xe)), !$.value && !re.value && t.push(we), t;
    }), it = p(() => !i.value && a.value.docstatus === 1 && (a.value.status === "Approved" || a.value.status === "Partly Issued") && Ne.value.length > 0), y = p(() => i.value && !C.value || !i.value && (a.value.docstatus === 1 || a.value.docstatus === 2 || a.value.status === "Pending Approval")), P = m({ can_approve: !1, project_manager: "", reason: "" }), E = m(!1), T = m("");
    At(async () => {
      k.value = !0;
      try {
        const t = await He();
        [ye.value, D.value, le.value] = await Promise.all([
          w("Company", { fields: ["name"], limit: 1e5 }),
          w("Item", { fields: ["name", "item_name", "stock_uom", "is_asset_item"], filters: [["disabled", "=", 0]], limit: 5e3, order: "name asc" }),
          w("UOM", { fields: ["name"], limit: 200, order: "name asc" })
        ]), ye.value = ye.value || [], D.value = D.value || [], le.value = le.value || [];
        const e = await w("Warehouse", {
          fields: ["name"],
          filters: t ? [["company", "=", t], ["is_group", "=", 0]] : [["is_group", "=", 0]],
          limit: 1e3
        });
        se.value = e || [], await ot(t), await q(), await be(""), M.params.name && !i.value ? await G() : i.value && (a.value.company = t || "");
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
        if (i.value) {
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
      if (!(!t || y.value))
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
      a.value.items || (a.value.items = []), a.value.project && be("", a.value.project), await ct(), ut(), rt();
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
          await ce("psd_books.api.mrn.send_back_mrn", { name: a.value.name, reason: T.value.trim() }), d("Sent back to the requester"), E.value = !1, T.value = "", await G(), q();
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
    function Ve() {
      if (de.value) {
        d(`A Material Request can have at most ${qe} items. Raise a second request for the rest.`, "error");
        return;
      }
      a.value.items.push({ item_code: "", item_name: "", required_qty: 1, uom: "", warehouse: "" });
    }
    function De(t) {
      const e = a.value.material_request_type;
      return e === "Asset" ? !!t.is_asset_item : e === "Purchase" ? !t.is_asset_item : !0;
    }
    function _t() {
      const t = {};
      (D.value || []).forEach((l) => {
        t[l.name] = l;
      });
      let e = 0;
      for (const l of a.value.items || [])
        l.item_code && t[l.item_code] && !De(t[l.item_code]) && (l.item_code = "", l.item_name = "", l.uom = "", e++);
      e && d(`${e} item${e > 1 ? "s" : ""} cleared. They don't match the ${a.value.material_request_type} purpose.`, "error");
    }
    function bt(t) {
      const e = D.value.find((l) => l.name === t.item_code);
      t.item_name = e ? e.item_name : "", t.uom = e ? e.stock_uom : "";
    }
    async function $e() {
      if (!a.value.entry_date) return d("Entry Date is required", "error");
      if (!a.value.posting_date) return d("Required By date is required", "error");
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
        d(i.value ? "Material Request created" : "Material Request updated"), i.value ? S.replace(`/manufacturing/material-request/${t.name}`) : a.value = t, q();
      } catch (t) {
        d(t.message, "error");
      }
      x.value = !1;
    }
    async function yt() {
      if (a.value.name) {
        c.value = !0;
        try {
          const t = await It("Material Request", a.value.name);
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
          const t = await Et("Material Request", a.value.name);
          a.value = t, d("Cancelled"), q();
        } catch (t) {
          d(t.message, "error");
        }
        c.value = !1;
      }
    }
    async function ht(t) {
      const e = async (g, U) => {
        var Ie;
        try {
          return ((Ie = (await w(g, { fields: ["name"], filters: U, limit: 1 }) || [])[0]) == null ? void 0 : Ie.name) || "";
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
          c.value = !0, await Dt("Material Request", t), d(`${t} deleted`), a.value = te(), await q(), ee();
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
        const t = await Bt("Material Request", a.value.name);
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
      if (ie.value) {
        d(ie.value, "error");
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
    function I(t) {
      if (!t) return "—";
      const e = new Date(t);
      return isNaN(e) ? t : e.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }
    const Be = {
      plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
      trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
    };
    function h(t, e) {
      return Be[t] ? (Be[t] || "").replace("<svg ", `<svg width="${e}" height="${e}" `) : jt(t, e);
    }
    const Rt = p(() => [{ value: "", label: "— Select Item —" }, ...(D.value || []).filter((t) => De(t) || (a.value.items || []).some((e) => e.item_code === t.name)).map((t) => ({ value: t.name, label: t.item_name || t.name }))]), Ct = p(() => [{ value: "", label: "—" }, ...(le.value || []).map((t) => ({ value: t.name, label: t.name }))]), Ee = p(() => [{ value: "", label: "— Select —" }, ...(se.value || []).map((t) => ({ value: t.name, label: t.name }))]);
    return (t, e) => (n(), o("div", Xt, [
      s("div", Yt, [
        s("div", Jt, [
          s("div", Zt, [
            s("span", {
              innerHTML: h("search", 13),
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
            (n(), o(f, null, j(Ze, (l) => s("button", {
              key: l,
              class: X(["mrl-pill", { active: R.value === l }]),
              onClick: (v) => R.value = l
            }, u(l || "All"), 11, aa)), 64))
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
                innerHTML: h("refresh", 14)
              }, null, 8, na)
            ], 8, sa),
            s("button", {
              class: "mrl-btn",
              onClick: tt,
              disabled: !V.value.length
            }, [
              s("span", {
                innerHTML: h("download", 14)
              }, null, 8, ra),
              e[18] || (e[18] = b(" CSV", -1))
            ], 8, oa),
            s("button", {
              class: "mrl-btn mrl-btn-pri",
              disabled: !C.value,
              title: C.value ? "" : ve,
              onClick: at
            }, [
              s("span", {
                innerHTML: h("plus", 13)
              }, null, 8, ia),
              e[19] || (e[19] = b(" New Material Request", -1))
            ], 8, ua)
          ])
        ]),
        s("div", da, [
          (n(!0), o(f, null, j(et.value, (l) => (n(), o("div", {
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
              innerHTML: h(l.icon, 20)
            }, null, 8, va),
            s("div", null, [
              s("div", ma, u(l.label), 1),
              s("div", pa, u(l.value), 1),
              s("div", _a, u(l.sub), 1)
            ])
          ], 42, ca))), 128))
        ]),
        s("div", ba, [
          s("table", ya, [
            e[22] || (e[22] = s("thead", null, [
              s("tr", null, [
                s("th", null, "MRN No"),
                s("th", null, "Request Type"),
                s("th", null, "Project"),
                s("th", null, "Required By"),
                s("th", null, "Requested By"),
                s("th", null, "Status"),
                s("th", { style: { "text-align": "center" } }, "Actions")
              ])
            ], -1)),
            s("tbody", null, [
              k.value ? (n(), o(f, { key: 0 }, j(5, (l) => s("tr", { key: l }, [...e[20] || (e[20] = [
                s("td", { colspan: "7" }, [
                  s("div", {
                    class: "shimmer",
                    style: { height: "26px", "border-radius": "6px" }
                  })
                ], -1)
              ])])), 64)) : V.value.length ? (n(!0), o(f, { key: 2 }, j(Je.value, (l) => (n(), o("tr", {
                key: l.name,
                class: "mrl-row",
                onClick: (v) => Ae(l.name)
              }, [
                s("td", ga, [
                  s("span", ka, u(l.name), 1)
                ]),
                s("td", xa, u(l.material_request_type || "—"), 1),
                s("td", wa, u(_e(l)), 1),
                s("td", qa, u(I(l.posting_date)), 1),
                s("td", Ra, u(z(l)), 1),
                s("td", Ca, [
                  s("span", {
                    class: X(["bomx-badge", Pe(l)])
                  }, u(l.status), 3)
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
                      innerHTML: h("ext", 13)
                    }, null, 8, Sa)
                  ], 8, Ma)
                ])
              ], 8, ha))), 128)) : (n(), o("tr", fa, [...e[21] || (e[21] = [
                s("td", {
                  colspan: "7",
                  class: "mrl-empty"
                }, "No Material Requests found", -1)
              ])]))
            ])
          ])
        ]),
        !k.value && V.value.length ? (n(), o("div", Pa, [
          N(Gt, {
            page: J.value,
            "onUpdate:page": e[3] || (e[3] = (l) => J.value = l),
            "page-size": Z.value,
            "onUpdate:pageSize": e[4] || (e[4] = (l) => Z.value = l),
            "total-items": V.value.length
          }, null, 8, ["page", "page-size", "total-items"])
        ])) : r("", !0)
      ]),
      Ce.value ? (n(), o("div", {
        key: 0,
        class: "mr-drawer-overlay",
        onClick: e[16] || (e[16] = Fe((l) => !(x.value || c.value) && ee(), ["self"]))
      }, [
        s("div", Aa, [
          Ce.value ? (n(), o(f, { key: 0 }, [
            k.value ? (n(), o("div", La, [...e[23] || (e[23] = [
              s("div", {
                class: "shimmer",
                style: { height: "200px", "border-radius": "10px" }
              }, null, -1)
            ])])) : (n(), o(f, { key: 1 }, [
              s("div", Oa, [
                s("div", Ta, [
                  s("div", ja, [
                    s("div", null, [
                      s("div", Na, [
                        b(u(i.value ? "New Material Request" : a.value.name), 1),
                        i.value ? (n(), o("span", Va, "Draft")) : r("", !0)
                      ]),
                      s("div", Da, [
                        i.value ? (n(), o("span", $a, "Create a new material request")) : r("", !0),
                        i.value ? r("", !0) : (n(), o("span", Ba, u(a.value.material_request_type), 1)),
                        i.value ? r("", !0) : (n(), o("span", Ea, "•")),
                        i.value ? r("", !0) : (n(), o("span", Ia, u(I(a.value.posting_date)), 1)),
                        i.value ? r("", !0) : (n(), o("span", Ua, "•")),
                        i.value ? r("", !0) : (n(), o("span", {
                          key: 5,
                          class: X(["bomx-badge", Pe(a.value)]),
                          style: { "font-size": "11px" }
                        }, u(a.value.status), 3))
                      ])
                    ])
                  ]),
                  s("div", Ha, [
                    i.value ? r("", !0) : (n(), o("button", {
                      key: 0,
                      class: "bomx-btn bomx-btn-light",
                      onClick: Ge
                    }, [
                      s("span", {
                        innerHTML: h("printer", 12)
                      }, null, 8, Qa),
                      e[24] || (e[24] = b(" Print", -1))
                    ])),
                    !i.value && (a.value.docstatus === 0 || a.value.docstatus === 2) ? (n(), o("button", {
                      key: 1,
                      class: "bomx-btn",
                      style: { background: "var(--bx-redS)", color: "var(--bx-red)" },
                      onClick: gt,
                      disabled: c.value || x.value || !Te.value,
                      title: Te.value ? "Delete this Material Request" : Ke
                    }, [
                      s("span", {
                        innerHTML: h("trash", 12)
                      }, null, 8, za),
                      e[25] || (e[25] = b(" Delete ", -1))
                    ], 8, Fa)) : r("", !0),
                    !i.value && a.value.docstatus === 2 && ae.value ? (n(), o("span", {
                      key: 2,
                      class: "bomx-btn bomx-btn-light",
                      style: { cursor: "default", opacity: ".8" },
                      title: "Amended as " + ae.value
                    }, "Amended", 8, Ka)) : !i.value && a.value.docstatus === 2 && L(B) ? (n(), o("button", {
                      key: 3,
                      class: "bomx-btn bomx-btn-light",
                      onClick: kt,
                      disabled: c.value || !C.value
                    }, u(c.value ? "Amending…" : "Amend"), 9, Wa)) : r("", !0),
                    !i.value && a.value.docstatus === 1 ? (n(), o("button", {
                      key: 4,
                      class: "bomx-btn",
                      style: { background: "var(--bx-redS)", color: "var(--bx-red)" },
                      onClick: ft,
                      disabled: c.value || !Oe.value,
                      title: Oe.value ? "" : Ke
                    }, u(c.value ? "Cancelling…" : "Cancel"), 9, Ga)) : r("", !0),
                    !i.value && a.value.docstatus === 1 && $.value && a.value.status !== "Ordered" && a.value.status !== "Received" ? (n(), o("button", {
                      key: 5,
                      class: "bomx-btn",
                      style: { background: "var(--bx-blueS)", color: "var(--bx-blue)" },
                      onClick: xt,
                      disabled: Le.value === "po" || !ne.value || !!je.value,
                      title: ne.value ? je.value : ke
                    }, u(Le.value === "po" ? "Creating…" : a.value.status === "Partially Ordered" || ue.value.po ? "Create PO for Remaining" : "Create Purchase Order"), 9, Xa)) : r("", !0),
                    !i.value && a.value.docstatus === 1 && $.value && (a.value.status === "Ordered" || a.value.status === "Received") ? (n(), o("span", Ya, "Purchase Order Created")) : r("", !0),
                    !i.value && a.value.docstatus === 1 && $.value && (a.value.status === "Approved" || a.value.status === "Partly Issued") ? (n(), o("button", {
                      key: 7,
                      class: "bomx-btn",
                      style: { background: "var(--bx-blueS)", color: "var(--bx-blue)" },
                      onClick: wt,
                      disabled: !oe.value || !!ie.value,
                      title: oe.value ? ie.value : xe
                    }, " Create RFQ ", 8, Ja)) : r("", !0),
                    !i.value && a.value.docstatus === 1 && !$.value && (a.value.status === "Approved" || a.value.status === "Partly Issued") ? (n(), o("button", {
                      key: 8,
                      class: "bomx-btn",
                      style: { background: "var(--bx-blueS)", color: "var(--bx-blue)" },
                      onClick: qt,
                      disabled: !re.value,
                      title: re.value ? "" : we
                    }, " Issue from Store ", 8, Za)) : r("", !0),
                    !i.value && a.value.docstatus === 0 && a.value.production_plan ? (n(), o("button", {
                      key: 9,
                      class: "bomx-btn bomx-btn-light",
                      onClick: yt,
                      disabled: c.value || x.value || !he.value
                    }, u(c.value ? "Submitting…" : "Submit"), 9, el)) : r("", !0),
                    !i.value && a.value.docstatus === 0 && !a.value.production_plan && (a.value.status === "Draft" || a.value.status === "Sent Back") ? (n(), o("button", {
                      key: 10,
                      class: "bomx-btn bomx-btn-light",
                      onClick: vt,
                      disabled: c.value || x.value || !he.value
                    }, u(c.value ? "Sending…" : "Send for Approval"), 9, tl)) : r("", !0),
                    !i.value && a.value.docstatus === 0 && a.value.status === "Pending Approval" && P.value.can_approve && !E.value ? (n(), o("button", {
                      key: 11,
                      class: "bomx-btn bomx-btn-light",
                      onClick: pt,
                      disabled: c.value
                    }, u(c.value ? "Approving…" : "Approve"), 9, al)) : r("", !0),
                    !i.value && a.value.docstatus === 0 && a.value.status === "Pending Approval" && P.value.can_approve && !E.value ? (n(), o("button", {
                      key: 12,
                      class: "bomx-btn bomx-btn-light",
                      onClick: e[5] || (e[5] = (l) => E.value = !0),
                      disabled: c.value
                    }, " Send Back ", 8, ll)) : r("", !0),
                    !y.value && !i.value ? (n(), o("button", {
                      key: 13,
                      class: "bomx-btn bomx-btn-light",
                      onClick: $e,
                      disabled: x.value || k.value || !(i.value ? C.value : he.value)
                    }, u(x.value ? "Saving…" : i.value ? "Save Material Request" : "Save Changes"), 9, sl)) : r("", !0),
                    s("button", {
                      class: "mr-drawer-x",
                      onClick: ee,
                      disabled: x.value || c.value,
                      title: "Close"
                    }, [
                      s("span", {
                        innerHTML: h("x", 16)
                      }, null, 8, ol)
                    ], 8, nl)
                  ])
                ])
              ]),
              it.value ? (n(), o("div", rl, [
                (n(!0), o(f, null, j(Ne.value, (l) => (n(), o("div", { key: l }, u(l), 1))), 128))
              ])) : r("", !0),
              i.value && !C.value ? (n(), o("div", ul, u(ve) + " You can view this form but not save it.")) : r("", !0),
              !i.value && a.value.status === "Pending Approval" ? (n(), o("div", il, [
                s("div", dl, [
                  P.value.can_approve ? (n(), o(f, { key: 0 }, [
                    b("Waiting for your approval.")
                  ], 64)) : (n(), o(f, { key: 1 }, [
                    b("Waiting for approval by " + u(P.value.project_manager ? L(O)(P.value.project_manager) : "the Project Manager") + ".", 1)
                  ], 64))
                ])
              ])) : r("", !0),
              !i.value && a.value.status === "Pending Approval" && P.value.can_approve && E.value ? (n(), o("div", cl, [
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
                }, u(c.value ? "Sending…" : "Confirm Send Back"), 9, vl),
                s("button", {
                  class: "mrx-sb-cancel",
                  onClick: e[7] || (e[7] = (l) => {
                    E.value = !1, T.value = "";
                  }),
                  disabled: c.value
                }, "Cancel", 8, ml)
              ])) : r("", !0),
              !i.value && a.value.status === "Sent Back" && a.value.docstatus === 0 ? (n(), o("div", pl, [
                e[26] || (e[26] = s("span", { class: "mrx-sb-tag" }, "Sent Back", -1)),
                s("div", null, [
                  s("div", _l, u(a.value.send_back_reason), 1),
                  s("div", bl, "Sent back by " + u(L(O)(a.value.sent_back_by)) + " on " + u(I(a.value.sent_back_on)) + ". Correct it and send it for approval again.", 1)
                ])
              ])) : r("", !0),
              s("div", yl, [
                s("div", null, [
                  e[29] || (e[29] = s("div", { class: "bomx-hf-label" }, [
                    b("Purpose "),
                    s("span", { style: { color: "var(--bx-red)" } }, "*")
                  ], -1)),
                  A(s("select", {
                    class: "bomx-fi",
                    "onUpdate:modelValue": e[8] || (e[8] = (l) => a.value.material_request_type = l),
                    disabled: y.value,
                    style: { width: "100%" },
                    onChange: _t
                  }, [
                    e[27] || (e[27] = s("option", { value: "Purchase" }, "Purchase", -1)),
                    e[28] || (e[28] = s("option", { value: "Asset" }, "Asset", -1)),
                    a.value.material_request_type && !["Purchase", "Asset"].includes(a.value.material_request_type) ? (n(), o("option", {
                      key: 0,
                      value: a.value.material_request_type
                    }, u(a.value.material_request_type), 9, hl)) : r("", !0)
                  ], 40, fl), [
                    [Qe, a.value.material_request_type]
                  ])
                ]),
                s("div", null, [
                  e[30] || (e[30] = s("div", { class: "bomx-hf-label" }, [
                    b("Entry Date "),
                    s("span", { style: { color: "var(--bx-red)" } }, "*")
                  ], -1)),
                  A(s("input", {
                    class: "bomx-fi",
                    type: "date",
                    "onUpdate:modelValue": e[9] || (e[9] = (l) => a.value.entry_date = l),
                    disabled: y.value,
                    style: { width: "100%" }
                  }, null, 8, gl), [
                    [H, a.value.entry_date]
                  ])
                ]),
                s("div", null, [
                  e[31] || (e[31] = s("div", { class: "bomx-hf-label" }, [
                    b("Required By "),
                    s("span", { style: { color: "var(--bx-red)" } }, "*")
                  ], -1)),
                  A(s("input", {
                    class: "bomx-fi",
                    type: "date",
                    "onUpdate:modelValue": e[10] || (e[10] = (l) => a.value.posting_date = l),
                    disabled: y.value,
                    style: { width: "100%" }
                  }, null, 8, kl), [
                    [H, a.value.posting_date]
                  ])
                ]),
                s("div", null, [
                  e[32] || (e[32] = s("div", { class: "bomx-hf-label" }, "Employee", -1)),
                  N(Q, {
                    modelValue: a.value.employee,
                    "onUpdate:modelValue": [
                      e[11] || (e[11] = (l) => a.value.employee = l),
                      nt
                    ],
                    options: st.value,
                    disabled: y.value,
                    placeholder: "Select employee"
                  }, null, 8, ["modelValue", "options", "disabled"])
                ]),
                s("div", null, [
                  s("div", xl, [
                    e[33] || (e[33] = b("Project ", -1)),
                    !a.value.production_plan && a.value.material_request_type !== "Asset" ? (n(), o("span", wl, "*")) : r("", !0)
                  ]),
                  N(Q, {
                    modelValue: a.value.project,
                    "onUpdate:modelValue": [
                      e[12] || (e[12] = (l) => a.value.project = l),
                      dt
                    ],
                    options: L(lt),
                    disabled: y.value,
                    placeholder: "Select project",
                    onSearch: e[13] || (e[13] = (l) => L(be)(l, a.value.project))
                  }, null, 8, ["modelValue", "options", "disabled"])
                ]),
                s("div", null, [
                  s("div", ql, [
                    e[34] || (e[34] = b("Delivery Warehouse ", -1)),
                    a.value.production_plan ? r("", !0) : (n(), o("span", Rl, "*"))
                  ]),
                  N(Q, {
                    modelValue: a.value.delivery_warehouse,
                    "onUpdate:modelValue": e[14] || (e[14] = (l) => a.value.delivery_warehouse = l),
                    options: Ee.value,
                    disabled: y.value,
                    placeholder: "Select warehouse"
                  }, null, 8, ["modelValue", "options", "disabled"])
                ])
              ]),
              a.value.production_plan ? (n(), o("div", Cl, [
                s("div", Ml, [
                  e[35] || (e[35] = b(" Production Plan: ", -1)),
                  N(Wt, {
                    doctype: "Production Plan",
                    name: a.value.production_plan
                  }, null, 8, ["name"])
                ])
              ])) : r("", !0),
              s("div", Sl, [
                s("div", Pl, [
                  e[37] || (e[37] = s("span", {
                    class: "bomx-section-lbl",
                    style: { "margin-bottom": "0" }
                  }, "Items", -1)),
                  y.value ? r("", !0) : (n(), o("button", {
                    key: 0,
                    class: "bomx-btn bomx-btn-sm bomx-btn-light",
                    style: { color: "var(--bx-mfgB)", border: "1px solid var(--bx-mfg)" },
                    onClick: Ve,
                    disabled: de.value,
                    title: de.value ? `At most ${qe} items per Material Request` : ""
                  }, [
                    s("span", {
                      innerHTML: h("plus", 12)
                    }, null, 8, Ll),
                    e[36] || (e[36] = b(" Add Row ", -1))
                  ], 8, Al))
                ]),
                s("div", {
                  class: X(["mrx-items", { "mrx-has-wh": a.value.production_plan }]),
                  style: { "margin-bottom": "20px" }
                }, [
                  !a.value.items || !a.value.items.length ? (n(), o("div", Ol, "No items yet. Add a row or create from Production Plan.")) : (n(), o(f, { key: 1 }, [
                    s("div", Tl, [
                      e[38] || (e[38] = s("span", { class: "mrx-c-no" }, "#", -1)),
                      e[39] || (e[39] = s("span", null, "Item", -1)),
                      e[40] || (e[40] = s("span", null, "Required Qty", -1)),
                      e[41] || (e[41] = s("span", null, "UOM", -1)),
                      a.value.production_plan ? (n(), o("span", jl, "Warehouse")) : r("", !0),
                      y.value ? r("", !0) : (n(), o("span", Nl))
                    ]),
                    (n(!0), o(f, null, j(a.value.items, (l, v) => (n(), o("div", {
                      key: v,
                      class: "mrx-row"
                    }, [
                      s("span", Vl, u(v + 1), 1),
                      N(Q, {
                        modelValue: l.item_code,
                        "onUpdate:modelValue": (_) => l.item_code = _,
                        options: Rt.value,
                        placeholder: "— Select Item —",
                        disabled: y.value,
                        onSelect: (_) => bt(l),
                        compact: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled", "onSelect"]),
                      A(s("input", {
                        class: "bomx-fi bomx-fi-mono",
                        type: "number",
                        "onUpdate:modelValue": (_) => l.required_qty = _,
                        min: "0.001",
                        step: "any",
                        disabled: y.value
                      }, null, 8, Dl), [
                        [H, l.required_qty]
                      ]),
                      N(Q, {
                        modelValue: l.uom,
                        "onUpdate:modelValue": (_) => l.uom = _,
                        options: Ct.value,
                        placeholder: "—",
                        disabled: y.value,
                        compact: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"]),
                      a.value.production_plan ? (n(), zt(Q, {
                        key: 0,
                        modelValue: l.warehouse,
                        "onUpdate:modelValue": (_) => l.warehouse = _,
                        options: Ee.value,
                        placeholder: "— Select —",
                        disabled: y.value,
                        compact: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"])) : r("", !0),
                      y.value ? r("", !0) : (n(), o("button", {
                        key: 1,
                        class: "bomx-btn-icon danger",
                        onClick: (_) => a.value.items.splice(v, 1),
                        title: "Remove row"
                      }, [
                        s("span", {
                          innerHTML: h("trash", 13)
                        }, null, 8, Bl)
                      ], 8, $l))
                    ]))), 128))
                  ], 64)),
                  !y.value && a.value.items && a.value.items.length && !de.value ? (n(), o("button", {
                    key: 2,
                    class: "mrx-add",
                    onClick: Ve
                  }, [
                    s("span", {
                      innerHTML: h("plus", 12)
                    }, null, 8, El),
                    e[42] || (e[42] = b(" Add another item ", -1))
                  ])) : r("", !0)
                ], 2),
                !i.value && W.value.some((l) => l.ordered > 0) ? (n(), o("div", Il, [
                  e[43] || (e[43] = s("div", { class: "bomx-section-lbl" }, "Ordered so far", -1)),
                  (n(!0), o(f, null, j(W.value, (l) => (n(), o("div", {
                    key: l.item_code,
                    style: { display: "flex", "justify-content": "space-between", padding: "3px 0", "border-bottom": "1px solid #eef0f3" }
                  }, [
                    s("span", null, u(l.item_name || l.item_code), 1),
                    s("span", null, [
                      b("MRN " + u(l.mrn_qty) + " · Ordered " + u(l.ordered) + " · ", 1),
                      s("b", null, "Balance " + u(l.remaining), 1)
                    ])
                  ]))), 128))
                ])) : r("", !0),
                e[44] || (e[44] = s("div", { class: "bomx-section-lbl" }, "Remarks", -1)),
                A(s("textarea", {
                  class: "bomx-fi",
                  "onUpdate:modelValue": e[15] || (e[15] = (l) => a.value.remarks = l),
                  rows: "3",
                  disabled: y.value,
                  style: { width: "100%", "min-height": "90px", resize: "vertical" },
                  placeholder: "Optional notes…"
                }, null, 8, Ul), [
                  [H, a.value.remarks]
                ]),
                !i.value && a.value.owner ? (n(), o("div", Hl, [
                  b(" Created by " + u(L(O)(a.value.owner)) + " on " + u(I(a.value.creation)) + " ", 1),
                  a.value.approved_by ? (n(), o(f, { key: 0 }, [
                    b(" · Approved by " + u(L(O)(a.value.approved_by)) + " on " + u(I(a.value.approved_on)), 1)
                  ], 64)) : r("", !0),
                  a.value.modified_by ? (n(), o(f, { key: 1 }, [
                    b(" · Last modified by " + u(L(O)(a.value.modified_by)) + " on " + u(I(a.value.modified)), 1)
                  ], 64)) : r("", !0)
                ])) : r("", !0)
              ]),
              i.value ? (n(), o("div", Ql, [
                e[45] || (e[45] = s("span", { class: "mr-drawer-foot-note" }, "New material request — unsaved", -1)),
                s("div", Fl, [
                  s("button", {
                    class: "mr-btn-cancel",
                    onClick: ee,
                    disabled: x.value
                  }, "Cancel", 8, zl),
                  s("button", {
                    class: "mr-btn-save",
                    onClick: $e,
                    disabled: x.value || k.value || y.value || !C.value,
                    title: C.value ? "" : ve
                  }, [
                    s("span", {
                      innerHTML: h("file", 14)
                    }, null, 8, Wl),
                    b(" " + u(x.value ? "Saving…" : "Save Material Request"), 1)
                  ], 8, Kl)
                ])
              ])) : r("", !0)
            ], 64))
          ], 64)) : r("", !0)
        ])
      ])) : r("", !0)
    ]));
  }
}, ls = /* @__PURE__ */ Mt(Gl, [["__scopeId", "data-v-f122bb0d"]]);
export {
  ls as default
};
