<script setup lang="ts">
import type { PropType } from 'vue';
defineProps({
  variant: { type: String, default: 'default' },
  disabled: { type: Boolean, default: false },
  type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
  class: { type: String, default: '' },
});
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
