<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    id?: string;
    title?: string;
    size?: 'sm' | 'md' | 'lg';
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
  }>(),
  { title: 'Modal', size: 'md', closeOnOverlayClick: true, closeOnEscape: true }
);

/** `v-model:open` */
const open = defineModel<boolean>('open', { default: false });

const generatedId = useId();
const modalId = computed(() => props.id ?? `modal-${generatedId}`);
const overlayEl = ref<HTMLElement | null>(null);
const modalEl = ref<HTMLElement | null>(null);
let previousActive: HTMLElement | null = null;

const FOCUSABLE = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function focusable(): HTMLElement[] {
  return modalEl.value ? Array.from(modalEl.value.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
}

function close() {
  open.value = false;
}

/** Escape closes; Tab/Shift+Tab are trapped inside the dialog. */
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.closeOnEscape) {
    e.preventDefault();
    close();
    return;
  }
  if (e.key !== 'Tab' || !modalEl.value) return;
  const items = focusable();
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement as HTMLElement | null;
  if (e.shiftKey) {
    if (active === first || !modalEl.value.contains(active)) {
      e.preventDefault();
      last.focus();
    }
  } else if (active === last || !modalEl.value.contains(active)) {
    e.preventDefault();
    first.focus();
  }
}

watch(
  open,
  async (isOpen) => {
    if (isOpen) {
      previousActive = document.activeElement as HTMLElement | null;
      await nextTick();
      (focusable()[0] ?? modalEl.value?.querySelector<HTMLElement>('[data-modal-close]'))?.focus();
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

function onOverlayClick(e: MouseEvent) {
  if (props.closeOnOverlayClick && e.target === overlayEl.value) close();
}
</script>

<template>
  <div class="modal-root">
    <div
      ref="overlayEl"
      class="modal__overlay"
      data-modal-overlay
      :aria-hidden="!open"
      :inert="open ? undefined : true"
      :hidden="!open"
      :id="`${modalId}-overlay`"
      role="presentation"
      @click="onOverlayClick"
    ></div>
    <div
      ref="modalEl"
      :class="['modal', { [`modal--${size}`]: size !== 'md' }]"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`${modalId}-title`"
      :aria-hidden="!open"
      :inert="open ? undefined : true"
      :hidden="!open"
      :id="modalId"
      data-modal
      :data-open="open || undefined"
    >
      <div class="modal__header">
        <h2 :id="`${modalId}-title`" class="modal__title">{{ title }}</h2>
        <button type="button" class="modal__close" aria-label="Close modal" data-modal-close @click="close">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="modal__body">
        <slot />
      </div>
      <div class="modal__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
