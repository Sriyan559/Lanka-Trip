"use client";

import React from "react";
import { DirectVsAssistedData } from "@/data/marketingAttribution.mock";

interface DirectVsAssistedContributionProps {
  data: DirectVsAssistedData;
}

export function DirectVsAssistedContribution({ data }: DirectVsAssistedContributionProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <h4 className="text-xs font-bold text-gray-900">Direct vs Assisted Contribution</h4>
          <div className="flex items-center gap-3 text-[10px] text-gray-500 font-medium">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#800020]" />
              <span>Direct</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
              <span>Assisted</span>
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Direct Attributed Revenue</span>
            <span className="font-bold text-gray-900">{data.directAttributedRevenue}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Deduplicated Attributed Conversions</span>
            <span className="font-bold text-gray-900">{data.deduplicatedConversions}</span>
          </div>

          {/* Stacked Progress Bar 1 */}
          <div className="space-y-0.5">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-600 font-medium">Direct-Touch Conversions</span>
              <span className="font-bold text-[#800020]">{data.directTouchConversions}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-[#800020]" style={{ width: `${data.directPercent}%` }} />
              <div className="h-full bg-blue-600" style={{ width: `${data.assistedPercent}%` }} />
            </div>
          </div>

          {/* Stacked Progress Bar 2 */}
          <div className="space-y-0.5 pt-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-600 font-medium">Conversions with Assisted Touches</span>
              <span className="font-bold text-blue-700">{data.conversionsWithAssistedTouches}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-[#800020]" style={{ width: `${data.directPercent}%` }} />
              <div className="h-full bg-blue-600" style={{ width: `${data.assistedPercent}%` }} />
            </div>
          </div>

          <div className="flex justify-between pt-1">
            <span className="text-gray-500 font-medium">Assist Rate</span>
            <span className="font-bold text-blue-700">{data.assistRatePercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
