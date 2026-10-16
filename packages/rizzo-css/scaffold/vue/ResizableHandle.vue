<script setup lang="ts">
withDefaults(defineProps<{ withHandle?: boolean }>(), { withHandle: false });
</script>

<template>
  <div :class="['resizable__handle', { 'resizable__handle--with-handle': withHandle }]" data-resizable-handle></div>
</template>
