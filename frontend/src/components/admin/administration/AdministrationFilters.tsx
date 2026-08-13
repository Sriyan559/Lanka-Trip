import React from 'react';
import { Filter, RefreshCw, Save, Download, SlidersHorizontal } from 'lucide-react';

interface FiltersState {
  tenant: string;
  ecosystem: string;
  businessUnit: string;
  region: string;
  environment: string;
  domain: string;
  status: string;
  risk: string;
  timeRange: string;
}

interface AdministrationFiltersProps {
  filters: FiltersState;
  onFilterChange: (key: keyof FiltersState, value: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export function AdministrationFilters({
  filters,
  onFilterChange,
  onApply,
  onClear
}: AdministrationFiltersProps) {
  const selectClass = "bg-white border border-gray-200 rounded px-2 py-1 text-[11px] font-semibold text-gray-700 outline-none focus:border-gray-400 transition-colors h-7 min-w-[100px] cursor-pointer";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 border border-gray-200 rounded mb-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        {/* Tenant */}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Tenant</span>
          <select
            value={filters.tenant}
            onChange={(e) => onFilterChange('tenant', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="sl-beauty">SL Beauty</option>
          </select>
        </div>

        {/* Ecosystem */}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Ecosystem</span>
          <select
            value={filters.ecosystem}
            onChange={(e) => onFilterChange('ecosystem', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="marketplace">Beauty Marketplace</option>
          </select>
        </div>

        {/* Business Unit */}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Business Unit</span>
          <select
            value={filters.businessUnit}
            onChange={(e) => onFilterChange('businessUnit', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="retail">Retail</option>
            <option value="logistics">Logistics</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>

        {/* Region */}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Region</span>
          <select
            value={filters.region}
            onChange={(e) => onFilterChange('region', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="lk">Sri Lanka</option>
          </select>
        </div>

        {/* Environment */}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Environment</span>
          <select
            value={filters.environment}
            onChange={(e) => onFilterChange('environment', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="production">Production</option>
            <option value="staging">Staging</option>
            <option value="development">Development</option>
          </select>
        </div>

        {/* Domain */}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Admin Domain</span>
          <select
            value={filters.domain}
            onChange={(e) => onFilterChange('domain', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="identity">Identity & Users</option>
            <option value="roles">Roles & Permissions</option>
            <option value="configuration">Configuration</option>
            <option value="security">Security</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Health Status</span>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="healthy">Healthy</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        {/* Risk */}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Risk Level</span>
          <select
            value={filters.risk}
            onChange={(e) => onFilterChange('risk', e.target.value)}
            className={selectClass}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        {/* Time Range */}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Time Range</span>
          <select
            value={filters.timeRange}
            onChange={(e) => onFilterChange('timeRange', e.target.value)}
            className={selectClass}
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-3 sm:mt-0">
        <button
          onClick={onApply}
          className="px-3 h-7 text-[11px] font-bold text-white bg-[#741d35] hover:bg-[#5d172a] rounded shadow-sm flex items-center gap-1 transition-colors"
        >
          <Filter size={11} /> Apply Filters
        </button>
        
        <button
          onClick={onClear}
          className="px-3 h-7 text-[11px] font-bold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded shadow-sm transition-colors"
        >
          Clear All
        </button>

        <button
          className="p-1.5 text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded shadow-sm transition-colors"
          title="Save View"
        >
          <Save size={13} />
        </button>

        <button
          onClick={onApply} // Re-triggers data load
          className="p-1.5 text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded shadow-sm transition-colors"
          title="Refresh Data"
        >
          <RefreshCw size={13} />
        </button>

        <button
          className="p-1.5 text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded shadow-sm transition-colors"
          title="Export Data"
        >
          <Download size={13} />
        </button>

        <button
          className="px-2 h-7 text-[11px] font-bold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded shadow-sm flex items-center gap-1 transition-colors"
          title="More Filters"
        >
          <SlidersHorizontal size={11} /> More Filters
        </button>
      </div>
    </div>
  );
}
