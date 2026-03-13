<template>
  <div>
    <section class="docs-components-intro">
      <h1 class="docs__title">Components</h1>
      <p class="docs-components-intro__tagline">
        Browse the collection of accessible, themeable components. Same CSS and BEM for Astro, Svelte, Vue, and Vanilla.
      </p>
      <p class="docs-components-intro__meta">
        Each component has live demos and code on the full docs site. Quick jump:
        <a href="https://rizzo-css.vercel.app/docs/components" target="_blank" rel="noopener noreferrer">Astro</a>
        ·
        <a href="https://rizzo-css.vercel.app/docs/svelte/components" target="_blank" rel="noopener noreferrer">Svelte</a>
        ·
        <a href="https://rizzo-css.vercel.app/docs/vanilla/components" target="_blank" rel="noopener noreferrer">Vanilla</a>.
      </p>
    </section>

    <section v-for="cat in categories" :key="cat.id" class="docs-component-category" :id="cat.id">
      <h2 class="docs-component-category__title">{{ cat.label }}</h2>
      <div class="docs-component-grid">
        <a
          v-for="item in cat.items"
          :key="item.href"
          :href="DOCS_BASE + item.href"
          class="component-card-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card variant="elevated">
            <div class="card__body">
              <h3 style="margin: 0 0 var(--spacing-2) 0;">{{ item.title }}</h3>
              <p style="margin: 0; color: var(--text-dim); font-size: var(--font-size-sm);">{{ item.description }}</p>
            </div>
          </Card>
        </a>
      </div>
    </section>

    <section>
      <h2>Component features</h2>
      <p>All components share: semantic theming, accessibility (keyboard + ARIA), BEM naming, responsive design, and WCAG AA compliance.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getComponentsByCategory } from '@/config/componentCategories';
import Card from '@/components/rizzo/Card.vue';

const DOCS_BASE = 'https://rizzo-css.vercel.app';
const categories = getComponentsByCategory();
</script>

<style scoped>
.docs-components-intro {
  margin-bottom: var(--spacing-10);
}
.docs-components-intro__tagline {
  font-size: var(--text-lg);
  color: var(--text-dim);
  margin: 0 0 var(--spacing-2);
  line-height: var(--line-height-relaxed);
}
.docs-components-intro__meta {
  font-size: var(--font-size-sm);
  color: var(--text-dim);
  margin: 0;
}
.docs-component-category {
  margin-bottom: var(--spacing-10);
}
.docs-component-category:last-of-type {
  margin-bottom: 0;
}
.docs-component-category__title {
  font-size: var(--text-lg);
  font-weight: 600;
  margin: 0 0 var(--spacing-4);
  color: var(--text);
}
.docs-component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--spacing-70), 1fr));
  gap: var(--spacing-6);
  margin: 0;
}
.component-card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform var(--transition-base);
}
.component-card-link :deep(.card) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.component-card-link :deep(.card .card__body) {
  flex: 1;
}
.component-card-link:hover {
  transform: translateY(calc(-1 * var(--spacing-0-125)));
}
.component-card-link:hover :deep(.card__body h3) {
  color: var(--accent-fg);
}
@media (width <= 640px) {
  .docs-component-grid {
    grid-template-columns: 1fr;
  }
}
</style>
