"use client";

import React from "react";

interface CommitmentSummaryCardProps {
  commitment: {
    totalCommitted: string;
    breakdown: Array<{ channel: string; amount: string }>;
    availableToCommit: string;
  };
}

export function CommitmentSummaryCard({ commitment }: CommitmentSummaryCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Commitments Summary</span>
          <span className="font-mono text-gray-900 font-extrabold">{commitment.totalCommitted}</span>
        </h4>

        <div className="mt-2 space-y-1 text-xs">
          {commitment.breakdown.map((item) => (
            <div key={item.channel} className="flex justify-between items-center text-[11px]">
              <span className="text-gray-600 font-medium">{item.channel}</span>
              <span className="font-bold text-gray-900 font-mono">{item.amount}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100 bg-emerald-50/60 p-2 rounded-lg text-center">
        <span className="text-[10px] text-gray-500 font-medium uppercase block">Uncommitted Balance / Available to Commit</span>
        <span className="text-sm font-extrabold text-emerald-800">{commitment.availableToCommit}</span>
      </div>
    </div>
  );
}
