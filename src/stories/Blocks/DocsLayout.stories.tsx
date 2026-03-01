import type { Meta, StoryObj } from '@storybook/react';

function DocsLayoutBlock() {
  return (
    <div className="docs" data-docs>
      <aside className="docs-sidebar" aria-label="Documentation navigation">
        <nav className="docs-sidebar__nav">
          <a href="#" className="docs-sidebar__link docs-sidebar__link--active">
            Introduction
          </a>
          <a href="#" className="docs-sidebar__link">
            Foundations
          </a>
          <a href="#" className="docs-sidebar__link">
            Components
          </a>
        </nav>
      </aside>
      <main className="docs__main">
        <div className="docs__container">
          <header className="docs__header">
            <h1 className="docs__title">Page title</h1>
            <p className="docs__description">Optional description.</p>
          </header>
          <div className="docs__content">
            <p>Main content. Use Rizzo typography and spacing tokens.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const meta: Meta = {
  title: 'Blocks/Docs Layout',
  component: DocsLayoutBlock,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Docs layout with sidebar and main content. Same BEM for Astro, Svelte, React, Vue, Vanilla.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => <DocsLayoutBlock />,
};
