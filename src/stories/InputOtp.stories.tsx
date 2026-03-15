import type { Meta, StoryObj } from '@storybook/react';
import { InputOtp } from '../components/react/InputOtp';

const meta: Meta<typeof InputOtp> = {
  title: 'Rizzo/Input OTP',
  component: InputOtp,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    length: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof InputOtp>;

export const Default: Story = {
  args: { length: 6 },
};

export const FourDigits: Story = {
  args: { length: 4 },
};
