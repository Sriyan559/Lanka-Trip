"use client";

import React from "react";
import { ReportIncludedSection } from "@/data/marketingReportsAudit.mock";

interface IncludedSectionsCardProps {
  sections: ReportIncludedSection[];
}

export function IncludedSectionsCard({ sections }: IncludedSectionsCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>2. Included Sections ({sections.length})</span>
        </h4>

        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
          {sections.map((sec) => (
            <div key={sec.name} className="flex justify-between items-center text-[10px]">
              <span className="text-gray-700 font-medium truncate pr-1">{sec.name}</span>
              <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                Enabled
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
