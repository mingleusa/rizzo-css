import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../components/react/ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Rizzo/Progress Bar',
  component: ProgressBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100 } },
    variant: { control: 'select', options: ['default', 'success', 'warning', 'error'] },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { value: 60 },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '16rem' }}>
      <ProgressBar value={40} variant="default" />
      <ProgressBar value={70} variant="success" />
      <ProgressBar value={50} variant="warning" />
      <ProgressBar value={20} variant="error" />
    </div>
  ),
};
