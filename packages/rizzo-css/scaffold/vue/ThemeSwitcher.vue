<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import ChevronDown from './icons/ChevronDown.vue';
import { THEMES_DARK, THEMES_LIGHT } from './themes';
import { applyTheme, getThemeLabel, THEME_SYSTEM } from './theme';

const props = withDefaults(
  defineProps<{
    /** Prefix for trigger/menu IDs so several switchers can coexist (e.g. "settings" → theme-switcher-settings-trigger). */
    idPrefix?: string;
  }>(),
  { idPrefix: '' }
);

const DEFAULT_THEME_DARK = 'github-dark-classic';
const SYSTEM_BG = 'oklch(55% 0.02 270deg)';

const THEME_ICON_SVG: Record<string, string> = {
  system:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>',
  'github-dark-classic':
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 7h.01" /><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" /><path d="m20 7 2 .5-2 .5" /><path d="M10 18v3" /><path d="M14 17.75V21" /><path d="M7 18a6 6 0 0 0 3.84-10.61" /></svg>',
  'github-light':
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>',
  'red-velvet-cupcake':
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" /><path d="M4 16s1-1 4-1 5 2 8 2 4-1 4-1V4" /><path d="M2 16v4M22 16v4M8 8h.01M16 8h.01M8 12h.01M16 12h.01" /></svg>',
  'orangy-one-light':
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15.5 6.5c.5-2.5 2.5-4 5-4 1.5 0 2.5.5 3 1" /><path d="M12 12c-2 2-3 4-3 6 0 3 2 5 5 5 2 0 4-1 6-3" /><path d="M18 12c2 2 3 4 3 6 0 3-2 5-5 5-2 0-4-1-6-3" /></svg>',
  sunflower:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 17a10 10 0 0 0-20 0" /><path d="M6 17a6 6 0 0 1 12 0" /><path d="M10 17a2 2 0 0 1 4 0" /></svg>',
  'shades-of-purple':
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25"/><path d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/></svg>',
  'sandstorm-classic':
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>',
  'rocky-blood-orange':
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 10V2M4.93 10.93l1.41 1.41M2 18h2M20 18h2M17.66 10.93l1.41-1.41M22 22H2M8 6l4-4 4 4M16 18a4 4 0 0 0-8 0" /><path d="M12 22v-4" /></svg>',
  'minimal-dark-neon-yellow':
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>',
  'hack-the-box':
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>',
  'green-breeze-light':
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>',
  'pink-cat-boo':
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>',
  'cute-pink':
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18c0-2 1.5-4 4-4s4 2 4 4c0 2-1.5 4-4 4s-4-2-4-4Z" /><path d="M15 18c0-2 1.5-4 4-4s4 2 4 4c0 2-1.5 4-4 4s-4-2-4-4Z" /><path d="M12 8v4M10 10l-2 2M14 10l2 2" /></svg>',
  'semi-light-purple':
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" /><path d="M7.87 14.14c-.32.32-.67.68-1.06 1.06a5.04 5.04 0 0 1-2.17 1.22c-.47.15-.85.2-1.15.2-.16 0-.3-.02-.41-.03a1 1 0 0 1-.63-.97c-.01-.14.02-.31.07-.51.1-.41.3-.95.6-1.59.3-.64.67-1.33 1.08-2.05" /></svg>',
};

interface PreviewOption {
  value: string;
  label: string;
  bg: string;
  accent: string;
}

const open = ref(false);
const stored = ref(DEFAULT_THEME_DARK);
const currentTheme = ref(DEFAULT_THEME_DARK);
const previewOption = ref<PreviewOption | null>(null);
const menuEl = ref<HTMLElement | null>(null);
const triggerEl = ref<HTMLElement | null>(null);

const menuId = computed(() => (props.idPrefix ? `theme-switcher-${props.idPrefix}-menu` : 'theme-switcher-menu'));
const triggerId = computed(() => (props.idPrefix ? `theme-switcher-${props.idPrefix}-trigger` : 'theme-switcher-trigger'));

function readCurrent(): string {
  return document.documentElement.getAttribute('data-theme') || DEFAULT_THEME_DARK;
}

function readStored(): string {
  try {
    return localStorage.getItem('theme') || readCurrent();
  } catch {
    return readCurrent();
  }
}

function syncFromStorage() {
  stored.value = readStored();
  currentTheme.value = readCurrent();
}

