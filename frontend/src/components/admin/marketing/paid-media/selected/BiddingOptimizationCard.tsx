"use client";

import React from "react";

interface BiddingOptimizationCardProps {
  bidding: {
    currentCpa: string;
    bidStrategy: string;
    targetCpa: string;
    optimizationGoal: string;
    learningStatus: string;
  };
}

export function BiddingOptimizationCard({ bidding }: BiddingOptimizationCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Bidding & Optimization
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          <div>
            <span className="text-[10px] font-medium text-gray-400 block">Current CPA</span>
            <span className="text-xl font-extrabold text-gray-900">
              {bidding.currentCpa}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Bid Strategy</span>
            <span className="text-gray-800 font-medium">{bidding.bidStrategy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Target CPA</span>
            <span className="font-mono text-[11px] text-gray-700">{bidding.targetCpa}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Optimization Goal</span>
            <span className="font-semibold text-gray-900">{bidding.optimizationGoal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Learning Status</span>
            <span className="font-bold text-emerald-700">{bidding.learningStatus}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <button className="w-full py-1 text-xs font-bold text-[#800020] border border-[#800020]/30 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
          View Bidding Strategy
        </button>
      </div>
    </div>
  );
}
