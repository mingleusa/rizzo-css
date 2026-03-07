import { Dropdown } from './Dropdown';

export function DropdownDemo() {
  return (
    <Dropdown
      trigger="Actions"
      items={[
        { label: 'Edit', href: '#' },
        { label: 'Duplicate', href: '#' },
        { separator: true },
        { label: 'More', href: '#' },
      ]}
    />
  );
}
