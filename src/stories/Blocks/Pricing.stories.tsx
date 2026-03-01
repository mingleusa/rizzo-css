import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../../components/react/Card';
import { Badge } from '../../components/react/Badge';

function PricingBlock() {
  return (
    <div className="pricing-grid">
      <Card variant="elevated" className="pricing-card">
        <div className="card__body">
          <h3 className="pricing-card__name">Starter</h3>
          <p className="pricing-card__price">
            <span className="pricing-card__currency">$</span>0
          </p>
          <p className="pricing-card__period">Free forever</p>
          <ul className="pricing-card__features">
            <li>Up to 3 projects</li>
            <li>Community support</li>
          </ul>
          <a href="#" className="btn btn-outline pricing-card__cta">
            Get started
          </a>
        </div>
      </Card>
      <Card variant="elevated" className="pricing-card pricing-card--featured">
        <div className="card__body">
          <Badge variant="primary" className="pricing-card__badge">
            Popular
          </Badge>
          <h3 className="pricing-card__name">Pro</h3>
          <p className="pricing-card__price">
            <span className="pricing-card__currency">$</span>12
            <span className="pricing-card__period-inline">/mo</span>
          </p>
          <p className="pricing-card__period">Billed monthly</p>
          <ul className="pricing-card__features">
            <li>Unlimited projects</li>
            <li>Priority support</li>
          </ul>
          <a href="#" className="btn btn-primary pricing-card__cta">
            Start trial
          </a>
        </div>
      </Card>
    </div>
  );
}

const meta: Meta = {
  title: 'Blocks/Pricing',
  component: PricingBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Pricing grid with cards. Same BEM for Astro, Svelte, React, Vue, Vanilla.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ minWidth: 'min(100%, 40rem)' }}>
      <PricingBlock />
    </div>
  ),
};
