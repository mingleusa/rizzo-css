import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../components/react/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Rizzo/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['circle', 'square'] },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: { name: 'Jane Doe' },
};

export const WithImage: Story = {
  args: { name: 'Jane Doe', src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
      <Avatar name="Small" size="sm" />
      <Avatar name="Medium" size="md" />
      <Avatar name="Large" size="lg" />
    </div>
  ),
};
