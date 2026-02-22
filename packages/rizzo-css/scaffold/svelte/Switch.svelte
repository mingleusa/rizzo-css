<script lang="ts">
  interface Props {
    id?: string;
    name?: string;
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    class?: string;
  }
  let {
    id,
    name,
    checked = $bindable(false),
    disabled = false,
    label,
    class: className = '',
  }: Props = $props();
</script>

<label class="switch {className}" for={id}>
  <input
    type="checkbox"
    {id}
    {name}
    bind:checked
    {disabled}
    class="switch__input"
    role="switch"
    aria-checked={checked}
  />
  <span class="switch__track" aria-hidden="true">
    <span class="switch__thumb"></span>
  </span>
  {#if label}<span class="switch__label">{label}</span>{/if}
</label>
