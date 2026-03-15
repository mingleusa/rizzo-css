import type { Meta, StoryObj } from '@storybook/react';
import { CollapsibleDemo } from '../components/react/CollapsibleDemo';

const meta: Meta<typeof CollapsibleDemo> = {
  title: 'Rizzo/Collapsible',
  component: CollapsibleDemo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CollapsibleDemo>;

export const Default: Story = {
  render: () => <CollapsibleDemo />,
};
