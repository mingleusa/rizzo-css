<script setup lang="ts">
defineProps({
  for: { type: String, default: undefined },
  required: { type: Boolean, default: false },
  class: { type: String, default: '' },
});
</script>

<template>
  <label
    v-if="$props.for"
    :for="$props.for"
    :class="['label', required ? 'label--required' : '', $props.class].filter(Boolean).join(' ')"
  >
    <slot />
  </label>
  <span v-else :class="['label', required ? 'label--required' : '', $props.class].filter(Boolean).join(' ')">
    <slot />
  </span>
</template>
