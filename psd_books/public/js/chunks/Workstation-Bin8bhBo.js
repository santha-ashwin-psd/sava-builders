import { _ as be, x as pe, o as ye, y as xe, X as fe, c as l, a as e, t as n, w as f, A as g, D as R, v as ke, n as _, d as b, F as k, r as J, q as M, $ as he, u as B, b as C, h as d, f as h, S as we, g as p, a2 as Z, K as ge, j as _e, a3 as Ce, k as i } from "./main-LhCeK3GV.js";
import { _ as F } from "./SearchableSelect-CmWmhQpu.js";
import { o as ee } from "./userNames-Bg9sT_Dp.js";
import { b as te } from "./format-BcJZDVG4.js";
const Te = { class: "bomx-page" }, We = { class: "bomx-stats-row" }, $e = {
  class: "bomx-stat-card",
  style: { "border-left-color": "var(--bx-mfg)" }
}, Le = { class: "bomx-stat-value" }, Me = {
  class: "bomx-stat-card",
  style: { "border-left-color": "var(--bx-green)" }
}, He = { class: "bomx-stat-value" }, Se = {
  class: "bomx-stat-card",
  style: { "border-left-color": "var(--bx-muted)" }
}, Ve = { class: "bomx-stat-value" }, De = {
  class: "bomx-stat-card",
  style: { "border-left-color": "var(--bx-amber)" }
}, Ne = { class: "bomx-stat-value" }, Oe = { class: "bomx-toolbar" }, Ae = { class: "bomx-search-wrap" }, Be = ["innerHTML"], je = { class: "bomx-toolbar-count" }, Ue = { class: "bomx-view-toggle" }, Ie = ["innerHTML"], Ee = ["innerHTML"], Re = ["disabled", "title"], Je = ["innerHTML"], Fe = {
  key: 0,
  class: "bomx-grid"
}, qe = {
  key: 1,
  class: "bomx-empty-state"
}, ze = ["disabled", "title"], Ke = ["innerHTML"], Ge = {
  key: 2,
  class: "bomx-grid"
}, Pe = ["onClick"], Xe = { class: "bomx-ws-card-hdr" }, Qe = { class: "bomx-ws-icon" }, Ye = { style: { "min-width": "0", flex: "1" } }, Ze = { class: "bomx-ws-title" }, et = { class: "bomx-ws-code mono" }, tt = { key: 0 }, st = { class: "bomx-ws-badges" }, ot = {
  key: 0,
  class: "bomx-badge",
  style: { background: "var(--bx-mfgS)", color: "var(--bx-mfgB)" }
}, at = { class: "bomx-ws-stats" }, nt = { class: "bomx-ws-stat-val" }, lt = { class: "bomx-ws-stat-val" }, it = { class: "bomx-ws-footer" }, rt = { class: "bomx-ws-loc" }, dt = { style: { display: "flex", gap: "6px" } }, ut = ["onClick"], vt = ["innerHTML"], ct = ["disabled", "title", "onClick"], mt = ["innerHTML"], bt = {
  key: 3,
  class: "bomx-table-wrap"
}, pt = { class: "bomx-table" }, yt = ["onClick"], xt = { class: "mono" }, ft = { style: { "font-weight": "600", color: "var(--bx-text)" } }, kt = {
  key: 0,
  class: "bomx-badge",
  style: { background: "var(--bx-mfgS)", color: "var(--bx-mfgB)" }
}, ht = {
  key: 1,
  style: { color: "var(--bx-muted)" }
}, wt = { style: { display: "flex", gap: "6px", "justify-content": "flex-end" } }, gt = ["onClick"], _t = ["innerHTML"], Ct = ["disabled", "title", "onClick"], Tt = ["innerHTML"], Wt = { class: "bomx-drawer" }, $t = {
  key: 0,
  class: "bomx-empty-state"
}, Lt = { class: "bomx-drawer-hdr" }, Mt = { style: { "min-width": "0" } }, Ht = { class: "bomx-drawer-title" }, St = ["innerHTML"], Vt = { class: "bomx-drawer-tabs" }, Dt = { class: "bomx-drawer-body" }, Nt = ["disabled"], Ot = {
  key: 0,
  class: "bomx-field-hint",
  style: { "margin-bottom": "16px" }
}, At = {
  key: 1,
  style: { "margin-bottom": "16px" }
}, Bt = { class: "bomx-drawer-grid-2" }, jt = {
  class: "bomx-drawer-toggle-card",
  style: { "margin-top": "16px" }
}, Ut = { class: "bomx-switch" }, It = { class: "bomx-drawer-grid-2" }, Et = { style: { "margin-top": "16px" } }, Rt = { style: { position: "relative" } }, Jt = {
  key: 2,
  class: "inv-view-footer"
}, Ft = { class: "bomx-drawer-footer" }, qt = ["disabled", "title"], zt = ["disabled"], Kt = ["innerHTML"], Gt = {
  __name: "Workstation",
  setup(Pt) {
    const y = we(), H = _e(), { toast: r } = pe(), { confirm: q } = Ce(), T = d(!1), x = d([]), j = d(""), S = d(""), V = d(""), W = d("grid"), se = p(() => y.params.name && y.params.name !== "new" ? y.params.name : y.params.name === "new" ? "new" : null);
    async function D() {
      T.value = !0;
      try {
        const t = await h("Workstation", { fields: ["name", "workstation_name", "workstation_type", "warehouse", "capacity", "hour_rate", "is_active", "modified"], limit: 1e3, order: "modified desc" });
        x.value = t || [];
      } catch {
        r("Could not load Workstations", "error");
      }
      T.value = !1;
    }
    const $ = p(() => {
      let s = x.value;
      S.value === "active" && (s = s.filter((o) => o.is_active)), S.value === "inactive" && (s = s.filter((o) => !o.is_active)), V.value && (s = s.filter((o) => o.workstation_type === V.value));
      const t = j.value.toLowerCase().trim();
      return t && (s = s.filter((o) => [o.name, o.workstation_name, o.workstation_type, o.warehouse].filter(Boolean).join(" ").toLowerCase().includes(t))), s;
    }), oe = p(() => x.value.filter((s) => s.is_active).length), ae = p(() => x.value.filter((s) => !s.is_active).length), ne = p(() => x.value.length ? x.value.reduce((t, o) => t + (Number(o.hour_rate) || 0), 0) / x.value.length : 0);
    function z(s) {
      return s.is_active ? "Active" : "Inactive";
    }
    function K(s) {
      return s.is_active ? "badge-active" : "badge-obsolete";
    }
    function le(s) {
      const t = (s || "").toLowerCase();
      return t.includes("machine") ? "⚙️" : t.includes("labour") || t.includes("labor") ? "🧑‍🏭" : t.includes("assembly") ? "🧩" : t.includes("quality") ? "✅" : t.includes("paint") || t.includes("coat") ? "🎨" : t.includes("pack") ? "📦" : "🏭";
    }
    function U(s) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(s || 0);
    }
    function N(s) {
      H.push(`/manufacturing/workstation/${s}`);
    }
    function G() {
      c.value = "details", H.push("/manufacturing/workstation/new");
    }
    function L() {
      H.push("/manufacturing/workstation");
    }
    async function P(s) {
      try {
        const [t, o, m, E] = await Promise.all([
          h("Operation", { fields: ["name"], filters: [["default_workstation", "=", s.name]], limit: 1 }),
          h("Work Order Operation", { fields: ["parent"], filters: [["workstation", "=", s.name]], limit: 1 }),
          h("BOM Operation", { fields: ["parent"], filters: [["workstation", "=", s.name]], limit: 1 }),
          h("Job Card", { fields: ["name"], filters: [["workstation", "=", s.name]], limit: 1 })
        ]);
        if (t && t.length)
          return r(`${s.name} is used as the default workstation on Operation ${t[0].name} and cannot be deleted.`, "error"), !1;
        if (o && o.length)
          return r(`${s.name} is used by Work Order ${o[0].parent} and cannot be deleted.`, "error"), !1;
        if (m && m.length)
          return r(`${s.name} is used by BOM ${m[0].parent} and cannot be deleted.`, "error"), !1;
        if (E && E.length)
          return r(`${s.name} is referenced by Job Card ${E[0].name} and cannot be deleted.`, "error"), !1;
      } catch {
        return r(`Could not verify whether ${s.name} is in use — try again.`, "error"), !1;
      }
      return !0;
    }
    async function X(s) {
      if (await P(s) && await q({ title: "Delete Workstation?", body: `Are you sure you want to delete ${s.name}?`, okLabel: "Delete", okStyle: "danger" }))
        try {
          await Z("Workstation", s.name), r("Workstation deleted"), D();
        } catch (t) {
          r("Could not delete Workstation: " + t.message, "error");
        }
    }
    async function ie() {
      const s = { name: a.value.name };
      if (await P(s) && await q({ title: "Delete Workstation?", body: `Are you sure you want to delete ${s.name}?`, okLabel: "Delete", okStyle: "danger" }))
        try {
          await Z("Workstation", s.name), r("Workstation deleted"), L(), D();
        } catch (t) {
          r("Could not delete Workstation: " + t.message, "error");
        }
    }
    const v = p(() => y.params.name === "new"), O = d(!1), A = d(!1), c = d("details");
    function I() {
      return {
        doctype: "Workstation",
        workstation_name: "",
        workstation_type: "",
        warehouse: "",
        capacity: 1,
        working_hours_per_day: 8,
        hour_rate: 0,
        description: "",
        is_active: 1
      };
    }
    const a = d(I()), w = d([]), Q = d([]);
    async function re() {
      try {
        w.value = await h("Workstation Type", { fields: ["name", "is_active"], filters: [["is_active", "=", 1]], limit: 1e3 }) || [], Q.value = await h("Warehouse", { fields: ["name", "warehouse_name"], limit: 1e3 }) || [];
      } catch {
        r("Could not load Workstation Types / Warehouses — some dropdowns may be empty", "error");
      }
    }
    ye(async () => {
      T.value = !0, await D(), await re(), y.params.name && await Y(), T.value = !1;
    }), xe(() => y.params.name, async (s) => {
      if (c.value = "details", !s) {
        a.value = I();
        return;
      }
      await Y();
    });
    async function Y() {
      if (v.value) {
        a.value = I();
        return;
      }
      O.value = !0;
      try {
        const s = await fe("Workstation", y.params.name);
        a.value = s, s.workstation_type && !w.value.some((t) => t.name === s.workstation_type) && (w.value = [{ name: s.workstation_type }, ...w.value]);
      } catch {
        r("Could not load Workstation", "error"), L();
      }
      O.value = !1;
    }
    async function de() {
      if (!a.value.workstation_name) {
        r("Workstation Name is mandatory", "error"), c.value = "details";
        return;
      }
      if (!a.value.workstation_type) {
        r("Workstation Type is mandatory", "error"), c.value = "details";
        return;
      }
      A.value = !0;
      try {
        const s = await ge(a.value);
        r(v.value ? "Workstation created successfully" : "Saved successfully"), v.value ? H.replace(`/manufacturing/workstation/${s.name}`) : a.value = s, D();
      } catch (s) {
        r(s.message || "Could not save", "error");
      }
      A.value = !1;
    }
    const ue = {
      plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
      search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
      grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
      list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
      edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
      trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
      x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
      save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>'
    };
    function u(s, t) {
      return (ue[s] || "").replace("<svg ", `<svg width="${t}" height="${t}" `);
    }
    const ve = p(() => [{ value: "", label: "All Types" }, ...(w.value || []).map((s) => ({ value: s.name, label: s.name }))]), ce = p(() => [{ value: "", label: "— Select Workstation Type —" }, ...(w.value || []).map((s) => ({ value: s.name, label: s.name }))]), me = p(() => [{ value: "", label: "— Select Warehouse —" }, ...(Q.value || []).map((s) => ({ value: s.name, label: s.warehouse_name || s.name }))]);
    return (s, t) => (i(), l("div", Te, [
      e("div", We, [
        e("div", $e, [
          t[15] || (t[15] = e("div", {
            class: "bomx-stat-label",
            style: { color: "var(--bx-mfg)" }
          }, "TOTAL WORKSTATIONS", -1)),
          e("div", Le, n(x.value.length), 1),
          t[16] || (t[16] = e("div", { class: "bomx-stat-sub" }, "All types", -1))
        ]),
        e("div", Me, [
          t[17] || (t[17] = e("div", {
            class: "bomx-stat-label",
            style: { color: "var(--bx-green)" }
          }, "ACTIVE", -1)),
          e("div", He, n(oe.value), 1),
          t[18] || (t[18] = e("div", { class: "bomx-stat-sub" }, "Currently in use", -1))
        ]),
        e("div", Se, [
          t[19] || (t[19] = e("div", {
            class: "bomx-stat-label",
            style: { color: "var(--bx-muted)" }
          }, "INACTIVE", -1)),
          e("div", Ve, n(ae.value), 1),
          t[20] || (t[20] = e("div", { class: "bomx-stat-sub" }, "Not in use", -1))
        ]),
        e("div", De, [
          t[21] || (t[21] = e("div", {
            class: "bomx-stat-label",
            style: { color: "var(--bx-amber)" }
          }, "AVG COST / HOUR", -1)),
          e("div", Ne, n(U(ne.value)), 1),
          t[22] || (t[22] = e("div", { class: "bomx-stat-sub" }, "Across all workstations", -1))
        ])
      ]),
      e("div", Oe, [
        e("div", Ae, [
          e("span", {
            class: "bomx-search-icon",
            innerHTML: u("search", 15)
          }, null, 8, Be),
          f(e("input", {
            class: "bomx-search-input",
            "onUpdate:modelValue": t[0] || (t[0] = (o) => j.value = o),
            type: "text",
            placeholder: "Search workstations…"
          }, null, 512), [
            [g, j.value]
          ])
        ]),
        R(F, {
          modelValue: V.value,
          "onUpdate:modelValue": t[1] || (t[1] = (o) => V.value = o),
          options: ve.value,
          placeholder: "All Types",
          style: { width: "150px" },
          compact: ""
        }, null, 8, ["modelValue", "options"]),
        f(e("select", {
          class: "bomx-fi",
          "onUpdate:modelValue": t[2] || (t[2] = (o) => S.value = o),
          style: { width: "130px" }
        }, [...t[23] || (t[23] = [
          e("option", { value: "" }, "All Status", -1),
          e("option", { value: "active" }, "Active", -1),
          e("option", { value: "inactive" }, "Inactive", -1)
        ])], 512), [
          [ke, S.value]
        ]),
        t[25] || (t[25] = e("div", { style: { flex: "1" } }, null, -1)),
        e("span", je, n($.value.length) + " workstation" + n($.value.length === 1 ? "" : "s"), 1),
        e("div", Ue, [
          e("button", {
            type: "button",
            class: _({ active: W.value === "grid" }),
            onClick: t[3] || (t[3] = (o) => W.value = "grid"),
            title: "Grid view",
            innerHTML: u("grid", 15)
          }, null, 10, Ie),
          e("button", {
            type: "button",
            class: _({ active: W.value === "list" }),
            onClick: t[4] || (t[4] = (o) => W.value = "list"),
            title: "List view",
            innerHTML: u("list", 15)
          }, null, 10, Ee)
        ]),
        e("button", {
          class: "bomx-btn bomx-btn-mfg",
          disabled: !s.$canCreate("inventory"),
          title: s.$canCreate("inventory") ? "" : "Read-only access",
          onClick: G
        }, [
          e("span", {
            innerHTML: u("plus", 13)
          }, null, 8, Je),
          t[24] || (t[24] = b(" New Workstation", -1))
        ], 8, Re)
      ]),
      T.value ? (i(), l("div", Fe, [
        (i(), l(k, null, J(6, (o) => e("div", {
          key: o,
          class: "bomx-ws-card"
        }, [...t[26] || (t[26] = [
          e("div", {
            class: "shimmer",
            style: { height: "190px", "border-radius": "var(--bx-radius)" }
          }, null, -1)
        ])])), 64))
      ])) : $.value.length ? W.value === "grid" ? (i(), l("div", Ge, [
        (i(!0), l(k, null, J($.value, (o) => (i(), l("div", {
          key: o.name,
          class: "bomx-ws-card",
          onClick: (m) => N(o.name)
        }, [
          e("div", Xe, [
            e("div", Qe, n(le(o.workstation_type)), 1),
            e("div", Ye, [
              e("div", Ze, n(o.workstation_name || o.name), 1),
              e("div", et, [
                b(n(o.name), 1),
                o.workstation_type ? (i(), l("span", tt, " · " + n(o.workstation_type), 1)) : C("", !0)
              ])
            ])
          ]),
          e("div", st, [
            o.workstation_type ? (i(), l("span", ot, n(o.workstation_type), 1)) : C("", !0),
            e("span", {
              class: _(["bomx-badge", K(o)])
            }, n(z(o)), 3)
          ]),
          e("div", at, [
            e("div", null, [
              t[31] || (t[31] = e("div", { class: "bomx-ws-stat-lbl" }, "Job Capacity", -1)),
              e("div", nt, n(o.capacity ?? "—"), 1)
            ]),
            e("div", null, [
              t[32] || (t[32] = e("div", { class: "bomx-ws-stat-lbl" }, "Cost / Hour", -1)),
              e("div", lt, n(U(o.hour_rate)), 1)
            ])
          ]),
          e("div", it, [
            e("span", rt, n(o.warehouse || "—"), 1),
            e("div", dt, [
              e("button", {
                class: "bomx-btn-icon",
                onClick: M((m) => N(o.name), ["stop"]),
                title: "Edit"
              }, [
                e("span", {
                  innerHTML: u("edit", 13)
                }, null, 8, vt)
              ], 8, ut),
              e("button", {
                class: "bomx-btn-icon danger",
                disabled: !s.$canDelete("inventory"),
                title: s.$canDelete("inventory") ? "" : "Not permitted",
                onClick: M((m) => X(o), ["stop"])
              }, [
                e("span", {
                  innerHTML: u("trash", 13)
                }, null, 8, mt)
              ], 8, ct)
            ])
          ])
        ], 8, Pe))), 128))
      ])) : (i(), l("div", bt, [
        e("table", pt, [
          t[33] || (t[33] = e("thead", null, [
            e("tr", null, [
              e("th", null, "Code"),
              e("th", null, "Name"),
              e("th", null, "Type"),
              e("th", null, "Warehouse"),
              e("th", null, "Job Capacity"),
              e("th", null, "Cost/Hr"),
              e("th", null, "Status"),
              e("th", { style: { width: "80px" } })
            ])
          ], -1)),
          e("tbody", null, [
            (i(!0), l(k, null, J($.value, (o) => (i(), l("tr", {
              key: o.name,
              onClick: (m) => N(o.name)
            }, [
              e("td", xt, n(o.name), 1),
              e("td", ft, n(o.workstation_name || o.name), 1),
              e("td", null, [
                o.workstation_type ? (i(), l("span", kt, n(o.workstation_type), 1)) : (i(), l("span", ht, "—"))
              ]),
              e("td", null, n(o.warehouse || "—"), 1),
              e("td", null, n(o.capacity ?? "—"), 1),
              e("td", null, n(U(o.hour_rate)), 1),
              e("td", null, [
                e("span", {
                  class: _(["bomx-badge", K(o)])
                }, n(z(o)), 3)
              ]),
              e("td", null, [
                e("div", wt, [
                  e("button", {
                    class: "bomx-btn-icon",
                    onClick: M((m) => N(o.name), ["stop"]),
                    title: "Edit"
                  }, [
                    e("span", {
                      innerHTML: u("edit", 13)
                    }, null, 8, _t)
                  ], 8, gt),
                  e("button", {
                    class: "bomx-btn-icon danger",
                    disabled: !s.$canDelete("inventory"),
                    title: s.$canDelete("inventory") ? "" : "Not permitted",
                    onClick: M((m) => X(o), ["stop"])
                  }, [
                    e("span", {
                      innerHTML: u("trash", 13)
                    }, null, 8, Tt)
                  ], 8, Ct)
                ])
              ])
            ], 8, yt))), 128))
          ])
        ])
      ])) : (i(), l("div", qe, [
        t[28] || (t[28] = e("div", { class: "bomx-empty-icon" }, "⚙️", -1)),
        t[29] || (t[29] = e("div", { class: "bomx-empty-title" }, "No Workstations found", -1)),
        t[30] || (t[30] = e("div", { class: "bomx-empty-sub" }, "Try adjusting your search or filters, or create a new workstation.", -1)),
        e("button", {
          class: "bomx-btn bomx-btn-mfg",
          disabled: !s.$canCreate("inventory"),
          title: s.$canCreate("inventory") ? "" : "Read-only access",
          onClick: G
        }, [
          e("span", {
            innerHTML: u("plus", 13)
          }, null, 8, Ke),
          t[27] || (t[27] = b(" Create Workstation", -1))
        ], 8, ze)
      ])),
      se.value ? (i(), l("div", {
        key: 4,
        class: "bomx-overlay",
        onClick: M(L, ["self"])
      }, [
        e("div", Wt, [
          O.value ? (i(), l("div", $t, [...t[34] || (t[34] = [
            e("div", {
              class: "shimmer",
              style: { height: "220px", "border-radius": "var(--bx-radius)" }
            }, null, -1)
          ])])) : (i(), l(k, { key: 1 }, [
            e("div", Lt, [
              e("div", Mt, [
                e("div", Ht, n(v.value ? "New Workstation" : a.value.workstation_name || a.value.name), 1),
                t[35] || (t[35] = e("div", { class: "bomx-drawer-sub" }, "Configure type, capacity, and costs", -1))
              ]),
              e("button", {
                class: "bomx-drawer-close",
                onClick: L,
                title: "Close"
              }, [
                e("span", {
                  innerHTML: u("x", 16)
                }, null, 8, St)
              ])
            ]),
            e("div", Vt, [
              e("button", {
                type: "button",
                class: _(["bomx-drawer-tab", { active: c.value === "details" }]),
                onClick: t[5] || (t[5] = (o) => c.value = "details")
              }, "Details", 2),
              e("button", {
                type: "button",
                class: _(["bomx-drawer-tab", { active: c.value === "capacity" }]),
                onClick: t[6] || (t[6] = (o) => c.value = "capacity")
              }, "Capacity & Costs", 2)
            ]),
            e("div", Dt, [
              c.value === "details" ? (i(), l(k, { key: 0 }, [
                t[40] || (t[40] = e("div", { class: "bomx-hf-label" }, [
                  b("Workstation Name "),
                  e("span", { style: { color: "var(--bx-red)" } }, "*")
                ], -1)),
                f(e("input", {
                  class: "bomx-fi",
                  type: "text",
                  "onUpdate:modelValue": t[7] || (t[7] = (o) => a.value.workstation_name = o),
                  disabled: !v.value,
                  placeholder: "e.g., Assembly Station 1",
                  style: { width: "100%", "margin-bottom": "4px" }
                }, null, 8, Nt), [
                  [g, a.value.workstation_name]
                ]),
                v.value ? (i(), l("div", At)) : (i(), l("div", Ot, "Name cannot be changed after creation.")),
                e("div", Bt, [
                  e("div", null, [
                    t[36] || (t[36] = e("div", { class: "bomx-hf-label" }, [
                      b("Workstation Type "),
                      e("span", { style: { color: "var(--bx-red)" } }, "*")
                    ], -1)),
                    R(F, {
                      modelValue: a.value.workstation_type,
                      "onUpdate:modelValue": t[8] || (t[8] = (o) => a.value.workstation_type = o),
                      options: ce.value,
                      placeholder: "— Select Workstation Type —",
                      style: { width: "100%" }
                    }, null, 8, ["modelValue", "options"])
                  ]),
                  e("div", null, [
                    t[37] || (t[37] = e("div", { class: "bomx-hf-label" }, "Warehouse", -1)),
                    R(F, {
                      modelValue: a.value.warehouse,
                      "onUpdate:modelValue": t[9] || (t[9] = (o) => a.value.warehouse = o),
                      options: me.value,
                      placeholder: "— Select Warehouse —",
                      style: { width: "100%" }
                    }, null, 8, ["modelValue", "options"])
                  ])
                ]),
                t[41] || (t[41] = e("div", {
                  class: "bomx-hf-label",
                  style: { "margin-top": "16px" }
                }, "Description", -1)),
                f(e("textarea", {
                  class: "bomx-fi",
                  "onUpdate:modelValue": t[10] || (t[10] = (o) => a.value.description = o),
                  style: { width: "100%", "min-height": "100px", resize: "vertical" },
                  placeholder: "Machine specs, location, or any notes…"
                }, null, 512), [
                  [g, a.value.description]
                ]),
                e("div", jt, [
                  t[39] || (t[39] = e("div", null, [
                    e("div", { class: "bomx-drawer-toggle-title" }, "Is Active"),
                    e("div", { class: "bomx-drawer-toggle-sub" }, "Available for scheduling and job cards")
                  ], -1)),
                  e("label", Ut, [
                    f(e("input", {
                      type: "checkbox",
                      "onUpdate:modelValue": t[11] || (t[11] = (o) => a.value.is_active = o),
                      "true-value": 1,
                      "false-value": 0
                    }, null, 512), [
                      [he, a.value.is_active]
                    ]),
                    t[38] || (t[38] = e("span", { class: "bomx-switch-track" }, [
                      e("span", { class: "bomx-switch-thumb" })
                    ], -1))
                  ])
                ])
              ], 64)) : (i(), l(k, { key: 1 }, [
                e("div", It, [
                  e("div", null, [
                    t[42] || (t[42] = e("div", { class: "bomx-hf-label" }, "Job Capacity", -1)),
                    f(e("input", {
                      class: "bomx-fi",
                      type: "number",
                      "onUpdate:modelValue": t[12] || (t[12] = (o) => a.value.capacity = o),
                      min: "1",
                      step: "any",
                      style: { width: "100%" }
                    }, null, 512), [
                      [
                        g,
                        a.value.capacity,
                        void 0,
                        { number: !0 }
                      ]
                    ]),
                    t[43] || (t[43] = e("div", { class: "bomx-field-hint" }, "Run parallel job cards.", -1))
                  ]),
                  e("div", null, [
                    t[44] || (t[44] = e("div", { class: "bomx-hf-label" }, "Working Hours Per Day", -1)),
                    f(e("input", {
                      class: "bomx-fi",
                      type: "number",
                      "onUpdate:modelValue": t[13] || (t[13] = (o) => a.value.working_hours_per_day = o),
                      min: "0",
                      max: "24",
                      step: "any",
                      style: { width: "100%" }
                    }, null, 512), [
                      [
                        g,
                        a.value.working_hours_per_day,
                        void 0,
                        { number: !0 }
                      ]
                    ]),
                    t[45] || (t[45] = e("div", { class: "bomx-field-hint" }, "Availability for production planning.", -1))
                  ])
                ]),
                e("div", Et, [
                  t[47] || (t[47] = e("div", { class: "bomx-hf-label" }, [
                    b("Hourly Operating Cost "),
                    e("span", { style: { color: "var(--bx-red)" } }, "*")
                  ], -1)),
                  e("div", Rt, [
                    t[46] || (t[46] = e("span", { style: { position: "absolute", left: "9px", top: "8px", color: "var(--bx-muted)", "font-weight": "600", "font-size": "12px" } }, "KES", -1)),
                    f(e("input", {
                      class: "bomx-fi",
                      type: "number",
                      "onUpdate:modelValue": t[14] || (t[14] = (o) => a.value.hour_rate = o),
                      min: "0",
                      step: "any",
                      style: { width: "100%", "padding-left": "40px" }
                    }, null, 512), [
                      [
                        g,
                        a.value.hour_rate,
                        void 0,
                        { number: !0 }
                      ]
                    ])
                  ]),
                  t[48] || (t[48] = e("div", { class: "bomx-field-hint" }, "Used for calculating manufacturing costs.", -1))
                ])
              ], 64)),
              !v.value && a.value.owner ? (i(), l("div", Jt, [
                b(" Created by " + n(B(ee)(a.value.owner)) + " on " + n(B(te)(a.value.creation)) + " ", 1),
                a.value.modified_by ? (i(), l(k, { key: 0 }, [
                  b(" · Last modified by " + n(B(ee)(a.value.modified_by)) + " on " + n(B(te)(a.value.modified)), 1)
                ], 64)) : C("", !0)
              ])) : C("", !0)
            ]),
            e("div", Ft, [
              v.value ? C("", !0) : (i(), l("button", {
                key: 0,
                class: "bomx-btn bomx-btn-ghost",
                disabled: !s.$canDelete("inventory"),
                title: s.$canDelete("inventory") ? "" : "Not permitted",
                onClick: ie
              }, "Delete Workstation", 8, qt)),
              t[49] || (t[49] = e("div", { style: { flex: "1" } }, null, -1)),
              e("button", {
                class: "bomx-btn bomx-btn-outline",
                onClick: L
              }, "Cancel"),
              e("button", {
                class: "bomx-btn bomx-btn-mfg",
                onClick: de,
                disabled: A.value || O.value || !(v.value ? s.$canCreate("inventory") : s.$canEdit("inventory"))
              }, [
                e("span", {
                  innerHTML: u("save", 13)
                }, null, 8, Kt),
                b(" " + n(A.value ? "Saving…" : v.value ? "Save Workstation" : "Save Changes"), 1)
              ], 8, zt)
            ])
          ], 64))
        ])
      ])) : C("", !0)
    ]));
  }
}, es = /* @__PURE__ */ be(Gt, [["__scopeId", "data-v-76720771"]]);
export {
  es as default
};
