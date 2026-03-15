import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../components/react/Divider';

const meta: Meta<typeof Divider> = {
  title: 'Rizzo/Divider',
  component: Divider,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: { orientation: 'horizontal' },
};

export const WithLabel: Story = {
  args: { orientation: 'horizontal', label: 'OR' },
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: 40 }}>
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};
