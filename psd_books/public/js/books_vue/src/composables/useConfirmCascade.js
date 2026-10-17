// Promise-returning cascade-cancel/delete dialog.
// Lists linked payment-entry-like records the action will also cancel.
//
// Usage:
//   const { confirmCascade } = useConfirmCascade();
//   const ok = await confirmCascade({
//     title: "Cancel Invoice & Payment",
//     message: "This will cancel INV-001 and its linked payments.",
//     actionLabel: "Cancel Both",
//     actionStyle: "danger",
//     links: [{ name: "PE-001", mode: "Cash", date: "2026-05-01", amount: 1200 }],
//   });

import { reactive } from "vue";

const state = reactive({
  open: false,
  loading: false,
  title: "",
  message: "",
  actionLabel: "Confirm",
  actionStyle: "danger",
  links: [],
  resolve: null,
});

export function useConfirmCascade() {
  function confirmCascade({
    title = "Are you sure?",
    message = "",
    actionLabel = "Confirm",
    actionStyle = "danger",
    links = [],
  } = {}) {
    return new Promise((resolve) => {
      Object.assign(state, {
        open: true,
        loading: false,
        title,
        message,
        actionLabel,
        actionStyle,
        links,
        resolve,
      });
    });
  }

  async function _ok() {
    state.loading = true;
    const res = state.resolve;
    state.resolve = null;
    state.open = false;
    state.loading = false;
    res?.(true);
  }

  function _cancel() {
    if (state.loading) return;
    const res = state.resolve;
    state.resolve = null;
    state.open = false;
    res?.(false);
  }

  return { state, confirmCascade, _ok, _cancel };
}
