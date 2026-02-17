// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  // Required for correct CSS and asset URLs when deployed (e.g. Vercel, GitHub Pages).
  // For subpath deployment (e.g. GitHub Pages at /repo-name/), set base: '/repo-name/'.
  site: 'https://rizzo-css.vercel.app',
  base: '/',

  image: {
    domains: ['api.dicebear.com'],
  },

  vite: {
    css: {
      postcss: './postcss.config.js',
    },
  },

  integrations: [svelte()],
});