import { _ as O, x as G, o as A, c as r, a as e, W as y, n as v, t as d, d as l, w as g, A as p, u as c, i as m, b as k, l as I, h as E, z as C, J as M, k as f } from "./main-C8JwrB8O.js";
const T = { class: "sso-page" }, z = {
  key: 0,
  class: "sso-loading"
}, B = {
  key: 1,
  class: "sso-grid"
}, $ = { class: "sso-card-header" }, D = { class: "sso-form" }, H = { class: "sso-field" }, L = { class: "sso-field" }, U = ["placeholder"], V = { class: "sso-hint" }, q = ["innerHTML"], F = { class: "sso-code" }, N = { class: "sso-actions" }, P = ["disabled"], j = ["disabled"], R = { class: "sso-card-header" }, W = { class: "sso-form" }, J = { class: "sso-field" }, Y = { class: "sso-field" }, K = ["placeholder"], Q = { class: "sso-hint" }, X = ["innerHTML"], Z = { class: "sso-code" }, ss = { class: "sso-actions" }, es = ["disabled"], ts = ["disabled"], is = { class: "sso-info-card" }, as = { class: "sso-info-title" }, os = ["innerHTML"], ls = {
  __name: "SettingsSSO",
  setup(ns) {
    const { toast: n } = G(), b = E(!0), x = window.location.origin, i = C({ enabled: !1, client_id: "", client_secret: "", has_secret: !1, saving: !1 }), a = C({ enabled: !1, client_id: "", client_secret: "", has_secret: !1, saving: !1 });
    async function u() {
      var o, s;
      b.value = !0;
      try {
        const t = await I("psd_books.api.admin.get_sso_providers"), _ = (t == null ? void 0 : t.Google) || ((o = t == null ? void 0 : t.message) == null ? void 0 : o.Google) || {}, h = (t == null ? void 0 : t["Office 365"]) || ((s = t == null ? void 0 : t.message) == null ? void 0 : s["Office 365"]) || {};
        Object.assign(i, { enabled: !!_.enabled, client_id: _.client_id || "", has_secret: !!_.has_secret, client_secret: "" }), Object.assign(a, { enabled: !!h.enabled, client_id: h.client_id || "", has_secret: !!h.has_secret, client_secret: "" });
      } catch (t) {
        n.error(t.message || "Failed to load SSO settings");
      } finally {
        b.value = !1;
      }
    }
    async function S(o) {
      const s = o === "Google" ? i : a;
      if (!s.client_id) return n.error("Client ID is required");
      if (!s.has_secret && !s.client_secret) return n.error("Client Secret is required");
      s.saving = !0;
      try {
        await M("psd_books.api.admin.save_sso_provider", {
          provider: o,
          client_id: s.client_id,
          client_secret: s.client_secret || "",
          enabled: 1
        }), n.success(`${o} SSO enabled`), await u();
      } catch (t) {
        n.error(t.message || "Failed to save");
      } finally {
        s.saving = !1;
      }
    }
    async function w(o) {
      const s = o === "Google" ? i : a;
      s.saving = !0;
      try {
        await M("psd_books.api.admin.disable_sso_provider", { provider: o }), n.success(`${o} SSO disabled`), await u();
      } catch (t) {
        n.error(t.message || "Failed to disable");
      } finally {
        s.saving = !1;
      }
    }
    return A(u), (o, s) => (f(), r("div", T, [
      s[22] || (s[22] = e("div", { class: "sso-head" }, [
        e("div", null, [
          e("div", { class: "sso-title" }, "Single Sign-On"),
          e("div", { class: "sso-sub" }, "Allow your team to log in with Google or Microsoft. Users who sign in via SSO are automatically provisioned if they match a team member's email.")
        ])
      ], -1)),
      b.value ? (f(), r("div", z, "Loading…")) : (f(), r("div", B, [
        e("div", {
          class: v(["sso-card", i.enabled ? "card-on" : ""])
        }, [
          e("div", $, [
            s[8] || (s[8] = y('<div class="sso-logo google-logo" data-v-a153bf29><svg width="22" height="22" viewBox="0 0 48 48" data-v-a153bf29><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" data-v-a153bf29></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" data-v-a153bf29></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" data-v-a153bf29></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" data-v-a153bf29></path><path fill="none" d="M0 0h48v48H0z" data-v-a153bf29></path></svg></div><div class="sso-card-meta" data-v-a153bf29><div class="sso-card-name" data-v-a153bf29>Google Sign-In</div><div class="sso-card-desc" data-v-a153bf29>Let users log in with their Google / Google Workspace account</div></div>', 2)),
            e("span", {
              class: v(["sso-pill", i.enabled ? "pill-on" : "pill-off"])
            }, d(i.enabled ? "Active" : "Inactive"), 3)
          ]),
          e("div", D, [
            e("div", H, [
              s[9] || (s[9] = e("label", { class: "sso-lbl" }, [
                l("Client ID "),
                e("span", { class: "req" }, "*")
              ], -1)),
              g(e("input", {
                "onUpdate:modelValue": s[0] || (s[0] = (t) => i.client_id = t),
                class: "sso-input",
                placeholder: "xxxx.apps.googleusercontent.com",
                autocomplete: "off"
              }, null, 512), [
                [p, i.client_id]
              ])
            ]),
            e("div", L, [
              s[10] || (s[10] = e("label", { class: "sso-lbl" }, [
                l("Client Secret "),
                e("span", { class: "req" }, "*")
              ], -1)),
              g(e("input", {
                "onUpdate:modelValue": s[1] || (s[1] = (t) => i.client_secret = t),
                class: "sso-input",
                type: "password",
                placeholder: i.has_secret ? "••••••••••••• (saved)" : "Enter client secret",
                autocomplete: "off"
              }, null, 8, U), [
                [p, i.client_secret]
              ])
            ]),
            e("div", V, [
              e("span", {
                innerHTML: c(m)("ext", 11)
              }, null, 8, q),
              s[11] || (s[11] = l(" Get these from ", -1)),
              s[12] || (s[12] = e("strong", null, "Google Cloud Console → APIs & Services → Credentials", -1)),
              s[13] || (s[13] = l(". Set redirect URI to: ", -1)),
              e("code", F, d(c(x)) + "/api/method/frappe.integrations.oauth2_logins.login_via_google", 1)
            ])
          ]),
          e("div", N, [
            i.enabled ? (f(), r("button", {
              key: 0,
              class: "sso-btn-ghost",
              onClick: s[2] || (s[2] = (t) => w("Google")),
              disabled: i.saving || !o.$canEdit("admin")
            }, "Disable", 8, P)) : k("", !0),
            e("button", {
              class: "sso-btn-primary",
              onClick: s[3] || (s[3] = (t) => S("Google")),
              disabled: i.saving || !i.client_id || !o.$canEdit("admin")
            }, d(i.saving ? "Saving…" : i.enabled ? "Update" : "Enable Google Sign-In"), 9, j)
          ])
        ], 2),
        e("div", {
          class: v(["sso-card", a.enabled ? "card-on" : ""])
        }, [
          e("div", R, [
            s[14] || (s[14] = y('<div class="sso-logo ms-logo" data-v-a153bf29><svg width="22" height="22" viewBox="0 0 21 21" data-v-a153bf29><rect x="1" y="1" width="9" height="9" fill="#f25022" data-v-a153bf29></rect><rect x="11" y="1" width="9" height="9" fill="#7fba00" data-v-a153bf29></rect><rect x="1" y="11" width="9" height="9" fill="#00a4ef" data-v-a153bf29></rect><rect x="11" y="11" width="9" height="9" fill="#ffb900" data-v-a153bf29></rect></svg></div><div class="sso-card-meta" data-v-a153bf29><div class="sso-card-name" data-v-a153bf29>Microsoft / Azure AD</div><div class="sso-card-desc" data-v-a153bf29>Let users log in with their Microsoft 365 or Azure AD account</div></div>', 2)),
            e("span", {
              class: v(["sso-pill", a.enabled ? "pill-on" : "pill-off"])
            }, d(a.enabled ? "Active" : "Inactive"), 3)
          ]),
          e("div", W, [
            e("div", J, [
              s[15] || (s[15] = e("label", { class: "sso-lbl" }, [
                l("Application (Client) ID "),
                e("span", { class: "req" }, "*")
              ], -1)),
              g(e("input", {
                "onUpdate:modelValue": s[4] || (s[4] = (t) => a.client_id = t),
                class: "sso-input",
                placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                autocomplete: "off"
              }, null, 512), [
                [p, a.client_id]
              ])
            ]),
            e("div", Y, [
              s[16] || (s[16] = e("label", { class: "sso-lbl" }, [
                l("Client Secret "),
                e("span", { class: "req" }, "*")
              ], -1)),
              g(e("input", {
                "onUpdate:modelValue": s[5] || (s[5] = (t) => a.client_secret = t),
                class: "sso-input",
                type: "password",
                placeholder: a.has_secret ? "••••••••••••• (saved)" : "Enter client secret",
                autocomplete: "off"
              }, null, 8, K), [
                [p, a.client_secret]
              ])
            ]),
            e("div", Q, [
              e("span", {
                innerHTML: c(m)("ext", 11)
              }, null, 8, X),
              s[17] || (s[17] = l(" Get these from ", -1)),
              s[18] || (s[18] = e("strong", null, "Azure Portal → App registrations", -1)),
              s[19] || (s[19] = l(". Set redirect URI to: ", -1)),
              e("code", Z, d(c(x)) + "/api/method/frappe.integrations.oauth2_logins.login_via_office365", 1)
            ])
          ]),
          e("div", ss, [
            a.enabled ? (f(), r("button", {
              key: 0,
              class: "sso-btn-ghost",
              onClick: s[6] || (s[6] = (t) => w("Office 365")),
              disabled: a.saving || !o.$canEdit("admin")
            }, "Disable", 8, es)) : k("", !0),
            e("button", {
              class: "sso-btn-primary",
              onClick: s[7] || (s[7] = (t) => S("Office 365")),
              disabled: a.saving || !a.client_id || !o.$canEdit("admin")
            }, d(a.saving ? "Saving…" : a.enabled ? "Update" : "Enable Microsoft Sign-In"), 9, ts)
          ])
        ], 2)
      ])),
      e("div", is, [
        e("div", as, [
          e("span", {
            innerHTML: c(m)("info", 14)
          }, null, 8, os),
          s[20] || (s[20] = l(" How SSO works with Books", -1))
        ]),
        s[21] || (s[21] = e("ol", { class: "sso-info-list" }, [
          e("li", null, "Configure credentials above and click Enable."),
          e("li", null, [
            l("Your team members visit the Books login page — a "),
            e("strong", null, '"Sign in with Google"'),
            l(" or "),
            e("strong", null, '"Sign in with Microsoft"'),
            l(" button appears automatically.")
          ]),
          e("li", null, "On first sign-in, Frappe checks if the email matches an existing user. If yes, they're logged in. If not, a new user is created (if sign-ups are enabled in System Settings)."),
          e("li", null, "After SSO login, the user lands on the Books dashboard as normal.")
        ], -1))
      ])
    ]));
  }
}, rs = /* @__PURE__ */ O(ls, [["__scopeId", "data-v-a153bf29"]]);
export {
  rs as default
};
