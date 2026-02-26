import { Tooltip } from './Tooltip';

/** Wrapper for doc demo: trigger button + tooltip (tooltip appears on hover via CSS). */
export function TooltipDemo() {
  const id = 'tooltip-demo-1';
  return (
    <span className="tooltip-host" data-tooltip="Tooltip text">
      <button type="button" aria-describedby={id}>
        Hover me
      </button>
      <Tooltip id={id} text="Tooltip text" position="top" />
    </span>
  );
}
