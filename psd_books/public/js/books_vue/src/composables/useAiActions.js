// Cross-page action bus for the AI chat panel. Pages register handlers
// keyed by action name; the panel dispatches into them after parsing the
// chat response. Replaces the legacy pattern where the AI panel reached
// directly into the active page's drawer-open functions.

import { reactive } from "vue";

const state = reactive({ handlers: {} });

export function useAiActions() {
  function register(action, handler) {
    state.handlers[action] = handler;
    return () => { if (state.handlers[action] === handler) delete state.handlers[action]; };
  }

  function dispatch(action, payload) {
    const fn = state.handlers[action];
    if (!fn) return false;
    try { fn(payload); return true; }
    catch (e) { console.error("[ai] handler failed", action, e); return false; }
  }

  return { register, dispatch, handlers: state.handlers };
}
