import { _ as at, y as ot, o as it, c as l, a as t, u as r, i as v, w as b, B as y, F as h, r as N, d, t as o, b as u, D as P, x as U, p as T, v as lt, n as k, J as K, f as rt, h as p, g as F, A as Y, e as dt, L as Z, a2 as ct, k as i } from "./main-DlHOPnai.js";
import { b as R } from "./format-BcJZDVG4.js";
import { o as J } from "./userNames-y3-EYbxD.js";
import { C as vt, v as ut, c as pt, i as G, a as _t, m as bt, b as mt } from "./labourContractor-fn9JaBmq.js";
const ft = { class: "list-page" }, yt = { class: "sales-toolbar" }, kt = { class: "sales-search" }, gt = ["innerHTML"], ht = { class: "sales-pills" }, xt = ["onClick"], Ct = {
  class: "cust-toolbar-right",
  style: { "margin-left": "auto" }
}, wt = ["innerHTML"], Tt = ["disabled", "title"], Lt = ["innerHTML"], Mt = {
  class: "bk-kpi-grid bk-kpi-grid-4",
  style: { "margin-bottom": "18px" }
}, Ht = { class: "bk-kpi-inner" }, $t = ["innerHTML"], At = { class: "bk-kpi-body" }, Nt = { class: "bk-kpi-label" }, Dt = {
  key: 0,
  class: "b-shimmer",
  style: { width: "64px", height: "22px", "margin-top": "2px", "border-radius": "4px" }
}, Et = { class: "bk-kpi-trend bk-trend-neutral" }, It = { class: "inv-table-wrap" }, St = { class: "inv-table" }, Vt = { key: 1 }, Bt = {
  colspan: "8",
  class: "vt-empty"
}, Ut = { class: "vt-empty-title" }, Ft = { class: "vt-empty-sub" }, Rt = ["disabled"], Ot = ["innerHTML"], jt = ["onClick"], zt = { class: "vt-td vt-td-vendor" }, qt = { class: "vt-vendor-cell" }, Pt = { class: "vt-vendor-name inv-customer" }, Kt = { class: "vt-vendor-id" }, Yt = { class: "vt-td" }, Zt = { class: "vt-badge vt-badge-blue" }, Jt = { class: "vt-td vt-td-mono" }, Gt = { class: "vt-td vt-td-mono" }, Qt = { class: "vt-td" }, Wt = { class: "vt-td vt-td-secondary" }, Xt = { class: "vt-td" }, te = { class: "vt-actions" }, ee = ["disabled", "title", "onClick"], ne = ["innerHTML"], se = ["disabled", "title", "onClick"], ae = ["disabled", "title", "onClick"], oe = ["innerHTML"], ie = {
  key: 0,
  class: "vt-footer"
}, le = {
  class: "inv-dh",
  style: { background: "linear-gradient(135deg,#0f766e,#115e59)", padding: "18px 24px" }
}, re = { class: "cust-drawer-header-left" }, de = {
  class: "cust-drawer-icon",
  style: { color: "#fff" }
}, ce = ["innerHTML"], ve = { class: "inv-dh-title" }, ue = { class: "cust-drawer-sub" }, pe = ["innerHTML"], _e = {
  class: "inv-dbody",
  style: { padding: "24px", "overflow-y": "auto", flex: "1" }
}, be = { class: "inv-fg inv-fg2" }, me = {
  class: "inv-field",
  style: { "grid-column": "span 2" }
}, fe = {
  key: 0,
  class: "ct-err"
}, ye = { class: "inv-field" }, ke = ["value"], ge = { class: "inv-field" }, he = {
  key: 0,
  class: "ct-err"
}, xe = { class: "inv-field" }, Ce = {
  key: 0,
  class: "ct-err"
}, we = { class: "inv-field" }, Te = {
  key: 0,
  class: "ct-err"
}, Le = { class: "inv-fg inv-fg2" }, Me = { class: "inv-field" }, He = { class: "inv-field" }, $e = {
  class: "inv-field",
  style: { "grid-column": "span 2" }
}, Ae = {
  key: 0,
  class: "inv-view-footer"
}, Ne = {
  class: "inv-dfooter",
  style: { "border-top": "1px solid #e8ecf0", padding: "14px 24px", background: "#fafbfd" }
}, De = ["disabled"], Ee = ["innerHTML"], Ie = {
  class: "nim-dialog",
  style: { "max-width": "420px" }
}, Se = {
  class: "nim-header",
  style: { background: "linear-gradient(135deg,#dc2626,#b91c1c)" }
}, Ve = { class: "nim-header-left" }, Be = {
  class: "nim-header-icon",
  style: { color: "#fff" }
}, Ue = ["innerHTML"], Fe = ["innerHTML"], Re = {
  class: "nim-body",
  style: { padding: "20px 24px" }
}, Oe = { style: { "font-size": "14px", color: "#374151", "line-height": "1.6" } }, je = { class: "inv-dfooter" }, ze = ["disabled"], qe = ["innerHTML"], S = "Labour Contractor", Pe = {
  __name: "Contractors",
  setup(Ke) {
    const { toast: m } = ot(), Q = [
      { k: "all", l: "All" },
      { k: "active", l: "Active" },
      { k: "inactive", l: "Inactive" },
      { k: "expired", l: "Certificate expired" }
    ], x = p([]), L = p(!0), C = p(""), g = p("all"), f = p(!1), _ = p("add"), M = p(!1), w = p(!1), H = p(null), $ = p(!1), V = p(""), c = Y({}), a = Y({});
    function W() {
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
      Object.keys(c).forEach((e) => delete c[e]), Object.keys(a).forEach((e) => delete a[e]), Object.assign(a, W(), s || {});
    }
    const D = F(() => _t(x.value)), B = F(
      () => x.value.filter((s) => bt(s, g.value) && mt(s, C.value))
    ), X = F(() => [
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
        const s = await rt(S, {
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
        m("Failed to load contractors: " + (s.message || s), "error");
      } finally {
        L.value = !1;
      }
    }
    function j() {
      O(), _.value = "add", f.value = !0;
    }
    function z(s) {
      O({ ...s, tax_cert_expiry: s.tax_cert_expiry ? String(s.tax_cert_expiry).slice(0, 10) : "" }), _.value = "edit", f.value = !0;
    }
    async function tt() {
      const s = ut(a, x.value, _.value === "edit" ? a.name : "");
      if (Object.keys(c).forEach((e) => delete c[e]), Object.assign(c, s), Object.keys(s).length) {
        m(Object.values(s)[0], "error");
        return;
      }
      M.value = !0;
      try {
        const e = await dt();
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
        }), m(_.value === "edit" ? "Contractor updated" : "Contractor added"), f.value = !1, await A();
      } catch (e) {
        m(e.message || "Could not save contractor", "error");
      } finally {
        M.value = !1;
      }
    }
    async function et(s) {
      V.value = s.name;
      try {
        await Z({ doctype: S, name: s.name, disabled: s.disabled ? 0 : 1 }), m(s.disabled ? "Contractor activated" : "Contractor deactivated"), await A();
      } catch (e) {
        m(e.message || "Could not update contractor", "error");
      } finally {
        V.value = "";
      }
    }
    function nt(s) {
      H.value = s, w.value = !0;
    }
    async function st() {
      if (H.value) {
        $.value = !0;
        try {
          await ct(S, H.value.name), m("Contractor deleted"), w.value = !1, H.value = null, await A();
        } catch (s) {
          m(s.message || "Could not delete contractor", "error");
        } finally {
          $.value = !1;
        }
      }
    }
    return it(A), (s, e) => {
      var q;
      return i(), l("div", ft, [
        t("div", yt, [
          t("div", kt, [
            t("span", {
              innerHTML: r(v)("search", 13),
              style: { color: "#9ca3af", "flex-shrink": "0" }
            }, null, 8, gt),
            b(t("input", {
              "onUpdate:modelValue": e[0] || (e[0] = (n) => C.value = n),
              placeholder: "Search contractors…",
              class: "sales-search-input",
              autocomplete: "off"
            }, null, 512), [
              [y, C.value]
            ])
          ]),
          t("div", ht, [
            (i(), l(h, null, N(Q, (n) => t("button", {
              key: n.k,
              class: k(["sales-pill", { active: g.value === n.k }]),
              onClick: (I) => g.value = n.k
            }, [
              d(o(n.l) + " ", 1),
              t("span", {
                class: k(["sales-pill-count", g.value === n.k ? "" : "zb-pc-muted"])
              }, o(D.value[n.k]), 3)
            ], 10, xt)), 64))
          ]),
          t("div", Ct, [
            t("button", {
              class: "sales-btn-ghost",
              onClick: A,
              title: "Refresh"
            }, [
              t("span", {
                innerHTML: r(v)("refresh", 13)
              }, null, 8, wt),
              e[20] || (e[20] = d(" Refresh", -1))
            ]),
            t("button", {
              class: "sales-btn-primary",
              disabled: !s.$canCreate("admin"),
              title: s.$canCreate("admin") ? "" : "Not permitted",
              onClick: j
            }, [
              t("span", {
                innerHTML: r(v)("plus", 13)
              }, null, 8, Lt),
              e[21] || (e[21] = d(" New Contractor", -1))
            ], 8, Tt)
          ])
        ]),
        t("div", Mt, [
          (i(!0), l(h, null, N(X.value, (n) => (i(), l("div", {
            key: n.key,
            class: "bk-kpi-card"
          }, [
            t("div", Ht, [
              t("div", {
                class: "bk-kpi-icon",
                style: T({ background: n.iconBg })
              }, [
                t("span", {
                  innerHTML: n.icon,
                  style: T({ color: n.color })
                }, null, 12, $t)
              ], 4),
              t("div", At, [
                t("div", Nt, o(n.label), 1),
                t("div", {
                  class: k(["bk-kpi-value", n.valueClass])
                }, [
                  L.value ? (i(), l("div", Dt)) : (i(), l(h, { key: 1 }, [
                    d(o(n.value), 1)
                  ], 64))
                ], 2),
                t("div", Et, o(n.sub), 1)
              ])
            ])
          ]))), 128))
        ]),
        t("div", It, [
          t("table", St, [
            e[26] || (e[26] = t("thead", null, [
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
              L.value ? (i(), l(h, { key: 0 }, N(6, (n) => t("tr", {
                key: n,
                class: "vt-row-shimmer"
              }, [...e[22] || (e[22] = [
                t("td", { colspan: "8" }, [
                  t("div", {
                    class: "shimmer",
                    style: { height: "12px", "border-radius": "3px", width: "65%" }
                  })
                ], -1)
              ])])), 64)) : B.value.length ? (i(!0), l(h, { key: 2 }, N(B.value, (n) => (i(), l("tr", {
                key: n.name,
                class: k(["inv-row", n.disabled ? "vt-row-disabled" : ""]),
                onClick: (I) => z(n)
              }, [
                t("td", zt, [
                  t("div", qt, [
                    t("div", {
                      class: k(["vt-avatar", n.disabled ? "vt-avatar-disabled" : ""])
                    }, o(r(pt)(n.contractor_name)), 3),
                    t("div", null, [
                      t("div", Pt, o(n.contractor_name || n.name), 1),
                      t("div", Kt, o(n.name), 1)
                    ])
                  ])
                ]),
                t("td", Yt, [
                  t("span", Zt, o(n.contractor_type || "—"), 1)
                ]),
                t("td", Jt, o(n.id_no || "—"), 1),
                t("td", Gt, o(n.kra_pin || "—"), 1),
                t("td", Qt, [
                  t("span", {
                    class: k(["inv-status-badge", r(G)(n.tax_cert_expiry) ? "vt-badge-red" : "vt-badge-green"])
                  }, [
                    e[24] || (e[24] = t("span", { class: "vt-badge-dot" }, null, -1)),
                    d(o(r(G)(n.tax_cert_expiry) ? "Expired " : "Valid to ") + o(r(R)(n.tax_cert_expiry)), 1)
                  ], 2)
                ]),
                t("td", Wt, o(n.phone || "—"), 1),
                t("td", Xt, [
                  t("span", {
                    class: k(["inv-status-badge", n.disabled ? "vt-badge-red" : "vt-badge-green"])
                  }, [
                    e[25] || (e[25] = t("span", { class: "vt-badge-dot" }, null, -1)),
                    d(o(n.disabled ? "Inactive" : "Active"), 1)
                  ], 2)
                ]),
                t("td", {
                  class: "vt-td vt-td-actions",
                  onClick: e[1] || (e[1] = U(() => {
                  }, ["stop"]))
                }, [
                  t("div", te, [
                    t("button", {
                      class: "inv-act-btn vt-act-edit",
                      disabled: !s.$canEdit("admin"),
                      title: s.$canEdit("admin") ? "Edit" : "Not permitted",
                      onClick: (I) => z(n)
                    }, [
                      t("span", {
                        innerHTML: r(v)("edit", 13)
                      }, null, 8, ne)
                    ], 8, ee),
                    t("button", {
                      class: "inv-act-btn",
                      disabled: !s.$canEdit("admin") || V.value === n.name,
                      title: n.disabled ? "Activate" : "Deactivate",
                      onClick: (I) => et(n),
                      style: { "font-size": "11.5px", "font-weight": "600", padding: "0 8px", width: "auto" }
                    }, o(n.disabled ? "Activate" : "Deactivate"), 9, se),
                    t("button", {
                      class: "inv-act-btn vt-act-del",
                      disabled: !s.$canDelete("admin"),
                      title: s.$canDelete("admin") ? "Delete" : "Not permitted",
                      onClick: (I) => nt(n)
                    }, [
                      t("span", {
                        innerHTML: r(v)("trash", 13)
                      }, null, 8, oe)
                    ], 8, ae)
                  ])
                ])
              ], 10, jt))), 128)) : (i(), l("tr", Vt, [
                t("td", Bt, [
                  t("div", Ut, o(C.value || g.value !== "all" ? "No results found" : "No contractors yet"), 1),
                  t("div", Ft, o(C.value || g.value !== "all" ? "Try adjusting your search or filter" : "Add your first contractor to get started"), 1),
                  !C.value && g.value === "all" ? (i(), l("button", {
                    key: 0,
                    class: "nim-btn nim-btn-primary",
                    disabled: !s.$canCreate("admin"),
                    style: { "margin-top": "14px" },
                    onClick: j
                  }, [
                    t("span", {
                      innerHTML: r(v)("plus", 13)
                    }, null, 8, Ot),
                    e[23] || (e[23] = d(" New Contractor", -1))
                  ], 8, Rt)) : u("", !0)
                ])
              ]))
            ])
          ]),
          !L.value && x.value.length ? (i(), l("div", ie, [
            e[27] || (e[27] = d("Showing ", -1)),
            t("strong", null, o(B.value.length), 1),
            e[28] || (e[28] = d(" of ", -1)),
            t("strong", null, o(x.value.length), 1),
            e[29] || (e[29] = d(" contractors", -1))
          ])) : u("", !0)
        ]),
        e[43] || (e[43] = t("p", { style: { margin: "10px 4px", "font-size": "12px", color: "#6b7280" } }, "Contractors with an expired certificate can’t get new contracts or bills. A contractor in use can be deactivated but not deleted.", -1)),
        (i(), P(K, { to: "body" }, [
          f.value ? (i(), l("div", {
            key: 0,
            class: "inv-drawer-bg",
            onClick: e[16] || (e[16] = U((n) => f.value = !1, ["self"]))
          }, [
            t("div", {
              class: k(["inv-drawer-panel", { open: f.value }]),
              style: { width: "560px", "max-width": "98vw" }
            }, [
              t("div", le, [
                t("div", re, [
                  t("div", de, [
                    t("span", {
                      innerHTML: r(v)("users", 16)
                    }, null, 8, ce)
                  ]),
                  t("div", null, [
                    t("div", ve, o(_.value === "add" ? "New Contractor" : "Edit Contractor"), 1),
                    t("div", ue, o(_.value === "edit" ? a.name : "Fill in contractor details"), 1)
                  ])
                ]),
                t("button", {
                  class: "inv-dclose",
                  style: { background: "rgba(255,255,255,.15)", border: "none", cursor: "pointer", color: "#fff", width: "30px", height: "30px", "border-radius": "8px", display: "grid", "place-items": "center" },
                  onClick: e[2] || (e[2] = (n) => f.value = !1),
                  innerHTML: r(v)("x", 15)
                }, null, 8, pe)
              ]),
              t("div", _e, [
                e[38] || (e[38] = t("div", {
                  class: "inv-sec-lbl",
                  style: { "margin-top": "0" }
                }, "Basic Information", -1)),
                t("div", be, [
                  t("div", me, [
                    e[30] || (e[30] = t("label", { class: "inv-lbl" }, [
                      d("Name "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    b(t("input", {
                      "onUpdate:modelValue": e[3] || (e[3] = (n) => a.contractor_name = n),
                      class: "inv-fi",
                      style: T(E("contractor_name")),
                      placeholder: "Company or individual name",
                      onInput: e[4] || (e[4] = (n) => delete c.contractor_name)
                    }, null, 36), [
                      [y, a.contractor_name]
                    ]),
                    c.contractor_name ? (i(), l("div", fe, o(c.contractor_name), 1)) : u("", !0)
                  ]),
                  t("div", ye, [
                    e[31] || (e[31] = t("label", { class: "inv-lbl" }, [
                      d("Type "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    b(t("select", {
                      "onUpdate:modelValue": e[5] || (e[5] = (n) => a.contractor_type = n),
                      class: "inv-fi"
                    }, [
                      (i(!0), l(h, null, N(r(vt), (n) => (i(), l("option", {
                        key: n,
                        value: n
                      }, o(n), 9, ke))), 128))
                    ], 512), [
                      [lt, a.contractor_type]
                    ])
                  ]),
                  t("div", ge, [
                    e[32] || (e[32] = t("label", { class: "inv-lbl" }, [
                      d("ID or Registration No. "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    b(t("input", {
                      "onUpdate:modelValue": e[6] || (e[6] = (n) => a.id_no = n),
                      class: "inv-fi",
                      style: T(E("id_no")),
                      onInput: e[7] || (e[7] = (n) => delete c.id_no)
                    }, null, 36), [
                      [y, a.id_no]
                    ]),
                    c.id_no ? (i(), l("div", he, o(c.id_no), 1)) : u("", !0)
                  ]),
                  t("div", xe, [
                    e[33] || (e[33] = t("label", { class: "inv-lbl" }, [
                      d("KRA PIN "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    b(t("input", {
                      "onUpdate:modelValue": e[8] || (e[8] = (n) => a.kra_pin = n),
                      class: "inv-fi",
                      style: T(E("kra_pin")),
                      placeholder: "A123456789Z",
                      maxlength: "11",
                      onInput: e[9] || (e[9] = (n) => {
                        a.kra_pin = a.kra_pin.toUpperCase().replace(/[^A-Z0-9]/g, ""), delete c.kra_pin;
                      })
                    }, null, 36), [
                      [y, a.kra_pin]
                    ]),
                    c.kra_pin ? (i(), l("div", Ce, o(c.kra_pin), 1)) : u("", !0)
                  ]),
                  t("div", we, [
                    e[34] || (e[34] = t("label", { class: "inv-lbl" }, [
                      d("Tax Certificate Expiry "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    b(t("input", {
                      type: "date",
                      "onUpdate:modelValue": e[10] || (e[10] = (n) => a.tax_cert_expiry = n),
                      class: "inv-fi",
                      style: T(E("tax_cert_expiry")),
                      onInput: e[11] || (e[11] = (n) => delete c.tax_cert_expiry)
                    }, null, 36), [
                      [y, a.tax_cert_expiry]
                    ]),
                    c.tax_cert_expiry ? (i(), l("div", Te, o(c.tax_cert_expiry), 1)) : u("", !0)
                  ])
                ]),
                e[39] || (e[39] = t("div", { class: "inv-sec-lbl" }, "Contact and Bank", -1)),
                t("div", Le, [
                  t("div", Me, [
                    e[35] || (e[35] = t("label", { class: "inv-lbl" }, "Phone", -1)),
                    b(t("input", {
                      "onUpdate:modelValue": e[12] || (e[12] = (n) => a.phone = n),
                      class: "inv-fi",
                      placeholder: "0712 345 678"
                    }, null, 512), [
                      [y, a.phone]
                    ])
                  ]),
                  t("div", He, [
                    e[36] || (e[36] = t("label", { class: "inv-lbl" }, "Bank and Account No.", -1)),
                    b(t("input", {
                      "onUpdate:modelValue": e[13] || (e[13] = (n) => a.bank_details = n),
                      class: "inv-fi",
                      placeholder: "Equity 0123456789"
                    }, null, 512), [
                      [y, a.bank_details]
                    ])
                  ]),
                  t("div", $e, [
                    e[37] || (e[37] = t("label", { class: "inv-lbl" }, "NCA Registration (optional)", -1)),
                    b(t("input", {
                      "onUpdate:modelValue": e[14] || (e[14] = (n) => a.nca_reg_no = n),
                      class: "inv-fi",
                      placeholder: "NCA-0000"
                    }, null, 512), [
                      [y, a.nca_reg_no]
                    ])
                  ])
                ]),
                _.value === "edit" && a.owner ? (i(), l("div", Ae, [
                  d(" Created by " + o(r(J)(a.owner)) + " on " + o(r(R)(a.creation)) + " ", 1),
                  a.modified_by ? (i(), l(h, { key: 0 }, [
                    d(" · Last modified by " + o(r(J)(a.modified_by)) + " on " + o(r(R)(a.modified)), 1)
                  ], 64)) : u("", !0)
                ])) : u("", !0)
              ]),
              t("div", Ne, [
                t("button", {
                  class: "form-btn form-btn-outline",
                  onClick: e[15] || (e[15] = (n) => f.value = !1)
                }, "Cancel"),
                t("button", {
                  class: "form-btn form-btn-primary",
                  onClick: tt,
                  disabled: M.value || !(_.value === "edit" ? s.$canEdit("admin") : s.$canCreate("admin"))
                }, [
                  M.value ? (i(), l("span", {
                    key: 0,
                    innerHTML: r(v)("refresh", 13),
                    style: { animation: "spin 1s linear infinite" }
                  }, null, 8, Ee)) : u("", !0),
                  d(" " + o(M.value ? "Saving…" : _.value === "add" ? "Save Contractor" : "Save Changes"), 1)
                ], 8, De)
              ])
            ], 2)
          ])) : u("", !0)
        ])),
        (i(), P(K, { to: "body" }, [
          w.value ? (i(), l("div", {
            key: 0,
            class: "nim-overlay",
            onClick: e[19] || (e[19] = U((n) => w.value = !1, ["self"]))
          }, [
            t("div", Ie, [
              t("div", Se, [
                t("div", Ve, [
                  t("div", Be, [
                    t("span", {
                      innerHTML: r(v)("trash", 16)
                    }, null, 8, Ue)
                  ]),
                  e[40] || (e[40] = t("div", { class: "nim-header-title" }, "Delete Contractor?", -1))
                ]),
                t("button", {
                  class: "nim-close",
                  onClick: e[17] || (e[17] = (n) => w.value = !1),
                  innerHTML: r(v)("x", 15)
                }, null, 8, Fe)
              ]),
              t("div", Re, [
                t("p", Oe, [
                  e[41] || (e[41] = d(" Are you sure you want to delete ", -1)),
                  t("strong", null, o((q = H.value) == null ? void 0 : q.contractor_name), 1),
                  e[42] || (e[42] = d("? This action cannot be undone. A contractor used on a contract can only be deactivated. ", -1))
                ])
              ]),
              t("div", je, [
                t("button", {
                  class: "form-btn form-btn-outline",
                  onClick: e[18] || (e[18] = (n) => w.value = !1)
                }, "Cancel"),
                t("button", {
                  onClick: st,
                  disabled: $.value || !s.$canDelete("admin"),
                  style: { height: "37px", padding: "0 18px", "border-radius": "8px", "font-size": "13.5px", "font-weight": "600", cursor: "pointer", "font-family": "inherit", border: "none", background: "#dc2626", color: "#fff", display: "inline-flex", "align-items": "center", gap: "6px" }
                }, [
                  $.value ? (i(), l("span", {
                    key: 0,
                    innerHTML: r(v)("refresh", 13),
                    style: { animation: "spin 1s linear infinite" }
                  }, null, 8, qe)) : u("", !0),
                  d(" " + o($.value ? "Deleting…" : "Yes, Delete"), 1)
                ], 8, ze)
              ])
            ])
          ])) : u("", !0)
        ]))
      ]);
    };
  }
}, Qe = /* @__PURE__ */ at(Pe, [["__scopeId", "data-v-7174efc0"]]);
export {
  Qe as default
};
