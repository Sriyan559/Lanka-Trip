"use client";

import React from "react";
import { Search, Filter, RotateCcw, Bookmark, RefreshCw, Check } from "lucide-react";
import { CustomerFilterState } from "@/types/customer";

interface CustomerDirectoryFiltersProps {
  filters: CustomerFilterState;
  onFilterChange: (key: keyof CustomerFilterState, value: any) => void;
  onClearAll: () => void;
  onToggleQuickChip: (chip: string) => void;
  onOpenMoreFilters: () => void;
  onOpenSaveView: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const QUICK_CHIP_OPTIONS = [
  "Assigned to Me",
  "Verification Pending",
  "High-Value",
  "Dormant",
  "Restricted",
  "Open Cases",
  "Return Risk",
  "Privacy Requests",
  "Duplicate Candidates",
];

export function CustomerDirectoryFilters({
  filters,
  onFilterChange,
  onClearAll,
  onToggleQuickChip,
  onOpenMoreFilters,
  onOpenSaveView,
  onRefresh,
  isRefreshing,
}: CustomerDirectoryFiltersProps) {
  return (
    <div className="bg-white border-b border-line px-6 py-3.5 flex flex-col gap-3">
      {/* Row 1 Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5 items-center text-[12px]">
        {/* Search */}
        <div className="relative col-span-1 sm:col-span-2 md:col-span-2">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search customers by name, email, phone, ID..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange("searchQuery", e.target.value)}
            className="w-full h-8 pl-8 pr-3 bg-slate-50 border border-line rounded-md text-[12px] text-ink placeholder:text-slate-400 focus:outline-none focus:border-[#671021] focus:bg-white"
          />
        </div>

        {/* Customer Type */}
        <select
          value={filters.customerType}
          onChange={(e) => onFilterChange("customerType", e.target.value)}
          className="h-8 px-2.5 bg-white border border-line rounded-md text-[11.5px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
        >
          <option value="All">Customer Type: All</option>
          <option value="Individual">Individual</option>
          <option value="Business">Business (B2B)</option>
          <option value="VIP">VIP</option>
        </select>

        {/* Segment */}
        <select
          value={filters.segment}
          onChange={(e) => onFilterChange("segment", e.target.value)}
          className="h-8 px-2.5 bg-white border border-line rounded-md text-[11.5px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
        >
          <option value="All">Segment: All</option>
          <option value="Active">Active</option>
          <option value="New">New</option>
          <option value="Repeat">Repeat</option>
          <option value="Loyalty">Loyalty</option>
          <option value="High-Value">High-Value</option>
          <option value="Dormant">Dormant</option>
          <option value="Restricted">Restricted</option>
        </select>

        {/* Verification Status */}
        <select
          value={filters.verificationStatus}
          onChange={(e) => onFilterChange("verificationStatus", e.target.value)}
          className="h-8 px-2.5 bg-white border border-line rounded-md text-[11.5px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
        >
          <option value="All">Verification: All</option>
          <option value="Verified">Verified</option>
          <option value="Verification Pending">Verification Pending</option>
          <option value="Unverified">Unverified</option>
        </select>

        {/* Profile Completeness */}
        <select
          defaultValue="All"
          className="h-8 px-2.5 bg-white border border-line rounded-md text-[11.5px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
        >
          <option value="All">Completeness: All</option>
          <option value="100">100% Complete</option>
          <option value="80+">80%+ Complete</option>
          <option value="50-79">50% - 79% Complete</option>
          <option value="under50">Under 50%</option>
        </select>

        {/* Loyalty Tier */}
        <select
          value={filters.loyaltyTier}
          onChange={(e) => onFilterChange("loyaltyTier", e.target.value)}
          className="h-8 px-2.5 bg-white border border-line rounded-md text-[11.5px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
        >
          <option value="All">Loyalty Tier: All</option>
          <option value="Platinum">Platinum</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
          <option value="Standard">Standard</option>
        </select>

        {/* Consent Status */}
        <select
          value={filters.consentStatus}
          onChange={(e) => onFilterChange("consentStatus", e.target.value)}
          className="h-8 px-2.5 bg-white border border-line rounded-md text-[11.5px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
        >
          <option value="All">Consent: All</option>
          <option value="Consented">Consented</option>
          <option value="Pending">Pending</option>
          <option value="Revoked">Revoked</option>
        </select>
      </div>

      {/* Row 2 Filters & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 text-[12px]">
        <div className="flex flex-wrap items-center gap-2">
          {/* Risk Level */}
          <select
            value={filters.riskLevel}
            onChange={(e) => onFilterChange("riskLevel", e.target.value)}
            className="h-8 px-2.5 bg-white border border-line rounded-md text-[11.5px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
          >
            <option value="All">Risk Level: All</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>

          {/* Region */}
          <select
            value={filters.region}
            onChange={(e) => onFilterChange("region", e.target.value)}
            className="h-8 px-2.5 bg-white border border-line rounded-md text-[11.5px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
          >
            <option value="All">Region: All</option>
            <option value="Western Province, Sri Lanka">Western Province</option>
            <option value="Central Province, Sri Lanka">Central Province</option>
            <option value="Southern Province, Sri Lanka">Southern Province</option>
            <option value="Northern Province, Sri Lanka">Northern Province</option>
          </select>

          {/* Channel */}
          <select
            value={filters.salesChannel}
            onChange={(e) => onFilterChange("salesChannel", e.target.value)}
            className="h-8 px-2.5 bg-white border border-line rounded-md text-[11.5px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
          >
            <option value="All">Sales Channel: All</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Website">Website</option>
            <option value="B2B Portal">B2B Portal</option>
          </select>

          {/* Owner */}
          <select
            value={filters.owner}
            onChange={(e) => onFilterChange("owner", e.target.value)}
            className="h-8 px-2.5 bg-white border border-line rounded-md text-[11.5px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
          >
            <option value="All">Owner: Any</option>
            <option value="Rachel Dias">Rachel Dias</option>
            <option value="Waleed Perera">Waleed Perera</option>
            <option value="Iruro Silva">Iruro Silva</option>
          </select>

          {/* Updated Date */}
          <select
            value={filters.updatedDate}
            onChange={(e) => onFilterChange("updatedDate", e.target.value)}
            className="h-8 px-2.5 bg-white border border-line rounded-md text-[11.5px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
          >
            <option value="30D">Updated: Last 30 Days</option>
            <option value="7D">Last 7 Days</option>
            <option value="90D">Last 90 Days</option>
            <option value="ALL">All Time</option>
          </select>
        </div>

        {/* Filter Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenMoreFilters}
            className="h-8 px-3 rounded-md bg-white border border-line text-[11.5px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Filter className="w-3.5 h-3.5 text-slate-600" />
            <span>More Filters</span>
          </button>

          <button
            onClick={onClearAll}
            className="h-8 px-3 rounded-md bg-white border border-line text-[11.5px] font-semibold text-slate-600 hover:text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>

          <button
            onClick={onOpenSaveView}
            className="h-8 px-3 rounded-md bg-white border border-line text-[11.5px] font-semibold text-ink hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Bookmark className="w-3.5 h-3.5 text-slate-600" />
            <span>Save View</span>
          </button>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="h-8 px-3 rounded-md bg-[#671021] hover:bg-[#520d1a] text-white text-[11.5px] font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Quick Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pt-1">
        {QUICK_CHIP_OPTIONS.map((chip) => {
          const isSelected = filters.quickChips.includes(chip);
          return (
            <button
              key={chip}
              onClick={() => onToggleQuickChip(chip)}
              className={`h-6 px-2.5 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
                isSelected
                  ? "bg-[#671021] text-white shadow-xs"
                  : "bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200/70"
              }`}
            >
              {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
              <span>{chip}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
