import { Link } from 'react-router-dom';

export default function DocsGettingStarted() {
  return (
    <div>
      <p>This project was created with the <strong>Full</strong> template. You have the home page, docs overview, components index, blocks, and themes.</p>

      <h2 id="installation">Installation</h2>
      <p>Rizzo CSS is already set up. The stylesheet is at <code>public/css/rizzo.min.css</code>. Use the navbar to explore <Link to="/docs">Docs</Link>, <Link to="/docs/components">Components</Link>, <Link to="/blocks">Blocks</Link>, and <Link to="/themes">Themes</Link>.</p>

      <h2 id="add-component">Add a component</h2>
      <p>From your project root:</p>
      <pre><code>npx rizzo-css add &lt;ComponentName&gt;</code></pre>
      <p>Example: <code>npx rizzo-css add Modal</code> adds the Modal component to <code>src/components/rizzo</code>.</p>

      <h2>Next steps</h2>
      <ul>
        <li><Link to="/docs">Docs overview</Link></li>
        <li><Link to="/docs/components">Components</Link></li>
        <li><Link to="/blocks">Blocks</Link></li>
        <li><Link to="/themes">Themes</Link></li>
        <li>Full documentation: <a href="https://rizzo-css.vercel.app/docs/getting-started" target="_blank" rel="noopener noreferrer">rizzo-css.vercel.app</a></li>
      </ul>
    </div>
  );
}
