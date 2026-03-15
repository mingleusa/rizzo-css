import type { Meta, StoryObj } from '@storybook/react';
import { BackToTop } from '../components/react/BackToTop';

const meta: Meta<typeof BackToTop> = {
  title: 'Rizzo/Back To Top',
  component: BackToTop,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    threshold: { control: 'number' },
    label: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof BackToTop>;

export const Default: Story = {
  args: { threshold: 100, label: 'Back to top' },
};
