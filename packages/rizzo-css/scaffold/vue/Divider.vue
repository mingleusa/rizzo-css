<script setup lang="ts">
defineProps({
  orientation: { type: String, default: 'horizontal' },
  label: { type: String, default: undefined },
  class: { type: String, default: '' },
});
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
