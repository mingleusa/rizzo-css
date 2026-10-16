<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId } from 'vue';

const props = defineProps<{ id?: string }>();

const generatedId = useId();
const menuId = computed(() => props.id ?? `context-menu-${generatedId}`);
const open = ref(false);
const x = ref(0);
const y = ref(0);

function closeMenu() {
  open.value = false;
  document.removeEventListener('click', closeMenu);
  document.removeEventListener('keydown', onKeydown);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMenu();
}

async function onContextMenu(e: MouseEvent) {
  e.preventDefault();
  x.value = e.clientX;
  y.value = e.clientY;
  open.value = true;
  await nextTick();
  // Register after the current event so the opening gesture does not close the menu.
  requestAnimationFrame(() => {
    document.addEventListener('click', closeMenu);
    document.addEventListener('keydown', onKeydown);
  });
}

onBeforeUnmount(closeMenu);
</script>

<template>
  <div class="context-menu" data-context-menu :id="menuId">
    <div data-context-menu-trigger @contextmenu="onContextMenu">
      <slot name="trigger" />
    </div>
    <div
      :class="['context-menu__content', { 'context-menu__content--open': open }]"
      role="menu"
      :aria-hidden="!open"
      :hidden="!open"
      data-context-menu-content
      :id="`${menuId}-content`"
      :style="open ? { left: `${x}px`, top: `${y}px` } : undefined"
    >
      <slot />
    </div>
  </div>
</template>
