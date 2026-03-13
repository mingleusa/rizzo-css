/**
 * Docs nav for the full template. Matches main site structure (Introduction, Components, Blocks, Themes).
 */
export interface DocsNavSection {
  id: string;
  label: string;
}

export interface DocsNavLink {
  href: string;
  label: string;
  frameworkOnly?: boolean;
  absolute?: boolean;
  sections?: DocsNavSection[];
}

export interface DocsNavGroup {
  label: string;
  links: DocsNavLink[];
}

export const DOCS_NAV: DocsNavGroup[] = [
  {
    label: 'Introduction',
    links: [
      {
        href: 'overview',
        label: 'Overview',
        frameworkOnly: true,
        sections: [
          { id: 'overview', label: 'Overview' },
          { id: 'installation', label: 'Installation' },
          { id: 'components', label: 'Components' },
          { id: 'blocks', label: 'Blocks' },
        ],
      },
      {
        href: 'getting-started',
        label: 'Getting Started',
        sections: [
          { id: 'installation', label: 'Installation' },
          { id: 'project-structure', label: 'Project Structure' },
          { id: 'development', label: 'Development' },
          { id: 'using-components', label: 'Using Components' },
          { id: 'using-themes', label: 'Using Themes' },
        ],
      },
    ],
  },
  {
    label: 'Components',
    links: [{ href: 'components', label: 'Overview', frameworkOnly: true }],
  },
  {
    label: 'Blocks',
    links: [
      { href: '/blocks', label: 'Blocks overview', absolute: true },
      { href: '/blocks/landing-hero', label: 'Landing hero', absolute: true },
      { href: '/blocks/pricing', label: 'Pricing cards', absolute: true },
      { href: '/blocks/dashboard-01', label: 'Dashboard', absolute: true },
      { href: '/blocks/docs-layout', label: 'Docs layout', absolute: true },
      { href: '/blocks/login', label: 'Login', absolute: true },
      { href: '/blocks/signup', label: 'Sign up', absolute: true },
    ],
  },
  {
    label: 'Themes',
    links: [{ href: '/themes', label: 'Themes', absolute: true }],
  },
];
