<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    id?: string;
    direction?: 'horizontal' | 'vertical';
    class?: string;
    children?: Snippet;
  }

  let { id: groupId, direction = 'horizontal', class: className = '', children }: Props = $props();

  const id = $derived(groupId ?? `resizable-${Math.random().toString(36).slice(2, 9)}`);
  let rootEl: HTMLDivElement;

  function getSize(el: Element): number {
    const style = getComputedStyle(el);
    const basis = style.flexBasis;
    if (basis?.endsWith('%')) return parseFloat(basis);
    const rect = el.getBoundingClientRect();
    const parent = el.parentElement;
    if (!parent) return 50;
    const parentRect = parent.getBoundingClientRect();
    return direction === 'horizontal'
      ? (rect.width / parentRect.width) * 100
      : (rect.height / parentRect.height) * 100;
  }

  function initResize() {
    const root = rootEl;
    if (!root) return;
    const panes = Array.from(root.querySelectorAll('[data-resizable-pane]'));
    const handles = Array.from(root.querySelectorAll('[data-resizable-handle]'));
    if (panes.length < 2 || handles.length !== panes.length - 1) return;

    function setSizes(pct1: number, pct2: number, idx: number) {
      (panes[idx] as HTMLElement).style.flex = `1 1 ${pct1}%`;
      (panes[idx + 1] as HTMLElement).style.flex = `1 1 ${pct2}%`;
    }

    handles.forEach((handle, i) => {
      let startX: number, startY: number, startPct1: number, startPct2: number;
      function onMove(e: MouseEvent) {
        const parent = root.getBoundingClientRect();
        const delta =
          direction === 'horizontal'
            ? ((e.clientX - startX) / parent.width) * 100
            : ((e.clientY - startY) / parent.height) * 100;
        let p1 = startPct1 + delta;
        let p2 = startPct2 - delta;
        const min = 10;
        if (p1 < min) {
          p1 = min;
          p2 = 100 - min;
        }
        if (p2 < min) {
          p2 = min;
          p1 = 100 - min;
        }
        setSizes(p1, p2, i);
      }
      function onUp() {
        document.removeEventListener('mousemove', onMove as EventListener);
        document.removeEventListener('mouseup', onUp);
      }
      handle.addEventListener('mousedown', (e: Event) => {
        const ev = e as MouseEvent;
        ev.preventDefault();
        startX = ev.clientX;
        startY = ev.clientY;
        startPct1 = getSize(panes[i]);
        startPct2 = getSize(panes[i + 1]);
        document.addEventListener('mousemove', onMove as EventListener);
        document.addEventListener('mouseup', onUp);
      });
    });
  }

  $effect(() => {
    if (rootEl) initResize();
  });
</script>

<div
  bind:this={rootEl}
  class="resizable__pane-group resizable__pane-group--{direction} {className}"
  {id}
  data-resizable-group
  data-direction={direction}
>
  {@render children?.()}
</div>
