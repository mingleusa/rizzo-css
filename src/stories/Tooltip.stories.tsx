import type { Meta, StoryObj } from '@storybook/react';
import { TooltipDemo } from '../components/react/TooltipDemo';

const meta: Meta<typeof TooltipDemo> = {
  title: 'Rizzo/Tooltip',
  component: TooltipDemo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TooltipDemo>;

export const Default: Story = {
  render: () => <TooltipDemo />,
};
