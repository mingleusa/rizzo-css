<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    value?: string;
    id?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    error?: boolean;
    success?: boolean;
    class?: string;
    children?: Snippet;
    prefix?: Snippet;
    suffix?: Snippet;
  }

  let {
    value = $bindable(''),
    id,
    name,
    type = 'text',
    placeholder,
    required = false,
    disabled = false,
    readonly = false,
    error = false,
    success = false,
    class: className = '',
    prefix,
    suffix,
  }: Props = $props();

  const rootClass = $derived(
    ['input-group', error && 'input-group--error', success && 'input-group--success', className]
      .filter(Boolean)
      .join(' ')
      .trim()
  );
  const inputId = $derived(id ?? `input-group-${Math.random().toString(36).slice(2, 9)}`);
</script>

<div class={rootClass}>
  <div class="input-group__wrapper">
    {#if prefix}
      <span class="input-group__addon input-group__addon--prefix" aria-hidden="true">
        {@render prefix()}
      </span>
    {/if}
    <input
      id={inputId}
      {name}
      {type}
      bind:value
      {placeholder}
      {required}
      {disabled}
      {readonly}
      class="input-group__input"
      aria-invalid={error ? 'true' : undefined}
    />
    {#if suffix}
      <span class="input-group__addon input-group__addon--suffix" aria-hidden="true">
        {@render suffix()}
      </span>
    {/if}
  </div>
</div>
