import { _ as O, x as R, o as j, c as i, a as e, u as o, i as c, w as x, A as E, F as v, r as w, d as u, b, C as I, D as K, E as P, T as J, H as G, f as Q, h as m, g as $, z as W, k as n, n as N, t as d, q as A, J as X, e as Y, K as Z, a3 as ee } from "./main-B4BdT7Fg.js";
import { o as S } from "./userNames-Cwhv_QJ8.js";
import { b as V } from "./format-BcJZDVG4.js";
const te = { class: "list-page" }, se = { class: "sales-toolbar" }, ae = { class: "sales-search" }, le = ["innerHTML"], ne = { class: "sales-pills" }, ie = ["onClick"], oe = {
  key: 0,
  class: "sales-pill-count"
}, re = { class: "sales-actions" }, de = ["innerHTML"], ce = ["disabled", "title"], ue = ["innerHTML"], pe = { class: "inv-table-wrap" }, be = { class: "inv-table" }, me = ["onClick"], ve = {
  "data-label": "Category",
  class: "td-id"
}, ye = { class: "inv-link" }, _e = ["title"], fe = { "data-label": "Status" }, ge = ["onClick", "title"], he = ["innerHTML"], ke = ["onClick"], Ce = ["innerHTML"], we = { key: 0 }, Te = {
  colspan: "4",
  class: "bk-empty-state"
}, Le = { class: "bk-empty-inner" }, xe = ["innerHTML"], Ee = { class: "tt-drawer" }, Me = { class: "tt-hdr" }, De = { class: "tt-hdr-left" }, He = { class: "tt-badge" }, $e = ["innerHTML"], Ne = { class: "tt-title" }, Ae = ["innerHTML"], Se = { class: "tt-body" }, Ve = {
  class: "tt-field",
  style: { "margin-bottom": "16px" }
}, Ue = ["disabled"], qe = {
  class: "tt-field",
  style: { "margin-bottom": "16px" }
}, ze = { class: "tt-check" }, Be = ["checked"], Fe = {
  key: 0,
  class: "inv-view-footer"
}, Oe = { class: "tt-foot" }, Re = ["disabled", "title"], je = ["innerHTML"], Ie = {
  __name: "ExpenseCategories",
  setup(Ke) {
    const { toast: p } = R(), { confirm: U } = ee(), q = ["All", "Active", "Disabled"], f = m([]), T = m(!0), L = m(""), g = m("All"), h = m(!1), r = m(null), y = m(!1), l = W({ category_name: "", description: "", disabled: 0, owner: null, creation: null, modified_by: null, modified: null });
    async function k() {
      T.value = !0;
      try {
        f.value = await Q("Expense Category", {
          fields: ["name", "category_name", "description", "disabled", "owner", "creation", "modified_by", "modified"],
          order: "category_name asc",
          limit: 200
        }) || [];
      } catch (s) {
        p(s.message || "Failed to load expense categories", "error"), f.value = [];
      }
      T.value = !1;
    }
    const z = $(() => {
      const s = { Active: 0, Disabled: 0 };
      return f.value.forEach((t) => {
        s[t.disabled ? "Disabled" : "Active"]++;
      }), s;
    }), M = $(() => {
      let s = f.value;
      g.value !== "All" && (s = s.filter((a) => (a.disabled ? "Disabled" : "Active") === g.value));
      const t = L.value.trim().toLowerCase();
      return t && (s = s.filter((a) => (a.category_name || "").toLowerCase().includes(t))), s;
    });
    function D() {
      r.value = null, Object.assign(l, { category_name: "", description: "", disabled: 0, owner: null, creation: null, modified_by: null, modified: null }), h.value = !0;
    }
    function H(s) {
      r.value = s.name, Object.assign(l, {
        category_name: s.category_name,
        description: s.description || "",
        disabled: s.disabled ? 1 : 0,
        owner: s.owner || null,
        creation: s.creation || null,
        modified_by: s.modified_by || null,
        modified: s.modified || null
      }), h.value = !0;
    }
    function C() {
      h.value = !1, r.value = null;
    }
    async function B() {
      if (!l.category_name.trim()) {
        p("Category name is required", "error");
        return;
      }
      y.value = !0;
      try {
        const s = await Y();
        if (!s) {
          p("No company configured.", "error"), y.value = !1;
          return;
        }
        const t = {
          doctype: "Expense Category",
          category_name: l.category_name.trim(),
          company: s,
          description: l.description || "",
          disabled: l.disabled
        };
        r.value && (t.name = r.value), await Z(t), p(r.value ? "Expense category updated" : "Expense category created"), C(), await k();
      } catch (s) {
        p("Error: " + (s.message || s), "error");
      }
      y.value = !1;
    }
    async function F(s) {
      if (await U({ title: "Delete Expense Category?", body: `"${s.category_name}" will be permanently removed.`, okLabel: "Delete", cancelLabel: "Keep it", okStyle: "danger" }))
        try {
          await X("frappe.client.delete", { doctype: "Expense Category", name: s.name }), p("Deleted"), await k();
        } catch (a) {
          p("Error: " + (a.message || a), "error");
        }
    }
    return j(() => {
      k();
    }), (s, t) => (n(), i("div", te, [
      e("div", se, [
        e("div", ae, [
          e("span", {
            innerHTML: o(c)("search", 14)
          }, null, 8, le),
          x(e("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (a) => L.value = a),
            class: "sales-search-input",
            placeholder: "Search expense categories…"
          }, null, 512), [
            [E, L.value]
          ])
        ]),
        e("div", ne, [
          (n(), i(v, null, w(q, (a) => e("button", {
            key: a,
            class: N(["sales-pill", { active: g.value === a }]),
            onClick: (_) => g.value = a
          }, [
            u(d(a), 1),
            a !== "All" ? (n(), i("span", oe, d(z.value[a] || 0), 1)) : b("", !0)
          ], 10, ie)), 64))
        ]),
        e("div", re, [
          e("button", {
            class: "sales-btn-ghost",
            onClick: k,
            title: "Refresh"
          }, [
            e("span", {
              innerHTML: o(c)("refresh", 14)
            }, null, 8, de)
          ]),
          e("button", {
            class: "sales-btn-primary",
            onClick: D,
            disabled: !s.$canCreate("bills"),
            title: s.$canCreate("bills") ? "" : "Read-only access"
          }, [
            e("span", {
              innerHTML: o(c)("plus", 13)
            }, null, 8, ue),
            t[5] || (t[5] = u(" New Category ", -1))
          ], 8, ce)
        ])
      ]),
      e("div", pe, [
        e("table", be, [
          t[11] || (t[11] = e("thead", null, [
            e("tr", null, [
              e("th", null, "Category"),
              e("th", null, "Description"),
              e("th", null, "Status"),
              e("th", { style: { width: "90px" } })
            ])
          ], -1)),
          e("tbody", null, [
            T.value ? (n(), i(v, { key: 0 }, w(5, (a) => e("tr", {
              key: "s" + a,
              class: "shimmer-row"
            }, [
              (n(), i(v, null, w(4, (_) => e("td", { key: _ }, [...t[6] || (t[6] = [
                e("div", {
                  class: "shimmer",
                  style: { width: "80%" }
                }, null, -1)
              ])])), 64))
            ])), 64)) : (n(), i(v, { key: 1 }, [
              (n(!0), i(v, null, w(M.value, (a) => (n(), i("tr", {
                key: a.name,
                class: "inv-row",
                onClick: (_) => H(a)
              }, [
                e("td", ve, [
                  e("span", ye, d(a.category_name), 1)
                ]),
                e("td", {
                  "data-label": "Description",
                  class: "text-muted eco-desc",
                  style: { "font-size": "12px" },
                  title: a.description || ""
                }, d(a.description || "—"), 9, _e),
                e("td", fe, [
                  e("span", {
                    class: N(["inv-status-badge", a.disabled ? "status-inactive" : "status-active"])
                  }, d(a.disabled ? "Disabled" : "Active"), 3)
                ]),
                e("td", {
                  "data-label": "",
                  onClick: t[1] || (t[1] = A(() => {
                  }, ["stop"]))
                }, [
                  e("button", {
                    class: "inv-act-btn",
                    onClick: (_) => H(a),
                    title: s.$canEdit("bills") ? "Edit" : "View"
                  }, [
                    e("span", {
                      innerHTML: o(c)(s.$canEdit("bills") ? "edit" : "eye", 14)
                    }, null, 8, he)
                  ], 8, ge),
                  s.$canDelete("bills") ? (n(), i("button", {
                    key: 0,
                    class: "inv-act-btn",
                    onClick: (_) => F(a),
                    style: { "margin-left": "6px", color: "#dc2626" },
                    title: "Delete"
                  }, [
                    e("span", {
                      innerHTML: o(c)("trash", 14)
                    }, null, 8, Ce)
                  ], 8, ke)) : b("", !0)
                ])
              ], 8, me))), 128)),
              M.value.length ? b("", !0) : (n(), i("tr", we, [
                e("td", Te, [
                  e("div", Le, [
                    t[8] || (t[8] = e("div", {
                      class: "bk-empty-illus",
                      style: { "font-size": "34px" }
                    }, "🗂️", -1)),
                    t[9] || (t[9] = e("p", { class: "bk-empty-title" }, "No expense categories", -1)),
                    t[10] || (t[10] = e("p", { class: "bk-empty-sub" }, "Create a category to classify expenses and expense claims.", -1)),
                    s.$canCreate("bills") ? (n(), i("button", {
                      key: 0,
                      class: "bk-empty-btn",
                      onClick: D
                    }, [
                      e("span", {
                        innerHTML: o(c)("plus", 13)
                      }, null, 8, xe),
                      t[7] || (t[7] = u(" New Category", -1))
                    ])) : b("", !0)
                  ])
                ])
              ]))
            ], 64))
          ])
        ])
      ]),
      (n(), I(G, { to: "body" }, [
        K(J, { name: "tt-drawer" }, {
          default: P(() => [
            h.value ? (n(), i("div", {
              key: 0,
              class: "tt-bg",
              onClick: A(C, ["self"])
            }, [
              e("div", Ee, [
                e("div", Me, [
                  e("div", De, [
                    e("div", He, [
                      e("span", {
                        innerHTML: o(c)("folder", 18)
                      }, null, 8, $e)
                    ]),
                    e("div", null, [
                      e("div", Ne, d(r.value ? "Edit Expense Category" : "New Expense Category"), 1),
                      t[12] || (t[12] = e("div", { class: "tt-sub" }, "Used to classify Expenses & Expense Claims", -1))
                    ])
                  ]),
                  e("button", {
                    class: "tt-x",
                    onClick: C
                  }, [
                    e("span", {
                      innerHTML: o(c)("x", 16)
                    }, null, 8, Ae)
                  ])
                ]),
                e("div", Se, [
                  e("div", Ve, [
                    t[13] || (t[13] = e("label", { class: "tt-label" }, [
                      u("Category Name "),
                      e("span", { class: "tt-req" }, "*")
                    ], -1)),
                    x(e("input", {
                      "onUpdate:modelValue": t[2] || (t[2] = (a) => l.category_name = a),
                      class: "b-input",
                      placeholder: "e.g. Travel",
                      disabled: !!r.value
                    }, null, 8, Ue), [
                      [E, l.category_name]
                    ])
                  ]),
                  e("div", qe, [
                    t[14] || (t[14] = e("label", { class: "tt-label" }, "Description", -1)),
                    x(e("textarea", {
                      "onUpdate:modelValue": t[3] || (t[3] = (a) => l.description = a),
                      class: "b-input",
                      rows: "3",
                      placeholder: "Optional notes about this category"
                    }, null, 512), [
                      [E, l.description]
                    ])
                  ]),
                  e("label", ze, [
                    e("input", {
                      type: "checkbox",
                      checked: l.disabled,
                      onChange: t[4] || (t[4] = (a) => l.disabled = a.target.checked ? 1 : 0)
                    }, null, 40, Be),
                    t[15] || (t[15] = u(" Disabled", -1))
                  ]),
                  l.owner ? (n(), i("div", Fe, [
                    u(" Created by " + d(o(S)(l.owner)) + " on " + d(o(V)(l.creation)) + " ", 1),
                    l.modified_by ? (n(), i(v, { key: 0 }, [
                      u(" · Last modified by " + d(o(S)(l.modified_by)) + " on " + d(o(V)(l.modified)), 1)
                    ], 64)) : b("", !0)
                  ])) : b("", !0)
                ]),
                e("div", Oe, [
                  e("button", {
                    class: "b-btn b-btn-ghost",
                    onClick: C
                  }, "Cancel"),
                  e("button", {
                    class: "tt-save",
                    onClick: B,
                    disabled: y.value || !(r.value ? s.$canEdit("bills") : s.$canCreate("bills")),
                    title: (r.value ? s.$canEdit("bills") : s.$canCreate("bills")) ? "" : "Read-only access"
                  }, [
                    e("span", {
                      innerHTML: o(c)("check", 14)
                    }, null, 8, je),
                    u(" " + d(y.value ? "Saving…" : r.value ? "Update" : "Create"), 1)
                  ], 8, Re)
                ])
              ])
            ])) : b("", !0)
          ]),
          _: 1
        })
      ]))
    ]));
  }
}, Qe = /* @__PURE__ */ O(Ie, [["__scopeId", "data-v-770a8e96"]]);
export {
  Qe as default
};
