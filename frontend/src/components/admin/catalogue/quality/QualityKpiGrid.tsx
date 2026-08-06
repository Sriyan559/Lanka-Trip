"use client";

import React from "react";
import {
  ShieldCheck,
  FileWarning,
  AlertTriangle,
  Copy,
  Barcode,
  QrCode,
  FileText,
  ImageOff,
  Layers,
  Ban,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { MOCK_QUALITY_KPIS } from "@/data/catalogueQuality.mock";

interface QualityKpiGridProps {
  onFilterClick?: (type: string, value: string) => void;
}

export function QualityKpiGrid({ onFilterClick }: QualityKpiGridProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "ShieldCheck":
        return <ShieldCheck size={16} className="text-emerald-600" />;
      case "FileWarning":
        return <FileWarning size={16} className="text-sky-600" />;
      case "AlertTriangle":
        return <AlertTriangle size={16} className="text-rose-600" />;
      case "Copy":
        return <Copy size={16} className="text-purple-600" />;
      case "Barcode":
        return <Barcode size={16} className="text-amber-600" />;
      case "QrCode":
        return <QrCode size={16} className="text-cyan-600" />;
      case "FileText":
        return <FileText size={16} className="text-rose-600" />;
      case "ImageOff":
        return <ImageOff size={16} className="text-amber-600" />;
      case "Layers":
        return <Layers size={16} className="text-sky-600" />;
      case "Ban":
        return <Ban size={16} className="text-rose-600" />;
      case "CheckCircle2":
        return <CheckCircle2 size={16} className="text-emerald-600" />;
      case "Clock":
        return <Clock size={16} className="text-purple-600" />;
      default:
        return <FileWarning size={16} className="text-slate-500" />;
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
      {MOCK_QUALITY_KPIS.map((kpi) => {
        return (
          <div
            key={kpi.id}
            onClick={() => {
              if (onFilterClick && kpi.filterType && kpi.filterValue) {
                onFilterClick(kpi.filterType, kpi.filterValue);
              }
            }}
            className="bg-white border border-line rounded-lg p-3 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between h-[82px] min-w-0"
          >
            {/* Top Label & Icon */}
            <div className="flex items-center justify-between gap-1">
              <span
                className="text-[11px] font-medium text-slate-600 truncate"
                title={kpi.label}
              >
                {kpi.label}
              </span>
              <div className="p-1 rounded bg-slate-50 flex-shrink-0">
                {getIcon(kpi.iconName)}
              </div>
            </div>

            {/* Value & Trend Row */}
            <div className="flex items-baseline justify-between gap-1 mt-1">
              <span className="text-[18px] font-black text-ink tracking-tight font-mono">
                {kpi.value}
              </span>

              {kpi.trend && (
                <div
                  className={`flex items-center gap-0.5 text-[10px] font-bold ${
                    kpi.trendDirection === "up" && kpi.colorState === "positive"
                      ? "text-emerald-600"
                      : kpi.trendDirection === "down" && kpi.colorState === "negative"
                      ? "text-rose-600"
                      : kpi.trendDirection === "up" && kpi.colorState === "negative"
                      ? "text-rose-600"
                      : "text-emerald-600"
                  }`}
                >
                  {kpi.trendDirection === "up" ? (
                    <TrendingUp size={11} />
                  ) : (
                    <TrendingDown size={11} />
                  )}
                  <span>{kpi.trend}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
