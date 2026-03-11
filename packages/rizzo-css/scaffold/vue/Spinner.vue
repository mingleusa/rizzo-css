<script setup lang="ts">
defineProps({
  size: { type: String, default: 'md' },
  variant: { type: String, default: 'primary' },
  label: { type: String, default: 'Loading' },
  class: { type: String, default: '' },
});
</script>

<template>
  <span
    :class="['spinner', `spinner--${size}`, `spinner--${variant}`, $props.class].filter(Boolean).join(' ')"
    role="status"
    :aria-label="label"
  >
    <span class="spinner__ring" aria-hidden="true" />
  </span>
</template>
