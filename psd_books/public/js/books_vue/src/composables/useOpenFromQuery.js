// Cross-document deep-link helper.
//
// IMPORTANT: this composable internally calls `useRoute()`, which MUST be
// invoked while a component instance is active. To make that safe under any
// caller pattern (sync setup, async onMounted, etc.) we resolve the route
// once at construction and then walk it via the cached reference.
//
// Two-step usage from a list page:
//
//   import { useRoute } from "vue-router";
//   const route = useRoute();      // SYNC in setup
//
//   onMounted(async () => {
//     await load();
//     openFromQuery({
//       route,
//       openByName: (n) => openView(list.value.find(r => r.name === n) || { name: n }),
//     });
//   });
//
// The watcher lives for the component's lifetime (auto-stopped on unmount
// by Vue's watch effect scope).

import { watch, getCurrentInstance } from "vue";

export function openFromQuery({ route, openByName, paramKey = "open" } = {}) {
  if (!route || typeof openByName !== "function") return;

  const tryOpen = (name) => {
    if (!name) return;
    openByName(String(name));
  };

  // Fire immediately for the current URL state.
  tryOpen(route.query?.[paramKey]);

  // Re-fire when the query param changes (in-app navigation between docs).
  // Guarded by getCurrentInstance() so we don't leak a watcher if called
  // outside a component context (e.g. tests).
  if (getCurrentInstance()) {
    watch(
      () => route.query?.[paramKey],
      (next) => { if (next) tryOpen(next); }
    );
  }
}

// Legacy alias for the existing callers — keeps every page working without
// editing nine files. New code should prefer the `openFromQuery` name.
export { openFromQuery as useOpenFromQuery };
