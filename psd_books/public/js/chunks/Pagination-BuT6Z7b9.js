import { _ as f, k as l, c as r, a as t, F as m, r as w, t as p, n as $, g as u } from "./main-BmX9V7v7.js";
const C = { class: "pg-wrap" }, y = { class: "pg-left" }, M = { class: "pg-select-wrap" }, x = ["value"], S = ["value"], z = { class: "pg-right" }, B = { class: "pg-summary" }, L = { class: "pg-nav" }, I = ["disabled"], N = ["disabled"], j = ["onClick"], P = {
  key: 1,
  class: "pg-ellipsis"
}, q = ["disabled"], F = ["disabled"], A = {
  __name: "Pagination",
  props: {
    page: { type: Number, required: !0 },
    pageSize: { type: Number, required: !0 },
    totalItems: { type: Number, required: !0 },
    sizeOptions: { type: Array, default: () => [10, 25, 50, 100] }
  },
  emits: ["update:page", "update:pageSize"],
  setup(n) {
    const a = n, g = u(() => Math.max(1, Math.ceil(a.totalItems / a.pageSize))), c = u(() => a.totalItems === 0 ? 0 : (a.page - 1) * a.pageSize + 1), b = u(() => a.totalItems === 0 ? 0 : Math.min(a.totalItems, a.page * a.pageSize)), h = u(() => {
      const o = a.page, e = g.value;
      if (e <= 7)
        return Array.from({ length: e }, (i, k) => ({ kind: "page", n: k + 1, k: `p${k + 1}` }));
      const s = [], d = (i) => s.push({ kind: "page", n: i, k: `p${i}` }), v = (i) => s.push({ kind: "gap", k: `g${i}` });
      d(1), o > 4 && v("L");
      for (let i = Math.max(2, o - 1); i <= Math.min(e - 1, o + 1); i++) d(i);
      return o < e - 3 && v("R"), d(e), s;
    });
    return (o, e) => (l(), r("div", C, [
      t("div", y, [
        e[6] || (e[6] = t("span", { class: "pg-label" }, "Show", -1)),
        t("div", M, [
          t("select", {
            value: n.pageSize,
            onChange: e[0] || (e[0] = (s) => o.$emit("update:pageSize", Number(s.target.value))),
            class: "pg-select"
          }, [
            (l(!0), r(m, null, w(n.sizeOptions, (s) => (l(), r("option", {
              key: s,
              value: s
            }, p(s), 9, S))), 128))
          ], 40, x),
          e[5] || (e[5] = t("svg", {
            class: "pg-chevron",
            viewBox: "0 0 10 6",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            t("path", {
              d: "M1 1L5 5L9 1",
              stroke: "currentColor",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            })
          ], -1))
        ]),
        e[7] || (e[7] = t("span", { class: "pg-label" }, "entries", -1))
      ]),
      t("div", z, [
        t("span", B, " Showing " + p(c.value) + " to " + p(b.value) + " of " + p(n.totalItems) + " entries ", 1),
        t("div", L, [
          t("button", {
            class: "pg-btn pg-icon-btn",
            disabled: n.page === 1,
            onClick: e[1] || (e[1] = (s) => o.$emit("update:page", 1)),
            title: "First page"
          }, [...e[8] || (e[8] = [
            t("svg", {
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              t("path", {
                d: "M4 3v10M12 4L6 8l6 4",
                stroke: "currentColor",
                "stroke-width": "1.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              })
            ], -1)
          ])], 8, I),
          t("button", {
            class: "pg-btn pg-icon-btn",
            disabled: n.page === 1,
            onClick: e[2] || (e[2] = (s) => o.$emit("update:page", n.page - 1)),
            title: "Previous"
          }, [...e[9] || (e[9] = [
            t("svg", {
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              t("path", {
                d: "M10 4L6 8l4 4",
                stroke: "currentColor",
                "stroke-width": "1.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              })
            ], -1)
          ])], 8, N),
          (l(!0), r(m, null, w(h.value, (s) => (l(), r("span", {
            key: s.k,
            class: "pg-page-cell"
          }, [
            s.kind === "page" ? (l(), r("button", {
              key: 0,
              class: $(["pg-btn pg-page", { active: s.n === n.page }]),
              onClick: (d) => o.$emit("update:page", s.n)
            }, p(s.n), 11, j)) : (l(), r("span", P, "…"))
          ]))), 128)),
          t("button", {
            class: "pg-btn pg-icon-btn",
            disabled: n.page === g.value,
            onClick: e[3] || (e[3] = (s) => o.$emit("update:page", n.page + 1)),
            title: "Next"
          }, [...e[10] || (e[10] = [
            t("svg", {
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              t("path", {
                d: "M6 4l4 4-4 4",
                stroke: "currentColor",
                "stroke-width": "1.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              })
            ], -1)
          ])], 8, q),
          t("button", {
            class: "pg-btn pg-icon-btn",
            disabled: n.page === g.value,
            onClick: e[4] || (e[4] = (s) => o.$emit("update:page", g.value)),
            title: "Last page"
          }, [...e[11] || (e[11] = [
            t("svg", {
              viewBox: "0 0 16 16",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              t("path", {
                d: "M12 3v10M4 4l6 4-6 4",
                stroke: "currentColor",
                "stroke-width": "1.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              })
            ], -1)
          ])], 8, F)
        ])
      ])
    ]));
  }
}, O = /* @__PURE__ */ f(A, [["__scopeId", "data-v-cdf316ff"]]);
export {
  O as P
};
