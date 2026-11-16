import { _ as oe, y as ie, o as de, c as i, a as e, u, i as _, w as V, B as R, F as h, r as y, d as p, b, D as re, E as j, G as ce, T as ue, J as pe, f as M, h as f, g as S, A as me, k as o, n as x, t as c, p as _e, x as Y, v as he, K as ye, e as be, L as ve, a3 as fe } from "./main-Crt3ufHH.js";
import { _ as Te } from "./SearchableSelect-D14z5m-i.js";
import { o as K } from "./userNames-IADrr2ot.js";
import { b as J } from "./format-BcJZDVG4.js";
const xe = { class: "list-page" }, ke = { class: "sales-toolbar" }, we = { class: "sales-search" }, Ce = ["innerHTML"], ge = { class: "sales-pills" }, Ae = ["onClick"], Le = {
  key: 0,
  class: "sales-pill-count"
}, Ve = { class: "sales-actions" }, Me = ["innerHTML"], Se = ["disabled", "title"], Ne = ["innerHTML"], $e = { class: "inv-table-wrap" }, He = { class: "inv-table" }, De = ["onClick"], Ee = {
  "data-label": "Template",
  class: "td-id"
}, Re = { class: "inv-link" }, Be = { "data-label": "Type" }, Oe = {
  "data-label": "Components",
  class: "text-muted",
  style: { "font-size": "12px" }
}, Ue = {
  "data-label": "Rate",
  class: "ta-r"
}, Pe = { "data-label": "Applies To" }, Ie = { "data-label": "Default" }, ze = {
  key: 0,
  class: "inv-status-badge status-active"
}, Fe = {
  key: 1,
  class: "text-muted"
}, Ge = { "data-label": "Status" }, qe = ["onClick", "title"], je = ["innerHTML"], Ye = ["onClick"], Ke = ["innerHTML"], Je = { key: 0 }, Qe = {
  colspan: "7",
  class: "bk-empty-state"
}, We = { class: "bk-empty-inner" }, Xe = ["innerHTML"], Ze = { class: "tt-drawer" }, et = { class: "tt-hdr" }, tt = { class: "tt-hdr-left" }, st = { class: "tt-badge" }, at = ["innerHTML"], lt = { class: "tt-title" }, nt = ["innerHTML"], ot = { class: "tt-body" }, it = {
  class: "tt-field",
  style: { "margin-bottom": "16px" }
}, dt = ["placeholder", "disabled"], rt = {
  class: "tt-field",
  style: { "margin-bottom": "16px" }
}, ct = { class: "tt-pills" }, ut = ["onClick"], pt = {
  class: "tt-field",
  style: { "margin-bottom": "6px" }
}, mt = { class: "tt-pills" }, _t = ["onClick"], ht = { class: "tt-section" }, yt = { class: "tt-add-menu" }, bt = ["onClick"], vt = ["innerHTML"], ft = {
  key: 0,
  class: "tt-rows-head"
}, Tt = ["onUpdate:modelValue"], xt = ["value"], kt = ["onUpdate:modelValue"], wt = ["onClick"], Ct = ["innerHTML"], gt = {
  key: 1,
  class: "tt-norows"
}, At = {
  class: "tt-grid2",
  style: { "margin-top": "20px" }
}, Lt = { class: "tt-check" }, Vt = ["checked"], Mt = { class: "tt-check" }, St = ["checked"], Nt = {
  key: 2,
  class: "inv-view-footer"
}, $t = { class: "tt-foot" }, Ht = ["disabled", "title"], Dt = ["innerHTML"], Et = {
  __name: "TaxTemplates",
  setup(Rt) {
    const { toast: v } = ie(), { confirm: Q } = fe(), W = ["All", "VAT", "Custom"], B = {
      VAT: ["VAT"],
      Custom: ["VAT", "Other"]
    }, O = /* @__PURE__ */ new Set(["CGST", "SGST"]), U = /* @__PURE__ */ new Set(["IGST"]), P = /* @__PURE__ */ new Set(["Cess"]), k = (a) => a === "VAT" ? "VAT" : "Custom", N = f([]), $ = f(!0), H = f(""), w = f("All"), C = f([]), g = f(!1), m = f(null), T = f(!1), l = me({ template_name: "", applies_to: "Both", tax_type: "VAT", is_default: 0, disabled: 0, rows: [], owner: null, creation: null, modified_by: null, modified: null }), I = S(() => {
      const a = B[l.tax_type] || B.Custom, s = l.rows.map((t) => t.tax_type).filter((t) => t && !a.includes(t));
      return [...a, ...new Set(s)];
    }), D = (a) => Math.round(a.reduce((s, t) => s + (Number(t.rate) || 0), 0) * 100) / 100;
    function X(a) {
      const s = a.toUpperCase(), t = C.value.find((d) => (d.name || "").toUpperCase().includes(s));
      return t ? t.name : "";
    }
    function Z(a) {
      l.tax_type = a, a === "VAT" && (l.rows = l.rows.filter((s) => s.tax_type === "VAT")), a === "VAT" && !l.rows.length && E("VAT");
    }
    function E(a) {
      l.rows.push({ tax_type: a, rate: 0, account_head: X(a), description: "" });
    }
    function ee(a) {
      l.rows.splice(a, 1);
    }
    function te(a, s) {
      const t = (a || []).map((r) => ({ tax_type: r.tax_type, rate: Number(r.rate) || 0 })), d = t.filter((r) => r.rate).map((r) => `${r.tax_type} ${r.rate}%`).join(" + ");
      let n;
      return t.some((r) => O.has(r.tax_type) || U.has(r.tax_type)) ? (n = D(t.filter((r) => O.has(r.tax_type) || P.has(r.tax_type))), n || (n = D(t.filter((r) => U.has(r.tax_type) || P.has(r.tax_type))))) : n = D(t), { headlineRate: n, rateLabel: d };
    }
    async function A() {
      $.value = !0;
      try {
        const a = await M("Tax Template", {
          fields: ["name", "template_name", "tax_type", "applies_to", "is_default", "disabled", "owner", "creation", "modified_by", "modified"],
          order: "template_name asc",
          limit: 200
        }) || [], s = a.map((n) => n.name);
        let t = [];
        if (s.length)
          try {
            t = await M("Tax Template Detail", {
              fields: ["parent", "tax_type", "rate", "account_head", "description"],
              filters: [["parent", "in", s]],
              limit: s.length * 20
            }) || [];
          } catch {
            t = [];
          }
        const d = {};
        t.forEach((n) => {
          var r;
          (d[r = n.parent] || (d[r] = [])).push(n);
        }), N.value = a.map((n) => {
          const r = d[n.name] || [];
          return { ...n, ...te(r, n.tax_type), _taxes: r };
        });
      } catch (a) {
        v(a.message || "Failed to load tax templates", "error"), N.value = [];
      }
      $.value = !1;
    }
    async function se() {
      try {
        let a = await M("Account", { fields: ["name"], filters: [["account_type", "=", "Tax"], ["is_group", "=", 0]], limit: 200, order: "name asc" });
        (!a || !a.length) && (a = await M("Account", { fields: ["name"], filters: [["is_group", "=", 0]], limit: 1e5, order: "name asc" })), C.value = a || [];
      } catch {
        C.value = [];
      }
    }
    const z = S(() => N.value.filter((a) => a.applies_to !== "Sales")), ae = S(() => {
      const a = {};
      return z.value.forEach((s) => {
        const t = k(s.tax_type);
        a[t] = (a[t] || 0) + 1;
      }), a;
    }), F = S(() => {
      let a = z.value;
      w.value !== "All" && (a = a.filter((t) => k(t.tax_type) === w.value));
      const s = H.value.trim().toLowerCase();
      return s && (a = a.filter((t) => (t.template_name || "").toLowerCase().includes(s))), a;
    });
    function G() {
      m.value = null, Object.assign(l, { template_name: "", applies_to: "Both", tax_type: "VAT", is_default: 0, disabled: 0, rows: [], owner: null, creation: null, modified_by: null, modified: null }), E("VAT"), l.rows[0].rate = 16, g.value = !0;
    }
    function q(a) {
      m.value = a.name;
      const s = (a._taxes || []).map((t) => ({
        tax_type: t.tax_type || "Other",
        rate: Number(t.rate) || 0,
        account_head: t.account_head || "",
        description: t.description || ""
      }));
      Object.assign(l, {
        template_name: a.template_name,
        applies_to: a.applies_to || "Both",
        tax_type: k(a.tax_type),
        is_default: a.is_default ? 1 : 0,
        disabled: a.disabled ? 1 : 0,
        rows: s,
        owner: a.owner || null,
        creation: a.creation || null,
        modified_by: a.modified_by || null,
        modified: a.modified || null
      }), g.value = !0;
    }
    function L() {
      g.value = !1, m.value = null;
    }
    async function le() {
      if (!l.template_name.trim()) {
        v("Template name is required", "error");
        return;
      }
      const a = l.rows.filter((s) => Number(s.rate) > 0);
      if (l.tax_type !== "Custom" && !a.length) {
        v("Add at least one component with a rate", "error");
        return;
      }
      T.value = !0;
      try {
        const s = await be();
        if (!s) {
          v("No company configured.", "error"), T.value = !1;
          return;
        }
        const t = a.map((n) => ({
          doctype: "Tax Template Detail",
          tax_type: n.tax_type,
          rate: Number(n.rate) || 0,
          account_head: n.account_head || "",
          description: n.description || `${n.tax_type} @ ${Number(n.rate) || 0}%`
        })), d = {
          doctype: "Tax Template",
          template_name: l.template_name.trim(),
          company: s,
          tax_type: l.tax_type,
          applies_to: l.applies_to || "Both",
          is_default: l.is_default,
          disabled: l.disabled,
          taxes: t
        };
        m.value && (d.name = m.value), await ve(d), v(m.value ? "Tax template updated" : "Tax template created"), L(), await A();
      } catch (s) {
        v("Error: " + (s.message || s), "error");
      }
      T.value = !1;
    }
    async function ne(a) {
      if (await Q({ title: "Delete Tax Template?", body: `"${a.template_name}" will be permanently removed.`, okLabel: "Delete", cancelLabel: "Keep it", okStyle: "danger" }))
        try {
          await ye("frappe.client.delete", { doctype: "Tax Template", name: a.name }), v("Deleted"), await A();
        } catch (t) {
          v("Error: " + (t.message || t), "error");
        }
    }
    return de(() => {
      A(), se();
    }), (a, s) => (o(), i("div", xe, [
      e("div", ke, [
        e("div", we, [
          e("span", {
            innerHTML: u(_)("search", 14)
          }, null, 8, Ce),
          V(e("input", {
            "onUpdate:modelValue": s[0] || (s[0] = (t) => H.value = t),
            class: "sales-search-input",
            placeholder: "Search tax templates…"
          }, null, 512), [
            [R, H.value]
          ])
        ]),
        e("div", ge, [
          (o(), i(h, null, y(W, (t) => e("button", {
            key: t,
            class: x(["sales-pill", { active: w.value === t }]),
            onClick: (d) => w.value = t
          }, [
            p(c(t), 1),
            t !== "All" ? (o(), i("span", Le, c(ae.value[t] || 0), 1)) : b("", !0)
          ], 10, Ae)), 64))
        ]),
        e("div", Ve, [
          e("button", {
            class: "sales-btn-ghost",
            onClick: A,
            title: "Refresh"
          }, [
            e("span", {
              innerHTML: u(_)("refresh", 14)
            }, null, 8, Me)
          ]),
          e("button", {
            class: "sales-btn-primary",
            onClick: G,
            disabled: !a.$canCreate("taxes"),
            title: a.$canCreate("taxes") ? "" : "Read-only access"
          }, [
            e("span", {
              innerHTML: u(_)("plus", 13)
            }, null, 8, Ne),
            s[5] || (s[5] = p(" New Template ", -1))
          ], 8, Se)
        ])
      ]),
      e("div", $e, [
        e("table", He, [
          s[11] || (s[11] = e("thead", null, [
            e("tr", null, [
              e("th", null, "Template"),
              e("th", null, "Type"),
              e("th", null, "Components"),
              e("th", { class: "ta-r" }, "Rate"),
              e("th", null, "Applies To"),
              e("th", null, "Default"),
              e("th", null, "Status"),
              e("th", { style: { width: "90px" } })
            ])
          ], -1)),
          e("tbody", null, [
            $.value ? (o(), i(h, { key: 0 }, y(5, (t) => e("tr", {
              key: "s" + t,
              class: "shimmer-row"
            }, [
              (o(), i(h, null, y(8, (d) => e("td", { key: d }, [...s[6] || (s[6] = [
                e("div", {
                  class: "shimmer",
                  style: { width: "80%" }
                }, null, -1)
              ])])), 64))
            ])), 64)) : (o(), i(h, { key: 1 }, [
              (o(!0), i(h, null, y(F.value, (t) => (o(), i("tr", {
                key: t.name,
                class: "inv-row",
                onClick: (d) => q(t)
              }, [
                e("td", Ee, [
                  e("span", Re, c(t.template_name), 1)
                ]),
                e("td", Be, c(k(t.tax_type)), 1),
                e("td", Oe, c(t.rateLabel || "—"), 1),
                e("td", Ue, c(t.headlineRate != null ? t.headlineRate + "%" : "—"), 1),
                e("td", Pe, [
                  e("span", {
                    class: x(["inv-status-badge", t.applies_to === "Sales" ? "status-active" : t.applies_to === "Purchase" ? "status-inactive" : ""]),
                    style: _e(t.applies_to === "Both" ? "background:#EEF1F6;color:var(--bx-muted)" : "")
                  }, c(t.applies_to || "Both"), 7)
                ]),
                e("td", Ie, [
                  t.is_default ? (o(), i("span", ze, "Default")) : (o(), i("span", Fe, "—"))
                ]),
                e("td", Ge, [
                  e("span", {
                    class: x(["inv-status-badge", t.disabled ? "status-inactive" : "status-active"])
                  }, c(t.disabled ? "Disabled" : "Active"), 3)
                ]),
                e("td", {
                  "data-label": "",
                  onClick: s[1] || (s[1] = Y(() => {
                  }, ["stop"]))
                }, [
                  e("button", {
                    class: "inv-act-btn",
                    onClick: (d) => q(t),
                    title: a.$canEdit("taxes") ? "Edit" : "View"
                  }, [
                    e("span", {
                      innerHTML: u(_)(a.$canEdit("taxes") ? "edit" : "eye", 14)
                    }, null, 8, je)
                  ], 8, qe),
                  a.$canDelete("taxes") ? (o(), i("button", {
                    key: 0,
                    class: "inv-act-btn",
                    onClick: (d) => ne(t),
                    style: { "margin-left": "6px", color: "#dc2626" },
                    title: "Delete"
                  }, [
                    e("span", {
                      innerHTML: u(_)("trash", 14)
                    }, null, 8, Ke)
                  ], 8, Ye)) : b("", !0)
                ])
              ], 8, De))), 128)),
              F.value.length ? b("", !0) : (o(), i("tr", Je, [
                e("td", Qe, [
                  e("div", We, [
                    s[8] || (s[8] = e("div", {
                      class: "bk-empty-illus",
                      style: { "font-size": "34px" }
                    }, "🧾", -1)),
                    s[9] || (s[9] = e("p", { class: "bk-empty-title" }, "No tax templates", -1)),
                    s[10] || (s[10] = e("p", { class: "bk-empty-sub" }, "Create a VAT template to apply on invoices and bills.", -1)),
                    a.$canCreate("taxes") ? (o(), i("button", {
                      key: 0,
                      class: "bk-empty-btn",
                      onClick: G
                    }, [
                      e("span", {
                        innerHTML: u(_)("plus", 13)
                      }, null, 8, Xe),
                      s[7] || (s[7] = p(" New Template", -1))
                    ])) : b("", !0)
                  ])
                ])
              ]))
            ], 64))
          ])
        ])
      ]),
      (o(), re(pe, { to: "body" }, [
        j(ue, { name: "tt-drawer" }, {
          default: ce(() => [
            g.value ? (o(), i("div", {
              key: 0,
              class: "tt-bg",
              onClick: Y(L, ["self"])
            }, [
              e("div", Ze, [
                e("div", et, [
                  e("div", tt, [
                    e("div", st, [
                      e("span", {
                        innerHTML: u(_)("percent", 18)
                      }, null, 8, at)
                    ]),
                    e("div", null, [
                      e("div", lt, c(m.value ? "Edit Tax Template" : "New Tax Template"), 1),
                      s[12] || (s[12] = e("div", { class: "tt-sub" }, "Applied to invoice & bill line items", -1))
                    ])
                  ]),
                  e("button", {
                    class: "tt-x",
                    onClick: L
                  }, [
                    e("span", {
                      innerHTML: u(_)("x", 16)
                    }, null, 8, nt)
                  ])
                ]),
                e("div", ot, [
                  e("div", it, [
                    s[13] || (s[13] = e("label", { class: "tt-label" }, [
                      p("Template Name "),
                      e("span", { class: "tt-req" }, "*")
                    ], -1)),
                    V(e("input", {
                      "onUpdate:modelValue": s[2] || (s[2] = (t) => l.template_name = t),
                      class: "b-input",
                      placeholder: l.tax_type === "VAT" ? "e.g. VAT 16%" : "e.g. Excise Duty 10%",
                      disabled: !!m.value
                    }, null, 8, dt), [
                      [R, l.template_name]
                    ])
                  ]),
                  e("div", rt, [
                    s[14] || (s[14] = e("label", { class: "tt-label" }, [
                      p("Applies To "),
                      e("span", { class: "tt-req" }, "*")
                    ], -1)),
                    e("div", ct, [
                      (o(), i(h, null, y(["Sales", "Purchase", "Both"], (t) => e("button", {
                        key: t,
                        type: "button",
                        class: x(["tt-pill", { active: l.applies_to === t }]),
                        onClick: (d) => l.applies_to = t
                      }, c(t), 11, ut)), 64))
                    ]),
                    s[15] || (s[15] = e("div", {
                      class: "text-muted",
                      style: { "font-size": "12px", "margin-top": "6px" }
                    }, [
                      p(" Which documents can use this template. "),
                      e("b", null, "Sales"),
                      p(" templates should post to Payable/liability accounts and only show up on Invoices/Credit Notes/Sales Orders/Quotes. "),
                      e("b", null, "Purchase"),
                      p(" templates should post to Input VAT accounts and only show up on Bills/Debit Notes/Purchase Orders. Get this wrong and tax gets posted to the wrong side of the ledger. ")
                    ], -1))
                  ]),
                  e("div", pt, [
                    s[16] || (s[16] = e("label", { class: "tt-label" }, "Tax Regime", -1)),
                    e("div", mt, [
                      (o(), i(h, null, y(["VAT", "Custom"], (t) => e("button", {
                        key: t,
                        type: "button",
                        class: x(["tt-pill", { active: l.tax_type === t }]),
                        onClick: (d) => Z(t)
                      }, c(t), 11, _t)), 64))
                    ])
                  ]),
                  e("div", ht, [
                    s[17] || (s[17] = e("span", { class: "tt-section-title" }, "Tax Components", -1)),
                    e("div", yt, [
                      (o(!0), i(h, null, y(I.value, (t) => (o(), i("button", {
                        key: t,
                        class: "tt-add-chip",
                        onClick: (d) => E(t)
                      }, [
                        e("span", {
                          innerHTML: u(_)("plus", 11)
                        }, null, 8, vt),
                        p(c(t), 1)
                      ], 8, bt))), 128))
                    ])
                  ]),
                  l.rows.length ? (o(), i("div", ft, [...s[18] || (s[18] = [
                    e("span", null, "Component", -1),
                    e("span", null, "Rate %", -1),
                    e("span", null, "Account head", -1),
                    e("span", null, null, -1)
                  ])])) : b("", !0),
                  (o(!0), i(h, null, y(l.rows, (t, d) => (o(), i("div", {
                    key: d,
                    class: "tt-row2"
                  }, [
                    V(e("select", {
                      "onUpdate:modelValue": (n) => t.tax_type = n,
                      class: "b-input tt-r-type"
                    }, [
                      (o(!0), i(h, null, y(I.value, (n) => (o(), i("option", {
                        key: n,
                        value: n
                      }, c(n), 9, xt))), 128))
                    ], 8, Tt), [
                      [he, t.tax_type]
                    ]),
                    V(e("input", {
                      "onUpdate:modelValue": (n) => t.rate = n,
                      type: "number",
                      min: "0",
                      step: "0.5",
                      class: "b-input tt-r-rate",
                      placeholder: "0"
                    }, null, 8, kt), [
                      [
                        R,
                        t.rate,
                        void 0,
                        { number: !0 }
                      ]
                    ]),
                    j(Te, {
                      modelValue: t.account_head,
                      "onUpdate:modelValue": (n) => t.account_head = n,
                      options: C.value,
                      "value-key": "name",
                      "label-key": "name",
                      placeholder: "Account head",
                      class: "tt-r-acct"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                    e("button", {
                      class: "tt-row-del",
                      onClick: (n) => ee(d),
                      title: "Remove"
                    }, [
                      e("span", {
                        innerHTML: u(_)("trash", 13)
                      }, null, 8, Ct)
                    ], 8, wt)
                  ]))), 128)),
                  l.rows.length ? b("", !0) : (o(), i("div", gt, c(l.tax_type === "VAT" ? "Add a VAT component (e.g. 16% standard rate)." : "Add tax components."), 1)),
                  e("div", At, [
                    e("label", Lt, [
                      e("input", {
                        type: "checkbox",
                        checked: l.is_default,
                        onChange: s[3] || (s[3] = (t) => l.is_default = t.target.checked ? 1 : 0)
                      }, null, 40, Vt),
                      s[19] || (s[19] = p(" Set as default", -1))
                    ]),
                    e("label", Mt, [
                      e("input", {
                        type: "checkbox",
                        checked: l.disabled,
                        onChange: s[4] || (s[4] = (t) => l.disabled = t.target.checked ? 1 : 0)
                      }, null, 40, St),
                      s[20] || (s[20] = p(" Disabled", -1))
                    ])
                  ]),
                  l.owner ? (o(), i("div", Nt, [
                    p(" Created by " + c(u(K)(l.owner)) + " on " + c(u(J)(l.creation)) + " ", 1),
                    l.modified_by ? (o(), i(h, { key: 0 }, [
                      p(" · Last modified by " + c(u(K)(l.modified_by)) + " on " + c(u(J)(l.modified)), 1)
                    ], 64)) : b("", !0)
                  ])) : b("", !0)
                ]),
                e("div", $t, [
                  e("button", {
                    class: "b-btn b-btn-ghost",
                    onClick: L
                  }, "Cancel"),
                  e("button", {
                    class: "tt-save",
                    onClick: le,
                    disabled: T.value || !(m.value ? a.$canEdit("taxes") : a.$canCreate("taxes")),
                    title: (m.value ? a.$canEdit("taxes") : a.$canCreate("taxes")) ? "" : "Read-only access"
                  }, [
                    e("span", {
                      innerHTML: u(_)("check", 14)
                    }, null, 8, Dt),
                    p(" " + c(T.value ? "Saving…" : m.value ? "Update" : "Create"), 1)
                  ], 8, Ht)
                ])
              ])
            ])) : b("", !0)
          ]),
          _: 1
        })
      ]))
    ]));
  }
}, It = /* @__PURE__ */ oe(Et, [["__scopeId", "data-v-ceb8b91a"]]);
export {
  It as default
};
