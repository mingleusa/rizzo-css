<script lang="ts">
  import Card from '$lib/rizzo/Card.svelte';
  import { getComponentsByCategory } from '../../../config/componentCategories';

  const categories = getComponentsByCategory();
  const DOCS_BASE = 'https://rizzo-css.vercel.app';
</script>

<svelte:head>
  <title>Components — Rizzo CSS</title>
</svelte:head>

<section class="docs-components-intro">
  <h1 class="docs__title">Components</h1>
  <p class="docs-components-intro__tagline">
    Browse the collection of accessible, themeable components. Same CSS and BEM for Astro, Svelte, and Vanilla.
  </p>
  <p class="docs-components-intro__meta">
    Each component has live demos and code on the full docs site. Quick jump: <a href="{DOCS_BASE}/docs/components" target="_blank" rel="noopener noreferrer">Astro</a> · <a href="{DOCS_BASE}/docs/svelte/components" target="_blank" rel="noopener noreferrer">Svelte</a> · <a href="{DOCS_BASE}/docs/vanilla/components" target="_blank" rel="noopener noreferrer">Vanilla</a>.
  </p>
</section>

<section>
  <h2 class="docs-components-browse-title">Browse by category</h2>
  {#each categories as cat}
    <div class="docs-component-category" id={cat.id}>
      <h3 class="docs-component-category__title">{cat.label}</h3>
      <div class="docs-component-grid">
        {#each cat.items as item}
          <a href="{DOCS_BASE}{item.href}" class="component-card-link" target="_blank" rel="noopener noreferrer">
            <Card variant="elevated">
              <div class="card__body">
                <h3 style="margin: 0 0 var(--spacing-2) 0;">{item.title}</h3>
                <p style="margin: 0; color: var(--text-dim); font-size: var(--font-size-sm);">{item.description}</p>
              </div>
            </Card>
          </a>
        {/each}
      </div>
    </div>
  {/each}
</section>

<section>
  <h2>Component features</h2>
  <p>All components share: semantic theming, accessibility (keyboard + ARIA), BEM naming, responsive design, and WCAG AA compliance.</p>
</section>

<style>
  .docs-components-intro {
    margin-bottom: var(--spacing-10);
  }
  .docs-components-intro__tagline {
    font-size: var(--text-lg);
    color: var(--text-dim);
    margin: 0 0 var(--spacing-2);
    line-height: var(--line-height-relaxed);
  }
  .docs-components-intro__meta {
    font-size: var(--font-size-sm);
    color: var(--text-dim);
    margin: 0;
  }
  .docs-components-browse-title {
    font-size: var(--text-lg);
    font-weight: 600;
    margin: 0 0 var(--spacing-6);
    color: var(--text);
  }
  .docs-component-category {
    margin-bottom: var(--spacing-10);
  }
  .docs-component-category:last-of-type {
    margin-bottom: 0;
  }
  .docs-component-category__title {
    font-size: var(--text-lg);
    font-weight: 600;
    margin: 0 0 var(--spacing-4);
    color: var(--text);
  }
  .docs-component-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--spacing-70), 1fr));
    gap: var(--spacing-6);
    margin: 0;
  }
  .component-card-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform var(--transition-base);
  }
  .component-card-link :global(.card) {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .component-card-link :global(.card .card__body) {
    flex: 1;
  }
  .component-card-link:hover {
    transform: translateY(calc(-1 * var(--spacing-0-125)));
  }
  .component-card-link:hover :global(.card__body h3) {
    color: var(--accent-fg);
  }
  @media (width <= 640px) {
    .docs-component-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
