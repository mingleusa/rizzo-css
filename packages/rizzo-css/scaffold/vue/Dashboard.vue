<script setup lang="ts">
defineProps({ class: { type: String, default: '' } });
</script>

<template>
  <div :class="["dashboard", $props.class].filter(Boolean).join(" ")">
    <slot />
  </div>
</template>
