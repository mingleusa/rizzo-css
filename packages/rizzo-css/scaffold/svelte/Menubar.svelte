<script lang="ts">
  interface MenubarMenuItem {
    label: string;
    href?: string;
  }

  interface MenubarItem {
    label: string;
    menu: MenubarMenuItem[];
  }

  interface Props {
    items?: MenubarItem[];
    class?: string;
  }

  let {
    items = [
      { label: 'File', menu: [{ label: 'New', href: '#' }, { label: 'Open', href: '#' }] },
      { label: 'Edit', menu: [{ label: 'Undo', href: '#' }] },
    ],
    class: className = '',
  }: Props = $props();

  let openIndex = $state<number | null>(null);
  let navRef: HTMLElement;

  function close(e?: MouseEvent) {
    if (e && navRef && navRef.contains(e.target as Node)) return;
    openIndex = null;
  }

  $effect(() => {
    if (openIndex === null) return;
    const onClose = (e: MouseEvent) => close(e);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') openIndex = null;
    };
    const t = setTimeout(() => document.addEventListener('click', onClose), 0);
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('click', onClose);
      document.removeEventListener('keydown', onKey);
    };
  });
</script>

<nav bind:this={navRef} class="menubar {className}" role="menubar" aria-label="Main menu">
  {#each items as item, i}
    <div class="menubar__item" role="none">
      <button
        type="button"
        role="menuitem"
        class="menubar__trigger"
        aria-haspopup="true"
        aria-expanded={openIndex === i}
        onclick={() => (openIndex = openIndex === i ? null : i)}
      >
        {item.label}
      </button>
      <div
        class="menubar__menu"
        role="menu"
        aria-label={item.label}
        hidden={openIndex !== i}
      >
        {#each item.menu as entry}
          {#if entry.href}
            <a href={entry.href} class="menubar__menu-item" role="menuitem">{entry.label}</a>
          {:else}
            <button type="button" class="menubar__menu-item" role="menuitem" onclick={() => (openIndex = null)}>{entry.label}</button>
          {/if}
        {/each}
      </div>
    </div>
  {/each}
</nav>
