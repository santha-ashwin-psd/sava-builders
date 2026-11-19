import { _ as lt, y as rt, o as dt, c as d, a as t, u as v, i as b, w as x, B as w, F as L, r as D, d as u, t as i, b as f, D as G, x as q, p as A, v as ct, n as T, J as Q, f as vt, h as m, g as O, A as W, e as ut, L as X, a2 as pt, k as r } from "./main-Dnnn1I_7.js";
import { b as P } from "./format-BcJZDVG4.js";
import { o as tt } from "./userNames-_FtKz54C.js";
const _t = /^[AP][0-9]{9}[A-Z]$/, bt = ["Individual", "Company"];
function z(o = /* @__PURE__ */ new Date()) {
  const l = (p) => String(p).padStart(2, "0");
  return o.getFullYear() + "-" + l(o.getMonth() + 1) + "-" + l(o.getDate());
}
function j(o, l = z()) {
  return !!o && String(o).slice(0, 10) < l;
}
function ft(o) {
  var p, c;
  const l = String(o || "?").trim().split(/\s+/).filter(Boolean);
  return ((((p = l[0]) == null ? void 0 : p[0]) || "") + (((c = l[1]) == null ? void 0 : c[0]) || "")).toUpperCase() || "?";
}
function B(o, l, p = z()) {
  return l === "active" ? !o.disabled : l === "inactive" ? !!o.disabled : l === "expired" ? !o.disabled && j(o.tax_cert_expiry, p) : !0;
}
function mt(o, l = z()) {
  const p = { all: o.length, active: 0, inactive: 0, expired: 0 };
  for (const c of o)
    B(c, "active", l) && p.active++, B(c, "inactive", l) && p.inactive++, B(c, "expired", l) && p.expired++;
  return p;
}
function yt(o, l) {
  const p = String(l || "").trim().toLowerCase();
  return p ? [o.contractor_name, o.name, o.id_no, o.kra_pin, o.phone, o.contractor_type].some((c) => String(c || "").toLowerCase().includes(p)) : !0;
}
function gt(o, l = [], p = "") {
  const c = {};
  String(o.contractor_name || "").trim() || (c.contractor_name = "Name is required"), String(o.id_no || "").trim() || (c.id_no = "ID or registration no. is required");
  const y = String(o.kra_pin || "").trim().toUpperCase();
  if (!y) c.kra_pin = "KRA PIN is required";
  else if (!_t.test(y)) c.kra_pin = "Invalid KRA PIN. Expected format: A123456789Z";
  else {
    const g = l.find((k) => String(k.kra_pin || "").toUpperCase() === y && k.name !== p);
    g && (c.kra_pin = "KRA PIN " + y + " already belongs to " + (g.contractor_name || g.name));
  }
  return o.tax_cert_expiry || (c.tax_cert_expiry = "Tax certificate expiry is required"), c;
}
const kt = { class: "list-page" }, ht = { class: "sales-toolbar" }, xt = { class: "sales-search" }, Ct = ["innerHTML"], wt = { class: "sales-pills" }, Tt = ["onClick"], Lt = {
  class: "cust-toolbar-right",
  style: { "margin-left": "auto" }
}, Mt = ["innerHTML"], At = ["disabled", "title"], Nt = ["innerHTML"], $t = {
  class: "bk-kpi-grid bk-kpi-grid-4",
  style: { "margin-bottom": "18px" }
}, Ht = { class: "bk-kpi-inner" }, St = ["innerHTML"], Dt = { class: "bk-kpi-body" }, It = { class: "bk-kpi-label" }, Et = {
  key: 0,
  class: "b-shimmer",
  style: { width: "64px", height: "22px", "margin-top": "2px", "border-radius": "4px" }
}, Rt = { class: "bk-kpi-trend bk-trend-neutral" }, Ut = { class: "inv-table-wrap" }, Bt = { class: "inv-table" }, Vt = { key: 1 }, Ft = {
  colspan: "8",
  class: "vt-empty"
}, qt = { class: "vt-empty-title" }, Ot = { class: "vt-empty-sub" }, Pt = ["disabled"], jt = ["innerHTML"], zt = ["onClick"], Kt = { class: "vt-td vt-td-vendor" }, Zt = { class: "vt-vendor-cell" }, Yt = { class: "vt-vendor-name inv-customer" }, Jt = { class: "vt-vendor-id" }, Gt = { class: "vt-td" }, Qt = { class: "vt-badge vt-badge-blue" }, Wt = { class: "vt-td vt-td-mono" }, Xt = { class: "vt-td vt-td-mono" }, te = { class: "vt-td" }, ee = { class: "vt-td vt-td-secondary" }, ne = { class: "vt-td" }, se = { class: "vt-actions" }, ae = ["disabled", "title", "onClick"], ie = ["innerHTML"], oe = ["disabled", "title", "onClick"], le = ["disabled", "title", "onClick"], re = ["innerHTML"], de = {
  key: 0,
  class: "vt-footer"
}, ce = {
  class: "inv-dh",
  style: { background: "linear-gradient(135deg,#0f766e,#115e59)", padding: "18px 24px" }
}, ve = { class: "cust-drawer-header-left" }, ue = {
  class: "cust-drawer-icon",
  style: { color: "#fff" }
}, pe = ["innerHTML"], _e = { class: "inv-dh-title" }, be = { class: "cust-drawer-sub" }, fe = ["innerHTML"], me = {
  class: "inv-dbody",
  style: { padding: "24px", "overflow-y": "auto", flex: "1" }
}, ye = { class: "inv-fg inv-fg2" }, ge = {
  class: "inv-field",
  style: { "grid-column": "span 2" }
}, ke = {
  key: 0,
  class: "ct-err"
}, he = { class: "inv-field" }, xe = ["value"], Ce = { class: "inv-field" }, we = {
  key: 0,
  class: "ct-err"
}, Te = { class: "inv-field" }, Le = {
  key: 0,
  class: "ct-err"
}, Me = { class: "inv-field" }, Ae = {
  key: 0,
  class: "ct-err"
}, Ne = { class: "inv-fg inv-fg2" }, $e = { class: "inv-field" }, He = { class: "inv-field" }, Se = {
  class: "inv-field",
  style: { "grid-column": "span 2" }
}, De = {
  key: 0,
  class: "inv-view-footer"
}, Ie = {
  class: "inv-dfooter",
  style: { "border-top": "1px solid #e8ecf0", padding: "14px 24px", background: "#fafbfd" }
}, Ee = ["disabled"], Re = ["innerHTML"], Ue = {
  class: "nim-dialog",
  style: { "max-width": "420px" }
}, Be = {
  class: "nim-header",
  style: { background: "linear-gradient(135deg,#dc2626,#b91c1c)" }
}, Ve = { class: "nim-header-left" }, Fe = {
  class: "nim-header-icon",
  style: { color: "#fff" }
}, qe = ["innerHTML"], Oe = ["innerHTML"], Pe = {
  class: "nim-body",
  style: { padding: "20px 24px" }
}, je = { style: { "font-size": "14px", color: "#374151", "line-height": "1.6" } }, ze = { class: "inv-dfooter" }, Ke = ["disabled"], Ze = ["innerHTML"], U = "Labour Contractor", Ye = {
  __name: "Contractors",
  setup(o) {
    const { toast: l } = rt(), p = [
      { k: "all", l: "All" },
      { k: "active", l: "Active" },
      { k: "inactive", l: "Inactive" },
      { k: "expired", l: "Certificate expired" }
    ], c = m([]), y = m(!0), g = m(""), k = m("all"), C = m(!1), h = m("add"), N = m(!1), M = m(!1), $ = m(null), H = m(!1), V = m(""), _ = W({}), a = W({});
    function et() {
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
    function K(s) {
      Object.keys(_).forEach((e) => delete _[e]), Object.keys(a).forEach((e) => delete a[e]), Object.assign(a, et(), s || {});
    }
    const I = O(() => mt(c.value)), F = O(
      () => c.value.filter((s) => B(s, k.value) && yt(s, g.value))
    ), nt = O(() => [
      {
        key: "total",
        label: "Total Contractors",
        value: I.value.all,
        sub: "all contractors",
        icon: b("users", 18),
        color: "#2563eb",
        iconBg: "#eff6ff",
        valueClass: "bk-kpi-blue"
      },
      {
        key: "active",
        label: "Active",
        value: I.value.active,
        sub: "can get contracts",
        icon: b("check", 18),
        color: "#16a34a",
        iconBg: "#f0fdf4",
        valueClass: "bk-kpi-green"
      },
      {
        key: "expired",
        label: "Certificate Expired",
        value: I.value.expired,
        sub: "active, need renewal",
        icon: b("alert", 18),
        color: "#d97706",
        iconBg: "#fff7ed",
        valueClass: "bk-kpi-amber"
      }
    ]);
    function E(s) {
      return _[s] ? "border-color:#dc2626;background:#fff5f5" : "";
    }
    async function S() {
      y.value = !0;
      try {
        const s = await vt(U, {
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
        c.value = s || [];
      } catch (s) {
        l("Failed to load contractors: " + (s.message || s), "error");
      } finally {
        y.value = !1;
      }
    }
    function Z() {
      K(), h.value = "add", C.value = !0;
    }
    function Y(s) {
      K({ ...s, tax_cert_expiry: s.tax_cert_expiry ? String(s.tax_cert_expiry).slice(0, 10) : "" }), h.value = "edit", C.value = !0;
    }
    async function st() {
      const s = gt(a, c.value, h.value === "edit" ? a.name : "");
      if (Object.keys(_).forEach((e) => delete _[e]), Object.assign(_, s), Object.keys(s).length) {
        l(Object.values(s)[0], "error");
        return;
      }
      N.value = !0;
      try {
        const e = await ut();
        await X({
          doctype: U,
          ...h.value === "edit" ? { name: a.name } : {},
          company: e,
          contractor_name: a.contractor_name.trim(),
          contractor_type: a.contractor_type,
          id_no: a.id_no.trim(),
          kra_pin: a.kra_pin.trim().toUpperCase(),
          tax_cert_expiry: a.tax_cert_expiry,
          phone: (a.phone || "").trim(),
          bank_details: (a.bank_details || "").trim(),
          nca_reg_no: (a.nca_reg_no || "").trim()
        }), l(h.value === "edit" ? "Contractor updated" : "Contractor added"), C.value = !1, await S();
      } catch (e) {
        l(e.message || "Could not save contractor", "error");
      } finally {
        N.value = !1;
      }
    }
    async function at(s) {
      V.value = s.name;
      try {
        await X({ doctype: U, name: s.name, disabled: s.disabled ? 0 : 1 }), l(s.disabled ? "Contractor activated" : "Contractor deactivated"), await S();
      } catch (e) {
        l(e.message || "Could not update contractor", "error");
      } finally {
        V.value = "";
      }
    }
    function it(s) {
      $.value = s, M.value = !0;
    }
    async function ot() {
      if ($.value) {
        H.value = !0;
        try {
          await pt(U, $.value.name), l("Contractor deleted"), M.value = !1, $.value = null, await S();
        } catch (s) {
          l(s.message || "Could not delete contractor", "error");
        } finally {
          H.value = !1;
        }
      }
    }
    return dt(S), (s, e) => {
      var J;
      return r(), d("div", kt, [
        t("div", ht, [
          t("div", xt, [
            t("span", {
              innerHTML: v(b)("search", 13),
              style: { color: "#9ca3af", "flex-shrink": "0" }
            }, null, 8, Ct),
            x(t("input", {
              "onUpdate:modelValue": e[0] || (e[0] = (n) => g.value = n),
              placeholder: "Search contractors…",
              class: "sales-search-input",
              autocomplete: "off"
            }, null, 512), [
              [w, g.value]
            ])
          ]),
          t("div", wt, [
            (r(), d(L, null, D(p, (n) => t("button", {
              key: n.k,
              class: T(["sales-pill", { active: k.value === n.k }]),
              onClick: (R) => k.value = n.k
            }, [
              u(i(n.l) + " ", 1),
              t("span", {
                class: T(["sales-pill-count", k.value === n.k ? "" : "zb-pc-muted"])
              }, i(I.value[n.k]), 3)
            ], 10, Tt)), 64))
          ]),
          t("div", Lt, [
            t("button", {
              class: "sales-btn-ghost",
              onClick: S,
              title: "Refresh"
            }, [
              t("span", {
                innerHTML: v(b)("refresh", 13)
              }, null, 8, Mt),
              e[20] || (e[20] = u(" Refresh", -1))
            ]),
            t("button", {
              class: "sales-btn-primary",
              disabled: !s.$canCreate("admin"),
              title: s.$canCreate("admin") ? "" : "Not permitted",
              onClick: Z
            }, [
              t("span", {
                innerHTML: v(b)("plus", 13)
              }, null, 8, Nt),
              e[21] || (e[21] = u(" New Contractor", -1))
            ], 8, At)
          ])
        ]),
        t("div", $t, [
          (r(!0), d(L, null, D(nt.value, (n) => (r(), d("div", {
            key: n.key,
            class: "bk-kpi-card"
          }, [
            t("div", Ht, [
              t("div", {
                class: "bk-kpi-icon",
                style: A({ background: n.iconBg })
              }, [
                t("span", {
                  innerHTML: n.icon,
                  style: A({ color: n.color })
                }, null, 12, St)
              ], 4),
              t("div", Dt, [
                t("div", It, i(n.label), 1),
                t("div", {
                  class: T(["bk-kpi-value", n.valueClass])
                }, [
                  y.value ? (r(), d("div", Et)) : (r(), d(L, { key: 1 }, [
                    u(i(n.value), 1)
                  ], 64))
                ], 2),
                t("div", Rt, i(n.sub), 1)
              ])
            ])
          ]))), 128))
        ]),
        t("div", Ut, [
          t("table", Bt, [
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
              y.value ? (r(), d(L, { key: 0 }, D(6, (n) => t("tr", {
                key: n,
                class: "vt-row-shimmer"
              }, [...e[22] || (e[22] = [
                t("td", { colspan: "8" }, [
                  t("div", {
                    class: "shimmer",
                    style: { height: "12px", "border-radius": "3px", width: "65%" }
                  })
                ], -1)
              ])])), 64)) : F.value.length ? (r(!0), d(L, { key: 2 }, D(F.value, (n) => (r(), d("tr", {
                key: n.name,
                class: T(["inv-row", n.disabled ? "vt-row-disabled" : ""]),
                onClick: (R) => Y(n)
              }, [
                t("td", Kt, [
                  t("div", Zt, [
                    t("div", {
                      class: T(["vt-avatar", n.disabled ? "vt-avatar-disabled" : ""])
                    }, i(v(ft)(n.contractor_name)), 3),
                    t("div", null, [
                      t("div", Yt, i(n.contractor_name || n.name), 1),
                      t("div", Jt, i(n.name), 1)
                    ])
                  ])
                ]),
                t("td", Gt, [
                  t("span", Qt, i(n.contractor_type || "—"), 1)
                ]),
                t("td", Wt, i(n.id_no || "—"), 1),
                t("td", Xt, i(n.kra_pin || "—"), 1),
                t("td", te, [
                  t("span", {
                    class: T(["inv-status-badge", v(j)(n.tax_cert_expiry) ? "vt-badge-red" : "vt-badge-green"])
                  }, [
                    e[24] || (e[24] = t("span", { class: "vt-badge-dot" }, null, -1)),
                    u(i(v(j)(n.tax_cert_expiry) ? "Expired " : "Valid to ") + i(v(P)(n.tax_cert_expiry)), 1)
                  ], 2)
                ]),
                t("td", ee, i(n.phone || "—"), 1),
                t("td", ne, [
                  t("span", {
                    class: T(["inv-status-badge", n.disabled ? "vt-badge-red" : "vt-badge-green"])
                  }, [
                    e[25] || (e[25] = t("span", { class: "vt-badge-dot" }, null, -1)),
                    u(i(n.disabled ? "Inactive" : "Active"), 1)
                  ], 2)
                ]),
                t("td", {
                  class: "vt-td vt-td-actions",
                  onClick: e[1] || (e[1] = q(() => {
                  }, ["stop"]))
                }, [
                  t("div", se, [
                    t("button", {
                      class: "inv-act-btn vt-act-edit",
                      disabled: !s.$canEdit("admin"),
                      title: s.$canEdit("admin") ? "Edit" : "Not permitted",
                      onClick: (R) => Y(n)
                    }, [
                      t("span", {
                        innerHTML: v(b)("edit", 13)
                      }, null, 8, ie)
                    ], 8, ae),
                    t("button", {
                      class: "inv-act-btn",
                      disabled: !s.$canEdit("admin") || V.value === n.name,
                      title: n.disabled ? "Activate" : "Deactivate",
                      onClick: (R) => at(n),
                      style: { "font-size": "11.5px", "font-weight": "600", padding: "0 8px", width: "auto" }
                    }, i(n.disabled ? "Activate" : "Deactivate"), 9, oe),
                    t("button", {
                      class: "inv-act-btn vt-act-del",
                      disabled: !s.$canDelete("admin"),
                      title: s.$canDelete("admin") ? "Delete" : "Not permitted",
                      onClick: (R) => it(n)
                    }, [
                      t("span", {
                        innerHTML: v(b)("trash", 13)
                      }, null, 8, re)
                    ], 8, le)
                  ])
                ])
              ], 10, zt))), 128)) : (r(), d("tr", Vt, [
                t("td", Ft, [
                  t("div", qt, i(g.value || k.value !== "all" ? "No results found" : "No contractors yet"), 1),
                  t("div", Ot, i(g.value || k.value !== "all" ? "Try adjusting your search or filter" : "Add your first contractor to get started"), 1),
                  !g.value && k.value === "all" ? (r(), d("button", {
                    key: 0,
                    class: "nim-btn nim-btn-primary",
                    disabled: !s.$canCreate("admin"),
                    style: { "margin-top": "14px" },
                    onClick: Z
                  }, [
                    t("span", {
                      innerHTML: v(b)("plus", 13)
                    }, null, 8, jt),
                    e[23] || (e[23] = u(" New Contractor", -1))
                  ], 8, Pt)) : f("", !0)
                ])
              ]))
            ])
          ]),
          !y.value && c.value.length ? (r(), d("div", de, [
            e[27] || (e[27] = u("Showing ", -1)),
            t("strong", null, i(F.value.length), 1),
            e[28] || (e[28] = u(" of ", -1)),
            t("strong", null, i(c.value.length), 1),
            e[29] || (e[29] = u(" contractors", -1))
          ])) : f("", !0)
        ]),
        e[43] || (e[43] = t("p", { style: { margin: "10px 4px", "font-size": "12px", color: "#6b7280" } }, "Contractors with an expired certificate can’t get new contracts or bills. A contractor in use can be deactivated but not deleted.", -1)),
        (r(), G(Q, { to: "body" }, [
          C.value ? (r(), d("div", {
            key: 0,
            class: "inv-drawer-bg",
            onClick: e[16] || (e[16] = q((n) => C.value = !1, ["self"]))
          }, [
            t("div", {
              class: T(["inv-drawer-panel", { open: C.value }]),
              style: { width: "560px", "max-width": "98vw" }
            }, [
              t("div", ce, [
                t("div", ve, [
                  t("div", ue, [
                    t("span", {
                      innerHTML: v(b)("users", 16)
                    }, null, 8, pe)
                  ]),
                  t("div", null, [
                    t("div", _e, i(h.value === "add" ? "New Contractor" : "Edit Contractor"), 1),
                    t("div", be, i(h.value === "edit" ? a.name : "Fill in contractor details"), 1)
                  ])
                ]),
                t("button", {
                  class: "inv-dclose",
                  style: { background: "rgba(255,255,255,.15)", border: "none", cursor: "pointer", color: "#fff", width: "30px", height: "30px", "border-radius": "8px", display: "grid", "place-items": "center" },
                  onClick: e[2] || (e[2] = (n) => C.value = !1),
                  innerHTML: v(b)("x", 15)
                }, null, 8, fe)
              ]),
              t("div", me, [
                e[38] || (e[38] = t("div", {
                  class: "inv-sec-lbl",
                  style: { "margin-top": "0" }
                }, "Basic Information", -1)),
                t("div", ye, [
                  t("div", ge, [
                    e[30] || (e[30] = t("label", { class: "inv-lbl" }, [
                      u("Name "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    x(t("input", {
                      "onUpdate:modelValue": e[3] || (e[3] = (n) => a.contractor_name = n),
                      class: "inv-fi",
                      style: A(E("contractor_name")),
                      placeholder: "Company or individual name",
                      onInput: e[4] || (e[4] = (n) => delete _.contractor_name)
                    }, null, 36), [
                      [w, a.contractor_name]
                    ]),
                    _.contractor_name ? (r(), d("div", ke, i(_.contractor_name), 1)) : f("", !0)
                  ]),
                  t("div", he, [
                    e[31] || (e[31] = t("label", { class: "inv-lbl" }, [
                      u("Type "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    x(t("select", {
                      "onUpdate:modelValue": e[5] || (e[5] = (n) => a.contractor_type = n),
                      class: "inv-fi"
                    }, [
                      (r(!0), d(L, null, D(v(bt), (n) => (r(), d("option", {
                        key: n,
                        value: n
                      }, i(n), 9, xe))), 128))
                    ], 512), [
                      [ct, a.contractor_type]
                    ])
                  ]),
                  t("div", Ce, [
                    e[32] || (e[32] = t("label", { class: "inv-lbl" }, [
                      u("ID or Registration No. "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    x(t("input", {
                      "onUpdate:modelValue": e[6] || (e[6] = (n) => a.id_no = n),
                      class: "inv-fi",
                      style: A(E("id_no")),
                      onInput: e[7] || (e[7] = (n) => delete _.id_no)
                    }, null, 36), [
                      [w, a.id_no]
                    ]),
                    _.id_no ? (r(), d("div", we, i(_.id_no), 1)) : f("", !0)
                  ]),
                  t("div", Te, [
                    e[33] || (e[33] = t("label", { class: "inv-lbl" }, [
                      u("KRA PIN "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    x(t("input", {
                      "onUpdate:modelValue": e[8] || (e[8] = (n) => a.kra_pin = n),
                      class: "inv-fi",
                      style: A(E("kra_pin")),
                      placeholder: "A123456789Z",
                      maxlength: "11",
                      onInput: e[9] || (e[9] = (n) => {
                        a.kra_pin = a.kra_pin.toUpperCase().replace(/[^A-Z0-9]/g, ""), delete _.kra_pin;
                      })
                    }, null, 36), [
                      [w, a.kra_pin]
                    ]),
                    _.kra_pin ? (r(), d("div", Le, i(_.kra_pin), 1)) : f("", !0)
                  ]),
                  t("div", Me, [
                    e[34] || (e[34] = t("label", { class: "inv-lbl" }, [
                      u("Tax Certificate Expiry "),
                      t("span", { class: "nim-req" }, "*")
                    ], -1)),
                    x(t("input", {
                      type: "date",
                      "onUpdate:modelValue": e[10] || (e[10] = (n) => a.tax_cert_expiry = n),
                      class: "inv-fi",
                      style: A(E("tax_cert_expiry")),
                      onInput: e[11] || (e[11] = (n) => delete _.tax_cert_expiry)
                    }, null, 36), [
                      [w, a.tax_cert_expiry]
                    ]),
                    _.tax_cert_expiry ? (r(), d("div", Ae, i(_.tax_cert_expiry), 1)) : f("", !0)
                  ])
                ]),
                e[39] || (e[39] = t("div", { class: "inv-sec-lbl" }, "Contact and Bank", -1)),
                t("div", Ne, [
                  t("div", $e, [
                    e[35] || (e[35] = t("label", { class: "inv-lbl" }, "Phone", -1)),
                    x(t("input", {
                      "onUpdate:modelValue": e[12] || (e[12] = (n) => a.phone = n),
                      class: "inv-fi",
                      placeholder: "0712 345 678"
                    }, null, 512), [
                      [w, a.phone]
                    ])
                  ]),
                  t("div", He, [
                    e[36] || (e[36] = t("label", { class: "inv-lbl" }, "Bank and Account No.", -1)),
                    x(t("input", {
                      "onUpdate:modelValue": e[13] || (e[13] = (n) => a.bank_details = n),
                      class: "inv-fi",
                      placeholder: "Equity 0123456789"
                    }, null, 512), [
                      [w, a.bank_details]
                    ])
                  ]),
                  t("div", Se, [
                    e[37] || (e[37] = t("label", { class: "inv-lbl" }, "NCA Registration (optional)", -1)),
                    x(t("input", {
                      "onUpdate:modelValue": e[14] || (e[14] = (n) => a.nca_reg_no = n),
                      class: "inv-fi",
                      placeholder: "NCA-0000"
                    }, null, 512), [
                      [w, a.nca_reg_no]
                    ])
                  ])
                ]),
                h.value === "edit" && a.owner ? (r(), d("div", De, [
                  u(" Created by " + i(v(tt)(a.owner)) + " on " + i(v(P)(a.creation)) + " ", 1),
                  a.modified_by ? (r(), d(L, { key: 0 }, [
                    u(" · Last modified by " + i(v(tt)(a.modified_by)) + " on " + i(v(P)(a.modified)), 1)
                  ], 64)) : f("", !0)
                ])) : f("", !0)
              ]),
              t("div", Ie, [
                t("button", {
                  class: "form-btn form-btn-outline",
                  onClick: e[15] || (e[15] = (n) => C.value = !1)
                }, "Cancel"),
                t("button", {
                  class: "form-btn form-btn-primary",
                  onClick: st,
                  disabled: N.value || !(h.value === "edit" ? s.$canEdit("admin") : s.$canCreate("admin"))
                }, [
                  N.value ? (r(), d("span", {
                    key: 0,
                    innerHTML: v(b)("refresh", 13),
                    style: { animation: "spin 1s linear infinite" }
                  }, null, 8, Re)) : f("", !0),
                  u(" " + i(N.value ? "Saving…" : h.value === "add" ? "Save Contractor" : "Save Changes"), 1)
                ], 8, Ee)
              ])
            ], 2)
          ])) : f("", !0)
        ])),
        (r(), G(Q, { to: "body" }, [
          M.value ? (r(), d("div", {
            key: 0,
            class: "nim-overlay",
            onClick: e[19] || (e[19] = q((n) => M.value = !1, ["self"]))
          }, [
            t("div", Ue, [
              t("div", Be, [
                t("div", Ve, [
                  t("div", Fe, [
                    t("span", {
                      innerHTML: v(b)("trash", 16)
                    }, null, 8, qe)
                  ]),
                  e[40] || (e[40] = t("div", { class: "nim-header-title" }, "Delete Contractor?", -1))
                ]),
                t("button", {
                  class: "nim-close",
                  onClick: e[17] || (e[17] = (n) => M.value = !1),
                  innerHTML: v(b)("x", 15)
                }, null, 8, Oe)
              ]),
              t("div", Pe, [
                t("p", je, [
                  e[41] || (e[41] = u(" Are you sure you want to delete ", -1)),
                  t("strong", null, i((J = $.value) == null ? void 0 : J.contractor_name), 1),
                  e[42] || (e[42] = u("? This action cannot be undone. A contractor used on a contract can only be deactivated. ", -1))
                ])
              ]),
              t("div", ze, [
                t("button", {
                  class: "form-btn form-btn-outline",
                  onClick: e[18] || (e[18] = (n) => M.value = !1)
                }, "Cancel"),
                t("button", {
                  onClick: ot,
                  disabled: H.value || !s.$canDelete("admin"),
                  style: { height: "37px", padding: "0 18px", "border-radius": "8px", "font-size": "13.5px", "font-weight": "600", cursor: "pointer", "font-family": "inherit", border: "none", background: "#dc2626", color: "#fff", display: "inline-flex", "align-items": "center", gap: "6px" }
                }, [
                  H.value ? (r(), d("span", {
                    key: 0,
                    innerHTML: v(b)("refresh", 13),
                    style: { animation: "spin 1s linear infinite" }
                  }, null, 8, Ze)) : f("", !0),
                  u(" " + i(H.value ? "Deleting…" : "Yes, Delete"), 1)
                ], 8, Ke)
              ])
            ])
          ])) : f("", !0)
        ]))
      ]);
    };
  }
}, We = /* @__PURE__ */ lt(Ye, [["__scopeId", "data-v-31a26a8c"]]);
export {
  We as default
};
