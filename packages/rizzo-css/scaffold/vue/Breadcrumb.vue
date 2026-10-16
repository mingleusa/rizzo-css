<script setup lang="ts">
import { computed } from 'vue';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

const props = withDefaults(
  defineProps<{
    items: BreadcrumbItem[];
    /** 'chevron' (icon), 'slash', 'arrow', or any custom character */
    separator?: 'chevron' | 'slash' | 'arrow' | (string & {});
  }>(),
  { separator: 'chevron' }
);

const separatorVariant = computed(() =>
  props.separator === 'slash' ? 'breadcrumb--slash' : props.separator === 'arrow' ? 'breadcrumb--arrow' : 'breadcrumb--chevron'
);
const separatorChar = computed(() =>
  props.separator === 'slash' ? '/' : props.separator === 'arrow' ? '›' : props.separator || '›'
);
const useIcon = computed(() => props.separator === 'chevron');
</script>

<template>
  <nav :class="['breadcrumb', separatorVariant]" aria-label="Breadcrumb">
    <ol class="breadcrumb__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="['breadcrumb__item', { 'breadcrumb__item--current': index === items.length - 1 || !item.href }]"
      >
        <span v-if="index === items.length - 1 || !item.href" class="breadcrumb__current" aria-current="page">{{ item.label }}</span>
        <a v-else class="breadcrumb__link" :href="item.href">{{ item.label }}</a>
        <span v-if="index !== items.length - 1" class="breadcrumb__separator" aria-hidden="true">
          <svg
            v-if="useIcon"
            class="breadcrumb__separator-icon"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          <template v-else>{{ separatorChar }}</template>
        </span>
      </li>
    </ol>
  </nav>
</template>
