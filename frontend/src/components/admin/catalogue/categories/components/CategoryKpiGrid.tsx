"use client";

import React from "react";
import { CategoryKpiItem } from "@/types/categoryManagement";

interface CategoryKpiGridProps {
  kpis: CategoryKpiItem[];
  onSelectKpi: (filterKey: string) => void;
}

export const CategoryKpiGrid: React.FC<CategoryKpiGridProps> = ({
  kpis,
  onSelectKpi,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          onClick={() => onSelectKpi(kpi.filterKey)}
          className="bg-white rounded border border-gray-200 p-3 hover:border-gray-400 cursor-pointer transition-all shadow-2xs flex flex-col justify-between"
        >
          <div className="text-[10.5px] font-bold text-gray-500 truncate mb-1">{kpi.label}</div>

          <div className="flex items-baseline justify-between">
            <span className="text-lg font-black text-gray-900 tracking-tight">{kpi.value}</span>
            {kpi.changeText && (
              <span
                className={`text-[10px] font-extrabold ${
                  kpi.isPositive ? "text-emerald-700" : "text-rose-600"
                }`}
              >
                {kpi.changeText}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
