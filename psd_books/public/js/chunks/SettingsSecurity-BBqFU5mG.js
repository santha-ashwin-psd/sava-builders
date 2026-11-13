import { _ as x, x as F, o as N, c as i, a as s, u as d, i as r, d as l, n as f, t as a, b as T, F as E, r as P, l as b, h, g as L, j, k as n } from "./main-BAIA2aBR.js";
const B = { class: "s-page" }, D = { class: "s-head" }, O = ["innerHTML"], U = {
  key: 0,
  class: "s-loading"
}, V = {
  key: 1,
  class: "s-grid"
}, G = { class: "s-card" }, I = { class: "s-card-head" }, R = ["innerHTML"], z = { class: "s-card-body" }, Y = {
  key: 0,
  class: "s-line"
}, q = {
  key: 1,
  class: "s-line"
}, J = {
  key: 2,
  class: "s-note"
}, K = { class: "s-card" }, Q = { class: "s-card-head" }, W = { class: "s-card-ico" }, X = ["innerHTML"], Z = { class: "s-card-sub" }, $ = { class: "s-card-body" }, ss = { class: "s-rows" }, ts = { class: "s-row" }, es = { class: "s-row-val" }, os = { class: "s-row" }, is = { class: "s-row-val mono" }, as = { class: "s-row" }, ns = { class: "s-row-val mono" }, ls = { class: "s-row" }, ds = { class: "s-row-val" }, rs = ["innerHTML"], cs = { class: "s-card" }, us = { class: "s-card-head" }, vs = { class: "s-card-ico" }, _s = ["innerHTML"], hs = { class: "s-card-body" }, ps = ["innerHTML"], gs = { class: "s-card" }, ms = { class: "s-card-head" }, fs = { class: "s-card-ico" }, bs = ["innerHTML"], ys = { class: "s-card-sub" }, ws = { class: "s-card-body" }, Ts = {
  key: 0,
  class: "s-empty"
}, Ls = {
  key: 1,
  class: "s-rows"
}, ks = {
  class: "s-row-lbl",
  style: { display: "flex", "align-items": "center", gap: "8px" }
}, As = { class: "s-row-val mono" }, Ms = {
  key: 0,
  class: "s-row-more"
}, Hs = ["innerHTML"], Ss = {
  __name: "SettingsSecurity",
  setup(Cs) {
    const { toast: k } = F(), p = j(), g = h(!0), c = h({}), u = h([]), v = h(!1), A = L(() => u.value.filter((e) => e.enabled).length), M = L(() => u.value.filter((e) => !e.enabled).length);
    function m(e) {
      if (!e) return "";
      try {
        return new Date(e).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
      } catch {
        return e;
      }
    }
    async function H() {
      var e;
      g.value = !0;
      try {
        const [t, o, _] = await Promise.all([
          b("psd_books.api.admin.get_profile").catch(() => ({})),
          b("psd_books.api.admin.get_company_members").catch(() => []),
          b("frappe.client.get_value", { doctype: "System Settings", fieldname: "enable_two_factor_auth" }).catch(() => null)
        ]);
        c.value = (t == null ? void 0 : t.message) || t || {}, u.value = Array.isArray(o) ? o : (o == null ? void 0 : o.message) || [];
        const w = (_ == null ? void 0 : _.enable_two_factor_auth) ?? ((e = _ == null ? void 0 : _.message) == null ? void 0 : e.enable_two_factor_auth);
        v.value = !!(w && Number(w));
      } catch (t) {
        k.error(t.message || "Failed to load security overview");
      } finally {
        g.value = !1;
      }
    }
    function y() {
      p.push({ name: "settings-audit-log" });
    }
    function S() {
      p.push({ name: "settings-profile" });
    }
    function C() {
      p.push({ name: "settings-users" });
    }
    return N(H), (e, t) => (n(), i("div", B, [
      s("div", D, [
        t[1] || (t[1] = s("div", null, [
          s("div", { class: "s-title" }, "Security"),
          s("div", { class: "s-sub" }, "2FA status, your recent activity, and where to view the full audit trail.")
        ], -1)),
        s("button", {
          class: "s-cta",
          onClick: y
        }, [
          s("span", {
            innerHTML: d(r)("audit", 13)
          }, null, 8, O),
          t[0] || (t[0] = l(" Open Audit Log", -1))
        ])
      ]),
      g.value ? (n(), i("div", U, "Loading…")) : (n(), i("div", V, [
        s("div", G, [
          s("div", I, [
            s("div", {
              class: f(["s-card-ico", v.value ? "on" : ""])
            }, [
              s("span", {
                innerHTML: d(r)("shield", 18)
              }, null, 8, R)
            ], 2),
            t[2] || (t[2] = s("div", null, [
              s("div", { class: "s-card-title" }, "Two-Factor Authentication"),
              s("div", { class: "s-card-sub" }, "Authenticator-app (TOTP) code on every login")
            ], -1)),
            s("span", {
              class: f(["s-pill", v.value ? "on" : "off"])
            }, a(v.value ? "Enabled" : "Disabled"), 3)
          ]),
          s("div", z, [
            v.value ? (n(), i("p", Y, "2FA is active for this site. New logins must enter a one-time code from an authenticator app (Google Authenticator, Authy, 1Password).")) : (n(), i("p", q, [...t[3] || (t[3] = [
              l("2FA is off site-wide. To enable, set ", -1),
              s("span", { class: "s-mono" }, "enable_two_factor_auth: 1", -1),
              l(" in ", -1),
              s("span", { class: "s-mono" }, "site_config.json", -1),
              l(" and restart bench. Each user then configures their authenticator on next login.", -1)
            ])])),
            v.value ? T("", !0) : (n(), i("div", J, [...t[4] || (t[4] = [
              l("Note: this dev site has ", -1),
              s("span", { class: "s-mono" }, "ignore_csrf: 1", -1),
              l(" set for SPA reliability — recommended to flip both before production.", -1)
            ])]))
          ])
        ]),
        s("div", K, [
          s("div", Q, [
            s("div", W, [
              s("span", {
                innerHTML: d(r)("user", 18)
              }, null, 8, X)
            ]),
            s("div", null, [
              t[5] || (t[5] = s("div", { class: "s-card-title" }, "Your Activity", -1)),
              s("div", Z, "Signed in as " + a(c.value.full_name || c.value.email || "you"), 1)
            ])
          ]),
          s("div", $, [
            s("div", ss, [
              s("div", ts, [
                t[6] || (t[6] = s("div", { class: "s-row-lbl" }, "Email", -1)),
                s("div", es, a(c.value.email || "—"), 1)
              ]),
              s("div", os, [
                t[7] || (t[7] = s("div", { class: "s-row-lbl" }, "Last login", -1)),
                s("div", is, a(m(c.value.last_login)), 1)
              ]),
              s("div", as, [
                t[8] || (t[8] = s("div", { class: "s-row-lbl" }, "Last active", -1)),
                s("div", ns, a(m(c.value.last_active)), 1)
              ]),
              s("div", ls, [
                t[9] || (t[9] = s("div", { class: "s-row-lbl" }, "Roles", -1)),
                s("div", ds, a((c.value.roles || []).join(", ") || "—"), 1)
              ])
            ]),
            s("button", {
              class: "s-link-btn",
              onClick: S
            }, [
              s("span", {
                innerHTML: d(r)("edit", 13)
              }, null, 8, rs),
              t[10] || (t[10] = l(" Change password / profile", -1))
            ])
          ])
        ]),
        s("div", cs, [
          s("div", us, [
            s("div", vs, [
              s("span", {
                innerHTML: d(r)("audit", 18)
              }, null, 8, _s)
            ]),
            t[11] || (t[11] = s("div", null, [
              s("div", { class: "s-card-title" }, "Audit Log"),
              s("div", { class: "s-card-sub" }, "Every login, create, edit and submit is recorded")
            ], -1))
          ]),
          s("div", hs, [
            t[13] || (t[13] = s("p", { class: "s-line" }, "A full activity trail is available — use it to investigate who changed what and when. The list updates in real time.", -1)),
            s("button", {
              class: "s-link-btn",
              onClick: y
            }, [
              s("span", {
                innerHTML: d(r)("audit", 13)
              }, null, 8, ps),
              t[12] || (t[12] = l(" Open Audit Log", -1))
            ])
          ])
        ]),
        s("div", gs, [
          s("div", ms, [
            s("div", fs, [
              s("span", {
                innerHTML: d(r)("users", 18)
              }, null, 8, bs)
            ]),
            s("div", null, [
              t[14] || (t[14] = s("div", { class: "s-card-title" }, "Team Access", -1)),
              s("div", ys, a(A.value) + " active · " + a(M.value) + " disabled", 1)
            ])
          ]),
          s("div", ws, [
            u.value.length ? (n(), i("div", Ls, [
              (n(!0), i(E, null, P(u.value.slice(0, 5), (o) => (n(), i("div", {
                key: o.email,
                class: "s-row"
              }, [
                s("div", ks, [
                  s("span", {
                    class: f(["s-status-dot", o.enabled ? "on" : "off"])
                  }, null, 2),
                  s("span", null, a(o.full_name || o.email), 1)
                ]),
                s("div", As, a(m(o.last_login) || "—"), 1)
              ]))), 128)),
              u.value.length > 5 ? (n(), i("div", Ms, "+" + a(u.value.length - 5) + " more — open Users", 1)) : T("", !0)
            ])) : (n(), i("div", Ts, "No team members.")),
            s("button", {
              class: "s-link-btn",
              onClick: C
            }, [
              s("span", {
                innerHTML: d(r)("users", 13)
              }, null, 8, Hs),
              t[15] || (t[15] = l(" Manage Users", -1))
            ])
          ])
        ])
      ]))
    ]));
  }
}, Fs = /* @__PURE__ */ x(Ss, [["__scopeId", "data-v-30890685"]]);
export {
  Fs as default
};
