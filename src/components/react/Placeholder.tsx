import type { ReactNode } from 'react';

export interface PlaceholderProps {
  slug: string;
  title: string;
  description?: string;
}

/** Shown on React doc pages for components not yet fully ported; same BEM info as other frameworks. */
export function Placeholder({ slug, title, description }: PlaceholderProps): ReactNode {
  return (
    <div className="card card--outlined">
      <div className="card__body">
      <h3 style={{ marginTop: 0 }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-dim)', marginBottom: 'var(--spacing-2)' }}>
        {description ?? `React component for ${title}. Same BEM classes as Astro and Svelte.`}
      </p>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-dim)' }}>
        Use the same class names (e.g. <code className="kbd">.{slug}</code>) as in the{' '}
        <a href={`/docs/components/${slug}`}>Astro</a> and <a href={`/docs/svelte/components/${slug}`}>Svelte</a> docs.
        See Astro and Svelte docs for the same component.
      </p>
      </div>
    </div>
  );
}

export default Placeholder;
