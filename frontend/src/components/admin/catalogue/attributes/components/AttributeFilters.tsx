"use client";

import React from "react";
import { Search, SlidersHorizontal, RotateCcw, Bookmark, RefreshCw } from "lucide-react";
import { AttributeFilterState, AttributeManagementData } from "@/types/attributeManagement";

interface AttributeFiltersProps {
  filters: AttributeFilterState;
  onFilterChange: (key: keyof AttributeFilterState, value: string) => void;
  onClearAll: () => void;
  onOpenMoreFilters: () => void;
  onOpenSaveView: () => void;
  onRefresh: () => void;
  options: AttributeManagementData["options"];
  capabilities: AttributeManagementData["capabilities"];
}

export const AttributeFilters: React.FC<AttributeFiltersProps> = ({
  filters,
  onFilterChange,
  onClearAll,
  onOpenMoreFilters,
  onOpenSaveView,
  onRefresh,
  options,
  capabilities,
}) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-3.5 flex flex-col gap-3 shadow-2xs min-w-0">
      {/* First Row of Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2.5">
        {/* Search */}
        <div className="relative md:col-span-1">
          <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search attribute name, ID or description..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange("searchQuery", e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#741d35] focus:bg-white"
          />
        </div>

        {/* Attribute Group */}
        <div>
          <select
            value={filters.group}
            onChange={(e) => onFilterChange("group", e.target.value)}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35] focus:bg-white"
          >
            <option value="All Groups">Attribute Group (All)</option>
            {options.groups.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
          </select>
        </div>

        {/* Category */}
        <div>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35] focus:bg-white"
          >
            <option value="All Categories">Category (All)</option>
            {options.categories.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
          </select>
        </div>

        {/* Status */}
        <div>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35] focus:bg-white"
          >
            <option value="All Statuses">Status (All)</option>
            {options.statuses.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>

        {/* Data Type */}
        <div>
          <select
            value={filters.dataType}
            onChange={(e) => onFilterChange("dataType", e.target.value)}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35] focus:bg-white"
          >
            <option value="All Types">Data Type (All)</option>
            {options.dataTypes.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>

        {/* Required Status */}
        <div>
          <select
            value={filters.requiredStatus}
            onChange={(e) => onFilterChange("requiredStatus", e.target.value)}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35] focus:bg-white"
          >
            <option value="All">Required Status (All)</option>
            <option value="Required">Required Only</option>
            <option value="Optional">Optional Only</option>
          </select>
        </div>
      </div>

      {/* Second Row of Filters & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-gray-100">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Variant-generating */}
          <select
            value={filters.variantGenerating}
            onChange={(e) => onFilterChange("variantGenerating", e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="All">Variant-generating (All)</option>
            <option value="Yes">Variant-generating Only</option>
            <option value="No">Non-Variant Attributes</option>
          </select>

          {/* Channel Eligibility */}
          <select
            value={filters.channelEligibility}
            disabled={!capabilities.channelRequirements}
            onChange={(e) => onFilterChange("channelEligibility", e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="All Channels">Channel Eligibility (All)</option>
            {options.channels.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
          </select>

          {/* Risk Level */}
          <select
            value={filters.riskLevel}
            disabled
            onChange={(e) => onFilterChange("riskLevel", e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="All">Risk Level (All)</option>
          </select>

          {/* Owner */}
          <select
            value={filters.owner}
            disabled={options.owners.length === 0}
            onChange={(e) => onFilterChange("owner", e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="All Owners">Owner (All)</option>
            {options.owners.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
          </select>

          {/* Updated Date */}
          <input
            type="date"
            value={filters.updatedDate}
            onChange={(e) => onFilterChange("updatedDate", e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35]"
          />

          {/* More Filters */}
          <button
            onClick={onOpenMoreFilters}
            className="h-8 px-3 rounded bg-white border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
          >
            <SlidersHorizontal size={13} />
            More Filters
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClearAll}
            className="h-8 px-3 rounded bg-white text-xs font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} />
            Clear All
          </button>
          <button
            onClick={onOpenSaveView}
            disabled={!capabilities.savedViews}
            className="h-8 px-3 rounded bg-white border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
          >
            <Bookmark size={13} />
            Save View
          </button>
          <button
            onClick={onRefresh}
            className="h-8 px-3.5 rounded bg-[#741d35] text-white text-xs font-bold hover:bg-[#5c172a] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};
