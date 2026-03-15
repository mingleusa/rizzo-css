import type { Meta, StoryObj } from '@storybook/react';
import { ToastDemo } from '../components/react/ToastDemo';

const meta: Meta<typeof ToastDemo> = {
  title: 'Rizzo/Toast',
  component: ToastDemo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ToastDemo>;

export const Default: Story = {
  render: () => <ToastDemo />,
};
