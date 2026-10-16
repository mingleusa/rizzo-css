<script setup lang="ts">
withDefaults(
  defineProps<{ type?: 'single' | 'multiple'; orientation?: 'horizontal' | 'vertical' }>(),
  { type: 'single', orientation: 'horizontal' }
);
</script>

<template>
  <div
    :class="['toggle-group', { 'toggle-group--vertical': orientation === 'vertical' }]"
    :role="type === 'single' ? 'radiogroup' : 'group'"
    aria-label="Toggle group"
    data-toggle-group
    :data-toggle-type="type"
  >
    <slot />
  </div>
</template>
