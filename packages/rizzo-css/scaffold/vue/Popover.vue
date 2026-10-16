<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue';

const props = defineProps<{ id?: string }>();

/** `v-model:open` */
const open = defineModel<boolean>('open', { default: false });

const generatedId = useId();
const popoverId = computed(() => props.id ?? `popover-${generatedId}`);
const rootEl = ref<HTMLElement | null>(null);
let outsideTimer: ReturnType<typeof setTimeout> | null = null;

function onDocumentClick(e: MouseEvent) {
  if (rootEl.value && !rootEl.value.contains(e.target as Node)) open.value = false;
}

function onDocumentKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false;
}

function stopListening() {
  if (outsideTimer) clearTimeout(outsideTimer);
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

watch(open, (isOpen) => {
  stopListening();
  if (isOpen) {
    // Defer so the click that opened the popover does not immediately close it.
    outsideTimer = setTimeout(() => document.addEventListener('click', onDocumentClick), 0);
    document.addEventListener('keydown', onDocumentKeydown);
  }
});

onBeforeUnmount(stopListening);
</script>

<template>
  <div ref="rootEl" class="popover" data-popover :id="popoverId">
    <button type="button" data-popover-trigger @click.prevent="open = !open">
      <slot name="trigger" />
    </button>
    <div
      :class="['popover__content', { 'popover__content--open': open }]"
      role="dialog"
      aria-modal="false"
      :aria-hidden="!open"
      :hidden="!open"
      data-popover-content
      :id="`${popoverId}-content`"
    >
      <slot />
    </div>
  </div>
</template>
