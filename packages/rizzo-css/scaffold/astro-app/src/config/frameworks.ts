/** Scaffold: single framework (Astro); no framework switcher. All links internal. */
export const FRAMEWORK_STORAGE_KEY = 'rizzo-docs-framework';

export interface Framework {
  id: string;
  label: string;
  pathPrefix: string;
}

export const FRAMEWORKS: Framework[] = [
  { id: 'astro', label: 'Astro', pathPrefix: '' },
];

export function getFrameworkFromPath(pathname: string): {
  framework: Framework;
  canonicalPath: string;
} {
  return {
    framework: FRAMEWORKS[0],
    canonicalPath: pathname,
  };
}

export function shouldShowFrameworkSwitcher(_pathname: string): boolean {
  return false;
}
