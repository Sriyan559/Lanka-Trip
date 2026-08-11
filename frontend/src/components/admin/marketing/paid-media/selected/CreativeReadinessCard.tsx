"use client";

import React from "react";

interface CreativeReadinessCardProps {
  creative: {
    readinessPercent: number;
    approvedAssets: number;
    rejectedAssets: number;
    missingAssets: number;
  };
}

export function CreativeReadinessCard({ creative }: CreativeReadinessCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Creative Readiness
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">Readiness</span>
            <span className="text-xl font-extrabold text-emerald-700">
              {creative.readinessPercent}%
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Approved Assets</span>
            <span className="font-bold text-gray-900">{creative.approvedAssets}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Rejected Assets</span>
            <span className="font-bold text-gray-900">{creative.rejectedAssets}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Missing Assets</span>
            <span className="font-bold text-gray-900">{creative.missingAssets}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Creative Set
        </button>
      </div>
    </div>
  );
}
