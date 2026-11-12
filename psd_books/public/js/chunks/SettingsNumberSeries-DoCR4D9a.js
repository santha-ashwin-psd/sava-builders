import { x as T, o as $, c as r, a as e, t as o, u as E, i as w, d, F as b, r as y, b as v, C as O, q as S, w as x, v as V, A as _, H as B, l as D, h as g, z as I, J as P, k as a } from "./main-at6dmNzt.js";
const M = { class: "cust-page" }, R = { class: "cust-toolbar" }, A = { style: { display: "flex", "align-items": "center", gap: "12px" } }, L = { style: { background: "#EBFBEE", color: "#2F9E44", padding: "2px 10px", "border-radius": "20px", "font-size": "12px", "font-weight": "600" } }, H = ["disabled", "title"], U = ["innerHTML"], q = {
  key: 0,
  style: { padding: "60px", "text-align": "center", color: "#868e96" }
}, J = {
  key: 1,
  class: "cust-table-card sns-tbl-card",
  style: { "margin-top": "0" }
}, Q = {
  class: "sns-desktop-table",
  style: { width: "100%", "border-collapse": "collapse", "font-size": "13px" }
}, Y = { style: { padding: "12px 16px" } }, j = { style: { background: "#F3F0FF", color: "#2563eb", padding: "2px 10px", "border-radius": "20px", "font-size": "12px", "font-weight": "600" } }, G = { style: { padding: "12px 16px", "font-weight": "700", color: "#1a1a2e", "font-size": "13.5px" } }, X = { style: { padding: "12px 16px", color: "#4a5568", "text-align": "center" } }, K = { style: { padding: "12px 16px", color: "#4a5568", "text-align": "center" } }, W = { style: { padding: "12px 16px", color: "#2F9E44", "font-weight": "600" } }, Z = { style: { padding: "12px 16px", "text-align": "right" } }, ee = ["disabled", "title", "onClick"], te = { key: 0 }, ne = { class: "sns-mobile-cards" }, se = {
  key: 0,
  class: "sns-mc-empty"
}, ie = { class: "sns-mc-top" }, oe = { class: "sns-mc-prefix" }, ae = { style: { background: "#EBFBEE", color: "#2F9E44", padding: "2px 8px", "border-radius": "20px", "font-size": "12px", "font-weight": "600" } }, re = { class: "sns-mc-mid" }, de = { class: "sns-mc-meta" }, le = ["disabled", "onClick"], pe = {
  class: "nim-dialog",
  style: { width: "480px" }
}, ce = { class: "nim-header" }, ue = ["innerHTML"], xe = {
  class: "nim-body",
  style: { display: "grid", gap: "14px" }
}, ge = { class: "nim-field" }, fe = ["value"], me = { class: "nim-field" }, be = { style: { display: "grid", "grid-template-columns": "1fr 1fr", gap: "12px" } }, ye = { class: "nim-field" }, ve = { class: "nim-field" }, _e = {
  key: 0,
  style: { background: "#f8f9fc", "border-radius": "8px", padding: "12px", "font-size": "12.5px" }
}, he = { style: { color: "#2F9E44" } }, ke = { class: "nim-footer" }, Ee = ["disabled", "title"], Pe = {
  __name: "SettingsNumberSeries",
  setup(we) {
    const { toast: p } = T(), f = g(!1), u = g(!1), l = g([]), c = g(!1), i = I({ prefix: "", current: 0, padding: 4, doctype: "" }), C = [
      "Sales Invoice",
      "Purchase Invoice",
      "Sales Order",
      "Purchase Order",
      "Quotation",
      "Payment Entry",
      "Journal Entry",
      "Stock Entry",
      "Expense Claim",
      "Delivery Note",
      "Purchase Receipt"
    ];
    async function m() {
      f.value = !0;
      try {
        const s = await D("psd_books.api.admin.get_number_series") || [];
        l.value = s;
      } catch {
        l.value = [
          { prefix: "INV-", current: 1, padding: 4, doctype: "Sales Invoice" },
          { prefix: "PUR-", current: 1, padding: 4, doctype: "Purchase Invoice" },
          { prefix: "SO-", current: 1, padding: 4, doctype: "Sales Order" },
          { prefix: "PO-", current: 1, padding: 4, doctype: "Purchase Order" },
          { prefix: "QTN-", current: 1, padding: 4, doctype: "Quotation" },
          { prefix: "PAY-", current: 1, padding: 4, doctype: "Payment Entry" },
          { prefix: "JE-", current: 1, padding: 4, doctype: "Journal Entry" }
        ];
      }
      f.value = !1;
    }
    function h(s) {
      const t = String((s.current || 1) + 1).padStart(s.padding || 4, "0");
      return (s.prefix || "") + t;
    }
    function z() {
      Object.assign(i, { prefix: "", current: 0, padding: 4, doctype: "" }), c.value = !0;
    }
    async function F() {
      if (!i.prefix.trim()) return p("Prefix is required", "error");
      if (!i.doctype) return p("Document type is required", "error");
      u.value = !0;
      try {
        await P("psd_books.api.admin.save_number_series", { ...i }), p("Number series saved"), c.value = !1, m();
      } catch (s) {
        p(s.message, "error");
      }
      u.value = !1;
    }
    async function k(s) {
      try {
        await P("psd_books.api.admin.reset_number_series", { prefix: s.prefix, doctype: s.doctype }), p("Series reset to 1"), m();
      } catch (t) {
        p(t.message, "error");
      }
    }
    return $(m), (s, t) => (a(), r("div", M, [
      e("div", R, [
        e("div", A, [
          t[7] || (t[7] = e("span", { style: { "font-size": "18px", "font-weight": "700", color: "#1a1a2e" } }, "Number Series", -1)),
          e("span", L, o(l.value.length) + " series", 1)
        ]),
        e("button", {
          class: "nim-btn nim-btn-primary",
          disabled: !s.$canCreate("admin"),
          title: s.$canCreate("admin") ? "" : "Read-only access",
          onClick: z
        }, [
          e("span", {
            innerHTML: E(w)("plus", 13),
            style: { "vertical-align": "-2px", "margin-right": "4px" }
          }, null, 8, U),
          t[8] || (t[8] = d("Add Series", -1))
        ], 8, H)
      ]),
      t[19] || (t[19] = e("div", { style: { background: "linear-gradient(135deg,#EBFBEE,#D3F9D8)", border: "1px solid #8CE99A", "border-radius": "10px", padding: "14px 18px", "margin-bottom": "16px", display: "flex", gap: "12px", "align-items": "center" } }, [
        e("span", { style: { "font-size": "20px" } }, "🔢"),
        e("div", { style: { "font-size": "12.5px", color: "#2F9E44" } }, [
          d("Number series control the auto-numbering of your documents. The next number is generated as "),
          e("b", null, "PREFIX + padded sequence"),
          d(". For example: "),
          e("b", null, "INV-0001"),
          d(", "),
          e("b", null, "INV-0002"),
          d(", etc.")
        ])
      ], -1)),
      f.value ? (a(), r("div", q, "Loading…")) : (a(), r("div", J, [
        e("table", Q, [
          t[10] || (t[10] = e("thead", null, [
            e("tr", { style: { background: "#f8f9fc", "border-bottom": "2px solid #e4e8f0" } }, [
              e("th", { style: { padding: "10px 16px", "text-align": "left", "font-size": "11px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": ".5px", color: "#6b7db3" } }, "Document Type"),
              e("th", { style: { padding: "10px 16px", "text-align": "left", "font-size": "11px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": ".5px", color: "#6b7db3" } }, "Prefix"),
              e("th", { style: { padding: "10px 16px", "text-align": "left", "font-size": "11px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": ".5px", color: "#6b7db3" } }, "Padding"),
              e("th", { style: { padding: "10px 16px", "text-align": "left", "font-size": "11px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": ".5px", color: "#6b7db3" } }, "Current"),
              e("th", { style: { padding: "10px 16px", "text-align": "left", "font-size": "11px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": ".5px", color: "#6b7db3" } }, "Next Preview"),
              e("th", { style: { padding: "10px 16px", "text-align": "right", "font-size": "11px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": ".5px", color: "#6b7db3" } }, "Actions")
            ])
          ], -1)),
          e("tbody", null, [
            (a(!0), r(b, null, y(l.value, (n) => (a(), r("tr", {
              key: n.prefix,
              style: { "border-bottom": "1px solid #f0f2f7" }
            }, [
              e("td", Y, [
                e("span", j, o(n.doctype), 1)
              ]),
              e("td", G, o(n.prefix), 1),
              e("td", X, o(n.padding || 4), 1),
              e("td", K, o(n.current || 0), 1),
              e("td", W, o(h(n)), 1),
              e("td", Z, [
                e("button", {
                  class: "nim-btn nim-btn-ghost",
                  disabled: !s.$canEdit("admin"),
                  title: s.$canEdit("admin") ? "" : "Read-only access",
                  onClick: (N) => k(n),
                  style: { "font-size": "12px", color: "#c92a2a" }
                }, "Reset to 1", 8, ee)
              ])
            ]))), 128)),
            l.value.length ? v("", !0) : (a(), r("tr", te, [...t[9] || (t[9] = [
              e("td", {
                colspan: "6",
                style: { padding: "40px", "text-align": "center", color: "#868e96" }
              }, "No number series configured", -1)
            ])]))
          ])
        ]),
        e("div", ne, [
          l.value.length ? (a(!0), r(b, { key: 1 }, y(l.value, (n) => (a(), r("div", {
            key: n.prefix,
            class: "sns-mobile-card"
          }, [
            e("div", ie, [
              e("span", oe, o(n.prefix), 1),
              e("span", ae, o(h(n)), 1)
            ]),
            e("div", re, o(n.doctype), 1),
            e("div", de, [
              e("span", null, "Current: " + o(n.current || 0) + " · Padding: " + o(n.padding || 4), 1),
              e("button", {
                class: "nim-btn nim-btn-ghost",
                disabled: !s.$canEdit("admin"),
                onClick: S((N) => k(n), ["stop"]),
                style: { "font-size": "11.5px", color: "#c92a2a", padding: "3px 8px" }
              }, "Reset", 8, le)
            ])
          ]))), 128)) : (a(), r("div", se, [...t[11] || (t[11] = [
            e("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "🔢", -1),
            e("div", null, "No number series configured", -1)
          ])]))
        ])
      ])),
      (a(), O(B, { to: "body" }, [
        c.value ? (a(), r("div", {
          key: 0,
          class: "nim-overlay",
          onClick: t[6] || (t[6] = S((n) => c.value = !1, ["self"]))
        }, [
          e("div", pe, [
            e("div", ce, [
              t[12] || (t[12] = e("span", { style: { "font-size": "15px", "font-weight": "700" } }, "Add Number Series", -1)),
              e("button", {
                class: "nim-btn nim-btn-ghost",
                onClick: t[0] || (t[0] = (n) => c.value = !1)
              }, [
                e("span", {
                  innerHTML: E(w)("x", 14)
                }, null, 8, ue)
              ])
            ]),
            e("div", xe, [
              e("div", ge, [
                t[14] || (t[14] = e("label", { class: "nim-label" }, [
                  d("Document Type "),
                  e("span", { style: { color: "#c92a2a" } }, "*")
                ], -1)),
                x(e("select", {
                  class: "nim-input",
                  "onUpdate:modelValue": t[1] || (t[1] = (n) => i.doctype = n)
                }, [
                  t[13] || (t[13] = e("option", { value: "" }, "-- Select --", -1)),
                  (a(), r(b, null, y(C, (n) => e("option", {
                    key: n,
                    value: n
                  }, o(n), 9, fe)), 64))
                ], 512), [
                  [V, i.doctype]
                ])
              ]),
              e("div", me, [
                t[15] || (t[15] = e("label", { class: "nim-label" }, [
                  d("Prefix "),
                  e("span", { style: { color: "#c92a2a" } }, "*")
                ], -1)),
                x(e("input", {
                  class: "nim-input",
                  "onUpdate:modelValue": t[2] || (t[2] = (n) => i.prefix = n),
                  placeholder: "e.g. INV-"
                }, null, 512), [
                  [_, i.prefix]
                ])
              ]),
              e("div", be, [
                e("div", ye, [
                  t[16] || (t[16] = e("label", { class: "nim-label" }, "Start From", -1)),
                  x(e("input", {
                    class: "nim-input",
                    type: "number",
                    "onUpdate:modelValue": t[3] || (t[3] = (n) => i.current = n),
                    min: "0"
                  }, null, 512), [
                    [_, i.current]
                  ])
                ]),
                e("div", ve, [
                  t[17] || (t[17] = e("label", { class: "nim-label" }, "Padding (digits)", -1)),
                  x(e("input", {
                    class: "nim-input",
                    type: "number",
                    "onUpdate:modelValue": t[4] || (t[4] = (n) => i.padding = n),
                    min: "1",
                    max: "10"
                  }, null, 512), [
                    [_, i.padding]
                  ])
                ])
              ]),
              i.prefix ? (a(), r("div", _e, [
                t[18] || (t[18] = d(" Preview: ", -1)),
                e("b", he, o(i.prefix) + o(String((i.current || 0) + 1).padStart(i.padding || 4, "0")), 1)
              ])) : v("", !0)
            ]),
            e("div", ke, [
              e("button", {
                class: "nim-btn nim-btn-ghost",
                onClick: t[5] || (t[5] = (n) => c.value = !1)
              }, "Cancel"),
              e("button", {
                class: "nim-btn nim-btn-primary",
                onClick: F,
                disabled: u.value || !s.$canCreate("admin"),
                title: s.$canCreate("admin") ? "" : "Read-only access"
              }, o(u.value ? "Saving…" : "Save"), 9, Ee)
            ])
          ])
        ])) : v("", !0)
      ]))
    ]));
  }
};
export {
  Pe as default
};
