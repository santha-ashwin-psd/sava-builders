// Sava A17.3c: the 4 job roles and the Books role / module pre-fill used by
// the Users screen. The Sava roles sit on top of the Books role; the admin can
// still change the Books role and the modules afterwards.

export const SAVA_ROLES = ["Site Engineer", "Purchase Manager", "Admin", "Director"];

export const SAVA_ROLE_DESC = {
  "Site Engineer":    "Raises material requests (MRN) only, approved by a Director",
  "Purchase Manager": "Full access; sends for approval, cannot approve",
  "Admin":            "Full access; sends for approval, cannot approve",
  "Director":         "Full access, and the only one who approves (LPO, comparison, MRN)",
};

// Books role + module keys each role needs to be able to work.
export const SAVA_PREFILL = {
  "Site Engineer":    { role: "Books Manager", modules: [] },   // MRN only: the Material Requests screen comes from the server access rule, not a module
  "Purchase Manager": { role: "Books Manager", modules: ["*"] },
  "Admin":            { role: "Books Manager", modules: ["*"] },
  "Director":         { role: "Books Admin",   modules: ["*"] },   // Director: every module, plus approvals
};

// When a user holds several Sava roles, the strongest Books role wins.
const BOOKS_ROLE_RANK = ["Books Viewer", "Accountant", "Books Manager", "Books Admin"];

/**
 * Books role and module flags for a set of Sava roles.
 * moduleKeys: every module key, so unlisted modules come back false.
 * Returns null when no known Sava role is selected.
 */
export function savaPrefill(savaRoles, moduleKeys) {
  const picked = (savaRoles || []).filter((r) => SAVA_PREFILL[r]);
  if (!picked.length) return null;
  let role = "Books Viewer";
  const on = new Set();
  for (const r of picked) {
    const p = SAVA_PREFILL[r];
    if (BOOKS_ROLE_RANK.indexOf(p.role) > BOOKS_ROLE_RANK.indexOf(role)) role = p.role;
    p.modules.forEach((m) => (m === "*" ? moduleKeys.forEach((k) => on.add(k)) : on.add(m)));
  }
  return { role, modules: Object.fromEntries(moduleKeys.map((k) => [k, on.has(k)])) };
}

// Same set of roles, ignoring order.
export function sameRoles(a, b) {
  const x = [...(a || [])].sort();
  const y = [...(b || [])].sort();
  return x.length === y.length && x.every((v, i) => v === y[i]);
}