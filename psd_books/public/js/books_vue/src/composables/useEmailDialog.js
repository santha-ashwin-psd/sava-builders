// Generic email-send dialog. Works for Invoice, Bill, Quote, SO, PO, CN, DN.
//
// Usage:
//   const { openEmail } = useEmailDialog();
//   const sent = await openEmail({
//     doctype: "Sales Invoice",
//     name: "INV-001",
//     docLabel: "Invoice INV-001",
//     getDefaultsEndpoint: "psd_books.api.docs.get_invoice_email_defaults",
//     sendEndpoint: "psd_books.api.docs.send_invoice_email",
//     enhanceEndpoint: "psd_books.api.books_data.ai_enhance_email",  // optional
//     extraDefaultsParam: { invoice_name: "INV-001" },
//   });

import { reactive } from "vue";

const state = reactive({
  open: false,
  doctype: "",
  name: "",
  docLabel: "",
  getDefaultsEndpoint: "",
  sendEndpoint: "",
  enhanceEndpoint: "",
  paramKey: "name",      // the request key that holds the doc name (e.g. invoice_name, bill_name)
  // When set, the dialog renders the document with the active branding template
  // (useLivePreview) and sends the resulting HTML as `pdf_html` so the emailed
  // PDF matches the on-screen download. Shape: { title, partyLabel, partyField }.
  printConfig: null,
  resolve: null,
});

export function useEmailDialog() {
  function openEmail({
    doctype,
    name,
    docLabel,
    getDefaultsEndpoint,
    sendEndpoint,
    enhanceEndpoint = "",
    paramKey = "name",
    printConfig = null,
  }) {
    return new Promise((resolve) => {
      Object.assign(state, {
        open: true,
        doctype,
        name,
        docLabel: docLabel || `${doctype} ${name}`,
        getDefaultsEndpoint,
        sendEndpoint,
        enhanceEndpoint,
        paramKey,
        printConfig,
        resolve,
      });
    });
  }
  function complete(ok) {
    state.open = false;
    const r = state.resolve; state.resolve = null;
    r?.(ok);
  }
  return { state, openEmail, complete };
}
