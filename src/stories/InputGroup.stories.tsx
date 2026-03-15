import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup } from '../components/react/InputGroup';

const meta: Meta<typeof InputGroup> = {
  title: 'Rizzo/Input Group',
  component: InputGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  args: { placeholder: '0.00', prefix: '$', suffix: 'USD', 'aria-label': 'Amount' },
};

export const WithPrefixOnly: Story = {
  args: { placeholder: 'username', prefix: '@', 'aria-label': 'Username' },
};
