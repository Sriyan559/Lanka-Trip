'use client';

import React from 'react';
import { RefreshCw, Bookmark, SlidersHorizontal } from 'lucide-react';
import { SatisfactionQaFilterParams } from '@/types/satisfactionQa';

interface QaFiltersWorkspaceProps {
  filters: SatisfactionQaFilterParams;
  onFilterChange: (key: keyof SatisfactionQaFilterParams, value: string) => void;
  onClearAll: () => void;
  onSaveView?: () => void;
  onRefresh?: () => void;
  onMoreFilters?: () => void;
}

export function QaFiltersWorkspace({
  filters,
  onFilterChange,
  onClearAll,
  onSaveView,
  onRefresh,
  onMoreFilters,
}: QaFiltersWorkspaceProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-2 shadow-2xs space-y-2 text-xs">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Team</label>
          <select
            value={filters.team || 'All'}
            onChange={(e) => onFilterChange('team', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Customer Operations">Customer Operations</option>
            <option value="Order & Delivery">Order &amp; Delivery</option>
            <option value="Returns & Refunds">Returns &amp; Refunds</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Agent</label>
          <select
            value={filters.agent || 'All'}
            onChange={(e) => onFilterChange('agent', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="J. Patel">J. Patel</option>
            <option value="K. Fernando">K. Fernando</option>
            <option value="R. Rajakaruna">R. Rajakaruna</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Queue</label>
          <select
            value={filters.queue || 'All'}
            onChange={(e) => onFilterChange('queue', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Order Tracking">Order Tracking</option>
            <option value="Refund Request">Refund Request</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Channel</label>
          <select
            value={filters.channel || 'All'}
            onChange={(e) => onFilterChange('channel', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Chat">Chat</option>
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Support Category</label>
          <select
            value={filters.category || 'All'}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Delivery">Delivery</option>
            <option value="Returns">Returns</option>
            <option value="Payments">Payments</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">QA Status</label>
          <select
            value={filters.qaStatus || 'All'}
            onChange={(e) => onFilterChange('qaStatus', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Passed">Passed</option>
            <option value="Needs Attention">Needs Attention</option>
            <option value="Review Due">Review Due</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Defect Severity</label>
          <select
            value={filters.severity || 'All'}
            onChange={(e) => onFilterChange('severity', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">CSAT Band</label>
          <select
            value={filters.csatBand || 'All'}
            onChange={(e) => onFilterChange('csatBand', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Low CSAT (1-2)">Low CSAT (1-2)</option>
            <option value="Neutral (3)">Neutral (3)</option>
            <option value="Positive (4-5)">Positive (4-5)</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Customer Effort</label>
          <select
            value={filters.effort || 'All'}
            onChange={(e) => onFilterChange('effort', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-800 font-medium focus:bg-white text-[11px]"
          >
            <option value="All">All</option>
            <option value="Difficult">Difficult</option>
            <option value="Easy">Easy</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-slate-100">
        <button
          type="button"
          onClick={onClearAll}
          className="px-2.5 py-0.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 text-[10px]"
        >
          Clear All
        </button>
        <button
          type="button"
          onClick={onSaveView}
          className="px-2.5 py-0.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 flex items-center gap-1 text-[10px]"
        >
          <Bookmark size={11} className="text-slate-500" />
          Save View
        </button>
        <button
          type="button"
          onClick={onRefresh}
          className="px-2.5 py-0.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 flex items-center gap-1 text-[10px]"
        >
          <RefreshCw size={11} className="text-slate-500" />
          Refresh
        </button>
        <button
          type="button"
          onClick={onMoreFilters}
          className="px-2.5 py-0.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 flex items-center gap-1 text-[10px]"
        >
          <SlidersHorizontal size={11} className="text-slate-500" />
          More Filters
        </button>
      </div>
    </div>
  );
}
