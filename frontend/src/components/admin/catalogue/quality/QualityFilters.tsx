"use client";

import React from "react";
import { Search, RotateCcw, Bookmark, RefreshCw, SlidersHorizontal, Check, X } from "lucide-react";
import { QualityFilterState } from "@/types/catalogueQuality";

interface QualityFiltersProps {
  filters: QualityFilterState;
  onChange: (updated: Partial<QualityFilterState>) => void;
  onToggleQuickChip: (chip: string) => void;
  onClearAll: () => void;
  onOpenSaveView: () => void;
  onOpenMoreFilters: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function QualityFilters({
  filters,
  onChange,
  onToggleQuickChip,
  onClearAll,
  onOpenSaveView,
  onOpenMoreFilters,
  onRefresh,
  isRefreshing,
}: QualityFiltersProps) {
  const quickChips = [
    { label: "Assigned to Me", icon: "user" },
    { label: "Critical", icon: "alert" },
    { label: "Duplicate Conflict", icon: "copy" },
    { label: "Publication Blocked", icon: "ban" },
    { label: "SLA Breach", icon: "clock" },
    { label: "Compliance Risk", icon: "shield" },
  ];

  return (
    <div className="bg-white border border-line rounded-lg p-3.5 shadow-sm mb-4 space-y-3">
      {/* Top Controls Row */}
      <div className="flex flex-wrap items-center gap-2 text-[12px]">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search product, SKU, barcode, brand, category, media, issue or case ID..."
            value={filters.searchQuery}
            onChange={(e) => onChange({ searchQuery: e.target.value })}
            className="w-full h-8 pl-9 pr-3 rounded border border-line text-[11.5px] font-medium text-ink placeholder:text-slate-400 focus:outline-none focus:border-[#671021]"
          />
        </div>

        {/* Issue Type Filter */}
        <select
          value={filters.issueType}
          onChange={(e) => onChange({ issueType: e.target.value })}
          className="h-8 px-2.5 bg-slate-50 border border-line rounded font-semibold text-slate-700 text-[11px] focus:outline-none cursor-pointer"
        >
          <option value="All">Issue Type: All</option>
          <option value="Possible Duplicate Product">Possible Duplicate Product</option>
          <option value="Duplicate Barcode Conflict">Duplicate Barcode Conflict</option>
          <option value="Missing Mandatory Media">Missing Mandatory Media</option>
          <option value="Classification Conflict">Classification Conflict</option>
          <option value="Publication Blocker">Publication Blocker</option>
          <option value="Incomplete Safety Data">Incomplete Safety Data</option>
        </select>

        {/* Severity Filter */}
        <select
          value={filters.severity}
          onChange={(e) => onChange({ severity: e.target.value })}
          className="h-8 px-2.5 bg-slate-50 border border-line rounded font-semibold text-slate-700 text-[11px] focus:outline-none cursor-pointer"
        >
          <option value="All">Severity: All</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => onChange({ status: e.target.value })}
          className="h-8 px-2.5 bg-slate-50 border border-line rounded font-semibold text-slate-700 text-[11px] focus:outline-none cursor-pointer"
        >
          <option value="All">Status: All</option>
          <option value="New">New</option>
          <option value="In Review">In Review</option>
          <option value="Pending Review">Pending Review</option>
          <option value="Pending Merge Review">Pending Merge Review</option>
          <option value="In Progress">In Progress</option>
          <option value="Escalated">Escalated</option>
          <option value="Resolved">Resolved</option>
        </select>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className="h-8 px-2.5 bg-slate-50 border border-line rounded font-semibold text-slate-700 text-[11px] focus:outline-none cursor-pointer"
        >
          <option value="All">Category: All</option>
          <option value="Skincare">Skincare</option>
          <option value="Makeup">Makeup</option>
          <option value="Hair Care">Hair Care</option>
          <option value="Fragrance">Fragrance</option>
        </select>

        {/* Brand Filter */}
        <select
          value={filters.brand}
          onChange={(e) => onChange({ brand: e.target.value })}
          className="h-8 px-2.5 bg-slate-50 border border-line rounded font-semibold text-slate-700 text-[11px] focus:outline-none cursor-pointer"
        >
          <option value="All">Brand: All</option>
          <option value="Estée Lauder">Estée Lauder</option>
          <option value="Chanel Beauty">Chanel Beauty</option>
          <option value="Shiseido">Shiseido</option>
          <option value="Neutrogena">Neutrogena</option>
          <option value="MAC Cosmetics">MAC Cosmetics</option>
        </select>

        {/* Channel Filter */}
        <select
          value={filters.channel}
          onChange={(e) => onChange({ channel: e.target.value })}
          className="h-8 px-2.5 bg-slate-50 border border-line rounded font-semibold text-slate-700 text-[11px] focus:outline-none cursor-pointer"
        >
          <option value="All">Channel: All</option>
          <option value="Marketplace">Marketplace</option>
          <option value="Mobile App">Mobile App</option>
          <option value="B2B">B2B Wholesale</option>
        </select>

        {/* Owner Filter */}
        <select
          value={filters.owner}
          onChange={(e) => onChange({ owner: e.target.value })}
          className="h-8 px-2.5 bg-slate-50 border border-line rounded font-semibold text-slate-700 text-[11px] focus:outline-none cursor-pointer"
        >
          <option value="All">Owner: All</option>
          <option value="Elena Vance">Elena Vance</option>
          <option value="Marcus Lee">Marcus Lee</option>
          <option value="Priya Kapoor">Priya Kapoor</option>
        </select>

        {/* More Filters */}
        <button
          onClick={onOpenMoreFilters}
          className="h-8 px-2.5 rounded border border-line bg-white text-slate-700 font-semibold text-[11px] hover:bg-slate-50 flex items-center gap-1"
        >
          <SlidersHorizontal size={12} />
          <span>More Filters</span>
        </button>

        {/* Action Buttons */}
        <button
          onClick={onClearAll}
          className="h-8 px-2 rounded text-[#671021] font-bold text-[11px] hover:underline"
        >
          Clear All
        </button>

        <button
          onClick={onOpenSaveView}
          className="h-8 px-2.5 rounded border border-line bg-white text-slate-700 font-semibold text-[11px] hover:bg-slate-50 flex items-center gap-1"
        >
          <Bookmark size={12} />
          <span>Save View</span>
        </button>

        <button
          onClick={onRefresh}
          className="h-8 px-3 rounded bg-[#671021] text-white font-bold text-[11px] hover:bg-[#520d1a] flex items-center gap-1 shadow-xs"
        >
          <RefreshCw size={12} className={isRefreshing ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Quick Filter Chips Row */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100 text-[10.5px]">
        <span className="text-slate-400 font-medium mr-1">Quick Filters:</span>
        {quickChips.map((chip) => {
          const isSelected = filters.quickChips.includes(chip.label);
          return (
            <button
              key={chip.label}
              onClick={() => onToggleQuickChip(chip.label)}
              className={`px-2.5 py-0.5 rounded-full font-bold transition-colors flex items-center gap-1 border ${
                isSelected
                  ? "bg-[#671021] text-white border-[#671021]"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <span>{chip.label}</span>
              {isSelected && <X size={11} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
