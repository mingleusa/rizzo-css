/** localStorage key for the user's last selected docs framework. */
export const FRAMEWORK_STORAGE_KEY = 'rizzo-docs-framework';

/**
 * Framework options for docs. Each has a path prefix; Astro is the default (no extra segment).
 * Used by FrameworkSwitcher and Navbar to build equivalent URLs across frameworks.
 */
export interface Framework {
  id: string;
  label: string;
  /** Path prefix for this framework's docs (e.g. /docs for Astro, /docs/svelte for Svelte). */
  pathPrefix: string;
}

export const FRAMEWORKS: Framework[] = [
  { id: 'astro', label: 'Astro', pathPrefix: '/docs' },
  { id: 'svelte', label: 'Svelte', pathPrefix: '/docs/svelte' },
  // { id: 'react', label: 'React', pathPrefix: '/docs/react' },
  // { id: 'vue', label: 'Vue', pathPrefix: '/docs/vue' },
];

const FRAMEWORK_PREFIXES = FRAMEWORKS.map((f) => f.pathPrefix).filter((p) => p !== '/docs');

/**
 * Returns the "canonical" path segment (e.g. /components/button) and the current framework.
 * Astro docs live at /docs/...; Svelte at /docs/svelte/...
 */
export function getFrameworkFromPath(pathname: string): {
  framework: Framework;
  canonicalPath: string;
} {
  let canonicalPath = pathname;
  let framework = FRAMEWORKS[0]; // Astro

  for (const prefix of FRAMEWORK_PREFIXES) {
    if (pathname.startsWith(prefix + '/') || pathname === prefix) {
      canonicalPath = pathname.slice(prefix.length) || '/';
      framework = FRAMEWORKS.find((f) => f.pathPrefix === prefix) ?? FRAMEWORKS[0];
      break;
    }
  }

  // If we're under /docs but not under a framework prefix, canonical is pathname minus /docs
  if (pathname.startsWith('/docs') && framework.id === 'astro') {
    canonicalPath = pathname.slice('/docs'.length) || '/';
  }

  return { framework, canonicalPath };
}

/**
 * True when this path should show the framework switcher (components, themes, or framework root).
 */
export function shouldShowFrameworkSwitcher(pathname: string): boolean {
  const { canonicalPath } = getFrameworkFromPath(pathname);
  return (
    canonicalPath.startsWith('/components') ||
    canonicalPath.startsWith('/themes') ||
    canonicalPath === '/' ||
    canonicalPath === ''
  );
}
