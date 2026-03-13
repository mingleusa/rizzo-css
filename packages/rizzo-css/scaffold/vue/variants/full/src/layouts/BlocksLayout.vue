<template>
  <div class="docs" data-docs>
    <div id="docs-sidebar-container">
      <button
        type="button"
        class="docs__sidebar-toggle"
        aria-label="Open blocks menu"
        aria-expanded="false"
        aria-controls="docs-sidebar"
        data-docs-sidebar-toggle
        @click="toggleSidebar"
      >
        <span class="docs__sidebar-toggle-icon" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
        <span class="docs__sidebar-toggle-text">Blocks</span>
      </button>
      <div class="docs__sidebar-overlay" data-docs-sidebar-overlay aria-hidden="true" @click="closeSidebar" />
      <aside id="docs-sidebar" class="docs-sidebar" aria-label="Blocks navigation">
        <nav class="docs-sidebar__nav">
          <div class="docs-sidebar__group">
            <h2 class="docs-sidebar__group-label">Blocks</h2>
            <ul class="docs-sidebar__list">
              <li v-for="item in BLOCKS_NAV" :key="item.href" class="docs-sidebar__item">
                <a
                  :href="item.href"
                  class="docs-sidebar__link"
                  :class="{ 'docs-sidebar__link--active': isActive(item) }"
                  :aria-current="isActive(item) ? 'page' : undefined"
                >
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </div>
    <div class="docs__main">
      <div class="docs__container">
        <div class="docs__content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
  <BackToTop />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BackToTop from '@/components/rizzo/BackToTop.vue';

const route = useRoute();
const currentPath = computed(() => route.path);

const BLOCKS_NAV = [
  { href: '/blocks', label: 'Overview' },
  { href: '/blocks/landing-hero', label: 'Landing hero' },
  { href: '/blocks/pricing', label: 'Pricing cards' },
  { href: '/blocks/dashboard-01', label: 'Dashboard with sidebar' },
  { href: '/blocks/docs-layout', label: 'Docs layout with sidebar' },
  { href: '/blocks/login', label: 'Login' },
  { href: '/blocks/signup', label: 'Sign up' },
];

function isActive(item: { href: string }) {
  const path = currentPath.value;
  return path === item.href || (item.href !== '/blocks' && path.startsWith(item.href));
}

function openSidebar() {
  const docs = document.querySelector('[data-docs]');
  const toggle = document.querySelector('[data-docs-sidebar-toggle]');
  const overlay = document.querySelector('[data-docs-sidebar-overlay]');
  docs?.classList.add('docs--sidebar-open');
  toggle?.setAttribute('aria-expanded', 'true');
  overlay?.setAttribute('aria-hidden', 'false');
}

function closeSidebar() {
  const docs = document.querySelector('[data-docs]');
  const toggle = document.querySelector('[data-docs-sidebar-toggle]');
  const overlay = document.querySelector('[data-docs-sidebar-overlay]');
  docs?.classList.remove('docs--sidebar-open');
  toggle?.setAttribute('aria-expanded', 'false');
  overlay?.setAttribute('aria-hidden', 'true');
}

function toggleSidebar() {
  const docs = document.querySelector('[data-docs]');
  if (docs?.classList.contains('docs--sidebar-open')) closeSidebar();
  else openSidebar();
}

onMounted(() => {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1025;
  document.documentElement.classList.add(w <= 1024 ? 'docs-sidebar-mobile' : 'docs-sidebar-desktop');

  const container = document.getElementById('docs-sidebar-container');
  if (!container) return;
  const toggle = container.querySelector('[data-docs-sidebar-toggle]');
  const overlay = container.querySelector('[data-docs-sidebar-overlay]');
  const docs = document.querySelector('[data-docs]');
  if (!toggle || !overlay || !docs) return;

  toggle.addEventListener('click', () => (docs.classList.contains('docs--sidebar-open') ? closeSidebar() : openSidebar()));
  overlay.addEventListener('click', closeSidebar);

  if (document.documentElement.classList.contains('docs-sidebar-mobile')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => container.remove());
    } else {
      container.remove();
    }
  }
});
</script>

<style scoped>
:deep(.docs__container) {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  max-width: var(--container-default);
  margin: 0 auto;
  padding: 0 var(--content-padding-x);
}
:deep(.docs__content) {
  width: 100%;
  min-width: 0;
  color: var(--text);
  line-height: var(--line-height-relaxed);
}
</style>
