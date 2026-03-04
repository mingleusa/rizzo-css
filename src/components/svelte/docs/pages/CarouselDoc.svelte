<script lang="ts">
  import Carousel from '../../Carousel.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Carousel component</h2>
  <p>Sliding content with previous/next controls and optional dot indicators. Uses <code>children</code> snippet for slides. Keyboard and screen reader friendly.</p>
  <AddComponentTabs componentName="Carousel" />

  <h3>Live example</h3>
  <div class="example">
    <div class="example-title">Carousel</div>
    <Carousel label="Example slides" showIndicators={true}>
      {#snippet children()}
        <div class="carousel__slide">
          <h4 style="margin-top:0">Slide 1</h4>
          <p>First slide content. Use previous/next or the indicators to navigate.</p>
        </div>
        <div class="carousel__slide">
          <h4 style="margin-top:0">Slide 2</h4>
          <p>Second slide content.</p>
        </div>
        <div class="carousel__slide">
          <h4 style="margin-top:0">Slide 3</h4>
          <p>Third slide content.</p>
        </div>
      {/snippet}
    </Carousel>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import { Carousel } from '$lib/rizzo';
</script>

<Carousel label="Example slides" showIndicators={true}>
  {#snippet children()}
    <div class="carousel__slide">
      <h4 style="margin-top:0">Slide 1</h4>
      <p>First slide content. Use previous/next or the indicators to navigate.</p>
    </div>
    <div class="carousel__slide">
      <h4 style="margin-top:0">Slide 2</h4>
      <p>Second slide content.</p>
    </div>
    <div class="carousel__slide">
      <h4 style="margin-top:0">Slide 3</h4>
      <p>Third slide content.</p>
    </div>
  {/snippet}
</Carousel>`}
    language="svelte"
  />

  <p><strong>Other frameworks:</strong> <a href="/docs/components/carousel">Astro</a> · <a href="/docs/vanilla/components/carousel">Vanilla</a> · <a href="/docs/vue/components/carousel">Vue</a> · <a href="/docs/react/components/carousel">React</a></p>
  <p><a href="/docs/svelte/components">← Back to Svelte components</a></p>
</section>

<style>
  .example { margin: var(--spacing-6) 0; padding: var(--spacing-4); background: var(--background-alt); border: 1px solid var(--border); border-radius: var(--radius-lg); }
  .example-title { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--text-dim); margin-bottom: var(--spacing-3); text-transform: uppercase; letter-spacing: var(--letter-spacing-wider); }
</style>
