<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{ defaultSize?: number }>(), { defaultSize: 50 });
const size = computed(() => Math.min(100, Math.max(0, props.defaultSize)));
</script>

<template>
  <div class="resizable__pane" data-resizable-pane :style="{ flex: `1 1 ${size}%` }">
    <slot />
  </div>
</template>
