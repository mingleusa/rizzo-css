<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import Cat from './icons/Cat.vue';
import Gear from './icons/Gear.vue';
import Search from './Search.vue';

export interface NavbarLink {
  href: string;
  label: string;
}

const props = withDefaults(
  defineProps<{
    siteName?: string;
    /** Custom logo image URL (default: the Cat icon) */
    logo?: string;
    /** Override the default links (e.g. About, Skills, Projects, Contact) */
    menuLinks?: NavbarLink[];
  }>(),
  { siteName: 'Site' }
);

const defaultMenuLinks: NavbarLink[] = [
  { href: '/docs', label: 'Docs' },
  { href: '/docs/components', label: 'Components' },
  { href: '/blocks', label: 'Blocks' },
  { href: '/themes', label: 'Themes' },
];
const links = computed(() => props.menuLinks ?? defaultMenuLinks);

const menuOpen = ref(false);
let clickTimer: ReturnType<typeof setTimeout> | null = null;

function onEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') menuOpen.value = false;
}
function onOutsideClick(e: MouseEvent) {
  if (!(e.target as Element | null)?.closest?.('.navbar')) menuOpen.value = false;
}
function stopListening() {
  if (clickTimer) clearTimeout(clickTimer);
  document.removeEventListener('keydown', onEscape);
  document.removeEventListener('click', onOutsideClick);
}

// Mobile menu: Escape or a click outside closes it.
watch(menuOpen, (isOpen) => {
  stopListening();
  if (isOpen) {
    document.addEventListener('keydown', onEscape);
    clickTimer = setTimeout(() => document.addEventListener('click', onOutsideClick), 0);
  }
});
onBeforeUnmount(stopListening);

function openSettings() {
  (window as Window & { openSettings?: () => void }).openSettings?.();
}
</script>

<template>
  <nav class="navbar" aria-label="Main navigation">
    <div class="navbar__container">
      <div class="navbar__brand">
        <a href="/" class="navbar__brand-link">
          <img v-if="logo" :src="logo" alt="" class="navbar__logo" />
          <Cat v-else :width="32" :height="32" class="navbar__logo" />
          {{ siteName }}
        </a>
      </div>
      <div class="navbar__actions-desktop">
        <Search id="search-navbar" />
        <button type="button" class="navbar__settings-btn" aria-label="Open settings" @click="openSettings">
          <Gear :width="20" :height="20" class="navbar__settings-icon" />
          <span class="navbar__settings-label">Settings</span>
        </button>
      </div>
      <button type="button" class="navbar__toggle" aria-label="Toggle menu" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
        <span class="navbar__toggle-icon" aria-hidden="true"><span></span><span></span><span></span></span>
      </button>
      <div :class="['navbar__menu', { 'navbar__menu--open': menuOpen }]" :aria-hidden="!menuOpen" role="navigation" aria-label="Mobile menu">
        <div v-for="link in links" :key="link.href" class="navbar__item">
          <a :href="link.href" class="navbar__link" :tabindex="menuOpen ? 0 : -1">{{ link.label }}</a>
        </div>
      </div>
    </div>
  </nav>
</template>
