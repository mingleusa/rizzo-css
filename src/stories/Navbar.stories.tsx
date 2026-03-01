import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from '../components/react/Navbar';
import { Search } from '../components/react/Search';
import { SettingsDemo } from '../components/react/SettingsDemo';

const meta: Meta<typeof Navbar> = {
  title: 'Rizzo/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Responsive navbar with Search and Settings. Same BEM as Astro, Svelte, Vue, and Vanilla.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    siteName: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: { siteName: 'Rizzo' },
  render: (args) => (
    <Navbar {...args}>
      <Search />
      <SettingsDemo />
    </Navbar>
  ),
};

export const WithCustomSiteName: Story = {
  args: { siteName: 'My App' },
  render: (args) => (
    <Navbar {...args}>
      <Search />
      <SettingsDemo />
    </Navbar>
  ),
};
