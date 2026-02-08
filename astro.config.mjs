// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
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