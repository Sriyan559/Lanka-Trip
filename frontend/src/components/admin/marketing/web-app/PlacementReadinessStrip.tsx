"use client";

import React from "react";
import { PlacementReadinessCounters } from "@/data/marketingWebApp.mock";
import { RefreshCw, Save } from "lucide-react";

interface PlacementReadinessStripProps {
  counters: PlacementReadinessCounters;
  onClearAll: () => void;
  onRefresh: () => void;
  onApplyFilters: () => void;
}

export function PlacementReadinessStrip({
  counters,
  onClearAll,
  onRefresh,
  onApplyFilters,
}: PlacementReadinessStripProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Left Badges Group */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold text-gray-800 text-xs mr-1">Placement Readiness & Health</span>

        {/* Healthy */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs">
          Healthy <span className="font-bold text-emerald-700">{counters.healthy}</span>
        </span>

        {/* Needs Attention */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-xs">
          Needs Attention <span className="font-bold text-amber-700">{counters.needsAttention}</span>
        </span>

        {/* Content Missing */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-orange-50 text-orange-800 border border-orange-200 font-semibold text-xs">
          Content Missing <span className="font-bold text-orange-700">{counters.contentMissing}</span>
        </span>

        {/* Placement Conflict */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 font-semibold text-xs">
          Placement Conflict <span className="font-bold text-rose-700">{counters.placementConflict}</span>
        </span>

        {/* Audience Warning */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-xs">
          Audience Warning <span className="font-bold text-amber-700">{counters.audienceWarning}</span>
        </span>

        {/* Governance Review */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold text-xs">
          Governance Review <span className="font-bold text-indigo-700">{counters.governanceReview}</span>
        </span>

        {/* Rendering Error */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 font-semibold text-xs">
          Rendering Error <span className="font-bold text-rose-700">{counters.renderingError}</span>
        </span>
      </div>

      {/* Right Controls Group */}
      <div className="flex flex-wrap items-center gap-2">
        <select className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-700 font-semibold focus:outline-none">
          <option>Default Placement View</option>
          <option>Homepage Placements Only</option>
          <option>High Impression Spots</option>
          <option>Conflict Watch</option>
        </select>

        <button
          onClick={onClearAll}
          className="px-2.5 py-1 text-xs font-semibold text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          Clear All
        </button>

        <button
          onClick={() => {}}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <Save className="w-3 h-3 text-gray-500" />
          <span>Save View</span>
        </button>

        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3 text-gray-500" />
          <span>Refresh</span>
        </button>

        <button
          onClick={onApplyFilters}
          className="px-3 py-1 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
