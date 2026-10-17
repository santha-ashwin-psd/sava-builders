<template>
  <Teleport to="body">
    <div v-if="show" class="bv-tutorial-overlay" @click.self="dismiss">
      <div class="bv-tutorial-card">
        <h2>Welcome to Books</h2>
        <p>This is your accounting workspace. The sidebar groups everything by Sales, Purchases, Banking, and Accounting. Start by adding your first customer or recording an invoice.</p>
        <button class="nim-btn nim-btn-primary" @click="dismiss">Got it</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { markTutorialDone } from "../api/session.js";

const show = ref(false);

onMounted(() => { show.value = !!window.__booksIsNewUser; });

function dismiss() {
  show.value = false;
  markTutorialDone();
}
</script>
