<script lang="ts">
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
  }: Props = $props();

  const sizeClass = size !== 'md' ? `form-input--${size}` : '';
  const errorClass = error ? 'form-input--error' : '';
  const successClass = success ? 'form-input--success' : '';
  const classes = ['form-input', sizeClass, errorClass, successClass, className].filter(Boolean).join(' ').trim();
  const invalid = error || ariaInvalid === true || ariaInvalid === 'true';
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
  <slot />
</select>
