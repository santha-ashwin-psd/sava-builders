import { _ as F, y as I, o as P, k as n, c as i, a as t, b as o, F as _, r as B, t as d, w as r, $ as T, d as D, v as N, A as v, u as U, a0 as j, a1 as E, g as z, f as O, a2 as q, h as f, z as R, K as G } from "./main-XrBjzhpc.js";
const H = { class: "am-wrap" }, J = { class: "am-section" }, Q = { class: "am-section-header" }, W = {
  key: 0,
  class: "am-empty"
}, X = { class: "am-card-body" }, Y = { key: 0 }, Z = { key: 1 }, ee = { key: 2 }, se = {
  key: 3,
  style: { color: "#6b7280", "margin-top": "2px", "font-size": "12px" }
}, te = {
  key: 0,
  class: "am-card-actions"
}, ae = ["onClick"], le = ["onClick"], ne = { class: "am-section" }, ie = { class: "am-section-header" }, oe = { class: "am-same-label" }, de = {
  key: 0,
  class: "am-empty"
}, re = { class: "am-card-body" }, ue = { key: 0 }, me = { key: 1 }, pe = { key: 2 }, ce = {
  key: 3,
  style: { color: "#6b7280", "margin-top": "2px", "font-size": "12px" }
}, ye = {
  key: 0,
  class: "am-card-actions"
}, ve = ["onClick"], _e = ["onClick"], fe = {
  key: 1,
  class: "am-same-notice"
}, be = {
  key: 0,
  class: "am-form"
}, ke = { class: "am-form-header" }, ge = { class: "am-form-grid" }, he = { class: "am-form-field am-span2" }, Ae = { class: "am-form-field am-span2" }, Ce = { class: "am-form-field am-span2" }, Se = { class: "am-form-field" }, Ve = { class: "am-form-field" }, Be = ["value"], De = { class: "am-form-field" }, Ne = ["value"], Ue = { class: "am-form-field" }, we = { class: "am-form-field am-span2" }, xe = { class: "am-form-footer" }, $e = ["disabled"], Ie = {
  __name: "AddressManager",
  props: {
    partyDoctype: { type: String, required: !0 },
    partyName: { type: String, default: "" },
    readonly: { type: Boolean, default: !1 },
    modelValue: { type: Array, default: () => [] }
    // pending addresses for add mode
  },
  emits: ["addressSaved", "addressDeleted", "update:modelValue"],
  setup(c, { emit: K }) {
    const u = c, b = K, k = z(() => !u.partyName), m = f([]), g = f(!1), p = f(null), h = f(!1), A = f(!1);
    let L = 0;
    const a = R({
      address_type: "Billing",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      pincode: "",
      country: "Kenya",
      phone: ""
    }), C = (l) => m.value.filter((e) => e.address_type === l);
    I(() => u.modelValue, (l) => {
      k.value && (m.value = [...l || []]);
    }, { immediate: !0 }), I(() => u.partyName, (l) => {
      l && S();
    });
    async function S() {
      if (u.partyName)
        try {
          const l = await O("Address", {
            fields: [
              "name",
              "address_title",
              "address_type",
              "address_line1",
              "address_line2",
              "city",
              "state",
              "pincode",
              "country",
              "phone"
            ],
            filters: [
              ["Dynamic Link", "link_name", "=", u.partyName],
              ["Dynamic Link", "link_doctype", "=", u.partyDoctype]
            ],
            order: "`tabAddress`.address_type asc, `tabAddress`.modified desc",
            limit: 50
          });
          m.value = Array.isArray(l) ? l : [];
        } catch {
          m.value = [];
        }
    }
    function w(l) {
      p.value = null, Object.assign(a, {
        address_type: l,
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        pincode: "",
        country: "Kenya",
        phone: ""
      }), g.value = !0;
    }
    function x(l) {
      p.value = l, Object.assign(a, {
        address_type: l.address_type || "Billing",
        address_line1: l.address_line1 || "",
        address_line2: l.address_line2 || "",
        city: l.city || "",
        state: l.state || "",
        pincode: l.pincode || "",
        country: l.country || "Kenya",
        phone: l.phone || ""
      }), g.value = !0;
    }
    function V() {
      g.value = !1, p.value = null;
    }
    async function M() {
      var l;
      if (a.address_line1.trim()) {
        if (k.value) {
          const e = {
            _tempId: ((l = p.value) == null ? void 0 : l._tempId) || "_t" + ++L,
            address_type: a.address_type,
            address_line1: a.address_line1.trim(),
            address_line2: a.address_line2.trim(),
            city: a.city.trim(),
            state: a.state.trim(),
            pincode: a.pincode.trim(),
            country: a.country.trim() || "Kenya",
            phone: a.phone.trim()
          }, s = p.value ? m.value.map((y) => y._tempId === e._tempId ? e : y) : [...m.value, e];
          m.value = s, b("update:modelValue", s), V();
          return;
        }
        h.value = !0;
        try {
          const e = {
            doctype: "Address",
            address_title: `${u.partyName} - ${a.address_type}`,
            address_type: a.address_type,
            address_line1: a.address_line1.trim(),
            address_line2: a.address_line2.trim(),
            city: a.city.trim(),
            state: a.state.trim(),
            pincode: a.pincode.trim(),
            country: a.country.trim() || "Kenya",
            phone: a.phone.trim(),
            links: [{ link_doctype: u.partyDoctype, link_name: u.partyName }]
          };
          p.value && (e.name = p.value.name), await G(e), await S(), V(), b("addressSaved");
        } catch (e) {
          console.error("Address save failed:", e);
        } finally {
          h.value = !1;
        }
      }
    }
    async function $(l) {
      if (confirm(`Delete this ${l.address_type} address?`)) {
        if (k.value) {
          const e = m.value.filter((s) => s._tempId !== l._tempId);
          m.value = e, b("update:modelValue", e);
          return;
        }
        try {
          await q("Address", l.name), await S(), b("addressDeleted", l.name);
        } catch (e) {
          console.error("Address delete failed:", e);
        }
      }
    }
    return P(() => {
      k.value || S();
    }), (l, e) => (n(), i("div", H, [
      t("div", J, [
        t("div", Q, [
          e[13] || (e[13] = t("span", { class: "am-section-title" }, "Billing Addresses", -1)),
          c.readonly ? o("", !0) : (n(), i("button", {
            key: 0,
            class: "am-btn-add",
            onClick: e[0] || (e[0] = (s) => w("Billing"))
          }, "+ Add"))
        ]),
        C("Billing").length ? o("", !0) : (n(), i("div", W, "No billing address on file")),
        (n(!0), i(_, null, B(C("Billing"), (s) => (n(), i("div", {
          key: s.name || s._tempId,
          class: "am-card"
        }, [
          t("div", X, [
            s.address_line1 ? (n(), i("div", Y, d(s.address_line1), 1)) : o("", !0),
            s.address_line2 ? (n(), i("div", Z, d(s.address_line2), 1)) : o("", !0),
            t("div", null, d([s.city, s.state, s.pincode].filter(Boolean).join(", ")), 1),
            s.country ? (n(), i("div", ee, d(s.country), 1)) : o("", !0),
            s.phone ? (n(), i("div", se, d(s.phone), 1)) : o("", !0)
          ]),
          c.readonly ? o("", !0) : (n(), i("div", te, [
            t("button", {
              class: "am-act-btn",
              onClick: (y) => x(s)
            }, "Edit", 8, ae),
            t("button", {
              class: "am-act-btn am-act-del",
              onClick: (y) => $(s)
            }, "Delete", 8, le)
          ]))
        ]))), 128))
      ]),
      t("div", ne, [
        t("div", ie, [
          e[14] || (e[14] = t("span", { class: "am-section-title" }, "Shipping Addresses", -1)),
          !c.readonly && !A.value ? (n(), i("button", {
            key: 0,
            class: "am-btn-add",
            onClick: e[1] || (e[1] = (s) => w("Shipping"))
          }, "+ Add")) : o("", !0)
        ]),
        t("label", oe, [
          r(t("input", {
            type: "checkbox",
            "onUpdate:modelValue": e[2] || (e[2] = (s) => A.value = s),
            class: "am-same-check"
          }, null, 512), [
            [T, A.value]
          ]),
          e[15] || (e[15] = D(" Use same address as billing ", -1))
        ]),
        A.value ? (n(), i("div", fe, "Shipping address matches billing address")) : (n(), i(_, { key: 0 }, [
          C("Shipping").length ? o("", !0) : (n(), i("div", de, "No shipping address on file")),
          (n(!0), i(_, null, B(C("Shipping"), (s) => (n(), i("div", {
            key: s.name || s._tempId,
            class: "am-card"
          }, [
            t("div", re, [
              s.address_line1 ? (n(), i("div", ue, d(s.address_line1), 1)) : o("", !0),
              s.address_line2 ? (n(), i("div", me, d(s.address_line2), 1)) : o("", !0),
              t("div", null, d([s.city, s.state, s.pincode].filter(Boolean).join(", ")), 1),
              s.country ? (n(), i("div", pe, d(s.country), 1)) : o("", !0),
              s.phone ? (n(), i("div", ce, d(s.phone), 1)) : o("", !0)
            ]),
            c.readonly ? o("", !0) : (n(), i("div", ye, [
              t("button", {
                class: "am-act-btn",
                onClick: (y) => x(s)
              }, "Edit", 8, ve),
              t("button", {
                class: "am-act-btn am-act-del",
                onClick: (y) => $(s)
              }, "Delete", 8, _e)
            ]))
          ]))), 128))
        ], 64))
      ]),
      g.value && !c.readonly ? (n(), i("div", be, [
        t("div", ke, [
          D(d(p.value ? "Edit" : "Add") + " Address ", 1),
          t("button", {
            class: "am-form-close",
            onClick: V
          }, "✕")
        ]),
        t("div", ge, [
          t("div", he, [
            e[17] || (e[17] = t("label", { class: "am-lbl" }, "Address Type", -1)),
            r(t("select", {
              "onUpdate:modelValue": e[3] || (e[3] = (s) => a.address_type = s),
              class: "am-input"
            }, [...e[16] || (e[16] = [
              t("option", null, "Billing", -1),
              t("option", null, "Shipping", -1)
            ])], 512), [
              [N, a.address_type]
            ])
          ]),
          t("div", Ae, [
            e[18] || (e[18] = t("label", { class: "am-lbl" }, [
              D("Address Line 1 "),
              t("span", { class: "am-req" }, "*")
            ], -1)),
            r(t("input", {
              "onUpdate:modelValue": e[4] || (e[4] = (s) => a.address_line1 = s),
              class: "am-input",
              placeholder: "Street, building no."
            }, null, 512), [
              [v, a.address_line1]
            ])
          ]),
          t("div", Ce, [
            e[19] || (e[19] = t("label", { class: "am-lbl" }, "Address Line 2", -1)),
            r(t("input", {
              "onUpdate:modelValue": e[5] || (e[5] = (s) => a.address_line2 = s),
              class: "am-input",
              placeholder: "Area, landmark"
            }, null, 512), [
              [v, a.address_line2]
            ])
          ]),
          t("div", Se, [
            e[20] || (e[20] = t("label", { class: "am-lbl" }, "City", -1)),
            r(t("input", {
              "onUpdate:modelValue": e[6] || (e[6] = (s) => a.city = s),
              class: "am-input",
              placeholder: "City"
            }, null, 512), [
              [v, a.city]
            ])
          ]),
          t("div", Ve, [
            e[22] || (e[22] = t("label", { class: "am-lbl" }, "Country", -1)),
            r(t("select", {
              "onUpdate:modelValue": e[7] || (e[7] = (s) => a.country = s),
              class: "am-input",
              onChange: e[8] || (e[8] = (s) => a.state = "")
            }, [
              e[21] || (e[21] = t("option", { value: "" }, "— Select Country —", -1)),
              (n(!0), i(_, null, B(U(j), (s) => (n(), i("option", {
                key: s,
                value: s
              }, d(s), 9, Be))), 128))
            ], 544), [
              [N, a.country]
            ])
          ]),
          t("div", De, [
            e[24] || (e[24] = t("label", { class: "am-lbl" }, "State", -1)),
            U(E)(a.country).length ? r((n(), i("select", {
              key: 0,
              "onUpdate:modelValue": e[9] || (e[9] = (s) => a.state = s),
              class: "am-input"
            }, [
              e[23] || (e[23] = t("option", { value: "" }, "— Select State —", -1)),
              (n(!0), i(_, null, B(U(E)(a.country), (s) => (n(), i("option", {
                key: s,
                value: s
              }, d(s), 9, Ne))), 128))
            ], 512)), [
              [N, a.state]
            ]) : r((n(), i("input", {
              key: 1,
              "onUpdate:modelValue": e[10] || (e[10] = (s) => a.state = s),
              class: "am-input",
              placeholder: "State"
            }, null, 512)), [
              [v, a.state]
            ])
          ]),
          t("div", Ue, [
            e[25] || (e[25] = t("label", { class: "am-lbl" }, "Postal Code", -1)),
            r(t("input", {
              "onUpdate:modelValue": e[11] || (e[11] = (s) => a.pincode = s),
              class: "am-input",
              placeholder: "Postal Code"
            }, null, 512), [
              [v, a.pincode]
            ])
          ]),
          t("div", we, [
            e[26] || (e[26] = t("label", { class: "am-lbl" }, "Phone", -1)),
            r(t("input", {
              "onUpdate:modelValue": e[12] || (e[12] = (s) => a.phone = s),
              class: "am-input",
              placeholder: "Phone number",
              type: "tel"
            }, null, 512), [
              [v, a.phone]
            ])
          ])
        ]),
        t("div", xe, [
          t("button", {
            class: "am-btn-cancel",
            onClick: V
          }, "Cancel"),
          t("button", {
            class: "am-btn-save",
            disabled: h.value,
            onClick: M
          }, d(h.value ? "Saving…" : "Save Address"), 9, $e)
        ])
      ])) : o("", !0)
    ]));
  }
}, Ke = /* @__PURE__ */ F(Ie, [["__scopeId", "data-v-055fd6f2"]]);
export {
  Ke as A
};
