<script lang="ts">
  interface Props {
    id?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    rows?: number;
    cols?: number;
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
    placeholder,
    required = false,
    disabled = false,
    readonly = false,
    rows = 4,
    cols,
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

<textarea
  {id}
  {name}
  bind:value
  {placeholder}
  {required}
  {disabled}
  {readonly}
  {rows}
  cols={cols}
  class={classes}
  aria-invalid={invalid ? 'true' : 'false'}
  aria-describedby={ariaDescribedby}
></textarea>
