import { ResizablePaneGroup } from './ResizablePaneGroup';
import { ResizablePane } from './ResizablePane';
import { ResizableHandle } from './ResizableHandle';

export function ResizableDemo() {
  return (
    <ResizablePaneGroup direction="horizontal" style={{ minHeight: '200px', maxWidth: '28rem', borderRadius: 'var(--radius-lg)', border: 'var(--border-width) solid var(--border)' }}>
      <ResizablePane defaultSize={50}>
        <div style={{ display: 'flex', height: '200px', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-6)' }}><span style={{ fontWeight: 600 }}>One</span></div>
      </ResizablePane>
      <ResizableHandle />
      <ResizablePane defaultSize={50}>
        <div style={{ display: 'flex', height: '200px', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-6)' }}><span style={{ fontWeight: 600 }}>Two</span></div>
      </ResizablePane>
    </ResizablePaneGroup>
  );
}
