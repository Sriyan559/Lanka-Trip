"use client";

import React from "react";
import { SegmentMetric } from "@/types/customer-segments";
import {
  Users,
  CheckCircle2,
  FileText,
  Clock,
  Calendar,
  Layers,
  Sparkles,
  AlertTriangle,
  UserCheck,
  AlertCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface SegmentKpiGridProps {
  metrics: SegmentMetric[];
}

export function SegmentKpiGrid({ metrics }: SegmentKpiGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2.5 mb-4">
      {metrics.map((m) => {
        const isPositive = m.trend === "up";
        const IconComponent = getMetricIcon(m.id);

        return (
          <div
            key={m.id}
            className="bg-white border border-line rounded-lg p-2.5 shadow-2xs hover:border-slate-300 transition-colors flex flex-col justify-between"
          >
            {/* Top Row: Icon + Title */}
            <div className="flex items-center gap-1.5 mb-1">
              <IconComponent className="w-3.5 h-3.5 text-[#671021] flex-shrink-0" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight truncate font-mono">
                {m.title}
              </span>
            </div>

            {/* Value */}
            <div className="text-[17px] font-black text-ink font-mono leading-tight my-0.5">
              {m.value}
            </div>

            {/* Trend Footer */}
            <div className="flex items-center gap-1 text-[9.5px]">
              <span
                className={`inline-flex items-center font-bold font-mono ${
                  isPositive ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                ) : (
                  <TrendingDown className="w-2.5 h-2.5 mr-0.5" />
                )}
                {isPositive ? `▲` : `▼`} {Math.abs(m.changePct)}%
              </span>
              <span className="text-slate-400 truncate">{m.comparisonText}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getMetricIcon(id: string) {
  switch (id) {
    case "total-segments":
      return Layers;
    case "active-segments":
      return CheckCircle2;
    case "draft-segments":
      return FileText;
    case "pending-approval":
      return Clock;
    case "scheduled-recalcs":
      return Calendar;
    case "static-groups":
      return Users;
    case "dynamic-segments":
      return Sparkles;
    case "segment-conflicts":
      return AlertTriangle;
    case "multi-segment-customers":
      return UserCheck;
    case "stale-segments":
      return AlertCircle;
    case "revalidation-due":
      return RefreshCw;
    case "membership-changes":
      return Users;
    default:
      return Layers;
  }
}
