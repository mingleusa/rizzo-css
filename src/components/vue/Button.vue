<script setup lang="ts">
type Variant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'ghost';

withDefaults(
  defineProps<{
    variant?: Variant;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    class?: string;
  }>(),
  { variant: 'default', disabled: false, type: 'button', class: '' }
);
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
