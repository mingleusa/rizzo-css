<script setup lang="ts">
withDefaults(defineProps<{ class?: string }>(), { class: "" });
</script>

<template>
  <div :class="["search", $props.class].filter(Boolean).join(" ")">
    <slot />
  </div>
</template>
