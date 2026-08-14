'use client';

import React from 'react';
import { Search, RotateCcw, Bookmark, RefreshCw, Columns, Download, SlidersHorizontal } from 'lucide-react';
import { QUICK_FILTERS } from '@/lib/administration/business-units-channels/bu-channels.constants';

interface BuChannelsFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedBu: string;
  onBuChange: (v: string) => void;
  selectedChannel: string;
  onChannelChange: (v: string) => void;
  selectedStatus: string;
  onStatusChange: (v: string) => void;
  activeQuickFilter: string | null;
  onToggleQuickFilter: (id: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export function BuChannelsFilterBar({
  searchQuery,
  onSearchChange,
  selectedBu,
  onBuChange,
  selectedChannel,
  onChannelChange,
  selectedStatus,
  onStatusChange,
  activeQuickFilter,
  onToggleQuickFilter,
  onApplyFilters,
  onClearFilters,
}: BuChannelsFilterBarProps) {
  return (
    <div className="flex flex-col gap-2 mb-3 bg-white p-3 rounded border border-gray-200 shadow-2xs">
      {/* Top Filter Dropdowns Row */}
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
              placeholder="Search business units, channels, scope..."
              className="w-full pl-8 pr-2.5 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden focus:ring-1 focus:ring-[#741d35] focus:border-[#741d35]"
            />
          </div>
        </div>

        {/* Business Unit */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Business Unit
          </label>
          <select
            value={selectedBu}
            onChange={(e) => onBuChange(e.target.value)}
            className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium"
          >
            <option value="all">All</option>
            <option value="beauty-retail">Beauty Retail</option>
            <option value="b2b-wholesale">B2B Wholesale</option>
            <option value="clinics-prof">Clinics & Professionals</option>
          </select>
        </div>

        {/* Channel */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Channel
          </label>
          <select
            value={selectedChannel}
            onChange={(e) => onChannelChange(e.target.value)}
            className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium"
          >
            <option value="all">All</option>
            <option value="online-store">Online Store</option>
            <option value="retail-pos">Retail POS</option>
            <option value="marketplace">Marketplace</option>
          </select>
        </div>

        {/* Lifecycle State */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Lifecycle State
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium"
          >
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="Pilot">Pilot</option>
            <option value="Restricted">Restricted</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Production Readiness */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Readiness
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
            <option value="eligible">Eligible</option>
            <option value="conditional">Conditional</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        {/* Region */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Region
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
            <option value="south-asia">South Asia</option>
            <option value="international">International</option>
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Country
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
            <option value="sri-lanka">Sri Lanka</option>
            <option value="singapore">Singapore</option>
          </select>
        </div>

        {/* Environment */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Environment
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
            <option value="production">Production</option>
            <option value="test">Test</option>
            <option value="dev">Dev</option>
          </select>
        </div>

        {/* Action Buttons: Apply & Clear */}
        <div className="flex items-center gap-1 col-span-2 sm:col-span-4 lg:col-span-1">
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
            return (
              <button
                key={qf.id}
                type="button"
                onClick={() => onToggleQuickFilter(qf.id)}
                className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-colors border ${
                  isActive
                    ? 'bg-[#741d35] text-white border-[#741d35]'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {qf.label}
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
export default BuChannelsFilterBar;
