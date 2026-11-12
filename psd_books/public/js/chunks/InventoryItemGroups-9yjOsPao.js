import { x as xe, o as $e, m as Ee, c as a, a as e, u as p, i as _, w as O, A as J, b as f, n as w, d as v, t as n, F as M, r as $, p as Q, v as Se, f as ce, h as b, g as E, a2 as ve, z as Ae, J as Ne, K as De, a3 as Re, k as l, q as ge } from "./main-Cij9_Vxg.js";
import { b as me, f as ze } from "./format-BcJZDVG4.js";
import { o as _e } from "./userNames-CgGbH9Kd.js";
const Pe = { class: "ig-page" }, Ve = { class: "ig-toolbar" }, Fe = { class: "ig-toolbar-left" }, Ue = { class: "ig-search-wrap" }, Oe = ["innerHTML"], Be = ["innerHTML"], We = ["disabled", "title"], qe = ["innerHTML"], je = { class: "ig-body" }, Ke = { class: "ig-sidebar-header" }, Ze = { class: "ig-sidebar-title" }, Je = { class: "ig-sidebar-count" }, Qe = { class: "ig-sidebar-stats" }, Xe = { class: "ig-sidebar-controls" }, Ye = ["title"], es = ["innerHTML"], ss = ["title"], ts = ["innerHTML"], is = {
  key: 0,
  class: "ig-shimmer-wrap"
}, os = {
  key: 1,
  class: "ig-tree-empty"
}, ns = {
  key: 2,
  class: "ig-tree-scroll"
}, as = ["onClick"], ls = ["onClick"], rs = ["innerHTML"], us = {
  key: 1,
  class: "ig-expand-spacer"
}, ds = { class: "ig-node-icon" }, ps = { class: "ig-node-label" }, cs = {
  key: 2,
  class: "ig-node-item-count"
}, vs = {
  key: 3,
  class: "ig-node-count"
}, gs = ["title", "disabled", "onClick"], ms = ["innerHTML"], _s = {
  key: 0,
  class: "ig-mob-back-bar"
}, hs = ["innerHTML"], fs = { class: "ig-mob-back-title" }, bs = {
  key: 1,
  class: "ig-empty-state"
}, ys = ["disabled", "title"], ws = ["innerHTML"], ks = {
  key: 2,
  class: "ig-form-wrap"
}, Gs = { class: "ig-view-header" }, Cs = { style: { "font-size": "26px" } }, Ls = { class: "ig-form-header-info" }, Ms = { class: "ig-form-header-title" }, Ts = { class: "ig-form-header-sub" }, Is = {
  key: 0,
  class: "ig-breadcrumb"
}, Hs = ["innerHTML"], xs = { class: "ig-view-badge" }, $s = { class: "ig-form-stats" }, Es = { class: "ig-form-stat" }, Ss = { class: "ig-form-stat-val" }, As = { class: "ig-form-stat" }, Ns = { class: "ig-form-stat-val" }, Ds = { class: "ig-view-card" }, Rs = { class: "ig-view-rows" }, zs = { class: "ig-view-row" }, Ps = { class: "ig-view-val" }, Vs = { class: "ig-view-row" }, Fs = { class: "ig-view-val" }, Us = {
  key: 0,
  class: "ig-view-row"
}, Os = { class: "ig-view-val" }, Bs = { class: "ig-view-row" }, Ws = { class: "ig-view-val" }, qs = {
  key: 1,
  class: "ig-view-row"
}, js = { class: "ig-view-val" }, Ks = {
  key: 0,
  class: "inv-view-footer"
}, Zs = { class: "ig-form-actions" }, Js = ["disabled", "title"], Qs = ["innerHTML"], Xs = ["disabled", "title"], Ys = ["innerHTML"], et = ["disabled", "title"], st = ["innerHTML"], tt = { class: "ig-items-section" }, it = { class: "ig-items-hdr" }, ot = {
  key: 0,
  class: "ig-items-count-pill"
}, nt = {
  key: 0,
  class: "ig-items-group-notice"
}, at = {
  key: 0,
  class: "ig-items-shimmer-wrap"
}, lt = {
  key: 1,
  class: "ig-items-empty"
}, rt = { class: "ig-items-empty-title" }, ut = { class: "ig-items-empty-sub" }, dt = {
  key: 2,
  class: "ig-items-grid"
}, pt = { class: "ig-item-card-top" }, ct = { class: "ig-item-card-icon" }, vt = { class: "ig-item-card-badges" }, gt = {
  key: 0,
  class: "ig-item-inactive-badge"
}, mt = { class: "ig-item-card-name" }, _t = { class: "ig-item-card-code" }, ht = { class: "ig-item-card-footer" }, ft = { class: "ig-item-card-uom" }, bt = { class: "ig-item-card-rate" }, yt = {
  key: 3,
  class: "ig-form-wrap"
}, wt = { class: "ig-form-header" }, kt = { style: { "font-size": "26px" } }, Gt = { class: "ig-form-header-info" }, Ct = { class: "ig-form-header-title" }, Lt = { class: "ig-form-header-sub" }, Mt = {
  key: 0,
  class: "ig-breadcrumb"
}, Tt = ["innerHTML"], It = {
  key: 0,
  class: "ig-form-stats"
}, Ht = { class: "ig-form-stat" }, xt = { class: "ig-form-stat-val" }, $t = { class: "ig-form-stat" }, Et = { class: "ig-form-stat-val" }, St = { class: "ig-form-card" }, At = { class: "ig-form-grid" }, Nt = { class: "ig-field" }, Dt = { class: "ig-field" }, Rt = ["value"], zt = {
  class: "ig-field",
  style: { "margin-top": "14px" }
}, Pt = { class: "ig-is-group-row" }, Vt = { class: "ig-is-group-label" }, Ft = { class: "ig-toggle-wrap" }, Ut = ["checked"], Ot = {
  key: 0,
  class: "ig-is-group-row"
}, Bt = { class: "ig-is-group-label" }, Wt = { class: "ig-toggle-wrap" }, qt = ["checked"], jt = { class: "ig-form-actions" }, Kt = ["disabled"], Zt = ["innerHTML"], ei = {
  __name: "InventoryItemGroups",
  setup(Jt) {
    const { toast: I } = xe(), { confirm: he } = Re(), d = b("none"), S = b(""), g = b([]), B = b(!0), A = b(!1), G = b(null), o = b(null), y = b(/* @__PURE__ */ new Set(["All Item Groups"])), C = b(""), T = b("name"), N = b(window.innerWidth <= 768), D = b([]), R = b(!1), r = Ae({ name: "", parent_item_group: "All Item Groups", is_group: 0, description: "", allow_partial_issue: 0 });
    function X() {
      N.value = window.innerWidth <= 768;
    }
    const fe = [
      { name: "All Item Groups", parent_item_group: "", is_group: 1, description: "Root", allow_partial_issue: 0 },
      { name: "Products", parent_item_group: "All Item Groups", is_group: 1, description: "", allow_partial_issue: 0 },
      { name: "Services", parent_item_group: "All Item Groups", is_group: 1, description: "", allow_partial_issue: 0 },
      { name: "Raw Materials", parent_item_group: "All Item Groups", is_group: 1, description: "", allow_partial_issue: 0 },
      { name: "Finished Goods", parent_item_group: "All Item Groups", is_group: 1, description: "", allow_partial_issue: 0 }
    ];
    async function W() {
      B.value = !0;
      try {
        const t = await ce("Item Group", {
          fields: ["name", "parent_item_group", "is_group", "description", "allow_partial_issue", "owner", "creation", "modified_by", "modified"],
          order: "name asc",
          limit: 200
        });
        g.value = t || [];
      } catch {
        g.value = fe;
      }
      B.value = !1;
    }
    async function Y() {
      R.value = !0;
      try {
        D.value = await ce("Item", {
          fields: [
            "name",
            "item_code",
            "item_name",
            "item_group",
            "item_type",
            "stock_uom",
            "standard_rate",
            "disabled",
            "is_stock_item"
          ],
          order: "item_name asc",
          limit: 1e5
        });
      } catch {
        D.value = [];
      }
      R.value = !1;
    }
    const z = E(() => {
      const t = {};
      return D.value.forEach((s) => {
        const u = s.item_group || "";
        t[u] || (t[u] = []), t[u].push(s);
      }), t;
    }), q = E(
      () => G.value ? z.value[G.value] || [] : []
    ), be = E(() => {
      const t = {};
      g.value.forEach((c) => {
        const h = c.parent_item_group || "";
        t[h] || (t[h] = []), t[h].push(c);
      });
      function s(c) {
        return T.value !== "count" ? c : [...c].sort((h, L) => {
          const U = h.is_group ? (t[h.name] || []).length : (z.value[h.name] || []).length;
          return (L.is_group ? (t[L.name] || []).length : (z.value[L.name] || []).length) - U;
        });
      }
      const u = new Set(g.value.map((c) => c.name)), m = g.value.filter((c) => !c.parent_item_group || !u.has(c.parent_item_group)), k = [];
      function H(c, h) {
        k.push({ ...c, depth: h }), y.value.has(c.name) && s(t[c.name] || []).forEach((L) => H(L, h + 1));
      }
      return s(m).forEach((c) => H(c, 0)), k;
    }), P = E(() => {
      const t = g.value.filter((s) => s.is_group && j(s.name));
      return t.length > 0 && t.every((s) => y.value.has(s.name));
    }), ee = E(() => {
      const t = C.value.toLowerCase().trim();
      return t ? g.value.filter((s) => s.name.toLowerCase().includes(t) || (s.description || "").toLowerCase().includes(t)).map((s) => ({ ...s, depth: 0 })) : be.value;
    });
    function j(t) {
      return g.value.some((s) => s.parent_item_group === t);
    }
    function K(t) {
      return g.value.filter((s) => s.parent_item_group === t).length;
    }
    function V(t) {
      return (z.value[t] || []).length;
    }
    function ye(t) {
      return { Product: "📦", Service: "🛠️", "Raw Material": "⚙️", "Finished Good": "✅", "Scrap Item": "♻️" }[t] || "📦";
    }
    function we(t) {
      const s = new Set(y.value);
      s.has(t) ? s.delete(t) : s.add(t), y.value = s;
    }
    function ke() {
      P.value ? y.value = /* @__PURE__ */ new Set() : y.value = new Set(g.value.filter((t) => t.is_group).map((t) => t.name));
    }
    function Ge(t) {
      const s = new Set(y.value);
      let u = g.value.find((m) => m.name === t);
      for (; u != null && u.parent_item_group; )
        s.add(u.parent_item_group), u = g.value.find((m) => m.name === u.parent_item_group);
      y.value = s;
    }
    function Ce(t) {
      G.value = t.name, o.value = t, Ge(t.name), d.value = "view";
    }
    function Le() {
      o.value && (S.value = o.value.name, Object.assign(r, {
        name: o.value.name,
        parent_item_group: o.value.parent_item_group || "",
        is_group: o.value.is_group ? 1 : 0,
        description: o.value.description || "",
        allow_partial_issue: o.value.allow_partial_issue ? 1 : 0
      }), d.value = "edit");
    }
    function F(t) {
      G.value = null, o.value = null, Object.assign(r, { name: "", parent_item_group: t || "All Item Groups", is_group: 0, description: "", allow_partial_issue: 0 }), d.value = "new";
    }
    function Me() {
      d.value === "edit" ? d.value = "view" : d.value = G.value ? "view" : "none";
    }
    async function Te() {
      if (!r.name.trim()) {
        I("Group name is required", "error");
        return;
      }
      A.value = !0;
      try {
        const t = d.value === "edit";
        t && r.name.trim() !== S.value && await Ne("frappe.client.rename_doc", {
          doctype: "Item Group",
          old_name: S.value,
          new_name: r.name.trim(),
          merge: 0
        }), await De({
          doctype: "Item Group",
          name: r.name.trim(),
          parent_item_group: r.parent_item_group,
          is_group: r.is_group ? 1 : 0,
          description: r.description,
          allow_partial_issue: r.is_group ? 0 : r.allow_partial_issue ? 1 : 0
        }), await W(), await Y(), G.value = r.name.trim();
        const u = g.value.find((m) => m.name === r.name.trim());
        if (o.value = u || null, S.value = r.name.trim(), r.parent_item_group) {
          const m = new Set(y.value);
          m.add(r.parent_item_group), y.value = m;
        }
        I(t ? "Group updated" : "Group created"), d.value = "view";
      } catch (t) {
        I("Save failed: " + t.message, "error");
      } finally {
        A.value = !1;
      }
    }
    function Ie(t) {
      const s = [];
      function u(m) {
        g.value.filter((k) => k.parent_item_group === m).forEach((k) => {
          s.push(k), u(k.name);
        });
      }
      return u(t), s;
    }
    async function He() {
      if (!o.value) return;
      const t = Ie(o.value.name), s = t.length ? ` and its ${t.length} child group(s)` : "";
      if (await he({
        title: "Delete group?",
        body: `Delete "${o.value.name}"${s}? This cannot be undone.`,
        okLabel: "Delete All"
      }))
        try {
          for (const u of [...t].reverse())
            await ve("Item Group", u.name);
          await ve("Item Group", o.value.name), await W(), G.value = null, o.value = null, d.value = "none", I(t.length ? `Deleted group and ${t.length} child(ren)` : "Group deleted");
        } catch (u) {
          I("Delete failed: " + u.message, "error");
        }
    }
    return $e(() => {
      W(), Y(), window.addEventListener("resize", X, { passive: !0 });
    }), Ee(() => window.removeEventListener("resize", X)), (t, s) => {
      var u, m, k, H, c, h, L, U, Z, se, te, ie, oe, ne, ae, le, re, ue, de, pe;
      return l(), a("div", Pe, [
        e("div", Ve, [
          e("div", Fe, [
            e("div", Ue, [
              e("span", {
                innerHTML: p(_)("search"),
                class: "ig-search-icon"
              }, null, 8, Oe),
              O(e("input", {
                "onUpdate:modelValue": s[0] || (s[0] = (i) => C.value = i),
                class: "ig-search-input",
                placeholder: "Search groups…"
              }, null, 512), [
                [J, C.value]
              ]),
              C.value ? (l(), a("button", {
                key: 0,
                class: "ig-search-clear",
                onClick: s[1] || (s[1] = (i) => C.value = "")
              }, [
                e("span", {
                  innerHTML: p(_)("x", 12)
                }, null, 8, Be)
              ])) : f("", !0)
            ])
          ]),
          e("button", {
            class: "ig-new-btn",
            onClick: s[2] || (s[2] = (i) => F("All Item Groups")),
            disabled: !t.$canCreate("inventory"),
            title: t.$canCreate("inventory") ? "" : "Read-only access"
          }, [
            e("span", {
              innerHTML: p(_)("plus", 13)
            }, null, 8, qe),
            s[12] || (s[12] = e("span", { class: "ig-btn-label" }, "New Group", -1))
          ], 8, We)
        ]),
        e("div", je, [
          e("aside", {
            class: w(["ig-sidebar", { "ig-mob-hidden": N.value && d.value !== "none" }])
          }, [
            e("div", Ke, [
              e("div", Ze, [
                s[13] || (s[13] = v(" Item Groups ", -1)),
                e("span", Je, n(g.value.length), 1)
              ]),
              e("div", Qe, n(g.value.filter((i) => i.is_group).length) + " groups · " + n(D.value.length) + " items ", 1),
              e("div", Xe, [
                e("button", {
                  class: "ig-ctrl-btn",
                  onClick: ke,
                  title: P.value ? "Collapse All" : "Expand All"
                }, [
                  e("span", {
                    class: w(["ig-ctrl-chev", { "ig-ctrl-chev--open": P.value }]),
                    innerHTML: p(_)("chevR", 11)
                  }, null, 10, es),
                  v(" " + n(P.value ? "Collapse All" : "Expand All"), 1)
                ], 8, Ye),
                e("button", {
                  class: w(["ig-ctrl-btn", { "ig-ctrl-btn--active": T.value === "count" }]),
                  onClick: s[3] || (s[3] = (i) => T.value = T.value === "count" ? "name" : "count"),
                  title: T.value === "count" ? "Sort A–Z" : "Sort by item count"
                }, [
                  e("span", {
                    innerHTML: p(_)("hash", 11)
                  }, null, 8, ts),
                  v(" " + n(T.value === "count" ? "By Count" : "A – Z"), 1)
                ], 10, ss)
              ])
            ]),
            B.value ? (l(), a("div", is, [
              (l(), a(M, null, $(6, (i) => e("div", {
                key: i,
                class: "ig-shimmer-row"
              }, [
                e("div", {
                  class: "b-shimmer",
                  style: Q({ width: 70 + i * 5 + "%", height: "14px", borderRadius: "4px" })
                }, null, 4)
              ])), 64))
            ])) : ee.value.length ? (l(), a("div", ns, [
              (l(!0), a(M, null, $(ee.value, (i) => (l(), a("div", {
                key: i.name,
                class: w(["ig-tree-node", {
                  "ig-tree-node--active": G.value === i.name,
                  "ig-tree-node--group": i.is_group,
                  "ig-tree-node--leaf": !i.is_group
                }]),
                style: Q({ paddingLeft: (C.value ? 14 : 10 + i.depth * 20) + "px" }),
                onClick: (x) => Ce(i)
              }, [
                j(i.name) && !C.value ? (l(), a("button", {
                  key: 0,
                  class: "ig-expand-btn",
                  onClick: ge((x) => we(i.name), ["stop"])
                }, [
                  e("span", {
                    class: w(["ig-expand-chev", { "ig-expand-chev--open": y.value.has(i.name) }]),
                    innerHTML: p(_)("chevR", 10)
                  }, null, 10, rs)
                ], 8, ls)) : (l(), a("span", us)),
                e("span", ds, n(i.is_group ? y.value.has(i.name) && !C.value ? "📂" : "📁" : "🏷️"), 1),
                e("span", ps, n(i.name), 1),
                !i.is_group && V(i.name) > 0 ? (l(), a("span", cs, n(V(i.name)), 1)) : i.is_group && j(i.name) ? (l(), a("span", vs, n(K(i.name)), 1)) : f("", !0),
                e("button", {
                  class: "ig-add-child-btn",
                  title: t.$canCreate("inventory") ? "Add child group" : "Read-only access",
                  disabled: !t.$canCreate("inventory"),
                  onClick: ge((x) => F(i.name), ["stop"])
                }, [
                  e("span", {
                    innerHTML: p(_)("plus", 11)
                  }, null, 8, ms)
                ], 8, gs)
              ], 14, as))), 128))
            ])) : (l(), a("div", os, [...s[14] || (s[14] = [
              e("div", { style: { "font-size": "28px", "margin-bottom": "8px" } }, "🔍", -1),
              e("div", { style: { "font-size": "13px", color: "#94a3b8" } }, "No groups found", -1)
            ])]))
          ], 2),
          e("main", {
            class: w(["ig-detail", { "ig-mob-hidden": N.value && d.value === "none" }])
          }, [
            N.value && d.value !== "none" ? (l(), a("div", _s, [
              e("button", {
                class: "ig-mob-back-btn",
                onClick: s[4] || (s[4] = (i) => d.value = "none")
              }, [
                e("span", {
                  innerHTML: p(_)("chevL", 15)
                }, null, 8, hs),
                s[15] || (s[15] = v(" Groups ", -1))
              ]),
              e("div", fs, n(d.value === "new" ? "New Group" : ((u = o.value) == null ? void 0 : u.name) || ""), 1)
            ])) : f("", !0),
            d.value === "none" ? (l(), a("div", bs, [
              s[17] || (s[17] = e("div", { class: "ig-empty-icon" }, "📁", -1)),
              s[18] || (s[18] = e("div", { class: "ig-empty-title" }, "Select a group to view", -1)),
              s[19] || (s[19] = e("div", { class: "ig-empty-sub" }, "Click any item group from the list to see its details", -1)),
              e("button", {
                class: "ig-action-btn ig-action-btn--primary",
                style: { "margin-top": "18px" },
                disabled: !t.$canCreate("inventory"),
                title: t.$canCreate("inventory") ? "" : "Read-only access",
                onClick: s[5] || (s[5] = (i) => F("All Item Groups"))
              }, [
                e("span", {
                  innerHTML: p(_)("plus", 13)
                }, null, 8, ws),
                s[16] || (s[16] = v(" New Group ", -1))
              ], 8, ys)
            ])) : d.value === "view" ? (l(), a("div", ks, [
              e("div", Gs, [
                e("div", {
                  class: w(["ig-form-icon-wrap", (m = o.value) != null && m.is_group ? "ig-form-icon--group" : "ig-form-icon--leaf"])
                }, [
                  e("span", Cs, n((k = o.value) != null && k.is_group ? "📁" : "🏷️"), 1)
                ], 2),
                e("div", Ls, [
                  e("div", Ms, n((H = o.value) == null ? void 0 : H.name), 1),
                  e("div", Ts, [
                    (c = o.value) != null && c.parent_item_group ? (l(), a("span", Is, [
                      e("span", {
                        innerHTML: p(_)("chevR", 10),
                        style: { opacity: ".5" }
                      }, null, 8, Hs),
                      v(" " + n(o.value.parent_item_group), 1)
                    ])) : f("", !0),
                    e("span", xs, n((h = o.value) != null && h.is_group ? "Group" : "Leaf Group"), 1)
                  ])
                ]),
                e("div", $s, [
                  e("div", Es, [
                    e("div", Ss, n(K(((L = o.value) == null ? void 0 : L.name) || "")), 1),
                    s[20] || (s[20] = e("div", { class: "ig-form-stat-lbl" }, "Children", -1))
                  ]),
                  e("div", As, [
                    e("div", Ns, n(V(((U = o.value) == null ? void 0 : U.name) || "")), 1),
                    s[21] || (s[21] = e("div", { class: "ig-form-stat-lbl" }, "Items", -1))
                  ])
                ])
              ]),
              e("div", Ds, [
                s[27] || (s[27] = e("div", { class: "ig-form-section" }, "Details", -1)),
                e("div", Rs, [
                  e("div", zs, [
                    s[22] || (s[22] = e("div", { class: "ig-view-lbl" }, "Group Name", -1)),
                    e("div", Ps, n((Z = o.value) == null ? void 0 : Z.name), 1)
                  ]),
                  e("div", Vs, [
                    s[23] || (s[23] = e("div", { class: "ig-view-lbl" }, "Parent Group", -1)),
                    e("div", Fs, n(((se = o.value) == null ? void 0 : se.parent_item_group) || "— (Root)"), 1)
                  ]),
                  (te = o.value) != null && te.description ? (l(), a("div", Us, [
                    s[24] || (s[24] = e("div", { class: "ig-view-lbl" }, "Description", -1)),
                    e("div", Os, n(o.value.description), 1)
                  ])) : f("", !0),
                  e("div", Bs, [
                    s[25] || (s[25] = e("div", { class: "ig-view-lbl" }, "Type", -1)),
                    e("div", Ws, [
                      e("span", {
                        class: w(["ig-type-pill", (ie = o.value) != null && ie.is_group ? "ig-type-pill--group" : "ig-type-pill--leaf"])
                      }, n((oe = o.value) != null && oe.is_group ? "📁 Group (has children)" : "🏷️ Leaf (items belong here)"), 3)
                    ])
                  ]),
                  (ne = o.value) != null && ne.is_group ? f("", !0) : (l(), a("div", qs, [
                    s[26] || (s[26] = e("div", { class: "ig-view-lbl" }, "Partial Material Issue", -1)),
                    e("div", js, [
                      e("span", {
                        class: "ig-type-pill",
                        style: Q((ae = o.value) != null && ae.allow_partial_issue ? "background:var(--bx-amberS);color:var(--bx-amber)" : "background:#EEF1F6;color:var(--bx-muted)")
                      }, n((le = o.value) != null && le.allow_partial_issue ? "✅ Allowed — can issue short / zero to WIP" : "🔒 Not allowed — must be fully in stock to issue"), 5)
                    ])
                  ]))
                ])
              ]),
              (re = o.value) != null && re.owner ? (l(), a("div", Ks, [
                v(" Created by " + n(p(_e)(o.value.owner)) + " on " + n(p(me)(o.value.creation)) + " ", 1),
                o.value.modified_by ? (l(), a(M, { key: 0 }, [
                  v(" · Last modified by " + n(p(_e)(o.value.modified_by)) + " on " + n(p(me)(o.value.modified)), 1)
                ], 64)) : f("", !0)
              ])) : f("", !0),
              e("div", Zs, [
                e("button", {
                  class: "ig-action-btn ig-action-btn--primary",
                  disabled: !t.$canEdit("inventory"),
                  title: t.$canEdit("inventory") ? "" : "Read-only access",
                  onClick: Le
                }, [
                  e("span", {
                    innerHTML: p(_)("edit", 13)
                  }, null, 8, Qs),
                  s[28] || (s[28] = v(" Edit Group ", -1))
                ], 8, Js),
                e("button", {
                  class: "ig-action-btn",
                  disabled: !t.$canCreate("inventory"),
                  title: t.$canCreate("inventory") ? "" : "Read-only access",
                  onClick: s[6] || (s[6] = (i) => {
                    var x;
                    return F(((x = o.value) == null ? void 0 : x.name) || "All Item Groups");
                  })
                }, [
                  e("span", {
                    innerHTML: p(_)("plus", 13)
                  }, null, 8, Ys),
                  s[29] || (s[29] = v(" New Child ", -1))
                ], 8, Xs),
                s[31] || (s[31] = e("div", { style: { flex: "1" } }, null, -1)),
                e("button", {
                  class: "ig-action-btn ig-action-btn--danger",
                  disabled: !t.$canDelete("inventory"),
                  title: t.$canDelete("inventory") ? "" : "Not permitted",
                  onClick: He
                }, [
                  e("span", {
                    innerHTML: p(_)("trash", 13)
                  }, null, 8, st),
                  s[30] || (s[30] = v(" Delete ", -1))
                ], 8, et)
              ]),
              e("div", tt, [
                e("div", it, [
                  s[32] || (s[32] = e("div", {
                    class: "ig-form-section",
                    style: { "margin-bottom": "0" }
                  }, "Items in this Group", -1)),
                  R.value ? f("", !0) : (l(), a("span", ot, n(q.value.length), 1))
                ]),
                (ue = o.value) != null && ue.is_group ? (l(), a("div", nt, [...s[33] || (s[33] = [
                  e("span", { style: { "font-size": "20px", "flex-shrink": "0" } }, "📁", -1),
                  e("div", null, [
                    e("strong", null, "Parent group"),
                    v(" — items are assigned to child groups, not directly here. Select a child group on the left to see its items. ")
                  ], -1)
                ])])) : (l(), a(M, { key: 1 }, [
                  R.value ? (l(), a("div", at, [
                    (l(), a(M, null, $(3, (i) => e("div", {
                      key: i,
                      class: "b-shimmer",
                      style: { height: "76px", "border-radius": "10px" }
                    })), 64))
                  ])) : q.value.length ? (l(), a("div", dt, [
                    (l(!0), a(M, null, $(q.value, (i) => (l(), a("div", {
                      key: i.name,
                      class: w(["ig-item-card", { "ig-item-card--disabled": i.disabled }])
                    }, [
                      e("div", pt, [
                        e("span", ct, n(ye(i.item_type)), 1),
                        e("div", vt, [
                          e("span", {
                            class: w(["ig-item-type-badge", "ig-type--" + (i.item_type || "Product").toLowerCase().replace(/[\s]+/g, "")])
                          }, n(i.item_type || "Product"), 3),
                          i.disabled ? (l(), a("span", gt, "Inactive")) : f("", !0)
                        ])
                      ]),
                      e("div", mt, n(i.item_name), 1),
                      e("div", _t, n(i.item_code), 1),
                      e("div", ht, [
                        e("span", ft, n(i.stock_uom || "Nos"), 1),
                        e("span", bt, "KES " + n(p(ze)(i.standard_rate, 2)), 1)
                      ])
                    ], 2))), 128))
                  ])) : (l(), a("div", lt, [
                    s[38] || (s[38] = e("div", { style: { "font-size": "30px", "margin-bottom": "8px" } }, "📭", -1)),
                    e("div", rt, [
                      s[34] || (s[34] = v("No items in ", -1)),
                      e("strong", null, n((de = o.value) == null ? void 0 : de.name), 1)
                    ]),
                    e("div", ut, [
                      s[35] || (s[35] = v(" Go to ", -1)),
                      s[36] || (s[36] = e("strong", null, "Items", -1)),
                      s[37] || (s[37] = v(" → create or edit an item → set Item Group to ", -1)),
                      e("em", null, n((pe = o.value) == null ? void 0 : pe.name), 1)
                    ])
                  ]))
                ], 64))
              ])
            ])) : (l(), a("div", yt, [
              e("div", wt, [
                e("div", {
                  class: w(["ig-form-icon-wrap", r.is_group ? "ig-form-icon--group" : "ig-form-icon--leaf"])
                }, [
                  e("span", kt, n(r.is_group ? "📁" : "🏷️"), 1)
                ], 2),
                e("div", Gt, [
                  e("div", Ct, n(d.value === "edit" ? r.name : "New Item Group"), 1),
                  e("div", Lt, [
                    d.value === "edit" && r.parent_item_group ? (l(), a("span", Mt, [
                      e("span", {
                        innerHTML: p(_)("chevR", 10),
                        style: { opacity: ".5" }
                      }, null, 8, Tt),
                      v(" " + n(r.parent_item_group), 1)
                    ])) : f("", !0),
                    e("span", {
                      class: w(["ig-form-mode-badge", d.value === "new" ? "ig-form-mode-badge--new" : "ig-form-mode-badge--edit"])
                    }, n(d.value === "new" ? "New" : "Editing"), 3)
                  ])
                ]),
                d.value === "edit" ? (l(), a("div", It, [
                  e("div", Ht, [
                    e("div", xt, n(K(r.name)), 1),
                    s[39] || (s[39] = e("div", { class: "ig-form-stat-lbl" }, "Children", -1))
                  ]),
                  e("div", $t, [
                    e("div", Et, n(V(r.name)), 1),
                    s[40] || (s[40] = e("div", { class: "ig-form-stat-lbl" }, "Items", -1))
                  ])
                ])) : f("", !0)
              ]),
              e("div", St, [
                s[49] || (s[49] = e("div", { class: "ig-form-section" }, "Group Details", -1)),
                e("div", At, [
                  e("div", Nt, [
                    s[41] || (s[41] = e("label", { class: "nim-label" }, [
                      v("Group Name "),
                      e("span", { style: { color: "#dc2626" } }, "*")
                    ], -1)),
                    O(e("input", {
                      class: "nim-input",
                      "onUpdate:modelValue": s[7] || (s[7] = (i) => r.name = i),
                      placeholder: "e.g. Electronics"
                    }, null, 512), [
                      [J, r.name]
                    ])
                  ]),
                  e("div", Dt, [
                    s[43] || (s[43] = e("label", { class: "nim-label" }, "Parent Group", -1)),
                    O(e("select", {
                      class: "nim-input",
                      "onUpdate:modelValue": s[8] || (s[8] = (i) => r.parent_item_group = i)
                    }, [
                      s[42] || (s[42] = e("option", { value: "" }, "— Root (no parent) —", -1)),
                      (l(!0), a(M, null, $(g.value.filter((i) => i.is_group && i.name !== r.name), (i) => (l(), a("option", {
                        key: i.name,
                        value: i.name
                      }, n(i.name), 9, Rt))), 128))
                    ], 512), [
                      [Se, r.parent_item_group]
                    ])
                  ])
                ]),
                e("div", zt, [
                  s[44] || (s[44] = e("label", { class: "nim-label" }, "Description", -1)),
                  O(e("textarea", {
                    class: "nim-input",
                    "onUpdate:modelValue": s[9] || (s[9] = (i) => r.description = i),
                    rows: "3",
                    placeholder: "Optional description…",
                    style: { resize: "vertical" }
                  }, null, 512), [
                    [J, r.description]
                  ])
                ]),
                e("div", Pt, [
                  e("label", Vt, [
                    e("div", Ft, [
                      e("input", {
                        type: "checkbox",
                        class: "ig-toggle-input",
                        checked: !!r.is_group,
                        onChange: s[10] || (s[10] = (i) => r.is_group = i.target.checked ? 1 : 0)
                      }, null, 40, Ut),
                      s[45] || (s[45] = e("span", { class: "ig-toggle-track" }, [
                        e("span", { class: "ig-toggle-thumb" })
                      ], -1))
                    ]),
                    s[46] || (s[46] = e("div", { class: "ig-is-group-text" }, [
                      e("div", { class: "ig-is-group-title" }, "Is a Group"),
                      e("div", { class: "ig-is-group-sub" }, "Group nodes can have child item groups")
                    ], -1))
                  ])
                ]),
                r.is_group ? f("", !0) : (l(), a("div", Ot, [
                  e("label", Bt, [
                    e("div", Wt, [
                      e("input", {
                        type: "checkbox",
                        class: "ig-toggle-input",
                        checked: !!r.allow_partial_issue,
                        onChange: s[11] || (s[11] = (i) => r.allow_partial_issue = i.target.checked ? 1 : 0)
                      }, null, 40, qt),
                      s[47] || (s[47] = e("span", { class: "ig-toggle-track" }, [
                        e("span", { class: "ig-toggle-thumb" })
                      ], -1))
                    ]),
                    s[48] || (s[48] = e("div", { class: "ig-is-group-text" }, [
                      e("div", { class: "ig-is-group-title" }, "Allow Partial Material Issue"),
                      e("div", { class: "ig-is-group-sub" }, " Work Order → Issue Materials may issue less than required (even zero) for items in this group when stock is short. Unchecked items must be fully in stock to be issued — otherwise they're skipped and stay pending, without blocking other items. ")
                    ], -1))
                  ])
                ]))
              ]),
              e("div", jt, [
                e("button", {
                  class: "ig-action-btn ig-action-btn--primary",
                  disabled: A.value || !(d.value === "edit" ? t.$canEdit("inventory") : t.$canCreate("inventory")),
                  onClick: Te
                }, [
                  e("span", {
                    innerHTML: p(_)("check", 14)
                  }, null, 8, Zt),
                  v(" " + n(A.value ? "Saving…" : d.value === "edit" ? "Update Group" : "Create Group"), 1)
                ], 8, Kt),
                e("button", {
                  class: "ig-action-btn",
                  onClick: Me
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
  ei as default
};
