<script lang="ts">
  import Card from '../../Card.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';

  const imagePlaceholderStyle = 'width: 100%; height: var(--spacing-50); background: linear-gradient(135deg, var(--accent), var(--accent-hover)); border-radius: var(--radius-lg) var(--radius-lg) 0 0; margin: calc(-1 * var(--spacing-6)) calc(-1 * var(--spacing-6)) var(--spacing-6) calc(-1 * var(--spacing-6)); display: flex; align-items: center; justify-content: center; color: var(--accent-text); font-weight: var(--font-weight-semibold);';
</script>

<section>
  <h2>Card component</h2>
  <p>The Card component provides a flexible container for organizing content with variants, sections, and image support.</p>
  <AddComponentTabs componentName="Card" />

  <h3>Basic usage</h3>
  <p>The simplest card usage:</p>
  <div class="example">
    <div class="example-title">Live example</div>
    <Card>
      <h3>Card Title</h3>
      <p>This is a basic card with default styling. It uses semantic theme variables and adapts to all themes.</p>
    </Card>
  </div>

  <h3>Card variants</h3>
  <p>Cards support four variants for different visual styles:</p>

  <h4>Default</h4>
  <div class="example">
    <div class="example-title">Live example</div>
    <Card variant="default">
      <h3>Default Card</h3>
      <p>Standard card with border and background.</p>
    </Card>
  </div>

  <h4>Elevated</h4>
  <div class="example">
    <div class="example-title">Live example</div>
    <Card variant="elevated">
      <h3>Elevated Card</h3>
      <p>Card with shadow effect. Hover to see it lift up.</p>
    </Card>
  </div>

  <h4>Outlined</h4>
  <div class="example">
    <div class="example-title">Live example</div>
    <Card variant="outlined">
      <h3>Outlined Card</h3>
      <p>Transparent background with border. Hover to see accent border.</p>
    </Card>
  </div>

  <h4>Filled</h4>
  <div class="example">
    <div class="example-title">Live example</div>
    <Card variant="filled">
      <h3>Filled Card</h3>
      <p>Uses main background color instead of alt background.</p>
    </Card>
  </div>

  <h3>Card sections</h3>
  <p>Use card sections for structured layouts with header, body, and footer:</p>
  <div class="example">
    <div class="example-title">Live example</div>
    <Card>
      <div class="card__header">
        <h3 class="card__title">Card Title</h3>
        <p class="card__subtitle">Card subtitle or description</p>
      </div>
      <div class="card__body">
        <p>This is the main content area of the card. It can contain any content you need.</p>
        <p>Multiple paragraphs, lists, or other elements work great here.</p>
      </div>
      <div class="card__footer">
        <button type="button" class="btn btn-primary">Action</button>
        <button type="button" class="btn btn-outline">Cancel</button>
      </div>
    </Card>
  </div>
  <h4>Section classes</h4>
  <ul>
    <li><code>card__header</code> — Header section with bottom border</li>
    <li><code>card__body</code> — Main content area (flexible, takes remaining space)</li>
    <li><code>card__footer</code> — Footer section with top border</li>
    <li><code>card__title</code> — Title styling for header</li>
    <li><code>card__subtitle</code> — Subtitle styling for header</li>
  </ul>

  <h3>Card with image</h3>
  <p>Add an image to your card using the <code>card__image</code> class:</p>
  <div class="example">
    <div class="example-title">Live example</div>
    <Card variant="elevated">
      <div style={imagePlaceholderStyle}>Image Placeholder</div>
      <div class="card__header">
        <h3 class="card__title">Card with Image</h3>
      </div>
      <div class="card__body">
        <p>This card includes an image at the top. The image automatically adjusts to the card's border radius.</p>
      </div>
    </Card>
  </div>

  <h3>Complete example</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <Card variant="elevated">
      <div style={imagePlaceholderStyle}>Featured Image</div>
      <div class="card__header">
        <h3 class="card__title">Complete Card Example</h3>
        <p class="card__subtitle">With image, header, body, and footer</p>
      </div>
      <div class="card__body">
        <p>This is a complete card example showcasing all features:</p>
        <ul>
          <li>Image at the top</li>
          <li>Structured header with title and subtitle</li>
          <li>Flexible body content</li>
          <li>Footer with actions</li>
        </ul>
      </div>
      <div class="card__footer">
        <button type="button" class="btn btn-primary">Primary Action</button>
        <button type="button" class="btn btn-outline">Secondary</button>
      </div>
    </Card>
  </div>

  <h3>Props</h3>
  <ul>
    <li><code>variant</code> ('default' | 'elevated' | 'outlined' | 'filled', optional) — Card variant style (default: 'default')</li>
    <li><code>class</code> (string, optional) — Additional CSS classes</li>
  </ul>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Card from './components/svelte/Card.svelte';
</script>

<Card variant="elevated">
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
    <p class="card__subtitle">Subtitle text</p>
  </div>
  <div class="card__body">
    <p>Main content area</p>
  </div>
  <div class="card__footer">
    <button class="btn btn-primary">Action</button>
  </div>
</Card>`}
    language="svelte"
  />
</section>

<style>
  .example {
    margin: var(--spacing-6) 0;
    padding: var(--spacing-4);
    background: var(--background-alt);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
  .example-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--text-dim);
    margin-bottom: var(--spacing-3);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
  }
</style>
