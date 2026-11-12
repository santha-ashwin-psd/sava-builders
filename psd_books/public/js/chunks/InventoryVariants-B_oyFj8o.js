import { _ as ue, x as ce, o as ve, c as d, a as t, u as m, i as k, d as _, t as u, F as M, n as O, w as h, B as pe, b as S, r as j, v as Q, W as me, A as C, a5 as W, C as be, q as _e, H as he, l as ye, f as ge, h as f, S as ke, g as I, J as $, z as q, j as fe, k as l, D as Te, K as Se } from "./main-DvPfzYHr.js";
import { f as z, a as Ve } from "./format-BcJZDVG4.js";
import { _ as we } from "./SearchableSelect-DL6hf2UM.js";
const Ce = { class: "b-page iv-root" }, $e = { class: "iv-head" }, Me = ["innerHTML"], Ue = { class: "iv-head-info" }, Le = { class: "iv-head-title" }, Ae = ["innerHTML"], Ee = { class: "iv-count-chip" }, He = { class: "iv-head-sub" }, Be = { class: "iv-code-badge" }, Ie = {
  key: 1,
  class: "b-card b-card-body iv-empty"
}, De = { class: "b-card iv-card" }, Re = { class: "iv-card-title" }, xe = ["innerHTML"], Ke = { class: "iv-card-head-right" }, Ne = { class: "iv-combo-count" }, Oe = ["innerHTML"], je = { class: "iv-card-body" }, qe = {
  key: 0,
  class: "iv-hint"
}, ze = ["onUpdate:modelValue"], Ge = ["onClick", "disabled"], Fe = ["innerHTML"], Je = { class: "iv-attr-actions" }, Pe = ["disabled"], Qe = ["innerHTML"], We = { class: "iv-attr-actions-right" }, Xe = { class: "iv-gen-preview" }, Ye = ["disabled"], Ze = ["innerHTML"], et = {
  key: 0,
  class: "b-card iv-bulk"
}, tt = { class: "iv-bulk-title" }, at = ["innerHTML"], nt = { class: "iv-bulk-controls" }, st = {
  key: 1,
  class: "iv-bulk-round-note"
}, it = { class: "iv-bulk-scope" }, lt = { class: "iv-radio" }, ot = { class: "iv-radio" }, dt = ["disabled"], rt = { class: "b-card iv-table-card" }, ut = {
  key: 0,
  class: "iv-empty"
}, ct = {
  key: 1,
  class: "iv-table-wrap"
}, vt = { class: "iv-table" }, pt = { class: "iv-th-check" }, mt = ["checked"], bt = {
  key: 0,
  class: "ta-r iv-th-stock"
}, _t = { class: "td-check iv-td-check" }, ht = ["checked", "onChange"], yt = {
  class: "td-variant",
  "data-label": "Variant"
}, gt = { class: "iv-var-name" }, kt = ["onUpdate:modelValue", "onInput", "disabled"], ft = { class: "iv-var-attrs" }, Tt = {
  key: 0,
  class: "text-muted"
}, St = {
  class: "td-sku",
  "data-label": "SKU"
}, Vt = ["onUpdate:modelValue", "onInput", "disabled", "title"], wt = {
  key: 0,
  class: "iv-inuse-tag"
}, Ct = {
  class: "td-sell ta-r",
  "data-label": "Selling KES"
}, $t = ["onUpdate:modelValue", "onInput", "disabled"], Mt = {
  class: "td-buy ta-r",
  "data-label": "Buying KES"
}, Ut = ["onUpdate:modelValue", "onInput", "disabled"], Lt = {
  key: 0,
  class: "td-stock ta-r",
  "data-label": "Stock"
}, At = { class: "iv-stock-val" }, Et = {
  class: "td-active ta-c",
  "data-label": "Active"
}, Ht = { class: "iv-switch" }, Bt = ["checked", "onChange", "disabled"], It = { class: "td-actions ta-r" }, Dt = ["onClick"], Rt = ["innerHTML"], xt = ["onClick", "disabled", "title"], Kt = ["innerHTML"], Nt = { class: "iv-modal" }, Ot = { class: "iv-modal-body" }, jt = { class: "iv-modal-actions" }, qt = ["disabled"], zt = {
  __name: "InventoryVariants",
  setup(Gt) {
    const D = ke(), X = fe(), { toast: c } = ce(), R = I(() => D.params.template), x = f(!0), T = f(null), v = f([]), y = q(/* @__PURE__ */ new Set()), V = q(/* @__PURE__ */ new Set()), U = f(!0), b = f([]), K = f([]), L = f(!1), o = q({ field: "selling", op: "set", value: 0, scope: "all" }), A = f(!1), g = f(null), E = f(!1), H = (a) => String(a || "").split(",").map((e) => e.trim()).filter(Boolean), Y = (a) => Number(a || 0).toLocaleString("en-US", { maximumFractionDigits: 2 }), w = I(
      () => b.value.reduce((a, e) => {
        const s = H(e.valuesText).length;
        return s ? a * s : a;
      }, b.value.some((a) => H(a.valuesText).length) ? 1 : 0)
    ), N = I(() => [...y]), G = I(() => v.value.length > 0 && y.size === v.value.length);
    function Z(a) {
      y.has(a) ? y.delete(a) : y.add(a);
    }
    function ee() {
      G.value ? y.clear() : v.value.forEach((a) => y.add(a.name));
    }
    function B(a) {
      V.add(a);
    }
    async function F() {
      var a;
      x.value = !0, y.clear(), V.clear();
      try {
        const e = await ye("psd_books.api.variants.get_variant_manager", { template_item: R.value });
        T.value = (e == null ? void 0 : e.template) || null, v.value = (e == null ? void 0 : e.variants) || [];
        const s = ((a = T.value) == null ? void 0 : a.attributes) || {};
        b.value = Object.keys(s).map((r) => ({ attribute: r, valuesText: (s[r] || []).join(", ") })), b.value.length || (b.value = [{ attribute: "", valuesText: "" }]);
      } catch (e) {
        T.value = null, c("Could not load variants: " + e.message, "error");
      }
      x.value = !1;
    }
    async function J() {
      try {
        const a = await ge("Item Attribute", { fields: ["name"], order: "name asc", limit: 200 });
        K.value = (a || []).map((e) => ({ value: e.name, label: e.name }));
      } catch {
        K.value = [];
      }
    }
    function te() {
      b.value.push({ attribute: "", valuesText: "" });
    }
    function ae(a) {
      b.value.splice(a, 1);
    }
    async function ne(a, e) {
      const s = String(a || "").trim();
      if (s)
        try {
          await Se({ doctype: "Item Attribute", attribute_name: s }), await J(), b.value[e] && (b.value[e].attribute = s), c(`Attribute "${s}" created`);
        } catch (r) {
          c("Could not create attribute: " + r.message, "error");
        }
    }
    async function se() {
      var a;
      if (w.value) {
        L.value = !0;
        try {
          const e = b.value.filter((r) => r.attribute && H(r.valuesText).length).map((r) => ({ attribute: r.attribute, values: H(r.valuesText) }));
          await $("psd_books.api.variants.set_template_attributes", {
            template_item: R.value,
            attributes: e
          });
          const s = await $("psd_books.api.variants.create_variants", {
            template_item: R.value
          });
          c(`Generated ${s.count} variant(s)` + ((a = s.skipped) != null && a.length ? ` · ${s.skipped.length} already existed` : "")), await F();
        } catch (e) {
          c("Regenerate failed: " + e.message, "error");
        } finally {
          L.value = !1;
        }
      }
    }
    async function ie(a) {
      try {
        const e = await $("psd_books.api.variants.update_variant", {
          item_code: a.name,
          item_name: a.item_name,
          standard_rate: z(a.standard_rate),
          standard_buying_rate: z(a.standard_buying_rate),
          new_item_code: a.item_code !== a.name ? a.item_code : null
        });
        e.renamed && (a.name = e.item_code), a.item_code = e.item_code, V.delete(a.name), c("Variant saved");
      } catch (e) {
        c("Save failed: " + e.message, "error");
      }
    }
    async function le(a) {
      const e = a.disabled ? 0 : 1;
      try {
        await $("psd_books.api.variants.update_variant", { item_code: a.name, disabled: e }), a.disabled = e, c(e ? "Variant disabled" : "Variant enabled");
      } catch (s) {
        c("Update failed: " + s.message, "error");
      }
    }
    function oe(a) {
      g.value = a;
    }
    async function de() {
      if (g.value) {
        E.value = !0;
        try {
          await $("psd_books.api.variants.delete_variant", { item_code: g.value.name }), v.value = v.value.filter((a) => a.name !== g.value.name), y.delete(g.value.name), c("Variant deleted"), g.value = null;
        } catch (a) {
          c("Delete failed: " + a.message, "error");
        } finally {
          E.value = !1;
        }
      }
    }
    async function re() {
      const a = o.scope === "all" ? v.value.map((r) => r.name) : N.value;
      if (!a.length) {
        c("No variants to update", "error");
        return;
      }
      let e = o.op, s = z(o.value);
      o.op === "dec_pct" ? (e = "inc_pct", s = -s) : o.op === "inc_amt" ? e = "inc_amt" : o.op === "dec_amt" ? (e = "inc_amt", s = -s) : o.op === "round" && (e = "round", s = 0), A.value = !0;
      try {
        const r = await $("psd_books.api.variants.bulk_update_variant_prices", {
          variant_codes: a,
          field: o.field,
          mode: e,
          value: s,
          decimals: o.op === "round" ? 0 : 2
        }), n = o.field === "selling" ? "standard_rate" : "standard_buying_rate", i = Object.fromEntries((r.updated || []).map((p) => [p.item_code, p.rate]));
        v.value.forEach((p) => {
          i[p.name] != null && (p[n] = i[p.name], V.delete(p.name));
        }), c(`Updated ${r.count} variant(s)`);
      } catch (r) {
        c("Bulk update failed: " + r.message, "error");
      } finally {
        A.value = !1;
      }
    }
    function P() {
      X.push({ name: "inventory-items" });
    }
    return ve(() => {
      F(), J();
    }), (a, e) => {
      var s, r;
      return l(), d("div", Ce, [
        t("div", $e, [
          t("button", {
            class: "iv-back",
            onClick: P,
            title: "Back to Items"
          }, [
            t("span", {
              innerHTML: m(k)("arrow-left", 16)
            }, null, 8, Me)
          ]),
          t("div", Ue, [
            t("div", Le, [
              t("span", {
                innerHTML: m(k)("box", 17)
              }, null, 8, Ae),
              _(" " + u(((s = T.value) == null ? void 0 : s.item_name) || m(D).params.template) + " ", 1),
              t("span", Ee, u(v.value.length) + " variant" + u(v.value.length === 1 ? "" : "s"), 1)
            ]),
            t("div", He, [
              t("span", Be, u(((r = T.value) == null ? void 0 : r.item_code) || m(D).params.template), 1),
              e[8] || (e[8] = _(" Manage attributes, prices, SKUs and stock for every variant. ", -1))
            ])
          ])
        ]),
        x.value ? (l(), d(M, { key: 0 }, [
          e[9] || (e[9] = t("div", { class: "b-card b-card-body iv-shimmer b-shimmer" }, null, -1)),
          e[10] || (e[10] = t("div", {
            class: "b-card b-card-body iv-shimmer b-shimmer",
            style: { height: "220px" }
          }, null, -1))
        ], 64)) : T.value ? (l(), d(M, { key: 2 }, [
          t("div", De, [
            t("div", {
              class: "iv-card-head",
              onClick: e[0] || (e[0] = (n) => U.value = !U.value)
            }, [
              t("div", Re, [
                t("span", {
                  innerHTML: m(k)("gear", 15)
                }, null, 8, xe),
                e[14] || (e[14] = _(" Attributes ", -1))
              ]),
              t("div", Ke, [
                t("span", Ne, u(w.value) + " combination" + u(w.value === 1 ? "" : "s"), 1),
                t("span", {
                  class: O(["iv-chevron", { open: U.value }]),
                  innerHTML: m(k)("arrow-right", 14)
                }, null, 10, Oe)
              ])
            ]),
            h(t("div", je, [
              b.value.length ? S("", !0) : (l(), d("div", qe, "Add an attribute (e.g. Colour) and its values (Red, Green, Blue).")),
              (l(!0), d(M, null, j(b.value, (n, i) => (l(), d("div", {
                key: i,
                class: "iv-attr-row"
              }, [
                Te(we, {
                  modelValue: n.attribute,
                  "onUpdate:modelValue": (p) => n.attribute = p,
                  options: K.value,
                  placeholder: "Attribute",
                  createable: !0,
                  onCreate: (p) => ne(p, i),
                  class: "iv-attr-name"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onCreate"]),
                h(t("input", {
                  "onUpdate:modelValue": (p) => n.valuesText = p,
                  class: "iv-input iv-attr-vals",
                  placeholder: "Values, comma-separated (Red, Green, Blue)"
                }, null, 8, ze), [
                  [C, n.valuesText]
                ]),
                t("button", {
                  class: "iv-icon-btn iv-icon-danger",
                  onClick: (p) => ae(i),
                  title: "Remove",
                  disabled: !a.$canEdit("inventory")
                }, [
                  t("span", {
                    innerHTML: m(k)("trash", 14)
                  }, null, 8, Fe)
                ], 8, Ge)
              ]))), 128)),
              t("div", Je, [
                t("button", {
                  class: "b-btn b-btn-ghost",
                  onClick: te,
                  disabled: !a.$canEdit("inventory")
                }, [
                  t("span", {
                    innerHTML: m(k)("plus", 13)
                  }, null, 8, Qe),
                  e[15] || (e[15] = _(" Add attribute ", -1))
                ], 8, Pe),
                t("div", We, [
                  t("span", Xe, u(w.value) + " variant" + u(w.value === 1 ? "" : "s") + " will exist after regenerating", 1),
                  t("button", {
                    class: "b-btn b-btn-primary",
                    disabled: L.value || !w.value || !a.$canEdit("inventory"),
                    onClick: se
                  }, [
                    t("span", {
                      innerHTML: m(k)("refresh", 13)
                    }, null, 8, Ze),
                    _(" " + u(L.value ? "Regenerating…" : "Save & Regenerate"), 1)
                  ], 8, Ye)
                ])
              ])
            ], 512), [
              [pe, U.value]
            ])
          ]),
          v.value.length ? (l(), d("div", et, [
            t("div", tt, [
              t("span", {
                innerHTML: m(k)("rupee", 14)
              }, null, 8, at),
              e[16] || (e[16] = _(" Bulk price change", -1))
            ]),
            t("div", nt, [
              h(t("select", {
                "onUpdate:modelValue": e[1] || (e[1] = (n) => o.field = n),
                class: "iv-input iv-bulk-select"
              }, [...e[17] || (e[17] = [
                t("option", { value: "selling" }, "Selling rate", -1),
                t("option", { value: "buying" }, "Buying rate", -1)
              ])], 512), [
                [Q, o.field]
              ]),
              h(t("select", {
                "onUpdate:modelValue": e[2] || (e[2] = (n) => o.op = n),
                class: "iv-input iv-bulk-select"
              }, [...e[18] || (e[18] = [
                me('<option value="set" data-v-b85481af>Set to</option><option value="inc_pct" data-v-b85481af>Increase %</option><option value="dec_pct" data-v-b85481af>Decrease %</option><option value="inc_amt" data-v-b85481af>Increase KES</option><option value="dec_amt" data-v-b85481af>Decrease KES</option><option value="round" data-v-b85481af>Round to nearest</option>', 6)
              ])], 512), [
                [Q, o.op]
              ]),
              o.op !== "round" ? h((l(), d("input", {
                key: 0,
                "onUpdate:modelValue": e[3] || (e[3] = (n) => o.value = n),
                type: "number",
                min: "0",
                step: "0.01",
                class: "iv-input iv-bulk-value",
                placeholder: "0.00"
              }, null, 512)), [
                [
                  C,
                  o.value,
                  void 0,
                  { number: !0 }
                ]
              ]) : (l(), d("span", st, "whole number")),
              t("div", it, [
                t("label", lt, [
                  h(t("input", {
                    type: "radio",
                    value: "selected",
                    "onUpdate:modelValue": e[4] || (e[4] = (n) => o.scope = n)
                  }, null, 512), [
                    [W, o.scope]
                  ]),
                  _(" Selected (" + u(N.value.length) + ")", 1)
                ]),
                t("label", ot, [
                  h(t("input", {
                    type: "radio",
                    value: "all",
                    "onUpdate:modelValue": e[5] || (e[5] = (n) => o.scope = n)
                  }, null, 512), [
                    [W, o.scope]
                  ]),
                  _(" All (" + u(v.value.length) + ")", 1)
                ])
              ]),
              t("button", {
                class: "b-btn b-btn-primary",
                disabled: A.value || !a.$canEdit("inventory") || o.scope === "selected" && !N.value.length,
                onClick: re
              }, u(A.value ? "Applying…" : "Apply"), 9, dt)
            ])
          ])) : S("", !0),
          t("div", rt, [
            v.value.length ? (l(), d("div", ct, [
              t("table", vt, [
                t("thead", null, [
                  t("tr", null, [
                    t("th", pt, [
                      t("input", {
                        type: "checkbox",
                        checked: G.value,
                        onChange: ee
                      }, null, 40, mt)
                    ]),
                    e[20] || (e[20] = t("th", null, "Variant", -1)),
                    e[21] || (e[21] = t("th", null, "SKU / Code", -1)),
                    e[22] || (e[22] = t("th", { class: "ta-r" }, "Selling KES", -1)),
                    e[23] || (e[23] = t("th", { class: "ta-r" }, "Buying KES", -1)),
                    T.value.is_stock_item ? (l(), d("th", bt, "Stock")) : S("", !0),
                    e[24] || (e[24] = t("th", { class: "ta-c" }, "Active", -1)),
                    e[25] || (e[25] = t("th", { class: "ta-r iv-th-actions" }, "Actions", -1))
                  ])
                ]),
                t("tbody", null, [
                  (l(!0), d(M, null, j(v.value, (n) => (l(), d("tr", {
                    key: n.name,
                    class: O({ "iv-row-dirty": V.has(n.name), "iv-row-off": n.disabled })
                  }, [
                    t("td", _t, [
                      t("input", {
                        type: "checkbox",
                        checked: y.has(n.name),
                        onChange: (i) => Z(n.name)
                      }, null, 40, ht)
                    ]),
                    t("td", yt, [
                      t("div", gt, [
                        h(t("input", {
                          "onUpdate:modelValue": (i) => n.item_name = i,
                          class: "iv-input iv-name-input",
                          onInput: (i) => B(n.name),
                          disabled: !a.$canEdit("inventory")
                        }, null, 40, kt), [
                          [C, n.item_name]
                        ])
                      ]),
                      t("div", ft, [
                        (l(!0), d(M, null, j(n.attributes, (i) => (l(), d("span", {
                          key: i.attribute,
                          class: "iv-attr-chip"
                        }, u(i.attribute_value), 1))), 128)),
                        n.attributes.length ? S("", !0) : (l(), d("span", Tt, "—"))
                      ])
                    ]),
                    t("td", St, [
                      h(t("input", {
                        "onUpdate:modelValue": (i) => n.item_code = i,
                        class: "iv-input iv-sku-input mono-sm",
                        onInput: (i) => B(n.name),
                        disabled: !a.$canEdit("inventory") || n.in_use,
                        title: n.in_use ? "Used in transactions — code can't change" : ""
                      }, null, 40, Vt), [
                        [C, n.item_code]
                      ]),
                      n.in_use ? (l(), d("div", wt, "in use")) : S("", !0)
                    ]),
                    t("td", Ct, [
                      h(t("input", {
                        "onUpdate:modelValue": (i) => n.standard_rate = i,
                        type: "number",
                        min: "0",
                        step: "0.01",
                        class: "iv-input iv-rate-input ta-r",
                        onInput: (i) => B(n.name),
                        disabled: !a.$canEdit("inventory")
                      }, null, 40, $t), [
                        [
                          C,
                          n.standard_rate,
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ]),
                    t("td", Mt, [
                      h(t("input", {
                        "onUpdate:modelValue": (i) => n.standard_buying_rate = i,
                        type: "number",
                        min: "0",
                        step: "0.01",
                        class: "iv-input iv-rate-input ta-r",
                        onInput: (i) => B(n.name),
                        disabled: !a.$canEdit("inventory")
                      }, null, 40, Ut), [
                        [
                          C,
                          n.standard_buying_rate,
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ]),
                    T.value.is_stock_item ? (l(), d("td", Lt, [
                      t("div", {
                        class: O(["iv-stock-qty", { "iv-stock-zero": !n.actual_qty }])
                      }, u(Y(n.actual_qty)), 3),
                      t("div", At, "KES " + u(m(Ve)(n.stock_value)), 1)
                    ])) : S("", !0),
                    t("td", Et, [
                      t("label", Ht, [
                        t("input", {
                          type: "checkbox",
                          checked: !n.disabled,
                          onChange: (i) => le(n),
                          disabled: !a.$canEdit("inventory")
                        }, null, 40, Bt),
                        e[26] || (e[26] = t("span", { class: "iv-switch-track" }, null, -1))
                      ])
                    ]),
                    t("td", It, [
                      V.has(n.name) ? (l(), d("button", {
                        key: 0,
                        class: "iv-icon-btn iv-icon-save",
                        onClick: (i) => ie(n),
                        title: "Save changes"
                      }, [
                        t("span", {
                          innerHTML: m(k)("save", 14)
                        }, null, 8, Rt)
                      ], 8, Dt)) : S("", !0),
                      t("button", {
                        class: "iv-icon-btn iv-icon-danger",
                        onClick: (i) => oe(n),
                        disabled: !a.$canDelete("inventory") || n.in_use,
                        title: n.in_use ? "Used in transactions — disable instead" : "Delete variant"
                      }, [
                        t("span", {
                          innerHTML: m(k)("trash", 14)
                        }, null, 8, Kt)
                      ], 8, xt)
                    ])
                  ], 2))), 128))
                ])
              ])
            ])) : (l(), d("div", ut, [...e[19] || (e[19] = [
              t("div", { class: "iv-empty-icon" }, "🧩", -1),
              t("div", { class: "iv-empty-title" }, "No variants yet", -1),
              t("div", { class: "iv-empty-sub" }, [
                _("Define attributes above and click "),
                t("b", null, "Save & Regenerate"),
                _(" to create them.")
              ], -1)
            ])]))
          ])
        ], 64)) : (l(), d("div", Ie, [
          e[12] || (e[12] = t("div", { class: "iv-empty-icon" }, "🧩", -1)),
          e[13] || (e[13] = t("div", { class: "iv-empty-title" }, "Template not found", -1)),
          t("div", { class: "iv-empty-sub" }, [
            e[11] || (e[11] = _("This item is not a variant template. ", -1)),
            t("a", {
              class: "iv-link",
              onClick: P
            }, "Back to Items")
          ])
        ])),
        (l(), be(he, { to: "body" }, [
          g.value ? (l(), d("div", {
            key: 0,
            class: "iv-modal-overlay",
            onClick: e[7] || (e[7] = _e((n) => g.value = null, ["self"]))
          }, [
            t("div", Nt, [
              e[28] || (e[28] = t("div", { class: "iv-modal-title" }, "Delete variant?", -1)),
              t("div", Ot, [
                t("b", null, u(g.value.item_code), 1),
                e[27] || (e[27] = _(" will be permanently removed. This can't be undone. ", -1))
              ]),
              t("div", jt, [
                t("button", {
                  class: "b-btn b-btn-ghost",
                  onClick: e[6] || (e[6] = (n) => g.value = null)
                }, "Cancel"),
                t("button", {
                  class: "b-btn iv-btn-danger",
                  disabled: E.value,
                  onClick: de
                }, u(E.value ? "Deleting…" : "Delete"), 9, qt)
              ])
            ])
          ])) : S("", !0)
        ]))
      ]);
    };
  }
}, Qt = /* @__PURE__ */ ue(zt, [["__scopeId", "data-v-b85481af"]]);
export {
  Qt as default
};
