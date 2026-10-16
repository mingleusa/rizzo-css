<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';

const props = withDefaults(
  defineProps<{ id?: string; title?: string; description?: string }>(),
  { title: 'Are you sure?' }
);

/** `v-model:open` */
const open = defineModel<boolean>('open', { default: false });

const generatedId = useId();
const dialogId = computed(() => props.id ?? `alert-dialog-${generatedId}`);
const dialogEl = ref<HTMLElement | null>(null);
let previousActive: HTMLElement | null = null;

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault();
    open.value = false;
  }
}

watch(
  open,
  async (isOpen) => {
    if (isOpen) {
      previousActive = document.activeElement as HTMLElement | null;
      await nextTick();
      dialogEl.value?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus();
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
  <div class="alert-dialog-root">
    <div
      :class="['alert-dialog__overlay', { 'alert-dialog__overlay--open': open }]"
      data-alert-dialog-overlay
      :aria-hidden="!open"
      :id="`${dialogId}-overlay`"
      role="presentation"
      @click="open = false"
    ></div>
    <div
      ref="dialogEl"
      class="alert-dialog"
      role="alertdialog"
      aria-modal="true"
      :aria-labelledby="`${dialogId}-title`"
      :aria-describedby="description ? `${dialogId}-desc` : undefined"
      :aria-hidden="!open"
      :id="dialogId"
      data-alert-dialog
      :hidden="!open"
    >
      <div class="alert-dialog__content">
        <h2 :id="`${dialogId}-title`" class="alert-dialog__title">{{ title }}</h2>
        <p v-if="description" :id="`${dialogId}-desc`" class="alert-dialog__description">{{ description }}</p>
        <div class="alert-dialog__actions">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>
