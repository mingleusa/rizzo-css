import type { Meta, StoryObj } from '@storybook/react';
import { ScrollAreaDemo } from '../components/react/ScrollAreaDemo';

const meta: Meta<typeof ScrollAreaDemo> = {
  title: 'Rizzo/Scroll Area',
  component: ScrollAreaDemo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ScrollAreaDemo>;

export const Default: Story = {
  render: () => <ScrollAreaDemo />,
};
