<script lang="ts">
  import Alert from '../../Alert.svelte';
  import CodeBlock from '../CodeBlock.svelte';
  import AddComponentTabs from '../AddComponentTabs.svelte';

  type AlertItem = { id: string; variant: 'success' | 'error' | 'warning' | 'info'; message: string; dismissible: boolean; autoDismiss?: number };
  let liveAlerts = $state<AlertItem[]>([]);
  let autoDismissAlerts = $state<AlertItem[]>([]);

  function showAlert(variant: AlertItem['variant'], message: string, dismissible = true, autoDismiss = 0, target: 'live' | 'auto' = 'live') {
    const item: AlertItem = {
      id: crypto.randomUUID(),
      variant,
      message,
      dismissible,
      ...(autoDismiss > 0 ? { autoDismiss } : {}),
    };
    if (target === 'auto') autoDismissAlerts = [...autoDismissAlerts, item];
    else liveAlerts = [...liveAlerts, item];
  }

  function removeLive(id: string) {
    liveAlerts = liveAlerts.filter((a) => a.id !== id);
  }
  function removeAutoDismiss(id: string) {
    autoDismissAlerts = autoDismissAlerts.filter((a) => a.id !== id);
  }

  const msgAuto3 = 'This alert will auto-dismiss in 3 seconds';
  const msgAuto5 = 'This alert will auto-dismiss in 5 seconds';
  const msgAuto7 = 'This alert will auto-dismiss in 7 seconds';
</script>

<section>
  <h2>Alert component</h2>
  <p>Variants: success, error, warning, info. Optional dismissible and auto-dismiss.</p>
  <AddComponentTabs componentName="Alert" />

  <h3>Variants (show on click)</h3>
  <p>Click the buttons below to see each variant in action:</p>
  <div class="example">
    <div class="example-title">Live examples</div>
    <div class="example-buttons">
      <button type="button" class="btn btn-success" onclick={() => showAlert('success', 'Success! Your changes have been saved successfully.')}>Show Success Alert</button>
      <button type="button" class="btn btn-error" onclick={() => showAlert('error', 'Error! Something went wrong. Please try again.')}>Show Error Alert</button>
      <button type="button" class="btn btn-warning" onclick={() => showAlert('warning', 'Warning! This action cannot be undone.')}>Show Warning Alert</button>
      <button type="button" class="btn btn-info" onclick={() => showAlert('info', 'Info: New features are available in the latest update.')}>Show Info Alert</button>
    </div>
    <div class="example-stack example-alert-container">
      {#each liveAlerts as item (item.id)}
        <Alert variant={item.variant} dismissible={item.dismissible} autoDismiss={item.autoDismiss} onDismiss={() => removeLive(item.id)}>
          {item.message}
        </Alert>
      {/each}
    </div>
  </div>

  <h3>Auto-dismiss</h3>
  <p>Alerts can automatically dismiss after a set duration:</p>
  <div class="example">
    <div class="example-title">Auto-dismiss examples</div>
    <div class="example-buttons">
      <button type="button" class="btn btn-primary" onclick={() => showAlert('success', msgAuto3, true, 3000, 'auto')}>3 second</button>
      <button type="button" class="btn btn-primary" onclick={() => showAlert('info', msgAuto5, true, 5000, 'auto')}>5 second</button>
      <button type="button" class="btn btn-primary" onclick={() => showAlert('warning', msgAuto7, true, 7000, 'auto')}>7 second</button>
    </div>
    <div class="example-stack example-alert-container">
      {#each autoDismissAlerts as item (item.id)}
        <Alert variant={item.variant} dismissible={item.dismissible} autoDismiss={item.autoDismiss} onDismiss={() => removeAutoDismiss(item.id)}>
          {item.message}
        </Alert>
      {/each}
    </div>
  </div>

  <h3>Static examples</h3>
  <div class="example">
    <div class="example-title">Inline alerts</div>
    <div class="example-stack">
      <Alert variant="success">Success message.</Alert>
      <Alert variant="error">Error message.</Alert>
      <Alert variant="warning">Warning message.</Alert>
      <Alert variant="info" dismissible>Dismissible info alert.</Alert>
    </div>
  </div>

  <h3>Usage</h3>
  <CodeBlock
    code={`<script>
  import Alert from './components/svelte/Alert.svelte';
</script>

<Alert variant="success">Saved.</Alert>
<Alert variant="error" dismissible>Something went wrong.</Alert>
<Alert variant="info" autoDismiss={5000}>Auto-dismiss in 5s.</Alert>`}
    language="svelte"
  />
</section>

<style>
  .example-stack {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
  }
  .example-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-4);
  }
  .example-alert-container {
    min-height: 1px;
    margin-top: var(--spacing-4);
  }
</style>
