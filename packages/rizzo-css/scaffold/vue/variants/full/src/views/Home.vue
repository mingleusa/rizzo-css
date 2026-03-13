<template>
  <main id="main-content" class="home">
    <div class="home__container">
      <header class="home__hero">
        <h1 class="home__title">Rizzo CSS</h1>
        <p class="home__subtitle">
          A modern CSS design system with semantic theming, accessibility-first components, and one CLI for Vanilla, Astro, Svelte, React, and Vue. Start here then make it your own.
        </p>
        <div class="home__hero-ctas">
          <router-link to="/docs/getting-started" class="btn btn-primary home__hero-cta">Get Started</router-link>
          <router-link to="/docs/components" class="btn btn-outline home__hero-cta">View Components</router-link>
        </div>
      </header>

      <section class="home__features" aria-labelledby="home-features-heading">
        <h2 id="home-features-heading" class="home__section-title">Features</h2>
        <p class="home__features-intro">A complete design system that works across Vanilla, Astro, Svelte, React, and Vue — same CSS, same components, zero lock-in.</p>
        <div class="home__features-featured">
          <div class="home__card home__card--featured">
            <span class="home__card-icon" aria-hidden="true">Themes</span>
            <h3>14 beautiful themes</h3>
            <p>7 dark and 7 light with OKLCH for perceptual uniformity. System preference, persistence, and a unique icon per theme.</p>
          </div>
          <div class="home__card home__card--featured">
            <span class="home__card-icon" aria-hidden="true">A11y</span>
            <h3>Accessibility first</h3>
            <p>WCAG AA compliant with full keyboard navigation, ARIA, focus management, and screen reader support.</p>
          </div>
          <div class="home__card home__card--featured">
            <span class="home__card-icon" aria-hidden="true">Components</span>
            <h3>All components</h3>
            <p>Navbar, Settings, Theme Switcher, Font Switcher, Modal, Dropdown, Tabs, Forms, and more — all accessible and themeable.</p>
          </div>
        </div>
        <h3 class="home__features-supporting-label">And more</h3>
        <div class="home__grid home__grid--supporting">
          <div class="home__card home__card--supporting">
            <h3>Semantic variables</h3>
            <p>CSS variables that adapt to themes. No hardcoded colors; override once, update everywhere.</p>
          </div>
          <div class="home__card home__card--supporting">
            <h3>PostCSS powered</h3>
            <p>Imports, autoprefixing, and production minification. Fits into any build pipeline.</p>
          </div>
          <div class="home__card home__card--supporting">
            <h3>Typography & spacing</h3>
            <p>Scaling font sizes, weights, line heights, and a consistent spacing scale (0–24).</p>
          </div>
          <div class="home__card home__card--supporting">
            <h3>Responsive & utilities</h3>
            <p>Mobile-first breakpoints and utility classes for layout, display, and flexbox.</p>
          </div>
        </div>
      </section>

      <section class="home__add-command" aria-labelledby="home-add-command-heading">
        <h2 id="home-add-command-heading" class="home__section-title">Add a component</h2>
        <p class="home__features-intro" style="margin-bottom: var(--spacing-4);">Add any component from the CLI:</p>
        <div class="home__add-command-block">
          <pre><code>npx rizzo-css add &lt;ComponentName&gt;</code></pre>
          <CopyToClipboard
            :value="ADD_COMMAND"
            icon-only
            button-label="Copy"
            format="command"
            label="Copy command"
            class="home__add-command-copy"
          />
        </div>
      </section>

      <section class="home__docs">
        <h2 class="home__section-title">Documentation</h2>
        <div class="home__docs-grid">
          <router-link to="/docs/getting-started" class="home__doc-card">
            <h3>Getting Started</h3>
            <p>Installation, project structure, and quick start guide</p>
          </router-link>
          <router-link to="/docs/components" class="home__doc-card">
            <h3>Components</h3>
            <p>Component library with usage examples and live demos</p>
          </router-link>
          <router-link to="/themes" class="home__doc-card">
            <h3>Themes</h3>
            <p>Theme system, 14 themes, and live preview</p>
          </router-link>
          <router-link to="/blocks" class="home__doc-card">
            <h3>Blocks</h3>
            <p>Pre-built layouts: landing, pricing, dashboard, docs, login, signup</p>
          </router-link>
          <router-link to="/docs" class="home__doc-card">
            <h3>Docs Overview</h3>
            <p>Condensed index of documentation and links</p>
          </router-link>
          <a href="https://rizzo-css.vercel.app/docs/theming" class="home__doc-card" target="_blank" rel="noopener noreferrer">
            <h3>Theming (full docs)</h3>
            <p>Custom themes, persistence, color format — on main site</p>
            <span class="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import CopyToClipboard from '@/components/rizzo/CopyToClipboard.vue';

const ADD_COMMAND = 'npx rizzo-css add <ComponentName>';
</script>

<style scoped>
.home__container {
  width: 100%;
  max-width: var(--container-default);
  margin: 0 auto;
  padding: 0 var(--content-padding-x);
}
.home__hero {
  text-align: center;
  padding: var(--spacing-10) 0;
}
.home__title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--text);
  margin: 0 0 var(--spacing-4);
  line-height: var(--line-height-tight);
}
.home__subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-dim);
  margin: 0 auto var(--spacing-6);
  max-width: 42ch;
  line-height: var(--line-height-relaxed);
}
.home__hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
  justify-content: center;
}
.home__hero-cta {
  text-decoration: none;
}
.home__section-title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  margin: var(--spacing-10) 0 var(--spacing-4);
  color: var(--text);
}
.home__features-intro {
  margin: 0 0 var(--spacing-6);
  color: var(--text-dim);
  line-height: var(--line-height-relaxed);
}
.home__features-featured,
.home__grid--supporting {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
  gap: var(--spacing-6);
  margin: var(--spacing-6) 0;
}
.home__card {
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--background-alt);
}
.home__card h3 {
  margin: 0 0 var(--spacing-2);
  font-size: var(--font-size-lg);
  color: var(--text);
}
.home__card p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--text-dim);
  line-height: var(--line-height-relaxed);
}
.home__card-icon {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--accent-fg);
  margin-bottom: var(--spacing-2);
}
.home__features-supporting-label {
  font-size: var(--font-size-lg);
  margin: var(--spacing-8) 0 var(--spacing-4);
  color: var(--text);
}
.home__add-command-block {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-2);
  flex-wrap: wrap;
}
.home__add-command-block pre {
  flex: 1;
  min-width: 0;
  margin: 0;
  background: var(--background-alt);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  overflow-x: auto;
  font-size: var(--font-size-sm);
}
.home__docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
  gap: var(--spacing-4);
  margin-top: var(--spacing-6);
}
.home__doc-card {
  display: block;
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--background-alt);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s, transform 0.15s;
}
.home__doc-card:hover {
  border-color: var(--accent-fg);
  transform: translateY(-2px);
}
.home__doc-card h3 {
  margin: 0 0 var(--spacing-2);
  font-size: var(--font-size-lg);
  color: var(--text);
}
.home__doc-card p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--text-dim);
  line-height: var(--line-height-relaxed);
}
</style>
