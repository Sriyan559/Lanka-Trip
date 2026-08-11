"use client";

import React from "react";
import { AttributionModelVersionData } from "@/data/marketingAttribution.mock";

interface AttributionModelVersionCardProps {
  versionInfo: AttributionModelVersionData;
}

export function AttributionModelVersionCard({ versionInfo }: AttributionModelVersionCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Attribution Model Version</span>
          <span className="font-mono text-xs font-extrabold text-gray-900">{versionInfo.version}</span>
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Published On</span>
            <span className="font-mono text-[10px] text-gray-700">{versionInfo.publishedOn}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Maintaining Team</span>
            <span className="text-gray-800 font-semibold">{versionInfo.maintainingTeam}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-gray-500 font-medium">Marketing Analytics Lead</span>
            <span className="text-gray-800 font-semibold">{versionInfo.analyticsLead}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
