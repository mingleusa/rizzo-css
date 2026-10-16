<script setup lang="ts">
import { computed } from 'vue';

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const props = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    name?: string;
    initials?: string;
    size?: 'sm' | 'md' | 'lg';
    shape?: 'circle' | 'square';
  }>(),
  { alt: '', name: '', initials: '', size: 'md', shape: 'circle' }
);

const displayInitials = computed(() => (props.name ? getInitials(props.name) : props.initials));
const ariaLabel = computed(
  () => props.alt || props.name || (displayInitials.value ? `Avatar: ${displayInitials.value}` : 'Avatar')
);
</script>

<template>
  <span :class="['avatar', `avatar--${size}`, `avatar--${shape}`]" role="img" :aria-label="ariaLabel">
    <img v-if="src" :src="src" :alt="alt || name || ''" class="avatar__img" loading="lazy" />
    <span v-else class="avatar__initials" aria-hidden="true">{{ displayInitials || '?' }}</span>
  </span>
</template>
