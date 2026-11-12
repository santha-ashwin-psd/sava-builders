import { _ as he, x as Le, o as Ce, m as Me, c as i, a as t, u as d, i as m, w as h, A as w, F as D, r as R, d as p, D as Te, b as y, q as B, t as v, $ as He, n as g, p as we, e as X, f as re, l as De, h as r, g as L, k as u, a2 as Se, K as xe, a3 as je } from "./main-PwobzNtN.js";
import { u as Ee } from "./useProjectOptions-R76K5EFy.js";
import { P as $e } from "./Pagination-CVfh_mFr.js";
const Ae = { class: "list-page em-page" }, Ne = { class: "em-toolbar" }, Ue = { class: "em-search" }, Ie = ["innerHTML"], Ve = {
  class: "em-tabs",
  role: "tablist"
}, Fe = ["aria-selected", "onClick"], Oe = {
  key: 0,
  class: "em-tab-count"
}, Pe = { class: "em-actions" }, Re = ["disabled"], Be = ["innerHTML"], ze = ["disabled"], Ke = ["innerHTML"], qe = ["disabled", "title"], Ge = ["innerHTML"], Je = { class: "em-card-table" }, Qe = { class: "em-scroll" }, We = { class: "em-tbl" }, Xe = ["innerHTML"], Ye = ["innerHTML"], Ze = ["innerHTML"], et = ["innerHTML"], tt = ["innerHTML"], st = ["innerHTML"], nt = { key: 1 }, lt = {
  colspan: "7",
  class: "em-empty"
}, at = ["disabled"], ot = ["innerHTML"], it = ["onClick"], rt = { class: "em-id" }, ut = ["onClick"], dt = ["onClick"], mt = ["onClick"], ct = ["onClick"], pt = ["onClick"], vt = ["onClick", "disabled"], ft = ["innerHTML"], bt = ["onClick", "disabled", "title"], yt = ["innerHTML"], gt = {
  key: 0,
  class: "em-foot"
}, _t = {
  class: "em-card",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "em-dlg-title"
}, kt = { class: "em-head" }, ht = ["innerHTML"], Lt = { class: "em-head-text" }, Ct = {
  id: "em-dlg-title",
  class: "em-title"
}, Mt = { class: "em-subtitle" }, Tt = ["innerHTML"], Ht = { class: "em-group" }, wt = { class: "em-field" }, Dt = ["innerHTML"], St = { class: "em-group" }, xt = { class: "em-field" }, jt = ["innerHTML"], Et = { class: "em-row-2" }, $t = { class: "em-group" }, At = { class: "em-field" }, Nt = { class: "em-group" }, Ut = { class: "em-field" }, It = ["innerHTML"], Vt = { class: "em-group" }, Ft = { style: { display: "flex", "align-items": "center", gap: "8px", cursor: "pointer", "font-weight": "600" } }, Ot = {
  key: 0,
  class: "em-group"
}, Pt = { class: "em-field" }, Rt = ["innerHTML"], Bt = { class: "em-group" }, zt = ["innerHTML"], Kt = ["aria-expanded"], qt = { class: "em-group" }, Gt = ["aria-expanded"], Jt = { class: "em-form-actions" }, Qt = ["disabled"], Wt = ["innerHTML"], Xt = ["aria-selected", "aria-disabled", "onMouseenter", "onClick"], Yt = { class: "em-dd-label" }, Zt = ["innerHTML"], es = {
  __name: "Employees",
  setup(ts) {
    const { toast: C } = Le(), { confirm: ue } = je(), { projects: Y, fetchProjects: Z } = Ee(), S = r([]), x = r(!1), $ = r(""), M = r("all"), z = r(1), A = r(25), N = r("employee_name"), U = r(1), j = r(!1), _ = r(!1), I = r(!1), a = r(q()), E = r({}), K = r({}), de = L(() => Object.entries(E.value).map(([s, e]) => ({ value: s, label: e || s })).sort((s, e) => s.label.localeCompare(e.label))), me = L(() => new Set(S.value.map((s) => s.user).filter(Boolean))), ce = [
      { key: "all", label: "All" },
      { key: "Active", label: "Active" },
      { key: "Inactive", label: "Inactive" }
    ];
    function q() {
      return { employee_name: "", designation: "", department: "", id_no: "", project: "", user: "", status: "Active", is_driver: 0, truck_no: "" };
    }
    const pe = L(() => {
      const s = { Active: 0, Inactive: 0 };
      for (const e of S.value) s[e.status === "Inactive" ? "Inactive" : "Active"]++;
      return s;
    });
    function G(s) {
      return s ? K.value[s] || s : "—";
    }
    const J = L(() => {
      let s = S.value;
      M.value !== "all" && (s = s.filter((n) => (n.status || "Active") === M.value));
      const e = $.value.trim().toLowerCase();
      return e && (s = s.filter((n) => (n.name || "").toLowerCase().includes(e) || (n.employee_name || "").toLowerCase().includes(e) || (n.designation || "").toLowerCase().includes(e) || (n.department || "").toLowerCase().includes(e) || G(n.project).toLowerCase().includes(e) || (n.user || "").toLowerCase().includes(e))), s;
    }), V = L(() => {
      const s = N.value, e = U.value;
      return [...J.value].sort((n, l) => String(n[s] ?? "").localeCompare(String(l[s] ?? ""), void 0, { numeric: !0 }) * e);
    }), ve = L(() => {
      const s = (z.value - 1) * A.value;
      return V.value.slice(s, s + A.value);
    });
    function T(s) {
      N.value === s ? U.value *= -1 : (N.value = s, U.value = 1);
    }
    function H(s) {
      return N.value !== s ? "" : U.value === 1 ? "&#9650;" : "&#9660;";
    }
    async function F() {
      x.value = !0;
      try {
        const s = await X();
        S.value = await re("Employee", {
          fields: ["name", "employee_name", "designation", "department", "project", "user", "status", "company", "is_driver", "truck_no", "id_no"],
          filters: s ? [["company", "=", s]] : [],
          order: "employee_name asc",
          limit: 1e3
        }) || [];
      } catch (s) {
        C.error("Failed to load employees: " + s.message), S.value = [];
      } finally {
        x.value = !1;
      }
    }
    async function fe() {
      try {
        const s = await X(), e = await re("Project", {
          fields: ["name", "project_code", "project_name"],
          filters: s ? [["company", "=", s]] : [],
          limit: 500
        }) || [], n = {};
        for (const l of e) n[l.name] = `${l.project_code || l.name} — ${l.project_name || ""}`.trim();
        K.value = n;
      } catch {
        K.value = {};
      }
    }
    async function be() {
      try {
        E.value = await De("psd_books.api.admin.get_company_user_names") || {};
      } catch {
        E.value = {};
      }
    }
    async function ee() {
      _.value = !1, a.value = q(), await Z("", ""), j.value = !0;
    }
    async function k(s) {
      _.value = !0, a.value = {
        ...q(),
        ...s,
        designation: s.designation || "",
        department: s.department || "",
        id_no: s.id_no || "",
        project: s.project || "",
        user: s.user || "",
        status: s.status || "Active",
        is_driver: s.is_driver ? 1 : 0,
        truck_no: s.truck_no || ""
      }, await Z("", s.project || ""), j.value = !0;
    }
    function Q() {
      o.value = null, j.value = !1;
    }
    const o = r(null), te = r({}), f = r(-1), O = L(() => {
      const s = o.value;
      return s === "project" ? [{ value: "", label: "— Select —" }, ...Y.value.map((e) => ({ value: e.value, label: e.label }))] : s === "user" ? [{ value: "", label: "— No login —" }, ...de.value.map((e) => {
        const n = e.value !== a.value.user && me.value.has(e.value);
        return { value: e.value, label: e.label + (n ? " (already linked)" : ""), disabled: n };
      })] : s === "status" ? [{ value: "Active", label: "Active", dot: "is-active" }, { value: "Inactive", label: "Inactive", dot: "is-inactive" }] : [];
    });
    function se(s) {
      var n;
      const e = a.value[s];
      return s === "status" ? e || "Active" : s === "project" ? e ? ((n = Y.value.find((l) => l.value === e)) == null ? void 0 : n.label) || G(e) : "— Select —" : s === "user" ? e ? E.value[e] || e : "— No login —" : e || "";
    }
    function W(s, e) {
      if (o.value === s) {
        o.value = null;
        return;
      }
      const l = e.currentTarget.closest(".em-field").getBoundingClientRect(), b = 260, c = window.innerHeight - l.bottom - 12, P = c < Math.min(b, 180) && l.top > c;
      te.value = {
        left: l.left + "px",
        width: l.width + "px",
        maxHeight: Math.max(120, Math.min(b, P ? l.top - 12 : c)) + "px",
        ...P ? { bottom: window.innerHeight - l.top + 6 + "px" } : { top: l.bottom + 6 + "px" }
      }, o.value = s;
      const ie = O.value.findIndex((ke) => String(ke.value) === String(a.value[s] ?? ""));
      f.value = ie >= 0 ? ie : 0;
    }
    function ne(s) {
      s.disabled || (a.value[o.value] = s.value, o.value = null);
    }
    function le(s, e) {
      if (o.value !== s) {
        ["ArrowDown", "ArrowUp"].includes(e.key) && (e.preventDefault(), W(s, e));
        return;
      }
      const n = O.value.length;
      if (e.key === "ArrowDown")
        e.preventDefault(), f.value = (f.value + 1) % n;
      else if (e.key === "ArrowUp")
        e.preventDefault(), f.value = (f.value - 1 + n) % n;
      else if (e.key === "Enter") {
        e.preventDefault();
        const l = O.value[f.value];
        l && ne(l);
      } else e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), o.value = null) : e.key === "Tab" && (o.value = null);
    }
    function ae(s) {
      o.value && !s.target.closest(".em-dd") && !s.target.closest(".em-field-select") && (o.value = null);
    }
    function oe(s) {
      o.value && !(s.target.closest && s.target.closest(".em-dd")) && (o.value = null);
    }
    async function ye() {
      const s = a.value;
      if (s.is_driver && !(s.truck_no || "").trim()) {
        C.error("Truck Number is required for a driver");
        return;
      }
      I.value = !0;
      try {
        const e = {
          doctype: "Employee",
          employee_name: (s.employee_name || "").trim(),
          designation: (s.designation || "").trim() || null,
          department: (s.department || "").trim() || null,
          id_no: (s.id_no || "").trim() || null,
          project: s.project || null,
          user: s.user || null,
          status: s.status || "Active",
          is_driver: s.is_driver ? 1 : 0,
          truck_no: s.is_driver ? (s.truck_no || "").trim().toUpperCase() : null
        };
        _.value ? e.name = s.name : e.company = await X(), await xe(e), C.success(_.value ? "Employee updated" : "Employee created"), j.value = !1, await F();
      } catch (e) {
        C.error("Failed to save employee: " + e.message);
      } finally {
        I.value = !1;
      }
    }
    async function ge(s) {
      if (await ue({
        title: "Delete employee?",
        body: `Delete ${s.employee_name} (${s.name})? This can't be undone. Mark the employee Inactive instead if they have left.`,
        okLabel: "Delete",
        okStyle: "danger"
      }))
        try {
          await Se("Employee", s.name), C.success("Employee deleted"), await F();
        } catch (n) {
          C.error("Failed to delete employee: " + n.message);
        }
    }
    function _e() {
      const s = ["ID", "Name", "Designation", "Department", "Project", "Login User", "Status"], e = J.value.map((c) => [
        c.name,
        c.employee_name,
        c.designation || "",
        c.department || "",
        c.project ? G(c.project) : "",
        c.user || "",
        c.status || "Active"
      ]), n = [s, ...e].map((c) => c.map((P) => `"${String(P ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), l = URL.createObjectURL(new Blob([n], { type: "text/csv;charset=utf-8;" })), b = document.createElement("a");
      b.href = l, b.download = "employees.csv", b.click(), URL.revokeObjectURL(l);
    }
    return Ce(() => {
      F(), fe(), be(), document.addEventListener("mousedown", ae), window.addEventListener("scroll", oe, !0), window.addEventListener("resize", () => {
        o.value = null;
      });
    }), Me(() => {
      document.removeEventListener("mousedown", ae), window.removeEventListener("scroll", oe, !0);
    }), (s, e) => (u(), i("div", Ae, [
      t("div", Ne, [
        t("label", Ue, [
          t("span", {
            innerHTML: d(m)("search", 16),
            class: "em-search-ico"
          }, null, 8, Ie),
          h(t("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (n) => $.value = n),
            placeholder: "Search employees...",
            class: "em-search-input",
            "aria-label": "Search employees"
          }, null, 512), [
            [w, $.value]
          ])
        ]),
        t("div", Ve, [
          (u(), i(D, null, R(ce, (n) => t("button", {
            key: n.key,
            type: "button",
            role: "tab",
            class: g(["em-tab", { active: M.value === n.key }]),
            "aria-selected": M.value === n.key,
            onClick: (l) => M.value = n.key
          }, [
            p(v(n.label) + " ", 1),
            n.key !== "all" ? (u(), i("span", Oe, v(pe.value[n.key] || 0), 1)) : y("", !0)
          ], 10, Fe)), 64))
        ]),
        t("div", Pe, [
          t("button", {
            type: "button",
            class: "em-btn em-btn-icon",
            onClick: F,
            title: "Refresh",
            "aria-label": "Refresh",
            disabled: x.value
          }, [
            t("span", {
              innerHTML: d(m)("refresh", 16)
            }, null, 8, Be)
          ], 8, Re),
          t("button", {
            type: "button",
            class: "em-btn em-btn-ghost",
            onClick: _e,
            disabled: !J.value.length
          }, [
            t("span", {
              innerHTML: d(m)("download", 16)
            }, null, 8, Ke),
            e[23] || (e[23] = p(" Export CSV ", -1))
          ], 8, ze),
          t("button", {
            type: "button",
            class: "em-btn em-btn-primary",
            disabled: !s.$canCreate("admin"),
            title: s.$canCreate("admin") ? "" : "Read-only access",
            onClick: ee
          }, [
            t("span", {
              innerHTML: d(m)("plus", 16)
            }, null, 8, Ge),
            e[24] || (e[24] = p(" New Employee ", -1))
          ], 8, qe)
        ])
      ]),
      t("div", Je, [
        t("div", Qe, [
          t("table", We, [
            t("thead", null, [
              t("tr", null, [
                t("th", {
                  class: "sortable",
                  onClick: e[1] || (e[1] = (n) => T("name"))
                }, [
                  e[25] || (e[25] = p("ID ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: H("name")
                  }, null, 8, Xe)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[2] || (e[2] = (n) => T("employee_name"))
                }, [
                  e[26] || (e[26] = p("Name ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: H("employee_name")
                  }, null, 8, Ye)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[3] || (e[3] = (n) => T("designation"))
                }, [
                  e[27] || (e[27] = p("Designation ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: H("designation")
                  }, null, 8, Ze)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[4] || (e[4] = (n) => T("department"))
                }, [
                  e[28] || (e[28] = p("Department ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: H("department")
                  }, null, 8, et)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[5] || (e[5] = (n) => T("user"))
                }, [
                  e[29] || (e[29] = p("Login User ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: H("user")
                  }, null, 8, tt)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[6] || (e[6] = (n) => T("status"))
                }, [
                  e[30] || (e[30] = p("Status ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: H("status")
                  }, null, 8, st)
                ]),
                e[31] || (e[31] = t("th", { class: "em-th-actions" }, "Actions", -1))
              ])
            ]),
            t("tbody", null, [
              x.value ? (u(), i(D, { key: 0 }, R(5, (n) => t("tr", {
                key: n,
                class: "em-skel"
              }, [...e[32] || (e[32] = [
                t("td", { colspan: "7" }, [
                  t("div", { class: "shimmer" })
                ], -1)
              ])])), 64)) : V.value.length ? (u(!0), i(D, { key: 2 }, R(ve.value, (n) => (u(), i("tr", {
                key: n.name,
                class: "em-row"
              }, [
                t("td", {
                  onClick: (l) => k(n),
                  "data-label": "ID"
                }, [
                  t("span", rt, v(n.name), 1)
                ], 8, it),
                t("td", {
                  onClick: (l) => k(n),
                  "data-label": "Name",
                  class: "em-name"
                }, v(n.employee_name), 9, ut),
                t("td", {
                  onClick: (l) => k(n),
                  "data-label": "Designation"
                }, v(n.designation || "—"), 9, dt),
                t("td", {
                  onClick: (l) => k(n),
                  "data-label": "Department"
                }, v(n.department || "—"), 9, mt),
                t("td", {
                  onClick: (l) => k(n),
                  "data-label": "Login User"
                }, v(n.user ? E.value[n.user] || n.user : "—"), 9, ct),
                t("td", {
                  onClick: (l) => k(n),
                  "data-label": "Status"
                }, [
                  t("span", {
                    class: g(["em-status", n.status === "Inactive" ? "is-inactive" : "is-active"])
                  }, v(n.status || "Active"), 3)
                ], 8, pt),
                t("td", {
                  class: "em-td-actions",
                  onClick: e[7] || (e[7] = B(() => {
                  }, ["stop"]))
                }, [
                  t("button", {
                    type: "button",
                    class: "em-act",
                    onClick: (l) => k(n),
                    disabled: !s.$canEdit("admin"),
                    title: "Edit",
                    "aria-label": "Edit employee"
                  }, [
                    t("span", {
                      innerHTML: d(m)("edit", 16)
                    }, null, 8, ft)
                  ], 8, vt),
                  t("button", {
                    type: "button",
                    class: "em-act em-act-del",
                    onClick: (l) => ge(n),
                    disabled: !s.$canDelete("admin"),
                    title: s.$canDelete("admin") ? "Delete" : "Not permitted",
                    "aria-label": "Delete employee"
                  }, [
                    t("span", {
                      innerHTML: d(m)("trash", 16)
                    }, null, 8, yt)
                  ], 8, bt)
                ])
              ]))), 128)) : (u(), i("tr", nt, [
                t("td", lt, [
                  $.value || M.value !== "all" ? (u(), i(D, { key: 0 }, [
                    e[33] || (e[33] = t("p", { class: "em-empty-title" }, "No employees match your filters", -1)),
                    e[34] || (e[34] = t("p", { class: "em-empty-sub" }, "Try a different search or switch the status filter.", -1))
                  ], 64)) : (u(), i(D, { key: 1 }, [
                    e[36] || (e[36] = t("p", { class: "em-empty-title" }, "No employees yet", -1)),
                    e[37] || (e[37] = t("p", { class: "em-empty-sub" }, "Add your first employee to get started.", -1)),
                    t("button", {
                      type: "button",
                      class: "em-btn em-btn-primary",
                      disabled: !s.$canCreate("admin"),
                      onClick: ee
                    }, [
                      t("span", {
                        innerHTML: d(m)("plus", 16)
                      }, null, 8, ot),
                      e[35] || (e[35] = p(" New Employee ", -1))
                    ], 8, at)
                  ], 64))
                ])
              ]))
            ])
          ])
        ]),
        !x.value && V.value.length ? (u(), i("div", gt, [
          Te($e, {
            page: z.value,
            "onUpdate:page": e[8] || (e[8] = (n) => z.value = n),
            "page-size": A.value,
            "onUpdate:pageSize": e[9] || (e[9] = (n) => A.value = n),
            "total-items": V.value.length
          }, null, 8, ["page", "page-size", "total-items"])
        ])) : y("", !0)
      ]),
      j.value ? (u(), i("div", {
        key: 0,
        class: "em-overlay",
        onClick: B(Q, ["self"])
      }, [
        t("div", _t, [
          t("div", kt, [
            t("span", {
              class: "em-head-ico",
              innerHTML: d(m)("user", 22)
            }, null, 8, ht),
            t("div", Lt, [
              t("h3", Ct, v(_.value ? "Edit Employee" : "New Employee"), 1),
              t("p", Mt, v(_.value ? "Update the employee details" : "Add a new employee to your company"), 1)
            ]),
            t("button", {
              type: "button",
              class: "em-close",
              onClick: Q,
              "aria-label": "Close"
            }, [
              t("span", {
                innerHTML: d(m)("x", 20)
              }, null, 8, Tt)
            ])
          ]),
          t("form", {
            class: "em-body",
            onSubmit: B(ye, ["prevent"])
          }, [
            t("div", Ht, [
              e[38] || (e[38] = t("label", { for: "em-f-name" }, [
                p("Employee Name "),
                t("span", { class: "em-req" }, "*")
              ], -1)),
              t("div", wt, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: d(m)("user", 16)
                }, null, 8, Dt),
                h(t("input", {
                  id: "em-f-name",
                  "onUpdate:modelValue": e[10] || (e[10] = (n) => a.value.employee_name = n),
                  required: "",
                  maxlength: "140",
                  placeholder: "Full name"
                }, null, 512), [
                  [w, a.value.employee_name]
                ])
              ])
            ]),
            t("div", St, [
              e[39] || (e[39] = t("label", { for: "em-f-idno" }, "ID No.", -1)),
              t("div", xt, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: d(m)("user", 16)
                }, null, 8, jt),
                h(t("input", {
                  id: "em-f-idno",
                  "onUpdate:modelValue": e[11] || (e[11] = (n) => a.value.id_no = n),
                  maxlength: "140",
                  placeholder: "ID number"
                }, null, 512), [
                  [w, a.value.id_no]
                ])
              ])
            ]),
            t("div", Et, [
              t("div", $t, [
                e[41] || (e[41] = t("label", { for: "em-f-desig" }, "Designation", -1)),
                t("div", At, [
                  e[40] || (e[40] = t("span", { class: "em-field-ico" }, [
                    t("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      t("rect", {
                        x: "2",
                        y: "7",
                        width: "20",
                        height: "14",
                        rx: "2"
                      }),
                      t("path", { d: "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" })
                    ])
                  ], -1)),
                  h(t("input", {
                    id: "em-f-desig",
                    "onUpdate:modelValue": e[12] || (e[12] = (n) => a.value.designation = n),
                    maxlength: "140",
                    placeholder: "e.g. Store Keeper"
                  }, null, 512), [
                    [w, a.value.designation]
                  ])
                ])
              ]),
              t("div", Nt, [
                e[42] || (e[42] = t("label", { for: "em-f-dept" }, "Department", -1)),
                t("div", Ut, [
                  t("span", {
                    class: "em-field-ico",
                    innerHTML: d(m)("building", 16)
                  }, null, 8, It),
                  h(t("input", {
                    id: "em-f-dept",
                    "onUpdate:modelValue": e[13] || (e[13] = (n) => a.value.department = n),
                    maxlength: "140",
                    placeholder: "e.g. Stores"
                  }, null, 512), [
                    [w, a.value.department]
                  ])
                ])
              ])
            ]),
            t("div", Vt, [
              t("label", Ft, [
                h(t("input", {
                  type: "checkbox",
                  "onUpdate:modelValue": e[14] || (e[14] = (n) => a.value.is_driver = n),
                  style: { width: "16px", height: "16px" }
                }, null, 512), [
                  [He, a.value.is_driver]
                ]),
                e[43] || (e[43] = p(" Is Driver ", -1))
              ])
            ]),
            a.value.is_driver ? (u(), i("div", Ot, [
              e[44] || (e[44] = t("label", { for: "em-f-truck" }, [
                p("Truck Number "),
                t("span", { class: "em-req" }, "*")
              ], -1)),
              t("div", Pt, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: d(m)("truck", 16)
                }, null, 8, Rt),
                h(t("input", {
                  id: "em-f-truck",
                  "onUpdate:modelValue": e[15] || (e[15] = (n) => a.value.truck_no = n),
                  maxlength: "140",
                  placeholder: "e.g. KDA 123A"
                }, null, 512), [
                  [w, a.value.truck_no]
                ])
              ])
            ])) : y("", !0),
            y("", !0),
            t("div", Bt, [
              e[47] || (e[47] = t("label", { for: "em-f-user" }, "Login User", -1)),
              t("div", {
                class: g(["em-field em-field-select", { open: o.value === "user" }])
              }, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: d(m)("user", 16)
                }, null, 8, zt),
                t("button", {
                  id: "em-f-user",
                  type: "button",
                  class: g(["em-trigger", { "is-placeholder": !a.value.user }]),
                  "aria-haspopup": "listbox",
                  "aria-expanded": o.value === "user",
                  onClick: e[18] || (e[18] = (n) => W("user", n)),
                  onKeydown: e[19] || (e[19] = (n) => le("user", n))
                }, v(se("user")), 43, Kt)
              ], 2),
              e[48] || (e[48] = t("div", { class: "em-hint" }, "The system user this person logs in as. One employee per user.", -1))
            ]),
            t("div", qt, [
              e[49] || (e[49] = t("label", { for: "em-f-status" }, "Status", -1)),
              t("div", {
                class: g(["em-field em-field-select", { open: o.value === "status" }])
              }, [
                t("span", {
                  class: g(["em-dot", a.value.status === "Inactive" ? "is-inactive" : "is-active"])
                }, null, 2),
                t("button", {
                  id: "em-f-status",
                  type: "button",
                  class: "em-trigger",
                  "aria-haspopup": "listbox",
                  "aria-expanded": o.value === "status",
                  onClick: e[20] || (e[20] = (n) => W("status", n)),
                  onKeydown: e[21] || (e[21] = (n) => le("status", n))
                }, v(se("status")), 41, Gt)
              ], 2)
            ]),
            t("div", Jt, [
              t("button", {
                type: "button",
                class: "em-btn em-btn-ghost",
                onClick: Q
              }, "Cancel"),
              t("button", {
                type: "submit",
                class: "em-btn em-btn-primary",
                disabled: I.value || !(_.value ? s.$canEdit("admin") : s.$canCreate("admin"))
              }, [
                t("span", {
                  innerHTML: d(m)("save", 16)
                }, null, 8, Wt),
                p(" " + v(I.value ? "Saving…" : "Save"), 1)
              ], 8, Qt)
            ])
          ], 32)
        ]),
        o.value ? (u(), i("ul", {
          key: 0,
          class: "em-dd",
          style: we(te.value),
          role: "listbox",
          onMousedown: e[22] || (e[22] = B(() => {
          }, ["prevent"]))
        }, [
          (u(!0), i(D, null, R(O.value, (n, l) => (u(), i("li", {
            key: n.value,
            role: "option",
            class: g(["em-dd-opt", { selected: String(n.value) === String(a.value[o.value] ?? ""), active: l === f.value, disabled: n.disabled }]),
            "aria-selected": String(n.value) === String(a.value[o.value] ?? ""),
            "aria-disabled": !!n.disabled,
            onMouseenter: (b) => f.value = l,
            onClick: (b) => ne(n)
          }, [
            n.dot ? (u(), i("span", {
              key: 0,
              class: g(["em-dot", n.dot])
            }, null, 2)) : y("", !0),
            t("span", Yt, v(n.label), 1),
            String(n.value) === String(a.value[o.value] ?? "") ? (u(), i("span", {
              key: 1,
              class: "em-dd-check",
              innerHTML: d(m)("check", 16)
            }, null, 8, Zt)) : y("", !0)
          ], 42, Xt))), 128))
        ], 36)) : y("", !0)
      ])) : y("", !0)
    ]));
  }
}, as = /* @__PURE__ */ he(es, [["__scopeId", "data-v-05ae9691"]]);
export {
  as as default
};
