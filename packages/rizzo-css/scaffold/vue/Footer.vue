<script setup lang="ts">
export interface FooterLink {
  href: string;
  label: string;
}

withDefaults(
  defineProps<{
    /** Site or product name shown in copyright */
    siteName?: string;
    /** Copyright year (default: current year) */
    year?: number;
    /** Optional list of footer links */
    links?: FooterLink[];
    class?: string;
  }>(),
  {
    siteName: '',
    year: () => new Date().getFullYear(),
    links: () => [],
    class: '',
  }
);
</script>

<template>
  <footer :class="['footer', $props.class].filter(Boolean).join(' ')" role="contentinfo">
    <div class="footer__container">
      <div class="footer__inner">
        <p class="footer__copyright">
          <template v-if="siteName">
            <span class="footer__site-name">{{ siteName }}</span>
            · 
          </template>
          <span class="footer__year">© {{ year }}</span>
        </p>
        <nav v-if="links && links.length > 0" class="footer__nav" aria-label="Footer">
          <ul class="footer__links">
            <li v-for="(link, i) in links" :key="i" class="footer__link-item">
              <a class="footer__link" :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
        </nav>
        <slot />
      </div>
    </div>
  </footer>
</template>
