import { _ as n, k as s, C as c, E as r, c as l, a as o, t as i, ae as u, b as d, T as b } from "./main-BAIA2aBR.js";
const m = {
  key: 0,
  class: "bab-bar"
}, _ = { class: "bab-count" }, p = {
  __name: "BulkActionBar",
  props: { count: { type: Number, default: 0 } },
  emits: ["clear"],
  setup(e) {
    return (t, a) => (s(), c(b, { name: "bab-slide" }, {
      default: r(() => [
        e.count > 0 ? (s(), l("div", m, [
          o("span", _, i(e.count) + " selected", 1),
          u(t.$slots, "default", {}, void 0, !0),
          o("button", {
            class: "bab-clear",
            onClick: a[0] || (a[0] = (B) => t.$emit("clear"))
          }, "✕ Clear")
        ])) : d("", !0)
      ]),
      _: 3
    }));
  }
}, f = /* @__PURE__ */ n(p, [["__scopeId", "data-v-4a6e9418"]]);
export {
  f as B
};
