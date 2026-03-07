<script setup lang="ts">
import { computed } from 'vue';

interface ChartDataItem {
  label: string;
  value: number;
}

const props = withDefaults(
  defineProps<{ data?: ChartDataItem[]; class?: string }>(),
  {
    data: () => [{ label: 'A', value: 40 }, { label: 'B', value: 65 }, { label: 'C', value: 30 }],
    class: '',
  }
);

const max = computed(() => Math.max(1, ...props.data.map((d) => d.value)));
const rootClass = computed(() => ['chart', props.class].filter(Boolean).join(' '));
const ariaLabel = computed(() => `Bar chart: ${props.data.map((d) => `${d.label} ${d.value}`).join(', ')}`);
</script>

<template>
  <div :class="rootClass" role="img" :aria-label="ariaLabel">
    <div class="chart__bars">
      <div v-for="d in data" :key="d.label" class="chart__bar-wrap">
        <div class="chart__bar" :style="{ height: `${(d.value / max) * 100}%` }" />
        <span class="chart__label">{{ d.label }}</span>
      </div>
    </div>
  </div>
</template>
