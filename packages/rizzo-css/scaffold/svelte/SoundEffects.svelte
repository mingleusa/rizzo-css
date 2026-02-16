<script lang="ts">
  import { onMount } from 'svelte';

  let soundEffects = $state(false);

  interface Props {
    showHelp?: boolean;
  }
  let { showHelp = true }: Props = $props();

  onMount(() => {
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
        soundEffects = localStorage.getItem('soundEffects') === 'true';
      }
    } catch {
      soundEffects = false;
    }
  });

  function onChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target) return;
    soundEffects = target.checked;
    localStorage?.setItem('soundEffects', target.checked ? 'true' : 'false');
  }
</script>

<div data-sound-effects-wrapper>
  <label class="settings__checkbox-label">
    <input
      type="checkbox"
      class="settings__checkbox"
      aria-label="Play sound on click"
      checked={soundEffects}
      onchange={onChange}
    />
    <span>Play sound on click</span>
  </label>
  {#if showHelp}
    <p class="settings__help-text">Short click sound when you interact with buttons and links. Off by default.</p>
  {/if}
</div>
