import { useState } from 'react';
import { Slider } from './Slider';

/** Wrapper for doc demo: Slider with controlled value. */
export function SliderDemo() {
  const [value, setValue] = useState(50);
  return (
    <Slider
      min={0}
      max={100}
      value={value}
      onValueChange={setValue}
      ariaLabel="Volume"
    />
  );
}
