<script lang="ts">
  import CodeBlock from '../CodeBlock.svelte';

  // Build code string so Svelte does not interpret {open} / {query} as expressions
  const o = '{open}';
  const notOpen = '{!open}';
  const setOpenFalse = '() => (open = false)';
  const toggleOpen = '() => (open = !open)';
  const query = '{query}';
  const searchStructureCode =
    `<div class="search" data-search>
  <div class="search__trigger-wrapper">
    <button
      type="button"
      class="search__trigger"
      aria-label="Open search"
      aria-expanded=` +
    o +
    `
      aria-controls="search-results-panel"
      onclick=` +
    toggleOpen +
    `
    >
      <SearchIcon class="search__icon" width={20} height={20} />
      <span class="search__trigger-text">Search</span>
      <kbd class="search__kbd" aria-hidden="true"><span class="search__kbd-modifier"><!-- Cmd icon --></span><kbd>K</kbd></kbd>
    </button>
  </div>
  <div
    class="search__overlay"
    data-search-overlay
    aria-hidden=` +
    notOpen +
    `
    role="dialog"
    aria-modal="true"
  >
    <div
      class="search__panel"
      id="search-results-panel"
      tabindex="-1"
      aria-hidden=` +
    notOpen +
    `
    >
      <div class="search__header">
        <input
          type="search"
          class="search__input"
          placeholder="Search documentation..."
          aria-label="Search"
          data-search-input
          bind:value=` +
    query +
    `
        />
        <button type="button" class="search__close-btn" aria-label="Close" onclick=` +
    setOpenFalse +
    `>
          Close
        </button>
      </div>
      <div class="search__results" role="listbox" aria-label="Search results">
        <!-- search__empty / search__results-list / search__loading / search__no-results -->
      </div>
    </div>
  </div>
</div>`;
</script>

<section>
  <h2>Search component</h2>
  <p>An accessible search overlay with Algolia integration (or client-side fallback). The docs site uses the <strong>Astro</strong> Search in the layout. In a Svelte app, use the same BEM classes and data attributes; wire open/close state, <strong>Cmd+K</strong> / <strong>Ctrl+K</strong>, and your search API or Algolia client.</p>

  <h3>Live example</h3>
  <p>Search is in the navbar (top of page) — click the search icon or press <kbd>Ctrl+K</kbd> / <kbd>Cmd+K</kbd>. You can also use the <strong>standalone search above</strong> (same as navbar).</p>

  <h3>Features</h3>
  <ul>
    <li><strong>Full-screen overlay</strong> — Centered search panel; overlay covers the viewport when open.</li>
    <li><strong>Keyboard shortcut</strong> — <kbd>Ctrl+K</kbd> / <kbd>Cmd+K</kbd> to open or close.</li>
    <li><strong>Escape</strong> — Closes search; restore focus to trigger.</li>
    <li>Close button (X) with screen reader label; optional text label on mobile.</li>
    <li>Live results as you type; Algolia integration or client-side search.</li>
    <li>Full keyboard navigation (Arrow keys, Enter, Tab) in results.</li>
    <li>Mobile responsive; full-width panel on small screens. Mutually exclusive with mobile menu on the docs site.</li>
    <li>ARIA (dialog, listbox, searchbox), focus trap, and live regions for screen readers.</li>
  </ul>

  <h3>Key BEM classes and data attributes</h3>
  <p>Use these so styles and any shared scripts (e.g. Cmd+K) work. Toggle <code>aria-hidden</code> on the overlay and panel from your open state.</p>
  <ul>
    <li><code>search</code> — root wrapper; use <code>data-search</code> if you reuse the Astro script pattern.</li>
    <li><code>search__trigger-wrapper</code> / <code>search__trigger</code> — button to open search; <code>aria-expanded</code>, <code>aria-controls</code> = panel id.</li>
    <li><code>search__overlay</code> — full-screen overlay; <code>data-search-overlay</code>; set <code>aria-hidden</code> from state.</li>
    <li><code>search__panel</code> — dialog panel; <code>role="dialog"</code>, <code>aria-modal="true"</code>, <code>aria-labelledby</code> (title id), <code>tabindex="-1"</code> for focus trap.</li>
    <li><code>search__header</code> — contains input row and close button.</li>
    <li><code>search__input-wrapper</code> / <code>search__input</code> — search input; <code>aria-controls</code> = results list id; <code>data-search-input</code> for script hooks.</li>
    <li><code>search__clear</code> — clear input button; <code>data-search-clear</code>.</li>
    <li><code>search__close-btn</code> — close overlay button.</li>
    <li><code>search__results</code> — container for results; <code>role="listbox"</code>, <code>aria-label="Search results"</code>, <code>aria-live="polite"</code>.</li>
    <li><code>search__empty</code>, <code>search__loading</code>, <code>search__no-results</code> — states; use <code>hidden</code> or conditional render.</li>
    <li><code>search__result-item</code> / <code>search__result-title</code> / <code>search__result-category</code> / <code>search__result-content</code> — result row and parts.</li>
  </ul>

  <h3>Structure example (simplified)</h3>
  <p>Minimal markup; add IDs, ARIA, and data attributes as needed. Control visibility with <code>aria-hidden</code> and optional classes.</p>
  <CodeBlock
    code={searchStructureCode}
    language="svelte"
  />

  <h3>Implementing in Svelte</h3>
  <ul>
    <li><strong>Open state:</strong> e.g. <code>let open = $state(false)</code>. Set <code>aria-expanded</code> on the trigger and <code>{'aria-hidden={!open}'}</code> on overlay and panel.</li>
    <li><strong>Cmd+K / Ctrl+K:</strong> Add a <code>keydown</code> listener on <code>window</code> or <code>document</code>; if <code>key === 'k'</code> and (metaKey or ctrlKey), prevent default and toggle <code>{'open'}</code>.</li>
    <li><strong>Escape:</strong> When overlay is open, handle Escape to set <code>{'open = false'}</code> and call <code>triggerEl.focus()</code>.</li>
    <li><strong>Focus trap:</strong> When open, focus the input; trap Tab inside the panel; on close, restore focus to the trigger.</li>
    <li><strong>Search:</strong> Connect <code>query</code> to Algolia (e.g. <code>searchClient</code> + index) or to client-side filtering; render results with <code>search__result-item</code> and siblings. Use <code>aria-activedescendant</code> for keyboard-highlighted result.</li>
  </ul>

  <h3>Keyboard shortcuts</h3>
  <ul>
    <li><kbd>Ctrl+K</kbd> / <kbd>Cmd+K</kbd> — Open or close search</li>
    <li><kbd>Escape</kbd> — Close search</li>
    <li><kbd>Arrow Down</kbd> — Next result</li>
    <li><kbd>Arrow Up</kbd> — Previous result</li>
    <li><kbd>Enter</kbd> — Open selected result</li>
  </ul>

  <p><a href="/docs/components/search">Full Astro Search documentation</a> — Algolia setup, props, and the inline script you can port to Svelte.</p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  kbd {
    display: inline-block;
    padding: var(--spacing-0-125) var(--spacing-0-375);
    background-color: var(--background-alt);
    border: var(--outline-width) solid var(--border);
    border-radius: var(--radius);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    line-height: 1;
  }
</style>
