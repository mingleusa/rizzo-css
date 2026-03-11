<script setup lang="ts">
defineProps({ class: { type: String, default: '' } });
</script>

<template>
  <div :class="["slider", $props.class].filter(Boolean).join(" ")">
    <slot />
  </div>
</template>
