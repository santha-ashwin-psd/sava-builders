import { x as ue, o as ve, k as r, C as pe, a as e, t as l, c as v, b as z, u as i, i as u, d as c, n as w, D as ke, w as E, A as K, v as be, r as P, F as $, q as W, H as xe, z as ie, f as Z, h as m, _ as Se, a4 as oe, g as C, a7 as De, a2 as de, a3 as Ae, K as Pe } from "./main-BmX9V7v7.js";
import { u as Ee } from "./usePagination-Du8yxLff.js";
import { b as ce, a as X } from "./format-BcJZDVG4.js";
import { P as ze } from "./Pagination-BuT6Z7b9.js";
import { _ as Fe } from "./SearchableSelect-Cc8f6Ofm.js";
import { o as re } from "./userNames-C5VShm5M.js";
const Ve = { class: "inv-drawer-panel is-add" }, qe = { class: "inv-dh" }, Ue = { style: { display: "flex", "align-items": "center", gap: "10px", "flex-wrap": "wrap" } }, Ne = { class: "inv-dh-title" }, Be = {
  key: 0,
  class: "add-status-badge"
}, je = ["innerHTML"], Re = { class: "inv-dbody" }, Oe = { class: "add-card" }, Ie = { class: "add-card-title" }, Ke = { class: "add-card-title-icon" }, We = ["innerHTML"], Ge = ["innerHTML"], Je = { class: "inv-fg inv-fg2" }, Qe = ["value"], Xe = { class: "add-card" }, Ye = { class: "add-card-title" }, Ze = { class: "add-card-title-icon" }, es = ["innerHTML"], ss = ["innerHTML"], ts = { class: "inv-fg" }, ns = { style: { "grid-column": "1 / -1" } }, as = {
  key: 0,
  class: "inv-view-footer"
}, ls = { class: "inv-dfooter" }, is = ["disabled"], os = ["innerHTML"], ds = {
  __name: "MaintenanceLogForm",
  props: {
    isEdit: Boolean,
    log: Object
  },
  emits: ["close", "save"],
  setup(H, { emit: g }) {
    const x = H, f = g, { toast: M } = ue(), h = ["Completed", "Pending", "Cancelled"], k = m([]), y = m(!1), _ = ie({ details: !1, work: !1 }), o = ie({
      name: "",
      asset: "",
      maintenance_date: "",
      technician: "",
      cost: "",
      status: "Pending",
      work_done: ""
    });
    x.isEdit && x.log && (Object.assign(o, x.log), o.status || (o.status = "Pending"));
    async function S() {
      try {
        const d = await Z("Asset", {
          fields: ["name", "asset_name"],
          filters: [["docstatus", "<", 2]],
          limit: 500
        });
        k.value = (d || []).map((a) => ({
          value: a.name,
          label: a.asset_name ? `${a.asset_name} (${a.name})` : a.name
        }));
      } catch {
        k.value = [];
      }
    }
    ve(S);
    function D() {
      f("close");
    }
    function G() {
      const d = [];
      if (o.asset || d.push("Asset"), o.maintenance_date || d.push("Maintenance Date"), o.technician || d.push("Technician"), o.cost === "" && d.push("Cost"), o.status || d.push("Status"), d.length) {
        M.error(`Required: ${d.join(", ")}`);
        return;
      }
      y.value = !0;
      try {
        const a = { ...o };
        x.isEdit || delete a.name, f("save", a);
      } finally {
        y.value = !1;
      }
    }
    return (d, a) => (r(), pe(xe, { to: "body" }, [
      e("div", {
        class: "inv-drawer-bg",
        onClick: W(D, ["self"])
      }, [
        e("div", Ve, [
          e("div", qe, [
            e("div", Ue, [
              e("div", Ne, l(H.isEdit ? "Edit Maintenance Log" : "New Maintenance Log"), 1),
              H.isEdit ? z("", !0) : (r(), v("span", Be, "Draft"))
            ]),
            e("button", {
              class: "inv-dclose",
              onClick: D,
              title: "Close"
            }, [
              e("span", {
                innerHTML: i(u)("x", 16)
              }, null, 8, je)
            ])
          ]),
          e("div", Re, [
            e("div", Oe, [
              e("div", {
                class: "add-card-header",
                onClick: a[0] || (a[0] = (p) => _.details = !_.details)
              }, [
                e("div", Ie, [
                  e("span", Ke, [
                    e("span", {
                      innerHTML: i(u)("gear", 16)
                    }, null, 8, We)
                  ]),
                  a[8] || (a[8] = c(" Maintenance Details ", -1))
                ]),
                e("span", {
                  class: w(["add-card-chevron", { collapsed: _.details }])
                }, [
                  e("span", {
                    innerHTML: i(u)("chevD", 14)
                  }, null, 8, Ge)
                ], 2)
              ]),
              e("div", {
                class: w(["add-card-body", { collapsed: _.details }])
              }, [
                e("div", Je, [
                  e("div", null, [
                    a[9] || (a[9] = e("label", { class: "inv-lbl" }, [
                      c("Asset "),
                      e("span", { class: "inv-req" }, "*")
                    ], -1)),
                    ke(Fe, {
                      modelValue: o.asset,
                      "onUpdate:modelValue": a[1] || (a[1] = (p) => o.asset = p),
                      options: k.value,
                      placeholder: "Select asset",
                      createable: "",
                      "create-doctype": "Asset"
                    }, null, 8, ["modelValue", "options"])
                  ]),
                  e("div", null, [
                    a[10] || (a[10] = e("label", { class: "inv-lbl" }, [
                      c("Maintenance Date "),
                      e("span", { class: "inv-req" }, "*")
                    ], -1)),
                    E(e("input", {
                      type: "date",
                      "onUpdate:modelValue": a[2] || (a[2] = (p) => o.maintenance_date = p),
                      class: "inv-fi",
                      required: ""
                    }, null, 512), [
                      [K, o.maintenance_date]
                    ])
                  ]),
                  e("div", null, [
                    a[11] || (a[11] = e("label", { class: "inv-lbl" }, [
                      c("Technician "),
                      e("span", { class: "inv-req" }, "*")
                    ], -1)),
                    E(e("input", {
                      type: "text",
                      "onUpdate:modelValue": a[3] || (a[3] = (p) => o.technician = p),
                      class: "inv-fi",
                      required: "",
                      placeholder: "Technician name"
                    }, null, 512), [
                      [K, o.technician]
                    ])
                  ]),
                  e("div", null, [
                    a[12] || (a[12] = e("label", { class: "inv-lbl" }, [
                      c("Cost "),
                      e("span", { class: "inv-req" }, "*")
                    ], -1)),
                    E(e("input", {
                      type: "number",
                      step: "0.01",
                      "onUpdate:modelValue": a[4] || (a[4] = (p) => o.cost = p),
                      class: "inv-fi",
                      required: "",
                      placeholder: "0.00"
                    }, null, 512), [
                      [K, o.cost]
                    ])
                  ]),
                  e("div", null, [
                    a[13] || (a[13] = e("label", { class: "inv-lbl" }, [
                      c("Status "),
                      e("span", { class: "inv-req" }, "*")
                    ], -1)),
                    E(e("select", {
                      "onUpdate:modelValue": a[5] || (a[5] = (p) => o.status = p),
                      class: "inv-fi",
                      required: ""
                    }, [
                      (r(), v($, null, P(h, (p) => e("option", {
                        key: p,
                        value: p
                      }, l(p), 9, Qe)), 64))
                    ], 512), [
                      [be, o.status]
                    ])
                  ])
                ])
              ], 2)
            ]),
            e("div", Xe, [
              e("div", {
                class: "add-card-header",
                onClick: a[6] || (a[6] = (p) => _.work = !_.work)
              }, [
                e("div", Ye, [
                  e("span", Ze, [
                    e("span", {
                      innerHTML: i(u)("edit", 16)
                    }, null, 8, es)
                  ]),
                  a[14] || (a[14] = c(" Work Done ", -1))
                ]),
                e("span", {
                  class: w(["add-card-chevron", { collapsed: _.work }])
                }, [
                  e("span", {
                    innerHTML: i(u)("chevD", 14)
                  }, null, 8, ss)
                ], 2)
              ]),
              e("div", {
                class: w(["add-card-body", { collapsed: _.work }])
              }, [
                e("div", ts, [
                  e("div", ns, [
                    a[15] || (a[15] = e("label", { class: "inv-lbl" }, "Description", -1)),
                    E(e("textarea", {
                      "onUpdate:modelValue": a[7] || (a[7] = (p) => o.work_done = p),
                      rows: "4",
                      class: "inv-fi",
                      placeholder: "Describe the work performed..."
                    }, null, 512), [
                      [K, o.work_done]
                    ])
                  ])
                ])
              ], 2)
            ]),
            H.isEdit && o.owner ? (r(), v("div", as, [
              c(" Created by " + l(i(re)(o.owner)) + " on " + l(i(ce)(o.creation)) + " ", 1),
              o.modified_by ? (r(), v($, { key: 0 }, [
                c(" · Last modified by " + l(i(re)(o.modified_by)) + " on " + l(i(ce)(o.modified)), 1)
              ], 64)) : z("", !0)
            ])) : z("", !0)
          ]),
          e("div", ls, [
            e("button", {
              type: "button",
              class: "nim-btn",
              style: { border: "1px solid #e5e7eb" },
              onClick: D
            }, "Cancel"),
            e("button", {
              type: "button",
              class: "nim-btn nim-btn-primary",
              disabled: y.value || !(H.isEdit ? d.$canEdit("inventory") : d.$canCreate("inventory")),
              onClick: G
            }, [
              e("span", {
                innerHTML: i(u)("save", 13)
              }, null, 8, os),
              c(" " + l(y.value ? "Saving…" : H.isEdit ? "Update Log" : "Save Log"), 1)
            ], 8, is)
          ])
        ])
      ])
    ]));
  }
}, cs = { class: "list-page" }, rs = { class: "sales-toolbar" }, us = { class: "sales-search" }, vs = ["innerHTML"], ps = { class: "sales-pills" }, ks = { class: "sales-pill-count" }, bs = ["onClick"], ms = { class: "sales-pill-count" }, fs = { class: "sales-actions" }, _s = ["value"], gs = ["disabled"], ys = ["innerHTML"], hs = ["disabled"], Ls = ["innerHTML"], Cs = ["disabled", "title"], ws = ["innerHTML"], Ms = { class: "bk-kpi-grid bk-kpi-grid-4" }, Ts = { class: "bk-kpi-inner" }, $s = {
  class: "bk-kpi-icon",
  style: { background: "#dbeafe" }
}, Hs = ["innerHTML"], xs = { class: "bk-kpi-body" }, Ss = { class: "bk-kpi-value" }, Ds = { class: "bk-kpi-inner" }, As = {
  class: "bk-kpi-icon",
  style: { background: "#dcfce7" }
}, Ps = ["innerHTML"], Es = { class: "bk-kpi-body" }, zs = { class: "bk-kpi-value bk-kpi-green" }, Fs = { class: "bk-kpi-inner" }, Vs = {
  class: "bk-kpi-icon",
  style: { background: "#fef3c7" }
}, qs = ["innerHTML"], Us = { class: "bk-kpi-body" }, Ns = { class: "bk-kpi-value bk-kpi-amber" }, Bs = { class: "bk-kpi-inner" }, js = {
  class: "bk-kpi-icon",
  style: { background: "#dcfce7" }
}, Rs = ["innerHTML"], Os = { class: "bk-kpi-body" }, Is = {
  class: "bk-kpi-value bk-kpi-green",
  style: { "font-size": "20px" }
}, Ks = { class: "bk-stat-grid" }, Ws = { class: "bk-stat-card" }, Gs = { class: "bk-stat-content" }, Js = { class: "bk-stat-value" }, Qs = {
  class: "bk-stat-icon",
  style: { background: "#dbeafe", color: "#2563eb" }
}, Xs = ["innerHTML"], Ys = { class: "bk-stat-card" }, Zs = { class: "bk-stat-content" }, et = {
  class: "bk-stat-value bk-kpi-green",
  style: { "font-size": "16px" }
}, st = {
  class: "bk-stat-icon",
  style: { background: "#dcfce7", color: "#16a34a" }
}, tt = ["innerHTML"], nt = { class: "bk-stat-card" }, at = { class: "bk-stat-content" }, lt = { class: "bk-stat-value" }, it = {
  class: "bk-stat-icon",
  style: { background: "#fee2e2", color: "#dc2626" }
}, ot = ["innerHTML"], dt = { class: "bk-stat-card" }, ct = { class: "bk-stat-content" }, rt = { class: "bk-stat-value bk-kpi-blue" }, ut = {
  class: "bk-stat-icon",
  style: { background: "#fef3c7", color: "#92400e" }
}, vt = ["innerHTML"], pt = {
  key: 0,
  class: "inv-bulk-bar",
  style: { margin: "0" }
}, kt = { class: "inv-bulk-count" }, bt = ["disabled"], mt = ["innerHTML"], ft = ["disabled"], _t = ["innerHTML"], gt = ["disabled", "title"], yt = ["innerHTML"], ht = { class: "inv-table-wrap" }, Lt = { class: "inv-table ml-desktop-tbl" }, Ct = { class: "th-check" }, wt = ["checked"], Mt = ["innerHTML"], Tt = ["innerHTML"], $t = ["innerHTML"], Ht = ["innerHTML"], xt = ["innerHTML"], St = ["innerHTML"], Dt = { key: 1 }, At = {
  colspan: "8",
  class: "bk-empty-state"
}, Pt = { class: "bk-empty-inner" }, Et = { class: "bk-empty-title" }, zt = {
  key: 0,
  class: "bk-empty-sub"
}, Ft = {
  key: 1,
  class: "bk-empty-sub"
}, Vt = ["disabled", "title"], qt = ["innerHTML"], Ut = ["checked", "onChange"], Nt = ["onClick"], Bt = { class: "inv-link" }, jt = ["onClick"], Rt = {
  key: 0,
  class: "it-group-badge"
}, Ot = {
  key: 1,
  class: "text-muted"
}, It = ["onClick"], Kt = ["onClick"], Wt = ["onClick"], Gt = ["onClick"], Jt = ["onClick", "disabled"], Qt = ["innerHTML"], Xt = ["onClick", "disabled"], Yt = ["innerHTML"], Zt = { class: "ml-mobile-cards" }, en = {
  key: 1,
  class: "ml-mobile-empty"
}, sn = {
  width: "36",
  height: "36",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#d1d5db",
  "stroke-width": "1.5",
  style: { margin: "0 auto 10px", display: "block" }
}, tn = ["onClick"], nn = { class: "ii-mob-card-main" }, an = { class: "ii-mob-card-top" }, ln = {
  class: "fw-700",
  style: { "font-size": "14px", color: "#111827", "line-height": "1.3" }
}, on = { class: "ii-mob-card-meta" }, dn = {
  class: "text-muted",
  style: { "font-size": "11.5px" }
}, cn = { class: "ii-mob-card-right" }, rn = {
  class: "fw-700",
  style: { "font-size": "14px", color: "#16a34a" }
}, un = {
  class: "text-muted",
  style: { "font-size": "11px" }
}, vn = { class: "ii-mob-card-actions" }, pn = ["onClick", "innerHTML"], kn = ["onClick", "innerHTML"], bn = {
  key: 1,
  class: "list-pagination",
  style: { display: "flex", "align-items": "center", "justify-content": "space-between", gap: "12px", "flex-wrap": "wrap" }
}, mn = { class: "dp-footer-info" }, fn = {
  __name: "MaintenanceLog",
  setup(H) {
    const { toast: g } = ue(), { confirm: x } = Ae(), f = m([]), M = m(!1), h = m(""), k = m("all"), y = m(""), _ = m([]), o = m(!1), S = m(!1), D = m(null), G = ["Completed", "Pending", "Cancelled"], d = m(/* @__PURE__ */ new Set()), a = m(!1), p = C(() => {
      const n = f.value.map((s) => s.asset).filter(Boolean);
      return [...new Set(n)].sort();
    }), B = C(() => {
      const n = {};
      for (const s of G) n[s] = 0;
      for (const s of f.value)
        n[s.status] !== void 0 && n[s.status]++;
      return n;
    }), J = C(() => {
      let n = f.value;
      if (k.value !== "all" && (n = n.filter((s) => s.status === k.value)), y.value && (n = n.filter((s) => s.asset === y.value)), h.value) {
        const s = h.value.toLowerCase();
        n = n.filter(
          (t) => (t.name || "").toLowerCase().includes(s) || (t.asset || "").toLowerCase().includes(s) || (t.technician || "").toLowerCase().includes(s) || (t.work_done || "").toLowerCase().includes(s)
        );
      }
      return n;
    }), j = m(""), Q = m(1);
    function F(n) {
      j.value === n ? Q.value *= -1 : (j.value = n, Q.value = 1);
    }
    const V = C(() => {
      if (!j.value) return J.value;
      const n = j.value, s = Q.value;
      return [...J.value].sort((t, b) => {
        const N = t[n] ?? "", A = b[n] ?? "";
        return typeof N == "number" || typeof A == "number" ? ((parseFloat(N) || 0) - (parseFloat(A) || 0)) * s : String(N).localeCompare(String(A), void 0, { numeric: !0 }) * s;
      });
    }), { page: R, pageSize: O, paged: me, totalItems: ee } = Ee(V, { defaultPageSize: 25, storageKey: "maint-logs" }), I = me, fe = C(() => ee.value === 0 ? 0 : (R.value - 1) * O.value + 1), _e = C(() => Math.min(ee.value, R.value * O.value)), ge = C(() => f.value.reduce((n, s) => n + (parseFloat(s.cost) || 0), 0)), ye = C(() => {
      const n = f.value.filter((s) => parseFloat(s.cost) > 0);
      return n.length ? n.reduce((s, t) => s + parseFloat(t.cost), 0) / n.length : 0;
    }), se = C(() => d.value.size === I.value.length && I.value.length > 0);
    function he() {
      if (se.value)
        d.value.clear();
      else
        for (const n of I.value)
          d.value.add(n.name);
    }
    function Le(n) {
      d.value.has(n) ? d.value.delete(n) : d.value.add(n);
    }
    function Y() {
      d.value = /* @__PURE__ */ new Set();
    }
    function q(n) {
      return j.value !== n ? "" : Q.value === 1 ? "&#9650;" : "&#9660;";
    }
    function te(n) {
      return {
        Completed: "status-active",
        Pending: "status-partial",
        Cancelled: "status-cancelled"
      }[n] || "status-partial";
    }
    async function ne(n) {
      if (d.value.size) {
        a.value = !0;
        try {
          const s = [...d.value];
          await Promise.all(s.map(
            (t) => De("frappe.client.set_value", { doctype: "Maintenance Log", name: t, field: "status", value: n })
          )), g.success(`${s.length} log${s.length > 1 ? "s" : ""} marked ${n}`), Y(), await U();
        } catch (s) {
          g.error("Failed to update logs: " + s.message);
        } finally {
          a.value = !1;
        }
      }
    }
    async function Ce() {
      if (!d.value.size) return;
      const n = [...d.value];
      if (await x({
        title: "Delete Maintenance Logs",
        body: `Are you sure you want to delete ${n.length} selected log${n.length > 1 ? "s" : ""}?`,
        okLabel: "Delete",
        okStyle: "danger"
      })) {
        a.value = !0;
        try {
          await Promise.all(n.map((t) => de("Maintenance Log", t))), g.success("Selected logs deleted"), Y(), await U();
        } catch (t) {
          g.error("Failed to delete logs: " + t.message);
        } finally {
          a.value = !1;
        }
      }
    }
    function we() {
      const n = ["Log", "Asset", "Date", "Technician", "Cost", "Status"], s = J.value.map((T) => [T.name, T.asset || "", T.maintenance_date || "", T.technician || "", T.cost || 0, T.status || "Pending"]), t = [n, ...s].map((T) => T.map((He) => `"${String(He ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), b = new Blob([t], { type: "text/csv;charset=utf-8;" }), N = URL.createObjectURL(b), A = document.createElement("a");
      A.href = N, A.download = "maintenance-logs.csv", A.click(), URL.revokeObjectURL(N);
    }
    async function U() {
      M.value = !0;
      try {
        const [n, s] = await Promise.all([
          Z("Maintenance Log", {
            fields: ["name", "asset", "maintenance_date", "technician", "cost", "work_done", "status", "owner", "creation", "modified_by", "modified"],
            order: "modified desc",
            limit: 500
          }),
          Z("Asset", {
            fields: ["name", "asset_name"],
            limit: 500
          })
        ]);
        f.value = n || [], _.value = s || [];
      } catch (n) {
        g.error("Failed to load logs: " + n.message), f.value = [], _.value = [];
      } finally {
        M.value = !1;
      }
    }
    function ae() {
      S.value = !1, D.value = null, o.value = !0;
    }
    function L(n) {
      S.value = !0, D.value = n, o.value = !0;
    }
    function Me() {
      o.value = !1;
    }
    async function Te(n) {
      try {
        const s = {
          doctype: "Maintenance Log",
          ...n
        };
        (!S.value || !s.name) && delete s.name, await Pe(s), g.success(S.value ? "Log updated" : "Log created"), o.value = !1, await U();
      } catch (s) {
        g.error("Failed to save log: " + s.message);
      }
    }
    async function le(n) {
      await x({
        title: "Delete Maintenance Log",
        body: `Are you sure you want to delete maintenance log ${n.name}?`,
        okLabel: "Delete",
        okStyle: "danger"
      }) && await $e(n.name);
    }
    async function $e(n) {
      try {
        await de("Maintenance Log", n), g.success("Log deleted"), await U();
      } catch (s) {
        g.error("Failed to delete log: " + s.message);
      }
    }
    return ve(U), (n, s) => (r(), v("div", cs, [
      e("div", rs, [
        e("div", us, [
          e("span", {
            innerHTML: i(u)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, vs),
          E(e("input", {
            "onUpdate:modelValue": s[0] || (s[0] = (t) => h.value = t),
            placeholder: "Search maintenance logs...",
            class: "sales-search-input",
            autocomplete: "off"
          }, null, 512), [
            [K, h.value]
          ])
        ]),
        e("div", ps, [
          e("button", {
            class: w(["sales-pill", { active: k.value === "all" }]),
            onClick: s[1] || (s[1] = (t) => k.value = "all")
          }, [
            s[19] || (s[19] = c(" All ", -1)),
            e("span", ks, l(f.value.length), 1)
          ], 2),
          (r(), v($, null, P(G, (t) => e("button", {
            key: t,
            class: w(["sales-pill", { active: k.value === t, ["pill-" + t]: !0 }]),
            onClick: (b) => k.value = t
          }, [
            c(l(t) + " ", 1),
            e("span", ms, l(B.value[t] || 0), 1)
          ], 10, bs)), 64))
        ]),
        e("div", fs, [
          E(e("select", {
            class: "sales-select",
            "onUpdate:modelValue": s[2] || (s[2] = (t) => y.value = t),
            title: "Filter by asset"
          }, [
            s[20] || (s[20] = e("option", { value: "" }, "All Assets", -1)),
            (r(!0), v($, null, P(_.value, (t) => (r(), v("option", {
              key: t.name,
              value: t.name
            }, l(t.asset_name || t.name), 9, _s))), 128))
          ], 512), [
            [be, y.value]
          ]),
          e("button", {
            class: "sales-btn-ghost",
            title: "Refresh",
            onClick: U,
            disabled: M.value
          }, [
            e("span", {
              innerHTML: i(u)("refresh", 14)
            }, null, 8, ys)
          ], 8, gs),
          e("button", {
            class: "sales-btn-ghost",
            onClick: we,
            disabled: !J.value.length
          }, [
            e("span", {
              innerHTML: i(u)("download", 14)
            }, null, 8, Ls),
            s[21] || (s[21] = c()),
            s[22] || (s[22] = e("span", { class: "btn-label" }, "CSV", -1))
          ], 8, hs),
          e("button", {
            class: "sales-btn-primary",
            disabled: !n.$canCreate("inventory"),
            title: n.$canCreate("inventory") ? "" : "Read-only access",
            onClick: ae
          }, [
            e("span", {
              innerHTML: i(u)("plus", 13)
            }, null, 8, ws),
            s[23] || (s[23] = c(" New Log ", -1))
          ], 8, Cs)
        ])
      ]),
      e("div", Ms, [
        e("div", {
          class: "bk-kpi-card bk-kpi-accent clickable",
          onClick: s[3] || (s[3] = (t) => k.value = "all")
        }, [
          e("div", Ts, [
            e("div", $s, [
              e("span", {
                innerHTML: i(u)("file", 22)
              }, null, 8, Hs)
            ]),
            e("div", xs, [
              s[24] || (s[24] = e("div", { class: "bk-kpi-label" }, "Total Logs", -1)),
              e("div", Ss, l(f.value.length), 1),
              s[25] || (s[25] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "maintenance records", -1))
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card bk-kpi-success clickable",
          onClick: s[4] || (s[4] = (t) => k.value = "Completed")
        }, [
          e("div", Ds, [
            e("div", As, [
              e("span", {
                innerHTML: i(u)("check", 22)
              }, null, 8, Ps)
            ]),
            e("div", Es, [
              s[26] || (s[26] = e("div", { class: "bk-kpi-label" }, "Completed", -1)),
              e("div", zs, l(B.value.Completed || 0), 1),
              s[27] || (s[27] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "closed work orders", -1))
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card bk-kpi-warn clickable",
          onClick: s[5] || (s[5] = (t) => k.value = "Pending")
        }, [
          e("div", Fs, [
            e("div", Vs, [
              e("span", {
                innerHTML: i(u)("calendar", 22)
              }, null, 8, qs)
            ]),
            e("div", Us, [
              s[28] || (s[28] = e("div", { class: "bk-kpi-label" }, "Pending", -1)),
              e("div", Ns, l(B.value.Pending || 0), 1),
              s[29] || (s[29] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "awaiting service", -1))
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card clickable",
          onClick: s[6] || (s[6] = (t) => k.value = "all")
        }, [
          e("div", Bs, [
            e("div", js, [
              e("span", {
                innerHTML: i(u)("rupee", 22)
              }, null, 8, Rs)
            ]),
            e("div", Os, [
              s[30] || (s[30] = e("div", { class: "bk-kpi-label" }, "Total Cost", -1)),
              e("div", Is, l(i(X)(ge.value)), 1),
              s[31] || (s[31] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "across all logs", -1))
            ])
          ])
        ])
      ]),
      e("div", Ks, [
        e("div", Ws, [
          e("div", Gs, [
            e("div", null, [
              s[32] || (s[32] = e("div", { class: "bk-stat-label" }, "Assets Serviced", -1)),
              e("div", Js, l(p.value.length), 1)
            ]),
            e("div", Qs, [
              e("span", {
                innerHTML: i(u)("box", 18)
              }, null, 8, Xs)
            ])
          ])
        ]),
        e("div", Ys, [
          e("div", Zs, [
            e("div", null, [
              s[33] || (s[33] = e("div", { class: "bk-stat-label" }, "Avg. Cost", -1)),
              e("div", et, l(i(X)(ye.value)), 1)
            ]),
            e("div", st, [
              e("span", {
                innerHTML: i(u)("rupee", 18)
              }, null, 8, tt)
            ])
          ])
        ]),
        e("div", nt, [
          e("div", at, [
            e("div", null, [
              s[34] || (s[34] = e("div", { class: "bk-stat-label" }, "Cancelled", -1)),
              e("div", lt, l(B.value.Cancelled || 0), 1)
            ]),
            e("div", it, [
              e("span", {
                innerHTML: i(u)("x", 18)
              }, null, 8, ot)
            ])
          ])
        ]),
        e("div", dt, [
          e("div", ct, [
            e("div", null, [
              s[35] || (s[35] = e("div", { class: "bk-stat-label" }, "Open Items", -1)),
              e("div", rt, l(B.value.Pending || 0), 1)
            ]),
            e("div", ut, [
              e("span", {
                innerHTML: i(u)("alert", 18)
              }, null, 8, vt)
            ])
          ])
        ])
      ]),
      d.value.size ? (r(), v("div", pt, [
        e("span", kt, [
          e("strong", null, l(d.value.size), 1),
          c(" log" + l(d.value.size > 1 ? "s" : "") + " selected", 1)
        ]),
        e("button", {
          class: "inv-bulk-btn",
          onClick: s[7] || (s[7] = (t) => ne("Completed")),
          disabled: a.value || !n.$canEdit("inventory")
        }, [
          e("span", {
            innerHTML: i(u)("check", 13)
          }, null, 8, mt),
          s[36] || (s[36] = c(" Mark Completed", -1))
        ], 8, bt),
        e("button", {
          class: "inv-bulk-btn",
          onClick: s[8] || (s[8] = (t) => ne("Pending")),
          disabled: a.value || !n.$canEdit("inventory")
        }, [
          e("span", {
            innerHTML: i(u)("calendar", 13)
          }, null, 8, _t),
          s[37] || (s[37] = c(" Mark Pending", -1))
        ], 8, ft),
        e("button", {
          class: "inv-bulk-btn inv-bulk-danger",
          onClick: Ce,
          disabled: a.value || !n.$canDelete("inventory"),
          title: n.$canDelete("inventory") ? "" : "Not permitted"
        }, [
          e("span", {
            innerHTML: i(u)("trash", 13)
          }, null, 8, yt),
          s[38] || (s[38] = c(" Delete", -1))
        ], 8, gt),
        e("button", {
          class: "inv-bulk-clear",
          onClick: Y
        }, "✕ Clear")
      ])) : z("", !0),
      e("div", ht, [
        e("table", Lt, [
          e("thead", null, [
            e("tr", null, [
              e("th", Ct, [
                e("input", {
                  type: "checkbox",
                  class: "ml-checkbox",
                  checked: se.value,
                  onChange: he
                }, null, 40, wt)
              ]),
              e("th", {
                class: "sortable",
                onClick: s[9] || (s[9] = (t) => F("name"))
              }, [
                s[39] || (s[39] = e("span", { class: "dp-th-content" }, "Log", -1)),
                e("span", {
                  class: "sort-arrow",
                  innerHTML: q("name")
                }, null, 8, Mt)
              ]),
              e("th", {
                class: "sortable",
                onClick: s[10] || (s[10] = (t) => F("asset"))
              }, [
                s[40] || (s[40] = c("Asset ", -1)),
                e("span", {
                  class: "sort-arrow",
                  innerHTML: q("asset")
                }, null, 8, Tt)
              ]),
              e("th", {
                class: "sortable",
                onClick: s[11] || (s[11] = (t) => F("maintenance_date"))
              }, [
                s[41] || (s[41] = c("Date ", -1)),
                e("span", {
                  class: "sort-arrow",
                  innerHTML: q("maintenance_date")
                }, null, 8, $t)
              ]),
              e("th", {
                class: "sortable",
                onClick: s[12] || (s[12] = (t) => F("technician"))
              }, [
                s[42] || (s[42] = c("Technician ", -1)),
                e("span", {
                  class: "sort-arrow",
                  innerHTML: q("technician")
                }, null, 8, Ht)
              ]),
              e("th", {
                class: "ta-r sortable",
                onClick: s[13] || (s[13] = (t) => F("cost"))
              }, [
                s[43] || (s[43] = c("Cost ", -1)),
                e("span", {
                  class: "sort-arrow",
                  innerHTML: q("cost")
                }, null, 8, xt)
              ]),
              e("th", {
                class: "sortable",
                onClick: s[14] || (s[14] = (t) => F("status"))
              }, [
                s[44] || (s[44] = c("Status ", -1)),
                e("span", {
                  class: "sort-arrow",
                  innerHTML: q("status")
                }, null, 8, St)
              ]),
              s[45] || (s[45] = e("th", { style: { width: "110px", "text-align": "center" } }, "Actions", -1))
            ])
          ]),
          e("tbody", null, [
            M.value ? (r(), v($, { key: 0 }, P(5, (t) => e("tr", {
              key: t,
              class: "shimmer-row"
            }, [...s[46] || (s[46] = [
              e("td", { colspan: "8" }, [
                e("div", {
                  class: "shimmer",
                  style: { width: "70%" }
                })
              ], -1)
            ])])), 64)) : V.value.length ? (r(!0), v($, { key: 2 }, P(i(I), (t) => (r(), v("tr", {
              key: t.name,
              class: w(["inv-row", { selected: d.value.has(t.name) }])
            }, [
              e("td", {
                class: "td-check",
                onClick: s[15] || (s[15] = W(() => {
                }, ["stop"]))
              }, [
                e("input", {
                  type: "checkbox",
                  class: "ml-checkbox",
                  checked: d.value.has(t.name),
                  onChange: (b) => Le(t.name)
                }, null, 40, Ut)
              ]),
              e("td", {
                onClick: (b) => L(t),
                "data-label": "Log"
              }, [
                e("span", Bt, l(t.name), 1)
              ], 8, Nt),
              e("td", {
                onClick: (b) => L(t),
                "data-label": "Asset"
              }, [
                t.asset ? (r(), v("span", Rt, l(t.asset), 1)) : (r(), v("span", Ot, "—"))
              ], 8, jt),
              e("td", {
                onClick: (b) => L(t),
                class: "mono-sm text-muted",
                "data-label": "Date"
              }, l(t.maintenance_date || "—"), 9, It),
              e("td", {
                onClick: (b) => L(t),
                class: "text-muted",
                "data-label": "Technician"
              }, l(t.technician || "—"), 9, Kt),
              e("td", {
                onClick: (b) => L(t),
                class: "ta-r mono-sm fw-600",
                "data-label": "Cost"
              }, l(i(X)(t.cost || 0)), 9, Wt),
              e("td", {
                onClick: (b) => L(t),
                "data-label": "Status"
              }, [
                e("span", {
                  class: w(["inv-status-badge", te(t.status)])
                }, l(t.status || "Pending"), 3)
              ], 8, Gt),
              e("td", {
                style: { "text-align": "center", "white-space": "nowrap" },
                onClick: s[16] || (s[16] = W(() => {
                }, ["stop"]))
              }, [
                e("button", {
                  class: "inv-act-btn",
                  onClick: (b) => L(t),
                  disabled: !n.$canEdit("inventory"),
                  title: "Edit"
                }, [
                  e("span", {
                    innerHTML: i(u)("edit", 13)
                  }, null, 8, Qt)
                ], 8, Jt),
                e("button", {
                  class: "inv-act-btn",
                  style: { color: "#dc2626" },
                  onClick: (b) => le(t),
                  disabled: !n.$canDelete("inventory"),
                  title: "Delete"
                }, [
                  e("span", {
                    innerHTML: i(u)("trash", 13)
                  }, null, 8, Yt)
                ], 8, Xt)
              ])
            ], 2))), 128)) : (r(), v("tr", Dt, [
              e("td", At, [
                e("div", Pt, [
                  s[48] || (s[48] = e("svg", {
                    width: "44",
                    height: "44",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "#cbd5e1",
                    "stroke-width": "1.3"
                  }, [
                    e("circle", {
                      cx: "12",
                      cy: "12",
                      r: "10"
                    }),
                    e("line", {
                      x1: "12",
                      y1: "8",
                      x2: "12",
                      y2: "12"
                    }),
                    e("line", {
                      x1: "12",
                      y1: "16",
                      x2: "12.01",
                      y2: "16"
                    })
                  ], -1)),
                  e("p", Et, l(h.value || k.value !== "all" ? "No matching logs" : "No maintenance logs yet"), 1),
                  h.value || k.value !== "all" || y.value ? (r(), v("p", zt, "Try adjusting your search or filter")) : (r(), v("p", Ft, "Add your first maintenance log to get started.")),
                  !h.value && !y.value && k.value === "all" ? (r(), v("button", {
                    key: 2,
                    class: "bk-empty-btn",
                    disabled: !n.$canCreate("inventory"),
                    title: n.$canCreate("inventory") ? "" : "Read-only access",
                    onClick: ae
                  }, [
                    e("span", {
                      innerHTML: i(u)("plus", 13)
                    }, null, 8, qt),
                    s[47] || (s[47] = c(" New Log", -1))
                  ], 8, Vt)) : z("", !0)
                ])
              ])
            ]))
          ])
        ]),
        e("div", Zt, [
          M.value ? (r(), v($, { key: 0 }, P(4, (t) => e("div", {
            key: t,
            class: "b-shimmer",
            style: { height: "84px", "border-radius": "10px" }
          })), 64)) : V.value.length ? (r(!0), v($, { key: 2 }, P(i(I), (t) => (r(), v("div", {
            key: t.name,
            class: "ii-mob-card",
            onClick: (b) => L(t)
          }, [
            e("div", nn, [
              e("div", an, [
                e("span", ln, l(t.name), 1),
                e("span", {
                  class: w(["inv-status-badge", te(t.status)]),
                  style: { "flex-shrink": "0" }
                }, l(t.status || "Pending"), 3)
              ]),
              e("div", on, [
                e("span", dn, l(t.asset || "—") + " · " + l(t.maintenance_date || "—"), 1)
              ])
            ]),
            e("div", cn, [
              e("div", rn, l(i(X)(t.cost || 0)), 1),
              e("div", un, l(t.technician || "—"), 1)
            ]),
            e("div", vn, [
              e("button", {
                onClick: W((b) => L(t), ["stop"]),
                class: "ii-qa-btn ii-qa-edit",
                title: "Edit",
                innerHTML: i(u)("edit", 13)
              }, null, 8, pn),
              e("button", {
                onClick: W((b) => le(t), ["stop"]),
                class: "ii-qa-btn ii-qa-del",
                title: "Delete",
                innerHTML: i(u)("trash", 13)
              }, null, 8, kn)
            ])
          ], 8, tn))), 128)) : (r(), v("div", en, [
            (r(), v("svg", sn, [...s[49] || (s[49] = [
              e("circle", {
                cx: "12",
                cy: "12",
                r: "10"
              }, null, -1),
              e("line", {
                x1: "12",
                y1: "8",
                x2: "12",
                y2: "12"
              }, null, -1),
              e("line", {
                x1: "12",
                y1: "16",
                x2: "12.01",
                y2: "16"
              }, null, -1)
            ])])),
            e("div", null, l(h.value || k.value !== "all" ? "No matching logs" : "No maintenance logs yet"), 1)
          ]))
        ])
      ]),
      !M.value && V.value.length ? (r(), v("div", bn, [
        ke(ze, {
          page: i(R),
          "onUpdate:page": s[17] || (s[17] = (t) => oe(R) ? R.value = t : null),
          "page-size": i(O),
          "onUpdate:pageSize": s[18] || (s[18] = (t) => oe(O) ? O.value = t : null),
          "total-items": V.value.length
        }, null, 8, ["page", "page-size", "total-items"]),
        e("div", mn, [
          s[50] || (s[50] = c(" Showing ", -1)),
          e("strong", null, l(fe.value), 1),
          s[51] || (s[51] = c(" to ", -1)),
          e("strong", null, l(_e.value), 1),
          s[52] || (s[52] = c(" of ", -1)),
          e("strong", null, l(V.value.length), 1),
          s[53] || (s[53] = c(" logs ", -1))
        ])
      ])) : z("", !0),
      o.value ? (r(), pe(ds, {
        key: 2,
        "is-edit": S.value,
        log: D.value,
        onClose: Me,
        onSave: Te
      }, null, 8, ["is-edit", "log"])) : z("", !0)
    ]));
  }
}, wn = /* @__PURE__ */ Se(fn, [["__scopeId", "data-v-3dd21ce9"]]);
export {
  wn as default
};
