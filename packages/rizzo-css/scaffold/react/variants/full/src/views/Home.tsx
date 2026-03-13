import { Link } from 'react-router-dom';
import CopyToClipboard from '@/components/rizzo/CopyToClipboard';

const ADD_COMMAND = 'npx rizzo-css add <ComponentName>';

export default function Home() {
  return (
    <main id="main-content" className="home">
      <div className="home__container">
        <header className="home__hero">
          <h1 className="home__title">Rizzo CSS</h1>
          <p className="home__subtitle">
            A modern CSS design system with semantic theming, accessibility-first components, and one CLI for Vanilla, Astro, Svelte, React, and Vue. Start here then make it your own.
          </p>
          <div className="home__hero-ctas">
            <Link to="/docs/getting-started" className="btn btn-primary home__hero-cta">Get Started</Link>
            <Link to="/docs/components" className="btn btn-outline home__hero-cta">View Components</Link>
          </div>
        </header>

        <section className="home__features" aria-labelledby="home-features-heading">
          <h2 id="home-features-heading" className="home__section-title">Features</h2>
          <p className="home__features-intro">A complete design system that works across Vanilla, Astro, Svelte, React, and Vue — same CSS, same components, zero lock-in.</p>
          <div className="home__features-featured">
            <div className="home__card home__card--featured">
              <span className="home__card-icon" aria-hidden="true">Themes</span>
              <h3>14 beautiful themes</h3>
              <p>7 dark and 7 light with OKLCH for perceptual uniformity. System preference, persistence, and a unique icon per theme.</p>
            </div>
            <div className="home__card home__card--featured">
              <span className="home__card-icon" aria-hidden="true">A11y</span>
              <h3>Accessibility first</h3>
              <p>WCAG AA compliant with full keyboard navigation, ARIA, focus management, and screen reader support.</p>
            </div>
            <div className="home__card home__card--featured">
              <span className="home__card-icon" aria-hidden="true">Components</span>
              <h3>All components</h3>
              <p>Navbar, Settings, Theme Switcher, Font Switcher, Modal, Dropdown, Tabs, Forms, and more — all accessible and themeable.</p>
            </div>
          </div>
          <h3 className="home__features-supporting-label">And more</h3>
          <div className="home__grid home__grid--supporting">
            <div className="home__card home__card--supporting">
              <h3>Semantic variables</h3>
              <p>CSS variables that adapt to themes. No hardcoded colors; override once, update everywhere.</p>
            </div>
            <div className="home__card home__card--supporting">
              <h3>PostCSS powered</h3>
              <p>Imports, autoprefixing, and production minification. Fits into any build pipeline.</p>
            </div>
            <div className="home__card home__card--supporting">
              <h3>Typography & spacing</h3>
              <p>Scaling font sizes, weights, line heights, and a consistent spacing scale (0–24).</p>
            </div>
            <div className="home__card home__card--supporting">
              <h3>Responsive & utilities</h3>
              <p>Mobile-first breakpoints and utility classes for layout, display, and flexbox.</p>
            </div>
          </div>
        </section>

        <section className="home__add-command" aria-labelledby="home-add-command-heading">
          <h2 id="home-add-command-heading" className="home__section-title">Add a component</h2>
          <p className="home__features-intro" style={{ marginBottom: 'var(--spacing-4)' }}>Add any component from the CLI:</p>
          <div className="home__add-command-block">
            <pre><code>npx rizzo-css add &lt;ComponentName&gt;</code></pre>
            <CopyToClipboard value={ADD_COMMAND} iconOnly buttonLabel="Copy" format="command" label="Copy command" className="home__add-command-copy" />
          </div>
        </section>

        <section className="home__docs">
          <h2 className="home__section-title">Documentation</h2>
          <div className="home__docs-grid">
            <Link to="/docs/getting-started" className="home__doc-card">
              <h3>Getting Started</h3>
              <p>Installation, project structure, and quick start guide</p>
            </Link>
            <Link to="/docs/components" className="home__doc-card">
              <h3>Components</h3>
              <p>Component library with usage examples and live demos</p>
            </Link>
            <Link to="/themes" className="home__doc-card">
              <h3>Themes</h3>
              <p>Theme system, 14 themes, and live preview</p>
            </Link>
            <Link to="/blocks" className="home__doc-card">
              <h3>Blocks</h3>
              <p>Pre-built layouts: landing, pricing, dashboard, docs, login, signup</p>
            </Link>
            <Link to="/docs" className="home__doc-card">
              <h3>Docs Overview</h3>
              <p>Condensed index of documentation and links</p>
            </Link>
            <a href="https://rizzo-css.vercel.app/docs/theming" className="home__doc-card" target="_blank" rel="noopener noreferrer">
              <h3>Theming (full docs)</h3>
              <p>Custom themes, persistence, color format — on main site</p>
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
