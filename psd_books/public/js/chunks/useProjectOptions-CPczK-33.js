import { e as u, f, h as m } from "./main-B4BdT7Fg.js";
function p() {
  const t = m([]);
  async function n(l = "", o = "") {
    try {
      const c = await u(), r = [["status", "!=", "Closed"]];
      c && r.push(["company", "=", c]);
      const i = await f("Project", {
        fields: ["name", "project_code", "project_name"],
        filters: r,
        order: "project_code asc",
        limit: 100
      }), a = (l || "").toLowerCase();
      let s = (i || []).filter((e) => !a || (e.project_code || "").toLowerCase().includes(a) || (e.project_name || "").toLowerCase().includes(a)).map((e) => ({ label: `${e.project_code} — ${e.project_name}`, value: e.name }));
      o && !s.some((e) => e.value === o) && s.unshift({ label: o, value: o }), t.value = s;
    } catch {
      t.value = o ? [{ label: o, value: o }] : [];
    }
  }
  return { projects: t, fetchProjects: n };
}
export {
  p as u
};
