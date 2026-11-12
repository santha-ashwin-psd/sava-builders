import { _ as q, x as G, o as Z, c as l, a as e, F as f, r as H, u as c, i as u, w as k, A as x, d as T, t as n, b as F, D as J, E as V, a6 as Q, f as $, h as p, g as P, z as W, k as r, n as S, v as X, $ as Y, a2 as ee, J as te, K as ae, a3 as se } from "./main-BgVQJ7hW.js";
const ne = { class: "list-page" }, ie = { class: "sales-toolbar" }, oe = { class: "is-tabs" }, le = ["onClick"], re = ["innerHTML"], de = { class: "sales-pill-count" }, ce = { class: "sales-search" }, ue = ["innerHTML"], pe = ["placeholder"], ve = { class: "sales-actions" }, me = ["disabled"], ye = ["innerHTML"], _e = ["disabled", "title"], be = ["innerHTML"], ge = { class: "is-hint" }, he = ["innerHTML"], fe = {
  key: 0,
  class: "is-empty-card"
}, ke = {
  key: 1,
  class: "is-empty-card"
}, Te = { style: { "font-size": "32px", "margin-bottom": "8px" } }, Me = { style: { "font-size": "14px", "font-weight": "600", color: "#374151", "margin-bottom": "4px" } }, Le = { style: { "font-size": "12.5px", color: "#9ca3af" } }, Ce = ["disabled", "title"], Ne = ["innerHTML"], we = {
  key: 2,
  class: "is-grid"
}, He = { class: "is-card-top" }, xe = ["innerHTML"], Fe = { class: "is-card-actions" }, $e = ["disabled", "title", "onClick"], Se = ["innerHTML"], De = ["disabled", "title", "onClick"], Be = ["innerHTML"], Ie = { class: "is-card-name" }, Ue = { class: "is-card-sub" }, Ee = { key: 0 }, Oe = ["innerHTML"], Ve = {
  key: 1,
  class: "text-muted"
}, Pe = { class: "is-card-bottom" }, Ae = { class: "is-card-sub" }, Re = { class: "is-card-bottom" }, ze = { class: "is-form" }, Ke = { class: "is-field" }, je = { class: "is-label" }, qe = ["placeholder"], Ge = {
  key: 0,
  class: "is-field"
}, Ze = {
  key: 1,
  class: "is-field"
}, Je = ["value"], Qe = { class: "is-toggle-row" }, We = { class: "is-toggle-label" }, Xe = { class: "is-toggle-wrap" }, Ye = { class: "is-toggle-text" }, et = { class: "is-toggle-title" }, tt = { class: "is-toggle-sub" }, at = ["disabled"], st = {
  __name: "InventorySettings",
  setup(nt) {
    const { toast: v } = G(), { confirm: A } = se(), D = [
      {
        key: "uom",
        label: "Units of Measure",
        singular: "UOM",
        icon: "hash",
        doctype: "UOM",
        nameField: "uom_name",
        activeField: "enabled",
        activeMeaning: "enabled",
        nameLabel: "UOM Name",
        namePlaceholder: "e.g. Nos, Kg, Litre, Box",
        hint: "Units of Measure define how items are counted or sold (Nos, Kg, Litre…). They appear in the Default UOM dropdown on every item.",
        emptyIcon: "📏",
        emptyTitle: "No units of measure yet",
        emptySub: "Create units like Nos, Kg, Litre or Box"
      },
      {
        key: "brand",
        label: "Brands",
        singular: "Brand",
        icon: "building",
        doctype: "Brand",
        nameField: "brand_name",
        activeField: "disabled",
        activeMeaning: "disabled_inverted",
        nameLabel: "Brand Name",
        namePlaceholder: "e.g. Himalaya, Patanjali",
        hint: "Brands let you group items by manufacturer or label. They appear on the Item master and can be used to filter and report by brand.",
        emptyIcon: "🏷️",
        emptyTitle: "No brands yet",
        emptySub: "Create brands to tag and filter items by manufacturer"
      },
      {
        key: "territory",
        label: "Territories",
        singular: "Territory",
        icon: "org",
        doctype: "Territory",
        nameField: "territory_name",
        activeField: "is_group",
        activeMeaning: "is_group",
        nameLabel: "Territory Name",
        namePlaceholder: "e.g. Nairobi, Coast, Export",
        hint: "Territories define sales regions. They appear in the Territory dropdown on Customers and can be nested under a parent territory.",
        emptyIcon: "🗺️",
        emptyTitle: "No territories yet",
        emptySub: "Create territories like North Zone, South Zone or Export"
      }
    ], d = p("uom"), m = p(""), M = p(!1), L = p(!1), B = p([]), I = p([]), N = p([]), y = p(!1), b = p("add"), g = p(""), i = W({
      name: "",
      description: "",
      parent_territory: "",
      activeFlag: !0
    }), o = P(() => D.find((s) => s.key === d.value));
    function U(s) {
      return s === "uom" ? B.value : s === "brand" ? I.value : N.value;
    }
    const E = P(() => {
      const s = U(d.value), a = m.value.trim().toLowerCase();
      return a ? s.filter(
        (t) => (t.name || "").toLowerCase().includes(a) || (t.description || "").toLowerCase().includes(a) || (t.parent_territory || "").toLowerCase().includes(a)
      ) : s;
    });
    function w(s) {
      const a = o.value;
      return a.activeMeaning === "enabled" ? !!s.enabled : a.activeMeaning === "disabled_inverted" ? !s.disabled : a.activeMeaning === "is_group" ? !!s.is_group : !0;
    }
    function R(s) {
      d.value = s, m.value = "";
    }
    async function C() {
      M.value = !0;
      try {
        const [s, a, t] = await Promise.all([
          $("UOM", { fields: ["name", "uom_name", "description", "enabled"], order: "uom_name asc", limit: 500 }),
          $("Brand", { fields: ["name", "brand_name", "description", "disabled"], order: "brand_name asc", limit: 500 }),
          $("Territory", { fields: ["name", "territory_name", "parent_territory", "is_group"], order: "territory_name asc", limit: 500 })
        ]);
        B.value = s || [], I.value = a || [], N.value = t || [];
      } catch (s) {
        v("Could not load inventory settings: " + s.message, "error");
      }
      M.value = !1;
    }
    function O() {
      b.value = "add", g.value = "", Object.assign(i, { name: "", description: "", parent_territory: "", activeFlag: d.value !== "territory" }), y.value = !0;
    }
    function z(s) {
      b.value = "edit", g.value = s.name, Object.assign(i, {
        name: s.name,
        description: s.description || "",
        parent_territory: s.parent_territory || "",
        activeFlag: w(s)
      }), y.value = !0;
    }
    async function K() {
      const s = o.value, a = i.name.trim();
      if (!a) {
        v(s.nameLabel + " is required", "error");
        return;
      }
      L.value = !0;
      try {
        const t = b.value === "edit";
        t && a !== g.value && await te("frappe.client.rename_doc", {
          doctype: s.doctype,
          old_name: g.value,
          new_name: a,
          merge: 0
        });
        const _ = { doctype: s.doctype, name: a, [s.nameField]: a };
        d.value === "territory" ? (_.parent_territory = i.parent_territory || "", _.is_group = i.activeFlag ? 1 : 0) : (_.description = i.description || "", s.activeMeaning === "enabled" && (_.enabled = i.activeFlag ? 1 : 0), s.activeMeaning === "disabled_inverted" && (_.disabled = i.activeFlag ? 0 : 1)), await ae(_), v(s.singular + (t ? " updated" : " created")), y.value = !1, C();
      } catch (t) {
        v(t.message, "error");
      }
      L.value = !1;
    }
    async function j(s) {
      const a = o.value;
      if (await A({
        title: "Delete " + a.singular + "?",
        body: `Delete "${s.name}"? This can&#8217;t be undone. If it&#8217;s used on existing records, deletion will be blocked.`,
        okLabel: "Delete",
        okStyle: "danger"
      }))
        try {
          await ee(a.doctype, s.name), v(a.singular + " deleted"), C();
        } catch (h) {
          v(h.message, "error");
        }
    }
    return Z(C), (s, a) => (r(), l("div", ne, [
      e("div", ie, [
        e("div", oe, [
          (r(), l(f, null, H(D, (t) => e("button", {
            key: t.key,
            class: S(["sales-pill", { active: d.value === t.key }]),
            onClick: (h) => R(t.key)
          }, [
            e("span", {
              innerHTML: c(u)(t.icon, 13),
              style: { "vertical-align": "-2px", "margin-right": "4px" }
            }, null, 8, re),
            T(" " + n(t.label) + " ", 1),
            e("span", de, n(U(t.key).length), 1)
          ], 10, le)), 64))
        ]),
        e("div", ce, [
          e("span", {
            innerHTML: c(u)("search", 14)
          }, null, 8, ue),
          k(e("input", {
            "onUpdate:modelValue": a[0] || (a[0] = (t) => m.value = t),
            class: "sales-search-input",
            placeholder: "Search " + o.value.label.toLowerCase() + "…"
          }, null, 8, pe), [
            [x, m.value]
          ])
        ]),
        a[7] || (a[7] = e("div", { style: { flex: "1" } }, null, -1)),
        e("div", ve, [
          e("button", {
            class: "sales-btn-ghost",
            onClick: C,
            disabled: M.value,
            title: "Refresh"
          }, [
            e("span", {
              innerHTML: c(u)("refresh", 13)
            }, null, 8, ye)
          ], 8, me),
          e("button", {
            class: "sales-btn-primary",
            disabled: !s.$canCreate("inventory"),
            title: s.$canCreate("inventory") ? "" : "Read-only access",
            onClick: O
          }, [
            e("span", {
              innerHTML: c(u)("plus", 13)
            }, null, 8, be),
            T(" New " + n(o.value.singular), 1)
          ], 8, _e)
        ])
      ]),
      e("div", ge, [
        e("span", {
          innerHTML: c(u)("info", 14),
          style: { "flex-shrink": "0", "margin-top": "1px" }
        }, null, 8, he),
        e("span", null, n(o.value.hint), 1)
      ]),
      M.value ? (r(), l("div", fe, "Loading…")) : E.value.length ? (r(), l("div", we, [
        (r(!0), l(f, null, H(E.value, (t) => (r(), l("div", {
          key: t.name,
          class: "is-card"
        }, [
          e("div", He, [
            e("div", {
              class: "is-card-icon",
              innerHTML: c(u)(o.value.icon, 18)
            }, null, 8, xe),
            e("div", Fe, [
              e("button", {
                class: "is-card-btn",
                disabled: !s.$canEdit("inventory"),
                title: s.$canEdit("inventory") ? "Edit" : "Read-only access",
                onClick: (h) => z(t)
              }, [
                e("span", {
                  innerHTML: c(u)("edit", 12)
                }, null, 8, Se)
              ], 8, $e),
              e("button", {
                class: "is-card-btn is-card-btn--danger",
                disabled: !s.$canDelete("inventory"),
                title: s.$canDelete("inventory") ? "Delete" : "Not permitted",
                onClick: (h) => j(t)
              }, [
                e("span", {
                  innerHTML: c(u)("trash", 12)
                }, null, 8, Be)
              ], 8, De)
            ])
          ]),
          e("div", Ie, n(t.name), 1),
          d.value === "territory" ? (r(), l(f, { key: 0 }, [
            e("div", Ue, [
              t.parent_territory ? (r(), l("span", Ee, [
                e("span", {
                  innerHTML: c(u)("chevR", 10),
                  style: { opacity: ".5", "vertical-align": "-1px" }
                }, null, 8, Oe),
                T(" " + n(t.parent_territory), 1)
              ])) : (r(), l("span", Ve, "Top level"))
            ]),
            e("div", Pe, [
              e("span", {
                class: S(["inv-status-badge", t.is_group ? "status-draft" : "status-paid"])
              }, n(t.is_group ? "Group" : "Leaf"), 3)
            ])
          ], 64)) : (r(), l(f, { key: 1 }, [
            e("div", Ae, n(t.description || "No description"), 1),
            e("div", Re, [
              e("span", {
                class: S(["inv-status-badge", w(t) ? "status-paid" : "status-draft"])
              }, n(w(t) ? "Active" : "Inactive"), 3)
            ])
          ], 64))
        ]))), 128))
      ])) : (r(), l("div", ke, [
        e("div", Te, n(o.value.emptyIcon), 1),
        e("div", Me, n(m.value ? "No matches found" : o.value.emptyTitle), 1),
        e("div", Le, n(o.value.emptySub), 1),
        m.value ? F("", !0) : (r(), l("button", {
          key: 0,
          class: "sales-btn-primary",
          style: { "margin-top": "14px" },
          disabled: !s.$canCreate("inventory"),
          title: s.$canCreate("inventory") ? "" : "Read-only access",
          onClick: O
        }, [
          e("span", {
            innerHTML: c(u)("plus", 13)
          }, null, 8, Ne),
          T(" New " + n(o.value.singular), 1)
        ], 8, Ce))
      ])),
      J(Q, {
        show: y.value,
        title: (b.value === "add" ? "New " : "Edit ") + o.value.singular,
        width: "480px",
        onClose: a[6] || (a[6] = (t) => y.value = !1)
      }, {
        footer: V(() => [
          e("button", {
            class: "nim-btn",
            onClick: a[5] || (a[5] = (t) => y.value = !1)
          }, "Cancel"),
          e("button", {
            class: "nim-btn nim-btn-primary",
            onClick: K,
            disabled: L.value || !(b.value === "edit" ? s.$canEdit("inventory") : s.$canCreate("inventory"))
          }, n(L.value ? "Saving…" : "Save " + o.value.singular), 9, at)
        ]),
        default: V(() => [
          e("div", ze, [
            e("div", Ke, [
              e("label", je, [
                T(n(o.value.nameLabel) + " ", 1),
                a[8] || (a[8] = e("span", { style: { color: "#dc2626" } }, "*", -1))
              ]),
              k(e("input", {
                class: "is-input",
                "onUpdate:modelValue": a[1] || (a[1] = (t) => i.name = t),
                placeholder: o.value.namePlaceholder
              }, null, 8, qe), [
                [x, i.name]
              ])
            ]),
            d.value !== "territory" ? (r(), l("div", Ge, [
              a[9] || (a[9] = e("label", { class: "is-label" }, "Description", -1)),
              k(e("textarea", {
                class: "is-input",
                rows: "2",
                "onUpdate:modelValue": a[2] || (a[2] = (t) => i.description = t),
                placeholder: "Optional notes"
              }, null, 512), [
                [x, i.description]
              ])
            ])) : F("", !0),
            d.value === "territory" ? (r(), l("div", Ze, [
              a[11] || (a[11] = e("label", { class: "is-label" }, "Parent Territory", -1)),
              k(e("select", {
                class: "is-input",
                "onUpdate:modelValue": a[3] || (a[3] = (t) => i.parent_territory = t)
              }, [
                a[10] || (a[10] = e("option", { value: "" }, "— None (top level) —", -1)),
                (r(!0), l(f, null, H(N.value.filter((t) => t.name !== g.value), (t) => (r(), l("option", {
                  key: t.name,
                  value: t.name
                }, n(t.name), 9, Je))), 128))
              ], 512), [
                [X, i.parent_territory]
              ])
            ])) : F("", !0),
            e("div", Qe, [
              e("label", We, [
                e("span", Xe, [
                  k(e("input", {
                    type: "checkbox",
                    class: "is-toggle-input",
                    "onUpdate:modelValue": a[4] || (a[4] = (t) => i.activeFlag = t)
                  }, null, 512), [
                    [Y, i.activeFlag]
                  ]),
                  a[12] || (a[12] = e("span", { class: "is-toggle-track" }, [
                    e("span", { class: "is-toggle-thumb" })
                  ], -1))
                ]),
                e("span", Ye, [
                  e("span", et, n(d.value === "territory" ? "Is Group" : "Active"), 1),
                  e("span", tt, n(d.value === "territory" ? "A group can contain other territories beneath it." : "Inactive " + o.value.label.toLowerCase() + " won’t appear in dropdowns for new records."), 1)
                ])
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["show", "title"])
    ]));
  }
}, ot = /* @__PURE__ */ q(st, [["__scopeId", "data-v-a95d5999"]]);
export {
  ot as default
};
