import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenuDemo } from '../components/react/ContextMenuDemo';

const meta: Meta<typeof ContextMenuDemo> = {
  title: 'Rizzo/Context Menu',
  component: ContextMenuDemo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ContextMenuDemo>;

export const Default: Story = {
  render: () => <ContextMenuDemo />,
};
