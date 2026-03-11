<script setup lang="ts">
defineProps({ class: { type: String, default: '' } });
</script>

<template>
  <div :class="["button-group", $props.class].filter(Boolean).join(" ")">
    <slot />
  </div>
</template>
