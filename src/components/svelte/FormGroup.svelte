<script lang="ts">
  interface Props {
    label?: string;
    labelFor?: string;
    required?: boolean;
    help?: string;
    error?: string;
    success?: string;
    class?: string;
  }
  let {
    label,
    labelFor,
    required = false,
    help,
    error,
    success,
    class: className = '',
  }: Props = $props();

  const errorId = $derived(labelFor && error ? `${labelFor}-error` : undefined);
  const helpId = $derived(labelFor && help ? `${labelFor}-help` : undefined);
</script>

<div class="form-group {className}">
  {#if label}
    <label for={labelFor} class="form-group__label {required ? 'required' : ''}">
      {label}
    </label>
  {/if}
  <slot />
  {#if help}
    <span id={helpId} class="form-group__help">{help}</span>
  {/if}
  {#if error}
    <span id={errorId} class="form-error" role="alert">{error}</span>
  {/if}
  {#if success}
    <span class="form-success" role="status">{success}</span>
  {/if}
</div>
