import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from '../components/react/Chart';

const meta: Meta<typeof Chart> = {
  title: 'Rizzo/Chart',
  component: Chart,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Chart>;

export const Default: Story = {
  args: {
    data: [
      { label: 'A', value: 40 },
      { label: 'B', value: 65 },
      { label: 'C', value: 30 },
    ],
  },
};
