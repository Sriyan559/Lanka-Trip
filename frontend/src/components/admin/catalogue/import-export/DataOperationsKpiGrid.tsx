"use client";

import React from "react";
import {
  Download,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCheck2,
  FileX2,
  GitMerge,
  Copy,
  Upload,
  Calendar,
  ShieldAlert,
  Clock,
} from "lucide-react";
import { MOCK_C13_KPIS } from "@/data/importExport.mock";

interface DataOperationsKpiGridProps {
  onFilterClick?: (type: string, value: string) => void;
}

export function DataOperationsKpiGrid({ onFilterClick }: DataOperationsKpiGridProps) {
  const getIcon = (seq: number) => {
    switch (seq) {
      case 1:
        return Download;
      case 2:
        return CheckCircle2;
      case 3:
        return AlertTriangle;
      case 4:
        return XCircle;
      case 5:
        return FileCheck2;
      case 6:
        return FileX2;
      case 7:
        return GitMerge;
      case 8:
        return Copy;
      case 9:
        return Upload;
      case 10:
        return Calendar;
      case 11:
        return ShieldAlert;
      case 12:
        return Clock;
      default:
        return Download;
    }
  };

  const handleKpiClick = (seq: number, label: string) => {
    if (!onFilterClick) return;
    if (seq === 1 || seq === 2) onFilterClick("tab", "Imports");
    else if (seq === 3 || seq === 12) onFilterClick("tab", "Pending Review");
    else if (seq === 4) onFilterClick("tab", "Failed");
    else if (seq === 9) onFilterClick("tab", "Exports");
    else if (seq === 10) onFilterClick("tab", "Scheduled");
    else onFilterClick("chip", label);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-3 mb-4">
      {MOCK_C13_KPIS.map((kpi) => {
        const Icon = getIcon(kpi.seqNumber);
        return (
          <div
            key={kpi.id}
            onClick={() => handleKpiClick(kpi.seqNumber, kpi.label)}
            className="bg-white border border-line rounded-lg p-3 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-1 mb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-[10px] font-bold text-slate-400 font-mono flex-shrink-0">
                  {kpi.seqNumber}
                </span>
                <Icon size={14} className="text-slate-600 flex-shrink-0" />
                <span className="text-[11px] font-medium text-slate-600 truncate" title={kpi.label}>
                  {kpi.label}
                </span>
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2 mt-1">
              <span className="text-[20px] font-black text-ink tracking-tight font-mono">
                {kpi.value}
              </span>
              <div
                className={`flex items-center gap-0.5 text-[10px] font-bold ${
                  kpi.trendType === "positive"
                    ? "text-emerald-600"
                    : kpi.trendType === "warning"
                    ? "text-amber-600"
                    : "text-rose-600"
                }`}
              >
                <span>{kpi.trend}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
