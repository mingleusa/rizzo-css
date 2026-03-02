<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    id?: string;
    label?: string;
    showIndicators?: boolean;
    class?: string;
    children?: Snippet;
  }

  let {
    id: carouselId,
    label = 'Carousel',
    showIndicators = true,
    class: className = '',
    children,
  }: Props = $props();

  const id = $derived(carouselId ?? `carousel-${Math.random().toString(36).slice(2, 9)}`);
  let viewportEl: HTMLDivElement;
  let trackEl: HTMLDivElement;
  let index = $state(0);
  let total = $state(0);

  $effect(() => {
    if (!trackEl) return;
    const slides = trackEl.querySelectorAll('.carousel__slide');
    total = slides.length;
  });

  $effect(() => {
    if (!viewportEl || !trackEl || total === 0) return;
    const w = viewportEl.offsetWidth;
    trackEl.style.transform = `translateX(${-index * w}px)`;
  });

  function goTo(i: number) {
    index = Math.max(0, Math.min(i, total - 1));
  }
</script>

<div class="carousel {className}" {id} role="region" aria-roledescription="carousel" aria-label={label} data-carousel>
  <div class="carousel__viewport" bind:this={viewportEl} data-carousel-viewport>
    <div class="carousel__track" bind:this={trackEl} data-carousel-track>
      {@render children?.()}
    </div>
  </div>

  <div class="carousel__controls">
    <button
      type="button"
      class="carousel__prev"
      aria-label="Previous slide"
      onclick={() => goTo(index - 1)}
      disabled={index === 0}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
    </button>

    {#if showIndicators && total > 0}
      <div class="carousel__indicators" role="tablist" aria-label="Slide indicators">
        {#each Array(total) as _, i}
          <button
            type="button"
            role="tab"
            aria-label="Slide {i + 1}"
            aria-selected={i === index}
            class="carousel__indicator"
            onclick={() => goTo(i)}
          />
        {/each}
      </div>
    {/if}

    <button
      type="button"
      class="carousel__next"
      aria-label="Next slide"
      onclick={() => goTo(index + 1)}
      disabled={index >= total - 1}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  </div>
</div>
