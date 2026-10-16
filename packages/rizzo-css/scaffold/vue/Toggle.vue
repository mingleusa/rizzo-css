<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  disabled: { type: Boolean, default: false },
  type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
  value: { type: String, default: undefined },
  ariaLabel: { type: String, default: undefined },
});

/** `v-model:pressed` */
const pressed = defineModel<boolean>('pressed', { default: false });

function onClick() {
  if (!props.disabled) pressed.value = !pressed.value;
}
</script>

<template>
  <button
    :type="type"
    :class="['toggle', { 'toggle--pressed': pressed }]"
    :aria-pressed="pressed"
    :disabled="disabled"
    :value="value"
    :aria-label="ariaLabel"
    data-toggle
    @click="onClick"
  >
    <slot />
  </button>
</template>
