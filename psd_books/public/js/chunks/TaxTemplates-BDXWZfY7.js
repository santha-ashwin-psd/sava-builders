import { _ as ne, x as oe, o as ie, c as i, a as e, u, i as _, w as M, A as E, F as h, r as y, d as p, b, C as de, D as G, E as re, T as ce, H as ue, f as S, h as f, g as R, z as pe, k as o, n as x, t as c, p as me, q as j, v as _e, J as he, e as ye, K as be, a3 as ve } from "./main-mUgFUiID.js";
import { _ as fe } from "./SearchableSelect-CfwJdYCJ.js";
import { o as Y } from "./userNames-TYQzyRIC.js";
import { b as K } from "./format-BcJZDVG4.js";
const Te = { class: "list-page" }, xe = { class: "sales-toolbar" }, ke = { class: "sales-search" }, we = ["innerHTML"], Ce = { class: "sales-pills" }, ge = ["onClick"], Ae = {
  key: 0,
  class: "sales-pill-count"
}, Ve = { class: "sales-actions" }, Le = ["innerHTML"], Me = ["disabled", "title"], Se = ["innerHTML"], He = { class: "inv-table-wrap" }, Ne = { class: "inv-table" }, $e = ["onClick"], De = {
  "data-label": "Template",
  class: "td-id"
}, Ee = { class: "inv-link" }, Re = { "data-label": "Type" }, Be = {
  "data-label": "Components",
  class: "text-muted",
  style: { "font-size": "12px" }
}, Oe = {
  "data-label": "Rate",
  class: "ta-r"
}, Ue = { "data-label": "Applies To" }, Pe = { "data-label": "Default" }, ze = {
  key: 0,
  class: "inv-status-badge status-active"
}, Ie = {
  key: 1,
  class: "text-muted"
}, Fe = { "data-label": "Status" }, qe = ["onClick", "title"], Ge = ["innerHTML"], je = ["onClick"], Ye = ["innerHTML"], Ke = { key: 0 }, Je = {
  colspan: "7",
  class: "bk-empty-state"
}, Qe = { class: "bk-empty-inner" }, We = ["innerHTML"], Xe = { class: "tt-drawer" }, Ze = { class: "tt-hdr" }, et = { class: "tt-hdr-left" }, tt = { class: "tt-badge" }, st = ["innerHTML"], at = { class: "tt-title" }, lt = ["innerHTML"], nt = { class: "tt-body" }, ot = {
  class: "tt-field",
  style: { "margin-bottom": "16px" }
}, it = ["placeholder", "disabled"], dt = {
  class: "tt-field",
  style: { "margin-bottom": "16px" }
}, rt = { class: "tt-pills" }, ct = ["onClick"], ut = {
  class: "tt-field",
  style: { "margin-bottom": "6px" }
}, pt = { class: "tt-pills" }, mt = ["onClick"], _t = { class: "tt-section" }, ht = { class: "tt-add-menu" }, yt = ["onClick"], bt = ["innerHTML"], vt = {
  key: 0,
  class: "tt-rows-head"
}, ft = ["onUpdate:modelValue"], Tt = ["value"], xt = ["onUpdate:modelValue"], kt = ["onClick"], wt = ["innerHTML"], Ct = {
  key: 1,
  class: "tt-norows"
}, gt = {
  class: "tt-grid2",
  style: { "margin-top": "20px" }
}, At = { class: "tt-check" }, Vt = ["checked"], Lt = { class: "tt-check" }, Mt = ["checked"], St = {
  key: 2,
  class: "inv-view-footer"
}, Ht = { class: "tt-foot" }, Nt = ["disabled", "title"], $t = ["innerHTML"], Dt = {
  __name: "TaxTemplates",
  setup(Et) {
    const { toast: v } = oe(), { confirm: J } = ve(), Q = ["All", "VAT", "Custom"], B = {
      VAT: ["VAT"],
      Custom: ["VAT", "Other"]
    }, O = /* @__PURE__ */ new Set(["CGST", "SGST"]), U = /* @__PURE__ */ new Set(["IGST"]), P = /* @__PURE__ */ new Set(["Cess"]), k = (a) => a === "VAT" ? "VAT" : "Custom", w = f([]), H = f(!0), N = f(""), C = f("All"), g = f([]), A = f(!1), m = f(null), T = f(!1), l = pe({ template_name: "", applies_to: "Both", tax_type: "VAT", is_default: 0, disabled: 0, rows: [], owner: null, creation: null, modified_by: null, modified: null }), z = R(() => {
      const a = B[l.tax_type] || B.Custom, s = l.rows.map((t) => t.tax_type).filter((t) => t && !a.includes(t));
      return [...a, ...new Set(s)];
    }), $ = (a) => Math.round(a.reduce((s, t) => s + (Number(t.rate) || 0), 0) * 100) / 100;
    function W(a) {
      const s = a.toUpperCase(), t = g.value.find((d) => (d.name || "").toUpperCase().includes(s));
      return t ? t.name : "";
    }
    function X(a) {
      l.tax_type = a, a === "VAT" && (l.rows = l.rows.filter((s) => s.tax_type === "VAT")), a === "VAT" && !l.rows.length && D("VAT");
    }
    function D(a) {
      l.rows.push({ tax_type: a, rate: 0, account_head: W(a), description: "" });
    }
    function Z(a) {
      l.rows.splice(a, 1);
    }
    function ee(a, s) {
      const t = (a || []).map((r) => ({ tax_type: r.tax_type, rate: Number(r.rate) || 0 })), d = t.filter((r) => r.rate).map((r) => `${r.tax_type} ${r.rate}%`).join(" + ");
      let n;
      return t.some((r) => O.has(r.tax_type) || U.has(r.tax_type)) ? (n = $(t.filter((r) => O.has(r.tax_type) || P.has(r.tax_type))), n || (n = $(t.filter((r) => U.has(r.tax_type) || P.has(r.tax_type))))) : n = $(t), { headlineRate: n, rateLabel: d };
    }
    async function V() {
      H.value = !0;
      try {
        const a = await S("Tax Template", {
          fields: ["name", "template_name", "tax_type", "applies_to", "is_default", "disabled", "owner", "creation", "modified_by", "modified"],
          order: "template_name asc",
          limit: 200
        }) || [], s = a.map((n) => n.name);
        let t = [];
        if (s.length)
          try {
            t = await S("Tax Template Detail", {
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
        }), w.value = a.map((n) => {
          const r = d[n.name] || [];
          return { ...n, ...ee(r, n.tax_type), _taxes: r };
        });
      } catch (a) {
        v(a.message || "Failed to load tax templates", "error"), w.value = [];
      }
      H.value = !1;
    }
    async function te() {
      try {
        let a = await S("Account", { fields: ["name"], filters: [["account_type", "=", "Tax"], ["is_group", "=", 0]], limit: 200, order: "name asc" });
        (!a || !a.length) && (a = await S("Account", { fields: ["name"], filters: [["is_group", "=", 0]], limit: 1e5, order: "name asc" })), g.value = a || [];
      } catch {
        g.value = [];
      }
    }
    const se = R(() => {
      const a = {};
      return w.value.forEach((s) => {
        const t = k(s.tax_type);
        a[t] = (a[t] || 0) + 1;
      }), a;
    }), I = R(() => {
      let a = w.value.filter((t) => t.applies_to !== "Sales");
      C.value !== "All" && (a = a.filter((t) => k(t.tax_type) === C.value));
      const s = N.value.trim().toLowerCase();
      return s && (a = a.filter((t) => (t.template_name || "").toLowerCase().includes(s))), a;
    });
    function F() {
      m.value = null, Object.assign(l, { template_name: "", applies_to: "Both", tax_type: "VAT", is_default: 0, disabled: 0, rows: [], owner: null, creation: null, modified_by: null, modified: null }), D("VAT"), l.rows[0].rate = 16, A.value = !0;
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
      }), A.value = !0;
    }
    function L() {
      A.value = !1, m.value = null;
    }
    async function ae() {
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
        const s = await ye();
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
        m.value && (d.name = m.value), await be(d), v(m.value ? "Tax template updated" : "Tax template created"), L(), await V();
      } catch (s) {
        v("Error: " + (s.message || s), "error");
      }
      T.value = !1;
    }
    async function le(a) {
      if (await J({ title: "Delete Tax Template?", body: `"${a.template_name}" will be permanently removed.`, okLabel: "Delete", cancelLabel: "Keep it", okStyle: "danger" }))
        try {
          await he("frappe.client.delete", { doctype: "Tax Template", name: a.name }), v("Deleted"), await V();
        } catch (t) {
          v("Error: " + (t.message || t), "error");
        }
    }
    return ie(() => {
      V(), te();
    }), (a, s) => (o(), i("div", Te, [
      e("div", xe, [
        e("div", ke, [
          e("span", {
            innerHTML: u(_)("search", 14)
          }, null, 8, we),
          M(e("input", {
            "onUpdate:modelValue": s[0] || (s[0] = (t) => N.value = t),
            class: "sales-search-input",
            placeholder: "Search tax templates…"
          }, null, 512), [
            [E, N.value]
          ])
        ]),
        e("div", Ce, [
          (o(), i(h, null, y(Q, (t) => e("button", {
            key: t,
            class: x(["sales-pill", { active: C.value === t }]),
            onClick: (d) => C.value = t
          }, [
            p(c(t), 1),
            t !== "All" ? (o(), i("span", Ae, c(se.value[t] || 0), 1)) : b("", !0)
          ], 10, ge)), 64))
        ]),
        e("div", Ve, [
          e("button", {
            class: "sales-btn-ghost",
            onClick: V,
            title: "Refresh"
          }, [
            e("span", {
              innerHTML: u(_)("refresh", 14)
            }, null, 8, Le)
          ]),
          e("button", {
            class: "sales-btn-primary",
            onClick: F,
            disabled: !a.$canCreate("taxes"),
            title: a.$canCreate("taxes") ? "" : "Read-only access"
          }, [
            e("span", {
              innerHTML: u(_)("plus", 13)
            }, null, 8, Se),
            s[5] || (s[5] = p(" New Template ", -1))
          ], 8, Me)
        ])
      ]),
      e("div", He, [
        e("table", Ne, [
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
            H.value ? (o(), i(h, { key: 0 }, y(5, (t) => e("tr", {
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
              (o(!0), i(h, null, y(I.value, (t) => (o(), i("tr", {
                key: t.name,
                class: "inv-row",
                onClick: (d) => q(t)
              }, [
                e("td", De, [
                  e("span", Ee, c(t.template_name), 1)
                ]),
                e("td", Re, c(k(t.tax_type)), 1),
                e("td", Be, c(t.rateLabel || "—"), 1),
                e("td", Oe, c(t.headlineRate != null ? t.headlineRate + "%" : "—"), 1),
                e("td", Ue, [
                  e("span", {
                    class: x(["inv-status-badge", t.applies_to === "Sales" ? "status-active" : t.applies_to === "Purchase" ? "status-inactive" : ""]),
                    style: me(t.applies_to === "Both" ? "background:#EEF1F6;color:var(--bx-muted)" : "")
                  }, c(t.applies_to || "Both"), 7)
                ]),
                e("td", Pe, [
                  t.is_default ? (o(), i("span", ze, "Default")) : (o(), i("span", Ie, "—"))
                ]),
                e("td", Fe, [
                  e("span", {
                    class: x(["inv-status-badge", t.disabled ? "status-inactive" : "status-active"])
                  }, c(t.disabled ? "Disabled" : "Active"), 3)
                ]),
                e("td", {
                  "data-label": "",
                  onClick: s[1] || (s[1] = j(() => {
                  }, ["stop"]))
                }, [
                  e("button", {
                    class: "inv-act-btn",
                    onClick: (d) => q(t),
                    title: a.$canEdit("taxes") ? "Edit" : "View"
                  }, [
                    e("span", {
                      innerHTML: u(_)(a.$canEdit("taxes") ? "edit" : "eye", 14)
                    }, null, 8, Ge)
                  ], 8, qe),
                  a.$canDelete("taxes") ? (o(), i("button", {
                    key: 0,
                    class: "inv-act-btn",
                    onClick: (d) => le(t),
                    style: { "margin-left": "6px", color: "#dc2626" },
                    title: "Delete"
                  }, [
                    e("span", {
                      innerHTML: u(_)("trash", 14)
                    }, null, 8, Ye)
                  ], 8, je)) : b("", !0)
                ])
              ], 8, $e))), 128)),
              I.value.length ? b("", !0) : (o(), i("tr", Ke, [
                e("td", Je, [
                  e("div", Qe, [
                    s[8] || (s[8] = e("div", {
                      class: "bk-empty-illus",
                      style: { "font-size": "34px" }
                    }, "🧾", -1)),
                    s[9] || (s[9] = e("p", { class: "bk-empty-title" }, "No tax templates", -1)),
                    s[10] || (s[10] = e("p", { class: "bk-empty-sub" }, "Create a VAT template to apply on invoices and bills.", -1)),
                    a.$canCreate("taxes") ? (o(), i("button", {
                      key: 0,
                      class: "bk-empty-btn",
                      onClick: F
                    }, [
                      e("span", {
                        innerHTML: u(_)("plus", 13)
                      }, null, 8, We),
                      s[7] || (s[7] = p(" New Template", -1))
                    ])) : b("", !0)
                  ])
                ])
              ]))
            ], 64))
          ])
        ])
      ]),
      (o(), de(ue, { to: "body" }, [
        G(ce, { name: "tt-drawer" }, {
          default: re(() => [
            A.value ? (o(), i("div", {
              key: 0,
              class: "tt-bg",
              onClick: j(L, ["self"])
            }, [
              e("div", Xe, [
                e("div", Ze, [
                  e("div", et, [
                    e("div", tt, [
                      e("span", {
                        innerHTML: u(_)("percent", 18)
                      }, null, 8, st)
                    ]),
                    e("div", null, [
                      e("div", at, c(m.value ? "Edit Tax Template" : "New Tax Template"), 1),
                      s[12] || (s[12] = e("div", { class: "tt-sub" }, "Applied to invoice & bill line items", -1))
                    ])
                  ]),
                  e("button", {
                    class: "tt-x",
                    onClick: L
                  }, [
                    e("span", {
                      innerHTML: u(_)("x", 16)
                    }, null, 8, lt)
                  ])
                ]),
                e("div", nt, [
                  e("div", ot, [
                    s[13] || (s[13] = e("label", { class: "tt-label" }, [
                      p("Template Name "),
                      e("span", { class: "tt-req" }, "*")
                    ], -1)),
                    M(e("input", {
                      "onUpdate:modelValue": s[2] || (s[2] = (t) => l.template_name = t),
                      class: "b-input",
                      placeholder: l.tax_type === "VAT" ? "e.g. VAT 16%" : "e.g. Excise Duty 10%",
                      disabled: !!m.value
                    }, null, 8, it), [
                      [E, l.template_name]
                    ])
                  ]),
                  e("div", dt, [
                    s[14] || (s[14] = e("label", { class: "tt-label" }, [
                      p("Applies To "),
                      e("span", { class: "tt-req" }, "*")
                    ], -1)),
                    e("div", rt, [
                      (o(), i(h, null, y(["Sales", "Purchase", "Both"], (t) => e("button", {
                        key: t,
                        type: "button",
                        class: x(["tt-pill", { active: l.applies_to === t }]),
                        onClick: (d) => l.applies_to = t
                      }, c(t), 11, ct)), 64))
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
                  e("div", ut, [
                    s[16] || (s[16] = e("label", { class: "tt-label" }, "Tax Regime", -1)),
                    e("div", pt, [
                      (o(), i(h, null, y(["VAT", "Custom"], (t) => e("button", {
                        key: t,
                        type: "button",
                        class: x(["tt-pill", { active: l.tax_type === t }]),
                        onClick: (d) => X(t)
                      }, c(t), 11, mt)), 64))
                    ])
                  ]),
                  e("div", _t, [
                    s[17] || (s[17] = e("span", { class: "tt-section-title" }, "Tax Components", -1)),
                    e("div", ht, [
                      (o(!0), i(h, null, y(z.value, (t) => (o(), i("button", {
                        key: t,
                        class: "tt-add-chip",
                        onClick: (d) => D(t)
                      }, [
                        e("span", {
                          innerHTML: u(_)("plus", 11)
                        }, null, 8, bt),
                        p(c(t), 1)
                      ], 8, yt))), 128))
                    ])
                  ]),
                  l.rows.length ? (o(), i("div", vt, [...s[18] || (s[18] = [
                    e("span", null, "Component", -1),
                    e("span", null, "Rate %", -1),
                    e("span", null, "Account head", -1),
                    e("span", null, null, -1)
                  ])])) : b("", !0),
                  (o(!0), i(h, null, y(l.rows, (t, d) => (o(), i("div", {
                    key: d,
                    class: "tt-row2"
                  }, [
                    M(e("select", {
                      "onUpdate:modelValue": (n) => t.tax_type = n,
                      class: "b-input tt-r-type"
                    }, [
                      (o(!0), i(h, null, y(z.value, (n) => (o(), i("option", {
                        key: n,
                        value: n
                      }, c(n), 9, Tt))), 128))
                    ], 8, ft), [
                      [_e, t.tax_type]
                    ]),
                    M(e("input", {
                      "onUpdate:modelValue": (n) => t.rate = n,
                      type: "number",
                      min: "0",
                      step: "0.5",
                      class: "b-input tt-r-rate",
                      placeholder: "0"
                    }, null, 8, xt), [
                      [
                        E,
                        t.rate,
                        void 0,
                        { number: !0 }
                      ]
                    ]),
                    G(fe, {
                      modelValue: t.account_head,
                      "onUpdate:modelValue": (n) => t.account_head = n,
                      options: g.value,
                      "value-key": "name",
                      "label-key": "name",
                      placeholder: "Account head",
                      class: "tt-r-acct"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                    e("button", {
                      class: "tt-row-del",
                      onClick: (n) => Z(d),
                      title: "Remove"
                    }, [
                      e("span", {
                        innerHTML: u(_)("trash", 13)
                      }, null, 8, wt)
                    ], 8, kt)
                  ]))), 128)),
                  l.rows.length ? b("", !0) : (o(), i("div", Ct, c(l.tax_type === "VAT" ? "Add a VAT component (e.g. 16% standard rate)." : "Add tax components."), 1)),
                  e("div", gt, [
                    e("label", At, [
                      e("input", {
                        type: "checkbox",
                        checked: l.is_default,
                        onChange: s[3] || (s[3] = (t) => l.is_default = t.target.checked ? 1 : 0)
                      }, null, 40, Vt),
                      s[19] || (s[19] = p(" Set as default", -1))
                    ]),
                    e("label", Lt, [
                      e("input", {
                        type: "checkbox",
                        checked: l.disabled,
                        onChange: s[4] || (s[4] = (t) => l.disabled = t.target.checked ? 1 : 0)
                      }, null, 40, Mt),
                      s[20] || (s[20] = p(" Disabled", -1))
                    ])
                  ]),
                  l.owner ? (o(), i("div", St, [
                    p(" Created by " + c(u(Y)(l.owner)) + " on " + c(u(K)(l.creation)) + " ", 1),
                    l.modified_by ? (o(), i(h, { key: 0 }, [
                      p(" · Last modified by " + c(u(Y)(l.modified_by)) + " on " + c(u(K)(l.modified)), 1)
                    ], 64)) : b("", !0)
                  ])) : b("", !0)
                ]),
                e("div", Ht, [
                  e("button", {
                    class: "b-btn b-btn-ghost",
                    onClick: L
                  }, "Cancel"),
                  e("button", {
                    class: "tt-save",
                    onClick: ae,
                    disabled: T.value || !(m.value ? a.$canEdit("taxes") : a.$canCreate("taxes")),
                    title: (m.value ? a.$canEdit("taxes") : a.$canCreate("taxes")) ? "" : "Read-only access"
                  }, [
                    e("span", {
                      innerHTML: u(_)("check", 14)
                    }, null, 8, $t),
                    p(" " + c(T.value ? "Saving…" : m.value ? "Update" : "Create"), 1)
                  ], 8, Nt)
                ])
              ])
            ])) : b("", !0)
          ]),
          _: 1
        })
      ]))
    ]));
  }
}, Pt = /* @__PURE__ */ ne(Dt, [["__scopeId", "data-v-196d592b"]]);
export {
  Pt as default
};
