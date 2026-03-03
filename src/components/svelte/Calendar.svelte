<script lang="ts">
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  interface Props {
    id?: string;
    initialMonth?: string;
    selected?: string;
    label?: string;
    class?: string;
  }

  let {
    id: calendarId,
    initialMonth,
    selected,
    label = 'Calendar',
    class: className = '',
    onSelect,
  }: Props & { onSelect?: (date: string) => void } = $props();

  const id = $derived(calendarId ?? `calendar-${Math.random().toString(36).slice(2, 9)}`);
  const now = new Date();

  function parseInitial(): { year: number; month: number } {
    if (!initialMonth) return { year: now.getFullYear(), month: now.getMonth() };
    const [y, m] = initialMonth.split('-').map(Number);
    if (!y || !m || m < 1 || m > 12) return { year: now.getFullYear(), month: now.getMonth() };
    return { year: y, month: m - 1 };
  }

  let view = $state(parseInitial());

  function toYYYYMMDD(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function getMonthGrid(year: number, month: number): { day: number; year: number; month: number; currentMonth: boolean }[][] {
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const startDay = first.getDay();
    const daysInMonth = last.getDate();
    const weeks: { day: number; year: number; month: number; currentMonth: boolean }[][] = [];
    let week: { day: number; year: number; month: number; currentMonth: boolean }[] = [];
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevLast = new Date(prevYear, prevMonth + 1, 0).getDate();
    for (let i = 0; i < startDay; i++) {
      week.push({ day: prevLast - startDay + i + 1, year: prevYear, month: prevMonth, currentMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      week.push({ day: d, year, month, currentMonth: true });
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    for (let i = 1; week.length < 7; i++) {
      week.push({ day: i, year: nextYear, month: nextMonth, currentMonth: false });
    }
    weeks.push(week);
    return weeks;
  }

  const todayStr = $derived(toYYYYMMDD(now.getFullYear(), now.getMonth(), now.getDate()));
  const weeks = $derived(getMonthGrid(view.year, view.month));
  const monthLabel = $derived(`${MONTHS[view.month]} ${view.year}`);

  function prevMonth() {
    view = view.month === 0 ? { year: view.year - 1, month: 11 } : { year: view.year, month: view.month - 1 };
  }

  function nextMonth() {
    view = view.month === 11 ? { year: view.year + 1, month: 0 } : { year: view.year, month: view.month + 1 };
  }

  function select(dateStr: string) {
    onSelect?.(dateStr);
  }
</script>

<div class="calendar {className}" {id} role="group" aria-label={label} data-calendar>
  <div class="calendar__header">
    <button type="button" class="calendar__prev" aria-label="Previous month" onclick={prevMonth}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
    </button>
    <div class="calendar__month" aria-live="polite">{monthLabel}</div>
    <button type="button" class="calendar__next" aria-label="Next month" onclick={nextMonth}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  </div>
  <div class="calendar__grid" role="grid" aria-label={monthLabel}>
    <div class="calendar__row" role="row">
      {#each WEEKDAYS as day}
        <div class="calendar__weekday" role="columnheader" aria-label={day}>{day}</div>
      {/each}
    </div>
    {#each weeks as week}
      <div class="calendar__row" role="row">
        {#each week as cell}
          {@const dateStr = toYYYYMMDD(cell.year, cell.month, cell.day)}
          <div role="gridcell">
            <button
              type="button"
              class="calendar__day
                {!cell.currentMonth ? ' calendar__day--other-month' : ''}
                {dateStr === todayStr ? ' calendar__day--today' : ''}
                {(selected ?? '') === dateStr ? ' calendar__day--selected' : ''}"
              aria-label="Choose {MONTHS[cell.month]} {cell.day}, {cell.year}"
              onclick={() => select(dateStr)}
            >
              {cell.day}
            </button>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
