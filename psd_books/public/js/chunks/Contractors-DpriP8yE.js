import { _ as ot, y as lt, o as it, c as i, a as t, u as r, i as v, w as f, B as g, F as h, r as N, d, t as o, b as u, D as q, x as F, p as T, v as rt, n as y, J as K, f as dt, h as p, g as R, A as Y, e as ct, L as Z, a2 as vt, k as l } from "./main-DFBVbKy0.js";
import { b as U } from "./format-BcJZDVG4.js";
import { o as J } from "./userNames-DTLrDnT4.js";
import { C as ut, c as pt, v as _t, a as bt, i as G, b as mt, m as ft, d as yt } from "./labourContractor-CwTlS8Kw.js";
const kt = { class: "list-page" }, gt = { class: "sales-toolbar" }, ht = { class: "sales-search" }, xt = ["innerHTML"], Ct = { class: "sales-pills" }, wt = ["onClick"], Tt = {
  class: "cust-toolbar-right",
  style: { "margin-left": "auto" }
}, Lt = ["innerHTML"], Mt = ["disabled", "title"], Ht = ["innerHTML"], $t = {
  class: "bk-kpi-grid bk-kpi-grid-4",
  style: { "margin-bottom": "18px" }
}, At = { class: "bk-kpi-inner" }, Nt = ["innerHTML"], Dt = { class: "bk-kpi-body" }, Et = { class: "bk-kpi-label" }, It = {
  key: 0,
  class: "b-shimmer",
  style: { width: "64px", height: "22px", "margin-top": "2px", "border-radius": "4px" }
}, St = { class: "bk-kpi-trend bk-trend-neutral" }, Bt = { class: "inv-table-wrap" }, Vt = { class: "inv-table" }, Ft = { key: 1 }, Rt = {
  colspan: "8",
  class: "vt-empty"
}, Ut = { class: "vt-empty-title" }, Ot = { class: "vt-empty-sub" }, jt = ["disabled"], zt = ["innerHTML"], Pt = ["onClick"], qt = { class: "vt-td vt-td-vendor" }, Kt = { class: "vt-vendor-cell" }, Yt = { class: "vt-vendor-name inv-customer" }, Zt = { class: "vt-vendor-id" }, Jt = { class: "vt-td" }, Gt = { class: "vt-badge vt-badge-blue" }, Qt = { class: "vt-td vt-td-mono" }, Wt = { class: "vt-td vt-td-mono" }, Xt = { class: "vt-td" }, te = { class: "vt-td vt-td-secondary" }, ee = { class: "vt-td" }, ne = { class: "vt-actions" }, se = ["disabled", "title", "onClick"], ae = ["innerHTML"], oe = ["disabled", "title", "onClick"], le = ["disabled", "title", "onClick"], ie = ["innerHTML"], re = {
  key: 0,
  class: "vt-footer"
}, de = {
  class: "inv-dh",
  style: { background: "linear-gradient(135deg,#0f766e,#115e59)", padding: "18px 24px" }
}, ce = { class: "cust-drawer-header-left" }, ve = {
  class: "cust-drawer-icon",
  style: { color: "#fff" }
}, ue = ["innerHTML"], pe = { class: "inv-dh-title" }, _e = { class: "cust-drawer-sub" }, be = ["innerHTML"], me = {
  class: "inv-dbody",
  style: { padding: "24px", "overflow-y": "auto", flex: "1" }
}, fe = { class: "inv-fg inv-fg2" }, ye = {
  class: "inv-field",
  style: { "grid-column": "span 2" }
}, ke = {
  key: 0,
  class: "ct-err"
}, ge = { class: "inv-field" }, he = ["value"], xe = { class: "inv-field" }, Ce = {
  key: 0,
  class: "ct-err"
}, we = { class: "inv-field" }, Te = {
  key: 0,
  class: "ct-err"
}, Le = { class: "inv-field" }, Me = {
  key: 0,
  class: "ct-err"
}, He = { class: "inv-fg inv-fg2" }, $e = { class: "inv-field" }, Ae = ["value"], Ne = { class: "inv-field" }, De = {
  class: "inv-field",
  style: { "grid-column": "span 2" }
}, Ee = {
  key: 0,
  class: "inv-view-footer"
}, Ie = {
  class: "inv-dfooter",
  style: { "border-top": "1px solid #e8ecf0", padding: "14px 24px", background: "#fafbfd" }
}, Se = ["disabled"], Be = ["innerHTML"], Ve = {
  class: "nim-dialog",
  style: { "max-width": "420px" }
}, Fe = {
  class: "nim-header",
  style: { background: "linear-gradient(135deg,#dc2626,#b91c1c)" }
}, Re = { class: "nim-header-left" }, Ue = {
  class: "nim-header-icon",
  style: { color: "#fff" }
}, Oe = ["innerHTML"], je = ["innerHTML"], ze = {
  class: "nim-body",
  style: { padding: "20px 24px" }
}, Pe = { style: { "font-size": "14px", color: "#374151", "line-height": "1.6" } }, qe = { class: "inv-dfooter" }, Ke = ["disabled"], Ye = ["innerHTML"], S = "Labour Contractor", Ze = {
  __name: "Contractors",
  setup(Je) {
    const { toast: b } = lt(), Q = [
      { k: "all", l: "All" },
      { k: "active", l: "Active" },
      { k: "inactive", l: "Inactive" },
      { k: "expired", l: "Certificate expired" }
    ], x = p([]), L = p(!0), C = p(""), k = p("all"), m = p(!1), _ = p("add"), M = p(!1), w = p(!1), H = p(null), $ = p(!1), B = p(""), c = Y({}), a = Y({});
    function W(s) {
      const e = pt(s.target.value);
      s.target.value = e, a.phone = e;
    }
    function X() {
      return {
        name: "",
        contractor_name: "",
        contractor_type: "Individual",
        id_no: "",
        kra_pin: "",
        tax_cert_expiry: "",
        phone: "",
        bank_details: "",
        nca_reg_no: "",
        owner: "",
        creation: "",
        modified: "",
        modified_by: ""
      };
    }
    function O(s) {
      Object.keys(c).forEach((e) => delete c[e]), Object.keys(a).forEach((e) => delete a[e]), Object.assign(a, X(), s || {});
    }
    const D = R(() => mt(x.value)), V = R(
      () => x.value.filter((s) => ft(s, k.value) && yt(s, C.value))
    ), tt = R(() => [
      {
        key: "total",
        label: "Total Contractors",
        value: D.value.all,
        sub: "all contractors",
        icon: v("users", 18),
        color: "#2563eb",
        iconBg: "#eff6ff",
        valueClass: "bk-kpi-blue"
      },
      {
        key: "active",
        label: "Active",
        value: D.value.active,
        sub: "can get contracts",
        icon: v("check", 18),
        color: "#16a34a",
        iconBg: "#f0fdf4",
        valueClass: "bk-kpi-green"
      },
      {
        key: "expired",
        label: "Certificate Expired",
        value: D.value.expired,
        sub: "active, need renewal",
        icon: v("alert", 18),
        color: "#d97706",
        iconBg: "#fff7ed",
        valueClass: "bk-kpi-amber"
      }
    ]);
    function E(s) {
      return c[s] ? "border-color:#dc2626;background:#fff5f5" : "";
    }
    async function A() {
      L.value = !0;
      try {
        const s = await dt(S, {
          fields: [
            "name",
            "contractor_name",
            "contractor_type",
            "id_no",
            "kra_pin",
            "tax_cert_expiry",
            "phone",
            "bank_details",
            "nca_reg_no",
            "disabled",
            "owner",
            "creation",
            "modified",
            "modified_by"
          ],
          order: "contractor_name asc",
          limit: 500
        });
        x.value = s || [];
      } catch (s) {
        b("Failed to load contractors: " + (s.message || s), "error");
      } finally {
        L.value = !1;
      }
    }
    function j() {
      O(), _.value = "add", m.value = !0;
    }
    function z(s) {
      O({ ...s, tax_cert_expiry: s.tax_cert_expiry ? String(s.tax_cert_expiry).slice(0, 10) : "" }), _.value = "edit", m.value = !0;
    }
    async function et() {
      const s = _t(a, x.value, _.value === "edit" ? a.name : "");
      if (Object.keys(c).forEach((e) => delete c[e]), Object.assign(c, s), Object.keys(s).length) {
        b(Object.values(s)[0], "error");
        return;
      }
      M.value = !0;
      try {
        const e = await ct();
        await Z({
          doctype: S,
          ..._.value === "edit" ? { name: a.name } : {},
          company: e,
          contractor_name: a.contractor_name.trim(),
          contractor_type: a.contractor_type,
          id_no: a.id_no.trim(),
          kra_pin: a.kra_pin.trim().toUpperCase(),
          tax_cert_expiry: a.tax_cert_expiry,
          phone: (a.phone || "").trim(),
          bank_details: (a.bank_details || "").trim(),
          nca_reg_no: (a.nca_reg_no || "").trim()
        }), b(_.value === "edit" ? "Contractor updated" : "Contractor added"), m.value = !1, await A();
      } catch (e) {
        b(e.message || "Could not save contractor", "error");
      } finally {
        M.value = !1;
      }
    }
    async function nt(s) {
      B.value = s.name;
      try {
        await Z({ doctype: S, name: s.name, disabled: s.disabled ? 0 : 1 }), b(s.disabled ? "Contractor activated" : "Contractor deactivated"), await A();
      } catch (e) {
        b(e.message || "Could not update contractor", "error");
      } finally {
        B.value = "";
      }
    }
    function st(s) {
      H.value = s, w.value = !0;
    }
    async function at() {
      if (H.value) {
        $.value = !0;
        try {
          await vt(S, H.value.name), b("Contractor deleted"), w.value = !1, H.value = null, await A();
        } catch (s) {
          b(s.message || "Could not delete contractor", "error");
        } finally {
          $.value = !1;
        }
      }
    }
    return it(A), (s, e) => {
      var P;
      return l(), i("div", kt, [
        t("div", gt, [
          t("div", ht, [
            t("span", {
              innerHTML: r(v)("search", 13),
              style: { color: "#9ca3af", "flex-shrink": "0" }
            }, null, 8, xt),
            f(t("input", {
              "onUpdate:modelValue": e[0] || (e[0] = (n) => C.value = n),
              placeholder: "Search contractors…",
              class: "sales-search-input",
              autocomplete: "off"
            }, null, 512), [
              [g, C.value]
            ])
          ]),
          t("div", Ct, [
            (l(), i(h, null, N(Q, (n) => t("button", {
              key: n.k,
              class: y(["sales-pill", { active: k.value === n.k }]),
              onClick: (I) => k.value = n.k
            }, [
              d(o(n.l) + " ", 1),
              t("span", {
                class: y(["sales-pill-count", k.value === n.k ? "" : "zb-pc-muted"])
              }, o(D.value[n.k]), 3)
            ], 10, wt)), 64))
          ]),
          t("div", Tt, [
            t("button", {
              class: "sales-btn-ghost",
              onClick: A,
              title: "Refresh"
            }, [
              t("span", {
                innerHTML: r(v)("refresh", 13)
              }, null, 8, Lt),
              e[19] || (e[19] = d(" Refresh", -1))
            ]),
            t("button", {
              class: "sales-btn-primary",
              disabled: !s.$canCreate("admin"),
              title: s.$canCreate("admin") ? "" : "Not permitted",
              onClick: j
            }, [
              t("span", {
                innerHTML: r(v)("plus", 13)
              }, null, 8, Ht),
              e[20] || (e[20] = d(" New Contractor", -1))
            ], 8, Mt)
          ])
        ]),
        t("div", $t, [
          (l(!0), i(h, null, N(tt.value, (n) => (l(), i("div", {
            key: n.key,
            class: "bk-kpi-card"
          }, [
            t("div", At, [
              t("div", {
                class: "bk-kpi-icon",
                style: T({ background: n.iconBg })
              }, [
                t("span", {
                  innerHTML: n.icon,
                  style: T({ color: n.color })
                }, null, 12, Nt)
              ], 4),
              t("div", Dt, [
                t("div", Et, o(n.label), 1),
                t("div", {
                  class: y(["bk-kpi-value", n.valueClass])
                }, [
                  L.value ? (l(), i("div", It)) : (l(), i(h, { key: 1 }, [
                    d(o(n.value), 1)
                  ], 64))
                ], 2),
                t("div", St, o(n.sub), 1)
              ])
            ])
          ]))), 128))
        ]),
        t("div", Bt, [
          t("table", Vt, [
            e[25] || (e[25] = t("thead", null, [
              t("tr", null, [
                t("th", { class: "vt-th" }, "Contractor"),
                t("th", { class: "vt-th" }, "Type"),
                t("th", { class: "vt-th" }, "ID / Reg. No."),
                t("th", { class: "vt-th" }, "KRA PIN"),
                t("th", { class: "vt-th" }, "Certificate"),
                t("th", { class: "vt-th" }, "Phone"),
                t("th", { class: "vt-th" }, "Status"),
                t("th", { class: "vt-th vt-th-actions" }, "Actions")
              ])
            ], -1)),
            t("tbody", null, [
              L.value ? (l(), i(h, { key: 0 }, N(6, (n) => t("tr", {
                key: n,
                class: "vt-row-shimmer"
              }, [...e[21] || (e[21] = [
                t("td", { colspan: "8" }, [
                  t("div", {
                    class: "shimmer",
                    style: { height: "12px", "border-radius": "3px", width: "65%" }
                  })
                ], -1)
              ])])), 64)) : V.value.length ? (l(!0), i(h, { key: 2 }, N(V.value, (n) => (l(), i("tr", {
                key: n.name,
                class: y(["inv-row", n.disabled ? "vt-row-disabled" : ""]),
                onClick: (I) => z(n)
              }, [
                t("td", qt, [
                  t("div", Kt, [
                    t("div", {
                      class: y(["vt-avatar", n.disabled ? "vt-avatar-disabled" : ""])
                    }, o(r(bt)(n.contractor_name)), 3),
                    t("div", null, [
                      t("div", Yt, o(n.contractor_name || n.name), 1),
                      t("div", Zt, o(n.name), 1)
                    ])
                  ])
                ]),
                t("td", Jt, [
                  t("span", Gt, o(n.contractor_type || "—"), 1)
                ]),
                t("td", Qt, o(n.id_no || "—"), 1),
                t("td", Wt, o(n.kra_pin || "—"), 1),
                t("td", Xt, [
                  t("span", {
                    class: y(["inv-status-badge", r(G)(n.tax_cert_expiry) ? "vt-badge-red" : "vt-badge-green"])
                  }, [
                    e[23] || (e[23] = t("span", { class: "vt-badge-dot" }, null, -1)),
                    d(o(r(G)(n.tax_cert_expiry) ? "Expired " : "Valid to ") + o(r(U)(n.tax_cert_expiry)), 1)
                  ], 2)
                ]),
                t("td", te, o(n.phone || "—"), 1),
                t("td", ee, [
                  t("span", {
                    class: y(["inv-status-badge", n.disabled ? "vt-badge-red" : "vt-badge-green"])
                  }, [
                    e[24] || (e[24] = t("span", { class: "vt-badge-dot" }, null, -1)),
                    d(o(n.disabled ? "Inactive" : "Active"), 1)
                  ], 2)
                ]),
                t("td", {
                  class: "vt-td vt-td-actions",
                  onClick: e[1] || (e[1] = F(() => {
                  }, ["stop"]))
                }, [
                  t("div", ne, [
                    t("button", {
                      class: "inv-act-btn vt-act-edit",
                      disabled: !s.$canEdit("admin"),
                      title: s.$canEdit("admin") ? "Edit" : "Not permitted",
                      onClick: (I) => z(n)
                    }, [
                      t("span", {
                        innerHTML: r(v)("edit", 13)
                      }, null, 8, ae)
                    ], 8, se),
                    t("button", {
                      class: "inv-act-btn",
                      disabled: !s.$canEdit("admin") || B.value === n.name,
                      title: n.disabled ? "Activate" : "Deactivate",
                      onClick: (I) => nt(n),
                      style: { "font-size": "11.5px", "font-weight": "600", padding: "0 8px", width: "auto" }
                    }, o(n.disabled ? "Activate" : "Deactivate"), 9, oe),
                    t("button", {
                      class: "inv-act-btn vt-act-del",
                      disabled: !s.$canDelete("admin"),
                      title: s.$canDelete("admin") ? "Delete" : "Not permitted",
                      onClick: (I) => st(n)
                    }, [
                      t("span", {
                        innerHTML: r(v)("trash", 13)
                      }, null, 8, ie)
                    ], 8, le)
                  ])
                ])
              ], 10, Pt))), 128)) : (l(), i("tr", Ft, [
                t("td", Rt, [
                  t("div", Ut, o(C.value || k.value !== "all" ? "No results found" : "No contractors yet"), 1),
                  t("div", Ot, o(C.value || k.value !== "all" ? "Try adjusting your search or filter" : "Add your first contractor to get started"), 1),
                  !C.value && k.value === "all" ? (l(), i("button", {
                    key: 0,
                    class: "nim-btn nim-btn-primary",
                    disabled: !s.$canCreate("admin"),
                    style: { "margin-top": "14px" },
                    onClick: j
                  }, [
                    t("span", {
                      innerHTML: r(v)("plus", 13)
                    }, null, 8, zt),
                    e[22] || (e[22] = d(" New Contractor", -1))
                  ], 8, jt)) : u("", !0)
                ])
              ]))
            ])
          ]),
          !L.value && x.value.length ? (l(), i("div", re, [
            e[26] || (e[26] = d("Showing ", -1)),
            t("strong", null, o(V.value.length), 1),
            e[27] || (e[27] = d(" of ", -1)),
            t("strong", null, o(x.value.length), 1),
            e[28] || (e[28] = d(" contractors", -1))
          ])) : u("", !0)
        ]),
        e[42] || (e[42] = t("p", { style: { margin: "10px 4px", "font-size": "12px", color: "#6b7280" } }, "Contractors with an expired certificate can’t get new contracts or bills. A contractor in use can be deactivated but not deleted.", -1)),
        (l(), q(K, { to: "body" }, [
          m.value ? (l(), i("div", {
            key: 0,
            class: "inv-drawer-bg",
            onClick: e[15] || (e[15] = F((n) => m.value = !1, ["self"]))
          }, [
            t("div", {
              class: y(["inv-drawer-panel", { open: m.value }]),
              style: { width: "560px", "max-width": "98vw" }
            }, [
              t("div", de, [
                t("div", ce, [
                  t("div", ve, [
                    t("span", {
                      innerHTML: r(v)("users", 16)
                    }, null, 8, ue)
                  ]),
                  t("div", null, [
                    t("div", pe, o(_.value === "add" ? "New Contractor" : "Edit Contractor"), 1),
                    t("div", _e, o(_.value === "edit" ? a.name : "Fill in contractor details"), 1)
                  ])
                ]),
                t("button", {
                  class: "inv-dclose",
                  style: { background: "rgba(255,255,255,.15)", border: "none", cursor: "pointer", color: "#fff", width: "30px", height: "30px", "border-radius": "8px", display: "grid", "place-items": "center" },
                  onClick: e[2] || (e[2] = (n) => m.value = !1),
                  innerHTML: r(v)("x", 15)
                }, null, 8, be)
              ]),
              t("div", me, [
                e[37] || (e[37] = t("div", {
                  class: "inv-sec-lbl",
                  style: { "margin-top": "0" }
                }, "Basic Information", -1)),
                t("div", fe, [
                  t("div", ye, [
                    e[29] || (e[29] = t("label", { class: "inv-lbl" }, [
                      d("Name "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    f(t("input", {
                      "onUpdate:modelValue": e[3] || (e[3] = (n) => a.contractor_name = n),
                      class: "inv-fi",
                      style: T(E("contractor_name")),
                      placeholder: "Company or individual name",
                      onInput: e[4] || (e[4] = (n) => delete c.contractor_name)
                    }, null, 36), [
                      [g, a.contractor_name]
                    ]),
                    c.contractor_name ? (l(), i("div", ke, o(c.contractor_name), 1)) : u("", !0)
                  ]),
                  t("div", ge, [
                    e[30] || (e[30] = t("label", { class: "inv-lbl" }, [
                      d("Type "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    f(t("select", {
                      "onUpdate:modelValue": e[5] || (e[5] = (n) => a.contractor_type = n),
                      class: "inv-fi"
                    }, [
                      (l(!0), i(h, null, N(r(ut), (n) => (l(), i("option", {
                        key: n,
                        value: n
                      }, o(n), 9, he))), 128))
                    ], 512), [
                      [rt, a.contractor_type]
                    ])
                  ]),
                  t("div", xe, [
                    e[31] || (e[31] = t("label", { class: "inv-lbl" }, [
                      d("ID or Registration No. "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    f(t("input", {
                      "onUpdate:modelValue": e[6] || (e[6] = (n) => a.id_no = n),
                      class: "inv-fi",
                      style: T(E("id_no")),
                      onInput: e[7] || (e[7] = (n) => delete c.id_no)
                    }, null, 36), [
                      [g, a.id_no]
                    ]),
                    c.id_no ? (l(), i("div", Ce, o(c.id_no), 1)) : u("", !0)
                  ]),
                  t("div", we, [
                    e[32] || (e[32] = t("label", { class: "inv-lbl" }, [
                      d("KRA PIN "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    f(t("input", {
                      "onUpdate:modelValue": e[8] || (e[8] = (n) => a.kra_pin = n),
                      class: "inv-fi",
                      style: T(E("kra_pin")),
                      placeholder: "A123456789Z",
                      maxlength: "11",
                      onInput: e[9] || (e[9] = (n) => {
                        a.kra_pin = a.kra_pin.toUpperCase().replace(/[^A-Z0-9]/g, ""), delete c.kra_pin;
                      })
                    }, null, 36), [
                      [g, a.kra_pin]
                    ]),
                    c.kra_pin ? (l(), i("div", Te, o(c.kra_pin), 1)) : u("", !0)
                  ]),
                  t("div", Le, [
                    e[33] || (e[33] = t("label", { class: "inv-lbl" }, [
                      d("Tax Certificate Expiry "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    f(t("input", {
                      type: "date",
                      "onUpdate:modelValue": e[10] || (e[10] = (n) => a.tax_cert_expiry = n),
                      class: "inv-fi",
                      style: T(E("tax_cert_expiry")),
                      onInput: e[11] || (e[11] = (n) => delete c.tax_cert_expiry)
                    }, null, 36), [
                      [g, a.tax_cert_expiry]
                    ]),
                    c.tax_cert_expiry ? (l(), i("div", Me, o(c.tax_cert_expiry), 1)) : u("", !0)
                  ])
                ]),
                e[38] || (e[38] = t("div", { class: "inv-sec-lbl" }, "Contact and Bank", -1)),
                t("div", He, [
                  t("div", $e, [
                    e[34] || (e[34] = t("label", { class: "inv-lbl" }, "Phone", -1)),
                    t("input", {
                      type: "tel",
                      inputmode: "tel",
                      autocomplete: "off",
                      value: a.phone,
                      onInput: W,
                      class: "inv-fi",
                      placeholder: "0712 345 678"
                    }, null, 40, Ae)
                  ]),
                  t("div", Ne, [
                    e[35] || (e[35] = t("label", { class: "inv-lbl" }, "Bank and Account No.", -1)),
                    f(t("input", {
                      "onUpdate:modelValue": e[12] || (e[12] = (n) => a.bank_details = n),
                      class: "inv-fi",
                      placeholder: "Equity 0123456789"
                    }, null, 512), [
                      [g, a.bank_details]
                    ])
                  ]),
                  t("div", De, [
                    e[36] || (e[36] = t("label", { class: "inv-lbl" }, "NCA Registration (optional)", -1)),
                    f(t("input", {
                      "onUpdate:modelValue": e[13] || (e[13] = (n) => a.nca_reg_no = n),
                      class: "inv-fi",
                      placeholder: "NCA-0000"
                    }, null, 512), [
                      [g, a.nca_reg_no]
                    ])
                  ])
                ]),
                _.value === "edit" && a.owner ? (l(), i("div", Ee, [
                  d(" Created by " + o(r(J)(a.owner)) + " on " + o(r(U)(a.creation)) + " ", 1),
                  a.modified_by ? (l(), i(h, { key: 0 }, [
                    d(" · Last modified by " + o(r(J)(a.modified_by)) + " on " + o(r(U)(a.modified)), 1)
                  ], 64)) : u("", !0)
                ])) : u("", !0)
              ]),
              t("div", Ie, [
                t("button", {
                  class: "form-btn form-btn-outline",
                  onClick: e[14] || (e[14] = (n) => m.value = !1)
                }, "Cancel"),
                t("button", {
                  class: "form-btn form-btn-primary",
                  onClick: et,
                  disabled: M.value || !(_.value === "edit" ? s.$canEdit("admin") : s.$canCreate("admin"))
                }, [
                  M.value ? (l(), i("span", {
                    key: 0,
                    innerHTML: r(v)("refresh", 13),
                    style: { animation: "spin 1s linear infinite" }
                  }, null, 8, Be)) : u("", !0),
                  d(" " + o(M.value ? "Saving…" : _.value === "add" ? "Save Contractor" : "Save Changes"), 1)
                ], 8, Se)
              ])
            ], 2)
          ])) : u("", !0)
        ])),
        (l(), q(K, { to: "body" }, [
          w.value ? (l(), i("div", {
            key: 0,
            class: "nim-overlay",
            onClick: e[18] || (e[18] = F((n) => w.value = !1, ["self"]))
          }, [
            t("div", Ve, [
              t("div", Fe, [
                t("div", Re, [
                  t("div", Ue, [
                    t("span", {
                      innerHTML: r(v)("trash", 16)
                    }, null, 8, Oe)
                  ]),
                  e[39] || (e[39] = t("div", { class: "nim-header-title" }, "Delete Contractor?", -1))
                ]),
                t("button", {
                  class: "nim-close",
                  onClick: e[16] || (e[16] = (n) => w.value = !1),
                  innerHTML: r(v)("x", 15)
                }, null, 8, je)
              ]),
              t("div", ze, [
                t("p", Pe, [
                  e[40] || (e[40] = d(" Are you sure you want to delete ", -1)),
                  t("strong", null, o((P = H.value) == null ? void 0 : P.contractor_name), 1),
                  e[41] || (e[41] = d("? This action cannot be undone. A contractor used on a contract can only be deactivated. ", -1))
                ])
              ]),
              t("div", qe, [
                t("button", {
                  class: "form-btn form-btn-outline",
                  onClick: e[17] || (e[17] = (n) => w.value = !1)
                }, "Cancel"),
                t("button", {
                  onClick: at,
                  disabled: $.value || !s.$canDelete("admin"),
                  style: { height: "37px", padding: "0 18px", "border-radius": "8px", "font-size": "13.5px", "font-weight": "600", cursor: "pointer", "font-family": "inherit", border: "none", background: "#dc2626", color: "#fff", display: "inline-flex", "align-items": "center", gap: "6px" }
                }, [
                  $.value ? (l(), i("span", {
                    key: 0,
                    innerHTML: r(v)("refresh", 13),
                    style: { animation: "spin 1s linear infinite" }
                  }, null, 8, Ye)) : u("", !0),
                  d(" " + o($.value ? "Deleting…" : "Yes, Delete"), 1)
                ], 8, Ke)
              ])
            ])
          ])) : u("", !0)
        ]))
      ]);
    };
  }
}, tn = /* @__PURE__ */ ot(Ze, [["__scopeId", "data-v-95fa1834"]]);
export {
  tn as default
};
