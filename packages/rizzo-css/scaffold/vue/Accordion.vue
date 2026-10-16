<script setup lang="ts">
import { computed, ref, useId } from 'vue';

export interface AccordionItem {
  id: string;
  title: string;
  /** HTML string rendered inside the panel (or use the `item-<id>` slot) */
  content?: string;
}

const props = withDefaults(
  defineProps<{
    items: AccordionItem[];
    id?: string;
    allowMultiple?: boolean;
    /** Item id(s) expanded initially (default: the first item) */
    defaultExpanded?: string | string[];
  }>(),
  { allowMultiple: false }
);

const generatedId = useId();
const accordionId = computed(() => props.id ?? `accordion-${generatedId}`);
const rootEl = ref<HTMLElement | null>(null);

function initialExpanded(): Set<string> {
  if (props.defaultExpanded === undefined) return new Set(props.items[0] ? [props.items[0].id] : []);
  if (typeof props.defaultExpanded === 'string') return new Set([props.defaultExpanded]);
  return new Set(props.defaultExpanded);
}
const expanded = ref<Set<string>>(initialExpanded());

function toggle(itemId: string) {
  const next = new Set(expanded.value);
  if (props.allowMultiple) {
    if (next.has(itemId)) next.delete(itemId);
    else next.add(itemId);
  } else {
    const wasOpen = next.has(itemId);
    next.clear();
    if (!wasOpen) next.add(itemId);
  }
  expanded.value = next;
}

function onKeydown(e: KeyboardEvent, itemId: string, index: number) {
  const triggers = rootEl.value?.querySelectorAll<HTMLElement>('[data-accordion-trigger]') ?? [];
  const last = triggers.length - 1;
  let target = index;
  switch (e.key) {
    case 'ArrowDown':
      target = Math.min(index + 1, last);
      break;
    case 'ArrowUp':
      target = Math.max(index - 1, 0);
      break;
    case 'Home':
      target = 0;
      break;
    case 'End':
      target = last;
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      toggle(itemId);
      return;
    default:
      return;
  }
  e.preventDefault();
  if (target !== index) triggers[target]?.focus();
}
</script>

<template>
  <div ref="rootEl" class="accordion" :data-accordion="accordionId" :data-allow-multiple="allowMultiple ? 'true' : 'false'">
    <div v-for="(item, i) in items" :key="item.id" class="accordion__item" data-accordion-item :data-item-id="item.id">
      <h3 class="accordion__heading">
        <button
          type="button"
          :class="['accordion__trigger', { 'accordion__trigger--expanded': expanded.has(item.id) }]"
          :id="`${accordionId}-trigger-${item.id}`"
          :aria-expanded="expanded.has(item.id)"
          :aria-controls="`${accordionId}-panel-${item.id}`"
          data-accordion-trigger
          @click="toggle(item.id)"
          @keydown="onKeydown($event, item.id, i)"
        >
          <span class="accordion__title">{{ item.title }}</span>
          <span class="accordion__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        :class="['accordion__panel', { 'accordion__panel--expanded': expanded.has(item.id) }]"
        :id="`${accordionId}-panel-${item.id}`"
        role="region"
        :aria-labelledby="`${accordionId}-trigger-${item.id}`"
        :hidden="!expanded.has(item.id)"
        data-accordion-panel
      >
        <div class="accordion__panel-inner">
          <div class="accordion__panel-content">
            <slot :name="`item-${item.id}`">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-if="item.content" v-html="item.content"></span>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
