// Country-aware validation rules shared by Customers, Vendors, and any future forms.

export const EMAIL_REGEX  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const GSTIN_REGEX  = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const PAN_REGEX    = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
// Kenya KRA PIN: letter (A company / P individual) + 9 digits + letter, e.g. A123456789Z
export const KRA_PIN_REGEX = /^[AP][0-9]{9}[A-Z]$/;
export const IFSC_REGEX   = /^[A-Z]{4}0[A-Z0-9]{6}$/;
export const URL_REGEX    = /^https?:\/\/.+\..+/;

// Rules keyed by dial code (used for the mobile field that has a +XX selector)
export const PHONE_RULES = {
  "+254": { min: 9, max: 9, pattern: /^[17]\d{8}$/,   hint: "9 digits starting with 7 or 1 (Kenya)" },
  "+91":  { min: 10, max: 10, pattern: /^[6-9]\d{9}$/,   hint: "10 digits starting with 6–9 (India)" },
  "+1":   { min: 10, max: 10, pattern: /^\d{10}$/,        hint: "10 digits (US/Canada)" },
  "+44":  { min: 10, max: 10, pattern: /^7\d{9}$/,        hint: "10 digits starting with 7 (UK mobile)" },
  "+61":  { min:  9, max:  9, pattern: /^4\d{8}$/,        hint: "9 digits starting with 4 (Australia)" },
  "+971": { min:  9, max:  9, pattern: /^5\d{8}$/,        hint: "9 digits starting with 5 (UAE)" },
  "+65":  { min:  8, max:  8, pattern: /^[689]\d{7}$/,    hint: "8 digits starting with 6, 8, or 9 (Singapore)" },
  "+49":  { min: 10, max: 12, pattern: /^\d{10,12}$/,     hint: "10–12 digits (Germany)" },
  "+33":  { min:  9, max:  9, pattern: /^\d{9}$/,         hint: "9 digits (France)" },
  "+60":  { min:  9, max: 10, pattern: /^\d{9,10}$/,      hint: "9–10 digits (Malaysia)" },
  "+94":  { min:  9, max:  9, pattern: /^\d{9}$/,         hint: "9 digits (Sri Lanka)" },
  "+966": { min:  9, max:  9, pattern: /^5\d{8}$/,        hint: "9 digits starting with 5 (Saudi Arabia)" },
  "+92":  { min: 10, max: 10, pattern: /^3\d{9}$/,        hint: "10 digits starting with 3 (Pakistan)" },
  "+880": { min: 10, max: 10, pattern: /^\d{10}$/,        hint: "10 digits (Bangladesh)" },
  "+977": { min: 10, max: 10, pattern: /^\d{10}$/,        hint: "10 digits (Nepal)" },
  "+27":  { min:  9, max:  9, pattern: /^\d{9}$/,         hint: "9 digits (South Africa)" },
  "+55":  { min: 10, max: 11, pattern: /^\d{10,11}$/,     hint: "10–11 digits (Brazil)" },
  "+86":  { min: 11, max: 11, pattern: /^\d{11}$/,        hint: "11 digits (China)" },
  "+81":  { min: 10, max: 11, pattern: /^\d{10,11}$/,     hint: "10–11 digits (Japan)" },
};

