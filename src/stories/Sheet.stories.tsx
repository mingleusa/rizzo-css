import type { Meta, StoryObj } from '@storybook/react';
import { SheetDemo } from '../components/react/SheetDemo';

const meta: Meta<typeof SheetDemo> = {
  title: 'Rizzo/Sheet',
  component: SheetDemo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SheetDemo>;

export const Default: Story = {
  render: () => <SheetDemo />,
};
