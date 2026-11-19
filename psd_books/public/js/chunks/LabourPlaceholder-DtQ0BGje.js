import { c as r, a as e, t as n, g as i, V as p, k as l } from "./main-Dnnn1I_7.js";
const c = { class: "list-page" }, d = { style: { "max-width": "560px", margin: "60px auto", "text-align": "center", padding: "32px", border: "1px solid #e5e7eb", "border-radius": "12px", background: "#fff" } }, m = { style: { margin: "0 0 8px", "font-size": "20px", "font-weight": "600" } }, g = {
  __name: "LabourPlaceholder",
  setup(u) {
    const s = p(), a = i(() => {
      var o;
      return ((o = s.meta) == null ? void 0 : o.title) || "Labour Contract";
    });
    return (o, t) => (l(), r("div", c, [
      e("div", d, [
        t[0] || (t[0] = e("div", { style: { "font-size": "12px", "letter-spacing": ".06em", "text-transform": "uppercase", color: "#6b7280", "margin-bottom": "6px" } }, "Labour Contract", -1)),
        e("h2", m, n(a.value), 1),
        t[1] || (t[1] = e("p", { style: { margin: "0", color: "#6b7280", "font-size": "14px" } }, "Coming soon.", -1))
      ])
    ]));
  }
};
export {
  g as default
};
