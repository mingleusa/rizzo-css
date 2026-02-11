<script lang="ts">
  interface Props {
    id?: string;
    name?: string;
    value?: string;
    /** Bind the selected value for the radio group. Use the same bound variable for all radios in the group. */
    group?: string;
    required?: boolean;
    disabled?: boolean;
    class?: string;
    ariaDescribedby?: string;
    ariaLabel?: string;
  }
  let {
    id,
    name,
    value = '',
    group = $bindable(undefined as string | undefined),
    required = false,
    disabled = false,
    class: className = '',
    ariaDescribedby,
    ariaLabel,
  }: Props = $props();
</script>

<input
  type="radio"
  {id}
  {name}
  {value}
  bind:group={group}
  {required}
  {disabled}
  class={className}
  aria-describedby={ariaDescribedby}
  aria-label={ariaLabel}
/>
