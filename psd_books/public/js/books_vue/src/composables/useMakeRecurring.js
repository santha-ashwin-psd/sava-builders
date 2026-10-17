// Global "Make Recurring" dialog. Mounted by AppShell via <MakeRecurringDialog />.
// Callers do:
//   const { openMakeRecurring } = useMakeRecurring();
//   const subName = await openMakeRecurring({
//     doctype: "Sales Invoice",
//     name: "INV-2026-00001",
//     partyLabel: "Acme Corp",
//     amount: 12000,
//   });
// Resolves to the new Auto Repeat name (or null if cancelled).

import { reactive } from "vue";

const state = reactive({
  open: false,
  doctype: "",
  name: "",
  partyLabel: "",
  amount: 0,
  resolve: null,
});

export function useMakeRecurring() {
  function openMakeRecurring(opts) {
    return new Promise((resolve) => {
      Object.assign(state, {
        open: true,
        doctype: "",
        name: "",
        partyLabel: "",
        amount: 0,
        ...opts,
        resolve,
      });
    });
  }
  function complete(subName) {
    state.open = false;
    const r = state.resolve;
    state.resolve = null;
    r?.(subName);
  }
  function cancel() {
    state.open = false;
    const r = state.resolve;
    state.resolve = null;
    r?.(null);
  }
  return { state, openMakeRecurring, complete, cancel };
}
