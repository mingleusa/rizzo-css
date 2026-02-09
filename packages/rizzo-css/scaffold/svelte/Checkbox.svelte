<script lang="ts">
  interface Props {
    id?: string;
    name?: string;
    value?: string;
    checked?: boolean;
    required?: boolean;
    disabled?: boolean;
    class?: string;
    ariaDescribedby?: string;
    ariaLabel?: string;
  }
  let {
    id,
    name,
    value,
    checked = $bindable(false),
    required = false,
    disabled = false,
    class: className = '',
    ariaDescribedby,
    ariaLabel,
  }: Props = $props();
</script>

<input
  type="checkbox"
  {id}
  {name}
  {value}
  bind:checked
  {required}
  {disabled}
  class={className}
  aria-describedby={ariaDescribedby}
  aria-label={ariaLabel}
/>
