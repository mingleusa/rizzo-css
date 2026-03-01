import type { Meta, StoryObj } from '@storybook/react';

function LandingHeroBlock() {
  return (
    <header className="landing-hero">
      <h1 className="landing-hero__title">Build something great</h1>
      <p className="landing-hero__subtitle">
        A themeable, accessible design system. Same CSS across frameworks.
      </p>
      <div className="landing-hero__ctas">
        <a href="/docs/getting-started" className="btn btn-primary">
          Get started
        </a>
        <a href="/docs/components" className="btn btn-outline">
          View components
        </a>
      </div>
    </header>
  );
}

const meta: Meta = {
  title: 'Blocks/Landing Hero',
  component: LandingHeroBlock,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Pre-built landing hero. Same structure for Astro, Svelte, React, Vue, Vanilla.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => <LandingHeroBlock />,
};
