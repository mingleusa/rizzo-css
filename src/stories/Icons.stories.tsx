import type { Meta, StoryObj } from '@storybook/react';
import { Icons } from '../components/react/Icons';

const meta: Meta<typeof Icons> = {
  title: 'Rizzo/Icons',
  component: Icons,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Icons>;

export const Default: Story = {
  render: () => <Icons />,
};
