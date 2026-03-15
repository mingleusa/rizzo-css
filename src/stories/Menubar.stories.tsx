import type { Meta, StoryObj } from '@storybook/react';
import { Menubar } from '../components/react/Menubar';

const meta: Meta<typeof Menubar> = {
  title: 'Rizzo/Menubar',
  component: Menubar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  args: {
    items: [
      { label: 'File', menu: [{ label: 'New', href: '#' }, { label: 'Open', href: '#' }] },
      { label: 'Edit', menu: [{ label: 'Undo', href: '#' }] },
    ],
  },
};
