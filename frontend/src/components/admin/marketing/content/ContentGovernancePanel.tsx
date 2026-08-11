"use client";

import React from "react";
import { GovernanceCheck, ContentExceptionItem } from "@/data/marketingContent.mock";
import { MarketingSectionCard } from "../shared/MarketingSectionCard";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export function ContentGovernancePanel({
  checks = [],
  healthScore = 98,
}: {
  checks: GovernanceCheck[];
  healthScore?: number;
}) {
  return (
    <MarketingSectionCard title="10. Governance & Compliance" className="h-full">
      <div className="flex flex-col gap-1.5 font-sans text-xs">
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px]">
          {checks.map((c) => (
            <div key={c.name} className="flex justify-between items-center py-0.5">
              <span className="text-gray-700 font-medium truncate">{c.name}</span>
              <span className="text-emerald-700 font-bold text-[9px] flex items-center gap-0.5 shrink-0">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                {c.status}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-1.5 border-t border-gray-100 flex justify-between items-center text-[10.5px]">
          <span className="text-gray-400 font-bold uppercase text-[9px]">GOVERNANCE HEALTH</span>
          <span className="font-mono font-bold text-emerald-700">{healthScore}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
          <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${healthScore}%` }} />
        </div>
      </div>
    </MarketingSectionCard>
  );
}

export function ContentExceptionsPanel({
  exceptions = [],
}: {
  exceptions: ContentExceptionItem[];
}) {
  return (
    <MarketingSectionCard title="11. Content Exceptions" className="h-full">
      <div className="divide-y divide-gray-100 font-sans text-xs">
        {exceptions.map((ex, idx) => (
          <div key={idx} className="py-1.5 flex items-center justify-between text-[10px]">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="font-bold text-gray-900 truncate" title={ex.title}>
                {ex.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span
                className={`text-[8px] font-bold px-1.5 py-0.2 rounded ${
                  ex.severity === "Critical"
                    ? "bg-rose-100 text-rose-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {ex.severity}
              </span>

              <button className="text-[9px] font-bold text-[#800020] hover:underline">
                {ex.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </MarketingSectionCard>
  );
}
