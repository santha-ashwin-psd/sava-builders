import { _ as re, y as ve, o as ue, c as d, a as e, u as v, i as y, w as U, B as V, F as A, r as S, d as u, t as a, b as g, D as Q, x as z, p as D, v as ye, n as T, J as W, f as fe, h as b, g as q, A as X, e as me, L as ee, a2 as pe, k as o } from "./main-Dnnn1I_7.js";
import { b as te } from "./format-BcJZDVG4.js";
import { o as ie } from "./userNames-_FtKz54C.js";
const R = ["Finishing", "Structure", "Services", "Site works"], be = /^[A-Z0-9][A-Z0-9-]*$/;
function Y(r) {
  return String(r || "").split(/\s+/).filter(Boolean).join(" ");
}
function _e(r = []) {
  let n = 0;
  for (const m of r) {
    const c = /^ACT-(\d+)$/.exec(String(m.name || m.activity_code || ""));
    c && (n = Math.max(n, parseInt(c[1], 10)));
  }
  return "ACT-" + String(n + 1).padStart(3, "0");
}
function Z(r, n) {
  return n === "active" ? !r.disabled : n === "inactive" ? !!r.disabled : !0;
}
function ge(r) {
  const n = { all: r.length, active: 0, inactive: 0 };
  for (const m of r)
    Z(m, "active") && n.active++, Z(m, "inactive") && n.inactive++;
  return n;
}
function he(r, n) {
  const m = String(n || "").trim().toLowerCase();
  return m ? [r.activity_name, r.name, r.category].some((c) => String(c || "").toLowerCase().includes(m)) : !0;
}
function se(r, n = {}) {
  return n && n[r.name] || "Not used";
}
function ke(r, n = [], m = "") {
  const c = {}, w = String(r.activity_code || "").trim().toUpperCase(), k = Y(r.activity_name);
  if (m || (w ? be.test(w) ? n.some((_) => String(_.name || "").toUpperCase() === w) && (c.activity_code = "Code " + w + " already exists") : c.activity_code = "Invalid code. Use letters, digits and dashes, e.g. ACT-004" : c.activity_code = "Code is required"), !k) c.activity_name = "Activity name is required";
  else {
    const _ = n.find((h) => Y(h.activity_name).toLowerCase() === k.toLowerCase() && h.name !== m);
    _ && (c.activity_name = "An activity named " + k + " already exists (" + _.name + ")");
  }
  return R.includes(r.category) || (c.category = "Choose a category"), c;
}
const Ce = { class: "list-page" }, we = { class: "sales-toolbar" }, Ae = { class: "sales-search" }, Te = ["innerHTML"], xe = { class: "sales-pills" }, Le = ["onClick"], Me = {
  class: "cust-toolbar-right",
  style: { "margin-left": "auto" }
}, $e = ["innerHTML"], He = ["disabled", "title"], Se = ["innerHTML"], De = {
  class: "bk-kpi-grid bk-kpi-grid-4",
  style: { "margin-bottom": "18px" }
}, Ee = { class: "bk-kpi-inner" }, Ne = ["innerHTML"], Ie = { class: "bk-kpi-body" }, Ue = { class: "bk-kpi-label" }, Be = {
  key: 0,
  class: "b-shimmer",
  style: { width: "64px", height: "22px", "margin-top": "2px", "border-radius": "4px" }
}, Oe = { class: "bk-kpi-trend bk-trend-neutral" }, je = { class: "inv-table-wrap" }, Fe = { class: "inv-table" }, Ve = { key: 1 }, ze = {
  colspan: "6",
  class: "vt-empty"
}, qe = { class: "vt-empty-title" }, Re = { class: "vt-empty-sub" }, Ye = ["disabled"], Ze = ["innerHTML"], Ge = ["onClick"], Je = { class: "vt-td vt-td-mono" }, Pe = { class: "vt-td" }, Ke = { class: "vt-vendor-name inv-customer" }, Qe = { class: "vt-td" }, We = { class: "vt-badge vt-badge-blue" }, Xe = { class: "vt-td" }, et = { class: "vt-actions" }, tt = ["disabled", "title", "onClick"], it = ["innerHTML"], st = ["disabled", "title", "onClick"], at = ["disabled", "title", "onClick"], nt = ["innerHTML"], ot = {
  key: 0,
  class: "vt-footer"
}, lt = {
  class: "inv-dh",
  style: { background: "linear-gradient(135deg,#0f766e,#115e59)", padding: "18px 24px" }
}, dt = { class: "cust-drawer-header-left" }, ct = {
  class: "cust-drawer-icon",
  style: { color: "#fff" }
}, rt = ["innerHTML"], vt = { class: "inv-dh-title" }, ut = { class: "cust-drawer-sub" }, yt = ["innerHTML"], ft = {
  class: "inv-dbody",
  style: { padding: "24px", "overflow-y": "auto", flex: "1" }
}, mt = { class: "inv-fg inv-fg2" }, pt = { class: "inv-field" }, bt = ["readonly"], _t = {
  key: 0,
  class: "ct-err"
}, gt = {
  key: 1,
  class: "ct-hint"
}, ht = { class: "inv-field" }, kt = ["value"], Ct = {
  key: 0,
  class: "ct-err"
}, wt = {
  class: "inv-field",
  style: { "grid-column": "span 2" }
}, At = {
  key: 0,
  class: "ct-err"
}, Tt = {
  key: 0,
  class: "inv-view-footer"
}, xt = {
  class: "inv-dfooter",
  style: { "border-top": "1px solid #e8ecf0", padding: "14px 24px", background: "#fafbfd" }
}, Lt = ["disabled"], Mt = ["innerHTML"], $t = {
  class: "nim-dialog",
  style: { "max-width": "420px" }
}, Ht = {
  class: "nim-header",
  style: { background: "linear-gradient(135deg,#dc2626,#b91c1c)" }
}, St = { class: "nim-header-left" }, Dt = {
  class: "nim-header-icon",
  style: { color: "#fff" }
}, Et = ["innerHTML"], Nt = ["innerHTML"], It = {
  class: "nim-body",
  style: { padding: "20px 24px" }
}, Ut = { style: { "font-size": "14px", color: "#374151", "line-height": "1.6" } }, Bt = { class: "inv-dfooter" }, Ot = ["disabled"], jt = ["innerHTML"], B = "Labour Activity", Ft = {
  __name: "Activities",
  setup(r) {
    const { toast: n } = ve(), m = [{ k: "all", l: "All" }, { k: "active", l: "Active" }, { k: "inactive", l: "Inactive" }], c = b([]), w = b({}), k = b(!0), _ = b(""), h = b("all"), C = b(!1), p = b("add"), L = b(!1), x = b(!1), M = b(null), $ = b(!1), O = b(""), f = X({}), l = X({});
    function ae() {
      return {
        name: "",
        activity_code: "",
        activity_name: "",
        category: R[0],
        owner: "",
        creation: "",
        modified: "",
        modified_by: ""
      };
    }
    function G(s) {
      Object.keys(f).forEach((t) => delete f[t]), Object.keys(l).forEach((t) => delete l[t]), Object.assign(l, ae(), s || {});
    }
    const E = (s) => se(s, w.value) !== "Not used", N = q(() => ge(c.value)), j = q(
      () => c.value.filter((s) => Z(s, h.value) && he(s, _.value))
    ), ne = q(() => [
      {
        key: "total",
        label: "Total Activities",
        value: N.value.all,
        sub: "all activities",
        icon: y("stack", 18),
        color: "#2563eb",
        iconBg: "#eff6ff",
        valueClass: "bk-kpi-blue"
      },
      {
        key: "active",
        label: "Active",
        value: N.value.active,
        sub: "can be put on a contract",
        icon: y("check", 18),
        color: "#16a34a",
        iconBg: "#f0fdf4",
        valueClass: "bk-kpi-green"
      },
      {
        key: "inactive",
        label: "Inactive",
        value: N.value.inactive,
        sub: "hidden from new contracts",
        icon: y("x", 18),
        color: "#d97706",
        iconBg: "#fff7ed",
        valueClass: "bk-kpi-amber"
      },
      {
        key: "used",
        label: "Used on Contracts",
        value: c.value.filter(E).length,
        sub: "can’t be deleted",
        icon: y("alert", 18),
        color: "#7c3aed",
        iconBg: "#f5f3ff",
        valueClass: ""
      }
    ]);
    function F(s) {
      return f[s] ? "border-color:#dc2626;background:#fff5f5" : "";
    }
    async function H() {
      k.value = !0;
      try {
        const s = await fe(B, {
          fields: ["name", "activity_code", "activity_name", "category", "disabled", "owner", "creation", "modified", "modified_by"],
          order: "activity_code asc",
          limit: 500
        });
        c.value = s || [];
      } catch (s) {
        n("Failed to load activities: " + (s.message || s), "error");
      } finally {
        k.value = !1;
      }
    }
    function J() {
      G({ activity_code: _e(c.value) }), p.value = "add", C.value = !0;
    }
    function P(s) {
      G({ ...s }), p.value = "edit", C.value = !0;
    }
    async function oe() {
      const s = ke(l, c.value, p.value === "edit" ? l.name : "");
      if (Object.keys(f).forEach((t) => delete f[t]), Object.assign(f, s), Object.keys(s).length) {
        n(Object.values(s)[0], "error");
        return;
      }
      L.value = !0;
      try {
        const t = await me();
        await ee({
          doctype: B,
          ...p.value === "edit" ? { name: l.name } : { activity_code: l.activity_code.trim().toUpperCase() },
          company: t,
          activity_name: Y(l.activity_name),
          category: l.category
        }), n(p.value === "edit" ? "Activity updated" : "Activity added"), C.value = !1, await H();
      } catch (t) {
        n(t.message || "Could not save activity", "error");
      } finally {
        L.value = !1;
      }
    }
    async function le(s) {
      O.value = s.name;
      try {
        await ee({ doctype: B, name: s.name, disabled: s.disabled ? 0 : 1 }), n(s.disabled ? "Activity activated" : "Activity deactivated"), await H();
      } catch (t) {
        n(t.message || "Could not update activity", "error");
      } finally {
        O.value = "";
      }
    }
    function de(s) {
      M.value = s, x.value = !0;
    }
    async function ce() {
      if (M.value) {
        $.value = !0;
        try {
          await pe(B, M.value.name), n("Activity deleted"), x.value = !1, M.value = null, await H();
        } catch (s) {
          n(s.message || "Could not delete activity", "error");
        } finally {
          $.value = !1;
        }
      }
    }
    return ue(H), (s, t) => {
      var K;
      return o(), d("div", Ce, [
        e("div", we, [
          e("div", Ae, [
            e("span", {
              innerHTML: v(y)("search", 13),
              style: { color: "#9ca3af", "flex-shrink": "0" }
            }, null, 8, Te),
            U(e("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (i) => _.value = i),
              placeholder: "Search activities…",
              class: "sales-search-input",
              autocomplete: "off"
            }, null, 512), [
              [V, _.value]
            ])
          ]),
          e("div", xe, [
            (o(), d(A, null, S(m, (i) => e("button", {
              key: i.k,
              class: T(["sales-pill", { active: h.value === i.k }]),
              onClick: (I) => h.value = i.k
            }, [
              u(a(i.l) + " ", 1),
              e("span", {
                class: T(["sales-pill-count", h.value === i.k ? "" : "zb-pc-muted"])
              }, a(N.value[i.k]), 3)
            ], 10, Le)), 64))
          ]),
          e("div", Me, [
            e("button", {
              class: "sales-btn-ghost",
              onClick: H,
              title: "Refresh"
            }, [
              e("span", {
                innerHTML: v(y)("refresh", 13)
              }, null, 8, $e),
              t[14] || (t[14] = u(" Refresh", -1))
            ]),
            e("button", {
              class: "sales-btn-primary",
              disabled: !s.$canCreate("admin"),
              title: s.$canCreate("admin") ? "" : "Not permitted",
              onClick: J
            }, [
              e("span", {
                innerHTML: v(y)("plus", 13)
              }, null, 8, Se),
              t[15] || (t[15] = u(" New Activity", -1))
            ], 8, He)
          ])
        ]),
        e("div", De, [
          (o(!0), d(A, null, S(ne.value, (i) => (o(), d("div", {
            key: i.key,
            class: "bk-kpi-card"
          }, [
            e("div", Ee, [
              e("div", {
                class: "bk-kpi-icon",
                style: D({ background: i.iconBg })
              }, [
                e("span", {
                  innerHTML: i.icon,
                  style: D({ color: i.color })
                }, null, 12, Ne)
              ], 4),
              e("div", Ie, [
                e("div", Ue, a(i.label), 1),
                e("div", {
                  class: T(["bk-kpi-value", i.valueClass])
                }, [
                  k.value ? (o(), d("div", Be)) : (o(), d(A, { key: 1 }, [
                    u(a(i.value), 1)
                  ], 64))
                ], 2),
                e("div", Oe, a(i.sub), 1)
              ])
            ])
          ]))), 128))
        ]),
        e("div", je, [
          e("table", Fe, [
            t[19] || (t[19] = e("thead", null, [
              e("tr", null, [
                e("th", { class: "vt-th" }, "Code"),
                e("th", { class: "vt-th" }, "Activity"),
                e("th", { class: "vt-th" }, "Category"),
                e("th", { class: "vt-th" }, "Used on"),
                e("th", { class: "vt-th" }, "Status"),
                e("th", { class: "vt-th vt-th-actions" }, "Actions")
              ])
            ], -1)),
            e("tbody", null, [
              k.value ? (o(), d(A, { key: 0 }, S(6, (i) => e("tr", {
                key: i,
                class: "vt-row-shimmer"
              }, [...t[16] || (t[16] = [
                e("td", { colspan: "6" }, [
                  e("div", {
                    class: "shimmer",
                    style: { height: "12px", "border-radius": "3px", width: "65%" }
                  })
                ], -1)
              ])])), 64)) : j.value.length ? (o(!0), d(A, { key: 2 }, S(j.value, (i) => (o(), d("tr", {
                key: i.name,
                class: T(["inv-row", i.disabled ? "vt-row-disabled" : ""]),
                onClick: (I) => P(i)
              }, [
                e("td", Je, a(i.name), 1),
                e("td", Pe, [
                  e("div", Ke, a(i.activity_name || i.name), 1)
                ]),
                e("td", Qe, [
                  e("span", We, a(i.category || "—"), 1)
                ]),
                e("td", {
                  class: T(["vt-td", E(i) ? "" : "vt-td-secondary"])
                }, a(v(se)(i, w.value)), 3),
                e("td", Xe, [
                  e("span", {
                    class: T(["inv-status-badge", i.disabled ? "vt-badge-red" : "vt-badge-green"])
                  }, [
                    t[18] || (t[18] = e("span", { class: "vt-badge-dot" }, null, -1)),
                    u(a(i.disabled ? "Inactive" : "Active"), 1)
                  ], 2)
                ]),
                e("td", {
                  class: "vt-td vt-td-actions",
                  onClick: t[1] || (t[1] = z(() => {
                  }, ["stop"]))
                }, [
                  e("div", et, [
                    e("button", {
                      class: "inv-act-btn vt-act-edit",
                      disabled: !s.$canEdit("admin"),
                      title: s.$canEdit("admin") ? "Edit" : "Not permitted",
                      onClick: (I) => P(i)
                    }, [
                      e("span", {
                        innerHTML: v(y)("edit", 13)
                      }, null, 8, it)
                    ], 8, tt),
                    e("button", {
                      class: "inv-act-btn",
                      disabled: !s.$canEdit("admin") || O.value === i.name,
                      title: i.disabled ? "Activate" : "Deactivate",
                      onClick: (I) => le(i),
                      style: { "font-size": "11.5px", "font-weight": "600", padding: "0 8px", width: "auto" }
                    }, a(i.disabled ? "Activate" : "Deactivate"), 9, st),
                    e("button", {
                      class: "inv-act-btn vt-act-del",
                      disabled: !s.$canDelete("admin") || E(i),
                      title: s.$canDelete("admin") ? E(i) ? "Used on a contract. Deactivate instead." : "Delete" : "Not permitted",
                      onClick: (I) => de(i)
                    }, [
                      e("span", {
                        innerHTML: v(y)("trash", 13)
                      }, null, 8, nt)
                    ], 8, at)
                  ])
                ])
              ], 10, Ge))), 128)) : (o(), d("tr", Ve, [
                e("td", ze, [
                  e("div", qe, a(_.value || h.value !== "all" ? "No results found" : "No activities yet"), 1),
                  e("div", Re, a(_.value || h.value !== "all" ? "Try adjusting your search or filter" : "Add your first activity to get started"), 1),
                  !_.value && h.value === "all" ? (o(), d("button", {
                    key: 0,
                    class: "nim-btn nim-btn-primary",
                    disabled: !s.$canCreate("admin"),
                    style: { "margin-top": "14px" },
                    onClick: J
                  }, [
                    e("span", {
                      innerHTML: v(y)("plus", 13)
                    }, null, 8, Ze),
                    t[17] || (t[17] = u(" New Activity", -1))
                  ], 8, Ye)) : g("", !0)
                ])
              ]))
            ])
          ]),
          !k.value && c.value.length ? (o(), d("div", ot, [
            t[20] || (t[20] = u("Showing ", -1)),
            e("strong", null, a(j.value.length), 1),
            t[21] || (t[21] = u(" of ", -1)),
            e("strong", null, a(c.value.length), 1),
            t[22] || (t[22] = u(" activities", -1))
          ])) : g("", !0)
        ]),
        t[30] || (t[30] = e("p", { style: { margin: "10px 4px", "font-size": "12px", color: "#6b7280" } }, "Only active activities appear when you create a contract. Each activity can have one contract per project. An activity used on a contract can be deactivated but not deleted.", -1)),
        (o(), Q(W, { to: "body" }, [
          C.value ? (o(), d("div", {
            key: 0,
            class: "inv-drawer-bg",
            onClick: t[10] || (t[10] = z((i) => C.value = !1, ["self"]))
          }, [
            e("div", {
              class: T(["inv-drawer-panel", { open: C.value }]),
              style: { width: "480px", "max-width": "98vw" }
            }, [
              e("div", lt, [
                e("div", dt, [
                  e("div", ct, [
                    e("span", {
                      innerHTML: v(y)("stack", 16)
                    }, null, 8, rt)
                  ]),
                  e("div", null, [
                    e("div", vt, a(p.value === "add" ? "New Activity" : "Edit Activity"), 1),
                    e("div", ut, a(p.value === "edit" ? l.name : "A kind of work that can be contracted out"), 1)
                  ])
                ]),
                e("button", {
                  class: "inv-dclose",
                  style: { background: "rgba(255,255,255,.15)", border: "none", cursor: "pointer", color: "#fff", width: "30px", height: "30px", "border-radius": "8px", display: "grid", "place-items": "center" },
                  onClick: t[2] || (t[2] = (i) => C.value = !1),
                  innerHTML: v(y)("x", 15)
                }, null, 8, yt)
              ]),
              e("div", ft, [
                t[26] || (t[26] = e("div", {
                  class: "inv-sec-lbl",
                  style: { "margin-top": "0" }
                }, "Activity", -1)),
                e("div", mt, [
                  e("div", pt, [
                    t[23] || (t[23] = e("label", { class: "inv-lbl" }, [
                      u("Code "),
                      e("span", { class: "nim-req" }, "*")
                    ], -1)),
                    U(e("input", {
                      "onUpdate:modelValue": t[3] || (t[3] = (i) => l.activity_code = i),
                      class: "inv-fi",
                      style: D(F("activity_code")),
                      readonly: p.value === "edit",
                      maxlength: "20",
                      placeholder: "ACT-004",
                      onInput: t[4] || (t[4] = (i) => {
                        l.activity_code = l.activity_code.toUpperCase().replace(/[^A-Z0-9-]/g, ""), delete f.activity_code;
                      })
                    }, null, 44, bt), [
                      [V, l.activity_code]
                    ]),
                    f.activity_code ? (o(), d("div", _t, a(f.activity_code), 1)) : p.value === "edit" ? (o(), d("div", gt, "The code can’t be changed once saved.")) : g("", !0)
                  ]),
                  e("div", ht, [
                    t[24] || (t[24] = e("label", { class: "inv-lbl" }, [
                      u("Category "),
                      e("span", { class: "nim-req" }, "*")
                    ], -1)),
                    U(e("select", {
                      "onUpdate:modelValue": t[5] || (t[5] = (i) => l.category = i),
                      class: "inv-fi",
                      style: D(F("category")),
                      onChange: t[6] || (t[6] = (i) => delete f.category)
                    }, [
                      (o(!0), d(A, null, S(v(R), (i) => (o(), d("option", {
                        key: i,
                        value: i
                      }, a(i), 9, kt))), 128))
                    ], 36), [
                      [ye, l.category]
                    ]),
                    f.category ? (o(), d("div", Ct, a(f.category), 1)) : g("", !0)
                  ]),
                  e("div", wt, [
                    t[25] || (t[25] = e("label", { class: "inv-lbl" }, [
                      u("Activity Name "),
                      e("span", { class: "nim-req" }, "*")
                    ], -1)),
                    U(e("input", {
                      "onUpdate:modelValue": t[7] || (t[7] = (i) => l.activity_name = i),
                      class: "inv-fi",
                      style: D(F("activity_name")),
                      placeholder: "Painting house",
                      onInput: t[8] || (t[8] = (i) => delete f.activity_name)
                    }, null, 36), [
                      [V, l.activity_name]
                    ]),
                    f.activity_name ? (o(), d("div", At, a(f.activity_name), 1)) : g("", !0)
                  ])
                ]),
                p.value === "edit" && l.owner ? (o(), d("div", Tt, [
                  u(" Created by " + a(v(ie)(l.owner)) + " on " + a(v(te)(l.creation)) + " ", 1),
                  l.modified_by ? (o(), d(A, { key: 0 }, [
                    u(" · Last modified by " + a(v(ie)(l.modified_by)) + " on " + a(v(te)(l.modified)), 1)
                  ], 64)) : g("", !0)
                ])) : g("", !0)
              ]),
              e("div", xt, [
                e("button", {
                  class: "form-btn form-btn-outline",
                  onClick: t[9] || (t[9] = (i) => C.value = !1)
                }, "Cancel"),
                e("button", {
                  class: "form-btn form-btn-primary",
                  onClick: oe,
                  disabled: L.value || !(p.value === "edit" ? s.$canEdit("admin") : s.$canCreate("admin"))
                }, [
                  L.value ? (o(), d("span", {
                    key: 0,
                    innerHTML: v(y)("refresh", 13),
                    style: { animation: "spin 1s linear infinite" }
                  }, null, 8, Mt)) : g("", !0),
                  u(" " + a(L.value ? "Saving…" : p.value === "add" ? "Save Activity" : "Save Changes"), 1)
                ], 8, Lt)
              ])
            ], 2)
          ])) : g("", !0)
        ])),
        (o(), Q(W, { to: "body" }, [
          x.value ? (o(), d("div", {
            key: 0,
            class: "nim-overlay",
            onClick: t[13] || (t[13] = z((i) => x.value = !1, ["self"]))
          }, [
            e("div", $t, [
              e("div", Ht, [
                e("div", St, [
                  e("div", Dt, [
                    e("span", {
                      innerHTML: v(y)("trash", 16)
                    }, null, 8, Et)
                  ]),
                  t[27] || (t[27] = e("div", { class: "nim-header-title" }, "Delete Activity?", -1))
                ]),
                e("button", {
                  class: "nim-close",
                  onClick: t[11] || (t[11] = (i) => x.value = !1),
                  innerHTML: v(y)("x", 15)
                }, null, 8, Nt)
              ]),
              e("div", It, [
                e("p", Ut, [
                  t[28] || (t[28] = u(" Are you sure you want to delete ", -1)),
                  e("strong", null, a((K = M.value) == null ? void 0 : K.activity_name), 1),
                  t[29] || (t[29] = u("? This action cannot be undone. An activity used on a contract can only be deactivated. ", -1))
                ])
              ]),
              e("div", Bt, [
                e("button", {
                  class: "form-btn form-btn-outline",
                  onClick: t[12] || (t[12] = (i) => x.value = !1)
                }, "Cancel"),
                e("button", {
                  onClick: ce,
                  disabled: $.value || !s.$canDelete("admin"),
                  style: { height: "37px", padding: "0 18px", "border-radius": "8px", "font-size": "13.5px", "font-weight": "600", cursor: "pointer", "font-family": "inherit", border: "none", background: "#dc2626", color: "#fff", display: "inline-flex", "align-items": "center", gap: "6px" }
                }, [
                  $.value ? (o(), d("span", {
                    key: 0,
                    innerHTML: v(y)("refresh", 13),
                    style: { animation: "spin 1s linear infinite" }
                  }, null, 8, jt)) : g("", !0),
                  u(" " + a($.value ? "Deleting…" : "Yes, Delete"), 1)
                ], 8, Ot)
              ])
            ])
          ])) : g("", !0)
        ]))
      ]);
    };
  }
}, Rt = /* @__PURE__ */ re(Ft, [["__scopeId", "data-v-d6fbaa1a"]]);
export {
  Rt as default
};
