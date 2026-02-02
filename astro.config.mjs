// @ts-check
import { defineConfig } from 'astro/config';

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
});
