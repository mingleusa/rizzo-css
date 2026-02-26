import { useState } from 'react';
import { Switch } from './Switch';

export function SwitchDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      label="Enable notifications"
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}
