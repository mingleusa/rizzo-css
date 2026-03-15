import type { Meta, StoryObj } from '@storybook/react';
import { Command } from '../components/react/Command';

const meta: Meta<typeof Command> = {
  title: 'Rizzo/Command',
  component: Command,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Command>;

export const Default: Story = {
  args: {
    triggerLabel: 'Open command palette (⌘K)',
    searchPlaceholder: 'Search…',
    items: [
      { id: 'new', label: 'New file', shortcut: '⌘N' },
      { id: 'save', label: 'Save', shortcut: '⌘S' },
    ],
  },
};
