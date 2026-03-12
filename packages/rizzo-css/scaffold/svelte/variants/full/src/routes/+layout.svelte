<script lang="ts">
  import Navbar from '$lib/rizzo/Navbar.svelte';
  import Footer from '$lib/rizzo/Footer.svelte';
  import Settings from '$lib/rizzo/Settings.svelte';
  import BackToTop from '$lib/rizzo/BackToTop.svelte';
</script>

<Navbar siteName="Rizzo CSS" />
<slot />
<Footer />
<BackToTop />
<Settings />
