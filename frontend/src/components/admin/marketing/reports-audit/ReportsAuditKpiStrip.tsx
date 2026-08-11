"use client";

import React from "react";
import { ReportingKpiItem } from "@/data/marketingReportsAudit.mock";
import {
  FileText,
  Calendar,
  Download,
  Upload,
  Database,
  Layers,
  AlertTriangle,
  HeartPulse,
} from "lucide-react";

interface ReportsAuditKpiStripProps {
  kpis: ReportingKpiItem[];
}

export function ReportsAuditKpiStrip({ kpis }: ReportsAuditKpiStripProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "reports_generated":
        return <FileText className="w-4 h-4 text-rose-600 bg-rose-50 p-0.5 rounded" />;
      case "scheduled_reports":
        return <Calendar className="w-4 h-4 text-rose-600 bg-rose-50 p-0.5 rounded" />;
      case "export_jobs":
        return <Download className="w-4 h-4 text-blue-600 bg-blue-50 p-0.5 rounded" />;
      case "import_jobs":
        return <Upload className="w-4 h-4 text-rose-600 bg-rose-50 p-0.5 rounded" />;
      case "records_exported":
        return <Database className="w-4 h-4 text-rose-600 bg-rose-50 p-0.5 rounded" />;
      case "records_imported":
        return <Layers className="w-4 h-4 text-rose-600 bg-rose-50 p-0.5 rounded" />;
      case "transfer_exceptions":
        return <AlertTriangle className="w-4 h-4 text-rose-600 bg-rose-50 p-0.5 rounded" />;
      case "reporting_health":
        return <HeartPulse className="w-4 h-4 text-emerald-600 bg-emerald-50 p-0.5 rounded" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500 bg-gray-50 p-0.5 rounded" />;
    }
  };

  const getValueColor = (variant: ReportingKpiItem["variant"]) => {
    switch (variant) {
      case "green":
        return "text-emerald-600 font-bold";
      case "blue":
        return "text-blue-600 font-bold";
      case "red":
      default:
        return "text-rose-600 font-bold";
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2.5 w-full">
      {kpis.map((kpi) => (
        <div
          key={kpi.id}
          className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-gray-500 leading-tight">
              {kpi.label}
            </span>
            {getIcon(kpi.id)}
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className={`text-xl sm:text-2xl tracking-tight ${getValueColor(kpi.variant)}`}>
                {kpi.value}
              </span>
            </div>
            {kpi.subtext && (
              <div className="mt-0.5 text-[10px] font-medium text-rose-600">
                <span>{kpi.subtext}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
