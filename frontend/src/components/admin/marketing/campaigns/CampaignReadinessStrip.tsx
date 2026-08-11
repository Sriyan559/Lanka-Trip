"use client";

import React from "react";
import { ReadinessCounter } from "@/data/campaignManagement.mock";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  DollarSign,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

const COUNTER_ICONS: Record<string, React.ElementType> = {
  "r-1": CheckCircle2,
  "r-2": AlertCircle,
  "r-3": XCircle,
  "r-4": DollarSign,
  "r-5": AlertTriangle,
  "r-6": ShieldAlert,
};

export function CampaignReadinessStrip({
  counters,
}: {
  counters: ReadinessCounter[];
}) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-2.5 sm:p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
      {/* Title */}
      <h3 className="text-xs sm:text-sm font-bold text-gray-900 shrink-0">
        Campaign Readiness & Exceptions
      </h3>

      {/* Horizontal Status Chips */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
        {counters.map((c) => {
          const IconComp = COUNTER_ICONS[c.id] || CheckCircle2;

          let badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
          let iconColor = "text-emerald-600";
          if (c.color === "orange") {
            badgeColor = "bg-amber-50 text-amber-800 border-amber-200";
            iconColor = "text-amber-600";
          } else if (c.color === "red") {
            badgeColor = "bg-rose-50 text-rose-800 border-rose-200";
            iconColor = "text-rose-600";
          }

          return (
            <div
              key={c.id}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${badgeColor}`}
            >
              <IconComp className={`w-3.5 h-3.5 ${iconColor}`} />
              <span className="text-gray-700">{c.label}</span>
              <span className="font-extrabold text-gray-900 ml-1">
                {c.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
