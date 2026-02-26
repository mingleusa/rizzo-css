<script setup lang="ts">
withDefaults(defineProps<{ class?: string }>(), { class: '' });
</script>

<template>
  <kbd :class="['kbd', $props.class].filter(Boolean).join(' ')">
    <slot />
  </kbd>
</template>
