import { x as U, o as A, c as d, a as e, t as a, u as r, i as x, d as l, F as T, r as E, C as I, q as P, w as c, A as v, p as D, v as W, b as f, H as j, l as R, h as u, z as q, J as M, k as o } from "./main-B4BdT7Fg.js";
import { o as $ } from "./userNames-Cwhv_QJ8.js";
import { b as L } from "./format-BcJZDVG4.js";
const G = { class: "cust-page" }, J = { class: "cust-toolbar" }, Y = { style: { display: "flex", "align-items": "center", gap: "12px" } }, K = { style: { background: "#FFF3BF", color: "#E67700", padding: "2px 10px", "border-radius": "20px", "font-size": "12px", "font-weight": "600" } }, Q = ["disabled", "title"], X = ["innerHTML"], Z = {
  key: 0,
  style: { padding: "60px", "text-align": "center", color: "#868e96" }
}, ee = {
  key: 1,
  style: { padding: "60px", "text-align": "center", color: "#868e96", background: "#fff", border: "1px dashed #e4e8f0", "border-radius": "12px" }
}, te = ["disabled", "title"], ne = {
  key: 2,
  style: { display: "grid", gap: "10px" }
}, se = { style: { flex: "1", "min-width": "0" } }, ie = { style: { "font-size": "13.5px", "font-weight": "700", color: "#1a1a2e" } }, ae = { style: { "font-size": "12px", color: "#868e96", "margin-top": "2px" } }, oe = {
  key: 0,
  style: { "font-size": "11.5px", color: "#adb5bd", "margin-top": "2px" }
}, de = { style: { display: "flex", "align-items": "center", gap: "8px" } }, le = ["onClick"], re = ["innerHTML"], me = ["onClick"], pe = ["innerHTML"], ue = {
  class: "nim-dialog",
  style: { width: "520px" }
}, ye = { class: "nim-header" }, ce = { style: { "font-size": "15px", "font-weight": "700" } }, fe = ["innerHTML"], be = {
  class: "nim-body",
  style: { display: "grid", gap: "14px" }
}, ve = { class: "nim-field" }, _e = ["readonly"], ge = { class: "nim-field" }, xe = ["value"], ke = { style: { display: "grid", "grid-template-columns": "1fr 1fr", gap: "12px" } }, he = { class: "nim-field" }, we = { class: "nim-field" }, Fe = { class: "nim-field" }, Te = { class: "nim-field" }, De = {
  key: 0,
  style: { background: "#f0f9f4", border: "1px solid #8CE99A", "border-radius": "8px", padding: "12px", "font-size": "12.5px", color: "#2F9E44" }
}, Ce = {
  key: 1,
  class: "inv-view-footer"
}, ze = { class: "nim-footer" }, Ee = ["disabled"], Pe = {
  class: "nim-dialog",
  style: { width: "400px" }
}, Me = { class: "nim-body" }, $e = { style: { "font-size": "13.5px", color: "#4a5568" } }, Le = { class: "nim-footer" }, Ve = {
  __name: "SettingsPaymentTerms",
  setup(Be) {
    const { toast: y } = U(), _ = u([]), k = u(!1), g = u(!1), m = u(!1), p = u("add"), b = u(!1), h = u(null), i = q({
      name: "",
      due_date_based_on: "Day(s) after invoice date",
      payment_days: 0,
      discount_days: 0,
      discount_percentage: 0,
      description: "",
      owner: "",
      creation: "",
      modified_by: "",
      modified: ""
    }), B = [
      "Day(s) after invoice date",
      "Day(s) after end of invoice month",
      "Month(s) after end of invoice month"
    ], N = {
      "Day(s) after invoice date": { c: "#1971C2", bg: "#E7F5FF" },
      "Day(s) after end of invoice month": { c: "#E67700", bg: "#FFF3BF" },
      "Month(s) after end of invoice month": { c: "#2F9E44", bg: "#EBFBEE" }
    };
    function w(n) {
      return N[n.due_date_based_on] || { c: "#868E96", bg: "#F8F9FA" };
    }
    function C(n) {
      return (n.due_date_based_on === "Day(s) after invoice date" ? `${n.payment_days} days from invoice` : n.due_date_based_on === "Day(s) after end of invoice month" ? `${n.payment_days} days after month-end` : `${n.payment_days} months after month-end`) + (n.discount_percentage > 0 ? ` · ${n.discount_percentage}% discount if paid within ${n.discount_days}d` : "");
    }
    async function F() {
      k.value = !0;
      try {
        _.value = await R("psd_books.api.admin.get_payment_terms") || [];
      } catch (n) {
        y("Could not load payment terms: " + n.message, "error");
      }
      k.value = !1;
    }
    function z() {
      p.value = "add", Object.assign(i, {
        name: "",
        due_date_based_on: "Day(s) after invoice date",
        payment_days: 30,
        discount_days: 0,
        discount_percentage: 0,
        description: "",
        owner: "",
        creation: "",
        modified_by: "",
        modified: ""
      }), m.value = !0;
    }
    function H(n) {
      p.value = "edit", Object.assign(i, {
        name: n.name,
        due_date_based_on: n.due_date_based_on,
        payment_days: n.payment_days || 0,
        discount_days: n.discount_days || 0,
        discount_percentage: n.discount_percentage || 0,
        description: n.description || "",
        owner: n.owner || "",
        creation: n.creation || "",
        modified_by: n.modified_by || "",
        modified: n.modified || ""
      }), m.value = !0;
    }
    async function O() {
      if (!i.name.trim()) return y("Term name is required", "error");
      g.value = !0;
      try {
        await M("psd_books.api.admin.save_payment_term", {
          name: i.name,
          due_date_based_on: i.due_date_based_on,
          payment_days: i.payment_days,
          discount_days: i.discount_days,
          discount_percentage: i.discount_percentage,
          description: i.description
        }), y(p.value === "add" ? "Payment term created" : "Payment term updated"), m.value = !1, F();
      } catch (n) {
        y(n.message, "error");
      }
      g.value = !1;
    }
    async function V() {
      try {
        await M("psd_books.api.admin.delete_payment_term", { name: h.value }), y("Payment term deleted"), b.value = !1, F();
      } catch (n) {
        y(n.message, "error");
      }
    }
    return A(F), (n, t) => (o(), d("div", G, [
      e("div", J, [
        e("div", Y, [
          t[11] || (t[11] = e("span", { style: { "font-size": "18px", "font-weight": "700", color: "#1a1a2e" } }, "Payment Terms", -1)),
          e("span", K, a(_.value.length) + " terms", 1)
        ]),
        e("button", {
          class: "nim-btn nim-btn-primary",
          disabled: !n.$canWrite("admin"),
          title: n.$canWrite("admin") ? "" : "Read-only access",
          onClick: z
        }, [
          e("span", {
            innerHTML: r(x)("plus", 13),
            style: { "vertical-align": "-2px", "margin-right": "4px" }
          }, null, 8, X),
          t[12] || (t[12] = l("New Term", -1))
        ], 8, Q)
      ]),
      t[28] || (t[28] = e("div", { style: { background: "linear-gradient(135deg,#FFF9DB,#FFF3BF)", border: "1px solid #FFD43B", "border-radius": "10px", padding: "14px 18px", "margin-bottom": "16px", display: "flex", gap: "12px", "align-items": "center" } }, [
        e("span", { style: { "font-size": "20px" } }, "💳"),
        e("div", { style: { "font-size": "12.5px", color: "#876800" } }, [
          l("Payment terms define "),
          e("b", null, "when"),
          l(" a payment is due. Once created here, they appear in the Payment Terms dropdown on Invoices and Purchase Bills and automatically set the due date.")
        ])
      ], -1)),
      k.value ? (o(), d("div", Z, "Loading…")) : _.value.length ? (o(), d("div", ne, [
        (o(!0), d(T, null, E(_.value, (s) => (o(), d("div", {
          key: s.name,
          style: { background: "#fff", border: "1px solid #e4e8f0", "border-radius": "12px", padding: "18px 20px", display: "flex", "align-items": "center", gap: "14px" }
        }, [
          e("div", {
            style: D("width:46px;height:46px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;background:" + w(s).bg)
          }, "💳", 4),
          e("div", se, [
            e("div", ie, a(s.name), 1),
            e("div", ae, a(C(s)), 1),
            s.description ? (o(), d("div", oe, a(s.description), 1)) : f("", !0)
          ]),
          e("div", de, [
            e("span", {
              style: D("background:" + w(s).bg + ";color:" + w(s).c + ";padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:600")
            }, a(s.payment_days) + " days", 5),
            e("button", {
              class: "nim-btn nim-btn-ghost",
              onClick: (S) => H(s),
              style: { padding: "5px 10px", "font-size": "12px" }
            }, [
              e("span", {
                innerHTML: r(x)("edit", 12),
                style: { "vertical-align": "-2px", "margin-right": "3px" }
              }, null, 8, re),
              t[16] || (t[16] = l("Edit", -1))
            ], 8, le),
            e("button", {
              class: "nim-btn",
              onClick: (S) => {
                h.value = s.name, b.value = !0;
              },
              style: { padding: "5px 10px", "font-size": "12px", color: "#c92a2a", "border-color": "#ffc9c9", background: "#fff5f5" }
            }, [
              e("span", {
                innerHTML: r(x)("trash", 12),
                style: { "vertical-align": "-2px" }
              }, null, 8, pe)
            ], 8, me)
          ])
        ]))), 128))
      ])) : (o(), d("div", ee, [
        t[13] || (t[13] = e("div", { style: { "font-size": "36px", "margin-bottom": "10px" } }, "💳", -1)),
        t[14] || (t[14] = e("div", { style: { "font-size": "14px", "font-weight": "600", "margin-bottom": "4px" } }, "No payment terms yet", -1)),
        t[15] || (t[15] = e("div", { style: { "font-size": "12.5px" } }, 'Create payment terms like "Net 30", "Immediate" or "2/10 Net 30"', -1)),
        e("button", {
          class: "nim-btn nim-btn-primary",
          disabled: !n.$canWrite("admin"),
          title: n.$canWrite("admin") ? "" : "Read-only access",
          onClick: z,
          style: { "margin-top": "16px" }
        }, "Create Term", 8, te)
      ])),
      (o(), I(j, { to: "body" }, [
        m.value ? (o(), d("div", {
          key: 0,
          class: "nim-overlay",
          onClick: t[8] || (t[8] = P((s) => m.value = !1, ["self"]))
        }, [
          e("div", ue, [
            e("div", ye, [
              e("span", ce, a(p.value === "add" ? "New Payment Term" : "Edit Payment Term"), 1),
              e("button", {
                class: "nim-btn nim-btn-ghost",
                onClick: t[0] || (t[0] = (s) => m.value = !1)
              }, [
                e("span", {
                  innerHTML: r(x)("x", 14)
                }, null, 8, fe)
              ])
            ]),
            e("div", be, [
              e("div", ve, [
                t[17] || (t[17] = e("label", { class: "nim-label" }, [
                  l("Term Name "),
                  e("span", { style: { color: "#c92a2a" } }, "*")
                ], -1)),
                c(e("input", {
                  class: "nim-input",
                  "onUpdate:modelValue": t[1] || (t[1] = (s) => i.name = s),
                  readonly: p.value === "edit",
                  placeholder: "e.g. Net 30, Immediate, 2/10 Net 30",
                  style: D(p.value === "edit" ? "background:#f8f9fc;color:#868e96" : "")
                }, null, 12, _e), [
                  [v, i.name]
                ])
              ]),
              e("div", ge, [
                t[18] || (t[18] = e("label", { class: "nim-label" }, "Due Date Based On", -1)),
                c(e("select", {
                  class: "nim-input",
                  "onUpdate:modelValue": t[2] || (t[2] = (s) => i.due_date_based_on = s)
                }, [
                  (o(), d(T, null, E(B, (s) => e("option", {
                    key: s,
                    value: s
                  }, a(s), 9, xe)), 64))
                ], 512), [
                  [W, i.due_date_based_on]
                ])
              ]),
              e("div", ke, [
                e("div", he, [
                  t[19] || (t[19] = e("label", { class: "nim-label" }, "Payment Days", -1)),
                  c(e("input", {
                    class: "nim-input",
                    type: "number",
                    "onUpdate:modelValue": t[3] || (t[3] = (s) => i.payment_days = s),
                    min: "0"
                  }, null, 512), [
                    [v, i.payment_days]
                  ])
                ]),
                e("div", we, [
                  t[20] || (t[20] = e("label", { class: "nim-label" }, "Discount Days (early pay)", -1)),
                  c(e("input", {
                    class: "nim-input",
                    type: "number",
                    "onUpdate:modelValue": t[4] || (t[4] = (s) => i.discount_days = s),
                    min: "0"
                  }, null, 512), [
                    [v, i.discount_days]
                  ])
                ])
              ]),
              e("div", Fe, [
                t[21] || (t[21] = e("label", { class: "nim-label" }, "Early Payment Discount %", -1)),
                c(e("input", {
                  class: "nim-input",
                  type: "number",
                  "onUpdate:modelValue": t[5] || (t[5] = (s) => i.discount_percentage = s),
                  min: "0",
                  max: "100",
                  step: "0.01",
                  placeholder: "0"
                }, null, 512), [
                  [v, i.discount_percentage]
                ]),
                t[22] || (t[22] = e("div", { style: { "font-size": "11px", color: "#868e96", "margin-top": "3px" } }, "Leave 0 for no early-pay discount", -1))
              ]),
              e("div", Te, [
                t[23] || (t[23] = e("label", { class: "nim-label" }, "Description", -1)),
                c(e("input", {
                  class: "nim-input",
                  "onUpdate:modelValue": t[6] || (t[6] = (s) => i.description = s),
                  placeholder: "e.g. Payment due 30 days from invoice date"
                }, null, 512), [
                  [v, i.description]
                ])
              ]),
              i.name ? (o(), d("div", De, [
                t[24] || (t[24] = e("b", null, "Preview:", -1)),
                l(" " + a(C(i)), 1)
              ])) : f("", !0),
              p.value === "edit" && i.owner ? (o(), d("div", Ce, [
                l(" Created by " + a(r($)(i.owner)) + " on " + a(r(L)(i.creation)) + " ", 1),
                i.modified_by ? (o(), d(T, { key: 0 }, [
                  l(" · Last modified by " + a(r($)(i.modified_by)) + " on " + a(r(L)(i.modified)), 1)
                ], 64)) : f("", !0)
              ])) : f("", !0)
            ]),
            e("div", ze, [
              e("button", {
                class: "nim-btn nim-btn-ghost",
                onClick: t[7] || (t[7] = (s) => m.value = !1)
              }, "Cancel"),
              e("button", {
                class: "nim-btn nim-btn-primary",
                onClick: O,
                disabled: g.value
              }, a(g.value ? "Saving…" : "Save Term"), 9, Ee)
            ])
          ])
        ])) : f("", !0),
        b.value ? (o(), d("div", {
          key: 1,
          class: "nim-overlay",
          onClick: t[10] || (t[10] = P((s) => b.value = !1, ["self"]))
        }, [
          e("div", Pe, [
            t[27] || (t[27] = e("div", { class: "nim-header" }, [
              e("span", { style: { "font-weight": "700" } }, "Delete Payment Term?")
            ], -1)),
            e("div", Me, [
              e("p", $e, [
                t[25] || (t[25] = l('Delete "', -1)),
                e("b", null, a(h.value), 1),
                t[26] || (t[26] = l('"? Any invoices using this term will not be affected but the term will no longer be available in new documents.', -1))
              ])
            ]),
            e("div", Le, [
              e("button", {
                class: "nim-btn nim-btn-ghost",
                onClick: t[9] || (t[9] = (s) => b.value = !1)
              }, "Cancel"),
              e("button", {
                class: "nim-btn",
                style: { background: "#c92a2a", color: "#fff", "border-color": "#c92a2a" },
                onClick: V
              }, "Delete")
            ])
          ])
        ])) : f("", !0)
      ]))
    ]));
  }
};
export {
  Ve as default
};
