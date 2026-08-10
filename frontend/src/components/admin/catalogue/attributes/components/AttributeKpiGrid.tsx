"use client";

import React from "react";
import {
  FileText,
  CheckCircle2,
  FolderTree,
  Layers,
  CheckSquare,
  AlertTriangle,
  XCircle,
  Barcode,
  HelpCircle,
  ImageOff,
  Tag,
  Copy,
} from "lucide-react";
import { AttributeKpi } from "@/types/attributeManagement";

interface AttributeKpiGridProps {
  kpis: AttributeKpi[];
  activeKpiId: string | null;
  onKpiClick: (kpiId: string) => void;
}

const KPI_ICONS: Record<string, React.ElementType> = {
  "kpi-1": FileText,
  "kpi-2": CheckCircle2,
  "kpi-3": FolderTree,
  "kpi-4": Layers,
  "kpi-5": CheckSquare,
  "kpi-6": AlertTriangle,
  "kpi-7": XCircle,
  "kpi-8": Copy,
  "kpi-9": Barcode,
  "kpi-10": HelpCircle,
  "kpi-11": ImageOff,
  "kpi-12": Tag,
};

// KPIs that are "issues" — amber or red warning
const WARNING_KPIS = new Set(["kpi-6", "kpi-7", "kpi-8", "kpi-9", "kpi-10", "kpi-11", "kpi-12"]);

export const AttributeKpiGrid: React.FC<AttributeKpiGridProps> = ({
  kpis,
  activeKpiId,
  onKpiClick,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 min-w-0">
      {kpis.map((kpi) => {
        const Icon = KPI_ICONS[kpi.id] || FileText;
        const isActive = activeKpiId === kpi.id;
        const isWarning = WARNING_KPIS.has(kpi.id);
        const isCritical = kpi.available !== false && kpi.trendUp === false && isWarning;
        const isAmber = kpi.isWarning && !isCritical;

        // Determine card background accent
        const cardBg = isActive
          ? "border-[#741d35] ring-1 ring-[#741d35]/30 bg-[#fdf2f4]"
          : isCritical
          ? "border-rose-200 bg-rose-50/40 hover:border-rose-300"
          : isAmber
          ? "border-amber-200 bg-amber-50/30 hover:border-amber-300"
          : "border-gray-200 bg-white hover:border-gray-300";

        const iconColor = isCritical
          ? "text-rose-500"
          : isAmber
          ? "text-amber-500"
          : "text-[#741d35]";

        const trendColor = kpi.trendUp
          ? "text-emerald-600"
          : kpi.isWarning
          ? "text-amber-600"
          : "text-rose-600";


        return (
          <div
            key={kpi.id}
            onClick={() => onKpiClick(kpi.id)}
            className={`rounded border p-3 flex flex-col justify-between cursor-pointer transition-all shadow-2xs ${cardBg}`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-[10.5px] text-gray-500 font-medium leading-tight pr-1" title={kpi.label}>
                {kpi.label}
              </span>
              <Icon size={14} className={`${iconColor} shrink-0`} />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-[17px] font-black text-gray-900 font-mono tracking-tight leading-none">
                {kpi.value === null ? "N/A" : kpi.value.toLocaleString()}
              </span>
              <span className={`text-[10px] font-bold ${trendColor}`}>
                {kpi.trend ?? (kpi.available === false ? "Unavailable" : "Live")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
