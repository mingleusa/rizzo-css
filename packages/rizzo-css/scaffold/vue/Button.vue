<script setup lang="ts">
defineProps({
  variant: { type: String, default: 'default' },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
  class: { type: String, default: '' },
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['btn', variant !== 'default' ? `btn-${variant}` : '', $props.class].filter(Boolean).join(' ')"
  >
    <slot />
  </button>
</template>
