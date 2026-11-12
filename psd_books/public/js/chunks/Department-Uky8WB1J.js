import { _ as G, k as d, c as r, a as e, t as a, q as J, d as _, w as z, A, u as l, F as C, b as w, h as u, x as ae, o as ie, i as c, r as j, D as le, C as oe, f as de, g as H, n as I, a3 as re, a2 as ce, K as ue } from "./main-UuZwJvYM.js";
import { P as pe } from "./Pagination-BZXCv6SK.js";
import { o as K } from "./userNames-fLW4UARl.js";
import { b as P } from "./format-BcJZDVG4.js";
const ve = { class: "modal-overlay" }, me = { class: "modal-card" }, ke = { class: "modal-header" }, be = { class: "modal-title" }, _e = { class: "modal-body" }, ye = { class: "form-group" }, fe = { class: "form-group" }, he = {
  key: 0,
  class: "inv-view-footer"
}, ge = { class: "form-actions" }, De = ["disabled"], Ce = {
  __name: "DepartmentForm",
  props: {
    isEdit: Boolean,
    department: Object
  },
  emits: ["close", "save"],
  setup(L, { emit: h }) {
    const M = L, v = h, i = u({
      department_name: "",
      description: ""
    });
    M.isEdit && M.department && (i.value = { ...M.department });
    const m = u(!1);
    async function k() {
      m.value = !0;
      try {
        v("save", { ...i.value });
      } finally {
        m.value = !1;
      }
    }
    return (y, o) => (d(), r("div", ve, [
      e("div", me, [
        e("div", ke, [
          e("h3", be, a(L.isEdit ? "Edit Department" : "New Department"), 1),
          e("button", {
            class: "modal-close",
            onClick: o[0] || (o[0] = (p) => y.$emit("close"))
          }, "×")
        ]),
        e("div", _e, [
          e("form", {
            onSubmit: J(k, ["prevent"])
          }, [
            e("div", ye, [
              o[4] || (o[4] = e("label", { for: "department_name" }, [
                _("Department Name "),
                e("span", { class: "nim-req" }, "*")
              ], -1)),
              z(e("input", {
                type: "text",
                id: "department_name",
                "onUpdate:modelValue": o[1] || (o[1] = (p) => i.value.department_name = p),
                required: ""
              }, null, 512), [
                [A, i.value.department_name]
              ])
            ]),
            e("div", fe, [
              o[5] || (o[5] = e("label", { for: "description" }, "Description", -1)),
              z(e("textarea", {
                id: "description",
                "onUpdate:modelValue": o[2] || (o[2] = (p) => i.value.description = p),
                rows: "3",
                placeholder: "Brief description of this department"
              }, null, 512), [
                [A, i.value.description]
              ])
            ]),
            L.isEdit && i.value.owner ? (d(), r("div", he, [
              _(" Created by " + a(l(K)(i.value.owner)) + " on " + a(l(P)(i.value.creation)) + " ", 1),
              i.value.modified_by ? (d(), r(C, { key: 0 }, [
                _(" · Last modified by " + a(l(K)(i.value.modified_by)) + " on " + a(l(P)(i.value.modified)), 1)
              ], 64)) : w("", !0)
            ])) : w("", !0),
            e("div", ge, [
              e("button", {
                type: "button",
                class: "btn-secondary",
                onClick: o[3] || (o[3] = (p) => y.$emit("close"))
              }, "Cancel"),
              e("button", {
                type: "submit",
                class: "btn-primary",
                disabled: m.value || !(L.isEdit ? y.$canEdit("inventory") : y.$canCreate("inventory"))
              }, a(m.value ? "Saving…" : "Save"), 9, De)
            ])
          ], 32)
        ])
      ])
    ]));
  }
}, Le = /* @__PURE__ */ G(Ce, [["__scopeId", "data-v-9e546370"]]), Me = { class: "list-page" }, Te = { class: "sales-toolbar" }, $e = { class: "sales-search" }, He = ["innerHTML"], we = { class: "sales-pills" }, Se = ["onClick"], xe = {
  key: 0,
  class: "sales-pill-count"
}, Ne = { class: "sales-actions" }, Ee = ["disabled"], Fe = ["innerHTML"], Ve = ["disabled"], Be = ["innerHTML"], Ue = ["disabled", "title"], Re = ["innerHTML"], je = { class: "bk-kpi-grid" }, ze = { class: "bk-kpi-inner" }, Ae = {
  class: "bk-kpi-icon",
  style: { background: "#dbeafe" }
}, qe = ["innerHTML"], Oe = { class: "bk-kpi-body" }, Ie = { class: "bk-kpi-value" }, Ke = { class: "bk-kpi-inner" }, Pe = {
  class: "bk-kpi-icon",
  style: { background: "#dcfce7" }
}, Ge = ["innerHTML"], Je = { class: "bk-kpi-body" }, Qe = { class: "bk-kpi-value bk-kpi-green" }, We = { class: "bk-kpi-inner" }, Xe = {
  class: "bk-kpi-icon",
  style: { background: "#fef3c7" }
}, Ye = ["innerHTML"], Ze = { class: "bk-kpi-body" }, et = { class: "bk-kpi-value bk-kpi-amber" }, tt = { class: "bk-stat-grid" }, st = { class: "bk-stat-card" }, nt = { class: "bk-stat-content" }, at = { class: "bk-stat-value" }, it = {
  class: "bk-stat-icon",
  style: { background: "#dbeafe", color: "#2563eb" }
}, lt = ["innerHTML"], ot = { class: "bk-stat-card" }, dt = { class: "bk-stat-content" }, rt = { class: "bk-stat-value bk-kpi-green" }, ct = {
  class: "bk-stat-icon",
  style: { background: "#dcfce7", color: "#16a34a" }
}, ut = ["innerHTML"], pt = { class: "bk-stat-card" }, vt = { class: "bk-stat-content" }, mt = { class: "bk-stat-value bk-kpi-amber" }, kt = {
  class: "bk-stat-icon",
  style: { background: "#fef3c7", color: "#92400e" }
}, bt = ["innerHTML"], _t = { class: "bk-stat-card" }, yt = { class: "bk-stat-content" }, ft = { class: "bk-stat-value" }, ht = {
  class: "bk-stat-icon",
  style: { background: "#ede9fe", color: "#7c3aed" }
}, gt = ["innerHTML"], Dt = { class: "inv-table-wrap" }, Ct = { class: "inv-table departments-tbl" }, Lt = ["innerHTML"], Mt = ["innerHTML"], Tt = ["innerHTML"], $t = { key: 1 }, Ht = {
  colspan: "4",
  class: "bk-empty-state"
}, wt = { class: "bk-empty-inner" }, St = ["disabled", "title"], xt = ["innerHTML"], Nt = ["onClick"], Et = { class: "inv-link" }, Ft = { class: "dept-code" }, Vt = ["onClick", "title"], Bt = {
  key: 0,
  class: "text-muted"
}, Ut = {
  key: 1,
  class: "text-muted"
}, Rt = ["onClick"], jt = ["onClick", "disabled"], zt = ["innerHTML"], At = ["onClick", "disabled"], qt = ["innerHTML"], Ot = {
  key: 0,
  style: { padding: "12px 4px 4px" }
}, It = {
  __name: "Department",
  setup(L) {
    const { toast: h } = ae(), { confirm: M } = re(), v = u([]), i = u(!1), m = u(""), k = u("all"), y = u(1), o = u(20), p = u(!1), T = u(!1), V = u(null), S = u("department_name"), x = u(1), q = [
      { key: "all", label: "All" },
      { key: "documented", label: "Documented" },
      { key: "needs-details", label: "Needs Details" }
    ], D = H(() => {
      const n = {};
      for (const t of q)
        t.key !== "all" && (n[t.key] = v.value.filter(
          (s) => t.key === "documented" ? !!(s.description || "").trim() : !(s.description || "").trim()
        ).length);
      return n;
    }), Q = H(() => v.value.length ? Math.round((D.value.documented || 0) / v.value.length * 100) : 0), B = H(() => {
      let n = v.value;
      if (k.value === "documented" ? n = n.filter((t) => !!(t.description || "").trim()) : k.value === "needs-details" && (n = n.filter((t) => !(t.description || "").trim())), m.value) {
        const t = m.value.toLowerCase();
        n = n.filter(
          (s) => (s.department_name || s.name || "").toLowerCase().includes(t) || (s.description || "").toLowerCase().includes(t)
        );
      }
      return n;
    }), N = H(() => {
      const n = S.value, t = x.value;
      return [...B.value].sort((s, b) => {
        let g = s[n] ?? "", f = b[n] ?? "";
        return n === "status" && (g = s.description ? "Documented" : "Missing Details", f = b.description ? "Documented" : "Missing Details"), typeof g == "number" || typeof f == "number" ? ((parseFloat(g) || 0) - (parseFloat(f) || 0)) * t : String(g).localeCompare(String(f), void 0, { numeric: !0 }) * t;
      });
    }), W = H(() => {
      const n = (y.value - 1) * o.value, t = n + o.value;
      return N.value.slice(n, t);
    });
    function U(n) {
      S.value === n ? x.value *= -1 : (S.value = n, x.value = 1);
    }
    function R(n) {
      return S.value !== n ? "" : x.value === 1 ? "&#9650;" : "&#9660;";
    }
    function X(n) {
      return n.description ? "status-active" : "status-draft";
    }
    async function E() {
      i.value = !0;
      try {
        const n = await de("Department", {
          fields: ["name", "department_name", "description", "owner", "creation", "modified_by", "modified"],
          order: "department_name asc",
          limit: 500
        });
        v.value = n || [];
      } catch (n) {
        h.error("Failed to load departments: " + n.message), v.value = [];
      } finally {
        i.value = !1;
      }
    }
    function O() {
      T.value = !1, V.value = null, p.value = !0;
    }
    function F(n) {
      T.value = !0, V.value = n, p.value = !0;
    }
    function Y() {
      p.value = !1;
    }
    async function Z(n) {
      try {
        const t = {
          doctype: "Department",
          ...n
        };
        (!T.value || !t.name) && delete t.name, await ue(t), h.success(T.value ? "Department updated" : "Department created"), p.value = !1, await E();
      } catch (t) {
        h.error("Failed to save department: " + t.message);
      }
    }
    async function ee(n) {
      await M({
        title: "Delete Department",
        body: `Are you sure you want to delete department ${n.department_name || n.name}?`,
        okLabel: "Delete",
        okStyle: "danger"
      }) && await te(n.name);
    }
    async function te(n) {
      try {
        await ce("Department", n), h.success("Department deleted"), await E();
      } catch (t) {
        h.error("Failed to delete department: " + t.message);
      }
    }
    function se() {
      const n = ["Department Name", "Description"], t = B.value.map(($) => [$.department_name || $.name, $.description || ""]), s = [n, ...t].map(($) => $.map((ne) => `"${String(ne ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), b = new Blob([s], { type: "text/csv;charset=utf-8;" }), g = URL.createObjectURL(b), f = document.createElement("a");
      f.href = g, f.download = "departments.csv", f.click(), URL.revokeObjectURL(g);
    }
    return ie(E), (n, t) => (d(), r("div", Me, [
      e("div", Te, [
        e("div", $e, [
          e("span", {
            innerHTML: l(c)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, He),
          z(e("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (s) => m.value = s),
            placeholder: "Search departments...",
            class: "sales-search-input"
          }, null, 512), [
            [A, m.value]
          ])
        ]),
        e("div", we, [
          (d(), r(C, null, j(q, (s) => e("button", {
            key: s.key,
            class: I(["sales-pill", { active: k.value === s.key, ["pill-" + s.key]: s.key !== "all" }]),
            onClick: (b) => k.value = s.key
          }, [
            _(a(s.label) + " ", 1),
            s.key !== "all" ? (d(), r("span", xe, a(D.value[s.key]), 1)) : w("", !0)
          ], 10, Se)), 64))
        ]),
        e("div", Ne, [
          e("button", {
            class: "sales-btn-ghost",
            onClick: E,
            title: "Refresh",
            disabled: i.value
          }, [
            e("span", {
              innerHTML: l(c)("refresh", 14)
            }, null, 8, Fe)
          ], 8, Ee),
          e("button", {
            class: "sales-btn-ghost",
            onClick: se,
            title: "Export CSV",
            disabled: !B.value.length
          }, [
            e("span", {
              innerHTML: l(c)("download", 14)
            }, null, 8, Be),
            t[10] || (t[10] = _(" CSV", -1))
          ], 8, Ve),
          e("button", {
            class: "sales-btn-primary",
            disabled: !n.$canCreate("inventory"),
            title: n.$canCreate("inventory") ? "" : "Read-only access",
            onClick: O
          }, [
            e("span", {
              innerHTML: l(c)("plus", 13)
            }, null, 8, Re),
            t[11] || (t[11] = _(" New Department", -1))
          ], 8, Ue)
        ])
      ]),
      e("div", je, [
        e("div", {
          class: "bk-kpi-card bk-kpi-accent clickable",
          onClick: t[1] || (t[1] = (s) => k.value = "all")
        }, [
          e("div", ze, [
            e("div", Ae, [
              e("span", {
                innerHTML: l(c)("file", 22)
              }, null, 8, qe)
            ]),
            e("div", Oe, [
              t[12] || (t[12] = e("div", { class: "bk-kpi-label" }, "Total Departments", -1)),
              e("div", Ie, a(v.value.length), 1),
              t[13] || (t[13] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "registered teams", -1))
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card bk-kpi-success clickable",
          onClick: t[2] || (t[2] = (s) => k.value = "documented")
        }, [
          e("div", Ke, [
            e("div", Pe, [
              e("span", {
                innerHTML: l(c)("check", 22)
              }, null, 8, Ge)
            ]),
            e("div", Je, [
              t[14] || (t[14] = e("div", { class: "bk-kpi-label" }, "Documented", -1)),
              e("div", Qe, a(D.value.documented || 0), 1),
              t[15] || (t[15] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "with description", -1))
            ])
          ])
        ]),
        e("div", {
          class: "bk-kpi-card bk-kpi-warn clickable",
          onClick: t[3] || (t[3] = (s) => k.value = "needs-details")
        }, [
          e("div", We, [
            e("div", Xe, [
              e("span", {
                innerHTML: l(c)("edit", 22)
              }, null, 8, Ye)
            ]),
            e("div", Ze, [
              t[16] || (t[16] = e("div", { class: "bk-kpi-label" }, "Needs Details", -1)),
              e("div", et, a(D.value["needs-details"] || 0), 1),
              t[17] || (t[17] = e("div", { class: "bk-kpi-trend bk-trend-neutral" }, "missing description", -1))
            ])
          ])
        ])
      ]),
      e("div", tt, [
        e("div", st, [
          e("div", nt, [
            e("div", null, [
              t[18] || (t[18] = e("div", { class: "bk-stat-label" }, "Departments", -1)),
              e("div", at, a(v.value.length), 1)
            ]),
            e("div", it, [
              e("span", {
                innerHTML: l(c)("users", 18)
              }, null, 8, lt)
            ])
          ])
        ]),
        e("div", ot, [
          e("div", dt, [
            e("div", null, [
              t[19] || (t[19] = e("div", { class: "bk-stat-label" }, "Documented", -1)),
              e("div", rt, a(D.value.documented || 0), 1)
            ]),
            e("div", ct, [
              e("span", {
                innerHTML: l(c)("check", 18)
              }, null, 8, ut)
            ])
          ])
        ]),
        e("div", pt, [
          e("div", vt, [
            e("div", null, [
              t[20] || (t[20] = e("div", { class: "bk-stat-label" }, "Needs Details", -1)),
              e("div", mt, a(D.value["needs-details"] || 0), 1)
            ]),
            e("div", kt, [
              e("span", {
                innerHTML: l(c)("edit", 18)
              }, null, 8, bt)
            ])
          ])
        ]),
        e("div", _t, [
          e("div", yt, [
            e("div", null, [
              t[21] || (t[21] = e("div", { class: "bk-stat-label" }, "Coverage", -1)),
              e("div", ft, a(Q.value) + "%", 1)
            ]),
            e("div", ht, [
              e("span", {
                innerHTML: l(c)("percent", 18)
              }, null, 8, gt)
            ])
          ])
        ])
      ]),
      e("div", Dt, [
        e("table", Ct, [
          e("thead", null, [
            e("tr", null, [
              e("th", {
                class: "sortable",
                onClick: t[4] || (t[4] = (s) => U("department_name"))
              }, [
                t[22] || (t[22] = _("Department Name ", -1)),
                e("span", {
                  innerHTML: R("department_name")
                }, null, 8, Lt)
              ]),
              e("th", {
                class: "sortable",
                onClick: t[5] || (t[5] = (s) => U("description"))
              }, [
                t[23] || (t[23] = _("Description ", -1)),
                e("span", {
                  innerHTML: R("description")
                }, null, 8, Mt)
              ]),
              e("th", {
                class: "sortable",
                onClick: t[6] || (t[6] = (s) => U("status"))
              }, [
                t[24] || (t[24] = _("Status ", -1)),
                e("span", {
                  innerHTML: R("status")
                }, null, 8, Tt)
              ]),
              t[25] || (t[25] = e("th", { style: { width: "110px", "text-align": "center" } }, "Actions", -1))
            ])
          ]),
          e("tbody", null, [
            i.value ? (d(), r(C, { key: 0 }, j(5, (s) => e("tr", { key: s }, [...t[26] || (t[26] = [
              e("td", { colspan: "4" }, [
                e("div", { class: "shimmer" })
              ], -1)
            ])])), 64)) : N.value.length ? (d(!0), r(C, { key: 2 }, j(W.value, (s) => (d(), r("tr", {
              key: s.name,
              class: "inv-row"
            }, [
              e("td", {
                onClick: (b) => F(s),
                "data-label": "Department Name"
              }, [
                e("span", Et, a(s.department_name || s.name), 1),
                e("div", Ft, a(s.name), 1)
              ], 8, Nt),
              e("td", {
                onClick: (b) => F(s),
                "data-label": "Description",
                style: { "max-width": "320px", overflow: "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" },
                title: s.description || ""
              }, [
                s.description ? (d(), r("span", Bt, a(s.description), 1)) : (d(), r("span", Ut, "—"))
              ], 8, Vt),
              e("td", {
                onClick: (b) => F(s),
                "data-label": "Status"
              }, [
                e("span", {
                  class: I(["inv-status-badge", X(s)])
                }, a(s.description ? "Documented" : "Missing Details"), 3)
              ], 8, Rt),
              e("td", {
                style: { "text-align": "center", "white-space": "nowrap" },
                onClick: t[7] || (t[7] = J(() => {
                }, ["stop"]))
              }, [
                e("button", {
                  class: "inv-act-btn",
                  onClick: (b) => F(s),
                  disabled: !n.$canEdit("inventory"),
                  title: "Edit"
                }, [
                  e("span", {
                    innerHTML: l(c)("edit", 13)
                  }, null, 8, zt)
                ], 8, jt),
                e("button", {
                  class: "inv-act-btn",
                  style: { color: "#dc2626" },
                  onClick: (b) => ee(s),
                  disabled: !n.$canDelete("inventory"),
                  title: "Delete"
                }, [
                  e("span", {
                    innerHTML: l(c)("trash", 13)
                  }, null, 8, qt)
                ], 8, At)
              ])
            ]))), 128)) : (d(), r("tr", $t, [
              e("td", Ht, [
                e("div", wt, [
                  m.value || k.value !== "all" ? (d(), r(C, { key: 0 }, [
                    t[27] || (t[27] = e("svg", {
                      width: "44",
                      height: "44",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "#cbd5e1",
                      "stroke-width": "1.3"
                    }, [
                      e("circle", {
                        cx: "11",
                        cy: "11",
                        r: "8"
                      }),
                      e("line", {
                        x1: "21",
                        y1: "21",
                        x2: "16.65",
                        y2: "16.65"
                      })
                    ], -1)),
                    t[28] || (t[28] = e("p", { class: "bk-empty-title" }, "No departments match your filters", -1))
                  ], 64)) : (d(), r(C, { key: 1 }, [
                    t[30] || (t[30] = e("p", { class: "bk-empty-title" }, "No departments yet", -1)),
                    t[31] || (t[31] = e("p", { class: "bk-empty-sub" }, "Create your first department to get started.", -1)),
                    e("button", {
                      class: "bk-empty-btn",
                      disabled: !n.$canCreate("inventory"),
                      title: n.$canCreate("inventory") ? "" : "Read-only access",
                      onClick: O
                    }, [
                      e("span", {
                        innerHTML: l(c)("plus", 13)
                      }, null, 8, xt),
                      t[29] || (t[29] = _(" New Department", -1))
                    ], 8, St)
                  ], 64))
                ])
              ])
            ]))
          ])
        ])
      ]),
      !i.value && N.value.length ? (d(), r("div", Ot, [
        le(pe, {
          page: y.value,
          "onUpdate:page": t[8] || (t[8] = (s) => y.value = s),
          "page-size": o.value,
          "onUpdate:pageSize": t[9] || (t[9] = (s) => o.value = s),
          "total-items": N.value.length
        }, null, 8, ["page", "page-size", "total-items"])
      ])) : w("", !0),
      p.value ? (d(), oe(Le, {
        key: 1,
        "is-edit": T.value,
        department: V.value,
        onClose: Y,
        onSave: Z
      }, null, 8, ["is-edit", "department"])) : w("", !0)
    ]));
  }
}, Qt = /* @__PURE__ */ G(It, [["__scopeId", "data-v-7382a550"]]);
export {
  Qt as default
};
