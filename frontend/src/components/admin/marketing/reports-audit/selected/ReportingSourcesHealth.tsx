"use client";

import React from "react";
import { ReportingSourceHealthItem } from "@/data/marketingReportsAudit.mock";
import { CheckCircle2 } from "lucide-react";

interface ReportingSourcesHealthProps {
  sources: ReportingSourceHealthItem[];
}

export function ReportingSourcesHealth({ sources }: ReportingSourcesHealthProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          22. Marketing Reporting Sources <span className="text-gray-400 font-normal">(Health)</span>
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          {sources.map((src) => (
            <div key={src.domainCategory} className="flex justify-between items-center text-[11px]">
              <span className="text-gray-800 font-semibold">{src.domainCategory}</span>
              <span className="flex items-center gap-1 font-bold text-emerald-700 text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {src.healthStatus}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
