import type { Meta, StoryObj } from '@storybook/react';
import { Direction } from '../components/react/Direction';

const meta: Meta<typeof Direction> = {
  title: 'Rizzo/Direction',
  component: Direction,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    dir: { control: 'select', options: ['ltr', 'rtl'] },
  },
};

export default meta;

type Story = StoryObj<typeof Direction>;

export const Default: Story = {
  args: { dir: 'rtl', children: <p>Right-to-left content. نفس التصميم، اتجاه مختلف.</p> },
};

export const LTR: Story = {
  args: { dir: 'ltr', children: <p>Left-to-right content.</p> },
};
