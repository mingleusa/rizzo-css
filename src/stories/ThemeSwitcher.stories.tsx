import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher } from '../components/react/ThemeSwitcher';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Rizzo/Theme Switcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible theme switcher with theme icons and keyboard navigation. Same BEM as Astro, Svelte, Vue, and Vanilla.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    idPrefix: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
  args: {},
};

export const CustomThemes: Story = {
  args: {
    themes: [
      { value: 'github-dark-classic', label: 'Dark' },
      { value: 'github-light', label: 'Light' },
      { value: 'system', label: 'System' },
    ],
  },
  render: (args) => <ThemeSwitcher themes={args.themes} />,
};
