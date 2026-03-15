import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../components/react/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Rizzo/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'text', 'circle', 'rect'] },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {},
};

export const Text: Story = {
  args: { variant: 'text' },
};

export const Circle: Story = {
  args: { variant: 'circle' },
};

export const Rect: Story = {
  args: { variant: 'rect' },
};
