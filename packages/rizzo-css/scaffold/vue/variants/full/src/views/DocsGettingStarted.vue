<template>
  <div>
    <p>This project was created with the <strong>Full</strong> template. You have the home page, docs overview, components index, blocks, and themes.</p>

    <h2 id="installation">Installation</h2>
    <p>Rizzo CSS is already set up. The stylesheet is at <code>public/css/rizzo.min.css</code>. Use the navbar to explore <router-link to="/docs">Docs</router-link>, <router-link to="/docs/components">Components</router-link>, <router-link to="/blocks">Blocks</router-link>, and <router-link to="/themes">Themes</router-link>.</p>

    <h2 id="add-component">Add a component</h2>
    <p>From your project root:</p>
    <pre><code>npx rizzo-css add &lt;ComponentName&gt;</code></pre>
    <p>Example: <code>npx rizzo-css add Modal</code> adds the Modal component to <code>src/components/rizzo</code>.</p>

    <h2>Next steps</h2>
    <ul>
      <li><router-link to="/docs">Docs overview</router-link></li>
      <li><router-link to="/docs/components">Components</router-link></li>
      <li><router-link to="/blocks">Blocks</router-link></li>
      <li><router-link to="/themes">Themes</router-link></li>
      <li>Full documentation: <a href="https://rizzo-css.vercel.app/docs/getting-started" target="_blank" rel="noopener noreferrer">rizzo-css.vercel.app</a></li>
    </ul>
  </div>
</template>

<style scoped>
:deep(.docs__content) code {
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
