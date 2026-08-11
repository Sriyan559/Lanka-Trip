"use client";

import React from "react";
import { GovernanceReadinessCounters } from "@/data/marketingGovernance.mock";
import { RefreshCw, Save } from "lucide-react";

interface GovernanceReadinessStripProps {
  counters: GovernanceReadinessCounters;
  onClearAll: () => void;
  onRefresh: () => void;
}

export function GovernanceReadinessStrip({
  counters,
  onClearAll,
  onRefresh,
}: GovernanceReadinessStripProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
      {/* Left Badges Group */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold text-gray-800 text-xs mr-1">Governance Readiness & Health:</span>

        {/* Clear */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs">
          Clear <span className="font-bold text-emerald-700">{counters.clear}</span>
        </span>

        {/* Warning */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-xs">
          Warning <span className="font-bold text-amber-700">{counters.warning}</span>
        </span>

        {/* Review Required */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-orange-50 text-orange-800 border border-orange-200 font-semibold text-xs">
          Review Required <span className="font-bold text-orange-700">{counters.reviewRequired}</span>
        </span>

        {/* Blocked */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 font-semibold text-xs">
          Blocked <span className="font-bold text-rose-700">{counters.blocked}</span>
        </span>

        {/* Approval Pending */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-semibold text-xs">
          Approval Pending <span className="font-bold text-blue-700">{counters.approvalPending}</span>
        </span>

        {/* Consent Warning */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 font-semibold text-xs">
          Consent Warning <span className="font-bold text-purple-700">{counters.consentWarning}</span>
        </span>

        {/* Frequency Warning */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-orange-50 text-orange-800 border border-orange-200 font-semibold text-xs">
          Frequency Warning <span className="font-bold text-orange-700">{counters.frequencyWarning}</span>
        </span>

        {/* Content / Rights Review */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 font-semibold text-xs">
          Content / Rights Review <span className="font-bold text-purple-700">{counters.contentRightsReview}</span>
        </span>
      </div>

      {/* Right Controls Group */}
      <div className="flex flex-wrap items-center gap-2">
        <select className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-700 font-semibold focus:outline-none">
          <option>Default Governance View</option>
          <option>Approval Queue View</option>
          <option>Policy Violations View</option>
          <option>Exceptions & Approvals View</option>
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
      </div>
    </div>
  );
}
