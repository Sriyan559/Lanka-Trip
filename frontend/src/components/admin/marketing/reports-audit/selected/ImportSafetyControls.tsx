"use client";

import React from "react";
import { ImportSafetyControlsData } from "@/data/marketingReportsAudit.mock";

interface ImportSafetyControlsProps {
  safetyControls: ImportSafetyControlsData;
}

export function ImportSafetyControls({ safetyControls }: ImportSafetyControlsProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          14. Import Safety Controls
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px] items-center">
            <span className="text-gray-500 font-medium">Dry Run Required</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {safetyControls.dryRunRequired ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex justify-between text-[11px] items-center">
            <span className="text-gray-500 font-medium">Duplicate Detection</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {safetyControls.duplicateDetection ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex justify-between text-[11px] items-center">
            <span className="text-gray-500 font-medium">Rollback Enabled</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {safetyControls.rollbackEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex justify-between text-[11px] items-center">
            <span className="text-gray-500 font-medium">Quarantine Mode</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {safetyControls.quarantineMode ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex justify-between text-[11px] items-center">
            <span className="text-gray-500 font-medium">Business Rules Engine</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {safetyControls.businessRulesEngine ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex justify-between text-[11px] items-center">
            <span className="text-gray-500 font-medium">Approval Required</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {safetyControls.approvalRequired ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
