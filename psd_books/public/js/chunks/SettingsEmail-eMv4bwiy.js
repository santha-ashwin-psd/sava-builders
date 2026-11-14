import { x as k, o as T, c as d, a as t, t as f, b as v, d as p, w as l, A as a, l as z, z as P, h as b, J as x, k as m } from "./main-HA1OdJEt.js";
const E = { class: "cust-page" }, C = { class: "cust-toolbar" }, M = {
  key: 0,
  style: { background: "#F3F0FF", color: "#2563eb", padding: "2px 10px", "border-radius": "20px", "font-size": "12px", "font-weight": "600", "margin-left": "10px" }
}, U = {
  key: 0,
  style: { padding: "40px", "text-align": "center", color: "#868E96" }
}, V = {
  key: 1,
  style: { "max-width": "760px", display: "grid", gap: "16px" }
}, B = { style: { background: "#fff", border: "1px solid #e4e8f0", "border-radius": "12px", padding: "24px" } }, N = { style: { display: "flex", "align-items": "flex-start", gap: "10px", cursor: "pointer", "margin-bottom": "18px" } }, F = ["checked"], O = { style: { "font-size": "12px", color: "#868e96" } }, L = {
  class: "se-form-grid",
  style: { display: "grid", "grid-template-columns": "1fr 1fr", gap: "14px 18px" }
}, q = ["disabled"], D = ["disabled"], A = ["disabled"], $ = { style: { "font-size": "11.5px", color: "#6b7db3", "font-weight": "600", "margin-bottom": "6px" } }, j = {
  key: 0,
  style: { color: "#868e96", "font-weight": "500", "font-size": "11px" }
}, G = ["disabled"], H = ["disabled"], J = ["placeholder", "disabled"], I = { style: { display: "flex", "align-items": "center", gap: "8px", "font-size": "13px", color: "#3b4a7a", cursor: "pointer" } }, K = ["checked", "disabled"], Q = { style: { display: "flex", "align-items": "center", gap: "8px", "font-size": "13px", color: "#3b4a7a", cursor: "pointer" } }, R = ["checked", "disabled"], W = { style: { display: "flex", gap: "10px", "margin-top": "20px" } }, X = ["disabled"], Y = { style: { background: "#fff", border: "1px solid #e4e8f0", "border-radius": "12px", padding: "24px" } }, Z = { style: { display: "flex", gap: "10px" } }, ss = ["disabled"], os = {
  __name: "SettingsEmail",
  setup(es) {
    const { toast: i } = k(), s = P({
      company: "",
      smtp_enabled: 0,
      smtp_server: "",
      smtp_port: 587,
      smtp_use_tls: 1,
      smtp_use_ssl: 0,
      smtp_login: "",
      smtp_password: "",
      smtp_password_set: !1,
      smtp_from_email: "",
      smtp_from_name: ""
    }), g = b(!0), u = b(!1), _ = b(!1), r = b("");
    async function y() {
      g.value = !0;
      try {
        const o = await z("psd_books.api.admin.get_company_smtp");
        Object.assign(s, o || {}, { smtp_password: "" });
      } catch (o) {
        i(o.message || "Could not load SMTP settings", "error");
      }
      g.value = !1;
    }
    function c(o) {
      o === "tls" ? (s.smtp_use_tls = 1, s.smtp_use_ssl = 0, Number(s.smtp_port) === 465 && (s.smtp_port = 587)) : (s.smtp_use_ssl = 1, s.smtp_use_tls = 0, Number(s.smtp_port) === 587 && (s.smtp_port = 465));
    }
    function w() {
      return s.smtp_enabled ? String(s.smtp_server).trim() ? Number(s.smtp_port) ? String(s.smtp_login).trim() ? !s.smtp_password && !s.smtp_password_set ? (i("Password is required", "error"), !1) : !s.smtp_use_tls && !s.smtp_use_ssl ? (i("Choose an encryption method — TLS or SSL", "error"), !1) : !0 : (i("Username (login) is required", "error"), !1) : (i("A valid Port is required", "error"), !1) : (i("SMTP Server is required", "error"), !1) : !0;
    }
    async function S() {
      if (w()) {
        u.value = !0;
        try {
          const o = { ...s };
          o.smtp_password || delete o.smtp_password, delete o.smtp_password_set, delete o.company, await x("psd_books.api.admin.save_company_smtp", o), i("SMTP settings saved"), s.smtp_password = "", await y();
        } catch (o) {
          i(o.message || "Could not save", "error");
        }
        u.value = !1;
      }
    }
    async function h() {
      if (!r.value) return i("Enter a recipient email", "error");
      _.value = !0;
      try {
        const o = { to_email: r.value };
        s.smtp_password && Object.assign(o, {
          use_overrides: 1,
          smtp_server: s.smtp_server,
          smtp_port: s.smtp_port,
          smtp_use_tls: s.smtp_use_tls,
          smtp_use_ssl: s.smtp_use_ssl,
          smtp_login: s.smtp_login,
          smtp_password: s.smtp_password,
          smtp_from_email: s.smtp_from_email,
          smtp_from_name: s.smtp_from_name
        }), await x("psd_books.api.admin.send_test_email", o), i("Test email sent to " + r.value);
      } catch (o) {
        i(o.message || "Test failed", "error");
      }
      _.value = !1;
    }
    return T(y), (o, e) => (m(), d("div", E, [
      t("div", C, [
        e[10] || (e[10] = t("span", { style: { "font-size": "18px", "font-weight": "700", color: "#1a1a2e" } }, "Email Settings (SMTP)", -1)),
        s.company ? (m(), d("span", M, f(s.company), 1)) : v("", !0)
      ]),
      e[22] || (e[22] = t("div", { style: { background: "#f0f4ff", border: "1px solid #c5d0fa", "border-radius": "10px", padding: "14px 18px", "margin-bottom": "18px", "font-size": "13px", color: "#3b4a7a", display: "flex", gap: "12px", "align-items": "flex-start" } }, [
        t("span", { style: { "font-size": "18px", "margin-top": "-1px" } }, "✉️"),
        t("div", null, [
          t("strong", null, "How email works in Books:"),
          p(" By default, invoices, payment reminders, and customer email are sent from the built-in platform account ("),
          t("em", null, "Books by PS Digitise"),
          p("). Turn on "),
          t("strong", null, "Enable Company SMTP"),
          p(" below to send that business email from your own address instead. Sign-in & password-reset OTPs always use the platform account and are never affected by these settings.")
        ])
      ], -1)),
      g.value ? (m(), d("div", U, "Loading…")) : (m(), d("div", V, [
        t("div", B, [
          t("label", N, [
            t("input", {
              type: "checkbox",
              checked: s.smtp_enabled,
              onChange: e[0] || (e[0] = (n) => s.smtp_enabled = n.target.checked ? 1 : 0),
              style: { width: "16px", height: "16px", cursor: "pointer", "margin-top": "2px" }
            }, null, 40, F),
            t("span", null, [
              e[11] || (e[11] = t("span", { style: { "font-size": "14px", "font-weight": "600", color: "#1a1a2e", display: "block" } }, "Enable Company SMTP", -1)),
              t("span", O, f(s.smtp_enabled ? "On — invoices & business email are sent from your SMTP server below." : "Off — business email is sent from the platform account (Books by PS Digitise)."), 1)
            ])
          ]),
          t("div", L, [
            t("div", null, [
              e[12] || (e[12] = t("div", { style: { "font-size": "11.5px", color: "#6b7db3", "font-weight": "600", "margin-bottom": "6px" } }, "SMTP Server", -1)),
              l(t("input", {
                class: "nim-input",
                "onUpdate:modelValue": e[1] || (e[1] = (n) => s.smtp_server = n),
                placeholder: "smtp.gmail.com",
                disabled: !s.smtp_enabled
              }, null, 8, q), [
                [a, s.smtp_server]
              ])
            ]),
            t("div", null, [
              e[13] || (e[13] = t("div", { style: { "font-size": "11.5px", color: "#6b7db3", "font-weight": "600", "margin-bottom": "6px" } }, "Port", -1)),
              l(t("input", {
                class: "nim-input",
                type: "number",
                "onUpdate:modelValue": e[2] || (e[2] = (n) => s.smtp_port = n),
                placeholder: "587",
                disabled: !s.smtp_enabled
              }, null, 8, D), [
                [
                  a,
                  s.smtp_port,
                  void 0,
                  { number: !0 }
                ]
              ])
            ]),
            t("div", null, [
              e[14] || (e[14] = t("div", { style: { "font-size": "11.5px", color: "#6b7db3", "font-weight": "600", "margin-bottom": "6px" } }, "Username (login)", -1)),
              l(t("input", {
                class: "nim-input",
                "onUpdate:modelValue": e[3] || (e[3] = (n) => s.smtp_login = n),
                placeholder: "you@company.com",
                disabled: !s.smtp_enabled
              }, null, 8, A), [
                [a, s.smtp_login]
              ])
            ]),
            t("div", null, [
              t("div", $, [
                e[15] || (e[15] = p(" Password / App Password ", -1)),
                s.smtp_password_set && !s.smtp_password ? (m(), d("span", j, "— stored, leave blank to keep")) : v("", !0)
              ]),
              l(t("input", {
                class: "nim-input",
                type: "password",
                "onUpdate:modelValue": e[4] || (e[4] = (n) => s.smtp_password = n),
                placeholder: "••••••••",
                disabled: !s.smtp_enabled
              }, null, 8, G), [
                [a, s.smtp_password]
              ])
            ]),
            t("div", null, [
              e[16] || (e[16] = t("div", { style: { "font-size": "11.5px", color: "#6b7db3", "font-weight": "600", "margin-bottom": "6px" } }, "From Email", -1)),
              l(t("input", {
                class: "nim-input",
                "onUpdate:modelValue": e[5] || (e[5] = (n) => s.smtp_from_email = n),
                placeholder: "invoices@company.com",
                disabled: !s.smtp_enabled
              }, null, 8, H), [
                [a, s.smtp_from_email]
              ])
            ]),
            t("div", null, [
              e[17] || (e[17] = t("div", { style: { "font-size": "11.5px", color: "#6b7db3", "font-weight": "600", "margin-bottom": "6px" } }, "From Name", -1)),
              l(t("input", {
                class: "nim-input",
                "onUpdate:modelValue": e[6] || (e[6] = (n) => s.smtp_from_name = n),
                placeholder: s.company,
                disabled: !s.smtp_enabled
              }, null, 8, J), [
                [a, s.smtp_from_name]
              ])
            ]),
            t("label", I, [
              t("input", {
                type: "radio",
                name: "smtp-enc",
                checked: s.smtp_use_tls && !s.smtp_use_ssl,
                onChange: e[7] || (e[7] = (n) => c("tls")),
                disabled: !s.smtp_enabled
              }, null, 40, K),
              e[18] || (e[18] = p(" Use TLS (port 587) ", -1))
            ]),
            t("label", Q, [
              t("input", {
                type: "radio",
                name: "smtp-enc",
                checked: s.smtp_use_ssl && !s.smtp_use_tls,
                onChange: e[8] || (e[8] = (n) => c("ssl")),
                disabled: !s.smtp_enabled
              }, null, 40, R),
              e[19] || (e[19] = p(" Use SSL (port 465) ", -1))
            ])
          ]),
          t("div", W, [
            t("button", {
              class: "nim-btn nim-btn-primary",
              onClick: S,
              disabled: u.value || !o.$canEdit("admin")
            }, f(u.value ? "Saving…" : "Save SMTP Settings"), 9, X)
          ])
        ]),
        t("div", Y, [
          e[20] || (e[20] = t("div", { style: { "font-size": "14px", "font-weight": "700", color: "#1a1a2e", "margin-bottom": "4px" } }, "Send Test Email", -1)),
          e[21] || (e[21] = t("div", { style: { "font-size": "12px", color: "#868e96", "margin-bottom": "12px" } }, "Tip: if you've typed a new password above, the test will use that without saving — verify before persisting.", -1)),
          t("div", Z, [
            l(t("input", {
              class: "nim-input",
              "onUpdate:modelValue": e[9] || (e[9] = (n) => r.value = n),
              placeholder: "recipient@example.com",
              style: { flex: "1" }
            }, null, 512), [
              [a, r.value]
            ]),
            t("button", {
              class: "nim-btn nim-btn-primary",
              onClick: h,
              disabled: _.value
            }, f(_.value ? "Sending…" : "Send Test"), 9, ss)
          ])
        ])
      ]))
    ]));
  }
};
export {
  os as default
};
