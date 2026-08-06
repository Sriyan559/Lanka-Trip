"use client";

import React from "react";
import { Search, Filter, X, Bookmark, RefreshCw } from "lucide-react";
import { CategoryFilterState } from "@/types/categoryManagement";

interface CategoryFiltersProps {
  filters: CategoryFilterState;
  onChange: (field: keyof CategoryFilterState, value: string) => void;
  onClearAll: () => void;
  onMoreFilters: () => void;
  onSaveView: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  filters,
  onChange,
  onClearAll,
  onMoreFilters,
  onSaveView,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-3.5 shadow-2xs mb-4 flex flex-col gap-2.5">
      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 text-xs">
        {/* Search */}
        <div className="relative col-span-1 sm:col-span-2">
          <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChange("searchQuery", e.target.value)}
            placeholder="Search category / product / attribute / ID"
            className="w-full h-8 pl-8 pr-3 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          />
        </div>

        {/* Department */}
        <div>
          <select
            value={filters.department}
            onChange={(e) => onChange("department", e.target.value)}
            className="w-full h-8 px-2 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          >
            <option value="all">Department: All</option>
            <option value="Skincare">Skincare</option>
            <option value="Makeup">Makeup</option>
            <option value="Haircare">Haircare</option>
          </select>
        </div>

        {/* Parent Category */}
        <div>
          <select
            value={filters.parentCategory}
            onChange={(e) => onChange("parentCategory", e.target.value)}
            className="w-full h-8 px-2 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          >
            <option value="all">Parent: All Parents</option>
            <option value="Beauty">Beauty</option>
            <option value="Skincare">Skincare</option>
            <option value="Face Care">Face Care</option>
          </select>
        </div>

        {/* Category Level */}
        <div>
          <select
            value={filters.categoryLevel}
            onChange={(e) => onChange("categoryLevel", e.target.value)}
            className="w-full h-8 px-2 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          >
            <option value="all">Level: All Levels</option>
            <option value="1">Level 1 (Department)</option>
            <option value="2">Level 2 (Category)</option>
            <option value="3">Level 3 (Subcategory)</option>
            <option value="4">Level 4 (Leaf Category)</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <select
            value={filters.status}
            onChange={(e) => onChange("status", e.target.value)}
            className="w-full h-8 px-2 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          >
            <option value="all">Status: All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Review Required">Review Required</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Required Attributes */}
          <select
            value={filters.requiredAttributes}
            onChange={(e) => onChange("requiredAttributes", e.target.value)}
            className="h-8 px-2 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          >
            <option value="all">Required Attributes: All</option>
            <option value="Complete">100% Complete</option>
            <option value="Missing">Has Missing Attributes</option>
          </select>

          {/* Channel Eligibility */}
          <select
            value={filters.channelEligibility}
            onChange={(e) => onChange("channelEligibility", e.target.value)}
            className="h-8 px-2 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          >
            <option value="all">Channel Eligibility: All Channels</option>
            <option value="5/5">5/5 Eligible</option>
            <option value="Partial">Partial Channels</option>
          </select>

          {/* Compliance Status */}
          <select
            value={filters.complianceStatus}
            onChange={(e) => onChange("complianceStatus", e.target.value)}
            className="h-8 px-2 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          >
            <option value="all">Compliance: All</option>
            <option value="Configured">Configured</option>
            <option value="Partial">Partial</option>
          </select>

          {/* Owner */}
          <select
            value={filters.owner}
            onChange={(e) => onChange("owner", e.target.value)}
            className="h-8 px-2 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#741d35]"
          >
            <option value="all">Owner: All Owners</option>
            <option value="Elena Vance">Elena Vance</option>
            <option value="Marcus Lee">Marcus Lee</option>
            <option value="Priya Kapoor">Priya Kapoor</option>
          </select>
        </div>

        {/* Filter Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMoreFilters}
            className="h-8 px-3 rounded border border-gray-300 bg-white text-[11.5px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1"
          >
            <Filter size={13} />
            <span>More Filters</span>
          </button>

          <button
            onClick={onClearAll}
            className="h-8 px-2.5 rounded text-[11.5px] font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1"
          >
            <X size={13} />
            <span>Clear All</span>
          </button>

          <button
            onClick={onSaveView}
            className="h-8 px-3 rounded border border-gray-300 bg-white text-[11.5px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1"
          >
            <Bookmark size={13} />
            <span>Save View</span>
          </button>

          <button
            onClick={onRefresh}
            className="h-8 px-4 rounded bg-[#741d35] text-white text-[11.5px] font-bold hover:bg-[#5c172a] flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <RefreshCw size={12} className={isRefreshing ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};
