import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../components/react/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Rizzo/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const defaultItems = [
  { id: 'a1', title: 'Section 1', content: '<p>Content for section 1.</p>' },
  { id: 'a2', title: 'Section 2', content: '<p>Content for section 2.</p>' },
  { id: 'a3', title: 'Section 3', content: '<p>Content for section 3.</p>' },
];

export const Default: Story = {
  args: { items: defaultItems },
};

export const AllowMultiple: Story = {
  args: { items: defaultItems, allowMultiple: true },
};

export const FirstCollapsed: Story = {
  args: { items: defaultItems, defaultExpanded: [] },
};
