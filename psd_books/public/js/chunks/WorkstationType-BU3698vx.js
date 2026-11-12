import { _ as ee, x as te, o as se, y as oe, X as ne, c as a, a as e, t as i, w as m, A as D, v as ie, n as N, d as p, F as w, r as V, q as _, b as y, $ as ae, u as S, h as v, f as F, S as le, g as T, a2 as O, K as re, j as de, a3 as ue, k as l } from "./main-DOCk_KWG.js";
import { o as G } from "./userNames-CEGpREgV.js";
import { b as K } from "./format-BcJZDVG4.js";
const ce = { class: "bomx-page" }, ve = { class: "bomx-stats-row" }, me = {
  class: "bomx-stat-card",
  style: { "border-left-color": "var(--bx-mfg)" }
}, pe = { class: "bomx-stat-value" }, ye = {
  class: "bomx-stat-card",
  style: { "border-left-color": "var(--bx-green)" }
}, be = { class: "bomx-stat-value" }, xe = {
  class: "bomx-stat-card",
  style: { "border-left-color": "var(--bx-muted)" }
}, ke = { class: "bomx-stat-value" }, fe = { class: "bomx-toolbar" }, he = { class: "bomx-search-wrap" }, ge = ["innerHTML"], we = { class: "bomx-toolbar-count" }, _e = { class: "bomx-view-toggle" }, Te = ["innerHTML"], Ce = ["innerHTML"], Le = ["disabled", "title"], Me = ["innerHTML"], $e = {
  key: 0,
  class: "bomx-grid"
}, He = {
  key: 1,
  class: "bomx-empty-state"
}, We = ["disabled", "title"], De = ["innerHTML"], Ne = {
  key: 2,
  class: "bomx-grid"
}, Se = ["onClick"], Ae = { class: "bomx-ws-card-hdr" }, Be = { class: "bomx-ws-icon" }, Ve = { style: { "min-width": "0", flex: "1" } }, je = { class: "bomx-ws-title" }, Ie = {
  key: 0,
  class: "bomx-ws-code"
}, Ee = { class: "bomx-ws-badges" }, Ue = { class: "bomx-ws-footer" }, Re = { style: { display: "flex", gap: "6px" } }, qe = ["onClick"], ze = ["innerHTML"], Fe = ["disabled", "title", "onClick"], Oe = ["innerHTML"], Ge = {
  key: 3,
  class: "bomx-table-wrap"
}, Ke = { class: "bomx-table" }, Pe = ["onClick"], Xe = { style: { "font-weight": "600", color: "var(--bx-text)" } }, Ye = { key: 0 }, Je = {
  key: 1,
  style: { color: "var(--bx-muted)" }
}, Qe = { style: { display: "flex", gap: "6px", "justify-content": "flex-end" } }, Ze = ["onClick"], et = ["innerHTML"], tt = ["disabled", "title", "onClick"], st = ["innerHTML"], ot = { class: "bomx-drawer" }, nt = {
  key: 0,
  class: "bomx-empty-state"
}, it = { class: "bomx-drawer-hdr" }, at = { style: { "min-width": "0" } }, lt = { class: "bomx-drawer-title" }, rt = ["innerHTML"], dt = { class: "bomx-drawer-body" }, ut = { class: "bomx-drawer-grid-2" }, ct = ["disabled"], vt = {
  key: 0,
  class: "bomx-field-hint"
}, mt = {
  class: "bomx-drawer-toggle-card",
  style: { "margin-top": "16px" }
}, pt = { class: "bomx-switch" }, yt = {
  key: 0,
  class: "inv-view-footer"
}, bt = { class: "bomx-drawer-footer" }, xt = ["disabled", "title"], kt = ["disabled"], ft = ["innerHTML"], ht = {
  __name: "WorkstationType",
  setup(gt) {
    const c = le(), C = de(), { toast: r } = te(), { confirm: j } = ue(), b = v(!1), x = v([]), A = v(""), L = v(""), k = v("grid"), P = T(() => c.params.name && c.params.name !== "new" ? c.params.name : c.params.name === "new" ? "new" : null);
    async function M() {
      b.value = !0;
      try {
        const t = await F("Workstation Type", { fields: ["name", "description", "icon", "is_active", "modified"], limit: 1e3, order: "modified desc" });
        x.value = t || [];
      } catch {
        r("Could not load Workstation Types", "error");
      }
      b.value = !1;
    }
    const f = T(() => {
      let s = x.value;
      L.value === "active" && (s = s.filter((o) => o.is_active)), L.value === "inactive" && (s = s.filter((o) => !o.is_active));
      const t = A.value.toLowerCase().trim();
      return t && (s = s.filter((o) => [o.name, o.description].filter(Boolean).join(" ").toLowerCase().includes(t))), s;
    }), X = T(() => x.value.filter((s) => s.is_active).length), Y = T(() => x.value.filter((s) => !s.is_active).length);
    function I(s) {
      return s.is_active ? "Active" : "Inactive";
    }
    function E(s) {
      return s.is_active ? "badge-active" : "badge-obsolete";
    }
    function $(s) {
      C.push(`/manufacturing/workstation-type/${s}`);
    }
    function U() {
      C.push("/manufacturing/workstation-type/new");
    }
    function h() {
      C.push("/manufacturing/workstation-type");
    }
    async function R(s) {
      try {
        const t = await F("Workstation", { fields: ["name"], filters: [["workstation_type", "=", s.name]], limit: 1 });
        if (t && t.length)
          return r(`${s.name} is used by Workstation ${t[0].name} and cannot be deleted.`, "error"), !1;
      } catch {
        return r(`Could not verify whether ${s.name} is in use — try again.`, "error"), !1;
      }
      return !0;
    }
    async function q(s) {
      if (await R(s) && await j({ title: "Delete Workstation Type?", body: `Are you sure you want to delete ${s.name}?`, okLabel: "Delete", okStyle: "danger" }))
        try {
          await O("Workstation Type", s.name), r("Workstation Type deleted"), M();
        } catch (t) {
          r("Could not delete Workstation Type: " + t.message, "error");
        }
    }
    async function J() {
      const s = { name: n.value.name };
      if (await R(s) && await j({ title: "Delete Workstation Type?", body: `Are you sure you want to delete ${s.name}?`, okLabel: "Delete", okStyle: "danger" }))
        try {
          await O("Workstation Type", s.name), r("Workstation Type deleted"), h(), M();
        } catch (t) {
          r("Could not delete Workstation Type: " + t.message, "error");
        }
    }
    const u = T(() => c.params.name === "new"), H = v(!1), W = v(!1);
    function B() {
      return {
        doctype: "Workstation Type",
        workstation_type_name: "",
        description: "",
        icon: "",
        is_active: 1
      };
    }
    const n = v(B());
    se(async () => {
      b.value = !0, await M(), c.params.name && await z(), b.value = !1;
    }), oe(() => c.params.name, async (s) => {
      if (!s) {
        n.value = B();
        return;
      }
      await z();
    });
    async function z() {
      if (u.value) {
        n.value = B();
        return;
      }
      H.value = !0;
      try {
        const s = await ne("Workstation Type", c.params.name);
        n.value = s;
      } catch (s) {
        r("Error loading Workstation Type: " + s.message, "error"), h();
      }
      H.value = !1;
    }
    async function Q() {
      if (!n.value.workstation_type_name) {
        r("Workstation Type Name is mandatory", "error");
        return;
      }
      W.value = !0;
      try {
        const s = await re(n.value);
        r(u.value ? "Workstation Type created successfully" : "Saved successfully"), u.value ? C.replace(`/manufacturing/workstation-type/${s.name}`) : n.value = s, M();
      } catch (s) {
        r(s.message || "Could not save", "error");
      }
      W.value = !1;
    }
    const Z = {
      plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
      search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
      grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
      list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
      edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
      trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
      x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
      save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>'
    };
    function d(s, t) {
      return (Z[s] || "").replace("<svg ", `<svg width="${t}" height="${t}" `);
    }
    return (s, t) => (l(), a("div", ce, [
      e("div", ve, [
        e("div", me, [
          t[8] || (t[8] = e("div", {
            class: "bomx-stat-label",
            style: { color: "var(--bx-mfg)" }
          }, "TOTAL TYPES", -1)),
          e("div", pe, i(x.value.length), 1),
          t[9] || (t[9] = e("div", { class: "bomx-stat-sub" }, "All workstation types", -1))
        ]),
        e("div", ye, [
          t[10] || (t[10] = e("div", {
            class: "bomx-stat-label",
            style: { color: "var(--bx-green)" }
          }, "ACTIVE", -1)),
          e("div", be, i(X.value), 1),
          t[11] || (t[11] = e("div", { class: "bomx-stat-sub" }, "Assignable to workstations", -1))
        ]),
        e("div", xe, [
          t[12] || (t[12] = e("div", {
            class: "bomx-stat-label",
            style: { color: "var(--bx-muted)" }
          }, "INACTIVE", -1)),
          e("div", ke, i(Y.value), 1),
          t[13] || (t[13] = e("div", { class: "bomx-stat-sub" }, "Not in use", -1))
        ])
      ]),
      e("div", fe, [
        e("div", he, [
          e("span", {
            class: "bomx-search-icon",
            innerHTML: d("search", 15)
          }, null, 8, ge),
          m(e("input", {
            class: "bomx-search-input",
            "onUpdate:modelValue": t[0] || (t[0] = (o) => A.value = o),
            type: "text",
            placeholder: "Search Workstation Types…"
          }, null, 512), [
            [D, A.value]
          ])
        ]),
        m(e("select", {
          class: "bomx-fi",
          "onUpdate:modelValue": t[1] || (t[1] = (o) => L.value = o),
          style: { width: "130px" }
        }, [...t[14] || (t[14] = [
          e("option", { value: "" }, "All Status", -1),
          e("option", { value: "active" }, "Active", -1),
          e("option", { value: "inactive" }, "Inactive", -1)
        ])], 512), [
          [ie, L.value]
        ]),
        t[16] || (t[16] = e("div", { style: { flex: "1" } }, null, -1)),
        e("span", we, i(f.value.length) + " type" + i(f.value.length === 1 ? "" : "s"), 1),
        e("div", _e, [
          e("button", {
            type: "button",
            class: N({ active: k.value === "grid" }),
            onClick: t[2] || (t[2] = (o) => k.value = "grid"),
            title: "Grid view",
            innerHTML: d("grid", 15)
          }, null, 10, Te),
          e("button", {
            type: "button",
            class: N({ active: k.value === "list" }),
            onClick: t[3] || (t[3] = (o) => k.value = "list"),
            title: "List view",
            innerHTML: d("list", 15)
          }, null, 10, Ce)
        ]),
        e("button", {
          class: "bomx-btn bomx-btn-mfg",
          disabled: !s.$canCreate("inventory"),
          title: s.$canCreate("inventory") ? "" : "Read-only access",
          onClick: U
        }, [
          e("span", {
            innerHTML: d("plus", 13)
          }, null, 8, Me),
          t[15] || (t[15] = p(" New Type", -1))
        ], 8, Le)
      ]),
      b.value ? (l(), a("div", $e, [
        (l(), a(w, null, V(6, (o) => e("div", {
          key: o,
          class: "bomx-ws-card"
        }, [...t[17] || (t[17] = [
          e("div", {
            class: "shimmer",
            style: { height: "150px", "border-radius": "var(--bx-radius)" }
          }, null, -1)
        ])])), 64))
      ])) : f.value.length ? k.value === "grid" ? (l(), a("div", Ne, [
        (l(!0), a(w, null, V(f.value, (o) => (l(), a("div", {
          key: o.name,
          class: "bomx-ws-card",
          onClick: (g) => $(o.name)
        }, [
          e("div", Ae, [
            e("div", Be, i(o.icon || "🏭"), 1),
            e("div", Ve, [
              e("div", je, i(o.name), 1),
              o.description ? (l(), a("div", Ie, i(o.description.substring(0, 64)) + i(o.description.length > 64 ? "…" : ""), 1)) : y("", !0)
            ])
          ]),
          e("div", Ee, [
            e("span", {
              class: N(["bomx-badge", E(o)])
            }, i(I(o)), 3)
          ]),
          e("div", Ue, [
            t[22] || (t[22] = e("span", { class: "bomx-ws-loc" }, null, -1)),
            e("div", Re, [
              e("button", {
                class: "bomx-btn-icon",
                onClick: _((g) => $(o.name), ["stop"]),
                title: "Edit"
              }, [
                e("span", {
                  innerHTML: d("edit", 13)
                }, null, 8, ze)
              ], 8, qe),
              e("button", {
                class: "bomx-btn-icon danger",
                disabled: !s.$canDelete("inventory"),
                title: s.$canDelete("inventory") ? "" : "Not permitted",
                onClick: _((g) => q(o), ["stop"])
              }, [
                e("span", {
                  innerHTML: d("trash", 13)
                }, null, 8, Oe)
              ], 8, Fe)
            ])
          ])
        ], 8, Se))), 128))
      ])) : (l(), a("div", Ge, [
        e("table", Ke, [
          t[23] || (t[23] = e("thead", null, [
            e("tr", null, [
              e("th", null, "Name"),
              e("th", null, "Description"),
              e("th", null, "Status"),
              e("th", { style: { width: "80px" } })
            ])
          ], -1)),
          e("tbody", null, [
            (l(!0), a(w, null, V(f.value, (o) => (l(), a("tr", {
              key: o.name,
              onClick: (g) => $(o.name)
            }, [
              e("td", Xe, i(o.icon ? o.icon + " " : "") + i(o.name), 1),
              e("td", null, [
                o.description ? (l(), a("span", Ye, i(o.description.substring(0, 80)) + i(o.description.length > 80 ? "…" : ""), 1)) : (l(), a("span", Je, "—"))
              ]),
              e("td", null, [
                e("span", {
                  class: N(["bomx-badge", E(o)])
                }, i(I(o)), 3)
              ]),
              e("td", null, [
                e("div", Qe, [
                  e("button", {
                    class: "bomx-btn-icon",
                    onClick: _((g) => $(o.name), ["stop"]),
                    title: "Edit"
                  }, [
                    e("span", {
                      innerHTML: d("edit", 13)
                    }, null, 8, et)
                  ], 8, Ze),
                  e("button", {
                    class: "bomx-btn-icon danger",
                    disabled: !s.$canDelete("inventory"),
                    title: s.$canDelete("inventory") ? "" : "Not permitted",
                    onClick: _((g) => q(o), ["stop"])
                  }, [
                    e("span", {
                      innerHTML: d("trash", 13)
                    }, null, 8, st)
                  ], 8, tt)
                ])
              ])
            ], 8, Pe))), 128))
          ])
        ])
      ])) : (l(), a("div", He, [
        t[19] || (t[19] = e("div", { class: "bomx-empty-icon" }, "🏭", -1)),
        t[20] || (t[20] = e("div", { class: "bomx-empty-title" }, "No Workstation Types found", -1)),
        t[21] || (t[21] = e("div", { class: "bomx-empty-sub" }, "Try adjusting your search or filters, or create a new type.", -1)),
        e("button", {
          class: "bomx-btn bomx-btn-mfg",
          disabled: !s.$canCreate("inventory"),
          title: s.$canCreate("inventory") ? "" : "Read-only access",
          onClick: U
        }, [
          e("span", {
            innerHTML: d("plus", 13)
          }, null, 8, De),
          t[18] || (t[18] = p(" Create Workstation Type", -1))
        ], 8, We)
      ])),
      P.value ? (l(), a("div", {
        key: 4,
        class: "bomx-overlay",
        onClick: _(h, ["self"])
      }, [
        e("div", ot, [
          H.value ? (l(), a("div", nt, [...t[24] || (t[24] = [
            e("div", {
              class: "shimmer",
              style: { height: "220px", "border-radius": "var(--bx-radius)" }
            }, null, -1)
          ])])) : (l(), a(w, { key: 1 }, [
            e("div", it, [
              e("div", at, [
                e("div", lt, i(u.value ? "New Workstation Type" : (n.value.icon ? n.value.icon + " " : "") + (n.value.workstation_type_name || n.value.name)), 1),
                t[25] || (t[25] = e("div", { class: "bomx-drawer-sub" }, "Configure name, icon, and status", -1))
              ]),
              e("button", {
                class: "bomx-drawer-close",
                onClick: h,
                title: "Close"
              }, [
                e("span", {
                  innerHTML: d("x", 16)
                }, null, 8, rt)
              ])
            ]),
            e("div", dt, [
              e("div", ut, [
                e("div", null, [
                  t[26] || (t[26] = e("div", { class: "bomx-hf-label" }, [
                    p("Type Name "),
                    e("span", { style: { color: "var(--bx-red)" } }, "*")
                  ], -1)),
                  m(e("input", {
                    class: "bomx-fi",
                    type: "text",
                    "onUpdate:modelValue": t[4] || (t[4] = (o) => n.value.workstation_type_name = o),
                    disabled: !u.value,
                    placeholder: "e.g., Assembly Line",
                    style: { width: "100%" }
                  }, null, 8, ct), [
                    [D, n.value.workstation_type_name]
                  ]),
                  u.value ? y("", !0) : (l(), a("div", vt, "Name cannot be changed after creation."))
                ]),
                e("div", null, [
                  t[27] || (t[27] = e("div", { class: "bomx-hf-label" }, "Icon", -1)),
                  m(e("input", {
                    class: "bomx-fi",
                    type: "text",
                    "onUpdate:modelValue": t[5] || (t[5] = (o) => n.value.icon = o),
                    placeholder: "e.g., an icon name or emoji",
                    style: { width: "100%" }
                  }, null, 512), [
                    [D, n.value.icon]
                  ]),
                  t[28] || (t[28] = e("div", { class: "bomx-field-hint" }, "Optional. Shown alongside this type.", -1))
                ])
              ]),
              t[31] || (t[31] = e("div", {
                class: "bomx-hf-label",
                style: { "margin-top": "16px" }
              }, "Description", -1)),
              m(e("textarea", {
                class: "bomx-fi",
                "onUpdate:modelValue": t[6] || (t[6] = (o) => n.value.description = o),
                style: { width: "100%", "min-height": "100px", resize: "vertical" },
                placeholder: "Briefly describe this workstation type…"
              }, null, 512), [
                [D, n.value.description]
              ]),
              t[32] || (t[32] = e("div", {
                class: "bomx-field-hint",
                style: { "margin-top": "6px" }
              }, "Inactive types cannot be assigned to new workstations.", -1)),
              e("div", mt, [
                t[30] || (t[30] = e("div", null, [
                  e("div", { class: "bomx-drawer-toggle-title" }, "Is Active"),
                  e("div", { class: "bomx-drawer-toggle-sub" }, "Selectable when creating or editing a workstation")
                ], -1)),
                e("label", pt, [
                  m(e("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": t[7] || (t[7] = (o) => n.value.is_active = o),
                    "true-value": 1,
                    "false-value": 0
                  }, null, 512), [
                    [ae, n.value.is_active]
                  ]),
                  t[29] || (t[29] = e("span", { class: "bomx-switch-track" }, [
                    e("span", { class: "bomx-switch-thumb" })
                  ], -1))
                ])
              ]),
              !u.value && n.value.owner ? (l(), a("div", yt, [
                p(" Created by " + i(S(G)(n.value.owner)) + " on " + i(S(K)(n.value.creation)) + " ", 1),
                n.value.modified_by ? (l(), a(w, { key: 0 }, [
                  p(" · Last modified by " + i(S(G)(n.value.modified_by)) + " on " + i(S(K)(n.value.modified)), 1)
                ], 64)) : y("", !0)
              ])) : y("", !0)
            ]),
            e("div", bt, [
              u.value ? y("", !0) : (l(), a("button", {
                key: 0,
                class: "bomx-btn bomx-btn-ghost",
                disabled: !s.$canDelete("inventory"),
                title: s.$canDelete("inventory") ? "" : "Not permitted",
                onClick: J
              }, "Delete Workstation Type", 8, xt)),
              t[33] || (t[33] = e("div", { style: { flex: "1" } }, null, -1)),
              e("button", {
                class: "bomx-btn bomx-btn-outline",
                onClick: h
              }, "Cancel"),
              e("button", {
                class: "bomx-btn bomx-btn-mfg",
                onClick: Q,
                disabled: W.value || H.value || !(u.value ? s.$canCreate("inventory") : s.$canEdit("inventory"))
              }, [
                e("span", {
                  innerHTML: d("save", 13)
                }, null, 8, ft),
                p(" " + i(W.value ? "Saving…" : u.value ? "Save Type" : "Save Changes"), 1)
              ], 8, kt)
            ])
          ], 64))
        ])
      ])) : y("", !0)
    ]));
  }
}, Ct = /* @__PURE__ */ ee(ht, [["__scopeId", "data-v-8757c9d7"]]);
export {
  Ct as default
};
