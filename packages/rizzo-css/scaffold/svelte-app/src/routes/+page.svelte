<script>
  function showDemoToast() {
    if (typeof window !== 'undefined' && window.showToast) {
      window.showToast('Hello from Rizzo!', { variant: 'success' });
    }
  }
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="container flex flex-wrap items-center justify-between gap-4" style="padding-top: var(--spacing-4); padding-bottom: var(--spacing-4); border-bottom: 1px solid var(--border);">
  <a href="/" class="font-semibold" style="font-size: var(--font-size-lg); color: var(--text); text-decoration: none;">{{TITLE}}</a>
  <a href="https://rizzo-css.vercel.app/docs/getting-started" class="btn btn-outline" target="_blank" rel="noopener noreferrer">Docs</a>
</header>
<main id="main-content" class="flex flex-col items-center justify-center text-center min-h-screen" style="padding: var(--spacing-12) var(--spacing-4); min-height: calc(100vh - 4rem);">
  <span class="badge badge--primary badge--sm mb-4">Svelte + Rizzo CSS</span>
  <h1 style="font-size: clamp(2.5rem, 8vw, 4rem); font-weight: 800; line-height: 1.1; margin: 0 0 var(--spacing-4) 0; color: var(--text);">Build something great</h1>
  <p style="font-size: var(--font-size-xl); color: var(--text-dim); max-width: 42ch; margin: 0 0 var(--spacing-8) 0; line-height: var(--line-height-relaxed);">Same design system as Vanilla JS and Astro — 14 themes, 24 components, full keyboard and screen reader support.</p>
  <div class="flex flex-wrap justify-center gap-4 mb-12">
    <a href="https://rizzo-css.vercel.app/docs/getting-started" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Get started</a>
    <a href="https://rizzo-css.vercel.app/docs/components" class="btn btn-outline" target="_blank" rel="noopener noreferrer">Components</a>
    <button type="button" class="btn btn-outline" on:click={showDemoToast}>Show toast</button>
  </div>
  <div class="flex flex-wrap justify-center gap-3 mb-16">
    <span class="badge badge--info">14 themes</span>
    <span class="badge badge--info">24 components</span>
    <span class="badge badge--info">WCAG AA</span>
  </div>
  <footer style="margin-top: auto; padding-top: var(--spacing-8); color: var(--text-dim); font-size: var(--font-size-sm);">
    <a href="https://rizzo-css.vercel.app" style="color: var(--accent);">Rizzo CSS</a> — design system for the web
  </footer>
</main>
