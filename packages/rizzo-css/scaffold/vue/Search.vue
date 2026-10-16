<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import SearchIcon from './icons/Search.vue';
import Close from './icons/Close.vue';
import Cmd from './icons/Cmd.vue';

withDefaults(defineProps<{ id?: string }>(), { id: 'search-main' });

const open = ref(false);
const query = ref('');
const searchEl = ref<HTMLElement | null>(null);
const panelEl = ref<HTMLElement | null>(null);
const triggerEl = ref<HTMLElement | null>(null);
const inputEl = ref<HTMLInputElement | null>(null);

const FOCUSABLE =
  'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/** While open: Escape closes, Tab/Shift+Tab are trapped inside the panel. */
function onPanelKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault();
    open.value = false;
    return;
  }
  if (e.key !== 'Tab' || !panelEl.value) return;
  const items = Array.from(panelEl.value.querySelectorAll<HTMLElement>(FOCUSABLE));
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement as HTMLElement | null;
  if (e.shiftKey) {
    if (active === first || !panelEl.value.contains(active)) {
      e.preventDefault();
      last.focus();
    }
  } else if (active === last || !panelEl.value.contains(active)) {
    e.preventDefault();
    first.focus();
  }
}

watch(
  open,
  async (isOpen, wasOpen) => {
    if (isOpen) {
      document.addEventListener('keydown', onPanelKeydown);
      await nextTick();
      inputEl.value?.focus();
    } else {
      document.removeEventListener('keydown', onPanelKeydown);
      if (wasOpen) setTimeout(() => triggerEl.value?.focus(), 0);
    }
  },
  { flush: 'post' }
);

/** Cmd/Ctrl+K toggles the search, unless focus is in some other text field. */
function onShortcut(e: KeyboardEvent) {
  const isMod = e.ctrlKey || e.metaKey;
  if (!isMod || (e.key !== 'k' && e.key !== 'K')) return;
  const target = e.target as Element | null;
  const root = searchEl.value;
  const inOtherInput =
    !!target &&
    !!root &&
    !root.contains(target) &&
    (target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      (target as HTMLElement).isContentEditable === true ||
      !!target.closest?.('input, textarea, [contenteditable="true"]'));
  if (open.value || !inOtherInput) {
    e.preventDefault();
    e.stopPropagation();
    open.value = !open.value;
  }
}

onMounted(() => document.addEventListener('keydown', onShortcut, true));
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onShortcut, true);
  document.removeEventListener('keydown', onPanelKeydown);
});

function onOverlayClick(e: MouseEvent) {
  if (e.target === e.currentTarget) open.value = false;
}
</script>

<template>
  <div ref="searchEl" class="search" data-search>
    <div class="search__trigger-wrapper">
      <button
        ref="triggerEl"
        type="button"
        class="search__trigger"
        aria-label="Open search"
        data-search-trigger
        :aria-expanded="open"
        :aria-controls="`${id}-panel`"
        @click="open = !open"
      >
        <SearchIcon :width="20" :height="20" class="search__icon" />
        <span class="search__trigger-text">Search</span>
        <kbd class="search__kbd" aria-hidden="true">
          <span class="search__kbd-modifier"><Cmd :width="14" :height="14" /></span>
          <kbd>K</kbd>
        </kbd>
      </button>
    </div>
    <div
      class="search__overlay"
      :id="`${id}-panel`"
      :aria-hidden="!open"
      role="dialog"
      aria-modal="true"
      data-search-overlay
      @click="onOverlayClick"
    >
      <div
        ref="panelEl"
        class="search__panel"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`${id}-title`"
        :aria-hidden="!open"
        :data-open="open ? 'true' : undefined"
        tabindex="-1"
      >
        <h2 :id="`${id}-title`" class="sr-only">Search</h2>
        <div class="search__header">
          <div class="search__input-wrapper">
            <SearchIcon :width="20" :height="20" class="search__input-icon" />
            <input ref="inputEl" v-model="query" type="search" class="search__input" placeholder="Search…" aria-label="Search" />
          </div>
          <button type="button" class="search__close-btn" aria-label="Close search" @click="open = false">
            <Close :width="20" :height="20" />
          </button>
        </div>
        <div class="search__results" role="listbox" aria-label="Search results">
          <div class="search__empty">
            <p class="search__empty-text">Start typing to search…</p>
          </div>
          <div class="search__results-list" role="group" aria-label="Sample results">
            <a href="/docs/getting-started" class="search__result-item" :tabindex="open ? 0 : -1"><div class="search__result-category">Docs</div><div class="search__result-title">Getting started</div></a>
            <a href="/docs/components" class="search__result-item" :tabindex="open ? 0 : -1"><div class="search__result-category">Docs</div><div class="search__result-title">Components</div></a>
            <a href="/docs/theming" class="search__result-item" :tabindex="open ? 0 : -1"><div class="search__result-category">Docs</div><div class="search__result-title">Theming</div></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
