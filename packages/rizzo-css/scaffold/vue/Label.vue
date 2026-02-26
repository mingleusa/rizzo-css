<script setup lang="ts">
withDefaults(
  defineProps<{
    for?: string;
    required?: boolean;
    class?: string;
  }>(),
  { required: false, class: '' }
);
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
