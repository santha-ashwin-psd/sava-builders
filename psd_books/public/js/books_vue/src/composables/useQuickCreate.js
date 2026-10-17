import { reactive } from "vue";

const state = reactive({ open: false, doctype: "", prefill: "", resolve: null });

export function useQuickCreate() {
  function openCreate(doctype, prefill = "") {
    return new Promise((resolve) => {
      Object.assign(state, { open: true, doctype, prefill, resolve });
    });
  }
  function complete(record) {
    state.open = false;
    const res = state.resolve; state.resolve = null; res?.(record);
  }
  function cancel() {
    state.open = false;
    const res = state.resolve; state.resolve = null; res?.(null);
  }
  return { state, openCreate, complete, cancel };
}
