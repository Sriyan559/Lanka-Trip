'use client';

import React from 'react';
import { Search, Bookmark, Columns, SlidersHorizontal } from 'lucide-react';
import { ReportFilterParams } from '@/types/reportsAudit';

interface ReportFiltersWorkspaceProps {
  filters: ReportFilterParams;
  onFilterChange: (key: keyof ReportFilterParams, value: string) => void;
  onClearAll: () => void;
  onSaveView?: () => void;
  onColumns?: () => void;
  onMoreFilters?: () => void;
}

export function ReportFiltersWorkspace({
  filters,
  onFilterChange,
  onClearAll,
  onSaveView,
  onColumns,
  onMoreFilters,
}: ReportFiltersWorkspaceProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs space-y-2 text-xs">
      {/* Row 1 */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative min-w-[200px] flex-1 max-w-xs">
            <Search size={13} className="absolute left-2 top-2 text-slate-400" />
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search reports by name..."
              className="w-full bg-slate-50 border border-slate-200 rounded pl-7 pr-2 py-1 text-slate-800 text-[11px] focus:bg-white focus:outline-none"
            />
          </div>

          <select
            value={filters.reportType || 'All Types'}
            onChange={(e) => onFilterChange('reportType', e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium text-[11px]"
          >
            <option value="All Types">Report Type: All</option>
            <option value="Dashboard">Dashboard</option>
            <option value="Operational">Operational</option>
            <option value="SLA">SLA</option>
            <option value="Analytical">Analytical</option>
            <option value="Knowledge">Knowledge</option>
            <option value="Compliance">Compliance</option>
          </select>

          <select
            value={filters.domain || 'All Domains'}
            onChange={(e) => onFilterChange('domain', e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium text-[11px]"
          >
            <option value="All Domains">Support Domain: All</option>
            <option value="Workforce">Workforce</option>
            <option value="Cases & Queues">Cases &amp; Queues</option>
            <option value="SLA & Routing">SLA &amp; Routing</option>
            <option value="Complaints">Complaints</option>
          </select>

          <select
            value={filters.createdUser || 'All Users'}
            onChange={(e) => onFilterChange('createdUser', e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium text-[11px]"
          >
            <option value="All Users">Created By: All</option>
            <option value="System">System</option>
            <option value="Admin">Admin</option>
          </select>

          <select
            value={filters.executionStatus || 'All Statuses'}
            onChange={(e) => onFilterChange('executionStatus', e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium text-[11px]"
          >
            <option value="All Statuses">Execution Status: All</option>
            <option value="Active">Active</option>
            <option value="Warning">Warning</option>
            <option value="Failed">Failed</option>
          </select>

          <select
            value={filters.priority || 'All Priorities'}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium text-[11px]"
          >
            <option value="All Priorities">Priority: All</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
          </select>

          <input
            type="text"
            readOnly
            value="Jul 1 – Jul 22, 2026"
            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium text-[11px] w-36 text-center cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onClearAll}
            className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 text-[10px]"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={onSaveView}
            className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 flex items-center gap-1 text-[10px]"
          >
            <Bookmark size={11} className="text-slate-500" />
            Save View
          </button>
          <button
            type="button"
            onClick={onColumns}
            className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 flex items-center gap-1 text-[10px]"
          >
            <Columns size={11} className="text-slate-500" />
            Columns
          </button>
          <button
            type="button"
            onClick={onMoreFilters}
            className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 flex items-center gap-1 text-[10px]"
          >
            <SlidersHorizontal size={11} className="text-slate-500" />
            More Filters
          </button>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-[10px]">
        <div className="flex flex-wrap items-center gap-2">
          <select className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 font-medium">
            <option>Delivery Destination v</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 font-medium">
            <option>Transfer Type v</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 font-medium">
            <option>Audit Event Type v</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 font-medium">
            <option>Actor v</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 font-medium">
            <option>Severity v</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 font-medium">
            <option>Business Unit v</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
          <span className="font-semibold text-slate-500">Quick Dates:</span>
          <button type="button" className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium">Jul 22, 2026</button>
          <button type="button" className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium">Jul 15, 2026</button>
          <button type="button" className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium">Jul 8, 2026</button>
          <button type="button" className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-medium">Jul 1, 2026</button>
        </div>
      </div>
    </div>
  );
}
