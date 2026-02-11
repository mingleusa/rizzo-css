<script lang="ts">
  interface Props {
    value: string;
    label?: string;
    format?: string;
    class?: string;
    id?: string;
  }
  let { value, label, format, class: className = '', id }: Props = $props();

  let copied = $state(false);
  let feedbackText = $state('');
  const fallbackId = `copy-btn-${Math.random().toString(36).slice(2, 11)}`;
  const buttonId = $derived(id ?? fallbackId);
  const classes = $derived(['copy-to-clipboard', className].filter(Boolean).join(' ').trim());

  async function copy() {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
      feedbackText = format ? `Copied ${format}!` : 'Copied!';
      setTimeout(() => {
        copied = false;
        feedbackText = '';
      }, 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = value;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        copied = true;
        feedbackText = format ? `Copied ${format}!` : 'Copied!';
        setTimeout(() => {
          copied = false;
          feedbackText = '';
        }, 2000);
      } catch {
        feedbackText = 'Failed to copy';
      }
      document.body.removeChild(textArea);
    }
  }
</script>

<span class="tooltip-host" data-tooltip={copied ? (format ? `Copied ${format}!` : 'Copied!') : (label ?? 'Copy to clipboard')}>
  <button
    type="button"
    class={classes}
    aria-label={copied ? (format ? `Copied ${format}!` : 'Copied!') : (label ?? `Copy ${value} to clipboard`)}
    id={buttonId}
    onclick={copy}
    onkeydown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copy();
      }
    }}
  >
    <span class="copy-to-clipboard__text">{value}</span>
    <span class="copy-to-clipboard__icon copy-to-clipboard__icon--copy" class:copy-to-clipboard__icon--hidden={copied} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    </span>
    <span class="copy-to-clipboard__icon copy-to-clipboard__icon--check" class:copy-to-clipboard__icon--hidden={!copied} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
    <span class="copy-to-clipboard__feedback" aria-live="polite">{feedbackText}</span>
  </button>
</span>
