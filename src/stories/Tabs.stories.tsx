import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../components/react/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Rizzo/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'pills', 'underline'] },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const defaultTabs = [
  { id: 'one', label: 'Tab One', content: '<p>Content for tab one.</p>' },
  { id: 'two', label: 'Tab Two', content: '<p>Content for tab two.</p>' },
  { id: 'three', label: 'Tab Three', content: '<p>Content for tab three.</p>' },
];

export const Default: Story = {
  args: { tabs: defaultTabs },
};

export const Pills: Story = {
  args: { tabs: defaultTabs, variant: 'pills' },
};

export const Underline: Story = {
  args: { tabs: defaultTabs, variant: 'underline' },
};
