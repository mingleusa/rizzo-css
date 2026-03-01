/**
 * Copy-paste code snippets for block pages, per framework.
 * Used by block pages (landing-hero, pricing, dashboard-01, docs-layout, login, signup) with FrameworkCodeTabs.
 * All six blocks have astro, svelte, react, vue, and vanilla snippets.
 */

export const LANDING_HERO_SNIPPETS = {
  astro: `<header class="landing-hero">
  <h1 class="landing-hero__title">Build something great</h1>
  <p class="landing-hero__subtitle">A themeable, accessible design system. Same CSS across frameworks.</p>
  <div class="landing-hero__ctas">
    <a href="/docs/getting-started" class="btn btn-primary">Get started</a>
    <a href="/docs/components" class="btn btn-outline">View components</a>
  </div>
</header>`,
  svelte: `<header class="landing-hero">
  <h1 class="landing-hero__title">Build something great</h1>
  <p class="landing-hero__subtitle">A themeable, accessible design system. Same CSS across frameworks.</p>
  <div class="landing-hero__ctas">
    <a href="/docs/getting-started" class="btn btn-primary">Get started</a>
    <a href="/docs/components" class="btn btn-outline">View components</a>
  </div>
</header>`,
  react: `export function LandingHero() {
  return (
    <header className="landing-hero">
      <h1 className="landing-hero__title">Build something great</h1>
      <p className="landing-hero__subtitle">A themeable, accessible design system. Same CSS across frameworks.</p>
      <div className="landing-hero__ctas">
        <a href="/docs/getting-started" className="btn btn-primary">Get started</a>
        <a href="/docs/components" className="btn btn-outline">View components</a>
      </div>
    </header>
  );
}`,
  vue: `<template>
  <header class="landing-hero">
    <h1 class="landing-hero__title">Build something great</h1>
    <p class="landing-hero__subtitle">A themeable, accessible design system. Same CSS across frameworks.</p>
    <div class="landing-hero__ctas">
      <a href="/docs/getting-started" class="btn btn-primary">Get started</a>
      <a href="/docs/components" class="btn btn-outline">View components</a>
    </div>
  </header>
</template>`,
  vanilla: `<header class="landing-hero">
  <h1 class="landing-hero__title">Build something great</h1>
  <p class="landing-hero__subtitle">A themeable, accessible design system. Same CSS across frameworks.</p>
  <div class="landing-hero__ctas">
    <a href="/docs/getting-started" class="btn btn-primary">Get started</a>
    <a href="/docs/components" class="btn btn-outline">View components</a>
  </div>
</header>`,
};

