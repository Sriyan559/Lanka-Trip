"use client";

import React from "react";
import {
  Package,
  CheckCircle2,
  Clock,
  FileEdit,
  AlertCircle,
  Copy,
  ImageOff,
  ShieldAlert,
  Boxes,
  AlertTriangle,
  CalendarX,
  Ban,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { CatalogueKpi } from "@/types/catalogue";

const ICON_MAP: Record<string, React.ElementType> = {
  Package,
  CheckCircle2,
  Clock,
  FileEdit,
  AlertCircle,
  Copy,
  ImageOff,
  ShieldAlert,
  Boxes,
  AlertTriangle,
  CalendarX,
  Ban,
};

interface CatalogueKpiGridProps {
  kpis: CatalogueKpi[];
  activeFilter: string | null;
  onKpiClick: (filterKey: string) => void;
}

export const CatalogueKpiGrid: React.FC<CatalogueKpiGridProps> = ({
  kpis,
  activeFilter,
  onKpiClick,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {kpis.map((kpi) => {
        const IconComponent = ICON_MAP[kpi.iconName] || Package;
        const isActive = activeFilter === kpi.filterKey;

        return (
          <button
            key={kpi.id}
            onClick={() => onKpiClick(kpi.filterKey)}
            title={kpi.reason}
            disabled={kpi.availability === "unavailable"}
            className={`text-left bg-white rounded border p-3 flex flex-col justify-between transition-all duration-150 group shadow-xs hover:border-[#741d35] hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed ${
              isActive ? "ring-2 ring-[#741d35] border-transparent" : "border-gray-200"
            }`}
          >
            {/* Top row: Seq & Icon */}
            <div className="flex items-center justify-between mb-2">
              <div className="w-5 h-5 rounded-full bg-gray-100 group-hover:bg-[#f5ebed] text-gray-500 group-hover:text-[#741d35] flex items-center justify-center text-[10px] font-bold transition-colors">
                {kpi.seq}
              </div>
              <IconComponent size={16} className="text-[#741d35] transition-transform group-hover:scale-110" />
            </div>

            {/* Label */}
            <div className="text-[11px] font-medium text-gray-500 line-clamp-1 mb-1">
              {kpi.label}
            </div>

            {/* Value & Trend */}
            <div className="flex items-baseline justify-between gap-1 mt-auto">
              <span className="text-base font-extrabold text-gray-900 tracking-tight">
                {kpi.value}
              </span>
              <div
                className={`flex items-center gap-0.5 text-[10.5px] font-bold ${
                  kpi.isPositive ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {kpi.isPositive ? (
                  <TrendingUp size={11} className="shrink-0" />
                ) : (
                  <TrendingDown size={11} className="shrink-0" />
                )}
                <span>{kpi.trend}</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
