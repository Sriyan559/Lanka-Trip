"use client";

import React from "react";
import { Search, Filter, RefreshCw, Bookmark, SlidersHorizontal } from "lucide-react";
import { DataOperationsDashboard, FilterState } from "@/types/importExport";

interface DataJobFiltersProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onClearAll: () => void;
  onOpenSaveView: () => void;
  onOpenMoreFilters: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  options: DataOperationsDashboard["options"];
}

export function DataJobFilters({
  filters,
  onChange,
  onClearAll,
  onOpenSaveView,
  onOpenMoreFilters,
  onRefresh,
  isRefreshing,
  options,
}: DataJobFiltersProps) {
  return (
    <div className="bg-white border border-line rounded-lg p-3 shadow-sm mb-4 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChange({ searchQuery: e.target.value })}
            placeholder="Search job ID, file name, source..."
            className="w-full h-8 pl-9 pr-3 rounded border border-line text-[11px] font-medium text-ink placeholder:text-slate-400 focus:outline-none focus:border-[#671021]"
          />
        </div>

        {/* Job Type Dropdown */}
        <div className="flex flex-col">
          <label className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Job Type</label>
          <select
            value={filters.jobType}
            onChange={(e) => onChange({ jobType: e.target.value })}
            className="h-8 px-2.5 rounded border border-line text-[11px] font-semibold text-ink bg-white focus:outline-none focus:border-[#671021]"
          >
            <option value="All">All</option>
            <option value="Import">Import</option>
            <option value="Export">Export</option>
          </select>
        </div>

        {/* Source Dropdown */}
        <div className="flex flex-col">
          <label className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Source</label>
          <select
            value={filters.source}
            onChange={(e) => onChange({ source: e.target.value })}
            className="h-8 px-2.5 rounded border border-line text-[11px] font-semibold text-ink bg-white focus:outline-none focus:border-[#671021]"
          >
            <option value="All">All</option>
            {options.sources.map(source=><option key={source} value={source}>{source}</option>)}
          </select>
        </div>

        {/* Business Unit Dropdown */}
        <div className="flex flex-col">
          <label className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Business Unit</label>
          <select
            disabled
            value={filters.businessUnit}
            onChange={(e) => onChange({ businessUnit: e.target.value })}
            className="h-8 px-2.5 rounded border border-line text-[11px] font-semibold text-ink bg-white focus:outline-none focus:border-[#671021]"
          >
            <option value="All">All</option>
            <option value="All Business Units">All Business Units</option>
            <option value="Beauty Marketplace">Beauty Marketplace</option>
            <option value="Media Hub">Media Hub</option>
          </select>
        </div>

        {/* Template Dropdown */}
        <div className="flex flex-col">
          <label className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Template</label>
          <select
            disabled
            value={filters.template}
            onChange={(e) => onChange({ template: e.target.value })}
            className="h-8 px-2.5 rounded border border-line text-[11px] font-semibold text-ink bg-white focus:outline-none focus:border-[#671021]"
          >
            <option value="All">All</option>
            <option value="Product Master CSV">Product Master CSV</option>
            <option value="Product Delta Update">Product Delta Update</option>
            <option value="Category Taxonomy Sync">Category Taxonomy Sync</option>
          </select>
        </div>

        {/* Approval Status Dropdown */}
        <div className="flex flex-col">
          <label className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Approval Status</label>
          <select
            disabled
            value={filters.approvalStatus}
            onChange={(e) => onChange({ approvalStatus: e.target.value })}
            className="h-8 px-2.5 rounded border border-line text-[11px] font-semibold text-ink bg-white focus:outline-none focus:border-[#671021]"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Validation Status Dropdown */}
        <div className="flex flex-col">
          <label className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Validation Status</label>
          <select
            value={filters.validationStatus}
            onChange={(e) => onChange({ validationStatus: e.target.value })}
            className="h-8 px-2.5 rounded border border-line text-[11px] font-semibold text-ink bg-white focus:outline-none focus:border-[#671021]"
          >
            <option value="All">All</option>
            {options.statuses.map(status=><option key={status} value={status}>{status}</option>)}
          </select>
        </div>

        {/* Date Range Dropdown */}
        <div className="flex flex-col">
          <label className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Date Range</label>
          <select
            value={filters.dateRange}
            onChange={(e) => onChange({ dateRange: e.target.value })}
            className="h-8 px-2.5 rounded border border-line text-[11px] font-semibold text-ink bg-white focus:outline-none focus:border-[#671021]"
          >
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Today">Today</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        {/* Owner Dropdown */}
        <div className="flex flex-col">
          <label className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Owner</label>
          <select
            value={filters.owner}
            onChange={(e) => onChange({ owner: e.target.value })}
            className="h-8 px-2.5 rounded border border-line text-[11px] font-semibold text-ink bg-white focus:outline-none focus:border-[#671021]"
          >
            <option value="All">All</option>
            {options.users.map(user=><option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 ml-auto pt-4">
          <button
            onClick={onOpenMoreFilters}
            className="h-8 px-2.5 rounded border border-line text-[11px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1"
          >
            <SlidersHorizontal size={13} /> More Filters
          </button>

          <button
            onClick={onClearAll}
            className="h-8 px-2.5 text-[11px] font-bold text-[#671021] hover:underline"
          >
            Clear All
          </button>

          <button
            onClick={onOpenSaveView}
            className="h-8 px-2.5 rounded border border-line text-[11px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1"
          >
            <Bookmark size={13} /> Save View
          </button>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="h-8 px-3 rounded bg-[#671021] text-white text-[11px] font-bold hover:bg-[#520d1a] flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <RefreshCw size={12} className={isRefreshing ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
}
