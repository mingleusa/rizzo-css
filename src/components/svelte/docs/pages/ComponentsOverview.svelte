<script lang="ts">
  import Card from '../../Card.svelte';
  import { getCategoriesWithItems } from '../../../../config/componentCategories';
  import { REACT_COMPONENT_META } from '../../../../config/reactComponents';

  const metaBySlug = Object.fromEntries(REACT_COMPONENT_META.map((m) => [m.slug, m]));
  const categories = getCategoriesWithItems('/docs/svelte', (slug) => {
    const m = metaBySlug[slug];
    return m ? { title: m.title, description: m.description } : { title: slug, description: '' };
  });
</script>

<section>
  <h2>Component library</h2>
  <p>These components are built with Svelte and use the same Rizzo CSS classes and variables. Each page includes live examples and usage snippets.</p>
  <p><strong>Every framework:</strong> Each component also has an <a href="/docs/components">Astro</a> doc page (live demos + “Using classes” HTML). Vanilla uses the same HTML and BEM from the Astro Usage sections. Use the framework switcher at the top to switch between Astro, Svelte, React, Vue, and Vanilla docs.</p>
</section>

<section>
  <h2>Browse by category</h2>
  {#each categories as cat}
    <div class="docs-component-category" id={cat.id}>
      <h3 class="docs-component-category__title">{cat.label}</h3>
      <div class="docs-component-grid">
        {#each cat.items as item}
          <a href={item.href} class="component-card-link">
            <Card variant="elevated">
              <div class="card__body">
                <h3 class="card-title">{item.title}</h3>
                <p class="card-desc">{item.description}</p>
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
  .docs-component-category {
    margin-bottom: var(--spacing-10);
  }
  .docs-component-category:last-child {
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
    margin: 0 0 var(--spacing-8) 0;
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
  .component-card-link :global(.card__body .card-title) {
    margin: 0 0 var(--spacing-2) 0;
  }
  .component-card-link :global(.card__body .card-desc) {
    margin: 0;
    color: var(--text-dim);
    font-size: var(--font-size-sm);
  }
  .component-card-link:hover :global(.card-title) {
    color: var(--accent-fg);
  }
  @media (width <= 640px) {
    .docs-component-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
