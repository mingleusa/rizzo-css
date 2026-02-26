<script setup lang="ts">
type Variant = 'primary' | 'success' | 'warning' | 'error' | 'info';
type Size = 'sm' | 'md' | 'lg';

withDefaults(
  defineProps<{
    variant?: Variant;
    size?: Size;
    pill?: boolean;
    class?: string;
  }>(),
  { variant: 'primary', size: 'md', pill: false, class: '' }
);
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
