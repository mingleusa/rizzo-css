import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../components/react/Label';
import { Input } from '../components/react/Input';

const meta: Meta<typeof Label> = {
  title: 'Rizzo/Label',
  component: Label,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: { htmlFor: 'email', children: 'Email' },
};

export const WithInput: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <Label htmlFor="demo-email">Email address</Label>
      <Input id="demo-email" type="email" placeholder="you@example.com" />
    </div>
  ),
};
