import { _ as H, x as K, h as x, o as O, c as a, a as e, d as r, t as v, F as f, r as C, W as l, w as n, A as c, b as y, v as N, u as w, a0 as $, p as U, O as B, n as M, S as G, l as j, J as P, ac as L, z as W, g as J, k as d, a1 as q } from "./main-D4r-IT_f.js";
const Z = { class: "sc-page" }, Y = { class: "sc-sticky" }, X = { class: "sc-header" }, Q = ["disabled"], ee = { class: "sc-tabs" }, se = ["onClick"], te = {
  key: 0,
  class: "sc-body sc-body--two-col"
}, ie = { class: "sc-col-main" }, ae = { class: "sc-card" }, de = {
  class: "sc-fg sc-fg--single",
  style: { "margin-bottom": "14px" }
}, oe = { class: "nim-field" }, le = { style: { display: "flex", "align-items": "center", gap: "8px", "margin-top": "10px", "font-size": "13px", cursor: "pointer" } }, ne = ["checked", "disabled"], ce = {
  key: 0,
  style: { color: "#6b7280", "font-size": "12px" }
}, re = {
  class: "sc-fg",
  style: { "margin-bottom": "14px" }
}, ve = { class: "nim-field" }, pe = { class: "sc-input-icon-wrap" }, ue = { class: "nim-field" }, ye = { class: "sc-input-icon-wrap" }, me = {
  class: "sc-fg sc-fg--single",
  style: { "margin-bottom": "14px" }
}, be = { class: "nim-field" }, ge = { class: "sc-input-icon-wrap" }, he = {
  class: "sc-fg sc-fg--single",
  style: { "margin-bottom": "14px" }
}, fe = { class: "nim-field" }, we = { class: "sc-input-icon-wrap" }, ke = {
  class: "sc-fg sc-fg--three",
  style: { "margin-bottom": "14px" }
}, _e = { class: "nim-field" }, xe = { class: "sc-input-icon-wrap" }, Ce = { class: "nim-field" }, Be = { class: "sc-input-icon-wrap" }, Me = ["value"], Pe = { class: "nim-field" }, Ae = { class: "sc-input-icon-wrap" }, Se = ["value"], Ve = {
  class: "sc-fg sc-fg--single",
  style: { "margin-bottom": "0" }
}, Ne = { class: "nim-field" }, Ue = { class: "sc-input-icon-wrap" }, Le = { class: "sc-col-side" }, Te = { class: "sc-card" }, Ie = { class: "sc-logo-area" }, ze = { class: "sc-logo-box" }, De = ["src"], Re = {
  key: 1,
  class: "sc-logo-placeholder"
}, Ee = { class: "sc-logo-actions" }, Fe = { class: "sc-upload-btn" }, He = { class: "sc-card" }, Ke = { class: "sc-preview" }, Oe = { class: "sc-preview-header" }, $e = { class: "sc-preview-logo-wrap" }, Ge = ["src"], je = {
  key: 1,
  class: "sc-preview-logo-placeholder"
}, We = { class: "sc-preview-company" }, Je = { class: "sc-preview-company-name" }, qe = { class: "sc-preview-company-addr" }, Ze = { class: "sc-preview-company-addr" }, Ye = { class: "sc-preview-company-addr" }, Xe = {
  key: 1,
  class: "sc-body sc-body--two-col"
}, Qe = { class: "sc-col-main" }, es = { class: "sc-card" }, ss = { class: "sc-fg sc-fg--single" }, ts = { class: "nim-field" }, is = {
  key: 0,
  style: { "margin-top": "4px", "font-size": "12px", color: "#dc2626", display: "flex", "align-items": "center", gap: "4px" }
}, as = {
  key: 1,
  style: { "margin-top": "4px", "font-size": "12px", color: "#2f9e44", display: "flex", "align-items": "center", gap: "4px" }
}, ds = {
  key: 2,
  class: "sc-body sc-body--two-col"
}, os = { class: "sc-col-main" }, ls = { class: "sc-card" }, ns = { class: "sc-branding-templates" }, cs = ["onClick"], rs = { class: "sc-tmpl-label" }, vs = {
  key: 0,
  class: "sc-tmpl-check"
}, ps = { class: "sc-card" }, us = { class: "sc-color-row" }, ys = {
  class: "sc-color-pick",
  style: { cursor: "pointer" }
}, ms = { class: "sc-color-hex" }, bs = { class: "sc-col-side" }, gs = { class: "sc-card" }, hs = { class: "sc-logo-area sc-logo-area--stacked" }, fs = { class: "sc-logo-box sc-logo-box--wide" }, ws = ["src"], ks = {
  key: 1,
  class: "sc-logo-placeholder"
}, _s = { class: "sc-logo-actions sc-logo-actions--row" }, xs = { class: "sc-upload-btn" }, Cs = {
  key: 3,
  class: "sc-body sc-body--two-col"
}, Bs = { class: "sc-col-main" }, Ms = { class: "sc-card" }, Ps = { class: "sc-fg sc-fg--single" }, As = { class: "nim-field" }, Ss = { class: "nim-field" }, Vs = {
  key: 4,
  class: "sc-body sc-body--two-col"
}, Ns = { class: "sc-col-main" }, Us = { class: "sc-card" }, Ls = { class: "sc-fg sc-fg--single" }, Ts = { class: "nim-field" }, Is = {
  key: 0,
  class: "sc-lock-status"
}, zs = {
  key: 1,
  class: "sc-lock-status sc-lock-status--none"
}, Ds = {
  key: 2,
  class: "sc-clear-lock-row"
}, Rs = {
  __name: "SettingsCompany",
  setup(Es) {
    const { toast: p } = K(), A = G(), t = W({
      default_company: "",
      is_default: 0,
      default_currency: "KES",
      fiscal_year_start_month: "April",
      invoice_prefix: "INV",
      kra_pin: "",
      gstin: "",
      gst_state: "",
      logo_url: "",
      company_address: "",
      company_city: "",
      company_country: "Kenya",
      company_state: "",
      company_pincode: "",
      company_phone: "",
      company_email: "",
      company_website: "",
      auto_send_invoice: 0,
      send_payment_reminders: 0,
      reminder_days_before: 3,
      reminder_days_after: 7,
      auto_reconcile: 0,
      pdf_template: "classic",
      brand_color: "#1a6ef7",
      company_logo: "",
      lock_date: ""
    }), k = x(!1), g = x(""), _ = x(!1), S = [
      { k: "profile", l: "Company Profile" },
      { k: "tax", l: "Tax" },
      { k: "branding", l: "Branding & Template" },
      { k: "reminders", l: "Reminders" },
      { k: "period_lock", l: "Period Lock" }
    ], T = S.map((o) => o.k), m = x(T.includes(A.query.tab) ? A.query.tab : "profile"), I = [
      { key: "classic", label: "Classic" },
      { key: "modern", label: "Modern" },
      { key: "minimal", label: "Minimal" }
    ];
    function z(o) {
      return o ? o.startsWith("data:") || o.startsWith("http") ? o : (window.location.origin || "") + o : "";
    }
    function D(o) {
      var b;
      const s = o.target.files[0];
      if (!s) return;
      const i = new FormData();
      i.append("file", s), i.append("doctype", "Books Company"), i.append("docname", t.default_company || ""), i.append("fieldname", "company_logo"), i.append("csrf_token", ((b = window.frappe) == null ? void 0 : b.csrf_token) || ""), fetch("/api/method/upload_file", { method: "POST", credentials: "same-origin", body: i }).then((u) => u.json()).then((u) => {
        var h;
        (h = u.message) != null && h.file_url && (t.company_logo = u.message.file_url, p("Logo uploaded"));
      }).catch(() => p("Upload failed", "error"));
    }
    const V = J(() => q(t.company_country));
    async function R() {
      try {
        const o = await j("psd_books.api.admin.get_company_settings");
        Object.assign(t, o), g.value = o.default_company || "", _.value = !!o.is_default;
      } catch {
        p("Could not load settings", "error");
      }
    }
    async function E() {
      const o = (t.default_company || "").trim();
      if (!o) {
        p("Company name is required", "error");
        return;
      }
      k.value = !0;
      try {
        if (g.value && o !== g.value) {
          await P("psd_books.api.admin.rename_company", {
            old_name: g.value,
            new_name: o
          }), g.value = o, L(o), p("Company renamed — reloading…"), await P("psd_books.api.admin.save_company_settings", { ...t, default_company: o }), window.location.reload();
          return;
        }
        const s = await P("psd_books.api.admin.save_company_settings", { ...t });
        s && s.default_company && (g.value = s.default_company, t.default_company = s.default_company), s && s.is_default && (_.value = !0, t.is_default = 1, L(s.default_company)), p("Settings saved");
      } catch (s) {
        p(s.message, "error");
      }
      k.value = !1;
    }
    function F(o) {
      var b;
      const s = o.target.files[0];
      if (!s) return;
      const i = new FormData();
      i.append("file", s), i.append("doctype", "Books Company"), i.append("docname", t.default_company || ""), i.append("fieldname", "logo_url"), i.append("csrf_token", ((b = window.frappe) == null ? void 0 : b.csrf_token) || ""), fetch("/api/method/upload_file", { method: "POST", credentials: "same-origin", body: i }).then((u) => u.json()).then((u) => {
        var h;
        (h = u.message) != null && h.file_url && (t.logo_url = u.message.file_url, p("Logo uploaded"));
      }).catch(() => p("Upload failed", "error"));
    }
    return O(R), (o, s) => (d(), a("div", Z, [
      e("div", Y, [
        e("div", X, [
          s[24] || (s[24] = e("span", { class: "sc-title" }, "Company Settings", -1)),
          e("button", {
            class: "nim-btn nim-btn-primary sc-save-btn",
            onClick: E,
            disabled: k.value || !o.$canEdit("admin")
          }, [
            s[23] || (s[23] = e("svg", {
              width: "15",
              height: "15",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              e("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }),
              e("polyline", { points: "17 21 17 13 7 13 7 21" }),
              e("polyline", { points: "7 3 7 8 15 8" })
            ], -1)),
            r(" " + v(k.value ? "Saving…" : "Save Changes"), 1)
          ], 8, Q)
        ]),
        e("div", ee, [
          (d(), a(f, null, C(S, (i) => e("button", {
            key: i.k,
            class: M(["sc-tab", { "sc-tab--active": m.value === i.k }]),
            onClick: (b) => m.value = i.k
          }, v(i.l), 11, se)), 64))
        ])
      ]),
      m.value === "profile" ? (d(), a("div", te, [
        e("div", ie, [
          e("div", ae, [
            s[45] || (s[45] = l('<div class="sc-card-header" data-v-be19d460><div class="sc-card-icon" data-v-be19d460><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-be19d460><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" data-v-be19d460></path><polyline points="9 22 9 12 15 12 15 22" data-v-be19d460></polyline></svg></div><div data-v-be19d460><div class="sc-card-title" data-v-be19d460>Company Information</div><div class="sc-card-subtitle" data-v-be19d460>Update your company details and contact information.</div></div></div><div class="sc-divider" data-v-be19d460></div>', 2)),
            e("div", de, [
              e("div", oe, [
                s[25] || (s[25] = e("label", { class: "nim-label" }, [
                  r("Company Name "),
                  e("span", { class: "sc-required" }, "*")
                ], -1)),
                n(e("input", {
                  class: "nim-input",
                  "onUpdate:modelValue": s[0] || (s[0] = (i) => t.default_company = i),
                  placeholder: "Acme Technologies Pvt Ltd"
                }, null, 512), [
                  [c, t.default_company]
                ])
              ]),
              e("label", le, [
                e("input", {
                  type: "checkbox",
                  checked: !!t.is_default,
                  disabled: _.value,
                  onChange: s[1] || (s[1] = (i) => t.is_default = i.target.checked ? 1 : 0)
                }, null, 40, ne),
                s[26] || (s[26] = e("span", null, "Is Default Company", -1)),
                _.value ? (d(), a("span", ce, "(this is the default company)")) : y("", !0)
              ])
            ]),
            e("div", re, [
              e("div", ve, [
                s[28] || (s[28] = e("label", { class: "nim-label" }, "Phone", -1)),
                e("div", pe, [
                  s[27] || (s[27] = e("svg", {
                    class: "sc-input-icon",
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" })
                  ], -1)),
                  n(e("input", {
                    class: "nim-input sc-icon-input",
                    "onUpdate:modelValue": s[2] || (s[2] = (i) => t.company_phone = i),
                    placeholder: "+254 700 000 000"
                  }, null, 512), [
                    [c, t.company_phone]
                  ])
                ])
              ]),
              e("div", ue, [
                s[30] || (s[30] = e("label", { class: "nim-label" }, "Email", -1)),
                e("div", ye, [
                  s[29] || (s[29] = e("svg", {
                    class: "sc-input-icon",
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
                    e("polyline", { points: "22,6 12,13 2,6" })
                  ], -1)),
                  n(e("input", {
                    class: "nim-input sc-icon-input",
                    "onUpdate:modelValue": s[3] || (s[3] = (i) => t.company_email = i),
                    placeholder: "info@acmetech.com"
                  }, null, 512), [
                    [c, t.company_email]
                  ])
                ])
              ])
            ]),
            e("div", me, [
              e("div", be, [
                s[32] || (s[32] = e("label", { class: "nim-label" }, "Website", -1)),
                e("div", ge, [
                  s[31] || (s[31] = e("svg", {
                    class: "sc-input-icon",
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("circle", {
                      cx: "12",
                      cy: "12",
                      r: "10"
                    }),
                    e("line", {
                      x1: "2",
                      y1: "12",
                      x2: "22",
                      y2: "12"
                    }),
                    e("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
                  ], -1)),
                  n(e("input", {
                    class: "nim-input sc-icon-input",
                    "onUpdate:modelValue": s[4] || (s[4] = (i) => t.company_website = i),
                    placeholder: "https://www.acmetech.com"
                  }, null, 512), [
                    [c, t.company_website]
                  ])
                ])
              ])
            ]),
            e("div", he, [
              e("div", fe, [
                s[34] || (s[34] = e("label", { class: "nim-label" }, "Address", -1)),
                e("div", we, [
                  s[33] || (s[33] = e("svg", {
                    class: "sc-input-icon",
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }),
                    e("circle", {
                      cx: "12",
                      cy: "10",
                      r: "3"
                    })
                  ], -1)),
                  n(e("input", {
                    class: "nim-input sc-icon-input",
                    "onUpdate:modelValue": s[5] || (s[5] = (i) => t.company_address = i),
                    placeholder: "123 Business Park, Sector 62, Noida"
                  }, null, 512), [
                    [c, t.company_address]
                  ])
                ])
              ])
            ]),
            e("div", ke, [
              e("div", _e, [
                s[36] || (s[36] = e("label", { class: "nim-label" }, "City", -1)),
                e("div", xe, [
                  s[35] || (s[35] = e("svg", {
                    class: "sc-input-icon",
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("rect", {
                      x: "2",
                      y: "7",
                      width: "20",
                      height: "14",
                      rx: "2"
                    }),
                    e("path", { d: "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" })
                  ], -1)),
                  n(e("input", {
                    class: "nim-input sc-icon-input",
                    "onUpdate:modelValue": s[6] || (s[6] = (i) => t.company_city = i),
                    placeholder: "Noida"
                  }, null, 512), [
                    [c, t.company_city]
                  ])
                ])
              ]),
              e("div", Ce, [
                s[39] || (s[39] = e("label", { class: "nim-label" }, "State / Province", -1)),
                e("div", Be, [
                  s[38] || (s[38] = e("svg", {
                    class: "sc-input-icon",
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" })
                  ], -1)),
                  V.value.length ? n((d(), a("select", {
                    key: 0,
                    class: "nim-input sc-icon-input",
                    "onUpdate:modelValue": s[7] || (s[7] = (i) => t.company_state = i)
                  }, [
                    s[37] || (s[37] = e("option", { value: "" }, "— Select State —", -1)),
                    (d(!0), a(f, null, C(V.value, (i) => (d(), a("option", {
                      key: i,
                      value: i
                    }, v(i), 9, Me))), 128))
                  ], 512)), [
                    [N, t.company_state]
                  ]) : n((d(), a("input", {
                    key: 1,
                    class: "nim-input sc-icon-input",
                    "onUpdate:modelValue": s[8] || (s[8] = (i) => t.company_state = i),
                    placeholder: "Enter state"
                  }, null, 512)), [
                    [c, t.company_state]
                  ])
                ])
              ]),
              e("div", Pe, [
                s[42] || (s[42] = e("label", { class: "nim-label" }, "Country", -1)),
                e("div", Ae, [
                  s[41] || (s[41] = e("svg", {
                    class: "sc-input-icon",
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("circle", {
                      cx: "12",
                      cy: "12",
                      r: "10"
                    }),
                    e("line", {
                      x1: "2",
                      y1: "12",
                      x2: "22",
                      y2: "12"
                    }),
                    e("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
                  ], -1)),
                  n(e("select", {
                    class: "nim-input sc-icon-input",
                    "onUpdate:modelValue": s[9] || (s[9] = (i) => t.company_country = i),
                    onChange: s[10] || (s[10] = (i) => t.company_state = "")
                  }, [
                    s[40] || (s[40] = e("option", { value: "" }, "— Select Country —", -1)),
                    (d(!0), a(f, null, C(w($), (i) => (d(), a("option", {
                      key: i,
                      value: i
                    }, v(i), 9, Se))), 128))
                  ], 544), [
                    [N, t.company_country]
                  ])
                ])
              ])
            ]),
            e("div", Ve, [
              e("div", Ne, [
                s[44] || (s[44] = e("label", { class: "nim-label" }, "Postal Code", -1)),
                e("div", Ue, [
                  s[43] || (s[43] = e("svg", {
                    class: "sc-input-icon",
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("rect", {
                      x: "3",
                      y: "11",
                      width: "18",
                      height: "11",
                      rx: "2",
                      ry: "2"
                    }),
                    e("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
                  ], -1)),
                  n(e("input", {
                    class: "nim-input sc-icon-input",
                    "onUpdate:modelValue": s[11] || (s[11] = (i) => t.company_pincode = i),
                    placeholder: "201309"
                  }, null, 512), [
                    [c, t.company_pincode]
                  ])
                ])
              ])
            ])
          ])
        ]),
        e("div", Le, [
          e("div", Te, [
            s[51] || (s[51] = l('<div class="sc-card-header" data-v-be19d460><div class="sc-card-icon" data-v-be19d460><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-be19d460><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" data-v-be19d460></path><polyline points="9 22 9 12 15 12 15 22" data-v-be19d460></polyline></svg></div><div data-v-be19d460><div class="sc-card-title" data-v-be19d460>Company Logo</div><div class="sc-card-subtitle" data-v-be19d460>Upload your company logo</div></div></div><div class="sc-divider" data-v-be19d460></div>', 2)),
            e("div", Ie, [
              e("div", ze, [
                t.logo_url ? (d(), a("img", {
                  key: 0,
                  src: t.logo_url,
                  style: { width: "100%", height: "100%", "object-fit": "contain" }
                }, null, 8, De)) : (d(), a("div", Re, [...s[46] || (s[46] = [
                  e("svg", {
                    width: "36",
                    height: "36",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "#c5d0fa",
                    "stroke-width": "1.5"
                  }, [
                    e("rect", {
                      x: "3",
                      y: "3",
                      width: "18",
                      height: "18",
                      rx: "2"
                    }),
                    e("circle", {
                      cx: "8.5",
                      cy: "8.5",
                      r: "1.5"
                    }),
                    e("polyline", { points: "21 15 16 10 5 21" })
                  ], -1)
                ])]))
              ]),
              e("div", Ee, [
                e("label", Fe, [
                  s[47] || (s[47] = e("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("polyline", { points: "16 16 12 12 8 16" }),
                    e("line", {
                      x1: "12",
                      y1: "12",
                      x2: "12",
                      y2: "21"
                    }),
                    e("path", { d: "M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" })
                  ], -1)),
                  s[48] || (s[48] = r(" Upload Logo ", -1)),
                  e("input", {
                    type: "file",
                    accept: "image/*",
                    style: { display: "none" },
                    onChange: F
                  }, null, 32)
                ]),
                s[50] || (s[50] = e("div", { class: "sc-hint" }, [
                  r("PNG, JPG up to 2 MB."),
                  e("br"),
                  r("Appears on PDF invoices.")
                ], -1)),
                t.logo_url ? (d(), a("button", {
                  key: 0,
                  class: "sc-remove-btn",
                  onClick: s[12] || (s[12] = (i) => t.logo_url = "")
                }, [...s[49] || (s[49] = [
                  e("svg", {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("polyline", { points: "3 6 5 6 21 6" }),
                    e("path", { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" }),
                    e("path", { d: "M10 11v6M14 11v6" })
                  ], -1),
                  r(" Remove ", -1)
                ])])) : y("", !0)
              ])
            ])
          ]),
          e("div", He, [
            s[54] || (s[54] = l('<div class="sc-card-header" data-v-be19d460><div class="sc-card-icon sc-card-icon--blue" data-v-be19d460><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-be19d460><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" data-v-be19d460></path><circle cx="12" cy="12" r="3" data-v-be19d460></circle></svg></div><div data-v-be19d460><div class="sc-card-title" data-v-be19d460>Preview</div><div class="sc-card-subtitle" data-v-be19d460>This is how your logo will appear on invoices.</div></div></div><div class="sc-divider" data-v-be19d460></div>', 2)),
            e("div", Ke, [
              e("div", Oe, [
                e("div", $e, [
                  t.logo_url ? (d(), a("img", {
                    key: 0,
                    src: t.logo_url,
                    class: "sc-preview-logo-img"
                  }, null, 8, Ge)) : (d(), a("div", je, [...s[52] || (s[52] = [
                    e("svg", {
                      width: "22",
                      height: "22",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "#c5d0fa",
                      "stroke-width": "1.5"
                    }, [
                      e("rect", {
                        x: "3",
                        y: "3",
                        width: "18",
                        height: "18",
                        rx: "2"
                      }),
                      e("circle", {
                        cx: "8.5",
                        cy: "8.5",
                        r: "1.5"
                      }),
                      e("polyline", { points: "21 15 16 10 5 21" })
                    ], -1)
                  ])]))
                ]),
                e("div", We, [
                  e("div", Je, v(t.default_company || "Company Name"), 1),
                  e("div", qe, v(t.company_address || "123 Business Park, Sector 62"), 1),
                  e("div", Ze, v([t.company_city, t.company_state, t.company_pincode].filter(Boolean).join(", ") || "City, State 000000"), 1),
                  e("div", Ye, v(t.company_country || "Kenya"), 1)
                ])
              ]),
              s[53] || (s[53] = l('<div class="sc-preview-divider" data-v-be19d460></div><div class="sc-preview-label" data-v-be19d460>INVOICE</div><div class="sc-preview-row" data-v-be19d460><span class="sc-preview-key" data-v-be19d460>Invoice #</span><span class="sc-preview-val" data-v-be19d460>INV-2024-001</span></div><div class="sc-preview-row" data-v-be19d460><span class="sc-preview-key" data-v-be19d460>Date</span><span class="sc-preview-val" data-v-be19d460>May 20, 2024</span></div><div class="sc-preview-row" data-v-be19d460><span class="sc-preview-key" data-v-be19d460>Due Date</span><span class="sc-preview-val" data-v-be19d460>June 03, 2024</span></div>', 5))
            ])
          ])
        ])
      ])) : m.value === "tax" ? (d(), a("div", Xe, [
        e("div", Qe, [
          e("div", es, [
            s[57] || (s[57] = l('<div class="sc-card-header" data-v-be19d460><div class="sc-card-icon" data-v-be19d460><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-be19d460><line x1="12" y1="1" x2="12" y2="23" data-v-be19d460></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" data-v-be19d460></path></svg></div><div data-v-be19d460><div class="sc-card-title" data-v-be19d460>Tax Configuration</div><div class="sc-card-subtitle" data-v-be19d460>VAT and tax settings for Kenya</div></div></div><div class="sc-divider" data-v-be19d460></div>', 2)),
            e("div", ss, [
              e("div", ts, [
                s[56] || (s[56] = e("label", { class: "nim-label" }, "KRA PIN", -1)),
                n(e("input", {
                  class: "nim-input",
                  "onUpdate:modelValue": s[13] || (s[13] = (i) => t.kra_pin = i),
                  placeholder: "A123456789Z",
                  maxlength: "11",
                  onInput: s[14] || (s[14] = (i) => t.kra_pin = (t.kra_pin || "").toUpperCase()),
                  style: U(t.kra_pin && !w(B).test(t.kra_pin) ? "border-color:#dc2626;background:#fff5f5" : t.kra_pin && w(B).test(t.kra_pin) ? "border-color:#2f9e44" : "")
                }, null, 36), [
                  [c, t.kra_pin]
                ]),
                t.kra_pin && !w(B).test(t.kra_pin) ? (d(), a("div", is, " Invalid KRA PIN format (e.g. A123456789Z) ")) : t.kra_pin && w(B).test(t.kra_pin) ? (d(), a("div", as, [...s[55] || (s[55] = [
                  e("svg", {
                    width: "12",
                    height: "12",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("polyline", { points: "20 6 9 17 4 12" })
                  ], -1),
                  r(" Valid KRA PIN ", -1)
                ])])) : y("", !0)
              ])
            ])
          ])
        ]),
        s[58] || (s[58] = l('<div class="sc-col-side" data-v-be19d460><div class="sc-info-card" data-v-be19d460><div class="sc-info-icon" data-v-be19d460><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-be19d460><circle cx="12" cy="12" r="10" data-v-be19d460></circle><line x1="12" y1="8" x2="12" y2="12" data-v-be19d460></line><line x1="12" y1="16" x2="12" y2="16.01" data-v-be19d460></line></svg></div><div class="sc-info-title" data-v-be19d460>About KRA PIN</div><div class="sc-info-body" data-v-be19d460><p data-v-be19d460>The KRA PIN is the Personal Identification Number issued by the Kenya Revenue Authority. It identifies your business for tax and VAT.</p><p data-v-be19d460>Format: <code data-v-be19d460>A123456789Z</code></p><ul data-v-be19d460><li data-v-be19d460>First letter — A (company) or P (individual)</li><li data-v-be19d460>Next 9 — digits</li><li data-v-be19d460>Last letter — check letter</li></ul><p data-v-be19d460>VAT is charged at 16% and shown on LPOs and invoices.</p></div></div></div>', 1))
      ])) : m.value === "branding" ? (d(), a("div", ds, [
        e("div", os, [
          e("div", ls, [
            s[61] || (s[61] = l('<div class="sc-card-header" data-v-be19d460><div class="sc-card-icon" data-v-be19d460><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-be19d460><rect x="3" y="3" width="18" height="18" rx="2" data-v-be19d460></rect><line x1="3" y1="9" x2="21" y2="9" data-v-be19d460></line><line x1="9" y1="21" x2="9" y2="9" data-v-be19d460></line></svg></div><div data-v-be19d460><div class="sc-card-title" data-v-be19d460>Invoice Template</div><div class="sc-card-subtitle" data-v-be19d460>Choose a layout for your PDF invoices</div></div></div><div class="sc-divider" data-v-be19d460></div>', 2)),
            e("div", ns, [
              (d(), a(f, null, C(I, (i) => e("button", {
                key: i.key,
                class: M(["sc-tmpl-btn", { "sc-tmpl-btn--active": t.pdf_template === i.key }]),
                onClick: (b) => t.pdf_template = i.key
              }, [
                s[60] || (s[60] = l('<div class="sc-tmpl-icon" data-v-be19d460><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-be19d460><rect x="3" y="3" width="18" height="18" rx="2" data-v-be19d460></rect><line x1="3" y1="9" x2="21" y2="9" data-v-be19d460></line><line x1="9" y1="21" x2="9" y2="9" data-v-be19d460></line></svg></div>', 1)),
                e("div", rs, v(i.label), 1),
                t.pdf_template === i.key ? (d(), a("div", vs, [...s[59] || (s[59] = [
                  e("svg", {
                    width: "12",
                    height: "12",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "3"
                  }, [
                    e("polyline", { points: "20 6 9 17 4 12" })
                  ], -1)
                ])])) : y("", !0)
              ], 10, cs)), 64))
            ])
          ]),
          e("div", ps, [
            s[63] || (s[63] = l('<div class="sc-card-header" data-v-be19d460><div class="sc-card-icon" data-v-be19d460><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-be19d460><circle cx="13.5" cy="6.5" r="2.5" data-v-be19d460></circle><circle cx="17.5" cy="10.5" r="2.5" data-v-be19d460></circle><circle cx="8.5" cy="7.5" r="2.5" data-v-be19d460></circle><circle cx="6.5" cy="12.5" r="2.5" data-v-be19d460></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" data-v-be19d460></path></svg></div><div data-v-be19d460><div class="sc-card-title" data-v-be19d460>Brand Color</div><div class="sc-card-subtitle" data-v-be19d460>Accent color used on PDF invoices</div></div></div><div class="sc-divider" data-v-be19d460></div>', 2)),
            e("div", us, [
              e("label", ys, [
                e("span", {
                  class: "sc-color-swatch",
                  style: U({ background: t.brand_color })
                }, null, 4),
                e("span", ms, v(t.brand_color), 1),
                n(e("input", {
                  type: "color",
                  "onUpdate:modelValue": s[15] || (s[15] = (i) => t.brand_color = i),
                  class: "sc-color-input"
                }, null, 512), [
                  [c, t.brand_color]
                ])
              ]),
              s[62] || (s[62] = e("div", { class: "sc-hint" }, "Used as the accent color on your PDF invoices.", -1))
            ])
          ])
        ]),
        e("div", bs, [
          e("div", gs, [
            s[69] || (s[69] = l('<div class="sc-card-header" data-v-be19d460><div class="sc-card-icon" data-v-be19d460><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-be19d460><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" data-v-be19d460></path><polyline points="9 22 9 12 15 12 15 22" data-v-be19d460></polyline></svg></div><div data-v-be19d460><div class="sc-card-title" data-v-be19d460>Company Logo</div><div class="sc-card-subtitle" data-v-be19d460>Default logo on PDF invoices</div></div></div><div class="sc-divider" data-v-be19d460></div>', 2)),
            e("div", hs, [
              e("div", fs, [
                t.company_logo ? (d(), a("img", {
                  key: 0,
                  src: z(t.company_logo),
                  style: { width: "100%", height: "100%", "object-fit": "contain" }
                }, null, 8, ws)) : (d(), a("div", ks, [...s[64] || (s[64] = [
                  e("svg", {
                    width: "36",
                    height: "36",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "#c5d0fa",
                    "stroke-width": "1.5"
                  }, [
                    e("rect", {
                      x: "3",
                      y: "3",
                      width: "18",
                      height: "18",
                      rx: "2"
                    }),
                    e("circle", {
                      cx: "8.5",
                      cy: "8.5",
                      r: "1.5"
                    }),
                    e("polyline", { points: "21 15 16 10 5 21" })
                  ], -1)
                ])]))
              ]),
              e("div", _s, [
                e("label", xs, [
                  s[65] || (s[65] = e("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("polyline", { points: "16 16 12 12 8 16" }),
                    e("line", {
                      x1: "12",
                      y1: "12",
                      x2: "12",
                      y2: "21"
                    }),
                    e("path", { d: "M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" })
                  ], -1)),
                  s[66] || (s[66] = r(" Upload Logo ", -1)),
                  e("input", {
                    type: "file",
                    accept: "image/*",
                    style: { display: "none" },
                    onChange: D
                  }, null, 32)
                ]),
                t.company_logo ? (d(), a("button", {
                  key: 0,
                  class: "sc-remove-btn",
                  onClick: s[16] || (s[16] = (i) => t.company_logo = "")
                }, [...s[67] || (s[67] = [
                  e("svg", {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("polyline", { points: "3 6 5 6 21 6" }),
                    e("path", { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" }),
                    e("path", { d: "M10 11v6M14 11v6" })
                  ], -1),
                  r(" Remove ", -1)
                ])])) : y("", !0)
              ]),
              s[68] || (s[68] = e("div", {
                class: "sc-hint",
                style: { "margin-top": "4px" }
              }, "PNG, JPG or SVG (max. 2MB).", -1))
            ])
          ]),
          s[70] || (s[70] = l('<div class="sc-info-card" data-v-be19d460><div class="sc-info-icon" data-v-be19d460><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-be19d460><circle cx="12" cy="12" r="10" data-v-be19d460></circle><line x1="12" y1="8" x2="12" y2="12" data-v-be19d460></line><line x1="12" y1="16" x2="12" y2="16.01" data-v-be19d460></line></svg></div><div class="sc-info-title" data-v-be19d460>Branding Tips</div><div class="sc-info-body" data-v-be19d460><ul data-v-be19d460><li data-v-be19d460>Use a PNG logo with a transparent background for best results.</li><li data-v-be19d460>Your brand color appears on invoice headers and accent elements.</li><li data-v-be19d460>The Classic template works best for most Kenyan businesses.</li></ul></div></div>', 1))
        ])
      ])) : m.value === "reminders" ? (d(), a("div", Cs, [
        e("div", Bs, [
          e("div", Ms, [
            s[77] || (s[77] = l('<div class="sc-card-header" data-v-be19d460><div class="sc-card-icon" data-v-be19d460><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-be19d460><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" data-v-be19d460></path><path d="M13.73 21a2 2 0 0 1-3.46 0" data-v-be19d460></path></svg></div><div data-v-be19d460><div class="sc-card-title" data-v-be19d460>Payment Reminders</div><div class="sc-card-subtitle" data-v-be19d460>Automate overdue payment notifications</div></div></div><div class="sc-divider" data-v-be19d460></div>', 2)),
            e("div", Ps, [
              e("div", {
                class: "sc-toggle-row",
                onClick: s[17] || (s[17] = (i) => t.auto_send_invoice = t.auto_send_invoice ? 0 : 1)
              }, [
                e("div", {
                  class: M(["sc-toggle", { "sc-toggle--on": t.auto_send_invoice }])
                }, [...s[71] || (s[71] = [
                  e("div", { class: "sc-toggle-knob" }, null, -1)
                ])], 2),
                s[72] || (s[72] = e("div", null, [
                  e("div", { class: "sc-toggle-label" }, "Auto-Send Invoice on Submit"),
                  e("div", { class: "sc-hint" }, "Email invoice to customer automatically when submitted")
                ], -1))
              ]),
              e("div", {
                class: "sc-toggle-row",
                onClick: s[18] || (s[18] = (i) => t.send_payment_reminders = t.send_payment_reminders ? 0 : 1)
              }, [
                e("div", {
                  class: M(["sc-toggle", { "sc-toggle--on": t.send_payment_reminders }])
                }, [...s[73] || (s[73] = [
                  e("div", { class: "sc-toggle-knob" }, null, -1)
                ])], 2),
                s[74] || (s[74] = e("div", null, [
                  e("div", { class: "sc-toggle-label" }, "Send Overdue Payment Reminders"),
                  e("div", { class: "sc-hint" }, "Automatically email overdue invoice reminders")
                ], -1))
              ]),
              t.send_payment_reminders ? (d(), a(f, { key: 0 }, [
                e("div", As, [
                  s[75] || (s[75] = e("label", { class: "nim-label" }, "Remind N days before due", -1)),
                  n(e("input", {
                    class: "nim-input",
                    type: "number",
                    "onUpdate:modelValue": s[19] || (s[19] = (i) => t.reminder_days_before = i),
                    min: "0"
                  }, null, 512), [
                    [c, t.reminder_days_before]
                  ])
                ]),
                e("div", Ss, [
                  s[76] || (s[76] = e("label", { class: "nim-label" }, "Remind N days after due", -1)),
                  n(e("input", {
                    class: "nim-input",
                    type: "number",
                    "onUpdate:modelValue": s[20] || (s[20] = (i) => t.reminder_days_after = i),
                    min: "1"
                  }, null, 512), [
                    [c, t.reminder_days_after]
                  ])
                ])
              ], 64)) : y("", !0)
            ])
          ])
        ]),
        s[78] || (s[78] = l('<div class="sc-col-side" data-v-be19d460><div class="sc-info-card" data-v-be19d460><div class="sc-info-icon" data-v-be19d460><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-be19d460><circle cx="12" cy="12" r="10" data-v-be19d460></circle><line x1="12" y1="8" x2="12" y2="12" data-v-be19d460></line><line x1="12" y1="16" x2="12" y2="16.01" data-v-be19d460></line></svg></div><div class="sc-info-title" data-v-be19d460>How Reminders Work</div><div class="sc-info-body" data-v-be19d460><ul data-v-be19d460><li data-v-be19d460>Invoices are emailed to customers automatically on submit when auto-send is on.</li><li data-v-be19d460>Overdue reminders are sent based on the days before/after the due date you configure.</li><li data-v-be19d460>Emails use the company email address set in Company Profile.</li></ul></div></div></div>', 1))
      ])) : m.value === "period_lock" ? (d(), a("div", Vs, [
        e("div", Ns, [
          e("div", Us, [
            s[84] || (s[84] = l('<div class="sc-card-header" data-v-be19d460><div class="sc-card-icon sc-card-icon--red" data-v-be19d460><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-be19d460><rect x="3" y="11" width="18" height="11" rx="2" ry="2" data-v-be19d460></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-v-be19d460></path></svg></div><div data-v-be19d460><div class="sc-card-title" data-v-be19d460>Books Lock Date</div><div class="sc-card-subtitle" data-v-be19d460>Freeze all financial transactions on or before this date</div></div></div><div class="sc-divider" data-v-be19d460></div>', 2)),
            e("div", Ls, [
              e("div", Ts, [
                s[79] || (s[79] = e("label", { class: "nim-label" }, "Books Lock Date", -1)),
                n(e("input", {
                  class: "nim-input",
                  type: "date",
                  "onUpdate:modelValue": s[21] || (s[21] = (i) => t.lock_date = i)
                }, null, 512), [
                  [c, t.lock_date]
                ]),
                s[80] || (s[80] = e("div", {
                  class: "sc-hint",
                  style: { "margin-top": "6px" }
                }, " Freeze all financial transactions on or before this date. Only a System Manager can post past it. ", -1))
              ]),
              t.lock_date ? (d(), a("div", Is, [
                s[81] || (s[81] = e("svg", {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  e("rect", {
                    x: "3",
                    y: "11",
                    width: "18",
                    height: "11",
                    rx: "2",
                    ry: "2"
                  }),
                  e("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
                ], -1)),
                r(" Locked up to " + v(new Date(t.lock_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })), 1)
              ])) : (d(), a("div", zs, [...s[82] || (s[82] = [
                e("svg", {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  e("rect", {
                    x: "3",
                    y: "11",
                    width: "18",
                    height: "11",
                    rx: "2",
                    ry: "2"
                  }),
                  e("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
                ], -1),
                r(" No lock date set — all periods are open ", -1)
              ])])),
              t.lock_date ? (d(), a("div", Ds, [
                e("button", {
                  class: "sc-remove-btn",
                  onClick: s[22] || (s[22] = (i) => t.lock_date = "")
                }, [...s[83] || (s[83] = [
                  e("svg", {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    e("polyline", { points: "3 6 5 6 21 6" }),
                    e("path", { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" })
                  ], -1),
                  r(" Clear Lock Date ", -1)
                ])])
              ])) : y("", !0)
            ])
          ])
        ]),
        s[85] || (s[85] = l('<div class="sc-col-side" data-v-be19d460><div class="sc-info-card sc-info-card--warn" data-v-be19d460><div class="sc-info-icon sc-info-icon--red" data-v-be19d460><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-be19d460><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" data-v-be19d460></path><line x1="12" y1="9" x2="12" y2="13" data-v-be19d460></line><line x1="12" y1="17" x2="12.01" y2="17" data-v-be19d460></line></svg></div><div class="sc-info-title sc-info-title--red" data-v-be19d460>How Period Lock Works</div><div class="sc-info-body" data-v-be19d460><ul data-v-be19d460><li data-v-be19d460>All transactions dated <strong data-v-be19d460>on or before</strong> the lock date are frozen.</li><li data-v-be19d460>Applies to Invoices, Bills, Payments, Journal Entries, Credit Notes, and more.</li><li data-v-be19d460>Only a <strong data-v-be19d460>System Manager</strong> role can post past the lock date.</li><li data-v-be19d460>Clear the date to remove the lock entirely.</li><li data-v-be19d460>This is separate from fiscal year period locks, which apply per period in the Fiscal Years page.</li></ul></div></div></div>', 1))
      ])) : y("", !0)
    ]));
  }
}, Hs = /* @__PURE__ */ H(Rs, [["__scopeId", "data-v-be19d460"]]);
export {
  Hs as default
};
