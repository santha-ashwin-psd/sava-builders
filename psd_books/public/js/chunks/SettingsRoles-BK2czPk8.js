import { _ as A, x as F, o as H, c as o, a as e, u as m, i as p, d as i, F as _, r as y, l as f, h as k, g as w, j as P, k as r, p as g, t as l, n as L, b as M } from "./main-UuZwJvYM.js";
const I = { class: "r-page" }, N = { class: "r-head" }, O = ["innerHTML"], V = {
  key: 0,
  class: "r-loading"
}, z = {
  key: 1,
  class: "r-grid"
}, D = { class: "r-card-head" }, j = { class: "r-card-head-left" }, G = { class: "r-card-desc" }, W = { class: "r-modules" }, q = ["innerHTML"], J = {
  key: 0,
  class: "r-users"
}, K = ["title"], Q = { class: "r-user-meta" }, X = {
  key: 0,
  class: "r-tag-admin"
}, Y = { class: "r-user-sub" }, Z = {
  key: 0,
  class: "r-tag-off"
}, $ = {
  key: 1,
  class: "r-empty"
}, ss = { class: "r-note" }, es = ["innerHTML"], ts = {
  __name: "SettingsRoles",
  setup(ns) {
    const { toast: T } = F(), x = P(), b = k([]), c = k(!0), B = ["Books Admin", "Accountant", "Books Manager", "Books Viewer"], v = k({}), S = [
      { key: "invoices", lbl: "Sales / Invoicing" },
      { key: "bills", lbl: "Purchases / Bills" },
      { key: "payments", lbl: "Payments" },
      { key: "banking", lbl: "Banking" },
      { key: "inventory", lbl: "Inventory" },
      { key: "accounts", lbl: "Accounting" },
      { key: "reports", lbl: "Reports" },
      { key: "customers", lbl: "Customers & Suppliers" },
      { key: "taxes", lbl: "Taxes" },
      { key: "admin", lbl: "Admin / Settings" }
    ], U = w(
      () => B.map((n) => {
        const s = v.value[n] || {};
        return {
          name: n,
          desc: s.desc || "",
          color: s.color || "#868E96",
          bg: s.bg || "#F1F3F5",
          perms: s.perms || {}
        };
      })
    );
    async function C() {
      c.value = !0;
      try {
        const [n, s] = await Promise.all([
          f("psd_books.api.admin.get_company_members"),
          f("psd_books.api.admin.get_role_matrix")
        ]);
        b.value = Array.isArray(n) ? n : (n == null ? void 0 : n.message) || [], v.value = (s == null ? void 0 : s.message) || s || {};
      } catch (n) {
        T.error(n.message || "Failed to load roles");
      } finally {
        c.value = !1;
      }
    }
    function d(n) {
      return b.value.filter((s) => (s.books_role || "") === n);
    }
    function u(n) {
      return d(n).length;
    }
    function E(n) {
      var a, t, h;
      const s = (n || "").trim().split(/\s+/);
      return ((((a = s[0]) == null ? void 0 : a[0]) || "") + (((t = s[1]) == null ? void 0 : t[0]) || "")).toUpperCase() || ((h = (n || "?")[0]) == null ? void 0 : h.toUpperCase());
    }
    function R() {
      x.push({ name: "settings-users" });
    }
    return H(C), (n, s) => (r(), o("div", I, [
      e("div", N, [
        s[1] || (s[1] = e("div", null, [
          e("div", { class: "r-title" }, "Roles & Permissions"),
          e("div", { class: "r-sub" }, "Built-in roles ship with the app. Per-user module access is editable from Users.")
        ], -1)),
        e("button", {
          class: "r-cta",
          onClick: R
        }, [
          e("span", {
            innerHTML: m(p)("users", 13)
          }, null, 8, O),
          s[0] || (s[0] = i(" Manage Users", -1))
        ])
      ]),
      c.value ? (r(), o("div", V, "Loading roles…")) : (r(), o("div", z, [
        (r(!0), o(_, null, y(U.value, (a) => (r(), o("div", {
          key: a.name,
          class: "r-card"
        }, [
          e("div", D, [
            e("div", j, [
              e("span", {
                class: "r-badge",
                style: g({ background: a.bg, color: a.color })
              }, l(a.name), 5),
              e("span", G, l(a.desc), 1)
            ]),
            e("span", {
              class: L(["r-count", u(a.name) === 0 ? "zero" : ""])
            }, l(u(a.name)) + " " + l(u(a.name) === 1 ? "user" : "users"), 3)
          ]),
          e("div", W, [
            (r(), o(_, null, y(S, (t) => e("div", {
              key: t.key,
              class: L(["r-mod", a.perms[t.key] ? "on" : ""])
            }, [
              e("span", {
                innerHTML: m(p)(a.perms[t.key] ? "check" : "lock", 11)
              }, null, 8, q),
              i(" " + l(t.lbl), 1)
            ], 2)), 64))
          ]),
          d(a.name).length ? (r(), o("div", J, [
            (r(!0), o(_, null, y(d(a.name), (t) => (r(), o("div", {
              key: t.email,
              class: "r-user",
              title: t.email + (t.enabled ? "" : " (disabled)")
            }, [
              e("span", {
                class: "r-avatar",
                style: g({ opacity: t.enabled ? 1 : 0.45 })
              }, l(E(t.full_name || t.email)), 5),
              e("div", Q, [
                e("div", {
                  class: "r-user-name",
                  style: g({ opacity: t.enabled ? 1 : 0.55 })
                }, [
                  i(l(t.full_name || t.email), 1),
                  t.is_company_admin ? (r(), o("span", X, "admin")) : M("", !0)
                ], 4),
                e("div", Y, [
                  i(l(t.email), 1),
                  t.enabled ? M("", !0) : (r(), o("span", Z, "disabled"))
                ])
              ])
            ], 8, K))), 128))
          ])) : (r(), o("div", $, "No users in this role."))
        ]))), 128))
      ])),
      e("div", ss, [
        e("span", {
          innerHTML: m(p)("info", 13)
        }, null, 8, es),
        s[2] || (s[2] = i(" Want a custom role with a different module mix? Use the Users page to set ", -1)),
        s[3] || (s[3] = e("strong", null, "per-user module access", -1)),
        s[4] || (s[4] = i(" on top of any built-in role — that covers most custom-role needs without needing a separate role definition. ", -1))
      ])
    ]));
  }
}, os = /* @__PURE__ */ A(ts, [["__scopeId", "data-v-c652fb27"]]);
export {
  os as default
};
