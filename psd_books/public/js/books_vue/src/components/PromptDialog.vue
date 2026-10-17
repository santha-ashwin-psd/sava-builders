<template>
  <Modal
    :show="state.open"
    :title="state.title"
    width="420px"
    @close="_cancel"
  >
    <div class="bv-prompt-body">
      <label v-if="state.label" class="bv-prompt-label">{{ state.label }}</label>
      <input
        ref="inputEl"
        v-model="state.value"
        :type="state.inputType"
        :placeholder="state.placeholder"
        class="nim-input bv-prompt-input"
        @keyup.enter="_ok"
      />
    </div>
    <template #footer>
      <button class="nim-btn" @click="_cancel">{{ state.cancelLabel }}</button>
      <button class="nim-btn nim-btn-primary" @click="_ok">{{ state.okLabel }}</button>
    </template>
  </Modal>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import Modal from "./Modal.vue";
import { usePrompt } from "../composables/usePrompt.js";

const { state, _ok, _cancel } = usePrompt();
const inputEl = ref(null);

// Auto-focus the input when the dialog opens.
watch(() => state.open, (open) => {
  if (open) nextTick(() => inputEl.value?.focus());
});
</script>

<style>
.bv-prompt-body { padding: 4px 0; }
.bv-prompt-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}
.bv-prompt-input { width: 100%; }
</style>
