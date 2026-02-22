<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    id?: string;
    open?: boolean;
    class?: string;
    children?: Snippet;
    trigger?: Snippet;
  }

  let {
    id: popoverId,
    open = $bindable(false),
    class: className = '',
    children,
    trigger,
  }: Props = $props();

  const id = $derived(popoverId ?? `popover-${Math.random().toString(36).slice(2, 9)}`);

  function toggle(e: MouseEvent) {
    e.preventDefault();
    open = !open;
  }

  function handleClickOutside(e: MouseEvent) {
    const target = e.target as Node;
    if (target && !document.getElementById(id)?.contains(target)) open = false;
  }

  $effect(() => {
    if (open) {
      const t = setTimeout(() => document.addEventListener('click', handleClickOutside), 0);
      return () => {
        clearTimeout(t);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  });
</script>

<div class="popover {className}" data-popover id={id}>
  <button type="button" data-popover-trigger onclick={toggle}>
    {@render trigger?.()}
  </button>
  <div
    class="popover__content {open ? 'popover__content--open' : ''}"
    role="dialog"
    aria-modal="false"
    aria-hidden={!open}
    hidden={!open}
    data-popover-content
    id={`${id}-content`}
    onkeydown={(e) => e.key === 'Escape' && (open = false)}
  >
    {@render children?.()}
  </div>
</div>
