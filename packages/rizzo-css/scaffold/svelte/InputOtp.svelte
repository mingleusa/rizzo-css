<script lang="ts">
  interface Props {
    length?: number;
    ariaLabel?: string;
    class?: string;
  }

  let { length = 6, ariaLabel = 'One-time code', class: className = '' }: Props = $props();

  const indices = $derived(Array.from({ length }, (_, i) => i));
  let digits = $state<string[]>(Array(length).fill(''));
  let containerEl: HTMLDivElement;

  function inputs() {
    return containerEl?.querySelectorAll<HTMLInputElement>('.input-otp__digit') ?? [];
  }

  function handleInput(i: number, e: Event) {
    const v = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(-1);
    digits = [...digits];
    digits[i] = v;
    if (v && i < length - 1) inputs()[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) inputs()[i - 1]?.focus();
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const pasted = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, length);
    const next = [...digits];
    pasted.split('').forEach((ch, j) => {
      if (next[j] !== undefined) next[j] = ch;
    });
    digits = next;
    const focusIdx = Math.min(pasted.length, length) - 1;
    inputs()[focusIdx]?.focus();
  }
</script>

<div class="input-otp {className}" role="group" aria-label={ariaLabel} bind:this={containerEl}>
  {#each indices as i}
    <input
      type="text"
      inputmode="numeric"
      maxlength="1"
      autocomplete="one-time-code"
      class="input-otp__digit"
      aria-label="Digit {i + 1} of {length}"
      value={digits[i]}
      oninput={(e) => handleInput(i, e)}
      onkeydown={(e) => handleKeyDown(i, e)}
      onpaste={handlePaste}
    />
  {/each}
</div>
