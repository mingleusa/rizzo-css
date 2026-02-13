<script lang="ts">
  import Cat from './icons/Cat.svelte';

  interface Props {
    siteName?: string;
    logo?: string;
  }
  let { siteName = 'Site', logo }: Props = $props();
  let menuOpen = $state(false);
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
