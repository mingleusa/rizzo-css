<script setup lang="ts">
defineProps({
  variant: { type: String, default: 'default' },
  class: { type: String, default: '' },
});
</script>

<template>
  <div
    :class="[
      'card',
      variant !== 'default' ? `card--${variant}` : '',
      $props.class,
    ].filter(Boolean).join(' ')"
  >
    <slot />
  </div>
</template>
