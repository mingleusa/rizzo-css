#!/usr/bin/env node
/**
 * Add "Other frameworks" line to Svelte component doc pages that don't have it.
 * Order: Astro · Vanilla · Vue · React
 */
import { readFileSync, writeFileSync } from 'fs';
import { readdirSync } from 'fs';
import { join } from 'path';

const rootDir = join(import.meta.dirname, '..');
const pagesDir = join(rootDir, 'src/components/svelte/docs/pages');

// Filename (without .svelte) -> docs slug
const nameToSlug = {
  ButtonDoc: 'button',
  BackToTopDoc: 'back-to-top',
  BadgeDoc: 'badge',
  CardsDoc: 'cards',
  CalendarDoc: 'calendar',
  CarouselDoc: 'carousel',
  DividerDoc: 'divider',
  SpinnerDoc: 'spinner',
  ProgressBarDoc: 'progress-bar',
  RangeCalendarDoc: 'range-calendar',
  AvatarDoc: 'avatar',
  AlertDoc: 'alert',
  BreadcrumbDoc: 'breadcrumb',
  FormsDoc: 'forms',
  CopyToClipboardDoc: 'copy-to-clipboard',
  TooltipDoc: 'tooltip',
  PaginationDoc: 'pagination',
  TabsDoc: 'tabs',
  AccordionDoc: 'accordion',
  DropdownDoc: 'dropdown',
  ModalDoc: 'modal',
  ToastDoc: 'toast',
  TableDoc: 'table',
  IconsDoc: 'icons',
  NavbarDoc: 'navbar',
  SearchDoc: 'search',
  SettingsDoc: 'settings',
  SkeletonDoc: 'skeleton',
  SwitchDoc: 'switch',
  ThemeSwitcherDoc: 'theme-switcher',
  FontSwitcherDoc: 'font-switcher',
  SoundEffectsDoc: 'sound-effects',
  DocsSidebarDoc: 'docs-sidebar',
  DashboardDoc: 'dashboard',
  FooterDoc: 'footer',
  LabelDoc: 'label',
  InputGroupDoc: 'input-group',
  KbdDoc: 'kbd',
  SeparatorDoc: 'separator',
  AspectRatioDoc: 'aspect-ratio',
  EmptyDoc: 'empty',
  ButtonGroupDoc: 'button-group',
  CollapsibleDoc: 'collapsible',
  SliderDoc: 'slider',
  ToggleDoc: 'toggle',
  ToggleGroupDoc: 'toggle-group',
  ScrollAreaDoc: 'scroll-area',
  AlertDialogDoc: 'alert-dialog',
  SheetDoc: 'sheet',
  PopoverDoc: 'popover',
  HoverCardDoc: 'hover-card',
  ContextMenuDoc: 'context-menu',
  ResizableDoc: 'resizable',
};

const files = readdirSync(pagesDir).filter((f) => f.endsWith('Doc.svelte'));
const otherFrameworksLine = (slug) =>
  `<p><strong>Other frameworks:</strong> <a href="/docs/components/${slug}">Astro</a> · <a href="/docs/vanilla/components/${slug}">Vanilla</a> · <a href="/docs/vue/components/${slug}">Vue</a> · <a href="/docs/react/components/${slug}">React</a></p>`;
const backLink = '<p><a href="/docs/svelte/components">← Back to Svelte components</a></p>';

let changed = 0;
for (const file of files) {
  const name = file.replace('.svelte', '');
  const slug = nameToSlug[name];
  if (!slug) continue;
  const path = join(pagesDir, file);
  let content = readFileSync(path, 'utf8');
  if (content.includes('Other frameworks')) continue;
  const block = `\n  ${otherFrameworksLine(slug)}\n  ${backLink}\n`;
  // Insert before the last </section> (main content section close)
  const lastSectionClose = content.lastIndexOf('</section>');
  if (lastSectionClose === -1) continue;
  content = content.slice(0, lastSectionClose) + block + content.slice(lastSectionClose);
  writeFileSync(path, content);
  changed++;
}
console.log(`Svelte doc pages: ${changed} files updated with Other frameworks`);
