// Shared print-template renderer — Classic / Modern / Minimal.
// All pages reuse these three templates by calling printDoc(doc, config).

import { reactive, computed } from "vue";
import { apiGet } from "../api/client.js";

const _state = reactive({
  template: "classic",
  brandColor: "#1a6ef7",
  logo: "",
  company: "",
  companyGstin: "",
  companyAddress: "",
  companyCity: "",
  companyState: "",
  companyPincode: "",
  companyPhone: "",
  companyEmail: "",
  bankName: "",
  bankBranch: "",
  bankAccountNo: "",
  bankIfsc: "",
});

async function _loadBranding(company) {
  _state.company = company || "";
  try {
    const csrf = window.frappe?.csrf_token || "";
    const res = await fetch("/api/method/psd_books.api.admin.get_company_settings", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Frappe-CSRF-Token": csrf },
      credentials: "same-origin",
      body: new URLSearchParams({}),
    });
    const data = await res.json();
    const d = data.message || {};
    if (d.pdf_template) _state.template   = d.pdf_template;
    if (d.brand_color)  _state.brandColor = d.brand_color;
    if (d.company_logo) _state.logo       = d.company_logo;
    _state.companyGstin    = d.kra_pin || "";
    _state.companyAddress  = d.company_address || "";
    _state.companyCity     = d.company_city || "";
    _state.companyState    = d.company_state || "";
    _state.companyPincode  = d.company_pincode || "";
    _state.companyPhone    = d.company_phone || "";
    _state.companyEmail    = d.company_email || "";
    _state.bankName        = d.bank_name || "";
    _state.bankBranch      = d.bank_branch || "";
    _state.bankAccountNo   = d.bank_account_no || "";
    _state.bankIfsc        = d.bank_ifsc || "";
  } catch {}
}

function _saveBranding() {
  // no-op: branding is managed centrally in Settings > Branding & Template
}

