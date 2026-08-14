'use client';

import React from 'react';
import { Search, RotateCcw, Bookmark, RefreshCw, Columns, Download, SlidersHorizontal } from 'lucide-react';
import { QUICK_FILTERS } from '@/lib/administration/tenant-organization/tenant-organization.constants';

interface TenantOrgFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTenant: string;
  onTenantChange: (v: string) => void;
  selectedEcosystem: string;
  onEcosystemChange: (v: string) => void;
  selectedStatus: string;
  onStatusChange: (v: string) => void;
  activeQuickFilter: string | null;
  onToggleQuickFilter: (id: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export function TenantOrgFilterBar({
  searchQuery,
  onSearchChange,
  selectedTenant,
  onTenantChange,
  selectedEcosystem,
  onEcosystemChange,
  selectedStatus,
  onStatusChange,
  activeQuickFilter,
  onToggleQuickFilter,
  onApplyFilters,
  onClearFilters,
}: TenantOrgFilterBarProps) {
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
              placeholder="Search tenant, ecosystem, organization..."
              className="w-full pl-8 pr-2.5 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden focus:ring-1 focus:ring-[#741d35] focus:border-[#741d35]"
            />
          </div>
        </div>

        {/* Tenant */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Tenant
          </label>
          <select
            value={selectedTenant}
            onChange={(e) => onTenantChange(e.target.value)}
            className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium"
          >
            <option value="all">All</option>
            <option value="sl-beauty">SL Beauty</option>
            <option value="beauty-intl">Beauty International</option>
            <option value="singapore-global">Singapore Global</option>
          </select>
        </div>

        {/* Ecosystem */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Ecosystem
          </label>
          <select
            value={selectedEcosystem}
            onChange={(e) => onEcosystemChange(e.target.value)}
            className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium"
          >
            <option value="all">All</option>
            <option value="beauty-mkt">Beauty Marketplace</option>
            <option value="b2b-wholesale">B2B Wholesale</option>
            <option value="clinic-prof">Clinic & Professionals</option>
          </select>
        </div>

        {/* Organization Type */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Organization Type
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
            <option value="tenant">Tenant</option>
            <option value="ecosystem">Ecosystem</option>
            <option value="organization">Organization</option>
            <option value="bu">Business Unit</option>
          </select>
        </div>

        {/* Parent Organization */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Parent Organization
          </label>
          <select className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium">
            <option value="all">All</option>
            <option value="sl-beauty">SL Beauty</option>
            <option value="beauty-mkt">Beauty Marketplace</option>
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
            <option value="uae">UAE</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-2 py-1 text-[11px] bg-white border border-gray-200 rounded focus:outline-hidden text-gray-700 font-medium"
          >
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Draft">Draft</option>
            <option value="Proposed">Proposed</option>
          </select>
        </div>

        {/* Actions: Apply & Clear */}
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

      {/* Toolbar Buttons & Quick Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-gray-150 text-[10px]">
        {/* Quick Filter Chips */}
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

        {/* Action Buttons */}
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
