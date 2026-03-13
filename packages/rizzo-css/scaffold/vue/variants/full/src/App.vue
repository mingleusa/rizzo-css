<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <Navbar site-name="Rizzo CSS" />
  <main id="main-content">
    <router-view />
  </main>
  <Footer />
  <BackToTop />
  <Settings />
</template>

<script setup lang="ts">
import Navbar from '@/components/rizzo/Navbar.vue';
import Footer from '@/components/rizzo/Footer.vue';
import Settings from '@/components/rizzo/Settings.vue';
import BackToTop from '@/components/rizzo/BackToTop.vue';
</script>
