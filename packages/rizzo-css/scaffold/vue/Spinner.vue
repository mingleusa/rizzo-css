<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    label?: string;
    class?: string;
  }>(),
  { size: 'md', variant: 'primary', label: 'Loading', class: '' }
);
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
