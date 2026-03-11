<script setup lang="ts">
defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  pill: { type: Boolean, default: false },
  class: { type: String, default: '' },
});
</script>

<template>
  <span
    :class="[
      'badge',
      `badge--${variant}`,
      `badge--${size}`,
      pill ? 'badge--pill' : '',
      $props.class,
    ].filter(Boolean).join(' ')"
  >
    <slot />
  </span>
</template>
