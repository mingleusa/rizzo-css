<script lang="ts">
  const prefix = '/docs';
</script>

<svelte:head>
  <title>Docs overview — Rizzo CSS</title>
</svelte:head>

<section class="docs-overview">
  <h1 class="docs__title">Docs overview</h1>
  <p class="docs-overview__intro">
    Rizzo CSS is a design system built on semantic theming and 14 themes. One CSS codebase, 53 accessible BEM components — for <strong>Vanilla JS</strong>, <strong>Astro</strong>, <strong>Svelte</strong>, <strong>React</strong>, and <strong>Vue</strong>.
  </p>

  <h2 id="overview" class="docs-overview__h2">Overview</h2>
  <ul class="docs-overview__list">
    <li><a href="{prefix}/getting-started">Getting Started</a> — Installation, CLI, templates (CSS only | Landing | Docs | Dashboard | Full)</li>
    <li><a href="{prefix}/components">Components</a> — Browse all components by category</li>
    <li><a href="/blocks">Blocks</a> — Pre-built layouts and patterns</li>
    <li><a href="/themes">Themes</a> — 14 themes, live preview</li>
  </ul>

  <h2 id="blocks" class="docs-overview__h2">Blocks</h2>
  <ul class="docs-overview__list">
    <li><a href="/blocks">Blocks overview</a></li>
    <li><a href="/blocks/landing-hero">Landing hero</a></li>
    <li><a href="/blocks/pricing">Pricing cards</a></li>
    <li><a href="/blocks/dashboard-01">Dashboard with sidebar</a></li>
    <li><a href="/blocks/docs-layout">Docs layout</a></li>
    <li><a href="/blocks/login">Login</a></li>
    <li><a href="/blocks/signup">Sign up</a></li>
  </ul>

  <p class="docs-overview__footer">
    <a href="{prefix}/getting-started">Getting Started</a> · <a href="{prefix}/components">Components</a> · <a href="/themes">Themes</a>
  </p>
</section>

<style>
  .docs-overview__intro {
    margin: 0 0 var(--spacing-6);
    color: var(--text);
    line-height: var(--line-height-relaxed);
  }
  .docs-overview__h2 {
    font-size: var(--font-size-2xl);
    font-weight: 600;
    margin: var(--spacing-10) 0 var(--spacing-4);
    color: var(--text);
  }
  .docs-overview__list {
    margin: 0 0 var(--spacing-6);
    padding-left: var(--spacing-8);
  }
  .docs-overview__list li {
    margin-bottom: var(--spacing-2);
  }
  .docs-overview__footer {
    margin-top: var(--spacing-10);
    padding-top: var(--spacing-6);
    border-top: 1px solid var(--border);
    color: var(--text-dim);
    font-size: var(--font-size-sm);
  }
  .docs-overview__footer a {
    margin-right: var(--spacing-2);
  }
</style>
