// Global toast queue. <Toast /> mounts once at the AppShell level and renders
// from this shared list. Mirrors the legacy toast(msg,type) at books.js:274.

import { reactive } from "vue";

let _id = 0;
const state = reactive({ items: [] });

export function useToast() {
  function push(message, type = "success", ttl = 3500) {
    const id = ++_id;
    state.items.push({ id, message, type });
    setTimeout(() => {
      const i = state.items.findIndex(t => t.id === id);
      if (i !== -1) state.items.splice(i, 1);
    }, ttl);
  }

  // Attach convenience methods so both patterns work:
  //   const { toast } = useToast();  toast.error("msg")
  //   const { error } = useToast();  error("msg")
  push.success = (m) => push(m, "success");
  push.error   = (m) => push(m, "error");
  push.warn    = (m) => push(m, "warning");
  push.info    = (m) => push(m, "info");

  return {
    items:   state.items,
    toast:   push,
    success: push.success,
    error:   push.error,
    warn:    push.warn,
    info:    push.info,
  };
}
