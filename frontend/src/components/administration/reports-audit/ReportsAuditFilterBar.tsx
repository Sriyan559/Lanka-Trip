'use client';

import React from 'react';
import { Search, RefreshCw, Columns, Download, Filter, Bookmark } from 'lucide-react';

interface ReportsAuditFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  dateRange: string;
  onDateRangeChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  actorType: string;
  onActorTypeChange: (v: string) => void;
  operation: string;
  onOperationChange: (v: string) => void;
  result: string;
  onResultChange: (v: string) => void;
  integrity: string;
  onIntegrityChange: (v: string) => void;
  businessUnit: string;
  onBusinessUnitChange: (v: string) => void;
  channelRegion: string;
  onChannelRegionChange: (v: string) => void;
  riskLevel: string;
  onRiskLevelChange: (v: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export function ReportsAuditFilterBar({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  category,
  onCategoryChange,
  actorType,
  onActorTypeChange,
  operation,
  onOperationChange,
  result,
  onResultChange,
  integrity,
  onIntegrityChange,
  businessUnit,
  onBusinessUnitChange,
  channelRegion,
  onChannelRegionChange,
  riskLevel,
  onRiskLevelChange,
  onApplyFilters,
  onClearFilters,
}: ReportsAuditFilterBarProps) {
  return (
    <div className="bg-white border border-gray-200 rounded p-2 mb-3 shadow-2xs">
      <div className="flex flex-wrap items-center gap-2 text-[10px]">
        {/* Date Range */}
        <div className="flex flex-col gap-0.5">
          <label className="text-[9px] font-bold text-gray-500 uppercase">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_7_days">Last 7 Days</option>
            <option value="last_90_days">Last 90 Days</option>
            <option value="year_to_date">Year to Date</option>
          </select>
        </div>

        {/* Change Category */}
        <div className="flex flex-col gap-0.5">
          <label className="text-[9px] font-bold text-gray-500 uppercase">Change Category</label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="all">All</option>
            <option value="user_management">User Management</option>
            <option value="roles_permissions">Roles & Permissions</option>
            <option value="system_config">System Configuration</option>
            <option value="workflows">Workflows & Approvals</option>
            <option value="data_governance">Data Governance</option>
            <option value="localization">Localization & Regional</option>
            <option value="security">Security & Auth</option>
            <option value="maintenance">Operations & Maintenance</option>
          </select>
        </div>

        {/* Actor Type */}
        <div className="flex flex-col gap-0.5">
          <label className="text-[9px] font-bold text-gray-500 uppercase">Actor Type</label>
          <select
            value={actorType}
            onChange={(e) => onActorTypeChange(e.target.value)}
            className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="all">All</option>
            <option value="human">Human Administrator</option>
            <option value="service_principal">Service Principal</option>
            <option value="automated_job">Automated Job</option>
          </select>
        </div>

        {/* Operation */}
        <div className="flex flex-col gap-0.5">
          <label className="text-[9px] font-bold text-gray-500 uppercase">Operation</label>
          <select
            value={operation}
            onChange={(e) => onOperationChange(e.target.value)}
            className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="all">All</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="approve">Approve</option>
            <option value="export">Export</option>
          </select>
        </div>

        {/* Result */}
        <div className="flex flex-col gap-0.5">
          <label className="text-[9px] font-bold text-gray-500 uppercase">Result</label>
          <select
            value={result}
            onChange={(e) => onResultChange(e.target.value)}
            className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="partial">Partial</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Integrity */}
        <div className="flex flex-col gap-0.5">
          <label className="text-[9px] font-bold text-gray-500 uppercase">Integrity</label>
          <select
            value={integrity}
            onChange={(e) => onIntegrityChange(e.target.value)}
            className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="warning">Warning</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Business Unit */}
        <div className="flex flex-col gap-0.5">
          <label className="text-[9px] font-bold text-gray-500 uppercase">Business Unit</label>
          <select
            value={businessUnit}
            onChange={(e) => onBusinessUnitChange(e.target.value)}
            className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="all">All</option>
            <option value="global">Global</option>
            <option value="apac">APAC Retail</option>
            <option value="eu">EU Retail</option>
            <option value="na">NA Retail</option>
          </select>
        </div>

        {/* Channel / Region */}
        <div className="flex flex-col gap-0.5">
          <label className="text-[9px] font-bold text-gray-500 uppercase">Channel / Region</label>
          <select
            value={channelRegion}
            onChange={(e) => onChannelRegionChange(e.target.value)}
            className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="all">All</option>
            <option value="global">Global</option>
            <option value="apac_sg">APAC / SG</option>
            <option value="eu_fr">EU / FR</option>
          </select>
        </div>

        {/* Risk Level */}
        <div className="flex flex-col gap-0.5">
          <label className="text-[9px] font-bold text-gray-500 uppercase">Risk Level</label>
          <select
            value={riskLevel}
            onChange={(e) => onRiskLevelChange(e.target.value)}
            className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-700 font-medium focus:outline-hidden focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-0.5 flex-1 min-w-[160px]">
          <label className="text-[9px] font-bold text-gray-500 uppercase">Search</label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search audit records..."
              className="w-full pl-7 pr-2 py-1 bg-white border border-gray-200 rounded text-[10px] text-gray-700 focus:outline-hidden focus:ring-1 focus:ring-[#741d35]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 mt-auto pt-4">
          <button
            type="button"
            onClick={onApplyFilters}
            className="px-3 py-1 bg-[#741d35] hover:bg-[#5d172a] text-white font-bold rounded shadow-2xs transition-colors"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={onClearFilters}
            className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded font-semibold transition-colors"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => alert('View saved')}
            className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded font-semibold transition-colors flex items-center gap-1"
          >
            <Bookmark className="w-3 h-3 text-gray-400" />
            <span>Save View</span>
          </button>
          <button
            type="button"
            onClick={onApplyFilters}
            className="p-1 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => alert('Columns menu')}
            className="p-1 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded transition-colors"
            title="Columns"
          >
            <Columns className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => alert('Exporting data')}
            className="p-1 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded transition-colors"
            title="Export"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => alert('More filters')}
            className="px-2 py-1 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded font-semibold transition-colors flex items-center gap-1"
          >
            <Filter className="w-3 h-3 text-gray-400" />
            <span>More Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportsAuditFilterBar;
