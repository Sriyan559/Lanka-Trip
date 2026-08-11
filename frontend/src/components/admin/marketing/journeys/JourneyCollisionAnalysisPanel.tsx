"use client";

import React from "react";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";

export function JourneyCollisionAnalysisPanel({
  collision = [],
}: {
  collision: Array<{ name: string; overlappingCustomers: string; riskLevel: "Low" | "Medium" | "High" }>;
}) {
  return (
    <MarketingSectionCard
      title="Journey Overlap / Collision Analysis"
      footerLink={{
        label: "Open Collision Analysis",
        href: "/admin/marketing/journeys",
      }}
      className="h-full"
    >
      <div className="w-full font-sans text-[10px]">
        {/* CSS Grid Header */}
        <div className="grid grid-cols-[1.2fr_0.8fr_0.6fr] items-center gap-1 bg-gray-50/90 text-gray-400 font-bold border-b border-gray-100 uppercase tracking-tight py-1 px-1 text-[8.5px]">
          <span className="truncate">POTENTIAL OVERLAP</span>
          <span className="truncate">OVERLAPPING</span>
          <span className="truncate text-right">RISK</span>
        </div>

        {/* CSS Grid Body Rows */}
        <div className="divide-y divide-gray-100 font-medium text-[10px]">
          {collision.map((item) => (
            <div
              key={item.name}
              className="grid grid-cols-[1.2fr_0.8fr_0.6fr] items-center gap-1 py-1.5 px-1 hover:bg-gray-50/50"
            >
              <span className="font-bold text-gray-900 truncate" title={item.name}>
                {item.name}
              </span>
              <span className="font-mono text-gray-800 text-[9.5px]">
                {item.overlappingCustomers}
              </span>
              <span className="text-right">
                <span
                  className={`text-[8px] font-bold px-1.5 py-0.2 rounded ${
                    item.riskLevel === "High"
                      ? "bg-rose-100 text-rose-800"
                      : item.riskLevel === "Medium"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {item.riskLevel}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </MarketingSectionCard>
  );
}

export function JourneyExitAnalysisPanel({
  exitAnalysis = [],
}: {
  exitAnalysis: Array<{ code: string; count: string; percentage: number }>;
}) {
  return (
    <MarketingSectionCard title="Exit Analysis" className="h-full">
      <div className="flex flex-col gap-1 text-xs font-sans">
        <div className="grid grid-cols-[1fr_45px_40px] text-[8.5px] font-bold text-gray-400 uppercase tracking-tight border-b border-gray-100 pb-0.5">
          <span className="truncate">EXIT CODE</span>
          <span className="truncate">COUNT</span>
          <span className="text-right truncate">%</span>
        </div>

        {exitAnalysis.map((item) => (
          <div key={item.code} className="grid grid-cols-[1fr_45px_40px] text-[10px] items-center py-0.5">
            <span className="text-gray-700 font-medium truncate">{item.code}</span>
            <span className="font-mono text-gray-900 font-semibold text-[9.5px]">{item.count}</span>
            <span className="font-mono text-gray-500 text-right text-[9px]">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}

export function JourneyGovernancePanel({
  governance,
}: {
  governance: {
    approval: string;
    contentEligibility: string;
    frequencyCap: string;
    consentBasis: string;
    dataResidency: string;
    legalReview: string;
    healthScore: number;
  };
}) {
  return (
    <MarketingSectionCard title="Governance & Approvals" className="h-full">
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs font-sans">
        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">JOURNEY APPROVAL</span>
          <span className="font-bold text-emerald-700 text-[10px]">{governance.approval}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">CONTENT ELIGIBILITY</span>
          <span className="font-bold text-emerald-700 text-[10px]">{governance.contentEligibility}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">FREQUENCY CAP</span>
          <span className="font-bold text-amber-700 text-[10px]">{governance.frequencyCap}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">CONSENT BASIS</span>
          <span className="text-gray-700 text-[9px] truncate block">{governance.consentBasis}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">DATA RESIDENCY</span>
          <span className="font-bold text-emerald-700 text-[10px]">{governance.dataResidency}</span>
        </div>

        <div>
          <span className="text-gray-400 text-[8.5px] block font-bold uppercase">LEGAL REVIEW</span>
          <span className="font-bold text-emerald-700 text-[10px]">{governance.legalReview}</span>
        </div>

        <div className="col-span-2 pt-1 border-t border-gray-100 flex justify-between items-center">
          <span className="text-gray-400 text-[9px] font-bold uppercase">GOVERNANCE HEALTH</span>
          <span className="font-mono font-bold text-emerald-700 text-[10.5px]">{governance.healthScore}%</span>
        </div>
      </div>
    </MarketingSectionCard>
  );
}
