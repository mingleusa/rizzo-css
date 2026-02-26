import type { HTMLAttributes } from 'react';
import { useState, useMemo } from 'react';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'string' | 'number';
}

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  columns: TableColumn[];
  data: Record<string, string | number>[];
  caption?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterPlaceholder?: string;
  striped?: boolean;
  className?: string;
}

export function Table({
  columns,
  data,
  caption,
  sortable = true,
  filterable = false,
  filterPlaceholder = 'Filter table…',
  striped = true,
  className = '',
  ...rest
}: TableProps) {
  const tableId = `table-${Math.random().toString(36).slice(2, 11)}`;
  const [sortColumnIndex, setSortColumnIndex] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');
  const [filterQuery, setFilterQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!filterable || !filterQuery.trim()) return data;
    const q = filterQuery.trim().toLowerCase();
    return data.filter((row) =>
      columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(q))
    );
  }, [data, columns, filterable, filterQuery]);

  const sortedData = useMemo(() => {
    if (!sortable || sortColumnIndex === null) return filteredData;
    const col = columns[sortColumnIndex];
    const type = col?.type ?? 'string';
    const dir = sortDirection === 'ascending' ? 1 : -1;
    return [...filteredData].sort((a, b) => {
      const aVal = a[col.key];
      const bVal = b[col.key];
      if (type === 'number') {
        const aNum = parseFloat(String(aVal).replace(/[^0-9.-]/g, '')) || 0;
        const bNum = parseFloat(String(bVal).replace(/[^0-9.-]/g, '')) || 0;
        return dir * (aNum - bNum);
      }
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return dir * cmp;
    });
  }, [filteredData, columns, sortable, sortColumnIndex, sortDirection]);

  function getSortState(colIndex: number): 'none' | 'ascending' | 'descending' {
    if (sortColumnIndex !== colIndex) return 'none';
    return sortDirection;
  }

  function handleSort(colIndex: number) {
    if (sortColumnIndex === colIndex) {
      setSortDirection((d) => (d === 'ascending' ? 'descending' : 'ascending'));
    } else {
      setSortColumnIndex(colIndex);
      setSortDirection('ascending');
    }
  }

  const classes = [
    'table',
    striped ? 'table--striped' : '',
    sortable ? 'table--sortable' : '',
    filterable ? 'table--filterable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  return (
    <div
      className={classes}
      data-table-id={tableId}
      data-table-sortable={sortable ? 'true' : undefined}
      data-table-filterable={filterable ? 'true' : undefined}
      {...rest}
    >
      {filterable && (
        <div className="table__filter-wrap">
          <label htmlFor={`${tableId}-filter`} className="sr-only">
            Filter table
          </label>
          <span className="table__filter-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="table__filter-icon-svg icon" aria-hidden="true">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
          </span>
          <input
            type="search"
            id={`${tableId}-filter`}
            className="table__filter"
            placeholder={filterPlaceholder}
            aria-controls={tableId}
            data-table-filter
            autoComplete="off"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>
      )}
      <div className="table__wrapper">
        <table className="table__table" id={tableId}>
          {caption && <caption className="table__caption">{caption}</caption>}
          <thead className="table__head">
            <tr className="table__row">
              {columns.map((col, i) => {
                const canSort = sortable && col.sortable !== false;
                return (
                  <th
                    key={col.key}
                    className="table__cell table__cell--head"
                    scope="col"
                    data-column-index={i}
                    data-sortable={canSort ? 'true' : undefined}
                    data-type={col.type ?? 'string'}
                    aria-sort={canSort ? getSortState(i) : undefined}
                  >
                    {canSort ? (
                      <button
                        type="button"
                        className="table__sort-trigger"
                        data-column-index={i}
                        aria-label={`Sort by ${col.label}`}
                        onClick={() => handleSort(i)}
                      >
                        <span className="table__cell-content">{col.label}</span>
                        <span className="table__sort-icon" aria-hidden="true">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="table__sort-icon-svg icon" aria-hidden="true">
                            <path d="m7 15 5 5 5-5" />
                            <path d="m7 9 5-5 5 5" />
                          </svg>
                        </span>
                      </button>
                    ) : (
                      <span className="table__cell-content">{col.label}</span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="table__body">
            {sortedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="table__row" data-row-index={rowIndex}>
                {columns.map((col) => (
                  <td key={col.key} className="table__cell" data-column-key={col.key}>
                    {row[col.key] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
