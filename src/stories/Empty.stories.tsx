import type { Meta, StoryObj } from '@storybook/react';
import { Empty } from '../components/react/Empty';

const meta: Meta<typeof Empty> = {
  title: 'Rizzo/Empty',
  component: Empty,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  args: {
    title: 'No items yet',
    description: 'Get started by adding your first item.',
  },
};
