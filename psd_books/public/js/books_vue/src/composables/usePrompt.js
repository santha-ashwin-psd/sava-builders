// Promise-returning input-prompt dialog. Mounted by AppShell via <PromptDialog />;
// callers do `const v = await prompt({title, label}); if (v) ...`.
// Resolves with the entered string, or null if cancelled.

import { reactive } from "vue";

const state = reactive({
  open:         false,
  title:        "",
  label:        "",
  value:        "",
  placeholder:  "",
  okLabel:      "OK",
  cancelLabel:  "Cancel",
  inputType:    "text",     // "text" | "email" | "number"
  resolve:      null,
});

export function usePrompt() {
  function prompt({
    title = "Enter a value",
    label = "",
    defaultValue = "",
    placeholder = "",
    okLabel = "OK",
    cancelLabel = "Cancel",
    inputType = "text",
  } = {}) {
    return new Promise((resolve) => {
      state.title       = title;
      state.label       = label;
      state.value       = defaultValue || "";
      state.placeholder = placeholder;
      state.okLabel     = okLabel;
      state.cancelLabel = cancelLabel;
      state.inputType   = inputType;
      state.resolve     = resolve;
      state.open        = true;
    });
  }

  function _ok() {
    const v = (state.value ?? "").trim();
    state.open = false;
    state.resolve?.(v || null);
    state.resolve = null;
  }
  function _cancel() {
    state.open = false;
    state.resolve?.(null);
    state.resolve = null;
  }

  return { state, prompt, _ok, _cancel };
}
