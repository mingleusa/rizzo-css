<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{ variant?: 'text' | 'circle' | 'rect' | 'default'; label?: string }>(),
  { variant: 'default', label: 'Loading' }
);

/** An empty label marks the skeleton as decorative (hidden from assistive tech). */
const isDecorative = computed(() => props.label === '');
</script>

<template>
  <span
    :class="['skeleton', { [`skeleton--${variant}`]: variant !== 'default' }]"
    :role="isDecorative ? undefined : 'status'"
    :aria-label="isDecorative ? undefined : label"
    :aria-busy="isDecorative ? undefined : 'true'"
    :aria-hidden="isDecorative ? 'true' : undefined"
  ></span>
</template>
