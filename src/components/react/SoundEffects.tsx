import { useState } from 'react';
import { Switch } from './Switch';

export function SoundEffects() {
  const [on, setOn] = useState(false);
  return (
    <div className="sound-effects" data-sound-effects>
      <Switch
        label="Play sound on click"
        checked={on}
        onCheckedChange={setOn}
      />
    </div>
  );
}
