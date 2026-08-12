"use client";

import React from "react";

interface RecentBudgetActivityCardProps {
  activityLog: Array<{ id: string; time: string; event: string; actor: string }>;
}

export function RecentBudgetActivityCard({ activityLog }: RecentBudgetActivityCardProps) {
  return (
    <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-2xs flex flex-col justify-between h-full">
      <div>
        <h4 className="text-xs font-bold text-gray-900 pb-2 border-b border-gray-100">
          Recent Budget Activity
        </h4>

        <div className="mt-2 space-y-1.5 text-xs">
          {activityLog.map((item) => (
            <div key={item.id} className="text-[11px] pb-1 border-b border-gray-50 last:border-0 flex justify-between items-center">
              <div>
                <span className="font-semibold text-gray-800">{item.event}</span>
                <span className="text-gray-400 text-[10px] block font-mono">{item.time}</span>
              </div>
              <span className="text-gray-500 font-medium text-[10px]">{item.actor}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100 text-left">
        <button className="text-xs font-bold text-[#800020] hover:underline cursor-pointer">
          View Full Activity →
        </button>
      </div>
    </div>
  );
}
