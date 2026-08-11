"use client";

import React from "react";
import { JourneyPositionItem } from "@/data/marketingAttribution.mock";

interface JourneyPositionAnalysisProps {
  items: JourneyPositionItem[];
}

export function JourneyPositionAnalysis({ items }: JourneyPositionAnalysisProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <h4 className="text-xs font-bold text-gray-900">Journey Position Analysis</h4>
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-700" />
              <span>First Touch</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
              <span>Last Touch</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
              <span>Assist</span>
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-2">
          {items.map((item) => (
            <div key={item.channel} className="space-y-0.5">
              <div className="flex justify-between text-[11px] font-semibold text-gray-800">
                <span>{item.channel}</span>
                <span className="text-gray-500 text-[10px]">
                  {item.firstTouchPercent}% / {item.lastTouchPercent}% / {item.assistPercent}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-rose-700 flex items-center justify-center text-[8px] font-bold text-white"
                  style={{ width: `${item.firstTouchPercent}%` }}
                >
                  {item.firstTouchPercent}%
                </div>
                <div
                  className="h-full bg-emerald-600 flex items-center justify-center text-[8px] font-bold text-white"
                  style={{ width: `${item.lastTouchPercent}%` }}
                >
                  {item.lastTouchPercent}%
                </div>
                <div
                  className="h-full bg-blue-600 flex items-center justify-center text-[8px] font-bold text-white"
                  style={{ width: `${item.assistPercent}%` }}
                >
                  {item.assistPercent}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
