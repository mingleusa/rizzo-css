import type { Meta, StoryObj } from '@storybook/react';
import { ResizableDemo } from '../components/react/ResizableDemo';

const meta: Meta<typeof ResizableDemo> = {
  title: 'Rizzo/Resizable',
  component: ResizableDemo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ResizableDemo>;

export const Default: Story = {
  render: () => <ResizableDemo />,
};
