<script setup lang="ts">
withDefaults(defineProps<{ orientation?: 'horizontal' | 'vertical' }>(), { orientation: 'horizontal' });
</script>

<template>
  <div :class="['separator', `separator--${orientation}`]" role="separator" :aria-orientation="orientation"></div>
</template>
