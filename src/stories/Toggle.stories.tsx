import type { Meta, StoryObj } from '@storybook/react';
import { ToggleDemo } from '../components/react/ToggleDemo';

const meta: Meta<typeof ToggleDemo> = {
  title: 'Rizzo/Toggle',
  component: ToggleDemo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ToggleDemo>;

export const Default: Story = {
  render: () => <ToggleDemo />,
};
