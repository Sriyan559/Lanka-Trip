"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Bookmark, RefreshCw, X, SlidersHorizontal } from "lucide-react";
import { AudienceReadinessCounters } from "@/data/marketingAudience.mock";

export function AudienceToolbar({
  onSearchChange,
  onResetFilters,
}: {
  onSearchChange?: (val: string) => void;
  onResetFilters?: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearchChange) onSearchChange(e.target.value);
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-b-xl p-3 shadow-2xs font-sans flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[260px] max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search audience, segment, owner, rule, campaign..."
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#800020] focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                if (onSearchChange) onSearchChange("");
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-medium text-gray-700">
            <span className="text-gray-400 text-[10px] uppercase font-bold">Status:</span>
            <span>All Statuses</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-medium text-gray-700">
            <span className="text-gray-400 text-[10px] uppercase font-bold">Type:</span>
            <span>All Types</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-medium text-gray-700">
            <span className="text-gray-400 text-[10px] uppercase font-bold">Owner:</span>
            <span>All Owners</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-medium text-gray-700">
            <span className="text-gray-400 text-[10px] uppercase font-bold">BU:</span>
            <span>All Business Units</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1.5 rounded-lg text-xs font-medium text-gray-700">
            <span className="text-gray-400 text-[10px] uppercase font-bold">Brand:</span>
            <span>All Brands</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <button className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
            <span>More Filters</span>
          </button>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs font-bold text-[#800020] hover:underline"
            >
              Clear All
            </button>
          )}

          <button className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors shadow-2xs">
            <Bookmark className="w-3.5 h-3.5 text-gray-500" />
            <span>Save View</span>
          </button>

          <button className="p-1.5 text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Saved View Bar */}
      <div className="flex items-center gap-2 text-xs font-medium text-gray-600 pt-1 border-t border-gray-100">
        <span className="text-gray-400 text-[10px] font-bold uppercase">Saved View:</span>
        <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-gray-900 font-semibold text-[11px]">
          <span>Default Audience View</span>
          <ChevronDown className="w-3 h-3 text-gray-500" />
        </div>
        <Bookmark className="w-3.5 h-3.5 text-[#800020]" />
      </div>
    </div>
  );
}

export function AudienceReadinessStrip({
  readiness,
}: {
  readiness: AudienceReadinessCounters;
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h3 className="text-xs font-bold text-gray-900">Audience Readiness & Health</h3>
        <p className="text-[10.5px] text-gray-500 font-medium">
          Reusable customer audiences available for campaigns, journeys and channel activation.
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Ready <span className="font-mono text-emerald-900">{readiness.ready}</span>
        </span>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          Needs Refresh <span className="font-mono text-amber-900">{readiness.needsRefresh}</span>
        </span>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-orange-50 text-orange-800 border border-orange-200">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          Consent Warning <span className="font-mono text-orange-900">{readiness.consentWarning}</span>
        </span>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-50 text-rose-800 border border-rose-200">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          Suppression Risk <span className="font-mono text-rose-900">{readiness.suppressionRisk}</span>
        </span>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-purple-50 text-purple-800 border border-purple-200">
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          Low Match Rate <span className="font-mono text-purple-900">{readiness.lowMatchRate}</span>
        </span>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-800 border border-red-200">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          Rule Error <span className="font-mono text-red-900">{readiness.ruleError}</span>
        </span>
      </div>
    </div>
  );
}
