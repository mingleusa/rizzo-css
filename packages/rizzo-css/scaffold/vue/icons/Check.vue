<script setup lang="ts">
withDefaults(defineProps<{ width?: number; height?: number }>(), { width: 16, height: 16 });
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="icon rizzo-icon"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
</template>

<style>
  .rizzo-icon {
    color: var(--icon);
  }
</style>
