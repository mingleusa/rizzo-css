import type { Meta, StoryObj } from '@storybook/react';
import { RangeCalendar } from '../components/react/RangeCalendar';

const meta: Meta<typeof RangeCalendar> = {
  title: 'Rizzo/RangeCalendar',
  component: RangeCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    initialMonth: { control: 'text' },
    onRangeSelect: { action: 'rangeSelect' },
  },
};

export default meta;

type Story = StoryObj<typeof RangeCalendar>;

export const Default: Story = {
  args: {
    label: 'Choose date range',
  },
};

export const WithCallback: Story = {
  args: {
    label: 'Choose date range',
    onRangeSelect: (start, end) => {
      console.log('Range selected:', start, end);
    },
  },
};
