<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  dir: { type: String, default: 'ltr' },
  class: { type: String, default: '' },
});

const dirClass = computed(() => (props.dir === 'rtl' ? 'direction--rtl' : 'direction--ltr'));
const rootClass = computed(() => ['direction', dirClass.value, props.class].filter(Boolean).join(' '));
</script>

<template>
  <div :class="rootClass" :dir="dir">
    <slot />
  </div>
</template>
