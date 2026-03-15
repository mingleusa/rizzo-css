import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '../components/react/Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Rizzo/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Docs', href: '/docs' },
      { label: 'Current' },
    ],
  },
};
