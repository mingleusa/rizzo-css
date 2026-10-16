<script setup lang="ts">
withDefaults(defineProps<{ orientation?: 'horizontal' | 'vertical' }>(), { orientation: 'horizontal' });
</script>

<template>
  <div :class="['button-group', { 'button-group--vertical': orientation === 'vertical' }]" role="group">
    <slot />
  </div>
</template>
