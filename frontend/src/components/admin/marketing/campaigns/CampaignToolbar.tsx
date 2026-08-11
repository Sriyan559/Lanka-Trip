"use client";

import React from "react";
import { Search, ChevronDown, RefreshCw, Bookmark } from "lucide-react";

interface CampaignToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onClearAll: () => void;
  onRefresh?: () => void;
}

export function CampaignToolbar({
  searchQuery,
  onSearchChange,
  onClearAll,
  onRefresh,
}: CampaignToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white p-2.5 rounded-xl border border-gray-200/80 shadow-2xs">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[240px] max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search campaign name, ID, owner, audience, channel..."
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#800020]"
        />
      </div>

      {/* Saved View Controls & Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        {/* Saved View dropdown */}
        <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-700">
          <span className="text-gray-400 text-[11px]">Saved View</span>
          <span className="font-bold text-gray-900">Default Campaign View</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </div>

        {/* Save View dropdown */}
        <button className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">
          <Bookmark className="w-3.5 h-3.5 text-gray-500" />
          <span>Save View</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>

        {/* Clear All */}
        <button
          onClick={onClearAll}
          className="text-gray-500 hover:text-gray-800 underline text-xs cursor-pointer px-1"
        >
          Clear All
        </button>

        {/* Darker Crimson Save View Button */}
        <button
          onClick={() => alert("Saving view parameters...")}
          className="px-3 py-1.5 bg-[#800020] hover:bg-[#66001a] text-white rounded-lg font-bold shadow-2xs cursor-pointer transition-colors"
        >
          Save View
        </button>

        {/* Refresh */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-1.5 text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg cursor-pointer"
            title="Refresh Table Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
