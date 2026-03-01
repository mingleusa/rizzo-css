import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../components/react/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Rizzo/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};
