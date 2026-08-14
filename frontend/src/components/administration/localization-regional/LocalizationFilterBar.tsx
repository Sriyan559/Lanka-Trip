'use client';

import React from 'react';
import { Search, RotateCcw, Bookmark, RefreshCw, Columns, Download, SlidersHorizontal } from 'lucide-react';
import { LOCALIZATION_FILTERS } from '@/lib/administration/localization/localization.constants';

interface LocalizationFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeQuickFilter: string | null;
  onToggleQuickFilter: (id: string) => void;
  onClearFilters: () => void;
  onRefresh: () => void;
}

export function LocalizationFilterBar({
  searchQuery,
  onSearchChange,
  activeQuickFilter,
  onToggleQuickFilter,
  onClearFilters,
  onRefresh,
}: LocalizationFilterBarProps) {
  return (
    <div className="flex flex-col gap-2 mb-3 bg-white p-3 rounded border border-gray-200 shadow-2xs">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-10 gap-2 items-end">
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
              placeholder="Search country, language, currency..."
              className="w-full pl-8 pr-2.5 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden focus:ring-1 focus:ring-[#741d35] focus:border-[#741d35]"
            />
          </div>
        </div>

        {/* Dynamic Filters */}
        {LOCALIZATION_FILTERS.map((f) => (
          <div key={f.id}>
            <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              {f.label}
            </label>
            <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
              <option value="all">All</option>
            </select>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-gray-150 text-[10px]">
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          <button
            type="button"
            onClick={onClearFilters}
            className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-[10px] font-bold rounded shadow-2xs transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3 text-gray-500" />
            <span>Clear All</span>
          </button>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button type="button" className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-semibold flex items-center gap-1 text-[10px]">
            <Bookmark className="w-3 h-3" />
            <span>Save View</span>
          </button>
          <button type="button" onClick={onRefresh} className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-semibold flex items-center gap-1 text-[10px]">
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
export default LocalizationFilterBar;
