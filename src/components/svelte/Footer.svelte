<script lang="ts">
  export interface FooterLink {
    href: string;
    label: string;
  }

  interface Props {
    /** Site or product name shown in copyright */
    siteName?: string;
    /** Copyright year (default: current year) */
    year?: number;
    /** Optional list of footer links */
    links?: FooterLink[];
    class?: string;
  }
  let {
    siteName = '',
    year = new Date().getFullYear(),
    links = [],
    class: className = '',
  }: Props = $props();

  const classes = $derived(['footer', className].filter(Boolean).join(' ').trim());
</script>

<footer class={classes} role="contentinfo">
  <div class="footer__container">
    <div class="footer__inner">
      <p class="footer__copyright">
        {#if siteName}
          <span class="footer__site-name">{siteName}</span>
          {' · '}
        {/if}
        <span class="footer__year">© {year}</span>
      </p>
      {#if links && links.length > 0}
        <nav class="footer__nav" aria-label="Footer">
          <ul class="footer__links">
            {#each links as link}
              <li class="footer__link-item">
                <a class="footer__link" href={link.href}>{link.label}</a>
              </li>
            {/each}
          </ul>
        </nav>
      {/if}
    </div>
  </div>
</footer>
