<script lang="ts">
  interface Props {
    siteName?: string;
  }
  let { siteName = 'Site' }: Props = $props();
  let menuOpen = $state(false);
</script>

<nav class="navbar" role="navigation" aria-label="Main navigation">
  <div class="navbar__container">
    <div class="navbar__brand">
      <a href="/" class="navbar__brand-link">{siteName}</a>
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
