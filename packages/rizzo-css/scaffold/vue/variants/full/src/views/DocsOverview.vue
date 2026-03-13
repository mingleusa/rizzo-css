<template>
  <section class="docs-overview">
    <h1 class="docs__title">Docs overview</h1>
    <p class="docs-overview__intro">
      Rizzo CSS is a design system built on semantic theming and 14 themes. One CSS codebase, 58 accessible BEM components — for <strong>Vanilla JS</strong>, <strong>Astro</strong>, <strong>Svelte</strong>, <strong>React</strong>, and <strong>Vue</strong>.
    </p>

    <h2 id="overview" class="docs-overview__h2">Overview</h2>
    <ul class="docs-overview__list">
      <li><router-link to="/docs/getting-started">Getting Started</router-link> — Installation, CLI, templates (CSS only | Landing | Docs | Dashboard | Full)</li>
      <li><router-link to="/docs/components">Components</router-link> — Browse all components by category</li>
      <li><router-link to="/blocks">Blocks</router-link> — Pre-built layouts and patterns</li>
      <li><router-link to="/themes">Themes</router-link> — 14 themes, live preview</li>
    </ul>

    <h2 id="blocks" class="docs-overview__h2">Blocks</h2>
    <ul class="docs-overview__list">
      <li><router-link to="/blocks">Blocks overview</router-link></li>
      <li><a href="https://rizzo-css.vercel.app/blocks/landing-hero" target="_blank" rel="noopener noreferrer">Landing hero</a></li>
      <li><a href="https://rizzo-css.vercel.app/blocks/pricing" target="_blank" rel="noopener noreferrer">Pricing cards</a></li>
      <li><a href="https://rizzo-css.vercel.app/blocks/dashboard-01" target="_blank" rel="noopener noreferrer">Dashboard with sidebar</a></li>
      <li><a href="https://rizzo-css.vercel.app/blocks/docs-layout" target="_blank" rel="noopener noreferrer">Docs layout</a></li>
      <li><a href="https://rizzo-css.vercel.app/blocks/login" target="_blank" rel="noopener noreferrer">Login</a></li>
      <li><a href="https://rizzo-css.vercel.app/blocks/signup" target="_blank" rel="noopener noreferrer">Sign up</a></li>
    </ul>

    <p class="docs-overview__footer">
      <router-link to="/docs/getting-started">Getting Started</router-link>
      ·
      <router-link to="/docs/components">Components</router-link>
      ·
      <router-link to="/themes">Themes</router-link>
    </p>
  </section>
</template>

<style scoped>
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
