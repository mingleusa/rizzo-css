<script setup lang="ts">
defineProps({ class: { type: String, default: '' } });
</script>

<template>
  <div :class="["back-to-top", $props.class].filter(Boolean).join(" ")">
    <slot />
  </div>
</template>
