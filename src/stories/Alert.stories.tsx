import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../components/react/Alert';

const meta: Meta<typeof Alert> = {
  title: 'Rizzo/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
    dismissible: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: { children: 'This is an alert message.', variant: 'info' },
};

export const Success: Story = {
  args: { children: 'Operation completed successfully.', variant: 'success' },
};

export const Error: Story = {
  args: { children: 'Something went wrong.', variant: 'error' },
};

export const Warning: Story = {
  args: { children: 'Please review before continuing.', variant: 'warning' },
};

export const Dismissible: Story = {
  args: { children: 'You can close this alert.', variant: 'info', dismissible: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '24rem' }}>
      <Alert variant="success">Success message</Alert>
      <Alert variant="error">Error message</Alert>
      <Alert variant="warning">Warning message</Alert>
      <Alert variant="info">Info message</Alert>
    </div>
  ),
};
