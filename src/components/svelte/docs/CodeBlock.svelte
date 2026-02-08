<script lang="ts">
  interface Props {
    code: string;
    language?: string;
    class?: string;
  }
  let { code, language = '', class: className = '' }: Props = $props();
  let copied = $state(false);
  const languageLabel = language || '';

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.position = 'fixed';
      ta.style.left = '-999999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand('copy');
        copied = true;
        setTimeout(() => (copied = false), 2000);
      } finally {
        document.body.removeChild(ta);
      }
    }
  }
</script>

<div class={`code-block ${className}`.trim()}>
  <div class="code-block__header">
    {#if language}
      <span class="code-block__language" aria-label={languageLabel}>
        <span class="code-block__language-text">{language}</span>
      </span>
    {/if}
    <button
      type="button"
      class="code-block__copy-btn"
      aria-label={copied ? 'Copied!' : 'Copy code'}
      title={copied ? 'Copied!' : 'Copy code'}
      onclick={copyCode}
    >
      {#if copied}
        <span class="code-block__copy-icon code-block__copy-icon--check" aria-hidden="true">✓</span>
      {:else}
        <span class="code-block__copy-icon code-block__copy-icon--copy" aria-hidden="true">⎘</span>
      {/if}
    </button>
  </div>
  <pre><code>{code}</code></pre>
</div>

<style>
  .code-block {
    position: relative;
    margin: var(--spacing-4) 0;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background-color: var(--background-alt);
    border: 1px solid var(--border);
  }
  .code-block__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-2) var(--spacing-3);
    background-color: var(--background);
    border-bottom: 1px solid var(--border);
  }
  .code-block__language {
    font-size: var(--font-size-xs);
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    font-weight: var(--font-weight-medium);
  }
  .code-block__copy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-2);
    min-width: var(--spacing-8);
    height: var(--spacing-8);
    background-color: var(--background-alt);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    color: var(--text);
    cursor: pointer;
    transition: background-color var(--transition-base), border-color var(--transition-base), color var(--transition-base);
  }
  .code-block__copy-btn:hover {
    background-color: var(--background);
    border-color: var(--accent);
    color: var(--accent);
  }
  .code-block__copy-btn:focus-visible {
    outline: var(--outline-width) solid var(--accent);
    outline-offset: var(--outline-offset);
  }
  .code-block pre {
    margin: 0;
    padding: var(--spacing-4);
    overflow-x: auto;
    background-color: var(--background-alt);
  }
  .code-block code {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
    color: var(--text);
    white-space: pre;
    word-wrap: normal;
  }
</style>
