// Tiny client-side pagination helper.
//
// Usage:
//   const { page, pageSize, paged, totalItems } = usePagination(sorted);
//   <tr v-for="r in paged" ...>
//   <Pagination v-model:page="page" v-model:page-size="pageSize" :total-items="totalItems" />
//
// - `source` is a reactive (ref/computed) array to paginate.
// - Resets to page 1 whenever the source length changes (filter/search change).
// - Persists the chosen page size per-page-key in localStorage so it sticks.

import { ref, computed, watch } from "vue";

export function usePagination(source, { defaultPageSize = 25, storageKey = null } = {}) {
  const initialSize = (() => {
    if (storageKey) {
      try {
        const stored = Number(localStorage.getItem(`books.pg.${storageKey}`));
        if ([10, 25, 50, 100].includes(stored)) return stored;
      } catch {}
    }
    return defaultPageSize;
  })();

  const page = ref(1);
  const pageSize = ref(initialSize);

  const totalItems = computed(() => (source.value || []).length);
  const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / pageSize.value)));

  const paged = computed(() => {
    const rows = source.value || [];
    const start = (page.value - 1) * pageSize.value;
    return rows.slice(start, start + pageSize.value);
  });

  // If filter/search shrinks the list under the current page, drop back to page 1.
  watch(totalItems, () => {
    if (page.value > totalPages.value) page.value = totalPages.value;
    if (page.value < 1) page.value = 1;
  });

  // Persist page-size choice
  if (storageKey) {
    watch(pageSize, (v) => {
      try { localStorage.setItem(`books.pg.${storageKey}`, String(v)); } catch {}
      page.value = 1;
    });
  } else {
    watch(pageSize, () => { page.value = 1; });
  }

  return { page, pageSize, paged, totalItems, totalPages };
}
