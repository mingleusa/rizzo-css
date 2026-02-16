<script lang="ts">
  import { onMount } from 'svelte';
  import ChevronDown from './icons/ChevronDown.svelte';
  import { FONT_PAIRS, FONT_PAIR_DEFAULT } from '../../config/fonts';

  interface Props {
    /** Optional prefix for trigger/menu IDs when multiple FontSwitchers exist. */
    idPrefix?: string;
  }
  let { idPrefix = '' }: Props = $props();

  const triggerId = idPrefix ? `font-pair-trigger-${idPrefix}` : 'font-pair-trigger';
  const menuId = idPrefix ? `font-pair-menu-${idPrefix}` : 'font-pair-menu';

  let open = $state(false);
  let selectedValue = $state(FONT_PAIR_DEFAULT);
  let previewOption = $state<{ sans: string; mono: string } | null>(null);
  let menuEl: HTMLElement | null = $state(null);
  let triggerEl: HTMLElement | null = $state(null);

  const selectedPair = $derived(FONT_PAIRS.find((p) => p.value === selectedValue) ?? FONT_PAIRS[0]);
  const label = $derived(selectedPair?.label ?? 'Font');

  function applyPair(sans: string, mono: string) {
    if (typeof document === 'undefined') return;
    document.documentElement.style.setProperty('--font-family', sans);
    document.documentElement.style.setProperty('--font-family-mono', mono);
  }

  function selectPair(value: string) {
    const pair = FONT_PAIRS.find((p) => p.value === value);
    if (!pair) return;
    selectedValue = value;
    applyPair(pair.sans, pair.mono);
    localStorage?.setItem('fontPair', value);
    open = false;
    previewOption = null;
    triggerEl?.focus();
  }

  function setPreview(option: { sans: string; mono: string } | null) {
    previewOption = option;
  }

  function addClickOutsideListener() {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuEl && !menuEl.contains(target) && triggerEl && !triggerEl.contains(target)) {
        open = false;
        setPreview(null);
        document.removeEventListener('click', handler);
      }
    };
    setTimeout(() => document.addEventListener('click', handler), 0);
  }

  onMount(() => {
    try {
      const saved = typeof localStorage !== 'undefined' && localStorage.getItem ? localStorage.getItem('fontPair') || FONT_PAIR_DEFAULT : FONT_PAIR_DEFAULT;
      const pair = FONT_PAIRS.find((p) => p.value === saved);
      if (pair) {
        selectedValue = saved;
        applyPair(pair.sans, pair.mono);
      }
    } catch {
      selectedValue = FONT_PAIR_DEFAULT;
    }
  });

  function openMenu() {
    open = true;
    setPreview(FONT_PAIRS.find((p) => p.value === selectedValue) ?? null);
    addClickOutsideListener();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMenu();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      open = false;
      setPreview(null);
      triggerEl?.focus();
    }
  }
</script>

<div class="font-switcher" data-font-switcher>
  <button
    type="button"
    class="font-switcher__trigger"
    aria-expanded={open}
    aria-haspopup="true"
    aria-controls={menuId}
    aria-label="Select font pair"
    id={triggerId}
    bind:this={triggerEl}
    onclick={() => {
      if (open) {
        open = false;
        setPreview(null);
      } else {
        openMenu();
      }
    }}
    onkeydown={handleKeydown}
  >
    <span class="font-switcher__label" data-font-pair-label>{label}</span>
    <ChevronDown class="font-switcher__icon" width={16} height={16} />
  </button>
  <div
    class="font-switcher__menu"
    class:font-switcher__menu--open={open}
    id={menuId}
    role="menu"
    aria-labelledby={triggerId}
    aria-label="Font pair selection"
    aria-orientation="vertical"
    aria-hidden={!open}
    tabindex="-1"
    bind:this={menuEl}
    onmouseleave={() => setPreview(null)}
  >
    <div class="font-switcher__menu-options">
      {#each FONT_PAIRS as pair (pair.value)}
        <div
          class="font-switcher__option"
          class:font-switcher__option--active={selectedValue === pair.value}
          role="menuitemradio"
          aria-checked={selectedValue === pair.value}
          tabindex={open ? 0 : -1}
          data-font-pair-value={pair.value}
          data-font-pair-sans={pair.sans}
          data-font-pair-mono={pair.mono}
          data-font-pair-label={pair.label}
          onmouseenter={() => setPreview({ sans: pair.sans, mono: pair.mono })}
          onfocus={() => setPreview({ sans: pair.sans, mono: pair.mono })}
          onclick={() => selectPair(pair.value)}
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              selectPair(pair.value);
            }
          }}
        >
          {pair.label}
        </div>
      {/each}
    </div>
    <div
      class="font-switcher__preview"
      data-font-preview
      aria-hidden={!previewOption}
    >
      <div class="font-switcher__preview-title">Preview</div>
      <div
        class="font-switcher__preview-sample"
        data-font-preview-sample
        style={previewOption ? `font-family: ${previewOption.sans}` : ''}
      >
        Aa Bb Cc 012
      </div>
      <div
        class="font-switcher__preview-mono"
        data-font-preview-mono
        style={previewOption ? `font-family: ${previewOption.mono}` : ''}
      >
        code
      </div>
    </div>
  </div>
</div>
