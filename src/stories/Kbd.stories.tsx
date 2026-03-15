import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from '../components/react/Kbd';

const meta: Meta<typeof Kbd> = {
  title: 'Rizzo/Kbd',
  component: Kbd,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  args: { children: 'Ctrl' },
};

export const Shortcut: Story = {
  render: () => (
    <span>
      Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open command palette.
    </span>
  ),
};
