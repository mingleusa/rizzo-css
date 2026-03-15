import type { Meta, StoryObj } from '@storybook/react';
import { SliderDemo } from '../components/react/SliderDemo';

const meta: Meta<typeof SliderDemo> = {
  title: 'Rizzo/Slider',
  component: SliderDemo,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SliderDemo>;

export const Default: Story = {
  render: () => <SliderDemo />,
};
