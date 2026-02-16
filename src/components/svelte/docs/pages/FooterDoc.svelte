<script lang="ts">
  import Footer from '../../Footer.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';
</script>

<section>
  <h2>Footer component</h2>
  <p>A simple footer with <code>role="contentinfo"</code>, optional site name, copyright year, and an optional list of links (e.g. Privacy, Terms, Docs). Uses semantic CSS variables and BEM classes.</p>
  <AddComponentTabs componentName="Footer" />

  <h3>Props</h3>
  <ul>
    <li><code>siteName</code> (string, optional) — Name shown before the copyright (e.g. "My Site · © 2025")</li>
    <li><code>year</code> (number, optional) — Copyright year (default: current year)</li>
    <li><code>links</code> (array, optional) — List of <code>{'{ href, label }'}</code> for footer nav links</li>
    <li><code>class</code> (string, optional) — Additional CSS classes on the root</li>
  </ul>

  <h3>Live example</h3>
  <div class="example">
    <div class="example-title">Live example</div>
    <Footer
      siteName="Rizzo CSS"
      links={[
        { href: '/docs/getting-started', label: 'Getting Started' },
        { href: '/docs/components', label: 'Components' },
        { href: '/docs/theming', label: 'Theming' },
      ]}
    />
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import { Footer } from '$lib/rizzo';
</script>

<Footer siteName="My Site" />

<Footer
  siteName="My Site"
  links={[
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ]}
/>

<Footer siteName="My Site" year={2025} />`}
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
