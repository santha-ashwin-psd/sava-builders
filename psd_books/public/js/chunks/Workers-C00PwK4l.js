import { _ as ke, y as be, o as fe, m as ye, c as i, a as t, u, i as d, w as q, B as G, F as h, r as F, d as p, E as _e, b as L, x as V, t as v, n as y, p as we, e as ne, f as ge, h as c, g as H, k as r, a2 as he, L as Le, a3 as Ce } from "./main-Bk5OSlX4.js";
import { P as Se } from "./Pagination-BavJd-z5.js";
import { c as Te } from "./labourAttendance-DQw5tMo2.js";
const Me = { class: "list-page em-page" }, He = { class: "em-toolbar" }, De = { class: "em-search" }, Ne = ["innerHTML"], Ue = {
  class: "em-tabs",
  role: "tablist"
}, $e = ["aria-selected", "onClick"], xe = {
  key: 0,
  class: "em-tab-count"
}, Ae = { class: "em-actions" }, Ee = ["disabled"], Ie = ["innerHTML"], Ke = ["disabled"], Re = ["innerHTML"], We = ["disabled", "title"], Fe = ["innerHTML"], Ve = { class: "em-card-table" }, ze = { class: "em-scroll" }, Be = { class: "em-tbl" }, Oe = ["innerHTML"], je = ["innerHTML"], Pe = ["innerHTML"], qe = ["innerHTML"], Ge = ["innerHTML"], Je = { key: 1 }, Qe = {
  colspan: "6",
  class: "em-empty"
}, Xe = ["disabled"], Ye = ["innerHTML"], Ze = ["onClick"], et = { class: "em-id" }, tt = ["onClick"], st = ["onClick"], lt = ["onClick"], nt = ["onClick"], at = ["onClick", "disabled"], ot = ["innerHTML"], it = ["onClick", "disabled", "title"], rt = ["innerHTML"], ut = {
  key: 0,
  class: "em-foot"
}, dt = {
  class: "em-card",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "wk-dlg-title"
}, ct = { class: "em-head" }, vt = ["innerHTML"], mt = { class: "em-head-text" }, pt = {
  id: "wk-dlg-title",
  class: "em-title"
}, kt = { class: "em-subtitle" }, bt = ["innerHTML"], ft = { class: "em-group" }, yt = { class: "em-field" }, _t = ["innerHTML"], wt = { class: "em-group" }, gt = { class: "em-field" }, ht = ["innerHTML"], Lt = { class: "em-group" }, Ct = ["innerHTML"], St = ["aria-expanded"], Tt = { class: "em-group" }, Mt = { class: "em-field" }, Ht = ["innerHTML"], Dt = ["value"], Nt = { class: "em-group" }, Ut = ["aria-expanded"], $t = { class: "em-form-actions" }, xt = ["disabled"], At = ["innerHTML"], Et = ["aria-selected", "onMouseenter", "onClick"], It = { class: "em-dd-label" }, Kt = ["innerHTML"], J = "Labour Worker", Rt = {
  __name: "Workers",
  setup(Wt) {
    const ae = (s) => Number(s) > 0 ? Number(s).toLocaleString("en-US", { maximumFractionDigits: 2 }) : "—", D = (s) => s === "Skilled" ? "SK" : s === "Unskilled" ? "USK" : s || "", { toast: _ } = be(), { confirm: oe } = Ce(), N = c([]), C = c(!1), U = c(""), w = c("all"), z = c(1), $ = c(25), x = c("worker_name"), A = c(1), S = c(!1), f = c(!1), E = c(!1), o = c(B()), ie = [
      { key: "all", label: "All" },
      { key: "Active", label: "Active" },
      { key: "Inactive", label: "Inactive" }
    ];
    function B() {
      return { worker_name: "", id_no: "", skill: "Unskilled", rate: "", status: "Active" };
    }
    const re = H(() => {
      const s = { Active: 0, Inactive: 0 };
      for (const e of N.value) s[e.status === "Inactive" ? "Inactive" : "Active"]++;
      return s;
    }), O = H(() => {
      let s = N.value;
      w.value !== "all" && (s = s.filter((l) => (l.status || "Active") === w.value));
      const e = U.value.trim().toLowerCase();
      return e && (s = s.filter((l) => (l.id_no || "").toLowerCase().includes(e) || (l.worker_name || "").toLowerCase().includes(e) || (l.skill || "").toLowerCase().includes(e) || D(l.skill).toLowerCase().includes(e))), s;
    }), I = H(() => {
      const s = x.value, e = A.value;
      return [...O.value].sort((l, n) => String(l[s] ?? "").localeCompare(String(n[s] ?? ""), void 0, { numeric: !0 }) * e);
    }), ue = H(() => {
      const s = (z.value - 1) * $.value;
      return I.value.slice(s, s + $.value);
    });
    function T(s) {
      x.value === s ? A.value *= -1 : (x.value = s, A.value = 1);
    }
    function M(s) {
      return x.value !== s ? "" : A.value === 1 ? "&#9650;" : "&#9660;";
    }
    async function K() {
      C.value = !0;
      try {
        const s = await ne();
        N.value = await ge(J, {
          fields: ["name", "worker_name", "id_no", "skill", "rate", "status", "company"],
          filters: s ? [["company", "=", s]] : [],
          order: "worker_name asc",
          limit: 1e3
        }) || [];
      } catch (s) {
        _.error("Failed to load workers: " + s.message), N.value = [];
      } finally {
        C.value = !1;
      }
    }
    function Q() {
      f.value = !1, o.value = B(), S.value = !0;
    }
    function g(s) {
      f.value = !0, o.value = { ...B(), ...s, id_no: s.id_no || "", skill: s.skill || "Unskilled", rate: Number(s.rate) > 0 ? String(s.rate) : "", status: s.status || "Active" }, S.value = !0;
    }
    function j() {
      a.value = null, S.value = !1;
    }
    const a = c(null), X = c({}), k = c(-1), R = H(() => {
      const s = a.value;
      return s === "skill" ? [{ value: "Skilled", label: "SK" }, { value: "Unskilled", label: "USK" }] : s === "status" ? [{ value: "Active", label: "Active", dot: "is-active" }, { value: "Inactive", label: "Inactive", dot: "is-inactive" }] : [];
    });
    function Y(s) {
      const e = o.value[s];
      return s === "status" ? e || "Active" : s === "skill" ? D(e || "Unskilled") : e || "";
    }
    function P(s, e) {
      if (a.value === s) {
        a.value = null;
        return;
      }
      const n = e.currentTarget.closest(".em-field").getBoundingClientRect(), b = 260, m = window.innerHeight - n.bottom - 12, W = m < Math.min(b, 180) && n.top > m;
      X.value = {
        left: n.left + "px",
        width: n.width + "px",
        maxHeight: Math.max(120, Math.min(b, W ? n.top - 12 : m)) + "px",
        ...W ? { bottom: window.innerHeight - n.top + 6 + "px" } : { top: n.bottom + 6 + "px" }
      }, a.value = s;
      const le = R.value.findIndex((pe) => String(pe.value) === String(o.value[s] ?? ""));
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
    function de(s) {
      const e = Te(s.target.value);
      s.target.value = e, o.value.rate = e;
    }
    async function ce() {
      const s = o.value;
      if (!(Number(s.rate) > 0)) {
        _.error("Enter the Rate/Day (a number above 0)");
        return;
      }
      E.value = !0;
      try {
        const e = {
          doctype: J,
          worker_name: (s.worker_name || "").trim(),
          id_no: (s.id_no || "").trim() || null,
          skill: s.skill || "Unskilled",
          rate: Number(s.rate),
          status: s.status || "Active"
        };
        f.value ? e.name = s.name : e.company = await ne(), await Le(e), _.success(f.value ? "Worker updated" : "Worker created"), S.value = !1, await K();
      } catch (e) {
        _.error("Failed to save worker: " + e.message);
      } finally {
        E.value = !1;
      }
    }
    async function ve(s) {
      if (await oe({
        title: "Delete worker?",
        body: `Delete ${s.worker_name} (${s.name})? This can't be undone. A worker already on a wages sheet can't be deleted: mark the worker Inactive instead.`,
        okLabel: "Delete",
        okStyle: "danger"
      }))
        try {
          await he(J, s.name), _.success("Worker deleted"), await K();
        } catch (l) {
          _.error("Failed to delete worker: " + l.message);
        }
    }
    function me() {
      const s = ["ID No.", "Name", "SK / USK", "Rate/Day (KES)", "Status"], e = O.value.map((m) => [m.id_no || "", m.worker_name, D(m.skill), Number(m.rate) > 0 ? m.rate : "", m.status || "Active"]), l = [s, ...e].map((m) => m.map((W) => `"${String(W ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), n = URL.createObjectURL(new Blob([l], { type: "text/csv;charset=utf-8;" })), b = document.createElement("a");
      b.href = n, b.download = "workers.csv", b.click(), URL.revokeObjectURL(n);
    }
    return fe(() => {
      K(), document.addEventListener("mousedown", te), window.addEventListener("scroll", se, !0), window.addEventListener("resize", () => {
        a.value = null;
      });
    }), ye(() => {
      document.removeEventListener("mousedown", te), window.removeEventListener("scroll", se, !0);
    }), (s, e) => (r(), i("div", Me, [
      t("div", He, [
        t("label", De, [
          t("span", {
            innerHTML: u(d)("search", 16),
            class: "em-search-ico"
          }, null, 8, Ne),
          q(t("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (l) => U.value = l),
            placeholder: "Search workers...",
            class: "em-search-input",
            "aria-label": "Search workers"
          }, null, 512), [
            [G, U.value]
          ])
        ]),
        t("div", Ue, [
          (r(), i(h, null, F(ie, (l) => t("button", {
            key: l.key,
            type: "button",
            role: "tab",
            class: y(["em-tab", { active: w.value === l.key }]),
            "aria-selected": w.value === l.key,
            onClick: (n) => w.value = l.key
          }, [
            p(v(l.label) + " ", 1),
            l.key !== "all" ? (r(), i("span", xe, v(re.value[l.key] || 0), 1)) : L("", !0)
          ], 10, $e)), 64))
        ]),
        t("div", Ae, [
          t("button", {
            type: "button",
            class: "em-btn em-btn-icon",
            onClick: K,
            title: "Refresh",
            "aria-label": "Refresh",
            disabled: C.value
          }, [
            t("span", {
              innerHTML: u(d)("refresh", 16)
            }, null, 8, Ie)
          ], 8, Ee),
          t("button", {
            type: "button",
            class: "em-btn em-btn-ghost",
            onClick: me,
            disabled: !O.value.length
          }, [
            t("span", {
              innerHTML: u(d)("download", 16)
            }, null, 8, Re),
            e[16] || (e[16] = p(" Export CSV ", -1))
          ], 8, Ke),
          t("button", {
            type: "button",
            class: "em-btn em-btn-primary",
            disabled: !s.$canCreate("admin"),
            title: s.$canCreate("admin") ? "" : "Read-only access",
            onClick: Q
          }, [
            t("span", {
              innerHTML: u(d)("plus", 16)
            }, null, 8, Fe),
            e[17] || (e[17] = p(" New Worker ", -1))
          ], 8, We)
        ])
      ]),
      t("div", Ve, [
        t("div", ze, [
          t("table", Be, [
            t("thead", null, [
              t("tr", null, [
                t("th", {
                  class: "sortable",
                  onClick: e[1] || (e[1] = (l) => T("id_no"))
                }, [
                  e[18] || (e[18] = p("ID No. ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: M("id_no")
                  }, null, 8, Oe)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[2] || (e[2] = (l) => T("worker_name"))
                }, [
                  e[19] || (e[19] = p("Name ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: M("worker_name")
                  }, null, 8, je)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[3] || (e[3] = (l) => T("skill"))
                }, [
                  e[20] || (e[20] = p("SK / USK ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: M("skill")
                  }, null, 8, Pe)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[4] || (e[4] = (l) => T("rate"))
                }, [
                  e[21] || (e[21] = p("Rate/Day (KES) ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: M("rate")
                  }, null, 8, qe)
                ]),
                t("th", {
                  class: "sortable",
                  onClick: e[5] || (e[5] = (l) => T("status"))
                }, [
                  e[22] || (e[22] = p("Status ", -1)),
                  t("span", {
                    class: "em-sort",
                    innerHTML: M("status")
                  }, null, 8, Ge)
                ]),
                e[23] || (e[23] = t("th", { class: "em-th-actions" }, "Actions", -1))
              ])
            ]),
            t("tbody", null, [
              C.value ? (r(), i(h, { key: 0 }, F(5, (l) => t("tr", {
                key: l,
                class: "em-skel"
              }, [...e[24] || (e[24] = [
                t("td", { colspan: "6" }, [
                  t("div", { class: "shimmer" })
                ], -1)
              ])])), 64)) : I.value.length ? (r(!0), i(h, { key: 2 }, F(ue.value, (l) => (r(), i("tr", {
                key: l.name,
                class: "em-row"
              }, [
                t("td", {
                  onClick: (n) => g(l),
                  "data-label": "ID No."
                }, [
                  t("span", et, v(l.id_no || "—"), 1)
                ], 8, Ze),
                t("td", {
                  onClick: (n) => g(l),
                  "data-label": "Name",
                  class: "em-name"
                }, v(l.worker_name), 9, tt),
                t("td", {
                  onClick: (n) => g(l),
                  "data-label": "SK / USK"
                }, v(D(l.skill) || "—"), 9, st),
                t("td", {
                  onClick: (n) => g(l),
                  "data-label": "Rate/Day (KES)"
                }, v(ae(l.rate)), 9, lt),
                t("td", {
                  onClick: (n) => g(l),
                  "data-label": "Status"
                }, [
                  t("span", {
                    class: y(["em-status", l.status === "Inactive" ? "is-inactive" : "is-active"])
                  }, v(l.status || "Active"), 3)
                ], 8, nt),
                t("td", {
                  class: "em-td-actions",
                  onClick: e[6] || (e[6] = V(() => {
                  }, ["stop"]))
                }, [
                  t("button", {
                    type: "button",
                    class: "em-act",
                    onClick: (n) => g(l),
                    disabled: !s.$canEdit("admin"),
                    title: "Edit",
                    "aria-label": "Edit worker"
                  }, [
                    t("span", {
                      innerHTML: u(d)("edit", 16)
                    }, null, 8, ot)
                  ], 8, at),
                  t("button", {
                    type: "button",
                    class: "em-act em-act-del",
                    onClick: (n) => ve(l),
                    disabled: !s.$canDelete("admin"),
                    title: s.$canDelete("admin") ? "Delete" : "Not permitted",
                    "aria-label": "Delete worker"
                  }, [
                    t("span", {
                      innerHTML: u(d)("trash", 16)
                    }, null, 8, rt)
                  ], 8, it)
                ])
              ]))), 128)) : (r(), i("tr", Je, [
                t("td", Qe, [
                  U.value || w.value !== "all" ? (r(), i(h, { key: 0 }, [
                    e[25] || (e[25] = t("p", { class: "em-empty-title" }, "No workers match your filters", -1)),
                    e[26] || (e[26] = t("p", { class: "em-empty-sub" }, "Try a different search or switch the status filter.", -1))
                  ], 64)) : (r(), i(h, { key: 1 }, [
                    e[28] || (e[28] = t("p", { class: "em-empty-title" }, "No workers yet", -1)),
                    e[29] || (e[29] = t("p", { class: "em-empty-sub" }, "Add your first worker to get started.", -1)),
                    t("button", {
                      type: "button",
                      class: "em-btn em-btn-primary",
                      disabled: !s.$canCreate("admin"),
                      onClick: Q
                    }, [
                      t("span", {
                        innerHTML: u(d)("plus", 16)
                      }, null, 8, Ye),
                      e[27] || (e[27] = p(" New Worker ", -1))
                    ], 8, Xe)
                  ], 64))
                ])
              ]))
            ])
          ])
        ]),
        !C.value && I.value.length ? (r(), i("div", ut, [
          _e(Se, {
            page: z.value,
            "onUpdate:page": e[7] || (e[7] = (l) => z.value = l),
            "page-size": $.value,
            "onUpdate:pageSize": e[8] || (e[8] = (l) => $.value = l),
            "total-items": I.value.length
          }, null, 8, ["page", "page-size", "total-items"])
        ])) : L("", !0)
      ]),
      S.value ? (r(), i("div", {
        key: 0,
        class: "em-overlay",
        onClick: V(j, ["self"])
      }, [
        t("div", dt, [
          t("div", ct, [
            t("span", {
              class: "em-head-ico",
              innerHTML: u(d)("user", 22)
            }, null, 8, vt),
            t("div", mt, [
              t("h3", pt, v(f.value ? "Edit Worker" : "New Worker"), 1),
              t("p", kt, v(f.value ? "Update the worker details" : "Add a new worker for the weekly wages sheet"), 1)
            ]),
            t("button", {
              type: "button",
              class: "em-close",
              onClick: j,
              "aria-label": "Close"
            }, [
              t("span", {
                innerHTML: u(d)("x", 20)
              }, null, 8, bt)
            ])
          ]),
          t("form", {
            class: "em-body",
            onSubmit: V(ce, ["prevent"])
          }, [
            t("div", ft, [
              e[30] || (e[30] = t("label", { for: "wk-f-name" }, [
                p("Worker Name "),
                t("span", { class: "em-req" }, "*")
              ], -1)),
              t("div", yt, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: u(d)("user", 16)
                }, null, 8, _t),
                q(t("input", {
                  id: "wk-f-name",
                  "onUpdate:modelValue": e[9] || (e[9] = (l) => o.value.worker_name = l),
                  required: "",
                  maxlength: "140",
                  placeholder: "Full name"
                }, null, 512), [
                  [G, o.value.worker_name]
                ])
              ])
            ]),
            t("div", wt, [
              e[31] || (e[31] = t("label", { for: "wk-f-idno" }, "ID No.", -1)),
              t("div", gt, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: u(d)("user", 16)
                }, null, 8, ht),
                q(t("input", {
                  id: "wk-f-idno",
                  "onUpdate:modelValue": e[10] || (e[10] = (l) => o.value.id_no = l),
                  maxlength: "140",
                  placeholder: "ID number"
                }, null, 512), [
                  [G, o.value.id_no]
                ])
              ]),
              e[32] || (e[32] = t("div", { class: "em-hint" }, "Optional. If given, it can belong to one worker only.", -1))
            ]),
            t("div", Lt, [
              e[33] || (e[33] = t("label", { for: "wk-f-skill" }, "SK / USK", -1)),
              t("div", {
                class: y(["em-field em-field-select", { open: a.value === "skill" }])
              }, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: u(d)("user", 16)
                }, null, 8, Ct),
                t("button", {
                  id: "wk-f-skill",
                  type: "button",
                  class: "em-trigger",
                  "aria-haspopup": "listbox",
                  "aria-expanded": a.value === "skill",
                  onClick: e[11] || (e[11] = (l) => P("skill", l)),
                  onKeydown: e[12] || (e[12] = (l) => ee("skill", l))
                }, v(Y("skill")), 41, St)
              ], 2)
            ]),
            t("div", Tt, [
              e[34] || (e[34] = t("label", { for: "wk-f-rate" }, [
                p("Rate/Day (KES) "),
                t("span", { class: "em-req" }, "*")
              ], -1)),
              t("div", Mt, [
                t("span", {
                  class: "em-field-ico",
                  innerHTML: u(d)("user", 16)
                }, null, 8, Ht),
                t("input", {
                  id: "wk-f-rate",
                  value: o.value.rate,
                  type: "text",
                  inputmode: "decimal",
                  autocomplete: "off",
                  maxlength: "10",
                  placeholder: "0",
                  onInput: de
                }, null, 40, Dt)
              ]),
              e[35] || (e[35] = t("div", { class: "em-hint" }, "Numbers only. This is the starting Rate/Day on the Weekly Wages sheet.", -1))
            ]),
            t("div", Nt, [
              e[36] || (e[36] = t("label", { for: "wk-f-status" }, "Status", -1)),
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
                  onClick: e[13] || (e[13] = (l) => P("status", l)),
                  onKeydown: e[14] || (e[14] = (l) => ee("status", l))
                }, v(Y("status")), 41, Ut)
              ], 2)
            ]),
            t("div", $t, [
              t("button", {
                type: "button",
                class: "em-btn em-btn-ghost",
                onClick: j
              }, "Cancel"),
              t("button", {
                type: "submit",
                class: "em-btn em-btn-primary",
                disabled: E.value || !(f.value ? s.$canEdit("admin") : s.$canCreate("admin"))
              }, [
                t("span", {
                  innerHTML: u(d)("save", 16)
                }, null, 8, At),
                p(" " + v(E.value ? "Saving…" : "Save"), 1)
              ], 8, xt)
            ])
          ], 32)
        ]),
        a.value ? (r(), i("ul", {
          key: 0,
          class: "em-dd",
          style: we(X.value),
          role: "listbox",
          onMousedown: e[15] || (e[15] = V(() => {
          }, ["prevent"]))
        }, [
          (r(!0), i(h, null, F(R.value, (l, n) => (r(), i("li", {
            key: l.value,
            role: "option",
            class: y(["em-dd-opt", { selected: String(l.value) === String(o.value[a.value] ?? ""), active: n === k.value }]),
            "aria-selected": String(l.value) === String(o.value[a.value] ?? ""),
            onMouseenter: (b) => k.value = n,
            onClick: (b) => Z(l)
          }, [
            l.dot ? (r(), i("span", {
              key: 0,
              class: y(["em-dot", l.dot])
            }, null, 2)) : L("", !0),
            t("span", It, v(l.label), 1),
            String(l.value) === String(o.value[a.value] ?? "") ? (r(), i("span", {
              key: 1,
              class: "em-dd-check",
              innerHTML: u(d)("check", 16)
            }, null, 8, Kt)) : L("", !0)
          ], 42, Et))), 128))
        ], 36)) : L("", !0)
      ])) : L("", !0)
    ]));
  }
}, Bt = /* @__PURE__ */ ke(Rt, [["__scopeId", "data-v-c476625f"]]);
export {
  Bt as default
};
