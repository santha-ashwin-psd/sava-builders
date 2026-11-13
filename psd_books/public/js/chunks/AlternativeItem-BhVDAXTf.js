import { _ as ee, x as te, o as ae, f as R, y as se, X as le, c as i, a as t, d as m, t as o, w as b, v as ie, A as C, F as k, r as G, b as d, D as U, $ as ne, u as I, h as p, S as oe, g as y, a7 as re, K as de, j as ue, k as n, n as ve } from "./main-DQXXITLP.js";
import { _ as L } from "./SearchableSelect-C7RyckVo.js";
import { o as K } from "./userNames-C68bdcZT.js";
import { b as Q } from "./format-BcJZDVG4.js";
const ce = { class: "aix-page" }, me = { class: "aix-two-col" }, pe = { class: "aix-list-panel" }, fe = { class: "aix-panel-hdr" }, ye = { class: "aix-panel-title" }, xe = { class: "aix-count" }, _e = ["disabled", "title"], be = ["innerHTML"], ge = { class: "aix-list" }, he = {
  key: 1,
  class: "aix-list-empty"
}, ke = ["onClick"], we = { style: { display: "flex", "align-items": "flex-start", "justify-content": "space-between", gap: "8px" } }, Se = { class: "aix-item-name" }, Ce = { style: { display: "flex", gap: "4px" } }, Ie = ["title"], Ae = {
  key: 1,
  class: "aix-badge badge-active"
}, $e = { class: "aix-item-meta" }, Me = { class: "aix-item-right" }, Ve = {
  class: "mono",
  style: { "font-size": "12.5px", "font-weight": "700", color: "var(--bx-mfgB)" }
}, De = {
  key: 0,
  style: { "font-size": "12px", color: "var(--bx-muted)", "margin-left": "auto" }
}, Re = { class: "aix-list-pager" }, Ue = { style: { display: "flex", gap: "6px" } }, Le = ["disabled"], Ne = ["disabled"], Oe = { class: "aix-detail-panel" }, Te = {
  key: 0,
  class: "aix-empty-state"
}, Be = ["disabled", "title"], Fe = ["innerHTML"], ze = {
  key: 0,
  class: "aix-empty-state"
}, qe = { class: "aix-detail-hdr" }, Ee = { class: "aix-hdr-flex" }, He = { class: "aix-hdr-info" }, je = { class: "aix-detail-title" }, We = { class: "aix-detail-meta" }, Ge = {
  key: 0,
  class: "mono"
}, Ke = { key: 1 }, Qe = { key: 2 }, Xe = {
  key: 3,
  class: "aix-badge badge-active",
  style: { "font-size": "11px" }
}, Je = { key: 4 }, Pe = {
  key: 5,
  class: "aix-badge",
  style: { "font-size": "11px", background: "#fef3c7", color: "#92400e" }
}, Ye = { class: "aix-hdr-actions" }, Ze = ["disabled"], et = ["disabled"], tt = { class: "aix-body" }, at = { class: "aix-fg" }, st = { class: "aix-fg" }, lt = { class: "aix-fg" }, it = { style: { display: "flex", "align-items": "center", gap: "6px", "min-height": "32px" } }, nt = {
  key: 0,
  class: "aix-badge",
  style: { background: "#fef3c7", color: "#92400e" }
}, ot = {
  key: 1,
  class: "aix-badge",
  style: { background: "#f3f4f6", color: "#4b5563" }
}, rt = { key: 0 }, dt = { class: "aix-toggle-row" }, ut = { class: "aix-toggle" }, vt = {
  key: 0,
  class: "inv-view-footer"
}, ct = { class: "aix-footer" }, mt = ["disabled"], pt = ["disabled"], g = 20, ft = {
  __name: "AlternativeItem",
  setup(yt) {
    const f = oe(), w = ue(), { toast: c } = te(), x = p(!1), N = p([]), A = p(""), S = p(""), u = p(0), O = y(() => f.params.name && f.params.name !== "new" ? f.params.name : f.params.name === "new" ? "new" : null);
    async function $() {
      x.value = !0;
      try {
        const e = await R("Alternative Item", { fields: ["name", "item_code", "alternative_item_code", "conversion_factor", "uom", "is_default", "source_type", "max_substitution_pct", "modified"], limit: 1e3, order: "modified desc" });
        N.value = e || [];
      } catch {
        c("Could not load Alternative Items", "error");
      }
      x.value = !1;
    }
    const _ = y(() => {
      let a = N.value;
      S.value === "default" && (a = a.filter((s) => s.is_default)), S.value === "non-default" && (a = a.filter((s) => !s.is_default));
      const e = A.value.toLowerCase().trim();
      return e && (a = a.filter((s) => [s.item_code, s.alternative_item_code, s.name].filter(Boolean).join(" ").toLowerCase().includes(e))), a;
    }), T = y(() => _.value.slice(u.value * g, (u.value + 1) * g));
    function X(a) {
      w.push(`/manufacturing/alternative-item/${a}`);
    }
    function B() {
      w.push("/manufacturing/alternative-item/new");
    }
    function M() {
      w.push("/manufacturing/alternative-item");
    }
    const r = y(() => f.params.name === "new"), V = p(!1), v = p(!1);
    function D() {
      return {
        doctype: "Alternative Item",
        item_code: "",
        alternative_item_code: "",
        conversion_factor: 1,
        uom: "",
        is_default: 0,
        source_type: "Fresh Stock",
        max_substitution_pct: 100,
        description: ""
      };
    }
    const l = p(D()), h = p([]), F = p([]);
    function z(a) {
      const e = h.value.find((s) => s.name === a);
      return e ? e.item_name : null;
    }
    const q = y(() => {
      const a = h.value.find((e) => e.name === l.value.alternative_item_code);
      return a && a.item_type === "Scrap Item" ? "Recycled Scrap" : "Fresh Stock";
    });
    ae(async () => {
      x.value = !0;
      try {
        const a = await R("Item", { fields: ["name", "item_name", "item_type"], filters: [["disabled", "=", 0]], limit: 5e3, order: "name asc" });
        h.value = a || [];
        const e = await R("UOM", { fields: ["name"], limit: 200, order: "name asc" });
        F.value = (e || []).map((s) => s.name);
      } catch (a) {
        c("Error loading manufacturing data: " + a.message, "error");
      }
      await $(), f.params.name && await E(), x.value = !1;
    }), se(() => f.params.name, async (a) => {
      if (!a) {
        l.value = D();
        return;
      }
      await E();
    });
    async function E() {
      if (r.value) {
        l.value = D();
        return;
      }
      V.value = !0;
      try {
        const a = await le("Alternative Item", f.params.name);
        l.value = a;
      } catch (a) {
        c("Error loading Alternative Item: " + a.message, "error"), M();
      }
      V.value = !1;
    }
    async function H() {
      if (!l.value.item_code || !l.value.alternative_item_code)
        return c("Original Item and Alternative Item are required", "error");
      if (l.value.item_code === l.value.alternative_item_code)
        return c("Original and Alternative cannot be the same item", "error");
      if (!l.value.conversion_factor || l.value.conversion_factor <= 0)
        return c("Conversion Factor must be greater than 0", "error");
      v.value = !0;
      try {
        const a = await de(l.value);
        c(r.value ? "Alternative Item saved" : "Updated"), r.value ? w.replace(`/manufacturing/alternative-item/${a.name}`) : l.value = a, $();
      } catch (a) {
        c(a.message, "error");
      }
      v.value = !1;
    }
    async function j() {
      if (confirm("Delete this alternative item mapping?")) {
        v.value = !0;
        try {
          await re("frappe.client.delete", { doctype: "Alternative Item", name: l.value.name }), c("Deleted"), M(), $();
        } catch (a) {
          c(a.message, "error");
        }
        v.value = !1;
      }
    }
    const J = {
      plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
    };
    function W(a, e) {
      return (J[a] || "").replace("<svg ", `<svg width="${e}" height="${e}" `);
    }
    const P = y(() => [{ value: "", label: "— Select —" }, ...(h.value || []).map((a) => ({ value: a.name, label: a.item_name || a.name }))]), Y = y(() => [{ value: "", label: "— Select —" }, ...(h.value || []).map((a) => ({ value: a.name, label: `${a.item_name || a.name}${a.item_type === "Scrap Item" ? " (Scrap)" : ""}` }))]), Z = y(() => [{ value: "", label: "— Select —" }, ...(F.value || []).map((a) => ({ value: a, label: a }))]);
    return (a, e) => (n(), i("div", ce, [
      t("div", me, [
        t("div", pe, [
          t("div", fe, [
            t("span", ye, [
              e[12] || (e[12] = m("🔀 Alternative Items ", -1)),
              t("span", xe, "(" + o(_.value.length) + ")", 1)
            ]),
            t("button", {
              class: "aix-btn aix-btn-mfg aix-btn-sm",
              disabled: !a.$canCreate("inventory"),
              title: a.$canCreate("inventory") ? "" : "Read-only access",
              onClick: B
            }, [
              t("span", {
                innerHTML: W("plus", 12)
              }, null, 8, be),
              e[13] || (e[13] = m(" New", -1))
            ], 8, _e)
          ]),
          b(t("select", {
            class: "aix-fi aix-status-filter",
            "onUpdate:modelValue": e[0] || (e[0] = (s) => S.value = s),
            onChange: e[1] || (e[1] = (s) => u.value = 0)
          }, [...e[14] || (e[14] = [
            t("option", { value: "" }, "All Mappings", -1),
            t("option", { value: "default" }, "Default Only", -1),
            t("option", { value: "non-default" }, "Non-default Only", -1)
          ])], 544), [
            [ie, S.value]
          ]),
          b(t("input", {
            class: "aix-search",
            "onUpdate:modelValue": e[2] || (e[2] = (s) => A.value = s),
            type: "text",
            placeholder: "Search by item code…"
          }, null, 512), [
            [C, A.value]
          ]),
          t("div", ge, [
            x.value ? (n(), i(k, { key: 0 }, G(5, (s) => t("div", {
              key: s,
              class: "aix-item"
            }, [...e[15] || (e[15] = [
              t("div", {
                class: "shimmer",
                style: { height: "38px", "border-radius": "6px" }
              }, null, -1)
            ])])), 64)) : T.value.length ? (n(!0), i(k, { key: 2 }, G(T.value, (s) => (n(), i("div", {
              key: s.name,
              class: ve(["aix-item", { active: O.value === s.name }]),
              onClick: (xt) => X(s.name)
            }, [
              t("div", we, [
                t("div", Se, o(s.item_code), 1),
                t("div", Ce, [
                  s.source_type === "Recycled Scrap" ? (n(), i("span", {
                    key: 0,
                    class: "aix-badge",
                    style: { background: "#fef3c7", color: "#92400e" },
                    title: "Up to " + (s.max_substitution_pct ?? 100) + "% may be filled from scrap"
                  }, "♻️ Scrap", 8, Ie)) : d("", !0),
                  s.is_default ? (n(), i("span", Ae, "Default")) : d("", !0)
                ])
              ]),
              t("div", $e, [
                e[16] || (e[16] = t("span", null, "→", -1)),
                t("span", null, o(s.alternative_item_code || "—"), 1)
              ]),
              t("div", Me, [
                e[17] || (e[17] = t("span", { style: { "font-size": "12px", color: "var(--bx-muted)" } }, "Factor:", -1)),
                t("span", Ve, o(s.conversion_factor), 1),
                s.uom ? (n(), i("span", De, o(s.uom), 1)) : d("", !0)
              ])
            ], 10, ke))), 128)) : (n(), i("div", he, "No Alternative Items found"))
          ]),
          t("div", Re, [
            t("span", null, o(_.value.length ? u.value * g + 1 : 0) + "–" + o(Math.min((u.value + 1) * g, _.value.length)) + " of " + o(_.value.length), 1),
            t("div", Ue, [
              t("button", {
                class: "aix-btn-icon",
                onClick: e[3] || (e[3] = (s) => u.value > 0 && u.value--),
                disabled: u.value === 0
              }, "‹", 8, Le),
              t("button", {
                class: "aix-btn-icon",
                onClick: e[4] || (e[4] = (s) => (u.value + 1) * g < _.value.length && u.value++),
                disabled: (u.value + 1) * g >= _.value.length
              }, "›", 8, Ne)
            ])
          ])
        ]),
        t("div", Oe, [
          O.value ? (n(), i(k, { key: 1 }, [
            V.value ? (n(), i("div", ze, [...e[22] || (e[22] = [
              t("div", {
                class: "shimmer",
                style: { height: "200px", "border-radius": "10px" }
              }, null, -1)
            ])])) : (n(), i(k, { key: 1 }, [
              t("div", qe, [
                t("div", Ee, [
                  t("div", He, [
                    t("div", je, o(r.value ? "New Alternative Item" : z(l.value.item_code) || l.value.item_code), 1),
                    t("div", We, [
                      r.value ? d("", !0) : (n(), i("span", Ge, o(l.value.name), 1)),
                      r.value ? d("", !0) : (n(), i("span", Ke, "•")),
                      t("span", null, "→ " + o(z(l.value.alternative_item_code) || l.value.alternative_item_code || "—"), 1),
                      l.value.is_default ? (n(), i("span", Qe, "•")) : d("", !0),
                      l.value.is_default ? (n(), i("span", Xe, "Default")) : d("", !0),
                      l.value.source_type === "Recycled Scrap" ? (n(), i("span", Je, "•")) : d("", !0),
                      l.value.source_type === "Recycled Scrap" ? (n(), i("span", Pe, "♻️ Recycled Scrap")) : d("", !0)
                    ])
                  ]),
                  t("div", Ye, [
                    t("button", {
                      class: "aix-btn aix-btn-ghost-inv",
                      onClick: M
                    }, "Back"),
                    r.value ? d("", !0) : (n(), i("button", {
                      key: 0,
                      class: "aix-btn aix-btn-light",
                      style: { color: "#C92A2A" },
                      onClick: j,
                      disabled: v.value || !a.$canDelete("inventory")
                    }, o(v.value ? "Deleting…" : "Delete"), 9, Ze)),
                    t("button", {
                      class: "aix-btn aix-btn-light",
                      onClick: H,
                      disabled: v.value || x.value || !(r.value ? a.$canCreate("inventory") : a.$canEdit("inventory"))
                    }, o(v.value ? "Saving…" : r.value ? "Save" : "Update"), 9, et)
                  ])
                ])
              ]),
              t("div", tt, [
                e[34] || (e[34] = t("div", { class: "aix-section-lbl" }, "Item Mapping", -1)),
                t("div", at, [
                  t("div", null, [
                    e[23] || (e[23] = t("div", { class: "aix-hf-label" }, [
                      m("Original Item "),
                      t("span", { class: "aix-req" }, "*")
                    ], -1)),
                    U(L, {
                      modelValue: l.value.item_code,
                      "onUpdate:modelValue": e[5] || (e[5] = (s) => l.value.item_code = s),
                      options: P.value,
                      placeholder: "— Select —",
                      disabled: !r.value,
                      style: { width: "100%" }
                    }, null, 8, ["modelValue", "options", "disabled"])
                  ]),
                  t("div", null, [
                    e[24] || (e[24] = t("div", { class: "aix-hf-label" }, [
                      m("Alternative Item "),
                      t("span", { class: "aix-req" }, "*")
                    ], -1)),
                    U(L, {
                      modelValue: l.value.alternative_item_code,
                      "onUpdate:modelValue": e[6] || (e[6] = (s) => l.value.alternative_item_code = s),
                      options: Y.value,
                      placeholder: "— Select —",
                      style: { width: "100%" }
                    }, null, 8, ["modelValue", "options"])
                  ])
                ]),
                e[35] || (e[35] = t("div", {
                  class: "aix-section-lbl",
                  style: { "margin-top": "20px" }
                }, "Conversion", -1)),
                t("div", st, [
                  t("div", null, [
                    e[25] || (e[25] = t("div", { class: "aix-hf-label" }, [
                      m("Conversion Factor "),
                      t("span", { class: "aix-req" }, "*")
                    ], -1)),
                    b(t("input", {
                      type: "number",
                      class: "aix-fi aix-fi-mono",
                      "onUpdate:modelValue": e[7] || (e[7] = (s) => l.value.conversion_factor = s),
                      min: "0.0001",
                      step: "any",
                      style: { width: "100%" }
                    }, null, 512), [
                      [C, l.value.conversion_factor]
                    ]),
                    e[26] || (e[26] = t("div", { class: "aix-field-hint" }, "Qty of Alternative needed per 1 unit of Original.", -1))
                  ]),
                  t("div", null, [
                    e[27] || (e[27] = t("div", { class: "aix-hf-label" }, "UOM", -1)),
                    U(L, {
                      modelValue: l.value.uom,
                      "onUpdate:modelValue": e[8] || (e[8] = (s) => l.value.uom = s),
                      options: Z.value,
                      placeholder: "— Select —",
                      style: { width: "100%" }
                    }, null, 8, ["modelValue", "options"])
                  ])
                ]),
                e[36] || (e[36] = t("div", {
                  class: "aix-section-lbl",
                  style: { "margin-top": "20px" }
                }, "Source", -1)),
                t("div", lt, [
                  t("div", null, [
                    e[28] || (e[28] = t("div", { class: "aix-hf-label" }, "Source Type", -1)),
                    t("div", it, [
                      q.value === "Recycled Scrap" ? (n(), i("span", nt, "♻️ Recycled Scrap")) : (n(), i("span", ot, "Fresh Stock"))
                    ]),
                    e[29] || (e[29] = t("div", { class: "aix-field-hint" }, `Derived from the Alternative Item's Item Type — set it to "Scrap Item" on the Item master to mark this as scrap reuse.`, -1))
                  ]),
                  q.value === "Recycled Scrap" ? (n(), i("div", rt, [
                    e[30] || (e[30] = t("div", { class: "aix-hf-label" }, "Max Substitution %", -1)),
                    b(t("input", {
                      type: "number",
                      class: "aix-fi aix-fi-mono",
                      "onUpdate:modelValue": e[9] || (e[9] = (s) => l.value.max_substitution_pct = s),
                      min: "1",
                      max: "100",
                      step: "1",
                      style: { width: "100%" }
                    }, null, 512), [
                      [C, l.value.max_substitution_pct]
                    ]),
                    e[31] || (e[31] = t("div", { class: "aix-field-hint" }, "Caps how much of a Work Order row's required qty may be filled from this scrap alternative.", -1))
                  ])) : d("", !0)
                ]),
                t("div", dt, [
                  t("label", ut, [
                    b(t("input", {
                      type: "checkbox",
                      "onUpdate:modelValue": e[10] || (e[10] = (s) => l.value.is_default = s),
                      "true-value": 1,
                      "false-value": 0
                    }, null, 512), [
                      [ne, l.value.is_default]
                    ]),
                    e[32] || (e[32] = m(" Mark as Default Substitute", -1))
                  ])
                ]),
                e[37] || (e[37] = t("div", {
                  class: "aix-section-lbl",
                  style: { "margin-top": "20px" }
                }, "Notes", -1)),
                t("div", null, [
                  e[33] || (e[33] = t("div", { class: "aix-hf-label" }, "Description / Reason", -1)),
                  b(t("textarea", {
                    class: "aix-fi",
                    style: { width: "100%", resize: "vertical" },
                    rows: "3",
                    "onUpdate:modelValue": e[11] || (e[11] = (s) => l.value.description = s),
                    placeholder: "Why this is a valid alternative…"
                  }, null, 512), [
                    [C, l.value.description]
                  ])
                ]),
                !r.value && l.value.owner ? (n(), i("div", vt, [
                  m(" Created by " + o(I(K)(l.value.owner)) + " on " + o(I(Q)(l.value.creation)) + " ", 1),
                  l.value.modified_by ? (n(), i(k, { key: 0 }, [
                    m(" · Last modified by " + o(I(K)(l.value.modified_by)) + " on " + o(I(Q)(l.value.modified)), 1)
                  ], 64)) : d("", !0)
                ])) : d("", !0)
              ]),
              t("div", ct, [
                r.value ? d("", !0) : (n(), i("button", {
                  key: 0,
                  class: "aix-btn aix-btn-ghost-inv",
                  style: { color: "var(--bx-red)", "border-color": "rgba(201,42,42,.3)" },
                  onClick: j,
                  disabled: v.value || !a.$canDelete("inventory")
                }, "Delete Mapping", 8, mt)),
                e[39] || (e[39] = t("div", { style: { flex: "1" } }, null, -1)),
                t("button", {
                  class: "aix-btn aix-btn-mfg",
                  onClick: H,
                  disabled: v.value || x.value || !(r.value ? a.$canCreate("inventory") : a.$canEdit("inventory"))
                }, [
                  e[38] || (e[38] = t("svg", {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    t("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }),
                    t("polyline", { points: "17 21 17 13 7 13" }),
                    t("polyline", { points: "7 3 7 8 15 8" })
                  ], -1)),
                  m(" " + o(v.value ? "Saving…" : r.value ? "Save Mapping" : "Update Mapping"), 1)
                ], 8, pt)
              ])
            ], 64))
          ], 64)) : (n(), i("div", Te, [
            e[19] || (e[19] = t("div", { class: "aix-empty-icon" }, "🔀", -1)),
            e[20] || (e[20] = t("div", { class: "aix-empty-title" }, "Select an Alternative Item", -1)),
            e[21] || (e[21] = t("div", { class: "aix-empty-sub" }, "Choose a mapping from the list to view or edit it, or create a new substitute item mapping.", -1)),
            t("button", {
              class: "aix-btn aix-btn-mfg",
              disabled: !a.$canCreate("inventory"),
              title: a.$canCreate("inventory") ? "" : "Read-only access",
              onClick: B
            }, [
              t("span", {
                innerHTML: W("plus", 13)
              }, null, 8, Fe),
              e[18] || (e[18] = m(" Create Mapping", -1))
            ], 8, Be)
          ]))
        ])
      ])
    ]));
  }
}, kt = /* @__PURE__ */ ee(ft, [["__scopeId", "data-v-c339453e"]]);
export {
  kt as default
};
