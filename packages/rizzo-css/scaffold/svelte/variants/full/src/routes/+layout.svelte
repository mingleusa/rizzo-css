<script lang="ts">
  import type { Snippet } from 'svelte';
  import Navbar from '$lib/rizzo/Navbar.svelte';
  import Footer from '$lib/rizzo/Footer.svelte';
  import Settings from '$lib/rizzo/Settings.svelte';
  import BackToTop from '$lib/rizzo/BackToTop.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<a href="#main-content" class="skip-link">Skip to main content</a>
<Navbar siteName="Rizzo CSS" />
<main id="main-content">
  {@render children()}
</main>
<Footer
  siteName="Rizzo CSS"
  links={[
    { href: '/docs/getting-started', label: 'Getting Started' },
    { href: '/docs', label: 'Docs' },
    { href: '/docs/components', label: 'Components' },
    { href: '/blocks', label: 'Blocks' },
    { href: '/themes', label: 'Themes' },
    { href: 'https://github.com', label: 'GitHub' },
  ]}
/>
<BackToTop />
<Settings />
