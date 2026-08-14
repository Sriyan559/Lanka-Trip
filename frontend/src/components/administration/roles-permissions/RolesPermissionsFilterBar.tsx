'use client';

import React from 'react';
import { Search, SlidersHorizontal, Download, Bookmark, RotateCcw } from 'lucide-react';
import { QUICK_FILTERS } from '@/lib/administration/roles-permissions/roles-permissions.constants';

interface RolesPermissionsFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (v: string) => void;
  selectedRisk: string;
  onRiskChange: (v: string) => void;
  selectedPrivilege: string;
  onPrivilegeChange: (v: string) => void;
  activeQuickFilter: string | null;
  onToggleQuickFilter: (id: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export function RolesPermissionsFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedRisk,
  onRiskChange,
  selectedPrivilege,
  onPrivilegeChange,
  activeQuickFilter,
  onToggleQuickFilter,
  onApplyFilters,
  onClearFilters,
}: RolesPermissionsFilterBarProps) {
  return (
    <div className="flex flex-col gap-2.5 mb-3 bg-white p-3 rounded border border-gray-200 shadow-2xs">
      {/* Top Filter Controls Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-2 items-end">
        {/* Search */}
        <div className="col-span-2 sm:col-span-2 lg:col-span-2">
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search roles, permissions..."
              className="w-full pl-8 pr-2.5 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden focus:ring-1 focus:ring-[#741d35] focus:border-[#741d35]"
            />
          </div>
        </div>

        {/* Role Category */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Role Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium"
          >
            <option value="all">All</option>
            <option value="Operations">Operations</option>
            <option value="Merchandising">Merchandising</option>
            <option value="Finance">Finance</option>
            <option value="Customer Care">Customer Care</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {/* Role Type */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Role Type
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
            <option value="operational">Operational</option>
            <option value="admin">Administrative</option>
            <option value="readonly">Read Only</option>
          </select>
        </div>

        {/* Business Unit */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Business Unit
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
            <option value="retail-ops">Retail Ops</option>
            <option value="merchandising">Merchandising</option>
            <option value="finance">Finance</option>
            <option value="contact-center">Contact Center</option>
          </select>
        </div>

        {/* Channel / Application */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Channel / Application
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
            <option value="retail">Retail</option>
            <option value="online">Online</option>
            <option value="pos">POS</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>

        {/* Risk Level */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Risk Level
          </label>
          <select
            value={selectedRisk}
            onChange={(e) => onRiskChange(e.target.value)}
            className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium"
          >
            <option value="all">All</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Privilege Level */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Privilege Level
          </label>
          <select
            value={selectedPrivilege}
            onChange={(e) => onPrivilegeChange(e.target.value)}
            className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium"
          >
            <option value="all">All</option>
            <option value="Full">Full</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Action Buttons: Apply & Clear */}
        <div className="flex items-center gap-1.5 col-span-2 sm:col-span-4 lg:col-span-1">
          <button
            type="button"
            onClick={onApplyFilters}
            className="flex-1 py-1 px-2.5 bg-[#741d35] hover:bg-[#5d172a] text-white text-[11px] font-bold rounded shadow-2xs transition-colors text-center"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={onClearFilters}
            className="py-1 px-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-[11px] font-semibold rounded shadow-2xs transition-colors"
            title="Clear all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Second Action Bar: Save View, Export, More Filters */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-150 text-[10px]">
        {/* Quick Filters Chips */}
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
                className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-colors border flex items-center gap-1 ${
                  isActive
                    ? 'bg-[#741d35] text-white border-[#741d35]'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span>{qf.label}</span>
                <span className={`px-1 py-0.1 rounded-full text-[8px] ${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {qf.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Tool Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0 hidden md:flex">
          <button
            type="button"
            className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-semibold flex items-center gap-1 text-[10px]"
          >
            <Bookmark className="w-3 h-3" />
            <span>Save View</span>
          </button>
          <button
            type="button"
            className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-semibold flex items-center gap-1 text-[10px]"
          >
            <Download className="w-3 h-3" />
            <span>Export</span>
          </button>
          <button
            type="button"
            className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-semibold flex items-center gap-1 text-[10px]"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>More Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
