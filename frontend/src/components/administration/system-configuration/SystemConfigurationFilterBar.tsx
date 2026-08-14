'use client';

import React from 'react';
import { Search, RotateCcw, Bookmark, RefreshCw, Columns, Download, SlidersHorizontal } from 'lucide-react';
import { QUICK_FILTERS } from '@/lib/administration/system-configuration/sys-config.constants';

interface SystemConfigurationFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeQuickFilter: string | null;
  onToggleQuickFilter: (id: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export function SystemConfigurationFilterBar({
  searchQuery,
  onSearchChange,
  activeQuickFilter,
  onToggleQuickFilter,
  onApplyFilters,
  onClearFilters,
}: SystemConfigurationFilterBarProps) {
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
              placeholder="Search across configuration..."
              className="w-full pl-8 pr-2.5 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden focus:ring-1 focus:ring-[#741d35] focus:border-[#741d35]"
            />
          </div>
        </div>

        {/* Configuration Domain */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Configuration Domain
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
          </select>
        </div>

        {/* Configuration Key */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Configuration Key
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
          </select>
        </div>
        
        {/* Tenant */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Tenant
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
          </select>
        </div>

        {/* Ecosystem */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Ecosystem
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
          </select>
        </div>
        
        {/* Business Unit */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Business Unit
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
          </select>
        </div>

        {/* Channel */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Channel
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
          </select>
        </div>
        
        {/* Environment */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Environment
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
          </select>
        </div>

        {/* Scope Level */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Scope Level
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
          </select>
        </div>

        {/* Row 2 extra filters merged into layout for space, matching 10 items shown + buttons */}
        
        {/* Action Buttons: Apply & Clear */}
        <div className="flex items-center gap-1 col-span-2">
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
            Quick Filters:
          </span>
          {QUICK_FILTERS.map((qf) => {
            const isActive = activeQuickFilter === qf.id;
            // specific colors from mockup
            let colorClass = 'text-gray-700';
            if (qf.label === 'Valid' || qf.label === 'Platform Defaults') colorClass = 'text-emerald-700';
            if (qf.label === 'Warning') colorClass = 'text-amber-700';
            if (qf.label === 'Critical' || qf.label === 'Restricted') colorClass = 'text-rose-700';
            if (qf.label === 'Pending Changes' || qf.label === 'Drift Detected') colorClass = 'text-blue-700';
            
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
                {qf.label} <span className="opacity-75 ml-1 text-[8px]">1</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Tool Actions */}
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
export default SystemConfigurationFilterBar;
