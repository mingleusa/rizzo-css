import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/react/Card';

const meta: Meta<typeof Card> = {
  title: 'Rizzo/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'filled'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <div className="card__header">
          <h3 className="card__title">Card title</h3>
        </div>
        <div className="card__body">
          <p>Card body content. Same BEM structure as Astro and Svelte.</p>
        </div>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <div className="card__header">
          <h3 className="card__title">Elevated card</h3>
        </div>
        <div className="card__body">
          <p>Uses <code>card--elevated</code> for shadow.</p>
        </div>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <div className="card__body">
          <p>Outlined variant with border.</p>
        </div>
      </>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <>
        <div className="card__body">
          <p>Filled background variant.</p>
        </div>
      </>
    ),
  },
};
