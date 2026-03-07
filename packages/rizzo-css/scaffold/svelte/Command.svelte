<script lang="ts">
  interface CommandItem {
    id: string;
    label: string;
    shortcut?: string;
  }

  interface Props {
    triggerLabel?: string;
    searchPlaceholder?: string;
    items?: CommandItem[];
    class?: string;
  }

  let {
    triggerLabel = 'Open command palette (⌘K)',
    searchPlaceholder = 'Search…',
    items = [],
    class: className = '',
  }: Props = $props();

  let open = $state(false);
  let query = $state('');
  let selectedIndex = $state(0);
  let searchEl: HTMLInputElement;

  const filtered = $derived(items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())));

  $effect(() => {
    if (filtered.length) selectedIndex = 0;
  });

  function close() {
    open = false;
    query = '';
    selectedIndex = 0;
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      open = !open;
    }
  }

  $effect(() => {
    if (!open) return;
    document.addEventListener('keydown', onKey);
    queueMicrotask(() => searchEl?.focus());
    return () => document.removeEventListener('keydown', onKey);
  });
</script>

<div class="command-root {className}">
  <button type="button" class="btn btn-outline" onclick={() => (open = true)} aria-haspopup="dialog" aria-expanded={open}>
    {triggerLabel}
  </button>
  {#if open}
    <div class="command__overlay" aria-hidden="false" role="presentation" onclick={close}></div>
    <div class="command__dialog" role="dialog" aria-modal="true" aria-label="Command palette">
      <div class="command__search-wrap">
        <input
          type="search"
          class="command__search"
          placeholder={searchPlaceholder}
          autocomplete="off"
        bind:value={query}
            bind:this={searchEl}
        />
      </div>
      <div class="command__list" role="listbox">
        {#each filtered as item, i}
          <button
            type="button"
            class="command__item"
            role="option"
            aria-selected={i === selectedIndex}
            onclick={close}
            onmouseenter={() => (selectedIndex = i)}
          >
            {item.label}
            {#if item.shortcut}<kbd>{item.shortcut}</kbd>{/if}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
