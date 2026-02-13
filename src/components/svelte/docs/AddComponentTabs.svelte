<script lang="ts">
  import Tabs from '../Tabs.svelte';
  import CodeBlock from './CodeBlock.svelte';

  const DISPLAY_TO_CLI: Record<string, string> = {
    'Theme Switcher': 'ThemeSwitcher',
    'Copy to Clipboard': 'CopyToClipboard',
    'Progress Bar': 'ProgressBar',
  };
  const CLI_COMPONENT_NAMES = new Set([
    'Button', 'Badge', 'Card', 'Divider', 'Spinner', 'ProgressBar', 'Avatar', 'Alert',
    'Breadcrumb', 'FormGroup', 'Input', 'Checkbox', 'Textarea', 'Select', 'Radio',
    'CopyToClipboard', 'Tooltip', 'Pagination', 'Tabs', 'Accordion', 'Dropdown',
    'Modal', 'Toast', 'Table', 'ThemeSwitcher',
    'Navbar', 'Settings', 'Search', 'Icons',
  ]);

  interface Props {
    componentName: string;
  }
  let { componentName }: Props = $props();

  const cliName = DISPLAY_TO_CLI[componentName] ?? componentName;
  const componentArg = CLI_COMPONENT_NAMES.has(cliName) ? cliName : '';
  const addSuffix = componentArg ? ' ' + componentArg : '';

  const tabs = [
    { id: 'npm', label: 'npm' },
    { id: 'pnpm', label: 'pnpm' },
    { id: 'yarn', label: 'yarn' },
    { id: 'bun', label: 'bun' },
  ];

  const commands: Record<string, string> = {
    npm: 'npx rizzo-css add' + addSuffix,
    pnpm: 'pnpm dlx rizzo-css add' + addSuffix,
    yarn: 'yarn dlx rizzo-css add' + addSuffix,
    bun: 'bunx rizzo-css add' + addSuffix,
  };
</script>

<div class="add-component-tabs">
  <h3 class="add-component-tabs__title">Add this component</h3>
  <p class="add-component-tabs__hint">
    {#if componentArg}The command below includes <strong>{componentName}</strong>—run it in your project directory to install this component (and the CSS if needed). No prompts.{:else}Run the command below in your project directory. When prompted, select the component(s) you want. The CLI will copy the CSS and component files.{/if}
  </p>
  <Tabs tabs={tabs} defaultTab="npm" class="add-component-tabs__tabs">
    {#snippet children(activeTabId)}
      <CodeBlock code={commands[activeTabId] ?? commands.npm} language="bash" />
    {/snippet}
  </Tabs>
</div>

<style>
  .add-component-tabs {
    margin: var(--spacing-6) 0;
    padding: var(--spacing-4);
    background: var(--background-alt);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
  .add-component-tabs__title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin: 0 0 var(--spacing-2) 0;
  }
  .add-component-tabs__hint {
    font-size: var(--font-size-sm);
    color: var(--text-dim);
    margin: 0 0 var(--spacing-3) 0;
    line-height: var(--line-height-relaxed);
  }
  .add-component-tabs :global(.tabs__panel) {
    padding: 0;
  }
</style>
