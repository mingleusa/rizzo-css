import type { Meta, StoryObj } from '@storybook/react';
import { PopoverDemo } from '../components/react/PopoverDemo';

const meta: Meta<typeof PopoverDemo> = {
  title: 'Rizzo/Popover',
  component: PopoverDemo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PopoverDemo>;

export const Default: Story = {
  render: () => <PopoverDemo />,
};
