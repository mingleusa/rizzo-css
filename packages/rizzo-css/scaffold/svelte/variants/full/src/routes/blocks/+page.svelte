<script lang="ts">
  import Card from '$lib/rizzo/Card.svelte';

  const blocks = [
    { href: '/blocks/landing-hero', title: 'Landing hero', desc: 'Marketing hero with headline, subtitle, and primary CTAs. Typography and button tokens.', meta: 'Hero · Buttons · Typography' },
    { href: '/blocks/pricing', title: 'Pricing cards', desc: 'Three-tier pricing section using Card, Badge, and buttons. Theme-aware.', meta: 'Card · Badge · Buttons' },
    { href: '/blocks/dashboard-01', title: 'Dashboard', desc: 'App dashboard with sidebar, stat cards, and data table. Uses Dashboard, Card, and Table components.', meta: 'Dashboard · Sidebar · Cards · Table' },
    { href: '/blocks/docs-layout', title: 'Docs layout', desc: 'Documentation layout with a sidebar nav and main content area. Same pattern as this docs site.', meta: 'Docs Sidebar · Layout' },
    { href: '/blocks/login', title: 'Login', desc: 'Centered login form on a muted background. Brand link, email/password fields, and footer links.', meta: 'Form · Button · Tokens' },
    { href: '/blocks/signup', title: 'Sign up', desc: 'Centered sign-up form with name, email, password, and link to sign in. Same tokens as Login.', meta: 'Form · Button · Tokens' },
  ];
  const DOCS_BASE = 'https://rizzo-css.vercel.app';
</script>

<svelte:head>
  <title>Blocks — Rizzo CSS</title>
</svelte:head>

<section class="blocks-index__browse">
  <h1 class="docs__title">Blocks</h1>
  <p class="blocks-index__browse-desc">
    Pre-built layouts and patterns using Rizzo components and design tokens. Use them as starting points for dashboards, docs sites, auth screens, and app shells.
  </p>
</section>

<section>
  <h2 class="blocks-index__section-label">Featured</h2>
  <div class="blocks-index__grid">
    {#each blocks as block}
      <a href="{DOCS_BASE}{block.href}" class="block-card-link" target="_blank" rel="noopener noreferrer">
        <Card variant="elevated">
          <div class="card__body">
            <h3 style="margin: 0 0 var(--spacing-2) 0;">{block.title}</h3>
            <p style="margin: 0; color: var(--text-dim); font-size: var(--font-size-sm);">{block.desc}</p>
            <span class="block-card-meta" style="margin-top: var(--spacing-2); font-size: var(--font-size-xs); color: var(--text-dim);">{block.meta}</span>
          </div>
        </Card>
      </a>
    {/each}
  </div>
</section>

<section>
  <h2>Scaffold from CLI</h2>
  <p>When you create a new project or add to existing, choose a <strong>template</strong>: <strong>CSS only</strong>, <strong>Landing</strong>, <strong>Docs</strong>, <strong>Dashboard</strong>, or <strong>Full</strong>. Full clones the entire docs site with home, docs, components, blocks, and themes.</p>
  <pre><code>npx rizzo-css init
# → Choose framework (Vanilla, Astro, Svelte, React, Vue)
# → Choose template: CSS only | Landing | Docs | Dashboard | Full</code></pre>
</section>

<style>
  .blocks-index__browse {
    margin-bottom: var(--section-spacing);
  }
  .blocks-index__browse-desc {
    margin: 0;
    color: var(--text-dim);
    font-size: var(--font-size-sm);
  }
  .blocks-index__section-label {
    font-size: var(--text-lg);
    font-weight: 600;
    margin: 0 0 var(--page-header-margin-bottom);
    color: var(--text);
  }
  .blocks-index__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
    gap: var(--spacing-6);
    margin: var(--page-header-margin-bottom) 0;
  }
  .block-card-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform var(--transition-base);
  }
  .block-card-link :global(.card) {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .block-card-link :global(.card .card__body) {
    flex: 1;
  }
  .block-card-link:hover {
    transform: translateY(calc(-1 * var(--spacing-0-125)));
  }
  .block-card-link:hover :global(.card__body h3) {
    color: var(--accent-fg);
  }
  pre {
    background: var(--background-alt);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-4);
    overflow-x: auto;
    font-size: var(--font-size-sm);
  }
  pre code {
    background: none;
    padding: 0;
  }
</style>
