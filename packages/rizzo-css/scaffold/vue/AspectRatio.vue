<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{ ratio?: number }>(), { ratio: 16 / 9 });
const paddingPercent = computed(() => (1 / props.ratio) * 100);
</script>

<template>
  <div class="aspect-ratio" :style="{ '--aspect-ratio': props.ratio, '--aspect-ratio-padding': `${paddingPercent}%` }">
    <div class="aspect-ratio__inner">
      <slot />
    </div>
  </div>
</template>
