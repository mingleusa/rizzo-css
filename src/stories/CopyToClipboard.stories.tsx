import type { Meta, StoryObj } from '@storybook/react';
import { CopyToClipboard } from '../components/react/CopyToClipboard';

const meta: Meta<typeof CopyToClipboard> = {
  title: 'Rizzo/Copy To Clipboard',
  component: CopyToClipboard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CopyToClipboard>;

export const Default: Story = {
  args: { value: 'npm install rizzo-css', label: 'Copy' },
};
