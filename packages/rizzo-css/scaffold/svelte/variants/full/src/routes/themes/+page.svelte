<script lang="ts">
  import ThemeIcon from '$lib/rizzo/ThemeIcon.svelte';
  import ThemeSwitcher from '$lib/rizzo/ThemeSwitcher.svelte';
  import Card from '$lib/rizzo/Card.svelte';
  import CopyToClipboard from '$lib/rizzo/CopyToClipboard.svelte';
  import { THEMES_DARK, THEMES_LIGHT } from '$lib/rizzo/themes';

  const defaultTheme = 'github-dark-classic';
  const snippet = `<html lang="en" data-theme="${defaultTheme}">`;

  const themeCardContent: Record<string, { description: string; author: string }> = {
    'github-dark-classic': { description: 'Official GitHub dark theme for VS Code', author: 'Primer (GitHub)' },
    'shades-of-purple': { description: 'Professional theme with bold purple shades', author: 'Ahmad Awais' },
    'sandstorm-classic': { description: 'Dark, red-based theme for late-night coding', author: 'Devan Sisson' },
    'rocky-blood-orange': { description: 'Dark theme with blood-orange accent', author: 'Luca Heyworth' },
    'minimal-dark-neon-yellow': { description: 'Minimal dark theme with neon yellow accent', author: 'Gabriel D Sanchez' },
    'hack-the-box': { description: 'Dark blue with lime green accent, built for hackers', author: 'silofy' },
    'pink-cat-boo': { description: 'Sweet and cute dark theme with rose pink accents', author: 'Fiona Fan' },
    'github-light': { description: 'Official GitHub light theme for VS Code', author: 'Primer (GitHub)' },
    'red-velvet-cupcake': { description: 'Velvet-cupcake light theme with red accent', author: 'Fahad Ashraf Chaudhry' },
    'orangy-one-light': { description: 'Light theme with orange accent', author: 'maher-cshub' },
    sunflower: { description: 'Yellow light theme', author: 'Hashirama Naiff' },
    'green-breeze-light': { description: 'Green and blue focused light theme with good contrast', author: 'icy9ptcl' },
    'cute-pink': { description: 'Cute pink light theme for VSCode', author: 'WebFreak' },
    'semi-light-purple': { description: 'Light aesthetic theme with soft purple tones', author: 'Kapil Yadav' },
  };
</script>

<svelte:head>
  <title>Themes — Rizzo CSS</title>
</svelte:head>

<div class="themes-page">
  <div class="themes-page__container">
    <header class="themes-page__hero">
      <h1 id="available-themes" class="themes-page__title">Available Themes</h1>
      <p class="themes-page__subtitle">
        Rizzo CSS includes 14 themes. Switch instantly via the Settings panel (gear icon in the navbar) or try the Theme Switcher below. Each theme uses semantic OKLCH variables.
      </p>
      <div class="themes-page__hero-demo example">
        <div class="example-title">Try Themes</div>
        <ThemeSwitcher idPrefix="page" />
      </div>
      <div class="themes-page__hero-ctas">
        <a href="https://rizzo-css.vercel.app/docs/theming" class="btn btn-primary themes-page__hero-cta" target="_blank" rel="noopener noreferrer">Theming docs</a>
        <a href="/docs/components" class="btn btn-outline themes-page__hero-cta">Components</a>
      </div>
    </header>

    <div class="themes-page__main">
      <section class="themes-page__section" aria-labelledby="dark-themes">
        <h2 id="dark-themes" class="themes-page__section-title">Dark Themes</h2>
        <div class="themes-page__grid">
          {#each THEMES_DARK as theme}
            {@const content = themeCardContent[theme.value]}
            <Card variant="elevated">
              <div class="card__body">
                <div class="themes-page__card-header">
                  <ThemeIcon themeId={theme.value} size={24} class="themes-page__card-icon" />
                  <h3 class="themes-page__card-title">
                    <button
                      type="button"
                      class="themes-page__card-title-btn"
                      onclick={() => {
                        if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', theme.value);
                      }}
                    >
                      {theme.label}
                    </button>
                  </h3>
                </div>
                {#if content}
                  <p class="themes-page__card-desc">{content.description}</p>
                  <p class="themes-page__card-meta"><strong>Author:</strong> {content.author}</p>
                {/if}
                <p class="themes-page__card-meta"><code>{theme.value}</code></p>
              </div>
            </Card>
          {/each}
        </div>
      </section>

      <section class="themes-page__section" aria-labelledby="light-themes">
        <h2 id="light-themes" class="themes-page__section-title">Light Themes</h2>
        <div class="themes-page__grid">
          {#each THEMES_LIGHT as theme}
            {@const content = themeCardContent[theme.value]}
            <Card variant="elevated">
              <div class="card__body">
                <div class="themes-page__card-header">
                  <ThemeIcon themeId={theme.value} size={24} class="themes-page__card-icon" />
                  <h3 class="themes-page__card-title">
                    <button
                      type="button"
                      class="themes-page__card-title-btn"
                      onclick={() => {
                        if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', theme.value);
                      }}
                    >
                      {theme.label}
                    </button>
                  </h3>
                </div>
                {#if content}
                  <p class="themes-page__card-desc">{content.description}</p>
                  <p class="themes-page__card-meta"><strong>Author:</strong> {content.author}</p>
                {/if}
                <p class="themes-page__card-meta"><code>{theme.value}</code></p>
              </div>
            </Card>
          {/each}
        </div>
      </section>

      <section id="using-themes" class="themes-page__copy-section" aria-labelledby="copy-heading">
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
  .themes-page__hero-demo {
    margin-top: var(--spacing-6);
    text-align: left;
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
  .themes-page__section {
    margin-bottom: var(--spacing-10);
  }
  .themes-page__section-title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-semibold);
    color: var(--text);
    margin: 0 0 var(--spacing-4);
  }
  .themes-page__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
    gap: var(--spacing-4);
  }
  .themes-page__card-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-2);
  }
  :global(.themes-page__card-icon) {
    flex-shrink: 0;
    color: var(--text-dim);
  }
  .themes-page__card-title {
    margin: 0;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
  }
  .themes-page__card-title-btn {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: var(--accent-fg);
    text-decoration: underline;
    text-underline-offset: 0.15em;
    cursor: pointer;
  }
  .themes-page__card-title-btn:hover {
    color: var(--accent-fg-hover);
  }
  .themes-page__card-desc {
    font-size: var(--font-size-sm);
    color: var(--text-dim);
    margin: 0 0 var(--spacing-2);
    line-height: var(--line-height-relaxed);
  }
  .themes-page__card-meta {
    font-size: var(--font-size-sm);
    color: var(--text-dim);
    margin: 0 0 var(--spacing-1);
  }
  .themes-page__card-meta code {
    background: var(--background-alt);
    color: var(--accent-fg);
    padding: var(--spacing-0-125) var(--spacing-0-375);
    border-radius: var(--radius);
    font-size: var(--font-size-xs);
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
