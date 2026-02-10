<script lang="ts">
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Search component</h2>
  <p>Search with Algolia integration, <strong>Cmd+K</strong> / <strong>Ctrl+K</strong> toggles search (open or close); Escape closes. Mobile-responsive modal. The docs site uses the <strong>Astro</strong> Search component in the layout. In a Svelte app, use the same BEM classes and integrate Algolia (or your search backend) with the same UI pattern.</p>

  <h3>Structure (BEM)</h3>
  <p>Search overlay and input. Wire <code>open</code> state to Cmd+K / Ctrl+K and Escape; connect input to your search API or Algolia.</p>
  <CodeBlock
    code={`<!-- Search overlay (toggle with Cmd+K / Ctrl+K, close with Escape) -->
<div class="search-overlay" role="dialog" aria-label="Search" hidden>
  <div class="search-overlay__backdrop" aria-hidden="true"></div>
  <div class="search-overlay__panel">
    <label for="search-input" class="sr-only">Search</label>
    <input id="search-input" type="search" class="search-overlay__input" placeholder="Search..." autocomplete="off" />
    <div class="search-overlay__results"><!-- results list --></div>
  </div>
</div>`}
    language="html"
  />

  <p><a href="/docs/components/search">Astro Search documentation</a> — Algolia setup and behavior.</p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>
