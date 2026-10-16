<script setup lang="ts">
import { computed, useId } from 'vue';

const props = withDefaults(
  defineProps<{
    id?: string;
    name?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    /** Accessible name for the range input (required for axe / WCAG). */
    ariaLabel?: string;
  }>(),
  { min: 0, max: 100, step: 1 }
);

/** `v-model:value`; defaults to `min` */
const value = defineModel<number>('value');

const generatedId = useId();
const inputId = computed(() => props.id ?? `slider-${generatedId}`);
const current = computed(() => value.value ?? props.min);
const pct = computed(() => {
  const span = props.max - props.min;
  return span === 0 ? 0 : Math.min(100, Math.max(0, ((current.value - props.min) / span) * 100));
});

function onInput(e: Event) {
  value.value = parseFloat((e.currentTarget as HTMLInputElement).value);
}
</script>

<template>
  <div class="slider" data-slider>
    <input
      type="range"
      :id="inputId"
      :name="name"
      class="slider__input"
      :min="min"
      :max="max"
      :step="step"
      :value="current"
      :disabled="disabled"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="current"
      :aria-label="ariaLabel"
      data-slider-input
      @input="onInput"
    />
    <div class="slider__track" aria-hidden="true">
      <div class="slider__fill" data-slider-fill :style="{ width: `${pct}%` }"></div>
    </div>
  </div>
</template>
