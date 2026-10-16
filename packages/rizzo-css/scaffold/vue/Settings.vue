<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import ThemeSwitcher from './ThemeSwitcher.vue';
import FontSwitcher from './FontSwitcher.vue';
import SoundEffects from './SoundEffects.vue';
import Close from './icons/Close.vue';

type ScrollbarStyle = 'thin' | 'thick' | 'hidden';

const props = withDefaults(
  defineProps<{
    /** Controlled open state (use `v-model:open`); when omitted the panel manages itself via `window.openSettings()` */
    open?: boolean;
  }>(),
  // Without an explicit `undefined` default, Vue casts an absent Boolean prop to `false`,
  // which would make the panel look permanently controlled (and closed).
  { open: undefined }
);
const emit = defineEmits<{ 'update:open': [open: boolean] }>();

const openInternal = ref(false);
const closing = ref(false);
const opening = ref(false);
const isOpen = computed(() => (props.open !== undefined ? props.open : openInternal.value));
/** The panel shows its open state one frame after opening, so the slide-in animation runs. */
const panelDataOpen = computed(() => isOpen.value && !closing.value && !opening.value);

const fontSizeSlider = ref(1);
const fontSizeLabel = ref('100%');
const reducedMotion = ref(false);
const highContrast = ref(false);
const scrollbarStyle = ref<ScrollbarStyle>('thin');

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

function load() {
  try {
    const saved = localStorage.getItem('fontSizeScale');
    const scale = saved ? parseFloat(saved) : 1;
    fontSizeSlider.value = scale;
    fontSizeLabel.value = `${Math.round(scale * 100)}%`;
    reducedMotion.value = localStorage.getItem('reducedMotion') === 'true';
    highContrast.value = localStorage.getItem('highContrast') === 'true';
    scrollbarStyle.value = (localStorage.getItem('scrollbarStyle') || 'thin') as ScrollbarStyle;
  } catch {
    /* storage unavailable: keep defaults */
  }
}

function close() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reducedClass = document.documentElement.classList.contains('reduced-motion');
  const duration = prefersReduced || reducedClass ? 0 : 300;
  const finish = () => {
    openInternal.value = false;
    closing.value = false;
    emit('update:open', false);
  };
  if (duration === 0) {
    finish();
    return;
  }
  closing.value = true;
  setTimeout(finish, duration);
}

function onEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') close();
}

type SettingsWindow = Window & { openSettings?: () => void };

onMounted(() => {
  load();
  (window as SettingsWindow).openSettings = () => {
    openInternal.value = true;
    emit('update:open', true);
    opening.value = true;
    requestAnimationFrame(() => requestAnimationFrame(() => (opening.value = false)));
  };
});

onBeforeUnmount(() => {
  delete (window as SettingsWindow).openSettings;
  document.removeEventListener('keydown', onEscape);
});

watch(isOpen, (value) => {
  document.removeEventListener('keydown', onEscape);
  if (value) {
    load();
    document.addEventListener('keydown', onEscape);
  }
});

function onFontSizeInput(e: Event) {
  const scale = parseFloat((e.target as HTMLInputElement).value);
  fontSizeSlider.value = scale;
  document.documentElement.style.setProperty('--font-size-scale', String(scale));
  store('fontSizeScale', String(scale));
  fontSizeLabel.value = `${Math.round(scale * 100)}%`;
}

function onReducedMotionChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked;
  reducedMotion.value = checked;
  store('reducedMotion', checked ? 'true' : '');
  document.documentElement.classList.toggle('reduced-motion', checked);
}

function onHighContrastChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked;
  highContrast.value = checked;
  store('highContrast', checked ? 'true' : '');
  document.documentElement.classList.toggle('high-contrast', checked);
}

function onScrollbarStyleChange(e: Event) {
  const value = (e.target as HTMLInputElement).value as ScrollbarStyle;
  scrollbarStyle.value = value;
  store('scrollbarStyle', value);
  const root = document.documentElement.classList;
  root.remove('scrollbar-thick', 'scrollbar-hidden', 'hide-scrollbars');
  if (value === 'thick') root.add('scrollbar-thick');
  else if (value === 'hidden') root.add('scrollbar-hidden', 'hide-scrollbars');
}
</script>

