<script lang="ts">
  interface Props {
    id?: string;
  }
  let { id = 'search-main' }: Props = $props();
  let open = $state(false);
  let query = $state('');
  let panelEl = $state<HTMLElement | null>(null);

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
</script>

<div class="search" data-search>
  <div class="search__trigger-wrapper">
    <button
      type="button"
      class="search__trigger"
      aria-label="Open search"
      aria-expanded={open}
      aria-controls="{id}-panel"
      onclick={() => (open = !open)}
    >
      <span class="search__trigger-text">Search</span>
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
    <div class="search__panel" bind:this={panelEl}>
      <input
        type="search"
        class="search__input"
        placeholder="Search…"
        aria-label="Search"
        bind:value={query}
      />
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
