<script lang="ts">
</script>

<p>This project was created with the <strong>Full</strong> template. You have the home page, docs overview, components index, blocks, and themes.</p>

<h2 id="installation">Installation</h2>
<p>Rizzo CSS is already set up. The stylesheet is at <code>static/css/rizzo.min.css</code>. Use the navbar to explore <a href="/docs">Docs</a>, <a href="/docs/components">Components</a>, <a href="/blocks">Blocks</a>, and <a href="/themes">Themes</a>.</p>

<h2 id="add-component">Add a component</h2>
<p>From your project root:</p>
<pre><code>npx rizzo-css add &lt;ComponentName&gt;</code></pre>
<p>Example: <code>npx rizzo-css add Modal</code> adds the Modal component to <code>src/lib/rizzo</code>.</p>

<h2>Next steps</h2>
<ul>
  <li><a href="/docs">Docs overview</a></li>
  <li><a href="/docs/components">Components</a></li>
  <li><a href="/blocks">Blocks</a></li>
  <li><a href="/themes">Themes</a></li>
  <li>Full documentation: <a href="https://rizzo-css.vercel.app/docs/getting-started" target="_blank" rel="noopener noreferrer">rizzo-css.vercel.app</a></li>
</ul>

<style>
  :global(.docs__content) code {
    background: var(--background-alt);
    color: var(--accent-fg);
    padding: var(--spacing-0-125) var(--spacing-0-375);
    border-radius: var(--radius);
    font-size: var(--font-size-sm);
  }
  pre {
    background: var(--background-alt);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-4);
    overflow-x: auto;
    margin: var(--spacing-4) 0;
  }
  pre code {
    padding: 0;
    background: none;
  }
</style>
