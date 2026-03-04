<script setup lang="ts">
import { ref, computed } from 'vue';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const props = withDefaults(
  defineProps<{
    id?: string;
    initialMonth?: string;
    rangeStart?: string | null;
    rangeEnd?: string | null;
    label?: string;
    class?: string;
  }>(),
  { label: 'Choose date range', class: '' }
);

const emit = defineEmits<{ (e: 'rangeSelect', payload: { start: string; end: string }): void }>();

const id = computed(() => props.id ?? `range-calendar-${Math.random().toString(36).slice(2, 9)}`);
const rootClass = computed(() => ['calendar', 'calendar--range', props.class].filter(Boolean).join(' '));

const now = new Date();
function parseInitial(): { year: number; month: number } {
  if (!props.initialMonth) return { year: now.getFullYear(), month: now.getMonth() };
  const [y, m] = props.initialMonth.split('-').map(Number);
  if (!y || !m || m < 1 || m > 12) return { year: now.getFullYear(), month: now.getMonth() };
  return { year: y, month: m - 1 };
}

const view = ref(parseInitial());
const internalStart = ref<string | null>(null);
const internalEnd = ref<string | null>(null);

const start = computed(() => (props.rangeStart !== undefined ? props.rangeStart : internalStart.value));
const end = computed(() => (props.rangeEnd !== undefined ? props.rangeEnd : internalEnd.value));

function toYYYYMMDD(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function dateStrToMs(s: string): number | null {
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d.getTime();
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

const todayStr = computed(() => toYYYYMMDD(now.getFullYear(), now.getMonth(), now.getDate()));
const weeks = computed(() => getMonthGrid(view.value.year, view.value.month));
const monthLabel = computed(() => `${MONTHS[view.value.month]} ${view.value.year}`);

const startMs = computed(() => (start.value ? dateStrToMs(start.value) : null));
const endMs = computed(() => (end.value ? dateStrToMs(end.value) : null));
const minMax = computed(() => {
  const s = startMs.value;
  const e = endMs.value;
  if (s == null || e == null) return [null, null];
  return s <= e ? [s, e] : [e, s];
});

function prevMonth() {
  view.value = view.value.month === 0 ? { year: view.value.year - 1, month: 11 } : { year: view.value.year, month: view.value.month - 1 };
}

function nextMonth() {
  view.value = view.value.month === 11 ? { year: view.value.year + 1, month: 0 } : { year: view.value.year, month: view.value.month + 1 };
}

function isInRange(dateStr: string): boolean {
  const [minMs, maxMs] = minMax.value;
  if (minMs == null || maxMs == null) return false;
  const ms = dateStrToMs(dateStr);
  if (ms == null) return false;
  const isStart = start.value === dateStr;
  const isEnd = end.value === dateStr;
  return ms >= minMs && ms <= maxMs && !isStart && !isEnd;
}

function onDayClick(dateStr: string) {
  if (props.rangeStart !== undefined && props.rangeEnd !== undefined) return;
  if (start.value === null || (start.value !== null && end.value !== null)) {
    internalStart.value = dateStr;
    internalEnd.value = null;
  } else {
    const s = dateStrToMs(start.value!);
    const e = dateStrToMs(dateStr);
    if (s != null && e != null && e < s) {
      internalEnd.value = start.value;
      internalStart.value = dateStr;
      emit('rangeSelect', { start: dateStr, end: start.value! });
    } else {
      internalEnd.value = dateStr;
      emit('rangeSelect', { start: start.value!, end: dateStr });
    }
  }
}
</script>

<template>
  <div :id="id" :class="rootClass" role="group" :aria-label="label" data-range-calendar>
    <div class="calendar__header">
      <button type="button" class="calendar__prev" aria-label="Previous month" @click="prevMonth">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <div class="calendar__month" aria-live="polite">{{ monthLabel }}</div>
      <button type="button" class="calendar__next" aria-label="Next month" @click="nextMonth">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
    <div class="calendar__grid" role="grid" :aria-label="monthLabel">
      <div class="calendar__row" role="row">
        <div v-for="day in WEEKDAYS" :key="day" class="calendar__weekday" role="columnheader" :aria-label="day">{{ day }}</div>
      </div>
      <div v-for="(week, wi) in weeks" :key="wi" class="calendar__row" role="row">
        <div v-for="(cell, di) in week" :key="di" role="gridcell">
          <button
            type="button"
            :class="[
              'calendar__day',
              !cell.currentMonth && 'calendar__day--other-month',
              toYYYYMMDD(cell.year, cell.month, cell.day) === todayStr && 'calendar__day--today',
              start === toYYYYMMDD(cell.year, cell.month, cell.day) && 'calendar__day--range-start',
              end === toYYYYMMDD(cell.year, cell.month, cell.day) && 'calendar__day--range-end',
              isInRange(toYYYYMMDD(cell.year, cell.month, cell.day)) && 'calendar__day--in-range',
            ]"
            :aria-label="`Choose ${MONTHS[cell.month]} ${cell.day}, ${cell.year}`"
            @click="onDayClick(toYYYYMMDD(cell.year, cell.month, cell.day))"
          >
            {{ cell.day }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
