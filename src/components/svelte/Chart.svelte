<script lang="ts">
  interface ChartDataItem {
    label: string;
    value: number;
  }

  interface Props {
    data?: ChartDataItem[];
    class?: string;
  }

  let {
    data = [
      { label: 'A', value: 40 },
      { label: 'B', value: 65 },
      { label: 'C', value: 30 },
    ],
    class: className = '',
  }: Props = $props();

  const max = $derived(Math.max(1, ...data.map((d) => d.value)));
  const ariaLabel = $derived(`Bar chart: ${data.map((d) => `${d.label} ${d.value}`).join(', ')}`);
</script>

<div class="chart {className}" role="img" aria-label={ariaLabel}>
  <div class="chart__bars">
    {#each data as d (d.label)}
      <div class="chart__bar-wrap">
        <div class="chart__bar" style="height: {(d.value / max) * 100}%" />
        <span class="chart__label">{d.label}</span>
      </div>
    {/each}
  </div>
</div>
