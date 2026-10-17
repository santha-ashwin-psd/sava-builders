// Universal status helpers for transactional documents.
// Centralises the statusLabel/statusCls/statusBg logic that was inlined in Invoices.vue
// so every page handles docstatus===2 (Cancelled) consistently.
//
// Usage:
//   const { statusLabel, statusCls, statusBg, isOverdue } = useDocStatus({
//     dueDateField: "due_date",
//     outstandingField: "outstanding_amount",
//     fallbackDraftLabel: "Draft",
//     fallbackSubmittedLabel: "Unpaid",
//     paidStatuses: ["paid"],
//     pendingStatuses: ["submitted", "unpaid", "partly paid"],
//     completedStatuses: ["completed", "closed", "invoiced"],
//   });

export function useDocStatus(config = {}) {
  const cfg = {
    dueDateField: "due_date",
    outstandingField: "outstanding_amount",
    fallbackDraftLabel: "Draft",
    fallbackSubmittedLabel: "Submitted",
    paidStatuses: ["paid"],
    pendingStatuses: ["submitted", "unpaid", "partly paid", "to deliver", "to receive", "to bill"],
    completedStatuses: ["completed", "closed", "invoiced", "fully delivered", "fully billed"],
    overdueCheck: null, // override for custom logic
    ...config,
  };

  function isOverdue(doc) {
    if (cfg.overdueCheck) return cfg.overdueCheck(doc);
    const out = Number(doc?.[cfg.outstandingField] || 0);
    const due = doc?.[cfg.dueDateField];
    return out > 0 && due && new Date(due) < new Date();
  }

  function statusLabel(doc) {
    if (!doc) return "";
    if (doc.docstatus === 2) return "CANCELLED";
    if (isOverdue(doc)) {
      const days = Math.floor((Date.now() - new Date(doc[cfg.dueDateField])) / 86400000);
      return `OVERDUE ${days}d`;
    }
    if (doc.docstatus === 0) return cfg.fallbackDraftLabel.toUpperCase();
    return String(doc.status || cfg.fallbackSubmittedLabel).toUpperCase();
  }

  function statusCls(doc) {
    if (!doc) return "";
    if (doc.docstatus === 2) return "status-cancelled";
    if (isOverdue(doc)) return "status-overdue";
    const s = String(doc.status || "").toLowerCase();
    if (cfg.paidStatuses.includes(s)) return "status-paid";
    if (cfg.completedStatuses.includes(s)) return "status-paid";
    if (cfg.pendingStatuses.includes(s)) return "status-unpaid";
    if (s === "cancelled") return "status-cancelled";
    if (doc.docstatus === 0) return "status-draft";
    return "status-unpaid";
  }

  function statusBg(doc) {
    if (!doc) return "linear-gradient(135deg,#1e3a5f,#2563eb)";
    if (doc.docstatus === 2) return "linear-gradient(135deg,#7f1d1d,#dc2626)";
    if (isOverdue(doc)) return "linear-gradient(135deg,#7f1d1d,#dc2626)";
    const s = String(doc.status || "").toLowerCase();
    if (cfg.paidStatuses.includes(s) || cfg.completedStatuses.includes(s))
      return "linear-gradient(135deg,#064e3b,#059669)";
    if (cfg.pendingStatuses.includes(s))
      return "linear-gradient(135deg,#78350f,#d97706)";
    if (s === "cancelled") return "linear-gradient(135deg,#7f1d1d,#dc2626)";
    return "linear-gradient(135deg,#1e3a5f,#2563eb)";
  }

  return { statusLabel, statusCls, statusBg, isOverdue };
}
