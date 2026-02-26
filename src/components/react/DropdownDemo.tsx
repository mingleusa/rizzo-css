import { Dropdown } from './Dropdown';

export function DropdownDemo() {
  return (
    <Dropdown
      trigger="Actions"
      items={[
        { label: 'Edit', onClick: (v) => console.log(v) },
        { label: 'Duplicate' },
        { separator: true },
        {
          label: 'More',
          submenu: [
            { label: 'Option A', onClick: () => {} },
            { label: 'Option B', onClick: () => {} },
          ],
        },
      ]}
    />
  );
}
