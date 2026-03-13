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
      <div class="docs__content">
        {@render children()}
      </div>
    </div>
  </div>
</div>
<BackToTop threshold={300} />

<svelte:head>
  <title>Docs — Rizzo CSS</title>
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
  :global(.docs__content) {
    width: 100%;
    min-width: 0;
    color: var(--text);
    line-height: var(--line-height-relaxed);
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
  :global(.docs__content p) {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-5);
  }
  :global(.docs__content ul) {
    margin-bottom: var(--spacing-5);
    padding-left: var(--spacing-8);
  }
  :global(.docs__content a) {
    color: var(--accent-fg);
    text-decoration: underline;
    text-underline-offset: 0.15em;
  }
  :global(.docs__content a:hover) {
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
</style>
