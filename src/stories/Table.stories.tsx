import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../components/react/Table';

const meta: Meta<typeof Table> = {
  title: 'Rizzo/Table',
  component: Table,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'value', label: 'Value', sortable: true, type: 'number' },
    ],
    data: [
      { name: 'Alpha', value: 10 },
      { name: 'Beta', value: 20 },
    ],
    caption: 'Demo table',
    striped: true,
  },
};
