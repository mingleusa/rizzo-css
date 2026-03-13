<template>
  <div class="docs" data-docs>
    <div id="docs-sidebar-container">
      <button
        type="button"
        class="docs__sidebar-toggle"
        aria-label="Open documentation menu"
        aria-expanded="false"
        aria-controls="docs-sidebar"
        data-docs-sidebar-toggle
        @click="toggleSidebar"
      >
        <span class="docs__sidebar-toggle-icon" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
        <span class="docs__sidebar-toggle-text">Docs</span>
      </button>
      <div class="docs__sidebar-overlay" data-docs-sidebar-overlay aria-hidden="true" @click="closeSidebar" />
      <DocsSidebar :current-path="currentPath" path-prefix="/docs" :nav="DOCS_NAV" />
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
import DocsSidebar from '@/components/rizzo/DocsSidebar.vue';
import BackToTop from '@/components/rizzo/BackToTop.vue';
import { DOCS_NAV } from '@/config/docsNav';

const route = useRoute();
const currentPath = computed(() => route.path);

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
:deep(.docs__content h2) {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-top: var(--section-spacing-lg);
  margin-bottom: var(--spacing-6);
  color: var(--text);
  padding-bottom: var(--spacing-2);
  border-bottom: 1px solid var(--border);
}
:deep(.docs__content h3) {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  margin-top: var(--spacing-8);
  margin-bottom: var(--spacing-4);
  color: var(--text);
}
:deep(.docs__content p) {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-5);
}
:deep(.docs__content ul) {
  margin-bottom: var(--spacing-5);
  padding-left: var(--spacing-8);
}
:deep(.docs__content a) {
  color: var(--accent-fg);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
:deep(.docs__content a:hover) {
  color: var(--accent-fg-hover);
}
:deep(.docs__content .component-card-link),
:deep(.docs__content .block-card-link) {
  text-decoration: none;
}
:deep(.docs__content .component-card-link *),
:deep(.docs__content .block-card-link *) {
  text-decoration: none;
}
</style>
