const u = (n) => Number(n) || 0;
function _(n) {
  return n ? String(n).replace(/^\s*\d+\s*-\s*/, "").trim().toLowerCase() : "";
}
function m(n, o) {
  const e = _(n), a = _(o);
  return !!(e && a && e === a);
}
const h = /* @__PURE__ */ new Set(["CGST", "SGST", "UTGST"]), T = /* @__PURE__ */ new Set(["IGST"]);
function y(n, o, e) {
  const a = n.tax_type || "GST", c = n.taxes || n.rows || [];
  if (c.length) {
    const i = [];
    for (const r of c) {
      const p = String(r.tax_type || "").toUpperCase(), f = u(r.rate);
      f && (a === "GST" && (T.has(p) && o || h.has(p) && !o) || i.push({ tax_type: r.tax_type || a, rate: f, account_head: r.account_head || "" }));
    }
    return i;
  }
  const t = u(n.rate);
  if (!t) return [];
  const s = e.gst || {};
  return a === "GST" ? o ? [
    { tax_type: "CGST", rate: t / 2, account_head: s.cgst },
    { tax_type: "SGST", rate: t / 2, account_head: s.sgst }
  ] : [{ tax_type: "IGST", rate: t, account_head: s.igst }] : a === "VAT" ? [{ tax_type: "VAT", rate: t, account_head: n.account }] : [{ tax_type: "Other", rate: t, account_head: n.account }];
}
function d(n) {
  const o = n || [], e = (s) => Math.round(s.reduce((i, r) => i + u(r.rate), 0) * 100) / 100, a = (s) => o.filter((i) => s.has(String(i.tax_type || "").toUpperCase())), c = a(/* @__PURE__ */ new Set(["CGST", "SGST", "UTGST", "CESS"]));
  if (c.length) return e(c);
  const t = a(/* @__PURE__ */ new Set(["IGST", "CESS"]));
  return t.length ? e(t) : e(o);
}
function x(n, o, e) {
  const a = u(n);
  let t = (o || "Percentage") === "Percentage" ? a * u(e) / 100 : u(e);
  return t = Math.max(0, Math.min(t, a)), Math.round(t * 100) / 100;
}
function l(n, o) {
  const e = n || [], a = e.reduce((t, s) => t + u(s.amount), 0);
  if (!a || !o) return e.map((t) => ({ ...t }));
  const c = u(o) / a;
  return e.map((t) => ({
    ...t,
    amount: Math.round((u(t.amount) - u(t.amount) * c) * 100) / 100
  }));
}
function g(n, o, e = {}) {
  const a = m(e.companyState, e.placeOfSupply), c = {};
  for (const t of n || []) {
    const s = u(t.amount);
    if (!t.tax_code || !s) continue;
    const i = (o || []).find((r) => r.name === t.tax_code);
    if (i)
      for (const r of y(i, a, e)) {
        const p = u(r.rate);
        if (!p) continue;
        const f = r.account_head || e.defaultAccount || "", S = r.tax_type + "@" + p + "@" + f;
        c[S] || (c[S] = {
          tax_type: r.tax_type,
          description: `${r.tax_type} @ ${p}%`,
          rate: p,
          account_head: f,
          amount: 0
        }), c[S].amount += s * p / 100;
      }
  }
  for (const t of Object.values(c))
    t.amount = Math.round(t.amount * 100) / 100;
  return Object.values(c);
}
export {
  x as a,
  l as b,
  g as c,
  d as t
};
