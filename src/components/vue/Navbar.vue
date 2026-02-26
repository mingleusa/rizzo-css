<script setup lang="ts">
import { computed } from "vue";
const props = withDefaults(defineProps<{ class?: string }>(), { class: "" });
const rootClass = computed(() => ["navbar", props.class].filter(Boolean).join(" "));
</script>

<template>
  <div :class="rootClass">
    <slot />
  </div>
</template>
