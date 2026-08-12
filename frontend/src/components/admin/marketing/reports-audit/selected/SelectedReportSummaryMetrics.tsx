"use client";

import React from "react";
import { SelectedReportRecord } from "@/data/marketingReportsAudit.mock";

interface SelectedReportSummaryMetricsProps {
  metrics: SelectedReportRecord["summaryMetrics"];
}

export function SelectedReportSummaryMetrics({ metrics }: SelectedReportSummaryMetricsProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs">
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 text-center text-xs">
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Last Generated</span>
          <span className="font-mono text-[11px] font-bold text-gray-900">{metrics.lastGenerated}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Generation Time</span>
          <span className="font-mono text-[11px] font-bold text-gray-800">{metrics.generationTime}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Data Completeness</span>
          <span className="font-extrabold text-emerald-700">{metrics.dataCompleteness}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Sections</span>
          <span className="font-extrabold text-gray-900">{metrics.sectionsCount}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Recipients</span>
          <span className="font-extrabold text-gray-900">{metrics.recipientsCount}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">File Size</span>
          <span className="font-mono text-[11px] font-bold text-gray-800">{metrics.fileSize}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Retention</span>
          <span className="font-mono text-[11px] font-bold text-gray-800">{metrics.retention}</span>
        </div>
        <div>
          <span className="text-[10px] text-gray-400 font-medium block">Report Health</span>
          <span className="font-extrabold text-emerald-700">{metrics.reportHealthScore}%</span>
        </div>
      </div>
    </div>
  );
}
