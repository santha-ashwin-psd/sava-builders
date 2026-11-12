import { x as xe, o as Le, m as Se, c as d, a as e, u as p, i as b, w as G, A as W, b as k, n as g, d as m, t as c, F as L, r as N, f as R, h as _, e as J, g as H, X as Ve, a2 as De, z as Te, K as Ee, a3 as Me, k as r, p as Ne, D as S } from "./main-BmCP9zzu.js";
import { b as re, f as He } from "./format-BcJZDVG4.js";
import { o as ue } from "./userNames-DbrZspN6.js";
import { _ as V } from "./SearchableSelect-BSBsdJym.js";
const $e = { class: "ac-page" }, Ue = { class: "ac-toolbar" }, ze = { class: "ac-toolbar-left" }, Fe = { class: "ac-search-wrap" }, Oe = ["innerHTML"], Re = ["innerHTML"], je = ["disabled", "title"], Ie = ["innerHTML"], qe = { class: "ac-body" }, Be = { class: "ac-sidebar-header" }, Ge = { class: "ac-sidebar-title" }, We = { class: "ac-sidebar-count" }, Je = { class: "ac-sidebar-stats" }, Ke = {
  key: 0,
  class: "ac-shimmer-wrap"
}, Pe = {
  key: 1,
  class: "ac-tree-empty"
}, Xe = {
  key: 2,
  class: "ac-tree-scroll"
}, Ye = ["onClick"], Qe = { class: "ac-node-icon" }, Ze = { class: "ac-node-label" }, ea = {
  key: 0,
  class: "ac-node-item-count"
}, aa = {
  key: 0,
  class: "ac-mob-back-bar"
}, ta = ["innerHTML"], sa = { class: "ac-mob-back-title" }, oa = {
  key: 1,
  class: "ac-empty-state"
}, na = ["innerHTML"], ca = {
  key: 2,
  class: "ac-form-wrap"
}, ia = { class: "ac-view-header" }, la = { style: { "font-size": "26px" } }, da = { class: "ac-form-header-info" }, ra = { class: "ac-form-header-title" }, ua = { class: "ac-form-header-sub" }, va = { class: "ac-form-stats" }, ma = { class: "ac-form-stat" }, pa = { class: "ac-form-stat-val" }, _a = { class: "ac-view-card" }, ya = { class: "ac-view-rows" }, fa = { class: "ac-view-row" }, ga = { class: "ac-view-val" }, ba = {
  key: 0,
  class: "ac-view-row"
}, ha = { class: "ac-view-val" }, wa = { class: "ac-view-row" }, Ca = { class: "ac-view-val" }, ka = {
  key: 0,
  class: "inv-view-footer"
}, Aa = { class: "ac-form-actions" }, xa = ["disabled", "title"], La = ["innerHTML"], Sa = ["disabled", "title"], Va = ["innerHTML"], Da = { class: "ac-items-section" }, Ta = { class: "ac-items-hdr" }, Ea = {
  key: 0,
  class: "ac-items-count-pill"
}, Ma = {
  key: 0,
  class: "ac-items-shimmer-wrap"
}, Na = {
  key: 1,
  class: "ac-items-empty"
}, Ha = { class: "ac-items-empty-title" }, $a = {
  key: 2,
  class: "ac-items-grid"
}, Ua = { class: "ac-item-card-top" }, za = { class: "ac-item-card-badges" }, Fa = { class: "ac-item-card-name" }, Oa = { class: "ac-item-card-code" }, Ra = { class: "ac-item-card-footer" }, ja = { class: "ac-item-card-dept" }, Ia = { class: "ac-item-card-cost" }, qa = {
  key: 3,
  class: "ac-form-wrap"
}, Ba = { class: "ac-form-header" }, Ga = { style: { "font-size": "26px" } }, Wa = { class: "ac-form-header-info" }, Ja = { class: "ac-form-header-title" }, Ka = { class: "ac-form-header-sub" }, Pa = { class: "ac-form-stats" }, Xa = { class: "ac-form-stat" }, Ya = { class: "ac-form-stat-val" }, Qa = { class: "ac-form-card" }, Za = { class: "ac-form-grid" }, et = { class: "ac-field" }, at = {
  class: "ac-field",
  style: { "margin-top": "14px" }
}, tt = { class: "ac-is-active-row" }, st = { class: "ac-is-active-label" }, ot = { class: "ac-toggle-wrap" }, nt = ["checked"], ct = { class: "ac-form-card" }, it = { class: "ac-acct-hdr" }, lt = ["disabled", "title"], dt = ["innerHTML"], rt = {
  key: 0,
  class: "ac-acct-empty"
}, ut = { class: "ac-acct-row-top" }, vt = {
  class: "ac-field",
  style: { flex: "1" }
}, mt = ["disabled", "onClick"], pt = ["innerHTML"], _t = { class: "ac-acct-row-grid" }, yt = { class: "ac-field" }, ft = { class: "ac-field" }, gt = { class: "ac-field" }, bt = { class: "ac-field" }, ht = { class: "ac-field" }, wt = { class: "ac-form-actions" }, Ct = ["disabled"], kt = ["innerHTML"], Dt = {
  __name: "AssetCategory",
  setup(At) {
    const { toast: h } = xe(), { confirm: ve } = Me(), u = _("none"), D = _(""), w = _([]), j = _(!0), T = _(!1), f = _(null), o = _(null), E = _(""), $ = _(window.innerWidth <= 480), U = _([]), z = _(!1), i = Te({ name: "", category_name: "", description: "", is_active: 1, accounts: [] }), F = _([]), A = _("");
    function K() {
      $.value = window.innerWidth <= 480;
    }
    function me() {
      return {
        company: "",
        fixed_asset_account: "",
        accumulated_depreciation_account: "",
        depreciation_expense_account: "",
        cwip_account: "",
        gst_input_account: "",
        // UI-only, per-row dropdown option caches — stripped before save.
        _opts: { fixed: [], accdep: [], depexp: [], cwip: [], gst: [] }
      };
    }
    function pe() {
      i.accounts.push({ ...me(), company: A.value || "" });
    }
    function _e(s) {
      i.accounts.splice(s, 1);
    }
    async function P(s = "") {
      if (!A.value) {
        F.value = [];
        return;
      }
      try {
        const a = await R("Books Company", {
          fields: ["name", "company_name"],
          filters: [["name", "=", A.value]],
          limit: 1
        });
        F.value = (a || []).map((l) => ({ label: l.company_name || l.name, value: l.name }));
      } catch {
        F.value = [{ label: A.value, value: A.value }];
      }
    }
    async function M(s, a, l, y = "") {
      try {
        const n = [["is_group", "=", 0]];
        l && n.push(["account_type", "=", l]), s.company && n.push(["company", "=", s.company]), y && n.push(["name", "like", `%${y}%`]);
        const C = await R("Account", { fields: ["name", "account_name"], filters: n, limit: 30, order: "name asc" });
        s._opts[a] = (C || []).map((x) => ({ label: x.account_name || x.name, value: x.name }));
      } catch {
        s._opts[a] = [];
      }
    }
    const ye = [
      { name: "ACS-001", category_name: "Electronics", description: "Electronic devices and components", is_active: 1 },
      { name: "ACS-002", category_name: "Furniture", description: "Office and warehouse furniture", is_active: 1 },
      { name: "ACS-003", category_name: "Vehicles", description: "Company vehicles and transport", is_active: 1 },
      { name: "ACS-004", category_name: "Computer Equipment", description: "Laptops, desktops, servers", is_active: 1 },
      { name: "ACS-005", category_name: "Office Equipment", description: "Printers, scanners, projectors", is_active: 1 }
    ];
    async function I() {
      j.value = !0;
      try {
        const s = await R("Asset Category", {
          fields: ["name", "category_name", "description", "is_active", "owner", "creation", "modified_by", "modified"],
          order: "name asc",
          limit: 200
        });
        w.value = s || [];
      } catch {
        w.value = ye;
      }
      j.value = !1;
    }
    async function fe() {
      z.value = !0;
      try {
        U.value = await R("Asset", {
          fields: ["name", "asset_name", "asset_code", "asset_category", "status", "purchase_cost", "department", "is_active"],
          order: "asset_name asc",
          limit: 500
        });
      } catch {
        U.value = [];
      }
      z.value = !1;
    }
    const X = H(() => {
      const s = {};
      return U.value.forEach((a) => {
        const l = a.asset_category || "";
        s[l] || (s[l] = []), s[l].push(a);
      }), s;
    }), q = H(
      () => f.value ? X.value[f.value] || [] : []
    ), Y = H(() => {
      const s = E.value.toLowerCase().trim();
      return s ? w.value.filter((a) => (a.name || "").toLowerCase().includes(s) || (a.description || "").toLowerCase().includes(s)).sort((a, l) => a.name.localeCompare(l.name)) : w.value;
    }), O = (s) => (X.value[s] || []).length, ge = H(() => w.value.filter((s) => s.is_active).length), be = H(() => U.value.length);
    function he(s) {
      f.value = s.name, o.value = s, u.value = "view";
    }
    async function we() {
      if (o.value) {
        D.value = o.value.name, Object.assign(i, {
          name: o.value.name,
          category_name: o.value.category_name || "",
          description: o.value.description || "",
          is_active: o.value.is_active ? 1 : 0,
          accounts: []
        }), u.value = "edit";
        try {
          const s = await Ve("Asset Category", o.value.name);
          A.value = (s == null ? void 0 : s.books_company) || await J() || "", i.accounts = ((s == null ? void 0 : s.accounts) || []).map((a) => ({
            company: a.company || "",
            fixed_asset_account: a.fixed_asset_account || "",
            accumulated_depreciation_account: a.accumulated_depreciation_account || "",
            depreciation_expense_account: a.depreciation_expense_account || "",
            cwip_account: a.cwip_account || "",
            gst_input_account: a.gst_input_account || "",
            _opts: { fixed: [], accdep: [], depexp: [], cwip: [], gst: [] }
          }));
        } catch (s) {
          h("Failed to load account setup: " + s.message, "error");
        }
      }
    }
    async function Q() {
      f.value = null, o.value = null, Object.assign(i, { name: "", category_name: "", description: "", is_active: 1, accounts: [] }), A.value = await J() || "", u.value = "new";
    }
    function Ce() {
      u.value === "edit" ? u.value = "view" : u.value = f.value ? "view" : "none";
    }
    async function ke() {
      if (!i.category_name.trim()) {
        h("Category name is required", "error");
        return;
      }
      for (const a of i.accounts)
        if (!a.company || !a.fixed_asset_account || !a.accumulated_depreciation_account || !a.depreciation_expense_account) {
          h("Each company row needs Company, Fixed Asset, Accumulated Depreciation and Depreciation Expense accounts", "error");
          return;
        }
      const s = /* @__PURE__ */ new Set();
      for (const a of i.accounts) {
        if (s.has(a.company)) {
          h(`Company "${a.company}" is configured more than once`, "error");
          return;
        }
        s.add(a.company);
      }
      T.value = !0;
      try {
        const a = i.category_name.trim(), l = u.value === "edit", y = {
          doctype: "Asset Category",
          category_name: a,
          description: i.description,
          is_active: i.is_active ? 1 : 0
        };
        if (!l) {
          const n = await J();
          if (!n) {
            h("No company configured.", "error"), T.value = !1;
            return;
          }
          y.books_company = n;
        }
        if (Object.assign(y, {
          accounts: i.accounts.map((n) => ({
            company: n.company,
            fixed_asset_account: n.fixed_asset_account,
            accumulated_depreciation_account: n.accumulated_depreciation_account,
            depreciation_expense_account: n.depreciation_expense_account,
            cwip_account: n.cwip_account || "",
            gst_input_account: n.gst_input_account || ""
          }))
        }), l && (y.name = D.value), await Ee(y), await I(), l) {
          const n = w.value.find((C) => C.name === D.value);
          n && (f.value = n.name, o.value = n, D.value = n.name);
        } else {
          const n = w.value.find((C) => C.category_name === a);
          n && (f.value = n.name, o.value = n, D.value = n.name, Object.assign(i, { name: n.name, category_name: n.category_name || "" }));
        }
        h(l ? "Category updated" : "Category created"), u.value = l ? "view" : "none";
      } catch (a) {
        console.error("saveCategory error:", a);
        const l = (a == null ? void 0 : a.response) || (a == null ? void 0 : a.data) || a, y = l && typeof l == "object" ? `
` + JSON.stringify(l, null, 2).slice(0, 400) : "", n = typeof (a == null ? void 0 : a.message) == "string" && a.message ? a.message : l && typeof l == "object" ? JSON.stringify(l).slice(0, 200) : (a == null ? void 0 : a.message) || String(a);
        h("Save failed: " + n + y, "error");
      } finally {
        T.value = !1;
      }
    }
    async function Ae() {
      if (!(!o.value || !await ve({
        title: "Delete category?",
        body: `Delete "${o.value.name}"? This cannot be undone.`,
        okLabel: "Delete"
      })))
        try {
          await De("Asset Category", o.value.name), await I(), f.value = null, o.value = null, u.value = "none", h("Category deleted");
        } catch (a) {
          h("Delete failed: " + a.message, "error");
        }
    }
    return Le(() => {
      I(), fe(), P(), window.addEventListener("resize", K, { passive: !0 });
    }), Se(() => window.removeEventListener("resize", K)), (s, a) => {
      var l, y, n, C, x, Z, ee, ae, te, se, oe, ne, ce, ie, le, de;
      return r(), d("div", $e, [
        e("div", Ue, [
          e("div", ze, [
            e("div", Fe, [
              e("span", {
                innerHTML: p(b)("search"),
                class: "ac-search-icon"
              }, null, 8, Oe),
              G(e("input", {
                "onUpdate:modelValue": a[0] || (a[0] = (t) => E.value = t),
                class: "ac-search-input",
                placeholder: "Search categories…"
              }, null, 512), [
                [W, E.value]
              ]),
              E.value ? (r(), d("button", {
                key: 0,
                class: "ac-search-clear",
                onClick: a[1] || (a[1] = (t) => E.value = "")
              }, [
                e("span", {
                  innerHTML: p(b)("x", 12)
                }, null, 8, Re)
              ])) : k("", !0)
            ])
          ]),
          e("button", {
            class: "ac-new-btn",
            disabled: !s.$canCreate("inventory"),
            title: s.$canCreate("inventory") ? "" : "Read-only access",
            onClick: Q
          }, [
            e("span", {
              innerHTML: p(b)("plus", 13)
            }, null, 8, Ie),
            a[6] || (a[6] = e("span", { class: "ac-btn-label" }, "New Category", -1))
          ], 8, je)
        ]),
        e("div", qe, [
          e("aside", {
            class: g(["ac-sidebar", { "ac-mob-hidden": $.value && u.value !== "none" }])
          }, [
            e("div", Be, [
              e("div", Ge, [
                a[7] || (a[7] = m(" Asset Categories ", -1)),
                e("span", We, c(w.value.length), 1)
              ]),
              e("div", Je, c(ge.value) + " active · " + c(be.value) + " assets ", 1)
            ]),
            j.value ? (r(), d("div", Ke, [
              (r(), d(L, null, N(6, (t) => e("div", {
                key: t,
                class: "ac-shimmer-row"
              }, [
                e("div", {
                  class: "b-shimmer",
                  style: Ne({ width: 70 + t * 5 + "%", height: "14px", borderRadius: "4px" })
                }, null, 4)
              ])), 64))
            ])) : Y.value.length ? (r(), d("div", Xe, [
              (r(!0), d(L, null, N(Y.value, (t) => (r(), d("div", {
                key: t.name,
                class: g(["ac-tree-node", {
                  "ac-tree-node--active": f.value === t.name,
                  "ac-tree-node--active-cat": f.value === t.name && t.is_active,
                  "ac-tree-node--inactive-cat": f.value === t.name && !t.is_active
                }]),
                onClick: (B) => he(t)
              }, [
                e("span", Qe, c(t.is_active ? "📂" : "📁"), 1),
                e("span", Ze, c(t.category_name || t.name), 1),
                O(t.name) > 0 ? (r(), d("span", ea, c(O(t.name)), 1)) : k("", !0),
                e("span", {
                  class: g(["ac-node-status-pill", t.is_active ? "ac-pill-active" : "ac-pill-inactive"])
                }, c(t.is_active ? "Active" : "Inactive"), 3)
              ], 10, Ye))), 128))
            ])) : (r(), d("div", Pe, [...a[8] || (a[8] = [
              e("div", { style: { "font-size": "28px", "margin-bottom": "8px" } }, "🔍", -1),
              e("div", { style: { "font-size": "13px", color: "#94a3b8" } }, "No categories found", -1)
            ])]))
          ], 2),
          e("main", {
            class: g(["ac-detail", { "ac-mob-hidden": $.value && u.value === "none" }])
          }, [
            $.value && u.value !== "none" ? (r(), d("div", aa, [
              e("button", {
                class: "ac-mob-back-btn",
                onClick: a[2] || (a[2] = (t) => u.value = "none")
              }, [
                e("span", {
                  innerHTML: p(b)("chevL", 15)
                }, null, 8, ta),
                a[9] || (a[9] = m(" Categories ", -1))
              ]),
              e("div", sa, c(u.value === "new" ? "New Category" : ((l = o.value) == null ? void 0 : l.category_name) || ((y = o.value) == null ? void 0 : y.name) || ""), 1)
            ])) : k("", !0),
            u.value === "none" ? (r(), d("div", oa, [
              a[11] || (a[11] = e("div", { class: "ac-empty-icon" }, "📁", -1)),
              a[12] || (a[12] = e("div", { class: "ac-empty-title" }, "Select a category to view", -1)),
              a[13] || (a[13] = e("div", { class: "ac-empty-sub" }, "Click any asset category from the list to see its details", -1)),
              e("button", {
                class: "ac-action-btn ac-action-btn--primary",
                style: { "margin-top": "18px" },
                onClick: Q
              }, [
                e("span", {
                  innerHTML: p(b)("plus", 13)
                }, null, 8, na),
                a[10] || (a[10] = m(" New Category ", -1))
              ])
            ])) : u.value === "view" ? (r(), d("div", ca, [
              e("div", ia, [
                e("div", {
                  class: g(["ac-form-icon-wrap", (n = o.value) != null && n.is_active ? "ac-form-icon--active" : "ac-form-icon--inactive"])
                }, [
                  e("span", la, c((C = o.value) != null && C.is_active ? "📂" : "📁"), 1)
                ], 2),
                e("div", da, [
                  e("div", ra, c(((x = o.value) == null ? void 0 : x.category_name) || ((Z = o.value) == null ? void 0 : Z.name)), 1),
                  e("div", ua, [
                    e("span", {
                      class: g(["ac-view-badge", (ee = o.value) != null && ee.is_active ? "ac-badge-active" : "ac-badge-inactive"])
                    }, c((ae = o.value) != null && ae.is_active ? "Active" : "Inactive"), 3)
                  ])
                ]),
                e("div", va, [
                  e("div", ma, [
                    e("div", pa, c(O(((te = o.value) == null ? void 0 : te.name) || "")), 1),
                    a[14] || (a[14] = e("div", { class: "ac-form-stat-lbl" }, "Assets", -1))
                  ])
                ])
              ]),
              e("div", _a, [
                a[18] || (a[18] = e("div", { class: "ac-form-section" }, "Details", -1)),
                e("div", ya, [
                  e("div", fa, [
                    a[15] || (a[15] = e("div", { class: "ac-view-lbl" }, "Category Name", -1)),
                    e("div", ga, c(((se = o.value) == null ? void 0 : se.category_name) || ((oe = o.value) == null ? void 0 : oe.name)), 1)
                  ]),
                  (ne = o.value) != null && ne.description ? (r(), d("div", ba, [
                    a[16] || (a[16] = e("div", { class: "ac-view-lbl" }, "Description", -1)),
                    e("div", ha, c(o.value.description), 1)
                  ])) : k("", !0),
                  e("div", wa, [
                    a[17] || (a[17] = e("div", { class: "ac-view-lbl" }, "Status", -1)),
                    e("div", Ca, [
                      e("span", {
                        class: g(["ac-type-pill", (ce = o.value) != null && ce.is_active ? "ac-type-pill--active" : "ac-type-pill--inactive"])
                      }, c((ie = o.value) != null && ie.is_active ? "Active" : "Inactive"), 3)
                    ])
                  ])
                ])
              ]),
              (le = o.value) != null && le.owner ? (r(), d("div", ka, [
                m(" Created by " + c(p(ue)(o.value.owner)) + " on " + c(p(re)(o.value.creation)) + " ", 1),
                o.value.modified_by ? (r(), d(L, { key: 0 }, [
                  m(" · Last modified by " + c(p(ue)(o.value.modified_by)) + " on " + c(p(re)(o.value.modified)), 1)
                ], 64)) : k("", !0)
              ])) : k("", !0),
              e("div", Aa, [
                e("button", {
                  class: "ac-action-btn ac-action-btn--primary",
                  disabled: !s.$canEdit("inventory"),
                  title: s.$canEdit("inventory") ? "" : "Read-only access",
                  onClick: we
                }, [
                  e("span", {
                    innerHTML: p(b)("edit", 13)
                  }, null, 8, La),
                  a[19] || (a[19] = m(" Edit Category ", -1))
                ], 8, xa),
                e("button", {
                  class: "ac-action-btn ac-action-btn--danger",
                  disabled: !s.$canDelete("inventory"),
                  title: s.$canDelete("inventory") ? "" : "Not permitted",
                  onClick: Ae
                }, [
                  e("span", {
                    innerHTML: p(b)("trash", 13)
                  }, null, 8, Va),
                  a[20] || (a[20] = m(" Delete ", -1))
                ], 8, Sa)
              ]),
              e("div", Da, [
                e("div", Ta, [
                  a[21] || (a[21] = e("div", {
                    class: "ac-form-section",
                    style: { "margin-bottom": "0" }
                  }, "Assets in this Category", -1)),
                  z.value ? k("", !0) : (r(), d("span", Ea, c(q.value.length), 1))
                ]),
                z.value ? (r(), d("div", Ma, [
                  (r(), d(L, null, N(3, (t) => e("div", {
                    key: t,
                    class: "b-shimmer",
                    style: { height: "76px", "border-radius": "10px" }
                  })), 64))
                ])) : q.value.length ? (r(), d("div", $a, [
                  (r(!0), d(L, null, N(q.value, (t) => (r(), d("div", {
                    key: t.name,
                    class: g(["ac-item-card", { "ac-item-card--disabled": !t.is_active }])
                  }, [
                    e("div", Ua, [
                      a[25] || (a[25] = e("span", { class: "ac-item-card-icon" }, "🏢", -1)),
                      e("div", za, [
                        e("span", {
                          class: g(["ac-asset-status-badge", "ac-status--" + (t.status || "Draft").toLowerCase().replace(/\s+/g, "")])
                        }, c(t.status || "Draft"), 3)
                      ])
                    ]),
                    e("div", Fa, c(t.asset_name), 1),
                    e("div", Oa, c(t.asset_code || t.name), 1),
                    e("div", Ra, [
                      e("span", ja, c(t.department || "—"), 1),
                      e("span", Ia, "KES " + c(p(He)(t.purchase_cost, 2)), 1)
                    ])
                  ], 2))), 128))
                ])) : (r(), d("div", Na, [
                  a[23] || (a[23] = e("div", { style: { "font-size": "30px", "margin-bottom": "8px" } }, "📭", -1)),
                  e("div", Ha, [
                    a[22] || (a[22] = m("No assets in ", -1)),
                    e("strong", null, c((de = o.value) == null ? void 0 : de.name), 1)
                  ]),
                  a[24] || (a[24] = e("div", { class: "ac-items-empty-sub" }, [
                    m(" Go to "),
                    e("strong", null, "Assets"),
                    m(" and create an asset with this category ")
                  ], -1))
                ]))
              ])
            ])) : (r(), d("div", qa, [
              e("div", Ba, [
                e("div", {
                  class: g(["ac-form-icon-wrap", i.is_active ? "ac-form-icon--active" : "ac-form-icon--inactive"])
                }, [
                  e("span", Ga, c(i.is_active ? "📂" : "📁"), 1)
                ], 2),
                e("div", Wa, [
                  e("div", Ja, c(u.value === "edit" ? i.category_name || i.name : "New Asset Category"), 1),
                  e("div", Ka, [
                    e("span", {
                      class: g(["ac-form-mode-badge", u.value === "new" ? "ac-form-mode-badge--new" : "ac-form-mode-badge--edit"])
                    }, c(u.value === "new" ? "New" : "Editing"), 3)
                  ])
                ]),
                e("div", Pa, [
                  e("div", Xa, [
                    e("div", Ya, c(O(i.name)), 1),
                    a[26] || (a[26] = e("div", { class: "ac-form-stat-lbl" }, "Assets", -1))
                  ])
                ])
              ]),
              e("div", Qa, [
                a[31] || (a[31] = e("div", { class: "ac-form-section" }, "Category Details", -1)),
                e("div", Za, [
                  e("div", et, [
                    a[27] || (a[27] = e("label", { class: "ac-label" }, [
                      m("Category Name "),
                      e("span", { style: { color: "#dc2626" } }, "*")
                    ], -1)),
                    G(e("input", {
                      class: "ac-input",
                      "onUpdate:modelValue": a[3] || (a[3] = (t) => i.category_name = t),
                      placeholder: "e.g. Electronics"
                    }, null, 512), [
                      [W, i.category_name]
                    ])
                  ])
                ]),
                e("div", at, [
                  a[28] || (a[28] = e("label", { class: "ac-label" }, "Description", -1)),
                  G(e("textarea", {
                    class: "ac-input",
                    "onUpdate:modelValue": a[4] || (a[4] = (t) => i.description = t),
                    rows: "3",
                    placeholder: "Brief description of this category…",
                    style: { resize: "vertical" }
                  }, null, 512), [
                    [W, i.description]
                  ])
                ]),
                e("div", tt, [
                  e("label", st, [
                    e("div", ot, [
                      e("input", {
                        type: "checkbox",
                        class: "ac-toggle-input",
                        checked: !!i.is_active,
                        onChange: a[5] || (a[5] = (t) => i.is_active = t.target.checked ? 1 : 0)
                      }, null, 40, nt),
                      a[29] || (a[29] = e("span", { class: "ac-toggle-track" }, [
                        e("span", { class: "ac-toggle-thumb" })
                      ], -1))
                    ]),
                    a[30] || (a[30] = e("div", { class: "ac-is-active-text" }, [
                      e("div", { class: "ac-is-active-title" }, "Active"),
                      e("div", { class: "ac-is-active-sub" }, "Inactive categories are hidden from asset entry forms")
                    ], -1))
                  ])
                ])
              ]),
              e("div", ct, [
                e("div", it, [
                  a[33] || (a[33] = e("div", null, [
                    e("div", {
                      class: "ac-form-section",
                      style: { "margin-bottom": "2px" }
                    }, "Accounting"),
                    e("div", { class: "ac-acct-hdr-sub" }, " Fixed Asset / Accumulated Depreciation / Depreciation Expense accounts to use for this category. Required before any asset in this category can be submitted. ")
                  ], -1)),
                  e("button", {
                    class: "ac-action-btn",
                    onClick: pe,
                    disabled: i.accounts.length >= 1 || !(u.value === "edit" ? s.$canEdit("inventory") : s.$canCreate("inventory")),
                    title: i.accounts.length >= 1 ? "Only one set of accounts is needed — this category belongs to a single company" : ""
                  }, [
                    e("span", {
                      innerHTML: p(b)("plus", 12)
                    }, null, 8, dt),
                    a[32] || (a[32] = m(" Add Accounts ", -1))
                  ], 8, lt)
                ]),
                i.accounts.length ? k("", !0) : (r(), d("div", rt, " No company accounts configured yet. Add one so assets in this category can be capitalized and depreciated. ")),
                (r(!0), d(L, null, N(i.accounts, (t, B) => (r(), d("div", {
                  key: B,
                  class: "ac-acct-row"
                }, [
                  e("div", ut, [
                    e("div", vt, [
                      a[34] || (a[34] = e("label", { class: "ac-label" }, [
                        m("Company "),
                        e("span", { style: { color: "#dc2626" } }, "*")
                      ], -1)),
                      S(V, {
                        modelValue: t.company,
                        "onUpdate:modelValue": (v) => t.company = v,
                        options: F.value,
                        placeholder: "Select company",
                        onSearch: P
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    e("button", {
                      class: "ac-acct-remove-btn",
                      title: "Remove",
                      disabled: !(u.value === "edit" ? s.$canEdit("inventory") : s.$canCreate("inventory")),
                      onClick: (v) => _e(B)
                    }, [
                      e("span", {
                        innerHTML: p(b)("trash", 13)
                      }, null, 8, pt)
                    ], 8, mt)
                  ]),
                  e("div", _t, [
                    e("div", yt, [
                      a[35] || (a[35] = e("label", { class: "ac-label" }, [
                        m("Fixed Asset Account "),
                        e("span", { style: { color: "#dc2626" } }, "*")
                      ], -1)),
                      S(V, {
                        modelValue: t.fixed_asset_account,
                        "onUpdate:modelValue": (v) => t.fixed_asset_account = v,
                        options: t._opts.fixed,
                        placeholder: "Fixed Asset account",
                        onSearch: (v) => M(t, "fixed", "Fixed Asset", v)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onSearch"])
                    ]),
                    e("div", ft, [
                      a[36] || (a[36] = e("label", { class: "ac-label" }, [
                        m("Accumulated Depreciation Account "),
                        e("span", { style: { color: "#dc2626" } }, "*")
                      ], -1)),
                      S(V, {
                        modelValue: t.accumulated_depreciation_account,
                        "onUpdate:modelValue": (v) => t.accumulated_depreciation_account = v,
                        options: t._opts.accdep,
                        placeholder: "Accumulated Depreciation account",
                        onSearch: (v) => M(t, "accdep", "Accumulated Depreciation", v)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onSearch"])
                    ]),
                    e("div", gt, [
                      a[37] || (a[37] = e("label", { class: "ac-label" }, [
                        m("Depreciation Expense Account "),
                        e("span", { style: { color: "#dc2626" } }, "*")
                      ], -1)),
                      S(V, {
                        modelValue: t.depreciation_expense_account,
                        "onUpdate:modelValue": (v) => t.depreciation_expense_account = v,
                        options: t._opts.depexp,
                        placeholder: "Depreciation Expense account",
                        onSearch: (v) => M(t, "depexp", "Depreciation", v)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onSearch"])
                    ]),
                    e("div", bt, [
                      a[38] || (a[38] = e("label", { class: "ac-label" }, [
                        m("CWIP Account "),
                        e("span", { style: { color: "#94a3b8", "font-weight": "500" } }, "(optional)")
                      ], -1)),
                      S(V, {
                        modelValue: t.cwip_account,
                        "onUpdate:modelValue": (v) => t.cwip_account = v,
                        options: t._opts.cwip,
                        placeholder: "Capital work in progress account",
                        onSearch: (v) => M(t, "cwip", null, v)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onSearch"])
                    ]),
                    e("div", ht, [
                      a[39] || (a[39] = e("label", { class: "ac-label" }, [
                        m("GST Input Account "),
                        e("span", { style: { color: "#94a3b8", "font-weight": "500" } }, "(optional)")
                      ], -1)),
                      S(V, {
                        modelValue: t.gst_input_account,
                        "onUpdate:modelValue": (v) => t.gst_input_account = v,
                        options: t._opts.gst,
                        placeholder: "Required only if assets in this category carry ITC-eligible tax",
                        onSearch: (v) => M(t, "gst", "Tax", v)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onSearch"])
                    ])
                  ])
                ]))), 128))
              ]),
              e("div", wt, [
                e("button", {
                  class: "ac-action-btn ac-action-btn--primary",
                  disabled: T.value || !(u.value === "edit" ? s.$canEdit("inventory") : s.$canCreate("inventory")),
                  onClick: ke
                }, [
                  e("span", {
                    innerHTML: p(b)("check", 14)
                  }, null, 8, kt),
                  m(" " + c(T.value ? "Saving…" : u.value === "edit" ? "Update Category" : "Create Category"), 1)
                ], 8, Ct),
                e("button", {
                  class: "ac-action-btn",
                  onClick: Ce
                }, " Cancel ")
              ])
            ]))
          ], 2)
        ])
      ]);
    };
  }
};
export {
  Dt as default
};
