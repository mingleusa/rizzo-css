<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import BackToTop from '$lib/rizzo/BackToTop.svelte';

  const currentPath = $derived($page.url.pathname);
  const BLOCKS_NAV = [
    { href: '/blocks', label: 'Overview' },
    { href: '/blocks/landing-hero', label: 'Landing hero' },
    { href: '/blocks/pricing', label: 'Pricing cards' },
    { href: '/blocks/dashboard-01', label: 'Dashboard with sidebar' },
    { href: '/blocks/docs-layout', label: 'Docs layout with sidebar' },
    { href: '/blocks/login', label: 'Login' },
    { href: '/blocks/signup', label: 'Sign up' },
  ];

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
  });
</script>

<div class="docs" data-docs>
  <div id="docs-sidebar-container">
    <button
      type="button"
      class="docs__sidebar-toggle"
      aria-label="Open blocks menu"
      aria-expanded="false"
      aria-controls="docs-sidebar"
      data-docs-sidebar-toggle
    >
      <span class="docs__sidebar-toggle-icon" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
      <span class="docs__sidebar-toggle-text">Blocks</span>
    </button>
    <div class="docs__sidebar-overlay" data-docs-sidebar-overlay aria-hidden="true"></div>
    <aside id="docs-sidebar" class="docs-sidebar" aria-label="Blocks navigation" tabindex="0">
      <nav class="docs-sidebar__nav">
        <div class="docs-sidebar__group">
          <h2 class="docs-sidebar__group-label">Blocks</h2>
          <ul class="docs-sidebar__list">
            {#each BLOCKS_NAV as item}
              {@const isActive = currentPath === item.href || (item.href !== '/blocks' && currentPath.startsWith(item.href))}
              <li class="docs-sidebar__item">
                <a
                  href={item.href}
                  class="docs-sidebar__link"
                  class:docs-sidebar__link--active={isActive}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </nav>
    </aside>
  </div>
  <div class="docs__main">
    <div class="docs__container">
      <div class="docs__content">
        <slot />
      </div>
    </div>
  </div>
</div>
<BackToTop threshold={300} />

<svelte:head>
  <title>Blocks — Rizzo CSS</title>
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
</style>
