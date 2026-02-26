<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'default' | 'outlined' | 'elevated';
    class?: string;
  }>(),
  { variant: 'default', class: '' }
);
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
