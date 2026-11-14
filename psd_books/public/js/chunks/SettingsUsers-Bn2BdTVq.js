import { _ as Pe, x as Ve, z as Q, o as Oe, c as l, a as s, t as i, d as f, b as c, F as C, r as E, W as ae, q as h, C as ze, u as I, p as O, w as R, A as z, H as Le, l as Ne, h as u, g as X, J as $, k as a, n as De, B as Ue } from "./main-DqjgZVjz.js";
import { b as re } from "./format-BcJZDVG4.js";
const de = ["Site Engineer", "Purchase Manager", "Admin", "Director"], Te = {
  "Site Engineer": "Raises material requests (MRN) only, approved by a Director",
  "Purchase Manager": "Full access; sends for approval, cannot approve",
  Admin: "Full access; sends for approval, cannot approve",
  Director: "Full access, and the only one who approves (LPO, comparison, MRN)"
}, ue = {
  "Site Engineer": { role: "Books Manager", modules: [] },
  // MRN only: the Material Requests screen comes from the server access rule, not a module
  "Purchase Manager": { role: "Books Manager", modules: ["*"] },
  Admin: { role: "Books Manager", modules: ["*"] },
  Director: { role: "Books Admin", modules: ["*"] }
  // Director: every module, plus approvals
}, ce = ["Books Viewer", "Accountant", "Books Manager", "Books Admin"];
function pe(H, p) {
  const d = (H || []).filter((b) => ue[b]);
  if (!d.length) return null;
  let A = "Books Viewer";
  const M = /* @__PURE__ */ new Set();
  for (const b of d) {
    const T = ue[b];
    ce.indexOf(T.role) > ce.indexOf(A) && (A = T.role), T.modules.forEach((q) => q === "*" ? p.forEach((Z) => M.add(Z)) : M.add(q));
  }
  return { role: A, modules: Object.fromEntries(p.map((b) => [b, M.has(b)])) };
}
function je(H, p) {
  const d = [...H || []].sort(), A = [...p || []].sort();
  return d.length === A.length && d.every((M, b) => M === A[b]);
}
const Ie = { class: "cust-toolbar" }, He = { style: { display: "flex", "align-items": "center", gap: "12px" } }, qe = { class: "su-count-badge" }, Ge = ["disabled", "title"], Je = {
  key: 0,
  class: "su-info-banner"
}, Ke = {
  key: 1,
  class: "su-denied"
}, We = {
  key: 2,
  class: "su-cards-section"
}, Ye = {
  key: 0,
  class: "su-loading"
}, Qe = {
  key: 1,
  class: "su-cards-grid"
}, Xe = { class: "su-card-header" }, Ze = {
  key: 0,
  class: "su-owner-tag"
}, es = {
  key: 1,
  style: { height: "22px" }
}, ss = ["onClick"], ts = ["disabled", "title", "onClick"], os = ["disabled", "title", "onClick"], as = ["disabled", "title", "onClick"], ls = ["disabled", "title", "onClick"], ns = { class: "su-card-avatar-wrap" }, is = {
  key: 0,
  class: "su-card-avatar su-card-avatar--img"
}, rs = ["src"], ds = {
  key: 1,
  class: "su-card-avatar"
}, us = { class: "su-card-name" }, cs = { class: "su-card-email" }, ps = { class: "su-card-meta-row" }, vs = {
  key: 0,
  class: "su-card-meta-row",
  style: { "flex-wrap": "wrap", gap: "4px" }
}, ms = { class: "su-card-meta-row" }, fs = { class: "su-card-meta-row" }, bs = { class: "su-card-meta-value" }, ys = { class: "su-card-joined" }, gs = ["disabled", "title"], ks = {
  class: "nim-dialog",
  style: { width: "560px" }
}, ws = { class: "nim-header" }, hs = { style: { "font-size": "11.5px", color: "#868e96", "margin-top": "2px" } }, xs = { style: { display: "flex", gap: "0", padding: "0 24px", "margin-bottom": "-1px" } }, _s = {
  key: 0,
  class: "nim-body",
  style: { display: "grid", gap: "12px" }
}, Cs = ["onClick"], Es = { style: { flex: "1" } }, As = { style: { "font-weight": "700", "font-size": "13px", color: "#1a1a2e" } }, Bs = { style: { "font-size": "12px", color: "#868e96", "margin-top": "2px" } }, Ss = {
  key: 0,
  style: { color: "#2563eb", "font-size": "16px" }
}, Rs = ["onClick"], $s = { style: { flex: "1" } }, Ms = { style: { "font-weight": "700", "font-size": "13px", color: "#1a1a2e" } }, Fs = { style: { "font-size": "12px", color: "#868e96", "margin-top": "2px" } }, Ps = {
  key: 0,
  style: { color: "#2563eb", "font-size": "16px" }
}, Vs = {
  key: 0,
  style: { background: "#fff5f5", border: "1px solid #ffd0d0", "border-radius": "8px", padding: "10px 14px", color: "#C92A2A", "font-size": "12.5px" }
}, Os = {
  key: 1,
  class: "nim-body",
  style: { display: "grid", gap: "14px" }
}, zs = { style: { background: "#f5f0ff", "border-radius": "8px", padding: "10px 14px", display: "flex", "align-items": "center", gap: "10px" } }, Ls = { style: { "font-size": "12.5px", color: "#3b4a7a" } }, Ns = { class: "nim-field" }, Ds = { style: { display: "grid", "grid-template-columns": "1fr 1fr", gap: "12px" } }, Us = { class: "nim-field" }, Ts = { class: "nim-field" }, js = { style: { display: "grid", "grid-template-columns": "1fr 1fr", gap: "12px" } }, Is = { class: "nim-field" }, Hs = { class: "nim-field" }, qs = { style: { background: "#f0f9ff", border: "1px solid #c5d9fa", "border-radius": "8px", padding: "12px 14px", "font-size": "12.5px", color: "#1971C2", "line-height": "1.5" } }, Gs = {
  key: 0,
  style: { background: "#fff5f5", border: "1px solid #ffd0d0", "border-radius": "8px", padding: "10px 14px", color: "#C92A2A", "font-size": "12.5px" }
}, Js = { class: "nim-footer" }, Ks = ["disabled", "title"], Ws = {
  class: "nim-dialog",
  style: { width: "640px" }
}, Ys = { class: "nim-header" }, Qs = { style: { "font-weight": "700", color: "#fff" } }, Xs = {
  class: "nim-body",
  style: { display: "grid", gap: "20px" }
}, Zs = { style: { display: "grid", "grid-template-columns": "1fr 1fr", gap: "8px", background: "#f8f9fc", "border-radius": "8px", padding: "14px" } }, et = ["checked", "onChange"], st = {
  key: 0,
  style: { display: "grid", "grid-template-columns": "1fr 1fr", gap: "12px 16px" }
}, tt = { style: { display: "block", "font-size": "12.5px", color: "#4a5568", "margin-bottom": "4px" } }, ot = ["value", "onChange"], at = ["value"], lt = {
  key: 1,
  style: { "font-size": "12.5px", color: "#9ca3af", padding: "10px 0" }
}, nt = { class: "nim-footer" }, it = ["disabled", "title"], rt = {
  class: "nim-dialog",
  style: { width: "420px" }
}, dt = { class: "nim-header" }, ut = { style: { "font-weight": "700", color: "#fff" } }, ct = {
  class: "nim-body",
  style: { display: "grid", gap: "10px" }
}, pt = ["checked", "onChange"], vt = { style: { "font-weight": "600", "font-size": "13px" } }, mt = { class: "nim-footer" }, ft = ["disabled", "title"], bt = {
  class: "nim-dialog",
  style: { width: "420px" }
}, yt = { class: "nim-header" }, gt = { style: { "font-weight": "700", color: "#fff" } }, kt = {
  class: "nim-body",
  style: { display: "grid", gap: "12px" }
}, wt = { class: "nim-field" }, ht = { class: "nim-field" }, xt = {
  key: 0,
  style: { background: "#fff5f5", border: "1px solid #ffd0d0", "border-radius": "8px", padding: "10px 14px", color: "#C92A2A", "font-size": "12.5px" }
}, _t = { class: "nim-footer" }, Ct = ["disabled", "title"], Et = {
  class: "nim-dialog",
  style: { width: "400px" }
}, At = { class: "nim-header" }, Bt = { class: "nim-body" }, St = { style: { color: "#4a5568", "font-size": "13.5px", "line-height": "1.6" } }, Rt = { class: "nim-footer" }, $t = ["disabled", "title"], Mt = {
  __name: "SettingsUsers",
  setup(H) {
    const { toast: p } = Ve(), d = [
      { key: "invoices", label: "Sales Invoices" },
      { key: "bills", label: "Bills & Purchases" },
      { key: "payments", label: "Payments" },
      { key: "banking", label: "Banking" },
      { key: "inventory", label: "Inventory" },
      { key: "accounts", label: "Chart of Accounts" },
      { key: "reports", label: "Reports" },
      { key: "customers", label: "Customers & Suppliers" },
      { key: "taxes", label: "Taxes" },
      { key: "admin", label: "Admin / Settings" }
    ], A = ["None", "View", "Create", "Edit", "Delete"], M = [], b = {
      "Books Admin": "#2563eb",
      Accountant: "#1971C2",
      "Books Manager": "#2F9E44",
      "Books Viewer": "#868E96",
      Custom: "#E67700"
    }, T = {
      "Site Engineer": "#2F9E44",
      "Purchase Manager": "#E67700",
      Admin: "#2563eb",
      Director: "#E67700"
    }, q = {
      "Books Admin": "#F3F0FF",
      Accountant: "#E7F5FF",
      "Books Manager": "#EBFBEE",
      "Books Viewer": "#F8F9FA",
      Custom: "#FFF3BF"
    }, Z = {
      "Books Admin": "Full access — manage users, settings, all data",
      Accountant: "Create & edit invoices, bills, payments, reports",
      "Books Manager": "Create & edit transactions; no admin functions",
      "Books Viewer": "Read-only access to all records",
      Custom: "Pick exact module access — nothing granted by default"
    }, le = {
      "Books Admin": Object.fromEntries(d.map((o) => [o.key, !0])),
      "Books Manager": { invoices: !0, bills: !0, payments: !0, banking: !0, inventory: !0, accounts: !0, reports: !0, customers: !0, taxes: !1, admin: !1 },
      Accountant: { invoices: !0, bills: !0, payments: !0, banking: !0, inventory: !1, accounts: !0, reports: !0, customers: !0, taxes: !0, admin: !1 },
      "Books Viewer": { invoices: !0, bills: !0, payments: !0, banking: !1, inventory: !1, accounts: !1, reports: !0, customers: !0, taxes: !1, admin: !1 },
      Custom: Object.fromEntries(d.map((o) => [o.key, !1]))
    };
    function L(o) {
      return { ...le[o] || {} };
    }
    const G = u([]), ee = u(!1), J = u(!1), j = u(!1), N = u(!1), v = u(1), y = u(null), K = u(""), B = u([]), x = u(null), g = u(null), k = Q({ password: "", confirm_password: "" }), F = u(""), W = u(!1), n = Q({
      email: "",
      first_name: "",
      last_name: "",
      role: "Books Viewer",
      password: "",
      confirm_password: "",
      modules: L("Books Viewer"),
      sava_roles: []
    }), m = u(""), w = u(null), P = Q(L("Books Viewer")), V = Q(Object.fromEntries(d.map((o) => [o.key, "None"]))), Y = u(!1), ne = u(0), S = u(null);
    function ve(o) {
      S.value = S.value === o ? null : o;
    }
    function ie() {
      S.value = null;
    }
    const se = X(() => [1, 3]), me = X(() => se.value.length), fe = X(() => se.value.indexOf(v.value) + 1), be = X(() => "Next: Set Credentials →");
    function te(o) {
      if (o.books_role !== "Books Viewer" || !o.modules) return o.books_role;
      const e = le["Books Viewer"];
      for (const t of d) if (!!o.modules[t.key] != !!e[t.key]) return "Custom";
      return o.books_role;
    }
    async function D() {
      ee.value = !0, j.value = !1;
      try {
        G.value = await Ne("psd_books.api.admin.get_company_members") || [];
      } catch (o) {
        const e = o.message || String(o);
        e.includes("permission") || e.includes("admin") || e.includes("linked") ? j.value = !0 : p("Could not load members: " + e, "error");
      }
      ee.value = !1;
    }
    function oe() {
      Object.assign(n, {
        email: "",
        first_name: "",
        last_name: "",
        role: "Books Viewer",
        password: "",
        confirm_password: "",
        modules: L("Books Viewer"),
        sava_roles: []
      }), m.value = "", v.value = 1, N.value = !0;
    }
    function ye(o) {
      n.role = o, n.modules = L(o), o === "Books Admin" && (n.sava_roles = []);
    }
    function ge(o) {
      const e = n.sava_roles, t = e.indexOf(o);
      t >= 0 ? e.splice(t, 1) : e.push(o);
      const r = pe(e, d.map((_) => _.key));
      r ? (n.role = r.role, n.modules = r.modules) : n.modules = L(n.role);
    }
    const U = u(null);
    function ke(o) {
      const e = B.value.indexOf(o);
      e >= 0 ? B.value.splice(e, 1) : B.value.push(o);
      const t = pe(B.value, d.map((r) => r.key));
      t ? (K.value = t.role, U.value = t.modules) : U.value = null;
    }
    function we() {
      if (m.value = "", v.value === 1) {
        if (!n.sava_roles.length) {
          m.value = "Select a role.";
          return;
        }
        v.value = 3;
      }
    }
    function he() {
      if (v.value === 3) {
        v.value = 1;
        return;
      }
    }
    async function xe() {
      if (m.value = "", !n.email || !n.first_name) {
        m.value = "Email and first name are required.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n.email)) {
        m.value = "Please enter a valid email address.";
        return;
      }
      if (!n.password || n.password.length < 8) {
        m.value = "Password must be at least 8 characters.";
        return;
      }
      if (n.password !== n.confirm_password) {
        m.value = "Passwords do not match.";
        return;
      }
      J.value = !0;
      try {
        const o = Object.fromEntries(d.map((t) => [t.key, n.modules[t.key] ? 1 : 0])), e = n.role === "Custom" ? "Books Viewer" : n.role;
        await $("psd_books.api.admin.invite_member", {
          email: n.email,
          first_name: n.first_name,
          last_name: n.last_name,
          role: e,
          password: n.password,
          modules: o,
          sava_roles: n.sava_roles
        }), p("Member added — share the password you set with " + n.email + "."), N.value = !1, D();
      } catch (o) {
        m.value = o.message || "Failed to add member.";
      }
      J.value = !1;
    }
    function _e(o, e) {
      P[o] = e, e ? V[o] === "None" && (V[o] = "View") : V[o] = "None";
    }
    function Ce(o, e) {
      V[o] = e, P[o] = e !== "None";
    }
    function Ee(o) {
      if (o.is_company_admin) {
        p("Admins always have full module access.", "info");
        return;
      }
      w.value = o;
      const e = o.modules || L(o.books_role);
      for (const r of d) P[r.key] = !!e[r.key];
      const t = o.levels || {};
      for (const r of d) V[r.key] = t[r.key] || "None";
    }
    async function Ae() {
      if (w.value) {
        Y.value = !0;
        try {
          const o = Object.fromEntries(d.map((_) => [_.key, P[_.key] ? 1 : 0])), e = Object.fromEntries(d.map((_) => [_.key, V[_.key]])), t = w.value.email || w.value.name;
          await $("psd_books.api.admin.set_user_permissions", {
            user: t,
            modules: o,
            levels: e
          }), p("Module access updated"), await D();
          const r = G.value.find((_) => _.name === t);
          r && (Ee(r), ne.value++);
        } catch (o) {
          p(o.message || "Failed to update access", "error");
        }
        Y.value = !1;
      }
    }
    async function Be() {
      try {
        if (await $("psd_books.api.admin.update_user_role", { user: y.value.name, role: K.value }), je(B.value, y.value.sava_roles) || await $("psd_books.api.admin.set_user_sava_roles", { user: y.value.name, roles: B.value }), U.value && K.value !== "Books Admin") {
          const o = Object.fromEntries(Object.entries(U.value).map(([e, t]) => [e, t ? "Edit" : "None"]));
          await $("psd_books.api.admin.set_user_permissions", { user: y.value.name, modules: U.value, levels: o });
        }
        p("Role updated"), y.value = null, D();
      } catch (o) {
        p(o.message, "error");
      }
    }
    function Se(o) {
      g.value = o, k.password = "", k.confirm_password = "", F.value = "";
    }
    async function Re() {
      if (g.value) {
        if (F.value = "", !k.password || k.password.length < 8) {
          F.value = "Password must be at least 8 characters.";
          return;
        }
        if (k.password !== k.confirm_password) {
          F.value = "Passwords do not match.";
          return;
        }
        W.value = !0;
        try {
          await $("psd_books.api.admin.admin_reset_user_password", {
            user: g.value.name,
            new_password: k.password
          }), p("Password updated for " + (g.value.full_name || g.value.name)), g.value = null;
        } catch (o) {
          F.value = o.message || "Failed to reset password.";
        }
        W.value = !1;
      }
    }
    async function $e(o) {
      try {
        await $("psd_books.api.admin.toggle_user_active", { user: o.name, enabled: o.enabled ? 0 : 1 }), p(o.enabled ? "Member deactivated" : "Member activated"), D();
      } catch (e) {
        p(e.message, "error");
      }
    }
    async function Me(o) {
      try {
        await $("psd_books.api.admin.remove_member", { user_email: o.name }), p("Member removed"), x.value = null, D();
      } catch (e) {
        p(e.message, "error");
      }
    }
    function Fe(o) {
      return (o || "?").split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2);
    }
    return Oe(D), (o, e) => (a(), l("div", {
      class: "cust-page",
      onClick: ie
    }, [
      s("div", Ie, [
        s("div", He, [
          e[26] || (e[26] = s("span", { class: "su-title" }, "Team Members", -1)),
          s("span", qe, i(G.value.length) + " members", 1)
        ]),
        j.value ? c("", !0) : (a(), l("button", {
          key: 0,
          class: "nim-btn nim-btn-primary su-add-btn",
          disabled: !o.$canCreate("admin"),
          title: o.$canCreate("admin") ? "" : "Read-only access",
          onClick: oe
        }, [...e[27] || (e[27] = [
          s("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.5"
          }, [
            s("line", {
              x1: "12",
              y1: "5",
              x2: "12",
              y2: "19"
            }),
            s("line", {
              x1: "5",
              y1: "12",
              x2: "19",
              y2: "12"
            })
          ], -1),
          f(" Add Member ", -1)
        ])], 8, Ge))
      ]),
      j.value ? c("", !0) : (a(), l("div", Je, [...e[28] || (e[28] = [
        s("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "#2563eb",
          "stroke-width": "2"
        }, [
          s("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
          s("polyline", { points: "9 22 9 12 15 12 15 22" })
        ], -1),
        s("div", null, [
          s("strong", null, "Company-scoped access:"),
          f(" Members you add here will only see data belonging to your company. Each member gets their own email & password, which you set directly when adding them. New user sign-ups always create a separate, isolated company.")
        ], -1)
      ])])),
      j.value ? (a(), l("div", Ke, [...e[29] || (e[29] = [
        s("div", { style: { "font-size": "22px", "margin-bottom": "8px" } }, "🔒", -1),
        s("strong", null, "Access Denied", -1),
        s("br", null, null, -1),
        s("span", { style: { color: "#4a5568", "font-size": "13px" } }, "Only company admins can manage team members.", -1)
      ])])) : (a(), l("div", We, [
        ee.value ? (a(), l("div", Ye, "Loading members…")) : (a(), l("div", Qe, [
          (a(!0), l(C, null, E(G.value, (t) => (a(), l("div", {
            key: t.name,
            class: "su-member-card",
            onClick: h(ie, ["self"])
          }, [
            s("div", Xe, [
              t.is_owner ? (a(), l("div", Ze, "OWNER 👑")) : (a(), l("div", es)),
              t.is_owner ? c("", !0) : (a(), l("button", {
                key: 2,
                class: "su-menu-btn",
                onClick: h((r) => ve(t.name), ["stop"])
              }, [...e[30] || (e[30] = [
                s("svg", {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "currentColor"
                }, [
                  s("circle", {
                    cx: "12",
                    cy: "5",
                    r: "1.5"
                  }),
                  s("circle", {
                    cx: "12",
                    cy: "12",
                    r: "1.5"
                  }),
                  s("circle", {
                    cx: "12",
                    cy: "19",
                    r: "1.5"
                  })
                ], -1)
              ])], 8, ss)),
              S.value === t.name ? (a(), l("div", {
                key: 3,
                class: "su-dropdown",
                onClick: e[0] || (e[0] = h(() => {
                }, ["stop"]))
              }, [
                s("button", {
                  class: "su-dd-item",
                  disabled: !o.$canEdit("admin"),
                  title: o.$canEdit("admin") ? "" : "Read-only access",
                  onClick: (r) => {
                    y.value = t, K.value = t.books_role, B.value = [...t.sava_roles || []], U.value = null, S.value = null;
                  }
                }, [...e[31] || (e[31] = [
                  s("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    s("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                    s("circle", {
                      cx: "12",
                      cy: "7",
                      r: "4"
                    })
                  ], -1),
                  f(" Change Role ", -1)
                ])], 8, ts),
                c("", !0),
                s("button", {
                  class: "su-dd-item",
                  disabled: !o.$canEdit("admin"),
                  title: o.$canEdit("admin") ? "" : "Read-only access",
                  onClick: (r) => {
                    Se(t), S.value = null;
                  }
                }, [...e[33] || (e[33] = [
                  s("svg", {
                    width: "14",
                    height: "14",
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
                      rx: "2"
                    }),
                    s("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
                  ], -1),
                  f(" Reset Password ", -1)
                ])], 8, os),
                s("button", {
                  class: "su-dd-item su-dd-item--warn",
                  disabled: !o.$canEdit("admin"),
                  title: o.$canEdit("admin") ? "" : "Read-only access",
                  onClick: (r) => {
                    $e(t), S.value = null;
                  }
                }, [
                  e[34] || (e[34] = s("svg", {
                    width: "14",
                    height: "14",
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
                      x1: "4.93",
                      y1: "4.93",
                      x2: "19.07",
                      y2: "19.07"
                    })
                  ], -1)),
                  f(" " + i(t.enabled ? "Deactivate" : "Activate"), 1)
                ], 8, as),
                e[36] || (e[36] = s("div", { class: "su-dd-divider" }, null, -1)),
                s("button", {
                  class: "su-dd-item su-dd-item--danger",
                  disabled: !o.$canDelete("admin"),
                  title: o.$canDelete("admin") ? "" : "Not permitted",
                  onClick: (r) => {
                    x.value = t, S.value = null;
                  }
                }, [...e[35] || (e[35] = [
                  ae('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-ea9b12a2><polyline points="3 6 5 6 21 6" data-v-ea9b12a2></polyline><path d="M19 6l-1 14H6L5 6" data-v-ea9b12a2></path><path d="M10 11v6" data-v-ea9b12a2></path><path d="M14 11v6" data-v-ea9b12a2></path><path d="M9 6V4h6v2" data-v-ea9b12a2></path></svg> Remove ', 2)
                ])], 8, ls)
              ])) : c("", !0)
            ]),
            s("div", ns, [
              t.user_image ? (a(), l("div", is, [
                s("img", {
                  src: t.user_image,
                  style: { width: "100%", height: "100%", "object-fit": "cover", "border-radius": "50%" }
                }, null, 8, rs)
              ])) : (a(), l("div", ds, i(Fe(t.full_name || t.name)), 1))
            ]),
            s("div", us, i(t.full_name || t.name), 1),
            s("div", cs, i(t.name), 1),
            e[40] || (e[40] = s("div", { class: "su-card-divider" }, null, -1)),
            s("div", ps, [
              e[37] || (e[37] = s("span", { class: "su-card-meta-label" }, [
                s("svg", {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  s("rect", {
                    x: "2",
                    y: "7",
                    width: "20",
                    height: "14",
                    rx: "2"
                  }),
                  s("path", { d: "M16 3H8L2 7h20l-6-4z" })
                ]),
                f(" Role ")
              ], -1)),
              s("span", {
                class: "su-role-pill",
                style: O({ background: q[te(t)] || "#F8F9FA", color: b[te(t)] || "#868E96" })
              }, i(te(t) || "—"), 5)
            ]),
            (t.sava_roles || []).length ? (a(), l("div", vs, [
              (a(!0), l(C, null, E(t.sava_roles, (r) => (a(), l("span", {
                key: r,
                class: "su-role-pill",
                style: { background: "#FFF4E6", color: "#D9480F" }
              }, i(r), 1))), 128))
            ])) : c("", !0),
            s("div", ms, [
              e[38] || (e[38] = s("span", { class: "su-card-meta-label" }, [
                s("svg", {
                  width: "13",
                  height: "13",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  s("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
                ]),
                f(" Status ")
              ], -1)),
              s("span", {
                class: De(["su-status-pill", t.enabled ? "su-status--active" : "su-status--inactive"])
              }, " ● " + i(t.enabled ? "Active" : "Inactive"), 3)
            ]),
            s("div", fs, [
              e[39] || (e[39] = ae('<span class="su-card-meta-label" data-v-ea9b12a2><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-ea9b12a2><rect x="3" y="4" width="18" height="18" rx="2" data-v-ea9b12a2></rect><line x1="16" y1="2" x2="16" y2="6" data-v-ea9b12a2></line><line x1="8" y1="2" x2="8" y2="6" data-v-ea9b12a2></line><line x1="3" y1="10" x2="21" y2="10" data-v-ea9b12a2></line></svg> Last Login </span>', 1)),
              s("span", bs, i(t.last_login ? I(re)(t.last_login) : "Never"), 1)
            ]),
            s("div", ys, "Joined on " + i(t.creation ? I(re)(t.creation) : "—"), 1)
          ]))), 128)),
          s("div", {
            class: "su-add-card",
            onClick: e[1] || (e[1] = (t) => o.$canCreate("admin") && oe())
          }, [
            e[42] || (e[42] = ae('<div class="su-add-card-icon" data-v-ea9b12a2><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.8" data-v-ea9b12a2><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" data-v-ea9b12a2></path><circle cx="9" cy="7" r="4" data-v-ea9b12a2></circle><line x1="19" y1="8" x2="19" y2="14" data-v-ea9b12a2></line><line x1="16" y1="11" x2="22" y2="11" data-v-ea9b12a2></line></svg></div><div class="su-add-card-title" data-v-ea9b12a2>Add New Member</div><div class="su-add-card-sub" data-v-ea9b12a2>Invite a new team member to your company</div>', 3)),
            s("button", {
              class: "su-add-card-btn",
              disabled: !o.$canCreate("admin"),
              title: o.$canCreate("admin") ? "" : "Read-only access",
              onClick: h(oe, ["stop"])
            }, [...e[41] || (e[41] = [
              s("svg", {
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5"
              }, [
                s("line", {
                  x1: "12",
                  y1: "5",
                  x2: "12",
                  y2: "19"
                }),
                s("line", {
                  x1: "5",
                  y1: "12",
                  x2: "19",
                  y2: "12"
                })
              ], -1),
              f(" Add Member ", -1)
            ])], 8, gs)
          ])
        ]))
      ])),
      (a(), ze(Le, { to: "body" }, [
        N.value ? (a(), l("div", {
          key: 0,
          class: "nim-overlay",
          onClick: e[10] || (e[10] = h((t) => N.value = !1, ["self"]))
        }, [
          s("div", ks, [
            s("div", ws, [
              s("div", null, [
                e[43] || (e[43] = s("span", { style: { "font-weight": "700", color: "#fff", "font-size": "15px" } }, "Add Team Member", -1)),
                s("div", hs, "Step " + i(fe.value) + " of " + i(me.value) + " — " + i(v.value === 1 ? "Assign a Role" : "Set Credentials"), 1)
              ]),
              s("button", {
                class: "nim-close",
                onClick: e[2] || (e[2] = (t) => N.value = !1)
              }, "✕")
            ]),
            s("div", xs, [
              (a(!0), l(C, null, E(se.value, (t) => (a(), l("div", {
                key: t,
                style: O("flex:1;height:3px;border-radius:2px;margin:0 2px;background:" + (v.value >= t ? "#2563eb" : "#e4e8f0"))
              }, null, 4))), 128))
            ]),
            v.value === 1 ? (a(), l("div", _s, [
              e[44] || (e[44] = s("div", { style: { "font-size": "13px", color: "#4a5568" } }, "Pick a role for this member:", -1)),
              (a(), l(C, null, E(M, (t) => s("div", {
                key: t,
                onClick: (r) => ye(t),
                style: O("padding:14px 16px;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:14px;transition:all .15s;" + (n.role === t ? "border:2px solid #2563eb;background:#f5f0ff" : "border:2px solid #e4e8f0;background:#fff"))
              }, [
                s("div", {
                  style: O("width:10px;height:10px;border-radius:50%;flex-shrink:0;background:" + b[t])
                }, null, 4),
                s("div", Es, [
                  s("div", As, i(t), 1),
                  s("div", Bs, i(Z[t]), 1)
                ]),
                n.role === t ? (a(), l("div", Ss, "✓")) : c("", !0)
              ], 12, Cs)), 64)),
              (a(!0), l(C, null, E(I(de), (t) => (a(), l("div", {
                key: t,
                onClick: (r) => ge(t),
                style: O("padding:14px 16px;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:14px;transition:all .15s;" + (n.sava_roles.includes(t) ? "border:2px solid #2563eb;background:#f5f0ff" : "border:2px solid #e4e8f0;background:#fff"))
              }, [
                s("div", {
                  style: O("width:10px;height:10px;border-radius:50%;flex-shrink:0;background:" + T[t])
                }, null, 4),
                s("div", $s, [
                  s("div", Ms, i(t), 1),
                  s("div", Fs, i(I(Te)[t]), 1)
                ]),
                n.sava_roles.includes(t) ? (a(), l("div", Ps, "✓")) : c("", !0)
              ], 12, Rs))), 128)),
              m.value ? (a(), l("div", Vs, i(m.value), 1)) : c("", !0)
            ])) : c("", !0),
            v.value === 3 ? (a(), l("div", Os, [
              s("div", zs, [
                s("span", {
                  style: O("background:" + b[n.role] + ";color:#fff;padding:2px 10px;border-radius:20px;font-size:12px;font-weight:700")
                }, i(n.role), 5),
                s("span", Ls, [
                  e[45] || (e[45] = f("Selected — ", -1)),
                  s("a", {
                    href: "#",
                    onClick: e[3] || (e[3] = h((t) => v.value = 1, ["prevent"])),
                    style: { color: "#2563eb", "text-decoration": "none" }
                  }, "Change")
                ])
              ]),
              s("div", Ns, [
                e[46] || (e[46] = s("label", { class: "nim-label" }, "Email Address *", -1)),
                R(s("input", {
                  class: "nim-input",
                  "onUpdate:modelValue": e[4] || (e[4] = (t) => n.email = t),
                  type: "email",
                  placeholder: "member@company.com"
                }, null, 512), [
                  [z, n.email]
                ])
              ]),
              s("div", Ds, [
                s("div", Us, [
                  e[47] || (e[47] = s("label", { class: "nim-label" }, "First Name *", -1)),
                  R(s("input", {
                    class: "nim-input",
                    "onUpdate:modelValue": e[5] || (e[5] = (t) => n.first_name = t),
                    placeholder: "First"
                  }, null, 512), [
                    [z, n.first_name]
                  ])
                ]),
                s("div", Ts, [
                  e[48] || (e[48] = s("label", { class: "nim-label" }, "Last Name", -1)),
                  R(s("input", {
                    class: "nim-input",
                    "onUpdate:modelValue": e[6] || (e[6] = (t) => n.last_name = t),
                    placeholder: "Last"
                  }, null, 512), [
                    [z, n.last_name]
                  ])
                ])
              ]),
              s("div", js, [
                s("div", Is, [
                  e[49] || (e[49] = s("label", { class: "nim-label" }, "Password *", -1)),
                  R(s("input", {
                    class: "nim-input",
                    "onUpdate:modelValue": e[7] || (e[7] = (t) => n.password = t),
                    type: "password",
                    placeholder: "At least 8 characters",
                    autocomplete: "new-password"
                  }, null, 512), [
                    [z, n.password]
                  ])
                ]),
                s("div", Hs, [
                  e[50] || (e[50] = s("label", { class: "nim-label" }, "Confirm Password *", -1)),
                  R(s("input", {
                    class: "nim-input",
                    "onUpdate:modelValue": e[8] || (e[8] = (t) => n.confirm_password = t),
                    type: "password",
                    placeholder: "Re-enter password",
                    autocomplete: "new-password"
                  }, null, 512), [
                    [z, n.confirm_password]
                  ])
                ])
              ]),
              s("div", qs, [
                e[51] || (e[51] = s("strong", null, "🔑 Set the password directly", -1)),
                e[52] || (e[52] = f(" — ", -1)),
                s("em", null, i(n.email || "This user"), 1),
                e[53] || (e[53] = f(" will sign in with the password you set here. No email will be sent. ", -1))
              ]),
              m.value ? (a(), l("div", Gs, i(m.value), 1)) : c("", !0)
            ])) : c("", !0),
            s("div", Js, [
              s("button", {
                class: "nim-btn",
                onClick: e[9] || (e[9] = (t) => v.value === 1 ? N.value = !1 : he())
              }, i(v.value === 1 ? "Cancel" : "Back"), 1),
              v.value !== 3 ? (a(), l("button", {
                key: 0,
                class: "nim-btn nim-btn-primary",
                onClick: we
              }, i(be.value), 1)) : (a(), l("button", {
                key: 1,
                class: "nim-btn nim-btn-primary",
                onClick: xe,
                disabled: J.value || !o.$canCreate("admin"),
                title: o.$canCreate("admin") ? "" : "Read-only access"
              }, i(J.value ? "Sending…" : "Send Invite"), 9, Ks))
            ])
          ])
        ])) : c("", !0),
        w.value ? (a(), l("div", {
          class: "nim-overlay",
          key: w.value.name + "-" + ne.value,
          onClick: e[13] || (e[13] = h((t) => w.value = null, ["self"]))
        }, [
          s("div", Ws, [
            s("div", Ys, [
              s("span", Qs, "Module Access — " + i(w.value.full_name || w.value.name), 1),
              s("button", {
                class: "nim-close",
                onClick: e[11] || (e[11] = (t) => w.value = null)
              }, "✕")
            ]),
            s("div", Xs, [
              s("div", null, [
                e[54] || (e[54] = s("div", { style: { "font-size": "13px", color: "#4a5568", "margin-bottom": "10px" } }, "Toggle which modules this member can access. Unchecking sets the level below to None; checking defaults it to View.", -1)),
                s("div", Zs, [
                  (a(), l(C, null, E(d, (t) => s("label", {
                    key: t.key,
                    style: { display: "flex", "align-items": "center", gap: "8px", padding: "6px 8px", "border-radius": "6px", cursor: "pointer", "font-size": "13px", color: "#3b4a7a" }
                  }, [
                    s("input", {
                      type: "checkbox",
                      checked: P[t.key],
                      onChange: (r) => _e(t.key, r.target.checked),
                      style: { width: "14px", height: "14px", cursor: "pointer" }
                    }, null, 40, et),
                    s("span", null, i(t.label), 1)
                  ])), 64))
                ])
              ]),
              s("div", null, [
                e[55] || (e[55] = s("div", { style: { "font-weight": "700", "font-size": "13.5px", color: "#1a1a2e", "margin-bottom": "2px" } }, "Permission Levels", -1)),
                e[56] || (e[56] = s("div", { style: { "font-size": "12.5px", color: "#868e96", "margin-bottom": "10px" } }, "Granular per-module access (None / View / Create / Edit / Delete). Stays in sync with the checkboxes above — the two never disagree.", -1)),
                d.some((t) => P[t.key]) ? (a(), l("div", st, [
                  (a(), l(C, null, E(d, (t) => R(s("div", {
                    key: t.key
                  }, [
                    s("label", tt, i(t.label), 1),
                    s("select", {
                      value: V[t.key],
                      onChange: (r) => Ce(t.key, r.target.value),
                      style: { width: "100%", padding: "7px 10px", "border-radius": "6px", border: "1px solid #e4e8f0", background: "#f8f9fc", "font-size": "13px", color: "#1a1a2e", cursor: "pointer" }
                    }, [
                      (a(), l(C, null, E(A, (r) => s("option", {
                        key: r,
                        value: r
                      }, i(r), 9, at)), 64))
                    ], 40, ot)
                  ]), [
                    [Ue, P[t.key]]
                  ])), 64))
                ])) : (a(), l("div", lt, "No modules checked yet — check a module above to set its access level."))
              ])
            ]),
            s("div", nt, [
              s("button", {
                class: "nim-btn",
                onClick: e[12] || (e[12] = (t) => w.value = null)
              }, "Cancel"),
              s("button", {
                class: "nim-btn nim-btn-primary",
                onClick: Ae,
                disabled: Y.value || !o.$canEdit("admin"),
                title: o.$canEdit("admin") ? "" : "Read-only access"
              }, i(Y.value ? "Saving…" : "Save Access"), 9, it)
            ])
          ])
        ])) : c("", !0),
        y.value ? (a(), l("div", {
          key: 2,
          class: "nim-overlay",
          onClick: e[16] || (e[16] = h((t) => y.value = null, ["self"]))
        }, [
          s("div", rt, [
            s("div", dt, [
              s("span", ut, "Change Role — " + i(y.value.full_name || y.value.name), 1),
              s("button", {
                class: "nim-close",
                onClick: e[14] || (e[14] = (t) => y.value = null)
              }, "✕")
            ]),
            s("div", ct, [
              e[57] || (e[57] = s("div", { style: { "font-size": "12.5px", color: "#4a5568" } }, "Select the job role(s) for this member:", -1)),
              (a(!0), l(C, null, E(I(de), (t) => (a(), l("label", {
                key: t,
                style: { display: "flex", "align-items": "center", gap: "10px", padding: "8px 12px", border: "1px solid #e4e8f0", "border-radius": "8px", cursor: "pointer" }
              }, [
                s("input", {
                  type: "checkbox",
                  checked: B.value.includes(t),
                  onChange: (r) => ke(t)
                }, null, 40, pt),
                s("span", vt, i(t), 1)
              ]))), 128))
            ]),
            s("div", mt, [
              s("button", {
                class: "nim-btn",
                onClick: e[15] || (e[15] = (t) => y.value = null)
              }, "Cancel"),
              s("button", {
                class: "nim-btn nim-btn-primary",
                onClick: Be,
                disabled: !o.$canEdit("admin"),
                title: o.$canEdit("admin") ? "" : "Read-only access"
              }, "Save Role", 8, ft)
            ])
          ])
        ])) : c("", !0),
        g.value ? (a(), l("div", {
          key: 3,
          class: "nim-overlay",
          onClick: e[21] || (e[21] = h((t) => g.value = null, ["self"]))
        }, [
          s("div", bt, [
            s("div", yt, [
              s("span", gt, "Reset Password — " + i(g.value.full_name || g.value.name), 1),
              s("button", {
                class: "nim-close",
                onClick: e[17] || (e[17] = (t) => g.value = null)
              }, "✕")
            ]),
            s("div", kt, [
              s("div", wt, [
                e[58] || (e[58] = s("label", { class: "nim-label" }, "New Password *", -1)),
                R(s("input", {
                  class: "nim-input",
                  "onUpdate:modelValue": e[18] || (e[18] = (t) => k.password = t),
                  type: "password",
                  placeholder: "At least 8 characters",
                  autocomplete: "new-password"
                }, null, 512), [
                  [z, k.password]
                ])
              ]),
              s("div", ht, [
                e[59] || (e[59] = s("label", { class: "nim-label" }, "Confirm New Password *", -1)),
                R(s("input", {
                  class: "nim-input",
                  "onUpdate:modelValue": e[19] || (e[19] = (t) => k.confirm_password = t),
                  type: "password",
                  placeholder: "Re-enter password",
                  autocomplete: "new-password"
                }, null, 512), [
                  [z, k.confirm_password]
                ])
              ]),
              e[60] || (e[60] = s("div", { style: { background: "#f0f9ff", border: "1px solid #c5d9fa", "border-radius": "8px", padding: "10px 14px", "font-size": "12.5px", color: "#1971C2" } }, "This sets the member's password directly. No email is sent — share the new password with them yourself.", -1)),
              F.value ? (a(), l("div", xt, i(F.value), 1)) : c("", !0)
            ]),
            s("div", _t, [
              s("button", {
                class: "nim-btn",
                onClick: e[20] || (e[20] = (t) => g.value = null)
              }, "Cancel"),
              s("button", {
                class: "nim-btn nim-btn-primary",
                onClick: Re,
                disabled: W.value || !o.$canEdit("admin"),
                title: o.$canEdit("admin") ? "" : "Read-only access"
              }, i(W.value ? "Saving…" : "Set Password"), 9, Ct)
            ])
          ])
        ])) : c("", !0),
        x.value ? (a(), l("div", {
          key: 4,
          class: "nim-overlay",
          onClick: e[25] || (e[25] = h((t) => x.value = null, ["self"]))
        }, [
          s("div", Et, [
            s("div", At, [
              e[61] || (e[61] = s("span", { style: { "font-weight": "700", color: "#C92A2A" } }, "Remove Member", -1)),
              s("button", {
                class: "nim-close",
                onClick: e[22] || (e[22] = (t) => x.value = null)
              }, "✕")
            ]),
            s("div", Bt, [
              s("p", St, [
                e[62] || (e[62] = f("Are you sure you want to remove ", -1)),
                s("strong", null, i(x.value.full_name || x.value.name), 1),
                e[63] || (e[63] = f("? Their account will be deactivated and they will lose access to company data.", -1))
              ])
            ]),
            s("div", Rt, [
              s("button", {
                class: "nim-btn",
                onClick: e[23] || (e[23] = (t) => x.value = null)
              }, "Cancel"),
              s("button", {
                class: "nim-btn",
                style: { background: "#C92A2A", color: "#fff", "border-color": "#C92A2A" },
                onClick: e[24] || (e[24] = (t) => Me(x.value)),
                disabled: !o.$canDelete("admin"),
                title: o.$canDelete("admin") ? "" : "Not permitted"
              }, "Remove Member", 8, $t)
            ])
          ])
        ])) : c("", !0)
      ]))
    ]));
  }
}, Vt = /* @__PURE__ */ Pe(Mt, [["__scopeId", "data-v-ea9b12a2"]]);
export {
  Vt as default
};
