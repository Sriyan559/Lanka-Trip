"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SelectedJourneyDetails } from "@/data/customerJourneys.mock";
import { ExternalLink } from "lucide-react";

export function SelectedJourneySummary({
  details,
}: {
  details: SelectedJourneyDetails;
}) {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = [
    "Overview",
    "Flow",
    "Audience",
    "Triggers",
    "Channels",
    "Performance",
    "Exceptions",
    "Governance",
    "Execution History",
    "Audit",
  ];

  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs font-sans flex flex-col gap-3">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-sm sm:text-base font-extrabold text-gray-900 tracking-tight">
            Selected Journey — {details.name}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/admin/marketing/journeys/${details.code}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#800020] hover:bg-[#66001a] rounded-lg transition-colors shadow-2xs"
          >
            <span>Open Journey Detail</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Selected Journey Sub-tabs */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-1 text-xs font-bold no-scrollbar overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`pb-1 text-[11px] transition-colors relative ${
              activeTab === t
                ? "text-[#800020] border-b-2 border-[#800020]"
                : "text-gray-500 hover:text-gray-900 border-b-2 border-transparent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 8 KPI Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 divide-x divide-gray-100 text-xs pt-1">
        <div className="flex flex-col pl-1">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Active Customers
          </span>
          <span className="text-base font-extrabold text-gray-900 mt-0.5 font-mono">
            {details.activeCustomers}
          </span>
        </div>

        <div className="flex flex-col pl-3">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Entries 24h
          </span>
          <span className="text-base font-extrabold text-gray-900 mt-0.5 font-mono">
            {details.entries24h}
          </span>
        </div>

        <div className="flex flex-col pl-3">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Completed 24h
          </span>
          <span className="text-base font-extrabold text-gray-900 mt-0.5 font-mono">
            {details.completed24h}
          </span>
        </div>

        <div className="flex flex-col pl-3">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Conversion
          </span>
          <span className="text-base font-extrabold text-emerald-700 mt-0.5 font-mono">
            {details.conversion}
          </span>
        </div>

        <div className="flex flex-col pl-3">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Recovered Revenue
          </span>
          <span className="text-base font-extrabold text-gray-900 mt-0.5 font-mono">
            {details.recoveredRevenue}
          </span>
        </div>

        <div className="flex flex-col pl-3">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Average Time in Journey
          </span>
          <span className="text-base font-extrabold text-gray-700 mt-0.5 font-mono">
            {details.avgTimeInJourney}
          </span>
        </div>

        <div className="flex flex-col pl-3">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Exceptions
          </span>
          <span className="text-base font-extrabold text-amber-700 mt-0.5 font-mono">
            {details.exceptionsCount}
          </span>
        </div>

        <div className="flex flex-col pl-3">
          <span className="text-[9.5px] font-bold uppercase tracking-tight text-gray-400">
            Health
          </span>
          <span className="text-base font-extrabold text-emerald-700 mt-0.5 flex items-center gap-1 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {details.healthScore}%
          </span>
        </div>
      </div>
    </div>
  );
}
