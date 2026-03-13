<script lang="ts">
  import type { Snippet } from 'svelte';
  import Navbar from '$lib/rizzo/Navbar.svelte';
  import Footer from '$lib/rizzo/Footer.svelte';
  import Settings from '$lib/rizzo/Settings.svelte';
  import BackToTop from '$lib/rizzo/BackToTop.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<Navbar siteName="Rizzo CSS" />
{@render children()}
<Footer />
<BackToTop />
<Settings />
