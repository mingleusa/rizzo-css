<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({ class: { type: String, default: '' } });
const rootClass = computed(() => ["slider", props.class].filter(Boolean).join(" "));
</script>

<template>
  <div :class="rootClass">
    <slot />
  </div>
</template>
