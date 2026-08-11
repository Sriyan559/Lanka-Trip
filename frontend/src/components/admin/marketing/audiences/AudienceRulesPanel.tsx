"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";

export function AudienceRulesPanel({
  rules = [],
}: {
  rules: Array<{ category: string; percentage: number }>;
}) {
  return (
    <MarketingSectionCard
      title="Audience Rules (v12)"
      footerLink={{
        label: "Edit Rules",
        href: "/admin/marketing/audiences",
      }}
      className="h-full"
    >
      <div className="flex flex-col gap-1.5 font-sans text-xs">
        <span className="text-gray-400 font-bold uppercase text-[9px] tracking-tight">Primary Interest</span>
        {rules.map((item) => (
          <div key={item.category} className="flex items-center gap-2">
            <span className="w-16 text-[10.5px] font-semibold text-gray-700 truncate">{item.category}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="w-7 text-right font-mono font-bold text-gray-900 text-[10px]">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}

export function AudienceFreshnessPanel({
  freshness,
}: {
  freshness: {
    refreshMode: string;
    frequency: string;
    lastRecalc: string;
    duration: string;
    nextRefresh: string;
    sourceHealth: string;
    ruleEvaluation: string;
    identityResolution: string;
    freshness: string;
  };
}) {
  return (
    <MarketingSectionCard
      title="Refresh & Freshness"
      footerLink={{
        label: "View Refresh History",
        href: "/admin/marketing/audiences",
      }}
      className="h-full"
    >
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs font-sans">
        <div>
          <span className="text-gray-400 text-[9px] block">Refresh Mode</span>
          <span className="font-semibold text-emerald-700">{freshness.refreshMode}</span>
        </div>
        <div>
          <span className="text-gray-400 text-[9px] block">Frequency</span>
          <span className="font-semibold text-gray-900">{freshness.frequency}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[9px] block">Last Recalculation</span>
          <span className="font-mono font-bold text-gray-900 text-[10.5px]">{freshness.lastRecalc}</span>
        </div>
        <div>
          <span className="text-gray-400 text-[9px] block">Duration</span>
          <span className="font-mono text-gray-700 text-[10.5px]">{freshness.duration}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[9px] block">Next Refresh</span>
          <span className="font-mono text-gray-700 text-[10.5px]">{freshness.nextRefresh}</span>
        </div>
        <div>
          <span className="text-gray-400 text-[9px] block">Source Health</span>
          <span className="font-bold text-emerald-700">{freshness.sourceHealth}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[9px] block">Rule Evaluation</span>
          <span className="font-bold text-emerald-700">{freshness.ruleEvaluation}</span>
        </div>
        <div>
          <span className="text-gray-400 text-[9px] block">Identity Res.</span>
          <span className="font-mono font-bold text-gray-900">{freshness.identityResolution}</span>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
