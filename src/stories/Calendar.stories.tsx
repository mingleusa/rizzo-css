import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '../components/react/Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Rizzo/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    initialMonth: { control: 'text', description: 'YYYY-MM' },
    selected: { control: 'text', description: 'YYYY-MM-DD' },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    label: 'Choose a date',
  },
};

export const WithInitialMonth: Story = {
  args: {
    label: 'December 2025',
    initialMonth: '2025-12',
  },
};

export const WithSelection: Story = {
  args: {
    label: 'Calendar',
    selected: '2025-02-15',
  },
};

export const WithCallback: Story = {
  args: {
    label: 'Calendar',
    onSelect: (date) => {
      console.log('Selected:', date);
    },
  },
};
