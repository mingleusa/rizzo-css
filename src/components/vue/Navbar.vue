<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({ class: { type: String, default: '' } });
const rootClass = computed(() => ["navbar", props.class].filter(Boolean).join(" "));
</script>

<template>
  <nav :class="rootClass" role="navigation" aria-label="Main navigation">
    <slot />
  </nav>
</template>
