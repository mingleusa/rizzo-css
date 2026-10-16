<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import Close from './icons/Close.vue';

const props = withDefaults(
  defineProps<{ id?: string; title?: string; side?: 'top' | 'right' | 'bottom' | 'left' }>(),
  { side: 'right' }
);

/** `v-model:open` */
const open = defineModel<boolean>('open', { default: false });

const generatedId = useId();
const sheetId = computed(() => props.id ?? `sheet-${generatedId}`);
const sheetEl = ref<HTMLElement | null>(null);
let previousActive: HTMLElement | null = null;

function close() {
  open.value = false;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault();
    close();
  }
}

watch(
  open,
  async (isOpen) => {
    if (isOpen) {
      previousActive = document.activeElement as HTMLElement | null;
      await nextTick();
      sheetEl.value?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus();
      document.addEventListener('keydown', onKeydown);
    } else {
      document.removeEventListener('keydown', onKeydown);
      previousActive?.focus();
      previousActive = null;
    }
  },
  { flush: 'post' }
);

onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
</script>

<template>
  <div class="sheet-root">
    <div
      :class="['sheet__overlay', { 'sheet__overlay--open': open }]"
      data-sheet-overlay
      :aria-hidden="!open"
      :id="`${sheetId}-overlay`"
      role="presentation"
      @click="close"
    ></div>
    <div
      ref="sheetEl"
      :class="['sheet', `sheet--${side}`, { 'sheet--open': open }]"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="title ? `${sheetId}-title` : undefined"
      :aria-hidden="!open"
      :id="sheetId"
      data-sheet
      :hidden="!open"
    >
      <div class="sheet__content">
        <div v-if="title" class="sheet__header">
          <h2 :id="`${sheetId}-title`" class="sheet__title">{{ title }}</h2>
          <button type="button" class="sheet__close" aria-label="Close" @click="close">
            <Close :width="20" :height="20" />
          </button>
        </div>
        <div class="sheet__body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
