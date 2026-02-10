<script lang="ts">
  import CodeBlock from '../CodeBlock.svelte';
</script>

<section>
  <h2>Navbar component</h2>
  <p>Responsive navigation bar with dropdown menus (Docs, Components, Themes), search, and settings. The docs site uses the <strong>Astro</strong> Navbar in the layout. In a Svelte app, apply the same BEM classes (<code>navbar</code>, <code>navbar__container</code>, <code>navbar__menu</code>, etc.) and structure.</p>

  <h3>Structure (BEM)</h3>
  <p>Use this structure and classes in your Svelte template; wire dropdown open/close and mobile menu with Svelte state.</p>
  <CodeBlock
    code={`<nav class="navbar">
  <div class="navbar__container">
    <a href="/" class="navbar__brand">Site name</a>
    <button type="button" class="navbar__menu-toggle" aria-label="Toggle menu" aria-expanded="false">...</button>
    <div class="navbar__menu">
      <div class="navbar__item navbar__item--dropdown">...</div>
      <a href="/search" class="navbar__item">Search</a>
      <button type="button" class="navbar__item" aria-label="Settings">...</button>
    </div>
  </div>
</nav>`}
    language="html"
  />

  <p><a href="/docs/components/navbar">Astro Navbar documentation</a> — full structure, dropdowns, and mobile behavior.</p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>
