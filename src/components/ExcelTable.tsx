import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronLeft, ChevronRight, ChevronFirst, ChevronLast, Search, Filter } from 'lucide-react';

interface ExcelTableProps<T extends object> {
  id: string;
  data: T[];
  columns: ColumnDef<T, any>[];
  stickyFirstColumn?: boolean;
  globalFilterPlaceholder?: string;
}

export function ExcelTable<T extends object>({
  id,
  data,
  columns,
  stickyFirstColumn = false,
  globalFilterPlaceholder = 'Search entire sheet...',
}: ExcelTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  // Unique lists of values for individual column filters if needed
  return (
    <div className="flex flex-col h-full bg-white text-xs font-sans text-gray-800" id={`excel-table-container-${id}`}>
      {/* Search & Utility Bar */}
      <div className="flex flex-wrap items-center justify-between px-3 py-2 border-b border-gray-200 bg-slate-50 gap-2" id={`excel-bar-${id}`}>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-gray-400">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 pr-3 py-1 text-xs font-mono border border-gray-300 rounded bg-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64 transition-all"
              placeholder={globalFilterPlaceholder}
              id={`excel-search-${id}`}
            />
          </div>
          {columnFilters.length > 0 && (
            <button
              onClick={() => setColumnFilters([])}
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline px-2 py-1 font-mono"
            >
              Clear Column Filters ({columnFilters.length})
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-500">
          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 font-semibold uppercase">
            TanStack Table v9
          </span>
          <span>â€¢</span>
          <span>Total Rows: {data.length}</span>
          <span>â€¢</span>
          <span>Filtered: {table.getFilteredRowModel().rows.length}</span>
        </div>
      </div>

      {/* Spreadsheet Grid Container */}
      <div className="overflow-auto relative border-b border-gray-200 max-h-[500px]" style={{ scrollbarWidth: 'thin' }}>
        <table className="w-full border-collapse text-left table-fixed" style={{ minWidth: '850px' }}>
          {/* Header Row */}
          <thead className="sticky top-0 z-10 bg-slate-100 dark:bg-slate-800 shadow-[0_1px_0_0_rgba(226,232,240,1)] dark:shadow-[0_1px_0_0_rgba(51,65,85,1)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="divide-x divide-gray-200">
                {headerGroup.headers.map((header, colIndex) => {
                  const isFirstColSticky = stickyFirstColumn && colIndex === 0;
                  return (
                    <th
                      key={header.id}
                      className={`px-3 py-2 text-gray-600 font-semibold tracking-wider select-none align-middle relative border-b border-gray-200 text-[11px] ${
                        isFirstColSticky 
                          ? 'sticky left-0 bg-slate-100 dark:bg-slate-800 z-20 shadow-[1px_0_0_0_rgba(226,232,240,1)] dark:shadow-[1px_0_0_0_rgba(51,65,85,1)]' 
                          : ''
                      }`}
                      style={{ width: header.getSize() ? `${header.getSize()}px` : 'auto' }}
                    >
                      <div className="flex items-center justify-between gap-1.5 group">
                        {/* Title & Click to Sort */}
                        <div
                          className={`flex items-center gap-1 cursor-pointer hover:text-gray-900 flex-1 truncate`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span className="truncate">
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </span>
                          {header.column.getCanSort() && (
                            <ArrowUpDown className="w-3 h-3 text-gray-400 group-hover:text-gray-600 shrink-0" />
                          )}
                        </div>
                      </div>

                      {/* Header Column Filter Field */}
                      {header.column.getCanFilter() ? (
                        <div className="mt-1 flex items-center relative">
                          <input
                            type="text"
                            value={(header.column.getFilterValue() as string) ?? ''}
                            onChange={(e) => header.column.setFilterValue(e.target.value)}
                            placeholder="Filter..."
                            className="w-full px-1.5 py-0.5 text-[10px] font-mono border border-gray-200 rounded focus:outline-none focus:border-blue-400 bg-white"
                          />
                        </div>
                      ) : null}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* Data Rows */}
          <tbody className="divide-y divide-gray-100 bg-white">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={`divide-x divide-gray-100 hover:bg-blue-50/40 transition-colors ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                  }`}
                >
                  {row.getVisibleCells().map((cell, colIndex) => {
                    const isFirstColSticky = stickyFirstColumn && colIndex === 0;
                    return (
                      <td
                        key={cell.id}
                        className={`px-3 py-1.5 text-gray-700 truncate align-middle border-b border-gray-100 font-mono text-[11px] ${
                          isFirstColSticky
                            ? `sticky left-0 z-10 shadow-[1px_0_0_0_rgba(226,232,240,1)] dark:shadow-[1px_0_0_0_rgba(51,65,85,1)] ${
                                rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                              } group-hover:bg-blue-50/40`
                            : ''
                        }`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-400 font-mono bg-white"
                >
                  No records match the current sheet filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Spreadsheet Status & Pagination */}
      <div className="flex flex-wrap items-center justify-between px-3 py-2 border-t border-gray-200 bg-slate-50 gap-2" id={`excel-pagination-${id}`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-gray-500 font-mono text-[10px]">Rows per page:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="bg-white border border-gray-300 rounded text-[11px] font-mono px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {[10, 20, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <span className="text-gray-500 font-mono text-[10px]">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} records
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="p-1 text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:hover:text-gray-500 rounded border border-gray-200 bg-white cursor-pointer"
            title="First Page"
          >
            <ChevronFirst className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1 text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:hover:text-gray-500 rounded border border-gray-200 bg-white cursor-pointer"
            title="Previous Page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <span className="text-gray-600 font-mono text-[11px] px-2">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1 text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:hover:text-gray-500 rounded border border-gray-200 bg-white cursor-pointer"
            title="Next Page"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="p-1 text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:hover:text-gray-500 rounded border border-gray-200 bg-white cursor-pointer"
            title="Last Page"
          >
            <ChevronLast className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}