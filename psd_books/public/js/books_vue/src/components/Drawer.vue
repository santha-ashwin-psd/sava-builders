<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="cust-backdrop"
      @mousedown.self="closeOnBackdrop && $emit('close')"
    >
      <div class="cust-drawer" :style="{ width }">
        <div v-if="$slots.header || title" class="cust-drawer-header">
          <slot name="header">
            <div>
              <div class="cust-drawer-title">{{ title }}</div>
              <div v-if="subtitle" class="cust-drawer-subtitle">{{ subtitle }}</div>
            </div>
            <button v-if="closable" class="cust-drawer-close" @click="$emit('close')">✕</button>
          </slot>
        </div>
        <div class="cust-drawer-body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="cust-drawer-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  show:            { type: Boolean, required: true },
  title:           { type: String,  default: "" },
  subtitle:        { type: String,  default: "" },
  width:           { type: String,  default: "640px" },
  closable:        { type: Boolean, default: true },
  closeOnBackdrop: { type: Boolean, default: true },
});
defineEmits(["close"]);
</script>
