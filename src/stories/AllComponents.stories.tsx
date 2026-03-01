import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { getReactComponent, getDemoProps } from '../components/react/registry';
import { REACT_COMPONENT_SLUGS, slugToTitle } from '../config/reactComponents';

const meta: Meta = {
  title: 'Rizzo/All Components',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Browse all 50 Rizzo components. Same BEM and CSS for Astro, Svelte, React, Vue, and Vanilla.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Showcase: Story = {
  render: function ShowcaseAll() {
    const [slug, setSlug] = useState<string>(REACT_COMPONENT_SLUGS[0]);
    const Component = getReactComponent(slug);
    const demoProps = getDemoProps(slug) as Record<string, unknown>;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '100%' }}>
        <label htmlFor="component-select" style={{ fontWeight: 600 }}>
          Component
        </label>
        <select
          id="component-select"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="input"
          style={{ minWidth: '16rem', padding: '0.5rem' }}
        >
          {REACT_COMPONENT_SLUGS.map((s) => (
            <option key={s} value={s}>
              {slugToTitle(s)}
            </option>
          ))}
        </select>
        <div className="card" style={{ padding: '1.5rem', minWidth: '20rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{slugToTitle(slug)}</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--muted, #666)' }}>
            Same component and CSS for Astro, Svelte, React, Vue, Vanilla.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Component {...demoProps} />
          </div>
        </div>
      </div>
    );
  },
};
