"use client";

import React from "react";
import {
  FileText,
  CheckCircle2,
  ShieldCheck,
  Clock,
  AlertTriangle,
  XCircle,
  HelpCircle,
  UserX,
  Copy,
  Ban,
  Archive,
} from "lucide-react";
import { BrandKpi } from "@/types/brandManagement";

interface BrandKpiGridProps {
  kpis: BrandKpi[];
  activeKpiId: string | null;
  onKpiClick: (kpiId: string) => void;
}

const KPI_ICONS: Record<string, React.ElementType> = {
  "kpi-1": FileText,
  "kpi-2": CheckCircle2,
  "kpi-3": ShieldCheck,
  "kpi-4": Clock,
  "kpi-5": AlertTriangle,
  "kpi-6": Clock,
  "kpi-7": XCircle,
  "kpi-8": HelpCircle,
  "kpi-9": UserX,
  "kpi-10": Copy,
  "kpi-11": Ban,
  "kpi-12": Archive,
};

export const BrandKpiGrid: React.FC<BrandKpiGridProps> = ({
  kpis,
  activeKpiId,
  onKpiClick,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {/* 2 Rows x 6 Cols Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {kpis.map((kpi) => {
          const Icon = KPI_ICONS[kpi.id] || FileText;
          const isActive = activeKpiId === kpi.id;

          return (
            <div
              key={kpi.id}
              onClick={() => onKpiClick(kpi.id)}
              className={`bg-white rounded border p-3 flex flex-col justify-between cursor-pointer transition-all shadow-2xs hover:border-gray-400 ${
                isActive
                  ? "border-[#741d35] ring-1 ring-[#741d35] bg-[#f5ebed]/20"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium mb-1">
                <span className="truncate pr-1" title={kpi.label}>
                  {kpi.label}
                </span>
                <Icon size={14} className={kpi.value === null ? "text-amber-500 shrink-0" : "text-gray-400 shrink-0"} />
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-lg font-bold text-gray-900 font-mono tracking-tight" title={kpi.value === null ? "Unavailable: no authoritative source" : undefined}>
                  {kpi.value === null ? "N/A" : kpi.value.toLocaleString()}
                </span>
                {kpi.trend !== null && <span
                  className={`text-[10px] font-bold ${
                    kpi.trend >= 0 ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {`${kpi.trend >= 0 ? "+" : ""}${kpi.trend}%`}
                </span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
