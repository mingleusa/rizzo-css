// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import react from '@astrojs/react';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  // Required for correct CSS and asset URLs when deployed (production: Plesk, see docs/DEPLOYMENT.md).
  // For subpath deployment (e.g. GitHub Pages at /repo-name/), set base: '/repo-name/'.
  site: 'https://rizzo-css.jordanmingle.dev',
  base: '/',

  // /docs has no page of its own; send it to the first page in the docs nav.
  redirects: {
    '/docs': '/docs/overview',
  },

  image: {
    domains: ['api.dicebear.com'],
  },

  vite: {
    css: {
      postcss: './postcss.config.js',
    },
  },

  integrations: [svelte(), react(), vue()],
});