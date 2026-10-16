<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId } from 'vue';

const props = withDefaults(
  defineProps<{
    value: string;
    label?: string;
    format?: string;
    /** When true, only the copy/check icons are shown (e.g. in code blocks). */
    iconOnly?: boolean;
    /** For icon-only: accessible label for the visible text (e.g. "Copy code"). */
    buttonLabel?: string;
    id?: string;
  }>(),
  { iconOnly: false }
);

const copied = ref(false);
const feedbackText = ref('');
const generatedId = useId();
const buttonId = computed(() => props.id ?? `copy-btn-${generatedId}`);
const displayText = computed(() => (props.iconOnly ? (props.buttonLabel ?? 'Copy') : props.value));
const copiedText = computed(() => (props.format ? `Copied ${props.format}!` : 'Copied!'));

// WCAG 2.5.3 (Label in Name): the accessible name must contain the visible text.
const baseLabel = computed(
  () => props.label ?? (props.iconOnly ? (props.buttonLabel ?? 'Copy to clipboard') : `Copy ${props.value} to clipboard`)
);
const idleLabel = computed(() =>
  baseLabel.value.toLowerCase().includes(String(displayText.value).toLowerCase())
    ? baseLabel.value
    : `${baseLabel.value}: ${displayText.value}`
);
const ariaLabel = computed(() => (copied.value ? copiedText.value : idleLabel.value));
const tooltipText = computed(() =>
  copied.value ? copiedText.value : (props.label ?? (props.iconOnly ? (props.buttonLabel ?? 'Copy') : 'Copy to clipboard'))
);

let resetTimer: ReturnType<typeof setTimeout> | null = null;

function flashCopied() {
  copied.value = true;
  feedbackText.value = copiedText.value;
  if (resetTimer) clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    copied.value = false;
    feedbackText.value = '';
  }, 2000);
}

/** Legacy fallback for browsers/contexts without the async clipboard API. */
function legacyCopy(text: string): boolean {
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.left = '-999999px';
  document.body.appendChild(area);
  area.focus();
  area.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    document.body.removeChild(area);
  }
}

async function copy() {
  if (!props.value) return;
  try {
    await navigator.clipboard.writeText(props.value);
    flashCopied();
  } catch {
    if (legacyCopy(props.value)) flashCopied();
    else feedbackText.value = 'Failed to copy';
  }
}

onBeforeUnmount(() => {
  if (resetTimer) clearTimeout(resetTimer);
});
</script>

<template>
  <span class="tooltip-host" :data-tooltip="tooltipText">
    <button
      type="button"
      :class="['copy-to-clipboard', { 'copy-to-clipboard--icon-only': iconOnly }]"
      :aria-label="ariaLabel"
      :id="buttonId"
      @click="copy"
    >
      <span class="copy-to-clipboard__text">{{ displayText }}</span>
      <span :class="['copy-to-clipboard__icon', 'copy-to-clipboard__icon--copy', { 'copy-to-clipboard__icon--hidden': copied }]" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </span>
      <span :class="['copy-to-clipboard__icon', 'copy-to-clipboard__icon--check', { 'copy-to-clipboard__icon--hidden': !copied }]" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span class="copy-to-clipboard__feedback" aria-live="polite">{{ feedbackText }}</span>
    </button>
  </span>
</template>
