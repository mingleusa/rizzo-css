<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    id?: string;
    name?: string;
    value?: string;
    required?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
    success?: boolean;
    class?: string;
    ariaDescribedby?: string;
    ariaInvalid?: boolean | 'true' | 'false';
    children?: Snippet;
  }
  let {
    id,
    name,
    value = $bindable(''),
    required = false,
    disabled = false,
    size = 'md',
    error = false,
    success = false,
    class: className = '',
    ariaDescribedby,
    ariaInvalid,
    children,
  }: Props = $props();

  const sizeClass = $derived(size !== 'md' ? `form-input--${size}` : '');
  const errorClass = $derived(error ? 'form-input--error' : '');
  const successClass = $derived(success ? 'form-input--success' : '');
  const classes = $derived(['form-input', sizeClass, errorClass, successClass, className].filter(Boolean).join(' ').trim());
  const invalid = $derived(error || ariaInvalid === true || ariaInvalid === 'true');
</script>

<select
  {id}
  {name}
  bind:value
  {required}
  {disabled}
  class={classes}
  aria-invalid={invalid ? 'true' : 'false'}
  aria-describedby={ariaDescribedby}
>
  {@render children?.()}
</select>
