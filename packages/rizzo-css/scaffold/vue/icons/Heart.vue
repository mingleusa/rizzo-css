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
    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
  </svg>
</template>

<style>
  .rizzo-icon {
    color: var(--icon);
  }
</style>
