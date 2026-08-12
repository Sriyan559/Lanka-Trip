"use client";

import React from "react";
import { ImportValidationMetrics } from "@/data/marketingReportsAudit.mock";

interface ImportValidationCardProps {
  validation: ImportValidationMetrics;
}

export function ImportValidationCard({ validation }: ImportValidationCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          11. Import Validation <span className="text-gray-400 font-normal">(Latest)</span>
        </h4>

        <div className="grid grid-cols-4 gap-2 text-center text-xs mt-2">
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Total Records</span>
            <span className="font-extrabold text-gray-900">{validation.totalRecords}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Valid</span>
            <span className="font-extrabold text-emerald-700">{validation.valid}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Warnings</span>
            <span className="font-extrabold text-amber-700">{validation.warnings}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Errors</span>
            <span className="font-extrabold text-rose-700">{validation.errors}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Duplicates</span>
            <span className="font-extrabold text-orange-700">{validation.duplicates}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Invalid</span>
            <span className="font-extrabold text-gray-700">{validation.invalid}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Validated</span>
            <span className="font-extrabold text-gray-900">{validation.validated}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-medium block">Success Rate</span>
            <span className="font-extrabold text-emerald-700">{validation.successRate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
