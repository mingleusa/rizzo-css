import { ResizablePaneGroup } from './ResizablePaneGroup';
import { ResizablePane } from './ResizablePane';
import { ResizableHandle } from './ResizableHandle';

export function ResizableDemo() {
  return (
    <ResizablePaneGroup direction="horizontal" style={{ minHeight: '120px' }}>
      <ResizablePane defaultSize={50}>Left pane</ResizablePane>
      <ResizableHandle />
      <ResizablePane defaultSize={50}>Right pane</ResizablePane>
    </ResizablePaneGroup>
  );
}
