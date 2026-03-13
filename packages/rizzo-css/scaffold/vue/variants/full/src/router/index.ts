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
      { path: '', name: 'Docs', component: DocsIndex },
      { path: 'overview', name: 'DocsOverview', component: DocsOverview },
      { path: 'getting-started', name: 'DocsGettingStarted', component: DocsGettingStarted },
      { path: 'components', name: 'DocsComponents', component: DocsComponents },
    ],
  },
  { path: '/themes', name: 'Themes', component: Themes },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