export const PRICING_SNIPPETS = {
  astro: `---
import Card from '../components/Card.astro';
---
<div class="pricing-grid">
  <Card variant="elevated" class="pricing-card">
    <div class="card__body">
      <h3 class="pricing-card__name">Starter</h3>
      <p class="pricing-card__price"><span class="pricing-card__currency">$</span>0</p>
      <p class="pricing-card__period">Free forever</p>
      <ul class="pricing-card__features">
        <li>Up to 3 projects</li>
        <li>Community support</li>
      </ul>
      <a href="#" class="btn btn-outline pricing-card__cta">Get started</a>
    </div>
  </Card>
  <Card variant="elevated" class="pricing-card pricing-card--featured">
    <div class="card__body">
      <span class="badge badge--primary pricing-card__badge">Popular</span>
      <h3 class="pricing-card__name">Pro</h3>
      <p class="pricing-card__price"><span class="pricing-card__currency">$</span>12<span class="pricing-card__period-inline">/mo</span></p>
      <p class="pricing-card__period">Billed monthly</p>
      <ul class="pricing-card__features">
        <li>Unlimited projects</li>
        <li>Priority support</li>
      </ul>
      <a href="#" class="btn btn-primary pricing-card__cta">Start trial</a>
    </div>
  </Card>
</div>`,
  svelte: `<div class="pricing-grid">
  <div class="card card--elevated pricing-card">
    <div class="card__body">
      <h3 class="pricing-card__name">Starter</h3>
      <p class="pricing-card__price"><span class="pricing-card__currency">$</span>0</p>
      <p class="pricing-card__period">Free forever</p>
      <ul class="pricing-card__features">
        <li>Up to 3 projects</li>
        <li>Community support</li>
      </ul>
      <a href="#" class="btn btn-outline pricing-card__cta">Get started</a>
    </div>
  </div>
  <div class="card card--elevated pricing-card pricing-card--featured">
    <div class="card__body">
      <span class="badge badge--primary pricing-card__badge">Popular</span>
      <h3 class="pricing-card__name">Pro</h3>
      <p class="pricing-card__price"><span class="pricing-card__currency">$</span>12<span class="pricing-card__period-inline">/mo</span></p>
      <p class="pricing-card__period">Billed monthly</p>
      <ul class="pricing-card__features">
        <li>Unlimited projects</li>
        <li>Priority support</li>
      </ul>
      <a href="#" class="btn btn-primary pricing-card__cta">Start trial</a>
    </div>
  </div>
</div>`,
  react: `import { Card } from './components/react';

export function PricingBlock() {
  return (
    <div className="pricing-grid">
      <Card variant="elevated" className="pricing-card">
        <div className="card__body">
          <h3 className="pricing-card__name">Starter</h3>
          <p className="pricing-card__price"><span className="pricing-card__currency">$</span>0</p>
          <p className="pricing-card__period">Free forever</p>
          <ul className="pricing-card__features">
            <li>Up to 3 projects</li>
            <li>Community support</li>
          </ul>
          <a href="#" className="btn btn-outline pricing-card__cta">Get started</a>
        </div>
      </Card>
      <Card variant="elevated" className="pricing-card pricing-card--featured">
        <div className="card__body">
          <span className="badge badge--primary pricing-card__badge">Popular</span>
          <h3 className="pricing-card__name">Pro</h3>
          <p className="pricing-card__price"><span className="pricing-card__currency">$</span>12<span className="pricing-card__period-inline">/mo</span></p>
          <p className="pricing-card__period">Billed monthly</p>
          <ul className="pricing-card__features">
            <li>Unlimited projects</li>
            <li>Priority support</li>
          </ul>
          <a href="#" className="btn btn-primary pricing-card__cta">Start trial</a>
        </div>
      </Card>
    </div>
  );
}`,
  vue: `<template>
  <div class="pricing-grid">
    <Card variant="elevated" class="pricing-card">
      <div class="card__body">
        <h3 class="pricing-card__name">Starter</h3>
        <p class="pricing-card__price"><span class="pricing-card__currency">$</span>0</p>
        <p class="pricing-card__period">Free forever</p>
        <ul class="pricing-card__features">
          <li>Up to 3 projects</li>
          <li>Community support</li>
        </ul>
        <a href="#" class="btn btn-outline pricing-card__cta">Get started</a>
      </div>
    </Card>
    <Card variant="elevated" class="pricing-card pricing-card--featured">
      <div class="card__body">
        <span class="badge badge--primary pricing-card__badge">Popular</span>
        <h3 class="pricing-card__name">Pro</h3>
        <p class="pricing-card__price"><span class="pricing-card__currency">$</span>12<span class="pricing-card__period-inline">/mo</span></p>
        <p class="pricing-card__period">Billed monthly</p>
        <ul class="pricing-card__features">
          <li>Unlimited projects</li>
          <li>Priority support</li>
        </ul>
        <a href="#" class="btn btn-primary pricing-card__cta">Start trial</a>
      </div>
    </Card>
  </div>
</template>

<script setup>
import Card from '@/components/rizzo/Card.vue';
</script>`,
  vanilla: `<div class="pricing-grid">
  <div class="card card--elevated pricing-card">
    <div class="card__body">
      <h3 class="pricing-card__name">Starter</h3>
      <p class="pricing-card__price"><span class="pricing-card__currency">$</span>0</p>
      <p class="pricing-card__period">Free forever</p>
      <ul class="pricing-card__features">
        <li>Up to 3 projects</li>
        <li>Community support</li>
      </ul>
      <a href="#" class="btn btn-outline pricing-card__cta">Get started</a>
    </div>
  </div>
  <div class="card card--elevated pricing-card pricing-card--featured">
    <div class="card__body">
      <span class="badge badge--primary pricing-card__badge">Popular</span>
      <h3 class="pricing-card__name">Pro</h3>
      <p class="pricing-card__price"><span class="pricing-card__currency">$</span>12<span class="pricing-card__period-inline">/mo</span></p>
      <p class="pricing-card__period">Billed monthly</p>
      <ul class="pricing-card__features">
        <li>Unlimited projects</li>
        <li>Priority support</li>
      </ul>
      <a href="#" class="btn btn-primary pricing-card__cta">Start trial</a>
    </div>
  </div>
</div>`,
};

