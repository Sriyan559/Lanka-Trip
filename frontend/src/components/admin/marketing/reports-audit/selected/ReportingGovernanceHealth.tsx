"use client";

import React from "react";
import { ReportingGovernanceHealthItem } from "@/data/marketingReportsAudit.mock";
import { CheckCircle2 } from "lucide-react";

interface ReportingGovernanceHealthProps {
  governanceHealth: {
    controls: ReportingGovernanceHealthItem[];
    overallScore: number;
  };
}

export function ReportingGovernanceHealth({ governanceHealth }: ReportingGovernanceHealthProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          21. Reporting Governance Health
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          {governanceHealth.controls.map((ctrl) => (
            <div key={ctrl.controlName} className="flex justify-between items-center text-[11px]">
              <span className="text-gray-700 font-medium">{ctrl.controlName}</span>
              <span className="flex items-center gap-1 font-bold text-emerald-700 text-[10px]">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {ctrl.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
        <span className="text-gray-500 font-semibold">Overall Governance Health</span>
        <span className="font-extrabold text-emerald-700">{governanceHealth.overallScore}%</span>
      </div>
    </div>
  );
}
