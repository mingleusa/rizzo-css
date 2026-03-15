import type { Meta, StoryObj } from '@storybook/react';
import { HoverCardDemo } from '../components/react/HoverCardDemo';

const meta: Meta<typeof HoverCardDemo> = {
  title: 'Rizzo/Hover Card',
  component: HoverCardDemo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HoverCardDemo>;

export const Default: Story = {
  render: () => <HoverCardDemo />,
};
