<script lang="ts">
  import { DOCS_NAV } from '../../config/docsNav';

  interface Props {
    /** Current URL pathname (e.g. $page.url.pathname or window.location.pathname). */
    currentPath: string;
    /** Path prefix for framework-specific links (e.g. /docs, /docs/svelte, /docs/vanilla). */
    pathPrefix?: string;
    /** When true, omit the aside id to avoid duplicate ids when used inside a demo box. */
    omitId?: boolean;
  }
  let { currentPath, pathPrefix = '/docs', omitId = false }: Props = $props();

  function fullHref(link: { href: string; frameworkOnly?: boolean }): string {
    const base = link.frameworkOnly ? pathPrefix : '/docs';
    return `${base}/${link.href}`;
  }

  function isActive(link: { href: string; frameworkOnly?: boolean }): boolean {
    const path = currentPath.replace(/\/$/, '');
    const href = fullHref(link);
    return path === href;
  }
</script>

<aside id={omitId ? undefined : 'docs-sidebar'} class="docs-sidebar" aria-label="Documentation navigation" tabindex="0">
  <nav class="docs-sidebar__nav">
    {#each DOCS_NAV as group}
      <div class="docs-sidebar__group">
        <h2 class="docs-sidebar__group-label">{group.label}</h2>
        <ul class="docs-sidebar__list">
          {#each group.links as link}
            {@const href = fullHref(link)}
            {@const active = isActive(link)}
            <li class="docs-sidebar__item">
              <a
                href={href}
                class="docs-sidebar__link"
                class:docs-sidebar__link--active={active}
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </nav>
</aside>
