import type { Meta, StoryObj } from '@storybook/react';
import { FontSwitcher } from '../components/react/FontSwitcher';

const meta: Meta<typeof FontSwitcher> = {
  title: 'Rizzo/Font Switcher',
  component: FontSwitcher,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FontSwitcher>;

export const Default: Story = {
  args: {},
};
