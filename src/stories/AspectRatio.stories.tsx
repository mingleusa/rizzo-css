import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '../components/react/AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  title: 'Rizzo/Aspect Ratio',
  component: AspectRatio,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    ratio: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  args: { ratio: 16 / 9, children: <div style={{ background: 'var(--muted)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>16:9</div> },
};

export const Square: Story = {
  args: { ratio: 1, children: <div style={{ background: 'var(--muted)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1:1</div> },
};
