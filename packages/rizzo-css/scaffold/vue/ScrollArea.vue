<script setup lang="ts">
withDefaults(defineProps<{ orientation?: 'vertical' | 'horizontal' }>(), { orientation: 'vertical' });
</script>

<template>
  <div :class="['scroll-area', { 'scroll-area--horizontal': orientation === 'horizontal' }]">
    <div class="scroll-area__viewport" tabindex="0">
      <slot />
    </div>
  </div>
</template>