/** Shared HTML structure for dashboard (no framework-specific components). */
const DASHBOARD_HTML = `<!-- Sidebar + main. Use Dashboard component in Astro/Svelte or this structure in React/Vue/Vanilla. -->
<div class="dashboard">
  <aside class="dashboard__sidebar" aria-label="Dashboard navigation">
    <nav class="dashboard__nav">
      <a href="/dashboard" class="dashboard__nav-link dashboard__nav-link--active" aria-current="page">Dashboard</a>
      <a href="#" class="dashboard__nav-link">Items</a>
      <a href="#" class="dashboard__nav-link">Settings</a>
    </nav>
  </aside>
  <main class="dashboard__main">
    <div class="dashboard-page">
      <header class="dashboard-page__header">
        <h1 class="dashboard-page__title">Dashboard</h1>
        <p class="dashboard-page__subtitle">Overview.</p>
      </header>
      <section class="dashboard-page__stats" aria-labelledby="stats-heading">
        <h2 id="stats-heading" class="sr-only">Key metrics</h2>
        <div class="dashboard-page__stats-grid">
          <div class="card dashboard-page__stat">
            <div class="card__body">
              <span class="card__label">Total users</span>
              <span class="card__value">1,234</span>
            </div>
          </div>
          <div class="card dashboard-page__stat">
            <div class="card__body">
              <span class="card__label">Revenue</span>
              <span class="card__value">$12,345</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</div>`;

/** Snippets for dashboard and docs-layout: Astro + Vanilla (HTML structure); other frameworks can reuse same structure. */
export const DASHBOARD_SNIPPETS = {
  astro: `---
import Dashboard from '../components/Dashboard.astro';
import Card from '../components/Card.astro';
---
<Dashboard sidebarLabel="Dashboard navigation">
  <nav slot="sidebar" class="dashboard__nav">
    <a href="/dashboard" class="dashboard__nav-link dashboard__nav-link--active" aria-current="page">Dashboard</a>
    <a href="#" class="dashboard__nav-link">Items</a>
    <a href="#" class="dashboard__nav-link">Settings</a>
  </nav>
  <div class="dashboard-page">
    <header class="dashboard-page__header">
      <h1 class="dashboard-page__title">Dashboard</h1>
      <p class="dashboard-page__subtitle">Overview.</p>
    </header>
    <section class="dashboard-page__stats" aria-labelledby="stats-heading">
      <h2 id="stats-heading" class="sr-only">Key metrics</h2>
      <div class="dashboard-page__stats-grid">
        <Card class="dashboard-page__stat">
          <div class="card__body">
            <span class="card__label">Total users</span>
            <span class="card__value">1,234</span>
          </div>
        </Card>
        <Card class="dashboard-page__stat">
          <div class="card__body">
            <span class="card__label">Revenue</span>
            <span class="card__value">$12,345</span>
          </div>
        </Card>
      </div>
    </section>
  </div>
</Dashboard>`,
  svelte: DASHBOARD_HTML,
  react: DASHBOARD_HTML,
  vue: DASHBOARD_HTML,
  vanilla: DASHBOARD_HTML,
};

