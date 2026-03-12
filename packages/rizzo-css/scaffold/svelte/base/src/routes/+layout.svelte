<script lang="ts">
  import Navbar from '$lib/rizzo/Navbar.svelte';
  import Footer from '$lib/rizzo/Footer.svelte';
  import Settings from '$lib/rizzo/Settings.svelte';
  import BackToTop from '$lib/rizzo/BackToTop.svelte';

  const menuLinks = [
    { href: '/#about', label: 'About' },
    { href: '/#skills', label: 'Skills' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#contact', label: 'Contact' },
  ];
</script>

<Navbar siteName="Site" {menuLinks} />
<slot />
<Footer siteName="Site" links={[{ href: 'https://github.com', label: 'GitHub' }, { href: 'https://linkedin.com', label: 'LinkedIn' }]} />
<BackToTop />
<Settings />
