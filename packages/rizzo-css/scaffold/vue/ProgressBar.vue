<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    value?: number;
    max?: number;
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    indeterminate?: boolean;
    label?: string;
  }>(),
  { value: 0, max: 100, variant: 'primary', size: 'md', showLabel: false, indeterminate: false }
);

const safeMax = computed(() => (props.max <= 0 ? 100 : props.max));
const clampedValue = computed(() => (props.indeterminate ? 0 : Math.max(0, Math.min(props.value, safeMax.value))));
const percentage = computed(() => (props.indeterminate ? 0 : Math.round((clampedValue.value / safeMax.value) * 100)));
</script>

<template>
  <div
    :class="['progress', `progress--${variant}`, `progress--${size}`, { 'progress--indeterminate': indeterminate }]"
    role="progressbar"
    aria-valuemin="0"
    :aria-valuemax="safeMax"
    :aria-label="label ?? (indeterminate ? 'Loading' : 'Progress')"
    :aria-valuetext="indeterminate ? 'Loading' : undefined"
    :aria-valuenow="indeterminate ? undefined : clampedValue"
  >
    <div class="progress__track">
      <div class="progress__bar" :style="indeterminate ? undefined : { width: `${percentage}%` }"></div>
    </div>
    <span v-if="showLabel && !indeterminate" class="progress__label" aria-hidden="true">{{ percentage }}%</span>
  </div>
</template>
