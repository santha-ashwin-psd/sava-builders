import { y as n, g as s, h as r } from "./main-Cij9_Vxg.js";
function p(c, { defaultPageSize: v = 25, storageKey: l = null } = {}) {
  const g = (() => {
    if (l)
      try {
        const a = Number(localStorage.getItem(`books.pg.${l}`));
        if ([10, 25, 50, 100].includes(a)) return a;
      } catch {
      }
    return v;
  })(), t = r(1), e = r(g), u = s(() => (c.value || []).length), o = s(() => Math.max(1, Math.ceil(u.value / e.value))), f = s(() => {
    const a = c.value || [], i = (t.value - 1) * e.value;
    return a.slice(i, i + e.value);
  });
  return n(u, () => {
    t.value > o.value && (t.value = o.value), t.value < 1 && (t.value = 1);
  }), l ? n(e, (a) => {
    try {
      localStorage.setItem(`books.pg.${l}`, String(a));
    } catch {
    }
    t.value = 1;
  }) : n(e, () => {
    t.value = 1;
  }), { page: t, pageSize: e, paged: f, totalItems: u, totalPages: o };
}
export {
  p as u
};
