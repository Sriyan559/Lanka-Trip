"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Bookmark, RefreshCw, X } from "lucide-react";
import { JourneyReadinessCounters } from "@/data/customerJourneys.mock";

export function JourneyToolbar({
  onSearchChange,
  onResetFilters,
  onApplyFilters,
}: {
  onSearchChange?: (val: string) => void;
  onResetFilters?: () => void;
  onApplyFilters?: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearchChange) onSearchChange(e.target.value);
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-b-xl px-3 py-2 shadow-2xs font-sans flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search journeys..."
            className="w-full pl-8 pr-7 py-1 text-[11px] bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-[#800020] focus:bg-white transition-colors h-7"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                if (onSearchChange) onSearchChange("");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md text-[10px] font-medium text-gray-700 h-7">
            <span className="text-gray-400 font-bold uppercase text-[9px]">JOURNEY STATUS:</span>
            <span>All</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md text-[10px] font-medium text-gray-700 h-7">
            <span className="text-gray-400 font-bold uppercase text-[9px]">JOURNEY TYPE:</span>
            <span>All</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md text-[10px] font-medium text-gray-700 h-7">
            <span className="text-gray-400 font-bold uppercase text-[9px]">TRIGGER TYPE:</span>
            <span>All</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md text-[10px] font-medium text-gray-700 h-7">
            <span className="text-gray-400 font-bold uppercase text-[9px]">AUDIENCE:</span>
            <span>All</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md text-[10px] font-medium text-gray-700 h-7">
            <span className="text-gray-400 font-bold uppercase text-[9px]">CHANNEL:</span>
            <span>All</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md text-[10px] font-medium text-gray-700 h-7">
            <span className="text-gray-400 font-bold uppercase text-[9px]">OWNER:</span>
            <span>All</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md text-[10px] font-medium text-gray-700 h-7">
            <span className="text-gray-400 font-bold uppercase text-[9px]">BU:</span>
            <span>All</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md text-[10px] font-medium text-gray-700 h-7">
            <span className="text-gray-400 font-bold uppercase text-[9px]">GOVERNANCE:</span>
            <span>All</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md text-[10px] font-medium text-gray-700 h-7">
            <span className="text-gray-400 font-bold uppercase text-[9px]">LAST ACTIVITY:</span>
            <span>All</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
        </div>

        {/* Filter Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="text-[11px] font-bold text-[#800020] hover:underline px-1"
            >
              Clear All
            </button>
          )}

          <button className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-md transition-colors shadow-2xs h-7">
            <Bookmark className="w-3 h-3 text-gray-500" />
            <span>Save View</span>
          </button>

          <button className="p-1.5 text-gray-500 hover:text-gray-900 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors h-7 w-7 flex items-center justify-center">
            <RefreshCw className="w-3 h-3" />
          </button>

          <button
            onClick={onApplyFilters}
            className="inline-flex items-center justify-center px-3 py-1 text-[11px] font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-md shadow-2xs transition-colors h-7"
          >
            <span>Apply Filters</span>
          </button>
        </div>
      </div>

      {/* Saved View Bar */}
      <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-gray-600 pt-1 border-t border-gray-100">
        <span className="text-gray-400 text-[9px] font-bold uppercase">SAVED VIEW:</span>
        <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-gray-900 font-semibold text-[10px]">
          <span>Default Journey View</span>
          <ChevronDown className="w-3 h-3 text-gray-500" />
        </div>
        <Bookmark className="w-3 h-3 text-[#800020]" />
      </div>
    </div>
  );
}

export function JourneyReadinessStrip({
  readiness,
}: {
  readiness: JourneyReadinessCounters;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl px-3 py-2 shadow-2xs font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div>
        <h3 className="text-xs font-bold text-gray-900 leading-tight">Journey Readiness & Health</h3>
        <p className="text-[10px] text-gray-500 font-medium leading-tight">
          Operational execution readiness across lifecycle triggers, channels and governance rules.
        </p>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Running Healthy <span className="font-mono text-emerald-900 ml-0.5">{readiness.runningHealthy}</span>
        </span>

        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Needs Attention <span className="font-mono text-amber-900 ml-0.5">{readiness.needsAttention}</span>
        </span>

        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Review Required <span className="font-mono text-blue-900 ml-0.5">{readiness.reviewRequired}</span>
        </span>

        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-extrabold bg-orange-50 text-orange-800 border border-orange-200">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          Warning <span className="font-mono text-orange-900 ml-0.5">{readiness.warning}</span>
        </span>

        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-extrabold bg-rose-50 text-rose-800 border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          Blocked <span className="font-mono text-rose-900 ml-0.5">{readiness.blocked}</span>
        </span>

        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Clear <span className="font-mono text-emerald-900 ml-0.5">{readiness.clear}</span>
        </span>
      </div>
    </div>
  );
}
