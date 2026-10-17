// Shared Project dropdown options for document forms (MRN, LPO, GRN, DN,
// Stock Entry, Purchase Invoice). Only Open projects are offered for new
// documents; the project already saved on a document is always kept in the
// list so an older document still shows its project when its status changes.
import { ref } from "vue";
import { apiList, resolveCompany } from "../api/client.js";

export function useProjectOptions() {
  const projects = ref([]);

  async function fetchProjects(q = "", keep = "") {
    try {
      const co = await resolveCompany();
      const filters = [["status", "!=", "Closed"]];
      if (co) filters.push(["company", "=", co]);
      const rows = await apiList("Project", {
        fields: ["name", "project_code", "project_name"],
        filters,
        order: "project_code asc",
        limit: 100,
      });
      const needle = (q || "").toLowerCase();
      let opts = (rows || [])
        .filter(r => !needle ||
          (r.project_code || "").toLowerCase().includes(needle) ||
          (r.project_name || "").toLowerCase().includes(needle))
        .map(r => ({ label: `${r.project_code} — ${r.project_name}`, value: r.name }));
      if (keep && !opts.some(o => o.value === keep)) opts.unshift({ label: keep, value: keep });
      projects.value = opts;
    } catch {
      projects.value = keep ? [{ label: keep, value: keep }] : [];
    }
  }

  return { projects, fetchProjects };
}