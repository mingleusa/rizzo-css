<script lang="ts">
  import SearchIcon from './icons/Search.svelte';
  import Close from './icons/Close.svelte';
  import Cmd from './icons/Cmd.svelte';

  interface Props {
    id?: string;
  }
  let { id = 'search-main' }: Props = $props();
  let open = $state(false);
  let query = $state('');
  let panelEl = $state<HTMLElement | null>(null);
  let searchEl = $state<HTMLElement | null>(null);
  let triggerEl = $state<HTMLElement | null>(null);

  const FOCUSABLE_SEL = 'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  function getFocusable(container: HTMLElement | null): HTMLElement[] {
    if (!container) return [];
    return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SEL));
  }

  $effect(() => {
    if (!open) return;
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        open = false;
        return;
      }
      if (e.key === 'Tab' && panelEl) {
        const els = getFocusable(panelEl);
        if (els.length === 0) return;
        const first = els[0];
        const last = els[els.length - 1];
        const active = document.activeElement as HTMLElement;
        if (e.shiftKey) {
          if (active === first || !panelEl.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last || !panelEl.contains(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  let prevOpen = $state(false);
  $effect(() => {
    const nowOpen = open;
    if (prevOpen && !nowOpen && triggerEl) setTimeout(() => triggerEl!.focus(), 0);
    prevOpen = nowOpen;
  });

  $effect(() => {
    const el = searchEl;
    if (!el) return;
    const onCmdK = (e: KeyboardEvent) => {
      const isMod = e.ctrlKey || e.metaKey;
      const isK = e.key === 'k' || e.key === 'K';
      if (!isMod || !isK) return;
      const target = e.target as Node | null;
      const inOtherInput = target && !el.contains(target) && (
        (target as Element).tagName === 'INPUT' ||
        (target as Element).tagName === 'TEXTAREA' ||
        (target as HTMLElement).isContentEditable === true ||
        (target as Element).closest?.('input, textarea, [contenteditable="true"]')
      );
      if (open || !inOtherInput) {
        e.preventDefault();
        e.stopPropagation();
        open = !open;
      }
    };
    document.addEventListener('keydown', onCmdK, true);
    return () => document.removeEventListener('keydown', onCmdK, true);
  });
</script>

<div class="search" data-search bind:this={searchEl}>
  <div class="search__trigger-wrapper">
    <button
      type="button"
      class="search__trigger"
      aria-label="Open search"
      data-search-trigger
      aria-expanded={open}
      aria-controls="{id}-panel"
      bind:this={triggerEl}
      onclick={() => (open = !open)}
    >
      <SearchIcon width={20} height={20} class="search__icon" />
      <span class="search__trigger-text">Search</span>
      <kbd class="search__kbd" aria-hidden="true">
        <span class="search__kbd-modifier"><Cmd width={14} height={14} /></span>
        <kbd>K</kbd>
      </kbd>
    </button>
  </div>
  <div
    class="search__overlay"
    id="{id}-panel"
    aria-hidden={!open}
    role="dialog"
    aria-modal="true"
    data-search-overlay
    onclick={(e) => (e.target as HTMLElement) === (e.currentTarget as HTMLElement) && (open = false)}
  >
    <div
      class="search__panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="{id}-title"
      aria-hidden={!open}
      data-open={open ? 'true' : undefined}
      tabindex="-1"
      bind:this={panelEl}
    >
      <h2 id="{id}-title" class="sr-only">Search</h2>
      <div class="search__header">
        <div class="search__input-wrapper">
          <SearchIcon width={20} height={20} class="search__input-icon" aria-hidden="true" />
          <input
            type="search"
            class="search__input"
            placeholder="Search…"
            aria-label="Search"
            bind:value={query}
          />
        </div>
        <button type="button" class="search__close-btn" aria-label="Close search" onclick={() => (open = false)}>
          <Close width={20} height={20} aria-hidden="true" />
        </button>
      </div>
      <div class="search__results" role="listbox" aria-label="Search results">
        <div class="search__empty">
          <p class="search__empty-text">Start typing to search…</p>
        </div>
        <div class="search__results-list" role="group" aria-label="Sample results">
          <a href="#" class="search__result-item" tabindex={open ? 0 : -1}><div class="search__result-category">Docs</div><div class="search__result-title">Getting started</div></a>
          <a href="#" class="search__result-item" tabindex={open ? 0 : -1}><div class="search__result-category">Docs</div><div class="search__result-title">Components</div></a>
          <a href="#" class="search__result-item" tabindex={open ? 0 : -1}><div class="search__result-category">Docs</div><div class="search__result-title">Theming</div></a>
        </div>
      </div>
    </div>
  </div>
</div>
