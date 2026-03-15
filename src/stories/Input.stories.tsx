import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/react/Input';

const meta: Meta<typeof Input> = {
  title: 'Rizzo/Input (Forms)',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: 'you@example.com', type: 'email' },
};

export const WithLabel: Story = {
  render: () => (
    <div>
      <label htmlFor="demo-email" className="label">Email</label>
      <Input id="demo-email" placeholder="you@example.com" type="email" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 200 }}>
      <Input placeholder="Small" size="sm" />
      <Input placeholder="Medium" size="md" />
      <Input placeholder="Large" size="lg" />
    </div>
  ),
};
