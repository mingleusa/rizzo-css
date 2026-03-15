import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup } from '../components/react/ToggleGroup';
import { Toggle } from '../components/react/Toggle';
import { useState } from 'react';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Rizzo/Toggle Group',
  component: ToggleGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

function ToggleGroupSingleDemo() {
  const [value, setValue] = useState('left');
  return (
    <ToggleGroup type="single">
      <Toggle pressed={value === 'left'} onPressedChange={() => setValue('left')} aria-label="Left">
        Left
      </Toggle>
      <Toggle pressed={value === 'center'} onPressedChange={() => setValue('center')} aria-label="Center">
        Center
      </Toggle>
      <Toggle pressed={value === 'right'} onPressedChange={() => setValue('right')} aria-label="Right">
        Right
      </Toggle>
    </ToggleGroup>
  );
}

export const Default: Story = {
  render: () => <ToggleGroupSingleDemo />,
};

export const Vertical: Story = {
  render: () => (
    <ToggleGroup type="single" orientation="vertical">
      <Toggle pressed={false} onPressedChange={() => {}} aria-label="One">One</Toggle>
      <Toggle pressed={true} onPressedChange={() => {}} aria-label="Two">Two</Toggle>
      <Toggle pressed={false} onPressedChange={() => {}} aria-label="Three">Three</Toggle>
    </ToggleGroup>
  ),
};
