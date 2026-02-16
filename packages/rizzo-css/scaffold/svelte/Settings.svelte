<script lang="ts">
  import { FONT_PAIRS, FONT_PAIR_DEFAULT } from '../../config/fonts';

  interface Props {
    open?: boolean;
  }
  let { open: openProp }: Props = $props();
  let openInternal = $state(false);
  const open = $derived(openProp !== undefined ? openProp : openInternal);

  let fontSizeLabel = $state('100%');
  let fontSizeSlider = $state(1);
  let fontPairValue = $state(typeof localStorage !== 'undefined' ? localStorage.getItem('fontPair') || FONT_PAIR_DEFAULT : FONT_PAIR_DEFAULT);
  let reducedMotion = $state(typeof localStorage !== 'undefined' && localStorage.getItem('reducedMotion') === 'true');
  let highContrast = $state(typeof localStorage !== 'undefined' && localStorage.getItem('highContrast') === 'true');
  let scrollbarStyle = $state((typeof localStorage !== 'undefined' ? localStorage.getItem('scrollbarStyle') || 'thin' : 'thin') as 'thin' | 'thick' | 'hidden');

  function applyFontSize(scale: number) {
    if (typeof document === 'undefined') return;
    document.documentElement.style.setProperty('--font-size-scale', String(scale));
    localStorage?.setItem('fontSizeScale', String(scale));
    fontSizeLabel = `${Math.round(scale * 100)}%`;
  }

  function applyFontPair(value: string) {
    if (typeof document === 'undefined') return;
    const pair = FONT_PAIRS.find((p) => p.value === value);
    if (pair) {
      document.documentElement.style.setProperty('--font-family', pair.sans);
      document.documentElement.style.setProperty('--font-family-mono', pair.mono);
      localStorage?.setItem('fontPair', value);
    }
  }

  $effect(() => {
    (window as unknown as { openSettings?: () => void }).openSettings = () => {
      openInternal = true;
    };
    return () => {
      if ((window as unknown as { openSettings?: () => void }).openSettings) {
        delete (window as unknown as { openSettings?: () => void }).openSettings;
      }
    };
  });

  $effect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') openInternal = false;
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  });

  $effect(() => {
    if (open && typeof document !== 'undefined') {
      const saved = localStorage?.getItem('fontSizeScale');
      const scale = saved ? parseFloat(saved) : 1;
      fontSizeSlider = scale;
      fontSizeLabel = `${Math.round(scale * 100)}%`;
      const savedPair = localStorage?.getItem('fontPair') || FONT_PAIR_DEFAULT;
      fontPairValue = savedPair;
      reducedMotion = localStorage?.getItem('reducedMotion') === 'true';
      highContrast = localStorage?.getItem('highContrast') === 'true';
      scrollbarStyle = (localStorage?.getItem('scrollbarStyle') || 'thin') as 'thin' | 'thick' | 'hidden';
    }
  });

  function close() {
    openInternal = false;
  }

  function onFontSizeInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const scale = parseFloat(target.value);
    fontSizeSlider = scale;
    applyFontSize(scale);
  }

  function onFontPairChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const value = target.value;
    fontPairValue = value;
    applyFontPair(value);
  }

  function onReducedMotionChange(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    reducedMotion = checked;
    localStorage?.setItem('reducedMotion', checked ? 'true' : '');
    document.documentElement.classList.toggle('reduced-motion', checked);
  }

  function onHighContrastChange(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    highContrast = checked;
    localStorage?.setItem('highContrast', checked ? 'true' : '');
    document.documentElement.classList.toggle('high-contrast', checked);
  }

  function onScrollbarStyleChange(e: Event) {
    const value = (e.target as HTMLInputElement).value as 'thin' | 'thick' | 'hidden';
    scrollbarStyle = value;
    localStorage?.setItem('scrollbarStyle', value);
    document.documentElement.classList.remove('scrollbar-thick', 'scrollbar-hidden', 'hide-scrollbars');
    if (value === 'thick') document.documentElement.classList.add('scrollbar-thick');
    else if (value === 'hidden') document.documentElement.classList.add('scrollbar-hidden', 'hide-scrollbars');
  }
