<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import DocsSidebar from '$lib/rizzo/DocsSidebar.svelte';
  import BackToTop from '$lib/rizzo/BackToTop.svelte';

  let { children }: { children: Snippet } = $props();
  const currentPath = $derived($page.url.pathname);

  onMount(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1025;
    document.documentElement.classList.add(w <= 1024 ? 'docs-sidebar-mobile' : 'docs-sidebar-desktop');

    const container = document.getElementById('docs-sidebar-container');
    if (!container) return;
    const toggle = container.querySelector('[data-docs-sidebar-toggle]');
    const overlay = container.querySelector('[data-docs-sidebar-overlay]');
    const docs = document.querySelector('[data-docs]');
    if (!toggle || !overlay || !docs) return;

    function open() {
      docs.classList.add('docs--sidebar-open');
      toggle.setAttribute('aria-expanded', 'true');
      overlay.setAttribute('aria-hidden', 'false');
    }
    function close() {
      docs.classList.remove('docs--sidebar-open');
      toggle.setAttribute('aria-expanded', 'false');
      overlay.setAttribute('aria-hidden', 'true');
    }
    toggle.addEventListener('click', () => (docs.classList.contains('docs--sidebar-open') ? close() : open()));
    overlay.addEventListener('click', close);

    if (document.documentElement.classList.contains('docs-sidebar-mobile')) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => container.remove());
      } else {
        container.remove();
      }
    }

    return () => {
      toggle?.removeEventListener('click', close);
      overlay?.removeEventListener('click', close);
    };
  });
</script>

<div class="docs" data-docs>
  <div id="docs-sidebar-container">
    <button
      type="button"
      class="docs__sidebar-toggle"
      aria-label="Open documentation menu"
      aria-expanded="false"
      aria-controls="docs-sidebar"
      data-docs-sidebar-toggle
    >
      <span class="docs__sidebar-toggle-icon" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
      <span class="docs__sidebar-toggle-text">Docs</span>
    </button>
    <div class="docs__sidebar-overlay" data-docs-sidebar-overlay aria-hidden="true"></div>
    <DocsSidebar currentPath={currentPath} pathPrefix="/docs" />
  </div>
  <div class="docs__main">
    <div class="docs__container">
      <header class="docs__header">
        <h1 class="docs__title">{$page.data.title ?? 'Docs'}</h1>
        {#if $page.data.description}
          <p class="docs__description">{$page.data.description}</p>
        {/if}
      </header>
      <div class="docs__content">
        {@render children()}
      </div>
    </div>
  </div>
</div>
<BackToTop threshold={300} />

<svelte:head>
  <title>{$page.data.title ?? 'Docs'} — Rizzo CSS</title>
</svelte:head>

<style>
  :global(.docs__container) {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    max-width: var(--container-default);
    margin: 0 auto;
    padding: 0 var(--content-padding-x);
  }
  :global(.docs__header) {
    margin-bottom: var(--section-spacing-lg);
    padding-bottom: var(--spacing-8);
    border-bottom: 1px solid var(--border);
  }
  :global(.docs__title) {
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    color: var(--text);
    margin: 0 0 var(--spacing-4) 0;
    line-height: var(--line-height-tight);
  }
  :global(.docs__description) {
    font-size: var(--font-size-xl);
    color: var(--text);
    margin: 0;
    line-height: var(--line-height-relaxed);
  }
  :global(.docs__content) {
    width: 100%;
    min-width: 0;
    color: var(--text);
    line-height: var(--line-height-relaxed);
  }
  :global(.docs__content h2),
  :global(.docs__content h3) {
    scroll-margin-top: var(--scroll-margin-below-header);
  }
  :global(.docs__content h2) {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    margin-top: var(--section-spacing-lg);
    margin-bottom: var(--spacing-6);
    color: var(--text);
    padding-bottom: var(--spacing-2);
    border-bottom: 1px solid var(--border);
  }
  :global(.docs__content h3) {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-semibold);
    margin-top: var(--spacing-8);
    margin-bottom: var(--spacing-4);
    color: var(--text);
  }
  :global(.docs__content h4) {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    margin-top: var(--spacing-6);
    margin-bottom: var(--spacing-3);
    color: var(--text);
  }
  :global(.docs__content p) {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-5);
  }
  :global(.docs__content ul),
  :global(.docs__content ol) {
    margin-bottom: var(--spacing-5);
    padding-left: var(--spacing-8);
  }
  :global(.docs__content li) {
    margin-bottom: var(--spacing-2);
  }
  :global(.docs__content code) {
    background-color: var(--background-alt);
    color: var(--accent-fg);
    padding: var(--spacing-0-125) var(--spacing-0-375);
    border-radius: var(--radius);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
  }
  :global(.docs__content pre) {
    background-color: var(--background-alt);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-6);
    overflow-x: auto;
    margin-bottom: var(--spacing-6);
    font-size: var(--font-size-sm);
  }
  :global(.docs__content pre code) {
    background-color: transparent;
    color: var(--text);
    padding: 0;
    font-size: inherit;
  }
  :global(.docs__content blockquote) {
    border-left: var(--spacing-1) solid var(--accent);
    padding-left: var(--spacing-6);
    margin: var(--spacing-6) 0;
    color: var(--text-dim);
    font-style: italic;
  }
  :global(.docs__content table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: var(--spacing-6);
  }
  :global(.docs__content th),
  :global(.docs__content td) {
    padding: var(--spacing-3);
    text-align: left;
    border-bottom: 1px solid var(--border);
  }
  :global(.docs__content th) {
    font-weight: var(--font-weight-semibold);
    background-color: var(--background-alt);
  }
  :global(.docs__content a) {
    text-decoration: none;
  }
  :global(.docs__content a:not(.docs-sidebar__link):not(.docs-sidebar__sublink):not(.dashboard__nav-link):not(.component-card-link):not(.block-card-link):not(.navbar__link):not(.navbar__brand-link):not(.footer__link):not(.breadcrumb__link):not(.pagination__link)) {
    color: var(--accent-fg);
    text-decoration: underline;
    text-underline-offset: 0.15em;
    transition: color var(--transition-base);
  }
  :global(.docs__content a:not(.docs-sidebar__link):not(.docs-sidebar__sublink):not(.dashboard__nav-link):not(.component-card-link):not(.block-card-link):not(.navbar__link):not(.navbar__brand-link):not(.footer__link):not(.breadcrumb__link):not(.pagination__link)):hover {
    color: var(--accent-fg-hover);
  }
  :global(.docs__content .component-card-link),
  :global(.docs__content .block-card-link) {
    text-decoration: none;
  }
  :global(.docs__content .component-card-link *),
  :global(.docs__content .block-card-link *) {
    text-decoration: none;
  }
  :global(.docs__content hr) {
    border: none;
    border-top: 1px solid var(--border);
    margin: var(--spacing-8) 0;
  }
  :global(.docs__content .example) {
    background-color: var(--background-alt);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-6);
    margin: var(--spacing-6) 0;
  }
  :global(.docs__content section) {
    margin-bottom: var(--section-spacing-lg);
  }
  :global(.docs__content section:last-child) {
    margin-bottom: 0;
  }
  @media (width <= 640px) {
    :global(.docs__title) {
      font-size: var(--font-size-4xl);
    }
    :global(.docs__description) {
      font-size: var(--font-size-lg);
    }
  }
</style>
