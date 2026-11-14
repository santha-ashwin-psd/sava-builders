import { o as d, c as t, a as e, F as l, r as p, b as f, f as c, h as u, k as n, t as g } from "./main-HA1OdJEt.js";
const x = { class: "cust-page" }, m = { style: { "max-width": "700px", display: "grid", gap: "12px" } }, y = { style: { display: "flex", "align-items": "center", gap: "12px" } }, b = { style: { "font-weight": "700", color: "#1a1a2e" } }, h = {
  key: 0,
  style: { background: "#fff", border: "1px dashed #e4e8f0", "border-radius": "10px", padding: "30px", "text-align": "center", color: "#868e96" }
}, k = {
  __name: "SettingsOrganization",
  setup(v) {
    const i = u([]);
    async function r() {
      try {
        i.value = await c("Books Company", {
          fields: ["name", "company_name", "currency"],
          limit: 50
        });
      } catch (a) {
        console.error("Failed to load companies", a);
      }
    }
    return d(r), (a, o) => (n(), t("div", x, [
      o[3] || (o[3] = e("div", { class: "cust-toolbar" }, [
        e("span", { style: { "font-size": "18px", "font-weight": "700", color: "#1a1a2e" } }, "Organizations"),
        e("span", { style: { background: "#fff8f0", color: "#e67700", padding: "3px 12px", "border-radius": "20px", "font-size": "12px", "font-weight": "600", border: "1px solid #ffe8a3" } }, "Multi-org switcher — Coming Soon (P2)")
      ], -1)),
      e("div", m, [
        o[2] || (o[2] = e("div", { style: { background: "#f0f4ff", border: "1px solid #c5d0fa", "border-radius": "10px", padding: "16px", "font-size": "12.5px", color: "#3b4a7a" } }, " Multi-organization switching allows you to manage multiple companies from one login. Currently your system has the companies listed below. Full switcher UI is coming in P2. ", -1)),
        (n(!0), t(l, null, p(i.value, (s) => (n(), t("div", {
          key: s.name,
          style: { background: "#fff", border: "1px solid #e4e8f0", "border-radius": "10px", padding: "16px", display: "flex", "align-items": "center", "justify-content": "space-between" }
        }, [
          e("div", y, [
            o[0] || (o[0] = e("div", { style: { width: "40px", height: "40px", "border-radius": "8px", background: "#F3F0FF", display: "flex", "align-items": "center", "justify-content": "center", "font-size": "18px" } }, "🏢", -1)),
            e("div", null, [
              e("div", b, g(s.company_name || s.name), 1)
            ])
          ]),
          o[1] || (o[1] = e("span", { style: { background: "#ebfbee", color: "#2f9e44", padding: "2px 10px", "border-radius": "20px", "font-size": "11.5px", "font-weight": "600" } }, "Active", -1))
        ]))), 128)),
        i.value.length ? f("", !0) : (n(), t("div", h, "No companies found"))
      ])
    ]));
  }
};
export {
  k as default
};
