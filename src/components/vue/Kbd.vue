<script setup lang="ts">
defineProps({ class: { type: String, default: '' } });
</script>

<template>
  <kbd :class="['kbd', $props.class].filter(Boolean).join(' ')">
    <slot />
  </kbd>
</template>
