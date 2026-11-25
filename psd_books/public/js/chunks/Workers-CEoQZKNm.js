import { _ as me, y as pe, o as ke, m as be, c as o, a as t, u as d, i as c, w as q, B as G, F as w, r as R, d as p, E as fe, b as g, x as V, t as v, n as y, p as ye, e as ne, f as _e, h as r, g as T, k as i, a2 as we, L as ge, a3 as he } from "./main-C6Zyq0K6.js";
import { P as Le } from "./Pagination-Cns-WOfH.js";
const Ce = { class: "list-page em-page" }, Me = { class: "em-toolbar" }, Te = { class: "em-search" }, Se = ["innerHTML"], He = {
  class: "em-tabs",
  role: "tablist"
}, De = ["aria-selected", "onClick"], Ue = {
  key: 0,
  class: "em-tab-count"
}, Ae = { class: "em-actions" }, $e = ["disabled"], xe = ["innerHTML"], Ie = ["disabled"], Ne = ["innerHTML"], Ee = ["disabled", "title"], Ke = ["innerHTML"], We = { class: "em-card-table" }, Fe = { class: "em-scroll" }, Re = { class: "em-tbl" }, Ve = ["innerHTML"], ze = ["innerHTML"], Be = ["innerHTML"], Oe = ["innerHTML"], je = { key: 1 }, Pe = {
  colspan: "5",
  class: "em-empty"
}, qe = ["disabled"], Ge = ["innerHTML"], Je = ["onClick"], Qe = { class: "em-id" }, Xe = ["onClick"], Ye = ["onClick"], Ze = ["onClick"], et = ["onClick", "disabled"], tt = ["innerHTML"], st = ["onClick", "disabled", "title"], lt = ["innerHTML"], nt = {
  key: 0,
  class: "em-foot"
}, at = {
  class: "em-card",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wk-dlg-title"
}, ot = { class: "em-head" }, it = ["innerHTML"], rt = { class: "em-head-text" }, ut = {
  id: "wk-dlg-title",
  class: "em-title"
}, dt = { class: "em-subtitle" }, ct = ["innerHTML"], vt = { class: "em-group" }, mt = { class: "em-field" }, pt = ["innerHTML"], kt = { class: "em-group" }, bt = { class: "em-field" }, ft = ["innerHTML"], yt = { class: "em-group" }, _t = ["innerHTML"], wt = ["aria-expanded"], gt = { class: "em-group" }, ht = ["aria-expanded"], Lt = { class: "em-form-actions" }, Ct = ["disabled"], Mt = ["innerHTML"], Tt = ["aria-selected", "onMouseenter", "onClick"], St = { class: "em-dd-label" }, Ht = ["innerHTML"], J = "Labour Worker", Dt = {
  __name: "Workers",
  setup(Ut) {
    const S = (s) => s === "Skilled" ? "SK" : s === "Unskilled" ? "USK" : s || "", { toast: h } = pe(), { confirm: ae } = he(), H = r([]), L = r(!1), D = r(""), _ = r("all"), z = r(1), U = r(25), A = r("worker_name"), $ = r(1), C = r(!1), f = r(!1), x = r(!1), u = r(B()), oe = [
      { key: "all", label: "All" },
      { key: "Active", label: "Active" },
      { key: "Inactive", label: "Inactive" }
    ];
    function B() {
      return { worker_name: "", id_no: "", skill: "Unskilled", status: "Active" };
    }
    const ie = T(() => {
      const s = { Active: 0, Inactive: 0 };
      for (const e of H.value) s[e.status === "Inactive" ? "Inactive" : "Active"]++;
      return s;
    }), O = T(() => {
      let s = H.value;
      _.value !== "all" && (s = s.filter((l) => (l.status || "Active") === _.value));
      const e = D.value.trim().toLowerCase();
      return e && (s = s.filter((l) => (l.id_no || "").toLowerCase().includes(e) || (l.worker_name || "").toLowerCase().includes(e) || (l.skill || "").toLowerCase().includes(e) || S(l.skill).toLowerCase().includes(e))), s;
    }), I = T(() => {
      const s = A.value, e = $.value;
      return [...O.value].sort((l, n) => String(l[s] ?? "").localeCompare(String(n[s] ?? ""), void 0, { numeric: !0 }) * e);
    }), re = T(() => {
      const s = (z.value - 1) * U.value;
      return I.value.slice(s, s + U.value);
    });
    function N(s) {
      A.value === s ? $.value *= -1 : (A.value = s, $.value = 1);
    }
    function E(s) {
      return A.value !== s ? "" : $.value === 1 ? "&#9650;" : "&#9660;";
    }
    async function K() {
      L.value = !0;
      try {
        const s = await ne();
        H.value = await _e(J, {
          fields: ["name", "worker_name", "id_no", "skill", "status", "company"],
          filters: s ? [["company", "=", s]] : [],
          order: "worker_name asc",
          limit: 1e3
        }) || [];
      } catch (s) {
        h.error("Failed to load workers: " + s.message), H.value = [];
      } finally {
        L.value = !1;
      }
    }
    function Q() {
      f.value = !1, u.value = B(), C.value = !0;
    }
    function M(s) {
      f.value = !0, u.value = { ...B(), ...s, id_no: s.id_no || "", skill: s.skill || "Unskilled", status: s.status || "Active" }, C.value = !0;
    }
    function j() {
      a.value = null, C.value = !1;
    }
    const a = r(null), X = r({}), k = r(-1), W = T(() => {
      const s = a.value;
      return s === "skill" ? [{ value: "Skilled", label: "SK" }, { value: "Unskilled", label: "USK" }] : s === "status" ? [{ value: "Active", label: "Active", dot: "is-active" }, { value: "Inactive", label: "Inactive", dot: "is-inactive" }] : [];
    });
    function Y(s) {
      const e = u.value[s];
      return s === "status" ? e || "Active" : s === "skill" ? S(e || "Unskilled") : e || "";
    }
    function P(s, e) {
      if (a.value === s) {
        a.value = null;
        return;
      }
      const n = e.currentTarget.closest(".em-field").getBoundingClientRect(), b = 260, m = window.innerHeight - n.bottom - 12, F = m < Math.min(b, 180) && n.top > m;
      X.value = {
        left: n.left + "px",
        width: n.width + "px",
        maxHeight: Math.max(120, Math.min(b, F ? n.top - 12 : m)) + "px",
        ...F ? { bottom: window.innerHeight - n.top + 6 + "px" } : { top: n.bottom + 6 + "px" }
      }, a.value = s;
      const le = W.value.findIndex((ve) => String(ve.value) === String(u.value[s] ?? ""));
      k.value = le >= 0 ? le : 0;
    }
    function Z(s) {
      u.value[a.value] = s.value, a.value = null;
    }
    function ee(s, e) {
      if (a.value !== s) {
        ["ArrowDown", "ArrowUp"].includes(e.key) && (e.preventDefault(), P(s, e));
        return;
      }
      const l = W.value.length;
      if (e.key === "ArrowDown")
        e.preventDefault(), k.value = (k.value + 1) % l;
      else if (e.key === "ArrowUp")
        e.preventDefault(), k.value = (k.value - 1 + l) % l;
      else if (e.key === "Enter") {
        e.preventDefault();
        const n = W.value[k.value];
        n && Z(n);
      } else e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), a.value = null) : e.key === "Tab" && (a.value = null);
    }
    function te(s) {
      a.value && !s.target.closest(".em-dd") && !s.target.closest(".em-field-select") && (a.value = null);
    }
    function se(s) {
      a.value && !(s.target.closest && s.target.closest(".em-dd")) && (a.value = null);
    }
    async function ue() {
      const s = u.value;
      x.value = !0;
      try {
        const e = {
          doctype: J,
          worker_name: (s.worker_name || "").trim(),
          id_no: (s.id_no || "").trim() || null,
          skill: s.skill || "Unskilled",
          status: s.status || "Active"
        };
        f.value ? e.name = s.name : e.company = await ne(), await ge(e), h.success(f.value ? "Worker updated" : "Worker created"), C.value = !1, await K();
      } catch (e) {
        h.error("Failed to save worker: " + e.message);
      } finally {
        x.value = !1;
      }
    }
    async function de(s) {
      if (await ae({
        title: "Delete worker?",
        body: `Delete ${s.worker_name} (${s.name})? This can't be undone. A worker already on a wages sheet can't be deleted: mark the worker Inactive instead.`,
        okLabel: "Delete",
        okStyle: "danger"
      }))
        try {
          await we(J, s.name), h.success("Worker deleted"), await K();
        } catch (l) {
          h.error("Failed to delete worker: " + l.message);
        }
    }
    function ce() {
      const s = ["ID No.", "Name", "SK / USK", "Status"], e = O.value.map((m) => [m.id_no || "", m.worker_name, S(m.skill), m.status || "Active"]), l = [s, ...e].map((m) => m.map((F) => `"${String(F ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), n = URL.createObjectURL(new Blob([l], { type: "text/csv;charset=utf-8;" })), b = document.createElement("a");
      b.href = n, b.download = "workers.csv", b.click(), URL.revokeObjectURL(n);
    }
    return ke(() => {
      K(), document.addEventListener("mousedown", te), window.addEventListener("scroll", se, !0), window.addEventListener("resize", () => {
        a.value = null;
      });
    }), be(() => {
      document.removeEventListener("mousedown", te), window.removeEventListener("scroll", se, !0);
    }), (s, e) => (i(), o("div", Ce, [
      t("div", Me, [
        t("label", Te, [
          t("span", {
            innerHTML: d(c)("search", 16),
            class: "em-search-ico"
          }, null, 8, Se),
          q(t("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (l) => D.value = l),
            placeholder: "Search workers...",
            class: "em-search-input",
            "aria-label": "Search workers"
          }, null, 512), [
            [G, D.value]
          ])
        ]),
        t("div", He, [
          (i(), o(w, null, R(oe, (l) => t("button", {
            key: l.key,
            type: "button",
            role: "tab",
            class: y(["em-tab", { active: _.value === l.key }]),
            "aria-selected": _.value === l.key,
            onClick: (n) => _.value = l.key
          }, [
            p(v(l.label) + " ", 1),
            l.key !== "all" ? (i(), o("span", Ue, v(ie.value[l.key] || 0), 1)) : g("", !0)
          ], 10, De)), 64))
        ]),
        t("div", Ae, [
          t("button", {
            type: "button",
            class: "em-btn em-btn-icon",
            onClick: K,
            title: "Refresh",
            "aria-label": "Refresh",
            disabled: L.value
          }, [
            t("span", {
              innerHTML: d(c)("refresh", 16)
            }, null, 8, xe)
          ], 8, $e),
          t("button", {
            type: "button",
            class: "em-btn em-btn-ghost",
            onClick: ce,
            disabled: !O.value.length
          }, [
            t("span", {
              innerHTML: d(c)("download", 16)
            }, null, 8, Ne),
            e[15] || (e[15] = p(" Export CSV ", -1))
          ], 8, Ie),
          t("button", {
            type: "button",
            class: "em-btn em-btn-primary",
            disabled: !s.$canCreate("admin"),
            title: s.$canCreate("admin") ? "" : "Read-only access",
            onClick: Q
          }, [
            t("span", {
              innerHTML: d(c)("plus", 16)
            }, null, 8, Ke),
            e[16] || (e[16] = p(" New Worker ", -1))
          ], 8, Ee)
        ])
      ]),
      t("div", We, [
        t("div", Fe, [
          t("table", Re, [
            t("thead", null, [
              t("tr", null, [
                t("th", {
                  class: "sortable",
                  onClick: e[1] || (e[1] = (l) => N("id_no"))
                }, [
                  e[17] || (e[17] = p("ID No. ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: E("id_no")
                  }, null, 8, Ve)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[2] || (e[2] = (l) => N("worker_name"))
                }, [
                  e[18] || (e[18] = p("Name ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: E("worker_name")
                  }, null, 8, ze)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[3] || (e[3] = (l) => N("skill"))
                }, [
                  e[19] || (e[19] = p("SK / USK ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: E("skill")
                  }, null, 8, Be)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[4] || (e[4] = (l) => N("status"))
                }, [
                  e[20] || (e[20] = p("Status ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: E("status")
                  }, null, 8, Oe)
                ]),
                e[21] || (e[21] = t("th", { class: "em-th-actions" }, "Actions", -1))
              ])
            ]),
            t("tbody", null, [
              L.value ? (i(), o(w, { key: 0 }, R(5, (l) => t("tr", {
                key: l,
                class: "em-skel"
              }, [...e[22] || (e[22] = [
                t("td", { colspan: "5" }, [
                  t("div", { class: "shimmer" })
                ], -1)
              ])])), 64)) : I.value.length ? (i(!0), o(w, { key: 2 }, R(re.value, (l) => (i(), o("tr", {
                key: l.name,
                class: "em-row"
              }, [
                t("td", {
                  onClick: (n) => M(l),
                  "data-label": "ID No."
                }, [
                  t("span", Qe, v(l.id_no || "—"), 1)
                ], 8, Je),
                t("td", {
                  onClick: (n) => M(l),
                  "data-label": "Name",
                  class: "em-name"
                }, v(l.worker_name), 9, Xe),
                t("td", {
                  onClick: (n) => M(l),
                  "data-label": "SK / USK"
                }, v(S(l.skill) || "—"), 9, Ye),
                t("td", {
                  onClick: (n) => M(l),
                  "data-label": "Status"
                }, [
                  t("span", {
                    class: y(["em-status", l.status === "Inactive" ? "is-inactive" : "is-active"])
                  }, v(l.status || "Active"), 3)
                ], 8, Ze),
                t("td", {
                  class: "em-td-actions",
                  onClick: e[5] || (e[5] = V(() => {
                  }, ["stop"]))
                }, [
                  t("button", {
                    type: "button",
                    class: "em-act",
                    onClick: (n) => M(l),
                    disabled: !s.$canEdit("admin"),
                    title: "Edit",
                    "aria-label": "Edit worker"
                  }, [
                    t("span", {
                      innerHTML: d(c)("edit", 16)
                    }, null, 8, tt)
                  ], 8, et),
                  t("button", {
                    type: "button",
                    class: "em-act em-act-del",
                    onClick: (n) => de(l),
                    disabled: !s.$canDelete("admin"),
                    title: s.$canDelete("admin") ? "Delete" : "Not permitted",
                    "aria-label": "Delete worker"
                  }, [
                    t("span", {
                      innerHTML: d(c)("trash", 16)
                    }, null, 8, lt)
                  ], 8, st)
                ])
              ]))), 128)) : (i(), o("tr", je, [
                t("td", Pe, [
                  D.value || _.value !== "all" ? (i(), o(w, { key: 0 }, [
                    e[23] || (e[23] = t("p", { class: "em-empty-title" }, "No workers match your filters", -1)),
                    e[24] || (e[24] = t("p", { class: "em-empty-sub" }, "Try a different search or switch the status filter.", -1))
                  ], 64)) : (i(), o(w, { key: 1 }, [
                    e[26] || (e[26] = t("p", { class: "em-empty-title" }, "No workers yet", -1)),
                    e[27] || (e[27] = t("p", { class: "em-empty-sub" }, "Add your first worker to get started.", -1)),
                    t("button", {
                      type: "button",
                      class: "em-btn em-btn-primary",
                      disabled: !s.$canCreate("admin"),
                      onClick: Q
                    }, [
                      t("span", {
                        innerHTML: d(c)("plus", 16)
                      }, null, 8, Ge),
                      e[25] || (e[25] = p(" New Worker ", -1))
                    ], 8, qe)
                  ], 64))
                ])
              ]))
            ])
          ])
        ]),
        !L.value && I.value.length ? (i(), o("div", nt, [
          fe(Le, {
            page: z.value,
            "onUpdate:page": e[6] || (e[6] = (l) => z.value = l),
            "page-size": U.value,
            "onUpdate:pageSize": e[7] || (e[7] = (l) => U.value = l),
            "total-items": I.value.length
          }, null, 8, ["page", "page-size", "total-items"])
        ])) : g("", !0)
      ]),
      C.value ? (i(), o("div", {
        key: 0,
        class: "em-overlay",
        onClick: V(j, ["self"])
      }, [
        t("div", at, [
          t("div", ot, [
            t("span", {
              class: "em-head-ico",
              innerHTML: d(c)("user", 22)
            }, null, 8, it),
            t("div", rt, [
              t("h3", ut, v(f.value ? "Edit Worker" : "New Worker"), 1),
              t("p", dt, v(f.value ? "Update the worker details" : "Add a new worker for the weekly wages sheet"), 1)
            ]),
            t("button", {
              type: "button",
              class: "em-close",
              onClick: j,
              "aria-label": "Close"
            }, [
              t("span", {
                innerHTML: d(c)("x", 20)
              }, null, 8, ct)
            ])
          ]),
          t("form", {
            class: "em-body",
            onSubmit: V(ue, ["prevent"])
          }, [
            t("div", vt, [
              e[28] || (e[28] = t("label", { for: "wk-f-name" }, [
                p("Worker Name "),
                t("span", { class: "em-req" }, "*")
              ], -1)),
              t("div", mt, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: d(c)("user", 16)
                }, null, 8, pt),
                q(t("input", {
                  id: "wk-f-name",
                  "onUpdate:modelValue": e[8] || (e[8] = (l) => u.value.worker_name = l),
                  required: "",
                  maxlength: "140",
                  placeholder: "Full name"
                }, null, 512), [
                  [G, u.value.worker_name]
                ])
              ])
            ]),
            t("div", kt, [
              e[29] || (e[29] = t("label", { for: "wk-f-idno" }, "ID No.", -1)),
              t("div", bt, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: d(c)("user", 16)
                }, null, 8, ft),
                q(t("input", {
                  id: "wk-f-idno",
                  "onUpdate:modelValue": e[9] || (e[9] = (l) => u.value.id_no = l),
                  maxlength: "140",
                  placeholder: "ID number"
                }, null, 512), [
                  [G, u.value.id_no]
                ])
              ]),
              e[30] || (e[30] = t("div", { class: "em-hint" }, "Optional. If given, it can belong to one worker only.", -1))
            ]),
            t("div", yt, [
              e[31] || (e[31] = t("label", { for: "wk-f-skill" }, "SK / USK", -1)),
              t("div", {
                class: y(["em-field em-field-select", { open: a.value === "skill" }])
              }, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: d(c)("user", 16)
                }, null, 8, _t),
                t("button", {
                  id: "wk-f-skill",
                  type: "button",
                  class: "em-trigger",
                  "aria-haspopup": "listbox",
                  "aria-expanded": a.value === "skill",
                  onClick: e[10] || (e[10] = (l) => P("skill", l)),
                  onKeydown: e[11] || (e[11] = (l) => ee("skill", l))
                }, v(Y("skill")), 41, wt)
              ], 2)
            ]),
            t("div", gt, [
              e[32] || (e[32] = t("label", { for: "wk-f-status" }, "Status", -1)),
              t("div", {
                class: y(["em-field em-field-select", { open: a.value === "status" }])
              }, [
                t("span", {
                  class: y(["em-dot", u.value.status === "Inactive" ? "is-inactive" : "is-active"])
                }, null, 2),
                t("button", {
                  id: "wk-f-status",
                  type: "button",
                  class: "em-trigger",
                  "aria-haspopup": "listbox",
                  "aria-expanded": a.value === "status",
                  onClick: e[12] || (e[12] = (l) => P("status", l)),
                  onKeydown: e[13] || (e[13] = (l) => ee("status", l))
                }, v(Y("status")), 41, ht)
              ], 2)
            ]),
            t("div", Lt, [
              t("button", {
                type: "button",
                class: "em-btn em-btn-ghost",
                onClick: j
              }, "Cancel"),
              t("button", {
                type: "submit",
                class: "em-btn em-btn-primary",
                disabled: x.value || !(f.value ? s.$canEdit("admin") : s.$canCreate("admin"))
              }, [
                t("span", {
                  innerHTML: d(c)("save", 16)
                }, null, 8, Mt),
                p(" " + v(x.value ? "Saving…" : "Save"), 1)
              ], 8, Ct)
            ])
          ], 32)
        ]),
        a.value ? (i(), o("ul", {
          key: 0,
          class: "em-dd",
          style: ye(X.value),
          role: "listbox",
          onMousedown: e[14] || (e[14] = V(() => {
          }, ["prevent"]))
        }, [
          (i(!0), o(w, null, R(W.value, (l, n) => (i(), o("li", {
            key: l.value,
            role: "option",
            class: y(["em-dd-opt", { selected: String(l.value) === String(u.value[a.value] ?? ""), active: n === k.value }]),
            "aria-selected": String(l.value) === String(u.value[a.value] ?? ""),
            onMouseenter: (b) => k.value = n,
            onClick: (b) => Z(l)
          }, [
            l.dot ? (i(), o("span", {
              key: 0,
              class: y(["em-dot", l.dot])
            }, null, 2)) : g("", !0),
            t("span", St, v(l.label), 1),
            String(l.value) === String(u.value[a.value] ?? "") ? (i(), o("span", {
              key: 1,
              class: "em-dd-check",
              innerHTML: d(c)("check", 16)
            }, null, 8, Ht)) : g("", !0)
          ], 42, Tt))), 128))
        ], 36)) : g("", !0)
      ])) : g("", !0)
    ]));
  }
}, xt = /* @__PURE__ */ me(Dt, [["__scopeId", "data-v-a2966849"]]);
export {
  xt as default
};
