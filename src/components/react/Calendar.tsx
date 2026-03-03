import type { HTMLAttributes } from 'react';
import { useState, useCallback } from 'react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function toYYYYMM(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

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

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  id?: string;
  /** Initial month as YYYY-MM (default: current month) */
  initialMonth?: string;
  /** Selected date as YYYY-MM-DD (controlled) */
  selected?: string;
  /** Callback when a date is selected (YYYY-MM-DD) */
  onSelect?: (date: string) => void;
  /** Accessible label (default: "Calendar") */
  label?: string;
  className?: string;
}

export function Calendar({
  id: idProp,
  initialMonth,
  selected: controlledSelected,
  onSelect,
  label = 'Calendar',
  className = '',
  ...rest
}: CalendarProps) {
  const id = idProp ?? `calendar-${Math.random().toString(36).slice(2, 9)}`;

  const now = new Date();
  const parseInitial = (): { year: number; month: number } => {
    if (!initialMonth) return { year: now.getFullYear(), month: now.getMonth() };
    const [y, m] = initialMonth.split('-').map(Number);
    if (!y || !m || m < 1 || m > 12) return { year: now.getFullYear(), month: now.getMonth() };
    return { year: y, month: m - 1 };
  };

  const [view, setView] = useState(parseInitial);
  const selected = controlledSelected ?? null;

  const todayStr = toYYYYMMDD(now.getFullYear(), now.getMonth(), now.getDate());
  const weeks = getMonthGrid(view.year, view.month);

  const handlePrev = useCallback(() => {
    setView((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 }));
  }, []);

  const handleNext = useCallback(() => {
    setView((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 }));
  }, []);

  const handleSelect = useCallback(
    (dateStr: string) => {
      onSelect?.(dateStr);
    },
    [onSelect]
  );

  return (
    <div className={`calendar ${className}`.trim()} id={id} role="group" aria-label={label} data-calendar {...rest}>
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
          {WEEKDAYS.map((day) => (
            <div key={day} className="calendar__weekday" role="columnheader" aria-label={day}>
              {day}
            </div>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} className="calendar__row" role="row">
            {week.map(({ day, year, month, currentMonth }, di) => {
              const dateStr = toYYYYMMDD(year, month, day);
              const isToday = dateStr === todayStr;
              const isSelected = selected === dateStr;
              return (
                <div key={di} role="gridcell">
                  <button
                    type="button"
                    className={`calendar__day ${!currentMonth ? 'calendar__day--other-month' : ''} ${isToday ? 'calendar__day--today' : ''} ${isSelected ? 'calendar__day--selected' : ''}`}
                    aria-label={`Choose ${MONTHS[month]} ${day}, ${year}`}
                    onClick={() => handleSelect(dateStr)}
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
