// Item names for list pages (Material Requests, Purchase Orders, GRN, ...).
// One bulk request per list, started after the list is shown so the page
// never waits on it. Used by the "Item Names" column and by the search box.
import { ref } from "vue";
import { apiPOST } from "../api/client.js";

export function useItemNames(doctype) {
  const map = ref({});

  async function loadItemNames(rows) {
    const names = (rows || []).map(r => r.name).filter(Boolean);
    if (!names.length) { map.value = {}; return; }
    try {
      map.value = (await apiPOST("psd_books.api.docs.get_item_names", { doctype, names: JSON.stringify(names) })) || {};
    } catch { map.value = {}; }
  }

  const itemNames = (name) => map.value[name] || [];
  const hasItem = (name, q) => itemNames(name).some(n => (n || "").toLowerCase().includes(q));

  return { loadItemNames, itemNames, hasItem };
}