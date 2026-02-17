<script lang="ts">
  import { onMount } from 'svelte';
  import { DOCS_NAV } from '../../config/docsNav';
  import type { DocsNavLink } from '../../config/docsNav';

  interface Props {
    /** Current URL pathname (e.g. $page.url.pathname or window.location.pathname). */
    currentPath: string;
    /** Path prefix for framework-specific links (e.g. /docs, /docs/svelte, /docs/vanilla). */
    pathPrefix?: string;
    /** When true, omit the aside id to avoid duplicate ids when used inside a demo box. */
    omitId?: boolean;
  }
  let { currentPath, pathPrefix = '/docs', omitId = false }: Props = $props();

  let activeSectionId = $state<string | null>(null);

  function fullHref(link: { href: string; frameworkOnly?: boolean }): string {
    const base = link.frameworkOnly ? pathPrefix : '/docs';
    return `${base}/${link.href}`;
  }

  function isActive(link: DocsNavLink): boolean {
    const path = currentPath.replace(/\/$/, '');
    const href = fullHref(link);
    return path === href;
  }

  onMount(() => {
    function setActiveFromHash() {
      const hash = window.location.hash.slice(1) || null;
      activeSectionId = hash;
    }
    setActiveFromHash();
    window.addEventListener('hashchange', setActiveFromHash);

    let io: IntersectionObserver | null = null;
    const content = document.querySelector('.docs__content');
    if (content) {
      const headings = content.querySelectorAll<HTMLHeadingElement>('h2[id]');
      if (headings.length) {
        io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              const id = e.target.id;
              if (id) activeSectionId = id;
              break;
            }
          },
          { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
        );
        headings.forEach((h) => io!.observe(h));
      }
    }
    return () => {
      window.removeEventListener('hashchange', setActiveFromHash);
      io?.disconnect();
    };
  });
</script>

<aside id={omitId ? undefined : 'docs-sidebar'} class="docs-sidebar" aria-label="Documentation navigation">
  <nav class="docs-sidebar__nav">
    {#each DOCS_NAV as group}
      <div class="docs-sidebar__group">
        <h2 class="docs-sidebar__group-label">{group.label}</h2>
        <ul class="docs-sidebar__list">
          {#each group.links as link}
            {@const href = fullHref(link)}
            {@const active = isActive(link)}
            {@const sections = link.sections ?? []}
            <li class="docs-sidebar__item">
              <a
                href={href}
                class="docs-sidebar__link"
                class:docs-sidebar__link--active={active && (sections.length === 0 || activeSectionId === null)}
                aria-current={active && (sections.length === 0 || activeSectionId === null) ? 'page' : undefined}
              >
                {link.label}
              </a>
              {#if sections.length > 0}
                <ul class="docs-sidebar__sublist" aria-label="Sections in {link.label}">
                  {#each sections as section}
                    {@const sublinkActive = activeSectionId === section.id && currentPath.replace(/\/$/, '') === href}
                    <li class="docs-sidebar__subitem">
                      <a
                        href="{href}#{section.id}"
                        class="docs-sidebar__sublink"
                        class:docs-sidebar__sublink--active={sublinkActive}
                        aria-current={sublinkActive ? 'location' : undefined}
                      >
                        {section.label}
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </nav>
</aside>
