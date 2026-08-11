"use client";

import React from "react";
import { InteractionFunnelStage } from "@/data/marketingWebApp.mock";

interface InteractionFunnelCardProps {
  stages: InteractionFunnelStage[];
}

export function InteractionFunnelCard({ stages }: InteractionFunnelCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-1 pb-2 border-b border-gray-100">
          <h4 className="text-xs font-bold text-gray-900">Interaction Funnel</h4>
          <span className="text-[10px] text-gray-400 font-normal">(Last 30 Days)</span>
        </div>

        <div className="mt-2 space-y-2 text-xs">
          {stages.map((st) => (
            <div key={st.stage} className="space-y-0.5">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-gray-500 font-medium">{st.stage}</span>
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="font-bold text-gray-900">{st.count}</span>
                  <span className="text-gray-400 text-[10px]">({st.percentage})</span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${st.widthPercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Funnel Analysis
        </button>
      </div>
    </div>
  );
}
