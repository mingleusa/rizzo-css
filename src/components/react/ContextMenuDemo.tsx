import { ContextMenu } from './ContextMenu';

export function ContextMenuDemo() {
  return (
    <ContextMenu trigger={<span style={{ padding: 'var(--spacing-2)', border: '1px solid var(--border)', cursor: 'context-menu' }}>Right-click here</span>}>
      <div className="dropdown__item" role="menuitem">Copy</div>
      <div className="dropdown__item" role="menuitem">Paste</div>
      <div className="dropdown__separator" role="separator" />
      <div className="dropdown__item" role="menuitem">Delete</div>
    </ContextMenu>
  );
}
