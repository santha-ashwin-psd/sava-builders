import { _ as L, x as N, o as F, c as o, a as s, d as c, t as n, F as y, r as g, u as H, W as v, w as f, A as m, ab as k, n as _, b as A, p as O, l as $, h as x, J as S, g as C, z as M, R as D, k as l } from "./main-Cij9_Vxg.js";
const Y = { class: "sp-page" }, j = { class: "sp-sticky" }, I = { class: "sp-header" }, R = ["disabled"], G = ["disabled"], J = { class: "sp-tabs" }, W = ["onClick"], Z = ["innerHTML"], q = {
  key: 0,
  class: "sp-body"
}, K = { class: "sp-col-main" }, Q = { class: "sp-card sp-avatar-card" }, X = { class: "sp-avatar-section" }, ss = { class: "sp-avatar-wrap" }, as = { class: "sp-avatar" }, ts = { class: "sp-identity" }, is = { class: "sp-identity-name" }, es = { class: "sp-identity-email" }, ds = { class: "sp-hero-stats" }, os = { class: "sp-hero-stat" }, ls = { class: "sp-hero-stat-val" }, ns = { class: "sp-card" }, rs = { class: "sp-fg" }, vs = { class: "nim-field" }, ps = { class: "nim-field" }, fs = { class: "nim-field sp-full" }, cs = { class: "sp-input-locked" }, us = ["value"], ws = { class: "nim-field" }, hs = { class: "sp-input-icon-wrap" }, bs = { class: "nim-field" }, ms = { class: "sp-input-icon-wrap" }, ys = { class: "sp-security-tip" }, gs = { class: "sp-tip-shield-right" }, ks = { class: "sp-tip-stars" }, _s = { class: "sp-col-side" }, xs = { class: "sp-card" }, Cs = { class: "sp-summary-list" }, Ms = { class: "sp-summary-row" }, Bs = { class: "sp-summary-val" }, As = { class: "sp-summary-row" }, Ss = { class: "sp-summary-val sp-summary-mono" }, Ps = { class: "sp-summary-row" }, Vs = { class: "sp-summary-val" }, zs = { class: "sp-summary-row" }, Ts = { class: "sp-summary-val" }, Us = { class: "sp-card" }, Es = {
  width: "13",
  height: "13",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  style: { "margin-left": "auto" }
}, Ls = {
  key: 1,
  class: "sp-body"
}, Ns = { class: "sp-col-main" }, Fs = { class: "sp-card" }, Hs = { class: "sp-fg sp-fg--single" }, Os = { class: "nim-field" }, $s = { class: "sp-pw-field" }, Ds = ["type"], Ys = {
  key: 0,
  width: "15",
  height: "15",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, js = {
  key: 1,
  width: "15",
  height: "15",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Is = { class: "nim-field" }, Rs = { class: "sp-pw-field" }, Gs = ["type"], Js = {
  key: 0,
  width: "15",
  height: "15",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Ws = {
  key: 1,
  width: "15",
  height: "15",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, Zs = {
  key: 0,
  class: "sp-pw-strength"
}, qs = { class: "sp-pw-bars" }, Ks = { class: "nim-field" }, Qs = { class: "sp-pw-field" }, Xs = ["type"], sa = {
  key: 0,
  width: "15",
  height: "15",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, aa = {
  key: 1,
  width: "15",
  height: "15",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2"
}, ta = {
  key: 0,
  style: { "margin-top": "4px", "font-size": "12px", color: "#dc2626", display: "flex", "align-items": "center", gap: "4px" }
}, ia = {
  __name: "SettingsProfile",
  setup(ea) {
    const { toast: p } = N(), { role: P } = D(), V = [
      { k: "profile", l: "Profile", icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
      { k: "security", l: "Security", icon: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>' }
    ], i = M({ email: "", first_name: "", last_name: "", phone: "", mobile_no: "", user_image: "" }), e = M({ old_password: "", new_password: "", confirm_password: "" }), h = x(!1), b = x(!1), u = x("profile"), r = M({ old: !1, new: !1, confirm: !1 });
    async function z() {
      try {
        const d = await $("psd_books.api.admin.get_profile");
        Object.assign(i, d);
      } catch {
        p("Could not load profile", "error");
      }
    }
    async function T() {
      h.value = !0;
      try {
        const d = await S("psd_books.api.admin.update_profile", {
          first_name: i.first_name,
          last_name: i.last_name,
          phone: i.phone,
          mobile_no: i.mobile_no
        });
        d != null && d.full_name && (window.frappe.session.user_fullname = d.full_name), p("Profile updated successfully");
      } catch (d) {
        p(d.message, "error");
      }
      h.value = !1;
    }
    async function U() {
      if (!e.old_password || !e.new_password) return p("All fields required", "error");
      if (e.new_password !== e.confirm_password) return p("New passwords do not match", "error");
      if (e.new_password.length < 8) return p("Password must be at least 8 characters", "error");
      b.value = !0;
      try {
        await S("psd_books.api.admin.change_password", {
          old_password: e.old_password,
          new_password: e.new_password
        }), p("Password changed successfully"), Object.assign(e, { old_password: "", new_password: "", confirm_password: "" });
      } catch (d) {
        p(d.message, "error");
      }
      b.value = !1;
    }
    const E = C(() => (((i.first_name || "") + " " + (i.last_name || "")).trim() || i.email || "U").split(" ").map((a) => a[0]).join("").toUpperCase().slice(0, 2)), w = C(() => {
      const d = e.new_password;
      if (!d) return 0;
      let a = 0;
      return d.length >= 8 && a++, /[A-Z]/.test(d) && a++, /[0-9]/.test(d) && a++, /[^A-Za-z0-9]/.test(d) && a++, a;
    }), B = C(
      () => ["", "Weak", "Fair", "Good", "Strong"][w.value] || ""
    );
    return F(z), (d, a) => (l(), o("div", Y, [
      s("div", j, [
        s("div", I, [
          a[13] || (a[13] = s("span", { class: "sp-title" }, "My Account", -1)),
          u.value === "profile" ? (l(), o("button", {
            key: 0,
            class: "nim-btn nim-btn-primary sp-save-btn",
            onClick: T,
            disabled: h.value
          }, [
            a[11] || (a[11] = s("svg", {
              width: "15",
              height: "15",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              s("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }),
              s("polyline", { points: "17 21 17 13 7 13 7 21" }),
              s("polyline", { points: "7 3 7 8 15 8" })
            ], -1)),
            c(" " + n(h.value ? "Saving…" : "Save Changes"), 1)
          ], 8, R)) : (l(), o("button", {
            key: 1,
            class: "nim-btn nim-btn-primary sp-save-btn",
            onClick: U,
            disabled: b.value
          }, [
            a[12] || (a[12] = s("svg", {
              width: "15",
              height: "15",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              s("rect", {
                x: "3",
                y: "11",
                width: "18",
                height: "11",
                rx: "2",
                ry: "2"
              }),
              s("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
            ], -1)),
            c(" " + n(b.value ? "Updating…" : "Update Password"), 1)
          ], 8, G))
        ]),
        s("div", J, [
          (l(), o(y, null, g(V, (t) => s("button", {
            key: t.k,
            class: _(["sp-tab", { "sp-tab--active": u.value === t.k }]),
            onClick: (da) => u.value = t.k
          }, [
            (l(), o("svg", {
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2",
              innerHTML: t.icon
            }, null, 8, Z)),
            c(" " + n(t.l), 1)
          ], 10, W)), 64))
        ])
      ]),
      u.value === "profile" ? (l(), o("div", q, [
        s("div", K, [
          s("div", Q, [
            s("div", X, [
              s("div", ss, [
                s("div", as, [
                  s("span", null, n(E.value), 1),
                  a[14] || (a[14] = s("div", { class: "sp-avatar-ring" }, null, -1))
                ]),
                a[15] || (a[15] = s("div", { class: "sp-online-dot" }, null, -1))
              ]),
              s("div", ts, [
                s("div", is, n(i.first_name) + " " + n(i.last_name), 1),
                s("div", es, n(i.email), 1),
                a[16] || (a[16] = s("div", { class: "sp-identity-badge" }, [
                  s("svg", {
                    width: "11",
                    height: "11",
                    viewBox: "0 0 24 24",
                    fill: "currentColor"
                  }, [
                    s("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })
                  ]),
                  c(" Active Account ")
                ], -1))
              ]),
              s("div", ds, [
                s("div", os, [
                  a[17] || (a[17] = s("div", { class: "sp-hero-stat-icon" }, [
                    s("svg", {
                      width: "18",
                      height: "18",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.8"
                    }, [
                      s("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                      s("circle", {
                        cx: "12",
                        cy: "7",
                        r: "4"
                      })
                    ])
                  ], -1)),
                  s("div", ls, n(H(P) || "Member"), 1),
                  a[18] || (a[18] = s("div", { class: "sp-hero-stat-lbl" }, "ROLE", -1))
                ]),
                a[19] || (a[19] = v('<div class="sp-hero-stat-sep" data-v-00afb6f3></div><div class="sp-hero-stat" data-v-00afb6f3><div class="sp-hero-stat-icon" data-v-00afb6f3><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" data-v-00afb6f3><rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-v-00afb6f3></rect><line x1="16" y1="2" x2="16" y2="6" data-v-00afb6f3></line><line x1="8" y1="2" x2="8" y2="6" data-v-00afb6f3></line><line x1="3" y1="10" x2="21" y2="10" data-v-00afb6f3></line></svg></div><div class="sp-hero-stat-val" data-v-00afb6f3>Today</div><div class="sp-hero-stat-lbl" data-v-00afb6f3>JOINED</div></div><div class="sp-hero-stat-sep" data-v-00afb6f3></div><div class="sp-hero-stat" data-v-00afb6f3><div class="sp-hero-stat-icon" data-v-00afb6f3><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" data-v-00afb6f3><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-00afb6f3></path></svg></div><div class="sp-hero-stat-val" data-v-00afb6f3>Active</div><div class="sp-hero-stat-lbl" data-v-00afb6f3>STATUS</div></div>', 4))
              ])
            ])
          ]),
          s("div", ns, [
            a[29] || (a[29] = v('<div class="sp-card-header" data-v-00afb6f3><div class="sp-card-icon sp-card-icon--blue" data-v-00afb6f3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00afb6f3><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" data-v-00afb6f3></path><circle cx="12" cy="7" r="4" data-v-00afb6f3></circle></svg></div><div data-v-00afb6f3><div class="sp-card-title" data-v-00afb6f3>Personal Information</div><div class="sp-card-subtitle" data-v-00afb6f3>Update your name and contact details</div></div></div><div class="sp-divider" data-v-00afb6f3></div>', 2)),
            s("div", rs, [
              s("div", vs, [
                a[20] || (a[20] = s("label", { class: "nim-label" }, "First Name", -1)),
                f(s("input", {
                  class: "nim-input",
                  "onUpdate:modelValue": a[0] || (a[0] = (t) => i.first_name = t),
                  placeholder: "Enter first name"
                }, null, 512), [
                  [m, i.first_name]
                ])
              ]),
              s("div", ps, [
                a[21] || (a[21] = s("label", { class: "nim-label" }, "Last Name", -1)),
                f(s("input", {
                  class: "nim-input",
                  "onUpdate:modelValue": a[1] || (a[1] = (t) => i.last_name = t),
                  placeholder: "Enter last name"
                }, null, 512), [
                  [m, i.last_name]
                ])
              ]),
              s("div", fs, [
                a[23] || (a[23] = s("label", { class: "nim-label" }, "Email Address", -1)),
                s("div", cs, [
                  a[22] || (a[22] = s("svg", {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    s("rect", {
                      x: "3",
                      y: "11",
                      width: "18",
                      height: "11",
                      rx: "2",
                      ry: "2"
                    }),
                    s("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
                  ], -1)),
                  s("input", {
                    class: "nim-input sp-locked-input",
                    value: i.email,
                    disabled: ""
                  }, null, 8, us)
                ]),
                a[24] || (a[24] = s("div", { class: "sp-field-hint" }, "Email cannot be changed. Contact your administrator.", -1))
              ]),
              s("div", ws, [
                a[26] || (a[26] = s("label", { class: "nim-label" }, "Phone", -1)),
                s("div", hs, [
                  a[25] || (a[25] = s("svg", {
                    class: "sp-input-icon",
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    s("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" })
                  ], -1)),
                  f(s("input", {
                    class: "nim-input sp-icon-input",
                    "onUpdate:modelValue": a[2] || (a[2] = (t) => i.phone = t),
                    placeholder: "+254 700 000 000"
                  }, null, 512), [
                    [m, i.phone]
                  ])
                ])
              ]),
              s("div", bs, [
                a[28] || (a[28] = s("label", { class: "nim-label" }, "Mobile", -1)),
                s("div", ms, [
                  a[27] || (a[27] = s("svg", {
                    class: "sp-input-icon",
                    width: "13",
                    height: "13",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    s("rect", {
                      x: "5",
                      y: "2",
                      width: "14",
                      height: "20",
                      rx: "2",
                      ry: "2"
                    }),
                    s("line", {
                      x1: "12",
                      y1: "18",
                      x2: "12",
                      y2: "18.01"
                    })
                  ], -1)),
                  f(s("input", {
                    class: "nim-input sp-icon-input",
                    "onUpdate:modelValue": a[3] || (a[3] = (t) => i.mobile_no = t),
                    placeholder: "+254 700 000 000"
                  }, null, 512), [
                    [m, i.mobile_no]
                  ])
                ])
              ])
            ])
          ]),
          s("div", ys, [
            a[31] || (a[31] = v('<div class="sp-tip-shield-left" data-v-00afb6f3><svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1.5" data-v-00afb6f3><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-00afb6f3></path></svg></div><div class="sp-tip-content" data-v-00afb6f3><div class="sp-tip-title" data-v-00afb6f3>Account Security Tip</div><div class="sp-tip-text" data-v-00afb6f3>Keep your account secure by using a strong password and enabling two-factor authentication.</div></div>', 2)),
            s("div", gs, [
              a[30] || (a[30] = s("svg", {
                width: "52",
                height: "52",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "rgba(255,255,255,0.25)",
                "stroke-width": "1.2"
              }, [
                s("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
              ], -1)),
              s("div", ks, [
                (l(), o(y, null, g(5, (t) => s("span", {
                  key: t,
                  class: "sp-tip-star"
                }, "★")), 64))
              ])
            ])
          ])
        ]),
        s("div", _s, [
          s("div", xs, [
            a[37] || (a[37] = v('<div class="sp-card-header" data-v-00afb6f3><div class="sp-card-icon sp-card-icon--green" data-v-00afb6f3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00afb6f3><rect x="3" y="3" width="18" height="18" rx="2" data-v-00afb6f3></rect><path d="M9 9h6M9 12h6M9 15h4" data-v-00afb6f3></path></svg></div><div data-v-00afb6f3><div class="sp-card-title" data-v-00afb6f3>Account Summary</div><div class="sp-card-subtitle" data-v-00afb6f3>Your account at a glance</div></div></div><div class="sp-divider" data-v-00afb6f3></div>', 2)),
            s("div", Cs, [
              s("div", Ms, [
                a[32] || (a[32] = s("span", { class: "sp-summary-lbl" }, "Full Name", -1)),
                s("span", Bs, n(i.first_name) + " " + n(i.last_name), 1)
              ]),
              s("div", As, [
                a[33] || (a[33] = s("span", { class: "sp-summary-lbl" }, "Email", -1)),
                s("span", Ss, n(i.email), 1)
              ]),
              s("div", Ps, [
                a[34] || (a[34] = s("span", { class: "sp-summary-lbl" }, "Phone", -1)),
                s("span", Vs, n(i.phone || "—"), 1)
              ]),
              s("div", zs, [
                a[35] || (a[35] = s("span", { class: "sp-summary-lbl" }, "Mobile", -1)),
                s("span", Ts, n(i.mobile_no || "—"), 1)
              ]),
              a[36] || (a[36] = v('<div class="sp-summary-divider" data-v-00afb6f3></div><div class="sp-summary-row" data-v-00afb6f3><span class="sp-summary-lbl" data-v-00afb6f3>Account Status</span><span class="sp-pill sp-pill--green" data-v-00afb6f3><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" data-v-00afb6f3><circle cx="12" cy="12" r="5" data-v-00afb6f3></circle></svg> Active </span></div>', 2))
            ])
          ]),
          s("div", Us, [
            a[41] || (a[41] = v('<div class="sp-card-header" data-v-00afb6f3><div class="sp-card-icon sp-card-icon--indigo" data-v-00afb6f3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00afb6f3><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-00afb6f3></path></svg></div><div data-v-00afb6f3><div class="sp-card-title" data-v-00afb6f3>Security Status</div><div class="sp-card-subtitle" data-v-00afb6f3>Your account protection level</div></div></div><div class="sp-divider" data-v-00afb6f3></div><div class="sp-sec-list" data-v-00afb6f3><div class="sp-sec-row" data-v-00afb6f3><div class="sp-sec-check sp-sec-check--on" data-v-00afb6f3><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-v-00afb6f3><polyline points="20 6 9 17 4 12" data-v-00afb6f3></polyline></svg></div><div class="sp-sec-info" data-v-00afb6f3><div class="sp-sec-label" data-v-00afb6f3>Password Set</div><div class="sp-sec-sub" data-v-00afb6f3>Account is password protected</div></div></div><div class="sp-sec-row" data-v-00afb6f3><div class="sp-sec-check sp-sec-check--on" data-v-00afb6f3><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-v-00afb6f3><polyline points="20 6 9 17 4 12" data-v-00afb6f3></polyline></svg></div><div class="sp-sec-info" data-v-00afb6f3><div class="sp-sec-label" data-v-00afb6f3>Email Verified</div><div class="sp-sec-sub" data-v-00afb6f3>Login email is verified</div></div></div></div><div class="sp-divider" data-v-00afb6f3></div>', 4)),
            s("button", {
              class: "sp-link-btn",
              onClick: a[4] || (a[4] = (t) => u.value = "security")
            }, [
              a[39] || (a[39] = s("svg", {
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                s("rect", {
                  x: "3",
                  y: "11",
                  width: "18",
                  height: "11",
                  rx: "2",
                  ry: "2"
                }),
                s("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
              ], -1)),
              a[40] || (a[40] = c(" Manage Security Settings ", -1)),
              (l(), o("svg", Es, [...a[38] || (a[38] = [
                s("polyline", { points: "9 18 15 12 9 6" }, null, -1)
              ])]))
            ])
          ])
        ])
      ])) : (l(), o("div", Ls, [
        s("div", Ns, [
          s("div", Fs, [
            a[52] || (a[52] = v('<div class="sp-card-header" data-v-00afb6f3><div class="sp-card-icon sp-card-icon--indigo" data-v-00afb6f3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00afb6f3><rect x="3" y="11" width="18" height="11" rx="2" ry="2" data-v-00afb6f3></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-v-00afb6f3></path></svg></div><div data-v-00afb6f3><div class="sp-card-title" data-v-00afb6f3>Change Password</div><div class="sp-card-subtitle" data-v-00afb6f3>Use at least 8 characters with letters and numbers</div></div></div><div class="sp-divider" data-v-00afb6f3></div>', 2)),
            s("div", Hs, [
              s("div", Os, [
                a[44] || (a[44] = s("label", { class: "nim-label" }, "Current Password", -1)),
                s("div", $s, [
                  f(s("input", {
                    class: "nim-input sp-pw-input",
                    type: r.old ? "text" : "password",
                    "onUpdate:modelValue": a[5] || (a[5] = (t) => e.old_password = t),
                    placeholder: "Enter current password"
                  }, null, 8, Ds), [
                    [k, e.old_password]
                  ]),
                  s("button", {
                    class: "sp-pw-eye",
                    onClick: a[6] || (a[6] = (t) => r.old = !r.old),
                    type: "button"
                  }, [
                    r.old ? (l(), o("svg", js, [...a[43] || (a[43] = [
                      s("path", { d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" }, null, -1),
                      s("line", {
                        x1: "1",
                        y1: "1",
                        x2: "23",
                        y2: "23"
                      }, null, -1)
                    ])])) : (l(), o("svg", Ys, [...a[42] || (a[42] = [
                      s("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }, null, -1),
                      s("circle", {
                        cx: "12",
                        cy: "12",
                        r: "3"
                      }, null, -1)
                    ])]))
                  ])
                ])
              ]),
              s("div", Is, [
                a[47] || (a[47] = s("label", { class: "nim-label" }, "New Password", -1)),
                s("div", Rs, [
                  f(s("input", {
                    class: "nim-input sp-pw-input",
                    type: r.new ? "text" : "password",
                    "onUpdate:modelValue": a[7] || (a[7] = (t) => e.new_password = t),
                    placeholder: "Enter new password"
                  }, null, 8, Gs), [
                    [k, e.new_password]
                  ]),
                  s("button", {
                    class: "sp-pw-eye",
                    onClick: a[8] || (a[8] = (t) => r.new = !r.new),
                    type: "button"
                  }, [
                    r.new ? (l(), o("svg", Ws, [...a[46] || (a[46] = [
                      s("path", { d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" }, null, -1),
                      s("line", {
                        x1: "1",
                        y1: "1",
                        x2: "23",
                        y2: "23"
                      }, null, -1)
                    ])])) : (l(), o("svg", Js, [...a[45] || (a[45] = [
                      s("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }, null, -1),
                      s("circle", {
                        cx: "12",
                        cy: "12",
                        r: "3"
                      }, null, -1)
                    ])]))
                  ])
                ]),
                e.new_password ? (l(), o("div", Zs, [
                  s("div", qs, [
                    (l(), o(y, null, g(4, (t) => s("div", {
                      key: t,
                      class: _(["sp-pw-bar", { "sp-pw-bar--weak": w.value >= 1 && t === 1, "sp-pw-bar--fair": w.value >= 2 && t <= 2, "sp-pw-bar--good": w.value >= 3 && t <= 3, "sp-pw-bar--strong": w.value >= 4 }])
                    }, null, 2)), 64))
                  ]),
                  s("span", {
                    class: _(["sp-pw-label", "sp-pw-label--" + B.value.toLowerCase()])
                  }, n(B.value), 3)
                ])) : A("", !0)
              ]),
              s("div", Ks, [
                a[51] || (a[51] = s("label", { class: "nim-label" }, "Confirm New Password", -1)),
                s("div", Qs, [
                  f(s("input", {
                    class: "nim-input sp-pw-input",
                    type: r.confirm ? "text" : "password",
                    "onUpdate:modelValue": a[9] || (a[9] = (t) => e.confirm_password = t),
                    placeholder: "Re-enter new password",
                    style: O(e.confirm_password && e.new_password !== e.confirm_password ? "border-color:#dc2626" : e.confirm_password && e.new_password === e.confirm_password ? "border-color:#2f9e44" : "")
                  }, null, 12, Xs), [
                    [k, e.confirm_password]
                  ]),
                  s("button", {
                    class: "sp-pw-eye",
                    onClick: a[10] || (a[10] = (t) => r.confirm = !r.confirm),
                    type: "button"
                  }, [
                    r.confirm ? (l(), o("svg", aa, [...a[49] || (a[49] = [
                      s("path", { d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" }, null, -1),
                      s("line", {
                        x1: "1",
                        y1: "1",
                        x2: "23",
                        y2: "23"
                      }, null, -1)
                    ])])) : (l(), o("svg", sa, [...a[48] || (a[48] = [
                      s("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }, null, -1),
                      s("circle", {
                        cx: "12",
                        cy: "12",
                        r: "3"
                      }, null, -1)
                    ])]))
                  ])
                ]),
                e.confirm_password && e.new_password !== e.confirm_password ? (l(), o("div", ta, [...a[50] || (a[50] = [
                  s("svg", {
                    width: "11",
                    height: "11",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    s("circle", {
                      cx: "12",
                      cy: "12",
                      r: "10"
                    }),
                    s("line", {
                      x1: "12",
                      y1: "8",
                      x2: "12",
                      y2: "12"
                    }),
                    s("line", {
                      x1: "12",
                      y1: "16",
                      x2: "12",
                      y2: "16.01"
                    })
                  ], -1),
                  c(" Passwords do not match ", -1)
                ])])) : A("", !0)
              ])
            ])
          ])
        ]),
        a[53] || (a[53] = v('<div class="sp-col-side" data-v-00afb6f3><div class="sp-card" data-v-00afb6f3><div class="sp-card-header" data-v-00afb6f3><div class="sp-card-icon sp-card-icon--indigo" data-v-00afb6f3><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00afb6f3><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-00afb6f3></path></svg></div><div data-v-00afb6f3><div class="sp-card-title" data-v-00afb6f3>Security Status</div><div class="sp-card-subtitle" data-v-00afb6f3>Your account protection level</div></div></div><div class="sp-divider" data-v-00afb6f3></div><div class="sp-sec-list" data-v-00afb6f3><div class="sp-sec-row" data-v-00afb6f3><div class="sp-sec-check sp-sec-check--on" data-v-00afb6f3><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-v-00afb6f3><polyline points="20 6 9 17 4 12" data-v-00afb6f3></polyline></svg></div><div class="sp-sec-info" data-v-00afb6f3><div class="sp-sec-label" data-v-00afb6f3>Password Set</div><div class="sp-sec-sub" data-v-00afb6f3>Account is password protected</div></div></div><div class="sp-sec-row" data-v-00afb6f3><div class="sp-sec-check sp-sec-check--on" data-v-00afb6f3><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-v-00afb6f3><polyline points="20 6 9 17 4 12" data-v-00afb6f3></polyline></svg></div><div class="sp-sec-info" data-v-00afb6f3><div class="sp-sec-label" data-v-00afb6f3>Email Verified</div><div class="sp-sec-sub" data-v-00afb6f3>Login email is verified</div></div></div></div></div><div class="sp-card sp-tips-card" data-v-00afb6f3><div class="sp-tips-header" data-v-00afb6f3><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00afb6f3><circle cx="12" cy="12" r="10" data-v-00afb6f3></circle><line x1="12" y1="8" x2="12" y2="12" data-v-00afb6f3></line><line x1="12" y1="16" x2="12" y2="16.01" data-v-00afb6f3></line></svg> Password Tips </div><div class="sp-tips-list" data-v-00afb6f3><div class="sp-tip" data-v-00afb6f3>Use at least 8 characters with uppercase, numbers and symbols.</div><div class="sp-tip" data-v-00afb6f3>Avoid using your name, email, or common words.</div><div class="sp-tip" data-v-00afb6f3>Change your password every 3–6 months for best security.</div></div></div></div>', 1))
      ])),
      a[54] || (a[54] = v('<div class="sp-footer" data-v-00afb6f3><div class="sp-footer-left" data-v-00afb6f3><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00afb6f3><rect x="3" y="11" width="18" height="11" rx="2" ry="2" data-v-00afb6f3></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-v-00afb6f3></path></svg> Your account information is encrypted and secure </div><div class="sp-footer-right" data-v-00afb6f3><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-00afb6f3><circle cx="12" cy="12" r="10" data-v-00afb6f3></circle><polyline points="12 6 12 12 16 14" data-v-00afb6f3></polyline></svg> Last updated: Today, 10:30 AM </div></div>', 1))
    ]));
  }
}, la = /* @__PURE__ */ L(ia, [["__scopeId", "data-v-00afb6f3"]]);
export {
  la as default
};
