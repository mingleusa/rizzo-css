<script lang="ts">
  import ThemeIcon from '$lib/rizzo/ThemeIcon.svelte';
  import CopyToClipboard from '$lib/rizzo/CopyToClipboard.svelte';
  import { THEMES_DARK, THEMES_LIGHT } from '$lib/rizzo/themes';

  const defaultTheme = 'github-dark-classic';
  const snippet = `<html lang="en" data-theme="${defaultTheme}">`;
</script>

<svelte:head>
  <title>Themes — Rizzo CSS</title>
</svelte:head>

<div class="themes-page">
  <div class="themes-page__container">
    <header class="themes-page__hero">
      <h1 class="themes-page__title">Fourteen themes. One design system.</h1>
      <p class="themes-page__subtitle">
        Each theme is built on semantic OKLCH variables — switch instantly via the Settings panel (gear icon in the navbar). Use the Theme Switcher component or set <code>data-theme</code> on your HTML root.
      </p>
      <div class="themes-page__hero-ctas">
        <a href="https://rizzo-css.vercel.app/docs/theming" class="btn btn-primary themes-page__hero-cta" target="_blank" rel="noopener noreferrer">Theming docs</a>
        <a href="/docs/components" class="btn btn-outline themes-page__hero-cta">Components</a>
      </div>
    </header>

    <div class="themes-page__main">
      <section class="themes-page__picker" aria-labelledby="theme-picker-heading">
        <h2 id="theme-picker-heading" class="themes-page__section-title">Dark themes</h2>
        <div class="themes-page__cards" role="group" aria-label="Dark themes">
          {#each THEMES_DARK as theme}
            <button
              type="button"
              class="themes-page__card"
              data-theme-value={theme.value}
              aria-label="Use theme: {theme.label}"
              title={theme.label}
              onclick={() => {
                if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', theme.value);
              }}
            >
              <span class="themes-page__card-swatch" style="background: {theme.bg}; border-color: {theme.accent}" aria-hidden="true"></span>
              <ThemeIcon themeId={theme.value} size={24} class="themes-page__card-icon" />
              <span class="themes-page__card-label">{theme.label}</span>
            </button>
          {/each}
        </div>
        <h2 class="themes-page__section-title" style="margin-top: var(--spacing-8);">Light themes</h2>
        <div class="themes-page__cards" role="group" aria-label="Light themes">
          {#each THEMES_LIGHT as theme}
            <button
              type="button"
              class="themes-page__card"
              data-theme-value={theme.value}
              aria-label="Use theme: {theme.label}"
              title={theme.label}
              onclick={() => {
                if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', theme.value);
              }}
            >
              <span class="themes-page__card-swatch" style="background: {theme.bg}; border-color: {theme.accent}" aria-hidden="true"></span>
              <ThemeIcon themeId={theme.value} size={24} class="themes-page__card-icon" />
              <span class="themes-page__card-label">{theme.label}</span>
            </button>
          {/each}
        </div>
      </section>

      <section class="themes-page__copy-section" aria-labelledby="copy-heading">
        <h2 id="copy-heading" class="themes-page__section-title">Use a theme in your app</h2>
        <p class="themes-page__copy-desc">Set the theme on your HTML root. For persistence and custom themes, see the <a href="https://rizzo-css.vercel.app/docs/theming" target="_blank" rel="noopener noreferrer">theming docs</a>.</p>
        <div class="themes-page__code-block">
          <pre><code>{snippet}</code></pre>
          <CopyToClipboard value={snippet} buttonLabel="Copy" format="code" label="Copy snippet" />
        </div>
      </section>
    </div>
  </div>
</div>

<style>
  .themes-page {
    padding: var(--spacing-8) 0 var(--spacing-12);
  }
  .themes-page__container {
    width: 100%;
    max-width: var(--container-default);
    margin: 0 auto;
    padding: 0 var(--content-padding-x);
  }
  .themes-page__hero {
    text-align: center;
    margin-bottom: var(--spacing-10);
  }
  .themes-page__title {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    color: var(--text);
    margin: 0 0 var(--spacing-4);
    line-height: var(--line-height-tight);
  }
  .themes-page__subtitle {
    font-size: var(--font-size-lg);
    color: var(--text-dim);
    margin: 0;
    max-width: 42ch;
    margin-left: auto;
    margin-right: auto;
    line-height: var(--line-height-relaxed);
  }
  .themes-page__subtitle code {
    background: var(--background-alt);
    color: var(--accent-fg);
    padding: var(--spacing-0-125) var(--spacing-0-375);
    border-radius: var(--radius);
    font-size: var(--font-size-sm);
  }
  .themes-page__hero-ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
    justify-content: center;
    margin-top: var(--spacing-6);
  }
  .themes-page__hero-cta {
    text-decoration: none;
  }
  .themes-page__section-title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--text);
    margin: 0 0 var(--spacing-4);
  }
  .themes-page__cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 10rem), 1fr));
    gap: var(--spacing-3);
  }
  .themes-page__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-4);
    border: 2px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--background);
    color: var(--text);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    text-align: center;
    cursor: pointer;
    transition: border-color var(--transition-base), background var(--transition-base), box-shadow var(--transition-base), transform var(--transition-base);
    min-height: 7.5rem;
  }
  .themes-page__card:hover {
    background: var(--background-alt);
    border-color: var(--accent-fg);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  .themes-page__card-swatch {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-md);
    border: 2px solid;
    flex-shrink: 0;
  }
  .themes-page__card-icon {
    flex-shrink: 0;
    color: var(--text-dim);
  }
  .themes-page__card-label {
    line-height: var(--line-height-snug);
    word-break: break-word;
  }
  .themes-page__copy-section {
    margin-top: var(--spacing-10);
  }
  .themes-page__copy-desc {
    color: var(--text-dim);
    font-size: var(--font-size-sm);
    margin: 0 0 var(--spacing-3);
  }
  .themes-page__code-block {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-2);
    flex-wrap: wrap;
  }
  .themes-page__code-block pre {
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
</style>
