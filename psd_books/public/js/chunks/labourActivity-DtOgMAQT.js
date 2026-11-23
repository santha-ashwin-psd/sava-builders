const d = ["Finishing", "Structure", "Services", "Site works"], f = /^[A-Z0-9][A-Z0-9-]*$/;
function s(e) {
  return String(e || "").split(/\s+/).filter(Boolean).join(" ");
}
function v(e = []) {
  let t = 0;
  for (const i of e) {
    const n = /^ACT-(\d+)$/.exec(String(i.name || i.activity_code || ""));
    n && (t = Math.max(t, parseInt(n[1], 10)));
  }
  return "ACT-" + String(t + 1).padStart(3, "0");
}
function u(e, t) {
  return t === "active" ? !e.disabled : t === "inactive" ? !!e.disabled : !0;
}
function m(e) {
  const t = { all: e.length, active: 0, inactive: 0 };
  for (const i of e)
    u(i, "active") && t.active++, u(i, "inactive") && t.inactive++;
  return t;
}
function l(e, t) {
  const i = String(t || "").trim().toLowerCase();
  return i ? [e.activity_name, e.name, e.category].some((n) => String(n || "").toLowerCase().includes(i)) : !0;
}
function y(e, t = {}) {
  return t && t[e.name] || "Not used";
}
function C(e = []) {
  const t = {};
  for (const i of e || []) i && i.activity && !t[i.activity] && (t[i.activity] = i.name);
  return t;
}
function g(e = [], t = [], i = "", n = "") {
  const c = new Set((t || []).filter((a) => a.name !== i).map((a) => a.activity));
  return (e || []).filter((a) => a.name === n || !a.disabled && !c.has(a.name));
}
function A(e, t = [], i = "") {
  const n = {}, c = String(e.activity_code || "").trim().toUpperCase(), a = s(e.activity_name);
  if (i || (c ? f.test(c) ? t.some((r) => String(r.name || "").toUpperCase() === c) && (n.activity_code = "Code " + c + " already exists") : n.activity_code = "Invalid code. Use letters, digits and dashes, e.g. ACT-004" : n.activity_code = "Code is required"), !a) n.activity_name = "Activity name is required";
  else {
    const r = t.find((o) => s(o.activity_name).toLowerCase() === a.toLowerCase() && o.name !== i);
    r && (n.activity_name = "An activity named " + a + " already exists (" + r.name + ")");
  }
  return d.includes(e.category) || (n.category = "Choose a category"), n;
}
export {
  d as A,
  m as a,
  C as b,
  s as c,
  l as d,
  g as f,
  u as m,
  v as n,
  y as u,
  A as v
};
