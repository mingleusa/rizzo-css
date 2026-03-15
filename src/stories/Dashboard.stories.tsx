import type { Meta, StoryObj } from '@storybook/react';
import { DashboardDemo } from '../components/react/DashboardDemo';

const meta: Meta<typeof DashboardDemo> = {
  title: 'Rizzo/Dashboard',
  component: DashboardDemo,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DashboardDemo>;

export const Default: Story = {
  render: () => <DashboardDemo />,
};
