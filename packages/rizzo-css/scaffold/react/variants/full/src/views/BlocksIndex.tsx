import Card from '@/components/rizzo/Card';

const DOCS_BASE = 'https://rizzo-css.vercel.app';

const blocks = [
  { href: '/blocks/landing-hero', title: 'Landing hero', desc: 'Marketing hero with headline, subtitle, and primary CTAs. Typography and button tokens.', meta: 'Hero · Buttons · Typography' },
  { href: '/blocks/pricing', title: 'Pricing cards', desc: 'Three-tier pricing section using Card, Badge, and buttons. Theme-aware.', meta: 'Card · Badge · Buttons' },
  { href: '/blocks/dashboard-01', title: 'Dashboard', desc: 'App dashboard with sidebar, stat cards, and data table. Uses Dashboard, Card, and Table components.', meta: 'Dashboard · Sidebar · Cards · Table' },
  { href: '/blocks/docs-layout', title: 'Docs layout', desc: 'Documentation layout with a sidebar nav and main content area. Same pattern as this docs site.', meta: 'Docs Sidebar · Layout' },
  { href: '/blocks/login', title: 'Login', desc: 'Centered login form on a muted background. Brand link, email/password fields, and footer links.', meta: 'Form · Button · Tokens' },
  { href: '/blocks/signup', title: 'Sign up', desc: 'Centered sign-up form with name, email, password, and link to sign in. Same tokens as Login.', meta: 'Form · Button · Tokens' },
];

export default function BlocksIndex() {
  return (
    <>
      <section className="blocks-index__browse">
        <h1 className="docs__title">Blocks</h1>
        <p className="blocks-index__browse-desc">
          Pre-built layouts and patterns using Rizzo components and design tokens. Use them as starting points for dashboards, docs sites, auth screens, and app shells.
        </p>
      </section>

      <section>
        <h2 className="blocks-index__section-label">Featured</h2>
        <div className="blocks-index__grid">
          {blocks.map((block) => (
            <a
              key={block.href}
              href={DOCS_BASE + block.href}
              className="block-card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card variant="elevated">
                <div className="card__body">
                  <h3 style={{ margin: '0 0 var(--spacing-2) 0' }}>{block.title}</h3>
                  <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: 'var(--font-size-sm)' }}>{block.desc}</p>
                  <span className="block-card-meta" style={{ marginTop: 'var(--spacing-2)', fontSize: 'var(--font-size-xs)', color: 'var(--text-dim)' }}>{block.meta}</span>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2>Scaffold from CLI</h2>
        <p>When you create a new project or add to existing, choose a <strong>template</strong>: <strong>CSS only</strong>, <strong>Landing</strong>, <strong>Docs</strong>, <strong>Dashboard</strong>, or <strong>Full</strong>. Full clones the entire docs site with home, docs, components, blocks, and themes.</p>
        <pre><code>{`npx rizzo-css init
# → Choose framework (Vanilla, Astro, Svelte, React, Vue)
# → Choose template: CSS only | Landing | Docs | Dashboard | Full`}</code></pre>
      </section>
    </>
  );
}
