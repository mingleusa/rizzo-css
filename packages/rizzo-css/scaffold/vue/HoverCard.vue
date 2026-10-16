<script setup lang="ts">
import { computed, onBeforeUnmount, useId } from 'vue';

const props = withDefaults(
  defineProps<{ id?: string; openDelay?: number; closeDelay?: number }>(),
  { openDelay: 200, closeDelay: 100 }
);

/** `v-model:open` */
const open = defineModel<boolean>('open', { default: false });

const generatedId = useId();
const cardId = computed(() => props.id ?? `hover-card-${generatedId}`);
let openTimer: ReturnType<typeof setTimeout> | null = null;
let closeTimer: ReturnType<typeof setTimeout> | null = null;

function show() {
  if (closeTimer) clearTimeout(closeTimer);
  if (openTimer) clearTimeout(openTimer);
  openTimer = setTimeout(() => (open.value = true), props.openDelay);
}

function hide() {
  if (openTimer) clearTimeout(openTimer);
  if (closeTimer) clearTimeout(closeTimer);
  closeTimer = setTimeout(() => (open.value = false), props.closeDelay);
}

onBeforeUnmount(() => {
  if (openTimer) clearTimeout(openTimer);
  if (closeTimer) clearTimeout(closeTimer);
});
</script>

<template>
  <div class="hover-card" data-hover-card :id="cardId">
    <!-- focusin/focusout make the card reachable by keyboard as well as pointer -->
    <div data-hover-card-trigger @mouseenter="show" @mouseleave="hide" @focusin="show" @focusout="hide">
      <slot name="trigger" />
    </div>
    <div
      :class="['hover-card__content', { 'hover-card__content--open': open }]"
      role="dialog"
      :aria-hidden="!open"
      :hidden="!open"
      data-hover-card-content
      :id="`${cardId}-content`"
      @mouseenter="show"
      @mouseleave="hide"
    >
      <slot />
    </div>
  </div>
</template>
