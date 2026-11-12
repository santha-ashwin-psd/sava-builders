import { x as je, y as Fe, k as i, c as o, a as e, t as l, u as y, i as q, F as C, b, d as f, w as R, A as Q, v as Ue, r as D, q as j, l as ve, g as X, h as $, z as ae, J as oe, f as ie, p as it, X as me, _ as ot, o as dt, D as W, E as rt, a4 as Ee, C as ut, n as E, H as ct, S as pt, j as vt, Y as mt, e as _t, K as ft, a3 as yt, a9 as bt, R as ht } from "./main-at6dmNzt.js";
import { o as gt } from "./useOpenFromQuery-DW6Sl1HT.js";
import { _ as De } from "./SearchableSelect-CTBgYGG8.js";
import { D as Ae } from "./DocLink-qJ-RJDPY.js";
import { f as S, b as ce } from "./format-BcJZDVG4.js";
import { P as qt } from "./Pagination-Csnbwew-.js";
import { u as kt } from "./usePagination-Bp2RHGaY.js";
import { o as Ne } from "./userNames-CwpBXF3Z.js";
const $t = { class: "inv-drawer-panel" }, wt = { class: "inv-dh" }, xt = { style: { display: "flex", "align-items": "center", gap: "10px", "flex-wrap": "wrap" } }, St = { class: "inv-dh-title" }, Ct = {
  class: "inv-dh-sub",
  style: { "margin-left": "4px" }
}, Tt = ["disabled"], Rt = ["innerHTML"], Mt = { class: "inv-content-row" }, Lt = { class: "inv-dbody" }, Qt = {
  key: 0,
  style: { padding: "24px" }
}, Ht = {
  key: 1,
  class: "exp-field-hint",
  style: { padding: "16px", color: "#C92A2A" }
}, Vt = {
  key: 0,
  class: "exp-field-hint",
  style: { "margin-bottom": "10px" }
}, Et = { class: "add-card" }, Dt = { class: "add-card-body" }, At = { class: "inv-fg inv-fg2" }, Nt = ["value"], jt = { style: { "grid-column": "1/-1" } }, Ft = { class: "add-card" }, Ut = {
  class: "add-card-body",
  style: { padding: "16px 16px 8px" }
}, Pt = { class: "po-item-cards" }, Ot = { class: "po-item-card-header" }, It = { class: "po-item-card-num" }, zt = { class: "po-item-card-title" }, Bt = { class: "po-item-card-subtotal" }, Kt = { class: "po-item-card-subtotal-label" }, Gt = { class: "po-item-card-amount" }, Yt = { class: "po-item-card-body" }, Wt = { class: "po-item-col po-item-col--left" }, Jt = { class: "po-item-num-row" }, Xt = { class: "po-item-field" }, Zt = ["value"], es = { class: "po-item-field" }, ts = ["value"], ss = { class: "po-item-col po-item-col--right" }, ns = { class: "po-item-num-row" }, ls = { class: "po-item-field" }, as = ["onUpdate:modelValue"], is = { class: "po-item-field" }, os = ["onUpdate:modelValue"], ds = { class: "po-item-field" }, rs = ["value"], us = { style: { display: "flex", "flex-direction": "column", "align-items": "flex-end", gap: "4px", padding: "10px 4px 12px", "font-size": "13px" } }, cs = { class: "mono" }, ps = { class: "mono" }, vs = { style: { "font-size": "14px" } }, ms = { class: "mono" }, _s = { class: "inv-dfooter" }, fs = { class: "add-footer-status" }, ys = { class: "add-footer-actions" }, bs = ["disabled"], hs = ["disabled"], gs = ["innerHTML"], qe = "psd_books.api.supplier_quotation.", qs = {
  __name: "QuotationDialog",
  props: {
    open: { type: Boolean, default: !1 },
    rfq: { type: String, default: "" },
    supplier: { type: String, default: "" },
    supplierName: { type: String, default: "" }
  },
  emits: ["close", "saved"],
  setup(A, { emit: w }) {
    const H = A, P = w, { toast: O } = je(), N = { module: "bills", action: "write" }, k = $(!1), M = $(!1), L = $(""), F = $([]), c = ae({
      entry_date: "",
      quotation_date: "",
      delivery_days: null,
      payment_terms: "",
      remarks: "",
      active_quotation: null,
      revision_no: 0,
      items: []
    }), x = X(() => !!c.active_quotation), v = (d) => Math.round(d * 100 + 1e-9) / 100;
    function h(d) {
      return d.rate !== "" && d.rate != null && S(d.rate) > 0;
    }
    function T(d) {
      if (!h(d)) return { quoted: !1, amount: 0, tax: 0 };
      const a = v(S(d.qty) * S(d.rate) * (100 - S(d.discount_percent)) / 100);
      return { quoted: !0, amount: a, tax: v(a * S(d.vat_percent) / 100) };
    }
    const te = X(() => {
      let d = 0, a = 0;
      for (const _ of c.items) {
        const V = T(_);
        d += V.amount, a += V.tax;
      }
      return d = v(d), a = v(a), { net: d, tax: a, grand: v(d + a) };
    });
    function Z(d) {
      return Number(d || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    async function K() {
      if (!F.value.length)
        try {
          const d = await ie("Payment Terms", { fields: ["name"], order: "credit_days asc, name asc", limit: 100 });
          F.value = (d || []).map((a) => a.name);
        } catch {
          F.value = [];
        }
    }
    async function u() {
      k.value = !0, L.value = "";
      try {
        const [d] = await Promise.all([
          ve(qe + "get_quotation_prefill", { request_for_quotation: H.rfq, supplier: H.supplier }),
          K()
        ]);
        Object.assign(c, {
          entry_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
          // this screen always creates a new record, so the entry day is today
          quotation_date: d.quotation_date || "",
          delivery_days: d.delivery_days ?? null,
          payment_terms: d.payment_terms || "",
          remarks: d.remarks || "",
          active_quotation: d.active_quotation || null,
          revision_no: d.revision_no || 0
        }), c.payment_terms && !F.value.includes(c.payment_terms) && F.value.push(c.payment_terms), c.items = (d.items || []).map((a) => ({
          mrn_item: a.mrn_item,
          item_code: a.item_code,
          item_name: a.item_name,
          uom: a.uom,
          qty: a.qty,
          vat_percent: a.vat_percent,
          rate: a.rate == null ? "" : a.rate,
          discount_percent: a.discount_percent ?? 0
        }));
      } catch (d) {
        L.value = d.message || "Could not load the quotation form";
      }
      k.value = !1;
    }
    Fe(() => H.open, (d) => {
      d && u();
    }, { immediate: !0 });
    function U() {
      if (!c.entry_date) return "Enter the entry date";
      if (!c.quotation_date) return "Enter the quotation date";
      if (c.delivery_days !== null && c.delivery_days !== "" && !(S(c.delivery_days) >= 0)) return "Delivery days can't be negative";
      for (const d of c.items) {
        if (d.rate !== "" && d.rate != null && S(d.rate) < 0) return `${d.item_code}: rate can't be negative`;
        const a = S(d.discount_percent);
        if (a < 0 || a > 100) return `${d.item_code}: discount must be between 0 and 100%`;
      }
      return c.items.some(h) ? "" : "Enter a rate for at least one item";
    }
    async function I() {
      const d = U();
      if (d) return O.error(d);
      M.value = !0;
      try {
        const a = {
          request_for_quotation: H.rfq,
          supplier: H.supplier,
          entry_date: c.entry_date,
          quotation_date: c.quotation_date,
          delivery_days: c.delivery_days === "" ? null : c.delivery_days,
          payment_terms: c.payment_terms || null,
          remarks: c.remarks || "",
          items: c.items.map((V) => ({
            mrn_item: V.mrn_item,
            rate: h(V) ? S(V.rate) : null,
            discount_percent: S(V.discount_percent)
          }))
        }, _ = x.value ? await oe(qe + "revise_quotation", { name: c.active_quotation, data: a }, N) : await oe(qe + "enter_quotation", { data: a }, N);
        O.success(`Quotation ${_.name} saved`), P("saved", _);
      } catch (a) {
        O.error(a.message || "Could not save the quotation");
      }
      M.value = !1;
    }
    function G() {
      M.value || P("close");
    }
    return (d, a) => A.open ? (i(), o("div", {
      key: 0,
      class: "inv-drawer-bg",
      onClick: j(G, ["self"])
    }, [
      e("div", $t, [
        e("div", wt, [
          e("div", xt, [
            e("div", St, l(x.value ? "Revise Quotation" : "Enter Quotation"), 1),
            e("span", Ct, l(A.supplierName || A.supplier) + " · " + l(A.rfq), 1)
          ]),
          e("button", {
            class: "inv-dclose",
            onClick: G,
            disabled: M.value
          }, [
            e("span", {
              innerHTML: y(q)("x", 16)
            }, null, 8, Rt)
          ], 8, Tt)
        ]),
        e("div", Mt, [
          e("div", Lt, [
            k.value ? (i(), o("div", Qt, [...a[5] || (a[5] = [
              e("div", {
                class: "shimmer",
                style: { height: "12px" }
              }, null, -1)
            ])])) : L.value ? (i(), o("div", Ht, l(L.value), 1)) : (i(), o(C, { key: 2 }, [
              x.value ? (i(), o("div", Vt, " Revising " + l(c.active_quotation) + " (revision " + l(c.revision_no) + "). Saving makes it Superseded and creates revision " + l(c.revision_no + 1) + " as the Active quotation. ", 1)) : b("", !0),
              e("div", Et, [
                a[12] || (a[12] = e("div", { class: "add-card-header" }, [
                  e("div", { class: "add-card-title" }, "Quotation Details")
                ], -1)),
                e("div", Dt, [
                  e("div", At, [
                    e("div", null, [
                      a[6] || (a[6] = e("label", { class: "inv-lbl" }, [
                        f("Entry Date "),
                        e("span", { class: "inv-req" }, "*")
                      ], -1)),
                      R(e("input", {
                        class: "inv-fi",
                        type: "date",
                        "onUpdate:modelValue": a[0] || (a[0] = (_) => c.entry_date = _)
                      }, null, 512), [
                        [Q, c.entry_date]
                      ])
                    ]),
                    e("div", null, [
                      a[7] || (a[7] = e("label", { class: "inv-lbl" }, [
                        f("Quotation Date "),
                        e("span", { class: "inv-req" }, "*")
                      ], -1)),
                      R(e("input", {
                        class: "inv-fi",
                        type: "date",
                        "onUpdate:modelValue": a[1] || (a[1] = (_) => c.quotation_date = _)
                      }, null, 512), [
                        [Q, c.quotation_date]
                      ])
                    ]),
                    e("div", null, [
                      a[8] || (a[8] = e("label", { class: "inv-lbl" }, "Delivery (days)", -1)),
                      R(e("input", {
                        class: "inv-fi",
                        type: "number",
                        min: "0",
                        step: "1",
                        "onUpdate:modelValue": a[2] || (a[2] = (_) => c.delivery_days = _),
                        placeholder: "e.g. 7"
                      }, null, 512), [
                        [
                          Q,
                          c.delivery_days,
                          void 0,
                          { number: !0 }
                        ]
                      ])
                    ]),
                    e("div", null, [
                      a[10] || (a[10] = e("label", { class: "inv-lbl" }, "Payment Terms", -1)),
                      R(e("select", {
                        class: "inv-fi",
                        "onUpdate:modelValue": a[3] || (a[3] = (_) => c.payment_terms = _)
                      }, [
                        a[9] || (a[9] = e("option", { value: "" }, "— Select Payment Terms —", -1)),
                        (i(!0), o(C, null, D(F.value, (_) => (i(), o("option", {
                          key: _,
                          value: _
                        }, l(_), 9, Nt))), 128))
                      ], 512), [
                        [Ue, c.payment_terms]
                      ])
                    ]),
                    e("div", jt, [
                      a[11] || (a[11] = e("label", { class: "inv-lbl" }, "Remarks", -1)),
                      R(e("textarea", {
                        class: "inv-fi",
                        "onUpdate:modelValue": a[4] || (a[4] = (_) => c.remarks = _),
                        rows: "2",
                        maxlength: "500",
                        placeholder: "Optional",
                        style: { resize: "vertical" }
                      }, null, 512), [
                        [Q, c.remarks]
                      ])
                    ])
                  ])
                ])
              ]),
              e("div", Ft, [
                a[21] || (a[21] = e("div", { class: "add-card-header" }, [
                  e("div", { class: "add-card-title" }, [
                    f(" Items "),
                    e("span", { style: { "font-size": "11.5px", color: "#6b7280", "font-weight": "400", "letter-spacing": "0", "text-transform": "none" } }, " · rates before VAT; leave the rate blank for items the supplier did not quote")
                  ])
                ], -1)),
                e("div", Ut, [
                  e("div", Pt, [
                    (i(!0), o(C, null, D(c.items, (_, V) => (i(), o("div", {
                      key: _.mrn_item,
                      class: "po-item-card"
                    }, [
                      e("div", Ot, [
                        e("span", It, "#" + l(V + 1), 1),
                        e("span", zt, l(_.item_name || _.item_code), 1),
                        e("div", Bt, [
                          e("span", Kt, l(T(_).quoted ? "TOTAL INCL. VAT" : ""), 1),
                          e("span", Gt, l(T(_).quoted ? Z(T(_).amount + T(_).tax) : "Not quoted"), 1)
                        ])
                      ]),
                      e("div", Yt, [
                        e("div", Wt, [
                          e("div", Jt, [
                            e("div", Xt, [
                              a[13] || (a[13] = e("label", null, "Qty", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: _.qty,
                                readonly: "",
                                tabindex: "-1",
                                style: { background: "#f3f4f6", color: "#6b7280" }
                              }, null, 8, Zt)
                            ]),
                            e("div", es, [
                              a[14] || (a[14] = e("label", null, "UOM", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: _.uom || "—",
                                readonly: "",
                                tabindex: "-1",
                                style: { background: "#f3f4f6", color: "#6b7280" }
                              }, null, 8, ts)
                            ])
                          ])
                        ]),
                        e("div", ss, [
                          e("div", ns, [
                            e("div", ls, [
                              e("label", null, "Rate (KES per " + l(_.uom || "unit") + ")", 1),
                              R(e("input", {
                                class: "inv-fi",
                                type: "number",
                                min: "0",
                                step: "0.01",
                                "onUpdate:modelValue": (Y) => _.rate = Y,
                                placeholder: "Not quoted"
                              }, null, 8, as), [
                                [Q, _.rate]
                              ])
                            ]),
                            e("div", is, [
                              a[15] || (a[15] = e("label", null, "Discount %", -1)),
                              R(e("input", {
                                class: "inv-fi",
                                type: "number",
                                min: "0",
                                max: "100",
                                step: "0.01",
                                "onUpdate:modelValue": (Y) => _.discount_percent = Y
                              }, null, 8, os), [
                                [Q, _.discount_percent]
                              ])
                            ]),
                            e("div", ds, [
                              a[16] || (a[16] = e("label", null, "VAT %", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: _.vat_percent,
                                readonly: "",
                                tabindex: "-1",
                                style: { background: "#f3f4f6", color: "#6b7280" }
                              }, null, 8, rs)
                            ])
                          ])
                        ])
                      ])
                    ]))), 128))
                  ]),
                  e("div", us, [
                    e("div", null, [
                      a[17] || (a[17] = f("Net total: ", -1)),
                      e("strong", cs, l(Z(te.value.net)), 1)
                    ]),
                    e("div", null, [
                      a[18] || (a[18] = f("VAT: ", -1)),
                      e("strong", ps, l(Z(te.value.tax)), 1)
                    ]),
                    e("div", vs, [
                      a[19] || (a[19] = f("Grand total: ", -1)),
                      e("strong", ms, "KES " + l(Z(te.value.grand)), 1)
                    ]),
                    a[20] || (a[20] = e("div", { class: "exp-field-hint" }, "Preview only. The saved totals are calculated by the server.", -1))
                  ])
                ])
              ])
            ], 64))
          ])
        ]),
        e("div", _s, [
          e("div", fs, l(x.value ? "Revision of " + c.active_quotation : "New quotation — unsaved"), 1),
          e("div", ys, [
            e("button", {
              class: "add-btn-cancel",
              onClick: G,
              disabled: M.value
            }, "Cancel", 8, bs),
            e("button", {
              class: "add-btn-draft",
              onClick: I,
              disabled: M.value || k.value || !!L.value
            }, [
              e("span", {
                innerHTML: y(q)("save", 13)
              }, null, 8, gs),
              f(" " + l(M.value ? "Saving…" : x.value ? "Save Revision" : "Save Quotation"), 1)
            ], 8, hs)
          ])
        ])
      ])
    ])) : b("", !0);
  }
}, ks = { class: "inv-drawer-panel" }, $s = { class: "inv-dh" }, ws = { style: { display: "flex", "align-items": "center", gap: "10px", "flex-wrap": "wrap" } }, xs = {
  class: "inv-dh-sub",
  style: { "margin-left": "4px" }
}, Ss = ["innerHTML"], Cs = { class: "inv-content-row" }, Ts = { class: "inv-dbody" }, Rs = {
  key: 0,
  style: { padding: "24px" }
}, Ms = {
  key: 1,
  class: "exp-field-hint",
  style: { padding: "16px", color: "#C92A2A" }
}, Ls = {
  class: "exp-field-hint",
  style: { "margin-bottom": "10px" }
}, Qs = { class: "add-card" }, Hs = { class: "add-card-body" }, Vs = { class: "inv-fg inv-fg2" }, Es = ["value"], Ds = ["value"], As = ["value"], Ns = { style: { "grid-column": "1/-1" } }, js = ["value"], Fs = { class: "add-card" }, Us = {
  class: "add-card-body",
  style: { padding: "16px 16px 8px" }
}, Ps = { class: "po-item-cards" }, Os = { class: "po-item-card-header" }, Is = { class: "po-item-card-num" }, zs = { class: "po-item-card-title" }, Bs = { class: "po-item-card-subtotal" }, Ks = { class: "po-item-card-subtotal-label" }, Gs = { class: "po-item-card-amount" }, Ys = { class: "po-item-card-body" }, Ws = { class: "po-item-col po-item-col--left" }, Js = { class: "po-item-num-row" }, Xs = { class: "po-item-field" }, Zs = ["value"], en = { class: "po-item-field" }, tn = ["value"], sn = { class: "po-item-col po-item-col--right" }, nn = { class: "po-item-num-row" }, ln = { class: "po-item-field" }, an = ["value"], on = { class: "po-item-field" }, dn = ["value"], rn = { class: "po-item-field" }, un = ["value"], cn = { style: { display: "flex", "flex-direction": "column", "align-items": "flex-end", gap: "4px", padding: "10px 4px 12px", "font-size": "13px" } }, pn = { class: "mono" }, vn = { class: "mono" }, mn = { style: { "font-size": "14px" } }, _n = { class: "mono" }, B = "background:#f3f4f6;color:#374151", fn = {
  __name: "QuotationView",
  props: {
    open: { type: Boolean, default: !1 },
    quotation: { type: String, default: "" },
    supplierName: { type: String, default: "" }
  },
  emits: ["close"],
  setup(A, { emit: w }) {
    const H = A, P = w, O = $(!1), N = $(""), k = $(null);
    function M(x) {
      return x.rate != null && x.rate !== "" && S(x.rate) > 0;
    }
    function L(x) {
      return Number(x || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    async function F() {
      O.value = !0, N.value = "", k.value = null;
      try {
        k.value = await me("Supplier Quotation", H.quotation);
      } catch (x) {
        N.value = x.message || "Could not load the quotation";
      }
      O.value = !1;
    }
    Fe(() => H.open, (x) => {
      x && H.quotation && F();
    }, { immediate: !0 });
    function c() {
      P("close");
    }
    return (x, v) => A.open ? (i(), o("div", {
      key: 0,
      class: "inv-drawer-bg",
      onClick: j(c, ["self"])
    }, [
      e("div", ks, [
        e("div", $s, [
          e("div", ws, [
            v[0] || (v[0] = e("div", { class: "inv-dh-title" }, "Quoted Prices", -1)),
            e("span", xs, l(A.supplierName || k.value && k.value.supplier_name || "") + " · " + l(A.quotation), 1)
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
        e("div", Cs, [
          e("div", Ts, [
            O.value ? (i(), o("div", Rs, [...v[1] || (v[1] = [
              e("div", {
                class: "shimmer",
                style: { height: "12px" }
              }, null, -1)
            ])])) : N.value ? (i(), o("div", Ms, l(N.value), 1)) : k.value ? (i(), o(C, { key: 2 }, [
              e("div", Ls, l(k.value.name) + " (revision " + l(k.value.revision_no || 0) + ") · " + l(k.value.status), 1),
              e("div", Qs, [
                v[6] || (v[6] = e("div", { class: "add-card-header" }, [
                  e("div", { class: "add-card-title" }, "Quotation Details")
                ], -1)),
                e("div", Hs, [
                  e("div", Vs, [
                    e("div", null, [
                      v[2] || (v[2] = e("label", { class: "inv-lbl" }, "Quotation Date", -1)),
                      e("input", {
                        class: "inv-fi",
                        value: k.value.quotation_date || "—",
                        readonly: "",
                        tabindex: "-1",
                        style: B
                      }, null, 8, Es)
                    ]),
                    e("div", null, [
                      v[3] || (v[3] = e("label", { class: "inv-lbl" }, "Delivery (days)", -1)),
                      e("input", {
                        class: "inv-fi",
                        value: k.value.delivery_days ?? "—",
                        readonly: "",
                        tabindex: "-1",
                        style: B
                      }, null, 8, Ds)
                    ]),
                    e("div", null, [
                      v[4] || (v[4] = e("label", { class: "inv-lbl" }, "Payment Terms", -1)),
                      e("input", {
                        class: "inv-fi",
                        value: k.value.payment_terms || "—",
                        readonly: "",
                        tabindex: "-1",
                        style: B
                      }, null, 8, As)
                    ]),
                    e("div", Ns, [
                      v[5] || (v[5] = e("label", { class: "inv-lbl" }, "Remarks", -1)),
                      e("textarea", {
                        class: "inv-fi",
                        value: k.value.remarks || "",
                        rows: "2",
                        readonly: "",
                        tabindex: "-1",
                        placeholder: "—",
                        style: it(B + ";resize:none")
                      }, null, 12, js)
                    ])
                  ])
                ])
              ]),
              e("div", Fs, [
                v[14] || (v[14] = e("div", { class: "add-card-header" }, [
                  e("div", { class: "add-card-title" }, [
                    f(" Items "),
                    e("span", { style: { "font-size": "11.5px", color: "#6b7280", "font-weight": "400", "letter-spacing": "0", "text-transform": "none" } }, " · rates in KES, before VAT")
                  ])
                ], -1)),
                e("div", Us, [
                  e("div", Ps, [
                    (i(!0), o(C, null, D(k.value.items || [], (h, T) => (i(), o("div", {
                      key: h.name || T,
                      class: "po-item-card"
                    }, [
                      e("div", Os, [
                        e("span", Is, "#" + l(T + 1), 1),
                        e("span", zs, l(h.item_name || h.item_code), 1),
                        e("div", Bs, [
                          e("span", Ks, l(M(h) ? "TOTAL INCL. VAT" : ""), 1),
                          e("span", Gs, l(M(h) ? L(y(S)(h.amount) + y(S)(h.tax_amount)) : "Not quoted"), 1)
                        ])
                      ]),
                      e("div", Ys, [
                        e("div", Ws, [
                          e("div", Js, [
                            e("div", Xs, [
                              v[7] || (v[7] = e("label", null, "Qty", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: h.qty,
                                readonly: "",
                                tabindex: "-1",
                                style: B
                              }, null, 8, Zs)
                            ]),
                            e("div", en, [
                              v[8] || (v[8] = e("label", null, "UOM", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: h.uom || "—",
                                readonly: "",
                                tabindex: "-1",
                                style: B
                              }, null, 8, tn)
                            ])
                          ])
                        ]),
                        e("div", sn, [
                          e("div", nn, [
                            e("div", ln, [
                              e("label", null, "Rate (KES per " + l(h.uom || "unit") + ")", 1),
                              e("input", {
                                class: "inv-fi",
                                value: M(h) ? h.rate : "",
                                placeholder: "Not quoted",
                                readonly: "",
                                tabindex: "-1",
                                style: B
                              }, null, 8, an)
                            ]),
                            e("div", on, [
                              v[9] || (v[9] = e("label", null, "Discount %", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: h.discount_percent || 0,
                                readonly: "",
                                tabindex: "-1",
                                style: B
                              }, null, 8, dn)
                            ]),
                            e("div", rn, [
                              v[10] || (v[10] = e("label", null, "VAT %", -1)),
                              e("input", {
                                class: "inv-fi",
                                value: h.vat_percent || 0,
                                readonly: "",
                                tabindex: "-1",
                                style: B
                              }, null, 8, un)
                            ])
                          ])
                        ])
                      ])
                    ]))), 128))
                  ]),
                  e("div", cn, [
                    e("div", null, [
                      v[11] || (v[11] = f("Net total: ", -1)),
                      e("strong", pn, l(L(k.value.net_total)), 1)
                    ]),
                    e("div", null, [
                      v[12] || (v[12] = f("VAT: ", -1)),
                      e("strong", vn, l(L(k.value.total_tax)), 1)
                    ]),
                    e("div", mn, [
                      v[13] || (v[13] = f("Grand total: ", -1)),
                      e("strong", _n, "KES " + l(L(k.value.grand_total)), 1)
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
}, yn = { class: "list-page" }, bn = { class: "sales-toolbar" }, hn = { class: "sales-search" }, gn = ["innerHTML"], qn = { class: "sales-pills" }, kn = ["onClick"], $n = {
  key: 0,
  class: "sales-pill-count"
}, wn = { style: { "margin-left": "auto", display: "flex", gap: "6px" } }, xn = ["value"], Sn = ["innerHTML"], Cn = ["disabled"], Tn = ["innerHTML"], Rn = { class: "rfq-kpis" }, Mn = ["title", "onClick", "onKeydown"], Ln = ["innerHTML"], Qn = { class: "rfq-kpi-label" }, Hn = { class: "rfq-kpi-value" }, Vn = { class: "rfq-kpi-sub" }, En = { class: "rfq-mr-note" }, Dn = ["innerHTML"], An = { class: "inv-table-wrap" }, Nn = { class: "inv-table" }, jn = { key: 1 }, Fn = {
  colspan: "7",
  class: "bk-empty-state"
}, Un = { class: "bk-empty-inner" }, Pn = { class: "bk-empty-title" }, On = {
  key: 0,
  class: "bk-empty-sub"
}, In = ["onClick"], zn = { class: "mono-sm" }, Bn = { class: "c-muted" }, Kn = { class: "c-muted" }, Gn = { class: "c-muted" }, Yn = { class: "pr-actions-row" }, Wn = ["onClick"], Jn = ["innerHTML"], Xn = ["onClick"], Zn = ["innerHTML"], el = {
  key: 0,
  style: { padding: "12px 0 4px" }
}, tl = { class: "inv-drawer-panel inv-view-page pr-view-drawer" }, sl = { class: "inv-view-header" }, nl = { class: "inv-view-number" }, ll = { class: "inv-view-subtitle" }, al = { class: "rfq-hdr-right" }, il = { class: "rfq-hdr-actions" }, ol = ["disabled", "title"], dl = ["innerHTML"], rl = ["innerHTML"], ul = ["disabled", "title"], cl = ["innerHTML"], pl = ["innerHTML"], vl = { class: "inv-dbody" }, ml = { class: "pr-view-card" }, _l = { class: "pr-info-grid" }, fl = { class: "pr-info-item" }, yl = { class: "pr-info-val pr-info-link" }, bl = { class: "pr-info-item" }, hl = { class: "pr-info-item" }, gl = { class: "pr-info-val" }, ql = { class: "pr-info-item" }, kl = { class: "pr-info-val" }, $l = { class: "pr-info-item" }, wl = {
  key: 0,
  class: "pr-info-item pr-info-full"
}, xl = {
  class: "pr-info-val",
  style: { color: "#6b7280" }
}, Sl = { class: "pr-view-card" }, Cl = { class: "pr-view-card-hdr" }, Tl = { class: "pr-item-count" }, Rl = { class: "inv-table pr-items-tbl" }, Ml = {
  key: 0,
  style: { width: "190px" }
}, Ll = { class: "pr-row-num" }, Ql = { style: { "font-weight": "500", color: "#111827" } }, Hl = { class: "c-muted" }, Vl = {
  key: 0,
  style: { "font-size": "11px", color: "#C92A2A", "margin-top": "3px" }
}, El = { class: "c-muted mono-sm" }, Dl = {
  class: "mono-sm",
  style: { color: "#111827" }
}, Al = { class: "c-muted mono-sm" }, Nl = {
  key: 1,
  class: "c-muted"
}, jl = { class: "pr-actions-row" }, Fl = ["onClick"], Ul = ["innerHTML"], Pl = ["onClick"], Ol = ["onClick"], Il = ["onClick"], zl = { key: 0 }, Bl = ["colspan"], Kl = {
  key: 0,
  class: "pr-info-val",
  style: { padding: "10px 14px", color: "#b45309", "font-size": "12.5px" }
}, Gl = { class: "pr-view-card" }, Yl = { class: "pr-view-card-hdr" }, Wl = { class: "pr-item-count" }, Jl = { class: "inv-table pr-items-tbl" }, Xl = { class: "pr-row-num" }, Zl = { style: { "font-weight": "500", color: "#111827" } }, ea = { class: "ta-r mono" }, ta = { class: "c-muted" }, sa = {
  key: 0,
  class: "inv-view-footer"
}, na = { class: "inv-dh" }, la = { style: { display: "flex", "align-items": "center", gap: "10px", "flex-wrap": "wrap" } }, aa = { class: "inv-dh-title" }, ia = {
  key: 0,
  class: "add-status-badge"
}, oa = {
  key: 1,
  class: "inv-dh-sub",
  style: { "margin-left": "4px" }
}, da = ["innerHTML"], ra = { class: "inv-content-row" }, ua = { class: "inv-dbody" }, ca = { class: "add-card" }, pa = { class: "add-card-title" }, va = { class: "add-card-title-icon" }, ma = ["innerHTML"], _a = { class: "inv-fg inv-fg2" }, fa = { style: { "grid-column": "1/-1" } }, ya = ["value"], ba = ["value"], ha = { style: { "grid-column": "1/-1" } }, ga = { class: "add-card" }, qa = { class: "add-card-title" }, ka = { class: "add-card-title-icon" }, $a = ["innerHTML"], wa = { style: { "font-size": "11.5px", color: "#6b7280", "font-weight": "400", "letter-spacing": "0", "text-transform": "none" } }, xa = {
  key: 0,
  class: "exp-field-hint",
  style: { "margin-bottom": "8px" }
}, Sa = { class: "po-item-cards" }, Ca = { class: "po-item-card-header" }, Ta = { class: "po-item-card-num" }, Ra = { class: "po-item-card-title" }, Ma = { class: "po-item-card-subtotal" }, La = { class: "po-item-card-amount" }, Qa = ["onClick"], Ha = ["innerHTML"], Va = {
  class: "po-item-card-body",
  style: { "grid-template-columns": "1fr" }
}, Ea = { class: "po-item-col po-item-col--right" }, Da = { class: "po-item-num-row" }, Aa = { class: "po-item-field" }, Na = ["onUpdate:modelValue", "max"], ja = {
  key: 0,
  class: "exp-field-hint"
}, Fa = { class: "po-item-field" }, Ua = ["value"], Pa = {
  key: 1,
  class: "pr-items-empty",
  style: { padding: "20px 0 8px" }
}, Oa = { class: "add-card" }, Ia = { class: "add-card-title" }, za = { class: "add-card-title-icon" }, Ba = ["innerHTML"], Ka = { style: { "font-size": "11.5px", color: "#6b7280", "font-weight": "400", "letter-spacing": "0", "text-transform": "none" } }, Ga = ["innerHTML"], Ya = { class: "po-item-cards" }, Wa = { class: "po-item-card-header" }, Ja = { class: "po-item-card-num" }, Xa = { class: "po-item-card-title" }, Za = ["onClick"], ei = ["innerHTML"], ti = { class: "po-item-card-body" }, si = { class: "po-item-col po-item-col--left" }, ni = { class: "po-item-field" }, li = { class: "po-item-col po-item-col--right" }, ai = { class: "po-item-field" }, ii = ["onUpdate:modelValue"], oi = {
  key: 0,
  class: "pr-items-empty",
  style: { padding: "20px 0 8px" }
}, di = { class: "inv-dfooter" }, ri = { class: "add-footer-status" }, ui = { class: "add-footer-actions" }, ci = ["disabled"], pi = ["disabled"], vi = ["innerHTML"], mi = ["disabled"], _i = ["innerHTML"], pe = "psd_books.api.rfq.", fi = "psd_books.api.supplier_quotation.", yi = {
  __name: "RequestForQuotation",
  setup(A) {
    const { toast: w } = je(), { confirm: H } = yt(), P = pt(), O = vt(), N = { module: "bills", action: "write" }, { isAdmin: k, flags: M } = ht(), L = X(() => {
      var n, t;
      return k.value || !!((t = (n = M.value.doc_access) == null ? void 0 : n["Request for Quotation"]) != null && t.create);
    }), F = [{ k: "all", l: "All" }, { k: "Draft", l: "Draft" }, { k: "Sent", l: "Sent" }, { k: "Cancelled", l: "Cancelled" }], c = $([]), x = $(!1), v = $(""), h = $("all"), T = $("all"), te = [{ k: "all", l: "All Time" }, { k: "month", l: "This Month" }, { k: "quarter", l: "This Quarter" }, { k: "year", l: "This Year" }];
    function Z(n) {
      if (T.value === "all") return !0;
      const t = String(n.posting_date || "").slice(0, 10);
      if (!t) return !1;
      const r = /* @__PURE__ */ new Date(), s = String(r.getFullYear()), g = r.getMonth(), m = Number(t.slice(5, 7)) - 1;
      if (T.value === "year") return t.slice(0, 4) === s;
      if (T.value === "month") return t.slice(0, 4) === s && m === g;
      const ue = Math.floor(g / 3) * 3;
      return t.slice(0, 4) === s && m >= ue && m < ue + 3;
    }
    const K = $(!1), u = $(null), U = $(!1), I = $(!1), G = $(!1), d = $(""), a = $([]), _ = $({}), V = (n) => n ? _.value[n] || n : "", Y = $([]), z = ae({ details: !1, items: !1, suppliers: !1 });
    let de = 1;
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
    }), p = ae(ke()), $e = X(() => !!d.value && p.status === "Sent"), Pe = X(() => ({
      Draft: c.value.filter((n) => n.status === "Draft").length,
      Sent: c.value.filter((n) => n.status === "Sent").length,
      Cancelled: c.value.filter((n) => n.status === "Cancelled").length
    })), Oe = X(() => {
      const n = c.value, t = (r) => n.filter((s) => s.status === r).length;
      return [
        { key: "total", label: "TOTAL RFQs", value: n.length, sub: "All requests", icon: "file", tab: "all" },
        { key: "active", label: "ACTIVE RFQs", value: n.length - t("Cancelled"), sub: "Draft, Sent & In Progress", icon: "activity", tab: "active" },
        { key: "sent", label: "SENT", value: t("Sent"), sub: "RFQs sent to suppliers", icon: "check", tab: "Sent" },
        { key: "cancelled", label: "CANCELLED", value: t("Cancelled"), sub: "Cancelled RFQs", icon: "cancel", tab: "Cancelled" }
      ];
    });
    function Ie() {
      const n = ["RFQ #", "Material Request", "Project", "Date", "Respond By", "Status"], t = ee.value.map((m) => [m.name, m.material_request || "", m.project || "", m.posting_date || "", m.respond_by || "", se(m)]), r = [n, ...t].map((m) => m.map((ue) => `"${String(ue ?? "").replace(/"/g, '""')}"`).join(",")).join(`
`), s = URL.createObjectURL(new Blob([r], { type: "text/csv;charset=utf-8;" })), g = document.createElement("a");
      g.href = s, g.download = "requests_for_quotation.csv", g.click(), URL.revokeObjectURL(s);
    }
    const ee = X(() => {
      let n = c.value;
      h.value === "active" ? n = n.filter((r) => r.status !== "Cancelled") : h.value !== "all" && (n = n.filter((r) => r.status === h.value)), T.value !== "all" && (n = n.filter(Z));
      const t = v.value.trim().toLowerCase();
      return t && (n = n.filter((r) => [r.name, r.material_request, r.project, V(r.project)].some((s) => (s || "").toLowerCase().includes(t)))), n;
    }), { page: _e, pageSize: fe, paged: ze } = kt(ee, { storageKey: "rfqs" }), ye = $({});
    function se(n) {
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
    function Se(n) {
      return (n.suppliers || []).filter((t) => t.send_status === "Sent").length;
    }
    function Be(n) {
      return n && n.status !== "Cancelled" && (n.suppliers || []).some((t) => t.send_status !== "Sent");
    }
    function Ke(n) {
      return Se(n) ? "Send to Remaining" : "Send to Suppliers";
    }
    async function ne() {
      x.value = !0;
      try {
        c.value = await ie("Request for Quotation", {
          fields: ["name", "material_request", "project", "posting_date", "respond_by", "status", "modified"],
          limit: 1e5,
          order: "modified desc"
        }) || [];
      } catch (n) {
        w.error(n.message || "Could not load Requests for Quotation"), c.value = [];
      }
      try {
        const n = await ie("Project", { fields: ["name", "project_name"], limit: 1e3 });
        _.value = Object.fromEntries((n || []).map((t) => [t.name, t.project_name]));
      } catch {
        _.value = {};
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
        w.error(t.message || "Failed to load"), K.value = !1;
      }
    }
    async function re() {
      u.value && (u.value = await me("Request for Quotation", u.value.name));
    }
    async function Ce(n = "") {
      try {
        const t = [
          ["docstatus", "=", 1],
          ["material_request_type", "in", ["Purchase", "Asset"]],
          ["status", "in", ["Approved", "Partly Issued"]]
        ];
        n && t.push(["name", "like", `%${n}%`]);
        const r = await ie("Material Request", {
          fields: ["name", "project", "posting_date"],
          filters: t,
          limit: 30,
          order: "modified desc"
        });
        a.value = (r || []).map((s) => ({ value: s.name, label: [s.name, s.project].filter(Boolean).join("  •  ") }));
      } catch {
        a.value = [];
      }
    }
    async function he(n = "") {
      try {
        const t = [["disabled", "=", 0]];
        n && t.push(["supplier_name", "like", `%${n}%`]);
        const r = await ie("Supplier", {
          fields: ["name", "supplier_name", "email_id"],
          filters: t,
          limit: 30,
          order: "supplier_name asc"
        });
        Y.value = (r || []).map((s) => ({
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
      const r = t && typeof t == "object" ? t : Y.value.find((s) => s.value === t);
      r && (n.supplier = r.value, n.supplier_name = r.supplier_name || r.label || r.value, n.email_id = r.email_id || "");
    }
    function Te() {
      Object.assign(p, ke()), d.value = "";
    }
    function Re(n) {
      Object.assign(p, {
        material_request: n.material_request,
        project: n.project || "",
        delivery_warehouse: n.delivery_warehouse || "",
        posting_date: n.posting_date || p.posting_date,
        entry_date: n.entry_date || p.entry_date,
        respond_by: n.respond_by || ""
      }), p.items = (n.items || []).map((t) => ({
        _id: de++,
        mrn_item: t.mrn_item,
        item_code: t.item_code,
        item_name: t.item_name || t.item_code,
        uom: t.uom || "",
        qty: S(t.qty),
        pending_qty: S(t.qty),
        intended_use: t.intended_use || ""
      }));
    }
    async function Ye(n) {
      const t = n && n.value || n;
      if (!(!t || d.value))
        try {
          Re(await ve(pe + "get_rfq_prefill", { mrn: t }));
        } catch (r) {
          w.error(r.message), p.material_request = "", p.items = [];
        }
    }
    async function We(n) {
      if (Te(), he(""), Ce(""), U.value = !0, n)
        try {
          Re(await ve(pe + "get_rfq_prefill", { mrn: n })), a.value.some((t) => t.value === n) || a.value.push({ value: n, label: n });
        } catch (t) {
          w.error(t.message), U.value = !1;
        }
    }
    async function Me(n) {
      Te(), he("");
      try {
        const t = await me("Request for Quotation", n.name);
        d.value = t.name, Object.assign(p, {
          material_request: t.material_request,
          project: t.project || "",
          delivery_warehouse: t.delivery_warehouse || "",
          posting_date: t.posting_date,
          entry_date: t.entry_date || t.posting_date,
          respond_by: t.respond_by || "",
          message: t.message || "",
          status: t.status
        }), a.value = [{ value: t.material_request, label: t.material_request }], p.items = (t.items || []).map((r) => ({
          _id: de++,
          name: r.name,
          mrn_item: r.mrn_item,
          item_code: r.item_code,
          item_name: r.item_name,
          uom: r.uom || "",
          qty: S(r.qty),
          pending_qty: null,
          intended_use: r.intended_use || ""
        })), p.suppliers = (t.suppliers || []).map((r) => ({
          _id: de++,
          name: r.name,
          supplier: r.supplier,
          supplier_name: r.supplier_name,
          email_id: r.email_id || "",
          send_status: r.send_status,
          sent_on: r.sent_on,
          send_error: r.send_error
        })), U.value = !0;
      } catch (t) {
        w.error(t.message || "Failed to load");
      }
    }
    function Je(n) {
      p.items.splice(n, 1);
    }
    function Xe() {
      p.suppliers.push({ _id: de++, supplier: "", supplier_name: "", email_id: "", send_status: "Pending" });
    }
    function Ze(n) {
      p.suppliers.splice(n, 1);
    }
    function et() {
      if (!p.material_request) return "Select the Material Request";
      if (!p.entry_date) return "Entry Date is required";
      if (!p.items.length) return "Add at least one item";
      for (const t of p.items) {
        if (!(S(t.qty) > 0)) return `Qty must be greater than zero for ${t.item_code}`;
        if (t.pending_qty != null && S(t.qty) > S(t.pending_qty) + 1e-4)
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
      if (t) return w.error(t);
      if (n) {
        if (p.suppliers.length < 1) return w.error("Add at least 1 supplier before sending");
        const r = p.suppliers.filter((s) => !(s.email_id || "").trim()).map((s) => s.supplier_name || s.supplier);
        if (r.length) return w.error("No email address for: " + r.join(", "));
      }
      I.value = !0;
      try {
        const r = {
          doctype: "Request for Quotation",
          company: await _t(),
          material_request: p.material_request,
          posting_date: p.posting_date,
          entry_date: p.entry_date,
          respond_by: p.respond_by || null,
          message: p.message || "",
          items: p.items.map((m) => ({
            doctype: "Request for Quotation Item",
            ...m.name ? { name: m.name } : {},
            mrn_item: m.mrn_item,
            item_code: m.item_code,
            item_name: m.item_name,
            qty: S(m.qty),
            uom: m.uom || "",
            intended_use: m.intended_use || ""
          })),
          suppliers: p.suppliers.map((m) => ({
            doctype: "Request for Quotation Supplier",
            ...m.name ? { name: m.name } : {},
            supplier: m.supplier,
            supplier_name: m.supplier_name,
            email_id: (m.email_id || "").trim()
          }))
        };
        d.value && (r.name = d.value);
        const s = await ft(r), g = (s == null ? void 0 : s.name) || d.value;
        n ? await Ve(g) : w.success(`RFQ ${g} saved`), U.value = !1, await ne();
      } catch (r) {
        w.error(r.message || "Failed to save");
      }
      I.value = !1;
    }
    const J = ae({ open: !1, rfq: "", supplier: "", supplier_name: "" }), le = ae({ open: !1, name: "", supplier_name: "" });
    function ge(n, t) {
      return !!n && (Qe(n) && !!t || (n.suppliers || []).some((r) => r.quotation));
    }
    function tt(n) {
      Object.assign(le, { open: !0, name: n.quotation, supplier_name: n.supplier_name || n.supplier });
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
        await re();
      } catch {
      }
    }
    async function nt(n) {
      if (!(!n.quotation || !await H({
        title: "Cancel quotation?",
        body: `${n.quotation} from ${n.supplier_name || n.supplier} will be cancelled. You can enter a new quotation for this supplier afterwards.`,
        okLabel: "Cancel Quotation",
        cancelLabel: "Keep",
        okStyle: "danger"
      })))
        try {
          await oe(fi + "cancel_quotation", { name: n.quotation }, N), w.success(`Quotation ${n.quotation} cancelled`), await re();
        } catch (r) {
          w.error(r.message || "Cancel failed");
        }
    }
    async function Ve(n) {
      const t = await oe(pe + "send_rfq", { name: n }, N), r = (t.sent || []).length, s = (t.failed || []).length;
      return s ? w.error(`${r} sent, ${s} failed. Check the supplier list and send again to retry.`) : w.success(`RFQ ${n} sent to ${r} supplier${r !== 1 ? "s" : ""}`), t;
    }
    async function lt() {
      if (u.value) {
        G.value = !0;
        try {
          await Ve(u.value.name);
        } catch (n) {
          w.error(n.message || "Send failed");
        }
        try {
          await re(), await ne();
        } catch {
        }
        G.value = !1;
      }
    }
    async function at() {
      if (!(!u.value || !await H({
        title: "Cancel Request for Quotation?",
        body: `${u.value.name} will be cancelled and can no longer be edited or sent.`,
        okLabel: "Cancel RFQ",
        okStyle: "danger"
      })))
        try {
          await oe(pe + "cancel_rfq", { name: u.value.name }, N), w.success("Request for Quotation cancelled"), await re(), await ne();
        } catch (t) {
          w.error(t.message || "Cancel failed");
        }
    }
    return dt(async () => {
      if (await ne(), gt({
        route: P,
        openByName: (n) => be(c.value.find((t) => t.name === n) || { name: n })
      }), P.query.new_from_mrn) {
        const n = String(P.query.new_from_mrn);
        O.replace({ path: P.path, query: {} }), await We(n);
      }
    }), (n, t) => {
      const r = mt("router-link");
      return i(), o("div", yn, [
        e("div", bn, [
          e("div", hn, [
            e("span", {
              innerHTML: y(q)("search", 13),
              style: { color: "#9ca3af", "flex-shrink": "0" }
            }, null, 8, gn),
            R(e("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (s) => v.value = s),
              placeholder: "Search RFQ, MRN, project…",
              class: "sales-search-input"
            }, null, 512), [
              [Q, v.value]
            ])
          ]),
          e("div", qn, [
            (i(), o(C, null, D(F, (s) => e("button", {
              key: s.k,
              class: E(["sales-pill", { active: h.value === s.k }]),
              onClick: (g) => h.value = s.k
            }, [
              f(l(s.l) + " ", 1),
              s.k !== "all" ? (i(), o("span", $n, l(Pe.value[s.k]), 1)) : b("", !0)
            ], 10, kn)), 64))
          ]),
          e("div", wn, [
            R(e("select", {
              "onUpdate:modelValue": t[1] || (t[1] = (s) => T.value = s),
              class: "sales-select",
              title: "Filter by date"
            }, [
              (i(), o(C, null, D(te, (s) => e("option", {
                key: s.k,
                value: s.k
              }, l(s.l), 9, xn)), 64))
            ], 512), [
              [Ue, T.value]
            ]),
            e("button", {
              class: "sales-btn-ghost",
              onClick: ne,
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
              t[25] || (t[25] = f(" CSV", -1))
            ], 8, Cn)
          ])
        ]),
        e("div", Rn, [
          (i(!0), o(C, null, D(Oe.value, (s) => (i(), o("div", {
            key: s.key,
            class: E(["rfq-kpi rfq-kpi-click", ["rfq-kpi-" + s.key, { "rfq-kpi-on": h.value === s.tab }]]),
            role: "button",
            tabindex: "0",
            title: "Show " + s.label.toLowerCase(),
            onClick: (g) => h.value = s.tab,
            onKeydown: bt((g) => h.value = s.tab, ["enter"])
          }, [
            e("div", {
              class: "rfq-kpi-icon",
              innerHTML: y(q)(s.icon, 20)
            }, null, 8, Ln),
            e("div", null, [
              e("div", Qn, l(s.label), 1),
              e("div", Hn, l(s.value), 1),
              e("div", Vn, l(s.sub), 1)
            ])
          ], 42, Mn))), 128))
        ]),
        e("div", En, [
          e("span", {
            innerHTML: y(q)("file", 14)
          }, null, 8, Dn),
          t[27] || (t[27] = e("span", null, [
            f("Requests for Quotation can only be created through a "),
            e("b", null, "Material Request"),
            f(". ")
          ], -1)),
          W(r, {
            to: "/manufacturing/material-request",
            class: "rfq-mr-link"
          }, {
            default: rt(() => [...t[26] || (t[26] = [
              f("Go to Material Requests →", -1)
            ])]),
            _: 1
          })
        ]),
        e("div", An, [
          e("table", Nn, [
            t[29] || (t[29] = e("thead", null, [
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
              x.value ? (i(), o(C, { key: 0 }, D(5, (s) => e("tr", { key: s }, [...t[28] || (t[28] = [
                e("td", {
                  colspan: "7",
                  style: { padding: "14px" }
                }, [
                  e("div", {
                    class: "shimmer",
                    style: { height: "12px" }
                  })
                ], -1)
              ])])), 64)) : ee.value.length ? (i(!0), o(C, { key: 2 }, D(y(ze), (s) => (i(), o("tr", {
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
                e("td", zn, l(s.material_request || "—"), 1),
                e("td", Bn, l(V(s.project) || "—"), 1),
                e("td", Kn, l(s.posting_date ? y(ce)(s.posting_date) : "—"), 1),
                e("td", Gn, l(s.respond_by ? y(ce)(s.respond_by) : "—"), 1),
                e("td", null, [
                  e("span", {
                    class: E(["inv-status-badge", we(se(s))])
                  }, l(se(s)), 3)
                ]),
                e("td", {
                  onClick: t[2] || (t[2] = j(() => {
                  }, ["stop"]))
                }, [
                  e("div", Yn, [
                    e("button", {
                      class: "inv-act-btn",
                      onClick: j((g) => be(s), ["stop"]),
                      title: "View"
                    }, [
                      e("span", {
                        innerHTML: y(q)("eye", 12)
                      }, null, 8, Jn)
                    ], 8, Wn),
                    s.status !== "Cancelled" && n.$canEdit("bills") ? (i(), o("button", {
                      key: 0,
                      class: "inv-act-btn",
                      onClick: j((g) => Me(s), ["stop"]),
                      title: "Edit"
                    }, [
                      e("span", {
                        innerHTML: y(q)("edit", 12)
                      }, null, 8, Zn)
                    ], 8, Xn)) : b("", !0)
                  ])
                ])
              ], 8, In))), 128)) : (i(), o("tr", jn, [
                e("td", Fn, [
                  e("div", Un, [
                    e("p", Pn, l(v.value || h.value !== "all" || T.value !== "all" ? "No results match your filters" : "No quotation requests yet"), 1),
                    !v.value && h.value === "all" ? (i(), o("p", On, "Open an Approved Material Request and click Create RFQ.")) : b("", !0)
                  ])
                ])
              ]))
            ])
          ])
        ]),
        !x.value && ee.value.length ? (i(), o("div", el, [
          W(qt, {
            page: y(_e),
            "onUpdate:page": t[3] || (t[3] = (s) => Ee(_e) ? _e.value = s : null),
            "page-size": y(fe),
            "onUpdate:pageSize": t[4] || (t[4] = (s) => Ee(fe) ? fe.value = s : null),
            "total-items": ee.value.length
          }, null, 8, ["page", "page-size", "total-items"])
        ])) : b("", !0),
        (i(), ut(ct, { to: "body" }, [
          K.value ? (i(), o("div", {
            key: 0,
            class: "inv-drawer-bg",
            onClick: t[8] || (t[8] = j((s) => K.value = !1, ["self"]))
          }, [
            e("div", tl, [
              u.value ? (i(), o(C, { key: 0 }, [
                e("div", sl, [
                  e("div", null, [
                    e("div", nl, l(u.value.name), 1),
                    e("div", ll, [
                      f("Request for Quotation · " + l(u.value.posting_date) + " · ", 1),
                      e("span", {
                        class: E(["inv-hdr-badge", we(se(u.value))])
                      }, l(se(u.value)), 3)
                    ])
                  ]),
                  e("div", al, [
                    e("div", il, [
                      Be(u.value) ? (i(), o("button", {
                        key: 0,
                        class: "inv-ab-btn inv-ab-primary",
                        disabled: G.value || !n.$canEdit("bills"),
                        title: n.$canEdit("bills") ? "" : "Read-only access",
                        onClick: lt
                      }, [
                        e("span", {
                          innerHTML: y(q)("send", 13)
                        }, null, 8, dl),
                        f(" " + l(G.value ? "Sending…" : Ke(u.value)), 1)
                      ], 8, ol)) : b("", !0),
                      u.value.status !== "Cancelled" && n.$canEdit("bills") ? (i(), o("button", {
                        key: 1,
                        class: "inv-ab-btn",
                        onClick: t[5] || (t[5] = (s) => {
                          Me(u.value), K.value = !1;
                        })
                      }, [
                        e("span", {
                          innerHTML: y(q)("edit", 13)
                        }, null, 8, rl),
                        t[30] || (t[30] = f(" Edit ", -1))
                      ])) : b("", !0),
                      u.value.status !== "Cancelled" ? (i(), o("button", {
                        key: 2,
                        class: "inv-ab-btn pr-act-cancel",
                        disabled: !n.$canEdit("bills"),
                        title: n.$canEdit("bills") ? "" : "Read-only access",
                        onClick: at
                      }, [
                        e("span", {
                          innerHTML: y(q)("x", 13)
                        }, null, 8, cl),
                        t[31] || (t[31] = f(" Cancel RFQ ", -1))
                      ], 8, ul)) : b("", !0)
                    ]),
                    e("button", {
                      class: "inv-dclose",
                      onClick: t[6] || (t[6] = (s) => K.value = !1)
                    }, [
                      e("span", {
                        innerHTML: y(q)("x", 16)
                      }, null, 8, pl)
                    ])
                  ])
                ]),
                e("div", vl, [
                  e("div", ml, [
                    t[38] || (t[38] = e("div", { class: "pr-view-card-hdr" }, "Request Details", -1)),
                    e("div", _l, [
                      e("div", fl, [
                        t[32] || (t[32] = e("div", { class: "pr-info-lbl" }, "Material Request", -1)),
                        e("div", yl, [
                          W(Ae, {
                            doctype: "Material Request",
                            name: u.value.material_request
                          }, null, 8, ["name"])
                        ])
                      ]),
                      e("div", bl, [
                        t[33] || (t[33] = e("div", { class: "pr-info-lbl" }, "Project", -1)),
                        e("div", {
                          class: E(["pr-info-val", { "pr-info-empty": !u.value.project }])
                        }, l(u.value.project || "—"), 3)
                      ]),
                      e("div", hl, [
                        t[34] || (t[34] = e("div", { class: "pr-info-lbl" }, "RFQ Date", -1)),
                        e("div", gl, l(u.value.posting_date || "—"), 1)
                      ]),
                      e("div", ql, [
                        t[35] || (t[35] = e("div", { class: "pr-info-lbl" }, "Respond By", -1)),
                        e("div", kl, l(u.value.respond_by || "—"), 1)
                      ]),
                      e("div", $l, [
                        t[36] || (t[36] = e("div", { class: "pr-info-lbl" }, "Delivery Warehouse", -1)),
                        e("div", {
                          class: E(["pr-info-val", { "pr-info-empty": !u.value.delivery_warehouse }])
                        }, l(u.value.delivery_warehouse || "—"), 3)
                      ]),
                      u.value.message ? (i(), o("div", wl, [
                        t[37] || (t[37] = e("div", { class: "pr-info-lbl" }, "Message to Suppliers", -1)),
                        e("div", xl, l(u.value.message), 1)
                      ])) : b("", !0)
                    ])
                  ]),
                  e("div", Sl, [
                    e("div", Cl, [
                      t[39] || (t[39] = f(" Suppliers ", -1)),
                      e("span", Tl, l(Se(u.value)) + " of " + l((u.value.suppliers || []).length) + " sent", 1)
                    ]),
                    e("table", Rl, [
                      e("thead", null, [
                        e("tr", null, [
                          t[40] || (t[40] = e("th", { style: { width: "32px" } }, "#", -1)),
                          t[41] || (t[41] = e("th", null, "Supplier", -1)),
                          t[42] || (t[42] = e("th", null, "Email", -1)),
                          t[43] || (t[43] = e("th", { style: { width: "90px" } }, "Status", -1)),
                          t[44] || (t[44] = e("th", { style: { width: "150px" } }, "Sent On", -1)),
                          t[45] || (t[45] = e("th", { style: { width: "190px" } }, "Quotation", -1)),
                          ge(u.value, n.$canEdit("bills")) ? (i(), o("th", Ml, "Actions")) : b("", !0)
                        ])
                      ]),
                      e("tbody", null, [
                        (i(!0), o(C, null, D(u.value.suppliers || [], (s, g) => (i(), o("tr", {
                          key: s.name || g,
                          class: "inv-row"
                        }, [
                          e("td", Ll, l(g + 1), 1),
                          e("td", Ql, l(s.supplier_name || s.supplier), 1),
                          e("td", Hl, l(s.email_id || "—"), 1),
                          e("td", null, [
                            e("span", {
                              class: E(["inv-status-badge", xe(s.send_status)])
                            }, l(s.send_status || "Pending"), 3),
                            s.send_status === "Failed" && s.send_error ? (i(), o("div", Vl, l(s.send_error), 1)) : b("", !0)
                          ]),
                          e("td", El, l(s.sent_on ? String(s.sent_on).slice(0, 16) : "—"), 1),
                          e("td", null, [
                            s.quotation ? (i(), o(C, { key: 0 }, [
                              e("div", Dl, l(s.quotation), 1),
                              e("div", Al, l(s.quoted_on || ""), 1)
                            ], 64)) : (i(), o("span", Nl, "Not quoted"))
                          ]),
                          ge(u.value, n.$canEdit("bills")) ? (i(), o("td", {
                            key: 0,
                            onClick: t[7] || (t[7] = j(() => {
                            }, ["stop"]))
                          }, [
                            e("div", jl, [
                              s.quotation ? (i(), o("button", {
                                key: 0,
                                class: "inv-act-btn",
                                title: "View quoted prices",
                                onClick: (m) => tt(s)
                              }, [
                                e("span", {
                                  innerHTML: y(q)("eye", 12)
                                }, null, 8, Ul)
                              ], 8, Fl)) : b("", !0),
                              Qe(u.value) && n.$canEdit("bills") ? (i(), o(C, { key: 1 }, [
                                s.quotation ? (i(), o(C, { key: 1 }, [
                                  e("button", {
                                    class: "inv-ab-btn",
                                    onClick: (m) => He(s)
                                  }, "Revise", 8, Ol),
                                  e("button", {
                                    class: "inv-ab-btn pr-act-cancel",
                                    onClick: (m) => nt(s)
                                  }, "Cancel", 8, Il)
                                ], 64)) : (i(), o("button", {
                                  key: 0,
                                  class: "inv-ab-btn inv-ab-primary",
                                  onClick: (m) => He(s)
                                }, "Enter Quotation", 8, Pl))
                              ], 64)) : b("", !0)
                            ])
                          ])) : b("", !0)
                        ]))), 128)),
                        (u.value.suppliers || []).length ? b("", !0) : (i(), o("tr", zl, [
                          e("td", {
                            colspan: ge(u.value, n.$canEdit("bills")) ? 7 : 6,
                            style: { "text-align": "center", padding: "24px", color: "#9ca3af", "font-size": "13px" }
                          }, "No suppliers added", 8, Bl)
                        ]))
                      ])
                    ]),
                    (u.value.suppliers || []).length < 1 && u.value.status !== "Cancelled" ? (i(), o("div", Kl, " At least 1 supplier is needed before this can be sent. ")) : b("", !0)
                  ]),
                  e("div", Gl, [
                    e("div", Yl, [
                      t[46] || (t[46] = f("Items ", -1)),
                      e("span", Wl, l((u.value.items || []).length) + " line" + l((u.value.items || []).length !== 1 ? "s" : ""), 1)
                    ]),
                    e("table", Jl, [
                      t[47] || (t[47] = e("thead", null, [
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
                        (i(!0), o(C, null, D(u.value.items || [], (s, g) => (i(), o("tr", {
                          key: s.name || g,
                          class: "inv-row"
                        }, [
                          e("td", Xl, l(g + 1), 1),
                          e("td", Zl, l(s.item_name || s.item_code), 1),
                          e("td", ea, l(s.qty), 1),
                          e("td", ta, l(s.uom || "—"), 1)
                        ]))), 128))
                      ])
                    ])
                  ])
                ]),
                u.value.owner ? (i(), o("div", sa, [
                  f(" Created by " + l(y(Ne)(u.value.owner)) + " on " + l(y(ce)(u.value.creation)) + " ", 1),
                  u.value.modified_by ? (i(), o(C, { key: 0 }, [
                    f(" · Last modified by " + l(y(Ne)(u.value.modified_by)) + " on " + l(y(ce)(u.value.modified)), 1)
                  ], 64)) : b("", !0)
                ])) : b("", !0)
              ], 64)) : b("", !0)
            ])
          ])) : b("", !0),
          W(qs, {
            open: J.open,
            rfq: J.rfq,
            supplier: J.supplier,
            "supplier-name": J.supplier_name,
            onClose: t[9] || (t[9] = (s) => J.open = !1),
            onSaved: st
          }, null, 8, ["open", "rfq", "supplier", "supplier-name"]),
          W(fn, {
            open: le.open,
            quotation: le.name,
            "supplier-name": le.supplier_name,
            onClose: t[10] || (t[10] = (s) => le.open = !1)
          }, null, 8, ["open", "quotation", "supplier-name"]),
          U.value ? (i(), o("div", {
            key: 1,
            class: "inv-drawer-bg",
            onClick: t[24] || (t[24] = j((s) => d.value ? U.value = !1 : null, ["self"]))
          }, [
            e("div", {
              class: E(["inv-drawer-panel", { "is-add": !d.value }])
            }, [
              e("div", na, [
                e("div", la, [
                  e("div", aa, l(d.value ? "Edit Request for Quotation" : "New Request for Quotation"), 1),
                  d.value ? (i(), o("span", oa, l(d.value), 1)) : (i(), o("span", ia, "Draft"))
                ]),
                e("button", {
                  class: "inv-dclose",
                  onClick: t[11] || (t[11] = (s) => U.value = !1)
                }, [
                  e("span", {
                    innerHTML: y(q)("x", 16)
                  }, null, 8, da)
                ])
              ]),
              e("div", ra, [
                e("div", ua, [
                  e("div", ca, [
                    e("div", {
                      class: "add-card-header",
                      onClick: t[12] || (t[12] = (s) => z.details = !z.details)
                    }, [
                      e("div", pa, [
                        e("span", va, [
                          e("span", {
                            innerHTML: y(q)("file", 16)
                          }, null, 8, ma)
                        ]),
                        t[48] || (t[48] = f(" Request Details", -1))
                      ])
                    ]),
                    e("div", {
                      class: E(["add-card-body", { collapsed: z.details }])
                    }, [
                      e("div", _a, [
                        e("div", fa, [
                          t[49] || (t[49] = e("label", { class: "inv-lbl" }, [
                            f("Material Request (MRN) "),
                            e("span", { class: "inv-req" }, "*")
                          ], -1)),
                          W(De, {
                            modelValue: p.material_request,
                            "onUpdate:modelValue": t[13] || (t[13] = (s) => p.material_request = s),
                            options: a.value,
                            disabled: !!d.value,
                            placeholder: "Select an Approved MRN…",
                            onSearch: Ce,
                            onSelect: Ye
                          }, null, 8, ["modelValue", "options", "disabled"]),
                          t[50] || (t[50] = e("div", { class: "exp-field-hint" }, "Only Approved or Partly Issued Purchase requests can have a quotation request.", -1))
                        ]),
                        e("div", null, [
                          t[51] || (t[51] = e("label", { class: "inv-lbl" }, [
                            f("Entry Date "),
                            e("span", { class: "inv-req" }, "*")
                          ], -1)),
                          R(e("input", {
                            class: "inv-fi",
                            type: "date",
                            "onUpdate:modelValue": t[14] || (t[14] = (s) => p.entry_date = s)
                          }, null, 512), [
                            [Q, p.entry_date]
                          ])
                        ]),
                        e("div", null, [
                          t[52] || (t[52] = e("label", { class: "inv-lbl" }, [
                            f("RFQ Date "),
                            e("span", { class: "inv-req" }, "*")
                          ], -1)),
                          R(e("input", {
                            class: "inv-fi",
                            type: "date",
                            "onUpdate:modelValue": t[15] || (t[15] = (s) => p.posting_date = s)
                          }, null, 512), [
                            [Q, p.posting_date]
                          ])
                        ]),
                        e("div", null, [
                          t[53] || (t[53] = e("label", { class: "inv-lbl" }, "Respond By", -1)),
                          R(e("input", {
                            class: "inv-fi",
                            type: "date",
                            "onUpdate:modelValue": t[16] || (t[16] = (s) => p.respond_by = s)
                          }, null, 512), [
                            [Q, p.respond_by]
                          ])
                        ]),
                        e("div", null, [
                          t[54] || (t[54] = e("label", { class: "inv-lbl" }, "Project", -1)),
                          e("input", {
                            class: "inv-fi",
                            value: p.project || "—",
                            readonly: "",
                            tabindex: "-1",
                            style: { background: "#f3f4f6", color: "#6b7280" }
                          }, null, 8, ya)
                        ]),
                        e("div", null, [
                          t[55] || (t[55] = e("label", { class: "inv-lbl" }, "Delivery Warehouse", -1)),
                          e("input", {
                            class: "inv-fi",
                            value: p.delivery_warehouse || "—",
                            readonly: "",
                            tabindex: "-1",
                            style: { background: "#f3f4f6", color: "#6b7280" }
                          }, null, 8, ba)
                        ]),
                        e("div", ha, [
                          t[56] || (t[56] = e("label", { class: "inv-lbl" }, "Message to Suppliers", -1)),
                          R(e("textarea", {
                            class: "inv-fi",
                            "onUpdate:modelValue": t[17] || (t[17] = (s) => p.message = s),
                            rows: "2",
                            maxlength: "500",
                            placeholder: "Optional note added to the email",
                            style: { resize: "vertical" }
                          }, null, 512), [
                            [Q, p.message]
                          ])
                        ])
                      ])
                    ], 2)
                  ]),
                  e("div", ga, [
                    e("div", {
                      class: "add-card-header",
                      onClick: t[18] || (t[18] = (s) => z.items = !z.items)
                    }, [
                      e("div", qa, [
                        e("span", ka, [
                          e("span", {
                            innerHTML: y(q)("box", 16)
                          }, null, 8, $a)
                        ]),
                        t[57] || (t[57] = f(" Items ", -1)),
                        t[58] || (t[58] = e("span", { class: "inv-req" }, "*", -1)),
                        e("span", wa, " · " + l(p.items.length) + " line" + l(p.items.length !== 1 ? "s" : ""), 1)
                      ])
                    ]),
                    e("div", {
                      class: E(["add-card-body", { collapsed: z.items }]),
                      style: { padding: "16px 16px 8px" }
                    }, [
                      $e.value ? (i(), o("div", xa, "Items can't be changed after the request was sent. You can still add suppliers and send again.")) : b("", !0),
                      e("div", Sa, [
                        (i(!0), o(C, null, D(p.items, (s, g) => (i(), o("div", {
                          key: s._id,
                          class: "po-item-card"
                        }, [
                          e("div", Ca, [
                            e("span", Ta, "#" + l(g + 1), 1),
                            e("span", Ra, l(s.item_name || s.item_code), 1),
                            e("div", Ma, [
                              t[59] || (t[59] = e("span", { class: "po-item-card-subtotal-label" }, "QTY", -1)),
                              e("span", La, l(s.qty || "—"), 1)
                            ]),
                            $e.value ? b("", !0) : (i(), o("button", {
                              key: 0,
                              class: "po-item-card-rm",
                              onClick: j((m) => Je(g), ["stop"])
                            }, [
                              e("span", {
                                innerHTML: y(q)("x", 16)
                              }, null, 8, Ha)
                            ], 8, Qa))
                          ]),
                          e("div", Va, [
                            e("div", Ea, [
                              e("div", Da, [
                                e("div", Aa, [
                                  t[60] || (t[60] = e("label", null, [
                                    f("Qty "),
                                    e("span", { class: "inv-req" }, "*")
                                  ], -1)),
                                  R(e("input", {
                                    class: "inv-fi",
                                    type: "number",
                                    "onUpdate:modelValue": (m) => s.qty = m,
                                    min: "0.01",
                                    max: s.pending_qty ?? void 0,
                                    step: "0.01",
                                    disabled: "",
                                    title: "Quantity comes from the material request and can't be changed here"
                                  }, null, 8, Na), [
                                    [
                                      Q,
                                      s.qty,
                                      void 0,
                                      { number: !0 }
                                    ]
                                  ]),
                                  s.pending_qty != null ? (i(), o("div", ja, "Pending on MRN: " + l(s.pending_qty) + " " + l(s.uom), 1)) : b("", !0)
                                ]),
                                e("div", Fa, [
                                  t[61] || (t[61] = e("label", null, "UOM", -1)),
                                  e("input", {
                                    class: "inv-fi",
                                    value: s.uom || "—",
                                    readonly: "",
                                    tabindex: "-1",
                                    style: { background: "#f3f4f6", color: "#6b7280" }
                                  }, null, 8, Ua)
                                ])
                              ])
                            ])
                          ])
                        ]))), 128))
                      ]),
                      p.items.length ? b("", !0) : (i(), o("div", Pa, "Pick a Material Request to load its items."))
                    ], 2)
                  ]),
                  e("div", Oa, [
                    e("div", {
                      class: "add-card-header",
                      onClick: t[20] || (t[20] = (s) => z.suppliers = !z.suppliers)
                    }, [
                      e("div", Ia, [
                        e("span", za, [
                          e("span", {
                            innerHTML: y(q)("truck", 16)
                          }, null, 8, Ba)
                        ]),
                        t[62] || (t[62] = f(" Suppliers ", -1)),
                        t[63] || (t[63] = e("span", { class: "inv-req" }, "*", -1)),
                        e("span", Ka, " · " + l(p.suppliers.length) + " of at least 1", 1)
                      ]),
                      e("div", {
                        style: { display: "flex", "align-items": "center", gap: "8px" },
                        onClick: t[19] || (t[19] = j(() => {
                        }, ["stop"]))
                      }, [
                        e("button", {
                          class: "add-lines-add-btn",
                          onClick: Xe
                        }, [
                          e("span", {
                            innerHTML: y(q)("plus", 13)
                          }, null, 8, Ga),
                          t[64] || (t[64] = f(" Add Supplier", -1))
                        ])
                      ])
                    ]),
                    e("div", {
                      class: E(["add-card-body", { collapsed: z.suppliers }]),
                      style: { padding: "16px 16px 8px" }
                    }, [
                      e("div", Ya, [
                        (i(!0), o(C, null, D(p.suppliers, (s, g) => (i(), o("div", {
                          key: s._id,
                          class: "po-item-card"
                        }, [
                          e("div", Wa, [
                            e("span", Ja, "#" + l(g + 1), 1),
                            e("span", Xa, l(s.supplier_name || s.supplier || "Supplier"), 1),
                            s.send_status && s.send_status !== "Pending" ? (i(), o("span", {
                              key: 0,
                              class: E(["inv-status-badge", xe(s.send_status)])
                            }, l(s.send_status), 3)) : b("", !0),
                            e("button", {
                              class: "po-item-card-rm",
                              onClick: j((m) => Ze(g), ["stop"])
                            }, [
                              e("span", {
                                innerHTML: y(q)("x", 16)
                              }, null, 8, ei)
                            ], 8, Za)
                          ]),
                          e("div", ti, [
                            e("div", si, [
                              e("div", ni, [
                                t[65] || (t[65] = e("label", null, [
                                  f("Supplier "),
                                  e("span", { class: "inv-req" }, "*")
                                ], -1)),
                                W(De, {
                                  modelValue: s.supplier,
                                  "onUpdate:modelValue": (m) => s.supplier = m,
                                  options: Y.value,
                                  placeholder: "Search supplier…",
                                  onSearch: he,
                                  onSelect: (m) => Ge(s, m)
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "onSelect"])
                              ])
                            ]),
                            e("div", li, [
                              e("div", ai, [
                                t[66] || (t[66] = e("label", null, [
                                  f("Email "),
                                  e("span", { class: "inv-req" }, "*")
                                ], -1)),
                                R(e("input", {
                                  class: "inv-fi",
                                  type: "email",
                                  "onUpdate:modelValue": (m) => s.email_id = m,
                                  placeholder: "supplier@example.com"
                                }, null, 8, ii), [
                                  [Q, s.email_id]
                                ])
                              ])
                            ])
                          ])
                        ]))), 128))
                      ]),
                      p.suppliers.length ? b("", !0) : (i(), o("div", oi, "No suppliers yet — click Add Supplier."))
                    ], 2)
                  ])
                ])
              ]),
              e("div", di, [
                e("div", ri, l(d.value ? "Editing: " + d.value : "New RFQ — unsaved changes"), 1),
                e("div", ui, [
                  e("button", {
                    class: "add-btn-cancel",
                    onClick: t[21] || (t[21] = (s) => U.value = !1),
                    disabled: I.value
                  }, "Cancel", 8, ci),
                  e("button", {
                    class: "add-btn-draft",
                    onClick: t[22] || (t[22] = (s) => Le(!1)),
                    disabled: I.value || !(d.value ? n.$canEdit("bills") : L.value)
                  }, [
                    e("span", {
                      innerHTML: y(q)("save", 13)
                    }, null, 8, vi),
                    f(" " + l(I.value ? "Saving…" : "Save"), 1)
                  ], 8, pi),
                  e("button", {
                    class: "add-btn-more",
                    onClick: t[23] || (t[23] = (s) => Le(!0)),
                    disabled: I.value || !(d.value ? n.$canEdit("bills") : L.value),
                    title: "Save, then email every supplier"
                  }, [
                    e("span", {
                      innerHTML: y(q)("send", 13)
                    }, null, 8, _i),
                    f(" " + l(I.value ? "Saving…" : "Save & Send"), 1)
                  ], 8, mi)
                ])
              ])
            ], 2)
          ])) : b("", !0)
        ]))
      ]);
    };
  }
}, Si = /* @__PURE__ */ ot(yi, [["__scopeId", "data-v-3e0ef9e8"]]);
export {
  Si as default
};
