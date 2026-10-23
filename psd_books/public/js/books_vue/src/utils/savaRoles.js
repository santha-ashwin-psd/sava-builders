// Sava A17.3c: the 8 Sava job roles and the Books role / module pre-fill used by
// the Users screen. The Sava roles sit on top of the Books role; the admin can
// still change the Books role and the modules afterwards.

export const SAVA_ROLES = [
  "Store Keeper", "Site Engineer", "Purchase Officer", "Accounts Officer",
  "Purchase Manager", "Finance", "Director", "Project Manager",
];

export const SAVA_ROLE_DESC = {
  "Store Keeper":     "Receives goods, issues and transfers stock",
  "Site Engineer":    "Raises material requisitions for a project",
  "Purchase Officer": "Runs RFQs, quotations and LPOs",
  "Accounts Officer": "Enters supplier bills and payments",
  "Purchase Manager": "Approves quotation comparisons and LPOs",
  "Finance":          "Approves high-value LPOs, sees reports",
  "Director":         "Approves the largest LPOs, sees reports",
  "Project Manager":  "Creates projects and approves their material requests",
};

// Books role + module keys each Sava role needs to be able to work.
export const SAVA_PREFILL = {
  "Store Keeper":     { role: "Books Manager", modules: ["inventory"] },
  "Site Engineer":    { role: "Books Manager", modules: ["inventory"] },
  "Purchase Officer": { role: "Books Manager", modules: ["bills", "inventory", "customers"] },
  "Accounts Officer": { role: "Accountant",    modules: ["bills", "payments", "reports", "customers"] },
  "Purchase Manager": { role: "Books Manager", modules: ["bills", "inventory", "reports", "customers"] },
  "Finance":          { role: "Accountant",    modules: ["bills", "payments", "reports"] },
  "Director":         { role: "Books Admin",   modules: ["*"] },   // Director always has admin access: every module
  "Project Manager":  { role: "Books Manager", modules: ["inventory"] },
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