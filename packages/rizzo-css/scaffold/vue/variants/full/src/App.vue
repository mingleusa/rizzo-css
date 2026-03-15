<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <Navbar site-name="Rizzo CSS" />
  <main id="main-content">
    <router-view />
  </main>
  <Footer
    site-name="Rizzo CSS"
    :links="footerLinks"
  />
  <BackToTop />
  <Settings />
</template>

<script setup lang="ts">
import Navbar from '@/components/rizzo/Navbar.vue';
import Footer from '@/components/rizzo/Footer.vue';
import Settings from '@/components/rizzo/Settings.vue';
import BackToTop from '@/components/rizzo/BackToTop.vue';

const footerLinks = [
  { href: '/docs/getting-started', label: 'Getting Started' },
  { href: '/docs', label: 'Docs' },
  { href: '/docs/components', label: 'Components' },
  { href: '/blocks', label: 'Blocks' },
  { href: '/themes', label: 'Themes' },
  { href: 'https://github.com', label: 'GitHub' },
];
</script>
