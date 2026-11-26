import { _ as pe, y as ke, o as fe, m as be, c as i, a as t, u, i as d, w as q, B as G, F as g, r as F, d as m, E as ye, b as h, x as V, t as v, n as y, p as _e, e as ne, f as we, h as c, g as M, k as r, a2 as ge, L as he, a3 as Le } from "./main-C0s9McbT.js";
import { P as Ce } from "./Pagination-CP7uk2IJ.js";
import { c as Te } from "./labourAttendance-DT9vUjmD.js";
const Me = { class: "list-page em-page" }, Se = { class: "em-toolbar" }, He = { class: "em-search" }, De = ["innerHTML"], Ue = {
  class: "em-tabs",
  role: "tablist"
}, xe = ["aria-selected", "onClick"], Ae = {
  key: 0,
  class: "em-tab-count"
}, Ne = { class: "em-actions" }, $e = ["disabled"], Ie = ["innerHTML"], Ee = ["disabled"], Ke = ["innerHTML"], Re = ["disabled", "title"], We = ["innerHTML"], Fe = { class: "em-card-table" }, Ve = { class: "em-scroll" }, ze = { class: "em-tbl" }, Be = ["innerHTML"], Oe = ["innerHTML"], je = ["innerHTML"], Pe = ["innerHTML"], qe = { key: 1 }, Ge = {
  colspan: "5",
  class: "em-empty"
}, Je = ["disabled"], Qe = ["innerHTML"], Xe = ["onClick"], Ye = { class: "em-id" }, Ze = ["onClick"], et = ["onClick"], tt = ["onClick"], st = ["onClick", "disabled"], lt = ["innerHTML"], nt = ["onClick", "disabled", "title"], at = ["innerHTML"], ot = {
  key: 0,
  class: "em-foot"
}, it = {
  class: "em-card",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wk-dlg-title"
}, rt = { class: "em-head" }, ut = ["innerHTML"], dt = { class: "em-head-text" }, ct = {
  id: "wk-dlg-title",
  class: "em-title"
}, vt = { class: "em-subtitle" }, mt = ["innerHTML"], pt = { class: "em-group" }, kt = { class: "em-field" }, ft = ["innerHTML"], bt = { class: "em-group" }, yt = { class: "em-field" }, _t = ["innerHTML"], wt = { class: "em-group" }, gt = ["innerHTML"], ht = ["aria-expanded"], Lt = { class: "em-group" }, Ct = { class: "em-field" }, Tt = ["innerHTML"], Mt = ["value"], St = { class: "em-group" }, Ht = ["aria-expanded"], Dt = { class: "em-form-actions" }, Ut = ["disabled"], xt = ["innerHTML"], At = ["aria-selected", "onMouseenter", "onClick"], Nt = { class: "em-dd-label" }, $t = ["innerHTML"], J = "Labour Worker", It = {
  __name: "Workers",
  setup(Et) {
    const S = (s) => s === "Skilled" ? "SK" : s === "Unskilled" ? "USK" : s || "", { toast: _ } = ke(), { confirm: ae } = Le(), H = c([]), L = c(!1), D = c(""), w = c("all"), z = c(1), U = c(25), x = c("worker_name"), A = c(1), C = c(!1), b = c(!1), N = c(!1), o = c(B()), oe = [
      { key: "all", label: "All" },
      { key: "Active", label: "Active" },
      { key: "Inactive", label: "Inactive" }
    ];
    function B() {
      return { worker_name: "", id_no: "", skill: "Unskilled", rate: "", status: "Active" };
    }
    const ie = M(() => {
      const s = { Active: 0, Inactive: 0 };
      for (const e of H.value) s[e.status === "Inactive" ? "Inactive" : "Active"]++;
      return s;
    }), O = M(() => {
      let s = H.value;
      w.value !== "all" && (s = s.filter((l) => (l.status || "Active") === w.value));
      const e = D.value.trim().toLowerCase();
      return e && (s = s.filter((l) => (l.id_no || "").toLowerCase().includes(e) || (l.worker_name || "").toLowerCase().includes(e) || (l.skill || "").toLowerCase().includes(e) || S(l.skill).toLowerCase().includes(e))), s;
    }), $ = M(() => {
      const s = x.value, e = A.value;
      return [...O.value].sort((l, n) => String(l[s] ?? "").localeCompare(String(n[s] ?? ""), void 0, { numeric: !0 }) * e);
    }), re = M(() => {
      const s = (z.value - 1) * U.value;
      return $.value.slice(s, s + U.value);
    });
    function I(s) {
      x.value === s ? A.value *= -1 : (x.value = s, A.value = 1);
    }
    function E(s) {
      return x.value !== s ? "" : A.value === 1 ? "&#9650;" : "&#9660;";
    }
    async function K() {
      L.value = !0;
      try {
        const s = await ne();
        H.value = await we(J, {
          fields: ["name", "worker_name", "id_no", "skill", "rate", "status", "company"],
          filters: s ? [["company", "=", s]] : [],
          order: "worker_name asc",
          limit: 1e3
        }) || [];
      } catch (s) {
        _.error("Failed to load workers: " + s.message), H.value = [];
      } finally {
        L.value = !1;
      }
    }
    function Q() {
      b.value = !1, o.value = B(), C.value = !0;
    }
    function T(s) {
      b.value = !0, o.value = { ...B(), ...s, id_no: s.id_no || "", skill: s.skill || "Unskilled", rate: Number(s.rate) > 0 ? String(s.rate) : "", status: s.status || "Active" }, C.value = !0;
    }
    function j() {
      a.value = null, C.value = !1;
    }
    const a = c(null), X = c({}), k = c(-1), R = M(() => {
      const s = a.value;
      return s === "skill" ? [{ value: "Skilled", label: "SK" }, { value: "Unskilled", label: "USK" }] : s === "status" ? [{ value: "Active", label: "Active", dot: "is-active" }, { value: "Inactive", label: "Inactive", dot: "is-inactive" }] : [];
    });
    function Y(s) {
      const e = o.value[s];
      return s === "status" ? e || "Active" : s === "skill" ? S(e || "Unskilled") : e || "";
    }
    function P(s, e) {
      if (a.value === s) {
        a.value = null;
        return;
      }
      const n = e.currentTarget.closest(".em-field").getBoundingClientRect(), f = 260, p = window.innerHeight - n.bottom - 12, W = p < Math.min(f, 180) && n.top > p;
      X.value = {
        left: n.left + "px",
        width: n.width + "px",
        maxHeight: Math.max(120, Math.min(f, W ? n.top - 12 : p)) + "px",
        ...W ? { bottom: window.innerHeight - n.top + 6 + "px" } : { top: n.bottom + 6 + "px" }
      }, a.value = s;
      const le = R.value.findIndex((me) => String(me.value) === String(o.value[s] ?? ""));
      k.value = le >= 0 ? le : 0;
    }
    function Z(s) {
      o.value[a.value] = s.value, a.value = null;
    }
    function ee(s, e) {
      if (a.value !== s) {
        ["ArrowDown", "ArrowUp"].includes(e.key) && (e.preventDefault(), P(s, e));
        return;
      }
      const l = R.value.length;
      if (e.key === "ArrowDown")
        e.preventDefault(), k.value = (k.value + 1) % l;
      else if (e.key === "ArrowUp")
        e.preventDefault(), k.value = (k.value - 1 + l) % l;
      else if (e.key === "Enter") {
        e.preventDefault();
        const n = R.value[k.value];
        n && Z(n);
      } else e.key === "Escape" ? (e.preventDefault(), e.stopPropagation(), a.value = null) : e.key === "Tab" && (a.value = null);
    }
    function te(s) {
      a.value && !s.target.closest(".em-dd") && !s.target.closest(".em-field-select") && (a.value = null);
    }
    function se(s) {
      a.value && !(s.target.closest && s.target.closest(".em-dd")) && (a.value = null);
    }
    function ue(s) {
      const e = Te(s.target.value);
      s.target.value = e, o.value.rate = e;
    }
    async function de() {
      const s = o.value;
      if (!(Number(s.rate) > 0)) {
        _.error("Enter the Rate/Day (a number above 0)");
        return;
      }
      N.value = !0;
      try {
        const e = {
          doctype: J,
          worker_name: (s.worker_name || "").trim(),
          id_no: (s.id_no || "").trim() || null,
          skill: s.skill || "Unskilled",
          rate: Number(s.rate),
          status: s.status || "Active"
        };
        b.value ? e.name = s.name : e.company = await ne(), await he(e), _.success(b.value ? "Worker updated" : "Worker created"), C.value = !1, await K();
      } catch (e) {
        _.error("Failed to save worker: " + e.message);
      } finally {
        N.value = !1;
      }
    }
    async function ce(s) {
      if (await ae({
        title: "Delete worker?",
        body: `Delete ${s.worker_name} (${s.name})? This can't be undone. A worker already on a wages sheet can't be deleted: mark the worker Inactive instead.`,
        okLabel: "Delete",
        okStyle: "danger"
      }))
        try {
          await ge(J, s.name), _.success("Worker deleted"), await K();
        } catch (l) {
          _.error("Failed to delete worker: " + l.message);
        }
    }
    function ve() {
      const s = ["ID No.", "Name", "SK / USK", "Status"], e = O.value.map((p) => [p.id_no || "", p.worker_name, S(p.skill), p.status || "Active"]), l = [s, ...e].map((p) => p.map((W) => `"${String(W ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), n = URL.createObjectURL(new Blob([l], { type: "text/csv;charset=utf-8;" })), f = document.createElement("a");
      f.href = n, f.download = "workers.csv", f.click(), URL.revokeObjectURL(n);
    }
    return fe(() => {
      K(), document.addEventListener("mousedown", te), window.addEventListener("scroll", se, !0), window.addEventListener("resize", () => {
        a.value = null;
      });
    }), be(() => {
      document.removeEventListener("mousedown", te), window.removeEventListener("scroll", se, !0);
    }), (s, e) => (r(), i("div", Me, [
      t("div", Se, [
        t("label", He, [
          t("span", {
            innerHTML: u(d)("search", 16),
            class: "em-search-ico"
          }, null, 8, De),
          q(t("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (l) => D.value = l),
            placeholder: "Search workers...",
            class: "em-search-input",
            "aria-label": "Search workers"
          }, null, 512), [
            [G, D.value]
          ])
        ]),
        t("div", Ue, [
          (r(), i(g, null, F(oe, (l) => t("button", {
            key: l.key,
            type: "button",
            role: "tab",
            class: y(["em-tab", { active: w.value === l.key }]),
            "aria-selected": w.value === l.key,
            onClick: (n) => w.value = l.key
          }, [
            m(v(l.label) + " ", 1),
            l.key !== "all" ? (r(), i("span", Ae, v(ie.value[l.key] || 0), 1)) : h("", !0)
          ], 10, xe)), 64))
        ]),
        t("div", Ne, [
          t("button", {
            type: "button",
            class: "em-btn em-btn-icon",
            onClick: K,
            title: "Refresh",
            "aria-label": "Refresh",
            disabled: L.value
          }, [
            t("span", {
              innerHTML: u(d)("refresh", 16)
            }, null, 8, Ie)
          ], 8, $e),
          t("button", {
            type: "button",
            class: "em-btn em-btn-ghost",
            onClick: ve,
            disabled: !O.value.length
          }, [
            t("span", {
              innerHTML: u(d)("download", 16)
            }, null, 8, Ke),
            e[15] || (e[15] = m(" Export CSV ", -1))
          ], 8, Ee),
          t("button", {
            type: "button",
            class: "em-btn em-btn-primary",
            disabled: !s.$canCreate("admin"),
            title: s.$canCreate("admin") ? "" : "Read-only access",
            onClick: Q
          }, [
            t("span", {
              innerHTML: u(d)("plus", 16)
            }, null, 8, We),
            e[16] || (e[16] = m(" New Worker ", -1))
          ], 8, Re)
        ])
      ]),
      t("div", Fe, [
        t("div", Ve, [
          t("table", ze, [
            t("thead", null, [
              t("tr", null, [
                t("th", {
                  class: "sortable",
                  onClick: e[1] || (e[1] = (l) => I("id_no"))
                }, [
                  e[17] || (e[17] = m("ID No. ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: E("id_no")
                  }, null, 8, Be)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[2] || (e[2] = (l) => I("worker_name"))
                }, [
                  e[18] || (e[18] = m("Name ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: E("worker_name")
                  }, null, 8, Oe)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[3] || (e[3] = (l) => I("skill"))
                }, [
                  e[19] || (e[19] = m("SK / USK ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: E("skill")
                  }, null, 8, je)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[4] || (e[4] = (l) => I("status"))
                }, [
                  e[20] || (e[20] = m("Status ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: E("status")
                  }, null, 8, Pe)
                ]),
                e[21] || (e[21] = t("th", { class: "em-th-actions" }, "Actions", -1))
              ])
            ]),
            t("tbody", null, [
              L.value ? (r(), i(g, { key: 0 }, F(5, (l) => t("tr", {
                key: l,
                class: "em-skel"
              }, [...e[22] || (e[22] = [
                t("td", { colspan: "5" }, [
                  t("div", { class: "shimmer" })
                ], -1)
              ])])), 64)) : $.value.length ? (r(!0), i(g, { key: 2 }, F(re.value, (l) => (r(), i("tr", {
                key: l.name,
                class: "em-row"
              }, [
                t("td", {
                  onClick: (n) => T(l),
                  "data-label": "ID No."
                }, [
                  t("span", Ye, v(l.id_no || "—"), 1)
                ], 8, Xe),
                t("td", {
                  onClick: (n) => T(l),
                  "data-label": "Name",
                  class: "em-name"
                }, v(l.worker_name), 9, Ze),
                t("td", {
                  onClick: (n) => T(l),
                  "data-label": "SK / USK"
                }, v(S(l.skill) || "—"), 9, et),
                t("td", {
                  onClick: (n) => T(l),
                  "data-label": "Status"
                }, [
                  t("span", {
                    class: y(["em-status", l.status === "Inactive" ? "is-inactive" : "is-active"])
                  }, v(l.status || "Active"), 3)
                ], 8, tt),
                t("td", {
                  class: "em-td-actions",
                  onClick: e[5] || (e[5] = V(() => {
                  }, ["stop"]))
                }, [
                  t("button", {
                    type: "button",
                    class: "em-act",
                    onClick: (n) => T(l),
                    disabled: !s.$canEdit("admin"),
                    title: "Edit",
                    "aria-label": "Edit worker"
                  }, [
                    t("span", {
                      innerHTML: u(d)("edit", 16)
                    }, null, 8, lt)
                  ], 8, st),
                  t("button", {
                    type: "button",
                    class: "em-act em-act-del",
                    onClick: (n) => ce(l),
                    disabled: !s.$canDelete("admin"),
                    title: s.$canDelete("admin") ? "Delete" : "Not permitted",
                    "aria-label": "Delete worker"
                  }, [
                    t("span", {
                      innerHTML: u(d)("trash", 16)
                    }, null, 8, at)
                  ], 8, nt)
                ])
              ]))), 128)) : (r(), i("tr", qe, [
                t("td", Ge, [
                  D.value || w.value !== "all" ? (r(), i(g, { key: 0 }, [
                    e[23] || (e[23] = t("p", { class: "em-empty-title" }, "No workers match your filters", -1)),
                    e[24] || (e[24] = t("p", { class: "em-empty-sub" }, "Try a different search or switch the status filter.", -1))
                  ], 64)) : (r(), i(g, { key: 1 }, [
                    e[26] || (e[26] = t("p", { class: "em-empty-title" }, "No workers yet", -1)),
                    e[27] || (e[27] = t("p", { class: "em-empty-sub" }, "Add your first worker to get started.", -1)),
                    t("button", {
                      type: "button",
                      class: "em-btn em-btn-primary",
                      disabled: !s.$canCreate("admin"),
                      onClick: Q
                    }, [
                      t("span", {
                        innerHTML: u(d)("plus", 16)
                      }, null, 8, Qe),
                      e[25] || (e[25] = m(" New Worker ", -1))
                    ], 8, Je)
                  ], 64))
                ])
              ]))
            ])
          ])
        ]),
        !L.value && $.value.length ? (r(), i("div", ot, [
          ye(Ce, {
            page: z.value,
            "onUpdate:page": e[6] || (e[6] = (l) => z.value = l),
            "page-size": U.value,
            "onUpdate:pageSize": e[7] || (e[7] = (l) => U.value = l),
            "total-items": $.value.length
          }, null, 8, ["page", "page-size", "total-items"])
        ])) : h("", !0)
      ]),
      C.value ? (r(), i("div", {
        key: 0,
        class: "em-overlay",
        onClick: V(j, ["self"])
      }, [
        t("div", it, [
          t("div", rt, [
            t("span", {
              class: "em-head-ico",
              innerHTML: u(d)("user", 22)
            }, null, 8, ut),
            t("div", dt, [
              t("h3", ct, v(b.value ? "Edit Worker" : "New Worker"), 1),
              t("p", vt, v(b.value ? "Update the worker details" : "Add a new worker for the weekly wages sheet"), 1)
            ]),
            t("button", {
              type: "button",
              class: "em-close",
              onClick: j,
              "aria-label": "Close"
            }, [
              t("span", {
                innerHTML: u(d)("x", 20)
              }, null, 8, mt)
            ])
          ]),
          t("form", {
            class: "em-body",
            onSubmit: V(de, ["prevent"])
          }, [
            t("div", pt, [
              e[28] || (e[28] = t("label", { for: "wk-f-name" }, [
                m("Worker Name "),
                t("span", { class: "em-req" }, "*")
              ], -1)),
              t("div", kt, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: u(d)("user", 16)
                }, null, 8, ft),
                q(t("input", {
                  id: "wk-f-name",
                  "onUpdate:modelValue": e[8] || (e[8] = (l) => o.value.worker_name = l),
                  required: "",
                  maxlength: "140",
                  placeholder: "Full name"
                }, null, 512), [
                  [G, o.value.worker_name]
                ])
              ])
            ]),
            t("div", bt, [
              e[29] || (e[29] = t("label", { for: "wk-f-idno" }, "ID No.", -1)),
              t("div", yt, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: u(d)("user", 16)
                }, null, 8, _t),
                q(t("input", {
                  id: "wk-f-idno",
                  "onUpdate:modelValue": e[9] || (e[9] = (l) => o.value.id_no = l),
                  maxlength: "140",
                  placeholder: "ID number"
                }, null, 512), [
                  [G, o.value.id_no]
                ])
              ]),
              e[30] || (e[30] = t("div", { class: "em-hint" }, "Optional. If given, it can belong to one worker only.", -1))
            ]),
            t("div", wt, [
              e[31] || (e[31] = t("label", { for: "wk-f-skill" }, "SK / USK", -1)),
              t("div", {
                class: y(["em-field em-field-select", { open: a.value === "skill" }])
              }, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: u(d)("user", 16)
                }, null, 8, gt),
                t("button", {
                  id: "wk-f-skill",
                  type: "button",
                  class: "em-trigger",
                  "aria-haspopup": "listbox",
                  "aria-expanded": a.value === "skill",
                  onClick: e[10] || (e[10] = (l) => P("skill", l)),
                  onKeydown: e[11] || (e[11] = (l) => ee("skill", l))
                }, v(Y("skill")), 41, ht)
              ], 2)
            ]),
            t("div", Lt, [
              e[32] || (e[32] = t("label", { for: "wk-f-rate" }, [
                m("Rate/Day (KES) "),
                t("span", { class: "em-req" }, "*")
              ], -1)),
              t("div", Ct, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: u(d)("user", 16)
                }, null, 8, Tt),
                t("input", {
                  id: "wk-f-rate",
                  value: o.value.rate,
                  type: "text",
                  inputmode: "decimal",
                  autocomplete: "off",
                  maxlength: "10",
                  placeholder: "0",
                  onInput: ue
                }, null, 40, Mt)
              ]),
              e[33] || (e[33] = t("div", { class: "em-hint" }, "Numbers only. This is the starting Rate/Day on the Weekly Wages sheet.", -1))
            ]),
            t("div", St, [
              e[34] || (e[34] = t("label", { for: "wk-f-status" }, "Status", -1)),
              t("div", {
                class: y(["em-field em-field-select", { open: a.value === "status" }])
              }, [
                t("span", {
                  class: y(["em-dot", o.value.status === "Inactive" ? "is-inactive" : "is-active"])
                }, null, 2),
                t("button", {
                  id: "wk-f-status",
                  type: "button",
                  class: "em-trigger",
                  "aria-haspopup": "listbox",
                  "aria-expanded": a.value === "status",
                  onClick: e[12] || (e[12] = (l) => P("status", l)),
                  onKeydown: e[13] || (e[13] = (l) => ee("status", l))
                }, v(Y("status")), 41, Ht)
              ], 2)
            ]),
            t("div", Dt, [
              t("button", {
                type: "button",
                class: "em-btn em-btn-ghost",
                onClick: j
              }, "Cancel"),
              t("button", {
                type: "submit",
                class: "em-btn em-btn-primary",
                disabled: N.value || !(b.value ? s.$canEdit("admin") : s.$canCreate("admin"))
              }, [
                t("span", {
                  innerHTML: u(d)("save", 16)
                }, null, 8, xt),
                m(" " + v(N.value ? "Saving…" : "Save"), 1)
              ], 8, Ut)
            ])
          ], 32)
        ]),
        a.value ? (r(), i("ul", {
          key: 0,
          class: "em-dd",
          style: _e(X.value),
          role: "listbox",
          onMousedown: e[14] || (e[14] = V(() => {
          }, ["prevent"]))
        }, [
          (r(!0), i(g, null, F(R.value, (l, n) => (r(), i("li", {
            key: l.value,
            role: "option",
            class: y(["em-dd-opt", { selected: String(l.value) === String(o.value[a.value] ?? ""), active: n === k.value }]),
            "aria-selected": String(l.value) === String(o.value[a.value] ?? ""),
            onMouseenter: (f) => k.value = n,
            onClick: (f) => Z(l)
          }, [
            l.dot ? (r(), i("span", {
              key: 0,
              class: y(["em-dot", l.dot])
            }, null, 2)) : h("", !0),
            t("span", Nt, v(l.label), 1),
            String(l.value) === String(o.value[a.value] ?? "") ? (r(), i("span", {
              key: 1,
              class: "em-dd-check",
              innerHTML: u(d)("check", 16)
            }, null, 8, $t)) : h("", !0)
          ], 42, At))), 128))
        ], 36)) : h("", !0)
      ])) : h("", !0)
    ]));
  }
}, Ft = /* @__PURE__ */ pe(It, [["__scopeId", "data-v-09c0fb02"]]);
export {
  Ft as default
};
