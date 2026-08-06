"use client";

import React from "react";
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";

interface ProductFormCompletenessSummaryProps {
  overallPercent: number;
  completedFields: number;
  totalRequiredFields: number;
  openValidationIssues: number;
  blockingIssuesCount: number;
  autosaveText: string;
}

export const ProductFormCompletenessSummary: React.FC<ProductFormCompletenessSummaryProps> = ({
  overallPercent,
  completedFields,
  totalRequiredFields,
  openValidationIssues,
  blockingIssuesCount,
  autosaveText,
}) => {
  return (
    <div className="bg-white rounded border border-gray-200 p-4 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
      {/* Overall Completeness */}
      <div className="flex-1 w-full">
        <div className="flex justify-between items-center text-[11px] font-bold mb-1.5">
          <span className="text-gray-500 uppercase tracking-wider text-[10px]">Overall Completeness</span>
          <span className="text-gray-900 font-black text-sm">{overallPercent}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      <div className="hidden md:block w-px h-10 bg-gray-200" />

      {/* Required Fields Completed */}
      <div className="flex-1 w-full text-center">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Required Fields Completed</div>
        <div className="text-2xl font-black text-gray-900 mt-0.5">
          {completedFields} <span className="text-xs font-semibold text-gray-400">/ {totalRequiredFields}</span>
        </div>
      </div>

      <div className="hidden md:block w-px h-10 bg-gray-200" />

      {/* Open Validation Issues */}
      <div className="flex-1 w-full text-center">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1">
          <AlertTriangle size={12} className="text-amber-500" />
          <span>Open Validation Issues</span>
        </div>
        <div className="text-2xl font-black text-amber-600 mt-0.5">{openValidationIssues}</div>
      </div>

      <div className="hidden md:block w-px h-10 bg-gray-200" />

      {/* Blocking Issues */}
      <div className="flex-1 w-full text-center">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1">
          <AlertCircle size={12} className="text-rose-600" />
          <span>Blocking Issues</span>
        </div>
        <div className="text-2xl font-black text-rose-600 mt-0.5">{blockingIssuesCount}</div>
      </div>

      <div className="hidden md:block w-px h-10 bg-gray-200" />

      {/* Autosave Indicator */}
      <div className="flex-1 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50/70 p-2 rounded border border-emerald-200">
        <CheckCircle2 size={15} className="text-emerald-600" />
        <span>{autosaveText}</span>
      </div>
    </div>
  );
};
