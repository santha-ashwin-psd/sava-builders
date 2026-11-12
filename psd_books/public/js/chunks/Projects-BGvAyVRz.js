import { _ as Ee, x as De, o as Ne, c as o, a as s, u as c, i as u, w as g, A as U, F as k, r as f, v as se, d as v, D as $e, b, q as ae, t as i, e as le, f as je, l as oe, h as d, g as j, s as ne, J as ie, R as Re, a3 as Ue, k as n, n as re, a9 as Ve, K as Ae } from "./main-aFENQFw9.js";
import { b as be } from "./format-BcJZDVG4.js";
import { P as Fe } from "./Pagination-CZn_kG8T.js";
const Be = { class: "list-page" }, qe = { class: "sales-toolbar pj-toolbar" }, ze = { class: "sales-search" }, Ke = ["innerHTML"], Ye = { class: "sales-pills" }, Ie = ["onClick"], We = {
  key: 0,
  class: "sales-pill-count"
}, Je = { class: "sales-actions" }, Ge = ["value"], Qe = ["disabled"], Xe = ["innerHTML"], Ze = ["disabled"], et = ["innerHTML"], tt = ["disabled", "title"], st = ["innerHTML"], at = { class: "pj-kpis" }, lt = ["title", "onClick", "onKeydown"], ot = ["innerHTML"], nt = { class: "pj-kpi-body" }, it = { class: "pj-kpi-label" }, rt = { class: "pj-kpi-value" }, ct = { class: "pj-kpi-sub" }, dt = { class: "inv-table-wrap" }, ut = { class: "inv-table pj-tbl bk-card-table" }, pt = ["innerHTML"], vt = ["innerHTML"], _t = ["innerHTML"], jt = ["innerHTML"], bt = ["innerHTML"], mt = ["innerHTML"], yt = { key: 1 }, kt = {
  colspan: "7",
  class: "bk-empty-state"
}, ht = { class: "bk-empty-inner" }, gt = {
  key: 0,
  class: "bk-empty-title"
}, ft = ["disabled"], Ct = ["innerHTML"], Mt = ["onClick"], Tt = { class: "inv-link pj-code" }, Lt = ["onClick"], Pt = ["onClick"], wt = ["onClick"], xt = ["onClick"], St = ["onClick"], Ht = ["onClick", "disabled"], Ot = ["innerHTML"], Et = ["onClick"], Dt = ["innerHTML"], Nt = {
  key: 0,
  style: { padding: "12px 4px 4px" }
}, $t = { class: "pj-card" }, Rt = { class: "pj-head" }, Ut = ["innerHTML"], Vt = { class: "pj-head-text" }, At = { class: "pj-title" }, Ft = { class: "pj-subtitle" }, Bt = ["innerHTML"], qt = { class: "pj-group" }, zt = { class: "pj-ctl" }, Kt = ["innerHTML"], Yt = ["disabled"], It = { class: "pj-group" }, Wt = { class: "pj-ctl" }, Jt = ["disabled"], Gt = { class: "pj-row" }, Qt = { class: "pj-group" }, Xt = { class: "pj-ctl" }, Zt = ["innerHTML"], es = ["disabled"], ts = { class: "pj-group" }, ss = { class: "pj-ctl" }, as = ["innerHTML"], ls = ["min", "disabled"], os = { class: "pj-group" }, ns = { class: "pj-ctl" }, is = ["innerHTML"], rs = ["disabled"], cs = ["value"], ds = ["value"], us = {
  key: 0,
  class: "pj-hint"
}, ps = { key: 0 }, vs = {
  key: 1,
  class: "pj-hint"
}, _s = { class: "pj-group" }, js = { class: "pj-ctl" }, bs = ["innerHTML"], ms = ["disabled"], ys = ["value"], ks = ["value"], hs = {
  key: 0,
  class: "pj-hint",
  style: { "margin-bottom": "8px" }
}, gs = {
  key: 1,
  class: "pj-group"
}, fs = { class: "pj-ctl" }, Cs = ["innerHTML"], Ms = ["value"], Ts = {
  key: 0,
  class: "pj-hint"
}, Ls = {
  key: 2,
  class: "pj-blockers"
}, Ps = { key: 0 }, ws = { class: "pj-actions" }, xs = ["disabled"], Ss = ["disabled"], Hs = ["disabled"], Os = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>', Es = {
  __name: "Projects",
  setup(Ds) {
    const { toast: m } = De(), { confirm: J } = Ue(), { isAdmin: L, flags: G } = Re(), O = j(() => {
      var a, e;
      return L.value || !!((e = (a = G.value.doc_access) == null ? void 0 : a.Project) != null && e.create);
    }), ce = j(() => {
      var a, e;
      return L.value || !!((e = (a = G.value.doc_access) == null ? void 0 : a.Project) != null && e.pick_manager);
    }), de = j(() => p.value ? L.value : ce.value), V = j(() => {
      var a, e;
      return L.value || !!((e = (a = G.value.doc_access) == null ? void 0 : a.Project) != null && e.edit);
    }), E = d([]), D = d(!1), A = d(""), y = d("all"), Q = d(1), F = d(25), B = d("project_code"), q = d(1), N = d(!1), p = d(!1), z = d(!1), h = d(!1), C = d([]), l = d(ve()), P = d({}), X = d([]), ue = j(() => {
      const a = X.value.map((t) => ({ value: t.name, label: t.label || t.name })), e = l.value.project_manager;
      return e && !a.some((t) => t.value === e) && a.unshift({ value: e, label: P.value[e] || e }), a.sort((t, r) => t.label.localeCompare(r.label));
    }), me = j(() => {
      const a = l.value.project_manager;
      return a ? P.value[a] || (a === ne.user ? ne.fullname : "") || a : "—";
    }), $ = j(() => p.value && l.value.status === "Closed"), pe = j(() => p.value ? !V.value : !O.value), R = j(() => $.value || pe.value), ye = [
      { key: "all", label: "All" },
      { key: "Open", label: "Open" },
      { key: "Overdue", label: "Overdue" },
      { key: "Closed", label: "Closed" }
    ], M = d("all"), ke = [
      { key: "all", label: "All Time" },
      { key: "month", label: "This Month" },
      { key: "quarter", label: "This Quarter" },
      { key: "year", label: "This Year" }
    ];
    function he() {
      const a = /* @__PURE__ */ new Date();
      return a.getFullYear() + "-" + String(a.getMonth() + 1).padStart(2, "0") + "-" + String(a.getDate()).padStart(2, "0");
    }
    function K(a) {
      return a.status !== "Closed" && !!a.expected_end_date && String(a.expected_end_date).slice(0, 10) < he();
    }
    function ge(a) {
      if (M.value === "all") return !0;
      const e = String(a.start_date || "").slice(0, 10);
      if (!e) return !1;
      const t = /* @__PURE__ */ new Date(), r = t.getFullYear(), H = t.getMonth(), _ = Math.floor(H / 3) * 3, te = (He, Oe) => He + "-" + String(Oe + 1).padStart(2, "0");
      return M.value === "month" ? e.slice(0, 7) === te(r, H) : M.value === "year" ? e.slice(0, 4) === String(r) : e.slice(0, 4) === String(r) && Number(e.slice(5, 7)) - 1 >= _ && Number(e.slice(5, 7)) - 1 < _ + 3;
    }
    function ve() {
      return { project_code: "", project_name: "", start_date: "", expected_end_date: "", project_manager: "", warehouse: "" };
    }
    const Y = j(() => {
      const a = { Open: 0, Closed: 0, Overdue: 0 };
      for (const e of E.value)
        a[e.status === "Closed" ? "Closed" : "Open"]++, K(e) && a.Overdue++;
      return a;
    }), fe = j(() => {
      const a = Y.value.Open, e = Y.value.Closed, t = Y.value.Overdue;
      return [
        { key: "total", label: "TOTAL PROJECTS", value: E.value.length, sub: "All projects", icon: "folder", tab: "all" },
        { key: "active", label: "ACTIVE PROJECTS", value: a, sub: "Currently open", icon: "activity", tab: "Open" },
        { key: "done", label: "COMPLETED", value: e, sub: "Closed projects", icon: "check", tab: "Closed" },
        { key: "overdue", label: "OVERDUE", value: t, sub: t ? "Past expected end date" : "None overdue", icon: "alert", tab: "Overdue" }
      ];
    }), Z = j(() => {
      let a = E.value;
      y.value === "Overdue" ? a = a.filter(K) : y.value !== "all" && (a = a.filter((t) => (t.status || "Open") === y.value)), M.value !== "all" && (a = a.filter(ge));
      const e = A.value.trim().toLowerCase();
      return e && (a = a.filter((t) => (t.project_code || "").toLowerCase().includes(e) || (t.project_name || "").toLowerCase().includes(e))), a;
    }), I = j(() => {
      const a = B.value, e = q.value;
      return [...Z.value].sort((t, r) => String(t[a] ?? "").localeCompare(String(r[a] ?? ""), void 0, { numeric: !0 }) * e);
    }), Ce = j(() => {
      const a = (Q.value - 1) * F.value;
      return I.value.slice(a, a + F.value);
    });
    function w(a) {
      B.value === a ? q.value *= -1 : (B.value = a, q.value = 1);
    }
    function x(a) {
      return B.value !== a ? "" : q.value === 1 ? "&#9650;" : "&#9660;";
    }
    async function S() {
      D.value = !0;
      try {
        const a = await le();
        E.value = await je("Project", {
          fields: ["name", "project_code", "project_name", "start_date", "expected_end_date", "project_manager", "warehouse", "status", "closed_by", "closed_on", "company"],
          filters: a ? [["company", "=", a]] : [],
          order: "project_code asc",
          limit: 500
        }) || [];
      } catch (a) {
        m.error("Failed to load projects: " + a.message), E.value = [];
      } finally {
        D.value = !1;
      }
    }
    function _e() {
      p.value = !1, C.value = [], l.value = ve(), ce.value || (l.value.project_manager = ne.user), N.value = !0;
    }
    function T(a) {
      p.value = !0, C.value = [], l.value = { ...a, warehouse: a.warehouse || "" }, N.value = !0;
    }
    function ee() {
      N.value = !1;
    }
    async function Me() {
      const a = l.value;
      if (a.expected_end_date && a.start_date && a.expected_end_date < a.start_date) {
        m.error("Expected End Date cannot be before Start Date");
        return;
      }
      z.value = !0;
      try {
        const e = {
          doctype: "Project",
          project_code: (a.project_code || "").trim(),
          project_name: (a.project_name || "").trim(),
          start_date: a.start_date,
          expected_end_date: a.expected_end_date || null,
          project_manager: a.project_manager || null,
          warehouse: a.warehouse || null
        };
        p.value ? e.name = a.name : e.company = await le(), await Ae(e), m.success(p.value ? "Project updated" : "Project created"), N.value = !1, await S();
      } catch (e) {
        m.error("Failed to save project: " + e.message);
      } finally {
        z.value = !1;
      }
    }
    async function Te() {
      h.value = !0, C.value = [];
      try {
        const a = await oe("psd_books.api.projects.get_project_close_status", { project: l.value.name });
        if (!(a != null && a.can_close)) {
          C.value = (a == null ? void 0 : a.open) || [], C.value.length || m.error("This project can't be closed");
          return;
        }
        if (!await J({
          title: "Close project?",
          body: `Close ${l.value.project_code}? No new MRN, LPO, GRN, delivery note, stock entry or purchase invoice can use it afterwards.`,
          okLabel: "Close Project",
          okStyle: "primary"
        })) return;
        const t = await ie("psd_books.api.projects.close_project", { project: l.value.name });
        m.success("Project closed"), l.value = { ...l.value, status: "Closed", closed_by: t == null ? void 0 : t.closed_by, closed_on: t == null ? void 0 : t.closed_on }, await S();
      } catch (a) {
        m.error("Failed to close project: " + a.message);
      } finally {
        h.value = !1;
      }
    }
    async function Le() {
      if (await J({
        title: "Reopen project?",
        body: `Reopen ${l.value.project_code}? New documents can use it again.`,
        okLabel: "Reopen",
        okStyle: "primary"
      })) {
        h.value = !0;
        try {
          await ie("psd_books.api.projects.reopen_project", { project: l.value.name }), m.success("Project reopened"), l.value = { ...l.value, status: "Open", closed_by: null, closed_on: null }, await S();
        } catch (e) {
          m.error("Failed to reopen project: " + e.message);
        } finally {
          h.value = !1;
        }
      }
    }
    async function Pe(a) {
      if (await J({
        title: "Delete project?",
        body: `Delete closed project ${a.project_code || a.name}? This cannot be undone. A project that any document uses can't be deleted.`,
        okLabel: "Delete",
        okStyle: "danger"
      }))
        try {
          await ie("psd_books.api.projects.delete_project", { project: a.name }), m.success("Project deleted"), await S();
        } catch (t) {
          m.error(t.message || "Failed to delete project");
        }
    }
    function we() {
      const a = ["Code", "Project Name", "Start Date", "Expected End Date", "Project Manager", "Status"], e = Z.value.map((_) => [_.project_code || _.name, _.project_name, _.start_date || "", _.expected_end_date || "", _.project_manager ? P.value[_.project_manager] || _.project_manager : "", _.status || "Open"]), t = [a, ...e].map((_) => _.map((te) => `"${String(te ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), r = URL.createObjectURL(new Blob([t], { type: "text/csv;charset=utf-8;" })), H = document.createElement("a");
      H.href = r, H.download = "projects.csv", H.click(), URL.revokeObjectURL(r);
    }
    const W = d([]);
    async function xe() {
      try {
        const a = await le(), e = await je("Warehouse", {
          fields: ["name"],
          filters: [...a ? [["company", "=", a]] : [], ["is_group", "=", 0], ["disabled", "=", 0], ["store_role", "in", ["Project Main Store", "Site Store"]]],
          order: "name asc",
          limit: 500
        }) || [];
        W.value = e.map((t) => t.name);
      } catch {
        W.value = [];
      }
    }
    async function Se() {
      try {
        P.value = await oe("psd_books.api.admin.get_company_user_names") || {};
      } catch {
        P.value = {};
      }
      try {
        X.value = await oe("psd_books.api.admin.get_project_manager_options") || [];
      } catch {
        X.value = [];
      }
    }
    return Ne(() => {
      S(), Se(), xe();
    }), (a, e) => (n(), o("div", Be, [
      s("div", qe, [
        s("div", ze, [
          s("span", {
            innerHTML: c(u)("search", 13),
            style: { color: "#9ca3af", "flex-shrink": "0" }
          }, null, 8, Ke),
          g(s("input", {
            "onUpdate:modelValue": e[0] || (e[0] = (t) => A.value = t),
            placeholder: "Search projects...",
            class: "sales-search-input"
          }, null, 512), [
            [U, A.value]
          ])
        ]),
        s("div", Ye, [
          (n(), o(k, null, f(ye, (t) => s("button", {
            key: t.key,
            class: re(["sales-pill", { active: y.value === t.key }]),
            onClick: (r) => y.value = t.key
          }, [
            v(i(t.label) + " ", 1),
            t.key !== "all" ? (n(), o("span", We, i(Y.value[t.key] || 0), 1)) : b("", !0)
          ], 10, Ie)), 64))
        ]),
        s("div", Je, [
          g(s("select", {
            "onUpdate:modelValue": e[1] || (e[1] = (t) => M.value = t),
            class: "sales-select",
            title: "Filter by start date"
          }, [
            (n(), o(k, null, f(ke, (t) => s("option", {
              key: t.key,
              value: t.key
            }, i(t.label), 9, Ge)), 64))
          ], 512), [
            [se, M.value]
          ]),
          s("button", {
            class: "sales-btn-ghost",
            onClick: S,
            title: "Refresh",
            disabled: D.value
          }, [
            s("span", {
              innerHTML: c(u)("refresh", 14)
            }, null, 8, Xe)
          ], 8, Qe),
          s("button", {
            class: "sales-btn-ghost",
            onClick: we,
            title: "Export CSV",
            disabled: !Z.value.length
          }, [
            s("span", {
              innerHTML: c(u)("download", 14)
            }, null, 8, et),
            e[17] || (e[17] = v(" CSV", -1))
          ], 8, Ze),
          s("button", {
            class: "sales-btn-primary",
            disabled: !O.value,
            title: O.value ? "" : "Only a Purchase Manager, Admin, Books Admin or Director can create projects",
            onClick: _e
          }, [
            s("span", {
              innerHTML: c(u)("plus", 13)
            }, null, 8, st),
            e[18] || (e[18] = v(" New Project", -1))
          ], 8, tt)
        ])
      ]),
      s("div", at, [
        (n(!0), o(k, null, f(fe.value, (t) => (n(), o("div", {
          key: t.key,
          class: re(["pj-kpi pj-kpi-click", ["pj-kpi-" + t.key, { "pj-kpi-on": y.value === t.tab }]]),
          role: "button",
          tabindex: "0",
          title: "Show " + t.label.toLowerCase(),
          onClick: (r) => y.value = t.tab,
          onKeydown: Ve((r) => y.value = t.tab, ["enter"])
        }, [
          s("div", {
            class: "pj-kpi-icon",
            innerHTML: c(u)(t.icon, 20)
          }, null, 8, ot),
          s("div", nt, [
            s("div", it, i(t.label), 1),
            s("div", rt, i(t.value), 1),
            s("div", ct, i(t.sub), 1)
          ])
        ], 42, lt))), 128))
      ]),
      s("div", dt, [
        s("table", ut, [
          s("thead", null, [
            s("tr", null, [
              s("th", {
                class: "sortable",
                onClick: e[2] || (e[2] = (t) => w("project_code"))
              }, [
                e[19] || (e[19] = v("Code ", -1)),
                s("span", {
                  innerHTML: x("project_code")
                }, null, 8, pt)
              ]),
              s("th", {
                class: "sortable",
                onClick: e[3] || (e[3] = (t) => w("project_name"))
              }, [
                e[20] || (e[20] = v("Project Name ", -1)),
                s("span", {
                  innerHTML: x("project_name")
                }, null, 8, vt)
              ]),
              s("th", {
                class: "sortable",
                onClick: e[4] || (e[4] = (t) => w("start_date"))
              }, [
                e[21] || (e[21] = v("Start Date ", -1)),
                s("span", {
                  innerHTML: x("start_date")
                }, null, 8, _t)
              ]),
              s("th", {
                class: "sortable",
                onClick: e[5] || (e[5] = (t) => w("expected_end_date"))
              }, [
                e[22] || (e[22] = v("Expected End ", -1)),
                s("span", {
                  innerHTML: x("expected_end_date")
                }, null, 8, jt)
              ]),
              s("th", {
                class: "sortable",
                onClick: e[6] || (e[6] = (t) => w("project_manager"))
              }, [
                e[23] || (e[23] = v("Project Manager ", -1)),
                s("span", {
                  innerHTML: x("project_manager")
                }, null, 8, bt)
              ]),
              s("th", {
                class: "sortable",
                onClick: e[7] || (e[7] = (t) => w("status"))
              }, [
                e[24] || (e[24] = v("Status ", -1)),
                s("span", {
                  innerHTML: x("status")
                }, null, 8, mt)
              ]),
              e[25] || (e[25] = s("th", { style: { width: "80px", "text-align": "center" } }, "Actions", -1))
            ])
          ]),
          s("tbody", null, [
            D.value ? (n(), o(k, { key: 0 }, f(5, (t) => s("tr", { key: t }, [...e[26] || (e[26] = [
              s("td", { colspan: "7" }, [
                s("div", { class: "shimmer" })
              ], -1)
            ])])), 64)) : I.value.length ? (n(!0), o(k, { key: 2 }, f(Ce.value, (t) => (n(), o("tr", {
              key: t.name,
              class: "inv-row"
            }, [
              s("td", {
                onClick: (r) => T(t),
                "data-label": "Code"
              }, [
                s("span", Tt, i(t.project_code || t.name), 1)
              ], 8, Mt),
              s("td", {
                onClick: (r) => T(t),
                "data-label": "Project Name"
              }, i(t.project_name), 9, Lt),
              s("td", {
                onClick: (r) => T(t),
                "data-label": "Start Date"
              }, i(t.start_date ? c(be)(t.start_date) : "—"), 9, Pt),
              s("td", {
                onClick: (r) => T(t),
                "data-label": "Expected End"
              }, i(t.expected_end_date ? c(be)(t.expected_end_date) : "—"), 9, wt),
              s("td", {
                onClick: (r) => T(t),
                "data-label": "Project Manager"
              }, i(t.project_manager ? P.value[t.project_manager] || t.project_manager : "—"), 9, xt),
              s("td", {
                onClick: (r) => T(t),
                "data-label": "Status"
              }, [
                s("span", {
                  class: re(["inv-status-badge", K(t) ? "pj-badge-overdue" : t.status === "Closed" ? "status-draft" : "status-active"])
                }, i(K(t) ? "Overdue" : t.status || "Open"), 3)
              ], 8, St),
              s("td", {
                style: { "text-align": "center", "white-space": "nowrap" },
                onClick: e[8] || (e[8] = ae(() => {
                }, ["stop"]))
              }, [
                s("button", {
                  class: "inv-act-btn",
                  onClick: (r) => T(t),
                  disabled: !V.value,
                  title: "Edit"
                }, [
                  s("span", {
                    innerHTML: c(u)("edit", 13)
                  }, null, 8, Ot)
                ], 8, Ht),
                c(L) && t.status === "Closed" ? (n(), o("button", {
                  key: 0,
                  class: "inv-act-btn",
                  style: { color: "#e03131" },
                  title: "Delete closed project",
                  onClick: (r) => Pe(t)
                }, [
                  s("span", {
                    innerHTML: c(u)("trash", 13)
                  }, null, 8, Dt)
                ], 8, Et)) : b("", !0)
              ])
            ]))), 128)) : (n(), o("tr", yt, [
              s("td", kt, [
                s("div", ht, [
                  A.value || y.value !== "all" || M.value !== "all" ? (n(), o("p", gt, "No projects match your filters")) : (n(), o(k, { key: 1 }, [
                    e[28] || (e[28] = s("p", { class: "bk-empty-title" }, "No projects yet", -1)),
                    e[29] || (e[29] = s("p", { class: "bk-empty-sub" }, "Create your first project to get started.", -1)),
                    s("button", {
                      class: "bk-empty-btn",
                      disabled: !O.value,
                      onClick: _e
                    }, [
                      s("span", {
                        innerHTML: c(u)("plus", 13)
                      }, null, 8, Ct),
                      e[27] || (e[27] = v(" New Project", -1))
                    ], 8, ft)
                  ], 64))
                ])
              ])
            ]))
          ])
        ])
      ]),
      !D.value && I.value.length ? (n(), o("div", Nt, [
        $e(Fe, {
          page: Q.value,
          "onUpdate:page": e[9] || (e[9] = (t) => Q.value = t),
          "page-size": F.value,
          "onUpdate:pageSize": e[10] || (e[10] = (t) => F.value = t),
          "total-items": I.value.length
        }, null, 8, ["page", "page-size", "total-items"])
      ])) : b("", !0),
      N.value ? (n(), o("div", {
        key: 1,
        class: "pj-overlay",
        onClick: ae(ee, ["self"])
      }, [
        s("div", $t, [
          s("div", Rt, [
            s("div", {
              class: "pj-head-icon",
              innerHTML: c(u)("folder", 24)
            }, null, 8, Ut),
            s("div", Vt, [
              s("h3", At, i(p.value ? "Edit Project" : "New Project"), 1),
              s("div", Ft, i(p.value ? "Update project details" : "Create a new project and set project details"), 1)
            ]),
            s("button", {
              type: "button",
              class: "pj-close",
              onClick: ee,
              title: "Close"
            }, [
              s("span", {
                innerHTML: c(u)("x", 20)
              }, null, 8, Bt)
            ])
          ]),
          s("form", {
            class: "pj-body",
            onSubmit: ae(Me, ["prevent"])
          }, [
            s("div", qt, [
              e[30] || (e[30] = s("label", null, [
                v("Project Code "),
                s("span", { class: "nim-req" }, "*")
              ], -1)),
              s("div", zt, [
                s("span", {
                  class: "pj-ico",
                  innerHTML: c(u)("file", 16)
                }, null, 8, Kt),
                g(s("input", {
                  "onUpdate:modelValue": e[11] || (e[11] = (t) => l.value.project_code = t),
                  disabled: p.value,
                  required: "",
                  maxlength: "40",
                  placeholder: "e.g. SB-001"
                }, null, 8, Yt), [
                  [U, l.value.project_code]
                ])
              ])
            ]),
            s("div", It, [
              e[31] || (e[31] = s("label", null, [
                v("Project Name "),
                s("span", { class: "nim-req" }, "*")
              ], -1)),
              s("div", Wt, [
                s("span", {
                  class: "pj-ico",
                  innerHTML: Os
                }),
                g(s("input", {
                  "onUpdate:modelValue": e[12] || (e[12] = (t) => l.value.project_name = t),
                  required: "",
                  maxlength: "140",
                  disabled: R.value,
                  placeholder: "Enter project name"
                }, null, 8, Jt), [
                  [U, l.value.project_name]
                ])
              ])
            ]),
            s("div", Gt, [
              s("div", Qt, [
                e[32] || (e[32] = s("label", null, [
                  v("Start Date "),
                  s("span", { class: "nim-req" }, "*")
                ], -1)),
                s("div", Xt, [
                  s("span", {
                    class: "pj-ico",
                    innerHTML: c(u)("calendar", 16)
                  }, null, 8, Zt),
                  g(s("input", {
                    type: "date",
                    "onUpdate:modelValue": e[13] || (e[13] = (t) => l.value.start_date = t),
                    required: "",
                    disabled: R.value
                  }, null, 8, es), [
                    [U, l.value.start_date]
                  ])
                ])
              ]),
              s("div", ts, [
                e[33] || (e[33] = s("label", null, "Expected End Date", -1)),
                s("div", ss, [
                  s("span", {
                    class: "pj-ico",
                    innerHTML: c(u)("calendar", 16)
                  }, null, 8, as),
                  g(s("input", {
                    type: "date",
                    "onUpdate:modelValue": e[14] || (e[14] = (t) => l.value.expected_end_date = t),
                    min: l.value.start_date || null,
                    disabled: R.value
                  }, null, 8, ls), [
                    [U, l.value.expected_end_date]
                  ])
                ])
              ])
            ]),
            s("div", os, [
              e[36] || (e[36] = s("label", null, "Project Manager", -1)),
              s("div", ns, [
                s("span", {
                  class: "pj-ico",
                  innerHTML: c(u)("user", 16)
                }, null, 8, is),
                de.value ? g((n(), o("select", {
                  key: 0,
                  "onUpdate:modelValue": e[15] || (e[15] = (t) => l.value.project_manager = t),
                  disabled: R.value
                }, [
                  e[34] || (e[34] = s("option", { value: "" }, "— None —", -1)),
                  (n(!0), o(k, null, f(ue.value, (t) => (n(), o("option", {
                    key: t.value,
                    value: t.value
                  }, i(t.label), 9, cs))), 128))
                ], 8, rs)), [
                  [se, l.value.project_manager]
                ]) : (n(), o("input", {
                  key: 1,
                  value: me.value,
                  disabled: ""
                }, null, 8, ds))
              ]),
              de.value ? (n(), o("div", us, [
                e[35] || (e[35] = v(" Optional. All employees except store users are listed. ", -1)),
                ue.value.length ? b("", !0) : (n(), o("span", ps, " No employee is available yet: add users under Settings > Users."))
              ])) : (n(), o("div", vs, i(p.value ? "Only a Books Admin or Director can change the Project Manager." : "You will be the Project Manager of this project."), 1))
            ]),
            s("div", _s, [
              e[38] || (e[38] = s("label", null, "Warehouse", -1)),
              s("div", js, [
                s("span", {
                  class: "pj-ico",
                  innerHTML: c(u)("box", 16)
                }, null, 8, bs),
                g(s("select", {
                  "onUpdate:modelValue": e[16] || (e[16] = (t) => l.value.warehouse = t),
                  disabled: R.value
                }, [
                  e[37] || (e[37] = s("option", { value: "" }, "— None —", -1)),
                  (n(!0), o(k, null, f(W.value, (t) => (n(), o("option", {
                    key: t,
                    value: t
                  }, i(t), 9, ys))), 128)),
                  l.value.warehouse && !W.value.includes(l.value.warehouse) ? (n(), o("option", {
                    key: 0,
                    value: l.value.warehouse
                  }, i(l.value.warehouse), 9, ks)) : b("", !0)
                ], 8, ms), [
                  [se, l.value.warehouse]
                ])
              ]),
              e[39] || (e[39] = s("div", { class: "pj-hint" }, "Project store for this project (optional). Linked both ways with the warehouse's Projects list. Create a new store under Inventory > Warehouses.", -1))
            ]),
            pe.value ? (n(), o("div", hs, " You can view this project, but only a Project Manager, Books Admin or Director can edit it. ")) : b("", !0),
            p.value ? (n(), o("div", gs, [
              e[40] || (e[40] = s("label", null, "Status", -1)),
              s("div", fs, [
                s("span", {
                  class: "pj-ico",
                  innerHTML: c(u)("info", 16)
                }, null, 8, Cs),
                s("input", {
                  value: l.value.status || "Open",
                  disabled: ""
                }, null, 8, Ms)
              ]),
              $.value && l.value.closed_on ? (n(), o("div", Ts, " Closed by " + i(l.value.closed_by || "unknown") + " on " + i(String(l.value.closed_on).slice(0, 16).replace("T", " ")), 1)) : b("", !0)
            ])) : b("", !0),
            C.value.length ? (n(), o("div", Ls, [
              e[41] || (e[41] = s("div", { class: "pj-blockers-title" }, "Can't close yet - these are still open:", -1)),
              s("ul", null, [
                (n(!0), o(k, null, f(C.value, (t) => (n(), o("li", {
                  key: t.doctype
                }, [
                  s("strong", null, i(t.count) + " " + i(t.label), 1),
                  v(": " + i(t.names.join(", ")), 1),
                  t.count > t.names.length ? (n(), o("span", Ps, " and " + i(t.count - t.names.length) + " more", 1)) : b("", !0)
                ]))), 128))
              ])
            ])) : b("", !0),
            s("div", ws, [
              p.value && !$.value ? (n(), o("button", {
                key: 0,
                type: "button",
                class: "pj-btn-warn",
                style: { "margin-right": "auto" },
                disabled: h.value || !V.value,
                onClick: Te
              }, i(h.value ? "Checking…" : "Close Project"), 9, xs)) : b("", !0),
              p.value && $.value && c(L) ? (n(), o("button", {
                key: 1,
                type: "button",
                class: "pj-btn-sec",
                style: { "margin-right": "auto" },
                disabled: h.value,
                onClick: Le
              }, i(h.value ? "Reopening…" : "Reopen Project"), 9, Ss)) : b("", !0),
              s("button", {
                type: "button",
                class: "pj-btn-sec",
                onClick: ee
              }, "Cancel"),
              s("button", {
                type: "submit",
                class: "pj-btn-pri",
                disabled: z.value || $.value || !(p.value ? V.value : O.value)
              }, i(z.value ? "Saving…" : "Save"), 9, Hs)
            ])
          ], 32)
        ])
      ])) : b("", !0)
    ]));
  }
}, Us = /* @__PURE__ */ Ee(Es, [["__scopeId", "data-v-5610fd88"]]);
export {
  Us as default
};