function _esc(s) {
  return String(s ?? "").replace(/[&<>"']/g,
    c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function _currencySymbol(currency) {
  return currency || "KES";
}
function _fmt(v, currency) {
  const symbol = (currency || "KES") + " ";
  return symbol + Number(v || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
// Plain number, no currency symbol — used inside the Classic template's item
// table / totals / HSN summary, where the currency is already indicated once
// in the column header ("Rate (KES)", "Amount (KES)", …), matching the reference
// invoice which never repeats the symbol on data rows.
function _fmtNumFor(v, currency) {
  // KES groups as 123,456.00
  const locale = "en-US";
  return Number(v || 0).toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function _fmtNum(v) {
  return _fmtNumFor(v, "KES");
}
// Reference invoice shows dates as "13-Jul-2026" (full 4-digit year).
function _fmtDocDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt)) return String(d);
  return dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, "-");
}
// Western number words (thousand / million / billion) for KES amounts.
function _westernWords(n) {
  n = Math.floor(Number(n) || 0);
  if (n === 0) return "Zero";
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const two = x => x < 20 ? ones[x] : tens[Math.floor(x / 10)] + (x % 10 ? " " + ones[x % 10] : "");
  const three = x => x >= 100 ? ones[Math.floor(x / 100)] + " Hundred" + (x % 100 ? " " + two(x % 100) : "") : two(x);
  const parts = [];
  const billion = Math.floor(n / 1e9); n %= 1e9;
  const million = Math.floor(n / 1e6); n %= 1e6;
  const thousand = Math.floor(n / 1e3); n %= 1e3;
  if (billion) parts.push(three(billion) + " Billion");
  if (million) parts.push(three(million) + " Million");
  if (thousand) parts.push(three(thousand) + " Thousand");
  if (n) parts.push(three(n));
  return parts.join(" ");
}
function _kesWords(v) {
  const total = Math.round((Number(v) || 0) * 100);
  const whole = Math.floor(total / 100), cents = total % 100;
  return "Kenya Shillings " + _westernWords(whole) + (cents ? " and " + _westernWords(cents) + " Cents" : "") + " Only";
}
function _today() {
  return new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
// Terms & Conditions is shown as a bulleted list on print, one <li> per line.
function _bulletList(text) {
  const lines = String(text || "").split("\n").map(s => s.trim()).filter(Boolean);
  if (!lines.length) return "";
  return `<ul>${lines.map(l => `<li>${_esc(l)}</li>`).join("")}</ul>`;
}
// Group line items by HSN/SAC code for the print footer's tax-rate summary
// table (HSN/SAC Code | Taxable | CGST% | CGST (KES) | SGST% | SGST (KES), or IGST
// variant). Amounts are derived from each item's taxable_amount × rate,
// since that's what the per-item CGST/SGST/IGST % columns are computed from.
function _hsnSummary(items) {
  const map = new Map();
  (items || []).forEach(it => {
    const hsn = it.gst_hsn_code || it.hsn_code || "";
    if (!hsn) return;
    const taxable = Number(it.taxable_amount != null ? it.taxable_amount : it.amount) || 0;
    const cgstRate = Number(it.cgst_rate || 0), sgstRate = Number(it.sgst_rate || 0), igstRate = Number(it.igst_rate || 0);
    const row = map.get(hsn) || { hsn, taxable: 0, cgstRate, sgstRate, igstRate, cgstAmt: 0, sgstAmt: 0, igstAmt: 0 };
    row.taxable += taxable;
    row.cgstAmt += taxable * cgstRate / 100;
    row.sgstAmt += taxable * sgstRate / 100;
    row.igstAmt += taxable * igstRate / 100;
    map.set(hsn, row);
  });
  return [...map.values()];
}
function _logoSrc(url) {
  if (!url) return "";
  if (url.startsWith("data:") || url.startsWith("http")) return url;
  return (window.frappe?.boot?.site_url || window.location.origin).replace(/\/$/, "") + url;
}
// formatAddress() (used across the SPA when an address is picked) always
// joins fields in this fixed order, one per line: address_line1,
// [address_line2], city, state, pincode, [country]. Reflow that into the
// two-line "street, street2" / "City, State - Pincode" layout used on print.
function _formatAddrLines(raw) {
  let lines = String(raw || "").split("\n").map(s => s.trim()).filter(Boolean);
  if (!lines.length) return [];
  if (lines.length > 1 && /^india$/i.test(lines[lines.length - 1])) lines.pop();
  if (lines.length <= 1) return lines;
  let pincode = "";
  if (/^\d{4,8}$/.test(lines[lines.length - 1])) pincode = lines.pop();
  const state = lines.length ? lines.pop() : "";
  const city = lines.length ? lines.pop() : "";
  const streetLine = lines.join(", ");
  const cityStateLine = [city, state].filter(Boolean).join(", ") + (pincode ? " - " + pincode : "");
  return [streetLine, cityStateLine].filter(Boolean);
}

// ── TEMPLATE 1: "Classic" — formal letterhead, ruled frame ────────────────────
function _renderClassic(doc, cfg) {
  const brand    = _state.brandColor;
  const logo     = _logoSrc(_state.logo);
  const currency = cfg.currency || doc.currency || "KES";
  const _fmtNum = (v) => _fmtNumFor(v, currency);   // shadows the default helper for this document
  const netTotal = doc.net_total != null ? doc.net_total
    : (doc.grand_total || 0) - (doc.total_taxes_and_charges ?? doc.total_tax ?? (doc.taxes || []).reduce((s, t) => s + (t.tax_amount || 0), 0));
  const party    = doc[cfg.partyField] || doc.customer || doc.supplier || "";
  const docDate  = doc.posting_date || doc.transaction_date || "";
  const includeMrp = cfg.includeMrp && (doc.items || []).some(it => Number(it.mrp) > 0);
  const hasIgst  = (doc.items || []).some(it => Number(it.igst_rate) > 0);
  const hasCgst  = (doc.items || []).some(it => Number(it.cgst_rate) > 0 || Number(it.sgst_rate) > 0);
  const includeGst = cfg.includeGst !== false && (hasIgst || hasCgst);
  const totalTax = doc.total_taxes_and_charges ?? (doc.taxes || []).reduce((s, t) => s + (t.tax_amount || 0), 0);
  const roundOff = doc.grand_total != null ? Math.round((doc.grand_total - (netTotal + totalTax)) * 100) / 100 : 0;
  const amountWords = doc.in_words || _kesWords(doc.grand_total);

  function _fmtExpiry(d) {
    if (!d) return "";
    const dt = new Date(d);
    if (isNaN(dt)) return "";
    return dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" }).replace(/ /g, "-");
  }
  const items = (doc.items || []).map((it, i) => `
    <tr>
      <td class="c">${i + 1}</td>
      <td>
        <div class="inm">${_esc(it.item_name || it.item_code)}</div>
        ${it.description && it.description !== it.item_name ? `<div class="ids">${_esc(it.description)}</div>` : ""}
        ${it.batch_no ? `<div class="ids">Batch: ${_esc(it.batch_no)} (${Number(it.qty || 0)})${it.batch_expiry_date ? ` (exp ${_fmtExpiry(it.batch_expiry_date)})` : ""}</div>` : ""}
      </td>
      ${cfg.includeHsn ? `<td class="c nw">${_esc(it.gst_hsn_code || it.hsn_code || "—")}</td>` : ""}
      <td class="r nw">${Number(it.qty || 0)}</td>
      <td class="c nw">${_esc(it.uom || "Nos")}</td>
      ${includeMrp ? `<td class="r nw">${it.mrp ? _fmtNum(it.mrp) : "—"}</td>` : ""}
      <td class="r nw">${_fmtNum(it.rate)}</td>
      ${cfg.includeDiscount ? `<td class="c nw">${Number(it.discount_percentage || 0).toFixed(2)}%</td>` : ""}
      ${includeGst ? `<td class="r nw">${_fmtNum(it.taxable_amount != null ? it.taxable_amount : it.amount)}</td>` : ""}
      ${includeGst ? (hasIgst ? `<td class="c nw">${Number(it.igst_rate || 0).toFixed(2)}%</td>` : `<td class="c nw">${Number(it.cgst_rate || 0).toFixed(2)}%</td><td class="c nw">${Number(it.sgst_rate || 0).toFixed(2)}%</td>`) : ""}
      <td class="r b nw">${_fmtNum(it.amount)}</td>
    </tr>`).join("");
  const taxRows = (doc.taxes || []).map(t => {
    const rawLabel = t.description || t.account_head || "Tax";
    // Purchase Orders keep the rate in the label ("VAT 16%"); invoices strip it ("Add CGST").
    const label = cfg.keepTaxLabel ? String(rawLabel).trim() : rawLabel.replace(/[@(]?\s*[\d.]+\s*%\)?/g, "").replace(/\(\s*\)/g, "").trim();
    return `<div class="row"><span>Add ${_esc(label)} (${_esc(_currencySymbol(currency))})</span><span>${_fmtNum(t.tax_amount || 0)}</span></div>`;
  }).join("");
  const colspan = 6 + (cfg.includeHsn ? 1 : 0) + (cfg.includeDiscount ? 1 : 0) + (includeMrp ? 1 : 0) + (includeGst ? (hasIgst ? 2 : 3) : 0);
  const hsnRows = includeGst ? _hsnSummary(doc.items) : [];

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${_esc(cfg.title)} — ${_esc(doc.name)}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;background:#fff;font-size:12.5px;line-height:1.55;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .sheet{max-width:980px;margin:0 auto;padding:40px}
  .frame{padding:28px 30px}
  /* Letterhead */
  .hdr{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;font-family:Arial,Helvetica,sans-serif}
  .hdr-l .co{font-size:32px;font-weight:700;color:#111;letter-spacing:-.01em;font-family:Arial,Helvetica,sans-serif}
  .hdr-l .addr{font-size:11px;font-weight:600;color:#111;margin-top:8px;line-height:1.55}
  .hdr-l .contact{margin-top:8px;font-size:11px;color:${brand};display:flex;flex-direction:row;flex-wrap:wrap;gap:16px}
  .hdr-l .contact .ci{display:flex;align-items:center;gap:6px}
  .hdr-l .contact svg{width:12px;height:12px;flex-shrink:0}
  .hdr-r{flex-shrink:0}
  .hdr-r img{max-height:110px;max-width:170px;object-fit:contain;display:block}
  .title{text-align:center;font-size:20px;font-weight:800;letter-spacing:.05em;color:#111;margin:28px 0 20px;font-family:Arial,Helvetica,sans-serif}
  .hdr-bot{display:flex;justify-content:space-between;align-items:flex-end;font-family:Arial,sans-serif;font-size:11.5px;color:#111;padding-bottom:16px;margin-bottom:18px;border-bottom:1px solid #1c1c1c}
  .hdr-bot .hb-r{text-align:right}
  .hdr-bot .hb-r div+div{margin-top:3px}
  .hdr-bot b{font-weight:700}
  .hdr-bot .inv-no{font-size:20px;font-weight:800;color:#111}
  .hdr-bot .inv-no b{font-size:11.5px;font-weight:700}
  /* Parties row */
  .pr{display:flex;justify-content:space-between;gap:24px;margin-bottom:6px;font-family:Arial,sans-serif}
  .pr .blk{font-size:12px}
  .pr .blk.r{text-align:right}
  .pr .l{font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${brand};margin-bottom:3px}
  .pr .nm{font-weight:700;font-size:13.5px;color:#111;font-family:Arial,Helvetica,sans-serif}
  .pr .sub{color:#555;font-size:11px;margin-top:2px;white-space:pre-line;line-height:1.45}
  .pr .kv{margin-top:6px}
  hr.sep{border:none;border-top:1px solid #1c1c1c;margin:16px 0}
  /* Billing / Shipping address table */
  .addr-table{display:flex;width:100%;border:1.3px solid #1c1c1c;margin:10px 0 16px;font-family:Arial,sans-serif}
  .addr-table.has-dispatch{margin-bottom:0}
  .addr-col{flex:1;min-width:0;width:50%}
  .addr-col+.addr-col{border-left:1.3px solid #1c1c1c}
  .addr-h{font-size:12px;font-weight:700;color:#111;padding:8px 12px;border-bottom:1.3px solid #1c1c1c}
  .addr-body{padding:10px 12px}
  .addr-ct{font-size:12px;color:#111;margin-bottom:2px}
  .addr-nm{font-size:12px;font-weight:700;color:#111;margin-bottom:4px}
  .addr-ln{font-size:12px;color:#111;line-height:1.6}
  .addr-body-split{display:flex}
  .addr-body-left{flex:1;min-width:0;padding:10px 12px}
  .addr-body-right{flex:1;min-width:0;padding:10px 12px;border-left:1.3px solid #1c1c1c}
  /* Dispatch details table -- separate row directly under Billing/Shipping,
     not squeezed into the Shipping Address column */
  .dispatch-table{display:flex;width:100%;border:1.3px solid #1c1c1c;border-top:none;margin:0 0 16px;font-family:Arial,sans-serif}
  .dispatch-cell{flex:1;min-width:0;padding:8px 12px}
  .dispatch-cell+.dispatch-cell{border-left:1.3px solid #1c1c1c}
  .dispatch-lbl{font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#555;margin-bottom:2px}
  .dispatch-val{font-size:12px;color:#111;font-weight:600}
  /* Table */
  table.it{width:100%;border-collapse:collapse;font-size:12px;font-family:Arial,sans-serif;margin-top:4px;border:1.3px solid #1c1c1c}
  table.it th{background:#fff;color:#111;padding:8px 9px;font-size:11.5px;font-weight:700;letter-spacing:0;text-transform:none;text-align:left;border:none;border-bottom:1.5px solid #1c1c1c;border-right:1px solid #1c1c1c;white-space:nowrap}
  table.it th.r{text-align:right}table.it th.c{text-align:center}
  table.it th:last-child{border-right:none}
  table.it td{padding:6px 9px;font-size:11.5px;line-height:1.35;border:none;border-bottom:1px solid #1c1c1c;border-right:1px solid #1c1c1c;vertical-align:top;word-break:break-word;overflow-wrap:anywhere}
  table.it td:last-child{border-right:none}
  table.it tr:last-child td{border-bottom:none}
  table.it td.nw{white-space:nowrap}
  .it .inm{font-weight:700;color:#1a1a1a;font-family:Arial,Helvetica,sans-serif;line-height:1.3}
  .it .ids{font-size:10px;color:#666;margin-top:1px;line-height:1.3}
  .it .r{text-align:right}.it .c{text-align:center}.it .b{font-weight:700}
  /* Bottom section: Bank / Amount-in-Words / Totals, Terms & Conditions, and
     the signature strip are all rows of ONE continuous bordered frame,
     matching the reference invoice (not separate boxes with gaps). */
  .bottom-frame{margin-top:16px;border:1.3px solid #1c1c1c;font-family:Arial,sans-serif}
  .bf-row{display:flex}
  .bf-row+.bf-row{border-top:1.3px solid #1c1c1c}
  .bf-cell{flex:1;min-width:0;padding:10px 14px;font-size:11.5px;color:#333;line-height:1.7}
  .bf-cell+.bf-cell{border-left:1.3px solid #1c1c1c}
  .bf-cell .h{font-weight:700;color:#111;font-size:12px;margin-bottom:5px}
  .bf-cell .val{font-weight:700;color:#111;font-size:12px;line-height:1.5}
  .bf-cell ul{margin:0;padding-left:18px}
  .bf-cell li{margin:0 0 2px}
  .bf-cell-totals{padding:0}
  .tot-figs{display:table;width:100%;border-collapse:collapse}
  .tot-figs .row{display:table-row}
  .tot-figs .row>span{display:table-cell;padding:6px 8px;font-size:11px;color:#333;border-bottom:1px solid #1c1c1c;vertical-align:middle;white-space:nowrap}
  .tot-figs .row>span:first-child{border-right:1px solid #1c1c1c}
  .tot-figs .row>span:last-child{text-align:right;color:#111;width:1%}
  .tot-figs .row:last-child>span{border-bottom:none}
  .tot-figs .row.grand>span{font-weight:700;color:#111;border-top:1.3px solid #1c1c1c;border-bottom:none;padding-top:9px}
  .bf-row-sign .bf-cell{display:flex;align-items:center}
  .sign-note-cell{flex:2.2;font-size:11px;color:#333}
  .sign-qr-cell{flex:0 0 130px;justify-content:center}
  .sign-qr-cell img{width:76px;height:76px;object-fit:contain}
  .sign-for-cell{flex:1.4;flex-direction:column;align-items:flex-end;text-align:right;font-size:11.5px;color:#333;gap:22px}
  .sign-for-cell b{font-weight:700;color:#111}
  /* HSN/SAC tax-rate summary table — intentionally content-width (not
     full-page), matching the reference invoice's compact tax summary. */
  .hsn-tbl{margin-top:14px;border-collapse:collapse;font-family:Arial,sans-serif;font-size:11px}
  .hsn-tbl th,.hsn-tbl td{border:1px solid #1c1c1c;padding:6px 10px}
  .hsn-tbl th{background:#fff;font-weight:700;color:#111;text-align:left}
  .hsn-tbl td.r{text-align:right}
  /* Keep table rows and bottom blocks intact across a page break instead of
     splitting mid-row (which otherwise duplicates a row's content across
     two pages when printed). */
  table.it tr{page-break-inside:avoid;break-inside:avoid}
  .addr-table,.bf-row,.hsn-tbl{page-break-inside:avoid;break-inside:avoid}
  @media print{.sheet{padding:0;max-width:none}@page{margin:22mm 15mm}}
</style></head><body><div class="sheet"><div class="frame">
  <div class="hdr">
    <div class="hdr-l">
      <div class="co">${_esc(doc.company || cfg.companyName || "")}</div>
      ${_state.companyAddress ? `<div class="addr">${_esc(_state.companyAddress)}${(_state.companyCity || _state.companyPincode) ? `,<br/>${_esc(_state.companyCity || "")}${_state.companyPincode ? ", " + _esc(_state.companyPincode) : ""}` : ""}</div>` : ""}
      ${(_state.companyPhone || _state.companyEmail) ? `<div class="contact">
        ${_state.companyPhone ? `<span class="ci"><svg viewBox="0 0 24 24" fill="${_esc(brand)}"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z"/></svg>${_esc(_state.companyPhone)}</span>` : ""}
        ${_state.companyEmail ? `<span class="ci"><svg viewBox="0 0 24 24" fill="${_esc(brand)}"><path d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm2.4.2 7.1 6.2a.8.8 0 0 0 1 0l7.1-6.2a.6.6 0 0 0-.4-1H4.8a.6.6 0 0 0-.4 1"/></svg>${_esc(_state.companyEmail)}</span>` : ""}
      </div>` : ""}
    </div>
    <div class="hdr-r">
      <div class="print-copy-text" style="font-size:11.5px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#111;text-align:right;margin-bottom:8px">${_esc(cfg.copyText || "")}</div>
      ${logo ? `<img src="${_esc(logo)}"/>` : ""}
    </div>
  </div>
  <div class="title">${_esc(cfg.title)}</div>
  <div class="hdr-bot" style="border-bottom:none">
    <div class="hb-l">${(doc.company_gstin || doc.gstin || _state.companyGstin) ? `<b>${_esc(cfg.taxIdLabel || "KRA PIN :")}</b> ${_esc(doc.company_gstin || doc.gstin || _state.companyGstin)}` : ""}</div>
    <div class="hb-r">
      <div class="inv-no"><b>${_esc(cfg.title ? cfg.title.charAt(0) + cfg.title.slice(1).toLowerCase() : "")} No. :</b> ${_esc(doc.name || "")}</div>
      <div><b>Date :</b> ${_esc(_fmtDocDate(docDate))}</div>
      ${doc.due_date ? `<div><b>Due Date :</b> ${_esc(_fmtDocDate(doc.due_date))}</div>` : ""}${cfg.po && doc.expected_delivery_date ? `<div><b>Delivery Date :</b> ${_esc(_fmtDocDate(doc.expected_delivery_date))}</div>` : ""}
    </div>
  </div>
  ${(() => {
    const billLines = _formatAddrLines(doc.billing_address || doc.address_display || "");
    const shipLines = _formatAddrLines(doc.shipping_address || doc.billing_address || doc.address_display || "");
    const gstin = doc.customer_gstin || doc.supplier_gstin || "";
    const phone = doc.customer_mobile || doc.contact_mobile || doc.contact_phone || "";
    const contactNm = doc.contact_display || "";
    const companyNm = doc.customer_company_name || doc.supplier_company_name || "";
    const dispatchedThrough = doc.dispatched_through || "";
    const destination = doc.destination || "";
    const hasDispatch = !!(dispatchedThrough || destination);
    const col = (label, lines) => {
      const bodyInner = `
          ${contactNm ? `<div class="addr-ct">${_esc(contactNm)}</div>` : ""}
          <div class="addr-nm">${_esc(party)}</div>
          ${companyNm ? `<div class="addr-nm">${_esc(companyNm)}</div>` : ""}
          ${lines.map(l => `<div class="addr-ln">${_esc(l)}</div>`).join("")}
          ${gstin ? `<div class="addr-ln"><b>${_esc(cfg.taxIdLabel || "KRA PIN :")}</b> ${_esc(gstin)}</div>` : ""}
          ${phone ? `<div class="addr-ln"><b>Phone :</b> ${_esc(phone)}</div>` : ""}`;
      return `
      <div class="addr-col">
        <div class="addr-h">${label}</div>
        <div class="addr-body">${bodyInner}</div>
      </div>`;
    };
    if (cfg.po) {
      // Purchase Order: Vendor (supplier) | Deliver To (the PO's own addresses; no India-style re-formatting)
      const lns = raw => String(raw || "").split("\n").map(s => s.trim()).filter(Boolean);
      const vendorLines = lns(doc.supplier_address);
      const delivery = lns(doc.delivery_address || doc.billing_address);
      const billing = (doc.delivery_address && doc.billing_address && doc.billing_address !== doc.delivery_address) ? lns(doc.billing_address) : [];
      return `<div class="addr-table">
      <div class="addr-col">
        <div class="addr-h">Vendor</div>
        <div class="addr-body">
          <div class="addr-nm">${_esc(party)}</div>
          ${vendorLines.map(l => `<div class="addr-ln">${_esc(l)}</div>`).join("")}
          ${gstin ? `<div class="addr-ln"><b>${_esc(cfg.taxIdLabel || "KRA PIN :")}</b> ${_esc(gstin)}</div>` : ""}
          ${phone ? `<div class="addr-ln"><b>Phone :</b> ${_esc(phone)}</div>` : ""}
        </div>
      </div>
      <div class="addr-col">
        <div class="addr-h">Deliver To</div>
        <div class="addr-body">
          ${delivery.length ? delivery.map(l => `<div class="addr-ln">${_esc(l)}</div>`).join("") : `<div class="addr-ln">&mdash;</div>`}
          ${billing.length ? `<div class="addr-ln" style="margin-top:6px"><b>Billing Address :</b></div>${billing.map(l => `<div class="addr-ln">${_esc(l)}</div>`).join("")}` : ""}
        </div>
      </div>
    </div>`;
    }
    if (!billLines.length && !shipLines.length && !gstin && !phone && !companyNm) return "";
    const dispatchTable = hasDispatch ? `
      <div class="dispatch-table">
        <div class="dispatch-cell">
          <div class="dispatch-lbl">Dispatched Through</div>
          <div class="dispatch-val">${dispatchedThrough ? _esc(dispatchedThrough) : "&mdash;"}</div>
        </div>
        <div class="dispatch-cell">
          <div class="dispatch-lbl">Destination</div>
          <div class="dispatch-val">${destination ? _esc(destination) : "&mdash;"}</div>
        </div>
      </div>` : "";
    return `<div class="addr-table${hasDispatch ? " has-dispatch" : ""}">${col("Billing Address", billLines)}${col("Shipping Address", shipLines)}</div>${dispatchTable}`;
  })()}
  <table class="it">
    <thead><tr>
      <th class="c" style="width:30px">No.</th><th>Item &amp; Description</th>
      ${cfg.includeHsn ? `<th class="c" style="width:78px">HSN / SAC</th>` : ""}
      <th class="r" style="width:44px">Qty</th><th class="c" style="width:50px">Unit</th>
      ${includeMrp ? `<th class="r" style="width:82px">MRP (${_esc(_currencySymbol(currency))})</th>` : ""}
      <th class="r" style="width:82px">Rate (${_esc(_currencySymbol(currency))})</th>
      ${cfg.includeDiscount ? `<th class="c" style="width:64px">Discount</th>` : ""}
      ${includeGst ? `<th class="r" style="width:88px">Taxable (${_esc(_currencySymbol(currency))})</th>` : ""}
      ${includeGst ? (hasIgst ? `<th class="c" style="width:58px">IGST</th>` : `<th class="c" style="width:58px">CGST</th><th class="c" style="width:58px">SGST</th>`) : ""}
      <th class="r" style="width:104px">Amount (${_esc(_currencySymbol(currency))})</th>
    </tr></thead>
    <tbody>${items || `<tr><td colspan="${colspan}" style="text-align:center;color:#999;padding:24px">No items</td></tr>`}</tbody>
  </table>
  ${(() => {
    const notesHtml = [
      (doc.terms || doc.customer_note) ? `<div><div class="h">${doc.customer_note ? "Note :" : "Terms &amp; Conditions :"}</div>${_bulletList(doc.customer_note || doc.terms)}</div>` : "",
      doc.remarks ? `<div style="margin-top:${(doc.terms || doc.customer_note) ? "10px" : "0"}"><div class="h">Remarks :</div>${_bulletList(doc.remarks)}</div>` : "",
    ].filter(Boolean).join("");
    const payLines = (doc.payment_lines || []).filter(Boolean);
    const payHtml = cfg.po ? (payLines.length ? `<div class="h">Payment Details :</div>${payLines.map(l => _esc(l)).join("<br/>")}` : "") : null;
    return `<div class="bottom-frame">
  <div class="bf-row">
    <div class="bf-cell">
      ${payHtml !== null ? payHtml : (_state.bankName || _state.bankAccountNo) ? `
        <div class="h">Bank Details :</div>
        ${_state.bankName ? `Bank Name: ${_esc(_state.bankName)}<br/>` : ""}
        ${_state.bankBranch ? `Branch: ${_esc(_state.bankBranch)}<br/>` : ""}
        ${_state.bankAccountNo ? `Account No.: ${_esc(_state.bankAccountNo)}<br/>` : ""}
        ${_state.bankIfsc ? `Bank Code: ${_esc(_state.bankIfsc)}` : ""}
      ` : ""}
    </div>
    <div class="bf-cell">
      <div class="h">${_esc(cfg.amountWordsLabel || "Total Invoice Amount in Words :")}</div>
      <div class="val">${_esc(amountWords)}</div>
    </div>
    <div class="bf-cell bf-cell-totals">
      <div class="tot-figs">
        <div class="row"><span>Total Amount before Tax (${_esc(_currencySymbol(currency))})</span><span>${_fmtNum(netTotal)}</span></div>
        ${taxRows}
        ${doc.discount_amount ? `<div class="row"><span style="color:#b91c1c">Discount (${_esc(_currencySymbol(currency))})</span><span style="color:#b91c1c">− ${_fmtNum(doc.discount_amount)}</span></div>` : ""}
        ${roundOff ? `<div class="row"><span>Round Off (${_esc(_currencySymbol(currency))})</span><span>${roundOff > 0 ? "" : "− "}${_fmtNum(Math.abs(roundOff))}</span></div>` : ""}
        <div class="row grand"><span>Grand Total (${_esc(_currencySymbol(currency))})</span><span>${_fmtNum(doc.grand_total)}</span></div>
      </div>
    </div>
  </div>
  ${notesHtml ? `<div class="bf-row"><div class="bf-cell">${notesHtml}</div></div>` : ""}
  <div class="bf-row bf-row-sign">
    <div class="bf-cell sign-note-cell">${cfg.footerNote ? _esc(cfg.footerNote) : "This is a computer-generated invoice. E. &amp; O. E."}</div>
    <div class="bf-cell sign-qr-cell">
  ${cfg.showQr === false ? "" : `<img src="${_logoSrc("/assets/psd_books/img/upi.png")}" alt="UPI QR Code"/>`}
</div>
    <div class="bf-cell sign-for-cell">
      <div>For, ${_esc(doc.company || cfg.companyName || "")}</div>
      <b>Authorised Signatory</b>
    </div>
  </div>
</div>`;
  })()}
  ${hsnRows.length ? `<table class="hsn-tbl"><thead><tr>
    <th>HSN/SAC Code</th><th class="r">Taxable (${_esc(_currencySymbol(currency))})</th>
    ${hasIgst ? `<th class="r">IGST %</th><th class="r">IGST (${_esc(_currencySymbol(currency))})</th>` : `<th class="r">CGST %</th><th class="r">CGST (${_esc(_currencySymbol(currency))})</th><th class="r">SGST %</th><th class="r">SGST (${_esc(_currencySymbol(currency))})</th>`}
  </tr></thead><tbody>
    ${hsnRows.map(r => `<tr><td>${_esc(r.hsn)}</td><td class="r">${_fmtNum(r.taxable)}</td>
      ${hasIgst ? `<td class="r">${r.igstRate.toFixed(2)}%</td><td class="r">${_fmtNum(r.igstAmt)}</td>` : `<td class="r">${r.cgstRate.toFixed(2)}%</td><td class="r">${_fmtNum(r.cgstAmt)}</td><td class="r">${r.sgstRate.toFixed(2)}%</td><td class="r">${_fmtNum(r.sgstAmt)}</td>`}
    </tr>`).join("")}
  </tbody></table>` : ""}
</div></div>
<script>
  (function () {
    function syncAddrWidth() {
      var tbl = document.querySelector('table.it');
      var addr = document.querySelector('.addr-table');
      if (!tbl || !addr) return;
      var w = tbl.getBoundingClientRect().width;
      if (w > 0) addr.style.width = w + 'px';
    }
    // Run after layout has settled (fonts/images can still shift table width
    // right after DOMContentLoaded, so re-check on load and once more on the
    // next frame).
    document.addEventListener('DOMContentLoaded', syncAddrWidth);
    window.addEventListener('load', function () {
      syncAddrWidth();
      requestAnimationFrame(syncAddrWidth);
    });
  })();
<\/script>
</body></html>`;
}

// ── TEMPLATE 2: "Modern" — rounded cards, soft, contemporary ──────────────────
function _renderModern(doc, cfg) {
  const brand    = _state.brandColor;
  const logo     = _logoSrc(_state.logo);
  const currency = doc.currency || "KES";
  const netTotal = doc.net_total != null ? doc.net_total
    : (doc.grand_total || 0) - (doc.total_taxes_and_charges ?? doc.total_tax ?? (doc.taxes || []).reduce((s, t) => s + (t.tax_amount || 0), 0));
  const party    = doc[cfg.partyField] || doc.customer || doc.supplier || "";
  const docDate  = doc.posting_date || doc.transaction_date || "";

  const items = (doc.items || []).map((it, i) => `
    <tr>
      <td><div class="inm">${_esc(it.item_name || it.item_code)}</div>
        ${it.description && it.description !== it.item_name ? `<div class="ids">${_esc(it.description)}</div>` : ""}
        ${cfg.includeHsn && (it.gst_hsn_code || it.hsn_code) ? `<div class="ihs">HSN ${_esc(it.gst_hsn_code || it.hsn_code)}</div>` : ""}
      </td>
      <td class="r">${Number(it.qty || 0)} <span class="mut">${_esc(it.uom || "")}</span></td>
      <td class="r">${_fmt(it.rate, currency)}</td>
      ${cfg.includeDiscount ? `<td class="c mut">${Number(it.discount_percentage || 0)}%</td>` : ""}
      <td class="r b">${_fmt(it.amount, currency)}</td>
    </tr>`).join("");
  const colspan = 4 + (cfg.includeDiscount ? 1 : 0);

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${_esc(cfg.title)} — ${_esc(doc.name)}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',system-ui,-apple-system,sans-serif;color:#1f2937;background:#f1f5f9;font-size:12.5px;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .page{max-width:900px;margin:0 auto;padding:28px}
  /* Hero card */
  .hero{background:${brand};color:#fff;border-radius:18px;padding:26px 30px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 10px 30px ${brand}40}
  .hero .co{font-size:21px;font-weight:800;letter-spacing:-.01em}
  .hero img{max-height:46px;max-width:130px;object-fit:contain;background:#fff;border-radius:10px;padding:6px;margin-bottom:10px;display:block}
  .hero .gst{font-size:10.5px;opacity:.85;margin-top:4px}
  .hero .rt{text-align:right}
  .hero .badge{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;opacity:.85}
  .hero .num{font-size:26px;font-weight:800;margin-top:2px;line-height:1}
  .hero .dt{font-size:11px;opacity:.85;margin-top:6px}
  /* Info chips */
  .chips{display:flex;flex-wrap:wrap;gap:10px;margin:20px 0}
  .chip{background:#fff;border-radius:12px;padding:10px 16px;box-shadow:0 2px 8px rgba(15,23,42,.06);font-size:11.5px}
  .chip .l{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8}
  .chip .v{font-weight:700;color:#0f172a;margin-top:2px}
  /* Party cards */
  .cards{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px}
  .card{background:#fff;border-radius:14px;padding:16px 18px;box-shadow:0 2px 8px rgba(15,23,42,.06)}
  .card .l{font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:${brand};margin-bottom:5px}
  .card .nm{font-size:14px;font-weight:800;color:#0f172a}
  .card .sub{font-size:11px;color:#64748b;margin-top:3px;white-space:pre-line;line-height:1.45}
  /* Items card */
  .tbl-card{background:#fff;border-radius:14px;padding:8px 10px;box-shadow:0 2px 8px rgba(15,23,42,.06)}
  table{width:100%;border-collapse:collapse;font-size:12.5px}
  thead th{text-align:left;padding:12px 12px;font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;border-bottom:2px solid #eef2f7}
  thead th.r{text-align:right}thead th.c{text-align:center}
  tbody td{padding:13px 12px;border-bottom:1px solid #f4f6f9;vertical-align:top;word-break:break-word;overflow-wrap:anywhere}
  tbody tr:last-child td{border-bottom:none}
  .inm{font-weight:700;color:#0f172a}.ids{font-size:10.5px;color:#64748b;margin-top:2px}.ihs{font-size:10px;color:#94a3b8;margin-top:2px}
  .r{text-align:right}.c{text-align:center}.b{font-weight:800}.mut{color:#94a3b8;font-size:10.5px}
  /* Totals */
  .tw{display:flex;justify-content:flex-end;margin-top:16px}
  .tt{width:300px;background:#fff;border-radius:14px;padding:8px 18px;box-shadow:0 2px 8px rgba(15,23,42,.06)}
  .tt .row{display:flex;justify-content:space-between;padding:8px 0;font-size:12.5px;color:#64748b;border-bottom:1px solid #f4f6f9}
  .tt .row span:last-child{color:#0f172a;font-weight:600}
  .tt .grand{display:flex;justify-content:space-between;align-items:center;margin:10px -18px -8px;padding:14px 18px;background:${brand};color:#fff;border-radius:0 0 14px 14px;font-weight:800;font-size:15px}
  .notes{background:#fff;border-radius:14px;padding:14px 18px;margin-top:16px;box-shadow:0 2px 8px rgba(15,23,42,.06);font-size:11.5px;color:#374151;line-height:1.6}
  .notes .h{font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:${brand};margin-bottom:4px}
  .sig{display:flex;gap:18px;margin-top:26px}
  .sig div{flex:1;border-top:1.5px solid #cbd5e1;padding-top:7px;font-size:10px;color:#94a3b8;text-align:center}
  .ft{text-align:center;margin-top:18px;font-size:10px;color:#a8b3c1}
  @media print{body{background:#fff}.page{padding:0;max-width:none}.hero{box-shadow:none}.chip,.card,.tbl-card,.tt,.notes{box-shadow:none;border:1px solid #eef2f7}}
</style></head><body><div class="page">
  <div class="hero">
    <div>
      ${logo ? `<img src="${_esc(logo)}"/>` : ""}
      <div class="co">${_esc(doc.company || cfg.companyName || "")}</div>
      ${doc.company_gstin || doc.gstin ? `<div class="gst">KRA PIN: ${_esc(doc.company_gstin || doc.gstin)}</div>` : ""}
    </div>
    <div class="rt">
      <div class="print-copy-text" style="font-size:11px;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#fff;text-align:right;margin-bottom:6px">${_esc(cfg.copyText || "")}</div>
      <div class="badge">${_esc(cfg.title)}</div>
      <div class="num">${_esc(doc.name || "")}</div>
      <div class="dt">${_esc(docDate)}${doc.status ? " · " + _esc(doc.status) : ""}</div>
    </div>
  </div>
  <div class="chips">
    <div class="chip"><div class="l">Date</div><div class="v">${_esc(docDate)}</div></div>
    ${doc.due_date ? `<div class="chip"><div class="l">Due Date</div><div class="v">${_esc(doc.due_date)}</div></div>` : ""}
    ${doc.valid_till ? `<div class="chip"><div class="l">Valid Till</div><div class="v">${_esc(doc.valid_till)}</div></div>` : ""}
    ${doc.delivery_date ? `<div class="chip"><div class="l">Delivery</div><div class="v">${_esc(doc.delivery_date)}</div></div>` : ""}
    ${doc.po_no ? `<div class="chip"><div class="l">PO Number</div><div class="v">${_esc(doc.po_no)}</div></div>` : ""}
    ${doc.place_of_supply ? `<div class="chip"><div class="l">Place of Supply</div><div class="v">${_esc(doc.place_of_supply)}</div></div>` : ""}
  </div>
  <div class="cards">
    <div class="card"><div class="l">From</div><div class="nm">${_esc(doc.company || cfg.companyName || "")}</div>${doc.company_gstin || doc.gstin ? `<div class="sub">KRA PIN: ${_esc(doc.company_gstin || doc.gstin)}</div>` : ""}</div>
    <div class="card"><div class="l">${_esc(cfg.partyLabel)}</div><div class="nm">${_esc(party)}</div>${doc.address_display ? `<div class="sub">${_esc(doc.address_display)}</div>` : ""}${doc.customer_gstin || doc.supplier_gstin ? `<div class="sub">KRA PIN: ${_esc(doc.customer_gstin || doc.supplier_gstin)}</div>` : ""}</div>
  </div>
  <div class="tbl-card"><table>
    <thead><tr>
      <th>Item</th><th class="r" style="width:96px">Qty</th><th class="r" style="width:110px">Rate</th>
      ${cfg.includeDiscount ? `<th class="c" style="width:52px">Disc</th>` : ""}
      <th class="r" style="width:120px">Amount</th>
    </tr></thead>
    <tbody>${items || `<tr><td colspan="${colspan}" style="text-align:center;color:#94a3b8;padding:28px">No items</td></tr>`}</tbody>
  </table></div>
  <div class="tw"><div class="tt">
    <div class="row"><span>Subtotal</span><span>${_fmt(netTotal, currency)}</span></div>
    ${(doc.taxes || []).map(t => `<div class="row"><span>${_esc(t.description || t.account_head)}</span><span>${_fmt(t.tax_amount || 0, currency)}</span></div>`).join("")}
    ${doc.discount_amount ? `<div class="row"><span style="color:#dc2626">Discount</span><span style="color:#dc2626">− ${_fmt(doc.discount_amount, currency)}</span></div>` : ""}
    <div class="grand"><span>Grand Total</span><span>${_fmt(doc.grand_total, currency)}</span></div>
  </div></div>
  ${doc.terms || doc.customer_note ? `<div class="notes"><div class="h">${doc.customer_note ? "Note" : "Terms & Conditions"}</div>${_esc(doc.customer_note || doc.terms)}</div>` : ""}
  ${doc.remarks ? `<div class="notes"><div class="h">Remarks</div>${_esc(doc.remarks)}</div>` : ""}
  <div class="sig"><div>Prepared By</div><div>Authorised Signatory</div><div>Receiver's Signature</div></div>
  <div class="ft">${_esc(doc.name)} · Printed ${_today()}</div>
</div></body></html>`;
}

// ── TEMPLATE 3: "Minimal" — Swiss, monochrome, single accent line ─────────────
function _renderMinimal(doc, cfg) {
  const brand    = _state.brandColor;
  const logo     = _logoSrc(_state.logo);
  const currency = doc.currency || "KES";
  const netTotal = doc.net_total != null ? doc.net_total
    : (doc.grand_total || 0) - (doc.total_taxes_and_charges ?? doc.total_tax ?? (doc.taxes || []).reduce((s, t) => s + (t.tax_amount || 0), 0));
  const party    = doc[cfg.partyField] || doc.customer || doc.supplier || "";
  const docDate  = doc.posting_date || doc.transaction_date || "";

  const items = (doc.items || []).map((it, i) => `
    <tr>
      <td class="n">${String(i + 1).padStart(2, "0")}</td>
      <td>
        <span class="inm">${_esc(it.item_name || it.item_code)}</span>
        ${it.description && it.description !== it.item_name ? `<div class="ids">${_esc(it.description)}</div>` : ""}
      </td>
      ${cfg.includeHsn ? `<td class="c mono">${_esc(it.gst_hsn_code || it.hsn_code || "—")}</td>` : ""}
      <td class="r mono">${Number(it.qty || 0)} ${_esc(it.uom || "")}</td>
      <td class="r mono">${_fmt(it.rate, currency)}</td>
      ${cfg.includeDiscount ? `<td class="r mono">${Number(it.discount_percentage || 0) ? Number(it.discount_percentage) + "%" : "—"}</td>` : ""}
      <td class="r mono b">${_fmt(it.amount, currency)}</td>
    </tr>`).join("");
  const colspan = 5 + (cfg.includeHsn ? 1 : 0) + (cfg.includeDiscount ? 1 : 0);

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${_esc(cfg.title)} — ${_esc(doc.name)}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter','Helvetica Neue',Arial,sans-serif;color:#111;background:#fff;font-size:12px;line-height:1.6;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .mono{font-variant-numeric:tabular-nums;font-feature-settings:"tnum"}
  .page{max-width:780px;margin:0 auto;padding:64px 60px}
  .accent{height:4px;width:48px;background:${brand};margin-bottom:28px}
  /* Header */
  .hdr{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:44px}
  .hdr .co{font-size:18px;font-weight:700;letter-spacing:-.01em;display:flex;align-items:center;gap:10px}
  .hdr .co img{max-height:30px;max-width:90px;object-fit:contain}
  .hdr .gst{font-size:10px;color:#999;margin-top:4px;font-weight:400}
  .hdr .rt{text-align:right}
  .hdr .t{font-size:10px;font-weight:600;letter-spacing:.34em;text-transform:uppercase;color:#999}
  .hdr .num{font-size:17px;font-weight:700;margin-top:4px}
  /* Meta grid */
  .meta{display:grid;grid-template-columns:repeat(4,1fr);gap:18px 24px;margin-bottom:38px}
  .meta .m .l{font-size:8.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#bbb}
  .meta .m .v{font-size:12px;font-weight:600;color:#111;margin-top:3px}
  .meta .m .v.sub{font-weight:400;color:#555;font-size:11px;white-space:pre-line;line-height:1.4}
  /* Table */
  table{width:100%;border-collapse:collapse;font-size:12px}
  thead th{text-align:left;padding:0 4px 10px;font-size:8.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#bbb;border-bottom:1px solid #111}
  thead th.r{text-align:right}thead th.c{text-align:center}
  tbody td{padding:13px 4px;border-bottom:1px solid #f0f0f0;vertical-align:top;word-break:break-word;overflow-wrap:anywhere}
  tbody tr:last-child td{border-bottom:none}
  .n{color:#ccc;width:30px;font-variant-numeric:tabular-nums}
  .inm{font-weight:600}.ids{font-size:10.5px;color:#888;margin-top:2px}
  .r{text-align:right}.c{text-align:center}.b{font-weight:700}
  /* Totals */
  .tw{display:flex;justify-content:flex-end;margin-top:8px}
  .tt{width:280px}
  .tt .row{display:flex;justify-content:space-between;padding:7px 0;font-size:12px;color:#777}
  .tt .row span:last-child{color:#111}
  .tt .grand{display:flex;justify-content:space-between;align-items:baseline;margin-top:10px;padding-top:14px;border-top:3px solid ${brand};font-size:18px;font-weight:700;color:#111}
  .tt .grand .amt{color:${brand}}
  /* Notes */
  .notes{margin-top:40px;display:grid;grid-template-columns:1fr 1fr;gap:28px}
  .notes .h{font-size:8.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#bbb;margin-bottom:6px}
  .notes .bd{font-size:11.5px;color:#444;line-height:1.6}
  .sig{display:flex;gap:30px;margin-top:54px}
  .sig div{flex:1;border-top:1px solid #ccc;padding-top:6px;font-size:9.5px;color:#aaa;letter-spacing:.04em}
  .ft{margin-top:34px;font-size:9px;color:#ccc;letter-spacing:.06em;text-transform:uppercase}
  @media print{.page{padding:44px 40px;max-width:none}}
</style></head><body><div class="page">
  <div class="accent"></div>
  <div class="hdr">
    <div>
      <div class="co">${logo ? `<img src="${_esc(logo)}"/>` : ""}${_esc(doc.company || cfg.companyName || "")}</div>
      ${doc.company_gstin || doc.gstin ? `<div class="gst">KRA PIN ${_esc(doc.company_gstin || doc.gstin)}</div>` : ""}
    </div>
    <div class="rt"><div class="print-copy-text" style="font-size:10px;font-weight:700;color:#111;text-transform:uppercase;margin-bottom:6px;letter-spacing:.05em;text-align:right">${_esc(cfg.copyText || "")}</div><div class="t">${_esc(cfg.title)}</div><div class="num mono">${_esc(doc.name || "")}</div></div>
  </div>
  <div class="meta">
    <div class="m" style="grid-column:span 2"><div class="l">${_esc(cfg.partyLabel)}</div><div class="v">${_esc(party)}</div>${doc.address_display ? `<div class="v sub">${_esc(doc.address_display)}</div>` : ""}${doc.customer_gstin || doc.supplier_gstin ? `<div class="v sub">KRA PIN ${_esc(doc.customer_gstin || doc.supplier_gstin)}</div>` : ""}</div>
    <div class="m"><div class="l">Date</div><div class="v mono">${_esc(docDate)}</div></div>
    ${doc.due_date ? `<div class="m"><div class="l">Due</div><div class="v mono">${_esc(doc.due_date)}</div></div>` : (doc.valid_till ? `<div class="m"><div class="l">Valid Till</div><div class="v mono">${_esc(doc.valid_till)}</div></div>` : "<div class='m'></div>")}
    ${doc.po_no ? `<div class="m"><div class="l">PO Number</div><div class="v mono">${_esc(doc.po_no)}</div></div>` : ""}
    ${doc.place_of_supply ? `<div class="m"><div class="l">Place of Supply</div><div class="v">${_esc(doc.place_of_supply)}</div></div>` : ""}
  </div>
  <table>
    <thead><tr>
      <th style="width:30px">No</th><th>Item</th>
      ${cfg.includeHsn ? `<th class="c" style="width:70px">HSN/SAC</th>` : ""}
      <th class="r" style="width:96px">Qty</th><th class="r" style="width:100px">Rate</th>
      ${cfg.includeDiscount ? `<th class="r" style="width:52px">Disc</th>` : ""}
      <th class="r" style="width:110px">Amount</th>
    </tr></thead>
    <tbody>${items || `<tr><td colspan="${colspan}" style="text-align:center;color:#bbb;padding:24px">No items</td></tr>`}</tbody>
  </table>
  <div class="tw"><div class="tt">
    <div class="row"><span>Subtotal</span><span class="mono">${_fmt(netTotal, currency)}</span></div>
    ${(doc.taxes || []).map(t => `<div class="row"><span>${_esc(t.description || t.account_head)}</span><span class="mono">${_fmt(t.tax_amount || 0, currency)}</span></div>`).join("")}
    ${doc.discount_amount ? `<div class="row"><span style="color:#b91c1c">Discount</span><span class="mono" style="color:#b91c1c">− ${_fmt(doc.discount_amount, currency)}</span></div>` : ""}
    <div class="grand"><span>Total</span><span class="amt mono">${_fmt(doc.grand_total, currency)}</span></div>
  </div></div>
  ${(doc.remarks || doc.terms || doc.customer_note) ? `<div class="notes">
    ${doc.remarks ? `<div><div class="h">Remarks</div><div class="bd">${_esc(doc.remarks)}</div></div>` : "<div></div>"}
    ${doc.terms || doc.customer_note ? `<div><div class="h">${doc.customer_note ? "Note" : "Terms"}</div><div class="bd">${_esc(doc.customer_note || doc.terms)}</div></div>` : ""}
  </div>` : ""}
  <div class="sig"><div>Prepared By</div><div>Authorised Signatory</div><div>Receiver's Signature</div></div>
  <div class="ft">${_esc(doc.company || "")} — ${_esc(doc.name)} — Printed ${_today()}</div>
</div></body></html>`;
}


// ── Sava Builders pre-printed Purchase Order sheet (matches the paper LPO form) ──
// Used for Purchase Orders only (cfg.savaPaper). Same fields as the paper: M/s box, P.O No./Date box,
// Sr. No | Description | Qty | Unit | Rate | Disc. % | Amount, Amount in Words, Special Instructions,
// Payment Details, Total Amount, the three footer notes, Prepared By / Authorized by.
// Sava Builders logo with the "Constructive Ideas..." tagline (transparent PNG), always used on the Sava LPO paper.
const _SAVA_LOGO = "data:image/png;base64,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";

function _renderSavaPO(doc, cfg) {
  const currency = cfg.currency || doc.currency || "KES";
  const fmt = (v) => _fmtNumFor(v, currency);
  const docDate = doc.transaction_date || doc.posting_date || "";
  const lns = (t) => String(t || "").split("\n").map(x => x.trim()).filter(Boolean);
  const msLines = [doc.supplier_name || doc.supplier || "", ...lns(doc.supplier_address)].filter(Boolean);
  const hasDisc = (doc.items || []).some(it => Number(it.discount_percentage || 0) > 0);
  const taxRateOf = (it) => {
    const taxes = doc.taxes || [];
    const t = it.tax_code ? taxes.find(x => x.description === it.tax_code || x.account_head === it.tax_code) : null;
    if (t && t.rate != null) return Number(t.rate);
    // LPOs created from a comparison name the tax line "VAT 16%", not the item's template:
    // when the PO carries a single tax rate, every line takes it.
    const rates = [...new Set(taxes.map(x => Number(x.rate || 0)).filter(r => r > 0))];
    return rates.length === 1 ? rates[0] : null;
  };
  const nCols = 7 + (hasDisc ? 1 : 0);
  const rows = (doc.items || []).map((it, i) => `
    <tr>
      <td class="c">${i + 1}</td>
      <td>${_esc(it.item_name || it.item_code)}${it.description && it.description !== it.item_name ? `<div class="ds">${_esc(it.description)}</div>` : ""}</td>
      <td class="r">${Number(it.qty || 0)}</td>
      <td class="c">${_esc(it.uom || "Nos")}</td>
      <td class="r">${fmt(it.rate)}</td>
      ${hasDisc ? `<td class="c">${Number(it.discount_percentage || 0) ? Number(it.discount_percentage).toFixed(2) : ""}</td>` : ""}
      <td class="c">${taxRateOf(it) != null ? taxRateOf(it) + "%" : ""}</td>
      <td class="r">${fmt(it.amount)}</td>
    </tr>`).join("");
  const blanks = 0; // table grows with the item count (was padded to 12 rows)
  const filler = Array.from({ length: blanks }, () => `<tr class="bl">${"<td></td>".repeat(nCols)}</tr>`).join("");
  const words = doc.in_words || _kesWords(doc.grand_total);
  const special = lns(doc.terms).join("; ");
  const payment = (doc.payment_lines || []).filter(Boolean).join("; ");
  const preparedBy = doc.prepared_by_name || doc.owner_name || doc.owner || "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${_esc(cfg.title)} — ${_esc(doc.name)}</title>
<style>
  @page{size:A4 landscape;margin:8mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Times New Roman",Georgia,serif;color:#111;background:#fff;font-size:13px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .sheet{max-width:1040px;margin:0 auto;padding:18px 24px}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
  .lg{width:210px;min-height:120px;display:flex;align-items:flex-start}
  .lg img{max-height:135px;max-width:200px;width:auto;height:auto;object-fit:contain}
  .ttl{flex:1;text-align:center;font-size:24px;font-weight:700;letter-spacing:.03em;padding-top:56px}
  .co{width:420px;text-align:left}
  .co .n{font-family:Arial,Helvetica,sans-serif;font-size:30px;font-weight:800;color:#d32f2f;line-height:1.05;letter-spacing:-.01em}
  .co .a{font-size:11px;line-height:1.4;margin-top:4px}
  .co .v{font-size:13px;font-weight:700;margin-top:6px}
  .mid{display:flex;justify-content:space-between;gap:24px;margin-top:6px}
  .ms{flex:1;max-width:560px;min-height:128px;border:1.6px solid #111;border-radius:0 0 22px 0;border-top-left-radius:0;padding:8px 12px}
  .ms .l{font-weight:700;font-size:14px}
  .ms .t{margin-top:4px;line-height:1.45}
  .ms .t b{font-size:14px}
  .pn{width:470px;border:1.6px solid #111;border-radius:16px 16px 16px 16px;overflow:hidden;align-self:flex-start}
  .pn .r{display:flex;min-height:44px}
  .pn .r+.r{border-top:1.6px solid #111}
  .pn .k{width:36%;border-right:1.6px solid #111;padding:10px 14px;font-weight:700;font-size:14px}
  .pn .v{flex:1;padding:10px 14px;font-size:14px}
  .sup{font-weight:700;font-size:13px;margin:10px 0 4px}
  table.it{width:100%;border-collapse:collapse;table-layout:fixed;border:1.6px solid #111}
  table.it th{border:1.6px solid #111;padding:6px 6px;font-size:13px;font-weight:700;text-align:center}
  table.it td{border-left:1.6px solid #111;border-right:1.6px solid #111;padding:4px 7px;vertical-align:top;font-size:12.5px;height:26px}
  table.it .c{text-align:center}table.it .r{text-align:right}
  table.it .ds{font-size:11px;color:#444}
  table.it tr.bl td{height:26px}
  table.it tfoot td{border:1.6px solid #111;height:1px;padding:0}
  .w1{width:6%}.w2{width:36%}.w3{width:8%}.w4{width:8%}.w5{width:12%}.w6{width:8%}.w8{width:8%}.w7{width:14%}table.it.nd .w2{width:44%}
  .ft{display:flex;gap:0;align-items:flex-start;margin-top:0}
  .ft .lines{flex:1;padding-top:14px}
  .ft .ln{display:flex;gap:6px;align-items:baseline;margin-bottom:10px;font-size:13.5px}
  .ft .ln .lb{white-space:nowrap}
  .ft .ln .dl{flex:1;border-bottom:1.5px dotted #111;min-height:16px;padding:0 4px;font-size:12.5px}
  .tot{display:flex;align-items:stretch}
  .tot .tl{align-self:center;padding:0 10px;font-size:14px;white-space:nowrap;margin-top:14px}
  .tot .tb{width:13%;min-width:130px;border:1.6px solid #111;border-top:none;text-align:right;padding:8px 8px;font-weight:700;font-size:14px;min-height:56px}
  .notes{display:flex;justify-content:space-between;gap:12px;font-size:13.5px;margin-top:8px}
  .sig{display:flex;justify-content:space-between;gap:40px;margin-top:22px;font-size:14px}
  .sig .s{flex:1;display:flex;gap:8px;align-items:flex-end}
  .sig .s .u{flex:1;border-bottom:1.5px solid #111;min-height:20px;padding:0 4px}
  .cp{position:absolute;top:6px;right:24px;font-size:11px;font-weight:700;color:#666}
  @media print{.sheet{padding:0}}
</style></head><body><div class="sheet" style="position:relative">
  <span class="cp print-copy-text">${_esc(cfg.copyText || "")}</span>
  <div class="mid">
    <div class="ms"><div class="l">M/s</div><div class="t">${msLines.length ? `<b>${_esc(msLines[0])}</b>${msLines.slice(1).map(l => `<br/>${_esc(l)}`).join("")}` : ""}</div></div>
    <div class="pn">
      <div class="r"><div class="k">P.O No.</div><div class="v">${_esc(doc.name || "")}</div></div>
      <div class="r"><div class="k">DATE</div><div class="v">${_esc(_fmtDocDate(docDate))}</div></div>
    </div>
  </div>
  <div class="sup">PLEASE SUPPLY THE FOLLOWING GOODS:-</div>
  <table class="it${hasDisc ? "" : " nd"}">
    <thead><tr><th class="w1">Sr. No</th><th class="w2">Description</th><th class="w3">Qty</th><th class="w4">Unit</th><th class="w5">Rate</th>${hasDisc ? `<th class="w6">Disc. %</th>` : ""}<th class="w8">Tax</th><th class="w7">Amount</th></tr></thead>
    <tbody>${rows}${filler}</tbody>
    <tfoot><tr><td colspan="${nCols}"></td></tr></tfoot>
  </table>
  <div class="ft">
    <div class="lines">
      <div class="ln"><span class="lb">Amount in Words:</span><span class="dl">${_esc(words)}</span></div>
      <div class="ln"><span class="lb">Special Instructions:</span><span class="dl">${_esc(special)}</span></div>
      <div class="ln"><span class="lb">Payment Details:</span><span class="dl">${_esc(payment)}</span></div>
    </div>
    <div class="tot"><span class="tl">Total Amount</span><div class="tb">${fmt(doc.grand_total)}</div></div>
  </div>
  <div class="notes"><span>Please quote P.O No. on all Invoices</span><span>This P.O is issued without any alteration</span><span>The P.O amount is inclusive of VAT.</span></div>
  <div class="sig">
    <div class="s"><span>Prepared By:</span><span class="u">${_esc(preparedBy)}</span></div>
    <div class="s"><span>Authorized by:</span><span class="u"></span></div>
  </div>
</div></body></html>`;
}

// Delivery Note on the Sava Builders pre-printed sheet (cfg.savaDN): address box, D.N No./Date box,
// Sr. No | Item Description | Qty | Intended Use, then Prepared By / Delivered By / Received By blocks.
function _renderSavaDN(doc, cfg) {
  const lns = (t) => String(t || "").split("\n").map(x => x.trim()).filter(Boolean);
  const toLines = [doc.customer_name || doc.customer || "", ...lns(doc.shipping_address)].filter(Boolean);
  const rows = (doc.items || []).map((it, i) => `
    <tr>
      <td class="c">${i + 1}</td>
      <td>${_esc(it.item_name || it.item_code)}${it.description && it.description !== it.item_name ? `<div class="ds">${_esc(it.description)}</div>` : ""}</td>
      <td class="c">${Number(it.qty || 0)} ${_esc(it.uom || "")}</td>
      <td>${_esc(it.intended_use || "")}</td>
    </tr>`).join("");
  const blk = (title, fields) => `<div class="bk"><div class="bt">${title}</div>${fields.map(([l, v]) =>
    `<div class="ln"><span class="lb">${l}</span><span class="dl">${_esc(v || "")}</span></div>`).join("")}</div>`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${_esc(cfg.title)} — ${_esc(doc.name)}</title>
<style>
  @page{size:A4 landscape;margin:8mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Times New Roman",Georgia,serif;color:#111;background:#fff;font-size:13px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .sheet{max-width:1040px;margin:0 auto;padding:18px 24px}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
  .lg{width:210px;min-height:120px;display:flex;align-items:flex-start}
  .lg img{max-height:135px;max-width:200px;width:auto;height:auto;object-fit:contain}
  .ttl{flex:1;text-align:center;font-size:24px;font-weight:700;letter-spacing:.03em;padding-top:56px}
  .co{width:420px;text-align:left}
  .co .n{font-family:Arial,Helvetica,sans-serif;font-size:30px;font-weight:800;color:#d32f2f;line-height:1.05;letter-spacing:-.01em}
  .co .a{font-size:11px;line-height:1.4;margin-top:4px}
  .mid{display:flex;justify-content:space-between;gap:24px;margin-top:6px}
  .ms{flex:1;max-width:560px;min-height:110px;border:1.6px solid #111;border-radius:14px;padding:8px 12px;line-height:1.45}
  .ms b{font-size:14px}
  .pn{width:470px;border:1.6px solid #111;border-radius:16px;overflow:hidden;align-self:flex-start}
  .pn .r{display:flex;min-height:44px}
  .pn .r+.r{border-top:1.6px solid #111}
  .pn .k{width:36%;border-right:1.6px solid #111;padding:10px 14px;font-weight:700;font-size:14px}
  .pn .v{flex:1;padding:10px 14px;font-size:14px}
  .sup{font-size:13.5px;margin:12px 0 4px}
  table.it{width:100%;border-collapse:collapse;table-layout:fixed;border:1.6px solid #111}
  table.it th{border:1.6px solid #111;padding:6px;font-size:13px;font-weight:700;text-align:center}
  table.it td{border-left:1.6px solid #111;border-right:1.6px solid #111;padding:4px 7px;vertical-align:top;font-size:12.5px;height:26px}
  table.it .c{text-align:center}
  table.it .ds{font-size:11px;color:#444}
  table.it tfoot td{border:1.6px solid #111;height:1px;padding:0}
  .w1{width:8%}.w2{width:48%}.w3{width:10%}.w4{width:34%}
  .sig{display:flex;gap:36px;margin-top:22px}
  .bk{flex:1}
  .bt{font-weight:700;font-size:14.5px;margin-bottom:8px}
  .ln{display:flex;gap:6px;align-items:baseline;margin-bottom:9px;font-size:13.5px}
  .ln .lb{white-space:nowrap}
  .ln .dl{flex:1;border-bottom:1.5px dotted #111;min-height:16px;padding:0 4px;font-size:12.5px}
  .cp{position:absolute;top:6px;right:24px;font-size:11px;font-weight:700;color:#666}
  @media print{.sheet{padding:0}}
</style></head><body><div class="sheet" style="position:relative">
  <span class="cp print-copy-text">${_esc(cfg.copyText || "")}</span>
  <div class="mid">
    <div class="ms">${toLines.length ? `<b>${_esc(toLines[0])}</b>${toLines.slice(1).map(l => `<br/>${_esc(l)}`).join("")}` : ""}</div>
    <div class="pn">
      <div class="r"><div class="k">D.N No.</div><div class="v">${_esc(doc.name || "")}</div></div>
      <div class="r"><div class="k">DATE</div><div class="v">${_esc(_fmtDocDate(doc.posting_date || ""))}</div></div>
    </div>
  </div>
  <div class="sup">PLEASE RECEIVE THE FOLLOWING GOODS IN GOOD CONDITION &amp; ORDER:-</div>
  <table class="it">
    <thead><tr><th class="w1">Sr. No</th><th class="w2">Item Description</th><th class="w3">Qty</th><th class="w4">Intended Use</th></tr></thead>
    <tbody>${rows}</tbody>
    <tfoot><tr><td colspan="4"></td></tr></tfoot>
  </table>
  <div class="sig">
    ${blk("Prepared By:", [["Name:", doc.prepared_by_name || doc.owner_name || ""], ["I.D. No.", ""], ["Time:", doc.posting_time ? String(doc.posting_time).slice(0, 5) : ""], ["Signature:", ""]])}
    ${blk("Delivered By:", [["Name:", doc.driver_name], ["I.D. No.", doc.driver_id], ["Truck No.", doc.truck_no || doc.vehicle_no], ["Signature:", ""]])}
    ${blk("Received By:", [["Name:", doc.received_by_name], ["I.D. No.", doc.received_by_id], ["Time:", ""], ["Signature:", ""]])}
  </div>
</div></body></html>`;
}

// Material Requisition on the Sava Builders pre-printed requisition sheet (cfg.savaMR): No. / Date / Project,
// S.No / Item / Intended Use / Qty table (one row per item), Requested / Required / Approved By. Portrait A4.
const _MR_MIN_ROWS = 0;   // blank ruled rows to pad the sheet (0 = only the items; was 22)
function _renderSavaMR(doc, cfg) {
  const items = doc.items || [];
  const qtyTxt = (it) => {
    const q = Number(it.required_qty ?? it.qty ?? 0);
    return `${Number.isInteger(q) ? q : q.toFixed(3).replace(/0+$/, "")}${it.uom ? " " + it.uom : ""}`;
  };
  const filled = items.map((it, i) => `
    <tr><td class="c">${i + 1}</td><td>${_esc(it.item_name || it.item_code || "")}</td><td>${_esc(it.intended_use || "")}</td><td class="c">${_esc(qtyTxt(it))}</td></tr>`).join("");
  const blanks = Array.from({ length: Math.max(0, _MR_MIN_ROWS - items.length) })
    .map(() => `<tr><td class="c">&nbsp;</td><td></td><td></td><td></td></tr>`).join("");
  const dateTxt = _fmtDocDate(String(doc.creation || doc.posting_date || "").slice(0, 10));
  const reqBy = _fmtDocDate(doc.posting_date || "");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${_esc(cfg.title)} — ${_esc(doc.name)}</title>
<style>
  @page{size:A4 portrait;margin:10mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Times New Roman",Georgia,serif;color:#111;background:#fff;font-size:13px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .sheet{max-width:760px;margin:0 auto;padding:10px 6px}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
  .lg{width:190px;min-height:110px;display:flex;align-items:flex-start}
  .lg img{max-height:125px;max-width:185px;width:auto;height:auto;object-fit:contain}
  .co{width:400px;text-align:right}
  .co .n{font-family:Arial,Helvetica,sans-serif;font-size:32px;font-weight:800;color:#111;line-height:1.05;letter-spacing:-.01em}
  .co .a{font-size:10.5px;line-height:1.4;margin-top:4px}
  .nr{display:flex;justify-content:flex-end;align-items:baseline;gap:6px;margin-top:10px}
  .nr b{font-size:13px}.nr .no{font-family:Arial,Helvetica,sans-serif;font-size:22px;color:#7a1a8a;letter-spacing:.04em}
  .ttl{display:flex;justify-content:space-between;align-items:flex-end;margin-top:18px}
  .ttl h1{font-size:25px;font-weight:700;letter-spacing:.02em}
  .dt{display:flex;align-items:baseline;gap:6px;width:250px;font-weight:700;font-size:13px}
  .dt span.v{flex:1;border-bottom:1.5px solid #111;font-weight:400;padding:0 4px;min-height:18px;font-size:13px}
  .pj{display:flex;align-items:baseline;gap:6px;margin:16px 0 8px;font-weight:700;font-size:13px}
  .pj span.v{flex:1;border-bottom:1.5px solid #111;font-weight:400;padding:0 4px;min-height:18px;font-size:13px}
  table.it{width:100%;border-collapse:collapse;table-layout:fixed;border:1.6px solid #111}
  table.it th{border:1.6px solid #111;padding:6px;font-size:13px;font-weight:700;text-align:center}
  table.it td{border:1px solid #111;padding:3px 7px;font-size:12.5px;height:27px;vertical-align:middle;overflow:hidden}
  table.it tr{page-break-inside:avoid}
  table.it .c{text-align:center}
  .w1{width:9%}.w2{width:40%}.w3{width:35%}.w4{width:16%}
  .sg{display:flex;border:1.6px solid #111;border-top:0;margin-top:0}
  .sg>div{flex:1;min-height:78px;padding:8px 10px;font-weight:700;font-size:12.5px}
  .sg>div+div{border-left:1.6px solid #111}
  .sg .v{display:block;font-weight:400;font-size:12.5px;margin-top:8px}
  .cp{position:absolute;top:0;right:6px;font-size:11px;font-weight:700;color:#666}
  @media print{.sheet{padding:0}}
</style></head><body><div class="sheet" style="position:relative">
  <span class="cp print-copy-text">${_esc(cfg.copyText || "")}</span>
  <div class="ttl"><div class="dt" style="width:auto">No.<span class="v" style="border:0;font-size:18px;color:#7a1a8a">${_esc(doc.name || "")}</span></div><div class="dt">Date:<span class="v">${_esc(dateTxt)}</span></div></div>
  <div class="pj">Project:<span class="v">${_esc(doc.project_label || doc.project || "")}</span></div>
  <table class="it">
    <thead><tr><th class="w1">S. No.</th><th class="w2">Item</th><th class="w3">Intended Use</th><th class="w4">Qty</th></tr></thead>
    <tbody>${filled}${blanks}</tbody>
  </table>
  <div class="sg">
    <div>Requested By:<span class="v">${_esc(doc.requested_by_name || "")}</span></div>
    <div>Required By:<span class="v">${_esc(reqBy)}</span></div>
    <div>Approved By:<span class="v">${_esc(doc.approved_by_name || "")}</span></div>
  </div>
</div></body></html>`;
}

// GRN on the Sava Builders "Purchase" costing sheet (cfg.savaGRN): supplier / doc box, costing factors,
// document-amount table and the costed line items with landed cost. Portrait A4.
function _renderSavaGRN(doc, cfg) {
  const fmt = (v) => _fmtNumFor(v, "KES");
  const lns = (t) => String(t || "").split("\n").map(x => x.trim()).filter(Boolean);
  const items = doc.items || [];
  const taxPct = Number(doc.po_tax_rate || 0);
  const lines = items.map(it => {
    const qty = Number(it.qty || 0), rate = Number(it.rate || 0);
    const amt = it.amount != null && it.amount !== "" ? Number(it.amount) : qty * rate;
    return { it, qty, rate, amt, orig: amt * (1 + taxPct / 100) };
  });
  const sum = (k) => lines.reduce((a, l) => a + l[k], 0);
  const tAmt = sum("amt"), tQty = sum("qty"), tOrig = sum("orig");
  const supLines = lns(doc.supplier_address);
  const row = (k, v) => `<div class="kv"><span class="k">${k}</span><span class="v">${_esc(v || "")}</span></div>`;
  const body = lines.map((l, i) => `
    <tr><td class="c">${i + 1}</td>
      <td>${_esc(l.it.item_name || l.it.item_code)}</td>
      <td class="r">${fmt(l.qty)}</td><td class="c">${_esc(l.it.uom || "")}</td>
      <td class="r">${fmt(l.rate)}</td><td class="r b">${fmt(l.rate)}</td>
      <td class="r b">${fmt(l.amt)}</td><td class="r">${fmt(l.orig)}</td></tr>`).join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<title>${_esc(cfg.title)} — ${_esc(doc.name)}</title>
<style>
  @page{size:A4 portrait;margin:10mm}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Arial,Helvetica,sans-serif;color:#111;background:#fff;font-size:12px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .sheet{max-width:780px;margin:0 auto;padding:16px 20px;position:relative}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
  .lg{width:210px}.lg img{max-height:135px;max-width:200px;width:auto;height:auto;object-fit:contain}
  .co{width:420px;padding-top:14px}
  .co .n{font-size:17px;font-weight:700}
  .co .a{font-size:12.5px;line-height:1.5;margin-top:6px}
  .ttl{font-weight:700;font-size:14px;margin:6px 0 8px 330px}
  .info{display:flex;gap:18px;justify-content:space-between}
  .info .l{flex:1}.info .rt{width:46%}
  .sup{font-weight:700;font-size:14px;margin-bottom:6px}
  .kv{display:flex;gap:10px;min-height:26px;align-items:center;border-bottom:1px dotted #bbb}
  .kv .k{width:44%;font-size:12.5px}.kv .v{flex:1;font-weight:700;font-size:12.5px}
  .two{display:flex;gap:18px}.two .kv{flex:1}
  table{width:100%;border-collapse:collapse;border:1.5px solid #111;margin-top:20px;table-layout:fixed}
  th{border-bottom:1.5px solid #111;padding:5px 6px;font-size:11.5px;text-align:right;vertical-align:bottom}
  th.t,td.t{text-align:left}
  td{padding:5px 6px;font-size:11.5px;vertical-align:top}
  td.c,th.c{text-align:center}td.r{text-align:right}td.b{font-weight:700}
  tr.tot td{border-top:1.5px solid #111;font-weight:700;text-align:right}
  .sub td{border-top:1px solid #111;font-size:11px}
  .foot{margin-top:70px;font-size:10px;color:#444;display:flex;justify-content:space-between}
  .cp{position:absolute;top:4px;right:20px;font-size:11px;font-weight:700;color:#666}
  @media print{.sheet{padding:0}}
</style></head><body><div class="sheet">
  <span class="cp print-copy-text">${_esc(cfg.copyText || "")}</span>
  <div class="info">
    <div class="l">
      <div class="sup">${_esc(doc.supplier_name || doc.supplier || "")}</div>
      <div style="min-height:52px;font-size:12.5px;line-height:1.5">${supLines.map(_esc).join("<br/>")}</div>
      ${row("Payment term", doc.payment_term_label)}
      ${row("Costing Factor", "1.000000")}
    </div>
    <div class="rt">
      ${row("Doc#", doc.name)}${row("Doc Date", _fmtDocDate(doc.posting_date || ""))}
      ${row("Order#", doc.purchase_order)}${row("Order date", doc.po_date ? _fmtDocDate(doc.po_date) : "")}
      ${row("Currency", "Kenyan Shillings")}${row("Costing Factor with Tax", "1.000000")}
    </div>
  </div>
  <table>
    <thead><tr><th class="c" style="width:7%">S/N</th><th class="t" style="width:33%">Document Product Line Items and Allocated Landed Cost Expenses Line Items for Costing</th>
      <th style="width:16%">Amount</th><th class="c" style="width:14%">Currency</th><th style="width:12%">Currency Rate</th><th style="width:18%">Amount in Home Currency</th></tr></thead>
    <tbody>
      <tr><td class="c">1</td><td class="t">${_esc(doc.name || "")} &nbsp; ${_esc(_fmtDocDate(doc.posting_date || ""))}</td>
        <td class="r b">${fmt(tAmt)}</td><td class="c">Kenyan Shillings</td><td class="r">1.00</td><td class="r b">${fmt(tAmt)}</td></tr>
      <tr class="sub"><td></td><td class="t" colspan="5">Goods Received Item Total Amount</td></tr>
      <tr class="tot"><td colspan="5">Total</td><td>${fmt(tAmt)}</td></tr>
    </tbody>
  </table>
  <table>
    <thead><tr><th class="c" style="width:6%">S/N</th><th class="t" style="width:28%">Document Product Line Items Costed and Expense Line Items</th>
      <th style="width:12%">Quantity</th><th class="c" style="width:7%">UOM</th><th style="width:11%">Unit Price</th><th style="width:11%">Landed Cost</th>
      <th style="width:13%">Total Landed Cost</th><th style="width:12%">Amount Original Currency</th></tr></thead>
    <tbody>${body}
      <tr class="tot"><td></td><td></td><td>${fmt(tQty)}</td><td></td><td></td><td></td><td>${fmt(tAmt)}</td><td>${fmt(tOrig)}</td></tr>
    </tbody>
  </table>
  <div class="foot"><span>Printed By: ${_esc(doc.prepared_by_name || "")}</span><span>Printed On: ${_esc(_fmtDocDate(new Date().toISOString().slice(0, 10)))}</span></div>
</div></body></html>`;
}

// ── Public API ────────────────────────────────────────────────────────────────
// Purchase Order (LPO) print: the Classic layout with KES, VAT lines, a Vendor / Deliver To box,
// payment details from the supplier's payment terms, and no UPI QR / "E. & O. E." invoice wording.
// GRN print: rendered on the Sava Builders "Purchase" costing sheet layout.
export const GRN_PRINT_CONFIG = { title: "Goods Received Note", savaGRN: true };

// Adds what the GRN record doesn't carry: supplier address / payment term and the PO's date and tax rate.
// Never throws: anything it can't read is simply left off the print.
export async function preparePRPrint(doc) {
  const out = { ...doc };
  try {
    if (doc?.supplier) {
      const sup = await apiGet("Supplier", doc.supplier);
      if (sup) {
        out.supplier_address = [sup.address_line1, sup.address_line2, [sup.city, sup.state].filter(Boolean).join(", "), sup.country].filter(Boolean).join("\n");
        if (sup.payment_terms) {
          let pt = null;
          try { pt = await apiGet("Payment Terms", sup.payment_terms); } catch { /* name only */ }
          out.payment_term_label = pt?.credit_days ? `${pt.credit_days} DAYS` : sup.payment_terms;
        }
      }
    }
  } catch { /* print without supplier details */ }
  try {
    if (doc?.purchase_order) {
      const po = await apiGet("Purchase Order", doc.purchase_order);
      if (po) {
        out.po_date = po.transaction_date || "";
        const rates = [...new Set((po.taxes || []).map(x => Number(x.rate || 0)).filter(r => r > 0))];
        out.po_tax_rate = rates.length === 1 ? rates[0] : 0;
      }
    }
  } catch { /* print without PO details */ }
  return out;
}

// Material Requisition print: rendered on the Sava Builders pre-printed requisition sheet.
export const MR_PRINT_CONFIG = { title: "MATERIAL REQUISITION", savaMR: true };

// Adds the project's "code — name" label (the MR only stores the project id). Never throws.
export async function prepareMRPrint(doc) {
  const out = { ...doc };
  try {
    if (doc?.project) {
      const p = await apiGet("Project", doc.project);
      if (p) out.project_label = [p.project_code || p.name, p.project_name].filter(Boolean).join(" — ");
    }
  } catch { /* print with the project id only */ }
  return out;
}

// Delivery Note print: rendered on the Sava Builders pre-printed D.N sheet layout.
export const DN_PRINT_CONFIG = { title: "DELIVERY NOTE", savaDN: true };

export const PO_PRINT_CONFIG = {
  title: "PURCHASE ORDER", partyLabel: "Vendor", partyField: "supplier_name",
  po: true, currency: "KES", taxIdLabel: "KRA PIN :", keepTaxLabel: true,
  amountWordsLabel: "Total Amount in Words :",
  footerNote: "This is a computer-generated Purchase Order.",
  showQr: false, includeHsn: false, includeDiscount: false,
  savaPaper: true,   // render on the Sava Builders pre-printed LPO sheet layout
};

// Adds what the PO record doesn't carry: the supplier's KRA PIN, contact, address and payment terms.
// Never throws: anything it can't read is simply left off the print.
export async function preparePOPrint(doc) {
  const out = { ...doc, currency: "KES" };
  if (!doc?.supplier) return out;
  try {
    const sup = await apiGet("Supplier", doc.supplier);
    if (sup) {
      out.supplier_gstin = sup.tax_id || "";
      out.contact_mobile = sup.mobile_no || sup.phone || "";
      out.supplier_address = [sup.address_line1, sup.address_line2,
        [sup.city, sup.state, sup.pincode].filter(Boolean).join(", "), sup.country].filter(Boolean).join("\n");
      if (sup.payment_terms) {
        let pt = null;
        try { pt = await apiGet("Payment Terms", sup.payment_terms); } catch { /* name only */ }
        out.payment_lines = [`Payment Terms: ${sup.payment_terms}`,
          pt?.credit_days ? `Credit Days: ${pt.credit_days}` : "", pt?.description || ""].filter(Boolean);
      }
    }
  } catch { /* print without supplier details */ }
  return out;
}

export function useLivePreview() {
  function setCompany(c)    { return _loadBranding(c); }
  function refreshBranding() { return _loadBranding(_state.company); }
  function setTemplate(t)   { _state.template = t; _saveBranding(); }
  function setBrandColor(c) { _state.brandColor = c; _saveBranding(); }
  function setLogo(l)       { _state.logo = l; _saveBranding(); }

  function renderDocument(doc, config) {
    const cfg = {
      title:        "INVOICE",
      partyLabel:   "Bill To",
      partyField:   "customer_name",
      companyName:  "",
      includeHsn:   true,
      includeDiscount: true,
      ...config,
    };
    if (cfg.savaMR) return _renderSavaMR(doc, cfg);
    if (cfg.savaGRN) return _renderSavaGRN(doc, cfg);
    if (cfg.savaDN) return _renderSavaDN(doc, cfg);
    if (cfg.po && cfg.savaPaper) return _renderSavaPO(doc, cfg);
    if (_state.template === "modern")  return _renderModern(doc, cfg);
    if (_state.template === "minimal") return _renderMinimal(doc, cfg);
    return _renderClassic(doc, cfg);
  }

  function printDoc(doc, config) {
    const html = renderDocument(doc, config);
    // Sava print sheets (MR / GRN / DN / LPO) have one fixed layout, so the
    // Modern / Minimal switch does nothing for them: hide those two buttons.
    const _fixedLayout = !!(config && (config.savaMR || config.savaGRN || config.savaDN || (config.po && config.savaPaper)));
    const safeHtml = html.replace(/"/g, "&quot;");
    const shell = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>Print — ${doc?.name || ""}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',system-ui,sans-serif;background:#e5e7eb;min-height:100vh}
  .toolbar{position:sticky;top:0;z-index:10;background:#fff;padding:10px 18px;
    border-bottom:1px solid #e5e7eb;display:flex;align-items:center;gap:10px;box-shadow:0 1px 4px rgba(0,0,0,.06)}
  .tb-lbl{font-size:11.5px;font-weight:700;color:#374151;letter-spacing:.04em;margin-right:4px}
  .tbtn{font:inherit;font-size:12px;padding:6px 14px;border-radius:6px;border:1px solid #e5e7eb;
    background:#fff;color:#374151;cursor:pointer;font-weight:500;transition:all .15s}
  .tbtn.active{background:#1a6ef7;color:#fff;border-color:#1a6ef7}
  .tbtn:hover:not(.active){background:#f9fafb;border-color:#cbd5e1}
  .sep{width:1px;height:22px;background:#e5e7eb;margin:0 4px}
  .print-btn{margin-left:auto;background:#1a6ef7;color:#fff;border:none;padding:7px 16px;
    border-radius:7px;font-weight:700;cursor:pointer;font:inherit;font-size:12.5px;
    display:flex;align-items:center;gap:6px;transition:background .15s}
  .print-btn:hover{background:#1558d0}
  .doc-wrap{max-width:900px;margin:20px auto;background:#fff;
    box-shadow:0 4px 24px rgba(0,0,0,.1);border-radius:4px;overflow:hidden}
  iframe{border:none;width:100%;min-height:1100px;display:block}
  @media print{.toolbar{display:none!important}.doc-wrap{box-shadow:none;margin:0;max-width:none;border-radius:0}}
</style></head><body>
<div class="toolbar">
  <span class="tb-lbl">PRINT PREVIEW</span>
  <div class="sep"></div>
  <button class="tbtn ${_state.template === "classic" ? "active" : ""}" data-t="classic">Classic</button>
  ${_fixedLayout ? "" : `<button class="tbtn ${_state.template === "modern"  ? "active" : ""}" data-t="modern">Modern</button>
  <button class="tbtn ${_state.template === "minimal" ? "active" : ""}" data-t="minimal">Minimal</button>`}
  <div class="sep"></div>
  <select class="tbtn" id="copy-sel" style="padding-right:8px;appearance:auto;outline:none">
    <option value="" ${!config.copyText ? 'selected' : ''}>Original Copy</option>
    <option value="DUPLICATE COPY" ${config.copyText === 'DUPLICATE COPY' ? 'selected' : ''}>Duplicate Copy</option>
    <option value="TRIPLICATE COPY" ${config.copyText === 'TRIPLICATE COPY' ? 'selected' : ''}>Triplicate Copy</option>
    <option value="EXTRA COPY" ${config.copyText === 'EXTRA COPY' ? 'selected' : ''}>Extra Copy</option>
  </select>
  <button class="print-btn" onclick="window.print()">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
      <rect x="6" y="14" width="12" height="8"/>
    </svg>
    Print
  </button>
</div>
<div class="doc-wrap"><iframe id="frm" srcdoc="${safeHtml}"></iframe></div>
<script>
  document.getElementById('copy-sel').onchange = (e) => {
    try {
      const txt = e.target.value;
      const f = document.getElementById('frm');
      const el = f.contentDocument.querySelector('.print-copy-text');
      if (el) el.textContent = txt;
    } catch {}
  };
  document.querySelectorAll('button.tbtn').forEach(b => b.onclick = () => {
    document.querySelectorAll('button.tbtn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({
        kind: 'switch-template',
        template: b.dataset.t,
        doc: ${JSON.stringify(doc || {})},
        config: Object.assign(${JSON.stringify(config || {})}, { copyText: document.getElementById('copy-sel').value })
      }, '*');
    }
  });
  // Auto-resize iframe to content height
  // Wait for iframe and all images (including QR) to load
const frm = document.getElementById('frm');

frm.onload = () => {
  try {
    const doc = frm.contentDocument;

    const images = Array.from(doc.images || []);

    Promise.all(
      images.map(img => {
        if (img.complete) {
          return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
        }

        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    ).then(() => {
      const h = doc.documentElement.scrollHeight;
      if (h > 400) frm.style.minHeight = h + 'px';
    });
  } catch {}
};
<\/script>
</body></html>`;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.open(); w.document.write(shell); w.document.close();
  }

  if (typeof window !== "undefined" && !window.__bvLivePreviewListener) {
    window.__bvLivePreviewListener = true;
    window.addEventListener("message", (ev) => {
      const d = ev.data || {};
      if (d.kind === "switch-template" && d.template) {
        setTemplate(d.template);
        if (d.doc && d.config) printDoc(d.doc, d.config);
      }
    });
  }

  const template   = computed({ get: () => _state.template,   set: setTemplate });
  const brandColor = computed({ get: () => _state.brandColor, set: setBrandColor });
  const logo       = computed({ get: () => _state.logo,       set: setLogo });

  return { state: _state, template, brandColor, logo, setCompany, refreshBranding, renderDocument, printDoc };
}