const currentLabel = computed(() => (stored.value === THEME_SYSTEM ? 'System' : getThemeLabel(currentTheme.value)));
const currentIconSvg = computed(
  () => THEME_ICON_SVG[stored.value === THEME_SYSTEM ? THEME_SYSTEM : currentTheme.value || DEFAULT_THEME_DARK] || THEME_ICON_SVG[DEFAULT_THEME_DARK] || ''
);
const resolvedThemeInfo = computed(() => THEMES_DARK.concat(THEMES_LIGHT).find((t) => t.value === currentTheme.value));
const preview = computed(
  () =>
    previewOption.value ??
    (stored.value === THEME_SYSTEM
      ? (resolvedThemeInfo.value ?? { value: THEME_SYSTEM, label: 'System', bg: SYSTEM_BG, accent: '' })
      : resolvedThemeInfo.value)
);

function isActive(value: string): boolean {
  return stored.value === value || (stored.value === THEME_SYSTEM && value === currentTheme.value);
}

function selectTheme(value: string) {
  applyTheme(value);
  syncFromStorage();
  open.value = false;
  triggerEl.value?.focus();
}

function setPreview(option: PreviewOption) {
  previewOption.value = option;
}

function options(): HTMLElement[] {
  return menuEl.value ? Array.from(menuEl.value.querySelectorAll<HTMLElement>('.theme-switcher__option')) : [];
}

/**
 * Focus an option once it can receive focus. The menu fades in (options stay `visibility: hidden`
 * for part of the transition) and `focus()` is a no-op on hidden elements, so retry for a few frames.
 */
function focusOption(index: number) {
  let frames = 0;
  const attempt = () => {
    const list = options();
    const el = list[index < 0 ? list.length - 1 : index];
    el?.focus();
    if (el && document.activeElement !== el && frames++ < 40 && open.value) requestAnimationFrame(attempt);
  };
  requestAnimationFrame(attempt);
}

/** Keyboard support for the trigger and the menu (events bubble to the root element). */
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (!open.value) return;
    open.value = false;
    triggerEl.value?.focus();
    e.preventDefault();
    return;
  }
  if (!open.value) {
    if (e.target !== triggerEl.value) return;
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open.value = true;
      focusOption(0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      open.value = true;
      focusOption(-1);
    }
    return;
  }
  const list = options();
  const i = list.indexOf(e.target as HTMLElement);
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    list[(i + 1) % list.length]?.focus();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    list[i <= 0 ? list.length - 1 : i - 1]?.focus();
  } else if (e.key === 'Home') {
    e.preventDefault();
    list[0]?.focus();
  } else if (e.key === 'End') {
    e.preventDefault();
    list[list.length - 1]?.focus();
  } else if ((e.key === 'Enter' || e.key === ' ') && i >= 0) {
    e.preventDefault();
    const value = list[i].getAttribute('data-theme-value');
    if (value) selectTheme(value);
  } else if (e.key === 'Tab') {
    open.value = false;
  }
}

function onDocumentClick(e: MouseEvent) {
  const target = e.target as Node;
  if (menuEl.value && triggerEl.value && !menuEl.value.contains(target) && !triggerEl.value.contains(target)) open.value = false;
}

watch(open, (isOpen) => {
  document.removeEventListener('click', onDocumentClick);
  if (isOpen) document.addEventListener('click', onDocumentClick);
});

function onFocusOut(e: FocusEvent) {
  const related = e.relatedTarget as Node | null;
  if (!related || !menuEl.value?.contains(related)) previewOption.value = null;
}

const onThemeChange = () => syncFromStorage();

onMounted(() => {
  syncFromStorage();
  window.addEventListener('rizzo-theme-change', onThemeChange);
});
onBeforeUnmount(() => {
  window.removeEventListener('rizzo-theme-change', onThemeChange);
  document.removeEventListener('click', onDocumentClick);
});
</script>

