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
<Footer
  siteName="Site"
  links={[
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' },
    { href: '/docs', label: 'Docs' },
    { href: 'https://github.com', label: 'GitHub' },
    { href: 'https://twitter.com', label: 'Twitter' },
  ]}
/>
<BackToTop />
<Settings />
