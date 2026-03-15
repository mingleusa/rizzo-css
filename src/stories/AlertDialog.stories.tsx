import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogDemo } from '../components/react/AlertDialogDemo';

const meta: Meta<typeof AlertDialogDemo> = {
  title: 'Rizzo/Alert Dialog',
  component: AlertDialogDemo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AlertDialogDemo>;

export const Default: Story = {
  render: () => <AlertDialogDemo />,
};
