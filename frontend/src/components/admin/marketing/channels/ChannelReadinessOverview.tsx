"use client";

import React from "react";
import { ChannelReadinessCounters } from "@/data/marketingChannels.mock";
import { RefreshCw, Save } from "lucide-react";

interface ChannelReadinessOverviewProps {
  counters: ChannelReadinessCounters;
  onClearAll: () => void;
  onRefresh: () => void;
  onApplyFilters: () => void;
}

export function ChannelReadinessOverview({
  counters,
  onClearAll,
  onRefresh,
  onApplyFilters,
}: ChannelReadinessOverviewProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Left Badges Group */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold text-gray-800 text-xs mr-1">Readiness Overview</span>

        {/* Healthy */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs">
          Healthy <span className="font-bold text-emerald-700">{counters.healthy}</span>
        </span>

        {/* Warning */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-xs">
          Warning <span className="font-bold text-amber-700">{counters.warning}</span>
        </span>

        {/* Degraded */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-orange-50 text-orange-800 border border-orange-200 font-semibold text-xs">
          Degraded <span className="font-bold text-orange-700">{counters.degraded}</span>
        </span>

        {/* Disconnected */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200 font-semibold text-xs">
          Disconnected <span className="font-bold text-gray-700">{counters.disconnected}</span>
        </span>

        {/* Sender Verification Issue */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 font-semibold text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
          Sender Verification Issue <span className="font-bold text-rose-700">{counters.senderVerificationIssue}</span>
        </span>

        {/* Provider Warning */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          Provider Warning <span className="font-bold text-amber-700">{counters.providerWarning}</span>
        </span>

        {/* Queue Delay */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-xs">
          Queue Delay <span className="font-bold text-amber-700">{counters.queueDelay}</span>
        </span>
      </div>

      {/* Right Actions Group */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Default Channel View dropdown */}
        <select className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-700 font-semibold focus:outline-none">
          <option>Default Channel View</option>
          <option>Email & SMS Only</option>
          <option>High Volume Channels</option>
          <option>Critical Failure Watch</option>
        </select>

        {/* Clear All */}
        <button
          onClick={onClearAll}
          className="px-2.5 py-1 text-xs font-semibold text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          Clear All
        </button>

        {/* Save View */}
        <button
          onClick={() => {}}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <Save className="w-3 h-3 text-gray-500" />
          <span>Save View</span>
        </button>

        {/* Refresh */}
        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3 text-gray-500" />
          <span>Refresh</span>
        </button>

        {/* Apply Filters (Crimson Primary) */}
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
