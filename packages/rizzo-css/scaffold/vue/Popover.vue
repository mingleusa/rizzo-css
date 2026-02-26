<script setup lang="ts">
withDefaults(defineProps<{ class?: string }>(), { class: "" });
</script>

<template>
  <div :class="["popover", $props.class].filter(Boolean).join(" ")">
    <slot />
  </div>
</template>
