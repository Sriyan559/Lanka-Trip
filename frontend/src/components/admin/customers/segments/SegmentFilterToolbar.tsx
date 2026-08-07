"use client";

import React from "react";
import { Search, Filter, RotateCcw, Bookmark, RefreshCw } from "lucide-react";

interface SegmentFilterToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedType: string;
  onTypeChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  selectedMembership: string;
  onMembershipChange: (val: string) => void;
  selectedConsent: string;
  onConsentChange: (val: string) => void;
  selectedRisk: string;
  onRiskChange: (val: string) => void;
  selectedOwner: string;
  onOwnerChange: (val: string) => void;
  selectedQuickFilter: string;
  onQuickFilterSelect: (val: string) => void;
  onClearAll: () => void;
  onRefresh: () => void;
}

export function SegmentFilterToolbar({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  selectedCategory,
  onCategoryChange,
  selectedMembership,
  onMembershipChange,
  selectedConsent,
  onConsentChange,
  selectedRisk,
  onRiskChange,
  selectedOwner,
  onOwnerChange,
  selectedQuickFilter,
  onQuickFilterSelect,
  onClearAll,
  onRefresh,
}: SegmentFilterToolbarProps) {
  const quickFilters = [
    { id: "assigned-to-me", label: "Assigned to Me" },
    { id: "active-segments", label: "Active Segments" },
    { id: "draft-segments", label: "Draft Segments" },
    { id: "pending-approval", label: "Pending Approval" },
    { id: "dynamic-segments", label: "Dynamic Segments" },
    { id: "loyalty-segments", label: "Loyalty Segments" },
    { id: "high-risk-segments", label: "High-Risk Segments" },
    { id: "missing-consent", label: "Missing Consent" },
    { id: "membership-conflicts", label: "Membership Conflicts" },
    { id: "revalidation-due", label: "Revalidation Due" },
  ];

  return (
    <div className="bg-white border border-line rounded-lg p-3 shadow-2xs mb-4 space-y-2.5">
      {/* Top Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {/* Search Input */}
        <div className="relative sm:col-span-2">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search segments by name, ID, owner..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-line rounded text-[11px] text-slate-800 focus:outline-none focus:border-[#671021] focus:bg-white"
          />
        </div>

        {/* Segment Type Dropdown */}
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="px-2.5 py-1.5 bg-slate-50 border border-line rounded text-[11px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
        >
          <option value="All">Segment Type: All</option>
          <option value="Dynamic">Dynamic</option>
          <option value="Static Group">Static Group</option>
          <option value="Lifecycle">Lifecycle</option>
          <option value="Value">Value</option>
          <option value="Loyalty">Loyalty</option>
          <option value="Behavioral">Behavioral</option>
          <option value="Risk Pool">Risk Pool</option>
        </select>

        {/* Segment Status Dropdown */}
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-2.5 py-1.5 bg-slate-50 border border-line rounded text-[11px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
        >
          <option value="All">Segment Status: All</option>
          <option value="Active">Active</option>
          <option value="Draft">Draft</option>
          <option value="Pending Approval">Pending Approval</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Conflict">Conflict</option>
          <option value="Retired">Retired</option>
        </select>

        {/* Membership Type Dropdown */}
        <select
          value={selectedMembership}
          onChange={(e) => onMembershipChange(e.target.value)}
          className="px-2.5 py-1.5 bg-slate-50 border border-line rounded text-[11px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
        >
          <option value="All">Membership Type: All</option>
          <option value="Inclusive">Inclusive</option>
          <option value="Exclusive">Exclusive</option>
        </select>

        {/* Consent Requirement Dropdown */}
        <select
          value={selectedConsent}
          onChange={(e) => onConsentChange(e.target.value)}
          className="px-2.5 py-1.5 bg-slate-50 border border-line rounded text-[11px] text-slate-700 font-medium focus:outline-none focus:border-[#671021]"
        >
          <option value="All">Consent: All</option>
          <option value="Eligible">Eligible</option>
          <option value="Partial">Partial</option>
          <option value="Not Eligible">Not Eligible</option>
        </select>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-line/60">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1 text-[10.5px] font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[10.5px] font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <Bookmark className="w-3 h-3" />
            <span>Save View</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded text-[10.5px] font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3 text-slate-500" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Quick Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pt-1">
        {quickFilters.map((f) => {
          const isActive = selectedQuickFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onQuickFilterSelect(f.id)}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap border transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#671021] text-white border-[#671021]"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
