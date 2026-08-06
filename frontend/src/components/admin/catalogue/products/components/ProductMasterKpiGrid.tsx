"use client";

import React from "react";
import {
  Package,
  CheckCircle2,
  FileEdit,
  Clock,
  AlertCircle,
  Copy,
  ImageOff,
  ShieldAlert,
  Layers,
  Boxes,
  Globe,
  Archive,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { ProductKpi } from "@/types/productMaster";

interface ProductMasterKpiGridProps {
  kpis: ProductKpi[];
  activeFilter: string | null;
  onKpiClick: (filterKey: string) => void;
}

export const ProductMasterKpiGrid: React.FC<ProductMasterKpiGridProps> = ({
  kpis,
  activeFilter,
  onKpiClick,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Package":
        return <Package size={16} className="text-gray-600" />;
      case "CheckCircle2":
        return <CheckCircle2 size={16} className="text-emerald-600" />;
      case "FileEdit":
        return <FileEdit size={16} className="text-amber-600" />;
      case "Clock":
        return <Clock size={16} className="text-blue-600" />;
      case "AlertCircle":
        return <AlertCircle size={16} className="text-rose-600" />;
      case "Copy":
        return <Copy size={16} className="text-rose-700" />;
      case "ImageOff":
        return <ImageOff size={16} className="text-amber-600" />;
      case "ShieldAlert":
        return <ShieldAlert size={16} className="text-rose-600" />;
      case "Layers":
        return <Layers size={16} className="text-indigo-600" />;
      case "Boxes":
        return <Boxes size={16} className="text-emerald-600" />;
      case "Globe":
        return <Globe size={16} className="text-teal-600" />;
      case "Archive":
        return <Archive size={16} className="text-gray-500" />;
      default:
        return <Package size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {kpis.map((kpi) => {
        const isActive = activeFilter === kpi.filterKey;
        return (
          <div
            key={kpi.id}
            onClick={() => onKpiClick(kpi.filterKey)}
            className={`bg-white rounded p-3 cursor-pointer transition-all border shadow-2xs flex flex-col justify-between ${
              kpi.warningBorder
                ? "border-rose-300 hover:border-rose-500 bg-rose-50/20"
                : isActive
                ? "border-[#741d35] ring-1 ring-[#741d35]"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[11px] font-semibold text-gray-600 truncate">{kpi.label}</span>
              <div className="p-1 rounded bg-gray-50 shrink-0">{getIcon(kpi.iconName)}</div>
            </div>

            <div className="flex items-baseline justify-between mt-0.5">
              <span className="text-base font-extrabold text-gray-900 tracking-tight">{kpi.value}</span>
              {kpi.trend && (
                <div
                  className={`flex items-center gap-0.5 text-[10px] font-bold ${
                    kpi.isPositive ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {kpi.isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  <span>{kpi.trend}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
