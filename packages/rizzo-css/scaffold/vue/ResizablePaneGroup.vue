<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue';

const props = withDefaults(
  defineProps<{ id?: string; direction?: 'horizontal' | 'vertical' }>(),
  { direction: 'horizontal' }
);

const generatedId = useId();
const groupId = computed(() => props.id ?? `resizable-${generatedId}`);
const rootEl = ref<HTMLElement | null>(null);
const MIN_PERCENT = 10;
let cleanups: Array<() => void> = [];

function paneSize(el: Element): number {
  const basis = getComputedStyle(el).flexBasis;
  if (basis?.endsWith('%')) return parseFloat(basis);
  const rect = el.getBoundingClientRect();
  const parent = el.parentElement?.getBoundingClientRect();
  if (!parent) return 50;
  return props.direction === 'horizontal' ? (rect.width / parent.width) * 100 : (rect.height / parent.height) * 100;
}

function init() {
  const root = rootEl.value;
  if (!root) return;
  const panes = Array.from(root.querySelectorAll<HTMLElement>('[data-resizable-pane]'));
  const handles = Array.from(root.querySelectorAll<HTMLElement>('[data-resizable-handle]'));
  if (panes.length < 2 || handles.length !== panes.length - 1) return;

  handles.forEach((handle, i) => {
    let startX = 0;
    let startY = 0;
    let startA = 0;
    let startB = 0;

    const onMove = (e: MouseEvent) => {
      const box = root.getBoundingClientRect();
      const delta = props.direction === 'horizontal' ? ((e.clientX - startX) / box.width) * 100 : ((e.clientY - startY) / box.height) * 100;
      let a = startA + delta;
      let b = startB - delta;
      if (a < MIN_PERCENT) {
        a = MIN_PERCENT;
        b = 100 - MIN_PERCENT;
      }
      if (b < MIN_PERCENT) {
        b = MIN_PERCENT;
        a = 100 - MIN_PERCENT;
      }
      panes[i].style.flex = `1 1 ${a}%`;
      panes[i + 1].style.flex = `1 1 ${b}%`;
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    const onDown = (e: MouseEvent) => {
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
      startA = paneSize(panes[i]);
      startB = paneSize(panes[i + 1]);
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    };
    handle.addEventListener('mousedown', onDown);
    cleanups.push(() => {
      handle.removeEventListener('mousedown', onDown);
      onUp();
    });
  });
}

onMounted(async () => {
  await nextTick();
  init();
});
onBeforeUnmount(() => {
  cleanups.forEach((fn) => fn());
  cleanups = [];
});
</script>

<template>
  <div
    ref="rootEl"
    :class="['resizable__pane-group', `resizable__pane-group--${direction}`]"
    :id="groupId"
    data-resizable-group
    :data-direction="direction"
  >
    <slot />
  </div>
</template>
