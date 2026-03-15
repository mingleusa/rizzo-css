import type { Meta, StoryObj } from '@storybook/react';
import { SwitchDemo } from '../components/react/SwitchDemo';

const meta: Meta<typeof SwitchDemo> = {
  title: 'Rizzo/Switch',
  component: SwitchDemo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SwitchDemo>;

export const Default: Story = {
  render: () => <SwitchDemo />,
};
