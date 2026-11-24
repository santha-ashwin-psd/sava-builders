// Helpers for the Labour Contract > Contractors screen (pages/Contractors.vue).
// Kept free of Vue so they can be unit tested (labourContractor.test.js).

// KRA PIN: one letter (A company, P individual) + 9 digits + one letter, e.g. A123456789Z.
// Same rule as the Supplier / Vendors screen and the server (labour_contractor.py).
export const KRA_PIN_RE = /^[AP][0-9]{9}[A-Z]$/;

export const CONTRACTOR_TYPES = ["Individual", "Company"];

export function todayISO(d = new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}

// True when the tax certificate expiry date is before today (YYYY-MM-DD strings compare correctly).
export function isCertExpired(expiry, today = todayISO()) {
  return !!expiry && String(expiry).slice(0, 10) < today;
}

export function contractorInitials(name) {
  const parts = String(name || "?").trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || "?";
}

// Filter keys: all | active | inactive | expired (expired = active contractor with an expired certificate).
export function matchesFilter(c, key, today = todayISO()) {
  if (key === "active") return !c.disabled;
  if (key === "inactive") return !!c.disabled;
  if (key === "expired") return !c.disabled && isCertExpired(c.tax_cert_expiry, today);
  return true;
}

export function countsFor(list, today = todayISO()) {
  const out = { all: list.length, active: 0, inactive: 0, expired: 0 };
  for (const c of list) {
    if (matchesFilter(c, "active", today)) out.active++;
    if (matchesFilter(c, "inactive", today)) out.inactive++;
    if (matchesFilter(c, "expired", today)) out.expired++;
  }
  return out;
}

// Phone takes digits, spaces and a leading + only; anything else typed or pasted is dropped.
export function cleanPhone(v) { return String(v ?? "").replace(/[^0-9+ ]/g, "").replace(/(?!^)\+/g, ""); }

export function matchesSearch(c, q) {
  const s = String(q || "").trim().toLowerCase();
  if (!s) return true;
  return [c.contractor_name, c.name, c.id_no, c.kra_pin, c.phone, c.contractor_type]
    .some((v) => String(v || "").toLowerCase().includes(s));
}

// Returns { field: message }. `list` = loaded contractors, `editingName` = name being edited ("" for new).
export function validateContractor(form, list = [], editingName = "") {
  const e = {};
  if (!String(form.contractor_name || "").trim()) e.contractor_name = "Name is required";
  if (!String(form.id_no || "").trim()) e.id_no = "ID or registration no. is required";
  const pin = String(form.kra_pin || "").trim().toUpperCase();
  if (!pin) e.kra_pin = "KRA PIN is required";
  else if (!KRA_PIN_RE.test(pin)) e.kra_pin = "Invalid KRA PIN. Expected format: A123456789Z";
  else {
    const dup = list.find((c) => String(c.kra_pin || "").toUpperCase() === pin && c.name !== editingName);
    if (dup) e.kra_pin = "KRA PIN " + pin + " already belongs to " + (dup.contractor_name || dup.name);
  }
  if (!form.tax_cert_expiry) e.tax_cert_expiry = "Tax certificate expiry is required";
  return e;
}