"use client";

import React from "react";
import { Search, SlidersHorizontal, RotateCcw, Bookmark, RefreshCw } from "lucide-react";
import { BrandFilterState } from "@/types/brandManagement";

interface BrandFiltersProps {
  filters: BrandFilterState;
  onFilterChange: (key: keyof BrandFilterState, value: string) => void;
  onClearAll: () => void;
  onOpenMoreFilters: () => void;
  onOpenSaveView: () => void;
  onRefresh: () => void;
}

export const BrandFilters: React.FC<BrandFiltersProps> = ({
  filters,
  onFilterChange,
  onClearAll,
  onOpenMoreFilters,
  onOpenSaveView,
  onRefresh,
}) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-3.5 flex flex-col gap-3 shadow-2xs">
      {/* First Row of Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2.5">
        {/* Search */}
        <div className="relative md:col-span-1">
          <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search brand, ID, owner, supplier..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange("searchQuery", e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#741d35] focus:bg-white"
          />
        </div>

        {/* Verification Status */}
        <div>
          <select
            value={filters.verificationStatus}
            onChange={(e) => onFilterChange("verificationStatus", e.target.value)}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35] focus:bg-white"
          >
            <option value="All">Verification Status (All)</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending Verification</option>
            <option value="Unverified">Unverified</option>
          </select>
        </div>

        {/* Authorization Status */}
        <div>
          <select
            value={filters.authorizationStatus}
            onChange={(e) => onFilterChange("authorizationStatus", e.target.value)}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35] focus:bg-white"
          >
            <option value="All">Authorization Status (All)</option>
            <option value="Valid">Valid</option>
            <option value="Expiring Soon">Expiring Soon</option>
            <option value="Conditional">Conditional</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        {/* Brand Owner */}
        <div>
          <select
            value={filters.brandOwner}
            onChange={(e) => onFilterChange("brandOwner", e.target.value)}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35] focus:bg-white"
          >
            <option value="All">Brand Owner (All)</option>
            <option value="Elena Vance">Elena Vance</option>
            <option value="Marcus Lee">Marcus Lee</option>
            <option value="Priya Kapoor">Priya Kapoor</option>
          </select>
        </div>

        {/* Supplier */}
        <div>
          <select
            value={filters.supplier}
            onChange={(e) => onFilterChange("supplier", e.target.value)}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35] focus:bg-white"
          >
            <option value="All">Supplier (All)</option>
            <option value="Luxe Distribution Pte Ltd">Luxe Distribution Pte Ltd</option>
            <option value="Glow Global Exports">Glow Global Exports</option>
            <option value="Shiseido Global">Shiseido Global</option>
            <option value="Beauty Asia Pte Ltd">Beauty Asia Pte Ltd</option>
          </select>
        </div>

        {/* Country */}
        <div>
          <select
            value={filters.country}
            onChange={(e) => onFilterChange("country", e.target.value)}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35] focus:bg-white"
          >
            <option value="All">Country (All)</option>
            <option value="USA">USA</option>
            <option value="Japan">Japan</option>
            <option value="France">France</option>
            <option value="Korea">Korea</option>
            <option value="Singapore">Singapore</option>
          </select>
        </div>
      </div>

      {/* Second Row of Filters & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-gray-100">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Channel Eligibility */}
          <select
            value={filters.channelEligibility}
            onChange={(e) => onFilterChange("channelEligibility", e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="All">Channel Eligibility (All)</option>
            <option value="5 / 5">5 / 5 Channels</option>
            <option value="4 / 5">4 / 5 Channels</option>
            <option value="3 / 5">3 / 5 Channels</option>
          </select>

          {/* Risk Level */}
          <select
            value={filters.riskLevel}
            onChange={(e) => onFilterChange("riskLevel", e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#741d35]"
          >
            <option value="All">Risk Level (All)</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
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

        {/* Filter Bar Actions */}
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
