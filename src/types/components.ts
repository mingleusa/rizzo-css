/**
 * Shared component data types and props interfaces.
 * Used by Astro and Svelte components so markup and APIs stay consistent.
 */

/** Single tab in Tabs component. */
export interface Tab {
  id: string;
  label: string;
  icon?: string;
  content?: string;
}

/** Single item in Dropdown / menu. */
export interface MenuItem {
  label: string;
  value?: string;
  href?: string;
  onClick?: string;
  disabled?: boolean;
  separator?: boolean;
  submenu?: MenuItem[];
}

/** Single item in Breadcrumb. */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** Column definition for Table. */
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

/** Single item in Accordion. */
export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

/** Link in Footer. */
export interface FooterLink {
  label: string;
  href: string;
}

/** Button variant. */
export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'outline';

/** Button props (shared shape for Astro/Svelte). */
export interface ButtonProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
}

/** Badge variant. */
export type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';

/** Badge size. */
export type BadgeSize = 'sm' | 'md' | 'lg';

/** Badge props. */
export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  class?: string;
}

/** Card variant. */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

/** Card props. */
export interface CardProps {
  variant?: CardVariant;
  class?: string;
}

/** Alert variant. */
export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

/** Alert props. */
export interface AlertProps {
  variant?: AlertVariant;
  dismissible?: boolean;
  autoDismiss?: number;
  class?: string;
}
