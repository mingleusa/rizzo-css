import { useState } from 'react';
import { Switch } from './Switch';

export function SoundEffects() {
  const [on, setOn] = useState(false);
  return (
    <div className="sound-effects" data-sound-effects>
      <Switch
        label="Sound on click"
        checked={on}
        onCheckedChange={setOn}
      />
    </div>
  );
}
