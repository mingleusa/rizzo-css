<script setup lang="ts">
import { computed, useId } from 'vue';

const props = withDefaults(
  defineProps<{
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    /** Delay before showing, in milliseconds */
    delay?: number;
    id?: string;
  }>(),
  { position: 'top', delay: 0 }
);

const generatedId = useId();
const tooltipId = computed(() => props.id ?? `tooltip-${generatedId}`);
</script>

<template>
  <span
    :class="['tooltip', `tooltip--${position}`]"
    role="tooltip"
    :id="tooltipId"
    aria-hidden="true"
    :style="delay > 0 ? { '--tooltip-delay': `${delay}ms` } : undefined"
  >
    {{ text }}
  </span>
</template>