<template>
  <div class="settings" data-settings :aria-hidden="!isOpen">
    <div class="settings__overlay" data-settings-overlay :aria-hidden="!isOpen" @click="close"></div>
    <div
      class="settings__panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      :aria-hidden="!isOpen"
      :data-open="panelDataOpen ? 'true' : undefined"
    >
      <div class="settings__header">
        <h2 id="settings-title" class="settings__title">Settings</h2>
        <button type="button" class="settings__close" data-settings-close aria-label="Close settings" title="Close settings" @click="close">
          <Close :width="20" :height="20" />
        </button>
      </div>
      <div class="settings__content" tabindex="-1" aria-label="Settings options">
        <section class="settings__section">
          <h3 class="settings__section-title">Theme</h3>
          <div class="settings__control">
            <ThemeSwitcher id-prefix="settings" />
          </div>
        </section>
        <section class="settings__section">
          <h3 class="settings__section-title">Font Size</h3>
          <div class="settings__control">
            <label for="font-size-slider" class="settings__label">
              <span class="settings__label-text">Adjust text size</span>
              <span class="settings__label-value">{{ fontSizeLabel }}</span>
            </label>
            <input
              type="range"
              id="font-size-slider"
              class="settings__slider"
              min="0.75"
              max="1.5"
              step="0.05"
              :value="fontSizeSlider"
              aria-label="Font size"
              data-font-size-slider
              :style="{ '--slider-progress': `${((fontSizeSlider - 0.75) / 0.75) * 100}%` }"
              @input="onFontSizeInput"
            />
            <div class="settings__slider-labels"><span>Small</span><span>Default</span><span>Large</span></div>
          </div>
        </section>
        <section class="settings__section">
          <h3 class="settings__section-title">Font</h3>
          <div class="settings__control">
            <FontSwitcher id-prefix="settings" />
            <p class="settings__help-text">Body text and code blocks use the selected pair.</p>
          </div>
        </section>
        <section class="settings__section">
          <h3 class="settings__section-title">Sound</h3>
          <div class="settings__control">
            <SoundEffects :show-help="true" />
          </div>
        </section>
        <section class="settings__section">
          <h3 class="settings__section-title">Accessibility</h3>
          <div class="settings__control">
            <label class="settings__checkbox-label">
              <input type="checkbox" class="settings__checkbox" data-reduced-motion aria-label="Reduce motion" :checked="reducedMotion" @change="onReducedMotionChange" />
              <span>Reduce motion</span>
            </label>
            <p class="settings__help-text">Minimize animations and transitions</p>
          </div>
          <div class="settings__control">
            <label class="settings__checkbox-label">
              <input type="checkbox" class="settings__checkbox" aria-label="High contrast" :checked="highContrast" @change="onHighContrastChange" />
              <span>High contrast</span>
            </label>
            <p class="settings__help-text">Increase contrast for better visibility</p>
          </div>
          <div class="settings__control">
            <div class="settings__label"><span class="settings__label-text">Scrollbar style</span></div>
            <div class="settings__radio-group" role="radiogroup" aria-label="Scrollbar style">
              <label class="settings__radio-label">
                <input type="radio" name="scrollbar-style" value="thin" class="settings__radio" aria-label="Thin scrollbar" :checked="scrollbarStyle === 'thin'" @change="onScrollbarStyleChange" />
                <span>Thin</span>
              </label>
              <label class="settings__radio-label">
                <input type="radio" name="scrollbar-style" value="thick" class="settings__radio" aria-label="Thick scrollbar" :checked="scrollbarStyle === 'thick'" @change="onScrollbarStyleChange" />
                <span>Thick</span>
              </label>
              <label class="settings__radio-label">
                <input type="radio" name="scrollbar-style" value="hidden" class="settings__radio" aria-label="Hidden scrollbars" :checked="scrollbarStyle === 'hidden'" @change="onScrollbarStyleChange" />
                <span>Hidden</span>
              </label>
            </div>
            <p class="settings__help-text">Choose your preferred scrollbar appearance</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
