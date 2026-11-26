import { _ as de, y as ce, o as re, c as o, a as e, u as d, i as r, w as S, B as F, F as h, r as M, d as c, t as a, b, D as G, x as j, p as H, v as ve, n as g, J, f as P, h as y, g as V, A as Z, e as ue, L as K, a2 as ye, k as n } from "./main-CmV-DJ_5.js";
import { b as Q } from "./format-BcJZDVG4.js";
import { o as W } from "./userNames-BvfkkBm5.js";
import { A as X, b as be, n as pe, v as me, c as fe, u as ee, a as _e, m as he, d as ge } from "./labourActivity-DtOgMAQT.js";
const ke = { class: "list-page" }, Ce = { class: "sales-toolbar" }, we = { class: "sales-search" }, Ae = ["innerHTML"], Te = { class: "sales-pills" }, xe = ["onClick"], Le = {
  class: "cust-toolbar-right",
  style: { "margin-left": "auto" }
}, Me = ["innerHTML"], He = ["disabled", "title"], $e = ["innerHTML"], De = {
  class: "bk-kpi-grid bk-kpi-grid-4",
  style: { "margin-bottom": "18px" }
}, Ne = { class: "bk-kpi-inner" }, Ee = ["innerHTML"], Se = { class: "bk-kpi-body" }, Ue = { class: "bk-kpi-label" }, Be = {
  key: 0,
  class: "b-shimmer",
  style: { width: "64px", height: "22px", "margin-top": "2px", "border-radius": "4px" }
}, Ie = { class: "bk-kpi-trend bk-trend-neutral" }, Oe = { class: "inv-table-wrap" }, Fe = { class: "inv-table" }, je = { key: 1 }, Ve = {
  colspan: "6",
  class: "vt-empty"
}, ze = { class: "vt-empty-title" }, Re = { class: "vt-empty-sub" }, qe = ["disabled"], Ye = ["innerHTML"], Ge = ["onClick"], Je = { class: "vt-td vt-td-mono" }, Pe = { class: "vt-td" }, Ze = { class: "vt-vendor-name inv-customer" }, Ke = { class: "vt-td" }, Qe = { class: "vt-badge vt-badge-blue" }, We = { class: "vt-td" }, Xe = { class: "vt-actions" }, et = ["disabled", "title", "onClick"], tt = ["innerHTML"], st = ["disabled", "title", "onClick"], it = ["disabled", "title", "onClick"], at = ["innerHTML"], nt = {
  key: 0,
  class: "vt-footer"
}, lt = {
  class: "inv-dh",
  style: { background: "linear-gradient(135deg,#0f766e,#115e59)", padding: "18px 24px" }
}, ot = { class: "cust-drawer-header-left" }, dt = {
  class: "cust-drawer-icon",
  style: { color: "#fff" }
}, ct = ["innerHTML"], rt = { class: "inv-dh-title" }, vt = { class: "cust-drawer-sub" }, ut = ["innerHTML"], yt = {
  class: "inv-dbody",
  style: { padding: "24px", "overflow-y": "auto", flex: "1" }
}, bt = { class: "inv-fg inv-fg2" }, pt = { class: "inv-field" }, mt = ["readonly"], ft = {
  key: 0,
  class: "ct-err"
}, _t = {
  key: 1,
  class: "ct-hint"
}, ht = { class: "inv-field" }, gt = ["value"], kt = {
  key: 0,
  class: "ct-err"
}, Ct = {
  class: "inv-field",
  style: { "grid-column": "span 2" }
}, wt = {
  key: 0,
  class: "ct-err"
}, At = {
  key: 0,
  class: "inv-view-footer"
}, Tt = {
  class: "inv-dfooter",
  style: { "border-top": "1px solid #e8ecf0", padding: "14px 24px", background: "#fafbfd" }
}, xt = ["disabled"], Lt = ["innerHTML"], Mt = {
  class: "nim-dialog",
  style: { "max-width": "420px" }
}, Ht = {
  class: "nim-header",
  style: { background: "linear-gradient(135deg,#dc2626,#b91c1c)" }
}, $t = { class: "nim-header-left" }, Dt = {
  class: "nim-header-icon",
  style: { color: "#fff" }
}, Nt = ["innerHTML"], Et = ["innerHTML"], St = {
  class: "nim-body",
  style: { padding: "20px 24px" }
}, Ut = { style: { "font-size": "14px", color: "#374151", "line-height": "1.6" } }, Bt = { class: "inv-dfooter" }, It = ["disabled"], Ot = ["innerHTML"], U = "Labour Activity", Ft = {
  __name: "Activities",
  setup(jt) {
    const { toast: p } = ce(), te = [{ k: "all", l: "All" }, { k: "active", l: "Active" }, { k: "inactive", l: "Inactive" }], m = y([]), $ = y({}), w = y(!0), k = y(""), _ = y("all"), f = y(!1), u = y("add"), A = y(!1), C = y(!1), T = y(null), x = y(!1), B = y(""), v = Z({}), l = Z({});
    function se() {
      return {
        name: "",
        activity_code: "",
        activity_name: "",
        category: X[0],
        owner: "",
        creation: "",
        modified: "",
        modified_by: ""
      };
    }
    function z(i) {
      Object.keys(v).forEach((t) => delete v[t]), Object.keys(l).forEach((t) => delete l[t]), Object.assign(l, se(), i || {});
    }
    const D = (i) => ee(i, $.value) !== "Not used", N = V(() => _e(m.value)), I = V(
      () => m.value.filter((i) => he(i, _.value) && ge(i, k.value))
    ), ie = V(() => [
      {
        key: "total",
        label: "Total Activities",
        value: N.value.all,
        sub: "all activities",
        icon: r("stack", 18),
        color: "#2563eb",
        iconBg: "#eff6ff",
        valueClass: "bk-kpi-blue"
      },
      {
        key: "active",
        label: "Active",
        value: N.value.active,
        sub: "can be put on a contract",
        icon: r("check", 18),
        color: "#16a34a",
        iconBg: "#f0fdf4",
        valueClass: "bk-kpi-green"
      },
      {
        key: "inactive",
        label: "Inactive",
        value: N.value.inactive,
        sub: "hidden from new contracts",
        icon: r("x", 18),
        color: "#d97706",
        iconBg: "#fff7ed",
        valueClass: "bk-kpi-amber"
      },
      {
        key: "used",
        label: "Used on Contracts",
        value: m.value.filter(D).length,
        sub: "can’t be deleted",
        icon: r("alert", 18),
        color: "#7c3aed",
        iconBg: "#f5f3ff",
        valueClass: ""
      }
    ]);
    function O(i) {
      return v[i] ? "border-color:#dc2626;background:#fff5f5" : "";
    }
    async function L() {
      w.value = !0;
      try {
        const i = await P(U, {
          fields: ["name", "activity_code", "activity_name", "category", "disabled", "owner", "creation", "modified", "modified_by"],
          order: "creation desc",
          limit: 500
        });
        m.value = i || [];
        try {
          $.value = be(await P("Labour Contract", { fields: ["name", "activity"], limit: 1e3 }));
        } catch {
          $.value = {};
        }
      } catch (i) {
        p("Failed to load activities: " + (i.message || i), "error");
      } finally {
        w.value = !1;
      }
    }
    function R() {
      z({ activity_code: pe(m.value) }), u.value = "add", f.value = !0;
    }
    function q(i) {
      z({ ...i }), u.value = "edit", f.value = !0;
    }
    async function ae() {
      const i = me(l, m.value, u.value === "edit" ? l.name : "");
      if (Object.keys(v).forEach((t) => delete v[t]), Object.assign(v, i), Object.keys(i).length) {
        p(Object.values(i)[0], "error");
        return;
      }
      A.value = !0;
      try {
        const t = await ue();
        await K({
          doctype: U,
          ...u.value === "edit" ? { name: l.name } : { activity_code: l.activity_code.trim().toUpperCase() },
          company: t,
          activity_name: fe(l.activity_name),
          category: l.category
        }), p(u.value === "edit" ? "Activity updated" : "Activity added"), f.value = !1, await L();
      } catch (t) {
        p(t.message || "Could not save activity", "error");
      } finally {
        A.value = !1;
      }
    }
    async function ne(i) {
      B.value = i.name;
      try {
        await K({ doctype: U, name: i.name, disabled: i.disabled ? 0 : 1 }), p(i.disabled ? "Activity activated" : "Activity deactivated"), await L();
      } catch (t) {
        p(t.message || "Could not update activity", "error");
      } finally {
        B.value = "";
      }
    }
    function le(i) {
      T.value = i, C.value = !0;
    }
    async function oe() {
      if (T.value) {
        x.value = !0;
        try {
          await ye(U, T.value.name), p("Activity deleted"), C.value = !1, T.value = null, await L();
        } catch (i) {
          p(i.message || "Could not delete activity", "error");
        } finally {
          x.value = !1;
        }
      }
    }
    return re(L), (i, t) => {
      var Y;
      return n(), o("div", ke, [
        e("div", Ce, [
          e("div", we, [
            e("span", {
              innerHTML: d(r)("search", 13),
              style: { color: "#9ca3af", "flex-shrink": "0" }
            }, null, 8, Ae),
            S(e("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (s) => k.value = s),
              placeholder: "Search activities…",
              class: "sales-search-input",
              autocomplete: "off"
            }, null, 512), [
              [F, k.value]
            ])
          ]),
          e("div", Te, [
            (n(), o(h, null, M(te, (s) => e("button", {
              key: s.k,
              class: g(["sales-pill", { active: _.value === s.k }]),
              onClick: (E) => _.value = s.k
            }, [
              c(a(s.l) + " ", 1),
              e("span", {
                class: g(["sales-pill-count", _.value === s.k ? "" : "zb-pc-muted"])
              }, a(N.value[s.k]), 3)
            ], 10, xe)), 64))
          ]),
          e("div", Le, [
            e("button", {
              class: "sales-btn-ghost",
              onClick: L,
              title: "Refresh"
            }, [
              e("span", {
                innerHTML: d(r)("refresh", 13)
              }, null, 8, Me),
              t[14] || (t[14] = c(" Refresh", -1))
            ]),
            e("button", {
              class: "sales-btn-primary",
              disabled: !i.$canCreate("admin"),
              title: i.$canCreate("admin") ? "" : "Not permitted",
              onClick: R
            }, [
              e("span", {
                innerHTML: d(r)("plus", 13)
              }, null, 8, $e),
              t[15] || (t[15] = c(" New Activity", -1))
            ], 8, He)
          ])
        ]),
        e("div", De, [
          (n(!0), o(h, null, M(ie.value, (s) => (n(), o("div", {
            key: s.key,
            class: "bk-kpi-card"
          }, [
            e("div", Ne, [
              e("div", {
                class: "bk-kpi-icon",
                style: H({ background: s.iconBg })
              }, [
                e("span", {
                  innerHTML: s.icon,
                  style: H({ color: s.color })
                }, null, 12, Ee)
              ], 4),
              e("div", Se, [
                e("div", Ue, a(s.label), 1),
                e("div", {
                  class: g(["bk-kpi-value", s.valueClass])
                }, [
                  w.value ? (n(), o("div", Be)) : (n(), o(h, { key: 1 }, [
                    c(a(s.value), 1)
                  ], 64))
                ], 2),
                e("div", Ie, a(s.sub), 1)
              ])
            ])
          ]))), 128))
        ]),
        e("div", Oe, [
          e("table", Fe, [
            t[19] || (t[19] = e("thead", null, [
              e("tr", null, [
                e("th", { class: "vt-th" }, "Code"),
                e("th", { class: "vt-th" }, "Activity"),
                e("th", { class: "vt-th" }, "Category"),
                e("th", { class: "vt-th" }, "Used on Contract"),
                e("th", { class: "vt-th" }, "Status"),
                e("th", { class: "vt-th vt-th-actions" }, "Actions")
              ])
            ], -1)),
            e("tbody", null, [
              w.value ? (n(), o(h, { key: 0 }, M(6, (s) => e("tr", {
                key: s,
                class: "vt-row-shimmer"
              }, [...t[16] || (t[16] = [
                e("td", { colspan: "6" }, [
                  e("div", {
                    class: "shimmer",
                    style: { height: "12px", "border-radius": "3px", width: "65%" }
                  })
                ], -1)
              ])])), 64)) : I.value.length ? (n(!0), o(h, { key: 2 }, M(I.value, (s) => (n(), o("tr", {
                key: s.name,
                class: g(["inv-row", s.disabled ? "vt-row-disabled" : ""]),
                onClick: (E) => q(s)
              }, [
                e("td", Je, a(s.name), 1),
                e("td", Pe, [
                  e("div", Ze, a(s.activity_name || s.name), 1)
                ]),
                e("td", Ke, [
                  e("span", Qe, a(s.category || "—"), 1)
                ]),
                e("td", {
                  class: g(["vt-td", D(s) ? "" : "vt-td-secondary"])
                }, a(d(ee)(s, $.value)), 3),
                e("td", We, [
                  e("span", {
                    class: g(["inv-status-badge", s.disabled ? "vt-badge-red" : "vt-badge-green"])
                  }, [
                    t[18] || (t[18] = e("span", { class: "vt-badge-dot" }, null, -1)),
                    c(a(s.disabled ? "Inactive" : "Active"), 1)
                  ], 2)
                ]),
                e("td", {
                  class: "vt-td vt-td-actions",
                  onClick: t[1] || (t[1] = j(() => {
                  }, ["stop"]))
                }, [
                  e("div", Xe, [
                    e("button", {
                      class: "inv-act-btn vt-act-edit",
                      disabled: !i.$canEdit("admin"),
                      title: i.$canEdit("admin") ? "Edit" : "Not permitted",
                      onClick: (E) => q(s)
                    }, [
                      e("span", {
                        innerHTML: d(r)("edit", 13)
                      }, null, 8, tt)
                    ], 8, et),
                    e("button", {
                      class: "inv-act-btn",
                      disabled: !i.$canEdit("admin") || B.value === s.name,
                      title: s.disabled ? "Activate" : "Deactivate",
                      onClick: (E) => ne(s),
                      style: { "font-size": "11.5px", "font-weight": "600", padding: "0 8px", width: "auto" }
                    }, a(s.disabled ? "Activate" : "Deactivate"), 9, st),
                    e("button", {
                      class: "inv-act-btn vt-act-del",
                      disabled: !i.$canDelete("admin") || D(s),
                      title: i.$canDelete("admin") ? D(s) ? "Used on a contract. Deactivate instead." : "Delete" : "Not permitted",
                      onClick: (E) => le(s)
                    }, [
                      e("span", {
                        innerHTML: d(r)("trash", 13)
                      }, null, 8, at)
                    ], 8, it)
                  ])
                ])
              ], 10, Ge))), 128)) : (n(), o("tr", je, [
                e("td", Ve, [
                  e("div", ze, a(k.value || _.value !== "all" ? "No results found" : "No activities yet"), 1),
                  e("div", Re, a(k.value || _.value !== "all" ? "Try adjusting your search or filter" : "Add your first activity to get started"), 1),
                  !k.value && _.value === "all" ? (n(), o("button", {
                    key: 0,
                    class: "nim-btn nim-btn-primary",
                    disabled: !i.$canCreate("admin"),
                    style: { "margin-top": "14px" },
                    onClick: R
                  }, [
                    e("span", {
                      innerHTML: d(r)("plus", 13)
                    }, null, 8, Ye),
                    t[17] || (t[17] = c(" New Activity", -1))
                  ], 8, qe)) : b("", !0)
                ])
              ]))
            ])
          ]),
          !w.value && m.value.length ? (n(), o("div", nt, [
            t[20] || (t[20] = c("Showing ", -1)),
            e("strong", null, a(I.value.length), 1),
            t[21] || (t[21] = c(" of ", -1)),
            e("strong", null, a(m.value.length), 1),
            t[22] || (t[22] = c(" activities", -1))
          ])) : b("", !0)
        ]),
        t[30] || (t[30] = e("p", { style: { margin: "10px 4px", "font-size": "12px", color: "#6b7280" } }, "Only active activities appear when you create a contract. An activity can be used on one contract only, so create a new activity for each contract. An activity used on a contract can be deactivated but not deleted.", -1)),
        (n(), G(J, { to: "body" }, [
          f.value ? (n(), o("div", {
            key: 0,
            class: "inv-drawer-bg",
            onClick: t[10] || (t[10] = j((s) => f.value = !1, ["self"]))
          }, [
            e("div", {
              class: g(["inv-drawer-panel", { open: f.value }]),
              style: { width: "480px", "max-width": "98vw" }
            }, [
              e("div", lt, [
                e("div", ot, [
                  e("div", dt, [
                    e("span", {
                      innerHTML: d(r)("stack", 16)
                    }, null, 8, ct)
                  ]),
                  e("div", null, [
                    e("div", rt, a(u.value === "add" ? "New Activity" : "Edit Activity"), 1),
                    e("div", vt, a(u.value === "edit" ? l.name : "A kind of work that can be contracted out"), 1)
                  ])
                ]),
                e("button", {
                  class: "inv-dclose",
                  style: { background: "rgba(255,255,255,.15)", border: "none", cursor: "pointer", color: "#fff", width: "30px", height: "30px", "border-radius": "8px", display: "grid", "place-items": "center" },
                  onClick: t[2] || (t[2] = (s) => f.value = !1),
                  innerHTML: d(r)("x", 15)
                }, null, 8, ut)
              ]),
              e("div", yt, [
                t[26] || (t[26] = e("div", {
                  class: "inv-sec-lbl",
                  style: { "margin-top": "0" }
                }, "Activity", -1)),
                e("div", bt, [
                  e("div", pt, [
                    t[23] || (t[23] = e("label", { class: "inv-lbl" }, [
                      c("Code "),
                      e("span", { class: "nim-req" }, "*")
                    ], -1)),
                    S(e("input", {
                      "onUpdate:modelValue": t[3] || (t[3] = (s) => l.activity_code = s),
                      class: "inv-fi",
                      style: H(O("activity_code")),
                      readonly: u.value === "edit",
                      maxlength: "20",
                      placeholder: "ACT-004",
                      onInput: t[4] || (t[4] = (s) => {
                        l.activity_code = l.activity_code.toUpperCase().replace(/[^A-Z0-9-]/g, ""), delete v.activity_code;
                      })
                    }, null, 44, mt), [
                      [F, l.activity_code]
                    ]),
                    v.activity_code ? (n(), o("div", ft, a(v.activity_code), 1)) : u.value === "edit" ? (n(), o("div", _t, "The code can’t be changed once saved.")) : b("", !0)
                  ]),
                  e("div", ht, [
                    t[24] || (t[24] = e("label", { class: "inv-lbl" }, [
                      c("Category "),
                      e("span", { class: "nim-req" }, "*")
                    ], -1)),
                    S(e("select", {
                      "onUpdate:modelValue": t[5] || (t[5] = (s) => l.category = s),
                      class: "inv-fi",
                      style: H(O("category")),
                      onChange: t[6] || (t[6] = (s) => delete v.category)
                    }, [
                      (n(!0), o(h, null, M(d(X), (s) => (n(), o("option", {
                        key: s,
                        value: s
                      }, a(s), 9, gt))), 128))
                    ], 36), [
                      [ve, l.category]
                    ]),
                    v.category ? (n(), o("div", kt, a(v.category), 1)) : b("", !0)
                  ]),
                  e("div", Ct, [
                    t[25] || (t[25] = e("label", { class: "inv-lbl" }, [
                      c("Activity Name "),
                      e("span", { class: "nim-req" }, "*")
                    ], -1)),
                    S(e("input", {
                      "onUpdate:modelValue": t[7] || (t[7] = (s) => l.activity_name = s),
                      class: "inv-fi",
                      style: H(O("activity_name")),
                      placeholder: "Painting house",
                      onInput: t[8] || (t[8] = (s) => delete v.activity_name)
                    }, null, 36), [
                      [F, l.activity_name]
                    ]),
                    v.activity_name ? (n(), o("div", wt, a(v.activity_name), 1)) : b("", !0)
                  ])
                ]),
                u.value === "edit" && l.owner ? (n(), o("div", At, [
                  c(" Created by " + a(d(W)(l.owner)) + " on " + a(d(Q)(l.creation)) + " ", 1),
                  l.modified_by ? (n(), o(h, { key: 0 }, [
                    c(" · Last modified by " + a(d(W)(l.modified_by)) + " on " + a(d(Q)(l.modified)), 1)
                  ], 64)) : b("", !0)
                ])) : b("", !0)
              ]),
              e("div", Tt, [
                e("button", {
                  class: "form-btn form-btn-outline",
                  onClick: t[9] || (t[9] = (s) => f.value = !1)
                }, "Cancel"),
                e("button", {
                  class: "form-btn form-btn-primary",
                  onClick: ae,
                  disabled: A.value || !(u.value === "edit" ? i.$canEdit("admin") : i.$canCreate("admin"))
                }, [
                  A.value ? (n(), o("span", {
                    key: 0,
                    innerHTML: d(r)("refresh", 13),
                    style: { animation: "spin 1s linear infinite" }
                  }, null, 8, Lt)) : b("", !0),
                  c(" " + a(A.value ? "Saving…" : u.value === "add" ? "Save Activity" : "Save Changes"), 1)
                ], 8, xt)
              ])
            ], 2)
          ])) : b("", !0)
        ])),
        (n(), G(J, { to: "body" }, [
          C.value ? (n(), o("div", {
            key: 0,
            class: "nim-overlay",
            onClick: t[13] || (t[13] = j((s) => C.value = !1, ["self"]))
          }, [
            e("div", Mt, [
              e("div", Ht, [
                e("div", $t, [
                  e("div", Dt, [
                    e("span", {
                      innerHTML: d(r)("trash", 16)
                    }, null, 8, Nt)
                  ]),
                  t[27] || (t[27] = e("div", { class: "nim-header-title" }, "Delete Activity?", -1))
                ]),
                e("button", {
                  class: "nim-close",
                  onClick: t[11] || (t[11] = (s) => C.value = !1),
                  innerHTML: d(r)("x", 15)
                }, null, 8, Et)
              ]),
              e("div", St, [
                e("p", Ut, [
                  t[28] || (t[28] = c(" Are you sure you want to delete ", -1)),
                  e("strong", null, a((Y = T.value) == null ? void 0 : Y.activity_name), 1),
                  t[29] || (t[29] = c("? This action cannot be undone. An activity used on a contract can only be deactivated. ", -1))
                ])
              ]),
              e("div", Bt, [
                e("button", {
                  class: "form-btn form-btn-outline",
                  onClick: t[12] || (t[12] = (s) => C.value = !1)
                }, "Cancel"),
                e("button", {
                  onClick: oe,
                  disabled: x.value || !i.$canDelete("admin"),
                  style: { height: "37px", padding: "0 18px", "border-radius": "8px", "font-size": "13.5px", "font-weight": "600", cursor: "pointer", "font-family": "inherit", border: "none", background: "#dc2626", color: "#fff", display: "inline-flex", "align-items": "center", gap: "6px" }
                }, [
                  x.value ? (n(), o("span", {
                    key: 0,
                    innerHTML: d(r)("refresh", 13),
                    style: { animation: "spin 1s linear infinite" }
                  }, null, 8, Ot)) : b("", !0),
                  c(" " + a(x.value ? "Deleting…" : "Yes, Delete"), 1)
                ], 8, It)
              ])
            ])
          ])) : b("", !0)
        ]))
      ]);
    };
  }
}, Yt = /* @__PURE__ */ de(Ft, [["__scopeId", "data-v-2a0833a4"]]);
export {
  Yt as default
};
