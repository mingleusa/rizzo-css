import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../components/react/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Rizzo/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    showFirstLast: { control: 'boolean' },
    maxVisible: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: { currentPage: 2, totalPages: 10, showFirstLast: true, maxVisible: 5 },
};

export const FirstPage: Story = {
  args: { currentPage: 1, totalPages: 10, showFirstLast: true, maxVisible: 5 },
};

export const LastPage: Story = {
  args: { currentPage: 10, totalPages: 10, showFirstLast: true, maxVisible: 5 },
};
