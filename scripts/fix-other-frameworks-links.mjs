#!/usr/bin/env node
/**
 * Standardize "Other frameworks" link order across docs:
 * - Astro pages: Vanilla · Svelte · Vue · React
 * - Vanilla pages: Astro · Svelte · Vue · React
 */
import { readFileSync, writeFileSync } from 'fs';
import { readdirSync } from 'fs';
import { join } from 'path';

const rootDir = join(import.meta.dirname, '..');

function fixAstroComponents() {
  const dir = join(rootDir, 'src/pages/docs/components');
  const files = readdirSync(dir).filter((f) => f.endsWith('.astro'));
  let changed = 0;
  for (const file of files) {
    const path = join(dir, file);
    let content = readFileSync(path, 'utf8');
    // Match: Svelte · (Vue|React) · (React|Vue) · Vanilla (with optional trailing text like ". See also ...")
    const re = /<p><strong>Other frameworks:<\/strong> <a href="\/docs\/svelte\/components\/([^"]+)">Svelte<\/a> · <a href="\/docs\/(?:vue|react)\/components\/\1">(?:Vue|React)<\/a> · <a href="\/docs\/(?:react|vue)\/components\/\1">(?:React|Vue)<\/a> · <a href="\/docs\/vanilla\/components\/\1">Vanilla<\/a>(.*?)<\/p>/g;
    const slug = '$1';
    const rest = '$2';
    const newLine = '<p><strong>Other frameworks:</strong> <a href="/docs/vanilla/components/$1">Vanilla</a> · <a href="/docs/svelte/components/$1">Svelte</a> · <a href="/docs/vue/components/$1">Vue</a> · <a href="/docs/react/components/$1">React</a>$2</p>';
    const newContent = content.replace(re, (_, slugVal, restVal) =>
      `<p><strong>Other frameworks:</strong> <a href="/docs/vanilla/components/${slugVal}">Vanilla</a> · <a href="/docs/svelte/components/${slugVal}">Svelte</a> · <a href="/docs/vue/components/${slugVal}">Vue</a> · <a href="/docs/react/components/${slugVal}">React</a>${restVal}</p>`
    );
    if (newContent !== content) {
      writeFileSync(path, newContent);
      changed++;
    }
  }
  console.log(`Astro components: ${changed} files updated`);
}

function fixVanillaComponents() {
  const dir = join(rootDir, 'src/pages/docs/vanilla/components');
  const files = readdirSync(dir).filter((f) => f.endsWith('.astro'));
  let changed = 0;
  for (const file of files) {
    const path = join(dir, file);
    let content = readFileSync(path, 'utf8');
    // Vanilla pages: ensure order Astro · Svelte · Vue · React (some have React before Vue)
    const re = /<p><strong>Other frameworks:<\/strong> <a href="\/docs\/components\/([^"]+)">Astro<\/a> · <a href="\/docs\/svelte\/components\/\1">Svelte<\/a> · <a href="\/docs\/(?:react|vue)\/components\/\1">(?:React|Vue)<\/a> · <a href="\/docs\/(?:vue|react)\/components\/\1">(?:Vue|React)<\/a><\/p>/g;
    const newContent = content.replace(re, (_, slugVal) =>
      `<p><strong>Other frameworks:</strong> <a href="/docs/components/${slugVal}">Astro</a> · <a href="/docs/svelte/components/${slugVal}">Svelte</a> · <a href="/docs/vue/components/${slugVal}">Vue</a> · <a href="/docs/react/components/${slugVal}">React</a></p>`
    );
    if (newContent !== content) {
      writeFileSync(path, newContent);
      changed++;
    }
  }
  console.log(`Vanilla components: ${changed} files updated`);
}

fixAstroComponents();
fixVanillaComponents();
