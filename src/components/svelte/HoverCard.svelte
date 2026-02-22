<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    id?: string;
    openDelay?: number;
    closeDelay?: number;
    open?: boolean;
    class?: string;
    children?: Snippet;
    trigger?: Snippet;
  }

  let {
    id: hoverId,
    openDelay = 200,
    closeDelay = 100,
    open = $bindable(false),
    class: className = '',
    children,
    trigger,
  }: Props = $props();

  const id = $derived(hoverId ?? `hover-card-${Math.random().toString(36).slice(2, 9)}`);
  let openT: ReturnType<typeof setTimeout> | null = null;
  let closeT: ReturnType<typeof setTimeout> | null = null;

  function openContent() {
    if (closeT) clearTimeout(closeT);
    openT = setTimeout(() => (open = true), openDelay);
  }

  function closeContent() {
    if (openT) clearTimeout(openT);
    closeT = setTimeout(() => (open = false), closeDelay);
  }
</script>

<div class="hover-card {className}" data-hover-card {id}>
  <div data-hover-card-trigger onmouseenter={openContent} onmouseleave={closeContent}>
    {@render trigger?.()}
  </div>
  <div
    class="hover-card__content {open ? 'hover-card__content--open' : ''}"
    role="dialog"
    aria-hidden={!open}
    hidden={!open}
    data-hover-card-content
    id="{id}-content"
    onmouseenter={openContent}
    onmouseleave={closeContent}
  >
    {@render children?.()}
  </div>
</div>
