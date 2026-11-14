import { x as je, y as Fe, k as o, c as r, a as e, t as l, u as y, i as q, F as S, b, d as f, w as T, A as H, v as Ue, r as A, q as F, l as ve, g as X, h as w, z as oe, J as se, f as de, p as ot, X as me, _ as dt, o as rt, D as W, E as ut, a4 as Ee, C as ct, n as D, H as pt, S as vt, j as mt, Y as _t, e as ft, K as yt, a3 as bt, a9 as ht, R as gt } from "./main-mUgFUiID.js";
import { o as qt } from "./useOpenFromQuery-DhuBh8Na.js";
import { _ as De } from "./SearchableSelect-CfwJdYCJ.js";
import { D as Ae } from "./DocLink-2iOHz3ic.js";
import { f as C, b as pe } from "./format-BcJZDVG4.js";
import { P as kt } from "./Pagination-DndrhwZZ.js";
import { u as $t } from "./usePagination-DLGK60OL.js";
import { o as Ne } from "./userNames-TYQzyRIC.js";
const wt = { class: "inv-drawer-panel" }, xt = { class: "inv-dh" }, Ct = { style: { display: "flex", "align-items": "center", gap: "10px", "flex-wrap": "wrap" } }, St = { class: "inv-dh-title" }, Rt = {
  class: "inv-dh-sub",
  style: { "margin-left": "4px" }
}, Tt = ["disabled"], Mt = ["innerHTML"], Lt = { class: "inv-content-row" }, Qt = { class: "inv-dbody" }, Ht = {
  key: 0,
  style: { padding: "24px" }
}, Vt = {
  key: 1,
  class: "exp-field-hint",
  style: { padding: "16px", color: "#C92A2A" }
}, Et = {
  key: 0,
  class: "exp-field-hint",
  style: { "margin-bottom": "10px" }
}, Dt = { class: "add-card" }, At = { class: "add-card-body" }, Nt = { class: "inv-fg inv-fg2" }, jt = ["value"], Ft = { style: { "grid-column": "1/-1" } }, Ut = { class: "add-card" }, Pt = {
  class: "add-card-body",
  style: { padding: "16px 16px 8px" }
}, Ot = { class: "po-item-cards" }, It = { class: "po-item-card-header" }, zt = { class: "po-item-card-num" }, Bt = { class: "po-item-card-title" }, Kt = { class: "po-item-card-subtotal" }, Gt = { class: "po-item-card-subtotal-label" }, Yt = { class: "po-item-card-amount" }, Wt = { class: "po-item-card-body" }, Jt = { class: "po-item-col po-item-col--left" }, Xt = { class: "po-item-num-row" }, Zt = { class: "po-item-field" }, es = ["value"], ts = { class: "po-item-field" }, ss = ["value"], ns = { class: "po-item-col po-item-col--right" }, ls = { class: "po-item-num-row" }, as = { class: "po-item-field" }, is = ["onUpdate:modelValue"], os = { class: "po-item-field" }, ds = ["onUpdate:modelValue"], rs = { class: "po-item-field" }, us = ["value"], cs = { style: { display: "flex", "flex-direction": "column", "align-items": "flex-end", gap: "4px", padding: "10px 4px 12px", "font-size": "13px" } }, ps = { class: "mono" }, vs = { class: "mono" }, ms = { style: { "font-size": "14px" } }, _s = { class: "mono" }, fs = { class: "inv-dfooter" }, ys = { class: "add-footer-status" }, bs = { class: "add-footer-actions" }, hs = ["disabled"], gs = ["disabled"], qs = ["innerHTML"], qe = "psd_books.api.supplier_quotation.", ks = {
  __name: "QuotationDialog",
  props: {
    open: { type: Boolean, default: !1 },
    rfq: { type: String, default: "" },
    supplier: { type: String, default: "" },
    supplierName: { type: String, default: "" }
  },
  emits: ["close", "saved"],
  setup(N, { emit: k }) {
    const M = N, P = k, { toast: O } = je(), V = { module: "bills", action: "write" }, $ = w(!1), L = w(!1), Q = w(""), U = w([]), c = oe({
      entry_date: "",
      quotation_date: "",
      delivery_days: null,
      payment_terms: "",
      remarks: "",
      active_quotation: null,
      revision_no: 0,
      items: []
    }), x = X(() => !!c.active_quotation), v = (i) => Math.round(i * 100 + 1e-9) / 100;
    function h(i) {
      return i.rate !== "" && i.rate != null && C(i.rate) > 0;
    }
    function R(i) {
      if (!h(i)) return { quoted: !1, amount: 0, tax: 0 };
      const a = v(C(i.qty) * C(i.rate) * (100 - C(i.discount_percent)) / 100), m = v(a * 100 / (100 + C(i.vat_percent)));
      return { quoted: !0, amount: m, tax: v(a - m) };
    }
    const ne = X(() => {
      let i = 0, a = 0;
      for (const m of c.items) {
        const E = R(m);
        i += E.amount, a += E.tax;
      }
      return i = v(i), a = v(a), { net: i, tax: a, grand: v(i + a) };
    });
    function Z(i) {
      return Number(i || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    async function K() {
      if (!U.value.length)
        try {
          const i = await de("Payment Terms", { fields: ["name"], order: "credit_days asc, name asc", limit: 100 });
          U.value = (i || []).map((a) => a.name);
        } catch {
          U.value = [];
        }
    }
    async function u() {
      $.value = !0, Q.value = "";
      try {
        const [i] = await Promise.all([
          ve(qe + "get_quotation_prefill", { request_for_quotation: M.rfq, supplier: M.supplier }),
          K()
        ]);
        Object.assign(c, {
          entry_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
          // this screen always creates a new record, so the entry day is today
          quotation_date: i.quotation_date || "",
          delivery_days: i.delivery_days ?? null,
          payment_terms: i.payment_terms || "",
          remarks: i.remarks || "",
          active_quotation: i.active_quotation || null,
          revision_no: i.revision_no || 0
        }), c.payment_terms && !U.value.includes(c.payment_terms) && U.value.push(c.payment_terms), c.items = (i.items || []).map((a) => ({
          mrn_item: a.mrn_item,
          item_code: a.item_code,
          item_name: a.item_name,
          uom: a.uom,
          qty: a.qty,
          vat_percent: a.vat_percent,
          rate: a.rate == null ? "" : a.rate,
          discount_percent: a.discount_percent ?? 0
        }));
      } catch (i) {
        Q.value = i.message || "Could not load the quotation form";
      }
      $.value = !1;
    }
    Fe(() => M.open, (i) => {
      i && u();
    }, { immediate: !0 });
    function j() {
      if (!c.entry_date) return "Enter the entry date";
      if (!c.quotation_date) return "Enter the quotation date";
      if (c.delivery_days !== null && c.delivery_days !== "" && !(C(c.delivery_days) >= 0)) return "Delivery days can't be negative";
      for (const i of c.items) {
        if (i.rate !== "" && i.rate != null && C(i.rate) < 0) return `${i.item_code}: rate can't be negative`;
        const a = C(i.discount_percent);
        if (a < 0 || a > 100) return `${i.item_code}: discount must be between 0 and 100%`;
      }
      return c.items.some(h) ? "" : "Enter a rate for at least one item";
    }
    async function I() {
      const i = j();
      if (i) return O.error(i);
      L.value = !0;
      try {
        const a = {
          request_for_quotation: M.rfq,
          supplier: M.supplier,
          entry_date: c.entry_date,
          quotation_date: c.quotation_date,
          delivery_days: c.delivery_days === "" ? null : c.delivery_days,
          payment_terms: c.payment_terms || null,
          remarks: c.remarks || "",
          items: c.items.map((E) => ({
            mrn_item: E.mrn_item,
            rate: h(E) ? C(E.rate) : null,
            discount_percent: C(E.discount_percent)
          }))
        }, m = x.value ? await se(qe + "revise_quotation", { name: c.active_quotation, data: a }, V) : await se(qe + "enter_quotation", { data: a }, V);
        O.success(`Quotation ${m.name} saved`), P("saved", m);
      } catch (a) {
        O.error(a.message || "Could not save the quotation");
      }
      L.value = !1;
    }
    function G() {
      L.value || P("close");
    }
    return (i, a) => N.open ? (o(), r("div", {
      key: 0,
      class: "inv-drawer-bg",
      onClick: F(G, ["self"])
    }, [
      e("div", wt, [
        e("div", xt, [
          e("div", Ct, [
            e("div", St, l(x.value ? "Revise Quotation" : "Enter Quotation"), 1),
            e("span", Rt, l(N.supplierName || N.supplier) + " · " + l(N.rfq), 1)
          ]),
          e("button", {
            class: "inv-dclose",
            onClick: G,
            disabled: L.value
          }, [
            e("span", {
              innerHTML: y(q)("x", 16)
            }, null, 8, Mt)
          ], 8, Tt)
        ]),
        e("div", Lt, [
          e("div", Qt, [
            $.value ? (o(), r("div", Ht, [...a[5] || (a[5] = [
              e("div", {
                class: "shimmer",
                style: { height: "12px" }
              }, null, -1)
            ])])) : Q.value ? (o(), r("div", Vt, l(Q.value), 1)) : (o(), r(S, { key: 2 }, [
              x.value ? (o(), r("div", Et, " Revising " + l(c.active_quotation) + " (revision " + l(c.revision_no) + "). Saving makes it Superseded and creates revision " + l(c.revision_no + 1) + " as the Active quotation. ", 1)) : b("", !0),
              e("div", Dt, [
                a[12] || (a[12] = e("div", { class: "add-card-header" }, [
                  e("div", { class: "add-card-title" }, "Quotation Details")
                ], -1)),
                e("div", At, [
                  e("div", Nt, [
                    e("div", null, [
                      a[6] || (a[6] = e("label", { class: "inv-lbl" }, [
                        f("Entry Date "),
                        e("span", { class: "inv-req" }, "*")
                      ], -1)),
                      T(e("input", {
                        class: "inv-fi",
                        type: "date",
                        "onUpdate:modelValue": a[0] || (a[0] = (m) => c.entry_date = m)
                      }, null, 512), [
                        [H, c.entry_date]
                      ])
                    ]),
                    e("div", null, [
                      a[7] || (a[7] = e("label", { class: "inv-lbl" }, [
                        f("Quotation Date "),
                        e("span", { class: "inv-req" }, "*")
                      ], -1)),
                      T(e("input", {
                        class: "inv-fi",
                        type: "date",
                        "onUpdate:modelValue": a[1] || (a[1] = (m) => c.quotation_date = m)
                      }, null, 512), [
                        [H, c.quotation_date]
                      ])
                    ]),
                    e("div", null, [
                      a[8] || (a[8] = e("label", { class: "inv-lbl" }, "Delivery (days)", -1)),
                      T(e("input", {
                        class: "inv-fi",
                        type: "number",
                        min: "0",
                        step: "1",
                        "onUpdate:modelValue": a[2] || (a[2] = (m) => c.delivery_days = m),
                        placeholder: "e.g. 7"
                      }, null, 512), [
                        [
                          H,
                          c.delivery_days,
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ]),
                    e("div", null, [
                      a[10] || (a[10] = e("label", { class: "inv-lbl" }, "Payment Terms", -1)),
                      T(e("select", {
                        class: "inv-fi",
                        "onUpdate:modelValue": a[3] || (a[3] = (m) => c.payment_terms = m)
                      }, [
                        a[9] || (a[9] = e("option", { value: "" }, "— Select Payment Terms —", -1)),
                        (o(!0), r(S, null, A(U.value, (m) => (o(), r("option", {
                          key: m,
                          value: m
                        }, l(m), 9, jt))), 128))
                      ], 512), [
                        [Ue, c.payment_terms]
                      ])
                    ]),
                    e("div", Ft, [
                      a[11] || (a[11] = e("label", { class: "inv-lbl" }, "Remarks", -1)),
                      T(e("textarea", {
                        class: "inv-fi",
                        "onUpdate:modelValue": a[4] || (a[4] = (m) => c.remarks = m),
                        rows: "2",
                        maxlength: "500",
                        placeholder: "Optional",
                        style: { resize: "vertical" }
                      }, null, 512), [
                        [H, c.remarks]
                      ])
                    ])
                  ])
                ])
              ]),
              e("div", Ut, [
                a[21] || (a[21] = e("div", { class: "add-card-header" }, [
                  e("div", { class: "add-card-title" }, [
                    f(" Items "),
                    e("span", { style: { "font-size": "11.5px", color: "#6b7280", "font-weight": "400", "letter-spacing": "0", "text-transform": "none" } }, " · rates include VAT; leave the rate blank for items the supplier did not quote")
                  ])
                ], -1)),
                e("div", Pt, [
                  e("div", Ot, [
                    (o(!0), r(S, null, A(c.items, (m, E) => (o(), r("div", {
                      key: m.mrn_item,
                      class: "po-item-card"
                    }, [
                      e("div", It, [
                        e("span", zt, "#" + l(E + 1), 1),
                        e("span", Bt, l(m.item_name || m.item_code), 1),
                        e("div", Kt, [
                          e("span", Gt, l(R(m).quoted ? "TOTAL INCL. VAT" : ""), 1),
                          e("span", Yt, l(R(m).quoted ? Z(R(m).amount + R(m).tax) : "Not quoted"), 1)
                        ])
                      ]),
                      e("div", Wt, [
                        e("div", Jt, [
                          e("div", Xt, [
                            e("div", Zt, [
                              a[13] || (a[13] = e("label", null, "Qty", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: m.qty,
                                readonly: "",
                                tabindex: "-1",
                                style: { background: "#f3f4f6", color: "#6b7280" }
                              }, null, 8, es)
                            ]),
                            e("div", ts, [
                              a[14] || (a[14] = e("label", null, "UOM", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: m.uom || "—",
                                readonly: "",
                                tabindex: "-1",
                                style: { background: "#f3f4f6", color: "#6b7280" }
                              }, null, 8, ss)
                            ])
                          ])
                        ]),
                        e("div", ns, [
                          e("div", ls, [
                            e("div", as, [
                              e("label", null, "Rate incl. VAT (KES per " + l(m.uom || "unit") + ")", 1),
                              T(e("input", {
                                class: "inv-fi",
                                type: "number",
                                min: "0",
                                step: "0.01",
                                "onUpdate:modelValue": (Y) => m.rate = Y,
                                placeholder: "Not quoted"
                              }, null, 8, is), [
                                [H, m.rate]
                              ])
                            ]),
                            e("div", os, [
                              a[15] || (a[15] = e("label", null, "Discount %", -1)),
                              T(e("input", {
                                class: "inv-fi",
                                type: "number",
                                min: "0",
                                max: "100",
                                step: "0.01",
                                "onUpdate:modelValue": (Y) => m.discount_percent = Y
                              }, null, 8, ds), [
                                [H, m.discount_percent]
                              ])
                            ]),
                            e("div", rs, [
                              a[16] || (a[16] = e("label", null, "VAT %", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: m.vat_percent,
                                readonly: "",
                                tabindex: "-1",
                                style: { background: "#f3f4f6", color: "#6b7280" }
                              }, null, 8, us)
                            ])
                          ])
                        ])
                      ])
                    ]))), 128))
                  ]),
                  e("div", cs, [
                    e("div", null, [
                      a[17] || (a[17] = f("Net total: ", -1)),
                      e("strong", ps, l(Z(ne.value.net)), 1)
                    ]),
                    e("div", null, [
                      a[18] || (a[18] = f("VAT: ", -1)),
                      e("strong", vs, l(Z(ne.value.tax)), 1)
                    ]),
                    e("div", ms, [
                      a[19] || (a[19] = f("Grand total: ", -1)),
                      e("strong", _s, "KES " + l(Z(ne.value.grand)), 1)
                    ]),
                    a[20] || (a[20] = e("div", { class: "exp-field-hint" }, "Preview only. The saved totals are calculated by the server.", -1))
                  ])
                ])
              ])
            ], 64))
          ])
        ]),
        e("div", fs, [
          e("div", ys, l(x.value ? "Revision of " + c.active_quotation : "New quotation — unsaved"), 1),
          e("div", bs, [
            e("button", {
              class: "add-btn-cancel",
              onClick: G,
              disabled: L.value
            }, "Cancel", 8, hs),
            e("button", {
              class: "add-btn-draft",
              onClick: I,
              disabled: L.value || $.value || !!Q.value
            }, [
              e("span", {
                innerHTML: y(q)("save", 13)
              }, null, 8, qs),
              f(" " + l(L.value ? "Saving…" : x.value ? "Save Revision" : "Save Quotation"), 1)
            ], 8, gs)
          ])
        ])
      ])
    ])) : b("", !0);
  }
}, $s = { class: "inv-drawer-panel" }, ws = { class: "inv-dh" }, xs = { style: { display: "flex", "align-items": "center", gap: "10px", "flex-wrap": "wrap" } }, Cs = {
  class: "inv-dh-sub",
  style: { "margin-left": "4px" }
}, Ss = ["innerHTML"], Rs = { class: "inv-content-row" }, Ts = { class: "inv-dbody" }, Ms = {
  key: 0,
  style: { padding: "24px" }
}, Ls = {
  key: 1,
  class: "exp-field-hint",
  style: { padding: "16px", color: "#C92A2A" }
}, Qs = {
  class: "exp-field-hint",
  style: { "margin-bottom": "10px" }
}, Hs = { class: "add-card" }, Vs = { class: "add-card-body" }, Es = { class: "inv-fg inv-fg2" }, Ds = ["value"], As = ["value"], Ns = ["value"], js = { style: { "grid-column": "1/-1" } }, Fs = ["value"], Us = { class: "add-card" }, Ps = {
  class: "add-card-body",
  style: { padding: "16px 16px 8px" }
}, Os = { class: "po-item-cards" }, Is = { class: "po-item-card-header" }, zs = { class: "po-item-card-num" }, Bs = { class: "po-item-card-title" }, Ks = { class: "po-item-card-subtotal" }, Gs = { class: "po-item-card-subtotal-label" }, Ys = { class: "po-item-card-amount" }, Ws = { class: "po-item-card-body" }, Js = { class: "po-item-col po-item-col--left" }, Xs = { class: "po-item-num-row" }, Zs = { class: "po-item-field" }, en = ["value"], tn = { class: "po-item-field" }, sn = ["value"], nn = { class: "po-item-col po-item-col--right" }, ln = { class: "po-item-num-row" }, an = { class: "po-item-field" }, on = ["value"], dn = { class: "po-item-field" }, rn = ["value"], un = { class: "po-item-field" }, cn = ["value"], pn = { style: { display: "flex", "flex-direction": "column", "align-items": "flex-end", gap: "4px", padding: "10px 4px 12px", "font-size": "13px" } }, vn = { class: "mono" }, mn = { class: "mono" }, _n = { style: { "font-size": "14px" } }, fn = { class: "mono" }, B = "background:#f3f4f6;color:#374151", yn = {
  __name: "QuotationView",
  props: {
    open: { type: Boolean, default: !1 },
    quotation: { type: String, default: "" },
    supplierName: { type: String, default: "" }
  },
  emits: ["close"],
  setup(N, { emit: k }) {
    const M = N, P = k, O = w(!1), V = w(""), $ = w(null);
    function L(x) {
      return x.rate != null && x.rate !== "" && C(x.rate) > 0;
    }
    function Q(x) {
      return Number(x || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    async function U() {
      O.value = !0, V.value = "", $.value = null;
      try {
        $.value = await me("Supplier Quotation", M.quotation);
      } catch (x) {
        V.value = x.message || "Could not load the quotation";
      }
      O.value = !1;
    }
    Fe(() => M.open, (x) => {
      x && M.quotation && U();
    }, { immediate: !0 });
    function c() {
      P("close");
    }
    return (x, v) => N.open ? (o(), r("div", {
      key: 0,
      class: "inv-drawer-bg",
      onClick: F(c, ["self"])
    }, [
      e("div", $s, [
        e("div", ws, [
          e("div", xs, [
            v[0] || (v[0] = e("div", { class: "inv-dh-title" }, "Quoted Prices", -1)),
            e("span", Cs, l(N.supplierName || $.value && $.value.supplier_name || "") + " · " + l(N.quotation), 1)
          ]),
          e("button", {
            class: "inv-dclose",
            onClick: c
          }, [
            e("span", {
              innerHTML: y(q)("x", 16)
            }, null, 8, Ss)
          ])
        ]),
        e("div", Rs, [
          e("div", Ts, [
            O.value ? (o(), r("div", Ms, [...v[1] || (v[1] = [
              e("div", {
                class: "shimmer",
                style: { height: "12px" }
              }, null, -1)
            ])])) : V.value ? (o(), r("div", Ls, l(V.value), 1)) : $.value ? (o(), r(S, { key: 2 }, [
              e("div", Qs, l($.value.name) + " (revision " + l($.value.revision_no || 0) + ") · " + l($.value.status), 1),
              e("div", Hs, [
                v[6] || (v[6] = e("div", { class: "add-card-header" }, [
                  e("div", { class: "add-card-title" }, "Quotation Details")
                ], -1)),
                e("div", Vs, [
                  e("div", Es, [
                    e("div", null, [
                      v[2] || (v[2] = e("label", { class: "inv-lbl" }, "Quotation Date", -1)),
                      e("input", {
                        class: "inv-fi",
                        value: $.value.quotation_date || "—",
                        readonly: "",
                        tabindex: "-1",
                        style: B
                      }, null, 8, Ds)
                    ]),
                    e("div", null, [
                      v[3] || (v[3] = e("label", { class: "inv-lbl" }, "Delivery (days)", -1)),
                      e("input", {
                        class: "inv-fi",
                        value: $.value.delivery_days ?? "—",
                        readonly: "",
                        tabindex: "-1",
                        style: B
                      }, null, 8, As)
                    ]),
                    e("div", null, [
                      v[4] || (v[4] = e("label", { class: "inv-lbl" }, "Payment Terms", -1)),
                      e("input", {
                        class: "inv-fi",
                        value: $.value.payment_terms || "—",
                        readonly: "",
                        tabindex: "-1",
                        style: B
                      }, null, 8, Ns)
                    ]),
                    e("div", js, [
                      v[5] || (v[5] = e("label", { class: "inv-lbl" }, "Remarks", -1)),
                      e("textarea", {
                        class: "inv-fi",
                        value: $.value.remarks || "",
                        rows: "2",
                        readonly: "",
                        tabindex: "-1",
                        placeholder: "—",
                        style: ot(B + ";resize:none")
                      }, null, 12, Fs)
                    ])
                  ])
                ])
              ]),
              e("div", Us, [
                v[14] || (v[14] = e("div", { class: "add-card-header" }, [
                  e("div", { class: "add-card-title" }, [
                    f(" Items "),
                    e("span", { style: { "font-size": "11.5px", color: "#6b7280", "font-weight": "400", "letter-spacing": "0", "text-transform": "none" } }, " · rates in KES, before VAT")
                  ])
                ], -1)),
                e("div", Ps, [
                  e("div", Os, [
                    (o(!0), r(S, null, A($.value.items || [], (h, R) => (o(), r("div", {
                      key: h.name || R,
                      class: "po-item-card"
                    }, [
                      e("div", Is, [
                        e("span", zs, "#" + l(R + 1), 1),
                        e("span", Bs, l(h.item_name || h.item_code), 1),
                        e("div", Ks, [
                          e("span", Gs, l(L(h) ? "TOTAL INCL. VAT" : ""), 1),
                          e("span", Ys, l(L(h) ? Q(y(C)(h.amount) + y(C)(h.tax_amount)) : "Not quoted"), 1)
                        ])
                      ]),
                      e("div", Ws, [
                        e("div", Js, [
                          e("div", Xs, [
                            e("div", Zs, [
                              v[7] || (v[7] = e("label", null, "Qty", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: h.qty,
                                readonly: "",
                                tabindex: "-1",
                                style: B
                              }, null, 8, en)
                            ]),
                            e("div", tn, [
                              v[8] || (v[8] = e("label", null, "UOM", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: h.uom || "—",
                                readonly: "",
                                tabindex: "-1",
                                style: B
                              }, null, 8, sn)
                            ])
                          ])
                        ]),
                        e("div", nn, [
                          e("div", ln, [
                            e("div", an, [
                              e("label", null, "Rate (KES per " + l(h.uom || "unit") + ")", 1),
                              e("input", {
                                class: "inv-fi",
                                value: L(h) ? h.rate : "",
                                placeholder: "Not quoted",
                                readonly: "",
                                tabindex: "-1",
                                style: B
                              }, null, 8, on)
                            ]),
                            e("div", dn, [
                              v[9] || (v[9] = e("label", null, "Discount %", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: h.discount_percent || 0,
                                readonly: "",
                                tabindex: "-1",
                                style: B
                              }, null, 8, rn)
                            ]),
                            e("div", un, [
                              v[10] || (v[10] = e("label", null, "VAT %", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: h.vat_percent || 0,
                                readonly: "",
                                tabindex: "-1",
                                style: B
                              }, null, 8, cn)
                            ])
                          ])
                        ])
                      ])
                    ]))), 128))
                  ]),
                  e("div", pn, [
                    e("div", null, [
                      v[11] || (v[11] = f("Net total: ", -1)),
                      e("strong", vn, l(Q($.value.net_total)), 1)
                    ]),
                    e("div", null, [
                      v[12] || (v[12] = f("VAT: ", -1)),
                      e("strong", mn, l(Q($.value.total_tax)), 1)
                    ]),
                    e("div", _n, [
                      v[13] || (v[13] = f("Grand total: ", -1)),
                      e("strong", fn, "KES " + l(Q($.value.grand_total)), 1)
                    ])
                  ])
                ])
              ])
            ], 64)) : b("", !0)
          ])
        ]),
        e("div", { class: "inv-dfooter" }, [
          v[15] || (v[15] = e("div", { class: "add-footer-status" }, "View only", -1)),
          e("div", { class: "add-footer-actions" }, [
            e("button", {
              class: "add-btn-cancel",
              onClick: c
            }, "Close")
          ])
        ])
      ])
    ])) : b("", !0);
  }
}, bn = { class: "list-page" }, hn = { class: "sales-toolbar" }, gn = { class: "sales-search" }, qn = ["innerHTML"], kn = { class: "sales-pills" }, $n = ["onClick"], wn = {
  key: 0,
  class: "sales-pill-count"
}, xn = { style: { "margin-left": "auto", display: "flex", gap: "6px" } }, Cn = ["value"], Sn = ["innerHTML"], Rn = ["disabled"], Tn = ["innerHTML"], Mn = { class: "rfq-kpis" }, Ln = ["title", "onClick", "onKeydown"], Qn = ["innerHTML"], Hn = { class: "rfq-kpi-label" }, Vn = { class: "rfq-kpi-value" }, En = { class: "rfq-kpi-sub" }, Dn = { class: "rfq-mr-note" }, An = ["innerHTML"], Nn = { class: "inv-table-wrap" }, jn = { class: "inv-table" }, Fn = { key: 1 }, Un = {
  colspan: "7",
  class: "bk-empty-state"
}, Pn = { class: "bk-empty-inner" }, On = { class: "bk-empty-title" }, In = {
  key: 0,
  class: "bk-empty-sub"
}, zn = ["onClick"], Bn = { class: "mono-sm" }, Kn = { class: "c-muted" }, Gn = { class: "c-muted" }, Yn = { class: "c-muted" }, Wn = { class: "pr-actions-row" }, Jn = ["onClick"], Xn = ["innerHTML"], Zn = ["onClick"], el = ["innerHTML"], tl = {
  key: 0,
  style: { padding: "12px 0 4px" }
}, sl = { class: "inv-drawer-panel inv-view-page pr-view-drawer" }, nl = { class: "inv-view-header" }, ll = { class: "inv-view-number" }, al = { class: "inv-view-subtitle" }, il = { class: "rfq-hdr-right" }, ol = { class: "rfq-hdr-actions" }, dl = ["disabled", "title"], rl = ["innerHTML"], ul = ["innerHTML"], cl = ["disabled", "title"], pl = ["innerHTML"], vl = ["innerHTML"], ml = { class: "inv-dbody" }, _l = { class: "pr-view-card" }, fl = { class: "pr-info-grid" }, yl = { class: "pr-info-item" }, bl = { class: "pr-info-val pr-info-link" }, hl = { class: "pr-info-item" }, gl = { class: "pr-info-item" }, ql = { class: "pr-info-val" }, kl = { class: "pr-info-item" }, $l = { class: "pr-info-val" }, wl = { class: "pr-info-item" }, xl = {
  key: 0,
  class: "pr-info-item pr-info-full"
}, Cl = {
  class: "pr-info-val",
  style: { color: "#6b7280" }
}, Sl = { class: "pr-view-card" }, Rl = { class: "pr-view-card-hdr" }, Tl = { class: "pr-item-count" }, Ml = { class: "inv-table pr-items-tbl" }, Ll = {
  key: 0,
  style: { width: "190px" }
}, Ql = { class: "pr-row-num" }, Hl = { style: { "font-weight": "500", color: "#111827" } }, Vl = { class: "c-muted" }, El = {
  key: 0,
  style: { "font-size": "11px", color: "#C92A2A", "margin-top": "3px" }
}, Dl = { class: "c-muted mono-sm" }, Al = {
  class: "mono-sm",
  style: { color: "#111827" }
}, Nl = { class: "c-muted mono-sm" }, jl = {
  key: 1,
  class: "c-muted"
}, Fl = { class: "pr-actions-row" }, Ul = ["onClick"], Pl = ["innerHTML"], Ol = ["onClick"], Il = ["onClick"], zl = ["onClick"], Bl = { key: 0 }, Kl = ["colspan"], Gl = {
  key: 0,
  class: "pr-info-val",
  style: { padding: "10px 14px", color: "#b45309", "font-size": "12.5px" }
}, Yl = { class: "pr-view-card" }, Wl = { class: "pr-view-card-hdr" }, Jl = { class: "pr-item-count" }, Xl = { class: "inv-table pr-items-tbl" }, Zl = { class: "pr-row-num" }, ea = { style: { "font-weight": "500", color: "#111827" } }, ta = { class: "ta-r mono" }, sa = { class: "c-muted" }, na = {
  key: 0,
  class: "inv-view-footer"
}, la = { class: "inv-dh" }, aa = { style: { display: "flex", "align-items": "center", gap: "10px", "flex-wrap": "wrap" } }, ia = { class: "inv-dh-title" }, oa = {
  key: 0,
  class: "add-status-badge"
}, da = {
  key: 1,
  class: "inv-dh-sub",
  style: { "margin-left": "4px" }
}, ra = ["innerHTML"], ua = { class: "inv-content-row" }, ca = { class: "inv-dbody" }, pa = { class: "add-card" }, va = { class: "add-card-title" }, ma = { class: "add-card-title-icon" }, _a = ["innerHTML"], fa = { class: "inv-fg inv-fg2" }, ya = { style: { "grid-column": "1/-1" } }, ba = ["value"], ha = ["value"], ga = { style: { "grid-column": "1/-1" } }, qa = { class: "add-card" }, ka = { class: "add-card-title" }, $a = { class: "add-card-title-icon" }, wa = ["innerHTML"], xa = { style: { "font-size": "11.5px", color: "#6b7280", "font-weight": "400", "letter-spacing": "0", "text-transform": "none" } }, Ca = {
  key: 0,
  class: "exp-field-hint",
  style: { "margin-bottom": "8px" }
}, Sa = { class: "po-item-cards" }, Ra = { class: "po-item-card-header" }, Ta = { class: "po-item-card-num" }, Ma = { class: "po-item-card-title" }, La = { class: "po-item-card-subtotal" }, Qa = { class: "po-item-card-amount" }, Ha = ["onClick"], Va = ["innerHTML"], Ea = {
  class: "po-item-card-body",
  style: { "grid-template-columns": "1fr" }
}, Da = { class: "po-item-col po-item-col--right" }, Aa = { class: "po-item-num-row" }, Na = { class: "po-item-field" }, ja = ["onUpdate:modelValue", "max"], Fa = {
  key: 0,
  class: "exp-field-hint"
}, Ua = { class: "po-item-field" }, Pa = ["value"], Oa = {
  key: 1,
  class: "pr-items-empty",
  style: { padding: "20px 0 8px" }
}, Ia = { class: "add-card" }, za = { class: "add-card-title" }, Ba = { class: "add-card-title-icon" }, Ka = ["innerHTML"], Ga = { style: { "font-size": "11.5px", color: "#6b7280", "font-weight": "400", "letter-spacing": "0", "text-transform": "none" } }, Ya = ["innerHTML"], Wa = { class: "po-item-cards" }, Ja = { class: "po-item-card-header" }, Xa = { class: "po-item-card-num" }, Za = { class: "po-item-card-title" }, ei = ["onClick"], ti = ["innerHTML"], si = { class: "po-item-card-body" }, ni = { class: "po-item-col po-item-col--left" }, li = { class: "po-item-field" }, ai = { class: "po-item-col po-item-col--right" }, ii = { class: "po-item-field" }, oi = ["onUpdate:modelValue"], di = {
  key: 0,
  class: "pr-items-empty",
  style: { padding: "20px 0 8px" }
}, ri = { class: "inv-dfooter" }, ui = { class: "add-footer-status" }, ci = { class: "add-footer-actions" }, pi = ["disabled", "title"], vi = ["disabled"], mi = ["innerHTML"], _i = ["disabled"], fi = ["innerHTML"], ie = "psd_books.api.rfq.", yi = "psd_books.api.supplier_quotation.", bi = {
  __name: "RequestForQuotation",
  setup(N) {
    const { toast: k } = je(), { confirm: M } = bt(), P = vt(), O = mt(), V = { module: "bills", action: "write" }, { isAdmin: $, flags: L } = gt(), Q = X(() => {
      var n, t;
      return $.value || !!((t = (n = L.value.doc_access) == null ? void 0 : n["Request for Quotation"]) != null && t.create);
    }), U = [{ k: "all", l: "All" }, { k: "Draft", l: "Draft" }, { k: "Sent", l: "Sent" }, { k: "Cancelled", l: "Cancelled" }], c = w([]), x = w(!1), v = w(""), h = w("all"), R = w("all"), ne = [{ k: "all", l: "All Time" }, { k: "month", l: "This Month" }, { k: "quarter", l: "This Quarter" }, { k: "year", l: "This Year" }];
    function Z(n) {
      if (R.value === "all") return !0;
      const t = String(n.posting_date || "").slice(0, 10);
      if (!t) return !1;
      const d = /* @__PURE__ */ new Date(), s = String(d.getFullYear()), g = d.getMonth(), _ = Number(t.slice(5, 7)) - 1;
      if (R.value === "year") return t.slice(0, 4) === s;
      if (R.value === "month") return t.slice(0, 4) === s && _ === g;
      const ce = Math.floor(g / 3) * 3;
      return t.slice(0, 4) === s && _ >= ce && _ < ce + 3;
    }
    const K = w(!1), u = w(null), j = w(!1), I = w(!1), G = w(!1), i = w(""), a = w([]), m = w({}), E = (n) => n ? m.value[n] || n : "", Y = w([]), z = oe({ details: !1, items: !1, suppliers: !1 });
    let re = 1;
    const ke = () => ({
      material_request: "",
      entry_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      posting_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      respond_by: "",
      project: "",
      delivery_warehouse: "",
      message: "",
      status: "Draft",
      items: [],
      suppliers: []
    }), p = oe(ke()), $e = X(() => !!i.value && p.status === "Sent"), Pe = X(() => ({
      Draft: c.value.filter((n) => n.status === "Draft").length,
      Sent: c.value.filter((n) => n.status === "Sent").length,
      Cancelled: c.value.filter((n) => n.status === "Cancelled").length
    })), Oe = X(() => {
      const n = c.value, t = (d) => n.filter((s) => s.status === d).length;
      return [
        { key: "total", label: "TOTAL RFQs", value: n.length, sub: "All requests", icon: "file", tab: "all" },
        { key: "active", label: "ACTIVE RFQs", value: n.length - t("Cancelled"), sub: "Draft, Sent & In Progress", icon: "activity", tab: "active" },
        { key: "sent", label: "SENT", value: t("Sent"), sub: "RFQs sent to suppliers", icon: "check", tab: "Sent" },
        { key: "cancelled", label: "CANCELLED", value: t("Cancelled"), sub: "Cancelled RFQs", icon: "cancel", tab: "Cancelled" }
      ];
    });
    function Ie() {
      const n = ["RFQ #", "Material Request", "Project", "Date", "Respond By", "Status"], t = ee.value.map((_) => [_.name, _.material_request || "", _.project || "", _.posting_date || "", _.respond_by || "", le(_)]), d = [n, ...t].map((_) => _.map((ce) => `"${String(ce ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), s = URL.createObjectURL(new Blob([d], { type: "text/csv;charset=utf-8;" })), g = document.createElement("a");
      g.href = s, g.download = "requests_for_quotation.csv", g.click(), URL.revokeObjectURL(s);
    }
    const ee = X(() => {
      let n = c.value;
      h.value === "active" ? n = n.filter((d) => d.status !== "Cancelled") : h.value !== "all" && (n = n.filter((d) => d.status === h.value)), R.value !== "all" && (n = n.filter(Z));
      const t = v.value.trim().toLowerCase();
      return t && (n = n.filter((d) => [d.name, d.material_request, d.project, E(d.project)].some((s) => (s || "").toLowerCase().includes(t)))), n;
    }), { page: _e, pageSize: fe, paged: ze } = $t(ee, { storageKey: "rfqs" }), ye = w({});
    function le(n) {
      if (!n) return "";
      const t = ye.value[n.name];
      return n.status === "Sent" && t && t.quoted ? `${t.quoted} of ${Math.max(t.total, t.quoted)} quoted` : n.status;
    }
    function we(n) {
      return n === "Cancelled" ? "b-badge-muted" : n === "Sent" || / quoted$/.test(n || "") ? "b-badge-blue" : "b-badge-orange";
    }
    function xe(n) {
      return n === "Sent" ? "b-badge-green" : n === "Failed" ? "b-badge-red" : "b-badge-orange";
    }
    function Ce(n) {
      return (n.suppliers || []).filter((t) => t.send_status === "Sent").length;
    }
    function Be(n) {
      return n && n.status !== "Cancelled" && (n.suppliers || []).some((t) => t.send_status !== "Sent");
    }
    function Ke(n) {
      return Ce(n) ? "Send to Remaining" : "Send to Suppliers";
    }
    async function te() {
      x.value = !0;
      try {
        c.value = await de("Request for Quotation", {
          fields: ["name", "material_request", "project", "posting_date", "respond_by", "status", "modified"],
          limit: 1e5,
          order: "modified desc"
        }) || [];
      } catch (n) {
        k.error(n.message || "Could not load Requests for Quotation"), c.value = [];
      }
      try {
        const n = await de("Project", { fields: ["name", "project_name"], limit: 1e3 });
        m.value = Object.fromEntries((n || []).map((t) => [t.name, t.project_name]));
      } catch {
        m.value = {};
      }
      try {
        const n = await ve("psd_books.api.rfq.get_rfq_progress");
        ye.value = n && n.progress || {};
      } catch {
        ye.value = {};
      }
      x.value = !1;
    }
    async function be(n) {
      K.value = !0, u.value = null;
      try {
        u.value = await me("Request for Quotation", n.name);
      } catch (t) {
        k.error(t.message || "Failed to load"), K.value = !1;
      }
    }
    async function ue() {
      u.value && (u.value = await me("Request for Quotation", u.value.name));
    }
    async function Se(n = "") {
      try {
        const t = [
          ["docstatus", "=", 1],
          ["material_request_type", "in", ["Purchase", "Asset"]],
          ["status", "in", ["Approved", "Partly Issued"]]
        ];
        n && t.push(["name", "like", `%${n}%`]);
        const d = await de("Material Request", {
          fields: ["name", "project", "posting_date"],
          filters: t,
          limit: 30,
          order: "modified desc"
        });
        a.value = (d || []).map((s) => ({ value: s.name, label: [s.name, s.project].filter(Boolean).join("  •  ") }));
      } catch {
        a.value = [];
      }
    }
    async function he(n = "") {
      try {
        const t = [["disabled", "=", 0]];
        n && t.push(["supplier_name", "like", `%${n}%`]);
        const d = await de("Supplier", {
          fields: ["name", "supplier_name", "email_id"],
          filters: t,
          limit: 30,
          order: "supplier_name asc"
        });
        Y.value = (d || []).map((s) => ({
          value: s.name,
          label: s.supplier_name || s.name,
          supplier_name: s.supplier_name || s.name,
          email_id: s.email_id || ""
        }));
      } catch {
        Y.value = [];
      }
    }
    function Ge(n, t) {
      const d = t && typeof t == "object" ? t : Y.value.find((s) => s.value === t);
      d && (n.supplier = d.value, n.supplier_name = d.supplier_name || d.label || d.value, n.email_id = d.email_id || "");
    }
    function Re() {
      Object.assign(p, ke()), i.value = "";
    }
    function Te(n) {
      Object.assign(p, {
        material_request: n.material_request,
        project: n.project || "",
        delivery_warehouse: n.delivery_warehouse || "",
        posting_date: n.posting_date || p.posting_date,
        entry_date: n.entry_date || p.entry_date,
        respond_by: n.respond_by || ""
      }), p.items = (n.items || []).map((t) => ({
        _id: re++,
        mrn_item: t.mrn_item,
        item_code: t.item_code,
        item_name: t.item_name || t.item_code,
        uom: t.uom || "",
        qty: C(t.qty),
        pending_qty: C(t.qty),
        intended_use: t.intended_use || ""
      }));
    }
    async function Ye(n) {
      const t = n && n.value || n;
      if (!(!t || i.value))
        try {
          Te(await ve(ie + "get_rfq_prefill", { mrn: t }));
        } catch (d) {
          k.error(d.message), p.material_request = "", p.items = [];
        }
    }
    async function We(n) {
      if (Re(), he(""), Se(""), j.value = !0, n)
        try {
          Te(await ve(ie + "get_rfq_prefill", { mrn: n })), a.value.some((t) => t.value === n) || a.value.push({ value: n, label: n });
        } catch (t) {
          k.error(t.message), j.value = !1;
        }
    }
    async function Me(n) {
      Re(), he("");
      try {
        const t = await me("Request for Quotation", n.name);
        i.value = t.name, Object.assign(p, {
          material_request: t.material_request,
          project: t.project || "",
          delivery_warehouse: t.delivery_warehouse || "",
          posting_date: t.posting_date,
          entry_date: t.entry_date || t.posting_date,
          respond_by: t.respond_by || "",
          message: t.message || "",
          status: t.status
        }), a.value = [{ value: t.material_request, label: t.material_request }], p.items = (t.items || []).map((d) => ({
          _id: re++,
          name: d.name,
          mrn_item: d.mrn_item,
          item_code: d.item_code,
          item_name: d.item_name,
          uom: d.uom || "",
          qty: C(d.qty),
          pending_qty: null,
          intended_use: d.intended_use || ""
        })), p.suppliers = (t.suppliers || []).map((d) => ({
          _id: re++,
          name: d.name,
          supplier: d.supplier,
          supplier_name: d.supplier_name,
          email_id: d.email_id || "",
          send_status: d.send_status,
          sent_on: d.sent_on,
          send_error: d.send_error
        })), j.value = !0;
      } catch (t) {
        k.error(t.message || "Failed to load");
      }
    }
    function Je(n) {
      p.items.splice(n, 1);
    }
    function Xe() {
      p.suppliers.push({ _id: re++, supplier: "", supplier_name: "", email_id: "", send_status: "Pending" });
    }
    function Ze(n) {
      p.suppliers.splice(n, 1);
    }
    function et() {
      if (!p.material_request) return "Select the Material Request";
      if (!p.entry_date) return "Entry Date is required";
      if (!p.items.length) return "Add at least one item";
      for (const t of p.items) {
        if (!(C(t.qty) > 0)) return `Qty must be greater than zero for ${t.item_code}`;
        if (t.pending_qty != null && C(t.qty) > C(t.pending_qty) + 1e-4)
          return `${t.item_code}: only ${t.pending_qty} pending on the MRN`;
      }
      const n = /* @__PURE__ */ new Set();
      for (const t of p.suppliers) {
        if (!t.supplier) return "Select a supplier on every supplier row";
        if (n.has(t.supplier)) return `Supplier ${t.supplier_name || t.supplier} is listed twice`;
        n.add(t.supplier);
      }
      return "";
    }
    async function Le(n) {
      const t = et();
      if (t) return k.error(t);
      if (n) {
        if (p.suppliers.length < 1) return k.error("Add at least 1 supplier before sending");
        const d = p.suppliers.filter((s) => !(s.email_id || "").trim()).map((s) => s.supplier_name || s.supplier);
        if (d.length) return k.error("No email address for: " + d.join(", "));
      }
      I.value = !0;
      try {
        const d = {
          doctype: "Request for Quotation",
          company: await ft(),
          material_request: p.material_request,
          posting_date: p.posting_date,
          entry_date: p.entry_date,
          respond_by: p.respond_by || null,
          message: p.message || "",
          items: p.items.map((_) => ({
            doctype: "Request for Quotation Item",
            ..._.name ? { name: _.name } : {},
            mrn_item: _.mrn_item,
            item_code: _.item_code,
            item_name: _.item_name,
            qty: C(_.qty),
            uom: _.uom || "",
            intended_use: _.intended_use || ""
          })),
          suppliers: p.suppliers.map((_) => ({
            doctype: "Request for Quotation Supplier",
            ..._.name ? { name: _.name } : {},
            supplier: _.supplier,
            supplier_name: _.supplier_name,
            email_id: (_.email_id || "").trim()
          }))
        };
        i.value && (d.name = i.value);
        const s = await yt(d), g = (s == null ? void 0 : s.name) || i.value;
        n ? await Ve(g) : k.success(`RFQ ${g} saved`), j.value = !1, await te();
      } catch (d) {
        k.error(d.message || "Failed to save");
      }
      I.value = !1;
    }
    const J = oe({ open: !1, rfq: "", supplier: "", supplier_name: "" }), ae = oe({ open: !1, name: "", supplier_name: "" });
    function ge(n, t) {
      return !!n && (Qe(n) && !!t || (n.suppliers || []).some((d) => d.quotation));
    }
    function tt(n) {
      Object.assign(ae, { open: !0, name: n.quotation, supplier_name: n.supplier_name || n.supplier });
    }
    function Qe(n) {
      return !!n && n.status === "Sent";
    }
    function He(n) {
      u.value && Object.assign(J, { open: !0, rfq: u.value.name, supplier: n.supplier, supplier_name: n.supplier_name || n.supplier });
    }
    async function st() {
      J.open = !1;
      try {
        await ue();
      } catch {
      }
    }
    async function nt(n) {
      if (!(!n.quotation || !await M({
        title: "Cancel quotation?",
        body: `${n.quotation} from ${n.supplier_name || n.supplier} will be cancelled. You can enter a new quotation for this supplier afterwards.`,
        okLabel: "Cancel Quotation",
        cancelLabel: "Keep",
        okStyle: "danger"
      })))
        try {
          await se(yi + "cancel_quotation", { name: n.quotation }, V), k.success(`Quotation ${n.quotation} cancelled`), await ue();
        } catch (d) {
          k.error(d.message || "Cancel failed");
        }
    }
    async function Ve(n) {
      const t = await se(ie + "send_rfq", { name: n }, V), d = (t.sent || []).length, s = (t.failed || []).length;
      return s ? k.error(`${d} sent, ${s} failed. Check the supplier list and send again to retry.`) : k.success(`RFQ ${n} sent to ${d} supplier${d !== 1 ? "s" : ""}`), t;
    }
    async function lt() {
      if (u.value) {
        G.value = !0;
        try {
          await Ve(u.value.name);
        } catch (n) {
          k.error(n.message || "Send failed");
        }
        try {
          await ue(), await te();
        } catch {
        }
        G.value = !1;
      }
    }
    async function at() {
      if (!(!u.value || !await M({
        title: "Cancel Request for Quotation?",
        body: `${u.value.name} will be cancelled and can no longer be edited or sent.`,
        okLabel: "Cancel RFQ",
        okStyle: "danger"
      })))
        try {
          await se(ie + "cancel_rfq", { name: u.value.name }, V), k.success("Request for Quotation cancelled"), await ue(), await te();
        } catch (t) {
          k.error(t.message || "Cancel failed");
        }
    }
    async function it() {
      if (!i.value) {
        j.value = !1;
        return;
      }
      const n = i.value;
      if (await M({
        title: "Cancel Request for Quotation?",
        body: `${n} will be cancelled and can no longer be edited or sent.`,
        okLabel: "Cancel RFQ",
        okStyle: "danger"
      }))
        try {
          await se(ie + "cancel_rfq", { name: n }, V), k.success("Request for Quotation cancelled"), j.value = !1, await te();
        } catch (d) {
          k.error(d.message || "Cancel failed");
        }
    }
    return rt(async () => {
      if (await te(), qt({
        route: P,
        openByName: (n) => be(c.value.find((t) => t.name === n) || { name: n })
      }), P.query.new_from_mrn) {
        const n = String(P.query.new_from_mrn);
        O.replace({ path: P.path, query: {} }), await We(n);
      }
    }), (n, t) => {
      const d = _t("router-link");
      return o(), r("div", bn, [
        e("div", hn, [
          e("div", gn, [
            e("span", {
              innerHTML: y(q)("search", 13),
              style: { color: "#9ca3af", "flex-shrink": "0" }
            }, null, 8, qn),
            T(e("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (s) => v.value = s),
              placeholder: "Search RFQ, MRN, project…",
              class: "sales-search-input"
            }, null, 512), [
              [H, v.value]
            ])
          ]),
          e("div", kn, [
            (o(), r(S, null, A(U, (s) => e("button", {
              key: s.k,
              class: D(["sales-pill", { active: h.value === s.k }]),
              onClick: (g) => h.value = s.k
            }, [
              f(l(s.l) + " ", 1),
              s.k !== "all" ? (o(), r("span", wn, l(Pe.value[s.k]), 1)) : b("", !0)
            ], 10, $n)), 64))
          ]),
          e("div", xn, [
            T(e("select", {
              "onUpdate:modelValue": t[1] || (t[1] = (s) => R.value = s),
              class: "sales-select",
              title: "Filter by date"
            }, [
              (o(), r(S, null, A(ne, (s) => e("option", {
                key: s.k,
                value: s.k
              }, l(s.l), 9, Cn)), 64))
            ], 512), [
              [Ue, R.value]
            ]),
            e("button", {
              class: "sales-btn-ghost",
              onClick: te,
              title: "Refresh"
            }, [
              e("span", {
                innerHTML: y(q)("refresh", 13)
              }, null, 8, Sn)
            ]),
            e("button", {
              class: "sales-btn-ghost",
              onClick: Ie,
              title: "Export CSV",
              disabled: !ee.value.length
            }, [
              e("span", {
                innerHTML: y(q)("download", 13)
              }, null, 8, Tn),
              t[24] || (t[24] = f(" CSV", -1))
            ], 8, Rn)
          ])
        ]),
        e("div", Mn, [
          (o(!0), r(S, null, A(Oe.value, (s) => (o(), r("div", {
            key: s.key,
            class: D(["rfq-kpi rfq-kpi-click", ["rfq-kpi-" + s.key, { "rfq-kpi-on": h.value === s.tab }]]),
            role: "button",
            tabindex: "0",
            title: "Show " + s.label.toLowerCase(),
            onClick: (g) => h.value = s.tab,
            onKeydown: ht((g) => h.value = s.tab, ["enter"])
          }, [
            e("div", {
              class: "rfq-kpi-icon",
              innerHTML: y(q)(s.icon, 20)
            }, null, 8, Qn),
            e("div", null, [
              e("div", Hn, l(s.label), 1),
              e("div", Vn, l(s.value), 1),
              e("div", En, l(s.sub), 1)
            ])
          ], 42, Ln))), 128))
        ]),
        e("div", Dn, [
          e("span", {
            innerHTML: y(q)("file", 14)
          }, null, 8, An),
          t[26] || (t[26] = e("span", null, [
            f("Requests for Quotation can only be created through a "),
            e("b", null, "Material Request"),
            f(". ")
          ], -1)),
          W(d, {
            to: "/manufacturing/material-request",
            class: "rfq-mr-link"
          }, {
            default: ut(() => [...t[25] || (t[25] = [
              f("Go to Material Requests →", -1)
            ])]),
            _: 1
          })
        ]),
        e("div", Nn, [
          e("table", jn, [
            t[28] || (t[28] = e("thead", null, [
              e("tr", null, [
                e("th", null, "RFQ #"),
                e("th", null, "Material Request"),
                e("th", null, "Project"),
                e("th", null, "Date"),
                e("th", null, "Respond By"),
                e("th", null, "Status"),
                e("th", { style: { width: "120px", "text-align": "center" } }, "Actions")
              ])
            ], -1)),
            e("tbody", null, [
              x.value ? (o(), r(S, { key: 0 }, A(5, (s) => e("tr", { key: s }, [...t[27] || (t[27] = [
                e("td", {
                  colspan: "7",
                  style: { padding: "14px" }
                }, [
                  e("div", {
                    class: "shimmer",
                    style: { height: "12px" }
                  })
                ], -1)
              ])])), 64)) : ee.value.length ? (o(!0), r(S, { key: 2 }, A(y(ze), (s) => (o(), r("tr", {
                key: s.name,
                class: "inv-row",
                onClick: (g) => be(s)
              }, [
                e("td", null, [
                  W(Ae, {
                    doctype: "Request for Quotation",
                    name: s.name
                  }, null, 8, ["name"])
                ]),
                e("td", Bn, l(s.material_request || "—"), 1),
                e("td", Kn, l(E(s.project) || "—"), 1),
                e("td", Gn, l(s.posting_date ? y(pe)(s.posting_date) : "—"), 1),
                e("td", Yn, l(s.respond_by ? y(pe)(s.respond_by) : "—"), 1),
                e("td", null, [
                  e("span", {
                    class: D(["inv-status-badge", we(le(s))])
                  }, l(le(s)), 3)
                ]),
                e("td", {
                  onClick: t[2] || (t[2] = F(() => {
                  }, ["stop"]))
                }, [
                  e("div", Wn, [
                    e("button", {
                      class: "inv-act-btn",
                      onClick: F((g) => be(s), ["stop"]),
                      title: "View"
                    }, [
                      e("span", {
                        innerHTML: y(q)("eye", 12)
                      }, null, 8, Xn)
                    ], 8, Jn),
                    s.status !== "Cancelled" && n.$canEdit("bills") ? (o(), r("button", {
                      key: 0,
                      class: "inv-act-btn",
                      onClick: F((g) => Me(s), ["stop"]),
                      title: "Edit"
                    }, [
                      e("span", {
                        innerHTML: y(q)("edit", 12)
                      }, null, 8, el)
                    ], 8, Zn)) : b("", !0)
                  ])
                ])
              ], 8, zn))), 128)) : (o(), r("tr", Fn, [
                e("td", Un, [
                  e("div", Pn, [
                    e("p", On, l(v.value || h.value !== "all" || R.value !== "all" ? "No results match your filters" : "No quotation requests yet"), 1),
                    !v.value && h.value === "all" ? (o(), r("p", In, "Open an Approved Material Request and click Create RFQ.")) : b("", !0)
                  ])
                ])
              ]))
            ])
          ])
        ]),
        !x.value && ee.value.length ? (o(), r("div", tl, [
          W(kt, {
            page: y(_e),
            "onUpdate:page": t[3] || (t[3] = (s) => Ee(_e) ? _e.value = s : null),
            "page-size": y(fe),
            "onUpdate:pageSize": t[4] || (t[4] = (s) => Ee(fe) ? fe.value = s : null),
            "total-items": ee.value.length
          }, null, 8, ["page", "page-size", "total-items"])
        ])) : b("", !0),
        (o(), ct(pt, { to: "body" }, [
          K.value ? (o(), r("div", {
            key: 0,
            class: "inv-drawer-bg",
            onClick: t[8] || (t[8] = F((s) => K.value = !1, ["self"]))
          }, [
            e("div", sl, [
              u.value ? (o(), r(S, { key: 0 }, [
                e("div", nl, [
                  e("div", null, [
                    e("div", ll, l(u.value.name), 1),
                    e("div", al, [
                      f("Request for Quotation · " + l(u.value.posting_date) + " · ", 1),
                      e("span", {
                        class: D(["inv-hdr-badge", we(le(u.value))])
                      }, l(le(u.value)), 3)
                    ])
                  ]),
                  e("div", il, [
                    e("div", ol, [
                      Be(u.value) ? (o(), r("button", {
                        key: 0,
                        class: "inv-ab-btn inv-ab-primary",
                        disabled: G.value || !n.$canEdit("bills"),
                        title: n.$canEdit("bills") ? "" : "Read-only access",
                        onClick: lt
                      }, [
                        e("span", {
                          innerHTML: y(q)("send", 13)
                        }, null, 8, rl),
                        f(" " + l(G.value ? "Sending…" : Ke(u.value)), 1)
                      ], 8, dl)) : b("", !0),
                      u.value.status !== "Cancelled" && n.$canEdit("bills") ? (o(), r("button", {
                        key: 1,
                        class: "inv-ab-btn",
                        onClick: t[5] || (t[5] = (s) => {
                          Me(u.value), K.value = !1;
                        })
                      }, [
                        e("span", {
                          innerHTML: y(q)("edit", 13)
                        }, null, 8, ul),
                        t[29] || (t[29] = f(" Edit ", -1))
                      ])) : b("", !0),
                      u.value.status !== "Cancelled" ? (o(), r("button", {
                        key: 2,
                        class: "inv-ab-btn pr-act-cancel",
                        disabled: !n.$canEdit("bills"),
                        title: n.$canEdit("bills") ? "" : "Read-only access",
                        onClick: at
                      }, [
                        e("span", {
                          innerHTML: y(q)("x", 13)
                        }, null, 8, pl),
                        t[30] || (t[30] = f(" Cancel RFQ ", -1))
                      ], 8, cl)) : b("", !0)
                    ]),
                    e("button", {
                      class: "inv-dclose",
                      onClick: t[6] || (t[6] = (s) => K.value = !1)
                    }, [
                      e("span", {
                        innerHTML: y(q)("x", 16)
                      }, null, 8, vl)
                    ])
                  ])
                ]),
                e("div", ml, [
                  e("div", _l, [
                    t[37] || (t[37] = e("div", { class: "pr-view-card-hdr" }, "Request Details", -1)),
                    e("div", fl, [
                      e("div", yl, [
                        t[31] || (t[31] = e("div", { class: "pr-info-lbl" }, "Material Request", -1)),
                        e("div", bl, [
                          W(Ae, {
                            doctype: "Material Request",
                            name: u.value.material_request
                          }, null, 8, ["name"])
                        ])
                      ]),
                      e("div", hl, [
                        t[32] || (t[32] = e("div", { class: "pr-info-lbl" }, "Project", -1)),
                        e("div", {
                          class: D(["pr-info-val", { "pr-info-empty": !u.value.project }])
                        }, l(u.value.project || "—"), 3)
                      ]),
                      e("div", gl, [
                        t[33] || (t[33] = e("div", { class: "pr-info-lbl" }, "RFQ Date", -1)),
                        e("div", ql, l(u.value.posting_date || "—"), 1)
                      ]),
                      e("div", kl, [
                        t[34] || (t[34] = e("div", { class: "pr-info-lbl" }, "Respond By", -1)),
                        e("div", $l, l(u.value.respond_by || "—"), 1)
                      ]),
                      e("div", wl, [
                        t[35] || (t[35] = e("div", { class: "pr-info-lbl" }, "Delivery Warehouse", -1)),
                        e("div", {
                          class: D(["pr-info-val", { "pr-info-empty": !u.value.delivery_warehouse }])
                        }, l(u.value.delivery_warehouse || "—"), 3)
                      ]),
                      u.value.message ? (o(), r("div", xl, [
                        t[36] || (t[36] = e("div", { class: "pr-info-lbl" }, "Message to Suppliers", -1)),
                        e("div", Cl, l(u.value.message), 1)
                      ])) : b("", !0)
                    ])
                  ]),
                  e("div", Sl, [
                    e("div", Rl, [
                      t[38] || (t[38] = f(" Suppliers ", -1)),
                      e("span", Tl, l(Ce(u.value)) + " of " + l((u.value.suppliers || []).length) + " sent", 1)
                    ]),
                    e("table", Ml, [
                      e("thead", null, [
                        e("tr", null, [
                          t[39] || (t[39] = e("th", { style: { width: "32px" } }, "#", -1)),
                          t[40] || (t[40] = e("th", null, "Supplier", -1)),
                          t[41] || (t[41] = e("th", null, "Email", -1)),
                          t[42] || (t[42] = e("th", { style: { width: "90px" } }, "Status", -1)),
                          t[43] || (t[43] = e("th", { style: { width: "150px" } }, "Sent On", -1)),
                          t[44] || (t[44] = e("th", { style: { width: "190px" } }, "Quotation", -1)),
                          ge(u.value, n.$canEdit("bills")) ? (o(), r("th", Ll, "Actions")) : b("", !0)
                        ])
                      ]),
                      e("tbody", null, [
                        (o(!0), r(S, null, A(u.value.suppliers || [], (s, g) => (o(), r("tr", {
                          key: s.name || g,
                          class: "inv-row"
                        }, [
                          e("td", Ql, l(g + 1), 1),
                          e("td", Hl, l(s.supplier_name || s.supplier), 1),
                          e("td", Vl, l(s.email_id || "—"), 1),
                          e("td", null, [
                            e("span", {
                              class: D(["inv-status-badge", xe(s.send_status)])
                            }, l(s.send_status || "Pending"), 3),
                            s.send_status === "Failed" && s.send_error ? (o(), r("div", El, l(s.send_error), 1)) : b("", !0)
                          ]),
                          e("td", Dl, l(s.sent_on ? String(s.sent_on).slice(0, 16) : "—"), 1),
                          e("td", null, [
                            s.quotation ? (o(), r(S, { key: 0 }, [
                              e("div", Al, l(s.quotation), 1),
                              e("div", Nl, l(s.quoted_on || ""), 1)
                            ], 64)) : (o(), r("span", jl, "Not quoted"))
                          ]),
                          ge(u.value, n.$canEdit("bills")) ? (o(), r("td", {
                            key: 0,
                            onClick: t[7] || (t[7] = F(() => {
                            }, ["stop"]))
                          }, [
                            e("div", Fl, [
                              s.quotation ? (o(), r("button", {
                                key: 0,
                                class: "inv-act-btn",
                                title: "View quoted prices",
                                onClick: (_) => tt(s)
                              }, [
                                e("span", {
                                  innerHTML: y(q)("eye", 12)
                                }, null, 8, Pl)
                              ], 8, Ul)) : b("", !0),
                              Qe(u.value) && n.$canEdit("bills") ? (o(), r(S, { key: 1 }, [
                                s.quotation ? (o(), r(S, { key: 1 }, [
                                  e("button", {
                                    class: "inv-ab-btn",
                                    onClick: (_) => He(s)
                                  }, "Revise", 8, Il),
                                  e("button", {
                                    class: "inv-ab-btn pr-act-cancel",
                                    onClick: (_) => nt(s)
                                  }, "Cancel", 8, zl)
                                ], 64)) : (o(), r("button", {
                                  key: 0,
                                  class: "inv-ab-btn inv-ab-primary",
                                  onClick: (_) => He(s)
                                }, "Enter Quotation", 8, Ol))
                              ], 64)) : b("", !0)
                            ])
                          ])) : b("", !0)
                        ]))), 128)),
                        (u.value.suppliers || []).length ? b("", !0) : (o(), r("tr", Bl, [
                          e("td", {
                            colspan: ge(u.value, n.$canEdit("bills")) ? 7 : 6,
                            style: { "text-align": "center", padding: "24px", color: "#9ca3af", "font-size": "13px" }
                          }, "No suppliers added", 8, Kl)
                        ]))
                      ])
                    ]),
                    (u.value.suppliers || []).length < 1 && u.value.status !== "Cancelled" ? (o(), r("div", Gl, " At least 1 supplier is needed before this can be sent. ")) : b("", !0)
                  ]),
                  e("div", Yl, [
                    e("div", Wl, [
                      t[45] || (t[45] = f("Items ", -1)),
                      e("span", Jl, l((u.value.items || []).length) + " line" + l((u.value.items || []).length !== 1 ? "s" : ""), 1)
                    ]),
                    e("table", Xl, [
                      t[46] || (t[46] = e("thead", null, [
                        e("tr", null, [
                          e("th", { style: { width: "32px" } }, "#"),
                          e("th", null, "Item"),
                          e("th", {
                            class: "ta-r",
                            style: { width: "80px" }
                          }, "Qty"),
                          e("th", { style: { width: "60px" } }, "UOM")
                        ])
                      ], -1)),
                      e("tbody", null, [
                        (o(!0), r(S, null, A(u.value.items || [], (s, g) => (o(), r("tr", {
                          key: s.name || g,
                          class: "inv-row"
                        }, [
                          e("td", Zl, l(g + 1), 1),
                          e("td", ea, l(s.item_name || s.item_code), 1),
                          e("td", ta, l(s.qty), 1),
                          e("td", sa, l(s.uom || "—"), 1)
                        ]))), 128))
                      ])
                    ])
                  ])
                ]),
                u.value.owner ? (o(), r("div", na, [
                  f(" Created by " + l(y(Ne)(u.value.owner)) + " on " + l(y(pe)(u.value.creation)) + " ", 1),
                  u.value.modified_by ? (o(), r(S, { key: 0 }, [
                    f(" · Last modified by " + l(y(Ne)(u.value.modified_by)) + " on " + l(y(pe)(u.value.modified)), 1)
                  ], 64)) : b("", !0)
                ])) : b("", !0)
              ], 64)) : b("", !0)
            ])
          ])) : b("", !0),
          W(ks, {
            open: J.open,
            rfq: J.rfq,
            supplier: J.supplier,
            "supplier-name": J.supplier_name,
            onClose: t[9] || (t[9] = (s) => J.open = !1),
            onSaved: st
          }, null, 8, ["open", "rfq", "supplier", "supplier-name"]),
          W(yn, {
            open: ae.open,
            quotation: ae.name,
            "supplier-name": ae.supplier_name,
            onClose: t[10] || (t[10] = (s) => ae.open = !1)
          }, null, 8, ["open", "quotation", "supplier-name"]),
          j.value ? (o(), r("div", {
            key: 1,
            class: "inv-drawer-bg",
            onClick: t[23] || (t[23] = F((s) => i.value ? j.value = !1 : null, ["self"]))
          }, [
            e("div", {
              class: D(["inv-drawer-panel", { "is-add": !i.value }])
            }, [
              e("div", la, [
                e("div", aa, [
                  e("div", ia, l(i.value ? "Edit Request for Quotation" : "New Request for Quotation"), 1),
                  i.value ? (o(), r("span", da, l(i.value), 1)) : (o(), r("span", oa, "Draft"))
                ]),
                e("button", {
                  class: "inv-dclose",
                  onClick: t[11] || (t[11] = (s) => j.value = !1)
                }, [
                  e("span", {
                    innerHTML: y(q)("x", 16)
                  }, null, 8, ra)
                ])
              ]),
              e("div", ua, [
                e("div", ca, [
                  e("div", pa, [
                    e("div", {
                      class: "add-card-header",
                      onClick: t[12] || (t[12] = (s) => z.details = !z.details)
                    }, [
                      e("div", va, [
                        e("span", ma, [
                          e("span", {
                            innerHTML: y(q)("file", 16)
                          }, null, 8, _a)
                        ]),
                        t[47] || (t[47] = f(" Request Details", -1))
                      ])
                    ]),
                    e("div", {
                      class: D(["add-card-body", { collapsed: z.details }])
                    }, [
                      e("div", fa, [
                        e("div", ya, [
                          t[48] || (t[48] = e("label", { class: "inv-lbl" }, [
                            f("Material Request (MRN) "),
                            e("span", { class: "inv-req" }, "*")
                          ], -1)),
                          W(De, {
                            modelValue: p.material_request,
                            "onUpdate:modelValue": t[13] || (t[13] = (s) => p.material_request = s),
                            options: a.value,
                            disabled: !!i.value,
                            placeholder: "Select an Approved MRN…",
                            onSearch: Se,
                            onSelect: Ye
                          }, null, 8, ["modelValue", "options", "disabled"]),
                          t[49] || (t[49] = e("div", { class: "exp-field-hint" }, "Only Approved or Partly Issued Purchase requests can have a quotation request.", -1))
                        ]),
                        e("div", null, [
                          t[50] || (t[50] = e("label", { class: "inv-lbl" }, [
                            f("Entry Date "),
                            e("span", { class: "inv-req" }, "*")
                          ], -1)),
                          T(e("input", {
                            class: "inv-fi",
                            type: "date",
                            "onUpdate:modelValue": t[14] || (t[14] = (s) => p.entry_date = s)
                          }, null, 512), [
                            [H, p.entry_date]
                          ])
                        ]),
                        e("div", null, [
                          t[51] || (t[51] = e("label", { class: "inv-lbl" }, [
                            f("RFQ Date "),
                            e("span", { class: "inv-req" }, "*")
                          ], -1)),
                          T(e("input", {
                            class: "inv-fi",
                            type: "date",
                            "onUpdate:modelValue": t[15] || (t[15] = (s) => p.posting_date = s)
                          }, null, 512), [
                            [H, p.posting_date]
                          ])
                        ]),
                        e("div", null, [
                          t[52] || (t[52] = e("label", { class: "inv-lbl" }, "Respond By", -1)),
                          T(e("input", {
                            class: "inv-fi",
                            type: "date",
                            "onUpdate:modelValue": t[16] || (t[16] = (s) => p.respond_by = s)
                          }, null, 512), [
                            [H, p.respond_by]
                          ])
                        ]),
                        e("div", null, [
                          t[53] || (t[53] = e("label", { class: "inv-lbl" }, "Project", -1)),
                          e("input", {
                            class: "inv-fi",
                            value: p.project || "—",
                            readonly: "",
                            tabindex: "-1",
                            style: { background: "#f3f4f6", color: "#6b7280" }
                          }, null, 8, ba)
                        ]),
                        e("div", null, [
                          t[54] || (t[54] = e("label", { class: "inv-lbl" }, "Delivery Warehouse", -1)),
                          e("input", {
                            class: "inv-fi",
                            value: p.delivery_warehouse || "—",
                            readonly: "",
                            tabindex: "-1",
                            style: { background: "#f3f4f6", color: "#6b7280" }
                          }, null, 8, ha)
                        ]),
                        e("div", ga, [
                          t[55] || (t[55] = e("label", { class: "inv-lbl" }, "Message to Suppliers", -1)),
                          T(e("textarea", {
                            class: "inv-fi",
                            "onUpdate:modelValue": t[17] || (t[17] = (s) => p.message = s),
                            rows: "2",
                            maxlength: "500",
                            placeholder: "Optional note added to the email",
                            style: { resize: "vertical" }
                          }, null, 512), [
                            [H, p.message]
                          ])
                        ])
                      ])
                    ], 2)
                  ]),
                  e("div", qa, [
                    e("div", {
                      class: "add-card-header",
                      onClick: t[18] || (t[18] = (s) => z.items = !z.items)
                    }, [
                      e("div", ka, [
                        e("span", $a, [
                          e("span", {
                            innerHTML: y(q)("box", 16)
                          }, null, 8, wa)
                        ]),
                        t[56] || (t[56] = f(" Items ", -1)),
                        t[57] || (t[57] = e("span", { class: "inv-req" }, "*", -1)),
                        e("span", xa, " · " + l(p.items.length) + " line" + l(p.items.length !== 1 ? "s" : ""), 1)
                      ])
                    ]),
                    e("div", {
                      class: D(["add-card-body", { collapsed: z.items }]),
                      style: { padding: "16px 16px 8px" }
                    }, [
                      $e.value ? (o(), r("div", Ca, "Items can't be changed after the request was sent. You can still add suppliers and send again.")) : b("", !0),
                      e("div", Sa, [
                        (o(!0), r(S, null, A(p.items, (s, g) => (o(), r("div", {
                          key: s._id,
                          class: "po-item-card"
                        }, [
                          e("div", Ra, [
                            e("span", Ta, "#" + l(g + 1), 1),
                            e("span", Ma, l(s.item_name || s.item_code), 1),
                            e("div", La, [
                              t[58] || (t[58] = e("span", { class: "po-item-card-subtotal-label" }, "QTY", -1)),
                              e("span", Qa, l(s.qty || "—"), 1)
                            ]),
                            $e.value ? b("", !0) : (o(), r("button", {
                              key: 0,
                              class: "po-item-card-rm",
                              onClick: F((_) => Je(g), ["stop"])
                            }, [
                              e("span", {
                                innerHTML: y(q)("x", 16)
                              }, null, 8, Va)
                            ], 8, Ha))
                          ]),
                          e("div", Ea, [
                            e("div", Da, [
                              e("div", Aa, [
                                e("div", Na, [
                                  t[59] || (t[59] = e("label", null, [
                                    f("Qty "),
                                    e("span", { class: "inv-req" }, "*")
                                  ], -1)),
                                  T(e("input", {
                                    class: "inv-fi",
                                    type: "number",
                                    "onUpdate:modelValue": (_) => s.qty = _,
                                    min: "0.01",
                                    max: s.pending_qty ?? void 0,
                                    step: "0.01",
                                    disabled: "",
                                    title: "Quantity comes from the material request and can't be changed here"
                                  }, null, 8, ja), [
                                    [
                                      H,
                                      s.qty,
                                      void 0,
                                      { number: !0 }
                                    ]
                                  ]),
                                  s.pending_qty != null ? (o(), r("div", Fa, "Pending on MRN: " + l(s.pending_qty) + " " + l(s.uom), 1)) : b("", !0)
                                ]),
                                e("div", Ua, [
                                  t[60] || (t[60] = e("label", null, "UOM", -1)),
                                  e("input", {
                                    class: "inv-fi",
                                    value: s.uom || "—",
                                    readonly: "",
                                    tabindex: "-1",
                                    style: { background: "#f3f4f6", color: "#6b7280" }
                                  }, null, 8, Pa)
                                ])
                              ])
                            ])
                          ])
                        ]))), 128))
                      ]),
                      p.items.length ? b("", !0) : (o(), r("div", Oa, "Pick a Material Request to load its items."))
                    ], 2)
                  ]),
                  e("div", Ia, [
                    e("div", {
                      class: "add-card-header",
                      onClick: t[20] || (t[20] = (s) => z.suppliers = !z.suppliers)
                    }, [
                      e("div", za, [
                        e("span", Ba, [
                          e("span", {
                            innerHTML: y(q)("truck", 16)
                          }, null, 8, Ka)
                        ]),
                        t[61] || (t[61] = f(" Suppliers ", -1)),
                        t[62] || (t[62] = e("span", { class: "inv-req" }, "*", -1)),
                        e("span", Ga, " · " + l(p.suppliers.length) + " of at least 1", 1)
                      ]),
                      e("div", {
                        style: { display: "flex", "align-items": "center", gap: "8px" },
                        onClick: t[19] || (t[19] = F(() => {
                        }, ["stop"]))
                      }, [
                        e("button", {
                          class: "add-lines-add-btn",
                          onClick: Xe
                        }, [
                          e("span", {
                            innerHTML: y(q)("plus", 13)
                          }, null, 8, Ya),
                          t[63] || (t[63] = f(" Add Supplier", -1))
                        ])
                      ])
                    ]),
                    e("div", {
                      class: D(["add-card-body", { collapsed: z.suppliers }]),
                      style: { padding: "16px 16px 8px" }
                    }, [
                      e("div", Wa, [
                        (o(!0), r(S, null, A(p.suppliers, (s, g) => (o(), r("div", {
                          key: s._id,
                          class: "po-item-card"
                        }, [
                          e("div", Ja, [
                            e("span", Xa, "#" + l(g + 1), 1),
                            e("span", Za, l(s.supplier_name || s.supplier || "Supplier"), 1),
                            s.send_status && s.send_status !== "Pending" ? (o(), r("span", {
                              key: 0,
                              class: D(["inv-status-badge", xe(s.send_status)])
                            }, l(s.send_status), 3)) : b("", !0),
                            e("button", {
                              class: "po-item-card-rm",
                              onClick: F((_) => Ze(g), ["stop"])
                            }, [
                              e("span", {
                                innerHTML: y(q)("x", 16)
                              }, null, 8, ti)
                            ], 8, ei)
                          ]),
                          e("div", si, [
                            e("div", ni, [
                              e("div", li, [
                                t[64] || (t[64] = e("label", null, [
                                  f("Supplier "),
                                  e("span", { class: "inv-req" }, "*")
                                ], -1)),
                                W(De, {
                                  modelValue: s.supplier,
                                  "onUpdate:modelValue": (_) => s.supplier = _,
                                  options: Y.value,
                                  placeholder: "Search supplier…",
                                  onSearch: he,
                                  onSelect: (_) => Ge(s, _)
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onSelect"])
                              ])
                            ]),
                            e("div", ai, [
                              e("div", ii, [
                                t[65] || (t[65] = e("label", null, [
                                  f("Email "),
                                  e("span", { class: "inv-req" }, "*")
                                ], -1)),
                                T(e("input", {
                                  class: "inv-fi",
                                  type: "email",
                                  "onUpdate:modelValue": (_) => s.email_id = _,
                                  placeholder: "supplier@example.com"
                                }, null, 8, oi), [
                                  [H, s.email_id]
                                ])
                              ])
                            ])
                          ])
                        ]))), 128))
                      ]),
                      p.suppliers.length ? b("", !0) : (o(), r("div", di, "No suppliers yet — click Add Supplier."))
                    ], 2)
                  ])
                ])
              ]),
              e("div", ri, [
                e("div", ui, l(i.value ? "Editing: " + i.value : "New RFQ — unsaved changes"), 1),
                e("div", ci, [
                  e("button", {
                    class: "add-btn-cancel",
                    onClick: it,
                    disabled: I.value || !!i.value && !n.$canEdit("bills"),
                    title: i.value ? "Cancel this RFQ" : ""
                  }, "Cancel", 8, pi),
                  e("button", {
                    class: "add-btn-draft",
                    onClick: t[21] || (t[21] = (s) => Le(!1)),
                    disabled: I.value || !(i.value ? n.$canEdit("bills") : Q.value)
                  }, [
                    e("span", {
                      innerHTML: y(q)("save", 13)
                    }, null, 8, mi),
                    f(" " + l(I.value ? "Saving…" : "Save"), 1)
                  ], 8, vi),
                  e("button", {
                    class: "add-btn-more",
                    onClick: t[22] || (t[22] = (s) => Le(!0)),
                    disabled: I.value || !(i.value ? n.$canEdit("bills") : Q.value),
                    title: "Save, then email every supplier"
                  }, [
                    e("span", {
                      innerHTML: y(q)("send", 13)
                    }, null, 8, fi),
                    f(" " + l(I.value ? "Saving…" : "Save & Send"), 1)
                  ], 8, _i)
                ])
              ])
            ], 2)
          ])) : b("", !0)
        ]))
      ]);
    };
  }
}, Si = /* @__PURE__ */ dt(bi, [["__scopeId", "data-v-1386d95f"]]);
export {
  Si as default
};
