<script lang="ts">
  import Copy from '../icons/Copy.svelte';
  import Check from '../icons/Check.svelte';
  import Css3 from '../icons/devicons/Css3.svelte';
  import Html5 from '../icons/devicons/Html5.svelte';
  import Javascript from '../icons/devicons/Javascript.svelte';
  import Nodejs from '../icons/devicons/Nodejs.svelte';
  import AstroIcon from '../icons/devicons/Astro.svelte';
  import Plaintext from '../icons/devicons/Plaintext.svelte';
  import Git from '../icons/devicons/Git.svelte';
  import SvelteIcon from '../icons/devicons/SvelteIcon.svelte';
  import React from '../icons/devicons/React.svelte';
  import Vue from '../icons/devicons/Vue.svelte';
  import Bash from '../icons/devicons/Bash.svelte';

  interface Props {
    code: string;
    language?: string;
    class?: string;
  }
  let { code, language = '', class: className = '' }: Props = $props();
  let copied = $state(false);
  const languageLabel = $derived(language || '');
  const languageLower = $derived(language.toLowerCase());

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
        {#if languageLower === 'css'}
          <span class="code-block__language-icon" aria-hidden="true">
            <Css3 width={20} height={20} />
          </span>
        {:else if languageLower === 'html'}
          <span class="code-block__language-icon" aria-hidden="true">
            <Html5 width={20} height={20} />
          </span>
        {:else if languageLower === 'javascript'}
          <span class="code-block__language-icon" aria-hidden="true">
            <Javascript width={20} height={20} />
          </span>
        {:else if languageLower === 'nodejs'}
          <span class="code-block__language-icon" aria-hidden="true">
            <Nodejs width={20} height={20} />
          </span>
        {:else if languageLower === 'astro'}
          <span class="code-block__language-icon" aria-hidden="true">
            <AstroIcon width={20} height={20} />
          </span>
        {:else if languageLower === 'plaintext'}
          <span class="code-block__language-icon" aria-hidden="true">
            <Plaintext width={20} height={20} class="code-block__plaintext-icon" />
          </span>
        {:else if languageLower === 'git'}
          <span class="code-block__language-icon" aria-hidden="true">
            <Git width={20} height={20} />
          </span>
        {:else if languageLower === 'svelte'}
          <span class="code-block__language-icon" aria-hidden="true">
            <SvelteIcon width={20} height={20} />
          </span>
        {:else if languageLower === 'react' || languageLower === 'jsx' || languageLower === 'tsx'}
          <span class="code-block__language-icon" aria-hidden="true">
            <React width={20} height={20} />
          </span>
        {:else if languageLower === 'vue'}
          <span class="code-block__language-icon" aria-hidden="true">
            <Vue width={20} height={20} />
          </span>
        {:else if languageLower === 'bash' || languageLower === 'shell' || languageLower === 'sh'}
          <span class="code-block__language-icon" aria-hidden="true">
            <Bash width={20} height={20} class="code-block__bash-icon" />
          </span>
        {/if}
        <span class="code-block__language-text">{language}</span>
        <span class="sr-only">{languageLabel}</span>
      </span>
    {/if}
    <span class="tooltip-host" data-tooltip={copied ? 'Copied!' : 'Copy code'}>
      <button
        type="button"
        class="code-block__copy-btn"
        aria-label={copied ? 'Copied!' : 'Copy code'}
        onclick={copyCode}
      >
        {#if copied}
          <span class="code-block__copy-icon code-block__copy-icon--check" aria-hidden="true">
            <Check width={20} height={20} />
          </span>
        {:else}
          <span class="code-block__copy-icon code-block__copy-icon--copy" aria-hidden="true">
            <Copy width={20} height={20} />
          </span>
        {/if}
      </button>
    </span>
  </div>
  <pre tabindex="0"><code>{code}</code></pre>
</div>

<style>
  .code-block {
    position: relative;
    margin: var(--spacing-4) 0;
    border-radius: var(--radius-lg);
    overflow: visible;
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
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    overflow: visible;
    position: relative;
    z-index: 1;
  }
  .code-block__language {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    font-size: var(--font-size-xs);
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    font-weight: var(--font-weight-medium);
  }
  .code-block__language-icon {
    display: block;
    flex-shrink: 0;
    width: var(--spacing-5);
    height: var(--spacing-5);
    color: var(--text-dim);
  }
  .code-block__language-icon :global(svg) {
    width: 100%;
    height: 100%;
    display: block;
  }
  .code-block__plaintext-icon {
    color: var(--text-dim);
  }
  .code-block__plaintext-icon :global(path) {
    fill: currentColor;
  }
  .code-block__bash-icon {
    color: var(--text-dim);
  }
  .code-block__bash-icon :global(.bash-icon__main) {
    fill: currentColor;
  }
  .code-block__language-text {
    display: none;
  }
  @media (width >= 768px) {
    .code-block__language-text {
      display: inline;
    }
  }
  .code-block__copy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-2);
    min-width: var(--spacing-8);
    height: var(--spacing-8);
    margin-left: auto;
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
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  }
  .code-block code {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
    color: var(--text);
    white-space: pre;
    word-wrap: normal;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
