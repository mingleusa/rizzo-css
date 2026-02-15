<script lang="ts">
  import Cat from './icons/Cat.svelte';
  import Gear from './icons/Gear.svelte';
  import Search from './Search.svelte';

  interface Props {
    siteName?: string;
    logo?: string;
  }
  let { siteName = 'Site', logo }: Props = $props();
  let menuOpen = $state(false);

  // Click outside and Escape to close mobile menu
  $effect(() => {
    if (!menuOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') menuOpen = false;
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (target && !(target as Element).closest?.('.navbar')) menuOpen = false;
    };
    document.addEventListener('keydown', onEscape);
    const t = setTimeout(() => document.addEventListener('click', onClick), 0);
    return () => {
      document.removeEventListener('keydown', onEscape);
      document.removeEventListener('click', onClick);
      clearTimeout(t);
    };
  });
</script>

<nav class="navbar" role="navigation" aria-label="Main navigation">
  <div class="navbar__container">
    <div class="navbar__brand">
      <a href="/" class="navbar__brand-link">
        {#if logo}
          <img src={logo} alt="" class="navbar__logo" />
        {:else}
          <Cat width={32} height={32} class="navbar__logo" aria-hidden="true" />
        {/if}
        {siteName}
      </a>
    </div>
    <div class="navbar__actions-desktop">
      <Search id="search-navbar" />
      <button type="button" class="navbar__settings-btn" aria-label="Open settings" onclick="window.openSettings && window.openSettings()">
        <Gear width={20} height={20} class="navbar__settings-icon" />
        <span class="navbar__settings-label">Settings</span>
      </button>
    </div>
    <button
      type="button"
      class="navbar__toggle"
      aria-label="Toggle menu"
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
    >
      <span class="navbar__toggle-icon" aria-hidden="true"><span></span><span></span><span></span></span>
    </button>
    <div class="navbar__menu" class:navbar__menu--open={menuOpen} aria-hidden={!menuOpen}>
      <a href="/" class="navbar__link">Home</a>
    </div>
  </div>
</nav>
