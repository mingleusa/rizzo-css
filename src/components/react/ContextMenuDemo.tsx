import { ContextMenu } from './ContextMenu';

export function ContextMenuDemo() {
  return (
    <ContextMenu trigger={<span style={{ padding: 'var(--spacing-2)', border: '1px solid var(--border)', cursor: 'context-menu' }}>Right-click</span>}>
      <div className="context-menu__item">Edit</div>
      <div className="context-menu__separator" role="separator" />
      <div className="context-menu__item">Delete</div>
    </ContextMenu>
  );
}