// Rules keyed by country name (used for pincode/ZIP/postcode field)
export const PINCODE_RULES = {
  "Kenya":          { pattern: /^\d{5}$/,                       placeholder: "00100",      hint: "5 digits",                 filterRe: /\D/g,                maxlen: 5 },
  "India":          { pattern: /^\d{6}$/,                       placeholder: "400001",     hint: "6 digits",                 filterRe: /\D/g,            maxlen: 6  },
  "United States":  { pattern: /^\d{5}(-\d{4})?$/,             placeholder: "90210",      hint: "5 digits (e.g. 90210)",    filterRe: /[^\d-]/g,        maxlen: 10 },
  "United Kingdom": { pattern: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, placeholder: "SW1A 1AA", hint: "e.g. SW1A 1AA",  filterRe: /[^A-Za-z0-9\s]/g, maxlen: 8  },
  "Canada":         { pattern: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,  placeholder: "K1A 0A9",   hint: "A1A 1A1 format",           filterRe: /[^A-Za-z0-9\s]/g, maxlen: 7  },
  "Australia":      { pattern: /^\d{4}$/,                       placeholder: "2000",       hint: "4 digits",                 filterRe: /\D/g,            maxlen: 4  },
  "Germany":        { pattern: /^\d{5}$/,                       placeholder: "10115",      hint: "5 digits",                 filterRe: /\D/g,            maxlen: 5  },
  "France":         { pattern: /^\d{5}$/,                       placeholder: "75001",      hint: "5 digits",                 filterRe: /\D/g,            maxlen: 5  },
  "Singapore":      { pattern: /^\d{6}$/,                       placeholder: "018956",     hint: "6 digits",                 filterRe: /\D/g,            maxlen: 6  },
  "Malaysia":       { pattern: /^\d{5}$/,                       placeholder: "50480",      hint: "5 digits",                 filterRe: /\D/g,            maxlen: 5  },
  "Japan":          { pattern: /^\d{3}-?\d{4}$/,               placeholder: "100-0001",   hint: "7 digits (NNN-NNNN)",      filterRe: /[^\d-]/g,        maxlen: 8  },
  "China":          { pattern: /^\d{6}$/,                       placeholder: "100000",     hint: "6 digits",                 filterRe: /\D/g,            maxlen: 6  },
  "Brazil":         { pattern: /^\d{5}-?\d{3}$/,               placeholder: "01310-100",  hint: "8 digits (NNNNN-NNN)",     filterRe: /[^\d-]/g,        maxlen: 9  },
  "South Africa":   { pattern: /^\d{4}$/,                       placeholder: "8001",       hint: "4 digits",                 filterRe: /\D/g,            maxlen: 4  },
  "Sri Lanka":      { pattern: /^\d{5}$/,                       placeholder: "10230",      hint: "5 digits",                 filterRe: /\D/g,            maxlen: 5  },
  "Pakistan":       { pattern: /^\d{5}$/,                       placeholder: "75500",      hint: "5 digits",                 filterRe: /\D/g,            maxlen: 5  },
  "Nepal":          { pattern: /^\d{5}$/,                       placeholder: "44600",      hint: "5 digits",                 filterRe: /\D/g,            maxlen: 5  },
  "Bangladesh":     { pattern: /^\d{4}$/,                       placeholder: "1212",       hint: "4 digits",                 filterRe: /\D/g,            maxlen: 4  },
  "Saudi Arabia":   { pattern: /^\d{5}$/,                       placeholder: "12345",      hint: "5 digits",                 filterRe: /\D/g,            maxlen: 5  },
  "United Arab Emirates": { pattern: /^\d{0,6}$/,              placeholder: "",           hint: "optional (up to 6 digits)", filterRe: /\D/g,           maxlen: 6  },
};

/** Validate a mobile number. digits = stripped digits only. Returns error string or null. */
export function validateMobile(digits, mobileCode) {
  if (!digits) return null;
  const rule = PHONE_RULES[mobileCode];
  if (!rule) {
    return (digits.length < 7 || digits.length > 15)
      ? "Enter a valid mobile number (7–15 digits)" : null;
  }
  if (!rule.pattern.test(digits)) return `Invalid mobile — ${rule.hint}`;
  return null;
}

/** Validate a landline/work phone (no dial code). Returns error string or null. */
export function validatePhone(value) {
  if (!value) return null;
  const digits = value.replace(/[^\d]/g, "");
  return digits.length < 6 ? "Enter a valid phone number (at least 6 digits)" : null;
}

/** Validate pincode/ZIP for a country. Returns error string or null. */
export function validatePincode(value, country) {
  if (!value) return null;
  const rule = PINCODE_RULES[country];
  if (!rule) return null; // Unknown country — skip validation
  if (!rule.pattern.test(value.trim())) return `Invalid postcode — expected ${rule.hint}`;
  return null;
}

/** Filter / sanitize a pincode input value for the given country. */
export function sanitizePincode(value, country) {
  const rule = PINCODE_RULES[country];
  if (!rule) return value.slice(0, 10);
  return value.replace(rule.filterRe, "").slice(0, rule.maxlen);
}

/** Pincode placeholder for the given country. */
export function pincodePlaceholder(country) {
  return PINCODE_RULES[country]?.placeholder || "Postal / ZIP code";
}

/** Pincode hint text for the given country. */
export function pincodeHint(country) {
  return PINCODE_RULES[country]?.hint || "";
}

/** Check if GSTIN is required for a given country. */
export function isIndianContext(country) {
  return !country || country === "India";
}