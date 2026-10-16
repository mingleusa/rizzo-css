<script setup lang="ts">
withDefaults(defineProps<{ title?: string; description?: string }>(), { title: 'No results' });
</script>

<template>
  <div class="empty">
    <div v-if="$slots.icon" class="empty__icon">
      <slot name="icon" />
    </div>
    <h3 class="empty__title">{{ title }}</h3>
    <p v-if="description" class="empty__description">{{ description }}</p>
    <div v-if="$slots.action" class="empty__action">
      <slot name="action" />
    </div>
  </div>
</template>
