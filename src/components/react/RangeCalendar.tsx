import type { HTMLAttributes } from 'react';
import { useState, useCallback } from 'react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

function dateStrToMs(s: string): number | null {
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d.getTime();
}

export interface RangeCalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  id?: string;
  initialMonth?: string;
  /** Controlled range start (YYYY-MM-DD) */
  rangeStart?: string | null;
  /** Controlled range end (YYYY-MM-DD) */
  rangeEnd?: string | null;
  /** Callback when a full range is selected */
  onRangeSelect?: (start: string, end: string) => void;
  label?: string;
  className?: string;
}

export function RangeCalendar({
  id: idProp,
  initialMonth,
  rangeStart: controlledStart,
  rangeEnd: controlledEnd,
  onRangeSelect,
  label = 'Choose date range',
  className = '',
  ...rest
}: RangeCalendarProps) {
  const id = idProp ?? `range-calendar-${Math.random().toString(36).slice(2, 9)}`;

  const now = new Date();
  const parseInitial = (): { year: number; month: number } => {
    if (!initialMonth) return { year: now.getFullYear(), month: now.getMonth() };
    const [y, m] = initialMonth.split('-').map(Number);
    if (!y || !m || m < 1 || m > 12) return { year: now.getFullYear(), month: now.getMonth() };
    return { year: y, month: m - 1 };
  };

  const [view, setView] = useState(parseInitial);
  const [internalStart, setInternalStart] = useState<string | null>(null);
  const [internalEnd, setInternalEnd] = useState<string | null>(null);

  const start = controlledStart !== undefined ? controlledStart : internalStart;
  const end = controlledEnd !== undefined ? controlledEnd : internalEnd;

  const todayStr = toYYYYMMDD(now.getFullYear(), now.getMonth(), now.getDate());
  const weeks = getMonthGrid(view.year, view.month);

  const startMs = start ? dateStrToMs(start) : null;
  const endMs = end ? dateStrToMs(end) : null;
  const [minMs, maxMs] =
    startMs != null && endMs != null
      ? startMs <= endMs
        ? [startMs, endMs]
        : [endMs, startMs]
      : [null, null];

  const handlePrev = useCallback(() => {
    setView((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 }));
  }, []);

  const handleNext = useCallback(() => {
    setView((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 }));
  }, []);

  const handleDayClick = useCallback(
    (dateStr: string) => {
      if (controlledStart !== undefined && controlledEnd !== undefined) {
        onRangeSelect?.(dateStr, dateStr);
        return;
      }
      if (start === null || (start !== null && end !== null)) {
        setInternalStart(dateStr);
        setInternalEnd(null);
      } else {
        let newEnd = dateStr;
        const s = dateStrToMs(start);
        const e = dateStrToMs(dateStr);
        if (s != null && e != null && e < s) {
          setInternalEnd(start);
          newEnd = start;
          setInternalStart(dateStr);
          onRangeSelect?.(dateStr, start);
        } else {
          setInternalEnd(dateStr);
          onRangeSelect?.(start, dateStr);
        }
      }
    },
    [start, end, controlledStart, controlledEnd, onRangeSelect]
  );

  return (
    <div
      className={`calendar calendar--range ${className}`.trim()}
      id={id}
      role="group"
      aria-label={label}
      data-range-calendar
      {...rest}
    >
      <div className="calendar__header">
        <button type="button" className="calendar__prev" aria-label="Previous month" onClick={handlePrev}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div className="calendar__month" aria-live="polite">
          {MONTHS[view.month]} {view.year}
        </div>
        <button type="button" className="calendar__next" aria-label="Next month" onClick={handleNext}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="calendar__grid" role="grid" aria-label={`${MONTHS[view.month]} ${view.year}`}>
        <div className="calendar__row" role="row">
          {WEEKDAYS.map((d) => (
            <div key={d} className="calendar__weekday" role="columnheader" aria-label={d}>
              {d}
            </div>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="calendar__row" role="row">
            {week.map(({ day, year, month, currentMonth }, di) => {
              const dateStr = toYYYYMMDD(year, month, day);
              const ms = dateStrToMs(dateStr);
              const isToday = dateStr === todayStr;
              const isStart = start === dateStr;
              const isEnd = end === dateStr;
              const inRange =
                minMs != null && maxMs != null && ms != null && ms >= minMs && ms <= maxMs && !isStart && !isEnd;
              return (
                <div key={di} role="gridcell">
                  <button
                    type="button"
                    className={`calendar__day ${!currentMonth ? 'calendar__day--other-month' : ''} ${isToday ? 'calendar__day--today' : ''} ${isStart ? 'calendar__day--range-start' : ''} ${isEnd ? 'calendar__day--range-end' : ''} ${inRange ? 'calendar__day--in-range' : ''}`}
                    aria-label={`Choose ${MONTHS[month]} ${day}, ${year}`}
                    onClick={() => handleDayClick(dateStr)}
                  >
                    {day}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RangeCalendar;
