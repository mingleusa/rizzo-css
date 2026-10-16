<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    currentPage: number;
    totalPages: number;
    /** URL template; `{page}` is replaced with the page number */
    hrefTemplate?: string;
    showFirstLast?: boolean;
    maxVisible?: number;
  }>(),
  { hrefTemplate: '?page={page}', showFirstLast: true, maxVisible: 5 }
);

function href(page: number): string {
  return props.hrefTemplate.replace(/\{page\}/g, String(page));
}

const pageItems = computed<(number | 'ellipsis')[]>(() => {
  const { totalPages: total, currentPage: current, maxVisible } = props;
  if (total <= 1) return [];
  if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | 'ellipsis')[] = [1];
  const delta = Math.max(0, Math.floor((maxVisible - 2) / 2));
  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);
  if (start > 2) items.push('ellipsis');
  for (let p = start; p <= end; p++) {
    if (p !== 1 && p !== total) items.push(p);
  }
  if (end < total - 1) items.push('ellipsis');
  items.push(total);
  return items;
});
const hasPrev = computed(() => props.currentPage > 1);
const hasNext = computed(() => props.currentPage < props.totalPages);
</script>

<template>
  <nav class="pagination" aria-label="Pagination">
    <ul class="pagination__list">
      <li v-if="showFirstLast && totalPages > 1" class="pagination__item">
        <a v-if="hasPrev" class="pagination__link pagination__link--prev" :href="href(1)" aria-label="First page">First</a>
        <span v-else class="pagination__link pagination__link--prev pagination__link--disabled" aria-disabled="true">First</span>
      </li>
      <li class="pagination__item">
        <a v-if="hasPrev" class="pagination__link pagination__link--prev" :href="href(currentPage - 1)" aria-label="Previous page">Previous</a>
        <span v-else class="pagination__link pagination__link--prev pagination__link--disabled" aria-disabled="true">Previous</span>
      </li>
      <li v-for="(item, i) in pageItems" :key="`${item}-${i}`" class="pagination__item">
        <span v-if="item === 'ellipsis'" class="pagination__ellipsis" aria-hidden="true">…</span>
        <span v-else-if="item === currentPage" class="pagination__link pagination__link--current" aria-current="page">{{ item }}</span>
        <a v-else class="pagination__link" :href="href(item)" :aria-label="`Page ${item}`">{{ item }}</a>
      </li>
      <li class="pagination__item">
        <a v-if="hasNext" class="pagination__link pagination__link--next" :href="href(currentPage + 1)" aria-label="Next page">Next</a>
        <span v-else class="pagination__link pagination__link--next pagination__link--disabled" aria-disabled="true">Next</span>
      </li>
      <li v-if="showFirstLast && totalPages > 1" class="pagination__item">
        <a v-if="hasNext" class="pagination__link pagination__link--next" :href="href(totalPages)" aria-label="Last page">Last</a>
        <span v-else class="pagination__link pagination__link--next pagination__link--disabled" aria-disabled="true">Last</span>
      </li>
    </ul>
  </nav>
</template>
