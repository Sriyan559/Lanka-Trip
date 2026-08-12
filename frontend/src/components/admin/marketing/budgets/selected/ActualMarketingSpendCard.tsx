"use client";

import React from "react";

interface ActualMarketingSpendCardProps {
  spend: {
    totalActualSpend: string;
    breakdown: Array<{ channel: string; amount: string }>;
  };
}

export function ActualMarketingSpendCard({ spend }: ActualMarketingSpendCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100 flex justify-between items-center">
          <span>Actual Marketing Spend</span>
          <span className="font-mono text-blue-700 font-extrabold">{spend.totalActualSpend}</span>
        </h4>

        <div className="mt-2 space-y-1 text-xs">
          {spend.breakdown.map((item) => (
            <div key={item.channel} className="flex justify-between items-center text-[11px]">
              <span className="text-gray-600 font-medium">{item.channel}</span>
              <span className="font-bold text-gray-900 font-mono">{item.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
