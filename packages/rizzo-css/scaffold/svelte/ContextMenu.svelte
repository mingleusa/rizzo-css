<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    id?: string;
    class?: string;
    children?: Snippet;
    trigger?: Snippet;
  }

  let { id: ctxId, class: className = '', children, trigger }: Props = $props();

  const id = $derived(ctxId ?? `context-menu-${Math.random().toString(36).slice(2, 9)}`);
  let open = $state(false);
  let x = $state(0);
  let y = $state(0);
  let contentEl: HTMLDivElement;

  function handleContextMenu(e: MouseEvent) {
    e.preventDefault();
    x = e.clientX;
    y = e.clientY;
    open = true;
    requestAnimationFrame(() => document.addEventListener('click', closeMenu));
  }

  function closeMenu() {
    open = false;
    document.removeEventListener('click', closeMenu);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') closeMenu();
  }

  $effect(() => {
    if (open && contentEl) {
      contentEl.style.left = `${x}px`;
      contentEl.style.top = `${y}px`;
    }
  });
</script>

<div class="context-menu {className}" data-context-menu {id}>
  <div data-context-menu-trigger oncontextmenu={handleContextMenu}>
    {@render trigger?.()}
  </div>
  <div
    bind:this={contentEl}
    class="context-menu__content {open ? 'context-menu__content--open' : ''}"
    role="menu"
    aria-hidden={!open}
    hidden={!open}
    data-context-menu-content
    id="{id}-content"
    onkeydown={handleKeydown}
  >
    {@render children?.()}
  </div>
</div>
