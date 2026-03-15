import Card from '@/components/rizzo/Card';
import { getComponentsByCategory } from '@/config/componentCategories';

const DOCS_BASE = 'https://rizzo-css.vercel.app';

export default function DocsComponents() {
  const categories = getComponentsByCategory();

  return (
    <div>
      <section className="docs-components-intro">
        <p className="docs-components-intro__tagline">
          Browse the collection of accessible, themeable components. Same CSS and BEM for Astro, Svelte, React, and Vanilla.
        </p>
        <p className="docs-components-intro__meta">
          Each component has live demos and code on the full docs site. Quick jump:{' '}
          <a href={`${DOCS_BASE}/docs/components`} target="_blank" rel="noopener noreferrer">Astro</a>
          {' · '}
          <a href={`${DOCS_BASE}/docs/svelte/components`} target="_blank" rel="noopener noreferrer">Svelte</a>
          {' · '}
          <a href={`${DOCS_BASE}/docs/vanilla/components`} target="_blank" rel="noopener noreferrer">Vanilla</a>.
        </p>
      </section>

      {categories.map((cat) => (
        <section key={cat.id} className="docs-component-category" id={cat.id}>
          <h2 className="docs-component-category__title">{cat.label}</h2>
          <div className="docs-component-grid">
            {cat.items.map((item) => (
              <a
                key={item.href}
                href={DOCS_BASE + item.href}
                className="component-card-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card variant="elevated">
                  <div className="card__body">
                    <h3 style={{ margin: '0 0 var(--spacing-2) 0' }}>{item.title}</h3>
                    <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: 'var(--font-size-sm)' }}>{item.description}</p>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </section>
      ))}

      <section>
        <h2>Component features</h2>
        <p>All components share: semantic theming, accessibility (keyboard + ARIA), BEM naming, responsive design, and WCAG AA compliance.</p>
      </section>
    </div>
  );
}
