<script setup lang="ts">
withDefaults(defineProps<{ class?: string }>(), { class: "" });
</script>

<template>
  <div :class="["sound-effects", $props.class].filter(Boolean).join(" ")">
    <slot />
  </div>
</template>
