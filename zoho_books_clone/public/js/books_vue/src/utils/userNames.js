// Shared email -> full name resolver, used to render "Created by <name>"
// in document view drawers across the app instead of a raw email/user-id.
// Fetched once per session and cached; `_map` is a Vue reactive object so
// any template that reads ownerName(email) automatically re-renders once
// the lookup resolves, even though the fetch itself is async.

import { reactive } from "vue";
import { apiGET } from "../api/client.js";

const _map = reactive({}); // email -> full_name
let _loading = null; // in-flight promise, de-dupes concurrent callers
let _loaded = false;

function _load() {
  if (_loaded) return Promise.resolve(_map);
  if (_loading) return _loading;
  _loading = apiGET("zoho_books_clone.api.admin.get_company_user_names")
    .then((res) => {
      Object.assign(_map, res || {});
      _loaded = true;
      return _map;
    })
    .catch(() => {
      _loaded = true;
      return _map;
    })
    .finally(() => {
      _loading = null;
    });
  return _loading;
}

// Kick off the fetch immediately so the map is usually warm by the time a
// drawer first renders; templates re-render on their own once it lands.
_load();

/**
 * Reactive lookup: returns the cached full name for `email`, or `email`
 * itself if the map hasn't loaded yet or has no entry for it. Safe to call
 * directly in a template — it will update automatically once the map loads.
 */
export function ownerName(email) {
  if (!email) return "";
  return _map[email] || email;
}

/** Ensures the email->name map is loading; safe to call from onMounted(). */
export function loadUserNames() {
  return _load();
}