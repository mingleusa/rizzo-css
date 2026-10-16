<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import ChevronDown from './icons/ChevronDown.vue';
import { FONT_PAIRS, FONT_PAIR_DEFAULT } from '../config/fonts';

const props = withDefaults(
  defineProps<{
    /** Optional prefix for trigger/menu IDs when multiple FontSwitchers exist. */
    idPrefix?: string;
  }>(),
  { idPrefix: '' }
);

const triggerId = computed(() => (props.idPrefix ? `font-pair-trigger-${props.idPrefix}` : 'font-pair-trigger'));
const menuId = computed(() => (props.idPrefix ? `font-pair-menu-${props.idPrefix}` : 'font-pair-menu'));

const open = ref(false);
const selectedValue = ref<string>(FONT_PAIR_DEFAULT);
const preview = ref<{ sans: string; mono: string } | null>(null);
const menuEl = ref<HTMLElement | null>(null);
const triggerEl = ref<HTMLElement | null>(null);

const selectedPair = computed(() => FONT_PAIRS.find((p) => p.value === selectedValue.value) ?? FONT_PAIRS[0]);
const label = computed(() => selectedPair.value?.label ?? 'Font');

function applyPair(sans: string, mono: string) {
  document.documentElement.style.setProperty('--font-family', sans);
  document.documentElement.style.setProperty('--font-family-mono', mono);
}

function selectPair(value: string) {
  const pair = FONT_PAIRS.find((p) => p.value === value);
  if (!pair) return;
  selectedValue.value = value;
  applyPair(pair.sans, pair.mono);
  try {
    localStorage.setItem('fontPair', value);
  } catch {
    /* storage unavailable */
  }
  open.value = false;
  preview.value = null;
  triggerEl.value?.focus();
}

/** Resolve var(--font-family-xxx) to the real stack so the preview shows the correct fonts. */
function resolveFontVar(cssValue: string): string {
  const m = cssValue.match(/^var\((--[a-zA-Z0-9-]+)\)$/);
  if (!m) return cssValue;
  return getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() || cssValue;
}

function setPreview(option: { sans: string; mono: string } | null) {
  preview.value = option ? { sans: resolveFontVar(option.sans), mono: resolveFontVar(option.mono) } : null;
}

function openMenu() {
  open.value = true;
  setPreview(FONT_PAIRS.find((p) => p.value === selectedValue.value) ?? null);
}

function closeMenu() {
  open.value = false;
  setPreview(null);
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (!open.value && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
    e.preventDefault();
    openMenu();
  }
}

/** Escape closes the menu from the trigger or from inside the menu. */
function onRootKeydown(e: KeyboardEvent) {
  if (open.value && e.key === 'Escape') {
    e.preventDefault();
    closeMenu();
    triggerEl.value?.focus();
  }
}

function onDocumentClick(e: MouseEvent) {
  const target = e.target as Node;
  if (menuEl.value && !menuEl.value.contains(target) && triggerEl.value && !triggerEl.value.contains(target)) closeMenu();
}

let clickTimer: ReturnType<typeof setTimeout> | null = null;
watch(open, (isOpen) => {
  if (clickTimer) clearTimeout(clickTimer);
  document.removeEventListener('click', onDocumentClick);
  if (isOpen) clickTimer = setTimeout(() => document.addEventListener('click', onDocumentClick), 0);
});

onMounted(() => {
  try {
    const saved = localStorage.getItem('fontPair') || FONT_PAIR_DEFAULT;
    const pair = FONT_PAIRS.find((p) => p.value === saved);
    if (pair) {
      selectedValue.value = saved;
      applyPair(pair.sans, pair.mono);
    }
  } catch {
    selectedValue.value = FONT_PAIR_DEFAULT;
  }
});

onBeforeUnmount(() => {
  if (clickTimer) clearTimeout(clickTimer);
  document.removeEventListener('click', onDocumentClick);
});
</script>

<template>
  <div class="font-switcher" data-font-switcher @keydown="onRootKeydown">
    <button
      ref="triggerEl"
      type="button"
      class="font-switcher__trigger"
      :aria-expanded="open"
      aria-haspopup="true"
      :aria-controls="menuId"
      aria-label="Select font pair"
      :id="triggerId"
      @click="open ? closeMenu() : openMenu()"
      @keydown="onTriggerKeydown"
    >
      <span class="font-switcher__label" data-font-pair-label>{{ label }}</span>
      <ChevronDown class="font-switcher__icon" :width="16" :height="16" />
    </button>
    <div
      ref="menuEl"
      :class="['font-switcher__menu', { 'font-switcher__menu--open': open }]"
      :id="menuId"
      role="menu"
      :aria-labelledby="triggerId"
      aria-label="Font pair selection"
      aria-orientation="vertical"
      :aria-hidden="!open"
      tabindex="-1"
      @mouseleave="setPreview(null)"
    >
      <div class="font-switcher__menu-options">
        <div
          v-for="pair in FONT_PAIRS"
          :key="pair.value"
          :class="['font-switcher__option', { 'font-switcher__option--active': selectedValue === pair.value }]"
          role="menuitemradio"
          :aria-checked="selectedValue === pair.value"
          :tabindex="open ? 0 : -1"
          :data-font-pair-value="pair.value"
          :data-font-pair-sans="pair.sans"
          :data-font-pair-mono="pair.mono"
          :data-font-pair-label="pair.label"
          @mouseenter="setPreview({ sans: pair.sans, mono: pair.mono })"
          @focus="setPreview({ sans: pair.sans, mono: pair.mono })"
          @click="selectPair(pair.value)"
          @keydown.enter.space.prevent="selectPair(pair.value)"
        >
          {{ pair.label }}
        </div>
      </div>
      <div class="font-switcher__preview" data-font-preview :aria-hidden="!preview">
        <div class="font-switcher__preview-title">Preview</div>
        <div class="font-switcher__preview-sample" data-font-preview-sample :style="preview ? { fontFamily: preview.sans } : undefined">
          Aa Bb Cc 012
        </div>
        <div class="font-switcher__preview-mono" data-font-preview-mono :style="preview ? { fontFamily: preview.mono } : undefined">
          code
        </div>
      </div>
    </div>
  </div>
</template>
