import { useState } from 'react';
import { Toggle } from './Toggle';

export function ToggleDemo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
      <Toggle pressed={bold} onPressedChange={setBold} aria-label="Toggle bold">
        Bold
      </Toggle>
      <Toggle pressed={italic} onPressedChange={setItalic} aria-label="Toggle italic">
        Italic
      </Toggle>
      <Toggle pressed={underline} onPressedChange={setUnderline} aria-label="Toggle underline">
        Underline
      </Toggle>
    </div>
  );
}
