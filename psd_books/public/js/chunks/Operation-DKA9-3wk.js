import { _ as pe, x as ce, o as be, f as y, y as fe, X as _e, c as n, a as t, t as l, d as m, w as b, v as xe, D as L, A as C, F as g, r as W, b as d, n as M, $ as I, u as B, h as v, S as ye, g as p, K as ge, a2 as ke, j as he, a3 as we, k as i } from "./main-DU_9tUQf.js";
import { _ as R } from "./SearchableSelect-BDzSm4BT.js";
import { o as K } from "./userNames-Bn7mVEZa.js";
import { b as X } from "./format-BcJZDVG4.js";
const Ce = { class: "bomx-page" }, Oe = { class: "bomx-sum-strip" }, Se = {
  class: "bomx-sum-card",
  style: { "--bar": "var(--bx-text)" }
}, $e = { class: "bomx-sc-val" }, Ve = {
  class: "bomx-sum-card",
  style: { "--bar": "var(--bx-green)" }
}, Be = {
  class: "bomx-sc-val",
  style: { color: "var(--bx-green)" }
}, De = {
  class: "bomx-sum-card",
  style: { "--bar": "var(--bx-blue)" }
}, Ne = {
  class: "bomx-sc-val",
  style: { color: "var(--bx-blue)" }
}, Te = {
  class: "bomx-sum-card",
  style: { "--bar": "var(--bx-violet)" }
}, Ue = {
  class: "bomx-sc-val",
  style: { color: "var(--bx-violet)" }
}, Ae = { class: "bomx-two-col" }, Le = { class: "bomx-list-panel" }, We = { class: "bomx-panel-hdr" }, Me = { class: "bomx-panel-title" }, Ie = { class: "bomx-count" }, Re = ["disabled", "title"], ze = ["innerHTML"], qe = { class: "bomx-filter-row" }, je = { class: "bomx-list" }, Ee = {
  key: 1,
  class: "bomx-list-empty"
}, He = ["onClick"], Qe = { class: "bomx-item-hdr" }, Fe = { class: "bomx-item-icon" }, Pe = { class: "bomx-item-name" }, Ge = { class: "bomx-item-meta" }, Je = { class: "mono" }, Ke = { key: 0 }, Xe = {
  key: 1,
  class: "mono bomx-item-wc"
}, Ye = { key: 2 }, Ze = { key: 3 }, et = { key: 4 }, tt = { key: 5 }, ot = { class: "bomx-detail-panel" }, st = {
  key: 0,
  class: "bomx-empty-state"
}, at = ["disabled", "title"], nt = ["innerHTML"], it = {
  key: 0,
  class: "bomx-empty-state"
}, lt = { class: "bomx-detail-hdr" }, rt = { style: { display: "flex", "align-items": "flex-start", "justify-content": "space-between", gap: "12px" } }, dt = { style: { "min-width": "0" } }, ut = { class: "bomx-detail-title" }, mt = { class: "bomx-detail-meta" }, vt = {
  key: 0,
  class: "mono"
}, pt = { key: 1 }, ct = { style: { display: "flex", gap: "6px", "flex-shrink": "0", "flex-wrap": "wrap", "justify-content": "flex-end" } }, bt = ["disabled"], ft = {
  class: "bomx-hdr-fields",
  style: { "grid-template-columns": "1fr 1fr" }
}, _t = ["disabled"], xt = { class: "bomx-toggle-row" }, yt = { class: "bomx-toggle" }, gt = { class: "bomx-toggle" }, kt = { class: "bomx-toggle" }, ht = { class: "bomx-body" }, wt = {
  class: "bomx-hdr-fields",
  style: { "grid-template-columns": "1fr", padding: "0", border: "none", background: "none", "margin-bottom": "20px" }
}, Ct = {
  class: "bomx-section-lbl",
  style: { display: "flex", "align-items": "center", gap: "6px" }
}, Ot = {
  key: 0,
  class: "bomx-count"
}, St = { class: "bomx-rm-cards" }, $t = {
  key: 0,
  class: "bomx-tree-empty"
}, Vt = { class: "bomx-rm-card-hdr" }, Bt = {
  class: "bomx-rm-card-title",
  style: { "font-weight": "700", color: "var(--bx-mfgB)", flex: "none" }
}, Dt = ["onClick"], Nt = {
  class: "bomx-rm-card-body",
  style: { "grid-template-columns": "2fr 1fr" }
}, Tt = { class: "bomx-rm-field bomx-rm-field-wide" }, Ut = ["onUpdate:modelValue"], At = { class: "bomx-rm-field" }, Lt = ["onUpdate:modelValue"], Wt = {
  key: 0,
  class: "inv-view-footer"
}, Mt = { class: "bomx-footer" }, It = ["disabled", "title"], Rt = ["disabled"], zt = {
  __name: "Operation",
  setup(qt) {
    const f = ye(), O = he(), { toast: u } = ce(), { confirm: Y } = we(), k = v(!1), _ = v([]), D = v(""), S = v(""), $ = v(""), z = p(() => f.params.name && f.params.name !== "new" ? f.params.name : f.params.name === "new" ? "new" : null);
    async function N() {
      k.value = !0;
      try {
        const e = await y("Operation", { fields: ["name", "operation_name", "default_workstation", "is_active", "is_corrective_operation", "modified"], limit: 1e3, order: "modified desc" });
        _.value = e || [];
      } catch {
        u("Could not load Operations", "error");
      }
      k.value = !1;
    }
    const T = p(() => {
      let o = _.value;
      S.value === "active" && (o = o.filter((s) => s.is_active)), S.value === "inactive" && (o = o.filter((s) => !s.is_active)), $.value && (o = o.filter((s) => s.default_workstation === $.value));
      const e = D.value.toLowerCase().trim();
      return e && (o = o.filter((s) => [s.operation_name, s.name, s.default_workstation].filter(Boolean).join(" ").toLowerCase().includes(e))), o;
    }), Z = p(() => {
      const o = new Set(_.value.map((e) => e.default_workstation).filter(Boolean));
      return Array.from(o).sort();
    }), ee = p(() => _.value.filter((o) => o.is_active).length), te = p(() => _.value.filter((o) => o.default_workstation).length), oe = p(() => _.value.filter((o) => o.is_corrective_operation).length);
    function q(o) {
      return o.is_active ? "Active" : "Inactive";
    }
    function j(o) {
      return o.is_active ? "badge-active" : "badge-obsolete";
    }
    function se(o) {
      O.push(`/manufacturing/operation/${o}`);
    }
    function E() {
      O.push("/manufacturing/operation/new");
    }
    function U() {
      O.push("/manufacturing/operation");
    }
    async function ae(o) {
      try {
        const [e, s, c] = await Promise.all([
          y("BOM Operation", { fields: ["parent"], filters: [["operation", "=", o.name]], limit: 1 }),
          y("Work Order Operation", { fields: ["parent"], filters: [["operation", "=", o.name]], limit: 1 }),
          y("Routing Operation", { fields: ["parent"], filters: [["operation", "=", o.name]], limit: 1 })
        ]);
        if (e && e.length)
          return u(`${o.name} is used in BOM ${e[0].parent} and cannot be deleted.`, "error"), !1;
        if (s && s.length)
          return u(`${o.name} is used in Work Order ${s[0].parent} and cannot be deleted.`, "error"), !1;
        if (c && c.length)
          return u(`${o.name} is used in Routing ${c[0].parent} and cannot be deleted.`, "error"), !1;
      } catch {
        return u(`Could not verify whether ${o.name} is in use — try again.`, "error"), !1;
      }
      return !0;
    }
    async function ne() {
      const o = { name: a.value.name };
      if (await ae(o) && await Y({ title: "Delete Operation?", body: `Are you sure you want to delete ${o.name}?`, okLabel: "Delete", okStyle: "danger" }))
        try {
          await ke("Operation", o.name), u("Operation deleted"), U(), N();
        } catch (e) {
          u("Could not delete Operation: " + e.message, "error");
        }
    }
    const r = p(() => f.params.name === "new"), h = v(!1), x = v(!1);
    function A() {
      return {
        doctype: "Operation",
        operation_name: "",
        default_workstation: "",
        is_corrective_operation: 0,
        batch_size: 0,
        quality_inspection_template: "",
        sub_operations: [],
        description: "",
        is_active: 1
      };
    }
    const a = v(A()), w = v([]), H = v([]);
    let ie = 0;
    function Q() {
      return ++ie;
    }
    function F(o) {
      return (o || []).forEach((e) => {
        e._uid || (e._uid = Q());
      }), o;
    }
    be(async () => {
      k.value = !0;
      try {
        const [o, e] = await Promise.all([
          y("Workstation", { fields: ["name"], filters: [["is_active", "=", 1]], limit: 1e3 }),
          y("QC Inspection Template", { fields: ["name"], limit: 1e3 })
        ]);
        w.value = o || [], H.value = e || [];
      } catch {
        u("Could not load Workstations / QC Templates — some dropdowns may be empty", "error");
      }
      await N(), f.params.name && await P(), k.value = !1;
    }), fe(() => f.params.name, async (o) => {
      if (!o) {
        a.value = A();
        return;
      }
      await P();
    });
    async function P() {
      if (r.value) {
        a.value = A();
        return;
      }
      h.value = !0;
      try {
        const o = await _e("Operation", f.params.name);
        o.sub_operations || (o.sub_operations = []), F(o.sub_operations), a.value = o, o.default_workstation && !w.value.some((e) => e.name === o.default_workstation) && (w.value = [{ name: o.default_workstation }, ...w.value]);
      } catch (o) {
        u("Error loading Operation: " + o.message, "error"), U();
      }
      h.value = !1;
    }
    function le() {
      a.value.sub_operations || (a.value.sub_operations = []), a.value.sub_operations.push({
        _uid: Q(),
        operation: "",
        operation_time: 0
      });
    }
    function re(o) {
      a.value.sub_operations.splice(o, 1);
    }
    async function G() {
      if (!a.value.operation_name) {
        u("Operation Name is mandatory", "error");
        return;
      }
      x.value = !0;
      try {
        const o = {
          ...a.value,
          sub_operations: (a.value.sub_operations || []).map(({ _uid: s, ...c }) => c)
        }, e = await ge(o);
        u(r.value ? "Operation created successfully" : "Saved successfully"), e.sub_operations || (e.sub_operations = []), F(e.sub_operations), r.value ? O.replace(`/manufacturing/operation/${e.name}`) : a.value = e, N();
      } catch (o) {
        u(o.message || "Could not save", "error");
      }
      x.value = !1;
    }
    const de = {
      plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>'
    };
    function J(o, e) {
      return (de[o] || "").replace("<svg ", `<svg width="${e}" height="${e}" `);
    }
    const ue = p(() => [{ value: "", label: "All Work Centres" }, ...(Z.value || []).map((o) => ({ value: o, label: o }))]), me = p(() => [{ value: "", label: "— Select Workstation —" }, ...(w.value || []).map((o) => ({ value: o.name, label: o.name }))]), ve = p(() => [{ value: "", label: "— Select Template —" }, ...(H.value || []).map((o) => ({ value: o.name, label: o.name }))]);
    return (o, e) => (i(), n("div", Ce, [
      t("div", Oe, [
        t("div", Se, [
          e[10] || (e[10] = t("div", { class: "bomx-sc-lbl" }, "Total Operations", -1)),
          t("div", $e, l(_.value.length), 1),
          e[11] || (e[11] = t("div", { class: "bomx-sc-sub" }, "In master", -1))
        ]),
        t("div", Ve, [
          e[12] || (e[12] = t("div", {
            class: "bomx-sc-lbl",
            style: { color: "var(--bx-green)" }
          }, "Active", -1)),
          t("div", Be, l(ee.value), 1),
          e[13] || (e[13] = t("div", { class: "bomx-sc-sub" }, "Currently in use", -1))
        ]),
        t("div", De, [
          e[14] || (e[14] = t("div", {
            class: "bomx-sc-lbl",
            style: { color: "var(--bx-blue)" }
          }, "With Workstation", -1)),
          t("div", Ne, l(te.value), 1),
          e[15] || (e[15] = t("div", { class: "bomx-sc-sub" }, "Machine-assigned", -1))
        ]),
        t("div", Te, [
          e[16] || (e[16] = t("div", {
            class: "bomx-sc-lbl",
            style: { color: "var(--bx-violet)" }
          }, "Corrective Ops", -1)),
          t("div", Ue, l(oe.value), 1),
          e[17] || (e[17] = t("div", { class: "bomx-sc-sub" }, "Rework / rectification", -1))
        ])
      ]),
      t("div", Ae, [
        t("div", Le, [
          t("div", We, [
            t("span", Me, [
              e[18] || (e[18] = m("⚙️ All Operations ", -1)),
              t("span", Ie, "(" + l(T.value.length) + ")", 1)
            ]),
            t("button", {
              class: "bomx-btn bomx-btn-mfg bomx-btn-sm",
              disabled: !o.$canCreate("inventory"),
              title: o.$canCreate("inventory") ? "" : "Read-only access",
              onClick: E
            }, [
              t("span", {
                innerHTML: J("plus", 12)
              }, null, 8, ze),
              e[19] || (e[19] = m(" New", -1))
            ], 8, Re)
          ]),
          t("div", qe, [
            b(t("select", {
              class: "bomx-fi bomx-status-filter",
              "onUpdate:modelValue": e[0] || (e[0] = (s) => S.value = s)
            }, [...e[20] || (e[20] = [
              t("option", { value: "" }, "All Status", -1),
              t("option", { value: "active" }, "Active", -1),
              t("option", { value: "inactive" }, "Inactive", -1)
            ])], 512), [
              [xe, S.value]
            ]),
            L(R, {
              modelValue: $.value,
              "onUpdate:modelValue": e[1] || (e[1] = (s) => $.value = s),
              options: ue.value,
              placeholder: "All Work Centres",
              compact: ""
            }, null, 8, ["modelValue", "options"])
          ]),
          b(t("input", {
            class: "bomx-search",
            "onUpdate:modelValue": e[2] || (e[2] = (s) => D.value = s),
            type: "text",
            placeholder: "Search Operation by name or workstation…"
          }, null, 512), [
            [C, D.value]
          ]),
          t("div", je, [
            k.value ? (i(), n(g, { key: 0 }, W(5, (s) => t("div", {
              key: s,
              class: "bomx-item"
            }, [...e[21] || (e[21] = [
              t("div", {
                class: "shimmer",
                style: { height: "38px", "border-radius": "6px" }
              }, null, -1)
            ])])), 64)) : T.value.length ? (i(!0), n(g, { key: 2 }, W(T.value, (s) => (i(), n("div", {
              key: s.name,
              class: M(["bomx-item", { active: z.value === s.name }]),
              onClick: (c) => se(s.name)
            }, [
              t("div", Qe, [
                t("span", Fe, l(s.is_corrective_operation ? "🛠️" : "⚙️"), 1),
                t("div", Pe, l(s.operation_name || s.name), 1),
                t("span", {
                  class: M(["bomx-badge", j(s)])
                }, l(q(s)), 3)
              ]),
              t("div", Ge, [
                t("span", Je, l(s.name), 1),
                s.default_workstation ? (i(), n("span", Ke, "•")) : d("", !0),
                s.default_workstation ? (i(), n("span", Xe, l(s.default_workstation), 1)) : d("", !0),
                s.sub_operation_count ? (i(), n("span", Ye, "•")) : d("", !0),
                s.sub_operation_count ? (i(), n("span", Ze, l(s.sub_operation_count) + " sub-op" + l(s.sub_operation_count > 1 ? "s" : ""), 1)) : d("", !0),
                s.quality_inspection_template ? (i(), n("span", et, "•")) : d("", !0),
                s.quality_inspection_template ? (i(), n("span", tt, "QC linked")) : d("", !0)
              ])
            ], 10, He))), 128)) : (i(), n("div", Ee, "No Operations found"))
          ])
        ]),
        t("div", ot, [
          z.value ? (i(), n(g, { key: 1 }, [
            h.value ? (i(), n("div", it, [...e[26] || (e[26] = [
              t("div", {
                class: "shimmer",
                style: { height: "200px", "border-radius": "10px" }
              }, null, -1)
            ])])) : (i(), n(g, { key: 1 }, [
              t("div", lt, [
                t("div", rt, [
                  t("div", dt, [
                    t("div", ut, l(r.value ? "New Operation" : a.value.operation_name || a.value.name), 1),
                    t("div", mt, [
                      r.value ? d("", !0) : (i(), n("span", vt, l(a.value.name), 1)),
                      r.value ? d("", !0) : (i(), n("span", pt, "•")),
                      t("span", {
                        class: M(["bomx-badge", j(a.value)]),
                        style: { "font-size": "11px" }
                      }, l(q(a.value)), 3)
                    ])
                  ]),
                  t("div", ct, [
                    t("button", {
                      class: "bomx-btn bomx-btn-ghost-inv",
                      onClick: U
                    }, "Back"),
                    t("button", {
                      class: "bomx-btn bomx-btn-light",
                      onClick: G,
                      disabled: x.value || h.value || !(r.value ? o.$canCreate("inventory") : o.$canEdit("inventory"))
                    }, l(x.value ? "Saving…" : r.value ? "Save Operation" : "Save Changes"), 9, bt)
                  ])
                ])
              ]),
              t("div", ft, [
                t("div", null, [
                  e[27] || (e[27] = t("div", { class: "bomx-hf-label" }, [
                    m("Operation Name "),
                    t("span", { style: { color: "var(--bx-red)" } }, "*")
                  ], -1)),
                  b(t("input", {
                    class: "bomx-fi",
                    type: "text",
                    "onUpdate:modelValue": e[3] || (e[3] = (s) => a.value.operation_name = s),
                    disabled: !r.value,
                    placeholder: "e.g., Body Assembly",
                    style: { width: "100%" }
                  }, null, 8, _t), [
                    [C, a.value.operation_name]
                  ])
                ]),
                t("div", null, [
                  e[28] || (e[28] = t("div", { class: "bomx-hf-label" }, "Default Workstation", -1)),
                  L(R, {
                    modelValue: a.value.default_workstation,
                    "onUpdate:modelValue": e[4] || (e[4] = (s) => a.value.default_workstation = s),
                    options: me.value,
                    placeholder: "— Select Workstation —",
                    style: { width: "100%" }
                  }, null, 8, ["modelValue", "options"])
                ])
              ]),
              t("div", xt, [
                t("label", yt, [
                  b(t("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": e[5] || (e[5] = (s) => a.value.is_corrective_operation = s),
                    "true-value": 1,
                    "false-value": 0
                  }, null, 512), [
                    [I, a.value.is_corrective_operation]
                  ]),
                  e[29] || (e[29] = m(" Is Corrective Operation", -1))
                ]),
                t("label", gt, [
                  b(t("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": e[6] || (e[6] = (s) => a.value.batch_size = s),
                    "true-value": 1,
                    "false-value": 0
                  }, null, 512), [
                    [I, a.value.batch_size]
                  ]),
                  e[30] || (e[30] = m(" Create Job Card based on Batch Size", -1))
                ]),
                t("label", kt, [
                  b(t("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": e[7] || (e[7] = (s) => a.value.is_active = s),
                    "true-value": 1,
                    "false-value": 0
                  }, null, 512), [
                    [I, a.value.is_active]
                  ]),
                  e[31] || (e[31] = m(" Is Active", -1))
                ])
              ]),
              t("div", ht, [
                t("div", wt, [
                  t("div", null, [
                    e[32] || (e[32] = t("div", { class: "bomx-hf-label" }, "QC Inspection Template", -1)),
                    L(R, {
                      modelValue: a.value.quality_inspection_template,
                      "onUpdate:modelValue": e[8] || (e[8] = (s) => a.value.quality_inspection_template = s),
                      options: ve.value,
                      placeholder: "— Select Template —",
                      style: { width: "100%", "max-width": "360px" }
                    }, null, 8, ["modelValue", "options"])
                  ])
                ]),
                t("div", Ct, [
                  e[33] || (e[33] = m(" Sub Operations ", -1)),
                  a.value.sub_operations && a.value.sub_operations.length ? (i(), n("span", Ot, "(" + l(a.value.sub_operations.length) + ")", 1)) : d("", !0)
                ]),
                t("div", St, [
                  !a.value.sub_operations || !a.value.sub_operations.length ? (i(), n("div", $t, "No sub-operations added.")) : d("", !0),
                  (i(!0), n(g, null, W(a.value.sub_operations, (s, c) => (i(), n("div", {
                    class: "bomx-rm-card",
                    key: s._uid
                  }, [
                    t("div", Vt, [
                      e[35] || (e[35] = t("span", { class: "bomx-tree-icon" }, "🔧", -1)),
                      t("span", Bt, "#" + l(c + 1), 1),
                      e[36] || (e[36] = t("div", { style: { flex: "1" } }, null, -1)),
                      t("button", {
                        class: "bomx-btn-icon danger bomx-rm-card-rm",
                        onClick: (V) => re(c),
                        title: "Remove"
                      }, [...e[34] || (e[34] = [
                        t("svg", {
                          width: "11",
                          height: "11",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2"
                        }, [
                          t("line", {
                            x1: "18",
                            y1: "6",
                            x2: "6",
                            y2: "18"
                          }),
                          t("line", {
                            x1: "6",
                            y1: "6",
                            x2: "18",
                            y2: "18"
                          })
                        ], -1)
                      ])], 8, Dt)
                    ]),
                    t("div", Nt, [
                      t("div", Tt, [
                        e[37] || (e[37] = t("label", null, "Sub-operation Name", -1)),
                        b(t("input", {
                          class: "bomx-fi",
                          type: "text",
                          "onUpdate:modelValue": (V) => s.operation = V,
                          placeholder: "Sub-operation name"
                        }, null, 8, Ut), [
                          [C, s.operation]
                        ])
                      ]),
                      t("div", At, [
                        e[38] || (e[38] = t("label", null, "Operation Time (mins)", -1)),
                        b(t("input", {
                          class: "bomx-fi bomx-fi-mono",
                          type: "number",
                          "onUpdate:modelValue": (V) => s.operation_time = V,
                          min: "0",
                          step: "any",
                          placeholder: "Time"
                        }, null, 8, Lt), [
                          [
                            C,
                            s.operation_time,
                            void 0,
                            { number: !0 }
                          ]
                        ])
                      ])
                    ])
                  ]))), 128))
                ]),
                t("div", {
                  class: "bomx-add-row",
                  onClick: le
                }, [...e[39] || (e[39] = [
                  t("svg", {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    t("line", {
                      x1: "12",
                      y1: "5",
                      x2: "12",
                      y2: "19"
                    }),
                    t("line", {
                      x1: "5",
                      y1: "12",
                      x2: "19",
                      y2: "12"
                    })
                  ], -1),
                  m(" Add Sub-Operation ", -1)
                ])]),
                e[40] || (e[40] = t("div", {
                  class: "bomx-section-lbl",
                  style: { "margin-top": "22px" }
                }, "Operation Description", -1)),
                b(t("textarea", {
                  class: "bomx-fi",
                  "onUpdate:modelValue": e[9] || (e[9] = (s) => a.value.description = s),
                  style: { width: "100%", "min-height": "110px", resize: "vertical" },
                  placeholder: "Description…"
                }, null, 512), [
                  [C, a.value.description]
                ]),
                !r.value && a.value.owner ? (i(), n("div", Wt, [
                  m(" Created by " + l(B(K)(a.value.owner)) + " on " + l(B(X)(a.value.creation)) + " ", 1),
                  a.value.modified_by ? (i(), n(g, { key: 0 }, [
                    m(" · Last modified by " + l(B(K)(a.value.modified_by)) + " on " + l(B(X)(a.value.modified)), 1)
                  ], 64)) : d("", !0)
                ])) : d("", !0)
              ]),
              t("div", Mt, [
                r.value ? d("", !0) : (i(), n("button", {
                  key: 0,
                  class: "bomx-btn bomx-btn-ghost-inv",
                  style: { color: "var(--bx-red)", "border-color": "rgba(201,42,42,.3)" },
                  disabled: !o.$canDelete("inventory"),
                  title: o.$canDelete("inventory") ? "" : "Not permitted",
                  onClick: ne
                }, "Delete Operation", 8, It)),
                e[42] || (e[42] = t("div", { style: { flex: "1" } }, null, -1)),
                t("button", {
                  class: "bomx-btn bomx-btn-mfg",
                  onClick: G,
                  disabled: x.value || h.value || !(r.value ? o.$canCreate("inventory") : o.$canEdit("inventory"))
                }, [
                  e[41] || (e[41] = t("svg", {
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
                  m(" " + l(x.value ? "Saving…" : r.value ? "Save Operation" : "Save Changes"), 1)
                ], 8, Rt)
              ])
            ], 64))
          ], 64)) : (i(), n("div", st, [
            e[23] || (e[23] = t("div", { class: "bomx-empty-icon" }, "⚙️", -1)),
            e[24] || (e[24] = t("div", { class: "bomx-empty-title" }, "Select an Operation", -1)),
            e[25] || (e[25] = t("div", { class: "bomx-empty-sub" }, "Choose an Operation from the list to view its settings and sub-operations.", -1)),
            t("button", {
              class: "bomx-btn bomx-btn-mfg",
              disabled: !o.$canCreate("inventory"),
              title: o.$canCreate("inventory") ? "" : "Read-only access",
              onClick: E
            }, [
              t("span", {
                innerHTML: J("plus", 13)
              }, null, 8, nt),
              e[22] || (e[22] = m(" Create Operation", -1))
            ], 8, at)
          ]))
        ])
      ])
    ]));
  }
}, Ft = /* @__PURE__ */ pe(zt, [["__scopeId", "data-v-8f70cb1b"]]);
export {
  Ft as default
};
