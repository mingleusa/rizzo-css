<script lang="ts">
  interface Props {
    id?: string;
    name?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    disabled?: boolean;
    /** Accessible name for the range input (required for axe / WCAG). */
    ariaLabel?: string;
    class?: string;
  }

  let {
    id: sliderId,
    name,
    min = 0,
    max = 100,
    step = 1,
    value = $bindable(min),
    disabled = false,
    ariaLabel,
    class: className = '',
  }: Props = $props();

  const id = $derived(sliderId ?? `slider-${Math.random().toString(36).slice(2, 9)}`);
  const pct = $derived(Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)));

  function handleInput(e: Event) {
    const t = e.currentTarget as HTMLInputElement;
    if (t) value = parseFloat(t.value);
  }
</script>

<div class="slider {className}" data-slider>
  <input
    type="range"
    {id}
    {name}
    class="slider__input"
    {min}
    {max}
    {step}
    bind:value
    {disabled}
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    aria-label={ariaLabel}
    data-slider-input
    oninput={handleInput}
  />
  <div class="slider__track" aria-hidden="true">
    <div class="slider__fill" data-slider-fill style="width: {pct}%"></div>
  </div>
</div>
