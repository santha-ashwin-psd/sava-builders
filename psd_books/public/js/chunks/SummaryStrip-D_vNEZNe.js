/* empty css                                                                      */
import { _ as u, k as t, c as a, F as p, r as d, n, a as o, t as r, b as _, p as v, g as y } from "./main-BmX9V7v7.js";
const f = { class: "ssm-lbl" }, S = {
  key: 0,
  class: "ssm-sub"
}, g = {
  __name: "SummaryStrip",
  props: {
    /**
     * Array of card descriptors:
     *   { label, value, tone?, sub?, valueClass? }
     * Tones: 'default' | 'accent' (blue) | 'success' (green) | 'warn' (amber)
     *        | 'danger' (red) | 'info' (cyan)
     * valueClass override hooks: 'green' | 'orange' | 'red' | 'blue'
     */
    cards: { type: Array, required: !0 }
  },
  setup(l) {
    const m = l, c = y(() => {
      const e = m.cards.length;
      return e >= 3 && e <= 6 ? `grid-template-columns: repeat(${e}, 1fr);` : "grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));";
    });
    return (e, b) => (t(), a("div", {
      class: "ssm-strip",
      style: v(c.value)
    }, [
      (t(!0), a(p, null, d(l.cards, (s, i) => (t(), a("div", {
        key: i,
        class: n(["ssm-card", `ssm-${s.tone || "default"}`])
      }, [
        o("div", f, r(s.label), 1),
        o("div", {
          class: n(["ssm-val", s.valueClass])
        }, r(s.value), 3),
        s.sub ? (t(), a("div", S, r(s.sub), 1)) : _("", !0)
      ], 2))), 128))
    ], 4));
  }
}, h = /* @__PURE__ */ u(g, [["__scopeId", "data-v-c5032185"]]);
export {
  h as S
};
