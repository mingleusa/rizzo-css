<script setup lang="ts">
withDefaults(defineProps<{ class?: string }>(), { class: "" });
</script>

<template>
  <div :class="["alert", $props.class].filter(Boolean).join(" ")">
    <slot />
  </div>
</template>
