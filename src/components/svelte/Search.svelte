<script lang="ts">
  interface Props {
    id?: string;
  }
  let { id = 'search-main' }: Props = $props();
  let open = $state(false);
  let query = $state('');
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
  >
    <div class="search__panel">
      <input
        type="search"
        class="search__input"
        placeholder="Search…"
        aria-label="Search"
        bind:value={query}
      />
    </div>
  </div>
</div>
