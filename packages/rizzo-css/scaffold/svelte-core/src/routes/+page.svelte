<script lang="ts">
  import CopyToClipboard from '$lib/rizzo/CopyToClipboard.svelte';
  const DOCS_BASE = 'https://rizzo-css.vercel.app';
  const ADD_COMMAND = 'npx rizzo-css add <ComponentName>';
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>
<main id="main-content" class="home">
  <div class="home__container">
    <header class="home__hero">
      <h1 class="home__title">Rizzo CSS</h1>
      <p class="home__subtitle">A modern CSS design system with semantic theming, accessibility-first components, and one CLI for Vanilla, Astro, and Svelte. Start here then make it your own.</p>
      <div class="home__hero-ctas">
        <a href={DOCS_BASE + '/docs/getting-started'} class="btn btn-primary home__hero-cta" target="_blank" rel="noopener noreferrer">Get Started<span class="sr-only"> (opens in new tab)</span></a>
        <a href={DOCS_BASE + '/docs/components'} class="btn btn-outline home__hero-cta" target="_blank" rel="noopener noreferrer">View Components<span class="sr-only"> (opens in new tab)</span></a>
      </div>
    </header>

    <section class="home__features" aria-labelledby="home-features-heading">
      <h2 id="home-features-heading" class="home__section-title">Features</h2>
      <p class="home__features-intro">A complete design system that works across Vanilla, Astro, and Svelte — same CSS, same components, zero lock-in.</p>
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
          <h3>34 ready components</h3>
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
        <CopyToClipboard value={ADD_COMMAND} iconOnly buttonLabel="Copy" format="command" label="Copy command" class="home__add-command-copy" />
      </div>
    </section>

    <section class="home__docs">
      <h2 class="home__section-title">Documentation</h2>
      <div class="home__docs-grid">
        <a href={DOCS_BASE + '/docs/getting-started'} class="home__doc-card" target="_blank" rel="noopener noreferrer">
          <h3>Getting Started</h3>
          <p>Installation, project structure, and quick start guide</p>
          <span class="sr-only"> (opens in new tab)</span>
        </a>
        <a href={DOCS_BASE + '/docs/components'} class="home__doc-card" target="_blank" rel="noopener noreferrer">
          <h3>Components</h3>
          <p>Component library with usage examples and live demos</p>
          <span class="sr-only"> (opens in new tab)</span>
        </a>
        <a href={DOCS_BASE + '/docs/theming'} class="home__doc-card" target="_blank" rel="noopener noreferrer">
          <h3>Theming</h3>
          <p>Theme system, custom themes, and color format guide</p>
          <span class="sr-only"> (opens in new tab)</span>
        </a>
        <a href={DOCS_BASE + '/docs/design-system'} class="home__doc-card" target="_blank" rel="noopener noreferrer">
          <h3>Design System</h3>
          <p>Semantic variables, typography, and design principles</p>
          <span class="sr-only"> (opens in new tab)</span>
        </a>
        <a href={DOCS_BASE + '/docs/accessibility'} class="home__doc-card" target="_blank" rel="noopener noreferrer">
          <h3>Accessibility</h3>
          <p>Accessibility guidelines, utilities, and best practices</p>
          <span class="sr-only"> (opens in new tab)</span>
        </a>
        <a href={DOCS_BASE + '/docs/colors'} class="home__doc-card" target="_blank" rel="noopener noreferrer">
          <h3>Colors</h3>
          <p>Interactive color reference with multiple format options</p>
          <span class="sr-only"> (opens in new tab)</span>
        </a>
      </div>
    </section>
  </div>
</main>
