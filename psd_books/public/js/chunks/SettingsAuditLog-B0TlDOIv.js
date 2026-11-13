import { x as L, o as z, c as s, a as t, u as x, i as f, d as m, F as _, r as y, b, l as T, h as u, k as n, t as a, p as h } from "./main-DMuK85je.js";
const S = { class: "cust-page" }, E = { class: "cust-toolbar" }, A = { style: { display: "flex", gap: "8px" } }, D = ["disabled"], M = ["innerHTML"], N = ["innerHTML"], V = {
  class: "cust-table-card sa-tbl-card",
  style: { "margin-top": "0" }
}, F = {
  key: 0,
  style: { padding: "40px", "text-align": "center", color: "#868e96" }
}, H = {
  key: 1,
  class: "sal-desktop-table",
  style: { width: "100%", "border-collapse": "collapse", "font-size": "12.5px" }
}, j = { style: { padding: "9px 14px", color: "#868e96" } }, B = { style: { padding: "9px 14px", color: "#4a5568" } }, O = { style: { padding: "9px 14px", color: "#4a5568" } }, R = { style: { padding: "9px 14px", "font-weight": "600", color: "#1a1a2e" } }, U = { style: { padding: "9px 14px" } }, G = { key: 0 }, I = {
  key: 2,
  class: "sal-mobile-cards"
}, P = {
  key: 0,
  class: "sal-mc-empty"
}, $ = { class: "sal-mc-top" }, q = { class: "sal-mc-date" }, J = { class: "sal-mc-mid" }, K = { class: "sal-mc-meta" }, X = {
  __name: "SettingsAuditLog",
  setup(Q) {
    const { toast: v } = L(), i = u([]), d = u(!1), k = u(0), r = {
      Login: "#2F9E44",
      Logout: "#868E96",
      Created: "#1971C2",
      Submitted: "#2F9E44",
      Cancelled: "#C92A2A",
      Amended: "#E67700"
    };
    async function g() {
      d.value = !0;
      try {
        i.value = await T("psd_books.api.admin.get_audit_log", { page: k.value, page_len: 50 }) || [];
      } catch (p) {
        v("Could not load audit log: " + p.message, "error");
      }
      d.value = !1;
    }
    function w() {
      const p = ["Date", "User", "DocType", "Document", "Action", "Status"], o = i.value.map(
        (l) => [l.creation, l.user, l.doctype || "", l.doc_name || "", l.operation || "", l.status || ""].map((C) => `"${String(C).replace(/"/g, '""')}"`).join(",")
      ), e = [p.join(","), ...o].join(`
`), c = document.createElement("a");
      c.href = "data:text/csv;charset=utf-8," + encodeURIComponent(e), c.download = "audit_log.csv", c.click();
    }
    return z(g), (p, o) => (n(), s("div", S, [
      t("div", E, [
        o[2] || (o[2] = t("span", { style: { "font-size": "18px", "font-weight": "700", color: "#1a1a2e" } }, "Audit Log", -1)),
        t("div", A, [
          t("button", {
            class: "nim-btn nim-btn-ghost",
            onClick: w,
            disabled: !i.value.length
          }, [
            t("span", {
              innerHTML: x(f)("download", 13),
              style: { "vertical-align": "-2px", "margin-right": "4px" }
            }, null, 8, M),
            o[0] || (o[0] = m("Export CSV", -1))
          ], 8, D),
          t("button", {
            class: "nim-btn nim-btn-primary",
            onClick: g
          }, [
            t("span", {
              innerHTML: x(f)("refresh", 13),
              style: { "vertical-align": "-2px", "margin-right": "4px" }
            }, null, 8, N),
            o[1] || (o[1] = m("Refresh", -1))
          ])
        ])
      ]),
      t("div", V, [
        d.value ? (n(), s("div", F, "Loading audit log…")) : (n(), s("table", H, [
          o[4] || (o[4] = t("thead", null, [
            t("tr", { style: { background: "#f8f9fc", "border-bottom": "2px solid #e4e8f0" } }, [
              t("th", { style: { padding: "9px 14px", "text-align": "left", "font-size": "11px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": ".5px", color: "#6b7db3" } }, "Date / Time"),
              t("th", { style: { padding: "9px 14px", "text-align": "left", "font-size": "11px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": ".5px", color: "#6b7db3" } }, "User"),
              t("th", { style: { padding: "9px 14px", "text-align": "left", "font-size": "11px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": ".5px", color: "#6b7db3" } }, "Document Type"),
              t("th", { style: { padding: "9px 14px", "text-align": "left", "font-size": "11px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": ".5px", color: "#6b7db3" } }, "Document"),
              t("th", { style: { padding: "9px 14px", "text-align": "left", "font-size": "11px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": ".5px", color: "#6b7db3" } }, "Action")
            ])
          ], -1)),
          t("tbody", null, [
            (n(!0), s(_, null, y(i.value, (e) => (n(), s("tr", {
              key: e.name,
              style: { "border-bottom": "1px solid #f0f2f7" }
            }, [
              t("td", j, a(e.creation), 1),
              t("td", B, a(e.user), 1),
              t("td", O, a(e.doctype || "—"), 1),
              t("td", R, a(e.doc_name || "—"), 1),
              t("td", U, [
                t("span", {
                  style: h("background:" + (r[e.operation] || "#f8f9fa") + "22;color:" + (r[e.operation] || "#868e96") + ";padding:2px 8px;border-radius:20px;font-size:11.5px;font-weight:600")
                }, a(e.operation || "—"), 5)
              ])
            ]))), 128)),
            !i.value.length && !d.value ? (n(), s("tr", G, [...o[3] || (o[3] = [
              t("td", {
                colspan: "5",
                style: { padding: "40px", "text-align": "center", color: "#868e96" }
              }, "No audit log entries found", -1)
            ])])) : b("", !0)
          ])
        ])),
        d.value ? b("", !0) : (n(), s("div", I, [
          i.value.length ? (n(!0), s(_, { key: 1 }, y(i.value, (e) => (n(), s("div", {
            key: e.name,
            class: "sal-mobile-card"
          }, [
            t("div", $, [
              t("span", q, a(e.creation), 1),
              t("span", {
                class: "sal-mc-op",
                style: h("background:" + (r[e.operation] || "#f8f9fa") + "22;color:" + (r[e.operation] || "#868e96"))
              }, a(e.operation || "—"), 5)
            ]),
            t("div", J, a(e.doc_name || "—"), 1),
            t("div", K, [
              t("span", null, a(e.user), 1),
              t("span", null, a(e.doctype || "—"), 1)
            ])
          ]))), 128)) : (n(), s("div", P, [...o[5] || (o[5] = [
            t("div", { style: { "font-size": "32px", "margin-bottom": "8px" } }, "📋", -1),
            t("div", null, "No audit log entries found", -1)
          ])]))
        ]))
      ])
    ]));
  }
};
export {
  X as default
};