<template>
  <div class="theme-switcher" data-theme-switcher @keydown="onKeydown">
    <button
      ref="triggerEl"
      :id="triggerId"
      type="button"
      class="theme-switcher__trigger"
      :aria-expanded="open"
      aria-haspopup="true"
      :aria-controls="menuId"
      @click="open = !open"
    >
      <span class="sr-only">Select theme: </span>
      <span class="theme-switcher__label-wrapper" data-theme-label-wrapper>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-if="currentIconSvg" class="theme-switcher__label-icon" data-theme-label-icon v-html="currentIconSvg"></span>
        <span class="theme-switcher__label" data-theme-label>{{ currentLabel }}</span>
      </span>
      <ChevronDown :width="16" :height="16" class="theme-switcher__icon" />
    </button>

    <div
      ref="menuEl"
      :id="menuId"
      :class="['theme-switcher__menu', { 'theme-switcher__menu--open': open }]"
      role="menu"
      :aria-labelledby="triggerId"
      aria-label="Theme selection menu"
      :aria-hidden="!open"
      tabindex="-1"
      @mouseleave="previewOption = null"
      @focusout="onFocusOut"
    >
      <div class="theme-switcher__menu-options">
        <div class="theme-switcher__group" role="group" aria-label="Preference">
          <div class="theme-switcher__group-label" role="presentation">Preference</div>
          <div
            :class="['theme-switcher__option', { 'theme-switcher__option--active': isActive(THEME_SYSTEM) }]"
            role="menuitemradio"
            :aria-checked="stored === THEME_SYSTEM"
            :tabindex="open ? 0 : -1"
            data-theme-value="system"
            data-theme-type="system"
            :data-theme-bg="SYSTEM_BG"
            data-theme-accent=""
            data-theme-label="System"
            @click="selectTheme(THEME_SYSTEM)"
            @mouseenter="setPreview({ value: THEME_SYSTEM, label: 'System', bg: SYSTEM_BG, accent: '' })"
            @focus="setPreview({ value: THEME_SYSTEM, label: 'System', bg: SYSTEM_BG, accent: '' })"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="theme-switcher__option-icon" v-html="THEME_ICON_SVG['system'] || ''"></span>
            <span class="sr-only">Preference: </span>
            System
          </div>
        </div>
        <div class="theme-switcher__group" role="group" aria-label="Dark themes">
          <div class="theme-switcher__group-label" role="presentation">Dark</div>
          <div
            v-for="theme in THEMES_DARK"
            :key="theme.value"
            :class="['theme-switcher__option', { 'theme-switcher__option--active': isActive(theme.value) }]"
            role="menuitemradio"
            :aria-checked="stored === theme.value"
            :tabindex="open ? 0 : -1"
            :data-theme-value="theme.value"
            data-theme-type="dark"
            :data-theme-bg="theme.bg"
            :data-theme-accent="theme.accent"
            :data-theme-label="theme.label"
            @click="selectTheme(theme.value)"
            @mouseenter="setPreview({ value: theme.value, label: theme.label, bg: theme.bg, accent: theme.accent })"
            @focus="setPreview({ value: theme.value, label: theme.label, bg: theme.bg, accent: theme.accent })"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="theme-switcher__option-icon" v-html="THEME_ICON_SVG[theme.value] || ''"></span>
            <span class="sr-only">Dark theme: </span>
            {{ theme.label }}
          </div>
        </div>
        <div class="theme-switcher__group" role="group" aria-label="Light themes">
          <div class="theme-switcher__group-label" role="presentation">Light</div>
          <div
            v-for="theme in THEMES_LIGHT"
            :key="theme.value"
            :class="['theme-switcher__option', { 'theme-switcher__option--active': isActive(theme.value) }]"
            role="menuitemradio"
            :aria-checked="stored === theme.value"
            :tabindex="open ? 0 : -1"
            :data-theme-value="theme.value"
            data-theme-type="light"
            :data-theme-bg="theme.bg"
            :data-theme-accent="theme.accent"
            :data-theme-label="theme.label"
            @click="selectTheme(theme.value)"
            @mouseenter="setPreview({ value: theme.value, label: theme.label, bg: theme.bg, accent: theme.accent })"
            @focus="setPreview({ value: theme.value, label: theme.label, bg: theme.bg, accent: theme.accent })"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span class="theme-switcher__option-icon" v-html="THEME_ICON_SVG[theme.value] || ''"></span>
            <span class="sr-only">Light theme: </span>
            {{ theme.label }}
          </div>
        </div>
      </div>
      <div
        class="theme-switcher__preview"
        data-theme-preview
        :aria-hidden="!open"
        :style="preview?.accent ? { '--preview-accent': preview.accent } : undefined"
      >
        <div class="theme-switcher__preview-title">Preview</div>
        <div class="theme-switcher__preview-header" data-theme-preview-label>{{ preview?.label ?? '' }}</div>
        <div class="theme-switcher__preview-swatch-wrap">
          <div
            class="theme-switcher__preview-swatch"
            data-theme-preview-swatch
            :style="preview?.bg ? { backgroundColor: preview.bg } : undefined"
          ></div>
        </div>
        <div class="theme-switcher__preview-accent" data-theme-preview-accent></div>
      </div>
    </div>
  </div>
</template>
