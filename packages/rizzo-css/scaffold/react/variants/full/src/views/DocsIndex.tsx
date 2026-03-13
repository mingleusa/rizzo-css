import { Link } from 'react-router-dom';

export default function DocsIndex() {
  return (
    <section className="docs-overview">
      <h1 className="docs__title">Docs overview</h1>
      <p className="docs-overview__intro">
        Rizzo CSS is a design system built on semantic theming and 14 themes. One CSS codebase, 58 accessible BEM components — for <strong>Vanilla JS</strong>, <strong>Astro</strong>, <strong>Svelte</strong>, <strong>React</strong>, and <strong>Vue</strong>.
      </p>

      <h2 id="overview" className="docs-overview__h2">Overview</h2>
      <ul className="docs-overview__list">
        <li><Link to="/docs/getting-started">Getting Started</Link> — Installation, CLI, templates (CSS only | Landing | Docs | Dashboard | Full)</li>
        <li><Link to="/docs/components">Components</Link> — Browse all components by category</li>
        <li><Link to="/blocks">Blocks</Link> — Pre-built layouts and patterns</li>
        <li><Link to="/themes">Themes</Link> — 14 themes, live preview</li>
      </ul>

      <h2 id="blocks" className="docs-overview__h2">Blocks</h2>
      <ul className="docs-overview__list">
        <li><Link to="/blocks">Blocks overview</Link></li>
        <li><a href="https://rizzo-css.vercel.app/blocks/landing-hero" target="_blank" rel="noopener noreferrer">Landing hero</a></li>
        <li><a href="https://rizzo-css.vercel.app/blocks/pricing" target="_blank" rel="noopener noreferrer">Pricing cards</a></li>
        <li><a href="https://rizzo-css.vercel.app/blocks/dashboard-01" target="_blank" rel="noopener noreferrer">Dashboard with sidebar</a></li>
        <li><a href="https://rizzo-css.vercel.app/blocks/docs-layout" target="_blank" rel="noopener noreferrer">Docs layout</a></li>
        <li><a href="https://rizzo-css.vercel.app/blocks/login" target="_blank" rel="noopener noreferrer">Login</a></li>
        <li><a href="https://rizzo-css.vercel.app/blocks/signup" target="_blank" rel="noopener noreferrer">Sign up</a></li>
      </ul>

      <p className="docs-overview__footer">
        <Link to="/docs/getting-started">Getting Started</Link>
        {' · '}
        <Link to="/docs/components">Components</Link>
        {' · '}
        <Link to="/themes">Themes</Link>
      </p>
    </section>
  );
}
