<script setup lang="ts">
withDefaults(
  defineProps<{
    orientation?: 'horizontal' | 'vertical';
    label?: string;
    class?: string;
  }>(),
  { orientation: 'horizontal', class: '' }
);
</script>

<template>
  <div
    :class="['divider', `divider--${orientation}`, label ? 'divider--labeled' : '', $props.class].filter(Boolean).join(' ')"
    role="separator"
    :aria-orientation="orientation"
    :aria-label="label?.trim() || undefined"
  >
    <span v-if="label && orientation === 'horizontal'" class="divider__line" aria-hidden="true" />
    <span v-if="label && orientation === 'horizontal'" class="divider__label">{{ label }}</span>
    <span class="divider__line" aria-hidden="true" />
  </div>
</template>