const DOCS_LAYOUT_HTML = `<!-- Docs layout: sidebar + main. Same BEM classes work in any framework. -->
<div class="docs" data-docs>
  <aside class="docs-sidebar" aria-label="Documentation navigation">
    <nav class="docs-sidebar__nav">
      <a href="#" class="docs-sidebar__link docs-sidebar__link--active">Introduction</a>
      <a href="#" class="docs-sidebar__link">Foundations</a>
      <a href="#" class="docs-sidebar__link">Components</a>
    </nav>
  </aside>
  <main class="docs__main">
    <div class="docs__container">
      <header class="docs__header">
        <h1 class="docs__title">Page title</h1>
        <p class="docs__description">Optional description.</p>
      </header>
      <div class="docs__content">
        <p>Main content. Use Rizzo typography and spacing tokens.</p>
      </div>
    </div>
  </main>
</div>`;

export const DOCS_LAYOUT_SNIPPETS = {
  astro: DOCS_LAYOUT_HTML,
  svelte: DOCS_LAYOUT_HTML,
  react: DOCS_LAYOUT_HTML,
  vue: DOCS_LAYOUT_HTML,
  vanilla: DOCS_LAYOUT_HTML,
};

/** Login block: centered form on muted background. Same HTML/BEM for all frameworks. */
const LOGIN_HTML = `<div class="login-block">
  <a href="/" class="login-block__brand" aria-label="Home">
    <span class="login-block__brand-icon" aria-hidden="true">R</span>
    Acme
  </a>
  <form class="login-block__form" action="#" method="post" aria-labelledby="login-heading">
    <h2 id="login-heading" class="login-block__title">Sign in</h2>
    <div class="form-group">
      <label for="login-email" class="label">Email</label>
      <input type="email" id="login-email" name="email" class="form-input" placeholder="you@example.com" autocomplete="email" />
    </div>
    <div class="form-group">
      <label for="login-password" class="label">Password</label>
      <input type="password" id="login-password" name="password" class="form-input" placeholder="••••••••" autocomplete="current-password" />
    </div>
    <button type="submit" class="btn btn-primary" style="width: 100%;">Sign in</button>
  </form>
  <p class="login-block__footer">
    <a href="#">Forgot password?</a> · <a href="/signup">Create account</a>
  </p>
</div>`;

export const LOGIN_SNIPPETS = {
  astro: LOGIN_HTML,
  svelte: LOGIN_HTML,
  react: LOGIN_HTML,
  vue: LOGIN_HTML,
  vanilla: LOGIN_HTML,
};

/** Signup block: centered form on muted background. Same HTML/BEM for all frameworks. */
const SIGNUP_HTML = `<div class="signup-block">
  <a href="/" class="signup-block__brand" aria-label="Home">
    <span class="signup-block__brand-icon" aria-hidden="true">R</span>
    Acme
  </a>
  <form class="signup-block__form" action="#" method="post" aria-labelledby="signup-heading">
    <h2 id="signup-heading" class="signup-block__title">Create account</h2>
    <div class="form-group">
      <label for="signup-name" class="label">Name</label>
      <input type="text" id="signup-name" name="name" class="form-input" placeholder="Jane Doe" autocomplete="name" />
    </div>
    <div class="form-group">
      <label for="signup-email" class="label">Email</label>
      <input type="email" id="signup-email" name="email" class="form-input" placeholder="you@example.com" autocomplete="email" />
    </div>
    <div class="form-group">
      <label for="signup-password" class="label">Password</label>
      <input type="password" id="signup-password" name="password" class="form-input" placeholder="••••••••" autocomplete="new-password" />
    </div>
    <button type="submit" class="btn btn-primary" style="width: 100%;">Create account</button>
  </form>
  <p class="signup-block__footer">
    Already have an account? <a href="/login">Sign in</a>
  </p>
</div>`;

export const SIGNUP_SNIPPETS = {
  astro: SIGNUP_HTML,
  svelte: SIGNUP_HTML,
  react: SIGNUP_HTML,
  vue: SIGNUP_HTML,
  vanilla: SIGNUP_HTML,
};
