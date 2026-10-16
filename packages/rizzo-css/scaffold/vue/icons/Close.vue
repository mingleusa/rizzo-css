<script setup lang="ts">
withDefaults(defineProps<{ width?: number; height?: number }>(), { width: 20, height: 20 });
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
</template>

<style>
  .rizzo-icon {
    color: var(--icon);
  }
</style>
