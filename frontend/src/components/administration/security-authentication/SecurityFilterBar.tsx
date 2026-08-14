'use client';

import React from 'react';
import { Search, RotateCcw, Bookmark, RefreshCw, Columns, Download, SlidersHorizontal } from 'lucide-react';
import { SECURITY_FILTERS, QUICK_FILTERS } from '@/lib/administration/security-authentication/security-authentication.constants';

interface SecurityFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeQuickFilter: string | null;
  onToggleQuickFilter: (id: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export function SecurityFilterBar({
  searchQuery,
  onSearchChange,
  activeQuickFilter,
  onToggleQuickFilter,
  onApplyFilters,
  onClearFilters,
}: SecurityFilterBarProps) {
  return (
    <div className="flex flex-col gap-2 mb-3 bg-white p-3 rounded border border-gray-200 shadow-2xs">
      {/* Top Filter Dropdowns Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-2 items-end">
        {/* Search */}
        <div className="col-span-2">
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search policies, providers, sessions..."
              className="w-full pl-8 pr-2.5 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden focus:ring-1 focus:ring-[#741d35] focus:border-[#741d35]"
            />
          </div>
        </div>

        {SECURITY_FILTERS.map((f) => (
          <div key={f.id}>
            <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1 truncate" title={f.label}>
              {f.label}
            </label>
            <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
              <option value="all">All</option>
            </select>
          </div>
        ))}

        {/* Action Buttons */}
        <div className="flex items-center gap-1 col-span-2 sm:col-span-1">
          <button
            type="button"
            onClick={onApplyFilters}
            className="flex-1 py-1 px-2 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow-2xs transition-colors text-center"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={onClearFilters}
            className="py-1 px-1.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-[11px] font-semibold rounded shadow-2xs transition-colors"
            title="Clear all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Filters Chips Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-gray-150 text-[10px]">
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
            Quick Filter:
          </span>
          {QUICK_FILTERS.map((qf) => {
            const isActive = activeQuickFilter === qf.id;
            let colorClass = 'text-gray-700';
            if (qf.label === 'Healthy') colorClass = 'text-emerald-700';
            if (qf.label === 'Warning' || qf.label === 'MFA Gap' || qf.label === 'Needs Attention') colorClass = 'text-amber-700';
            if (qf.label === 'Failed' || qf.label === 'High Risk' || qf.label === 'Locked' || qf.label === 'Break-Glass') colorClass = 'text-rose-700';

            return (
              <button
                key={qf.id}
                type="button"
                onClick={() => onToggleQuickFilter(qf.id)}
                className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-colors border ${
                  isActive
                    ? 'bg-[#741d35] text-white border-[#741d35]'
                    : `bg-gray-50 border-gray-200 hover:bg-gray-100 ${colorClass}`
                }`}
              >
                {qf.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 flex-shrink-0 hidden md:flex">
          <button type="button" className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-semibold flex items-center gap-1 text-[10px]">
            <Bookmark className="w-3 h-3" />
            <span>Save View</span>
          </button>
          <button type="button" className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-semibold flex items-center gap-1 text-[10px]">
            <RefreshCw className="w-3 h-3" />
            <span>Refresh</span>
          </button>
          <button type="button" className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-semibold flex items-center gap-1 text-[10px]">
            <Columns className="w-3 h-3" />
            <span>Columns</span>
          </button>
          <button type="button" className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-semibold flex items-center gap-1 text-[10px]">
            <Download className="w-3 h-3" />
            <span>Export</span>
          </button>
          <button type="button" className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-semibold flex items-center gap-1 text-[10px]">
            <SlidersHorizontal className="w-3 h-3" />
            <span>More Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default SecurityFilterBar;
