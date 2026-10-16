import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter(),
      // Rizzo components import from $lib/...; SvelteKit 3 no longer provides it by default.
      alias: { $lib: 'src/lib' },
    }),
  ],
});
