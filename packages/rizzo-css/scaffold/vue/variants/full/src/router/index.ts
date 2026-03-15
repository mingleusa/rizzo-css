import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import BlocksLayout from '../layouts/BlocksLayout.vue';
import BlocksIndex from '../views/BlocksIndex.vue';
import DocsLayout from '../layouts/DocsLayout.vue';
import DocsIndex from '../views/DocsIndex.vue';
import DocsOverview from '../views/DocsOverview.vue';
import DocsGettingStarted from '../views/DocsGettingStarted.vue';
import DocsComponents from '../views/DocsComponents.vue';
import Themes from '../views/Themes.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/blocks',
    component: BlocksLayout,
    children: [
      { path: '', name: 'Blocks', component: BlocksIndex },
    ],
  },
  {
    path: '/docs',
    component: DocsLayout,
    children: [
      {
        path: '',
        name: 'Docs',
        component: DocsIndex,
        meta: {
          title: 'Docs overview',
          description:
            'Rizzo CSS is a design system built on semantic theming and 14 themes. One CSS codebase, 53 accessible BEM components — for Vanilla JS, Astro, Svelte, React, and Vue.',
        },
      },
      {
        path: 'overview',
        name: 'DocsOverview',
        component: DocsOverview,
        meta: { title: 'Overview', description: 'Introduction to Rizzo CSS and the design system' },
      },
      {
        path: 'getting-started',
        name: 'DocsGettingStarted',
        component: DocsGettingStarted,
        meta: {
          title: 'Getting Started',
          description: 'Installation, project structure, and quick start guide',
        },
      },
      {
        path: 'components',
        name: 'DocsComponents',
        component: DocsComponents,
        meta: { title: 'Components', description: 'Browse all components by category' },
      },
    ],
  },
  { path: '/themes', name: 'Themes', component: Themes },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