</script>

<div class="settings" data-settings aria-hidden={!open}>
  <div class="settings__overlay" data-settings-overlay aria-hidden={!open} onclick={close}></div>
  <div
    class="settings__panel"
    role="dialog"
    aria-modal="true"
    aria-labelledby="settings-title"
    aria-hidden={!open}
    data-open={open ? 'true' : undefined}
  >
    <div class="settings__header">
      <h2 id="settings-title" class="settings__title">Settings</h2>
      <button type="button" class="settings__close" data-settings-close aria-label="Close settings" onclick={close}>×</button>
    </div>
    <div class="settings__content">
      <section class="settings__section">
        <h3 class="settings__section-title">Font Size</h3>
        <div class="settings__control">
          <label for="font-size-slider" class="settings__label">
            <span class="settings__label-text">Adjust text size</span>
            <span class="settings__label-value">{fontSizeLabel}</span>
          </label>
          <input
            type="range"
            id="font-size-slider"
            class="settings__slider"
            min="0.75"
            max="1.5"
            step="0.05"
            value={fontSizeSlider}
            oninput={onFontSizeInput}
            aria-label="Font size"
            data-font-size-slider
            style="--slider-progress: {((fontSizeSlider - 0.75) / 0.75) * 100}%;"
          />
          <div class="settings__slider-labels"><span>Small</span><span>Default</span><span>Large</span></div>
        </div>
      </section>
      <section class="settings__section">
        <h3 class="settings__section-title">Font</h3>
        <div class="settings__control">
          <label for="font-pair-select" class="settings__label"><span class="settings__label-text">Font pair (sans + mono)</span></label>
          <select
            id="font-pair-select"
            class="form-control"
            aria-label="Font pair"
            data-font-pair
            style="width: 100%;"
            value={fontPairValue}
            onchange={onFontPairChange}
          >
            {#each FONT_PAIRS as pair}
              <option value={pair.value} data-sans={pair.sans} data-mono={pair.mono}>{pair.label}</option>
            {/each}
          </select>
          <p class="settings__help-text">Body text and code blocks use the selected pair.</p>
        </div>
      </section>
      <section class="settings__section">
        <h3 class="settings__section-title">Accessibility</h3>
        <div class="settings__control">
          <label class="settings__checkbox-label">
            <input type="checkbox" class="settings__checkbox" aria-label="Reduce motion" checked={reducedMotion} onchange={onReducedMotionChange} />
            <span>Reduce motion</span>
          </label>
          <p class="settings__help-text">Minimize animations and transitions</p>
        </div>
        <div class="settings__control">
          <label class="settings__checkbox-label">
            <input type="checkbox" class="settings__checkbox" aria-label="High contrast" checked={highContrast} onchange={onHighContrastChange} />
            <span>High contrast</span>
          </label>
          <p class="settings__help-text">Increase contrast for better visibility</p>
        </div>
        <div class="settings__control">
          <div class="settings__label"><span class="settings__label-text">Scrollbar style</span></div>
          <div class="settings__radio-group" role="radiogroup" aria-label="Scrollbar style">
            <label class="settings__radio-label">
              <input type="radio" name="scrollbar-style" value="thin" class="settings__radio" aria-label="Thin scrollbar" checked={scrollbarStyle === 'thin'} onchange={onScrollbarStyleChange} />
              <span>Thin</span>
            </label>
            <label class="settings__radio-label">
              <input type="radio" name="scrollbar-style" value="thick" class="settings__radio" aria-label="Thick scrollbar" checked={scrollbarStyle === 'thick'} onchange={onScrollbarStyleChange} />
              <span>Thick</span>
            </label>
            <label class="settings__radio-label">
              <input type="radio" name="scrollbar-style" value="hidden" class="settings__radio" aria-label="Hidden scrollbars" checked={scrollbarStyle === 'hidden'} onchange={onScrollbarStyleChange} />
              <span>Hidden</span>
            </label>
          </div>
          <p class="settings__help-text">Choose your preferred scrollbar appearance</p>
        </div>
      </section>
    </div>
  </div>
</div>
