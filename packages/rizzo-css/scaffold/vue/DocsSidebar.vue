<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

export interface DocsNavSection {
  id: string;
  label: string;
}

export interface DocsNavLink {
  href: string;
  label: string;
  frameworkOnly?: boolean;
  absolute?: boolean;
  sections?: DocsNavSection[];
  /** When true, open in new tab (external to main site). */
  external?: boolean;
}

export interface DocsNavGroup {
  label: string;
  links: DocsNavLink[];
}

const props = withDefaults(
  defineProps<{
    /** Current URL pathname (e.g. route.path or window.location.pathname). */
    currentPath: string;
    /** Path prefix for framework-specific links (e.g. /docs). */
    pathPrefix?: string;
    /** When true, omit the aside id to avoid duplicate ids when used inside a demo box. */
    omitId?: boolean;
    /** Nav config (when not provided, sidebar renders minimal placeholder for base template). */
    nav?: DocsNavGroup[];
  }>(),
  { pathPrefix: '/docs', omitId: false, nav: () => [] }
);

const activeSectionId = ref<string | null>(null);

function fullHref(link: { href: string; frameworkOnly?: boolean; absolute?: boolean }): string {
  if (link.absolute && link.href) return link.href;
  const base = link.frameworkOnly ? props.pathPrefix : '/docs';
  return `${base}/${link.href}`;
}

function isActive(link: DocsNavLink): boolean {
  const path = props.currentPath.replace(/\/$/, '');
  const href = fullHref(link);
  return path === href;
}

let io: IntersectionObserver | null = null;

function setActiveFromHash() {
  activeSectionId.value = window.location.hash.slice(1) || null;
}

onMounted(() => {
  setActiveFromHash();
  window.addEventListener('hashchange', setActiveFromHash);

  const content = document.querySelector('.docs__content');
  if (content) {
    const headings = content.querySelectorAll<HTMLHeadingElement>('h2[id]');
    if (headings.length) {
      io = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const id = (e.target as HTMLElement).id;
            if (id) activeSectionId.value = id;
            break;
          }
        },
        { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
      );
      headings.forEach((h) => io!.observe(h));
    }
  }
});

onUnmounted(() => {
  window.removeEventListener('hashchange', setActiveFromHash);
  io?.disconnect();
});
</script>

<template>
  <aside
    :id="omitId ? undefined : 'docs-sidebar'"
    class="docs-sidebar"
    aria-label="Documentation navigation"
  >
    <nav v-if="nav && nav.length > 0" class="docs-sidebar__nav">
      <div v-for="group in nav" :key="group.label" class="docs-sidebar__group">
        <h2 class="docs-sidebar__group-label">{{ group.label }}</h2>
        <ul class="docs-sidebar__list">
          <li v-for="link in group.links" :key="link.href + link.label" class="docs-sidebar__item">
            <a
              :href="fullHref(link)"
              class="docs-sidebar__link"
              :class="{ 'docs-sidebar__link--active': isActive(link) && (link.sections?.length === 0 || activeSectionId == null) }"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              :aria-current="isActive(link) && (link.sections?.length === 0 || activeSectionId == null) ? 'page' : undefined"
            >
              {{ link.label }}
            </a>
            <ul
              v-if="link.sections && link.sections.length > 0"
              class="docs-sidebar__sublist"
              :aria-label="`Sections in ${link.label}`"
            >
              <li v-for="section in link.sections" :key="section.id" class="docs-sidebar__subitem">
                <a
                  :href="`${fullHref(link)}#${section.id}`"
                  class="docs-sidebar__sublink"
                  :class="{ 'docs-sidebar__sublink--active': !link.external && activeSectionId === section.id && currentPath.replace(/\/$/, '') === fullHref(link).split('#')[0] }"
                  :aria-current="(!link.external && activeSectionId === section.id && currentPath.replace(/\/$/, '') === fullHref(link).split('#')[0]) ? 'location' : undefined"
                  :target="link.external ? '_blank' : undefined"
                  :rel="link.external ? 'noopener noreferrer' : undefined"
                >
                  {{ section.label }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    <div v-else class="docs-sidebar__nav docs-sidebar__nav--placeholder">
      <p class="docs-sidebar__placeholder">Docs sidebar — add <code>nav</code> prop with DOCS_NAV for full nav.</p>
    </div>
  </aside>
</template>

<style scoped>
.docs-sidebar__placeholder {
  font-size: 0.875rem;
  color: var(--text-dim);
  margin: 0;
}
</style>
