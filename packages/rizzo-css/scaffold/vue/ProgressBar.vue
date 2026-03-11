<script setup lang="ts">
defineProps({ class: { type: String, default: '' } });
</script>

<template>
  <div :class="["progress-bar", $props.class].filter(Boolean).join(" ")">
    <slot />
  </div>
</template>
